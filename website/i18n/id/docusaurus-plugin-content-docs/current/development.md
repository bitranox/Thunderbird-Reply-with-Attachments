---
id: development
title: Pengembangan
sidebar_label: Pengembangan
---

## Panduan pengembangan

### Prasyarat

- Node.js 18+ dan npm
- Thunderbird 128 ESR atau lebih baru (untuk uji manual)

### Tata letak proyek (tingkat tinggi)

- Root: skrip paket `distribution_zip_packer.sh`, docs, cuplikan layar
- `sources/`: kode utama add‑on (background, UI opsi/jendela, manifest, ikon)
- `tests/`: suite Vitest
- `website/`: docs Docusaurus (i18n di `website/i18n/de/...`)

### Instalasi & alat

- Pasang dependen root: `npm ci`
- Docs (opsional): `cd website && npm ci`
- Lihat target: `make help`

### Build & paket

- Buat ZIP: `make pack`
  - Menghasilkan ZIP ATN dan LOCAL di root repo (jangan ubah artefak secara manual)
  - Tips: perbarui versi pada `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json` sebelum packing
- Instal manual (dev): Thunderbird → Tools → Add‑ons and Themes → roda gigi → Install Add‑on From File… → pilih ZIP yang dibuat

### Uji

- Suite lengkap: `make test` (Vitest)
- Cakupan (opsional):
  - `npm i -D @vitest/coverage-v8`
  - Jalankan `make test`; buka `coverage/index.html` untuk laporan HTML
- Hanya i18n: `make test-i18n` (paritas, placeholder, judul)

### Debug & log

- Konsol kesalahan: Tools → Developer Tools → Error Console
- Alihkan log rinci saat runtime:
  - Aktifkan: `messenger.storage.local.set({ debug: true })`
  - Nonaktifkan: `messenger.storage.local.set({ debug: false })`
- Log muncul saat menulis/mengirim balasan

### Docs (situs)

- Server dev: `cd website && npm run start`
- Bangun situs statis: `cd website && npm run build`
- i18n: Inggris di `website/docs/*.md`; Jerman di `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pencarian: jika Algolia DocSearch disetel di CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), situs memakai Algolia; jika tidak, pencarian lokal. Di beranda, tekan `/` atau `Ctrl+K`.

### Keamanan & konfigurasi

- Jangan commit `sources/manifest.json` (dibuat sementara saat build)
- Jaga `browser_specific_settings.gecko.id` tetap stabil untuk mempertahankan kanal pembaruan

### Pemecahan masalah

- Pastikan Thunderbird 128 ESR atau lebih baru
- Gunakan Konsol kesalahan untuk masalah runtime

### CI & cakupan

- GitHub Actions (`CI — Tests`) menjalankan vitest dengan ambang cakupan (85% baris/fungsi/cabang/pernyataan). Jika tidak tercapai, job gagal.
- Alur kerja mengunggah artefak `coverage-html` berisi laporan HTML; unduh dari halaman run (Actions → run terbaru → Artifacts).

### Kontribusi

- Lihat CONTRIBUTING.md untuk pedoman branch/commit/PR
