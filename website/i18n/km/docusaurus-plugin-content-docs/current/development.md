---
id: development
title: 'ការអភិវឌ្ឍន៍'
sidebar_label: 'ការអភិវឌ្ឍន៍'
---

---

## មគ្គុទេសក៍អភិវឌ្ឍន៍ {#development-guide}

:::note កែសម្រួលតែភាសាអង់គ្លេស; ការបកប្រែត្រូវបានចម្រេញដោយស្វ័យប្រវត្តិ
ធ្វើបច្ចុប្បន្នភាពឯកសារ **តែ** ក្រោម `website/docs` (English) ប៉ុណ្ណោះ។ ការបកប្រែក្រោម `website/i18n/<locale>/…` ត្រូវបានបង្កើតស្វ័យប្រវត្តិ ហើយមិនគួរត្រូវបានកែសម្រួលដោយដៃទេ។ ប្រើភារកិច្ចបកប្រែ (ឧ., `make translate_web_docs_batch`) ដើម្បីធ្វើឲ្យមាតិកាទាន់សម័យតាមមូលដ្ឋានភាសា។
:::

### លក្ខខណ្ឌមុន {#prerequisites}

- Node.js 22+ និង npm (បានសាកល្បងជាមួយ Node 22)
- Thunderbird 128 ESR ឬថ្មីជាងនេះ (សម្រាប់ការសាកល្បងដោយដៃ)

---

### តម្រៀបគម្រោង (កម្រិតខ្ពស់) {#project-layout-high-level}

- Root: ស្គ្រីបកញ្ចប់ `distribution_zip_packer.sh`, ឯកសារ, រូបថតអេក្រង់
- `sources/`: កូដស្នូលរបស់ add-on (background, options/popup UI, manifests, icons)
- `tests/`: សំណុំតេស្ត Vitest
- `website/`: ឯកសារ Docusaurus (មាន i18n ក្រោម `website/i18n/de/...`)

---

### ដំឡើង និង ឧបករណ៍ {#install-and-tooling}

- ដំឡើង dependencies នៅ root: `npm ci`
- ឯកសារ (ស្រេចចិត្ត): `cd website && npm ci`
- រកឃើញគោលដៅ: `make help`

---

### អភិវឌ្ឍន៍ផ្ទាល់ (web‑ext run) {#live-dev-web-ext}

