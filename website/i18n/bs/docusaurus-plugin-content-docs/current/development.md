---
id: development
title: 'Razvoj'
sidebar_label: 'Razvoj'
---

## Razvojni Vodič {#development-guide}

:::note Uredite samo na engleskom; prevodi se prenose
Ažurirajte dokumentaciju **samo** pod `website/docs` (engleski). Prevodi pod `website/i18n/<locale>/…` se generiraju i ne trebaju se ručno uređivati. Koristite zadatke prevođenja (npr. `make translate_web_docs_batch`) za osvježavanje lokaliziranog sadržaja.
:::

### Uslovi {#prerequisites}

- Node.js 22+ i npm (testirano sa Node 22)
- Thunderbird 128 ESR ili noviji (za ručno testiranje)

---

### Raspored projekta (visoki nivo) {#project-layout-high-level}

- Koren: skripta za pakovanje `distribution_zip_packer.sh`, dokumentacija, snimke ekrana
- `sources/`: glavni kod dodatka (pozadina, opcije/popup UI, manifesti, ikone)
- `tests/`: Vitest paket
- `website/`: Docusaurus dokumentacija (sa i18n pod `website/i18n/de/...`)

---

### Instalacija i alati {#install-and-tooling}

- Instalirajte glavne zavisnosti: `npm ci`
- Dokumentacija (opcionalno): `cd website && npm ci`
- Otkrijte ciljeve: `make help`

---

### Živi razvoj (web‑ext run) {#live-dev-web-ext}

