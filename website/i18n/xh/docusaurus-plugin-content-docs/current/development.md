---
id: development
title: 'Uphuhliso'
sidebar_label: 'Uphuhliso'
---

---

## Isikhokelo Sophuhliso {#development-guide}

:::note Hlela isiNgesi kuphela; iinguqulelo zisasazwa
Hlaziya amaxwebhu kuphela phantsi kwe `website/docs` (isiNgesi). Iinguqulelo phantsi kwe `website/i18n/<locale>/…` ziveliswa ngokuzenzekelayo kwaye akufuneki zihlelwe ngesandla. Sebenzisa imisebenzi yenguqulelo (umz., `make translate_web_docs_batch`) ukuze uhlaziye umxholo wendawo.
:::

### Izinto ezifunekayo {#prerequisites}

- Node.js 22+ kunye ne-npm (kuvavanywe nge-Node 22)
- Thunderbird 128 ESR okanye entsha (yovavanyo ngesandla)

---

### Uqwalaselo lweProjekthi (inqanaba eliphezulu) {#project-layout-high-level}

- Ingcambu (Root): iskripthi sokupakisha `distribution_zip_packer.sh`, amaxwebhu, izikrini
- `sources/`: ikhowudi ephambili yesongezelelo (imvelaphi, ii-UI zokhetho/ipopup, i-manifest, ii-ayikhoni)
- `tests/`: iqoqo le-Vitest
- `website/`: amaxwebhu eDocusaurus (ane-i18n phantsi kwe `website/i18n/de/...`)

---

### Ufakelo & Izixhobo {#install-and-tooling}

- Faka ii-deps zengcambu: `npm ci`
- Amaxwebhu (uyazikhethela): `cd website && npm ci`
- Fumana iithagethi: `make help`

---

### Uphuhliso Bukhoma (web‑ext run) {#live-dev-web-ext}

