---
id: development
title: 'Iterambere'
sidebar_label: 'Iterambere'
---

---

## Inyoborora y'Iterambere {#development-guide}

:::note Hindura Icongereza gusa; ubusobanuro mu zindi ndimi burakwiragira
Vugurura inyandiko gusa munsi ya `website/docs` (Icongereza). Ibisobanuro biri munsi ya `website/i18n/<locale>/…` birakorwa mu buryo bwikora kandi ntibikwiye guhindurwa n'intoke. Koresha imirimo yo guhindura (urugero, `make translate_web_docs_batch`) kugira uvugurure ibirimo vy’indimi zaho.
:::

### Ibikenewe imbere y’ugutangura {#prerequisites}

- Node.js 22+ na npm (vyageragejwe na Node 22)
- Thunderbird 128 ESR canke nshasha kurusha (ku igerageza ry’intoke)

---

### Imyubakire y’umushinge (urwego rwo hejuru) {#project-layout-high-level}

- Imizi (root): iskripti yo gupakira `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: kode nyamukuru y’inyongera (background, uburyo bwo guhitamwo/popup UI, manifests, icons)
- `tests/`: urukurikirane rwa Vitest
- `website/`: inyandiko za Docusaurus (harimwo i18n munsi ya `website/i18n/de/...`)

---

### Kwinjiza & Ibikoresho {#install-and-tooling}

- Shiramwo inyongera z’imizi: `npm ci`
- Inyandiko (vy’ukwishaka): `cd website && npm ci`
- Menya intego: `make help`

---

### Iterambere ryo mu gihe nyaco (web‑ext run) {#live-dev-web-ext}

- Ukoresheza vuba muri Firefox Desktop (amagerageza yoroheje ya UI gusa):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Koresha muri Thunderbird (bihambaye kuri MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Inama:
- Gumiza ifunguye Error Console ya Thunderbird (Tools → Developer Tools → Error Console).
- Amapaji y’ivyabaye ya MV3 arahangamirwa iyo ntaco ariko arakora; suvya inyongera inyuma y’impinduka za kode, canke ureke web‑ext yisubirize mu gutangura.
- Bimwe mu bigenamigenderanire vya Firefox gusa biratandukana; igihe cose ni vyiza kubiheragiza muri Thunderbird kugira hubahirizwe API.
- Inzira za bineri za Thunderbird (ingero):
- Linux: `thunderbird` (urugero, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ukutandukanya umwidondoro: Koresha umwidondoro wihariye wa Thunderbird ku iterambere kugira utabangamira imicungararo yawe y’imisi yose.

---

### Intego za Make (mu nyuguti) {#make-targets-alphabetical}

Makefile isanzweza imigendere y’iterambere isanzwe. Koresha `make help` igihe cose kugira ubone insobanuro y’umurongo umwe kuri buri ntego.

Inama: gukoresha `make` ata ntego bitangura imenyu yoroshe ya Whiptail yo guhitamwo intego.

| Inyungu                                                  | Insobanuro y’umurongo umwe                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Kurandura ivyakorewe hano (tmp/, web-local-preview/, website/build/).                                        |
| [`commit`](#mt-commit)                                   | Gushyira ku murongo, gukoresha amagerageza (harimwo i18n), kuvugurura changelog, gukora commit & push.       |
| [`eslint`](#mt-eslint)                                   | Gukoresha ESLint biciye kuri flat config (`npm run -s lint:eslint`).                                         |
| [`help`](#mt-help)                                       | Gutororokanya intego zose n’insobanuro z’umurongo umwe (zitunganyijwe).                                      |
| [`lint`](#mt-lint)                                       | web‑ext lint kuri `sources/` (temp manifest; irengagiza ZIPs; ntituma haba ikosa rikomeye).                  |
| [`menu`](#mt-menu)                                       | Imenyu ikorana kugira uhitemwo intego n’amahitamwo y’inyongera.                                              |
| [`pack`](#mt-pack)                                       | Kubaka ZIPs za ATN & LOCAL (ikoresha linter; ihamagara iskripti yo gupakira).                                |
| [`prettier`](#mt-prettier)                               | Gushyira ku murongo (format) repository aho iri (yandika impinduka).                                         |
| [`prettier_check`](#mt-prettier_check)                   | Prettier mu buryo bwo kugenzura (nta kwandika); iratsindwa niba hakenewe gusubira gutondeka.                 |
| [`prettier_write`](#mt-prettier_write)                   | Izina risubirira `prettier`.                                                                                 |
| [`test`](#mt-test)                                       | Prettier (andika), ESLint, hanyuma Vitest (coverage niramuka yateguwe).                                      |
| [`test_i18n`](#mt-test_i18n)                             | Amagerageza ya i18n gusa: imisimburo/akaranga k’inyongera + kureshanya neza urubuga.                         |
| [`translate_app`](#mt-translation-app)                   | Izina risubirira `translation_app`.                                                                          |
| [`translation_app`](#mt-translation-app)                 | Hindura imirongo ya UI ya porogaramu uvuye muri `sources/_locales/en/messages.json`.                         |
| [`translate_web_docs_batch`](#mt-translation-web)        | Hindura inyandiko z’urubuga ukoresheje OpenAI Batch API (vyahinyanyuwe).                                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | Hindura inyandiko z’urubuga mu buryo busanzwe (legacy, atari batch).                                         |
| [`translate_web_index`](#mt-translation_web_index)       | Izina risubirira `translation_web_index`.                                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | Hindura imirongo ya UI ya homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).       |
| [`web_build`](#mt-web_build)                             | Kubaka inyandiko kuri `website/build` (ishigikira `--locales` / `BUILD_LOCALES`).                            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Isuzuma ry’imihora y’uturonse rikora ata murongo (rirasiba HTTP[S] yo hanze).                                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Ingero y’aho haca gh‑pages; ishusha y’icoreshejwe kuri 8080–8090; amagerageza/isanuro y’uturonse ku bushake. |
| [`web_push_github`](#mt-web_push_github)                 | Shira `website/build` kuri ishami `gh-pages`.                                                                |

Uburyo bw’amahitamwo

- Koresha `make <command> OPTS="…"` gutanga amahitamwo (gukoresha amajambo afise amafato “quotes” birasabwa). Buri ntego hasi aha igira akarorero k’ukoresha.

--

-

#### Inama zo kubaka indimi {#locale-build-tips}

- Kubaka akagice k’indimi: shira `BUILD_LOCALES="en de"` canke uhe `OPTS="--locales en,de"` ku ntego z’urubuga.
- Rerera ururimi rumwe gusa: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Kubaka & Gupakira {#build-and-package}

- Kubaka ZIPs: `make pack`
- Ibisohoka ni ZIPs za ATN na LOCAL mu mizi ya repo (ntukosore ivyakozwe n’intoke)
- Inama: vugurura inomero y’ipurisa (version) muri vyompi `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json` imbere yo gupakira
- Kwinjiza n’intoke (iterambere): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → hitamwo ZIP wubatse

---

### Igerageza {#test}

- Urukurikirane rwose: `make test` (Vitest)
- Coverage (ku bushake):
- `npm i -D @vitest/coverage-v8`
- Koresha `make test`; fungura `coverage/index.html` ku cegeranyo ca HTML
- i18n gusa: `make test_i18n` (amafunguro ya UI/imisimburo/udutwe + kureshanya neza urubuga buri rurimi kuri buri nyandiko hamwe n’igenzura rya id/title/sidebar_label)

---

### Gusuzuma & Amadosiye y’ivyabaye (Logs) {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Hindura logs zisesuye mu gihe porogaramu iri gukora:
- Gukoresha: `messenger.storage.local.set({ debug: true })`
- Kureka: `messenger.storage.local.set({ debug: false })`
- Amadosiye y’ivyabaye arafatwa mu gihe wubaka/canke urungika inyishu

---

### Inyandiko (urubuga) {#docs-website}

- Seriveri y’iterambere: `cd website && npm run start`
- Kubaka urubuga rwa static: `cd website && npm run build`
- Ibisa na Make (mu nyuguti): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ingero z’ukoresheje:
- EN gusa, saba amagerageza/isanuro y’uturonse, nta push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Indimi zose, hamwe n’amagerageza/isanuro y’uturonse, hanyuma push: `make web_build_local_preview && make web_push_github`
- Imbere yo gushira ahabona, kora isuzuma ry’imihora ridakeneye umurongo: `make web_build_linkcheck`.
- i18n: Icongereza kiba muri `website/docs/*.md`; Ubudagi (German) buba muri `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Gushakashaka: Nimba ibidukikije vya Algolia DocSearch vyashizwe muri CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), urubuga rukoresha Algolia; ubundi rucika ku bushakashatsi bwo kuri local. Ku rupapuro ntangamarara (homepage), kanda `/` canke `Ctrl+K` kugira ufungure isandugu yo gushakashaka.

---

#### Inzira yo Kurungika Abatanga Inkunga {#donate-redirect}

- `website/src/pages/donate.js`
- Inzira: `/donate` (kandi `/<locale>/donate`)
- Ingene bikora:
- Niba inzira iriho ifise ururimi (urugero, `/de/donate`), irukoresha
- Ahandi, ihitamwo ihuriro riza hagati ya `navigator.languages` na indimi ziteguwe; igasubira ku rurimi ndungamisi
- Irungika kuri:
- `en` → `/docs/donation`
- izindi → `/<locale>/docs/donation`
- Ikoresha `useBaseUrl` kugira irangurure neza baseUrl
- Harimwo meta refresh + isura `noscript` nk’ingene vyokwihenda vyose vyosubirwamwo

---

---

#### Inama z’Ibere y’Ishusho {#preview-tips}

- Hagarika neza ishusho ya Node: fungura `http://localhost:<port>/__stop` (icanditswe inyuma ya `Local server started`).
- Nimba amashusho adashobora kwiyunguruza muri MDX/JSX, koresha `useBaseUrl('/img/...')` kugira wubahirize `baseUrl` y’urubuga.
- Ishusho (preview) itangura ubwa mbere; isanuro y’uturonse ikurikira kandi ntiyigera ibuza (imihora yo hanze yacitse ntizibuza ishusho gutangura).
- Ingero ya URL y’ishusho: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (icanditswe inyuma ya “Local server started”).
- Imihora yo hanze mu isanuro y’uturonse: Bamwe mu masite yo hanze (urugero, addons.thunderbird.net) barakingira abasaka b’ikora vyikora kandi boshobora kugaragaza 403 mu isanuro y’uturonse. Ishusho iratangura; ivyo birashobora kwirengagizwa ata kibazo.

---

#### Hindura Urubuga {#translate-website}

Ivyo ushobora guhindura

- UI y’urubuga gusa: homepage, navbar, footer, n’imirongo y’utundi duce twa UI. Ibirimo vy’inyandiko (docs) ubu biguma mu Congereza gusa.

Aho wahindurira

- Hindura `website/i18n/<locale>/code.json` (koresha `en` nk’icitegererezo). Bika utahinduye ibisigarijwe nka `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Kurema canke kuvugurura amadosiye

- Kora ibisigarijwe bibuze ku ndimi zose: `npm --prefix website run i18n:stubs`
- Andikako ibisigarijwe uvuye mu Congereza (inyuma yo kongeramwo imirongo mishasha): `npm --prefix website run i18n:stubs:force`
- Uburyo bundi ku rurimi rumwe: `npx --prefix website docusaurus write-translations --locale <locale>`

Hindura imirongo ya UI ya homepage/navbar/footer (OpenAI)

- Shiraho ububasha (credentials) rimwe (shell canke .env):
- `export OPENAI_API_KEY=sk-...`
- Ku bushake: `export OPENAI_MODEL=gpt-4o-mini`
- Icese rimwe (indimi zose, uretse en): `make translate_web_index`
- Gabanya ku ndimi runaka: `make translate_web_index OPTS="--locales de,fr"`
- Sigarura (overwrite) agaciro kariho: `make translate_web_index OPTS="--force"`

Kwemeza & gusubira kugerageza

- Iskripti yo guhindura iremeza imiterere ya JSON, irakingira ibisigarijwe bifise imikoba ya curly-brace, kandi iraraba ko URLs zitahindutse.
- Niharangwa ikosa mu kwemeza, irasubira kugerageza gushika ku biringo 2 hamwe n’inyigisho, imbere yo gusigaza agaciro kariho.

Rerera ururimi rwawe

- Seriveri y’iterambere: `npm --prefix website run start`
- Sura `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Gushikiriza

- Funguza PR ifise amadosiye `code.json` wahinduye. Bika impinduka zifashe ku co wihaye kandi, bishobotse, shiramwo ifoto y’ishusho yihuta.

---

### Inama z’Umutekano & Igenamiterere {#security-and-configuration-tips}

- Ntukore commit ya `sources/manifest.json` (yaremwe gatoya n’ukurenga kubaka)
- Guma `browser_specific_settings.gecko.id` idahinduka kugira ubeze inzira y’ivugururwa (update channel)

---

### Ukugumya Amagenekerezo {#settings-persistence}

- Ububiko: Amagenekerezo yose y’umukoresha abikwa muri `storage.local` kandi agumaho mu gihe c’ivugururwa ry’inyongera.
- Kwinjiza: Defaults arajanwa gusa iyo urufunguruzo ruri kubuze rwose (undefined).
- Kuvugurura: Ukwimura (migration) kuzuza gusa imfunguruzo zibuze; amanota (agaciro) ariho ntarasubirwamwo.
- Akamenyetso ka schema: `settingsVersion` (ubu ni `1`).
- Imfunguruzo n’inyandikiro nsanzwe (defaults):
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: raba `sources/background.js` → `initializeOrMigrateSettings()` na `SCHEMA_VERSION`.

Uko bikorwa mu iterambere (kongerako isetingi nshasha)

- Tereza hejuru `SCHEMA_VERSION` muri `sources/background.js`.
- Ongeramwo urufunguruzo rushasha + default ku kintu `DEFAULTS` muri `initializeOrMigrateSettings()`.
- Koresha itegeko “only-if-undefined” mu gucanisha defaults; ntusubireko amanota ariho.
- Niba iyo setingi iboneka ku mukoresha, iyihuze muri `sources/options.js` kandi wongeremwo imirongo y’indimi zaho.
- Ongeramwo/cungura amagerageza (raba `tests/background.settings.migration.test.js`).

Inama ku igerageza ry’intoke

- Gereranya kwinjiza gishasha: siba ububiko bw’inyongera canke utangure n’umwidondoro mushasha.
- Gereranya ivugururwa: shira `settingsVersion` kuri `0` muri `storage.local` hanyuma wongere ukore load; emeza ko amanota ariho atahindutse kandi ko hiyongereyeko gusa imfunguruzo zibuze.

---

### Gutunganya Ibibazo {#troubleshooting}

- Menya ko Thunderbird ari 128 ESR canke nshasha kurusha
- Koresha Error Console ku bibazo biba mu gihe porogaramu iri gukora
- Niba amagenekerezo abitswe asa n’adafata uko bikwiye, tangura bushasha Thunderbird hanyuma wongere ugerageze. (Thunderbird irashobora kubika ingene ibintu vyifashe hagati y’ibigendeka; gutangura bushasha birorohereza kwinjiza amagenekerezo mashasha.)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) irakoresha vitest n’amarongo y’ibigero vya coverage (85% imirongo/imigirwa (functions)/amashami/imvugo (statements)). Nimba ibigero bitashitse, akazi karatsindwa.
- Uko bikorwa kurashira hejuru igikoresho `coverage-html` gifise icegeranyo ca HTML; urashobora kugikura ku rupapuro rw’ukwihutira (Actions → latest run → Artifacts).

---

### Ugutanga Intererano {#contributing}

- Raba CONTRIBUTING.md ku mabwirizwa ya branch/commit/PR
- Inama: Kora umwidondoro witerambere wa Thunderbird wihariye ku igerageza kugira ntuhungabanye umwidondoro ukoresha buri munsi.

---

### Ubusobanuro (Translations)

- Gukoresha imirimo mininiminini ya “vyose → vyose” mu guhindura birashobora gutwara umwanya kandi bihenze. Tangura n’ak’utwo (urugero, inyandiko nkeyi na 1–2 indimi), raba ivyavuyemwo, hanyuma wiyongere.

---

- Politike yo gusubira kugerageza: imirimo yo guhindura ikora gushika ku bigerageza 3 hamwe n’ukugabanura ukundi (exponential backoff) ku makosa ya API; raba `scripts/translate_web_docs_batch.js` na `scripts/translate_web_docs_sync.js`.

Ifoto z’ishusho ku nyandiko

- Bika amashusho munsi ya `website/static/img/`.
- Yayerekeze muri MD/MDX biciye kuri `useBaseUrl('/img/<filename>')` kugira inzira zikore n’igenamiterere rya `baseUrl` ry’urubuga.
- Inyuma yo kongeramwo canke guhindura amazina y’amashusho munsi ya `website/static/img/`, emeza ko ubuja bukiri gukoresha `useBaseUrl('/img/…')` kandi bukerekana mu ishusho yo kuri local.
  Favicons

- `favicon.ico` ifise ubunini bwinshi irubakwa ukwayo mu nzira zose zo kubaka (Make + scripts) biciye kuri `website/scripts/build-favicon.mjs`.
- Nta ntambwe y’intoke ikenewe; kuvugurura `icon-*.png` birahagije.
  Inama yo gusuzuma

- Gumana front‑matter `id` idahindutse mu nyandiko zahinduwe; hindura gusa `title` na `sidebar_label` iyo bihari.

#### clean {#mt-clean}

- Intego: kurandura ivyakorewe hano (build/preview).
- Uko ikoreshwa: `make clean`
- Ikomora (nihari):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Intego: gushyira ku murongo, kugerageza, kuvugurura changelog, gukora commit, no gukora push.
- Uko ikoreshwa: `make commit`
- Birambuye: ikoresha Prettier (andika), `make test`, `make test_i18n`; yandika inyongera kuri changelog iyo hari ibihinduwe biri ku murongo; ikora push kuri `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Intego: gukoresha ESLint biciye kuri flat config.
- Uko ikoreshwa: `make eslint`

---

#### help {#mt-help}

- Intego: gutororokanya intego zose n’insobanuro z’umurongo umwe.
- Uko ikoreshwa: `make help`

---

#### lint {#mt-lint}

- Intego: gusuzuma MailExtension ukoresheje `web-ext`.
- Uko ikoreshwa: `make lint`
- Ibisobanuro: igira amakopi y’igihe gito `sources/manifest_LOCAL.json` → `sources/manifest.json`; irengagiza ZIPs zubatswe; impashyi (warnings) ntizitera gutsindwa kw’umurongo.

---

#### menu {#mt-menu}

- Intego: imenyu ikorana yo guhitamwo intego ya Make n’amahitamwo.
- Uko ikoreshwa: kora `make` ata majambo.
- Ibisobanuro: niba `whiptail` itaboneka, imenyu isubira kuri `make help`.

---

#### pack {#mt-pack}

- Intego: kubaka ZIPs za ATN na LOCAL (isaba `lint`).
- Uko ikoreshwa: `make pack`
- Inama: terereza hejuru inomero z’ipurisa (version) muri vyompi `sources/manifest_*.json` imbere yo gupakira.

---

#### prettier {#mt-prettier}

- Intego: gushyira ku murongo repository aho iri.
- Uko ikoreshwa: `make prettier`

#### prettier_check {#mt-prettier_check}

- Intego: kugenzura itondeka (nta kwandika).
- Uko ikoreshwa: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Intego: izina risubirira `prettier`.
- Uko ikoreshwa: `make prettier_write`

---

#### test {#mt-test}

- Intego: gukora Prettier (andika), ESLint, hanyuma Vitest (coverage niramuka yashizweho).
- Uko ikoreshwa: `make test`

#### test_i18n {#mt-test_i18n}

- Intego: amagerageza yibanda kuri i18n ku mirongo y’inyongera n’inyandiko z’urubuga.
- Uko ikoreshwa: `make test_i18n`
- Irakora: `npm run test:i18n` na `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Intego: guhindura imirongo ya UI y’inyongera uvuye muri EN ujana mu zindi ndimi.
- Uko ikoreshwa: `make translation_app OPTS="--locales all|de,fr"`
- Ibisobanuro: irakingira imiterere y’utujambo (keys) n’ibisigarijwe; yandika amakuru muri `translation_app.log`. Uburyo bwa script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Intego: guhindura inyandiko z’urubuga uvuye muri `website/docs/*.md` uja muri `website/i18n/<locale>/...`.
- Bigamijwe: `translate_web_docs_batch` (OpenAI Batch API)
  - Uko ikoreshwa (amabendera): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Uburyo busanzwe bwo gutanga ibintu mu myanya (positional) buracemewe: `OPTS="<doc|all> <lang|all>"`
- Ingene bikora: yubaka JSONL, ikarungika, igakurikirana buri masegonda 30, igakuraho ivyavuye, igasohora amadosiye.
- Ibisaba: akazi ka batch gashobora gutwara gushika ku masaha 24 kuranguka (hakurikijwe icicaro ca OpenAI). Console yerekana umwanya umaze ku gukurikirana kumwe kose.
- Ibidukikije: `OPENAI_API_KEY` (bisabwa), ku bushake `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ndungamisi 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Uko ikoreshwa (amabendera): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Uburyo busanzwe bwo gutanga ibintu mu myanya (positional) buracemewe: `OPTS="<doc|all> <lang|all>"`
- Ingene bikora: ibisabwa ku bw’uruhande rumwe ku gihe (synchronous), ata gukusanya muri batch.
- Ibisobanuro: Ibibazo bikoreshwa igihe `OPTS` itabonetse. Uburyo bwompi bwarinda uduciro tw’inkindo (code blocks/inline code) kandi bigumana front‑matter `id` itahinduwe; yandika amakuru muri `translation_web_batch.log` (batch) canke `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Intego: guhindura imirongo ya UI y’urubuga (homepage, navbar, footer) uvuye muri `website/i18n/en/code.json` uja mu ndimi zose munsi ya `website/i18n/<locale>/code.json` (usib除 `en`).
- Uko ikoreshwa: `make translate_web_index` canke `make translate_web_index OPTS="--locales de,fr [--force]"`
- Ibisabwa: export `OPENAI_API_KEY` (ku bushake: `OPENAI_MODEL=gpt-4o-mini`).
- Ingene bikora: iremeza imiterere ya JSON, irakingira ibisigarijwe vya curly‑brace, igasigura ko URLs zitahindutse, kandi igasubira kugerageza hamwe n’inyigisho mu gihe haba amakosa yo kwemeza.

---

#### web_build {#mt-web_build}

- Intego: kubaka urubuga rw’inyandiko kuri `website/build`.
- Uko ikoreshwa: `make web_build OPTS="--locales en|de,en|all"` (can.ke shira `BUILD_LOCALES="en de"`)
- Imy inside: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Ivyisabwa: ikoresha `npm ci` muri `website/` gusa iyo `website/node_modules/@docusaurus` ibuze.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Intego: isanuro y’uturonse ridakeneye umurongo (offline‑safe).
- Uko ikoreshwa: `make web_build_linkcheck OPTS="--locales en|all"`
- Ibisobanuro: yubaka kuri `tmp_linkcheck_web_pages`; yandika ivyanditswe vya GH Pages `baseUrl` bikaja kuri `/`; irasiba imihora ya HTTP(S) yo hanze.

#### web_build_local_preview {#mt-web_build_local_preview}

- Intego: ishusho yo kuri local ya gh‑pages ifise amagerageza/isanuro y’uturonse ku bushake.
- Uko ikoreshwa: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ingene bikora: ibanza kugerageza seriveri y’ishusho ya Node (`scripts/preview-server.mjs`, ishigikira `/__stop`), hanyuma igasubira kuri `python3 -m http.server`; iratanga kuri 8080–8090; PID kuri `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Intego: gushira `website/build` ku ishami `gh-pages`.
- Uko ikoreshwa: `make web_push_github`

Inama: shira `NPM=…` kugira uhanagure umucungarukazi (package manager) ukoreshejwe na Makefile (ndungamisi ni `npm`).
