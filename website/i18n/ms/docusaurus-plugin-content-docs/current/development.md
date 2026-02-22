---
id: development
title: 'Pembangunan'
sidebar_label: 'Pembangunan'
---

---

## Panduan Pembangunan {#development-guide}

:::note Sunting bahasa Inggeris sahaja; terjemahan akan tersebar
Kemas kini dokumentasi **hanya** di bawah `website/docs` (Inggeris). Terjemahan di bawah `website/i18n/<locale>/…` dijana dan tidak sepatutnya disunting secara manual. Gunakan tugasan terjemahan (cth., `make translate_web_docs_batch`) untuk menyegar semula kandungan setempat.
:::

### Prasyarat {#prerequisites}

- Node.js 22+ dan npm (dengan ujian menggunakan Node 22)
- Thunderbird 128 ESR atau lebih baharu (untuk pengujian manual)

---

### Susun Atur Projek (tahap tinggi) {#project-layout-high-level}

- Akar: skrip pembungkusan `distribution_zip_packer.sh`, dokumentasi, tangkapan skrin
- `sources/`: kod add‑on utama (latar belakang, UI pilihan/popup, manifest, ikon)
- `tests/`: suit Vitest
- `website/`: dokumentasi Docusaurus (dengan i18n di bawah `website/i18n/de/...`)

---

### Pemasangan & Alatan {#install-and-tooling}

- Pasang kebergantungan akar: `npm ci`
- Dokumentasi (pilihan): `cd website && npm ci`
- Temui sasaran: `make help`

---

### Pembangunan Langsung (web‑ext run) {#live-dev-web-ext}

