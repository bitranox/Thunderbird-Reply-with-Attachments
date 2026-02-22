---
id: development
title: 'ବିକାଶ'
sidebar_label: 'ବିକାଶ'
---

---

## ବିକାଶ ଗାଇଡ୍ {#development-guide}

:::note କେବଳ ଇଂରାଜୀ ସମ୍ପାଦନ; ଅନୁବାଦଗୁଡିକ ପ୍ରସାରିତ ହୁଏ
ଡକ୍ୟୁମେଣ୍ଟେସନକୁ କେବଳ `website/docs` (ଇଂରାଜୀ) ତଳେ ଅପଡେଟ୍ କରନ୍ତୁ। `website/i18n/<locale>/…` ତଳେ ଥିବା ଅନୁବାଦଗୁଡିକ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଉତ୍ପାଦିତ, ହାତେ ସମ୍ପାଦନ କରିବେ ନାହିଁ। ଲୋକାଲାଇଜ୍ଡ କନ୍ଟେଣ୍ଟ ରିଫ୍ରେଶ ପାଇଁ ଟ୍ରାନ୍ସଲେସନ୍ ଟାସ୍କ (ଉଦାହରଣ, `make translate_web_docs_batch`) ବ୍ୟବହାର କରନ୍ତୁ।
:::

### ପୂର୍ବାବଶ୍ୟକତା {#prerequisites}

- Node.js 22+ ଏବଂ npm (Node 22 ସହିତ ପରୀକ୍ଷିତ)
- Thunderbird 128 ESR କିମ୍ବା ତାହାଠାରୁ ନୂତନ (ହାତଚାଳିତ ପରୀକ୍ଷା ପାଇଁ)

---

### ପ୍ରକଳ୍ପ ବ୍ୟବସ୍ଥାପନ (ଉଚ୍ଚ‑ସ୍ତର) {#project-layout-high-level}

- Root: ପ୍ୟାକେଜିଙ୍ଗ ସ୍କ୍ରିପ୍ଟ `distribution_zip_packer.sh`, ଡକ୍ସ, ସ୍କ୍ରିନଶଟ୍
- `sources/`: ମୁଖ୍ୟ ଅଡଅନ୍ କୋଡ୍ (ପୃଷ୍ଠଭୂମି, ବିକଳ୍ପ/ପପଅପ୍ UI, ମ୍ୟାନିଫେଷ୍ଟ, ଆଇକନ୍)
- `tests/`: Vitest ସ୍ୱିଟ୍
- `website/`: Docusaurus ଡକ୍ସ (i18n `website/i18n/de/...` ତଳେ)

---

### ଇନ୍ସ୍ଟଲ୍ ଏବଂ ଟୁଲିଙ୍ଗ {#install-and-tooling}

- Root ନିର୍ଭରତା ଇନ୍ସ୍ଟଲ୍: `npm ci`
- ଡକ୍ସ (ଇଚ୍ଛାଧୀନ): `cd website && npm ci`
- ଟାର୍ଗେଟ୍‌ଗୁଡିକ ଖୋଜନ୍ତୁ: `make help`

---

### ଲାଇଭ୍ ଡେଭ୍ (web‑ext run) {#live-dev-web-ext}

