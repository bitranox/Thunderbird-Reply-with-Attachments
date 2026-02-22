---
id: development
title: 'Kūrimas'
sidebar_label: 'Kūrimas'
---

---

## Kūrimo vadovas {#development-guide}

:::note Redaguokite tik anglų kalbos versiją; vertimai atsinaujina
Atnaujinkite dokumentaciją tik po `website/docs` (anglų). Vertimai po `website/i18n/<locale>/…` yra generuojami ir neturėtų būti redaguojami rankiniu būdu. Naudokite vertimo užduotis (pvz., `make translate_web_docs_batch`), kad atnaujintumėte lokalizuotą turinį.
:::

### Reikalavimai {#prerequisites}

- Node.js 22+ ir npm (išbandyta su Node 22)
- Thunderbird 128 ESR arba naujesnis (rankiniam testavimui)

---

### Projekto struktūra (aukšto lygio) {#project-layout-high-level}

- Šaknis: paketavimo scenarijus `distribution_zip_packer.sh`, dokumentai, ekrano nuotraukos
- `sources/`: pagrindinis priedo kodas (fonas, parinkčių/iškylančios UI, manifestai, piktogramos)
- `tests/`: Vitest testų rinkinys
- `website/`: Docusaurus dokumentacija (su i18n po `website/i18n/de/...`)

---

### Diegimas ir įrankiai {#install-and-tooling}

- Įdiegti šakninius priklausomumus: `npm ci`
- Dokumentacija (neprivaloma): `cd website && npm ci`
- Peržiūrėti tikslus: `make help`

---

### Tiesioginė kūrimo eiga (web‑ext run) {#live-dev-web-ext}

