---
id: development
title: 'Dezvoltare'
sidebar_label: 'Dezvoltare'
---

---

## Ghid de dezvoltare {#development-guide}

:::note Editați doar în engleză; traducerile se propagă
Actualizați documentația doar sub `website/docs` (engleză). Traducerile sub `website/i18n/<locale>/…` sunt generate și nu ar trebui editate manual. Folosiți sarcinile de traducere (de ex., `make translate_web_docs_batch`) pentru a reîmprospăta conținutul localizat.
:::

### Cerințe prealabile {#prerequisites}

- Node.js 22+ și npm (testat cu Node 22)
- Thunderbird 128 ESR sau mai nou (pentru testare manuală)

---

### Structura proiectului (nivel înalt) {#project-layout-high-level}

- Rădăcină: script de împachetare `distribution_zip_packer.sh`, documentație, capturi de ecran
- `sources/`: codul principal al suplimentului (fundal, interfață opțiuni/popup, manifeste, pictograme)
- `tests/`: suita Vitest
- `website/`: documentație Docusaurus (cu i18n sub `website/i18n/de/...`)

---

### Instalare și instrumente {#install-and-tooling}

- Instalează dependențele din rădăcină: `npm ci`
- Documentație (opțional): `cd website && npm ci`
- Descoperă țintele: `make help`

---

### Dezvoltare live (web‑ext run) {#live-dev-web-ext}

