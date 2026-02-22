---
id: development
title: 'विकास'
sidebar_label: 'विकास'
---

---

## विकास गाइड {#development-guide}

:::note केवल अंग्रेज़ी संपादित करें; अनुवाद प्रसारित होते हैं
दस्तावेज़ीकरण **केवल** `website/docs` (English) के अंतर्गत अपडेट करें। `website/i18n/<locale>/…` के अंतर्गत अनुवाद जनरेट होते हैं और इन्हें मैन्युअली संपादित नहीं करना चाहिए। लोकलाइज़्ड सामग्री को रिफ्रेश करने के लिए अनुवाद कार्यों का उपयोग करें (जैसे, `make translate_web_docs_batch`)।
:::

### पूर्वापेक्षाएँ {#prerequisites}

- Node.js 22+ और npm (Node 22 के साथ परीक्षण किया गया)
- Thunderbird 128 ESR या नया (मैन्युअल परीक्षण के लिए)

---

### प्रोजेक्ट लेआउट (हाई‑लेवल) {#project-layout-high-level}

- रूट: पैकेजिंग स्क्रिप्ट `distribution_zip_packer.sh`, डॉक्स, स्क्रीनशॉट्स
- `sources/`: मुख्य ऐड‑ऑन कोड (बैकग्राउंड, विकल्प/पॉपअप UI, मैनिफेस्ट, आइकन)
- `tests/`: Vitest सूट
- `website/`: Docusaurus डॉक्स (i18n `website/i18n/de/...` के अंतर्गत)

---

### इंस्टॉल और टूलिंग {#install-and-tooling}

- रूट डिपेंडेंसी इंस्टॉल करें: `npm ci`
- डॉक्स (वैकल्पिक): `cd website && npm ci`
- टार्गेट्स देखें: `make help`

---

### लाइव डेवलपमेंट (web‑ext run) {#live-dev-web-ext}

