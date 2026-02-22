---
id: development
title: 'Pangembangan'
sidebar_label: 'Pamekaran'
---

---

## Pituduh Pangembangan {#development-guide}

:::note Édit Inggris wungkul; tarjamahan bakal sumebar
Apdet dokuméntasi ngan ukur dina `website/docs` (Inggris). Tarjamahan dina `website/i18n/<locale>/…` dihasilkeun sarta ulah diédit manual. Paké pancén tarjamahan (misalna, `make translate_web_docs_batch`) pikeun nyegerkeun eusi lokal.
:::

### Sarat awal {#prerequisites}

- Node.js 22+ jeung npm (diuji ku Node 22)
- Thunderbird 128 ESR atawa leuwih anyar (pikeun nguji manual)

---

### Tata Léngkah Proyék (tingkat luhur) {#project-layout-high-level}

- Akar (root): skrip packaging `distribution_zip_packer.sh`, dokuméntasi, cuplikan layar
- `sources/`: kode add-on utama (latar tukang, pilihan/popup UI, manifés, ikon)
- `tests/`: pakét tés Vitest
- `website/`: dokuméntasi Docusaurus (kalebet i18n dina `website/i18n/de/...`)

---

### Masang & Parabot {#install-and-tooling}

- Pasang gumantung root: `npm ci`
- Dokuméntasi (opsional): `cd website && npm ci`
- Manggihan target: `make help`

---

### Pangembangan Langsung (web‑ext run) {#live-dev-web-ext}