- Greitas ciklas Firefox Desktop (tik UI „smoke“ testai):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Paleisti „Thunderbird“ (rekomenduojama MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Patarimai:
- Laikykite „Thunderbird“ klaidų konsolę atidarytą (Tools → Developer Tools → Error Console).
- MV3 įvykių puslapiai sustabdomi esant neveiklai; po kodo pakeitimų perkraukite priedą arba leiskite web‑ext automatiškai perkrauti.
- Kai kurie tik Firefox būdingi elgesiai skiriasi; visada patikrinkite „Thunderbird“, kad įsitikintumėte API atitikimu.
- „Thunderbird“ vykdomojo failo keliai (pavyzdžiai):
- Linux: `thunderbird` (pvz., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profilio izoliacija: naudokite atskirą „Thunderbird“ profilį kūrimui, kad nepaveiktumėte kasdienės aplinkos.

---

### Make tikslai (abėcėliškai) {#make-targets-alphabetical}

Makefile standartizuoja dažnas kūrimo eigas. Bet kada paleiskite `make help`, kad gautumėte vienos eilutės santrauką apie kiekvieną tikslą.

Patarimas: paleidus `make` be tikslo, atsidarys paprastas Whiptail meniu tikslui pasirinkti.

| Tikslas                                                  | Vienos eilutės aprašymas                                                                           |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Pašalinti lokalius kūrimo/peržiūros artefaktus (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | Suformatuoti, paleisti testus (įsk. i18n), atnaujinti changelogą, commit’inti ir push’inti.        |
| [`eslint`](#mt-eslint)                                   | Paleisti ESLint per „flat config“ (`npm run -s lint:eslint`).                                      |
| [`help`](#mt-help)                                       | Išvardyti visus tikslus su vienos eilutės aprašais (rikiuojama).                                   |
| [`lint`](#mt-lint)                                       | web‑ext lint ant `sources/` (laikinas manifestas; ignoruoja ZIP; neblokuoja).                      |
| [`menu`](#mt-menu)                                       | Interaktyvus meniu tikslui ir pasirenkamiems argumentams pasirinkti.                               |
| [`pack`](#mt-pack)                                       | Sukurti ATN ir LOCAL ZIP’us (paleidžia linterį; kviečia pakavimo scenarijų).                       |
| [`prettier`](#mt-prettier)                               | Suformatuoti repozitoriją vietoje (rašant pakeitimus).                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier tikrinimo režimu (be rašymo); nesėkmė, jei reikia performatuoti.                          |
| [`prettier_write`](#mt-prettier_write)                   | Sinonimas `prettier`.                                                                              |
| [`test`](#mt-test)                                       | Prettier (rašymas), ESLint, tada Vitest (aprėptis jei sukonfigūruota).                             |
| [`test_i18n`](#mt-test_i18n)                             | Tik i18n testai: priedo vietos žymės/atitiktys + svetainės atitiktis.                              |
| [`translate_app`](#mt-translation-app)                   | Sinonimas `translation_app`.                                                                       |
| [`translation_app`](#mt-translation-app)                 | Išversti programos UI eilutes iš `sources/_locales/en/messages.json`.                              |
| [`translate_web_docs_batch`](#mt-translation-web)        | Išversti svetainės dokumentus per OpenAI Batch API (pageidautina).                                 |
| [`translate_web_docs_sync`](#mt-translation-web)         | Išversti svetainės dokumentus sinchroniškai (senasis, ne batch).                                   |
| [`translate_web_index`](#mt-translation_web_index)       | Sinonimas `translation_web_index`.                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Išversti pagrindinio/meniu/poraštės UI (`website/i18n/en/code.json → .../<lang>/code.json`).       |
| [`web_build`](#mt-web_build)                             | Sukurti dokumentus į `website/build` (palaiko `--locales` / `BUILD_LOCALES`).                      |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Saugi neprisijungus nuorodų patikra (praleidžia nuotolinius HTTP[S]).                              |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Vietinė gh‑pages peržiūra; automatinis serveris per 8080–8090; pasirenkami testai/nuorodų patikra. |
| [`web_push_github`](#mt-web_push_github)                 | Išsiųsti `website/build` į šaką `gh-pages`.                                                        |

Parinkčių sintaksė

- Naudokite `make <command> OPTS="…"` parinktims perduoti (rekomenduojamos kabutės). Kiekvieno tikslo skyriuje žemiau yra pavyzdžiai.

--

-

#### Lokalės kūrimo patarimai {#locale-build-tips}

- Kurti tik dalį lokalių: nustatykite `BUILD_LOCALES="en de"` arba perduokite `OPTS="--locales en,de"` žiniatinklio tikslams.
- Peržiūrėti konkrečią lokalę: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Kūrimas ir paketavimas {#build-and-package}

- Kurti ZIP’us: `make pack`
- Sukuria ATN ir LOCAL ZIP’us repozitorijos šaknyje (needituokite artefaktų rankiniu būdu)
- Patarimas: prieš pakuojant atnaujinkite versiją tiek `sources/manifest_ATN.json`, tiek `sources/manifest_LOCAL.json`
- Rankinis diegimas (dev): Thunderbird → Tools → Add‑ons and Themes → krumpliaratis → Install Add‑on From File… → pasirinkite sukurtą ZIP

---

### Testavimas {#test}

- Pilnas rinkinys: `make test` (Vitest)
- Aprėptis (neprivaloma):
- `npm i -D @vitest/coverage-v8`
- Paleiskite `make test`; atidarykite `coverage/index.html` HTML ataskaitai
- Tik i18n: `make test_i18n` (UI raktai/vietos žymės/pavadinimai + svetainės per‑lokalę per‑dokumentą atitiktis su id/title/sidebar_label tikrinimais)

---

### Derinimas ir žurnalai {#debugging-and-logs}

- Klaidų konsolė: Tools → Developer Tools → Error Console
- Perjungti išsamius žurnalus vykdymo metu:
- Įjungti: `messenger.storage.local.set({ debug: true })`
- Išjungti: `messenger.storage.local.set({ debug: false })`
- Žurnalai rodomi rašant/siunčiant atsakymus

---

### Dokumentacija (svetainė) {#docs-website}

- Kūrimo serveris: `cd website && npm run start`
- Statinės svetainės kūrimas: `cd website && npm run build`
- Make atitikmenys (abėcėliškai): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Naudojimo pavyzdžiai:
- Tik EN, praleisti testus/nuorodų patikrą, be „push“: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Visos lokalės, su testais/nuorodų patikra, tada „push“: `make web_build_local_preview && make web_push_github`
- Prieš publikuojant, paleiskite saugią neprisijungus nuorodų patikrą: `make web_build_linkcheck`.
- i18n: anglų kalba yra `website/docs/*.md`; vokiečių vertimai `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Paieška: jei Algolia DocSearch aplinkos kintamieji yra nustatyti CI aplinkoje (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), svetainė naudoja Algolia paiešką; kitu atveju grįžtama prie vietinės paieškos. Pagrindiniame puslapyje spauskite `/` arba `Ctrl+K`, kad atidarytumėte paieškos laukelį.

---

#### Paaukojimo peradresavimo maršrutas {#donate-redirect}

- `website/src/pages/donate.js`
- Maršrutas: `/donate` (ir `/<locale>/donate`)
- Elgsena:
- Jei dabartiniame maršrute yra lokalė (pvz., `/de/donate`), ją naudokite
- Kitu atveju parinkite geriausią atitikmenį iš `navigator.languages` prieš sukonfigūruotas lokales; jei netinka, naudokite numatytąją lokalę
- Peradresuojama į:
- `en` → `/docs/donation`
- kiti → `/<locale>/docs/donation`
- Naudoja `useBaseUrl` teisingam baseUrl apdorojimui
- Įtraukia „meta refresh“ + `noscript` nuorodą kaip atsarginį variantą

---

---

#### Peržiūros patarimai {#preview-tips}

- Švariai sustabdyti Node peržiūrą: atidarykite `http://localhost:<port>/__stop` (išspausdinama po `Local server started`).
- Jei MDX/JSX nerodo vaizdų, naudokite `useBaseUrl('/img/...')`, kad būtų gerbiamas svetainės `baseUrl`.
- Pirma paleidžiama peržiūra; nuorodų patikra vykdoma po to ir jos nesustabdo (sugedusios išorinės nuorodos neblokuos peržiūros).
- Pavyzdinis peržiūros URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (išspausdinama po „Local server started“).
- Išorinės nuorodos nuorodų patikroje: kai kurios išorinės svetainės (pvz., addons.thunderbird.net) blokuoja automatizuotus robotus ir patikroje gali rodyti 403. Peržiūra vis tiek paleidžiama; tai galima saugiai ignoruoti.

---

#### Išversti svetainę {#translate-website}

Ką galite versti

- Tik svetainės UI: pagrindinis puslapis, naršymo juosta, poraštė ir kitos UI eilutės. Dokumentų turinys kol kas lieka tik anglų kalba.

Kur redaguoti

- Redaguokite `website/i18n/<locale>/code.json` (naudokite `en` kaip atskaitą). Palikite vietos žymes, tokias kaip `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`, nepakeistas.

Sugeneruoti arba atnaujinti failus

- Sukurti trūkstamus ruošinius visoms lokalėms: `npm --prefix website run i18n:stubs`
- Perrašyti ruošinius iš anglų (po naujų eilučių pridėjimo): `npm --prefix website run i18n:stubs:force`
- Alternatyva vienai lokaliai: `npx --prefix website docusaurus write-translations --locale <locale>`

Išversti pagrindinio/meniu/poraštės UI eilutes (OpenAI)

- Nustatykite kredencialus kartą (shell arba .env):
- `export OPENAI_API_KEY=sk-...`
- Pasirenkama: `export OPENAI_MODEL=gpt-4o-mini`
- Vienkartinis (visos lokalės, išskyrus en): `make translate_web_index`
- Apriboti konkrečiomis lokalėmis: `make translate_web_index OPTS="--locales de,fr"`
- Perrašyti esamas reikšmes: `make translate_web_index OPTS="--force"`

Tikrinimas ir pakartojimai

- Vertimo scenarijus tikrina JSON struktūrą, išsaugo garbanotų skliaustų vietos žymes ir užtikrina, kad URL nebūtų pakeisti.
- Nesėkmės atveju bando dar kartą su grįžtamuoju ryšiu iki 2 kartų prieš palikdamas esamas reikšmes.

Peržiūrėkite savo lokalę

- Kūrimo serveris: `npm --prefix website run start`
- Apsilankykite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Pateikimas

- Atidarykite PR su redaguotu `code.json` failu(-ais). Išlaikykite fokusuotus pakeitimus ir, jei įmanoma, pridėkite greitą ekrano nuotrauką.

---

### Saugumo ir konfigūracijos patarimai {#security-and-configuration-tips}

- Necommitt’inkite `sources/manifest.json` (sukuriama laikinai kūrimo metu)
- Išlaikykite `browser_specific_settings.gecko.id` stabilų, kad būtų išsaugotas atnaujinimų kanalas

---

### Nustatymų išsaugojimas {#settings-persistence}

- Saugykla: Visi naudotojo nustatymai saugomi `storage.local` ir išlieka per priedo atnaujinimus.
- Diegimas: Numatytosios reikšmės taikomos tik tada, kai raktas griežtai trūksta (undefined).
- Atnaujinimas: Migracija užpildo tik trūkstamus raktus; esamos reikšmės niekada neperrašomos.
- Schemos žyma: `settingsVersion` (šiuo metu `1`).
- Raktai ir numatytosios reikšmės:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kodas: žr. `sources/background.js` → `initializeOrMigrateSettings()` ir `SCHEMA_VERSION`.

Kūrėjo eiga (pridedant naują nustatymą)

- Padidinkite `SCHEMA_VERSION` faile `sources/background.js`.
- Pridėkite naują raktą + numatytąją reikšmę į `DEFAULTS` objektą faile `initializeOrMigrateSettings()`.
- Naudokite „tik jei undefined“ taisyklę numatytosioms reikšmėms; neperrašykite esamų reikšmių.
- Jei nustatymas matomas naudotojui, sujunkite jį su `sources/options.js` ir pridėkite lokalizuotas eilutes.
- Pridėkite/pakoreguokite testus (žr. `tests/background.settings.migration.test.js`).

Rankinio testavimo patarimai

- Imituokite švarų diegimą: išvalykite plėtinio duomenų katalogą arba pradėkite su nauju profiliu.
- Imituokite atnaujinimą: nustatykite `settingsVersion` į `0` faile `storage.local` ir perkraukite; patvirtinkite, kad esamos reikšmės liko nepakeistos ir pridėti tik trūkstami raktai.

---

### Trikčių šalinimas {#troubleshooting}

- Įsitikinkite, kad Thunderbird yra 128 ESR arba naujesnis
- Naudokite Klaidų konsolę vykdymo problemoms
- Jei atrodo, kad išsaugoti nustatymai netaikomi tinkamai, perkraukite „Thunderbird“ ir pabandykite dar kartą. („Thunderbird“ gali kešuoti būseną tarp sesijų; perkrovimas užtikrina, kad būtų įkelti švieži nustatymai.)

---

### CI ir aprėptis {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) paleidžia vitest su aprėpties slenksčiais (85% eilutės/funkcijos/šakos/teiginiai). Jei slenksčiai nepasiekiami, darbas žlunga.
- Darbo eiga įkelia artefaktą `coverage-html` su HTML ataskaita; atsisiųskite jį iš paleidimo puslapio (Actions → paskutinis paleidimas → Artifacts).

---

### Prisidėjimas {#contributing}

- Žr. CONTRIBUTING.md dėl šakų/commit/PR gairių
- Patarimas: Testavimui susikurkite atskirą „Thunderbird“ kūrimo profilį, kad nepaveiktumėte kasdienio profilio.

---

### Vertimai

- Dideli „viskas → viskas“ vertimo darbai gali būti lėti ir brangūs. Pradėkite nuo poaibio (pvz., keli dokumentai ir 1–2 lokalės), peržiūrėkite rezultatą, tada plėskite.

---

- Iš naujo bandymo politika: vertimo darbai atlieka iki 3 bandymų su eksponentiniu laukimu, jei kyla API klaidų; žr. `scripts/translate_web_docs_batch.js` ir `scripts/translate_web_docs_sync.js`.

Ekrano nuotraukos dokumentacijai

- Laikykite vaizdus po `website/static/img/`.
- Nurodykite juos MD/MDX per `useBaseUrl('/img/<filename>')`, kad keliai veiktų su svetainės `baseUrl`.
- Įdėję ar pervadinę vaizdus po `website/static/img/`, patvirtinkite, kad visos nuorodos vis dar naudoja `useBaseUrl('/img/…')` ir teisingai atvaizduojamos vietinėje peržiūroje.
  Faviconai

- Daugiaformatė `favicon.ico` sukuriama automatiškai visuose kūrimo keliuose (Make + scenarijai) per `website/scripts/build-favicon.mjs`.
- Jokio rankinio žingsnio nereikia; pakanka atnaujinti `icon-*.png`.
  Peržiūros patarimas

- Išlaikykite front‑matter `id` nepakeistą išverstose bylose; versti tik `title` ir `sidebar_label`, jei yra.

#### clean {#mt-clean}

- Paskirtis: pašalinti lokalius kūrimo/peržiūros artefaktus.
- Naudojimas: `make clean`
- Pašalinama (jei yra):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Paskirtis: suformatuoti, testuoti, atnaujinti changelogą, commit’inti ir push’inti.
- Naudojimas: `make commit`
- Išsamiau: paleidžia Prettier (rašymas), `make test`, `make test_i18n`; prideda į changelogą, kai yra „staged“ skirtumų; „push’ina“ į `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Paskirtis: paleisti ESLint per „flat config“.
- Naudojimas: `make eslint`

---

#### help {#mt-help}

- Paskirtis: išvardyti visus tikslus su vienos eilutės aprašais.
- Naudojimas: `make help`

---

#### lint {#mt-lint}

- Paskirtis: lint’inti MailExtension naudojant `web-ext`.
- Naudojimas: `make lint`
- Pastabos: laikinai kopijuoja `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoruoja sukurtus ZIP; įspėjimai nepaverčia proceso nesėkme.

---

#### menu {#mt-menu}

- Paskirtis: interaktyvus meniu Make tikslui ir pasirenkamiems argumentams.
- Naudojimas: paleiskite `make` be argumentų.
- Pastabos: jei `whiptail` nepasiekiamas, meniu grįžta prie `make help`.

---

#### pack {#mt-pack}

- Paskirtis: sukurti ATN ir LOCAL ZIP’us (priklauso nuo `lint`).
- Naudojimas: `make pack`
- Patarimas: prieš pakuodami pakelkite versijas abiejuose `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- Paskirtis: suformatuoti repozitoriją vietoje.
- Naudojimas: `make prettier`

#### prettier_check {#mt-prettier_check}

- Paskirtis: patikrinti formatavimą (be rašymo).
- Naudojimas: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Paskirtis: sinonimas `prettier`.
- Naudojimas: `make prettier_write`

---

#### test {#mt-test}

- Paskirtis: paleisti Prettier (rašymas), ESLint, tada Vitest (aprėptis, jei įdiegta).
- Naudojimas: `make test`

#### test_i18n {#mt-test_i18n}

- Paskirtis: i18n‑fokusuoti testai priedo eilutėms ir svetainės dokumentams.
- Naudojimas: `make test_i18n`
- Paleidžia: `npm run test:i18n` ir `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Paskirtis: išversti priedo UI eilutes iš EN į kitas lokales.
- Naudojimas: `make translation_app OPTS="--locales all|de,fr"`
- Pastabos: išsaugo raktų struktūrą ir vietos žymes; žurnalas į `translation_app.log`. Scenarijaus forma: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Paskirtis: išversti svetainės dokumentus iš `website/docs/*.md` į `website/i18n/<locale>/...`.
- Pageidautina: `translate_web_docs_batch` (OpenAI Batch API)
  - Naudojimas (vėliavėlės): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Senas pozicinis vis dar priimamas: `OPTS="<doc|all> <lang|all>"`
- Elgsena: sukuria JSONL, įkelia, tikrina kas 30 s, atsisiunčia rezultatus, įrašo failus.
- Pastaba: „batch“ darbas gali trukti iki 24 valandų (pagal OpenAI „batch“ langą). Konsolėje kas kartą rodoma praėjusi trukmė.
- Aplinka: `OPENAI_API_KEY` (privaloma), neprivalomi `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (numatyta 24 h), `BATCH_POLL_INTERVAL_MS`.
- Paveldėtas: `translate_web_docs_sync`
  - Naudojimas (vėliavėlės): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Senas pozicinis vis dar priimamas: `OPTS="<doc|all> <lang|all>"`
- Elgsena: sinchroniniai užklausų ciklai poromis (be „batch“ agregavimo).
- Pastabos: Interaktyvūs klausimai, kai `OPTS` praleistas. Abu režimai išsaugo kodo blokus/inline kodą ir palieka front‑matter `id` nepakeistą; žurnalai į `translation_web_batch.log` (batch) arba `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Paskirtis: išversti svetainės UI eilutes (pagrindinis, meniu, poraštė) iš `website/i18n/en/code.json` į visas lokales po `website/i18n/<locale>/code.json` (išskyrus `en`).
- Naudojimas: `make translate_web_index` arba `make translate_web_index OPTS="--locales de,fr [--force]"`
- Reikalavimai: eksportuokite `OPENAI_API_KEY` (pasirenkama: `OPENAI_MODEL=gpt-4o-mini`).
- Elgsena: tikrina JSON struktūrą, išsaugo garbanotų skliaustų vietos žymes, nekeičia URL ir, esant tikrinimo klaidoms, bando dar kartą su grįžtamuoju ryšiu.

---

#### web_build {#mt-web_build}

- Paskirtis: sukurti dokumentų svetainę į `website/build`.
- Naudojimas: `make web_build OPTS="--locales en|de,en|all"` (arba nustatykite `BUILD_LOCALES="en de"`)
- Vidiniai: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Priklausomybės: paleidžia `npm ci` aplanke `website/` tik jei trūksta `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Paskirtis: saugi neprisijungus nuorodų patikra.
- Naudojimas: `make web_build_linkcheck OPTS="--locales en|all"`
- Pastabos: kuria į `tmp_linkcheck_web_pages`; perrašo GH Pages `baseUrl` į `/`; praleidžia nuotolines HTTP(S) nuorodas.

#### web_build_local_preview {#mt-web_build_local_preview}

- Paskirtis: vietinė gh‑pages peržiūra su pasirenkamais testais/nuorodų patikra.
- Naudojimas: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Elgsena: pirma bando Node peržiūros serverį (`scripts/preview-server.mjs`, palaiko `/__stop`), grįžta prie `python3 -m http.server`; aptarnauja per 8080–8090; PID ties `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Paskirtis: išsiųsti `website/build` į šaką `gh-pages`.
- Naudojimas: `make web_push_github`

Patarimas: nustatykite `NPM=…`, kad pakeistumėte Makefile naudojamą paketų tvarkytuvę (numatyta `npm`).

---
