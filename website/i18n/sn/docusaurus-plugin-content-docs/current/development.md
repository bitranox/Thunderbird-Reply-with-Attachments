---
id: development
title: 'Budiriro'
sidebar_label: 'Budiriro'
---

---

## Gwaro reKuvandudza {#development-guide}

:::note Gadzirisa Chirungu chete; shanduro dzinopararira
Gadzirisa magwaro **chete** pasi pe `website/docs` (Chirungu). Shanduro pasi pe `website/i18n/<locale>/…` dzinogadzirwa uye hadzifaniri kugadziriswa nemaoko. Shandisa mabasa edudziro (semuenzaniso, `make translate_web_docs_batch`) kuti uvandudze zvirimo zvemutauro.
:::

### Zvinodikanwa zvekutanga {#prerequisites}

- Node.js 22+ uye npm (yakayedzwa neNode 22)
- Thunderbird 128 ESR kana nyowani (yekuyedza nemaoko)

---

### Kurongeka kweProjekiti (pamusoro‑soro) {#project-layout-high-level}

- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: kodhi huru yeadd‑on (background, options/popup UI, manifests, icons)
- `tests/`: suite yeVitest
- `website/`: magwaro eDocusaurus (ine i18n pasi pe `website/i18n/de/...`)

---

### Kuiswa & Zvishandiso {#install-and-tooling}

- Isa zvinosungirwa zve-root: `npm ci`
- Magwaro (zvisarudzo): `cd website && npm ci`
- Tsvaga ma‑target: `make help`

---

### Dev mhenyu (web‑ext run) {#live-dev-web-ext}

