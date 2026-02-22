---
id: development
title: 'Ìdàgbàsókè'
sidebar_label: 'Ìdàgbàsókè'
---

---

## Itọsọna Idagbasoke {#development-guide}

:::note Ṣatúnṣe Gẹ́ẹ́sì nìkan; ìtúmọ̀ máa tàn kakiri
Ṣe imúdójúìwọ̀n ìwé ìtọná **nìkan** ní abẹ́ `website/docs` (English). Àwọn ìtumọ̀ ní abẹ́ `website/i18n/<locale>/…` ni a ń dá sílẹ̀ laifọwọyi, kò yẹ kí a ṣàtúnṣe wọn lọ́wọ́. Lo àwọn iṣẹ́ ìtumọ̀ (àpẹẹrẹ, `make translate_web_docs_batch`) láti tún akoonu ìbílẹ̀ ṣe.
:::

### Ohun tí ó yẹ kí ó wà ṣáájú {#prerequisites}

- Node.js 22+ àti npm (a ṣe ìdánwò pẹ̀lú Node 22)
- Thunderbird 128 ESR tàbí tuntun síi (fún ìdánwò ọwọ́)

---

### Àtòkọ Ìṣètò Ètò (ìpele‑gíga) {#project-layout-high-level}

- Gbòngbò: ìkọ̀kọ̀ ìṣakojọpọ̀ `distribution_zip_packer.sh`, ìwé ìtọná, àwòrán iboju
- `sources/`: kóòdù àfikún pàtàkì (background, aṣayan/UI popup, manifest, aami)
- `tests/`: àkójọpọ̀ ìdánwò Vitest
- `website/`: ìwé Docusaurus (pẹ̀lú i18n ní abẹ́ `website/i18n/de/...`)

---

### Fifi sori & Ọpá iṣẹ {#install-and-tooling}

- Fi àwọn ìfarakanra gbòngbò sílẹ̀: `npm ci`
- Ìwé ìtọná (àṣàyàn): `cd website && npm ci`
- Ṣàwárí àwọn àfojúsùn: `make help`

---

### Ìdàgbàsókè Alààyè (web‑ext run) {#live-dev-web-ext}

