---
id: development
title: 'विकास'
sidebar_label: 'विकास'
---

---

## विकास मार्गदर्शिका {#development-guide}

:::note English मात्र सम्पादन गर्नुहोस्; अनुवादहरू स्वचालित रूपमा फैलिन्छन्
दस्तावेजहरू **मात्र** `website/docs` (English) अन्तर्गत अद्यावधिक गर्नुहोस्। `website/i18n/<locale>/…` अन्तर्गतका अनुवादहरू उत्पन्न गरिएका हुन् र म्यानुअल सम्पादन गर्नु हुँदैन। स्थानीयकृत सामग्री ताजा गर्न अनुवाद कार्यहरू (जस्तै, `make translate_web_docs_batch`) प्रयोग गर्नुहोस्।
:::

### पूर्वापेक्षाहरू {#prerequisites}

- Node.js 22+ र npm (Node 22 सँग परीक्षण गरिएको)
- Thunderbird 128 ESR वा नयाँ (म्यानुअल परीक्षणका लागि)

---

### परियोजना संरचना (उच्च‑स्तर) {#project-layout-high-level}

- रुट: प्याकेजिङ स्क्रिप्ट `distribution_zip_packer.sh`, दस्तावेजहरू, स्क्रिनसटहरू
- `sources/`: मुख्य एड‑अन कोड (background, options/popup UI, manifests, icons)
- `tests/`: Vitest सुइट
- `website/`: Docusaurus दस्तावेज (i18n `website/i18n/de/...` अन्तर्गत)

---

### इन्स्टल र टुलिङ {#install-and-tooling}

- रुट निर्भरताहरू इन्स्टल: `npm ci`
- दस्तावेज (वैकल्पिक): `cd website && npm ci`
- टार्गेटहरू पत्ता लगाउनुहोस्: `make help`

---