- Kutenderera nekukurumidza muFirefox Desktop (UI smoke‑tests chete):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Mhanyisa muThunderbird (inokurudzirwa kuMailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Mazano:
- Chengeta Thunderbird’s Error Console yakavhurika (Tools → Developer Tools → Error Console).
- Mapeji echiitiko eMV3 anomiswa kana asina kushandiswa; re‑load add‑on mushure mekuchinja kodhi, kana rega web‑ext iite auto‑reload.
- Mimwe maitiro anongoshanda muFirefox anogona kusiyana; gara uchisimbisa muThunderbird kuti API dzakaenzana.
- Nzira dzeThunderbird binary (mimwe mienzaniso):
- Linux: `thunderbird` (semuenzaniso, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Kupatsanura ma‑profile: Shandisa imwe profile yeThunderbird yekuvandudza kudzivirira kukanganisa marongero ako ezuva nezuva.

---

### MaTarget eMake (maererano nealfabheti) {#make-targets-alphabetical}

Makefile inoenzanisa mafambiro akajairika e dev. Mhanya `make help` chero nguva kuti uwane mutsara mumwe pfupiso wega wega target.

Zano: kumhanya `make` usina target kunovhura menyu reWhiptail riri nyore kusarudza target.

| Target                                                   | Tsananguro yemutsara mumwe                                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Bvisa zvisaririra zvekuvaka/kutanga‑previu zvemuno (tmp/, web-local-preview/, website/build/). |
| [`commit`](#mt-commit)                                   | Format, mhanya miedzo (kusanganisira i18n), gadziridza changelog, commit & push.               |
| [`eslint`](#mt-eslint)                                   | Mhanya ESLint kuburikidza neflat config (`npm run -s lint:eslint`).                            |
| [`help`](#mt-help)                                       | Rondedzera ma‑target ese ane tsananguro yemutsara mumwe (akarongeka).                          |
| [`lint`](#mt-lint)                                       | web‑ext lint pa `sources/` (temp manifest; inoregeredza ZIPs; haina kuomarara).                |
| [`menu`](#mt-menu)                                       | Menyu inoshanda yekusarudza target uye sarudzo dzekusarudza.                                   |
| [`pack`](#mt-pack)                                       | Vaka ZIPs dzeATN & LOCAL (ino mhanya linter; inodana packer script).                           |
| [`prettier`](#mt-prettier)                               | Format repository ipapo ipapo (inonyora shanduko).                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier mu check mode (hapana kunyora); inotadza kana reformat ichidikanwa.                   |
| [`prettier_write`](#mt-prettier_write)                   | Zita rimwe re `prettier`.                                                                      |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, wobva waita Vitest (coverage kana yakamisikidzwa).                   |
| [`test_i18n`](#mt-test_i18n)                             | Miedzo yei18n chete: ma‑placeholder/parity eadd‑on + parity yewebhusaiti.                      |
| [`translate_app`](#mt-translation-app)                   | Zita rimwe re `translation_app`.                                                               |
| [`translation_app`](#mt-translation-app)                 | Dudzira tambo dzeapp UI kubva ku `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | Dudzira magwaro ewebhusaiti kuburikidza neOpenAI Batch API (inokurudzirwa).                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Dudzira magwaro ewebhusaiti panguva imwe chete (legacy, isiri‑batch).                          |
| [`translate_web_index`](#mt-translation_web_index)       | Zita rimwe re `translation_web_index`.                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Dudzira UI yehomepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).      |
| [`web_build`](#mt-web_build)                             | Vaka magwaro ku `website/build` (inotsigira `--locales` / `BUILD_LOCALES`).                    |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kuongorora zvinongedzo zvinoshanda offline (inopotsa HTTP[S] yekunze).                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Previu yegh‑pages yemuno; auto‑serve pa8080–8090; miedzo/kuongorora‑zvinongedzo zvisarudzo.    |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` kubazi re `gh-pages`.                                                     |

Syntax yezvisarudzo

- Shandisa `make <command> OPTS="…"` kupfuura zvisarudzo (makotesheni anokurudzirwa). Yega yega target pazasi inoratidza muenzaniso wekushandisa.

--

-

#### Mazano ekuvaka maLocale {#locale-build-tips}

- Vaka chikamu chemalocale: isa `BUILD_LOCALES="en de"` kana kupfuura `OPTS="--locales en,de"` kuma web targets.
- Previu locale chaiyo: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Vaka & Pakeja {#build-and-package}

- Vaka ZIPs: `make pack`
- Inoburitsa ATN neLOCAL ZIPs muroot reRepo (usagadzirise zvisaririra nemaoko)
- Zano: gadziridza version mu `sources/manifest_ATN.json` ne `sources/manifest_LOCAL.json` usati wapa package
- Kuisa nemaoko (dev): Thunderbird → Tools → Add‑ons and Themes → giya → Install Add‑on From File… → sarudza ZIP yakavakwa

---

### Bvunzo {#test}

- Suite yakazara: `make test` (Vitest)
- Kufukidza (zvisarudzo):
- `npm i -D @vitest/coverage-v8`
- Mhanya `make test`; vhura `coverage/index.html` kuti uone mushumo weHTML
- i18n chete: `make test_i18n` (UI keys/placeholders/titles + parity yewebhusaiti per‑locale per‑doc ine id/title/sidebar_label checks)

---

### Kugadzirisa zvikanganiso & Marekodhi {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Chinja‑chinja ma‑log ane ruzivo panguva yekumhanya:
- Batidza: `messenger.storage.local.set({ debug: true })`
- Dzima: `messenger.storage.local.set({ debug: false })`
- Marekodhi anoonekwa panguva yekunyora/kutumira mhinduro

---

### Magwaro (webhusaiti) {#docs-website}

- Dev server: `cd website && npm run start`
- Vaka saiti static: `cd website && npm run build`
- Zvinoenderana neMake (maererano nealfabheti): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Mienzaniso yekushandisa:
- EN chete, siya miedzo/link‑check, hapana push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Malocale ese, nemiedzo/link‑check, wobva wapa push: `make web_build_local_preview && make web_push_github`
- Usati waburitsa, mhanya kuongorora zvinongedzo zvinobatika offline: `make web_build_linkcheck`.
- i18n: Chirungu chiri mu `website/docs/*.md`; shanduro dzeGerman dziri mu `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Kutsvaga: Kana Algolia DocSearch env vars dzakarongwa muCI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), saiti inoshandisa Algolia search; zvikasadaro inodzokera kukutsvaga kwemuno. Pahomepage, dzvanya `/` kana `Ctrl+K` kuvhura bhokisi rekutsvaga.

---

#### Nzira yekutungamidza kune rubatsiro (donate) {#donate-redirect}

- `website/src/pages/donate.js`
- Nzira: `/donate` (uye `/<locale>/donate`)
- Maitiro:
- Kana nzira yazvino iine locale (semuenzaniso, `/de/donate`), ishandise
- Zvikasadaro, sarudza yakanyatsokodzera kubva ku `navigator.languages` zvichienzaniswa nemalocale akamisikidzwa; dzokera ku default locale
- Inotungamidza ku:
- `en` → `/docs/donation`
- dzimwe → `/<locale>/docs/donation`
- Inoshandisa `useBaseUrl` kuti ibate baseUrl nemazvo
- Inosanganisira meta refresh + chinongedzo `noscript` sechitsivi

---

---

#### Mazano ePreviu {#preview-tips}

- Misa previu yeNode zvakanaka: vhura `http://localhost:<port>/__stop` (inodhindwa mushure me `Local server started`).
- Kana mifananidzo ikasavhura muMDX/JSX, shandisa `useBaseUrl('/img/...')` kuremekedza `baseUrl` yesaiti.
- Previu inotanga kutanga; link check inomhanya after uye haina kuvharira (zvinongedzo zvekunze zvakatyoka hazvimisi previu).
- Muenzaniso weURL ye previu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (inodhindwa mushure me “Local server started”).
- Zvinongedzo zvekunze mu link‑check: Dzimwe saiti dzekunze (semuenzaniso, addons.thunderbird.net) dzinovharira macrawler uye dzinogona kuratidza 403 mu link checks. Previu ichiri kutanga; izvi zvakachengeteka kuregeredza.

---

#### Shandura Webhusaiti {#translate-website}

Zvaunogona kududzira

- Website UI chete: homepage, navbar, footer, uye dzimwe tambo dzeUI. Zviri mumagwaro zvinoramba zviri muChirungu parizvino.

Kwaunogadzirisa

- Gadzirisa `website/i18n/<locale>/code.json` (shandisa `en` sechirevo). Chengeta ma‑placeholder akaita se `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` asina kuchinjwa.

Gadzira kana kuvandudza mafaira

- Gadzira stubs dziri kushaikwa dzemalocale ese: `npm --prefix website run i18n:stubs`
- Nyora patsva stubs kubva kuChirungu (mushure mekuwedzera tambo nyowani): `npm --prefix website run i18n:stubs:force`
- Imwe nzira yelocale imwe chete: `npx --prefix website docusaurus write-translations --locale <locale>`

Dudzira tambo dzehomepage/navbar/footer UI (OpenAI)

- Set credentials kamwe (shell kana .env):
- `export OPENAI_API_KEY=sk-...`
- Zvisarudzo: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (malocale ese, siya en): `make translate_web_index`
- Rongedza kune malocale chaiwo: `make translate_web_index OPTS="--locales de,fr"`
- Nyora patsva zviyero zviripo: `make translate_web_index OPTS="--force"`

Kusimbisa & kuyedza zvakare

- Script redudziro rinonyatsoongorora chimiro cheJSON, rinoramba ma‑placeholder ane makuhwa (curly‑brace), uye rinoona kuti maURL haana kuchinjwa.
- Pakutadza kusimbisa, rinodzokorora richipa mhinduro kusvika kakapetwa 2 risati rasara nezviripo.

Previu yerurimi rwako (locale)

- Dev server: `npm --prefix website run start`
- Shanyira `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Kutumira

- Vhura PR iine mafaera `code.json` akagadziriswa. Chengeta shanduko dzakanangana uye sanganisira screenshot nekukurumidza kana zvichiita.

---

### Mazano eKuchengeteka & Kumisikidzwa {#security-and-configuration-tips}

- Usambocommit `sources/manifest.json` (rinogadzirwa kwenguva pfupi nebuild)
- Chengeta `browser_specific_settings.gecko.id` yakatsiga kuchengetedza update channel

---

### Kuchengetwa kwezvirongwa {#settings-persistence}

- Storage: Zvirongwa zvese zvemushandisi zviri mu `storage.local` uye zvinoramba zviripo kunyangwe mushure mekuvandudzwa kweadd‑on.
- Install: Default dzinoshandiswa chete kana kiyi iri kushomeka zvachose (undefined).
- Update: Migration inozadza chete makiyi anoshaikwa; zviyero zviripo hazvimbonyorwazve.
- Mucherechedzo weschema: `settingsVersion` (parizvino `1`).
- Makiyi nedefaults:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kodhi: ona `sources/background.js` → `initializeOrMigrateSettings()` uye `SCHEMA_VERSION`.

Maitiro evagadziri (kuwedzera marongero matsva)

- Simudzira `SCHEMA_VERSION` mu `sources/background.js`.
- Wedzera kiyi itsva + default ku `DEFAULTS` object mu `initializeOrMigrateSettings()`.
- Shandisa mutemo we "only-if-undefined" pakuseedza defaults; usanyore pamusoro pezviripo.
- Kana marongero ari kuoneka kumushandisi, aabatanidze mu `sources/options.js` uye wedzera tambo dzakadudzirwa.
- Wedzera/gadzirisa miedzo (ona `tests/background.settings.migration.test.js`).

Mazano ekuyedza nemaoko

- Tevedzera kuisirwa kutsva: chenesa dhairekitori redata rekuwedzerwa kana kutanga neprofile itsva.
- Tevedzera update: isa `settingsVersion` ku `0` mu `storage.local` wobva wa re‑load; simbisa kuti zviyero zviripo hazvina kuchinjwa uye makiyi anongoshaikwa ndiwo anowedzerwa.

---

### Kugadzirisa Zvinetso {#troubleshooting}

- Ita shuwa kuti Thunderbird iri 128 ESR kana nyowani
- Shandisa Error Console kune nyaya dzinobuda panguva yekumhanya
- Kana zvirongwa zvakachengetwa zvichiratidzika kusashanda nemazvo, tangazve Thunderbird uye edza zvakare. (Thunderbird inogona kuchengetedza mamiriro pakati peSessions; kutangazve kunoona marongero matsva achiitwa.)

---

### CI & Kufukidza {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) inomhanyisa vitest iine mipimo yekufukidza (85% mitsara/mabasa/mapazi/mitongo). Kana mipimo isina kusvika, basa rinotadza.
- Workflow inokanda artifact `coverage-html` ine mushumo weHTML; dhawunirodha kubva papeji rerun (Actions → latest run → Artifacts).

---

### Kubatsira {#contributing}

- Ona CONTRIBUTING.md kuti uwane mirau yebazi/commit/PR
- Zano: Gadzira profile yakaparadzana yeThunderbird yekuvandudza kuti uedze, kudzivirira kukanganisa profile yako yezuva nezuva.

---

### Shanduro

- Kumhanyisa mabasa makuru e “all → all” edudziro kunogona kunonoka uye kudhura. Tanga nechikamu chidiki (semuenzaniso, magwaro mashomanana uye 1–2 malocale), ongorora mhedzisiro, wozowedzera.

---

- Mutemo wekuedza zvakare: mabasa edudziro anoedza kusvika katatu aine exponential backoff kana paine zvikanganiso zveAPI; ona `scripts/translate_web_docs_batch.js` uye `scripts/translate_web_docs_sync.js`.

Screenshots zvemagwaro

- Chengetedza mifananidzo pasi pe `website/static/img/`.
- Ireva muMD/MDX kuburikidza ne `useBaseUrl('/img/<filename>')` kuitira kuti nzira dzienderane ne `baseUrl` yesaiti.
- Mushure mekuwedzera kana kudoma patsva mifananidzo pasi pe `website/static/img/`, simbisa kuti mareferensi ese achiri kushandisa `useBaseUrl('/img/…')` uye anoonekwa mu previu yemuno.
  Favicons

- `favicon.ico` ine masize akawanda inogadzirwa otomatiki munzira dzese dzekuvaka (Make + scripts) kuburikidza ne `website/scripts/build-favicon.mjs`.
- Hapana danho remaoko rinodiwa; kugadzirisa `icon-*.png` kwakakwana.
  Zano rekuongorora

- Chengetedza front‑matter `id` isina kuchinjwa mumagwaro akashandurirwa; dudzirai chete `title` uye `sidebar_label` kana zviripo.

#### clean {#mt-clean}

- Chinangwa: bvisa zvisaririra zvekuvaka/kutanga‑previu zvemuno.
- Kushandisa: `make clean`
- Inobvisa (kana zviripo):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Chinangwa: format, bvunza, gadziridza changelog, commit, uye push.
- Kushandisa: `make commit`
- Zvimwe: inomhanya Prettier (write), `make test`, `make test_i18n`; inowedzera changelog kana paine staged diffs; inopusha ku `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Chinangwa: mhanya ESLint kuburikidza neflat config.
- Kushandisa: `make eslint`

---

#### help {#mt-help}

- Chinangwa: rondedzera ma‑target ese ane tsananguro yemutsara mumwe.
- Kushandisa: `make help`

---

#### lint {#mt-lint}

- Chinangwa: lint MailExtension uchishandisa `web-ext`.
- Kushandisa: `make lint`
- Zvinyorwa: inonyora zvenguva pfupi `sources/manifest_LOCAL.json` → `sources/manifest.json`; inoregeredza ZIPs dzakavakwa; yambiro hadzitungamiriri kukundikana kwepipeline.

---

#### menu {#mt-menu}

- Chinangwa: menyu inoshanda yekusarudza Make target uye sarudzo dzinogona.
- Kushandisa: mhanya `make` usina arguments.
- Zvinyorwa: kana `whiptail` isipo, menyu inodzokera ku `make help`.

---

#### pack {#mt-pack}

- Chinangwa: kuvaka ATN neLOCAL ZIPs (inoenderana ne `lint`).
- Kushandisa: `make pack`
- Zano: simudzira ma version mu `sources/manifest_*.json` usati wapa package.

---

#### prettier {#mt-prettier}

- Chinangwa: format repo ipapo ipapo.
- Kushandisa: `make prettier`

#### prettier_check {#mt-prettier_check}

- Chinangwa: simbisa formatting (hapana kunyora).
- Kushandisa: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Chinangwa: zita rimwe re `prettier`.
- Kushandisa: `make prettier_write`

---

#### test {#mt-test}

- Chinangwa: mhanya Prettier (write), ESLint, wobva waita Vitest (coverage kana yakaiswa).
- Kushandisa: `make test`

#### test_i18n {#mt-test_i18n}

- Chinangwa: miedzo yakatarisana nei18n yetambo dzeadd‑on uye magwaro ewebhusaiti.
- Kushandisa: `make test_i18n`
- Inomhanya: `npm run test:i18n` uye `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Chinangwa: dudzira tambo dzeUI dzeadd‑on kubva kuEN kuenda kune mamwe malocale.
- Kushandisa: `make translation_app OPTS="--locales all|de,fr"`
- Zvinyorwa: inoramba chimiro chekiyi nema‑placeholder; inonyora ku `translation_app.log`. Script fomu: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Chinangwa: dudzira magwaro ewebhusaiti kubva ku `website/docs/*.md` kuenda ku `website/i18n/<locale>/...`.
- Inokurudzirwa: `translate_web_docs_batch` (OpenAI Batch API)
  - Kushandisa (miflag): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional ichiri kugamuchirwa: `OPTS="<doc|all> <lang|all>"`
- Maitiro: inovaka JSONL, inoupload, inotarisa ma30s ega ega, inodhawnirouda mhedzisiro, inonyora mafaera.
- Cherechedza: basa rebatch rinogona kutora kusvika kumaawa 24 kupedza (maererano nehwindo reOpenAI). Console inoratidza nguva yapfuura paoga yega poll.
- Env: `OPENAI_API_KEY` (rinodiwa), zvisarudzo `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Kushandisa (miflag): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional ichiri kugamuchirwa: `OPTS="<doc|all> <lang|all>"`
- Maitiro: zvikumbiro zvinoenderana ne‑pair panguva imwe chete (hapana batch aggregation).
- Zvinyorwa: Mibvunzo inoshanda kana `OPTS` isina kupihwa. Nzira mbiri dzose dzinoramba code blocks/inline code uye dzinochengeta front‑matter `id` isina kuchinjwa; inonyora ku `translation_web_batch.log` (batch) kana `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Chinangwa: dudzira tambo dzeUI dzewebhusaiti (homepage, navbar, footer) kubva ku `website/i18n/en/code.json` kuenda kumalocale ese pasi pe `website/i18n/<locale>/code.json` (kubvisa `en`).
- Kushandisa: `make translate_web_index` kana `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zvinodiwa: export `OPENAI_API_KEY` (zvisarudzo: `OPENAI_MODEL=gpt-4o-mini`).
- Maitiro: inonyatsoongorora chimiro cheJSON, inoramba ma‑placeholder ane makuhwa, inochengeta maURL asina kuchinjwa, uye inodzokorora iine mhinduro kana paine zvikanganiso zvekusimbisa.

---

#### web_build {#mt-web_build}

- Chinangwa: kuvaka saiti yemagwaro ku `website/build`.
- Kushandisa: `make web_build OPTS="--locales en|de,en|all"` (kana isa `BUILD_LOCALES="en de"`)
- Zvemukati: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Zvinotsamira: inomhanya `npm ci` mu `website/` chete kana `website/node_modules/@docusaurus` isipo.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Chinangwa: kuongorora zvinongedzo zvinobatika offline.
- Kushandisa: `make web_build_linkcheck OPTS="--locales en|all"`
- Zvinyorwa: inovaka ku `tmp_linkcheck_web_pages`; inonyorazve GH Pages `baseUrl` ku `/`; inopotsa zvinongedzo zveHTTP(S) zvekunze.

#### web_build_local_preview {#mt-web_build_local_preview}

- Chinangwa: previu yegh‑pages yemuno ine miedzo/link‑check zvisarudzo.
- Kushandisa: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Maitiro: inoyedza Node preview server kutanga (`scripts/preview-server.mjs`, inotsigira `/__stop`), yobva yadonha ku `python3 -m http.server` kana zvikatadza; inoshumira pa8080–8090; PID pa `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Chinangwa: push `website/build` kubazi re `gh-pages`.
- Kushandisa: `make web_push_github`

Zano: isa `NPM=…` kuti uchinje package manager inoshandiswa neMakefile (default `npm`).
