---
id: development
title: 'Haɓakawa'
sidebar_label: 'Ci gaba'
---

---

## Jagorar Haɓakawa {#development-guide}

:::note Gyara Turanci kaɗai; fassarori za su biyo baya
Sabunta takardun bayani kawai a ƙarƙashin `website/docs` (English). Fassarori a ƙarƙashin `website/i18n/<locale>/…` ana ƙirƙira su ne ta atomatik, kada a gyara su da hannu. Yi amfani da ayyukan fassara (misali, `make translate_web_docs_batch`) don sake sabunta abun cikin da aka keɓance ga harsuna.
:::

### Abubuwan da ake buƙata {#prerequisites}

- Node.js 22+ da npm (an gwada da Node 22)
- Thunderbird 128 ESR ko sabo (don gwaji da hannu)

---

### Tsarin Aiki (babban tsari) {#project-layout-high-level}

- Tushen (root): rubutun kunshin `distribution_zip_packer.sh`, takardu, hotunan allo
- `sources/`: babban lambar ƙarin (background, UI na zaɓuɓɓuka/popup, manifests, icons)
- `tests/`: jerin gwaje-gwajen Vitest
- `website/`: takardun Docusaurus (tare da i18n a ƙarƙashin `website/i18n/de/...`)

---

### Sanya & Kayan Aiki {#install-and-tooling}

- Sanya dogaron tushen (root): `npm ci`
- Takardu (zaɓi): `cd website && npm ci`
- Bincika manufofi (targets): `make help`

---

### Haɓakawa Kai Tsaye (web‑ext run) {#live-dev-web-ext}

