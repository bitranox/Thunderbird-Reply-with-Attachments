---
id: development
title: 'Mmepe'
sidebar_label: 'Mmepe'
---

---

## Nduzi Mmepe {#development-guide}

:::note Dezie naanị Bekee; ntụgharị ga-agbasa
Melite akwụkwọ ntụziaka naanị n’okpuru `website/docs` (English). A na-emepụta ntụgharị n’okpuru `website/i18n/<locale>/…` ma ekwesịghị idezi ha n’aka. Jiri ọrụ ntụgharị (dịka `make translate_web_docs_batch`) iji mee ka ọdịnaya asụsụ mpaghara dị ọhụrụ.
:::

### Ihe achọrọ tupu amalite {#prerequisites}

- Node.js 22+ na npm (anwalere ya na Node 22)
- Thunderbird 128 ESR ma ọ bụ nke ọhụrụ (maka nnwale aka)

---

### Nhazi Ọrụ (elu‑ogo) {#project-layout-high-level}

- Mgbọrọgwụ: skripti nkwakọ `distribution_zip_packer.sh`, akwụkwọ ntụziaka, nseta ihuenyo
- `sources/`: koodu mgbakwunye isi (ndabere, nhọrọ/popup UI, manifests, akara ngosi)
- `tests/`: ngwugwu ule Vitest
- `website/`: akwụkwọ Docusaurus (ya na i18n n’okpuru `website/i18n/de/...`)

---

### Wụnye & Ngwaọrụ {#install-and-tooling}

- Wụnye ndị a chọrọ na mgbọrọgwụ: `npm ci`
- Akwụkwọ (nhọrọ): `cd website && npm ci`
- Chọpụta ebumnuche: `make help`

---

### Mmepe n’oge ndụ (web‑ext run) {#live-dev-web-ext}

