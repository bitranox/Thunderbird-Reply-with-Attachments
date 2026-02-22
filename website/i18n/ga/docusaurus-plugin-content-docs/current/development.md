---
id: development
title: 'Forbairt'
sidebar_label: 'Forbairt'
---

---

## Treoir Forbartha {#development-guide}

:::note Cuir an Béarla amháin in eagar; scaiptear na haistriúcháin
Nuashonraigh an doiciméadú amháin faoi `website/docs` (Béarla). Gintear na haistriúcháin faoi `website/i18n/<locale>/…` agus níor chóir iad a chur in eagar de láimh. Úsáid na tascanna aistriúcháin (m.sh., `make translate_web_docs_batch`) chun ábhar logánaithe a athnuachan.
:::

### Réamhriachtanais {#prerequisites}

- Node.js 22+ agus npm (tástáilte le Node 22)
- Thunderbird 128 ESR nó níos nuaí (le haghaidh tástála láimhe)

---

### Leagan amach an tionscadail (ardleibhéal) {#project-layout-high-level}

- Fréamh: script phacáistithe `distribution_zip_packer.sh`, doiciméadú, gabhálacha scáileáin
- `sources/`: príomhchód an bhreiseáin (cúlra, UI roghanna/poip‑suas, comhaid manifest, deilbhíní)
- `tests/`: sraith Vitest
- `website/`: doiciméid Docusaurus (le i18n faoi `website/i18n/de/...`)

---

### Suiteáil & Uirlisí {#install-and-tooling}

- Suiteáil spleáchais fréimhe: `npm ci`
- Doiciméid (roghnach): `cd website && npm ci`
- Aimsigh spriocanna: `make help`

---

### Forbairt Bheo (web‑ext run) {#live-dev-web-ext}