- Zagaye mai sauri a Firefox Desktop (gwajin UI na farko kawai):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Gudanar da shi a Thunderbird (mafifici ga MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Shawarwari:
- A riƙe Kuskuren Console na Thunderbird a buɗe (Tools → Developer Tools → Error Console).
- Shafukan abubuwan MV3 suna dakata idan babu aiki; sake loda ƙarin bayan canjin lamba, ko bar web‑ext ya yi auto‑reload.
- Wasu halaye na Firefox kaɗai na iya bambanta; koyaushe tabbatar a Thunderbird don daidaiton API.
- Hanyoyin binary na Thunderbird (misalai):
- Linux: `thunderbird` (misali, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ware bayanin martaba: Yi amfani da wani sabon bayanin martaba na Thunderbird don haɓakawa don guje wa tasiri ga saitinka na yau da kullum.

---

### Manufofin Make (a haruffa na alfabet) {#make-targets-alphabetical}

Makefile yana daidaita kusan dukkanin hanyoyin dev. Gudanar da `make help` a kowane lokaci don takaitaccen layi guda na kowane manufa.

Shawara: gudanar da `make` ba tare da manufa ba zai buɗe menu na Whiptail mai sauƙi don zaɓar manufa.

| Manufa                                                   | Bayani a layi ɗaya                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Cire abubuwan gini/preview na gida (tmp/, web-local-preview/, website/build/).             |
| [`commit`](#mt-commit)                                   | Tsara, gudanar da gwaje-gwaje (har da i18n), sabunta changelog, yi commit & push.          |
| [`eslint`](#mt-eslint)                                   | Gudanar da ESLint ta flat config (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | Jera duk manufofi da takaitaccen bayani (an tsara su).                                     |
| [`lint`](#mt-lint)                                       | web‑ext lint akan `sources/` (manifest na wucin gadi; ya yi watsi da ZIPs; ba ya faɗa).    |
| [`menu`](#mt-menu)                                       | Menu mai hulɗa don zaɓar manufa da zaɓaɓɓun muhawara.                                      |
| [`pack`](#mt-pack)                                       | Gina ZIPs na ATN & LOCAL (yana gudanar da linter; yana kira rubutun packer).               |
| [`prettier`](#mt-prettier)                               | Tsara ma’ajiyar kai tsaye (yana rubuta canje-canje).                                       |
| [`prettier_check`](#mt-prettier_check)                   | Prettier a yanayin duba (ba rubutu); ya gaza idan ana buƙatar sake tsara.                  |
| [`prettier_write`](#mt-prettier_write)                   | Madadin ga `prettier`.                                                                     |
| [`test`](#mt-test)                                       | Prettier (rubuta), ESLint, sannan Vitest (coverage idan an saita).                         |
| [`test_i18n`](#mt-test_i18n)                             | Gwaje-gwajen i18n kaɗai: madadin/daidaito na ƙari + daidaito na gidan yanar gizo.          |
| [`translate_app`](#mt-translation-app)                   | Madadin ga `translation_app`.                                                              |
| [`translation_app`](#mt-translation-app)                 | Fassara kirtanin UI na app daga `sources/_locales/en/messages.json`.                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Fassara takardun gidan yanar gizo ta OpenAI Batch API (abin fifiko).                       |
| [`translate_web_docs_sync`](#mt-translation-web)         | Fassara takardun gidan yanar gizo kai tsaye (tsoho, ba batch).                             |
| [`translate_web_index`](#mt-translation_web_index)       | Madadin ga `translation_web_index`.                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Fassara UI na gida/kan-naviga/ƙafafu (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Gina takardu zuwa `website/build` (yana goyon bayan `--locales` / `BUILD_LOCALES`).        |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Duba hanyoyi ba tare da layi ba (yana tsallake HTTP[S] na nesa).                           |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Gidan gh‑pages na gida; yana aiki kai tsaye a 8080–8090; zaɓin gwaje-gwaje/duba-hanyoyi.   |
| [`web_push_github`](#mt-web_push_github)                 | Tura `website/build` zuwa reshen `gh-pages`.                                               |

Syntax na zaɓuɓɓuka

- Yi amfani da `make <command> OPTS="…"` don wuce zaɓuɓɓuka (ana ba da shawarar ambato). Kowace manufa a ƙasa tana nuna misalin amfani.

--

-

#### Shawarwari kan ginin locale {#locale-build-tips}

- Gina rukuni na wasu harsuna kaɗai: saita `BUILD_LOCALES="en de"` ko wuce `OPTS="--locales en,de"` zuwa manufofin yanar gizo.
- Dubawa na takamaiman harshe (locale): `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Gina & Kunshin {#build-and-package}

- Gina ZIPs: `make pack`
- Yana samar da ATN da LOCAL ZIPs a tushen repo (kar a gyara abubuwan da aka gina da hannu)
- Shawara: sabunta sigar a cikin `sources/manifest_ATN.json` da `sources/manifest_LOCAL.json` kafin kunshin
- Sanya da hannu (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → zaɓi ZIP da aka gina

---

### Gwaji {#test}

- Cikakken jerin: `make test` (Vitest)
- Rufe gwaji (na zaɓi):
- `npm i -D @vitest/coverage-v8`
- Gudanar da `make test`; buɗe `coverage/index.html` don rahoton HTML
- i18n kaɗai: `make test_i18n` (maɓallan UI/madadin/take + daidaito na gidan yanar gizo per‑locale per‑doc tare da binciken id/title/sidebar_label)

---

### Dubawa & Log {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Juya logs masu faɗi yayin aiki:
- Kunna: `messenger.storage.local.set({ debug: true })`
- Kashe: `messenger.storage.local.set({ debug: false })`
- Log suna bayyana yayin ƙirƙira/aika amsoshi

---

### Takardu (gidan yanar gizo) {#docs-website}

- Sabar dev: `cd website && npm run start`
- Gina shafin tsayayye: `cd website && npm run build`
- Daidaitattun Make (a haruffa): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Misalan amfani:
- EN kaɗai, tsallake gwaje-gwaje/duba-hanyoyi, babu push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Dukkan harsuna, tare da gwaje-gwaje/duba-hanyoyi, sannan push: `make web_build_local_preview && make web_push_github`
- Kafin bugawa, gudanar da duba hanyoyi ba tare da layi ba: `make web_build_linkcheck`.
- i18n: Turanci yana cikin `website/docs/*.md`; fassarar Jamusanci a `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Bincike: Idan an saita canje-canjen muhalli na Algolia DocSearch a CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), shafin yana amfani da binciken Algolia; in ba haka ba yana komawa binciken gida. A shafin gida, danna `/` ko `Ctrl+K` don buɗe akwatin bincike.

---

#### Hanyar karkatar da gudummawa {#donate-redirect}

- `website/src/pages/donate.js`
- Hanya: `/donate` (da `/<locale>/donate`)
- Halayya:
- Idan hanyar yanzu tana da harshe (misali, `/de/donate`), yi amfani da shi
- Idan ba haka ba, zaɓi mafi kusa daga `navigator.languages` vs harsunan da aka saita; koma ga harshe na tsoho
- Yana karkatar da:
- `en` → `/docs/donation`
- sauran → `/<locale>/docs/donation`
- Yana amfani da `useBaseUrl` don daidaitaccen sarrafa baseUrl
- Ya haɗa da meta refresh + hanyar `noscript` a matsayin madadin

---

---

#### Shawarwari na nunawa {#preview-tips}

- Tsayar da Node preview cikin tsabta: buɗe `http://localhost:<port>/__stop` (ana bugawa bayan `Local server started`).
- Idan hotuna ba sa lodi a MDX/JSX, yi amfani da `useBaseUrl('/img/...')` don girmama `baseUrl` na shafin.
- Preview yana farawa a farko; duba hanyoyi yana zuwa daga baya kuma ba ya hana (hanyoyin waje da suka karye ba za su hana preview ba).
- Misalin URL na preview: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (ana bugawa bayan “Local server started”).
- Hanyoyin waje a duba-hanyoyi: Wasu shafuka (misali, addons.thunderbird.net) suna toshe masu bin diddigin atomatik kuma na iya nuna 403 a duba-hanyoyi. Preview zai ci gaba; ana iya yin watsi da waɗannan cikin aminci.

---

#### Fassara Yanar Gizon {#translate-website}

Abubuwan da za ka iya fassara

- UI na gidan yanar gizo kaɗai: shafin gida, navbar, footer, da sauran kirtanin UI. Abun cikin docs yanzu zai kasance na Turanci kaɗai.

Inda za a gyara

- Gyara `website/i18n/<locale>/code.json` (yi amfani da `en` a matsayin abin koyi). Bar madadin kamar `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ba tare da canji ba.

Ƙirƙira ko sabunta fayiloli

- Ƙirƙiri stub da suka ɓace ga duk harsuna: `npm --prefix website run i18n:stubs`
- Rubuta stubs daga Turanci (bayan ƙara sababbin kirtani): `npm --prefix website run i18n:stubs:force`
- Madadin don harshe guda: `npx --prefix website docusaurus write-translations --locale <locale>`

Fassara kirtanin UI na shafin gida/navbar/footer (OpenAI)

- Saita takardun shaida sau ɗaya (shell ko .env):
- `export OPENAI_API_KEY=sk-...`
- Na zaɓi: `export OPENAI_MODEL=gpt-4o-mini`
- Sau ɗaya (duk harsuna, tsallake en): `make translate_web_index`
- Takaita zuwa wasu harsuna: `make translate_web_index OPTS="--locales de,fr"`
- Rubuta ƙimomin da suke akwai: `make translate_web_index OPTS="--force"`

Tabbatarwa & ƙoƙarin sake gwadawa

- Rubutun fassara yana tabbatar da tsari na JSON, yana adana madadin baka {}, kuma yana tabbatar da cewa URLs ba su canza ba.
- Idan tabbaci ya gaza, zai sake gwadawa tare da ra’ayi har sau 2 kafin ya bar ƙimomin da suke akwai.

Duba harshenka

- Sabar dev: `npm --prefix website run start`
- Ziyarci `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Miƙa

- Buɗe PR tare da fayil(olin) `code.json` da aka gyara. Ka takaita canje-canje kuma haɗa hoton allo cikin sauri idan zai yiwu.

---

### Shawarwari kan Tsaro & Saiti {#security-and-configuration-tips}

- Kada ka yi commit `sources/manifest.json` (wanda gini ke ƙirƙira na ɗan lokaci)
- Ka bar `browser_specific_settings.gecko.id` ya kasance daidaitacce don kiyaye tashar sabuntawa

---

### Dorewar Saituna {#settings-persistence}

- Ajiya: Dukkan saitunan mai amfani suna cikin `storage.local` kuma suna ci gaba bayan sabunta ƙarin.
- Sanya: Ana amfani da tsoffin ƙima ne kawai idan maɓalli yana ɓace gaba ɗaya (undefined).
- Sabuntawa: Hijira tana cike maɓallan da suka ɓace kaɗai; ba a taɓa share ƙimomin da suke akwai ba.
- Alamar tsari: `settingsVersion` (yanzu `1`).
- Maɓallan da tsoffin ƙimomi:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Lamba: duba `sources/background.js` → `initializeOrMigrateSettings()` da `SCHEMA_VERSION`.

Hanyan aiki na dev (ƙara sabon saitin)

- Ƙara `SCHEMA_VERSION` a `sources/background.js`.
- Ƙara sabon maɓalli + tsohon ƙima ga abin `DEFAULTS` a `initializeOrMigrateSettings()`.
- Yi amfani da ka’idar “kawai idan undefined” lokacin zuba tsoffin ƙima; kar a share ƙimomin da suke akwai.
- Idan saitin yana bayyane ga mai amfani, haɗa shi a `sources/options.js` kuma ƙara kirtanin da aka fassara.
- Ƙara/daidaita gwaje-gwaje (duba `tests/background.settings.migration.test.js`).

Shawarwari na gwaji da hannu

- Kwaikwayon sabuwar shigarwa: share kundin bayanan faɗaɗa ko fara da sabon bayanin martaba.
- Kwaikwayon sabuntawa: saita `settingsVersion` zuwa `0` a `storage.local` sannan sake loda; tabbatar ƙimomin da suke akwai ba su canza ba kuma an ƙara maɓallan da suka ɓace kaɗai.

---

### Magance Matsaloli {#troubleshooting}

- Tabbatar Thunderbird yana 128 ESR ko sabo
- Yi amfani da Error Console don matsalolin lokaci-na-aiki
- Idan saitunan da aka adana alama ba sa aiki yadda ya kamata, sake kunna Thunderbird ka sake gwadawa. (Thunderbird na iya adana wani yanayi tsakanin zaman; sake kunnawa yana tabbatar da an loda saituna sabbi.)

---

### CI & Rufe (Coverage) {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) yana gudanar da vitest tare da ƙayyadaddun rufe gwaji (85% lines/functions/branches/statements). Idan ba a kai matakin ba, aikin zai gaza.
- Aikin yana ɗora abin tari `coverage-html` tare da rahoton HTML; sauke shi daga shafin gudu (Actions → gudu na baya-bayan nan → Artifacts).

---

### Bayar da Gudummawa {#contributing}

- Duba CONTRIBUTING.md don jagororin reshe/commit/PR
- Shawara: Ƙirƙiri wani bayanin martaba na haɓakawa na Thunderbird don gwaji don guje wa tasiri ga bayanin martabarka na yau da kullum.

---

### Fassara

- Gudanar da manyan ayyukan fassara “duka → duka” na iya zama jinkiri kuma masu tsada. Fara da rukunin ƙanƙani (misali, wasu docs da harsuna 1–2), duba sakamakon, sannan faɗaɗa.

---

- Manufar sake gwadawa: ayyukan fassara suna yin ƙoƙarin har sau 3 tare da exponential backoff kan kurakuran API; duba `scripts/translate_web_docs_batch.js` da `scripts/translate_web_docs_sync.js`.

Hotunan allo don takardu

- Ajiye hotuna a ƙarƙashin `website/static/img/`.
- Kira su a MD/MDX ta `useBaseUrl('/img/<filename>')` domin hanyoyi su yi aiki da `baseUrl` na shafin.
- Bayan ƙara ko sake sunan hotuna a ƙarƙashin `website/static/img/`, tabbatar duk nassoshi har yanzu suna amfani da `useBaseUrl('/img/…')` kuma suna bayyana a preview na gida.
  Favicons

- `favicon.ico` mai girma da yawa ana ƙirƙira shi ta atomatik a duk hanyoyin gini (Make + rubutun) ta `website/scripts/build-favicon.mjs`.
- Babu buƙatar mataki na hannu; sabunta `icon-*.png` ya isa.
  Shawarar bita

- Bar `id` na front‑matter ba tare da canji ba a docs da aka fassara; fassara kawai `title` da `sidebar_label` idan suna akwai.

#### clean {#mt-clean}

- Manufa: cire abubuwan gini/preview na gida.
- Amfani: `make clean`
- Yana cire (idan suna akwai):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Manufa: tsara, gwada, sabunta changelog, yi commit, sannan push.
- Amfani: `make commit`
- Cikakkun bayanai: yana gudanar da Prettier (rubuta), `make test`, `make test_i18n`; yana ƙara changelog idan akwai bambance-bambancen da aka stage; yana tura zuwa `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Manufa: gudanar da ESLint ta flat config.
- Amfani: `make eslint`

---

#### help {#mt-help}

- Manufa: jera duk manufofi da takaitaccen bayani.
- Amfani: `make help`

---

#### lint {#mt-lint}

- Manufa: lint MailExtension ta amfani da `web-ext`.
- Amfani: `make lint`
- Bayanai: kwafin wucin gadi `sources/manifest_LOCAL.json` → `sources/manifest.json`; yana watsi da ZIPs da aka gina; gargadi ba sa sa bututun ya gaza.

---

#### menu {#mt-menu}

- Manufa: menu mai hulɗa don zaɓar manufa ta Make da zaɓaɓɓun muhawara.
- Amfani: gudanar da `make` ba tare da muhawara ba.
- Bayanai: idan `whiptail` bai samuwa ba, menu zai koma `make help`.

---

#### pack {#mt-pack}

- Manufa: gina ZIPs na ATN da LOCAL (yana dogara da `lint`).
- Amfani: `make pack`
- Shawara: ƙara sigogi a duka `sources/manifest_*.json` kafin kunshin.

---

#### prettier {#mt-prettier}

- Manufa: tsara repo a wurin.
- Amfani: `make prettier`

#### prettier_check {#mt-prettier_check}

- Manufa: tabbatar da tsari (ba rubutu).
- Amfani: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Manufa: madadin ga `prettier`.
- Amfani: `make prettier_write`

---

#### test {#mt-test}

- Manufa: gudanar da Prettier (rubuta), ESLint, sannan Vitest (coverage idan an shigar).
- Amfani: `make test`

#### test_i18n {#mt-test_i18n}

- Manufa: gwaje-gwajen mayar da hankali kan i18n don kirtanin ƙari da takardun gidan yanar gizo.
- Amfani: `make test_i18n`
- Yana gudanar da: `npm run test:i18n` da `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Manufa: fassara kirtanin UI na ƙarin daga EN zuwa sauran harsuna.
- Amfani: `make translation_app OPTS="--locales all|de,fr"`
- Bayanai: yana kiyaye tsarin maɓalli da madadin; yana rubuta log zuwa `translation_app.log`. Sigarm rubutu: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Manufa: fassara takardun gidan yanar gizo daga `website/docs/*.md` zuwa `website/i18n/<locale>/...`.
- Abin fifiko: `translate_web_docs_batch` (OpenAI Batch API)
  - Amfani (tutoci): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Tsohuwar madaidaiciyar matsayi har yanzu ana karɓa: `OPTS="<doc|all> <lang|all>"`
- Halayya: yana gina JSONL, ya ɗora, yana duba kowane sakan 30, yana zazzage sakamako, yana rubuta fayiloli.
- Lura: aikin batch zai iya ɗaukar har zuwa sa’o’i 24 don kammalawa (dangane da taga batch na OpenAI). Console yana nuna lokaci da ya shuɗe a kowane dubawa.
- Muhalli: `OPENAI_API_KEY` (tilas), na zaɓi `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (tsoho 24h), `BATCH_POLL_INTERVAL_MS`.
- Tsoho: `translate_web_docs_sync`
  - Amfani (tutoci): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Tsohuwar madaidaiciyar matsayi har yanzu ana karɓa: `OPTS="<doc|all> <lang|all>"`
- Halayya: buƙatun daidaitattun kowanne‑biyu kai tsaye (babu tarin batch).
- Bayanai: Tambayoyin hulɗa idan `OPTS` an bari. Duka hanyoyin suna kiyaye toshe-lamba/inline code kuma suna barin `id` na front‑matter ba tare da canji ba; suna rubuta log zuwa `translation_web_batch.log` (batch) ko `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Manufa: fassara kirtanin UI na gidan yanar gizo (shafin gida, navbar, footer) daga `website/i18n/en/code.json` zuwa duk harsuna a ƙarƙashin `website/i18n/<locale>/code.json` (banda `en`).
- Amfani: `make translate_web_index` ko `make translate_web_index OPTS="--locales de,fr [--force]"`
- Bukatu: fitar da `OPENAI_API_KEY` (na zaɓi: `OPENAI_MODEL=gpt-4o-mini`).
- Halayya: yana tabbatar da tsari na JSON, yana kiyaye madadin baka, yana bar URLs ba tare da canji ba, kuma yana sake gwadawa da ra’ayi idan akwai kurakuran tabbaci.

---

#### web_build {#mt-web_build}

- Manufa: gina shafin docs zuwa `website/build`.
- Amfani: `make web_build OPTS="--locales en|de,en|all"` (ko saita `BUILD_LOCALES="en de"`)
- Ciki: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dogaro: yana gudanar da `npm ci` a `website/` idan `website/node_modules/@docusaurus` bai samuwa ba kawai.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Manufa: duba hanyoyi ba tare da layi ba.
- Amfani: `make web_build_linkcheck OPTS="--locales en|all"`
- Bayanai: yana gina zuwa `tmp_linkcheck_web_pages`; yana sake rubuta `baseUrl` na GH Pages zuwa `/`; yana tsallake hanyoyin HTTP(S) na nesa.

#### web_build_local_preview {#mt-web_build_local_preview}

- Manufa: gidan gh‑pages na gida tare da zaɓin gwaje-gwaje/duba-hanyoyi.
- Amfani: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Halayya: yana gwada sabar preview na Node a farko (`scripts/preview-server.mjs`, yana goyon bayan `/__stop`), sannan ya koma `python3 -m http.server`; yana ba da sabis a 8080–8090; PID a `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Manufa: tura `website/build` zuwa reshen `gh-pages`.
- Amfani: `make web_push_github`

Shawara: saita `NPM=…` don sauya mai sarrafa kunshin da Makefile yake amfani da shi (tsoho `npm`).
