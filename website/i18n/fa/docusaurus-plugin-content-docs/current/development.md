---
id: development
title: 'توسعه'
sidebar_label: 'توسعه'
---

---

## راهنمای توسعه {#development-guide}

:::note فقط انگلیسی را ویرایش کنید؛ ترجمه‌ها انتشار می‌یابند
مستندات را **فقط** زیر `website/docs` (انگلیسی) به‌روزرسانی کنید. ترجمه‌های زیر `website/i18n/<locale>/…` تولید می‌شوند و نباید به‌صورت دستی ویرایش شوند. برای تازه‌سازی محتوای محلی‌شده از وظایف ترجمه (مثلاً `make translate_web_docs_batch`) استفاده کنید.
:::

### پیش‌نیازها {#prerequisites}

- Node.js 22+ و npm (با Node 22 آزمایش شده)
- Thunderbird 128 ESR یا جدیدتر (برای تست دستی)

---

### چیدمان پروژه (در سطح بالا) {#project-layout-high-level}

- ریشه: اسکریپت بسته‌بندی `distribution_zip_packer.sh`، مستندات، اسکرین‌شات‌ها
- `sources/`: کد اصلی افزونه (پس‌زمینه، رابط گزینه‌ها/پنجره پاپ‌آپ، مانیفست‌ها، آیکن‌ها)
- `tests/`: مجموعه Vitest
- `website/`: مستندات Docusaurus (با i18n زیر `website/i18n/de/...`)

---

### نصب و ابزارها {#install-and-tooling}

- نصب وابستگی‌های ریشه: `npm ci`
- مستندات (اختیاری): `cd website && npm ci`
- کشف اهداف: `make help`

---

### توسعه زنده (web‑ext run) {#live-dev-web-ext}

