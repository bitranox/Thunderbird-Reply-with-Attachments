---
id: development
title: 'Pangembangan'
sidebar_label: 'Pangembangan'
---

---

## Pandhuan Pangembangan {#development-guide}

:::note Sunting mung Inggris; terjemahan bakal sumebar
Nganyari dokumentasi **mung** ing `website/docs` (Inggris). Terjemahan ing `website/i18n/<locale>/…` digawé lan ora kena disunting manual. Gunakna tugas terjemahan (umpamane, `make translate_web_docs_batch`) kanggo nyegeraké isi lokal.
:::

### Prasyarat {#prerequisites}

- Node.js 22+ lan npm (wis dites nganggo Node 22)
- Thunderbird 128 ESR utawa luwih anyar (kanggo testing manual)

---

### Tata Letak Proyèk (tingkat dhuwur) {#project-layout-high-level}

- Root: skrip packaging `distribution_zip_packer.sh`, dokumèn, screenshot
- `sources/`: kode add-on utama (latar mburi, UI opsi/popup, manifest, ikon)
- `tests/`: Vitest suite
- `website/`: dokumèn Docusaurus (kanthi i18n ing `website/i18n/de/...`)

---

### Instalasi & Piranti {#install-and-tooling}

- Pasang dependensi root: `npm ci`
- Dokumèn (opsional): `cd website && npm ci`
- Ndelok target: `make help`

---

### Panggembangan Langsung (web‑ext run) {#live-dev-web-ext}

