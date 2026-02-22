---
id: development
title: 'Chitukuko'
sidebar_label: 'Chitukuko'
---

---

## Kalozera wa Chitukuko {#development-guide}

:::note Sinthani Chingerezi chokha; matanthauzidwe amasamukira
Sinthani zikalata zokha pansi pa `website/docs` (Chingerezi). Matanthauzidwe pansi pa `website/i18n/<locale>/…` amapangidwa ndipo sayenera kusinthidwa pamanja. Gwiritsani ntchito ntchito za kumasulira (monga `make translate_web_docs_batch`) kuti musinthe zomwe zamasuliridwa.
:::

### Zofunika Kaye {#prerequisites}

- Node.js 22+ ndi npm (zayezedwa ndi Node 22)
- Thunderbird 128 ESR kapena yapamwamba (poyezetsa pamanja)

---

### Kapangidwe ka Polojekiti (pamlingo wapamwamba) {#project-layout-high-level}

- Muzu: script yopakira `distribution_zip_packer.sh`, zikalata, zithunzi za chophimba
- `sources/`: khodi ya chowonjezera chachikulu (background, zosankha/popup UI, manifests, icons)
- `tests/`: gulu la mayeso a Vitest
- `website/`: zikalata za Docusaurus (ndi i18n pansi pa `website/i18n/de/...`)

---

### Kuyika ndi Zida {#install-and-tooling}

- Ikani zodalira za muzu: `npm ci`
- Zikalata (zosankha): `cd website && npm ci`
- Onani ma target: `make help`

---

### Kukonza Pomwepo (web‑ext run) {#live-dev-web-ext}

