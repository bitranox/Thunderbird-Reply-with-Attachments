# Changelog

## [2.3.2] - 2026-02-19

- Feature: "Include inline pictures" now embeds images directly in the reply body as base64 data URIs instead of adding them as file attachments. This preserves the original inline layout so recipients see images exactly where they appeared in the original message. Supports Thunderbird's internal `imap://` and `mailbox://` URL schemes as well as standard `cid:` references. Default: ON.
- Code quality: Extracted shared `shared_link_opener.js` utility to eliminate duplicate `openHref()` logic across four link handler files (-82 LOC).
- Code quality: Added JSDoc annotations to 10 key functions in `background.js`.
- Tests: Added 91 new tests covering link handlers, composition.js branches, and background.js branches.
- Coverage: Raised branch coverage from 76.5% to 81.5%, with `composition.js` branches 69% → 87.5% and `background.js` branches 71% → 84.4%.
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

- Rewrote the extension into a full‑featured version (EN/DE only) after reaching 100+ users.
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
