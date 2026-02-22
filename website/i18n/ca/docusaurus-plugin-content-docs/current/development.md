---
id: development
title: 'Desenvolupament'
sidebar_label: 'Desenvolupament'
---

---

## Guia de desenvolupament {#development-guide}

:::note Edita només l'anglès; les traduccions es propaguen
Actualitza la documentació **només** a `website/docs` (anglès). Les traduccions a `website/i18n/<locale>/…` es generen i no s'han d'editar manualment. Utilitza les tasques de traducció (p. ex., `make translate_web_docs_batch`) per actualitzar el contingut localitzat.
:::

### Prerequisits {#prerequisites}

- Node.js 22+ i npm (provat amb Node 22)
- Thunderbird 128 ESR o més nou (per a proves manuals)

---

### Disposició del projecte (d'alt nivell) {#project-layout-high-level}

- Arrel: script d'empaquetat `distribution_zip_packer.sh`, docs, captures de pantalla
- `sources/`: codi principal del complement (background, UI d'opcions/emergent, manifests, icones)
- `tests/`: conjunt de proves de Vitest
- `website/`: documents de Docusaurus (amb i18n sota `website/i18n/de/...`)

---

### Instal·lació i eines {#install-and-tooling}

- Instal·la les dependències de l'arrel: `npm ci`
- Docs (opcional): `cd website && npm ci`
- Descobreix objectius: `make help`

---

### Desenvolupament en viu (web‑ext run) {#live-dev-web-ext}

- Cicle ràpid a Firefox d’escriptori (només proves de fum de la UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Executa a Thunderbird (preferit per a MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Consells:
- Mantén oberta la Consola d'errors de Thunderbird (Eines → Eines per a desenvolupadors → Consola d'errors).
- Les pàgines d'esdeveniments MV3 se suspenen quan estan inactives; recarrega el complement després dels canvis de codi o deixa que web‑ext el recarregui automàticament.
- Algunes conductes només de Firefox difereixen; verifica sempre a Thunderbird per paritat d'API.
- Camins del binari de Thunderbird (exemples):
- Linux: `thunderbird` (p. ex., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Aïllament del perfil: usa un perfil de Thunderbird separat per al desenvolupament per evitar afectar la teva configuració diària.

---

### Objectius de Make (alfabètic) {#make-targets-alphabetical}

El Makefile estandarditza fluxos de desenvolupament habituals. Executa `make help` en qualsevol moment per obtenir un resum d'una línia de cada objectiu.

Consell: executar `make` sense objectiu obre un menú senzill de Whiptail per triar un objectiu.

| Objectiu                                                 | Descripció d'una línia                                                                                                    |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Elimina artefactes locals de build/previsualització (tmp/, web-local-preview/, website/build/).                           |
| [`commit`](#mt-commit)                                   | Formata, executa proves (incl. i18n), actualitza el registre de canvis, fa commit i push.                                 |
| [`eslint`](#mt-eslint)                                   | Executa ESLint amb la configuració plana (`npm run -s lint:eslint`).                                                      |
| [`help`](#mt-help)                                       | Llista tots els objectius amb documentació d'una línia (ordenats).                                                        |
| [`lint`](#mt-lint)                                       | web‑ext lint sobre `sources/` (manifest temporal; ignora ZIPs; no fatal).                                                 |
| [`menu`](#mt-menu)                                       | Menú interactiu per seleccionar un objectiu i arguments opcionals.                                                        |
| [`pack`](#mt-pack)                                       | Construeix ZIPs ATN i LOCAL (executa el linter; crida l'script d'empaquetat).                                             |
| [`prettier`](#mt-prettier)                               | Dóna format al repositori in situ (escriu canvis).                                                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier en mode de comprovació (sense escriure); falla si cal reformatar.                                                |
| [`prettier_write`](#mt-prettier_write)                   | Àlies de `prettier`.                                                                                                      |
| [`test`](#mt-test)                                       | Prettier (escriptura), ESLint i després Vitest (cobertura si està configurat).                                            |
| [`test_i18n`](#mt-test_i18n)                             | Proves només d'i18n: placeholders/paritat del complement + paritat del lloc web.                                          |
| [`translate_app`](#mt-translation-app)                   | Àlies de `translation_app`.                                                                                               |
| [`translation_app`](#mt-translation-app)                 | Tradueix les cadenes de la interfície de l'aplicació des de `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tradueix la documentació del web via l'API Batch d'OpenAI (preferit).                                                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tradueix la documentació del web de manera síncrona (heretat, sense batch).                                               |
| [`translate_web_index`](#mt-translation_web_index)       | Àlies de `translation_web_index`.                                                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Tradueix la UI de la portada/la barra de navegació/el peu de pàgina (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Construeix la documentació a `website/build` (admet `--locales` / `BUILD_LOCALES`).                                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Comprovació d'enllaços segura fora de línia (omet HTTP[S] remots).                                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Previsualització local de gh-pages; servei automàtic als ports 8080–8090; proves/comprovació d'enllaços opcionals.        |
| [`web_push_github`](#mt-web_push_github)                 | Fes push de `website/build` a la branca `gh-pages`.                                                                       |

Sintaxi per a les opcions

- Utilitza `make <command> OPTS="…"` per passar opcions (es recomanen cometes). Cada objectiu a continuació mostra un exemple d'ús.

--

-

#### Consells de build per a locales {#locale-build-tips}

- Construeix un subconjunt de locales: estableix `BUILD_LOCALES="en de"` o passa `OPTS="--locales en,de"` als objectius web.
- Previsualitza una locale específica: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Compilar i empaquetar {#build-and-package}

- Construeix els ZIPs: `make pack`
- Produeix ZIPs ATN i LOCAL a l'arrel del repositori (no editis els artefactes a mà)
- Consell: actualitza la versió tant a `sources/manifest_ATN.json` com a `sources/manifest_LOCAL.json` abans d'empaquetar
- Instal·lació manual (dev): Thunderbird → Eines → Complements i temes → engranatge → Instal·la un complement des d'un fitxer… → selecciona el ZIP construït

---

### Proves {#test}

- Conjunt complet: `make test` (Vitest)
- Cobertura (opcional):
- `npm i -D @vitest/coverage-v8`
- Executa `make test`; obre `coverage/index.html` per a l'informe HTML
- Només i18n: `make test_i18n` (tecles/placeholders/títols de la UI + paritat del lloc web per locale i per document amb comprovacions d'id/títol/sidebar_label)

---

### Depuració i registres {#debugging-and-logs}

- Consola d'errors: Eines → Eines per a desenvolupadors → Consola d'errors
- Commuta registres verbosos en temps d'execució:
- Activa: `messenger.storage.local.set({ debug: true })`
- Desactiva: `messenger.storage.local.set({ debug: false })`
- Els registres apareixen mentre redactes/envies respostes

---

### Documentació (lloc web) {#docs-website}

- Servidor de desenvolupament: `cd website && npm run start`
- Construeix el lloc estàtic: `cd website && npm run build`
- Equivalents de Make (alfabètic): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Exemples d'ús:
- Només EN, omet proves/comprovació d'enllaços, sense push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Totes les locales, amb proves/comprovació d'enllaços, després push: `make web_build_local_preview && make web_push_github`
- Abans de publicar, executa la comprovació d'enllaços segura fora de línia: `make web_build_linkcheck`.
- i18n: l'anglès viu a `website/docs/*.md`; les traduccions alemanyes a `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Cerca: si les variables d'entorn d'Algolia DocSearch estan configurades al CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), el lloc utilitza la cerca d'Algolia; altrament recau en la cerca local. A la portada, prem `/` o `Ctrl+K` per obrir el quadre de cerca.

---

#### Ruta de redirecció de donatius {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (i `/<locale>/donate`)
- Comportament:
- Si la ruta actual té una locale (p. ex., `/de/donate`), utilitza-la
- En cas contrari, tria la millor coincidència de `navigator.languages` vs locales configurades; recau en la locale per defecte
- Redirigeix a:
- `en` → `/docs/donation`
- altres → `/<locale>/docs/donation`
- Utilitza `useBaseUrl` per a una gestió correcta de baseUrl
- Inclou meta refresh + enllaç `noscript` com a recurs

---

---

#### Consells de previsualització {#preview-tips}

- Atura la previsualització de Node netament: obre `http://localhost:<port>/__stop` (imprès després de `Local server started`).
- Si les imatges no es carreguen a MDX/JSX, utilitza `useBaseUrl('/img/...')` per respectar el `baseUrl` del lloc.
- La previsualització s'inicia primer; la comprovació d'enllaços s'executa després i no és blocant (els enllaços externs trencats no aturaran la previsualització).
- URL d'exemple de previsualització: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (imprès després de «Local server started»).
- Enllaços externs en la comprovació: alguns llocs externs (p. ex., addons.thunderbird.net) bloquegen els rastrejadors automatitzats i poden mostrar 403 en les comprovacions d'enllaços. La previsualització igualment s'inicia; és segur ignorar-ho.

---

#### Traduir el lloc web {#translate-website}

Què pots traduir

- Només la UI del lloc web: portada, barra de navegació, peu de pàgina i altres cadenes de la UI. El contingut de la documentació es manté només en anglès per ara.

On editar

- Edita `website/i18n/<locale>/code.json` (fes servir `en` com a referència). Mantén sense canvis placeholders com `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Generar o refrescar fitxers

- Crea esquelets que faltin per a totes les locales: `npm --prefix website run i18n:stubs`
- Sobreescriu els esquelets des de l'anglès (després d'afegir cadenes noves): `npm --prefix website run i18n:stubs:force`
- Alternativa per a una sola locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Traduir les cadenes de la UI de portada/barra/peu (OpenAI)

- Configura les credencials una vegada (shell o .env):
- `export OPENAI_API_KEY=sk-...`
- Opcional: `export OPENAI_MODEL=gpt-4o-mini`
- D'una sola passada (totes les locales, omet en): `make translate_web_index`
- Limita a locales específiques: `make translate_web_index OPTS="--locales de,fr"`
- Sobreescriu els valors existents: `make translate_web_index OPTS="--force"`

Validació i reintents

- L'script de traducció valida l'estructura del JSON, preserva els placeholders amb claus i garanteix que les URLs no canviïn.
- Si falla la validació, reintenta amb comentaris fins a 2 vegades abans de mantenir els valors existents.

Previsualitza la teva locale

- Servidor de desenvolupament: `npm --prefix website run start`
- Visita `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Tramesa

- Obre una PR amb el(s) fitxer(s) `code.json` editat(s). Mantén els canvis enfocats i inclou una captura ràpida quan sigui possible.

---

### Consells de seguretat i configuració {#security-and-configuration-tips}

- No facis commit de `sources/manifest.json` (creat temporalment pel build)
- Mantén `browser_specific_settings.gecko.id` estable per preservar el canal d'actualització

---

### Persistència de la configuració {#settings-persistence}

- Emmagatzematge: tots els paràmetres d'usuari viuen a `storage.local` i persisteixen entre actualitzacions del complement.
- Instal·lació: els valors per defecte s'apliquen només quan una clau manca estrictament (undefined).
- Actualització: una migració omple només les claus que falten; els valors existents mai no se sobreescriuen.
- Marcador d'esquema: `settingsVersion` (actualment `1`).
- Claus i valors per defecte:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Codi: consulta `sources/background.js` → `initializeOrMigrateSettings()` i `SCHEMA_VERSION`.

Flux de treball de desenvolupament (afegir un paràmetre nou)

- Incrementa `SCHEMA_VERSION` a `sources/background.js`.
- Afegeix la nova clau + valor per defecte a l'objecte `DEFAULTS` a `initializeOrMigrateSettings()`.
- Utilitza la regla «only-if-undefined» en sembrar valors per defecte; no sobreescriguis els valors existents.
- Si el paràmetre és visible per a l'usuari, connecta'l a `sources/options.js` i afegeix cadenes localitzades.
- Afegeix/ajusta proves (consulta `tests/background.settings.migration.test.js`).

Consells per a proves manuals

- Simula una instal·lació nova: neteja el directori de dades de l'extensió o comença amb un perfil nou.
- Simula una actualització: estableix `settingsVersion` a `0` a `storage.local` i torna a carregar; confirma que els valors existents romanen sense canvis i que només s'afegeixen les claus que falten.

---

### Resolució de problemes {#troubleshooting}

- Assegura't que Thunderbird sigui 128 ESR o més nou
- Utilitza la Consola d'errors per a problemes en temps d'execució
- Si sembla que la configuració emmagatzemada no s'aplica correctament, reinicia Thunderbird i torna-ho a provar. (Thunderbird pot posar en memòria cau l'estat entre sessions; un reinici assegura que es carreguin els paràmetres nous.)

---

### CI i cobertura {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) executa Vitest amb llindars de cobertura (85% línies/funcions/branques/declaracions). Si no es compleixen els llindars, la tasca falla.
- El flux de treball puja un artefacte `coverage-html` amb l'informe HTML; descarrega'l des de la pàgina d'execució (Actions → última execució → Artifacts).

---

### Contribució {#contributing}

- Consulta CONTRIBUTING.md per a les directrius de branques/commits/PR
- Consell: crea un perfil de desenvolupament de Thunderbird separat per a les proves per evitar impactar el teu perfil diari.

---

### Traduccions

- Executar tasques de traducció grans «tot → tot» pot ser lent i car. Comença amb un subconjunt (p. ex., uns quants documents i 1–2 locales), revisa el resultat i després amplia.

---

- Política de reintents: les tasques de traducció fan fins a 3 reintents amb backoff exponencial en errors d'API; consulta `scripts/translate_web_docs_batch.js` i `scripts/translate_web_docs_sync.js`.

Captures de pantalla per a la documentació

- Emmagatzema les imatges sota `website/static/img/`.
- Fes-hi referència a MD/MDX via `useBaseUrl('/img/<filename>')` perquè els camins funcionin amb el `baseUrl` del lloc.
- Després d'afegir o reanomenar imatges sota `website/static/img/`, confirma que totes les referències encara usen `useBaseUrl('/img/…')` i es representen en una previsualització local.
  Favicons

- El `favicon.ico` multitamany es genera automàticament en tots els camins de build (Make + scripts) via `website/scripts/build-favicon.mjs`.
- No cal cap pas manual; n'hi ha prou amb actualitzar `icon-*.png`.
  Consell de revisió

- Mantén el `id` del front matter sense canvis en els documents traduïts; tradueix només `title` i `sidebar_label` quan hi siguin.

#### clean {#mt-clean}

- Propòsit: eliminar artefactes locals de build/previsualització.
- Ús: `make clean`
- Elimina (si hi són):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Propòsit: formatar, provar, actualitzar el registre de canvis, fer commit i push.
- Ús: `make commit`
- Detalls: executa Prettier (escriptura), `make test`, `make test_i18n`; afegeix al changelog quan hi ha diferències preparades; fa push a `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Propòsit: executar ESLint amb configuració plana.
- Ús: `make eslint`

---

#### help {#mt-help}

- Propòsit: llistar tots els objectius amb documentació d'una línia.
- Ús: `make help`

---

#### lint {#mt-lint}

- Propòsit: passar el linter a la MailExtension fent servir `web-ext`.
- Ús: `make lint`
- Notes: fa còpies temporals `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignora els ZIPs construïts; els avisos no fan fallar la pipeline.

---

#### menu {#mt-menu}

- Propòsit: menú interactiu per seleccionar un objectiu de Make i arguments opcionals.
- Ús: executa `make` sense arguments.
- Notes: si `whiptail` no està disponible, el menú recau en `make help`.

---

#### pack {#mt-pack}

- Propòsit: construir ZIPs ATN i LOCAL (depèn de `lint`).
- Ús: `make pack`
- Consell: incrementa les versions a tots dos `sources/manifest_*.json` abans d'empaquetar.

---

#### prettier {#mt-prettier}

- Propòsit: donar format al repositori in situ.
- Ús: `make prettier`

#### prettier_check {#mt-prettier_check}

- Propòsit: verificar el format (sense escriure).
- Ús: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Propòsit: àlies de `prettier`.
- Ús: `make prettier_write`

---

#### test {#mt-test}

- Propòsit: executar Prettier (escriptura), ESLint i després Vitest (cobertura si està instal·lat).
- Ús: `make test`

#### test_i18n {#mt-test_i18n}

- Propòsit: proves centrades en i18n per a cadenes del complement i documents del lloc web.
- Ús: `make test_i18n`
- Executa: `npm run test:i18n` i `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Propòsit: traduir les cadenes de la UI del complement de l'EN a altres locales.
- Ús: `make translation_app OPTS="--locales all|de,fr"`
- Notes: preserva l'estructura de claus i placeholders; escriu el registre a `translation_app.log`. Forma d'script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Propòsit: traduir la documentació del lloc web de `website/docs/*.md` a `website/i18n/<locale>/...`.
- Preferit: `translate_web_docs_batch` (OpenAI Batch API)
  - Ús (banderes): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - L'estil posicional heretat encara s'accepta: `OPTS="<doc|all> <lang|all>"`
- Comportament: construeix JSONL, puja, comprova cada 30s, descarrega resultats, escriu fitxers.
- Nota: una tasca batch pot trigar fins a 24 hores a completar-se (segons la finestra de batch d'OpenAI). La consola mostra el temps transcorregut a cada consulta.
- Entorn: `OPENAI_API_KEY` (obligatori), opcionals `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (per defecte 24h), `BATCH_POLL_INTERVAL_MS`.
- Heretat: `translate_web_docs_sync`
  - Ús (banderes): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - L'estil posicional heretat encara s'accepta: `OPTS="<doc|all> <lang|all>"`
- Comportament: sol·licituds síncrones per parell (sense agregació en batch).
- Notes: indicacions interactives quan s'omet `OPTS`. Ambdós modes preserven els blocs de codi/codi en línia i mantenen `id` del front matter sense canvis; escriuen el registre a `translation_web_batch.log` (batch) o `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Propòsit: traduir les cadenes de la UI del lloc web (portada, barra, peu) de `website/i18n/en/code.json` a totes les locales sota `website/i18n/<locale>/code.json` (excloent `en`).
- Ús: `make translate_web_index` o `make translate_web_index OPTS="--locales de,fr [--force]"`
- Requisits: exporta `OPENAI_API_KEY` (opcional: `OPENAI_MODEL=gpt-4o-mini`).
- Comportament: valida l'estructura JSON, preserva placeholders amb claus, manté les URLs sense canvis i reintenta amb comentaris en errors de validació.

---

#### web_build {#mt-web_build}

- Propòsit: construir el lloc de documentació a `website/build`.
- Ús: `make web_build OPTS="--locales en|de,en|all"` (o estableix `BUILD_LOCALES="en de"`)
- Interns: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: executa `npm ci` a `website/` només si falta `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Propòsit: comprovació d'enllaços segura fora de línia.
- Ús: `make web_build_linkcheck OPTS="--locales en|all"`
- Notes: construeix a `tmp_linkcheck_web_pages`; reescriu `baseUrl` de GH Pages a `/`; omet enllaços HTTP(S) remots.

#### web_build_local_preview {#mt-web_build_local_preview}

- Propòsit: previsualització local de gh-pages amb proves/comprovació d'enllaços opcionals.
- Ús: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Comportament: prova primer el servidor de previsualització de Node (`scripts/preview-server.mjs`, admet `/__stop`), recau en `python3 -m http.server`; serveix als ports 8080–8090; PID a `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Propòsit: fer push de `website/build` a la branca `gh-pages`.
- Ús: `make web_push_github`

Consell: estableix `NPM=…` per sobreescriure el gestor de paquets que fa servir el Makefile (per defecte `npm`).

---
