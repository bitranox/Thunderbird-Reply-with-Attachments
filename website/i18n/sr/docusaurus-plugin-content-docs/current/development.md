---
id: development
title: 'Razvoj'
sidebar_label: 'Развој'
---

---

## Vodič za razvoj {#development-guide}

:::note Uređujte samo englesku verziju; prevodi se propagiraju
Ažurirajte dokumentaciju **samo** pod `website/docs` (English). Prevodi pod `website/i18n/<locale>/…` se generišu i ne treba ih ručno uređivati. Koristite zadatke za prevođenje (npr. `make translate_web_docs_batch`) da osvežite lokalizovani sadržaj.
:::

### Preduslovi {#prerequisites}

- Node.js 22+ i npm (testirano sa Node 22)
- Thunderbird 128 ESR ili noviji (za ručno testiranje)

---

### Raspored projekta (visok nivo) {#project-layout-high-level}

- Koren: skripta za pakovanje `distribution_zip_packer.sh`, dokumentacija, snimci ekrana
- `sources/`: glavni kod dodatka (background, options/popup UI, manifesti, ikone)
- `tests/`: Vitest skup
- `website/`: Docusaurus dokumenti (sa i18n pod `website/i18n/de/...`)

---

### Instalacija i alati {#install-and-tooling}

- Instalirajte zavisnosti u korenu: `npm ci`
- Dokumentacija (opciono): `cd website && npm ci`
- Otkrijte mete: `make help`

---

### Živi razvoj (web‑ext run) {#live-dev-web-ext}

