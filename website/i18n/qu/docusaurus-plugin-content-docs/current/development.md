---
id: development
title: 'Wiñakuy'
sidebar_label: 'Wiñakuy'
---

---

## Ruray Kamachi {#development-guide}

:::note Inglésllatam ch'iqllay; tikrakuna aywanku
Qillqakuna kunanyachiy **sapallan** `website/docs` (Inglés) nisqapi. `website/i18n/<locale>/…` nisqapi tikrakuna automáticuta paqarichisqa, hinallataq makiwan mana ch'iqllanaychu. Tikrakuna llamk'aykunata (`make translate_web_docs_batch` hina) llamk'achiy, llocalizadotaq willañiqikuna kunanyachinaykipaq.
:::

### Ñawpaq munasqakuna {#prerequisites}

- Node.js 22+ wan npm (Node 22wan qhawarisqa)
- Thunderbird 128 ESR utaq musuq (makiwan probarpaq)

---

### Proyektupa siq'i (hatun ñawpaq) {#project-layout-high-level}

- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: ñawpaq add-on kodin (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus docs (i18n `website/i18n/de/...` ukhunpi)

---

### Churay & Llamk'anakuna {#install-and-tooling}

- Root dependenciaskuna churay: `npm ci`
- Docs (uyariypaq): `cd website && npm ci`
- Targetkunata maskhay: `make help`

---

### Kawsaypi ruwakuy (web‑ext run) {#live-dev-web-ext}

- Utqaypa kutichiy Firefox Desktoppi (UI smoke‑tests sapallanpaq):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbirdpi purichiy (MailExtensionspaq aqllasqa):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tipkuna:
- Thunderbirdpa Error Console nisqata kichasqa kachay (Tools → Developer Tools → Error Console).
- MV3 event p'anqakuna qhipaman waqyasqa kachkan; kodeta hukinchawpaq add‑onta musuqmanta chaqna, utaq web‑extqa sapaqta automáticuta chaqnachun.
- Firefox‑sapaqmi aswanta hukninakunam kachkan; hinaspaqa Thunderbirdpi qatiyña, API equivalenciata qhawariy.
- Thunderbird binario ñan (qhawarikuqkunapaq):
- Linux: `thunderbird` (e.g., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Perfilpa sapallan chanin: Llamk'aypaq huk Thunderbirdda perfilta llamk'achiy, manan sapa p'unchaw llamk'aykita maqchurinaykipaq.

---

### Make tarjetakuna (alfabétikuta qatiq) {#make-targets-alphabetical}

Makefileqa común ruwakuy qatillaykuna standar churan. `make help` nisqata waqtaykama ruwariy, target sapaqpaq huk lineapi amaqonawan.

Tip: `make` targetmana rurayqa, aslla Whiptail menuta kichan target akllanankupaq.

| Target                                                   | Huk‑lineapi amaqonawan                                                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Lokal build/preview ruwayninakunata qichuy (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | Formateay, testkuna purichiy (i18n chaywan), changelog kunanyachiy, commit & push.             |
| [`eslint`](#mt-eslint)                                   | ESLintta purichiy flat configwan (`npm run -s lint:eslint`).                                   |
| [`help`](#mt-help)                                       | Llapan targetkunata sut'inchawan amaqonawanwan (ordenasqa) qillqay.                            |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/`pi (sami manifest; ZIPkuna qawachkuchkan; mana fatal).                  |
| [`menu`](#mt-menu)                                       | Interactivo menuta kichan target akllanaykipaq hinallataq akllanakuy argumento.                |
| [`pack`](#mt-pack)                                       | ATN & LOCAL ZIPkunata ruray (linterta purichin; packer scriptsa waqyay).                       |
| [`prettier`](#mt-prettier)                               | Repositorioqta kaypi formateay (qillqaykunata tikray).                                         |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check modopi (mana qillqan); mana allin formatoqa pantachin.                          |
| [`prettier_write`](#mt-prettier_write)                   | Alias `prettier`paq.                                                                           |
| [`test`](#mt-test)                                       | Prettier (qillqa), ESLint, chaymanta Vitest (coverage kasqa kaptinqa).                         |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑sapallan testkuna: add‑on placeholders/paridad + website paridad.                         |
| [`translate_app`](#mt-translation-app)                   | Alias `translation_app`paq.                                                                    |
| [`translation_app`](#mt-translation-app)                 | App UI simikunata tikray `sources/_locales/en/messages.json`manta.                             |
| [`translate_web_docs_batch`](#mt-translation-web)        | Website docskunata tikray OpenAI Batch API‑wan (aqllasqa).                                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | Website docskunata tikray sincrónicamente (legado, mana batch).                                |
| [`translate_web_index`](#mt-translation_web_index)       | Alias `translation_web_index`paq.                                                              |
| [`translation_web_index`](#mt-translation_web_index)     | Qallariq p'anqa/navbar/footer UI tikray (`website/i18n/en/code.json → .../<lang>/code.json`).  |
| [`web_build`](#mt-web_build)                             | Docskunata ruwachiy `website/build`man (sustenta `--locales` / `BUILD_LOCALES`).               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑safe link check (hawa HTTP[S] astawan saqichin).                                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokal gh‑pages preview; automáticuta 8080–8090pi servin; uyariykuna tests/link‑check nisqawan. |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`ta pusha `gh-pages` ramasman.                                                   |

Opcionespa sintaxis

- `make <command> OPTS="…"` nisqata llamk'ay opciones apachinaykipaq (comillakunawan qhaway). Kayman uraypi target sapaqpaq ruwanapaq ruwakuna qhawarichkan.

--

-

#### Localkunapaq build tipkuna {#locale-build-tips}

- Localkuna sapaqta ruwariy: `BUILD_LOCALES="en de"` nisqata churay utaq `OPTS="--locales en,de"` nisqata web targetkunaman apachiy.
- Huk lokalmanta ñawpaq qhawanaykipaq: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Ruray & Paqichiy {#build-and-package}

- ZIPkunata ruray: `make pack`
- Repo muyo patapi ATN hinallataq LOCAL ZIPkunata paqarichin (artifactsqa makiwan ama tikraychu)
- Tip: versiónta iskaypi kunanyachiy `sources/manifest_ATN.json` hinallataq `sources/manifest_LOCAL.json`pi, paqichinaykipaq.
- Makiwan churay (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → rurasqa ZIPta akllay

---

### Pruebas {#test}

- Llapan suite: `make test` (Vitest)
- Cobertura (uyariypaq):
- `npm i -D @vitest/coverage-v8`
- `make test` purichiy; `coverage/index.html` kichay HTML reportpaq
- i18n sapallan: `make test_i18n` (UI keys/placeholders/titles + website per‑locale per‑doc paridad id/title/sidebar_label qhawaywan)

---

### Depuración & Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Verbose logskunata kawsayninpi wakchay/qarquy:
- Activar: `messenger.storage.local.set({ debug: true })`
- Apagar: `messenger.storage.local.set({ debug: false })`
- Qillqakunaqa qillqakusqanku chay ñawinchay/sayachiy kutinpas.

---

### Docs (website) {#docs-website}

- Dev server: `cd website && npm run start`
- Sitio estático ruwariy: `cd website && npm run build`
- Make equivalentes (alfabétikuta): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ejemplokuna:
- EN sapallan, test/link‑check saqispa, mana push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Llapan localkuna, tests/link‑checkwan, chaymanta push: `make web_build_local_preview && make web_push_github`
- Qhapaq llamk'ayman, offline‑safe link checkta purichiy: `make web_build_linkcheck`.
- i18n: Inglésqa `website/docs/*.md` ukhun kawsan; Alemán tikrakunaqa `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ukhun.
- Maskhay: Algolia DocSearch ambiente variablekuna CI‑pi churakusqa kaptinqa (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), sitioq Algolia maskhayta llamk'an; manam kaptiqa maskhay lokalman kutin. Qallariq p'anqapi, `/` utaq `Ctrl+K` mañakuy maskhay k'itirata kichanapaq.

---

#### Qolla‑qonay (Donate) kutichiy ñan {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (hinallataq `/<locale>/donate`)
- Kawsaynin:
- Kunan rutaqa huk lokaltawan (e.g., `/de/donate`) kachkaptinqa, chayta llamk'an
- Mana chayqa, `navigator.languages` nisqamanta aswan allin tupaqta akllan konfiguradasqawan; chaymanaqa default localeman kutin
- Kayman kutichin:
- `en` → `/docs/donation`
- hukninakuna → `/<locale>/docs/donation`
- `useBaseUrl` nisqata llamk'an baseUrl allinta chaskinaykipaq
- Meta refresh + `noscript` t'inkita churaspa, fall‑back hina

---

---

#### Ñawpaq qhawariq tipkuna {#preview-tips}

- Node previewta allin qichunaykipaq: `http://localhost:<port>/__stop` kichay (`Local server started` ñawpaqta qillqasqa).
- Ima imagenaskuna MDX/JSXpi mana apachkaptin, `useBaseUrl('/img/...')` llamk'achiy sitioqpa `baseUrl`ta yuyachinaykipaq.
- Ñawpaq previewmi qallarin; chaymanta link check hamuqmi, mana hark'ay (hawa t'inkikuna p'akisqa kaptinpas previewqa mana saykuykachkan).
- Ejemplo preview URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” ñawpaq qillqasqapi qhawarin).
- Hawa t'inkikuna link‑checkpi: Ima hawa sitioskuna (e.g., addons.thunderbird.net) robotkuna maskhayta hark'an, 403 rikuchinqa. Previewqa qallarin; kaykunataqa ama phiñakuychu.

---

#### Website tikray {#translate-website}

Imakunata tikrakuyta atinki

- Website UI sapallan: qallariq p'anqa, navbar, footer, hinallataq huk UI simikuna. Docskunaqa kunanmi Inglés‑sapallan kachkan.

Maypita ch'iqllay

- `website/i18n/<locale>/code.json` ch'iqllay (`en` hina qhawariy). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` hina placeholdersqa imaraykuchus mana hukllachisqachu kachun.

Willañiqikunata paqarichiy utaq kunanyachiy

- Llapan localkunapaq q'ipi wiñachiq stubs paqarichiy: `npm --prefix website run i18n:stubs`
- Inglesmanta stubsqa hunt'achiy (musuq simikuna yapaspa qhipa): `npm --prefix website run i18n:stubs:force`
- Huk sapallan localepaq alternativa: `npx --prefix website docusaurus write-translations --locale <locale>`

Qallariq p'anqa/navbar/footer UI simikunata tikray (OpenAI)

- Hukk'ipa credencialkuna churay (shell utaq .env):
- `export OPENAI_API_KEY=sk-...`
- Uyariypaq: `export OPENAI_MODEL=gpt-4o-mini`
- Huk kutilla (llapan localkuna, en saqispa): `make translate_web_index`
- Kay localkunaman huch'uyachiy: `make translate_web_index OPTS="--locales de,fr"`
- Chaymi existente valoriskunata qhipaman qillqay: `make translate_web_index OPTS="--force"`

Chiqaqchay & kutichiy

- Tikray scriptsqa JSON ukhu ruranata chiqaqchachin, k'urkunawan (curly‑brace) placeholdersqa waqaychan, URLkuna mana hukllachisqa kachun.
- Chiqaqchayqa pantaspa, willakuywan 2 cutitaqmi kutichin, chaymanta existente valoriskunata qhispichin.

Lokaleykita ñawpaq qhawariy

- Dev server: `npm --prefix website run start`
- Kayman ayway: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Apachiy

- PR kichay ch'iqllasqa `code.json` willañiqikunawan. Hukllaña tikraykunata waqaychay, aslla pantallapa qillqasqata (screenshot) churay atipaspa.

---

### Seguridad & Configuración tipkuna {#security-and-configuration-tips}

- `sources/manifest.json` ama commit‑chaychu (buildqa huk ratupi paqarichin)
- `browser_specific_settings.gecko.id` estable qichuy, update chakanata waqaychanaykipaq

---

### Settings persistenciata {#settings-persistence}

- Allqay: Llapan usuariopa ajusteskunan `storage.local` ukhun kawsanku, hinallataq add‑on kunan‑kunanchaqtinkama qhispichasqalla kawsanku.
- Instalación: Predeterminado chaninakunam churasqa, llavesqa huch'uy (undefined) kaptinlla.
- Kunanyachiy: Migraciónqa llaves huch'uykuna sapallan hunt'achin; kachkasqa valoriskunataqa manaraqmi tikrachkanchu.
- Schema chinpu: `settingsVersion` (kunan `1`).
- Llavekuna hinallataq predeterminadokuna:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Código: qhaway `sources/background.js` → `initializeOrMigrateSettings()` hinallataq `SCHEMA_VERSION`.

Ruwakuy llamk'ay (musuq ajustes yapay)

- `SCHEMA_VERSION` nisqata wiñachiy `sources/background.js` ukhun.
- Musuq llave + predeterminadoqa yapay `DEFAULTS` objetoman `initializeOrMigrateSettings()` ukhun.
- “only‑if‑undefined” nisqa ruwanawan defaults seed‑chay; kachkasqa valoriskunata ama tikraychu.
- Ajustesqa kay usuariopa qhawanaypaqmi kaptin, `sources/options.js` ukhun ch'aninchay, simikunata llocalizachispa.
- Testkuna yapay/hunt'achiy (qhaway `tests/background.settings.migration.test.js`).

Makiwan probar tipkuna

- Musuq instala simulasiyuta ruwachiy: extensiónpa datapa q'ipinta pichay utaq musuq perfilwan qallariy.
- Kunanyachiy simulasiyuta ruwachiy: `settingsVersion`ta `0`man ch'iqllay `storage.local` ukhun, chaymanta musuqmanta chaqna; kachkasqa valoriskuna mana tikrasqachu kachkanku, llaves huch'uykuna sapallan yapasqama.

---

### Solución de problemas {#troubleshooting}

- Thunderbird 128 ESR utaq musuq kananpaq qhawariy
- Runtime ch'iqllakunaqa Error Consolepi qhaway
- Almacenadasqa ajustesqa mana allin ruwanaykipaq rikch'akuptin, Thunderbirdta qhichuy chaymanta yapamanta qallariy. (Thunderbirdqa sesionkunapaq estado waqaychawan; musuq qallariyqa musuq ajusteskunata apachin).

---

### CI & Cobertura {#ci-and-coverage}

- GitHub Actions (`CI — Tests`)qa vitestta purichin cobertura umbralniykuwan (85% lines/functions/branches/statements). Umbralqa mana chaskisqa kaptinqa, llamk'ayqa pantan.
- Workflowqa artifact `coverage-html`ta uppaqarin HTML reportwan; run p'anqamanta uraykuy (Actions → huk ñawpaq run → Artifacts).

---

### Yanapay {#contributing}

- Qhaway CONTRIBUTING.md ramas/commit/PR pautakunapaq
- Tip: Huk Thunderbirdda desarrollo perfilta ruway, qhawariypaq, sapa p'unchaw perfilniyta ama maqchurinaykipaq.

---

### Tikraykuna

- Hatun “all → all” tikray llamk'aykuna suni, k'achallachu kay. Huch'uymanta qallariy (e.g., wakin docskuna hinallataq 1–2 localkuna), qhaway, chaymanta yapay.

---

- Kutichiy politika: tikray llamk'aykuna 3 cuti kutichin API pantasqakunapi, backoff exponencialniyuq; qhaway `scripts/translate_web_docs_batch.js` hinallataq `scripts/translate_web_docs_sync.js`.

Docspaq pantallapa capturakuna

- Imaymana imagenakunata waqaychay `website/static/img/` ukhun.
- MD/MDXpi kayninta qhawariy `useBaseUrl('/img/<filename>')` nisqawan, ñanankuna sitioqpa `baseUrl`wan allinta llamk'anankupaq.
- `website/static/img/` ukhun imagenata yapaspa utaq sutichaykuspa, llapan t'inkikuna `useBaseUrl('/img/…')`taqa todavía llamk'achkanku chaymanta lokal previewpi ruranankuchu qhaway.
  Favicons

- Multi‑size `favicon.ico`qa automáticuta rurasqa llapan build ñanninkunapi (Make + scripts) `website/scripts/build-favicon.mjs`wan.
- Mana makiwan ruwanakuchu; `icon-*.png` kunanyachiyllan aswan allin.
  Qhaway tip

- Front‑matter `id`ta ama tikraychu docs tikrasqapi; `title` hinallataq `sidebar_label`lla tikray kaykunam kaptin.

#### clean {#mt-clean}

- Tarpuy: lokal build/preview ruwayninakunata qichuy.
- Llamk'ay: `make clean`
- Qichun (kaptin):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tarpuy: formateay, test, changelog kunanyachiy, commit, hinallataq push.
- Llamk'ay: `make commit`
- Nisqapi: Prettierta (qillqa), `make test`, `make test_i18n` purichin; changelogta yapay musuq diffkuna staged kaptin; `origin/<branch>`man push.

---

#### eslint {#mt-eslint}

- Tarpuy: ESLintta flat configwan purichiy.
- Llamk'ay: `make eslint`

---

#### help {#mt-help}

- Tarpuy: llapan targetkunata huk‑linea amaqonawanwan sut'ichiy.
- Llamk'ay: `make help`

---

#### lint {#mt-lint}

- Tarpuy: MailExtensionta lint‑chay `web-ext`wan.
- Llamk'ay: `make lint`
- Notaskuna: `sources/manifest_LOCAL.json` → `sources/manifest.json` sapallan k'achkan; rurasqa ZIPkunata saqichin; warninqkunaqa manam pipeline‑ta pantachinku.

---

#### menu {#mt-menu}

- Tarpuy: menuta interactivo kichan Make target akllanaykipaq hinallataq ukhu argumento.
- Llamk'ay: `make`ta mana argumentowan purichiy.
- Notaskuna: `whiptail` mana kachkaptinqa, menuta `make help`man churan.

---

#### pack {#mt-pack}

- Tarpuy: ATN hinallataq LOCAL ZIPkunata ruwachiy (`lint`qa reqsi).
- Llamk'ay: `make pack`
- Tip: versiónkunata iskaypi wiñachiy `sources/manifest_*.json` ñawpaq, paqichinaykipaq.

---

#### prettier {#mt-prettier}

- Tarpuy: repositorio ukhunpi formateay.
- Llamk'ay: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tarpuy: formato qhaway (mana qillqan).
- Llamk'ay: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tarpuy: `prettier`paq alias.
- Llamk'ay: `make prettier_write`

---

#### test {#mt-test}

- Tarpuy: Prettier (qillqa), ESLint, chaymanta Vitest (coverage kasqa kaptinqa).
- Llamk'ay: `make test`

#### test_i18n {#mt-test_i18n}

- Tarpuy: i18n‑qhawasqa testkuna add‑on simikuna hinallataq website docskunapaq.
- Llamk'ay: `make test_i18n`
- Purichin: `npm run test:i18n` hinallataq `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tarpuy: add‑on UI simikunata tikray ENmanta huk localkunaman.
- Llamk'ay: `make translation_app OPTS="--locales all|de,fr"`
- Notas: llave k'askikunata hinallataq placeholdersqa waqaychan; `translation_app.log`man qillqan; script form: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tarpuy: website docskunata tikray `website/docs/*.md`manta `website/i18n/<locale>/...`man.
- Aqllasqa: `translate_web_docs_batch` (OpenAI Batch API)
  - Llamk'ay (wank'a): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legado posicionalqa hukllaña kasqan: `OPTS="<doc|all> <lang|all>"`
- Kawsaynin: JSONL ruwachin, uppaqarin, 30s sapa kuti qhawachin, uhurmanta uraykachin, willañiqikunata qillqachin.
- Nota: batch llamk'ayqa 24 horas‑kamaqa hamuq kachkan (OpenAI batch ventana nisqamanta). Consolaqa sapa qhawachisqapi pacha lluqsiyta rikuchin.
- Ambiente: `OPENAI_API_KEY` (reqsi), opcional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legado: `translate_web_docs_sync`
  - Llamk'ay (wank'a): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legado posicionalqa hukllaña kasqan: `OPTS="<doc|all> <lang|all>"`
- Kawsaynin: par sapallan sincrónicuta mañakuykuna (mana batch qhawariy).
- Notas: `OPTS` saqispaqa, interactivo tapukuykuna; iskay modokunapiqa code blocks/inline code waqaychasqa kachkan, front‑matter `id` mana tikrasqa; `translation_web_batch.log` (batch) utaq `translation_web_sync.log` (sync)man qillqan.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tarpuy: website UI simikunata tikray (qallariq p'anqa, navbar, footer) `website/i18n/en/code.json`manta llapan localkunaman `website/i18n/<locale>/code.json` ukhunpi (`en` saqispa).
- Llamk'ay: `make translate_web_index` utaq `make translate_web_index OPTS="--locales de,fr [--force]"`
- Reqsisqa: `OPENAI_API_KEY` apachiy (opcional: `OPENAI_MODEL=gpt-4o-mini`).
- Kawsaynin: JSON ukhu ruranata chiqaqchachin, k'urkunawan placeholders waqaychan, URLkuna mana tikrachkan, hinallataq chiqaqchay pantasqapi willakuywan kutichin.

---

#### web_build {#mt-web_build}

- Tarpuy: docs sitioqta ruwachiy `website/build`man.
- Llamk'ay: `make web_build OPTS="--locales en|de,en|all"` (utaq `BUILD_LOCALES="en de"`ta churay)
- Ukhupi: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Depkuna: `npm ci`ta purichin `website/` ukhun, `website/node_modules/@docusaurus` mana kachkaptin.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tarpuy: offline‑safe link check.
- Llamk'ay: `make web_build_linkcheck OPTS="--locales en|all"`
- Notas: `tmp_linkcheck_web_pages`man ruwachin; GH Pages `baseUrl`ta `/`man ñit'in; hawa HTTP(S) t'inkikunata saqichin.

#### web_build_local_preview {#mt-web_build_local_preview}

- Tarpuy: lokal gh‑pages preview opcional tests/link‑checkwan.
- Llamk'ay: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Kawsaynin: ñawpaqmi Node preview serverta yachachin (`scripts/preview-server.mjs`, `/__stop`ta sustentan), ama kaptin `python3 -m http.server`man kutin; 8080–8090pi servin; PID `web-local-preview/.server.pid` ukhun.

#### web_push_github {#mt-web_push_github}

- Tarpuy: `website/build`ta pusha `gh-pages` ramasman.
- Llamk'ay: `make web_push_github`

Tip: `NPM=…`ta churay Makefile llamk'achiq paquete manejadorta t'aqllanaykipaq (defaultqa `npm`).
