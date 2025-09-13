---
id: development
title: 'Ontwikkeling'
sidebar_label: 'Ontwikkeling'
---

## Development Guide {#development-guide}

:::note Edit English only; translations propagate
Update documentation **only** under `website/docs` (English). Translations under `website/i18n/<locale>/…` are generated and should not be edited manually. Use the translation tasks (e.g., `make translate_web_docs_batch`) to refresh localized content.
:::

### Prerequisites {#prerequisites}

- Node.js 22+ en npm (getest met Node 22)
- Thunderbird 128 ESR of nieuwer (voor handmatige tests)

---

### Project Layout (high‑level) {#project-layout-high-level}

- Root: packaging script `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: hoofd add-on code (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus docs (met i18n onder `website/i18n/de/...`)

---

### Install & Tooling {#install-and-tooling}

- Installeer root deps: `npm ci`
- Docs (optioneel): `cd website && npm ci`
- Ontdek targets: `make help`

---

### Live Dev (web‑ext run) {#live-dev-web-ext}

- Snelle loop in Firefox Desktop (alleen UI smoke‑tests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Uitvoeren in Thunderbird (voorkeur voor MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Houd de Error Console van Thunderbird open (Tools → Developer Tools → Error Console).
- MV3 event pages worden gepauzeerd wanneer ze inactief zijn; herlaad de add-on na codewijzigingen, of laat web‑ext automatisch herladen.
- Sommige Firefox‑specifieke gedragingen verschillen; verifieer altijd in Thunderbird voor API-pariteit.
- Thunderbird binaire paden (voorbeelden):
- Linux: `thunderbird` (bijv., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profielisolatie: gebruik een apart Thunderbird-profiel voor ontwikkeling om te voorkomen dat je dagelijkse setup wordt beïnvloed.

---

### Make Targets (Alphabetical) {#make-targets-alphabetical}

The Makefile standardizes common dev flows. Run `make help` anytime for a one‑line summary of every target.

Tip: running `make` with no target opens a simple Whiptail menu to pick a target.

| Target                                                   | One‑line description                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Verwijder lokale build/preview artefacten (tmp/, web-local-preview/, website/build/).     |
| [`commit`](#mt-commit)                                   | Formatteer, voer tests uit (incl. i18n), werk changelog bij, commit & push.               |
| [`eslint`](#mt-eslint)                                   | Voer ESLint uit via flat config (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | Lijst alle targets met one‑line docs (gesorteerd).                                        |
| [`lint`](#mt-lint)                                       | web‑ext lint op `sources/` (tijdelijk manifest; negeert ZIP's; niet-fatale).              |
| [`menu`](#mt-menu)                                       | Interactief menu om een target en optionele argumenten te selecteren.                     |
| [`pack`](#mt-pack)                                       | Bouw ATN & LOKALE ZIP's (loopt linter; roept packer script aan).                          |
| [`prettier`](#mt-prettier)                               | Formatteer de repository ter plekke (schrijft wijzigingen).                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier in controlemodus (geen schrijfbewerkingen); faalt als herformattering nodig is.  |
| [`prettier_write`](#mt-prettier_write)                   | Alias voor `prettier`.                                                                    |
| [`test`](#mt-test)                                       | Prettier (schrijven), ESLint, dan Vitest (dekking indien geconfigureerd).                 |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑alleen tests: add‑on placeholders/pariteit + website pariteit per taal per document. |
| [`translate_app`](#mt-translation-app)                   | Alias voor `translation_app`.                                                             |
| [`translation_app`](#mt-translation-app)                 | Vertaal app UI-strings van `sources/_locales/en/messages.json`.                           |
| [`translate_web_docs_batch`](#mt-translation-web)        | Vertaal website docs via OpenAI Batch API (voorkeur).                                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | Vertaal website docs synchronously (legacy, non-batch).                                   |
| [`translate_web_index`](#mt-translation_web_index)       | Alias voor `translation_web_index`.                                                       |
| [`translation_web_index`](#mt-translation_web_index)     | Vertaal homepage/navbar/footer UI (`website/i18n/en/code.json → .../<lang>/code.json`).   |
| [`web_build`](#mt-web_build)                             | Bouw docs naar `website/build` (ondersteunt `--locales` / `BUILD_LOCALES`).               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑veilige link check (negeert externe HTTP[S]).                                     |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokale gh‑pages preview; auto‑serve op 8080–8090; optionele tests/link‑check.             |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` naar de `gh-pages` branch.                                           |

