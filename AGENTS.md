# Repository Guidelines

## On session start
- Connect to the `systemprompts` MCP filesystem.
- Read following files and keep their guidance in working memory: 
    - core_programming_principles.md
    - js_clean_architecture.md
    - js_clean_code.md
    - thunderbird_mail_extensions.md

## Project Structure & Module Organization
- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots.
- `sources/`: main add-on code and assets.
  - JS: `background.js`, `handle_language.js`, `handle_donate_link.js`, `handle_github_link.js`.
  - UI: `options.html`, `popup.html`.
  - Manifests: `manifest_ATN.json`, `manifest_PRIVATE.json` (copied to `manifest.json` during packaging).
  - Assets: `sources/icons/*.png`.
- Artifacts: `reply-with-attachments-plugin*.zip` are generated; do not edit by hand.

## Build, Test, and Development Commands
- `make help`: list available developer commands.
- `make test`: run the Vitest test suite.
- `make pack`: build ATN and PRIVATE ZIPs (wraps `bash distribution_zip_packer.sh`).
- Manual install (dev): Thunderbird → Tools → Add-ons and Themes → gear menu → Install Add-on From File… → choose the built ZIP.
- Tip: update version in both `sources/manifest_*.json` before packaging.

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