- Firefox डेस्कटॉप में त्वरित लूप (केवल UI स्मोक‑टेस्ट):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird में चलाएँ (MailExtensions के लिए प्राथमिक):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- टिप्स:
- Thunderbird की Error Console खुली रखें (Tools → Developer Tools → Error Console)।
- MV3 इवेंट पेज निष्क्रिय होने पर निलंबित रहते हैं; कोड बदलने के बाद ऐड‑ऑन को रीलोड करें, या web‑ext को ऑटो‑रीलोड करने दें।
- कुछ केवल‑Firefox व्यवहार अलग हो सकते हैं; API समानता के लिए हमेशा Thunderbird में सत्यापित करें।
- Thunderbird बाइनरी पाथ (उदाहरण):
- Linux: `thunderbird` (जैसे, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- प्रोफ़ाइल आइसोलेशन: अपनी दैनिक सेटअप पर प्रभाव से बचने के लिए डेवलपमेंट हेतु अलग Thunderbird प्रोफ़ाइल का उपयोग करें।

---

### Make टार्गेट्स (वर्णक्रमानुसार) {#make-targets-alphabetical}

Makefile सामान्य डेवलपमेंट फ्लो को मानकीकृत करता है। हर टार्गेट का एक‑लाइन सारांश पाने के लिए कभी भी `make help` चलाएँ।

टिप: बिना टार्गेट के `make` चलाने पर टार्गेट चुनने हेतु एक साधारण Whiptail मेन्यू खुलता है।

| टार्गेट                                                  | एक‑लाइन विवरण                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | लोकल बिल्ड/प्रीव्यू आर्टिफैक्ट्स हटाएँ (tmp/, web-local-preview/, website/build/).    |
| [`commit`](#mt-commit)                                   | फॉर्मेट करें, टेस्ट चलाएँ (i18n सहित), चेंजलॉग अपडेट करें, कमिट करें और पुश करें।     |
| [`eslint`](#mt-eslint)                                   | फ्लैट कॉन्फ़िग (`npm run -s lint:eslint`) के जरिए ESLint चलाएँ।                       |
| [`help`](#mt-help)                                       | एक‑लाइन डॉक्स के साथ सभी टार्गेट्स सूचीबद्ध करें (सॉर्टेड)।                           |
| [`lint`](#mt-lint)                                       | `sources/` पर web‑ext lint (अस्थायी मैनिफेस्ट; ZIPs को नज़रअंदाज़; नॉन‑फेटल)।         |
| [`menu`](#mt-menu)                                       | टार्गेट और वैकल्पिक आर्ग्युमेंट चुनने के लिए इंटरैक्टिव मेन्यू।                       |
| [`pack`](#mt-pack)                                       | ATN और LOCAL ZIPs बनाता है (लिंटर चलाता है; पैकर स्क्रिप्ट कॉल करता है)।              |
| [`prettier`](#mt-prettier)                               | रिपॉज़िटरी को वहीं फॉर्मेट करें (परिवर्तन लिखे जाते हैं)।                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier चेक मोड में (कोई लिखाई नहीं); रिफॉर्मेट की ज़रूरत हो तो विफल।                |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` का उपनाम।                                                                  |
| [`test`](#mt-test)                                       | Prettier (लिखाई), फिर ESLint, फिर Vitest (यदि कॉन्फ़िगर किया हो तो कवरेज)।            |
| [`test_i18n`](#mt-test_i18n)                             | केवल i18n टेस्ट: ऐड‑ऑन प्लेसहोल्डर/पैरिटी + वेबसाइट पैरिटी।                           |
| [`translate_app`](#mt-translation-app)                   | `translation_app` का उपनाम।                                                           |
| [`translation_app`](#mt-translation-app)                 | ऐप UI स्ट्रिंग्स को `sources/_locales/en/messages.json` से अनुवादित करें।             |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API के माध्यम से वेबसाइट डॉक्स का अनुवाद (प्राथमिक)।                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | वेबसाइट डॉक्स को सिंक्रोनस रूप से अनुवादित करें (लीगेसी, नॉन‑बैच)।                    |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` का उपनाम।                                                     |
| [`translation_web_index`](#mt-translation_web_index)     | होमपेज/नेवबार/फूटर UI का अनुवाद (`website/i18n/en/code.json → .../<lang>/code.json`)। |
| [`web_build`](#mt-web_build)                             | डॉक्स को `website/build` में बिल्ड करें (`--locales` / `BUILD_LOCALES` समर्थित)।      |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ऑफ़लाइन‑सेफ लिंक चेक (रिमोट HTTP[S] को छोड़ता है)।                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | लोकल gh‑pages प्रीव्यू; 8080–8090 पर ऑटो‑सर्व; वैकल्पिक टेस्ट/लिंक‑चेक।               |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` को `gh-pages` ब्रांच पर पुश करें।                                     |

विकल्पों के लिए सिन्टैक्स

- विकल्प पास करने के लिए `make <command> OPTS="…"` का उपयोग करें (कोट्स अनुशंसित)। नीचे प्रत्येक टार्गेट उदाहरण उपयोग दिखाता है।

--

-

#### लोकैल बिल्ड टिप्स {#locale-build-tips}

- लोकैलों का एक सबसेट बिल्ड करें: `BUILD_LOCALES="en de"` सेट करें या वेब टार्गेट्स को `OPTS="--locales en,de"` पास करें।
- किसी विशिष्ट लोकैल का प्रीव्यू: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### बिल्ड और पैकेज {#build-and-package}

- ZIPs बनाएं: `make pack`
- रेपो रूट में ATN और LOCAL ZIPs उत्पन्न करता है (आर्टिफैक्ट्स को हाथ से संपादित न करें)
- टिप: पैकेजिंग से पहले `sources/manifest_ATN.json` और `sources/manifest_LOCAL.json` दोनों में संस्करण अपडेट करें
- मैन्युअल इंस्टॉल (डेव): Thunderbird → Tools → Add‑ons and Themes → गियर → Install Add‑on From File… → बनी हुई ZIP चुनें

---

### टेस्ट {#test}

- पूर्ण सूट: `make test` (Vitest)
- कवरेज (वैकल्पिक):
- `npm i -D @vitest/coverage-v8`
- `make test` चलाएँ; HTML रिपोर्ट के लिए `coverage/index.html` खोलें
- केवल i18n: `make test_i18n` (UI keys/placeholders/titles + वेबसाइट प्रति‑लोकैल प्रति‑डॉक पैरिटी, id/title/sidebar_label जाँच सहित)

---

### डीबगिंग और लॉग्स {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- रनटाइम पर वर्बोज़ लॉग टॉगल करें:
- सक्रिय करें: `messenger.storage.local.set({ debug: true })`
- निष्क्रिय करें: `messenger.storage.local.set({ debug: false })`
- लॉग उत्तर लिखते/भेजते समय दिखाई देते हैं

---

### डॉक्स (वेबसाइट) {#docs-website}

- डेव सर्वर: `cd website && npm run start`
- स्टैटिक साइट बनाएं: `cd website && npm run build`
- Make समकक्ष (वर्णक्रमानुसार): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- उपयोग उदाहरण:
- केवल EN, टेस्ट/लिंक‑चेक छोड़ें, कोई पुश नहीं: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- सभी लोकैल, टेस्ट/लिंक‑चेक सहित, फिर पुश: `make web_build_local_preview && make web_push_github`
- प्रकाशित करने से पहले, ऑफ़लाइन‑सेफ लिंक चेक चलाएँ: `make web_build_linkcheck`.
- i18n: अंग्रेज़ी `website/docs/*.md` में है; जर्मन अनुवाद `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` में हैं
- खोज: यदि Algolia DocSearch env वेरिएबल CI में सेट हैं (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), तो साइट Algolia सर्च का उपयोग करती है; अन्यथा यह लोकल सर्च पर फॉलबैक करती है। होमपेज पर, सर्च बॉक्स खोलने के लिए `/` या `Ctrl+K` दबाएँ।

---

#### दान रीडायरेक्ट रूट {#donate-redirect}

- `website/src/pages/donate.js`
- रूट: `/donate` (और `/<locale>/donate`)
- व्यवहार:
- यदि वर्तमान रूट में कोई लोकैल है (जैसे, `/de/donate`), तो उसी का उपयोग करें
- अन्यथा, `navigator.languages` बनाम कॉन्फ़िगर्ड लोकैल में से सर्वश्रेष्ठ मेल चुनें; डिफ़ॉल्ट लोकैल पर फॉलबैक करें
- यहाँ रीडायरेक्ट करता है:
- `en` → `/docs/donation`
- अन्य → `/<locale>/docs/donation`
- उपयुक्त baseUrl हैंडलिंग के लिए `useBaseUrl` का उपयोग करता है
- फॉलबैक के रूप में meta refresh + `noscript` लिंक शामिल है

---

---

#### प्रीव्यू टिप्स {#preview-tips}

- Node प्रीव्यू को साफ़ तरीके से रोकें: `http://localhost:<port>/__stop` खोलें (`Local server started` के बाद प्रिंट होता है)।
- यदि MDX/JSX में इमेज लोड नहीं होतीं, तो साइट `baseUrl` का सम्मान करने के लिए `useBaseUrl('/img/...')` का उपयोग करें।
- प्रीव्यू पहले शुरू होता है; लिंक चेक बाद में चलता है और नॉन‑ब्लॉकिंग है (टूटी बाहरी लिंक प्रीव्यू को नहीं रोकेंगी)।
- उदाहरण प्रीव्यू URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” के बाद प्रिंट होता है)।
- लिंक‑चेक में बाहरी लिंक: कुछ बाहरी साइटें (जैसे, addons.thunderbird.net) स्वचालित क्रॉलर को ब्लॉक करती हैं और लिंक चेक में 403 दिखा सकती हैं। प्रीव्यू फिर भी शुरू होता है; इन्हें नज़रअंदाज़ करना सुरक्षित है।

---

#### वेबसाइट का अनुवाद करें {#translate-website}

आप क्या अनुवाद कर सकते हैं

- केवल वेबसाइट UI: होमपेज, नेवबार, फूटर, और अन्य UI स्ट्रिंग्स। फिलहाल डॉक्स सामग्री अंग्रेज़ी‑मात्र रहेगी।

कहाँ संपादित करें

- `website/i18n/<locale>/code.json` संपादित करें (संदर्भ के रूप में `en` का उपयोग करें)। `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` जैसे प्लेसहोल्डर अपरिवर्तित रखें।

फ़ाइलें जनरेट या रिफ्रेश करें

- सभी लोकैल के लिए मिसिंग स्टब बनाएँ: `npm --prefix website run i18n:stubs`
- अंग्रेज़ी से स्टब ओवरराइट करें (नई स्ट्रिंग्स जोड़ने के बाद): `npm --prefix website run i18n:stubs:force`
- एक ही लोकैल के लिए वैकल्पिक: `npx --prefix website docusaurus write-translations --locale <locale>`

होमपेज/नेवबार/फूटर UI स्ट्रिंग्स का अनुवाद (OpenAI)

- क्रेडेंशियल्स एक बार सेट करें (शेल या .env):
- `export OPENAI_API_KEY=sk-...`
- वैकल्पिक: `export OPENAI_MODEL=gpt-4o-mini`
- एक‑बार में (सभी लोकैल, en छोड़ें): `make translate_web_index`
- विशिष्ट लोकैल तक सीमित करें: `make translate_web_index OPTS="--locales de,fr"`
- मौजूदा मान ओवरराइट करें: `make translate_web_index OPTS="--force"`

मान्यकरण और पुनर्प्रयास

- अनुवाद स्क्रिप्ट JSON संरचना को वैध करती है, कर्ली‑ब्रेस प्लेसहोल्डर सुरक्षित रखती है, और सुनिश्चित करती है कि URLs अपरिवर्तित रहें।
- वैलिडेशन विफल होने पर, यह मौजूदा मान रखने से पहले फीडबैक के साथ अधिकतम 2 बार पुनः प्रयास करती है।

अपना लोकैल प्रीव्यू करें

- डेव सर्वर: `npm --prefix website run start`
- यहाँ जाएँ: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

सबमिट करना

- संपादित `code.json` फ़ाइल(फ़ाइलों) के साथ एक PR खोलें। बदलाव केंद्रित रखें और संभव हो तो एक त्वरित स्क्रीनशॉट शामिल करें।

---

### सुरक्षा और कॉन्फ़िगरेशन टिप्स {#security-and-configuration-tips}

- `sources/manifest.json` कमिट न करें (बिल्ड द्वारा अस्थायी रूप से बनाया जाता है)
- अपडेट चैनल सुरक्षित रखने के लिए `browser_specific_settings.gecko.id` को स्थिर रखें

---

### सेटिंग्स स्थायित्व {#settings-persistence}

- स्टोरेज: सभी यूज़र सेटिंग्स `storage.local` में रहती हैं और ऐड‑ऑन अपडेट्स के बीच सुरक्षित रहती हैं।
- इंस्टॉल: डिफ़ॉल्ट केवल तब लागू होते हैं जब कोई कुंजी सख़्ती से गुम हो (undefined)।
- अपडेट: माइग्रेशन केवल गुम कुंजियों को भरता है; मौजूदा मान कभी ओवरराइट नहीं होते।
- स्कीमा मार्कर: `settingsVersion` (वर्तमान में `1`)।
- कुंजियाँ और डिफ़ॉल्ट:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- कोड: देखें `sources/background.js` → `initializeOrMigrateSettings()` और `SCHEMA_VERSION`.

डेव वर्कफ़्लो (नई सेटिंग जोड़ना)

- `sources/background.js` में `SCHEMA_VERSION` बढ़ाएँ।
- नई कुंजी + डिफ़ॉल्ट को `initializeOrMigrateSettings()` में `DEFAULTS` ऑब्जेक्ट में जोड़ें।
- डिफ़ॉल्ट भरते समय "only-if-undefined" नियम का उपयोग करें; मौजूदा मान ओवरराइट न करें।
- यदि सेटिंग यूज़र‑दृश्य है, तो उसे `sources/options.js` में वायर करें और लोकलाइज़्ड स्ट्रिंग्स जोड़ें।
- टेस्ट जोड़ें/समायोजित करें (देखें `tests/background.settings.migration.test.js`)।

मैन्युअल परीक्षण टिप्स

- फ़्रेश इंस्टॉल का सिमुलेशन करें: एक्सटेंशन की डेटा डायरेक्टरी साफ़ करें या नई प्रोफ़ाइल से शुरू करें।
- अपडेट का सिमुलेशन करें: `storage.local` में `settingsVersion` को `0` पर सेट करें और पुनः लोड करें; सुनिश्चित करें कि मौजूदा मान अपरिवर्तित रहें और केवल गुम कुंजियाँ जोड़ी जाएँ।

---

### समस्या निवारण {#troubleshooting}

- सुनिश्चित करें कि Thunderbird 128 ESR या नया हो
- रनटाइम समस्याओं के लिए Error Console का उपयोग करें
- यदि संग्रहित सेटिंग्स ठीक से लागू नहीं लगतीं, तो Thunderbird पुनरारंभ करें और फिर से प्रयास करें। (Thunderbird सत्रों के बीच स्टेट कैश कर सकता है; पुनरारंभ से ताज़ा सेटिंग्स लोड होती हैं।)

---

### CI और कवरेज {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest को कवरेज थ्रेशहोल्ड (85% lines/functions/branches/statements) के साथ चलाता है। यदि थ्रेशहोल्ड पूरे नहीं होते, तो जॉब विफल हो जाता है।
- वर्कफ़्लो HTML रिपोर्ट के साथ `coverage-html` नामक आर्टिफैक्ट अपलोड करता है; रन पेज से डाउनलोड करें (Actions → नवीनतम रन → Artifacts)।

---

### योगदान {#contributing}

- ब्रांच/कमिट/PR दिशानिर्देशों के लिए CONTRIBUTING.md देखें
- टिप: अपने दैनिक प्रोफ़ाइल पर प्रभाव से बचने के लिए परीक्षण हेतु अलग Thunderbird डेवलपमेंट प्रोफ़ाइल बनाएँ।

---

### अनुवाद

- बड़े “all → all” अनुवाद कार्य धीमे और महँगे हो सकते हैं। किसी सबसेट से शुरू करें (जैसे, कुछ डॉक्स और 1–2 लोकैल), परिणाम की समीक्षा करें, फिर विस्तार करें।

---

- पुनर्प्रयास नीति: अनुवाद कार्य API त्रुटियों पर अधिकतम 3 पुनर्प्रयास एक्सपोनेंशियल बैकऑफ़ के साथ करते हैं; `scripts/translate_web_docs_batch.js` और `scripts/translate_web_docs_sync.js` देखें।

डॉक्स हेतु स्क्रीनशॉट्स

- इमेजेस को `website/static/img/` के अंतर्गत रखें।
- उन्हें MD/MDX में `useBaseUrl('/img/<filename>')` के माध्यम से संदर्भित करें ताकि पाथ साइट `baseUrl` के साथ काम करें।
- `website/static/img/` के अंतर्गत इमेज जोड़ने या नाम बदलने के बाद, सुनिश्चित करें कि सभी संदर्भ अब भी `useBaseUrl('/img/…')` का उपयोग करते हैं और लोकल प्रीव्यू में रेंडर होते हैं।
  फ़ेविकॉन

- मल्टी‑साइज़ `favicon.ico` सभी बिल्ड पाथ (Make + स्क्रिप्ट्स) में `website/scripts/build-favicon.mjs` के ज़रिए स्वतः जनरेट होता है।
- कोई मैन्युअल कदम आवश्यक नहीं; `icon-*.png` अपडेट करना पर्याप्त है।
  समीक्षा टिप

- अनुवादित डॉक्स में फ्रंट‑मैटर `id` अपरिवर्तित रखें; जब मौजूद हो तो केवल `title` और `sidebar_label` का अनुवाद करें।

#### clean {#mt-clean}

- उद्देश्य: लोकल बिल्ड/प्रीव्यू आर्टिफैक्ट्स हटाना।
- उपयोग: `make clean`
- हटाता है (यदि मौजूद हो):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- उद्देश्य: फॉर्मेट, टेस्ट, चेंजलॉग अपडेट, कमिट, और पुश।
- उपयोग: `make commit`
- विवरण: Prettier (लिखाई), `make test`, `make test_i18n` चलाता है; स्टेज्ड डिफ़ होने पर चेंजलॉग जोड़ता है; `origin/<branch>` पर पुश करता है।

---

#### eslint {#mt-eslint}

- उद्देश्य: फ्लैट कॉन्फ़िग के जरिए ESLint चलाना।
- उपयोग: `make eslint`

---

#### help {#mt-help}

- उद्देश्य: एक‑लाइन डॉक्स के साथ सभी टार्गेट्स सूचीबद्ध करना।
- उपयोग: `make help`

---

#### lint {#mt-lint}

- उद्देश्य: `web-ext` का उपयोग करके MailExtension को लिंट करना।
- उपयोग: `make lint`
- नोट्स: `sources/manifest_LOCAL.json` → `sources/manifest.json` अस्थायी‑कॉपी करता है; बनी हुई ZIPs को नज़रअंदाज़ करता है; चेतावनियाँ पाइपलाइन को विफल नहीं करतीं।

---

#### menu {#mt-menu}

- उद्देश्य: Make टार्गेट और वैकल्पिक आर्ग्युमेंट चुनने के लिए इंटरैक्टिव मेन्यू।
- उपयोग: बिना आर्ग्युमेंट्स के `make` चलाएँ।
- नोट्स: यदि `whiptail` उपलब्ध नहीं है, तो मेन्यू `make help` पर फॉलबैक करता है।

---

#### pack {#mt-pack}

- उद्देश्य: ATN और LOCAL ZIPs बनाना (`lint` पर निर्भर)।
- उपयोग: `make pack`
- टिप: पैकेजिंग से पहले दोनों `sources/manifest_*.json` में वर्ज़न बढ़ाएँ।

---

#### prettier {#mt-prettier}

- उद्देश्य: रेपो को वहीं फॉर्मेट करना।
- उपयोग: `make prettier`

#### prettier_check {#mt-prettier_check}

- उद्देश्य: फ़ॉर्मैटिंग सत्यापित करना (कोई लिखाई नहीं)।
- उपयोग: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- उद्देश्य: `prettier` का उपनाम।
- उपयोग: `make prettier_write`

---

#### test {#mt-test}

- उद्देश्य: Prettier (लिखाई), ESLint, फिर Vitest (यदि इंस्टॉल हो तो कवरेज) चलाना।
- उपयोग: `make test`

#### test_i18n {#mt-test_i18n}

- उद्देश्य: ऐड‑ऑन स्ट्रिंग्स और वेबसाइट डॉक्स के लिए i18n‑केंद्रित टेस्ट।
- उपयोग: `make test_i18n`
- चलाता है: `npm run test:i18n` और `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- उद्देश्य: EN से अन्य लोकैलों में ऐड‑ऑन UI स्ट्रिंग्स का अनुवाद।
- उपयोग: `make translation_app OPTS="--locales all|de,fr"`
- नोट्स: कुंजी संरचना और प्लेसहोल्डर सुरक्षित रखता है; `translation_app.log` में लॉग करता है। स्क्रिप्ट रूप: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- उद्देश्य: वेबसाइट डॉक्स को `website/docs/*.md` से `website/i18n/<locale>/...` में अनुवादित करना।
- प्राथमिक: `translate_web_docs_batch` (OpenAI Batch API)
  - उपयोग (फ्लैग्स): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - लीगेसी पॉज़िशनल अब भी स्वीकार्य है: `OPTS="<doc|all> <lang|all>"`
- व्यवहार: JSONL बनाता है, अपलोड करता है, हर 30s पर पोल करता है, परिणाम डाउनलोड करता है, फ़ाइलें लिखता है।
- नोट: बैच जॉब को पूरा होने में 24 घंटे तक लग सकते हैं (OpenAI के बैच विंडो अनुसार)। कंसोल प्रत्येक पोल पर बीता समय दिखाता है।
- पर्यावरण: `OPENAI_API_KEY` (अनिवार्य), वैकल्पिक `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (डिफ़ॉल्ट 24h), `BATCH_POLL_INTERVAL_MS`.
- लीगेसी: `translate_web_docs_sync`
  - उपयोग (फ्लैग्स): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - लीगेसी पॉज़िशनल अब भी स्वीकार्य है: `OPTS="<doc|all> <lang|all>"`
- व्यवहार: प्रति‑युग्म सिंक्रोनस अनुरोध (कोई बैच एग्रीगेशन नहीं)।
- नोट्स: `OPTS` छोड़े जाने पर इंटरैक्टिव प्रॉम्प्ट्स। दोनों मोड कोड ब्लॉक्स/इनलाइन कोड सुरक्षित रखते हैं और फ्रंट‑मैटर `id` अपरिवर्तित रखते हैं; लॉग `translation_web_batch.log` (बैच) या `translation_web_sync.log` (सिंक) में होता है।

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- उद्देश्य: वेबसाइट UI स्ट्रिंग्स (होमपेज, नेवबार, फूटर) को `website/i18n/en/code.json` से `website/i18n/<locale>/code.json` के अंतर्गत सभी लोकैलों में अनुवाद करना (`en` को छोड़कर)।
- उपयोग: `make translate_web_index` या `make translate_web_index OPTS="--locales de,fr [--force]"`
- आवश्यकताएँ: `OPENAI_API_KEY` एक्सपोर्ट करें (वैकल्पिक: `OPENAI_MODEL=gpt-4o-mini`)।
- व्यवहार: JSON संरचना वैध करता है, कर्ली‑ब्रेस प्लेसहोल्डर सुरक्षित रखता है, URLs अपरिवर्तित रखता है, और वैलिडेशन त्रुटियों पर फीडबैक के साथ पुनः प्रयास करता है।

---

#### web_build {#mt-web_build}

- उद्देश्य: डॉक्स साइट को `website/build` में बिल्ड करना।
- उपयोग: `make web_build OPTS="--locales en|de,en|all"` (या `BUILD_LOCALES="en de"` सेट करें)
- आंतरिक: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- डिप्स: `website/node_modules/@docusaurus` गुम होने पर ही `website/` में `npm ci` चलाता है।

#### web_build_linkcheck {#mt-web_build_linkcheck}

- उद्देश्य: ऑफ़लाइन‑सेफ लिंक चेक।
- उपयोग: `make web_build_linkcheck OPTS="--locales en|all"`
- नोट्स: `tmp_linkcheck_web_pages` में बिल्ड करता है; GH Pages `baseUrl` को `/` में री‑राइट करता है; रिमोट HTTP(S) लिंक छोड़ता है।

#### web_build_local_preview {#mt-web_build_local_preview}

- उद्देश्य: वैकल्पिक टेस्ट/लिंक‑चेक के साथ लोकल gh‑pages प्रीव्यू।
- उपयोग: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- व्यवहार: पहले Node प्रीव्यू सर्वर आज़माता है (`scripts/preview-server.mjs`, `/__stop` समर्थित), फिर `python3 -m http.server` पर फॉलबैक; 8080–8090 पर सर्व करता है; PID `web-local-preview/.server.pid` पर।

#### web_push_github {#mt-web_push_github}

- उद्देश्य: `website/build` को `gh-pages` ब्रांच पर पुश करना।
- उपयोग: `make web_push_github`

टिप: Makefile द्वारा उपयोग किए जाने वाले पैकेज मैनेजर को ओवरराइड करने के लिए `NPM=…` सेट करें (डिफ़ॉल्ट `npm`)।

---
