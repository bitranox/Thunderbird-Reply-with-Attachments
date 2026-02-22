---
id: development
title: 'Razvoj'
sidebar_label: 'Razvoj'
---

---

## Vodič za razvoj {#development-guide}

:::note Uređujte samo englesku verziju; prijevodi se propagiraju
Ažurirajte dokumentaciju samo pod `website/docs` (engleski). Prijevodi pod `website/i18n/<locale>/…` generiraju se i ne bi ih trebalo uređivati ručno. Upotrijebite zadatke za prijevod (npr. `make translate_web_docs_batch`) za osvježavanje lokaliziranog sadržaja.
:::

### Preduvjeti {#prerequisites}

- Node.js 22+ i npm (testirano s Node 22)
- Thunderbird 128 ESR ili noviji (za ručno testiranje)

---

### Struktura projekta (na visokoj razini) {#project-layout-high-level}

- Korijen: skripta za pakiranje `distribution_zip_packer.sh`, dokumentacija, snimke zaslona
- `sources/`: glavni kôd dodatka (pozadina, UI opcija/skočnog prozora, manifesti, ikone)
- `tests/`: skup testova Vitest
- `website/`: Docusaurus dokumentacija (s i18n pod `website/i18n/de/...`)

---

### Instalacija i alati {#install-and-tooling}

- Instaliraj korijenske ovisnosti: `npm ci`
- Dokumentacija (neobavezno): `cd website && npm ci`
- Otkrij ciljeve: `make help`

---

### Razvoj uživo (web‑ext run) {#live-dev-web-ext}

