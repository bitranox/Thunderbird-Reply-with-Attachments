---
id: development
title: 'Разработка'
sidebar_label: 'Разработка'
---

---

## Ръководство за разработка {#development-guide}

:::note Редактирайте само английската версия; преводите се разпространяват
Актуализирайте документацията само под `website/docs` (английски). Преводите под `website/i18n/<locale>/…` се генерират и не бива да се редактират ръчно. Използвайте задачите за превод (напр. `make translate_web_docs_batch`) за обновяване на локализираното съдържание.
:::

### Предварителни изисквания {#prerequisites}

- Node.js 22+ и npm (тествано с Node 22)
- Thunderbird 128 ESR или по-нова (за ръчно тестване)

---

### Структура на проекта (на високо ниво) {#project-layout-high-level}

- Главна директория: скрипт за пакетиране `distribution_zip_packer.sh`, документация, екранни снимки
- `sources/`: основен код на добавката (background, UI за опции/изскачащ прозорец, манифести, икони)
- `tests/`: тестов пакет Vitest
- `website/`: документация на Docusaurus (с i18n под `website/i18n/de/...`)

---

### Инсталиране и инструменти {#install-and-tooling}

- Инсталиране на зависимостите в корена: `npm ci`
- Документация (по избор): `cd website && npm ci`
- Преглед на целите: `make help`

---

### Жива разработка (web‑ext run) {#live-dev-web-ext}

