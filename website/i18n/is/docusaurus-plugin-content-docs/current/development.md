---
id: development
title: 'Þróun'
sidebar_label: 'Þróun'
---

---

## Þróunarleiðbeiningar {#development-guide}

:::note Breyta aðeins ensku; þýðingar berast áfram
Uppfærðu skjölin **aðeins** undir `website/docs` (enska). Þýðingar undir `website/i18n/<locale>/…` eru sjálfvirkt myndaðar og ætti ekki að breyta handvirkt. Notaðu þýðingaverkefnin (t.d. `make translate_web_docs_batch`) til að endurnýja staðfærð efni.
:::

### Forkröfur {#prerequisites}

- Node.js 22+ og npm (prófað með Node 22)
- Thunderbird 128 ESR eða nýrri (fyrir handprófanir)

---

### Verkefnaskipan (í grófum dráttum) {#project-layout-high-level}

- Rót: pökkunarskrifta `distribution_zip_packer.sh`, skjöl, skjámyndir
- `sources/`: aðal kóði viðbótar (bakhlaup, stillingar/uppsprettuglugga-UI, manifest-skrár, táknmyndir)
- `tests/`: Vitest-prófasafn
- `website/`: Docusaurus-skjöl (með i18n undir `website/i18n/de/...`)

---

### Uppsetning og verkfæri {#install-and-tooling}

- Setja upp rótarháðleika: `npm ci`
- Skjöl (valkvætt): `cd website && npm ci`
- Skoða markmið: `make help`

---

### Lifandi þróun (web‑ext run) {#live-dev-web-ext}

