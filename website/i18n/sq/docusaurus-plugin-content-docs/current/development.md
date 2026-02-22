---
id: development
title: 'Zhvillim'
sidebar_label: 'Zhvillim'
---

---

## Udhëzues Zhvillimi {#development-guide}

:::note Redaktoni vetëm anglishten; përkthimet përhapen
Përditësoni dokumentacionin **vetëm** nën `website/docs` (anglisht). Përkthimet nën `website/i18n/<locale>/…` gjenerohen dhe nuk duhet të redaktohen manualisht. Përdorni detyrat e përkthimit (p.sh., `make translate_web_docs_batch`) për të rifreskuar përmbajtjen e lokalizuar.
:::

### Parakushtet {#prerequisites}

- Node.js 22+ dhe npm (testuar me Node 22)
- Thunderbird 128 ESR ose më i ri (për testim manual)

---

### Struktura e projektit (niveli i lartë) {#project-layout-high-level}

- Rrënja: skript paketimi `distribution_zip_packer.sh`, dokumente, screenshots
- `sources/`: kodi kryesor i shtesës (background, UI i opsioneve/popup, manifestet, ikonat)
- `tests/`: paketa e Vitest
- `website/`: dokumentacioni Docusaurus (me i18n nën `website/i18n/de/...`)

---

### Instalimi dhe Mjetet {#install-and-tooling}

- Instalo varësitë në rrënjë: `npm ci`
- Dokumentacioni (opsionale): `cd website && npm ci`
- Zbuloni objektivat: `make help`

---

### Zhvillim i gjallë (web‑ext run) {#live-dev-web-ext}

