---
id: development
title: 'Nkɔsoɔ'
sidebar_label: 'Nkɔsoɔ'
---

---

## Kyerɛkyerɛbea ma Nsɔftwɛɛ Asiesie {#development-guide}

:::note Sesa Borɔfo nko; asekyerɛ bɛkɔ baabiara
Toatoaso nkrataa no nko ara wɔ `website/docs` (Borɔfo) ase. Asekyerɛ a ɛwɔ `website/i18n/<locale>/…` mu yɛ otomatic na ɛnsɛ sɛ woseda nsatew mu. Fa asekyerɛ adwuma (te sɛ `make translate_web_docs_batch`) no de hyɛ lɔkael-emu nsɛm no so foforo.
:::

### Adeɛ a ɛsɛ wɔnya kan {#prerequisites}

- Node.js 22+ ne npm (asɔdwuma asɔ ama Node 22)
- Thunderbird 128 ESR anaa foforo koraa (ma nsatew-sɔhwɛ)

---

### Projehyɛ Nhomakorabea (kɛse-kɛse) {#project-layout-high-level}

- Root (siam): packaging script `distribution_zip_packer.sh`, nkrataa, mfoninifi
- `sources/`: kɔd a ɛdi kan ma add‑on no (background, options/popup UI, manifests, icons)
- `tests/`: Vitest nhyehyɛe
- `website/`: Docusaurus nkrataa (de i18n wɔ `website/i18n/de/...` ase)

---

### Sɛhyɛ & Nnɔba {#install-and-tooling}

- Sɛhyɛ root deps: `npm ci`
- Nkrataa (pɛ): `cd website && npm ci`
- Hwehwɛ atarget: `make help`

---

### Nkwa Asiesie (web‑ext run) {#live-dev-web-ext}

