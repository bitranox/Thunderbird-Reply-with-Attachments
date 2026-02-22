---
id: development
title: 'Udvikling'
sidebar_label: 'Udvikling'
---

---

## Udviklingsvejledning {#development-guide}

:::note Rediger kun engelsk; oversættelser forplanter sig
Opdater dokumentationen kun under `website/docs` (engelsk). Oversættelser under `website/i18n/<locale>/…` genereres og bør ikke redigeres manuelt. Brug oversættelsesopgaverne (f.eks. `make translate_web_docs_batch`) for at opdatere lokalt indhold.
:::

### Forudsætninger {#prerequisites}

- Node.js 22+ og npm (testet med Node 22)
- Thunderbird 128 ESR eller nyere (til manuel test)

---

### Projektstruktur (overordnet) {#project-layout-high-level}

- Rod: pakkescript `distribution_zip_packer.sh`, dokumentation, skærmbilleder
- `sources/`: hovedudvidelseskode (baggrund, indstillinger/popop-UI, manifester, ikoner)
- `tests/`: Vitest-suite
- `website/`: Docusaurus-dokumenter (med i18n under `website/i18n/de/...`)

---

### Installation og værktøjer {#install-and-tooling}

- Installer rodafhængigheder: `npm ci`
- Dokumentation (valgfrit): `cd website && npm ci`
- Find mål: `make help`

---

### Live-udvikling (web‑ext run) {#live-dev-web-ext}

