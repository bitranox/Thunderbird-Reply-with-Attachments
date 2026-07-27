#!/usr/bin/env python3
"""End-to-end test of Reply with Attachments against a real Thunderbird.

Packs the add-on plus a probe extension into a throwaway profile, starts
Thunderbird on a scratch X display, lets the probe open a real reply for every
test message, and asserts on what the composer actually ended up holding.

Usage:
  python3 tests/e2e/run-e2e.py /opt/tb/esr/thunderbird [--display :91] [--keep]
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import pathlib
import shutil
import subprocess
import sys
import time
import zipfile

REPO = pathlib.Path(__file__).resolve().parents[2]
RESULT_MARKER = "RWA_E2E_RESULT"

# What each test message must produce in the reply composer. Keyed by the
# leading "RWA <n>" of the subject so the wording can change without breaking.
EXPECTATIONS = {
    "RWA 1": {
        "attachments": ["photo.png"],
        "why": "an attachment that merely carries a Content-ID is still an attachment",
    },
    "RWA 2": {
        "attachments": [],
        "why": "an image the body embeds belongs in the body, not in the attachment list",
    },
    "RWA 3": {
        "attachments": ["report.pdf"],
        "why": "a plain attachment is always copied",
    },
    "RWA 4": {
        "attachments": ["scan.jpeg"],
        "why": "the embedded logo stays inline while the real attachment is copied",
    },
}


def scrape_result(logpath: pathlib.Path) -> dict | None:
    """Pull the probe's JSON result line out of Thunderbird's stdout."""
    if not logpath.exists():
        return None
    for line in logpath.read_text(errors="replace").splitlines():
        idx = line.find(RESULT_MARKER)
        if idx >= 0:
            blob = line[idx + len(RESULT_MARKER) :].strip().strip('"')
            try:
                return json.loads(base64.b64decode(blob))
            except Exception:
                return None
    return None


def pack_addon(dest: pathlib.Path) -> None:
    """Zip sources/ with manifest_LOCAL.json promoted to manifest.json."""
    sources = REPO / "sources"
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
        for path in sorted(sources.rglob("*")):
            if path.is_dir() or path.name.startswith("manifest_"):
                continue
            z.write(path, path.relative_to(sources).as_posix())
        z.write(sources / "manifest_LOCAL.json", "manifest.json")


# The probe runs the shipped modules themselves, so it packs them verbatim from
# sources/. Copying rather than importing keeps the add-on under test untouched.
VENDORED = {
    "vendor/filters.js": "app/domain/filters.js",
    "vendor/thunderbird.js": "app/adapters/thunderbird.js",
    "vendor/usecases.js": "app/application/usecases.js",
}


def emit_messages() -> None:
    """(Re)generate the .eml fixtures so they can never drift from the builder."""
    subprocess.run(
        [
            sys.executable,
            str(REPO / "scripts" / "make-tb-testprofile.py"),
            "/tmp/rwa-eml-scratch",
            "--emit-eml",
            str(REPO / "tests" / "e2e" / "probe-addon" / "messages"),
        ],
        check=True,
        capture_output=True,
    )
    shutil.rmtree("/tmp/rwa-eml-scratch", ignore_errors=True)


def pack_probe(dest: pathlib.Path) -> None:
    emit_messages()
    probe = REPO / "tests" / "e2e" / "probe-addon"
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
        for path in sorted(probe.rglob("*")):
            if path.is_file():
                z.write(path, path.relative_to(probe).as_posix())
        for target, source in VENDORED.items():
            z.write(REPO / "sources" / source, target)


def addon_id() -> str:
    manifest = json.loads((REPO / "sources" / "manifest_LOCAL.json").read_text())
    return manifest["browser_specific_settings"]["gecko"]["id"]


def build_profile(profile: pathlib.Path) -> None:
    if profile.exists():
        shutil.rmtree(profile)
    subprocess.run(
        [sys.executable, str(REPO / "scripts" / "make-tb-testprofile.py"), str(profile), "--unsigned"],
        check=True,
        capture_output=True,
    )
    ext = profile / "extensions"
    ext.mkdir(exist_ok=True)
    pack_addon(ext / f"{addon_id()}.xpi")


def install_probe(profile: pathlib.Path) -> None:
    pack_probe(profile / "extensions" / "rwa-e2e-probe@example.net.xpi")


def launch(binary: str, profile: pathlib.Path, display: str, logfile):
    env = dict(os.environ, DISPLAY=display, MOZ_DISABLE_AUTO_SAFE_MODE="1")
    return subprocess.Popen(
        [binary, "-profile", str(profile), "-no-remote"],
        env=env,
        stdout=logfile,
        stderr=subprocess.STDOUT,
    )


def stop(process) -> None:
    process.terminate()
    try:
        process.wait(timeout=20)
    except subprocess.TimeoutExpired:
        process.kill()


def start_display(display: str) -> subprocess.Popen | None:
    if os.environ.get("DISPLAY") == display:
        return None
    return subprocess.Popen(
        ["Xvfb", display, "-screen", "0", "1400x900x24"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def report(payload: dict) -> int:
    if not payload.get("ok"):
        print("PROBE FAILED:", payload.get("error"))
        return 1

    seen = {}
    for case in payload["cases"]:
        key = str(case["subject"])[:5].strip()
        seen[key] = case

    failures = 0
    for key in sorted(EXPECTATIONS):
        want = EXPECTATIONS[key]
        case = seen.get(key)
        if case is None:
            print(f"FAIL {key}: no result (message missing from the folder?)")
            failures += 1
            continue
        got = case["attachments"]
        ok = got == want["attachments"]
        print(
            f"{'PASS' if ok else 'FAIL'} {key}: attachments={got} "
            f"expected={want['attachments']}"
        )
        for part in case["parts"]:
            print(
                f"       part {part['partName']} {part['name']} "
                f"type={part['contentType']} cid={part['contentId']} "
                f"disposition={part['contentDisposition']}"
            )
        for inline in case["inlineParts"]:
            print(
                f"       inline {inline['contentType']} "
                f"embeds-cid={inline['embedsCid']} len={inline['length']}"
            )
        if not ok:
            print(f"       {want['why']}")
            failures += 1
    return 1 if failures else 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("thunderbird")
    ap.add_argument("--display", default=":91")
    ap.add_argument("--profile", default=None)
    ap.add_argument("--timeout", type=int, default=180)
    ap.add_argument("--warmup", type=int, default=25)
    ap.add_argument("--keep", action="store_true")
    args = ap.parse_args()

    profile = pathlib.Path(args.profile or f"/tmp/rwa-e2e-{os.getpid()}")
    build_profile(profile)

    xvfb = start_display(args.display)
    time.sleep(2)

    # Phase 1: let Thunderbird finish first-run initialisation on its own.
    # Creating a folder and importing into it seconds after a profile is born
    # crashes the parent process ("Exiting due to channel error").
    warmup_log = profile.with_suffix(".warmup.log").open("w")
    warmup = launch(args.thunderbird, profile, args.display, warmup_log)
    time.sleep(args.warmup)
    stop(warmup)
    warmup_log.close()

    # Phase 2: add the probe and run the real scenario.
    install_probe(profile)
    log = profile.with_suffix(".log").open("w")
    tb = launch(args.thunderbird, profile, args.display, log)

    logpath = pathlib.Path(log.name)
    payload = None
    deadline = time.time() + args.timeout
    try:
        while time.time() < deadline and payload is None:
            payload = scrape_result(logpath)
            if payload is None and tb.poll() is not None:
                print("Thunderbird exited early; see", log.name)
                break
            time.sleep(1)
    finally:
        stop(tb)
        if xvfb:
            xvfb.terminate()
        log.close()

    if payload is None:
        payload = scrape_result(logpath)
    if payload is None:
        print(f"no result after {args.timeout}s; log: {log.name}")
        return 1

    version = (payload.get("platform") or {}).get("version", "?")
    print(f"\nThunderbird {version} - profile {profile}\n")
    rc = report(payload)
    if not args.keep and not args.profile:
        shutil.rmtree(profile, ignore_errors=True)
    return rc


if __name__ == "__main__":
    sys.exit(main())
