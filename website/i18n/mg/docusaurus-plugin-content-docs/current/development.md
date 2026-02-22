---
id: development
title: 'Fampandrosoana'
sidebar_label: 'Fampandrosoana'
---

---

## Torolàlana momba ny Fampandrosoana {#development-guide}

:::note Ovay amin'ny teny Anglisy ihany; miparitaka ho azy ny fandikan-teny
Havaozy ny antontan-taratasy **ao anatin'ny** `website/docs` (Anglisy) ihany. Ny fandikan-teny ao amin'ny `website/i18n/<locale>/…` dia vokarina ho azy ka tsy tokony ovaina tanana. Ampiasao ny asa fandikana (oh: `make translate_web_docs_batch`) hanavaozana ny votoaty amin'ny fiteny samihafa.
:::

### Fepetra ilaina mialoha {#prerequisites}

- Node.js 22+ sy npm (voasedra amin'ny Node 22)
- Thunderbird 128 ESR na vaovao kokoa (ho an'ny fitsapana tanana)

---

### Firafitry ny tetikasa (ankapobeny) {#project-layout-high-level}

- Root: script famonosana `distribution_zip_packer.sh`, antontan-taratasy, pikantsary
- `sources/`: kaody fototra an'ny fanampiny (background, safidy/UI popup, manifest, kisary)
- `tests/`: Vitest suite
- `website/`: antontan-taratasy Docusaurus (miaraka amin'ny i18n ao ambanin'ny `website/i18n/de/...`)

---

### Fametrahana sy Fitaovana {#install-and-tooling}

- Apetraho ny fiankinan-doha fototra: `npm ci`
- Docs (tsy voatery): `cd website && npm ci`
- Hikaroka tanjona: `make help`

---

### Fampandrosoana mivantana (web‑ext run) {#live-dev-web-ext}

- Rohy haingana ao amin'ny Firefox Desktop (UI smoke‑tests ihany):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Alefa ao amin'ny Thunderbird (safidy tsara indrindra ho an'ny MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Torohevitra:
- Tazomy misokatra ny Error Console an'ny Thunderbird (Tools → Developer Tools → Error Console).
- Ajanona rehefa tsy miasa ny pejin'ny hetsika MV3; avereno alaina ny fanampiny rehefa misy fiovana amin'ny kaody, na avelao ny web‑ext hanao auto‑reload.
- Misy fitondran-tena hafa ho an'ny Firefox ihany; jereo hatrany ao amin'ny Thunderbird mba hahazoana antoka ny fitoviana amin'ny API.
- Lalan'ny binary an'ny Thunderbird (ohatra):
- Linux: `thunderbird` (ohatra, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Fampisarahana mombamomba: Ampiasao mombamomba Thunderbird misaraka ho an'ny fampandrosoana mba hisorohana ny fiantraikany amin'ny fametrahanao andavanandro.

---

### Tanjona Make (abidy) {#make-targets-alphabetical}

Ny Makefile dia manara-penitra ny fikorianan'ny asa fampandrosoana mahazatra. Alefaso `make help` amin'ny fotoana rehetra hahazoana famintinana andalana tokana ho an'ny tanjona rehetra.

Soso-kevitra: raha alefa `make` tsy misy tanjona dia misokatra menio Whiptail tsotra hisafidianana tanjona.

| Tanjona                                                  | Famaritana andalana tokana                                                                                      |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Esory ny singa build/preview eo an-toerana (tmp/, web-local-preview/, website/build/).                          |
| [`commit`](#mt-commit)                                   | Format, mihazakazaka fitsapana (anisan'izany i18n), manavao changelog, manao commit & push.                     |
| [`eslint`](#mt-eslint)                                   | Mihazakazaka ESLint amin'ny flat config (`npm run -s lint:eslint`).                                             |
| [`help`](#mt-help)                                       | Tantarao avokoa ny tanjona rehetra miaraka amin'ny dokambarotra andalana tokana (voalamina).                    |
| [`lint`](#mt-lint)                                       | web‑ext lint amin'ny `sources/` (manifest vonjimaika; tsy miraharaha ZIP; tsy mampijanona).                     |
| [`menu`](#mt-menu)                                       | Menio ifaneraserana hisafidianana tanjona sy safidy an-tsitrapo.                                                |
| [`pack`](#mt-pack)                                       | Manorina ZIP ATN & LOCAL (mihazakazaka linter; miantso packer script).                                          |
| [`prettier`](#mt-prettier)                               | Manamboatra ny endrika ao amin'ny tahiry (manoratra fiovana).                                                   |
| [`prettier_check`](#mt-prettier_check)                   | Prettier amin'ny maody check (tsy manoratra); tsy mahomby raha mila refomatina.                                 |
| [`prettier_write`](#mt-prettier_write)                   | Anarana hafa ho an'ny `prettier`.                                                                               |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, avy eo Vitest (coverage raha voaendrika).                                             |
| [`test_i18n`](#mt-test_i18n)                             | Fitsapana i18n ihany: placeholders/parity an'ny fanampiny + parity an'ny tranonkala.                            |
| [`translate_app`](#mt-translation-app)                   | Anarana hafa ho an'ny `translation_app`.                                                                        |
| [`translation_app`](#mt-translation-app)                 | Mandika andian-teny UI amin'ny app avy amin'ny `sources/_locales/en/messages.json`.                             |
| [`translate_web_docs_batch`](#mt-translation-web)        | Mandika antontan-taratasy an'ny tranonkala amin'ny alalan'ny OpenAI Batch API (soso-kevitra).                   |
| [`translate_web_docs_sync`](#mt-translation-web)         | Mandika antontan-taratasy an'ny tranonkala amin'ny fomba synchronous (taloha, tsy batch).                       |
| [`translate_web_index`](#mt-translation_web_index)       | Anarana hafa ho an'ny `translation_web_index`.                                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | Mandika UI amin'ny pejy fandraisana/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).         |
| [`web_build`](#mt-web_build)                             | Manorina docs ho any `website/build` (manohana `--locales` / `BUILD_LOCALES`).                                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Link check azo tanterahina offline (mamakivaky lavitra HTTP[S]).                                                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Fijerena mialoha eo an-toerana ny gh‑pages; manompo ho azy amin'ny 8080–8090; fitsapana/link‑check an-tsitrapo. |
| [`web_push_github`](#mt-web_push_github)                 | Atsofohy `website/build` amin'ny sampana `gh-pages`.                                                            |

Sintaksin'ny safidy

- Ampiasao `make <command> OPTS="…"` hanolorana safidy (soso-kevitra ny mampiasa fanononana). Ny tanjona tsirairay etsy ambany dia mampiseho ohatra fampiasana.

--

-

#### Torohevitra amin'ny build isaky ny fiteny {#locale-build-tips}

- Manorina ampaham-piteny ihany: apetraho `BUILD_LOCALES="en de"` na alefa `OPTS="--locales en,de"` amin'ny tanjona web.
- Jereo mialoha fiteny iray manokana: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Fanamboarana sy Famonosana {#build-and-package}

- Manorina ZIP: `make pack`
- Mamoaka ZIP ATN sy LOCAL eo amin'ny fototry ny repo (aza manova tanana ny vokatra)
- Soso-kevitra: havaozy ny dikan-teny ao amin'ny `sources/manifest_ATN.json` sy `sources/manifest_LOCAL.json` alohan'ny hamonosana
- Fametrahana tanana (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → fidio ny ZIP voaorina

---

### Fitsapana {#test}

- Fitambarana feno: `make test` (Vitest)
- Coverage (tsy voatery):
- `npm i -D @vitest/coverage-v8`
- Alefaso `make test`; sokafy `coverage/index.html` ho an'ny tatitra HTML
- i18n ihany: `make test_i18n` (UI keys/placeholders/titles + parity isaky ny fiteny/isaky ny tahiry amin'ny tranonkala miaraka amin'ny fanamarinana id/title/sidebar_label)

---

### Fitiliana olana & Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Atsimbadika ny logs be pitsiny mandritra ny fihodinana:
- Alefa: `messenger.storage.local.set({ debug: true })`
- Atsahatra: `messenger.storage.local.set({ debug: false })`
- Miseho ny log rehefa manoratra/mandefa valiny

---

### Antontan-taratasy (tranonkala) {#docs-website}

- Dev server: `cd website && npm run start`
- Manorina tranonkala static: `cd website && npm run build`
- Mitovy amin'ny Make (abidy): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ohatra fampiasana:
- EN ihany, mandingana fitsapana/link‑check, tsy manao push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Fiteny rehetra, miaraka amin'ny fitsapana/link‑check, avy eo manao push: `make web_build_local_preview && make web_push_github`
- Alohan'ny hamoahana, alefaso ny link check azo tanterahina offline: `make web_build_linkcheck`.
- i18n: Ny Anglisy dia ao amin'ny `website/docs/*.md`; ny fandikan-teny alemà ao amin'ny `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Fikarohana: Raha napetraka ao amin'ny CI ny masontsivana tontolo iainana Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), dia mampiasa fikarohana Algolia ny tranonkala; raha tsy izany dia miverina amin'ny fikarohana eo an-toerana. Ao amin'ny pejy fandraisana, tsindrio `/` na `Ctrl+K` hanokafana ny boaty fikarohana.

---

#### Lalana redirect ho an'ny fanomezana {#donate-redirect}

- `website/src/pages/donate.js`
- Lalana: `/donate` (sy `/<locale>/donate`)
- Fitondran-tena:
- Raha manana fiteny ilay làlana amin'izao (ohatra, `/de/donate`), dia ampiasao izany
- Raha tsy izany, fidio ny fitoviana tsara indrindra avy amin'ny `navigator.languages` sy ireo fiteny voaendrika; avereno amin'ny fiteny default raha tsy mifanaraka
- Mampitodika mankany:
- `en` → `/docs/donation`
- hafa → `/<locale>/docs/donation`
- Mampiasa `useBaseUrl` ho an'ny fitantanana baseUrl marina
- Ahitana meta refresh + rohy `noscript` ho solony raha ilaina

---

---

#### Torohevitra amin'ny preview {#preview-tips}

- Atsaharo tsara ny preview an'i Node: sokafy `http://localhost:<port>/__stop` (aseho aorian'ny `Local server started`).
- Raha tsy miakatra ny sary ao amin'ny MDX/JSX, ampiasao `useBaseUrl('/img/...')` hanajana ny `baseUrl` an'ny tranonkala.
- Ny preview no manomboka aloha; aorian'izay vao mandeha ny link check ary tsy manakana (tsy hampiato ny preview ny rohy ivelany vaky).
- Ohatra URL preview: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (aseho aorian'ny “Local server started”).
- Rohy ivelany ao amin'ny link‑check: Misy tranonkala ivelany (oh: addons.thunderbird.net) manakana crawler mandeha ho azy ka mety haneho 403 amin'ny link check. Mbola manomboka ny preview; azo odian-tsy hita ireo.

---

#### Handika ny tranonkala {#translate-website}

Azonao adika

- UI an'ny tranonkala ihany: pejy fandraisana, navbar, footer, ary andian-teny UI hafa. Mijanona amin'ny teny Anglisy aloha ny votoatin'ny docs.

Aiza no hanovana

- Ovay `website/i18n/<locale>/code.json` (ampiasao `en` ho fanovozan-kevitra). Tazomy tsy miova ny placeholders toy ny `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Mamokatra na manavao rakitra

- Mamorona stubs tsy ampy ho an'ny fiteny rehetra: `npm --prefix website run i18n:stubs`
- Manoritra indray ny stubs avy amin'ny Anglisy (rehefa manampy andian-teny vaovao): `npm --prefix website run i18n:stubs:force`
- Safidy hafa ho an'ny fiteny tokana: `npx --prefix website docusaurus write-translations --locale <locale>`

Mandika andian-teny UI amin'ny pejy fandraisana/navbar/footer (OpenAI)

- Atokana indray mandeha ny fahazoan-dàlana (shell na .env):
- `export OPENAI_API_KEY=sk-...`
- Tsy voatery: `export OPENAI_MODEL=gpt-4o-mini`
- Indray mandeha (fiteny rehetra, mandingana en): `make translate_web_index`
- Famerana amin'ny fiteny voafaritra: `make translate_web_index OPTS="--locales de,fr"`
- Soraty ambony ireo sanda efa misy: `make translate_web_index OPTS="--force"`

Fanamarinana sy famerenana

- Manamarina ny firafitry ny JSON ny script fandikana, mitazona ireo placeholders ao anaty fonon-kibo, ary miantoka fa tsy miova ny URL.
- Raha tsy mahomby ny fanamarinana dia mamerina miaraka amin'ny fanehoan-kevitra hatramin'ny in‑2 alohan'ny hitazonana ny sanda efa misy.

Jereo mialoha ny fiteninao

- Dev server: `npm --prefix website run start`
- Tsidiho `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Fandefasana

- Sokafy PR miaraka amin'ny rakitra `code.json` nohavaozina. Tazomy ho voafaritra ny fiovana ary ampidirio sary pikantsary fohy raha azo atao.

---

### Torohevitra momba ny fiarovana sy ny fikirakirana {#security-and-configuration-tips}

- Aza manao commit an'i `sources/manifest.json` (foronina vetivety amin'ny build)
- Tazomy ho marin-toerana ny `browser_specific_settings.gecko.id` mba hitazonana ny fantsona fanavaozana

---

### Fitohizan'ny toe-javatra {#settings-persistence}

- Fitehirizana: Ny toe-javatra rehetra an'ny mpampiasa dia ao amin'ny `storage.local` ary maharitra mandritra ny fanavaozana ny fanampiny.
- Fametrahana: Ampiharina ihany ny sanda default rehefa tena tsy misy (undefined) ilay key.
- Fanavaozana: Ny migration dia mameno ny keys tsy ampy ihany; tsy hosoloina mihitsy ny sanda efa misy.
- Marika schema: `settingsVersion` (ankehitriny `1`).
- Keys sy defaults:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kaody: jereo `sources/background.js` → `initializeOrMigrateSettings()` ary `SCHEMA_VERSION`.

Fandehanan'asa dev (manampy toe-javatra vaovao)

- Amboary ny `SCHEMA_VERSION` ao amin'ny `sources/background.js`.
- Ampio ny key vaovao + default ao amin'ny zavatra `DEFAULTS` ao amin'ny `initializeOrMigrateSettings()`.
- Ampiasao ny fitsipika "only-if-undefined" rehefa manome defaults; aza manindry soratra ny sanda efa misy.
- Raha miseho amin'ny mpampiasa ilay toe-javatra, ampidiro ao amin'ny `sources/options.js` izy ary ampio andian-teny nadika.
- Ampio/ahitsio ny fitsapana (jereo `tests/background.settings.migration.test.js`).

Torohevitra fitsapana tanana

- Simulo fametrahana vaovao tanteraka: diovy ny lahatahiry angon-drakitra an'ny fanitarana na atombohy amin'ny mombamomba vaovao.
- Simulo fanavaozana: apetraho ho `0` ny `settingsVersion` ao amin'ny `storage.local` ary avereno alaina; hamafiso fa tsy miova ny sanda efa misy ary keys tsy ampy ihany no ampiana.

---

### Fikarakarana olana {#troubleshooting}

- Ataovy azo antoka fa 128 ESR na vaovao kokoa ny Thunderbird
- Ampiasao ny Error Console ho an'ny olana amin'ny fotoana iasana
- Raha toa ka toa tsy miasa ny toe-javatra voatahiry, avereno alefa ny Thunderbird dia andramo indray. (Mety hitahiry toetry ny session i Thunderbird; ny famerenana dia miantoka fa toe-javatra vaovao no alaina.)

---

### CI sy Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) dia mihazakazaka vitest miaraka amin'ny fetran'ny coverage (85% lines/functions/branches/statements). Raha tsy tratra ireo fetrany dia tsy mahomby ny asa.
- Mampiakatra singa (artifact) `coverage-html` miaraka amin'ny tatitra HTML ny workflow; trohy avy amin'ny pejin'ny fihazakazahana (Actions → fandehanana farany → Artifacts).

---

### Fandraisana anjara {#contributing}

- Jereo ny CONTRIBUTING.md ho an'ny torolàlana momba ny sampana/commit/PR
- Soso-kevitra: Mamoròna mombamomba fampandrosoana Thunderbird misaraka ho an'ny fitsapana mba tsy hisy fiantraikany amin'ny mombamomba andavanandro.

---

### Fandikan-teny

- Mety ho miadana sy lafo ny fanatanterahana asa fandikana “all → all” lehibe. Atombohy amin'ny ampahany (ohatra, antontan-taratasy vitsivitsy sy fiteny 1–2), jereo ny vokatra, avy eo aparitaho.

---

- Politikan'ny famerenana: ny asa fandikana dia miezaka hatramin'ny in‑3 miaraka amin'ny exponential backoff rehefa misy fahadisoana API; jereo `scripts/translate_web_docs_batch.js` sy `scripts/translate_web_docs_sync.js`.

Pikantsary ho an'ny antontan-taratasy

- Tehirizo ao ambanin'ny `website/static/img/` ny sary.
- Anondro ao amin'ny MD/MDX amin'ny alalan'ny `useBaseUrl('/img/<filename>')` izy ireo mba hifanaraka amin'ny `baseUrl` an'ny tranonkala ny lalana.
- Rehefa manampy na manova anarana sary ao ambanin'ny `website/static/img/`, hamafiso fa mbola mampiasa `useBaseUrl('/img/…')` avokoa ny fanondroana ary miseho tsara amin'ny preview eo an-toerana.
  Favicons

- Ny `favicon.ico` misy habe maro dia vokarina ho azy amin'ny lalana build rehetra (Make + scripts) amin'ny alalan'ny `website/scripts/build-favicon.mjs`.
- Tsy mila dingana tanana; ampio fotsiny ny fanavaozana ao amin'ny `icon-*.png`.
  Torohevitra fanamarinana

- Tazomy tsy miova ny `id` ao amin'ny front‑matter amin'ny docs voadika; adikao ihany ny `title` sy `sidebar_label` raha misy.

#### clean {#mt-clean}

- Tanjon'ny asa: manaisotra ireo singa build/preview eo an-toerana.
- Fampiasana: `make clean`
- Esorina (raha misy):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tanjon'ny asa: format, fitsapana, havaozina ny changelog, manao commit, ary push.
- Fampiasana: `make commit`
- Antsipiriany: mihazakazaka Prettier (write), `make test`, `make test_i18n`; manampy changelog rehefa misy diffs voa-stage; manao push amin'ny `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tanjon'ny asa: mihazakazaka ESLint amin'ny flat config.
- Fampiasana: `make eslint`

---

#### help {#mt-help}

- Tanjon'ny asa: mitanisa ny tanjona rehetra miaraka amin'ny dokambarotra andalana tokana.
- Fampiasana: `make help`

---

#### lint {#mt-lint}

- Tanjon'ny asa: lint amin'ny MailExtension amin'ny `web-ext`.
- Fampiasana: `make lint`
- Fanamarihana: manao dika vonjimaika `sources/manifest_LOCAL.json` → `sources/manifest.json`; tsy miraharaha ZIP voaorina; tsy mampijanona ny pipeline ny fampitandremana.

---

#### menu {#mt-menu}

- Tanjon'ny asa: menio ifaneraserana hisafidianana tanjona Make sy safidy an-tsitrapo.
- Fampiasana: alefaso `make` tsy misy argument.
- Fanamarihana: raha tsy misy `whiptail`, dia miverina amin'ny `make help` ny menio.

---

#### pack {#mt-pack}

- Tanjon'ny asa: manorina ZIP ATN sy LOCAL (miankina amin'ny `lint`).
- Fampiasana: `make pack`
- Soso-kevitra: ampidiro ny dikan-teny ao amin'ny `sources/manifest_*.json` alohan'ny hamonosana.

---

#### prettier {#mt-prettier}

- Tanjon'ny asa: manamboatra ny endriky ny repo eo an-toerana.
- Fampiasana: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tanjon'ny asa: manamarina ny formatting (tsy manoratra).
- Fampiasana: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tanjon'ny asa: anarana hafa ho an'ny `prettier`.
- Fampiasana: `make prettier_write`

---

#### test {#mt-test}

- Tanjon'ny asa: mihazakazaka Prettier (write), ESLint, avy eo Vitest (coverage raha voapetraka).
- Fampiasana: `make test`

#### test_i18n {#mt-test_i18n}

- Tanjon'ny asa: fitsapana mifantoka amin'ny i18n ho an'ny andian-teny an'ny fanampiny sy ny docs an'ny tranonkala.
- Fampiasana: `make test_i18n`
- Mihazakazaka: `npm run test:i18n` sy `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tanjon'ny asa: mandika andian-teny UI an'ny fanampiny avy amin'ny EN ho amin'ny fiteny hafa.
- Fampiasana: `make translation_app OPTS="--locales all|de,fr"`
- Fanamarihana: mitazona ny firafitry ny key sy ny placeholders; manoratra log ao amin'ny `translation_app.log`. Endrika script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tanjon'ny asa: mandika antontan-taratasy an'ny tranonkala avy amin'ny `website/docs/*.md` ho amin'ny `website/i18n/<locale>/...`.
- Soso-kevitra: `translate_web_docs_batch` (OpenAI Batch API)
  - Fampiasana (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Mbola ekena ny positional taloha: `OPTS="<doc|all> <lang|all>"`
- Fitondran-tena: manangana JSONL, mampiakatra, manara-maso isaky ny 30s, misintona vokatra, manoratra rakitra.
- Fanamarihana: mety haharitra hatramin'ny 24 ora ny asa batch iray (araka ny varavarankelin'ny batch an'i OpenAI). Miseho ao amin'ny console ny fotoana lany isaky ny fanaraha-maso.
- Tontolo iainana: `OPENAI_API_KEY` (takiana), tsy voatery `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Taloha: `translate_web_docs_sync`
  - Fampiasana (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Mbola ekena ny positional taloha: `OPTS="<doc|all> <lang|all>"`
- Fitondran-tena: fangatahana synchronous isaky ny mpivady (tsy misy batch).
- Fanamarihana: Fanontaniana ifaneraserana rehefa tsy voatonona `OPTS`. Ireo maody roa dia mitahiry ny code blocks/inline code ary mitazona tsy miova ny `id` ao amin'ny front‑matter; manoratra log ao amin'ny `translation_web_batch.log` (batch) na `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tanjon'ny asa: mandika andian-teny UI (pejy fandraisana, navbar, footer) avy amin'ny `website/i18n/en/code.json` ho amin'ny fiteny rehetra ao ambanin'ny `website/i18n/<locale>/code.json` (afa-tsy `en`).
- Fampiasana: `make translate_web_index` na `make translate_web_index OPTS="--locales de,fr [--force]"`
- Fepetra: export `OPENAI_API_KEY` (tsy voatery: `OPENAI_MODEL=gpt-4o-mini`).
- Fitondran-tena: manamarina ny firafitry ny JSON, mitahiry placeholders ao anaty fonon-kibo, mitazona tsy miova ny URL, ary mamerina miaraka amin'ny fanehoan-kevitra raha misy hadisoana fanamarinana.

---

#### web_build {#mt-web_build}

- Tanjon'ny asa: manorina ny tranonkala docs ho any `website/build`.
- Fampiasana: `make web_build OPTS="--locales en|de,en|all"` (na apetraho `BUILD_LOCALES="en de"`)
- Anatiny: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: mihazakazaka `npm ci` ao amin'ny `website/` raha toa ka tsy misy `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tanjon'ny asa: link check azo tanterahina offline.
- Fampiasana: `make web_build_linkcheck OPTS="--locales en|all"`
- Fanamarihana: manorina ho any `tmp_linkcheck_web_pages`; manova `baseUrl` an'ny GH Pages ho `/`; mandingana rohy lavitra HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- Tanjon'ny asa: preview gh‑pages eo an-toerana miaraka amin'ny fitsapana/link‑check an-tsitrapo.
- Fampiasana: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Fitondran-tena: manandrana server preview an'i Node aloha (`scripts/preview-server.mjs`, manohana `/__stop`), miverina amin'ny `python3 -m http.server` raha ilaina; manompo amin'ny 8080–8090; PID ao amin'ny `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tanjon'ny asa: manosika `website/build` ho any amin'ny sampana `gh-pages`.
- Fampiasana: `make web_push_github`

Soso-kevitra: apetraho `NPM=…` hanoloana ny mpitantana fonosana ampiasain'ny Makefile (default `npm`).
