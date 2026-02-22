---
id: development
title: 'Arendus'
sidebar_label: 'Arendus'
---

---

## Arendusjuhend {#development-guide}

:::note Muuda ainult ingliskeelset; tõlked kanduvad üle
Uuenda dokumentatsiooni ainult kausta `website/docs` (inglise keel). Kausta `website/i18n/<locale>/…` all olevad tõlked on genereeritud ja neid ei tohiks käsitsi muuta. Kasuta tõlkeülesandeid (nt `make translate_web_docs_batch`), et värskendada lokaliseeritud sisu.
:::

### Eeltingimused {#prerequisites}

- Node.js 22+ ja npm (testitud Node 22-ga)
- Thunderbird 128 ESR või uuem (käsitsi testimiseks)

---

### Projekti struktuur (kõrgtasandil) {#project-layout-high-level}

- Juurkaust: pakendamisskript `distribution_zip_packer.sh`, dokumendid, ekraanipildid
- `sources/`: põhiline lisandmooduli kood (taust, valikute/hüpiku UI, manifestid, ikoonid)
- `tests/`: Vitesti testikomplekt
- `website/`: Docusauruse dokumendid (i18n asub kaustas `website/i18n/de/...`)

---

### Paigaldus ja tööriistad {#install-and-tooling}

- Paigalda juurkausta sõltuvused: `npm ci`
- Dokumendid (valikuline): `cd website && npm ci`
- Ava sihtmärkide loend: `make help`

---

### Otsearendus (web‑ext run) {#live-dev-web-ext}

