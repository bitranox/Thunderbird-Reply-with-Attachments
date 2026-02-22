---
id: development
title: 'Ukuthuthukiswa'
sidebar_label: 'Intuthuko'
---

---

## Umhlahlandlela Wokuthuthukisa {#development-guide}

:::note Hlela isiNgisi kuphela; ukuhunyushwa kusabalale
Buyekeza amadokhumenti kuphela ngaphansi kuka `website/docs` (isiNgisi). Ukuhunyushwa ngaphansi kuka `website/i18n/<locale>/…` kuzenzakalela futhi akufanele kuhlelwe ngesandla. Sebenzisa imisebenzi yokuhumusha (isb., `make translate_web_docs_batch`) ukuvuselela okuqukethwe okwenziwe ngolimi lwendawo.
:::

### Izidingo zangaphambi {#prerequisites}

- Node.js 22+ no-npm (kuhlolwe nge-Node 22)
- Thunderbird 128 ESR noma okusha (ukuhlola ngesandla)

---

### Uhlaka Lomsebenzi (izinga eliphezulu) {#project-layout-high-level}

- Impande: iskripthi sokupakisha `distribution_zip_packer.sh`, amadokhumenti, izithombe-skrini
- `sources/`: ikhodi eyinhloko ye-add-on (background, i-UI yokukhetha/ipopayi, ama-manifest, ama-icon)
- `tests/`: i-Vitest suite
- `website/`: amadokhumenti e-Docusaurus (ane-i18n ngaphansi kuka `website/i18n/de/...`)

---

### Ukufaka & Amathuluzi {#install-and-tooling}

- Faka izincike zempande: `npm ci`
- Amadokhumenti (okuzikhethela): `cd website && npm ci`
- Thola ama-target: `make help`

---

### Intuthuko Ebukhoma (web‑ext run) {#live-dev-web-ext}

