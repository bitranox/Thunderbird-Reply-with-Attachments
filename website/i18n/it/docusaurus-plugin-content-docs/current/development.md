---
id: development
title: 'Sviluppo'
sidebar_label: 'Sviluppo'
---

---

## Guida allo sviluppo {#development-guide}

:::note Modifica solo l’inglese; le traduzioni si propagano
Aggiorna la documentazione **solo** sotto `website/docs` (inglese). Le traduzioni sotto `website/i18n/<locale>/…` sono generate e non dovrebbero essere modificate manualmente. Usa le attività di traduzione (ad es., `make translate_web_docs_batch`) per aggiornare i contenuti localizzati.
:::

### Prerequisiti {#prerequisites}

- Node.js 22+ e npm (testato con Node 22)
- Thunderbird 128 ESR o superiore (per test manuali)

---

### Struttura del progetto (alto livello) {#project-layout-high-level}

- Radice: script di packaging `distribution_zip_packer.sh`, documentazione, screenshot
- `sources/`: codice principale dell’add-on (background, UI opzioni/popup, manifest, icone)
- `tests/`: suite Vitest
- `website/`: documentazione Docusaurus (con i18n sotto `website/i18n/de/...`)

---

### Installazione e strumenti {#install-and-tooling}

- Installa dipendenze nella root: `npm ci`
- Documentazione (opzionale): `cd website && npm ci`
- Elenca i target: `make help`

---

### Sviluppo live (web‑ext run) {#live-dev-web-ext}

