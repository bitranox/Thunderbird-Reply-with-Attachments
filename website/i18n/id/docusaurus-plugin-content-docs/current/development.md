---
id: development
title: 'Pengembangan'
sidebar_label: 'Pengembangan'
---

---

## Panduan Pengembangan {#development-guide}

:::note Hanya edit bahasa Inggris; terjemahan akan dirambatkan
Perbarui dokumentasi hanya di bawah `website/docs` (Inggris). Terjemahan di bawah `website/i18n/<locale>/…` dihasilkan dan tidak boleh diedit secara manual. Gunakan tugas terjemahan (mis., `make translate_web_docs_batch`) untuk menyegarkan konten terlokalisasi.
:::

### Prasyarat {#prasyarat}

- Node.js 22+ dan npm (dites dengan Node 22)
- Thunderbird 128 ESR atau lebih baru (untuk pengujian manual)

---

### Tata Letak Proyek (tingkat tinggi) {#project-layout-high-level}

- Root: skrip pengemasan `distribution_zip_packer.sh`, dokumentasi, tangkapan layar
- `sources/`: kode add‑on utama (latar belakang, UI opsi/popup, manifes, ikon)
- `tests/`: suite Vitest
- `website/`: dokumentasi Docusaurus (dengan i18n di bawah `website/i18n/de/...`)

---

### Instalasi & Perkakas {#install-and-tooling}

- Instal dependensi root: `npm ci`
- Dokumentasi (opsional): `cd website && npm ci`
- Lihat target: `make help`

---

### Pengembangan Langsung (web‑ext run) {#live-dev-web-ext}

