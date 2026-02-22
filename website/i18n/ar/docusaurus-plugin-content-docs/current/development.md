---
id: development
title: 'التطوير'
sidebar_label: 'التطوير'
---

---

## دليل التطوير {#development-guide}

:::note حرّر الإنجليزية فقط؛ الترجمات تنتشر تلقائيًا
حدّث الوثائق فقط تحت `website/docs` (الإنجليزية). الترجمات تحت `website/i18n/<locale>/…` يتم توليدها ويجب عدم تحريرها يدويًا. استخدم مهام الترجمة (مثل `make translate_web_docs_batch`) لتحديث المحتوى المترجم.
:::

### المتطلبات الأساسية {#prerequisites}

- Node.js 22+ وnpm (تم الاختبار مع Node 22)
- Thunderbird 128 ESR أو أحدث (للاختبار اليدوي)

---

### بنية المشروع (عالية المستوى) {#project-layout-high-level}

- الجذر: سكربت التغليف `distribution_zip_packer.sh`، الوثائق، لقطات الشاشة
- `sources/`: الشفرة الأساسية للإضافة (الخلفية، واجهة الخيارات/النافذة المنبثقة، الملفات الوصفية، الأيقونات)
- `tests/`: مجموعة Vitest
- `website/`: وثائق Docusaurus (مع i18n تحت `website/i18n/de/...`)

---

### التثبيت والأدوات {#install-and-tooling}

- تثبيت تبعيات الجذر: `npm ci`
- الوثائق (اختياري): `cd website && npm ci`
- استكشاف الأهداف: `make help`

---

### التطوير الحي (web‑ext run) {#live-dev-web-ext}

