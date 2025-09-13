# Repository Guidelines

## On session start

- Connect to the `systemprompts` MCP filesystem.
- Read following files and keep their guidance in working memory:
  - core_programming_solid.md
  - js_clean_architecture.md
  - js_clean_code.md
  - thunderbird_mail_extensions.md
  - bash_clean_architecture.md
  - bash_clean_code.md
  - bash_small_functions.md

always apply those Rules :

- core_programming_solid.md

when writing or refracturing Bash scripts, additionally apply those Rules :

- bash_clean_architecture.md
- bash_clean_code.md
- bash_small_functions.md

when writing or refracturing JS scripts, additionally apply those Rules :

- js_clean_architecture.md
- js_clean_code.md

when writing or refracturing thunderbird specific code apply those Rules :

- thunderbird_mail_extensions.md

## Project Structure & Module Organization

- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots.
- `sources/`: main add-on code and assets.
  - JS: `background.js`, `handle_language.js`, `handle_donate_link.js`, `handle_github_link.js`.
  - UI: `options.html`, `popup.html`.
  - Manifests: `manifest_ATN.json`, `manifest_LOCAL.json` (copied to `manifest.json` during packaging).
  - Assets: `sources/icons/*.png`.
- Artifacts: `reply-with-attachments-plugin*.zip` are generated; do not edit by hand.

## Build, Test, and Development Commands

- `make help` — list all targets with one‑line docs (reads lines annotated with `##`).
- Interactive menu (default): running plain `make` opens a menu (whiptail) to pick a target and optionally pass arguments (e.g., `OPTS="--locales en,de"`). If `whiptail` is not available, it falls back to `make help`.
- `make menu` — open the interactive menu explicitly (same as running `make` with no args).
- `make clean` — remove local artifacts (`tmp/`, `web-local-preview/`, `website/build/`, temporary linkcheck/publish folders).

- Formatting & linting
  - `make prettier` — format the repository in place (writes changes).
  - `make prettier-check` — Prettier in check mode (no writes); fails if reformat needed.
  - `make eslint` — run ESLint via the flat config (`npm run -s lint:eslint`).
  - `make lint` — web‑ext lint on `sources/` (creates a temporary `sources/manifest.json` from `manifest_LOCAL.json`, ignores ZIP artifacts; non‑fatal).

- Tests
- `make test` — Prettier (write), ESLint, then Vitest. Coverage runs if `@vitest/coverage-v8` is installed (thresholds in `vitest.config.mjs`). Also runs a docs URL guard that fails when non‑EN localized docs contain absolute EN docs URLs.
  - `make test-i18n` — i18n‑focused tests only: addon UI strings (keys/placeholders/titles/URLs/parity) and website docs across all locales (one test per EN doc per locale verifying file existence, matching `id`, non‑empty `title`, and `sidebar_label` when EN has it). Also runs the docs URL guard described above.

- Packaging
  - `make pack` — run linter then build ATN and LOCAL ZIPs (wraps `distribution_zip_packer.sh`). Artifacts: `reply-with-attachments-plugin.zip` (ATN) and a timestamped `*-LOCAL.zip`.

- Web (alphabetical)
  - `make web_build` — build the Docusaurus site into `website/build`.
- `make web_build_linkcheck` — offline‑safe link check; accepts `OPTS="--locales en|all"`. Builds then scans all generated pages; treats `/Thunderbird-Reply-with-Attachments/` as base prefix; skips external HTTP(S) and anchors; no network fetch.
  - `make web_build_local_preview` — build and sync the docs into a local `gh-pages` worktree (use `OPTS`, e.g., `--locales en|all --no-test --no-link-check --dry-run`).
  - `make web_push_github` — build if needed and push `website/build` to the `gh-pages` branch on the Git remote.
  - Note: the Docusaurus locale list is collapsed to a single comma‑separated line for readability (cosmetic only).

