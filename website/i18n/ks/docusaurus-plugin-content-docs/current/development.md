---
id: development
title: 'ترقی'
sidebar_label: 'ترقی'
---

---

## ترقیاتی رہنما {#development-guide}

:::note صرف اَنگریٖزی ہٕی ترمیم کٔریو؛ تراجم خود بخود پھیلِو
صرف `website/docs` (اَنگریٖزی) تحت دستاویزات اَپڈیٹ کٔریو۔ `website/i18n/<locale>/…` تحت تراجم خودکار بنینٕد آسن تٔہ ہٕنئ یَتھی دستی ترمیم نہ کٔرمُت۔ لوکلائزڈ مواد تازہ کرنہ باپت ترجمہ ٹاسکس استعمال کٔریو (مثال، `make translate_web_docs_batch`)۔
:::

### پیشگی شرائط {#prerequisites}

- Node.js 22+ تٕہ npm (Node 22 سَتھ ٹیسٹ کٔرمت)
- Thunderbird 128 ESR یا تہ نوا تر (ہاتھو دِوان ٹیسٹنگ باپت)

---

### پروجیکٹ خاکہ (اعلی سطح) {#project-layout-high-level}

- روٹ: پیکجِنگ سکرپٹ `distribution_zip_packer.sh`, دستاویزا، سکرین شاٹس
- `sources/`: مرکزی ایڈ-آن کوڈ (بیک گراؤنڈ، آپشن/پوپ اَپ UI، مینی فیسٹس، آئکون)
- `tests/`: Vitest سیوٹ
- `website/`: Docusaurus دستاویزا (i18n `website/i18n/de/...` تحت)

---

### انسٹال تٔہ ٹولنگ {#install-and-tooling}

- روٹ ڈپینڈنسیاں انسٹال کٔریو: `npm ci`
- دستاویزا (اختیاری): `cd website && npm ci`
- ٹارگیٹس ڈھونڈٕیو: `make help`

---

### لائیو ڈیٖو (web‑ext run) {#live-dev-web-ext}