- រង្វិលរហ័សក្នុង Firefox Desktop (សម្រាប់តេស្ត UI កម្រិតផ្ទៃ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- រត់ក្នុង Thunderbird (ពេញចិត្តសម្រាប់ MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- គន្លឹះ:
- ត្រូវបើក Error Console របស់ Thunderbird ជានិច្ច (Tools → Developer Tools → Error Console)។
- MV3 event pages នឹងត្រូវបានផ្អាកពេលទំនេរ; សូម reload add‑on បន្ទាប់ពីផ្លាស់ប្តូរកូដ ឬអនុញ្ញាតឲ្យ web‑ext auto‑reload។
- អាកប្បកិរិយាដែលមានតែ Firefox មួយចំនួនខុសគ្នា; តែងតែផ្ទៀងផ្ទាត់ក្នុង Thunderbird សម្រាប់ភាពស្មើគ្នា API។
- ផ្លូវកម្មវិធី Thunderbird (ឧទាហរណ៍):
- Linux: `thunderbird` (ឧ., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ការដាច់ដោយឡែកប្រវត្តិរូប: ប្រើប្រវត្តិរូប Thunderbird ដាច់ដោយឡែកសម្រាប់អភិវឌ្ឍន៍ ដើម្បីជៀសវាងប៉ះពាល់ដល់ការកំណត់ប្រចាំថ្ងៃរបស់អ្នក។

---

### គោលដៅ Make (តាមអក្ខរក្រម) {#make-targets-alphabetical}

Makefile គ្រប់គ្រងលំហូរការអភិវឌ្ឍន៍ទូទៅឲ្យមានស្តង់ដារ។ រត់ `make help` ពេលណាក៏បាន ដើម្បីទទួលបានសេចក្ដីសង្ខេបមួយបន្ទាត់នៃគោលដៅទាំងអស់។

គន្លឹះ: ការរត់ `make` ដោយគ្មានគោលដៅ នឹងបើកម៉ឺនុយ Whiptail ងាយៗសម្រាប់ជ្រើសគោលដៅ។

| គោលដៅ                                                    | សេចក្ដីពិពណ៌នាជួរមួយបន្ទាត់                                                                            |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | លុប artifact បង្កើត/មើលជាមុនក្នុងមូលដ្ឋាន (tmp/, web-local-preview/, website/build/)។                  |
| [`commit`](#mt-commit)                                   | ដាក់ទ្រង់ទ្រាយ, រត់តេស្ត (រួមទាំង i18n), អាប់ដេត changelog, commit និង push។                           |
| [`eslint`](#mt-eslint)                                   | រត់ ESLint តាម flat config (`npm run -s lint:eslint`)។                                                 |
| [`help`](#mt-help)                                       | បង្ហាញបញ្ជីគោលដៅទាំងអស់ជាមួយឯកសារសង្ខេបមួយបន្ទាត់ (តម្រៀប)។                                            |
| [`lint`](#mt-lint)                                       | web‑ext lint លើ `sources/` (manifest បណ្តោះអាសន្ន; មិនអើពើ ZIPs; មិនគ្រោះថ្នាក់)។                      |
| [`menu`](#mt-menu)                                       | ម៉ឺនុយអន្តរកម្ម ដើម្បីជ្រើសគោលដៅ និងអាគ្យូម៉ង់ស្រេចចិត្ត។                                              |
| [`pack`](#mt-pack)                                       | បង្កើត ZIPs ATN & LOCAL (រត់ linter; ហៅស្គ្រីប packer)។                                                |
| [`prettier`](#mt-prettier)                               | ដាក់ទ្រង់ទ្រាយឃ្លាំងកូដនៅកន្លែង (សរសេរផ្លាស់ប្តូរ)។                                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ក្នុងរបៀបពិនិត្យ (មិនសរសេរ); បរាជ័យ បើត្រូវការកែលម្អទ្រង់ទ្រាយ។                               |
| [`prettier_write`](#mt-prettier_write)                   | Alias សម្រាប់ `prettier`។                                                                              |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, បន្ទាប់មក Vitest (coverage បើបានកំណត់)។                                      |
| [`test_i18n`](#mt-test_i18n)                             | តេស្ត i18n ប៉ុណ្ណោះ: placeholders/parity របស់ add‑on + parity គេហទំព័រ។                                |
| [`translate_app`](#mt-translation-app)                   | Alias សម្រាប់ `translation_app`។                                                                       |
| [`translation_app`](#mt-translation-app)                 | បកប្រែខ្សែអក្សរ UI អាប់មិនរបស់កម្មវិធីពី `sources/_locales/en/messages.json`។                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | បកប្រែឯកសារគេហទំព័រតាម OpenAI Batch API (ផ្តល់អទិភាព)។                                                 |
| [`translate_web_docs_sync`](#mt-translation-web)         | បកប្រែឯកសារគេហទំព័រជាសមកាលកម្ម (ចាស់, មិនជា batch)។                                                    |
| [`translate_web_index`](#mt-translation_web_index)       | Alias សម្រាប់ `translation_web_index`។                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | បកប្រែខ្សែអក្សរ UI នៃ ទំព័រដើម/របាររុករក/បាតកថា (`website/i18n/en/code.json → .../<lang>/code.json`)។  |
| [`web_build`](#mt-web_build)                             | សាងសង់ឯកសារទៅ `website/build` (គាំទ្រ `--locales` / `BUILD_LOCALES`)។                                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ពិនិត្យតំណក្នុងលក្ខណៈ offline‑safe (រំលង HTTP[S] ដោះស្រាយពីចម្ងាយ)។                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ការមើលជាមុន gh‑pages ក្នុងមូលដ្ឋាន; បម្រើស្វ័យប្រវត្តិលើ 8080–8090; ជាមួយតេស្ត/ពិនិត្យតំណជាស្រេចចិត្ត។ |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` ទៅខាងសាខា `gh-pages`។                                                             |

វាក្យសម្ពន្ធសម្រាប់ជម្រើស

- ប្រើ `make <command> OPTS="…"` ដើម្បីបញ្ជូនជម្រើស (ណែនាំឲ្យដាក់សញ្ញាដកឃ្លា)។ គោលដៅនីមួយៗខាងក្រោមបង្ហាញឧទាហរណ៍ការប្រើប្រាស់។

--

-

#### គន្លឹះសម្រាប់បង្កើតតាមភាសា {#locale-build-tips}

- បង្កើតត្រឹមកំណុំភាសាមួយចំណែក: កំណត់ `BUILD_LOCALES="en de"` ឬបញ្ជូន `OPTS="--locales en,de"` ទៅគោលដៅគេហទំព័រ។
- មើលជាមុនភាសាជាក់លាក់: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`។

---

### សាងសង់ និង កញ្ចប់ {#build-and-package}

- បង្កើត ZIPs: `make pack`
- បង្កើត ZIPs ATN និង LOCAL នៅ root របស់ឃ្លាំង (កុំកែកម្មសិទ្ធិអត្ថបទស្នូលដោយដៃ)
- គន្លឹះ: ធ្វើបច្ចុប្បន្នភាពកំណែទាំងក្នុង `sources/manifest_ATN.json` និង `sources/manifest_LOCAL.json` មុនពេលចាក់កញ្ចប់
- ដំឡើងដោយដៃ (dev): Thunderbird → Tools → Add‑ons and Themes → រន្ធកង់ → Install Add‑on From File… → ជ្រើស ZIP ដែលបានបង្កើត

---

### តេស្ត {#test}

- សំណុំពេញលេញ: `make test` (Vitest)
- ការគ្របដណ្តប់ (ស្រេចចិត្ត):
- `npm i -D @vitest/coverage-v8`
- រត់ `make test`; បើក `coverage/index.html` សម្រាប់របាយការណ៍ HTML
- i18n ប៉ុណ្ណោះ: `make test_i18n` (UI keys/placeholders/titles + parity គេហទំព័រតាមភាសា និងឯកសារ ដោយពិនិត្យ id/title/sidebar_label)

---

### ដិបហ្គឹង និង កំណត់ហេតុ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- បិទ/បើកកំណត់ហេតុលម្អិតនៅពេលដំណើរការ:
- បើក: `messenger.storage.local.set({ debug: true })`
- បិទ: `messenger.storage.local.set({ debug: false })`
- កំណត់ហេតុបង្ហាញខណៈពេលកំពុងតែង/ផ្ញើចម្លើយ

---

### ឯកសារ (គេហទំព័រ) {#docs-website}

- ម៉ាស៊ីនបម្រើអភិវឌ្ឍន៍: `cd website && npm run start`
- សាងសង់គេហទំព័រថ្មីជា static: `cd website && npm run build`
- សមមូល Make (តាមអក្ខរក្រម): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ឧទាហរណ៍ប្រើប្រាស់:
- តែ EN ប៉ុណ្ណោះ, រំលងតេស្ត/ពិនិត្យតំណ, គ្មាន push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ភាសាទាំងអស់, ជាមួយតេស្ត/ពិនិត្យតំណ, បន្ទាប់មក push: `make web_build_local_preview && make web_push_github`
- មុននឹងផ្សព្វផ្សាយ សូមរត់ការពិនិត្យតំណដែលអាចប្រើបានក្រៅបណ្តាញ: `make web_build_linkcheck`។
- i18n: អង់គ្លេសនៅ `website/docs/*.md`; ការបកប្រែអាល្លឺម៉ង់នៅ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- ស្វែងរក: ប្រសិនបើមានកំណត់អថេរបរិស្ថាន Algolia DocSearch នៅក្នុង CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) គេហទំព័រនឹងប្រើសេវាស្វែងរក Algolia; បើមិនដូច្នេះទេ នឹងត្រឡប់ទៅស្វែងរកក្នុងមូលដ្ឋាន។ នៅទំព័រដើម ចុច `/` ឬ `Ctrl+K` ដើម្បីបើកប្រអប់ស្វែងរក។

---

#### ផ្លូវបង្វែរ ស្នើបរិច្ចាគ {#donate-redirect}

- `website/src/pages/donate.js`
- ផ្លូវ: `/donate` (និង `/<locale>/donate`)
- អាកប្បកិរិយា:
- បើផ្លូវបច្ចុប្បន្នមានភាសា (ឧ., `/de/donate`) សូមប្រើវា
- បើមិនដូច្នេះទេ ជ្រើសការផ្គូផ្គងល្អបំផុតពី `navigator.languages` ជាមួយភាសាដែលបានកំណត់; ប្រសិនបើមិនមាន សូមត្រឡប់ទៅភាសាលំនាំដើម
- បង្វែរទៅ:
- `en` → `/docs/donation`
- ផ្សេងទៀត → `/<locale>/docs/donation`
- ប្រើ `useBaseUrl` សម្រាប់គ្រប់គ្រង baseUrl ឲ្យត្រឹមត្រូវ
- រួមមាន meta refresh + តំណ `noscript` ជាជម្រើសបម្រុង

---

---

#### គន្លឹះមើលជាមុន {#preview-tips}

- បញ្ឈប់ការមើលជាមុនរបស់ Node ឲ្យបានស្អាត: បើក `http://localhost:<port>/__stop` (បោះពុម្ពបន្ទាប់ពី `Local server started`)។
- បើរូបភាពមិនផ្ទុកនៅក្នុង MDX/JSX សូមប្រើ `useBaseUrl('/img/...')` ដើម្បីគោរព `baseUrl` របស់គេហទំព័រ។
- ការមើលជាមុនចាប់ផ្តើមជាមុន; ការត្រួតពិនិត្យតំណរត់បន្តក្រោយ ហើយមិនរារាំងទេ (តំណខាងក្រៅដែលខូចមិនធ្វើឲ្យបញ្ឈប់ការមើលជាមុនទេ)។
- ឧទាហរណ៍ URL សម្រាប់មើលជាមុន: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (បោះពុម្ពបន្ទាប់ពី “Local server started”)។
- តំណខាងក្រៅក្នុងការត្រួតពិនិត្យតំណ: គេហទំព័រខាងក្រៅមួយចំនួន (ឧ., addons.thunderbird.net) ទប់ស្កាត់ crawler ស្វយៈ និងអាចបង្ហាញ 403 ក្នុងការត្រួតពិនិត្យតំណ។ ការមើលជាមុននៅតែចាប់ផ្តើម; អាចមើលរំលងបានយ៉ាងសុវត្ថិ។

---

#### បកប្រែកេហទំព័រ {#translate-website}

អ្វីដែលអ្នកអាចបកប្រែបាន

- តែ UI របស់គេហទំព័រ: ទំព័រដើម, របាររុករក, បាតកថា និងខ្សែអក្សរ UI ផ្សេងៗ។ មាតិកាឯកសារនៅតែមែនជាអង់គ្លេសសិន។

កន្លែងកែសម្រួល

- កែសម្រួល `website/i18n/<locale>/code.json` (ប្រើ `en` ជាវិភាគ)។ រក្សា placeholders ដូចជា `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` មិនប្តូរ។

បង្កើត ឬធ្វើឲ្យឯកសារស្រស់ឡើងវិញ

- បង្កើត stubs ដែលបាត់សម្រាប់ភាសាទាំងអស់: `npm --prefix website run i18n:stubs`
- សរសេរ​ជាន់​លើ stubs ពីអង់គ្លេស (បន្ទាប់ពីបន្ថែមខ្សែអក្សរថ្មី): `npm --prefix website run i18n:stubs:force`
- ជម្រើសសម្រាប់ភាសាតែមួយ: `npx --prefix website docusaurus write-translations --locale <locale>`

បកប្រែខ្សែអក្សរ UI នៃ ទំព័រដើម/របាររុករក/បាតកថា (OpenAI)

- កំណត់លិខិតសម្គាល់ម្តង (shell ឬ .env):
- `export OPENAI_API_KEY=sk-...`
- ស្រេចចិត្ត: `export OPENAI_MODEL=gpt-4o-mini`
- ម្តងសម្រាប់ភាសាទាំងអស់ (រំលង en): `make translate_web_index`
- កំណត់ត្រឹមភាសាជាក់លាក់: `make translate_web_index OPTS="--locales de,fr"`
- សរសេរជាន់លើតម្លៃដែលមានរួច: `make translate_web_index OPTS="--force"`

សុពលភាព និង ការព្យាយាមឡើងវិញ

- ស្គ្រីបបកប្រែធ្វើសុពលភាពរូបរាង JSON រក្សា placeholders សញ្ញាវង់ និងធានាថា URLs មិនត្រូវបានប្តូរ។
- នៅពេលបរាជ័យក្នុងការធ្វើសុពលភាព វានឹងព្យាយាមឡើងវិញជាមួយមតិយោបល់ រហូតដល់ 2 ដង មុនពេលរក្សាតម្លៃដើម។

មើលជាមុនភាសារបស់អ្នក

- ម៉ាស៊ីនបម្រើអភិវឌ្ឍន៍: `npm --prefix website run start`
- ទស្សនា `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

ការដាក់ស្នើ

- បើក PR ជាមួយឯកសារ `code.json` ដែលបានកែសម្រួល។ រក្សាការផ្លាស់ប្តូរឲ្យមានគោលដៅច្បាស់ និងភ្ជាប់រូបថតអេក្រង់រហ័សបើអាចធ្វើបាន។

---

### គន្លឹះសុវត្ថិភាព និង ការកំណត់រចនាសម្ព័ន្ធ {#security-and-configuration-tips}

- កុំ commit `sources/manifest.json` (បង្កើតបណ្តោះអាសន្នដោយដំណើរការ build)
- រក្សា `browser_specific_settings.gecko.id` ឲ្យមានស្ថិរភាព ដើម្បីថែរក្សាឆានែលអាប់ដេត

---

### ការរក្សាទុកការកំណត់ {#settings-persistence}

- កន្លែងផ្ទុក: ការកំណត់អ្នកប្រើទាំងអស់ស្ថិតនៅក្នុង `storage.local` ហើយត្រូវបានរក្សាទុកឆ្លងកាត់ការអាប់ដេត add‑on។
- ដំឡើង: តម្លៃលំនាំដើមត្រូវបានអនុវត្ត នៅពេលដែលសោខ្វះពិតប្រាកដ (undefined) ប៉ុណ្ណោះ។
- ធ្វើបច្ចុប្បន្នភាព: ការផ្លាស់ទីបំពេញតែសោដែលខ្វះ; តម្លៃដែលមានរួចមិនត្រូវបានសរសេរជាន់លើឡើយ។
- សញ្ញាស្គីម៉ា: `settingsVersion` (បច្ចុប្បន្ន `1`)។
- សោ និង តម្លៃលំនាំដើម:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- កូដ: សូមមើល `sources/background.js` → `initializeOrMigrateSettings()` និង `SCHEMA_VERSION`។

លំហូរការងារ dev (បន្ថែមការកំណត់ថ្មី)

- បំប្លែងកំណែ `SCHEMA_VERSION` នៅក្នុង `sources/background.js`।
- បន្ថែមសោថ្មី + តម្លៃលំនាំដើមទៅក្នុងវត្ថុ `DEFAULTS` នៅក្នុង `initializeOrMigrateSettings()`។
- ប្រើច្បាប់ "only-if-undefined" ពេលបង្កើតតម្លៃលំនាំដើម; កុំសរសេរជាន់លើតម្លៃដែលមានរួច។
- បើការកំណត់មើលឃើញដោយអ្នកប្រើ ត្រូវភ្ជាប់វានៅក្នុង `sources/options.js` ហើយបន្ថែមខ្សែអក្សរតាមមូលដ្ឋានភាសា។
- បន្ថែម/លៃតម្រូវតេស្ត (សូមមើល `tests/background.settings.migration.test.js`)។

គន្លឹះសាកល្បងដោយដៃ

- ក្លែងធ្វើការដំឡើងថ្មី: សម្អាតថតទិន្នន័យរបស់ extension ឬចាប់ផ្តើមជាមួយប្រវត្តិរូបថ្មី។
- ក្លែងធ្វើអាប់ដេត: កំណត់ `settingsVersion` ទៅ `0` នៅក្នុង `storage.local` ហើយផ្ទុកឡើងវិញ; ប្រាកដថាតម្លៃដែលមានមិនប្តូរ ហើយបន្ថែមតែលេខសោដែលខ្វះប៉ុណ្ណោះ។

---

### ដោះស្រាយបញ្ហា {#troubleshooting}

- ប្រាកដថា Thunderbird ជា 128 ESR ឬក៏ថ្មីជាងនេះ
- ប្រើ Error Console សម្រាប់បញ្ហាពេលដំណើរការ
- បើទំនាក់ទំនងការកំណត់ដែលបានរក្សាទុកមើលទៅមិនអនុវត្តត្រឹមត្រូវ សូមចាប់ផ្តើម Thunderbird ឡើងវិញ ហើយសាកល្បងម្ដងទៀត។ (Thunderbird អាចរក្សាទុកស្ថានភាពអំឡុងសម័យ; ការចាប់ផ្តើមឡើងវិញធានាថាការកំណត់ថ្មីត្រូវបានផ្ទុកឡើង)

---

### CI និង ការគ្របដណ្តប់ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) រត់ vitest ជាមួយកម្រិតទទួលយកការគ្របដណ្តប់ (85% លើបន្ទាត់/មុខងារ/សាខា/សេចក្ដីថ្លែងការណ៍)។ បើមិនឆ្លើយតាមកម្រិត ការងារនឹងបរាជ័យ។
- លំហូរការងារនេះអាប់ឡូដ artifact `coverage-html` ជាមួយរបាយការណ៍ HTML; ទាញយកវាពីទំព័ររត់ (Actions → latest run → Artifacts)។

---

### ការរួមចំណែក {#contributing}

- សូមមើល CONTRIBUTING.md សម្រាប់បណ្តាញនីតិវិធី branch/commit/PR
- គន្លឹះ: បង្កើតប្រវត្តិរូបអភិវឌ្ឍន៍ Thunderbird ដាច់ដោយឡែកសម្រាប់សាកល្បង ដើម្បីជៀសវាងប៉ះពាល់ដល់ប្រវត្តិរូបប្រចាំថ្ងៃ។

---

### ការបកប្រែ

- ការរត់ភារកិច្ចបកប្រែទំហំធំ “all → all” អាចយឺត និងចំណាយថ្លៃ។ ចាប់ផ្តើមពីសំណុំតូចមួយ (ឧ., ឯកសារប៉ុន្មាន និងភាសា 1–2), ពិនិត្យលទ្ធផល បន្ទាប់មកពង្រីកបន្ថែម។

---

- គោលនយោបាយព្យាយាមឡើងវិញ: ភារកិច្ចបកប្រែអនុវត្តបានរហូតដល់ 3 ដងដោយប្រើ exponential backoff នៅពេលមានកំហុស API; សូមមើល `scripts/translate_web_docs_batch.js` និង `scripts/translate_web_docs_sync.js`។

រូបថតអេក្រង់សម្រាប់ឯកសារ

- រក្សាទុករូបភាពក្រោម `website/static/img/`។
- យោងវាក្នុង MD/MDX តាមរយៈ `useBaseUrl('/img/<filename>')` ដើម្បីឲ្យផ្លូវដំណើរការជាមួយ `baseUrl` របស់គេហទំព័រ។
- បន្ទាប់ពីបន្ថែម ឬប្តូរឈ្មោះរូបភាពក្រោម `website/static/img/`, សូមបញ្ជាក់ថាការយោងទាំងអស់នៅតែប្រើ `useBaseUrl('/img/…')` ហើយបង្ហាញបានក្នុងការមើលជាមុនក្នុងមូលដ្ឋាន។
  Favicons

- `favicon.ico` ច្រើនទំហំ ត្រូវបានបង្កើតស្វ័យប្រវត្តិតាមផ្លូវ build ទាំងអស់ (Make + scripts) តាមរយៈ `website/scripts/build-favicon.mjs`។
- មិនចាំបាច់ជំហានដោយដៃទេ; ការអាប់ដេត `icon-*.png` គ្រប់គ្រាន់។
  គន្លឹះពិនិត្យឡើងវិញ

- រក្សា front‑matter `id` មិនប្តូរនៅក្នុងឯកសារបកប្រែ; បកប្រែតែ `title` និង `sidebar_label` ប៉ុណ្ណោះ បើមាន។

#### clean {#mt-clean}

- គោលបំណង: លុប artifact បង្កើត/មើលជាមុនក្នុងមូលដ្ឋាន។
- ការប្រើប្រាស់: `make clean`
- លុប (បើមាន):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- គោលបំណង: ដាក់ទ្រង់ទ្រាយ, តេស្ត, អាប់ដេត changelog, commit និង push។
- ការប្រើប្រាស់: `make commit`
- សេចក្ដីលម្អិត: រត់ Prettier (write), `make test`, `make test_i18n`; បន្ថែមចំណូលធ្វើបច្ចុប្បន្នភាពក្នុង changelog នៅពេលមាន diff ត្រូវបាន staged; push ទៅ `origin/<branch>`។

---

#### eslint {#mt-eslint}

- គោលបំណង: រត់ ESLint តាម flat config។
- ការប្រើប្រាស់: `make eslint`

---

#### help {#mt-help}

- គោលបំណង: បង្ហាញគោលដៅទាំងអស់ជាមួយឯកសារសង្ខេបមួយបន្ទាត់។
- ការប្រើប្រាស់: `make help`

---

#### lint {#mt-lint}

- គោលបំណង: lint MailExtension ដោយប្រើ `web-ext`។
- ការប្រើប្រាស់: `make lint`
- កំណត់ចំណាំ: ចម្លងបណ្តោះអាសន្ន `sources/manifest_LOCAL.json` → `sources/manifest.json`; មិនអើពើ ZIPs ដែលបានបង្កើត; ព្រមានមិនធ្វើឲ្យបំពានបំពង់។

---

#### menu {#mt-menu}

- គោលបំណង: ម៉ឺនុយអន្តរកម្មសម្រាប់ជ្រើសគោលដៅ Make និងអាគ្យូម៉ង់ស្រេចចិត្ត។
- ការប្រើប្រាស់: រត់ `make` ដោយគ្មានអាគ្យូម៉ង់។
- កំណត់ចំណាំ: បើ `whiptail` មិនមាន ទេ ម៉ឺនុយនឹងត្រឡប់ទៅ `make help`។

---

#### pack {#mt-pack}

- គោលបំណង: បង្កើត ZIPs ATN និង LOCAL (អាស្រ័យលើ `lint`)។
- ការប្រើប្រាស់: `make pack`
- គន្លឹះ: បំប្លែងកំណែទាំងពីរ​នៅក្នុង `sources/manifest_*.json` មុនពេលចាក់កញ្ចប់។

---

#### prettier {#mt-prettier}

- គោលបំណង: ដាក់ទ្រង់ទ្រាយឃ្លាំងកូដនៅកន្លែង។
- ការប្រើប្រាស់: `make prettier`

#### prettier_check {#mt-prettier_check}

- គោលបំណង: ផ្ទៀងផ្ទាត់ទ្រង់ទ្រាយ (គ្មានការសរសេរ)។
- ការប្រើប្រាស់: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- គោលបំណង: alias សម្រាប់ `prettier`។
- ការប្រើប្រាស់: `make prettier_write`

---

#### test {#mt-test}

- គោលបំណង: រត់ Prettier (write), ESLint បន្ទាប់មក Vitest (coverage បើបានដំឡើង)។
- ការប្រើប្រាស់: `make test`

#### test_i18n {#mt-test_i18n}

- គោលបំណង: តេស្តផ្តោតលើ i18n សម្រាប់ខ្សែអក្សរ add‑on និងឯកសារគេហទំព័រ។
- ការប្រើប្រាស់: `make test_i18n`
- រត់: `npm run test:i18n` និង `npm run -s test:website-i18n`។

---

#### translate_app / translation_app {#mt-translation-app}

- គោលបំណង: បកប្រែខ្សែអក្សរ UI របស់ add‑on ពី EN ទៅភាសាផ្សេងទៀត។
- ការប្រើប្រាស់: `make translation_app OPTS="--locales all|de,fr"`
- កំណត់ចំណាំ: រក្សារចនាសម្ព័ន្ធសោ និង placeholders; កំណត់ហេតុទៅ `translation_app.log`។ ទម្រង់ស្គ្រីប: `node scripts/translate_app.js --locales …`។

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- គោលបំណង: បកប្រែឯកសារគេហទំព័រពី `website/docs/*.md` ទៅ `website/i18n/<locale>/...`។
- ផ្តល់អាទិភាព: `translate_web_docs_batch` (OpenAI Batch API)
  - ការប្រើប្រាស់ (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ទម្រង់ positional ចាស់នៅតែទទួលយក: `OPTS="<doc|all> <lang|all>"`
- អាកប្បកិរិយា: សាងសង់ JSONL, អាប់ឡូដ, ស្ទង់មើលរៀងរាល់ 30 វិនាទី, ទាញយកលទ្ធផល, សរសេរឯកសារ។
- កំណត់ចំណាំ: ការងារ batch អាចចំណាយពេលរហូតដល់ 24 ម៉ោង (តាមបង្អួច batch របស់ OpenAI)។ Console បង្ហាញពេលកន្លងផុតលើរាល់ការស្ទង់មើល។
- បរិស្ថាន: `OPENAI_API_KEY` (ត្រូវការ), ស្រេចចិត្ត `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (លំនាំដើម 24h), `BATCH_POLL_INTERVAL_MS`។
- ចាស់: `translate_web_docs_sync`
  - ការប្រើប្រាស់ (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ទម្រង់ positional ចាស់នៅតែទទួលយក: `OPTS="<doc|all> <lang|all>"`
- អាកប្បកិរិយា: សំណើជាសមកាលកម្មតាមគូ (គ្មានការបូកបញ្ចូលជា batch)។
- កំណត់ចំណាំ: មានការសួរអន្តរកម្ម នៅពេលបោះបង់ `OPTS`។ របៀបទាំងពីររក្សា code blocks/inline code ហើយរក្សា front‑matter `id` មិនប្តូរ; កំណត់ហេតុទៅ `translation_web_batch.log` (batch) ឬ `translation_web_sync.log` (sync)។

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- គោលបំណង: បកប្រែខ្សែអក្សរ UI គេហទំព័រ (ទំព័រដើម, របាររុករក, បាតកថា) ពី `website/i18n/en/code.json` ទៅភាសាទាំងអស់ក្រោម `website/i18n/<locale>/code.json` (មិនរាប់បញ្ចូល `en`)។
- ការប្រើប្រាស់: `make translate_web_index` ឬ `make translate_web_index OPTS="--locales de,fr [--force]"`
- តម្រូវការ: export `OPENAI_API_KEY` (ស្រេចចិត្ត: `OPENAI_MODEL=gpt-4o-mini`)។
- អាកប្បកិរិយា: ផ្ទៀងផ្ទាត់រចនាសម្ព័ន្ធ JSON, រក្សា placeholders សញ្ញាវង់, រក្សា URLs មិនប្តូរ, និងព្យាយាមឡើងវិញជាមួយមតិយោបល់នៅពេលមានកំហុសការផ្ទៀងផ្ទាត់។

---

#### web_build {#mt-web_build}

- គោលបំណង: សាងសង់គេហទំព័រឯកសារទៅ `website/build`។
- ការប្រើប្រាស់: `make web_build OPTS="--locales en|de,en|all"` (ឬកំណត់ `BUILD_LOCALES="en de"`)
- ខាងក្នុង: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`។
- អាស្រ័យធាតុ: រត់ `npm ci` នៅក្នុង `website/` តែប៉ុណ្ណោះ បើ `website/node_modules/@docusaurus` បាត់។

#### web_build_linkcheck {#mt-web_build_linkcheck}

- គោលបំណង: ពិនិត្យតំណក្នុងលក្ខណៈ offline‑safe។
- ការប្រើប្រាស់: `make web_build_linkcheck OPTS="--locales en|all"`
- កំណត់ចំណាំ: សាងសង់ទៅ `tmp_linkcheck_web_pages`; សរសេរឡើងវិញ GH Pages `baseUrl` ទៅ `/`; រំលងតំណ HTTP(S) ខាងក្រៅ។

#### web_build_local_preview {#mt-web_build_local_preview}

- គោលបំណង: មើលជាមុន gh‑pages ក្នុងមូលដ្ឋាន ជាមួយតេស្ត/ពិនិត្យតំណជាស្រេចចិត្ត។
- ការប្រើប្រាស់: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- អាកប្បកិរិយា: ព្យាយាមម៉ាស៊ីនបម្រើមើលជាមុនរបស់ Node ជាមុន (`scripts/preview-server.mjs`, គាំទ្រ `/__stop`), បើមិនសម្រេច ត្រឡប់ទៅ `python3 -m http.server`; បម្រើលើ 8080–8090; PID នៅ `web-local-preview/.server.pid`។

#### web_push_github {#mt-web_push_github}

- គោលបំណង: push `website/build` ទៅសាខា `gh-pages`។
- ការប្រើប្រាស់: `make web_push_github`

គន្លឹះ: កំណត់ `NPM=…` ដើម្បីបដិសេធ package manager ដែល Makefile ប្រើ (លំនាំដើម `npm`)។

---
