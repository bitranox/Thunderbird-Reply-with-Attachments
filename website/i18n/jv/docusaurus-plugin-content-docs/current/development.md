---
id: development
title: Pangembangan
sidebar_label: Pangembangan
---

## Pandhuan Pangembangan

### Prasyarat

- Node.js 18+ lan npm
- Thunderbird 128 ESR utawa luwih anyar (kanggo tes manual)

### Tata Letak Proyek (tingkat dhuwur)

- Root: skrip packaging `distribution_zip_packer.sh`, dokumen, screenshot
- `sources/`: kode inti add‑on (background, UI options/popup, manifests, ikon)
- `tests/`: Vitest suite
- `website/`: dokumen Docusaurus (i18n ana ing `website/i18n/de/...`)

### Pasang & Piranti

- Pasang deps ing root: `npm ci`
- Dokumen (opsional): `cd website && npm ci`
- Delengen target: `make help`

### Bangun & Paket

- Gawe ZIP: `make pack`
  - Ngasilake ZIP ATN lan LOCAL ing root repo (aja nyunting artifak kanthi manual)
  - Tips: nganyari versi ing `sources/manifest_ATN.json` lan `sources/manifest_LOCAL.json` sadurunge packaging
- Pasang manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → pilih ZIP sing dibangun

### Tes

- Suite lengkap: `make test` (Vitest)
- Cakupan (opsional):
  - `npm i -D @vitest/coverage-v8`
  - Mlaku `make test`; bukak `coverage/index.html` kanggo laporan HTML
- Mung i18n: `make test-i18n` (parity, placeholders, titles)

### Debug lan Log

- Error Console: Tools → Developer Tools → Error Console
- Togglé log sing rinci nalika runtime:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- Log katon nalika nyusun/ngirim wangsulan

### Dokumen (website)

- Server dev: `cd website && npm run start`
- Mbuwang situs statis: `cd website && npm run build`
- i18n: Inggris ana ing `website/docs/*.md`; Jerman ana ing `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Telusur: Yen variabel lingkungan Algolia DocSearch disetel ing CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), situs nggunakake Telusur Algolia; yen ora, bali menyang telusur lokal. Ing beranda, pencet `/` utawa `Ctrl+K`.

### Keamanan & Tips Konfigurasi

- Aja commit `sources/manifest.json` (dibuat sementara nalika build)
- Tetepna `browser_specific_settings.gecko.id` stabil supaya saluran update awet

### Nglacak Masalah

- Pastikna Thunderbird 128 ESR utawa luwih anyar
- Gunakake Error Console kanggo masalah runtime

### CI & Cakupan

- GitHub Actions (`CI — Tests`) mlaku vitest kanthi ambang cakupan (85% lines/functions/branches/statements). Yen ora ketemu, job gagal.
- Workflow ngunggah artefak `coverage-html` kanggo laporan HTML; undhuh saka kaca run (Actions → latest run → Artifacts).

### Nyumbang

- Waca CONTRIBUTING.md kanggo pandhuan branch/commit/PR
