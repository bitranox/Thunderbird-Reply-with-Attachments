---
id: development
title: 'Yokkute'
sidebar_label: 'Tekki'
---

---

## Tali Sartu (Development) {#development-guide}

:::note Soppi ci Angale rekk; yiwu yi dinaa siiw
Yeesal dokumentaasiyoŋ bi ci `website/docs` (English) rekk. Tekki yi ci `website/i18n/<locale>/…` dañu leen sos, bul leen soppi ak loxo. Jëfandikoo njëf-lii yiir (misaal, `make translate_web_docs_batch`) ngir yeesal mbind mi ci làkk yi.
:::

### Li wara nekk ci kanam {#prerequisites}

- Node.js 22+ ak npm (test ak Node 22)
- Thunderbird 128 ESR walla yu bees (ngir test manual)

---

### Tànneefu Proje (kawe) {#project-layout-high-level}

- Root: script bu pakk `distribution_zip_packer.sh`, docs, natali-kaan
- `sources/`: code bu add‑on bi (background, UI bu options/popup, manifests, icons)
- `tests/`: xibaaru Vitest
- `website/`: docs Docusaurus (ak i18n ci biir `website/i18n/de/...`)

---

### Instalaasiyoŋ ak Jumtukaay yi {#install-and-tooling}

- Install dep yi ci root: `npm ci`
- Docs (fal): `cd website && npm ci`
- Seet targets yi: `make help`

---

### Sartu bu Yees (web‑ext run) {#live-dev-web-ext}

