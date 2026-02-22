---
id: development
title: 'Әзірлеу'
sidebar_label: 'Әзірлеу'
---

---

## Әзірлеу нұсқаулығы {#development-guide}

:::note Тек ағылшын нұсқасын өңдеңіз; аудармалар таратылады
Құжаттаманы тек `website/docs` (ағылшынша) астында жаңартыңыз. `website/i18n/<locale>/…` астындағы аудармалар генерацияланады және қолмен өңделмеуі тиіс. Локализацияланған мазмұнды жаңарту үшін аударма тапсырмаларын пайдаланыңыз (мыс., `make translate_web_docs_batch`).
:::

### Алдын ала талаптар {#prerequisites}

- Node.js 22+ және npm (Node 22-мен тексерілген)
- Thunderbird 128 ESR немесе жаңарақ (қолмен тестілеу үшін)

---

### Жоба құрылымы (жоғары деңгей) {#project-layout-high-level}

- Түбір: орау скрипті `distribution_zip_packer.sh`, құжаттар, скриншоттар
- `sources/`: негізгі қондырма коды (фондық, опциялар/қалқып шығатын UI, манифестер, иконкалар)
- `tests/`: Vitest жинағы
- `website/`: Docusaurus құжаттары (i18n `website/i18n/de/...` ішінде)

---

### Орнату және құралдар {#install-and-tooling}

- Түбір тәуелділіктерін орнату: `npm ci`
- Құжаттар (қосымша): `cd website && npm ci`
- Мақсаттарды көру: `make help`

---