- Ciclu rapid în Firefox Desktop (doar teste UI de tip smoke):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Rulează în Thunderbird (preferat pentru MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Sfaturi:
- Ține deschisă Consola de erori a Thunderbird (Tools → Developer Tools → Error Console).
- Paginile de evenimente MV3 sunt suspendate când sunt inactive; reîncarcă suplimentul după modificări de cod sau lasă web‑ext să reîncarce automat.
- Unele comportamente specifice Firefox diferă; verifică întotdeauna în Thunderbird pentru paritate API.
- Căi binare Thunderbird (exemple):
- Linux: `thunderbird` (de ex., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolarea profilului: Folosește un profil Thunderbird separat pentru dezvoltare pentru a nu afecta configurarea zilnică.

---

### Ținte Make (în ordine alfabetică) {#make-targets-alphabetical}

Makefile standardizează fluxurile comune de dezvoltare. Rulează `make help` oricând pentru un rezumat într-o linie pentru fiecare țintă.

Sfat: rularea `make` fără țintă deschide un meniu Whiptail simplu pentru a alege o țintă.

| Țintă                                                    | Descriere într-o linie                                                                          |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Elimină artefactele locale de build/preview (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | Formatează, rulează testele (incl. i18n), actualizează changelog-ul, commit & push.             |
| [`eslint`](#mt-eslint)                                   | Rulează ESLint prin flat config (`npm run -s lint:eslint`).                                     |
| [`help`](#mt-help)                                       | Afișează toate țintele cu documentație într-o linie (sortate).                                  |
| [`lint`](#mt-lint)                                       | web‑ext lint pe `sources/` (manifest temporar; ignoră ZIP-urile; ne-fatal).                     |
| [`menu`](#mt-menu)                                       | Meniu interactiv pentru selectarea unei ținte și a argumentelor opționale.                      |
| [`pack`](#mt-pack)                                       | Construiește ZIP-uri ATN și LOCAL (rulează linter-ul; apelează scriptul de împachetare).        |
| [`prettier`](#mt-prettier)                               | Formatează depozitul in-place (scrie modificări).                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier în modul de verificare (fără scrieri); eșuează dacă este necesară reformatatarea.      |
| [`prettier_write`](#mt-prettier_write)                   | Alias pentru `prettier`.                                                                        |
| [`test`](#mt-test)                                       | Prettier (scriere), ESLint, apoi Vitest (acoperire dacă este configurată).                      |
| [`test_i18n`](#mt-test_i18n)                             | Teste doar i18n: placeholder-e/paritate pentru supliment + paritate site.                       |
| [`translate_app`](#mt-translation-app)                   | Alias pentru `translation_app`.                                                                 |
| [`translation_app`](#mt-translation-app)                 | Tradu șirurile UI ale aplicației din `sources/_locales/en/messages.json`.                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tradu documentația site-ului prin OpenAI Batch API (preferat).                                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tradu documentația site-ului sincron (legacy, non-batch).                                       |
| [`translate_web_index`](#mt-translation_web_index)       | Alias pentru `translation_web_index`.                                                           |
| [`translation_web_index`](#mt-translation_web_index)     | Tradu UI-ul homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).        |
| [`web_build`](#mt-web_build)                             | Construiește documentația în `website/build` (acceptă `--locales` / `BUILD_LOCALES`).           |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Verificare linkuri sigură offline (omite HTTP[S] la distanță).                                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Previzualizare gh‑pages locală; servește automat pe 8080–8090; teste/verificare link opționale. |
| [`web_push_github`](#mt-web_push_github)                 | Fă push al `website/build` în ramura `gh-pages`.                                                |

Sintaxă pentru opțiuni

- Folosește `make <command> OPTS="…"` pentru a pasa opțiuni (se recomandă ghilimelele). Fiecare țintă de mai jos arată un exemplu de utilizare.

--

-

#### Sfaturi de build pentru locale {#locale-build-tips}

- Construiește un subset de locale: setează `BUILD_LOCALES="en de"` sau pasează `OPTS="--locales en,de"` țintelor web.
- Previzualizează un anumit locale: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Construire și împachetare {#build-and-package}

- Construiește ZIP-uri: `make pack`
- Produce ZIP-uri ATN și LOCAL în rădăcina repo-ului (nu edita artefactele manual)
- Sfat: actualizează versiunea atât în `sources/manifest_ATN.json`, cât și în `sources/manifest_LOCAL.json` înainte de împachetare
- Instalare manuală (dev): Thunderbird → Tools → Add‑ons and Themes → rotiță → Install Add‑on From File… → selectează ZIP-ul construit

---

### Testare {#test}

- Suită completă: `make test` (Vitest)
- Acoperire (opțional):
- `npm i -D @vitest/coverage-v8`
- Rulează `make test`; deschide `coverage/index.html` pentru raportul HTML
- Doar i18n: `make test_i18n` (chei UI/placeholder-e/titluri + paritate site per‑locale per‑doc cu verificări pentru id/title/sidebar_label)

---

### Depanare și jurnale {#debugging-and-logs}

- Consolă de erori: Tools → Developer Tools → Error Console
- Comută jurnalele verbose la runtime:
- Activează: `messenger.storage.local.set({ debug: true })`
- Dezactivează: `messenger.storage.local.set({ debug: false })`
- Jurnalele apar în timp ce compui/trimiți răspunsuri

---

### Documentație (site) {#docs-website}

- Server de dezvoltare: `cd website && npm run start`
- Construiește site-ul static: `cd website && npm run build`
- Echivalente Make (alfabetic): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Exemple de utilizare:
- Doar EN, sari peste teste/verificare linkuri, fără push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Toate localele, cu teste/verificare linkuri, apoi push: `make web_build_local_preview && make web_push_github`
- Înainte de publicare, rulează verificarea linkurilor sigură offline: `make web_build_linkcheck`.
- i18n: Engleza se află în `website/docs/*.md`; traducerile germane în `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Căutare: Dacă variabilele de mediu Algolia DocSearch sunt setate în CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), site-ul folosește căutarea Algolia; altfel revine la căutarea locală. Pe pagina principală, apasă `/` sau `Ctrl+K` pentru a deschide caseta de căutare.

---

#### Rută de redirecționare pentru donații {#donate-redirect}

- `website/src/pages/donate.js`
- Rută: `/donate` (și `/<locale>/donate`)
- Comportament:
- Dacă ruta curentă are un locale (de ex., `/de/donate`), folosește-l
- Altfel, alege cea mai bună potrivire dintre `navigator.languages` vs localele configurate; revine la locale implicit
- Redirecționează către:
- `en` → `/docs/donation`
- altele → `/<locale>/docs/donation`
- Folosește `useBaseUrl` pentru gestionarea corectă a baseUrl
- Include meta refresh + link `noscript` ca rezervă

---

---

#### Sfaturi pentru previzualizare {#preview-tips}

- Oprește curat previzualizarea Node: deschide `http://localhost:<port>/__stop` (tipărit după `Local server started`).
- Dacă imaginile nu se încarcă în MDX/JSX, folosește `useBaseUrl('/img/...')` pentru a respecta `baseUrl` al site-ului.
- Previzualizarea pornește mai întâi; verificarea linkurilor rulează ulterior și nu blochează (linkurile externe rupte nu vor opri previzualizarea).
- URL de previzualizare exemplu: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (tipărit după „Local server started”).
- Linkuri externe în verificarea de linkuri: Unele site-uri externe (de ex., addons.thunderbird.net) blochează crawler-ele automate și pot afișa 403 la verificări. Previzualizarea tot pornește; acestea pot fi ignorate în siguranță.

---

#### Tradu site-ul {#translate-website}

Ce poți traduce

- Doar interfața site-ului: pagina principală, bara de navigare, subsolul și alte șiruri UI. Conținutul documentației rămâne doar în engleză deocamdată.

Unde să editezi

- Editează `website/i18n/<locale>/code.json` (folosește `en` ca referință). Păstrează neschimbate placeholder-ele precum `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Generează sau actualizează fișierele

- Creează stub-urile lipsă pentru toate localele: `npm --prefix website run i18n:stubs`
- Suprascrie stub-urile din engleză (după adăugarea de șiruri noi): `npm --prefix website run i18n:stubs:force`
- Alternativ pentru un singur locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Tradu șirurile UI ale homepage/navbar/footer (OpenAI)

- Setează credențialele o singură dată (shell sau .env):
- `export OPENAI_API_KEY=sk-...`
- Opțional: `export OPENAI_MODEL=gpt-4o-mini`
- O singură execuție (toate localele, omite en): `make translate_web_index`
- Limitează la locale specifice: `make translate_web_index OPTS="--locales de,fr"`
- Suprascrie valorile existente: `make translate_web_index OPTS="--force"`

Validare și reîncercări

- Scriptul de traducere validează forma JSON, păstrează placeholder-ele cu acolade și se asigură că URL-urile rămân neschimbate.
- La eșecul validării, reîncearcă cu feedback de până la 2 ori înainte de a păstra valorile existente.

Previzualizează-ți locale-ul

- Server de dezvoltare: `npm --prefix website run start`
- Vizitează `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Trimitere

- Deschide un PR cu fișierul/fișierele `code.json` editate. Păstrează schimbările focalizate și include o captură de ecran rapidă când este posibil.

---

### Sfaturi de securitate și configurare {#security-and-configuration-tips}

- Nu face commit la `sources/manifest.json` (creat temporar de build)
- Păstrează `browser_specific_settings.gecko.id` stabil pentru a conserva canalul de actualizare

---

### Persistența setărilor {#settings-persistence}

- Stocare: Toate setările utilizatorului trăiesc în `storage.local` și persistă între actualizările suplimentului.
- Instalare: Valorile implicite se aplică doar când o cheie lipsește strict (undefined).
- Actualizare: O migrare completează doar cheile lipsă; valorile existente nu sunt niciodată suprascrise.
- Marcator schemă: `settingsVersion` (în prezent `1`).
- Chei și valori implicite:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Cod: vezi `sources/background.js` → `initializeOrMigrateSettings()` și `SCHEMA_VERSION`.

Flux de lucru pentru dezvoltare (adăugarea unei setări noi)

- Crește `SCHEMA_VERSION` în `sources/background.js`.
- Adaugă noua cheie + implicitul în obiectul `DEFAULTS` din `initializeOrMigrateSettings()`.
- Folosește regula „only-if-undefined” când însămânțezi implicitele; nu suprascrie valorile existente.
- Dacă setarea este vizibilă pentru utilizator, integreaz-o în `sources/options.js` și adaugă șiruri localizate.
- Adaugă/ajustează testele (vezi `tests/background.settings.migration.test.js`).

Sfaturi pentru testare manuală

- Simulează o instalare proaspătă: golește directorul de date al extensiei sau pornește cu un profil nou.
- Simulează o actualizare: setează `settingsVersion` la `0` în `storage.local` și reîncarcă; confirmă că valorile existente rămân neschimbate și doar cheile lipsă sunt adăugate.

---

### Depanare {#troubleshooting}

- Asigură-te că Thunderbird este 128 ESR sau mai nou
- Folosește Consola de erori pentru probleme la runtime
- Dacă setările stocate par să nu se aplice corect, repornește Thunderbird și încearcă din nou. (Thunderbird poate memora starea între sesiuni; o repornire asigură încărcarea setărilor proaspete.)

---

### CI și acoperire {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) rulează vitest cu praguri de acoperire (85% linii/funcții/ramuri/declarații). Dacă pragurile nu sunt îndeplinite, jobul eșuează.
- Workflow-ul încarcă un artefact `coverage-html` cu raportul HTML; descarcă-l din pagina rularii (Actions → ultima rulare → Artifacts).

---

### Contribuții {#contributing}

- Vezi CONTRIBUTING.md pentru ghiduri de branch/commit/PR
- Sfat: Creează un profil Thunderbird separat pentru dezvoltare, pentru testare, ca să nu îți afecteze profilul zilnic.

---

### Traduceri

- Rularea unor joburi mari de traducere „all → all” poate fi lentă și costisitoare. Începe cu un subset (de ex., câteva documente și 1–2 locale), revizuiește rezultatul, apoi extinde.

---

- Politică de reîncercare: joburile de traducere efectuează până la 3 reîncercări cu backoff exponențial la erori de API; vezi `scripts/translate_web_docs_batch.js` și `scripts/translate_web_docs_sync.js`.

Capturi de ecran pentru documentație

- Stochează imaginile sub `website/static/img/`.
- Referențiază-le în MD/MDX prin `useBaseUrl('/img/<filename>')` astfel încât căile să funcționeze cu `baseUrl` al site-ului.
- După adăugarea sau redenumirea imaginilor sub `website/static/img/`, confirmă că toate referințele folosesc în continuare `useBaseUrl('/img/…')` și se redau într-o previzualizare locală.
  Favicons

- `favicon.ico` multi‑dimensiune este generat automat în toate căile de build (Make + scripturi) prin `website/scripts/build-favicon.mjs`.
- Nu este necesar niciun pas manual; actualizarea `icon-*.png` este suficientă.
  Sfat de revizuire

- Păstrează front‑matter-ul `id` neschimbat în documentele traduse; traduce doar `title` și `sidebar_label` când sunt prezente.

#### clean {#mt-clean}

- Scop: elimină artefactele locale de build/preview.
- Utilizare: `make clean`
- Elimină (dacă există):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Scop: formatează, testează, actualizează changelog-ul, face commit și push.
- Utilizare: `make commit`
- Detalii: rulează Prettier (scriere), `make test`, `make test_i18n`; adaugă la changelog când există diferențe în stage; face push către `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Scop: rulează ESLint prin flat config.
- Utilizare: `make eslint`

---

#### help {#mt-help}

- Scop: listează toate țintele cu documentație într-o linie.
- Utilizare: `make help`

---

#### lint {#mt-lint}

- Scop: rulează lint pe MailExtension folosind `web-ext`.
- Utilizare: `make lint`
- Note: copiază temporar `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoră ZIP-urile construite; avertismentele nu eșuează pipeline-ul.

---

#### menu {#mt-menu}

- Scop: meniu interactiv pentru selectarea unei ținte și a argumentelor opționale.
- Utilizare: rulează `make` fără argumente.
- Note: dacă `whiptail` nu este disponibil, meniul revine la `make help`.

---

#### pack {#mt-pack}

- Scop: construiește ZIP-urile ATN și LOCAL (depinde de `lint`).
- Utilizare: `make pack`
- Sfat: ridică versiunile în ambele `sources/manifest_*.json` înainte de împachetare.

---

#### prettier {#mt-prettier}

- Scop: formatează repo-ul in-place.
- Utilizare: `make prettier`

#### prettier_check {#mt-prettier_check}

- Scop: verifică formatarea (fără scrieri).
- Utilizare: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Scop: alias pentru `prettier`.
- Utilizare: `make prettier_write`

---

#### test {#mt-test}

- Scop: rulează Prettier (scriere), ESLint, apoi Vitest (acoperire dacă e instalat).
- Utilizare: `make test`

#### test_i18n {#mt-test_i18n}

- Scop: teste axate pe i18n pentru șirurile suplimentului și documentația site-ului.
- Utilizare: `make test_i18n`
- Rulează: `npm run test:i18n` și `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Scop: traduce șirurile UI ale suplimentului din EN în alte locale.
- Utilizare: `make translation_app OPTS="--locales all|de,fr"`
- Note: păstrează structura cheilor și placeholder-ele; loghează în `translation_app.log`. Script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Scop: traduce documentația site-ului din `website/docs/*.md` în `website/i18n/<locale>/...`.
- Preferat: `translate_web_docs_batch` (OpenAI Batch API)
  - Utilizare (flaguri): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozitionalul legacy este încă acceptat: `OPTS="<doc|all> <lang|all>"`
- Comportament: construiește JSONL, încarcă, interoghează la fiecare 30s, descarcă rezultatele, scrie fișierele.
- Notă: un job batch poate dura până la 24 de ore (conform ferestrei batch a OpenAI). Consola arată timpul scurs la fiecare interogare.
- Mediu: `OPENAI_API_KEY` (obligatoriu), opționale `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (implicit 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Utilizare (flaguri): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pozitionalul legacy este încă acceptat: `OPTS="<doc|all> <lang|all>"`
- Comportament: cereri sincron per‑pereche (fără agregare batch).
- Note: Promptere interactive când `OPTS` este omis. Ambele moduri păstrează blocurile de cod/codul inline și mențin front‑matter-ul `id` neschimbat; loghează în `translation_web_batch.log` (batch) sau `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Scop: traduce șirurile UI ale site-ului (homepage, navbar, footer) din `website/i18n/en/code.json` în toate localele sub `website/i18n/<locale>/code.json` (excluzând `en`).
- Utilizare: `make translate_web_index` sau `make translate_web_index OPTS="--locales de,fr [--force]"`
- Cerințe: exportă `OPENAI_API_KEY` (opțional: `OPENAI_MODEL=gpt-4o-mini`).
- Comportament: validează structura JSON, păstrează placeholder-ele cu acolade, menține URL-urile neschimbate și reîncearcă cu feedback la erori de validare.

---

#### web_build {#mt-web_build}

- Scop: construiește site-ul de documentație în `website/build`.
- Utilizare: `make web_build OPTS="--locales en|de,en|all"` (sau setează `BUILD_LOCALES="en de"`)
- Intern: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dependențe: rulează `npm ci` în `website/` doar dacă lipsește `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Scop: verificare de linkuri sigură offline.
- Utilizare: `make web_build_linkcheck OPTS="--locales en|all"`
- Note: construiește în `tmp_linkcheck_web_pages`; rescrie `baseUrl` de pe GH Pages în `/`; omite linkurile HTTP(S) la distanță.

#### web_build_local_preview {#mt-web_build_local_preview}

- Scop: previzualizare gh‑pages locală cu teste/verificare link opționale.
- Utilizare: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Comportament: încearcă mai întâi serverul de previzualizare Node (`scripts/preview-server.mjs`, acceptă `/__stop`), revine la `python3 -m http.server`; servește pe 8080–8090; PID la `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Scop: fă push al `website/build` în ramura `gh-pages`.
- Utilizare: `make web_push_github`

Sfat: setează `NPM=…` pentru a suprascrie managerul de pachete folosit de Makefile (implicit `npm`).

---
