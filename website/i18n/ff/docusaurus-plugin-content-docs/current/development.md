---
id: development
title: 'Ɓeydital'
sidebar_label: 'Ɓeydital'
---

---

## Doggol Topirde {#development-guide}

:::note Taƴto Engeleere tan; firooje maa faama
Hesɗitin dokkitannde **tan** les `website/docs` (Engeleere). Firooje les `website/i18n/<locale>/…` ko eɓɓitinaama tee hoto taƴtinaa junngo. Huutoro golle firde (misal, `make translate_web_docs_batch`) ngam hesɗitinde loowdi yankinaande.
:::

### Sarɗiiji ɗe ɓeɗɗii {#prerequisites}

- Node.js 22+ e npm (ƴeewtii e Node 22)
- Thunderbird 128 ESR walla kesol (ngam ƴeewtere junngo)

---

### Cakkitol Prooje (heeɓtunde) {#project-layout-high-level}

- Ɗaɓɓorde: ciŋko pakeeru `distribution_zip_packer.sh`, dokkitanɗe, nate njaajeendi layaral
- `sources/`: kod add‑on mohɗo (baɗenol/background, cuɓe/pooppol UI, manifeeste, maajoore)
- `tests/`: teelorde Vitest
- `website/`: dokkitanɗe Docusaurus (e i18n les `website/i18n/de/...`)

---

### Aafgol & Kuutorɗe {#install-and-tooling}

- Aaf cuɓirɗe ɗaɓɓorde: `npm ci`
- Dokkitanɗe (ɓeydaaka): `cd website && npm ci`
- Yiil caasiiɗe: `make help`

---

### Topirde Heeri (web‑ext run) {#live-dev-web-ext}

