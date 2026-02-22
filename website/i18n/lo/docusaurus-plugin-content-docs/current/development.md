---
id: development
title: 'ການພັດທະນາ'
sidebar_label: 'ການພັດທະນາ'
---

---

## ຄູ່ມືການພັດທະນາ {#development-guide}

:::note ແກ້ໄຂພຽງແຕ່ພາສາອັງກິດ; ການແປຈະເຜີຍແຜ່
ອັບເດດເອກະສານ ພຽງແຕ່ ພາຍໃນ `website/docs` (ພາສາອັງກິດ) ເທົ່ານັ້ນ. ການແປພາຍໃຕ້ `website/i18n/<locale>/…` ເປັນການສ້າງອັດຕະໂນມັດ ແລະບໍ່ຄວນແກ້ໄຂດ້ວຍມື. ໃຊ້ວຽກແປ (ເຊັ່ນ `make translate_web_docs_batch`) ເພື່ອຣີເຟຣດເນື້ອຫາທ້ອງຖິ່ນ.
:::

### ເງື່ອນໄຂກ່ອນ {#prerequisites}

- Node.js 22+ ແລະ npm (ທົດສອບກັບ Node 22)
- Thunderbird 128 ESR ຫຼືໃໝ່ກວ່າ (ສໍາລັບການທົດສອບດ້ວຍມື)

---

### ໂຄງສ້າງໂຄງການ (ລະດັບສູງ) {#project-layout-high-level}

- ຮາກ: ສະກຣິບທ໌ບັນຈຸ `distribution_zip_packer.sh`, ເອກະສານ, ຮູບພາບຈໍສະແດງ
- `sources/`: ຊອບແວ add‑on ຫຼັກ (background, options/popup UI, manifests, icons)
- `tests/`: ຊຸດ Vitest
- `website/`: ເອກະສານ Docusaurus (ພ້ອມ i18n ພາຍໃຕ້ `website/i18n/de/...`)

---

### ການຕິດຕັ້ງ & ເຄື່ອງມື {#install-and-tooling}

- ຕິດຕັ້ງຂຶ້ນຕົ້ນທີ່ຮາກ: `npm ci`
- ເອກະສານ (ທາງເລືອກ): `cd website && npm ci`
- ຄົ້ນພົບເປົ້າໝາຍ: `make help`

---

### ການພັດທະນາແບບທັນທີ (web‑ext run) {#live-dev-web-ext}

