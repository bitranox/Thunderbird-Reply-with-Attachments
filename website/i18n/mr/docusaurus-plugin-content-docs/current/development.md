---
id: development
title: 'विकास'
sidebar_label: 'विकास'
---

---

## विकास मार्गदर्शक {#development-guide}

:::note फक्त इंग्रजी संपादित करा; अनुवाद आपोआप लागू होतात
दस्तावेजीकरण फक्त `website/docs` (इंग्रजी) अंतर्गत अद्यतनित करा. `website/i18n/<locale>/…` अंतर्गतचे अनुवाद निर्माण केले जातात आणि त्यांना हाताने संपादित करू नये. स्थानिकीकरण केलेली सामग्री रीफ्रेश करण्यासाठी भाषांतर कार्ये वापरा (उदा., `make translate_web_docs_batch`).
:::

### पूर्वअट {#prerequisites}

- Node.js 22+ आणि npm (Node 22 सह चाचणी केली)
- Thunderbird 128 ESR किंवा नवीन (मॅन्युअल चाचणीसाठी)

---

### प्रकल्प मांडणी (उच्च‑स्तरीय) {#project-layout-high-level}

- Root: पॅकेजिंग स्क्रिप्ट `distribution_zip_packer.sh`, दस्तऐवज, स्क्रीनशॉट्स
- `sources/`: मुख्य अॅड‑ऑन कोड (background, options/popup UI, manifests, icons)
- `tests/`: Vitest संच
- `website/`: Docusaurus दस्तऐवज (`website/i18n/de/...` अंतर्गत i18n सह)

---

### इंस्टॉल आणि टूलिंग {#install-and-tooling}

- मूळ (root) अवलंबितता इंस्टॉल: `npm ci`
- Docs (पर्यायी): `cd website && npm ci`
- टार्गेट शोधा: `make help`

---

