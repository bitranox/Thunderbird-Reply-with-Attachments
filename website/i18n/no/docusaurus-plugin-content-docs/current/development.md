---
id: development
title: 'Utvikling'
sidebar_label: 'Utvikling'
---

---

## Utviklingsveiledning {#development-guide}

:::note Rediger kun engelsk; oversettelser videreføres
Oppdater dokumentasjon **kun** under `website/docs` (engelsk). Oversettelser under `website/i18n/<locale>/…` genereres og skal ikke redigeres manuelt. Bruk oversettelsesoppgavene (f.eks. `make translate_web_docs_batch`) for å oppdatere lokalisert innhold.
:::

### Forutsetninger {#prerequisites}

- Node.js 22+ og npm (testet med Node 22)
- Thunderbird 128 ESR eller nyere (for manuell testing)

---

### Prosjektstruktur (overordnet) {#project-layout-high-level}

- Rot: pakkeskript `distribution_zip_packer.sh`, dokumentasjon, skjermbilder
- `sources/`: hovedkode for tillegg (bakgrunn, alternativer/sprettopp-UI, manifester, ikoner)
- `tests/`: Vitest-suite
- `website/`: Docusaurus-dokumentasjon (med i18n under `website/i18n/de/...`)

---

### Installering og verktøy {#install-and-tooling}

- Installer rotavhengigheter: `npm ci`
- Dokumentasjon (valgfritt): `cd website && npm ci`
- Finn mål: `make help`

---

### Live‑utvikling (web‑ext run) {#live-dev-web-ext}

