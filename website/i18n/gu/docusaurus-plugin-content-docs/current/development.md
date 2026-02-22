---
id: development
title: 'વિકાસ'
sidebar_label: 'વિકાસ'
---

---

## વિકાસ માર્ગદર્શિકા {#development-guide}

:::note ફક્ત અંગ્રેજી સંપાદિત કરો; અનુવાદ ફેલાય છે
દસ્તાવેજીકરણ **માત્ર** `website/docs` (English) હેઠળ સુધારો. `website/i18n/<locale>/…` હેઠળના અનુવાદ આપમેળે બનતા હોવાથી તેમને હસ્તચાલિત રીતે સંપાદિત ન કરો. સ્થાનિકીકૃત સામગ્રી તાજી કરવા માટે અનુવાદ કાર્યો (જેમ કે `make translate_web_docs_batch`) નો ઉપયોગ કરો.
:::

### પૂર્વઆવશ્યકતાઓ {#prerequisites}

- Node.js 22+ અને npm (Node 22 સાથે ટેસ્ટ થયું)
- Thunderbird 128 ESR અથવા નવીનતર (મેન્યુઅલ ટેસ્ટિંગ માટે)

---

### પ્રોજેક્ટ લેઆઉટ (ઉચ્ચ‑સ્તર) {#project-layout-high-level}

- રૂટ: પેકેજિંગ સ્ક્રિપ્ટ `distribution_zip_packer.sh`, દસ્તાવેજો, સ્ક્રીનશોટ્સ
- `sources/`: મુખ્ય એડ‑ઓન કોડ (background, options/popup UI, manifests, icons)
- `tests/`: Vitest સુઈટ
- `website/`: Docusaurus દસ્તાવેજો (i18n સાથે `website/i18n/de/...` હેઠળ)

---

### ઇન્સ્ટોલ અને ટૂલિંગ {#install-and-tooling}

- રૂટ ડિપ્સ ઇન્સ્ટોલ કરો: `npm ci`
- Docs (વૈકલ્પિક): `cd website && npm ci`
- Targets શોધો: `make help`

---

