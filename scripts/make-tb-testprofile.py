#!/usr/bin/env python3
"""Build a Thunderbird test profile for Reply-with-Attachments.

Creates a profile with a Local Folders account and an "RWA-Test" folder holding
messages that cover the attachment cases the add-on has to get right:

  1. PNG attachment that also carries a Content-ID, referenced by nothing.
     Expected: the add-on copies it into the reply (this is the case that
     regressed and produced no dialog and no file).
  2. PNG embedded in the HTML body via cid:. Expected: NOT copied as a file;
     Thunderbird restores it in the reply body itself.
  3. PDF attachment. Control case, must always be copied.
  4. Both an embedded logo and a real attachment in one message.

Usage:
  python3 scripts/make-tb-testprofile.py <profile-dir> [--unsigned]

--unsigned also writes xpinstall.signatures.required=false, which Thunderbird
ESR honors and release builds ignore.
"""

import argparse
import base64
import pathlib
import sys
import time
import zlib

# 1x1 red PNG, built here so the script stays dependency-free.
PNG_1PX = base64.b64decode(
    b"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
)
PDF_STUB = b"%PDF-1.4\n1 0 obj<</Type/Catalog>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n"

BOUNDARY = "----=_RWA_TEST_BOUNDARY"


def b64(data: bytes) -> str:
    text = base64.b64encode(data).decode("ascii")
    return "\n".join(text[i : i + 76] for i in range(0, len(text), 76))


def part(content_type: str, disposition: str, payload: bytes, content_id: str = "") -> str:
    cid = f"Content-ID: <{content_id}>\n" if content_id else ""
    return (
        f"--{BOUNDARY}\n"
        f"Content-Type: {content_type}\n"
        f"Content-Transfer-Encoding: base64\n"
        f"{cid}"
        f"Content-Disposition: {disposition}\n\n"
        f"{b64(payload)}\n\n"
    )


def message(subject: str, html: str, parts: str, multipart_type: str = "mixed") -> str:
    stamp = time.strftime("%a, %d %b %Y %H:%M:%S +0000", time.gmtime())
    return (
        f"From - {stamp}\n"
        f"From: RWA Test <rwa-test@example.net>\n"
        f"To: You <you@example.net>\n"
        f"Subject: {subject}\n"
        f"Date: {stamp}\n"
        f"Message-ID: <{abs(zlib.crc32(subject.encode())):x}@example.net>\n"
        f"MIME-Version: 1.0\n"
        f'Content-Type: multipart/{multipart_type}; boundary="{BOUNDARY}"\n\n'
        f"--{BOUNDARY}\n"
        f"Content-Type: text/html; charset=utf-8\n\n"
        f"{html}\n\n"
        f"{parts}"
        f"--{BOUNDARY}--\n\n"
    )


def build_cases() -> list[tuple[str, str]]:
    """Return (slug, rfc822 text) for every test message."""
    cases = []

    # 1. The reported regression: an attachment that also carries a Content-ID.
    cases.append(
        message(
            "RWA 1 - PNG attachment with a Content-ID nothing embeds",
            "<html><body><p>The PNG is a real attachment. Many clients stamp a "
            "Content-ID on every image part; the body references nothing.</p>"
            "<p>EXPECT: the add-on copies photo.png into the reply.</p></body></html>",
            part(
                'image/png; name="photo.png"',
                'attachment; filename="photo.png"',
                PNG_1PX,
                content_id="5A3F0001@example.net",
            ),
        )
    )

    # 2. Genuinely embedded image.
    cases.append(
        message(
            "RWA 2 - PNG embedded in the body via cid:",
            '<html><body><p>Embedded below:</p><img src="cid:embedded0002@example.net">'
            "<p>EXPECT: no dialog and no attachment; Thunderbird keeps the image "
            "in the reply body itself.</p></body></html>",
            part(
                'image/png; name="inline.png"',
                'inline; filename="inline.png"',
                PNG_1PX,
                content_id="embedded0002@example.net",
            ),
            multipart_type="related",
        )
    )

    # 3. Control: a plain attachment that never had a Content-ID.
    cases.append(
        message(
            "RWA 3 - plain PDF attachment (control)",
            "<html><body><p>EXPECT: the add-on copies report.pdf into the reply."
            "</p></body></html>",
            part(
                'application/pdf; name="report.pdf"',
                'attachment; filename="report.pdf"',
                PDF_STUB,
            ),
        )
    )

    # 4. Both kinds in one message, which is the common signature-logo shape.
    cases.append(
        message(
            "RWA 4 - embedded logo plus a real attachment",
            '<html><body><p>Signature logo:</p><img src="cid:logo0004@example.net">'
            "<p>EXPECT: scan.jpeg is copied, logo.png is not.</p></body></html>",
            part(
                'image/png; name="logo.png"',
                'inline; filename="logo.png"',
                PNG_1PX,
                content_id="logo0004@example.net",
            )
            + part(
                'image/jpeg; name="scan.jpeg"',
                'attachment; filename="scan.jpeg"',
                PNG_1PX,
                content_id="scan0004@example.net",
            ),
            multipart_type="related",
        )
    )

    return [(f"rwa-{i + 1}.eml", c) for i, c in enumerate(cases)]


