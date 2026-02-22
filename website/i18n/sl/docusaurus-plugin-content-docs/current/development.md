---
id: development
title: 'Razvoj'
sidebar_label: 'Razvoj'
---

---

## Vodič za razvoj {#development-guide}

:::note Urejajte le angleško; prevodi se razširijo
Posodobite dokumentacijo samo pod `website/docs` (angleško). Prevodi pod `website/i18n/<locale>/…` so generirani in jih ne smete ročno urejati. Za osvežitev lokalizirane vsebine uporabite prevajalske naloge (npr. `make translate_web_docs_batch`).
:::

### Predpogoji {#prerequisites}

- Node.js 22+ in npm (preizkušeno z Node 22)
- Thunderbird 128 ESR ali novejši (za ročno testiranje)

---

### Struktura projekta (na visoki ravni) {#project-layout-high-level}

- Koren: pakirni skript `distribution_zip_packer.sh`, dokumentacija, posnetki zaslona
- `sources/`: glavna koda dodatka (ozadje, UI z nastavitvami/pojavnimi okni, manifesti, ikone)
- `tests/`: testna zbirka Vitest
- `website/`: Docusaurus dokumenti (z i18n pod `website/i18n/de/...`)

---

### Namestitev in orodja {#install-and-tooling}

- Namesti odvisnosti v korenu: `npm ci`
- Dokumentacija (neobvezno): `cd website && npm ci`
- Odkrij cilje: `make help`

---

### Živi razvoj (web‑ext run) {#live-dev-web-ext}