- Hurtig sløjfe i Firefox Desktop (kun UI-smoketests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Kør i Thunderbird (foretrækkes til MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Tips:
- Hold Thunderbirds fejlkonsol åben (Værktøjer → Udviklerværktøjer → Fejlkonsol).
- MV3-hændelsessider suspenderes, når de er inaktive; genindlæs udvidelsen efter kodeændringer, eller lad web-ext genindlæse automatisk.
- Nogle Firefox‑specifikke adfærd afviger; verificer altid i Thunderbird for API‑paritet.
- Stier til Thunderbird-binær (eksempler):
- Linux: `thunderbird` (f.eks. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profilsisolering: Brug en separat Thunderbird‑profil til udvikling for at undgå at påvirke din daglige opsætning.

---

### Make‑mål (alfabetisk) {#make-targets-alphabetical}

Makefile standardiserer almindelige udviklingsforløb. Kør `make help` når som helst for en énlinjes oversigt over hvert mål.

Tip: at køre `make` uden mål åbner en simpel Whiptail‑menu til at vælge et mål.

| Mål                                                      | Énlinjes beskrivelse                                                                       |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Fjern lokale build/preview‑artefakter (tmp/, web-local-preview/, website/build/).          |
| [`commit`](#mt-commit)                                   | Formater, kør tests (inkl. i18n), opdater changelog, commit & push.                        |
| [`eslint`](#mt-eslint)                                   | Kør ESLint via flat config (`npm run -s lint:eslint`).                                     |
| [`help`](#mt-help)                                       | Vis alle mål med énlinjes docs (sorteret).                                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint på `sources/` (midlertidigt manifest; ignorerer ZIPs; ikke‑fatal).            |
| [`menu`](#mt-menu)                                       | Interaktiv menu til at vælge et mål og valgfrie argumenter.                                |
| [`pack`](#mt-pack)                                       | Byg ATN & LOCAL ZIPs (kører linter; kalder packerscript).                                  |
| [`prettier`](#mt-prettier)                               | Formater depotet på stedet (skriver ændringer).                                            |
| [`prettier_check`](#mt-prettier_check)                   | Prettier i check‑tilstand (ingen skrivning); fejler hvis der kræves omformatering.         |
| [`prettier_write`](#mt-prettier_write)                   | Alias for `prettier`.                                                                      |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, derefter Vitest (coverage hvis konfigureret).                    |
| [`test_i18n`](#mt-test_i18n)                             | Kun i18n‑tests: udvidelses‑pladsholdere/paritet + website‑paritet.                         |
| [`translate_app`](#mt-translation-app)                   | Alias for `translation_app`.                                                               |
| [`translation_app`](#mt-translation-app)                 | Oversæt app‑UI‑strenge fra `sources/_locales/en/messages.json`.                            |
| [`translate_web_docs_batch`](#mt-translation-web)        | Oversæt webstedets dokumenter via OpenAI Batch API (foretrækkes).                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Oversæt webstedets dokumenter synkront (legacy, ikke‑batch).                               |
| [`translate_web_index`](#mt-translation_web_index)       | Alias for `translation_web_index`.                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Oversæt UI for forside/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Byg dokumenter til `website/build` (understøtter `--locales` / `BUILD_LOCALES`).           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑sikker linkkontrol (springer eksterne HTTP[S] over).                               |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokal gh‑pages preview; autoserver på 8080–8090; valgfrie tests/link‑kontrol.              |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` til `gh-pages`‑branch.                                                |

Syntaks for valg

- Brug `make <command> OPTS="…"` til at videregive valgmuligheder (anførselstegn anbefales). Hvert mål nedenfor viser eksempelbrug.

--

-

#### Tips til locale‑build {#locale-build-tips}

- Byg en undergruppe af locales: sæt `BUILD_LOCALES="en de"` eller giv `OPTS="--locales en,de"` til web‑mål.
- Forhåndsvis en specifik locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Byg og pak {#build-and-package}

- Byg ZIPs: `make pack`
- Producerer ATN og LOCAL ZIPs i repoets rod (rediger ikke artefakter manuelt)
- Tip: opdater version i både `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json` før pakning
- Manuel installation (dev): Thunderbird → Værktøjer → Tilføjelser og temaer → tandhjul → Installer tilføjelse fra fil… → vælg den byggede ZIP

---

### Test {#test}

- Fuld suite: `make test` (Vitest)
- Dækning (valgfrit):
- `npm i -D @vitest/coverage-v8`
- Kør `make test`; åbn `coverage/index.html` for HTML‑rapport
- Kun i18n: `make test_i18n` (UI‑nøgler/pladsholdere/titler + websitedokumentparitet pr. locale med id/title/sidebar_label‑kontrol)

---

### Fejlfinding og logge {#debugging-and-logs}

- Fejlkonsol: Værktøjer → Udviklerværktøjer → Fejlkonsol
- Slå udførlige logs til/fra under kørsel:
- Aktiver: `messenger.storage.local.set({ debug: true })`
- Deaktiver: `messenger.storage.local.set({ debug: false })`
- Logge vises under skrivning/afsendelse af svar

---

### Dokumenter (websted) {#docs-website}

- Dev‑server: `cd website && npm run start`
- Byg statisk site: `cd website && npm run build`
- Make‑ækvivalenter (alfabetisk): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Brugseksempler:
- Kun EN, spring tests/link‑check over, ingen push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Alle locales, med tests/link‑check, derefter push: `make web_build_local_preview && make web_push_github`
- Før publicering, kør den offline‑sikre linkkontrol: `make web_build_linkcheck`.
- i18n: Engelsk ligger i `website/docs/*.md`; tyske oversættelser i `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Søgning: Hvis Algolia DocSearch‑miljøvariabler er sat i CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), bruger sitet Algolia‑søgning; ellers falder det tilbage til lokal søgning. På forsiden, tryk `/` eller `Ctrl+K` for at åbne søgeboksen.

---

#### Donér‑omdirigeringsrute {#donate-redirect}

- `website/src/pages/donate.js`
- Rute: `/donate` (og `/<locale>/donate`)
- Adfærd:
- Hvis den aktuelle rute har en locale (f.eks. `/de/donate`), brug den
- Ellers vælges det bedste match fra `navigator.languages` mod konfigurerede locales; falder tilbage til standard‑locale
- Omdirigerer til:
- `en` → `/docs/donation`
- andre → `/<locale>/docs/donation`
- Bruger `useBaseUrl` for korrekt håndtering af baseUrl
- Inkluderer meta‑refresh + `noscript`‑link som fallback

---

---

#### Forhåndsvisningstips {#preview-tips}

- Stop Node‑preview pænt: åbn `http://localhost:<port>/__stop` (udskrives efter `Local server started`).
- Hvis billeder ikke indlæses i MDX/JSX, brug `useBaseUrl('/img/...')` for at respektere sitets `baseUrl`.
- Forhåndsvisningen starter først; linkkontrollen kører bagefter og er ikke‑blokerende (brudte eksterne links stopper ikke forhåndsvisningen).
- Eksempel på preview‑URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (udskrives efter “Local server started”).
- Eksterne links i link‑check: Nogle eksterne sider (fx addons.thunderbird.net) blokerer automatiske crawlere og kan vise 403 i linkkontroller. Forhåndsvisningen starter stadig; disse kan ignoreres sikkert.

---

#### Oversæt webstedet {#translate-website}

Hvad du kan oversætte

- Kun webstedets UI: forside, navigationslinje, sidefod og andre UI‑strenge. Indholdet i dokumenterne forbliver kun på engelsk for nu.

Hvor skal du redigere

- Rediger `website/i18n/<locale>/code.json` (brug `en` som reference). Behold pladsholdere som `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` uændrede.

Generer eller opdater filer

- Opret manglende stubfiler for alle locales: `npm --prefix website run i18n:stubs`
- Overskriv stubfiler fra engelsk (efter tilføjelse af nye strenge): `npm --prefix website run i18n:stubs:force`
- Alternativ for én locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Oversæt UI‑strenge for forside/navbar/footer (OpenAI)

- Angiv legitimationsoplysninger én gang (shell eller .env):
- `export OPENAI_API_KEY=sk-...`
- Valgfrit: `export OPENAI_MODEL=gpt-4o-mini`
- Éngang (alle locales, spring en over): `make translate_web_index`
- Begræns til specifikke locales: `make translate_web_index OPTS="--locales de,fr"`
- Overskriv eksisterende værdier: `make translate_web_index OPTS="--force"`

Validering og gentagelser

- Oversættelsesscriptet validerer JSON‑strukturen, bevarer pladsholdere med krøllede klammer og sikrer, at URL'er er uændrede.
- Ved valideringsfejl forsøges igen med feedback op til 2 gange, før de eksisterende værdier bevares.

Forhåndsvis din locale

- Dev‑server: `npm --prefix website run start`
- Besøg `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Indsendelse

- Åbn en PR med de redigerede `code.json`‑fil(er). Hold ændringer fokuserede, og inkluder et hurtigt skærmbillede, når det er muligt.

---

### Sikkerheds‑ og konfigurationstips {#security-and-configuration-tips}

- Commit ikke `sources/manifest.json` (oprettes midlertidigt af buildet)
- Hold `browser_specific_settings.gecko.id` stabil for at bevare opdateringskanalen

---

### Indstillingernes persistens {#settings-persistence}

- Lager: Alle brugerindstillinger ligger i `storage.local` og bevares på tværs af opdateringer af udvidelsen.
- Installation: Standardværdier anvendes kun, når en nøgle strengt taget mangler (undefined).
- Opdatering: En migration udfylder kun manglende nøgler; eksisterende værdier overskrives aldrig.
- Skemamarkør: `settingsVersion` (aktuelt `1`).
- Nøgler og standarder:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kode: se `sources/background.js` → `initializeOrMigrateSettings()` og `SCHEMA_VERSION`.

Udviklingsworkflow (tilføjelse af en ny indstilling)

- Hæv `SCHEMA_VERSION` i `sources/background.js`.
- Tilføj den nye nøgle + standard til `DEFAULTS`‑objektet i `initializeOrMigrateSettings()`.
- Brug reglen "only‑if‑undefined", når standarder sås; overskriv ikke eksisterende værdier.
- Hvis indstillingen er synlig for brugeren, tilslut den i `sources/options.js` og tilføj lokaliserede strenge.
- Tilføj/juster tests (se `tests/background.settings.migration.test.js`).

Tips til manuel test

- Simulér en frisk installation: ryd udvidelsens datamappe eller start med en ny profil.
- Simulér en opdatering: sæt `settingsVersion` til `0` i `storage.local` og genindlæs; bekræft at eksisterende værdier forbliver uændrede, og at kun manglende nøgler tilføjes.

---

### Fejlfinding {#troubleshooting}

- Sørg for, at Thunderbird er 128 ESR eller nyere
- Brug fejlkonsollen til runtime‑problemer
- Hvis gemte indstillinger tilsyneladende ikke anvendes korrekt, genstart Thunderbird og prøv igen. (Thunderbird kan cache tilstand på tværs af sessioner; en genstart sikrer, at friske indstillinger indlæses.)

---

### CI og dækning {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) kører vitest med dækningsgrænser (85% linjer/funktioner/grene/udsagn). Hvis grænserne ikke opfyldes, fejler jobbet.
- Workflowet uploader et artefakt `coverage-html` med HTML‑rapporten; download det fra kørselssiden (Actions → seneste kørsel → Artifacts).

---

### Bidrag {#contributing}

- Se CONTRIBUTING.md for retningslinjer for branch/commit/PR
- Tip: Opret en separat Thunderbird‑udviklingsprofil til test for at undgå at påvirke din daglige profil.

---

### Oversættelser

- At køre store “alle → alle” oversættelsesjob kan være langsomt og dyrt. Start med en undergruppe (fx nogle få dokumenter og 1–2 locales), gennemgå resultatet, og udvid derefter.

---

- Genforsøgspolitik: oversættelsesjob udfører op til 3 genforsøg med eksponentiel backoff ved API‑fejl; se `scripts/translate_web_docs_batch.js` og `scripts/translate_web_docs_sync.js`.

Skærmbilleder til dokumenter

- Gem billeder under `website/static/img/`.
- Referér til dem i MD/MDX via `useBaseUrl('/img/<filename>')`, så stier virker med sitets `baseUrl`.
- Efter tilføjelse eller omdøbning af billeder under `website/static/img/`, bekræft at alle referencer stadig bruger `useBaseUrl('/img/…')` og gengives i en lokal forhåndsvisning.
  Favikoner

- Den fler‑størrelses `favicon.ico` genereres automatisk i alle build‑stier (Make + scripts) via `website/scripts/build-favicon.mjs`.
- Ingen manuelle trin kræves; det er nok at opdatere `icon-*.png`.
  Gennemgangstip

- Behold front‑matter‑`id` uændret i oversatte dokumenter; oversæt kun `title` og `sidebar_label`, når de er til stede.

#### clean {#mt-clean}

- Formål: fjern lokale build/preview‑artefakter.
- Brug: `make clean`
- Fjerner (hvis til stede):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Formål: formater, test, opdater changelog, commit og push.
- Brug: `make commit`
- Detaljer: kører Prettier (write), `make test`, `make test_i18n`; tilføjer changelog, når der er staged diffs; pusher til `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Formål: kør ESLint via flat config.
- Brug: `make eslint`

---

#### help {#mt-help}

- Formål: list alle mål med énlinjes docs.
- Brug: `make help`

---

#### lint {#mt-lint}

- Formål: lint MailExtension ved hjælp af `web-ext`.
- Brug: `make lint`
- Noter: kopierer midlertidigt `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorerer byggede ZIPs; advarsler får ikke pipelinen til at fejle.

---

#### menu {#mt-menu}

- Formål: interaktiv menu til at vælge et Make‑mål og valgfrie argumenter.
- Brug: kør `make` uden argumenter.
- Noter: hvis `whiptail` ikke er tilgængelig, falder menuen tilbage til `make help`.

---

#### pack {#mt-pack}

- Formål: byg ATN og LOCAL ZIPs (afhænger af `lint`).
- Brug: `make pack`
- Tip: hæv versioner i begge `sources/manifest_*.json` før pakning.

---

#### prettier {#mt-prettier}

- Formål: formater repoet på stedet.
- Brug: `make prettier`

#### prettier_check {#mt-prettier_check}

- Formål: verificer formatering (ingen skrivning).
- Brug: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Formål: alias for `prettier`.
- Brug: `make prettier_write`

---

#### test {#mt-test}

- Formål: kør Prettier (write), ESLint og derefter Vitest (coverage hvis installeret).
- Brug: `make test`

#### test_i18n {#mt-test_i18n}

- Formål: i18n‑fokuserede tests for udvidelsesstrenge og webstedsdokumenter.
- Brug: `make test_i18n`
- Kører: `npm run test:i18n` og `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Formål: oversæt udvidelsens UI‑strenge fra EN til andre locales.
- Brug: `make translation_app OPTS="--locales all|de,fr"`
- Noter: bevarer nøglestruktur og pladsholdere; logger til `translation_app.log`. Scriptform: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Formål: oversæt webstedsdokumenter fra `website/docs/*.md` til `website/i18n/<locale>/...`.
- Foretrukket: `translate_web_docs_batch` (OpenAI Batch API)
  - Brug (flag): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ældre positionsargument accepteres stadig: `OPTS="<doc|all> <lang|all>"`
- Adfærd: bygger JSONL, uploader, poller hver 30s, downloader resultater, skriver filer.
- Bemærk: et batchjob kan tage op til 24 timer at fuldføre (ifølge OpenAIs batchvindue). Konsollen viser forløbet tid ved hver polling.
- Miljø: `OPENAI_API_KEY` (påkrævet), valgfrit `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (standard 24t), `BATCH_POLL_INTERVAL_MS`.
- Ældre: `translate_web_docs_sync`
  - Brug (flag): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ældre positionsargument accepteres stadig: `OPTS="<doc|all> <lang|all>"`
- Adfærd: synkrone forespørgsler pr. par (ingen batchaggregering).
- Noter: Interaktive prompt, når `OPTS` udelades. Begge tilstande bevarer kodeblokke/inline‑kode og holder front‑matter‑`id` uændret; logger til `translation_web_batch.log` (batch) eller `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Formål: oversæt webstedets UI‑strenge (forside, navigationslinje, sidefod) fra `website/i18n/en/code.json` til alle locales under `website/i18n/<locale>/code.json` (ekskl. `en`).
- Brug: `make translate_web_index` eller `make translate_web_index OPTS="--locales de,fr [--force]"`
- Krav: eksportér `OPENAI_API_KEY` (valgfrit: `OPENAI_MODEL=gpt-4o-mini`).
- Adfærd: validerer JSON‑struktur, bevarer pladsholdere med krøllede klammer, holder URL'er uændrede og prøver igen med feedback ved valideringsfejl.

---

#### web_build {#mt-web_build}

- Formål: byg dokumentsitet til `website/build`.
- Brug: `make web_build OPTS="--locales en|de,en|all"` (eller sæt `BUILD_LOCALES="en de"`)
- Internt: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Afhængigheder: kører `npm ci` i `website/` kun hvis `website/node_modules/@docusaurus` mangler.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Formål: offline‑sikker linkkontrol.
- Brug: `make web_build_linkcheck OPTS="--locales en|all"`
- Noter: bygger til `tmp_linkcheck_web_pages`; omskriver GH Pages `baseUrl` til `/`; springer eksterne HTTP(S)‑links over.

#### web_build_local_preview {#mt-web_build_local_preview}

- Formål: lokal gh‑pages‑preview med valgfrie tests/link‑kontrol.
- Brug: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Adfærd: forsøger først Node‑previewserver (`scripts/preview-server.mjs`, understøtter `/__stop`), falder tilbage til `python3 -m http.server`; serverer på 8080–8090; PID ved `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Formål: push `website/build` til `gh-pages`‑branch.
- Brug: `make web_push_github`

Tip: sæt `NPM=…` for at tilsidesætte den pakkehåndtering, Makefile bruger (standard `npm`).

---