- Hraður lykkjuferill í Firefox Desktop (aðeins yfirborðsprófanir á UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Keyra í Thunderbird (ráðlagt fyrir MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Ábendingar:
- Hafðu villugluggann opinn í Thunderbird (Verkfæri → Þróunarverkfæri → Villugluggi).
- MV3 atburðasíður eru svæfðar í bið; endurhlaða þarf viðbótina eftir kóðabreytingar, eða leyfa web‑ext að endurhlaða sjálfkrafa.
- Sum hegðun sem er aðeins í Firefox er frábrugðin; staðfestu ávallt í Thunderbird til að tryggja API-samræmi.
- Slóðir á Thunderbird-forrit (dæmi):
- Linux: `thunderbird` (t.d. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Aðskilnaður prófíla: Notaðu sérstakan Thunderbird‑prófíl fyrir þróun til að hafa ekki áhrif á daglega stillingu þína.

---

### Make-markmið (stafrófsröð) {#make-targets-alphabetical}

Makefile staðlar algengar þróunarvinnslur. Keyrðu `make help` hvenær sem er til að fá eins línu samantekt af hverju markmiði.

Ábending: að keyra `make` án marks opnar einfalt Whiptail‑valmynd til að velja markmið.

| Markmið                                                  | Eins línu lýsing                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Fjarlægja staðbundnar smíða-/forskoðunarafurðir (tmp/, web-local-preview/, website/build/).       |
| [`commit`](#mt-commit)                                   | Forsníða, keyra próf (þ.m.t. i18n), uppfæra changelog, gera commit og push.                       |
| [`eslint`](#mt-eslint)                                   | Keyra ESLint með flatri stillingu (`npm run -s lint:eslint`).                                     |
| [`help`](#mt-help)                                       | Telja upp öll markmið með eins línu lýsingu (raðað).                                              |
| [`lint`](#mt-lint)                                       | web‑ext lint á `sources/` (bráðabirgða manifest; hunsar ZIP; ekki banvænt).                       |
| [`menu`](#mt-menu)                                       | Gagnvirk valmynd til að velja markmið og valkvæð viðföng.                                         |
| [`pack`](#mt-pack)                                       | Byggja ATN og LOCAL ZIP (keyrir linter; kallar pakkskriptuna).                                    |
| [`prettier`](#mt-prettier)                               | Forsníða geymsluna á staðnum (skrifar breytingar).                                                |
| [`prettier_check`](#mt-prettier_check)                   | Prettier í athugunarham (skrifar ekki); fellur ef endursníðing er nauðsynleg.                     |
| [`prettier_write`](#mt-prettier_write)                   | Gælunafn fyrir `prettier`.                                                                        |
| [`test`](#mt-test)                                       | Prettier (skrif), ESLint og síðan Vitest (þekja ef stillt).                                       |
| [`test_i18n`](#mt-test_i18n)                             | Aðeins i18n-próf: placeholderar/samræmi í viðbót + samræmi vefskjala.                             |
| [`translate_app`](#mt-translation-app)                   | Gælunafn fyrir `translation_app`.                                                                 |
| [`translation_app`](#mt-translation-app)                 | Þýða UI-strengi apps úr `sources/_locales/en/messages.json`.                                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | Þýða vefskjöl í gegnum OpenAI Batch API (mælt með).                                               |
| [`translate_web_docs_sync`](#mt-translation-web)         | Þýða vefskjöl samstundis (arfleifð, ekki batch).                                                  |
| [`translate_web_index`](#mt-translation_web_index)       | Gælunafn fyrir `translation_web_index`.                                                           |
| [`translation_web_index`](#mt-translation_web_index)     | Þýða UI á forsíðu/yfirborðslista/fótspjaldi (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Byggja skjöl í `website/build` (styður `--locales` / `BUILD_LOCALES`).                            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Tengjaskoðun örugg án nets (sleppir fjartengingum HTTP[S]).                                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Staðbundin gh‑pages forskoðun; þjónustar sjálfvirkt á 8080–8090; valkvæð próf/tengjaskoðun.       |
| [`web_push_github`](#mt-web_push_github)                 | Ýta `website/build` á greinina `gh-pages`.                                                        |

Setningafræði valkosta

- Notaðu `make <command> OPTS="…"` til að senda valkosti (mælt er með gæsalöppum). Hvert markmið hér fyrir neðan sýnir dæmi um notkun.

--

-

#### Ábendingar fyrir smíði fyrir staðbundin tungumál {#locale-build-tips}

- Byggja hlutmengi tungumála: stilltu `BUILD_LOCALES="en de"` eða sendu `OPTS="--locales en,de"` til vefmarkmiða.
- Forskoða tiltekið tungumál: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Smíða og pakka {#build-and-package}

- Byggja ZIP: `make pack`
- Býr til ATN og LOCAL ZIP í rót geymslunnar (ekki breyta afurðum í höndunum)
- Ábending: uppfærðu útgáfu í bæði `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json` áður en pakkað er
- Handvirk uppsetning (þróun): Thunderbird → Verkfæri → Viðbætur og þemu → gír → Setja upp viðbót úr skrá… → veldu byggða ZIP‑skrána

---

### Prófanir {#test}

- Fullt safn: `make test` (Vitest)
- Þekja (valkvætt):
- `npm i -D @vitest/coverage-v8`
- Keyrðu `make test`; opnaðu `coverage/index.html` fyrir HTML‑skýrslu
- Aðeins i18n: `make test_i18n` (UI-lyklar/placeholderar/titlar + samræmi vefs eftir tungumáli og skjali með id/title/sidebar_label athugunum)

---

### Villuleit og skráning {#debugging-and-logs}

- Villugluggi: Verkfæri → Þróunarverkfæri → Villugluggi
- Kveikja/slökkva á ítarlegum loggum í keyrslu:
- Virkja: `messenger.storage.local.set({ debug: true })`
- Slökkva: `messenger.storage.local.set({ debug: false })`
- Lógskilaboð birtast meðan verið er að semja/senda svör

---

### Skjöl (vefsíða) {#docs-website}

- Þróunarþjónn: `cd website && npm run start`
- Byggja kyrrstæða síðu: `cd website && npm run build`
- Samsvarandi Make-markmið (stafrófsröð): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Notkunardæmi:
- Aðeins EN, sleppa prófum/tengjaskoðun, enginn push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Öll tungumál, með prófum/tengjaskoðun, síðan push: `make web_build_local_preview && make web_push_github`
- Áður en birt er, keyrðu tengjaskoðun örugga án nets: `make web_build_linkcheck`.
- i18n: Enska býr í `website/docs/*.md`; þýsk þýðing í `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Leit: Ef Algolia DocSearch umhverfisbreytur eru stilltar í CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), notar síðan Algolia‑leit; annars fellur hún aftur á staðbundna leit. Á forsíðunni, ýttu á `/` eða `Ctrl+K` til að opna leitarreitinn.

---

#### Styrkja-endurbeiningarleið {#donate-redirect}

- `website/src/pages/donate.js`
- Leið: `/donate` (og `/<locale>/donate`)
- Hegðun:
- Ef núverandi leið er með tungumál (t.d. `/de/donate`), notaðu það
- Annars, veldu besta samsvörun úr `navigator.languages` miðað við stillt tungumál; fell aftur á sjálfgefið tungumál
- Beinir á:
- `en` → `/docs/donation`
- aðrir → `/<locale>/docs/donation`
- Notar `useBaseUrl` til réttrar meðhöndlunar á baseUrl
- Inniheldur meta refresh + `noscript` hlekk sem varaleið

---

---

#### Forskoðunarábendingar {#preview-tips}

- Hætta snyrtilega í Node‑forskoðun: opna `http://localhost:<port>/__stop` (prentað eftir `Local server started`).
- Ef myndir hlaðast ekki í MDX/JSX, notaðu `useBaseUrl('/img/...')` til að virða `baseUrl` síðunnar.
- Forskoðunin ræsir fyrst; tengjaskoðunin keyrir á eftir og er ekki hindrandi (brotin ytri tengl við munu ekki stöðva forskoðun).
- Dæmi um forskoðunar‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (prentað eftir “Local server started”).
- Ytri tenglar í tengjaskoðun: Sumar ytri síður (t.d. addons.thunderbird.net) loka á vélmenni og geta sýnt 403 í tengjaskoðunum. Forskoðun ræsir samt; þetta er óhætt að hunsa.

---

#### Þýða vefinn {#translate-website}

Hvað þú getur þýtt

- Aðeins vef-UI: forsíða, yfirlitsstika, fótspjald og aðrir UI‑strengir. Efni skjala er áfram aðeins á ensku í bili.

Hvar á að breyta

- Breyttu `website/i18n/<locale>/code.json` (notaðu `en` sem viðmið). Haltu plásshaldarum eins og `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` óbreyttum.

Búa til eða endurnýja skrár

- Búa til vantaðar stubba fyrir öll tungumál: `npm --prefix website run i18n:stubs`
- Yfirskrifa stubba út frá ensku (eftir að hafa bætt við nýjum strengjum): `npm --prefix website run i18n:stubs:force`
- Valkostur fyrir eitt tungumál: `npx --prefix website docusaurus write-translations --locale <locale>`

Þýða UI-strengi forsíðu/stikunnar/fótspjalds (OpenAI)

- Settu auðkenni einu sinni (skel eða .env):
- `export OPENAI_API_KEY=sk-...`
- Valkvætt: `export OPENAI_MODEL=gpt-4o-mini`
- Ein keyrsla (öll tungumál, sleppa en): `make translate_web_index`
- Takmarka við tiltekin tungumál: `make translate_web_index OPTS="--locales de,fr"`
- Yfirskrifa fyrirliggjandi gildi: `make translate_web_index OPTS="--force"`

Staðfesting og endurtilraunir

- Þýðingarskriptið sannreynir lögun JSON, varðveitir plásshaldara með slaufusviga og tryggir að URL‑slóðir breytist ekki.
- Við misheppnaða staðfestingu reynir það aftur með endurgjöf allt að 2 sinnum áður en það heldur fyrirliggjandi gildum.

Forskoða þitt tungumál

- Þróunarþjónn: `npm --prefix website run start`
- Heimsæktu `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Innsending

- Opnaðu PR með breyttu skránni/skránum `code.json`. Haltu breytingum afmörkuðum og bættu við skjáskoti ef mögulegt er.

---

### Öryggis- og stillingarábendingar {#security-and-configuration-tips}

- Ekki commita `sources/manifest.json` (búið til tímabundið í smíði)
- Haltu `browser_specific_settings.gecko.id` stöðugu til að varðveita uppfærslurásina

---

### Varðveisla stillinga {#settings-persistence}

- Geymsla: Allar notandastillingar búa í `storage.local` og haldast yfir uppfærslur viðbótarinnar.
- Uppsetning: Sjálfgefin gildi eru aðeins sett þegar lykill vantar algerlega (undefined).
- Uppfærsla: Flutningur fyllir aðeins upp í vantaða lykla; fyrirliggjandi gildum er aldrei yfirskrifað.
- Skema‑vísir: `settingsVersion` (sem stendur `1`).
- Lyklar og sjálfgefin gildi:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kóði: sjá `sources/background.js` → `initializeOrMigrateSettings()` og `SCHEMA_VERSION`.

Þróunarferli (að bæta við nýrri stillingu)

- Hækka `SCHEMA_VERSION` í `sources/background.js`.
- Bættu nýja lyklinum + sjálfgefnu gildi við hlutinn `DEFAULTS` í `initializeOrMigrateSettings()`.
- Notaðu reglu „aðeins‑ef‑óskilgreint“ þegar sjálfgefnum gildum er sáð; ekki yfirskrifa fyrirliggjandi gildi.
- Ef stillingin er notandans sýnileg, tengdu hana í `sources/options.js` og bættu við staðfærðum strengjum.
- Bættu við/lagaðu próf (sjá `tests/background.settings.migration.test.js`).

Ábendingar fyrir handprófanir

- Herma eftir ferskri uppsetningu: hreinsaðu gagnamöppu viðbótarinnar eða ræstu með nýjum prófíl.
- Herma eftir uppfærslu: stilltu `settingsVersion` á `0` í `storage.local` og endurhladdu; staðfestu að fyrirliggjandi gildi haldist óbreytt og einungis vantar lyklar bætist við.

---

### Úrræðaleit {#troubleshooting}

- Gakktu úr skugga um að Thunderbird sé 128 ESR eða nýrri
- Notaðu villugluggann fyrir keyrsluvandamál
- Ef geymdar stillingar virðast ekki taka gildi, endurræstu Thunderbird og reyndu aftur. (Thunderbird getur geymt ástand milli setna; endurræsing tryggir að nýjar stillingar hlaðist inn.)

---

### CI og þekja {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) keyrir vitest með þröskuldum fyrir þekju (85% línur/föll/greinar/setningar). Ef þröskuldar nást ekki, fellur verkið.
- Vinnuflæðið hleður upp gripnum `coverage-html` með HTML‑skýrslunni; sæktu hann af keyrslusíðunni (Actions → nýjasta keyrsla → Artifacts).

---

### Framlag {#contributing}

- Sjá CONTRIBUTING.md fyrir leiðbeiningar um greinar/commits/PR
- Ábending: Búðu til sérstakan Thunderbird‑þróunarprófíl fyrir prófanir til að hafa ekki áhrif á daglega prófílinn þinn.

---

### Þýðingar

- Að keyra stór „allt → allt“ þýðingarverk getur verið hægt og kostnaðarsamt. Byrjaðu á hlutmengi (t.d. fá skjöl og 1–2 tungumál), farðu yfir niðurstöður og stækkaðu svo.

---

- Endurtilraunastefna: þýðingarverk framkvæma allt að 3 endurtilraunir með veldisvaxandi bið á API‑villum; sjá `scripts/translate_web_docs_batch.js` og `scripts/translate_web_docs_sync.js`.

Skjámyndir fyrir skjöl

- Geymdu myndir undir `website/static/img/`.
- Vísaðu í þær í MD/MDX í gegnum `useBaseUrl('/img/<filename>')` svo slóðir virki með `baseUrl` síðunnar.
- Eftir að hafa bætt við eða endurnefnt myndir undir `website/static/img/`, staðfestu að allar tilvísanir noti enn `useBaseUrl('/img/…')` og birtist í staðbundinni forskoðun.
  Táknmyndir (favicons)

- Fjölstærða `favicon.ico` er búin til sjálfvirkt í öllum smíðaleiðum (Make + skript) í gegnum `website/scripts/build-favicon.mjs`.
- Engin handvirk skref eru nauðsynleg; að uppfæra `icon-*.png` dugar.
  Yfirferðarráð

- Haltu front‑matter `id` óbreyttu í þýddum skjölum; þýddu aðeins `title` og `sidebar_label` þegar þau eru til staðar.

#### clean {#mt-clean}

- Tilgangur: fjarlægja staðbundnar smíða-/forskoðunarafurðir.
- Notkun: `make clean`
- Fjarlægir (ef til staðar):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tilgangur: forsníða, prófa, uppfæra changelog, gera commit og push.
- Notkun: `make commit`
- Nánar: keyrir Prettier (skrif), `make test`, `make test_i18n`; bætir við changelog þegar breytingar eru stigaðar; ýtir á `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tilgangur: keyra ESLint með flatri stillingu.
- Notkun: `make eslint`

---

#### help {#mt-help}

- Tilgangur: telja upp öll markmið með eins línu lýsingu.
- Notkun: `make help`

---

#### lint {#mt-lint}

- Tilgangur: lint‑prófa MailExtension með `web-ext`.
- Notkun: `make lint`
- Athugasemdir: afritar tímabundið `sources/manifest_LOCAL.json` → `sources/manifest.json`; hunsar byggð ZIP; viðvaranir fella ekki pípluna.

---

#### menu {#mt-menu}

- Tilgangur: gagnvirk valmynd til að velja Make‑markmið og valkvæð viðföng.
- Notkun: keyrðu `make` án viðfanga.
- Athugasemdir: ef `whiptail` er ekki tiltækt, fellur valmyndin aftur á `make help`.

---

#### pack {#mt-pack}

- Tilgangur: byggja ATN og LOCAL ZIP (háð `lint`).
- Notkun: `make pack`
- Ábending: hækka útgáfur í bæði `sources/manifest_*.json` áður en pakkað er.

---

#### prettier {#mt-prettier}

- Tilgangur: forsníða geymsluna á staðnum.
- Notkun: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tilgangur: staðfesta snið (engin skrif).
- Notkun: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tilgangur: gælunafn fyrir `prettier`.
- Notkun: `make prettier_write`

---

#### test {#mt-test}

- Tilgangur: keyra Prettier (skrif), ESLint og síðan Vitest (þekja ef uppsett).
- Notkun: `make test`

#### test_i18n {#mt-test_i18n}

- Tilgangur: i18n‑miðað próf fyrir strengja‑ og vefskjalasamræmi.
- Notkun: `make test_i18n`
- Keyrir: `npm run test:i18n` og `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tilgangur: þýða UI‑strengi viðbótar úr EN yfir í önnur tungumál.
- Notkun: `make translation_app OPTS="--locales all|de,fr"`
- Athugasemdir: varðveitir lykjaskipan og plásshaldara; skráir í `translation_app.log`. Skript‑form: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tilgangur: þýða vefskjöl úr `website/docs/*.md` yfir í `website/i18n/<locale>/...`.
- Mælt með: `translate_web_docs_batch` (OpenAI Batch API)
  - Notkun (flögg): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Arfleifð stöðusetning er enn samþykkt: `OPTS="<doc|all> <lang|all>"`
- Hegðun: býr til JSONL, hleður upp, kannar á 30 sek. fresti, sækir niðurstöður, skrifar skrár.
- Athugið: batch‑verk getur tekið allt að 24 klst. (samkvæmt lotuglugga OpenAI). Skjár sýnir liðinn tíma við hverja könnun.
- Umhverfi: `OPENAI_API_KEY` (krafa), valkvætt `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (sjálfgefið 24h), `BATCH_POLL_INTERVAL_MS`.
- Arfleifð: `translate_web_docs_sync`
  - Notkun (flögg): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Arfleifð stöðusetning er enn samþykkt: `OPTS="<doc|all> <lang|all>"`
- Hegðun: samstilltar beiðnir fyrir hvert par (engin batch‑samþjöppun).
- Athugasemdir: Gagnvirkar fyrirspurnir þegar `OPTS` er sleppt. Báðir hamir varðveita kóðablokkir/innfeldan kóða og halda front‑matter `id` óbreyttu; skráir í `translation_web_batch.log` (batch) eða `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tilgangur: þýða vef‑UI‑strengi (forsíða, yfirlitsstika, fótspjald) úr `website/i18n/en/code.json` yfir á öll tungumál undir `website/i18n/<locale>/code.json` (án `en`).
- Notkun: `make translate_web_index` eða `make translate_web_index OPTS="--locales de,fr [--force]"`
- Kröfur: export `OPENAI_API_KEY` (valkvætt: `OPENAI_MODEL=gpt-4o-mini`).
- Hegðun: sannreynir JSON‑byggingu, varðveitir plásshaldara með slaufusviga, heldur URL‑slóðum óbreyttum og reynir aftur með endurgjöf við villur í staðfestingu.

---

#### web_build {#mt-web_build}

- Tilgangur: byggja skjölavefinn í `website/build`.
- Notkun: `make web_build OPTS="--locales en|de,en|all"` (eða stilltu `BUILD_LOCALES="en de"`)
- Innviðir: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Háðir: keyrir `npm ci` í `website/` aðeins ef `website/node_modules/@docusaurus` vantar.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tilgangur: tengjaskoðun örugg án nets.
- Notkun: `make web_build_linkcheck OPTS="--locales en|all"`
- Athugasemdir: byggir í `tmp_linkcheck_web_pages`; endurskrifar GH Pages `baseUrl` í `/`; sleppir fjartengingum HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- Tilgangur: staðbundin gh‑pages forskoðun með valkvæðum prófum/tengjaskoðun.
- Notkun: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Hegðun: reynir fyrst Node‑forskoðunarþjón (`scripts/preview-server.mjs`, styður `/__stop`), fellur aftur á `python3 -m http.server`; þjónustar á 8080–8090; PID í `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tilgangur: ýta `website/build` á greinina `gh-pages`.
- Notkun: `make web_push_github`

Ábending: stilltu `NPM=…` til að yfirskrifa pakkastjórann sem Makefile notar (sjálfgefið `npm`).