- Kitaran pantas dalam Firefox Desktop (ujian asap UI sahaja):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Jalankan dalam Thunderbird (diutamakan untuk MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Petua:
- Biarkan Konsol Ralat Thunderbird terbuka (Tools → Developer Tools → Error Console).
- Halaman acara MV3 digantung apabila tidak aktif; muat semula add‑on selepas perubahan kod, atau biarkan web‑ext auto‑memuat semula.
- Sesetengah tingkah laku khusus Firefox berbeza; sentiasa sahkan dalam Thunderbird untuk kesetaraan API.
- Laluan binari Thunderbird (contoh):
- Linux: `thunderbird` (cth., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Pengasingan profil: Gunakan profil Thunderbird berasingan untuk pembangunan bagi mengelakkan menjejaskan tetapan harian anda.

---

### Sasaran Make (Mengikut Abjad) {#make-targets-alphabetical}

Makefile menyeragamkan aliran pembangunan biasa. Jalankan `make help` pada bila‑bila masa untuk ringkasan satu baris bagi setiap sasaran.

Petua: menjalankan `make` tanpa sasaran akan membuka menu Whiptail ringkas untuk memilih sasaran.

| Sasaran                                                  | Penerangan satu baris                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Buang artifak binaan/pratonton tempatan (tmp/, web-local-preview/, website/build/).                     |
| [`commit`](#mt-commit)                                   | Format, jalankan ujian (termasuk i18n), kemas kini changelog, komit & tolak.                            |
| [`eslint`](#mt-eslint)                                   | Jalankan ESLint melalui konfigurasi rata (`npm run -s lint:eslint`).                                    |
| [`help`](#mt-help)                                       | Senaraikan semua sasaran dengan dok satu baris (diisih).                                                |
| [`lint`](#mt-lint)                                       | web‑ext lint pada `sources/` (manifest sementara; mengabaikan ZIP; tidak fatal).                        |
| [`menu`](#mt-menu)                                       | Menu interaktif untuk memilih sasaran dan argumen pilihan.                                              |
| [`pack`](#mt-pack)                                       | Bina ZIP ATN & LOCAL (menjalankan linter; memanggil skrip pembungkus).                                  |
| [`prettier`](#mt-prettier)                               | Format repositori di tempat (menulis perubahan).                                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier dalam mod semakan (tanpa tulis); gagal jika perlu diformat semula.                             |
| [`prettier_write`](#mt-prettier_write)                   | Alias untuk `prettier`.                                                                                 |
| [`test`](#mt-test)                                       | Prettier (tulis), ESLint, kemudian Vitest (liputan jika dikonfigurasi).                                 |
| [`test_i18n`](#mt-test_i18n)                             | Ujian i18n sahaja: tempat letak/kesetaraan add‑on + kesetaraan laman web.                               |
| [`translate_app`](#mt-translation-app)                   | Alias untuk `translation_app`.                                                                          |
| [`translation_app`](#mt-translation-app)                 | Terjemah rentetan UI apl daripada `sources/_locales/en/messages.json`.                                  |
| [`translate_web_docs_batch`](#mt-translation-web)        | Terjemah dokumentasi laman web melalui OpenAI Batch API (disyorkan).                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Terjemah dokumentasi laman web secara segerak (legasi, bukan kelompok).                                 |
| [`translate_web_index`](#mt-translation_web_index)       | Alias untuk `translation_web_index`.                                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | Terjemah UI halaman utama/palang navigasi/pengaki (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Bina dokumentasi ke `website/build` (menyokong `--locales` / `BUILD_LOCALES`).                          |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Semakan pautan selamat luar talian (melangkau HTTP[S] jauh).                                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Pratonton gh‑pages tempatan; auto‑layani pada 8080–8090; ujian/semak pautan pilihan.                    |
| [`web_push_github`](#mt-web_push_github)                 | Tolak `website/build` ke cawangan `gh-pages`.                                                           |

Sintaks untuk pilihan

- Guna `make <command> OPTS="…"` untuk menghantar pilihan (disarankan guna petikan). Setiap sasaran di bawah menunjukkan contoh penggunaan.

--

-

#### Petua binaan lokal {#locale-build-tips}

- Bina subset lokal: tetapkan `BUILD_LOCALES="en de"` atau hantarkan `OPTS="--locales en,de"` kepada sasaran web.
- Pratonton lokal tertentu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bina & Pakej {#build-and-package}

- Bina ZIP: `make pack`
- Menghasilkan ZIP ATN dan LOCAL di akar repo (jangan edit artifak secara manual)
- Petua: kemas kini versi dalam kedua‑dua `sources/manifest_ATN.json` dan `sources/manifest_LOCAL.json` sebelum pembungkusan
- Pemasangan manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → pilih ZIP yang dibina

---

### Ujian {#test}

- Set penuh: `make test` (Vitest)
- Liputan (pilihan):
- `npm i -D @vitest/coverage-v8`
- Jalankan `make test`; buka `coverage/index.html` untuk laporan HTML
- i18n sahaja: `make test_i18n` (kunci/tempat letak/judul UI + kesetaraan laman web per‑lokal per‑dok dengan semakan id/title/sidebar_label)

---

### Nyahpepijat & Log {#debugging-and-logs}

- Konsol Ralat: Tools → Developer Tools → Error Console
- Togol log terperinci semasa runtime:
- Aktifkan: `messenger.storage.local.set({ debug: true })`
- Nyahaktifkan: `messenger.storage.local.set({ debug: false })`
- Log muncul semasa mengarang/menghantar balasan

---

### Dokumentasi (laman web) {#docs-website}

- Pelayan dev: `cd website && npm run start`
- Bina laman statik: `cd website && npm run build`
- Setara Make (mengikut abjad): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Contoh penggunaan:
- EN sahaja, langkau ujian/semak pautan, tiada push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Semua lokal, dengan ujian/semak pautan, kemudian push: `make web_build_local_preview && make web_push_github`
- Sebelum menerbitkan, jalankan semakan pautan selamat luar talian: `make web_build_linkcheck`.
- i18n: Bahasa Inggeris berada di `website/docs/*.md`; terjemahan Jerman di `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Carian: Jika pembolehubah persekitaran Algolia DocSearch ditetapkan dalam CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), laman ini menggunakan carian Algolia; jika tidak, ia kembali kepada carian tempatan. Pada halaman utama, tekan `/` atau `Ctrl+K` untuk membuka kotak carian.

---

#### Laluan ubah hala derma {#donate-redirect}

- `website/src/pages/donate.js`
- Laluan: `/donate` (dan `/<locale>/donate`)
- Kelakuan:
- Jika laluan semasa mempunyai lokal (cth., `/de/donate`), gunakannya
- Jika tidak, pilih padanan terbaik daripada `navigator.languages` berbanding lokal yang dikonfigurasi; kembali kepada lokal lalai
- Mengubah hala ke:
- `en` → `/docs/donation`
- lain‑lain → `/<locale>/docs/donation`
- Menggunakan `useBaseUrl` untuk pengendalian baseUrl yang betul
- Termasuk penyegaran meta + pautan `noscript` sebagai sandaran

---

---

#### Petua Pratonton {#preview-tips}

- Hentikan pratonton Node dengan bersih: buka `http://localhost:<port>/__stop` (dicetak selepas `Local server started`).
- Jika imej tidak dimuat dalam MDX/JSX, guna `useBaseUrl('/img/...')` untuk menghormati `baseUrl` laman.
- Pratonton bermula dahulu; semakan pautan berjalan selepas itu dan tidak menyekat (pautan luaran rosak tidak akan menghentikan pratonton).
- Contoh URL pratonton: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (dicetak selepas “Local server started”).
- Pautan luaran dalam semakan pautan: Sesetengah laman luar (cth., addons.thunderbird.net) menyekat perayap automatik dan mungkin menunjukkan 403 dalam semakan pautan. Pratonton tetap bermula; ini selamat untuk diabaikan.

---

#### Terjemah Laman Web {#translate-website}

Apa yang anda boleh terjemah

- UI laman web sahaja: halaman utama, palang navigasi, pengaki, dan rentetan UI lain. Kandungan dok kekal bahasa Inggeris sahaja buat masa ini.

Di mana untuk menyunting

- Sunting `website/i18n/<locale>/code.json` (guna `en` sebagai rujukan). Kekalkan tempat letak seperti `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` tanpa perubahan.

Menjana atau menyegar semula fail

- Cipta stub yang hilang untuk semua lokal: `npm --prefix website run i18n:stubs`
- Timpa stub daripada Inggeris (selepas menambah rentetan baharu): `npm --prefix website run i18n:stubs:force`
- Alternatif untuk satu lokal: `npx --prefix website docusaurus write-translations --locale <locale>`

Terjemah rentetan UI halaman utama/palang navigasi/pengaki (OpenAI)

- Tetapkan kelayakan sekali (shell atau .env):
- `export OPENAI_API_KEY=sk-...`
- Pilihan: `export OPENAI_MODEL=gpt-4o-mini`
- Sekali jalan (semua lokal, langkau en): `make translate_web_index`
- Hadkan kepada lokal tertentu: `make translate_web_index OPTS="--locales de,fr"`
- Timpa nilai sedia ada: `make translate_web_index OPTS="--force"`

Pengesahan & cubaan semula

- Skrip terjemahan mengesahkan bentuk JSON, mengekalkan tempat letak kurungan keriting, dan memastikan URL tidak berubah.
- Apabila pengesahan gagal, ia cuba semula dengan maklum balas sehingga 2 kali sebelum mengekalkan nilai sedia ada.

Pratonton lokal anda

- Pelayan dev: `npm --prefix website run start`
- Lawati `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Menghantar

- Buka PR dengan fail `code.json` yang disunting. Kekalkan perubahan terfokus dan sertakan tangkapan skrin ringkas jika boleh.

---

### Petua Keselamatan & Konfigurasi {#security-and-configuration-tips}

- Jangan komit `sources/manifest.json` (dicipta sementara oleh binaan)
- Kekalkan `browser_specific_settings.gecko.id` stabil untuk memelihara saluran kemas kini

---

### Kekekalan Tetapan {#settings-persistence}

- Storan: Semua tetapan pengguna berada dalam `storage.local` dan kekal merentasi kemas kini add‑on.
- Pemasangan: Lalai digunakan hanya apabila kunci benar‑benar tiada (undefined).
- Kemas kini: Migrasi hanya mengisi kunci yang hilang; nilai sedia ada tidak pernah ditimpa.
- Penanda skema: `settingsVersion` (kini `1`).
- Kunci dan lalai:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: lihat `sources/background.js` → `initializeOrMigrateSettings()` dan `SCHEMA_VERSION`.

Aliran kerja dev (menambah tetapan baharu)

- Naikkan `SCHEMA_VERSION` dalam `sources/background.js`.
- Tambah kunci baharu + lalai kepada objek `DEFAULTS` dalam `initializeOrMigrateSettings()`.
- Guna peraturan "only-if-undefined" apabila membekalkan lalai; jangan timpa nilai sedia ada.
- Jika tetapan kelihatan kepada pengguna, sambungkannya dalam `sources/options.js` dan tambah rentetan dilokalkan.
- Tambah/laraskan ujian (lihat `tests/background.settings.migration.test.js`).

Petua pengujian manual

- Simulasikan pemasangan baharu: kosongkan direktori data sambungan atau mulakan dengan profil baharu.
- Simulasikan kemas kini: tetapkan `settingsVersion` kepada `0` dalam `storage.local` dan muat semula; sahkan nilai sedia ada kekal tidak berubah dan hanya kunci yang hilang ditambah.

---

### Penyelesaian Masalah {#troubleshooting}

- Pastikan Thunderbird ialah 128 ESR atau lebih baharu
- Guna Konsol Ralat untuk isu masa jalan
- Jika tetapan tersimpan kelihatan tidak digunakan dengan betul, mulakan semula Thunderbird dan cuba lagi. (Thunderbird mungkin menyangga keadaan merentas sesi; mula semula memastikan tetapan baharu dimuat.)

---

### CI & Liputan {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) menjalankan vitest dengan ambang liputan (85% baris/fungsi/cabang/penyata). Jika ambang tidak dipenuhi, kerja akan gagal.
- Aliran kerja memuat naik artifak `coverage-html` dengan laporan HTML; muat turun dari halaman run (Actions → larian terkini → Artifacts).

---

### Penyumbangan {#contributing}

- Lihat CONTRIBUTING.md untuk garis panduan cawangan/komit/PR
- Petua: Cipta profil pembangunan Thunderbird berasingan untuk pengujian bagi mengelakkan menjejaskan profil harian anda.

---

### Terjemahan

- Menjalankan kerja terjemahan besar “all → all” boleh menjadi perlahan dan mahal. Mulakan dengan subset (cth., beberapa dok dan 1–2 lokal), semak hasilnya, kemudian kembangkan.

---

- Dasar cubaan semula: kerja terjemahan melakukan sehingga 3 cubaan semula dengan backoff eksponen pada ralat API; lihat `scripts/translate_web_docs_batch.js` dan `scripts/translate_web_docs_sync.js`.

Tangkapan skrin untuk dokumentasi

- Simpan imej di bawah `website/static/img/`.
- Rujuk mereka dalam MD/MDX melalui `useBaseUrl('/img/<filename>')` supaya laluan berfungsi dengan `baseUrl` laman.
- Selepas menambah atau menamakan semula imej di bawah `website/static/img/`, sahkan semua rujukan masih menggunakan `useBaseUrl('/img/…')` dan terpapar dalam pratonton tempatan.
  Favicon

- `favicon.ico` berbilang saiz dijana secara automatik dalam semua laluan binaan (Make + skrip) melalui `website/scripts/build-favicon.mjs`.
- Tiada langkah manual diperlukan; mengemas kini `icon-*.png` sudah memadai.
  Petua semakan

- Kekalkan front‑matter `id` tidak berubah dalam dok terjemahan; terjemah hanya `title` dan `sidebar_label` apabila ada.

#### clean {#mt-clean}

- Tujuan: alih keluar artifak binaan/pratonton tempatan.
- Penggunaan: `make clean`
- Mengalih keluar (jika ada):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tujuan: format, uji, kemas kini changelog, komit, dan tolak.
- Penggunaan: `make commit`
- Butiran: menjalankan Prettier (tulis), `make test`, `make test_i18n`; menambah pada changelog apabila terdapat perbezaan yang di‑stage; menolak ke `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tujuan: jalankan ESLint melalui konfigurasi rata.
- Penggunaan: `make eslint`

---

#### help {#mt-help}

- Tujuan: senaraikan semua sasaran dengan dok satu baris.
- Penggunaan: `make help`

---

#### lint {#mt-lint}

- Tujuan: linti MailExtension menggunakan `web-ext`.
- Penggunaan: `make lint`
- Nota: menyalin sementara `sources/manifest_LOCAL.json` → `sources/manifest.json`; mengabaikan ZIP binaan; amaran tidak menyebabkan kegagalan saluran paip.

---

#### menu {#mt-menu}

- Tujuan: menu interaktif untuk memilih sasaran Make dan argumen pilihan.
- Penggunaan: jalankan `make` tanpa argumen.
- Nota: jika `whiptail` tidak tersedia, menu kembali kepada `make help`.

---

#### pack {#mt-pack}

- Tujuan: bina ZIP ATN dan LOCAL (bergantung pada `lint`).
- Penggunaan: `make pack`
- Petua: naikkan versi dalam kedua‑dua `sources/manifest_*.json` sebelum pembungkusan.

---

#### prettier {#mt-prettier}

- Tujuan: format repo di tempat.
- Penggunaan: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tujuan: sahkan pemformatan (tanpa tulis).
- Penggunaan: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tujuan: alias untuk `prettier`.
- Penggunaan: `make prettier_write`

---

#### test {#mt-test}

- Tujuan: jalankan Prettier (tulis), ESLint, kemudian Vitest (liputan jika dipasang).
- Penggunaan: `make test`

#### test_i18n {#mt-test_i18n}

- Tujuan: ujian berfokus i18n untuk rentetan add‑on dan dok laman web.
- Penggunaan: `make test_i18n`
- Menjalankan: `npm run test:i18n` dan `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tujuan: terjemah rentetan UI add‑on daripada EN ke lokal lain.
- Penggunaan: `make translation_app OPTS="--locales all|de,fr"`
- Nota: mengekalkan struktur kunci dan tempat letak; log ke `translation_app.log`. Bentuk skrip: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tujuan: terjemah dok laman web daripada `website/docs/*.md` ke `website/i18n/<locale>/...`.
- Disyorkan: `translate_web_docs_batch` (OpenAI Batch API)
  - Penggunaan (flag): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Gaya positional legasi masih diterima: `OPTS="<doc|all> <lang|all>"`
- Kelakuan: membina JSONL, memuat naik, meninjau setiap 30s, memuat turun hasil, menulis fail.
- Nota: kerja kelompok mungkin mengambil masa sehingga 24 jam untuk selesai (mengikut tetingkap batch OpenAI). Konsol menunjukkan masa berlalu pada setiap tinjauan.
- Persekitaran: `OPENAI_API_KEY` (diperlukan), pilihan `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (lalai 24j), `BATCH_POLL_INTERVAL_MS`.
- Legasi: `translate_web_docs_sync`
  - Penggunaan (flag): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Gaya positional legasi masih diterima: `OPTS="<doc|all> <lang|all>"`
- Kelakuan: permintaan segerak per pasangan (tiada pengagregatan kelompok).
- Nota: Prompt interaktif apabila `OPTS` diabaikan. Kedua‑dua mod mengekalkan blok kod/kod sebaris dan mengekalkan front‑matter `id` tidak berubah; log ke `translation_web_batch.log` (kelompok) atau `translation_web_sync.log` (segerak).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tujuan: terjemah rentetan UI laman (halaman utama, palang navigasi, pengaki) daripada `website/i18n/en/code.json` ke semua lokal di bawah `website/i18n/<locale>/code.json` (tidak termasuk `en`).
- Penggunaan: `make translate_web_index` atau `make translate_web_index OPTS="--locales de,fr [--force]"`
- Keperluan: eksport `OPENAI_API_KEY` (pilihan: `OPENAI_MODEL=gpt-4o-mini`).
- Kelakuan: mengesahkan struktur JSON, mengekalkan tempat letak kurungan keriting, mengekalkan URL tidak berubah, dan cuba semula dengan maklum balas pada ralat pengesahan.

---

#### web_build {#mt-web_build}

- Tujuan: bina laman dok ke `website/build`.
- Penggunaan: `make web_build OPTS="--locales en|de,en|all"` (atau tetapkan `BUILD_LOCALES="en de"`)
- Dalaman: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Kebergantungan: menjalankan `npm ci` dalam `website/` hanya jika `website/node_modules/@docusaurus` tiada.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tujuan: semakan pautan selamat luar talian.
- Penggunaan: `make web_build_linkcheck OPTS="--locales en|all"`
- Nota: membina ke `tmp_linkcheck_web_pages`; menulis semula `baseUrl` GH Pages kepada `/`; melangkau pautan HTTP(S) jauh.

#### web_build_local_preview {#mt-web_build_local_preview}

- Tujuan: pratonton gh‑pages tempatan dengan ujian/semakan pautan pilihan.
- Penggunaan: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Kelakuan: cuba pelayan pratonton Node dahulu (`scripts/preview-server.mjs`, menyokong `/__stop`), kembali kepada `python3 -m http.server`; melayani pada 8080–8090; PID di `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tujuan: tolak `website/build` ke cawangan `gh-pages`.
- Penggunaan: `make web_push_github`

Petua: tetapkan `NPM=…` untuk menimpa pengurus pakej yang digunakan oleh Makefile (lalai kepada `npm`).

---
