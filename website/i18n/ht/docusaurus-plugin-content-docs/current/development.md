---
id: development
title: 'Devlopman'
sidebar_label: 'Devlopman'
---

---

## Gid Devlopman {#development-guide}

:::note Modifye sèlman an Anglè; tradiksyon yo pwopaje
Mete ajou dokiman an sèlman anba `website/docs` (English). Tradiksyon anba `website/i18n/<locale>/…` yo jenere epi yo pa dwe modifye alamen. Sèvi ak travay tradiksyon yo (eg., `make translate_web_docs_batch`) pou rafrechi kontni lokalize.
:::

### Kondisyon Prealab {#prerequisites}

- Node.js 22+ ak npm (teste ak Node 22)
- Thunderbird 128 ESR oswa pi nouvo (pou tès manyèl)

---

### Dispozisyon Pwojè (wo nivo) {#project-layout-high-level}

- Rasin: script anbalaj `distribution_zip_packer.sh`, dokiman, kaptire ekran
- `sources/`: kòd prensipal ekstansyon (background, opsyon/UI popup, manifest, ikon)
- `tests/`: suite Vitest
- `website/`: dokiman Docusaurus (ak i18n anba `website/i18n/de/...`)

---

### Enstalasyon & Zouti {#install-and-tooling}

- Enstale depandans rasin: `npm ci`
- Dokiman (opsyonèl): `cd website && npm ci`
- Dekouvri sib: `make help`

---

### Dev an dirèk (web‑ext run) {#live-dev-web-ext}

