---
id: development
title: 'Pêşveçûn'
sidebar_label: 'Pêşkeftin'
---

---

## Rêberê Pêşdebirinê {#development-guide}

:::note Tenê Îngilîzî sererast bike; wergeran xweber belav dibin
Belgekirinê tenê li bin `website/docs` (Îngilîzî) rojanekirin. Wergerên li bin `website/i18n/<locale>/…` xweber têne çêkirin û ne divê bi dest biguherîn. Karên wergerê bi kar bîne (mînak, `make translate_web_docs_batch`) da ku naveroka herêmî nûve bibe.
:::

### Pêşartî {#prerequisites}

- Node.js 22+ û npm (bi Node 22 testkirî)
- Thunderbird 128 ESR an nûtir (ji bo testkirina destanî)

---

### Rêzê Projeyê (astek bilind) {#project-layout-high-level}

- Kok: skrîpta pakêtê `distribution_zip_packer.sh`, belge, wêneyên ekranê
- `sources/`: koda sereke ya add‑on (background, vebijarkên/options UI ya pop‑upê, manifest, îkon)
- `tests/`: komê Vitest
- `website/`: belgeya Docusaurus (bi i18n li bin `website/i18n/de/...`)

---

### Sazkirin û Amûrkirin {#install-and-tooling}

- Pêdiviyên kokê saz bike: `npm ci`
- Belge (opsiyonî): `cd website && npm ci`
- Hedefan bibîne: `make help`

---

### Pêşdebirina Zindî (web‑ext run) {#live-dev-web-ext}