- Бърз цикъл във Firefox Desktop (само бързи UI проверки):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Стартиране в Thunderbird (предпочитано за MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Съвети:
- Дръжте отворена конзолата за грешки на Thunderbird (Tools → Developer Tools → Error Console).
- Страниците с MV3 събития се спират при бездействие; презаредете добавката след промени в кода или оставете web‑ext да презарежда автоматично.
- Някои поведения, специфични за Firefox, се различават; винаги проверявайте в Thunderbird за съвместимост на API.
- Пътища до изпълнимия файл на Thunderbird (примери):
- Linux: `thunderbird` (напр. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Изолация на профила: използвайте отделен профил на Thunderbird за разработка, за да не влияете на ежедневната си среда.

---

### Цели в Make (по азбучен ред) {#make-targets-alphabetical}

Makefile стандартизира обичайните процеси на разработка. Стартирайте `make help` по всяко време за едноредово обобщение на всяка цел.

Съвет: пускането на `make` без цел отваря опростено меню Whiptail за избор на цел.

| Цел                                                      | Едноредово описание                                                                                                   |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Премахване на локални артефакти от build/preview (tmp/, web-local-preview/, website/build/).                          |
| [`commit`](#mt-commit)                                   | Форматиране, пускане на тестове (вкл. i18n), обновяване на дневника на промените, commit и push.                      |
| [`eslint`](#mt-eslint)                                   | Стартиране на ESLint чрез flat конфигурация (`npm run -s lint:eslint`).                                               |
| [`help`](#mt-help)                                       | Списък на всички цели с едноредови описания (сортирани).                                                              |
| [`lint`](#mt-lint)                                       | web‑ext lint върху `sources/` (временен manifest; игнорира ZIP файлове; нефатално).                                   |
| [`menu`](#mt-menu)                                       | Интерактивно меню за избор на цел и незадължителни аргументи.                                                         |
| [`pack`](#mt-pack)                                       | Изграждане на ATN и LOCAL ZIP файлове (пуска linter; извиква скрипта за пакетиране).                                  |
| [`prettier`](#mt-prettier)                               | Форматиране на хранилището на място (записва промени).                                                                |
| [`prettier_check`](#mt-prettier_check)                   | Prettier в режим на проверка (без запис); проваля се, ако е нужно преформатиране.                                     |
| [`prettier_write`](#mt-prettier_write)                   | Псевдоним на `prettier`.                                                                                              |
| [`test`](#mt-test)                                       | Prettier (запис), ESLint, после Vitest (покритие, ако е конфигурирано).                                               |
| [`test_i18n`](#mt-test_i18n)                             | Само i18n тестове: плейсхолдъри/паритет на добавката + паритет на уебсайта.                                           |
| [`translate_app`](#mt-translation-app)                   | Псевдоним на `translation_app`.                                                                                       |
| [`translation_app`](#mt-translation-app)                 | Превеждане на UI низове на приложението от `sources/_locales/en/messages.json`.                                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Превеждане на уебсайт документацията чрез OpenAI Batch API (препоръчително).                                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Превеждане на уебсайт документацията синхронно (наследено, небатчово).                                                |
| [`translate_web_index`](#mt-translation_web_index)       | Псевдоним на `translation_web_index`.                                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Превеждане на UI на начална страница/навигация/долен колонтитул (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Изграждане на документацията към `website/build` (поддържа `--locales` / `BUILD_LOCALES`).                            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Проверка на връзки, безопасна офлайн (пропуска отдалечени HTTP[S]).                                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Локален преглед за gh‑pages; автоматично обслужване на 8080–8090; по избор тестове/проверка на връзки.                |
| [`web_push_github`](#mt-web_push_github)                 | Изпращане на `website/build` към клона `gh-pages`.                                                                    |

Синтаксис за опциите

- Използвайте `make <command> OPTS="…"` за подаване на опции (препоръчват се кавички). Всяка цел по-долу показва пример за употреба.

--

-

#### Съвети за изграждане по локали {#locale-build-tips}

- Изграждане на подмножество от локали: задайте `BUILD_LOCALES="en de"` или подайте `OPTS="--locales en,de"` към уеб целите.
- Преглед на конкретна локал: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Сглобяване и пакетиране {#build-and-package}

- Създаване на ZIP файлове: `make pack`
- Създава ATN и LOCAL ZIP файлове в корена на хранилището (не редактирайте артефактите ръчно)
- Съвет: обновете версията и в `sources/manifest_ATN.json`, и в `sources/manifest_LOCAL.json` преди пакетиране
- Ръчна инсталация (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → изберете създадения ZIP

---

### Тестване {#test}

- Пълен набор: `make test` (Vitest)
- Покритие (по избор):
- `npm i -D @vitest/coverage-v8`
- Стартирайте `make test`; отворете `coverage/index.html` за HTML отчет
- Само i18n: `make test_i18n` (UI ключове/плейсхолдъри/заглавия + паритет на уебсайта по локал и по документ с проверки за id/title/sidebar_label)

---

### Отстраняване на грешки и логове {#debugging-and-logs}

- Конзола за грешки: Tools → Developer Tools → Error Console
- Превключване на подробни логове по време на изпълнение:
- Включване: `messenger.storage.local.set({ debug: true })`
- Изключване: `messenger.storage.local.set({ debug: false })`
- Логовете се появяват при създаване/изпращане на отговори

---

### Документация (уебсайт) {#docs-website}

- Dev сървър: `cd website && npm run start`
- Изграждане на статичен сайт: `cd website && npm run build`
- Еквиваленти в Make (по азбучен ред): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Примери за употреба:
- Само EN, без тестове/проверка на връзки, без push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Всички локали, с тестове/проверка на връзки, после push: `make web_build_local_preview && make web_push_github`
- Преди публикуване стартирайте офлайн-безопасната проверка на връзки: `make web_build_linkcheck`.
- i18n: английският е в `website/docs/*.md`; немските преводи – в `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Търсене: Ако променливите на средата за Algolia DocSearch са зададени в CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайтът използва търсене на Algolia; иначе преминава към локално търсене. На началната страница натиснете `/` или `Ctrl+K` за отваряне на полето за търсене.

---

#### Пренасочване за дарения {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (и `/<locale>/donate`)
- Поведение:
- Ако текущият маршрут има локал (напр. `/de/donate`), използвайте него
- Иначе изберете най-доброто съвпадение от `navigator.languages` спрямо конфигурираните локали; при неуспех – към локала по подразбиране
- Пренасочва към:
- `en` → `/docs/donation`
- други → `/<locale>/docs/donation`
- Използва `useBaseUrl` за коректна обработка на baseUrl
- Включва meta refresh + връзка `noscript` като резервен вариант

---

---

#### Съвети за преглед {#preview-tips}

- Спрете прегледа на Node коректно: отворете `http://localhost:<port>/__stop` (отпечатва се след `Local server started`).
- Ако изображенията не се зареждат в MDX/JSX, използвайте `useBaseUrl('/img/...')`, за да се съобрази със `baseUrl` на сайта.
- Прегледът стартира първо; проверката на връзки се пуска след това и не блокира (счупени външни връзки няма да спрат прегледа).
- Примерен URL за преглед: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (отпечатва се след “Local server started”).
- Външни връзки при проверка: Някои външни сайтове (напр. addons.thunderbird.net) блокират автоматизирани ботове и може да показват 403 при проверките. Прегледът все пак стартира; тези съобщения може да се игнорират безопасно.

---

#### Превод на уебсайта {#translate-website}

Какво можете да превеждате

- Само UI на сайта: начална страница, навигация, долен колонтитул и други UI низове. Съдържанието на документацията засега остава само на английски.

Къде да редактирате

- Редактирайте `website/i18n/<locale>/code.json` (използвайте `en` като ориентир). Оставете плейсхолдърите като `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` непроменени.

Генериране или опресняване на файлове

- Създаване на липсващи шаблони за всички локали: `npm --prefix website run i18n:stubs`
- Презапис на шаблони от английски (след добавяне на нови низове): `npm --prefix website run i18n:stubs:force`
- Алтернатива за една локал: `npx --prefix website docusaurus write-translations --locale <locale>`

Превеждане на UI низове за начална/навигация/колонтитул (OpenAI)

- Задайте идентификационните данни веднъж (shell или .env):
- `export OPENAI_API_KEY=sk-...`
- По избор: `export OPENAI_MODEL=gpt-4o-mini`
- Еднократно (всички локали, без en): `make translate_web_index`
- Ограничаване до конкретни локали: `make translate_web_index OPTS="--locales de,fr"`
- Презапис на съществуващи стойности: `make translate_web_index OPTS="--force"`

Валидиране и повторни опити

- Скриптът за превод валидира формата на JSON, запазва плейсхолдърите в извити скоби и гарантира, че URL адресите са непроменени.
- При неуспех на валидирането опитва отново с обратна връзка до 2 пъти, преди да запази съществуващите стойности.

Преглед на вашата локал

- Dev сървър: `npm --prefix website run start`
- Посетете `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Изпращане

- Отворете PR с редактираните файл(ове) `code.json`. Дръжте промените фокусирани и при възможност включете бърз екранен кадър.

---

### Съвети за сигурност и конфигурация {#security-and-configuration-tips}

- Не комитвайте `sources/manifest.json` (създава се временно при build)
- Поддържайте `browser_specific_settings.gecko.id` стабилен, за да запазите канала за обновления

---

### Запазване на настройките {#settings-persistence}

- Съхранение: Всички потребителски настройки са в `storage.local` и се запазват през обновяванията на добавката.
- Инсталиране: Стойностите по подразбиране се прилагат само когато ключ липсва изцяло (undefined).
- Обновяване: Миграцията попълва само липсващите ключове; съществуващи стойности никога не се презаписват.
- Маркер на схемата: `settingsVersion` (понастоящем `1`).
- Ключове и стойности по подразбиране:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: вижте `sources/background.js` → `initializeOrMigrateSettings()` и `SCHEMA_VERSION`.

Процес на разработка (добавяне на нова настройка)

- Увеличете `SCHEMA_VERSION` в `sources/background.js`.
- Добавете новия ключ + стойност по подразбиране към обекта `DEFAULTS` в `initializeOrMigrateSettings()`.
- Използвайте правилото „only-if-undefined“ при инициализиране на стойности по подразбиране; не презаписвайте съществуващите стойности.
- Ако настройката е видима за потребителя, свържете я в `sources/options.js` и добавете локализирани низове.
- Добавете/коригирайте тестове (виж `tests/background.settings.migration.test.js`).

Съвети за ръчно тестване

- Симулирайте чиста инсталация: изчистете директорията с данни на разширението или стартирайте с нов профил.
- Симулирайте обновяване: задайте `settingsVersion` на `0` в `storage.local` и презаредете; потвърдете, че съществуващите стойности остават непроменени и се добавят само липсващите ключове.

---

### Отстраняване на неизправности {#troubleshooting}

- Уверете се, че Thunderbird е 128 ESR или по-нова
- Използвайте конзолата за грешки за проблеми по време на изпълнение
- Ако изглежда, че запазените настройки не се прилагат правилно, рестартирайте Thunderbird и опитайте отново. (Thunderbird може да кешира състояние между сесиите; рестарт гарантира зареждане на актуалните настройки.)

---

### CI и покритие {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) пуска vitest с прагове за покритие (85% редове/функции/клонове/оператори). Ако праговете не са покрити, задачата се проваля.
- Работният процес качва артефакт `coverage-html` с HTML отчета; изтеглете го от страницата на изпълнението (Actions → latest run → Artifacts).

---

### Принос {#contributing}

- Вижте CONTRIBUTING.md за указания за клонове/commits/PR
- Съвет: Създайте отделен профил за разработка в Thunderbird за тестване, за да не влияете на ежедневния си профил.

---

### Преводи

- Стартирането на големи задачи „всички → всички“ за превод може да е бавно и скъпо. Започнете с подмножество (напр. няколко документа и 1–2 локали), прегледайте резултата, после разширете.

---

- Политика за повторни опити: задачите за превод правят до 3 опита с експоненциално изчакване при грешки от API; виж `scripts/translate_web_docs_batch.js` и `scripts/translate_web_docs_sync.js`.

Екранни снимки за документацията

- Съхранявайте изображенията под `website/static/img/`.
- Реферирайте ги в MD/MDX чрез `useBaseUrl('/img/<filename>')`, за да работят пътищата със `baseUrl` на сайта.
- След добавяне или преименуване на изображения под `website/static/img/`, потвърдете, че всички референции все още използват `useBaseUrl('/img/…')` и се визуализират в локален преглед.
  Фавикони

- Многоразмерният `favicon.ico` се генерира автоматично във всички пътища на build (Make + скриптове) чрез `website/scripts/build-favicon.mjs`.
- Не е необходима ръчна стъпка; достатъчно е да обновите `icon-*.png`.
  Съвет за преглед

- Запазете front‑matter `id` непроменен в преведените документи; превеждайте само `title` и `sidebar_label`, когато са налични.

#### clean {#mt-clean}

- Цел: премахване на локални артефакти от build/preview.
- Употреба: `make clean`
- Премахва (ако са налични):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Цел: форматиране, тестване, обновяване на дневника на промените, commit и push.
- Употреба: `make commit`
- Подробности: пуска Prettier (запис), `make test`, `make test_i18n`; дописва дневника на промените при подготвени промени; изпраща към `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Цел: стартиране на ESLint чрез flat конфигурация.
- Употреба: `make eslint`

---

#### help {#mt-help}

- Цел: списък на всички цели с едноредови описания.
- Употреба: `make help`

---

#### lint {#mt-lint}

- Цел: lint на MailExtension с `web-ext`.
- Употреба: `make lint`
- Бележки: временно копира `sources/manifest_LOCAL.json` → `sources/manifest.json`; игнорира готови ZIP файлове; предупрежденията не провалят конвейера.

---

#### menu {#mt-menu}

- Цел: интерактивно меню за избор на цел в Make и незадължителни аргументи.
- Употреба: стартирайте `make` без аргументи.
- Бележки: ако `whiptail` не е наличен, менюто преминава към `make help`.

---

#### pack {#mt-pack}

- Цел: изграждане на ATN и LOCAL ZIP файлове (зависи от `lint`).
- Употреба: `make pack`
- Съвет: повишете версиите и в двата `sources/manifest_*.json` преди пакетиране.

---

#### prettier {#mt-prettier}

- Цел: форматиране на хранилището на място.
- Употреба: `make prettier`

#### prettier_check {#mt-prettier_check}

- Цел: проверка на форматирането (без запис).
- Употреба: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Цел: псевдоним на `prettier`.
- Употреба: `make prettier_write`

---

#### test {#mt-test}

- Цел: пуска Prettier (запис), ESLint, после Vitest (покритие, ако е инсталирано).
- Употреба: `make test`

#### test_i18n {#mt-test_i18n}

- Цел: i18n‑фокусирани тестове за низове на добавката и документация на сайта.
- Употреба: `make test_i18n`
- Стартира: `npm run test:i18n` и `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Цел: превеждане на UI низовете на добавката от EN към други локали.
- Употреба: `make translation_app OPTS="--locales all|de,fr"`
- Бележки: запазва структурата на ключовете и плейсхолдърите; логва в `translation_app.log`. Скриптова форма: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Цел: превеждане на документацията на сайта от `website/docs/*.md` към `website/i18n/<locale>/...`.
- Предпочитано: `translate_web_docs_batch` (OpenAI Batch API)
  - Употреба (флагове): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Наследен позиционен синтаксис също се приема: `OPTS="<doc|all> <lang|all>"`
- Поведение: изгражда JSONL, качва, проверява на всеки 30s, изтегля резултатите, записва файловете.
- Забележка: партидна задача може да отнеме до 24 часа за завършване (според прозореца на OpenAI за batch). Конзолата показва изминалото време при всяка проверка.
- Среда: `OPENAI_API_KEY` (задължителна), по избор `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (по подразбиране 24h), `BATCH_POLL_INTERVAL_MS`.
- Наследено: `translate_web_docs_sync`
  - Употреба (флагове): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Наследен позиционен синтаксис също се приема: `OPTS="<doc|all> <lang|all>"`
- Поведение: синхронни заявки по двойки (без batch агрегиране).
- Бележки: интерактивни подкани при липсващ `OPTS`. И в двата режима се запазват блоковете/вградените откъси с код и front‑matter `id` остава непроменен; логва в `translation_web_batch.log` (batch) или `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Цел: превеждане на UI низове на сайта (начална, навигация, долен колонтитул) от `website/i18n/en/code.json` към всички локали под `website/i18n/<locale>/code.json` (без `en`).
- Употреба: `make translate_web_index` или `make translate_web_index OPTS="--locales de,fr [--force]"`
- Изисквания: експортирайте `OPENAI_API_KEY` (по избор: `OPENAI_MODEL=gpt-4o-mini`).
- Поведение: валидира структурата на JSON, запазва плейсхолдърите в извити скоби, запазва URL адресите непроменени и прави повторни опити с обратна връзка при грешки на валидирането.

---

#### web_build {#mt-web_build}

- Цел: изграждане на сайта с документацията към `website/build`.
- Употреба: `make web_build OPTS="--locales en|de,en|all"` (или задайте `BUILD_LOCALES="en de"`)
- Вътрешности: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Зависимости: стартира `npm ci` в `website/` само ако липсва `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Цел: офлайн-безопасна проверка на връзки.
- Употреба: `make web_build_linkcheck OPTS="--locales en|all"`
- Бележки: изгражда към `tmp_linkcheck_web_pages`; пренаписва GH Pages `baseUrl` към `/`; пропуска отдалечени HTTP(S) връзки.

#### web_build_local_preview {#mt-web_build_local_preview}

- Цел: локален преглед за gh‑pages с по избор тестове/проверка на връзки.
- Употреба: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Поведение: първо пробва Node сървър за преглед (`scripts/preview-server.mjs`, поддържа `/__stop`), при неуспех преминава към `python3 -m http.server`; обслужва на 8080–8090; PID в `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Цел: изпращане на `website/build` към клона `gh-pages`.
- Употреба: `make web_push_github`

Съвет: задайте `NPM=…`, за да замените пакетния мениджър, използван от Makefile (по подразбиране `npm`).

---
