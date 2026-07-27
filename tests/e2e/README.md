# End-to-end tests against a real Thunderbird

The unit suite mocks the `browser.*` APIs, so it can only prove that the add-on
behaves correctly against what we _believe_ Thunderbird returns. This harness
removes that assumption: it runs the shipped modules inside a real Thunderbird,
over messages that Thunderbird itself parsed.

## Running

```bash
npm run test:e2e            # Thunderbird ESR   (/opt/tb/esr/thunderbird)
npm run test:e2e:release    # current release   (/opt/tb/release/thunderbird)

python3 tests/e2e/run-e2e.py /path/to/thunderbird --display :91 --keep
```

Any Thunderbird 128+ build works; pass its binary path. `--keep` preserves the
throwaway profile and its log for inspection.

## What it does

1. Builds a scratch profile with a Local Folders account (`scripts/make-tb-testprofile.py`).
2. Starts Thunderbird once to let first-run initialisation finish, then again
   with a probe extension installed alongside the add-on.
3. The probe imports four test messages through `messages.import()`, then runs
   the **shipped** `createProcessReplyAttachments()` over the **real** messages
   port, recording what it would attach.
4. The runner asserts the per-message expectations in `EXPECTATIONS`.

The messages cover the cases that decide the inline-vs-attachment rule:

| Message | Shape                                                       | Must produce |
|---------|-------------------------------------------------------------|--------------|
| RWA 1   | PNG attachment that also carries a Content-ID, unreferenced | `photo.png`  |
| RWA 2   | PNG embedded in the body via `cid:`                         | nothing      |
| RWA 3   | plain PDF attachment                                        | `report.pdf` |
| RWA 4   | embedded logo plus a real attachment                        | `scan.jpeg`  |

The run prints the raw `MessageAttachment` records it saw, which is the ground
truth the rule rests on. RWA 1 is the case that regressed in 2.3.2: the sender
stamps a Content-ID on a genuine attachment, and treating that as proof of
inlineness dropped the file with no dialog and no trace.

## Known limitation: no real compose window

The probe does not call `browser.compose.beginReply()`. That call segfaults
Thunderbird on a headless server, reproduced on 140.13.0 ESR and 153.0 with this
add-on **absent**, under Xvfb, `--headless`, `dbus-run-session`, software
rendering, and with the content sandbox disabled. The last thing Thunderbird
logs is a GTK icon-theme assertion. It is an environment limitation, not an
add-on defect.

So the compose window itself, the confirmation dialog, and the blacklist warning
still need a manual pass on a desktop session. Everything that decides _which
files get copied_ is covered here.

## Files

- `run-e2e.py` - builds the profile, drives Thunderbird, asserts the results.
- `probe-addon/` - the probe extension. `vendor/` and `messages/` are filled in
  at pack time from `sources/` and from the message builder, so they can never
  drift from what ships.
- `../../scripts/make-tb-testprofile.py` - profile and message builder; also
  usable on its own to get a profile for manual testing.
