---
id: development
title: 'అభివృద్ధి'
sidebar_label: 'అభివృద్ధి'
---

---

## అభివృద్ధి మార్గదర్శిని {#development-guide}

:::note ఆంగ్ల పాఠ్యాన్ని మాత్రమే సవరించండి; అనువాదాలు వ్యాప్తి చెందుతాయి
డాక్యుమెంటేషన్‌ను **కేవలం** `website/docs` (English) క్రింద మాత్రమే అప్డేట్ చేయండి. `website/i18n/<locale>/…` క్రింద ఉన్న అనువాదాలు ఆటోమేటిక్‌గా ఉత్పత్తి అవుతాయి; వాటిని చేతితో సవరించకండి. లోకలైజ్డ్ కంటెంట్‌ను రిఫ్రెష్ చేయడానికి అనువాద పనులను (ఉదా., `make translate_web_docs_batch`) ఉపయోగించండి.
:::

### పూర్వావసరాలు {#prerequisites}

- Node.js 22+ మరియు npm (Node 22తో పరీక్షించబడింది)
- Thunderbird 128 ESR లేదా దానికి పైనివి (మాన్యువల్ టెస్టింగ్ కోసం)

---

### ప్రాజెక్ట్ లేఅవుట్ (హై‑లెవల్) {#project-layout-high-level}

- రూట్: ప్యాకేజింగ్ స్క్రిప్ట్ `distribution_zip_packer.sh`, డాక్స్, స్క్రీన్‌షాట్‌లు
- `sources/`: ప్రధాన యాడ్‑ఆన్ కోడ్ (బ్యాక్‌గ్రౌండ్, ఎంపికలు/పాప్‌అప్ UI, మానిఫెస్ట్లు, చిహ్నాలు)
- `tests/`: Vitest సూట్
- `website/`: Docusaurus డాక్స్ (`website/i18n/de/...` క్రింద i18n తో)

---

### ఇన్‌స్టాల్ & టూలింగ్ {#install-and-tooling}

- రూట్ డిపెండెన్సీలు ఇన్‌స్టాల్ చేయండి: `npm ci`
- డాక్స్ (ఐచ్చికం): `cd website && npm ci`
- టార్గెట్లను తెలుసుకోండి: `make help`

---

### లైవ్ డెవ్ (web‑ext run) {#live-dev-web-ext}