- Umjikelezo osheshayo ku-Firefox Desktop (ukuhlola okusheshayo kwe-UI kuphela):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Sebenzisa ku-Thunderbird (okukhethwayo kwe-MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Amathiphu:
- Gcina i-Error Console ye-Thunderbird ivuliwe (Tools → Developer Tools → Error Console).
- Amakhasi e-MV3 event amiswa uma engenzi lutho; layisha kabusha i-add-on ngemuva kokushintsha ikhodi, noma uvumele i-web-ext izilayishe kabusha.
- Ezinye izindlela ezikhethekile ze-Firefox ziyehluka; njalo uqinisekise ku-Thunderbird ngokulingana kwe-API.
- Izindlela ze-binary ze-Thunderbird (izibonelo):
- Linux: `thunderbird` (isb., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ukuhlukanisa iphrofayela: Sebenzisa iphrofayela ehlukile ye-Thunderbird yokuthuthukisa ukuze ugweme ukuthinta ukusethwa kwakho kwansuku zonke.

---

### Ama‑Target e-Make (Ngokwezinhlamvu) {#make-targets-alphabetical}

I-Makefile ijwayelanisa ukugeleza okuvamile kwentuthuko. Sebenzisa `make help` noma nini ukuze uthole isifinyezo somugqa owodwa salo lonke ithegi.

Ithiphu: ukusebenzisa `make` ngaphandle kwe-target kuvula imenyu elula ye-Whiptail yokukhetha i-target.

| I-Target                                                 | Incazelo yomugqa owodwa                                                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Susa izinto zokwakha/ukubuka ngaphambilini zendawo (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | Format, sebenzisa izivivinyo (kuhlanganisa i-i18n), buyekeza i-changelog, commit & push.                    |
| [`eslint`](#mt-eslint)                                   | Sebenzisa i-ESLint nge-flat config (`npm run -s lint:eslint`).                                              |
| [`help`](#mt-help)                                       | Bhala wonke ama-target ngezimfuneko zomugqa owodwa (zihlelwe).                                              |
| [`lint`](#mt-lint)                                       | i-web‑ext lint ku `sources/` (i-manifest yesikhashana; idlula ama-ZIP; akubulali).                          |
| [`menu`](#mt-menu)                                       | Imenyu ehl互动 ukuze ukhethe i-target kanye nezinketho ozikhethelayo.                                       |
| [`pack`](#mt-pack)                                       | Yakha ama-ZIP e-ATN & LOCAL (isebenzisa i-linter; ibiza i-skripthi le-packer).                              |
| [`prettier`](#mt-prettier)                               | Hlela kabusha ifa elise-repository (libhala izinguquko).                                                    |
| [`prettier_check`](#mt-prettier_check)                   | I-Prettier kumodi yokuhlola (akubhali); yehluleka uma kudingeka ukuhlelwa kabusha.                          |
| [`prettier_write`](#mt-prettier_write)                   | Isiteketiso se `prettier`.                                                                                  |
| [`test`](#mt-test)                                       | I-Prettier (bhala), i-ESLint, bese i-Vitest (ukumbozwa uma kuhlelwe).                                       |
| [`test_i18n`](#mt-test_i18n)                             | Izivivinyo ze-i18n kuphela: izikhala/ukulingana kwe-add-on + ukulingana kwewebhusayithi.                    |
| [`translate_app`](#mt-translation-app)                   | Isiteketiso se `translation_app`.                                                                           |
| [`translation_app`](#mt-translation-app)                 | Humusha izintambo ze-UI zohlelo kusuka `sources/_locales/en/messages.json`.                                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | Humusha amadokhumenti ewebhusayithi nge-OpenAI Batch API (okukhethwayo).                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Humusha amadokhumenti ewebhusayithi ngokushintsha (legacy, okungewona i-batch).                             |
| [`translate_web_index`](#mt-translation_web_index)       | Isiteketiso se `translation_web_index`.                                                                     |
| [`translation_web_index`](#mt-translation_web_index)     | Humusha i-UI yekhasi lasekhaya/ibha yokuzula/unyaweni (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Yakha amadokhumenti kuya ku `website/build` (isekela `--locales` / `BUILD_LOCALES`).                        |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Ukuhlola izixhumanisi okuphephile okungaxhunyiwe ku-inthanethi (ikudlula i-HTTP[S] ekude).                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Umbukiso wendawo we-gh‑pages; u-auto‑serve ku-8080–8090; izivivinyo/ukuhlola izixhumanisi ongakukhetha.     |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` ku `gh-pages` branch.                                                                  |

Syntax yezinketho

- Sebenzisa `make <command> OPTS="…"` ukudlulisela izinketho (kuyelwe iziphawulo). I-target ngayinye engezansi ikhombisa isibonelo sokusebenzisa.

--

-

#### Amathiphu wokwakha izilimi zendawo {#locale-build-tips}

- Yakha ingxenye yezilimi: setha `BUILD_LOCALES="en de"` noma udlulisele `OPTS="--locales en,de"` kuma-target ewebhu.
- Buka okungaphambi kolimi oluthile: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Yakha & Ipakeji {#build-and-package}

- Yakha ama-ZIP: `make pack`
- Ikhiqiza ama-ZIP e-ATN ne-LOCAL empandeni ye-repo (ungalungisi izinto ezenziwe ngesandla)
- Ithiphu: buyekeza inguqulo kuzo zombili `sources/manifest_ATN.json` no `sources/manifest_LOCAL.json` ngaphambi kokupakisha
- Ukufaka ngesandla (dev): Thunderbird → Tools → Add‑ons and Themes → igiya → Install Add‑on From File… → khetha i-ZIP eyakhiwe

---

### Ukuhlola {#test}

- I-suite ephelele: `make test` (Vitest)
- Ukumbozwa (okuzikhethela):
- `npm i -D @vitest/coverage-v8`
- Sebenzisa `make test`; vula `coverage/index.html` we-HTML report
- i18n kuphela: `make test_i18n` (okhiye/izikhala/izihloko ze-UI + ukulingana kwewebhusayithi kwedokhumenti ngayinye ngolimi ngamunye nezinhloli ze-id/title/sidebar_label)

---

### Ukuxilonga & Amalogi {#debugging-and-logs}

- I-Error Console: Tools → Developer Tools → Error Console
- Guqula amalogi anemininingwane ngesikhathi sokusebenza:
- Nika amandla: `messenger.storage.local.set({ debug: true })`
- Khubaza: `messenger.storage.local.set({ debug: false })`
- Amalogi avela ngesikhathi sokubhala/ukuthumela izimpendulo

---

### Amadokhumenti (iwebhusayithi) {#docs-website}

- Iseva ye-dev: `cd website && npm run start`
- Yakha isiza esingaguquki: `cd website && npm run build`
- Okulinganayo kwe‑Make (ngokwezinhlamvu): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Izibonelo zokusebenzisa:
- IsiNgisi kuphela, weqa izivivinyo/ukuhlola izixhumanisi, akukho push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Zonke izilimi zendawo, ngezivivinyo/ukuhlola izixhumanisi, bese push: `make web_build_local_preview && make web_push_github`
- Ngaphambi kokushicilela, sebenzisa ukuhlola izixhumanisi okuphephile okungaxhunyiwe ku-inthanethi: `make web_build_linkcheck`.
- i18n: isiNgisi sikhona ku `website/docs/*.md`; izinguqulo zesiJalimane ziku `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Ukusesha: Uma iziphakamiso zemvelo ze-Algolia DocSearch zisethwe ku-CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), isiza sisebenzisa ukusesha kwe-Algolia; kungenjalo sibuyela ekusesheni kwasendaweni. Ekhasini lasekhaya, cindezela `/` noma `Ctrl+K` ukuze uvule ibhokisi lokusesha.

---

#### Umzila wokudlulisela (redirect) wokunikela {#donate-redirect}

- `website/src/pages/donate.js`
- Umzila: `/donate` (kanye no `/<locale>/donate`)
- Ukuziphatha:
- Uma umzila wamanje unolimi lwendawo (isb., `/de/donate`), wusebenzise
- Kungenjalo, khetha okufanayo okuhle kakhulu kusuka ku-`navigator.languages` uma kuqhathaniswa nezilimi ezimisiwe; buyela kolimi oluzenzakalelayo
- Idlulisela ku:
- `en` → `/docs/donation`
- abanye → `/<locale>/docs/donation`
- Isebenzisa `useBaseUrl` ukuphatha kahle i-baseUrl
- Ifaka i-meta refresh + isixhumanisi `noscript` njengesipele

---

---

#### Amathiphu Okubuka kuqala {#preview-tips}

- Misa i-Node preview kahle: vula `http://localhost:<port>/__stop` (iphrintwe ngemuva kuka `Local server started`).
- Uma izithombe zingalayishi ku-MDX/JSX, sebenzisa `useBaseUrl('/img/...')` ukuhlonipha i-`baseUrl` yesiza.
- I-preview iqala kuqala; ukuhlola izixhumanisi kuyalandela futhi akuvimbi (izixhumanisi zangaphandle ezaphukile ngeke zimise i-preview).
- Isixhumanisi sesibonelo se-preview: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (iphrintwe ngemuva kwe-“Local server started”).
- Izixhumanisi zangaphandle ekuhloleni izixhumanisi: Ezinye iziza zangaphandle (isb., addons.thunderbird.net) zivimba ama-crawler azishintshayo futhi zingakhombisa i-403 ekuhloleni izixhumanisi. I-preview isaqala; lezi zinganakwa ngokuphepha.

---

#### Humusha iwebhusayithi {#translate-website}

Ongakuhumusha

- I-UI yewebhusayithi kuphela: ikhasi lasekhaya, ibha yokuzula, unyaweni, nezinye izintambo ze-UI. Okuqukethwe kwamadokhumenti kuhlala kungesiNgisi okwamanje.

Lapho uhlela khona

- Hlela `website/i18n/<locale>/code.json` (sebenzisa `en` njengereferensi). Gcina izikhala ezifana no `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` zingashintshi.

Dala noma uvuselele amafayela

- Dala ama-stub alahlekile azo zonke izilimi zendawo: `npm --prefix website run i18n:stubs`
- Bhala phezu kwama-stub kusuka esiNgisini (ngemva kokwengeza izintambo ezintsha): `npm --prefix website run i18n:stubs:force`
- Enye indlela yolimi olulodwa: `npx --prefix website docusaurus write-translations --locale <locale>`

Humusha izintambo ze-UI zekhasikhaya/ibha yokuzula/unyaweni (OpenAI)

- Setha iziqinisekiso kanye (shell noma .env):
- `export OPENAI_API_KEY=sk-...`
- Okuzikhethela: `export OPENAI_MODEL=gpt-4o-mini`
- Okukodwa (zonke izilimi, weqa en): `make translate_web_index`
- Khawulela ezilimini ezithile: `make translate_web_index OPTS="--locales de,fr"`
- Bhala phezu kwamagugu akhona: `make translate_web_index OPTS="--force"`

Ukuqinisekisa & ukuzama futhi

- Iskripthi sokuhumusha siqinisekisa ukuma kwe-JSON, sigcina izikhala zika-curly-brace, futhi siqinisekisa ukuthi ama-URL awashintshi.
- Uma ukuqinisekiswa kwehluleka, sizama futhi sinempendulo kuze kufike izikhathi ezi-2 ngaphambi kokugcina amagugu akhona.

Buka ulwimi lwakho lwendawo

- Iseva ye-dev: `npm --prefix website run start`
- Vakashela `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Ukufaka

- Vula i-PR nefayela(le) `code.json` elihlelwe. Gcina izinguquko zigxile futhi ufake isithombe-skrini esisheshayo uma kungenzeka.

---

### Amathiphu Ezokuphepha & Ukumiswa {#security-and-configuration-tips}

- Ungafaki `sources/manifest.json` (elidalwa okwesikhashana ngesikhathi sokwakha)
- Gcina `browser_specific_settings.gecko.id` izinzile ukuze ugcine isiteshi sokuvuselela

---

### Ukuqhubeka Kwezilungiselelo {#settings-persistence}

- Isitoreji: Zonke izilungiselelo zomsebenzisi zihlala ku `storage.local` futhi ziqhubeka nangemva kwezibuyekezo ze-add-on.
- Ukufaka: Okuzenzakalelayo kufakwa kuphela lapho ukhiye ungakaze ukhonjwe (undefined).
- Ukubuyekeza: I-migration igcwalisa kuphela okhiye abalahlekile; amagugu akhona awaze owalwe phezu kwawo.
- Umaki wesikimu: `settingsVersion` (njengamanje `1`).
- Okhiye nokumisiwe:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Ikhodi: bheka `sources/background.js` → `initializeOrMigrateSettings()` kanye no `SCHEMA_VERSION`.

Ukugeleza komsebenzi we-dev (ukwengeza isethingi entsha)

- Nyusa `SCHEMA_VERSION` ngaphakathi ku `sources/background.js`.
- Engeza ukhiye omusha + okuzenzakalelayo entweni ethi `DEFAULTS` ku `initializeOrMigrateSettings()`.
- Sebenzisa umthetho othi “only-if-undefined” lapho utshala okuzenzakalelayo; ungabhali phezu kwamagugu akhona.
- Uma isethingi ibonakala kumsebenzisi, yifake ku `sources/options.js` bese wengeza izintambo ezihunyushiwe.
- Engeza/lungisa izivivinyo (bheka `tests/background.settings.migration.test.js`).

Amathiphu okuhlola ngesandla

- Lingisa ukufaka okusha: sula i-dir yedatha ye-extension noma uqale ngephrofayela entsha.
- Lingisa isibuyekezo: seta `settingsVersion` ku `0` ku `storage.local` bese ulayisha kabusha; qinisekisa ukuthi amagugu akhona ahlala engashintshi futhi kwengezwa kuphela okhiye abalahlekile.

---

### Ukuxazulula izinkinga {#troubleshooting}

- Qinisekisa ukuthi i-Thunderbird iyi-128 ESR noma entsha
- Sebenzisa i-Error Console yezinkinga zesikhathi sokusebenza
- Uma izilungiselelo ezigciniwe zibonakala zingasebenzi kahle, qala kabusha i-Thunderbird bese uzama futhi. (I-Thunderbird ingagcina isimo phakathi kwezikhathi; ukuqala kabusha kuqinisekisa ukuthi izilungiselelo ezintsha zilayishwa.)

---

### CI & Ukumbozwa {#ci-and-coverage}

- I-GitHub Actions (`CI — Tests`) isebenzisa i-vitest ngemikhawulo yokumbozwa (85% imigqa/imisebenzi/amahlumela/izitatimende). Uma imikhawulo ingahlangatshezwa, umsebenzi wehluleka.
- I-workflow ilayisha i-artifact `coverage-html` enombiko we-HTML; yilayishe ekhasini lokugijima (Actions → run yokugcina → Artifacts).

---

### Ukunikela {#contributing}

- Bheka i-CONTRIBUTING.md yemithetho ye-branch/commit/PR
- Ithiphu: Dala iphrofayela yokuthuthukisa ehlukile ye-Thunderbird yokuhlola ukuze ugweme ukuthinta iphrofayela yakho yansuku zonke.

---

### Ukuhumusha

- Ukuhamba kwemisebenzi emikhulu “zonke → zonke” kungaba kuhamba kancane futhi kubize. Qala ngengxenye (isb., amadokhumenti ambalwa namalimi angu-1–2), ubuyekeze umphumela, bese wandisa.

---

- Inqubomgomo yokuzama futhi: imisebenzi yokuhumusha yenza kuze kube kathathu ukuzama futhi nge-exponential backoff eziphuthumayo ze-API; bheka `scripts/translate_web_docs_batch.js` no `scripts/translate_web_docs_sync.js`.

Izithombe-skrini zamadokhumenti

- Gcina izithombe ngaphansi kuka `website/static/img/`.
- Zibhekisele ku-MD/MDX nge `useBaseUrl('/img/<filename>')` ukuze izindlela zisebenze ne-`baseUrl` yesiza.
- Ngemuva kokwengeza noma ukuqamba kabusha izithombe ngaphansi kuka `website/static/img/`, qinisekisa ukuthi zonke izinkomba zisasebenzisa `useBaseUrl('/img/…')` futhi zibonisa ku-preview yendawo.
  Ama-Favicon

- I-`favicon.ico` enosayizi abaningi ikhiqizwa ngokuzenzakalela kuyo yonke imigudu yokwakha (Make + scripts) nge `website/scripts/build-favicon.mjs`.
- Akudingeki isinyathelo sesandla; ukuvuselela `icon-*.png` kwanele.
  Ithiphu yokubuyekeza

- Gcina i-front‑matter `id` ingashintshi kumadokhumenti ahunyushiwe; humusha kuphela `title` no `sidebar_label` uma ekhona.

#### clean {#mt-clean}

- Inhloso: susa izinto zokwakha/ukubuka zangaphambilini zendawo.
- Ukusebenzisa: `make clean`
- Kususa (uma kukhona):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Inhloso: hlela, hlola, buyekeza i-changelog, commit, futhi push.
- Ukusebenzisa: `make commit`
- Imininingwane: isebenzisa i-Prettier (bhala), `make test`, `make test_i18n`; inamathisela i-changelog lapho kunezinguquko ezimakwe; iphusha ku `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Inhloso: sebenzisa i-ESLint nge-flat config.
- Ukusebenzisa: `make eslint`

---

#### help {#mt-help}

- Inhloso: bala wonke ama-target ngezimfuneko zomugqa owodwa.
- Ukusebenzisa: `make help`

---

#### lint {#mt-lint}

- Inhloso: hlola i-MailExtension usebenzisa `web-ext`.
- Ukusebenzisa: `make lint`
- Amanothi: ikopisha okwamanje `sources/manifest_LOCAL.json` → `sources/manifest.json`; idlula ama-ZIP akhiwe; izexwayiso azibulali i-pipeline.

---

#### menu {#mt-menu}

- Inhloso: imenyu ehl互动 yokukhetha i-target ye-Make nezinketho ongazikhetha.
- Ukusebenzisa: sebenzisa `make` ngaphandle kwezimpikiswano.
- Amanothi: uma `whiptail` ingatholakali, imenyu ibuyela ku `make help`.

---

#### pack {#mt-pack}

- Inhloso: yakha ama-ZIP e-ATN ne-LOCAL (incike ku `lint`).
- Ukusebenzisa: `make pack`
- Ithiphu: nyusa izinguqulo kuzo zombili `sources/manifest_*.json` ngaphambi kokupakisha.

---

#### prettier {#mt-prettier}

- Inhloso: hlela ifa elise-repo endaweni.
- Ukusebenzisa: `make prettier`

#### prettier_check {#mt-prettier_check}

- Inhloso: qinisekisa ukuhlelwa (akubhali).
- Ukusebenzisa: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Inhloso: isiteketiso se `prettier`.
- Ukusebenzisa: `make prettier_write`

---

#### test {#mt-test}

- Inhloso: sebenzisa i-Prettier (bhala), i-ESLint, bese i-Vitest (ukumbozwa uma kufakiwe).
- Ukusebenzisa: `make test`

#### test_i18n {#mt-test_i18n}

- Inhloso: izivivinyo ezigxile ku-i18n zezintambo ze-add-on namadokhumenti ewebhusayithi.
- Ukusebenzisa: `make test_i18n`
- Isebenzisa: `npm run test:i18n` no `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Inhloso: humusha izintambo ze-UI ze-add-on kusuka ku-EN ziye kwezinye izilimi.
- Ukusebenzisa: `make translation_app OPTS="--locales all|de,fr"`
- Amanothi: igcina ukwakheka kokhiye nezikhala; iloga ku `translation_app.log`. Ifomu leskripthi: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Inhloso: humusha amadokhumenti ewebhusayithi kusuka ku `website/docs/*.md` kuya ku `website/i18n/<locale>/...`.
- Okukhethwayo: `translate_web_docs_batch` (OpenAI Batch API)
  - Ukusebenzisa (amafulegi): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - I-legacy positional isayamukelwa: `OPTS="<doc|all> <lang|all>"`
- Ukuziphatha: yakha i-JSONL, ilayishe, ibuze njalo ngemizuzu engama-30, ilande imiphumela, ibhale amafayela.
- Inothi: umsebenzi we-batch ungathatha kuze kube amahora angama-24 ukuwuqedela (ngokwendlela ye-batch ye-OpenAI). I-console ikhombisa isikhathi esedlule kokubuzayo ngakunye.
- Izemvelo: `OPENAI_API_KEY` (kudingekile), okuzikhethela `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (okuzenzakalelayo amahora angama-24), `BATCH_POLL_INTERVAL_MS`.
- I-legacy: `translate_web_docs_sync`
  - Ukusebenzisa (amafulegi): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - I-legacy positional isayamukelwa: `OPTS="<doc|all> <lang|all>"`
- Ukuziphatha: izicelo ezihambisanayo ngephari ngayinye (akukho i-batch aggregation).
- Amanothi: Izikhuthazo ezisebenzisanayo uma `OPTS` ishiywe; Zombili izindlela zigcina ama-code block/inline code futhi zigcina i-front‑matter `id` ingashintshi; ziloga ku `translation_web_batch.log` (batch) noma `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Inhloso: humusha izintambo ze-UI zewebhusayithi (ikhasi lasekhaya, ibha yokuzula, unyaweni) kusuka ku `website/i18n/en/code.json` kuya kuzo zonke izilimi ngaphansi kuka `website/i18n/<locale>/code.json` (kukhishwa `en`).
- Ukusebenzisa: `make translate_web_index` noma `make translate_web_index OPTS="--locales de,fr [--force]"`
- Izidingo: thumela ngaphandle `OPENAI_API_KEY` (okuzikhethela: `OPENAI_MODEL=gpt-4o-mini`).
- Ukuziphatha: iqinisekisa ukwakheka kwe-JSON, igcina izikhala zika-curly-brace, igcina ama-URL engashintshi, futhi izama futhi enikeza impendulo uma kunephutha ekuqinisekiseni.

---

#### web_build {#mt-web_build}

- Inhloso: yakha isiza samadokhumenti kuya ku `website/build`.
- Ukusebenzisa: `make web_build OPTS="--locales en|de,en|all"` (noma setha `BUILD_LOCALES="en de"`)
- Okuqukethwe kwangaphakathi: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Izincike: isebenza `npm ci` ku `website/` kuphela uma `website/node_modules/@docusaurus` ingekho.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Inhloso: ukuhlola izixhumanisi okuphephile okungaxhunyiwe ku-inthanethi.
- Ukusebenzisa: `make web_build_linkcheck OPTS="--locales en|all"`
- Amanothi: yakha kuya ku `tmp_linkcheck_web_pages`; ibhala kabusha i-GH Pages `baseUrl` iye ku `/`; igwema izixhumanisi ze-HTTP(S) ezikude.

#### web_build_local_preview {#mt-web_build_local_preview}

- Inhloso: i-preview yendawo ye-gh‑pages ngezivivinyo/ukuhlola izixhumanisi ongakukhetha.
- Ukusebenzisa: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ukuziphatha: izama iseva ye-Node preview kuqala (`scripts/preview-server.mjs`, isekela `/__stop`), ibuyele ku `python3 -m http.server`; isebenza ku-8080–8090; i-PID ku `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Inhloso: push `website/build` ku `gh-pages` branch.
- Ukusebenzisa: `make web_push_github`

Ithiphu: setha `NPM=…` ukuze udlulelisele i-package manager esetshenziswa yi-Makefile (okuzenzakalelayo `npm`).

---