- Lúb thapa i Firefox Desktop (smóictheist UI amháin):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Rith i Thunderbird (is fearr le haghaidh MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Leideanna:
- Coinnigh Consól Earráide Thunderbird oscailte (Uirlisí → Uirlisí Forbróra → Consól Earráide).
- Cuirtear leathanaigh imeachta MV3 ar fionraí nuair atá siad díomhaoin; athluchtaigh an breiseán tar éis athruithe cód, nó lig do web‑ext athluchtaigh go huathoibríoch.
- D’fhéadfadh iompraíochtaí atá sainiúil do Firefox a bheith éagsúil; fíoraigh i gcónaí i Thunderbird le comhparáid API a chinntiú.
- Conairí inrite Thunderbird (samplaí):
- Linux: `thunderbird` (m.sh., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Leithlisiú próifíle: Úsáid próifíl Thunderbird ar leith don fhorbairt chun do shocrú laethúil a sheachaint a bheith buailte.

---

### Spriocanna Make (Aibítreach) {#make-targets-alphabetical}

Comhchaighdeánaíonn an Makefile sreafaí forbartha coitianta. Rith `make help` am ar bith le hachoimre aonlíne ar gach sprioc.

Leid: má rithtear `make` gan sprioc, osclaítear roghchlár simplí Whiptail chun sprioc a roghnú.

| Sprioc                                                   | Cur síos aonlíne                                                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Bain déantáin tógála/réamhamhairc logánta (tmp/, web-local-preview/, website/build/).                               |
| [`commit`](#mt-commit)                                   | Formáidigh, rith tástálacha (lena n‑áirítear i18n), nuashonraigh an changelog, déan tiomantas & brúigh.             |
| [`eslint`](#mt-eslint)                                   | Rith ESLint trí chumraíocht chomhréidh (`npm run -s lint:eslint`).                                                  |
| [`help`](#mt-help)                                       | Liostaigh gach sprioc le doiciméadú aonlíne (sórtáilte).                                                            |
| [`lint`](#mt-lint)                                       | web‑ext lint ar `sources/` (manifest sealadach; neamhaird ar ZIPanna; neamh‑mharfach).                              |
| [`menu`](#mt-menu)                                       | Roghchlár idirghníomhach chun sprioc agus argóintí roghnacha a roghnú.                                              |
| [`pack`](#mt-pack)                                       | Tóg ZIPanna ATN & LOCAL (rithíonn linter; glaonn ar script pacála).                                                 |
| [`prettier`](#mt-prettier)                               | Formáidigh an stór sa láthair (scríobhann athruithe).                                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier i mód seiceála (gan scríobh); teipeann má tá athfhoirmiú riachtanach.                                      |
| [`prettier_write`](#mt-prettier_write)                   | Ailias ar `prettier`.                                                                                               |
| [`test`](#mt-test)                                       | Prettier (scríobh), ESLint, ansin Vitest (clúdach má tá cumraithe).                                                 |
| [`test_i18n`](#mt-test_i18n)                             | Tástálacha i18n amháin: ionadchoinní an bhreiseáin + comhréireacht an tsuímh ghréasáin.                             |
| [`translate_app`](#mt-translation-app)                   | Ailias ar `translation_app`.                                                                                        |
| [`translation_app`](#mt-translation-app)                 | Aistrigh teaghráin UI an aipe ó `sources/_locales/en/messages.json`.                                                |
| [`translate_web_docs_batch`](#mt-translation-web)        | Aistrigh doiciméid an tsuímh ghréasáin trí OpenAI Batch API (molta).                                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | Aistrigh doiciméid an tsuímh ghréasáin go sioncrónach (oidhreachta, neamh‑bhaisc).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | Ailias ar `translation_web_index`.                                                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | Aistrigh UI an leathanaigh baile/bharra nascleanúna/bhuntáisc (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Tóg doiciméid go `website/build` (tacaíonn le `--locales` / `BUILD_LOCALES`).                                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Seiceáil nasc as líne‑shábháilte (scipeálann HTTP[S] cianda).                                                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Réamhamharc áitiúil gh‑pages; freastalaíonn go huathoibríoch ar 8080–8090; tástálacha/seiceáil nasc roghnach.       |
| [`web_push_github`](#mt-web_push_github)                 | Brúigh `website/build` chuig an mbrainse `gh-pages`.                                                                |

Syntax le haghaidh roghanna

- Úsáid `make <command> OPTS="…"` chun roghanna a thabhairt (mholtar comharthaí athfhriotail). Taispeánann gach sprioc thíos sampla úsáide.

--

-

#### Leideanna tógála logchaighdeáin {#locale-build-tips}

- Tóg fo‑thacar logchaighdeán: socraigh `BUILD_LOCALES="en de"` nó tabhair `OPTS="--locales en,de"` do spriocanna gréasáin.
- Réamhamharc ar logchaighdeán sonrach: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Tógáil & Pacáistiú {#build-and-package}

- Tóg ZIPanna: `make pack`
- Cruthaíonn ZIPanna ATN agus LOCAL i bhfréamh an stórtha (ná cuir in eagar déantáin de láimh)
- Leid: nuashonraigh an leagan i `sources/manifest_ATN.json` agus `sources/manifest_LOCAL.json` araon roimh phacáistiú
- Suiteáil láimhe (forb.): Thunderbird → Uirlisí → Breiseáin agus Téamaí → giar → Suiteáil Breiseán Ó Chomhad… → roghnaigh an ZIP tógtha

---

### Tástáil {#test}

- Sraith iomlán: `make test` (Vitest)
- Clúdach (roghnach):
- `npm i -D @vitest/coverage-v8`
- Rith `make test`; oscail `coverage/index.html` don tuarascáil HTML
- i18n amháin: `make test_i18n` (eochracha/ionadchoinní/teidil UI + comhionannas in aghaidh an logchaighdeáin in aghaidh an doiciméid ar an suíomh le seiceálacha id/title/sidebar_label)

---

### Dífhabhtú & Logaí {#debugging-and-logs}

- Consól Earráide: Uirlisí → Uirlisí Forbróra → Consól Earráide
- Scoránaigh logaí fairsinge ag am rite:
- Cumasaigh: `messenger.storage.local.set({ debug: true })`
- Díchumasaigh: `messenger.storage.local.set({ debug: false })`
- Taispeántar logaí agus tú ag cumadh/ag seoladh freagraí

---

### Doiciméid (suíomh gréasáin) {#docs-website}

- Freastalaí forbartha: `cd website && npm run start`
- Tóg suíomh statach: `cd website && npm run build`
- Comhionanna Make (de réir aibítre): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Samplaí úsáide:
- EN amháin, scipeáil tástálacha/seiceáil nasc, gan brú: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Gach logchaighdeán, le tástálacha/seiceáil nasc, ansin brú: `make web_build_local_preview && make web_push_github`
- Sula bhfoilseofar, rith an seiceáil nasc as líne‑shábháilte: `make web_build_linkcheck`.
- i18n: Tá an Béarla i `website/docs/*.md`; aistriúcháin Ghearmáinise i `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Cuardach: Má tá athróga timpeallachta Algolia DocSearch socraithe sa CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), úsáideann an suíomh cuardach Algolia; murach sin titeann sé ar ais go cuardach logánta. Ar an leathanach baile, brúigh `/` nó `Ctrl+K` chun an bosca cuardaigh a oscailt.

---

#### Bealach atreoraithe deonaigh {#donate-redirect}

- `website/src/pages/donate.js`
- Bealach: `/donate` (agus `/<locale>/donate`)
- Iompar:
- Má tá logchaighdeán ag an mbealach reatha (m.sh., `/de/donate`), bain úsáid as
- Seachas sin, roghnaigh an meaitseáil is fearr ó `navigator.languages` i gcoinne na logchaighdeán cumraithe; titeann ar ais go logchaighdeán réamhshocraithe
- Atreoraíonn chuig:
- `en` → `/docs/donation`
- eile → `/<locale>/docs/donation`
- Úsáideann `useBaseUrl` chun baseUrl a láimhseáil i gceart
- Cuimsíonn sé athnuachan meta + nasc `noscript` mar thitim siar

---

---

#### Leideanna Réamhamhairc {#preview-tips}

- Stop réamhamharc Node go glan: oscail `http://localhost:<port>/__stop` (printáilte i ndiaidh `Local server started`).
- Mura lódáiltear íomhánna i MDX/JSX, úsáid `useBaseUrl('/img/...')` chun `baseUrl` an tsuímh a urramú.
- Tosaíonn an réamhamharc ar dtús; rithtear an seiceáil nasc ina dhiaidh sin agus níl sé blocáilte (ní stopfaidh naisc sheachtracha briste an réamhamharc).
- URL réamhamhairc samplach: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (printáilte tar éis “Local server started”).
- Naisc sheachtracha sa seiceáil nasc: Cuireann roinnt suíomhanna seachtracha (m.sh., addons.thunderbird.net) bac ar chraoltóirí uathoibríocha agus féadfaidh siad 403 a thaispeáint i seiceálacha nasc. Tosaíonn an réamhamharc fós; is sábháilte neamhaird a dhéanamh díobh seo.

---

#### Aistrigh an Suíomh Gréasáin {#translate-website}

Cad is féidir leat a aistriú

- UI an tsuímh amháin: leathanach baile, barra nascleanúna, buntásc, agus teaghráin UI eile. Fanann inneachar na ndoiciméad i mBéarla faoi láthair.

Cá háit le cur in eagar

- Cuir `website/i18n/<locale>/code.json` in eagar (úsáid `en` mar thagairt). Coinnigh ionadchoinní mar `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` gan athrú.

Gineann nó nuashonraigh comhaid

- Cruthaigh stubaí ar iarraidh do gach logchaighdeán: `npm --prefix website run i18n:stubs`
- Forscríobh stubaí ón mBéarla (tar éis teaghráin nua a chur leis): `npm --prefix website run i18n:stubs:force`
- Rogha eile do logchaighdeán aonair: `npx --prefix website docusaurus write-translations --locale <locale>`

Aistrigh teaghráin UI an leathanaigh baile/bharra nascleanúna/bhuntáisc (OpenAI)

- Socraigh dintiúir uair amháin (blaosc nó .env):
- `export OPENAI_API_KEY=sk-...`
- Roghnach: `export OPENAI_MODEL=gpt-4o-mini`
- Aon‑seoladh (gach logchaighdeán, scipeáil en): `make translate_web_index`
- Teorannaigh do logchaighdeáin shonracha: `make translate_web_index OPTS="--locales de,fr"`
- Forscríobh luachanna atá ann cheana: `make translate_web_index OPTS="--force"`

Bailíochtú agus athiarrachtaí

- Déanann an script aistriúcháin bailíochtú ar chruth JSON, caomhnaíonn sé ionadchoinní lúibíní cuarlacha, agus cinntíonn sé nach ndéantar URLanna a athrú.
- Ar theip bailíochtaithe, déanann sé iarracht arís le haiseolas suas le 2 uair sula gcoimeádann sé luachanna atá ann.

Réamhamharc ar do logchaighdeán

- Freastalaí forbartha: `npm --prefix website run start`
- Tabhair cuairt ar `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

A chur isteach

- Oscail PR leis na comhaid `code.json` curtha in eagar. Coinnigh athruithe dírithe agus cuir seat scáileáin gasta san áireamh nuair is féidir.

---

### Leideanna Slándála & Cumraíochta {#security-and-configuration-tips}

- Ná déan `sources/manifest.json` a thiomantas (cruthaithe go sealadach ag an dtógáil)
- Coinnigh `browser_specific_settings.gecko.id` cobhsaí chun an cainéal nuashonraithe a chaomhnú

---

### Seasmhacht Socruithe {#settings-persistence}

- Stóráil: Tá gach socrú úsáideora i `storage.local` agus maireann siad trasna nuashonruithe an bhreiseáin.
- Suiteáil: Ní chuirtear réamhshocruithe i bhfeidhm ach nuair a bhíonn eochair in easnamh go docht (neamhshainithe).
- Nuashonrú: Líonann imirce eochracha atá ar iarraidh amháin; ní fhorscríobhtar luachanna atá ann riamh.
- Marcóir scéime: `settingsVersion` (faoi láthair `1`).
- Eochracha agus réamhshocruithe:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Cód: féach `sources/background.js` → `initializeOrMigrateSettings()` agus `SCHEMA_VERSION`.

Sreabhadh oibre forbartha (socruithe nua a chur leis)

- Méadaigh `SCHEMA_VERSION` in `sources/background.js`.
- Cuir an eochair nua + réamhshocrú leis an réad `DEFAULTS` in `initializeOrMigrateSettings()`.
- Úsáid an riail “only-if-undefined” agus réamhshocruithe á síolú; ná forscríobh luachanna atá ann.
- Má tá an socrú le feiceáil ag an úsáideoir, nasc é i `sources/options.js` agus cuir teaghráin logánaithe leis.
- Cuir tástálacha leis/coigeartaigh (féach `tests/background.settings.migration.test.js`).

Leideanna tástála de láimh

- Insamhail suiteáil úr: glan eolaire sonraí an leathnaithe nó tosaigh le próifíl nua.
- Insamhail nuashonrú: socraigh `settingsVersion` go `0` in `storage.local` agus athluchtaigh; deimhnigh go bhfanann luachanna atá ann gan athrú agus nach gcuirtear ach eochracha atá ar iarraidh leis.

---

### Fabhtcheartú {#troubleshooting}

- Déan cinnte gur 128 ESR nó níos nuaí é Thunderbird
- Úsáid an Consól Earráide le haghaidh saincheisteanna ama rite
- Má tá cuma nach bhfuil socruithe stóráilte á gcur i bhfeidhm i gceart, atosaigh Thunderbird agus bain triail eile as. (D’fhéadfadh Thunderbird staid a taisceadh thar sheisiúin; cinntíonn atosaigh go lódáiltear socruithe úra.)

---

### CI & Clúdach {#ci-and-coverage}

- Ritheann GitHub Actions (`CI — Tests`) vitest le tairseacha clúdaigh (85% línte/feidhmeanna/brainseanna/ráitis). Mura gcomhlíontar na tairseacha, teipeann an jab.
- Uaslódálann an sreabhadh oibre déantán `coverage-html` leis an tuarascáil HTML; íoslódáil é ón leathanach reatha (Actions → rith is déanaí → Artifacts).

---

### Ranníocaíocht {#contributing}

- Féach CONTRIBUTING.md le haghaidh treoirlínte brainse/tiomantais/PR
- Leid: Cruthaigh próifíl fhorbartha Thunderbird ar leith le haghaidh tástála chun tionchar ar do phróifíl laethúil a sheachaint.

---

### Aistriúcháin

- Is féidir go mbeidh poist aistriúcháin mhóra “all → all” mall agus costasach. Tosaigh le fo‑thacar (m.sh., cúpla doiciméad agus 1–2 logchaighdeán), athbhreithnigh an toradh, ansin leathnaigh.

---

- Beartas athiarrachta: déanann poist aistriúcháin suas le 3 iarracht le cúlchéimniú easpónantúil ar earráidí API; féach `scripts/translate_web_docs_batch.js` agus `scripts/translate_web_docs_sync.js`.

Gabhálacha scáileáin do dhoiciméid

- Stóráil íomhánacha faoi `website/static/img/`.
- Déan tagairt dóibh i MD/MDX trí `useBaseUrl('/img/<filename>')` ionas go n‑oibreoidh cosáin leis an `baseUrl` an tsuímh.
- Tar éis íomhánna a chur leis nó a athainmniú faoi `website/static/img/`, deimhnigh go n‑úsáideann gach tagairt fós `useBaseUrl('/img/…')` agus go rindreáiltear i réamhamharc logánta.
  Favicons

- Gintear an `favicon.ico` ilmhéide go huathoibríoch i ngach cosán tógála (Make + scripteanna) trí `website/scripts/build-favicon.mjs`.
- Ní theastaíonn céim láimhe; is leor `icon-*.png` a nuashonrú.
  Leid athbhreithnithe

- Coinnigh an `id` tosaigh gan athrú i ndoiciméid aistrithe; aistrigh `title` agus `sidebar_label` amháin nuair atá siad ann.

#### clean {#mt-clean}

- Cuspóir: bain déantáin tógála/ réamhamhairc logánta.
- Úsáid: `make clean`
- Bainann (má tá siad ann):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Cuspóir: formáidigh, tástáil, nuashonraigh changelog, déan tiomantas, agus brúigh.
- Úsáid: `make commit`
- Sonraí: ritheann Prettier (scríobh), `make test`, `make test_i18n`; cuireann leis an changelog nuair atá difríochtaí stáitse ann; brúíonn chuig `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Cuspóir: rith ESLint trí chumraíocht chomhréidh.
- Úsáid: `make eslint`

---

#### help {#mt-help}

- Cuspóir: liostaigh gach sprioc le doic. aonlíne.
- Úsáid: `make help`

---

#### lint {#mt-lint}

- Cuspóir: lint an MailExtension ag úsáid `web-ext`.
- Úsáid: `make lint`
- Nótaí: déanann sé cóipeanna sealadacha `sources/manifest_LOCAL.json` → `sources/manifest.json`; déanann neamhaird ar ZIPanna tógtha; ní theipeann ar an bpíblíne ar rabhaidh.

---

#### menu {#mt-menu}

- Cuspóir: roghchlár idirghníomhach chun sprioc Make agus argóintí roghnacha a roghnú.
- Úsáid: rith `make` gan argóintí.
- Nótaí: mura bhfuil `whiptail` ar fáil, titeann an roghchlár ar ais go `make help`.

---

#### pack {#mt-pack}

- Cuspóir: tóg ZIPanna ATN agus LOCAL (braitheann ar `lint`).
- Úsáid: `make pack`
- Leid: ardú leaganacha i `sources/manifest_*.json` araon roimh phacáistiú.

---

#### prettier {#mt-prettier}

- Cuspóir: formáidigh an stór ar an láthair.
- Úsáid: `make prettier`

#### prettier_check {#mt-prettier_check}

- Cuspóir: fíoraigh formáidiú (gan scríbhneoireacht).
- Úsáid: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Cuspóir: ailias ar `prettier`.
- Úsáid: `make prettier_write`

---

#### test {#mt-test}

- Cuspóir: rith Prettier (scríobh), ESLint, ansin Vitest (clúdach má tá suiteáilte).
- Úsáid: `make test`

#### test_i18n {#mt-test_i18n}

- Cuspóir: tástálacha dírithe ar i18n do theaghráin an bhreiseáin agus do dhoiciméid an tsuímh.
- Úsáid: `make test_i18n`
- Ritheann: `npm run test:i18n` agus `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Cuspóir: aistrigh teaghráin UI an bhreiseáin ó EN go logchaighdeáin eile.
- Úsáid: `make translation_app OPTS="--locales all|de,fr"`
- Nótaí: caomhnaíonn sé struchtúr eochracha agus ionadchoinní; logálann sé go `translation_app.log`. Foirm script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Cuspóir: aistrigh doiciméid an tsuímh ó `website/docs/*.md` go `website/i18n/<locale>/...`.
- Molta: `translate_web_docs_batch` (OpenAI Batch API)
  - Úsáid (bratacha): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Glactar fós leis an sean‑shuíomh posisiúnta: `OPTS="<doc|all> <lang|all>"`
- Iompar: tógann JSONL, uaslódálann, seiceálann gach 30s, íoslódálann torthaí, scríobhann comhaid.
- Nóta: féadfaidh post baisc suas le 24 uair an chloig a thógáil chun críochnú (de réir fuinneog baisc OpenAI). Taispeánann an consól an t‑am caite ar gach seiceáil.
- Timpeallacht: `OPENAI_API_KEY` (riachtanach), roghnach `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (réamhshocrú 24h), `BATCH_POLL_INTERVAL_MS`.
- Oidhreachta: `translate_web_docs_sync`
  - Úsáid (bratacha): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Glactar fós leis an sean‑shuíomh posisiúnta: `OPTS="<doc|all> <lang|all>"`
- Iompar: iarrataí in aghaidh an phéire go sioncrónach (gan comhiomlánú baisce).
- Nótaí: leideanna idirghníomhacha nuair a fhágtar `OPTS` ar lár. Caomhnaíonn an dá mhodh bloic chód/ionchód líne agus coinníonn siad `id` an tosaigh gan athrú; logálann sé go `translation_web_batch.log` (baisc) nó `translation_web_sync.log` (sioncr.).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Cuspóir: aistrigh teaghráin UI an tsuímh (leathanach baile, barra nascleanúna, buntásc) ó `website/i18n/en/code.json` go gach logchaighdeán faoi `website/i18n/<locale>/code.json` (ag eisiamh `en`).
- Úsáid: `make translate_web_index` nó `make translate_web_index OPTS="--locales de,fr [--force]"`
- Riachtanais: easpórtáil `OPENAI_API_KEY` (roghnach: `OPENAI_MODEL=gpt-4o-mini`).
- Iompar: bailíochtaíonn sé struchtúr JSON, caomhnaíonn sé ionadchoinní lúibíní cuarlacha, coimeádann sé URLanna gan athrú, agus déanann sé iarracht arís le haiseolas ar earráidí bailíochtaithe.

---

#### web_build {#mt-web_build}

- Cuspóir: tóg suíomh na ndoiciméad go `website/build`.
- Úsáid: `make web_build OPTS="--locales en|de,en|all"` (nó socraigh `BUILD_LOCALES="en de"`)
- Inmheánacha: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Spleáchais: ritheann `npm ci` in `website/` ach amháin má tá `website/node_modules/@docusaurus` ar iarraidh.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Cuspóir: seiceáil nasc as líne‑shábháilte.
- Úsáid: `make web_build_linkcheck OPTS="--locales en|all"`
- Nótaí: tógann go `tmp_linkcheck_web_pages`; athscríobhann `baseUrl` GH Pages go `/`; scipeálann naisc iargúlta HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- Cuspóir: réamhamharc áitiúil gh‑pages le tástálacha/seiceáil nasc roghnach.
- Úsáid: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Iompar: déanann sé iarracht ar fhreastalaí réamhamhairc Node ar dtús (`scripts/preview-server.mjs`, tacaíonn le `/__stop`), titeann ar ais go `python3 -m http.server`; freastalaíonn sé ar 8080–8090; PID ag `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Cuspóir: brúigh `website/build` chuig an mbrainse `gh-pages`.
- Úsáid: `make web_push_github`

Leid: socraigh `NPM=…` chun an bainisteoir pacáiste a úsáideann an Makefile a shárú (réamhshocrú `npm`).

---
