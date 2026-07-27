#!/usr/bin/env python3
"""Replace ONE message value in the website i18n string catalogues.

`scripts/translate_web_index.js` rewrites a whole `code.json` per locale through the
OpenAI API. When a single English string changes, that is both overkill and risky: it
needs an API key and it re-runs every key through a model. This script does the narrow
job instead - set one key's `message` in the locales you name, touch nothing else.

Structure is the thing worth protecting. Docusaurus needs every locale to carry the same
keys, and `tests/website.index.i18n.test.js` asserts key coverage, non-empty string
messages and placeholder parity across ~4400 checks. So this script refuses to write
whenever the result would differ from the original in any way other than that one
message: no key added, none removed, order untouched, sibling fields untouched.

Usage:
  # apply, reading {"locale": "message"} pairs from a file or stdin
  python3 scripts/patch_i18n_message.py --key homepage.features.skipSmime.body \\
      --translations tr.json

  # report which locales still carry a given message
  python3 scripts/patch_i18n_message.py --key homepage.features.skipSmime.body \\
      --check --expect-old "SMIME signatures and inline images are excluded to keep replies lean."
"""

from __future__ import annotations

import argparse
import collections
import json
import pathlib
import re
import sys

REPO = pathlib.Path(__file__).resolve().parents[1]
I18N = REPO / "website" / "i18n"
PLACEHOLDER = re.compile(r"\{[a-zA-Z0-9_]+\}")


def load(path: pathlib.Path) -> "collections.OrderedDict[str, dict]":
    return json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=collections.OrderedDict)


def dump(path: pathlib.Path, data) -> None:
    # Byte-compatible with translate_web_index.js: 2-space indent, trailing newline,
    # non-ASCII left as-is so the catalogues stay readable in every script.
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def locales() -> list[str]:
    return sorted(d.name for d in I18N.iterdir() if d.is_dir() and d.name != "en")


def check(key: str, expect_old: str | None) -> int:
    stale, missing = [], []
    for loc in locales():
        path = I18N / loc / "code.json"
        if not path.exists():
            missing.append(loc)
            continue
        entry = load(path).get(key)
        if entry is None:
            missing.append(loc)
        elif expect_old is not None and entry.get("message") == expect_old:
            stale.append(loc)
    if missing:
        print(f"key absent in {len(missing)} locale(s): {' '.join(missing)}")
    if expect_old is not None:
        print(f"still carrying the old message: {len(stale)} locale(s)")
        if stale:
            print("  " + " ".join(stale))
    return 1 if missing else 0


def apply(key: str, translations: dict[str, str], dry_run: bool) -> int:
    en_entry = load(I18N / "en" / "code.json").get(key)
    if en_entry is None:
        print(f"ERROR: {key} does not exist in the English catalogue", file=sys.stderr)
        return 2
    want_tokens = set(PLACEHOLDER.findall(en_entry.get("message", "")))

    written, skipped = 0, []
    for loc, message in sorted(translations.items()):
        path = I18N / loc / "code.json"
        reason = None
        if not path.exists():
            reason = "no code.json"
        elif not isinstance(message, str) or not message.strip():
            reason = "empty translation"
        elif set(PLACEHOLDER.findall(message)) != want_tokens:
            reason = f"placeholder mismatch (want {sorted(want_tokens)})"
        if reason:
            skipped.append((loc, reason))
            continue

        before = load(path)
        if key not in before:
            skipped.append((loc, "key absent"))
            continue

        after = collections.OrderedDict(
            (k, (collections.OrderedDict(v) if isinstance(v, dict) else v)) for k, v in before.items()
        )
        after[key]["message"] = message

        # Nothing but that one message may move.
        if list(after) != list(before):
            skipped.append((loc, "key order would change"))
            continue
        drift = [
            k
            for k in before
            if k != key and json.dumps(before[k], sort_keys=True) != json.dumps(after[k], sort_keys=True)
        ]
        sibling_drift = set(before[key]) != set(after[key])
        if drift or sibling_drift:
            skipped.append((loc, "would alter other content"))
            continue

        if not dry_run:
            dump(path, after)
        written += 1

    print(f"{'would write' if dry_run else 'wrote'} {written} locale(s)")
    for loc, reason in skipped:
        print(f"  SKIPPED {loc}: {reason}")
    return 1 if skipped else 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--key", required=True)
    ap.add_argument("--translations", help="JSON file of {locale: message}; '-' for stdin")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--expect-old", help="with --check: report locales still holding this message")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if args.check:
        return check(args.key, args.expect_old)
    if not args.translations:
        ap.error("--translations is required unless --check is given")
    raw = sys.stdin.read() if args.translations == "-" else pathlib.Path(args.translations).read_text()
    return apply(args.key, json.loads(raw), args.dry_run)


if __name__ == "__main__":
    sys.exit(main())
