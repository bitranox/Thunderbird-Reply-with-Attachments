# Contributing Guide

Thanks for helping improve Reply with Attachments! This guide keeps changes small, safe, and easy to review.

## 1) Workflow at a Glance

- Fork and clone the repo.
- Install dependencies: `npm ci` (root). For docs: `cd website && npm ci`.
- Run tests: `make test` (see coverage notes below).
- Create a branch, make focused changes, open a PR.

## 2) Branches & Commits

- Branch names: `feature/<short-name>`, `fix/<short-name>`, `docs/<short-name>`, `chore/<short-name>`
- Commits: imperative, concise. Examples:
  - `fix: skip SMIME attachments`
  - `feat: add blacklist glob parsing`
  - `docs: update configuration screenshots`

## 3) Coding Standards (JS)

- Small, intention‑revealing functions; single responsibility.
- Modern JS: ESM, async/await, `const/let`, no `var`.
- Strings: prefer single quotes within a file; be consistent.
- Indentation: 2 spaces (enforced by Prettier).
- File naming: lowercase with underscores for add‑on UI scripts (e.g., `handle_donate_link.js`); kebab‑case for website routes/docs. Keep existing names stable and follow the convention for new files.
- Logging: `console.log/warn/error` with clear, actionable messages.
- Follow the existing style; no sweeping refactors in unrelated code.

## 4) Build & Packaging

- Build ZIPs: `make pack` (wraps `bash distribution_zip_packer.sh`).
- Artifacts: `reply-with-attachments-plugin*.zip` (don’t edit or commit them).
- Versioning tip: when bumping versions, update both `sources/manifest_ATN.json` and `sources/manifest_LOCAL.json` before packaging.
- Do NOT commit `sources/manifest.json` (the build generates it temporarily).

## 5) Tests & Style

- Run all tests: `make test` (Vitest).
- Coverage (optional):
  1. `npm i -D @vitest/coverage-v8`
  2. `make test` → see summary and `coverage/index.html`.
- i18n checks only: `make test-i18n` (parity, placeholders, titles).
- Add tests for changed behavior; keep tests tiny and focused.
- Style: run `npm run format:check` and `npm run lint:eslint` locally; CI runs both.

## 6) Docs (Website)

- Live under `website/` (Docusaurus). EN in `website/docs/*.md`, DE in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`.
- Local dev: `cd website && npm run start`.
- Build: `cd website && npm run build` (CI deploys to GitHub Pages on push to default branch).
- If UX changes, update docs and screenshots, and the German translation where applicable.

## 7) Pull Requests

Include:

- Summary & rationale; linked issues.
- Before/after behavior; screenshots for UI changes.
- Testing notes and reproduction steps.

Checklist:

- [ ] Tests updated and passing (`make test`).
- [ ] Docs updated (EN/DE) if UX/permissions changed.
- [ ] No generated artifacts committed (ZIPs or temporary `manifest.json`).
- [ ] Version bump in both manifests if you’re shipping a release change.

## 8) Troubleshooting & Debug Logs

- Thunderbird 128 ESR+ required for testing.
- Error Console: Tools → Developer Tools → Error Console.
- Toggle verbose logs at runtime:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`

## 9) Security & Configuration

- Keep `browser_specific_settings.gecko.id` stable to preserve the update channel.
- No secrets in code or logs. Keep dependencies minimal.

Happy hacking!
