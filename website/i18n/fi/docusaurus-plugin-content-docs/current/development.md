---
id: development
title: 'Kehitys'
sidebar_label: 'Kehitys'
---

---

## Kehitysopas {#development-guide}

:::note Muokkaa vain englanninkielistä versiota; käännökset päivittyvät
Päivitä dokumentaatio vain hakemistossa `website/docs` (englanti). Käännökset hakemiston `website/i18n/<locale>/…` alla generoidaan, eikä niitä tule muokata käsin. Käytä käännöstehtäviä (esim. `make translate_web_docs_batch`) päivittääksesi lokalisoidun sisällön.
:::

### Esivaatimukset {#prerequisites}

- Node.js 22+ ja npm (testattu Node 22:lla)
- Thunderbird 128 ESR tai uudempi (manuaalitestausta varten)

---

### Projektin rakenne (ylätason) {#project-layout-high-level}

- Juurihakemisto: pakkausskripti `distribution_zip_packer.sh`, dokumentaatio, kuvakaappaukset
- `sources/`: lisäosan varsinainen koodi (taustaprosessi, asetukset/ponnahdus-UI, manifestit, ikonit)
- `tests/`: Vitest-testikokonaisuus
- `website/`: Docusaurus-dokumentaatio (i18n hakemistossa `website/i18n/de/...`)

---

### Asennus ja työkalut {#install-and-tooling}

- Asenna juuren riippuvuudet: `npm ci`
- Dokumentaatio (valinnainen): `cd website && npm ci`
- Listaa kohteet: `make help`

---

### Live-kehitys (web‑ext run) {#live-dev-web-ext}

