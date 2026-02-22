---
id: development
title: 'ਵਿਕਾਸ'
sidebar_label: 'ਵਿਕਾਸ'
---

---

## ਵਿਕਾਸ ਗਾਈਡ {#development-guide}

:::note ਸਿਰਫ਼ ਅੰਗਰੇਜ਼ੀ ਸੋਧੋ; ਅਨੁਵਾਦ ਆਪ-ਮਾਤਰਾ ਫੈਲਦੇ ਹਨ
ਦਸਤਾਵੇਜ਼ੀਕਰਨ **ਕੇਵਲ** `website/docs` (English) ਹੇਠਾਂ ਅੱਪਡੇਟ ਕਰੋ। `website/i18n/<locale>/…` ਹੇਠਾਂ ਅਨੁਵਾਦ ਬਣਾਏ ਜਾਂਦੇ ਹਨ ਅਤੇ ਹੱਥੋਂ ਸੋਧਣੇ ਨਹੀਂ ਚਾਹੀਦੇ। ਲੋਕਲਾਈਜ਼ਡ ਸਮੱਗਰੀ ਤਾਜ਼ਾ ਕਰਨ ਲਈ ਅਨੁਵਾਦ ਟਾਸਕ ਵਰਤੋ (ਉਦਾਹਰਨ ਲਈ, `make translate_web_docs_batch`)।
:::

### ਪੂਰਵ ਸ਼ਰਤਾਂ {#prerequisites}

- Node.js 22+ ਅਤੇ npm (Node 22 ਨਾਲ ਟੈਸਟ ਕੀਤਾ)
- Thunderbird 128 ESR ਜਾਂ ਨਵਾਂ (ਹੱਥੋਂ ਟੈਸਟਿੰਗ ਲਈ)

---

### ਪ੍ਰੋਜੈਕਟ ਲੇਆਔਟ (ਉੱਚ‑ਪੱਧਰੀ) {#project-layout-high-level}

- ਰੂਟ: ਪੈਕੇਜਿੰਗ ਸਕ੍ਰਿਪਟ `distribution_zip_packer.sh`, ਦਸਤਾਵੇਜ਼, ਸਕ੍ਰੀਨਸ਼ਾਟ
- `sources/`: ਮੁੱਖ ਐਡ‑ਆਨ ਕੋਡ (ਬੈਕਗ੍ਰਾਊਂਡ, ਚੋਣਾਂ/ਪੌਪਅੱਪ UI, ਮੈਨੀਫੈਸਟ, ਆਈਕਾਨ)
- `tests/`: Vitest ਸੂਟ
- `website/`: Docusaurus ਦਸਤਾਵੇਜ਼ (i18n `website/i18n/de/...` ਹੇਠ)

---

### ਇੰਸਟਾਲ ਅਤੇ ਟੂਲਿੰਗ {#install-and-tooling}

- ਰੂਟ ਡਿਪੇਂਡੈਂਸੀ ਇੰਸਟਾਲ ਕਰੋ: `npm ci`
- ਦਸਤਾਵੇਜ਼ (ਵਿਕਲਪਿਕ): `cd website && npm ci`
- ਟਾਰਗੇਟ ਖੋਜੋ: `make help`

---

### ਲਾਈਵ ਡਿਵ (web‑ext run) {#live-dev-web-ext}