### Live Dev (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop मध्ये जलद पळ (केवळ UI smoke‑tests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird मध्ये चालवा (MailExtensions साठी प्राधान्य):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- टिप्स:
- Thunderbird चा Error Console उघडा ठेवावा (Tools → Developer Tools → Error Console).
- MV3 इव्हेंट पृष्ठे निष्क्रिय असताना निलंबित होतात; कोड बदलांनंतर अॅड‑ऑन रीलोड करा, किंवा web‑ext ला ऑटो‑रीलोड करू द्या.
- काही केवळ Firefox‑साठी असलेल्या वर्तनांमध्ये फरक असतो; API समतोलासाठी नेहमी Thunderbird मध्ये सत्यापित करा.
- Thunderbird बायनरी पाथ (उदाहरणे):
- Linux: `thunderbird` (उदा., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- प्रोफाइल अलगाव: आपल्या दैनंदिन सेटअपवर परिणाम टाळण्यासाठी विकासासाठी स्वतंत्र Thunderbird प्रोफाइल वापरा.

---

### Make Targets (वर्णक्रमानुसार) {#make-targets-alphabetical}

Makefile सामान्य dev प्रवाह प्रमाणीकृत करते. प्रत्येक टार्गेटची एका ओळीतील सारांशासाठी कधीही `make help` चालवा.

टीप: कोणताही टार्गेट न देता `make` चालवल्यास, टार्गेट निवडण्यासाठी साधा Whiptail मेनू उघडतो.

| टार्गेट                                                  | एका ओळीतील वर्णन                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | स्थानिक build/preview आर्टिफॅक्ट्स काढा (tmp/, web-local-preview/, website/build/).       |
| [`commit`](#mt-commit)                                   | फॉरमॅट, चाचण्या चालवा (i18n सहित), changelog अद्यतनित करा, commit आणि push करा.           |
| [`eslint`](#mt-eslint)                                   | फ्लॅट कॉन्फिगद्वारे ESLint चालवा (`npm run -s lint:eslint`).                              |
| [`help`](#mt-help)                                       | सर्व टार्गेट एका ओळीतील डॉकसह यादीबद्ध करा (वर्गीकृत).                                    |
| [`lint`](#mt-lint)                                       | `sources/` वर web‑ext lint (तात्पुरता manifest; ZIPs दुर्लक्षित; non‑fatal).              |
| [`menu`](#mt-menu)                                       | टार्गेट आणि पर्यायी आर्ग्युमेंट्स निवडण्यासाठी इंटरॅक्टिव्ह मेनू.                         |
| [`pack`](#mt-pack)                                       | ATN आणि LOCAL ZIPs तयार करा (लिंटर चालवते; पॅकर स्क्रिप्ट कॉल करते).                      |
| [`prettier`](#mt-prettier)                               | रेपॉझिटरी ठिकाणीच फॉरमॅट करा (बदल लिहिते).                                                |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check मोड (लिहीण नाही); रिफॉरमॅट हवे असल्यास फेल.                                |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` साठी उपनाव.                                                                    |
| [`test`](#mt-test)                                       | Prettier (write), मग ESLint, नंतर Vitest (कॉन्फिगर असल्यास coverage).                     |
| [`test_i18n`](#mt-test_i18n)                             | फक्त i18n चाचण्या: अॅड‑ऑन placeholders/parity + वेबसाइट parity.                           |
| [`translate_app`](#mt-translation-app)                   | `translation_app` साठी उपनाव.                                                             |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` मधून अॅप UI स्ट्रिंग्जचा अनुवाद.                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API द्वारे वेबसाइट डॉक अनुवाद (प्राधान्य).                                   |
| [`translate_web_docs_sync`](#mt-translation-web)         | वेबसाइट डॉक समकालीनपणे अनुवादित करा (वारसा, non-batch).                                   |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` साठी उपनाव.                                                       |
| [`translation_web_index`](#mt-translation_web_index)     | मुखपृष्ठ/navbar/footer UI चे अनुवाद (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | `website/build` मध्ये डॉक तयार करा (`--locales` / `BUILD_LOCALES` समर्थित).               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ऑफलाइन‑सुरक्षित लिंक तपासणी (दूरस्थ HTTP[S] वगळते).                                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | स्थानिक gh‑pages प्रीव्ह्यू; 8080–8090 वर ऑटो‑serve; पर्यायी चाचण्या/लिंक‑चेक.            |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ला `gh-pages` ब्रँचवर push करा.                                           |

पर्यायांसाठी वाक्यरचना

- पर्याय पास करण्यासाठी `make <command> OPTS="…"` वापरा (उद्धरणे शिफारसीय). खाली प्रत्येक टार्गेटमध्ये उदाहरण वापर दाखवला आहे.

--

-

#### लोकॅल build टिप्स {#locale-build-tips}

- लोकॅल्सचा उपसंच तयार करा: `BUILD_LOCALES="en de"` सेट करा किंवा वेब टार्गेटना `OPTS="--locales en,de"` पास करा.
- विशिष्ट लोकॅल प्रीव्ह्यू: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build आणि पॅकेज {#build-and-package}

- ZIPs तयार करा: `make pack`
- रेपो root मध्ये ATN आणि LOCAL ZIPs निर्माण होतात (आर्टिफॅक्ट्स हाताने संपादित करू नका)
- टीप: पॅकेजिंगपूर्वी `sources/manifest_ATN.json` आणि `sources/manifest_LOCAL.json` दोन्हीमध्ये आवृत्ती अद्यतनित करा
- मॅन्युअल इंस्टॉल (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → तयार केलेला ZIP निवडा

---

### चाचणी {#test}

- पूर्ण संच: `make test` (Vitest)
- कव्हरेज (पर्यायी):
- `npm i -D @vitest/coverage-v8`
- `make test` चालवा; HTML अहवालासाठी `coverage/index.html` उघडा
- फक्त i18n: `make test_i18n` (UI keys/placeholders/titles + वेबसाइट per‑locale per‑doc parity सह id/title/sidebar_label तपासणी)

---

### डीबगिंग आणि लॉग्स {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- रनटाइमवर विस्तृत लॉग्ज टॉगल करा:
- सक्षम: `messenger.storage.local.set({ debug: true })`
- अक्षम: `messenger.storage.local.set({ debug: false })`
- प्रत्युत्तरे compose/पाठवताना लॉग्ज दिसतात

---

### Docs (वेबसाइट) {#docs-website}

- Dev सर्व्हर: `cd website && npm run start`
- स्टॅटिक साइट तयार करा: `cd website && npm run build`
- Make समतुल्य (वर्णक्रमानुसार): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- वापर उदाहरणे:
- फक्त EN, चाचण्या/लिंक‑चेक वगळा, push नाही: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- सर्व लोकॅल्स, चाचण्या/लिंक‑चेकसह, नंतर push: `make web_build_local_preview && make web_push_github`
- प्रकाशित करण्यापूर्वी, ऑफलाइन‑सुरक्षित लिंक चेक चालवा: `make web_build_linkcheck`.
- i18n: इंग्रजी `website/docs/*.md` मध्ये; जर्मन अनुवाद `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` मध्ये
- शोध: जर CI मध्ये Algolia DocSearch env vars सेट असतील (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), साइट Algolia शोध वापरते; अन्यथा ती स्थानिक शोधावर परतते. मुखपृष्ठावर, शोध बॉक्स उघडण्यासाठी `/` किंवा `Ctrl+K` दाबा.

---

#### देणगी पुनर्निर्देशन मार्ग {#donate-redirect}

- `website/src/pages/donate.js`
- Route: `/donate` (आणि `/<locale>/donate`)
- वर्तन:
- जर वर्तमान मार्गाला लोकॅल असेल (उदा., `/de/donate`), तर तोच वापरा
- अन्यथा, `navigator.languages` विरुद्ध कॉन्फिगर केलेल्या लोकॅल्समधून सर्वोत्तम जुळणी निवडा; डीफॉल्ट लोकॅलवर परत या
- येथे पुनर्निर्देशित:
- `en` → `/docs/donation`
- इतर → `/<locale>/docs/donation`
- योग्य baseUrl हाताळणीसाठी `useBaseUrl` वापरते
- फॉलबॅक म्हणून meta refresh + `noscript` लिंक समाविष्ट

---

---

#### प्रीव्ह्यू टिप्स {#preview-tips}

- Node प्रीव्ह्यू स्वच्छपणे थांबवा: `http://localhost:<port>/__stop` उघडा (`Local server started` नंतर मुद्रित).
- MDX/JSX मध्ये प्रतिमा लोड होत नसतील, तर साइट `baseUrl` चे पालन करण्यासाठी `useBaseUrl('/img/...')` वापरा.
- प्रीव्ह्यू प्रथम सुरू होते; लिंक चेक नंतर चालतो आणि non‑blocking असतो (तुटलेल्या बाह्य लिंक प्रीव्ह्यू थांबवत नाहीत).
- उदाहरण प्रीव्ह्यू URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” नंतर मुद्रित).
- लिंक‑चेक मधील बाह्य लिंक: काही बाह्य साइट्स (उदा., addons.thunderbird.net) स्वयंचलित crawlers ब्लॉक करतात आणि लिंक चेकमध्ये 403 दाखवू शकतात. प्रीव्ह्यू तरीही सुरू होतो; हे दुर्लक्षित करणे सुरक्षित आहे.

---

#### वेबसाइटचे भाषांतर करा {#translate-website}

तुम्ही काय अनुवाद करू शकता

- केवळ वेबसाइट UI: मुखपृष्ठ, navbar, footer आणि इतर UI स्ट्रिंग्ज. Docs सामग्री सध्या इंग्रजी‑पुरतीच राहते.

कुठे संपादित करायचे

- `website/i18n/<locale>/code.json` संपादित करा (`en` संदर्भ म्हणून वापरा). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` सारखी placeholders अपरिवर्तित ठेवा.

फाइल्स तयार करा किंवा रीफ्रेश करा

- सर्व लोकॅल्ससाठी हरवलेल्या stubs तयार करा: `npm --prefix website run i18n:stubs`
- इंग्रजीतून stubs overwrite करा (नवीन स्ट्रिंग्ज जोडल्यानंतर): `npm --prefix website run i18n:stubs:force`
- एका लोकॅलसाठी पर्याय: `npx --prefix website docusaurus write-translations --locale <locale>`

मुखपृष्ठ/navbar/footer UI स्ट्रिंग्जचा अनुवाद (OpenAI)

- क्रेडेन्शियल्स एकदाच सेट करा (shell किंवा .env):
- `export OPENAI_API_KEY=sk-...`
- पर्यायी: `export OPENAI_MODEL=gpt-4o-mini`
- एकदाच (सर्व लोकॅल्स, en वगळा): `make translate_web_index`
- विशिष्ट लोकॅल्सपुरते मर्यादित: `make translate_web_index OPTS="--locales de,fr"`
- विद्यमान मूल्ये overwrite करा: `make translate_web_index OPTS="--force"`

प्रमाणीकरण आणि पुन्हा प्रयत्न

- भाषांतर स्क्रिप्ट JSON रचना वैध करते, वक्र कंस placeholders जपते आणि URL अपरिवर्तित असल्याचे सुनिश्चित करते.
- प्रमाणीकरण अयशस्वी झाल्यास, विद्यमान मूल्ये ठेवण्यापूर्वी अभिप्रायासह 2 वेळा पुन्हा प्रयत्न करते.

तुमचा लोकॅल प्रीव्ह्यू करा

- Dev सर्व्हर: `npm --prefix website run start`
- येथे भेट द्या: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

सबमिट करणे

- संपादित `code.json` फाइल(स्) सह PR उघडा. बदल केंद्रित ठेवा आणि शक्य असल्यास जलद स्क्रीनशॉट समाविष्ट करा.

---

### सुरक्षा आणि कॉन्फिगरेशन टिप्स {#security-and-configuration-tips}

- `sources/manifest.json` commit करू नका (build दरम्यान तात्पुरते तयार केले जाते)
- अपडेट चॅनेल जतन करण्यासाठी `browser_specific_settings.gecko.id` स्थिर ठेवा

---

### सेटिंग्ज टिकून राहणे {#settings-persistence}

- संचय: सर्व वापरकर्ता सेटिंग्ज `storage.local` मध्ये राहतात आणि अॅड‑ऑन अपडेट्सदरम्यान टिकून राहतात.
- इंस्टॉल: की कडकपणे अनुपस्थित (undefined) असतानाच डीफॉल्ट लागू होतात.
- अपडेट: माइग्रेशन फक्त हरवलेल्या keys भरते; विद्यमान मूल्ये कधीही overwrite होत नाहीत.
- स्कीमा मार्कर: `settingsVersion` (सध्या `1`).
- कीज आणि डीफॉल्ट्स:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- कोड: `sources/background.js` → `initializeOrMigrateSettings()` आणि `SCHEMA_VERSION` पहा.

Dev वर्कफ्लो (नवीन सेटिंग जोडणे)

- `sources/background.js` मध्ये `SCHEMA_VERSION` bump करा.
- `initializeOrMigrateSettings()` मधील `DEFAULTS` ऑब्जेक्टमध्ये नवीन key + डीफॉल्ट जोडा.
- डीफॉल्ट seed करताना "only-if-undefined" नियम वापरा; विद्यमान मूल्ये overwrite करू नका.
- सेटिंग वापरकर्त्यास दृश्यमान असल्यास, ते `sources/options.js` मध्ये जोडा आणि localized स्ट्रिंग्ज जोडा.
- चाचण्या जोडा/समायोजित करा (`tests/background.settings.migration.test.js` पहा).

मॅन्युअल चाचणी टिप्स

- नवीन इंस्टॉलची नक्कल करा: एक्स्टेंशनची data dir साफ करा किंवा नवीन प्रोफाइलसह प्रारंभ करा.
- अपडेटची नक्कल करा: `storage.local` मध्ये `settingsVersion` ला `0` वर सेट करा आणि पुन्हा लोड करा; विद्यमान मूल्ये अपरिवर्तित राहतात आणि फक्त हरवलेल्या keys जोडल्या जातात याची पुष्टी करा.

---

### अडचण निराकरण {#troubleshooting}

- Thunderbird 128 ESR किंवा नवीन याची खात्री करा
- रनटाइम समस्यांसाठी Error Console वापरा
- स्टोअर्ड सेटिंग्ज योग्यरित्या लागू होत नसल्याचे दिसल्यास, Thunderbird रीस्टार्ट करून पुन्हा प्रयत्न करा. (Thunderbird सत्रांमध्ये स्थिती कॅश करू शकतो; रीस्टार्ट केल्याने ताजी सेटिंग्ज लोड होतात.)

---

### CI आणि कव्हरेज {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) कव्हरेज thresholds (85% lines/functions/branches/statements) सह vitest चालवते. Thresholds पूर्ण न झाल्यास, जॉब फेल होतो.
- वर्कफ्लो HTML अहवालासह `coverage-html` आर्टिफॅक्ट अपलोड करतो; रन पानावरून डाउनलोड करा (Actions → नवीनतम रन → Artifacts).

---

### योगदान {#contributing}

- शाखा/commit/PR मार्गदर्शकांसाठी CONTRIBUTING.md पहा
- टीप: आपल्या दैनंदिन प्रोफाइलवर परिणाम टाळण्यासाठी चाचणीसाठी स्वतंत्र Thunderbird विकास प्रोफाइल तयार करा.

---

### अनुवाद

- मोठ्या “all → all” भाषांतर कामांना संथ आणि महागडे असू शकते. उपसंचाने प्रारंभ करा (उदा., काही डॉक आणि 1–2 लोकॅल्स), निकाल पुनरावलोकन करा, नंतर विस्तारित करा.

---

- Retry धोरण: भाषांतर जॉब्स API त्रुटींवर exponential backoff सह जास्तीत जास्त 3 retries करतात; `scripts/translate_web_docs_batch.js` आणि `scripts/translate_web_docs_sync.js` पहा.

Docs साठी स्क्रीनशॉट्स

- प्रतिमा `website/static/img/` अंतर्गत स्टोअर करा.
- पाथ साइट `baseUrl` सह कार्य करण्यासाठी MD/MDX मध्ये `useBaseUrl('/img/<filename>')` द्वारे त्यांचा संदर्भ घ्या.
- `website/static/img/` अंतर्गत प्रतिमा जोडल्यावर किंवा नाव बदलल्यावर, सर्व संदर्भ अजूनही `useBaseUrl('/img/…')` वापरतात आणि स्थानिक प्रीव्ह्यूमध्ये रेंडर होतात याची पुष्टी करा.
  फेव्हिकॉन्स

- मल्टि‑आकार `favicon.ico` सर्व build पाथमध्ये (Make + स्क्रिप्ट्स) `website/scripts/build-favicon.mjs` द्वारे आपोआप तयार केला जातो.
- कोणतीही मॅन्युअल पायरी आवश्यक नाही; `icon-*.png` अद्यतनित करणे पुरेसे आहे.
  पुनरावलोकन टिप

- अनुवादित डॉकमध्ये फ्रंट‑मॅटर `id` अपरिवर्तित ठेवा; आवश्यकता असल्यास फक्त `title` आणि `sidebar_label` चे भाषांतर करा.

#### clean {#mt-clean}

- उद्देश: स्थानिक build/preview आर्टिफॅक्ट्स काढा.
- वापर: `make clean`
- काढतो (असल्यास):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- उद्देश: फॉरमॅट, चाचणी, changelog अद्यतन, commit आणि push.
- वापर: `make commit`
- तपशील: Prettier (write), `make test`, `make test_i18n` चालवतो; staged diffs असल्यास changelog अॅपेंड करतो; `origin/<branch>` वर push करतो.

---

#### eslint {#mt-eslint}

- उद्देश: फ्लॅट कॉन्फिगद्वारे ESLint चालवा.
- वापर: `make eslint`

---

#### help {#mt-help}

- उद्देश: एका ओळीतील डॉकसह सर्व टार्गेट यादीबद्ध करा.
- वापर: `make help`

---

#### lint {#mt-lint}

- उद्देश: `web-ext` वापरून MailExtension ला lint करा.
- वापर: `make lint`
- नोंदी: तात्पुरते `sources/manifest_LOCAL.json` → `sources/manifest.json` कॉपी करतो; तयार केलेले ZIPs दुर्लक्षित; चेतावणी pipeline फेल करत नाहीत.

---

#### menu {#mt-menu}

- उद्देश: Make टार्गेट आणि पर्यायी आर्ग्युमेंट्स निवडण्यासाठी इंटरॅक्टिव्ह मेनू.
- वापर: कोणतेही आर्ग्युमेंट्स न देता `make` चालवा.
- नोंदी: `whiptail` उपलब्ध नसेल तर, मेनू `make help` वर परततो.

---

#### pack {#mt-pack}

- उद्देश: ATN आणि LOCAL ZIPs तयार करा (`lint` वर अवलंबून).
- वापर: `make pack`
- टीप: पॅकेजिंगपूर्वी `sources/manifest_*.json` दोन्हीमध्ये आवृत्त्या bump करा.

---

#### prettier {#mt-prettier}

- उद्देश: रेपो ठिकाणीच फॉरमॅट करा.
- वापर: `make prettier`

#### prettier_check {#mt-prettier_check}

- उद्देश: फॉरमॅटिंग सत्यापित करा (लिहीण नाही).
- वापर: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- उद्देश: `prettier` साठी उपनाव.
- वापर: `make prettier_write`

---

#### test {#mt-test}

- उद्देश: Prettier (write), मग ESLint, नंतर Vitest (इंस्टॉल असल्यास coverage).
- वापर: `make test`

#### test_i18n {#mt-test_i18n}

- उद्देश: अॅड‑ऑन स्ट्रिंग्ज आणि वेबसाइट डॉकसाठी i18n‑केंद्रित चाचण्या.
- वापर: `make test_i18n`
- चालवतो: `npm run test:i18n` आणि `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- उद्देश: EN मधून इतर लोकॅल्समध्ये अॅड‑ऑन UI स्ट्रिंग्जचे भाषांतर.
- वापर: `make translation_app OPTS="--locales all|de,fr"`
- नोंदी: key रचना आणि placeholders जपतो; `translation_app.log` मध्ये लॉग्ज. स्क्रिप्ट रूप: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- उद्देश: वेबसाइट डॉक `website/docs/*.md` मधून `website/i18n/<locale>/...` मध्ये अनुवादित करा.
- प्राधान्य: `translate_web_docs_batch` (OpenAI Batch API)
  - वापर (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - वारसा positional अजूनही स्वीकारले जाते: `OPTS="<doc|all> <lang|all>"`
- वर्तन: JSONL तयार करतो, अपलोड करतो, प्रत्येक 30s ला पोल करतो, निकाल डाउनलोड करतो, फाइल्स लिहितो.
- नोंद: batch जॉब पूर्ण होण्यासाठी 24 तास लागू शकतात (OpenAI च्या batch विंडोनुसार). कन्सोल प्रत्येक पोलवर elapsed time दाखवतो.
- Env: `OPENAI_API_KEY` (आवश्यक), पर्यायी `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (डीफॉल्ट 24h), `BATCH_POLL_INTERVAL_MS`.
- वारसा: `translate_web_docs_sync`
  - वापर (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - वारसा positional अजूनही स्वीकारले जाते: `OPTS="<doc|all> <lang|all>"`
- वर्तन: समकालीन per‑pair विनंत्या (batch aggregation नाही).
- नोंदी: `OPTS` वगळले असता इंटरॅक्टिव्ह prompts. दोन्ही मोड्स कोड ब्लॉक्स/inline कोड जपतात आणि फ्रंट‑मॅटर `id` अपरिवर्तित ठेवतात; `translation_web_batch.log` (batch) किंवा `translation_web_sync.log` (sync) मध्ये लॉग करतात.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- उद्देश: वेबसाइट UI स्ट्रिंग्ज (मुखपृष्ठ, navbar, footer) `website/i18n/en/code.json` मधून `website/i18n/<locale>/code.json` अंतर्गत सर्व लोकॅल्समध्ये अनुवादित करा (`en` वगळता).
- वापर: `make translate_web_index` किंवा `make translate_web_index OPTS="--locales de,fr [--force]"`
- आवश्यकता: `OPENAI_API_KEY` निर्यात करा (पर्यायी: `OPENAI_MODEL=gpt-4o-mini`).
- वर्तन: JSON रचना वैध करते, वक्र कंस placeholders जपते, URL अपरिवर्तित ठेवते आणि प्रमाणीकरण त्रुटींवर अभिप्रायासह पुन्हा प्रयत्न करते.

---

#### web_build {#mt-web_build}

- उद्देश: डॉक साइट `website/build` मध्ये तयार करा.
- वापर: `make web_build OPTS="--locales en|de,en|all"` (किंवा `BUILD_LOCALES="en de"` सेट करा)
- अंतर्गत: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- अवलंबितता: `website/node_modules/@docusaurus` हरवले असल्यासच `website/` मध्ये `npm ci` चालवते.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- उद्देश: ऑफलाइन‑सुरक्षित लिंक तपासणी.
- वापर: `make web_build_linkcheck OPTS="--locales en|all"`
- नोंदी: `tmp_linkcheck_web_pages` मध्ये तयार करते; GH Pages `baseUrl` ला `/` मध्ये पुन्हा लिहिते; दूरस्थ HTTP(S) लिंक वगळते.

#### web_build_local_preview {#mt-web_build_local_preview}

- उद्देश: पर्यायी चाचण्या/लिंक‑चेकसह स्थानिक gh‑pages प्रीव्ह्यू.
- वापर: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- वर्तन: प्रथम Node प्रीव्ह्यू सर्व्हर (`scripts/preview-server.mjs`, `/__stop` समर्थित), उपलब्ध नसल्यास `python3 -m http.server` वर fallback; 8080–8090 वर serve; PID `web-local-preview/.server.pid` येथे.

#### web_push_github {#mt-web_push_github}

- उद्देश: `website/build` ला `gh-pages` ब्रँचवर push करा.
- वापर: `make web_push_github`

टीप: Makefile वापरत असलेल्या पॅकेज मॅनेजरला override करण्यासाठी `NPM=…` सेट करा (डीफॉल्ट `npm`).