- Hiter cikel v Firefox Desktop (samo osnovni UI testi):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Zagon v Thunderbird (priporočeno za MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Namigi:
- Imejte odprto Thunderbirdovo Konzolo napak (Orodja → Orodja za razvijalce → Konzola napak).
- Strani dogodkov MV3 se v mirovanju zaustavijo; po spremembah kode znova naložite dodatek ali dovolite web‑ext samodejno ponovno nalaganje.
- Nekatera vedenja, značilna za Firefox, se razlikujejo; vedno preverite v Thunderbird za enakovrednost API.
- Poti do Thunderbird binarnih datotek (primeri):
- Linux: `thunderbird` (npr. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Izolacija profila: za razvoj uporabite ločen Thunderbird profil, da ne vplivate na vsakodnevno nastavitev.

---

### Make cilji (po abecedi) {#make-targets-alphabetical}

Makefile standardizira običajne razvojne poteke. Kadarkoli zaženite `make help` za enovrstični povzetek vsakega cilja.

Namig: zagon `make` brez cilja odpre preprost meni Whiptail za izbiro cilja.

| Cilj                                                     | Enovrstični opis                                                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Odstrani lokalne artefakte gradnje/predogleda (tmp/, web-local-preview/, website/build/).            |
| [`commit`](#mt-commit)                                   | Formatiranje, zagon testov (vklj. i18n), posodobitev dnevnika sprememb, commit in push.              |
| [`eslint`](#mt-eslint)                                   | Zaženi ESLint prek ravne konfiguracije (`npm run -s lint:eslint`).                                   |
| [`help`](#mt-help)                                       | Izpiše vse cilje z enovrstičnimi opisi (razvrščeno).                                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint na `sources/` (začasni manifest; prezre ZIP-e; neusodno).                               |
| [`menu`](#mt-menu)                                       | Interaktivni meni za izbiro cilja in neobveznih argumentov.                                          |
| [`pack`](#mt-pack)                                       | Zgradi ATN in LOCAL ZIP-e (zažene linter; pokliče pakirni skript).                                   |
| [`prettier`](#mt-prettier)                               | Formatira repozitorij na mestu (zapiše spremembe).                                                   |
| [`prettier_check`](#mt-prettier_check)                   | Prettier v preveritvenem načinu (brez zapisov); spodleti, če je potrebno preoblikovanje.             |
| [`prettier_write`](#mt-prettier_write)                   | Vzdevek za `prettier`.                                                                               |
| [`test`](#mt-test)                                       | Prettier (zapis), ESLint, nato Vitest (kritje, če je nastavljeno).                                   |
| [`test_i18n`](#mt-test_i18n)                             | Samo i18n testi: ohranjanje nadomestnih znakov/ujemanje v dodatku + ujemanje spletne strani.         |
| [`translate_app`](#mt-translation-app)                   | Vzdevek za `translation_app`.                                                                        |
| [`translation_app`](#mt-translation-app)                 | Prevedi niz UI aplikacije iz `sources/_locales/en/messages.json`.                                    |
| [`translate_web_docs_batch`](#mt-translation-web)        | Prevedi spletne dokumente prek OpenAI Batch API (priporočeno).                                       |
| [`translate_web_docs_sync`](#mt-translation-web)         | Prevedi spletne dokumente sinhrono (zastarelo, ne‑paketno).                                          |
| [`translate_web_index`](#mt-translation_web_index)       | Vzdevek za `translation_web_index`.                                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | Prevedi UI za domačo stran/vrhnjo vrstico/noga (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Zgradi dokumente v `website/build` (podpira `--locales` / `BUILD_LOCALES`).                          |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Preverjanje povezav, varno brez povezave (preskoči oddaljene HTTP[S]).                               |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokalni predogled gh‑pages; samodejno streže na 8080–8090; neobvezni testi/preverjanje povezav.      |
| [`web_push_github`](#mt-web_push_github)                 | Potisni `website/build` v vejo `gh-pages`.                                                           |

Sintaksa za možnosti

- Uporabite `make <command> OPTS="…"` za podajanje možnosti (priporočeni narekovaji). Vsak cilj spodaj prikazuje primer uporabe.

--

-

#### Namigi za gradnjo jezikovnih različic {#locale-build-tips}

- Zgradite podnabor jezikovnih različic: nastavite `BUILD_LOCALES="en de"` ali podajte `OPTS="--locales en,de"` spletnim ciljem.
- Predogled določene jezikovne različice: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Gradnja in pakiranje {#build-and-package}

- Zgradi ZIP-e: `make pack`
- Ustvari ATN in LOCAL ZIP-e v korenu repozitorija (artefaktov ne urejajte ročno)
- Namig: pred pakiranjem posodobite različico v `sources/manifest_ATN.json` in `sources/manifest_LOCAL.json`
- Ročna namestitev (dev): Thunderbird → Orodja → Dodatki in teme → zobnik → Namesti dodatek iz datoteke… → izberite zgrajeni ZIP

---

### Testiranje {#test}

- Celotna zbirka: `make test` (Vitest)
- Pokritost (neobvezno):
- `npm i -D @vitest/coverage-v8`
- Zaženite `make test`; odprite `coverage/index.html` za HTML poročilo
- Samo i18n: `make test_i18n` (ključi UI/nadomestni znaki/naslovi + ujemanje spletnega mesta po jeziku in dokumentu s preverjanji id/title/sidebar_label)

---

### Razhroščevanje in dnevniki {#debugging-and-logs}

- Konzola napak: Orodja → Orodja za razvijalce → Konzola napak
- Preklapljanje podrobnih dnevnikov med izvajanjem:
- Omogoči: `messenger.storage.local.set({ debug: true })`
- Onemogoči: `messenger.storage.local.set({ debug: false })`
- Dnevniki se prikazujejo med sestavljanjem/pošiljanjem odgovorov

---

### Dokumentacija (spletno mesto) {#docs-website}

- Razvojni strežnik: `cd website && npm run start`
- Zgradi statično mesto: `cd website && npm run build`
- Make ekvivalenti (po abecedi): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Primeri uporabe:
- Samo EN, preskoči teste/preverjanje povezav, brez potiska: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Vse jezikovne različice, s testi/preverjanjem povezav, nato potisk: `make web_build_local_preview && make web_push_github`
- Pred objavo zaženite preverjanje povezav, varno brez povezave: `make web_build_linkcheck`.
- i18n: Angleščina je v `website/docs/*.md`; nemški prevodi v `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Iskanje: Če so v CI nastavljene okoljske spremenljivke Algolia DocSearch (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), mesto uporablja iskanje Algolia; sicer pade nazaj na lokalno iskanje. Na domači strani pritisnite `/` ali `Ctrl+K` za odprtje iskalnega polja.

---

#### Pot preusmeritve za donacije {#donate-redirect}

- `website/src/pages/donate.js`
- Pot: `/donate` (in `/<locale>/donate`)
- Obnašanje:
- Če ima trenutna pot določeno jezikovno različico (npr. `/de/donate`), jo uporabi
- Sicer izberi najboljše ujemanje iz `navigator.languages` glede na nastavljene jezike; povrni se na privzeti jezik
- Preusmeri na:
- `en` → `/docs/donation`
- drugo → `/<locale>/docs/donation`
- Uporablja `useBaseUrl` za pravilno obravnavo baseUrl
- Vključuje meta refresh + povezavo `noscript` kot zasilno možnost

---

---

#### Namigi za predogled {#preview-tips}

- Čisto ustavite Node predogled: odprite `http://localhost:<port>/__stop` (izpiše se po `Local server started`).
- Če se slike v MDX/JSX ne naložijo, uporabite `useBaseUrl('/img/...')` za upoštevanje `baseUrl` spletnega mesta.
- Predogled se začne najprej; preverjanje povezav se zažene kasneje in ni blokirno (pokvarjene zunanje povezave ne ustavijo predogleda).
- Primer URL-ja predogleda: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (izpiše se po »Local server started«).
- Zunanje povezave v preverjanju: Nekatera zunanja mesta (npr. addons.thunderbird.net) blokirajo avtomatske pajke in lahko v preverjanju pokažejo 403. Predogled se vseeno zažene; to lahko varno prezrete.

---

#### Prevedite spletno mesto {#translate-website}

Kaj lahko prevedete

- Samo UI spletnega mesta: domača stran, navigacijska vrstica, noga in drugi UI nizi. Vsebina dokumentov za zdaj ostaja le v angleščini.

Kje urejati

- Uredite `website/i18n/<locale>/code.json` (uporabite `en` kot referenco). Ohranite nadomestne oznake, kot so `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`, nespremenjene.

Ustvarite ali osvežite datoteke

- Ustvari manjkajoče osnutke za vse jezike: `npm --prefix website run i18n:stubs`
- Prepiši osnutke iz angleščine (po dodajanju novih nizov): `npm --prefix website run i18n:stubs:force`
- Alternativa za posamezen jezik: `npx --prefix website docusaurus write-translations --locale <locale>`

Prevedi nize UI za domačo stran/navigacijo/nogo (OpenAI)

- Enkrat nastavite poverilnice (lupina ali .env):
- `export OPENAI_API_KEY=sk-...`
- Neobvezno: `export OPENAI_MODEL=gpt-4o-mini`
- Enkratno (vsi jeziki, brez en): `make translate_web_index`
- Omejite na določene jezike: `make translate_web_index OPTS="--locales de,fr"`
- Prepiši obstoječe vrednosti: `make translate_web_index OPTS="--force"`

Validacija in ponovni poskusi

- Skript za prevajanje validira obliko JSON, ohrani nadomestne oznake v zavitih oklepajih in zagotovi, da URL-ji ostanejo nespremenjeni.
- Ob neuspešni validaciji poskusi znova z odzivom do 2-krat, nato ohrani obstoječe vrednosti.

Predoglejte svojo jezikovno različico

- Razvojni strežnik: `npm --prefix website run start`
- Obiščite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Oddaja

- Odprite PR z urejenimi datotekami `code.json`. Ohranite spremembe osredotočene in po možnosti priložite hiter posnetek zaslona.

---

### Varnostni in konfiguracijski namigi {#security-and-configuration-tips}

- Ne committajte `sources/manifest.json` (gradnja ga začasno ustvari)
- Ohranite `browser_specific_settings.gecko.id` stabilen za ohranitev posodobitvenega kanala

---

### Obstojnost nastavitev {#settings-persistence}

- Shramba: Vse uporabniške nastavitve so v `storage.local` in ostanejo ohranjene med posodobitvami dodatka.
- Namestitev: Privzete vrednosti se uporabijo le, ko ključ strogo manjka (undefined).
- Posodobitev: Migracija zapolni le manjkajoče ključe; obstoječe vrednosti se nikoli ne prepišejo.
- Označevalnik sheme: `settingsVersion` (trenutno `1`).
- Ključi in privzete vrednosti:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Koda: glejte `sources/background.js` → `initializeOrMigrateSettings()` in `SCHEMA_VERSION`.

Razvojni potek (dodajanje nove nastavitve)

- Povečajte `SCHEMA_VERSION` v `sources/background.js`.
- Dodajte nov ključ + privzeto vrednost v objekt `DEFAULTS` v `initializeOrMigrateSettings()`.
- Pri nastavljanju privzetih vrednosti uporabite pravilo »samo-če-je-undefined«; ne prepisujte obstoječih vrednosti.
- Če je nastavitev vidna uporabniku, jo povežite v `sources/options.js` in dodajte lokalizirane nize.
- Dodajte/prilagodite teste (glejte `tests/background.settings.migration.test.js`).

Namigi za ročno testiranje

- Simulirajte svežo namestitev: počistite podatkovni imenik razširitve ali začnite z novim profilom.
- Simulirajte posodobitev: nastavite `settingsVersion` na `0` v `storage.local` in znova naložite; potrdite, da obstoječe vrednosti ostanejo nespremenjene in da se dodajo le manjkajoči ključi.

---

### Odpravljanje težav {#troubleshooting}

- Prepričajte se, da je Thunderbird 128 ESR ali novejši
- Za težave med izvajanjem uporabite Konzolo napak
- Če se zdi, da shranjene nastavitve niso pravilno uporabljene, znova zaženite Thunderbird in poskusite znova. (Thunderbird lahko predpomni stanje med sejami; ponovni zagon zagotovi nalaganje svežih nastavitev.)

---

### CI in pokritost {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) poganja vitest s pragovi pokritosti (85 % vrstic/funkcij/vej/izjav). Če pragovi niso doseženi, opravilo spodleti.
- Delovni tok naloži artefakt `coverage-html` z HTML poročilom; prenesite ga s strani izvajanja (Actions → zadnje izvajanje → Artifacts).

---

### Prispevanje {#contributing}

- Glejte CONTRIBUTING.md za smernice o vejah/commitu/PR
- Namig: Za testiranje ustvarite ločen razvojni profil Thunderbirda, da ne vplivate na svoj vsakodnevni profil.

---

### Prevodi

- Zaganjanje velikih prevajalskih opravil »vse → vse« je lahko počasno in drago. Začnite s podnaborom (npr. nekaj dokumentov in 1–2 jezika), pregledajte rezultat, nato razširite.

---

- Politika ponovnih poskusov: prevajalska opravila izvedejo do 3 ponovne poskuse z eksponentnim odmikom ob napakah API; glejte `scripts/translate_web_docs_batch.js` in `scripts/translate_web_docs_sync.js`.

Posnetki zaslona za dokumente

- Slike shranjujte pod `website/static/img/`.
- Navajajte jih v MD/MDX prek `useBaseUrl('/img/<filename>')`, da poti delujejo z `baseUrl` spletnega mesta.
- Po dodajanju ali preimenovanju slik pod `website/static/img/` potrdite, da vsi sklici še vedno uporabljajo `useBaseUrl('/img/…')` in se upodobijo v lokalnem predogledu.
  Favikone

- Večvelikostni `favicon.ico` se samodejno generira v vseh poteh gradnje (Make + skripti) prek `website/scripts/build-favicon.mjs`.
- Ročni korak ni potreben; dovolj je posodobiti `icon-*.png`.
  Namig za pregled

- Ohranite front‑matter `id` nespremenjen v prevedenih dokumentih; prevedite le `title` in `sidebar_label`, če sta prisotna.

#### clean {#mt-clean}

- Namen: odstraniti lokalne artefakte gradnje/predogleda.
- Uporaba: `make clean`
- Odstrani (če obstaja):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Namen: formatirati, testirati, posodobiti dnevnik sprememb, commit in push.
- Uporaba: `make commit`
- Podrobnosti: zažene Prettier (zapis), `make test`, `make test_i18n`; doda v dnevnik sprememb, ko so pripravljene spremembe; potisne v `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Namen: zagnati ESLint prek ravne konfiguracije.
- Uporaba: `make eslint`

---

#### help {#mt-help}

- Namen: izpisati vse cilje z enovrstičnimi opisi.
- Uporaba: `make help`

---

#### lint {#mt-lint}

- Namen: preveriti MailExtension z `web-ext`.
- Uporaba: `make lint`
- Opombe: začasno kopira `sources/manifest_LOCAL.json` → `sources/manifest.json`; prezre zgrajene ZIP-e; opozorila ne povzročijo padca cevovoda.

---

#### menu {#mt-menu}

- Namen: interaktivni meni za izbiro Make cilja in neobveznih argumentov.
- Uporaba: zaženite `make` brez argumentov.
- Opombe: če `whiptail` ni na voljo, meni pade nazaj na `make help`.

---

#### pack {#mt-pack}

- Namen: zgraditi ATN in LOCAL ZIP-e (odvisno od `lint`).
- Uporaba: `make pack`
- Namig: pred pakiranjem zvišajte različice v obeh `sources/manifest_*.json`.

---

#### prettier {#mt-prettier}

- Namen: formatirati repozitorij na mestu.
- Uporaba: `make prettier`

#### prettier_check {#mt-prettier_check}

- Namen: preveriti oblikovanje (brez zapisov).
- Uporaba: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Namen: vzdevek za `prettier`.
- Uporaba: `make prettier_write`

---

#### test {#mt-test}

- Namen: zagnati Prettier (zapis), ESLint, nato Vitest (pokritost, če je nameščena).
- Uporaba: `make test`

#### test_i18n {#mt-test_i18n}

- Namen: i18n-osredotočeni testi za nize dodatka in dokumente spletnega mesta.
- Uporaba: `make test_i18n`
- Poganja: `npm run test:i18n` in `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Namen: prevesti UI nize dodatka iz EN v druge jezike.
- Uporaba: `make translation_app OPTS="--locales all|de,fr"`
- Opombe: ohrani strukturo ključev in nadomestne oznake; zapisuje v `translation_app.log`. Oblika skripta: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Namen: prevesti dokumente spletnega mesta iz `website/docs/*.md` v `website/i18n/<locale>/...`.
- Prednostno: `translate_web_docs_batch` (OpenAI Batch API)
  - Uporaba (zastavice): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Zastareli pozicijski način je še vedno sprejet: `OPTS="<doc|all> <lang|all>"`
- Obnašanje: zgradi JSONL, naloži, preverja vsakih 30 s, prenese rezultate, zapiše datoteke.
- Opomba: paketna naloga se lahko zaključi šele v 24 urah (glede na paketno okno OpenAI). Konzola pri vsakem preverjanju pokaže pretečeni čas.
- Okolje: `OPENAI_API_KEY` (obvezno), neobvezno `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (privzeto 24 h), `BATCH_POLL_INTERVAL_MS`.
- Zastarelo: `translate_web_docs_sync`
  - Uporaba (zastavice): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Zastareli pozicijski način je še vedno sprejet: `OPTS="<doc|all> <lang|all>"`
- Obnašanje: sinhrone zahteve po parih (brez paketne agregacije).
- Opombe: Interaktivni pozivi, ko je `OPTS` izpuščen. Oba načina ohranita bloke kode/inline kodo in front‑matter `id` nespremenjen; zapisujeta v `translation_web_batch.log` (batch) ali `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Namen: prevesti UI nize spletnega mesta (domača stran, navigacija, noga) iz `website/i18n/en/code.json` v vse jezike pod `website/i18n/<locale>/code.json` (brez `en`).
- Uporaba: `make translate_web_index` ali `make translate_web_index OPTS="--locales de,fr [--force]"`
- Zahteve: export `OPENAI_API_KEY` (neobvezno: `OPENAI_MODEL=gpt-4o-mini`).
- Obnašanje: validira strukturo JSON, ohranja nadomestne oznake v zavitih oklepajih, ohrani URL-je nespremenjene in ob napakah validacije poskuša znova z odzivom.

---

#### web_build {#mt-web_build}

- Namen: zgraditi spletno mesto dokumentacije v `website/build`.
- Uporaba: `make web_build OPTS="--locales en|de,en|all"` (ali nastavite `BUILD_LOCALES="en de"`)
- Notranjost: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Odvisnosti: zažene `npm ci` v `website/` le, če `website/node_modules/@docusaurus` manjka.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Namen: preverjanje povezav, varno brez povezave.
- Uporaba: `make web_build_linkcheck OPTS="--locales en|all"`
- Opombe: zgradi v `tmp_linkcheck_web_pages`; prepiše GH Pages `baseUrl` v `/`; preskoči oddaljene HTTP(S) povezave.

#### web_build_local_preview {#mt-web_build_local_preview}

- Namen: lokalni predogled gh‑pages z neobveznimi testi/preverjanjem povezav.
- Uporaba: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Obnašanje: najprej poskusi strežnik za predogled Node (`scripts/preview-server.mjs`, podpira `/__stop`), nato pade nazaj na `python3 -m http.server`; streže na 8080–8090; PID pri `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Namen: potisniti `website/build` v vejo `gh-pages`.
- Uporaba: `make web_push_github`

Namig: nastavite `NPM=…` za preglasitev upravitelja paketov, ki ga uporablja Makefile (privzeto `npm`).

---
