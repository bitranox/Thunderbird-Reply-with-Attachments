---
id: development
title: 'Распрацоўка'
sidebar_label: 'Распрацоўка'
---

---

## Кіраўніцтва па распрацоўцы {#development-guide}

:::note Рэдагуйце толькі англійскую; пераклады распаўсюджваюцца
Абнаўляйце дакументацыю толькі ў `website/docs` (англійская). Пераклады ў `website/i18n/<locale>/…` генеруюцца і не павінны рэдагавацца ўручную. Выкарыстоўвайце задачы перакладу (напрыклад, `make translate_web_docs_batch`), каб абнавіць лакалізаваны кантэнт.
:::

### Папярэднія патрабаванні {#prerequisites}

- Node.js 22+ і npm (пратэставана з Node 22)
- Thunderbird 128 ESR або навейшы (для ручнога тэставання)

---

### Структура праекта (высокі ўзровень) {#project-layout-high-level}

- Корань: скрыпт упакоўкі `distribution_zip_packer.sh`, дакументацыя, здымкі экрана
- `sources/`: асноўны код дадатку (background, UI опцый/ўсплывальнага акна, маніфесты, значкі)
- `tests/`: набор тэстаў Vitest
- `website/`: дакументацыя Docusaurus (з i18n у `website/i18n/de/...`)

---

### Усталяванне і інструменты {#install-and-tooling}

- Усталюйце залежнасці ў корані: `npm ci`
- Дакументацыя (неабавязкова): `cd website && npm ci`
- Паглядзець мэты: `make help`

---

### Жывая распрацоўка (web‑ext run) {#live-dev-web-ext}