- حلقه سریع در Firefox Desktop (فقط تست‌های سطحی رابط):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- اجرا در Thunderbird (ترجیحی برای MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- نکته‌ها:
- کنسول خطای Thunderbird را باز نگه دارید (Tools → Developer Tools → Error Console).
- صفحات رویداد MV3 در حالت بیکار معلق می‌شوند؛ پس از تغییر کد افزونه را ریلود کنید یا اجازه دهید web‑ext خودکار ریلود کند.
- برخی رفتارهای مخصوص Firefox متفاوت‌اند؛ همیشه در Thunderbird برای برابری API بررسی کنید.
- مسیرهای باینری Thunderbird (نمونه‌ها):
- لینوکس: `thunderbird` (مثلاً `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- ویندوز: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- جداسازی پروفایل: برای توسعه از یک پروفایل Thunderbird جداگانه استفاده کنید تا روی تنظیمات روزمره‌تان تأثیر نگذارد.

---

### اهداف Make (به‌ترتیب حروف الفبا) {#make-targets-alphabetical}

Makefile جریان‌های متداول توسعه را استاندارد می‌کند. هر زمان `make help` را اجرا کنید تا خلاصه یک‌خطی هر هدف را ببینید.

نکته: اجرای `make` بدون هدف، یک منوی ساده Whiptail برای انتخاب هدف باز می‌کند.

| هدف                                                      | توضیح یک‌خطی                                                                                  |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | حذف آرتیفکت‌های ساخت/پیش‌نمایش محلی (tmp/، web-local-preview/، website/build/).               |
| [`commit`](#mt-commit)                                   | قالب‌بندی، اجرای تست‌ها (ازجمله i18n)، به‌روزرسانی changelog، commit و push.                  |
| [`eslint`](#mt-eslint)                                   | اجرای ESLint از طریق پیکربندی flat (`npm run -s lint:eslint`).                                |
| [`help`](#mt-help)                                       | فهرست همه اهداف با مستندات یک‌خطی (مرتب‌شده).                                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint روی `sources/` (مانیفست موقت؛ ZIPها را نادیده می‌گیرد؛ غیر بحرانی).              |
| [`menu`](#mt-menu)                                       | منوی تعاملی برای انتخاب یک هدف و آرگومان‌های اختیاری.                                         |
| [`pack`](#mt-pack)                                       | ساخت ZIPهای ATN و LOCAL (لینتر را اجرا می‌کند؛ اسکریپت بسته‌بندی را فراخوانی می‌کند).         |
| [`prettier`](#mt-prettier)                               | فرمت کردن مخزن درجا (تغییرات را می‌نویسد).                                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier در حالت بررسی (بدون نوشتن)؛ اگر نیاز به بازفرمت باشد، شکست می‌خورد.                  |
| [`prettier_write`](#mt-prettier_write)                   | نام مستعار برای `prettier`.                                                                   |
| [`test`](#mt-test)                                       | Prettier (نوشتن)، ESLint، سپس Vitest (اگر پوشش پیکربندی شده).                                 |
| [`test_i18n`](#mt-test_i18n)                             | تست‌های فقط i18n: جای‌نگهدارها/برابری افزونه + برابری وب‌سایت.                                |
| [`translate_app`](#mt-translation-app)                   | نام مستعار برای `translation_app`.                                                            |
| [`translation_app`](#mt-translation-app)                 | ترجمه رشته‌های رابط کاربری اپ از `sources/_locales/en/messages.json`.                         |
| [`translate_web_docs_batch`](#mt-translation-web)        | ترجمه اسناد وب‌سایت از طریق OpenAI Batch API (ترجیحی).                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | ترجمه اسناد وب‌سایت به‌صورت همگام (قدیمی، غیر batch).                                         |
| [`translate_web_index`](#mt-translation_web_index)       | نام مستعار برای `translation_web_index`.                                                      |
| [`translation_web_index`](#mt-translation_web_index)     | ترجمه رابط صفحه اصلی/نوار ناوبری/پانوشت (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | ساخت اسناد به `website/build` (پشتیبانی از `--locales` / `BUILD_LOCALES`).                    |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | بررسی لینک آفلاین-ایمن (پیوندهای HTTP[S] دوردست را رد می‌کند).                                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | پیش‌نمایش محلی gh‑pages؛ سرو خودکار روی 8080–8090؛ تست/بررسی لینک اختیاری.                    |
| [`web_push_github`](#mt-web_push_github)                 | ارسال `website/build` به شاخه `gh-pages`.                                                     |

نحو گزینه‌ها

- از `make <command> OPTS="…"` برای ارسال گزینه‌ها استفاده کنید (استفاده از کوتیشن توصیه می‌شود). هر هدف در زیر مثال استفاده را نشان می‌دهد.

--

-

#### نکته‌های ساخت برای محلی‌سازی {#locale-build-tips}

- ساخت زیرمجموعه‌ای از زبان‌ها: `BUILD_LOCALES="en de"` را تنظیم کنید یا `OPTS="--locales en,de"` را به اهداف وب بدهید.
- پیش‌نمایش یک زبان خاص: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### ساخت و بسته‌بندی {#build-and-package}

- ساخت ZIPها: `make pack`
- فایل‌های ATN و LOCAL ZIP را در ریشه مخزن تولید می‌کند (آرتیفکت‌ها را دستی ویرایش نکنید)
- نکته: نسخه را پیش از بسته‌بندی در هر دو `sources/manifest_ATN.json` و `sources/manifest_LOCAL.json` به‌روزرسانی کنید
- نصب دستی (توسعه): Thunderbird → Tools → Add‑ons and Themes → چرخ‌دنده → Install Add‑on From File… → ZIP ساخته‌شده را انتخاب کنید

---

### تست {#test}

- مجموعه کامل: `make test` (Vitest)
- پوشش‌دهی (اختیاری):
- `npm i -D @vitest/coverage-v8`
- `make test` را اجرا کنید؛ برای گزارش HTML، `coverage/index.html` را باز کنید
- فقط i18n: `make test_i18n` (کلیدها/جای‌نگهدارها/عنوان‌های رابط + برابری وب‌سایت به‌تفکیک زبان و سند با بررسی id/title/sidebar_label)

---

### اشکال‌زدایی و لاگ‌ها {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- جابه‌جایی لاگ‌های پرحجم در زمان اجرا:
- فعال: `messenger.storage.local.set({ debug: true })`
- غیرفعال: `messenger.storage.local.set({ debug: false })`
- لاگ‌ها هنگام نگارش/ارسال پاسخ‌ها نمایش داده می‌شوند

---

### مستندات (وب‌سایت) {#docs-website}

- سرور توسعه: `cd website && npm run start`
- ساخت سایت استاتیک: `cd website && npm run build`
- معادل‌های Make (به‌ترتیب حروف الفبا): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- مثال‌های استفاده:
- فقط EN، پرش از تست/بررسی لینک، بدون push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- همه زبان‌ها، با تست/بررسی لینک، سپس push: `make web_build_local_preview && make web_push_github`
- قبل از انتشار، بررسی لینک آفلاین-ایمن را اجرا کنید: `make web_build_linkcheck`.
- i18n: انگلیسی در `website/docs/*.md`؛ ترجمه‌های آلمانی در `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- جستجو: اگر متغیرهای محیطی Algolia DocSearch در CI تنظیم شده باشند (`DOCSEARCH_APP_ID`، `DOCSEARCH_API_KEY`، `DOCSEARCH_INDEX_NAME`)، سایت از جستجوی Algolia استفاده می‌کند؛ در غیر این صورت به جستجوی محلی برمی‌گردد. در صفحه اصلی، `/` یا `Ctrl+K` را بزنید تا جعبه جستجو باز شود.

---

#### مسیر تغییرمسیر کمک مالی {#donate-redirect}

- `website/src/pages/donate.js`
- مسیر: `/donate` (و `/<locale>/donate`)
- رفتار:
- اگر مسیر فعلی دارای زبان باشد (مثلاً `/de/donate`)، از همان استفاده می‌شود
- در غیر این صورت، بهترین تطابق از `navigator.languages` در برابر زبان‌های پیکربندی‌شده انتخاب می‌شود؛ در نهایت به زبان پیش‌فرض برمی‌گردد
- تغییرمسیر به:
- `en` → `/docs/donation`
- سایرین → `/<locale>/docs/donation`
- از `useBaseUrl` برای مدیریت صحیح baseUrl استفاده می‌کند
- شامل meta refresh + لینک `noscript` به‌عنوان پشتیبان است

---

---

#### نکته‌های پیش‌نمایش {#preview-tips}

- پیش‌نمایش Node را تمیز متوقف کنید: `http://localhost:<port>/__stop` را باز کنید (پس از `Local server started` چاپ می‌شود).
- اگر تصاویر در MDX/JSX بارگذاری نمی‌شوند، از `useBaseUrl('/img/...')` استفاده کنید تا `baseUrl` سایت رعایت شود.
- پیش‌نمایش ابتدا شروع می‌شود؛ بررسی لینک سپس اجرا می‌شود و مسدودکننده نیست (لینک‌های خارجی شکسته پیش‌نمایش را متوقف نمی‌کنند).
- نمونه URL پیش‌نمایش: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (پس از «Local server started» چاپ می‌شود).
- لینک‌های خارجی در بررسی لینک: برخی سایت‌های خارجی (مثلاً addons.thunderbird.net) خزنده‌های خودکار را مسدود می‌کنند و ممکن است در بررسی لینک‌ها 403 نشان دهند. پیش‌نمایش همچنان شروع می‌شود؛ نادیده‌گرفتن آن‌ها بی‌خطر است.

---

#### ترجمه وب‌سایت {#translate-website}

چه چیزهایی را می‌توانید ترجمه کنید

- فقط رابط وب‌سایت: صفحه اصلی، نوار ناوبری، پانوشت و رشته‌های دیگر رابط. محتوای اسناد فعلاً فقط انگلیسی می‌ماند.

کجا ویرایش کنیم

- `website/i18n/<locale>/code.json` را ویرایش کنید (از `en` به‌عنوان مرجع استفاده کنید). جای‌نگهدارهایی مانند `{year}`، `{slash}`، `{ctrl}`، `{k}`، `{code1}` را بدون تغییر نگه دارید.

تولید یا نوسازی فایل‌ها

- ایجاد stubهای مفقود برای همه زبان‌ها: `npm --prefix website run i18n:stubs`
- بازنویسی stubها از انگلیسی (پس از افزودن رشته‌های جدید): `npm --prefix website run i18n:stubs:force`
- جایگزین برای یک زبان واحد: `npx --prefix website docusaurus write-translations --locale <locale>`

ترجمه رشته‌های رابط صفحه اصلی/نوار ناوبری/پانوشت (OpenAI)

- اعتبارنامه‌ها را یک‌بار تنظیم کنید (شِل یا .env):
- `export OPENAI_API_KEY=sk-...`
- اختیاری: `export OPENAI_MODEL=gpt-4o-mini`
- تک‌مرحله‌ای (همه زبان‌ها، به‌جز en): `make translate_web_index`
- محدودکردن به زبان‌های مشخص: `make translate_web_index OPTS="--locales de,fr"`
- بازنویسی مقادیر موجود: `make translate_web_index OPTS="--force"`

اعتبارسنجی و تلاش‌های مجدد

- اسکریپت ترجمه شکل JSON را اعتبارسنجی می‌کند، جای‌نگهدارهای آکولادی را حفظ می‌کند و اطمینان می‌دهد URLها تغییر نکنند.
- در صورت شکست اعتبارسنجی، حداکثر ۲ بار با بازخورد تلاش مجدد می‌کند و سپس مقادیر موجود را حفظ می‌کند.

پیش‌نمایش زبان شما

- سرور توسعه: `npm --prefix website run start`
- بازدید از `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

ارسال

- یک PR با فایل(های) `code.json` ویرایش‌شده باز کنید. تغییرات را متمرکز نگه دارید و در صورت امکان یک اسکرین‌شات سریع اضافه کنید.

---

### نکته‌های امنیت و پیکربندی {#security-and-configuration-tips}

- `sources/manifest.json` را کامیت نکنید (به‌صورت موقت توسط بیلد ایجاد می‌شود)
- `browser_specific_settings.gecko.id` را پایدار نگه دارید تا کانال به‌روزرسانی حفظ شود

---

### پایداری تنظیمات {#settings-persistence}

- ذخیره‌سازی: همه تنظیمات کاربر در `storage.local` نگهداری می‌شوند و در به‌روزرسانی‌های افزونه پایدار می‌مانند.
- نصب: مقادیر پیش‌فرض فقط وقتی اعمال می‌شوند که یک کلید کاملاً مفقود باشد (undefined).
- به‌روزرسانی: یک مهاجرت فقط کلیدهای مفقود را پر می‌کند؛ مقادیر موجود هرگز بازنویسی نمی‌شوند.
- نشانگر طرح: `settingsVersion` (در حال حاضر `1`).
- کلیدها و مقادیر پیش‌فرض:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- کد: ببینید `sources/background.js` → `initializeOrMigrateSettings()` و `SCHEMA_VERSION`.

جریان کار توسعه (افزودن یک تنظیم جدید)

- `SCHEMA_VERSION` را در `sources/background.js` افزایش دهید.
- کلید جدید + پیش‌فرض را به شیء `DEFAULTS` در `initializeOrMigrateSettings()` اضافه کنید.
- هنگام مقداردهی اولیه پیش‌فرض‌ها از قاعده «فقط اگر undefined باشد» استفاده کنید؛ مقادیر موجود را بازنویسی نکنید.
- اگر تنظیم برای کاربر قابل‌مشاهده است، آن را در `sources/options.js` متصل کنید و رشته‌های محلی‌سازی‌شده بیفزایید.
- تست‌ها را اضافه/تنظیم کنید (نگاه کنید به `tests/background.settings.migration.test.js`).

نکته‌های تست دستی

- شبیه‌سازی نصب تازه: دایرکتوری داده افزونه را پاک کنید یا با پروفایل جدید شروع کنید.
- شبیه‌سازی به‌روزرسانی: `settingsVersion` را در `storage.local` به `0` تنظیم کنید و مجدداً بارگذاری نمایید؛ تأیید کنید مقادیر موجود بدون تغییر می‌مانند و فقط کلیدهای مفقود اضافه می‌شوند.

---

### عیب‌یابی {#troubleshooting}

- اطمینان حاصل کنید Thunderbird نسخه 128 ESR یا جدیدتر است
- برای مسائل زمان اجرا از Error Console استفاده کنید
- اگر تنظیمات ذخیره‌شده ظاهراً به‌درستی اعمال نمی‌شوند، Thunderbird را ری‌استارت کنید و دوباره امتحان کنید. (Thunderbird ممکن است وضعیت را بین نشست‌ها کش کند؛ یک ری‌استارت تضمین می‌کند تنظیمات تازه بارگذاری شوند.)

---

### CI و پوشش {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest را با آستانه‌های پوشش (۸۵٪ خطوط/توابع/شاخه‌ها/عبارات) اجرا می‌کند. اگر آستانه‌ها برآورده نشوند، کار شکست می‌خورد.
- گردش‌کار یک آرتیفکت `coverage-html` با گزارش HTML بارگذاری می‌کند؛ آن را از صفحه اجرا دانلود کنید (Actions → آخرین اجرا → Artifacts).

---

### مشارکت {#contributing}

- برای راهنمای شاخه/کامیت/PR به CONTRIBUTING.md مراجعه کنید
- نکته: برای تست، یک پروفایل توسعه Thunderbird جداگانه بسازید تا روی پروفایل روزانه‌تان تأثیر نگذارد.

---

### ترجمه‌ها

- اجرای کارهای ترجمه بزرگ «همه → همه» می‌تواند کند و پرهزینه باشد. با یک زیرمجموعه شروع کنید (مثلاً چند سند و ۱–۲ زبان)، نتیجه را بازبینی کنید، سپس گسترش دهید.

---

- سیاست تلاش مجدد: کارهای ترجمه تا ۳ بار با backoff نمایی در خطاهای API تلاش می‌کنند؛ ببینید `scripts/translate_web_docs_batch.js` و `scripts/translate_web_docs_sync.js`.

اسکرین‌شات‌ها برای اسناد

- تصاویر را زیر `website/static/img/` ذخیره کنید.
- آن‌ها را در MD/MDX از طریق `useBaseUrl('/img/<filename>')` ارجاع دهید تا مسیرها با `baseUrl` سایت کار کنند.
- پس از افزودن یا تغییر نام تصاویر زیر `website/static/img/`، تأیید کنید همه ارجاعات همچنان از `useBaseUrl('/img/…')` استفاده می‌کنند و در پیش‌نمایش محلی رندر می‌شوند.
  فاوآیکن‌ها

- `favicon.ico` چنداندازه به‌صورت خودکار در همه مسیرهای ساخت (Make + اسکریپت‌ها) از طریق `website/scripts/build-favicon.mjs` تولید می‌شود.
- نیازی به گام دستی نیست؛ به‌روزرسانی `icon-*.png` کافی است.
  نکته بازبینی

- `id` بخش سرآغاز را در اسناد ترجمه‌شده بدون تغییر نگه دارید؛ فقط `title` و `sidebar_label` را در صورت وجود ترجمه کنید.

#### clean {#mt-clean}

- هدف: حذف آرتیفکت‌های ساخت/پیش‌نمایش محلی.
- استفاده: `make clean`
- حذف می‌کند (در صورت وجود):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- هدف: قالب‌بندی، تست، به‌روزرسانی changelog، کامیت و پوش.
- استفاده: `make commit`
- جزئیات: Prettier (نوشتن)، `make test`, `make test_i18n` را اجرا می‌کند؛ وقتی تفاوت‌های staged وجود دارد تغییرات را به changelog می‌افزاید؛ به `origin/<branch>` پوش می‌کند.

---

#### eslint {#mt-eslint}

- هدف: اجرای ESLint از طریق پیکربندی flat.
- استفاده: `make eslint`

---

#### help {#mt-help}

- هدف: فهرست همه اهداف با مستندات یک‌خطی.
- استفاده: `make help`

---

#### lint {#mt-lint}

- هدف: lint افزونه MailExtension با `web-ext`.
- استفاده: `make lint`
- نکات: `sources/manifest_LOCAL.json` → `sources/manifest.json` را موقتاً کپی می‌کند؛ ZIPهای ساخته‌شده را نادیده می‌گیرد؛ هشدارها باعث شکست پایپ‌لاین نمی‌شوند.

---

#### menu {#mt-menu}

- هدف: منوی تعاملی برای انتخاب یک هدف Make و آرگومان‌های اختیاری.
- استفاده: `make` را بدون آرگومان اجرا کنید.
- نکات: اگر `whiptail` در دسترس نباشد، منو به `make help` برمی‌گردد.

---

#### pack {#mt-pack}

- هدف: ساخت ZIPهای ATN و LOCAL (وابسته به `lint`).
- استفاده: `make pack`
- نکته: نسخه‌ها را در هر دو `sources/manifest_*.json` پیش از بسته‌بندی افزایش دهید.

---

#### prettier {#mt-prettier}

- هدف: فرمت کردن مخزن درجا.
- استفاده: `make prettier`

#### prettier_check {#mt-prettier_check}

- هدف: تأیید فرمت (بدون نوشتن).
- استفاده: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- هدف: نام مستعار برای `prettier`.
- استفاده: `make prettier_write`

---

#### test {#mt-test}

- هدف: اجرای Prettier (نوشتن)، ESLint، سپس Vitest (اگر نصب شده باشد، با پوشش).
- استفاده: `make test`

#### test_i18n {#mt-test_i18n}

- هدف: تست‌های متمرکز بر i18n برای رشته‌های افزونه و اسناد وب‌سایت.
- استفاده: `make test_i18n`
- اجرا می‌کند: `npm run test:i18n` و `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- هدف: ترجمه رشته‌های رابط کاربری افزونه از EN به سایر زبان‌ها.
- استفاده: `make translation_app OPTS="--locales all|de,fr"`
- نکات: ساختار کلید و جای‌نگهدارها را حفظ می‌کند؛ در `translation_app.log` لاگ می‌نویسد. شکل اسکریپت: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- هدف: ترجمه اسناد وب‌سایت از `website/docs/*.md` به `website/i18n/<locale>/...`.
- ترجیحی: `translate_web_docs_batch` (OpenAI Batch API)
  - استفاده (فلگ‌ها): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - شکل قدیمی positional همچنان پذیرفته می‌شود: `OPTS="<doc|all> <lang|all>"`
- رفتار: JSONL می‌سازد، آپلود می‌کند، هر 30 ثانیه پول می‌زند، نتایج را دانلود و فایل‌ها را می‌نویسد.
- نکته: یک کار batch ممکن است تا 24 ساعت طول بکشد (بر اساس پنجره batch OpenAI). کنسول در هر پول زمان سپری‌شده را نشان می‌دهد.
- محیط: `OPENAI_API_KEY` (الزامی)، اختیاری `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (پیش‌فرض 24h)، `BATCH_POLL_INTERVAL_MS`.
- قدیمی: `translate_web_docs_sync`
  - استفاده (فلگ‌ها): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - شکل قدیمی positional همچنان پذیرفته می‌شود: `OPTS="<doc|all> <lang|all>"`
- رفتار: درخواست‌های همگام برای هر جفت (بدون تجمیع batch).
- نکات: درخواست‌های تعاملی وقتی `OPTS` حذف شده باشد. هر دو حالت بلوک‌های کد/کد درون‌خطی را حفظ می‌کنند و `id` سرآغاز را بدون تغییر نگه می‌دارند؛ لاگ‌ها در `translation_web_batch.log` (batch) یا `translation_web_sync.log` (sync) نوشته می‌شوند.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- هدف: ترجمه رشته‌های رابط وب‌سایت (صفحه اصلی، نوار ناوبری، پانوشت) از `website/i18n/en/code.json` به همه زبان‌ها زیر `website/i18n/<locale>/code.json` (به‌جز `en`).
- استفاده: `make translate_web_index` یا `make translate_web_index OPTS="--locales de,fr [--force]"`
- ملزومات: export کردن `OPENAI_API_KEY` (اختیاری: `OPENAI_MODEL=gpt-4o-mini`).
- رفتار: ساختار JSON را اعتبارسنجی می‌کند، جای‌نگهدارهای آکولادی را حفظ می‌کند، URLها را بدون تغییر نگه می‌دارد و در خطاهای اعتبارسنجی با بازخورد دوباره تلاش می‌کند.

---

#### web_build {#mt-web_build}

- هدف: ساخت سایت اسناد به `website/build`.
- استفاده: `make web_build OPTS="--locales en|de,en|all"` (یا تنظیم `BUILD_LOCALES="en de"`)
- داخلی‌ها: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- وابستگی‌ها: `npm ci` را در `website/` فقط اگر `website/node_modules/@docusaurus` وجود نداشته باشد اجرا می‌کند.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- هدف: بررسی لینک آفلاین-ایمن.
- استفاده: `make web_build_linkcheck OPTS="--locales en|all"`
- نکات: به `tmp_linkcheck_web_pages` می‌سازد؛ `baseUrl` صفحات GH را به `/` بازنویسی می‌کند؛ لینک‌های HTTP(S) دوردست را رد می‌کند.

#### web_build_local_preview {#mt-web_build_local_preview}

- هدف: پیش‌نمایش محلی gh‑pages با تست/بررسی لینک اختیاری.
- استفاده: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- رفتار: ابتدا سرور پیش‌نمایش Node را امتحان می‌کند (`scripts/preview-server.mjs`، پشتیبانی از `/__stop`)، در صورت لزوم به `python3 -m http.server` برمی‌گردد؛ روی 8080–8090 سرو می‌کند؛ PID در `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- هدف: ارسال `website/build` به شاخه `gh-pages`.
- استفاده: `make web_push_github`

نکته: `NPM=…` را تنظیم کنید تا مدیر بسته استفاده‌شده توسط Makefile را بازنویسی کنید (پیش‌فرض `npm` است).

---