- Brza petlja u Firefox Desktop (samo UI smoke‑testovi):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Pokretanje u Thunderbird-u (preporučeno za MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Saveti:
- Držite otvorenu Thunderbird konzolu grešaka (Tools → Developer Tools → Error Console).
- MV3 event stranice se suspenduju kada su neaktivne; ponovo učitajte dodatak posle izmena koda ili dozvolite da web‑ext automatski ponovo učita.
- Neka ponašanja specifična za Firefox se razlikuju; uvek proverite u Thunderbird-u radi pariteta API-ja.
- Putanje do Thunderbird binarnog fajla (primeri):
- Linux: `thunderbird` (npr. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolacija profila: Koristite odvojen Thunderbird profil za razvoj kako biste izbegli uticaj na vašu svakodnevnu postavku.

---

### Make mete (po abecedi) {#make-targets-alphabetical}

Makefile standardizuje uobičajene razvojne tokove. Pokrenite `make help` bilo kada za jednolinijski rezime svake mete.

Savet: pokretanje `make` bez mete otvara jednostavan Whiptail meni za izbor mete.

| Meta                                                     | Jednolinijski opis                                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Uklonite lokalne artefakte build/preview (tmp/, web-local-preview/, website/build/).                    |
| [`commit`](#mt-commit)                                   | Formatirajte, pokrenite testove (uklj. i18n), ažurirajte changelog, commit & push.                      |
| [`eslint`](#mt-eslint)                                   | Pokrenite ESLint preko flat konfiguracije (`npm run -s lint:eslint`).                                   |
| [`help`](#mt-help)                                       | Ispišite sve mete sa jednolinijskim opisima (sortirano).                                                |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (privremeni manifest; ignoriše ZIP-ove; nefatalno).                          |
| [`menu`](#mt-menu)                                       | Interaktivni meni za izbor mete i opcionih argumenata.                                                  |
| [`pack`](#mt-pack)                                       | Napravite ATN i LOCAL ZIP-ove (pokreće linter; poziva skriptu za pakovanje).                            |
| [`prettier`](#mt-prettier)                               | Formatirajte repozitorijum na licu mesta (piše izmene).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier u check režimu (bez pisanja); pada ako je potrebno preformatiranje.                            |
| [`prettier_write`](#mt-prettier_write)                   | Alias za `prettier`.                                                                                    |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, zatim Vitest (coverage ako je podešen).                                       |
| [`test_i18n`](#mt-test_i18n)                             | Samo i18n testovi: placeholderi/paritet u dodatku + paritet sajta.                                      |
| [`translate_app`](#mt-translation-app)                   | Alias za `translation_app`.                                                                             |
| [`translation_app`](#mt-translation-app)                 | Prevedite stringove UI aplikacije iz `sources/_locales/en/messages.json`.                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | Prevedite dokumente sajta putem OpenAI Batch API (preporučeno).                                         |
| [`translate_web_docs_sync`](#mt-translation-web)         | Prevedite dokumente sajta sinhrono (legacy, bez batch-a).                                               |
| [`translate_web_index`](#mt-translation_web_index)       | Alias za `translation_web_index`.                                                                       |
| [`translation_web_index`](#mt-translation_web_index)     | Prevedite UI početne stranice/navigacije/podnožja (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Izgradite dokumente u `website/build` (podržava `--locales` / `BUILD_LOCALES`).                         |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Provera linkova bez interneta (preskače udaljene HTTP[S]).                                              |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokalni gh‑pages pregled; automatski servis na 8080–8090; opciono testovi/provera linkova.              |
| [`web_push_github`](#mt-web_push_github)                 | Pošaljite `website/build` na granu `gh-pages`.                                                          |

Sintaksa za opcije

- Koristite `make <command> OPTS="…"` da prosledite opcije (preporučene navodnike). Svaka meta ispod prikazuje primer upotrebe.

--

-

#### Saveti za build po jezicima {#locale-build-tips}

- Napravite podskup jezika: postavite `BUILD_LOCALES="en de"` ili prosledite `OPTS="--locales en,de"` web metama.
- Pregled određenog jezika: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Izgradnja i pakovanje {#build-and-package}

- Napravite ZIP-ove: `make pack`
- Proizvodi ATN i LOCAL ZIP-ove u korenu repozitorijuma (ne uređujte artefakte ručno)
- Savet: ažurirajte verziju i u `sources/manifest_ATN.json` i u `sources/manifest_LOCAL.json` pre pakovanja
- Ručna instalacija (dev): Thunderbird → Tools → Add‑ons and Themes → zupčanik → Install Add‑on From File… → izaberite napravljeni ZIP

---

### Test {#test}

- Kompletan skup: `make test` (Vitest)
- Pokrivenost (opciono):
- `npm i -D @vitest/coverage-v8`
- Pokrenite `make test`; otvorite `coverage/index.html` za HTML izveštaj
- Samo i18n: `make test_i18n` (UI ključevi/placeholderi/naslovi + paritet sajta po jeziku i dokumentu uz provere id/title/sidebar_label)

---

### Otklanjanje grešaka i logovi {#debugging-and-logs}

- Konzola grešaka: Tools → Developer Tools → Error Console
- Prebacivanje detaljnih logova u runtime-u:
- Uključi: `messenger.storage.local.set({ debug: true })`
- Isključi: `messenger.storage.local.set({ debug: false })`
- Logovi se pojavljuju tokom sastavljanja/slanja odgovora

---

### Dokumentacija (sajt) {#docs-website}

- Dev server: `cd website && npm run start`
- Build statičkog sajta: `cd website && npm run build`
- Ekvivalenti u Make (abecedno): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Primeri upotrebe:
- Samo EN, preskoči testove/proveru linkova, bez push-a: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Svi jezici, sa testovima/proverom linkova, zatim push: `make web_build_local_preview && make web_push_github`
- Pre objavljivanja, pokrenite proveru linkova bez interneta: `make web_build_linkcheck`.
- i18n: Engleski je u `website/docs/*.md`; nemački prevodi u `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pretraga: Ako su Algolia DocSearch promenljive okruženja podešene u CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), sajt koristi Algolia pretragu; u suprotnom se vraća na lokalnu pretragu. Na početnoj stranici, pritisnite `/` ili `Ctrl+K` da otvorite polje za pretragu.

---

#### Ruta preusmeravanja za donacije {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (i `/<locale>/donate`)
- Ponašanje:
- Ako trenutna ruta ima jezik (npr. `/de/donate`), koristi ga
- U suprotnom, izaberite najbolji pogodak iz `navigator.languages` u odnosu na podešene jezike; vratite se na podrazumevani jezik
- Preusmerava na:
- `en` → `/docs/donation`
- ostale → `/<locale>/docs/donation`
- Koristi `useBaseUrl` za ispravno rukovanje baseUrl-om
- Uključuje meta refresh + `noscript` link kao rezervu

---

---

#### Saveti za pregled {#preview-tips}

- Zaustavite Node pregled čisto: otvorite `http://localhost:<port>/__stop` (štampa se posle `Local server started`).
- Ako se slike ne učitavaju u MDX/JSX, koristite `useBaseUrl('/img/...')` da se ispoštuje sajt `baseUrl`.
- Pregled se startuje prvi; provera linkova se pokreće naknadno i ne blokira (prekinuti spoljašnji linkovi neće zaustaviti pregled).
- Primer URL-a za pregled: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (štampa se posle “Local server started”).
- Spoljašnji linkovi u proveri linkova: Neki spoljašnji sajtovi (npr. addons.thunderbird.net) blokiraju automatske crawlere i mogu prikazati 403 u proverama linkova. Pregled se i dalje pokreće; ovo je bezbedno ignorisati.

---

#### Prevedite sajt {#translate-website}

Šta možete prevesti

- Samo UI sajta: početna stranica, navigacioni bar, podnožje i drugi UI stringovi. Sadržaj dokumentacije za sada ostaje samo na engleskom.

Gde da menjate

- Uredite `website/i18n/<locale>/code.json` (koristite `en` kao referencu). Ostavite placeholdere kao `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` nepromenjene.

Generišite ili osvežite fajlove

- Napravite nedostajuće stubove za sve jezike: `npm --prefix website run i18n:stubs`
- Prepišite stubove iz engleskog (posle dodavanja novih stringova): `npm --prefix website run i18n:stubs:force`
- Alternativa za jedan jezik: `npx --prefix website docusaurus write-translations --locale <locale>`

Prevedite stringove UI za početnu/navigacioni bar/podnožje (OpenAI)

- Podesite akreditive jednom (shell ili .env):
- `export OPENAI_API_KEY=sk-...`
- Opciono: `export OPENAI_MODEL=gpt-4o-mini`
- Jednokratno (svi jezici, bez en): `make translate_web_index`
- Ograničite na određene jezike: `make translate_web_index OPTS="--locales de,fr"`
- Prepišite postojeće vrednosti: `make translate_web_index OPTS="--force"`

Validacija i ponovni pokušaji

- Skripta za prevođenje validira oblik JSON-a, čuva placeholdere sa vitičastim zagradama i osigurava da URL-ovi ostanu neizmenjeni.
- U slučaju neuspešne validacije, pokušava ponovo sa povratnom informacijom do 2 puta pre nego što zadrži postojeće vrednosti.

Pregledajte svoj lokal

- Dev server: `npm --prefix website run start`
- Posetite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Slanje

- Otvorite PR sa izmenjenim `code.json` fajlom(a). Držite izmene fokusiranim i uključite brz snimak ekrana kad je moguće.

---

### Saveti za bezbednost i konfiguraciju {#security-and-configuration-tips}

- Ne komitujte `sources/manifest.json` (privremeno se kreira tokom build-a)
- Održavajte `browser_specific_settings.gecko.id` stabilnim da biste sačuvali kanal za ažuriranje

---

### Trajnost podešavanja {#settings-persistence}

- Skladištenje: Sva korisnička podešavanja se nalaze u `storage.local` i opstaju kroz ažuriranja dodatka.
- Instalacija: Podrazumevane vrednosti se primenjuju samo kada ključ strogo nedostaje (undefined).
- Ažuriranje: Migracija popunjava samo nedostajuće ključeve; postojeće vrednosti se nikada ne prepisuju.
- Oznaka šeme: `settingsVersion` (trenutno `1`).
- Ključevi i podrazumevane vrednosti:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: videti `sources/background.js` → `initializeOrMigrateSettings()` i `SCHEMA_VERSION`.

Razvojni tok (dodavanje novog podešavanja)

- Uvećajte `SCHEMA_VERSION` u `sources/background.js`.
- Dodajte novi ključ + podrazumevanu vrednost u objekat `DEFAULTS` u `initializeOrMigrateSettings()`.
- Koristite pravilo "only-if-undefined" pri setovanju podrazumevanih vrednosti; ne prepisujte postojeće vrednosti.
- Ako je podešavanje vidljivo korisniku, povežite ga u `sources/options.js` i dodajte lokalizovane stringove.
- Dodajte/prilagodite testove (videti `tests/background.settings.migration.test.js`).

Saveti za ručno testiranje

- Simulirajte svežu instalaciju: obrišite direktorijum podataka ekstenzije ili krenite sa novim profilom.
- Simulirajte ažuriranje: postavite `settingsVersion` na `0` u `storage.local` i ponovo učitajte; potvrdite da postojeće vrednosti ostaju neizmenjene i da se dodaju samo nedostajući ključevi.

---

### Otklanjanje problema {#troubleshooting}

- Uverite se da je Thunderbird 128 ESR ili noviji
- Koristite konzolu grešaka za probleme u runtime-u
- Ako se čini da uskladištena podešavanja nisu pravilno primenjena, restartujte Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje kroz sesije; restart obezbeđuje učitavanje svežih podešavanja.)

---

### CI i pokrivenost {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) pokreće vitest sa pragovima pokrivenosti (85% lines/functions/branches/statements). Ako pragovi nisu ispunjeni, posao pada.
- Workflow otprema artefakt `coverage-html` sa HTML izveštajem; preuzmite ga sa stranice pokretanja (Actions → najskorije pokretanje → Artifacts).

---

### Doprinos {#contributing}

- Videti CONTRIBUTING.md za smernice o granama/commit-ovima/PR-ovima
- Savet: Kreirajte odvojen Thunderbird razvojni profil za testiranje kako biste izbegli uticaj na vaš svakodnevni profil.

---

### Prevodi

- Pokretanje velikih poslova prevođenja “sve → sve” može biti sporo i skupo. Počnite sa podskupom (npr. nekoliko dokumenata i 1–2 jezika), pregledajte rezultat, zatim proširite.

---

- Politika ponovnih pokušaja: poslovi prevođenja obavljaju do 3 ponovna pokušaja sa eksponencijalnim backoff-om pri API greškama; videti `scripts/translate_web_docs_batch.js` i `scripts/translate_web_docs_sync.js`.

Snimci ekrana za dokumentaciju

- Čuvajte slike pod `website/static/img/`.
- Referencirajte ih u MD/MDX preko `useBaseUrl('/img/<filename>')` kako bi putanje radile sa sajtom `baseUrl`.
- Nakon dodavanja ili preimenovanja slika pod `website/static/img/`, potvrdite da sve reference i dalje koriste `useBaseUrl('/img/…')` i da se renderuju u lokalnom pregledu.
  Favikone

- Više‑veličinski `favicon.ico` se generiše automatski u svim build putevima (Make + skripte) putem `website/scripts/build-favicon.mjs`.
- Nije potreban ručni korak; dovoljno je ažurirati `icon-*.png`.
  Savet za pregled

- Ostavite front‑matter `id` neizmenjen u prevedenim dokumentima; prevodite samo `title` i `sidebar_label` kada su prisutni.

#### clean {#mt-clean}

- Svrha: uklonite lokalne artefakte build/preview.
- Upotreba: `make clean`
- Uklanja (ako je prisutno):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Svrha: formatiranje, testiranje, ažuriranje changelog-a, commit i push.
- Upotreba: `make commit`
- Detalji: pokreće Prettier (write), `make test`, `make test_i18n`; dodaje changelog kada postoje stage-ovane izmene; šalje na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Svrha: pokretanje ESLint-a preko flat konfiguracije.
- Upotreba: `make eslint`

---

#### help {#mt-help}

- Svrha: ispis svih meta sa jednolinijskim opisima.
- Upotreba: `make help`

---

#### lint {#mt-lint}

- Svrha: lint-ujte MailExtension koristeći `web-ext`.
- Upotreba: `make lint`
- Napomene: privremeno kopira `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignoriše napravljene ZIP-ove; upozorenja ne obaraju proces.

---

#### menu {#mt-menu}

- Svrha: interaktivni meni za izbor Make mete i opcionih argumenata.
- Upotreba: pokrenite `make` bez argumenata.
- Napomene: ako `whiptail` nije dostupan, meni se vraća na `make help`.

---

#### pack {#mt-pack}

- Svrha: napravite ATN i LOCAL ZIP-ove (zavisi od `lint`).
- Upotreba: `make pack`
- Savet: povećajte verzije u oba `sources/manifest_*.json` pre pakovanja.

---

#### prettier {#mt-prettier}

- Svrha: formatirajte repozitorijum na licu mesta.
- Upotreba: `make prettier`

#### prettier_check {#mt-prettier_check}

- Svrha: verifikujte formatiranje (bez pisanja).
- Upotreba: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Svrha: alias za `prettier`.
- Upotreba: `make prettier_write`

---

#### test {#mt-test}

- Svrha: pokrenite Prettier (write), ESLint, zatim Vitest (coverage ako je instaliran).
- Upotreba: `make test`

#### test_i18n {#mt-test_i18n}

- Svrha: i18n-fokusirani testovi za stringove dodatka i dokumente sajta.
- Upotreba: `make test_i18n`
- Pokreće: `npm run test:i18n` i `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Svrha: prevođenje UI stringova dodatka iz EN u druge jezike.
- Upotreba: `make translation_app OPTS="--locales all|de,fr"`
- Napomene: čuva strukturu ključeva i placeholdere; loguje u `translation_app.log`. Skript forma: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Svrha: prevođenje dokumenata sajta iz `website/docs/*.md` u `website/i18n/<locale>/...`.
- Preporučeno: `translate_web_docs_batch` (OpenAI Batch API)
  - Upotreba (zastavice): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy pozicioni i dalje prihvaćen: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: pravi JSONL, otprema, proverava na svakih 30s, preuzima rezultate, piše fajlove.
- Napomena: batch posao može potrajati do 24 sata da se završi (prema OpenAI batch prozoru). Konzola prikazuje proteklo vreme pri svakoj proveri.
- Okruženje: `OPENAI_API_KEY` (obavezno), opciono `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (podrazumevano 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Upotreba (zastavice): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy pozicioni i dalje prihvaćen: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: sinhroni zahtevi po paru (bez batch agregacije).
- Napomene: Interaktivni upiti kada je `OPTS` izostavljen. Oba moda čuvaju code blokove/inline code i ostavljaju front‑matter `id` neizmenjen; loguje u `translation_web_batch.log` (batch) ili `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Svrha: prevođenje UI stringova sajta (početna, navigacioni bar, podnožje) iz `website/i18n/en/code.json` u sve jezike pod `website/i18n/<locale>/code.json` (isključujući `en`).
- Upotreba: `make translate_web_index` ili `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zahtevi: export `OPENAI_API_KEY` (opciono: `OPENAI_MODEL=gpt-4o-mini`).
- Ponašanje: validira strukturu JSON-a, čuva placeholdere sa vitičastim zagradama, ostavlja URL-ove neizmenjene i ponavlja sa povratnom informacijom pri greškama validacije.

---

#### web_build {#mt-web_build}

- Svrha: izgradnja sajta sa dokumentacijom u `website/build`.
- Upotreba: `make web_build OPTS="--locales en|de,en|all"` (ili postavite `BUILD_LOCALES="en de"`)
- Unutrašnjost: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Zavisnosti: pokreće `npm ci` u `website/` samo ako `website/node_modules/@docusaurus` nedostaje.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Svrha: provera linkova bez interneta.
- Upotreba: `make web_build_linkcheck OPTS="--locales en|all"`
- Napomene: gradi u `tmp_linkcheck_web_pages`; prepisuje GH Pages `baseUrl` u `/`; preskače udaljene HTTP(S) linkove.

#### web_build_local_preview {#mt-web_build_local_preview}

- Svrha: lokalni gh‑pages pregled sa opcionim testovima/proverom linkova.
- Upotreba: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ponašanje: prvo pokušava Node preview server (`scripts/preview-server.mjs`, podržava `/__stop`), vraća se na `python3 -m http.server`; servira na 8080–8090; PID na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Svrha: pošaljite `website/build` na granu `gh-pages`.
- Upotreba: `make web_push_github`

Savet: postavite `NPM=…` da promenite menadžer paketa koji koristi Makefile (podrazumevano je `npm`).

---