- Kuzungulira mwachangu mu Firefox Desktop (UI smoke‑tests okha):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Yendetsani mu Thunderbird (yabwino pa MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Maupangiri:
- Sungani Error Console ya Thunderbird yatseguka (Tools → Developer Tools → Error Console).
- Masamba a chochitika a MV3 amasiyidwa akakhala osagwiritsidwa ntchito; tsitsaninso (reload) chowonjezera mutasintha khodi, kapena lolani web‑ext izidzitsitsanso yokha.
- Makhalidwe ena a Firefox-okha amasiyana; nthawi zonse onetsetsani mu Thunderbird kuti API zili zofanana.
- Malo a binary a Thunderbird (zitsanzo):
- Linux: `thunderbird` (mwachitsanzo, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Kulekanitsa mbiri: Gwiritsani ntchito mbiri (profile) ina ya Thunderbird pokonza kuti musakhudze zoikamo zanu za tsiku ndi tsiku.

---

### Ma Target a Make (Mwa zilembo) {#make-targets-alphabetical}

Makefile imakhazikitsa njira zofala za kukonza. Yendetsani `make help` nthawi iliyonse kuti mupeze chidule cha mzere umodzi cha target iliyonse.

Upangiri: kuyendetsa `make` popanda target kumatsegula menyu ya Whiptail yosavuta yosankha target.

| Cholinga                                                 | Kufotokozera kwa mzere umodzi                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Chotsani zotuluka za kumanga/preview zakomweko (tmp/, web-local-preview/, website/build/).       |
| [`commit`](#mt-commit)                                   | Kukonza mawonekedwe, kuthamanga mayeso (kuphatikiza i18n), kusintha changelog, commit & push.    |
| [`eslint`](#mt-eslint)                                   | Thamangitsani ESLint kudzera mu flat config (`npm run -s lint:eslint`).                          |
| [`help`](#mt-help)                                       | Lembedwenso ma target onse ndi zolemba za mzere umodzi (zosanjikizidwa).                         |
| [`lint`](#mt-lint)                                       | web‑ext lint pa `sources/` (manifest yakanthawi; imanyalanyaza ZIPs; sizilephera).               |
| [`menu`](#mt-menu)                                       | Menyu yolumikizana yosankhira target ndi ma argument osankha.                                    |
| [`pack`](#mt-pack)                                       | Mangani ATN & LOCAL ZIPs (imathamanga linter; imayitana script ya packer).                       |
| [`prettier`](#mt-prettier)                               | Konzekeretsani repository pomwepo (imalemba zosintha).                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier mu check mode (palibe kulemba); imalephera ngati kufomati kofunikira.                   |
| [`prettier_write`](#mt-prettier_write)                   | Dzina lina la `prettier`.                                                                        |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, kenako Vitest (coverage ngati yakonzedwa).                             |
| [`test_i18n`](#mt-test_i18n)                             | Mayeso a i18n okha: ma placeholders/parity a chowonjezera + parity ya webusaiti.                 |
| [`translate_app`](#mt-translation-app)                   | Dzina lina la `translation_app`.                                                                 |
| [`translation_app`](#mt-translation-app)                 | Tanthauzirani mawu a UI a app kuchokera ku `sources/_locales/en/messages.json`.                  |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tanthauzirani zikalata za webusaiti kudzera mu OpenAI Batch API (zovomerezeka).                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tanthauzirani zikalata za webusaiti nthawi yomweyo (yakale, osati batch).                        |
| [`translate_web_index`](#mt-translation_web_index)       | Dzina lina la `translation_web_index`.                                                           |
| [`translation_web_index`](#mt-translation_web_index)     | Tanthauzirani UI ya homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Mangani zikalata ku `website/build` (imathandiza `--locales` / `BUILD_LOCALES`).                 |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kuona maulalo kopanda intaneti kotetezeka (imasiyira kutali HTTP[S]).                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Preview ya gh‑pages yakomweko; imatumikira yokha pa 8080–8090; mayeso/kuona-maulalo zosankha.    |
| [`web_push_github`](#mt-web_push_github)                 | Kankhirani `website/build` ku nthambi ya `gh-pages`.                                             |

Syntax for options

- Gwiritsani ntchito `make <command> OPTS="…"` kupereka zosankha (ma quotes amalimbikitsidwa). Target iliyonse pansipa ikusonyeza momwe imagwiritsidwira ntchito.

--

-

#### Malangizo a kumanga ma locale {#locale-build-tips}

- Mangani gawo la ma locale: ikani `BUILD_LOCALES="en de"` kapena perekani `OPTS="--locales en,de"` kumatarget a webu.
- Onetsani locale inayake: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Kumanga & Kupakira {#build-and-package}

- Mangani ZIPs: `make pack`
- Imapanga ATN ndi LOCAL ZIPs mu muzu wa repo (osasintha zotuluka pamanja)
- Upangiri: sinthani version mu `sources/manifest_ATN.json` ndi `sources/manifest_LOCAL.json` onse musanapakire
- Kuyika pamanja (dev): Thunderbird → Tools → Add‑ons and Themes → giya → Install Add‑on From File… → sankhani ZIP yomangidwa

---

### Mayeso {#test}

- Gulu lonse: `make test` (Vitest)
- Coverage (zosankha):
- `npm i -D @vitest/coverage-v8`
- Thamangani `make test`; tsegulani `coverage/index.html` kuti muwone lipoti la HTML
- i18n okha: `make test_i18n` (ma keys a UI/placeholders/mutu + kufanana kwa webusaiti pa locale iliyonse ndi doc iliyonse ndi mayendedwe a id/title/sidebar_label)

---

### Kukonza Zovuta & Zolemba (Logs) {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Tsegula/tseka ma log atsatanetsatane pakamayenda:
- Yatsani: `messenger.storage.local.set({ debug: true })`
- Letsani: `messenger.storage.local.set({ debug: false })`
- Ma log amaoneka mukamalemba/kutumiza mayankho

---

### Zikalata (webusaiti) {#docs-website}

- Seva ya chitukuko: `cd website && npm run start`
- Mangani tsamba lokhazikika: `cd website && npm run build`
- Zofanana mu Make (mwa zilembo): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Zitsanzo za kugwiritsa ntchito:
- EN yokha, dulani mayeso/link‑check, palibe push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Ma locale onse, ndi mayeso/link‑check, kenako push: `make web_build_local_preview && make web_push_github`
- Musanatulutse, yendetsani kuwona maulalo kopanda intaneti kotetezeka: `make web_build_linkcheck`.
- i18n: Chingerezi chili mu `website/docs/*.md`; matanthauzidwe a Chijeremani ali mu `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Zosaka: Ngati ma env vars a Algolia DocSearch akhazikitsidwa mu CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), tsambalo limagwiritsa ntchito kusaka kwa Algolia; apo ayi limabwerera ku kusaka kwa m'deralo. Pa tsamba loyamba, dinani `/` kapena `Ctrl+K` kuti mutsegule bokosi losakira.

---

#### Njira yotembenuza zopereka {#donate-redirect}

- `website/src/pages/donate.js`
- Njira: `/donate` (ndi `/<locale>/donate`)
- Makhalidwe:
- Ngati njira yapano ili ndi locale (mwachitsanzo, `/de/donate`), gwiritsani ntchito imeneyo
- Apo ayi, sankhani yomwe imafanane bwino kuchokera ku `navigator.languages` poyerekezera ndi ma locale okonzedwa; bwererani ku locale yokhazikika
- Imatembenuza ku:
- `en` → `/docs/donation`
- ena → `/<locale>/docs/donation`
- Imagwiritsa ntchito `useBaseUrl` kuti isamalire baseUrl moyenera
- Imaphatikizapo meta refresh + ulalo wa `noscript` ngati zosunga zobwezeretsera

---

---

#### Malangizo a Preview {#preview-tips}

- Imitsani preview ya Node bwinobwino: tsegulani `http://localhost:<port>/__stop` (imasindikizidwa pambuyo pa `Local server started`).
- Ngati zithunzi sizikukweza mu MDX/JSX, gwiritsani ntchito `useBaseUrl('/img/...')` kuti mulemekeze `baseUrl` ya tsamba.
- Preview imayamba kaye; kuwona maulalo kumathamanga pambuyo pake ndipo sikulepheretsa (maulalo akunja osweka sadzayimitsa preview).
- Chitsanzo cha preview URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (imasindikizidwa pambuyo pa “Local server started”).
- Maulalo akunja mu link‑check: Mawebusayiti ena akunja (mwachitsanzo, addons.thunderbird.net) amalepheretsa ma crawler okhaokha ndipo angasonyeze 403 mu link checks. Preview imayambabe; izi n’zotetezeka kuziwanyoza.

---

#### Tanthauzirani Webusaiti {#translate-website}

Zomwe mungatanthauzire

- UI ya webusaiti yokha: homepage, navbar, footer, ndi mawu ena a UI. Zokhudza zikalata zimakhalabe Chingerezi chokha panopa.

Kumene musinthe

- Sinthani `website/i18n/<locale>/code.json` (gwiritsani `en` ngati chitsanzo). Siyani ma placeholders ngati `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` osasinthidwa.

Pangani kapena sinthitsani mafayilo

- Pangani ma stub osoweka a ma locale onse: `npm --prefix website run i18n:stubs`
- Lembanso ma stub kuchokera ku Chingerezi (mutawonjezera mawu atsopano): `npm --prefix website run i18n:stubs:force`
- Njira ina ya locale imodzi: `npx --prefix website docusaurus write-translations --locale <locale>`

Tanthauzirani mawu a UI a homepage/navbar/footer (OpenAI)

- Khazikitsani zikalata (credentials) kamodzi (mu shell kapena .env):
- `export OPENAI_API_KEY=sk-...`
- Zosankha: `export OPENAI_MODEL=gpt-4o-mini`
- Nthawi imodzi (ma locale onse, dulani en): `make translate_web_index`
- Chepetsani ku ma locale enieni: `make translate_web_index OPTS="--locales de,fr"`
- Lembanso (overwrite) ma values alipo kale: `make translate_web_index OPTS="--force"`

Kutsimikiza & kuyeseranso

- Script ya kumasulira imatsimikizira mawonekedwe a JSON, imasunga ma placeholders a curly‑brace, ndipo imatsimikizira kuti ma URL sanasinthe.
- Ikalephera kutsimikiza, imayesanso ndi mayankho mpaka nthawi 2 isanasiye ma values alipo.

Onani preview ya locale yanu

- Seva ya chitukuko: `npm --prefix website run start`
- Pitani ku `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Kupereka

- Tsegulani PR ndi fayilo(`code.json`) yosinthidwa. Sungani zosintha kukhala zochepa ndipo ikani chithunzi chaching'ono (screenshot) ngati n'kotheka.

---

### Malangizo a Chitetezo & Makonzedwe {#security-and-configuration-tips}

- Osachita commit `sources/manifest.json` (imapangidwa kwakanthawi ndi build)
- Sungani `browser_specific_settings.gecko.id` yokhazikika kuti musunge njira yosinthira (update channel)

---

### Kusungika kwa Zikhazikiko {#settings-persistence}

- Kusungirako: Zikhazikiko zonse za wogwiritsa zimakhala mu `storage.local` ndipo zimapitiriza ngakhale mwa zosintha za chowonjezera.
- Kuyika: Zokhazikika zimayikidwa pokhapokha pamene kiyi wosowa kwathunthu (undefined).
- Kusinthidwa: Kusamutsidwa (migration) kumadzaza makiyi osowa okha; ma values alipo sagwedezedwa.
- Chizindikiro cha schema: `settingsVersion` (pakadali pano `1`).
- Makiyi ndi zokhazikika:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Khodi: onani `sources/background.js` → `initializeOrMigrateSettings()` ndi `SCHEMA_VERSION`.

Ntchito ya chitukuko (kuwonjezera kasinthidwe katsopano)

- Onjezani `SCHEMA_VERSION` mu `sources/background.js`.
- Onjezani kiyi watsopano + default ku chinthu (`DEFAULTS`) mu `initializeOrMigrateSettings()`.
- Gwiritsani lamulo la “only-if-undefined” mukamabzala ma default; musalembe pamwamba pa ma values alipo.
- Ngati kasinthidwe kawoawoneka kwa wogwiritsa, muzilumikiza mu `sources/options.js` ndikuonjezera mawu omasuliridwa.
- Onjezani/sinthani mayeso (onani `tests/background.settings.migration.test.js`).

Maupangiri a kuyesa pamanja

- Yerekezani kuyika kwatsopano: chotsani data dir ya extension kapena yambitsani ndi profile yatsopano.
- Yerekezani kusintha: ikani `settingsVersion` kukhala `0` mu `storage.local` ndiyeno tsitsaninso; tsimikizirani kuti ma values alipo sanasinthe ndipo makiyi osowa okha awonjezedwa.

---

### Kukonza Zovuta {#troubleshooting}

- Onetsetsani kuti Thunderbird ndi 128 ESR kapena yapamwamba
- Gwiritsani Error Console pa mavuto a pamene ikuyenda
- Ngati zikhazikiko zosungidwa zikuwoneka kuti sizikugwira bwino, yambitsaninso Thunderbird ndiyesenso. (Thunderbird imatha kusunga state pakati pa masessiyo; kuyambitsanso kumatsimikizira kuti zikhazikiko zatsopano zayikidwa.)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) imathamanga vitest ndi milingo ya coverage (85% mizere/ntchito/mabranche/ma statement). Ngati milingo siyakwaniritsidwa, ntchito imalephera.
- Workflow imakwezera chinthu `coverage-html` chokhala ndi lipoti la HTML; tsitsani kuchokera patsamba la run (Actions → latest run → Artifacts).

---

### Kuthandiza (Contributing) {#contributing}

- Onani CONTRIBUTING.md pa malangizo a branch/commit/PR
- Upangiri: Pangani mbiri ya chitukuko ya Thunderbird yosiyana poyesa kuti musakhudze mbiri yanu ya tsiku ndi tsiku.

---

### Matanthauzidwe

- Kuyendetsa ntchito zazikulu za kumasulira “all → all” kungakhale kochepa liwiro komanso kodula. Yambani ndi gawo laling'ono (mwachitsanzo, zikalata zochepa ndi ma locale 1–2), onaninso zotsatira, kenako kwaniritsani.

---

- Ndondomeko ya kuyeseranso: ntchito za kumasulira zimayeseranso mpaka katatu ndi exponential backoff pa zolakwika za API; onani `scripts/translate_web_docs_batch.js` ndi `scripts/translate_web_docs_sync.js`.

Zithunzi za zikalata

- Sungani zithunzi pansi pa `website/static/img/`.
- Tchulani mu MD/MDX kudzera mu `useBaseUrl('/img/<filename>')` kuti njira (paths) zigwire ntchito ndi `baseUrl` ya tsamba.
- Mukawonjezera kapena kusintha mayina a zithunzi pansi pa `website/static/img/`, tsimikizirani kuti ma reference onse akugwiritsa ntchito `useBaseUrl('/img/…')` ndipo akuoneka mu preview yakomweko.
  Favicons

- Multi‑size `favicon.ico` imapangidwa yokha m'misewu yonse ya build (Make + zolemba) kudzera mu `website/scripts/build-favicon.mjs`.
- Palibe sitepe pamanja yofunika; kusintha `icon-*.png` kokha ndikokwanira.
  Upangiri wa kuunikanso

- Sungani front‑matter `id` yosasinthidwa mu zikalata zomasuliridwa; tanthauzirani kokha `title` ndi `sidebar_label` zikapezeka.

#### clean {#mt-clean}

- Cholinga: kuchotsa zotuluka za kumanga/preview zakomweko.
- Kagwiritsidwe: `make clean`
- Imachotsa (ikapezeka):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Cholinga: kufomati, kuyesa, kusintha changelog, kuchita commit, ndi kukankha (push).
- Kagwiritsidwe: `make commit`
- Zambiri: imathamanga Prettier (write), `make test`, `make test_i18n`; imawonjezera changelog ikakhala pali staged diffs; imakankha ku `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Cholinga: kuthamanga ESLint kudzera mu flat config.
- Kagwiritsidwe: `make eslint`

---

#### help {#mt-help}

- Cholinga: kulemba ma target onse ndi zolemba za mzere umodzi.
- Kagwiritsidwe: `make help`

---

#### lint {#mt-lint}

- Cholinga: lint ya MailExtension pogwiritsa ntchito `web-ext`.
- Kagwiritsidwe: `make lint`
- Zindikirani: imakopera kwakanthawi `sources/manifest_LOCAL.json` → `sources/manifest.json`; imanyalanyaza ZIPs zomangidwa; machenjezo saletsa pipeline.

---

#### menu {#mt-menu}

- Cholinga: menyu yolumikizana posankha target ya Make ndi ma argument osankha.
- Kagwiritsidwe: yendetsani `make` popanda ma argument.
- Zindikirani: ngati `whiptail` ilibe, menyu imabwerera ku `make help`.

---

#### pack {#mt-pack}

- Cholinga: kumanga ATN ndi LOCAL ZIPs (imatengera `lint`).
- Kagwiritsidwe: `make pack`
- Upangiri: onjezerani ma versions mu `sources/manifest_*.json` onse musanapakire.

---

#### prettier {#mt-prettier}

- Cholinga: kufomati repo pomwepo.
- Kagwiritsidwe: `make prettier`

#### prettier_check {#mt-prettier_check}

- Cholinga: kutsimikizira kufomati (palibe kulemba).
- Kagwiritsidwe: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Cholinga: dzina lina la `prettier`.
- Kagwiritsidwe: `make prettier_write`

---

#### test {#mt-test}

- Cholinga: kuthamanga Prettier (write), ESLint, kenako Vitest (coverage ngati yakhazikitsidwa).
- Kagwiritsidwe: `make test`

#### test_i18n {#mt-test_i18n}

- Cholinga: mayeso a i18n pa mawu a chowonjezera ndi zikalata za webusaiti.
- Kagwiritsidwe: `make test_i18n`
- Imathamanga: `npm run test:i18n` ndi `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Cholinga: kumasulira mawu a UI a chowonjezera kuchokera ku EN kupita ku ma locale ena.
- Kagwiritsidwe: `make translation_app OPTS="--locales all|de,fr"`
- Zindikirani: imasunga kapangidwe ka makiyi ndi ma placeholders; imalemba ma log ku `translation_app.log`. Mtundu wa script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Cholinga: kumasulira zikalata za webusaiti kuchokera ku `website/docs/*.md` kupita ku `website/i18n/<locale>/...`.
- Zovomerezeka: `translate_web_docs_batch` (OpenAI Batch API)
  - Kagwiritsidwe (mabendera): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional ndi yolandiridwabe: `OPTS="<doc|all> <lang|all>"`
- Makhalidwe: imapanga JSONL, imakwezera, imayang'ana nthawi iliyonse 30s, imatsitsa zotsatira, imalemba mafayilo.
- Zindikirani: ntchito ya batch ingatenge mpaka maola 24 kuti ithe (malinga ndi batch window ya OpenAI). Console imasonyeza nthawi yapita pa poll iliyonse.
- Env: `OPENAI_API_KEY` (yofunika), zosankha `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Kagwiritsidwe (mabendera): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional ikadalandiridwa: `OPTS="<doc|all> <lang|all>"`
- Makhalidwe: zofunsira pa awiriawiri nthawi yomweyo (palibe kuphatikiza kwa batch).
- Zindikirani: Ma promu ovuta amagwira ntchito `OPTS` ikasiyidwa. Njira zonse zimasunga ma code blocks/inline code ndikusunga front‑matter `id` yosasintha; ma log amapita ku `translation_web_batch.log` (batch) kapena `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Cholinga: kumasulira mawu a UI a webusaiti (homepage, navbar, footer) kuchokera ku `website/i18n/en/code.json` kupita ku ma locale onse pansi pa `website/i18n/<locale>/code.json` (kupatula `en`).
- Kagwiritsidwe: `make translate_web_index` kapena `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zofunikira: export `OPENAI_API_KEY` (zosankha: `OPENAI_MODEL=gpt-4o-mini`).
- Makhalidwe: imatsimikizira kapangidwe ka JSON, imasunga ma placeholders a curly‑brace, imasunga ma URL osasinthidwa, ndipo imayeseranso ndi mayankho pa zolakwika za kutsimikizira.

---

#### web_build {#mt-web_build}

- Cholinga: kumanga tsamba la zikalata ku `website/build`.
- Kagwiritsidwe: `make web_build OPTS="--locales en|de,en|all"` (kapena ikani `BUILD_LOCALES="en de"`)
- Zamkati: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Zodalira: imathamanga `npm ci` mu `website/` pokhapokha `website/node_modules/@docusaurus` ikasowa.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Cholinga: kuwona maulalo kopanda intaneti kotetezeka.
- Kagwiritsidwe: `make web_build_linkcheck OPTS="--locales en|all"`
- Zindikirani: imamangira ku `tmp_linkcheck_web_pages`; imalemba bwino GH Pages `baseUrl` kukhala `/`; imasiyira maulalo a HTTP(S) akutali.

#### web_build_local_preview {#mt-web_build_local_preview}

- Cholinga: preview ya gh‑pages yakomweko yokhala ndi mayeso/link‑check zosankha.
- Kagwiritsidwe: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Makhalidwe: imayesa seva ya preview ya Node kaye (`scripts/preview-server.mjs`, imathandiza `/__stop`), kenako imabwerera ku `python3 -m http.server`; imatumikira pa 8080–8090; PID ili pa `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Cholinga: kukankha `website/build` ku nthambi ya `gh-pages`.
- Kagwiritsidwe: `make web_push_github`

Upangiri: ikani `NPM=…` kuti musinthe package manager yomwe imagwiritsidwa ntchito ndi Makefile (default `npm`).

---
