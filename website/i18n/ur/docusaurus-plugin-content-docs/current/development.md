---
id: development
title: 'ڈیولپمنٹ'
sidebar_label: 'ترقی'
---

---

## ڈویلپمنٹ گائیڈ {#development-guide}

:::note صرف انگریزی میں ترمیم کریں؛ ترجمے خود بخود پھیلتے ہیں
دستاویزی مواد میں ترمیم **صرف** `website/docs` (انگریزی) کے تحت کریں۔ `website/i18n/<locale>/…` کے تحت ترجمے خودکار طور پر بنتے ہیں اور انہیں دستی طور پر نہ چھیڑیں۔ مقامی مواد تازہ کرنے کے لیے ترجمہ ٹاسکس استعمال کریں (مثلاً `make translate_web_docs_batch`)۔
:::

### پیشگی ضروریات {#prerequisites}

- Node.js 22+ اور npm (Node 22 کے ساتھ آزمودہ)
- Thunderbird 128 ESR یا نیا (دستی ٹیسٹنگ کے لیے)

---

### پروجیکٹ کی ساخت (اعلی سطح) {#project-layout-high-level}

- روٹ: پیکیجنگ اسکرپٹ `distribution_zip_packer.sh`, ڈاکس، اسکرین شاٹس
- `sources/`: مین ایڈ اون کوڈ (بیک گراؤنڈ، آپشنز/پاپ اپ UI، مینفسٹس، آئیکنز)
- `tests/`: Vitest سوٹ
- `website/`: Docusaurus ڈاکس (i18n `website/i18n/de/...` کے تحت)

---

### انسٹال اور ٹولنگ {#install-and-tooling}

- روٹ ڈِپس انسٹال کریں: `npm ci`
- ڈاکس (اختیاری): `cd website && npm ci`
- ٹارگٹس دریافت کریں: `make help`

---

### لائیو ڈیو (web‑ext run) {#live-dev-web-ext}

