---
id: development
title: 'Razvoj'
sidebar_label: 'Razvoj'
---

---

## Vodič za razvoj {#development-guide}

:::note Uređujte samo engleski; prijevodi se prenose
Ažurirajte dokumentaciju samo pod `website/docs` (engleski). Prijevodi pod `website/i18n/<locale>/…` se generiraju i ne treba ih ručno uređivati. Koristite zadatke prevođenja (npr. `make translate_web_docs_batch`) da osvježite lokalizirani sadržaj.
:::

### Preduvjeti {#prerequisites}

- Node.js 22+ i npm (testirano s Node 22)
- Thunderbird 128 ESR ili noviji (za ručno testiranje)

---

### Struktura projekta (visokog nivoa) {#project-layout-high-level}

- Root: skripta za pakiranje `distribution_zip_packer.sh`, dokumentacija, snimke ekrana
- `sources/`: glavni kod dodatka (pozadina, UI za opcije/iskočni prozor, manifesti, ikone)
- `tests/`: Vitest skup
- `website/`: Docusaurus dokumenti (s i18n pod `website/i18n/de/...`)

---

### Instalacija i alati {#install-and-tooling}

- Instalirajte korijenske zavisnosti: `npm ci`
- Dokumentacija (opcionalno): `cd website && npm ci`
- Otkrijte ciljeve: `make help`

---

### Razvoj uživo (web‑ext run) {#live-dev-web-ext}