- Translations
  - Docs (preferred Batch mode): `make translate_web_docs_batch OPTS="<doc|all> <lang|all>"`
    - Reads API key/model from `.env` (`OPENAI_API_KEY`, `OPENAI_MODEL`, optional `OPENAI_TEMPERATURE`).
    - With `OPTS`, pass tokens directly to the script: first the doc(s) or `all`, then locales or `all`.
    - Examples: `make translate_web_docs_batch OPTS="all de,fr"`, `make translate_web_docs_batch OPTS="changelog.md de,fr"`
    - Env: `OPENAI_API_KEY` (required), optional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, batch options: `OPENAI_BATCH_WINDOW` (default `24h`), `BATCH_POLL_INTERVAL_MS` (default `60000`), `BATCH_PER_REQUEST_LIMIT`.
    - Logs: `translation_web_batch.log`.
  - Docs (legacy Sync mode): `make translate_web_docs_sync OPTS="<doc|all> <lang|all>"` (synchronous per‑pair requests).
    - Logs: `translation_web_sync.log`.
  - `make translation_app` — translate app UI strings from `sources/_locales/en/messages.json` to all locales under `sources/_locales` (logs to `translation_app.log`).
  - `make translation_web_index` — translate website UI strings (homepage/navbar/footer) from `website/i18n/en/code.json` to all locales under `website/i18n/<lang>/code.json` (except `en`). Uses OpenAI only (hardcoded).
    - Requirements: export `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`, e.g., `gpt-4o-mini`).
    - Optional `OPTS`: `--locales de,fr` to limit languages; `--force` to overwrite existing values; also accepts `--locale` and common typo `--localed`.
    - Alias: `make translate_web_index`.

- Manual install (dev)
  - Thunderbird → Tools → Add‑ons and Themes → gear → Install Add-on From File… → select the built ZIP (use the LOCAL ZIP for development).

- Tips
  - Update version in both `sources/manifest_*.json` before packaging.
  - You can override the package manager by setting `NPM=...` (defaults to `npm`).

### Common Make Targets (Alphabetical)

| Target                     | One‑line description                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `clean`                    | Remove local build/preview artifacts (`tmp/`, `web-local-preview/`, `website/build/`). |
| `commit`                   | Format, run tests (incl. i18n), update changelog, commit & push.                       |
| `eslint`                   | Run ESLint via flat config (`npm run -s lint:eslint`).                                 |
| `help`                     | List all targets with one‑line docs (sorted).                                          |
| `lint`                     | web‑ext lint on `sources/` (temp manifest; ignores ZIPs; non‑fatal).                   |
| `menu`                     | Interactive menu to select a target and optional arguments.                            |
| `pack`                     | Build ATN & LOCAL ZIPs (runs linter; calls packer script).                             |
| `prettier`                 | Format repository in place (writes changes).                                           |
| `prettier_check`           | Prettier in check mode (no writes); fails if reformat needed.                          |
| `prettier_write`           | Alias for `prettier`.                                                                  |
| `test`                     | Prettier (write), ESLint, then Vitest (coverage if configured) + docs URL guard.       |
| `test_i18n`                | i18n‑only tests for add‑on strings and website parity + docs URL guard.                |
| `translate_app`            | Alias for `translation_app`.                                                           |
| `translation_app`          | Translate app UI strings from `sources/_locales/en/messages.json`.                     |
| `translate_web_docs_batch` | Translate website docs via OpenAI Batch API (preferred).                               |
| `translate_web_docs_sync`  | Translate website docs synchronously (legacy, non-batch).                              |
| `translate_web_index`      | Alias for `translation_web_index`.                                                     |
| `translation_web_index`    | Translate website UI (`website/i18n/en/code.json` → `website/i18n/<lang>/code.json`).  |
| `web_build`                | Build docs to `website/build` (supports `--locales` / `BUILD_LOCALES`).                |
| `web_build_linkcheck`      | Offline‑safe link check (skips remote HTTP[S]).                                        |
| `web_build_local_preview`  | Local gh‑pages preview; optional tests/link‑check; auto‑serve on 8080–8090.            |
| `web_push_github`          | Push `website/build` to the `gh-pages` branch.                                         |

## Coding Style & Naming Conventions

- Indentation: 4 spaces; use `const`/`let`, async/await.
- Strings: be consistent within a file; default to single quotes.
- File names: lowercase; JS helpers use underscores (e.g., `handle_donate_link.js`).
- Logging: use `console.log/warn/error` with clear, actionable messages.
- No enforced linter—match the surrounding style; keep functions small and focused.