Syntax for options

- Gebruik `make <command> OPTS="…"` om opties door te geven (aanhalingstekens aanbevolen). Elk target hieronder toont voorbeeldgebruik.

--

-

#### Locale build tips {#locale-build-tips}

- Bouw een subset van locale: stel `BUILD_LOCALES="en de"` in of geef `OPTS="--locales en,de"` door aan web targets.
- Preview een specifieke locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Package {#build-and-package}

- Bouw ZIP's: `make pack`
- Produceert ATN en LOKALE ZIP's in de repo root (bewerk artefacten niet met de hand)
- Tip: werk versie bij in zowel `sources/manifest_ATN.json` als `sources/manifest_LOCAL.json` voor het verpakken
- Handmatige installatie (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → selecteer de gebouwde ZIP

---

### Test {#test}

- Volledige suite: `make test` (Vitest)
- Dekking (optioneel):
- `npm i -D @vitest/coverage-v8`
- Voer `make test` uit; open `coverage/index.html` voor HTML-rapport
- i18n alleen: `make test_i18n` (UI-sleutels/placeholders/titels + website per-locale per-doc pariteit met id/title/sidebar_label checks)

---

### Debugging & Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Wissel tussen gedetailleerde logs tijdens runtime:
- Inschakelen: `messenger.storage.local.set({ debug: true })`
- Uitschakelen: `messenger.storage.local.set({ debug: false })`
- Logs verschijnen tijdens het opstellen/verzenden van antwoorden

---

### Docs (website) {#docs-website}

- Dev server: `cd website && npm run start`
- Bouw statische site: `cd website && npm run build`
- Maak equivalente (alfabetisch): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Voorbeeldgebruik:
- Alleen EN, overslaan van tests/link‑check, geen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Alle locales, met tests/link‑check, daarna push: `make web_build_local_preview && make web_push_github`
- Voordat je publiceert, voer de offline‑veilige link check uit: `make web_build_linkcheck`.
- i18n: Engels leeft in `website/docs/*.md`; Duitse vertalingen in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Zoekopdracht: Als Algolia DocSearch omgevingsvariabelen zijn ingesteld in CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), gebruikt de site Algolia-zoekopdracht; anders valt het terug op lokale zoekopdracht. Op de homepage druk `/` of `Ctrl+K` om het zoekvak te openen.

---

#### Donate redirect route {#donate-redirect}

- `website/src/pages/donate.js`
- Route: `/donate` (en `/<locale>/donate`)
- Gedrag:
- Als de huidige route een locale heeft (bijv., `/de/donate`), gebruik deze dan
- Anders, kies de beste match van `navigator.languages` versus geconfigureerde locales; val terug naar standaard locale
- Redirects naar:
- `en` → `/docs/donation`
- anderen → `/<locale>/docs/donation`
- Gebruikt `useBaseUrl` voor correcte baseUrl-afhandeling
- Bevat meta-refresh + `noscript` link als fallback

---

---

#### Preview Tips {#preview-tips}

- Stop Node preview schoon: open `http://localhost:<port>/__stop` (afgedrukt na `Local server started`).
- Als afbeeldingen niet laden in MDX/JSX, gebruik dan `useBaseUrl('/img/...')` om de site `baseUrl` te respecteren.
- De preview start eerst; de linkcheck draait daarna en is niet-blokkerend (gebroken externe links zullen de preview niet stoppen).
- Voorbeeld preview URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (afgedrukt na “Lokale server gestart”).
- Externe links in link-check: Sommige externe sites (bijv. addons.thunderbird.net) blokkeren geautomatiseerde crawlers en kunnen 403 tonen in link checks. De preview start nog steeds; deze kunnen veilig worden genegeerd.

---

#### Translate the Website {#translate-website}

Wat je kunt vertalen

- Website-ui alleen: homepage, navbar, footer en andere UI-strings. Docs-inhoud blijft voorlopig alleen in het Engels.

Waar te bewerken

- Bewerk `website/i18n/<locale>/code.json` (gebruik `en` als referentie). Houd placeholders zoals `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ongewijzigd.

Genereer of ververs bestanden

- Maak ontbrekende stubs voor alle locales: `npm --prefix website run i18n:stubs`
- Overschrijf stubs vanuit het Engels (na het toevoegen van nieuwe strings): `npm --prefix website run i18n:stubs:force`
- Alternatief voor een enkele locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Vertaal homepage/navbar/footer UI-strings (OpenAI)

- Stel inloggegevens één keer in (shell of .env):
- `export OPENAI_API_KEY=sk-...`
- Optioneel: `export OPENAI_MODEL=gpt-4o-mini`
- Eenmalig (alle locales, sla en over): `make translate_web_index`
- Beperk tot specifieke locales: `make translate_web_index OPTS="--locales de,fr"`
- Overschrijf bestaande waarden: `make translate_web_index OPTS="--force"`

Validatie & herhalingen

- Het vertaalscript valideert JSON-vorm, behoudt accolades-plaatsقدen, en zorgt ervoor dat URL's ongewijzigd blijven.
- Bij validatiefouten probeert het tot 2 keer opnieuw met feedback voordat bestaande waarden behouden blijven.

Preview je locale

- Dev server: `npm --prefix website run start`
- Bezoek `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Indien indienen

- Open een PR met de bewerkte `code.json` bestand(en). Houd wijzigingen gefocust en voeg indien mogelijk een snelle screenshot toe.

---

### Security & Configuration Tips {#security-and-configuration-tips}

- Commit `sources/manifest.json` niet (tijdelijk gemaakt door de build)
- Houd `browser_specific_settings.gecko.id` stabiel om het updatekanaal te behouden

---

### Settings Persistence {#settings-persistence}

- Opslag: Alle gebruikersinstellingen leven in `storage.local` en blijven bestaan ​​tijdens add-on-updates.
- Installeren: Standaarden worden alleen toegepast wanneer een sleutel strikt ontbreekt (onbepaald).
- Update: Een migratie vult alleen ontbrekende sleutels; bestaande waarden worden nooit overschreven.
- Schema-markering: `settingsVersion` (momenteel `1`).
- Sleutels en standaardwaarden:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code: zie `sources/background.js` → `initializeOrMigrateSettings()` en `SCHEMA_VERSION`.

Dev workflow (een nieuwe instelling toevoegen)

- Verhoog `SCHEMA_VERSION` in `sources/background.js`.
- Voeg de nieuwe sleutel + standaardwaarde toe aan de `DEFAULTS` object in `initializeOrMigrateSettings()`.
- Gebruik de "only-if-undefined" regel bij het zaaien van standaardwaarden; overschrijf bestaande waarden niet.
- Als de instelling zichtbaar is voor de gebruiker, verbind deze dan in `sources/options.js` en voeg gelokaliseerde strings toe.
- Voeg/benut tests toe (zie `tests/background.settings.migration.test.js`).

Handmatige testtips

- Simuleer een schone installatie: wis de gegevensmap van de extensie of begin met een nieuw profiel.
- Simuleer een update: stel `settingsVersion` in op `0` in `storage.local` en herlaad opnieuw; bevestig dat bestaande waarden ongewijzigd blijven en alleen ontbrekende sleutels worden toegevoegd.

---

### Troubleshooting {#troubleshooting}

- Zorg ervoor dat Thunderbird 128 ESR of nieuwer is
- Gebruik de Error Console voor runtime-problemen
- Als opgeslagen instellingen niet correct lijken toe te passen, herstart dan Thunderbird en probeer het opnieuw. (Thunderbird kan de staat tussen sessies cachen; een herstart zorgt ervoor dat nieuwe instellingen worden geladen.)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) voert vitest uit met de dekking drempels (85% regels/functies takken/statements). Als drempels niet worden gehaald, faalt de taak.
- De workflow uploadt een artefact `coverage-html` met het HTML-rapport; download het vanaf de runpagina (Acties → laatste run → Artefacten).