- Siklus gancang dina Firefox Desktop (tés UI basajan wungkul):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Jalan dina Thunderbird (disarankeun keur MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Tetepkeun Konsol Kasalahan Thunderbird kabuka (Tools → Developer Tools → Error Console).
- Kaca kajadian MV3 dibekukeun nalika nganggur; muat deui add‑on sanggeus parobahan kode, atawa tinggalkeun web‑ext auto‑reload.
- Sababaraha paripolah husus Firefox béda; salawasna verifikasi dina Thunderbird pikeun sarua API.
- Jalur binér Thunderbird (conto):
- Linux: `thunderbird` (contona, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Isolasi profil: Paké profil Thunderbird misah pikeun pamekaran sangkan teu mangaruhan setélan sapopoé anjeun.

---

### Target Make (urut alfabet) {#make-targets-alphabetical}

Makefile ngamastikeun alur dev umum. Jalankeun `make help` iraha waé pikeun ringkesan sakalimat unggal target.

Tip: ngajalankeun `make` tanpa target bakal muka ménu Whiptail basajan pikeun milih target.

| Target                                                   | Katerangan sakalimat                                                                         |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Pupus artifak build/preview lokal (tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | Format, jalankeun tés (kaasup i18n), apdet changelog, commit & push.                         |
| [`eslint`](#mt-eslint)                                   | Jalankeun ESLint ngaliwatan flat config (`npm run -s lint:eslint`).                          |
| [`help`](#mt-help)                                       | Daptarkeun sadaya target jeung dokuméntasi sakalimat (diurutkeun).                           |
| [`lint`](#mt-lint)                                       | web‑ext lint dina `sources/` (manifés samentara; malire ZIP; teu fatal).                     |
| [`menu`](#mt-menu)                                       | Ménu interaktif pikeun milih target jeung argumén opsional.                                  |
| [`pack`](#mt-pack)                                       | Ngawangun ZIP ATN & LOCAL (ngajalankeun linter; nyauran skrip packer).                       |
| [`prettier`](#mt-prettier)                               | Méré format répositori di tempatna (nulis parobahan).                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier dina modeu pariksa (tanpa nulis); gagal lamun butuh réformat.                       |
| [`prettier_write`](#mt-prettier_write)                   | Alias keur `prettier`.                                                                       |
| [`test`](#mt-test)                                       | Prettier (nulis), ESLint, tuluy Vitest (liputan lamun dikonpigurasikeun).                    |
| [`test_i18n`](#mt-test_i18n)                             | Tés i18n wungkul: placeholders/paritas add‑on + paritas situs wéb.                           |
| [`translate_app`](#mt-translation-app)                   | Alias keur `translation_app`.                                                                |
| [`translation_app`](#mt-translation-app)                 | Narjamahkeun string UI aplikasi tina `sources/_locales/en/messages.json`.                    |
| [`translate_web_docs_batch`](#mt-translation-web)        | Narjamahkeun dokumén situs via OpenAI Batch API (disarankeun).                               |
| [`translate_web_docs_sync`](#mt-translation-web)         | Narjamahkeun dokumén situs sacara sinkron (legacy, non-batch).                               |
| [`translate_web_index`](#mt-translation_web_index)       | Alias keur `translation_web_index`.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Narjamahkeun UI homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Ngawangun dokumén kana `website/build` (ngadukung `--locales` / `BUILD_LOCALES`).            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Mariksa tautan anu aman offline (ngalangkungan HTTP[S] jauh).                                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Préview gh‑pages lokal; otomatis ngaladénan dina 8080–8090; tés/link‑check opsional.         |
| [`web_push_github`](#mt-web_push_github)                 | Dorong `website/build` ka cabang `gh-pages`.                                                 |

Sintaks pilihan

- Paké `make <command> OPTS="…"` pikeun ngoper pilihan (disarankeun maké tanda petik). Unggal target di handap némbongkeun conto pamakean.

--

-

#### Locale build tips {#locale-build-tips}

- Ngawangun sabagéan lokal: setél `BUILD_LOCALES="en de"` atawa pasihkeun `OPTS="--locales en,de"` ka target wéb.
- Préview hiji lokal husus: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Ngawangun & Mempaketkeun {#build-and-package}

- Ngawangun ZIP: `make pack`
- Ngahasilkeun ZIP ATN jeung LOCAL dina akar répo (ulah ngédit artifak sacara manual)
- Tip: apdet vérsi dina duanana `sources/manifest_ATN.json` jeung `sources/manifest_LOCAL.json` saméméh packaging
- Pamasangan manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → pilih ZIP anu geus diwangun

---

### Tés {#test}

- Pakét lengkep: `make test` (Vitest)
- Cakupan (opsional):
- `npm i -D @vitest/coverage-v8`
- Jalankeun `make test`; buka `coverage/index.html` pikeun laporan HTML
- i18n wungkul: `make test_i18n` (konci UI/placeholder/judul + parity situs per‑lokal per‑dok kalawan pamariksaan id/title/sidebar_label)

---

### Ngawanohkeun Kasalahan & Log {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Alihkeun log jéntré nalika runtime:
- Hurungkeun: `messenger.storage.local.set({ debug: true })`
- Pareuman: `messenger.storage.local.set({ debug: false })`
- Log mucunghul nalika nyusun/ngirim waleran

---

### Dokuméntasi (situs) {#docs-website}

- Server pamekaran: `cd website && npm run start`
- Ngawangun situs statik: `cd website && npm run build`
- Padanan Make (alfabétis): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Conto pamakean:
- EN wungkul, skip tés/link‑check, teu push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Sadaya lokal, kalayan tés/link‑check, tuluy push: `make web_build_local_preview && make web_push_github`
- Sateuacan nerbitkeun, jalankeun pariksa tautan aman‑offline: `make web_build_linkcheck`.
- i18n: Inggris aya di `website/docs/*.md`; tarjamahan Jérman di `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pilarian: Lamun variabel lingkungan Algolia DocSearch disetél dina CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), situs bakal maké pamilarian Algolia; upami henteu bakal balik kana pilarian lokal. Dina kaca utama, pencét `/` atawa `Ctrl+K` pikeun muka kotak pilarian.

---

#### Rute alihan sumbangan {#donate-redirect}

- `website/src/pages/donate.js`
- Rute: `/donate` (jeung `/<locale>/donate`)
- Kalakuan:
- Lamun ruteu ayeuna miboga lokal (misalna, `/de/donate`), paké éta
- Upamana henteu, pilih nu pang cocogna tina `navigator.languages` lawan lokal nu dikonpigurasikeun; balik kana lokal standar
- Dialihkeun ka:
- `en` → `/docs/donation`
- séjénna → `/<locale>/docs/donation`
- Ngagunakeun `useBaseUrl` pikeun nanganan baseUrl kalayan hadé
- Kalebet meta refresh + tautan `noscript` minangka cadangan

---

---

#### Tips Préview {#preview-tips}

- Eureunkeun préview Node kalayan bener: buka `http://localhost:<port>/__stop` (dicitak sanggeus `Local server started`).
- Lamun gambar teu muat dina MDX/JSX, paké `useBaseUrl('/img/...')` supaya nurut kana `baseUrl` situs.
- Préview dimimitian heula; pariksa tautan dijalankeun sanggeusna jeung teu ngahalangan (tautan éksternal pegat moal ngeureunkeun préview).
- Conto URL préview: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (dicitak sanggeus “Local server started”).
- Tautan éksternal dina link‑check: Sababaraha situs éksternal (misalna, addons.thunderbird.net) meungpeuk crawler otomatis sarta bisa némbongkeun 403 dina pamariksaan tautan. Préview tetep dimimitian; ieu bisa dipaliré.

---

#### Narjamahkeun Situs Wéb {#translate-website}

Nu bisa anjeun tarjamahkeun

- UI situs wungkul: homepage, navbar, footer, jeung string UI séjén. Eusi dokumén tetep Inggris heula.

Tempat ngédit

- Édit `website/i18n/<locale>/code.json` (paké `en` minangka rujukan). Tetepkeun placeholders saperti `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` teu robah.

Ngahasilkeun atawa nyegerkeun file

- Jieun stub nu leungit keur sakabéh lokal: `npm --prefix website run i18n:stubs`
- Timpa stub tina Inggris (sanggeus nambahkeun string anyar): `npm --prefix website run i18n:stubs:force`
- Alternatip keur hiji lokal: `npx --prefix website docusaurus write-translations --locale <locale>`

Narjamahkeun string UI homepage/navbar/footer (OpenAI)

- Setél kredensial sakali (shell atawa .env):
- `export OPENAI_API_KEY=sk-...`
- Opsional: `export OPENAI_MODEL=gpt-4o-mini`
- Sakali jalan (sadayana lokal, teu kaasup en): `make translate_web_index`
- Watesan kana lokal tinangtu: `make translate_web_index OPTS="--locales de,fr"`
- Timpa nilai nu geus aya: `make translate_web_index OPTS="--force"`

Validasi & nyoba deui

- Skrip tarjamahan marios wangun JSON, ngajaga placeholders kurung curly, sarta mastikeun URL teu robah.
- Lamun validasi gagal, bakal nyoba deui kalawan eupan balik nepi ka 2 kali sateuacan ngajaga nilai nu aya.

Préview lokal anjeun

- Server pamekaran: `npm --prefix website run start`
- Kunjuan `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Ngintun

- Buka PR jeung file `code.json` nu geus diédit. Tetepkeun parobahan fokus sarta tambihkeun screenshot gancang lamun mungkin.

---

### Kaamanan & Tips Konpigurasi {#security-and-configuration-tips}

- Ulah nge‑commit `sources/manifest.json` (dijieun samentara ku build)
- Tetepkeun `browser_specific_settings.gecko.id` stabil pikeun ngajaga saluran apdet

---

### Ketahanan Setélan {#settings-persistence}

- Panyimpenan: Kabéh setélan pamaké aya dina `storage.local` sarta tetep salila apdet add‑on.
- Pamasangan: Nilai standar diterapkeun ngan lamun koncina bener‑bener teu aya (undefined).
- Apdet: Migrasi ngan ngeusian konci nu leungit; nilai nu geus aya teu kungsi ditimpa.
- Pananda skéma: `settingsVersion` (kiwari `1`).
- Konci jeung standar:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: tingali `sources/background.js` → `initializeOrMigrateSettings()` jeung `SCHEMA_VERSION`.

Alur pamekaran (nambahkeun setélan anyar)

- Naékkeun `SCHEMA_VERSION` dina `sources/background.js`.
- Tambahkeun konci anyar + standar kana obyék `DEFAULTS` dina `initializeOrMigrateSettings()`.
- Paké aturan "only-if-undefined" nalika ngeusian standar; ulah nimpah nilai nu geus aya.
- Lamun setélanna katingali ku pamaké, pasang dina `sources/options.js` sarta tambahkeun string lokal.
- Tambahkeun/saluyukeun tés (tempo `tests/background.settings.migration.test.js`).

Tips nguji manual

- Simulasikeun pamasangan anyar: beberesih dir data éksténsi atawa mimitian ku profil anyar.
- Simulasikeun apdet: setél `settingsVersion` kana `0` dina `storage.local` lajeng muat deui; pastikeun nilai nu aya tetep teu robah sarta ngan konci nu leungit nu ditambahkeun.

---

### Ngungkulan Masalah {#troubleshooting}

- Pastikeun Thunderbird 128 ESR atawa leuwih anyar
- Paké Error Console pikeun masalah runtime
- Lamun setélan nu disimpen siga teu dilarapkeun leres, balikan deui Thunderbird lajeng cobian deui. (Thunderbird bisa nyimpen kaayaan antara sési; balikan ngajamin setélan anyar dimuat.)

---

### CI & Cakupan {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ngajalankeun vitest kalawan ambang cakupan (85% garis/fungsi/dahan/pernyataan). Lamun ambang teu kahontal, padamelan gagal.
- Alur kerja ngunggah artifak `coverage-html` jeung laporan HTML; undeur ti kaca run (Actions → run pangahirna → Artifacts).

---

### Nyumbang {#contributing}

- Tingali CONTRIBUTING.md pikeun pituduh branch/commit/PR
- Tip: Jieun profil pamekaran Thunderbird misah pikeun nguji sangkan teu mangaruhan profil sapopoé.

---

### Tarjamahan

- Ngajalankeun padamelan tarjamahan “sadaya → sadaya” anu gedé bisa lalaunan jeung mahal. Mimitian ku sabagéan (mis., sababaraha dokumén jeung 1–2 lokal), tinjau hasilna, tuluy dilegaan.

---

- Kabijakan nyobaan deui: padamelan tarjamahan nepi ka 3 kali nyobaan deui kalawan backoff eksponénsial lamun aya kasalahan API; tingali `scripts/translate_web_docs_batch.js` jeung `scripts/translate_web_docs_sync.js`.

Cuplikan layar pikeun dokumén

- Simpen gambar di handapeun `website/static/img/`.
- Rujukkeun dina MD/MDX ngaliwatan `useBaseUrl('/img/<filename>')` sangkan jalur luyu jeung `baseUrl` situs.
- Sanggeus nambah atawa ngarobah ngaran gambar dina `website/static/img/`, pastikeun sakabéh rujukan masih maké `useBaseUrl('/img/…')` sarta katingali dina préview lokal.
  Favicons

- `favicon.ico` multi‑ukuran dihasilkeun otomatis dina sakabéh jalur build (Make + skrip) ngaliwatan `website/scripts/build-favicon.mjs`.
- Teu perlu léngkah manual; ngapdet `icon-*.png` geus cekap.
  Tip marios

- Tetepkeun front‑matter `id` teu robah dina dokumén tarjamahan; tarjamahkeun ngan `title` jeung `sidebar_label` lamun aya.

#### clean {#mt-clean}

- Tujuan: mupus artifak build/preview lokal.
- Pamakean: `make clean`
- Mupus (lamun aya):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tujuan: format, tés, apdet changelog, commit, sarta push.
- Pamakean: `make commit`
- Rincian: ngajalankeun Prettier (nulis), `make test`, `make test_i18n`; nambahkeun changelog nalika aya diff nu distage; push ka `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tujuan: ngajalankeun ESLint ngaliwatan flat config.
- Pamakean: `make eslint`

---

#### help {#mt-help}

- Tujuan: daptarkeun sadaya target jeung dokuméntasi sakalimat.
- Pamakean: `make help`

---

#### lint {#mt-lint}

- Tujuan: lint MailExtension maké `web-ext`.
- Pamakean: `make lint`
- Catetan: nyalin samentara `sources/manifest_LOCAL.json` → `sources/manifest.json`; malire ZIP nu geus diwangun; peringatan teu ngajadikeun pipa gagal.

---

#### menu {#mt-menu}

- Tujuan: ménu interaktif pikeun milih target Make jeung argumén opsional.
- Pamakean: jalankeun `make` tanpa argumén.
- Catetan: lamun `whiptail` teu sayaga, ménu bakal balik kana `make help`.

---

#### pack {#mt-pack}

- Tujuan: ngawangun ZIP ATN jeung LOCAL (gumantung kana `lint`).
- Pamakean: `make pack`
- Tip: naekeun vérsi dina duanana `sources/manifest_*.json` saméméh packaging.

---

#### prettier {#mt-prettier}

- Tujuan: méré format répo di tempatna.
- Pamakean: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tujuan: mastikeun formatting (tanpa nulis).
- Pamakean: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tujuan: alias keur `prettier`.
- Pamakean: `make prettier_write`

---

#### test {#mt-test}

- Tujuan: ngajalankeun Prettier (nulis), ESLint, tuluy Vitest (cakupan lamun dipasang).
- Pamakean: `make test`

#### test_i18n {#mt-test_i18n}

- Tujuan: tés fokus i18n pikeun string add‑on jeung dokumén situs.
- Pamakean: `make test_i18n`
- Ngajalankeun: `npm run test:i18n` jeung `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tujuan: narjamahkeun string UI add‑on tina EN ka lokal séjén.
- Pamakean: `make translation_app OPTS="--locales all|de,fr"`
- Catetan: ngajaga struktur konci jeung placeholders; log ka `translation_app.log`. Bentuk skrip: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tujuan: narjamahkeun dokumén situs tina `website/docs/*.md` kana `website/i18n/<locale>/...`.
- Disarankeun: `translate_web_docs_batch` (OpenAI Batch API)
  - Pamakean (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisi legacy masih ditarima: `OPTS="<doc|all> <lang|all>"`
- Kalakuan: nyusun JSONL, ngunggah, polling saban 30s, ngundeur hasilna, nulis file.
- Catetan: padamelan batch bisa nepi ka 24 jam (nurutan jandéla batch OpenAI). Konsol némbongkeun waktu kaliwat dina unggal polling.
- Lingkungan: `OPENAI_API_KEY` (perlu), opsional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standar 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Pamakean (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisi legacy masih ditarima: `OPTS="<doc|all> <lang|all>"`
- Kalakuan: paménta sinkron per‑pasangan (tanpa agregasi batch).
- Catetan: Prompt interaktif lamun `OPTS` teu disadiakeun. Duanana mode ngajaga blok kode/kode inline sarta tetepkeun front‑matter `id` teu robah; log ka `translation_web_batch.log` (batch) atawa `translation_web_sync.log` (sinkron).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tujuan: narjamahkeun string UI situs (homepage, navbar, footer) tina `website/i18n/en/code.json` ka sakabéh lokal dina `website/i18n/<locale>/code.json` (iwal `en`).
- Pamakean: `make translate_web_index` atawa `make translate_web_index OPTS="--locales de,fr [--force]"`
- Sarat: ekspor `OPENAI_API_KEY` (opsional: `OPENAI_MODEL=gpt-4o-mini`).
- Kalakuan: mariksa struktur JSON, ngajaga placeholders kurung curly, ngajaga URL teu robah, sarta nyobaan deui kalawan eupan balik lamun aya kasalahan validasi.

---

#### web_build {#mt-web_build}

- Tujuan: ngawangun situs dokumén kana `website/build`.
- Pamakean: `make web_build OPTS="--locales en|de,en|all"` (atawa setél `BUILD_LOCALES="en de"`)
- Internal: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Gantunganna: ngajalankeun `npm ci` dina `website/` ngan lamun `website/node_modules/@docusaurus` teu aya.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tujuan: pamariksaan tautan anu aman offline.
- Pamakean: `make web_build_linkcheck OPTS="--locales en|all"`
- Catetan: ngawangun kana `tmp_linkcheck_web_pages`; ngarobah `baseUrl` GH Pages jadi `/`; ngalangkungan tautan HTTP(S) jauh.

#### web_build_local_preview {#mt-web_build_local_preview}

- Tujuan: préview gh‑pages lokal kalawan tés/link‑check opsional.
- Pamakean: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Kalakuan: nyobian server préview Node heula (`scripts/preview-server.mjs`, ngadukung `/__stop`), balik kana `python3 -m http.server` lamun perlu; ngaladénan dina 8080–8090; PID di `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tujuan: dorong `website/build` ka cabang `gh-pages`.
- Pamakean: `make web_push_github`

Tip: setél `NPM=…` pikeun ngaganti manajer pakét nu dipaké ku Makefile (standarna `npm`).

---
