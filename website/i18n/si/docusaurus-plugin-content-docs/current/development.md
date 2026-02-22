---
id: development
title: 'සංවර්ධනය'
sidebar_label: 'සංවර්ධනය'
---

---

## සංවර්ධන මාර්ගෝපදේශය {#development-guide}

:::note ඉංග්‍රීසි පමණක් සංස්කරණය කරන්න; පරිවර්තන පැතිරේ
ලේඛනගත කිරීම `website/docs` (English) යටතේ පමණක් යාවත්කාලීන කරන්න. `website/i18n/<locale>/…` යටතේ ඇති පරිවර්තන ස්වයංක්‍රීයව ජනනය වන අතර හස්තචාලිතව සංස්කරණය නොකළ යුතුය. ස්ථානීය අන්තර්ගතය නැවත තازي කිරීමට පරිවර්තන කාර්යයන් (උදා., `make translate_web_docs_batch`) භාවිතා කරන්න.
:::

### පූර්ව අවශ්‍යතා {#prerequisites}

- Node.js 22+ සහ npm (Node 22 සමඟ පරීක්ෂා කර ඇත)
- Thunderbird 128 ESR හෝ නවතම (හැස්තීය පරීක්ෂණ සඳහා)

---

### ව්‍යාපෘති පිරිසැලසුම (ඉහළ‑මට්ටමේ) {#project-layout-high-level}

- මූලය: ඇසුරුම් ස්ක්‍රිප්ට් `distribution_zip_packer.sh`, ලේඛන, තිර රූ
- `sources/`: ප්‍රධාන ඇඩ්-අොන් කේතය (පසුබිම, විකල්ප/පොප්-අප් UI, මැනිෆෙස්ට්, අයිකන)
- `tests/`: Vitest කට්ටලය
- `website/`: Docusaurus ලේඛන (i18n `website/i18n/de/...` යටතේ)

---

### ස්ථාපනය හා මෙවලම් {#install-and-tooling}

- මූල ඩිපෙන්ඩන්සි ස්ථාපනය: `npm ci`
- ලේඛන (විකල්ප): `cd website && npm ci`
- ඉලක්ක සොයාගන්න: `make help`

---

