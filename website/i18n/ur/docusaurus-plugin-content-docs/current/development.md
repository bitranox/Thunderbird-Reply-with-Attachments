---
id: development
title: ڈویلپمنٹ
sidebar_label: ڈویلپمنٹ
---

## ڈویلپمنٹ گائیڈ

### سابقہ شرائط

- Node.js 18+ اور npm
- Thunderbird 128 ESR یا نیا (ہاتھ سے ٹیسٹنگ کے لیے)

### پروجیکٹ خاکہ (اعلی سطح)

- Root: پیکجنگ اسکرپٹ `distribution_zip_packer.sh`, ڈاکس، اسکرین شاٹس
- `sources/`: بنیادی ایڈ‑آن کوڈ (background، options/popup UI، manifests، icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus ڈاکس (i18n `website/i18n/de/...` کے تحت)

### انسٹال اور ٹولنگ

- Root ڈیپس انسٹال: `npm ci`
- ڈاکس (اختیاری): `cd website && npm ci`
- ہدف دیکھیں: `make help`

### بلڈ اور پیکیج

- ZIP بنائیں: `make pack`
  - ریپو روٹ میں ATN اور LOCAL ZIP بناتا ہے (آرٹیفیکٹس کو ہاتھ سے ایڈٹ نہ کریں)
  - ٹپ: پیکیجنگ سے پہلے `sources/manifest_ATN.json` اور `sources/manifest_LOCAL.json` میں ورژن اپڈیٹ کریں
- دستی انسٹال (dev): Thunderbird → Tools → Add‑ons and Themes → گیئر → Install Add‑on From File… → بنا ہوا ZIP منتخب کریں

### ٹیسٹ

- مکمل سوئیٹ: `make test` (Vitest)
- کوریج (اختیاری):
  - `npm i -D @vitest/coverage-v8`
  - `make test` چلائیں؛ HTML رپورٹ کے لیے `coverage/index.html` کھولیں
- صرف i18n: `make test-i18n` (parity, placeholders, titles)

### ڈیبگنگ اور لاگز

- Error Console: Tools → Developer Tools → Error Console
- رن ٹائم پر verbose لاگز ٹوگل کریں:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- جواب لکھتے/بھیجتے وقت لاگز نظر آئیں گے

### ڈاکس (ویب سائٹ)

- ڈیو سرور: `cd website && npm run start`
- اسٹاٹک سائٹ بلڈ: `cd website && npm run build`
- i18n: انگریزی `website/docs/*.md`; جرمن ترجمے `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- سرچ: اگر CI میں Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) سیٹ ہوں تو سائٹ Algolia سرچ استعمال کرے گی؛ ورنہ لوکل سرچ پر fallback۔ ہوم پیج پر `/` یا `Ctrl+K` دبائیں۔

### سکیورٹی اور کنفیگریشن نکات

- `sources/manifest.json` کو کمیٹ نہ کریں (بلڈ اسے عارضی طور پر بناتا ہے)
- اپڈیٹ چینل برقرار رکھنے کے لیے `browser_specific_settings.gecko.id` مستحکم رکھیں

### ٹربل شوٹنگ

- Thunderbird 128 ESR یا نیا استعمال کریں
- رن ٹائم مسائل کے لیے Error Console استعمال کریں

### CI اور کوریج

- GitHub Actions (`CI — Tests`) vitest کوریج تھریش ہولڈز (85% lines/functions/branches/statements) کے ساتھ چلاتا ہے؛ پوری نہ ہونے پر جاب ناکام ہو جائے گا۔
- ورک فلو `coverage-html` نامی آرٹیفیکٹ اپلوڈ کرتا ہے؛ رن پیج سے ڈاؤن لوڈ کریں (Actions → latest run → Artifacts)

### حصہ ڈالنا

- برانچ/کمٹ/PR رہنما اصول کے لیے CONTRIBUTING.md دیکھیں
