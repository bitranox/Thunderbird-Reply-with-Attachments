---
id: development
title: 'ترقي'
sidebar_label: 'ترقي'
---

---

## ڊولپمينٽ گائيڊ {#development-guide}

:::note صرف انگريزي ايڊٽ ڪريو؛ ترجما پاڻمرادو پکڙجن ٿا
دستاويزڪاري صرف `website/docs` (انگريزي) هيٺ تازه ڪريو. `website/i18n/<locale>/…` هيٺ ترجما جنريٽ ٿين ٿا ۽ کين هٿ سان ايڊٽ نه ڪيو. لوڪلائيزيشن کي تازي ڪرڻ لاءِ ترجمي وارا ٽاسڪ استعمال ڪريو (جهڙوڪ `make translate_web_docs_batch`).
:::

### پيشگي گهرجون {#prerequisites}

- Node.js 22+ ۽ npm (Node 22 سان ٽيسٽ ٿيل)
- Thunderbird 128 ESR يا نئون (دستي ٽيسٽنگ لاءِ)

---

### پروجيڪٽ لي آئوٽ (اعليٰ سطح) {#project-layout-high-level}

- Root: پيڪيجنگ اسڪرپٽ `distribution_zip_packer.sh`, ڊاڪس، اسڪرين شاٽس
- `sources/`: مکيه ايڊ آن ڪوڊ (پس منظر، آپشنز/پاپ اپ UI، ميني فيسٽس، آئڪنز)
- `tests/`: Vitest سوٽ
- `website/`: Docusaurus ڊاڪس (i18n `website/i18n/de/...` هيٺ)

---

### انسٽال ۽ ٽولنگ {#install-and-tooling}

- روٽ ڊپس انسٽال ڪريو: `npm ci`
- ڊاڪس (اختياري): `cd website && npm ci`
- ٽارگيٽ ڳوليو: `make help`

---

