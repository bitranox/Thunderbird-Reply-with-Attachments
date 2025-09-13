---
id: development
title: 'Rivojlanish'
sidebar_label: 'Rivojlanish'
---

## Development Guide {#development-guide}

:::note Edit English only; translations propagate
Update documentation **only** under `website/docs` (English). Translations under `website/i18n/<locale>/…` are generated and should not be edited manually. Use the translation tasks (e.g., `make translate_web_docs_batch`) to refresh localized content.
:::

### Prerequisites {#prerequisites}

- Node.js 22+ and npm (tested with Node 22)
- Thunderbird 128 ESR or newer (for manual testing)

---

### Project Layout (high‑level) {#project-layout-high-level}

- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: main add-on code (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus docs (with i18n under `website/i18n/de/...`)

---

### Install & Tooling {#install-and-tooling}

- Install root deps: `npm ci`
- Docs (optional): `cd website && npm ci`
- Discover targets: `make help`

---

### Live Dev (web‑ext run) {#live-dev-web-ext}

- Quick loop in Firefox Desktop (UI smoke‑tests only):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Run in Thunderbird (preferred for MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Keep Thunderbird’s Error Console open (Tools → Developer Tools → Error Console).
- MV3 event pages are suspended when idle; reload the add‑on after code changes, or let web‑ext auto‑reload.
- Some Firefox‑only behaviors differ; always verify in Thunderbird for API parity.
- Thunderbird binary paths (examples):
- Linux: `thunderbird` (e.g., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profile isolation: Use a separate Thunderbird profile for development to avoid impacting your daily setup.

---

### Make Targets (Alphabetical) {#make-targets-alphabetical}

The Makefile standardizes common dev flows. Run `make help` anytime for a one‑line summary of every target.

Tip: running `make` with no target opens a simple Whiptail menu to pick a target.

| Target                                                   | One‑line description                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Remove local build/preview artifacts (tmp/, web-local-preview/, website/build/).          |
| [`commit`](#mt-commit)                                   | Format, run tests (incl. i18n), update changelog, commit & push.                          |
| [`eslint`](#mt-eslint)                                   | Run ESLint via flat config (`npm run -s lint:eslint`).                                    |
| [`help`](#mt-help)                                       | List all targets with one‑line docs (sorted).                                             |
| [`lint`](#mt-lint)                                       | web‑ext lint on `sources/` (temp manifest; ignores ZIPs; non‑fatal).                      |
| [`menu`](#mt-menu)                                       | Interactive menu to select a target and optional arguments.                               |
| [`pack`](#mt-pack)                                       | Build ATN & LOCAL ZIPs (runs linter; calls packer script).                                |
| [`prettier`](#mt-prettier)                               | Format repository in place (writes changes).                                              |
| [`prettier_check`](#mt-prettier_check)                   | Prettier in check mode (no writes); fails if reformat needed.                             |
| [`prettier_write`](#mt-prettier_write)                   | Alias for `prettier`.                                                                     |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, then Vitest (coverage if configured).                           |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑only tests: add‑on placeholders/parity + website parity.                             |
| [`translate_app`](#mt-translation-app)                   | Alias for `translation_app`.                                                              |
| [`translation_app`](#mt-translation-app)                 | Translate app UI strings from `sources/_locales/en/messages.json`.                        |
| [`translate_web_docs_batch`](#mt-translation-web)        | Translate website docs via OpenAI Batch API (preferred).                                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | Translate website docs synchronously (legacy, non-batch).                                 |
| [`translate_web_index`](#mt-translation_web_index)       | Alias for `translation_web_index`.                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Translate homepage/navbar/footer UI (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Build docs to `website/build` (supports `--locales` / `BUILD_LOCALES`).                   |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑safe link check (skips remote HTTP[S]).                                           |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Local gh‑pages preview; auto‑serve on 8080–8090; optional tests/link‑check.               |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` to the `gh-pages` branch.                                            |

Syntax for options

- Use `make <command> OPTS="…"` to pass options (quotes recommended). Each target below shows example usage.

--

-

#### Locale build tips {#locale-build-tips}

- Build a subset of locales: set `BUILD_LOCALES="en de"` or pass `OPTS="--locales en,de"` to web targets.
- Preview a specific locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Package {#build-and-package}

- Build ZIPs: `make pack`
- Produces ATN and LOCAL ZIPs in the repo root (do not edit artifacts by hand)
- Tip: update version in both `sources/manifest_ATN.json` and `sources/manifest_LOCAL.json` before packaging
- Manual install (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → select the built ZIP

---

### Test {#test}

- Full suite: `make test` (Vitest)
- Coverage (optional):
- `npm i -D @vitest/coverage-v8`
- Run `make test`; open `coverage/index.html` for HTML report
- i18n only: `make test_i18n` (UI keys/placeholders/titles + website per‑locale per‑doc parity with id/title/sidebar_label checks)

---

### Debugging & Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Toggle verbose logs at runtime:
- Enable: `messenger.storage.local.set({ debug: true })`
- Disable: `messenger.storage.local.set({ debug: false })`
- Logs appear while composing/sending replies

---

### Docs (website) {#docs-website}

- Dev server: `cd website && npm run start`
- Build static site: `cd website && npm run build`
- Make equivalents (alphabetical): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Usage examples:
- EN only, skip tests/link‑check, no push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- All locales, with tests/link‑check, then push: `make web_build_local_preview && make web_push_github`
- Before publishing, run the offline‑safe link check: `make web_build_linkcheck`.
- i18n: English lives in `website/docs/*.md`; German translations in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Search: If Algolia DocSearch env vars are set in CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), the site uses Algolia search; otherwise it falls back to local search. On the homepage, press `/` or `Ctrl+K` to open the search box.

---

#### Donate redirect route {#donate-redirect}

- `website/src/pages/donate.js`
- Route: `/donate` (and `/<locale>/donate`)
- Behavior:
- If the current route has a locale (e.g., `/de/donate`), use it
- Otherwise, pick the best match from `navigator.languages` vs configured locales; fall back to default locale
- Redirects to:
- `en` → `/docs/donation`
- others → `/<locale>/docs/donation`
- Uses `useBaseUrl` for proper baseUrl handling
- Includes meta refresh + `noscript` link as fallback

---

---

#### Preview Tips {#preview-tips}

- Stop Node preview cleanly: open `http://localhost:<port>/__stop` (printed after `Local server started`).
- If images don’t load in MDX/JSX, use `useBaseUrl('/img/...')` to respect the site `baseUrl`.
- The preview starts first; the link check runs afterward and is non‑blocking (broken external links won’t stop the preview).
- Example preview URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (printed after “Local server started”).
- External links in link‑check: Some external sites (e.g., addons.thunderbird.net) block automated crawlers and may show 403 in link checks. The preview still starts; these are safe to ignore.

---

#### Translate the Website {#translate-website}

What you can translate

- Website UI only: homepage, navbar, footer, and other UI strings. Docs content stays English‑only for now.

Where to edit

- Edit `website/i18n/<locale>/code.json` (use `en` as reference). Keep placeholders like `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` unchanged.

Generate or refresh files

- Create missing stubs for all locales: `npm --prefix website run i18n:stubs`
- Overwrite stubs from English (after adding new strings): `npm --prefix website run i18n:stubs:force`
- Alternative for a single locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Translate homepage/navbar/footer UI strings (OpenAI)

- Set credentials once (shell or .env):
- `export OPENAI_API_KEY=sk-...`
- Optional: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (all locales, skip en): `make translate_web_index`
- Limit to specific locales: `make translate_web_index OPTS="--locales de,fr"`
- Overwrite existing values: `make translate_web_index OPTS="--force"`

Validation & retries

- The translation script validates JSON shape, preserves curly‑brace placeholders, and ensures URLs are unchanged.
- On validation failure, it retries with feedback up to 2 times before keeping existing values.

Preview your locale

- Dev server: `npm --prefix website run start`
- Visit `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Submitting

- Open a PR with the edited `code.json` file(s). Keep changes focused and include a quick screenshot when possible.

---

### Security & Configuration Tips {#security-and-configuration-tips}

- Do not commit `sources/manifest.json` (created temporarily by the build)
- Keep `browser_specific_settings.gecko.id` stable to preserve the update channel

---

### Settings Persistence {#settings-persistence}

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

---

### Troubleshooting {#troubleshooting}

- Ensure Thunderbird is 128 ESR or newer
- Use the Error Console for runtime issues
- If stored settings appear not to apply properly, restart Thunderbird and try again. (Thunderbird may cache state across sessions; a restart ensures fresh settings are loaded.)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) runs vitest with coverage thresholds (85% lines/functions/branches/statements). If thresholds are not met, the job fails.
- The workflow uploads an artifact `coverage-html` with the HTML report; download it from the run page (Actions → latest run → Artifacts).

---

### Contributing {#contributing}

- See CONTRIBUTING.md for branch/commit/PR guidelines
- Tip: Create a separate Thunderbird development profile for testing to avoid impacting your daily profile.

---

### Translations

- Running large “all → all” translation jobs can be slow and expensive. Start with a subset (e.g., a few docs and 1–2 locales), review the result, then expand.

---

- Retry policy: translation jobs perform up to 3 retries with exponential backoff on API errors; see `scripts/translate_web_docs_batch.js` and `scripts/translate_web_docs_sync.js`.

Screenshots for docs

- Store images under `website/static/img/`.
- Reference them in MD/MDX via `useBaseUrl('/img/<filename>')` so paths work with the site `baseUrl`.
- After adding or renaming images under `website/static/img/`, confirm all references still use `useBaseUrl('/img/…')` and render in a local preview.
  Favicons

- The multi‑size `favicon.ico` is generated automatically in all build paths (Make + scripts) via `website/scripts/build-favicon.mjs`.
- No manual step is required; updating `icon-*.png` is enough.
  Review tip

- Keep the front‑matter `id` unchanged in translated docs; translate only `title` and `sidebar_label` when present.

#### clean {#mt-clean}

- Purpose: remove local build/preview artifacts.
- Usage: `make clean`
- Removes (if present):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Purpose: format, test, update changelog, commit, and push.
- Usage: `make commit`
- Details: runs Prettier (write), `make test`, `make test_i18n`; appends changelog when there are staged diffs; pushes to `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Purpose: run ESLint via flat config.
- Usage: `make eslint`

---

#### help {#mt-help}

- Purpose: list all targets with one‑line docs.
- Usage: `make help`

---

#### lint {#mt-lint}

- Purpose: lint the MailExtension using `web-ext`.
- Usage: `make lint`
- Notes: temp‑copies `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignores built ZIPs; warnings do not fail the pipeline.

---

#### menu {#mt-menu}

- Purpose: interactive menu to select a Make target and optional arguments.
- Usage: run `make` with no arguments.
- Notes: if `whiptail` is not available, the menu falls back to `make help`.

---

#### pack {#mt-pack}

- Purpose: build ATN and LOCAL ZIPs (depends on `lint`).
- Usage: `make pack`
- Tip: bump versions in both `sources/manifest_*.json` before packaging.

---

#### prettier {#mt-prettier}

- Purpose: format the repo in place.
- Usage: `make prettier`

#### prettier_check {#mt-prettier_check}

- Purpose: verify formatting (no writes).
- Usage: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Purpose: alias for `prettier`.
- Usage: `make prettier_write`

---

#### test {#mt-test}

- Purpose: run Prettier (write), ESLint, then Vitest (coverage if installed).
- Usage: `make test`

#### test_i18n {#mt-test_i18n}

- Purpose: i18n‑focused tests for add‑on strings and website docs.
- Usage: `make test_i18n`
- Runs: `npm run test:i18n` and `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Purpose: translate add‑on UI strings from EN to other locales.
- Usage: `make translation_app OPTS="--locales all|de,fr"`
- Notes: preserves key structure and placeholders; logs to `translation_app.log`. Script form: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Purpose: translate website docs from `website/docs/*.md` into `website/i18n/<locale>/...`.
- Preferred: `translate_web_docs_batch` (OpenAI Batch API)
  - Usage (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional is still accepted: `OPTS="<doc|all> <lang|all>"`
- Behavior: builds JSONL, uploads, polls every 30s, downloads results, writes files.
- Note: a batch job may take up to 24 hours to complete (per OpenAI’s batch window). The console shows elapsed time on each poll.
- Env: `OPENAI_API_KEY` (required), optional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Usage (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional is still accepted: `OPTS="<doc|all> <lang|all>"`
- Behavior: synchronous per‑pair requests (no batch aggregation).
- Notes: Interactive prompts when `OPTS` omitted. Both modes preserve code blocks/inline code and keep front‑matter `id` unchanged; logs to `translation_web_batch.log` (batch) or `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Purpose: translate website UI strings (homepage, navbar, footer) from `website/i18n/en/code.json` to all locales under `website/i18n/<locale>/code.json` (excluding `en`).
- Usage: `make translate_web_index` or `make translate_web_index OPTS="--locales de,fr [--force]"`
- Requirements: export `OPENAI_API_KEY` (optional: `OPENAI_MODEL=gpt-4o-mini`).
- Behavior: validates JSON structure, preserves curly‑brace placeholders, keeps URLs unchanged, and retries with feedback on validation errors.

---

#### web_build {#mt-web_build}

- Purpose: build the docs site to `website/build`.
- Usage: `make web_build OPTS="--locales en|de,en|all"` (or set `BUILD_LOCALES="en de"`)
- Internals: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: runs `npm ci` in `website/` only if `website/node_modules/@docusaurus` is missing.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Purpose: offline‑safe link check.
- Usage: `make web_build_linkcheck OPTS="--locales en|all"`
- Notes: builds to `tmp_linkcheck_web_pages`; rewrites GH Pages `baseUrl` to `/`; skips remote HTTP(S) links.

#### web_build_local_preview {#mt-web_build_local_preview}

- Purpose: local gh‑pages preview with optional tests/link‑check.
- Usage: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Behavior: tries Node preview server first (`scripts/preview-server.mjs`, supports `/__stop`), falls back to `python3 -m http.server`; serves on 8080–8090; PID at `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Purpose: push `website/build` to the `gh-pages` branch.
- Usage: `make web_push_github`

Tip: set `NPM=…` to override the package manager used by the Makefile (defaults to `npm`).

---
