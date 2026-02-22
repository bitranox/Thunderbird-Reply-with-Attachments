---
id: development
title: 'Pag-unlad'
sidebar_label: 'Pagpapaunlad'
---

---

## Gabay sa Pag-develop {#development-guide}

:::note I-edit ang English lang; kusang kumakalat ang mga salin
I-update ang dokumentasyon **tanging** sa ilalim ng `website/docs` (English). Ang mga salin sa ilalim ng `website/i18n/<locale>/…` ay awtomatikong ginagawa at hindi dapat mano-manong i-edit. Gamitin ang mga gawain sa pagsasalin (hal., `make translate_web_docs_batch`) para i-refresh ang lokalisadong nilalaman.
:::

### Mga Kinakailangan {#prerequisites}

- Node.js 22+ at npm (nasubukan sa Node 22)
- Thunderbird 128 ESR o mas bago (para sa manual na pag-test)

---

### Istruktura ng Proyekto (high‑level) {#project-layout-high-level}

- Root: packaging script `distribution_zip_packer.sh`, docs, mga screenshot
- `sources/`: pangunahing code ng add-on (background, options/popup UI, manifests, icons)
- `tests/`: suite ng Vitest
- `website/`: mga docs ng Docusaurus (na may i18n sa ilalim ng `website/i18n/de/...`)

---

### Pag-install at mga Tool {#install-and-tooling}

- I-install ang mga dependency sa root: `npm ci`
- Docs (opsyonal): `cd website && npm ci`
- Tuklasin ang mga target: `make help`

---

### Live Dev (web‑ext run) {#live-dev-web-ext}