- Firefox ڈیسک ٹاپ منٛز تیز لوپ (صرف UI سموک ٹیسٹس):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird منٛز چلٲویو (MailExtensions باپت ترجیحی):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- مشورہ:
- Thunderbird ہُن Error Console کھٕلل چھٔویو (Tools → Developer Tools → Error Console)۔
- MV3 ایوینٹ پیٖج یمین بیکار حٕچ برطرف گژھان؛ کوڈ بدلٕونہ پتہ ایڈ-آن ریلود کٔریو، یِمْہ نہ تہ web‑ext خودکار ریلود کٔرنس دوٛیو۔
- بعضی صرف Firefox رویٖہ بدلٕن؛ ہمٲور Thunderbird منٛز API برابری چک کٔریو۔
- Thunderbird باینری راستہ (مثالہ):
- Linux: `thunderbird` (مثال، `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- پروفائل الگاو: روزانہ سیٹ اپ پٔر اثر نہ پٔوون باپت ترقی باپت الگ Thunderbird پروفائل استعمال کٔریو۔

---

### Make ٹارگیٹس (حرفی ترتیب) {#make-targets-alphabetical}

Makefile عام ڈیٖو فلوٗن معیاری بٔنتھ دِوان چھ۔ یِمْہ ویلھ چاہی `make help` چلٲویو یِمْہ ہر ٹارگٹ باپت اکھ سطر خلاصہ دِوان چھ۔

اشارہ: `make` بغیر ہندٕہ ٹارگٹ چلٲون پٕٹھ اکھ سادٕہ Whiptail مینیو کولن چھ یِمْہ منٛز ٹارگٹ چونہ یِمکن۔

| ٹارگٹ                                                    | اکھ سطرہ وضاحت                                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | مقامی build/preview آثار ہٹاو (tmp/, web-local-preview/, website/build/)۔                 |
| [`commit`](#mt-commit)                                   | فارمیٹ کٔریو، ٹیسٹ چلٲویو (i18n سمیت)، چینج لاگ اَپڈیٹ کٔریو، کمیٹ تٔہ پُش کٔریو۔         |
| [`eslint`](#mt-eslint)                                   | ESLint فلیٹ کنفیگ ذریعے چلٲویو (`npm run -s lint:eslint`)۔                                |
| [`help`](#mt-help)                                       | سٕرٕیہ ٹارگیٹس اکھ سطرہ ڈاکس سٕیت فہرست کٔریو (ترتیب گٔژھتھ)۔                             |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/` پٔر (عارضی manifest؛ ZIPs نادید کٔرنٕد؛ غیر مہلک)۔                |
| [`menu`](#mt-menu)                                       | اِنٹریکٹیٖو مینیو یِمْہ منٛز ٹارگٹ تٔہ اختیاری آرگیومنٹس چونہ۔                            |
| [`pack`](#mt-pack)                                       | ATN تٔہ LOCAL ZIPs بٔنٛدو (linter چلٲویو؛ packer سکرپٹ کال کٔریو)۔                        |
| [`prettier`](#mt-prettier)                               | ریپوزٹری جایہ جایہ فارمیٹ کٔریو (بدل لکھان چھ)۔                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier چیک موڈ منٛز (کونہ لکھ چھ نْہ)؛ ریفارمیٹ درکار آسہ تْہ ناکام گژھان چھ۔           |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` باپت عرف۔                                                                      |
| [`test`](#mt-test)                                       | Prettier (write)، ESLint، پتہ Vitest (کوریج اگر کنفیگر کرنٕتھ)۔                           |
| [`test_i18n`](#mt-test_i18n)                             | صرف i18n ٹیسٹس: ایڈ-آن placeholders/parity + ویب سائٹ parity۔                             |
| [`translate_app`](#mt-translation-app)                   | `translation_app` باپت عرف۔                                                               |
| [`translation_app`](#mt-translation-app)                 | ایپ UI سٹرنگہ `sources/_locales/en/messages.json` پٔرٕہ ترجمو کٔریو۔                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | ویب سائٹ دستاویزا OpenAI Batch API ذریعے ترجمو کٔریو (ترجیحی)۔                            |
| [`translate_web_docs_sync`](#mt-translation-web)         | ویب سائٹ دستاویزا ہم وقت ترجمو کٔریو (قدیمی، نْہ بیچ)۔                                    |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` باپت عرف۔                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | ہوم پیج/ناو بار/فوٹر UI ترجمو کٔریو (`website/i18n/en/code.json → .../<lang>/code.json`)۔ |
| [`web_build`](#mt-web_build)                             | دستاویزا `website/build` تک بٔنٛدو (`--locales` / `BUILD_LOCALES` سہار چھ)۔               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | آف لائن محفوظ لنک چیک (دورست HTTP[S] چھوڑان چھ)۔                                          |
| [`web_build_local_preview`](#mt-web_build_local_preview) | لوکل gh‑pages پریویو؛ 8080–8090 پٔر خودکار سٕرو؛ اختیاری ٹیسٹس/لنک-چیک۔                   |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` `gh-pages` برانچس پٔر پُش کٔریو۔                                          |

Syntax for options

- اختیارات پاس کرنہ باپت `make <command> OPTS="…"` استعمال کٔریو (quotes سِفارشہ)۔ ژٕندۍ یِمْہ ٹارگیٹس مثال استعمال دِوان چھ۔

--

-

#### لوکیل بِلڈ مشورے {#locale-build-tips}

- لوکیلاکھ اکھ ذیلی مجموعہ بٔنٛدو: `BUILD_LOCALES="en de"` سیٹ کٔریو یا `OPTS="--locales en,de"` ویب ٹارگیٹسس پاس کٔریو۔
- کھۄص لوکیل پریویو کٔریو: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`۔

---

### بِلڈ تٔہ پیکج {#build-and-package}

- ZIPs بٔنٛدو: `make pack`
- ریپو روٹ منٛز ATN تٔہ LOCAL ZIPs تیار گژھان (آثار دستی ترمیم نہ کٔریو)
- مشورہ: پیکج کاری پٔیش پہلے ورژن دِیہ دونوں `sources/manifest_ATN.json` تٔہ `sources/manifest_LOCAL.json` منٛز اَپڈیٹ کٔریو
- دستی انسٹال (ڈیٖو): Thunderbird → Tools → Add‑ons and Themes → گیئر → Install Add‑on From File… → تیار شُدہ ZIP چونہ

---

### ٹیسٹ {#test}

- پُرن سیوٹ: `make test` (Vitest)
- کوریج (اختیاری):
- `npm i -D @vitest/coverage-v8`
- `make test` چلٲویو؛ HTML رپورٹ باپت `coverage/index.html` کولیو
- صرف i18n: `make test_i18n` (UI keys/placeholders/titles + ویب سائٹ ہر-لوکیل ہر-ڈاک برابری id/title/sidebar_label چیکس سٕیت)

---

### ڈیبگِنگ تٔہ لاگ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- رن ٹائم منٛز verbose لاگ ٹاگل کٔریو:
- فعال: `messenger.storage.local.set({ debug: true })`
- غیرفعال: `messenger.storage.local.set({ debug: false })`
- جوابات لِکھان/روانٛہ کران دوران لاگ ظاہر گژھان

---

### دستاویزا (ویب سائٹ) {#docs-website}

- ڈیٖو سرور: `cd website && npm run start`
- سٹٖیٹِک سائٹ بٔنٛدو: `cd website && npm run build`
- Make ہم معنی (حرفی ترتیب): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- استعمال مثالہ:
- صرف EN، ٹیسٹس/لنک-چیک چھوڑٕیو، کٔہہ پُش نْہ: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- سٕریہ لوکیلاکھ، ٹیسٹس/لنک-چیک سٕیت، پتہ پُش: `make web_build_local_preview && make web_push_github`
- شائع کرنہ پٔیش پٔت آف لائن-محفوظ لنک چیک چلٲویو: `make web_build_linkcheck`۔
- i18n: انگریزی `website/docs/*.md` منٛز چھ؛ جرمن تراجم `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` منٛز
- تلاش: اگر CI منٛز Algolia DocSearch ماحول متغیّرات سیٹ آسہ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`)، تٔہ سائٹ Algolia سرچ استعمال کرِتھ؛ نمانہ حالَت منٛز لوکل سرچ پٔر واپس گژھان چھ۔ ہوم پیج پٔر، سرچ باکس کھولن باپت `/` یا `Ctrl+K` دبٲویو۔

---

#### عطیہ ریڈیریکٹ روٗٹ {#donate-redirect}

- `website/src/pages/donate.js`
- روٗٹ: `/donate` (تٔہ `/<locale>/donate`)
- رویہ:
- اگر موجودہ روٗٹ منٛز لوکیل آسہ (مثال، `/de/donate`)، تہ یتہ ہِیو استعمال
- وانٛچھ نْہ، `navigator.languages` نسبت کنفیگر کرنْہ آمت لوکیلاکھ پٔر بہترین میچ چونہ؛ ڈیفالٹ لوکیل پٔر واپس گژھیو
- ری ڈائریکٹ گژھان چھ:
- `en` → `/docs/donation`
- باقی → `/<locale>/docs/donation`
- baseUrl صحیح ہینڈلنگ باپت `useBaseUrl` استعمال گژھان چھ
- meta refresh + `noscript` لنک شامل چھ fallback ہس طور

---

---

#### پریویو مشورے {#preview-tips}

- Node پریویو صاف طریقہ ستھ بند کٔریو: `http://localhost:<port>/__stop` کولیو (`Local server started` پٔت چھ چھاپنٛمٕت)۔
- اگر MDX/JSX منٛز تصویرا لوڈ نْہ گو، سائٹ ہُند `baseUrl` احترام کرنہ باپت `useBaseUrl('/img/...')` استعمال کٔریو۔
- پریویو گاسہ گژھان پہلے؛ لنک چیک پتہ چلٲون چھ تٔہ بلاک نْہ کران (ٹوٹموٗت بیرونی لنکس پریویو نْہ تھمند)۔
- مثالی پریویو URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” پٔت چھ چھاپنٛمٕت)۔
- لنک-چیک منٛز بیرونی لنکس: کٕہہ بیرونی سایٹہ (مثلاً addons.thunderbird.net) خودکار کرالرنہ بلاک کران چھ تٔہ لنک چیک منٛز 403 دِہٕوان گژھان۔ پریویو ہِنز چھ شروع گژھان؛ یہ نظر انداز کرنس محفوظ چھ۔

---

#### ویب سائٹ ترجمو کٔریو {#translate-website}

تُہیہ کیاہ ترجمو کٔریو

- صرف ویب سائٹ UI: ہوم پیج، ناو بار، فوٹر، تٔہ دِیان UI سٹرنگز۔ دستاویز مواد ابھی تک صرف انگریزی رہان چھ۔

کُنہ ترمیم کٔریو

- `website/i18n/<locale>/code.json` ترمیم کٔریو (`en` بطور حوالہ استعمال کٔریو)۔ `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ژٕند placeholders بٲغیر بدلاونس محفوظ رکھیو۔

فائلس تیار کٔریو یا تازہ کٔریو

- سٕریہ لوکیلاکھ باپت گم شُدہ stubs بناویو: `npm --prefix website run i18n:stubs`
- انگریزی پٔرٕہ stubs اوور رائٹ کٔریو (نوا سٹرنگہ جمع کرنہ پٔت): `npm --prefix website run i18n:stubs:force`
- اکھی لوکیل باپت متبادل: `npx --prefix website docusaurus write-translations --locale <locale>`

ہوم پیج/ناو بار/فوٹر UI سٹرنگہ ترجمو کٔریو (OpenAI)

- کریڈنشیٖلز اکھ وار سیٹ کٔریو (شیل یا .env):
- `export OPENAI_API_KEY=sk-...`
- اختیاری: `export OPENAI_MODEL=gpt-4o-mini`
- اکھ وارِیہ (سٕریہ لوکیلاکھ، en چھوڑٕیو): `make translate_web_index`
- کھۄص لوکیلاکھ پٔر محدود کٔریو: `make translate_web_index OPTS="--locales de,fr"`
- موجودہ قدرا اوور رائٹ کٔریو: `make translate_web_index OPTS="--force"`

تصدیق تٔہ دوبارٕہ کوشش

- ترجمہ سکرپٹ JSON شِکل تصدیق کٔران چھ، curly-brace placeholders محفوظ رکھان چھ، تٔہ URLs بٲغیر بدلاونس یقینی بٔنٛدان چھ۔
- تصدیق ناکامی پٔر، موجودہ قدرا برقرار رکھنہ پٔیش پٔت 2 وار فیڈبیک سٕیت دوبارٕہ کوشش کٔران چھ۔

پنُن لوکیل پریویو کٔریو

- ڈیٖو سرور: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` تشریف گٔنٛیو

جمع کٔرنس

- ترمیم شُدہ `code.json` فائل(س) سٕیت اکھ PR کھولیو۔ بدلٕاو مرکوز رکھیو تٔہ جہاں ممکن اکھ تیز سکرین شاٹ شامل کٔریو۔

---

### سیکیورٹی تٔہ کنفیگریشن مشورے {#security-and-configuration-tips}

- `sources/manifest.json` کمیٹ نْہ کٔریو (بِلڈ عارضی طور بٔنٛداہ)
- اپڈیٹ چینل محفوظ رکھنہ باپت `browser_specific_settings.gecko.id` مستحکم رکھیو

---

### سیٹنگس داومیّت {#settings-persistence}

- سٹوریج: سٕریہ یوزر سیٹنگس `storage.local` منٛز چھ تٔہ ایڈ-آن اپڈیٹس پار برقرار رہان چھ۔
- انسٹال: ڈیفالٹس صرف ییلہ لاگو گژھان ییلہ کُن کُنجی سٔریری طرح گم آسن (undefined)۔
- اپڈیٹ: مائیگریشن صرف گم کنجا پُر کران چھ؛ موجودہ قدرا کبھی اوور رائٹ نْہ کران۔
- سکیما مارکر: `settingsVersion` (اس وکھ زِ `1`)۔
- کنجا تٔہ ڈیفالٹس:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- کوڈ: موٗل کٔریو `sources/background.js` → `initializeOrMigrateSettings()` تٔہ `SCHEMA_VERSION`۔

ڈیٖو ورک فلو (نْو سیٹنگ جمع کرنہ)

- `SCHEMA_VERSION` `sources/background.js` منٛز بَمپ کٔریو۔
- نْو کُنٛج + ڈیفالٹ `DEFAULTS` آبجیکٹ منز `initializeOrMigrateSettings()` منٛز جمع کٔریو۔
- ڈیفالٹس سیڈ کرنہ وقت “only-if-undefined” قوٗعدہ استعمال کٔریو؛ موجودہ قدرا اوور رائٹ نْہ کٔریو۔
- اگر سیٹنگ یوزر-وِزِبل آسِہ، تہ یتھ `sources/options.js` منٛز جوڑیو تٔہ لوکلائزڈ سٹرنگز جمع کٔریو۔
- ٹیسٹس جمع/ترتیب کٔریو (موٗل کٔریو `tests/background.settings.migration.test.js`)۔

دستی ٹیسٹنگ مشورے

- تازہ انسٹال نقل کٔریو: ایکسٹینشن ہُند ڈیٹا ڈائر صاف کٔریو یا نْو پروفائل سٔتھ شروع کٔریو۔
- اپڈیٹ نقل کٔریو: `settingsVersion` `storage.local` منٛز `0` بنٛاو تٔہ پُنٛہ لوڈ کٔریو؛ یتھ تصدیق کٔریو زِ موجودہ قدرا بےبدل رہن تٔہ صرف گم کنجا جمع گژھن۔

---

### مسئلہ حل {#troubleshooting}

- یقینی بٔنٛدو زِ Thunderbird 128 ESR چھ یا نوا تر۔
- رن ٹائم مسٔلنہ باپت Error Console استعمال کٔریو
- اگر محفوظہ سیٹنگہ صحیح طرح لاگو نہ لگن، Thunderbird پُنٛہ شروع کٔریو تٔہ دوبارٕہ کوشش کٔریو۔ (Thunderbird سیشنہ پٕر حالٔت cache کرٕتھ؛ پُنٛہ شروع کرن تازہ سیٹنگہ لوڈ تھئوان چھ)۔

---

### CI تٔہ کورِیج {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest چلٲون چھ کورِیج تھریشولڈ ژٔند (85% lines/functions/branches/statements)۔ اگر تھریشولڈ پورٕ نْہ گو، جاب ناکام چھ۔
- ورک فلو اکھ artifact `coverage-html` HTML رپورٹ سٕیت اَپلوڈ کٔران چھ؛ چلٕن صفۂ پٔر یِم ڈاونلوڈ کٔریو (Actions → latest run → Artifacts)۔

---

### حصہ داری {#contributing}

- برانچ/کمیٹ/PR ہدایتا باپت CONTRIBUTING.md دِٲنیو
- مشورہ: روزانہ پروفائل پٔر اثر نہ پٔوون باپت ٹیسٹنگ خاطر الگ Thunderbird ترقی پروفائل بناویو۔

---

### تراجم

- وٲری “all → all” ترجمہ جاب ہلٲون سست تٔہ مہنگا ہُند آسہ۔ اکھ ذیلی مجموعہ سٕتھ شروع کٔریو (مثلاً کٕہہ دستاویزا تٔہ 1–2 لوکیلاکھ)، نتیجہ جانٛچیو، پتہ وُسٲریو۔

---

- دوبارٕہ کوشش پالیسی: ترجمہ جاب 3 وار تام دوبارٕہ کوشش کران چھ API غلطیان پٔر اِکسی پُنٛہ رفتاری backoff سٕیت؛ موٗل کٔریو `scripts/translate_web_docs_batch.js` تٔہ `scripts/translate_web_docs_sync.js`۔

دستاویزا باپت سکرین شاٹس

- تصویرا `website/static/img/` تحت محفوظ رکھیو۔
- انہ MD/MDX منٛز `useBaseUrl('/img/<filename>')` ذریعے حوالہ دویو یِم پاتٕھ سائٹ ہند `baseUrl` سٕیت کام کٔرن۔
- `website/static/img/` تحت تصویرا جمع کٔرن یا ناؿ بدلٕاونہ پٔت، تصدیق کٔریو زِ سٕریہ حوالہ ہٕنزالہ حالہ `useBaseUrl('/img/…')` استعمال گژھان تٔہ لوکل پریویو منٛز رینٛڈَر گژھان۔
  فیو آئکونز

- کٕھاہ-سایز `favicon.ico` خودکار طور تیار گژھان چھ سٕریہ بِلڈ راستہ منٛز (Make + سکرپٹس) `website/scripts/build-favicon.mjs` ذریعے۔
- کٔہہ دستی قدم درکار نْہ چھ؛ `icon-*.png` اَپڈیٹ کٔرُن بس۔
  ریویو مشورہ

- ترجمہ شُدہ ڈاکس منٛز front‑matter `id` بےبدل رکھیو؛ صرف `title` تٔہ `sidebar_label` ترجمہ کٔریو ییلہ موجود آسہ۔

#### clean {#mt-clean}

- مقصد: مقامی build/preview آثار ہٹاونہ۔
- استعمال: `make clean`
- ہٹاون چھ (اگر موجود آسہ):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- مقصد: فارمیٹ، ٹیسٹ، چینج لاگ اَپڈیٹ، کمیٹ، تٔہ پُش۔
- استعمال: `make commit`
- تفصیل: Prettier (write)، `make test`, `make test_i18n` چلٲویو؛ سٹیجڈ فرق آسنہ وقت changelog ضمیمہ کٔریو؛ `origin/<branch>` پٔر پُش کٔریو۔

---

#### eslint {#mt-eslint}

- مقصد: ESLint فلیٹ کنفیگ ذریعے چلٲونہ۔
- استعمال: `make eslint`

---

#### help {#mt-help}

- مقصد: سٕریہ ٹارگیٹس اکھ سطرہ ڈاکس سٕیت فہرست کٔرنہ۔
- استعمال: `make help`

---

#### lint {#mt-lint}

- مقصد: `web-ext` استعمال کٔرتھ MailExtension lint کٔرنہ۔
- استعمال: `make lint`
- نوٹ: `sources/manifest_LOCAL.json` → `sources/manifest.json` عارضی کاپیاں بٔنٛدان چھ؛ تیار شُدہ ZIPs نظر انداز کران چھ؛ وارنِنگ پائپ لاین ناکام نْہ کٔران۔

---

#### menu {#mt-menu}

- مقصد: اِنٹریکٹیٖو مینیو یِمْہ منٛز Make ٹارگٹ تٔہ اختیاری آرگیومنٹس چونہ۔
- استعمال: `make` بغیر آرگیومنٹس چلٲویو۔
- نوٹ: اگر `whiptail` دستیاب نْہ آسہ، مینیو `make help` پٔر واپس گژھان چھ۔

---

#### pack {#mt-pack}

- مقصد: ATN تٔہ LOCAL ZIPs بٔنٛاونہ (`lint` پٔر انحصار چھ)۔
- استعمال: `make pack`
- مشورہ: پیکج کرنہ پٔیش پٔت ورژن دونوں `sources/manifest_*.json` منٛز بَمپ کٔریو۔

---

#### prettier {#mt-prettier}

- مقصد: ریپو جایہ جایہ فارمیٹ کٔرنہ۔
- استعمال: `make prettier`

#### prettier_check {#mt-prettier_check}

- مقصد: فارمیٹنگ تصدیق کٔرنہ (کونہ لکھ چھ نْہ)۔
- استعمال: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- مقصد: `prettier` باپت عرف۔
- استعمال: `make prettier_write`

---

#### test {#mt-test}

- مقصد: Prettier (write)، ESLint، پتہ Vitest چلٲونہ (کوریج اگر انسٹال آسِہ)۔
- استعمال: `make test`

#### test_i18n {#mt-test_i18n}

- مقصد: ایڈ-آن سٹرنگز تٔہ ویب سائٹ دستاویزا باپت i18n-مرکوز ٹیسٹس۔
- استعمال: `make test_i18n`
- چلان چھ: `npm run test:i18n` تٔہ `npm run -s test:website-i18n`۔

---

#### translate_app / translation_app {#mt-translation-app}

- مقصد: ایڈ-آن UI سٹرنگز EN پٔرٕہ باقی لوکیلاکھ منز ترجمو کٔرنہ۔
- استعمال: `make translation_app OPTS="--locales all|de,fr"`
- نوٹ: کُنٛجی ڈھانچہ تٔہ placeholders محفوظ رکھان چھ؛ `translation_app.log` منٛز لاگ کران چھ۔ سکرپٹ شکل: `node scripts/translate_app.js --locales …`۔

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- مقصد: ویب سائٹ دستاویزا `website/docs/*.md` پٔرٕہ `website/i18n/<locale>/...` منٛز ترجمو کٔرنہ۔
- ترجیحی: `translate_web_docs_batch` (OpenAI Batch API)
  - استعمال (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - قدیمی positional ہنزن قبول چھ: `OPTS="<doc|all> <lang|all>"`
- رویہ: JSONL بٔنٛدان چھ، اَپلوڈ کٔران، ہر 30s پٔر پول کٔران، نتیجہ ڈاونلوڈ کٔران، فائلس لکھان۔
- نوٹ: اکھ بیچ جاب 24 گھنٹا تام لیب سکتا ہے مکمل ہون (OpenAI ہندس بیچ وِنڈو مطابق)۔ کونسول ہر پول پٔر گزری تام دِہٕوان چھ۔
- Env: `OPENAI_API_KEY` (لازمی)، اختیاری `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ڈیفالٹ 24h)، `BATCH_POLL_INTERVAL_MS`۔
- قدیمی: `translate_web_docs_sync`
  - استعمال (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - قدیمی positional ہنزن قبول چھ: `OPTS="<doc|all> <lang|all>"`
- رویہ: ہر-جوڑا ہم وقت درخواستہ (کونہ بیچ یکجاوار نْہ)۔
- نوٹ: `OPTS` چھوڑنہ وقت اِنٹریکٹیٖو پرامپٹس دِہٕوان چھ۔ دونہ موڈن منٛز کوڈ بلاکس/اِن لائن کوڈ محفوظ رہان چھ تٔہ front‑matter `id` بےبدل رہان؛ لاگ `translation_web_batch.log` (batch) یا `translation_web_sync.log` (sync) منٛز۔

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- مقصد: ویب سائٹ UI سٹرنگز (ہوم پیج، ناو بار، فوٹر) `website/i18n/en/code.json` پٔرٕہ سٕریہ لوکیلاکھ منٛز `website/i18n/<locale>/code.json` تحت ترجمو کٔرنہ (`en` خارج کرُن)۔
- استعمال: `make translate_web_index` یا `make translate_web_index OPTS="--locales de,fr [--force]"`
- ضرورت: `OPENAI_API_KEY` اَیٖکسپوٗرٹ کٔریو (اختیاری: `OPENAI_MODEL=gpt-4o-mini`)۔
- رویہ: JSON ساخت تصدیق کٔران چھ، curly‑brace placeholders محفوظ رکھان چھ، URLs بےبدل رکھان چھ، تٔہ تصدیقی غلطیان پٔر فیڈبیک سٕیت دوبارٕہ کوشش کٔران چھ۔

---

#### web_build {#mt-web_build}

- مقصد: دستاویز سائٹ `website/build` پٔر بٔنٛاونہ۔
- استعمال: `make web_build OPTS="--locales en|de,en|all"` (یا `BUILD_LOCALES="en de"` سیٹ کٔریو)
- اَندرونیات: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`۔
- انحصارات: `npm ci` `website/` منٛز صرف ییلہ چلٲوان چھ ییلہ `website/node_modules/@docusaurus` گم آسہ۔

#### web_build_linkcheck {#mt-web_build_linkcheck}

- مقصد: آف لائن-محفوظ لنک چیک۔
- استعمال: `make web_build_linkcheck OPTS="--locales en|all"`
- نوٹ: `tmp_linkcheck_web_pages` پٔر بٔنٛدان چھ؛ GH Pages `baseUrl` `/` پٔر لکھی دان چھ؛ دورست HTTP(S) لنکس چھوڑان چھ۔

#### web_build_local_preview {#mt-web_build_local_preview}

- مقصد: لوکل gh‑pages پریویو اختیاری ٹیسٹس/لنک-چیک سٕیت۔
- استعمال: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- رویہ: اول Node پریویو سرور کوشش کٔران چھ (`scripts/preview-server.mjs`, `/__stop` سہار چھ)، پتہ `python3 -m http.server` پٔر واپس گژھان؛ 8080–8090 پٔر سٕرو گژھان؛ PID `web-local-preview/.server.pid` منٛز۔

#### web_push_github {#mt-web_push_github}

- مقصد: `website/build` `gh-pages` برانچس پٔر پُش کٔرنہ۔
- استعمال: `make web_push_github`

مشورہ: Makefile پاران استعمال شُدہ پیکج منیجر اوور رائڈ کرنہ باپت `NPM=…` سیٹ کٔریو (ڈیفالٹ `npm`)۔

---