- Brza petlja u Firefox Desktopu (samo osnovni UI testovi):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Pokreni u Thunderbirdu (preporučeno za MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Savjeti:
- Držite otvorenu Thunderbirdovu Konzolu pogrešaka (Alati → Alati za razvojne programere → Konzola pogrešaka).
- MV3 stranice s događajima suspendiraju se kada su neaktivne; ponovno učitajte dodatak nakon promjena u kodu ili dopustite da web‑ext automatski ponovno učita.
- Neka ponašanja specifična za Firefox razlikuju se; uvijek provjerite u Thunderbirdu radi pariteta API‑ja.
- Putanje binarki Thunderbirda (primjeri):
- Linux: `thunderbird` (npr. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolacija profila: koristite zaseban Thunderbird profil za razvoj kako biste izbjegli utjecaj na vašu svakodnevnu postavu.

---

### Make ciljevi (abecednim redom) {#make-targets-alphabetical}

Makefile standardizira uobičajene razvojne tokove. Pokrenite `make help` bilo kada za jednoredni sažetak svakog cilja.

Savjet: pokretanje `make` bez cilja otvara jednostavni Whiptail izbornik za odabir cilja.

| Cilj                                                     | Jednoredni opis                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ukloni lokalne artefakte izgradnje/pregleda (tmp/, web-local-preview/, website/build/).               |
| [`commit`](#mt-commit)                                   | Formatiraj, pokreni testove (uklj. i18n), ažuriraj dnevnik promjena, commitaj i pushaj.               |
| [`eslint`](#mt-eslint)                                   | Pokreni ESLint putem ravne konfiguracije (`npm run -s lint:eslint`).                                  |
| [`help`](#mt-help)                                       | Popiši sve ciljeve s jednorednim opisima (sortirano).                                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint nad `sources/` (privremeni manifest; ignorira ZIP‑ove; ne‑fatalno).                      |
| [`menu`](#mt-menu)                                       | Interaktivni izbornik za odabir cilja i neobaveznih argumenata.                                       |
| [`pack`](#mt-pack)                                       | Izgradi ATN i LOCAL ZIP‑ove (pokreće linter; poziva skriptu za pakiranje).                            |
| [`prettier`](#mt-prettier)                               | Formatira repozitorij na mjestu (zapisuje promjene).                                                  |
| [`prettier_check`](#mt-prettier_check)                   | Prettier u check modu (bez pisanja); pada ako je potrebno preformatiranje.                            |
| [`prettier_write`](#mt-prettier_write)                   | Alias za `prettier`.                                                                                  |
| [`test`](#mt-test)                                       | Prettier (pisanje), ESLint, zatim Vitest (pokrivenost ako je konfigurirano).                          |
| [`test_i18n`](#mt-test_i18n)                             | Samo i18n testovi: rezervirana mjesta/paritet dodatka + paritet web‑stranice.                         |
| [`translate_app`](#mt-translation-app)                   | Alias za `translation_app`.                                                                           |
| [`translation_app`](#mt-translation-app)                 | Prevedi UI stringove aplikacije iz `sources/_locales/en/messages.json`.                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | Prevedi web dokumentaciju putem OpenAI Batch API‑ja (preporučeno).                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Prevedi web dokumentaciju sinkrono (naslijeđeno, bez batcha).                                         |
| [`translate_web_index`](#mt-translation_web_index)       | Alias za `translation_web_index`.                                                                     |
| [`translation_web_index`](#mt-translation_web_index)     | Prevedi UI početne stranice/navigacije/podnožja (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Izgradi dokumente u `website/build` (podržava `--locales` / `BUILD_LOCALES`).                         |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Provjera poveznica sigurna za offline (preskače udaljene HTTP[S]).                                    |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokalni gh‑pages pregled; automatski poslužuje na 8080–8090; opcionalni testovi/provjera poveznica.   |
| [`web_push_github`](#mt-web_push_github)                 | Gurni `website/build` na granu `gh-pages`.                                                            |

Sintaksa za opcije

- Koristite `make <command> OPTS="…"` za prosljeđivanje opcija (preporučeni navodnici). Svaki cilj dolje prikazuje primjer upotrebe.

--

-

#### Savjeti za izgradnju za jezike {#locale-build-tips}

- Izgradite podskup lokalizacija: postavite `BUILD_LOCALES="en de"` ili proslijedite `OPTS="--locales en,de"` web ciljevima.
- Pregled određenog jezika: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Izgradnja i pakiranje {#build-and-package}

- Izgradite ZIP‑ove: `make pack`
- Stvara ATN i LOCAL ZIP‑ove u korijenu repozitorija (ne uređujte artefakte ručno)
- Savjet: ažurirajte verziju i u `sources/manifest_ATN.json` i u `sources/manifest_LOCAL.json` prije pakiranja
- Ručna instalacija (dev): Thunderbird → Alati → Dodaci i teme → zupčanik → Install Add‑on From File… → odaberite izgrađeni ZIP

---

### Testiranje {#test}

- Puni paket: `make test` (Vitest)
- Pokrivenost (neobavezno):
- `npm i -D @vitest/coverage-v8`
- Pokrenite `make test`; otvorite `coverage/index.html` za HTML izvješće
- Samo i18n: `make test_i18n` (UI ključevi/rezervirana mjesta/naslovi + paritet web‑stranice po jeziku i dokumentu s provjerama id/title/sidebar_label)

---

### Otklanjanje pogrešaka i logovi {#debugging-and-logs}

- Konzola pogrešaka: Alati → Alati za razvojne programere → Konzola pogrešaka
- Uključi/isključi opširne logove u izvođenju:
- Uključi: `messenger.storage.local.set({ debug: true })`
- Isključi: `messenger.storage.local.set({ debug: false })`
- Logovi se pojavljuju tijekom sastavljanja/slanja odgovora

---

### Dokumentacija (web‑stranica) {#docs-website}

- Razvojni poslužitelj: `cd website && npm run start`
- Izgradi statičku stranicu: `cd website && npm run build`
- Make ekvivalenti (abecedno): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Primjeri upotrebe:
- Samo EN, preskoči testove/provjeru poveznica, bez pushanja: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Svi jezici, s testovima/provjerom poveznica, zatim push: `make web_build_local_preview && make web_push_github`
- Prije objave pokrenite provjeru poveznica sigurnu za offline: `make web_build_linkcheck`.
- i18n: Engleski je u `website/docs/*.md`; njemački prijevodi u `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pretraživanje: Ako su Algolia DocSearch varijable okoline postavljene u CI‑ju (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), stranica koristi Algolia pretraživanje; u suprotnom se vraća na lokalno pretraživanje. Na početnoj stranici pritisnite `/` ili `Ctrl+K` za otvaranje okvira za pretraživanje.

---

#### Ruta preusmjeravanja donacija {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (i `/<locale>/donate`)
- Ponašanje:
- Ako trenutna ruta ima lokalitet (npr. `/de/donate`), upotrijebite ga
- Inače, odaberite najbolji podudarnik iz `navigator.languages` prema konfiguriranim jezicima; vratite se na zadani jezik
- Preusmjerava na:
- `en` → `/docs/donation`
- ostale → `/<locale>/docs/donation`
- Koristi `useBaseUrl` za ispravno rukovanje baseUrl‑om
- Uključuje meta refresh + `noscript` poveznicu kao rezervu

---

---

#### Savjeti za pregled {#preview-tips}

- Čisto zaustavite Node pregled: otvorite `http://localhost:<port>/__stop` (ispisano nakon `Local server started`).
- Ako se slike ne učitavaju u MDX/JSX, koristite `useBaseUrl('/img/...')` kako biste poštovali `baseUrl` web‑mjesta.
- Pregled započinje prvo; provjera poveznica pokreće se nakon i ne blokira (pokvarene vanjske poveznice neće zaustaviti pregled).
- Primjer URL‑a pregleda: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (ispisano nakon “Local server started”).
- Vanjske poveznice u provjeri poveznica: Neka vanjska web‑mjesta (npr. addons.thunderbird.net) blokiraju automatizirane crawlere i mogu prikazati 403 u provjerama poveznica. Pregled se i dalje pokreće; ovo je sigurno ignorirati.

---

#### Prevedite web‑stranicu {#translate-website}

Što možete prevesti

- Samo UI web‑stranice: početna stranica, navigacija, podnožje i ostali UI stringovi. Sadržaj dokumenata za sada ostaje samo na engleskom.

Gdje uređivati

- Uredite `website/i18n/<locale>/code.json` (koristite `en` kao referencu). Zadržite rezervirana mjesta poput `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` nepromijenjenima.

Generiranje ili osvježavanje datoteka

- Kreirajte nedostajuće stubove za sve jezike: `npm --prefix website run i18n:stubs`
- Prepišite stubove iz engleskog (nakon dodavanja novih stringova): `npm --prefix website run i18n:stubs:force`
- Alternativa za jedan jezik: `npx --prefix website docusaurus write-translations --locale <locale>`

Prevedite UI stringove početne stranice/navigacije/podnožja (OpenAI)

- Postavite vjerodajnice jednom (shell ili .env):
- `export OPENAI_API_KEY=sk-...`
- Neobavezno: `export OPENAI_MODEL=gpt-4o-mini`
- Jednokratno (svi jezici, bez en): `make translate_web_index`
- Ograniči na određene jezike: `make translate_web_index OPTS="--locales de,fr"`
- Prepiši postojeće vrijednosti: `make translate_web_index OPTS="--force"`

Validacija i ponovni pokušaji

- Skripta za prijevod validira oblik JSON‑a, čuva rezervirana mjesta u vitičastim zagradama i osigurava da URL‑ovi ostanu nepromijenjeni.
- U slučaju neuspjele validacije, pokušava ponovno s povratnom informacijom do 2 puta prije nego što zadrži postojeće vrijednosti.

Pregledajte svoj jezik

- Razvojni poslužitelj: `npm --prefix website run start`
- Posjetite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Slanje

- Otvorite PR s uređenim datotekama `code.json`. Održite promjene fokusiranima i uključite brzi screenshot kad je moguće.

---

### Savjeti za sigurnost i konfiguraciju {#security-and-configuration-tips}

- Ne committajte `sources/manifest.json` (privremeno stvoren tijekom izgradnje)
- Zadržite `browser_specific_settings.gecko.id` stabilnim kako biste sačuvali kanal ažuriranja

---

### Postojanost postavki {#settings-persistence}

- Pohrana: Sve korisničke postavke nalaze se u `storage.local` i ostaju postojane kroz ažuriranja dodatka.
- Instalacija: Zadane vrijednosti primjenjuju se samo kada ključ strogo nedostaje (undefined).
- Ažuriranje: Migracija popunjava samo nedostajuće ključeve; postojeće vrijednosti se nikada ne prepisuju.
- Oznaka sheme: `settingsVersion` (trenutno `1`).
- Ključevi i zadane vrijednosti:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: vidi `sources/background.js` → `initializeOrMigrateSettings()` i `SCHEMA_VERSION`.

Razvojni tijek rada (dodavanje nove postavke)

- Povećajte `SCHEMA_VERSION` u `sources/background.js`.
- Dodajte novi ključ + zadanu vrijednost u objekt `DEFAULTS` u `initializeOrMigrateSettings()`.
- Koristite pravilo "samo‑ako‑je‑undefined" pri inicijalnom postavljanju zadanih vrijednosti; ne prepisujte postojeće vrijednosti.
- Ako je postavka vidljiva korisniku, povežite je u `sources/options.js` i dodajte lokalizirane stringove.
- Dodajte/prilagodite testove (vidi `tests/background.settings.migration.test.js`).

Savjeti za ručno testiranje

- Simulirajte svježu instalaciju: obrišite direktorij podataka proširenja ili započnite s novim profilom.
- Simulirajte ažuriranje: postavite `settingsVersion` na `0` u `storage.local` i ponovno učitajte; potvrdite da postojeće vrijednosti ostaju nepromijenjene i da se dodaju samo nedostajući ključevi.

---

### Rješavanje problema {#troubleshooting}

- Provjerite da je Thunderbird 128 ESR ili noviji
- Koristite Konzolu pogrešaka za probleme u izvođenju
- Ako se čini da se pohranjene postavke ne primjenjuju pravilno, ponovno pokrenite Thunderbird i pokušajte ponovno. (Thunderbird može keširati stanje kroz sesije; ponovno pokretanje osigurava učitavanje svježih postavki.)

---

### CI i pokrivenost {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) pokreće vitest s pragovima pokrivenosti (85% linije/funkcije/grane/izrazi). Ako pragovi nisu ispunjeni, posao pada.
- Tijek rada učitava artefakt `coverage-html` s HTML izvješćem; preuzmite ga sa stranice pokretanja (Actions → najnovije pokretanje → Artifacts).

---

### Doprinos {#contributing}

- Pogledajte CONTRIBUTING.md za smjernice o granama/commitovima/PR‑ovima
- Savjet: Kreirajte zaseban Thunderbird razvojni profil za testiranje kako biste izbjegli utjecaj na svoj svakodnevni profil.

---

### Prijevodi

- Pokretanje velikih poslova prevođenja “sve → sve” može biti sporo i skupo. Započnite s podskupom (npr. nekoliko dokumenata i 1–2 jezika), pregledajte rezultat, zatim proširite.

---

- Politika ponovnih pokušaja: poslovi prijevoda izvode do 3 ponovna pokušaja s eksponencijalnim backoffom na pogreškama API‑ja; vidi `scripts/translate_web_docs_batch.js` i `scripts/translate_web_docs_sync.js`.

Snimke zaslona za dokumentaciju

- Pohranite slike pod `website/static/img/`.
- Referencirajte ih u MD/MDX putem `useBaseUrl('/img/<filename>')` kako bi putanje radile s `baseUrl` web‑mjesta.
- Nakon dodavanja ili preimenovanja slika pod `website/static/img/`, potvrdite da sve reference i dalje koriste `useBaseUrl('/img/…')` i da se renderiraju u lokalnom pregledu.
  Favikone

- Viševeličinski `favicon.ico` generira se automatski u svim putanjama izgradnje (Make + skripte) putem `website/scripts/build-favicon.mjs`.
- Nije potreban nikakav ručni korak; dovoljno je ažurirati `icon-*.png`.
  Savjet za pregled

- Zadržite front‑matter `id` nepromijenjen u prevedenim dokumentima; prevedite samo `title` i `sidebar_label` kada su prisutni.

#### clean {#mt-clean}

- Svrha: ukloniti lokalne artefakte izgradnje/pregleda.
- Upotreba: `make clean`
- Uklanja (ako je prisutno):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Svrha: formatirati, testirati, ažurirati dnevnik promjena, commitati i pushati.
- Upotreba: `make commit`
- Detalji: pokreće Prettier (pisanje), `make test`, `make test_i18n`; dodaje dnevnik promjena kada postoje postavljene razlike; push na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Svrha: pokrenuti ESLint putem ravne konfiguracije.
- Upotreba: `make eslint`

---

#### help {#mt-help}

- Svrha: popisati sve ciljeve s jednorednim opisima.
- Upotreba: `make help`

---

#### lint {#mt-lint}

- Svrha: lintati MailExtension koristeći `web-ext`.
- Upotreba: `make lint`
- Napomene: privremeno kopira `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorira izgrađene ZIP‑ove; upozorenja ne ruše pipeline.

---

#### menu {#mt-menu}

- Svrha: interaktivni izbornik za odabir Make cilja i neobaveznih argumenata.
- Upotreba: pokrenite `make` bez argumenata.
- Napomene: ako `whiptail` nije dostupan, izbornik se vraća na `make help`.

---

#### pack {#mt-pack}

- Svrha: izgraditi ATN i LOCAL ZIP‑ove (ovisi o `lint`).
- Upotreba: `make pack`
- Savjet: povećajte verzije u oba `sources/manifest_*.json` prije pakiranja.

---

#### prettier {#mt-prettier}

- Svrha: formatirati repozitorij na mjestu.
- Upotreba: `make prettier`

#### prettier_check {#mt-prettier_check}

- Svrha: provjeriti formatiranje (bez pisanja).
- Upotreba: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Svrha: alias za `prettier`.
- Upotreba: `make prettier_write`

---

#### test {#mt-test}

- Svrha: pokrenuti Prettier (pisanje), ESLint, zatim Vitest (pokrivenost ako je instalirana).
- Upotreba: `make test`

#### test_i18n {#mt-test_i18n}

- Svrha: i18n‑fokusirani testovi za stringove dodatka i dokumente web‑stranice.
- Upotreba: `make test_i18n`
- Pokreće: `npm run test:i18n` i `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Svrha: prevesti UI stringove dodatka iz EN u druge jezike.
- Upotreba: `make translation_app OPTS="--locales all|de,fr"`
- Napomene: čuva strukturu ključeva i rezervirana mjesta; zapisuje u `translation_app.log`. Skripta: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Svrha: prevesti web dokumente iz `website/docs/*.md` u `website/i18n/<locale>/...`.
- Preferirano: `translate_web_docs_batch` (OpenAI Batch API)
  - Upotreba (zastavice): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Naslijeđeni pozicijski se i dalje prihvaća: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: gradi JSONL, učitava, provjerava svakih 30 s, preuzima rezultate, zapisuje datoteke.
- Napomena: batch posao može potrajati do 24 sata (prema OpenAI prozoru). Konzola prikazuje proteklo vrijeme pri svakoj provjeri.
- Okolina: `OPENAI_API_KEY` (obavezno), neobavezno `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (zadano 24h), `BATCH_POLL_INTERVAL_MS`.
- Naslijeđeno: `translate_web_docs_sync`
  - Upotreba (zastavice): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Naslijeđeni pozicijski se i dalje prihvaća: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: sinkrone zahtjeve po paru (bez batch agregacije).
- Napomene: Interaktivni upiti kada je `OPTS` izostavljen. Oba moda čuvaju blokove koda/inline kôd i ostavljaju front‑matter `id` nepromijenjenim; zapisuje u `translation_web_batch.log` (batch) ili `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Svrha: prevesti UI stringove web‑stranice (početna, navigacija, podnožje) iz `website/i18n/en/code.json` na sve jezike pod `website/i18n/<locale>/code.json` (isključujući `en`).
- Upotreba: `make translate_web_index` ili `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zahtjevi: izvezite `OPENAI_API_KEY` (neobavezno: `OPENAI_MODEL=gpt-4o-mini`).
- Ponašanje: validira JSON strukturu, čuva rezervirana mjesta u vitičastim zagradama, zadržava URL‑ove nepromijenjenima i ponovno pokušava s povratnim informacijama na greške validacije.

---

#### web_build {#mt-web_build}

- Svrha: izgraditi web stranicu dokumentacije u `website/build`.
- Upotreba: `make web_build OPTS="--locales en|de,en|all"` (ili postavite `BUILD_LOCALES="en de"`)
- Unutarnje: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Ovisnosti: pokreće `npm ci` u `website/` samo ako `website/node_modules/@docusaurus` nedostaje.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Svrha: provjera poveznica sigurna za offline.
- Upotreba: `make web_build_linkcheck OPTS="--locales en|all"`
- Napomene: gradi u `tmp_linkcheck_web_pages`; prepisuje GH Pages `baseUrl` u `/`; preskače udaljene HTTP(S) poveznice.

#### web_build_local_preview {#mt-web_build_local_preview}

- Svrha: lokalni gh‑pages pregled s neobaveznim testovima/provjerom poveznica.
- Upotreba: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ponašanje: najprije pokušava Node preview poslužitelj (`scripts/preview-server.mjs`, podržava `/__stop`), vraća se na `python3 -m http.server`; poslužuje na 8080–8090; PID na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Svrha: gurnuti `website/build` na granu `gh-pages`.
- Upotreba: `make web_push_github`

Savjet: postavite `NPM=…` za nadjačavanje upravitelja paketa kojeg koristi Makefile (zadano je `npm`).

---