- Takku gaaw ci Firefox Desktop (UI smoke‑tests rekk):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Doxal ci Thunderbird (moo gën ngir MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Ndimbal yi:
- Tëjagul Console bu Njuumte (Tools → Developer Tools → Error Console).
- Xët yi ci kejjaay MV3 dañu taxawal bu ñu amul jëf-jëf; yëngal add‑on bi ginnaaw soppi code bi, walla bàyyi web‑ext mu yëngalu boppam.
- Yenn aji‑jëf yu Firefox‑rek mën nañu sukkandiku; saay saay seetal ci Thunderbird ngir API yi yem.
- Yooni binary yu Thunderbird (misal yi):
- Linux: `thunderbird` (misaal, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Seetu profeel: Jëfandikoo profeel Thunderbird bu wuute ngir sartu, ngir baña jot say joowkat yu bes-bes.

---

### Targets yu Make (ci araf) {#make-targets-alphabetical}

Makefile bi dafay àndal yoon yi ci sartu. Doxal `make help` ci biir bes bu nekk ngir am benn rëddaan bu benn rëdd ci target bu nekk.

Ndimbal: su doxalee `make` te amuloo target, dina ubbi benn menu bu Whiptail bu yomb ngir tann ab target.

| Target                                                   | Rëddaan bu benn rëdd                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Mabb mboolem artefact yu build/preview yu ci sa kow (tmp/, web-local-preview/, website/build/).   |
| [`commit`](#mt-commit)                                   | Fòormat, doxal test yi (ak i18n), yeesal changelog, commit & push.                                |
| [`eslint`](#mt-eslint)                                   | Doxal ESLint ak flat config (`npm run -s lint:eslint`).                                           |
| [`help`](#mt-help)                                       | Wone targets yépp ak rëddaan bu benn rëdd (sant).                                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint ci `sources/` (manifest bu diir; moytul ZIP yi; bul wàññiku ci laaj).                |
| [`menu`](#mt-menu)                                       | Menu bu doon jëf ngir tann ab target ak opsiñ yenn.                                               |
| [`pack`](#mt-pack)                                       | Sartu ATN & LOCAL ZIPs (doxal linter; woo packer script).                                         |
| [`prettier`](#mt-prettier)                               | Fòormat repo bi ci boppam (bindil soppi yi).                                                      |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ci anam bu seet (du bindil); laaj bi ñàkk bu nekk su wara reformat.                      |
| [`prettier_write`](#mt-prettier_write)                   | Tur bu niroo ak `prettier`.                                                                       |
| [`test`](#mt-test)                                       | Prettier (bindil), ESLint, ci topp Vitest (coverage su ñu samp).                                  |
| [`test_i18n`](#mt-test_i18n)                             | Test i18n rekk: placeholders/parity bu add‑on + parity bu dalweb bi.                              |
| [`translate_app`](#mt-translation-app)                   | Tur bu niroo ak `translation_app`.                                                                |
| [`translation_app`](#mt-translation-app)                 | Tekki ay binde UI bu app bi dale ko ci `sources/_locales/en/messages.json`.                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tekki docs yu dalweb bi ci OpenAI Batch API (moo gën).                                            |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tekki docs yu dalweb bi ci yoon bu benn-benn (legacy, du batch).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | Tur bu niroo ak `translation_web_index`.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Tekki UI bu xëtu-xët/homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Sartu docs yi ci `website/build` (day soutenir `--locales` / `BUILD_LOCALES`).                    |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Link check bu offline‑safe (du tektal HTTP[S] yu sori).                                           |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Preview bu gh‑pages ci kaw biir; auto‑serve ci 8080–8090; mën nga yokku test/link‑check.          |
| [`web_push_github`](#mt-web_push_github)                 | Tàllal `website/build` ci banqaasu `gh-pages`.                                                    |

Tekkiin ngir opsiñ yi

- Jëfandikoo `make <command> OPTS="…"` ngir joxe opsiñ (nangu ci ñaari ñaareen). Ci suuf, target bu nekk wone na noonu loolu dañu ko jëfandikoo.

--

-

#### Ndimbal build bu locale {#locale-build-tips}

- Sartu benn mbooleem su ñu xàmme locale yi: samp `BUILD_LOCALES="en de"` walla joxe `OPTS="--locales en,de"` ci targets yu web.
- Preview locale bu joxee: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Sartu ak Paket {#build-and-package}

- Sartu ZIP yi: `make pack`
- Dina génn ATN ak LOCAL ZIPs ci root bu repo bi (bul soppi artefact yi ak loxo)
- Ndimbal: yeesal version bi ci ñaari yeneen yi: `sources/manifest_ATN.json` ak `sources/manifest_LOCAL.json` laata pakké
- Install manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → tann ZIP bi la ñu sartoo

---

### Test {#test}

- Ñakk ndogob test yépp: `make test` (Vitest)
- Coverage (fal):
- `npm i -D @vitest/coverage-v8`
- Doxal `make test`; ubbi `coverage/index.html` ngir rapport HTML
- i18n rekk: `make test_i18n` (UI keys/placeholders/titles + parity bu dalweb bi ci locale bu nekk ak seet ci id/title/sidebar_label)

---

### Njaxlaf ak Jurnaal yi {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Soppali logs yu bari ci jamono jéego:
- Sàjj: `messenger.storage.local.set({ debug: true })`
- Tëj: `messenger.storage.local.set({ debug: false })`
- Jurnaal yi di feeñ ci saa yi ngay sos/yonnee tontu yi

---

### Docs (dalub web) {#docs-website}

- Servëëru sartu: `cd website && npm run start`
- Sartu dal bu static: `cd website && npm run build`
- Tur yi niroo Make (ci araf): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Misaal jëfandikoo:
- EN rekk, bàyyi test/link‑check, giseesul push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Mbooleem locales, ak test/link‑check, ci topp push: `make web_build_local_preview && make web_push_github`
- Laata yóbbu, doxal link check bu offline‑safe: `make web_build_linkcheck`.
- i18n: Angale nekk na ci `website/docs/*.md`; tekki jamanu jàmmooñ (German) yi nekk nañu ci `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Seet: Su Algolia DocSearch env vars sampu ci CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), dal bi dina jëfandikoo wër‑wërug Algolia; su dee, dina dellu ci wër‑wërug local. Ci homepage bi, bind `/` walla `Ctrl+K` ngir ubbi boyetu seet bi.

---

#### Jublu "Donate" {#donate-redirect}

- `website/src/pages/donate.js`
- Yoon: `/donate` (ak `/<locale>/donate`)
- Jariñu:
- Su yoon bi ci jamono amee locale (misaal, `/de/donate`), jëfandikool ko
- Su dee, tannal li gën a yem ci bi ñu laaj (`navigator.languages`) ak locales yi ñu sédd; su ko deful, dellu ci locale bu ñu tëral
- Dina jubal ci:
- `en` → `/docs/donation`
- yeneen → `/<locale>/docs/donation`
- Jëfandikoo `useBaseUrl` ngir melo bu baax ci baseUrl
- Am na meta refresh + link `noscript` ngir dugël su jublu bi lajj

---

---

#### Ndimbal preview {#preview-tips}

- Taxawal preview bu Node bu set: ubbi `http://localhost:<port>/__stop` (ñu biral ko ginnaaw `Local server started`).
- Su natlu yi bañee yebu ci MDX/JSX, jëfandikoo `useBaseUrl('/img/...')` ngir sant `baseUrl` bu dal bi.
- Preview bi mooy tàmbalee; link check bi di ñëw ginnaaw te du taxawal (link yi sori yu dëppantiku du leen tax preview bi taxawul).
- Misaal URL bu preview: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (ñu biral ko ginnaaw “Local server started”).
- Link yi sori ci link‑check: Yenn dal (misaal, addons.thunderbird.net) dañu mana tëyee crawlers, mën nañu wone 403 ci link checks. Preview bi dina tàmbali; ñi ngi leen lay nopp naaŋ.

---

#### Tekki dalub web bi {#translate-website}

Li mën nga tekki

- UI bu dal bi rekk: homepage, navbar, footer, ak yeneen tex yeek UI. Mbindu docs yi dina ñu nekk Angale rekk leegi.

Fanaan fii ngir soppi

- Soppi `website/i18n/<locale>/code.json` (jéggali ci `en`). Bàyyi placeholders yi ni `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ak seen melo sax.

Sos walla yeesal dencukaay yi

- Sos stubs yi ñu mii ci mboolem locales: `npm --prefix website run i18n:stubs`
- Toxal stubs yi dale ci Angale (ginnaaw yokk baati bees): `npm --prefix website run i18n:stubs:force`
- Su nu mënul, ngir locale bu benn: `npx --prefix website docusaurus write-translations --locale <locale>`

Tekki strings yu homepage/navbar/footer UI (OpenAI)

- Samp sargaaka yi benn yoon (shell walla .env):
- `export OPENAI_API_KEY=sk-...`
- Fal: `export OPENAI_MODEL=gpt-4o-mini`
- Benn yoon (mboolem locales, bàyyi en): `make translate_web_index`
- Xaatim ci locales yu wuute: `make translate_web_index OPTS="--locales de,fr"`
- Toxal solo yi am: `make translate_web_index OPTS="--force"`

Seetaan ak jëli

- Scriptu tekki bi day seet melo JSON bi, aar placeholders yi ci kow xaalis yi (curly‑brace), te aar URLs yi ñu soppiwul.
- Su seetaan bi lajj, dina jëli 2 yoon ak yëgle, laata mu bàyyi solo yi am.

Seetal sa locale

- Servëëru sartu: `npm --prefix website run start`
- Demal ci `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Yóbbu

- Ubbi ab PR ak dencukaay `code.json` bi ñu soppi. Bàyyi soppi yi mujj te yokkal benn screencap bu gaaw su mënsi.

---

### Kàttan ak Ndombu Tàmbaliwaay {#security-and-configuration-tips}

- Bul commit `sources/manifest.json` (ñu sos ko léegi ci sartu bi)
- Aar `browser_specific_settings.gecko.id` ngir aar kanalu yeesal bi

---

### Mooyalug Tànneef yi {#settings-persistence}

- Denc: Mboolem parametre yu jëfandikookat yi nekk nañu ci `storage.local` te dëpp ci biir yeesal yi.
- Install: Defaults yi dinañu leen samp rekk su caabi bu bees wonewul dara (undefined).
- Yeesal: Muvum bi day fullu rekk caabi yi ñu ñàkk; solo yi amoon doo leen wuutal mukk.
- Markeeru schema: `settingsVersion` (leegi `1`).
- Ki yi ak defaults:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code: gis `sources/background.js` → `initializeOrMigrateSettings()` ak `SCHEMA_VERSION`.

Yoonu sartu (yokk ab parametre bu bees)

- Yokk `SCHEMA_VERSION` ci `sources/background.js`.
- Yokk caabi bu bees + default ci objet `DEFAULTS` ci `initializeOrMigrateSettings()`.
- Jëfandikoo rëddaan "so‑rek‑undefined" bi su ngay seed defaults; bul wuutal solo yi amoon.
- Su parametre bi feeñee ci UI, boole ko ci `sources/options.js` te yokkal strings yu locale yi.
- Yokk/soppi test yi (gis `tests/background.settings.migration.test.js`).

Ndimbal ci test manual

- Simmile install bu bees: far dendu dencukaay u xët‑mandarga bi walla tàmbali ak profeel bu bees.
- Simmile ab yeesal: sampal `settingsVersion` ci `0` ci `storage.local` te yëngalaat; wóorlul ne solo yi amoon duñu soppiwul te ñu yokku rekk caabi yi ñu ñàkk.

---

### Ñëwlu jafe-jafe yi {#troubleshooting}

- Wóorlul ne Thunderbird 128 ESR walla yu bees la
- Jëfandikoo Error Console ngir jafe‑jafe yi ci jamono jéego
- Su doon ni seteŋ yi ñu denc doonul di daf, tàmbaliwaatal Thunderbird te jéemaatal. (Thunderbird mën na denc xaalis yi ci diggante sesiyoŋ; tàmbaliwaay dina tax seteŋ yu bees ñëw.)

---

### CI ak Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) dafay doxal vitest ak boole bu coverage (85% lines/functions/branches/statements). Su boole yi ñëwul, jafe‑jafe bi dina lajj.
- Workflow bi dina yóbbu ab artefact `coverage-html` ak rapport HTML bi; telechaarle ko ci xëtu run bi (Actions → run bi mujj → Artifacts).

---

### Jàppale {#contributing}

- Gis CONTRIBUTING.md ngir yoonu xarala/commit/PR
- Ndimbal: Sosul ab profeel Thunderbird bu sartu ngir test, ngir baña jot sa profeel bu bes-bes.

---

### Tekki yi

- Jëfandikoo dëggdëgg "all → all" ci liggéeyu tekki mën na yeex te néewul ndam. Tambali ak ab mbooloo bu ndaw (misaal, ay docs ñaar‑ñaar ak 1–2 locales), xoolal mëngoo yi, ginnaaw loolu nga gën a yokk.

---

- Taamu jëli: liggéeyu tekki yi mën nañu jëli araf 3 yoon ak backoff bu xayma ci njumte API; gis `scripts/translate_web_docs_batch.js` ak `scripts/translate_web_docs_sync.js`.

Natal yi ngir docs

- Denc natali-kaan yi ci `website/static/img/`.
- Nu sant leen ci MD/MDX ak `useBaseUrl('/img/<filename>')` ngir yoon yi dox ci `baseUrl` bu dal bi.
- Ginnaaw yokk walla soppi turu natali yi ci `website/static/img/`, wóorlul ne mboolem sant yi duñu soppi ci `useBaseUrl('/img/…')` te ñu mel ci preview bu local.
  Favicons

- `favicon.ico` bu am dayo yàgg mii dañu koy jënde boppam ci mboolem yoon yu sartu (Make + scripts) ci seen biir `website/scripts/build-favicon.mjs`.
- Amul benn jëf manual; yeesal `icon-*.png` mooy am solo.
  Ndimbal ci natt

- Bàyyi front‑matter `id` du soppi ci docs yi ñu tekki; tekki rekk `title` ak `sidebar_label` su amee.

#### clean {#mt-clean}

- Jariñu: mabb artefact yu build/preview yu ci sa kow.
- Jëfandikoo: `make clean`
- Dina mabb (su amee):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Jariñu: fòormat, test, yeesal changelog, commit, te push.
- Jëfandikoo: `make commit`
- Benn-bennal: doxal Prettier (bindil), `make test`, `make test_i18n`; yokkal ci changelog su am ay diff yu staged; tàllal ci `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Jariñu: doxal ESLint ak flat config.
- Jëfandikoo: `make eslint`

---

#### help {#mt-help}

- Jariñu: wone targets yépp ak rëddaan bu benn rëdd.
- Jëfandikoo: `make help`

---

#### lint {#mt-lint}

- Jariñu: lint MailExtension bi ak `web-ext`.
- Jëfandikoo: `make lint`
- Deggante: day def kopi bu diir `sources/manifest_LOCAL.json` → `sources/manifest.json`; moytul ZIP yi yu ñu sartu; wàññiku yi du leen tax laaj bi lajj.

---

#### menu {#mt-menu}

- Jariñu: menu bu doon jëf ngir tann ab target ak opsiñ yi fal.
- Jëfandikoo: doxal `make` ak dara ci topp.
- Deggante: su `whiptail` amul, menu bi dina dellu ci `make help`.

---

#### pack {#mt-pack}

- Jariñu: sartu ATN ak LOCAL ZIPs (des na ci `lint`).
- Jëfandikoo: `make pack`
- Ndimbal: yokk versions yi ci ñaari `sources/manifest_*.json` laata pakké.

---

#### prettier {#mt-prettier}

- Jariñu: fòormat repo bi ci boppam.
- Jëfandikoo: `make prettier`

#### prettier_check {#mt-prettier_check}

- Jariñu: seet fòormat bi (bindilul dara).
- Jëfandikoo: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Jariñu: tur bu niroo ak `prettier`.
- Jëfandikoo: `make prettier_write`

---

#### test {#mt-test}

- Jariñu: doxal Prettier (bindil), ESLint, ginnaaw loolu Vitest (coverage su ñu samp).
- Jëfandikoo: `make test`

#### test_i18n {#mt-test_i18n}

- Jariñu: test yu jëm ci i18n ngir strings u add‑on bi ak docs yu dalweb bi.
- Jëfandikoo: `make test_i18n`
- Doxal: `npm run test:i18n` ak `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Jariñu: tekki strings yu UI bu add‑on bi dale ko ci EN ci yeneen locales.
- Jëfandikoo: `make translation_app OPTS="--locales all|de,fr"`
- Deggante: aar coppitey caabi yi ak placeholders; bindal ci `translation_app.log`. Formu script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Jariñu: tekki docs yu dalweb bi dale ko ci `website/docs/*.md` dem ci `website/i18n/<locale>/...`.
- Moo gën: `translate_web_docs_batch` (OpenAI Batch API)
  - Jëfandikoo (rab yi): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisioneel bu cosaan mi kenn it mën na ko jëfandikoo: `OPTS="<doc|all> <lang|all>"`
- Jariñu: day sartu JSONL, yóbbu ko, seet di 30s, yeb njiitala yi, bind dencukaay yi.
- Xamal: benn batch mën na jël yoon ba 24 waxtu (ci penceru OpenAI). Console bi dina wone waxtu bi weesu ci poll bu nekk.
- Env: `OPENAI_API_KEY` (war na), fal `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Cosaan: `translate_web_docs_sync`
  - Jëfandikoo (rab yi): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisioneel bu cosaan mi kenn it mën na ko jëfandikoo: `OPTS="<doc|all> <lang|all>"`
- Jariñu: laaj yi ci dogal‑benn (du batch).
- Deggante: Laaji ifoofu su ñu bàyyi `OPTS`. Ñaari yoon yi aar code blocks/inline code te bàyyi front‑matter `id` du soppi; bind na ci `translation_web_batch.log` (batch) walla `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Jariñu: tekki strings yu UI bu dal bi (homepage, navbar, footer) dale ko ci `website/i18n/en/code.json` dem ci mboolem locales ci `website/i18n/<locale>/code.json` (bàyyi `en`).
- Jëfandikoo: `make translate_web_index` walla `make translate_web_index OPTS="--locales de,fr [--force]"`
- Laaj yi: export `OPENAI_API_KEY` (fal: `OPENAI_MODEL=gpt-4o-mini`).
- Jariñu: day seet melo JSON bi, aar placeholders yi ci kow xaalis yi, aar URLs yi duñu soppi, te jëli ak yëgle su seetaan bi lajj.

---

#### web_build {#mt-web_build}

- Jariñu: sartu dalu docs bi ci `website/build`.
- Jëfandikoo: `make web_build OPTS="--locales en|de,en|all"` (walla samp `BUILD_LOCALES="en de"`)
- Biir: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dep: doxal `npm ci` ci `website/` su `website/node_modules/@docusaurus` amul.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Jariñu: link check bu offline‑safe.
- Jëfandikoo: `make web_build_linkcheck OPTS="--locales en|all"`
- Deggante: sartu ci `tmp_linkcheck_web_pages`; soppi GH Pages `baseUrl` ci `/`; moytul link HTTP(S) yu sori.

#### web_build_local_preview {#mt-web_build_local_preview}

- Jariñu: preview bu local gh‑pages ak test/link‑check fal.
- Jëfandikoo: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Jariñu: jéem serwëëru preview bu Node jëkk (`scripts/preview-server.mjs`, day soutenir `/__stop`), dellu ci `python3 -m http.server` su lajj; dina sarwi ci 8080–8090; PID ci `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Jariñu: tàllal `website/build` ci banqaasu `gh-pages`.
- Jëfandikoo: `make web_push_github`

Ndimbal: samp `NPM=…` ngir soppi package manager bi Makefile bi jëfandikoo (default `npm`).