- Brza petlja u Firefox Desktopu (samo osnovni UI testovi):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Pokreni u Thunderbirdu (preferirano za MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Savjeti:
- Držite Thunderbirdovu Konzolu grešaka otvorenom (Alati → Razvojni alati → Konzola grešaka).
- MV3 event stranice se suspendiraju kada miruju; ponovno učitajte dodatak nakon izmjena koda ili dopustite web‑ext automatsko ponovno učitavanje.
- Neka ponašanja specifična za Firefox se razlikuju; uvijek provjerite u Thunderbirdu radi usklađenosti API‑ja.
- Putanje Thunderbird binarija (primjeri):
- Linux: `thunderbird` (npr. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolacija profila: koristite poseban Thunderbird profil za razvoj kako biste izbjegli utjecaj na vašu svakodnevnu postavu.

---

### Make mete (abecedno) {#make-targets-alphabetical}

Makefile standardizira uobičajene razvojne tokove. Pokrenite `make help` u bilo kojem trenutku za jednoredni sažetak svake mete.

Savjet: pokretanje `make` bez mete otvara jednostavan Whiptail meni za odabir mete.

| Meta                                                     | Jednoredni opis                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ukloni lokalne artefakte builda/pregleda (tmp/, web-local-preview/, website/build/).                  |
| [`commit`](#mt-commit)                                   | Formatiraj, pokreni testove (uklj. i18n), ažuriraj changelog, commit i push.                          |
| [`eslint`](#mt-eslint)                                   | Pokreni ESLint preko flat configa (`npm run -s lint:eslint`).                                         |
| [`help`](#mt-help)                                       | Prikaži sve mete s jednorednim opisima (sortirano).                                                   |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (privremeni manifest; ignoriše ZIP‑ove; ne‑fatalno).                       |
| [`menu`](#mt-menu)                                       | Interaktivni meni za odabir mete i opcionalnih argumenata.                                            |
| [`pack`](#mt-pack)                                       | Izgradi ATN i LOCAL ZIP‑ove (pokreće linter; poziva skriptu za pakiranje).                            |
| [`prettier`](#mt-prettier)                               | Formatiraj repozitorij na licu mjesta (upisuje promjene).                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier u check režimu (bez upisa); pada ako je potrebno preformatiranje.                            |
| [`prettier_write`](#mt-prettier_write)                   | Pseudonim za `prettier`.                                                                              |
| [`test`](#mt-test)                                       | Prettier (upis), ESLint, zatim Vitest (pokrivenost ako je konfigurirana).                             |
| [`test_i18n`](#mt-test_i18n)                             | Samo i18n testovi: zamjenska mjesta/usklađenost dodatka + usklađenost web‑stranice.                   |
| [`translate_app`](#mt-translation-app)                   | Pseudonim za `translation_app`.                                                                       |
| [`translation_app`](#mt-translation-app)                 | Prevedi UI stringove aplikacije iz `sources/_locales/en/messages.json`.                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | Prevedi web dokumente putem OpenAI Batch API‑ja (preporučeno).                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Prevedi web dokumente sinhrono (naslijeđeno, bez batcha).                                             |
| [`translate_web_index`](#mt-translation_web_index)       | Pseudonim za `translation_web_index`.                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Prevedi UI početne stranice/navigacije/podnožja (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Izgradi dokumente u `website/build` (podržava `--locales` / `BUILD_LOCALES`).                         |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Provjera linkova sigurna za offline (preskače udaljene HTTP[S]).                                      |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokalni gh‑pages pregled; automatsko serviranje na 8080–8090; opcionalni testovi/provjera linkova.    |
| [`web_push_github`](#mt-web_push_github)                 | Gurni `website/build` na granu `gh-pages`.                                                            |

Sintaksa za opcije

- Koristite `make <command> OPTS="…"` za prosljeđivanje opcija (preporučeni navodnici). Svaka meta ispod prikazuje primjer upotrebe.

--

-

#### Savjeti za gradnju lokalizacija {#locale-build-tips}

- Gradite podskup jezika: postavite `BUILD_LOCALES="en de"` ili proslijedite `OPTS="--locales en,de"` web metama.
- Pregledajte određeni jezik: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Izgradnja i pakiranje {#build-and-package}

- Izgradite ZIP‑ove: `make pack`
- Proizvodi ATN i LOCAL ZIP‑ove u rootu repozitorija (ne uređujte artefakte ručno)
- Savjet: ažurirajte verziju i u `sources/manifest_ATN.json` i u `sources/manifest_LOCAL.json` prije pakiranja
- Ručna instalacija (dev): Thunderbird → Alati → Dodaci i teme → zupčanik → Instaliraj dodatak iz datoteke… → odaberite izgrađeni ZIP

---

### Testiranje {#test}

- Cijeli skup: `make test` (Vitest)
- Pokrivenost (opcionalno):
- `npm i -D @vitest/coverage-v8`
- Pokrenite `make test`; otvorite `coverage/index.html` za HTML izvještaj
- Samo i18n: `make test_i18n` (UI ključevi/zamjene/naslovi + usklađenost web‑stranice po jeziku i dokumentu s provjerama id/title/sidebar_label)

---

### Otklanjanje grešaka i logovi {#debugging-and-logs}

- Konzola grešaka: Alati → Razvojni alati → Konzola grešaka
- Uključivanje/isključivanje detaljnih logova u runtimeu:
- Omogući: `messenger.storage.local.set({ debug: true })`
- Onemogući: `messenger.storage.local.set({ debug: false })`
- Logovi se pojavljuju tokom sastavljanja/slanja odgovora

---

### Dokumentacija (web-stranica) {#docs-website}

- Dev server: `cd website && npm run start`
- Izgradi statičku stranicu: `cd website && npm run build`
- Make ekvivalenti (abecedno): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Primjeri upotrebe:
- Samo EN, preskoči testove/provjeru linkova, bez push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Svi jezici, s testovima/provjerom linkova, zatim push: `make web_build_local_preview && make web_push_github`
- Prije objave, pokrenite provjeru linkova sigurnu za offline: `make web_build_linkcheck`.
- i18n: Engleski je u `website/docs/*.md`; njemački prijevodi u `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pretraga: Ako su Algolia DocSearch varijable okruženja postavljene u CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), stranica koristi Algolia pretragu; inače pada na lokalnu pretragu. Na početnoj stranici pritisnite `/` ili `Ctrl+K` da otvorite polje za pretragu.

---

#### Ruta za preusmjeravanje donacija {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (i `/<locale>/donate`)
- Ponašanje:
- Ako trenutna ruta ima jezik (npr. `/de/donate`), koristi ga
- Inače, izaberi najbolji par između `navigator.languages` i konfiguriranih jezika; u suprotnom koristi podrazumijevani jezik
- Preusmjerava na:
- `en` → `/docs/donation`
- ostalo → `/<locale>/docs/donation`
- Koristi `useBaseUrl` za pravilno rukovanje baseUrl‑om
- Uključuje meta refresh + `noscript` link kao rezervu

---

---

#### Savjeti za pregled {#preview-tips}

- Zaustavite Node pregled čisto: otvorite `http://localhost:<port>/__stop` (ispisano nakon `Local server started`).
- Ako se slike ne učitavaju u MDX/JSX, koristite `useBaseUrl('/img/...')` da poštujete `baseUrl` stranice.
- Pregled se prvo pokreće; provjera linkova se pokreće nakon toga i ne blokira (pokvareni vanjski linkovi neće zaustaviti pregled).
- Primjer URL‑a pregleda: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (ispisano nakon “Local server started”).
- Vanjski linkovi u provjeri: Neke vanjske stranice (npr. addons.thunderbird.net) blokiraju automatizirane crawlere i mogu prikazati 403 u provjerama linkova. Pregled se i dalje pokreće; ovo je sigurno ignorirati.

---

#### Prevedite web-stranicu {#translate-website}

Šta možete prevesti

- Samo web UI: početna stranica, navigacija, podnožje i drugi UI stringovi. Sadržaj dokumenata za sada ostaje samo na engleskom.

Gdje uređivati

- Uredite `website/i18n/<locale>/code.json` (koristite `en` kao referencu). Ostavite zamjenska mjesta poput `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` nepromijenjenim.

Generišite ili osvježite datoteke

- Kreirajte nedostajuće stubove za sve jezike: `npm --prefix website run i18n:stubs`
- Prepišite stubove iz engleskog (nakon dodavanja novih stringova): `npm --prefix website run i18n:stubs:force`
- Alternativa za jedan jezik: `npx --prefix website docusaurus write-translations --locale <locale>`

Prevedite UI stringove početne/navigacije/podnožja (OpenAI)

- Postavite akreditive jednom (shell ili .env):
- `export OPENAI_API_KEY=sk-...`
- Opcionalno: `export OPENAI_MODEL=gpt-4o-mini`
- Jednokratno (svi jezici, osim en): `make translate_web_index`
- Ograničite na određene jezike: `make translate_web_index OPTS="--locales de,fr"`
- Prepišite postojeće vrijednosti: `make translate_web_index OPTS="--force"`

Validacija i ponovni pokušaji

- Skripta za prijevod validira strukturu JSON‑a, čuva zamjenska mjesta u vitičastim zagradama i osigurava da URL‑ovi ostanu nepromijenjeni.
- Ako validacija ne uspije, pokušava ponovo s povratnom informacijom do 2 puta prije nego zadrži postojeće vrijednosti.

Pregledajte svoj jezik

- Dev server: `npm --prefix website run start`
- Posjetite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Slanje

- Otvorite PR s izmijenjenim `code.json` datotekama. Neka promjene budu fokusirane i uključite brzi screenshot kada je moguće.

---

### Sigurnosni i konfiguracijski savjeti {#security-and-configuration-tips}

- Nemojte committati `sources/manifest.json` (privremeno kreiran buildom)
- Održavajte `browser_specific_settings.gecko.id` stabilnim da biste sačuvali kanal ažuriranja

---

### Postojanost postavki {#settings-persistence}

- Pohrana: Sve korisničke postavke nalaze se u `storage.local` i ostaju sačuvane kroz ažuriranja dodatka.
- Instalacija: Zadane vrijednosti se primjenjuju samo kada ključ striktno nedostaje (undefined).
- Ažuriranje: Migracija popunjava samo nedostajuće ključeve; postojeće vrijednosti se nikada ne prepisuju.
- Oznaka sheme: `settingsVersion` (trenutno `1`).
- Ključevi i zadane vrijednosti:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: vidi `sources/background.js` → `initializeOrMigrateSettings()` i `SCHEMA_VERSION`.

Razvojni tijek (dodavanje nove postavke)

- Povećajte `SCHEMA_VERSION` u `sources/background.js`.
- Dodajte novi ključ + zadanu vrijednost u objekt `DEFAULTS` u `initializeOrMigrateSettings()`.
- Koristite pravilo „only‑if‑undefined” pri inicijalnom postavljanju zadanih vrijednosti; ne prepisujte postojeće vrijednosti.
- Ako je postavka vidljiva korisniku, povežite je u `sources/options.js` i dodajte lokalizirane stringove.
- Dodajte/prilagodite testove (vidi `tests/background.settings.migration.test.js`).

Savjeti za ručno testiranje

- Simulirajte svježu instalaciju: očistite direktorij podataka ekstenzije ili počnite s novim profilom.
- Simulirajte ažuriranje: postavite `settingsVersion` na `0` u `storage.local` i ponovo učitajte; potvrdite da postojeće vrijednosti ostaju nepromijenjene i da su dodani samo nedostajući ključevi.

---

### Rješavanje problema {#troubleshooting}

- Provjerite da je Thunderbird 128 ESR ili noviji
- Koristite Konzolu grešaka za probleme u izvođenju
- Ako se čini da pohranjene postavke nisu pravilno primijenjene, restartujte Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje kroz sesije; restart osigurava učitavanje svježih postavki.)

---

### CI i pokrivenost {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) pokreće vitest s pragovima pokrivenosti (85% linija/funkcija/grana/izjava). Ako pragovi nisu ispunjeni, posao ne uspijeva.
- Tijek rada učitava artefakt `coverage-html` s HTML izvještajem; preuzmite ga sa stranice pokretanja (Actions → najnovije pokretanje → Artifacts).

---

### Doprinos {#contributing}

- Pogledajte CONTRIBUTING.md za smjernice o granama/commitima/PR‑ovima
- Savjet: Kreirajte zaseban Thunderbird razvojni profil za testiranje kako biste izbjegli utjecaj na vaš dnevni profil.

---

### Prijevodi

- Pokretanje velikih poslova prevođenja „sve → sve” može biti sporo i skupo. Počnite s podskupom (npr. nekoliko dokumenata i 1–2 jezika), pregledajte rezultat, zatim proširite.

---

- Politika ponovnih pokušaja: poslovi prevođenja izvode do 3 pokušaja s eksponencijalnim odmakom pri API greškama; vidi `scripts/translate_web_docs_batch.js` i `scripts/translate_web_docs_sync.js`.

Snimke ekrana za dokumente

- Pohranite slike pod `website/static/img/`.
- Referencirajte ih u MD/MDX preko `useBaseUrl('/img/<filename>')` kako bi putanje radile s `baseUrl` stranice.
- Nakon dodavanja ili preimenovanja slika pod `website/static/img/`, potvrdite da sve reference i dalje koriste `useBaseUrl('/img/…')` i da se prikazuju u lokalnom pregledu.
  Favikone

- Višedimenzionalni `favicon.ico` generira se automatski u svim build putevima (Make + skripte) putem `website/scripts/build-favicon.mjs`.
- Nije potreban ručni korak; dovoljno je ažurirati `icon-*.png`.
  Savjet za pregled

- Zadržite front‑matter `id` nepromijenjenim u prevedenim dokumentima; prevodite samo `title` i `sidebar_label` kada su prisutni.

#### clean {#mt-clean}

- Svrha: ukloniti lokalne artefakte builda/pregleda.
- Upotreba: `make clean`
- Uklanja (ako postoji):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Svrha: formatirati, testirati, ažurirati changelog, commit i push.
- Upotreba: `make commit`
- Detalji: pokreće Prettier (upis), `make test`, `make test_i18n`; dodaje u changelog kada postoje staged razlike; push-a na `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Svrha: pokrenuti ESLint preko flat konfiguracije.
- Upotreba: `make eslint`

---

#### help {#mt-help}

- Svrha: navesti sve mete s jednorednim opisima.
- Upotreba: `make help`

---

#### lint {#mt-lint}

- Svrha: lintati MailExtension koristeći `web-ext`.
- Upotreba: `make lint`
- Napomene: privremeno kopira `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorira izgrađene ZIP‑ove; upozorenja ne ruše cjevovod.

---

#### menu {#mt-menu}

- Svrha: interaktivni meni za odabir Make mete i opcionalnih argumenata.
- Upotreba: pokrenite `make` bez argumenata.
- Napomene: ako `whiptail` nije dostupan, meni pada na `make help`.

---

#### pack {#mt-pack}

- Svrha: izgraditi ATN i LOCAL ZIP‑ove (ovisi o `lint`).
- Upotreba: `make pack`
- Savjet: povećajte verzije u oba `sources/manifest_*.json` prije pakiranja.

---

#### prettier {#mt-prettier}

- Svrha: formatirati repozitorij na licu mjesta.
- Upotreba: `make prettier`

#### prettier_check {#mt-prettier_check}

- Svrha: verificirati formatiranje (bez upisa).
- Upotreba: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Svrha: pseudonim za `prettier`.
- Upotreba: `make prettier_write`

---

#### test {#mt-test}

- Svrha: pokrenuti Prettier (upis), ESLint, zatim Vitest (pokrivenost ako je instalirana).
- Upotreba: `make test`

#### test_i18n {#mt-test_i18n}

- Svrha: i18n‑fokusirani testovi za stringove dodatka i web dokumente.
- Upotreba: `make test_i18n`
- Pokreće: `npm run test:i18n` i `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Svrha: prevesti UI stringove dodatka s EN na druge jezike.
- Upotreba: `make translation_app OPTS="--locales all|de,fr"`
- Napomene: čuva strukturu ključeva i zamjenska mjesta; logira u `translation_app.log`. Skripta: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Svrha: prevesti web dokumente iz `website/docs/*.md` u `website/i18n/<locale>/...`.
- Preporučeno: `translate_web_docs_batch` (OpenAI Batch API)
  - Upotreba (zastavice): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Naslijeđena pozicijska sintaksa je i dalje prihvaćena: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: gradi JSONL, učitava, provjerava svakih 30 s, preuzima rezultate, zapisuje datoteke.
- Napomena: batch posao može trajati do 24 sata (prema OpenAI prozoru za batch). Konzola prikazuje proteklo vrijeme pri svakoj provjeri.
- Okruženje: `OPENAI_API_KEY` (obavezno), opcionalno `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (zadano 24h), `BATCH_POLL_INTERVAL_MS`.
- Naslijeđeno: `translate_web_docs_sync`
  - Upotreba (zastavice): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Naslijeđena pozicijska sintaksa je i dalje prihvaćena: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: sinhroni zahtjevi po paru (bez batch agregacije).
- Napomene: Interaktivni upiti kada je `OPTS` izostavljen. Oba moda čuvaju blokove koda/inline kod i ostavljaju front‑matter `id` nepromijenjenim; logira u `translation_web_batch.log` (batch) ili `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Svrha: prevesti UI stringove web‑stranice (početna, navigacija, podnožje) iz `website/i18n/en/code.json` u sve jezike pod `website/i18n/<locale>/code.json` (isključujući `en`).
- Upotreba: `make translate_web_index` ili `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zahtjevi: export `OPENAI_API_KEY` (opcionalno: `OPENAI_MODEL=gpt-4o-mini`).
- Ponašanje: validira strukturu JSON‑a, čuva zamjenska mjesta u vitičastim zagradama, ostavlja URL‑ove nepromijenjene i ponovo pokušava s povratnim informacijama pri greškama validacije.

---

#### web_build {#mt-web_build}

- Svrha: izgraditi stranicu dokumentacije u `website/build`.
- Upotreba: `make web_build OPTS="--locales en|de,en|all"` (ili postavite `BUILD_LOCALES="en de"`)
- Unutrašnjost: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Zavisnosti: pokreće `npm ci` u `website/` samo ako `website/node_modules/@docusaurus` nedostaje.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Svrha: provjera linkova sigurna za offline.
- Upotreba: `make web_build_linkcheck OPTS="--locales en|all"`
- Napomene: gradi u `tmp_linkcheck_web_pages`; prepisuje GH Pages `baseUrl` u `/`; preskače udaljene HTTP(S) linkove.

#### web_build_local_preview {#mt-web_build_local_preview}

- Svrha: lokalni gh‑pages pregled s opcionalnim testovima/provjerom linkova.
- Upotreba: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ponašanje: prvo pokušava Node server za pregled (`scripts/preview-server.mjs`, podržava `/__stop`), zatim pada na `python3 -m http.server`; servira na 8080–8090; PID na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Svrha: push `website/build` na granu `gh-pages`.
- Upotreba: `make web_push_github`

Savjet: postavite `NPM=…` da biste nadjačali upravitelja paketa kojeg koristi Makefile (po zadanom `npm`).

---