def build_mbox() -> str:
    return "".join(c for _, c in build_cases())


# Written as user.js, not prefs.js: Thunderbird rewrites prefs.js from its own
# state and drops what it did not put there, while user.js is re-applied on every
# start. autoDisableScopes=0 is what makes a profile-installed add-on load without
# the manual "you have a new add-on" opt-in.
PREFS = """// Generated by scripts/make-tb-testprofile.py
user_pref("mail.account.account1.server", "server1");
user_pref("mail.accountmanager.accounts", "account1");
user_pref("mail.accountmanager.localfoldersserver", "server1");
user_pref("mail.server.server1.directory-rel", "[ProfD]Mail/Local Folders");
user_pref("mail.server.server1.hostname", "Local Folders");
user_pref("mail.server.server1.name", "Local Folders");
user_pref("mail.server.server1.type", "none");
user_pref("mail.server.server1.userName", "nobody");
user_pref("mail.shell.checkDefaultClient", false);
user_pref("mail.provider.suppress_dialog_on_startup", true);
user_pref("mailnews.start_page.enabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);
user_pref("app.update.auto", false);
user_pref("extensions.update.enabled", false);
user_pref("browser.aboutConfig.showWarning", false);
user_pref("devtools.chrome.enabled", true);
user_pref("devtools.debugger.remote-enabled", true);
user_pref("extensions.autoDisableScopes", 0);
user_pref("extensions.startupScanScopes", 15);
// Extension console output goes to stdout; this is how a headless run gets results
// back, since an MV3 host permission is not granted at install time.
user_pref("devtools.console.stdout.chrome", true);
// Extension background output is content-scoped; without this the probe's
// console.log never reaches stdout.
user_pref("devtools.console.stdout.content", true);
user_pref("browser.dom.window.dump.enabled", true);
"""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("profile")
    ap.add_argument("--unsigned", action="store_true")
    ap.add_argument("--emit-eml", help="also write each message as a standalone .eml here")
    args = ap.parse_args()

    profile = pathlib.Path(args.profile).expanduser()
    # Only the empty Local Folders store. The test messages are imported at
    # runtime via messages.import(): a folder seeded as a bare mbox file has no
    # database, and Thunderbird then refuses it with "Database ... not accessible".
    local = profile / "Mail" / "Local Folders"
    local.mkdir(parents=True, exist_ok=True)

    prefs = PREFS
    if args.unsigned:
        prefs += 'user_pref("xpinstall.signatures.required", false);\n'
    (profile / "user.js").write_text(prefs, encoding="utf-8")
    (profile / "extensions").mkdir(exist_ok=True)

    if args.emit_eml:
        out = pathlib.Path(args.emit_eml).expanduser()
        out.mkdir(parents=True, exist_ok=True)
        for name, text in build_cases():
            # Strip the mbox "From " separator; an .eml starts at the headers.
            body = text.split("\n", 1)[1]
            (out / name).write_text(body, encoding="utf-8")
        print(f"eml written: {out}")

    print(f"profile ready: {profile}")
    print(f"  signatures: {'not required' if args.unsigned else 'required (release default)'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
