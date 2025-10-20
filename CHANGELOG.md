# Changelog

## [2.3.0] - 2025-10-20

- Tests: Rewrote UI i18n, donation visibility, and link handler suites into single-purpose, descriptive cases that run the real logic across every branch.
- Coverage: Added background logger resilience tests and expanded DOM fallback checks, lifting overall statement coverage above 94%.
- Reliability: Hardened event propagation so background listeners no longer drop compose events under rapid tab churn.

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