- حلقة سريعة على Firefox Desktop (اختبارات واجهة سطحية فقط):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- التشغيل على Thunderbird (المفضل لـ MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- نصائح:
- أبقِ نافذة سجل أخطاء Thunderbird مفتوحة (Tools → Developer Tools → Error Console).
- يتم تعليق صفحات أحداث MV3 عند الخمول؛ أعد تحميل الإضافة بعد تغييرات الشفرة، أو دع web‑ext يعيد التحميل تلقائيًا.
- بعض سلوكيات Firefox فقط تختلف؛ تحقّق دائمًا في Thunderbird للتأكد من تكافؤ واجهات البرمجة.
- مسارات ثنائيات Thunderbird (أمثلة):
- Linux: `thunderbird` (مثلًا، `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- عزل الملف الشخصي: استخدم ملف تعريف Thunderbird منفصلًا للتطوير لتجنّب التأثير على إعدادك اليومي.

---

### أهداف Make (أبجديًا) {#make-targets-alphabetical}

يوحد Makefile التدفقات الشائعة للتطوير. شغّل `make help` في أي وقت للحصول على ملخص من سطر واحد لكل هدف.

نصيحة: تشغيل `make` بدون هدف يفتح قائمة Whiptail بسيطة لاختيار هدف.

| الهدف                                                    | وصف من سطر واحد                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | إزالة ملفات الإنشاء/المعاينة المحلية (tmp/، web-local-preview/، website/build/).                      |
| [`commit`](#mt-commit)                                   | تنسيق، تشغيل الاختبارات (بما في ذلك i18n)، تحديث سجل التغييرات، الالتزام والدفع.                      |
| [`eslint`](#mt-eslint)                                   | تشغيل ESLint عبر التهيئة المسطّحة (`npm run -s lint:eslint`).                                         |
| [`help`](#mt-help)                                       | سرد جميع الأهداف مع توثيق من سطر واحد (مرتب).                                                         |
| [`lint`](#mt-lint)                                       | web‑ext lint على `sources/` (بيان مؤقت؛ يتجاهل ملفات ZIP؛ غير قاتل).                                  |
| [`menu`](#mt-menu)                                       | قائمة تفاعلية لاختيار هدف وخيارات اختيارية.                                                           |
| [`pack`](#mt-pack)                                       | بناء ملفات ZIP لـ ATN وLOCAL (يشغّل المدقق؛ يستدعي سكربت الحزم).                                      |
| [`prettier`](#mt-prettier)                               | تنسيق المستودع في مكانه (يكتب التغييرات).                                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier بوضع الفحص (بدون كتابة)؛ يفشل إذا لزم إعادة التنسيق.                                         |
| [`prettier_write`](#mt-prettier_write)                   | اسم بديل لـ `prettier`.                                                                               |
| [`test`](#mt-test)                                       | Prettier (كتابة)، ثم ESLint، ثم Vitest (تغطية إن تم إعدادها).                                         |
| [`test_i18n`](#mt-test_i18n)                             | اختبارات i18n فقط: نُسخ/تكافؤ الإضافة + تكافؤ الموقع.                                                 |
| [`translate_app`](#mt-translation-app)                   | اسم بديل لـ `translation_app`.                                                                        |
| [`translation_app`](#mt-translation-app)                 | ترجمة نصوص واجهة تطبيق الإضافة من `sources/_locales/en/messages.json`.                                |
| [`translate_web_docs_batch`](#mt-translation-web)        | ترجمة وثائق الموقع عبر OpenAI Batch API (مفضّل).                                                      |
| [`translate_web_docs_sync`](#mt-translation-web)         | ترجمة وثائق الموقع تزامنيًا (قديمة، غير مجمّعة).                                                      |
| [`translate_web_index`](#mt-translation_web_index)       | اسم بديل لـ `translation_web_index`.                                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | ترجمة واجهة الصفحة الرئيسية/شريط التنقل/التذييل (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | بناء الوثائق إلى `website/build` (يدعم `--locales` / `BUILD_LOCALES`).                                |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | فحص روابط آمن دون اتصال (يتجاوز HTTP[S] البعيدة).                                                     |
| [`web_build_local_preview`](#mt-web_build_local_preview) | معاينة gh‑pages محليًا؛ خدمة تلقائية على 8090–8080؛ اختبارات/فحص روابط اختياري.                       |
| [`web_push_github`](#mt-web_push_github)                 | دفع `website/build` إلى فرع `gh-pages`.                                                               |

صيغة الخيارات

- استخدم `make <command> OPTS="…"` لتمرير الخيارات (يُفضّل استخدام علامات الاقتباس). كل هدف أدناه يعرض مثال استخدام.

--

-

#### نصائح بناء اللغات {#locale-build-tips}

- بناء مجموعة فرعية من اللغات: اضبط `BUILD_LOCALES="en de"` أو مرّر `OPTS="--locales en,de"` إلى أهداف الويب.
- معاينة لغة محددة: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### البناء والتغليف {#build-and-package}

- بناء ملفات ZIP: `make pack`
- ينتج ملفات ZIP لكل من ATN وLOCAL في جذر المستودع (لا تعدّل المخرجات يدويًا)
- نصيحة: حدّث الإصدار في كلٍ من `sources/manifest_ATN.json` و`sources/manifest_LOCAL.json` قبل التغليف
- التثبيت اليدوي (تطوير): Thunderbird → Tools → Add‑ons and Themes → ترس → Install Add‑on From File… → اختر ملف ZIP المبني

---

### الاختبار {#test}

- الحزمة الكاملة: `make test` (Vitest)
- التغطية (اختياري):
- `npm i -D @vitest/coverage-v8`
- شغّل `make test`؛ افتح `coverage/index.html` لتقرير HTML
- i18n فقط: `make test_i18n` (مفاتيح/نُسخ/عناوين واجهة المستخدم + تكافؤ الموقع لكل لغة ولكل مستند مع فحوص id/title/sidebar_label)

---

### تتبّع الأخطاء والسجلات {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- تبديل السجلات التفصيلية وقت التشغيل:
- تفعيل: `messenger.storage.local.set({ debug: true })`
- تعطيل: `messenger.storage.local.set({ debug: false })`
- تظهر السجلات أثناء كتابة/إرسال الردود

---

### الوثائق (الموقع) {#docs-website}

- خادم التطوير: `cd website && npm run start`
- بناء موقع ساكن: `cd website && npm run build`
- مكافئات Make (أبجديًا): `make web_build`، `make web_build_linkcheck`، `make web_build_local_preview`، `make web_push_github`
- أمثلة الاستخدام:
- الإنجليزية فقط، تخطي الاختبارات/فحص الروابط، بدون دفع: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- جميع اللغات، مع اختبارات/فحص روابط، ثم دفع: `make web_build_local_preview && make web_push_github`
- قبل النشر، شغّل فحص الروابط الآمن دون اتصال: `make web_build_linkcheck`.
- i18n: الإنجليزية في `website/docs/*.md`؛ الترجمات الألمانية في `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- البحث: إذا تم ضبط متغيرات بيئة Algolia DocSearch في CI (`DOCSEARCH_APP_ID`، `DOCSEARCH_API_KEY`، `DOCSEARCH_INDEX_NAME`)، سيستخدم الموقع بحث Algolia؛ وإلا فسيعود إلى البحث المحلي. في الصفحة الرئيسية، اضغط `/` أو `Ctrl+K` لفتح صندوق البحث.

---

#### مسار إعادة التوجيه للتبرع {#donate-redirect}

- `website/src/pages/donate.js`
- المسار: `/donate` (و`/<locale>/donate`)
- السلوك:
- إذا كان للمسار الحالي لغة (مثل `/de/donate`)، فاستخدمها
- وإلا، اختر أفضل تطابق من `navigator.languages` مقابل اللغات المضبوطة؛ والافتراضي العودة للغة الإفتراضية
- يعيد التوجيه إلى:
- `en` → `/docs/donation`
- غير ذلك → `/<locale>/docs/donation`
- يستخدم `useBaseUrl` للتعامل الصحيح مع baseUrl
- يتضمن meta refresh + رابط `noscript` كحل احتياطي

---

---

#### نصائح المعاينة {#preview-tips}

- أوقف معاينة Node بشكل نظيف: افتح `http://localhost:<port>/__stop` (يُطبع بعد `Local server started`).
- إذا لم يتم تحميل الصور في MDX/JSX، استخدم `useBaseUrl('/img/...')` لاحترام `baseUrl` الخاص بالموقع.
- تبدأ المعاينة أولًا؛ ثم يجري فحص الروابط بعد ذلك وهو غير حاجز (الروابط الخارجية المعطلة لن توقف المعاينة).
- مثال عنوان URL للمعاينة: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (يُطبع بعد “Local server started”).
- الروابط الخارجية في فحص الروابط: بعض المواقع الخارجية (مثل addons.thunderbird.net) تمنع العناكب الآلية وقد تُظهر 403 في الفحص. ستبدأ المعاينة رغم ذلك؛ ويمكن تجاهل هذه بأمان.

---

#### ترجمة الموقع {#translate-website}

ما الذي يمكنك ترجمته

- واجهة الموقع فقط: الصفحة الرئيسية، شريط التنقل، التذييل، وسلاسل واجهة أخرى. تبقى محتويات الوثائق باللغة الإنجليزية حاليًا.

أين تُحرِّر

- حرّر `website/i18n/<locale>/code.json` (استخدم `en` كمرجع). أبقِ العناصر النائبة مثل `{year}`، `{slash}`، `{ctrl}`، `{k}`، `{code1}` دون تغيير.

إنشاء الملفات أو تحديثها

- إنشاء قوالب ناقصة لجميع اللغات: `npm --prefix website run i18n:stubs`
- الكتابة فوق القوالب من الإنجليزية (بعد إضافة سلاسل جديدة): `npm --prefix website run i18n:stubs:force`
- بديل للغة واحدة: `npx --prefix website docusaurus write-translations --locale <locale>`

ترجمة نصوص واجهة الصفحة الرئيسية/شريط التنقل/التذييل (OpenAI)

- اضبط بيانات الاعتماد مرة واحدة (shell أو .env):
- `export OPENAI_API_KEY=sk-...`
- اختياري: `export OPENAI_MODEL=gpt-4o-mini`
- تشغيل لمرة واحدة (كل اللغات، باستثناء en): `make translate_web_index`
- حصر الترجمة بلغات محددة: `make translate_web_index OPTS="--locales de,fr"`
- الكتابة فوق القيم الموجودة: `make translate_web_index OPTS="--force"`

التحقق وإعادة المحاولة

- يتحقق سكربت الترجمة من بنية JSON، ويحفظ عناصر الأقواس المعقوفة، ويضمن بقاء عناوين URL دون تغيير.
- عند فشل التحقق، يعيد المحاولة مع تغذية راجعة حتى مرتين قبل إبقاء القيم الحالية.

عاين لغتك

- خادم التطوير: `npm --prefix website run start`
- زر `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

الإرسال

- افتح طلب دمج (PR) بملفات `code.json` المعدّلة. أبقِ التغييرات مركزة وأدرج لقطة شاشة سريعة إن أمكن.

---

### نصائح الأمان والإعداد {#security-and-configuration-tips}

- لا تقم بارتكاب `sources/manifest.json` (يُنشأ مؤقتًا بواسطة عملية البناء)
- أبقِ `browser_specific_settings.gecko.id` مستقرًا للحفاظ على قناة التحديث

---

### استمرارية الإعدادات {#settings-persistence}

- التخزين: جميع إعدادات المستخدم تعيش في `storage.local` وتستمر عبر تحديثات الإضافة.
- التثبيت: تُطبّق القيم الافتراضية فقط عندما يكون المفتاح مفقودًا تمامًا (undefined).
- التحديث: تملأ الترقية المفاتيح المفقودة فقط؛ لا تُستبدل القيم الموجودة أبدًا.
- مؤشر المخطط: `settingsVersion` (حاليًا `1`).
- المفاتيح والقيم الافتراضية:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- الشفرة: انظر `sources/background.js` → `initializeOrMigrateSettings()` و`SCHEMA_VERSION`.

سير عمل التطوير (إضافة إعداد جديد)

- ارفع `SCHEMA_VERSION` في `sources/background.js`.
- أضِف المفتاح الجديد + القيمة الافتراضية إلى كائن `DEFAULTS` في `initializeOrMigrateSettings()`.
- استخدم قاعدة "فقط إذا كان undefined" عند تهيئة القيم الافتراضية؛ لا تُعد كتابة القيم الموجودة.
- إذا كان الإعداد مرئيًا للمستخدم، اربطه في `sources/options.js` وأضِف سلاسل محلية.
- أضِف/عدّل الاختبارات (انظر `tests/background.settings.migration.test.js`).

نصائح للاختبار اليدوي

- محاكاة تثبيت جديد: امسح دليل بيانات الإضافة أو ابدأ بملف تعريف جديد.
- محاكاة تحديث: اضبط `settingsVersion` إلى `0` في `storage.local` وأعد التحميل؛ تأكد من بقاء القيم الحالية دون تغيير وإضافة المفاتيح المفقودة فقط.

---

### استكشاف الأخطاء وإصلاحها {#troubleshooting}

- تأكد أن Thunderbird بإصدار 128 ESR أو أحدث
- استخدم Error Console للمشكلات وقت التشغيل
- إذا بدا أن الإعدادات المخزّنة لا تُطبّق بشكل صحيح، أعد تشغيل Thunderbird وحاول مجددًا. (قد يخزّن Thunderbird الحالة عبر الجلسات؛ يضمن إعادة التشغيل تحميل الإعدادات الحديثة.)

---

### التكامل المستمر والتغطية {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) يشغّل vitest بعتبات تغطية (85% للأسطر/الدوال/التفرعات/التعليقات). إذا لم تتحقق العتبات، تفشل المهمة.
- يرفع سير العمل ملفًا `coverage-html` مع تقرير HTML؛ نزّله من صفحة التشغيل (Actions → آخر تشغيل → Artifacts).

---

### المساهمة {#contributing}

- راجع CONTRIBUTING.md لإرشادات الفروع/الالتزامات/طلبات الدمج
- نصيحة: أنشئ ملف تعريف تطوير Thunderbird منفصلًا للاختبار لتجنب التأثير على ملفك اليومي.

---

### الترجمات

- تشغيل مهام ترجمة كبيرة “الكل → الكل” قد يكون بطيئًا ومكلفًا. ابدأ بمجموعة فرعية (مثل بعض الوثائق و1–2 لغات)، راجع النتيجة، ثم وسّع.

---

- سياسة إعادة المحاولة: تنفّذ مهام الترجمة ما يصل إلى 3 محاولات مع إرجاع أُسّي عند أخطاء واجهة البرمجة؛ انظر `scripts/translate_web_docs_batch.js` و`scripts/translate_web_docs_sync.js`.

لقطات الشاشة للوثائق

- خزّن الصور تحت `website/static/img/`.
- أشِر إليها في MD/MDX عبر `useBaseUrl('/img/<filename>')` حتى تعمل المسارات مع `baseUrl` الخاص بالموقع.
- بعد إضافة أو إعادة تسمية صور تحت `website/static/img/`، تأكّد أن جميع المراجع ما زالت تستخدم `useBaseUrl('/img/…')` وتُعرض في معاينة محلية.
  الأيقونات المفضّلة

- يتم توليد `favicon.ico` متعدد الأحجام تلقائيًا في جميع مسارات البناء (Make + السكربتات) عبر `website/scripts/build-favicon.mjs`.
- لا حاجة لخطوة يدوية؛ يكفي تحديث `icon-*.png`.
  نصيحة للمراجعة

- أبقِ `id` في front‑matter دون تغيير في الوثائق المُترجمة؛ ترجم فقط `title` و`sidebar_label` عند وجودهما.

#### clean {#mt-clean}

- الغرض: إزالة ملفات الإنشاء/المعاينة المحلية.
- الاستخدام: `make clean`
- يزيل (إن وُجد):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- الغرض: التنسيق، الاختبار، تحديث سجل التغييرات، الالتزام والدفع.
- الاستخدام: `make commit`
- التفاصيل: يشغّل Prettier (كتابة)، `make test`، `make test_i18n`؛ يضيف إلى سجل التغييرات عند وجود فروقات مُدرجة؛ يدفع إلى `origin/<branch>`.

---

#### eslint {#mt-eslint}

- الغرض: تشغيل ESLint عبر تهيئة مسطّحة.
- الاستخدام: `make eslint`

---

#### help {#mt-help}

- الغرض: سرد جميع الأهداف مع توثيق من سطر واحد.
- الاستخدام: `make help`

---

#### lint {#mt-lint}

- الغرض: تدقيق MailExtension باستخدام `web-ext`.
- الاستخدام: `make lint`
- ملاحظات: نسخ مؤقت `sources/manifest_LOCAL.json` → `sources/manifest.json`; يتجاهل ملفات ZIP المبنية؛ التحذيرات لا تفشل خط المعالجة.

---

#### menu {#mt-menu}

- الغرض: قائمة تفاعلية لاختيار هدف Make وخيارات اختيارية.
- الاستخدام: شغّل `make` بدون معاملات.
- ملاحظات: إذا لم يكن `whiptail` متاحًا، تعود القائمة إلى `make help`.

---

#### pack {#mt-pack}

- الغرض: بناء ملفات ZIP لـ ATN وLOCAL (يعتمد على `lint`).
- الاستخدام: `make pack`
- نصيحة: ارفع الإصدارات في كلٍ من `sources/manifest_*.json` قبل التغليف.

---

#### prettier {#mt-prettier}

- الغرض: تنسيق المستودع في مكانه.
- الاستخدام: `make prettier`

#### prettier_check {#mt-prettier_check}

- الغرض: التحقق من التنسيق (بدون كتابة).
- الاستخدام: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- الغرض: اسم بديل لـ `prettier`.
- الاستخدام: `make prettier_write`

---

#### test {#mt-test}

- الغرض: تشغيل Prettier (كتابة)، ثم ESLint، ثم Vitest (تغطية إن كانت مثبتة).
- الاستخدام: `make test`

#### test_i18n {#mt-test_i18n}

- الغرض: اختبارات مركزة على i18n لنصوص الإضافة ووثائق الموقع.
- الاستخدام: `make test_i18n`
- يشغّل: `npm run test:i18n` و`npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- الغرض: ترجمة نصوص واجهة الإضافة من EN إلى لغات أخرى.
- الاستخدام: `make translation_app OPTS="--locales all|de,fr"`
- ملاحظات: يحافظ على بنية المفاتيح والعناصر النائبة؛ يسجّل إلى `translation_app.log`. الشكل كسكربت: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- الغرض: ترجمة وثائق الموقع من `website/docs/*.md` إلى `website/i18n/<locale>/...`.
- المفضّل: `translate_web_docs_batch` (OpenAI Batch API)
  - الاستخدام (أعلام): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ما زال المقبول بنمط موضعي قديم: `OPTS="<doc|all> <lang|all>"`
- السلوك: يبني JSONL، يرفع، يستعلم كل 30 ثانية، ينزل النتائج، يكتب الملفات.
- ملاحظة: قد يستغرق تنفيذ الدفعة حتى 24 ساعة (حسب نافذة الدُفعات في OpenAI). يعرض الطرفية الزمن المنقضي في كل استعلام.
- البيئة: `OPENAI_API_KEY` (مطلوب)، اختياريًا `OPENAI_MODEL`، `OPENAI_TEMPERATURE`، `OPENAI_BATCH_WINDOW` (الافتراضي 24h)، `BATCH_POLL_INTERVAL_MS`.
- قديم: `translate_web_docs_sync`
  - الاستخدام (أعلام): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ما زال المقبول بنمط موضعي قديم: `OPTS="<doc|all> <lang|all>"`
- السلوك: طلبات تزامنية لكل زوج (بدون تجميع دفعات).
- ملاحظات: مطالبات تفاعلية عند إهمال `OPTS`. كلا الوضعين يحفظان كتل الشفرة/الشفرة المضمنة ويُبقِيان `id` في front‑matter دون تغيير؛ يسجّل إلى `translation_web_batch.log` (دفعي) أو `translation_web_sync.log` (تزامني).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- الغرض: ترجمة نصوص واجهة الموقع (الصفحة الرئيسية، شريط التنقل، التذييل) من `website/i18n/en/code.json` إلى كل اللغات تحت `website/i18n/<locale>/code.json` (باستثناء `en`).
- الاستخدام: `make translate_web_index` أو `make translate_web_index OPTS="--locales de,fr [--force]"`
- المتطلبات: تصدير `OPENAI_API_KEY` (اختياري: `OPENAI_MODEL=gpt-4o-mini`).
- السلوك: يتحقق من بنية JSON، يحافظ على عناصر الأقواس المعقوفة، يُبقي عناوين URL دون تغيير، ويعيد المحاولة مع تغذية راجعة عند أخطاء التحقق.

---

#### web_build {#mt-web_build}

- الغرض: بناء موقع الوثائق إلى `website/build`.
- الاستخدام: `make web_build OPTS="--locales en|de,en|all"` (أو اضبط `BUILD_LOCALES="en de"`)
- التفاصيل الداخلية: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- الاعتمادات: يشغّل `npm ci` في `website/` فقط إذا كان `website/node_modules/@docusaurus` مفقودًا.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- الغرض: فحص روابط آمن دون اتصال.
- الاستخدام: `make web_build_linkcheck OPTS="--locales en|all"`
- ملاحظات: يبني إلى `tmp_linkcheck_web_pages`؛ يعيد كتابة `baseUrl` في GitHub Pages إلى `/`؛ يتجاوز الروابط البعيدة HTTP(S).

#### web_build_local_preview {#mt-web_build_local_preview}

- الغرض: معاينة gh‑pages محليًا مع اختبارات/فحص روابط اختياري.
- الاستخدام: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- السلوك: يحاول أولًا خادم معاينة Node (`scripts/preview-server.mjs`، يدعم `/__stop`)، ثم يعود إلى `python3 -m http.server`؛ يقدّم على المنافذ 8080–8090؛ PID في `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- الغرض: دفع `website/build` إلى فرع `gh-pages`.
- الاستخدام: `make web_push_github`

نصيحة: اضبط `NPM=…` لتجاوز مدير الحزم الذي يستخدمه Makefile (الافتراضي `npm`).