### Тікелей әзірлеу (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop-та жедел цикл (тек UI smoke-тесттері):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird-та іске қосу (MailExtensions үшін ұсынылады):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Кеңестер:
- Thunderbird қателер консольін ашық ұстаңыз (Tools → Developer Tools → Error Console).
- MV3 оқиға беттері бос тұрған кезде тоқтатылады; код өзгерістерінен кейін қондырманы қайта жүктеңіз немесе web‑ext авто-қайта жүктеуін пайдаланыңыз.
- Тек Firefox-тағы кейбір мінез-құлықтар өзгеше; API сәйкестігін Thunderbird-та әрқашан тексеріңіз.
- Thunderbird орындалатын файл жолдары (мысалдар):
- Linux: `thunderbird` (мыс., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Профильді оқшаулау: Күнделікті баптауларыңызға әсер етпеу үшін әзірлеуге бөлек Thunderbird профилін қолданыңыз.

---

### Make мақсаттары (алфавит бойынша) {#make-targets-alphabetical}

Makefile ортақ әзірлеу ағындарын біріздендіреді. Әрбір мақсаттың бір жолдық сипаттамасын көру үшін кез келген уақытта `make help` іске қосыңыз.

Кеңес: `make` мақсатсыз іске қосылса, мақсатты таңдауға арналған қарапайым Whiptail мәзірі ашылады.

| Мақсат                                                   | Бір жолдық сипаттама                                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Жергілікті құрастыру/превью артефакттарын жою (tmp/, web-local-preview/, website/build/).                   |
| [`commit`](#mt-commit)                                   | Форматтау, тесттерді іске қосу (i18n қоса), өзгерістер журналын жаңарту, commit & push.                     |
| [`eslint`](#mt-eslint)                                   | ESLint-ті flat конфиг арқылы іске қосу (`npm run -s lint:eslint`).                                          |
| [`help`](#mt-help)                                       | Барлық мақсаттарды бір жолдық сипаттамамен тізімдеу (сұрыпталған).                                          |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/` бойынша (уақытша манифест; ZIP-тер еленбейді; фатал емес).                          |
| [`menu`](#mt-menu)                                       | Мақсат пен қосымша аргументтерді таңдауға арналған интерактивті мәзір.                                      |
| [`pack`](#mt-pack)                                       | ATN және LOCAL ZIP-терін құрастыру (линтерді іске қосады; packer скриптін шақырады).                        |
| [`prettier`](#mt-prettier)                               | Репозиторийді орнында форматтау (өзгерістерді жазады).                                                      |
| [`prettier_check`](#mt-prettier_check)                   | Prettier тексеру режимі (жазусыз); қайта форматтау керек болса, сәтсіз болады.                              |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` үшін балама атау.                                                                                |
| [`test`](#mt-test)                                       | Prettier (жазу), ESLint, содан кейін Vitest (қамту бапталса).                                               |
| [`test_i18n`](#mt-test_i18n)                             | Тек i18n тесттері: қондырма placeholder-лары/паритеті + веб‑сайт паритеті.                                  |
| [`translate_app`](#mt-translation-app)                   | `translation_app` үшін балама атау.                                                                         |
| [`translation_app`](#mt-translation-app)                 | Қосымша UI жолдарын `sources/_locales/en/messages.json` бастап аудару.                                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | Веб‑сайт құжаттарын OpenAI Batch API арқылы аудару (ұсынылады).                                             |
| [`translate_web_docs_sync`](#mt-translation-web)         | Веб‑сайт құжаттарын синхронды аудару (мұрагер, batch емес).                                                 |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` үшін балама атау.                                                                   |
| [`translation_web_index`](#mt-translation_web_index)     | Басты бет/навигация/түсініктеме (footer) UI-ын аудару (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Құжаттарды `website/build` орнына құрастыру (`--locales` / `BUILD_LOCALES` қолдайды).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Офлайн‑қауіпсіз сілтемелерді тексеру (қашықтағы HTTP[S] өткізеді).                                          |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Жергілікті gh‑pages превью; 8080–8090 порттарында авто-сервер; қосымша тесттер/сілтеме тексерісі.           |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` элементін `gh-pages` тармағына итеру (push).                                                |

Опциялар синтаксисі

- Опцияларды беру үшін `make <command> OPTS="…"` пайдаланыңыз (тырнақша ұсынылады). Төмендегі әр мақсатта қолдану үлгілері көрсетілген.

--

-

#### Локаль құрастыру кеңестері {#locale-build-tips}

- Локальдардың ішкі жиынын құрастыру: `BUILD_LOCALES="en de"` орнатыңыз немесе веб мақсаттарына `OPTS="--locales en,de"` беріңіз.
- Нақты локальді алдын ала қарау: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Құрастыру және орау {#build-and-package}

- ZIP-терді құрастыру: `make pack`
- Репозиторий түбінде ATN және LOCAL ZIP-терін жасайды (артефакттарды қолмен өңдемеңіз)
- Кеңес: ораудан бұрын нұсқаны `sources/manifest_ATN.json` және `sources/manifest_LOCAL.json` екеуінде де жаңартыңыз
- Қолмен орнату (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → жасалған ZIP файлын таңдаңыз

---

### Тестілеу {#test}

- Толық жиын: `make test` (Vitest)
- Қамту (қосымша):
- `npm i -D @vitest/coverage-v8`
- `make test` іске қосыңыз; HTML есебі үшін `coverage/index.html` ашыңыз
- Тек i18n: `make test_i18n` (UI кілттері/placeholder-лар/атаулар + веб‑сайтта әр локаль бойынша әр құжаттың паритеті id/title/sidebar_label тексерістерімен)

---

### Жөндеу және журналдар {#debugging-and-logs}

- Қате консолі: Tools → Developer Tools → Error Console
- Жіктелген (verbose) журналдарды орындалу кезінде қосу/өшіру:
- Қосу: `messenger.storage.local.set({ debug: true })`
- Өшіру: `messenger.storage.local.set({ debug: false })`
- Жауаптарды жазу/жіберу кезінде журналдар көрінеді

---

### Құжаттар (веб‑сайт) {#docs-website}

- Dev сервері: `cd website && npm run start`
- Статикалық сайтты құрастыру: `cd website && npm run build`
- Make баламалары (алфавитпен): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Қолдану үлгілері:
- Тек EN, тесттер/сілтеме тексерісін өткізу, push жоқ: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Барлық локальдар, тесттер/сілтеме тексерісімен, содан кейін push: `make web_build_local_preview && make web_push_github`
- Жариялар алдында офлайн‑қауіпсіз сілтеме тексерісін іске қосыңыз: `make web_build_linkcheck`.
- i18n: Ағылшын нұсқасы `website/docs/*.md` ішінде; неміс аудармалары `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ішінде
- Іздеу: Егер Algolia DocSearch орта айнымалылары CI-де орнатылса (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайт Algolia іздеуді қолданады; әйтпесе жергілікті іздеуге ауысады. Басты бетте іздеу жолағын ашу үшін `/` немесе `Ctrl+K` басыңыз.

---

#### Донатқа қайта бағыттау маршруты {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (және `/<locale>/donate`)
- Мінез-құлық:
- Ағымдағы маршрутта локаль болса (мыс., `/de/donate`), соны пайдаланыңыз
- Болмаса, `navigator.languages` ішінен бапталған локальдерге ең жақынын таңдаңыз; әдепкі локальге қайтыңыз
- Қайта бағыттайды:
- `en` → `/docs/donation`
- басқалары → `/<locale>/docs/donation`
- baseUrl-ды дұрыс өңдеу үшін `useBaseUrl` қолданады
- Қосымша ретінде meta refresh + `noscript` сілтемесін қамтиды

---

---

#### Превью кеңестері {#preview-tips}

- Node превьюін дұрыс тоқтату: `http://localhost:<port>/__stop` ашыңыз (`Local server started` кейін басылып шығады).
- MDX/JSX ішінде суреттер жүктелмесе, сайттың `baseUrl` параметрін сақтау үшін `useBaseUrl('/img/...')` қолданыңыз.
- Алдымен превью басталады; содан кейін сілтеме тексерісі іске қосылады және бөгемейді (сынған сыртқы сілтемелер превьюді тоқтатпайды).
- Превью URL үлгісі: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” шыққаннан кейін басылады).
- Сілтеме тексерістегі сыртқы сілтемелер: Кейбір сыртқы сайттар (мыс., addons.thunderbird.net) автоматтандырылған тексергіштерді бөгеп, 403 көрсетуі мүмкін. Превью бәрібір басталады; мұны елемеуге болады.

---

#### Веб‑сайтты аудару {#translate-website}

Не аудара аласыз

- Тек веб‑сайт UI: басты бет, навбар, футер және өзге UI жолдары. Құжаттар мазмұны әзірге тек ағылшынша қалады.

Қай жерде өңдеу керек

- `website/i18n/<locale>/code.json` өңдеңіз (`en` үлгі ретінде). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` сияқты placeholder-ларды өзгертпеңіз.

Файлдарды жасау немесе жаңарту

- Барлық локальдер үшін жетіспейтін қалқаларды (stubs) жасау: `npm --prefix website run i18n:stubs`
- Жаңа жолдар қосылғаннан кейін ағылшыннан stubs үстінен жазу: `npm --prefix website run i18n:stubs:force`
- Жеке локаль үшін балама: `npx --prefix website docusaurus write-translations --locale <locale>`

Басты бет/навигация/футер UI жолдарын аудару (OpenAI)

- Деректерді бір рет орнатыңыз (shell немесе .env):
- `export OPENAI_API_KEY=sk-...`
- Қосымша: `export OPENAI_MODEL=gpt-4o-mini`
- Бір реттік (барлық локальдер, en тыс): `make translate_web_index`
- Нақты локальдермен шектеу: `make translate_web_index OPTS="--locales de,fr"`
- Бар мәндердің үстінен жазу: `make translate_web_index OPTS="--force"`

Тексеру және қайта әрекеттер

- Аударма скрипті JSON пішінін тексереді, ирек жақшадағы placeholder-ларды сақтайды және URL‑дер өзгермегенін қамтамасыз етеді.
- Тексеру сәтсіз болса, бар мәндерді қалдырмас бұрын 2 ретке дейін кері байланыспен қайта әрекет жасайды.

Локальді алдын ала қараңыз

- Dev сервері: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` сілтемесіне өтіңіз

Жіберу

- Өңделген `code.json` файл(дар)ымен PR ашыңыз. Өзгерістерді ықшам ұстаңыз және мүмкін болса, қысқа скриншот қосыңыз.

---

### Қауіпсіздік және баптау кеңестері {#security-and-configuration-tips}

- `sources/manifest.json` файлын commit жасамаңыз (құрастыру уақытша жасайды)
- Жаңарту арнасын сақтау үшін `browser_specific_settings.gecko.id` мәнін тұрақты ұстаңыз

---

### Баптаулардың тұрақтылығы {#settings-persistence}

- Сақтау: Пайдаланушы баптауларының бәрі `storage.local` ішінде сақталады және қондырма жаңартуларында да сақталады.
- Орнату: Әдепкілер тек кілт мүлдем жоқ болғанда (undefined) ғана қолданылады.
- Жаңарту: Миграция тек жетіспейтін кілттерді толтырады; бар мәндер ешқашан үстінен жазылмайды.
- Схема маркері: `settingsVersion` (қазір `1`).
- Кілттер және әдепкілер:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: `sources/background.js` → `initializeOrMigrateSettings()` және `SCHEMA_VERSION` қараңыз.

Әзірлеу ағыны (жаңа баптау қосу)

- `sources/background.js` ішінде `SCHEMA_VERSION` арттырыңыз.
- Жаңа кілт + әдепкіні `initializeOrMigrateSettings()` ішіндегі `DEFAULTS` объектісіне қосыңыз.
- Әдепкілерді толтырғанда «тек-егер-анықталмаған» ережесін қолданыңыз; бар мәндерді үстінен жазбаңыз.
- Егер баптау пайдаланушыға көрінетін болса, оны `sources/options.js` ішінде байланыстырып, локализацияланған жолдар қосыңыз.
- Тесттерді қосыңыз/реттеңіз (`tests/background.settings.migration.test.js` қараңыз).

Қолмен тестілеу кеңестері

- Таза орнатуды модельдеу: кеңейтімнің деректер бумасын тазалаңыз немесе жаңа профильмен бастаңыз.
- Жаңартуды модельдеу: `storage.local` ішінде `settingsVersion` мәнін `0` етіп қойып, қайта жүктеңіз; бар мәндер өзгермегенін және тек жетіспейтін кілттер қосылғанын растаңыз.

---

### Ақауларды жою {#troubleshooting}

- Thunderbird 128 ESR немесе жаңарақ екеніне көз жеткізіңіз
- Орындалу мәселелері үшін Error Console қолданыңыз
- Сақталған баптаулар дұрыс қолданылмайтын болса, Thunderbird-ті қайта іске қосып көріңіз. (Thunderbird сессиялар арасында күйді кэштеуі мүмкін; қайта іске қосу жаңа баптауларды жүктеуді қамтамасыз етеді.)

---

### CI және қамту {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest-ті қамту шектерімен іске қосады (85% жолдар/функциялар/тармақтар/операторлар). Егер шектер орындалмаса, жұмыс сәтсіз аяқталады.
- Жұмыс үрдісі HTML есебі бар `coverage-html` артефактын жүктейді; оны жүгіру бетінде жүктеңіз (Actions → соңғы жүгіру → Artifacts).

---

### Үлес қосу {#contributing}

- Бөлім/commit/PR нұсқаулары үшін CONTRIBUTING.md қараңыз
- Кеңес: күнделікті профиліңізге әсер етпеу үшін тестілеуге бөлек Thunderbird әзірлеу профилін жасаңыз.

---

### Аудармалар

- Үлкен “all → all” аударма тапсырмалары баяу әрі қымбат болуы мүмкін. Алдымен ішкі жиыннан бастаңыз (мыс., бірнеше құжат және 1–2 локаль), нәтижені қарап шығып, кейін кеңейтіңіз.

---

- Қайта әрекет саясаты: аударма тапсырмалары API қателерінде экспоненциалды кідірістермен 3 ретке дейін қайта әрекет жасайды; `scripts/translate_web_docs_batch.js` және `scripts/translate_web_docs_sync.js` қараңыз.

Құжаттар үшін скриншоттар

- Суреттерді `website/static/img/` ішінде сақтаңыз.
- MD/MDX ішінде `useBaseUrl('/img/<filename>')` арқылы сілтеме жасаңыз, осылайша жолдар сайттың `baseUrl` параметрімен үйлеседі.
- `website/static/img/` ішінде суреттерді қосқаннан немесе қайта атағаннан кейін, барлық сілтемелер әлі де `useBaseUrl('/img/…')` пайдаланатынын және жергілікті превьюде көрсетілетінін растаңыз.
  Фавикондар

- Көп мөлшерлі `favicon.ico` барлық құрастыру жолдарында (Make + скрипттер) `website/scripts/build-favicon.mjs` арқылы автоматты түрде жасалады.
- Қолмен әрекеттер қажет емес; `icon-*.png` жаңарту жеткілікті.
  Шолу кеңесі

- Аударылған құжаттарда front‑matter ішіндегі `id` өзгертпей сақтаңыз; тек `title` және `sidebar_label` мәндерін аударыңыз (бар болса).

#### clean {#mt-clean}

- Мақсаты: жергілікті құрастыру/превью артефакттарын жою.
- Қолданылуы: `make clean`
- Жояды (болса):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Мақсаты: форматтау, тестілеу, өзгерістер журналын жаңарту, commit және push.
- Қолданылуы: `make commit`
- Егжей‑тегжейі: Prettier (жазу), `make test`, `make test_i18n` іске қосады; stage жасалған айырмашылықтар болса, changelog-қа қосады; `origin/<branch>` тармағына push жасайды.

---

#### eslint {#mt-eslint}

- Мақсаты: ESLint-ті flat конфиг арқылы іске қосу.
- Қолданылуы: `make eslint`

---

#### help {#mt-help}

- Мақсаты: барлық мақсаттарды бір жолдық сипаттамамен тізімдеу.
- Қолданылуы: `make help`

---

#### lint {#mt-lint}

- Мақсаты: `web-ext` пайдаланып MailExtension-ды lint ету.
- Қолданылуы: `make lint`
- Ескертпелер: `sources/manifest_LOCAL.json` → `sources/manifest.json` уақытша көшірмелейді; құрастырылған ZIP-терді елемейді; ескертулер pipeline-ды құлатпайды.

---

#### menu {#mt-menu}

- Мақсаты: Make мақсатын және қосымша аргументтерді таңдауға арналған интерактивті мәзір.
- Қолданылуы: `make` аргументсіз іске қосыңыз.
- Ескертпе: `whiptail` қолжетімсіз болса, мәзір `make help` нұсқасына қайтады.

---

#### pack {#mt-pack}

- Мақсаты: ATN және LOCAL ZIP-терін құрастыру (`lint` тәуелді).
- Қолданылуы: `make pack`
- Кеңес: ораудан бұрын `sources/manifest_*.json` екеуінде де нұсқаларды арттырыңыз.

---

#### prettier {#mt-prettier}

- Мақсаты: репоны орнында форматтау.
- Қолданылуы: `make prettier`

#### prettier_check {#mt-prettier_check}

- Мақсаты: форматтауды тексеру (жазусыз).
- Қолданылуы: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Мақсаты: `prettier` үшін балама.
- Қолданылуы: `make prettier_write`

---

#### test {#mt-test}

- Мақсаты: Prettier (жазу), ESLint, содан кейін Vitest (қамту орнатылса).
- Қолданылуы: `make test`

#### test_i18n {#mt-test_i18n}

- Мақсаты: қондырма жолдары мен веб‑сайт құжаттарына арналған i18n‑бағдарланған тесттер.
- Қолданылуы: `make test_i18n`
- Іске қосады: `npm run test:i18n` және `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Мақсаты: қондырма UI жолдарын EN-нен өзге локальдерге аудару.
- Қолданылуы: `make translation_app OPTS="--locales all|de,fr"`
- Ескертпелер: кілт құрылымын және placeholder-ларды сақтайды; `translation_app.log` ішіне журналдайды. Скрипт түрі: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Мақсаты: веб‑сайт құжаттарын `website/docs/*.md` бастап `website/i18n/<locale>/...` тіліне аудару.
- Ұсынылатын: `translate_web_docs_batch` (OpenAI Batch API)
  - Қолданылуы (жалаушалар): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Мұрагер позициялық түрі әлі қолданылады: `OPTS="<doc|all> <lang|all>"`
- Мінез‑құлық: JSONL құрады, жүктейді, әр 30с сайын сұрайды, нәтижелерді жүктеп алып, файлдарға жазады.
- Ескерту: batch тапсырма аяқталуға 24 сағатқа дейін созылуы мүмкін (OpenAI batch терезесіне сай). Консоль әр сұрауда өткен уақытты көрсетеді.
- Орта: `OPENAI_API_KEY` (қажетті), опционалды `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (әдепкі 24 сағ), `BATCH_POLL_INTERVAL_MS`.
- Мұрагер: `translate_web_docs_sync`
  - Қолданылуы (жалаушалар): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Мұрагер позициялық түрі әлі қолданылады: `OPTS="<doc|all> <lang|all>"`
- Мінез‑құлық: әр жұпқа синхронды сұраулар (batch агрегациясыз).
- Ескертпелер: `OPTS` жіберілсе, интерактивті сұраулар көрсетіледі. Екі режим де код блоктары/inline кодты сақтайды және front‑matter ішіндегі `id` өзгеріссіз қалады; журналдар `translation_web_batch.log` (batch) немесе `translation_web_sync.log` (sync) ішіне жазылады.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Мақсаты: веб‑сайт UI жолдарын (`website/i18n/en/code.json` бастап) `website/i18n/<locale>/code.json` астындағы барлық локальдерге аудару (`en` қоспағанда).
- Қолданылуы: `make translate_web_index` немесе `make translate_web_index OPTS="--locales de,fr [--force]"`
- Талаптар: `OPENAI_API_KEY` экспорттау (қосымша: `OPENAI_MODEL=gpt-4o-mini`).
- Мінез‑құлық: JSON құрылымын тексереді, ирек жақшадағы placeholder-ларды сақтайды, URL‑дерді өзгертпейді және тексеру қателерінде кері байланыспен қайта әрекет жасайды.

---

#### web_build {#mt-web_build}

- Мақсаты: құжаттар сайтын `website/build` орнына құрастыру.
- Қолданылуы: `make web_build OPTS="--locales en|de,en|all"` (немесе `BUILD_LOCALES="en de"` орнатыңыз)
- Ішкісі: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Тәуелділіктер: `website/node_modules/@docusaurus` жоқ болса ғана `website/` ішінде `npm ci` іске қосады.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Мақсаты: офлайн‑қауіпсіз сілтеме тексерісі.
- Қолданылуы: `make web_build_linkcheck OPTS="--locales en|all"`
- Ескертпелер: `tmp_linkcheck_web_pages` ішіне құрастырады; GH Pages `baseUrl` мәнін `/` етіп қайта жазады; қашықтағы HTTP(S) сілтемелерін өткізеді.

#### web_build_local_preview {#mt-web_build_local_preview}

- Мақсаты: қосымша тесттер/сілтеме тексерісімен жергілікті gh‑pages превью.
- Қолданылуы: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Мінез‑құлық: алдымен Node превью серверін байқап көреді (`scripts/preview-server.mjs`, `/__stop` қолдайды), `python3 -m http.server` нұсқасына ауысады; 8080–8090 порттарында қызмет етеді; PID `web-local-preview/.server.pid` ішінде.

#### web_push_github {#mt-web_push_github}

- Мақсаты: `website/build` элементін `gh-pages` тармағына push жасау.
- Қолданылуы: `make web_push_github`

Кеңес: Makefile қолданатын пакет менеджерін алмастыру үшін `NPM=…` орнатыңыз (әдепкіде `npm`).