### लाइभ डेभ (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop मा द्रुत लूप (UI स्मोक‑टेष्ट मात्र):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird मा चलाउनुहोस् (MailExtensions का लागि प्राथमिक):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- सुझाव:
- Thunderbird को Error Console खुलै राख्नुहोस् (Tools → Developer Tools → Error Console)।
- MV3 event पेजहरू idle हुँदा निलम्बित हुन्छन्; कोड परिवर्तनपछि एड‑अन रीलोड गर्नुहोस्, वा web‑ext लाई स्वतः रीलोड गर्न दिनुहोस्।
- केही Firefox‑मात्र व्यवहार भिन्न हुन सक्छ; API समानताको लागि सधैं Thunderbird मा प्रमाणित गर्नुहोस्।
- Thunderbird बाइनरी पाथहरू (उदाहरणहरू):
- Linux: `thunderbird` (जस्तै, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- प्रोफाइल अलगाव: आफ्नो दैनिक सेटअपमा असर नपरोस् भनी विकासका लागि अलग Thunderbird प्रोफाइल प्रयोग गर्नुहोस्।

---

### Make टार्गेटहरू (वर्णानुक्रममा) {#make-targets-alphabetical}

Makefile ले सामान्य डेभ फ्लोहरू मानकीकृत गर्छ। हरेक टार्गेटको एक‑पंक्तिको सारांशका लागि जुनसुकै बेला `make help` चलाउनुहोस्।

सुझाव: कुनै टार्गेट बिना `make` चलाउँदा टार्गेट छान्न सरल Whiptail मेनु खुल्छ।

| टार्गेट                                                  | एक‑पंक्तिको विवरण                                                                            |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | स्थानीय build/preview आर्टिफ्याक्टहरू (tmp/, web-local-preview/, website/build/) हटाउनुहोस्। |
| [`commit`](#mt-commit)                                   | ढाँचा मिलाउनु, परीक्षण (i18n सहित) चलाउनु, changelog अद्यावधिक गर्नु, commit र push गर्नु।   |
| [`eslint`](#mt-eslint)                                   | flat config मार्फत ESLint चलाउनुहोस् (`npm run -s lint:eslint`)।                             |
| [`help`](#mt-help)                                       | सबै टार्गेटहरू एक‑पंक्ति डक्स सहित (sorted) सूचीबद्ध गर्नुहोस्।                              |
| [`lint`](#mt-lint)                                       | `sources/` मा web‑ext lint (अस्थायी manifest; ZIP हरू बेवास्ता; non‑fatal)।                  |
| [`menu`](#mt-menu)                                       | टार्गेट र वैकल्पिक आर्गुमेन्टहरू छान्न इन्टरेक्टिभ मेनु।                                     |
| [`pack`](#mt-pack)                                       | ATN र LOCAL ZIPs निर्माण (linter चलाउँछ; packer स्क्रिप्ट कल गर्छ)।                          |
| [`prettier`](#mt-prettier)                               | रिपोजिटोरीलाई स्थानमै ढाँचाबद्ध गर्नुहोस् (लेखन गर्छ)।                                       |
| [`prettier_check`](#mt-prettier_check)                   | Prettier चेक मोडमा (लेखन हुँदैन); पुनःढाँचाबद्ध आवश्यक परे असफल हुन्छ।                       |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` को उपनाम।                                                                         |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, अनि Vitest (configured भए coverage)।                               |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑मात्र परीक्षणहरू: एड‑अन placeholders/parity + वेबसाइट parity।                           |
| [`translate_app`](#mt-translation-app)                   | `translation_app` को उपनाम।                                                                  |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` बाट एप UI स्ट्रिङ अनुवाद गर्नुहोस्।                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API मार्फत वेबसाइट दस्तावेजहरू अनुवाद गर्नुहोस् (प्राथमिक)।                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | वेबसाइट दस्तावेजहरू समकालिक रूपमा अनुवाद गर्नुहोस् (legacy, non-batch)।                      |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` को उपनाम।                                                            |
| [`translation_web_index`](#mt-translation_web_index)     | होमपेज/navbar/footer UI अनुवाद (`website/i18n/en/code.json → .../<lang>/code.json`)।         |
| [`web_build`](#mt-web_build)                             | दस्तावेज `website/build` मा निर्माण गर्नुहोस् (`--locales` / `BUILD_LOCALES` समर्थन गर्छ)।   |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | अफलाइन‑सुरक्षित लिंक चेक (दूरस्थ HTTP[S] बेवास्ता)।                                          |
| [`web_build_local_preview`](#mt-web_build_local_preview) | स्थानीय gh‑pages पूर्वावलोकन; 8080–8090 मा स्वतः serve; वैकल्पिक परीक्षण/लिंक‑चेक।           |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` लाई `gh-pages` शाखामा push गर्नुहोस्।                                        |

विकल्पहरूको सिन्ट्याक्स

- विकल्पहरू पास गर्न `make <command> OPTS="…"` प्रयोग गर्नुहोस् (उद्धरण सिफारिस)। तल हरेक टार्गेटमा उदाहरण प्रयोग देखाइएका छन्।

--

-

#### Locale build सुझावहरू {#locale-build-tips}

- लोकेलहरूको उपसमूह मात्र निर्माण: `BUILD_LOCALES="en de"` सेट गर्नुहोस् वा वेब टार्गेटहरूमा `OPTS="--locales en,de"` पास गर्नुहोस्।
- विशिष्ट लोकेलको पूर्वावलोकन: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`।

---

### निर्माण र प्याकेज {#build-and-package}

- ZIPs निर्माण: `make pack`
- रिपोजिटोरी रुटमा ATN र LOCAL ZIPs उत्पादन हुन्छ (आर्टिफ्याक्टहरू हातैले सम्पादन नगर्नुहोस्)
- टिप: प्याकेजिङ अघि `sources/manifest_ATN.json` र `sources/manifest_LOCAL.json` दुवैमा भर्जन अद्यावधिक गर्नुहोस्
- म्यानुअल इन्स्टल (डेभ): Thunderbird → Tools → Add‑ons and Themes → गियर → Install Add‑on From File… → बनेको ZIP छान्नुहोस्

---

### परीक्षण {#test}

- पूर्ण सुइट: `make test` (Vitest)
- कभररेज (वैकल्पिक):
- `npm i -D @vitest/coverage-v8`
- `make test` चलाउनुहोस्; HTML प्रतिवेदनका लागि `coverage/index.html` खोल्नुहोस्
- i18n मात्र: `make test_i18n` (UI keys/placeholders/titles + वेबसाइट per‑locale per‑doc parity with id/title/sidebar_label जाँच)

---

### डिबगिङ र लगहरू {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- रनटाइममा विस्तृत लगहरू टगल गर्नुहोस्:
- सक्षम: `messenger.storage.local.set({ debug: true })`
- असक्षम: `messenger.storage.local.set({ debug: false })`
- उत्तर लेख्दा/पठाउँदा लगहरू देखिन्छन्

---

### दस्तावेज (वेबसाइट) {#docs-website}

- डेभ सर्भर: `cd website && npm run start`
- स्थिर साइट निर्माण: `cd website && npm run build`
- Make समतुल्य (वर्णानुक्रममा): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- प्रयोग उदाहरणहरू:
- EN मात्र, परीक्षण/लिंक‑चेक स्किप, push छैन: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- सबै लोकेल, परीक्षण/लिंक‑चेक सहित, अनि push: `make web_build_local_preview && make web_push_github`
- प्रकाशन अघि, अफलाइन‑सुरक्षित लिंक चेक चलाउनुहोस्: `make web_build_linkcheck`।
- i18n: English `website/docs/*.md` मा; जर्मन अनुवाद `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` मा
- खोज: यदि CI मा Algolia DocSearch env vars सेट छन् (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), साइटले Algolia search प्रयोग गर्छ; नभए स्थानीय search मा फिर्ता जान्छ। होमपेजमा, खोज बक्स खोल्न `/` वा `Ctrl+K` थिच्नुहोस्।

---

#### दान पुनर्निर्देशन मार्ग {#donate-redirect}

- `website/src/pages/donate.js`
- मार्ग: `/donate` (र `/<locale>/donate`)
- व्यवहार:
- वर्तमान मार्गमा लोकेल छ (जस्तै, `/de/donate`) भने, त्यही प्रयोग गर्नुहोस्
- अन्यथा, `navigator.languages` र कन्फिगर गरिएका लोकेलहरूबाट उत्तम मिलान छान्नुहोस्; default लोकेलमा फिर्ता जानुहोस्
- यहाँ पुनर्निर्देशन हुन्छ:
- `en` → `/docs/donation`
- बाँकी → `/<locale>/docs/donation`
- सही baseUrl ह्यान्डलिङका लागि `useBaseUrl` प्रयोग गर्छ
- fallback का रूपमा meta refresh + `noscript` लिंक समावेश छ

---

---

#### पूर्वावलोकन सुझावहरू {#preview-tips}

- Node preview सफासँग रोक्नुहोस्: `http://localhost:<port>/__stop` खोल्नुहोस् (`Local server started` पछि प्रिन्ट हुन्छ)।
- MDX/JSX मा छविहरू लोड नहुने हो भने, साइटको `baseUrl` सम्मान गर्न `useBaseUrl('/img/...')` प्रयोग गर्नुहोस्।
- पूर्वावलोकन पहिले सुरु हुन्छ; लिंक चेक त्यसपछि चल्छ र non‑blocking हुन्छ (भाँचिएका बाह्य लिंकहरूले preview रोक्दैन)।
- उदाहरण पूर्वावलोकन URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” पछि प्रिन्ट हुन्छ)।
- लिंक‑चेकमा बाह्य लिंक: केही बाह्य साइटहरू (जस्तै, addons.thunderbird.net) ले स्वचालित क्रलरहरू अवरुद्ध गर्छन् र लिंक चेकमा 403 देखिन सक्छ। पूर्वावलोकन अझै सुरु हुन्छ; यस्ता त्रुटिहरू बेवास्ता गर्न सुरक्षित छन्।

---

#### वेबसाइट अनुवाद गर्नुहोस् {#translate-website}

तपाईं के अनुवाद गर्न सक्नुहुन्छ

- वेबसाइट UI मात्र: होमपेज, navbar, footer, र अन्य UI स्ट्रिङहरू। हालका लागि दस्तावेज सामग्री English‑मात्र रहनेछ।

कहाँ सम्पादन गर्ने

- `website/i18n/<locale>/code.json` सम्पादन गर्नुहोस् (`en` लाई सन्दर्भका रूपमा प्रयोग गर्नुहोस्)। `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` जस्ता placeholders जस्ताका तस्तै राख्नुहोस्।

फाइलहरू सिर्जना वा रिफ्रेस गर्नुहोस्

- सबै लोकेलका हराएका stub सिर्जना: `npm --prefix website run i18n:stubs`
- English बाट stub हरू overwrite (नयाँ स्ट्रिङ थपेपछि): `npm --prefix website run i18n:stubs:force`
- एउटै लोकेलका लागि विकल्प: `npx --prefix website docusaurus write-translations --locale <locale>`

होमपेज/navbar/footer UI स्ट्रिङहरू अनुवाद (OpenAI)

- एकपटक प्रमाणपत्र सेट (shell वा .env):
- `export OPENAI_API_KEY=sk-...`
- वैकल्पिक: `export OPENAI_MODEL=gpt-4o-mini`
- एक‑शट (सबै लोकेल, en स्किप): `make translate_web_index`
- निश्चित लोकेलहरूमा सीमित: `make translate_web_index OPTS="--locales de,fr"`
- विद्यमान मानहरू overwrite गर्नुहोस्: `make translate_web_index OPTS="--force"`

प्रमाणीकरण र पुन: प्रयास

- अनुवाद स्क्रिप्टले JSON संरचना मान्य गर्छ, कर्ली‑ब्रेस placeholders जोगाउँछ, र URLs अपरिवर्तित रहन्छन् भन्ने सुनिश्चित गर्छ।
- प्रमाणीकरण असफल हुँदा, फिडब्याकसहित 2 पटकसम्म पुन: प्रयास गर्छ, त्यसपछि विद्यमान मानहरू राख्छ।

आफ्नो लोकेल पूर्वावलोकन गर्नुहोस्

- डेभ सर्भर: `npm --prefix website run start`
- यहाँ जानुहोस्: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

बुझाउनु

- सम्पादित `code.json` फाइल(हरू) सहित PR खोल्नुहोस्। परिवर्तनहरू केन्द्रित राख्नुहोस् र सकेसम्म चाँडो स्क्रिनसट समावेश गर्नुहोस्।

---

### सुरक्षा र कन्फिगरेसन सुझावहरू {#security-and-configuration-tips}

- `sources/manifest.json` commit नगर्नुहोस् (build ले अस्थायी रूपमा सिर्जना गर्छ)
- अपडेट च्यानल जोगाउन `browser_specific_settings.gecko.id` स्थिर राख्नुहोस्

---

### सेटिङ्स स्थायित्व {#settings-persistence}

- भण्डारण: सबै प्रयोगकर्ता सेटिङहरू `storage.local` मा बस्छन् र एड‑अन अपडेटहरूमा पनि टिक्छन्।
- इन्स्टल: कुनै कुञ्जी कडाइका साथ हराएको (undefined) हुँदा मात्र default लागू हुन्छ।
- अपडेट: माइग्रेसनले हराएका कुञ्जीहरू मात्र भर्छ; विद्यमान मानहरू कहिल्यै overwrite हुँदैनन्।
- स्किमा मार्कर: `settingsVersion` (हाल `1`)।
- कुञ्जीहरू र default:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- कोड: `sources/background.js` → `initializeOrMigrateSettings()` र `SCHEMA_VERSION` हेर्नुहोस्।

डेभ कार्यप्रवाह (नयाँ सेटिङ थप्दा)

- `sources/background.js` मा `SCHEMA_VERSION` बढाउनुहोस्।
- `initializeOrMigrateSettings()` भित्र `DEFAULTS` वस्तुमा नयाँ कुञ्जी + default थप्नुहोस्।
- default seed गर्दा "only-if-undefined" नियम प्रयोग गर्नुहोस्; विद्यमान मानहरू overwrite नगर्नुहोस्।
- सेटिङ प्रयोगकर्ता‑देखिने भए, `sources/options.js` मा वायर गर्नुहोस् र स्थानीयकृत स्ट्रिङहरू थप्नुहोस्।
- परीक्षणहरू थप्नुहोस्/समायोजन गर्नुहोस् (`tests/background.settings.migration.test.js` हेर्नुहोस्)।

म्यानुअल परीक्षण सुझावहरू

- नयाँ इन्स्टल जस्तो simulate: एक्सटेन्सनको डेटा डाइरेक्टरी खाली गर्नुहोस् वा नयाँ प्रोफाइलबाट सुरु गर्नुहोस्।
- अपडेट simulate: `storage.local` मा `settingsVersion` लाई `0` राख्नुहोस् र पुनः‑लोड गर्नुहोस्; विद्यमान मानहरू अपरिवर्तित रहन्छन् र हराएका कुञ्जीहरू मात्र थपिन्छन् भन्ने प्रमाणित गर्नुहोस्।

---

### समस्या निवारण {#troubleshooting}

- Thunderbird 128 ESR वा नयाँ प्रयोग भएको सुनिश्चित गर्नुहोस्
- रनटाइम समस्याका लागि Error Console प्रयोग गर्नुहोस्
- यदि भण्डारित सेटिङहरू ठीकसँग लागू नभएको देखिएमा, Thunderbird पुनः सुरु गरेर फेरि प्रयास गर्नुहोस्। (Thunderbird ले सेसनहरूबीच अवस्था क्यास गर्न सक्छ; पुनः सुरु गर्दा ताजा सेटिङहरू लोड हुन्छन्।)

---

### CI र कभररेज {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ले coverage thresholds (85% lines/functions/branches/statements) सहित vitest चलाउँछ। Threshold पूरा नभएमा, जॉब असफल हुन्छ।
- workflow ले HTML प्रतिवेदन सहितको आर्टिफ्याक्ट `coverage-html` अपलोड गर्छ; run पेजबाट डाउनलोड गर्नुहोस् (Actions → latest run → Artifacts)।

---

### योगदान {#contributing}

- CONTRIBUTING.md हेर्नुहोस् (branch/commit/PR दिशानिर्देशका लागि)
- टिप: परीक्षणका लागि छुट्टै Thunderbird विकास प्रोफाइल सिर्जना गर्नुहोस् ताकि दैनिक प्रोफाइलमा असर नपरोस्।

---

### अनुवादहरू

- ठूलो “all → all” अनुवाद जॉबहरू ढिला र महंगा हुन सक्छन्। सानो उपसमूहबाट सुरु गर्नुहोस् (उदाहरणका लागि, केही दस्तावेज र 1–2 लोकेल), परिणाम समीक्षा गर्नुहोस्, अनि विस्तार गर्नुहोस्।

---

- पुन: प्रयास नीति: अनुवाद जॉबहरूले API त्रुटिहरूमा exponential backoff सहित 3 पटकसम्म retries गर्छन्; `scripts/translate_web_docs_batch.js` र `scripts/translate_web_docs_sync.js` हेर्नुहोस्।

दस्तावेजका लागि स्क्रिनसटहरू

- छविहरू `website/static/img/` अन्तर्गत राख्नुहोस्।
- तिनीहरूलाई MD/MDX मा `useBaseUrl('/img/<filename>')` मार्फत सन्दर्भ गर्नुहोस् ताकि पाथहरू साइटको `baseUrl` सँग काम गर्नेछन्।
- `website/static/img/` अन्तर्गत छविहरू थपेपछि वा पुनः नामकरण गरेपछि, सबै सन्दर्भहरू अझै पनि `useBaseUrl('/img/…')` प्रयोग भएको र स्थानीय पूर्वावलोकनमा रेन्डर भएको पुष्टि गर्नुहोस्।
  Favicons

- बहु‑साइज `favicon.ico` सबै build मार्गहरू (Make + स्क्रिप्टहरू) मा `website/scripts/build-favicon.mjs` मार्फत स्वचालित रूपमा उत्पन्न हुन्छ।
- म्यानुअल चरण आवश्यक छैन; `icon-*.png` अद्यावधिक गर्नु पर्याप्त छ।
  समीक्षा सुझाव

- अनुवादित दस्तावेजहरूमा front‑matter `id` अपरिवर्तित राख्नुहोस्; उपस्थित हुँदा `title` र `sidebar_label` मात्र अनुवाद गर्नुहोस्।

#### clean {#mt-clean}

- उद्देश्य: स्थानीय build/preview आर्टिफ्याक्टहरू हटाउनु।
- प्रयोग: `make clean`
- हटाउँछ (भएमा):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- उद्देश्य: ढाँचा मिलाउनु, परीक्षण, changelog अद्यावधिक, commit, र push गर्नु।
- प्रयोग: `make commit`
- विवरण: Prettier (write), `make test`, `make test_i18n` चलाउँछ; staged diff हुँदा changelog थप्छ; `origin/<branch>` मा push गर्छ।

---

#### eslint {#mt-eslint}

- उद्देश्य: flat config मार्फत ESLint चलाउनु।
- प्रयोग: `make eslint`

---

#### help {#mt-help}

- उद्देश्य: एक‑पंक्ति डक्स सहित सबै टार्गेट सूचीबद्ध गर्नु।
- प्रयोग: `make help`

---

#### lint {#mt-lint}

- उद्देश्य: `web-ext` प्रयोग गरी MailExtension लाई lint गर्नु।
- प्रयोग: `make lint`
- नोट्स: `sources/manifest_LOCAL.json` → `sources/manifest.json` अस्थायी‑प्रतिलिपि गर्छ; बनेका ZIPs बेवास्ता; चेतावनीहरूले पाइपलाइन असफल गर्दैनन्।

---

#### menu {#mt-menu}

- उद्देश्य: Make टार्गेट र वैकल्पिक आर्गुमेन्ट छान्न इन्टरेक्टिभ मेनु।
- प्रयोग: कुनै आर्गुमेन्ट बिना `make` चलाउनुहोस्।
- नोट्स: `whiptail` उपलब्ध नभएमा, मेनु `make help` मा फिर्ता जान्छ।

---

#### pack {#mt-pack}

- उद्देश्य: ATN र LOCAL ZIPs निर्माण (`lint` मा निर्भर)।
- प्रयोग: `make pack`
- सुझाव: प्याकेजिङ अघि `sources/manifest_*.json` मा भर्जनहरू बढाउनुहोस्।

---

#### prettier {#mt-prettier}

- उद्देश्य: रिपोजिटोरी स्थानमै ढाँचाबद्ध गर्नु।
- प्रयोग: `make prettier`

#### prettier_check {#mt-prettier_check}

- उद्देश्य: ढाँचाबद्धता प्रमाणित गर्नु (लेखन छैन)।
- प्रयोग: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- उद्देश्य: `prettier` को उपनाम।
- प्रयोग: `make prettier_write`

---

#### test {#mt-test}

- उद्देश्य: Prettier (write), ESLint, अनि Vitest (इन्स्टल भए coverage) चलाउनु।
- प्रयोग: `make test`

#### test_i18n {#mt-test_i18n}

- उद्देश्य: एड‑अन स्ट्रिङ र वेबसाइट दस्तावेजका लागि i18n‑केन्द्रित परीक्षण।
- प्रयोग: `make test_i18n`
- चलाउँछ: `npm run test:i18n` र `npm run -s test:website-i18n`।

---

#### translate_app / translation_app {#mt-translation-app}

- उद्देश्य: EN बाट अन्य लोकेलहरूमा एड‑अन UI स्ट्रिङहरू अनुवाद गर्नु।
- प्रयोग: `make translation_app OPTS="--locales all|de,fr"`
- नोट्स: कुञ्जी संरचना र placeholders जोगाउँछ; `translation_app.log` मा लग गर्छ। स्क्रिप्ट फारम: `node scripts/translate_app.js --locales …`।

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- उद्देश्य: वेबसाइट दस्तावेजहरू `website/docs/*.md` बाट `website/i18n/<locale>/...` मा अनुवाद गर्नु।
- प्राथमिक: `translate_web_docs_batch` (OpenAI Batch API)
  - प्रयोग (फ्ल्यागहरू): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional अझै स्वीकार्य: `OPTS="<doc|all> <lang|all>"`
- व्यवहार: JSONL निर्माण, अपलोड, 30 सेकेन्डमा पोल, परिणाम डाउनलोड, फाइल लेखाइ।
- नोट: batch जॉब 24 घण्टासम्म लाग्न सक्छ (OpenAI को batch विन्डो अनुसार)। प्रत्येक पोलमा कन्सोलले elapsed time देखाउँछ।
- Env: `OPENAI_API_KEY` (आवश्यक), वैकल्पिक `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`।
- Legacy: `translate_web_docs_sync`
  - प्रयोग (फ्ल्यागहरू): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional अझै स्वीकार्य: `OPTS="<doc|all> <lang|all>"`
- व्यवहार: जोडी‑जोड़ी समकालिक अनुरोधहरू (batch संकलन बिना)।
- नोट्स: `OPTS` छुट्दा इन्टरेक्टिभ प्रम्प्टहरू। दुवै मोडले code blocks/inline code जोगाउँछन् र front‑matter `id` अपरिवर्तित राख्छन्; लग: `translation_web_batch.log` (batch) वा `translation_web_sync.log` (sync)।

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- उद्देश्य: वेबसाइट UI स्ट्रिङहरू (होमपेज, navbar, footer) `website/i18n/en/code.json` बाट सबै लोकेलहरूमा `website/i18n/<locale>/code.json` अन्तर्गत अनुवाद गर्नु (`en` बाहेक)।
- प्रयोग: `make translate_web_index` वा `make translate_web_index OPTS="--locales de,fr [--force]"`
- आवश्यकताहरू: `OPENAI_API_KEY` export गर्नुहोस् (वैकल्पिक: `OPENAI_MODEL=gpt-4o-mini`)।
- व्यवहार: JSON संरचना मान्य गर्छ, कर्ली‑ब्रेस placeholders जोगाउँछ, URLs अपरिवर्तित राख्छ, र प्रमाणीकरण त्रुटिमा फिडब्याकसहित retries गर्छ।

---

#### web_build {#mt-web_build}

- उद्देश्य: दस्तावेज साइट `website/build` मा निर्माण गर्नु।
- प्रयोग: `make web_build OPTS="--locales en|de,en|all"` (वा `BUILD_LOCALES="en de"` सेट गर्नुहोस्)
- आन्तरिक: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`।
- निर्भरताहरू: `website/node_modules/@docusaurus` हराएको भए मात्र `website/` मा `npm ci` चलाउँछ।

#### web_build_linkcheck {#mt-web_build_linkcheck}

- उद्देश्य: अफलाइन‑सुरक्षित लिंक चेक।
- प्रयोग: `make web_build_linkcheck OPTS="--locales en|all"`
- नोट्स: `tmp_linkcheck_web_pages` मा निर्माण गर्छ; GH Pages `baseUrl` लाई `/` मा पुनर्लेखन गर्छ; दूरस्थ HTTP(S) लिंकहरू स्किप गर्छ।

#### web_build_local_preview {#mt-web_build_local_preview}

- उद्देश्य: वैकल्पिक परीक्षण/लिंक‑चेक सहित स्थानीय gh‑pages पूर्वावलोकन।
- प्रयोग: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- व्यवहार: पहिले Node preview सर्भर प्रयास गर्छ (`scripts/preview-server.mjs`, `/__stop` समर्थन), असफल भए `python3 -m http.server` मा फिर्ता; 8080–8090 मा serve; PID `web-local-preview/.server.pid` मा।

#### web_push_github {#mt-web_push_github}

- उद्देश्य: `website/build` लाई `gh-pages` शाखामा push गर्नु।
- प्रयोग: `make web_push_github`

सुझाव: Makefile ले प्रयोग गर्ने प्याकेज म्यानेजर अधिलेखन गर्न `NPM=…` सेट गर्नुहोस् (default `npm`)।
