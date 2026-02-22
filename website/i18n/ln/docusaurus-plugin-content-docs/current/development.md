---
id: development
title: 'Bokoli'
sidebar_label: 'Bokoli'
---

---

## Etambwisi ya Bokeli {#development-guide}

:::note Edit English only; translations propagate
Bongisa na Lingelesi kaka na se ya `website/docs`. Bobongoli na se ya `website/i18n/<locale>/…` esalemaka na ndenge ya otomatik mpe esengeli te kobongisama na maboko. Salela misala ya bobongoli (ndakisa, `make translate_web_docs_batch`) mpo na kosukisa lisusu makomi ya lokálɛ.
:::

### Biloko esengeli liboso {#prerequisites}

- Node.js 22+ mpe npm (eyekolami na Node 22)
- Thunderbird 128 ESR to ya sika koleka (mpo na komeka na maboko)

---

### Etando ya Projɛ (na boye ya likoló) {#project-layout-high-level}

- Rasin: script ya kopakola `distribution_zip_packer.sh`, mikanda, bafoto ya écran
- `sources/`: kɔdɛ ya mokapo ya add‑on (background, options/popup UI, manifests, icons)
- `tests/`: suite ya Vitest
- `website/`: mikanda ya Docusaurus (na i18n na se ya `website/i18n/de/...`)

---

### Kotiá mpe Bisaleli {#install-and-tooling}

- Kotiá ba deps ya rasin: `npm ci`
- Mikanda (ya kopona): `cd website && npm ci`
- Koyeba ba target: `make help`

---

### Bokeli na bomoi (web‑ext run) {#live-dev-web-ext}

