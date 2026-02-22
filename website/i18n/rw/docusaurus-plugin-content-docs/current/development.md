---
id: development
title: 'Iterambere'
sidebar_label: 'Iterambere'
---

---

## Imfashanyigisho y'Iterambere {#development-guide}

:::note Hindura Icyongereza gusa; ubusobanuro bukwirakwira
Hindura inyandiko gusa muri `website/docs` (Icyongereza). Ubusobanuro buri muri `website/i18n/<locale>/…` buremwa ku buryo bwikora kandi ntibukwiriye guhindurwa intoki. Koresha imirimo yo gusemura (urugero, `make translate_web_docs_batch`) ukuze uvugurure ibikubiyemo byahinduwe mu ndimi.
:::

### Ibisabwa by'ibanze {#prerequisites}

- Node.js 22+ na npm (byapimwe na Node 22)
- Thunderbird 128 ESR cyangwa iyisumbuyeho (ku kugerageza intoki)

---

### Imiterere y’umushinga (ku rwego rusumbuye) {#project-layout-high-level}

- Imizi: senari yo gupakira `distribution_zip_packer.sh`, inyandiko, amashusho yafashwe kuri ecran
- `sources/`: kode nyamukuru ya add‑on (munsi y'ibikorwa, amahitamo/popup UI, manifests, icons)
- `tests/`: urutonde rwa Vitest
- `website/`: inyandiko za Docusaurus (hamwe na i18n iri muri `website/i18n/de/...`)

---

### Kwinjiza no Ibikoresho {#install-and-tooling}

- Kwinjiza dependencies ku mizi: `npm ci`
- Inyandiko (optional): `cd website && npm ci`
- Reba targets: `make help`

---

### Iterambere ry’ako kanya (web‑ext run) {#live-dev-web-ext}

- Umuzenguruko wihuse muri Firefox Desktop (UI smoke‑tests gusa):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Kwirukana muri Thunderbird (byiza kuri MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Inama:
- Gumana Error Console ya Thunderbird ifunguye (Tools → Developer Tools → Error Console).
- Amapaji ya MV3 event arahindukira igihe nta bikorwa bihari; ongeraho kongera gutangiza add‑on nyuma y’impinduka muri kode, cyangwa ureke web‑ext yisubiremo.
- Bimwe mu myitwarire igenewe Firefox gusa iratandukana; buri gihe wemeze muri Thunderbird kugira ngo API ihure.
- Inzira za bineri za Thunderbird (ingero):
- Linux: `thunderbird` (urugero, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Gukomatanya porofayi: Koresha porofayi ya Thunderbird itandukanye yo kw'iterambere kugira ngo utangize udashobora kwangiza imikoreshereze ya buri munsi.

---

### Make Targets (mu nyuguti) {#make-targets-alphabetical}

Makefile igena imigendekere isanzwe y’iterambere. Iruka `make help` igihe cyose kugira ngo ubone incamake y’umurongo umwe kuri buri target.

Inama: kwirukana `make` nta target bifungura menu yoroshye ya Whiptail yo guhitamo target.

| Target                                                   | Ibisobanuro by’umurongo umwe                                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Kuraho ibisigarira by’inyubako/irebwa ryo ku murongo (tmp/, web-local-preview/, website/build/). |
| [`commit`](#mt-commit)                                   | Gufomata, gukoresha tests (harimo i18n), kuvugurura changelog, gukora commit no push.            |
| [`eslint`](#mt-eslint)                                   | Gukoresha ESLint binyuze muri flat config (`npm run -s lint:eslint`).                            |
| [`help`](#mt-help)                                       | Gutondeka targets zose n’inyandiko z’umurongo umwe (ziteguye).                                   |
| [`lint`](#mt-lint)                                       | web‑ext lint kuri `sources/` (manifest ya by’agateganyo; yirengagiza ZIPs; ntibangamira).        |
| [`menu`](#mt-menu)                                       | Menu ikorana (interactive) yo guhitamo target n’amasezerano (arguments) y'inyongera.             |
| [`pack`](#mt-pack)                                       | Kubaka ZIPs za ATN & LOCAL (ikoresha linter; ihamagara packer script).                           |
| [`prettier`](#mt-prettier)                               | Gufomata repository aho iri (yandika impinduka).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier muri mode yo kugenzura (nta kwandika); itezwa imbere niba bisaba kongera gufomata.      |
| [`prettier_write`](#mt-prettier_write)                   | Izina risimbura `prettier`.                                                                      |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, hanyuma Vitest (coverage niba yateguwe).                               |
| [`test_i18n`](#mt-test_i18n)                             | Tests za i18n gusa: placeholders/parity za add‑on + parity y’urubuga.                            |
| [`translate_app`](#mt-translation-app)                   | Izina risimbura `translation_app`.                                                               |
| [`translation_app`](#mt-translation-app)                 | Guhindura imiterere ya UI ya porogaramu bivuye muri `sources/_locales/en/messages.json`.         |
| [`translate_web_docs_batch`](#mt-translation-web)        | Guhindura inyandiko z’urubuga ukoresheje OpenAI Batch API (byifuzwa).                            |
| [`translate_web_docs_sync`](#mt-translation-web)         | Guhindura inyandiko z’urubuga mu buryo buhuza ako kanya (legacy, non-batch).                     |
| [`translate_web_index`](#mt-translation_web_index)       | Izina risimbura `translation_web_index`.                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Guhindura UI ya homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).     |
| [`web_build`](#mt-web_build)                             | Kubaka inyandiko muri `website/build` (ishyigikira `--locales` / `BUILD_LOCALES`).               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kugenzura amalink ku murongo atiriho Internet (asimbuka HTTP[S] yo hanze).                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Igaragaza rya gh‑pages ryo mu rwego rw’aho; yikoresha kuri 8080–8090; optional tests/link‑check. |
| [`web_push_github`](#mt-web_push_github)                 | Gukoresha push ya `website/build` kuri ishami `gh-pages`.                                        |

Imikoreshereze y'amahitamo

- Koresha `make <command> OPTS="…"` mu gutambutsa amahitamo (gukoresha quotes birasabwa). Buri target hepfo igaragaza urugero rwo kuyikoresha.

--

-

#### Inama zo kubaka ku ndimi {#locale-build-tips}

- Kubaka agace k’indimi: shyiraho `BUILD_LOCALES="en de"` cyangwa utange `OPTS="--locales en,de"` kuri web targets.
- Kureba indimi runaka: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Kubaka & Gupakira {#build-and-package}

- Kubaka ZIPs: `make pack`
- Ibisohoka ni ZIPs za ATN na LOCAL ku mizi ya repo (ntukahindure ibisohoka n’intoki)
- Inama: vugurura verisiyo muri byombi `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json` mbere yo gupakira
- Kwinjiza intoki (iterambere): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → hitamo ZIP wubakiwe

---

### Igerageza {#test}

- Urutonde rwose: `make test` (Vitest)
- Coverage (optional):
- `npm i -D @vitest/coverage-v8`
- Koresha `make test`; fungura `coverage/index.html` kugirango ubone raporo ya HTML
- i18n gusa: `make test_i18n` (imfunguzo za UI/placeholders/titles + parity ya website kuri buri rurimi no kuri buri nyandiko n’igenzura rya id/title/sidebar_label)

---

### Gukurikirana & Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Hindura logs zisesenguye mu gihe ikoreshwa:
- Gukoresha: `messenger.storage.local.set({ debug: true })`
- Guhagarika: `messenger.storage.local.set({ debug: false })`
- Logs zigaragara mu gihe wandika/wohereza ibisubizo

---

### Inyandiko (urubuga) {#docs-website}

- Seriveri y’iterambere: `cd website && npm run start`
- Kubaka urubuga ruhamye: `cd website && npm run build`
- Make zingana (mu nyuguti): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ingero z’imikoreshereze:
- EN gusa, skippa tests/link‑check, nta push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Indimi zose, hamwe na tests/link‑check, hanyuma push: `make web_build_local_preview && make web_push_github`
- Mbere yo gusohora, kora igenzura rya links ritagendera kuri internet: `make web_build_linkcheck`.
- i18n: Icyongereza kiri muri `website/docs/*.md`; ubusobanuro mu kidage buri muri `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Gushaka: Niba ibidukikije bya Algolia DocSearch byashyizwe muri CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), urubuga rukoresha Algolia search; ubundi rugaruka kuri local search. Ku rupapuro rw’itangiriro, kanda `/` cyangwa `Ctrl+K` kugira ngo ufungure akazu ko gushakisha.

---

#### Inzira yo gusubirayo yo gutanga inkunga {#donate-redirect}

- `website/src/pages/donate.js`
- Inzira: `/donate` (na `/<locale>/donate`)
- Imikorere:
- Niba inzira iriho ifite ururimi (urugero, `/de/donate`), rukoreshwe
- Ubundi, hitamo ihura ryiza hagati ya `navigator.languages` n’indimi zateguwe; niba bidashobotse, ukoreshe ururimi rwa default
- Igaragaza kuri:
- `en` → `/docs/donation`
- izindi → `/<locale>/docs/donation`
- Ikoresha `useBaseUrl` kugira ngo igenzure neza baseUrl
- Irimo meta refresh + isano ya `noscript` nk’inyongera y’inyuma

---

---

#### Inama z’Igaragaza rya mbere {#preview-tips}

- Hagarika neza Node preview: fungura `http://localhost:<port>/__stop` (icapa nyuma ya `Local server started`).
- Niba amashusho adakorwa muri MDX/JSX, koresha `useBaseUrl('/img/...')` kugira ngo wubahirize `baseUrl` y’urubuga.
- Igaragaza ritangira mbere; igenzura ry’amalink rikurikira kandi ntiribuza (amalink yo hanze yavunitse ntazabuza preview).
- Urugero rwa URL y’igaragaza: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (icapa nyuma ya “Local server started”).
- Amalink yo hanze muri link‑check: Bimwe mu mbuga zo hanze (urugero, addons.thunderbird.net) zibuza abashakisha batomatiki kandi zishobora kugaragaza 403 mu igenzura ry’amalink. Preview iracyatangira; ibi biroroshye kwirengagizwa.

---

#### Hindura Urubuga {#translate-website}

Ibyo ushobora guhindura

- UI y’urubuga gusa: homepage, navbar, footer, n’andi mazina ya UI. Ibirimo by’inyandiko biguma mu Cyongereza ubu.

Aho uhindurira

- Hindura `website/i18n/<locale>/code.json` (koresha `en` nk’icyitegererezo). Gumana placeholders nka `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` bidahinduwe.

Kora cyangwa uvugurure dosiye

- Hindura cyangwa ukore stubs zibura z’indimi zose: `npm --prefix website run i18n:stubs`
- Gusimbuza stubs uhereye ku Cyongereza (nyuma yo kongeramo imirongo mishya): `npm --prefix website run i18n:stubs:force`
- Uburyo bw’inyongera kuri ururimi rumwe: `npx --prefix website docusaurus write-translations --locale <locale>`

Hindura imirongo ya UI ya homepage/navbar/footer (OpenAI)

- Shyiraho ibyangombwa inshuro imwe (shell cyangwa .env):
- `export OPENAI_API_KEY=sk-...`
- Ku bushake: `export OPENAI_MODEL=gpt-4o-mini`
- Rimwe gusa (indimi zose, usibye en): `make translate_web_index`
- Gabanya ku ndimi runaka: `make translate_web_index OPTS="--locales de,fr"`
- Simbuza agaciro gasanzweho: `make translate_web_index OPTS="--force"`

Kugenzura no gusubiramo

- Script yo gusemura igenzura imiterere ya JSON, ikarinda placeholders z’udusode (curly braces), kandi igakomeza ko URLs zidahinduka.
- Iyo kugenzura binaniranye, isubiramo ifite ibitekerezo inshuro zigeze kuri 2 mbere yo kugumana agaciro gasanzweho.

Reba ururimi rwawe

- Seriveri y’iterambere: `npm --prefix website run start`
- Sura `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Gutanga

- Fungura PR ifite dosiye(zi) za `code.json` wahinduye. Gumana impinduka zifashe neza kandi wongereho screenshot yihuse igihe bishoboka.

---

### Inama z'Umutekano n’Igenamiterere {#security-and-configuration-tips}

- Ntukore commit kuri `sources/manifest.json` (ikorwa by’akanya gato n’igihe cyo kubaka)
- Gumana `browser_specific_settings.gecko.id` idahinduka kugira ngo urinde update channel

---

### Kuramba kw’Igenamiterere {#settings-persistence}

- Ububiko: Amagenamiterere yose y’umukoresha abarizwa muri `storage.local` kandi arakomera no mu gihe habayeho updates za add‑on.
- Kwinjiza: Ibisanzwe (defaults) bikoreshwa gusa iyo urufunguzo rubuze by’ukuri (undefined).
- Kuvugurura: Migration yuzuzamo gusa imfunguzo zibuze; agaciro kariho ntikigera gasimbuzwa.
- Ikimenyetso cya schema: `settingsVersion` (ubu `1`).
- Utubari (keys) n’ibisanzwe:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: reba `sources/background.js` → `initializeOrMigrateSettings()` na `SCHEMA_VERSION`.

Imikorere y’iterambere (kongeramo isetting nshya)

- Zamuza `SCHEMA_VERSION` muri `sources/background.js`.
- Ongeraho urufunguzo rushya + default mu kintu `DEFAULTS` muri `initializeOrMigrateSettings()`.
- Koresha itegeko "only-if-undefined" mu gusakaza defaults; ntusimbuze agaciro kariho.
- Niba isetting igaragara ku mukoresha, yihuza muri `sources/options.js` kandi wongereho imirongo yahinduwe mu ndimi.
- Ongeramo/hindura tests (reba `tests/background.settings.migration.test.js`).

Inama zo kugerageza intoki

- Gerekanya kwinjiza gishya: saba directory y’amakuru ya extension cyangwa tangira na porofayi nshya.
- Gerekanya update: shyira `settingsVersion` kuri `0` muri `storage.local` hanyuma wongere u‑load; wemeze ko agaciro kariho kadasimbuwe kandi gusa imfunguzo zaburaga zongerwaho.

---

### Gukemura Ibibazo {#troubleshooting}

- Menya neza ko Thunderbird ari 128 ESR cyangwa hejuru
- Koresha Error Console mu bibazo byo mu gihe cyo gukora
- Niba amagenamiterere abitswe asa n’adafite imikorere nyayo, tangira bundi bushya Thunderbird kandi wongere ugerageze. (Thunderbird ishobora kubika imiterere hagati y’ibihe; kuyitangiza bundi bushya bituma isoma amagenamiterere mashya.)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ikoresha vitest n’imipaka ya coverage (85% lines/functions/branches/statements). Niba imipaka itagezweho, akazi karananirwa.
- Workflow ishyiraho artifact `coverage-html` ifite raporo ya HTML; iyikure kuri page y’irushanwa (Actions → latest run → Artifacts).

---

### Gutanga Umusanzu {#contributing}

- Reba CONTRIBUTING.md kugira ngo umenye amabwiriza ya branch/commit/PR
- Inama: Kora porofayi y’iterambere ya Thunderbird itandukanye yo kugerageza kugira ngo udahungabanya porofayi ya buri munsi.

---

### Ubusobanuro bw’indimi

- Gukoresha imirimo minini “all → all” yo gusemura bishobora gutinda kandi bikaba bihenze. Tangirira ku gice gito (nko ku nyandiko nke n’indimi 1–2), usuzume umusaruro, hanyuma wagure.

---

- Politiki yo gusubiramo: imirimo yo gusemura ikora gusubiramo kugeza ku nshuro 3 hakoreshejwe exponential backoff ku makosa ya API; reba `scripts/translate_web_docs_batch.js` na `scripts/translate_web_docs_sync.js`.

Amashusho yafashwe kuri ecran ku nyandiko

- Bika amashusho munsi ya `website/static/img/`.
- Ayavuge muri MD/MDX binyuze muri `useBaseUrl('/img/<filename>')` kugira ngo inzira zikorane n’iyo urubuga `baseUrl`.
- Nyuma yo kongeramo cyangwa guha andi mazina amashusho munsi ya `website/static/img/`, emeza ko inzira zose zikoresha `useBaseUrl('/img/…')` kandi zigaragara mu igaragariza ryo mu rwego rw’aho.
  Favicons

- `favicon.ico` ifite ingano nyinshi ikorwa ku buryo bwikora mu nzira zose zo kubaka (Make + scripts) binyuze kuri `website/scripts/build-favicon.mjs`.
- Nta ntambwe y’intoki ikenewe; kuvugurura `icon-*.png` birahagije.
  Inama yo gusuzuma

- Gumana front‑matter `id` idahinduwe mu nyandiko zahinduwe; hindura gusa `title` na `sidebar_label` iyo bihari.

#### clean {#mt-clean}

- Intego: gukuraho ibisigarira by’inyubako/irebwa ryo ku murongo.
- Uko ikoreshwa: `make clean`
- Ikuraho (niba bihari):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Intego: gufomata, kugerageza, kuvugurura changelog, gukora commit, no gukora push.
- Uko ikoreshwa: `make commit`
- Ibisobanuro: ikoresha Prettier (write), `make test`, `make test_i18n`; yongereraho changelog iyo hari impinduka zashyizwe ku ruhande; ikora push kuri `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Intego: gukoresha ESLint binyuze muri flat config.
- Uko ikoreshwa: `make eslint`

---

#### help {#mt-help}

- Intego: gutondeka targets zose n’inyandiko z’umurongo umwe.
- Uko ikoreshwa: `make help`

---

#### lint {#mt-lint}

- Intego: kugenzura MailExtension ukoresheje `web-ext`.
- Uko ikoreshwa: `make lint`
- Ibisobanuro: gukoporora by’akanya gato `sources/manifest_LOCAL.json` → `sources/manifest.json`; yirengagiza ZIPs zubatswe; warnings ntizitera pipeline guhagarara.

---

#### menu {#mt-menu}

- Intego: menu ikorana yo guhitamo Make target n’amasezerano (arguments) y’inyongera.
- Uko ikoreshwa: komeza `make` nta masezerano.
- Ibisobanuro: niba `whiptail` itaboneka, menu igaruka kuri `make help`.

---

#### pack {#mt-pack}

- Intego: kubaka ZIPs za ATN na LOCAL (bishingiye kuri `lint`).
- Uko ikoreshwa: `make pack`
- Inama: zamuza verisiyo muri byombi `sources/manifest_*.json` mbere yo gupakira.

---

#### prettier {#mt-prettier}

- Intego: gufomata repo aho iri.
- Uko ikoreshwa: `make prettier`

#### prettier_check {#mt-prettier_check}

- Intego: kugenzura ifomatike (nta kwandika).
- Uko ikoreshwa: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Intego: izina risimbura `prettier`.
- Uko ikoreshwa: `make prettier_write`

---

#### test {#mt-test}

- Intego: gukoresha Prettier (write), ESLint, hanyuma Vitest (coverage niba yashyizweho).
- Uko ikoreshwa: `make test`

#### test_i18n {#mt-test_i18n}

- Intego: tests z’ijyanye na i18n ku mirongo ya add‑on n’inyandiko z’urubuga.
- Uko ikoreshwa: `make test_i18n`
- Ikora: `npm run test:i18n` na `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Intego: guhindura imirongo ya UI ya add‑on uvuye muri EN ujya mu zindi ndimi.
- Uko ikoreshwa: `make translation_app OPTS="--locales all|de,fr"`
- Ibisobanuro: ibika imiterere y’imfunguzo na placeholders; ishyira logs muri `translation_app.log`. Uburyo bwa script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Intego: guhindura inyandiko z’urubuga uvuye muri `website/docs/*.md` ujya muri `website/i18n/<locale>/...`.
- Byifuzwa: `translate_web_docs_batch` (OpenAI Batch API)
  - Uko ikoreshwa (amabendera): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Uburyo bwa kera (positional) buracyakirwa: `OPTS="<doc|all> <lang|all>"`
- Imikorere: yubaka JSONL, ikohereza, igenzura buri minota 30, ikuramo ibisubizo, ikandika dosiye.
- Icyitonderwa: akazi ka batch gashobora gufata kugeza ku masaha 24 kurangira (ukurikije idirishya rya batch rya OpenAI). Console igaragaza igihe cyatambutse kuri buri igenzura.
- Ibidukikije: `OPENAI_API_KEY` (bya ngombwa), ku bushake `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default amasaha 24), `BATCH_POLL_INTERVAL_MS`.
- Uburyo bwa kera: `translate_web_docs_sync`
  - Uko ikoreshwa (amabendera): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Uburyo bwa kera (positional) buracyakirwa: `OPTS="<doc|all> <lang|all>"`
- Imikorere: ibisabwa byoherezwa ukoresheje uburyo buhuza ako kanya kuri buri mpanga (nta batch aggregation).
- Ibisobanuro: Ibazwa ry’inyunganizi iyo `OPTS` itanzwe. Uburyo bwombi burinda code blocks/inline code kandi bugumana front‑matter `id` idahinduwe; logs zijya muri `translation_web_batch.log` (batch) cyangwa `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Intego: guhindura imirongo ya UI y’urubuga (homepage, navbar, footer) uvuye muri `website/i18n/en/code.json` ujya mu ndimi zose muri `website/i18n/<locale>/code.json` (usibye `en`).
- Uko ikoreshwa: `make translate_web_index` cyangwa `make translate_web_index OPTS="--locales de,fr [--force]"`
- Ibisabwa: export `OPENAI_API_KEY` (ku bushake: `OPENAI_MODEL=gpt-4o-mini`).
- Imikorere: igenzura imiterere ya JSON, irinda placeholders z’udusode, igakomeza URLs zidahindutse, kandi igasubiramo ifite ibitekerezo iyo habonetse amakosa yo kugenzura.

---

#### web_build {#mt-web_build}

- Intego: kubaka urubuga rw’inyandiko muri `website/build`.
- Uko ikoreshwa: `make web_build OPTS="--locales en|de,en|all"` (cyangwa shyiraho `BUILD_LOCALES="en de"`)
- Imikorere yo imbere: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Ibyo ishingiyeho: ikoresha `npm ci` muri `website/` gusa iyo `website/node_modules/@docusaurus` ibuze.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Intego: igenzura ryo ku mirongo ridakenera internet.
- Uko ikoreshwa: `make web_build_linkcheck OPTS="--locales en|all"`
- Ibisobanuro: yubakira muri `tmp_linkcheck_web_pages`; yandika GH Pages `baseUrl` muri `/`; isimbuka ama link yo hanze ya HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- Intego: igaragariza ryo mu rwego rw’aho rya gh‑pages rifite optional tests/link‑check.
- Uko ikoreshwa: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Imikorere: ibanza kugerageza Node preview server (`scripts/preview-server.mjs`, ishyigikira `/__stop`), igasubira kuri `python3 -m http.server` niba bidakunze; itanga kuri 8080–8090; PID iri kuri `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Intego: gushyira `website/build` kuri ishami `gh-pages`.
- Uko ikoreshwa: `make web_push_github`

Inama: shyiraho `NPM=…` kugira ngo usimbuze package manager ikoreshwa na Makefile (default ni `npm`).

---