- Kiirtsükkel Firefox Desktopis (ainult UI suitsutestid):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Käivita Thunderbirdis (MailExtensionite puhul eelistatud):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Nõuanded:
- Hoia Thunderbirdi veakonsool avatuna (Tools → Developer Tools → Error Console).
- MV3 sündmuste lehed peatatakse jõudeolekus; laadi lisandmoodul pärast koodimuudatusi uuesti või lase web‑ext’il seda automaatselt teha.
- Mõned ainult Firefoxile omased käitumised erinevad; kontrolli alati Thunderbirdis API vastavust.
- Thunderbirdi binaari teed (näited):
- Linux: `thunderbird` (nt `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profiili isoleerimine: kasuta arenduseks eraldi Thunderbirdi profiili, et vältida oma igapäevase seadistuse mõjutamist.

---

### Make’i sihtmärgid (tähestikulises järjekorras) {#make-targets-alphabetical}

Makefile ühtlustab levinud arendusvood. Käivita `make help` igal ajal, et näha igast sihtmärgist üherealist kokkuvõtet.

Vihje: `make` ilma sihtmärgita avab lihtsa Whiptaili menüü sihtmärgi valimiseks.

| Sihtmärk                                                 | Üherealine kirjeldus                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Eemalda lokaalsed ehitus/ eelvaate artefaktid (tmp/, web-local-preview/, website/build/).          |
| [`commit`](#mt-commit)                                   | Vorminda, käivita testid (sh i18n), uuenda muutuste logi, commiti ja pushi.                        |
| [`eslint`](#mt-eslint)                                   | Käivita ESLint lameda konfiguratsiooniga (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | Loetle kõik sihtmärgid üherealiste kirjeldustega (sorditult).                                      |
| [`lint`](#mt-lint)                                       | web‑ext lint kaustal `sources/` (ajutine manifest; eirab ZIP-e; mittefataalne).                    |
| [`menu`](#mt-menu)                                       | Interaktiivne menüü sihtmärgi ja valikuliste argumentide valimiseks.                               |
| [`pack`](#mt-pack)                                       | Ehita ATN- ja LOCAL‑ZIP-id (käivitab linteri; kutsub pakendamisskripti).                           |
| [`prettier`](#mt-prettier)                               | Vorminda repositoorium kohapeal (kirjutab muudatused).                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier kontrollrežiimis (kirjutamist pole); ebaõnnestub, kui vajab ümbervormindust.              |
| [`prettier_write`](#mt-prettier_write)                   | Alias käsule `prettier`.                                                                           |
| [`test`](#mt-test)                                       | Prettier (kirjuta), ESLint, seejärel Vitest (katvus, kui seadistatud).                             |
| [`test_i18n`](#mt-test_i18n)                             | Ainult i18n‑testid: lisandmooduli kohatäited/vastavus + veebisaidi vastavus.                       |
| [`translate_app`](#mt-translation-app)                   | Alias käsule `translation_app`.                                                                    |
| [`translation_app`](#mt-translation-app)                 | Tõlgi rakenduse UI stringid allikast `sources/_locales/en/messages.json`.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tõlgi veebidokumendid OpenAI Batch API kaudu (eelistatud).                                         |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tõlgi veebidokumendid sünkroonselt (pärand, mitte-batch).                                          |
| [`translate_web_index`](#mt-translation_web_index)       | Alias käsule `translation_web_index`.                                                              |
| [`translation_web_index`](#mt-translation_web_index)     | Tõlgi avalehe/naviriba/jaluse UI (`website/i18n/en/code.json → .../<lang>/code.json`).             |
| [`web_build`](#mt-web_build)                             | Ehita dokumendid kausta `website/build` (toetab `--locales` / `BUILD_LOCALES`).                    |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Võrguvaba‑turvaline linkide kontroll (jätab vahele kaug-HTTP[S]-lingid).                           |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Kohalik gh‑pages eelvaade; automaatne teenindus portidel 8080–8090; valikuline test/link‑kontroll. |
| [`web_push_github`](#mt-web_push_github)                 | Pushi `website/build` harusse `gh-pages`.                                                          |

Valikute süntaks

- Kasuta valikute edastamiseks `make <command> OPTS="…"` (soovitatav jutumärgid). Iga allpool olev sihtmärk näitab näidiskasutust.

--

-

#### Lokaali koostamise nõuanded {#locale-build-tips}

- Koosta lokaalid osaliselt: sea `BUILD_LOCALES="en de"` või anna `OPTS="--locales en,de"` veebisihtmärkidele.
- Eelvaata konkreetset lokaali: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Koostamine ja pakendamine {#build-and-package}

- Ehita ZIP-id: `make pack`
- Toodab ATN- ja LOCAL‑ZIP‑id repo juurkausta (artefakte ära käsitsi muuda)
- Vihje: uuenda versioon nii failis `sources/manifest_ATN.json` kui ka `sources/manifest_LOCAL.json` enne pakendamist
- Käsitsi paigaldus (arendus): Thunderbird → Tools → Add‑ons and Themes → hammasratas → Install Add‑on From File… → vali loodud ZIP

---

### Testimine {#test}

- Täiskomplekt: `make test` (Vitest)
- Katvus (valikuline):
- `npm i -D @vitest/coverage-v8`
- Käivita `make test`; ava HTML‑aruande jaoks `coverage/index.html`
- Ainult i18n: `make test_i18n` (UI võtmed/kohatäited/pealkirjad + veebisaidi vastavus lokaali ja dokumendi tasandil koos id/title/sidebar_label kontrollidega)

---

### Silumine ja logid {#debugging-and-logs}

- Veakonsool: Tools → Developer Tools → Error Console
- Lülita põhjalikud logid käitusajal:
- Lubamine: `messenger.storage.local.set({ debug: true })`
- Keelamine: `messenger.storage.local.set({ debug: false })`
- Logid ilmuvad vastuseid koostades/saates

---

### Dokumendid (veebisait) {#docs-website}

- Arendusserver: `cd website && npm run start`
- Ehita staatiline sait: `cd website && npm run build`
- Make’i ekvivalendid (tähestikulises järjekorras): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Kasutusnäited:
- Ainult EN, jäta testid/link‑kontroll vahele, push puudub: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Kõik lokaalid, koos testide/link‑kontrolliga, seejärel push: `make web_build_local_preview && make web_push_github`
- Enne avaldamist käivita võrguvaba‑turvaline linkide kontroll: `make web_build_linkcheck`.
- i18n: inglise keel asub kaustas `website/docs/*.md`; saksa tõlked kaustas `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Otsing: Kui CI-s on seadistatud Algolia DocSearch’i keskkonnamuutujad (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), kasutab sait Algolia otsingut; vastasel juhul langeb üle kohalikule otsingule. Avalehel vajuta otsingukasti avamiseks `/` või `Ctrl+K`.

---

#### Annetuse ümbersuunamise marsruut {#donate-redirect}

- `website/src/pages/donate.js`
- Marsruut: `/donate` (ja `/<locale>/donate`)
- Käitumine:
- Kui praegusel marsruudil on lokaal (nt `/de/donate`), kasuta seda
- Muidu vali parim vaste `navigator.languages` ja seadistatud lokaalide vahel; vajadusel lange vaike-lokaalile
- Suunab ümber:
- `en` → `/docs/donation`
- teised → `/<locale>/docs/donation`
- Kasutab `useBaseUrl` korrektseks baseUrl’i käsitlemiseks
- Sisaldab meta refresh’i + varuvariandina linki `noscript`

---

---

#### Eelvaate näpunäited {#preview-tips}

- Lõpeta Node’i eelvaade korrektselt: ava `http://localhost:<port>/__stop` (trükitakse pärast `Local server started`).
- Kui pildid ei laadu MDX/JSX-is, kasuta `useBaseUrl('/img/...')`, et arvestada saidi `baseUrl`-iga.
- Eelvaade käivitub esmalt; linkide kontroll töötab hiljem ja ei blokeeri (katkised välislingid ei peata eelvaadet).
- Näidis eelvaate URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (trükitakse pärast teadet „Local server started“).
- Välislingid link‑kontrollis: Mõned välissaidid (nt addons.thunderbird.net) blokeerivad automaatsed roomikud ja võivad link‑kontrollis anda 403. Eelvaade käivitub siiski; neid võib ohutult ignoreerida.

---

#### Tõlgi veebisait {#translate-website}

Mida saab tõlkida

- Ainult veebisaidi kasutajaliides: avaleht, naviriba, jalus ja muu UI‑sisu. Dokumentide sisu jääb hetkel ainult ingliskeelseks.

Kus muuta

- Muuda faili `website/i18n/<locale>/code.json` (kasuta võrdluseks `en`). Hoia kohatäited nagu `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` muutmata.

Loo või värskenda faile

- Loo kõikidele lokaalidele puuduvad algfailid: `npm --prefix website run i18n:stubs`
- Kirjuta algfailid inglise põhjal üle (pärast uute stringide lisamist): `npm --prefix website run i18n:stubs:force`
- Alternatiiv ühele lokaalile: `npx --prefix website docusaurus write-translations --locale <locale>`

Tõlgi avalehe/naviriba/jaluse UI stringid (OpenAI)

- Sea mandaadid üks kord (shell või .env):
- `export OPENAI_API_KEY=sk-...`
- Valikuline: `export OPENAI_MODEL=gpt-4o-mini`
- Ühekordne (kõik lokaalid, jäta en vahele): `make translate_web_index`
- Piira kindlate lokaalidega: `make translate_web_index OPTS="--locales de,fr"`
- Kirjuta olemasolevad väärtused üle: `make translate_web_index OPTS="--force"`

Valideerimine ja korduskatsetused

- Tõlkeskript valideerib JSON‑struktuuri, säilitab looksulgudes kohatäited ja tagab, et URL-id ei muutu.
- Valideerimise ebaõnnestumisel proovib kuni 2 korda uuesti, andes tagasisidet, enne kui jätab olemasolevad väärtused muutmata.

Eelvaata oma lokaali

- Arendusserver: `npm --prefix website run start`
- Külasta `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Esitamine

- Ava PR muudetud `code.json` faili(de)ga. Hoia muudatused fokusseeritud ja lisa võimalusel kiire ekraanipilt.

---

### Turbe- ja seadistusnõuanded {#security-and-configuration-tips}

- Ära commiti `sources/manifest.json` (luuakse ehituse käigus ajutiselt)
- Hoia `browser_specific_settings.gecko.id` stabiilsena, et säilitada uuenduskanal

---

### Sätete püsivus {#settings-persistence}

- Salvestus: Kõik kasutaja sätted asuvad `storage.local`-s ja püsivad lisandmooduli uuenduste vahel.
- Paigaldus: vaikeväärtused rakendatakse ainult siis, kui võti on rangelt puuduv (undefined).
- Uuendus: migratsioon täidab ainult puuduvaid võtmeid; olemasolevaid väärtusi ei kirjutata kunagi üle.
- Skeemi tähis: `settingsVersion` (praegu `1`).
- Võtmed ja vaikeväärtused:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kood: vt `sources/background.js` → `initializeOrMigrateSettings()` ja `SCHEMA_VERSION`.

Arendusvoog (uue sätte lisamine)

- Suurenda `SCHEMA_VERSION` failis `sources/background.js`.
- Lisa uus võti + vaikeväärtus objekti `DEFAULTS` failis `initializeOrMigrateSettings()`.
- Kasuta vaikeväärtuste külvamisel reeglit „ainult kui undefined“; ära kirjuta olemasolevaid väärtusi üle.
- Kui säte on kasutajale nähtav, ühenda see `sources/options.js`-s ja lisa lokaliseeritud stringid.
- Lisa/kohanda teste (vt `tests/background.settings.migration.test.js`).

Käsitsi testimise nõuanded

- Värske paigalduse simuleerimiseks: tühjenda laienduse andmekataloog või alusta uue profiiliga.
- Uuenduse simuleerimiseks: sea `settingsVersion` väärtuseks `0` failis `storage.local` ja laadi uuesti; kontrolli, et olemasolevad väärtused jäävad muutmata ja lisatakse ainult puuduvad võtmed.

---

### Tõrkeotsing {#troubleshooting}

- Veendu, et Thunderbird on 128 ESR või uuem
- Kasuta käitusprobleemide korral veakonsooli
- Kui salvestatud sätted ei tundu rakenduvat, taaskäivita Thunderbird ja proovi uuesti. (Thunderbird võib seansside vahel seisundit puhverdada; taaskäivitus tagab, et värsked sätted laaditakse.)

---

### CI ja katvus {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) käitab Vitesti katvuskünnistega (85% read/funktsioonid/harud/laused). Kui künniseid ei täideta, töö ebaõnnestub.
- Töövoog üles laeb artefakti `coverage-html` koos HTML‑aruandega; laadi see alla jooksu lehelt (Actions → viimane jooks → Artifacts).

---

### Kaastöö {#contributing}

- Vaata haru/commit/PR juhisteks faili CONTRIBUTING.md
- Nipp: Loo testimiseks eraldi Thunderbirdi arendusprofiil, et vältida oma igapäevase profiili mõjutamist.

---

### Tõlked

- Suurte „all → all“ tõlketööde käitamine võib olla aeglane ja kulukas. Alusta väikesest alamhulgast (nt paar dokumenti ja 1–2 lokaali), vaata tulemus üle ja siis laienda.

---

- Taaskatsete poliitika: tõlketööd teevad API vigade korral kuni 3 uuestikatset eksponentsiaalse taganemisega; vt `scripts/translate_web_docs_batch.js` ja `scripts/translate_web_docs_sync.js`.

Ekraanipildid dokumentidele

- Hoia pilte kaustas `website/static/img/`.
- Viita neile MD/MDX-is läbi `useBaseUrl('/img/<filename>')`, et rajad töötaksid koos saidi `baseUrl`-ga.
- Pärast piltide lisamist või ümbernimetamist kaustas `website/static/img/` kinnita, et kõik viited kasutavad endiselt `useBaseUrl('/img/…')` ja renderduvad kohalikus eelvaates.
  Favikonid

- Mitmesuuruseline `favicon.ico` genereeritakse automaatselt kõigis ehitusteedes (Make + skriptid) tööriistaga `website/scripts/build-favicon.mjs`.
- Käsitsi samme pole vaja; piisab `icon-*.png` uuendamisest.
  Läbivaatamise nipp

- Hoia tõlgitud dokumentides front-matter’i `id` muutmata; tõlgi ainult `title` ja `sidebar_label`, kui need on olemas.

#### clean {#mt-clean}

- Eesmärk: eemaldada kohalikud ehitus-/eelvaateartefaktid.
- Kasutus: `make clean`
- Eemaldab (kui olemas):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Eesmärk: vormindada, testida, uuendada muutuste logi, commitida ja pushida.
- Kasutus: `make commit`
- Detailid: käivitab Prettieri (kirjutus), `make test`, `make test_i18n`; lisab muutuste logisse sissekanded, kui on lavastatud erinevusi; pushib harusse `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Eesmärk: käivitada ESLint lameda konfiguratsiooniga.
- Kasutus: `make eslint`

---

#### help {#mt-help}

- Eesmärk: loetleda kõik sihtmärgid üherealiste kirjeldustega.
- Kasutus: `make help`

---

#### lint {#mt-lint}

- Eesmärk: lintida MailExtensionit tööriistaga `web-ext`.
- Kasutus: `make lint`
- Märkused: kopeerib ajutiselt `sources/manifest_LOCAL.json` → `sources/manifest.json`; eirab ehitatud ZIP-e; hoiatuste korral toru ei kuku läbi.

---

#### menu {#mt-menu}

- Eesmärk: interaktiivne menüü Make’i sihtmärgi ja valikuliste argumentide valimiseks.
- Kasutus: käivita `make` ilma argumentideta.
- Märkused: kui `whiptail` pole saadaval, langeb menüü `make help` peale.

---

#### pack {#mt-pack}

- Eesmärk: ehitada ATN- ja LOCAL‑ZIP‑id (sõltub `lint`-st).
- Kasutus: `make pack`
- Vihje: tõsta versioonid mõlemas `sources/manifest_*.json` enne pakendamist.

---

#### prettier {#mt-prettier}

- Eesmärk: vormindada repo kohapeal.
- Kasutus: `make prettier`

#### prettier_check {#mt-prettier_check}

- Eesmärk: kontrollida vormindust (ilma kirjutamiseta).
- Kasutus: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Eesmärk: alias käsule `prettier`.
- Kasutus: `make prettier_write`

---

#### test {#mt-test}

- Eesmärk: käivitada Prettier (kirjutus), ESLint, seejärel Vitest (katvus, kui paigaldatud).
- Kasutus: `make test`

#### test_i18n {#mt-test_i18n}

- Eesmärk: i18n‑keskne testimine lisandmooduli stringidele ja veebidokumentidele.
- Kasutus: `make test_i18n`
- Käivitab: `npm run test:i18n` ja `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Eesmärk: tõlkida lisandmooduli UI stringid inglise keelest teistesse lokaalidesse.
- Kasutus: `make translation_app OPTS="--locales all|de,fr"`
- Märkused: säilitab võtmestruktuuri ja kohatäited; logib faili `translation_app.log`. Skriptina: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Eesmärk: tõlkida veebidokumendid keelest `website/docs/*.md` keelde `website/i18n/<locale>/...`.
- Eelistatud: `translate_web_docs_batch` (OpenAI Batch API)
  - Kasutus (lipud): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pärandpositsiooniline on endiselt aktsepteeritud: `OPTS="<doc|all> <lang|all>"`
- Käitumine: koostab JSONL-i, üleslaadib, küsitleb iga 30 s järel, laadib tulemused alla, kirjutab failid.
- Märkus: pakettülesanne võib lõpuleviimiseks võtta kuni 24 tundi (vastavalt OpenAI batch-aknale). Konsool kuvab iga päringu järel möödunud aega.
- Keskkond: `OPENAI_API_KEY` (nõutav), valikulised `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (vaikimisi 24 h), `BATCH_POLL_INTERVAL_MS`.
- Pärand: `translate_web_docs_sync`
  - Kasutus (lipud): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Pärandpositsiooniline on endiselt aktsepteeritud: `OPTS="<doc|all> <lang|all>"`
- Käitumine: sünkroonsed paarikaupa päringud (ilma partii agregeerimiseta).
- Märkused: interaktiivsed päringud, kui `OPTS` on puudu. Mõlemad režiimid säilitavad koodiplokid/rea-koodi ja jätavad front-matter’i `id` muutmata; logib faili `translation_web_batch.log` (batch) või `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Eesmärk: tõlkida veebisaidi UI stringid (avaleht, naviriba, jalus) keelest `website/i18n/en/code.json` kõigisse `website/i18n/<locale>/code.json` all olevatesse lokaalidesse (välja arvatud `en`).
- Kasutus: `make translate_web_index` või `make translate_web_index OPTS="--locales de,fr [--force]"`
- Nõuded: ekspordi `OPENAI_API_KEY` (valikuline: `OPENAI_MODEL=gpt-4o-mini`).
- Käitumine: valideerib JSON‑struktuuri, säilitab looksulgudes kohatäited, hoiab URL-id muutumatuna ning proovib valideerimisvigade korral tagasisidega uuesti.

---

#### web_build {#mt-web_build}

- Eesmärk: ehitada dokumentatsioonisait kausta `website/build`.
- Kasutus: `make web_build OPTS="--locales en|de,en|all"` (või sea `BUILD_LOCALES="en de"`)
- Siseehitus: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Sõltuvused: käivitab `npm ci` kaustas `website/` ainult siis, kui `website/node_modules/@docusaurus` puudub.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Eesmärk: võrguvaba‑turvaline linkide kontroll.
- Kasutus: `make web_build_linkcheck OPTS="--locales en|all"`
- Märkused: ehitab kausta `tmp_linkcheck_web_pages`; kirjutab GH Pages’i `baseUrl` ümber `/`-ks; jätab vahele kaug-HTTP(S)-lingid.

#### web_build_local_preview {#mt-web_build_local_preview}

- Eesmärk: kohalik gh‑pages eelvaade koos valikuliste testide/link‑kontrolliga.
- Kasutus: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Käitumine: proovib esmalt Node’i eelvaateserverit (`scripts/preview-server.mjs`, toetab `/__stop`), vajadusel langeb `python3 -m http.server` peale; teenindab portidel 8080–8090; PID asub failis `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Eesmärk: pushida `website/build` harusse `gh-pages`.
- Kasutus: `make web_push_github`

Nipp: sea `NPM=…`, et tühistada Makefile’i kasutatav paketihaldur (vaikimisi `npm`).

---