---

### Contributing {#contributing}

- Zie CONTRIBUTING.md voor branch/commit/PR-richtlijnen
- Tip: Maak een apart Thunderbird-ontwikkelingsprofiel voor tests om te voorkomen dat je dagelijkse profiel wordt beïnvloed.

---

### Translations

- Het uitvoeren van grote “all → all” vertaaljobs kan traag en duur zijn. Begin met een subset (bijv. een paar docs en 1–2 locale), beoordeel het resultaat, en breid vervolgens uit.

---

- Retrybeleid: vertaaljobs voeren tot 3 herhalingen uit met exponentiële terugval bij API-fouten; zie `scripts/translate_web_docs_batch.js` en `scripts/translate_web_docs_sync.js`.

Screenshots voor docs

- Bewaar afbeeldingen onder `website/static/img/`.
- Verwijs ernaar in MD/MDX via `useBaseUrl('/img/<filename>')` zodat paden werken met de site `baseUrl`.
- Na het toevoegen of hernoemen van afbeeldingen onder `website/static/img/`, bevestig dat alle verwijzingen nog steeds `useBaseUrl('/img/…')` gebruiken en worden weergegeven in een lokale preview.
  Favicons

- De multi‑size `favicon.ico` wordt automatisch gegenereerd in alle buildpaden (Make + scripts) via `website/scripts/build-favicon.mjs`.
- Er is geen handmatige stap nodig; het bijwerken van `icon-*.png` is voldoende.
  Review tip