- Firefox డెస్క్‌టాప్‌లో క్విక్ లూప్ (UI స్మోక్‑టెస్టులు మాత్రమే):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird లో రన్ చేయండి (MailExtensions కోసం సిఫార్సు):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- చిట్కాలు:
- Thunderbird యొక్క Error Console తెరిచి ఉంచండి (Tools → Developer Tools → Error Console).
- MV3 ఈవెంట్ పేజీలు నిరాకార స్థితిలో నిలిపివేయబడతాయి; కోడ్ మార్పుల తర్వాత యాడ్‑ఆన్‌ను రీలోడ్ చేయండి లేదా web‑ext ఆటో‑రీలోడ్ అయ్యేలా ఉంచండి.
- కేవలం Firefox‑లో మాత్రమే ఉండే కొన్ని ప్రవర్తనలు భిన్నంగా ఉండవచ్చు; API సమానత్వం కోసం ఎల్లప్పుడూ Thunderbird లో ధృవీకరించండి.
- Thunderbird బైనరీ మార్గాలు (ఉదాహరణలు):
- Linux: `thunderbird` (ఉదా., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ప్రొఫైల్ వేరుచేయడం: మీ రోజువారీ సెటప్‌పై ప్రభావం పడకుండా అభివృద్ధి కోసం వేరే Thunderbird ప్రొఫైల్ వాడండి.

---

### మెక్ టార్గెట్లు (అక్షరక్రమంలో) {#make-targets-alphabetical}

Makefile సాధారణ డెవలప్‌మెంట్ ప్రవాహాలను ప్రమాణీకరిస్తుంది. ప్రతి టార్గెట్‌కు ఒక్క పంక్తి సారాంశం కోసం ఎప్పుడైనా `make help` నడపండి.

చిట్కా: ఎలాంటి టార్గెట్ లేకుండా `make` నడపడం ద్వారా, టార్గెట్‌ను ఎంచుకునే సాధారణ Whiptail మెను తెరుచుకుంటుంది.

| లక్ష్యం                                                  | ఒక్క పంక్తి వివరణ                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | స్థానిక build/preview ఆర్టిఫాక్ట్‌లను తీసివేయండి (tmp/, web-local-preview/, website/build/).   |
| [`commit`](#mt-commit)                                   | ఫార్మాట్ చేయండి, టెస్టులు నడపండి (i18n సహా), చేంజ్‌లాగ్ అప్డేట్ చేయండి, commit & push.         |
| [`eslint`](#mt-eslint)                                   | ఫ్లాట్ కాన్ఫిగ్ ద్వారా ESLint నడపండి (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | ఒక్క పంక్తి డాక్స్‌తో అన్ని టార్గెట్లను జాబితా చేయండి (క్రమబద్ధీకరించి).                       |
| [`lint`](#mt-lint)                                       | `sources/` పై web‑ext lint (తాత్కాలిక మానిఫెస్ట్; ZIPలను పాస్ చేస్తుంది; ఫేటల్ కాదు).          |
| [`menu`](#mt-menu)                                       | టార్గెట్ మరియు ఐచ్చిక ఆర్గ్యుమెంట్‌లను ఎంచుకునే ఇంటరాక్టివ్ మెను.                              |
| [`pack`](#mt-pack)                                       | ATN & LOCAL ZIPలను బిల్డ్ చేయండి (లింటర్ నడుపుతుంది; ప్యాకర్ స్క్రిప్ట్‌ను కాల్ చేస్తుంది).    |
| [`prettier`](#mt-prettier)                               | రీపోను స్థానంలోనే ఫార్మాట్ చేయండి (మార్పులను రాస్తుంది).                                       |
| [`prettier_check`](#mt-prettier_check)                   | Prettier చెక్ మోడ్‌లో (రాతలు లేవు); రీఫార్మాట్ అవసరం అయితే ఫెయిల్ అవుతుంది.                    |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` కు అలియాస్.                                                                         |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, తరువాత Vitest (కాన్ఫిగర్ ఐతే కవరేజ్).                                |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑మాత్రమే టెస్టులు: యాడ్‑ఆన్ ప్లేస్‌హోల్డర్లు/ప్యారిటీ + వెబ్‌సైట్ ప్యారిటీ.                |
| [`translate_app`](#mt-translation-app)                   | `translation_app` కు అలియాస్.                                                                  |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` నుండి యాప్ UI స్ట్రింగ్‌లను అనువదించండి.                   |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API ద్వారా వెబ్‌సైట్ డాక్స్‌ను అనువదించండి (ప్రాధాన్యం).                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | వెబ్‌సైట్ డాక్స్‌ను సమకాలికంగా అనువదించండి (లెగసీ, నాన్‑బ్యాచ్).                               |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` కు అలియాస్.                                                            |
| [`translation_web_index`](#mt-translation_web_index)     | హోమ్‌పేజ్/నావ్‌బార్/ఫుటర్ UI అనువదించండి (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | డాక్స్‌ను `website/build` కు బిల్డ్ చేయండి (`--locales` / `BUILD_LOCALES` సపోర్ట్‌తో).         |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ఆఫ్లైన్‑సేఫ్ లింక్ చెక్ (దూరపు HTTP[S] ను స్కిప్ చేస్తుంది).                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | స్థానిక gh‑pages ప్రివ్యూ; ఆటో‑సర్వ్ 8080–8090; ఐచ్చిక టెస్టులు/లింక్‑చెక్.                    |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ను `gh-pages` బ్రాంచ్‌కి పుష్ చేయండి.                                          |

Syntax for options

- ఆప్షన్‌లను పంపడానికి `make <command> OPTS="…"` వాడండి (కోట్స్ సిఫార్సు). క్రింది ప్రతి టార్గెట్ దానికి ఉదాహరణ వాడకాన్ని చూపుతుంది.

--

-

#### లోకేల్ బిల్డ్ చిట్కాలు {#locale-build-tips}

- లోకేల్స్‌లో కొన్నింటినే బిల్డ్ చేయండి: `BUILD_LOCALES="en de"` సెట్ చేయండి లేదా వెబ్ టార్గెట్లకు `OPTS="--locales en,de"` పాస్ చేయండి.
- నిర్దిష్ట లోకేల్‌ను ప్రివ్యూ చేయండి: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### బిల్డ్ & ప్యాకేజ్ {#build-and-package}

- ZIPలను బిల్డ్ చేయండి: `make pack`
- రీపో రూట్‌లో ATN మరియు LOCAL ZIPలను ఉత్పత్తి చేస్తుంది (ఆర్టిఫాక్ట్‌లను చేతితో సవరించవద్దు)
- చిట్కా: ప్యాకేజింగ్‌కు ముందు `sources/manifest_ATN.json` మరియు `sources/manifest_LOCAL.json` రెండింటిలోనూ వెర్షన్‌ను అప్డేట్ చేయండి
- మాన్యువల్ ఇన్‌స్టాల్ (డెవ్): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → నిర్మించబడిన ZIP‌ను ఎంచుకోండి

---

### పరీక్ష {#test}

- పూర్తి సూట్: `make test` (Vitest)
- కవరేజ్ (ఐచ్చికం):
- `npm i -D @vitest/coverage-v8`
- `make test` నడపండి; HTML రిపోర్ట్ కోసం `coverage/index.html` ఓపెన్ చేయండి
- i18n మాత్రమే: `make test_i18n` (UI కీలు/ప్లేస్‌హోల్డర్లు/టైటిల్‌లు + వెబ్‌సైట్ per‑locale per‑doc ప్యారిటీ id/title/sidebar_label చెక్‌లతో)

---

### డీబగ్గింగ్ & లాగ్స్ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- రన్‌టైమ్‌లో వర్బోస్ లాగ్‌లను టాగ్‌ల్ చేయండి:
- సక్రియం: `messenger.storage.local.set({ debug: true })`
- నిష్క్రియం: `messenger.storage.local.set({ debug: false })`
- స్పందనలు తయారు/పంపించే సమయంలో లాగ్‌లు కనిపిస్తాయి

---

### డాక్స్ (వెబ్‌సైట్) {#docs-website}

- డెవ్ సర్వర్: `cd website && npm run start`
- స్టాటిక్ సైట్ బిల్డ్: `cd website && npm run build`
- సమానమైన Make టార్గెట్లు (అక్షరక్రమంలో): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- వాడుక ఉదాహరణలు:
- EN మాత్రమే, టెస్టులు/లింక్‑చెక్ స్కిప్, పుష్ లేదు: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- అన్ని లోకేల్స్, టెస్టులు/లింక్‑చెక్‌తో, తరువాత పుష్: `make web_build_local_preview && make web_push_github`
- ప్రచురించే ముందు, ఆఫ్లైన్‑సేఫ్ లింక్ చెక్ నడపండి: `make web_build_linkcheck`.
- i18n: English `website/docs/*.md` లో ఉంటుంది; German అనువాదాలు `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` లో
- శోధన: CIలో Algolia DocSearch ఎన్విరాన్‌మెంట్ వేరియబుల్స్ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) సెట్ అయితే, సైట్ Algolia శోధనను ఉపయోగిస్తుంది; లేకపోతే లోకల్ శోధనకు ఫాల్‌బ్యాక్ అవుతుంది. హోమ్‌పేజ్‌పై, శోధన బాక్స్ తెరవడానికి `/` లేదా `Ctrl+K` నొక్కండి.

---

#### దానం రీడైరెక్ట్ {#donate-redirect}

- `website/src/pages/donate.js`
- రూట్: `/donate` (మరియు `/<locale>/donate`)
- ప్రవర్తన:
- ప్రస్తుత రూట్‌లో లోకేల్ ఉంటే (ఉదా., `/de/donate`), దానినే ఉపయోగించండి
- లేకపోతే, `navigator.languages` మరియు కాన్ఫిగర్ చేసిన లోకేల్స్‌లో ఉత్తమ సరిపోలికను ఎంచుకోండి; డిఫాల్ట్ లోకేల్‌కు ఫాల్‌బ్యాక్ అవుతుంది
- దారి మళ్లింపు:
- `en` → `/docs/donation`
- ఇతరవి → `/<locale>/docs/donation`
- సరైన baseUrl హ్యాండ్లింగ్ కోసం `useBaseUrl` ఉపయోగిస్తుంది
- ఫాల్‌బ్యాక్‌గా meta refresh + `noscript` లింక్‌ను కలిగి ఉంటుంది

---

---

#### ప్రివ్యూ చిట్కాలు {#preview-tips}

- Node ప్రివ్యూ‌ను శుభ్రంగా ఆపండి: `http://localhost:<port>/__stop` ఓపెన్ చేయండి (`Local server started` తరువాత ముద్రించబడుతుంది).
- MDX/JSXలో చిత్రాలు లోడ్ కాకపోతే, సైట్ `baseUrl`ను గౌరవించడానికి `useBaseUrl('/img/...')` ఉపయోగించండి.
- ప్రివ్యూ ముందుగా ప్రారంభమవుతుంది; లింక్ చెక్ తర్వాత నడుస్తుంది మరియు అది బ్లాక్ చేయదు (బ్రోకెన్ ఎక్స్‌టర్నల్ లింక్‌లు ప్రివ్యూను ఆపవు).
- ఉదాహరణ ప్రివ్యూ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” తరువాత ముద్రించబడుతుంది).
- లింక్‑చెక్‌లో బయటి లింక్‌లు: కొన్ని బాహ్య సైట్లు (ఉదా., addons.thunderbird.net) ఆటోమేటెడ్ క్రాలర్‌లను బ్లాక్ చేస్తాయి మరియు లింక్ చెక్‌లలో 403 చూపవచ్చు. ప్రివ్యూ ఇంకా ప్రారంభమవుతుంది; వీటిని నిర్లక్ష్యం చేయడం సురక్షితం.

---

#### వెబ్‌సైట్‌ను అనువదించండి {#translate-website}

మీరు ఏమి అనువదించవచ్చు

- వెబ్‌సైట్ UI మాత్రమే: హోమ్‌పేజ్, నావ్‌బార్, ఫుటర్ మరియు ఇతర UI స్ట్రింగ్‌లు. డాక్స్ కంటెంట్ ప్రస్తుతం English‑మాత్రమే ఉంటుంది.

ఎక్కడ సవరించాలి

- `website/i18n/<locale>/code.json` సవరించండి (`en` ను సూచనగా వాడండి). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` వంటి ప్లేస్‌హోల్డర్‌లను మార్పు చేయకండి.

ఫైళ్లను సృష్టించండి లేదా రీఫ్రెష్ చేయండి

- అన్ని లోకేల్స్‌కు కావలసిన స్టబ్‌లను సృష్టించండి: `npm --prefix website run i18n:stubs`
- English నుంచి స్టబ్‌లను ఓవర్‌రైట్ చేయండి (క్రొత్త స్ట్రింగ్‌లు జోడించిన తర్వాత): `npm --prefix website run i18n:stubs:force`
- ఒక్క లోకేల్‌కు ప్రత్యామ్నాయం: `npx --prefix website docusaurus write-translations --locale <locale>`

హోమ్‌పేజ్/నావ్‌బార్/ఫుటర్ UI స్ట్రింగ్‌లను అనువదించండి (OpenAI)

- ఒకసారి క్రెడెన్షియల్స్ సెట్ చేయండి (షెల్ లేదా .env):
- `export OPENAI_API_KEY=sk-...`
- ఐచ్చికం: `export OPENAI_MODEL=gpt-4o-mini`
- వన్‑షాట్ (అన్ని లోకేల్స్, en స్కిప్): `make translate_web_index`
- నిర్దిష్ట లోకేల్స్‌కు పరిమితం చేయండి: `make translate_web_index OPTS="--locales de,fr"`
- ఉన్న విలువలను ఓవర్‌రైట్ చేయండి: `make translate_web_index OPTS="--force"`

ధృవీకరణ & రీట్రైలు

- అనువాద స్క్రిప్ట్ JSON ఆకారాన్ని ధృవీకరిస్తుంది, కర్లీ‑బ్రేస్ ప్లేస్‌హోల్డర్లు అలాగే ఉంచుతుంది, మరియు URLలు మారలేదు అని నిర్ధారిస్తుంది.
- ధృవీకరణ విఫలమైతే, ప్రస్తుత విలువలను అలాగే ఉంచే ముందు ఫీడ్‌బ్యాక్‌తో గరిష్టంగా 2 సార్లు మళ్లీ ప్రయత్నిస్తుంది.

మీ లోకేల్‌ను ప్రివ్యూ చేయండి

- డెవ్ సర్వర్: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` ను సందర్శించండి

సమర్పణ

- సవరించిన `code.json` ఫైల్(లు)తో PR ఓపెన్ చేయండి. మార్పులను కేంద్రీకరించండి మరియు సాధ్యమైతే త్వరిత స్క్రీన్‌షాట్‌ను చేర్చండి.

---

### భద్రత & కాన్ఫిగరేషన్ చిట్కాలు {#security-and-configuration-tips}

- `sources/manifest.json` ను commit చేయవద్దు (బిల్డ్ ద్వారా తాత్కాలికంగా సృష్టించబడింది)
- అప్డేట్ ఛానల్ నిలిచి ఉండేందుకు `browser_specific_settings.gecko.id` ను స్థిరంగా ఉంచండి

---

### సెట్టింగ్‌ల నిల్వ {#settings-persistence}

- నిల్వ: అన్ని యూజర్ సెట్టింగ్‌లు `storage.local` లో ఉంటాయి మరియు యాడ్‑ఆన్ అప్‌డేట్స్ అంతటా కొనసాగుతాయి.
- ఇన్‌స్టాల్: కీ నిజంగా మిస్సింగ్ (undefined) ఉన్నప్పుడే డిఫాల్ట్స్ వర్తిస్తాయి.
- అప్‌డేట్: మైగ్రేషన్ కేవలం మిస్సింగ్ కీలను మాత్రమే నింపుతుంది; ఉన్న విలువలు ఎప్పుడూ ఓవర్‌రైట్ చేయబడవు.
- స్కీమా మార్కర్: `settingsVersion` (ప్రస్తుతం `1`).
- కీలు మరియు డిఫాల్టులు:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- కోడ్: `sources/background.js` → `initializeOrMigrateSettings()` మరియు `SCHEMA_VERSION` చూడండి.

డెవలప్‌మెంట్ వర్క్‌ఫ్లో (క్రొత్త సెట్టింగ్ జోడించడం)

- `sources/background.js` లో `SCHEMA_VERSION` ను బంప్ చేయండి.
- `initializeOrMigrateSettings()` లోని `DEFAULTS` ఆబ్జెక్ట్‌లో క్రొత్త కీ + డిఫాల్ట్ జోడించండి.
- డిఫాల్ట్స్ సీడ్ చేసే సమయంలో "only-if-undefined" నియమాన్ని ఉపయోగించండి; ఉన్న విలువలను ఓవర్‌రైట్ చేయకండి.
- సెట్టింగ్ యూజర్‑విజిబుల్ అయితే, దాన్ని `sources/options.js` లో వైర్ చేసి, లోకలైజ్డ్ స్ట్రింగ్‌లను జోడించండి.
- టెస్టులను జోడించండి/సర్దుబాటు చేయండి (`tests/background.settings.migration.test.js` చూడండి).

మాన్యువల్ టెస్టింగ్ చిట్కాలు

- క్రొత్త ఇన్‌స్టాల్‌ను అనుకరించండి: ఎక్స్‌టెన్షన్ డేటా డైరెక్టరీని క్లియర్ చేయండి లేదా కొత్త ప్రొఫైల్‌తో ప్రారంభించండి.
- అప్‌డేట్‌ను అనుకరించండి: `storage.local` లో `settingsVersion` ను `0` కు సెట్ చేసి రీ‑లోడ్ చేయండి; ఉన్న విలువలు మారలేదు మరియు మిస్సింగ్ కీలు మాత్రమే జోడించబడ్డాయని నిర్ధారించండి.

---

### ట్రబుల్‌షూటింగ్ {#troubleshooting}

- Thunderbird 128 ESR లేదా దాని కంటే కొత్తదై ఉందని నిర్ధారించండి
- రన్‌టైమ్ సమస్యల కోసం Error Console ను ఉపయోగించండి
- నిల్వ చేసిన సెట్టింగ్‌లు సరిగా వర్తించనిట్లు అనిపిస్తే, Thunderbird ను రీస్టార్ట్ చేసి మళ్లీ ప్రయత్నించండి. (Thunderbird సెషన్‌ల మధ్య స్టేట్‌ను క్యాష్ చేయవచ్చు; రీస్టార్ట్ తాజా సెట్టింగ్‌లు లోడ్ అయ్యేలా చేస్తుంది.)

---

### CI & కవరేజ్ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) కవరేజ్ థ్రెషోల్డ్‌లతో (లైన్లు/ఫంక్షన్‌లు/బ్రాంచ్‌లు/స్టేట్మెంట్‌లు 85%) vitest నడుపుతుంది. థ్రెషోల్డ్‌లు చేరుకోకపోతే, జాబ్ ఫెయిల్ అవుతుంది.
- వర్క్‌ఫ్లో HTML రిపోర్ట్‌తో `coverage-html` అనే ఆర్టిఫాక్ట్‌ను అప్‌లోడ్ చేస్తుంది; రన్ పేజీ నుంచి డౌన్‌లోడ్ చేయండి (Actions → latest run → Artifacts).

---

### సహకారం {#contributing}

- బ్రాంచ్/కమిట్/PR మార్గదర్శకాల కోసం CONTRIBUTING.md చూడండి
- చిట్కా: మీ రోజువారీ ప్రొఫైల్‌పై ప్రభావం పడకుండా పరీక్షల కోసం వేరే Thunderbird డెవలప్‌మెంట్ ప్రొఫైల్ సృష్టించండి.

---

### అనువాదాలు

- పెద్ద “all → all” అనువాద జాబ్స్ నెమ్మదిగా మరియు ఖర్చుతో కూడుకున్నవిగా ఉండవచ్చు. ముందుగా సబ్‌సెట్‌తో ప్రారంభించండి (ఉదా., కొద్ది డాక్స్ మరియు 1–2 లోకేల్స్), ఫలితాన్ని సమీక్షించి, తర్వాత విస్తరించండి.

---

- రీట్రై పాలసీ: అనువాద జాబ్స్ API లోపాలపై గరిష్టంగా 3 రీట్రైలను ఎక్స్‌పోనెన్షియల్ బ్యాక్‌آఫ్‌తో చేస్తాయి; `scripts/translate_web_docs_batch.js` మరియు `scripts/translate_web_docs_sync.js` చూడండి.

డాక్స్ కోసం స్క్రీన్‌షాట్‌లు

- చిత్రాలను `website/static/img/` క్రింద నిల్వ చేయండి.
- వాటిని MD/MDXలో `useBaseUrl('/img/<filename>')` ద్వారా సూచించండి తద్వారా పాతులు సైట్ `baseUrl` తో పనిచేస్తాయి.
- `website/static/img/` క్రింద చిత్రాలను జోడించిన తర్వాత లేదా పేరు మార్చిన తర్వాత, అన్ని సూచనలు ఇంకా `useBaseUrl('/img/…')` వాడుతున్నాయో మరియు స్థానిక ప్రివ్యూలో రెండర్ అవుతున్నాయో నిర్ధారించండి.
  ఫేవికాన్లు

- బహుళ‑సైజుల `favicon.ico` అన్ని బిల్డ్ పాత్‌లలో (Make + స్క్రిప్ట్‌లు) `website/scripts/build-favicon.mjs` ద్వారా ఆటోమేటిక్‌గా ఉత్పత్తి అవుతుంది.
- ఎలాంటి మాన్యువల్ స్టెప్ అవసరం లేదు; `icon-*.png` ను అప్డేట్ చేయడం సరిపోతుంది.
  సమీక్ష చిట్కా

- అనువదించిన డాక్స్‌లో front‑matter `id` ను మార్చకండి; ఉంటే `title` మరియు `sidebar_label` మాత్రమే అనువదించండి.

#### clean {#mt-clean}

- ఉద్దేశ్యం: స్థానిక build/preview ఆర్టిఫాక్ట్‌లను తీసివేయడం.
- వినియోగం: `make clean`
- తీసివేస్తుంది (ఉంటే):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ఉద్దేశ్యం: ఫార్మాట్, టెస్ట్, చేంజ్‌లాగ్ అప్డేట్, commit, మరియు push.
- వినియోగం: `make commit`
- వివరాలు: Prettier (write), `make test`, `make test_i18n` నడుపుతుంది; staged డిఫ్‌లు ఉన్నప్పుడు చేంజ్‌లాగ్‌ను జోడిస్తుంది; `origin/<branch>` కు పుష్ చేస్తుంది.

---

#### eslint {#mt-eslint}

- ఉద్దేశ్యం: ఫ్లాట్ కాన్ఫిగ్ ద్వారా ESLint నడపడం.
- వినియోగం: `make eslint`

---

#### help {#mt-help}

- ఉద్దేశ్యం: ఒక్క పంక్తి డాక్స్‌తో అన్ని టార్గెట్లను జాబితా చేయడం.
- వినియోగం: `make help`

---

#### lint {#mt-lint}

- ఉద్దేశ్యం: `web-ext` ను ఉపయోగించి MailExtension ను లింట్ చేయడం.
- వినియోగం: `make lint`
- గమనికలు: తాత్కాలికంగా `sources/manifest_LOCAL.json` → `sources/manifest.json` కాపీ చేస్తుంది; నిర్మించిన ZIPలను పాస్ చేస్తుంది; వార్నింగ్‌లు పైప్‌లైన్‌ను ఫెయిల్ చేయవు.

---

#### menu {#mt-menu}

- ఉద్దేశ్యం: Make టార్గెట్ మరియు ఐచ్చిక ఆర్గ్యుమెంట్‌లను ఎంచుకునే ఇంటరాక్టివ్ మెను.
- వినియోగం: ఎలాంటి ఆర్గ్యుమెంట్‌లు లేకుండా `make` నడపండి.
- గమనికలు: `whiptail` అందుబాటులో లేకపోతే, మెను `make help` కు ఫాల్‌బ్యాక్ అవుతుంది.

---

#### pack {#mt-pack}

- ఉద్దేశ్యం: ATN మరియు LOCAL ZIPలను బిల్డ్ చేయడం (`lint` పై ఆధారపడుతుంది).
- వినియోగం: `make pack`
- చిట్కా: ప్యాకేజింగ్‌కు ముందు `sources/manifest_*.json` రెండింటిలోనూ వెర్షన్‌లను బంప్ చేయండి.

---

#### prettier {#mt-prettier}

- ఉద్దేశ్యం: రీపోను స్థానంలోనే ఫార్మాట్ చేయడం.
- వినియోగం: `make prettier`

#### prettier_check {#mt-prettier_check}

- ఉద్దేశ్యం: ఫార్మాటింగ్‌ను వెరిఫై చేయడం (రాతలు లేవు).
- వినియోగం: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ఉద్దేశ్యం: `prettier` కు అలియాస్.
- వినియోగం: `make prettier_write`

---

#### test {#mt-test}

- ఉద్దేశ్యం: Prettier (write), ESLint, తరువాత Vitest (ఇన్‌స్టాల్ అయితే కవరేజ్) నడపడం.
- వినియోగం: `make test`

#### test_i18n {#mt-test_i18n}

- ఉద్దేశ్యం: యాడ్‑ఆన్ స్ట్రింగ్‌లు మరియు వెబ్‌సైట్ డాక్స్ కోసం i18n‑కేంద్రీకృత టెస్టులు.
- వినియోగం: `make test_i18n`
- నడుపుతుంది: `npm run test:i18n` మరియు `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- ఉద్దేశ్యం: EN నుంచి ఇతర లోకేల్స్‌కి యాడ్‑ఆన్ UI స్ట్రింగ్‌లను అనువదించడం.
- వినియోగం: `make translation_app OPTS="--locales all|de,fr"`
- గమనికలు: కీ నిర్మాణం మరియు ప్లేస్‌హోల్డర్‌లను అలాగే ఉంచుతుంది; `translation_app.log` కు లాగ్ చేస్తుంది. స్క్రిప్ట్ రూపం: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ఉద్దేశ్యం: `website/docs/*.md` నుంచి `website/i18n/<locale>/...` లోకి వెబ్‌సైట్ డాక్స్‌ను అనువదించడం.
- ప్రాధాన్యం: `translate_web_docs_batch` (OpenAI Batch API)
  - వాడకం (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - లెగసీ positional ఇంకా ఆమోదయోగ్యం: `OPTS="<doc|all> <lang|all>"`
- ప్రవర్తన: JSONL నిర్మించి, అప్‌లోడ్ చేసి, ప్రతి 30s కి పోల్స్ చేసి, ఫలితాలను డౌన్‌లోడ్ చేసి, ఫైళ్లను రాస్తుంది.
- గమనిక: బ్యాచ్ జాబ్ పూర్తయ్యేందుకు (OpenAI యొక్క బ్యాచ్ విండో ప్రకారం) గరిష్టంగా 24 గంటలు పడవచ్చు. ప్రతి పోలింగ్‌పై కన్సోల్ ఎలాప్స్‌డ్ టైమ్ చూపిస్తుంది.
- Env: `OPENAI_API_KEY` (తప్పనిసరి), ఐచ్చికాలు `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (డిఫాల్ట్ 24h), `BATCH_POLL_INTERVAL_MS`.
- లెగసీ: `translate_web_docs_sync`
  - వాడకం (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - లెగసీ positional ఇంకా ఆమోదయోగ్యం: `OPTS="<doc|all> <lang|all>"`
- ప్రవర్తన: ప్రతి జంటకు సమకాలిక రిక్వెస్ట్‌లు (బ్యాచ్ ఏకీకరణ లేదు).
- గమనికలు: `OPTS` వదిలేస్తే ఇంటరాక్టివ్ ప్రాంప్ట్‌లు. రెండు మోడ్‌లు కోడ్ బ్లాక్‌లు/ఇన్‌లైన్ కోడ్‌ను అలాగే ఉంచుతాయి మరియు front‑matter `id` ను మార్పు చేయవు; `translation_web_batch.log` (batch) లేదా `translation_web_sync.log` (sync) కు లాగ్ చేస్తాయి.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ఉద్దేశ్యం: `website/i18n/en/code.json` నుంచి `website/i18n/<locale>/code.json` క్రింద ఉన్న అన్ని లోకేల్స్‌కు ( `en` మినహా) వెబ్‌సైట్ UI స్ట్రింగ్‌లను (హోమ్‌పేజ్, నావ్‌బార్, ఫుటర్) అనువదించడం.
- వినియోగం: `make translate_web_index` లేదా `make translate_web_index OPTS="--locales de,fr [--force]"`
- అవసరాలు: `OPENAI_API_KEY` ఎక్స్‌పోర్ట్ చేయండి (ఐచ్చికం: `OPENAI_MODEL=gpt-4o-mini`).
- ప్రవర్తన: JSON నిర్మాణాన్ని ధృవీకరిస్తుంది, కర్లీ‑బ్రేస్ ప్లేస్‌హోల్డర్‌లను అలాగే ఉంచుతుంది, URLలను మార్పు చేయదు, మరియు ధృవీకరణ లోపాలపై ఫీడ్‌బ్యాక్‌తో రీట్రై చేస్తుంది.

---

#### web_build {#mt-web_build}

- ఉద్దేశ్యం: డాక్స్ సైట్‌ను `website/build` కు బిల్డ్ చేయడం.
- వినియోగం: `make web_build OPTS="--locales en|de,en|all"` (లేదా `BUILD_LOCALES="en de"` సెట్ చేయండి)
- అంతర్గతాలు: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- డెపెండెన్సీలు: `website/node_modules/@docusaurus` లేని పక్షంలో మాత్రమే `website/` లో `npm ci` నడుపుతుంది.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ఉద్దేశ్యం: ఆఫ్లైన్‑సేఫ్ లింక్ చెక్.
- వినియోగం: `make web_build_linkcheck OPTS="--locales en|all"`
- గమనికలు: `tmp_linkcheck_web_pages` కు బిల్డ్ చేస్తుంది; GH Pages `baseUrl` ను `/` కు రీరైట్ చేస్తుంది; దూరపు HTTP(S) లింక్‌లను స్కిప్ చేస్తుంది.

#### web_build_local_preview {#mt-web_build_local_preview}

- ఉద్దేశ్యం: ఐచ్చిక టెస్టులు/లింక్‑చెక్‌తో స్థానిక gh‑pages ప్రివ్యూ.
- వినియోగం: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ప్రవర్తన: ముందుగా Node ప్రివ్యూ సర్వర్‌ను ప్రయత్నిస్తుంది (`scripts/preview-server.mjs`, `/__stop` సపోర్ట్‌తో), తర్వాత `python3 -m http.server` కు ఫాల్‌బ్యాక్ అవుతుంది; 8080–8090 పై సర్వ్ చేస్తుంది; PID `web-local-preview/.server.pid` లో ఉంటుంది.

#### web_push_github {#mt-web_push_github}

- ఉద్దేశ్యం: `website/build` ను `gh-pages` బ్రాంచ్‌కు పుష్ చేయడం.
- వినియోగం: `make web_push_github`

చిట్కా: Makefile ఉపయోగించే ప్యాకేజ్ మేనేజర్‌ను ఓవర్‌రైడ్ చేయడానికి `NPM=…` సెట్ చేయండి (డిఫాల్ట్ `npm`).