- Rask sløyfe i Firefox Desktop (kun UI-smoketester):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Kjør i Thunderbird (foretrukket for MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Hold Thunderbirds feilkonsoll åpen (Verktøy → Utviklerverktøy → Feilkonsoll).
- MV3-hendelsessider settes i hvile når de er inaktive; last tillegget på nytt etter kodeendringer, eller la web‑ext autorelaste.
- Noen Firefox‑spesifikke atferder avviker; verifiser alltid i Thunderbird for API‑paritet.
- Thunderbird-binærbaner (eksempler):
- Linux: `thunderbird` (f.eks. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profilisolasjon: Bruk en egen Thunderbird‑profil for utvikling for å unngå å påvirke ditt daglige oppsett.

---

### Make‑mål (alfabetisk) {#make-targets-alphabetical}

Makefile standardiserer vanlige utviklingsflyter. Kjør `make help` når som helst for en énliniers oppsummering av hvert mål.

Tips: å kjøre `make` uten mål åpner en enkel Whiptail‑meny for å velge et mål.

| Mål                                                      | Énlinjes beskrivelse                                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Fjern lokale bygge-/forhåndsvisningsartefakter (tmp/, web-local-preview/, website/build/). |
| [`commit`](#mt-commit)                                   | Formatter, kjør tester (inkl. i18n), oppdater endringslogg, commit og push.                |
| [`eslint`](#mt-eslint)                                   | Kjør ESLint via flat config (`npm run -s lint:eslint`).                                    |
| [`help`](#mt-help)                                       | List alle mål med énliniers beskrivelser (sortert).                                        |
| [`lint`](#mt-lint)                                       | web‑ext lint på `sources/` (midlertidig manifest; ignorerer ZIP-er; ikke‑fatal).           |
| [`menu`](#mt-menu)                                       | Interaktiv meny for å velge et mål og valgfrie argumenter.                                 |
| [`pack`](#mt-pack)                                       | Bygg ATN- og LOCAL‑ZIP-er (kjører linter; kaller pakker‑skript).                           |
| [`prettier`](#mt-prettier)                               | Formatter depotet på stedet (skriver endringer).                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier i kontrollmodus (ingen skriving); feiler hvis omformattering trengs.              |
| [`prettier_write`](#mt-prettier_write)                   | Alias for `prettier`.                                                                      |
| [`test`](#mt-test)                                       | Prettier (skriv), ESLint, deretter Vitest (dekning hvis konfigurert).                      |
| [`test_i18n`](#mt-test_i18n)                             | Kun i18n‑tester: tillegg‑plassholdere/paritet + nettsted‑paritet.                          |
| [`translate_app`](#mt-translation-app)                   | Alias for `translation_app`.                                                               |
| [`translation_app`](#mt-translation-app)                 | Oversett app‑UI‑strenger fra `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | Oversett nettstedets dokumenter via OpenAI Batch API (foretrukket).                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Oversett nettstedets dokumenter synkront (eldre, ikke‑batch).                              |
| [`translate_web_index`](#mt-translation_web_index)       | Alias for `translation_web_index`.                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Oversett UI for hjemmeside/meny/fot (`website/i18n/en/code.json → .../<lang>/code.json`).  |
| [`web_build`](#mt-web_build)                             | Bygg dokumentasjon til `website/build` (støtter `--locales` / `BUILD_LOCALES`).            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Frakoblingssikker lenkekontroll (hopper over eksterne HTTP[S]).                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokal gh‑pages‑forhåndsvisning; autoserver på 8080–8090; valgfrie tester/lenkekontroll.    |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` til grenen `gh-pages`.                                                |

Syntaks for alternativer

- Bruk `make <command> OPTS="…"` for å sende alternativer (anbefaler anførselstegn). Hvert mål nedenfor viser eksempelbruk.

--

-

#### Byggetips for språk {#locale-build-tips}

- Bygg et delsett av språk: sett `BUILD_LOCALES="en de"` eller send `OPTS="--locales en,de"` til nettmålene.
- Forhåndsvis et bestemt språk: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bygg og pakk {#build-and-package}

- Bygg ZIP-er: `make pack`
- Produserer ATN- og LOCAL‑ZIP-er i rotmappen til repoet (ikke rediger artefakter for hånd)
- Tips: oppdater versjon i både `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json` før pakking
- Manuell installasjon (dev): Thunderbird → Verktøy → Tillegg og temaer → tannhjul → Installer tillegg fra fil … → velg den bygde ZIP-en

---

### Test {#test}

- Full pakke: `make test` (Vitest)
- Dekning (valgfritt):
- `npm i -D @vitest/coverage-v8`
- Kjør `make test`; åpne `coverage/index.html` for HTML‑rapport
- Kun i18n: `make test_i18n` (UI‑nøkler/plassholdere/titler + nettsted‑paritet per språk per dokument med kontroller av id/title/sidebar_label)

---

### Feilsøking og logger {#debugging-and-logs}

- Feilkonsoll: Verktøy → Utviklerverktøy → Feilkonsoll
- Slå detaljerte logger av/på under kjøring:
- Aktiver: `messenger.storage.local.set({ debug: true })`
- Deaktiver: `messenger.storage.local.set({ debug: false })`
- Logger vises mens du komponerer/sender svar

---

### Dokumentasjon (nettsted) {#docs-website}

- Dev‑server: `cd website && npm run start`
- Bygg statisk nettsted: `cd website && npm run build`
- Make‑ekvivalenter (alfabetisk): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Brukseksempler:
- Kun EN, hopp over tester/lenkekontroll, ingen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Alle språk, med tester/lenkekontroll, deretter push: `make web_build_local_preview && make web_push_github`
- Før publisering, kjør den frakoblingssikre lenkekontrollen: `make web_build_linkcheck`.
- i18n: Engelsk ligger i `website/docs/*.md`; tyske oversettelser i `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Søk: Hvis Algolia DocSearch‑miljøvariabler er satt i CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), bruker nettstedet Algolia‑søk; ellers faller det tilbake til lokalt søk. På forsiden, trykk `/` eller `Ctrl+K` for å åpne søkeboksen.

---

#### Donasjons‑omdirigering {#donate-redirect}

- `website/src/pages/donate.js`
- Rute: `/donate` (og `/<locale>/donate`)
- Oppførsel:
- Hvis gjeldende rute har et språk (f.eks. `/de/donate`), bruk det
- Ellers, velg beste treff fra `navigator.languages` kontra konfigurerte språk; fall tilbake til standardspråket
- Omdirigerer til:
- `en` → `/docs/donation`
- andre → `/<locale>/docs/donation`
- Bruker `useBaseUrl` for korrekt baseUrl‑håndtering
- Inkluderer meta‑oppfriskning + `noscript`‑lenke som reserve

---

---

#### Forhåndsvisningstips {#preview-tips}

- Stopp Node‑forhåndsvisning på en ryddig måte: åpne `http://localhost:<port>/__stop` (printes etter `Local server started`).
- Hvis bilder ikke lastes i MDX/JSX, bruk `useBaseUrl('/img/...')` for å respektere nettstedets `baseUrl`.
- Forhåndsvisningen starter først; lenkekontrollen kjører etterpå og er ikke‑blokkerende (brutte eksterne lenker stopper ikke forhåndsvisningen).
- Eksempel på forhåndsvisnings‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (printes etter «Local server started»).
- Eksterne lenker i lenkekontroll: Noen eksterne nettsteder (f.eks. addons.thunderbird.net) blokkerer automatiske crawlere og kan vise 403 i lenkekontroller. Forhåndsvisningen starter likevel; disse kan trygt ignoreres.

---

#### Oversett nettstedet {#translate-website}

Hva du kan oversette

- Kun nettstedets UI: forside, navigasjonslinje, bunntekst og andre UI‑strenger. Dokumentasjonsinnhold forblir kun på engelsk inntil videre.

Hvor du redigerer

- Rediger `website/i18n/<locale>/code.json` (bruk `en` som referanse). Hold plassholdere som `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` uendret.

Generer eller oppdater filer

- Opprett manglende stubbfiler for alle språk: `npm --prefix website run i18n:stubs`
- Overskriv stubber fra engelsk (etter å ha lagt til nye strenger): `npm --prefix website run i18n:stubs:force`
- Alternativ for ett enkelt språk: `npx --prefix website docusaurus write-translations --locale <locale>`

Oversett UI‑strenger for forside/navigasjonslinje/bunntekst (OpenAI)

- Sett legitimasjon én gang (shell eller .env):
- `export OPENAI_API_KEY=sk-...`
- Valgfritt: `export OPENAI_MODEL=gpt-4o-mini`
- Éngang (alle språk, hopp over en): `make translate_web_index`
- Begrens til bestemte språk: `make translate_web_index OPTS="--locales de,fr"`
- Overskriv eksisterende verdier: `make translate_web_index OPTS="--force"`

Validering og nye forsøk

- Oversettelsesskriptet validerer JSON‑formen, bevarer plassholdere med krøllparenteser og sikrer at URL‑er er uendrede.
- Ved valideringsfeil prøver det på nytt med tilbakemelding opptil 2 ganger før eksisterende verdier beholdes.

Forhåndsvis språket ditt

- Dev‑server: `npm --prefix website run start`
- Besøk `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Innsending

- Åpne en PR med de redigerte `code.json`‑filene. Hold endringene fokuserte og legg ved et raskt skjermbilde når mulig.

---

### Sikkerhets‑ og konfigurasjonstips {#security-and-configuration-tips}

- Ikke commit `sources/manifest.json` (opprettes midlertidig av bygget)
- Hold `browser_specific_settings.gecko.id` stabil for å bevare oppdateringskanalen

---

### Vedvarende innstillinger {#settings-persistence}

- Lagring: Alle brukerinnstillinger ligger i `storage.local` og består på tvers av tilleggsoppdateringer.
- Installering: Standarder brukes bare når en nøkkel strengt tatt mangler (undefined).
- Oppdatering: En migrasjon fyller kun manglende nøkler; eksisterende verdier overskrives aldri.
- Skjemamarkør: `settingsVersion` (for øyeblikket `1`).
- Nøkler og standarder:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: se `sources/background.js` → `initializeOrMigrateSettings()` og `SCHEMA_VERSION`.

Dev‑arbeidsflyt (legge til en ny innstilling)

- Øk `SCHEMA_VERSION` i `sources/background.js`.
- Legg til den nye nøkkelen + standard i `DEFAULTS`‑objektet i `initializeOrMigrateSettings()`.
- Bruk «only-if-undefined»-regelen når du sår standarder; ikke overskriv eksisterende verdier.
- Hvis innstillingen er synlig for brukeren, koble den inn i `sources/options.js` og legg til lokaliserte strenger.
- Legg til/juster tester (se `tests/background.settings.migration.test.js`).

Tips for manuell testing

- Simuler en fersk installasjon: tøm utvidelsens datakatalog eller start med en ny profil.
- Simuler en oppdatering: sett `settingsVersion` til `0` i `storage.local` og last inn på nytt; bekreft at eksisterende verdier forblir uendret og at bare manglende nøkler legges til.

---

### Feilsøking {#troubleshooting}

- Sørg for at Thunderbird er 128 ESR eller nyere
- Bruk feilkonsollen for kjøretidsproblemer
- Hvis lagrede innstillinger ikke ser ut til å gjelde riktig, start Thunderbird på nytt og prøv igjen. (Thunderbird kan bufre tilstand på tvers av økter; en omstart sikrer at ferske innstillinger lastes.)

---

### CI og dekning {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) kjører vitest med dekningsgrenser (85 % linjer/funksjoner/grener/utsagn). Hvis grensene ikke oppfylles, feiler jobben.
- Arbeidsflyten laster opp et artefakt `coverage-html` med HTML‑rapporten; last den ned fra kjøresiden (Actions → siste kjøring → Artifacts).

---

### Bidra {#contributing}

- Se CONTRIBUTING.md for retningslinjer for branch/commit/PR
- Tips: Opprett en egen Thunderbird‑utviklingsprofil for testing for å unngå å påvirke din daglige profil.

---

### Oversettelser

- Å kjøre store «alle → alle»-oversettelsesjobber kan være trege og dyre. Start med et delsett (f.eks. noen få dokumenter og 1–2 språk), gjennomgå resultatet og utvid deretter.

---

- Retningslinjer for nye forsøk: oversettelsesjobber gjør opptil 3 nye forsøk med eksponentiell backoff ved API‑feil; se `scripts/translate_web_docs_batch.js` og `scripts/translate_web_docs_sync.js`.

Skjermbilder for dokumentasjon

- Lagre bilder under `website/static/img/`.
- Referer til dem i MD/MDX via `useBaseUrl('/img/<filename>')` slik at stier fungerer med nettstedets `baseUrl`.
- Etter å ha lagt til eller gitt nytt navn til bilder under `website/static/img/`, bekreft at alle referanser fortsatt bruker `useBaseUrl('/img/…')` og vises i en lokal forhåndsvisning.
  Favikoner

- Den flerstørrelses `favicon.ico` genereres automatisk i alle byggebaner (Make + skript) via `website/scripts/build-favicon.mjs`.
- Ingen manuell handling kreves; det holder å oppdatere `icon-*.png`.
  Gjennomgangstips

- Behold front‑matter‑`id` uendret i oversatte dokumenter; oversett bare `title` og `sidebar_label` når de finnes.

#### clean {#mt-clean}

- Hensikt: fjern lokale bygge-/forhåndsvisningsartefakter.
- Bruk: `make clean`
- Fjerner (hvis til stede):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Hensikt: formatter, test, oppdater endringslogg, commit og push.
- Bruk: `make commit`
- Detaljer: kjører Prettier (skriv), `make test`, `make test_i18n`; legger til i endringsloggen når det finnes endringer i staging; pusher til `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Hensikt: kjør ESLint via flat config.
- Bruk: `make eslint`

---

#### help {#mt-help}

- Hensikt: list alle mål med énliniers dokumentasjon.
- Bruk: `make help`

---

#### lint {#mt-lint}

- Hensikt: lint MailExtension med `web-ext`.
- Bruk: `make lint`
- Notater: kopierer midlertidig `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorerer bygde ZIP-er; advarsler feiler ikke pipelinen.

---

#### menu {#mt-menu}

- Hensikt: interaktiv meny for å velge et Make‑mål og valgfrie argumenter.
- Bruk: kjør `make` uten argumenter.
- Merknader: hvis `whiptail` ikke er tilgjengelig, faller menyen tilbake til `make help`.

---

#### pack {#mt-pack}

- Hensikt: bygg ATN- og LOCAL‑ZIP-er (avhenger av `lint`).
- Bruk: `make pack`
- Tips: øk versjoner i begge `sources/manifest_*.json` før pakking.

---

#### prettier {#mt-prettier}

- Hensikt: formatter repoet på stedet.
- Bruk: `make prettier`

#### prettier_check {#mt-prettier_check}

- Hensikt: verifiser formatering (ingen skriving).
- Bruk: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Hensikt: alias for `prettier`.
- Bruk: `make prettier_write`

---

#### test {#mt-test}

- Hensikt: kjør Prettier (skriv), ESLint, deretter Vitest (dekning hvis installert).
- Bruk: `make test`

#### test_i18n {#mt-test_i18n}

- Hensikt: i18n‑fokuserte tester for tilleggstrenger og nettsidedokumenter.
- Bruk: `make test_i18n`
- Kjører: `npm run test:i18n` og `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Hensikt: oversett tilleggets UI‑strenger fra EN til andre språk.
- Bruk: `make translation_app OPTS="--locales all|de,fr"`
- Merknader: bevarer nøkkelstruktur og plassholdere; logger til `translation_app.log`. Skriptform: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Hensikt: oversett nettsidedokumenter fra `website/docs/*.md` til `website/i18n/<locale>/...`.
- Foretrukket: `translate_web_docs_batch` (OpenAI Batch API)
  - Bruk (flagg): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Eldre posisjonelle argumenter aksepteres fortsatt: `OPTS="<doc|all> <lang|all>"`
- Oppførsel: bygger JSONL, laster opp, poller hvert 30. sekund, laster ned resultater, skriver filer.
- Merk: en batchjobb kan ta opptil 24 timer å fullføre (i henhold til OpenAIs batchvindu). Konsollen viser medgått tid ved hver polling.
- Miljø: `OPENAI_API_KEY` (påkrevd), valgfritt `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standard 24 t), `BATCH_POLL_INTERVAL_MS`.
- Eldre: `translate_web_docs_sync`
  - Bruk (flagg): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Eldre posisjonelle argumenter aksepteres fortsatt: `OPTS="<doc|all> <lang|all>"`
- Oppførsel: synkrone forespørsler per par (ingen batch‑aggregering).
- Merknader: Interaktive spørsmål når `OPTS` er utelatt. Begge modusene bevarer kodeblokker/inline‑kode og holder front‑matter‑`id` uendret; logger til `translation_web_batch.log` (batch) eller `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Hensikt: oversett nettstedets UI‑strenger (forside, navigasjonslinje, bunntekst) fra `website/i18n/en/code.json` til alle språk under `website/i18n/<locale>/code.json` (ekskludert `en`).
- Bruk: `make translate_web_index` eller `make translate_web_index OPTS="--locales de,fr [--force]"`
- Krav: eksporter `OPENAI_API_KEY` (valgfritt: `OPENAI_MODEL=gpt-4o-mini`).
- Oppførsel: validerer JSON‑struktur, bevarer plassholdere med krøllparenteser, holder URL‑er uendrede og prøver på nytt med tilbakemelding ved valideringsfeil.

---

#### web_build {#mt-web_build}

- Hensikt: bygg dokumentsiden til `website/build`.
- Bruk: `make web_build OPTS="--locales en|de,en|all"` (eller sett `BUILD_LOCALES="en de"`)
- Internt: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Avhengigheter: kjører `npm ci` i `website/` bare hvis `website/node_modules/@docusaurus` mangler.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Hensikt: frakoblingssikker lenkekontroll.
- Bruk: `make web_build_linkcheck OPTS="--locales en|all"`
- Notater: bygger til `tmp_linkcheck_web_pages`; skriver om GH Pages `baseUrl` til `/`; hopper over eksterne HTTP(S)‑lenker.

#### web_build_local_preview {#mt-web_build_local_preview}

- Hensikt: lokal gh‑pages‑forhåndsvisning med valgfrie tester/lenkekontroll.
- Bruk: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Oppførsel: prøver først Node‑forhåndsvisningsserver (`scripts/preview-server.mjs`, støtter `/__stop`), faller tilbake til `python3 -m http.server`; serverer på 8080–8090; PID ved `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Hensikt: push `website/build` til grenen `gh-pages`.
- Bruk: `make web_push_github`

Tips: sett `NPM=…` for å overstyre pakkebehandleren som brukes av Makefile (standard `npm`).

---
