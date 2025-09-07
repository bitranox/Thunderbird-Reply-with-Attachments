---
id: development
title: ਡਿਵੈਲਪਮੈਂਟ
sidebar_label: ਡਿਵੈਲਪਮੈਂਟ
---

## ਡਿਵੈਲਪਮੈਂਟ ਗਾਈਡ

### ਲੋੜੀਂਦੀਆਂ ਚੀਜ਼ਾਂ

- Node.js 18+ ਅਤੇ npm
- Thunderbird 128 ESR ਜਾਂ ਨਵਾਂ (ਹੱਥੋਂ ਟੈਸਟਿੰਗ ਲਈ)

### ਪ੍ਰੋਜੈਕਟ ਲੇਆਊਟ (ਉੱਚ‑ਪੱਧਰੀ)

- Root: ਪੈਕੇਜਿੰਗ ਸਕ੍ਰਿਪਟ `distribution_zip_packer.sh`, ਡੌਕਸ, ਸਕ੍ਰੀਨਸ਼ਾਟ
- `sources/`: ਮੁੱਖ ਐਡ‑ਆਨ ਕੋਡ (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus ਡੌਕਸ (i18n `website/i18n/de/...` ਹੇਠ)

### ਇੰਸਟਾਲ ਅਤੇ ਟੂਲਿੰਗ

- Root ਡਿਪਸ ਇੰਸਟਾਲ ਕਰੋ: `npm ci`
- ਡੌਕਸ (ਵਿਕਲਪਿਕ): `cd website && npm ci`
- ਟਾਰਗਟ ਵੇਖੋ: `make help`

### ਬਿਲਡ ਅਤੇ ਪੈਕੇਜ

- ZIP ਬਣਾਓ: `make pack`
  - ਰਿਪੋ ਰੂਟ ਵਿੱਚ ATN ਅਤੇ LOCAL ZIP ਬਣਾਉਂਦਾ ਹੈ (ਆਰਟੀਫੈਕਟ ਹੱਥੋਂ ਐਡਿਟ ਨਾ ਕਰੋ)
  - ਟਿਪ: ਪੈਕੇਜਿੰਗ ਤੋਂ ਪਹਿਲਾਂ `sources/manifest_ATN.json` ਅਤੇ `sources/manifest_LOCAL.json` ਵਿੱਚ ਵਰਜਨ ਅਪਡੇਟ ਕਰੋ
- ਮੈਨੁਅਲ ਇੰਸਟਾਲ (dev): Thunderbird → Tools → Add‑ons and Themes → ਗਿਅਰ → Install Add‑on From File… → ਬਣਿਆ ZIP ਚੁਣੋ

### ਟੈਸਟ

- ਫੁੱਲ ਸੁਈਟ: `make test` (Vitest)
- ਕਵਰੇਜ (ਵਿਕਲਪਿਕ):
  - `npm i -D @vitest/coverage-v8`
  - `make test` ਚਲਾਓ; HTML ਰਿਪੋਰਟ ਲਈ `coverage/index.html` ਖੋਲ੍ਹੋ
- ਕੇਵਲ i18n: `make test-i18n` (parity, placeholders, titles)

### ਡਿਬਗਿੰਗ ਅਤੇ ਲਾਗਜ਼

- Error Console: Tools → Developer Tools → Error Console
- ਰਨਟਾਈਮ ‘ਤੇ verbose ਲਾਗਜ਼ ਟੋਗਲ:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- ਜਵਾਬ ਲਿਖਦੇ/ਭੇਜਦੇ ਸਮੇਂ ਲਾਗਜ਼ ਦਿਖਣਗੇ

### ਡੌਕਸ (ਵੈਬਸਾਈਟ)

- ਡਿਵ ਸਰਵਰ: `cd website && npm run start`
- ਸਟੈਟਿਕ ਸਾਈਟ ਬਿਲਡ: `cd website && npm run build`
- i18n: ਅੰਗਰੇਜ਼ੀ `website/docs/*.md`; ਜਰਮਨ ਅਨੁਵਾਦ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- ਖੋਜ: ਜੇ CI ਵਿੱਚ Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) ਸੈੱਟ ਹਨ ਤਾਂ ਸਾਈਟ Algolia ਖੋਜ ਵਰਤੇਗੀ; ਨਹੀਂ ਤਾਂ ਲੋਕਲ ਖੋਜ। ਹੋਮਪੇਜ ‘ਤੇ `/` ਜਾਂ `Ctrl+K` ਦਬਾਓ।

### ਸੁਰੱਖਿਆ ਅਤੇ ਸੰਰਚਨਾ ਟਿਪਸ

- `sources/manifest.json` ਕਮੀਟ ਨਾ ਕਰੋ (ਬਿਲਡ ਇਸਨੂੰ ਅਸਥਾਈ ਤੌਰ ‘ਤੇ ਬਣਾਉਂਦਾ ਹੈ)
- ਅਪਡੇਟ ਚੈਨਲ ਬਚਾਉਣ ਲਈ `browser_specific_settings.gecko.id` ਸਥਿਰ ਰੱਖੋ

### ਟਰਬਲਸ਼ੂਟਿੰਗ

- Thunderbird 128 ESR ਜਾਂ ਨਵਾਂ ਵਰਤੋ
- ਰਨਟਾਈਮ ਸਮੱਸਿਆਵਾਂ ਲਈ Error Console ਵਰਤੋ

### CI ਅਤੇ ਕਵਰੇਜ

- GitHub Actions (`CI — Tests`) vitest ਕਵਰੇਜ ਥ੍ਰੈਸ਼ਹੋਲਡਸ (85% lines/functions/branches/statements) ਨਾਲ ਚਲਾਉਂਦਾ ਹੈ; ਨਾ ਮਿਲਣ ‘ਤੇ ਜੌਬ ਫੇਲ।
- ਵਰਕਫ਼ਲੋ `coverage-html` ਆਰਟੀਫੈਕਟ ਅੱਪਲੋਡ ਕਰਦਾ ਹੈ; ਰਨ ਪੇਜ ਤੋਂ ਡਾਊਨਲੋਡ ਕਰੋ (Actions → latest run → Artifacts)।

### ਯੋਗਦਾਨ

- ਬ੍ਰਾਂਚ/ਕਮਿਟ/PR ਗਾਈਡਲਾਈਨ ਲਈ CONTRIBUTING.md ਵੇਖੋ