- Houd de front‑matter `id` ongewijzigd in vertaalde docs; vertaal alleen `title` en `sidebar_label` wanneer aanwezig.

#### clean {#mt-clean}

- Doel: lokale build/preview artefacten verwijderen.
- Gebruik: `make clean`
- Verwijdert (indien aanwezig):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Doel: formatteren, testen, changelog bijwerken, commit, en push.
- Gebruik: `make commit`
- Details: voert Prettier uit (schrijven), `make test`, `make test_i18n`; voegt changelog toe wanneer er staged diffs zijn; pusht naar `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Doel: voer ESLint uit via flat config.
- Gebruik: `make eslint`

---

#### help {#mt-help}

- Doel: lijst alle targets met one‑line docs.
- Gebruik: `make help`

---

#### lint {#mt-lint}

- Doel: lint de MailExtension met `web-ext`.
- Gebruik: `make lint`
- Opmerkingen: temp‑copies `sources/manifest_LOCAL.json` → `sources/manifest.json`; negeert gebouwde ZIP's; waarschuwingen leiden niet tot het mislukken van de pipeline.

---

#### menu {#mt-menu}

- Doel: interactief menu om een Make doeltarget en optionele argumenten te selecteren.
- Gebruik: voer `make` uit zonder argumenten.
- Opmerkingen: als `whiptail` niet beschikbaar is, valt het menu terug op `make help`.

---

#### pack {#mt-pack}

- Doel: bouw ATN en lokale ZIP's (afhankelijk van `lint`).
- Gebruik: `make pack`
- Tip: verhoog versies in zowel `sources/manifest_*.json` voor het verpakken.

---

#### prettier {#mt-prettier}

- Doel: formatteer de repo ter plaatse.
- Gebruik: `make prettier`

#### prettier_check {#mt-prettier_check}

- Doel: verifieer opmaak (geen schrijfbewerkingen).
- Gebruik: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Doel: alias voor `prettier`.
- Gebruik: `make prettier_write`

---

#### test {#mt-test}

- Doel: voer Prettier (schrijven), ESLint, dan Vitest (dekking als geïnstalleerd) uit.
- Gebruik: `make test`

#### test_i18n {#mt-test_i18n}

- Doel: i18n-georiënteerde tests voor add-on strings en website docs.
- Gebruik: `make test_i18n`
- Voert uit: `npm run test:i18n` en `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Doel: vertaal add-on UI strings van EN naar andere locales.
- Gebruik: `make translation_app OPTS="--locales all|de,fr"`
- Opmerkingen: behoudt sleutelstructuur en placeholders; logt naar `translation_app.log`. Script vorm: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Doel: vertaal website docs van `website/docs/*.md` naar `website/i18n/<locale>/...`.
- Voorkeur: `translate_web_docs_batch` (OpenAI Batch API)
  - Gebruik (vlaggen): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy posities worden nog steeds geaccepteerd: `OPTS="<doc|all> <lang|all>"`
