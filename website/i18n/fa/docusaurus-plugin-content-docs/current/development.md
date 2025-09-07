---
id: development
title: توسعه
sidebar_label: توسعه
---

## راهنمای توسعه

### پیش‌نیازها

- Node.js 18+ و npm
- تاندربرد 128 ESR یا جدیدتر (برای آزمون دستی)

### چیدمان پروژه (سطح کلان)

- Root: اسکریپت بسته‌بندی `distribution_zip_packer.sh`، مستندات، اسکرین‌شات‌ها
- `sources/`: کد اصلی افزونه (background، UI گزینه‌ها/Popup، مانیفست‌ها، آیکن‌ها)
- `tests/`: مجموعه آزمون Vitest
- `website/`: مستندات Docusaurus (i18n زیر `website/i18n/de/...`)

### نصب و ابزارها

- نصب وابستگی‌های Root: `npm ci`
- مستندات (اختیاری): `cd website && npm ci`
- مشاهده اهداف: `make help`

### ساخت و بسته‌بندی

- ساخت ZIP: `make pack`
  - ZIPهای ATN و LOCAL را در ریشه مخزن می‌سازد (آرتیفکت‌ها را دستی ویرایش نکنید)
  - نکته: قبل از بسته‌بندی نسخه را در `sources/manifest_ATN.json` و `sources/manifest_LOCAL.json` به‌روز کنید
- نصب دستی (dev): Thunderbird → Tools → Add‑ons and Themes → چرخ‌دنده → Install Add‑on From File… → ZIP ساخته‌شده را انتخاب کنید

### آزمون

- مجموعه کامل: `make test` (Vitest)
- پوشش (اختیاری):
  - `npm i -D @vitest/coverage-v8`
  - `make test` را اجرا کنید؛ `coverage/index.html` را برای گزارش HTML باز کنید

- فقط i18n: `make test-i18n` (parity, placeholders, titles)

### اشکال‌زدایی و لاگ‌ها

- Error Console: Tools → Developer Tools → Error Console
- تغییر وضعیت لاگ‌های verbose در زمان اجرا:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- لاگ‌ها هنگام نگارش/ارسال پاسخ ظاهر می‌شوند

### مستندات (وب‌سایت)

- سرور توسعه: `cd website && npm run start`
- ساخت سایت ایستا: `cd website && npm run build`
- i18n: انگلیسی در `website/docs/*.md`؛ ترجمه آلمانی در `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- جست‌وجو: اگر متغیرهای محیطی Algolia DocSearch در CI تنظیم شده باشند (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`)، سایت از Algolia استفاده می‌کند؛ در غیر این صورت جست‌وجوی محلی فعال است. در خانه `/` یا `Ctrl+K` را بزنید.

### نکات امنیت و پیکربندی

- `sources/manifest.json` را commit نکنید (در زمان build موقتاً ایجاد می‌شود)
- برای حفظ کانال به‌روزرسانی، `browser_specific_settings.gecko.id` را ثابت نگه دارید

### رفع اشکال

- از تاندربرد 128 ESR یا جدیدتر استفاده کنید
- برای مشکلات زمان اجرا از Error Console کمک بگیرید

### CI و پوشش

- GitHub Actions (`CI — Tests`) vitest را با آستانه‌های پوشش (85% lines/functions/branches/statements) اجرا می‌کند؛ در صورت برآورده نشدن، کار شکست می‌خورد.
- گردش‌کار artifact به نام `coverage-html` با گزارش HTML بارگذاری می‌کند؛ از صفحه اجرا دانلود کنید (Actions → latest run → Artifacts).

### مشارکت

- برای راهنمای شاخه/Commit/PR فایل CONTRIBUTING.md را ببینید