### لائيو ڊولپ (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop ۾ تيز لوپ (صرف UI سموڪ ٽيسٽ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird ۾ هلائڻ (MailExtensions لاءِ ترجيحي):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ٽِپس:
- Thunderbird جو Error Console کليل رکو (Tools → Developer Tools → Error Console).
- MV3 ايونٽ پيجز غيرفعال ٿيڻ تي معطل ٿين ٿا؛ ڪوڊ ۾ تبديليءَ کان پوءِ ايڊ آن ٻيهر لوڊ ڪريو، يا web‑ext کي پاڻمرادو ري لوڊ ڪرڻ ڏيو.
- ڪجهه صرف Firefox وارا رويا مختلف ٿي سگهن ٿا؛ API برابري لاءِ هميشه Thunderbird ۾ تصديق ڪريو.
- Thunderbird باينري پاتھس (مثال):
- Linux: `thunderbird` (مثال طور، `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- پروفائيل الڳ رکڻ: پنهنجي روزاني سيٽ اپ تي اثر کان بچڻ لاءِ ڊولپمينٽ لاءِ ڌار Thunderbird پروفائيل استعمال ڪريو.

---

### ميڪ ٽارگيٽ (ابجد وار) {#make-targets-alphabetical}

Makefile عام ڊولپ وهڪرن کي معياري بڻائي ٿي. هر ٽارگيٽ جو هڪ سٽ وارو خلاصو ڏسڻ لاءِ ڪنهن به وقت `make help` هلايو.

ٽِپ: `make` بغير ٽارگيٽ جي هلائڻ سان سادو Whiptail مينيو کلي ٿو جنهن مان ٽارگيٽ چونڊي سگهجي ٿو.

| ٽارگيٽ                                                   | هڪ سٽ وارو بيان                                                                           |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | مقامي بِلڊ/پريويو آرٽيفيڪٽس (tmp/, web-local-preview/, website/build/) هٽايو.             |
| [`commit`](#mt-commit)                                   | فارميٽ، ٽيسٽ هلاءِ (i18n سميت)، چينج لاگ اپڊيٽ، ڪميٽ ۽ پش.                                |
| [`eslint`](#mt-eslint)                                   | ESLint هلايو فليٽ ڪنفيگ ذريعي (`npm run -s lint:eslint`).                                 |
| [`help`](#mt-help)                                       | سڀ ٽارگيٽ هڪ سٽ جي ڊاڪس سان (ترتيب وار) لسٽ ڪريو.                                         |
| [`lint`](#mt-lint)                                       | `sources/` تي web‑ext lint (وقتي ميني فيسٽ؛ ZIPs نظرانداز؛ غير جان ليوا).                 |
| [`menu`](#mt-menu)                                       | ٽارگيٽ ۽ اختياري آرگومينٽ چونڊڻ لاءِ انٽرايڪٽو مينيو.                                     |
| [`pack`](#mt-pack)                                       | ATN ۽ LOCAL ZIPs بِلڊ ڪريو (لنٽر هلائي؛ پيڪر اسڪرپٽ کي سڏي).                              |
| [`prettier`](#mt-prettier)                               | ريپوزيٽري کي جاءِ تي فارميٽ ڪريو (لکي ڇڏيندو).                                            |
| [`prettier_check`](#mt-prettier_check)                   | Prettier چيڪ موڊ ۾ (بغير لکندڙ)؛ ٻيهر فارميٽ جي ضرورت هجي ته ناڪام ٿئي.                   |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` جو عرف.                                                                        |
| [`test`](#mt-test)                                       | Prettier (write)، ESLint، پوءِ Vitest (جيڪڏهن ڪوريج ڳنڍيل آهي).                           |
| [`test_i18n`](#mt-test_i18n)                             | صرف i18n ٽيسٽ: ايڊ آن placeholders/parity + ويب سائيٽ parity.                             |
| [`translate_app`](#mt-translation-app)                   | `translation_app` جو عرف.                                                                 |
| [`translation_app`](#mt-translation-app)                 | ايپ UI اسٽِرِنگز `sources/_locales/en/messages.json` مان ترجمو ڪريو.                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | ويب سائيٽ ڊاڪس OpenAI Batch API ذريعي ترجمو ڪريو (ترجيحي).                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | ويب سائيٽ ڊاڪس هم وقتي (legacy، غير بئچ) ترجمو ڪريو.                                      |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` جو عرف.                                                           |
| [`translation_web_index`](#mt-translation_web_index)     | هوم پيج/ناوبار/فوٽر UI ترجمو (`website/i18n/en/code.json → .../<lang>/code.json`).        |
| [`web_build`](#mt-web_build)                             | ڊاڪس کي `website/build` ڏانهن بِلڊ ڪريو ( `--locales` / `BUILD_LOCALES` کي سپورٽ ڪري ٿو). |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | آف لائن محفوظ لنڪ چيڪ (ريموٽ HTTP[S] کي ڇڏيندو).                                          |
| [`web_build_local_preview`](#mt-web_build_local_preview) | مقامي gh‑pages پريويو؛ 8080–8090 تي پاڻمرادو سرور؛ اختياري ٽيسٽ/لنڪ چيڪ.                  |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` کي `gh-pages` برانچ ڏانهن پش ڪريو.                                        |

اختيارن لاءِ نحو

- آپشن پاس ڪرڻ لاءِ `make <command> OPTS="…"` استعمال ڪريو (ڪوٽس صلاح ڏنل). ھيٺ ھر ٽارگيٽ مثال استعمال ڏيکاري ٿو.

--

-

#### لوڪل بِلڊ ٽِپس {#locale-build-tips}

- لوڪلز جو جزوي سيٽ بِلڊ ڪريو: `BUILD_LOCALES="en de"` سيٽ ڪريو يا ويب ٽارگيٽس کي `OPTS="--locales en,de"` پاس ڪريو.
- ڪنهن مخصوص لوڪل جو پريويو: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### بِلڊ ۽ پيڪيج {#build-and-package}

- ZIPs بِلڊ ڪريو: `make pack`
- ريپو روٽ ۾ ATN ۽ LOCAL ZIPs ٺاهي ٿو (آرٽيفيڪٽس هٿ سان ايڊٽ نه ڪريو)
- ٽِپ: پيڪيج ڪرڻ کان اڳ `sources/manifest_ATN.json` ۽ `sources/manifest_LOCAL.json` ٻنهي ۾ ورزن اپڊيٽ ڪريو
- دستي انسٽال (ڊولپ): Thunderbird → Tools → Add‑ons and Themes → گيئر → Install Add‑on From File… → تيار ڪيل ZIP چونڊيو

---

### ٽيسٽ {#test}

- پورو سوٽ: `make test` (Vitest)
- ڪوريج (اختياري):
- `npm i -D @vitest/coverage-v8`
- `make test` هلائو؛ HTML رپورٽ لاءِ `coverage/index.html` کوليو
- صرف i18n: `make test_i18n` (UI keys/placeholders/titles + ويب سائيٽ في-لوڪل في-ڊاڪ parity id/title/sidebar_label چيڪس سان)

---

### ڊي بگنگ ۽ لاگز {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- رن ٽائيم دوران تفصيلي لاگز کي ٽوگل ڪريو:
- فعال: `messenger.storage.local.set({ debug: true })`
- غيرفعال: `messenger.storage.local.set({ debug: false })`
- لاگز جواب لکوڻ/موڪلڻ دوران ظاهر ٿيندا

---

### ڊاڪس (ويب سائيٽ) {#docs-website}

- ڊيو سرور: `cd website && npm run start`
- اسٽيٽڪ سائيٽ بِلڊ: `cd website && npm run build`
- ميڪ جا هم منصب (ابجد وار): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- استعمال جا مثال:
- فقط EN، ٽيسٽ/لنڪ چيڪ کي ڇڏيو، پش نه ڪريو: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- سڀ لوڪلز، ٽيسٽ/لنڪ چيڪ سان، پوءِ پش: `make web_build_local_preview && make web_push_github`
- شايع ڪرڻ کان اڳ، آف لائن محفوظ لنڪ چيڪ هلائو: `make web_build_linkcheck`.
- i18n: انگريزي `website/docs/*.md` ۾ آهي؛ جرمن ترجما `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ۾
- سرچ: جيڪڏهن Algolia DocSearch جا env ويئرئيبلز CI ۾ سيٽ آهن (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) ته سائيٽ Algolia سرچ استعمال ڪندي؛ ٻي صورت ۾ لوڪل سرچ تي واپس ويندي. هوم پيج تي، سرچ باڪس کولڻ لاءِ `/` يا `Ctrl+K` دٻايو.

---

#### ڊونيٽ ريدايريڪٽ {#donate-redirect}

- `website/src/pages/donate.js`
- روٽ: `/donate` (۽ `/<locale>/donate`)
- رويو:
- جيڪڏهن موجوده روٽ وٽ لوڪل آهي (مثال طور، `/de/donate`) ته اهو ئي استعمال ڪريو
- ٻي صورت ۾، `navigator.languages` کي ترتيب ڏنل لوڪلز سان ڀيٽيو؛ ڊي فالٽ لوڪل تي واپس وڃو
- ريدايريڪٽس:
- `en` → `/docs/donation`
- ٻيا → `/<locale>/docs/donation`
- صحيح baseUrl هينڊلنگ لاءِ `useBaseUrl` استعمال ڪري ٿو
- متبادل طور meta refresh + `noscript` لنڪ شامل آهي

---

---

#### پريويو ٽِپس {#preview-tips}

- Node پريويو صحيح نموني بند ڪرڻ: `http://localhost:<port>/__stop` کوليو (`Local server started` کان پوءِ پرنٽ ٿيندو).
- جيڪڏهن تصويرون MDX/JSX ۾ لوڊ نٿيون ٿين، سائيٽ جي `baseUrl` جو خيال رکڻ لاءِ `useBaseUrl('/img/...')` استعمال ڪريو.
- پريويو پهرين شروع ٿئي ٿو؛ لنڪ چيڪ بعد ۾ هلندو آهي ۽ نان بلاڪنگ آهي (ٽُٽل خارجي لنڪس پريويو کي نه روڪينديون).
- مثال پريويو URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” کان پوءِ پرنٽ ٿيندو).
- لنڪ چيڪ ۾ خارجي لنڪس: ڪجهه خارجي سائيٽون (جهڙوڪ addons.thunderbird.net) خودڪار ڪرالرز کي بلاڪ ڪن ٿيون ۽ لنڪ چيڪس ۾ 403 ڏيکاري سگهن ٿيون. پريويو اڃا به شروع ٿيندو؛ اهي نظرانداز ڪرڻ لاءِ محفوظ آهن.

---

#### ويب سائيٽ ترجمو ڪريو {#translate-website}

توھان ڇا ترجمو ڪري سگھو ٿا

- صرف ويب سائيٽ UI: هوم پيج، ناوبار، فوٽر، ۽ ٻيا UI اسٽِرنگز. ڊاڪس جو مواد اڃا لاءِ رڳو انگريزي ۾ رهندو.

ڪٿي ايڊٽ ڪجي

- `website/i18n/<locale>/code.json` ايڊٽ ڪريو (`en` کي ريفرنس طور استعمال ڪريو). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` جهڙا placeholders اڻبدل رکو.

فائلون ٺاهيو يا تازيون ڪريو

- سڀني لوڪلز لاءِ گم ٿيل اسٽب ٺاهيو: `npm --prefix website run i18n:stubs`
- انگريزي مان اسٽب اوور رائيٽ ڪريو (نئين اسٽِرنگز شامل ڪرڻ کان پوءِ): `npm --prefix website run i18n:stubs:force`
- هڪ ئي لوڪل لاءِ متبادل: `npx --prefix website docusaurus write-translations --locale <locale>`

هوم پيج/ناوبار/فوٽر UI اسٽِرنگز ترجمو (OpenAI)

- ڪريڊينشلز هڪ ڀيرو سيٽ ڪريو (shell يا .env):
- `export OPENAI_API_KEY=sk-...`
- اختياري: `export OPENAI_MODEL=gpt-4o-mini`
- هڪ ئي هلاءُ (سڀ لوڪلز، en کي ڇڏي): `make translate_web_index`
- مخصوص لوڪلز تائين محدود ڪريو: `make translate_web_index OPTS="--locales de,fr"`
- موجوده قدرن کي اوور رائيٽ ڪريو: `make translate_web_index OPTS="--force"`

توثيق ۽ ٻيهر ڪوششون

- ترجمي وارو اسڪرپٽ JSON شڪل جي توثيق ڪري ٿو، curly‑brace placeholders محفوظ رکي ٿو، ۽ يقين ڏياري ٿو ته URLs اڻبدل رهن.
- توثيق ناڪاميءَ تي، فيڊ بيڪ سان 2 ڀيرا تائين ٻيهر ڪوشش ڪندو ۽ پوءِ موجوده قدر برقرار رکندو.

پنهنجي لوڪل جو پريويو

- ڊيو سرور: `npm --prefix website run start`
- هتي وڃو: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

جمع ڪرائڻ

- ايڊٽ ڪيل `code.json` فائل(ن) سان PR کوليو. تبديليون مرڪوز رکو ۽ ممڪن هجي ته تيز اسڪرين شاٽ شامل ڪريو.

---

### سيڪيورٽي ۽ ڪنفيگريشن ٽِپس {#security-and-configuration-tips}

- `sources/manifest.json` ڪميٽ نه ڪريو (بِلڊ عارضي طور ٺاهي ٿو)
- اپڊيٽ چينل برقرار رکڻ لاءِ `browser_specific_settings.gecko.id` مستحڪم رکو

---

### سيٽنگز جي مستقلتا {#settings-persistence}

- اسٽوريج: سڀ يوزر سيٽنگز `storage.local` ۾ محفوظ آهن ۽ ايڊ آن اپڊيٽس ۾ به برقرار رهن ٿيون.
- انسٽال: ڊي فالٽس تڏهن ئي لاڳو ٿيندا جڏهن ڪو ڪي سِختي سان گم هجي (undefined).
- اپڊيٽ: مائيگريشن رڳو گم ٿيل ڪييز ڀريندي؛ موجوده قدر ڪڏهن به اوور رائيٽ نٿا ٿين.
- اسڪيمه مارڪر: `settingsVersion` (في الحال `1`).
- ڪييز ۽ ڊي فالٽس:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- ڪوڊ: ڏسو `sources/background.js` → `initializeOrMigrateSettings()` ۽ `SCHEMA_VERSION`.

ڊولپمينٽ وهڪرو (نئين سيٽنگ شامل ڪرڻ)

- `sources/background.js` ۾ `SCHEMA_VERSION` کي بَمپ ڪريو.
- `initializeOrMigrateSettings()` ۾ `DEFAULTS` آبجڪٽ ۾ نئون ڪي + ڊي فالٽ شامل ڪريو.
- ڊي فالٽس سيڊ ڪندي “صرف-جيڪڏهن-undefined” جو اصول استعمال ڪريو؛ موجوده قدر اوور رائيٽ نه ڪريو.
- جيڪڏهن سيٽنگ يوزر لاءِ نظر ايندي آهي ته `sources/options.js` ۾ وائر ڪريو ۽ لوڪلائيزڊ اسٽِرنگز شامل ڪريو.
- ٽيسٽ شامل/ترتيب ڪريو (`tests/background.settings.migration.test.js` ڏسو).

دستي ٽيسٽنگ ٽِپس

- نئون انسٽال نقل ڪريو: ايڪسٽينشن جو ڊيٽا ڊائريڪٽري صاف ڪريو يا نئين پروفائيل سان شروع ڪريو.
- اپڊيٽ نقل ڪريو: `storage.local` ۾ `settingsVersion` کي `0` تي سيٽ ڪريو ۽ ٻيهر لوڊ ڪريو؛ پڪ ڪريو موجوده قدر اڻبدل رهن ۽ صرف گم ٿيل ڪييز شامل ٿين.

---

### ٽربل شوٽنگ {#troubleshooting}

- پڪ ڪريو Thunderbird 128 ESR يا نئون هجي
- رن ٽائيم مسئلن لاءِ Error Console استعمال ڪريو
- جيڪڏهن محفوظ سيٽنگز صحيح نموني لاڳو نه پيون لڳن ته Thunderbird ٻيهر شروع ڪريو ۽ ٻيهر ڪوشش ڪريو. (Thunderbird سيشنن وچ ۾ اسٽيٽ ڪيش ڪري سگهي ٿو؛ ريسٽارٽ سان تازيون سيٽنگون لوڊ ٿين ٿيون.)

---

### CI ۽ ڪوريج {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest کي ڪوريج ٿريشولڊز سان هلائي ٿو (85% lines/functions/branches/statements). جيڪڏهن ٿريشولڊ پورو نه ٿيا، نوڪري ناڪام ٿيندي.
- ورڪ فلو HTML رپورٽ سان `coverage-html` آرٽيفيڪٽ اپلوڊ ڪري ٿو؛ رن پيج تان ڊائون لوڊ ڪريو (Actions → تازو رن → Artifacts).

---

### حصو وٺڻ {#contributing}

- CONTRIBUTING.md ڏسو برانچ/ڪميٽ/PR هدايتن لاءِ
- ٽِپ: پنهنجي روزاني پروفائيل تي اثر کان بچڻ لاءِ ٽيسٽنگ لاءِ ڌار Thunderbird ڊولپمينٽ پروفائيل ٺاهيو.

---

### ترجما

- وڏي “all → all” ترجمي واريون جابز سست ۽ مهانگيون ٿي سگهن ٿيون. پهرين جزوي سيٽ سان شروع ڪريو (مثال طور، چند ڊاڪس ۽ 1–2 لوڪلز)، نتيجو ڏسو، پوءِ وڌايو.

---

- ٻيهر ڪوشش پاليسي: ترجمي واريون جابز API غلطن تي وڌ ۾ وڌ 3 ڀيرا ايڪسپونينشل بئڪ آف سان ٻيهر ڪوشش ڪن ٿيون؛ `scripts/translate_web_docs_batch.js` ۽ `scripts/translate_web_docs_sync.js` ڏسو.

ڊاڪس لاءِ اسڪرين شاٽس

- تصويرون `website/static/img/` هيٺ محفوظ ڪريو.
- کين MD/MDX ۾ `useBaseUrl('/img/<filename>')` وسيلي ريفرنس ڪريو ته جيئن پاتھس سائيٽ جي `baseUrl` سان ڪم ڪن.
- `website/static/img/` هيٺ تصويرون شامل ڪرڻ يا نالو تبديل ڪرڻ کان پوءِ، تصديق ڪريو سڀ ريفرنس اڃا به `useBaseUrl('/img/…')` استعمال ڪن ٿا ۽ مقامي پريويو ۾ رينڊر ٿين ٿا.
  فيئو آئڪنز

- گهڻ-سائيز `favicon.ico` پاڻمرادو سڀني بِلڊ رستن (Make + scripts) ۾ `website/scripts/build-favicon.mjs` وسيلي ٺهندو.
- ڪابه دستي قدم گهربل ناهي؛ `icon-*.png` کي اپڊيٽ ڪرڻ ڪافي آهي.
  جائزي جي ٽِپ

- ترجمو ٿيل ڊاڪس ۾ front‑matter `id` اڻبدل رکو؛ موجود هجي ته صرف `title` ۽ `sidebar_label` ترجمو ڪريو.

#### clean {#mt-clean}

- مقصد: مقامي بِلڊ/پريويو آرٽيفيڪٽس هٽائڻ.
- استعمال: `make clean`
- هٽائيندو (جيڪڏهن موجود):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- مقصد: فارميٽ، ٽيسٽ، چينج لاگ اپڊيٽ، ڪميٽ، ۽ پش.
- استعمال: `make commit`
- تفصيل: Prettier (write)، `make test`, `make test_i18n` هلائي ٿو؛ جڏهن staged فرق هجن ته چينج لاگ شامل ڪري ٿو؛ `origin/<branch>` ڏانهن پش ڪري ٿو.

---

#### eslint {#mt-eslint}

- مقصد: فليٽ ڪنفيگ ذريعي ESLint هلائڻ.
- استعمال: `make eslint`

---

#### help {#mt-help}

- مقصد: سڀ ٽارگيٽ هڪ سٽ جي ڊاڪس سان لسٽ ڪرڻ.
- استعمال: `make help`

---

#### lint {#mt-lint}

- مقصد: `web-ext` استعمال ڪندي MailExtension کي lint ڪرڻ.
- استعمال: `make lint`
- نوٽس: عارضي طور `sources/manifest_LOCAL.json` → `sources/manifest.json` ڪاپي ڪندو؛ ٺهيل ZIPs نظرانداز؛ وارننگز پائيپ لائين کي ناڪام نٿيون ڪن.

---

#### menu {#mt-menu}

- مقصد: ميڪ ٽارگيٽ ۽ اختياري آرگومينٽ چونڊڻ لاءِ انٽرايڪٽو مينيو.
- استعمال: `make` بغير آرگومينٽس جي هلايو.
- نوٽس: جيڪڏهن `whiptail` دستياب نه هجي ته مينيو `make help` تي واپس ويندو.

---

#### pack {#mt-pack}

- مقصد: ATN ۽ LOCAL ZIPs بِلڊ ڪرڻ ( `lint` تي منحصر).
- استعمال: `make pack`
- ٽِپ: پيڪيج ڪرڻ کان اڳ ٻنهي `sources/manifest_*.json` ۾ ورجن بَمپ ڪريو.

---

#### prettier {#mt-prettier}

- مقصد: ريپو کي جاءِ تي فارميٽ ڪرڻ.
- استعمال: `make prettier`

#### prettier_check {#mt-prettier_check}

- مقصد: فارميٽنگ جي تصديق (بغير لکندڙ).
- استعمال: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- مقصد: `prettier` جو عرف.
- استعمال: `make prettier_write`

---

#### test {#mt-test}

- مقصد: Prettier (write)، ESLint، پوءِ Vitest (جيڪڏهن ڪوريج انسٽال ٿيل آهي).
- استعمال: `make test`

#### test_i18n {#mt-test_i18n}

- مقصد: ايڊ آن اسٽِرنگز ۽ ويب سائيٽ ڊاڪس لاءِ i18n-مرڪوز ٽيسٽ.
- استعمال: `make test_i18n`
- هلائيندو: `npm run test:i18n` ۽ `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- مقصد: ايڊ آن UI اسٽِرنگز EN مان ٻين لوڪلز ڏانهن ترجمو ڪرڻ.
- استعمال: `make translation_app OPTS="--locales all|de,fr"`
- نوٽس: ڪي ساخت ۽ placeholders محفوظ رکي ٿو؛ `translation_app.log` تي لاگ ڪندو. اسڪرپٽ فارم: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- مقصد: ويب سائيٽ ڊاڪس `website/docs/*.md` مان `website/i18n/<locale>/...` ڏانهن ترجمو ڪرڻ.
- ترجيح: `translate_web_docs_batch` (OpenAI Batch API)
  - استعمال (فلئگز): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy پوزيشنل اڃا قبول ٿيل: `OPTS="<doc|all> <lang|all>"`
- رويو: JSONL بِلڊ، اپلوڊ، هر 30 سيڪنڊن ۾ پول، نتيجا ڊائون لوڊ، فائلون لکو.
- نوٽ: بئچ جاب مڪمل ٿيڻ ۾ 24 ڪلاڪن تائين لڳي سگهن ٿا (OpenAI جي بئچ ونڊو موجب). ڪن soles هر پول تي گذريل وقت ڏيکاريندو.
- Env: `OPENAI_API_KEY` (گهربل)، اختياري `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ڊي فالٽ 24h)، `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - استعمال (فلئگز): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy پوزيشنل اڃا قبول ٿيل: `OPTS="<doc|all> <lang|all>"`
- رويو: هم وقتي في-جوڙي درخواستون (بغير بئچ گڏ ڪرڻ).
- نوٽس: جڏهن `OPTS` ڇڏيل هجي ته انٽرايڪٽو پرامپٽس. ٻئي موڊس ڪوڊ بلاڪس/ان لائين ڪوڊ محفوظ رکن ٿا ۽ front‑matter `id` اڻبدل رکن ٿا؛ لاگز `translation_web_batch.log` (بئچ) يا `translation_web_sync.log` (سنڪ) ۾.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- مقصد: ويب سائيٽ UI اسٽِرنگز (هوم پيج، ناوبار، فوٽر) `website/i18n/en/code.json` مان سڀني لوڪلز ڏانهن `website/i18n/<locale>/code.json` هيٺ ترجمو ڪرڻ ( `en` کانسواءِ).
- استعمال: `make translate_web_index` يا `make translate_web_index OPTS="--locales de,fr [--force]"`
- گهرجون: `OPENAI_API_KEY` ايڪسپورٽ ڪريو (اختياري: `OPENAI_MODEL=gpt-4o-mini`).
- رويو: JSON ساخت جي تصديق، curly‑brace placeholders محفوظ، URLs اڻبدل، ۽ توثيق غلطن تي فيڊ بيڪ سان ٻيهر ڪوششون.

---

#### web_build {#mt-web_build}

- مقصد: ڊاڪس سائيٽ کي `website/build` ڏانهن بِلڊ ڪرڻ.
- استعمال: `make web_build OPTS="--locales en|de,en|all"` (يا `BUILD_LOCALES="en de"` سيٽ ڪريو)
- اندريون: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- ڊپس: `website/` ۾ `npm ci` رڳو تڏهن هلائيندو جڏهن `website/node_modules/@docusaurus` موجود نه هجي.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- مقصد: آف لائن محفوظ لنڪ چيڪ.
- استعمال: `make web_build_linkcheck OPTS="--locales en|all"`
- نوٽس: `tmp_linkcheck_web_pages` ڏانهن بِلڊ ڪندو؛ GH Pages `baseUrl` کي `/` ۾ ٻيهر لکي ٿو؛ ریموٽ HTTP(S) لنڪس کي ڇڏيندو.

#### web_build_local_preview {#mt-web_build_local_preview}

- مقصد: اختياري ٽيسٽ/لنڪ چيڪ سان مقامي gh‑pages پريويو.
- استعمال: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- رويو: پهرين Node پريويو سرور ڪوشش ڪندو (`scripts/preview-server.mjs`, `/__stop` کي سپورٽ ڪري ٿو)، پوءِ `python3 -m http.server` تي واپس ويندو؛ 8080–8090 تي سرور؛ PID `web-local-preview/.server.pid` تي.

#### web_push_github {#mt-web_push_github}

- مقصد: `website/build` کي `gh-pages` برانچ ڏانهن پش ڪرڻ.
- استعمال: `make web_push_github`

ٽِپ: Makefile پاران استعمال ٿيندڙ پيڪيج مينيجر کي اوور رائيڊ ڪرڻ لاءِ `NPM=…` سيٽ ڪريو (ڊي فالٽ `npm`).
