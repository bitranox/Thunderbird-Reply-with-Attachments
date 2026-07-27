#!/usr/bin/env python3
"""Surgically replace known passages in the localized Docusaurus docs.

`scripts/translate_web_docs_batch.js` re-translates whole files through the OpenAI API.
When one paragraph of English changes, that rewrites every other paragraph too - hundreds
of files, and good existing translations thrown away to fix a few lines. This script
replaces just the passages that went stale.

The locators never read translated prose, because prose differs per language. They match
on things that survive translation: a version number, a `base64` token, a markdown link
target, an arrow. Every operation must resolve to EXACTLY ONE match in a file, otherwise
that file is reported and left untouched - a half-applied doc is worse than a stale one.

Operations (JSON, see --ops):
  {"file": "changelog.md", "find": {"line_startswith": "- 2.3.2"}, "replace": "<id>"}
  {"file": "changelog.md", "find": {"line_startswith": "- 2.3.2"}, "insert_before": "<id>"}
  {"file": "features.md",  "find": {"block_contains": "base64"},   "replace": "<id>"}
  {"file": "usage.md",     "find": {"block_startswith": "\\\\*"},    "delete": true}

`replace`/`insert_before` name a passage id; the text comes from the per-locale
translation map. A "block" is a paragraph delimited by blank lines.

Usage:
  python3 scripts/patch_i18n_doc.py --ops ops.json --translations tr.json [--dry-run]
"""

from __future__ import annotations

import argparse
import json
import pathlib
import sys

REPO = pathlib.Path(__file__).resolve().parents[1]
I18N = REPO / "website" / "i18n"


def locales() -> list[str]:
    return sorted(d.name for d in I18N.iterdir() if d.is_dir() and d.name != "en")


def find_line(lines: list[str], prefix: str) -> list[int]:
    return [i for i, l in enumerate(lines) if l.startswith(prefix)]


def find_line_containing(lines: list[str], needle: str) -> list[int]:
    return [i for i, l in enumerate(lines) if needle in l]


def bullet_group_end(lines: list[str], start: int) -> int:
    """Last index of a top-level bullet and its indented continuation lines."""
    i = start + 1
    while i < len(lines) and (lines[i].startswith((" ", "\t")) and lines[i].strip()):
        i += 1
    return i - 1


def parent_bullet(lines: list[str], child: int) -> int:
    """Walk up from an indented sub-bullet to the top-level bullet that owns it."""
    i = child
    while i > 0 and lines[i].startswith((" ", "\t")):
        i -= 1
    return i


def pick(hits: list[int], nth: int | None) -> int | None:
    """Resolve a match list to one index. Ambiguity without an explicit nth is a refusal."""
    if nth is None:
        return hits[0] if len(hits) == 1 else None
    return hits[nth] if -len(hits) <= nth < len(hits) else None


def find_block(text: str, *, contains: str | None = None, startswith: str | None = None) -> list[int]:
    hits = []
    for i, block in enumerate(text.split("\n\n")):
        # case-insensitive: German writes "Base64", English "base64", and a locator
        # that hinges on capitalisation silently skips a language
        if contains is not None and contains.lower() in block.lower():
            hits.append(i)
        elif startswith is not None and block.lstrip().startswith(startswith):
            hits.append(i)
    return hits


def apply_ops(path: pathlib.Path, ops: list[dict], strings: dict[str, str]) -> tuple[str | None, str]:
    """Return (new_text, note). new_text is None when nothing may be written."""
    text = path.read_text(encoding="utf-8")
    for op in ops:
        find = op["find"]
        nth = find.get("nth")
        if "line_startswith" in find or "line_contains" in find:
            lines = text.split("\n")
            hits = (
                find_line(lines, find["line_startswith"])
                if "line_startswith" in find
                else find_line_containing(lines, find["line_contains"])
            )
            i = pick(hits, nth)
            if i is None:
                return None, f"{op['file']}: {len(hits)} matches for line {find!r}"
            if op.get("bullet_group"):
                # `from_child` means the locator matched a sub-bullet; replace the whole
                # group its parent owns, which is how a bullet plus its sub-bullets is
                # swapped without depending on how many sub-bullets a language produced.
                start = parent_bullet(lines, i) if op["bullet_group"] == "from_child" else i
                end = bullet_group_end(lines, start)
                lines[start : end + 1] = strings[op["replace"]].split("\n")
            elif op.get("delete"):
                del lines[i]
            elif "insert_before" in op:
                lines.insert(i, strings[op["insert_before"]])
            else:
                lines[i] = strings[op["replace"]]
            text = "\n".join(lines)
        else:
            blocks = text.split("\n\n")
            hits = find_block(text, contains=find.get("block_contains"), startswith=find.get("block_startswith"))
            i = pick(hits, nth)
            if i is None:
                return None, f"{op['file']}: {len(hits)} matches for block {find!r}"
            count = op.get("delete")
            if count:
                del blocks[i : i + (count if isinstance(count, int) else 1)]
            elif "insert_before" in op:
                blocks.insert(i, strings[op["insert_before"]])
            elif "insert_after" in op:
                blocks.insert(i + 1, strings[op["insert_after"]])
            else:
                blocks[i] = strings[op["replace"]]
            text = "\n\n".join(blocks)
    return text, "ok"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ops", required=True, help="JSON list of operations")
    ap.add_argument("--translations", required=True, help="JSON {locale: {passage_id: text}}")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", help="comma-separated locale subset")
    args = ap.parse_args()

    ops = json.loads(pathlib.Path(args.ops).read_text())
    tr = json.loads(pathlib.Path(args.translations).read_text())
    targets = args.only.split(",") if args.only else locales()

    written, skipped = 0, []
    for loc in targets:
        strings = tr.get(loc)
        if not strings:
            skipped.append((loc, "no translations"))
            continue
        base = I18N / loc / "docusaurus-plugin-content-docs" / "current"
        # group ops per file so a failure in one file does not half-write another
        per_file: dict[str, list[dict]] = {}
        for op in ops:
            per_file.setdefault(op["file"], []).append(op)

        planned: dict[pathlib.Path, str] = {}
        problem = None
        for fname, file_ops in per_file.items():
            path = base / fname
            if not path.exists():
                problem = f"{fname}: missing"
                break
            new_text, note = apply_ops(path, file_ops, strings)
            if new_text is None:
                problem = note
                break
            planned[path] = new_text
        if problem:
            skipped.append((loc, problem))
            continue
        if not args.dry_run:
            for path, new_text in planned.items():
                path.write_text(new_text, encoding="utf-8")
        written += 1

    print(f"{'would patch' if args.dry_run else 'patched'} {written} locale(s)")
    for loc, reason in skipped:
        print(f"  SKIPPED {loc}: {reason}")
    return 1 if skipped else 0


if __name__ == "__main__":
    sys.exit(main())