- Ntɛmntɛm saw-saw wɔ Firefox Desktop (UI smoke‑tests nko):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Di dwuma wɔ Thunderbird mu (ɛsɔ ani ma MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Akɔnsɔm:
- Ma Thunderbird Error Console no nna abue (Tools → Developer Tools → Error Console).
- Sɛ MV3 event krataafa no gyinae a, wɔgyae mu; san load add‑on no wɔ kɔd nsakrae akyi, anaa ma web‑ext yɛ auto‑reload.
- Nneɛma bi a ɛyɛ Firefox nko ara tumi yɛ ɔko; kɔsiɛ hwɛ no daa wɔ Thunderbird mu na API no ne no nyɛ pɛpɛɛpɛ.
- Thunderbird binary akwan (nsɛmnhyɛso):
- Linux: `thunderbird` (sɛ, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profail mpaepae: Fa Thunderbird profail foforo di asiesie mu adwuma na ɛmmfa wo da biara adesiesɛm ho mmfa.

---

### Make Targets (A‑de akyɛde) {#make-targets-alphabetical}

Makefile no de nneɛma a wɔyɛ dɛdaw wɔ asiesie mu kɔ tebea koro. Hyɛ `make help` bere biara na nya asɛm tiaa kɔtɔso baako fa atarget biara ho.

Akɔnsɔm: Sɛ wudi `make` a, na woamfa atarget bi anhyɛ ho a, ɛbue Whiptail menu ketewa bi a wobɛpaw atarget.

| Target                                                   | Nsɛnhyɛmu tiaa kɔtɔso baako                                                               |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Yi lokal build/preview nneɛma a wɔabɔ (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | Format, run tests (ka i18n ho), toatoaso changelog, commit na push.                       |
| [`eslint`](#mt-eslint)                                   | Yi ESLint fi flat config (`npm run -s lint:eslint`) so.                                   |
| [`help`](#mt-help)                                       | Kyerɛ atarget nyinaa ne asɛm tiaa kɔtɔso baako (ahyehyɛ).                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint wɔ `sources/` so (manifest tenten a ɛyɛ temp; bu ZIPs ho; mfomso nnyɛ kɛse). |
| [`menu`](#mt-menu)                                       | Menu a wubetumi apaw atarget ne akyidi pɛpɛɛpɛ mu.                                        |
| [`pack`](#mt-pack)                                       | Siw ATN & LOCAL ZIPs (hyɛ linter; frɛ packer script).                                     |
| [`prettier`](#mt-prettier)                               | Format repo no wɔ baabi (kyerɛ nsakrae).                                                  |
| [`prettier_check`](#mt-prettier_check)                   | Prettier wɔ check tebea mu (nni kyerɛw); bɔ dam sɛ ehia sɛ wɔreformat.                    |
| [`prettier_write`](#mt-prettier_write)                   | Din foforo ma `prettier`.                                                                 |
| [`test`](#mt-test)                                       | Prettier (kyerɛw), ESLint, na akyire Vitest (coverage sɛ wɔahyehyɛ).                      |
| [`test_i18n`](#mt-test_i18n)                             | i18n nko ara: add‑on placeholders/parity + website parity.                                |
| [`translate_app`](#mt-translation-app)                   | Din foforo ma `translation_app`.                                                          |
| [`translation_app`](#mt-translation-app)                 | Translate app UI nsɛmfua fi `sources/_locales/en/messages.json` mu.                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Translate website nkrataa de OpenAI Batch API (yɛ pɛ).                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Translate website nkrataa synchronously (legacy, non-batch).                              |
| [`translate_web_index`](#mt-translation_web_index)       | Din foforo ma `translation_web_index`.                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | Translate homepage/navbar/footer UI (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Siw nkrataa kɔ `website/build` (boa `--locales` / `BUILD_LOCALES`).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Link-check a ɛyɛ offline‑safe (twatwa remote HTTP[S]).                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokal gh‑pages preview; otum yɛ auto‑serve wɔ 8080–8090; tests/link‑check pɛ.             |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` kɔ `gh-pages` bɔbea so.                                              |

Syntax ma options

- Fa `make <command> OPTS="…"` so fa options (yɛ srɛ kɔts) mu. Atarget biara a ɛwɔ ase yi kyerɛ sɛnea wɔde di dwuma.

--

-

#### Akɔnsɔm ma Locale build {#locale-build-tips}

- Siw locale kakraa bi: hyɛ `BUILD_LOCALES="en de"` anaa fa `OPTS="--locales en,de"` ma web atarget.
- Preview locale bi pɛ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Siw & Pakete {#build-and-package}

- Siw ZIPs: `make pack`
- Yɛ ATN ne LOCAL ZIPs wɔ repo root mu (mfa nsatew nka artifacts)
- Akɔnsɔm: toatoaso version wɔ `sources/manifest_ATN.json` ne `sources/manifest_LOCAL.json` mu ansa na wode akɔ packaging
- Nsɛhyɛ nsatew (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → paw ZIP a wosiw no

---

### Sɔhwɛ {#test}

- Nhyehyɛe nyinaa: `make test` (Vitest)
- Kata-so (pɛ):
- `npm i -D @vitest/coverage-v8`
- Di `make test` na bue `coverage/index.html` na hwɛ HTML amanneɛbɔ
- i18n nko ara: `make test_i18n` (UI keys/placeholders/titles + website parity per‑locale per‑doc fa id/title/sidebar_label so hwɛ)

---

### Debugging & Nkrataaban (Logs) {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Sesa verbose logs wɔ runtime:
- Bue: `messenger.storage.local.set({ debug: true })`
- Dum: `messenger.storage.local.set({ debug: false })`
- Logs no bɛda adi bere a woretwerɛ/retu mmuaeɛ

---

### Nkrataa (website) {#docs-website}

- Dev server: `cd website && npm run start`
- Siw static site: `cd website && npm run build`
- Make a ɛtete (akyerɛwde tebea mu): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Deɛ wobetumi de ayɛ adwuma:
- EN nko, gyae tests/link‑check, nni push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Locales nyinaa, ka tests/link‑check ho, na akyire push: `make web_build_local_preview && make web_push_github`
- Ansan wobɛtɔ gua no, di link check a ɔyɛ offline‑safe no: `make web_build_linkcheck`.
- i18n: Borɔfo wɔ `website/docs/*.md`; Dwom (German) asekyerɛ wɔ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Hwehwɛ (search): Sɛ Algolia DocSearch env vars wɔ CI mu asiesie (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) a, site no de Algolia search di dwuma; bere a ɛnyɛ saa no, ɛkɔ lɔkal search. Wɔ homepage no so, kɔ `/` anaa `Ctrl+K` na bue search adaka no.

---

#### Donate mmerɛnsiane kwan {#donate-redirect}

- `website/src/pages/donate.js`
- Kwan: `/donate` (ne `/<locale>/donate`)
- Nneɛma a ɛkɔ so:
- Sɛ kwan a wo wɔ so no wɔ locale (sɛ `/de/donate`) a, fa no
- Sɛ anyɛ saa a, fa nea ɛfata paa fi `navigator.languages` mu ne locales a wɔahyehyɛ; sɛ ɛnsɔ ani a, fa default locale
- De kɔ:
- `en` → `/docs/donation`
- afoforo → `/<locale>/docs/donation`
- De `useBaseUrl` di dwuma ma baseUrl a ɛfata
- Kaa ho meta refresh + `noscript` link sɛ akyirikyiri

---

---

#### Akɔnsɔm ma Preview {#preview-tips}

- Gyae Node preview no fɛfɛɛfɛ: bue `http://localhost:<port>/__stop` (wɔbɛtintim akyi `Local server started`).
- Sɛ mfoninmmere no mmda adi wɔ MDX/JSX mu a, fa `useBaseUrl('/img/...')` so na di site `baseUrl` ni.
- Preview no fi kan na ɛhyɛ ase; link check no di akyiri na ɛnyɛ kwa (external links a abu no renka preview no).
- Preview URL nhwɛso: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (wɔbɛtintim akyi “Local server started”).
- External links wɔ link‑check mu: Nkwae bi a ɛwɔ abɔnten (sɛ addons.thunderbird.net) siw akwadworɔ dwumadie ano na ɛbɛkyerɛ 403 wɔ link checks. Preview no bɛhyɛ ase; eyi yɛ de a wonni ho abufuw.

---

#### Translate Website no {#translate-website}

Nea wubetumi atwerɛ asekyerɛ

- Website UI nko ara: homepage, navbar, footer, ne UI nsɛmfua afoforo. Nkrataa (docs) mu nsɛm deɛ ɛda Borɔfo nko ara so mprempren.

Baabi a wubesesa

- Sesa `website/i18n/<locale>/code.json` (fa `en` yɛ nhwɛso). Kora placeholders te sɛ `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` mu.

Bɔ mmra anaa ma fael no nya nkɔso foforo

- Bɔ stubs a ɛretɔ so kɔkɔɔ ma locales nyinaa: `npm --prefix website run i18n:stubs`
- Tiatia stubs fi Borɔfo so (ɛkyiri de nsɛmfua foforo ka ho): `npm --prefix website run i18n:stubs:force`
- Mmom ma locale baako pɛ: `npx --prefix website docusaurus write-translations --locale <locale>`

Translate homepage/navbar/footer UI nsɛmfua (OpenAI)

- Hyɛ akontaabu no nso (shell anaa .env) bere baako pɛ:
- `export OPENAI_API_KEY=sk-...`
- Pɛ: `export OPENAI_MODEL=gpt-4o-mini`
- Bere baako (locales nyinaa, gyae en): `make translate_web_index`
- Hyɛ kɔ locales bi pɛ: `make translate_web_index OPTS="--locales de,fr"`
- Tiatia nsɛmfua a ɛwɔ hɔ dedaw: `make translate_web_index OPTS="--force"`

Adansedi & san-sɔhwɛ

- Asekyerɛ script no hwɛ JSON su no mu, kora curly‑brace placeholders, na hwɛ sɛ URLs nnye nsi.
- Sɛ adansedi no di nkugu a, ɛbɛsan asɔ ne ho mmɔden kɔ si mmere abiɛsa na ansa na ɛgyae ma wode deɛ ɛwɔ hɔ dedaw di dwuma.

Preview wo locale no

- Dev server: `npm --prefix website run start`
- Kɔ `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Asoma

- Bue PR bi fa `code.json` fael no (anɔpa). Ma nsakrae no nkɛse; ka mfonin ketewa bi ho sɛ ebɛtumi.

---

### Bambɔ & Nhyehyɛe Akɔnsɔm {#security-and-configuration-tips}

- Ɛnsɛ sɛ wode `sources/manifest.json` bɔ repo (wɔde bɔ bere tiawa bere a wɔrebɔ)
- Kora `browser_specific_settings.gecko.id` pintinn na update channel no mmɛnsakra

---

### Nhyɛ (Settings) A Wɔkora So {#settings-persistence}

- Storage: Nhyɛ nyinaa a ɔde di dwuma wɔ `storage.local` mu na ɛkɔ so gyina so wɔ add‑on updates mu.
- Sɛhyɛ: Defaults no deɛ wɔde bɛto so bere a kɔkɔbɔ no nni hɔ pɛpɛɛpɛ (undefined).
- Toatoaso: Migration bɛhyɛ kɔkɔbɔ a ɛnni hɔ pɛpɛɛpɛ mu; ɛrenkyerɛ deɛ ɛwɔ hɔ dedaw.
- Schema kɔkɔbɔ: `settingsVersion` (mprempren `1`).
- Keys ne defaults:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kɔd: hwɛ `sources/background.js` → `initializeOrMigrateSettings()` ne `SCHEMA_VERSION`.

Nwomasiesie akwankyerɛ (de nhyehyɛe foforo ka ho)

- Ma `SCHEMA_VERSION` so wɔ `sources/background.js` mu.
- Fa kɔkɔbɔ foforo + default no ka `DEFAULTS` ade mu wɔ `initializeOrMigrateSettings()` mu.
- Fa "yɛ-sɛ-ɔyɛ-undefined pɛ" mmara di dwuma bere a woreto defaults so; mfa deɛ ɛwɔ hɔ dedaw nnsesa.
- Sɛ nhyehyɛe no da ɔde-ɛhwɛ (user) ani so a, fa no ka `sources/options.js` mu na fa nsɛmfua a wɔakɔ lɔkael mu ka ho.
- Fa sɔhwɛ ka ho/ntoto ho (hwɛ `tests/background.settings.migration.test.js`).

Nsatew-sɔhwɛ akɔnsɔm

- Yɛ fresh install te sɛ nea ɛkɔm: popo extension no data folda anaa hyɛ profail foforo ase.
- Yɛ update te sɛ nea ɛkɔm: fa `settingsVersion` yɛ `0` wɔ `storage.local` mu na san load; si gyinae sɛ deɛ ɛwɔ hɔ dedaw renyina mu na kɔkɔbɔ a ɛnni hɔ nko ara na wɔde bɛka ho.

---

### Nsemmɔne Ho Adwumayɛ (Troubleshooting) {#troubleshooting}

- Si gyinae sɛ Thunderbird yɛ 128 ESR anaa ɛto so
- Fa Error Console no di dwuma ma runtime nsɛmmɔne
- Sɛ nhyehyɛe a wɔkora so no te sɛ nea ɛnnyinaso yie a, san hyɛ Thunderbird ase na san sɔ hwɛ. (Thunderbird betumi akora tebea atravɛ; san hyɛ ase ma nhyehyɛe foforo bɛtwe.)

---

### CI & Kata‑so (Coverage) {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) hyɛ vitest so de coverage bɔbea (85% lines/functions/branches/statements). Sɛ wunnyae no a, adwuma no bɛdi nkugu.
- Workflow no de artifact `coverage-html` a ɛwɔ HTML amanneɛbɔ no sɔre; twe fi run kratafa so (Actions → run a ɛtɔ so akyire → Artifacts).

---

### Nkrabea (Contributing) {#contributing}

- Hwɛ CONTRIBUTING.md ma abakɔsɛm/commit/PR akwankyerɛ
- Akɔnsɔm: Bɔ Thunderbird asiesie profail foforo ma sɔhwɛ na ɛmmfa wo da biara profail ho mmfa.

---

### Asekyerɛ

- Bere tenten “all → all” asekyerɛ adwuma betumi asɛe bere na ɛtɔ kyɛ. Fi kakraa so (te sɛ nkrataa kakra ne locales 1–2), hwɛ so, na akyire kɔ so.

---

- San-sɔhwɛ nhyehyɛe: asekyerɛ adwuma betumi asɔ bio akɔsi mmere 3 de exponential backoff wɔ API mfomso so; hwɛ `scripts/translate_web_docs_batch.js` ne `scripts/translate_web_docs_sync.js`.

Mfoninifi ma nkrataa

- Sie mfonin wɔ `website/static/img/` mu.
- Fa wɔn ho to MD/MDX mu de `useBaseUrl('/img/<filename>')` na akwan no adwuma ne site `baseUrl` ka ho.
- Sɛ wode mfonin to hɔ anaa wosesa din wɔ `website/static/img/` ase a, si gyinae sɛ biribiara de `useBaseUrl('/img/…')` na wɔde rekyerɛ na ɛda preview lokal mu.
  Favicons

- `favicon.ico` a ɛwɔ nɔtre pii yɛ otomatic wɔ build akwan nyinaa (Make + scripts) fa `website/scripts/build-favicon.mjs` so.
- Nnsɛ hia; toatoaso `icon-*.png` pɛ na ɛso.
  Nhwehwɛmu akɔnsɔm

- Kora front‑matter `id` nsesa mu wɔ nkrataa a wɔakɔ lɔkael mu; kɔ asekyerɛ `title` ne `sidebar_label` nko ara bere a wɔwɔ hɔ.

#### clean {#mt-clean}

- Asɛmti: yi lokal build/preview nneɛma a wɔabɔ.
- Sɛnea ɛyɛ: `make clean`
- Yeyi (sɛ wɔwɔ hɔ a):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Asɛmti: format, sɔhwɛ, toatoaso changelog, commit, na push.
- Sɛnea ɛyɛ: `make commit`
- Nsɛnhyɛso: yɛ Prettier (kyerɛw), `make test`, `make test_i18n`; fa changelog ka ho bere a wɔde nsakrae asi twini so; push kɔ `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Asɛmti: run ESLint fa flat config so.
- Sɛnea ɛyɛ: `make eslint`

---

#### help {#mt-help}

- Asɛmti: kyerɛ atarget nyinaa ne asɛm tiaa.
- Sɛnea ɛyɛ: `make help`

---

#### lint {#mt-lint}

- Asɛmti: lint MailExtension no de `web-ext`.
- Sɛnea ɛyɛ: `make lint`
- Nkyerɛmu: kɔpi temp `sources/manifest_LOCAL.json` → `sources/manifest.json`; bu ZIPs a wɔasiw ho; kɔkɔbɔ nnyina mu mfa pipeline no mmɔ.

---

#### menu {#mt-menu}

- Asɛmti: menu a wubetumi apaw Make target ne akyidi pɛ.
- Sɛnea ɛyɛ: run `make` nni asɛmka.
- Nkyerɛmu: sɛ `whiptail` nni hɔ a, menu no bɛkɔ `make help` so.

---

#### pack {#mt-pack}

- Asɛmti: siw ATN ne LOCAL ZIPs (gyina `lint` so).
- Sɛnea ɛyɛ: `make pack`
- Akɔnsɔm: ma versions no so wɔ `sources/manifest_*.json` baanu mu ansa na wopaketa.

---

#### prettier {#mt-prettier}

- Asɛmti: format repo no wɔ baabi.
- Sɛnea ɛyɛ: `make prettier`

#### prettier_check {#mt-prettier_check}

- Asɛmti: si-sane-format (nni kyerɛw).
- Sɛnea ɛyɛ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Asɛmti: din foforo ma `prettier`.
- Sɛnea ɛyɛ: `make prettier_write`

---

#### test {#mt-test}

- Asɛmti: run Prettier (kyerɛw), ESLint, na akyire Vitest (coverage sɛ wɔinstɔl).
- Sɛnea ɛyɛ: `make test`

#### test_i18n {#mt-test_i18n}

- Asɛmti: i18n‑sisi sɔhwɛ ma add‑on nsɛmfua ne website nkrataa.
- Sɛnea ɛyɛ: `make test_i18n`
- Di dwuma: `npm run test:i18n` ne `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Asɛmti: translate add‑on UI nsɛmfua fi EN kɔ locales afoforo.
- Sɛnea ɛyɛ: `make translation_app OPTS="--locales all|de,fr"`
- Nkyerɛmu: kora key nhyehyɛe ne placeholders; kɔ log kɔ `translation_app.log`. Script din: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Asɛmti: translate website nkrataa fi `website/docs/*.md` kɔ `website/i18n/<locale>/...`.
- Deɛ yɛpɛ: `translate_web_docs_batch` (OpenAI Batch API)
  - Sɛnea ɛyɛ (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional nso gye tom: `OPTS="<doc|all> <lang|all>"`
- Nneɛma a ɛkɔ so: si JSONL, tow so, kɔhwɛ bere biara 30s, twe asɛmmisa yiye, kyerɛw fael.
- Tseaseɛ: batch adwuma betumi agye akɔsi dɔnhwere 24 (ɛfiri OpenAI batch bere mpu). Console no kyerɛ bere a atua so bere biara a wɔrepɛ asɛmmisa.
- Env: `OPENAI_API_KEY` (hia), pɛ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Sɛnea ɛyɛ (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional nso gye tom: `OPTS="<doc|all> <lang|all>"`
- Nneɛma a ɛkɔ so: asɛmmisa koro-koro de synchronous (batch nni hɔ).
- Nkyerɛmu: Ɔbɛbisa nsɛmmisa mu bere a `OPTS` wɔ hɔ nni hɔ. Mmode nyinaa kora code blocks/inline code na kora front‑matter `id`; kɔ log kɔ `translation_web_batch.log` (batch) anaa `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Asɛmti: translate website UI nsɛmfua (homepage, navbar, footer) fi `website/i18n/en/code.json` kɔ locales nyinaa a ɛwɔ `website/i18n/<locale>/code.json` ase (gyae `en`).
- Sɛnea ɛyɛ: `make translate_web_index` anaa `make translate_web_index OPTS="--locales de,fr [--force]"`
- Ahwehwɛdeɛ: export `OPENAI_API_KEY` (pɛ: `OPENAI_MODEL=gpt-4o-mini`).
- Nneɛma a ɛkɔ so: siw JSON nhyehyɛe mu, kora curly‑brace placeholders, kora URLs nnsesa, na san-sɔ hwɛ de mmuaeɛ ma validation mfomso.

---

#### web_build {#mt-web_build}

- Asɛmti: siw nkrataa site kɔ `website/build`.
- Sɛnea ɛyɛ: `make web_build OPTS="--locales en|de,en|all"` (anaa hyɛ `BUILD_LOCALES="en de"`)
- Yɛbrɛ mu: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Nhyɛe: di `npm ci` wɔ `website/` mu bere a `website/node_modules/@docusaurus` nni hɔ pɛpɛɛpɛ.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Asɛmti: link‑check a ɛyɛ offline‑safe.
- Sɛnea ɛyɛ: `make web_build_linkcheck OPTS="--locales en|all"`
- Nkyerɛmu: siw kɔ `tmp_linkcheck_web_pages`; sesa GH Pages `baseUrl` kɔ `/`; twatwa remote HTTP(S) links.

#### web_build_local_preview {#mt-web_build_local_preview}

- Asɛmti: lokal gh‑pages preview a wubetumi aka tests/link‑check ho.
- Sɛnea ɛyɛ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Nneɛma a ɛkɔ so: bɔ mmɔden de Node preview server di kan (`scripts/preview-server.mjs`, boa `/__stop`), na sɛ ɛyɛ yiye mmaa a, kɔ `python3 -m http.server`; yɛ serve wɔ 8080–8090; PID wɔ `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Asɛmti: push `website/build` kɔ `gh-pages` bɔbea so.
- Sɛnea ɛyɛ: `make web_push_github`

Akɔnsɔm: hyɛ `NPM=…` na sukyerɛ package manager a Makefile de di dwuma (default yɛ `npm`).

---
