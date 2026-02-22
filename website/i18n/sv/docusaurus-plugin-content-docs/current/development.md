---
id: development
title: 'Utveckling'
sidebar_label: 'Utveckling'
---

---

## Utvecklingsguide {#development-guide}

:::note Redigera endast engelska; översättningar sprids
Uppdatera dokumentationen endast under `website/docs` (engelska). Översättningar under `website/i18n/<locale>/…` genereras och ska inte redigeras manuellt. Använd översättningsuppgifterna (t.ex. `make translate_web_docs_batch`) för att uppdatera lokaliserat innehåll.
:::

### Förutsättningar {#prerequisites}

- Node.js 22+ och npm (testad med Node 22)
- Thunderbird 128 ESR eller nyare (för manuell testning)

---

### Projektlayout (översiktlig) {#project-layout-high-level}

- Rot: paketeringsskript `distribution_zip_packer.sh`, dokumentation, skärmdumpar
- `sources/`: huvudkod för tillägget (background, options/popup‑UI, manifest, ikoner)
- `tests/`: Vitest‑svit
- `website/`: Docusaurus‑dokumentation (med i18n under `website/i18n/de/...`)

---

### Installation och verktyg {#install-and-tooling}

- Installera beroenden i roten: `npm ci`
- Dokumentation (valfritt): `cd website && npm ci`
- Upptäck mål: `make help`

---

### Live‑utveckling (web‑ext run) {#live-dev-web-ext}

