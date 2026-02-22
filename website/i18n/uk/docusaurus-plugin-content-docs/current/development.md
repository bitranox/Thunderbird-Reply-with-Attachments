---
id: development
title: 'Розробка'
sidebar_label: 'Розробка'
---

---

## Керівництво з розробки {#development-guide}

:::note Редагуйте лише англійську; переклади оновляться автоматично
Оновлюйте документацію лише в `website/docs` (англійською). Переклади в `website/i18n/<locale>/…` генеруються і не повинні редагуватися вручну. Скористайтеся завданнями перекладу (напр., `make translate_web_docs_batch`) для оновлення локалізованого вмісту.
:::

### Необхідні умови {#prerequisites}

- Node.js 22+ і npm (перевірено з Node 22)
- Thunderbird 128 ESR або новіший (для ручного тестування)

---

### Структура проєкту (на високому рівні) {#project-layout-high-level}

- Корінь: скрипт пакування `distribution_zip_packer.sh`, документація, знімки екрана
- `sources/`: основний код додатка (фон, UI налаштувань/спливаючого вікна, маніфести, іконки)
- `tests/`: набір тестів Vitest
- `website/`: документація Docusaurus (з i18n у `website/i18n/de/...`)

---

### Встановлення та інструменти {#install-and-tooling}

- Встановити залежності в корені: `npm ci`
- Документація (необов’язково): `cd website && npm ci`
- Переглянути цілі: `make help`

---

### Живе розроблення (web‑ext run) {#live-dev-web-ext}

