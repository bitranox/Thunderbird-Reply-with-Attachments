# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to
Semantic Versioning (where applicable for add-on releases).

## [Unreleased]
- CI: consider adding GitHub Actions for `make test` and `web-ext lint`.
- Permissions audit: verify if `messagesModify` can be dropped.

## [2025-09-05] — Architecture, Tests, CSP, Docs
### Added
- Extensive test suite expansion (53 → 59 tests):
  - Dialog focus trap, keyboard shortcuts (Y/J, N/Escape, Tab/Arrows), overlay cleanup.
  - Composition storage listeners (blacklist/confirm) and scripting error handling.
  - Scripting preregistration (register/skip/execute) coverage.
  - Adapter port contract checks.
- Clean Code micro‑refactor across modules; tiny functions that read like English.
- JSDoc for modules and functions (intent, params, outputs).
- CONTRIBUTING.md with principles, PR checklist, coverage notes.
- README/README_DE: test/coverage sections and badges.

### Changed
- Confirm UI: removed header icon; text‑only, accessible dialog.
- Options page: removed inline script (CSP‑friendly); `ui_i18n.js` sets `html.js` class.
- Composition/background: clearer helpers; thin entrypoint; preregister confirm script.
- Application use cases: robust fallbacks when domain helpers aren’t loaded yet.

### Fixed
- Multiple edge‑case guards (API failures, missing permissions, scripting errors) now handled gracefully.

## [1.0.1]
### Changed
- Switched to `browser.messages.listAttachments()` instead of manual MIME traversal.

## [1.0.0]
### Added
- Initial public release.

---

[Unreleased]: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/compare