- Loop ya mbangumangu na Firefox Desktop (ba smoke‑tests ya UI kaka):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Kokima na Thunderbird (eleki malamu mpo na MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Banɔti:
- Tikala kofungola Error Console ya Thunderbird (Tools → Developer Tools → Error Console).
- Ba lokasa ya likambo ya MV3 ebotamaka ntango ezali na posa te; zongisa add‑on sima ya kobongola kɔdɛ, to tika web‑ext e‑reload otomatik.
- Bameseno mosusu oyo ezali kaka na Firefox ekeseni; tala ntango nyonso na Thunderbird mpo na kolanda API malamu.
- Banzela ya binaire ya Thunderbird (bandakisa):
- Linux: `thunderbird` (ndakisa, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Kobotola profili: Salela profili mosusu ya Thunderbird mpo na bokeli mpo ete esimba te bokatoli ya mokolo na mokolo.

---

### Ba Target ya Make (na alfabeti) {#make-targets-alphabetical}

Makefile ebongisi ndenge ya misala ya bokeli ya ndakisa. Kanga `make help` na ntango nyonso mpo na maloba ya mokuse ya target moko na moko.

Lelɔmba: kokimisa `make` na boye te ya target efungola menu ya pete ya Whiptail mpo na kopona target.

| Target                                                   | Maloba ya mokuse ya maloba moko                                                              |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Longola biloko ya batongi/preview ya lokalɛ (tmp/, web-local-preview/, website/build/).      |
| [`commit`](#mt-commit)                                   | Formatɛ, sambisa ba test (ekɔtisi i18n), bɔtɔla changelog, commit & push.                    |
| [`eslint`](#mt-eslint)                                   | Sambisa ESLint na nzela ya flat config (`npm run -s lint:eslint`).                           |
| [`help`](#mt-help)                                       | Lakisa ba target nyonso na maloba moko ya mokuse (epɔnisami).                                |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (manifest ya ntango moke; ebwaka ZIP; non‑fatal).                 |
| [`menu`](#mt-menu)                                       | Menu ya kosolola mpo na kopona target mpe ba argument ya kopona.                             |
| [`pack`](#mt-pack)                                       | Bɔtɔla ATN & LOCAL ZIPs (ebetaka linter; ebenga script ya packer).                           |
| [`prettier`](#mt-prettier)                               | Formatɛ depɔ na esika (ekomisaka bambongwana).                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier na mode ya kotalela (ekomi te); eyebuka soki esengeli kofomate lisusu.              |
| [`prettier_write`](#mt-prettier_write)                   | Alias mpo na `prettier`.                                                                     |
| [`test`](#mt-test)                                       | Prettier (ekomi), ESLint, sima Vitest (couverture soki econfigurami).                        |
| [`test_i18n`](#mt-test_i18n)                             | Ba test ya i18n kaka: ba placeholders/parite ya add‑on + parite ya website.                  |
| [`translate_app`](#mt-translation-app)                   | Alias mpo na `translation_app`.                                                              |
| [`translation_app`](#mt-translation-app)                 | Bobongola baloba ya UI ya app uta `sources/_locales/en/messages.json`.                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Bobongola mikanda ya website na OpenAI Batch API (eleki malamu).                             |
| [`translate_web_docs_sync`](#mt-translation-web)         | Bobongola mikanda ya website na ndenge ya synchronisé (ancien, non-batch).                   |
| [`translate_web_index`](#mt-translation_web_index)       | Alias mpo na `translation_web_index`.                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Bobongola UI ya homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Bɔtɔla mikanda na `website/build` (esungi `--locales` / `BUILD_LOCALES`).                    |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kotalela ba lien na offline‑safe (ebwaka HTTP[S] ya libanda).                                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Preview ya gh‑pages lokalɛ; auto‑serve na 8080–8090; ba test/link‑check ya kopona.           |
| [`web_push_github`](#mt-web_push_github)                 | Pusa `website/build` na branche `gh-pages`.                                                  |

Syntaxe ya ba options

- Salela `make <command> OPTS="…"` mpo na kopesa ba options (banani “quotes” esengeli). Target moko na moko awa na nse ezali na ndakisa ya bosaleli.

--

-

#### Banɔti ya kotonga na lokále {#locale-build-tips}

- Tɔnga ndambo ya ba locale: tía `BUILD_LOCALES="en de"` to pesa `OPTS="--locales en,de"` na ba target ya web.
- Preview ya lokále moko: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Kobaka mpe Kopakola {#build-and-package}

- Kobotola ZIPs: `make pack`
- Epɛtɔli ATN mpe LOCAL ZIPs na motó ya depɔ (kobongola mabongisi ya biloko te na maboko)
- Lelɔmba: bɔtɔla version na nse ya `sources/manifest_ATN.json` mpe `sources/manifest_LOCAL.json` liboso ya kopakola
- Kotiá na maboko (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → pona ZIP oyo obɔtɔli

---

### Esɛ́yi {#test}

- Suite mobimba: `make test` (Vitest)
- Couverture (ya kopona):
- `npm i -D @vitest/coverage-v8`
- Kima `make test`; fungola `coverage/index.html` mpo na rapɔ ya HTML
- i18n kaka: `make test_i18n` (ba clés ya UI/placeholders/titles + parite ya website po na lokále moko na mikanda moko elongo na kotalela id/title/sidebar_label)

---

### Kosakola Mabunga & Ba Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Bobongola logs ya mingi na tango ya kosala:
- Kobongola: `messenger.storage.local.set({ debug: true })`
- Kofina: `messenger.storage.local.set({ debug: false })`
- Ba logs emonanaka na tango ya kokomisa/kotinda biyano

---

### Mikanda (website) {#docs-website}

- Server ya dev: `cd website && npm run start`
- Botongi site statik: `cd website && npm run build`
- Ba Make oyo ekokanaka (na alfabeti): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Bandakisa ya bosaleli:
- EN kaka, bɔtola ba tests/link‑check, kozongisa te: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Ba locale nyonso, elongo na ba tests/link‑check, sima pusa: `make web_build_local_preview && make web_push_github`
- Liboso ya kobimisa, sambisa link check ya offline‑safe: `make web_build_linkcheck`.
- i18n: Lingelesi ezali na `website/docs/*.md`; bobongoli ya Alémani ezali na `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Boluki: Soki bakoki ya environnement ya Algolia DocSearch batiami na CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), site esalelaka boluki ya Algolia; soki te, ezongaka na boluki ya lokalɛ. Na homepage, finá `/` to `Ctrl+K` mpo na kofungola kaxa ya boluki.

---

#### Nzela ya kobimisa na “Donate” {#donate-redirect}

- `website/src/pages/donate.js`
- Nzela: `/donate` (mpe `/<locale>/donate`)
- Bizaleli:
- Soki nzela ya sikoyo ezali na lokále (ndakisa, `/de/donate`), salela yango
- Soki te, pona oyo eleki malamu kati ya `navigator.languages` mpe ba lokále oyo batiami; zongela na lokále ya ndakisa soki ezali te
- Ezongisaka na:
- `en` → `/docs/donation`
- misusu → `/<locale>/docs/donation`
- Esalelaka `useBaseUrl` mpo na bobateli ya malamu ya baseUrl
- Ezali na meta refresh + lien `noscript` lokola ndingisa ya nsima

---

---

#### Banɔti ya Preview {#preview-tips}

- Kofina Node preview malamu: fungola `http://localhost:<port>/__stop` (epesamaka sima ya `Local server started`).
- Soki bafoto eyebani te na MDX/JSX, salela `useBaseUrl('/img/...')` mpo na kokumisa `baseUrl` ya site.
- Preview ebandaka liboso; link check esalemi sima mpe ezali te ya koboma mosala (ba lien ya libanda oyo ebuka ekotɛlɛma te preview).
- URL ya preview ndakisa: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (epesamaka sima ya “Local server started”).
- Ba lien ya libanda na link‑check: Ba site mosusu (ndakisa, addons.thunderbird.net) eboyaka ba crawlers ya otomatik mpe ekoki kopesa 403 na link checks. Preview ebandaka kaka; okoki kobwaka yango.

---

#### Bobongola Website {#translate-website}

Oyo okoki kobongola

- UI ya website kaka: homepage, navbar, footer, mpe bakundi ya UI mosusu. Makomi ya mikanda ekotikala Lingelesi kaka sik’oyo.

Esika ya kobongola

- Bongisa `website/i18n/<locale>/code.json` (salela `en` lokola ndakisa). Tikala kokitisa te ba placeholders lokola `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Bimisa to sanzola bafile

- Sala ba stubs oyo ezali te mpo na ba locale nyonso: `npm --prefix website run i18n:stubs`
- Koma likolo ba stubs uta na Lingelesi (sima ya kobakisa biloba ya sika): `npm --prefix website run i18n:stubs:force`
- Ndakisa mosusu mpo na lokále moko: `npx --prefix website docusaurus write-translations --locale <locale>`

Bobongola baloba ya UI ya homepage/navbar/footer (OpenAI)

- Tía bala‑balangɛ moko (na shell to .env):
- `export OPENAI_API_KEY=sk-...`
- Ya kopona: `export OPENAI_MODEL=gpt-4o-mini`
- Mbala moko (ba locale nyonso, kobwaka en): `make translate_web_index`
- Kaba na ba locale moko: `make translate_web_index OPTS="--locales de,fr"`
- Koma likolo bamemya oyo ezalaka: `make translate_web_index OPTS="--force"`

Kokanga & ba retry

- Script ya bobongoli elɛngisaka forme ya JSON, ebátelaka ba placeholders na makɔngɔ, mpe etya ntembe ete ba URL babongwani te.
- Soki validation ebuki, esilaka kosala lisusu na nzela ya mayele mbala mibale liboso ya kotika ba valɛr oyo ezalaka.

Talela lokále na yo

- Server ya dev: `npm --prefix website run start`
- Talá `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Kokɔtisa

- Fungola PR na bafile `code.json` oyo obongoli. Tika mabongoli ezala moke mpe bakisa écran moko soki ekoki.

---

### Bokengi & Banɔti ya Konfigurasyon {#security-and-configuration-tips}

- Kobakisa te `sources/manifest.json` (esalemaka na ntango moke na botongi)
- Tika `browser_specific_settings.gecko.id` ezala ntango nyonso mpo na kobatela kanalɛ ya mise à jour

---

### Botikalaki ya ba Paramɛtrɛ {#settings-persistence}

- Stockage: Ba paramɛtrɛ nyonso ya mosaleli ezali na `storage.local` mpe etikalaka na mikolo nyonso ya ba mise à jour ya add‑on.
- Kotiá: Ba défaut esalemi kaka soki clé moko ezali mpenza na se (undefined).
- Mise à jour: Migration etondi kaka ba clés oyo ezangi; ba valɛr oyo ezalaka ekomisamaka naino te.
- Eloko ya kolakisa schéma: `settingsVersion` (sik’oyo `1`).
- Ba clés mpe ba défaut:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kɔdɛ: tala `sources/background.js` → `initializeOrMigrateSettings()` mpe `SCHEMA_VERSION`.

Mosala ya dev (kobakisa paramɛtrɛ ya sika)

- Tombolisa `SCHEMA_VERSION` na `sources/background.js`.
- Bakisa clé ya sika + défaut na eloko `DEFAULTS` na `initializeOrMigrateSettings()`.
- Salela mobeko ya “kaka soki ezali undefined” tango ozali kotya ba défaut; koma likolo te ba valɛr oyo ezalaka.
- Soki paramɛtrɛ ezali monene mpo na mosaleli, bɛndá yango na `sources/options.js` mpe bakisa baloba ya lokálɛ.
- Bakisa/tongola ba test (tala `tests/background.settings.migration.test.js`).

Banɔti ya komeka na maboko

- Yoka lokolia install ya sika: pambola dosiye ya ba donɛ ya extension to yambo na profili ya sika.
- Yoka mise à jour: tía `settingsVersion` na `0` na `storage.local` mpe zongisa; ndimisá ete ba valɛr oyo ezalaka ebongwani te mpe kaka ba clés oyo ezángaki nde bakɔtisami.

---

### Kosilisa Makambo {#troubleshooting}

- Zala na ntembe te ete Thunderbird ezali 128 ESR to koleka
- Salela Error Console mpo na makambo na tango ya kosala
- Soki ba paramɛtrɛ ya kobomba emonanaka lokola ezali kosalela malamu te, zongisa Thunderbird mpe meka lisusu. (Thunderbird ekoki kobomba etat na ba session; kozongisa ezalaka kopesa paramɛtrɛ ya sika.)

---

### CI & Couverture {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) esambisaka vitest na ba seuil ya couverture (85% lignes/fonctions/branches/déclarations). Soki ba seuil ekokisami te, mosala ebukaka.
- Workflow etindaka eloko `coverage-html` elongo na rapɔ HTML; telemisa yango uta na lokasa ya run (Actions → run ya suka → Artifacts).

---

### Bokɔtisi mosala {#contributing}

- Tala CONTRIBUTING.md mpo na mibeko ya branche/commit/PR
- Lelɔmba: Salela profili mosusu ya développement ya Thunderbird mpo na komeka mpo na kobɛtɛla te profili ya mokolo na mokolo.

---

### Bobongoli

- Kosala misala minene ya bobongoli “nyonso → nyonso” ekoki kozala ntembe mpe ntalo. Banda na ndambo moke (ndakisa, mikanda mikomoko mpe ba locale 1–2), talá soki ezali malamu, sima limbolá.

---

- Politiki ya retry: Misala ya bobongoli esalaka tii ba retry 3 na backoff exponentiel soki API ezongi na masolo; tala `scripts/translate_web_docs_batch.js` mpe `scripts/translate_web_docs_sync.js`.

Bafoto ya écran mpo na mikanda

- Tya bafoto na `website/static/img/`.
- Bandima yango na MD/MDX na nzela ya `useBaseUrl('/img/<filename>')` mpo na banzela esala malamu na `baseUrl` ya site.
- Sima ya kobakisa to kobenga kombo ya bafoto na se ya `website/static/img/`, zala na ntembe te ete ba référence nyonso esalelaka naino `useBaseUrl('/img/…')` mpe emonanaka na preview ya lokalɛ.
  Favicons

- `favicon.ico` ya ba tailles mingi esalemi otomatik na banzela nyonso ya botongi (Make + ba scripts) na nzela ya `website/scripts/build-favicon.mjs`.
- Etapo ya maboko esengeli te; kobongola `icon-*.png` ezali kaka.

  Lelɔmba ya botali

- Tika `id` ya front‑matter ebongwana te na mikanda ebongolami; bobongola kaka `title` mpe `sidebar_label` soki ezali.

#### clean {#mt-clean}

- Sika: longola biloko ya botongi/preview ya lokalɛ.
- Bosaleli: `make clean`
- Elongolaka (soki ezali):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Sika: formatɛ, test, bɔtɔla changelog, commit, mpe push.
- Bosaleli: `make commit`
- Makambo: ebɛtaka Prettier (ekomi), `make test`, `make test_i18n`; ebakisi changelog soki ezali na ba difu oyo batiami; epusaka na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Sika: sambisa ESLint na nzela ya flat config.
- Bosaleli: `make eslint`

---

#### help {#mt-help}

- Sika: lakisa ba target nyonso na maloba moko ya mokuse.
- Bosaleli: `make help`

---

#### lint {#mt-lint}

- Sika: lint ya MailExtension na `web-ext`.
- Bosaleli: `make lint`
- Nɔti: ekopi‑mɛsɔ `sources/manifest_LOCAL.json` → `sources/manifest.json`; ebwaka ZIPs oyo ebimi; ba warning ebukisaka te pipeline.

---

#### menu {#mt-menu}

- Sika: menu ya kosolola mpo na kopona Make target mpe ba argument ya kopona.
- Bosaleli: kima `make` na ba argument te.
- Nɔti: soki `whiptail` ezali te, menu ezongeli `make help`.

---

#### pack {#mt-pack}

- Sika: bɔtɔla ATN mpe LOCAL ZIPs (ezali na etamboli ya `lint`).
- Bosaleli: `make pack`
- Lelɔmba: tombolisa ba version na mabulu mibale `sources/manifest_*.json` liboso ya kopakola.

---

#### prettier {#mt-prettier}

- Sika: formatɛ depɔ na esika.
- Bosaleli: `make prettier`

#### prettier_check {#mt-prettier_check}

- Sika: kotalela format (ekomi te).
- Bosaleli: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Sika: alias mpo na `prettier`.
- Bosaleli: `make prettier_write`

---

#### test {#mt-test}

- Sika: kima Prettier (ekomi), ESLint, sima Vitest (couverture soki kati).
- Bosaleli: `make test`

#### test_i18n {#mt-test_i18n}

- Sika: ba test ya i18n na makambo ya baloba ya add‑on mpe mikanda ya website.
- Bosaleli: `make test_i18n`
- Esalaka: `npm run test:i18n` mpe `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Sika: bobongola baloba ya UI ya add‑on uta EN na ba locale mosusu.
- Bosaleli: `make translation_app OPTS="--locales all|de,fr"`
- Nɔti: ebátelaka forme ya ba clés mpe ba placeholders; etá na `translation_app.log`. Forme ya script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Sika: bobongola mikanda ya website uta `website/docs/*.md` na `website/i18n/<locale>/...`.
- Eleki malamu: `translate_web_docs_batch` (OpenAI Batch API)
  - Bosaleli (ba flague): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisionel ancien ezwamaka naino: `OPTS="<doc|all> <lang|all>"`
- Bizaleli: ebongisi JSONL, etindaka, etala na etuka 30s, ezwasaka ba nsima, ekomisaka bafile.
- Nɔti: mosala ya batch ekoki kozwa tii mikolo 24 mpo esilisa (na ndakisa ya fenêtre ya batch ya OpenAI). Console ezali kolakisa ntango eleki na poll moko na moko.
- Environnement: `OPENAI_API_KEY` (esengeli), ya kopona `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (defaut 24h), `BATCH_POLL_INTERVAL_MS`.
- Ancien: `translate_web_docs_sync`
  - Bosaleli (ba flague): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posisionel ancien ezwamaka naino: `OPTS="<doc|all> <lang|all>"`
- Bizaleli: basɛ́ngi ya synchronisé mpo na lipayi moko na moko (batch te).
- Nɔti: Mituna ya kosolola soki `OPTS` ebwakami. Makambo mibale ebátelaka ba code blocks/inline code mpe batíki `id` ya front‑matter ebongwani te; etá na `translation_web_batch.log` (batch) to `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Sika: bobongola baloba ya UI ya website (homepage, navbar, footer) uta `website/i18n/en/code.json` na ba locale nyonso na se ya `website/i18n/<locale>/code.json` (kobwaka `en`).
- Bosaleli: `make translate_web_index` to `make translate_web_index OPTS="--locales de,fr [--force]"`
- Esɛngɔ: export `OPENAI_API_KEY` (ya kopona: `OPENAI_MODEL=gpt-4o-mini`).
- Bizaleli: elɛngisaka forme ya JSON, ebátelaka ba placeholders na makɔngɔ, ebátelaka ba URL ebongwani te, mpe esala retry na ndingisa soki validation ebuki.

---

#### web_build {#mt-web_build}

- Sika: bɔtɔla site ya mikanda na `website/build`.
- Bosaleli: `make web_build OPTS="--locales en|de,en|all"` (to tía `BUILD_LOCALES="en de"`)
- Na kati: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Bapeso: ebɛtaka `npm ci` na `website/` kaka soki `website/node_modules/@docusaurus` ezali te.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Sika: link check ya offline‑safe.
- Bosaleli: `make web_build_linkcheck OPTS="--locales en|all"`
- Nɔti: ebɔtɔli na `tmp_linkcheck_web_pages`; ebongoli `baseUrl` ya GH Pages na `/`; ebwaka ba lien HTTP(S) ya libanda.

#### web_build_local_preview {#mt-web_build_local_preview}

- Sika: preview ya gh‑pages lokalɛ elongo na ba test/link‑check ya kopona.
- Bosaleli: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Bizaleli: emeka liboso server ya Node ya preview (`scripts/preview-server.mjs`, esungi `/__stop`), ezongeli `python3 -m http.server` soki esimbi te; esalelaka 8080–8090; PID na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Sika: pusa `website/build` na branche `gh-pages`.
- Bosaleli: `make web_push_github`

Lelɔmba: tía `NPM=…` mpo na kobongola package manager oyo Makefile esalelaka (defaut `npm`).

---
