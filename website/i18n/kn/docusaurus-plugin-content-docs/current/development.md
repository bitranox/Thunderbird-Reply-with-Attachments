---
id: development
title: 'ಅಭಿವೃದ್ಧಿ'
sidebar_label: 'ಅಭಿವೃದ್ಧಿ'
---

---

## ಅಭಿವೃದ್ಧಿ ಮಾರ್ಗದರ್ಶಿ {#development-guide}

:::note ಇಂಗ್ಲಿಷ್ ಮಾತ್ರ ತಿದ್ದಿ; ಭಾಷಾಂತರಗಳು ಸ್ವಯಂ ಹರಡುತ್ತವೆ
ದಾಖಲೆಗಳನ್ನು `website/docs` (English) ಒಳಗೇ **ಮಾತ್ರ** ನವೀಕರಿಸಿ. `website/i18n/<locale>/…` ಅಡಿಯಲ್ಲಿನ ಭಾಷಾಂತರಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೃಜಿಸಲಾಗುತ್ತವೆ; ಕೈಯಾರೆ ಸಂಪಾದಿಸಬಾರದು. ಸ್ಥಳೀಕೃತ ವಿಷಯವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಲು ಭಾಷಾಂತರ ಕಾರ್ಯಗಳನ್ನು (ಉದಾ., `make translate_web_docs_batch`) ಬಳಸಿ.
:::

### ಪೂರ್ವಾಪೇಕ್ಷಿತಗಳು {#prerequisites}

- Node.js 22+ ಮತ್ತು npm (Node 22 ಜೊತೆ ಪರೀಕ್ಷಿಸಲಾಗಿದೆ)
- Thunderbird 128 ESR ಅಥವಾ ಅದರ ನಂತರದ ಆವೃತ್ತಿ (ಕೈಯಾರೆ ಪರೀಕ್ಷೆಗೆ)

---

### ಯೋಜನೆಯ ವಿನ್ಯಾಸ (ಉನ್ನತ‑ಮಟ್ಟ) {#project-layout-high-level}

- Root: ಪ್ಯಾಕೇಜಿಂಗ್ ಸ್ಕ್ರಿಪ್ಟ್ `distribution_zip_packer.sh`, ಡಾಕ್ಸ್, ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು
- `sources/`: ಮುಖ್ಯ add-on ಕೋಡ್ (background, options/popup UI, manifests, icons)
- `tests/`: Vitest ಸೂಟ್
- `website/`: Docusaurus ಡಾಕ್ಸ್ (`website/i18n/de/...` ಅಡಿಯಲ್ಲಿ i18n ಸಹಿತ)

---

### ಸ್ಥಾಪನೆ ಮತ್ತು ಉಪಕರಣಗಳು {#install-and-tooling}

- ಮೂಲ ಅವಲಂಬನೆಗಳನ್ನು ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿ: `npm ci`
- ಡಾಕ್ಸ್ (ಐಚ್ಛಿಕ): `cd website && npm ci`
- ಟಾರ್ಗೆಟ್‌ಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ: `make help`

---