- Brza petlja u Firefox Desktop (samo UI dimne testove):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Pokrenite u Thunderbirdu (preporučuje se za MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Savjeti:
- Držite otvorenu Thunderbirdovu konzolu za greške (Alati → Razvojni alati → Konzola za greške).
- MV3 event stranice su suspendovane kada su neaktivne; ponovo učitajte dodatak posle izmjena u kodu ili dozvolite web‑ext automatsko ponovno učitavanje.
- Neka se ponašanja koja su samo za Firefox razlikuju; uvijek provjerite u Thunderbirdu radi pariteta API-ja.
- Putanje binarnih datoteka Thunderbirda (primjeri):
- Linux: `thunderbird` (npr. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolacija profila: Koristite poseban Thunderbird profil za razvoj kako biste izbjegli uticaj na vašu svakodnevnu postavku.

---

### Ciljevi izrade (abecedno) {#make-targets-alphabetical}

Makefile standardizuje uobičajene razvojne tokove. Pokrenite `make help` u bilo kojem trenutku za sažetak svake oznake.

Savjet: pokretanje `make` bez cilja otvara jednostavni Whiptail meni za odabir cilja.

| Cilj                                                     | Jedna linija opis                                                                                     |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Uklonite lokalne artefakte izrade/pregleda (tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | Formatirajte, pokrenite testove (uključujući i18n), ažurirajte changelog, komitujte & učitajte.       |
| [`eslint`](#mt-eslint)                                   | Pokrenite ESLint putem ravnog konfiguracijskog datoteke (`npm run -s lint:eslint`).                   |
| [`help`](#mt-help)                                       | Ispisujte sve ciljeve sa jednom linijom dokumenata (sortirano).                                       |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (privremeni manifest; ignorira ZIP‑ove; ne‑fatalno).                       |
| [`menu`](#mt-menu)                                       | Interaktivni meni za odabir cilja i opcionalnih argumenata.                                           |
| [`pack`](#mt-pack)                                       | Izgradite ATN & LOCAL ZIP-ove (pokreće linter; poziva skriptu pakera).                                |
| [`prettier`](#mt-prettier)                               | Formatirajte repozitorij na licu mjesta (upisuje promjene).                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier u načinu provjere (bez pisanja); neuspijeva ako je potrebno ponovo formatirati.              |
| [`prettier_write`](#mt-prettier_write)                   | Alias za `prettier`.                                                                                  |
| [`test`](#mt-test)                                       | Prettier (upis), ESLint, zatim Vitest (pokriće ako je konfigurirano).                                 |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑samo testovi: dodaci oznake/paritet + paritet stranice po lokalitetu po dokumentu.               |
| [`translate_app`](#mt-translation-app)                   | Alias za `translation_app`.                                                                           |
| [`translation_app`](#mt-translation-app)                 | Prevedite UI stringove aplikacije sa `sources/_locales/en/messages.json`.                             |
| [`translate_web_docs_batch`](#mt-translation-web)        | Prevedite dokumente web stranica putem OpenAI Batch API (preporučeno).                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | Prevedite dokumente web stranica sinhronizovano (legacy, ne-batch).                                   |
| [`translate_web_index`](#mt-translation_web_index)       | Alias za `translation_web_index`.                                                                     |
| [`translation_web_index`](#mt-translation_web_index)     | Prevedite UI `website/i18n/en/code.json → .../<lang>/code.json` (početna stranica/navigation/footer). |
| [`web_build`](#mt-web_build)                             | Izgradite dokumente u `website/build` (podržava `--locales` / `BUILD_LOCALES`).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑sigurna provjera linkova (preskočite udaljene HTTP[S]).                                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokalni pregled gh‑pages; automatski poslužite na 8080–8090; opcionalni testovi/provjera linkova.     |
| [`web_push_github`](#mt-web_push_github)                 | Poništite `website/build` u `gh-pages` granu.                                                         |

Sintaksa za opcije

- Koristite `make <command> OPTS="…"` za prosljeđivanje opcija (citatni znakovi su preporučeni). Svaka oznaka u nastavku prikazuje primjer korištenja.

--

-

#### Savjeti za izgradnju lokaliteta {#locale-build-tips}

- Izgradite podskup lokaliteta: postavite `BUILD_LOCALES="en de"` ili proslijedite `OPTS="--locales en,de"` u web ciljeve.
- Pregled specifičnog lokaliteta: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Izgradite i paketirajte {#build-and-package}

- Izgradite ZIP-ove: `make pack`
- Proizvodi ATN i LOCAL ZIP-ove u korijenu repozitorija (ne uređujte artefakte ručno)
- Savjet: ažurirajte verziju u oba `sources/manifest_ATN.json` i `sources/manifest_LOCAL.json` prije pakovanja
- Ručna instalacija (razvoj): Thunderbird → Alati → Dodaci i Temi → zupčanik → Instaliraj dodatak iz datoteke… → odaberite izgrađeni ZIP

---

### Test {#test}

- Potpuni paket: `make test` (Vitest)
- Pokriće (opcionalno):
- `npm i -D @vitest/coverage-v8`
- Pokrenite `make test`; otvorite `coverage/index.html` za HTML izvještaj
- i18n samo: `make test_i18n` (UI ključevi/placeholderi/naslovi + paritet stranice po lokalitetu po dokumentu prema ID/naslova/sidebar_label provjerama)

---

### Debugging i zapisi {#debugging-and-logs}

- Konzola grešaka: Alati → Razvojni alati → Konzola grešaka
- Prebacite detaljne zapise u vrijeme izvođenja:
- Omogućiti: `messenger.storage.local.set({ debug: true })`
- Onemogućiti: `messenger.storage.local.set({ debug: false })`
- Zapisi se pojavljuju dok se sastavljaju/šalju odgovori

---

### Dokumenti (web stranica) {#docs-website}

- Razvojni server: `cd website && npm run start`
- Izgradite statičku stranicu: `cd website && npm run build`
- Napravite ekvivalente (abecedno): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Primjeri korištenja:
- EN samo, preskočite testove/provjeru linkova, bez učitavanja: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Svi lokaliteti, sa testovima/provjerom linkova, zatim učitajte: `make web_build_local_preview && make web_push_github`
- Prije objavljivanja, pokrenite offline‑sigurnu provjeru linkova: `make web_build_linkcheck`.
- i18n: Engleski se nalazi u `website/docs/*.md`; Njemački prevodi u `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pretraga: Ako su Algolia DocSearch env varijable postavljene u CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), stranica koristi Algolia pretragu; inače se vraća na lokalnu pretragu. Na početnoj stranici, pritisnite `/` ili `Ctrl+K` da otvorite pretraživač.

---

#### Putanja za preusmjeravanje donacija {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (i `/<locale>/donate`)
- Ponašanje:
- Ako trenutna ruta ima lokalitet (npr. `/de/donate`), koristite ga
- Inače, odaberite najbolju podudarnost između `navigator.languages` i konfigurisanih lokaliteta; vratite se na zadani lokalitet
- Preusmjerava na:
- `en` → `/docs/donation`
- ostali → `/<locale>/docs/donation`
- Koristi `useBaseUrl` za pravilno rukovanje baseUrl-om
- Uključuje meta refresh + `noscript` link kao rezervu

---

---

#### Savjeti za pregled {#preview-tips}

- Zaustavite pregled Node-a uredno: otvorite `http://localhost:<port>/__stop` (ispisano nakon `Local server started`).
- Ako slike ne učitavaju u MDX/JSX, koristite `useBaseUrl('/img/...')` da biste poštovali `baseUrl` stranice.
- Pregled se pokreće prvi; provjera linkova se izvršava kasnije i nije blokirajuća (pokvareni spoljašnji linkovi neće zaustaviti pregled).
- URL primjera pregleda: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (ispisano nakon “Lokalni server pokrenut”).
- Spoljašnji linkovi u provjeri linkova: Neki spoljašnji sajtovi (npr. addons.thunderbird.net) blokiraju automatizovane pretraživače i mogu pokazati 403 u provjeri linkova. Pregled se i dalje pokreće; ovo se može ignorisati.

---

#### Prevedite web stranicu {#translate-website}

Šta možete prevesti

- Samo UI web stranice: početna stranica, navigacija, podnožje i drugi UI stringovi. Sadržaj dokumentacije ostaje samo na engleskom za sada.

Gdje uređivati

- Uredite `website/i18n/<locale>/code.json` (koristite `en` kao referencu). Držite placeholder-e kao `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` nepromijenjene.

Generišite ili osvježite datoteke

- Kreirajte nedostajuće stubove za sve lokalitete: `npm --prefix website run i18n:stubs`
- Prepišite stubove sa engleskog (nakon dodavanja novih stringova): `npm --prefix website run i18n:stubs:force`
- Alternativa za jedan lokalitet: `npx --prefix website docusaurus write-translations --locale <locale>`

Prevedite stringove UI početne stranice/navigacije/podnožja (OpenAI)

- Postavite vjerodajnice jednom (shell ili .env):
- `export OPENAI_API_KEY=sk-...`
- Opcionalno: `export OPENAI_MODEL=gpt-4o-mini`
- Jednokratno (svi lokaliteti, preskočite en): `make translate_web_index`
- Ograničite se na specifične lokalitete: `make translate_web_index OPTS="--locales de,fr"`
- Prepišite postojeće vrijednosti: `make translate_web_index OPTS="--force"`

Validacija i ponovni pokušaji

- Skripta za prevođenje validira JSON oblik, čuva placeholders u vitičastim zagradama i osigurava da su URL-ovi nepromijenjeni.
- U slučaju neuspeha validacije, ponovo pokušava sa povratnim informacijama do 2 puta pre nego što zadrži postojeće vrijednosti.

Pregledajte svoj lokalitet

- Dev server: `npm --prefix website run start`
- Posjetite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Podnošenje

- Otvorite PR sa uređenom `code.json` datotekom. Držite izmjene fokusirane i uključite brzi snimak kad god je to moguće.

---

### Savjeti za sigurnost i konfiguraciju {#security-and-configuration-tips}

- Ne komitujte `sources/manifest.json` (privremeno kreirani od gradnje)
- Održavajte `browser_specific_settings.gecko.id` stabilnim kako biste sačuvali kanal ažuriranja

---

### Održavanje postavki {#settings-persistence}

- Skladište: Sve korisničke postavke žive u `storage.local` i ostaju sačuvane kroz ažuriranja dodatka.
- Instalacija: Zadane postavke se primjenjuju samo kada ključ strogo nedostaje (neodređeno).
- Ažuriranje: Migracija popunjava samo nedostajuće ključeve; postojeće vrijednosti nikada se ne prepisuju.
- Oznaka sheme: `settingsVersion` (trenutno `1`).
- Ključevi i zadate vrijednosti:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: vidjeti `sources/background.js` → `initializeOrMigrateSettings()` i `SCHEMA_VERSION`.

Razvojni tok rada (dodavanje nove postavke)

- Uvećajte `SCHEMA_VERSION` u `sources/background.js`.
- Dodajte novi ključ + zadatu vrijednost u `DEFAULTS` objekt u `initializeOrMigrateSettings()`.
- Koristite pravilo "samo ako je neodređeno" kada seedujete zadatke; nemojte prepisivati postojeće vrijednosti.
- Ako je postavka vidljiva korisnicima, povežite je u `sources/options.js` i dodajte lokalizirane stringove.
- Dodajte/izmijenite testove (vidjeti `tests/background.settings.migration.test.js`).

Savjeti za manualno testiranje

- Simulirajte svježu instalaciju: očistite direktorij podataka proširenja ili započnite s novim profilom.
- Simulirajte ažuriranje: postavite `settingsVersion` na `0` u `storage.local` i ponovo učitajte; potvrdite da postojeće vrijednosti ostaju nepromijenjene i da su dodani samo nedostajući ključevi.

---

### Rješavanje problema {#troubleshooting}

- Osigurajte da je Thunderbird 128 ESR ili noviji
- Koristite konzolu grešaka za probleme pri izvođenju
- Ako se pohranjene postavke ne primjenjuju ispravno, ponovo pokrenite Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje kroz sesije; ponovno pokretanje osigurava da se učitaju nove postavke.)

---

### CI i pokriće {#ci-and-coverage}

- GitHub Akcije (`CI — Tests`) pokreću vitest sa pragovima pokrića (85% redova/funkcija/grana/statements). Ako pragovi nisu ispunjeni, posao ne uspijeva.
- Radni tok učitava artefakt `coverage-html` sa HTML izvještajem; preuzmite ga sa stranice izvršenja (Akcije → posljednje izvršenje → Artefakti).

---

### Doprinos {#contributing}

- Pogledajte CONTRIBUTING.md za smjernice o granama/commitima/PR-ima
- Savjet: Kreirajte odvojeni Thunderbird razvojni profil za testiranje kako ne biste uticali na svoj svakodnevni profil.

---

### Prevođenje

- Pokretanje velikih "svi → svi" poslova prevođenja može biti sporo i skupo. Započnite sa podskupom (npr. nekim dokumentima i 1-2 lokaliteta), pregledajte rezultat, a zatim proširite.

---

- Politika ponovnog pokušaja: poslovi prevođenja izvode do 3 ponovna pokušaja s eksponencijalnim povratkom na greške u API-ju; vidi `scripts/translate_web_docs_batch.js` i `scripts/translate_web_docs_sync.js`.

Snimke ekrana za dokumente

- Pohranite slike pod `website/static/img/`.
- Referencirajte ih u MD/MDX putem `useBaseUrl('/img/<filename>')` tako da putanje rade sa `baseUrl` stranice.
- Nakon dodavanja ili preimenovanja slika pod `website/static/img/`, potvrdite da sve reference još uvijek koriste `useBaseUrl('/img/…')` i prikazuju se u lokalnom pregledu.
  Favicons

- Višedimenzionalni `favicon.ico` automatski se generira u svim putanjama izgradnje (Napravite + skripte) putem `website/scripts/build-favicon.mjs`.
- Nema potrebe za ručnom radnjom; ažuriranje `icon-*.png` je dovoljno.
  Savjet o pregledu

- Održavajte prednje stanje `id` nepromijenjeno u prevedenim dokumentima; prevedite samo `title` i `sidebar_label` kada su prisutni.

#### clean {#mt-clean}

- Svrha: uklonite lokalne artefakte izrade/pregleda.
- Upotreba: `make clean`
- Uklanja (ako je prisutno):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Svrha: formatirajte, testirajte, ažurirajte changelog, komitujte i učitajte.
- Upotreba: `make commit`
- Detalji: pokreće Prettier (upis), `make test`, `make test_i18n`; dodaje changelog kada postoje izmjene u svakom redu; učitava u `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Svrha: pokrenite ESLint putem ravnog konfiguracijskog datoteke.
- Upotreba: `make eslint`

---

#### help {#mt-help}

- Svrha: ispiši sve ciljeve sa jednom linijom dokumenata.
- Upotreba: `make help`

---

#### lint {#mt-lint}

- Svrha: lint MailExtension koristeći `web-ext`.
- Upotreba: `make lint`
- Napomene: privremeno kopira `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorira izgrađene ZIP-ove; upozorenja ne neuspijevaju pipeline.

---

#### menu {#mt-menu}

- Svrha: interaktivni meni za odabir Make cilja i opcionalnih argumenata.
- Upotreba: pokrenite `make` bez argumenata.
- Napomene: ako `whiptail` nije dostupan, meni se vraća na `make help`.

---

#### pack {#mt-pack}

- Svrha: izgradite ATN i LOCAL ZIP-ove (zavisno od `lint`).
- Upotreba: `make pack`
- Savjet: uvećajte verzije u `sources/manifest_*.json` pre pakovanja.

---

#### prettier {#mt-prettier}

- Svrha: formatirati repozitorij na licu mjesta.
- Upotreba: `make prettier`

#### prettier_check {#mt-prettier_check}

- Svrha: verificirati formatiranje (bez pisanja).
- Upotreba: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Svrha: alias za `prettier`.
- Upotreba: `make prettier_write`

---

#### test {#mt-test}

- Svrha: pokrenuti Prettier (upis), ESLint, zatim Vitest (pokriće ako je instalirano).
- Upotreba: `make test`

#### test_i18n {#mt-test_i18n}

- Svrha: i18n‑fokusirani testovi za stringove dodataka i dokumente web stranice.
- Upotreba: `make test_i18n`
- Pokreće: `npm run test:i18n` i `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Svrha: prevesti UI stringove dodatka sa EN na druge jezike.
- Upotreba: `make translation_app OPTS="--locales all|de,fr"`
- Napomene: čuva strukturu ključeva i placeholder-e; zapisuje u `translation_app.log`. Forma skripte: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Svrha: prevesti dokumente web stranica sa `website/docs/*.md` u `website/i18n/<locale>/...`.
- Preporučeno: `translate_web_docs_batch` (OpenAI Batch API)
  - Upotreba (flage): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy pozivni parametar je i dalje prihvaćen: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: gradi JSONL, učitava, kontroliše svake 30s, preuzima rezultate, piše datoteke.
- Napomena: posao obrade može potrajati do 24 sata da se završi (prema OpenAI-ovom vremenskom okviru za obradu). Konzola prikazuje proteklo vreme na svakoj kontroli.
- Env: `OPENAI_API_KEY` (obavezno), opcionalno `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (zadano 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Upotreba (flage): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy pozivni parametar je i dalje prihvaćen: `OPTS="<doc|all> <lang|all>"`
- Ponašanje: sinhroni zahtevi po pack-ima (bez agregacije paketa).
- Napomene: Interaktivni upiti kada je `OPTS` izostavljen. Oba načina čuvaju blokove koda/inline kod i drže prednju oznaku `id` nepromijenjenu; zapisuje u `translation_web_batch.log` (batch) ili `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Svrha: prevesti UI stringove web stranice (početna stranica, navigacija, podnožje) sa `website/i18n/en/code.json` na sve lokalitete pod `website/i18n/<locale>/code.json` (izuzimajući `en`).
- Upotreba: `make translate_web_index` ili `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zahtjevi: izvoz `OPENAI_API_KEY` (opcionalno: `OPENAI_MODEL=gpt-4o-mini`).
- Ponašanje: validira strukturu JSON-a, čuva placeholdere, drži URL-ove nepromijenjenim i ponavlja sa povratnim informacijama o greškama validacije.

---

#### web_build {#mt-web_build}

- Svrha: izgraditi stranicu dokumentacije u `website/build`.
- Upotreba: `make web_build OPTS="--locales en|de,en|all"` (ili postavite `BUILD_LOCALES="en de"`)
- Interni detalji: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Zavisnosti: pokreće `npm ci` u `website/` samo ako `website/node_modules/@docusaurus` nedostaje.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Svrha: offline‑sigurna provjera linkova.
- Upotreba: `make web_build_linkcheck OPTS="--locales en|all"`
- Napomene: gradi do `tmp_linkcheck_web_pages`; prepisuje GH Pages `baseUrl` u `/`; preskoči udaljene HTTP(S) linkove.

#### web_build_local_preview {#mt-web_build_local_preview}

- Svrha: lokalni pregled gh‑stranica sa opcionalnim testovima/provjerom linkova.
- Upotreba: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Ponašanje: prvo pokušava Node pregled server (`scripts/preview-server.mjs`, podržava `/__stop`), vraća se na `python3 -m http.server`; poslužuje na 8080–8090; PID na `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Svrha: učitajte `website/build` u `gh-pages` granu.
- Upotreba: `make web_push_github`

Savjet: postavite `NPM=…` da biste prepisali upravitelja paketa koji koristi Makefile (zadano `npm`).

---