- Snabb loop i Firefox Desktop (endast UI‑röktester):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Kör i Thunderbird (föredras för MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Håll Thunderbirds Felkonsol öppen (Verktyg → Utvecklarverktyg → Felkonsol).
- MV3‑händelsesidor pausas vid inaktivitet; ladda om tillägget efter kodändringar, eller låt web‑ext ladda om automatiskt.
- Vissa Firefox‑specifika beteenden skiljer sig; verifiera alltid i Thunderbird för API‑paritet.
- Sökvägar till Thunderbird‑binär (exempel):
- Linux: `thunderbird` (t.ex. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profilisolering: Använd en separat Thunderbird‑profil för utveckling för att undvika att påverka din dagliga miljö.

---

### Make‑mål (alfabetiskt) {#make-targets-alphabetical}

Makefile standardiserar vanliga utvecklingsflöden. Kör `make help` när som helst för en enradssammanfattning av varje mål.

Tips: att köra `make` utan mål öppnar en enkel Whiptail‑meny för att välja mål.

| Mål                                                      | Beskrivning i en rad                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ta bort lokala bygg-/förhandsgranskningsartefakter (tmp/, web-local-preview/, website/build/).     |
| [`commit`](#mt-commit)                                   | Formatera, kör tester (inkl. i18n), uppdatera changelog, commit och push.                          |
| [`eslint`](#mt-eslint)                                   | Kör ESLint via flat‑konfiguration (`npm run -s lint:eslint`).                                      |
| [`help`](#mt-help)                                       | Lista alla mål med enradiga beskrivningar (sorterade).                                             |
| [`lint`](#mt-lint)                                       | web‑ext lint på `sources/` (temporärt manifest; ignorerar ZIP:ar; icke‑fatal).                     |
| [`menu`](#mt-menu)                                       | Interaktiv meny för att välja ett mål och valfria argument.                                        |
| [`pack`](#mt-pack)                                       | Bygg ATN‑ och LOCAL‑ZIP:ar (kör linter; anropar packerskript).                                     |
| [`prettier`](#mt-prettier)                               | Formatera arkivet på plats (skriver ändringar).                                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier i kontrolläge (inga skrivningar); fallerar om omformatering krävs.                        |
| [`prettier_write`](#mt-prettier_write)                   | Alias för `prettier`.                                                                              |
| [`test`](#mt-test)                                       | Prettier (skriv), ESLint, sedan Vitest (täckning om konfigurerad).                                 |
| [`test_i18n`](#mt-test_i18n)                             | Endast i18n‑tester: tilläggs‑platshållare/paritet + webbplatsparitet.                              |
| [`translate_app`](#mt-translation-app)                   | Alias för `translation_app`.                                                                       |
| [`translation_app`](#mt-translation-app)                 | Översätt appens UI‑strängar från `sources/_locales/en/messages.json`.                              |
| [`translate_web_docs_batch`](#mt-translation-web)        | Översätt webbplatsdokument via OpenAI Batch API (föredras).                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Översätt webbplatsdokument synkront (gammalt läge, ej batch).                                      |
| [`translate_web_index`](#mt-translation_web_index)       | Alias för `translation_web_index`.                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Översätt UI för startsida/menyrad/sidfot (`website/i18n/en/code.json → .../<lang>/code.json`).     |
| [`web_build`](#mt-web_build)                             | Bygg dokumentationen till `website/build` (stöder `--locales` / `BUILD_LOCALES`).                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑säker länkkontroll (hoppar över fjärr‑HTTP[S]).                                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokal gh‑pages‑förhandsgranskning; serverar automatiskt på 8080–8090; valfria tester/länkkontroll. |
| [`web_push_github`](#mt-web_push_github)                 | Skicka `website/build` till grenen `gh-pages`.                                                     |

Syntax för alternativ

- Använd `make <command> OPTS="…"` för att skicka alternativ (citat rekommenderas). Varje mål nedan visar exempel på användning.

--

-

#### Tips för locale‑byggen {#locale-build-tips}

- Bygg en delmängd av locales: ställ in `BUILD_LOCALES="en de"` eller skicka `OPTS="--locales en,de"` till webb‑målen.
- Förhandsgranska en specifik locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Bygg och paketera {#build-and-package}

- Bygg ZIP:ar: `make pack`
- Producerar ATN‑ och LOCAL‑ZIP:ar i repo‑roten (redigera inte artefakter för hand)
- Tips: uppdatera versionen i både `sources/manifest_ATN.json` och `sources/manifest_LOCAL.json` före paketering
- Manuell installation (dev): Thunderbird → Verktyg → Tillägg och teman → kugghjul → Installera tillägg från fil… → välj den byggda ZIP:en

---

### Testa {#test}

- Full uppsättning: `make test` (Vitest)
- Täckning (valfritt):
- `npm i -D @vitest/coverage-v8`
- Kör `make test`; öppna `coverage/index.html` för HTML‑rapport
- Endast i18n: `make test_i18n` (UI‑nycklar/platshållare/titlar + webbplats‑paritet per locale och per dokument med kontroller för id/title/sidebar_label)

---

### Felsökning och loggar {#debugging-and-logs}

- Felkonsol: Verktyg → Utvecklarverktyg → Felkonsol
- Växla utförliga loggar vid körning:
- Aktivera: `messenger.storage.local.set({ debug: true })`
- Inaktivera: `messenger.storage.local.set({ debug: false })`
- Loggar visas när du skriver/skickar svar

---

### Dokumentation (webbplats) {#docs-website}

- Dev‑server: `cd website && npm run start`
- Bygg statisk sajt: `cd website && npm run build`
- Make‑motsvarigheter (alfabetiskt): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Exempel på användning:
- Endast EN, hoppa över tester/länkkontroll, ingen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Alla locales, med tester/länkkontroll, sedan push: `make web_build_local_preview && make web_push_github`
- Innan publicering, kör den offline‑säkra länkkontrollen: `make web_build_linkcheck`.
- i18n: Engelska finns i `website/docs/*.md`; tyska översättningar i `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Sök: Om Algolia DocSearch‑miljövariablerna är satta i CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), använder sajten Algolia‑sök; annars faller den tillbaka till lokal sök. På startsidan, tryck `/` eller `Ctrl+K` för att öppna sökrutan.

---

#### Donations‑omdirigering {#donate-redirect}

- `website/src/pages/donate.js`
- Rutt: `/donate` (och `/<locale>/donate`)
- Beteende:
- Om den aktuella rutten har en locale (t.ex. `/de/donate`), använd den
- Annars, välj bästa matchning från `navigator.languages` jämfört med konfigurerade locales; fall tillbaka till standard‑locale
- Omdirigerar till:
- `en` → `/docs/donation`
- andra → `/<locale>/docs/donation`
- Använder `useBaseUrl` för korrekt hantering av baseUrl
- Inkluderar meta refresh + `noscript`‑länk som reserv

---

---

#### Tips för förhandsgranskning {#preview-tips}

- Stoppa Node‑förhandsgranskningen på ett snyggt sätt: öppna `http://localhost:<port>/__stop` (skrivs ut efter `Local server started`).
- Om bilder inte läses in i MDX/JSX, använd `useBaseUrl('/img/...')` för att respektera sajtens `baseUrl`.
- Förhandsgranskningen startar först; länkkontrollen körs därefter och är icke‑blockerande (trasiga externa länkar stoppar inte förhandsgranskningen).
- Exempel på förhandsgransknings‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (skrivs ut efter ”Local server started”).
- Externa länkar i länkkontroll: Vissa externa sajter (t.ex. addons.thunderbird.net) blockerar automatiserade crawlers och kan visa 403 i länkkontroller. Förhandsgranskningen startar ändå; dessa kan ignoreras.

---

#### Översätt webbplatsen {#translate-website}

Vad du kan översätta

- Endast webbplatsens UI: startsida, menyfält, sidfot och andra UI‑strängar. Dokumentationsinnehållet förblir tills vidare endast på engelska.

Var du redigerar

- Redigera `website/i18n/<locale>/code.json` (använd `en` som referens). Behåll platshållare som `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` oförändrade.

Generera eller uppdatera filer

- Skapa saknade stubbar för alla locales: `npm --prefix website run i18n:stubs`
- Skriv över stubbar från engelska (efter att du lagt till nya strängar): `npm --prefix website run i18n:stubs:force`
- Alternativ för en enskild locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Översätt UI‑strängar för startsida/menyrad/sidfot (OpenAI)

- Ställ in autentiseringsuppgifter en gång (shell eller .env):
- `export OPENAI_API_KEY=sk-...`
- Valfritt: `export OPENAI_MODEL=gpt-4o-mini`
- Engångskörning (alla locales, hoppa över en): `make translate_web_index`
- Begränsa till specifika locales: `make translate_web_index OPTS="--locales de,fr"`
- Skriv över befintliga värden: `make translate_web_index OPTS="--force"`

Validering och omförsök

- Översättningsskriptet validerar JSON‑formen, bevarar platshållare med måsvingar och säkerställer att URL:er är oförändrade.
- Vid valideringsfel försöker det igen med feedback upp till 2 gånger innan befintliga värden behålls.

Förhandsgranska din locale

- Dev‑server: `npm --prefix website run start`
- Besök `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Skicka in

- Öppna en PR med de redigerade `code.json`‑fil(erna). Håll ändringarna fokuserade och inkludera en snabb skärmdump när det är möjligt.

---

### Säkerhets- och konfigurationstips {#security-and-configuration-tips}

- Commita inte `sources/manifest.json` (skapas temporärt av bygget)
- Håll `browser_specific_settings.gecko.id` stabil för att bevara uppdateringskanalen

---

### Beständighet för inställningar {#settings-persistence}

- Lagring: Alla användarinställningar finns i `storage.local` och består över tilläggsuppdateringar.
- Installation: Standardvärden tillämpas endast när en nyckel saknas helt (undefined).
- Uppdatering: En migrering fyller endast saknade nycklar; befintliga värden skrivs aldrig över.
- Schemarkör: `settingsVersion` (för närvarande `1`).
- Nycklar och standardvärden:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: se `sources/background.js` → `initializeOrMigrateSettings()` och `SCHEMA_VERSION`.

Utvecklingsflöde (lägga till en ny inställning)

- Öka `SCHEMA_VERSION` i `sources/background.js`.
- Lägg till den nya nyckeln + standardvärdet i objektet `DEFAULTS` i `initializeOrMigrateSettings()`.
- Använd regeln ”endast om undefined” när du sår standardvärden; skriv inte över befintliga värden.
- Om inställningen är synlig för användaren, koppla in den i `sources/options.js` och lägg till lokaliserade strängar.
- Lägg till/justera tester (se `tests/background.settings.migration.test.js`).

Tips för manuell testning

- Simulera en nyinstallation: rensa tilläggets datakatalog eller starta med en ny profil.
- Simulera en uppdatering: sätt `settingsVersion` till `0` i `storage.local` och ladda om; bekräfta att befintliga värden förblir oförändrade och att endast saknade nycklar läggs till.

---

### Felsökning {#troubleshooting}

- Säkerställ att Thunderbird är 128 ESR eller nyare
- Använd Felkonsolen för körningstidfel
- Om lagrade inställningar verkar inte tillämpas korrekt, starta om Thunderbird och försök igen. (Thunderbird kan cacha tillstånd mellan sessioner; en omstart säkerställer att nya inställningar läses in.)

---

### CI och täckning {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) kör vitest med täckningströsklar (85% rader/funktioner/grenar/satser). Om trösklarna inte uppnås misslyckas jobbet.
- Arbetsflödet laddar upp ett artefakt `coverage-html` med HTML‑rapporten; ladda ner den från körningssidan (Actions → senaste körning → Artifacts).

---

### Bidra {#contributing}

- Se CONTRIBUTING.md för riktlinjer för grenar/commits/PR:er
- Tips: Skapa en separat Thunderbird‑utvecklingsprofil för testning för att undvika att påverka din dagliga profil.

---

### Översättningar

- Stora ”alla → alla”‑översättningsjobb kan vara långsamma och dyra. Börja med en delmängd (t.ex. några docs och 1–2 locales), granska resultatet och utöka sedan.

---

- Policy för omförsök: översättningsjobb gör upp till 3 omförsök med exponentiell backoff vid API‑fel; se `scripts/translate_web_docs_batch.js` och `scripts/translate_web_docs_sync.js`.

Skärmdumpar för dokumentationen

- Lagra bilder under `website/static/img/`.
- Referera till dem i MD/MDX via `useBaseUrl('/img/<filename>')` så att sökvägar fungerar med sajtens `baseUrl`.
- Efter att ha lagt till eller bytt namn på bilder under `website/static/img/`, bekräfta att alla referenser fortfarande använder `useBaseUrl('/img/…')` och renderas i en lokal förhandsgranskning.
  Favikoner

- Den flerstorleks `favicon.ico` genereras automatiskt i alla byggvägar (Make + skript) via `website/scripts/build-favicon.mjs`.
- Inget manuellt steg krävs; att uppdatera `icon-*.png` räcker.
  Gransknings‑tips

- Behåll front‑matter‑`id` oförändrad i översatta dokument; översätt endast `title` och `sidebar_label` när de finns.

#### clean {#mt-clean}

- Syfte: ta bort lokala bygg-/förhandsgranskningsartefakter.
- Användning: `make clean`
- Tar bort (om de finns):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Syfte: formatera, testa, uppdatera changelog, commita och pusha.
- Användning: `make commit`
- Detaljer: kör Prettier (skriv), `make test`, `make test_i18n`; lägger till changelog när det finns staged‑diffar; pushar till `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Syfte: köra ESLint via flat‑konfiguration.
- Användning: `make eslint`

---

#### help {#mt-help}

- Syfte: lista alla mål med enradiga beskrivningar.
- Användning: `make help`

---

#### lint {#mt-lint}

- Syfte: linta MailExtension med `web-ext`.
- Användning: `make lint`
- Noteringar: kopierar temporärt `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorerar byggda ZIP:ar; varningar gör inte att pipelinen fallerar.

---

#### menu {#mt-menu}

- Syfte: interaktiv meny för att välja ett Make‑mål och valfria argument.
- Användning: kör `make` utan argument.
- Noteringar: om `whiptail` inte är tillgängligt, faller menyn tillbaka till `make help`.

---

#### pack {#mt-pack}

- Syfte: bygg ATN‑ och LOCAL‑ZIP:ar (beror på `lint`).
- Användning: `make pack`
- Tips: höj versionerna i båda `sources/manifest_*.json` före paketering.

---

#### prettier {#mt-prettier}

- Syfte: formatera repo:t på plats.
- Användning: `make prettier`

#### prettier_check {#mt-prettier_check}

- Syfte: verifiera formatering (inga skrivningar).
- Användning: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Syfte: alias för `prettier`.
- Användning: `make prettier_write`

---

#### test {#mt-test}

- Syfte: kör Prettier (skriv), ESLint, sedan Vitest (täckning om installerad).
- Användning: `make test`

#### test_i18n {#mt-test_i18n}

- Syfte: i18n‑fokuserade tester för tilläggssträngar och webbplatsdokumentation.
- Användning: `make test_i18n`
- Kör: `npm run test:i18n` och `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Syfte: översätta tilläggets UI‑strängar från EN till andra locales.
- Användning: `make translation_app OPTS="--locales all|de,fr"`
- Noteringar: bevarar nyckelstruktur och platshållare; loggar till `translation_app.log`. Skriptform: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Syfte: översätta webbplatsdokument från `website/docs/*.md` till `website/i18n/<locale>/...`.
- Föredras: `translate_web_docs_batch` (OpenAI Batch API)
  - Användning (flaggor): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Äldre positionella argument accepteras fortfarande: `OPTS="<doc|all> <lang|all>"`
- Beteende: bygger JSONL, laddar upp, pollar var 30:e sekund, laddar ner resultat, skriver filer.
- Notera: ett batchjobb kan ta upp till 24 timmar att slutföra (enligt OpenAIs batchfönster). Konsolen visar förfluten tid vid varje poll.
- Miljö: `OPENAI_API_KEY` (krävs), valfritt `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standard 24h), `BATCH_POLL_INTERVAL_MS`.
- Äldre: `translate_web_docs_sync`
  - Användning (flaggor): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Äldre positionella argument accepteras fortfarande: `OPTS="<doc|all> <lang|all>"`
- Beteende: synkrona förfrågningar per par (ingen batch‑aggregering).
- Noteringar: Interaktiva uppmaningar när `OPTS` utelämnas. Båda lägen bevarar kodblock/inline‑kod och behåller front‑matter‑`id` oförändrad; loggar till `translation_web_batch.log` (batch) eller `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Syfte: översätta webbplatsens UI‑strängar (startsida, menyrad, sidfot) från `website/i18n/en/code.json` till alla locales under `website/i18n/<locale>/code.json` (exklusive `en`).
- Användning: `make translate_web_index` eller `make translate_web_index OPTS="--locales de,fr [--force]"`
- Krav: exportera `OPENAI_API_KEY` (valfritt: `OPENAI_MODEL=gpt-4o-mini`).
- Beteende: validerar JSON‑struktur, bevarar platshållare med måsvingar, behåller URL:er oförändrade och försöker igen med feedback vid valideringsfel.

---

#### web_build {#mt-web_build}

- Syfte: bygga dokumentationssajten till `website/build`.
- Användning: `make web_build OPTS="--locales en|de,en|all"` (eller sätt `BUILD_LOCALES="en de"`)
- Internt: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Beroenden: kör `npm ci` i `website/` endast om `website/node_modules/@docusaurus` saknas.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Syfte: offline‑säker länkkontroll.
- Användning: `make web_build_linkcheck OPTS="--locales en|all"`
- Noteringar: bygger till `tmp_linkcheck_web_pages`; skriver om GH Pages `baseUrl` till `/`; hoppar över fjärr‑HTTP(S)‑länkar.

#### web_build_local_preview {#mt-web_build_local_preview}

- Syfte: lokal gh‑pages‑förhandsgranskning med valfria tester/länkkontroll.
- Användning: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Beteende: försöker först med Node‑förhandsgranskningsserver (`scripts/preview-server.mjs`, stöder `/__stop`), faller tillbaka till `python3 -m http.server`; serverar på 8080–8090; PID vid `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Syfte: skicka `website/build` till grenen `gh-pages`.
- Användning: `make web_push_github`

Tips: sätt `NPM=…` för att åsidosätta paket­hanteraren som används av Makefile (standard är `npm`).