- Ìyípadà kíákíá ní Firefox Desktop (ìdánwò UI àkọ́kọ́ nìkan):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Ṣiṣe ní Thunderbird (tí ó dára jùlọ fún MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Àmọ̀ràn:
- Máa pa Console Àṣìṣe Thunderbird sílẹ̀ (Tools → Developer Tools → Error Console).
- Àwọn ojúewé iṣẹ́lẹ̀ MV3 máa ń dáwọ́ dúró nígbà tí kò sí ìṣe; tún àfikún náà kó sílẹ̀ lẹ́yìn ìyípadà kóòdù, tàbí jẹ́ kí web‑ext tún‑kó laifọwọyi.
- Díẹ̀ nínú àwọn ìhùwàsí Firefox‑nìkan yàtọ̀; máa jẹ́rìí ní Thunderbird fún ìbámu API nígbà gbogbo.
- Ọ̀nà binari Thunderbird (àpẹẹrẹ):
- Linux: `thunderbird` (àpẹẹrẹ, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ìyapa profaili: Lo profaili Thunderbird mìíràn fún ìdàgbàsókè kí o má ba àtúnṣe ojoojúmọ́ rẹ jẹ.

---

### Àwọn àfojúsùn Make (gẹ́gẹ́ bí alífábẹ́tì) {#make-targets-alphabetical}

Makefile ń bójú tó ọ̀nà iṣẹ́ ìdàgbàsókè tí wọ́pọ̀. Ṣe `make help` nígbàkúgbà fún àkótán ìlà‑kan ti gbogbo àfojúsùn.

Ìmọ̀ràn: ṣiṣí `make` láì sọ àfojúsùn kankan yóò ṣí akojọ aṣayan Whiptail alákọ̀ọ́rẹ́ láti yan àfojúsùn kan.

| Àfojúsùn                                                 | Apejuwe ìlà‑kan                                                                               |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Yọ àwọn ohun èlò ikọ́/ìtẹ̀síwájú agbègbè kúrò (tmp/, web-local-preview/, website/build/).       |
| [`commit`](#mt-commit)                                   | Ṣe fọ́ọ̀mù, ṣàgìmọ̀ ìdánwò (pẹ̀lú i18n), ṣe imúdójúìwọ̀n changelog, commit & push.                 |
| [`eslint`](#mt-eslint)                                   | Ṣi ESLint nípasẹ̀ àtúnṣe flat (`npm run -s lint:eslint`).                                      |
| [`help`](#mt-help)                                       | Ṣàkóso gbogbo àfojúsùn pẹ̀lú ìwé ìlà‑kan (tẹ̀lé ìtòlẹ́sẹẹsẹ).                                    |
| [`lint`](#mt-lint)                                       | web‑ext lint lórí `sources/` (manifest ìgbàtẹ́lẹ̀; kọjá ZIP; kì í jẹ́ ìkùnà).                    |
| [`menu`](#mt-menu)                                       | Akojọ aṣayan ìbáṣepọ̀ láti yan àfojúsùn kan àti àwọn ariyanjiyan àṣàyàn.                       |
| [`pack`](#mt-pack)                                       | Kọ́ ATN & LOCAL ZIPs (nṣiṣẹ́ linter; pè ìkọ̀kọ̀ packer).                                          |
| [`prettier`](#mt-prettier)                               | Ṣe fọ́ọ̀mù repọ̀ níbi rẹ̀ (kọ ohun ìyípadà sílẹ̀).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ní ipo ayẹyẹ (kò kọ ohunkóhun); kùnà bí a bá nílò àtún‑fọ́ọ̀mù.                        |
| [`prettier_write`](#mt-prettier_write)                   | Orúkọ míràn fún `prettier`.                                                                   |
| [`test`](#mt-test)                                       | Prettier (kọ), ESLint, lẹ́yìn náà Vitest (ìbòjúbo bí a bá túnṣe bẹ́ẹ̀).                          |
| [`test_i18n`](#mt-test_i18n)                             | Ìdánwò i18n‑nìkan: àwọn àfipamọ́/ìbámu àfikún + ìbámu ojúlé wẹẹ̀bù.                             |
| [`translate_app`](#mt-translation-app)                   | Orúkọ míràn fún `translation_app`.                                                            |
| [`translation_app`](#mt-translation-app)                 | Túmọ̀ àwọn okun UI app láti `sources/_locales/en/messages.json`.                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | Túmọ̀ ìwé ojúlé wẹẹ̀bù nípasẹ̀ OpenAI Batch API (tí a fẹ́ràn jù).                                 |
| [`translate_web_docs_sync`](#mt-translation-web)         | Túmọ̀ ìwé ojúlé wẹẹ̀bù ní ìṣọ̀kan (atijọ́, kì í ṣe batch).                                        |
| [`translate_web_index`](#mt-translation_web_index)       | Orúkọ míràn fún `translation_web_index`.                                                      |
| [`translation_web_index`](#mt-translation_web_index)     | Túmọ̀ UI ojú‑ìwé/agbègbè lilọ kiri/ìpẹ̀yà (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Kọ́ ìwé sí `website/build` (pamọ́ra `--locales` / `BUILD_LOCALES`).                             |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Ṣàyẹ̀wò ìjápọ̀ tí ó ní ààbò lórí aisinbọ (fo ọkọọkan HTTP[S] ìjìnìnlẹ̀).                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Àkàwé gh‑pages agbègbè; iṣẹ́ àdáṣiṣẹ́ lórí 8080–8090; ìdánwò/ìjápọ̀‑ṣàyẹ̀wò àṣàyàn.               |
| [`web_push_github`](#mt-web_push_github)                 | Fún `website/build` sí ẹka `gh-pages`.                                                        |

Ìlànà ìṣàfilọ́lẹ̀ fún àwọn aṣayan

- Lo `make <command> OPTS="…"` láti ránṣẹ́ pẹ̀lú àwọn aṣayan (ìtọ́ka nínú agbasọ̀ ló dáa). Gbogbo àfojúsùn ní isalẹ fi àpẹẹrẹ lílo hàn.

--

-

#### Àmọ̀ràn kọ́kọ́rọ̀ èdè agbègbè {#locale-build-tips}

- Kọ́ apakan díẹ̀ nínú àwọn agbègbè: ṣètò `BUILD_LOCALES="en de"` tàbí kọja `OPTS="--locales en,de"` sí àwọn àfojúsùn wẹẹ̀bù.
- Àkànṣe àyẹ̀wò agbègbè kan péré: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Kọ́ & Pa pọ̀ {#build-and-package}

- Kọ́ ZIPs: `make pack`
- Ó ń ṣe ATN àti LOCAL ZIPs ní gbòngbò repo (má ṣe ṣàtúnṣe ohun èlò ikọ́ ní ọwọ́)
- Ìmọ̀ràn: ṣe imúdójúìwọ̀n ẹ̀yà nínú mejeeji `sources/manifest_ATN.json` àti `sources/manifest_LOCAL.json` kí o tó pa pọ̀
- Fifi sori ọwọ́ (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → yan ZIP tí a kọ́

---

### Ìdánwò {#test}

- Àkójọpọ̀ pípé: `make test` (Vitest)
- Ìbòjúbo (àṣàyàn):
- `npm i -D @vitest/coverage-v8`
- Ṣi `make test`; ṣí `coverage/index.html` fún ìròyìn HTML
- i18n nìkan: `make test_i18n` (àwọn bọtìnì/UI àfipamọ́/àkọlé + ìbámu ojú‑ọ̀rọ̀ wẹẹ̀bù ní gbogbo agbègbè pẹ̀lú ìṣàyẹ̀wò id/title/sidebar_label)

---

### Ìtúpalẹ̀ aṣìṣe & Àkọsílẹ̀ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Yí ìkọ̀sọ̀rọ̀ àkọsílẹ̀ gígùn padà nígbà ìṣiṣẹ́:
- Mú ṣiṣẹ́: `messenger.storage.local.set({ debug: true })`
- Pa á: `messenger.storage.local.set({ debug: false })`
- Àkọsílẹ̀ máa hàn nígbà tí a bá ń kọ/ráńṣẹ́ pẹ̀lú àwọn ìdáhùn

---

### Ìwé (ojúlé wẹẹ̀bù) {#docs-website}

- Server ìdàgbàsókè: `cd website && npm run start`
- Kọ́ ojúlé aláìlera: `cd website && npm run build`
- Awọn Make tó bá mu pọ̀ (gẹ́gẹ́ bí alífábẹ́tì): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Àpẹẹrẹ lílo:
- EN nìkan, fo ìdánwò/ṣàyẹ̀wò‑ìjápọ̀, kò sí push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Gbogbo agbègbè, pẹ̀lú ìdánwò/ṣàyẹ̀wò‑ìjápọ̀, lẹ́yìn náà push: `make web_build_local_preview && make web_push_github`
- Kí o tó tẹ̀jáde, ṣiṣẹ́ ṣàyẹ̀wò ìjápọ̀ aisinbọ: `make web_build_linkcheck`.
- i18n: Gẹẹsi wà ní `website/docs/*.md`; ìtumọ̀ Jámánì wà ní `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Ṣàwárí: Bí a bá ṣètò àwọn oniyí ayika Algolia DocSearch ní CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), ojúlé yóò lò ìṣàwárí Algolia; bí kò bá rí bẹ́ẹ̀ yóò padà sí ìṣàwárí agbègbè. Lórí ojú‑ìwé, tẹ `/` tàbí `Ctrl+K` láti ṣí apoti ìṣàwárí.

---

#### Ọ̀nà ìtúnrànṣẹ́ fún ìránwọ́ (Donate) {#donate-redirect}

- `website/src/pages/donate.js`
- Ọ̀nà: `/donate` (àti `/<locale>/donate`)
- Ìhùwàsí:
- Bí ọ̀nà lọwọlọwọ bá ní agbègbè (àpẹẹrẹ, `/de/donate`), lo un
- Bí kò bá rí bẹ́ẹ̀, yan ohun tó bá dara jù lára `navigator.languages` síi lórí àwọn agbègbè tó ṣètò; padà sí agbègbè aiyẹ̀tọ̀
- Tún tọ́ sí:
- `en` → `/docs/donation`
- àwọn mìíràn → `/<locale>/docs/donation`
- Lò `useBaseUrl` fún ìṣakoso baseUrl tó bófin mu
- Ní ìdàpọ̀ pẹ̀lú meta refresh + ìjápọ̀ `noscript` gẹ́gẹ́ bí ìpadàbọ̀

---

---

#### Àmọ̀ràn Àkànṣe {#preview-tips}

- Dákẹ́ ìfihàn Node ní mímọ́: ṣí `http://localhost:<port>/__stop` (a tẹ̀ jáde lẹ́yìn `Local server started`).
- Bí àwọn àwòrán kò bá kó ní MDX/JSX, lo `useBaseUrl('/img/...')` kí a bọ́rẹ̀ sí `baseUrl` ojúlé náà.
- Àkànṣe bẹ̀rẹ̀ kọ́kọ́; ṣàyẹ̀wò ìjápọ̀ ń ṣiṣẹ́ lẹ́yìn náà ó sì kì í dá iṣẹ́ dúró (àwọn ìjápọ̀ òde tí ó bàjẹ́ kì yóò dá àkànṣe dúró).
- Àpẹẹrẹ URL àkànṣe: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (a tẹ̀ jáde lẹ́yìn “Local server started”).
- Àwọn ìjápọ̀ òde ní ṣàyẹ̀wò‑ìjápọ̀: Díẹ̀ lára àwọn ojúlé òde (àpẹẹrẹ, addons.thunderbird.net) ń dí àwọn crawler laifọwọyi mọ́lẹ̀ ó sì lè fi 403 hàn ní ṣàyẹ̀wò ìjápọ̀. Àkànṣe ṣi bẹ̀rẹ̀; wọ̀nyí lè jẹ́ kí a fo wọn.

---

#### Túmọ̀ Ojúlé Wẹẹ̀bù {#translate-website}

Ohun tí o lè túmọ̀

- UI ojúlé wẹẹ̀bù nìkan: ojú‑ìwé, agbègbè lilọ kiri, ìpẹ̀yà, àti àwọn okun UI míì. Akọ́ọ̀lẹ̀ ìwé dúró ní Gẹẹsi nísinsin yìí.

Ibí tí a ti ṣàtúnṣe

- Ṣàtúnṣe `website/i18n/<locale>/code.json` (lo `en` gẹ́gẹ́ bí ìtọ́kasí). Pa àwọn àfipamọ́ bí `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` mọ́ bí wọn ṣe rí.

Ṣẹda tàbí tún àwọn fáìlì ṣe

- Ṣẹda àwọn stub tí ó sọnù fún gbogbo agbègbè: `npm --prefix website run i18n:stubs`
- Túbọ̀ kọ àwọn stub láti Gẹẹsi (lẹ́yìn fífi okun tuntun kún): `npm --prefix website run i18n:stubs:force`
- Yíyan míì fún agbègbè kan ṣoṣo: `npx --prefix website docusaurus write-translations --locale <locale>`

Túmọ̀ okun UI ojú‑ìwé/agbègbè lilọ kiri/ìpẹ̀yà (OpenAI)

- Ṣètò ìjẹ́rìí lẹ́ẹ̀kan (shell tàbí .env):
- `export OPENAI_API_KEY=sk-...`
- Àṣàyàn: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (gbogbo agbègbè, fo en): `make translate_web_index`
- Dín kù sí agbègbè kan tàbí meji: `make translate_web_index OPTS="--locales de,fr"`
- Kọjá àwọn iye àtijọ́: `make translate_web_index OPTS="--force"`

Ìmúdájú & àtúnṣe àgbàyanu

- Ìkọ̀kọ̀ ìtumọ̀ ń fọwọ́sí irisi JSON, ń pa àwọn àfipamọ́ agbo‑ìmọ̀ (curly‑brace) mọ́, ó sì ń jẹ́ kó ríi dájú pé àwọn URL kò yípadà.
- Ní ìkùnà ìmúdájú, yóò tún gbìyànjú pẹ̀lú ìbáṣepọ̀ dé ìgbà mẹ́jì kí ó tó pa àwọn iye tìkára wọn mọ́.

Ṣe àkànṣe agbègbè rẹ

- Server ìdàgbàsókè: `npm --prefix website run start`
- Ṣàbẹwò `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Fí ránṣẹ́

- Ṣí PR pẹ̀lú fáìlì `code.json` tí a ṣàtúnṣe. Jẹ́ kí àwọn ìyípadà kúrò ní kíkúrú kí o sì fi sikirinisoti kékeré kún un bí o bá lè ṣe.

---

### Ààbò & Àmọ̀ràn Ìtọ̀sọ́nà {#security-and-configuration-tips}

- Má ṣe commit `sources/manifest.json` (a dá a sílẹ̀ péré nígbà ikọ́)
- Pa `browser_specific_settings.gecko.id` mọ́ kí o lè pa ikanni ìmúdójúìwọ̀n mọ́

---

### Iduroṣinṣin Ètò {#settings-persistence}

- Ibi ìpamọ́: Gbogbo àwọn ètò oníṣe wà ní `storage.local` ó sì ń bá a lọ kọjá àwọn imúdójúìwọ̀n àfikún.
- Fifi sori: Àwọn aiyẹ̀tọ̀ ni a ń lò nígbà tí bọtìnì bá sọnù gan‑an (undefined).
- Imúdójúìwọ̀n: Ìrìnàjò (migration) kún fún àwọn bọtìnì tí ó sọnù nìkan; a kò fi kọ àwọn iye tó wà tẹ́lẹ̀ sílù.
- Amọ̀ràn skima: `settingsVersion` (ní báyìí `1`).
- Àwọn bọtìnì àti aiyẹ̀tọ̀:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kóòdù: wo `sources/background.js` → `initializeOrMigrateSettings()` àti `SCHEMA_VERSION`.

Ìṣàn iṣẹ́ dev (fífi ètò tuntun kún)

- Túbọ̀ `SCHEMA_VERSION` ní `sources/background.js`.
- Fí bọtìnì tuntun + aiyẹ̀tọ̀ kún sí ohun `DEFAULTS` nínú `initializeOrMigrateSettings()`.
- Lo ìlànà “ọ̀kan‑ṣoṣo‑bí‑ó‑bá‑ṣofo” nígbà títẹ̀síwájú aiyẹ̀tọ̀; má ṣe kọ àwọn iye tó wà tẹ́lẹ̀ sẹ́yìn.
- Bí ètò náà bá hàn gbangba fún oníṣe, so ó mọ́ `sources/options.js` kí o sì kún fún àwọn okun èdè ìbílẹ̀.
- Fí/ṣètò ìdánwò (wo `tests/background.settings.migration.test.js`).

Àmọ̀ràn ìdánwò ọwọ́

- Ṣe àfihàn fifi sori tuntun: pa diríìkììrì ìtẹ̀ data ìfikún di ofo tàbí bẹ̀rẹ̀ pẹ̀lú profaili tuntun.
- Ṣe àfihàn imúdójúìwọ̀n: ṣètò `settingsVersion` sí `0` ní `storage.local` kí o sì tún‑kọ; jẹ́rìí pé àwọn iye tó wà tẹ́lẹ̀ kò yípadà àti pé bọtìnì tí ó sọnù nìkan ni a fi kún.

---

### Ìṣòro Ìtúnṣe {#troubleshooting}

- Jẹ́ kó dájú pé Thunderbird jẹ́ 128 ESR tàbí tuntun síi
- Lo Error Console fún àwọn ìṣòro ìṣiṣẹ́
- Bí àwọn ètò tí a pamọ́ bá dà bí ẹni pé wọ́n kò ń ṣiṣẹ́ dáadáa, tún Thunderbird bẹ̀rẹ̀ kí o tún gbìyànjú. (Thunderbird lè pa ìpinnu pamọ́ kọjá ìpẹ̀yà; ìbẹrẹ tuntun ń jẹ́ kí a gba àwọn ètò tuntun.)

---

### CI & Ìbòjúbo {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ń ṣiṣẹ́ vitest pẹ̀lú ìfarapa ìbòjúbo (85% àwọn ìlà/ iṣẹ́/ ẹ̀ka/ àwọn gbólóhùn). Bí a kò bá pé ìfarapa wọ̀nyí, iṣẹ́ yóò kùnà.
- Ìṣàn iṣẹ́ náà ń gbé ohun‑èlò `coverage-html` sókè pẹ̀lú ìròyìn HTML; gba a sílẹ̀ láti ojú‑ìwé iṣẹ́ (Actions → ìṣiṣẹ́ tó kẹ́yìn → Artifacts).

---

### Ilowosi {#contributing}

- Wo CONTRIBUTING.md fún ìlànà ẹ̀ka/commit/PR
- Ìmọ̀ràn: Ṣẹda profaili ìdàgbàsókè Thunderbird lọ́tọ̀ fún ìdánwò kí o má ba profaili ojoojúmọ́ rẹ jẹ.

---

### Ìtumọ̀

- Ṣíṣe iṣẹ́ ìtumọ̀ ńlá “gbogbo → gbogbo” lè lọra àti gbowó. Bẹ̀rẹ̀ pẹ̀lú apakan díẹ̀ (àpẹẹrẹ, diẹ̀ lára ìwé àti agbègbè 1–2), ṣàyẹ̀wò abajade, lẹ́yìn náà túbọ̀ kó síi.

---

- Ilànà àtún‑gbìyànjú: iṣẹ́ ìtumọ̀ lè ṣe àtún‑gbìyànjú tó 3 pẹ̀lú àfikún ìdákẹ́jẹ̀ pẹ̀lú àsìkò ìdákẹ́jẹ̀ tó ń pọ̀ síi ní àwọn aṣiṣe API; wo `scripts/translate_web_docs_batch.js` àti `scripts/translate_web_docs_sync.js`.

Àwòrán iboju fún ìwé

- Pa àwọn àwòrán mọ́ ní `website/static/img/`.
- Ṣàtọka wọn ní MD/MDX nípasẹ̀ `useBaseUrl('/img/<filename>')` kí àwọn ọ̀nà ṣiṣẹ́ pẹ̀lú `baseUrl` ojúlé náà.
- Lẹ́yìn fífi kún tàbí pípàdarọ orúkọ àwọn àwòrán ní abẹ́ `website/static/img/`, jẹ́rìí pé gbogbo ìtọ́kasí ṣi ń lo `useBaseUrl('/img/…')` ó sì ń hàn ní àkànṣe agbègbè.
  Àwọn favicon

- `favicon.ico` oníwọ̀n‑pọ̀ ni a ń dá sílẹ̀ laifọwọyi ní gbogbo ọ̀nà ikọ́ (Make + scripts) nípasẹ̀ `website/scripts/build-favicon.mjs`.
- Kò sí ìgbésẹ̀ ọwọ́ kankan; mímúdójúìwọ̀n `icon-*.png` tó.
  Ìmọ̀ràn àyẹ̀wò

- Pa `id` front‑matter mọ́ bí ó ti rí nínú àwọn ìwé tí a túmọ̀; túmọ̀ `title` àti `sidebar_label` nìkan bí wọ́n bá wà.

#### clean {#mt-clean}

- Ìdí: yọ àwọn ohun èlò ikọ́/àkànṣe agbègbè kúrò.
- Lílò: `make clean`
- Yọ (bí ó bá wà):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Ìdí: fọ́ọ̀mù, ṣàdánwò, ṣe imúdójúìwọ̀n changelog, commit, àti push.
- Lílò: `make commit`
- Alaye: ń ṣiṣẹ́ Prettier (kọ), `make test`, `make test_i18n`; ń kún un sí changelog nígbà tí àwọn ìyàtọ̀ tí a ti ṣe pẹ̀lú staging bá wà; ń push sí `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Ìdí: ṣiṣẹ́ ESLint nípasẹ̀ àtúnṣe flat.
- Lílò: `make eslint`

---

#### help {#mt-help}

- Ìdí: ṣe àkóso gbogbo àfojúsùn pẹ̀lú ìwé ìlà‑kan.
- Lílò: `make help`

---

#### lint {#mt-lint}

- Ìdí: lint MailExtension pẹ̀lú `web-ext`.
- Lílò: `make lint`
- Àkíyèsí: a ṣe àkópọ̀ `sources/manifest_LOCAL.json` → `sources/manifest.json`; a kọ ZIP tí a kọ́ sílẹ̀; ìkìlọ̀ kì í jẹ́ kí pàyà.

---

#### menu {#mt-menu}

- Ìdí: akojọ aṣayan ìbáṣepọ̀ láti yan àfojúsùn Make kan àti àwọn ariyanjiyan àṣàyàn.
- Lílò: ṣiṣẹ́ `make` láì sí ariyanjiyan kankan.
- Àkíyèsí: bí `whiptail` kò bá wà, akojọ aṣayan yóò padà sí `make help`.

---

#### pack {#mt-pack}

- Ìdí: kọ́ ATN àti LOCAL ZIPs (ó ń bẹ̀rẹ̀ pẹ̀lú `lint`).
- Lílò: `make pack`
- Ìmọ̀ràn: túbọ̀ ẹ̀yà nínú mejeeji `sources/manifest_*.json` kí o tó pa pọ̀.

---

#### prettier {#mt-prettier}

- Ìdí: fọ́ọ̀mù repo níbi rẹ̀.
- Lílò: `make prettier`

#### prettier_check {#mt-prettier_check}

- Ìdí: ṣàyẹ̀wò fọ́ọ̀màtì (kò kọ).
- Lílò: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Ìdí: orúkọ míràn fún `prettier`.
- Lílò: `make prettier_write`

---

#### test {#mt-test}

- Ìdí: ṣiṣẹ́ Prettier (kọ), ESLint, lẹ́yìn náà Vitest (ìbòjúbo bí a bá fi sílẹ̀).
- Lílò: `make test`

#### test_i18n {#mt-test_i18n}

- Ìdí: ìdánwò tó dojukọ i18n fún àwọn okun àfikún àti ìwé ojúlé wẹẹ̀bù.
- Lílò: `make test_i18n`
- Nṣiṣẹ́: `npm run test:i18n` àti `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Ìdí: túmọ̀ àwọn okun UI àfikún láti EN sí àwọn agbègbè míì.
- Lílò: `make translation_app OPTS="--locales all|de,fr"`
- Àkíyèsí: ń pa irisi bọtìnì mọ́ àti àfipamọ́; ń kọ àkọsílẹ̀ sí `translation_app.log`. Ìsọ̀fúnnípẹ̀lẹ́: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Ìdí: túmọ̀ ìwé ojúlé wẹẹ̀bù láti `website/docs/*.md` sí `website/i18n/<locale>/...`.
- Tí a fẹ́ràn jù: `translate_web_docs_batch` (OpenAI Batch API)
  - Lílò (àmọ̀ràn): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ipo atijọ́ pẹ̀lú ipo àyẹ̀wò ṣi wúlò: `OPTS="<doc|all> <lang|all>"`
- Ìhùwàsí: ń kọ JSONL, ń gbé sókè, ń wò ó lọwọ́lọwọ̀ gbogbo ìṣẹ́jú 30, ń gbà abajade kalẹ̀, ń kọ fáìlì.
- Àkíyèsí: iṣẹ́ batch lè gba tó wákàtí 24 láti parí (gẹ́gẹ́ bí window batch OpenAI). Console ń fi àsìkò tó lọ hàn ní gbogbo ìjọsọpọ̀.
- Ayika: `OPENAI_API_KEY` (pátá), àṣàyàn `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (a.y. 24h), `BATCH_POLL_INTERVAL_MS`.
- Atijọ́: `translate_web_docs_sync`
  - Lílò (àmọ̀ràn): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ipo atijọ́ pẹ̀lú ipo àyẹ̀wò ṣi wúlò: `OPTS="<doc|all> <lang|all>"`
- Ìhùwàsí: ìbéèrè ní ìṣọ̀kan fún kọọkan tọkọtaya (kò sí ìkojọpọ̀ batch).
- Àkíyèsí: Àwọn ìbánisọrọ̀ alákọ̀ọ́rẹ́ nígbà tí `OPTS` kò bá wà. Ọ̀nà méjèèjì ń pa àwọn kóòdù/àkọsílẹ̀ inline mọ́ ó sì ń pa `id` front‑matter mọ́; ń kọ àkọsílẹ̀ sí `translation_web_batch.log` (batch) tàbí `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Ìdí: túmọ̀ àwọn okun UI ojú‑ìwé (ojú‑ìwé, agbègbè lilọ kiri, ìpẹ̀yà) láti `website/i18n/en/code.json` sí gbogbo agbègbè ní abẹ́ `website/i18n/<locale>/code.json` (yọ `en` kúrò).
- Lílò: `make translate_web_index` tàbí `make translate_web_index OPTS="--locales de,fr [--force]"`
- Ìbẹ̀rẹ̀: export `OPENAI_API_KEY` (àṣàyàn: `OPENAI_MODEL=gpt-4o-mini`).
- Ìhùwàsí: ń fọwọ́sí ìtọ́kasí JSON, ń pa àwọn àfipamọ́ curly‑brace mọ́, ń pa àwọn URL mọ́ bíi tẹ́lẹ̀, ó sì ń tún gbìyànjú pẹ̀lú ìbáṣepọ̀ nígbà ìkùnà ìmúdájú.

---

#### web_build {#mt-web_build}

- Ìdí: kọ́ ojúlé ìwé sí `website/build`.
- Lílò: `make web_build OPTS="--locales en|de,en|all"` (tàbí ṣètò `BUILD_LOCALES="en de"`)
- Ilọ́ọ̀rẹ̀: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Ìdígbò: ń ṣiṣẹ́ `npm ci` ní `website/` nìkan bí `website/node_modules/@docusaurus` bá sọnù.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Ìdí: ṣàyẹ̀wò ìjápọ̀ aisinbọ.
- Lílò: `make web_build_linkcheck OPTS="--locales en|all"`
- Àkíyèsí: ń kọ sí `tmp_linkcheck_web_pages`; ń tún GH Pages `baseUrl` kọ sí `/`; ń fo àwọn ìjápọ̀ HTTP(S) òde.

#### web_build_local_preview {#mt-web_build_local_preview}

- Ìdí: àkànṣe gh‑pages agbègbè pẹ̀lú ìdánwò/ṣàyẹ̀wò‑ìjápọ̀ àṣàyàn.
- Lílò: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ìhùwàsí: ń gbìyànjú server àkànṣe Node kọ́kọ́ (`scripts/preview-server.mjs`, ń pamọ́ra `/__stop`), yóò padà sí `python3 -m http.server` bí kò bá ṣeé ṣe; ń sìn lórí 8080–8090; PID wà ní `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Ìdí: push `website/build` sí ẹka `gh-pages`.
- Lílò: `make web_push_github`

Ìmọ̀ràn: ṣètò `NPM=…` láti rọ́pò package manager tí Makefile ń lò (a.y. `npm`).
