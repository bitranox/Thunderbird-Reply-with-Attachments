---
id: development
title: Разработка
sidebar_label: Разработка
---

## Руководство по разработке

### Предварительные требования

- Node.js 18+ и npm
- Thunderbird 128 ESR или новее (для ручного тестирования)

### Структура проекта (высокоуровнево)

- Корень: скрипт упаковки `distribution_zip_packer.sh`, документация, скриншоты
- `sources/`: основной код дополнения (фон, UI опций/попапа, манифесты, иконки)
- `tests/`: набор Vitest
- `website/`: документация Docusaurus (i18n в `website/i18n/de/...`)

### Установка и инструменты

- Установка зависимостей в корне: `npm ci`
- Документация (опц.): `cd website && npm ci`
- Обзор целей: `make help`

### Сборка и упаковка

- Сборка ZIP: `make pack`
  - Создаёт ZIP‑файлы ATN и LOCAL в корне репо (не редактируйте артефакты вручную)
  - Совет: перед упаковкой обновите версию в `sources/manifest_ATN.json` и `sources/manifest_LOCAL.json`
- Ручная установка (dev): Thunderbird → Инструменты → Дополнения и темы → шестерёнка → Установить дополнение из файла… → выбрать собранный ZIP

### Тестирование

- Полный набор: `make test` (Vitest)
- Покрытие (опц.):
  - `npm i -D @vitest/coverage-v8`
  - Запустите `make test`; откройте `coverage/index.html` для отчёта HTML
- Только i18n: `make test-i18n` (паритет, плейсхолдеры, заголовки)

### Отладка и журналы

- Консоль ошибок: Инструменты → Инструменты разработчика → Консоль ошибок
- Переключение подробных логов во время работы:
  - Включить: `messenger.storage.local.set({ debug: true })`
  - Выключить: `messenger.storage.local.set({ debug: false })`
- Логи появляются при наборе/отправке ответов

### Документы (сайт)

- Dev‑сервер: `cd website && npm run start`
- Сборка статического сайта: `cd website && npm run build`
- i18n: английский в `website/docs/*.md`; немецкий в `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Поиск: если в CI заданы переменные Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), используется Algolia; иначе — локальный поиск. На главной странице нажмите `/` или `Ctrl+K`.

### Безопасность и конфигурация

- Не коммитьте `sources/manifest.json` (временно создаётся сборкой)
- Держите `browser_specific_settings.gecko.id` стабильным для сохранения канала обновлений

### Устранение неполадок

- Убедитесь, что Thunderbird — 128 ESR или новее
- Используйте Консоль ошибок для проблем времени выполнения

### CI и покрытие

- GitHub Actions (`CI — Tests`) запускает vitest с порогами покрытия (85% строк/функций/ветвлений/инструкций). Если не достигнуты, задача падает.
- Workflow загружает артефакт `coverage-html` с HTML‑отчётом; скачайте с страницы запуска (Actions → последний запуск → Artifacts).

### Вклад

- См. CONTRIBUTING.md для правил по веткам/коммитам/PR
