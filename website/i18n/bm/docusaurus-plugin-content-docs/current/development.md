---
id: development
title: 'Dɛvɛlopimɛ'
sidebar_label: 'Ɲɛtaa'
---

---

## Gidiki dɛnɛkɛla {#development-guide}

:::note Ka sɛbɛnɛlen English kelen de; tarikɛli bɛ ta fɛ
Ka dɔkumenti minnu bɛ yen bɛɛ sɛbɛn kɔnɔ `website/docs` (English) dɔ. Tarikɛliw minnu bɛ yen `website/i18n/<locale>/…` kɔfɛ bɛ ɲɛgɛnna, o kɔfɛ ma na ka kɛ sɛbɛnna dɔni dɔ. Ka tarikɛli min (misali, `make translate_web_docs_batch`) ka na ka bɛɛ sɛbɛnna kɛnɛ ye.
:::

### Kɔfɛw (Prerequisites) {#prerequisites}

- Node.js 22+ ni npm (a tɛstɛ ka done Node 22 kɔfɛ)
- Thunderbird 128 ESR walima kɔrɔsen dɔ (manu sɛgɛsɛgɛ tɛstila walasa)

---

### Projekiti lajɔ (high‑level) {#project-layout-high-level}

- Root: pakajiŋ scripiti `distribution_zip_packer.sh`, dɔkumentiw, sikanjɛw
- `sources/`: add‑on bɛɛ bɔ (background, options/popup UI, manifests, icons)
- `tests/`: Vitest sɛgɛsɛgɛw
- `website/`: Docusaurus dɔkumentiw (i18n bɛ yen `website/i18n/de/...` kɔfɛ)

---

### Sɛbɛnni ni Jalakɛlaw {#install-and-tooling}

- Sɛbɛn root dependencies: `npm ci`
- Dɔkumentiw (tɔɔrɔ bɛɛ min ye): `cd website && npm ci`
- Ka targetw sɔrɔ: `make help`

---

### Live dɛnɛkɛla (web‑ext run) {#live-dev-web-ext}