- Mabilis na loop sa Firefox Desktop (UI smoke‑tests lang):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Patakbuhin sa Thunderbird (inirerekomenda para sa MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Mga tip:
- Panatilihing bukas ang Error Console ng Thunderbird (Tools → Developer Tools → Error Console).
- Ang MV3 event pages ay nasususpinde kapag idle; i-reload ang add‑on pagkatapos ng pagbabago sa code, o hayaan ang web‑ext na mag-auto‑reload.
- May ilang pagkakaibang pang-Firefox lang; laging i-verify sa Thunderbird para sa API parity.
- Mga path ng Thunderbird binary (mga halimbawa):
- Linux: `thunderbird` (hal., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Paghiwalay ng profile: Gumamit ng hiwalay na Thunderbird profile para sa development upang maiwasang maapektuhan ang iyong araw‑araw na setup.

---

### Mga Target ng Make (Alpabetikal) {#make-targets-alphabetical}

Istandardisa ng Makefile ang mga karaniwang daloy ng dev. Patakbuhin ang `make help` anumang oras para sa isang one‑line na buod ng bawat target.

Tip: ang pagpapatakbo ng `make` nang walang target ay magbubukas ng simpleng Whiptail menu para pumili ng target.

| Target                                                   | Isang linyang deskripsyon                                                                            |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Alisin ang lokal na build/preview artifacts (tmp/, web-local-preview/, website/build/).              |
| [`commit`](#mt-commit)                                   | I-format, patakbuhin ang mga test (kasama ang i18n), i-update ang changelog, mag-commit at mag-push. |
| [`eslint`](#mt-eslint)                                   | Patakbuhin ang ESLint via flat config (`npm run -s lint:eslint`).                                    |
| [`help`](#mt-help)                                       | Ilista ang lahat ng target na may one‑line na docs (nakaayos).                                       |
| [`lint`](#mt-lint)                                       | web‑ext lint sa `sources/` (pansamantalang manifest; hindi pinapansin ang mga ZIP; hindi fatal).     |
| [`menu`](#mt-menu)                                       | Interaktibong menu para pumili ng target at opsyonal na argumento.                                   |
| [`pack`](#mt-pack)                                       | Bumuo ng ATN at LOCAL ZIPs (pinapatakbo ang linter; tinatawag ang packer script).                    |
| [`prettier`](#mt-prettier)                               | I-format ang repository in place (nagsusulat ng mga pagbabago).                                      |
| [`prettier_check`](#mt-prettier_check)                   | Prettier sa check mode (walang isinusulat); babagsak kung kailangan ng reformat.                     |
| [`prettier_write`](#mt-prettier_write)                   | Alias para sa `prettier`.                                                                            |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, saka Vitest (coverage kung naka-configure).                                |
| [`test_i18n`](#mt-test_i18n)                             | Mga test na pang‑i18n lang: placeholders/parity ng add‑on + parity ng website.                       |
| [`translate_app`](#mt-translation-app)                   | Alias para sa `translation_app`.                                                                     |
| [`translation_app`](#mt-translation-app)                 | Isalin ang mga string ng UI ng app mula sa `sources/_locales/en/messages.json`.                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | Isalin ang mga docs ng website sa pamamagitan ng OpenAI Batch API (inirerekomenda).                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | Isalin ang mga docs ng website nang sabay‑sabay (legacy, hindi batch).                               |
| [`translate_web_index`](#mt-translation_web_index)       | Alias para sa `translation_web_index`.                                                               |
| [`translation_web_index`](#mt-translation_web_index)     | Isalin ang UI ng homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).        |
| [`web_build`](#mt-web_build)                             | I-build ang docs sa `website/build` (sumusuporta sa `--locales` / `BUILD_LOCALES`).                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑safe na link check (nilalaktawan ang remote HTTP[S]).                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokal na gh‑pages preview; auto‑serve sa 8080–8090; opsyonal na tests/link‑check.                    |
| [`web_push_github`](#mt-web_push_github)                 | I-push ang `website/build` sa sangang `gh-pages`.                                                    |

Syntax para sa mga opsyon

- Gamitin ang `make <command> OPTS="…"` para ipasa ang mga opsyon (inirerekomenda ang quotes). Ipinapakita ng bawat target sa ibaba ang halimbawang paggamit.

--

-

#### Mga tip sa build ng locale {#locale-build-tips}

- Bumuo ng subset ng mga locale: itakda ang `BUILD_LOCALES="en de"` o ipasa ang `OPTS="--locales en,de"` sa mga web target.
- I-preview ang isang partikular na locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Pag-build at Pag-package {#build-and-package}

- Bumuo ng mga ZIP: `make pack`
- Gumagawa ng ATN at LOCAL ZIPs sa repo root (huwag mano-manong i-edit ang mga artifact)
- Tip: i-update ang bersyon sa parehong `sources/manifest_ATN.json` at `sources/manifest_LOCAL.json` bago mag-package
- Manual na pag-install (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → piliin ang na-build na ZIP

---

### Test {#test}

- Buong suite: `make test` (Vitest)
- Coverage (opsyonal):
- `npm i -D @vitest/coverage-v8`
- Patakbuhin ang `make test`; buksan ang `coverage/index.html` para sa HTML report
- i18n lang: `make test_i18n` (mga UI key/placeholders/titles + parity ng website per‑locale per‑doc na may id/title/sidebar_label checks)

---

### Pag-debug at Mga Log {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- I-toggle ang verbose logs sa runtime:
- Enable: `messenger.storage.local.set({ debug: true })`
- Disable: `messenger.storage.local.set({ debug: false })`
- Lumilitaw ang mga log habang gumagawa/nagpapadala ng mga reply

---

### Docs (website) {#docs-website}

- Dev server: `cd website && npm run start`
- I-build ang static site: `cd website && npm run build`
- Mga katumbas sa Make (alpabetikal): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Mga halimbawa ng paggamit:
- EN lang, laktawan ang tests/link‑check, walang push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Lahat ng locale, may tests/link‑check, tapos push: `make web_build_local_preview && make web_push_github`
- Bago mag-publish, patakbuhin ang offline‑safe na link check: `make web_build_linkcheck`.
- i18n: Ang English ay nasa `website/docs/*.md`; ang German na mga salin ay nasa `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Paghahanap: Kung nakatakda sa CI ang mga env var ng Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), gagamit ang site ng Algolia search; kung hindi, lilipat ito sa lokal na search. Sa homepage, pindutin ang `/` o `Ctrl+K` para buksan ang search box.

---

#### Ruta ng pag-redirect sa Donasyon {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (at `/<locale>/donate`)
- Asal:
- Kung ang kasalukuyang ruta ay may locale (hal., `/de/donate`), gamitin ito
- Kung hindi, pumili ng pinakamahusay na tugma mula sa `navigator.languages` kumpara sa naka-configure na mga locale; fallback sa default na locale
- Nagre-redirect sa:
- `en` → `/docs/donation`
- iba pa → `/<locale>/docs/donation`
- Ginagamit ang `useBaseUrl` para sa tamang paghawak ng baseUrl
- Kabilang ang meta refresh + link na `noscript` bilang fallback

---

---

#### Mga Tip sa Preview {#preview-tips}

- Itigil nang malinis ang Node preview: buksan ang `http://localhost:<port>/__stop` (napi-print pagkatapos ng `Local server started`).
- Kung hindi naglo-load ang mga larawan sa MDX/JSX, gamitin ang `useBaseUrl('/img/...')` para igalang ang site na `baseUrl`.
- Ang preview ang nauuna; ang link check ay tatakbo pagkatapos at hindi nakahahadlang (ang sirang panlabas na mga link ay hindi pipigil sa preview).
- Halimbawang preview URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (napi-print pagkatapos ng “Local server started”).
- Mga panlabas na link sa link‑check: May ilang panlabas na site (hal., addons.thunderbird.net) na humaharang sa automated crawlers at maaaring magpakita ng 403 sa link checks. Magpapatuloy pa rin ang preview; ligtas na balewalain ang mga ito.

---

#### Isalin ang Website {#translate-website}

Ano ang maaari mong isalin

- Website UI lang: homepage, navbar, footer, at iba pang mga UI string. Mananatiling English‑only muna ang nilalaman ng Docs.

Saan mag-e-edit

- I-edit ang `website/i18n/<locale>/code.json` (gamitin ang `en` bilang sanggunian). Panatilihing hindi nababago ang mga placeholder gaya ng `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Gumawa o i-refresh ang mga file

- Gumawa ng mga nawawalang stub para sa lahat ng locale: `npm --prefix website run i18n:stubs`
- I-overwrite ang mga stub mula English (pagkatapos magdagdag ng mga bagong string): `npm --prefix website run i18n:stubs:force`
- Alternatibo para sa isang locale lang: `npx --prefix website docusaurus write-translations --locale <locale>`

Isalin ang mga string ng UI ng homepage/navbar/footer (OpenAI)

- Itakda ang mga kredensyal minsan (shell o .env):
- `export OPENAI_API_KEY=sk-...`
- Opsyonal: `export OPENAI_MODEL=gpt-4o-mini`
- Isang pasada (lahat ng locale, laktawan ang en): `make translate_web_index`
- Limitahan sa partikular na mga locale: `make translate_web_index OPTS="--locales de,fr"`
- I-overwrite ang mga umiiral na value: `make translate_web_index OPTS="--force"`

Pag-validate at mga retry

- Sina-validate ng translation script ang hugis ng JSON, pinapanatili ang mga curly‑brace placeholder, at tinitiyak na hindi nagbabago ang mga URL.
- Kapag nabigo ang validation, nagre-retry ito na may feedback hanggang 2 beses bago panatilihin ang umiiral na mga value.

I-preview ang iyong locale

- Dev server: `npm --prefix website run start`
- Bisitahin ang `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Pagsusumite

- Magbukas ng PR na may na-edit na file(s) na `code.json`. Panatilihing nakatuon ang mga pagbabago at magdagdag ng mabilis na screenshot kung maaari.

---

### Mga Tip sa Seguridad at Konfigurasyon {#security-and-configuration-tips}

- Huwag i-commit ang `sources/manifest.json` (pansamantalang ginagawa ng build)
- Panatilihing stable ang `browser_specific_settings.gecko.id` upang mapanatili ang update channel

---

### Pagpapanatili ng Mga Setting {#settings-persistence}

- Storage: Nasa `storage.local` ang lahat ng user settings at nananatili sa mga update ng add‑on.
- Install: Ina-apply lang ang mga default kapag ang isang key ay talagang wala (undefined).
- Update: Pinupunan lang ng migration ang mga nawawalang key; ang umiiral na mga value ay hindi kailanman overwriten.
- Schema marker: `settingsVersion` (kasalukuyang `1`).
- Mga key at default:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code: tingnan ang `sources/background.js` → `initializeOrMigrateSettings()` at `SCHEMA_VERSION`.

Daloy ng dev (pagdaragdag ng bagong setting)

- I-bump ang `SCHEMA_VERSION` sa `sources/background.js`.
- Idagdag ang bagong key + default sa object na `DEFAULTS` sa `initializeOrMigrateSettings()`.
- Gamitin ang patakarang "only-if-undefined" kapag nagse-seed ng mga default; huwag i-overwrite ang umiiral na mga value.
- Kung user‑visible ang setting, i-wire ito sa `sources/options.js` at magdagdag ng mga lokalisadong string.
- Magdagdag/magbago ng mga test (tingnan ang `tests/background.settings.migration.test.js`).

Mga tip sa manu-manong pag-test

- I-simulate ang fresh install: i-clear ang data dir ng extension o magsimula sa bagong profile.
- I-simulate ang update: itakda ang `settingsVersion` sa `0` sa `storage.local` at i-reload; tiyaking nananatiling hindi nagbabago ang umiiral na mga value at tanging mga nawawalang key lang ang idinadagdag.

---

### Pag-troubleshoot {#troubleshooting}

- Tiyaking 128 ESR o mas bago ang Thunderbird
- Gamitin ang Error Console para sa mga isyu sa runtime
- Kung tila hindi maayos na naia-apply ang mga naimbak na setting, i-restart ang Thunderbird at subukan muli. (Maaaring mag-cache ang Thunderbird ng state sa mga session; tinitiyak ng restart na sariwang mga setting ang naloload.)

---

### CI at Coverage {#ci-and-coverage}

- Ang GitHub Actions (`CI — Tests`) ay nagpapatakbo ng vitest na may coverage thresholds (85% lines/functions/branches/statements). Kung hindi naabot ang mga threshold, babagsak ang job.
- Nag-u-upload ang workflow ng artifact na `coverage-html` na may HTML report; i-download ito mula sa run page (Actions → latest run → Artifacts).

---

### Pag-ambag {#contributing}

- Tingnan ang CONTRIBUTING.md para sa mga patnubay sa branch/commit/PR
- Tip: Gumawa ng hiwalay na Thunderbird development profile para sa pag-test upang maiwasang maapektuhan ang iyong daily profile.

---

### Mga Pagsasalin

- Ang pagpapatakbo ng malalaking “all → all” na translation jobs ay maaaring mabagal at magastos. Magsimula sa subset (hal., ilang docs at 1–2 locale), suriin ang resulta, saka palawakin.

---

- Patakaran sa retry: ang mga translation job ay gumagawa ng hanggang 3 retry na may exponential backoff sa mga error ng API; tingnan ang `scripts/translate_web_docs_batch.js` at `scripts/translate_web_docs_sync.js`.

Mga screenshot para sa docs

- Iimbak ang mga imahe sa ilalim ng `website/static/img/`.
- I-refer ang mga ito sa MD/MDX sa pamamagitan ng `useBaseUrl('/img/<filename>')` para gumana ang mga path sa site na `baseUrl`.
- Pagkatapos magdagdag o mag-rename ng mga imahe sa ilalim ng `website/static/img/`, tiyaking lahat ng references ay gumagamit pa rin ng `useBaseUrl('/img/…')` at nagre-render sa lokal na preview.
  Mga favicon

- Ang multi‑size na `favicon.ico` ay awtomatikong ginagawa sa lahat ng build path (Make + scripts) sa pamamagitan ng `website/scripts/build-favicon.mjs`.
- Walang kailangang manual na hakbang; sapat na ang pag-update ng `icon-*.png`.
  Tip sa pagrebisa

- Panatilihing hindi nababago ang front‑matter na `id` sa mga isinaling docs; isalin lamang ang `title` at `sidebar_label` kapag naroroon.

#### clean {#mt-clean}

- Layunin: alisin ang lokal na build/preview artifacts.
- Paggamit: `make clean`
- Inaalis (kung naroroon):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Layunin: i-format, i-test, i-update ang changelog, mag-commit, at mag-push.
- Paggamit: `make commit`
- Mga detalye: nagpapatakbo ng Prettier (write), `make test`, `make test_i18n`; nagdadagdag sa changelog kapag may staged diffs; nagpu-push sa `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Layunin: patakbuhin ang ESLint via flat config.
- Paggamit: `make eslint`

---

#### help {#mt-help}

- Layunin: ilista ang lahat ng target na may one‑line na docs.
- Paggamit: `make help`

---

#### lint {#mt-lint}

- Layunin: i-lint ang MailExtension gamit ang `web-ext`.
- Paggamit: `make lint`
- Tala: pansamantalang kinokopya ang `sources/manifest_LOCAL.json` → `sources/manifest.json`; hindi isinasama ang mga na-build na ZIP; ang mga babala ay hindi nagpapabagsak ng pipeline.

---

#### menu {#mt-menu}

- Layunin: interaktibong menu para pumili ng Make target at opsyonal na argumento.
- Paggamit: patakbuhin ang `make` nang walang argumento.
- Tala: kung hindi available ang `whiptail`, babagsak ang menu sa `make help`.

---

#### pack {#mt-pack}

- Layunin: bumuo ng ATN at LOCAL ZIPs (nakadepende sa `lint`).
- Paggamit: `make pack`
- Tip: i-bump ang mga bersyon sa parehong `sources/manifest_*.json` bago mag-package.

---

#### prettier {#mt-prettier}

- Layunin: i-format ang repo in place.
- Paggamit: `make prettier`

#### prettier_check {#mt-prettier_check}

- Layunin: beripikahin ang formatting (walang isinusulat).
- Paggamit: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Layunin: alias para sa `prettier`.
- Paggamit: `make prettier_write`

---

#### test {#mt-test}

- Layunin: patakbuhin ang Prettier (write), ESLint, saka Vitest (coverage kung naka-install).
- Paggamit: `make test`

#### test_i18n {#mt-test_i18n}

- Layunin: mga test na nakatuon sa i18n para sa mga string ng add‑on at website docs.
- Paggamit: `make test_i18n`
- Pinapatakbo: `npm run test:i18n` at `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Layunin: isalin ang mga string ng UI ng add‑on mula EN patungo sa ibang mga locale.
- Paggamit: `make translation_app OPTS="--locales all|de,fr"`
- Tala: pinapanatili ang istruktura ng key at mga placeholder; nagla-log sa `translation_app.log`. Script form: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Layunin: isalin ang mga website docs mula `website/docs/*.md` tungo sa `website/i18n/<locale>/...`.
- Inirerekomenda: `translate_web_docs_batch` (OpenAI Batch API)
  - Paggamit (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Tinatanggap pa rin ang legacy positional: `OPTS="<doc|all> <lang|all>"`
- Asal: bumubuo ng JSONL, nag-a-upload, nagpo-poll bawat 30s, nagda-download ng resulta, nagsusulat ng mga file.
- Tala: maaaring umabot ng hanggang 24 na oras ang isang batch job (ayon sa batch window ng OpenAI). Ipinapakita ng console ang lumipas na oras sa bawat poll.
- Env: `OPENAI_API_KEY` (kailangan), opsyonal ang `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Paggamit (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Tinatanggap pa rin ang legacy positional: `OPTS="<doc|all> <lang|all>"`
- Asal: synchronous na per‑pair na mga request (walang batch aggregation).
- Mga tala: Interaktibong mga prompt kapag hindi ibinigay ang `OPTS`. Pinapanatili ng parehong mode ang mga code block/inline code at pinananatiling hindi nababago ang front‑matter na `id`; nagla-log sa `translation_web_batch.log` (batch) o `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Layunin: isalin ang mga string ng UI ng website (homepage, navbar, footer) mula `website/i18n/en/code.json` sa lahat ng locale sa ilalim ng `website/i18n/<locale>/code.json` (maliban sa `en`).
- Paggamit: `make translate_web_index` o `make translate_web_index OPTS="--locales de,fr [--force]"`
- Mga kailangan: i-export ang `OPENAI_API_KEY` (opsyonal: `OPENAI_MODEL=gpt-4o-mini`).
- Asal: bina-validate ang istruktura ng JSON, pinapanatili ang mga curly‑brace placeholder, pinananatiling hindi nagbabago ang mga URL, at nagre-retry na may feedback kapag may validation errors.

---

#### web_build {#mt-web_build}

- Layunin: i-build ang docs site sa `website/build`.
- Paggamit: `make web_build OPTS="--locales en|de,en|all"` (o itakda ang `BUILD_LOCALES="en de"`)
- Internal: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Mga Dep: pinapatakbo ang `npm ci` sa `website/` lamang kung nawawala ang `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Layunin: offline‑safe na link check.
- Paggamit: `make web_build_linkcheck OPTS="--locales en|all"`
- Tala: bina-build sa `tmp_linkcheck_web_pages`; nire-rewrite ang GH Pages `baseUrl` tungo sa `/`; nilalaktawan ang mga remote na HTTP(S) link.

#### web_build_local_preview {#mt-web_build_local_preview}

- Layunin: lokal na gh‑pages preview na may opsyonal na tests/link‑check.
- Paggamit: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Asal: sinusubukan muna ang Node preview server (`scripts/preview-server.mjs`, sumusuporta sa `/__stop`), babagsak sa `python3 -m http.server`; nagsi-serve sa 8080–8090; PID sa `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Layunin: i-push ang `website/build` sa sangang `gh-pages`.
- Paggamit: `make web_push_github`

Tip: itakda ang `NPM=…` para i-override ang package manager na ginagamit ng Makefile (default sa `npm`).