- Хуткі цыкл у Firefox Desktop (толькі smoke‑тэсты UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Запусціць у Thunderbird (пераважна для MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Парады:
- Трымайце адкрытай Кансоль памылак Thunderbird (Tools → Developer Tools → Error Console).
- Старонкі падзей MV3 прыпыняюцца ў стане бяздзеяння; перазагружайце дадатак пасля змен кода або дазвольце web‑ext аўтаматычна перазагружаць.
- Некаторыя паводзіны, уласныя Firefox, адрозніваюцца; заўжды правярайце ў Thunderbird для адпаведнасці API.
- Шляхі да выканальных файлаў Thunderbird (прыклады):
- Linux: `thunderbird` (напрыклад, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ізаляцыя профілю: выкарыстоўвайце асобны профіль Thunderbird для распрацоўкі, каб не закранаць паўсядзённую канфігурацыю.

---

### Мэты Make (па алфавіце) {#make-targets-alphabetical}

Makefile ўніфікуе тыповыя працоўныя плыні распрацоўкі. Запускайце `make help` у любы час, каб атрымаць кароткі апісальны радок для кожнай мэты.

Парада: запуск `make` без мэты адкрывае простае меню Whiptail для выбару мэты.

| Мэта                                                     | Кароткае апісанне ў адзін радок                                                                 |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Выдаліць лакальныя артэфакты зборкі/прагляду (tmp/, web-local-preview/, website/build/).        |
| [`commit`](#mt-commit)                                   | Сфарматаваць, запусціць тэсты (у т.л. i18n), абнавіць changelog, закоміціць і запушыць.         |
| [`eslint`](#mt-eslint)                                   | Запусціць ESLint праз flat‑канфіг (`npm run -s lint:eslint`).                                   |
| [`help`](#mt-help)                                       | Пералічыць усе мэты з кароткай дакументацыяй (упарадкавана).                                    |
| [`lint`](#mt-lint)                                       | web‑ext lint на `sources/` (часовы маніфест; ігнаруе ZIP‑ы; без збою па папярэджаннях).         |
| [`menu`](#mt-menu)                                       | Інтэрактыўнае меню для выбару мэты і неабавязковых аргументаў.                                  |
| [`pack`](#mt-pack)                                       | Збудаваць ZIP‑ы ATN і LOCAL (запускае лінтар; выклікае скрыпт упакоўкі).                        |
| [`prettier`](#mt-prettier)                               | Сфарматаваць рэпазіторый на месцы (з запісам змен).                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier у рэжыме праверкі (без запісу); правальваецца, калі патрэбна перафарматаванне.         |
| [`prettier_write`](#mt-prettier_write)                   | Псеўданім для `prettier`.                                                                       |
| [`test`](#mt-test)                                       | Prettier (запіс), ESLint, потым Vitest (пакрыццё, калі сканфігуравана).                         |
| [`test_i18n`](#mt-test_i18n)                             | Тэсты толькі i18n: плейсхолдары/парнасць дадатку + парнасць сайта.                              |
| [`translate_app`](#mt-translation-app)                   | Псеўданім для `translation_app`.                                                                |
| [`translation_app`](#mt-translation-app)                 | Перакласці радкі UI прыкладання з `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | Перакласці дакументацыю сайта праз OpenAI Batch API (пераважна).                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | Перакласці дакументацыю сайта сінхронна (спадчына, без batch).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | Псеўданім для `translation_web_index`.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Перакласці UI галоўнай/навігацыі/футэра (`website/i18n/en/code.json → .../<lang>/code.json`).   |
| [`web_build`](#mt-web_build)                             | Збудаваць дакі ў `website/build` (падтрымлівае `--locales` / `BUILD_LOCALES`).                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Бяспечная для аўтаномнага рэжыму праверка спасылак (мінае аддаленыя HTTP[S]).                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Лакальны папярэдні прагляд gh‑pages; аўтасэрвіс на 8080–8090; неабавязковыя тэсты/чэк спасылак. |
| [`web_push_github`](#mt-web_push_github)                 | Запушыць `website/build` у галіну `gh-pages`.                                                   |

Syntax for options

- Выкарыстоўвайце `make <command> OPTS="…"` для перадачы параметраў (рэкамендуюцца двукоссі). Кожная мэта ніжэй паказвае прыклад выкарыстання.

--

-

#### Парады па зборцы лакацый {#locale-build-tips}

- Збіраць падмноства лакацый: усталюйце `BUILD_LOCALES="en de"` або перадайце `OPTS="--locales en,de"` вэб‑мэтам.
- Папярэдні прагляд пэўнай лакалі: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Зборка і ўпакоўка {#build-and-package}

- Збудаваць ZIP‑ы: `make pack`
- Стварае ZIP‑ы ATN і LOCAL у корані рэпазіторыя (не рэдагуйце артэфакты ўручную)
- Парада: абновіце версію і ў `sources/manifest_ATN.json`, і ў `sources/manifest_LOCAL.json` перад упакоўкай
- Ручная ўстаноўка (распрацоўка): Thunderbird → Tools → Add‑ons and Themes → шасцярэнька → Install Add‑on From File… → выберыце збудаваны ZIP

---

### Тэсты {#test}

- Поўны набор: `make test` (Vitest)
- Пакрыццё (неабавязкова):
- `npm i -D @vitest/coverage-v8`
- Запусціце `make test`; адкрыйце `coverage/index.html` для HTML‑справаздачы
- Толькі i18n: `make test_i18n` (ключы/плейсхолдары UI/тытулы + парнасць сайта па лакалі і дакуменце з праверкамі id/title/sidebar_label)

---

### Адладка і журналы {#debugging-and-logs}

- Кансолі памылак: Tools → Developer Tools → Error Console
- Пераключэнне падрабязных логаў падчас працы:
- Уключыць: `messenger.storage.local.set({ debug: true })`
- Выключыць: `messenger.storage.local.set({ debug: false })`
- Логі з'яўляюцца падчас напісання/адпраўкі адказаў

---

### Дакументацыя (вэб‑сайт) {#docs-website}

- Сервер распрацоўніка: `cd website && npm run start`
- Збудаваць статычны сайт: `cd website && npm run build`
- Эквіваленты Make (па алфавіце): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Прыклады выкарыстання:
- Толькі EN, без тэстаў/праверкі спасылак, без push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Усе лакалі, з тэстамі/праверкай спасылак, затым push: `make web_build_local_preview && make web_push_github`
- Перад публікацыяй запусціце бяспечную для аўтаномнага рэжыму праверку спасылак: `make web_build_linkcheck`.
- i18n: англійская знаходзіцца ў `website/docs/*.md`; нямецкія пераклады ў `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Пошук: калі зменныя асяроддзя Algolia DocSearch зададзены ў CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайт выкарыстоўвае пошук Algolia; інакш выкарыстоўваецца лакальны пошук. На галоўнай старонцы націсніце `/` або `Ctrl+K`, каб адкрыць поле пошуку.

---

#### Маршрут перанакіравання для ахвяраванняў {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (і `/<locale>/donate`)
- Паводзіны:
- Калі ў бягучым маршруце ўказана лакаль (напрыклад, `/de/donate`), выкарыстоўваць яе
- Інакш абраць найлепшае супадзенне з `navigator.languages` адносна наладжаных лакаляў; па змаўчанні выкарыстоўваць стандартную лакаль
- Перанакіроўвае на:
- `en` → `/docs/donation`
- іншыя → `/<locale>/docs/donation`
- Выкарыстоўвае `useBaseUrl` для карэктнай апрацоўкі baseUrl
- Уключае meta refresh + спасылку `noscript` як рэзервовы варыянт

---

---

#### Парады па праглядзе {#preview-tips}

- Карэктна спыніць папярэдні прагляд Node: адкрыйце `http://localhost:<port>/__stop` (друкуецца пасля `Local server started`).
- Калі выявы не загружаюцца ў MDX/JSX, выкарыстоўвайце `useBaseUrl('/img/...')`, каб улічваць `baseUrl` сайта.
- Папярэдні прагляд запускаецца першым; праверка спасылак ідзе пасля і не блакуе (зламаныя знешнія спасылкі не спыняць прагляд).
- Прыклад URL папярэдняга прагляду: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (друкуецца пасля “Local server started”).
- Знешнія спасылкі ў праверцы: некаторыя знешнія сайты (напрыклад, addons.thunderbird.net) блакуюць аўтаматызаваныя сканеры і могуць вяртаць 403 у праверках спасылак. Папярэдні прагляд усё адно запусціцца; гэта бяспечна ігнараваць.

---

#### Перакласці вэб‑сайт {#translate-website}

Што можна перакладаць

- Толькі UI вэб‑сайта: галоўная старонка, навігацыя, футэр і іншыя радкі UI. Змест дакументаў пакуль застаецца толькі па‑англійску.

Дзе рэдагаваць

- Рэдагуйце `website/i18n/<locale>/code.json` (выкарыстоўвайце `en` як узор). Захоўвайце плейсхолдары накшталт `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` без змен.

Згенераваць або абнавіць файлы

- Стварыць адсутныя загатоўкі для ўсіх лакаляў: `npm --prefix website run i18n:stubs`
- Перазапісаць загатоўкі з англійскай (пасля дадання новых радкоў): `npm --prefix website run i18n:stubs:force`
- Альтэрнатыва для адной лакалі: `npx --prefix website docusaurus write-translations --locale <locale>`

Перакласці радкі UI хатняй/навігацыі/футэра (OpenAI)

- Аднаразова наладзьце ўліковыя даныя (shell або .env):
- `export OPENAI_API_KEY=sk-...`
- Неабавязкова: `export OPENAI_MODEL=gpt-4o-mini`
- Адной аперацыяй (усе лакалі, без en): `make translate_web_index`
- Абмежаваць канкрэтнымі лакалямі: `make translate_web_index OPTS="--locales de,fr"`
- Перазапісаць існуючыя значэнні: `make translate_web_index OPTS="--force"`

Праверкі і паўторы

- Скрыпт перакладу правярае структуру JSON, захоўвае плейсхолдары з фігурнымі дужкамі і гарантуе нязменнасць URL.
- Пры няўдалай праверцы ён паўтарае з улікам водгуку да 2 разоў, пасля чаго пакідае існуючыя значэнні.

Папярэдні прагляд вашай лакалі

- Сервер распрацоўніка: `npm --prefix website run start`
- Наведайце `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Адпраўка

- Адкрыйце PR з адрэдагаванымі файламі `code.json`. Захоўвайце змяненні сфакусаванымі і, па магчымасці, дадайце хуткі скрыншот.

---

### Парады па бяспецы і канфігурацыі {#security-and-configuration-tips}

- Не каміцьце `sources/manifest.json` (часова ствараецца падчас зборкі)
- Падтрымлівайце `browser_specific_settings.gecko.id` стабільным, каб захаваць канал абнаўленняў

---

### Захаванне наладаў {#settings-persistence}

- Сховішча: усе карыстальніцкія налады захоўваюцца ў `storage.local` і перажываюць абнаўленні дадатку.
- Усталяванне: значэнні па змаўчанні прымяняюцца толькі калі ключ сапраўды адсутнічае (undefined).
- Абнаўленне: міграцыя дапаўняе толькі адсутныя ключы; існыя значэнні ніколі не перазапісваюцца.
- Маркер схемы: `settingsVersion` (цяпер `1`).
- Ключы і змаўчанні:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: гл. `sources/background.js` → `initializeOrMigrateSettings()` і `SCHEMA_VERSION`.

Працоўны працэс распрацоўкі (даданне новай налады)

- Падніміце `SCHEMA_VERSION` у `sources/background.js`.
- Дадайце новы ключ + значэнне па змаўчанні ў аб'ект `DEFAULTS` у `initializeOrMigrateSettings()`.
- Выкарыстоўвайце правіла "only-if-undefined" пры пачатковай ініцыялізацыі; не перазапісвайце існыя значэнні.
- Калі налада бачная карыстальнікам, падлучыце яе ў `sources/options.js` і дадайце лакалізаваныя радкі.
- Дадайце/скарэктуйце тэсты (гл. `tests/background.settings.migration.test.js`).

Парады для ручнога тэставання

- Сымулюйце чыстую ўстаноўку: ачысціце каталог даных пашырэння або пачніце з новага профілю.
- Сымулюйце абнаўленне: усталюйце `settingsVersion` у `0` у `storage.local` і перазагрузіце; пераканайцеся, што існыя значэнні не змененыя і дададзены толькі адсутныя ключы.

---

### Пошук праблем {#troubleshooting}

- Пераканайцеся, што Thunderbird 128 ESR або навейшы
- Выкарыстоўвайце Канцоль памылак для праблем падчас выканання
- Калі здаецца, што захаваныя налады не прымяняюцца належным чынам, перазапусціце Thunderbird і паспрабуйце зноў. (Thunderbird можа кэшаваць стан паміж сеансамі; перазапуск забяспечвае загрузку свежых налад.)

---

### CI і пакрыццё {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) запускае vitest з парогамі пакрыцця (85% радкоў/функцый/галінак/аператараў). Калі парогі не дасягнутыя, задача лічыцца няўдалай.
- Працоўны працэс загружае артэфакт `coverage-html` з HTML‑справаздачай; спампуйце яго са старонкі запуску (Actions → апошні запуск → Artifacts).

---

### Удзел {#contributing}

- Глядзіце CONTRIBUTING.md для рэкамендацый па галінах/камітах/PR
- Парада: стварыце асобны профіль распрацоўкі Thunderbird для тэставання, каб не закранаць ваш паўсядзённы профіль.

---

### Пераклады

- Запуск буйных задач перакладу “усё → усё” можа быць павольным і дарагім. Пачніце з падмноства (напрыклад, некалькі дакументаў і 1–2 лакалі), праверце вынік, потым пашырайце.

---

- Палітыка паўтораў: заданні перакладу выконваюць да 3 паўтораў з экспаненцыяльнай затрымкай пры памылках API; гл. `scripts/translate_web_docs_batch.js` і `scripts/translate_web_docs_sync.js`.

Скрыншоты для дакументацыі

- Захоўвайце выявы ў `website/static/img/`.
- Спасылайцеся на іх у MD/MDX праз `useBaseUrl('/img/<filename>')`, каб шляхі працавалі з `baseUrl` сайта.
- Пасля дадання або перайменавання выяў у `website/static/img/` пераканайцеся, што ўсе спасылкі ўсё яшчэ выкарыстоўваюць `useBaseUrl('/img/…')` і карэктна рэндаруюцца ў лакальным праглядзе.
  Значкі сайта (favicons)

- Шматпамерны `favicon.ico` генеруецца аўтаматычна ва ўсіх шляхах зборкі (Make + скрыпты) праз `website/scripts/build-favicon.mjs`.
- Дадатковых ручных крокаў не патрабуецца; дастаткова абнавіць `icon-*.png`.
  Парада па аглядзе

- Пакідайце фронт‑матэр `id` без змен у перакладзеных дакументах; перакладаць трэба толькі `title` і `sidebar_label`, калі яны ёсць.

#### clean {#mt-clean}

- Мэта: выдаліць лакальныя артэфакты зборкі/прагляду.
- Выкарыстанне: `make clean`
- Выдаляе (калі ёсць):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Мэта: фарматаванне, тэсты, абнаўленне changelog, commit і push.
- Выкарыстанне: `make commit`
- Падрабязнасці: запускае Prettier (запіс), `make test`, `make test_i18n`; дадае changelog, калі ёсць заіндэксаваныя змены; пушыць у `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Мэта: запускаць ESLint праз flat‑канфіг.
- Выкарыстанне: `make eslint`

---

#### help {#mt-help}

- Мэта: спіс усіх мэт з кароткімі апісаннямі.
- Выкарыстанне: `make help`

---

#### lint {#mt-lint}

- Мэта: лінт MailExtension з дапамогай `web-ext`.
- Выкарыстанне: `make lint`
- Нататкі: часова капіруе `sources/manifest_LOCAL.json` → `sources/manifest.json`; ігнаруе збудаваныя ZIP‑ы; папярэджанні не правальваюць пайплайн.

---

#### menu {#mt-menu}

- Мэта: інтэрактыўнае меню для выбару мэты Make і неабавязковых аргументаў.
- Выкарыстанне: запусціце `make` без аргументаў.
- Нататкі: калі `whiptail` недаступны, меню пераходзіць на `make help`.

---

#### pack {#mt-pack}

- Мэта: збудаваць ZIP‑ы ATN і LOCAL (залежыць ад `lint`).
- Выкарыстанне: `make pack`
- Парада: падніміце версіі ў абодвух `sources/manifest_*.json` перад упакоўкай.

---

#### prettier {#mt-prettier}

- Мэта: фарматаваць рэпазіторый на месцы.
- Выкарыстанне: `make prettier`

#### prettier_check {#mt-prettier_check}

- Мэта: праверыць фарматаванне (без запісу).
- Выкарыстанне: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Мэта: псеўданім для `prettier`.
- Выкарыстанне: `make prettier_write`

---

#### test {#mt-test}

- Мэта: запусціць Prettier (запіс), ESLint, потым Vitest (пакрыццё, калі ўсталявана).
- Выкарыстанне: `make test`

#### test_i18n {#mt-test_i18n}

- Мэта: тэсты, сфакусаваныя на i18n, для радкоў дадатку і дакументаў сайта.
- Выкарыстанне: `make test_i18n`
- Запускае: `npm run test:i18n` і `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Мэта: перакласці радкі UI дадатку з EN на іншыя лакалі.
- Выкарыстанне: `make translation_app OPTS="--locales all|de,fr"`
- Нататкі: захоўвае структуру ключоў і плейсхолдары; логі ў `translation_app.log`. Скрыпт: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Мэта: перакласці дакі сайта з `website/docs/*.md` у `website/i18n/<locale>/...`.
- Пераважна: `translate_web_docs_batch` (OpenAI Batch API)
  - Выкарыстанне (флагі): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Спадчынны пазіцыйны сінтаксіс таксама прымаецца: `OPTS="<doc|all> <lang|all>"`
- Паводзіны: збірае JSONL, загружае, апытвае кожныя 30 с, спампоўвае вынікі, запісвае файлы.
- Нататка: batch‑заданне можа займаць да 24 гадзін (паводле акна batch у OpenAI). Кансолі паказвае прайшоўшы час на кожным апытванні.
- Асяроддзе: `OPENAI_API_KEY` (абавязкова), неабавязкова `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (па змаўчанні 24h), `BATCH_POLL_INTERVAL_MS`.
- Спадчына: `translate_web_docs_sync`
  - Выкарыстанне (флагі): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Спадчынны пазіцыйны сінтаксіс таксама прымаецца: `OPTS="<doc|all> <lang|all>"`
- Паводзіны: сінхронныя запыты па кожнай пары (без batch‑агрэгацыі).
- Нататкі: інтэрактыўныя падказкі, калі `OPTS` прапушчаны. Абодва рэжымы захоўваюць блокі кода/inline‑код і пакідаюць фронт‑матэр `id` без змен; логі ў `translation_web_batch.log` (batch) або `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Мэта: перакласці радкі UI сайта (галоўная, навігацыя, футэр) з `website/i18n/en/code.json` на ўсе лакалі ў `website/i18n/<locale>/code.json` (акрамя `en`).
- Выкарыстанне: `make translate_web_index` або `make translate_web_index OPTS="--locales de,fr [--force]"`
- Патрабаванні: экспартаваць `OPENAI_API_KEY` (неабавязкова: `OPENAI_MODEL=gpt-4o-mini`).
- Паводзіны: правярае структуру JSON, захоўвае плейсхолдары з фігурнымі дужкамі, пакідае URL без змен, паўтарае з водгукам пры памылках валідацыі.

---

#### web_build {#mt-web_build}

- Мэта: збудаваць сайт дакументаў у `website/build`.
- Выкарыстанне: `make web_build OPTS="--locales en|de,en|all"` (або ўсталяваць `BUILD_LOCALES="en de"`)
- Унутранасці: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Залежнасці: запускае `npm ci` у `website/` толькі калі `website/node_modules/@docusaurus` адсутнічае.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Мэта: бяспечная для аўтаномнага рэжыму праверка спасылак.
- Выкарыстанне: `make web_build_linkcheck OPTS="--locales en|all"`
- Нататкі: збудаванне ў `tmp_linkcheck_web_pages`; перазапісвае GH Pages `baseUrl` у `/`; мінае аддаленыя HTTP(S) спасылкі.

#### web_build_local_preview {#mt-web_build_local_preview}

- Мэта: лакальны папярэдні прагляд gh‑pages з неабавязковымі тэстамі/праверкай спасылак.
- Выкарыстанне: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Паводзіны: спачатку спрабуе сервер папярэдняга прагляду Node (`scripts/preview-server.mjs`, падтрымлівае `/__stop`), затым пераходзіць на `python3 -m http.server`; сэрвіс на 8080–8090; PID у `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Мэта: запушыць `website/build` у галіну `gh-pages`.
- Выкарыстанне: `make web_push_github`

Парада: усталюйце `NPM=…`, каб перазаданне менеджара пакетаў, які выкарыстоўвае Makefile (па змаўчанні `npm`).
