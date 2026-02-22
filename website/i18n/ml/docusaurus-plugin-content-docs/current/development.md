---
id: development
title: 'വികസനം'
sidebar_label: 'വികസനം'
---

---

## വികസന മാർഗ്ഗദർശകം {#development-guide}

:::note ഇംഗ്ളീഷ് മാത്രം തിരുത്തുക; വിവർത്തനങ്ങൾ സ്വയമേവ പ്രചരിക്കും
പ്രമാണീകരണം **മാത്രം** `website/docs` (ഇംഗ്ലീഷ്) വിഭാഗത്തിൽ പുതുക്കുക. `website/i18n/<locale>/…` കീഴിലെ വിവർത്തനങ്ങൾ ജനറേറ്റ് ചെയ്തവയാണ്; കൈയോടെ തിരുത്തരുത്. ലokalized ഉള്ളടക്കം പുതുക്കാൻ വിവർത്തന ടാസ്കുകൾ (ഉദാ., `make translate_web_docs_batch`) ഉപയോഗിക്കുക.
:::

### മുൻ‌അവശ്യങ്ങൾ {#prerequisites}

- Node.js 22+യും npm ഉം (Node 22 ഉപയോഗിച്ച് പരിശോധിച്ചു)
- Thunderbird 128 ESR അല്ലെങ്കിൽ അതിനുശേഷമുള്ള പതിപ്പുകൾ (മാനുവൽ ടെസ്റ്റിംഗിനായി)

---

### പ്രോജക്ട് ലേയൗട്ട് (ഹൈ‑ലെവൽ) {#project-layout-high-level}

- Root: പാക്കേജിംഗ് സ്ക്രിപ്റ്റ് `distribution_zip_packer.sh`, ഡോക്സ്, സ്‌ക്രീൻഷോട്ടുകൾ
- `sources/`: പ്രധാന ആഡ്‑ഓൺ കോഡ് (ബാക്ക്ഗ്രൗണ്ട്, ഓപ്ഷൻസ്/പോപ്പ്‑അപ്പ് UI, മാനിഫെസ്റ്റുകൾ, ഐക്കണുകൾ)
- `tests/`: Vitest സ്യൂട്ട്
- `website/`: Docusaurus ഡോക്സ് (`website/i18n/de/...` കീഴിൽ i18n സഹിതം)

---

### ഇൻസ്റ്റാൾ & ടൂളിംഗ് {#install-and-tooling}

- Root ഡിപ്പുകൾ ഇൻസ്റ്റാൾ ചെയ്യുക: `npm ci`
- ഡോക്സ് (ഐച്ഛികം): `cd website && npm ci`
- ടാർഗറ്റുകൾ കണ്ടെത്തുക: `make help`

---

### ലൈവ് ഡെവ് (web‑ext run) {#live-dev-web-ext}