- Werde ɗoworde e Firefox Desktop (ƴeewtere UI tan):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Heddii e Thunderbird (ɓuri foti e MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tiɓɓe:
- Uddit Koñol Juumre Thunderbird (Tools → Developer Tools → Error Console).
- Kelle jaaɓdugol MV3 ɗooɗi ena ñawta so ko caama; loowtu add‑on caggal bayyinol kod ngal, walla laat web‑ext moƴƴannde auto‑reload.
- Ko ndee beenii e Firefox tan ena mbaawaa wayli; ƴeewto sahaa e Thunderbird ngam ñiiɓnu API.
- Lappi binarii Thunderbird (misalaa):
- Linux: `thunderbird` (misal, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Seernde ceertu: Huutoro heftinirde Thunderbird goɗngol ngam topirde ndee ngam hokkaade e teelte maa nde ñande.

---

### Caasiiɗe Make (e alfabeejo) {#make-targets-alphabetical}

Makefile ɗaɗndii joɓirde topirde baawɗe. Hurminde `make help` kala sahaa ngam caɗeele daande gooto fof e caasorde kala.

Tiɓɓe: hurminde `make` tawa alaa caasorde udditii menyu Whiptail woodnde ngam labo caasorde.

| Caasorde                                                 | Cifagol daande gooto                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Ittu timmitte loowdi/jiigol leñol (tmp/, web-local-preview/, website/build/).        |
| [`commit`](#mt-commit)                                   | Formate, hurmin ƴeewte (incl. i18n), hesɗitin changelog, commit & push.              |
| [`eslint`](#mt-eslint)                                   | Hurminde ESLint tawa ko flat config (`npm run -s lint:eslint`).                      |
| [`help`](#mt-help)                                       | Dogtu caasiiɗe fof e cifagol daande gooto (teeltii).                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint e `sources/` (manifest seeɗa; ɗartii ZIPs; juume ɗe ngalaa fatal).      |
| [`menu`](#mt-menu)                                       | Menyu jiyngol ngam suɓo caasorde e cuɓe ɗiɗi so ena mbaawi.                          |
| [`pack`](#mt-pack)                                       | Toggo ZIPs ATN & LOCAL (linte ko arii; noddi ciŋko packer).                          |
| [`prettier`](#mt-prettier)                               | Formate repositoorii to ɗoo (winndito bayle).                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier e moddii ƴeewtingol (woppataa winndito); woortii so formate ena foti.       |
| [`prettier_write`](#mt-prettier_write)                   | Alias ngam `prettier`.                                                               |
| [`test`](#mt-test)                                       | Prettier (winndito), ESLint, ɗo kadi Vitest (gasgol so teeltinaama).                 |
| [`test_i18n`](#mt-test_i18n)                             | Ƴeewte i18n tan: keɓe‑maamaaji/pariɗi + parity lowre.                                |
| [`translate_app`](#mt-translation-app)                   | Alias ngam `translation_app`.                                                        |
| [`translation_app`](#mt-translation-app)                 | Fir kelme UI jaaɓnirgal iwde e `sources/_locales/en/messages.json`.                  |
| [`translate_web_docs_batch`](#mt-translation-web)        | Fir dokkitanɗe lowre so OpenAI Batch API (ɓurɗo).                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Fir dokkitanɗe lowre e sinkoron (leegi, non-batch).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | Alias ngam `translation_web_index`.                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | Fir UI duƴƴorde/naawbaar/puccu (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Toggo dokkitanɗe to `website/build` (doŋgol `--locales` / `BUILD_LOCALES`).          |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Ƴeewtingol jokkol nde seerii e goɗngol (skippa HTTP[S] heen).                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Jiygol gh‑pages local; jaaɓnirgol e 8080–8090; ƴeewte/link‑check cuɓaaɗe.            |
| [`web_push_github`](#mt-web_push_github)                 | Puci `website/build` to caggal `gh-pages`.                                           |

Sinteks cuɓe

- Huutoro `make <command> OPTS="…"` ngam neldu cuɓe (puɗɗe ko waɗi). Caasorde kala les dow ɓe hollii yantorde huutore.

--

-

#### Tiɓɓe toggo locale {#locale-build-tips}

- Toggo duumol locales: teelto `BUILD_LOCALES="en de"` walla neldu `OPTS="--locales en,de"` to caasiiɗe web.
- Jiylo locale gootol: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Toggo & Pake {#build-and-package}

- Toggir ZIPs: `make pack`
- Nana ɗaɓɓitii ATN e LOCAL ZIPs e yeeso repo (hoto taƴto timmitte baɗte junngo)
- Tiɓɓe: hesɗitin yamre e ɗiiɗi `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json` hade pakegol
- Aafgol junngo (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → suɓo ZIP togtaango

---

### Ƴeewtere {#test}

- Teelorde fof: `make test` (Vitest)
- Gasgol (ɓeydaaka):
- `npm i -D @vitest/coverage-v8`
- Hurminde `make test`; udditin `coverage/index.html` ngam jaanfaagu HTML
- i18n tan: `make test_i18n` (kiyooji/pariiɗi UI/titte + parity lowre per‑locale per‑doc e ƴeewtingol id/title/sidebar_label)

---

### Firiingo & Logeeji {#debugging-and-logs}

- Koñol Juumre: Tools → Developer Tools → Error Console
- Lomtugol logeeji keewi e ñawndugol:
- Hurmino: `messenger.storage.local.set({ debug: true })`
- Dartino: `messenger.storage.local.set({ debug: false })`
- Logeeji ena yaltu tuma nde koɗɗitde/neldude jaabawuuji

---

### Dokkitanɗe (lowre) {#docs-website}

- Sarworde dev: `cd website && npm run start`
- Toggo lowre static: `cd website && npm run build`
- Korseeji Make (e alfabeejo): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Yantorde huutore:
- EN tan, taggu ƴeewte/link‑check, alaa push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Locales fof, e ƴeewte/link‑check, caggal puci: `make web_build_local_preview && make web_push_github`
- Hade njaltugol, hurmin ƴeewtingol jokkol nde seerii e goɗngol: `make web_build_linkcheck`.
- i18n: Engeleere woni e `website/docs/*.md`; firooje Jamman ko e `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Njiilaw: So kokkoreeji Algolia DocSearch teeltiraa e CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), lowre ngoo huutortee njiilaw Algolia; so wonaa ɗum, ena fuɗɗoo to njiilaw local. E duƴƴorde, dobo `/` walla `Ctrl+K` ngam udditde boye njiilaw.

---

#### Laawol rewindo "donate" {#donate-redirect}

- `website/src/pages/donate.js`
- Laawol: `/donate` (e `/<locale>/donate`)
- Jaaɓdugol:
- So laawol gonngol waɗi locale (misal, `/de/donate`), huutoro mo
- So wonaa, labo moƴƴingol ɓurɗo heɓugo e `navigator.languages` e locales teeltinaama; ruttu to locale goowo
- Nana daawtoo to:
- `en` → `/docs/donation`
- goɗɗe → `/<locale>/docs/donation`
- Huutora `useBaseUrl` ngam jeyi baseUrl no feewi
- Ena ina waɗi meta refresh + jokkol `noscript` no feewi no ɓennini

---

---

#### Tiɓɓe Jiygol {#preview-tips}

- Dartin jiygol Node no mooloo: udditin `http://localhost:<port>/__stop` (winndiraaki caggal `Local server started`).
- So nate ɓe daaƴaani e MDX/JSX, huutoro `useBaseUrl('/img/...')` ngam ɓeydude `baseUrl` lowre ngoo.
- Jiygol ko fuɗɗa to; ƴeewtingol jokkol ɗe ari caggal oo tee wonaa rokkire (jokkole heen puɗɗi 403 e link check). Jiygol maa fuɗɗu; ɗee ena waawi ɗartineede.
- URL jiygol misal: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (winndiraaki caggal “Local server started”).
- Jokkole boowɗe e link‑check: Lowre goɗɗe heen (misal, addons.thunderbird.net) ɗartoytaataan nde hulɓindeede e caggalte, tee ena waawi hollude 403 e link‑check. Jiygol maa fuɗɗu; ɗee ko safa ngam kalaa.

---

#### Fir Lowre ndee {#translate-website}

Ko mbaawaa firde

- UI lowre tan: duƴƴorde, naawbaar, puccu, e kelme UI goɗɗe. Loowdi dokkitanɗe maa heddii Engeleere tan haa jooni.

Nokku mo taƴtude

- Taƴto `website/i18n/<locale>/code.json` (huutoro `en` no ɓetirgol). Woppu keɓe‑maamaaji hono `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ɗee.

Sos walla hesɗitin piille

- Sos stubs ɗe daaƴii ngam locales fof: `npm --prefix website run i18n:stubs`
- Winndito stubs iwde e Engeleere (caggal ɓeydude kelme kesum): `npm --prefix website run i18n:stubs:force`
- Wonaande ngam locale gootol: `npx --prefix website docusaurus write-translations --locale <locale>`

Fir kelme UI duƴƴorde/naawbaar/puccu (OpenAI)

- Teelto seedamfaagu gootol (shell walla .env):
- `export OPENAI_API_KEY=sk-...`
- ɓeydaaka: `export OPENAI_MODEL=gpt-4o-mini`
- Waktuu gooto (locales fof, taggu en): `make translate_web_index`
- Tiiɗno to locales goɗɗe: `make translate_web_index OPTS="--locales de,fr"`
- Winndito kiɓirɗi goodi: `make translate_web_index OPTS="--force"`

Ƴeewtagol & gitagol

- Ciŋko firde ɗoo ƴeewta ɓetol JSON, naattoy keɓe-curli, tee haɗaaki URLs.
- So ƴeewtagol woorii, maa eti haa 2 keerii ko e duttine hade waɗde mooftugol kiɓirɗi goodi.

Jiylo locale maa

- Sarworde dev: `npm --prefix website run start`
- Yillo `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Neldude

- Uddit PR ɗe waɗi piille `code.json` taƴtaama. Mooftu bayle ɗee ɗeennude e fayde tee ɓeydu nate njaajeendi so addi.

---

### Tiɓɓe Kisnal & Teelte {#security-and-configuration-tips}

- Hoto comitee `sources/manifest.json` (sosiraaki sahaaɗo e toggo)
- Teeŋtin `browser_specific_settings.gecko.id` no moƴƴii ngam hisnude calol kesɗitinal

---

### Jokkondiral Teelte {#settings-persistence}

- Maantorol: Teelte kuutoroji fof renndee e `storage.local` tee ɓe heddii nder hesɗitine add‑on.
- Aafgol: Goowaaɗi ko ñemmbitii tan so kiyyol ɗum woodaani (undefined).
- Hesɗitinal: Ɓoggol ɓeydital fotti tan ɗum toɓɓitoo kiyooji ɗe daaƴii; kiɓirɗi goodi hay so rewataa winnditoo.
- Maantorde skiima: `settingsVersion` (jeye `1`).
- Kiyooji e goowaaɗi:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: ɗaɓɓo `sources/background.js` → `initializeOrMigrateSettings()` e `SCHEMA_VERSION`.

Joɓirde topirde (ɓeydugol teelte hesere)

- Ɓoostu `SCHEMA_VERSION` e `sources/background.js`.
- Ɓeydu kiyyol kesol + goowol to geɗel `DEFAULTS` e `initializeOrMigrateSettings()`.
- Huutoro ɗooga "only-if-undefined" so seɗaade goowaaɗi; hoto winndito kiɓirɗi goodi.
- So teelte nde ena yiyoytaa e kuutorɓe, seŋee ɗum e `sources/options.js` tee ɓeydu kelme yankinaande.
- Ɓeydu/waylu ƴeewte (ɗaɓɓo `tests/background.settings.migration.test.js`).

Tiɓɓe ƴeewtere junngo

- Naatnire aafgol hesere: momtu runngere keɓe add‑on walla fuɗɗo e heftinirde hesere.
- Naatnire hesɗitinal: teelto `settingsVersion` to `0` e `storage.local` tee loowto kadi; teeŋtin kiɓirɗi goodi heddii tee kiyooji ɗe daaƴii tan ko ɓeydaama.

---

### Ɗowdirgol juumre {#troubleshooting}

- Ƴeewto ko Thunderbird ko 128 ESR walla kesol
- Huutoro Koñol Juumre ngam ceɗe e ñawndugol
- So teelte mooftaaɗe waɗa yiyoytaaka no moƴƴii, hurmitin Thunderbird tee etaa kadi. (Thunderbird ena ena mbaawi ŋaccude ngonka nder njuute; hurmitinde ina ƴellitde goɗɗum.)

---

### CI & Gasgol {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ena hurmite vitest e boowal gasgol (85% diiɗe/kuɓrendi/cammbii/dowruɗi). So boowal ɗee ngalaa, golle ndee woortii.
- Joɓirde ndee ɓeɓɓitinii artifakt `coverage-html` wonndude e jaanfaagu HTML; aawto ɗum e hello run (Actions → run sakkitiiɗo → Artifacts).

---

### Wallitde {#contributing}

- Ƴeewto CONTRIBUTING.md ngam laawol roɲɲugol/commit/PR
- Tiɓɓe: Sos heftinirde Thunderbird topirde goɗngol ngam ƴeewte ngeɗɗu, ngam hokkaade e heftinirde maa nde ñande.

---

### Firooji

- Hurminde golle firde “all → all” ɓeɗɗe ena waawi ɗowteede e ndogoreede. Fuɗɗo e duumol seeɗa (misal, dokkitanɗe seeɗa e locales 1–2), ƴeewto ɗuum, ñalnde kadi.

---

- Doggol gitagol: golle firde ina eti haa 3 gitii e woppitere ayiimaaki e API; ƴeewto `scripts/translate_web_docs_batch.js` e `scripts/translate_web_docs_sync.js`.

Nate njaajeendi dokkitanɗe

- Daɗndu nate les `website/static/img/`.
- Toɗɗo ɗe e MD/MDX tawa ko `useBaseUrl('/img/<filename>')` ngam lappol ɗee moƴƴude e `baseUrl` lowre ngoo.
- Caggal ɓeydugol walla innitol innde nate les `website/static/img/`, teeŋtin toɗɗinooji fof huutortoo `useBaseUrl('/img/…')` kadi tee ɓe njiye e jiygol local.
  Favicons

- `favicon.ico` doondi e ɓenndeeji keewɗi ko eɓɓitinaama e lappol toggo fof (Make + ciŋke) tawa ko `website/scripts/build-favicon.mjs`.
- Alaa dokkal junngo ena foti; hesɗitinde `icon-*.png` ko waɗi.
  Tiɓɓe ƴeewtere

- Teeŋtin front‑matter `id` wonaa taƴta e dokkitanɗe firaama; fir tan `title` e `sidebar_label` so ɓe woodi.

#### clean {#mt-clean}

- Moƴƴugol: itti timmitte loowdi/jiigol.
- Huutorgol: `make clean`
- Ittataa (so woodii):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Moƴƴugol: formate, ƴeewto, hesɗitin changelog, commit, tee push.
- Huutorgol: `make commit`
- Cariiɗe: ena hurmite Prettier (winndito), `make test`, `make test_i18n`; ɓeydii changelog so ena woodi diffe staged; puci to `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Moƴƴugol: hurminde ESLint e flat config.
- Huutorgol: `make eslint`

---

#### help {#mt-help}

- Moƴƴugol: dogtu caasiiɗe fof e cifagol daande gooto.
- Huutorgol: `make help`

---

#### lint {#mt-lint}

- Moƴƴugol: lint MailExtension huutoraade `web-ext`.
- Huutorgol: `make lint`
- Ciiffol: toŋkaa ko `sources/manifest_LOCAL.json` → `sources/manifest.json`; ɗartii ZIPs togtaama; tintine ɗi ngalaa dartinde koɗol.

---

#### menu {#mt-menu}

- Moƴƴugol: menyu jiyngol ngam suɓo caasorde Make e cuɓe cuɓaaɗe.
- Huutorgol: hurmin `make` tawa alaa huutoraaji.
- Ciiffol: so `whiptail` woodaani, menyu ina ruttu to `make help`.

---

#### pack {#mt-pack}

- Moƴƴugol: toggo ATN e LOCAL ZIPs (kañum ko `lint`).
- Huutorgol: `make pack`
- Tiɓɓe: ɓoostu yamre e ɗiiɗi `sources/manifest_*.json` hade pakegol.

---

#### prettier {#mt-prettier}

- Moƴƴugol: formate repo ɗoo to waɗde.
- Huutorgol: `make prettier`

#### prettier_check {#mt-prettier_check}

- Moƴƴugol: ƴeewto formate (woppataa winndito).
- Huutorgol: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Moƴƴugol: alias ngam `prettier`.
- Huutorgol: `make prettier_write`

---

#### test {#mt-test}

- Moƴƴugol: hurminde Prettier (winndito), ESLint, tee Vitest (gasgol so teeltinaama).
- Huutorgol: `make test`

#### test_i18n {#mt-test_i18n}

- Moƴƴugol: ƴeewte i18n e dow kelme add‑on e dokkitanɗe lowre.
- Huutorgol: `make test_i18n`
- Ena hurmite: `npm run test:i18n` e `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Moƴƴugol: fir kelme UI add‑on iwde EN to locales goɗɗe.
- Huutorgol: `make translation_app OPTS="--locales all|de,fr"`
- Ciiffol: teeŋtin ɓetol kiyi e keɓe‑maamaaji; winndito to `translation_app.log`. Ciŋko ɗo: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Moƴƴugol: fir dokkitanɗe lowre iwde `website/docs/*.md` to `website/i18n/<locale>/...`.
- ɓurɗo: `translate_web_docs_batch` (OpenAI Batch API)
  - Huutorgol (banngo): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legasi positional ena waɗi kadi: `OPTS="<doc|all> <lang|all>"`
- Jaaɓdugol: sos JSONL, aawto, hollu kala 30s, aawto njaltugol, winndito piille.
- Ɓeydugol: golle batch ena waawi ɗeeɓnude haa 24 nder ndee (per OpenAI batch window). Koŋke ena hollu sahre gollol e kala hollugol.
- Env: `OPENAI_API_KEY` (foti), ɓeydaaka `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (defte 24h), `BATCH_POLL_INTERVAL_MS`.
- Legasi: `translate_web_docs_sync`
  - Huutorgol (banngo): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legasi positional ena waɗi kadi: `OPTS="<doc|all> <lang|all>"`
- Jaaɓdugol: ɗaɓɓitanɗe sinkoron per‑pair (alanaa batch).
- Ciiffol: Pannaani jiytorde so `OPTS` moftaani. Mbaylaaji ɗiɗi ɓeɗɗu njogoytaa kod e inline code tee tawo front‑matter `id` wonaa taƴta; winndito to `translation_web_batch.log` (batch) walla `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Moƴƴugol: fir kelme UI lowre (duƴƴorde, naawbaar, puccu) iwde `website/i18n/en/code.json` to locales fof les `website/i18n/<locale>/code.json` (daaƴde `en`).
- Huutorgol: `make translate_web_index` walla `make translate_web_index OPTS="--locales de,fr [--force]"`
- Ɓetol: export `OPENAI_API_KEY` (ɓeydaaka: `OPENAI_MODEL=gpt-4o-mini`).
- Jaaɓdugol: ƴeewta ɓetol JSON, naattoy keɓe-curli, waɗa URLs ɗaaƴaaki, tee eti e duttine e duttine so ƴeewtagol woorta.

---

#### web_build {#mt-web_build}

- Moƴƴugol: toggo lowre dokkitanɗe to `website/build`.
- Huutorgol: `make web_build OPTS="--locales en|de,en|all"` (walla teelto `BUILD_LOCALES="en de"`)
- Cakkitol: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dependeeji: hurminde `npm ci` e `website/` tan so `website/node_modules/@docusaurus` woodaani.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Moƴƴugol: ƴeewtingol jokkol nde seerii.
- Huutorgol: `make web_build_linkcheck OPTS="--locales en|all"`
- Ciiffol: toggo to `tmp_linkcheck_web_pages`; winndito GH Pages `baseUrl` to `/`; skippa jokkole HTTP(S) boowɗe.

#### web_build_local_preview {#mt-web_build_local_preview}

- Moƴƴugol: jiygol gh‑pages local e ƴeewte/link‑check cuɓaaɗe.
- Huutorgol: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Jaaɓdugol: eti sarworde jiygol Node adan (`scripts/preview-server.mjs`, doŋgol `/__stop`), ruttu to `python3 -m http.server`; jaaɓna e 8080–8090; PID woni e `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Moƴƴugol: puci `website/build` to caggal `gh-pages`.
- Huutorgol: `make web_push_github`

Tiɓɓe: teelto `NPM=…` ngam waylude pakkaar maa huutoraaɗo e Makefile (defte ko `npm`).

---