## Testing Guidelines

- Target: Thunderbird 128 ESR or newer.
- Scenario test: reply to a message with/without attachments; verify attachments copy and SMIME (`smime.p7s`, related content types) are excluded.
- Diagnostics: Tools → Developer Tools → Error Console for runtime logs.
- Add reproduction steps in PRs; screenshots welcome.

## Commit & Pull Request Guidelines

- Commits: imperative mood, concise scope (e.g., `fix: skip SMIME attachments`).
- Branches: `feature/<short-name>` or `fix/<short-name>`.
- PRs: include summary, rationale, linked issues, before/after behavior, and testing notes. Update README if UX changes.

## Architecture Overview

- Background listener `compose.onComposeStateChanged` triggers on reply, collects original attachments via `browser.messages.listAttachments`, filters SMIME, and adds them with `browser.compose.addAttachment`.
- Duplicate prevention per tab via an in-memory `Map` (`processedTabs`).

## Security & Configuration Tips

- Do not commit `sources/manifest.json`; the build script creates it temporarily.
- Keep `browser_specific_settings.gecko.id` stable to preserve update channel.

## Translations (Docs)

- Scripts:
  - Preferred batch mode: `scripts/translate_web_docs_batch.js` (OpenAI Batch API)
  - Legacy sync mode: `scripts/translate_web_docs_sync.js`
- Reads API key and model from `.env` at repo root:
  - `OPENAI_API_KEY=...`
  - `OPENAI_MODEL=gpt-4o-mini` (example)
  - Optional: `OPENAI_TEMPERATURE=0.2` (only set if your model supports non‑default temperatures; otherwise omit)
- Source is always `website/docs/<filename>`; output goes to `website/i18n/<lang>/docusaurus-plugin-content-docs/current/<filename>`.
- Usage:
  - Batch (preferred) via Make:
    - `make translate_web_docs_batch OPTS="all de,fr"`
    - `make translate_web_docs_batch OPTS="changelog.md de,fr"`
  - Sync (legacy) via Make:
    - `make translate_web_docs_sync OPTS="all de,fr"`
  - Notes:
    - Batch env: `OPENAI_BATCH_WINDOW` (default `24h`), `BATCH_POLL_INTERVAL_MS` (default `60000`), `BATCH_PER_REQUEST_LIMIT`.
    - Logs: batch → `translation_web_batch.log`, sync → `translation_web_sync.log`.

- Logging:
  - The translator writes a summary log to `translation_web.log` in the repo root.
- Notes:
  - Preserves code blocks/inline code and front‑matter `id`; translates `title`/`sidebar_label`.
  - Normalizes accidental double‑braced anchors in output (e.g., `{{#id}}` → `{#id}`).
  - Target languages are inferred from subfolders of `website/i18n`.

## Translations (App UI Strings)

- Script: `scripts/translate_app.js`.
- Source → target:
  - Reads `sources/_locales/en/messages.json` and writes translated `messages.json` for every other locale under `sources/_locales/<lang>/`.
  - Copies the exact key/object structure; replaces only `message` values.
  - Preserves placeholders like `$1`, `$2`, `$3` and leaves URL values unchanged.
  - Never adds or removes keys — keeps all locales synchronized with EN.
- Usage:
  - One-shot: `node scripts/translate_app.js --locales all|de,fr`
  - Make: `make translation-app OPTS="--locales all|de,fr"`
- Logging:
  - Writes a summary log to `translation_app.log` in the repo root.
- Configuration:
  - Reads API key/model from `.env` (`OPENAI_API_KEY`, `OPENAI_MODEL`, optional `OPENAI_TEMPERATURE`).

## Changes in WEB Documentation

- when asked to update documentation - only do that in the english docs under /website/docs because other languages will be translated automatically,
  unless stated otherwise by the user. In doubt - ask the user

## Changes in APP Strings

- when i18 strings are changed, only to that in sources/\_locales/en because other languages will be translated automatically,
  unless stated otherwise by the user. In doubt - ask the user

## commit/push/GitHub policy

- run "make test" before any push to avoid lint/test breakage.
- after push, monitor errors in the github actions and try to correct the errors
- make sure the website is correctly created and published by github action