- ວົງຈອນທົດລອງຮວດເຮວໃນ Firefox Desktop (ທົດສອບ UI ແບບຂົ້ວເທົ່ານັ້ນ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- ຮັນໃນ Thunderbird (ແນະນໍາສໍາລັບ MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ເຄັດລັບ:
- ເປີດ Error Console ຂອງ Thunderbird ຄ້າງໄວ້ (Tools → Developer Tools → Error Console).
- ໜ້າເຫດການ MV3 ຈະຖືກຢຸດເມື່ອວ່າງ; ໂຫຼດ add‑on ໃໝ່ຫຼັງຈາກປ່ຽນແປງ code, ຫຼືໃຫ້ web‑ext ຣີໂຫຼດອັດຕະໂນມັດ.
- ບາງພຶດຕິກໍາທີ່ມີໃນ Firefox ເທົ່ານັ້ນອາດແຕກຕ່າງ; ກວດສອບໃນ Thunderbird ເພື່ອຮັບປະກັນຄວາມສອດຄ່ອງ API.
- ເສັ້ນທາງໄຟລ໌ປະຕິບັດ Thunderbird (ຕົວຢ່າງ):
- Linux: `thunderbird` (ເຊັ່ນ, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- ການແຍກໂປຣໄຟລ໌: ໃຊ້ໂປຣໄຟລ໌ Thunderbird ແຍກຕ່າງຫາກສໍາລັບການພັດທະນາ ເພື່ອຫຼີກລ້ຽງຜົນກະທົບຕໍ່ການໃຊ້ງານປະຈໍາວັນຂອງທ່ານ.

---

### ເປົ້າໝາຍ Make (ຕາມຕົວອັກສອນ) {#make-targets-alphabetical}

Makefile ຊ່ວຍມາດຕະຖານການໄຫຼຂອງການພັດທະນາທົ່ວໄປ. ໃຫ້ຮັນ `make help` ໄດ້ທຸກເວລາ ເພື່ອສະຫຼຸບແບບແຖວດຽວຂອງເປົ້າໝາຍທຸກອັນ.

ເຄັດລັບ: ຮັນ `make` ໂດຍບໍ່ລະບຸເປົ້າໝາຍ ເພື່ອເປີດເມນູ Whiptail ງ່າຍໆ ໃຫ້ເລືອກເປົ້າໝາຍ.

| ເປົ້າໝາຍ                                                 | ຄໍາອະທິບາຍແບບແຖວດຽວ                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ລຶບອາດຕິແຟັກຕ໌ການສ້າງ/ພຣີວິວທ້ອງຖິ່ນ (tmp/, web-local-preview/, website/build/).      |
| [`commit`](#mt-commit)                                   | ຈັດຮູບແບບ, ຮັນການທົດສອບ (ລວມ i18n), ອັບເດດ changelog, commit & push.                  |
| [`eslint`](#mt-eslint)                                   | ຮັນ ESLint ຜ່ານ flat config (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | ລາຍຊື່ເປົ້າໝາຍທັງໝົດພ້ອມບັນຍາຍແຖວດຽວ (ຈັດຮຽງ).                                        |
| [`lint`](#mt-lint)                                       | web‑ext lint ບ່ນ `sources/` (temp manifest; ບໍ່ສົນໃຈ ZIPs; ເຕືອນບໍ່ໃຫ້ລົ້ມ).          |
| [`menu`](#mt-menu)                                       | ເມນູໂຕ້ຕອບເພື່ອເລືອກເປົ້າໝາຍ ແລະອາກິວເມັ້ນທາງເລືອກ.                                   |
| [`pack`](#mt-pack)                                       | ສ້າງ ATN & LOCAL ZIPs (ຮັນ linter; ເອີ້ນສະກຣິບທ໌ packer).                             |
| [`prettier`](#mt-prettier)                               | ຈັດຮູບແບບໂຣພໍຊິທໍຣີ່ໃນທີ່ເດີມ (ຂຽນການປ່ຽນແປງ).                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ໂໝດກວດເຊັກ (ບໍ່ຂຽນ); ລົ້ມຫາກຈໍາເປັນຈັດຮູບໃໝ່.                                |
| [`prettier_write`](#mt-prettier_write)                   | ນາມແຝງສໍາລັບ `prettier`.                                                              |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, ແລ້ວ Vitest (coverage ຖ້າກໍານົດ).                           |
| [`test_i18n`](#mt-test_i18n)                             | ທົດສອບເຉພາະ i18n: ຕົວຍຶດບ່ອນວ່າງ/ຄວາມກົງກັນຂອງ add‑on + ຄວາມກົງກັນເວັບໄຊທ໌.           |
| [`translate_app`](#mt-translation-app)                   | ນາມແຝງສໍາລັບ `translation_app`.                                                       |
| [`translation_app`](#mt-translation-app)                 | ແປ string UI ຂອງແອັບຈາກ `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | ແປເອກະສານເວັບໄຊທ໌ຜ່ານ OpenAI Batch API (ແນະນໍາ).                                      |
| [`translate_web_docs_sync`](#mt-translation-web)         | ແປເອກະສານເວັບໄຊທ໌ແບບ synchronous (ເກົ່າ, ບໍ່ batch).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | ນາມແຝງສໍາລັບ `translation_web_index`.                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | ແປ UI ຫນ້າຫຼັກ/ແຖບນໍາທາງ/ຟຸດເຕີ (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | ສ້າງເອກະສານໄປຫາ `website/build` (ຮອງຮັບ `--locales` / `BUILD_LOCALES`).               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ກວດລິ້ງແບບປອດໄພອອບໄລນ໌ (ຂ້າມ HTTP[S] ລະບົບໄກ).                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ພຣີວິວ gh‑pages ທ້ອງຖິ່ນ; ບໍລິການອັດຕະໂນມັດທີ່ 8080–8090; ທາງເລືອກທົດສອບ/ກວດລິ້ງ.     |
| [`web_push_github`](#mt-web_push_github)                 | ຜັກ `website/build` ໄປທີ່ແຂນງ່າ `gh-pages`.                                           |

Syntax ສໍາລັບຕົວເລືອກ

- ໃຊ້ `make <command> OPTS="…"` ເພື່ອສົ່ງຕົວເລືອກ (ແນະນໍາໃຫ້ໃສ່ເຄົ້າຍໂຄດ). ເປົ້າໝາຍແຕ່ລະອັນດ້ານລຸ່ມສະແດງຕົວຢ່າງການໃຊ້.

--

-

#### ເຄັດລັບການສ້າງແບບພາສາ {#locale-build-tips}

- ສ້າງແຕ່ບາງ locale: ກໍານົດ `BUILD_LOCALES="en de"` ຫຼືສົ່ງ `OPTS="--locales en,de"` ໃຫ້ເປົ້າໝາຍເວັບ.
- ພຣີວິວ locale ເຈາະຈົງ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### ການສ້າງ & ການບັນຈຸ {#build-and-package}

- ສ້າງ ZIPs: `make pack`
- ຜະລິດ ATN ແລະ LOCAL ZIPs ໃນຮາກຂອງ repo (ຢ່າແກ້ໄຂອາດຕິແຟັກຕ໌ດ້ວຍມື)
- ເຄັດລັບ: ອັບເດດຮຸ່ນໃນທັງ `sources/manifest_ATN.json` ແລະ `sources/manifest_LOCAL.json` ກ່ອນການບັນຈຸ
- ຕິດຕັ້ງດ້ວຍມື (dev): Thunderbird → Tools → Add‑ons and Themes → ເຟືອງ → Install Add‑on From File… → ເລືອກ ZIP ທີ່ສ້າງ

---

### ການທົດສອບ {#test}

- ຊຸດເຕັມ: `make test` (Vitest)
- Coverage (ທາງເລືອກ):
- `npm i -D @vitest/coverage-v8`
- ຮັນ `make test`; ເປີດ `coverage/index.html` ເພື່ອຮາຍງານ HTML
- i18n ເທົ່ານັ້ນ: `make test_i18n` (UI keys/placeholders/titles + ກວດຄວາມກົງກັນເວັບໄຊທ໌ຕໍ່‑locale ຕໍ່‑ເອກະສານ ພ້ອມກວດ id/title/sidebar_label)

---

### ການດີບັກ & ບັນທຶກ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- ປັບໂໝດບັນທຶກລາຍລະອຽດໃນເວລາທໍາງານ:
- ເປີດ: `messenger.storage.local.set({ debug: true })`
- ປິດ: `messenger.storage.local.set({ debug: false })`
- ບັນທຶກຈະປາກົດໃນຂະນະກໍ່ຮ່າງ/ສົ່ງການຕອບ

---

### ເອກະສານ (ເວັບໄຊທ໌) {#docs-website}

- ເຊີບເວີ dev: `cd website && npm run start`
- ສ້າງເວັບ static: `cd website && npm run build`
- ຄໍາສັ່ງ Make ທີ່ສອດຄ່ອງ (ຕາມຕົວອັກສອນ): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ຕົວຢ່າງການໃຊ້:
- ສະເພາະ EN, ຂ້າມການທົດສອບ/ກວດລິ້ງ, ບໍ່ push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ທຸກ locale, ພ້ອມການທົດສອບ/ກວດລິ້ງ, ແລ້ວ push: `make web_build_local_preview && make web_push_github`
- ກ່ອນເຜີຍແຜ່, ໃຫ້ຮັນການກວດລິ້ງແບບປອດໄພອອບໄລນ໌: `make web_build_linkcheck`.
- i18n: ພາສາອັງກິດຢູ່ໃນ `website/docs/*.md`; ພາສາເຢຍລະມັນຢູ່ໃນ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- ການຊອກຫາ: ຖ້າຕັ້ງຄ່າຕົວປ່ຽນແວດລ້ອມ Algolia DocSearch ໃນ CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), ເວັບຈະໃຊ້ການຊອກຫາ Algolia; ບໍ່ຢ່າງນັ້ນຈະກັບໄປໃຊ້ການຊອກຫາທ້ອງຖິ່ນ. ໃນໜ້າຫຼັກ, ກົດ `/` ຫຼື `Ctrl+K` ເພື່ອເປີດກ່ອງຊອກຫາ.

---

#### ເສັ້ນທາງປຽນທາງບໍລິຈາກ {#donate-redirect}

- `website/src/pages/donate.js`
- ເສັ້ນທາງ: `/donate` (ແລະ `/<locale>/donate`)
- ພຶດຕິກໍາ:
- ຖ້າເສັ້ນທາງປັດຈຸບັນມີ locale (ເຊັ່ນ, `/de/donate`), ໃຊ້ນັ້ນ
- ບໍ່ຢ່າງນັ້ນ, ເລືອກຄູ່ທີ່ກົງກັນທີ່ດີທີ່ສຸດຈາກ `navigator.languages` ທຽບກັບ locale ທີ່ຕັ້ງຄ່າ; ກັບໄປໃຊ້ locale ເລີ່ມຕົ້ນ
- ປຽນທາງໄປ:
- `en` → `/docs/donation`
- ອື່ນໆ → `/<locale>/docs/donation`
- ໃຊ້ `useBaseUrl` ເພື່ອຈັດການ baseUrl ໃຫ້ຖືກຕ້ອງ
- ລວມ meta refresh + ລີ້ງ `noscript` ເປັນສໍາຮອງ

---

---

#### ເຄັດລັບພຣີວິວ {#preview-tips}

- ຢຸດ Node preview ຢ່າງຄອບຄຸມ: ເປີດ `http://localhost:<port>/__stop` (ຈະພິມຫຼັງ `Local server started`).
- ຖ້າຮູບບໍ່ໂຫຼດໃນ MDX/JSX, ໃຊ້ `useBaseUrl('/img/...')` ເພື່ອເຄົາລົບ `baseUrl` ຂອງເວັບ.
- ພຣີວິວຈະເລີ່ມກ່ອນ; ການກວດລິ້ງຈະຮັນທີ່ຫຼັງ ແລະບໍ່ບລັອກ (ລິ້ງພາຍນອກທີ່ແຕກຈະບໍ່ຫຸ້ມກັ້ນພຣີວິວ).
- ຕົວຢ່າງ URL ພຣີວິວ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (ຈະພິມຫຼັງ “Local server started”).
- ລິ້ງພາຍນອກໃນການກວດລິ້ງ: ເວັບບາງເວັບ (ເຊັ່ນ addons.thunderbird.net) ບລັອກ crawler ແລະອາດສະແດງ 403 ໃນການກວດລິ້ງ. ພຣີວິວຍັງເລີ່ມໄດ້; ອັນນີ້ປອດໄພໃຫ້ມອງຂ້າມ.

---

#### ແປເວັບໄຊທ໌ {#translate-website}

ສິ່ງທີ່ທ່ານສາມາດແປໄດ້

- ເທົ່ານັ້ນ UI ຂອງເວັບ: ໜ້າຫຼັກ, ແຖບນໍາທາງ, ຟຸດເຕີ, ແລະ string UI ອື່ນໆ. ເນື້ອຫາເອກະສານຍັງເປັນພາສາອັງກິດ.

ບ່ອນທີ່ຈະແກ້ໄຂ

- ແກ້ໄຂ `website/i18n/<locale>/code.json` (ໃຊ້ `en` ເປັນອ້າງອີງ). ຮັກສາຕົວແທນແບບ `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ໃຫ້ຄົງເດີມ.

ສ້າງ ຫຼື ຣີເຟຣດໄຟລ໌

- ສ້າງ stub ທີ່ຂາດສໍາລັບທຸກ locale: `npm --prefix website run i18n:stubs`
- ຂຽນທັບ stub ຈາກອັງກິດ (ຫຼັງເພີ່ມ string ໃໝ່): `npm --prefix website run i18n:stubs:force`
- ທາງເລືອກສໍາລັບ locale ດຽວ: `npx --prefix website docusaurus write-translations --locale <locale>`

ແປ string UI ໜ້າຫຼັກ/ແຖບນໍາທາງ/ຟຸດເຕີ (OpenAI)

- ຕັ້ງຄ່າຂໍ້ມູນຮັບຮອງເທື່ອດຽວ (shell ຫຼື .env):
- `export OPENAI_API_KEY=sk-...`
- ທາງເລືອກ: `export OPENAI_MODEL=gpt-4o-mini`
- ຮັນຄັ້ງດຽວ (ທຸກ locale, ຂ້າມ en): `make translate_web_index`
- ຈໍາກັດເປັນ locale ເຈາະຈົງ: `make translate_web_index OPTS="--locales de,fr"`
- ຂຽນທັບຄ່າທີ່ມີຢູ່: `make translate_web_index OPTS="--force"`

ການກວດສອບ & ການລອງໃໝ່

- ສະກຣິບທ໌ແປຈະກວດຮູບຮ່າງ JSON, ຮັກສາຕົວຄົບປີດເປີດ {}, ແລະແນ່ໃຈວ່າ URL ບໍ່ຖືກປ່ຽນ.
- ເມື່ອກວດລົ້ມ, ຈະລອງໃໝ່ພ້ອມຄໍາແນະນໍາເຖິງ 2 ຄັ້ງ ກ່ອນຮັກສາຄ່າເກົ່າ.

ພຣີວິວ locale ຂອງທ່ານ

- ເຊີບເວີ dev: `npm --prefix website run start`
- ເຂົ້າໄປ `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

ການສົ່ງ

- ເປີດ PR ກັບໄຟລ໌ `code.json` ທີ່ແກ້ໄຂ. ໃຫ້ມີສຸມໃສ່ຈຸດ ແລະແນບຮູບພາບຈໍສະແດງໄວ້ຢ່າງໄວ້ຖ້າເປັນໄປໄດ້.

---

### ຄຳແນະນຳຄວາມປອດໄພ & ການຕັ້ງຄ່າ {#security-and-configuration-tips}

- ຢ່າ commit `sources/manifest.json` (ຖືກສ້າງຊົ່ວຄາວໃນຂະນະ build)
- ຮັກສາ `browser_specific_settings.gecko.id` ໃຫ້ຄົງທີ່ເພື່ອຮັກສາຊ່ອງທາງອັບເດດ

---

### ການຢູ່ຮອດຂອງການຕັ້ງຄ່າ {#settings-persistence}

- ການເກັບຮັກສາ: ການຕັ້ງຄ່າຂອງຜູ້ໃຊ້ທັງໝົດຢູ່ໃນ `storage.local` ແລະຢູ່ຮອດຜ່ານການອັບເດດ add‑on.
- ການຕິດຕັ້ງ: ຄ່າເລີ່ມຕົ້ນຈະຖືກນໍາໃຊ້ກໍ່ຕໍ່ເມື່ອກະແຈຫາຍໄປແບບເຕັມທີ່ (undefined).
- ການອັບເດດ: ການຍ້າຍຂໍ້ມູນຈະເຕີມເຉົ້າເທົ່າກະແຈທີ່ຂາດ; ຄ່າເກົ່າຈະບໍ່ຖືກຂຽນທັບ.
- ຕົວຊີ້ວັດ schema: `settingsVersion` (ປັດຈຸບັນ `1`).
- ກະແຈ ແລະຄ່າເລີ່ມຕົ້ນ:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- ຊອດ: ເບິ່ງ `sources/background.js` → `initializeOrMigrateSettings()` ແລະ `SCHEMA_VERSION`.

ການໄຫຼວຽກ dev (ເພີ່ມການຕັ້ງຄ່າໃໝ່)

- ດັນ `SCHEMA_VERSION` ໃນ `sources/background.js`.
- ເພີ່ມກະແຈໃໝ່ + ຄ່າເລີ່ມຕົ້ນໃສ່ວັດຖຸ `DEFAULTS` ໃນ `initializeOrMigrateSettings()`.
- ໃຊ້ກົດ "ຖ້າ‑ແລະ‑ເທົ່ານັ້ນ" ເມື່ອຫວ່ານຄ່າເລີ່ມຕົ້ນ; ຢ່າຂຽນທັບຄ່າເກົ່າ.
- ຖ້າການຕັ້ງຄ່າມີໃຫ້ຜູ້ໃຊ້ເຫັນ, ເຊື່ອມໃນ `sources/options.js` ແລະເພີ່ມ string ແບບທ້ອງຖິ່ນ.
- ເພີ່ມ/ປັບປຸງການທົດສອບ (ເບິ່ງ `tests/background.settings.migration.test.js`).

ເຄັດລັບການທົດສອບດ້ວຍມື

- ຈໍາລອງການຕິດຕັ້ງໃໝ່: ລ້າງໄດເຣກຂໍ້ມູນຂອງສ່ວນຂະຫຍາຍ ຫຼື ເລີ່ມດ້ວຍໂປຣໄຟລ໌ໃໝ່.
- ຈໍາລອງການອັບເດດ: ຕັ້ງ `settingsVersion` ເປັນ `0` ໃນ `storage.local` ແລະໂຫຼດໃໝ່; ຢືນຢັນວ່າຄ່າເກົ່າບໍ່ຖືກຂຽນທັບ ແລະມີແຕ່ກະແຈທີ່ຂາດທີ່ເພີ່ມເຂົ້າ.

---

### ການແກ້ໄຂບັນຫາ {#troubleshooting}

- ແນ່ໃຈວ່າ Thunderbird ແມ່ນ 128 ESR ຫຼືໃໝ່ກວ່າ
- ໃຊ້ Error Console ສໍາລັບບັນຫາ runtime
- ຖ້າການຕັ້ງຄ່າທີ່ເກັບໄວ້ດູເຫມືອນຈະບໍ່ຖືກນໍາໃຊ້, ລອງຮີສະຕາດ Thunderbird ແລະທົດລອງອີກຄັ້ງ. (Thunderbird ອາດຈະແຄຊສະພາບລະຫວ່າງ session; ການຮີສະຕາດຈະຮັບປະກັນການໂຫຼດຄ່າໃໝ່.)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ຮັນ vitest ພ້ອມ threshold coverage (85% lines/functions/branches/statements). ຖ້າບໍ່ຜ່ານ threshold, ວຽກຈະລົ້ມ.
- ເວີກໂຟລ໌ຈະອັບໂຫລດ artifact `coverage-html` ພ້ອມລາຍງານ HTML; ດາວໂຫລດຈາກໜ້າ run (Actions → run ລ່າສຸດ → Artifacts).

---

### ການມີສ່ວນຮ່ວມ {#contributing}

- ເບິ່ງ CONTRIBUTING.md ສໍາລັບຫຼັກເກນ branch/commit/PR
- ເຄັດລັບ: ສ້າງໂປຣໄຟລ໌ພັດທະນາ Thunderbird ແຍກສໍາລັບການທົດສອບ ເພື່ອຫຼີກການກະທົບຕໍ່ໂປຣໄຟລ໌ປະຈໍາວັນ.

---

### ການແປ

- ການຮັນວຽກແປ “all → all” ຂະໜາດໃຫຍ່ອາດຈະຊ້າ ແລະ ໃຊ້ຄ່າໃຊ້ຈ່າຍສູງ. ເລີ່ມຈາກຊຸດນ້ອຍ (ເຊັ່ນ, ເອກະສານບໍ່ກີ່ອັນ ແລະ 1–2 locale), ກວດສອບຜົນ, ແລ້ວຂະຫຍາຍ.

---

- ນະໂຍບາຍການລອງໃໝ່: ວຽກແປຈະລອງໃໝ່ໄດ້ສູງສຸດ 3 ຄັ້ງດ້ວຍການຖອຍຫຼັງແບບທະວີຄູນໃນການຜິດພາດ API; ເບິ່ງ `scripts/translate_web_docs_batch.js` ແລະ `scripts/translate_web_docs_sync.js`.

ຮູບພາບຈໍສະແດງສໍາລັບເອກະສານ

- ເກັບຮູບພາບໄວ້ໃນ `website/static/img/`.
- ອ້າງອີງພວກມັນໃນ MD/MDX ຜ່ານ `useBaseUrl('/img/<filename>')` ເພື່ອໃຫ້ເສັ້ນທາງເຮັດວຽກກັບ `baseUrl` ຂອງເວັບ.
- ຫຼັງເພີ່ມ ຫຼື ເປັນຕັ້ງຊື່ຮູບພາຍໃຕ້ `website/static/img/`, ຢືນຢັນວ່າການອ້າງອີງທັງໝົດຍັງໃຊ້ `useBaseUrl('/img/…')` ແລະແສດງໃນພຣີວິວທ້ອງຖິ່ນ.
  ຟາວິຄອນ

- `favicon.ico` ຫຼາຍຂະໜາດຖືກສ້າງອັດຕະໂນມັດໃນເສັ້ນທາງ build ທັງໝົດ (Make + scripts) ຜ່ານ `website/scripts/build-favicon.mjs`.
- ບໍ່ຈໍາເປັນຂັ້ນຕອນດ້ວຍມື; ອັບເດດ `icon-*.png` ກໍພໍ.
  ເຄັດລັບການທົບທວນ

- ຮັກສາ front‑matter `id` ໃຫ້ຄົງເດີມໃນເອກະສານທີ່ແປ; ແປພຽງແຕ່ `title` ແລະ `sidebar_label` ເມື່ອມີ.

#### clean {#mt-clean}

- ເປົ້າໝາຍ: ລຶບອາດຕິແຟັກຕ໌ການສ້າງ/ພຣີວິວທ້ອງຖິ່ນ.
- ການໃຊ້ງານ: `make clean`
- ລຶບ (ຖ້າມີ):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ເປົ້າໝາຍ: ຈັດຮູບແບບ, ທົດສອບ, ອັບເດດ changelog, commit, ແລະ push.
- ການໃຊ້ງານ: `make commit`
- ລາຍລະອຽດ: ຮັນ Prettier (write), `make test`, `make test_i18n`; ເພີ່ມ changelog ເມື່ອມີ staged diffs; push ໄປທີ່ `origin/<branch>`.

---

#### eslint {#mt-eslint}

- ເປົ້າໝາຍ: ຮັນ ESLint ຜ່ານ flat config.
- ການໃຊ້ງານ: `make eslint`

---

#### help {#mt-help}

- ເປົ້າໝາຍ: ລາຍຊື່ເປົ້າໝາຍທັງໝົດພ້ອມບັນຍາຍແຖວດຽວ.
- ການໃຊ້ງານ: `make help`

---

#### lint {#mt-lint}

- ເປົ້າໝາຍ: lint MailExtension ໂດຍໃຊ້ `web-ext`.
- ການໃຊ້ງານ: `make lint`
- ໝາຍເຫດ: ສໍາເນົາຊົ່ວຄາວ `sources/manifest_LOCAL.json` → `sources/manifest.json`; ບໍ່ສະແກນ ZIP ທີ່ build; ຄໍາເຕືອນບໍ່ທໍາໃຫ້ pipeline ລົ້ມ.

---

#### menu {#mt-menu}

- ເປົ້າໝາຍ: ເມນູໂຕ້ຕອບເພື່ອເລືອກເປົ້າໝາຍ Make ແລະອາກິວເມັ້ນ.
- ການໃຊ້ງານ: ຮັນ `make` ໂດຍບໍ່ມີອາກິວເມັ້ນ.
- ໝາຍເຫດ: ຖ້າ `whiptail` ບໍ່ມີ, ເມນູຈະ fallback ໄປ `make help`.

---

#### pack {#mt-pack}

- ເປົ້າໝາຍ: ສ້າງ ATN ແລະ LOCAL ZIPs (ພຶງ `lint`).
- ການໃຊ້ງານ: `make pack`
- ເຄັດລັບ: ດັນຮຸ່ນໃນທັງ `sources/manifest_*.json` ກ່ອນການບັນຈຸ.

---

#### prettier {#mt-prettier}

- ເປົ້າໝາຍ: ຈັດຮູບແບບ repo ໃນທີ່ເດີມ.
- ການໃຊ້ງານ: `make prettier`

#### prettier_check {#mt-prettier_check}

- ເປົ້າໝາຍ: ກວດສອບຮູບແບບ (ບໍ່ຂຽນ).
- ການໃຊ້ງານ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ເປົ້າໝາຍ: ນາມແຝງສໍາລັບ `prettier`.
- ການໃຊ້ງານ: `make prettier_write`

---

#### test {#mt-test}

- ເປົ້າໝາຍ: ຮັນ Prettier (write), ESLint, ແລ້ວ Vitest (coverage ຖ້າຕິດຕັ້ງ).
- ການໃຊ້ງານ: `make test`

#### test_i18n {#mt-test_i18n}

- ເປົ້າໝາຍ: ການທົດສອບ i18n ເນັ້ນໆ ສໍາລັບ string ຂອງ add‑on ແລະເອກະສານເວັບ.
- ການໃຊ້ງານ: `make test_i18n`
- ຮັນ: `npm run test:i18n` ແລະ `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- ເປົ້າໝາຍ: ແປ string UI ຂອງ add‑on ຈາກ EN ໄປ locale ອື່ນ.
- ການໃຊ້ງານ: `make translation_app OPTS="--locales all|de,fr"`
- ໝາຍເຫດ: ຮັກສາໂຄງສ້າງ key ແລະຕົວແທນ; ບັນທຶກໄປ `translation_app.log`. ຮູບແບບສະກຣິບທ໌: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ເປົ້າໝາຍ: ແປເອກະສານເວັບໄຊທ໌ຈາກ `website/docs/*.md` ເຂົ້າໃສ່ `website/i18n/<locale>/...`.
- ແນະນໍາ: `translate_web_docs_batch` (OpenAI Batch API)
  - ການໃຊ້ (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ແບບ positional ເກົ່າຍັງຮັບ: `OPTS="<doc|all> <lang|all>"`
- ພຶດຕິກໍາ: ສ້າງ JSONL, ອັບໂຫລດ, ໂພລທຸກ 30s, ດາວໂຫລດຜົນ, ຂຽນໄຟລ໌.
- ບັນຫາການຮ້ອງຂໍ: ວຽກ batch ອາດໃຊ້ເວລາເຖິງ 24 ຊົ່ວໂມງ (ຕາມກອບຊ່ວງ batch ຂອງ OpenAI). Console ຈະສະແດງເວລາທີ່ຜ່ານໄປທຸກການໂພລ.
- Env: `OPENAI_API_KEY` (ຈໍາເປັນ), ທາງເລືອກ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ຄ່າເລີ່ມຕົ້ນ 24h), `BATCH_POLL_INTERVAL_MS`.
- ເກົ່າ: `translate_web_docs_sync`
  - ການໃຊ້ (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ແບບ positional ເກົ່າຍັງຮັບ: `OPTS="<doc|all> <lang|all>"`
- ພຶດຕິກໍາ: ຮ້ອງຂໍ synchronous ຕໍ່‑ຄູ່ (ບໍ່ລວມ batch).
- ໝາຍເຫດ: ໂຕ້ຕອບໂຕ້ຖາມເມື່ອລະ `OPTS` ຖືກຂາດ. ທັງສອງໂໝດຮັກສາ code blocks/inline code ແລະຮັກສາ front‑matter `id` ໃຫ້ຄົງເດີມ; ບັນທຶກໄປ `translation_web_batch.log` (batch) ຫຼື `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ເປົ້າໝາຍ: ແປ string UI ເວັບ (ໜ້າຫຼັກ, ແຖບນໍາທາງ, ຟຸດເຕີ) ຈາກ `website/i18n/en/code.json` ໄປທຸກ locale ພາຍໃຕ້ `website/i18n/<locale>/code.json` (ຂ້າມ `en`).
- ການໃຊ້ງານ: `make translate_web_index` ຫຼື `make translate_web_index OPTS="--locales de,fr [--force]"`
- ຂໍ້ກໍານົດ: export `OPENAI_API_KEY` (ທາງເລືອກ: `OPENAI_MODEL=gpt-4o-mini`).
- ພຶດຕິກໍາ: ກວດຮູບຮ່າງ JSON, ຮັກສາຕົວແທນວົງເລັບດ້ວຍຂົງໂຄ້ງ, ຮັກສາ URL ໃຫ້ຄົງເດີມ, ແລະລອງໃໝ່ພ້ອມຄໍາແນະນໍາເມື່ອກວດລົ້ມ.

---

#### web_build {#mt-web_build}

- ເປົ້າໝາຍ: ສ້າງເວັບເອກະສານໄປຫາ `website/build`.
- ການໃຊ້ງານ: `make web_build OPTS="--locales en|de,en|all"` (ຫຼືກໍານົດ `BUILD_LOCALES="en de"`)
- ພາຍໃນ: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- ຂຶ້ນກັບ: ຮັນ `npm ci` ໃນ `website/` ເທົ່ານັ້ນ ຖ້າ `website/node_modules/@docusaurus` ຂາດ.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ເປົ້າໝາຍ: ກວດລິ້ງແບບປອດໄພອອບໄລນ໌.
- ການໃຊ້ງານ: `make web_build_linkcheck OPTS="--locales en|all"`
- ໝາຍເຫດ: ສ້າງໄປຫາ `tmp_linkcheck_web_pages`; ແປງ GH Pages `baseUrl` ເປັນ `/`; ຂ້າມລິ້ງ HTTP(S) ໄກ.

#### web_build_local_preview {#mt-web_build_local_preview}

- ເປົ້າໝາຍ: ພຣີວິວ gh‑pages ທ້ອງຖິ່ນພ້ອມການທົດສອບ/ກວດລິ້ງທາງເລືອກ.
- ການໃຊ້ງານ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ພຶດຕິກໍາ: ພະຍາຍາມ Node preview server ກ່ອນ (`scripts/preview-server.mjs`, ຮອງຮັບ `/__stop`), ຕົກກັບໄປ `python3 -m http.server`; ບໍລິການທີ່ 8080–8090; PID ຢູ່ `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- ເປົ້າໝາຍ: ຜັກ `website/build` ໄປຫາແຂນງ່າ `gh-pages`.
- ການໃຊ້ງານ: `make web_push_github`

ເຄັດລັບ: ຕັ້ງ `NPM=…` ເພື່ອ override ຕົວຈັດການແພກເກັດທີ່ Makefile ໃຊ້ (ຄ່າເລີ່ມຕົ້ນ `npm`).

---