- Ciclo rapido in Firefox Desktop (solo smoke test dell’interfaccia):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Esegui in Thunderbird (preferibile per MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Suggerimenti:
- Tieni aperta la Console degli errori di Thunderbird (Strumenti → Strumenti di sviluppo → Console degli errori).
- Le pagine evento MV3 vengono sospese quando inattive; ricarica il componente aggiuntivo dopo le modifiche al codice oppure lascia che web‑ext ricarichi automaticamente.
- Alcuni comportamenti esclusivi di Firefox differiscono; verifica sempre in Thunderbird per garantire la parità delle API.
- Percorsi dei binari di Thunderbird (esempi):
- Linux: `thunderbird` (ad es., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Isolamento del profilo: usa un profilo Thunderbird separato per lo sviluppo per evitare di influenzare la configurazione quotidiana.

---

### Target Make (alfabetico) {#make-targets-alphabetical}

Il Makefile standardizza i flussi di sviluppo comuni. Esegui `make help` in qualsiasi momento per un riepilogo in una riga di ogni target.

Suggerimento: eseguire `make` senza target apre un semplice menu Whiptail per scegliere un target.

| Target                                                   | Descrizione in una riga                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Rimuove gli artefatti di build/preview locali (tmp/, web-local-preview/, website/build/).  |
| [`commit`](#mt-commit)                                   | Format, esegue i test (incl. i18n), aggiorna il changelog, effettua commit e push.         |
| [`eslint`](#mt-eslint)                                   | Esegue ESLint tramite flat config (`npm run -s lint:eslint`).                              |
| [`help`](#mt-help)                                       | Elenca tutti i target con documentazione in una riga (ordinati).                           |
| [`lint`](#mt-lint)                                       | web‑ext lint su `sources/` (manifest temporaneo; ignora gli ZIP; non fatale).              |
| [`menu`](#mt-menu)                                       | Menu interattivo per selezionare un target e argomenti opzionali.                          |
| [`pack`](#mt-pack)                                       | Crea ZIP ATN e LOCAL (esegue il linter; chiama lo script di packaging).                    |
| [`prettier`](#mt-prettier)                               | Formatta il repository in place (scrive le modifiche).                                     |
| [`prettier_check`](#mt-prettier_check)                   | Prettier in modalità check (non scrive); fallisce se è necessaria la riformattazione.      |
| [`prettier_write`](#mt-prettier_write)                   | Alias di `prettier`.                                                                       |
| [`test`](#mt-test)                                       | Prettier (scrive), ESLint, poi Vitest (coverage se configurato).                           |
| [`test_i18n`](#mt-test_i18n)                             | Test solo i18n: placeholder/parità dell’add-on + parità del sito.                          |
| [`translate_app`](#mt-translation-app)                   | Alias di `translation_app`.                                                                |
| [`translation_app`](#mt-translation-app)                 | Traduci le stringhe UI dell’app da `sources/_locales/en/messages.json`.                    |
| [`translate_web_docs_batch`](#mt-translation-web)        | Traduci la documentazione del sito via OpenAI Batch API (preferito).                       |
| [`translate_web_docs_sync`](#mt-translation-web)         | Traduci la documentazione del sito in modo sincrono (legacy, non-batch).                   |
| [`translate_web_index`](#mt-translation_web_index)       | Alias di `translation_web_index`.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Traduci UI di homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Compila la documentazione in `website/build` (supporta `--locales` / `BUILD_LOCALES`).     |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Controllo link sicuro offline (salta HTTP[S] remoti).                                      |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Anteprima locale gh‑pages; auto‑servizio su 8080–8090; test/link‑check opzionali.          |
| [`web_push_github`](#mt-web_push_github)                 | Push di `website/build` al branch `gh-pages`.                                              |

Sintassi per le opzioni

- Usa `make <command> OPTS="…"` per passare opzioni (virgolette consigliate). Ogni target sotto mostra un esempio di utilizzo.

--

-

#### Suggerimenti per build per locale {#locale-build-tips}

- Compila un sottoinsieme di lingue: imposta `BUILD_LOCALES="en de"` o passa `OPTS="--locales en,de"` ai target web.
- Anteprima di una lingua specifica: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Compilazione e packaging {#build-and-package}

- Crea ZIP: `make pack`
- Produce ZIP ATN e LOCAL nella root del repository (non modificare gli artefatti a mano)
- Suggerimento: aggiorna la versione sia in `sources/manifest_ATN.json` che in `sources/manifest_LOCAL.json` prima del packaging
- Installazione manuale (dev): Thunderbird → Strumenti → Componenti aggiuntivi e temi → ingranaggio → Installa componente aggiuntivo da file… → seleziona lo ZIP generato

---

### Test {#test}

- Suite completa: `make test` (Vitest)
- Copertura (opzionale):
- `npm i -D @vitest/coverage-v8`
- Esegui `make test`; apri `coverage/index.html` per il report HTML
- Solo i18n: `make test_i18n` (chiavi/placeholder/titoli dell’interfaccia + parità sito per‑lingua per‑documento con controlli su id/title/sidebar_label)

---

### Debug e log {#debugging-and-logs}

- Console degli errori: Strumenti → Strumenti di sviluppo → Console degli errori
- Attiva/disattiva log verbosi a runtime:
- Abilita: `messenger.storage.local.set({ debug: true })`
- Disabilita: `messenger.storage.local.set({ debug: false })`
- I log compaiono durante la composizione/l’invio delle risposte

---

### Documentazione (sito web) {#docs-website}

- Server di sviluppo: `cd website && npm run start`
- Build del sito statico: `cd website && npm run build`
- Equivalenti Make (alfabetico): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Esempi d’uso:
- Solo EN, salta test/link‑check, nessun push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Tutte le lingue, con test/link‑check, poi push: `make web_build_local_preview && make web_push_github`
- Prima della pubblicazione, esegui il controllo link sicuro offline: `make web_build_linkcheck`.
- i18n: l’inglese vive in `website/docs/*.md`; le traduzioni tedesche in `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Ricerca: se le variabili di ambiente Algolia DocSearch sono impostate in CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), il sito usa la ricerca Algolia; altrimenti ricade sulla ricerca locale. Nella homepage, premi `/` o `Ctrl+K` per aprire la casella di ricerca.

---

#### Percorso di reindirizzamento donazioni {#donate-redirect}

- `website/src/pages/donate.js`
- Percorso: `/donate` (e `/<locale>/donate`)
- Comportamento:
- Se il percorso corrente ha una lingua (es., `/de/donate`), usala
- Altrimenti, scegli la corrispondenza migliore tra `navigator.languages` e le lingue configurate; in caso contrario usa la lingua predefinita
- Reindirizza a:
- `en` → `/docs/donation`
- altri → `/<locale>/docs/donation`
- Usa `useBaseUrl` per una corretta gestione di baseUrl
- Include meta refresh + link `noscript` come fallback

---

---

#### Suggerimenti per l’anteprima {#preview-tips}

- Arresta correttamente l’anteprima Node: apri `http://localhost:<port>/__stop` (stampato dopo `Local server started`).
- Se le immagini non si caricano in MDX/JSX, usa `useBaseUrl('/img/...')` per rispettare il `baseUrl` del sito.
- L’anteprima parte per prima; il controllo link viene eseguito dopo ed è non bloccante (link esterni rotti non fermeranno l’anteprima).
- URL di anteprima di esempio: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (stampato dopo “Local server started”).
- Link esterni nel controllo link: alcuni siti esterni (es., addons.thunderbird.net) bloccano i crawler automatici e possono mostrare 403 nel controllo link. L’anteprima parte comunque; questi si possono ignorare in sicurezza.

---

#### Traduci il sito web {#translate-website}

Cosa puoi tradurre

- Solo l’interfaccia del sito: home page, barra di navigazione, footer e altre stringhe dell’interfaccia. I contenuti della documentazione restano solo in inglese per ora.

Dove modificare

- Modifica `website/i18n/<locale>/code.json` (usa `en` come riferimento). Mantieni invariati i placeholder come `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Genera o aggiorna i file

- Crea gli stub mancanti per tutte le lingue: `npm --prefix website run i18n:stubs`
- Sovrascrivi gli stub dall’inglese (dopo aver aggiunto nuove stringhe): `npm --prefix website run i18n:stubs:force`
- Alternativa per una singola lingua: `npx --prefix website docusaurus write-translations --locale <locale>`

Traduci le stringhe dell’interfaccia di homepage/navbar/footer (OpenAI)

- Imposta le credenziali una volta (shell o .env):
- `export OPENAI_API_KEY=sk-...`
- Opzionale: `export OPENAI_MODEL=gpt-4o-mini`
- Operazione singola (tutte le lingue, escludi en): `make translate_web_index`
- Limita a lingue specifiche: `make translate_web_index OPTS="--locales de,fr"`
- Sovrascrivi i valori esistenti: `make translate_web_index OPTS="--force"`

Convalida e nuovi tentativi

- Lo script di traduzione convalida la forma JSON, preserva i placeholder tra parentesi graffe e garantisce che gli URL rimangano invariati.
- In caso di errore di convalida, riprova con feedback fino a 2 volte prima di mantenere i valori esistenti.

Visualizza in anteprima la tua lingua

- Server di sviluppo: `npm --prefix website run start`
- Visita `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Invio

- Apri una PR con i file `code.json` modificati. Mantieni le modifiche focalizzate e includi uno screenshot rapido quando possibile.

---

### Suggerimenti su sicurezza e configurazione {#security-and-configuration-tips}

- Non fare commit di `sources/manifest.json` (creato temporaneamente dalla build)
- Mantieni `browser_specific_settings.gecko.id` stabile per preservare il canale di aggiornamento

---

### Persistenza delle impostazioni {#settings-persistence}

- Archiviazione: tutte le impostazioni utente risiedono in `storage.local` e persistono tra gli aggiornamenti del componente aggiuntivo.
- Installazione: i valori predefiniti vengono applicati solo quando una chiave manca strettamente (undefined).
- Aggiornamento: una migrazione compila solo le chiavi mancanti; i valori esistenti non vengono mai sovrascritti.
- Indicatore di schema: `settingsVersion` (attualmente `1`).
- Chiavi e valori predefiniti:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Codice: vedi `sources/background.js` → `initializeOrMigrateSettings()` e `SCHEMA_VERSION`.

Flusso di lavoro di sviluppo (aggiungere una nuova impostazione)

- Incrementa `SCHEMA_VERSION` in `sources/background.js`.
- Aggiungi la nuova chiave + default all’oggetto `DEFAULTS` in `initializeOrMigrateSettings()`.
- Usa la regola "only-if-undefined" quando imposti i valori predefiniti; non sovrascrivere i valori esistenti.
- Se l’impostazione è visibile all’utente, collegala in `sources/options.js` e aggiungi le stringhe localizzate.
- Aggiungi/regola i test (vedi `tests/background.settings.migration.test.js`).

Suggerimenti per test manuali

- Simula una nuova installazione: cancella la directory dati dell’estensione o avvia con un nuovo profilo.
- Simula un aggiornamento: imposta `settingsVersion` a `0` in `storage.local` e ricarica; conferma che i valori esistenti rimangano invariati e che vengano aggiunte solo le chiavi mancanti.

---

### Risoluzione dei problemi {#troubleshooting}

- Assicurati che Thunderbird sia 128 ESR o più recente
- Usa la Console degli errori per problemi a runtime
- Se le impostazioni memorizzate sembrano non applicarsi correttamente, riavvia Thunderbird e riprova. (Thunderbird può mettere in cache lo stato tra le sessioni; un riavvio garantisce il caricamento di impostazioni aggiornate.)

---

### CI e copertura {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) esegue vitest con soglie di copertura (85% linee/funzioni/rami/istruzioni). Se le soglie non sono rispettate, il job fallisce.
- Il workflow carica un artifact `coverage-html` con il report HTML; scaricalo dalla pagina dell’esecuzione (Actions → ultima esecuzione → Artifacts).

---

### Collaborare {#contributing}

- Vedi CONTRIBUTING.md per le linee guida su branch/commit/PR
- Suggerimento: crea un profilo di sviluppo Thunderbird separato per i test per evitare di influenzare il profilo quotidiano.

---

### Traduzioni

- Eseguire grandi lavori di traduzione “tutto → tutto” può essere lento e costoso. Inizia con un sottoinsieme (ad es., pochi documenti e 1–2 lingue), rivedi il risultato, poi amplia.

---

- Criteri di retry: i job di traduzione eseguono fino a 3 nuovi tentativi con backoff esponenziale in caso di errori API; vedi `scripts/translate_web_docs_batch.js` e `scripts/translate_web_docs_sync.js`.

Screenshot per la documentazione

- Archivia le immagini sotto `website/static/img/`.
- Riferiscile in MD/MDX tramite `useBaseUrl('/img/<filename>')` così i percorsi funzionano con il `baseUrl` del sito.
- Dopo aver aggiunto o rinominato immagini sotto `website/static/img/`, conferma che tutti i riferimenti usino ancora `useBaseUrl('/img/…')` e che vengano renderizzati in un’anteprima locale.
  Favicon

- Il `favicon.ico` multi‑dimensione è generato automaticamente in tutti i percorsi di build (Make + script) tramite `website/scripts/build-favicon.mjs`.
- Non è richiesto alcun passaggio manuale; è sufficiente aggiornare `icon-*.png`.
  Suggerimento per la revisione

- Mantieni invariato il front‑matter `id` nei documenti tradotti; traduci solo `title` e `sidebar_label` quando presenti.

#### clean {#mt-clean}

- Scopo: rimuovere gli artefatti di build/preview locali.
- Utilizzo: `make clean`
- Rimuove (se presenti):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Scopo: formattare, testare, aggiornare il changelog, effettuare commit e push.
- Utilizzo: `make commit`
- Dettagli: esegue Prettier (scrive), `make test`, `make test_i18n`; aggiunge il changelog quando ci sono diff in stage; fa push su `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Scopo: eseguire ESLint tramite flat config.
- Utilizzo: `make eslint`

---

#### help {#mt-help}

- Scopo: elencare tutti i target con documentazione in una riga.
- Utilizzo: `make help`

---

#### lint {#mt-lint}

- Scopo: lint del MailExtension usando `web-ext`.
- Utilizzo: `make lint`
- Note: copia temporaneamente `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignora gli ZIP generati; gli avvisi non fanno fallire la pipeline.

---

#### menu {#mt-menu}

- Scopo: menu interattivo per selezionare un target Make e argomenti opzionali.
- Utilizzo: esegui `make` senza argomenti.
- Note: se `whiptail` non è disponibile, il menu ricade su `make help`.

---

#### pack {#mt-pack}

- Scopo: creare ZIP ATN e LOCAL (dipende da `lint`).
- Utilizzo: `make pack`
- Suggerimento: incrementa le versioni in entrambi `sources/manifest_*.json` prima del packaging.

---

#### prettier {#mt-prettier}

- Scopo: formattare il repository in place.
- Utilizzo: `make prettier`

#### prettier_check {#mt-prettier_check}

- Scopo: verificare la formattazione (non scrive).
- Utilizzo: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Scopo: alias di `prettier`.
- Utilizzo: `make prettier_write`

---

#### test {#mt-test}

- Scopo: eseguire Prettier (scrive), ESLint, poi Vitest (coverage se installato).
- Utilizzo: `make test`

#### test_i18n {#mt-test_i18n}

- Scopo: test focalizzati su i18n per stringhe dell’add‑on e documentazione del sito.
- Utilizzo: `make test_i18n`
- Esegue: `npm run test:i18n` e `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Scopo: tradurre le stringhe UI dell’add‑on da EN ad altre lingue.
- Utilizzo: `make translation_app OPTS="--locales all|de,fr"`
- Note: preserva la struttura delle chiavi e i placeholder; log in `translation_app.log`. Forma script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Scopo: tradurre la documentazione del sito da `website/docs/*.md` in `website/i18n/<locale>/...`.
- Preferito: `translate_web_docs_batch` (OpenAI Batch API)
  - Utilizzo (flag): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - La modalità posizionale legacy è ancora accettata: `OPTS="<doc|all> <lang|all>"`
- Comportamento: crea JSONL, carica, effettua polling ogni 30s, scarica i risultati, scrive i file.
- Nota: un job batch può richiedere fino a 24 ore per completarsi (finestra batch di OpenAI). La console mostra il tempo trascorso a ogni polling.
- Env: `OPENAI_API_KEY` (obbligatorio), opzionali `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Utilizzo (flag): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - La modalità posizionale legacy è ancora accettata: `OPTS="<doc|all> <lang|all>"`
- Comportamento: richieste sincrone per coppia (nessuna aggregazione batch).
- Note: prompt interattivi quando `OPTS` è omesso. Entrambe le modalità preservano i blocchi/inline di codice e mantengono invariato il front‑matter `id`; log in `translation_web_batch.log` (batch) o `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Scopo: tradurre le stringhe UI del sito (homepage, navbar, footer) da `website/i18n/en/code.json` a tutte le lingue sotto `website/i18n/<locale>/code.json` (escludendo `en`).
- Utilizzo: `make translate_web_index` o `make translate_web_index OPTS="--locales de,fr [--force]"`
- Requisiti: esporta `OPENAI_API_KEY` (opzionale: `OPENAI_MODEL=gpt-4o-mini`).
- Comportamento: convalida la struttura JSON, preserva i placeholder tra parentesi graffe, mantiene invariati gli URL e riprova con feedback in caso di errori di convalida.

---

#### web_build {#mt-web_build}

- Scopo: creare il sito della documentazione in `website/build`.
- Utilizzo: `make web_build OPTS="--locales en|de,en|all"` (oppure imposta `BUILD_LOCALES="en de"`)
- Interni: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dipendenze: esegue `npm ci` in `website/` solo se `website/node_modules/@docusaurus` è mancante.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Scopo: controllo link sicuro offline.
- Utilizzo: `make web_build_linkcheck OPTS="--locales en|all"`
- Note: compila in `tmp_linkcheck_web_pages`; riscrive GH Pages `baseUrl` in `/`; salta i link HTTP(S) remoti.

#### web_build_local_preview {#mt-web_build_local_preview}

- Scopo: anteprima locale gh‑pages con test/link‑check opzionali.
- Utilizzo: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Comportamento: prova prima il server di anteprima Node (`scripts/preview-server.mjs`, supporta `/__stop`), ricade su `python3 -m http.server`; serve su 8080–8090; PID in `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Scopo: push di `website/build` al branch `gh-pages`.
- Utilizzo: `make web_push_github`

Suggerimento: imposta `NPM=…` per sovrascrivere il gestore pacchetti usato dal Makefile (predefinito `npm`).

---