### લાઇવ ડેવ (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop માં ઝડપી લૂપ (ફક્ત UI સ્મોક‑ટેસ્ટ્સ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird માં ચલાવો (MailExtensions માટે પ્રાધાન્ય):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ટીપ્સ:
- Thunderbird ની Error Console ખોલી રાખો (Tools → Developer Tools → Error Console).
- MV3 event પેજિસ નિષ્ક્રિય થયા પછી સસ્પેન્ડ થાય છે; કોડમાં ફેરફાર પછી એડ‑ઓન રિલોડ કરો અથવા web‑ext ને auto‑reload કરવા દો.
- કેટલાક Firefox‑માત્ર વર્તનો ભિન્ન હોઈ શકે; API parity માટે હંમેશા Thunderbird માં ચકાસો.
- Thunderbird બાયનરી પાથ્સ (ઉદાહરણ):
- Linux: `thunderbird` (જેમ કે `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- પ્રોફાઇલ આઇસોલેશન: તમારા દૈનિક સેટઅપને અસરથી બચાવવા વિકાસ માટે અલગ Thunderbird પ્રોફાઇલનો ઉપયોગ કરો.

---

### Make Targets (આલ્ફાબેટીકલ) {#make-targets-alphabetical}

Makefile સામાન્ય ડેવ ફ્લોઝને સ્ટાન્ડર્ડાઇઝ કરે છે. દરેક target માટે એક‑લાઇન સારાંશ માટે ક્યારેય પણ `make help` ચલાવો.

ટીપ: target વગર `make` ચલાવતાં સરળ Whiptail મેનુ ખુલે છે જ્યાંથી target પસંદ કરી શકો છો.

| Target                                                   | એક‑પંક્તિનું વર્ણન                                                                  |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | લોકલ build/preview આર્ટિફેક્ટ્સ દૂર કરો (tmp/, web-local-preview/, website/build/). |
| [`commit`](#mt-commit)                                   | ફૉર્મેટ, ટેસ્ટ (i18n સહિત), changelog અપડેટ, commit અને push.                       |
| [`eslint`](#mt-eslint)                                   | ફ્લેટ કૉન્ફિગ મારફતે ESLint ચલાવો (`npm run -s lint:eslint`).                       |
| [`help`](#mt-help)                                       | બધી targets ને એક‑લાઇન ડૉક્સ સાથે યાદીબદ્ધ કરો (સૉર્ટેડ).                           |
| [`lint`](#mt-lint)                                       | `sources/` પર web‑ext lint (ટેમ્પ મેનિફેસ્ટ; ZIPs અવગણે છે; non‑fatal).             |
| [`menu`](#mt-menu)                                       | target અને વૈકલ્પિક arguments પસંદ કરવા માટે ઇન્ટરએક્ટિવ મેનુ.                      |
| [`pack`](#mt-pack)                                       | ATN અને LOCAL ZIPs બનાવો (linter ચલાવે; packer સ્ક્રિપ્ટ કોલ કરે).                  |
| [`prettier`](#mt-prettier)                               | રેપોઝીટરીને સ્થળ પર ફૉર્મેટ કરો (ફેરફારો લખે છે).                                   |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ચેક મોડમાં (લખાણ નહીં); રિફૉર્મેટ જોઈએ તો નિષ્ફળ જાય.                      |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` માટે એલિયસ.                                                              |
| [`test`](#mt-test)                                       | Prettier (લખાણ), ESLint, પછી Vitest (કવરેજ જો કન્ફિગર્ડ હોય).                       |
| [`test_i18n`](#mt-test_i18n)                             | ફક્ત i18n ટેસ્ટ્સ: એડ‑ઓન placeholders/parity + વેબસાઇટ parity.                      |
| [`translate_app`](#mt-translation-app)                   | `translation_app` માટે એલિયસ.                                                       |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` માંથી એપ UI સ્ટ્રિંગ્સનું અનુવાદ કરો.           |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API મારફતે વેબસાઇટ દસ્તાવેજોનું અનુવાદ (પ્રાથમિક).                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | વેબસાઇટ દસ્તાવેજોનું સમકાલીન અનુવાદ (લેગસી, non-batch).                             |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` માટે એલિયસ.                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | હોમપેજ/નેવબાર/ફૂટર UI અનુવાદ (`website/i18n/en/code.json → .../<lang>/code.json`).  |
| [`web_build`](#mt-web_build)                             | `website/build` પર દસ્તાવેજો બિલ્ડ કરો (`--locales` / `BUILD_LOCALES` સમર્થન કરે).  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ઑફલાઇન‑સેફ લિંક ચેક (રિમોટ HTTP[S] ટાળી દે છે).                                     |
| [`web_build_local_preview`](#mt-web_build_local_preview) | લોકલ gh‑pages_preview; 8080–8090 પર auto‑serve; વૈકલ્પિક ટેસ્ટ્સ/લિંક‑ચેક.          |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ને `gh-pages` બ્રાંચમાં push કરો.                                   |

Syntax for options

- વિકલ્પો પારિત કરવા `make <command> OPTS="…"` નો ઉપયોગ કરો (ક્વોટ્સ ભલામણ). નીચેના દરેક target ઉદાહરણ વપરાશ બતાવે છે.

--

-

#### લોકેલ બિલ્ડ ટીપ્સ {#locale-build-tips}

- લોકેલ્સનો સબસેટ બિલ્ડ કરો: `BUILD_LOCALES="en de"` સેટ કરો અથવા `OPTS="--locales en,de"` વેબ targets ને આપો.
- ચોક્કસ લોકેલનું પ્રિવ્યુ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### બિલ્ડ અને પેકેજ {#build-and-package}

- ZIPs બિલ્ડ કરો: `make pack`
- રેપો રૂટમાં ATN અને LOCAL ZIPs બનાવે છે (આર્ટિફેક્ટ્સ હાથથી સંપાદિત ન કરો)
- ટીપ: પેકેજિંગ પહેલાં `sources/manifest_ATN.json` અને `sources/manifest_LOCAL.json` બંનેમાં વર્ઝન અપડેટ કરો
- મેન્યુઅલ ઇન્સ્ટોલ (ડેવ): Thunderbird → Tools → Add‑ons and Themes → ગિયર → Install Add‑on From File… → બિલ્ડ થયેલ ZIP પસંદ કરો

---

### ટેસ્ટ {#test}

- સંપૂર્ણ સુઈટ: `make test` (Vitest)
- કવરેજ (વૈકલ્પિક):
- `npm i -D @vitest/coverage-v8`
- `make test` ચલાવો; HTML રિપોર્ટ માટે `coverage/index.html` ખોલો
- ફક્ત i18n: `make test_i18n` (UI કીસ/પ્લેસહોલ્ડર્સ/શીર્ષકો + વેબસાઇટ પર‑લોકેલ પર‑ડોક parity સાથે id/title/sidebar_label ચેક્સ)

---

### ડિબગિંગ અને લોગ્સ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- રનટાઇમ પર વર્બોઝ લોગ્સ ટૉગલ કરો:
- સક્ષમ કરો: `messenger.storage.local.set({ debug: true })`
- અક્ષમ કરો: `messenger.storage.local.set({ debug: false })`
- લોગ્સ compose/મોકલતી વખતે દેખાશે

---

### Docs (વેબસાઇટ) {#docs-website}

- ડેવ સર્વર: `cd website && npm run start`
- સ્ટેટીક સાઇટ બિલ્ડ કરો: `cd website && npm run build`
- Make સમકક્ષ (આલ્ફાબેટીકલ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- વપરાશ ઉદાહરણો:
- ફક્ત EN, ટેસ્ટ્સ/લિંક‑ચેક સ્કિપ, કોઈ push નહીં: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- બધી લોકેલ્સ, ટેસ્ટ્સ/લિંક‑ચેક સાથે, પછી push: `make web_build_local_preview && make web_push_github`
- પ્રકાશિત કરવાની પહેલાં, ઑફલાઇન‑સેફ લિંક ચેક ચલાવો: `make web_build_linkcheck`.
- i18n: અંગ્રેજી `website/docs/*.md` માં રહે છે; જર્મન અનુવાદ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` માં
- શોધ: જો Algolia DocSearch env ચલો CI માં સેટ હોય (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), તો સાઇટ Algolia સર્ચ વાપરે છે; નહિતર લોકલ સર્ચ પર ફૉલબેક થાય છે. હોમપેજ પર, સર્ચ બોક્સ ખોલવા `/` અથવા `Ctrl+K` દબાવો.

---

#### Donate રીડાયરેક્ટ રૂટ {#donate-redirect}

- `website/src/pages/donate.js`
- રૂટ: `/donate` (અને `/<locale>/donate`)
- વર્તન:
- હાલના રૂટમાં લોકેલ હોય (જેમ કે `/de/donate`), તો તેને જ વાપરો
- નહિતર, `navigator.languages` અને કન્ફિગર્ડ લોકેલ્સ વચ્ચે શ્રેષ્ઠ મેળ પસંદ કરો; ડિફૉલ્ટ લોકેલ પર ફૉલબેક
- અહીં રીડાયરેક્ટ થાય છે:
- `en` → `/docs/donation`
- અન્ય → `/<locale>/docs/donation`
- યોગ્ય baseUrl હેન્ડલિંગ માટે `useBaseUrl` વાપરે છે
- ફૉલબેક તરીકે meta refresh + `noscript` લિંક શામેલ છે

---

---

#### પ્રિવ્યુ ટીપ્સ {#preview-tips}

- Node preview સ્વચ્છ રીતે બંધ કરો: `http://localhost:<port>/__stop` ખોલો (`Local server started` પછી છપાય છે).
- જો MDX/JSX માં ઇમેજિસ લોડ ન થતી હોય, તો સાઇટ `baseUrl` ને માન આપવા `useBaseUrl('/img/...')` નો ઉપયોગ કરો.
- પ્રિવ્યુ પહેલાં શરૂ થાય છે; પછી લિંક ચેક ચાલે છે અને બ્લૉકિંગ નથી (ટૂટી ગયેલી બાહ્ય લિંક્સ પ્રિવ્યુ અટકાવશે નહીં).
- ઉદાહરણ પ્રિવ્યુ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” પછી છપાય છે).
- લિંક‑ચેકમાં બાહ્ય લિંક્સ: કેટલીક બાહ્ય સાઇટ્સ (જેમ કે addons.thunderbird.net) ઓટોમેટેડ ક્રૉલર્સને બ્લૉક કરે છે અને લિંક ચેક્સમાં 403 બતાવી શકે છે. પ્રિવ્યુ હજી પણ શરૂ થાય છે; આને અવગણવું સુરક્ષિત છે.

---

#### વેબસાઇટનું અનુવાદ કરો {#translate-website}

શું તમે અનુવાદ કરી શકો

- ફક્ત વેબસાઇટ UI: હોમપેજ, નેવબાર, ફૂટર અને અન્ય UI સ્ટ્રિંગ્સ. દસ્તાવેજ સામગ્રી હાલ માટે ફક્ત અંગ્રેજીમાં જ રહેશે.

ક્યાં સંપાદિત કરવું

- `website/i18n/<locale>/code.json` સંપાદિત કરો (`en` ને રેફરન્સ તરીકે વાપરો). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` જેવા placeholders અનચેઇન્જ્ડ રાખો.

ફાઇલો જનરેટ કરો અથવા રિફ્રેશ કરો

- બધી લોકેલ્સ માટે ગેરહાજર સ્ટબ્સ બનાવો: `npm --prefix website run i18n:stubs`
- અંગ્રેજીમાંથી સ્ટબ્સ ઓવરરાઇટ કરો (નવી સ્ટ્રિંગ્સ ઉમેર્યા પછી): `npm --prefix website run i18n:stubs:force`
- એક જ લોકેલ માટે વિકલ્પ: `npx --prefix website docusaurus write-translations --locale <locale>`

હોમપેજ/નેવબાર/ફૂટર UI સ્ટ્રિંગ્સનું અનુવાદ (OpenAI)

- ક્રેડેન્શિયલ્સ એકવાર સેટ કરો (શેલ અથવા .env):
- `export OPENAI_API_KEY=sk-...`
- વૈકલ્પિક: `export OPENAI_MODEL=gpt-4o-mini`
- એક‑શૉટ (બધી લોકેલ્સ, en સ્કિપ): `make translate_web_index`
- ચોક્કસ લોકેલ્સ સુધી મર્યાદિત કરો: `make translate_web_index OPTS="--locales de,fr"`
- હાજર મૂલ્યો ઓવરરાઇટ કરો: `make translate_web_index OPTS="--force"`

વેલીડેશન અને રિટ્રાયઝ

- ટ્રાન્સલેશન સ્ક્રિપ્ટ JSON આકાર વેલિડેટ કરે છે, કર્લી‑બ્રેસ placeholders સાચવે છે, અને URLs અચળ રાખે છે.
- વેલીડેશન નિષ્ફળતાની સ્થિતિમાં, તે પ્રતિભાવ સાથે 2 વખત સુધી ફરી પ્રયાસ કરે છે અને ત્યાર પછી હાલના મૂલ્યો જ રાખે છે.

તમારો લોકેલ પ્રિવ્યુ કરો

- ડેવ સર્વર: `npm --prefix website run start`
- મુલાકાત લો: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

સબમિટિંગ

- સંપાદિત `code.json` ફાઇલ(ઓ) સાથે PR ખોલો. ફેરફારો કેન્દ્રિત રાખો અને શક્ય હોય ત્યારે ઝડપી સ્ક્રીનશોટ ઉમેરો.

---

### સુરક્ષા અને કન્ફિગ્યુરેશન ટીપ્સ {#security-and-configuration-tips}

- `sources/manifest.json` commit ન કરો (બિલ્ડ દ્વારા થોડીવાર માટે બનાવાય છે)
- અપડેટ ચેનલ સાચવવા `browser_specific_settings.gecko.id` સ્થિર રાખો

---

### સેટિંગ્સ પરસિસ્ટન્સ {#settings-persistence}

- Storage: તમામ યુઝર સેટિંગ્સ `storage.local` માં રહે છે અને એડ‑ઓન અપડેટ્સમાં પરસિસ્ટ થાય છે.
- ઇન્સ્ટોલ: ડિફૉલ્ટ્સ ફક્ત ત્યારે લાગુ પડે છે જ્યારે કી કડક રીતે ગેરહાજર હોય (undefined).
- અપડેટ: માઇગ્રેશન ફક્ત ગેરહાજર કીઓ ભરે છે; હાલના મૂલ્યો ક્યારેય ઓવરરાઇટ થતા નથી.
- Schema માર્કર: `settingsVersion` (હાલમાં `1`).
- કીઓ અને ડિફૉલ્ટ્સ:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- કોડ: `sources/background.js` → `initializeOrMigrateSettings()` અને `SCHEMA_VERSION` જુઓ.

ડેવ વર્કફ્લો (નવી સેટિંગ ઉમેરવી)

- `sources/background.js` માં `SCHEMA_VERSION` બમ્પ કરો.
- `initializeOrMigrateSettings()` માં `DEFAULTS` ઓબ્જેક્ટમાં નવી કી + ડિફૉલ્ટ ઉમેરો.
- ડિફૉલ્ટ્સ સિડ કરતી વખતે "માત્ર‑જો‑undefined" નિયમ વાપરવો; હાલના મૂલ્યો ઓવરરાઇટ ન કરો.
- સેટિંગ યુઝર‑વિઝિબલ હોય તો `sources/options.js` માં વાયર કરો અને સ્થાનિકીકૃત સ્ટ્રિંગ્સ ઉમેરો.
- ટેસ્ટ્સ ઉમેરો/સમાયોજિત કરો (`tests/background.settings.migration.test.js` જુઓ).

મેન્યુઅલ ટેસ્ટિંગ ટીપ્સ

- તાજી ઇન્સ્ટોલનું અનુકરણ: એક્સ્ટેન્શનની ડેટા ડિર સાફ કરો અથવા નવી પ્રોફાઇલથી શરૂ કરો.
- અપડેટનું અનુકરણ: `storage.local` માં `settingsVersion` ને `0` પર સેટ કરો અને ફરી લોડ કરો; ખાતરી કરો કે હાલના મૂલ્યો અચળ રહે અને ફક્ત ગેરહાજર કીઓ ઉમેરાય.

---

### ટ્રબલશૂટિંગ {#troubleshooting}

- ખાતરી કરો કે Thunderbird 128 ESR અથવા નવીનતર છે
- રનટાઇમ મુદ્દાઓ માટે Error Console વાપરો
- જો સ્ટોર થયેલ સેટિંગ્સ યોગ્ય રીતે લાગુ પડતા ન દેખાતા હોય, તો Thunderbird રિસ્ટાર્ટ કરો અને ફરી પ્રયાસ કરો. (Thunderbird સત્રો વચ્ચે state કેશ કરી શકે છે; રિસ્ટાર્ટથી તાજા સેટિંગ્સ લોડ થાય છે.)

---

### CI અને કવરેજ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) coverage thresholds (85% lines/functions/branches/statements) સાથે vitest ચલાવે છે. thresholds ન મળ્યાં હોય તો જોબ નિષ્ફળ જાય છે.
- વર્કફ્લો HTML રિપોર્ટ સાથે `coverage-html` આર્ટિફેક્ટ અપલોડ કરે છે; રન પેજ પરથી ડાઉનલોડ કરો (Actions → છેલ્લો રન → Artifacts).

---

### સહયોગ {#contributing}

- બ્રાન્ચ/કમિટ/PR માર્ગદર્શિકાઓ માટે CONTRIBUTING.md જુઓ
- ટીપ: તમારા દૈનિક પ્રોફાઇલને અસરથી બચાવવા માટે ટેસ્ટિંગ માટે અલગ Thunderbird ડેવલપમેન્ટ પ્રોફાઇલ બનાવો.

---

### અનુવાદ

- મોટા “all → all” અનુવાદ જોબ્સ ધીમા અને ખર્ચાળ હોઈ શકે છે. સબસેટથી શરૂઆત કરો (જેમ કે થોડાં ડોક્સ અને 1–2 લોકેલ્સ), પરિણામ સમીક્ષો, પછી વિસ્તારો.

---

- Retry નીતિ: અનુવાદ જોબ્સ API ભૂલებზე એક્સ્પોનેન્શિયલ બૅકઓફ સાથે 3 રિટ્રાય સુધી કરે છે; `scripts/translate_web_docs_batch.js` અને `scripts/translate_web_docs_sync.js` જુઓ.

દસ્તાવેજો માટે સ્ક્રીનશોટ્સ

- ઇમેજિસ `website/static/img/` હેઠળ સંગ્રહિત કરો.
- તેમને MD/MDX માં `useBaseUrl('/img/<filename>')` મારફતે રેફરન્સ કરો જેથી પાથ્સ સાઇટ `baseUrl` સાથે કામ કરે.
- `website/static/img/` હેઠળ ઇમેજિસ ઉમેર્યા અથવા નામબદલ કર્યા પછી, ખાતરી કરો કે બધી રેફરન્સિસ હજુ પણ `useBaseUrl('/img/…')` વાપરે છે અને લોકલ પ્રિવ્યુમાં દેખાય છે.
  Favicons

- મલ્ટી‑સાઇઝ `favicon.ico` આપમેળે બધા બિલ્ડ પાથ્સ (Make + scripts) માં `website/scripts/build-favicon.mjs` મારફતે જનરેટ થાય છે.
- કોઈ મેન્યુઅલ પગલું જરૂરી નથી; `icon-*.png` અપડેટ કરવું પૂરતું છે.
  Review tip

- અનુવાદિત દસ્તાવેજોમાં front‑matter `id` અનચેઇન્જ્ડ રાખો; જ્યાં હાજર હોય ત્યાં ફક્ત `title` અને `sidebar_label` નો અનુવાદ કરો.

#### clean {#mt-clean}

- હેતુ: લોકલ build/preview આર્ટિફેક્ટ્સ દૂર કરો.
- વપરાશ: `make clean`
- દૂર કરે છે (હાજર હોય તો):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- હેતુ: ફૉર્મેટ, ટેસ્ટ, changelog અપડેટ, commit, અને push.
- વપરાશ: `make commit`
- વિગતો: Prettier (લખાણ), `make test`, `make test_i18n` ચલાવે છે; staged ડિફ્સ હોય ત્યારે changelog ઉમેરે છે; `origin/<branch>` પર push કરે છે.

---

#### eslint {#mt-eslint}

- હેતુ: ફ્લેટ કૉન્ફિગ મારફતે ESLint ચલાવો.
- વપરાશ: `make eslint`

---

#### help {#mt-help}

- હેતુ: એક‑લાઇન ડૉક્સ સાથે બધી targets યાદીબદ્ધ કરો.
- વપરાશ: `make help`

---

#### lint {#mt-lint}

- હેતુ: `web-ext` નો ઉપયોગ કરીને MailExtension lint કરો.
- વપરાશ: `make lint`
- નોંધો: `sources/manifest_LOCAL.json` → `sources/manifest.json` ટેમ્પ‑કૉપીઝ કરે છે; બિલ્ટ ZIPs અવગણે છે; ચેતવણીઓ પાઇપલાઇન નિષ્ફળ કરતી નથી.

---

#### menu {#mt-menu}

- હેતુ: Make target અને વૈકલ્પિક arguments પસંદ કરવા ઇન્ટરએક્ટિવ મેનુ.
- વપરાશ: કોઈ arguments વગર `make` ચલાવો.
- નોંધો: જો `whiptail` ઉપલબ્ધ ન હોય, તો મેનુ `make help` પર ફૉલબેક કરે છે.

---

#### pack {#mt-pack}

- હેતુ: ATN અને LOCAL ZIPs બિલ્ડ કરો (`lint` પર આધારિત).
- વપરાશ: `make pack`
- ટીપ: પેકેજિંગ પહેલાં બંનેમાં વર્ઝન બમ્પ કરો `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- હેતુ: રેપોને સ્થળ પર ફૉર્મેટ કરો.
- વપરાશ: `make prettier`

#### prettier_check {#mt-prettier_check}

- હેતુ: ફૉર્મેટિંગ વેરીફાઈ કરો (લખાણ નહીં).
- વપરાશ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- હેતુ: `prettier` માટે એલિયસ.
- વપરાશ: `make prettier_write`

---

#### test {#mt-test}

- હેતુ: Prettier (લખાણ), ESLint, પછી Vitest (કવરેજ જો ઇન્સ્ટોલ્ડ).
- વપરાશ: `make test`

#### test_i18n {#mt-test_i18n}

- હેતુ: એડ‑ઓન સ્ટ્રિંગ્સ અને વેબસાઇટ દસ્તાવેજો માટે i18n‑ફોકસ્ડ ટેસ્ટ્સ.
- વપરાશ: `make test_i18n`
- ચલાવે છે: `npm run test:i18n` અને `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- હેતુ: EN માંથી અન્ય લોકેલ્સમાં એડ‑ઓન UI સ્ટ્રિંગ્સનું અનુવાદ.
- વપરાશ: `make translation_app OPTS="--locales all|de,fr"`
- નોંધો: કી સ્ટ્રક્ચર અને placeholders સાચવે છે; `translation_app.log` માં લોગ કરે છે. સ્ક્રિપ્ટ સ્વરૂપ: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- હેતુ: વેબસાઇટ દસ્તાવેજોનું `website/docs/*.md` માંથી `website/i18n/<locale>/...` માં અનુવાદ.
- પ્રાથમિક: `translate_web_docs_batch` (OpenAI Batch API)
  - વપરાશ (ફ્લેગ્સ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - લેગસી સ્થિતિજન્ય હજી સ્વીકાર્ય છે: `OPTS="<doc|all> <lang|all>"`
- વર્તન: JSONL બનાવે છે, અપલોડ કરે છે, દર 30 સેકંડે પોલ કરે છે, પરિણામો ડાઉનલોડ કરે છે, ફાઇલો લખે છે.
- નોંધ: બૅચ જોબને પૂર્ણ થવા માટે 24 કલાક સુધી લાગી શકે છે (OpenAI ની બૅચ વિન્ડો પ્રમાણે). કન્સોલ દરેક પોલ પર વિતેલા સમય બતાવે છે.
- Env: `OPENAI_API_KEY` (આવશ્યક), વૈકલ્પિક `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ડિફૉલ્ટ 24h), `BATCH_POLL_INTERVAL_MS`.
- લેગસી: `translate_web_docs_sync`
  - વપરાશ (ફ્લેગ્સ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - લેગસી સ્થિતિજન્ય હજી સ્વીકાર્ય છે: `OPTS="<doc|all> <lang|all>"`
- વર્તન: સમકાલીન પ્રતિ‑જોડી વિનંતીઓ (કોઈ બૅચ એગ્રેગેશન નહીં).
- નોંધો: `OPTS` છોડાયેલી હોય ત્યારે ઇન્ટરએક્ટિવ પ્રોમ્પ્ટ્સ. બન્ને મોડ્સ code blocks/inline code સાચવે છે અને front‑matter `id` અનચેઇન્જ્ડ રાખે છે; `translation_web_batch.log` (બૅચ) અથવા `translation_web_sync.log` (સિંક) માં લોગ કરે છે.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- હેતુ: `website/i18n/en/code.json` માંથી તમામ લોકેલ્સમાં ( `en` સિવાય) `website/i18n/<locale>/code.json` હેઠળ વેબસાઇટ UI સ્ટ્રિંગ્સ (હોમપેજ, નેવબાર, ફૂટર) નું અનુવાદ.
- વપરાશ: `make translate_web_index` અથવા `make translate_web_index OPTS="--locales de,fr [--force]"`
- આવશ્યકતાઓ: `OPENAI_API_KEY` એક્સપોર્ટ કરો (વૈકલ્પિક: `OPENAI_MODEL=gpt-4o-mini`).
- વર્તન: JSON સ્ટ્રક્ચર વેલિડેટ કરે છે, કર્લી‑બ્રેસ placeholders સાચવે છે, URLs અચળ રાખે છે, અને વેલિડેશન ભૂલ પર પ્રતિભાવ સાથે રિટ્રાય કરે છે.

---

#### web_build {#mt-web_build}

- હેતુ: દસ્તાવેજ સાઇટને `website/build` પર બિલ્ડ કરો.
- વપરાશ: `make web_build OPTS="--locales en|de,en|all"` (અથવા `BUILD_LOCALES="en de"` સેટ કરો)
- આંતરિક: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- ડેપ્સ: `website/node_modules/@docusaurus` ગેરહાજર હોય ત્યારે જ `website/` માં `npm ci` ચલાવે છે.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- હેતુ: ઑફલાઇન‑સેફ લિંક ચેક.
- વપરાશ: `make web_build_linkcheck OPTS="--locales en|all"`
- નોંધો: `tmp_linkcheck_web_pages` પર બિલ્ડ કરે છે; GH Pages `baseUrl` ને `/` માટે રીરાઇટ કરે છે; રિમોટ HTTP(S) લિંક્સ ટાળી દે છે.

#### web_build_local_preview {#mt-web_build_local_preview}

- હેતુ: વૈકલ્પિક ટેસ્ટ્સ/લિંક‑ચેક સાથે લોકલ gh‑pages પ્રિવ્યુ.
- વપરાશ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- વર્તન: પહેલા Node પ્રિવ્યુ સર્વર પ્રયત્ન કરે છે (`scripts/preview-server.mjs`, `/__stop` સપોર્ટ કરે છે), પછી `python3 -m http.server` પર ફૉલબેક; 8080–8090 પર સર્વ કરે છે; PID `web-local-preview/.server.pid` પર.

#### web_push_github {#mt-web_push_github}

- હેતુ: `website/build` ને `gh-pages` બ્રાંચમાં push કરો.
- વપરાશ: `make web_push_github`

ટીપ: Makefile દ્વારા વપરાતા પેકેજ મેનેજરને ઓવરને લખવા માટે `NPM=…` સેટ કરો (ડિફૉલ્ટ `npm`).