- Siklus cepat di Firefox Desktop (hanya pengujian UI ringan):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Jalankan di Thunderbird (disarankan untuk MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Biarkan Error Console Thunderbird tetap terbuka (Tools → Developer Tools → Error Console).
- Halaman event MV3 ditangguhkan saat idle; muat ulang add‑on setelah perubahan kode, atau biarkan web‑ext memuat ulang otomatis.
- Beberapa perilaku khusus Firefox berbeda; selalu verifikasi di Thunderbird untuk kesetaraan API.
- Path biner Thunderbird (contoh):
- Linux: `thunderbird` (mis., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Isolasi profil: Gunakan profil Thunderbird terpisah untuk pengembangan agar tidak memengaruhi pengaturan harian Anda.

---

### Target Make (Alfabetis) {#make-targets-alphabetical}

Makefile menstandarkan alur pengembangan umum. Jalankan `make help` kapan saja untuk ringkasan satu baris dari setiap target.

Tip: menjalankan `make` tanpa target membuka menu Whiptail sederhana untuk memilih target.

| Target                                                   | Deskripsi satu baris                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Hapus artefak build/pratinjau lokal (tmp/, web-local-preview/, website/build/).             |
| [`commit`](#mt-commit)                                   | Format, jalankan tes (termasuk i18n), perbarui changelog, commit & push.                    |
| [`eslint`](#mt-eslint)                                   | Jalankan ESLint melalui konfigurasi flat (`npm run -s lint:eslint`).                        |
| [`help`](#mt-help)                                       | Daftar semua target dengan dokumentasi satu baris (diurutkan).                              |
| [`lint`](#mt-lint)                                       | web‑ext lint pada `sources/` (manifest sementara; mengabaikan ZIP; non‑fatal).              |
| [`menu`](#mt-menu)                                       | Menu interaktif untuk memilih target dan argumen opsional.                                  |
| [`pack`](#mt-pack)                                       | Bangun ZIP ATN & LOCAL (menjalankan linter; memanggil skrip packer).                        |
| [`prettier`](#mt-prettier)                               | Format repositori di tempat (menulis perubahan).                                            |
| [`prettier_check`](#mt-prettier_check)                   | Prettier dalam mode cek (tanpa penulisan); gagal jika perlu pemformatan ulang.              |
| [`prettier_write`](#mt-prettier_write)                   | Alias untuk `prettier`.                                                                     |
| [`test`](#mt-test)                                       | Prettier (tulis), ESLint, lalu Vitest (cakupan jika dikonfigurasi).                         |
| [`test_i18n`](#mt-test_i18n)                             | Tes khusus i18n: placeholder/keseragaman add‑on + keseragaman situs web.                    |
| [`translate_app`](#mt-translation-app)                   | Alias untuk `translation_app`.                                                              |
| [`translation_app`](#mt-translation-app)                 | Terjemahkan string UI aplikasi dari `sources/_locales/en/messages.json`.                    |
| [`translate_web_docs_batch`](#mt-translation-web)        | Terjemahkan dokumen situs web melalui OpenAI Batch API (disarankan).                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Terjemahkan dokumen situs web secara sinkron (warisan, non‑batch).                          |
| [`translate_web_index`](#mt-translation_web_index)       | Alias untuk `translation_web_index`.                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Terjemahkan UI beranda/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).  |
| [`web_build`](#mt-web_build)                             | Bangun dokumentasi ke `website/build` (mendukung `--locales` / `BUILD_LOCALES`).            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Pemeriksaan tautan aman‑offline (melewati HTTP[S] jarak jauh).                              |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Pratinjau gh‑pages lokal; layanan otomatis pada 8080–8090; tes/pemeriksaan tautan opsional. |
| [`web_push_github`](#mt-web_push_github)                 | Dorong `website/build` ke branch `gh-pages`.                                                |

Sintaks untuk opsi

- Gunakan `make <command> OPTS="…"` untuk meneruskan opsi (disarankan menggunakan tanda kutip). Setiap target di bawah menunjukkan contoh penggunaan.

--

-

#### Tips build locale {#locale-build-tips}

- Bangun subset locale: setel `BUILD_LOCALES="en de"` atau oper `OPTS="--locales en,de"` ke target web.
- Pratinjau locale tertentu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bangun & Paket {#build-and-package}

- Bangun ZIP: `make pack`
- Menghasilkan ZIP ATN dan LOCAL di root repo (jangan edit artefak secara manual)
- Tip: perbarui versi di `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json` sebelum pengemasan
- Instal manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → pilih ZIP yang dibangun

---

### Tes {#test}

- Suite penuh: `make test` (Vitest)
- Cakupan (opsional):
- `npm i -D @vitest/coverage-v8`
- Jalankan `make test`; buka `coverage/index.html` untuk laporan HTML
- Hanya i18n: `make test_i18n` (kunci/placeholders/titles UI + keseragaman situs web per‑locale per‑dokumen dengan pemeriksaan id/title/sidebar_label)

---

### Debugging & Log {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Alihkan log verbose saat runtime:
- Aktifkan: `messenger.storage.local.set({ debug: true })`
- Nonaktifkan: `messenger.storage.local.set({ debug: false })`
- Log muncul saat menulis/mengirim balasan

---

### Dokumentasi (situs web) {#docs-website}

- Server dev: `cd website && npm run start`
- Bangun situs statis: `cd website && npm run build`
- Padanan Make (alfabetis): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Contoh penggunaan:
- Hanya EN, lewati tes/pemeriksaan tautan, tanpa push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Semua locale, dengan tes/pemeriksaan tautan, lalu push: `make web_build_local_preview && make web_push_github`
- Sebelum menerbitkan, jalankan pemeriksaan tautan aman‑offline: `make web_build_linkcheck`.
- i18n: Bahasa Inggris ada di `website/docs/*.md`; terjemahan bahasa Jerman di `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pencarian: Jika variabel lingkungan Algolia DocSearch disetel di CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), situs menggunakan pencarian Algolia; jika tidak, kembali ke pencarian lokal. Di beranda, tekan `/` atau `Ctrl+K` untuk membuka kotak pencarian.

---

#### Rute pengalihan donasi {#donate-redirect}

- `website/src/pages/donate.js`
- Rute: `/donate` (dan `/<locale>/donate`)
- Perilaku:
- Jika rute saat ini memiliki locale (mis., `/de/donate`), gunakan itu
- Jika tidak, pilih kecocokan terbaik dari `navigator.languages` vs locale yang dikonfigurasi; kembali ke locale default
- Mengalihkan ke:
- `en` → `/docs/donation`
- lainnya → `/<locale>/docs/donation`
- Menggunakan `useBaseUrl` untuk penanganan baseUrl yang benar
- Menyertakan meta refresh + tautan `noscript` sebagai cadangan

---

---

#### Tips Pratinjau {#preview-tips}

- Hentikan pratinjau Node dengan bersih: buka `http://localhost:<port>/__stop` (dicetak setelah `Local server started`).
- Jika gambar tidak dimuat di MDX/JSX, gunakan `useBaseUrl('/img/...')` untuk menghormati `baseUrl` situs.
- Pratinjau dimulai terlebih dahulu; pemeriksaan tautan berjalan setelahnya dan tidak memblokir (tautan eksternal rusak tidak akan menghentikan pratinjau).
- Contoh URL pratinjau: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (dicetak setelah “Local server started”).
- Tautan eksternal dalam pemeriksaan tautan: Beberapa situs eksternal (mis., addons.thunderbird.net) memblokir perayap otomatis dan mungkin menampilkan 403 dalam pemeriksaan tautan. Pratinjau tetap dimulai; ini aman untuk diabaikan.

---

#### Terjemahkan Situs Web {#translate-website}

Apa yang bisa Anda terjemahkan

- Hanya UI situs web: beranda, navbar, footer, dan string UI lainnya. Konten dokumen tetap hanya bahasa Inggris untuk saat ini.

Di mana mengedit

- Edit `website/i18n/<locale>/code.json` (gunakan `en` sebagai referensi). Biarkan placeholder seperti `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` tidak berubah.

Hasilkan atau segarkan file

- Buat stub yang hilang untuk semua locale: `npm --prefix website run i18n:stubs`
- Timpa stub dari bahasa Inggris (setelah menambahkan string baru): `npm --prefix website run i18n:stubs:force`
- Alternatif untuk satu locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Terjemahkan string UI beranda/navbar/footer (OpenAI)

- Setel kredensial sekali (shell atau .env):
- `export OPENAI_API_KEY=sk-...`
- Opsional: `export OPENAI_MODEL=gpt-4o-mini`
- Sekali jalan (semua locale, lewati en): `make translate_web_index`
- Batasi ke locale tertentu: `make translate_web_index OPTS="--locales de,fr"`
- Timpa nilai yang ada: `make translate_web_index OPTS="--force"`

Validasi & percobaan ulang

- Skrip terjemahan memvalidasi bentuk JSON, mempertahankan placeholder kurung kurawal, dan memastikan URL tidak berubah.
- Jika validasi gagal, skrip mencoba lagi dengan umpan balik hingga 2 kali sebelum mempertahankan nilai yang ada.

Pratinjau locale Anda

- Server dev: `npm --prefix website run start`
- Kunjungi `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Pengiriman

- Buka PR dengan file `code.json` yang diedit. Jaga perubahan tetap fokus dan sertakan cuplikan layar cepat jika memungkinkan.

---

### Tips Keamanan & Konfigurasi {#security-and-configuration-tips}

- Jangan commit `sources/manifest.json` (dibuat sementara oleh build)
- Jaga `browser_specific_settings.gecko.id` tetap stabil untuk mempertahankan saluran pembaruan

---

### Persistensi Pengaturan {#settings-persistence}

- Penyimpanan: Semua pengaturan pengguna berada di `storage.local` dan bertahan lintas pembaruan add‑on.
- Instal: Default diterapkan hanya ketika sebuah kunci benar‑benar tidak ada (undefined).
- Pembaruan: Migrasi hanya mengisi kunci yang hilang; nilai yang ada tidak pernah ditimpa.
- Penanda skema: `settingsVersion` (saat ini `1`).
- Kunci dan default:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: lihat `sources/background.js` → `initializeOrMigrateSettings()` dan `SCHEMA_VERSION`.

Alur kerja dev (menambahkan pengaturan baru)

- Naikkan `SCHEMA_VERSION` di `sources/background.js`.
- Tambahkan kunci baru + default ke objek `DEFAULTS` di `initializeOrMigrateSettings()`.
- Gunakan aturan "only-if-undefined" saat menabur default; jangan timpa nilai yang ada.
- Jika pengaturan terlihat oleh pengguna, hubungkan di `sources/options.js` dan tambahkan string terlokalisasi.
- Tambahkan/sesuaikan tes (lihat `tests/background.settings.migration.test.js`).

Tips pengujian manual

- Simulasikan instalasi baru: bersihkan direktori data ekstensi atau mulai dengan profil baru.
- Simulasikan pembaruan: setel `settingsVersion` ke `0` di `storage.local` dan muat ulang; konfirmasikan nilai yang ada tetap tidak berubah dan hanya kunci yang hilang yang ditambahkan.

---

### Pemecahan Masalah {#troubleshooting}

- Pastikan Thunderbird 128 ESR atau lebih baru
- Gunakan Error Console untuk masalah runtime
- Jika pengaturan tersimpan tampak tidak diterapkan dengan benar, mulai ulang Thunderbird dan coba lagi. (Thunderbird dapat menyimpan cache status antar sesi; mulai ulang memastikan pengaturan baru dimuat.)

---

### CI & Cakupan {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) menjalankan vitest dengan ambang cakupan (85% baris/fungsi/cabang/pernyataan). Jika ambang tidak terpenuhi, job gagal.
- Workflow mengunggah artefak `coverage-html` dengan laporan HTML; unduh dari halaman run (Actions → run terbaru → Artifacts).

---

### Kontribusi {#contributing}

- Lihat CONTRIBUTING.md untuk panduan branch/commit/PR
- Tip: Buat profil pengembangan Thunderbird terpisah untuk pengujian agar tidak memengaruhi profil harian Anda.

---

### Terjemahan

- Menjalankan pekerjaan terjemahan besar “semua → semua” bisa lambat dan mahal. Mulailah dengan subset (mis., beberapa dokumen dan 1–2 locale), tinjau hasilnya, lalu perluas.

---

- Kebijakan percobaan ulang: pekerjaan terjemahan melakukan hingga 3 kali percobaan ulang dengan exponential backoff pada kesalahan API; lihat `scripts/translate_web_docs_batch.js` dan `scripts/translate_web_docs_sync.js`.

Tangkapan layar untuk dokumen

- Simpan gambar di bawah `website/static/img/`.
- Rujuk mereka di MD/MDX melalui `useBaseUrl('/img/<filename>')` agar path bekerja dengan `baseUrl` situs.
- Setelah menambahkan atau mengganti nama gambar di bawah `website/static/img/`, konfirmasikan semua referensi masih menggunakan `useBaseUrl('/img/…')` dan dirender dalam pratinjau lokal.
  Favicon

- File `favicon.ico` multi‑ukuran dihasilkan secara otomatis di semua jalur build (Make + skrip) melalui `website/scripts/build-favicon.mjs`.
- Tidak diperlukan langkah manual; memperbarui `icon-*.png` sudah cukup.
  Tip peninjauan

- Pertahankan `id` front‑matter tidak berubah dalam dokumen terjemahan; terjemahkan hanya `title` dan `sidebar_label` bila ada.

#### clean {#mt-clean}

- Tujuan: menghapus artefak build/pratinjau lokal.
- Penggunaan: `make clean`
- Menghapus (jika ada):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tujuan: memformat, menguji, memperbarui changelog, commit, dan push.
- Penggunaan: `make commit`
- Rincian: menjalankan Prettier (tulis), `make test`, `make test_i18n`; menambahkan changelog saat ada diff yang distage; mendorong ke `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tujuan: menjalankan ESLint melalui konfigurasi flat.
- Penggunaan: `make eslint`

---

#### help {#mt-help}

- Tujuan: mendaftar semua target dengan dokumentasi satu baris.
- Penggunaan: `make help`

---

#### lint {#mt-lint}

- Tujuan: lint MailExtension menggunakan `web-ext`.
- Penggunaan: `make lint`
- Catatan: menyalin sementara `sources/manifest_LOCAL.json` → `sources/manifest.json`; mengabaikan ZIP yang dibangun; peringatan tidak menggagalkan pipeline.

---

#### menu {#mt-menu}

- Tujuan: menu interaktif untuk memilih target Make dan argumen opsional.
- Penggunaan: jalankan `make` tanpa argumen.
- Catatan: jika `whiptail` tidak tersedia, menu kembali ke `make help`.

---

#### pack {#mt-pack}

- Tujuan: membangun ZIP ATN dan LOCAL (bergantung pada `lint`).
- Penggunaan: `make pack`
- Tip: naikkan versi di keduanya `sources/manifest_*.json` sebelum pengemasan.

---

#### prettier {#mt-prettier}

- Tujuan: memformat repo di tempat.
- Penggunaan: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tujuan: memverifikasi pemformatan (tanpa penulisan).
- Penggunaan: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tujuan: alias untuk `prettier`.
- Penggunaan: `make prettier_write`

---

#### test {#mt-test}

- Tujuan: menjalankan Prettier (tulis), ESLint, lalu Vitest (cakupan jika diinstal).
- Penggunaan: `make test`

#### test_i18n {#mt-test_i18n}

- Tujuan: tes berfokus i18n untuk string add‑on dan dokumen situs web.
- Penggunaan: `make test_i18n`
- Menjalankan: `npm run test:i18n` dan `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tujuan: menerjemahkan string UI add‑on dari EN ke locale lain.
- Penggunaan: `make translation_app OPTS="--locales all|de,fr"`
- Catatan: mempertahankan struktur kunci dan placeholder; mencatat ke `translation_app.log`. Bentuk skrip: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tujuan: menerjemahkan dokumen situs web dari `website/docs/*.md` ke `website/i18n/<locale>/...`.
- Disarankan: `translate_web_docs_batch` (OpenAI Batch API)
  - Penggunaan (flag): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisi lama masih diterima: `OPTS="<doc|all> <lang|all>"`
- Perilaku: membuat JSONL, mengunggah, polling setiap 30 dtk, mengunduh hasil, menulis file.
- Catatan: pekerjaan batch dapat memakan waktu hingga 24 jam untuk selesai (sesuai jendela batch OpenAI). Konsol menampilkan waktu berlalu pada setiap polling.
- Env: `OPENAI_API_KEY` (wajib), opsional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24 jam), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Penggunaan (flag): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisi lama masih diterima: `OPTS="<doc|all> <lang|all>"`
- Perilaku: permintaan per‑pasang sinkron (tanpa agregasi batch).
- Catatan: Prompt interaktif saat `OPTS` dihilangkan. Kedua mode mempertahankan blok kode/kode inline dan menjaga `id` front‑matter tidak berubah; mencatat ke `translation_web_batch.log` (batch) atau `translation_web_sync.log` (sinkron).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tujuan: menerjemahkan string UI situs web (beranda, navbar, footer) dari `website/i18n/en/code.json` ke semua locale di bawah `website/i18n/<locale>/code.json` (kecuali `en`).
- Penggunaan: `make translate_web_index` atau `make translate_web_index OPTS="--locales de,fr [--force]"`
- Persyaratan: export `OPENAI_API_KEY` (opsional: `OPENAI_MODEL=gpt-4o-mini`).
- Perilaku: memvalidasi struktur JSON, mempertahankan placeholder kurung kurawal, menjaga URL tidak berubah, dan mencoba ulang dengan umpan balik saat terjadi kesalahan validasi.

---

#### web_build {#mt-web_build}

- Tujuan: membangun situs dokumentasi ke `website/build`.
- Penggunaan: `make web_build OPTS="--locales en|de,en|all"` (atau setel `BUILD_LOCALES="en de"`)
- Internal: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dependensi: menjalankan `npm ci` di `website/` hanya jika `website/node_modules/@docusaurus` tidak ada.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tujuan: pemeriksaan tautan aman‑offline.
- Penggunaan: `make web_build_linkcheck OPTS="--locales en|all"`
- Catatan: membangun ke `tmp_linkcheck_web_pages`; menulis ulang `baseUrl` GH Pages menjadi `/`; melewati tautan HTTP(S) jarak jauh.

#### web_build_local_preview {#mt-web_build_local_preview}

- Tujuan: pratinjau gh‑pages lokal dengan tes/pemeriksaan tautan opsional.
- Penggunaan: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Perilaku: mencoba server pratinjau Node terlebih dahulu (`scripts/preview-server.mjs`, mendukung `/__stop`), kembali ke `python3 -m http.server`; melayani pada 8080–8090; PID di `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tujuan: push `website/build` ke branch `gh-pages`.
- Penggunaan: `make web_push_github`

Tip: setel `NPM=…` untuk menimpa manajer paket yang digunakan oleh Makefile (default ke `npm`).

---
