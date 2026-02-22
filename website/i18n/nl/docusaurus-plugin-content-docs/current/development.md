---
id: development
title: 'Ontwikkeling'
sidebar_label: 'Ontwikkeling'
---

---

## Ontwikkelingshandleiding {#development-guide}

:::note Alleen Engels bewerken; vertalingen worden doorgegeven
Werk documentatie **alleen** bij onder `website/docs` (Engels). Vertalingen onder `website/i18n/<locale>/…` worden gegenereerd en mogen niet handmatig worden bewerkt. Gebruik de vertaaltaken (bijv. `make translate_web_docs_batch`) om gelokaliseerde inhoud te verversen.
:::

### Vereisten {#prerequisites}

- Node.js 22+ en npm (getest met Node 22)
- Thunderbird 128 ESR of nieuwer (voor handmatig testen)

---

### Projectindeling (op hoog niveau) {#project-layout-high-level}

- Root: verpakkingsscript `distribution_zip_packer.sh`, documentatie, schermafbeeldingen
- `sources/`: hoofdcode van de add‑on (achtergrond, opties/popup‑UI, manifests, iconen)
- `tests/`: Vitest‑suite
- `website/`: Docusaurus‑documentatie (met i18n onder `website/i18n/de/...`)

---

### Installatie & tooling {#install-and-tooling}

- Installeer root‑afhankelijkheden: `npm ci`
- Documentatie (optioneel): `cd website && npm ci`
- Ontdek targets: `make help`

---

### Live ontwikkeling (web‑ext run) {#live-dev-web-ext}