- Firefox ഡെസ്ക്ടോപ്പിൽ വേഗത്തിലുള്ള ലൂപ്പ് (UI സ്മോക്ക്‑ടെസ്റ്റുകൾ മാത്രം):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird‑ൽ പ്രവർത്തിക്കുക (MailExtensions‑ന് മുൻഗണന):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ടിപ്പുകൾ:
- Thunderbirdന്റെ Error Console തുറന്നിടുക (Tools → Developer Tools → Error Console).
- MV3 event പേജുകൾ നിര്ത്തപ്പെടാം (idle); കോഡ് മാറ്റങ്ങൾക്കുശേഷം ആഡ്‑ഓൺ റീലോഡ് ചെയ്യുക, അല്ലെങ്കിൽ web‑ext auto‑reload അനുവദിക്കുക.
- ചില Firefox‑മാത്രമുള്ള പെരുമാറ്റങ്ങൾ വ്യത്യസ്തമായിരിക്കാം; API parity ഉറപ്പാക്കാൻ എപ്പോഴും Thunderbird‑ൽ പരിശോധിക്കുക.
- Thunderbird ബൈനറി പാതകൾ (ഉദാഹരണങ്ങൾ):
- Linux: `thunderbird` (ഉദാ., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- പ്രൊഫൈൽ ഐസൊലേഷൻ: നിങ്ങളുടെ ദിനചര്യാ സജ്ജീകരണത്തെ ബാധിക്കാതിരിക്കാൻ ഡെവലപ്പ്മെന്റിനായി വേറെ ഒരു Thunderbird പ്രൊഫൈൽ ഉപയോഗിക്കുക.

---

### Make ടാർഗറ്റുകൾ (അക്ഷരമാലാക്രമത്തിൽ) {#make-targets-alphabetical}

Makefile സാധാരണ ഡെവ് പ്രവാഹങ്ങളെ സ്റ്റാൻഡേർഡൈസ് ചെയ്യുന്നു. ഓരോ ടാർഗറ്റിന്റെയും ഒരു വരി സംഗ്രഹം ലഭിക്കാൻ എപ്പോൾ വേണമെങ്കിലും `make help` പ്രവർത്തിപ്പിക്കുക.

ടിപ്പ്: ടാർഗറ്റ് നൽകാതെ `make` പ്രവർത്തിപ്പിക്കുമ്പോൾ ഒരു ലളിതമായ Whiptail മെനു തുറക്കും; അവിടെ നിന്ന് ടാർഗറ്റ് തിരഞ്ഞെടുക്കാം.

| ടാർഗറ്റ്                                                 | ഒരു വരി വിവരണം                                                                                 |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ലൊക്കൽ build/preview ആർട്ടിഫാക്ടുകൾ നീക്കം ചെയ്യുക (tmp/, web-local-preview/, website/build/). |
| [`commit`](#mt-commit)                                   | ഫോർമാറ്റ്, ടെസ്റ്റുകൾ (i18n ഉൾപ്പെടെ) നടത്തുക, changelog അപ്‌ഡേറ്റ് ചെയ്യുക, commit & push.    |
| [`eslint`](#mt-eslint)                                   | flat config (`npm run -s lint:eslint`) വഴി ESLint ഓടിക്കുക.                                    |
| [`help`](#mt-help)                                       | എല്ലാ ടാർഗറ്റുകളും ഒരു വരി ഡോക്സോടെ (സോർ‌ട്ട് ചെയ്ത്) ലിസ്റ്റ് ചെയ്യുക.                        |
| [`lint`](#mt-lint)                                       | `sources/` ൽ web‑ext lint (താൽക്കാലിക മാനിഫെസ്റ്റ്; ZIPs അവഗണിക്കുന്നു; non‑fatal).            |
| [`menu`](#mt-menu)                                       | ടാർഗറ്റ്, ഐച്ഛിക ആർഗ്യുമെന്റുകൾ എന്നിവ തിരഞ്ഞെടുക്കാനുള്ള ഇന്ററാക്ടീവ് മെനു.                   |
| [`pack`](#mt-pack)                                       | ATN & LOCAL ZIPs നിർമ്മിക്കുക (ലിന്റർ ഓടിക്കുന്നു; packer സ്ക്രിപ്റ്റ് വിളിക്കുന്നു).          |
| [`prettier`](#mt-prettier)                               | റീപോയെ ഇൻ‑പ്ലേസിൽ ഫോർമാറ്റ് ചെയ്യുക (മാറ്റങ്ങൾ എഴുതുന്നു).                                     |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check മോഡ് (എഴുത്തില്ല); റീഫോർമാറ്റ് വേണമെങ്കിൽ ഫെയിൽ ചെയ്യും.                        |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` ന്റെ അപരനാമം.                                                                       |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, ശേഷം Vitest (കോൺഫിഗർ ചെയ്താൽ കവറേജ്).                                |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑മാത്രം ടെസ്റ്റുകൾ: ആഡ്‑ഓൺ placeholders/parity + വെബ്സൈറ്റ് parity.                        |
| [`translate_app`](#mt-translation-app)                   | `translation_app` ന്റെ അപരനാമം.                                                                |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` നിന്ന് ആപ്പ് UI സ്ട്രിംഗുകൾ വിവർത്തനം ചെയ്യുക.             |
| [`translate_web_docs_batch`](#mt-translation-web)        | വെബ്സൈറ്റ് ഡോക്സ് OpenAI Batch API വഴി വിവർത്തനം ചെയ്യുക (മുൻഗണന).                             |
| [`translate_web_docs_sync`](#mt-translation-web)         | വെബ്സൈറ്റ് ഡോക്സ് സിങ്ക്രോണസ് ആയി വിവർത്തനം ചെയ്യുക (പഴയ, non-batch).                          |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` ന്റെ അപരനാമം.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | ഹോംപേജ്/നാവ്ബാർ/ഫൂട്ടർ UI വിവർത്തനം (`website/i18n/en/code.json → .../<lang>/code.json`).      |
| [`web_build`](#mt-web_build)                             | ഡോക്സ് `website/build` ആയി ബിൽഡ് ചെയ്യുക (`--locales` / `BUILD_LOCALES` പിന്തുണയ്‌ക്കുന്നു).   |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ഓഫ്‌ലൈൻ‑സേഫ് ലിങ്ക് ചെക്ക് (റിമോട്ട് HTTP[S] ഒഴിവാക്കുന്നു).                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ലൊക്കൽ gh‑pages preview; 8080–8090 ൽ auto‑serve; ഐച്ഛിക ടെസ്റ്റുകൾ/ലിങ്ക്‑ചെക്ക്.              |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` നെ `gh-pages` ബ്രാഞ്ചിലേക്ക് push ചെയ്യുക.                                     |

ഓപ്ഷൻസിന്റെ സിന്റാക്സ്

- ഓപ്ഷനുകൾ പാസ്സ് ചെയ്യാൻ `make <command> OPTS="…"` ഉപയോഗിക്കുക (quotes നിർദ്ദേശിക്കുന്നു). താഴെയുള്ള ഓരോ ടാർഗറ്റിലും ഉദാഹരണ ഉപയോഗം കാണാം.

--

-

#### ലോക്കേൽ ബിൽഡ് ടിപ്പുകൾ {#locale-build-tips}

- ഏതാനും ലോക്കേലുകൾ മാത്രം ബിൽഡ് ചെയ്യുക: `BUILD_LOCALES="en de"` സജ്ജമാക്കുക അല്ലെങ്കിൽ `OPTS="--locales en,de"` വെബ് ടാർഗറ്റുകൾക്ക് പാസ്സ് ചെയ്യുക.
- ഒരു പ്രത്യേക ലോക്കേൽ പ്രിവ്യൂ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### ബിൽഡ് & പാക്കേജ് {#build-and-package}

- ZIPs നിർമ്മിക്കുക: `make pack`
- റിപ്പോ റൂട്ടിൽ ATN, LOCAL ZIPs ഉൽപ്പാദിപ്പിക്കുന്നു (ആർട്ടിഫാക്ടുകൾ കൈയോടെ തിരുത്തരുത്)
- ടിപ്പ്: പാക്കേജിംഗിന് മുമ്പ് `sources/manifest_ATN.json` וגם `sources/manifest_LOCAL.json` യിലെ വേർഷൻ അപ്‌ഡേറ്റ് ചെയ്യുക
- മാനുവൽ ഇൻസ്റ്റാൾ (ഡെവ്): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → നിർമ്മിച്ച ZIP തിരഞ്ഞെടുക്കുക

---

### ടെസ്റ്റ് {#test}

- ഫുൾ സ്യൂട്ട്: `make test` (Vitest)
- കവറേജ് (ഐച്ഛികം):
- `npm i -D @vitest/coverage-v8`
- `make test` ഓടിക്കുക; HTML റിപ്പോർട്ടിന് `coverage/index.html` തുറക്കുക
- i18n മാത്രം: `make test_i18n` (UI keys/placeholders/titles + വെബ്സൈറ്റ് per‑locale per‑doc parity; id/title/sidebar_label പരിശോധനകൾ സഹിതം)

---

### ഡിബഗിംഗ് & ലോഗുകൾ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- റൺടൈമിൽ*verbose* ലോഗുകൾ ടോഗിൾ ചെയ്യുക:
- Enable: `messenger.storage.local.set({ debug: true })`
- Disable: `messenger.storage.local.set({ debug: false })`
- പ്രതികരണങ്ങൾ കമ്പോസ്/അയക്കുന്ന സമയത്ത് ലോഗുകൾ പ്രത്യക്ഷപ്പെടും

---

### ഡോക്സ് (വെബ്സൈറ്റ്) {#docs-website}

- ഡെവ് സർവർ: `cd website && npm run start`
- സ്റ്റാറ്റിക് സൈറ്റ് ബിൽഡ്: `cd website && npm run build`
- Make സമാനങ്ങൾ (അക്ഷരമാലാക്രമത്തിൽ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ഉപയോഗ ഉദാഹരണങ്ങൾ:
- EN മാത്രം, ടെസ്റ്റുകൾ/ലിങ്ക്‑ചെക്ക് സ്‌കിപ്പ്, push ഇല്ല: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- എല്ലാ ലോക്കേലുകളും, ടെസ്റ്റുകൾ/ലിങ്ക്‑ചെക്ക് സഹിതം, ശേഷം push: `make web_build_local_preview && make web_push_github`
- പ്രസിദ്ധീകരിക്കുന്നതിനു മുമ്പ് ഓഫ്‌ലൈൻ‑സേഫ് ലിങ്ക് ചെക്ക് ഓടിക്കുക: `make web_build_linkcheck`.
- i18n: ഇംഗ്ലീഷ് `website/docs/*.md` ൽ; ജർമ്മൻ വിവർത്തനങ്ങൾ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ൽ
- തിരയൽ: CI ൽ Algolia DocSearch env വേരിയബിളുകൾ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) സജ്ജമാക്കിയാൽ, സൈറ്റ് Algolia search ഉപയോഗിക്കും; അല്ലാത്തപക്ഷം ലോക്കൽ search ലേക്ക് തിരിഞ്ഞുപോകും. ഹോംപേജിൽ `/` അല്ലെങ്കിൽ `Ctrl+K` അമർത്തി സെർച്ച് ബോക്സ് തുറക്കാം.

---

#### ദാനം റീഡയറക്റ്റ് റൂട്ട് {#donate-redirect}

- `website/src/pages/donate.js`
- റൂട്ട്: `/donate` (കൂടാതെ `/<locale>/donate`)
- പ്രവർത്തനം:
- നിലവിലെ റൂട്ടിന് ഒരു ലോക്കേൽ ഉണ്ടെങ്കിൽ (ഉദാ., `/de/donate`), അത് ഉപയോഗിക്കുക
- അല്ലാത്തപക്ഷം, `navigator.languages` നെ കോൺഫിഗർ ചെയ്ത ലോക്കേലുകളുമായി താരതമ്യം ചെയ്ത് മികച്ച പൊരുത്തം തിരഞ്ഞെടുക്കുക; ഇല്ലെങ്കിൽ ഡിഫോൾട്ട് ലോക്കേലിലേക്ക് ഫോൾബാക്ക്
- Redirects to:
- `en` → `/docs/donation`
- മറ്റുള്ളവ → `/<locale>/docs/donation`
- ശരിയായ baseUrl ഹാൻഡ്ലിംഗിനായി `useBaseUrl` ഉപയോഗിക്കുന്നു
- ഫാൾബാക്കായി meta refresh + `noscript` ലിങ്ക് ഉൾപ്പെടുന്നു

---

---

#### പ്രിവ്യൂ ടിപ്പുകൾ {#preview-tips}

- Node preview നല്ലപോലെ നിർത്തുക: `http://localhost:<port>/__stop` തുറക്കുക (`Local server started` കഴിഞ്ഞ് പ്രിന്റ് ചെയ്യുന്നു).
- MDX/JSX ൽ ചിത്രങ്ങൾ ലോഡ് ചെയ്യാത്ത പക്ഷം, സൈറ്റിന്റെ `baseUrl` മാനിക്കാൻ `useBaseUrl('/img/...')` ഉപയോഗിക്കുക.
- പ്രിവ്യൂ ആദ്യം ആരംഭിക്കും; ലിങ്ക് ചെക്ക് പിന്നാലെ ഓടും, non‑blocking ആണ് (പൊട്ടിയ എക്സ്റ്റേണൽ ലിങ്കുകൾ പ്രിവ്യൂ നിർത്തുകയില്ല).
- ഉദാഹരണ പ്രിവ്യൂ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” കഴിഞ്ഞ് പ്രിന്റ് ചെയ്യും).
- ലിങ്ക്‑ചെക്കിലെ എക്സ്റ്റേണൽ ലിങ്കുകൾ: ചില എക്സ്റ്റേണൽ സൈറ്റുകൾ (ഉദാ., addons.thunderbird.net) ഓട്ടോമേറ്റഡ് ക്രോളറുകളെ ബ്ലോക്ക് ചെയ്യുകയും ലിങ്ക് ചെക്കിൽ 403 കാണിക്കുകയും ചെയ്യും. പ്രിവ്യൂ എങ്കിലും ആരംഭിക്കും; ഇവ അവഗണിക്കാവുന്നതാണ്.

---

#### വെബ്സൈറ്റ് വിവർത്തനം ചെയ്യുക {#translate-website}

താങ്കൾക്ക് വിവർത്തനം ചെയ്യാവുന്നത്

- Website UI മാത്രം: ഹോംപേജ്, നാവ്ബാർ, ഫുട്ടർ, മറ്റു UI സ്ട്രിംഗുകൾ. ഡോക്സ് ഉള്ളടക്കം ഇപ്പോൾ ഇംഗ്ലീഷ്‑മാത്രം തുടരും.

എവിടെ എഡിറ്റ് ചെയ്യാം

- `website/i18n/<locale>/code.json` എഡിറ്റ് ചെയ്യുക (`en` നെ റഫറൻസായി ഉപയോഗിക്കുക). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` പോലെയുള്ള placeholders മാറ്റരുത്.

ഫയലുകൾ സൃഷ്ടിക്കുക അല്ലെങ്കിൽ പുതുക്കുക

- എല്ലാ ലോക്കേലുകൾക്കും ഇല്ലാത്ത stubs സൃഷ്ടിക്കുക: `npm --prefix website run i18n:stubs`
- ഇംഗ്ലീഷിൽ നിന്ന് stubs ഓവർറൈറ്റ് ചെയ്യുക (പുതിയ സ്ട്രിംഗുകൾ ചേർത്തതിന് ശേഷം): `npm --prefix website run i18n:stubs:force`
- ഒരു ലോക്കേലിനുള്ള বিকൽപ്പം: `npx --prefix website docusaurus write-translations --locale <locale>`

ഹോംപേജ്/നാവ്ബാർ/ഫൂട്ടർ UI സ്ട്രിംഗുകൾ വിവർത്തനം ചെയ്യുക (OpenAI)

- ക്രെഡൻഷ്യലുകൾ ഒരിക്കൽ സജ്ജമാക്കുക (shell അല്ലെങ്കിൽ .env):
- `export OPENAI_API_KEY=sk-...`
- ഐച്ഛികം: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (എല്ലാ ലോക്കേലുകളും, en സ്‌കിപ്പ്): `make translate_web_index`
- പ്രത്യേക ലോക്കേലുകൾക്ക് പരിധിയിടുക: `make translate_web_index OPTS="--locales de,fr"`
- നിലവിലുള്ള മൂല്യങ്ങൾ ഓവർറൈറ്റ് ചെയ്യുക: `make translate_web_index OPTS="--force"`

സാധുതയും വീണ്ടും ശ്രമിക്കലും

- വിവർത്തന സ്ക്രിപ്റ്റ് JSON രൂപം സാധൂകരിക്കുന്നു, curly‑brace placeholders സംരക്ഷിക്കുന്നു, URLs മാറ്റമില്ലാതെ തുടരാൻ ഉറപ്പാക്കുന്നു.
- വാലിഡേഷൻ പരാജയപ്പെട്ടാൽ, നിലവിലുള്ള മൂല്യങ്ങൾ നിലനിർത്തുന്നതിന് മുമ്പ് 2 തവണ വരെ ഫീഡ്ബാക്കോടെ വീണ്ടും ശ്രമിക്കുന്നു.

താങ്കളുടെ ലോക്കേൽ പ്രിവ്യൂ ചെയ്യുക

- ഡെവ് സർവർ: `npm --prefix website run start`
- സന്ദർശിക്കുക `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

സമർപ്പിക്കൽ

- എഡിറ്റ് ചെയ്ത `code.json` ഫയൽ(കൾ) സഹിതം ഒരു PR തുറക്കുക. മാറ്റങ്ങൾ കേന്ദ്രീകരിച്ച് വയ്ക്കുക; കഴിയുന്നുവെങ്കിൽ ഒരു പെട്ടെന്ന് സ്ക്രീൻഷോട്ട് ചേർക്കുക.

---

### സുരക്ഷ & കോൺഫിഗറേഷൻ ടിപ്പുകൾ {#security-and-configuration-tips}

- `sources/manifest.json` commit ചെയ്യരുത് (ബിൽഡ് താൽക്കാലികമായി സൃഷ്ടിക്കുന്നു)
- അപ്‌ഡേറ്റ് ചാനൽ സംരക്ഷിക്കാൻ `browser_specific_settings.gecko.id` സ്ഥിരമായി നിലനിർത്തുക

---

### സജ്ജീകരണങ്ങളുടെ സ്ഥിരത {#settings-persistence}

- സ്റ്റോറേജ്: എല്ലാ യൂസർ സജ്ജീകരണങ്ങളും `storage.local` ൽ സൂക്ഷിക്കപ്പെടുന്നു, ആഡ്‑ഓൺ അപ്‌ഡേറ്റുകളിലൂടെയും നിലനിർത്തുന്നു.
- ഇൻസ്റ്റാൾ: ഒരു കീ യഥാർത്ഥത്തിൽ ഇല്ലെങ്കിൽ (undefined) മാത്രമേ ഡിഫോൾട്ടുകൾ പ്രയോഗിക്കൂ.
- അപ്‌ഡേറ്റ്: മൈഗ്രേഷൻ ഇല്ലാത്ത കീകൾ മാത്രം നിറക്കും; നിലവിലുള്ള മൂല്യങ്ങൾ ഒരിക്കലും ഓവർറൈറ്റ് ചെയ്യില്ല.
- സ്കീമ മാർക്കർ: `settingsVersion` (ഇപ്പോൾ `1`).
- കീകളും ഡിഫോൾട്ടുകളും:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- കോഡ്: `sources/background.js` → `initializeOrMigrateSettings()` мөн `SCHEMA_VERSION` കാണുക.

ഡെവ് വർക്ഫ്ലോ (ഒരു പുതിയ സജ്ജീകരണം ചേർക്കുന്നത്)

- `sources/background.js` ൽ `SCHEMA_VERSION` ബമ്പ് ചെയ്യുക.
- പുതിയ കീ + ഡിഫോൾട്ട് `initializeOrMigrateSettings()` ലെ `DEFAULTS` ഒബ്ജക്റ്റിൽ ചേർക്കുക.
- ഡിഫോൾട്ടുകൾ വിത്തിടുമ്പോൾ "only-if-undefined" നിയമം ഉപയോഗിക്കുക; നിലവിലുള്ള മൂല്യങ്ങൾ ഓവർറൈറ്റ് ചെയ്യരുത്.
- സജ്ജീകരണം യൂസർ‑വിശിബിൾ ആണെങ്കിൽ, `sources/options.js` ൽ വയർ ചെയ്യുക, localized സ്ട്രിംഗുകൾ ചേർക്കുക.
- ടെസ്റ്റുകൾ ചേർക്കുക/ചട്ടക്കൂടുകൾ ക്രമീകരിക്കുക (`tests/background.settings.migration.test.js` കാണുക).

മാനുവൽ ടെസ്റ്റിംഗ് ടിപ്പുകൾ

- ഫ്രെഷ് ഇൻസ്റ്റാൾ സിമുലേറ്റ് ചെയ്യുക: എക്സ്റ്റൻഷന്റെ ഡാറ്റ ഡയറക്ടറി ക്ലിയർ ചെയ്യുക അല്ലെങ്കിൽ പുതിയ ഒരു പ്രൊഫൈലിൽ ആരംഭിക്കുക.
- അപ്‌ഡേറ്റ് സിമുലേറ്റ് ചെയ്യുക: `storage.local` ൽ `settingsVersion` നെ `0` ആയി സജ്ജമാക്കി റീലോഡ് ചെയ്യുക; നിലവിലുള്ള മൂല്യങ്ങൾ മാറ്റമില്ലാതെ തുടരുന്നതും ഇല്ലാത്ത കീകൾ മാത്രം ചേർക്കുന്നതും സ്ഥിരീകരിക്കുക.

---

### പ്രശ്‌നപരിഹാരം {#troubleshooting}

- Thunderbird 128 ESR അല്ലെങ്കിൽ പുതിയത് ഉറപ്പാക്കുക
- റൺടൈം പ്രശ്നങ്ങൾക്കായി Error Console ഉപയോഗിക്കുക
- സംഭരിച്ച സജ്ജീകരണങ്ങൾ ശരിയായി പ്രയോഗിക്കാത്തപോലെ തോന്നുന്നുവെങ്കിൽ, Thunderbird റീസ്റ്റാർട്ട് ചെയ്ത് വീണ്ടും ശ്രമിക്കുക. (Thunderbird സെഷനുകൾക്കിടയിൽ സ്റ്റേറ്റ് ക്യാഷ് ചെയ്യാം; റീസ്റ്റാർട്ട് പുതിയ സജ്ജീകരണങ്ങൾ ശരിയായി ലോഡ് ചെയ്യുന്നത് ഉറപ്പാക്കും.)

---

### CI & കവറേജ് {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest കവറേജ് thresholds (85% lines/functions/branches/statements) സഹിതം ഓടിക്കുന്നു. thresholds പാലിക്കാത്തപക്ഷം ജോബ് ഫെയിൽ ചെയ്യും.
- വർക്ഫ്ലോ HTML റിപ്പോർട്ടോടുകൂടി `coverage-html` എന്ന ആർട്ടിഫാക്ട് അപ്‌ലോഡ് ചെയ്യും; റൺ പേജിൽ നിന്ന് അത് ഡൗൺലോഡ് ചെയ്യുക (Actions → latest run → Artifacts).

---

### സംഭാവനകൾ {#contributing}

- ബ്രാഞ്ച്/കമിറ്റ്/PR മാർഗ്ഗനിർദേശങ്ങൾക്ക് CONTRIBUTING.md കാണുക
- ടിപ്പ്: നിങ്ങളുടെ ഡെയിലി പ്രൊഫൈലിനെ ബാധിക്കാതിരിക്കാൻ ടെസ്റ്റിംഗിനായി വേറെ ഒരു Thunderbird ഡെവലപ്മെന്റ് പ്രൊഫൈൽ സൃഷ്ടിക്കുക.

---

### വിവർത്തനങ്ങൾ

- വലുതായ “all → all” വിവർത്തന ജോബുകൾ നെല്ലെയാണ്, ചെലവേറും കൂടിയാകാം. ആദ്യം ഒരു subset (ഉദാ., കുറച്ച് ഡോക്സും 1–2 ലോക്കേലുകളും) കൊണ്ട് തുടങ്ങി, ഫലങ്ങൾ അവലോകനം ചെയ്ത് തുടർന്ന് വ്യാപിപ്പിക്കുക.

---

- Retry നയം: വിവർത്തന ജോബുകൾ API പിശകുകളിൽ 3 തവണവരെ exponential backoff സഹിതം വീണ്ടും ശ്രമിക്കും; `scripts/translate_web_docs_batch.js` мөн `scripts/translate_web_docs_sync.js` കാണുക.

ഡോക്സിനുള്ള സ്ക്രീൻഷോട്ടുകൾ

- ചിത്രങ്ങൾ `website/static/img/` കീഴിൽ സൂക്ഷിക്കുക.
- അവയെ MD/MDX ൽ `useBaseUrl('/img/<filename>')` വഴി റഫർ ചെയ്യുക, അതുവഴി പാത്തുകൾ സൈറ്റിന്റെ `baseUrl` ഒപ്പം പ്രവർത്തിക്കും.
- `website/static/img/` കീഴിൽ ചിത്രങ്ങൾ ചേർത്തതിനുശേഷം അല്ലെങ്കിൽ പുനർനാമകരണം ചെയ്തതിനു ശേഷം, എല്ലാം ഇപ്പോഴും `useBaseUrl('/img/…')` ഉപയോഗിക്കുന്നുവെന്നും ലൊക്കൽ പ്രിവ്യൂയിൽ റെൻഡർ ചെയ്യുന്നുവെന്നും സ്ഥിരീകരിക്കുക.
  Favicons

- മൾട്ടി‑സൈസ് `favicon.ico` എല്ലാ ബിൽഡ് പാതകളിലും (Make + സ്ക്രിപ്റ്റുകൾ) `website/scripts/build-favicon.mjs` വഴി ഓട്ടോമാറ്റിക്കായി നിർമ്മിക്കപ്പെടുന്നു.
- മാനുവൽ ഘട്ടം ഒന്നും ആവശ്യമില്ല; `icon-*.png` അപ്‌ഡേറ്റ് ചെയ്താൽ മതി.
  റിവ്യൂ ടിപ്പ്

- വിവർത്തനം ചെയ്ത ഡോക്സുകളിൽ front‑matter `id` മാറ്റരുത്; ഉണ്ടായാൽ `title` мөн `sidebar_label` മാത്രം വിവർത്തനം ചെയ്യുക.

#### clean {#mt-clean}

- ഉദ്ദേശ്യം: ലൊക്കൽ build/preview ആർട്ടിഫാക്ടുകൾ നീക്കംചെയ്യുക.
- ഉപയോഗം: `make clean`
- നീക്കം ചെയ്യുന്നത് (ഉണ്ടെങ്കിൽ):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ഉദ്ദേശ്യം: ഫോർമാറ്റ്, ടെസ്റ്റ്, changelog അപ്‌ഡേറ്റ്, commit, push.
- ഉപയോഗം: `make commit`
- വിശദാംശങ്ങൾ: Prettier (write), `make test`, `make test_i18n` ഓടിക്കുന്നു; staged diffs ഉള്ളപ്പോൾ changelog ചേർക്കുന്നു; `origin/<branch>` ലേക്ക്*push* ചെയ്യുന്നു.

---

#### eslint {#mt-eslint}

- ഉദ്ദേശ്യം: flat config വഴി ESLint ഓടിക്കുക.
- ഉപയോഗം: `make eslint`

---

#### help {#mt-help}

- ഉദ്ദേശ്യം: എല്ലാ ടാർഗറ്റുകളും ഒരു വരി ഡോക്സോടെ ലിസ്റ്റ് ചെയ്യുക.
- ഉപയോഗം: `make help`

---

#### lint {#mt-lint}

- ഉദ്ദേശ്യം: `web-ext` ഉപയോഗിച്ച് MailExtension ലിന്റ് ചെയ്യുക.
- ഉപയോഗം: `make lint`
- കുറിപ്പുകൾ: `sources/manifest_LOCAL.json` → `sources/manifest.json` താൽക്കാലികമായി പകർത്തുന്നു; നിർമ്മിച്ച ZIPs അവഗണിക്കുന്നു; മുന്നറിയിപ്പുകൾ*pipeline* ഫെയിൽ ആക്കുകയില്ല.

---

#### menu {#mt-menu}

- ഉദ്ദേശ്യം: Make ടാർഗറ്റ്, ഐച്ഛിക ആർഗ്യുമെന്റുകൾ എന്നിവ തിരഞ്ഞെടുക്കാനുള്ള ഇന്ററാക്ടീവ് മെനു.
- ഉപയോഗം: ആർഗ്യുമെന്റുകളൊന്നുമില്ലാതെ `make` ഓടിക്കുക.
- കുറിപ്പുകൾ: `whiptail` ലഭ്യമല്ലെങ്കിൽ, മെനു `make help` ലേക്ക് ഫോൾബാക്ക് ചെയ്യും.

---

#### pack {#mt-pack}

- ഉദ്ദേശ്യം: ATN, LOCAL ZIPs നിർമ്മിക്കുക (`lint` ആശ്രയിക്കുന്നു).
- ഉപയോഗം: `make pack`
- ടിപ്പ്: പാക്കേജിംഗിന് മുമ്പ് `sources/manifest_*.json` ഇരട്ടത്തിലും വേർഷൻ ബമ്പ് ചെയ്യുക.

---

#### prettier {#mt-prettier}

- ഉദ്ദേശ്യം: റീപോ ഇൻ‑പ്ലേസിൽ ഫോർമാറ്റ് ചെയ്യുക.
- ഉപയോഗം: `make prettier`

#### prettier_check {#mt-prettier_check}

- ഉദ്ദേശ്യം: ഫോർമാറ്റിംഗ് പരിശോധിക്കുക (എഴുത്തില്ല).
- ഉപയോഗം: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ഉദ്ദേശ്യം: `prettier` ന്റെ അപരനാമം.
- ഉപയോഗം: `make prettier_write`

---

#### test {#mt-test}

- ഉദ്ദേശ്യം: Prettier (write), ESLint, ശേഷം Vitest (ഇൻസ്റ്റാൾ ചെയ്താൽ കവറേജ്).
- ഉപയോഗം: `make test`

#### test_i18n {#mt-test_i18n}

- ഉദ്ദേശ്യം: ആഡ്‑ഓൺ സ്ട്രിംഗുകൾക്കും വെബ്സൈറ്റ് ഡോക്സുകൾക്കും i18n‑കേന്ദ്രീകൃത ടെസ്റ്റുകൾ.
- ഉപയോഗം: `make test_i18n`
- ഓടിക്കുന്നത്: `npm run test:i18n` мөн `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- ഉദ്ദേശ്യം: EN നിന്ന് മറ്റു ലോക്കേലുകളിലേക്ക് ആഡ്‑ഓൺ UI സ്ട്രിംഗുകൾ വിവർത്തനം ചെയ്യുക.
- ഉപയോഗം: `make translation_app OPTS="--locales all|de,fr"`
- കുറിപ്പുകൾ: കീ ഘടനയും placeholders ഉം സംരക്ഷിക്കുന്നു; `translation_app.log` ലേക്ക് ലോഗ് ചെയ്യുന്നു. സ്ക്രിപ്റ്റ് രൂപം: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ഉദ്ദേശ്യം: വെബ്സൈറ്റ് ഡോക്സ് `website/docs/*.md` നിന്ന് `website/i18n/<locale>/...` ആയി വിവർത്തനം ചെയ്യുക.
- മുൻഗണന: `translate_web_docs_batch` (OpenAI Batch API)
  - ഉപയോഗം (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - പഴയ positional ഇന്നും സ്വീകരിക്കുന്നു: `OPTS="<doc|all> <lang|all>"`
- പെരുമാറ്റം: JSONL നിർമിക്കുന്നു, അപ്പ്‌ലോഡ് ചെയ്യുന്നു, ഓരോ 30s നും poll ചെയ്യുന്നു, ഫലങ്ങൾ ഡൗൺലോഡ് ചെയ്യുന്നു, ഫയലുകൾ എഴുതുന്നു.
- കുറിപ്പ്: ഒരു batch ജോബ് പൂർത്തിയാക്കാൻ 24 മണിക്കൂർ വരെ എടുക്കാം (OpenAIയുടെ batch window അനുസരിച്ച്). ഓരോ poll ലും കോൺസോൾ*elapsed time* കാണിക്കും.
- Env: `OPENAI_API_KEY` (അവശ്യവും), ഐച്ഛികം `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ഡിഫോൾട്ട് 24h), `BATCH_POLL_INTERVAL_MS`.
- പഴയത്: `translate_web_docs_sync`
  - ഉപയോഗം (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - പഴയ positional ഇന്നും സ്വീകരിക്കുന്നു: `OPTS="<doc|all> <lang|all>"`
- പെരുമാറ്റം: synchronous per‑pair അഭ്യർത്ഥനകൾ (batch aggregation ഇല്ല).
- കുറിപ്പുകൾ: `OPTS` ഒഴിവാക്കിയാൽ ഇന്ററാക്ടീവ് prompts. ഇരു മോഡുകളും code blocks/inline code സംരക്ഷിക്കുകയും front‑matter `id` മാറ്റമൊന്നുമില്ലാതെ നിലനിർത്തുകയും ചെയ്യും; ലോഗിംഗ് `translation_web_batch.log` (batch) അല്ലെങ്കിൽ `translation_web_sync.log` (sync) ലേക്ക്.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ഉദ്ദേശ്യം: വെബ്സൈറ്റ് UI സ്ട്രിംഗുകൾ (ഹോംപേജ്, നാവ്ബാർ, ഫൂട്ടർ) `website/i18n/en/code.json` നിന്ന് `website/i18n/<locale>/code.json` കീഴിലെ എല്ലാ ലോക്കേലുകളിലേക്കും ( `en` ഒഴിവാക്കി) വിവർത്തനം ചെയ്യുക.
- ഉപയോഗം: `make translate_web_index` അല്ലെങ്കിൽ `make translate_web_index OPTS="--locales de,fr [--force]"`
- ആവശ്യകതകൾ: `OPENAI_API_KEY` export ചെയ്യുക (ഐച്ഛികം: `OPENAI_MODEL=gpt-4o-mini`).
- പെരുമാറ്റം: JSON ഘടന സാധൂകരിക്കുന്നു, curly‑brace placeholders സംരക്ഷിക്കുന്നു, URLs മാറ്റമില്ലാതെ സൂക്ഷിക്കുന്നു, വാലിഡേഷൻ പിശകുകളിൽ ഫീഡ്ബാക്കോടെ വീണ്ടും ശ്രമിക്കുന്നു.

---

#### web_build {#mt-web_build}

- ഉദ്ദേശ്യം: ഡോക്സ് സൈറ്റ് `website/build` ആയി ബിൽഡ് ചെയ്യുക.
- ഉപയോഗം: `make web_build OPTS="--locales en|de,en|all"` (അല്ലെങ്കിൽ `BUILD_LOCALES="en de"` സജ്ജമാക്കുക)
- ഇൻറേണൽസ്: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- ആശ്രിതങ്ങൾ: `website/node_modules/@docusaurus` ഇല്ലെങ്കിൽ മാത്രമേ `website/` ൽ `npm ci` ഓടിക്കൂ.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ഉദ്ദേശ്യം: ഓഫ്‌ലൈൻ‑സേഫ് ലിങ്ക് ചെക്ക്.
- ഉപയോഗം: `make web_build_linkcheck OPTS="--locales en|all"`
- കുറിപ്പുകൾ: `tmp_linkcheck_web_pages` ആയി ബിൽഡ് ചെയ്യുന്നു; GH Pages `baseUrl` നെ `/` ആയി പുനർ‌ലെഖനം ചെയ്യുന്നു; റിമോട്ട് HTTP(S) ലിങ്കുകൾ സ്‌കിപ്പ് ചെയ്യുന്നു.

#### web_build_local_preview {#mt-web_build_local_preview}

- ഉദ്ദേശ്യം: ഐച്ഛിക ടെസ്റ്റുകൾ/ലിങ്ക്‑ചെക്ക് ഉള്ള ലൊക്കൽ gh‑pages പ്രിവ്യൂ.
- ഉപയോഗം: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- പെരുമാറ്റം: ആദ്യം Node preview സർവർ ശ്രമിക്കുന്നു (`scripts/preview-server.mjs`, `/__stop` പിന്തുണയ്‌ക്കുന്നു), ശേഷം `python3 -m http.server` ലേക്ക് ഫോൾബാക്ക്; 8080–8090 ൽ സർവ് ചെയ്യും; PID `web-local-preview/.server.pid` ൽ.

#### web_push_github {#mt-web_push_github}

- ഉദ്ദേശ്യം: `website/build` നെ `gh-pages` ബ്രാഞ്ചിലേക്ക് push ചെയ്യുക.
- ഉപയോഗം: `make web_push_github`

ടിപ്പ്: Makefile ഉപയോഗിക്കുന്ന പാക്കേജ് മാനേജറെ*override* ചെയ്യാൻ `NPM=…` സജ്ജമാക്കുക (ഡിഫോൾട്ട് `npm`).
