---
id: development
title: Development
sidebar_label: Development
---

## Development Guide

### Prerequisites
- Node.js 18+ and npm
- Thunderbird 128 ESR or newer (for manual testing)

### Project Layout (high‑level)
- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: main add‑on code (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus docs (with i18n under `website/i18n/de/...`)

### Install & Tooling
- Install root deps: `npm ci`
- Docs (optional): `cd website && npm ci`
- Discover targets: `make help`

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
- i18n only: `make test-i18n` (parity, placeholders, titles)

### Debugging & Logs
- Error Console: Tools → Developer Tools → Error Console
- Toggle verbose logs at runtime:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- Logs appear while composing/sending replies

### Docs (website)
- Dev server: `cd website && npm run start`
- Build static site: `cd website && npm run build`
- i18n: English lives in `website/docs/*.md`; German translations in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`

### Security & Configuration Tips
- Do not commit `sources/manifest.json` (created temporarily by the build)
- Keep `browser_specific_settings.gecko.id` stable to preserve the update channel

### Troubleshooting
- Ensure Thunderbird is 128 ESR or newer
- Use the Error Console for runtime issues

### Contributing
- See CONTRIBUTING.md for branch/commit/PR guidelines
