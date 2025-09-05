# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to
Semantic Versioning (where applicable for add-on releases).

## [Unreleased]
- Permissions audit: verify if `messagesModify` can be dropped.
- Docs: Donation page (EN/DE) and sidebar entry.
- Docs CI: use `npm ci` and cache `website/package-lock.json` for better cache hits.
- Testing: maintain high coverage; optional homepage smoke import.

## [2025-09-05] — Architecture, Tests, CSP, Docs
### Added
- Extensive test suite expansion (53 → 73 tests):
  - Dialog focus trap, keyboard shortcuts (Y/J, N/Escape, Tab/Arrows), overlay cleanup.
  - Composition storage listeners (blacklist/confirm) and scripting error handling.
  - Scripting preregistration (register/skip/execute) coverage; background apply‑settings integration test.
  - Website config/sidebars smoke tests.
- Codecov integration (action v5) and coverage badge; artifacts per Node version.
- ESLint baseline and CI lint steps (web‑ext + ESLint).

### Changed
- Upgraded Vitest stack to v3.2.4 and @vitest/coverage‑v8.
- Composition: injected logger used consistently; avoid redundant content‑script injection per tab.
- Confirm UI: a11y labels (aria‑labelledby/aria‑describedby).
- Options: extracted CSS to `sources/options.css` (CSP/theming‑friendly).
- Docs site: safer local search plugin resolution; footer link fix; blog disabled.

### Fixed
- CI artifact name conflicts (unique per Node matrix, overwrite on reruns).
- Noisy stderr in tests (muted expected warnings in error‑path cases).


## [1.0.1]
### Changed
- Switched to `browser.messages.listAttachments()` instead of manual MIME traversal.

## [1.0.0]
### Added
- Initial public release.

---

[Unreleased]: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/compare
