---
id: development
title: 'Ontwikkeling'
sidebar_label: 'Ontwikkeling'
---

---

## Ontwikkelingsgids {#development-guide}

:::note Redigeer slegs Engels; vertalings versprei
Werk dokumentasie **slegs** onder `website/docs` (Engels) by. Vertalings onder `website/i18n/<locale>/…` word gegenereer en moet nie handmatig gewysig word nie. Gebruik die vertaaltake (bv. `make translate_web_docs_batch`) om gelokaliseerde inhoud te verfris.
:::

### Voorvereistes {#prerequisites}

- Node.js 22+ en npm (getoets met Node 22)
- Thunderbird 128 ESR of nuwer (vir handtoetsing)

---

### Projekuitleg (hoë vlak) {#project-layout-high-level}

- Wortel: verpakkingskrip `distribution_zip_packer.sh`, dokumente, skermskote
- `sources/`: hoof byvoegingkode (agtergrond, opsies/opspringer-UI, manifes, ikone)
- `tests/`: Vitest-stel
- `website/`: Docusaurus-dokumente (met i18n onder `website/i18n/de/...`)

---

### Installeer & Nutsgoed {#install-and-tooling}

- Installeer wortelafhanklikhede: `npm ci`
- Dokumente (opsioneel): `cd website && npm ci`
- Ontdek teikens: `make help`

---

### Lewende Ontwikkeling (web‑ext run) {#live-dev-web-ext}