### ಲೈವ್ ಡೆವ್ (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop ನಲ್ಲಿ ತ್ವರಿತ ಲೂಪ್ (ಕೆವಲ UI smoke‑tests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird ನಲ್ಲಿ ರನ್ ಮಾಡಿ (MailExtensions ಗಾಗಿ ಶಿಫಾರಸು):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ಸಲಹೆಗಳು:
- Thunderbird’s Error Console ಅನ್ನು ತೆರೆಯಿಟ್ಟಿರಿಸಿ (Tools → Developer Tools → Error Console).
- MV3 event ಪುಟಗಳು idle ಆಗಿದ್ದಾಗ ಸ್ಥಗಿತಗೊಳ್ಳುತ್ತವೆ; ಕೋಡ್ ಬದಲಾದ ನಂತರ add‑on ಅನ್ನು ಮರುಲೋಡ್ ಮಾಡಿ, ಅಥವಾ web‑ext auto‑reload ಆಗಲು ಬಿಡಿ.
- ಕೆಲ Firefox‑ಮಾತ್ರ ವರ್ತನೆಗಳಲ್ಲಿ ವ್ಯತ್ಯಾಸವಿರಬಹುದು; Thunderbird ನಲ್ಲಿ ಸದಾ ಪರಿಶೀಲಿಸಿ API ಸಮಪಾಲಿತತೆಗೆ.
- Thunderbird binary ಪಾತ್‌ಗಳು (ಉದಾಹರಣೆಗಳು):
- Linux: `thunderbird` (ಉದಾ., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ಪ್ರೊಫೈಲ್ ಐಸೋಲೇಶನ್: ನಿಮ್ಮ ದೈನಂದಿನ ಸೆಟ್‌ಅಪ್‌ಗೆ ಪರಿಣಾಮ ಬೀರದಂತೆ ಡೆವಲಪ್‌ಮೆಂಟ್‌ಗೆ ಪ್ರತ್ಯೇಕ Thunderbird ಪ್ರೊಫೈಲ್ ಅನ್ನು ಬಳಸಿ.

---

### Make ಗುರಿಗಳು (ಅಕ್ಷರಕ್ರಮವಾಗಿ) {#make-targets-alphabetical}

Makefile ಸಾಮಾನ್ಯ ಡೆವ್ ಫ್ಲೋಗಳನ್ನು ಪ್ರಮಾಣಿತಗೊಳಿಸುತ್ತದೆ. ಪ್ರತೀ ಗುರಿಯ ಒಂದು ಸಾಲಿನ ಸಾರಾಂಶಕ್ಕಾಗಿ ಯಾವಾಗ ಬೇಕಾದರೂ `make help` ರನ್ ಮಾಡಿರಿ.

ಸಲಹೆ: `make` ಅನ್ನು ಯಾವುದೇ ಗುರಿ ನೀಡದೇ ರನ್ ಮಾಡಿದರೆ, ಗುರಿ ಆಯ್ಕೆಮಾಡಲು ಸರಳ Whiptail ಮೆನು ತೆರೆಯುತ್ತದೆ.

| ಗುರಿ                                                     | ಒಂದು ಸಾಲಿನ ವಿವರಣೆ                                                                                |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | ಸ್ಥಳೀಯ build/preview ಆರ್ಕಿಫ್ಯಾಕ್ಟ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ (tmp/, web-local-preview/, website/build/). |
| [`commit`](#mt-commit)                                   | ಫಾರ್ಮಾಟ್, ಪರೀಕ್ಷೆ (i18n ಸೇರಿ), changelog ನವೀಕರಿಸಿ, commit & push ಮಾಡಿ.                           |
| [`eslint`](#mt-eslint)                                   | flat config ಮೂಲಕ ESLint ರನ್ ಮಾಡಿ (`npm run -s lint:eslint`).                                     |
| [`help`](#mt-help)                                       | ಎಲ್ಲಾ ಗುರಿಗಳನ್ನು ಒಂದು ಸಾಲಿನ ಡಾಕ್ಸ್ ಜೊತೆಗೆ ಪಟ್ಟಿ ಮಾಡಿ (ಸೋರ್ಟೆಡ್).                                 |
| [`lint`](#mt-lint)                                       | `sources/` ಮೇಲೆ web‑ext lint (ತಾತ್ಕಾಲಿಕ manifest; ZIP‌ಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ; ಘೋರವಲ್ಲ).         |
| [`menu`](#mt-menu)                                       | ಗುರಿ ಮತ್ತು ಐಚ್ಛಿಕ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಲು ಸಂವಹನಾತ್ಮಕ ಮೆನು.                                |
| [`pack`](#mt-pack)                                       | ATN ಮತ್ತು LOCAL ZIP‌ಗಳನ್ನು ಕಟ್ಟಲು (linter ರನ್ ಆಗುತ್ತದೆ; packer ಸ್ಕ್ರಿಪ್ಟ್ ಅನ್ನು ಕರೆದು).          |
| [`prettier`](#mt-prettier)                               | ರೆಪೊಸಿಟರಿಯನ್ನು ಸ್ಥಳದಲ್ಲೇ ಫಾರ್ಮಾಟ್ ಮಾಡಿ (ಬದಲಾವಣೆಗಳನ್ನು ಬರೆಯುತ್ತದೆ).                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check ಮೋಡ್ (ಬರಹವಿಲ್ಲ); ಮರುಫಾರ್ಮಾಟ್ ಅಗತ್ಯವಿದ್ದರೆ ವೈಫಲ್ಯ.                                 |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` ಗಾಗಿ ಅಲಿಯಾಸ್.                                                                         |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, ನಂತರ Vitest (ಕಾನ್ಫಿಗರ್ ಮಾಡಿದರೆ coverage).                              |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑ಮಾತ್ರ ಪರೀಕ್ಷೆಗಳು: add‑on placeholders/parity + ವೆಬ್‌ಸೈಟ್ parity.                            |
| [`translate_app`](#mt-translation-app)                   | `translation_app` ಗಾಗಿ ಅಲಿಯಾಸ್.                                                                  |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` ನಿಂದ ಅಪ್ಲಿಕೇಶನ್ UI ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು ಭಾಷಾಂತರಿಸಿ.              |
| [`translate_web_docs_batch`](#mt-translation-web)        | ವೆಬ್‌ಸೈಟ್ ಡಾಕ್ಸ್‌ಗಳನ್ನು OpenAI Batch API ಮೂಲಕ ಭಾಷಾಂತರಿಸಿ (ಶಿಫಾರಸು).                              |
| [`translate_web_docs_sync`](#mt-translation-web)         | ವೆಬ್‌ಸೈಟ್ ಡಾಕ್ಸ್‌ಗಳನ್ನು synchronousವಾಗಿ ಭಾಷಾಂತರಿಸಿ (ಪಾರಂಪರಿಕ, non-batch).                        |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` ಗಾಗಿ ಅಲಿಯಾಸ್.                                                            |
| [`translation_web_index`](#mt-translation_web_index)     | ಮುಖ್ಯಪುಟ/navbar/footer UI (`website/i18n/en/code.json → .../<lang>/code.json`) ಅನ್ನು ಭಾಷಾಂತರಿಸಿ. |
| [`web_build`](#mt-web_build)                             | ಡಾಕ್ಸ್ ಅನ್ನು `website/build` ಗೆ ಕಟ್ಟಿರಿ (`--locales` / `BUILD_LOCALES` ಬೆಂಬಲಿಸುತ್ತದೆ).           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ಆಫ್‌ಲೈನ್‑ಸೇಫ್ ಲಿಂಕ್ ಚೆಕ್ (ದೂರಸ್ಥ HTTP[S] ಅನ್ನು ತಪ್ಪಿಸುತ್ತದೆ).                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ಸ್ಥಳೀಯ gh‑pages ಪೂರ್ವವೀಕ್ಷಣೆ; 8080–8090 ನಲ್ಲಿ auto‑serve; ಐಚ್ಛಿಕ ಪರೀಕ್ಷೆ/ಲಿಂಕ್‑ಚೆಕ್.             |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ಅನ್ನು `gh-pages` ಬ್ರಾಂಚ್‌ಗೆ push ಮಾಡಿ.                                           |

ಆಯ್ಕೆಗಳ ವ್ಯಾಕರಣ

- ಆಯ್ಕೆಗಳನ್ನು ಪಾಸ್ ಮಾಡಲು `make <command> OPTS="…"` ಬಳಸಿ (ಉಲ್ಲೇಖ ಗುರುತು ಶಿಫಾರಸು). ಕೆಳಗಿನ ಪ್ರತಿಯೊಂದು ಗುರಿಯಲ್ಲೂ ಉದಾಹರಣೆಯ ಬಳಕೆ ತೋರಿಸಲಾಗಿದೆ.

--

-

#### ಸ್ಥಳೀಯತೆ build ಸಲಹೆಗಳು {#locale-build-tips}

- ಕೆಲವು localeಗಳನ್ನೇ build ಮಾಡಲು: `BUILD_LOCALES="en de"` ಸೆಟ್ ಮಾಡಿ ಅಥವಾ `OPTS="--locales en,de"` ಅನ್ನು web ಗುರಿಗಳಿಗೆ ಪಾಸ್ ಮಾಡಿ.
- ನಿರ್ದಿಷ್ಟ locale ಪೂರ್ವವೀಕ್ಷಣೆ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build ಮತ್ತು ಪ್ಯಾಕೇಜ್ {#build-and-package}

- ZIP‌ಗಳನ್ನು ಕಟ್ಟಿರಿ: `make pack`
- ರೆಪೊ root ನಲ್ಲಿ ATN ಮತ್ತು LOCAL ZIP‌ಗಳನ್ನು ಉತ್ಪಾದಿಸುತ್ತದೆ (ಕೈಯಾರೆ artifacts ಸಂಪಾದಿಸಬೇಡಿ)
- ಸಲಹೆ: ಪ್ಯಾಕೇಜಿಂಗ್ ಮಾಡುವ ಮೊದಲು `sources/manifest_ATN.json` ಹಾಗೂ `sources/manifest_LOCAL.json` ಎರಡರಲ್ಲೂ version ಅನ್ನು ನವೀಕರಿಸಿ
- ಕೈಯಾರೆ ಇನ್ಸ್ಟಾಲ್ (ಡೆವ್): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → ನಿರ್ಮಿತ ZIP ಆಯ್ಕೆಮಾಡಿ

---

### ಪರೀಕ್ಷೆ {#test}

- ಸಂಪೂರ್ಣ ಸೂಟ್: `make test` (Vitest)
- Coverage (ಐಚ್ಛಿಕ):
- `npm i -D @vitest/coverage-v8`
- `make test` ರನ್ ಮಾಡಿ; HTML ವರದಿಗಾಗಿ `coverage/index.html` ತೆರೆಯಿರಿ
- i18n ಮಾತ್ರ: `make test_i18n` (UI keys/placeholders/titles + ವೆಬ್‌ಸೈಟ್ ಪ್ರತಿ‑locale ಪ್ರತಿ‑ಡಾಕ್ parity with id/title/sidebar_label ಚೆಕ್‌ಗಳು)

---

### ದೋಷನಿವಾರಣೆ ಮತ್ತು ಲಾಗ್ಗಳು {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- runtime ನಲ್ಲಿ verbose logs ಟೊಗಲ್ ಮಾಡಿ:
- ಸಕ್ರಿಯಗೊಳಿಸಿ: `messenger.storage.local.set({ debug: true })`
- ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ: `messenger.storage.local.set({ debug: false })`
- ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಬರೆಯುವ/ಕಳುಹಿಸುವಾಗ ಲಾಗ್‌ಗಳು ಕಾಣಿಸುತ್ತವೆ

---

### ಡಾಕ್ಸ್ (ವೆಬ್‌ಸೈಟ್) {#docs-website}

- Dev server: `cd website && npm run start`
- ಸ್ಥಿರ ಸೈಟ್ build: `cd website && npm run build`
- Make ಸಮಾನಾರ್ಥಗಳು (ಅಕ್ಷರಕ್ರಮ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ಬಳಕೆ ಉದಾಹರಣೆಗಳು:
- EN ಮಾತ್ರ, ಪರೀಕ್ಷೆ/ಲಿಂಕ್‑ಚೆಕ್ ಬಿಟ್ಟು, push ಇಲ್ಲ: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ಎಲ್ಲಾ localeಗಳು, ಪರೀಕ್ಷೆ/ಲಿಂಕ್‑ಚೆಕ್ ಸಹಿತ, ನಂತರ push: `make web_build_local_preview && make web_push_github`
- ಪ್ರಕಟಿಸುವ ಮೊದಲು, ಆಫ್‌ಲೈನ್‑ಸೇಫ್ ಲಿಂಕ್ ಚೆಕ್ ಅನ್ನು ರನ್ ಮಾಡಿ: `make web_build_linkcheck`.
- i18n: English `website/docs/*.md` ನಲ್ಲಿ; German ಭಾಷಾಂತರಗಳು `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ನಲ್ಲಿ
- ಹುಡುಕಾಟ: CI ನಲ್ಲಿ Algolia DocSearch env var‌ಗಳು ಸೆಟ್ ಇದ್ದರೆ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), ಸೈಟ್ Algolia ಹುಡುಕಾಟವನ್ನು ಬಳಸುತ್ತದೆ; ಇಲ್ಲದಿದ್ದರೆ ಸ್ಥಳೀಯ ಹುಡುಕಾಟಕ್ಕೆ ಬಿದ್ದುಕೊಳ್ಳುತ್ತದೆ. ಮುಖ್ಯಪುಟದಲ್ಲಿ, ಹುಡುಕಾಟ ಬಾಕ್ಸ್ ತೆರೆಯಲು `/` ಅಥವಾ `Ctrl+K` ಒತ್ತಿರಿ.

---

#### ದಾನ ಮರುನಿರ್ದೇಶನ ಮಾರ್ಗ {#donate-redirect}

- `website/src/pages/donate.js`
- ಮಾರ್ಗ: `/donate` (ಮತ್ತು `/<locale>/donate`)
- ವರ್ತನೆ:
- ಪ್ರಸ್ತುತ ಮಾರ್ಗದಲ್ಲಿ locale ಇದ್ದರೆ (ಉದಾ., `/de/donate`), ಅದನ್ನೇ ಬಳಸಿ
- ಇಲ್ಲದಿದ್ದರೆ, `navigator.languages` ವಿರುದ್ದ ಕಾನ್ಫಿಗರ್ ಮಾಡಿದ localeಗಳಿಂದ ಉತ್ತಮ ಹೊಂದಿಕೆಯನ್ನು ಆರಿಸಿ; ಡೀಫಾಲ್ಟ್ locale ಗೆ fallback ಆಗಿ
- ಮರುನಿರ್ದೇಶಿಸುವುದು:
- `en` → `/docs/donation`
- ಇತರೆ → `/<locale>/docs/donation`
- ಸರಿಯಾದ baseUrl ನಿರ್ವಹಣೆಗೆ `useBaseUrl` ಬಳಸುತ್ತದೆ
- ಪರ್ಯಾಯವಾಗಿ meta refresh + `noscript` ಲಿಂಕ್ ಒಳಗೊಂಡಿದೆ

---

---

#### ಪೂರ್ವವೀಕ್ಷಣೆ ಸಲಹೆಗಳು {#preview-tips}

- Node ಪೂರ್ವವೀಕ್ಷಣೆಯನ್ನು ಕ್ಲೀನ್ ಆಗಿ ನಿಲ್ಲಿಸಲು: `http://localhost:<port>/__stop` ತೆರೆಯಿರಿ (`Local server started` ನಂತರ ಮುದ್ರಿಸಲಾಗುತ್ತದೆ).
- ಚಿತ್ರಗಳು MDX/JSX ನಲ್ಲಿ ಲೋಡ್ ಆಗದಿದ್ದರೆ, ಸೈಟ್ `baseUrl` ಗೌರವಿಸಲು `useBaseUrl('/img/...')` ಬಳಸಿ.
- ಪೂರ್ವವೀಕ್ಷಣೆ ಮೊದಲು ಪ್ರಾರಂಭವಾಗುತ್ತದೆ; ಲಿಂಕ್ ಚೆಕ್ ನಂತರ ರನ್ ಆಗುತ್ತದೆ ಮತ್ತು non‑blocking (ಬ್ರೇಕನ್ ಬಾಹ್ಯ ಲಿಂಕ್‌ಗಳು ಪೂರ್ವವೀಕ್ಷಣೆಯನ್ನು ನಿಲ್ಲಿಸುವುದಿಲ್ಲ).
- ಉದಾಹರಣೆಯ ಪೂರ್ವವೀಕ್ಷಣೆ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” ನಂತರ ಮುದ್ರಿಸಲಾಗುತ್ತದೆ).
- ಲಿಂಕ್‑ಚೆಕ್‌ನಲ್ಲಿನ ಬಾಹ್ಯ ಲಿಂಕ್‌ಗಳು: ಕೆಲವು ಬಾಹ್ಯ ಸೈಟ್‌ಗಳು (ಉದಾ., addons.thunderbird.net) ಸ್ವಯಂಚಾಲಿತ ಕ್ರಾಲರ್‌ಗಳನ್ನು ತಡೆಯುತ್ತವೆ ಮತ್ತು ಲಿಂಕ್ ಚೆಕ್‌ಗಳಲ್ಲಿ 403 ತೋರಿಸಬಹುದು. ಪೂರ್ವವೀಕ್ಷಣೆ ಇನ್ನೂ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ; ಇವುಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸಲು ಸುರಕ್ಷಿತ.

---

#### ವೆಬ್‌ಸೈಟ್ ಅನ್ನು ಭಾಷಾಂತರಿಸಿ {#translate-website}

ನೀವು ಭಾಷಾಂತರಿಸಬಹುದಾದವು

- ಕೇವಲ ವೆಬ್‌ಸೈಟ್ UI: ಮುಖ್ಯಪುಟ, navbar, footer, ಮತ್ತು ಇತರ UI ಸ್ಟ್ರಿಂಗ್‌ಗಳು. ಡಾಕ್ಸ್ ವಿಷಯ ಈಗಾಗಲೆ ಇಂಗ್ಲಿಷ್‑ಮಾತ್ರವಾಗಿಯೇ ಇರುತ್ತದೆ.

ಎಲ್ಲಿ ಸಂಪಾದಿಸಬೇಕು

- `website/i18n/<locale>/code.json` ಸಂಪಾದಿಸಿ (`en` ಅನ್ನು ಸೂಚನೆಗಾಗಿ ಬಳಸಿ). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ಮುಂತಾದ placeholders‌ಗಳನ್ನು ಬದಲಾಯಿಸಬೇಡಿ.

ಫೈಲ್‌ಗಳನ್ನು ಸೃಜಿಸು ಅಥವಾ ರಿಫ್ರೆಶ್ ಮಾಡು

- ಎಲ್ಲಾ locale‌ಗಳಿಗೆ ಕೊರತೆಯ stubs ಸೃಜಿಸಿ: `npm --prefix website run i18n:stubs`
- ಇಂಗ್ಲಿಷ್‌ನಿಂದ stubs‌ಗಳನ್ನು ಮರುಬರೆಯಿರಿ (ಹೊಸ ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು ಸೇರಿಸಿದ ನಂತರ): `npm --prefix website run i18n:stubs:force`
- ಒಂದೇ locale‌ಗಾಗಿ ಪರ್ಯಾಯ: `npx --prefix website docusaurus write-translations --locale <locale>`

ಮುಖಪುಟ/navbar/footer UI ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು ಭಾಷಾಂತರಿಸಿ (OpenAI)

- ಒಮ್ಮೆ ಕ್ರೆಡೆನ್ಷಿಯಲ್‌ಗಳನ್ನು ಸೆಟ್ ಮಾಡಿ (shell ಅಥವಾ .env):
- `export OPENAI_API_KEY=sk-...`
- ಐಚ್ಛಿಕ: `export OPENAI_MODEL=gpt-4o-mini`
- ಒಮ್ಮೆಲೇ (ಎಲ್ಲಾ locale, en ಬಿಟ್ಟು): `make translate_web_index`
- ನಿರ್ದಿಷ್ಟ localeಗಳಿಗೆ ಮಿತಿ: `make translate_web_index OPTS="--locales de,fr"`
- ಈಗಿರುವ ಮೌಲ್ಯಗಳನ್ನು ಮರುಬರೆಯಿರಿ: `make translate_web_index OPTS="--force"`

ಮಾನ್ಯೀಕರಣ ಮತ್ತು ಮರುಪ್ರಯತ್ನಗಳು

- ಭಾಷಾಂತರ ಸ್ಕ್ರಿಪ್ಟ್ JSON ಆಕಾರವನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ, ಮಕ್ಕಳಿ‑ಬ್ರೇಸ್ placeholders‌ಗಳನ್ನು ಉಳಿಸುತ್ತದೆ, ಮತ್ತು URL‌ಗಳು ಬದಲಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತದೆ.
- ಮಾನ್ಯೀಕರಣ ವಿಫಲವಾದರೆ, ಅದು 2 ಬಾರಿ ವರ反馈ದೊಂದಿಗೆ ಮರುಪ್ರಯತ್ನಿಸುತ್ತದೆ; ನಂತರದ ಬಾರಿ ಈಗಿರುವ ಮೌಲ್ಯಗಳನ್ನು ಉಳಿಸುತ್ತದೆ.

ನಿಮ್ಮ locale ಅನ್ನು ಪೂರ್ವವೀಕ್ಷಿಸಿ

- Dev server: `npm --prefix website run start`
- ಇಲ್ಲಿ ಭೇಟಿ ನೀಡಿ: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

ಸಲ್ಲಿಸುವುದು

- ಸಂಪಾದಿಸಿದ `code.json` ಫೈಲ್(ಗಳು) ಜೊತೆಗೆ PR ತೆರೆಯಿರಿ. ಬದಲಾವಣೆಗಳನ್ನು ಕೇಂದ್ರೀಕರಿಸಿ ಇಡಿ ಮತ್ತು ಸಾಧ್ಯವಾದರೆ ತ್ವರಿತ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಸೇರಿಸಿ.

---

### ಸುರಕ್ಷತೆ ಮತ್ತು ಸಂರಚನಾ ಸಲಹೆಗಳು {#security-and-configuration-tips}

- `sources/manifest.json` ಅನ್ನು commit ಮಾಡಬೇಡಿ (ಬಿಲ್ಡ್ ತಾತ್ಕಾಲಿಕವಾಗಿ ಸೃಜಿಸುತ್ತದೆ)
- ಅಪ್‌ಡೇಟ್ ಚಾನಲ್ ಉಳಿಸಲು `browser_specific_settings.gecko.id` ಅನ್ನು ಸ್ಥಿರವಾಗಿ ಇಡಿ

---

### ಸೆಟ್ಟಿಂಗ್‌ಗಳ ಸ್ಥಿರತೆ {#settings-persistence}

- Storage: ಎಲ್ಲಾ ಬಳಕೆದಾರ ಸೆಟ್ಟಿಂಗ್‌ಗಳು `storage.local` ನಲ್ಲಿ ಇರುತ್ತವೆ ಮತ್ತು add‑on ಅಪ್‌ಡೇಟ್‌ಗಳಾದರೂ ಉಳಿಯುತ್ತವೆ.
- Install: ಒಂದು ಕೀ ನಿಖರವಾಗಿ ಅಪಸ್ಥಿತಿಯಲ್ಲಿದ್ದಾಗ (undefined) ಮಾತ್ರ ಡೀಫಾಲ್ಟ್‌ಗಳು ಅನ್ವಯಿಸುತ್ತವೆ.
- Update: migration ಕೇವಲ ಕಾಣೆಯಾದ ಕೀಗಳನ್ನು ತುಂಬುತ್ತದೆ; ಈಗಿರುವ ಮೌಲ್ಯಗಳನ್ನು ಎಂದಿಗೂ ಮರುಬರೆಯುವುದಿಲ್ಲ.
- Schema marker: `settingsVersion` (ಪ್ರಸ್ತುತ `1`).
- Keys ಮತ್ತು ಡೀಫಾಲ್ಟ್‌ಗಳು:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- ಕೋಡ್: `sources/background.js` → `initializeOrMigrateSettings()` ಮತ್ತು `SCHEMA_VERSION` ಅನ್ನು ನೋಡಿ.

ಡೆವ್ workflow (ಹೊಸ ಸೆಟ್ಟಿಂಗ್ ಸೇರಿಸುವುದು)

- `sources/background.js` ನಲ್ಲಿ `SCHEMA_VERSION` ಅನ್ನು ಹೆಚ್ಚಿಸಿ.
- ಹೊಸ ಕೀ + ಡೀಫಾಲ್ಟ್ ಅನ್ನು `initializeOrMigrateSettings()` ನಲ್ಲಿ `DEFAULTS` ಆಬ್ಜೆಕ್ಟ್‌ಗೆ ಸೇರಿಸಿ.
- ಡೀಫಾಲ್ಟ್‌ಗಳನ್ನು ಬೀಜಿಸುವಾಗ "only-if-undefined" ನಿಯಮವನ್ನು ಬಳಸಿ; ಈಗಿರುವ ಮೌಲ್ಯಗಳನ್ನು ಮರುಬರೆಯಬೇಡಿ.
- ಸೆಟ್ಟಿಂಗ್ ಬಳಕೆದಾರ‑ದೃಶ್ಯಮಾನವಾದರೆ, ಅದನ್ನು `sources/options.js` ನಲ್ಲಿ ವೈರ್ ಮಾಡಿ ಮತ್ತು ಸ್ಥಳೀಕೃತ ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು ಸೇರಿಸಿ.
- ಪರೀಕ್ಷೆಗಳನ್ನು ಸೇರಿಸಿ/ಹೊಂದಿಸಿ (`tests/background.settings.migration.test.js` ಅನ್ನು ನೋಡಿ).

ಕೈಯಾರೆ ಪರೀಕ್ಷಾ ಸಲಹೆಗಳು

- ಹೊಸ ಇನ್ಸ್ಟಾಲ್ ಅನ್ನು ಅನುಕರಿಸಲು: ಎಕ್ಸ್ಟೆನ್ಷನ್‌ನ ಡೇಟಾ ಡೈರಕ್ಟರಿ ಕ್ಲೀನ್ ಮಾಡಿ ಅಥವಾ ಹೊಸ ಪ್ರೊಫೈಲ್‌ನಿಂದ ಪ್ರಾರಂಭಿಸಿ.
- ಅಪ್‌ಡೇಟ್ ಅನ್ನು ಅನುಕರಿಸಲು: `storage.local` ನಲ್ಲಿ `settingsVersion` ಅನ್ನು `0` ಗೆ ಸೆಟ್ ಮಾಡಿ ಮತ್ತು ಮರು‑ಲೋಡ್ ಮಾಡಿ; ಈಗಿರುವ ಮೌಲ್ಯಗಳು ಬದಲಾಗದೇ ಇವೆ ಎಂಬುದನ್ನು ಮತ್ತು ಕೇವಲ ಕಾಣೆಯಾದ ಕೀಗಳು ಮಾತ್ರ ಸೇರಿಸಿರುವುದನ್ನು ದೃಢೀಕರಿಸಿ.

---

### ಸಮಸ್ಯಾ ಪರಿಹಾರ {#troubleshooting}

- Thunderbird 128 ESR ಅಥವಾ ನಂತರದ ಆವೃತ್ತಿಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ
- runtime ಸಮಸ್ಯೆಗಳಿಗೆ Error Console ಅನ್ನು ಬಳಸಿ
- ಸಂಗ್ರಹಿಸಿದ ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಸರಿಯಾಗಿ ಅನ್ವಯವಾಗದಂತೆ ತೋರುವುದಾದರೆ, Thunderbird ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ. (Thunderbird ಅವಧಿಗಳ ನಡುವೆ ಸ್ಥಿತಿಯನ್ನು cache ಮಾಡಬಹುದು; ಮರುಪ್ರಾರಂಭವು ಹೊಸ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಲೋಡ್ ಆಗುವಂತೆ ಮಾಡುತ್ತದೆ.)

---

### CI ಮತ್ತು Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest ಅನ್ನು coverage thresholds (85% lines/functions/branches/statements) ಜೊತೆಗೆ ರನ್ ಮಾಡುತ್ತದೆ. threshold‌ಗಳನ್ನು ತಲುಪದಿದ್ದರೆ, ಕೆಲಸ ವಿಫಲವಾಗುತ್ತದೆ.
- workflow HTML ವರದಿಯೊಂದಿಗೆ `coverage-html` artifact ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತದೆ; run ಪುಟದಿಂದ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (Actions → تازಾ run → Artifacts).

---

### ಕೊಡುಗೆ {#contributing}

- CONTRIBUTING.md ಅನ್ನು ಶಾಖೆ/commit/PR ಮಾರ್ಗಸೂಚಿಗಳಿಗಾಗಿ ನೋಡಿ
- ಸಲಹೆ: ದಿನನಿತ್ಯದ ಪ್ರೊಫೈಲ್‌ಗೆ ಪರಿಣಾಮ ಬೀರದಂತೆ ಪರೀಕ್ಷೆಗೆ ಪ್ರತ್ಯೇಕ Thunderbird ಡೆವಲಪ್‌ಮೆಂಟ್ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ.

---

### ಭಾಷಾಂತರಗಳು

- ದೊಡ್ಡ “all → all” ಭಾಷಾಂತರ ಕೆಲಸಗಳು ನಿಧಾನವಾಗಬಹುದು ಮತ್ತು ಖರ್ಚಾಗಬಹುದು. ಮೊದಲು ಒಂದು ಉಪಸಮೂಹದಿಂದ ಪ್ರಾರಂಭಿಸಿ (ಉದಾ., ಕೆಲವು ಡಾಕ್ಸ್ ಮತ್ತು 1–2 localeಗಳು), ಫಲಿತಾಂಶವನ್ನು ಪರಿಶೀಲಿಸಿ, ನಂತರ ವಿಸ್ತರಿಸಿ.

---

- ಮರುಪ್ರಯತ್ನ ನೀತಿ: ಭಾಷಾಂತರ ಕೆಲಸಗಳು API ದೋಷಗಳಲ್ಲಿ ಅತ್ಯಧಿಕ 3 ಮರುಪ್ರಯತ್ನಗಳನ್ನು ಘಾತಾಂಕೀಯ backoff ಜೊತೆಗೆ ನಿರ್ವಹಿಸುತ್ತವೆ; `scripts/translate_web_docs_batch.js` ಮತ್ತು `scripts/translate_web_docs_sync.js` ನೋಡಿ.

ಡಾಕ್ಸ್‌ಗಾಗಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು

- ಚಿತ್ರಗಳನ್ನು `website/static/img/` ಅಡಿಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಿ.
- ಅವನ್ನು MD/MDX ನಲ್ಲಿ `useBaseUrl('/img/<filename>')` ಮೂಲಕ ಉಲ್ಲೇಖಿಸಿ ಹೀಗಾಗಿ ಪಾತ್‌ಗಳು ಸೈಟ್ `baseUrl` ಜೊತೆಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ.
- `website/static/img/` ಅಡಿಯಲ್ಲಿ ಚಿತ್ರಗಳನ್ನು ಸೇರಿಸಿದ ನಂತರ ಅಥವಾ ಮರುಹೆಸರಿಸಿದ ನಂತರ, ಎಲ್ಲಾ ಉಲ್ಲೇಖಗಳು ಇನ್ನೂ `useBaseUrl('/img/…')` ಬಳಸುತ್ತಿರುವುದನ್ನು ಮತ್ತು ಸ್ಥಳೀಯ ಪೂರ್ವವೀಕ್ಷಣದಲ್ಲಿ ರೆಂಡರ್ ಆಗುತ್ತಿರುವುದನ್ನು ದೃಢೀಕರಿಸಿ.
  ಫೇವಿಕಾನ್‌ಗಳು

- ಬಹು‑ಗಾತ್ರದ `favicon.ico` ಅನ್ನು ಎಲ್ಲಾ build ಮಾರ್ಗಗಳಲ್ಲಿ (Make + scripts) `website/scripts/build-favicon.mjs` ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಲಾಗುತ್ತದೆ.
- ಯಾವುದೇ ಕೈಯಾರೆ ಹೆಜ್ಜೆ ಅಗತ್ಯವಿಲ್ಲ; `icon-*.png` ಅನ್ನು ನವೀಕರಿಸುವುದೇ ಸಾಕು.
  ಪರಿಶೀಲನೆ ಸಲಹೆ

- ಭಾಷಾಂತರಿತ ಡಾಕ್ಸ್‌ಗಳಲ್ಲಿ front‑matter `id` ಅನ್ನು ಬದಲಾಯಿಸಬೇಡಿ; ಇದ್ದಲ್ಲಿ ಕೇವಲ `title` ಮತ್ತು `sidebar_label` ಅನ್ನು ಭಾಷಾಂತರಿಸಿ.

#### clean {#mt-clean}

- ಉದ್ದೇಶ: ಸ್ಥಳೀಯ build/preview ಆರ್ಕಿಫ್ಯಾಕ್ಟ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕುವುದು.
- ಬಳಕೆ: `make clean`
- ತೆಗೆದುಹಾಕುವುದು (ಇದ್ದರೆ):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ಉದ್ದೇಶ: ಫಾರ್ಮಾಟ್, ಪರೀಕ್ಷೆ, changelog ನವೀಕರಿಸಿ, commit ಮಾಡಿ ಮತ್ತು push ಮಾಡಿ.
- ಬಳಕೆ: `make commit`
- ವಿವರಗಳು: Prettier (write), `make test`, `make test_i18n` ರನ್ ಮಾಡುತ್ತದೆ; staged ವಿಭಿನ್ನತೆಗಳಿದ್ದರೆ changelog ಸೇರಿಸುತ್ತದೆ; `origin/<branch>` ಗೆ push ಮಾಡುತ್ತದೆ.

---

#### eslint {#mt-eslint}

- ಉದ್ದೇಶ: flat config ಮೂಲಕ ESLint ಅನ್ನು ರನ್ ಮಾಡುವುದು.
- ಬಳಕೆ: `make eslint`

---

#### help {#mt-help}

- ಉದ್ದೇಶ: ಒಂದೇ ಸಾಲಿನ ಡಾಕ್ಸ್ ಜೊತೆಗೆ ಎಲ್ಲಾ ಗುರಿಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುವುದು.
- ಬಳಕೆ: `make help`

---

#### lint {#mt-lint}

- ಉದ್ದೇಶ: `web-ext` ಬಳಸಿ MailExtension ಅನ್ನು lint ಮಾಡುವುದು.
- ಬಳಕೆ: `make lint`
- ಟಿಪ್ಪಣಿಗಳು: ತಾತ್ಕಾಲಿಕವಾಗಿ `sources/manifest_LOCAL.json` → `sources/manifest.json` ಕಾಪಿ ಮಾಡುತ್ತದೆ; ನಿರ್ಮಿತ ZIP‌ಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ; ಎಚ್ಚರಿಕೆಗಳು ಪೈಪ್‌ಲೈನ್ ಅನ್ನು ವಿಫಲಗೊಳಿಸುವುದಿಲ್ಲ.

---

#### menu {#mt-menu}

- ಉದ್ದೇಶ: Make ಗುರಿ ಮತ್ತು ಐಚ್ಛಿಕ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳನ್ನು ಆಯ್ಕೆಮಾಡಲು ಸಂವಹನಾತ್ಮಕ ಮೆನು.
- ಬಳಕೆ: ಯಾವುದೇ ಆರ್ಗ್ಯುಮೆಂಟ್‌ಗಳಿಲ್ಲದೇ `make` ರನ್ ಮಾಡಿ.
- ಟಿಪ್ಪಣಿಗಳು: `whiptail` ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ, ಮೆನು `make help` ಗೆ fallback ಆಗುತ್ತದೆ.

---

#### pack {#mt-pack}

- ಉದ್ದೇಶ: ATN ಮತ್ತು LOCAL ZIP‌ಗಳನ್ನು ಕಟ್ಟುವುದು (`lint` ಮೇಲೆ ಅವಲಂಬಿತ).
- ಬಳಕೆ: `make pack`
- ಸಲಹೆ: ಪ್ಯಾಕೇಜಿಂಗ್ ಮಾಡುವ ಮೊದಲು `sources/manifest_*.json` ಎರಡರಲ್ಲೂ versions ಅನ್ನು bump ಮಾಡಿ.

---

#### prettier {#mt-prettier}

- ಉದ್ದೇಶ: ರೆಪೊವನ್ನು ಸ್ಥಳದಲ್ಲೇ ಫಾರ್ಮಾಟ್ ಮಾಡುವುದು.
- ಬಳಕೆ: `make prettier`

#### prettier_check {#mt-prettier_check}

- ಉದ್ದೇಶ: ಫಾರ್ಮ್ಯಾಟಿಂಗ್ ಪರಿಶೀಲನೆ (ಬರಹವಿಲ್ಲ).
- ಬಳಕೆ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ಉದ್ದೇಶ: `prettier` ಗಾಗಿ ಅಲಿಯಾಸ್.
- ಬಳಕೆ: `make prettier_write`

---

#### test {#mt-test}

- ಉದ್ದೇಶ: Prettier (write), ESLint, ನಂತರ Vitest (ಇನ್ಸ್ಟಾಲ್ ಮಾಡಿದರೆ coverage) ರನ್ ಮಾಡುವುದು.
- ಬಳಕೆ: `make test`

#### test_i18n {#mt-test_i18n}

- ಉದ್ದೇಶ: add‑on ಸ್ಟ್ರಿಂಗ್‌ಗಳು ಮತ್ತು ವೆಬ್‌ಸೈಟ್ ಡಾಕ್ಸ್‌ಗಳ i18n‑ಕೇಂದ್ರೀತ ಪರೀಕ್ಷೆಗಳು.
- ಬಳಕೆ: `make test_i18n`
- ರನ್ ಮಾಡುವುದು: `npm run test:i18n` ಮತ್ತು `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- ಉದ್ದೇಶ: EN ನಿಂದ ಇತರ locale‌ಗಳಿಗೆ add‑on UI ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು ಭಾಷಾಂತರಿಸುವುದು.
- ಬಳಕೆ: `make translation_app OPTS="--locales all|de,fr"`
- ಟಿಪ್ಪಣಿಗಳು: ಕೀ ರಚನೆ ಮತ್ತು placeholders‌ಗಳನ್ನು ಉಳಿಸುತ್ತದೆ; `translation_app.log` ಗೆ ಲಾಗ್ ಮಾಡುತ್ತದೆ. ಸ್ಕ್ರಿಪ್ಟ್ ರೂಪ: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ಉದ್ದೇಶ: ವೆಬ್‌ಸೈಟ್ ಡಾಕ್ಸ್‌ಗಳನ್ನು `website/docs/*.md` ನಿಂದ `website/i18n/<locale>/...` ಗೆ ಭಾಷಾಂತರಿಸುವುದು.
- ಶಿಫಾರಸು: `translate_web_docs_batch` (OpenAI Batch API)
  - ಬಳಕೆ (ಫ್ಲಾಗ್‌ಗಳು): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ಪಾರಂಪರಿಕ positional ಇನ್ನೂ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ: `OPTS="<doc|all> <lang|all>"`
- ವರ್ತನೆ: JSONL ನಿರ್ಮಿಸುತ್ತದೆ, ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತದೆ, ಪ್ರತೀ 30s ಗೆ ಪೋಲ್ ಮಾಡುತ್ತದೆ, ಫಲಿತಾಂಶಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡುತ್ತದೆ, ಫೈಲ್‌ಗಳನ್ನು ಬರೆಯುತ್ತದೆ.
- ಟಿಪ್ಪಣಿ: ಬ್ಯಾಚ್ ಕೆಲಸ ಪೂರ್ಣಗೊಳ್ಳಲು 24 ಗಂಟೆಗಳವರೆಗೆ ತೆಗೆದುಕೊಳ್ಳಬಹುದು (OpenAI’s batch window ಪ್ರಕಾರ). ಪ್ರತೀ ಪೋಲ್‌ನಲ್ಲಿ ಕಾನ್ಸೋಲ್‌ನಲ್ಲಿ ಕಳೆದ ಸಮಯ ತೋರಿಸಲಾಗುತ್ತದೆ.
- Env: `OPENAI_API_KEY` (ಅಗತ್ಯ), ಐಚ್ಛಿಕ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ಡೀಫಾಲ್ಟ್ 24h), `BATCH_POLL_INTERVAL_MS`.
- ಪಾರಂಪರಿಕ: `translate_web_docs_sync`
  - ಬಳಕೆ (ಫ್ಲಾಗ್‌ಗಳು): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ಪಾರಂಪರಿಕ positional ಇನ್ನೂ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ: `OPTS="<doc|all> <lang|all>"`
- ವರ್ತನೆ: synchronous per‑pair ವಿನಂತಿಗಳು (ಯಾವುದೇ ಬ್ಯಾಚ್ ಸಮಾಗ್ರಿಕರಣವಿಲ್ಲ).
- ಟಿಪ್ಪಣಿಗಳು: `OPTS` ಕೈಬಿಟ್ಟಾಗ ಸಂವಹನಾತ್ಮಕ ಪ್ರಾಂಪ್ಟ್‌ಗಳು. ಎರಡೂ ಮೋಡ್‌ಗಳು code blocks/inline code ಅನ್ನು ಉಳಿಸುತ್ತವೆ ಮತ್ತು front‑matter `id` ಬದಲಾಗದಂತೆ ಇಡುತ್ತವೆ; `translation_web_batch.log` (batch) ಅಥವಾ `translation_web_sync.log` (sync) ಗೆ ಲಾಗ್ ಮಾಡುತ್ತದೆ.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ಉದ್ದೇಶ: ವೆಬ್‌ಸೈಟ್ UI ಸ್ಟ್ರಿಂಗ್‌ಗಳನ್ನು (ಮುಖ್ಯಪುಟ, navbar, footer) `website/i18n/en/code.json` ನಿಂದ `website/i18n/<locale>/code.json` ಅಡಿಯಲ್ಲಿ ಎಲ್ಲಾ locale‌ಗಳಿಗೆ (`en` ಹೊರತುಪಡಿಸಿ) ಭಾಷಾಂತರಿಸುವುದು.
- ಬಳಕೆ: `make translate_web_index` ಅಥವಾ `make translate_web_index OPTS="--locales de,fr [--force]"`
- ಅಗತ್ಯವಸ್ತುಗಳು: `OPENAI_API_KEY` export ಮಾಡಿ (ಐಚ್ಛಿಕ: `OPENAI_MODEL=gpt-4o-mini`).
- ವರ್ತನೆ: JSON ರಚನೆ ಪರಿಶೀಲಿಸುತ್ತದೆ, ಮಕ್ಕಳಿ‑ಬ್ರೇಸ್ placeholders‌ಗಳನ್ನು ಉಳಿಸುತ್ತದೆ, URL‌ಗಳನ್ನು ಬದಲಾಯಿಸುವುದಿಲ್ಲ, ಮತ್ತು ಮಾನ್ಯೀಕರಣ ದೋಷಗಳ ಮೇಲೆ feedback ಜೊತೆಗೆ ಮರುಪ್ರಯತ್ನಿಸುತ್ತದೆ.

---

#### web_build {#mt-web_build}

- ಉದ್ದೇಶ: ಡಾಕ್ಸ್ ಸೈಟ್ ಅನ್ನು `website/build` ಗೆ ಕಟ್ಟುವುದು.
- ಬಳಕೆ: `make web_build OPTS="--locales en|de,en|all"` (ಅಥವಾ `BUILD_LOCALES="en de"` ಸೆಟ್ ಮಾಡಿ)
- ಒಳಾಂಗಿಕ: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- ಅವಲಂಬನೆಗಳು: `website/node_modules/@docusaurus` ಕಾಣೆಯಾದರೆ ಮಾತ್ರ `website/` ನಲ್ಲಿ `npm ci` ರನ್ ಮಾಡುತ್ತದೆ.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ಉದ್ದೇಶ: ಆಫ್‌ಲೈನ್‑ಸೇಫ್ ಲಿಂಕ್ ಚೆಕ್.
- ಬಳಕೆ: `make web_build_linkcheck OPTS="--locales en|all"`
- ಟಿಪ್ಪಣಿಗಳು: `tmp_linkcheck_web_pages` ಗೆ build ಮಾಡುತ್ತದೆ; GH Pages `baseUrl` ಅನ್ನು `/` ಗೆ ಮರುಬರೆಯುತ್ತದೆ; ದೂರಸ್ಥ HTTP(S) ಲಿಂಕ್‌ಗಳನ್ನು ತಪ್ಪಿಸುತ್ತದೆ.

#### web_build_local_preview {#mt-web_build_local_preview}

- ಉದ್ದೇಶ: ಐಚ್ಛಿಕ ಪರೀಕ್ಷೆ/ಲಿಂಕ್‑ಚೆಕ್ ಸಹಿತ ಸ್ಥಳೀಯ gh‑pages ಪೂರ್ವವೀಕ್ಷಣೆ.
- ಬಳಕೆ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ವರ್ತನೆ: ಮೊದಲು Node ಪೂರ್ವವೀಕ್ಷಣೆ ಸರ್ವರ್ ಪ್ರಯತ್ನಿಸುತ್ತದೆ (`scripts/preview-server.mjs`, `/__stop` ಬೆಂಬಲಿಸುತ್ತದೆ), fallback `python3 -m http.server`; 8080–8090 ನಲ್ಲಿ serve; PID `web-local-preview/.server.pid` ನಲ್ಲಿ.

#### web_push_github {#mt-web_push_github}

- ಉದ್ದೇಶ: `website/build` ಅನ್ನು `gh-pages` ಬ್ರಾಂಚ್‌ಗೆ push ಮಾಡುವುದು.
- ಬಳಕೆ: `make web_push_github`

ಸಲಹೆ: Makefile ಬಳಸುವ ಪ್ಯಾಕೇಜ್ ಮ್ಯಾನೇಜರ್ ಅನ್ನು override ಮಾಡಲು `NPM=…` ಸೆಟ್ ಮಾಡಿ (ಡೀಫಾಲ್ಟ್ `npm` ಆಗಿದೆ).

---