- Siraba kɔrɔ kɔrɔ Firefox Desktop la (UI smoke‑tests kelen de):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Ka kalan Thunderbird la (MailExtensions na ye ka da la):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Dɛmɛcogo:
- Ka Thunderbird Error Console bɔ minɛn (Tools → Developer Tools → Error Console).
- MV3 event pages bɛ na kɔrɔ kɔrɔ sɔn ka taa sisan sisan; ka add‑on yɔrɔ kɔlɔsili a bɛɛ lajɛ ka code bɛ yenna ko dɔ, walima bɔ web‑ext ka a ye auto‑reload kɛ.
- Firefox kelen de ka hakɛw dɔ bɛ kɛ dɔrɔn ye; ka a fɛɛrɛ kelen kelen Thunderbird la walasa API ye bɛnni kɛ.
- Thunderbird binary pathw (misaliw):
- Linux: `thunderbird` (misali, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profile jɛlajɛli: Ka Thunderbird profile dɔ bɛɛ yera dɛnɛkɛla walasa a ma i ɲɔgɔn dɔ ka tɛ i sariya kelen kan.

---

### Make Targetw (a ka sugu fɛ) {#make-targets-alphabetical}

Makefile bɛ ka dɛnɛkɛla baaraw caman ɲɛtaa kɛlen ma. Ka `make help` kalan waati bɛɛ walasa ka target bɛɛ jɛkaba dɔ fɔlɔ min na.

Dɛmɛcogo: `make` ka kalan bila target fɔ ko tɛ bɛ bɔ Whiptail menu dɔ ɲɛrɛrɛ walasa ka target dɔ minɛn.

| Target                                                   | Jɛkaba dɔ fɔlɔ                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ka buildu/preview local artefactiw jiri (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | Ka format kɛ, ka tɛstiw kɛ (i18n dɔrɔn kɔnɔ), ka changelog yen, ka commit kɛ & push kɛ.     |
| [`eslint`](#mt-eslint)                                   | Ka ESLint kɛ flat config kɔnɔ (`npm run -s lint:eslint`).                                   |
| [`help`](#mt-help)                                       | Ka targetw bɛɛ lajɛ kɔfɛ jɛkaba dɔ fɔlɔ (a ka sugu fɛ).                                     |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/` kan (manifest tɛmɛna; ZIPw yamaruya; ka a ma yɔrɔ bɔ fɛ).           |
| [`menu`](#mt-menu)                                       | Menu ɲɛrɛrɛ walasa ka target dɔ fila ka filennen ni arguumenti minnu ye.                    |
| [`pack`](#mt-pack)                                       | Ka ATN & LOCAL ZIPw sɔrɔ (linter bɛ na; packer script bɛ na).                               |
| [`prettier`](#mt-prettier)                               | Ka repository format kɛ kɔnɔ (ka yɔrɔw bɔ).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier check mode la (ka yɔrɔw ma bɔ); bɛ ban ka a taara ni format bɛ se ka yɛlɛma.       |
| [`prettier_write`](#mt-prettier_write)                   | Alias `prettier` ma.                                                                        |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, o kɔfɛ Vitest (coverage ni a sɔrɔ).                               |
| [`test_i18n`](#mt-test_i18n)                             | i18n dɔrɔn tɛstiw: add‑on placeholders/parity + website parity.                             |
| [`translate_app`](#mt-translation-app)                   | Alias `translation_app` ma.                                                                 |
| [`translation_app`](#mt-translation-app)                 | Ka app UI sɔrɔbaw tarikɛli `sources/_locales/en/messages.json` kɔfɛ.                        |
| [`translate_web_docs_batch`](#mt-translation-web)        | Ka website dɔkumentiw tarikɛli OpenAI Batch API la (na ye ka da).                           |
| [`translate_web_docs_sync`](#mt-translation-web)         | Ka website dɔkumentiw tarikɛli kelen kelen (kɔrɔ, batch tɛ).                                |
| [`translate_web_index`](#mt-translation_web_index)       | Alias `translation_web_index` ma.                                                           |
| [`translation_web_index`](#mt-translation_web_index)     | Ka homepage/navbar/footer UI tarikɛli (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Ka dɔkumentiw build kɛ `website/build` kɔfɛ (bɛ na `--locales` / `BUILD_LOCALES` dɛmɛ).     |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Link check offline‑safe (HTTP[S] dyɛlila minnu tɛ sɔrɔ).                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Local gh‑pages preview; auto‑serve 8080–8090 kan; tɛsti/link‑check tɔɔrɔ ye.                |
| [`web_push_github`](#mt-web_push_github)                 | Ka `website/build` push kɛ `gh-pages` branch kɔfɛ.                                          |

Options la sigicogo

- `make <command> OPTS="…"` bɛ ka options fɔ (quotes bɛ se ka bɛɛ). Targetw minnu bɛ kɔnɔ bɛ bɔ misali jate.

--

-

#### Locale build dɛmɛcogo {#locale-build-tips}

- Ka locale dɔw dɔ build dɔ: ka `BUILD_LOCALES="en de"` sɛbɛn walima ka `OPTS="--locales en,de"` fara web targetw kan.
- Locale dɔ min dɔ ka lajɛ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Pakajiŋ {#build-and-package}

- ZIPw build: `make pack`
- ATN ni LOCAL ZIPw bɛ bɛɛ na repo root kɔnɔ (i ma na artisɛtiw ɲɛnabɔ kɛ ka sɛbɛnna dɔ)
- Dɛmɛcogo: ka version yelema `sources/manifest_ATN.json` ni `sources/manifest_LOCAL.json` kɔnɔ kɔfɛ sisan ka pakajiŋ kɛra.
- Sɛbɛn manu (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → ka ZIP sɔrɔbaw lajɛ min bɛ build kɔnɔ

---

### Tɛsti {#test}

- Suite bɛɛ: `make test` (Vitest)
- Coverage (tɔɔrɔ ye):
- `npm i -D @vitest/coverage-v8`
- `make test` ka kalan; `coverage/index.html` bɔ walasa HTML rapɔri na
- i18n dɔrɔn: `make test_i18n` (UI keyw/placeholders/titles + website per‑locale per‑doc parity ni id/title/sidebar_label checkw)

---

### Debugging ni Logw {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Ka logw jɔ yɔrɔcogo bɔ waati la:
- Ka kunnafoni: `messenger.storage.local.set({ debug: true })`
- Ka ka ladilan: `messenger.storage.local.set({ debug: false })`
- Logw bɛ bɔ waati min na i bɛ de kɛ ka ɲɛsin ni ka a labɔ

---

### Dɔkumentiw (website) {#docs-website}

- Dev server: `cd website && npm run start`
- Ka site stati kɛ: `cd website && npm run build`
- Make ka nyininw (a ka sugu fɛ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Jate misaliw:
- EN dɔ kelen de, ka tɛsti/link‑check ka taa, push tɛ: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Locale bɛɛ, ka tɛsti/link‑check kɛ, o kɔfɛ ka push: `make web_build_local_preview && make web_push_github`
- Ka bɔra kɔfɛ ko bɛɛ na, ka link check offline‑safe kɛ: `make web_build_linkcheck`.
- i18n: English bɛ yen `website/docs/*.md` kɔfɛ; Alemaŋ kan tarikɛliw bɛ yen `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Sɛrci: Ni Algolia DocSearch env variables bɛ CI kɔnɔ (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), site bɛ Algolia search ka bali; o tɛ, a bɛ segin local search la. Homepage kan, `/` walima `Ctrl+K` na ka search box bɔ.

---

#### Donate redirect route {#donate-redirect}

- `website/src/pages/donate.js`
- Route: `/donate` (ni `/<locale>/donate`)
- Ka kɛra la:
- Ni route min ka sisan bɛ locale dɔ na (misali, `/de/donate`), a bɛ a ye.
- O tɛ, ka ka ɲɛsin wɛrɛw `navigator.languages` ni localew sɛbɛnna la; ni o tɛ sɔrɔ, ka segin default locale ma.
- Bɛ ɲɔgɔn ye:
- `en` → `/docs/donation`
- wɛrɛw → `/<locale>/docs/donation`
- `useBaseUrl` bɛ na walasa baseUrl ka kɛ kɛnɛ ye
- Meta refresh bɛ kɔnɔ + `noscript` link bɛ yen sɛgɛsɛgɛ ma

---

---

#### Preview dɛmɛcogo {#preview-tips}

- Ka Node preview da kɛ kɛnɛ ye: ka `http://localhost:<port>/__stop` bɔ (a bɛ printi waati min na `Local server started`).
- Ni sikanjɛw tɛ bɔ MDX/JSX kɔnɔ, ka `useBaseUrl('/img/...')` bɔ walasa site `baseUrl` ka sɔn.
- Preview bɛ bɔ fɔlɔ; link check bɛ kɔfɛ bɔ kɔrɔ kɔrɔ ni o tɛ bɔ kɔfɛ (external linkw minnu bɛ tiɲɛ ɲɛ kɛra tɛ bɛ ɲininna preview ma).
- Preview URL misali: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (a bɛ printi waati min na “Local server started”).
- External linkw link‑check kɔnɔ: Sitew dɔw (misali, addons.thunderbird.net) bɛ ka bɛ kelenw sɔrɔbaliw farafinw dafa, o tun bɛ 403 lajɛ link check kɔnɔ. Preview bɛ bɔ kɔnɔ; i bɛ se ka o ɲɛfɔ kɔrɔw ɲininka.

---

#### Ka Website tarikɛli {#translate-website}

Fɛnw minnu i bɛ se ka tarikɛli

- Website UI dɔ kelen de: homepage, navbar, footer, ni UI sɔrɔbaw wɛrɛw. Dɔkumenti ɲɛfɔw bɛna sɛbɛn English kelen de sisan.

Fɛ min na ka sɛbɛn

- `website/i18n/<locale>/code.json` sɛbɛn (ka `en` dɔ ye na referensi ye). Ka placeholders minnu bɛ fɛ ka kɛ ni `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` i ma ɲɛnabɔ kɛ.

Ka fɛnw sɔrɔ walima ka kura kɛ

- Ka stubs minnu bɛ sɔrɔ bɛɛ sɔrɔ locale bɛɛ ma: `npm --prefix website run i18n:stubs`
- Ka stubs tɛma English kɔfɛ (sisan ni i tɛmɛna kalimen kura): `npm --prefix website run i18n:stubs:force`
- Alaŋɛrɛnika locale dɔ kelen de: `npx --prefix website docusaurus write-translations --locale <locale>`

Ka homepage/navbar/footer UI sɔrɔbaw tarikɛli (OpenAI)

- Ka credentials sɛbɛn kelen de (shell walima .env):
- `export OPENAI_API_KEY=sk-...`
- Tɔɔrɔ ye: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (locale bɛɛ, en tɛ bɛ bɔ): `make translate_web_index`
- Ka ɲɔgɔn ɲɛmɔgɔ dɔ la: `make translate_web_index OPTS="--locales de,fr"`
- Ka kɛ ka ka minnu bɛ yen yɔrɔw ɲɛlɛma: `make translate_web_index OPTS="--force"`

Valideyisɔni ni seginniw

- Tarikɛli script bɛ JSON shape validera, ka curly‑brace placeholders ɲini, ni ka URLw ma yelema.
- Valideyisɔni bɔra la, a bɛ segin 2 waati ɲɛmɔgɔ ni ɲɛfɔ kɔfɛ kɔ before ka minnu bɛ yen yɔrɔw daminɛ.

I ka locale lajɛ

- Dev server: `npm --prefix website run start`
- Ka taa `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Submitting

- Ka PR dɔ bɔ ni `code.json` faili(w) minnu i tɛmɛna. Ka yelemaw bɔ dɔgɔya, ka sikanjɛ ɲɛ na waati min bɛ se.

---

### Securite ni Kɔnfigurasi dɛmɛcogo {#security-and-configuration-tips}

- Ka `sources/manifest.json` ma commit kɛ (build bɛna a sɛbɛn waati dɔ kelen).
- Ka `browser_specific_settings.gecko.id` kɛ kelen kelen walasa update channel ka ɲɛfa.

---

### Settings jirali {#settings-persistence}

- Storage: Baraw bɛɛ minnu sɛbɛnna bɛ yen `storage.local` kɔnɔ, o bɛ taa add‑on updatew ɲa la.
- Install: Defaults bɛna kɛ waati min na key dɔ ɲɛsin fila (undefined).
- Update: Migration bɛ keyw minnu ɲɛsin dɔ fɔlɔ daminɛ kelen de; valuyɛw min bɛ yen tɛna yelema la.
- Schema marker: `settingsVersion` (sisan `1`).
- Keyw ni defaultw:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code: ɲininka `sources/background.js` → `initializeOrMigrateSettings()` ni `SCHEMA_VERSION`.

Dɛnɛkɛla baarakɛcogo (setting kura fara)

- Ka `SCHEMA_VERSION` bɔ `sources/background.js` kɔnɔ.
- Ka key kura + default ɲɛna `DEFAULTS` object kɔnɔ `initializeOrMigrateSettings()` la.
- Ka "only-if-undefined" sariyala bɔ waati min na defaultw bɛna ɲɛ; i ma na valuw min bɛ yen yɔrɔw ɲɛlɛma.
- Ni setting min na ka ɲɛsin ɲɛ na barakekelen kan, ka a ɲɛna `sources/options.js` kɔnɔ ni ka kalimew lokalize kɛ.
- Ka tɛstiw fara/tɛmɛ (ɲininka `tests/background.settings.migration.test.js`).

Manu tɛstila dɛmɛcogo

- Ka install kura ɲinin: ka extension data dir ka dɔn, walima ka profile kura ɲɛ.
- Ka update ɲinin: ka `settingsVersion` sɛbɛn `0` ma `storage.local` kɔnɔ o kɔfɛ ka re‑load; ka ɲini ka valuyɛw minnu bɛ yen ma yelema, keyw minnu ɲɛsin dɔ kelen de bɛna dɔ bɔ.

---

### Kɛnɛya sɔrɔyacogo {#troubleshooting}

- Ka kɛ kɛlen Thunderbird 128 ESR walima kɔrɔsen dɔ ye
- Error Console bɛ sɛgɛsɛgɛ baara waati la
- Ni settings minnu sɛbɛnna bɛ ɲininka ladilan, ka Thunderbird segin lajɛ ka segin na. (Thunderbird bɛ se ka ɲɔgɔn ɲɛ dɔ min na; ka segin lajɛ bɛ ma settings kura bɔ kɛnɛ ye.)

---

### CI ni Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) bɛ vitest kɛ ni coverage thresholdw (85% lines/functions/branches/statements). Ni thresholdw tɛ na, ka baara bɔ.
- Workflow bɛ artefact dɔ ɲɛ `coverage-html` ni HTML rapɔri la; ka a downloadi ka bɔ run paji kɔnɔ (Actions → run kɔfɛ kɔrɔ → Artifacts).

---

### Ka dɛmɛ (Contributing) {#contributing}

- Ka lajɛ CONTRIBUTING.md la branch/commit/PR sariyaw kɔfɛ
- Dɛmɛcogo: Ka Thunderbird development profile dɔ kelen kɛ tɛstila walasa a ma i ka profile sariya kelen kan ta.

---

### Tarikɛliw

- “all → all” tarikɛli baara kalanw bɛ kɔrɔbɔ ka sɔrɔ ni jamanadenw bɛɛ kɛ. Ka segin dɔgɔya (misali, dɔkumentiw dɔw ni locale 1–2), ka ɲɛsin a ka ɲɔgɔn, o kɔfɛ ka sɛbɛnni bɔ yen.

---

- Seginni sari: tarikɛli baaraw bɛ kɛ seginni 3 waati kɔfɛ ni API errorw bɛ na ni backoff (exponential); ɲininka `scripts/translate_web_docs_batch.js` ni `scripts/translate_web_docs_sync.js`.

Sikanjɛw walasa dɔkumentiw

- Ka sikanjɛw ji `website/static/img/` kɔnɔ.
- Ka a fɔ MD/MDX kɔnɔ ni `useBaseUrl('/img/<filename>')` walasa pathw bɛ na ka taa site `baseUrl` kan.
- Sisan ni i tɛmɛna walima sɔrɔbali la sikanjɛw `website/static/img/` kɔnɔ, ka ɲini ka referensi bɛɛ bɛ se ka `useBaseUrl('/img/…')` fɛ ni ka render kɛ local preview kɔnɔ.
  Favicons

- `favicon.ico` multi‑size bɛna ɲɛgɛnna automatique build path bɛɛ kɔnɔ (Make + scripitiw) `website/scripts/build-favicon.mjs` la.
- Sariya manu tɛ ɲɛ; `icon-*.png` yelema de bɛ na.

  Dɛmɛcogo walasa lajɛ

- Ka front‑matter `id` ma yelema dɔkumenti tarikɛli kɔnɔ; ka `title` ni `sidebar_label` dɔ de tarikɛli waati min bɛ yen.

#### clean {#mt-clean}

- Jatigi: ka buildu/preview artisɛtiw minnu bɛ yen yere la sini.
- Jate: `make clean`
- Bɛ jiri (ni a bɛ yen):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Jatigi: ka format kɛ, ka tɛsti kɛ, ka changelog yen, ka commit kɛ, ka push kɛ.
- Jate: `make commit`
- Dɛɲɔw: Prettier (write), `make test`, `make test_i18n` bɛ na; ka changelog ɲɛ fɔ waati min na staged diffs bɛ yen; ka push kɛ `origin/<branch>` ma.

---

#### eslint {#mt-eslint}

- Jatigi: ka ESLint kɛ flat config kɔnɔ.
- Jate: `make eslint`

---

#### help {#mt-help}

- Jatigi: ka targetw bɛɛ lajɛ ni jɛkaba dɔ fɔlɔ.
- Jate: `make help`

---

#### lint {#mt-lint}

- Jatigi: ka MailExtension lint kɛ `web-ext` bɔ.
- Jate: `make lint`
- Notew: ka `sources/manifest_LOCAL.json` tɛmɛna → `sources/manifest.json`; ZIPw minnu sɔrɔra bɛna kɛ yamaruya; warningw tɛ bɔ pipeline ma.

---

#### menu {#mt-menu}

- Jatigi: menu ɲɛrɛrɛ walasa ka Make target dɔ filennen ni arguamentiw tɔɔrɔ ye.
- Jate: ka `make` kalan bila arguamenti tɛ.
- Notew: ni `whiptail` tɛ sɔrɔ, menu bɛ segin `make help` ma.

---

#### pack {#mt-pack}

- Jatigi: ka ATN ni LOCAL ZIPw build kɛ (`lint` kan).
- Jate: `make pack`
- Dɛmɛcogo: ka versionw yelema `sources/manifest_*.json` kɔfɛ sisan ka pakajiŋ kɛ.

---

#### prettier {#mt-prettier}

- Jatigi: ka repo format kɛ kɔnɔ.
- Jate: `make prettier`

#### prettier_check {#mt-prettier_check}

- Jatigi: ka format verify kɛ (ka yɔrɔ ma bɔ).
- Jate: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Jatigi: alias `prettier` ma.
- Jate: `make prettier_write`

---

#### test {#mt-test}

- Jatigi: ka Prettier (write), ESLint, o kɔfɛ Vitest (coverage ni a sɔrɔ) kɛ.
- Jate: `make test`

#### test_i18n {#mt-test_i18n}

- Jatigi: i18n dɔrɔn tɛstiw add‑on kalimew ni website dɔkumentiw ma.
- Jate: `make test_i18n`
- Bɛ ka: `npm run test:i18n` ni `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Jatigi: ka add‑on UI kalimew tarikɛli EN kɔfɛ ka a taa locale wɛrɛw ma.
- Jate: `make translation_app OPTS="--locales all|de,fr"`
- Notew: key structure ni placeholders bɛna ɲɛ; logw bɛna `translation_app.log` ma. Scripiti ɲɛ: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Jatigi: ka website dɔkumentiw tarikɛli `website/docs/*.md` kɔfɛ ka taa `website/i18n/<locale>/...` ma.
- Nafɔ bɛ se: `translate_web_docs_batch` (OpenAI Batch API)
  - Jate (flagiw): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional tɛna ka ɲɛ: `OPTS="<doc|all> <lang|all>"`
- Ka kɛra la: ka JSONL buildi, ka uploadi, ka polli 30s kɔfɛ kɔrɔ kɔrɔ, ka resultw downloadi, ka faili sɛbɛn.
- Note: batch baara dɔ bɛ se ka taa 24 waati kɔfɛ (OpenAI batch window ma). Console bɛ na waati min bɛ ban kɔrɔ kɔrɔ ni a bɛ polli.
- Env: `OPENAI_API_KEY` (dɔrɔn), tɔɔrɔw ye `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Jate (flagiw): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional tɛna ka ɲɛ: `OPTS="<doc|all> <lang|all>"`
- Ka kɛra la: requestw kelen kelen per‑pair (batch aggregation tɛ).
- Notew: Ka promptu ɲɛrɛrɛ bɛ bɔ waati min na `OPTS` tɛ. Modew bɛɛ bɛ na ka code blockw/inline codew ɲini ni ka front‑matter `id` ma yelema; logw bɛna `translation_web_batch.log` (batch) walima `translation_web_sync.log` (sync) ma.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Jatigi: ka website UI kalimew tarikɛli (homepage, navbar, footer) `website/i18n/en/code.json` kɔfɛ ka taa locale bɛɛ ma `website/i18n/<locale>/code.json` kɔnɔ (`en` na min tɛ).
- Jate: `make translate_web_index` walima `make translate_web_index OPTS="--locales de,fr [--force]"`
- Baara kɔfɛw: ka `OPENAI_API_KEY` exporti (tɔɔrɔ ye: `OPENAI_MODEL=gpt-4o-mini`).
- Ka kɛra la: ka JSON structure validate kɛ, ka curly‑brace placeholders ɲini, ka URLw ma yelema, ka segin kɛ ɲɛfɔ kɔfɛ walasa validasɔni errorw ma.

---

#### web_build {#mt-web_build}

- Jatigi: ka dɔkumentiw site build kɛ `website/build` ma.
- Jate: `make web_build OPTS="--locales en|de,en|all"` (walima ka `BUILD_LOCALES="en de"` sɛbɛn)
- Kɔnɔko: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dɛmɛw: `npm ci` bɛna kɛ `website/` kɔnɔ kelen de ni `website/node_modules/@docusaurus` tɛ sɔrɔ.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Jatigi: link check offline‑safe.
- Jate: `make web_build_linkcheck OPTS="--locales en|all"`
- Notew: build bɛ `tmp_linkcheck_web_pages` ma; bɛ GH Pages `baseUrl` sɛbɛn `/` ma; HTTP(S) linkw dɔrɔn tɛ ɲinina.

#### web_build_local_preview {#mt-web_build_local_preview}

- Jatigi: local gh‑pages preview ni tɛsti/link‑check tɔɔrɔ ye.
- Jate: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ka kɛra la: bɛ se ka Node preview server dɔ fɔlɔ (`scripts/preview-server.mjs`, bɛ na `/__stop` dɛmɛ), ni o tɛ, bɛ segin `python3 -m http.server` ma; bɛna serve 8080–8090 kan; PID bɛ `web-local-preview/.server.pid` kɔnɔ.

#### web_push_github {#mt-web_push_github}

- Jatigi: ka `website/build` push kɛ `gh-pages` branch ma.
- Jate: `make web_push_github`

Dɛmɛcogo: ka `NPM=…` sɛbɛn walasa ka package manager min Makefile bɛ na kɛ ɲɛlɛma (default `npm`).