- Ugboro ọsọ ọsọ na Firefox Desktop (ule UI smoke naanị):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Gbaa ya na Thunderbird (ka mma maka MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Ndụmọdụ:
- Debe Error Console nke Thunderbird meghere (Ngwaọrụ → Ngwaọrụ Mmepe → Error Console).
- Akwụkwọ ihe omume MV3 na-adada mgbe ha na-ezu ike; bulite mgbakwunye ọzọ mgbe agbanweela koodu, ma ọ bụ hapụ web‑ext ka ọ na-ebudata onwe ya.
- Ụfọdụ omume nke Firefox naanị dị iche; nyochaa ya mgbe niile na Thunderbird iji jide nhata API.
- Ụzọ faịlụ binary Thunderbird (ihe atụ):
- Linux: `thunderbird` (dịka, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ịkewpụ profaịlụ: Jiri profaịlụ Thunderbird dị iche maka mmepe ka ị ghara imetụta ntọala kwa ụbọchị gị.

---

### Ebumnuche Make (odide) {#make-targets-alphabetical}

Makefile na-eme ka usoro mmepe a na-eme ugboro ugboro bụrụ otu. Gbaa `make help` n'oge ọ bụla maka nchịkọta ahịrị otu nke ebumnuche ọ bụla.

Ndụmọdụ: ịgba `make` na-enweghị ebumnuche mepee menu Whiptail dị mfe iji họrọ ebumnuche.

| Ebumnuche                                                | Nkọwa ahịrị otu                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Wepụ ihe fọdụrụ owuwu/mbipụta ngosi mpaghara (tmp/, web-local-preview/, website/build/).          |
| [`commit`](#mt-commit)                                   | Hazie, gbaa ule (gụnyere i18n), melite changelog, commit & push.                                  |
| [`eslint`](#mt-eslint)                                   | Gbaa ESLint site na flat config (`npm run -s lint:eslint`).                                       |
| [`help`](#mt-help)                                       | Depụta ebumnuche niile na akwụkwọ ahịrị otu (edozi nke ọma).                                      |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (manifest nwa oge; na-eleghara ZIPs anya; na-adịghị egbochi pipeline). |
| [`menu`](#mt-menu)                                       | Menu mmekọrịta iji họrọ ebumnuche na nhọrọ agumentị.                                              |
| [`pack`](#mt-pack)                                       | Wuo ATN & LOCAL ZIPs (na-agba linter; na-akpọ skripti packer).                                    |
| [`prettier`](#mt-prettier)                               | Hazie ndekọ nchekwa na ebe ya (na-ede mgbanwe).                                                   |
| [`prettier_check`](#mt-prettier_check)                   | Prettier na ọnọdụ nchọpụta (enweghị ide); na-ada ma ọ bụrụ na achọrọ nhazi ọzọ.                   |
| [`prettier_write`](#mt-prettier_write)                   | Aha ọzọ maka `prettier`.                                                                          |
| [`test`](#mt-test)                                       | Prettier (ide), ESLint, mgbe ahụ Vitest (mkpuchi ma ọ bụrụ na e haziri ya).                       |
| [`test_i18n`](#mt-test_i18n)                             | Ule i18n naanị: ndị dochie anya mgbakwunye/nhata + nhata weebụsaịtị.                              |
| [`translate_app`](#mt-translation-app)                   | Aha ọzọ maka `translation_app`.                                                                   |
| [`translation_app`](#mt-translation-app)                 | Tụgharịa eriri UI nke ngwa site na `sources/_locales/en/messages.json`.                           |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tụgharịa akwụkwọ weebụsaịtị site na OpenAI Batch API (a na-akwado ya).                            |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tụgharịa akwụkwọ weebụsaịtị n’otu-otu (ochie, na-abụghị batch).                                   |
| [`translate_web_index`](#mt-translation_web_index)       | Aha ọzọ maka `translation_web_index`.                                                             |
| [`translation_web_index`](#mt-translation_web_index)     | Tụgharịa UI nke homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).      |
| [`web_build`](#mt-web_build)                             | Wuo akwụkwọ gaa `website/build` (na-akwado `--locales` / `BUILD_LOCALES`).                        |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Nlele njikọ na-enweghị ịntanetị (na-agafe HTTP[S] dịpụrụ adịpụ).                                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Ngosi mpaghara gh‑pages; na-eje ozi akpaka na 8080–8090; ule/lele njikọ bụ nhọrọ.                 |
| [`web_push_github`](#mt-web_push_github)                 | Pusha `website/build` na alaka `gh-pages`.                                                        |

Syntax for options

- Jiri `make <command> OPTS="…"` nyefee nhọrọ (a na-akwado iji quotes). Ebumnuche nke dị n’okpuru na-egosi ihe atụ ojiji.

--

-

#### Ndụmọdụ owuwu asụsụ mpaghara {#locale-build-tips}

- Wuo obere nchịkọta nke asụsụ: tọọ `BUILD_LOCALES="en de"` ma ọ bụ zipu `OPTS="--locales en,de"` na ebumnuche weebụ.
- Lelee ngosipụta asụsụ kpọmkwem: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Wuo & Nkwakọ {#build-and-package}

- Wuo ZIPs: `make pack`
- Na-emepụta ATN na LOCAL ZIPs na mgbọrọgwụ repo (ejila aka dezie ihe arụpụtara)
- Ndụmọdụ: melite nsụgharị na `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json` tupu nkwakọ
- Wunye aka (mmepe): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → họrọ ZIP e wuru

---

### Ule {#test}

- Ngwugwu zuru ezu: `make test` (Vitest)
- Mkpuchi (nhọrọ):
- `npm i -D @vitest/coverage-v8`
- Gbaa `make test`; mepee `coverage/index.html` maka akụkọ HTML
- i18n naanị: `make test_i18n` (UI keys/placeholders/titles + nhata weebụsaịtị kwa-asụsụ kwa-doc tinyere nyocha id/title/sidebar_label)

---

### Nchọpụta Nsogbu & Ndetu {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Gbanwee ndetu zuru oke n’oge ịgba:
- Kpọghee: `messenger.storage.local.set({ debug: true })`
- Mechie: `messenger.storage.local.set({ debug: false })`
- Ndetu na-apụta mgbe ị na-ede/na-eziga azịza

---

### Akwụkwọ (weebụsaịtị) {#docs-website}

- Sava mmepe: `cd website && npm run start`
- Wuo saịtị kwụ ọtọ: `cd website && npm run build`
- Nkwekọrịta Make (odide): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ihe atụ ojiji:
- Bekee naanị, gafee ule/lele njikọ, enweghị push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Asụsụ niile, tinyere ule/lele njikọ, mgbe ahụ push: `make web_build_local_preview && make web_push_github`
- Tupu bipụta, gbaa nlele njikọ na-enweghị ịntanetị: `make web_build_linkcheck`.
- i18n: Bekee dị na `website/docs/*.md`; ntụgharị German dị na `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Nchọcha: Ọ bụrụ na arụmọrụ gburugburu ebe obibi Algolia DocSearch etinyere na CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), saịtị ga-eji nchọcha Algolia; ma ọ bụghị ya, ọ laghachi na nchọcha mpaghara. Na ibe ụlọ, pịa `/` ma ọ bụ `Ctrl+K` iji mepee igbe nchọcha.

---

#### Donate redirect route {#donate-redirect}

- `website/src/pages/donate.js`
- Ụzọ: `/donate` (na `/<locale>/donate`)
- Omume:
- Ọ bụrụ na ụzọ ugbu a nwere asụsụ (dịka, `/de/donate`), jiri ya
- Ma ọ bụghị ya, họrọ nke kacha kwekọọ site na `navigator.languages` megide asụsụ e haziri; lọghachite na asụsụ ndabara
- Na-ezigagharị gaa:
- `en` → `/docs/donation`
- ndị ọzọ → `/<locale>/docs/donation`
- Na-eji `useBaseUrl` maka ijikwa baseUrl nke ọma
- Na-agụnye meta refresh + njikọ `noscript` dịka nkwado azụ

---

---

#### Ndụmọdụ Ngosi {#preview-tips}

- Kwụsị ngosipụta Node nke ọma: mepee `http://localhost:<port>/__stop` (a na-ebipụta ya mgbe `Local server started`).
- Ọ bụrụ na onyonyo anaghị ebudata na MDX/JSX, jiri `useBaseUrl('/img/...')` ka ọ soro `baseUrl` nke saịtị.
- Ngosipụta na-amalite mbụ; nlele njikọ na-agba mgbe e mesịrị ma ọ naghị egbochi (njikọ mpụga gbajiri agaghị egbochi ngosipụta).
- URL ngosipụta atụ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (a na-ebipụta ya mgbe “Local server started”).
- Njikọ mpụga na link‑check: Ụfọdụ saịtị mpụga (dịka addons.thunderbird.net) na-egbochi crawlers akpaka ma nwee ike igosi 403 n’ime nlele njikọ. Ngosipụta ka na-amalite; ị nwere ike ileghara ha anya n’enweghị ihe ize ndụ.

---

#### Tụgharịa Weebụsaịtị {#translate-website}

Ihe ị nwere ike ịtụgharịa

- UI nke weebụsaịtị naanị: homepage, navbar, footer, na eriri UI ndị ọzọ. Ihe ọdịnaya akwụkwọ ka bụ Bekee naanị ugbu a.

Ebee ka ị dezie

- Dezie `website/i18n/<locale>/code.json` (jiri `en` dịka ntụaka). Debe ndị dochie anya dịka `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ka ha ghara ịgbanwe.

Mepụta ma ọ bụ melite faịlụ

- Mepụta stubs na-efu maka asụsụ niile: `npm --prefix website run i18n:stubs`
- Deegharịa stubs site na Bekee (mgbe itinyere eriri ọhụrụ): `npm --prefix website run i18n:stubs:force`
- Nhọrọ ọzọ maka asụsụ otu: `npx --prefix website docusaurus write-translations --locale <locale>`

Tụgharịa eriri UI nke homepage/navbar/footer (OpenAI)

- Tọọ nkwenye otu ugboro (shell ma ọ bụ .env):
- `export OPENAI_API_KEY=sk-...`
- Nhọrọ: `export OPENAI_MODEL=gpt-4o-mini`
- Otu ugboro (asụsụ niile, gafee en): `make translate_web_index`
- Kekọrịta na asụsụ ụfọdụ naanị: `make translate_web_index OPTS="--locales de,fr"`
- Wepụ ma deegharịa uru dị adị: `make translate_web_index OPTS="--force"`

Nlele ziri ezi & mgbalị ọzọ

- Skripti ntụgharị na-enyocha ụdị JSON, na-echekwa ndị dochie anya curly‑brace, ma jide n’aka na URLs agbanwebeghị.
- Ọ bụrụ na nlele ada, ọ na-anwa ọzọ ruo ugboro 2 na nzaghachi tupu ọ hapụ uru dị adị.

Lelee asụsụ gị

- Sava mmepe: `npm --prefix website run start`
- Gaa `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Nzipu

- Mepee PR na faịlụ `code.json` edegharịrị. Debe mgbanwe ka ha bụrụ ihe dị mkpirikpi ma tinye nseta ihuenyo ngwa ngwa mgbe o kwere mee.

---

### Ndụmọdụ nchekwa & Nhazi {#security-and-configuration-tips}

- Emegide ime commit `sources/manifest.json` (a na-emepụta ya nwa oge site n’owuwu)
- Debe `browser_specific_settings.gecko.id` ka ọ dịgide iji chekwaa chanel mmelite

---

### Ịdịgide Ntọala {#settings-persistence}

- Nchekwa: Ntọala onye ọrụ niile bi na `storage.local` ma dịgide n’oge mmelite mgbakwunye.
- Wunye: A na-etinye ndabara naanị mgbe isi na-adịghị adị kpamkpam (undefined).
- Mmelite: Mbugharị na-eju naanị igodo ndị na-efu; a na-agaghị edechaghachi uru dị adị.
- Akara schema: `settingsVersion` (ugbu a `1`).
- Igodo na ndabara:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Koodu: hụ `sources/background.js` → `initializeOrMigrateSettings()` na `SCHEMA_VERSION`.

Usoro mmepe (itinye ntọala ọhụrụ)

- Bulie `SCHEMA_VERSION` na `sources/background.js`.
- Tinye igodo ọhụrụ + ndabara na ihe `DEFAULTS` dị na `initializeOrMigrateSettings()`.
- Jiri iwu "only-if-undefined" mgbe ị na-etinye ndabara; ejila deegharịa uru dị adị.
- Ọ bụrụ na ntọala ahụ a na-ahụ anya n’aka onye ọrụ, jikọọ ya na `sources/options.js` ma tinye eriri asụsụ mpaghara.
- Tinye/dozie ule (lee `tests/background.settings.migration.test.js`).

Ndụmọdụ nnwale aka

- Mee ka o dị ka wụnye ọhụrụ: kpochapụ ndekọ data nke mgbatị ma ọ bụ bido na profaịlụ ọhụrụ.
- Mee ka o dị ka mmelite: tọọ `settingsVersion` ka ọ bụrụ `0` na `storage.local` ma bulitegharịa; jide n’aka na uru dị adị agbanwughị ma naanị igodo na-efu ka etinyere.

---

### Nchọpụta Nsogbu {#troubleshooting}

- Jide n’aka na Thunderbird bụ 128 ESR ma ọ bụ nke ọhụrụ
- Jiri Error Console maka nsogbu n’oge ịgba
- Ọ bụrụ na ntọala echekwara na-adịghị arụ ọrụ nke ọma, bido Thunderbird ọzọ ma nwaa ọzọ. (Thunderbird nwere ike ichekwa ọnọdụ n’oge ọrụ; ibido ọzọ na-eme ka ntọala ọhụrụ budata.)

---

### CI & Mkpuchi {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) na-agba vitest na oke mkpuchi (85% ahịrị/ọrụ/alaka/ikwu). Ọ bụrụ na a naghị enweta oke ndị a, ọrụ na-ada.
- Usoro ọrụ na-ebudata ihe arụpụtara `coverage-html` nwere akụkọ HTML; budata ya site na ibe ịgba (Actions → latest run → Artifacts).

---

### Ịnye aka {#contributing}

- Hụ CONTRIBUTING.md maka nduzi maka alaka/commit/PR
- Ndụmọdụ: mepụta profaịlụ mmepe Thunderbird dị iche maka nnwale ka ị ghara imetụta profaịlụ gị kwa ụbọchị.

---

### Ntụgharị asụsụ

- Ịgba ọrụ ntụgharị buru ibu “all → all” nwere ike ịdị nwayọ ma dị oke ọnụ. Malite na obere akụkụ (dịka, akwụkwọ ole na ole na asụsụ 1–2), nyochaa nsonaazụ, wee gbasaa.

---

- Iwu mgbalị ọzọ: ọrụ ntụgharị na-anwa ruo ugboro 3 na exponential backoff mgbe e nwere njehie API; hụ `scripts/translate_web_docs_batch.js` na `scripts/translate_web_docs_sync.js`.

Nseta ihuenyo maka akwụkwọ

- Debe onyonyo n’okpuru `website/static/img/`.
- Kpọọ ha na MD/MDX site na `useBaseUrl('/img/<filename>')` ka ụzọ ha kwekọọ na `baseUrl` nke saịtị.
- Mgbe itinyere ma ọ bụ ịgbanwe aha onyonyo n’okpuru `website/static/img/`, jide n’aka na ntụnye niile ka na-eji `useBaseUrl('/img/…')` ma na-egosi na ngosipụta mpaghara.
  Favicons

- A na-emepụta `favicon.ico` ọtụtụ nha akpaghị aka n’ụzọ owuwu niile (Make + scripts) site na `website/scripts/build-favicon.mjs`.
- Enweghị usoro aka achọrọ; imelite `icon-*.png` ezuru.
  Ndụmọdụ nyocha

- Debe `id` nke front‑matter ka ọ ghara ịgbanwe n’akwụkwọ tụgharịrị; tụgharịa naanị `title` na `sidebar_label` ma ọ bụrụ na ha dị.

#### clean {#mt-clean}

- Ebumnuche: wepụ ihe fọdụrụ owuwu/ngozi mpaghara.
- Ojiji: `make clean`
- Na-ewepụ (ọ bụrụ na ha dị):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Ebumnuche: hazie, ule, melite changelog, mee commit, ma push.
- Ojiji: `make commit`
- Nkọwa: na-agba Prettier (ide), `make test`, `make test_i18n`; na-agbakwunye changelog mgbe enwere staged diffs; na-push na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Ebumnuche: gbaa ESLint site na flat config.
- Ojiji: `make eslint`

---

#### help {#mt-help}

- Ebumnuche: depụta ebumnuche niile na akwụkwọ ahịrị otu.
- Ojiji: `make help`

---

#### lint {#mt-lint}

- Ebumnuche: mee lint nke MailExtension site n’iji `web-ext`.
- Ojiji: `make lint`
- Nkọwa: na-akọwapụta nwa oge `sources/manifest_LOCAL.json` → `sources/manifest.json`; na-eleghara ZIPs e wuru anya; ikilata adịghị eme ka pipeline daa.

---

#### menu {#mt-menu}

- Ebumnuche: menu mmekọrịta iji họrọ ebumnuche Make na agumentị nhọrọ.
- Ojiji: gbaa `make` na-enweghị agumentị.
- Nkọwa: ma ọ bụrụ na `whiptail` adịghị, menu ga-alaghachi na `make help`.

---

#### pack {#mt-pack}

- Ebumnuche: wuo ATN na LOCAL ZIPs (dabere na `lint`).
- Ojiji: `make pack`
- Ndụmọdụ: bulie nsụgharị na `sources/manifest_*.json` abụọ tupu nkwakọ.

---

#### prettier {#mt-prettier}

- Ebumnuche: hazie repo na ebe ya.
- Ojiji: `make prettier`

#### prettier_check {#mt-prettier_check}

- Ebumnuche: nyochaa nhazi (enweghị ide).
- Ojiji: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Ebumnuche: aha ọzọ maka `prettier`.
- Ojiji: `make prettier_write`

---

#### test {#mt-test}

- Ebumnuche: gbaa Prettier (ide), ESLint, mgbe ahụ Vitest (mkpuchi ma ọ bụrụ na etinyere ya).
- Ojiji: `make test`

#### test_i18n {#mt-test_i18n}

- Ebumnuche: ule i18n maka eriri mgbakwunye na akwụkwọ weebụsaịtị.
- Ojiji: `make test_i18n`
- Na-agba: `npm run test:i18n` na `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Ebumnuche: tụgharịa eriri UI mgbakwunye site na EN gaa asụsụ ndị ọzọ.
- Ojiji: `make translation_app OPTS="--locales all|de,fr"`
- Nkọwa: na-echekwa usoro igodo na ndị dochie anya; na-ede ndetu na `translation_app.log`. Usoro skripti: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Ebumnuche: tụgharịa akwụkwọ weebụsaịtị site na `website/docs/*.md` gaa `website/i18n/<locale>/...`.
- A na-akwado: `translate_web_docs_batch` (OpenAI Batch API)
  - Ojiji (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ọdịnala positional ka a na-anabata: `OPTS="<doc|all> <lang|all>"`
- Omume: na-ewu JSONL, na-ebudata, na-ajụ ajụjụ kwa 30s, na-ebudata nsonaazụ, na-ede faịlụ.
- Rịba ama: ọrụ batch nwere ike were ruo awa 24 iji kwụsịcha (dị ka windo batch nke OpenAI). Console na-egosi oge gafere na ajụjụ ọ bụla.
- Env: `OPENAI_API_KEY` (achọrọ), nhọrọ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ndabara 24h), `BATCH_POLL_INTERVAL_MS`.
- Ọdịnala: `translate_web_docs_sync`
  - Ojiji (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ọdịnala positional ka a na-anabata: `OPTS="<doc|all> <lang|all>"`
- Omume: arịrịọ synchronous kwa-pia (enweghị nchikota batch).
- Nkọwa: Ajụjụ mmekọrịta mgbe e wepụrụ `OPTS`. Ụzọ abụọ na-echekwa ngọngọ koodu/koodu n’ahịrị ma na-edobe `id` nke front‑matter ka ọ ghara ịgbanwe; na-ede ndetu na `translation_web_batch.log` (batch) ma ọ bụ `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Ebumnuche: tụgharịa eriri UI weebụsaịtị (homepage, navbar, footer) site na `website/i18n/en/code.json` gaa asụsụ niile n’okpuru `website/i18n/<locale>/code.json` (ewepu `en`).
- Ojiji: `make translate_web_index` ma ọ bụ `make translate_web_index OPTS="--locales de,fr [--force]"`
- Ọrụ achọrọ: export `OPENAI_API_KEY` (nhọrọ: `OPENAI_MODEL=gpt-4o-mini`).
- Omume: na-enyocha usoro JSON, na-echekwa ndị dochie anya curly‑brace, na-edobe URLs ka ha ghara ịgbanwe, na-anwa ọzọ na nzaghachi ma ọ bụrụ na e nwere njehie nlele.

---

#### web_build {#mt-web_build}

- Ebumnuche: wuo saịtị akwụkwọ gaa `website/build`.
- Ojiji: `make web_build OPTS="--locales en|de,en|all"` (ma ọ bụ tọọ `BUILD_LOCALES="en de"`)
- N'ime: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: na-agba `npm ci` na `website/` naanị ma ọ bụrụ na `website/node_modules/@docusaurus` adịghị.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Ebumnuche: nlele njikọ na-enweghị ịntanetị.
- Ojiji: `make web_build_linkcheck OPTS="--locales en|all"`
- Nkọwa: na-ewu na `tmp_linkcheck_web_pages`; na-edegharịa GH Pages `baseUrl` gaa `/`; na-agafe njikọ HTTP(S) dịpụrụ adịpụ.

#### web_build_local_preview {#mt-web_build_local_preview}

- Ebumnuche: ngosipụta mpaghara gh‑pages nwere ule/lele njikọ nhọrọ.
- Ojiji: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Omume: na-anwa sava ngosipụta Node mbụ (`scripts/preview-server.mjs`, na-akwado `/__stop`), laghachi na `python3 -m http.server`; na-eje ozi na 8080–8090; PID dị na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Ebumnuche: push `website/build` na alaka `gh-pages`.
- Ojiji: `make web_push_github`

Ndụmọdụ: tọọ `NPM=…` iji gbanwee package manager a na-eji na Makefile (ndabara bụ `npm`).

---