- Boukl rapid nan Firefox Desktop (sèlman tès rapid UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Kouri nan Thunderbird (pi pito pou MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Konsèy:
- Kenbe Konsòl Erè Thunderbird la ouvè (Tools → Developer Tools → Error Console).
- Paj evènman MV3 yo sispann lè yo pa aktive; rechaje ekstansyon an apre chanjman kòd, oswa kite web‑ext fè auto‑reload.
- Gen kèk konpòtman sèlman-Firefox ki diferan; toujou verifye nan Thunderbird pou parite API.
- Chemen binè Thunderbird (egzanp):
- Linux: `thunderbird` (pa eg., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolasyon pwofil: Sèvi ak yon pwofil Thunderbird separe pou devlopman pou evite afekte konfigirasyon w chak jou.

---

### Sib Make (alfabetik) {#make-targets-alphabetical}

Makefile la estandadize koule dev komen. Kouri `make help` nenpòt lè pou yon rezime yon liy pou chak sib.

Konsèy: kouri `make` san sib ouvri yon meni Whiptail senp pou chwazi yon sib.

| Sib                                                      | Deskripsyon yon liy                                                                     |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Retire atifak build/preview lokal (tmp/, web-local-preview/, website/build/).           |
| [`commit`](#mt-commit)                                   | Fòmate, kouri tès (inkl. i18n), mete ajou changelog, commit & push.                     |
| [`eslint`](#mt-eslint)                                   | Kouri ESLint atravè flat config (`npm run -s lint:eslint`).                             |
| [`help`](#mt-help)                                       | Lis tout sib yo ak dokiman yon liy (triye).                                             |
| [`lint`](#mt-lint)                                       | web‑ext lint sou `sources/` (manifest tanporè; inyore ZIP yo; pa fatal).                |
| [`menu`](#mt-menu)                                       | Meni entèaktif pou chwazi yon sib ak agiman opsyonèl.                                   |
| [`pack`](#mt-pack)                                       | Bati ZIP ATN & LOCAL (kouri linter; rele script packer).                                |
| [`prettier`](#mt-prettier)                               | Fòmate depo a sou plas (ekri chanjman yo).                                              |
| [`prettier_check`](#mt-prettier_check)                   | Prettier nan mòd tchek (pa gen ekriti); echwe si bezwen re-fòmate.                      |
| [`prettier_write`](#mt-prettier_write)                   | Alias pou `prettier`.                                                                   |
| [`test`](#mt-test)                                       | Prettier (ekri), ESLint, epi Vitest (kouvèti si configuré).                             |
| [`test_i18n`](#mt-test_i18n)                             | Tès sèlman i18n: ranplasan/parite ekstansyon + parite sit wèb.                          |
| [`translate_app`](#mt-translation-app)                   | Alias pou `translation_app`.                                                            |
| [`translation_app`](#mt-translation-app)                 | Tradui chenn UI aplikasyon an depi `sources/_locales/en/messages.json`.                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tradui dokiman sit wèb atravè OpenAI Batch API (pi pito).                               |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tradui dokiman sit wèb an senkron (eritaj, san batch).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | Alias pou `translation_web_index`.                                                      |
| [`translation_web_index`](#mt-translation_web_index)     | Tradui UI paj dakèy/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Bati dokiman yo nan `website/build` (sipòte `--locales` / `BUILD_LOCALES`).             |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Tcheke lyen an sekirite offline (sote HTTP[S] aleka).                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Preview gh‑pages lokal; sèvi otomatikman sou 8080–8090; tès/verifye lyen opsyonèl.      |
| [`web_push_github`](#mt-web_push_github)                 | Pouse `website/build` sou branch `gh-pages`.                                            |

Sentaks pou opsyon

- Sèvi ak `make <command> OPTS="…"` pou pase opsyon (rekòmande mete nan guiyèm). Chak sib anba a montre egzanp itilizasyon.

--

-

#### Konsèy pou bati pa lang {#locale-build-tips}

- Bati yon sou-ansanm lang: mete `BUILD_LOCALES="en de"` oswa pase `OPTS="--locales en,de"` bay sib web yo.
- Preview yon lang espesifik: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bati & Pakete {#build-and-package}

- Bati ZIP yo: `make pack`
- Pwodui ZIP ATN ak LOCAL nan rasin depo a (pa modifye atifak yo alamen)
- Konsèy: mete ajou vèsyon an nan tou de `sources/manifest_ATN.json` ak `sources/manifest_LOCAL.json` anvan pakèt la
- Enstalasyon manyèl (dev): Thunderbird → Tools → Add‑ons and Themes → angrenaj → Install Add‑on From File… → chwazi ZIP ki bati a

---

### Tès {#test}

- Suite konplè: `make test` (Vitest)
- Kouvèti (opsyonèl):
- `npm i -D @vitest/coverage-v8`
- Kouri `make test`; louvri `coverage/index.html` pou rapò HTML
- Sèlman i18n: `make test_i18n` (kle UI/ranplasan/tit + parite pa-lang pa-dokiman sou sit wèb ak tchek id/title/sidebar_label)

---

### Débogaj & Jounal {#debugging-and-logs}

- Konsòl Erè: Tools → Developer Tools → Error Console
- Baskile jounal verbose pandan ekzekisyon:
- Aktive: `messenger.storage.local.set({ debug: true })`
- Dezaktive: `messenger.storage.local.set({ debug: false })`
- Jounal yo parèt pandan w ap konpoze/voye repons yo

---

### Dokiman (sit wèb) {#docs-website}

- Sèvè dev: `cd website && npm run start`
- Bati sit estatik: `cd website && npm run build`
- Ekivalan Make (alfabetik): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Egzanp itilizasyon:
- Sèlman EN, sote tès/verifye lyen, pa gen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Tout lang, ak tès/verifye lyen, epi push: `make web_build_local_preview && make web_push_github`
- Anvan pibliye, kouri tchek lyen ki an sekirite offline: `make web_build_linkcheck`.
- i18n: Anglè a viv nan `website/docs/*.md`; tradiksyon Alman nan `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Rechèch: Si varyab anviwònman Algolia DocSearch yo defini nan CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), sit la sèvi ak rechèch Algolia; sinon li retounen sou rechèch lokal. Sou paj dakèy la, peze `/` oswa `Ctrl+K` pou louvri bwat rechèch la.

---

#### Wout redireksyon Donatè {#donate-redirect}

- `website/src/pages/donate.js`
- Wout: `/donate` (ak `/<locale>/donate`)
- Konpòtman:
- Si wout aktyèl la gen yon lang (pa eg., `/de/donate`), itilize li
- Sinon, chwazi pi bon korespondans ant `navigator.languages` vs lang ki configuré yo; retounen sou lang default la
- Redirije pou:
- `en` → `/docs/donation`
- lòt yo → `/<locale>/docs/donation`
- Sèvi ak `useBaseUrl` pou bon jesyon baseUrl
- Gen ladan meta refresh + lyen `noscript` kòm ranplasman

---

---

#### Konsèy pou Preview {#preview-tips}

- Sispann preview Node pwòp: louvri `http://localhost:<port>/__stop` (enprime apre `Local server started`).
- Si imaj yo pa chaje nan MDX/JSX, itilize `useBaseUrl('/img/...')` pou respekte `baseUrl` sit la.
- Preview a kòmanse an premye; verifikasyon lyen an kouri apre epi li pa bloke (lien ekstèn kase pap sispann preview a).
- Egzanp URL preview: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (enprime apre “Local server started”).
- Lyen ekstèn nan tchek-lyen: Kèk sit ekstèn (pa eg., addons.thunderbird.net) bloke robo otomatik epi yo ka montre 403 nan verifikasyon lyen. Preview a toujou kòmanse; ou ka inyore yo san danje.

---

#### Tradui Sit Wèb la {#translate-website}

Sa ou ka tradui

- Sèlman UI sit la: paj dakèy, navbar, footer, ak lòt chenn UI. Kontni dokiman yo rete sèlman an Anglè pou kounye a.

Kote pou modifye

- Edite `website/i18n/<locale>/code.json` (itilize `en` kòm referans). Kenbe ranplasan tankou `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` san chanjman.

Jenere oswa rafrechi fichye yo

- Kreye stubs ki manke pou tout lang: `npm --prefix website run i18n:stubs`
- Ranplase stubs depi Anglè (apre ou fin ajoute nouvo chenn): `npm --prefix website run i18n:stubs:force`
- Altènatif pou yon sèl lang: `npx --prefix website docusaurus write-translations --locale <locale>`

Tradui chenn UI paj dakèy/navbar/footer (OpenAI)

- Mete kwayans yo yon sèl fwa (shell oswa .env):
- `export OPENAI_API_KEY=sk-...`
- Opsyonèl: `export OPENAI_MODEL=gpt-4o-mini`
- Yon sèl pas (tout lang, sote en): `make translate_web_index`
- Limite a lang espesifik: `make translate_web_index OPTS="--locales de,fr"`
- Ranplase valè ki egziste yo: `make translate_web_index OPTS="--force"`

Validasyon & re‑tantativ

- Script tradiksyon an valide fòm JSON, prezève ranplasan ak acolad, epi asire URL yo pa chanje.
- Si validasyon an echwe, li rekòmanse ak fidbak jiska 2 fwa anvan li kenbe valè ki egziste yo.

Preview lang ou

- Sèvè dev: `npm --prefix website run start`
- Vizite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Soumèt

- Louvri yon PR ak fichye `code.json` ou modifye yo. Kenbe chanjman yo konsantre epi ajoute yon ti kaptire ekran lè sa posib.

---

### Konsèy Sekirite & Konfigirasyon {#security-and-configuration-tips}

- Pa fè commit `sources/manifest.json` (kreye tanporèman pa build la)
- Kenbe `browser_specific_settings.gecko.id` estab pou prezève chanèl mizajou a

---

### Pèsistans Paramèt yo {#settings-persistence}

- Depo: Tout paramèt itilizatè yo rete nan `storage.local` epi pèsiste atravè mizajou ekstansyon an.
- Enstalasyon: Valè default yo aplike sèlman lè yon kle vrèman manke (undefined).
- Mizajou: Yon migrasyon ranpli sèlman kle ki manke; valè ki egziste yo pa janm ranplase.
- Makè eskèm: `settingsVersion` (kounye a `1`).
- Kle yo ak valè default yo:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kòd: gade `sources/background.js` → `initializeOrMigrateSettings()` ak `SCHEMA_VERSION`.

Workflow dev (ajoute yon nouvo paramèt)

- Ogmante `SCHEMA_VERSION` nan `sources/background.js`.
- Ajoute nouvo kle a + default la nan objè `DEFAULTS` nan `initializeOrMigrateSettings()`.
- Sèvi ak règ “only-if-undefined” lè w ap inisyalize default yo; pa ranplase valè ki egziste yo.
- Si paramèt la vizib pou itilizatè, konekte li nan `sources/options.js` epi ajoute chenn lokalize.
- Ajoute/ajiste tès yo (gade `tests/background.settings.migration.test.js`).

Konsèy pou tès manyèl

- Simile yon enstalasyon nèf: efase repèrtwa done ekstansyon an oswa kòmanse ak yon nouvo pwofil.
- Simile yon mizajou: mete `settingsVersion` a `0` nan `storage.local` epi rechaje; konfime valè ki egziste yo rete san chanjman epi sèlman kle ki manke yo ajoute.

---

### Rezolisyon Pwoblèm {#troubleshooting}

- Asire Thunderbird se 128 ESR oswa pi nouvo
- Sèvi ak Konsòl Erè pou pwoblèm pandan ekzekisyon
- Si paramèt ki estoke yo sanble yo pa aplike kòrèkteman, rekòmanse Thunderbird epi eseye ankò. (Thunderbird ka mete eta an kachèt atravè sesyon yo; yon rekòmansman asire paramèt fre yo chaje.)

---

### CI & Kouvèti {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) kouri vitest ak papòt kouvèti (85% liy/fonksyon/bransh/deklarasyon). Si papòt yo pa reyalize, travay la echwe.
- Workflow la telechaje yon atifak `coverage-html` ak rapò HTML la; telechaje li depi paj kouri a (Actions → dènye kouri → Artifacts).

---

### Kijan pou Kontribye {#contributing}

- Gade CONTRIBUTING.md pou direktiv branch/commit/PR
- Konsèy: Kreye yon pwofil devlopman Thunderbird separe pou tès pou evite afekte pwofil w chak jou.

---

### Tradiksyon {#translations}

- Kouri gwo travay tradiksyon “all → all” ka pran tan epi koute chè. Kòmanse ak yon sou-ansanm (pa eg., kèk dokiman ak 1–2 lang), revize rezilta a, epi elaji.

---

- Règleman re‑tantativ: travay tradiksyon yo fè jiska 3 tantativ ak backoff eksponansyèl sou erè API; gade `scripts/translate_web_docs_batch.js` ak `scripts/translate_web_docs_sync.js`.

Kaptire ekran pou dokiman yo

- Sere imaj yo anba `website/static/img/`.
- Referansye yo nan MD/MDX atravè `useBaseUrl('/img/<filename>')` pou chemen yo mache ak `baseUrl` sit la.
- Apre ou fin ajoute oswa re-nonmen imaj anba `website/static/img/`, konfime tout referans yo toujou itilize `useBaseUrl('/img/…')` epi rann nan yon preview lokal.
  Favikon

- Fichye `favicon.ico` plizyè gwosè a jenere otomatikman nan tout chemen build yo (Make + scripts) atravè `website/scripts/build-favicon.mjs`.
- Pa bezwen okenn etap manyèl; mete ajou `icon-*.png` sifi.
  Konsèy pou revizyon

- Kenbe `id` front‑matter la san chanjman nan dokiman tradui yo; tradui sèlman `title` ak `sidebar_label` lè yo prezan.

#### clean {#mt-clean}

- Objektif: retire atifak build/preview lokal yo.
- Itilizasyon: `make clean`
- Retire (si prezan):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Objektif: fòmate, tès, mete ajou changelog, commit, epi pouse.
- Itilizasyon: `make commit`
- Detay: kouri Prettier (ekri), `make test`, `make test_i18n`; ajoute nan changelog lè gen diferans staged; pouse sou `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Objektif: kouri ESLint atravè flat config.
- Itilizasyon: `make eslint`

---

#### help {#mt-help}

- Objektif: lis tout sib yo ak dokiman yon liy.
- Itilizasyon: `make help`

---

#### lint {#mt-lint}

- Objektif: lint MailExtension lan lè l sèvi ak `web-ext`.
- Itilizasyon: `make lint`
- Nòt: fè kopi tanporè `sources/manifest_LOCAL.json` → `sources/manifest.json`; inyore ZIP ki bati yo; avètisman yo pa fè pipeline lan echwe.

---

#### menu {#mt-menu}

- Objektif: meni entèaktif pou chwazi yon Make target ak agiman opsyonèl.
- Itilizasyon: kouri `make` san agiman.
- Nòt: si `whiptail` pa disponib, meni an retounen sou `make help`.

---

#### pack {#mt-pack}

- Objektif: bati ZIP ATN ak LOCAL (depann de `lint`).
- Itilizasyon: `make pack`
- Konsèy: monte vèsyon yo nan tou de `sources/manifest_*.json` anvan pakèt la.

---

#### prettier {#mt-prettier}

- Objektif: fòmate depo a sou plas.
- Itilizasyon: `make prettier`

#### prettier_check {#mt-prettier_check}

- Objektif: verifye fòma (pa gen ekriti).
- Itilizasyon: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Objektif: alias pou `prettier`.
- Itilizasyon: `make prettier_write`

---

#### test {#mt-test}

- Objektif: kouri Prettier (ekri), ESLint, epi Vitest (kouvèti si enstale).
- Itilizasyon: `make test`

#### test_i18n {#mt-test_i18n}

- Objektif: tès konsantre sou i18n pou chenn ekstansyon ak dokiman sit wèb.
- Itilizasyon: `make test_i18n`
- Kouri: `npm run test:i18n` ak `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Objektif: tradui chenn UI ekstansyon an soti nan EN pou lòt lang.
- Itilizasyon: `make translation_app OPTS="--locales all|de,fr"`
- Nòt: prezève estrikti kle yo ak ranplasan yo; ekri jounal nan `translation_app.log`. Fòm script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Objektif: tradui dokiman sit wèb depi `website/docs/*.md` nan `website/i18n/<locale>/...`.
- Pi pito: `translate_web_docs_batch` (OpenAI Batch API)
  - Itilizasyon (drapo): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozisyonèl eritaj toujou aksepte: `OPTS="<doc|all> <lang|all>"`
- Konpòtman: bati JSONL, telechaje, poze demann chak 30s, telechaje rezilta yo, ekri fichye yo.
- Nòt: yon travay batch ka pran jiska 24 èdtan pou fini (dapre fenèt batch OpenAI). Konsòl la montre tan ki pase chak fwa l ap tcheke.
- Env: `OPENAI_API_KEY` (obligatwa), opsyonèl `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Eritaj: `translate_web_docs_sync`
  - Itilizasyon (drapo): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozisyonèl eritaj toujou aksepte: `OPTS="<doc|all> <lang|all>"`
- Konpòtman: demann an senkron pou chak pè (pa gen agregasyon batch).
- Nòt: Pwompt entèaktif lè `OPTS` pa bay. Toude mòd yo prezève blòk kòd/kòd anliy epi kenbe `id` nan front‑matter la san chanjman; ekri jounal nan `translation_web_batch.log` (batch) oswa `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Objektif: tradui chenn UI sit wèb (paj dakèy, navbar, footer) soti nan `website/i18n/en/code.json` pou tout lang anba `website/i18n/<locale>/code.json` (eksepte `en`).
- Itilizasyon: `make translate_web_index` oswa `make translate_web_index OPTS="--locales de,fr [--force]"`
- Egzijans: export `OPENAI_API_KEY` (opsyonèl: `OPENAI_MODEL=gpt-4o-mini`).
- Konpòtman: valide estrikti JSON, prezève ranplasan ak acolad, kenbe URL yo san chanjman, epi rekòmanse ak fidbak si gen erè validasyon.

---

#### web_build {#mt-web_build}

- Objektif: bati sit dokiman yo nan `website/build`.
- Itilizasyon: `make web_build OPTS="--locales en|de,en|all"` (oswa mete `BUILD_LOCALES="en de"`)
- Entèn: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Depandans: kouri `npm ci` nan `website/` sèlman si `website/node_modules/@docusaurus` manke.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Objektif: tcheke lyen an sekirite offline.
- Itilizasyon: `make web_build_linkcheck OPTS="--locales en|all"`
- Nòt: bati nan `tmp_linkcheck_web_pages`; reekri `baseUrl` GH Pages yo an `/`; sote lyen HTTP(S) aleka.

#### web_build_local_preview {#mt-web_build_local_preview}

- Objektif: preview gh‑pages lokal ak tès/verifye lyen opsyonèl.
- Itilizasyon: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Konpòtman: eseye sèvè preview Node an premye (`scripts/preview-server.mjs`, sipòte `/__stop`), retounen sou `python3 -m http.server`; sèvi sou 8080–8090; PID nan `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Objektif: pouse `website/build` sou branch `gh-pages`.
- Itilizasyon: `make web_push_github`

Konsèy: mete `NPM=…` pou ranplase jere pakè Makefile la itilize (default `npm`).

---