- Snelle loop in Firefox Desktop (alleen UI‑smoketests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Uitvoeren in Thunderbird (voorkeur voor MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Houd de foutconsole van Thunderbird geopend (Hulpmiddelen → Ontwikkelaarshulpmiddelen → Foutconsole).
- MV3‑eventpagina’s worden onderbroken bij inactiviteit; laad de add‑on opnieuw na codewijzigingen of laat web‑ext automatisch herladen.
- Sommige enkel‑Firefox‑gedragingen verschillen; verifieer altijd in Thunderbird voor API‑pariteit.
- Thunderbird‑uitvoerbare paden (voorbeelden):
- Linux: `thunderbird` (bijv. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profielsisolatie: gebruik een apart Thunderbird‑profiel voor ontwikkeling om je dagelijkse omgeving niet te beïnvloeden.

---

### Make‑targets (alfabetisch) {#make-targets-alphabetical}

Het Makefilebestand standaardiseert veelvoorkomende dev‑flows. Voer `make help` op elk moment uit voor een beknopte samenvatting (één regel) van elk target.

Tip: `make` zonder target opent een eenvoudig Whiptail‑menu om een target te kiezen.

| Doel                                                     | Beschrijving in één regel                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Verwijder lokale build-/preview‑artefacten (tmp/, web-local-preview/, website/build/).      |
| [`commit`](#mt-commit)                                   | Formatteren, tests uitvoeren (incl. i18n), changelog bijwerken, committen & pushen.         |
| [`eslint`](#mt-eslint)                                   | ESLint uitvoeren via flat config (`npm run -s lint:eslint`).                                |
| [`help`](#mt-help)                                       | Alle targets met beknopte docs (gesorteerd) weergeven.                                      |
| [`lint`](#mt-lint)                                       | web‑ext lint op `sources/` (tijdelijk manifest; negeert ZIP’s; niet‑fataal).                |
| [`menu`](#mt-menu)                                       | Interactief menu om een target en optionele argumenten te kiezen.                           |
| [`pack`](#mt-pack)                                       | ATN‑ en LOCAL‑ZIP’s bouwen (draait linter; roept packerscript aan).                         |
| [`prettier`](#mt-prettier)                               | Repository ter plekke formatteren (schrijft wijzigingen).                                   |
| [`prettier_check`](#mt-prettier_check)                   | Prettier in controlemodus (geen writes); faalt als herformattering nodig is.                |
| [`prettier_write`](#mt-prettier_write)                   | Alias voor `prettier`.                                                                      |
| [`test`](#mt-test)                                       | Prettier (write), daarna ESLint en Vitest (coverage indien geconfigureerd).                 |
| [`test_i18n`](#mt-test_i18n)                             | Alleen i18n‑tests: add‑on‑plaatsaanduidingen/pariteit + websitepariteit.                    |
| [`translate_app`](#mt-translation-app)                   | Alias voor `translation_app`.                                                               |
| [`translation_app`](#mt-translation-app)                 | Vertaal app‑UI‑strings vanuit `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | Website‑documentatie vertalen via de OpenAI Batch API (voorkeur).                           |
| [`translate_web_docs_sync`](#mt-translation-web)         | Website‑documentatie synchroon vertalen (legacy, zonder batch).                             |
| [`translate_web_index`](#mt-translation_web_index)       | Alias voor `translation_web_index`.                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Vertaal UI van homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Bouw docs naar `website/build` (ondersteunt `--locales` / `BUILD_LOCALES`).                 |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑veilige linkcontrole (slaat externe HTTP[S] over).                                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokale gh‑pages‑preview; automatisch serveren op 8080–8090; optionele tests/linkcontrole.   |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` naar de `gh-pages`‑branch.                                             |

Syntax voor opties

- Gebruik `make <command> OPTS="…"` om opties door te geven (aanbevolen: aanhalingstekens). Elk target hieronder toont voorbeeldgebruik.

--

-

#### Tips voor locale build {#locale-build-tips}

- Bouw een subset van locales: stel `BUILD_LOCALES="en de"` in of geef `OPTS="--locales en,de"` door aan webtargets.
- Voorvertoning van een specifieke locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bouwen & verpakken {#build-and-package}

- ZIP’s bouwen: `make pack`
- Maakt ATN‑ en LOCAL‑ZIP’s in de repo‑root (bewerk artefacten niet met de hand)
- Tip: werk de versie bij in zowel `sources/manifest_ATN.json` als `sources/manifest_LOCAL.json` vóór het verpakken
- Handmatige installatie (dev): Thunderbird → Hulpmiddelen → Add‑ons en thema’s → tandwiel → Add‑on uit bestand installeren… → selecteer het gebouwde ZIP

---

### Testen {#test}

- Volledige suite: `make test` (Vitest)
- Coverage (optioneel):
- `npm i -D @vitest/coverage-v8`
- Voer `make test` uit; open `coverage/index.html` voor het HTML‑rapport
- Alleen i18n: `make test_i18n` (UI‑sleutels/plaatsaanduidingen/titels + website‑per‑locale per‑documentpariteit met id/title/sidebar_label‑controles)

---

### Foutopsporing & logs {#debugging-and-logs}

- Foutconsole: Hulpmiddelen → Ontwikkelaarshulpmiddelen → Foutconsole
- Schakel uitgebreide logs runtime in/uit:
- Inschakelen: `messenger.storage.local.set({ debug: true })`
- Uitschakelen: `messenger.storage.local.set({ debug: false })`
- Logs verschijnen tijdens het opstellen/verzenden van antwoorden

---

### Documentatie (website) {#docs-website}

- Dev‑server: `cd website && npm run start`
- Statische site bouwen: `cd website && npm run build`
- Make‑equivalenten (alfabetisch): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Voorbeelden van gebruik:
- Alleen EN, sla tests/linkcontrole over, geen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Alle locales, met tests/linkcontrole, daarna push: `make web_build_local_preview && make web_push_github`
- Voordat je publiceert, voer de offline‑veilige linkcontrole uit: `make web_build_linkcheck`.
- i18n: Engels staat in `website/docs/*.md`; Duitse vertalingen in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Zoeken: Als Algolia DocSearch‑omgevingsvariabelen zijn ingesteld in CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), gebruikt de site Algolia‑zoekfunctie; anders valt deze terug op lokale zoekfunctie. Op de homepage, druk op `/` of `Ctrl+K` om het zoekvak te openen.

---

#### Donatie-redirectroute {#donate-redirect}

- `website/src/pages/donate.js`
- Route: `/donate` (en `/<locale>/donate`)
- Gedrag:
- Als de huidige route een locale heeft (bijv. `/de/donate`), gebruik die
- Anders: kies de beste match uit `navigator.languages` t.o.v. geconfigureerde locales; val terug op de standaardlocale
- Leidt om naar:
- `en` → `/docs/donation`
- overige → `/<locale>/docs/donation`
- Gebruikt `useBaseUrl` voor correcte baseUrl‑afhandeling
- Bevat meta refresh + `noscript`‑link als fallback

---

---

#### Previewtips {#preview-tips}

- Stop de Node‑preview netjes: open `http://localhost:<port>/__stop` (afgedrukt na `Local server started`).
- Als afbeeldingen niet laden in MDX/JSX, gebruik `useBaseUrl('/img/...')` om de site `baseUrl` te respecteren.
- De preview start eerst; de linkcontrole draait daarna en is niet‑blokkerend (gebroken externe links stoppen de preview niet).
- Voorbeeld‑preview‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (afgedrukt na “Local server started”).
- Externe links in linkcontrole: sommige externe sites (bijv. addons.thunderbird.net) blokkeren geautomatiseerde crawlers en kunnen 403 tonen in linkcontroles. De preview start alsnog; dit is veilig om te negeren.

---

#### Vertaal de website {#translate-website}

Wat je kunt vertalen

- Alleen website‑UI: homepage, navigatiebalk, footer en andere UI‑strings. De inhoud van de documentatie blijft voorlopig alleen Engelstalig.

Waar te bewerken

- Bewerk `website/i18n/<locale>/code.json` (gebruik `en` als referentie). Laat plaatsaanduidingen zoals `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ongewijzigd.

Bestanden genereren of verversen

- Maak ontbrekende stubs voor alle locales: `npm --prefix website run i18n:stubs`
- Overschrijf stubs vanuit Engels (na toevoegen van nieuwe strings): `npm --prefix website run i18n:stubs:force`
- Alternatief voor één locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Vertaal UI‑strings van homepage/navbar/footer (OpenAI)

- Stel eenmaal de inloggegevens in (shell of .env):
- `export OPENAI_API_KEY=sk-...`
- Optioneel: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (alle locales, sla en over): `make translate_web_index`
- Beperk tot specifieke locales: `make translate_web_index OPTS="--locales de,fr"`
- Overschrijf bestaande waarden: `make translate_web_index OPTS="--force"`

Validatie & herpogingen

- Het vertaalscript valideert de JSON‑vorm, behoudt accolades‑plaatsaanduidingen en zorgt dat URL’s ongewijzigd blijven.
- Bij validatiefouten probeert het script het met feedback tot 2 keer opnieuw, voordat bestaande waarden behouden blijven.

Bekijk je locale in preview

- Dev‑server: `npm --prefix website run start`
- Bezoek `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Indienen

- Open een PR met de bewerkte `code.json`‑bestanden. Houd wijzigingen gefocust en voeg indien mogelijk een snelle screenshot toe.

---

### Beveiligings- & configuratietips {#security-and-configuration-tips}

- Commit `sources/manifest.json` niet (tijdelijk aangemaakt door de build)
- Houd `browser_specific_settings.gecko.id` stabiel om het updatekanaal te behouden

---

### Persistentie van instellingen {#settings-persistence}

- Opslag: alle gebruikersinstellingen staan in `storage.local` en blijven behouden bij add‑on‑updates.
- Installatie: standaardwaarden worden alleen toegepast wanneer een sleutel strikt ontbreekt (undefined).
- Update: een migratie vult alleen ontbrekende sleutels; bestaande waarden worden nooit overschreven.
- Schemakenmerk: `settingsVersion` (momenteel `1`).
- Sleutels en standaardwaarden:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code: zie `sources/background.js` → `initializeOrMigrateSettings()` en `SCHEMA_VERSION`.

Dev‑workflow (nieuwe instelling toevoegen)

- Verhoog `SCHEMA_VERSION` in `sources/background.js`.
- Voeg de nieuwe sleutel + standaardwaarde toe aan het `DEFAULTS`‑object in `initializeOrMigrateSettings()`.
- Gebruik de "only-if-undefined"‑regel bij het zaaien van standaardwaarden; overschrijf geen bestaande waarden.
- Als de instelling zichtbaar is voor de gebruiker, koppel deze in `sources/options.js` en voeg gelokaliseerde strings toe.
- Voeg tests toe/pas ze aan (zie `tests/background.settings.migration.test.js`).

Tips voor handmatig testen

- Simuleer een schone installatie: wis de datamap van de extensie of start met een nieuw profiel.
- Simuleer een update: stel `settingsVersion` in op `0` in `storage.local` en laad opnieuw; bevestig dat bestaande waarden ongewijzigd blijven en alleen ontbrekende sleutels worden toegevoegd.

---

### Probleemoplossing {#troubleshooting}

- Zorg dat Thunderbird 128 ESR of nieuwer is
- Gebruik de Foutconsole voor runtime‑problemen
- Als opgeslagen instellingen niet goed lijken te worden toegepast, herstart Thunderbird en probeer opnieuw. (Thunderbird kan status tussen sessies cachen; een herstart zorgt dat instellingen vers worden geladen.)

---

### CI & coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) draait vitest met dekkingsdrempels (85% regels/functies/takken/statements). Als drempels niet worden gehaald, faalt de taak.
- De workflow uploadt een artefact `coverage-html` met het HTML‑rapport; download dit vanaf de run‑pagina (Actions → laatste run → Artifacts).

---

### Bijdragen {#contributing}

- Zie CONTRIBUTING.md voor richtlijnen rond branches/commits/PR’s
- Tip: maak een apart Thunderbird‑ontwikkelprofiel voor testen om je dagelijkse profiel niet te beïnvloeden.

---

### Vertalingen

- Grote “all → all”‑vertaaljobs kunnen traag en duur zijn. Begin met een subset (bijv. enkele docs en 1–2 locales), beoordeel het resultaat en breid dan uit.

---

- Retrybeleid: vertaaljobs doen tot 3 herpogingen met exponentiële backoff bij API‑fouten; zie `scripts/translate_web_docs_batch.js` en `scripts/translate_web_docs_sync.js`.

Schermafbeeldingen voor documentatie

- Sla afbeeldingen op onder `website/static/img/`.
- Verwijs ernaar in MD/MDX via `useBaseUrl('/img/<filename>')` zodat paden werken met de site `baseUrl`.
- Nadat je afbeeldingen hebt toegevoegd of hernoemd onder `website/static/img/`, bevestig dat alle verwijzingen nog steeds `useBaseUrl('/img/…')` gebruiken en renderen in een lokale preview.
  Favicons

- De multi‑size `favicon.ico` wordt automatisch gegenereerd in alle buildpaden (Make + scripts) via `website/scripts/build-favicon.mjs`.
- Geen handmatige stap vereist; `icon-*.png` bijwerken is voldoende.
  Reviewtip

- Laat de front‑matter `id` ongewijzigd in vertaalde docs; vertaal alleen `title` en `sidebar_label` indien aanwezig.

#### clean {#mt-clean}

- Doel: lokale build-/preview‑artefacten verwijderen.
- Gebruik: `make clean`
- Verwijdert (indien aanwezig):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Doel: formatteren, testen, changelog bijwerken, committen en pushen.
- Gebruik: `make commit`
- Details: draait Prettier (write), `make test`, `make test_i18n`; voegt changelog toe wanneer er staged diffs zijn; pusht naar `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Doel: ESLint draaien via flat config.
- Gebruik: `make eslint`

---

#### help {#mt-help}

- Doel: alle targets met beknopte docs weergeven.
- Gebruik: `make help`

---

#### lint {#mt-lint}

- Doel: de MailExtension linten met `web-ext`.
- Gebruik: `make lint`
- Opmerkingen: kopieert tijdelijk `sources/manifest_LOCAL.json` → `sources/manifest.json`; negeert gebouwde ZIP’s; waarschuwingen laten de pipeline niet falen.

---

#### menu {#mt-menu}

- Doel: interactief menu om een Make‑target en optionele argumenten te kiezen.
- Gebruik: voer `make` uit zonder argumenten.
- Opmerkingen: als `whiptail` niet beschikbaar is, valt het menu terug op `make help`.

---

#### pack {#mt-pack}

- Doel: ATN‑ en LOCAL‑ZIP’s bouwen (hangt af van `lint`).
- Gebruik: `make pack`
- Tip: verhoog versies in beide `sources/manifest_*.json` vóór het verpakken.

---

#### prettier {#mt-prettier}

- Doel: de repo ter plekke formatteren.
- Gebruik: `make prettier`

#### prettier_check {#mt-prettier_check}

- Doel: formattering verifiëren (geen writes).
- Gebruik: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Doel: alias voor `prettier`.
- Gebruik: `make prettier_write`

---

#### test {#mt-test}

- Doel: Prettier (write), daarna ESLint en vervolgens Vitest (coverage indien geïnstalleerd).
- Gebruik: `make test`

#### test_i18n {#mt-test_i18n}

- Doel: i18n‑gerichte tests voor add‑on‑strings en websitedocumentatie.
- Gebruik: `make test_i18n`
- Draait: `npm run test:i18n` en `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Doel: add‑on‑UI‑strings vertalen van EN naar andere locales.
- Gebruik: `make translation_app OPTS="--locales all|de,fr"`
- Opmerkingen: behoudt sleutelstructuur en plaatsaanduidingen; logt naar `translation_app.log`. Scriptvorm: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Doel: websitedocumentatie vertalen van `website/docs/*.md` naar `website/i18n/<locale>/...`.
- Voorkeur: `translate_web_docs_batch` (OpenAI Batch API)
  - Gebruik (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positioneel wordt nog steeds geaccepteerd: `OPTS="<doc|all> <lang|all>"`
- Gedrag: bouwt JSONL, uploadt, polt elke 30s, downloadt resultaten, schrijft bestanden.
- Opmerking: een batchtaak kan tot 24 uur duren (volgens OpenAI’s batchvenster). De console toont de verstreken tijd bij elke poll.
- Omgeving: `OPENAI_API_KEY` (vereist), optioneel `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standaard 24u), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Gebruik (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positioneel wordt nog steeds geaccepteerd: `OPTS="<doc|all> <lang|all>"`
- Gedrag: synchrone verzoeken per paar (geen batchaggregatie).
- Opmerkingen: interactieve prompts wanneer `OPTS` is weggelaten. Beide modi behouden codeblokken/inline code en laten front‑matter `id` ongewijzigd; logt naar `translation_web_batch.log` (batch) of `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Doel: website‑UI‑strings (homepage, navbar, footer) vertalen van `website/i18n/en/code.json` naar alle locales onder `website/i18n/<locale>/code.json` (exclusief `en`).
- Gebruik: `make translate_web_index` of `make translate_web_index OPTS="--locales de,fr [--force]"`
- Vereisten: exporteer `OPENAI_API_KEY` (optioneel: `OPENAI_MODEL=gpt-4o-mini`).
- Gedrag: valideert JSON‑structuur, behoudt accolades‑plaatsaanduidingen, laat URL’s ongewijzigd en probeert met feedback opnieuw bij validatiefouten.

---

#### web_build {#mt-web_build}

- Doel: de docs‑site bouwen naar `website/build`.
- Gebruik: `make web_build OPTS="--locales en|de,en|all"` (of stel `BUILD_LOCALES="en de"` in)
- Interne werking: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Afhankelijkheden: draait `npm ci` in `website/` alleen als `website/node_modules/@docusaurus` ontbreekt.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Doel: offline‑veilige linkcontrole.
- Gebruik: `make web_build_linkcheck OPTS="--locales en|all"`
- Opmerkingen: bouwt naar `tmp_linkcheck_web_pages`; herschrijft GH Pages `baseUrl` naar `/`; slaat externe HTTP(S)‑links over.

#### web_build_local_preview {#mt-web_build_local_preview}

- Doel: lokale gh‑pages‑preview met optionele tests/linkcontrole.
- Gebruik: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Gedrag: probeert eerst de Node‑previewserver (`scripts/preview-server.mjs`, ondersteunt `/__stop`), valt terug op `python3 -m http.server`; serveert op 8080–8090; PID bij `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Doel: `website/build` pushen naar de `gh-pages`‑branch.
- Gebruik: `make web_push_github`

Tip: stel `NPM=…` in om de pakketmanager die door het Makefile wordt gebruikt te overschrijven (standaard `npm`).

---
