---
id: development
title: Development
sidebar_label: Development
---

## Development Guide

### Prerequisites

- Node.js 18+ and npm (tested with Node 20)
- Thunderbird 128 ESR or newer (for manual testing)

### Project Layout (high‑level)

- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: main addon code (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus docs (with i18n under `website/i18n/de/...`)

### Install & Tooling

- Install root deps: `npm ci`
- Docs (optional): `cd website && npm ci`
- Discover targets: `make help`

### Make Targets (detailed)

The repository provides a thin Makefile to standardize common dev flows. Run `make help` to list targets.

- `make help`
  - Lists all available targets with one‑line descriptions (anything annotated with `##` in the Makefile).

- `make prettier`
  - Formats the entire repo in place via Prettier (`node_modules/prettier/bin/prettier.cjs --write .`).
  - Used by other targets to ensure consistent formatting.

- `make prettier-write`
  - Alias that simply runs `make prettier`.

- `make prettier-check`
  - Runs Prettier in check mode (no writes). Fails if files would be reformatted.

- `make eslint`
  - Runs ESLint using the flat config (`npm run -s lint:eslint`).

- `make lint`
  - Lints the MailExtension using `web-ext lint` against `sources/`.
  - Implementation details:
    - Temporarily copies `sources/manifest_LOCAL.json` to `sources/manifest.json` for the linter.
    - Ensures the temporary file is removed on exit.
    - Ignores built ZIP artifacts (`reply-with-attachments-plugin*.zip`).
    - `web-ext` findings do not fail the pipeline (`|| true`), so review the output.

- `make test`
  - End‑to‑end developer check: format (write), format (check), ESLint, then Vitest.
  - Vitest runs with coverage when `@vitest/coverage-v8` is installed; otherwise it runs without coverage.
  - Coverage settings and thresholds are configured in `vitest.config.mjs` (global: 85% lines/funcs/stmts, 70% branches).

- `make test-i18n`
- Runs i18n‑focused test suites only, covering addon UI strings and website docs across all locales:
  - `npm run test:i18n` → executes `tests/i18n.*.test.js` (with coverage if available) for UI keys, placeholders, titles, URLs, and cross‑locale parity in messages.
  - `npm run -s test:website-i18n` → verifies website translations for every locale under `website/i18n/<lang>/...` with one test per EN doc per locale:
    - Translation file exists (same filename or `<id>.md` based on EN front‑matter `id`).
    - Translated front‑matter `id` exists and matches the EN `id`.
    - Translated `title` is non‑empty.
    - If EN has `sidebar_label`, the translation has a non‑empty `sidebar_label` too.

- `make pack`
  - Builds both ATN and LOCAL ZIPs using `distribution_zip_packer.sh`.
  - Depends on `make lint` first.
  - Outputs artifacts at the repo root (`reply-with-attachments-plugin*.zip`). Do not edit artifacts by hand.
  - Tip: bump versions in `sources/manifest_ATN.json` and `sources/manifest_LOCAL.json` before packaging.

- `make commit`
  - Opinionated helper to stage typical changes and push:
    - Prettier (write + check), `make test`, `make test-i18n`.
    - Stages all changes; if there are staged diffs, appends a changelog entry (`scripts/append-changelog-entry.sh`).
    - Commits with a standardized message and pushes to `origin/<current-branch>`.
  - Requires a configured git remote and a clean repo state for best results.

- `make docs-build`
  - Builds the Docusaurus website into `website/build`.
  - Internals: `cd website && npm ci && node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build`.
  - Run this before checking or deploying docs.

- `make docs-deploy-local`
  - Builds and syncs the website into a local `gh-pages` worktree via `scripts/docs-local-deploy.sh`.
  - Customize with `OPTS`, for example:
    - `make docs-deploy-local OPTS="--locales en --no-test --no-link-check --dry-run"`
    - `make docs-deploy-local OPTS="--locales all"`

- `make docs-push-github`
  - Pushes the prepared local `gh-pages` worktree to the `gh-pages` branch on the Git remote using `scripts/docs-gh-push.sh`.

- `make docs-build-linkcheck`
  - Builds then checks internal links using `linkinator` (offline‑safe).
  - Accepts `OPTS="--locales en|all"` (default is all locales). Example:
    - `make docs-build-linkcheck OPTS="--locales en"`
  - Offline‑safe behavior:
    - Rewrites the GitHub Pages `baseUrl` (`/Thunderbird-Reply-with-Attachments/`) to `/` for local scanning.
    - Skips all remote HTTP(S) links except `localhost` to avoid relying on the real website.
  - Use this to catch broken in‑site navigation before publishing.

- `make translation DOC=<file(s)|all> TO=<lang(s)|all>`
  - Translates one or more docs from `website/docs` into the `website/i18n/<lang>/...` tree.
  - Examples:
    - `make translation DOC=changelog.md TO=de`
    - `make translation DOC="changelog.md features.md" TO="de fr"`
    - `make translation DOC=all TO=all`
  - Notes:
    - Reads API key/model from `.env` at the repo root (`OPENAI_API_KEY`, `OPENAI_MODEL`, optional `OPENAI_TEMPERATURE`).
    - Preserves code blocks and front‑matter `id`; translates `title`/`sidebar_label`.
  - Alias: `make translate DOC=… TO=…` (identical behavior).

Tip: You can override the package manager used by Make by setting `NPM=...` (defaults to `npm`).

### Build & Package

- Build ZIPs: `make pack`
  - Produces ATN and LOCAL ZIPs in the repo root (do not edit artifacts by hand)
  - Tip: update version in both `sources/manifest_ATN.json` and `sources/manifest_LOCAL.json` before packaging
- Manual install (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → select the built ZIP

### Test

- Full suite: `make test` (Vitest)
- Coverage (optional):
  - `npm i -D @vitest/coverage-v8`
  - Run `make test`; open `coverage/index.html` for HTML report
- i18n only: `make test-i18n` (UI keys/placeholders/titles + website per‑locale per‑doc parity with id/title/sidebar_label checks)

### Debugging & Logs

- Error Console: Tools → Developer Tools → Error Console
- Toggle verbose logs at runtime:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- Logs appear while composing/sending replies

### Docs (website)

- Dev server: `cd website && npm run start`
- Build static site: `cd website && npm run build`
- Make equivalents (alphabetical): `make docs-build`, `make docs-build-linkcheck`, `make docs-deploy-local`, `make docs-push-github`
  - Usage examples:
    - EN only, skip tests/link‑check, no push: `make docs-deploy-local OPTS="--locales en --no-test --no-link-check --dry-run"`
    - All locales, with tests/link‑check, then push: `make docs-deploy-local && make docs-push-github`
- Before publishing, run the offline‑safe link check: `make docs-build-linkcheck`.
- i18n: English lives in `website/docs/*.md`; German translations in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Search: If Algolia DocSearch env vars are set in CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), the site uses Algolia search; otherwise it falls back to local search. On the homepage, press `/` or `Ctrl+K` to open the search box.

### Security & Configuration Tips

- Do not commit `sources/manifest.json` (created temporarily by the build)
- Keep `browser_specific_settings.gecko.id` stable to preserve the update channel

### Settings Persistence

- Storage: All user settings live in `storage.local` and persist across add‑on updates.
- Install: Defaults are applied only when a key is strictly missing (undefined).
- Update: A migration fills only missing keys; existing values are never overwritten.
- Schema marker: `settingsVersion` (currently `1`).
- Keys and defaults:
  - `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
  - `confirmBeforeAdd: boolean` → `false`
  - `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
  - `warnOnBlacklistExcluded: boolean` → `true`
- Code: see `sources/background.js` → `initializeOrMigrateSettings()` and `SCHEMA_VERSION`.

Dev workflow (adding a new setting)

- Bump `SCHEMA_VERSION` in `sources/background.js`.
- Add the new key + default to the `DEFAULTS` object in `initializeOrMigrateSettings()`.
- Use the "only-if-undefined" rule when seeding defaults; do not overwrite existing values.
- If the setting is user‑visible, wire it in `sources/options.js` and add localized strings.
- Add/adjust tests (see `tests/background.settings.migration.test.js`).

Manual testing tips

- Simulate a fresh install: clear the extension’s data dir or start with a new profile.
- Simulate an update: set `settingsVersion` to `0` in `storage.local` and re‑load; confirm existing values remain unchanged and only missing keys are added.

### Troubleshooting

- Ensure Thunderbird is 128 ESR or newer
- Use the Error Console for runtime issues

### CI & Coverage

- GitHub Actions (`CI — Tests`) runs vitest with coverage thresholds (85% lines/functions/branches/statements). If thresholds are not met, the job fails.
- The workflow uploads an artifact `coverage-html` with the HTML report; download it from the run page (Actions → latest run → Artifacts).

### Contributing

- See CONTRIBUTING.md for branch/commit/PR guidelines
- Tip: Create a separate Thunderbird development profile for testing to avoid impacting your daily profile.

### Translations

- Running large “all → all” translation jobs can be slow and expensive. Start with a subset (e.g., a few docs and 1–2 locales), review the result, then expand.
