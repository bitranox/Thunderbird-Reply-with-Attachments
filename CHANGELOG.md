# Changelog

## [2.4.0] - 2026-07-27

- Fix: images are no longer dropped just because the sender put a `Content-ID` header on them. An image counts as inline only when the original message embeds it (a `cid:` reference in the message body) or when it is explicitly marked `Content-Disposition: inline`. Clients such as Apple Mail and Outlook stamp a `Content-ID` on every image part, so attached PNG and JPEG files were silently skipped: no confirmation dialog and no file in the reply, while PDF, DOCX and XLSX came through.
- Removed: the "Include inline pictures" option and the body rewriting behind it. Thunderbird restores inline images in a reply itself, so the add-on no longer touches the compose body at all. This also drops the parsing of Thunderbird's internal `imap:`/`mailbox:` URLs, which are not a stable API (raised in the add-ons.thunderbird.net review of 2.3.2, see bug 1997519).
- Changed: which images count as inline is now read from the original message via `messages.listInlineTextParts()`, a documented API, instead of scanning the compose body. The composer rewrites inline sources after loading, so a compose-body scan gave a different answer depending on when it ran.
- Changed: links to GitHub, the documentation and the donation page now open in the system default browser via `windows.openDefaultBrowser()` instead of in a Thunderbird tab. Thunderbird is a mail client, not a browser.
- Changed: failures are no longer swallowed silently. Listener registration is feature-detected and reports when an API is missing, and every remaining `catch` either logs or carries a comment saying why swallowing is correct. `no-empty` now enforces this.
- Fix: an unanswered confirmation popup no longer discards the attachments. The wait now distinguishes "the user said no" from "nobody answered" and applies the configured default answer in the second case, with a warning in the console. The backstop is 120s (was 20s), which is a limit on a lost popup, not on a person's decision.
- Changed: the JSDoc types are now checked. `npm run typecheck` (`tsc --checkJs`, no emit) runs in `make test`, with the shared `App.*` globals declared in `types/rwa.d.ts`. The first run found real drift: undocumented parameters on `createEnsureReplyAttachments`, a `reloadSettings(browser)` call against a zero-argument function, a stale `@param msg`, and several `@param {object}` shapes that documented nothing. Also split `ComposeAttachPort` out of `ComposePort`, since copying attachments never needs the compose details or events.
- Added: a ceiling on what one reply copies (50 attachments, 100 MB total). Each file is fetched whole before it is attached, so a reply to a message carrying dozens of large files used to move gigabytes through the extension with the compose window looking frozen. Anything left out is listed in the same notice the blacklist uses, never dropped silently, and a lone attachment larger than the whole budget is still copied.
- Refactor: the confirmation flow moved out of the composition root into `sources/app/confirm_flow.js` (dialog injection, the targeted/broadcast/popup fallback chain, the popup token protocol). The composition root is back to wiring and settings, 700 lines down to 575, with no behaviour change.
- Cleanup: the attachment selection ran a "strict then relaxed" two-pass whose two predicates were identical, so the fallback could never add anything. Replaced by a single pass. Removed `popup.html`, which no manifest referenced.
- Tests: added end-to-end tests that run the shipped selection logic inside a real Thunderbird (140 ESR and 153) over messages Thunderbird itself parsed. See `tests/e2e/README.md`.

## [2.3.2] - 2026-02-19

- Feature: "Include inline pictures" now embeds images directly in the reply body as base64 data URIs instead of adding them as file attachments. This preserves the original inline layout so recipients see images exactly where they appeared in the original message. Supports Thunderbird's internal `imap://` and `mailbox://` URL schemes as well as standard `cid:` references. Default: ON.
- Code quality: Extracted shared `shared_link_opener.js` utility to eliminate duplicate `openHref()` logic across four link handler files (-82 LOC).
- Code quality: Added JSDoc annotations to 10 key functions in `background.js`.
- Tests: Added 91 new tests covering link handlers, composition.js branches, and background.js branches.
- Coverage: Raised branch coverage from 76.5% to 81.5%, with `composition.js` branches 69% to 87.5% and `background.js` branches 71% to 84.4%.
- i18n: Added `uiIncludeInlineLabel` translation across all 100+ supported locales.

## [2.3.1] - 2025-10-20

- Attachments: Trigger an ensure pass as soon as compose content wakes the background page and reprocess tabs on bootstrap so attachments remain in place even after Thunderbird idles the event page.
- Debugging: Emit targeted compose lifecycle logs and a content-script ready ping to capture lost events without keeping DevTools open.

## [2.3.0] - 2025-10-20

- Tests: Rewrote UI i18n, donation visibility, and link handler suites into single-purpose, descriptive cases that run the real logic across every branch.
- Coverage: Added background logger resilience tests and expanded DOM fallback checks, lifting overall statement coverage above 94%.
- Reliability: Hardened event propagation so background listeners no longer drop compose events under rapid tab churn.
- Attachments: Normalize Thunderbird message identifiers to numeric IDs so `browser.messages.listAttachments` reliably sees the source files before copying, guard against duplicate runs when `onBeforeSend` fires before the reference id is populated, and coalesce concurrent ensure calls so each reply adds files exactly once.
- Permissions: Drop the legacy `windows` permission per current Thunderbird MV3 policy to silence AMO packaging warnings.

## [2.2.0] - 2025-09-24

- Options: Added an "Enable debug logging" toggle under Advanced, including translations across all languages.
- Logging: Background page now refreshes its logger when the debug flag changes and mirrors debug output through the global `[RWA]` logger for easier troubleshooting.
- Reliability: Attachment retry flow emits consistent debug logs, and storage-change tests cover multi-listener behavior.

## [2.1.0] - 2025-09-13

- Full internationalization, making the platform available in the top 100 languages worldwide

## [2.0.0] - 2025-09-06

- Rewrote the extension into a full-featured version (EN/DE only) after reaching 100+ users.
- CI: run tests and lint before docs build/deploy; official Pages deploy; artifacts on PRs.

## [1.0.1]

### Changed

- Switched to `browser.messages.listAttachments()` instead of manual MIME traversal.

## [1.0.0]

### Added

- Initial public release.

---

All notable changes to this project will be documented in this file.
The format is based on Keep a Changelog, and this project adheres to
Semantic Versioning (where applicable for add-on releases).
