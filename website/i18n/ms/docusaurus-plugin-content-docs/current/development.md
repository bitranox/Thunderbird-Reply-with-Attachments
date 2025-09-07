---
id: development
title: Pembangunan
sidebar_label: Pembangunan
---

## Panduan Pembangunan

### Prasyarat

- Node.js 18+ dan npm
- Thunderbird 128 ESR atau lebih baharu (untuk ujian manual)

### Susun atur projek (aras tinggi)

- Root: skrip pembungkusan `distribution_zip_packer.sh`, dokumen, tangkapan skrin
- `sources/`: kod teras add‑on (background, UI options/popup, manifests, ikon)
- `tests/`: Vitest suite
- `website/`: dokumen Docusaurus (i18n di bawah `website/i18n/de/...`)

### Pemasangan & alatan

- Pasang kebergantungan root: `npm ci`
- Dokumen (pilihan): `cd website && npm ci`
- Lihat sasaran: `make help`

### Bina & bungkus

- Bina ZIP: `make pack`
  - Menghasilkan ZIP ATN dan LOCAL di akar repo (jangan edit artifak secara manual)
  - Petua: kemas kini versi dalam `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json` sebelum pembungkusan
- Pemasangan manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → pilih ZIP yang dibina

### Ujian

- Suit penuh: `make test` (Vitest)
- Liputan (pilihan):
  - `npm i -D @vitest/coverage-v8`
  - Jalankan `make test`; buka `coverage/index.html` untuk laporan HTML
- i18n sahaja: `make test-i18n` (parity, placeholders, titles)

### Nyahpepijat & log

- Error Console: Tools → Developer Tools → Error Console
- Togol log verbose ketika runtime:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- Log akan muncul semasa membalas/menghantar

### Dokumen (laman web)

- Pelayan dev: `cd website && npm run start`
- Bina laman statik: `cd website && npm run build`
- i18n: Inggeris di `website/docs/*.md`; terjemahan Jerman di `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Carian: Jika pembolehubah persekitaran Algolia DocSearch diset dalam CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), laman menggunakan Algolia; jika tidak, kembali kepada carian tempatan. Pada laman utama, tekan `/` atau `Ctrl+K`.

### Keselamatan & petua konfigurasi

- Jangan commit `sources/manifest.json` (dibuat sementara oleh build)
- Kekalkan `browser_specific_settings.gecko.id` stabil untuk mengekalkan saluran kemas kini

### Penyelesaian masalah

- Pastikan Thunderbird 128 ESR atau lebih baharu
- Guna Error Console untuk isu runtime

### CI & liputan

- GitHub Actions (`CI — Tests`) menjalankan vitest dengan ambang liputan (85% lines/functions/branches/statements). Jika tidak dipenuhi, kerja akan gagal.
- Aliran kerja memuat naik artifak `coverage-html` dengan laporan HTML; muat turun dari halaman run (Actions → latest run → Artifacts).

### Sumbangan

- Lihat CONTRIBUTING.md untuk garis panduan cawangan/commit/PR