- Gedrag: bouwt JSONL, uploadt, polst elke 30s, downloadt resultaten, schrijft bestanden.
- Opmerking: een batchjob kan tot 24 uur duren om te voltooien (per OpenAI's batchvenster). De console toont de verstreken tijd bij elke poll.
- Env: `OPENAI_API_KEY` (vereist), optionele `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standaard 24u), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Gebruik (vlaggen): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy posities worden nog steeds geaccepteerd: `OPTS="<doc|all> <lang|all>"`
- Gedrag: synchrone aanvragen per paar (geen batchaggregatie).
- Opmerkingen: Interactieve prompts wanneer `OPTS` weggelaten. Beide modi behouden codeblokken/inline-code en houden front-matter `id` ongewijzigd; logt naar `translation_web_batch.log` (batch) of `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Doel: vertaal website UI strings (homepage, navbar, footer) van `website/i18n/en/code.json` naar alle locales onder `website/i18n/<locale>/code.json` (exclusief `en`).
- Gebruik: `make translate_web_index` of `make translate_web_index OPTS="--locales de,fr [--force]"`
- Vereisten: export `OPENAI_API_KEY` (optioneel: `OPENAI_MODEL=gpt-4o-mini`).
- Gedrag: valideert de JSON-structuur, behoudt accolades placeholders, houdt URLs ongewijzigd en probeert opnieuw met feedback bij validatiefouten.

---

#### web_build {#mt-web_build}

- Doel: bouw de docs site naar `website/build`.
- Gebruik: `make web_build OPTS="--locales en|de,en|all"` (of stel `BUILD_LOCALES="en de"` in)
- Internals: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: draait `npm ci` in `website/` alleen als `website/node_modules/@docusaurus` ontbreekt.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Doel: offline-veilige link check.
- Gebruik: `make web_build_linkcheck OPTS="--locales en|all"`
- Opmerkingen: bouwt naar `tmp_linkcheck_web_pages`; herschrijft GH-pagina's `baseUrl` naar `/`; negeert externe HTTP(S)-links.

#### web_build_local_preview {#mt-web_build_local_preview}

- Doel: lokale gh‑pages preview met optionele tests/link-check.
- Gebruik: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Gedrag: probeert eerst Node preview server (`scripts/preview-server.mjs`, ondersteunt `/__stop`), valt terug naar `python3 -m http.server`; serveert op 8080–8090; PID op `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Doel: push `website/build` naar de `gh-pages` branch.
- Gebruik: `make web_push_github`

Tip: stel `NPM=…` in om de package manager die door het Makefile wordt gebruikt te overschrijven (standaard `npm`).