- Siklus cepet ing Firefox Desktop (mung smoke-test UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Mbukak ing Thunderbird (luwih dianjuraké kanggo MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Tansah bukak Error Console‑né Thunderbird (Tools → Developer Tools → Error Console).
- Kaca acara MV3 digantung nalika nganggur; muat manèh add‑on sawisé owah‑owahan kode, utawa tinggalna web‑ext auto‑reload.
- Sawetara prilaku khusus Firefox béda; tansah verifikasi ing Thunderbird kanggo paritas API.
- Dalan binary Thunderbird (conto):
- Linux: `thunderbird` (umpamane, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Isolasi profil: Gunakna profil Thunderbird kapisah kanggo pangembangan supaya ora mengaruhi setelan saben dina.

---

### Target Make (urut abjad) {#make-targets-alphabetical}

Makefile nyeragamaké alur dev umum. Lakokna `make help` kapan waé kanggo ringkesan sakbaris saben target.

Tips: mbukak `make` tanpa target bakal mbukak menu Whiptail prasaja kanggo milih target.

| Target                                                   | Katrangan sakbaris                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Mbusak artefak build/preview lokal (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | Mformat, mbukak test (kalebu i18n), nganyari changelog, commit & push.                      |
| [`eslint`](#mt-eslint)                                   | Mbukak ESLint liwat flat config (`npm run -s lint:eslint`).                                 |
| [`help`](#mt-help)                                       | Dhaptar kabèh target karo dokumèn sakbaris (urut).                                          |
| [`lint`](#mt-lint)                                       | web‑ext lint ing `sources/` (manifest samentara; nglirwakaké ZIP; ora fatal).               |
| [`menu`](#mt-menu)                                       | Menu interaktif kanggo milih target lan argumèn opsional.                                   |
| [`pack`](#mt-pack)                                       | Mbangún ATN & LOCAL ZIP (mbukak linter; nelpon skrip packer).                               |
| [`prettier`](#mt-prettier)                               | Mformat repositori ing panggonan (nulis owah‑owahan).                                       |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ing mode priksa (tanpa nulis); gagal yen butuh reformat.                           |
| [`prettier_write`](#mt-prettier_write)                   | Alias kanggo `prettier`.                                                                    |
| [`test`](#mt-test)                                       | Prettier (nulis), ESLint, banjur Vitest (coverage yen dikonfigurasi).                       |
| [`test_i18n`](#mt-test_i18n)                             | Tes khusus i18n: placeholder/paritas add‑on + paritas situs web.                            |
| [`translate_app`](#mt-translation-app)                   | Alias kanggo `translation_app`.                                                             |
| [`translation_app`](#mt-translation-app)                 | Nerjemahaké string UI app saka `sources/_locales/en/messages.json`.                         |
| [`translate_web_docs_batch`](#mt-translation-web)        | Nerjemahaké dokumèn situs liwat OpenAI Batch API (diutamaké).                               |
| [`translate_web_docs_sync`](#mt-translation-web)         | Nerjemahaké dokumèn situs sacara sinkron (warisan, non‑batch).                              |
| [`translate_web_index`](#mt-translation_web_index)       | Alias kanggo `translation_web_index`.                                                       |
| [`translation_web_index`](#mt-translation_web_index)     | Nerjemahaké UI homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Mbangún dokumèn menyang `website/build` (ndhukung `--locales` / `BUILD_LOCALES`).           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Priksa pranala sing aman offline (ngliwati HTTP[S] remot).                                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Pratayang gh‑pages lokal; auto‑serve ing 8080–8090; test/priksa pranala opsional.           |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` menyang cabang `gh-pages`.                                             |

Sintaks kanggo opsi

- Gunakna `make <command> OPTS="…"` kanggo ngirim opsi (disaranaké nganggo tanda petik). Saben target ing ngisor nuduhaké conto panggunaan.

--

-

#### Tips build locale {#locale-build-tips}

- Mbangún subset locale: setel `BUILD_LOCALES="en de"` utawa pass `OPTS="--locales en,de"` menyang target web.
- Pratayang locale tartamtu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Mbangún & Paket {#build-and-package}

- Gawe ZIP: `make pack`
- Ngasilaké ZIP ATN lan LOCAL ing root repo (aja nyunting artefak kanthi manual)
- Tips: nganyari versi ing loro‑loroné `sources/manifest_ATN.json` lan `sources/manifest_LOCAL.json` sadurungé ngepak
- Instal manual (dev): Thunderbird → Tools → Add‑ons and Themes → roda gigi → Install Add‑on From File… → pilih ZIP sing wis dibangun

---

### Tes {#test}

- Suite lengkap: `make test` (Vitest)
- Coverage (opsional):
- `npm i -D @vitest/coverage-v8`
- Mbukak `make test`; bukak `coverage/index.html` kanggo laporan HTML
- Mung i18n: `make test_i18n` (tombol UI/placeholder/judhul + paritas situs per‑locale per‑dok karo priksa id/title/sidebar_label)

---

### Debugging & Log {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Ganti log verbose nalika mlaku:
- Nguripaké: `messenger.storage.local.set({ debug: true })`
- Matèni: `messenger.storage.local.set({ debug: false })`
- Log katon nalika nyusun/ngirim wangsulan

---

### Dokumèn (situs web) {#docs-website}

- Server dev: `cd website && npm run start`
- Mbangún situs statis: `cd website && npm run build`
- Padanan Make (urut abjad): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Conto panggunaan:
- Mung EN, ngliwati tes/priksa pranala, ora ana push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Kabèh locale, karo tes/priksa pranala, banjur push: `make web_build_local_preview && make web_push_github`
- Sadurungé nerbitaké, lakokna priksa pranala aman offline: `make web_build_linkcheck`.
- i18n: Inggris ana ing `website/docs/*.md`; terjemahan Jerman ana ing `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Panelusuran: Yen variabel lingkungan Algolia DocSearch wis disetel ing CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), situs migunakaké panelusuran Algolia; yen ora, bali menyang panelusuran lokal. Ing kaca ngarep, penet `/` utawa `Ctrl+K` kanggo mbukak kothak panelusuran.

---

#### Rute alihan donasi {#donate-redirect}

- `website/src/pages/donate.js`
- Rute: `/donate` (lan `/<locale>/donate`)
- Prilaku:
- Yèn rute saiki nduwé locale (contone, `/de/donate`), gunakna kuwi
- Yèn ora, pilih cocog sing paling apik saka `navigator.languages` marang locale sing dikonfigurasi; bali menyang locale baku
- Ngalihaké menyang:
- `en` → `/docs/donation`
- liyane → `/<locale>/docs/donation`
- Migunakaké `useBaseUrl` kanggo nangani baseUrl kanthi bener
- Kalebu meta refresh + pranala `noscript` minangka cadangan

---

---

#### Tips Pratayang {#preview-tips}

- Mungkasi pratayang Node kanthi resik: bukak `http://localhost:<port>/__stop` (dicithak sawisé `Local server started`).
- Yèn gambar ora memuat ing MDX/JSX, gunakna `useBaseUrl('/img/...')` supaya ngajèni `baseUrl` situs.
- Pratayang diwiwit dhisik; priksa pranala mlaku sawisé kuwi lan ora mbloker (pranala eksternal rusak ora bakal nyetop pratayang).
- Conto URL pratayang: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (dicithak sawisé “Local server started”).
- Pranala eksternal ing link‑check: Sawetara situs eksternal (umpamane, addons.thunderbird.net) mblokir crawler otomatis lan bisa nuduhaké 403 nalika dipriksa. Pratayang tetep mlaku; iki aman kanggo diabaikan.

---

#### Nerjemahaké Situs Web {#translate-website}

Sing bisa sampeyan terjemahaké

- Mung UI situs web: homepage, navbar, footer, lan string UI liyané. Isi dokumèn saiki tetep mung Inggris.

Ngendi kudu nyunting

- Sunting `website/i18n/<locale>/code.json` (gunakna `en` minangka referènsi). Tansah jaga placeholder kaya `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` supaya ora owah.

Gawe utawa segerna file

- Gawe stub sing durung ana kanggo kabèh locale: `npm --prefix website run i18n:stubs`
- Nimpa stub saka Inggris (sawisé nambah string anyar): `npm --prefix website run i18n:stubs:force`
- Alternatif kanggo siji locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Nerjemahaké string UI homepage/navbar/footer (OpenAI)

- Setel kredensial sepisan (shell utawa .env):
- `export OPENAI_API_KEY=sk-...`
- Opsional: `export OPENAI_MODEL=gpt-4o-mini`
- Sak‑cethoke (kabèh locale, ngliwati en): `make translate_web_index`
- Watesi menyang locale tartamtu: `make translate_web_index OPTS="--locales de,fr"`
- Nimpa nilai sing wis ana: `make translate_web_index OPTS="--force"`

Validasi & nyoba maneh

- Skrip terjemahan mvalidasi wangun JSON, njaga placeholder kurung kurawal, lan mesthèkaké URL tetep ora owah.
- Yèn validasi gagal, bakal nyoba maneh kanthi umpan balik nganti 2 kaping sadurungé njaga nilai sing wis ana.

Pratayang lokalemu

- Server dev: `npm --prefix website run start`
- Bukak `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Ngirim

- Bukak PR karo file `code.json` sing wis disunting. Jaga owah‑owahan supaya tetep fokus lan lebokna screenshot cekak yen bisa.

---

### Tips Keamanan & Konfigurasi {#security-and-configuration-tips}

- Aja nge‑commit `sources/manifest.json` (digawe samentara déning build)
- Tansah `browser_specific_settings.gecko.id` tetep stabil kanggo njaga saluran update

---

### Ketetapan Setélan {#settings-persistence}

- Panyimpenan: Kabèh setélan pangguna ana ing `storage.local` lan lestari ing sak ndawane update add‑on.
- Instal: Default mung diterapaké nalika tombol kunci (key) pancèn ora ana (undefined).
- Update: Migrasi mung ngisi key sing ilang; nilai sing wis ana ora tau ditimpa.
- Tandha skéma: `settingsVersion` (saiki `1`).
- Key lan default:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: delengen `sources/background.js` → `initializeOrMigrateSettings()` lan `SCHEMA_VERSION`.

Alur dev (nambah setélan anyar)

- Tambahaké `SCHEMA_VERSION` ing `sources/background.js`.
- Tambahaké key anyar + default menyang obyek `DEFAULTS` ing `initializeOrMigrateSettings()`.
- Gunakna aturan "mung yen undefined" nalika nyemai default; aja nimpakake nilai sing wis ana.
- Yèn setélan katon déning pangguna, sambungna ing `sources/options.js` lan tambahna string lokal.
- Tambah/selarasna tes (delengen `tests/background.settings.migration.test.js`).

Tips testing manual

- Niru instal anyar: resikna dir data ékstènsi utawa wiwiti nganggo profil anyar.
- Niru update: setel `settingsVersion` dadi `0` ing `storage.local` lan muat manèh; pastèkna nilai sing wis ana tetep ora owah lan mung key sing ilang sing ditambah.

---

### Ngatasi Masalah {#troubleshooting}

- Pastèkna Thunderbird 128 ESR utawa luwih anyar
- Gunakna Error Console kanggo masalah runtime
- Yèn setélan sing disimpen katon ora nerap kanthi bener, wiwiti manèh Thunderbird banjur cobanen maneh. (Thunderbird bisa nyimpen cache kahanan antar sesi; miwiti manèh njamin setélan seger dimuat.)

---

### CI & Cakupan {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) mbukak vitest nganggo ambang cakupan (85% baris/fungsi/cabang/pernyataan). Yen ambang ora ketekan, pakaryan bakal gagal.
- Alur kerja ngunggah artefak `coverage-html` karo laporan HTML; undhuh saka kaca run (Actions → latest run → Artifacts).

---

### Nyumbang {#contributing}

- Delengen CONTRIBUTING.md kanggo pedoman branch/commit/PR
- Tips: Gawé profil pangembangan Thunderbird kapisah kanggo testing supaya ora mengaruhi profil saben dina.

---

### Terjemahan

- Mbukak tugas terjemahan gedhé “kabèh → kabèh” bisa alon lan larang. Wiwiti saka subset (umpamane, sawetara dokumèn lan 1–2 locale), tinjau asilé, banjur dikembangna.

---

- Kebijakan retry: tugas terjemahan bakal nyoba nganti 3 kaping nganggo exponential backoff nalika ana kesalahan API; delengen `scripts/translate_web_docs_batch.js` lan `scripts/translate_web_docs_sync.js`.

Screenshot kanggo dokumèn

- Simpen gambar ing `website/static/img/`.
- Rujuk ing MD/MDX liwat `useBaseUrl('/img/<filename>')` supaya path cocog karo `baseUrl` situs.
- Sawisé nambah utawa ganti jeneng gambar ing `website/static/img/`, pastèkna kabèh rujukan isih nganggo `useBaseUrl('/img/…')` lan bisa dirender ing pratayang lokal.
  Favicons

- File multi‑ukuran `favicon.ico` digawé otomatis ing kabèh dalan build (Make + skrip) liwat `website/scripts/build-favicon.mjs`.
- Ora butuh langkah manual; nganyari `icon-*.png` wis cukup.
  Tips review

- Tansah front‑matter `id` ora owah ing dokumèn terjemahan; terjemahna mung `title` lan `sidebar_label` yen ana.

#### clean {#mt-clean}

- Tujuan: mbusak artefak build/preview lokal.
- Panggunaan: `make clean`
- Mbusak (yen ana):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tujuan: mformat, ngetès, nganyari changelog, commit, lan push.
- Panggunaan: `make commit`
- Rinciyan: mbukak Prettier (nulis), `make test`, `make test_i18n`; nambahaké cathetan ing changelog nalika ana bedha sing wis distage; push menyang `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tujuan: mbukak ESLint liwat flat config.
- Panggunaan: `make eslint`

---

#### help {#mt-help}

- Tujuan: ndhaptar kabèh target karo dokumèn sakbaris.
- Panggunaan: `make help`

---

#### lint {#mt-lint}

- Tujuan: nglint MailExtension nganggo `web-ext`.
- Panggunaan: `make lint`
- Cathetan: nyalin samentara `sources/manifest_LOCAL.json` → `sources/manifest.json`; nglirwakaké ZIP sing wis dibangun; peringatan ora nggagalké pipeline.

---

#### menu {#mt-menu}

- Tujuan: menu interaktif kanggo milih target Make lan argumèn opsional.
- Panggunaan: mbukak `make` tanpa argumèn.
- Cathetan: yen `whiptail` ora kasedhiya, menu bakal bali menyang `make help`.

---

#### pack {#mt-pack}

- Tujuan: mbangun ATN lan LOCAL ZIP (gumantung marang `lint`).
- Panggunaan: `make pack`
- Tips: tambahaké versi ing loro‑loroné `sources/manifest_*.json` sadurungé ngepak.

---

#### prettier {#mt-prettier}

- Tujuan: mformat repo ing panggonan.
- Panggunaan: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tujuan: mriksa format (tanpa nulis).
- Panggunaan: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tujuan: alias kanggo `prettier`.
- Panggunaan: `make prettier_write`

---

#### test {#mt-test}

- Tujuan: mbukak Prettier (nulis), ESLint, banjur Vitest (coverage yen diinstal).
- Panggunaan: `make test`

#### test_i18n {#mt-test_i18n}

- Tujuan: tes fokus i18n kanggo string add‑on lan dokumèn situs.
- Panggunaan: `make test_i18n`
- Mbukak: `npm run test:i18n` lan `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tujuan: nerjemahaké string UI add‑on saka EN menyang locale liyané.
- Panggunaan: `make translation_app OPTS="--locales all|de,fr"`
- Cathetan: njaga struktur key lan placeholder; nulis log menyang `translation_app.log`. Wujud skrip: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tujuan: nerjemahaké dokumèn situs saka `website/docs/*.md` dadi `website/i18n/<locale>/...`.
- Diutamaké: `translate_web_docs_batch` (OpenAI Batch API)
  - Panggunaan (flag): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisi warisan isih ditrima: `OPTS="<doc|all> <lang|all>"`
- Prilaku: mbangun JSONL, ngunggah, mriksa saben 30s, ngundhuh asil, nulis file.
- Cathetan: pakaryan batch bisa nganti 24 jam rampung (miturut jendhela batch OpenAI). Konsol nuduhaké wektu lumaku saben pol.
- Lingkungan: `OPENAI_API_KEY` (dibutuhaké), opsional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (gawan 24 jam), `BATCH_POLL_INTERVAL_MS`.
- Warisan: `translate_web_docs_sync`
  - Panggunaan (flag): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisi warisan isih ditrima: `OPTS="<doc|all> <lang|all>"`
- Prilaku: panyuwunan per‑pasangan sinkron (tanpa agregasi batch).
- Cathetan: Ana prompt interaktif nalika `OPTS` ora diwènèhaké. Kaloro mode njaga blok kode/kode inline lan njaga front‑matter `id` tetep; nulis log menyang `translation_web_batch.log` (batch) utawa `translation_web_sync.log` (sinkron).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tujuan: nerjemahaké string UI situs (homepage, navbar, footer) saka `website/i18n/en/code.json` menyang kabèh locale ing `website/i18n/<locale>/code.json` (kajaba `en`).
- Panggunaan: `make translate_web_index` utawa `make translate_web_index OPTS="--locales de,fr [--force]"`
- Syárat: export `OPENAI_API_KEY` (opsional: `OPENAI_MODEL=gpt-4o-mini`).
- Prilaku: mvalidasi struktur JSON, njaga placeholder kurung kurawal, njaga URL ora owah, lan nyoba maneh karo umpan balik nalika ana kesalahan validasi.

---

#### web_build {#mt-web_build}

- Tujuan: mbangun situs dokumèn menyang `website/build`.
- Panggunaan: `make web_build OPTS="--locales en|de,en|all"` (utawa setel `BUILD_LOCALES="en de"`)
- Internal: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Ketergantungan: mbukak `npm ci` ing `website/` mung yen `website/node_modules/@docusaurus` ora ana.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tujuan: priksa pranala aman offline.
- Panggunaan: `make web_build_linkcheck OPTS="--locales en|all"`
- Cathetan: mbangun menyang `tmp_linkcheck_web_pages`; nulis ulang GH Pages `baseUrl` dadi `/`; ngliwati pranala HTTP(S) remot.

#### web_build_local_preview {#mt-web_build_local_preview}

- Tujuan: pratayang gh‑pages lokal karo tes/priksa pranala opsional.
- Panggunaan: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Prilaku: nyoba server pratayang Node dhisik (`scripts/preview-server.mjs`, ndhukung `/__stop`), banjur bali menyang `python3 -m http.server`; nyedhiyakake ing 8080–8090; PID ana ing `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tujuan: push `website/build` menyang cabang `gh-pages`.
- Panggunaan: `make web_push_github`

Tips: setel `NPM=…` kanggo ngluwihi manager paket sing digunakaké Makefile (gawané `npm`).

---