- Nopea kehityssilmukka Firefox Desktopissa (vain UI-smoketestit):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Aja Thunderbirdissä (suositeltu MailExtensioneille):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Vinkkejä:
- Pidä Thunderbirdin Virhekonsoli auki (Työkalut → Kehittäjätyökalut → Virhekonsoli).
- MV3-tapahtumasivut keskeytetään joutokäynnillä; lataa lisäosa uudelleen koodimuutosten jälkeen tai anna web‑extin ladata se automaattisesti uudelleen.
- Jotkin vain Firefoxissa esiintyvät käyttäytymiset poikkeavat; varmista aina Thunderbirdissä API-yhteensopivuus.
- Thunderbirdin binaaripolut (esimerkkejä):
- Linux: `thunderbird` (esim. `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profiilin eristäminen: Käytä erillistä Thunderbird-profiilia kehitykseen, jotta päivittäinen ympäristösi ei häiriinny.

---

### Make-kohteet (aakkosjärjestyksessä) {#make-targets-alphabetical}

Makefile yhtenäistää yleiset kehitysprosessit. Aja `make help` milloin tahansa saadaksesi yhden rivin yhteenvedon jokaisesta kohteesta.

Vinkki: suorittamalla `make` ilman kohdetta avautuu yksinkertainen Whiptail-valikko kohteen valintaan.

| Kohde                                                    | Yhden rivin kuvaus                                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Poista paikalliset buildi-/esikatseluartefaktit (tmp/, web-local-preview/, website/build/).                  |
| [`commit`](#mt-commit)                                   | Muotoile, aja testit (ml. i18n), päivitä changelog, tee commit ja pushaa.                                    |
| [`eslint`](#mt-eslint)                                   | Aja ESLint flat-konfigilla (`npm run -s lint:eslint`).                                                       |
| [`help`](#mt-help)                                       | Listaa kaikki kohteet yhden rivin kuvauksin (lajiteltuna).                                                   |
| [`lint`](#mt-lint)                                       | web‑ext lint kohteessa `sources/` (väliaikainen manifesti; ohittaa ZIPit; ei fataali).                       |
| [`menu`](#mt-menu)                                       | Interaktiivinen valikko kohteen ja valinnaisten argumenttien valintaan.                                      |
| [`pack`](#mt-pack)                                       | Rakenna ATN- ja LOCAL-ZIPit (ajaa linterin; kutsuu pakkausskriptin).                                         |
| [`prettier`](#mt-prettier)                               | Muotoile repo paikallaan (kirjoittaa muutokset).                                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier tarkistustilassa (ei kirjoituksia); epäonnistuu, jos uudelleenmuotoilu tarpeen.                     |
| [`prettier_write`](#mt-prettier_write)                   | Alias komennolle `prettier`.                                                                                 |
| [`test`](#mt-test)                                       | Prettier (kirjoitus), ESLint, sitten Vitest (kattavuus jos konfiguroitu).                                    |
| [`test_i18n`](#mt-test_i18n)                             | Vain i18n-testit: lisäosan placeholderit/pariteetti + verkkosivuston pariteetti.                             |
| [`translate_app`](#mt-translation-app)                   | Alias komennolle `translation_app`.                                                                          |
| [`translation_app`](#mt-translation-app)                 | Käännä sovelluksen UI-merkkijonot lähteestä `sources/_locales/en/messages.json`.                             |
| [`translate_web_docs_batch`](#mt-translation-web)        | Käännä sivuston dokumentaatio OpenAI Batch API:n kautta (suositeltu).                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Käännä sivuston dokumentaatio synkronisesti (perinteinen, ei-batch).                                         |
| [`translate_web_index`](#mt-translation_web_index)       | Alias komennolle `translation_web_index`.                                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | Käännä etusivu/yläpalkki/alapalkki UI (`website/i18n/en/code.json → .../<lang>/code.json`).                  |
| [`web_build`](#mt-web_build)                             | Rakenna dokumentaatio kohteeseen `website/build` (tukee `--locales` / `BUILD_LOCALES`).                      |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline-turvallinen linkkitarkistus (ohittaa etä-HTTP[S]-osoitteet).                                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Paikallinen gh‑pages-esikatselu; automaattipalvelu porteissa 8080–8090; valinnainen testaus/linkkitarkistus. |
| [`web_push_github`](#mt-web_push_github)                 | Pushaa `website/build` haaraan `gh-pages`.                                                                   |

Valitsimien syntaksi

- Käytä `make <command> OPTS="…"` valitsimien välittämiseen (lainausmerkit suositeltavia). Jokaisella alla olevalla kohteella on esimerkkikäyttö.

--

-

#### Kielikohtaisten buildien vinkit {#locale-build-tips}

- Rakenna vain osa kielistä: aseta `BUILD_LOCALES="en de"` tai välitä `OPTS="--locales en,de"` web-kohteille.
- Esikatsele tietty kieli: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Package {#build-and-package}

- Rakenna ZIPit: `make pack`
- Tuottaa ATN- ja LOCAL-ZIPit repoon juureen (älä muokkaa artefakteja käsin)
- Vinkki: päivitä versio sekä `sources/manifest_ATN.json`:ssa että `sources/manifest_LOCAL.json`:ssa ennen paketointia
- Manuaalinen asennus (dev): Thunderbird → Työkalut → Lisäosat ja teemat → ratas → Asenna lisäosa tiedostosta… → valitse rakennettu ZIP

---

### Testaus {#test}

- Täysi paketti: `make test` (Vitest)
- Kattavuus (valinnainen):
- `npm i -D @vitest/coverage-v8`
- Aja `make test`; avaa `coverage/index.html` HTML-raporttia varten
- Vain i18n: `make test_i18n` (UI-avaimet/placeholderit/otsikot + sivuston kieli- ja dokumenttikohtainen pariteetti id/title/sidebar_label -tarkistuksilla)

---

### Debuggaus ja lokit {#debugging-and-logs}

- Virhekonsoli: Työkalut → Kehittäjätyökalut → Virhekonsoli
- Vaihda yksityiskohtaisten lokien tila ajonaikana:
- Ota käyttöön: `messenger.storage.local.set({ debug: true })`
- Poista käytöstä: `messenger.storage.local.set({ debug: false })`
- Lokit näkyvät viestejä laatiessa/lähetettäessä

---

### Dokumentaatio (verkkosivusto) {#docs-website}

- Kehityspalvelin: `cd website && npm run start`
- Rakenna staattinen sivusto: `cd website && npm run build`
- Make-vastineet (aakkosjärjestyksessä): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Käyttöesimerkkejä:
- Vain EN, ohita testit/linkkitarkistus, ei pushausta: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Kaikki kielet, testeillä/linkkitarkistuksella, sitten pushaus: `make web_build_local_preview && make web_push_github`
- Ennen julkaisua, aja offline-turvallinen linkkitarkistus: `make web_build_linkcheck`.
- i18n: Englanti sijaitsee hakemistossa `website/docs/*.md`; saksankieliset käännökset hakemistossa `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Haku: Jos Algolia DocSearch -ympäristömuuttujat on asetettu CI:ssä (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), sivusto käyttää Algolia-hakua; muuten se palaa paikalliseen hakuun. Etusivulla avaa hakukenttä painamalla `/` tai `Ctrl+K`.

---

#### Lahjoitus-uudelleenohjausreitti {#donate-redirect}

- `website/src/pages/donate.js`
- Reitti: `/donate` (ja `/<locale>/donate`)
- Toiminta:
- Jos nykyisellä reitillä on kieli (esim. `/de/donate`), käytä sitä
- Muussa tapauksessa valitse paras osuma `navigator.languages` vs. konfiguroidut kielet; palaa oletuskieleen, jos ei löydy
- Uudelleenohjaa:
- `en` → `/docs/donation`
- muut → `/<locale>/docs/donation`
- Käyttää `useBaseUrl` oikeaoppiseen baseUrl-käsittelyyn
- Sisältää meta refreshin + `noscript` -linkin varajärjestelynä

---

---

#### Esikatseluvinkit {#preview-tips}

- Pysäytä Node-esikatselu siististi: avaa `http://localhost:<port>/__stop` (tulostuu `Local server started` jälkeen).
- Jos kuvat eivät lataudu MDX/JSX:ssä, käytä `useBaseUrl('/img/...')` kunnioittaaksesi sivuston `baseUrl`:a.
- Esikatselu käynnistyy ensin; linkkitarkistus ajetaan sen jälkeen eikä estä esikatselua (rikki olevat ulkoiset linkit eivät pysäytä esikatselua).
- Esimerkkiesikatselu-URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (tulostuu “Local server started” -viestin jälkeen).
- Ulkoiset linkit linkkitarkistuksessa: Jotkin ulkoiset sivustot (esim. addons.thunderbird.net) estävät automaattiset crawlerit ja voivat näyttää 403-linkkitarkistuksissa. Esikatselu käynnistyy silti; nämä voi turvallisesti sivuuttaa.

---

#### Käännä verkkosivusto {#translate-website}

Mitä voit kääntää

- Vain sivuston käyttöliittymä: etusivu, yläpalkki, alapalkki ja muut UI-merkkijonot. Dokumenttien sisältö pysyy toistaiseksi vain englanniksi.

Missä muokata

- Muokkaa `website/i18n/<locale>/code.json` (käytä viitteenä `en`). Pidä placeholderit kuten `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` muuttumattomina.

Luo tai päivitä tiedostot

- Luo puuttuvat rungot kaikille kielille: `npm --prefix website run i18n:stubs`
- Ylikirjoita rungot englannista (uusia merkkijonoja lisättäessä): `npm --prefix website run i18n:stubs:force`
- Vaihtoehto yksittäiselle kielelle: `npx --prefix website docusaurus write-translations --locale <locale>`

Käännä etusivu/yläpalkki/alapalkki UI -merkkijonot (OpenAI)

- Aseta valtuudet kerran (shell tai .env):
- `export OPENAI_API_KEY=sk-...`
- Valinnainen: `export OPENAI_MODEL=gpt-4o-mini`
- Kerta-ajo (kaikki kielet, ohita en): `make translate_web_index`
- Rajoita tiettyihin kieliin: `make translate_web_index OPTS="--locales de,fr"`
- Ylikirjoita olemassa olevat arvot: `make translate_web_index OPTS="--force"`

Validointi ja uudelleenyritykset

- Käännösskripti validioi JSON-muodon, säilyttää aaltosulkeissa olevat placeholderit ja varmistaa, että URL-osoitteet ovat muuttumattomia.
- Validoinnin epäonnistuessa skripti yrittää uudelleen palautteen kanssa enintään 2 kertaa ennen kuin pitää nykyiset arvot.

Esikatsele kieliversiosi

- Kehityspalvelin: `npm --prefix website run start`
- Vieraile osoitteessa `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Lähetys

- Avaa PR muokatuilla `code.json` -tiedostoilla. Pidä muutokset rajattuina ja liitä mahdollisuuksien mukaan nopea kuvakaappaus.

---

### Tietoturva- ja konfigurointivinkkejä {#security-and-configuration-tips}

- Älä commitoi `sources/manifest.json` (buildi luo sen väliaikaisesti)
- Pidä `browser_specific_settings.gecko.id` vakaana säilyttääksesi päivityskanavan

---

### Asetusten pysyvyys {#settings-persistence}

- Tallennus: Kaikki käyttäjäasetukset säilytetään kohteessa `storage.local` ja ne pysyvät lisäosan päivitysten yli.
- Asennus: Oletukset otetaan käyttöön vain, kun avain puuttuu kokonaan (undefined).
- Päivitys: Migraatio täyttää vain puuttuvat avaimet; olemassa olevia arvoja ei koskaan ylikirjoiteta.
- Skeeman merkki: `settingsVersion` (tällä hetkellä `1`).
- Avaimet ja oletukset:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Koodi: katso `sources/background.js` → `initializeOrMigrateSettings()` ja `SCHEMA_VERSION`.

Kehitysprosessi (uuden asetuksen lisääminen)

- Nosta `SCHEMA_VERSION` arvoa tiedostossa `sources/background.js`.
- Lisää uusi avain + oletus `DEFAULTS`-olioon tiedostossa `initializeOrMigrateSettings()`.
- Käytä "only-if-undefined"-sääntöä oletuksia kylvettäessä; älä ylikirjoita olemassa olevia arvoja.
- Jos asetus on käyttäjälle näkyvä, kytke se `sources/options.js`:aan ja lisää lokalisoidut merkkijonot.
- Lisää/säädä testejä (katso `tests/background.settings.migration.test.js`).

Manuaalitestauksen vinkit

- Simuloi puhdas asennus: tyhjennä laajennuksen datakansio tai aloita uudella profiililla.
- Simuloi päivitys: aseta `settingsVersion` arvoon `0` tiedostossa `storage.local` ja lataa uudelleen; varmista, että olemassa olevat arvot säilyvät muuttumattomina ja vain puuttuvat avaimet lisätään.

---

### Vianmääritys {#troubleshooting}

- Varmista, että Thunderbird on versio 128 ESR tai uudempi
- Käytä Virhekonsolia ajonaikaisten ongelmien tutkimiseen
- Jos tallennetut asetukset eivät näytä tulevan voimaan oikein, käynnistä Thunderbird uudelleen ja yritä uudelleen. (Thunderbird voi välimuistittaa tilaa istuntojen yli; uudelleenkäynnistys varmistaa, että tuoreet asetukset ladataan.)

---

### CI ja kattavuus {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ajaa vitestin kattavuuskynnyksillä (85 % rivit/funktiot/haarat/lausekkeet). Jos kynnyksiä ei saavuteta, työ epäonnistuu.
- Työnkulku lataa artefaktin `coverage-html`, joka sisältää HTML-raportin; lataa se ajon sivulta (Actions → uusin ajo → Artifacts).

---

### Osallistuminen {#contributing}

- Katso CONTRIBUTING.md haara/commit/PR-ohjeistusta varten
- Vinkki: Luo erillinen Thunderbird-kehitysprofiili testaukseen, jotta päivittäinen profiilisi ei häiriinny.

---

### Käännökset

- Laajojen “all → all” -käännöstyöiden ajaminen voi olla hidasta ja kallista. Aloita alijoukolla (esim. muutama dokumentti ja 1–2 kieltä), tarkista tulos ja laajenna sitten.

---

- Uudelleenyrityskäytäntö: käännöstyöt tekevät enintään 3 uudelleenyritystä eksponentiaalisella backoffilla API-virheissä; katso `scripts/translate_web_docs_batch.js` ja `scripts/translate_web_docs_sync.js`.

Kuvakaappaukset dokumentaatioon

- Tallenna kuvat hakemistoon `website/static/img/`.
- Viittaa niihin MD/MDX:ssä polulla `useBaseUrl('/img/<filename>')`, jotta polut toimivat sivuston `baseUrl` kanssa.
- Kun lisäät tai nimeät uudelleen kuvia hakemiston `website/static/img/` alla, varmista että kaikki viittaukset käyttävät edelleen `useBaseUrl('/img/…')` ja että kuvat renderöityvät paikallisessa esikatselussa.
  Faviconit

- Monikokoinen `favicon.ico` generoidaan automaattisesti kaikissa buildipoluissa (Make + skriptit) skriptillä `website/scripts/build-favicon.mjs`.
- Manuaalista vaihetta ei tarvita; riittää päivittää `icon-*.png`.
  Arviointivinkki

- Pidä front‑matterin `id` muuttumattomana käännetyissä dokumenteissa; käännä vain `title` ja `sidebar_label` jos ne ovat mukana.

#### clean {#mt-clean}

- Tarkoitus: poistaa paikalliset buildi-/esikatseluartefaktit.
- Käyttö: `make clean`
- Poistaa (jos olemassa):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Tarkoitus: muotoilla, testata, päivittää changelog, commitoida ja pushaa.
- Käyttö: `make commit`
- Lisätiedot: ajaa Prettierin (kirjoitus), `make test`, `make test_i18n`; lisää changelogiin, kun stagella on eroja; pushaa haaraan `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Tarkoitus: ajaa ESLint flat-konfigilla.
- Käyttö: `make eslint`

---

#### help {#mt-help}

- Tarkoitus: listata kaikki kohteet yhden rivin kuvauksin.
- Käyttö: `make help`

---

#### lint {#mt-lint}

- Tarkoitus: lintata MailExtension käyttäen `web-ext`.
- Käyttö: `make lint`
- Huom.: kopioi väliaikaisesti `sources/manifest_LOCAL.json` → `sources/manifest.json`; ohittaa rakennetut ZIPit; varoitukset eivät kaada putkea.

---

#### menu {#mt-menu}

- Tarkoitus: interaktiivinen valikko Make-kohteen ja valinnaisten argumenttien valintaan.
- Käyttö: aja `make` ilman argumentteja.
- Huom.: jos `whiptail` ei ole käytettävissä, valikko palaa vaihtoehtoon `make help`.

---

#### pack {#mt-pack}

- Tarkoitus: rakentaa ATN- ja LOCAL-ZIPit (riippuu kohteesta `lint`).
- Käyttö: `make pack`
- Vinkki: nosta versioita molemmissa `sources/manifest_*.json` ennen paketointia.

---

#### prettier {#mt-prettier}

- Tarkoitus: muotoilla repo paikallaan.
- Käyttö: `make prettier`

#### prettier_check {#mt-prettier_check}

- Tarkoitus: varmistaa muotoilu (ei kirjoituksia).
- Käyttö: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Tarkoitus: alias komennolle `prettier`.
- Käyttö: `make prettier_write`

---

#### test {#mt-test}

- Tarkoitus: ajaa Prettier (kirjoitus), ESLint ja sitten Vitest (kattavuus jos asennettu).
- Käyttö: `make test`

#### test_i18n {#mt-test_i18n}

- Tarkoitus: i18n-keskeiset testit lisäosan merkkijonoille ja sivuston dokumenteille.
- Käyttö: `make test_i18n`
- Suorittaa: `npm run test:i18n` ja `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Tarkoitus: kääntää lisäosan UI-merkkijonot EN:stä muihin kieliin.
- Käyttö: `make translation_app OPTS="--locales all|de,fr"`
- Huom.: säilyttää avainrakenteen ja placeholderit; lokittaa tiedostoon `translation_app.log`. Skriptimuoto: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Tarkoitus: kääntää sivuston dokumentaatio `website/docs/*.md` → `website/i18n/<locale>/...`.
- Suositeltu: `translate_web_docs_batch` (OpenAI Batch API)
  - Käyttö (liput): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Perinteinen positionaalinen on yhä tuettu: `OPTS="<doc|all> <lang|all>"`
- Toiminta: rakentaa JSONL:n, lataa, pollaa 30 s välein, lataa tulokset, kirjoittaa tiedostot.
- Huom.: batch-ajo voi kestää jopa 24 tuntia (OpenAI:n batch-ikkunan mukaan). Konsoli näyttää kuluneen ajan jokaisessa pollauksessa.
- Ympäristö: `OPENAI_API_KEY` (pakollinen), valinnaiset `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (oletus 24 h), `BATCH_POLL_INTERVAL_MS`.
- Perinteinen: `translate_web_docs_sync`
  - Käyttö (liput): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Perinteinen positionaalinen on yhä tuettu: `OPTS="<doc|all> <lang|all>"`
- Toiminta: synkroniset pyyntöparit (ei batch-kokoamista).
- Huom.: Interaktiiviset kehoteet, kun `OPTS` on pois jätetty. Molemmat tilat säilyttävät koodilohkot/inline-koodin ja pitävät front‑matterin `id` muuttumattomana; lokittaa tiedostoon `translation_web_batch.log` (batch) tai `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Tarkoitus: kääntää sivuston UI-merkkijonot (etusivu, yläpalkki, alapalkki) kielestä `website/i18n/en/code.json` kaikkiin kieliin hakemiston `website/i18n/<locale>/code.json` alle (pois lukien `en`).
- Käyttö: `make translate_web_index` tai `make translate_web_index OPTS="--locales de,fr [--force]"`
- Vaatimukset: exporttaa `OPENAI_API_KEY` (valinnainen: `OPENAI_MODEL=gpt-4o-mini`).
- Toiminta: validoi JSON-rakenteen, säilyttää aaltosulke-placeholderit, pitää URL-osoitteet muuttumattomina ja yrittää uudelleen palautteen kanssa validointivirheissä.

---

#### web_build {#mt-web_build}

- Tarkoitus: rakentaa dokumentaatiosta sivusto kohteeseen `website/build`.
- Käyttö: `make web_build OPTS="--locales en|de,en|all"` (tai aseta `BUILD_LOCALES="en de"`)
- Sisäisesti: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Riippuvuudet: ajaa `npm ci` hakemistossa `website/` vain, jos `website/node_modules/@docusaurus` puuttuu.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Tarkoitus: offline-turvallinen linkkitarkistus.
- Käyttö: `make web_build_linkcheck OPTS="--locales en|all"`
- Huom.: rakentaa kohteeseen `tmp_linkcheck_web_pages`; kirjoittaa GH Pagesin `baseUrl` → `/`; ohittaa etä-HTTP(S)-linkit.

#### web_build_local_preview {#mt-web_build_local_preview}

- Tarkoitus: paikallinen gh‑pages-esikatselu valinnaisella testauksella/linkkitarkistuksella.
- Käyttö: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Toiminta: yrittää ensin Node-esikatselupalvelinta (`scripts/preview-server.mjs`, tukee `/__stop`), ja palaa vaihtoehtoon `python3 -m http.server` jos tarpeen; palvelee porteissa 8080–8090; PID sijainnissa `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Tarkoitus: pushaa `website/build` haaraan `gh-pages`.
- Käyttö: `make web_push_github`

Vinkki: aseta `NPM=…` ohittaaksesi Makefilen käyttämän pakettihallinnan (oletus `npm`).