- Firefox ਡੈਸਕਟਾਪ ਵਿੱਚ ਤੇਜ਼ ਲੂਪ (ਕੇਵਲ UI ਸਮੋਕ‑ਟੈਸਟ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird ਵਿੱਚ ਚਲਾਓ (MailExtensions ਲਈ ਤਰਜੀਹੀ):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ਸੁਝਾਅ:
- Thunderbird ਦੀ Error Console ਖੁਲੀ ਰੱਖੋ (Tools → Developer Tools → Error Console)।
- MV3 ਈਵੈਂਟ ਪੇਜ ਨਿਸ਼ਕ੍ਰਿਆ ਹੋਣ ‘ਤੇ ਰੋਕੇ ਜਾਂਦੇ ਹਨ; ਕੋਡ ਤਬਦੀਲੀਆਂ ਤੋਂ ਬਾਅਦ ਐਡ‑ਆਨ ਰੀਲੋਡ ਕਰੋ ਜਾਂ web‑ext ਨੂੰ ਆਟੋ‑ਰੀਲੋਡ ਕਰਨ ਦਿਓ।
- ਕੁਝ ਕੇਵਲ Firefox ਵਰਤਾਓ ਵੱਖਰੇ ਹੋ ਸਕਦੇ ਹਨ; API ਸਮਾਨਤਾ ਲਈ ਹਮੇਸ਼ਾ Thunderbird ਵਿੱਚ ਪੱਕਾ ਕਰੋ।
- Thunderbird ਬਾਇਨਰੀ ਪਾਥ (ਉਦਾਹਰਨਾਂ):
- Linux: `thunderbird` (ਜਿਵੇਂ, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ਪ੍ਰੋਫ਼ਾਈਲ ਅਲੱਗਾਵ: ਆਪਣੀ ਰੋਜ਼ਾਨਾ ਸੈਟਅੱਪ ‘ਤੇ ਅਸਰ ਤੋਂ ਬਚਣ ਲਈ ਵਿਕਾਸ ਲਈ ਵੱਖਰਾ Thunderbird ਪ੍ਰੋਫ਼ਾਈਲ ਵਰਤੋ।

---

### ਮੇਕ ਟਾਰਗੇਟ (ਵਰਣਮਾਲਾ ਅਨੁਸਾਰ) {#make-targets-alphabetical}

Makefile ਆਮ ਡਿਵ ਵਰਕਫਲੋਜ਼ ਨੂੰ ਮਿਆਰੀਕ੍ਰਿਤ ਕਰਦਾ ਹੈ। ਹਰ ਟਾਰਗੇਟ ਦੀ ਇੱਕ‑ਲਾਈਨ ਸੰਖੇਪ ਲਈ ਕਦੇ ਵੀ `make help` ਚਲਾਓ।

ਟਿਪ: `make` ਬਿਨਾਂ ਟਾਰਗੇਟ ਦੇ ਚਲਾਉਣ ‘ਤੇ ਟਾਰਗੇਟ ਚੁਣਨ ਲਈ ਇੱਕ ਸਰਲ Whiptail ਮੇਨੂ ਖੁਲ੍ਹਦਾ ਹੈ।

| ਟਾਰਗੇਟ                                                   | ਇੱਕ‑ਲਾਈਨ ਵੇਰਵਾ                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ਸਥਾਨਕ ਬਿਲਡ/ਪ੍ਰੀਵਿਊ ਆਰਟੀਫੈਕਟ ਮਿਟਾਓ (tmp/, web-local-preview/, website/build/)।         |
| [`commit`](#mt-commit)                                   | ਫਾਰਮੈਟ ਕਰੋ, ਟੈਸਟ ਚਲਾਓ (i18n ਸਮੇਤ), ਚੇਂਜਲਾਗ ਅੱਪਡੇਟ ਕਰੋ, ਕਮਿਟ ਅਤੇ ਪੁਸ਼ ਕਰੋ।             |
| [`eslint`](#mt-eslint)                                   | flat ਕਨਫਿਗ ਰਾਹੀਂ ESLint ਚਲਾਓ (`npm run -s lint:eslint`)।                              |
| [`help`](#mt-help)                                       | ਸਾਰੇ ਟਾਰਗੇਟ ਇੱਕ‑ਲਾਈਨ ਡੌਕਸ ਸਮੇਤ (ਸੌਰਟ ਕੀਤੇ) ਲਿਸਟ ਕਰੋ।                                  |
| [`lint`](#mt-lint)                                       | `sources/` ‘ਤੇ web‑ext lint (ਅਸਥਾਈ ਮੈਨੀਫੈਸਟ; ZIP ਅਣਡਿੱਠੇ; ਗੈਰ‑ਘਾਤਕ)।                  |
| [`menu`](#mt-menu)                                       | ਟਾਰਗੇਟ ਅਤੇ ਵਿਕਲਪਿਕ ਆਰਗੂਮੈਂਟ ਚੁਣਨ ਲਈ ਇੰਟਰਐਕਟਿਵ ਮੇਨੂ।                                   |
| [`pack`](#mt-pack)                                       | ATN ਅਤੇ LOCAL ZIPs ਬਣਾਓ (ਲਿੰਟਰ ਚਲਾਉਂਦਾ; ਪੈਕਰ ਸਕ੍ਰਿਪਟ ਨੂੰ ਕਾਲ ਕਰਦਾ)।                   |
| [`prettier`](#mt-prettier)                               | ਰਿਪੋਜ਼ਟਰੀ ਨੂੰ ਥਾਂ ‘ਤੇ ਫਾਰਮੈਟ ਕਰੋ (ਬਦਲਾਅ ਲਿਖਦਾ ਹੈ)।                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ਚੈਕ ਮੋਡ ਵਿੱਚ (ਕੋਈ ਲਿਖਤ ਨਹੀਂ); ਰੀਫਾਰਮੈਟ ਦੀ ਲੋੜ ਹੋਣ ‘ਤੇ ਫੇਲ।                   |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` ਲਈ ਉਪਨਾਮ।                                                                  |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, ਫਿਰ Vitest (ਜੇ ਕਨਫਿਗਰ ਹੋਵੇ ਤਾਂ ਕਵਰੇਜ)।                      |
| [`test_i18n`](#mt-test_i18n)                             | ਕੇਵਲ i18n ਟੈਸਟ: ਐਡ‑ਆਨ ਪਲੇਸਹੋਲਡਰ/ਸਮਾਨਤਾ + ਵੈੱਬਸਾਈਟ ਸਮਾਨਤਾ।                             |
| [`translate_app`](#mt-translation-app)                   | `translation_app` ਲਈ ਉਪਨਾਮ।                                                           |
| [`translation_app`](#mt-translation-app)                 | ਐਪ UI ਸਟਰਿੰਗਾਂ ਦਾ `sources/_locales/en/messages.json` ਤੋਂ ਅਨੁਵਾਦ ਕਰੋ।                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | ਵੈੱਬਸਾਈਟ ਦਸਤਾਵੇਜ਼ਾਂ ਦਾ OpenAI Batch API ਰਾਹੀਂ ਅਨੁਵਾਦ (ਤਰਜੀਹੀ)।                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | ਵੈੱਬਸਾਈਟ ਦਸਤਾਵੇਜ਼ਾਂ ਦਾ ਸਿੰਕ੍ਰੋਨਸ ਅਨੁਵਾਦ (ਵਿਰਾਸਤੀ, ਨਾਨ‑ਬੈਚ)।                           |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` ਲਈ ਉਪਨਾਮ।                                                     |
| [`translation_web_index`](#mt-translation_web_index)     | ਹੋਮਪੇਜ/ਨੈਵਬਾਰ/ਫੁਟਰ UI ਦਾ ਅਨੁਵਾਦ (`website/i18n/en/code.json → .../<lang>/code.json`)। |
| [`web_build`](#mt-web_build)                             | ਦਸਤਾਵੇਜ਼ਾਂ ਨੂੰ `website/build` ਤੱਕ ਬਣਾਓ (`--locales` / `BUILD_LOCALES` ਦਾ ਸਮਰਥਨ)।     |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ਆਫਲਾਈਨ‑ਸੁਰੱਖਿਅਤ ਲਿੰਕ ਚੈਕ (ਰਿਮੋਟ HTTP[S] ਛੱਡਦਾ ਹੈ)।                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ਲੋਕਲ gh‑pages ਪ੍ਰੀਵਿਊ; 8080–8090 ‘ਤੇ ਆਟੋ‑ਸਰਵ; ਵਿਕਲਪਿਕ ਟੈਸਟ/ਲਿੰਕ‑ਚੈਕ।                  |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ਨੂੰ `gh-pages` ਬ੍ਰਾਂਚ ‘ਤੇ ਪੁਸ਼ ਕਰੋ।                                   |

ਚੋਣਾਂ ਲਈ ਸਿੰਟੈਕਸ

- ਵਿਕਲਪ ਪਾਸ ਕਰਨ ਲਈ `make <command> OPTS="…"` ਵਰਤੋ (ਕੋਟਸ ਸਿਫ਼ਾਰਸ਼ੀ)। ਹੇਠਾਂ ਹਰ ਟਾਰਗੇਟ ਵਰਤੋਂ ਦਾ ਉਦਾਹਰਨ ਦਿਖਾਉਂਦਾ ਹੈ।

--

-

#### ਲੋਕੇਲ ਬਿਲਡ ਟਿੱਪਸ {#locale-build-tips}

- ਲੋਕੇਲਾਂ ਦੇ ਸਬਸੈਟ ਬਣਾਓ: `BUILD_LOCALES="en de"` ਸੈੱਟ ਕਰੋ ਜਾਂ ਵੈੱਬ ਟਾਰਗੇਟਾਂ ਨੂੰ `OPTS="--locales en,de"` ਦਿਓ।
- ਕਿਸੇ ਖਾਸ ਲੋਕੇਲ ਦਾ ਪ੍ਰੀਵਿਊ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`।

---

### ਬਿਲਡ ਅਤੇ ਪੈਕੇਜ {#build-and-package}

- ZIPs ਬਣਾਓ: `make pack`
- ਰਿਪੋ ਰੂਟ ਵਿੱਚ ATN ਅਤੇ LOCAL ZIPs ਬਣਾਉਂਦਾ ਹੈ (ਆਰਟੀਫੈਕਟ ਹੱਥੋਂ ਨਾ ਸੋਧੋ)
- ਟਿਪ: ਪੈਕੇਜਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਵਰਜਨ `sources/manifest_ATN.json` ਅਤੇ `sources/manifest_LOCAL.json` ਦੋਹਾਂ ਵਿੱਚ ਅੱਪਡੇਟ ਕਰੋ
- ਹੱਥੋਂ ਇੰਸਟਾਲ (ਡਿਵ): Thunderbird → Tools → Add‑ons and Themes → ਗਿਅਰ → Install Add‑on From File… → ਬਣੀ ਹੋਈ ZIP ਚੁਣੋ

---

### ਟੈਸਟ {#test}

- ਪੂਰਾ ਸੂਟ: `make test` (Vitest)
- ਕਵਰੇਜ (ਵਿਕਲਪਿਕ):
- `npm i -D @vitest/coverage-v8`
- `make test` ਚਲਾਓ; HTML ਰਿਪੋਰਟ ਲਈ `coverage/index.html` ਖੋਲ੍ਹੋ
- ਕੇਵਲ i18n: `make test_i18n` (UI keys/placeholders/titles + ਵੈੱਬਸਾਈਟ ਪ੍ਰਤੀ‑ਲੋਕੇਲ ਪ੍ਰਤੀ‑ਦਸਤਾਵੇਜ਼ ਸਮਾਨਤਾ id/title/sidebar_label ਜਾਂਚਾਂ ਨਾਲ)

---

### ਡਿਬੱਗਿੰਗ ਅਤੇ ਲੌਗ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- ਰਨਟਾਈਮ ‘ਤੇ verbose ਲੌਗ ਟੌਗਲ ਕਰੋ:
- ਯੋਗ ਕਰੋ: `messenger.storage.local.set({ debug: true })`
- ਅਯੋਗ ਕਰੋ: `messenger.storage.local.set({ debug: false })`
- ਲੌਗ ਜਵਾਬ ਲਿਖਦੇ/ਭੇਜਦੇ ਸਮੇਂ ਦਿੱਖਦੇ ਹਨ

---

### ਦਸਤਾਵੇਜ਼ (ਵੈੱਬਸਾਈਟ) {#docs-website}

- ਡਿਵ ਸਰਵਰ: `cd website && npm run start`
- ਸਟੈਟਿਕ ਸਾਈਟ ਬਣਾਓ: `cd website && npm run build`
- Make ਸਮਕੱਛ (ਵਰਣਮਾਲਾ ਅਨੁਸਾਰ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ਵਰਤੋਂ ਦੇ ਉਦਾਹਰਨ:
- ਕੇਵਲ EN, ਟੈਸਟ/ਲਿੰਕ‑ਚੈਕ ਛੱਡੋ, ਕੋਈ ਪੁਸ਼ ਨਹੀਂ: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ਸਾਰੀਆਂ ਲੋਕੇਲਾਂ, ਟੈਸਟ/ਲਿੰਕ‑ਚੈਕ ਸਮੇਤ, ਫਿਰ ਪੁਸ਼: `make web_build_local_preview && make web_push_github`
- ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, ਆਫਲਾਈਨ‑ਸੁਰੱਖਿਅਤ ਲਿੰਕ‑ਚੈਕ ਚਲਾਓ: `make web_build_linkcheck`।
- i18n: ਅੰਗਰੇਜ਼ੀ `website/docs/*.md` ਵਿੱਚ; ਜਰਮਨ ਅਨੁਵਾਦ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ਵਿੱਚ
- ਖੋਜ: ਜੇ Algolia DocSearch env ਵੇਰੀਏਬਲ CI ਵਿੱਚ ਸੈੱਟ ਹਨ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), ਤਾਂ ਸਾਈਟ Algolia ਖੋਜ ਵਰਤਦੀ ਹੈ; ਨਹੀਂ ਤਾਂ ਇਹ ਲੋਕਲ ਖੋਜ ‘ਤੇ ਵਾਪਸ ਜਾਂਦੀ ਹੈ। ਹੋਮਪੇਜ ‘ਤੇ, ਖੋਜ ਬਾਕਸ ਖੋਲ੍ਹਣ ਲਈ `/` ਜਾਂ `Ctrl+K` ਦਬਾਓ।

---

#### ਦਾਨ ਰੀਡਾਇਰੈਕਟ ਰੂਟ {#donate-redirect}

- `website/src/pages/donate.js`
- ਰੂਟ: `/donate` (ਅਤੇ `/<locale>/donate`)
- ਵਰਤਾਓ:
- ਜੇ ਮੌਜੂਦਾ ਰੂਟ ਕੋਲ ਲੋਕੇਲ ਹੈ (ਉਦਾਹਰਨ ਲਈ, `/de/donate`), ਤਾਂ ਉਹੀ ਵਰਤੋ
- ਨਹੀਂ ਤਾਂ, `navigator.languages` ਤੋਂ ਕਨਫਿਗਰ ਕੀਤੀਆਂ ਲੋਕੇਲਾਂ ਮੁਕਾਬਲੇ ਸਭ ਤੋਂ ਵਧੀਆ ਮੇਲ ਚੁਣੋ; ਡਿਫਾਲਟ ਲੋਕੇਲ ‘ਤੇ ਵਾਪਸ ਜਾਓ
- ਇੱਥੇ ਰੀਡਾਇਰੈਕਟ ਕਰਦਾ ਹੈ:
- `en` → `/docs/donation`
- ਹੋਰ → `/<locale>/docs/donation`
- ਠੀਕ baseUrl ਹੈਂਡਲਿੰਗ ਲਈ `useBaseUrl` ਵਰਤਦਾ ਹੈ
- ਫਾਲਬੈਕ ਵਜੋਂ meta refresh + `noscript` ਲਿੰਕ ਸ਼ਾਮਲ ਕਰਦਾ ਹੈ

---

---

#### ਪ੍ਰੀਵਿਊ ਸੁਝਾਅ {#preview-tips}

- Node ਪ੍ਰੀਵਿਊ ਸਾਫ਼ ਤਰੀਕੇ ਨਾਲ ਰੋਕੋ: `http://localhost:<port>/__stop` ਖੋਲ੍ਹੋ (`Local server started` ਤੋਂ ਬਾਅਦ ਛਪਿਆ)।
- ਜੇ MDX/JSX ਵਿੱਚ ਚਿੱਤਰ ਲੋਡ ਨਹੀਂ ਹੁੰਦੇ, ਤਾਂ ਸਾਈਟ ਦੇ `baseUrl` ਦੀ ਪਾਲਣਾ ਕਰਨ ਲਈ `useBaseUrl('/img/...')` ਵਰਤੋ।
- ਪ੍ਰੀਵਿਊ ਪਹਿਲਾਂ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ; ਲਿੰਕ‑ਚੈਕ ਬਾਅਦ ਵਿੱਚ ਚਲਦਾ ਹੈ ਅਤੇ ਨਾਨ‑ਬਲਾਕਿੰਗ ਹੈ (ਟੁੱਟੇ ਬਾਹਰੀ ਲਿੰਕ ਪ੍ਰੀਵਿਊ ਨਹੀਂ ਰੋਕਣਗੇ)।
- ਪ੍ਰੀਵਿਊ URL ਦਾ ਉਦਾਹਰਨ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” ਤੋਂ ਬਾਅਦ ਛਪਿਆ)।
- ਲਿੰਕ‑ਚੈਕ ਵਿੱਚ ਬਾਹਰੀ ਲਿੰਕ: ਕੁਝ ਬਾਹਰੀ ਸਾਈਟਾਂ (ਉਦਾਹਰਨ ਲਈ, addons.thunderbird.net) ਆਟੋਮੈਟਿਕ ਕ੍ਰੌਲਰਾਂ ਨੂੰ ਰੋਕਦੀਆਂ ਹਨ ਅਤੇ ਲਿੰਕ ਚੈਕ ਵਿੱਚ 403 ਦਿਖਾ ਸਕਦੀਆਂ ਹਨ। ਪ੍ਰੀਵਿਊ ਫਿਰ ਵੀ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ; ਇਹਨਾਂ ਨੂੰ ਅਣਡਿੱਠਾ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।

---

#### ਵੈੱਬਸਾਈਟ ਦਾ ਅਨੁਵਾਦ ਕਰੋ {#translate-website}

ਤੁਸੀਂ ਕੀ ਅਨੁਵਾਦ ਕਰ ਸਕਦੇ ਹੋ

- ਕੇਵਲ ਵੈੱਬਸਾਈਟ UI: ਹੋਮਪੇਜ, ਨੈਵਬਾਰ, ਫੁਟਰ ਅਤੇ ਹੋਰ UI ਸਟਰਿੰਗਾਂ। ਦਸਤਾਵੇਜ਼ ਸਮੱਗਰੀ ਹਾਲੇ ਲਈ ਕੇਵਲ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਹੀ ਰਹੇਗੀ।

ਕਿੱਥੇ ਸੋਧ ਕਰਨੀ ਹੈ

- `website/i18n/<locale>/code.json` ਸੋਧੋ (`en` ਨੂੰ ਰੈਫਰੈਂਸ ਵਜੋਂ ਵਰਤੋ)। `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ਵਰਗੇ ਪਲੇਸਹੋਲਡਰ ਅਣਬਦਲੇ ਰਹਿਣ ਦਿਓ।

ਫਾਇਲਾਂ ਬਣਾਓ ਜਾਂ ਤਾਜ਼ਾ ਕਰੋ

- ਸਾਰੀਆਂ ਲੋਕੇਲਾਂ ਲਈ ਗਾਇਬ ਸਟਬ ਬਣਾਓ: `npm --prefix website run i18n:stubs`
- ਅੰਗਰੇਜ਼ੀ ਤੋਂ ਸਟਬ ਓਵਰਰਾਈਟ ਕਰੋ (ਨਵੀਆਂ ਸਟਰਿੰਗਾਂ ਜੋੜਨ ਤੋਂ ਬਾਅਦ): `npm --prefix website run i18n:stubs:force`
- ਇੱਕ ਲੋਕੇਲ ਲਈ ਵਿਕਲਪ: `npx --prefix website docusaurus write-translations --locale <locale>`

ਹੋਮਪੇਜ/ਨੈਵਬਾਰ/ਫੁਟਰ UI ਸਟਰਿੰਗਾਂ ਦਾ ਅਨੁਵਾਦ (OpenAI)

- ਪਰਮਾਣ‑ਪੱਤਰ ਇੱਕ ਵਾਰੀ ਸੈੱਟ ਕਰੋ (ਸ਼ੈਲ ਜਾਂ .env):
- `export OPENAI_API_KEY=sk-...`
- ਵਿਕਲਪਿਕ: `export OPENAI_MODEL=gpt-4o-mini`
- ਇਕ‑ਵਾਰੀ (ਸਾਰੀਆਂ ਲੋਕੇਲਾਂ, en ਛੱਡੋ): `make translate_web_index`
- ਖਾਸ ਲੋਕੇਲਾਂ ਤੱਕ ਸੀਮਿਤ: `make translate_web_index OPTS="--locales de,fr"`
- ਮੌਜੂਦਾ ਮੁੱਲ ਓਵਰਰਾਈਟ ਕਰੋ: `make translate_web_index OPTS="--force"`

ਵੈਲੀਡੇਸ਼ਨ ਅਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ਾਂ

- ਅਨੁਵਾਦ ਸਕ੍ਰਿਪਟ JSON ਰੂਪ ਦੀ ਪੜਤਾਲ ਕਰਦਾ ਹੈ, curly‑brace ਪਲੇਸਹੋਲਡਰ ਸੰਭਾਲਦਾ ਹੈ, ਅਤੇ ਯਕੀਨੀ ਬਣਾਉਂਦਾ ਹੈ ਕਿ URLs ਅਣਬਦਲੇ ਹਨ।
- ਵੈਲੀਡੇਸ਼ਨ ਅਸਫਲ ਹੋਣ ‘ਤੇ, ਇਹ ਫੀਡਬੈਕ ਨਾਲ 2 ਵਾਰ ਤੱਕ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ, ਫਿਰ ਮੌਜੂਦਾ ਮੁੱਲ ਬਰਕਰਾਰ ਰੱਖਦਾ ਹੈ।

ਆਪਣਾ ਲੋਕੇਲ ਪ੍ਰੀਵਿਊ ਕਰੋ

- ਡਿਵ ਸਰਵਰ: `npm --prefix website run start`
- ਇੱਥੇ ਜਾਓ: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

ਜਮ੍ਹਾਂ ਕਰਨਾ

- ਸੋਧੀ ਹੋਈ `code.json` ਫਾਇਲ(ਾਂ) ਸਮੇਤ PR ਖੋਲ੍ਹੋ। ਬਦਲਾਵ ਕੇਂਦ੍ਰਿਤ ਰੱਖੋ ਅਤੇ ਸੰਭਵ ਹੋਣ ‘ਤੇ ਇੱਕ ਤੇਜ਼ ਸਕ੍ਰੀਨਸ਼ਾਟ ਵੀ ਸ਼ਾਮਲ ਕਰੋ।

---

### ਸੁਰੱਖਿਆ ਅਤੇ ਕਨਫ਼ਿਗਰੇਸ਼ਨ ਸੁਝਾਅ {#security-and-configuration-tips}

- `sources/manifest.json` ਕਮਿਟ ਨਾ ਕਰੋ (ਬਿਲਡ ਵੱਲੋਂ ਅਸਥਾਈ ਤੌਰ ‘ਤੇ ਬਣਾਇਆ ਗਿਆ)
- ਅੱਪਡੇਟ ਚੈਨਲ ਸੰਭਾਲਣ ਲਈ `browser_specific_settings.gecko.id` ਸਥਿਰ ਰੱਖੋ

---

### ਸੈਟਿੰਗਾਂ ਦੀ ਸਥਾਇਤਾ {#settings-persistence}

- ਸਟੋਰੇਜ: ਸਾਰੀਆਂ ਯੂਜ਼ਰ ਸੈਟਿੰਗਾਂ `storage.local` ਵਿੱਚ ਰਹਿੰਦੀਆਂ ਹਨ ਅਤੇ ਐਡ‑ਆਨ ਅੱਪਡੇਟਾਂ ਵਿਚਕਾਰ ਕਾਇਮ ਰਹਿੰਦੀਆਂ ਹਨ।
- ਇੰਸਟਾਲ: ਡਿਫਾਲਟਸ ਕੇਵਲ ਤਦ ਲਾਗੂ ਹੁੰਦੀਆਂ ਹਨ ਜਦੋਂ ਕੋਈ ਕੁੰਜੀ ਸਖ਼ਤੀ ਨਾਲ ਗੈਰਹਾਜ਼ਰ ਹੋਵੇ (undefined)।
- ਅੱਪਡੇਟ: ਮਾਈਗ੍ਰੇਸ਼ਨ ਕੇਵਲ ਗੈਰਹਾਜ਼ਰ ਕੁੰਜੀਆਂ ਭਰਦਾ ਹੈ; ਮੌਜੂਦਾ ਮੁੱਲ ਕਦੇ ਓਵਰਰਾਈਟ ਨਹੀਂ ਹੁੰਦੇ।
- ਸਕੀਮਾ ਮਾਰਕਰ: `settingsVersion` (ਮੌਜੂਦਾ `1`)।
- ਕੁੰਜੀਆਂ ਅਤੇ ਡਿਫਾਲਟ:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- ਕੋਡ: `sources/background.js` → `initializeOrMigrateSettings()` ਅਤੇ `SCHEMA_VERSION` ਵੇਖੋ।

ਡਿਵ ਵਰਕਫ਼ਲੋ (ਨਵੀਂ ਸੈਟਿੰਗ ਜੋੜਨਾ)

- `sources/background.js` ਵਿੱਚ `SCHEMA_VERSION` ਵਧਾਓ।
- `initializeOrMigrateSettings()` ਵਿੱਚ `DEFAULTS` ਆਬਜੈਕਟ ਵਿੱਚ ਨਵੀਂ ਕੁੰਜੀ + ਡਿਫਾਲਟ ਜੋੜੋ।
- ਡਿਫਾਲਟ ਸੀਡ ਕਰਦੇ ਸਮੇਂ "only-if-undefined" ਨਿਯਮ ਵਰਤੋ; ਮੌਜੂਦਾ ਮੁੱਲ ਓਵਰਰਾਈਟ ਨਹੀਂ ਕਰਨੇ।
- ਜੇ ਸੈਟਿੰਗ ਯੂਜ਼ਰ‑ਵਿਜ਼ਿਬਲ ਹੈ, ਤਾਂ ਇਸਨੂੰ `sources/options.js` ਵਿੱਚ ਵਾਇਰ ਕਰੋ ਅਤੇ ਲੋਕਲਾਈਜ਼ਡ ਸਟਰਿੰਗਾਂ ਜੋੜੋ।
- ਟੈਸਟ ਜੋੜੋ/ਸਮਾਯੋਜਿਤ ਕਰੋ (`tests/background.settings.migration.test.js` ਵੇਖੋ)।

ਹੱਥੋਂ ਟੈਸਟਿੰਗ ਸੁਝਾਅ

- ਤਾਜ਼ਾ ਇੰਸਟਾਲ ਦਾ ਸਿਮੂਲੇਟ ਕਰੋ: ਐਕਸਟੈਂਸ਼ਨ ਦੀ ਡਾਟਾ ਡਾਇਰੈਕਟਰੀ ਕਲੀਅਰ ਕਰੋ ਜਾਂ ਨਵੇਂ ਪ੍ਰੋਫ਼ਾਈਲ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ।
- ਅੱਪਡੇਟ ਦਾ ਸਿਮੂਲੇਟ ਕਰੋ: `storage.local` ਵਿੱਚ `settingsVersion` ਨੂੰ `0` ਤੇ ਸੈੱਟ ਕਰੋ ਅਤੇ ਰੀਲੋਡ ਕਰੋ; ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਮੌਜੂਦਾ ਮੁੱਲ ਅਣਬਦਲੇ ਰਹਿੰਦੇ ਹਨ ਅਤੇ ਕੇਵਲ ਗੈਰਹਾਜ਼ਰ ਕੁੰਜੀਆਂ ਹੀ ਜੋੜੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।

---

### ਟ੍ਰਬਲਸ਼ੂਟਿੰਗ {#troubleshooting}

- ਇਹ ਯਕੀਨੀ ਬਣਾਓ ਕਿ Thunderbird 128 ESR ਜਾਂ ਨਵਾਂ ਹੈ
- ਰਨਟਾਈਮ ਸਮੱਸਿਆਵਾਂ ਲਈ Error Console ਵਰਤੋ
- ਜੇ ਸੰਭਾਲੀਆਂ ਸੈਟਿੰਗਾਂ ਠੀਕ ਤਰ੍ਹਾਂ ਲਾਗੂ ਨਹੀਂ ਹੁੰਦੀਆਂ ਦਿੱਸਦੀਆਂ, ਤਾਂ Thunderbird ਰੀਸਟਾਰਟ ਕਰੋ ਅਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ। (Thunderbird ਸੈਸ਼ਨਾਂ ਵਿਚਕਾਰ ਸਟੇਟ ਕੈਸ਼ ਕਰ ਸਕਦਾ ਹੈ; ਰੀਸਟਾਰਟ ਇਹ ਯਕੀਨੀ ਕਰਦਾ ਹੈ ਕਿ ਨਵੀਆਂ ਸੈਟਿੰਗਾਂ ਲੋਡ ਹੋਣ।)

---

### CI ਅਤੇ ਕਵਰੇਜ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest ਨੂੰ ਕਵਰੇਜ ਥ੍ਰੈਸ਼ਹੋਲਡਸ (85% ਲਾਈਨ/ਫੰਕਸ਼ਨ/ਬ੍ਰਾਂਚ/ਸਟੇਟਮੈਂਟ) ਨਾਲ ਚਲਾਂਦਾ ਹੈ। ਜੇ ਥ੍ਰੈਸ਼ਹੋਲਡ ਪੂਰੇ ਨਹੀਂ ਹੁੰਦੇ, ਜੌਬ ਫੇਲ੍ਹ ਹੁੰਦਾ ਹੈ।
- ਵਰਕਫ਼ਲੋ HTML ਰਿਪੋਰਟ ਸਮੇਤ ਇੱਕ ਆਰਟੀਫੈਕਟ `coverage-html` ਅੱਪਲੋਡ ਕਰਦਾ ਹੈ; ਇਸਨੂੰ ਰਨ ਪੇਜ ਤੋਂ ਡਾਊਨਲੋਡ ਕਰੋ (Actions → ਤਾਜ਼ਾ ਰਨ → Artifacts)।

---

### ਯੋਗਦਾਨ {#contributing}

- ਬ੍ਰਾਂਚ/ਕਮਿਟ/PR ਦਿਸ਼ਾ‑ਨਿਰਦੇਸ਼ਾਂ ਲਈ CONTRIBUTING.md ਵੇਖੋ
- ਟਿਪ: ਟੈਸਟਿੰਗ ਲਈ ਵੱਖਰਾ Thunderbird ਡਿਵੈਲਪਮੈਂਟ ਪ੍ਰੋਫ਼ਾਈਲ ਬਣਾਓ ਤਾਂ ਜੋ ਤੁਹਾਡੇ ਰੋਜ਼ਾਨਾ ਪ੍ਰੋਫ਼ਾਈਲ ‘ਤੇ ਅਸਰ ਨਾ ਪਏ।

---

### ਅਨੁਵਾਦ

- ਵੱਡੇ “all → all” ਅਨੁਵਾਦ ਜੌਬ ਹੌਲੇ ਤੇ ਮਹਿੰਗੇ ਹੋ ਸਕਦੇ ਹਨ। ਇੱਕ ਸਬਸੈਟ ਨਾਲ ਸ਼ੁਰੂ ਕਰੋ (ਉਦਾਹਰਨ ਲਈ, ਕੁਝ ਦਸਤਾਵੇਜ਼ ਅਤੇ 1–2 ਲੋਕੇਲ), ਨਤੀਜਾ ਸਮੀਖਿਆ ਕਰੋ, ਫਿਰ ਵਿਸਥਾਰ ਕਰੋ।

---

- ਮੁੜ‑ਕੋਸ਼ਿਸ਼ ਨੀਤੀ: ਅਨੁਵਾਦ ਜੌਬ API ਗਲਤੀਆਂ ‘ਤੇ ਘਾਤਾਂਕ ਬੈਕਆਫ਼ ਨਾਲ ਵੱਧ ਤੋਂ ਵੱਧ 3 ਮੁੜ‑ਕੋਸ਼ਿਸ਼ਾਂ ਕਰਦੇ ਹਨ; `scripts/translate_web_docs_batch.js` ਅਤੇ `scripts/translate_web_docs_sync.js` ਵੇਖੋ।

ਦਸਤਾਵੇਜ਼ਾਂ ਲਈ ਸਕ੍ਰੀਨਸ਼ਾਟ

- ਚਿੱਤਰ `website/static/img/` ਹੇਠ ਸਟੋਰ ਕਰੋ।
- ਉਨ੍ਹਾਂ ਨੂੰ MD/MDX ਵਿੱਚ `useBaseUrl('/img/<filename>')` ਰਾਹੀਂ ਰੈਫਰੈਂਸ ਕਰੋ ਤਾਂ ਜੋ ਪਾਥ ਸਾਈਟ ਦੇ `baseUrl` ਨਾਲ ਕੰਮ ਕਰਨ।
- `website/static/img/` ਹੇਠ ਚਿੱਤਰ ਜੋੜਣ ਜਾਂ ਨਾਂ ਬਦਲਣ ਤੋਂ ਬਾਅਦ, ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਸਾਰੇ ਰੈਫਰੈਂਸ ਹੁਣ ਵੀ `useBaseUrl('/img/…')` ਵਰਤਦੇ ਹਨ ਅਤੇ ਲੋਕਲ ਪ੍ਰੀਵਿਊ ਵਿੱਚ ਰੈਂਡਰ ਹੋ ਰਹੇ ਹਨ।
  ਫੇਵਆਈਕਾਨ

- ਮਲਟੀ‑ਸਾਈਜ਼ `favicon.ico` ਸਭ ਬਿਲਡ ਪਾਥਾਂ (Make + ਸਕ੍ਰਿਪਟ) ਵਿੱਚ ਆਪਣੇ‑ਆਪ `website/scripts/build-favicon.mjs` ਰਾਹੀਂ ਬਣਦਾ ਹੈ।
- ਕੋਈ ਹੱਥੋਂ ਕਦਮ ਲੋੜੀਂਦਾ ਨਹੀਂ; `icon-*.png` ਅੱਪਡੇਟ ਕਰਨਾ ਹੀ ਕਾਫੀ ਹੈ।
  ਸਮੀਖਿਆ ਸੁਝਾਅ

- ਅਨੁਵਾਦੀਤ ਦਸਤਾਵੇਜ਼ਾਂ ਵਿੱਚ front‑matter `id` ਅਣਬਦਲੇ ਰੱਖੋ; ਮੌਜੂਦ ਹੋਣ ‘ਤੇ ਸਿਰਫ਼ `title` ਅਤੇ `sidebar_label` ਦਾ ਅਨੁਵਾਦ ਕਰੋ।

#### clean {#mt-clean}

- ਉਦੇਸ਼: ਸਥਾਨਕ ਬਿਲਡ/ਪ੍ਰੀਵਿਊ ਆਰਟੀਫੈਕਟ ਹਟਾਉਣਾ।
- ਵਰਤੋਂ: `make clean`
- ਹਟਾਉਂਦਾ ਹੈ (ਜੇ ਮੌਜੂਦ ਹੋਣ):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ਉਦੇਸ਼: ਫਾਰਮੈਟ, ਟੈਸਟ, ਚੇਂਜਲਾਗ ਅੱਪਡੇਟ, ਕਮਿਟ ਅਤੇ ਪੁਸ਼।
- ਵਰਤੋਂ: `make commit`
- ਵੇਰਵੇ: Prettier (write), `make test`, `make test_i18n` ਚਲਾਂਦਾ ਹੈ; ਜਦੋਂ staged ਡਿਫ ਹੋਣ ਤਾਂ ਚੇਂਜਲਾਗ ਜੋੜਦਾ ਹੈ; `origin/<branch>` ‘ਤੇ ਪੁਸ਼ ਕਰਦਾ ਹੈ।

---

#### eslint {#mt-eslint}

- ਉਦੇਸ਼: flat ਕਨਫਿਗ ਰਾਹੀਂ ESLint ਚਲਾਉਣਾ।
- ਵਰਤੋਂ: `make eslint`

---

#### help {#mt-help}

- ਉਦੇਸ਼: ਇੱਕ‑ਲਾਈਨ ਡੌਕਸ ਨਾਲ ਸਾਰੇ ਟਾਰਗੇਟ ਲਿਸਟ ਕਰੋ।
- ਵਰਤੋਂ: `make help`

---

#### lint {#mt-lint}

- ਉਦੇਸ਼: `web-ext` ਨਾਲ MailExtension ਨੂੰ ਲਿੰਟ ਕਰੋ।
- ਵਰਤੋਂ: `make lint`
- ਨੋਟ: ਅਸਥਾਈ ਤੌਰ ‘ਤੇ `sources/manifest_LOCAL.json` → `sources/manifest.json` ਕਾਪੀ ਕਰਦਾ ਹੈ; ਬਣੀਆਂ ZIPs ਅਣਡਿੱਠੀਆਂ; ਚੇਤਾਵਨੀਆਂ ਪਾਈਪਲਾਈਨ ਫੇਲ੍ਹ ਨਹੀਂ ਕਰਦੀਆਂ।

---

#### menu {#mt-menu}

- ਉਦੇਸ਼: Make ਟਾਰਗੇਟ ਅਤੇ ਵਿਕਲਪਿਕ ਆਰਗੂਮੈਂਟ ਚੁਣਨ ਲਈ ਇੰਟਰਐਕਟਿਵ ਮੇਨੂ।
- ਵਰਤੋਂ: `make` ਨੂੰ ਬਿਨਾਂ ਆਰਗੂਮੈਂਟ ਚਲਾਓ।
- ਨੋਟ: ਜੇ `whiptail` ਉਪਲਬਧ ਨਹੀਂ, ਤਾਂ ਮੇਨੂ `make help` ‘ਤੇ ਫਾਲਬੈਕ ਕਰਦਾ ਹੈ।

---

#### pack {#mt-pack}

- ਉਦੇਸ਼: ATN ਅਤੇ LOCAL ZIPs ਬਣਾਓ (`lint` ‘ਤੇ ਨਿਰਭਰ)।
- ਵਰਤੋਂ: `make pack`
- ਟਿਪ: ਪੈਕੇਜਿੰਗ ਤੋਂ ਪਹਿਲਾਂ ਦੋਹਾਂ `sources/manifest_*.json` ਵਿੱਚ ਵਰਜਨ ਵਧਾਓ।

---

#### prettier {#mt-prettier}

- ਉਦੇਸ਼: ਰਿਪੋ ਨੂੰ ਥਾਂ ‘ਤੇ ਫਾਰਮੈਟ ਕਰਨਾ।
- ਵਰਤੋਂ: `make prettier`

#### prettier_check {#mt-prettier_check}

- ਉਦੇਸ਼: ਫਾਰਮੈਟਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨਾ (ਕੋਈ ਲਿਖਤ ਨਹੀਂ)।
- ਵਰਤੋਂ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ਉਦੇਸ਼: `prettier` ਲਈ ਉਪਨਾਮ।
- ਵਰਤੋਂ: `make prettier_write`

---

#### test {#mt-test}

- ਉਦੇਸ਼: Prettier (write), ESLint, ਫਿਰ Vitest (ਜੇ ਇੰਸਟਾਲ ਹੋਵੇ ਤਾਂ ਕਵਰੇਜ) ਚਲਾਉਣਾ।
- ਵਰਤੋਂ: `make test`

#### test_i18n {#mt-test_i18n}

- ਉਦੇਸ਼: ਐਡ‑ਆਨ ਸਟਰਿੰਗਾਂ ਅਤੇ ਵੈੱਬਸਾਈਟ ਦਸਤਾਵੇਜ਼ਾਂ ਲਈ i18n‑ਕੇਂਦ੍ਰਿਤ ਟੈਸਟ।
- ਵਰਤੋਂ: `make test_i18n`
- ਚਲਾਂਦਾ ਹੈ: `npm run test:i18n` ਅਤੇ `npm run -s test:website-i18n`।

---

#### translate_app / translation_app {#mt-translation-app}

- ਉਦੇਸ਼: ਐਡ‑ਆਨ UI ਸਟਰਿੰਗਾਂ ਦਾ EN ਤੋਂ ਹੋਰ ਲੋਕੇਲਾਂ ਵਿੱਚ ਅਨੁਵਾਦ।
- ਵਰਤੋਂ: `make translation_app OPTS="--locales all|de,fr"`
- ਨੋਟ: ਕੁੰਜੀ ਸਟ੍ਰਕਚਰ ਅਤੇ ਪਲੇਸਹੋਲਡਰ ਸੰਭਾਲਦਾ ਹੈ; `translation_app.log` ਵਿੱਚ ਲੌਗ ਕਰਦਾ ਹੈ। ਸਕ੍ਰਿਪਟ ਰੂਪ: `node scripts/translate_app.js --locales …`।

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ਉਦੇਸ਼: ਵੈੱਬਸਾਈਟ ਦਸਤਾਵੇਜ਼ਾਂ ਦਾ `website/docs/*.md` ਤੋਂ `website/i18n/<locale>/...` ਵਿੱਚ ਅਨੁਵਾਦ।
- ਤਰਜੀਹੀ: `translate_web_docs_batch` (OpenAI Batch API)
  - ਵਰਤੋਂ (ਫਲੈਗ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ਵਿਰਾਸਤੀ ਪੋਜ਼ੀਸ਼ਨਲ ਹਾਲੇ ਵੀ ਸਵੀਕਾਰ ਹੈ: `OPTS="<doc|all> <lang|all>"`
- ਵਰਤਾਓ: JSONL ਬਣਾਉਂਦਾ, ਅੱਪਲੋਡ ਕਰਦਾ, ਹਰ 30ਸ ‘ਤੇ ਪੋਲ ਕਰਦਾ, ਨਤੀਜੇ ਡਾਊਨਲੋਡ ਕਰਦਾ, ਫਾਇਲਾਂ ਲਿਖਦਾ ਹੈ।
- ਨੋਟ: ਬੈਚ ਜੌਬ ਨੂੰ ਪੂਰਾ ਹੋਣ ਲਈ 24 ਘੰਟੇ ਤੱਕ ਲੱਗ ਸਕਦੇ ਹਨ (OpenAI ਦੇ ਬੈਚ ਵਿੰਡੋ ਅਨੁਸਾਰ)। ਕੰਸੋਲ ਹਰ ਪੋਲ ‘ਤੇ ਬੀਤਿਆ ਸਮਾਂ ਦਿਖਾਉਂਦਾ ਹੈ।
- Env: `OPENAI_API_KEY` (ਲਾਜ਼ਮੀ), ਵਿਕਲਪਿਕ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ਡਿਫਾਲਟ 24h), `BATCH_POLL_INTERVAL_MS`।
- ਵਿਰਾਸਤੀ: `translate_web_docs_sync`
  - ਵਰਤੋਂ (ਫਲੈਗ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ਵਿਰਾਸਤੀ ਪੋਜ਼ੀਸ਼ਨਲ ਹਾਲੇ ਵੀ ਸਵੀਕਾਰ ਹੈ: `OPTS="<doc|all> <lang|all>"`
- ਵਰਤਾਓ: ਪ੍ਰਤੀ‑ਜੋੜਾ ਸਿੰਕ੍ਰੋਨਸ ਰਿਕਵੈਸਟ (ਕੋਈ ਬੈਚ ਏਗਰੀਗੇਸ਼ਨ ਨਹੀਂ)।
- ਨੋਟ: ਜਦੋਂ `OPTS` ਛੱਡਿਆ ਜਾਂਦਾ ਹੈ ਤਾਂ ਇੰਟਰਐਕਟਿਵ ਪ੍ਰਾਮਪਟ। ਦੋਹਾਂ ਮੋਡ ਕੋਡ ਬਲਾਕ/ਇਨਲਾਈਨ ਕੋਡ ਸੰਭਾਲਦੇ ਹਨ ਅਤੇ front‑matter `id` ਅਣਬਦਲੇ ਰੱਖਦੇ ਹਨ; `translation_web_batch.log` (ਬੈਚ) ਜਾਂ `translation_web_sync.log` (ਸਿੰਕ) ਵਿੱਚ ਲੌਗ ਕਰਦੇ ਹਨ।

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ਉਦੇਸ਼: ਵੈੱਬਸਾਈਟ UI ਸਟਰਿੰਗਾਂ (ਹੋਮਪੇਜ, ਨੈਵਬਾਰ, ਫੁਟਰ) ਦਾ `website/i18n/en/code.json` ਤੋਂ ਸਾਰੀਆਂ ਲੋਕੇਲਾਂ ਵਿੱਚ `website/i18n/<locale>/code.json` ਹੇਠ ਅਨੁਵਾਦ ( `en` ਤੋਂ ਇਲਾਵਾ)।
- ਵਰਤੋਂ: `make translate_web_index` ਜਾਂ `make translate_web_index OPTS="--locales de,fr [--force]"`
- ਲੋੜਾਂ: `OPENAI_API_KEY` ਐਕਸਪੋਰਟ ਕਰੋ (ਵਿਕਲਪਿਕ: `OPENAI_MODEL=gpt-4o-mini`)।
- ਵਰਤਾਓ: JSON ਰਚਨਾ ਦੀ ਪੜਤਾਲ ਕਰਦਾ, curly‑brace ਪਲੇਸਹੋਲਡਰ ਸੰਭਾਲਦਾ, URLs ਅਣਬਦਲੇ ਰੱਖਦਾ, ਅਤੇ ਵੈਲੀਡੇਸ਼ਨ ਗਲਤੀਆਂ ‘ਤੇ ਫੀਡਬੈਕ ਨਾਲ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ।

---

#### web_build {#mt-web_build}

- ਉਦੇਸ਼: ਦਸਤਾਵੇਜ਼ ਸਾਈਟ ਨੂੰ `website/build` ਤੱਕ ਬਣਾਉਣਾ।
- ਵਰਤੋਂ: `make web_build OPTS="--locales en|de,en|all"` (ਜਾਂ `BUILD_LOCALES="en de"` ਸੈੱਟ ਕਰੋ)
- ਅੰਦਰੂਨੀ: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`।
- ਡਿਪ: ਜੇ `website/node_modules/@docusaurus` ਗੈਰਹਾਜ਼ਰ ਹੋਵੇ ਤਾਂ ਕੇਵਲ `website/` ਵਿੱਚ `npm ci` ਚਲਾਉਂਦਾ ਹੈ।

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ਉਦੇਸ਼: ਆਫਲਾਈਨ‑ਸੁਰੱਖਿਅਤ ਲਿੰਕ ਚੈਕ।
- ਵਰਤੋਂ: `make web_build_linkcheck OPTS="--locales en|all"`
- ਨੋਟ: `tmp_linkcheck_web_pages` ਤੱਕ ਬਣਾਉਂਦਾ ਹੈ; GH Pages `baseUrl` ਨੂੰ `/` ‘ਚ ਰੀਰਾਈਟ ਕਰਦਾ ਹੈ; ਰਿਮੋਟ HTTP(S) ਲਿੰਕ ਛੱਡਦਾ ਹੈ।

#### web_build_local_preview {#mt-web_build_local_preview}

- ਉਦੇਸ਼: ਵਿਕਲਪਿਕ ਟੈਸਟ/ਲਿੰਕ‑ਚੈਕ ਨਾਲ ਲੋਕਲ gh‑pages ਪ੍ਰੀਵਿਊ।
- ਵਰਤੋਂ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ਵਰਤਾਓ: ਪਹਿਲਾਂ Node ਪ੍ਰੀਵਿਊ ਸਰਵਰ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦਾ ਹੈ (`scripts/preview-server.mjs`, `/__stop` ਸਮਰਥਿਤ), ਨਹੀਂ ਤਾਂ `python3 -m http.server` ‘ਤੇ ਫਾਲਬੈਕ; 8080–8090 ‘ਤੇ ਸਰਵ ਕਰਦਾ; PID `web-local-preview/.server.pid` ‘ਤੇ।

#### web_push_github {#mt-web_push_github}

- ਉਦੇਸ਼: `website/build` ਨੂੰ `gh-pages` ਬ੍ਰਾਂਚ ‘ਤੇ ਪੁਸ਼ ਕਰਨਾ।
- ਵਰਤੋਂ: `make web_push_github`

ਟਿਪ: Makefile ਵੱਲੋਂ ਵਰਤੇ ਪੈਕੇਜ ਮੈਨੇਜਰ ਨੂੰ ਓਵਰਰਾਈਡ ਕਰਨ ਲਈ `NPM=…` ਸੈੱਟ ਕਰੋ (ਡਿਫਾਲਟ `npm`)।

---