- Vinnige lus in Firefox Desktop (slegs UI-rooktoetse):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Hardloop in Thunderbird (verkies vir MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Wenke:
- Hou Thunderbird se Foutkonsole oop (Tools → Developer Tools → Error Console).
- MV3-gebeurtenisbladsye word opgeskort wanneer dit ledig is; herlaai die byvoeging ná kodeveranderings, of laat web‑ext outo‑herlaai.
- Sommige slegs‑Firefox‑gedrag verskil; verifieer altyd in Thunderbird vir API‑pariteit.
- Thunderbird-binêre paaie (voorbeelde):
- Linux: `thunderbird` (bv. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profiel‑isolasie: Gebruik ’n aparte Thunderbird-profiel vir ontwikkeling om jou daaglikse opstelling nie te beïnvloed nie.

---

### Make-teikens (Alfabeties) {#make-targets-alphabetical}

Die Makefile standaardiseer algemene ontwikkelingsvloeie. Hardloop `make help` enige tyd vir ’n eenreël-opsomming van elke teiken.

Wenk: as jy `make` sonder ’n teiken laat loop, open dit ’n eenvoudige Whiptail-kieslys om ’n teiken te kies.

| Teiken                                                   | Eenreëlbeskrywing                                                                                 |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Verwyder plaaslike bou/voorskou-artefakte (tmp/, web-local-preview/, website/build/).             |
| [`commit`](#mt-commit)                                   | Formatteer, hardloop toetse (incl. i18n), werk changelog by, commit & push.                       |
| [`eslint`](#mt-eslint)                                   | Hardloop ESLint via plat konfigurasie (`npm run -s lint:eslint`).                                 |
| [`help`](#mt-help)                                       | Lys alle teikens met eenreël-doks (gesorteer).                                                    |
| [`lint`](#mt-lint)                                       | web‑ext lint op `sources/` (tydelike manifest; ignoreer ZIPs; nie‑fataal).                        |
| [`menu`](#mt-menu)                                       | Interaktiewe kieslys om ’n teiken en opsionele argumente te kies.                                 |
| [`pack`](#mt-pack)                                       | Bou ATN- & LOCAL-ZIPs (hardloop linter; roep pakker-skrip).                                       |
| [`prettier`](#mt-prettier)                               | Formatteer bewaarplek in plek (skryf veranderinge).                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier in kontrolemodus (geen skrywes); faal as herformattering nodig is.                       |
| [`prettier_write`](#mt-prettier_write)                   | Alias vir `prettier`.                                                                             |
| [`test`](#mt-test)                                       | Prettier (skryf), ESLint, dan Vitest (dekking indien gekonfigureer).                              |
| [`test_i18n`](#mt-test_i18n)                             | Slegs i18n-toetse: byvoeging‑plaasvervangers/pariteit + webwerfpariteit.                          |
| [`translate_app`](#mt-translation-app)                   | Alias vir `translation_app`.                                                                      |
| [`translation_app`](#mt-translation-app)                 | Vertaal app‑UI‑stringe vanaf `sources/_locales/en/messages.json`.                                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | Vertaal webwerf‑dokumente via OpenAI Batch API (verkies).                                         |
| [`translate_web_docs_sync`](#mt-translation-web)         | Vertaal webwerf‑dokumente sinchronies (ou, nie‑batch).                                            |
| [`translate_web_index`](#mt-translation_web_index)       | Alias vir `translation_web_index`.                                                                |
| [`translation_web_index`](#mt-translation_web_index)     | Vertaal tuisblad/navigasiebalk/voetskrif‑UI (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Bou dokumente na `website/build` (ondersteun `--locales` / `BUILD_LOCALES`).                      |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Vanlyn‑veilige skakelkontrole (slaan afgeleë HTTP[S] oor).                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Plaaslike gh‑pages‑voorskou; bedien outomaties op 8080–8090; opsionele toetse/skakelkontrole.     |
| [`web_push_github`](#mt-web_push_github)                 | Stoot `website/build` na die `gh-pages`-tak.                                                      |

Sintaks vir opsies

- Gebruik `make <command> OPTS="…"` om opsies deur te gee (aanhalingstekens word aanbeveel). Elke teiken hieronder wys voorbeeldgebruik.

--

-

#### Lokale-bou-wenke {#locale-build-tips}

- Bou ’n substel van lokales: stel `BUILD_LOCALES="en de"` of gee `OPTS="--locales en,de"` aan webteikens deur.
- Voorskou ’n spesifieke lokale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bou & Pakketeer {#build-and-package}

- Bou ZIPs: `make pack`
- Lewer ATN- en LOCAL-ZIPs in die repo-wortel (moenie artefakte met die hand wysig nie)
- Wenk: werk weergawe op in beide `sources/manifest_ATN.json` en `sources/manifest_LOCAL.json` voor verpakking
- Handinstallasie (dev): Thunderbird → Tools → Add‑ons and Themes → rat → Installeer Byvoeging vanaf Lêer… → kies die geboude ZIP

---

### Toets {#test}

- Volledige stel: `make test` (Vitest)
- Dekking (opsioneel):
- `npm i -D @vitest/coverage-v8`
- Laat loop `make test`; open `coverage/index.html` vir HTML-verslag
- Slegs i18n: `make test_i18n` (UI-sleutels/plaasvervangers/titels + webwerf per‑lokale per‑dokument pariteit met id/title/sidebar_label-kontroles)

---

### Ontfouting & Logs {#debugging-and-logs}

- Foutkonsole: Tools → Developer Tools → Error Console
- Skakel uitgebreide logs aan/af tydens looptyd:
- Aktiveer: `messenger.storage.local.set({ debug: true })`
- Deaktiveer: `messenger.storage.local.set({ debug: false })`
- Logs verskyn terwyl antwoorde opgestel/gestuur word

---

### Dokumente (webwerf) {#docs-website}

- Ontwikkelbediener: `cd website && npm run start`
- Bou statiese werf: `cd website && npm run build`
- Make-ekwivalente (alfabeties): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Gebruiksvoorbeelde:
- Slegs EN, slaan toetse/skakelkontrole oor, geen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Alle lokales, met toetse/skakelkontrole, dan push: `make web_build_local_preview && make web_push_github`
- Voor publisering, hardloop die vanlyn‑veilige skakelkontrole: `make web_build_linkcheck`.
- i18n: Engels leef in `website/docs/*.md`; Duitse vertalings in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Soek: As Algolia DocSearch-omgewingsveranderlikes in CI gestel is (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), gebruik die werf Algolia-soek; andersins val dit terug na plaaslike soek. Op die tuisblad, druk `/` of `Ctrl+K` om die soekkassie oop te maak.

---

#### Skenk-herleidingsroete {#donate-redirect}

- `website/src/pages/donate.js`
- Roete: `/donate` (en `/<locale>/donate`)
- Gedrag:
- As die huidige roete ’n lokale het (bv. `/de/donate`), gebruik dit
- Anders, kies die beste passing uit `navigator.languages` teenoor gekonfigureerde lokales; val terug na verstek‑lokale
- Herlei na:
- `en` → `/docs/donation`
- ander → `/<locale>/docs/donation`
- Gebruik `useBaseUrl` vir korrekte baseUrl-hantering
- Sluit meta‑herlaai + `noscript`-skakel as terugval in

---

---

#### Voorskou-wenke {#preview-tips}

- Stop Node-voorskou netjies: open `http://localhost:<port>/__stop` (gedruk ná `Local server started`).
- As beelde nie in MDX/JSX laai nie, gebruik `useBaseUrl('/img/...')` om die werf se `baseUrl` te respekteer.
- Die voorskou begin eerste; die skakelkontrole loop daarna en is nie‑blokerend (gebreekte eksterne skakels sal nie die voorskou stop nie).
- Voorbeeld‑voorskou‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (gedruk ná “Local server started”).
- Eksterne skakels in skakelkontrole: Sommige eksterne werwe (bv. addons.thunderbird.net) blokkeer outomatiese kraaiers en kan 403 in skakelkontroles wys. Die voorskou begin steeds; dit is veilig om te ignoreer.

---

#### Vertaal die webwerf {#translate-website}

Wat jy kan vertaal

- Slegs webwerf‑UI: tuisblad, navigasiebalk, voetskrif, en ander UI‑stringe. Docs-inhoud bly tans slegs Engels.

Waar om te redigeer

- Redigeer `website/i18n/<locale>/code.json` (gebruik `en` as verwysing). Hou plaasvervangers soos `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ongewysig.

Genereer of verfris lêers

- Skep ontbrekende stubs vir alle lokales: `npm --prefix website run i18n:stubs`
- Oorskryf stubs vanaf Engels (ná nuwe stringe bygevoeg is): `npm --prefix website run i18n:stubs:force`
- Alternatief vir ’n enkele lokale: `npx --prefix website docusaurus write-translations --locale <locale>`

Vertaal tuisblad/navigasiebalk/voetskrif‑UI‑stringe (OpenAI)

- Stel geloofsbriewe eenmalig (shell of .env):
- `export OPENAI_API_KEY=sk-...`
- Opsioneel: `export OPENAI_MODEL=gpt-4o-mini`
- Eenmalig (alle lokales, slaan "en" oor): `make translate_web_index`
- Beperk tot spesifieke lokales: `make translate_web_index OPTS="--locales de,fr"`
- Oorskryf bestaande waardes: `make translate_web_index OPTS="--force"`

Validering & herprobeer

- Die vertaalskrip valideer JSON-vorm, behou krulhakie‑plaasvervangers, en verseker dat URL’s onveranderd is.
- By valideringsmislukking probeer dit met terugvoer tot 2 keer weer voordat bestaande waardes behou word.

Voorskou jou lokale

- Ontwikkelbediener: `npm --prefix website run start`
- Besoek `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Indiening

- Maak ’n PR oop met die gewysigde `code.json`-lêer(s). Hou veranderinge gefokus en sluit ’n vinnige skermskoot in waar moontlik.

---

### Sekuriteit- & Konfigurasiewenke {#security-and-configuration-tips}

- Moenie `sources/manifest.json` commit nie (tydelik deur die bou geskep)
- Hou `browser_specific_settings.gecko.id` stabiel om die opdateringskanaal te behou

---

### Bewaring van instellings {#settings-persistence}

- Berging: Alle gebruikerinstellings leef in `storage.local` en bly behoue oor byvoeging‑opdaterings heen.
- Installeer: Verstekwaardes word slegs toegepas wanneer ’n sleutel strengweg ontbreek (undefined).
- Opdatering: ’n Migrasie vul slegs ontbrekende sleutels; bestaande waardes word nooit oorskryf nie.
- Skemamerker: `settingsVersion` (tans `1`).
- Sleutels en verstekke:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: sien `sources/background.js` → `initializeOrMigrateSettings()` en `SCHEMA_VERSION`.

Ontwikkelingsvloeiproses (voeg ’n nuwe instelling by)

- Verhoog `SCHEMA_VERSION` in `sources/background.js`.
- Voeg die nuwe sleutel + verstek by die `DEFAULTS`-objek in `initializeOrMigrateSettings()`.
- Gebruik die "only-if-undefined"-reël wanneer verstekke gesaai word; moenie bestaande waardes oorskryf nie.
- As die instelling vir die gebruiker sigbaar is, koppel dit in `sources/options.js` en voeg gelokaliseerde stringe by.
- Voeg toetse by/pas aan (sien `tests/background.settings.migration.test.js`).

Handtoets-wenke

- Simuleer ’n vars installasie: vee die uitbreiding se data‑gids skoon of begin met ’n nuwe profiel.
- Simuleer ’n opdatering: stel `settingsVersion` na `0` in `storage.local` en herlaai; bevestig bestaande waardes bly onveranderd en slegs ontbrekende sleutels word bygevoeg.

---

### Foutopsporing {#troubleshooting}

- Maak seker Thunderbird is 128 ESR of nuwer
- Gebruik die Foutkonsole vir looptydkwessies
- As gestoorde instellings blyk nie behoorlik toe te pas nie, herbegin Thunderbird en probeer weer. (Thunderbird kan toestand oor sessies heen kas; ’n herbegin verseker vars instellings word gelaai.)

---

### CI & Dekking {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) hardloop vitest met dekkingsdrempels (85% reëls/funksies/takke/staatmente). As drempels nie gehaal word nie, faal die taak.
- Die werkvloei laai ’n artefak `coverage-html` met die HTML-verslag op; laai dit af vanaf die loop-bladsy (Actions → jongste loop → Artifacts).

---

### Bydraes {#contributing}

- Sien CONTRIBUTING.md vir tak/commit/PR-riglyne
- Wenk: Skep ’n aparte Thunderbird-ontwikkelingsprofiel vir toetsing om jou daaglikse profiel nie te beïnvloed nie.

---

### Vertalings

- Groot “all → all”-vertaaltake kan stadig en duur wees. Begin met ’n substel (bv. ’n paar dokumente en 1–2 lokales), hersien die resultaat, brei dan uit.

---

- Herprobeerbeleid: vertaaltake doen tot 3 herprobeer met eksponensiële terugval op API-foute; sien `scripts/translate_web_docs_batch.js` en `scripts/translate_web_docs_sync.js`.

Skermskote vir dokumente

- Stoor beelde onder `website/static/img/`.
- Verwys daarna in MD/MDX via `useBaseUrl('/img/<filename>')` sodat paaie met die werf se `baseUrl` werk.
- Ná byvoeging of hernoeming van beelde onder `website/static/img/`, bevestig alle verwysings gebruik steeds `useBaseUrl('/img/…')` en vertoon in ’n plaaslike voorskou.
  Favikone

- Die multi‑grootte `favicon.ico` word outomaties in alle boupaaie (Make + skripte) via `website/scripts/build-favicon.mjs` gegenereer.
- Geen handstap is nodig nie; om `icon-*.png` op te dateer is genoeg.
  Hersieningswenk

- Hou die front‑matter `id` ongewysig in vertaalde dokumente; vertaal slegs `title` en `sidebar_label` wanneer teenwoordig.

#### clean {#mt-clean}

- Doel: verwyder plaaslike bou/voorskou-artefakte.
- Gebruik: `make clean`
- Verwyder (indien teenwoordig):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Doel: formatteer, toets, werk changelog by, commit, en push.
- Gebruik: `make commit`
- Besonderhede: hardloop Prettier (skryf), `make test`, `make test_i18n`; voeg changelog by wanneer daar gestageerde verskille is; stoot na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Doel: hardloop ESLint via plat konfig.
- Gebruik: `make eslint`

---

#### help {#mt-help}

- Doel: lys alle teikens met eenreël-doks.
- Gebruik: `make help`

---

#### lint {#mt-lint}

- Doel: lint die MailExtension met `web-ext`.
- Gebruik: `make lint`
- Nota’s: kopieer tydelik `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoreer geboude ZIPs; waarskuwings faal nie die pyplyn nie.

---

#### menu {#mt-menu}

- Doel: interaktiewe kieslys om ’n Make-teiken en opsionele argumente te kies.
- Gebruik: hardloop `make` sonder argumente.
- Nota’s: as `whiptail` nie beskikbaar is nie, val die kieslys terug na `make help`.

---

#### pack {#mt-pack}

- Doel: bou ATN- en LOCAL-ZIPs (hang af van `lint`).
- Gebruik: `make pack`
- Wenk: verhoog weergawes in beide `sources/manifest_*.json` voor verpakking.

---

#### prettier {#mt-prettier}

- Doel: formatteer die repo in plek.
- Gebruik: `make prettier`

#### prettier_check {#mt-prettier_check}

- Doel: verifieer formattering (geen skrywes).
- Gebruik: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Doel: alias vir `prettier`.
- Gebruik: `make prettier_write`

---

#### test {#mt-test}

- Doel: hardloop Prettier (skryf), ESLint, dan Vitest (dekking indien geïnstalleer).
- Gebruik: `make test`

#### test_i18n {#mt-test_i18n}

- Doel: i18n-gefokusde toetse vir byvoeging-stringe en webwerf-dokumente.
- Gebruik: `make test_i18n`
- Hardloop: `npm run test:i18n` en `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Doel: vertaal byvoeging-UI-stringe van EN na ander lokales.
- Gebruik: `make translation_app OPTS="--locales all|de,fr"`
- Nota’s: behou sleutelstruktuur en plaasvervangers; log na `translation_app.log`. Skripvorm: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Doel: vertaal webwerf-dokumente van `website/docs/*.md` na `website/i18n/<locale>/...`.
- Verkies: `translate_web_docs_batch` (OpenAI Batch API)
  - Gebruik (vlae): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ou posisionele word steeds aanvaar: `OPTS="<doc|all> <lang|all>"`
- Gedrag: bou JSONL, laai op, peil elke 30s, laai resultate af, skryf lêers.
- Nota: ’n batch‑taak kan tot 24 uur neem om te voltooi (per OpenAI se batch‑venster). Die konsole wys verstreke tyd by elke peiling.
- Omgewing: `OPENAI_API_KEY` (vereis), opsioneel `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (verstek 24h), `BATCH_POLL_INTERVAL_MS`.
- Ou: `translate_web_docs_sync`
  - Gebruik (vlae): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ou posisionele word steeds aanvaar: `OPTS="<doc|all> <lang|all>"`
- Gedrag: sinchrone per‑paar versoeke (geen batch-aggregasie).
- Nota’s: Interaktiewe aansporings wanneer `OPTS` weggelaat is. Albei modusse behou kodeblokke/inlyn‑kode en hou front‑matter `id` ongewysig; log na `translation_web_batch.log` (batch) of `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Doel: vertaal webwerf‑UI‑stringe (tuisblad, navigasiebalk, voetskrif) van `website/i18n/en/code.json` na alle lokales onder `website/i18n/<locale>/code.json` (met uitsluiting van `en`).
- Gebruik: `make translate_web_index` of `make translate_web_index OPTS="--locales de,fr [--force]"`
- Vereistes: export `OPENAI_API_KEY` (opsioneel: `OPENAI_MODEL=gpt-4o-mini`).
- Gedrag: valideer JSON-struktuur, behou krulhakie‑plaasvervangers, hou URL’s ongewysig, en probeer weer met terugvoer op valideringsfoute.

---

#### web_build {#mt-web_build}

- Doel: bou die dokswerf na `website/build`.
- Gebruik: `make web_build OPTS="--locales en|de,en|all"` (of stel `BUILD_LOCALES="en de"`)
- Intern: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Afh.: hardloop `npm ci` in `website/` net as `website/node_modules/@docusaurus` ontbreek.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Doel: vanlyn‑veilige skakelkontrole.
- Gebruik: `make web_build_linkcheck OPTS="--locales en|all"`
- Nota’s: bou na `tmp_linkcheck_web_pages`; herskryf GH Pages `baseUrl` na `/`; slaan afgeleë HTTP(S)-skakels oor.

#### web_build_local_preview {#mt-web_build_local_preview}

- Doel: plaaslike gh‑pages‑voorskou met opsionele toetse/skakelkontrole.
- Gebruik: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Gedrag: probeer eers Node‑voorskoubediener (`scripts/preview-server.mjs`, ondersteun `/__stop`), val terug na `python3 -m http.server`; bedien op 8080–8090; PID by `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Doel: stoot `website/build` na die `gh-pages`-tak.
- Gebruik: `make web_push_github`

Wenk: stel `NPM=…` om die pakketbestuurder wat deur die Makefile gebruik word te oorskryf (verstek is `npm`).

---