- Firefox ڈیسک ٹاپ میں فوری لوپ (صرف UI اسموک ٹیسٹس):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird میں چلائیں (MailExtensions کے لیے ترجیحی):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ٹپس:
- Thunderbird کا Error Console کھلا رکھیں (Tools → Developer Tools → Error Console)۔
- MV3 ایونٹ پیجز عدم سرگرمی پر معطل ہو جاتے ہیں؛ کوڈ بدلنے کے بعد ایڈ اون ری لوڈ کریں، یا web‑ext کو خودکار ری لوڈ کرنے دیں۔
- کچھ صرف Firefox رویّے مختلف ہو سکتے ہیں؛ API parity کے لیے ہمیشہ Thunderbird میں تصدیق کریں۔
- Thunderbird بائنری راستے (مثالیں):
- Linux: `thunderbird` (مثلاً `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- پروفائل الگ تھلگ رکھنا: اپنے روزمرہ سیٹ اپ پر اثر سے بچنے کے لیے ڈویلپمنٹ کے لیے الگ Thunderbird پروفائل استعمال کریں۔

---

### میک ٹارگٹس (حروفِ تہجی کے مطابق) {#make-targets-alphabetical}

Makefile عام ڈیو فلو کو معیاری بناتا ہے۔ ہر ہدف کی ایک لائن خلاصہ کے لیے جب چاہیں `make help` چلائیں۔

مشورہ: کسی ہدف کے بغیر `make` چلانے سے ایک سادہ Whiptail مینو کھلتا ہے جس میں سے ہدف منتخب کریں۔

| ہدف                                                      | ایک لائن کی وضاحت                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | مقامی بلڈ/پری ویو آرٹی فیکٹس ہٹائیں (tmp/, web-local-preview/, website/build/)۔             |
| [`commit`](#mt-commit)                                   | فارمیٹ کریں، ٹیسٹس چلائیں (بشمول i18n)، چینج لاگ اپڈیٹ کریں، کمٹ اور پش کریں۔               |
| [`eslint`](#mt-eslint)                                   | ESLint فلیٹ کنفیگ کے ذریعے چلائیں (`npm run -s lint:eslint`)۔                               |
| [`help`](#mt-help)                                       | تمام ٹارگٹس ایک لائن ڈاکس کے ساتھ فہرست کریں (ترتیب وار)۔                                   |
| [`lint`](#mt-lint)                                       | `sources/` پر web‑ext lint (عارضی مینفسٹ؛ ZIPs کو نظر انداز؛ غیر مہلک)۔                     |
| [`menu`](#mt-menu)                                       | انٹرایکٹو مینو جس سے ہدف اور اختیاری آرگیومنٹس منتخب کریں۔                                  |
| [`pack`](#mt-pack)                                       | ATN اور LOCAL ZIPs بنائیں (لنٹر چلاتا ہے؛ پیکر اسکرپٹ کو کال کرتا ہے)۔                      |
| [`prettier`](#mt-prettier)                               | ریپوزٹری کو وہیں فارمیٹ کریں (تبدیلیاں لکھتا ہے)۔                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier چیک موڈ میں (کوئی لکھائی نہیں)؛ دوبارہ فارمیٹ درکار ہو تو فیل ہو گا۔               |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` کا عرف۔                                                                          |
| [`test`](#mt-test)                                       | Prettier (write)، پھر ESLint، پھر Vitest (اگر کنفیگرڈ ہو تو کوریج)۔                         |
| [`test_i18n`](#mt-test_i18n)                             | صرف i18n ٹیسٹس: ایڈ اون پلیس ہولڈرز/پیراٹی + ویب سائٹ پیراٹی۔                               |
| [`translate_app`](#mt-translation-app)                   | `translation_app` کا عرف۔                                                                   |
| [`translation_app`](#mt-translation-app)                 | ایپ UI سٹرنگز کا ترجمہ `sources/_locales/en/messages.json` سے۔                              |
| [`translate_web_docs_batch`](#mt-translation-web)        | ویب سائٹ ڈاکس کا ترجمہ OpenAI Batch API کے ذریعے (ترجیحی)۔                                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | ویب سائٹ ڈاکس کا متزامناً ترجمہ (لیگیسی، نان بیچ)۔                                          |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` کا عرف۔                                                             |
| [`translation_web_index`](#mt-translation_web_index)     | ہوم پیج/نیویگیشن بار/فُٹر UI کا ترجمہ (`website/i18n/en/code.json → .../<lang>/code.json`)۔ |
| [`web_build`](#mt-web_build)                             | ڈاکس کو `website/build` پر بلڈ کریں (`--locales` / `BUILD_LOCALES` سپورٹ)۔                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | آف لائن محفوظ لنک چیک (دور دراز HTTP[S] چھوڑتا ہے)۔                                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | مقامی gh‑pages پری ویو؛ 8080–8090 پر خودکار سرور؛ اختیاری ٹیسٹس/لنک چیک۔                    |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` کو `gh-pages` برانچ پر پش کریں۔                                             |

اختیارات کے لیے ترکیب

- اختیارات دینے کے لیے `make <command> OPTS="…"` استعمال کریں (قوسین تجویز کردہ)۔ نیچے ہر ہدف کے ساتھ مثال استعمال دکھایا گیا ہے۔

--

-

#### لوکیل بلڈ تجاویز {#locale-build-tips}

- چند لوکیلز ہی بلڈ کریں: `BUILD_LOCALES="en de"` سیٹ کریں یا `OPTS="--locales en,de"` ویب ٹارگٹس کو دیں۔
- کسی خاص لوکیل کا پری ویو: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`۔

---

### بلڈ اور پیکیج {#build-and-package}

- ZIPs بنائیں: `make pack`
- ریپو روٹ میں ATN اور LOCAL ZIPs تیار ہوتے ہیں (آرٹی فیکٹس ہاتھ سے نہ بدلیں)
- ٹِپ: پیکیجنگ سے پہلے ورژن `sources/manifest_ATN.json` اور `sources/manifest_LOCAL.json` دونوں میں اپڈیٹ کریں
- دستی انسٹال (ڈیو): Thunderbird → Tools → Add‑ons and Themes → گیئر → Install Add‑on From File… → بنے ہوئے ZIP کا انتخاب کریں

---

### ٹیسٹ {#test}

- مکمل سوٹ: `make test` (Vitest)
- کوریج (اختیاری):
- `npm i -D @vitest/coverage-v8`
- `make test` چلائیں؛ HTML رپورٹ کے لیے `coverage/index.html` کھولیں
- صرف i18n: `make test_i18n` (UI keys/placeholders/titles + ویب سائٹ فی لوکیل فی ڈاک پیراٹی، id/title/sidebar_label چیکس کے ساتھ)

---

### ڈیبگنگ اور لاگز {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- رن ٹائم پر تفصیلی لاگز ٹوگل کریں:
- فعال کریں: `messenger.storage.local.set({ debug: true })`
- غیر فعال کریں: `messenger.storage.local.set({ debug: false })`
- جوابات کمپوز/بھیجتے وقت لاگز ظاہر ہوتے ہیں

---

### ڈاکس (ویب سائٹ) {#docs-website}

- ڈیو سرور: `cd website && npm run start`
- سٹیٹک سائٹ بلڈ کریں: `cd website && npm run build`
- میک متبادلات (حروفِ تہجی کے مطابق): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- استعمال کی مثالیں:
- صرف EN، ٹیسٹس/لنک چیک چھوڑیں، کوئی پش نہیں: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- تمام لوکیلز، ٹیسٹس/لنک چیک کے ساتھ، پھر پش: `make web_build_local_preview && make web_push_github`
- شائع کرنے سے پہلے، آف لائن محفوظ لنک چیک چلائیں: `make web_build_linkcheck`۔
- i18n: انگریزی `website/docs/*.md` میں ہے؛ جرمن ترجمے `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` میں
- تلاش: اگر Algolia DocSearch ماحول ویریبلز CI میں سیٹ ہوں (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) تو سائٹ Algolia سرچ استعمال کرتی ہے؛ ورنہ مقامی سرچ پرFallback ہوتا ہے۔ ہوم پیج پر، سرچ باکس کھولنے کے لیے `/` یا `Ctrl+K` دبائیں۔

---

#### عطیہ ری ڈائریکٹ روٹ {#donate-redirect}

- `website/src/pages/donate.js`
- روٹ: `/donate` (اور `/<locale>/donate`)
- برتاؤ:
- اگر موجودہ روٹ میں لوکیل ہو (مثلاً `/de/donate`) تو اسی کو استعمال کریں
- ورنہ `navigator.languages` اور کنفیگرڈ لوکیلز میں سے بہترین میچ چنیں؛ اور ڈیفالٹ لوکیل پرFallback کریں
- ری ڈائریکٹ ہوتا ہے:
- `en` → `/docs/donation`
- دیگر → `/<locale>/docs/donation`
- درست baseUrl ہینڈلنگ کے لیے `useBaseUrl` استعمال کرتا ہے
- بیک اپ کے طور پر meta refresh + `noscript` لنک شامل ہے

---

---

#### پری ویو ٹپس {#preview-tips}

- Node پری ویو صاف طریقے سے روکیں: `http://localhost:<port>/__stop` کھولیں (`Local server started` کے بعد چھپا ہوتا ہے)۔
- اگر MDX/JSX میں تصویریں لوڈ نہ ہوں، تو سائٹ کے `baseUrl` کا احترام کرنے کے لیے `useBaseUrl('/img/...')` استعمال کریں۔
- پری ویو پہلے شروع ہوتا ہے؛ لنک چیک بعد میں چلتا ہے اور بلاکنگ نہیں (ٹوٹی بیرونی لنکس پری ویو نہیں روکتے)۔
- مثال پری ویو URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” کے بعد پرنٹ ہوتا ہے)۔
- لنک چیک میں بیرونی لنکس: کچھ بیرونی سائٹس (مثلاً addons.thunderbird.net) خودکار کراؤلرز کو بلاک کرتی ہیں اور لنک چیکس میں 403 دکھا سکتی ہیں۔ پری ویو پھر بھی شروع ہوگا؛ یہ نظر انداز کرنے کے لیے محفوظ ہیں۔

---

#### ویب سائٹ کا ترجمہ کریں {#translate-website}

آپ کیا ترجمہ کر سکتے ہیں

- صرف ویب سائٹ UI: ہوم پیج، نیویگیشن بار، فُٹر، اور دیگر UI سٹرنگز۔ ڈاکس مواد فی الحال صرف انگریزی میں رہے گا۔

کہاں ترمیم کریں

- `website/i18n/<locale>/code.json` میں ترمیم کریں (`en` کو بطور حوالہ استعمال کریں)۔ `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` جیسے پلیس ہولڈرز جوں کے توں رکھیں۔

فائلیں بنائیں یا تازہ کریں

- تمام لوکیلز کے لیے مسنگ سٹبز بنائیں: `npm --prefix website run i18n:stubs`
- نئی سٹرنگز شامل کرنے کے بعد انگریزی سے سٹبز اوور رائٹ کریں: `npm --prefix website run i18n:stubs:force`
- ایک سنگل لوکیل کے لیے متبادل: `npx --prefix website docusaurus write-translations --locale <locale>`

ہوم پیج/نیویگیشن بار/فُٹر UI سٹرنگز ترجمہ کریں (OpenAI)

- ایک بار اسناد سیٹ کریں (شیل یا .env):
- `export OPENAI_API_KEY=sk-...`
- اختیاری: `export OPENAI_MODEL=gpt-4o-mini`
- ایک ہی رَن (تمام لوکیلز، en چھوڑیں): `make translate_web_index`
- مخصوص لوکیلز تک محدود کریں: `make translate_web_index OPTS="--locales de,fr"`
- موجودہ اقدار اوور رائٹ کریں: `make translate_web_index OPTS="--force"`

تصدیق اور دوبارہ کوششیں

- ترجمہ اسکرپٹ JSON ساخت کی توثیق کرتا ہے، curly‑brace پلیس ہولڈرز برقرار رکھتا ہے، اور URLs کو غیر تبدیل شدہ یقینی بناتا ہے۔
- توثیق ناکام ہونے پر، یہ رائے کے ساتھ 2 بار تک دوبارہ کوشش کرتا ہے، پھر موجودہ اقدار برقرار رکھتا ہے۔

اپنا لوکیل پری ویو کریں

- ڈیو سرور: `npm --prefix website run start`
- ملاحظہ کریں: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

جمع کرانا

- ترمیم شدہ `code.json` فائل(ز) کے ساتھ PR کھولیں۔ تبدیلیاں مرکوز رکھیں اور ممکن ہو تو ایک فوری اسکرین شاٹ شامل کریں۔

---

### سیکیورٹی اور کنفیگریشن تجاویز {#security-and-configuration-tips}

- `sources/manifest.json` کو کمٹ نہ کریں (بلڈ عارضی طور پر بناتا ہے)
- اپڈیٹ چینل برقرار رکھنے کے لیے `browser_specific_settings.gecko.id` کو مستحکم رکھیں

---

### سیٹنگز کی پائیداری {#settings-persistence}

- اسٹوریج: تمام یوزر سیٹنگز `storage.local` میں رہتی ہیں اور ایڈ اون اپڈیٹس کے دوران قائم رہتی ہیں۔
- انسٹال: ڈیفالٹس صرف تب لاگو ہوتے ہیں جب کوئی کلید بالکل غیر موجود (undefined) ہو۔
- اپڈیٹ: مائیگریشن صرف مسنگ کیز بھرتی ہے؛ موجودہ اقدار کبھی اوور رائٹ نہیں ہوتیں۔
- اسکیما مارکر: `settingsVersion` (فی الحال `1`)۔
- کلیدیں اور طے شدہ اقدار:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- کوڈ: دیکھیں `sources/background.js` → `initializeOrMigrateSettings()` اور `SCHEMA_VERSION`۔

ڈویلپر ورک فلو (نئی سیٹنگ شامل کرنا)

- `sources/background.js` میں `SCHEMA_VERSION` بڑھائیں۔
- `initializeOrMigrateSettings()` میں `DEFAULTS` آبجیکٹ میں نئی کلید + ڈیفالٹ شامل کریں۔
- ڈیفالٹس سیڈ کرتے وقت "only-if-undefined" اصول استعمال کریں؛ موجودہ اقدار اوور رائٹ نہ کریں۔
- اگر سیٹنگ یوزر کے سامنے ہے، تو اسے `sources/options.js` میں وائر کریں اور مقامی سٹرنگز شامل کریں۔
- ٹیسٹس شامل/ایڈجسٹ کریں (دیکھیں `tests/background.settings.migration.test.js`)۔

دستی ٹیسٹنگ ٹپس

- بالکل نئی انسٹال کی نقالی کریں: ایکسٹینشن کا ڈیٹا ڈائرکٹری صاف کریں یا نیا پروفائل شروع کریں۔
- اپڈیٹ کی نقالی کریں: `storage.local` میں `settingsVersion` کو `0` پر سیٹ کریں اور ری لوڈ کریں؛ تصدیق کریں کہ موجودہ اقدار غیر تبدیل شدہ رہیں اور صرف مسنگ کیز شامل ہوں۔

---

### مسائل کا حل {#troubleshooting}

- یقین کریں کہ Thunderbird 128 ESR یا نیا ہے
- رن ٹائم مسائل کے لیے Error Console استعمال کریں
- اگر محفوظ سیٹنگز صحیح طرح لاگو نہ لگیں، Thunderbird ری اسٹارٹ کریں اور دوبارہ کوشش کریں۔ (Thunderbird سیشنز کے بیچ کچھ حالت کیش کر سکتا ہے؛ ری اسٹارٹ تازہ سیٹنگز لوڈ کرنا یقینی بناتا ہے۔)

---

### CI اور کوریج {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest کو کوریج تھریش ہولڈز (85% lines/functions/branches/statements) کے ساتھ چلاتا ہے۔ اگر تھریش ہولڈز پورے نہ ہوں تو جاب فیل ہو جاتا ہے۔
- ورک فلو ایک آرٹی فیکٹ `coverage-html` HTML رپورٹ کے ساتھ اپلوڈ کرتا ہے؛ رَن پیج سے ڈاؤن لوڈ کریں (Actions → تازہ ترین رَن → Artifacts)۔

---

### شراکت {#contributing}

- برانچ/کمٹ/PR رہنما خطوط کے لیے CONTRIBUTING.md دیکھیں
- ٹِپ: ٹیسٹنگ کے لیے الگ Thunderbird ڈویلپمنٹ پروفائل بنائیں تاکہ روزمرہ پروفائل متاثر نہ ہو۔

---

### ترجمے

- بڑے “all → all” ترجمہ جابز سست اور مہنگے ہو سکتے ہیں۔ پہلے ایک ذیلی حصہ (مثلاً چند ڈاکس اور 1–2 لوکیلز) سے شروع کریں، نتیجہ دیکھیں، پھر توسیع کریں۔

---

- دوبارہ کوشش کی پالیسی: ترجمہ جابز API ایررز پر زیادہ سے زیادہ 3 بار ایکسپونینشل بیک آف کے ساتھ دوبارہ کوشش کرتے ہیں؛ دیکھیں `scripts/translate_web_docs_batch.js` اور `scripts/translate_web_docs_sync.js`۔

دستاویزات کے لیے اسکرین شاٹس

- تصاویر `website/static/img/` کے تحت محفوظ کریں۔
- انہیں MD/MDX میں `useBaseUrl('/img/<filename>')` کے ذریعے حوالہ دیں تاکہ راستے سائٹ کے `baseUrl` کے ساتھ کام کریں۔
- `website/static/img/` کے تحت تصاویر شامل یا نیا نام دینے کے بعد، تصدیق کریں کہ تمام حوالہ جات اب بھی `useBaseUrl('/img/…')` استعمال کرتے ہیں اور مقامی پری ویو میں رینڈر ہوتے ہیں۔
  فیوی آئیکنز

- ملٹی سائز `favicon.ico` خودکار طور پر تمام بلڈ راستوں (Make + اسکرپٹس) میں `website/scripts/build-favicon.mjs` کے ذریعے تیار ہوتا ہے۔
- کوئی دستی مرحلہ درکار نہیں؛ `icon-*.png` اپڈیٹ کرنا کافی ہے۔
  جائزہ مشورہ

- ترجمہ شدہ ڈاکس میں فرنٹ میٹر `id` غیر تبدیل شدہ رکھیں؛ جہاں موجود ہو صرف `title` اور `sidebar_label` ترجمہ کریں۔

#### clean {#mt-clean}

- مقصد: مقامی بلڈ/پری ویو آرٹی فیکٹس ہٹانا۔
- استعمال: `make clean`
- یہ ہٹاتا ہے (اگر موجود ہوں):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- مقصد: فارمیٹ، ٹیسٹ، چینج لاگ اپڈیٹ، کمٹ، اور پش۔
- استعمال: `make commit`
- تفصیل: Prettier (write)، `make test`, `make test_i18n` چلاتا ہے؛ جب staged اختلافات ہوں تو چینج لاگ جوڑتا ہے؛ `origin/<branch>` پر پش کرتا ہے۔

---

#### eslint {#mt-eslint}

- مقصد: فلیٹ کنفیگ کے ذریعے ESLint چلانا۔
- استعمال: `make eslint`

---

#### help {#mt-help}

- مقصد: تمام ٹارگٹس ایک لائن ڈاکس کے ساتھ فہرست کرنا۔
- استعمال: `make help`

---

#### lint {#mt-lint}

- مقصد: `web-ext` استعمال کرتے ہوئے MailExtension کو لنٹ کرنا۔
- استعمال: `make lint`
- نوٹس: عارضی طور پر `sources/manifest_LOCAL.json` → `sources/manifest.json` کاپی کرتا ہے؛ بنے ہوئے ZIPs نظر انداز؛ وارننگز پائپ لائن فیل نہیں کرتیں۔

---

#### menu {#mt-menu}

- مقصد: Make ٹارگٹ اور اختیاری آرگیومنٹس منتخب کرنے کے لیے انٹرایکٹو مینو۔
- استعمال: بغیر آرگیومنٹس کے `make` چلائیں۔
- نوٹس: اگر `whiptail` دستیاب نہ ہو، تو مینو `make help` پرFallback کرتا ہے۔

---

#### pack {#mt-pack}

- مقصد: ATN اور LOCAL ZIPs بنانا (`lint` پر منحصر)۔
- استعمال: `make pack`
- ٹِپ: پیکیجنگ سے پہلے دونوں `sources/manifest_*.json` میں ورژنز بڑھائیں۔

---

#### prettier {#mt-prettier}

- مقصد: ریپو کو وہیں فارمیٹ کرنا۔
- استعمال: `make prettier`

#### prettier_check {#mt-prettier_check}

- مقصد: فارمیٹنگ کی تصدیق (کوئی لکھائی نہیں)۔
- استعمال: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- مقصد: `prettier` کا عرف۔
- استعمال: `make prettier_write`

---

#### test {#mt-test}

- مقصد: Prettier (write)، پھر ESLint، پھر Vitest (اگر انسٹال ہو تو کوریج) چلانا۔
- استعمال: `make test`

#### test_i18n {#mt-test_i18n}

- مقصد: ایڈ اون سٹرنگز اور ویب سائٹ ڈاکس کے لیے i18n مرکوز ٹیسٹس۔
- استعمال: `make test_i18n`
- چلاتا ہے: `npm run test:i18n` اور `npm run -s test:website-i18n`۔

---

#### translate_app / translation_app {#mt-translation-app}

- مقصد: ایڈ اون UI سٹرنگز کا EN سے دیگر لوکیلز میں ترجمہ۔
- استعمال: `make translation_app OPTS="--locales all|de,fr"`
- نوٹس: کلید ساخت اور پلیس ہولڈرز برقرار رکھتا ہے؛ `translation_app.log` میں لاگ کرتا ہے۔ اسکرپٹ فارم: `node scripts/translate_app.js --locales …`۔

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- مقصد: ویب سائٹ ڈاکس کا ترجمہ `website/docs/*.md` سے `website/i18n/<locale>/...` میں۔
- ترجیحی: `translate_web_docs_batch` (OpenAI Batch API)
  - استعمال (فلگز): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - لیگیسی پوزیشنل اب بھی قبول: `OPTS="<doc|all> <lang|all>"`
- برتاؤ: JSONL بناتا ہے، اپلوڈ، ہر 30s پر پول، نتائج ڈاؤن لوڈ، فائلیں لکھتا ہے۔
- نوٹ: بیچ جاب کو مکمل ہونے میں 24 گھنٹے لگ سکتے ہیں (OpenAI کے بیچ ونڈو کے مطابق)۔ ہر پول پر کنسول گزرا وقت دکھاتا ہے۔
- ماحول: `OPENAI_API_KEY` (لازمی)، اختیاری `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ڈیفالٹ 24h), `BATCH_POLL_INTERVAL_MS`۔
- لیگیسی: `translate_web_docs_sync`
  - استعمال (فلگز): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - لیگیسی پوزیشنل اب بھی قبول: `OPTS="<doc|all> <lang|all>"`
- برتاؤ: فی جوڑا متزامن درخواستیں (کوئی بیچ ایگریگیشن نہیں)۔
- نوٹس: جب `OPTS` چھوڑ دیا جائے تو انٹرایکٹو پرامپٹس۔ دونوں موڈز کوڈ بلاکس/ان لائن کوڈ برقرار رکھتے ہیں اور فرنٹ میٹر `id` غیر تبدیل شدہ رکھتے ہیں؛ لاگز `translation_web_batch.log` (بیچ) یا `translation_web_sync.log` (سنک) میں۔

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- مقصد: ویب سائٹ UI سٹرنگز (ہوم پیج، نیویگیشن بار، فُٹر) کا ترجمہ `website/i18n/en/code.json` سے تمام لوکیلز میں `website/i18n/<locale>/code.json` کے تحت (سوائے `en`)۔
- استعمال: `make translate_web_index` یا `make translate_web_index OPTS="--locales de,fr [--force]"`
- تقاضے: `OPENAI_API_KEY` ایکسپورٹ کریں (اختیاری: `OPENAI_MODEL=gpt-4o-mini`)۔
- برتاؤ: JSON ساخت کی توثیق کرتا ہے، curly‑brace پلیس ہولڈرز برقرار رکھتا ہے، URLs غیر تبدیل شدہ رکھتا ہے، اور توثیقی ایررز پر رائے کے ساتھ دوبارہ کوشش کرتا ہے۔

---

#### web_build {#mt-web_build}

- مقصد: ڈاکس سائٹ کو `website/build` پر بلڈ کرنا۔
- استعمال: `make web_build OPTS="--locales en|de,en|all"` (یا `BUILD_LOCALES="en de"` سیٹ کریں)
- اندرونیات: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`۔
- انحصارات: صرف تب `website/` میں `npm ci` چلاتا ہے جب `website/node_modules/@docusaurus` غائب ہو۔

#### web_build_linkcheck {#mt-web_build_linkcheck}

- مقصد: آف لائن محفوظ لنک چیک۔
- استعمال: `make web_build_linkcheck OPTS="--locales en|all"`
- نوٹس: `tmp_linkcheck_web_pages` پر بلڈ کرتا ہے؛ GH Pages کے `baseUrl` کو `/` میں ری رائٹ کرتا ہے؛ ریموٹ HTTP(S) لنکس چھوڑ دیتا ہے۔

#### web_build_local_preview {#mt-web_build_local_preview}

- مقصد: اختیاری ٹیسٹس/لنک چیک کے ساتھ مقامی gh‑pages پری ویو۔
- استعمال: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- برتاؤ: پہلے Node پری ویو سرور کی کوشش کرتا ہے (`scripts/preview-server.mjs`, `/__stop` سپورٹ)، پھر `python3 -m http.server` پرFallback؛ 8080–8090 پر سرور؛ PID `web-local-preview/.server.pid` پر۔

#### web_push_github {#mt-web_push_github}

- مقصد: `website/build` کو `gh-pages` برانچ پر پش کرنا۔
- استعمال: `make web_push_github`

ٹِپ: Makefile کے استعمال کردہ پیکیج منیجر کو اوور رائڈ کرنے کے لیے `NPM=…` سیٹ کریں (ڈیفالٹ `npm`)۔

---