- Dorçûna bilez di Firefox Desktop de (tenê UI smoke‑tests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Di Thunderbird de bixebitîne (ji bo MailExtensions pêşîhatî ye):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Şîret:
- Konsola Çewtiyê ya Thunderbird veke (Tools → Developer Tools → Error Console).
- Rûpelên bûyerên MV3 dema bêkar rawestin; piştî guherandina kodê add‑onê ji nû barke, an jî bihêle web‑ext xweber ji nû bar bibe.
- Hin tevgerên tenê yên Firefox cuda ne; her dem di Thunderbird de ji bo hevparîtiya API piştrast bike.
- Rêçikên binarî yên Thunderbird (mînak):
- Linux: `thunderbird` (mînak, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Cudakirinê profîlê: Ji bo pêşdebirinê profîlek Thunderbird ya cuda bi kar bîne da ku sererastkirina rojane te neyê tesîr kirin.

---

### Hedefên Make (Alfabeyî) {#make-targets-alphabetical}

Makefile avahiyên çalakiyên pêşdebirinê ya hevpar standard dike. Her dem `make help` bixebitîne ji bo kurteyek yek‑rêzikî ya her hedefekê.

Şîret: dema ku `make` bê hedefekê bixebitînî, pêşeka hêsan a Whiptail veke ji bo hilbijartina hedefekê.

| Hedef                                                    | Daxuyaniya yek‑rêzikî                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Artîfaktên avakirina herêmî/preview (tmp/, web-local-preview/, website/build/) rake.                       |
| [`commit`](#mt-commit)                                   | Format bike, testan bimeşe (bi tevahiya i18n), changelog nûve bike, commit û push bike.                    |
| [`eslint`](#mt-eslint)                                   | ESLintê bi mîhenga flat (`npm run -s lint:eslint`) bixebitîne.                                             |
| [`help`](#mt-help)                                       | Hemû hedefan bi belavokên yek‑rêzikî (rêzkirî) rêz bike.                                                   |
| [`lint`](#mt-lint)                                       | web‑ext lint li ser `sources/` (manifestê demdemî; ZIP'yan nagerîne; ne‑fatal).                            |
| [`menu`](#mt-menu)                                       | Pêşeka têkildar ji bo hilbijartina hedef û argümanên opsiyonî.                                             |
| [`pack`](#mt-pack)                                       | ZIP'ên ATN û LOCAL ava bike (linter dihewîne; skrîpta pakêrê dibexwîne).                                   |
| [`prettier`](#mt-prettier)                               | Depoyê di cihê xwe re format bike (guherandinan dinivîse).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier di moda kontrolê de (bê nivîsîn); heke pêwîst be reformat têk dike.                               |
| [`prettier_write`](#mt-prettier_write)                   | Alîs ji bo `prettier`.                                                                                     |
| [`test`](#mt-test)                                       | Pêşî Prettier (nivîsîn), paşê ESLint, û heta paşî Vitest (coverage heke veavakirî ye).                     |
| [`test_i18n`](#mt-test_i18n)                             | Tenê testên i18n: cihgirerên/add‑on û parity ya malperê.                                                   |
| [`translate_app`](#mt-translation-app)                   | Alîs ji bo `translation_app`.                                                                              |
| [`translation_app`](#mt-translation-app)                 | Rêzikên UI ya sepanê ji `sources/_locales/en/messages.json` wergerîne.                                     |
| [`translate_web_docs_batch`](#mt-translation-web)        | Belgeyên malperê bi OpenAI Batch API wergerîne (pêşîhatî).                                                 |
| [`translate_web_docs_sync`](#mt-translation-web)         | Belgeyên malperê sinkron (kevn, ne‑batch) wergerîne.                                                       |
| [`translate_web_index`](#mt-translation_web_index)       | Alîs ji bo `translation_web_index`.                                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Rêzikên UI yên rûpela sereke/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`) wergerîne. |
| [`web_build`](#mt-web_build)                             | Belgeyan ava bike bo `website/build` (piştgirî `--locales` / `BUILD_LOCALES`).                             |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kontrola girêdanan ya bêgirêdayî (HTTP[S] yên dûrî têne derbas kirin).                                     |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Pêşdîtina herêmî ya gh‑pages; xizmeta xweber li 8080–8090; test/link‑check opsiyonî.                       |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` bi qutikeya `gh-pages` re push bike.                                                       |

Sintaxa vebijarkan

- Bi `make <command> OPTS="…"` vebijarkên derbas bike (nîşanan tê pêşniyarkirin). Her hedefa jêr mînakek bikaranînê nîşan dide.

--

-

#### Şîretên avakirina zimanê {#locale-build-tips}

- Komikek ji zimanên herêmî ava bike: `BUILD_LOCALES="en de"` saz bike an `OPTS="--locales en,de"` bide hedefên webê.
- Zimanek taybet pêşbînî bike: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Avakirin û Pakêtkirin {#build-and-package}

- ZIP'yan ava bike: `make pack`
- Li kokê repo'ê ZIP'ên ATN û LOCAL çêdike (artîfaktan bi dest ne biguherîne)
- Şîret: berî pakêtkirinê guhertoyê li her du `sources/manifest_ATN.json` û `sources/manifest_LOCAL.json` nûve bike
- Sazkirina destanî (pêşdebîr): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → ZIP'a afirandî hilbijêre

---

### Test {#test}

- Koma tevahî: `make test` (Vitest)
- Coverage (opsiyonî):
- `npm i -D @vitest/coverage-v8`
- `make test` bixebitîne; ji bo rapora HTML `coverage/index.html` veke
- Tenê i18n: `make test_i18n` (mifteyên UI/placeholder/sernav + parity ya malperê ji bo her zimanê û her belgeyê bi kontrolên id/title/sidebar_label)

---

### Çewtûçûn û Tomaran {#debugging-and-logs}

- Konsola Çewtiyê: Tools → Developer Tools → Error Console
- Di dema xebitandinê de tomaran yên dirêj veke/bigire:
- Vekirin: `messenger.storage.local.set({ debug: true })`
- Girtin: `messenger.storage.local.set({ debug: false })`
- Di dema nivîsandin/şandina bersivan de tomar têne nîşandan

---

### Belge (malper) {#docs-website}

- Pêşkêşkara pêşdebîr: `cd website && npm run start`
- Malpera statîk ava bike: `cd website && npm run build`
- Hevberên Make (alfabeyî): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Mînakevan a bikaranînê:
- Tenê EN, test/link‑check ji derve, bê push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Hemû ziman, bi test/link‑check, paşê push: `make web_build_local_preview && make web_push_github`
- Berî weşandinê, kontrola girêdanan ya bêgirêdayî bixebitîne: `make web_build_linkcheck`.
- i18n: Îngilîzî li `website/docs/*.md` ye; wergerên Almanî li `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ne
- Lêgerîn: Heke guherbarên doren Algolia DocSearch di CI de ve hatine danîn (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), malper lêgerîna Algolia bi kar tîne; heke na, vegere lêgerîna herêmî. Di rûpela sereke de, `/` an `Ctrl+K` bike da ku qutîka lêgerînê veke.

---

#### Rêça beralîkirina Donate {#donate-redirect}

- `website/src/pages/donate.js`
- Rêç: `/donate` (û `/<locale>/donate`)
- Tevger:
- Heke rêçeya niha zimanek hebe (mînak, `/de/donate`), wê bi kar bîne
- Heke na, ji `navigator.languages` re li dijî zimanên veavakirî herî nêzîk hilbijêre; vegere zimanê standard
- Beralî dike ber:
- `en` → `/docs/donation`
- yên din → `/<locale>/docs/donation`
- Ji bo rêvebirina rast a baseUrl `useBaseUrl` bi kar tîne
- Wekî çarenûs meta refresh + girêdana `noscript` tê de

---

---

#### Şîretên Pêşdîtinê {#preview-tips}

- Pêşdîtina Node bi safî rawestîne: `http://localhost:<port>/__stop` veke (piştî `Local server started` tê çap kirin).
- Heke wêneyan li MDX/JSX nehatin barkirin, ji bo rêzkerdina `baseUrl` ya malperê `useBaseUrl('/img/...')` bi kar bîne.
- Pêşdîtin pêşî dest pê dike; kontrola girêdanan paşê dixebite û astengdar nîne (girêdana derve ya şikestî pêşdîtinê narawestîne).
- URL'a mînak a pêşdîtinê: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (piştî “Local server started” tê çap kirin).
- Girêdanên derve di link‑check de: Hin malperên derve (mînak, addons.thunderbird.net) robotan asteng dikin û dikarin di link‑check de 403 nîşan bide. Pêşdîtin herçend dest pê dike; ev dikarin bêyî dilşadî bên negerîn.

---

#### Malperê wergerîne {#translate-website}

Çi dikarî wergerînî

- Tenê UI ya malperê: rûpela sereke, navbar, footer, û rêzikên din ên UI. Naveroka belgeyan heta niha tenê bi Îngilîzî dimîne.

Li ku biguherînî

- `website/i18n/<locale>/code.json` sererast bike (`en` wekî referans bi kar bîne). Cihgirerên wekî `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` nebiguhere.

Pelan çêke an tazekirin

- Stûbên winda ji bo hemû zimanên herêmî çêke: `npm --prefix website run i18n:stubs`
- Stûbên ji Îngilîzî ve li ser binivîse (piştî zêdekirina rêzikên nû): `npm --prefix website run i18n:stubs:force`
- Alternatîf ji bo zimanek yekane: `npx --prefix website docusaurus write-translations --locale <locale>`

Rêzikên UI yên rûpela sereke/navbar/footer wergerîne (OpenAI)

- Carek daneyên nasnameyî saz bike (shell an .env):
- `export OPENAI_API_KEY=sk-...`
- Opsiyonî: `export OPENAI_MODEL=gpt-4o-mini`
- Carekê (hemû ziman, en ji derve bihêle): `make translate_web_index`
- Bi zimanên taybet sinor bike: `make translate_web_index OPTS="--locales de,fr"`
- Nirxên heyî li ser binivîse: `make translate_web_index OPTS="--force"`

Piştrastkirin û dîsa hewl dan

- Skrîpta wergerê şêwaza JSON piştrast dike, cihgirerên qûlekên curly dimîne, û bawer dike ku URL'yan nayên guherandin.
- Dema piştrastkirin bi ser neket, heta 2 caran bi pêşniyar/reya alîkarî dîsa hewl dide berî ku nirxên heyî biparêze.

Zimanê xwe pêşbînî bike

- Pêşkêşkara pêşdebîr: `npm --prefix website run start`
- Seredana `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` bike

Şandin

- Bi pel(l)ên `code.json` yên ku tu sererast kirî PRekî veke. Guherandinan bikurt û di nav mijara xwe de bihêle û heke gankirî be wêneyek şeş‑şik a bilez jî têxe.

---

### Şîretên Ewlekariyê û Veavakirî {#security-and-configuration-tips}

- `sources/manifest.json` nekomît bike (bi demdemî ji aliyê buildê tê afirandin)
- Ji bo parastina kanalê nûvekirinê `browser_specific_settings.gecko.id` biqarar bihêle

---

### Berdawamiya Mîhengan {#settings-persistence}

- Hilandin: Hemû mîhengên bikarhêner li `storage.local` têne veşartin û di nûvekirinên add‑on de dimînin.
- Sazkirin: Standardên tenê dema ku mifteyek bi awayekî celebek tune be (undefined) têne sepan kirin.
- Nûvekirin: Guhestin tenê mifteyên winda tije dike; nirxên heyî qet nayên li ser nivîsîn.
- Nîşankirina şêma: `settingsVersion` (niha `1`).
- Mifte û standardan:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: binêre `sources/background.js` → `initializeOrMigrateSettings()` û `SCHEMA_VERSION`.

Pergala pêşdebirinê (zêdekirina mîhengekê nû)

- `SCHEMA_VERSION` di `sources/background.js` de bilind bike.
- Mifteya nû + standardê wê li objeya `DEFAULTS` di `initializeOrMigrateSettings()` de zêde bike.
- Dema standardan disekirin, qanûna “tenê heke undefined be” bi kar bîne; nirxên heyî ne li ser binivîse.
- Heke mîheng bikarhêner tê dîtin, wê di `sources/options.js` de bikeve xeta girêdanê û rêzikên herêmî zêde bike.
- Testan zêde/biguherîne (binêre `tests/background.settings.migration.test.js`).

Şîretên testkirina destanî

- Sazkirina nû têkildar bike: peldanka daneyan a pêveka firehî paqij bike an bi profîlek nû dest pê bike.
- Nûvekirinekî têkildar bike: `settingsVersion` di `storage.local` de bibe `0` û ji nû bar bike; piştrast bike ku nirxên heyî nayên guherandin û tenê mifteyên winda lê zêde têne kirin.

---

### Çareserkirina Pirsgirêkan {#troubleshooting}

- Piştrast bike ku Thunderbird 128 ESR an jî nûtir be
- Ji bo pirsgirêkên demê‑xebitandinê Konsola Çewtiyê bi kar bîne
- Heke mîhengên veşartî wekî ku divê sepan nekin, Thunderbird ji nû bide destpêkirin û careke din biceribîne. (Thunderbird dikare di nav navbera danişînan de rewşê bi xotomarkirin; destpêkirina nû dikealete ku mîhengên nû berdewam bibin.)

---

### CI û Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitestê bi astevkerên coverage (85% rêzik/fonksîyon/bikolan/daxuyan) dixebitîne. Heke astevkeran nehên, kar şikest dibe.
- Rêçav ûpload dike artîfaktê `coverage-html` bi rapora HTML; wê ji rûpela meşandinê daxîne (Actions → meşandina dawîn → Artifacts).

---

### Beşdarbûn {#contributing}

- Ji bo rêwerzên branch/commit/PR pelê CONTRIBUTING.md binêre
- Şîret: Ji bo testan profîlek pêşdebirina Thunderbird ya cuda çêke da ku profîla rojanê te neyê tesîr kirin.

---

### Wergerandin

- Xebitandina karên mezin a “hemû → hemû” dikare hêdî û bi heqma bilind be. Bi komikek dest pê bike (mînak, çend belge û 1–2 ziman), encamê binêre, paşê firehbike.

---

- Rêvebirina dîsa hewl dan: karên wergerê heta 3 caran bi backoff a eksponensî ya li ser çewtiyên API dîsa hewl didin; binêre `scripts/translate_web_docs_batch.js` û `scripts/translate_web_docs_sync.js`.

Wêneyên ekranê ji bo belgeyan

- Wêneyan li bin `website/static/img/` hilîne.
- Di MD/MDX de bi rêya `useBaseUrl('/img/<filename>')` wan bi referans bike da ku rêçik bi `baseUrl` ya malperê re bixebitin.
- Piştî zêdekirin an navguherandina wêneyan li bin `website/static/img/`, piştrast bike ku hemû referans hîn `useBaseUrl('/img/…')` bi kar tînin û di pêşdîtina herêmî de têne nîşandan.
  Favîkon

- `favicon.ico` ya pir‑mezinahî bi xweber di hemû rêçikên buildê de tê afirandin (Make + skrîpt) bi rêya `website/scripts/build-favicon.mjs`.
- Heceta gavê destanî nîn e; rojanekirina `icon-*.png` têkildar e.
  Şîreta nirxandinê

- Di belgeyên wergerandî de front‑matter a `id` nebiguhere; tenê `title` û `sidebar_label` heke hebe wergerîne.

#### clean {#mt-clean}

- Armanc: artîfaktên avakirina herêmî/preview rake.
- Bikaranîn: `make clean`
- Rake (heke hebin):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Armanc: format, test, changelog nûvekirin, commit û push.
- Bikaranîn: `make commit`
- Hûragahî: Prettier (nivîsîn), `make test`, `make test_i18n` dixebitîne; dema ku cudahiyên staged hene, têxistina changelogê zêde dike; li `origin/<branch>` push dike.

---

#### eslint {#mt-eslint}

- Armanc: ESLint bi mîhenga flat bixebitîne.
- Bikaranîn: `make eslint`

---

#### help {#mt-help}

- Armanc: hemû hedefan bi belavokên yek‑rêzikî rêz bike.
- Bikaranîn: `make help`

---

#### lint {#mt-lint}

- Armanc: MailExtension bi `web-ext` re lint bike.
- Bikaranîn: `make lint`
- Nîşe: kopiyên demdemî `sources/manifest_LOCAL.json` → `sources/manifest.json` têne çêkirin; ZIP'ên afirandî têne fermûdan; hişyariyan xêra xeta nabe.

---

#### menu {#mt-menu}

- Armanc: pêşeka têkildar ji bo hilbijartina hedefa Make û argümanên opsiyonî.
- Bikaranîn: `make` bê argûmanan bixebitîne.
- Nîşe: heke `whiptail` tune be, pêşek vegere `make help`.

---

#### pack {#mt-pack}

- Armanc: ZIP'ên ATN û LOCAL ava bike (li ser `lint` pêwîst e).
- Bikaranîn: `make pack`
- Şîret: berî pakêtkirinê guhertoyan di her du `sources/manifest_*.json` de bilind bike.

---

#### prettier {#mt-prettier}

- Armanc: depoyê di cihê xwe re format bike.
- Bikaranîn: `make prettier`

#### prettier_check {#mt-prettier_check}

- Armanc: piştrastkirina formatê (bê nivîsîn).
- Bikaranîn: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Armanc: alîs ji bo `prettier`.
- Bikaranîn: `make prettier_write`

---

#### test {#mt-test}

- Armanc: Prettier (nivîsîn), paşê ESLint, paşê Vitest (heke coverage saz be).
- Bikaranîn: `make test`

#### test_i18n {#mt-test_i18n}

- Armanc: testên serwerger (i18n) ji bo rêzikên sepanê û belgeya malperê.
- Bikaranîn: `make test_i18n`
- Dixebitîne: `npm run test:i18n` û `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Armanc: rêzikên UI ya add‑on ji EN ber zimanên din wergerîne.
- Bikaranîn: `make translation_app OPTS="--locales all|de,fr"`
- Nîşe: çarçoveya mifteyan û cihgireran diparêze; li `translation_app.log` tê tomar kirin. Forma skrîptê: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Armanc: belgeya malperê ji `website/docs/*.md` ber `website/i18n/<locale>/...` wergerîne.
- Pêşîhatî: `translate_web_docs_batch` (OpenAI Batch API)
  - Bikaranîn (bayraq): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozîsyonela kevn hîn tê qebûlkirin: `OPTS="<doc|all> <lang|all>"`
- Tevger: JSONL diafirîne, bar dike, her 30 çirkeyan kontrol dike, encaman dakêşîne, pelan dinivîse.
- Nîşe: karê batch dikare heta 24 saet bidome (li gorî paceya batch a OpenAI). Di her kontrolê de dem a derbasbûyî tê nîşandan di konsolê de.
- Env: `OPENAI_API_KEY` (pêwîst), opsiyonî `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standard 24h), `BATCH_POLL_INTERVAL_MS`.
- Kevn: `translate_web_docs_sync`
  - Bikaranîn (bayraq): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozîsyonela kevn hîn tê qebûlkirin: `OPTS="<doc|all> <lang|all>"`
- Tevger: daxwazên sinkron yên per‑hevok (bê komkirina batch).
- Nîşe: Dema `OPTS` tê winda kirin hîn pirsên têkildar tên xwestin. Her du moda koda blok û koda navxêz diparêzin û front‑matter a `id` nebiguhere; toma li `translation_web_batch.log` (batch) an `translation_web_sync.log` (sync) dike.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Armanc: rêzikên UI yên malperê (rûpela sereke, navbar, footer) ji `website/i18n/en/code.json` ber hemû zimanên li bin `website/i18n/<locale>/code.json` (derxistina `en`) wergerîne.
- Bikaranîn: `make translate_web_index` an `make translate_web_index OPTS="--locales de,fr [--force]"`
- Pêdiviyên: `OPENAI_API_KEY` eksport bike (opsiyonî: `OPENAI_MODEL=gpt-4o-mini`).
- Tevger: şêwaza JSON piştrast dike, cihgirerên qûlekên curly diparêze, URL'yan nayê guherandin, û li ser çewtiyên piştrastkirinê bi pêşniyarê dîsa hewl dide.

---

#### web_build {#mt-web_build}

- Armanc: malpera belgeyan bo `website/build` ava bike.
- Bikaranîn: `make web_build OPTS="--locales en|de,en|all"` (an `BUILD_LOCALES="en de"` saz bike)
- Hundirîn: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Pêdivî: `npm ci` di `website/` de dixebitîne tenê heke `website/node_modules/@docusaurus` winda be.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Armanc: kontrola girêdanan ya bêgirêdayî.
- Bikaranîn: `make web_build_linkcheck OPTS="--locales en|all"`
- Nîşe: bo `tmp_linkcheck_web_pages` ava dike; GH Pages `baseUrl` dikeve `/`; girêdanên HTTP(S) yên dûrî têne derbas kirin.

#### web_build_local_preview {#mt-web_build_local_preview}

- Armanc: pêşdîtina herêmî ya gh‑pages bi test/link‑check a opsiyonî.
- Bikaranîn: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Tevger: pêşî pêşkêşkara pêşdîtinê ya Node tê ceribandin (`scripts/preview-server.mjs`, `/__stop` diparêze), paşê vegere `python3 -m http.server`; li 8080–8090 xizmet dide; PID li `web-local-preview/.server.pid` ye.

#### web_push_github {#mt-web_push_github}

- Armanc: `website/build` bi qutikeya `gh-pages` re push bike.
- Bikaranîn: `make web_push_github`

Şîret: `NPM=…` saz bike da ku rêvebirê pakêtan ya ji aliyê Makefile tê bikaranîn biguherînî (standarda `npm` e).

---
