---
id: development
title: 'Разработка'
sidebar_label: 'Разработка'
---

---

## Руководство по разработке {#development-guide}

:::note Редактируйте только английскую версию; переводы распространяются
Обновляйте документацию **только** в `website/docs` (английский). Переводы в `website/i18n/<locale>/…` генерируются и не должны редактироваться вручную. Используйте задачи перевода (например, `make translate_web_docs_batch`) для обновления локализованного контента.
:::

### Предварительные требования {#prerequisites}

- Node.js 22+ и npm (проверено с Node 22)
- Thunderbird 128 ESR или новее (для ручного тестирования)

---

### Структура проекта (высокоуровневая) {#project-layout-high-level}

- Корень: скрипт упаковки `distribution_zip_packer.sh`, документация, скриншоты
- `sources/`: основной код дополнения (background, UI настроек/попапа, манифесты, иконки)
- `tests/`: набор тестов Vitest
- `website/`: документация Docusaurus (с i18n в `website/i18n/de/...`)

---

### Установка и инструменты {#install-and-tooling}

- Установить зависимости в корне: `npm ci`
- Документация (необязательно): `cd website && npm ci`
- Обзор целей: `make help`

---

### Живая разработка (web‑ext run) {#live-dev-web-ext}

- Быстрый цикл в Firefox Desktop (только смоук‑тесты UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Запуск в Thunderbird (предпочтительно для MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Советы:
- Держите Консоль ошибок Thunderbird открытой (Инструменты → Инструменты разработчика → Консоль ошибок).
- Страницы событий MV3 при простое приостанавливаются; перезагружайте дополнение после изменений кода или позвольте web‑ext выполнять авто‑перезагрузку.
- Некоторые поведения, специфичные для Firefox, отличаются; всегда проверяйте в Thunderbird для паритета API.
- Пути к исполняемым файлам Thunderbird (примеры):
- Linux: `thunderbird` (например, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Изоляция профиля: используйте отдельный профиль Thunderbird для разработки, чтобы не затрагивать вашу повседневную среду.

---

### Цели Make (по алфавиту) {#make-targets-alphabetical}

Makefile стандартизирует типовые процессы разработки. Запускайте `make help` в любое время для краткого описания каждой цели в одну строку.

Подсказка: запуск `make` без указания цели откроет простое меню Whiptail для выбора цели.

| Цель                                                     | Краткое описание в одну строку                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Удалить локальные артефакты сборки/превью (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | Отформатировать, запустить тесты (включая i18n), обновить changelog, сделать коммит и push.   |
| [`eslint`](#mt-eslint)                                   | Запустить ESLint через flat‑конфиг (`npm run -s lint:eslint`).                                |
| [`help`](#mt-help)                                       | Список всех целей с кратким описанием (отсортирован).                                         |
| [`lint`](#mt-lint)                                       | web‑ext lint на `sources/` (временный манифест; игнорирует ZIP; без фатальных ошибок).        |
| [`menu`](#mt-menu)                                       | Интерактивное меню для выбора цели и необязательных аргументов.                               |
| [`pack`](#mt-pack)                                       | Собрать ZIP для ATN и LOCAL (запускает линтер; вызывает скрипт упаковки).                     |
| [`prettier`](#mt-prettier)                               | Отформатировать репозиторий на месте (с записью изменений).                                   |
| [`prettier_check`](#mt-prettier_check)                   | Prettier в режиме проверки (без записи); завершится с ошибкой, если требуется форматирование. |
| [`prettier_write`](#mt-prettier_write)                   | Псевдоним для `prettier`.                                                                     |
| [`test`](#mt-test)                                       | Prettier (запись), ESLint, затем Vitest (coverage, если настроен).                            |
| [`test_i18n`](#mt-test_i18n)                             | Только i18n‑тесты: плейсхолдеры/паритет дополнения + паритет сайта.                           |
| [`translate_app`](#mt-translation-app)                   | Псевдоним для `translation_app`.                                                              |
| [`translation_app`](#mt-translation-app)                 | Перевести строки UI приложения из `sources/_locales/en/messages.json`.                        |
| [`translate_web_docs_batch`](#mt-translation-web)        | Перевести документацию сайта через OpenAI Batch API (предпочтительно).                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Перевести документацию сайта синхронно (наследие, без batch).                                 |
| [`translate_web_index`](#mt-translation_web_index)       | Псевдоним для `translation_web_index`.                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Перевести UI главной/навигации/подвала (`website/i18n/en/code.json → .../<lang>/code.json`).  |
| [`web_build`](#mt-web_build)                             | Собрать сайт документации в `website/build` (поддерживает `--locales` / `BUILD_LOCALES`).     |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Проверка ссылок, безопасная офлайн (пропускает удалённые HTTP[S]).                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Локальный предпросмотр gh‑pages; авто‑сервер на 8080–8090; опционально тесты/проверка ссылок. |
| [`web_push_github`](#mt-web_push_github)                 | Отправить `website/build` в ветку `gh-pages`.                                                 |

Синтаксис для опций

- Используйте `make <command> OPTS="…"` для передачи опций (рекомендуются кавычки). Для каждой цели ниже показаны примеры.

--

-

#### Советы по сборке локалей {#locale-build-tips}

- Собрать подмножество локалей: задайте `BUILD_LOCALES="en de"` или передайте `OPTS="--locales en,de"` целям веб‑сборки.
- Предпросмотр конкретной локали: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Сборка и упаковка {#build-and-package}

- Собрать ZIP: `make pack`
- Создаёт ZIP для ATN и LOCAL в корне репозитория (не редактируйте артефакты вручную)
- Совет: обновите версию и в `sources/manifest_ATN.json`, и в `sources/manifest_LOCAL.json` перед упаковкой
- Ручная установка (dev): Thunderbird → Инструменты → Дополнения и темы → шестерёнка → Установить дополнение из файла… → выберите собранный ZIP

---

### Тестирование {#test}

- Полный набор: `make test` (Vitest)
- Покрытие (необязательно):
- `npm i -D @vitest/coverage-v8`
- Запустите `make test`; откройте `coverage/index.html` для HTML‑отчёта
- Только i18n: `make test_i18n` (UI ключи/плейсхолдеры/заголовки + паритет сайта по локали и документу с проверкой id/title/sidebar_label)

---

### Отладка и логи {#debugging-and-logs}

- Консоль ошибок: Инструменты → Инструменты разработчика → Консоль ошибок
- Переключение подробных логов во время работы:
- Включить: `messenger.storage.local.set({ debug: true })`
- Выключить: `messenger.storage.local.set({ debug: false })`
- Логи появляются при составлении/отправке ответов

---

### Документация (сайт) {#docs-website}

- Dev‑сервер: `cd website && npm run start`
- Сборка статического сайта: `cd website && npm run build`
- Эквиваленты в Make (по алфавиту): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Примеры использования:
- Только EN, пропустить тесты/проверку ссылок, без push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Все локали, с тестами/проверкой ссылок, затем push: `make web_build_local_preview && make web_push_github`
- Перед публикацией запустите офлайн‑безопасную проверку ссылок: `make web_build_linkcheck`.
- i18n: английский — в `website/docs/*.md`; немецкие переводы — в `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Поиск: если переменные окружения Algolia DocSearch заданы в CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайт использует поиск Algolia; иначе — локальный поиск. На главной странице нажмите `/` или `Ctrl+K`, чтобы открыть окно поиска.

---

#### Маршрут перенаправления Donate {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (и `/<locale>/donate`)
- Поведение:
- Если у текущего маршрута есть локаль (например, `/de/donate`), использовать её
- Иначе выбрать наилучшее соответствие из `navigator.languages` относительно настроенных локалей; в противном случае — локаль по умолчанию
- Перенаправляет на:
- `en` → `/docs/donation`
- остальные → `/<locale>/docs/donation`
- Использует `useBaseUrl` для корректной обработки baseUrl
- Включает meta refresh + ссылку `noscript` как запасной вариант

---

---

#### Советы по предпросмотру {#preview-tips}

- Корректно остановить Node‑предпросмотр: откройте `http://localhost:<port>/__stop` (печатается после `Local server started`).
- Если изображения не загружаются в MDX/JSX, используйте `useBaseUrl('/img/...')`, чтобы учитывать `baseUrl` сайта.
- Предпросмотр запускается первым; проверка ссылок выполняется после и не блокирует (битые внешние ссылки не остановят предпросмотр).
- Пример URL предпросмотра: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (печатается после “Local server started”).
- Внешние ссылки при проверке: некоторые сайты (например, addons.thunderbird.net) блокируют автоматических краулеров и могут показывать 403 в проверке ссылок. Предпросмотр всё равно запускается; такие ошибки можно игнорировать.

---

#### Перевод сайта {#translate-website}

Что можно переводить

- Только UI сайта: главная страница, меню навигации, подвал и другие строки интерфейса. Содержимое документации пока остаётся только на английском.

Где редактировать

- Редактируйте `website/i18n/<locale>/code.json` (используйте `en` в качестве примера). Оставляйте плейсхолдеры вроде `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` без изменений.

Сгенерировать или обновить файлы

- Создать недостающие заглушки для всех локалей: `npm --prefix website run i18n:stubs`
- Перезаписать заглушки из английского (после добавления новых строк): `npm --prefix website run i18n:stubs:force`
- Альтернатива для одной локали: `npx --prefix website docusaurus write-translations --locale <locale>`

Перевести строки UI главной/навигации/подвала (OpenAI)

- Настройте учётные данные один раз (shell или .env):
- `export OPENAI_API_KEY=sk-...`
- Необязательно: `export OPENAI_MODEL=gpt-4o-mini`
- Разовый запуск (все локали, кроме en): `make translate_web_index`
- Ограничить конкретными локалями: `make translate_web_index OPTS="--locales de,fr"`
- Перезаписать существующие значения: `make translate_web_index OPTS="--force"`

Валидация и повторы

- Скрипт перевода валидирует структуру JSON, сохраняет плейсхолдеры в фигурных скобках и гарантирует неизменность URL.
- При ошибке валидации выполняет повторы с обратной связью до 2 раз, затем сохраняет существующие значения.

Предпросмотр вашей локали

- Dev‑сервер: `npm --prefix website run start`
- Перейдите на `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Отправка

- Откройте PR с отредактированными файлами `code.json`. Сосредоточьтесь на сути изменений и по возможности приложите быстрый скриншот.

---

### Советы по безопасности и настройке {#security-and-configuration-tips}

- Не коммитьте `sources/manifest.json` (временно создаётся сборкой)
- Держите `browser_specific_settings.gecko.id` стабильным, чтобы сохранить канал обновлений

---

### Сохранение настроек {#settings-persistence}

- Хранилище: все пользовательские настройки находятся в `storage.local` и сохраняются при обновлениях дополнения.
- Установка: значения по умолчанию применяются только когда ключ строго отсутствует (undefined).
- Обновление: миграция заполняет только отсутствующие ключи; существующие значения никогда не перезаписываются.
- Маркер схемы: `settingsVersion` (сейчас `1`).
- Ключи и значения по умолчанию:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: см. `sources/background.js` → `initializeOrMigrateSettings()` и `SCHEMA_VERSION`.

Процесс разработки (добавление нового параметра)

- Поднимите `SCHEMA_VERSION` в `sources/background.js`.
- Добавьте новый ключ + значение по умолчанию в объект `DEFAULTS` в `initializeOrMigrateSettings()`.
- Применяйте правило «только если undefined» при засеивании значений по умолчанию; не перезаписывайте существующие значения.
- Если настройка видима пользователю, подключите её в `sources/options.js` и добавьте локализованные строки.
- Добавьте/подправьте тесты (см. `tests/background.settings.migration.test.js`).

Советы по ручному тестированию

- Смоделируйте чистую установку: очистите каталог данных расширения или начните с нового профиля.
- Смоделируйте обновление: установите `settingsVersion` в `0` в `storage.local` и перезагрузите; убедитесь, что существующие значения остались без изменений и добавлены только отсутствующие ключи.

---

### Устранение неполадок {#troubleshooting}

- Убедитесь, что Thunderbird версии 128 ESR или новее
- Используйте Консоль ошибок для проблем времени выполнения
- Если сохранённые настройки, кажется, не применяются, перезапустите Thunderbird и попробуйте снова. (Thunderbird может кэшировать состояние между сессиями; перезапуск гарантирует загрузку свежих настроек.)

---

### CI и покрытие {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) запускает vitest с порогами покрытия (85% строк/функций/ветвлений/операторов). Если пороги не достигнуты, задача завершается с ошибкой.
- Воркфлоу загружает артефакт `coverage-html` с HTML‑отчётом; загрузите его со страницы запуска (Actions → последний запуск → Artifacts).

---

### Вклад {#contributing}

- См. CONTRIBUTING.md для правил веток/коммитов/PR
- Совет: создайте отдельный профиль разработки Thunderbird для тестирования, чтобы не затрагивать ваш повседневный профиль.

---

### Переводы

- Запуск больших заданий перевода «всё → всё» может быть медленным и дорогим. Начните с подмножества (например, несколько документов и 1–2 локали), проверьте результат, затем расширяйте.

---

- Политика повторных попыток: задания перевода выполняют до 3 повторов с экспоненциальной задержкой при ошибках API; см. `scripts/translate_web_docs_batch.js` и `scripts/translate_web_docs_sync.js`.

Скриншоты для документации

- Храните изображения в `website/static/img/`.
- Ссылайтесь на них в MD/MDX через `useBaseUrl('/img/<filename>')`, чтобы пути работали с `baseUrl` сайта.
- После добавления или переименования изображений в `website/static/img/` убедитесь, что все ссылки по‑прежнему используют `useBaseUrl('/img/…')` и отображаются в локальном предпросмотре.
  Фавиконки

- Многоразмерный `favicon.ico` генерируется автоматически во всех путях сборки (Make + скрипты) через `website/scripts/build-favicon.mjs`.
- Дополнительных ручных действий не требуется; достаточно обновить `icon-*.png`.
  Совет по проверке

- Оставляйте фронт‑маттер `id` без изменений в переведённых документах; переводите только `title` и `sidebar_label`, если они есть.

#### clean {#mt-clean}

- Назначение: удалить локальные артефакты сборки/предпросмотра.
- Использование: `make clean`
- Удаляет (если есть):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Назначение: форматирование, тесты, обновление changelog, коммит и push.
- Использование: `make commit`
- Подробности: запускает Prettier (запись), `make test`, `make test_i18n`; дополняет changelog при наличии проиндексированных изменений; отправляет в `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Назначение: запустить ESLint через flat‑конфиг.
- Использование: `make eslint`

---

#### help {#mt-help}

- Назначение: вывести все цели с краткими описаниями.
- Использование: `make help`

---

#### lint {#mt-lint}

- Назначение: линтить MailExtension с помощью `web-ext`.
- Использование: `make lint`
- Примечания: временно копирует `sources/manifest_LOCAL.json` → `sources/manifest.json`; игнорирует собранные ZIP; предупреждения не валят пайплайн.

---

#### menu {#mt-menu}

- Назначение: интерактивное меню для выбора цели Make и необязательных аргументов.
- Использование: запустите `make` без аргументов.
- Примечания: если `whiptail` недоступен, меню переключится на `make help`.

---

#### pack {#mt-pack}

- Назначение: собрать ZIP для ATN и LOCAL (зависит от `lint`).
- Использование: `make pack`
- Совет: перед упаковкой поднимите версии в обоих `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- Назначение: отформатировать репозиторий на месте.
- Использование: `make prettier`

#### prettier_check {#mt-prettier_check}

- Назначение: проверить форматирование (без записи).
- Использование: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Назначение: псевдоним для `prettier`.
- Использование: `make prettier_write`

---

#### test {#mt-test}

- Назначение: запустить Prettier (запись), ESLint, затем Vitest (coverage, если установлен).
- Использование: `make test`

#### test_i18n {#mt-test_i18n}

- Назначение: i18n‑ориентированные тесты для строк дополнения и документации сайта.
- Использование: `make test_i18n`
- Запускает: `npm run test:i18n` и `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Назначение: переводить строки UI дополнения из EN в другие локали.
- Использование: `make translation_app OPTS="--locales all|de,fr"`
- Примечания: сохраняет структуру ключей и плейсхолдеры; пишет логи в `translation_app.log`. Вариант скрипта: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Назначение: переводить документацию сайта из `website/docs/*.md` в `website/i18n/<locale>/...`.
- Предпочтительно: `translate_web_docs_batch` (OpenAI Batch API)
  - Использование (флаги): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Устаревший позиционный синтаксис также поддерживается: `OPTS="<doc|all> <lang|all>"`
- Поведение: собирает JSONL, загружает, опрашивает каждые 30 с, скачивает результаты, записывает файлы.
- Примечание: batch‑задача может занимать до 24 часов (по окну batch OpenAI). Консоль показывает прошедшее время при каждом опросе.
- Окружение: `OPENAI_API_KEY` (обязательно), опционально `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (по умолчанию 24 ч), `BATCH_POLL_INTERVAL_MS`.
- Наследие: `translate_web_docs_sync`
  - Использование (флаги): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Устаревший позиционный синтаксис также поддерживается: `OPTS="<doc|all> <lang|all>"`
- Поведение: синхронные запросы по каждой паре (без batch‑агрегации).
- Примечания: интерактивные подсказки при пропуске `OPTS`. Оба режима сохраняют блоки кода/инлайн‑код и оставляют фронт‑маттер `id` без изменений; пишут логи в `translation_web_batch.log` (batch) или `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Назначение: переводить строки UI сайта (главная, навигация, подвал) из `website/i18n/en/code.json` во все локали в `website/i18n/<locale>/code.json` (кроме `en`).
- Использование: `make translate_web_index` или `make translate_web_index OPTS="--locales de,fr [--force]"`
- Требования: экспортируйте `OPENAI_API_KEY` (необязательно: `OPENAI_MODEL=gpt-4o-mini`).
- Поведение: валидирует структуру JSON, сохраняет плейсхолдеры в фигурных скобках, оставляет URL без изменений и выполняет повторы с обратной связью при ошибках валидации.

---

#### web_build {#mt-web_build}

- Назначение: собрать сайт документации в `website/build`.
- Использование: `make web_build OPTS="--locales en|de,en|all"` (или задайте `BUILD_LOCALES="en de"`)
- Внутренности: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Зависимости: запускает `npm ci` в `website/` только если отсутствует `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Назначение: офлайн‑безопасная проверка ссылок.
- Использование: `make web_build_linkcheck OPTS="--locales en|all"`
- Примечания: собирает в `tmp_linkcheck_web_pages`; переписывает `baseUrl` GH Pages в `/`; пропускает удалённые HTTP(S) ссылки.

#### web_build_local_preview {#mt-web_build_local_preview}

- Назначение: локальный предпросмотр gh‑pages с опциональными тестами/проверкой ссылок.
- Использование: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Поведение: сперва пытается запустить Node‑сервер предпросмотра (`scripts/preview-server.mjs`, поддерживает `/__stop`), при неудаче переходит на `python3 -m http.server`; обслуживает на 8080–8090; PID в `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Назначение: отправить `website/build` в ветку `gh-pages`.
- Использование: `make web_push_github`

Совет: задайте `NPM=…` для переопределения менеджера пакетов, используемого в Makefile (по умолчанию `npm`).