- Umjikelo okhawulezayo kwi-Firefox Desktop (ii-smoke-tests ze-UI kuphela):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Baleka kwi-Thunderbird (ekhethwayo kwi-MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Iingcebiso:
- Gcina i-Error Console ye-Thunderbird ivuliwe (Tools → Developer Tools → Error Console).
- Amaphepha esiganeko e-MV3 ayamiswa xa engasebenzi; layisha isongezelelo kwakhona emva kotshintsho lwekhowudi, okanye uvumele i-web‑ext izilayishe ngokuzenzekelayo.
- Eminye imikhwa exhomekeke kwi-Firefox kuphela yahlukile; soloko uqinisekisa kwi-Thunderbird ukuze kube nokulingana kwe-API.
- Iindlela ze-binary ze-Thunderbird (imizekelo):
- Linux: `thunderbird` (umz., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ukwahlulwa kweprofayili: Sebenzisa iprofayili ye-Thunderbird eyahlukileyo yophuhliso ukunqanda ukuchaphazela useto lwakho losuku ukuya kusuku.

---

### Iithagethi ze-Make (Ngokwe-alfabhethi) {#make-targets-alphabetical}

I-Makefile ilungelelanisa imijelo eqhelekileyo yophuhliso. Sebenzisa `make help` nanini na ukuze ufumane isishwankathelo somgca omnye senjongo nganye.

Icebiso: ukuqhuba `make` ngaphandle kwethagethi kuvula imenyu elula ye-Whiptail ukukhetha ithagethi.

| Target                                                   | Inkcazo yomgca omnye                                                                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Susa izinto ezakhiweyo/zokujonga (preview) zasekhaya (tmp/, web-local-preview/, website/build/).                        |
| [`commit`](#mt-commit)                                   | Format, sebenzisa uvavanyo (kuquka i18n), hlaziya i-changelog, commit & push.                                           |
| [`eslint`](#mt-eslint)                                   | Qhuba i-ESLint ngocwangciso lwe-flat (`npm run -s lint:eslint`).                                                        |
| [`help`](#mt-help)                                       | Dwelisa zonke iithagethi kunye neenkcazo zomgca omnye (zilungelelanisiwe).                                              |
| [`lint`](#mt-lint)                                       | web‑ext lint ku `sources/` (i-manifest yethutyana; ingayinaki ii-ZIP; ayibulali).                                       |
| [`menu`](#mt-menu)                                       | Imenu esebenzisanayo ukukhetha ithagethi kunye neeargumenti ozikhethelayo.                                              |
| [`pack`](#mt-pack)                                       | Yakha ii-ZIP ze-ATN & LOCAL (iqhuba i-linter; ibiza iskripthi sokupakisha).                                             |
| [`prettier`](#mt-prettier)                               | Format irepo endaweni (ibhala iinguqu).                                                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier kwimowudi yokujonga (akukho kubhala); iyasilela xa kufuneke ukuhlengahlengiswa.                                |
| [`prettier_write`](#mt-prettier_write)                   | I-alias ku `prettier`.                                                                                                  |
| [`test`](#mt-test)                                       | Prettier (bhala), ESLint, emva koko i-Vitest (ugubungelo ukuba luqwalaselwe).                                           |
| [`test_i18n`](#mt-test_i18n)                             | Uvavanyo lwe-i18n kuphela: izibambiso/ulingano lwesongezelelo + ulingano lwewebhusayithi.                               |
| [`translate_app`](#mt-translation-app)                   | I-alias ku `translation_app`.                                                                                           |
| [`translation_app`](#mt-translation-app)                 | Guqulela imitya ye-UI yesicelo ukusuka `sources/_locales/en/messages.json`.                                             |
| [`translate_web_docs_batch`](#mt-translation-web)        | Guqulela amaxwebhu ewebhusayithi nge-OpenAI Batch API (ekhethwayo).                                                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | Guqulela amaxwebhu ewebhusayithi ngexesha elifanayo (ilifa, ingengomqulu).                                              |
| [`translate_web_index`](#mt-translation_web_index)       | I-alias ku `translation_web_index`.                                                                                     |
| [`translation_web_index`](#mt-translation_web_index)     | Guqulela i-UI yasekhaya/ibar ephezulu/unyaweni (`website/i18n/en/code.json → .../<lang>/code.json`).                    |
| [`web_build`](#mt-web_build)                             | Yakha amaxwebhu ukuya `website/build` (ixhasa `--locales` / `BUILD_LOCALES`).                                           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Uvavanyo lwezixhumanisi olukhuselekile ngaphandle kwe-intanethi (ludlula ii-HTTP[S] ezisemgama).                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Umboniso we-gh‑pages wasekhaya; uzenzekelayo uku-serve kwi-8080–8090; uvavanyo/uvavanyo lwezixhumanisi ngokuzikhethela. |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` kwi-branch `gh-pages`.                                                                             |

Syntax yeenketho

- Sebenzisa `make <command> OPTS="…"` ukugqithisa iinketho (iikowuti ziyanconywa). Ithagethi nganye engezantsi ibonisa umzekelo wokusetyenziswa.

--

-

#### Iingcebiso zokwakha iilokhale {#locale-build-tips}

- Yakha iseti encinci yeelokhale: seta `BUILD_LOCALES="en de"` okanye udlulisele `OPTS="--locales en,de"` kwiithagethi zewebhu.
- Jonga kwangaphambili ulwimi oluthile (locale): `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Yakha & Pakeja {#build-and-package}

- Yakha ii-ZIP: `make pack`
- Ivelisa ii-ZIP ze-ATN ne-LOCAL kwimpande ye-repo (ungahleleli iziphumo ngesandla)
- Icebiso: hlaziya inguqulelo kuzo zombini `sources/manifest_ATN.json` kunye ne `sources/manifest_LOCAL.json` phambi kokupakisha
- Ufakelo lwesandla (uphuhliso): Thunderbird → Tools → Add‑ons and Themes → igiya → Install Add‑on From File… → khetha i-ZIP eyakhiweyo

---

### Uvavanyo {#test}

- Iqoqo elipheleleyo: `make test` (Vitest)
- Ugubungelo (uyazikhethela):
- `npm i -D @vitest/coverage-v8`
- Qhuba `make test`; vula `coverage/index.html` kwingxelo ye-HTML
- i18n kuphela: `make test_i18n` (amaqhosha e-UI/izibambiso/iitayitlolo + ulingano lwewebhusayithi ngeelokhale, ngecala ledokhumenti nganye, olunee-check ze-id/title/sidebar_label)

---

### Ukulungisa Iingxaki & Iilog {#debugging-and-logs}

- I-Error Console: Tools → Developer Tools → Error Console
- Tshintsha iilog ezineenkcukacha ngexesha lokubaleka:
- Vumela: `messenger.storage.local.set({ debug: true })`
- Khubaza: `messenger.storage.local.set({ debug: false })`
- Iilog ziya kuvela ngexesha lokubhala/thumela iimpendulo

---

### Amaxwebhu (iwebhusayithi) {#docs-website}

- Iseva yophuhliso: `cd website && npm run start`
- Yakha isiza esimileyo: `cd website && npm run build`
- Ilingana ne-Make (ngokwe-alfabhethi): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Imizekelo yokusetyenziswa:
- EN kuphela, tsiba uvavanyo/uvavanyo lwezixhumanisi, akukho push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Zonke iilokhale, kunye novavanyo/uvavanyo lwezixhumanisi, emva koko push: `make web_build_local_preview && make web_push_github`
- Phambi kokupapasha, sebenzisa uvavanyo lwezixhumanisi olukhuselekileyo ngaphandle kwe-intanethi: `make web_build_linkcheck`.
- i18n: isiNgesi sikhona ku `website/docs/*.md`; iinguqulelo zesiJamani zikwi `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Ukukhangela: Ukuba ii-variabheli ze-Algolia DocSearch zokusetyenziselwa okusingqongileyo zisetiwe kwi-CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), isiza sisebenzisa i-Algolia search; kungenjalo sibuyela kukhangelo lwasekhaya. Kwiphepha lasekhaya, cinezela `/` okanye `Ctrl+K` ukuvula ibhokisi yokukhangela.

---

#### Indlela yokuthumela kwakhona (redirect) yeminikelo {#donate-redirect}

- `website/src/pages/donate.js`
- Umendo (Route): `/donate` (kunye ne `/<locale>/donate`)
- Ukuziphatha:
- Ukuba umendo wangoku unelokhale (umz., `/de/donate`), yisebenzise
- Kungenjalo, khetha owona mhle phakathi kwe `navigator.languages` xa kuthelekiswa neelokhale ezicwangcisweleyo; ubuyele kwilokhale emiselweyo
- Ijika iye ku:
- `en` → `/docs/donation`
- eminye → `/<locale>/docs/donation`
- Isebenzisa `useBaseUrl` ukuze kuphathwe i-baseUrl ngendlela efanelekileyo
- Ibandakanya i-meta refresh + ikhonkco `noscript` njengokubuyela umva

---

---

#### Iingcebiso zokuJonga kwangaphambili {#preview-tips}

- Misa umboniso we-Node kakuhle: vula `http://localhost:<port>/__stop` (iprintwe emva kwe `Local server started`).
- Ukuba imifanekiso ayilayishi kwi-MDX/JSX, sebenzisa `useBaseUrl('/img/...')` ukuze uhloniphe i-`baseUrl` yesiza.
- Umboniso uqala kuqala; uvavanyo lwezixhumanisi lusebenza emva koko kwaye aluthinteli (amakhonkco angaphandle aphukileyo awuyi kumisa umboniso).
- Umzekelo we-URL yomboniso: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (iprintwe emva kwe “Local server started”).
- Amakhonkco angaphandle kuvavanyo lwezixhumanisi: Ezinye iisayithi zangaphandle (umz., addons.thunderbird.net) zivalela iirobhothi ezizenzekelayo kwaye zinokubonisa i-403 kuvavanyo. Umboniso usaqala; ezi zingakhathazeki.

---

#### Guqulela iWebhusayithi {#translate-website}

Ongakuguqulela

- I-UI yewebhusayithi kuphela: iphepha lasekhaya, ibar ephezulu, unyaweni, kunye nemitya ye-UI eminye. Umxholo weedokhumenti uhlala usesiNgesi okwokugqibela.

Apho unokuhlela khona

- Hlela `website/i18n/<locale>/code.json` (sebenzisa `en` njengereferensi). Gcina izibambiso ezifana ne `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` zingatshintshwanga.

Yenza okanye hlaziya iifayile

- Yenza iindawo ezilahlekileyo kuzo zonke iilokhale: `npm --prefix website run i18n:stubs`
- Bhala ngaphezulu iindawo ezizalisiweyo ukusuka esiNgesi (emva kokongeza imitya emitsha): `npm --prefix website run i18n:stubs:force`
- Okunye kwilokhale elinye: `npx --prefix website docusaurus write-translations --locale <locale>`

Guqulela imitya ye-UI yasekhaya/ibar ephezulu/unyaweni (OpenAI)

- Misela iziqinisekiso kube kanye (shell okanye .env):
- `export OPENAI_API_KEY=sk-...`
- Ngokuzikhethela: `export OPENAI_MODEL=gpt-4o-mini`
- Kanye-kuphela (zonke iilokhale, tsiba i-en): `make translate_web_index`
- Nciphisa kwiilokhale ezithile: `make translate_web_index OPTS="--locales de,fr"`
- Bhala ngaphezulu amaxabiso akhoyo: `make translate_web_index OPTS="--force"`

Uqinisekiso kunye nokuzama kwakhona

- Iskripthi senguqulelo siqinisekisa imo ye-JSON, sigcina izibambiso ezinezikroba (curly braces), kwaye siqinisekisa ukuba ii-URL azitshintshwanga.
- Xa uqinisekiso lusilela, sizama kwakhona sinengxelo ukuya kuthi ga amaxesha ama-2 ngaphambi kokushiya amaxabiso akhoyo.

Jonga kwangaphambili ilokhale yakho

- Iseva yophuhliso: `npm --prefix website run start`
- Ndwendwela `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Ukungenisa

- Vula i-PR ngeefayile ze `code.json` ezihlelweyo. Gcina iinguqu zixinenene kwaye uquke umfanekiso wesikrini mfutshane xa kunokwenzeka.

---

### Iingcebiso zoKhuseleko & uQwalaselo {#security-and-configuration-tips}

- Musa ukwenze i-commit `sources/manifest.json` (yenziwa okwethutyana ngexesha lokwakha)
- Gcina `browser_specific_settings.gecko.id` izinzile ukugcina ijelo lohlaziyo

---

### Ugcino lweziseto {#settings-persistence}

- Ugcino: Zonke iisetingi zomsebenzisi zigcinwa ku `storage.local` kwaye zihlala phesheya kuhlaziyo lwesongezelelo.
- Ufakelo: Ezemiselweyo zisetyenziswa kuphela xa iqhosha lisweleka ngokupheleleyo (undefined).
- Uhlaziyo: Uhambo lotshintsho (migration) luzalisa kuphela amaqhosha alahlekileyo; amaxabiso akhoyo akhe abhalwe ngaphezulu.
- Isalathi seskima: `settingsVersion` (ngokwangoku `1`).
- Amaqhosha kunye nezimiselweyo:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Ikhowudi: bona `sources/background.js` → `initializeOrMigrateSettings()` kunye ne `SCHEMA_VERSION`.

Umsebenzi wophuhliso (ukongeza useto olutsha)

- Nyusa `SCHEMA_VERSION` ku `sources/background.js`.
- Yongeza iqhosha elitsha + emiselweyo kwinto `DEFAULTS` ku `initializeOrMigrateSettings()`.
- Sebenzisa umthetho "only-if-undefined" xa ufaka ezimiselweyo; ungabhaleli ngaphezulu amaxabiso akhoyo.
- Ukuba useto luyabonakala kumsebenzisi, yifake ku `sources/options.js` kwaye wongeze imitya eguqulelweyo.
- Yongeza/lungisa uvavanyo (bona `tests/background.settings.migration.test.js`).

Iingcebiso zovavanyo ngesandla

- Lingisa ufakelo olutsha: coca ulawulo lwedatha (data dir) lwesongezelelo okanye uqale ngeprofayili entsha.
- Lingisa uhlaziyo: seta `settingsVersion` ku `0` ku `storage.local` uze ulayishe kwakhona; qinisekisa ukuba amaxabiso akhoyo ahlala engatshintshwanga kwaye kuphela amaqhosha alahlekileyo ongezwa.

---

### Ukulungisa iingxaki {#troubleshooting}

- Qinisekisa ukuba i-Thunderbird yi-128 ESR okanye entsha
- Sebenzisa i-Error Console kwimicimbi yexesha lokubaleka
- Ukuba iisetingi ezigciniweyo zibonakala ngathi azisebenzi ngokuchanekileyo, qala i-Thunderbird kwakhona uze uzame kwakhona. (I-Thunderbird ingagcina imeko phakathi kweeseshoni; ukuqala kwakhona kuqinisekisa ukuba iisetingi ezintsha zifunyenwe.)

---

### CI & Ugubungelo {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) iqhuba i-vitest ngemiqathango yogubungelo (85% imigca/imisebenzi/amasebe/iingxelo). Ukuba imiqathango ayihlangatyezwanga, umsebenzi uyasilela.
- Uhambo lomsebenzi luthumela umphumo `coverage-html` one ngxelo ye-HTML; khuphela ukusuka kwiphepha lokubaleka (Actions → irun yamva nje → Artifacts).

---

### Ukuncedisa {#contributing}

- Bona i-CONTRIBUTING.md ngemigaqo ye-branch/commit/PR
- Icebiso: Yenza iprofayili yophuhliso ye-Thunderbird eyahlukileyo yovavanyo ukunqanda ukuchaphazela iprofayili yakho yemihla ngemihla.

---

### Iinguqulelo

- Ukuqhuba imisebenzi yenguqulelo “zonke → zonke” enkulu kunokucotha kwaye kubize. Qala ngeseti encinci (umz., amaxwebhu ambalwa kunye neelokhale ezi-1–2), uphonononge isiphumo, uze wandise.

---

- Umgaqo wokuzama kwakhona: imisebenzi yenguqulelo yenze ukuya kuthi ga kwi-3 retries kunye ne-exponential backoff kwiimpazamo ze-API; bona `scripts/translate_web_docs_batch.js` kunye ne `scripts/translate_web_docs_sync.js`.

Izikrini (screenshots) zee-docs

- Gcina imifanekiso phantsi kwe `website/static/img/`.
- Bhekisa kuzo kwi-MD/MDX nge `useBaseUrl('/img/<filename>')` ukuze iindlela zisebenze nge `baseUrl` yesiza.
- Emva kokongeza okanye ukutyaqamba kwakhona imifanekiso phantsi kwe `website/static/img/`, qinisekisa ukuba zonke izalathiso zisasebenzisa `useBaseUrl('/img/…')` kwaye zibonakala kumboniso wasekhaya.
  Favicons

- `favicon.ico` enobungakanani obuninzi iveliswa ngokuzenzekelayo kuzo zonke iindlela zokwakha (Make + izikripthi) nge `website/scripts/build-favicon.mjs`.
- Akukho manyathelo esandla afunekayo; ukuhlaziya `icon-*.png` kwanele.
  Ingcebiso yophononongo

- Gcina i-front‑matter `id` ingatshintshwanga kwiidokhumenti eziguqulelweyo; guqulela kuphela `title` kunye ne `sidebar_label` xa zikho.

#### clean {#mt-clean}

- Injongo: susa izinto ezakhiweyo/zokujonga (preview) zasekhaya.
- Ukusetyenziswa: `make clean`
- Isusa (ukuba zikhona):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Injongo: format, vavanya, hlaziya i-changelog, wenze i-commit, uze uphushe.
- Ukusetyenziswa: `make commit`
- Iinkcukacha: iqhuba i-Prettier (bhala), `make test`, `make test_i18n`; yongeza i-changelog xa kukho i-diff ezibekiweyo; iphusha ku `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Injongo: sebenzisa i-ESLint nge-flat config.
- Ukusetyenziswa: `make eslint`

---

#### help {#mt-help}

- Injongo: dwelisa zonke iithagethi kunye neenkcazo zomgca omnye.
- Ukusetyenziswa: `make help`

---

#### lint {#mt-lint}

- Injongo: hlola i-MailExtension usebenzisa `web-ext`.
- Ukusetyenziswa: `make lint`
- Amanqaku: ikopa okwethutyana `sources/manifest_LOCAL.json` → `sources/manifest.json`; ingazinaki ii-ZIP ezakhiweyo; izilumkiso azibangeli ukusilela kwemijelo.

---

#### menu {#mt-menu}

- Injongo: imenu esebenzisanayo yokukhetha ithagethi ye-Make kunye neeargumenti ozikhethelayo.
- Ukusetyenziswa: sebenzisa `make` ngaphandle kweeargumenti.
- Amanqaku: ukuba `whiptail` ayifumaneki, imenu ibuyela ku `make help`.

---

#### pack {#mt-pack}

- Injongo: yakha ii-ZIP ze-ATN ne-LOCAL (ixhomekeke ku `lint`).
- Ukusetyenziswa: `make pack`
- Icebiso: nyusa iinguqulelo kuzo zombini `sources/manifest_*.json` phambi kokupakisha.

---

#### prettier {#mt-prettier}

- Injongo: format irepo endaweni.
- Ukusetyenziswa: `make prettier`

#### prettier_check {#mt-prettier_check}

- Injongo: qinisekisa i-formatting (akukho kubhala).
- Ukusetyenziswa: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Injongo: i-alias ye `prettier`.
- Ukusetyenziswa: `make prettier_write`

---

#### test {#mt-test}

- Injongo: sebenzisa i-Prettier (bhala), i-ESLint, ulandele nge-Vitest (ugubungelo ukuba lufakiwe).
- Ukusetyenziswa: `make test`

#### test_i18n {#mt-test_i18n}

- Injongo: uvavanyo olugxile kwi-i18n lwemitya yesongezelelo kunye namaxwebhu ewebhusayithi.
- Ukusetyenziswa: `make test_i18n`
- Iqhuba: `npm run test:i18n` kunye ne `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Injongo: guqulela imitya ye-UI yesongezelelo ukusuka EN ukuya kwezinye iilokhale.
- Ukusetyenziswa: `make translation_app OPTS="--locales all|de,fr"`
- Amanqaku: igcina ulwakhiwo lwamaqhosha kunye nezibambiso; iilog ziya ku `translation_app.log`. Ifomu yeskripthi: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Injongo: guqulela amaxwebhu ewebhusayithi ukusuka `website/docs/*.md` ukuya ku `website/i18n/<locale>/...`.
- Ekhethwayo: `translate_web_docs_batch` (OpenAI Batch API)
  - Ukusetyenziswa (iiflegi): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Indlela yakudala (positional) isaqatshelwa: `OPTS="<doc|all> <lang|all>"`
- Ukuziphatha: yakha i-JSONL, ilayishe, ijongisise rhoqo imizuzwana engama-30, ikhuphele iziphumo, ibhale iifayile.
- Qaphela: umsebenzi womqulu unokuthatha ukuya kuthi ga kwiiyure ezingama-24 ukugqiba (ngokwefestile yomqulu ye-OpenAI). I-console ibonisa ixesha elidlulileyo kuzo zonke iipol.
- Okusingqongileyo: `OPENAI_API_KEY` (kuyimfuneko), ngokuzikhethela `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (i-default yi-24h), `BATCH_POLL_INTERVAL_MS`.
- Ilifa: `translate_web_docs_sync`
  - Ukusetyenziswa (iiflegi): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Indlela yakudala (positional) isaqatshelwa: `OPTS="<doc|all> <lang|all>"`
- Ukuziphatha: izicelo ezihambelanayo nge-pari nganye (akukho mqulu odityanisiweyo).
- Amanqaku: Imibuzo esebenzisanayo xa `OPTS` ishiywe ngaphandle. Zombini iindlela zigcina iibhloko zekhowudi/ikhowudi yangaphakathi kwaye zigcina i-front‑matter `id` ingatshintshwanga; iilog ziya ku `translation_web_batch.log` (batch) okanye `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Injongo: guqulela imitya ye-UI yewebhusayithi (iphepha lasekhaya, ibar ephezulu, unyaweni) ukusuka `website/i18n/en/code.json` ukuya kuzo zonke iilokhale phantsi kwe `website/i18n/<locale>/code.json` (kuqukanywe `en` ngaphandle).
- Ukusetyenziswa: `make translate_web_index` okanye `make translate_web_index OPTS="--locales de,fr [--force]"`
- Iimfuneko: thumela ngaphandle `OPENAI_API_KEY` (ngokuzikhethela: `OPENAI_MODEL=gpt-4o-mini`).
- Ukuziphatha: iqinisekisa isakhiwo se-JSON, igcina izibambiso ezinezikroba, igcina ii-URL zingatshintshwanga, kwaye izama kwakhona ngengxelo kwiimpazamo zokuqinisekisa.

---

#### web_build {#mt-web_build}

- Injongo: yakha isiza samaxwebhu ukuya `website/build`.
- Ukusetyenziswa: `make web_build OPTS="--locales en|de,en|all"` (okanye seta `BUILD_LOCALES="en de"`)
- Izinto zangaphakathi: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Iixhomekeko: iqhuba `npm ci` ku `website/` kuphela xa `website/node_modules/@docusaurus` ingekho.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Injongo: uvavanyo lwezixhumanisi olukhuselekileyo ngaphandle kwe-intanethi.
- Ukusetyenziswa: `make web_build_linkcheck OPTS="--locales en|all"`
- Amanqaku: yakha ukuya `tmp_linkcheck_web_pages`; ibhala kwakhona i-GH Pages `baseUrl` ukuya `/`; idlula amakhonkco e-HTTP(S) angaphandle.

#### web_build_local_preview {#mt-web_build_local_preview}

- Injongo: umboniso wasekhaya we-gh‑pages onokuvavanyo/uvavanyo lwezixhumanisi.
- Ukusetyenziswa: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ukuziphatha: izama iseva yomboniso ye-Node kuqala (`scripts/preview-server.mjs`, ixhasa `/__stop`), ibuyele ku `python3 -m http.server` ukuba kuyimfuneko; isebenza kwi-8080–8090; i-PID kwi `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Injongo: push `website/build` kwi-branch `gh-pages`.
- Ukusetyenziswa: `make web_push_github`

Icebiso: seta `NPM=…` ukugqithisa umphathi weepakethe osetyenziswa yi-Makefile (i-default yi `npm`).