- Cikël i shpejtë në Firefox Desktop (vetëm smoke‑tests të UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Ekzekuto në Thunderbird (e preferuar për MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Këshilla:
- Mbajeni të hapur Error Console të Thunderbird (Tools → Developer Tools → Error Console).
- Faqet e eventeve MV3 pezullohen kur janë në pushim; ringarkoni shtesën pas ndryshimeve në kod, ose lëreni web‑ext të bëjë auto‑reload.
- Disa sjellje vetëm në Firefox ndryshojnë; verifikoni gjithmonë në Thunderbird për barazi të API‑ve.
- Shtegu i binarëve të Thunderbird (shembuj):
- Linux: `thunderbird` (p.sh., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolim profili: Përdorni një profil të veçantë Thunderbird për zhvillim për të shmangur ndikimin në konfigurimin tuaj të përditshëm.

---

### Objektivat Make (alfabetik) {#make-targets-alphabetical}

Makefile standardizon rrjedhat e zakonshme të zhvillimit. Ekzekutoni `make help` në çdo kohë për një përmbledhje me një rresht të çdo objektivi.

Këshillë: ekzekutimi i `make` pa një objektiv hap një menu të thjeshtë Whiptail për të zgjedhur një objektiv.

| Objektivi                                                | Përshkrim me një rresht                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Hiq artefaktet lokale të build/preview (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | Formato, ekzekuto testet (duke përfshirë i18n), përditëso changelog, bëj commit & push.         |
| [`eslint`](#mt-eslint)                                   | Ekzekuto ESLint përmes flat config (`npm run -s lint:eslint`).                                  |
| [`help`](#mt-help)                                       | Listo të gjithë objektivat me dokumentim me një rresht (të renditur).                           |
| [`lint`](#mt-lint)                                       | web‑ext lint në `sources/` (manifest i përkohshëm; injoron ZIP‑et; jo fatal).                   |
| [`menu`](#mt-menu)                                       | Menu interaktive për të zgjedhur një objektiv dhe argumente opsionale.                          |
| [`pack`](#mt-pack)                                       | Ndërto ZIP‑et ATN & LOCAL (ekzekuton linter‑in; thërret skriptin e paketimit).                  |
| [`prettier`](#mt-prettier)                               | Formato repository‑n në vend (shkruan ndryshime).                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier në modalitet verifikimi (pa shkrime); dështon nëse nevojitet riformatim.               |
| [`prettier_write`](#mt-prettier_write)                   | Alias për `prettier`.                                                                           |
| [`test`](#mt-test)                                       | Prettier (shkruaj), ESLint, pastaj Vitest (coverage nëse është konfiguruar).                    |
| [`test_i18n`](#mt-test_i18n)                             | Teste vetëm i18n: vendmbajtës/paritet i shtesës + paritet i faqes së uebit.                     |
| [`translate_app`](#mt-translation-app)                   | Alias për `translation_app`.                                                                    |
| [`translation_app`](#mt-translation-app)                 | Përkthe vargjet e UI të aplikacionit nga `sources/_locales/en/messages.json`.                   |
| [`translate_web_docs_batch`](#mt-translation-web)        | Përkthe dokumentet e faqes përmes OpenAI Batch API (e preferuar).                               |
| [`translate_web_docs_sync`](#mt-translation-web)         | Përkthe dokumentet e faqes në mënyrë sinkrone (trashëgimore, jo-batch).                         |
| [`translate_web_index`](#mt-translation_web_index)       | Alias për `translation_web_index`.                                                              |
| [`translation_web_index`](#mt-translation_web_index)     | Përkthe UI e faqes kryesore/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Ndërto dokumentet te `website/build` (mbështet `--locales` / `BUILD_LOCALES`).                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kontroll lidhjesh i sigurt offline (anashkalon HTTP[S] të largëta).                             |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Parapamje lokale gh‑pages; shërben automatikisht në 8080–8090; teste/kontroll opsional.         |
| [`web_push_github`](#mt-web_push_github)                 | Shto `website/build` në degen `gh-pages`.                                                       |

Sintaksa për opsionet

- Përdorni `make <command> OPTS="…"` për të kaluar opsione (këshillohen thonjëzat). Çdo objektiv më poshtë tregon përdorim shembull.

--

-

#### Këshilla për ndërtimin e lokalizimeve {#locale-build-tips}

- Ndërto një nën‑bashkësi të lokaleve: vendos `BUILD_LOCALES="en de"` ose kaloni `OPTS="--locales en,de"` te objektivat e uebit.
- Parapamje e një lokaliteti specifik: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Ndërtimi dhe Paketimi {#build-and-package}

- Ndërto ZIP‑et: `make pack`
- Prodhon ZIP‑et ATN dhe LOCAL në rrënjën e repo‑s (mos redaktoni artefaktet me dorë)
- Këshillë: përditësoni versionin si në `sources/manifest_ATN.json` ashtu edhe në `sources/manifest_LOCAL.json` para paketimit
- Instalimi manual (zhvillim): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → zgjidhni ZIP‑in e ndërtuar

---

### Testim {#test}

- Paketa e plotë: `make test` (Vitest)
- Mbulesa (opsionale):
- `npm i -D @vitest/coverage-v8`
- Ekzekutoni `make test`; hapni `coverage/index.html` për raportin HTML
- Vetëm i18n: `make test_i18n` (çelësa/vendmbajtës/tituj të UI + paritet për çdo lokalitet/çdo dokument të faqes me kontrolle për id/title/sidebar_label)

---

### Diagnostikim dhe Logje {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Ndërroni logjet e hollësishme në kohë ekzekutimi:
- Aktivizo: `messenger.storage.local.set({ debug: true })`
- Çaktivizo: `messenger.storage.local.set({ debug: false })`
- Logjet shfaqen gjatë hartimit/dërgimit të përgjigjeve

---

### Dokumentacioni (website) {#docs-website}

- Server zhvillimi: `cd website && npm run start`
- Ndërto faqe statike: `cd website && npm run build`
- Ekuivalentët në Make (alfabetik): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Shembuj përdorimi:
- Vetëm EN, anashkalo testet/kontrollin e lidhjeve, pa push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Të gjitha lokalitetet, me teste/kontroll lidhjesh, pastaj push: `make web_build_local_preview && make web_push_github`
- Para publikimit, ekzekutoni kontrollin e lidhjeve të sigurt offline: `make web_build_linkcheck`.
- i18n: Anglishtja është në `website/docs/*.md`; përkthimet gjermane në `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Kërkimi: Nëse variablat e mjedisit Algolia DocSearch janë vendosur në CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), faqja përdor kërkimin Algolia; përndryshe kthehet te kërkimi lokal. Në faqen kryesore, shtypni `/` ose `Ctrl+K` për të hapur kutinë e kërkimit.

---

#### Rruga e ridrejtimit për Donacione {#donate-redirect}

- `website/src/pages/donate.js`
- Rruga: `/donate` (dhe `/<locale>/donate`)
- Sjellja:
- Nëse rruga aktuale ka një lokalitet (p.sh., `/de/donate`), përdoreni atë
- Përndryshe, zgjidh përputhjen më të mirë nga `navigator.languages` kundrejt lokaleve të konfiguruara; në mungesë, përdor lokalitetin parazgjedhje
- Ridrejton te:
- `en` → `/docs/donation`
- të tjerat → `/<locale>/docs/donation`
- Përdor `useBaseUrl` për trajtim të duhur të baseUrl
- Përfshin meta refresh + lidhje `noscript` si rezervë

---

---

#### Këshilla për parapamjen {#preview-tips}

- Ndalo pastër parapamjen e Node: hap `http://localhost:<port>/__stop` (shtypet pas `Local server started`).
- Nëse imazhet nuk ngarkohen në MDX/JSX, përdorni `useBaseUrl('/img/...')` për të respektuar `baseUrl` të faqes.
- Parapamja nis e para; kontrolli i lidhjeve ekzekutohet më pas dhe është jo‑bllokues (lidhjet e jashtme të prishura nuk do ta ndalin parapamjen).
- URL shembull për parapamje: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (shtypet pas “Local server started”).
- Lidhje të jashtme në kontrollin e lidhjeve: Disa faqe të jashtme (p.sh., addons.thunderbird.net) bllokojnë crawler‑a të automatizuar dhe mund të tregojnë 403 në kontrollet e lidhjeve. Parapamja gjithsesi nis; këto mund të injorohen në mënyrë të sigurt.

---

#### Përktheni Faqen në Web {#translate-website}

Çfarë mund të përktheni

- Vetëm UI e faqes: faqja kryesore, navbar, footer, dhe vargje të tjera të UI. Përmbajtja e dokumenteve mbetet vetëm në anglisht për tani.

Ku të redaktoni

- Redaktoni `website/i18n/<locale>/code.json` (përdorni `en` si referencë). Mbani të pandryshuara vendmbajtësa si `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Gjeneroni ose rifreskoni skedarët

- Krijoni stub‑e që mungojnë për të gjitha lokalitetet: `npm --prefix website run i18n:stubs`
- Mbishkruani stub‑et nga anglishtja (pas shtimit të vargjeve të reja): `npm --prefix website run i18n:stubs:force`
- Alternativë për një lokalitet të vetëm: `npx --prefix website docusaurus write-translations --locale <locale>`

Përktheni vargjet e UI të faqes kryesore/navbar/footer (OpenAI)

- Vendosni kredencialet një herë (shell ose .env):
- `export OPENAI_API_KEY=sk-...`
- Opsionale: `export OPENAI_MODEL=gpt-4o-mini`
- Një‑herësh (të gjitha lokalitetet, përjashto en): `make translate_web_index`
- Kufizo në lokalitete specifike: `make translate_web_index OPTS="--locales de,fr"`
- Mbishkruaj vlerat ekzistuese: `make translate_web_index OPTS="--force"`

Vlefshmëria dhe riprovat

- Skripti i përkthimit verifikon formën e JSON, ruan vendmbajtësit me kllapa përdredhëse dhe siguron që URL‑të të mbeten të pandryshuara.
- Në dështim validimi, ai riprovon me feedback deri në 2 herë përpara se të mbajë vlerat ekzistuese.

Parapamja e lokalitetit tuaj

- Server zhvillimi: `npm --prefix website run start`
- Vizitoni `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Dërgimi

- Hapni një PR me skedarët `code.json` të redaktuar. Mbajini ndryshimet të fokusuara dhe përfshini një screenshot të shpejtë kur është e mundur.

---

### Këshilla të Sigurisë dhe Konfigurimit {#security-and-configuration-tips}

- Mos bëni commit të `sources/manifest.json` (krijohet përkohësisht nga build‑i)
- Mbajeni `browser_specific_settings.gecko.id` të qëndrueshme për të ruajtur kanalin e përditësimeve

---

### Qëndrueshmëria e cilësimeve {#settings-persistence}

- Magazinimi: Të gjitha cilësimet e përdoruesit jetojnë në `storage.local` dhe mbeten përtej përditësimeve të shtesës.
- Instalimi: Vlerat e parazgjedhura zbatohen vetëm kur një çelës mungon rreptësisht (undefined).
- Përditësimi: Një migrim plotëson vetëm çelësat që mungojnë; vlerat ekzistuese kurrë nuk mbishkruhen.
- Shenjuesi i skemës: `settingsVersion` (aktualisht `1`).
- Çelësat dhe parazgjedhjet:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kodi: shih `sources/background.js` → `initializeOrMigrateSettings()` dhe `SCHEMA_VERSION`.

Fluksi i zhvillimit (shtimi i një cilësimi të ri)

- Rrit `SCHEMA_VERSION` në `sources/background.js`.
- Shtoni çelësin e ri + parazgjedhjen te objekti `DEFAULTS` në `initializeOrMigrateSettings()`.
- Përdorni rregullin “only-if-undefined” kur mbillni parazgjedhjet; mos mbishkruani vlerat ekzistuese.
- Nëse cilësimi është i dukshëm për përdoruesin, lidheni në `sources/options.js` dhe shtoni vargje të lokalizuara.
- Shtoni/rregulloni testet (shih `tests/background.settings.migration.test.js`).

Këshilla për testim manual

- Simuloni një instalim të pastër: pastroni direktorinë e të dhënave të zgjerimit ose nisni me një profil të ri.
- Simuloni një përditësim: vendosni `settingsVersion` në `0` në `storage.local` dhe ringarkoni; konfirmoni që vlerat ekzistuese mbeten të pandryshuara dhe shtohen vetëm çelësat që mungojnë.

---

### Zgjidhja e problemeve {#troubleshooting}

- Sigurohuni që Thunderbird të jetë 128 ESR ose më i ri
- Përdorni Error Console për çështjet në kohë ekzekutimi
- Nëse cilësimet e ruajtura duken sikur nuk zbatohen siç duhet, rinisni Thunderbird dhe provoni përsëri. (Thunderbird mund të ruajë gjendje mes sesioneve; një rinisje siguron që cilësimet e reja të ngarkohen.)

---

### CI dhe Mbulesa {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ekzekuton vitest me pragje mbulimi (85% rreshta/funksione/dega/deklarata). Nëse pragjet nuk arrihen, puna dështon.
- Workflow‑i ngarkon një artefakt `coverage-html` me raportin HTML; shkarkojeni nga faqja e ekzekutimit (Actions → ekzekutimi i fundit → Artifacts).

---

### Kontributi {#contributing}

- Shih CONTRIBUTING.md për udhëzimet e degëve/commit/PR
- Këshillë: Krijoni një profil të veçantë zhvillimi Thunderbird për testim për të shmangur ndikimin në profilin tuaj të përditshëm.

---

### Përkthimet

- Ekzekutimi i detyrave të mëdha “të gjitha → të gjitha” përkthimi mund të jetë i ngadaltë dhe i kushtueshëm. Filloni me një nën‑bashkësi (p.sh., disa dokumente dhe 1–2 lokalitete), rishikoni rezultatin, pastaj zgjerojeni.

---

- Politika e riprovës: detyrat e përkthimit bëjnë deri në 3 riprove me backoff eksponencial në gabimet e API‑t; shih `scripts/translate_web_docs_batch.js` dhe `scripts/translate_web_docs_sync.js`.

Pamje ekrani për dokumentacionin

- Ruani imazhet nën `website/static/img/`.
- Referojini ato në MD/MDX përmes `useBaseUrl('/img/<filename>')` që rrugët të funksionojnë me `baseUrl` të faqes.
- Pas shtimit ose riemërtimit të imazheve nën `website/static/img/`, konfirmoni që të gjitha referencat ende përdorin `useBaseUrl('/img/…')` dhe shfaqen në një parapamje lokale.
  Favicons

- `favicon.ico` me shumë madhësi gjenerohet automatikisht në të gjitha rrugët e build‑it (Make + skripta) përmes `website/scripts/build-favicon.mjs`.
- Nuk kërkohet hap manual; mjafton përditësimi i `icon-*.png`.
  Këshillë rishikimi

- Mbajeni `id` të pandryshuar në dokumentet e përkthyera; përktheni vetëm `title` dhe `sidebar_label` kur janë të pranishme.

#### clean {#mt-clean}

- Qëllimi: hiq artefaktet lokale të build/preview.
- Përdorimi: `make clean`
- Heq (nëse janë të pranishme):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Qëllimi: formato, testo, përditëso changelog, bëj commit dhe push.
- Përdorimi: `make commit`
- Detaje: ekzekuton Prettier (shkruaj), `make test`, `make test_i18n`; shton changelog kur ka diffa të stagjuara; bën push te `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Qëllimi: ekzekuto ESLint përmes flat config.
- Përdorimi: `make eslint`

---

#### help {#mt-help}

- Qëllimi: listo të gjithë objektivat me dokumentim me një rresht.
- Përdorimi: `make help`

---

#### lint {#mt-lint}

- Qëllimi: lint për MailExtension duke përdorur `web-ext`.
- Përdorimi: `make lint`
- Shënime: kopjon përkohësisht `sources/manifest_LOCAL.json` → `sources/manifest.json`; injoron ZIP‑et e ndërtuara; paralajmërimet nuk e dështojnë pipeline‑n.

---

#### menu {#mt-menu}

- Qëllimi: menu interaktive për të zgjedhur një objektiv Make dhe argumente opsionale.
- Përdorimi: ekzekutoni `make` pa argumente.
- Shënime: nëse `whiptail` nuk është i disponueshëm, menuja kthehet te `make help`.

---

#### pack {#mt-pack}

- Qëllimi: ndërto ZIP‑et ATN dhe LOCAL (varet nga `lint`).
- Përdorimi: `make pack`
- Këshillë: rrisni versionet në të dy `sources/manifest_*.json` para paketimit.

---

#### prettier {#mt-prettier}

- Qëllimi: formato repo‑n në vend.
- Përdorimi: `make prettier`

#### prettier_check {#mt-prettier_check}

- Qëllimi: verifiko formatimin (pa shkrime).
- Përdorimi: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Qëllimi: alias për `prettier`.
- Përdorimi: `make prettier_write`

---

#### test {#mt-test}

- Qëllimi: ekzekuto Prettier (shkruaj), ESLint, pastaj Vitest (mbulesë nëse është instaluar).
- Përdorimi: `make test`

#### test_i18n {#mt-test_i18n}

- Qëllimi: teste të fokusuara te i18n për vargjet e shtesës dhe dokumentet e faqes.
- Përdorimi: `make test_i18n`
- Ekzekuton: `npm run test:i18n` dhe `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Qëllimi: përkthen vargjet e UI të shtesës nga EN në lokale të tjera.
- Përdorimi: `make translation_app OPTS="--locales all|de,fr"`
- Shënime: ruan strukturën e çelësave dhe vendmbajtësit; regjistron te `translation_app.log`. Forma e skriptit: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Qëllimi: përkthen dokumentet e faqes nga `website/docs/*.md` në `website/i18n/<locale>/...`.
- E preferuar: `translate_web_docs_batch` (OpenAI Batch API)
  - Përdorimi (flamujt): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozicionali i trashëguar ende pranohet: `OPTS="<doc|all> <lang|all>"`
- Sjellja: ndërton JSONL, ngarkon, sondazh çdo 30s, shkarkon rezultatet, shkruan skedarët.
- Shënim: një punë batch mund të zgjasë deri në 24 orë për t’u përfunduar (sipas dritares së batch të OpenAI). Konsola tregon kohën e kaluar në çdo sondazh.
- Mjedisi: `OPENAI_API_KEY` (e detyrueshme), opsionale `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (parazgjedhur 24h), `BATCH_POLL_INTERVAL_MS`.
- Trashëgimore: `translate_web_docs_sync`
  - Përdorimi (flamujt): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozicionali i trashëguar ende pranohet: `OPTS="<doc|all> <lang|all>"`
- Sjellja: kërkesa sinkrone për çdo çift (pa grumbullim batch).
- Shënime: Prompt‑e interaktive kur `OPTS` lihet bosh. Të dy mënyrat ruajnë blloqet e kodit/kodin inline dhe mbajnë `id` të pandryshuar; regjistrojnë te `translation_web_batch.log` (batch) ose `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Qëllimi: përkthen vargjet e UI të faqes (faqja kryesore, navbar, footer) nga `website/i18n/en/code.json` në të gjitha lokalitetet nën `website/i18n/<locale>/code.json` (duke përjashtuar `en`).
- Përdorimi: `make translate_web_index` ose `make translate_web_index OPTS="--locales de,fr [--force]"`
- Kërkesat: eksportoni `OPENAI_API_KEY` (opsionale: `OPENAI_MODEL=gpt-4o-mini`).
- Sjellja: verifikon strukturën e JSON, ruan vendmbajtësit me kllapa përdredhëse, mban URL‑të të pandryshuara dhe riprovon me feedback në gabime validimi.

---

#### web_build {#mt-web_build}

- Qëllimi: ndërton faqen e dokumenteve te `website/build`.
- Përdorimi: `make web_build OPTS="--locales en|de,en|all"` (ose vendosni `BUILD_LOCALES="en de"`)
- Të brendshmet: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Varësi: ekzekuton `npm ci` në `website/` vetëm nëse mungon `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Qëllimi: kontroll lidhjesh i sigurt offline.
- Përdorimi: `make web_build_linkcheck OPTS="--locales en|all"`
- Shënime: ndërton te `tmp_linkcheck_web_pages`; rishkruan `baseUrl` të GH Pages në `/`; anashkalon lidhjet HTTP(S) të largëta.

#### web_build_local_preview {#mt-web_build_local_preview}

- Qëllimi: parapamje lokale gh‑pages me teste/kontroll lidhjesh opsionale.
- Përdorimi: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Sjellja: provon fillimisht serverin e parapamjes së Node (`scripts/preview-server.mjs`, mbështet `/__stop`), kalon te `python3 -m http.server` nëse dështon; shërben në 8080–8090; PID te `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Qëllimi: shtyn `website/build` në degen `gh-pages`.
- Përdorimi: `make web_push_github`

Këshillë: vendosni `NPM=…` për të anashkaluar menaxherin e paketave që përdor Makefile (parazgjedhja është `npm`).

---