### සජීව සංවර්ධනය (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop තුළ ඉක්මන් ලූප් එකක් (UI smoke‑tests පමණක්):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird තුළ ධාවනය කරන්න (MailExtensions සඳහා වඩා සුදුසුයි):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ඉඟි:
- Thunderbird හි Error Console එක විවෘතව තබාගන්න (Tools → Developer Tools → Error Console).
- කාර්ය රහිත විට MV3 event පිටු අත්හිටුවේ; කේත වෙනස්කම්කළ පසු ඇඩ්-අොන් එක නැවත පූරණය කරන්න, නැතිනම් web‑ext ස්වයං‑නැවත පූරණයට ඉඩ දෙන්න.
- Firefox‑පමණක් හැසිරීම් කිහිපයක් වෙනස් විය හැක; API ගැළපීම සඳහා සෑම විටම Thunderbird තුළ තහවුරු කරන්න.
- Thunderbird බൈനරි මාර්ග (උදාහරණ):
- Linux: `thunderbird` (උදා., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ප්‍රොෆයිල් වෙන් කිරීම: ඔබගේ දෛනික සැකසුමට බලපාకుండా සංවර්ධනය සඳහා වෙන් වූ Thunderbird ප්‍රොෆයිලයක් භාවිතා කරන්න.

---

### Make ඉලක්ක (අකාරාදී) {#make-targets-alphabetical}

Makefile එක සාමාන්‍ය සංවර්ධන ප්‍රවහණ සම්මත කරයි. සෑම ඉලක්කයක් පිළිබඳ එක් පේළි සාරාංශයක් දැක්වීමට ඕනෑම වෙලාවක `make help` ධාවනය කරන්න.

ඉඟිය: ඉලක්කයක් නොදැක්වීමෙන් `make` ධාවනය කළහොත් ඉලක්කයක් තෝරන්න සරල Whiptail මෙනුවක් විවෘත වේ.

| ඉලක්කය                                                   | එක් පේළි විස්තරය                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | දේශීය build/preview artifacts ඉවත් කරයි (tmp/, web-local-preview/, website/build/).       |
| [`commit`](#mt-commit)                                   | ස්වයංක්‍රීය ආකෘතිකරණය, පරීක්ෂා (i18n ඇතුළුව) ධාවනය, changelog යාවත්කාලීන, commit සහ push. |
| [`eslint`](#mt-eslint)                                   | flat config හරහා ESLint ධාවනය කරයි (`npm run -s lint:eslint`).                            |
| [`help`](#mt-help)                                       | සියලු ඉලක්ක එක් පේළි ලේඛන සමඟ ලැයිස්තුගත කරයි ( පිළිවෙලකට ).                              |
| [`lint`](#mt-lint)                                       | `sources/` මත web‑ext lint (තාවකාලික manifest; ZIPs නොසලකා හැරේ; මාරාන්තික නොවේ).         |
| [`menu`](#mt-menu)                                       | ඉලක්කයක් හා අමතර තර්ක තෝරාගැනීමට අන්තර්ක්‍රියාත්මක මෙනුව.                                 |
| [`pack`](#mt-pack)                                       | ATN සහ LOCAL ZIPs සාදයි (linter ධාවනය කරයි; packer ස්ක්‍රිප්ට් කැඳවයි).                   |
| [`prettier`](#mt-prettier)                               | ගබඩාව ස්ථානීයව ආකෘතිකරණය කරයි (වෙනස්කම් ලියයි).                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check mode (ලියන්නේ නැත); නැවත ආකෘතිකරණය අවශ්‍ය නම් අසමත් වේ.                    |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` සඳහා නාමාවලිය.                                                                 |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, එවිට Vitest (ග්‍රහණය සකසා ඇත්නම්).                              |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑පමණක් පරීක්ෂා: ඇඩ්‑ඔන් placeholders/ගැළපීම + වෙබ් අඩවිය ගැළපීම.                      |
| [`translate_app`](#mt-translation-app)                   | `translation_app` සඳහා නාමාවලිය.                                                          |
| [`translation_app`](#mt-translation-app)                 | යෙදුම් UI මූලාශ්‍ර වචන `sources/_locales/en/messages.json` වෙතින් පරිවර්තනය කරන්න.        |
| [`translate_web_docs_batch`](#mt-translation-web)        | වෙබ්අඩවි ලේඛන OpenAI Batch API හරහා පරිවර්තනය කරන්න (අභිරුචිය).                           |
| [`translate_web_docs_sync`](#mt-translation-web)         | වෙබ්අඩවි ලේඛන සමකාලීනව පරිවර්තනය කරන්න (පුරුණු, බෑච් නොවේ).                               |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` සඳහා නාමාවලිය.                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | මුල්පිටුව/නැව්බාර්/පාද UI පරිවර්තනය (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | ලේඛන `website/build` වෙත build කරයි (`--locales` / `BUILD_LOCALES` සහය වේ).               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | අස්ථානගත නොවන (offline‑safe) ලින්ක් තහවුරු කිරීම (දුරස්ථ HTTP[S] මඟ හැරේ).                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | දේශීය gh‑pages preview; 8080–8090 මත ස්වයං සේවාව; විකල්ප පරීක්ෂා/ලින්ක්‑තහවුරු කිරීම.     |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` හි අන්තර්ගතය `gh-pages` ශාඛාවට push කරයි.                                 |

විකල්ප සින්ටැක්ස්

- විකල්ප හරහා යැවීමට `make <command> OPTS="…"` භාවිත කරන්න (උපුටා ලිවීම නිර්දේශිතය). පහත සෑම ඉලක්කයක්ම භාවිතා උදාහරණයක් පෙන්වයි.

--

-

#### භාෂා-කට්ටල build ඉඟි {#locale-build-tips}

- භාෂා කට්ටලයක උපකට්ටලයක් පමණක් build කරන්න: `BUILD_LOCALES="en de"` සකසන්න හෝ `OPTS="--locales en,de"` වෙබ් ඉලක්ක වෙත යවන්න.
- විශේෂිත භාෂාවක් preview කරන්න: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & ඇසුරුම් කිරීම {#build-and-package}

- ZIPs සාදන්න: `make pack`
- ගබඩාවේ මූලයෙහි ATN සහ LOCAL ZIPs නිපදවයි (artifacts හස්තචාලිතව සංස්කරණය නොකරන්න)
- ඉඟිය: ඇසුරුම් කිරීමට පෙර `sources/manifest_ATN.json` සහ `sources/manifest_LOCAL.json` දෙකෙහිම අනුවාදය යාවත්කාලීන කරන්න
- හැස්තීය ස්ථාපනය (dev): Thunderbird → Tools → Add‑ons and Themes → ගියර් → Install Add‑on From File… → build කළ ZIP එක තෝරන්න

---

### පරීක්ෂා {#test}

- සම්පූර්ණ කට්ටලය: `make test` (Vitest)
- ආවරණය (විකල්ප):
- `npm i -D @vitest/coverage-v8`
- `make test` ධාවනය කරන්න; HTML වාර්තාව සඳහා `coverage/index.html` විවෘත කරන්න
- i18n පමණක්: `make test_i18n` (UI යතුරු/placeholder/තිරසුළි + වෙබ් අඩවි භාෂාවෙන්‑භාෂාවට/ලේඛනයෙන්‑ලේඛනයට ගැළපීම් සමඟ id/title/sidebar_label පරීක්ෂා)

---

### දෝෂහරණය සහ ලොග {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- ධාවන කාලයේදී විස්තරාත්මක ලොග සක්‍රිය/අක්‍රිය කරන්න:
- සක්‍රිය කරන්න: `messenger.storage.local.set({ debug: true })`
- අක්‍රිය කරන්න: `messenger.storage.local.set({ debug: false })`
- පිළිතුරු සකස්/යැවීමේදී ලොග පෙන්වෙයි

---

### ලේඛන (වෙබ්අඩවිය) {#docs-website}

- Dev server: `cd website && npm run start`
- ස්ථිර අඩවිය build කිරීම: `cd website && npm run build`
- Make සමාන (අකාරාදී): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- භාවිතා උදාහරණ:
- EN පමණක්, පරීක්ෂා/ලින්ක්‑තහවුරු කිරීම මඟහරින්න, push නොකරන්න: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- සියලු භාෂා, පරීක්ෂා/ලින්ක්‑තහවුරු කිරීම සමඟ, එවිට push: `make web_build_local_preview && make web_push_github`
- ප්‍රකාශයට පෙර, offline‑safe ලින්ක් තහවුරු කිරීම ධාවනය කරන්න: `make web_build_linkcheck`.
- i18n: English `website/docs/*.md` තුළ ජීවත් වේ; German පරිවර්තන `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` තුළ
- සෙවුම්: CI තුළ Algolia DocSearch පරිසර විචල්ය සකසා ඇත්නම් (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), අඩවිය Algolia සෙවුම භාවිතා කරයි; නැතිනම් දෙසැප වීමේ සෙවුමට හැරේ. මුල්පිටුවේදී, `/` හෝ `Ctrl+K` එබීමෙන් සෙවුම් පෙට්ටිය විවෘත කළ හැක.

---

#### දානය යළි-යොමු කිරීමේ රූට් {#donate-redirect}

- `website/src/pages/donate.js`
- මාර්ගය: `/donate` (හා `/<locale>/donate`)
- හැසිරීම:
- වත්මන් මාර්ගයට භාෂාවක් ඇත්නම් (උදා., `/de/donate`), එය භාවිතා කරන්න
- නැතිනම්, `navigator.languages` හා සකසා ඇති භාෂා අතර හොඳ ගැළපීම තෝරන්න; පෙරනිමි භාෂාවට බැලීම
- යළි-යොමු වන්නේ:
- `en` → `/docs/donation`
- අනෙක් සියල්ල → `/<locale>/docs/donation`
- යෝග්‍ය baseUrl හැසිරවීමට `useBaseUrl` භාවිතා කරයි
- විකල්ප ලෙස meta refresh + `noscript` ලින්ක් එකක් ඇතුළත් වේ

---

---

#### Preview ඉඟි {#preview-tips}

- Node preview එක සුමට නවත්වන්න: `http://localhost:<port>/__stop` විවෘත කරන්න (`Local server started` පිටපත් වීමෙන් පසු මුද්‍රණය කෙරේ).
- MDX/JSX තුළ පින්තූර load නොවන්නේ නම්, අඩවියේ `baseUrl` ගෞරවයට `useBaseUrl('/img/...')` භාවිත කරන්න.
- Preview එක මුලින් ආරම්භ වේ; එවිට ලින්ක් තහවුරු කිරීම ධාවනය වන අතර එය අවහිර නොකෙරේ (පිටත බිඳී ඇති ලින්ක් preview නවත්වන්නේ නැහැ).
- Preview URL උදාහරණය: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” පසුව මුද්‍රණය කෙරේ).
- ලින්ක්‑තහවුරු කිරීමේදී බාහිර ලින්ක්: සමහර බාහිර අඩවි (උදා., addons.thunderbird.net) ස්වයංක්‍රීය සෙවුම්කරුවන් වසා දමයි; ලින්ක් තහවුරු කිරීම්හි 403 පෙන්විය හැක. Preview එක තවදුරටත් ආරම්භ වේ; මේවා අතපසෙවිය හැක.

---

#### වෙබ්අඩවිය පරිවර්තනය කරන්න {#translate-website}

ඔබට පරිවර්තනය කළ හැක්කේ

- වෙබ් අඩවි UI පමණක්: මුල්පිටුව, නැව්බාර්, පාදය සහ අනෙකුත් UI වචන. ලේඛන අන්තර්ගතය දැනට ඉංග්‍රීසියෙන් පමණි.

කියවිය යුතු ස්ථානය

- `website/i18n/<locale>/code.json` සංස්කරණය කරන්න (`en` යොමු ලෙස භාවිත කරන්න). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` වැනි placeholder ඒවා යතාතත්වයෙන් තබා ගන්න.

ගොනු ජනනය/නැවත තازي කිරීම

- සියලු භාෂා සඳහා නැති stubs සාදන්න: `npm --prefix website run i18n:stubs`
- ඉංග්‍රීසියෙන් stubs යළි ලියන්න (නව වචන එකතු කළ පසු): `npm --prefix website run i18n:stubs:force`
- තනි භාෂාවකට විකල්පය: `npx --prefix website docusaurus write-translations --locale <locale>`

මුල්පිටුව/නැව්බාර්/පාද UI වචන පරිවර්තනය (OpenAI)

- වරක් හෝ .env තුළ අක්තපත්‍ර සකසන්න:
- `export OPENAI_API_KEY=sk-...`
- විකල්ප: `export OPENAI_MODEL=gpt-4o-mini`
- තනි ධාවනය (සියලු භාෂා, en මඟහරින්න): `make translate_web_index`
- විශේෂිත භාෂා වලට සීමා කරන්න: `make translate_web_index OPTS="--locales de,fr"`
- දැනට ඇති අගයන් මත ලියන්න: `make translate_web_index OPTS="--force"`

තහවුරු කිරීම් හා නැවත උත්සාහ

- පරිවර්තන ස්ක්‍රිප්ට් JSON හැඩය තහවුරු කරයි, වකුගඩු වරහන් placeholder (curly‑brace) සුරකිමින්, URL වෙනස් නොවන බව සහතික කරයි.
- තහවුරු කිරීම අසමත් වුවහොත්, එය ප්‍රතිපෝෂණ සමඟ වාර 2 දක්වා නැවත උත්සාහ කරයි; එවිට තිබූ අගයන් තබා ගනී.

ඔබගේ භාෂාව preview කරන්න

- Dev server: `npm --prefix website run start`
- මෙතැනට පිවිසෙන්න: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

සමර්පණය

- සංස්කරණය කළ `code.json` ගොනු සමඟ PR එකක් විවෘත කරන්න. වෙනස්කම් කෙටිව තබාගන්න සහ හැකිවෙලකින් ඉක්මන් ස්ක්‍රීන්ෂොට් එකක් ඇතුළත් කරන්න.

---

### ආරක්ෂාව හා වින්‍යාස ඉඟි {#security-and-configuration-tips}

- `sources/manifest.json` commit නොකරන්න (build මගින් තාවකාලිකව නිර්මාණය කරයි)
- යාවත්කාලීන නාලය සුරැකීම සඳහා `browser_specific_settings.gecko.id` ස්ථාවර තබාගන්න

---

### සැකසුම් ස්ථිරතාව {#settings-persistence}

- ගබඩා: සියලුම පරිශීලක සැකසුම් `storage.local` තුළ ජීවත් වෙමින් ඇඩ්‑ඔන් යාවත්කාලීන අතරතුරත් පවත්නවා.
- ස්ථාපනය: යතුරක් සපුරාල නොමැති විට (undefined) පමණක් පෙරනිමියන් යොදයි.
- යාවත්කාලීනකිරීම: සංක්‍රමණය මඟින් නැති යතුරු පමණක් පුරවයි; දැනට ඇති අගයන් කිසිවිටෙකත් මතලිය නොකරයි.
- පටිපාටිය සලකුණුකරු: `settingsVersion` (දැනට `1`).
- යතුරු සහ පෙරනිමියන්:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- කේතය: බලන්න `sources/background.js` → `initializeOrMigrateSettings()` සහ `SCHEMA_VERSION`.

Dev ක්‍රියාවලිය (නව සැකසුමක් එක් කිරීම)

- `sources/background.js` තුළ `SCHEMA_VERSION` ඉහළට ගෙන යන්න.
- `initializeOrMigrateSettings()` හි `DEFAULTS` වස්තුවට නව යතුර + පෙරනිමිය එක් කරන්න.
- පෙරනිමියන් ඇල්ලීමේදී "only-if-undefined" නියමය භාවිතා කරන්න; දැනට ඇති අගයන් මතලිය නොකරන්න.
- සැකසුම පරිශීලකයාට දෘශ්‍යමාන නම්, එය `sources/options.js` තුළ සම්බන්ධ කර ලෝකාලීකරණ වචන එක් කරන්න.
- පරීක්ෂා එක්/සෙවීම (බලන්න `tests/background.settings.migration.test.js`).

හැස්තීය පරීක්ෂණ ඉඟි

- නව ස්ථාපනයක් අනුකරණය කරන්න: දිඟු කිරීමේ දත්ත ඩිරෙක්ටරිය ඉවත් කරන්න හෝ නව ප්‍රොෆයිල සමඟ ආරම්භ කරන්න.
- යාවත්කාලීනතාව අනුකරණය කරන්න: `storage.local` තුළ `settingsVersion` `0` ලෙස සකස් කර නැවත පූරණය කරන්න; දැනට ඇති අගයන් නොවෙනස්ව පවතින අතර නැති යතුරු පමණක් එක් වී ඇති බව තහවුරු කරන්න.

---

### ගැටළු විසඳීම {#troubleshooting}

- Thunderbird 128 ESR හෝ නවතම බව තහවුරු කරගන්න
- ධාවන කාල ගැටළු සඳහා Error Console භාවිතා කරන්න
- සුරැക്ഷිත සැකසුම් යෙදෙන්නේ දිගින්දිගට නොපෙනේ නම්, Thunderbird නැවත ආරම්භ කර නැවත උත්සාහ කරන්න. (Thunderbird සෙෂන් අතරතුර තත්වය කැෂ් කර තබාගන්නා හැකි බැවින්; නැවත ආරම්භ කිරීමෙන් නව සැකසුම් පූරණය වීම සහතික කරයි.)

---

### CI සහ ආවරණය {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest ආවරණ ද්‍රුවයන් සමඟ ධාවනය කරයි (පේළි/කාර්යයන්/ශාඛා/ප්‍රකාශන 85%). ද්‍රුවයන් නොපිරේ නම්, කාර්යය අසමත් වේ.
- වැඩ ප්‍රවාහය HTML වාර්තාව සමඟ `coverage-html` නාමයෙන් artifact එකක් උඩුගත කරයි; එය ධාවන පිටුවෙන් බාගන්න (Actions → latest run → Artifacts).

---

### දායකවීම {#contributing}

- ශාඛා/commit/PR මඟපෙත් සඳහා CONTRIBUTING.md බලන්න
- ඉඟිය: ඔබගේ දෛනික ප්‍රොෆයිලයට බලපෑමක් වීම වැළැක්වීමට පරීක්ෂාව සඳහා වෙන් වූ Thunderbird සංවර්ධන ප්‍රොෆයිලයක් සාදන්න.

---

### පරිවර්තන

- විශාල “all → all” පරිවර්තන කාර්ය ධාවන මන්දගාමී හා වියදම්වත් විය හැක. කුඩා උපකට්ටලයකින් (උදා., ලේඛන කිහිපයක් සහ භාෂා 1–2 ක්) පටන් ගන්න, ප්‍රතිඵලය සමාලෝචනය කර එවිට පුළුල් කරන්න.

---

- නැවත උත්සාහ ප්‍රතිපත්තිය: පරිවර්තන කාර්යයන් API දෝෂයන් මත ඊට වැඩිවෙන පසුබැසීම සමඟ වාර 3 දක්වා නැවත උත්සාහ කරයි; බලන්න `scripts/translate_web_docs_batch.js` සහ `scripts/translate_web_docs_sync.js`.

ලේඛන සඳහා ස්ක්‍රීන්ෂොට්

- පින්තූර `website/static/img/` යටතේ සුරකින්න.
- මාර්ග අඩවියේ `baseUrl` සමඟ ක්‍රියාත්මක වීමට `useBaseUrl('/img/<filename>')` හරහා MD/MDX තුළ නම්දර්ශනය කරන්න.
- `website/static/img/` යටතේ පින්තූර එකතු/නැවත නම් කිරීමෙන් පසු, සියලු යොමු `useBaseUrl('/img/…')` භාවිත කරන බව සහ දේශීය preview එකකදී නිවැරදිව පෙන්වෙන බව තහවුරු කරන්න.
  Favicons

- बहු‑ප්‍රමාණ `favicon.ico` ස්වයංක්‍රීයව (Make + ස්ක්‍රිප්ට්) සියලු build මාර්ගවලදී ජනනය කරයි `website/scripts/build-favicon.mjs` හරහා.
- කිසිඳු මැනුවල් පියවරක් අවශ්‍ය නැත; `icon-*.png` යාවත්කාලීන කිරීම පමණක් ප්‍රමාණවත්.
  සමාලෝචනා ඉඟිය

- පරිවර්තිත ලේඛනවල front‑matter `id` නොවෙනස්ව තබාගන්න; තිබේ නම් `title` සහ `sidebar_label` පමණක් පරිවර්තනය කරන්න.

#### clean {#mt-clean}

- අරමුණ: දේශීය build/preview artifacts ඉවත් කිරීම.
- භාවිතය: `make clean`
- ඉවත් කරන්නේ (තිබේ නම්):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- අරමුණ: ආකෘතිකරණය, පරීක්ෂා, changelog යාවත්කාලීන, commit සහ push.
- භාවිතය: `make commit`
- විස්තර: Prettier (write), `make test`, `make test_i18n` ධාවනය කරයි; stage කළ වෙනස්කම් තිබේ නම් changelog එක එක් කරයි; `origin/<branch>` වෙත push කරයි.

---

#### eslint {#mt-eslint}

- අරමුණ: flat config හරහා ESLint ධාවනය.
- භාවිතය: `make eslint`

---

#### help {#mt-help}

- අරමුණ: එක් පේළි ලේඛන සමඟ සියලු ඉලක්ක ලැයිස්තුගත කිරීම.
- භාවිතය: `make help`

---

#### lint {#mt-lint}

- අරමුණ: `web-ext` භාවිතා කර MailExtension lint කිරීම.
- භාවිතය: `make lint`
- සටහන්: `sources/manifest_LOCAL.json` → `sources/manifest.json` ලෙස තාවකාලික පිටපත් කිරීම; build කළ ZIPs නොසලකා හරිනු ලැබේ; ඉඟි (warnings) මඟින් පයිප්ලයින් අසමත් නොවේ.

---

#### menu {#mt-menu}

- අරමුණ: Make ඉලක්කයක් සහ විකල්ප ආග්‍රහයන් තෝරාගැනීමට අන්තර්ක්‍රියාත්මක මෙනුව.
- භාවිතය: `make` තර්ක නොමැතිව ධාවනය කරන්න.
- සටහන්: `whiptail` නොමැතිව ඇත්නම්, මෙනුව `make help` වෙත වැටේ.

---

#### pack {#mt-pack}

- අරමුණ: ATN සහ LOCAL ZIPs සාදන්න (`lint` මත පදනම් වේ).
- භාවිතය: `make pack`
- ඉඟිය: ඇසුරුම් කිරීමට පෙර `sources/manifest_*.json` දෙකම තුළ අනුවාදය ඉහළ නංවන්න.

---

#### prettier {#mt-prettier}

- අරමුණ: ගබඩාව ස්ථානීයව ආකෘතිකරණය.
- භාවිතය: `make prettier`

#### prettier_check {#mt-prettier_check}

- අරමුණ: ආකෘතිකරණය සත්‍යාපනය (ලිවීමක් නැත).
- භාවිතය: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- අරමුණ: `prettier` සඳහා නාමාවලිය.
- භාවිතය: `make prettier_write`

---

#### test {#mt-test}

- අරමුණ: Prettier (write), ESLint, එවිට Vitest (ස්ථාපිත නම් ආවරණය).
- භාවිතය: `make test`

#### test_i18n {#mt-test_i18n}

- අරමුණ: ඇඩ්‑ඔන් වචන සහ වෙබ් ලේඛන සඳහා i18n‑කේන්ද්‍රගත පරීක්ෂා.
- භාවිතය: `make test_i18n`
- ධාවනය කරන්නේ: `npm run test:i18n` සහ `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- අරමුණ: යෙදුම් UI වචන EN වෙතින් අනෙකුත් භාෂාවලට පරිවර්තනය කිරීම.
- භාවිතය: `make translation_app OPTS="--locales all|de,fr"`
- සටහන්: යතුරු ව්‍යුහය සහ placeholders අකණ්ඩිතව තබාගනී; `translation_app.log` වෙත ලොග කරයි. ස්ක්‍රිප්ට් ආකාරය: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- අරමුණ: වෙබ් ලේඛන `website/docs/*.md` වෙතින් `website/i18n/<locale>/...` වෙත පරිවර්තනය කිරීම.
- අභිරුචිය: `translate_web_docs_batch` (OpenAI Batch API)
  - භාවිතය (ධ්වජ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - පූරණු ස්ථානික තත්ත්වය තවමත් පිළිගනී: `OPTS="<doc|all> <lang|all>"`
- හැසිරීම: JSONL සාදයි, උඩුගත කරයි, සෑම තත්පර 30 කටම පරීක්ෂා කරයි, ප්‍රතිඵල බාගත කර ගොනු ලියයි.
- සටහන: බෑච් කාර්යයක් සම්පූර්ණ වීමට පැය 24 දක්වා എടുക്കാം (OpenAI batch කවුළුව අනුව). සෑම පරීක්ෂාවකදීම console එකේ කාලය පෙන්වයි.
- Env: `OPENAI_API_KEY` (අවශ්‍යය), විකල්ප `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (පෙරනිමි 24h), `BATCH_POLL_INTERVAL_MS`.
- පුරුණු: `translate_web_docs_sync`
  - භාවිතය (ධ්වජ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - පූරණු ස්ථානික තත්ත්වය තවමත් පිළිගනී: `OPTS="<doc|all> <lang|all>"`
- හැසිරීම: සමුහීකරණය නොමැතිව එක්‑යුගල සමකාලීන ඉල්ලීම්.
- සටහන්: `OPTS` මඟහරිද්දී අන්තර්ක්‍රියාකාරී ප්‍රශ්න. මාර්ග දෙකම code blocks/inline code සුරකිමින් front‑matter `id` නොවෙනස් තබාගනී; `translation_web_batch.log` (batch) හෝ `translation_web_sync.log` (sync) වෙත ලොග කරයි.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- අරමුණ: වෙබ් අඩවි UI වචන (මුල්පිටුව, නැව්බාර්, පාදය) `website/i18n/en/code.json` වෙතින් `website/i18n/<locale>/code.json` යටතේ සියලු භාෂාවන්ට ( `en` හැර) පරිවර්තනය.
- භාවිතය: `make translate_web_index` හෝ `make translate_web_index OPTS="--locales de,fr [--force]"`
- අවශ්‍යතා: `OPENAI_API_KEY` export කිරීම (විකල්ප: `OPENAI_MODEL=gpt-4o-mini`).
- හැසිරීම: JSON ව්‍යුහය සත්‍යාපනය කරයි, වකුගඩු වරහන් placeholder සුරකියි, URL නොවෙනස් තබයි, තහවුරු කිරීමේ දෝෂවලදී ප්‍රතිපෝෂණ සමඟ නැවත උත්සාහ කරයි.

---

#### web_build {#mt-web_build}

- අරමුණ: ලේඛන අඩවිය `website/build` වෙත build කිරීම.
- භාවිතය: `make web_build OPTS="--locales en|de,en|all"` (හෝ `BUILD_LOCALES="en de"` සකස් කරන්න)
- අභ්‍යන්තර: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- ණය: `website/node_modules/@docusaurus` නොමැතිව ඇත්නම් පමණක් `website/` තුළ `npm ci` ධාවනය කරයි.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- අරමුණ: offline‑safe ලින්ක් තහවුරු කිරීම.
- භාවිතය: `make web_build_linkcheck OPTS="--locales en|all"`
- සටහන්: `tmp_linkcheck_web_pages` වෙත build කරයි; GH Pages `baseUrl` `/` බවට යළි ලියයි; දුරස්ථ HTTP(S) ලින්ක් මඟ හරයයි.

#### web_build_local_preview {#mt-web_build_local_preview}

- අරමුණ: විකල්ප පරීක්ෂා/ලින්ක්‑තහවුරු කිරීම සමඟ දේශීය gh‑pages preview.
- භාවිතය: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- හැසිරීම: පළමුව Node preview සේවාදායකය උත්සාහ කරයි (`scripts/preview-server.mjs`, `/__stop` සහය), අසමත් නම් `python3 -m http.server` වෙත වැටේ; 8080–8090 මත සේවය කරයි; PID `web-local-preview/.server.pid` හි.

#### web_push_github {#mt-web_push_github}

- අරමුණ: `website/build` `gh-pages` ශාඛාවට push කිරීම.
- භාවිතය: `make web_push_github`

ඉඟිය: Makefile භාවිත කරන පැකේජ කළමනාකරු අභිබවා යාමට `NPM=…` සකසන්න (පෙරනිමිය `npm`).
