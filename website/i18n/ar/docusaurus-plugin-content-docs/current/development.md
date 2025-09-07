---
id: development
title: التطوير
sidebar_label: التطوير
---

## دليل التطوير

### المتطلبات المسبقة

- ‏Node.js 18+ و npm
- ‏Thunderbird 128 ESR أو أحدث (للاختبار اليدوي)

### بنية المشروع (عالية المستوى)

- الجذر: سكربت التغليف `distribution_zip_packer.sh`، الوثائق، لقطات الشاشة
- `sources/`: كود الإضافة الأساسي (الخلفية، واجهة الخيارات/المنبثقة، ملفات البيان، الأيقونات)
- `tests/`: حزمة اختبارات Vitest
- `website/`: وثائق Docusaurus (الترجمات ضمن `website/i18n/de/...`)

### التثبيت والأدوات

- تثبيت اعتماديات الجذر: `npm ci`
- الوثائق (اختياري): `cd website && npm ci`
- استكشاف الأهداف: `make help`

### البناء والتغليف

- بناء ملفات ZIP: `make pack`
  - يُنتج ملفات ATN و LOCAL في جذر المستودع (لا تُحرِّر المخرجات يدويًا)
  - تلميح: حدّث الإصدار في كلٍ من `sources/manifest_ATN.json` و `sources/manifest_LOCAL.json` قبل التغليف
- تثبيت يدوي (تطوير): Thunderbird → الأدوات → الإضافات والسمات → ترس → تثبيت إضافة من ملف… → اختر ملف ZIP المبني

### الاختبارات

- الحزمة الكاملة: `make test` (Vitest)
- التغطية (اختياري):
  - `npm i -D @vitest/coverage-v8`
  - شغّل `make test`؛ وافتح `coverage/index.html` للتقرير HTML
- i18n فقط: `make test-i18n` (التكافؤ، العناصر النائبة، العناوين)

### التنقيح والسجلات

- وحدة الأخطاء: الأدوات → أدوات المطوّر → وحدة الأخطاء
- تبديل السجلات المفصّلة وقت التشغيل:
  - تفعيل: `messenger.storage.local.set({ debug: true })`
  - تعطيل: `messenger.storage.local.set({ debug: false })`
- تظهر السجلات عند التحرير/الإرسال

### الوثائق (الموقع)

- خادم التطوير: `cd website && npm run start`
- بناء الموقع الساكن: `cd website && npm run build`
- i18n: الإنجليزية في `website/docs/*.md`؛ والألمانية في `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- البحث: إن ضُبطت متغيرات Algolia في CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) يُستخدم بحث Algolia؛ وإلا فالبحث المحلي. في الصفحة الرئيسية اضغط `/` أو `Ctrl+K`.

### نصائح الأمان والإعداد

- لا تقم بتضمين `sources/manifest.json` (يُنشأ مؤقتًا أثناء البناء)
- أبقِ `browser_specific_settings.gecko.id` ثابتًا للحفاظ على قناة التحديث

### استكشاف الأخطاء

- تأكد أن Thunderbird 128 ESR أو أحدث
- استخدم وحدة الأخطاء للمشكلات وقت التشغيل

### CI والتغطية

- يقوم GitHub Actions (`CI — Tests`) بتشغيل vitest بعتبات تغطية (85% للأسطر/الدوال/الفروع/التصريحات). إن لم تتحقق، يفشل التنفيذ.
- يرفع مسار العمل ملف `coverage-html` وفيه تقرير HTML؛ نزّله من صفحة التشغيل (Actions → أحدث تشغيل → Artifacts).

### المساهمة

- راجع CONTRIBUTING.md لإرشادات الفروع/الالتزامات/طلبات الدمج