- Швидкий цикл у Firefox Desktop (лише базові UI‑тести):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Запуск у Thunderbird (бажано для MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Поради:
- Тримайте Консоль помилок Thunderbird відкритою (Інструменти → Інструменти розробника → Консоль помилок).
- Сторінки подій MV3 призупиняються в простої; перезавантажуйте додаток після змін у коді або дозвольте web‑ext авто‑перезавантаження.
- Деяка поведінка, специфічна для Firefox, відрізняється; завжди перевіряйте в Thunderbird на відповідність API.
- Шляхи до бінарника Thunderbird (приклади):
- Linux: `thunderbird` (напр., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ізоляція профілю: використовуйте окремий профіль Thunderbird для розробки, щоб не впливати на щоденне середовище.

---

### Цілі Make (за абеткою) {#make-targets-alphabetical}

Makefile уніфікує типові робочі процеси розробки. Запускайте `make help` у будь‑який час, щоб отримати однорядковий опис кожної цілі.

Порада: запуск `make` без цілі відкриває просте меню Whiptail для вибору цілі.

| Ціль                                                     | Однорядковий опис                                                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Вилучити локальні артефакти збірки/перегляду (tmp/, web-local-preview/, website/build/).                 |
| [`commit`](#mt-commit)                                   | Форматувати, запустити тести (вкл. i18n), оновити changelog, зробити commit і push.                      |
| [`eslint`](#mt-eslint)                                   | Запустити ESLint через flat‑конфіг (`npm run -s lint:eslint`).                                           |
| [`help`](#mt-help)                                       | Список усіх цілей з однорядковими описами (відсортовано).                                                |
| [`lint`](#mt-lint)                                       | web‑ext lint на `sources/` (тимчасовий маніфест; ігнорує ZIP‑архіви; нефатальний).                       |
| [`menu`](#mt-menu)                                       | Інтерактивне меню для вибору цілі та необов’язкових аргументів.                                          |
| [`pack`](#mt-pack)                                       | Зібрати ATN і LOCAL ZIP’и (запускає лінтер; викликає скрипт пакування).                                  |
| [`prettier`](#mt-prettier)                               | Форматувати репозиторій на місці (записує зміни).                                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier у режимі перевірки (без запису); падає, якщо потрібне переформатування.                         |
| [`prettier_write`](#mt-prettier_write)                   | Псевдонім для `prettier`.                                                                                |
| [`test`](#mt-test)                                       | Prettier (запис), ESLint, потім Vitest (покриття, якщо налаштовано).                                     |
| [`test_i18n`](#mt-test_i18n)                             | Тести лише i18n: плейсхолдери/паритет у додатку + паритет сайту.                                         |
| [`translate_app`](#mt-translation-app)                   | Псевдонім для `translation_app`.                                                                         |
| [`translation_app`](#mt-translation-app)                 | Перекласти рядки UI застосунку з `sources/_locales/en/messages.json`.                                    |
| [`translate_web_docs_batch`](#mt-translation-web)        | Перекласти документацію сайту через OpenAI Batch API (бажано).                                           |
| [`translate_web_docs_sync`](#mt-translation-web)         | Перекласти документацію сайту синхронно (застарілий, не batch).                                          |
| [`translate_web_index`](#mt-translation_web_index)       | Псевдонім для `translation_web_index`.                                                                   |
| [`translation_web_index`](#mt-translation_web_index)     | Перекласти UI домашньої/навігації/футера (`website/i18n/en/code.json → .../<lang>/code.json`).           |
| [`web_build`](#mt-web_build)                             | Зібрати документацію до `website/build` (підтримує `--locales` / `BUILD_LOCALES`).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Перевірка посилань, безпечна офлайн (пропускає віддалені HTTP[S]).                                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Локальний попередній перегляд gh‑pages; автосервер на 8080–8090; необов’язкові тести/перевірка посилань. |
| [`web_push_github`](#mt-web_push_github)                 | Надіслати `website/build` у гілку `gh-pages`.                                                            |

Синтаксис параметрів

- Використовуйте `make <command> OPTS="…"` для передавання опцій (рекомендовано в лапках). Нижче для кожної цілі наведено приклади використання.

--

-

#### Поради щодо збірки локалей {#locale-build-tips}

- Збирати підмножину локалей: встановіть `BUILD_LOCALES="en de"` або передайте `OPTS="--locales en,de"` до веб‑цілей.
- Перегляд конкретної локалі: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Збірка й пакування {#build-and-package}

- Збірка ZIP’ів: `make pack`
- Створює ATN і LOCAL ZIP’и в корені репозиторію (не редагуйте артефакти вручну)
- Порада: оновіть версію і в `sources/manifest_ATN.json`, і в `sources/manifest_LOCAL.json` перед пакуванням
- Ручне встановлення (dev): Thunderbird → Tools → Add‑ons and Themes → шестерня → Install Add‑on From File… → виберіть зібраний ZIP

---

### Тестування {#test}

- Повний набір: `make test` (Vitest)
- Покриття (необов’язково):
- `npm i -D @vitest/coverage-v8`
- Запустіть `make test`; відкрийте `coverage/index.html` для HTML‑звіту
- Лише i18n: `make test_i18n` (ключі/плейсхолдери/заголовки UI + паритет сайту по кожній локалі та документу з перевірками id/title/sidebar_label)

---

### Налагодження та логи {#debugging-and-logs}

- Консоль помилок: Tools → Developer Tools → Error Console
- Перемикання детальних логів під час роботи:
- Увімкнути: `messenger.storage.local.set({ debug: true })`
- Вимкнути: `messenger.storage.local.set({ debug: false })`
- Логи з’являються під час створення/надсилання відповідей

---

### Документація (вебсайт) {#docs-website}

- Dev‑сервер: `cd website && npm run start`
- Збірка статичного сайту: `cd website && npm run build`
- Еквіваленти Make (за абеткою): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Приклади використання:
- Лише EN, пропустити тести/перевірку посилань, без push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Усі локалі, з тестами/перевіркою посилань, потім push: `make web_build_local_preview && make web_push_github`
- Перед публікацією запустіть перевірку посилань, безпечну офлайн: `make web_build_linkcheck`.
- i18n: англійська в `website/docs/*.md`; німецькі переклади в `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Пошук: якщо змінні середовища Algolia DocSearch задані в CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайт використовує пошук Algolia; інакше відбувається відкат до локального пошуку. На головній сторінці натисніть `/` або `Ctrl+K`, щоб відкрити пошук.

---

#### Маршрут редиректу для Donate {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (та `/<locale>/donate`)
- Поведінка:
- Якщо поточний маршрут має локаль (напр., `/de/donate`), використати її
- Інакше вибрати найкращу відповідність із `navigator.languages` порівняно з налаштованими локалями; за замовчуванням — локаль за промовчанням
- Перенаправляє на:
- `en` → `/docs/donation`
- інші → `/<locale>/docs/donation`
- Використовує `useBaseUrl` для коректної обробки baseUrl
- Включає meta refresh + посилання `noscript` як запасний варіант

---

---

#### Поради з попереднього перегляду {#preview-tips}

- Акуратно зупинити Node‑прев’ю: відкрийте `http://localhost:<port>/__stop` (виводиться після `Local server started`).
- Якщо зображення не завантажуються в MDX/JSX, використайте `useBaseUrl('/img/...')`, щоб дотримуватися `baseUrl` сайту.
- Попередній перегляд стартує першим; перевірка посилань запускається згодом і не блокує (зламані зовнішні посилання не зупиняють прев’ю).
- Приклад URL прев’ю: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (виводиться після “Local server started”).
- Зовнішні посилання у перевірці: деякі сайти (напр., addons.thunderbird.net) блокують автоматизованих краулерів і можуть показувати 403 у перевірці посилань. Перегляд усе одно стартує; ці помилки можна ігнорувати.

---

#### Переклад сайту {#translate-website}

Що можна перекладати

- Лише UI сайту: головна сторінка, навігація, футер та інші рядки інтерфейсу. Вміст документації наразі лишається лише англійською.

Де редагувати

- Редагуйте `website/i18n/<locale>/code.json` (використовуйте `en` як приклад). Залишайте плейсхолдери `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` без змін.

Генерація або оновлення файлів

- Створити відсутні шаблони для всіх локалей: `npm --prefix website run i18n:stubs`
- Перезаписати шаблони з англійської (після додавання нових рядків): `npm --prefix website run i18n:stubs:force`
- Альтернатива для однієї локалі: `npx --prefix website docusaurus write-translations --locale <locale>`

Переклад рядків UI домашньої/навігації/футера (OpenAI)

- Одноразово задати облікові дані (shell або .env):
- `export OPENAI_API_KEY=sk-...`
- Необов’язково: `export OPENAI_MODEL=gpt-4o-mini`
- Один запуск (усі локалі, крім en): `make translate_web_index`
- Обмежити конкретними локалями: `make translate_web_index OPTS="--locales de,fr"`
- Перезаписати наявні значення: `make translate_web_index OPTS="--force"`

Валідація та повтори

- Скрипт перекладу перевіряє форму JSON, зберігає плейсхолдери у фігурних дужках і гарантує незмінність URL.
- У разі помилки валідації він робить до 2 повторів із фідбеком, перш ніж залишити наявні значення.

Перегляд вашої локалі

- Dev‑сервер: `npm --prefix website run start`
- Перейдіть на `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Надсилання

- Відкрийте PR з відредагованим(и) файлом(ами) `code.json`. Тримайте зміни сфокусованими й за можливості додайте швидкий скріншот.

---

### Поради з безпеки та конфігурації {#security-and-configuration-tips}

- Не комітьте `sources/manifest.json` (створюється тимчасово під час збірки)
- Тримайте `browser_specific_settings.gecko.id` стабільним, щоб зберегти канал оновлень

---

### Збереження налаштувань {#settings-persistence}

- Сховище: усі користувацькі налаштування зберігаються в `storage.local` і переживають оновлення додатка.
- Встановлення: значення за замовчуванням застосовуються лише коли ключ суворо відсутній (undefined).
- Оновлення: міграція заповнює лише відсутні ключі; наявні значення ніколи не перезаписуються.
- Маркер схеми: `settingsVersion` (зараз `1`).
- Ключі та значення за замовчуванням:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: див. `sources/background.js` → `initializeOrMigrateSettings()` та `SCHEMA_VERSION`.

Робочий процес для розробника (додавання нового налаштування)

- Збільшіть `SCHEMA_VERSION` у `sources/background.js`.
- Додайте новий ключ + значення за замовчуванням до об’єкта `DEFAULTS` у `initializeOrMigrateSettings()`.
- Використовуйте правило “лише‑якщо‑undefined” під час ініціалізації дефолтів; не перезаписуйте наявні значення.
- Якщо налаштування видиме користувачу, підключіть його в `sources/options.js` і додайте локалізовані рядки.
- Додайте/скоригуйте тести (див. `tests/background.settings.migration.test.js`).

Поради для ручного тестування

- Імітація свіжого встановлення: очистіть каталог даних розширення або запустіть із новим профілем.
- Імітація оновлення: встановіть `settingsVersion` у `0` у `storage.local` і перезавантажте; переконайтеся, що наявні значення лишилися незмінними, а додані лише відсутні ключі.

---

### Усунення несправностей {#troubleshooting}

- Переконайтеся, що Thunderbird 128 ESR або новіший
- Використовуйте Консоль помилок для проблем під час виконання
- Якщо збережені налаштування начебто не застосовуються, перезапустіть Thunderbird і спробуйте ще раз. (Thunderbird може кешувати стан між сесіями; перезапуск гарантує завантаження свіжих налаштувань.)

---

### CI та покриття {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) запускає vitest із порогами покриття (85% рядків/функцій/гілок/операторів). Якщо пороги не досягнуті, джоба падає.
- Workflow завантажує артефакт `coverage-html` з HTML‑звітами; скачайте його зі сторінки запуску (Actions → останній запуск → Artifacts).

---

### Участь у розробці {#contributing}

- Див. CONTRIBUTING.md для правил щодо гілок/комітів/PR
- Порада: створіть окремий профіль розробника Thunderbird для тестування, щоб не впливати на щоденний профіль.

---

### Переклади

- Запуск великих завдань перекладу “все → все” може бути повільним і дорогим. Почніть із підмножини (напр., кілька документів і 1–2 локалі), перегляньте результат, а потім розширюйте.

---

- Політика повторів: завдання перекладу виконують до 3 повторів із експоненційною затримкою при помилках API; див. `scripts/translate_web_docs_batch.js` і `scripts/translate_web_docs_sync.js`.

Знімки екрана для документації

- Зберігайте зображення в `website/static/img/`.
- Посилайтеся на них у MD/MDX через `useBaseUrl('/img/<filename>')`, щоб шляхи працювали з `baseUrl` сайту.
- Після додавання або перейменування зображень у `website/static/img/` переконайтеся, що всі посилання й далі використовують `useBaseUrl('/img/…')` і відображаються в локальному перегляді.
  Фавікони

- Багаторозмірний `favicon.ico` генерується автоматично в усіх шляхах збірки (Make + скрипти) через `website/scripts/build-favicon.mjs`.
- Жодних ручних дій не потрібно; достатньо оновити `icon-*.png`.
  Порада з рев’ю

- Залишайте фронт‑матер `id` без змін у перекладених документах; перекладайте лише `title` і `sidebar_label`, якщо вони присутні.

#### clean {#mt-clean}

- Призначення: видалити локальні артефакти збірки/перегляду.
- Використання: `make clean`
- Видаляє (якщо існують):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Призначення: форматувати, тестувати, оновити changelog, зробити commit і push.
- Використання: `make commit`
- Подробиці: запускає Prettier (запис), `make test`, `make test_i18n`; дописує changelog, коли є проіндексовані зміни; виконує push у `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Призначення: запуск ESLint через flat‑конфіг.
- Використання: `make eslint`

---

#### help {#mt-help}

- Призначення: список усіх цілей з однорядковими описами.
- Використання: `make help`

---

#### lint {#mt-lint}

- Призначення: лінтити MailExtension за допомогою `web-ext`.
- Використання: `make lint`
- Нотатки: тимчасово копіює `sources/manifest_LOCAL.json` → `sources/manifest.json`; ігнорує зібрані ZIP’и; попередження не ламають конвеєр.

---

#### menu {#mt-menu}

- Призначення: інтерактивне меню для вибору цілі Make і необов’язкових аргументів.
- Використання: запустіть `make` без аргументів.
- Нотатки: якщо `whiptail` недоступний, меню переходить на `make help`.

---

#### pack {#mt-pack}

- Призначення: зібрати ATN і LOCAL ZIP’и (залежить від `lint`).
- Використання: `make pack`
- Порада: підніміть версії в обох `sources/manifest_*.json` перед пакуванням.

---

#### prettier {#mt-prettier}

- Призначення: форматувати репозиторій на місці.
- Використання: `make prettier`

#### prettier_check {#mt-prettier_check}

- Призначення: перевірити форматування (без запису).
- Використання: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Призначення: псевдонім для `prettier`.
- Використання: `make prettier_write`

---

#### test {#mt-test}

- Призначення: запустити Prettier (запис), ESLint, потім Vitest (покриття, якщо встановлено).
- Використання: `make test`

#### test_i18n {#mt-test_i18n}

- Призначення: тести, сфокусовані на i18n, для рядків додатка і документів сайту.
- Використання: `make test_i18n`
- Запускає: `npm run test:i18n` і `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Призначення: перекласти рядки UI додатка з EN в інші локалі.
- Використання: `make translation_app OPTS="--locales all|de,fr"`
- Нотатки: зберігає структуру ключів і плейсхолдери; логи до `translation_app.log`. Варіант скрипта: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Призначення: перекласти документи сайту з `website/docs/*.md` на `website/i18n/<locale>/...`.
- Бажано: `translate_web_docs_batch` (OpenAI Batch API)
  - Використання (прапорці): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Застарілий позиційний усе ще приймається: `OPTS="<doc|all> <lang|all>"`
- Поведінка: збирає JSONL, завантажує, опитує кожні 30 с, завантажує результати, записує файли.
- Примітка: пакетне завдання може тривати до 24 годин (згідно з вікном batch OpenAI). У консолі показується час, що минув, під час кожного опитування.
- Змінні середовища: `OPENAI_API_KEY` (обов’язково), додатково `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (типово 24h), `BATCH_POLL_INTERVAL_MS`.
- Застарілий: `translate_web_docs_sync`
  - Використання (прапорці): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Застарілий позиційний усе ще приймається: `OPTS="<doc|all> <lang|all>"`
- Поведінка: синхронні запити для кожної пари (без пакетної агрегації).
- Нотатки: інтерактивні підказки, коли `OPTS` пропущено. Обидва режими зберігають блоки/вбудований код і лишають фронт‑матер `id` без змін; логи до `translation_web_batch.log` (batch) або `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Призначення: перекласти рядки UI сайту (домашня, навігація, футер) з `website/i18n/en/code.json` на всі локалі під `website/i18n/<locale>/code.json` (крім `en`).
- Використання: `make translate_web_index` або `make translate_web_index OPTS="--locales de,fr [--force]"`
- Вимоги: експортуйте `OPENAI_API_KEY` (необов’язково: `OPENAI_MODEL=gpt-4o-mini`).
- Поведінка: валідовує структуру JSON, зберігає плейсхолдери у фігурних дужках, лишає URL незмінними та повторює з фідбеком при помилках валідності.

---

#### web_build {#mt-web_build}

- Призначення: зібрати сайт документації до `website/build`.
- Використання: `make web_build OPTS="--locales en|de,en|all"` (або встановіть `BUILD_LOCALES="en de"`)
- Внутрішня робота: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Залежності: запускає `npm ci` у `website/` лише якщо відсутній `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Призначення: перевірка посилань, безпечна офлайн.
- Використання: `make web_build_linkcheck OPTS="--locales en|all"`
- Нотатки: збирає до `tmp_linkcheck_web_pages`; переписує GH Pages `baseUrl` на `/`; пропускає віддалені HTTP(S)‑посилання.

#### web_build_local_preview {#mt-web_build_local_preview}

- Призначення: локальний попередній перегляд gh‑pages з необов’язковими тестами/перевіркою посилань.
- Використання: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Поведінка: спершу пробує Node‑сервер прев’ю (`scripts/preview-server.mjs`, підтримує `/__stop`), повертається до `python3 -m http.server`; обслуговує на 8080–8090; PID у `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Призначення: надіслати `website/build` у гілку `gh-pages`.
- Використання: `make web_push_github`

Порада: встановіть `NPM=…`, щоб перевизначити менеджер пакетів, який використовує Makefile (типово `npm`).

---