- Firefox ଡେସ୍କଟପ୍‌ରେ ଦ୍ରୁତ ଲୁପ୍ (କେବଳ UI ସ୍ମୋକ୍‑ଟେଷ୍ଟ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird ରେ ଚାଳନ (MailExtensions ପାଇଁ ପସନ୍ଦିତ):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ଟିପ୍ସ:
- Thunderbird ର Error Console ଖୋଲା ରଖନ୍ତୁ (Tools → Developer Tools → Error Console)।
- MV3 ଇଭେଣ୍ଟ ପେଜଗୁଡିକ ନିଷ୍କ୍ରିୟ ସମୟରେ ସସ୍ପେଣ୍ଡ ହୁଏ; କୋଡ୍ ପରିବର୍ତ୍ତନ ପରେ ଅଡଅନ୍‌କୁ ରିଲୋଡ୍ କରନ୍ତୁ, କିମ୍ବା web‑ext କୁ ଆପୋ‑ରିଲୋଡ୍ ହେବାକୁ ଦିଅନ୍ତୁ।
- କେତେକ କେବଳ Firefox ବ୍ୟବହାର ଭିନ୍ନ ହୋଇପାରେ; API ସମତା ପାଇଁ ସଦା Thunderbird ରେ ଯାଞ୍ଚ କରନ୍ତୁ।
- Thunderbird ବାଇନେରୀ ପଥ (ଉଦାହରଣ):
- Linux: `thunderbird` (ଉଦାହରଣ ସ୍ୱରୂପ, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ପ୍ରୋଫାଇଲ୍ ଆଇସୋଲେସନ୍: ଆପଣଙ୍କ ଦୈନିକ ସେଟଅପ୍‌ରେ ପ୍ରଭାବ ପକାଇବା ଏଠାରୁ ରକ୍ଷା ପାଇଁ ବିକାଶ ପାଇଁ ଅଲଗା Thunderbird ପ୍ରୋଫାଇଲ୍ ବ୍ୟବହାର କରନ୍ତୁ।

---

### Make ଟାର୍ଗେଟ୍‌ଗୁଡିକ (ବର୍ଣ୍ଣାନୁକ୍ରମେ) {#make-targets-alphabetical}

Makefile ସାଧାରଣ ଡେଭ୍ ଫ୍ଲୋଗୁଡିକୁ ମାନକରଣ କରେ। ପ୍ରତ୍ୟେକ ଟାର୍ଗେଟ୍‌ର ଏକ ଧାଡି ସମ୍ମିଳିତ ସାରାଂଶ ପାଇଁ ଯେକୋଣସି ସମୟରେ `make help` ଚଳାନ କରନ୍ତୁ।

ଟିପ୍: କୌଣସି ଟାର୍ଗେଟ୍ ନ ଦେଇ `make` ଚଳାନ କଲେ ଏକ ସରଳ Whiptail ମେନୁ ଖୋଲିବ ଯାହାରୁ ଟାର୍ଗେଟ୍ ବାଛିବେ।

| ଟାର୍ଗେଟ୍                                                 | ଏକ ଧାଡିର ବର୍ଣ୍ଣନା                                                                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ସ୍ଥାନୀୟ build/preview ଆର୍ଟିଫ୍ୟାକ୍ଟ ହଟାନ୍ତୁ (tmp/, web-local-preview/, website/build/)। |
| [`commit`](#mt-commit)                                   | ଫର୍ମାଟ୍, ଟେଷ୍ଟ ଚଳାନ (i18n ସହିତ), changelog ଅପଡେଟ୍, commit ଏବଂ push।                    |
| [`eslint`](#mt-eslint)                                   | flat config ଦ୍ୱାରା ESLint ଚଳାନ (`npm run -s lint:eslint`)।                             |
| [`help`](#mt-help)                                       | ସମସ୍ତ ଟାର୍ଗେଟ୍‌ର ଏକ ଧାଡି ଡକ୍ସ (ସଜାନ୍ତୁ) ସୂଚୀ।                                          |
| [`lint`](#mt-lint)                                       | `sources/` ଉପରେ web‑ext lint (ତାତ୍କାଳିକ manifest; ZIPଗୁଡିକୁ ଅଣଦେଖା; non‑fatal)।        |
| [`menu`](#mt-menu)                                       | ଟାର୍ଗେଟ୍ ଓ ଇଚ୍ଛାଧୀନ ଆର୍ଗ୍ୟୁମେଣ୍ଟ ବାଛିବା ପାଇଁ ଇଣ୍ଟର୍‌ଆକ୍ଟିଭ୍ ମେନୁ।                      |
| [`pack`](#mt-pack)                                       | ATN ଏବଂ LOCAL ZIP ବିଲ୍ଡ (linter ଚଳାନ; packer ସ୍କ୍ରିପ୍ଟକୁ କଲ୍ କରେ)।                     |
| [`prettier`](#mt-prettier)                               | ରିପୋକୁ ଜଗାରେ ଫର୍ମାଟ୍ କରନ୍ତୁ (ପରିବର୍ତ୍ତନ ଲେଖେ)।                                         |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check mode (ଲେଖା ନାହିଁ); ପୁନଃଫର୍ମାଟ୍ ଆବଶ୍ୟକ ହେଲେ ્ଫେଲ୍ ହେବ।                   |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` ର ଅଳିଆସ୍।                                                                   |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, ପରେ Vitest (କନଫିଗର୍ କରାଯାଇଥିଲେ coverage)।                    |
| [`test_i18n`](#mt-test_i18n)                             | କେବଳ i18n ଟେଷ୍ଟ: ଅଡଅନ୍ ପ୍ଳେସହୋଲ୍ଡର/ସମତା + ୱେବସାଇଟ୍ ସମତା।                               |
| [`translate_app`](#mt-translation-app)                   | `translation_app` ର ଅଳିଆସ୍।                                                            |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` ରୁ ଆପ୍‌ UI ସ୍ଟ୍ରିଂ ଅନୁବାଦ।                         |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API ଦ୍ୱାରା ୱେବସାଇଟ୍ ଡକ୍ସ ଅନୁବାଦ (ପସନ୍ଦିତ)।                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | ୱେବସାଇଟ୍ ଡକ୍ସ ସିଙ୍କ୍ରୋନାସ୍ ଅନୁବାଦ (ପୁରୁଣା, ନନ୍‑ବ୍ୟାଚ୍)।                                |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` ର ଅଳିଆସ୍।                                                      |
| [`translation_web_index`](#mt-translation_web_index)     | ହୋମପେଜ୍/ନାଭବାର୍/ଫୁଟର UI ଅନୁବାଦ (`website/i18n/en/code.json → .../<lang>/code.json`)।   |
| [`web_build`](#mt-web_build)                             | ଡକ୍ସଗୁଡିକୁ `website/build` କୁ ବିଲ୍ଡ ( `--locales` / `BUILD_LOCALES` ସମର୍ଥନ କରେ)।       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ଅଫ୍ଲାଇନ୍‑ସେଫ୍ ଲିଙ୍କ ଚେକ୍ (ରିମୋଟ୍ HTTP[S] ବାର୍ଜନ କରେ)।                                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ସ୍ଥାନୀୟ gh‑pages ପ୍ରିଭ୍ୟୁ; 8080–8090 ରେ ଆଟୋ‑ସର୍ଭ୍; ଇଚ୍ଛାଧୀନ tests/link‑check।          |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` କୁ `gh-pages` ବ୍ରାଞ୍ଚକୁ ପୁସ୍ କରନ୍ତୁ।                                   |

ବିକଳ୍ପଗୁଡିକ ପାଇଁ ସିନ୍ଟାକ୍ସ

- ବିକଳ୍ପ ପାସ୍ କରିବା ପାଇଁ `make <command> OPTS="…"` ବ୍ୟବହାର କରନ୍ତୁ (କୋଟ୍ ସୁପାରିଶ୍ରୁତ)। ନିମ୍ନତଳରେ ପ୍ରତ୍ୟେକ ଟାର୍ଗେଟ୍ ଉଦାହରଣ ଉପଯୋଗ ଦେଖାଏ।

--

-

#### ଲୋକେଲ୍ ବିଲ୍ଡ ଟିପ୍ସ {#locale-build-tips}

- ଲୋକେଲ୍‌ର ସବସେଟ୍ ବିଲ୍ଡ: `BUILD_LOCALES="en de"` ସେଟ୍ କରନ୍ତୁ କିମ୍ବା web ଟାର୍ଗେଟ୍‌ଗୁଡିକୁ `OPTS="--locales en,de"` ପାସ୍ କରନ୍ତୁ।
- ନିର୍ଦ୍ଦିଷ୍ଟ ଲୋକେଲ୍ ପ୍ରିଭ୍ୟୁ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`।

---

### ବିଲ୍ଡ ଏବଂ ପ୍ୟାକେଜ୍ {#build-and-package}

- ZIP ବିଲ୍ଡ: `make pack`
- ରିପୋ ରୁଟ୍‌ରେ ATN ଏବଂ LOCAL ZIP ଉତ୍ପାଦନ (ହାତେ ଆର୍ଟିଫ୍ୟାକ୍ଟ ସମ୍ପାଦନ କରିବେ ନାହିଁ)
- ଟିପ୍: ପ୍ୟାକେଜିଙ୍ଗ ପୂର୍ବରୁ `sources/manifest_ATN.json` ଏବଂ `sources/manifest_LOCAL.json` — ଉଭୟରେ ଭାର୍ସନ୍ ଅପଡେଟ୍ କରନ୍ତୁ
- ମାନୁଆଲ୍ ଇନ୍ସ୍ଟଲ୍ (ଡେଭ୍): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → ବିଲ୍ଡ ହୋଇଥିବା ZIP ବାଛନ୍ତୁ

---

### ପରୀକ୍ଷା {#test}

- ଫୁଲ୍ ସ୍ୱିଟ୍: `make test` (Vitest)
- Coverage (ଇଚ୍ଛାଧୀନ):
- `npm i -D @vitest/coverage-v8`
- `make test` ଚଳାନ କରନ୍ତୁ; HTML ରିପୋର୍ଟ ପାଇଁ `coverage/index.html` ଖୋଲନ୍ତୁ
- କେବଳ i18n: `make test_i18n` (UI କୀ/ପ୍ଳେସହୋଲ୍ଡର/ଟାଇଟଲ୍ + ୱେବସାଇଟ୍ ପ୍ରତ୍ୟେକ ଲୋକେଲ୍‑ପ୍ରତ୍ୟେକ ଡକ୍ ପ୍ୟାରିଟି — id/title/sidebar_label ଯାଞ୍ଚ ସହିତ)

---

### ଡିବଗିଂ ଏବଂ ଲଗ୍ସ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- ରନ୍ଟାଇମ୍‌ରେ ବିସ୍ତୃତ ଲଗ୍ ସକ୍ରିୟ/ନିଷ୍କ୍ରିୟ:
- ସକ୍ରିୟ: `messenger.storage.local.set({ debug: true })`
- ନିଷ୍କ୍ରିୟ: `messenger.storage.local.set({ debug: false })`
- ଲଗ୍‌ଗୁଡିକ ରିପ୍ଲାଇ ଲେଖିବା/ପଠାଇବା ବେଳେ ଦେଖାଯାଏ

---

### ଡକ୍ସ (ୱେବସାଇଟ୍) {#docs-website}

- ଡେଭ୍ ସର୍ଭର: `cd website && npm run start`
- ସ୍ଟାଟିକ୍ ସାଇଟ୍ ବିଲ୍ଡ: `cd website && npm run build`
- Make ସମକକ୍ଷ (ବର୍ଣ୍ଣାନୁକ୍ରମେ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ବ୍ୟବହାର ଉଦାହରଣ:
- କେବଳ EN, tests/link‑check ଏଡାଇବେ, push ନାହିଁ: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ସମସ୍ତ ଲୋକେଲ୍, tests/link‑check ସହିତ, ତାପରେ push: `make web_build_local_preview && make web_push_github`
- ପ୍ରକାଶ ପୂର୍ବରୁ, ଅଫ୍ଲାଇନ୍‑ସେଫ୍ ଲିଙ୍କ ଚେକ୍ ଚଳାନ କରନ୍ତୁ: `make web_build_linkcheck`।
- i18n: ଇଂରାଜୀ `website/docs/*.md` ରେ; ଜର୍ମାନ ଅନୁବାଦ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ରେ
- ସର୍ଚ୍ଚ: ଯଦି CI ରେ Algolia DocSearch env ଭାରିଏବଲ୍‌ଗୁଡିକ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) ସେଟ୍ ଅଛି, ସାଇଟ୍ Algolia ସର୍ଚ୍ଚ ବ୍ୟବହାର କରେ; ନହେଲେ ଲୋକାଲ୍ ସର୍ଚ୍ଚକୁ ବ୍ୟାକଅପ୍ କରେ। ହୋମପେଜ୍‌ରେ, `/` କିମ୍ବା `Ctrl+K` ଦବାଇ ସର୍ଚ୍ଚ ବକ୍ସ ଖୋଲନ୍ତୁ।

---

#### Donate ରିଡାଇରେକ୍ଟ ରୁଟ୍ {#donate-redirect}

- `website/src/pages/donate.js`
- ରୁଟ୍: `/donate` (ଏବଂ `/<locale>/donate`)
- ବ୍ୟବହାର:
- ଏବେର ରୁଟ୍‌ରେ ଯଦି ଲୋକେଲ୍ ଅଛି (ଉଦାହରଣ, `/de/donate`), ସେହିଟିକୁ ବ୍ୟବହାର କରନ୍ତୁ
- ନଚେତ, `navigator.languages` ବନାମ କନଫିଗର୍ ଲୋକେଲ୍‌ରୁ ସର୍ବୋତ୍କୃଷ୍ଟ ମ୍ୟାଚ୍ ବାଛନ୍ତୁ; ଡିଫଲ୍ଟ ଲୋକେଲ୍‌କୁ ଫଲ୍‌ବ୍ୟାକ୍
- ରିଡାଇରେକ୍ଟ କରେ:
- `en` → `/docs/donation`
- ଅନ୍ୟମାନେ → `/<locale>/docs/donation`
- ଠିକ୍ baseUrl ହେଣ୍ଡଲିଂ ପାଇଁ `useBaseUrl` ବ୍ୟବହାର କରେ
- ଫଲ୍‌ବ୍ୟାକ୍ ଭାବେ meta refresh + `noscript` ଲିଙ୍କ ସମ୍ମିଳିତ

---

---

#### ପ୍ରିଭ୍ୟୁ ଟିପ୍ସ {#preview-tips}

- Node ପ୍ରିଭ୍ୟୁ ସଫା ସହିତ ବନ୍ଦ କରନ୍ତୁ: `http://localhost:<port>/__stop` ଖୋଲନ୍ତୁ (`Local server started` ପରେ ପ୍ରିଣ୍ଟ ହୋଇଥାଏ)।
- ଯଦି MDX/JSX ରେ ଇମେଜ୍ ଲୋଡ୍ ହୁଅନି, ସାଇଟ୍ `baseUrl` କୁ ସମ୍ମାନ ଦେବା ପାଇଁ `useBaseUrl('/img/...')` ବ୍ୟବହାର କରନ୍ତୁ।
- ପ୍ରଥମେ ପ୍ରିଭ୍ୟୁ ଆରମ୍ଭ ହୁଏ; ଲିଙ୍କ ଚେକ୍ ପରବର୍ତ୍ତୀରେ ଚଳାନ ହୋଇ ନନ୍‑ବ୍ଲକିଂ (ଭଙ୍ଗା ବାହ୍ୟ ଲିଙ୍କ ପ୍ରିଭ୍ୟୁକୁ ଅଟକାଇ ନାହିଁ)।
- ପ୍ରିଭ୍ୟୁ ଉଦାହରଣ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” ପରେ ପ୍ରିଣ୍ଟ ହୁଏ)।
- ଲିଙ୍କ‑ଚେକ୍ ରେ ବାହ୍ୟ ଲିଙ୍କ: କିଛି ବାହ୍ୟ ସାଇଟ୍ (ଉଦାହରଣ, addons.thunderbird.net) ସ୍ୱୟଂଚାଳିତ କ୍ରାଲର୍‌ଗୁଡିକୁ ବ୍ଲକ୍ କରନ୍ତି ଏବଂ 403 ଦେଖାଇପାରନ୍ତି। ପ୍ରିଭ୍ୟୁ ତଥାପି ଆରମ୍ଭ ହୁଏ; ଏଗୁଡିକୁ ଅଣଦେଖା କରିବା ସୁରକ୍ଷିତ।

---

#### ୱେବସାଇଟ୍ ଅନୁବାଦ କରନ୍ତୁ {#translate-website}

ଆପଣ କ ଣସିକି ଅନୁବାଦ କରିପାରିବେ

- କେବଳ ୱେବସାଇଟ୍ UI: ହୋମପେଜ୍, ନାଭବାର୍, ଫୁଟର, ଏବଂ ଅନ୍ୟାନ୍ୟ UI ସ୍ଟ୍ରିଙ୍ଗ। ଡକ୍ସ ବିଷୟବସ୍ତୁ ଏପର୍ଯ୍ୟନ୍ତ କେବଳ ଇଂରାଜୀରେ ରହିବ।

କେଉଁଠି ଏଡିଟ୍ କରିବେ

- `website/i18n/<locale>/code.json` ସମ୍ପାଦନ କରନ୍ତୁ (`en` କୁ ଉଦାହରଣ ଭାବେ ନିଅନ୍ତୁ)। `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ପରି ପ୍ଲେସହୋଲ୍ଡରଗୁଡିକୁ ଅପରିବର୍ତ୍ତିତ ରଖନ୍ତୁ।

ଫାଇଲଗୁଡିକ ସୃଷ୍ଟି/ରିଫ୍ରେଶ କରନ୍ତୁ

- ସମସ୍ତ ଲୋକେଲ୍ ପାଇଁ ଅନୁପସ୍ଥିତ stubs ସୃଷ୍ଟି: `npm --prefix website run i18n:stubs`
- ନୂତନ ସ୍ଟ୍ରିଙ୍ଗ ଯୋଡିବା ପରେ ଇଂରାଜୀରୁ stubs ଓଭରରାଇଟ୍: `npm --prefix website run i18n:stubs:force`
- ଏକକ ଲୋକେଲ୍ ପାଇଁ ବିକଳ୍ପ: `npx --prefix website docusaurus write-translations --locale <locale>`

ହୋମପେଜ୍/ନାଭବାର୍/ଫୁଟର UI ସ୍ଟ୍ରିଙ୍ଗ ଅନୁବାଦ (OpenAI)

- ଥରେ କ୍ରେଡେନ୍ସିଆଲ୍ ସେଟ୍ (shell କିମ୍ବା .env):
- `export OPENAI_API_KEY=sk-...`
- ବିକଳ୍ପ: `export OPENAI_MODEL=gpt-4o-mini`
- ଏକ‑ଶଟ୍ (ସମସ୍ତ ଲୋକେଲ୍, en ଏଡାଇବେ): `make translate_web_index`
- ନିର୍ଦ୍ଦିଷ୍ଟ ଲୋକେଲ୍‌କୁ ସୀମିତ: `make translate_web_index OPTS="--locales de,fr"`
- ଅବସ୍ଥାନ୍ତରିତ ମୂଲ୍ୟଗୁଡିକ ଓଭରରାଇଟ୍: `make translate_web_index OPTS="--force"`

ଯାଞ୍ଚ ଏବଂ ପୁନର୍ଚେଷ୍ଟା

- ଟ୍ରାନ୍ସଲେସନ୍ ସ୍କ୍ରିପ୍ଟ JSON ଆକୃତିକୁ ଭାଲିଡେଟ୍ କରେ, curly‑brace ପ୍ଲେସହୋଲ୍ଡର ସୁରକ୍ଷିତ କରେ, ଏବଂ URL ଅପରିବର୍ତ୍ତିତ ରହିଛି ବୋଲି ନିଶ୍ଚିତ କରେ।
- ଭାଲିଡେସନ୍ ્ଫେଲ୍ ହେଲେ, ବର୍ତ୍ତମାନ ମୂଲ୍ୟ ରଖିବା ପୂର୍ବରୁ ଫିଡବ୍ୟାକ୍ ସହ 2 ଥର ପର୍ଯ୍ୟନ୍ତ ପୁନର୍ଚେଷ୍ଟା କରେ।

ଆପଣଙ୍କ ଲୋକେଲ୍ ପ୍ରିଭ୍ୟୁ କରନ୍ତୁ

- ଡେଭ୍ ସର୍ଭର: `npm --prefix website run start`
- ଯାଆନ୍ତୁ `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

ଦାଖଲ କରିବା

- ସମ୍ପାଦିତ `code.json` ଫାଇଲ(ଗୁଡିକ) ସହିତ ଏକ PR ଖୋଲନ୍ତୁ। ପରିବର୍ତ୍ତନଗୁଡିକୁ କେନ୍ଦ୍ରିତ ରଖନ୍ତୁ ଏବଂ ସମ୍ଭବ ଥିଲେ ଏକ ଦ୍ରୁତ ସ୍କ୍ରିନଶଟ୍ ସମ୍ମିଳିତ କରନ୍ତୁ।

---

### ସୁରକ୍ଷା ଏବଂ କନଫିଗରେସନ୍ ଟିପ୍ସ {#security-and-configuration-tips}

- `sources/manifest.json` କମିଟ୍ କରିବେ ନାହିଁ (ବିଲ୍ଡ ସମୟରେ ତାତ୍କାଳିକ ଭାବେ ସୃଷ୍ଟିତ)
- ଅପଡେଟ୍ ଚ୍ୟାନେଲ୍ ରକ୍ଷା ପାଇଁ `browser_specific_settings.gecko.id` କୁ ସ୍ଥିର ରଖନ୍ତୁ

---

### ସେଟିଂସ୍ ପରିସ୍ଥିତି {#settings-persistence}

- ସ୍ଟୋରେଜ୍: ସମସ୍ତ ୟୁଜର ସେଟିଂସ୍ `storage.local` ରେ ରହେ ଏବଂ ଅଡଅନ୍ ଅପଡେଟ୍‌ରେ ରହିଥାଏ।
- ଇନ୍ସ୍ଟଲ୍: କୌଣସି କୀ ଖୋଜାଯାଉନଥିଲେ (undefined) ମାତ୍ର ଡିଫଲ୍ଟ୍‌ଗୁଡିକ ଲାଗୁ ପଡେ।
- ଅପଡେଟ୍: ଏକ ମାଇଗ୍ରେସନ୍ ମାତ୍ର ଅନୁପସ୍ଥିତ କୀ ଭରେ; ଅବସ୍ଥାନ୍ତରିତ ମୂଲ୍ୟଗୁଡିକୁ କେବେ ଓଭରରାଇଟ୍ କରିବେ ନାହିଁ।
- ସ୍କିମା ମାର୍କର: `settingsVersion` (ବର୍ତ୍ତମାନ `1`)।
- କୀ ଏବଂ ଡିଫଲ୍ଟ୍‌ଗୁଡିକ:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- କୋଡ୍: `sources/background.js` → `initializeOrMigrateSettings()` ଏବଂ `SCHEMA_VERSION` ଦେଖନ୍ତୁ।

ଡେଭ୍ ୱର୍କଫ୍ଲୋ (ନୂତନ ସେଟିଂ ଯୋଡିବା)

- `sources/background.js` ରେ `SCHEMA_VERSION` ବଢ଼ାନ୍ତୁ।
- `initializeOrMigrateSettings()` ର `DEFAULTS` ଅବଜେକ୍ଟରେ ନୂତନ କୀ + ଡିଫଲ୍ଟ ଯୋଡନ୍ତୁ।
- ଡିଫଲ୍ଟ ସିଡ୍ କରିବାବେଳେ "only-if-undefined" ନିୟମ ବ୍ୟବହାର କରନ୍ତୁ; ଅବସ୍ଥାନ୍ତରିତ ମୂଲ୍ୟଗୁଡିକୁ ଓଭରରାଇଟ୍ କରିବେ ନାହିଁ।
- ସେଟିଂ ୟୁଜରଙ୍କୁ ଦୃଶ୍ୟମାନ ଥିଲେ, `sources/options.js` ରେ ଓୟାର୍ କରନ୍ତୁ ଏବଂ ଲୋକାଲାଇଜ୍ଡ ସ୍ଟ୍ରିଂ ଯୋଡନ୍ତୁ।
- ଟେଷ୍ଟ ଯୋଡନ୍ତୁ/ସମନ୍ୱୟ କରନ୍ତୁ (`tests/background.settings.migration.test.js` ଦେଖନ୍ତୁ)।

ମାନୁଆଲ୍ ପରୀକ୍ଷା ଟିପ୍ସ

- ଏକ ଫ୍ରେସ୍ ଇନ୍ସ୍ଟଲ୍ ସିମ୍ୟୁଲେଟ୍: ଏକ୍ସଟେଞ୍ସନ୍‌ର ଡାଟା ଡିର୍ ଖାଲି କରନ୍ତୁ କିମ୍ବା ନୂତନ ପ୍ରୋଫାଇଲ୍ ସହିତ ଆରମ୍ଭ କରନ୍ତୁ।
- ଏକ ଅପଡେଟ୍ ସିମ୍ୟୁଲେଟ୍: `storage.local` ରେ `settingsVersion` କୁ `0` କରନ୍ତୁ ଏବଂ ପୁନର୍ଲୋଡ୍; ଅବସ୍ଥାନ୍ତରିତ ମୂଲ୍ୟ ଅପରିବର୍ତ୍ତିତ ରହିଛି ଏବଂ କେବଳ ଅନୁପସ୍ଥିତ କୀ ଯୋଡାଯାଇଛି ବୋଲି ନିଶ୍ଚିତ କରନ୍ତୁ।

---

### ଟ୍ରବଲଶୁଟିଂ {#troubleshooting}

- Thunderbird 128 ESR କିମ୍ବା ତାହାଠାରୁ ନୂତନ ନିଶ୍ଚିତ କରନ୍ତୁ
- ରନ୍ଟାଇମ୍ ସମସ୍ୟା ପାଇଁ Error Console ବ୍ୟବହାର କରନ୍ତୁ
- ଗୋଲାପ ରଖାଯାଇଥିବା ସେଟିଂସ୍ ଯଦି ଠିକ୍ ଭାବେ ଲାଗୁ ହୁଏନି, Thunderbird ପୁନରାରମ୍ଭ କରନ୍ତୁ ଏବଂ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ। (Thunderbird ସେସନ୍ ଜୁଡି ସ୍ଥିତି କ୍ୟାଶ୍ କରିପାରେ; ପୁନରାରମ୍ଭ ନବୀନ ସେଟିଂସ୍ ଲୋଡ୍ ନିଶ୍ଚିତ କରେ।)

---

### CI ଏବଂ କଭରେଜ୍ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest ଚଳାନ କରେ ଏବଂ coverage thresholds (85% lines/functions/branches/statements) ଲାଗୁ କରେ। Threshold ପୂରଣ ନହେଲେ ଜବ୍ ્ଫେଲ୍ ହେବ।
- ୱର୍କଫ୍ଲୋ `coverage-html` ଆର୍ଟିଫ୍ୟାକ୍ଟ ସହିତ HTML ରିପୋର୍ଟ ଅପଲୋଡ୍ କରେ; run ପେଜ୍ ରୁ ଡାଉନଲୋଡ୍ କରନ୍ତୁ (Actions → latest run → Artifacts)।

---

### ଅବଦାନ {#contributing}

- ଶାଖା/କମିଟ୍/PR ନିୟମ ପାଇଁ CONTRIBUTING.md ଦେଖନ୍ତୁ
- ଟିପ୍: ଆପଣଙ୍କ ଦୈନିକ ପ୍ରୋଫାଇଲ୍‌ରେ ପ୍ରଭାବ ପକାଇବା ଏଠାରୁ ବଞ୍ଚିବା ପାଇଁ ପରୀକ୍ଷା ପାଇଁ ଅଲଗା Thunderbird ବିକାଶ ପ୍ରୋଫାଇଲ୍ ସୃଷ୍ଟି କରନ୍ତୁ।

---

### ଅନୁବାଦଗୁଡିକ

- ବଡ “all → all” ଟ୍ରାନ୍ସଲେସନ୍ ଜବ୍‌ଗୁଡିକ ଧୀର ଏବଂ ଖର୍ଚ୍ଚାଳୀ ହୋଇପାରେ। ପ୍ରଥମେ ଏକ ସବସେଟ୍ (ଉଦାହରଣ, କିଛି ଡକ୍ସ ଏବଂ 1–2 ଲୋକେଲ୍) ଦ୍ୱାରା ଆରମ୍ଭ କରନ୍ତୁ, ଫଳାଫଳ ରିଭ୍ୟୁ କରନ୍ତୁ, ତାପରେ ବିସ୍ତାରିତ କରନ୍ତୁ।

---

- ପୁନର୍ଚେଷ୍ଟା ନୀତି: ଟ୍ରାନ୍ସଲେସନ୍ ଜବ୍‌ଗୁଡିକ API ତ୍ରୁଟିରେ ସର୍ବାଧିକ 3 ଥର ଏକ୍ସପୋନେନସିଆଲ୍ ବ୍ୟାକଅଫ୍ ସହ ପୁନର୍ଚେଷ୍ଟା କରେ; `scripts/translate_web_docs_batch.js` ଏବଂ `scripts/translate_web_docs_sync.js` ଦେଖନ୍ତୁ।

ଡକ୍ସ ପାଇଁ ସ୍କ୍ରିନଶଟ୍‌ଗୁଡିକ

- ଛବିଗୁଡିକୁ `website/static/img/` ତଳେ ସଞ୍ଚୟ କରନ୍ତୁ।
- ସାଇଟ୍ `baseUrl` ସହ ପଥଗୁଡିକ କାମ କରିବା ପାଇଁ MD/MDX ରେ `useBaseUrl('/img/<filename>')` ଦ୍ୱାରା ଏଗୁଡିକୁ ରେଫର୍ କରନ୍ତୁ।
- `website/static/img/` ତଳେ ଛବି ଯୋଡିବା କିମ୍ବା ପୁନର୍ନାମ କରିବା ପରେ, ସମସ୍ତ ରେଫରେନ୍ସ ଏପର୍ଯ୍ୟନ୍ତ `useBaseUrl('/img/…')` ବ୍ୟବହାର କରୁଛି ବୋଲି ଏବଂ ସ୍ଥାନୀୟ ପ୍ରିଭ୍ୟୁରେ ରେଣ୍ଡର୍ ହେଉଛି ବୋଲି ନିଶ୍ଚିତ କରନ୍ତୁ।
  ଫାଭିକନ୍‌ସ

- ମଲ୍ଟି‑ସାଇଜ୍ `favicon.ico` ସମସ୍ତ ବିଲ୍ଡ ପଥରେ (Make + ସ୍କ୍ରିପ୍ଟ) `website/scripts/build-favicon.mjs` ଦ୍ୱାରା ସ୍ୱୟଂଚାଳିତ ଭାବେ ଉତ୍ପାଦିତ।
- କୌଣସି ହାତଚାଳିତ ପଦକ୍ଷେପ ଆବଶ୍ୟକ ନାହିଁ; `icon-*.png` ଅପଡେଟ୍ କରିବାଯାଏ ଯଥେଷ୍ଟ।
  ସମୀକ୍ଷା ଟିପ୍

- ଅନୁବାଦିତ ଡକ୍ସ‌ରେ front‑matter `id` ଅପରିବର୍ତ୍ତିତ ରଖନ୍ତୁ; ଥିଲେ କେବଳ `title` ଏବଂ `sidebar_label` ଅନୁବାଦ କରନ୍ତୁ।

#### clean {#mt-clean}

- ଉଦ୍ଦେଶ୍ୟ: ସ୍ଥାନୀୟ build/preview ଆର୍ଟିଫ୍ୟାକ୍ଟ ହଟାନ୍ତୁ।
- ବ୍ୟବହାର: `make clean`
- ହଟାଏ (ଥିଲେ):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ଉଦ୍ଦେଶ୍ୟ: ଫର୍ମାଟ୍, ଟେଷ୍ଟ, changelog ଅପଡେଟ୍, commit ଏବଂ push।
- ବ୍ୟବହାର: `make commit`
- ବିବରଣୀ: Prettier (write), `make test`, `make test_i18n` ଚଳାନ କରେ; staged diffs ଥିଲେ changelog ଯୋଡେ; `origin/<branch>` କୁ push କରେ।

---

#### eslint {#mt-eslint}

- ଉଦ୍ଦେଶ୍ୟ: flat config ଦ୍ୱାରା ESLint ଚଳାନ।
- ବ୍ୟବହାର: `make eslint`

---

#### help {#mt-help}

- ଉଦ୍ଦେଶ୍ୟ: ଏକ ଧାଡି ଡକ୍ସ ସହ ସମସ୍ତ ଟାର୍ଗେଟ୍ ତାଲିକା।
- ବ୍ୟବହାର: `make help`

---

#### lint {#mt-lint}

- ଉଦ୍ଦେଶ୍ୟ: `web-ext` ବ୍ୟବହାର କରି MailExtension ଲିଣ୍ଟ।
- ବ୍ୟବହାର: `make lint`
- ଟିପ୍ପଣୀ: ତାତ୍କାଳିକ ଭାବେ `sources/manifest_LOCAL.json` → `sources/manifest.json` କପି କରେ; ବିଲ୍ଡ ZIP ଅଣଦେଖା; ସଚେତନବାଣୀଗୁଡିକ ପାଇପ୍ଲାଇନ୍ ્ଫେଲ୍ କରେନାହିଁ।

---

#### menu {#mt-menu}

- ଉଦ୍ଦେଶ୍ୟ: ଏକ Make ଟାର୍ଗେଟ୍ ଏବଂ ଇଚ୍ଛାଧୀନ ଆର୍ଗ୍ୟୁମେଣ୍ଟ ବାଛିବା ପାଇଁ ଇଣ୍ଟର୍‌ଆକ୍ଟିଭ୍ ମେନୁ।
- ବ୍ୟବହାର: ଯେକୌଣସି ଆର୍ଗ୍ୟୁମେଣ୍ଟ ବିନା `make` ଚଳାନ କରନ୍ତୁ।
- ଟିପ୍ପଣୀ: `whiptail` ଉପଲବ୍ଧ ନ ଥିଲେ, ମେନୁ `make help` କୁ ଫଲ୍‌ବ୍ୟାକ୍ କରେ।

---

#### pack {#mt-pack}

- ଉଦ୍ଦେଶ୍ୟ: ATN ଏବଂ LOCAL ZIP ବିଲ୍ଡ ( `lint` ଉପରେ ନିર્ભର୍ଶୀଳ)।
- ବ୍ୟବହାର: `make pack`
- ଟିପ୍: ପ୍ୟାକେଜିଙ୍ଗ ପୂର୍ବରୁ ଉଭୟ `sources/manifest_*.json` ରେ ଭାର୍ସନ୍ ବଢ଼ାନ୍ତୁ।

---

#### prettier {#mt-prettier}

- ଉଦ୍ଦେଶ୍ୟ: ରିପୋକୁ ଜଗାରେ ଫର୍ମାଟ୍ କରନ୍ତୁ।
- ବ୍ୟବହାର: `make prettier`

#### prettier_check {#mt-prettier_check}

- ଉଦ୍ଦେଶ୍ୟ: ଫର୍ମାଟିଂ ସତ୍ୟାପନ (ଲେଖା ନାହିଁ)।
- ବ୍ୟବହାର: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ଉଦ୍ଦେଶ୍ୟ: `prettier` ର ଅଳିଆସ୍।
- ବ୍ୟବହାର: `make prettier_write`

---

#### test {#mt-test}

- ଉଦ୍ଦେଶ୍ୟ: Prettier (write), ESLint, ପରେ Vitest (ଇନ୍ସ୍ଟଲ୍ ଥିଲେ coverage)।
- ବ୍ୟବହାର: `make test`

#### test_i18n {#mt-test_i18n}

- ଉଦ୍ଦେଶ୍ୟ: ଅଡଅନ୍ ସ୍ଟ୍ରିଂ ଏବଂ ୱେବସାଇଟ୍ ଡକ୍ସ ପାଇଁ i18n‑କେନ୍ଦ୍ରିତ ଟେଷ୍ଟ।
- ବ୍ୟବହାର: `make test_i18n`
- ଚଳାନ କରେ: `npm run test:i18n` ଏବଂ `npm run -s test:website-i18n`।

---

#### translate_app / translation_app {#mt-translation-app}

- ଉଦ୍ଦେଶ୍ୟ: EN ରୁ ଅନ୍ୟ ଲୋକେଲ୍‌ଗୁଡିକୁ ଅଡଅନ୍ UI ସ୍ଟ୍ରିଂ ଅନୁବାଦ।
- ବ୍ୟବହାର: `make translation_app OPTS="--locales all|de,fr"`
- ଟିପ୍ପଣୀ: କୀ ଗଠନ ଏବଂ ପ୍ଲେସହୋଲ୍ଡର ସୁରକ୍ଷିତ କରେ; `translation_app.log` କୁ ଲଗ୍ କରେ। ସ୍କ୍ରିପ୍ଟ ଫର୍ମ: `node scripts/translate_app.js --locales …`।

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ଉଦ୍ଦେଶ୍ୟ: ୱେବସାଇଟ୍ ଡକ୍ସକୁ `website/docs/*.md` ରୁ `website/i18n/<locale>/...` କୁ ଅନୁବାଦ।
- ପସନ୍ଦିତ: `translate_web_docs_batch` (OpenAI Batch API)
  - ବ୍ୟବହାର (ଫ୍ଲାଗ୍‌ଗୁଡିକ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ପୁରୁଣା ପଦବୀକ୍ରମ ଏଯାଁ ସ୍ୱୀକୃତ: `OPTS="<doc|all> <lang|all>"`
- ବ୍ୟବହାର: JSONL ବିଲ୍ଡ କରେ, ଅପଲୋଡ୍ କରେ, ପ୍ରତି 30s ପୋଲ୍ କରେ, ଫଳାଫଳ ଡାଉନଲୋଡ୍ କରେ, ଫାଇଲ୍ ଲେଖେ।
- ଟିପ୍ପଣୀ: ଏକ ବ୍ୟାଚ୍ ଜବ୍ ସମାପ୍ତ ହେବାକୁ 24 ଘଣ୍ଟା ପର୍ଯ୍ୟନ୍ତ ନିଅଇପାରେ (OpenAI ର batch ଜାଳକ ଅନୁସାରେ)। କନସୋଲ୍ ପ୍ରତ୍ୟେକ ପୋଲ୍‌ରେ ଅତିତ ସମୟ ଦେଖାଏ।
- Env: `OPENAI_API_KEY` (ଆବଶ୍ୟକ), ବିକଳ୍ପ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ଡିଫଲ୍ଟ 24h), `BATCH_POLL_INTERVAL_MS`।
- ପୁରୁଣା: `translate_web_docs_sync`
  - ବ୍ୟବହାର (ଫ୍ଲାଗ୍‌ଗୁଡିକ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ପୁରୁଣା ପଦବୀକ୍ରମ ଏଯାଁ ସ୍ୱୀକୃତ: `OPTS="<doc|all> <lang|all>"`
- ବ୍ୟବହାର: ପ୍ରତ୍ୟେକ ପେଏର୍ ପାଇଁ ସିଙ୍କ୍ରୋନାସ୍ ଅନୁରୋଧ (କୌଣସି ବ୍ୟାଚ୍ ସଂଗ୍ରହ ନାହିଁ)।
- ଟିପ୍ପଣୀ: `OPTS` ଛାଡି ଦିଆଯାଇଲେ ଇଣ୍ଟର୍‌ଆକ୍ଟିଭ୍ ପ୍ରମ୍ପ୍ଟ। ଉଭୟ ମୋଡ୍ କୋଡ୍ ବ୍ଲକ୍/ଇନ୍ଲାଇନ୍ କୋଡ୍ ସୁରକ୍ଷିତ କରେ ଏବଂ front‑matter `id` ଅପରିବର୍ତ୍ତିତ ରଖେ; `translation_web_batch.log` (ବ୍ୟାଚ୍) କିମ୍ବା `translation_web_sync.log` (ସିଙ୍କ୍) କୁ ଲଗ୍ କରେ।

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ଉଦ୍ଦେଶ୍ୟ: `website/i18n/en/code.json` ରୁ ସମସ୍ତ ଲୋକେଲ୍ ତଳେ `website/i18n/<locale>/code.json` ( `en` ଛାଡି) ପର୍ଯ୍ୟନ୍ତ ୱେବସାଇଟ୍ UI ସ୍ଟ୍ରିଂ (ହୋମପେଜ୍, ନାଭବାର୍, ଫୁଟର) ଅନୁବାଦ।
- ବ୍ୟବହାର: `make translate_web_index` କିମ୍ବା `make translate_web_index OPTS="--locales de,fr [--force]"`
- ଆବଶ୍ୟକତା: `OPENAI_API_KEY` ଏକ୍ସପୋର୍ଟ (ବିକଳ୍ପ: `OPENAI_MODEL=gpt-4o-mini`)।
- ବ୍ୟବହାର: JSON ଗଠନ ବୈଧ କରେ, curly‑brace ପ୍ଲେସହୋଲ୍ଡର ସୁରକ୍ଷିତ କରେ, URL ଅପରିବର୍ତ୍ତିତ ରଖେ, ଏବଂ ଭାଲିଡେସନ୍ ତ୍ରୁଟିରେ ଫିଡବ୍ୟାକ୍ ସହ ପୁନର୍ଚେଷ୍ଟା କରେ।

---

#### web_build {#mt-web_build}

- ଉଦ୍ଦେଶ୍ୟ: ଡକ୍ସ ସାଇଟ୍‌କୁ `website/build` କୁ ବିଲ୍ଡ।
- ବ୍ୟବହାର: `make web_build OPTS="--locales en|de,en|all"` (କିମ୍ବା `BUILD_LOCALES="en de"` ସେଟ୍ କରନ୍ତୁ)
- ଆନ୍ତର୍ନୀଣ: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`।
- ନିର୍ଭରଶୀଳତା: `website/node_modules/@docusaurus` ନଥିଲେ ମାତ୍ର `website/` ରେ `npm ci` ଚଳାନ କରେ।

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ଉଦ୍ଦେଶ୍ୟ: ଅଫ୍ଲାଇନ୍‑ସେଫ୍ ଲିଙ୍କ ଚେକ୍।
- ବ୍ୟବହାର: `make web_build_linkcheck OPTS="--locales en|all"`
- ଟିପ୍ପଣୀ: `tmp_linkcheck_web_pages` କୁ ବିଲ୍ଡ କରେ; GH Pages `baseUrl` କୁ `/` ରେ ପୁନର୍ଲେଖନ; ରିମୋଟ୍ HTTP(S) ଲିଙ୍କଗୁଡିକୁ ଏଡାଇଦେଏ।

#### web_build_local_preview {#mt-web_build_local_preview}

- ଉଦ୍ଦେଶ୍ୟ: ଇଚ୍ଛାଧୀନ tests/link‑check ସହ ସ୍ଥାନୀୟ gh‑pages ପ୍ରିଭ୍ୟୁ।
- ବ୍ୟବହାର: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ବ୍ୟବହାର: ପ୍ରଥମେ Node ପ୍ରିଭ୍ୟୁ ସର୍ଭର ଚେଷ୍ଟା କରେ (`scripts/preview-server.mjs`, `/__stop` ସମର୍ଥନ କରେ), `python3 -m http.server` କୁ ଫଲ୍‌ବ୍ୟାକ୍; 8080–8090 ରେ ସର୍ଭ୍ କରେ; PID `web-local-preview/.server.pid` ରେ।

#### web_push_github {#mt-web_push_github}

- ଉଦ୍ଦେଶ୍ୟ: `website/build` କୁ `gh-pages` ବ୍ରାଞ୍ଚକୁ ପୁସ୍ କରନ୍ତୁ।
- ବ୍ୟବହାର: `make web_push_github`

ଟିପ୍: Makefile ଦ୍ୱାରା ବ୍ୟବହୃତ ପ୍ୟାକେଜ୍ ମ୍ୟାନେଜର ଓଭରରାଇଡ୍ ପାଇଁ `NPM=…` ସେଟ୍ କରନ୍ତୁ (ଡିଫଲ୍ଟ `npm`)।

---
