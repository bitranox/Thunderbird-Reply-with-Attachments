# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to
Semantic Versioning (where applicable for add-on releases).

## [Unreleased]

### Auto Update (2025-09-06 02:39)

- Summary: 10 files changed, 55 insertions(+), 41 deletions(-)
- Branch: master
- Files:
  - eslint.config.mjs
  - package.json
  - sources/app/composition.js
  - sources/app/shared/utils.js
  - sources/manifest_ATN.json
  - sources/manifest_LOCAL.json
  - tests/composition.confirm-disabled.no-messaging.test.js
  - tests/composition.onremoved.cacheclear.test.js
  - vitest.config.mjs
  - website/docs/permissions.md

- CI: run `web-ext lint` against both ATN and LOCAL manifests.
- Docs: link checks also on PR builds.

## [2025-09-06] — Coverage Scoping, Website Fixes, Test‑only Exports

### Added

- New test: confirm disabled path adds attachments without sending confirm messages.
- Permissions doc: “Why we need each permission” table.

### Changed

- Coverage config now scopes to add‑on sources only and excludes typedef‑only `ports.js`, restoring coverage >85% with thresholds enforced.
- Gate test‑only globals in composition to `NODE_ENV === 'test'`.
- README: added Quickstart blurb and link.
- Package version aligned with manifest (1.0.1).

### Fixed

- Website: Quickstart button link corrected; navbar logo respects baseUrl.
- Repo hygiene: stop tracking `node_modules/` and `coverage/` (added to .gitignore).

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
