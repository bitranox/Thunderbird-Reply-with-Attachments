---
id: development
title: 'Izstrāde'
sidebar_label: 'Izstrāde'
---

---

## Izstrādes ceļvedis {#development-guide}

:::note Rediģējiet tikai angļu valodu; tulkojumi izplatās automātiski
Atjauniniet dokumentāciju tikai zem `website/docs` (angļu valoda). Tulkojumi zem `website/i18n/<locale>/…` tiek ģenerēti un nav jārediģē manuāli. Izmantojiet tulkošanas uzdevumus (piem., `make translate_web_docs_batch`), lai atsvaidzinātu lokalizēto saturu.
:::

### Priekšnosacījumi {#prerequisites}

- Node.js 22+ un npm (pārbaudīts ar Node 22)
- Thunderbird 128 ESR vai jaunāks (manuālai testēšanai)

---

### Projekta struktūra (augstā līmenī) {#project-layout-high-level}

- Sakne: iepakošanas skripts `distribution_zip_packer.sh`, dokumentācija, ekrānattēli
- `sources/`: galvenais papildinājuma kods (fons, opciju/uznirstošais interfeiss, manifesti, ikonas)
- `tests/`: Vitest komplekts
- `website/`: Docusaurus dokumenti (ar i18n zem `website/i18n/de/...`)

---

### Instalēšana un rīki {#install-and-tooling}

- Instalēt saknes atkarības: `npm ci`
- Dokumentācija (pēc izvēles): `cd website && npm ci`
- Atrast mērķus: `make help`

---

### Dzīvā izstrāde (web‑ext run) {#live-dev-web-ext}

- Ātra cilpa Firefox Desktop (tikai UI dūmu testi):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Palaist Thunderbird (ieteicams MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Padomi:
- Turiet atvērtu Thunderbird kļūdu konsoli (Rīki → Izstrādātāja rīki → Kļūdu konsole).
- MV3 notikumu lapas dīkstāvē tiek apturētas; pēc koda izmaiņām pārlādējiet papildinājumu vai ļaujiet web‑ext automātiski pārlādēt.
- Dažas tikai Firefox uzvedības atšķiras; vienmēr pārbaudiet Thunderbird, lai nodrošinātu API atbilstību.
- Thunderbird izpildfailu ceļi (piemēri):
- Linux: `thunderbird` (piem., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profila izolācija: Izmantojiet atsevišķu Thunderbird profilu izstrādei, lai neietekmētu ikdienas iestatījumus.

---

### Make mērķi (alfabētiskā secībā) {#make-targets-alphabetical}

Makefile standartizē kopīgus izstrādes plūsmas. Palaidiet `make help` jebkurā laikā, lai iegūtu vienrindas kopsavilkumu par katru mērķi.

Padoms: palaižot `make` bez mērķa, atveras vienkārša Whiptail izvēlne mērķa izvēlei.

| Mērķis                                                   | Vienrindas apraksts                                                                                   |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Noņemt lokālos būvēšanas/priekšskatījuma artefaktus (tmp/, web-local-preview/, website/build/).       |
| [`commit`](#mt-commit)                                   | Formatēt, palaist testus (t.sk. i18n), atjaunināt izmaiņu žurnālu, veikt commit un push.              |
| [`eslint`](#mt-eslint)                                   | Palaist ESLint, izmantojot plakanās konfigurācijas (`npm run -s lint:eslint`).                        |
| [`help`](#mt-help)                                       | Uzskaitīt visus mērķus ar vienrindas aprakstiem (sakārtoti).                                          |
| [`lint`](#mt-lint)                                       | web‑ext lint uz `sources/` (pagaidu manifests; ignorē ZIP; nefatāls).                                 |
| [`menu`](#mt-menu)                                       | Interaktīva izvēlne mērķa un izvēles argumentu izvēlei.                                               |
| [`pack`](#mt-pack)                                       | Būvēt ATN un LOCAL ZIP (palaiž linteri; izsauc pakošanas skriptu).                                    |
| [`prettier`](#mt-prettier)                               | Formatēt repozitoriju uz vietas (pieraksta izmaiņas).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier pārbaudes režīmā (bez pieraksta); neizdodas, ja nepieciešama pārformatēšana.                 |
| [`prettier_write`](#mt-prettier_write)                   | Aizstājvārds `prettier`.                                                                              |
| [`test`](#mt-test)                                       | Prettier (pieraksts), ESLint, tad Vitest (segums, ja konfigurēts).                                    |
| [`test_i18n`](#mt-test_i18n)                             | Tikai i18n testi: papildinājuma vietturi/atbilstība + vietnes atbilstība.                             |
| [`translate_app`](#mt-translation-app)                   | Aizstājvārds `translation_app`.                                                                       |
| [`translation_app`](#mt-translation-app)                 | Tulkot lietotnes UI virknes no `sources/_locales/en/messages.json`.                                   |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tulkot vietnes dokumentus caur OpenAI Batch API (ieteicams).                                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tulkot vietnes dokumentus sinhroni (mantojums, ne-batch).                                             |
| [`translate_web_index`](#mt-translation_web_index)       | Aizstājvārds `translation_web_index`.                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Tulkot sākumlapas/navigācijas joslas/kājenes UI (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Būvēt dokumentus uz `website/build` (atbalsta `--locales` / `BUILD_LOCALES`).                         |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Bezsaistes droša saišu pārbaude (izlaiž attālinātos HTTP[S]).                                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Lokāls gh‑pages priekšskatījums; automātiska apkalpošana uz 8080–8090; izvēles testi/saišu pārbaude.  |
| [`web_push_github`](#mt-web_push_github)                 | Nosūtīt `website/build` uz atzaru `gh-pages`.                                                         |

Opciju sintakse

- Lietojiet `make <command> OPTS="…"` opciju nodošanai (ieteicamas pēdiņas). Katram mērķim zemāk ir paraugs.

--

-

#### Lokāļu būvēšanas padomi {#locale-build-tips}

- Būvēt lokāļu apakškopu: iestatiet `BUILD_LOCALES="en de"` vai nododiet `OPTS="--locales en,de"` web mērķiem.
- Priekšskatīt konkrētu lokāli: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Būvēšana un pakošana {#build-and-package}

- Būvēt ZIP: `make pack`
- Izveido ATN un LOCAL ZIP repozitorija saknē (artefaktus ar roku nelabojiet)
- Padoms: pirms pakošanas atjauniniet versiju gan `sources/manifest_ATN.json`, gan `sources/manifest_LOCAL.json`
- Manuāla instalēšana (izstrāde): Thunderbird → Rīki → Papildinājumi un motīvi → zobrats → Instalēt papildinājumu no faila… → izvēlieties izveidoto ZIP

---

### Testi {#test}

- Pilns komplekts: `make test` (Vitest)
- Pārklājums (pēc izvēles):
- `npm i -D @vitest/coverage-v8`
- Palaidiet `make test`; atveriet `coverage/index.html` HTML atskaitei
- Tikai i18n: `make test_i18n` (UI atslēgas/vietturi/virsraksti + vietne ar katrai lokālei katram dokumentam atbilstību ar id/title/sidebar_label pārbaudēm)

---

### Atkļūdošana un žurnāli {#debugging-and-logs}

- Kļūdu konsole: Rīki → Izstrādātāja rīki → Kļūdu konsole
- Pārslēgt detalizētus žurnālus darbības laikā:
- Ieslēgt: `messenger.storage.local.set({ debug: true })`
- Izslēgt: `messenger.storage.local.set({ debug: false })`
- Žurnāli parādās, rakstot/sūtot atbildes

---

### Dokumentācija (vietne) {#docs-website}

- Izstrādes serveris: `cd website && npm run start`
- Būvēt statisku vietni: `cd website && npm run build`
- Make ekvivalenti (alfabētiski): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Lietošanas piemēri:
- Tikai EN, izlaist testus/saišu pārbaudi, bez push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Visas lokāles, ar testiem/saišu pārbaudi, tad push: `make web_build_local_preview && make web_push_github`
- Pirms publicēšanas palaidiet bezsaistes drošo saišu pārbaudi: `make web_build_linkcheck`.
- i18n: angļu saturs ir `website/docs/*.md`; vācu tulkojumi ir `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Meklēšana: Ja CI ir iestatīti Algolia DocSearch vides mainīgie (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), vietne izmanto Algolia meklēšanu; pretējā gadījumā tā izmanto lokālo meklēšanu. Sākumlapā nospiediet `/` vai `Ctrl+K`, lai atvērtu meklēšanas lodziņu.

---

#### Ziedošanas novirzīšanas maršruts {#donate-redirect}

- `website/src/pages/donate.js`
- Maršruts: `/donate` (un `/<locale>/donate`)
- Uzvedība:
- Ja pašreizējam maršrutam ir lokāle (piem., `/de/donate`), izmantojiet to
- Pretējā gadījumā izvēlieties labāko atbilstību no `navigator.languages` pret konfigurētajām lokālēm; ja nekas neder, izmantojiet noklusējuma lokāli
- Novirza uz:
- `en` → `/docs/donation`
- pārējie → `/<locale>/docs/donation`
- Izmanto `useBaseUrl` pareizai baseUrl apstrādei
- Ietver meta atsvaidzināšanu + `noscript` saiti kā rezerves iespēju

---

---

#### Priekšskatījuma padomi {#preview-tips}

- Tīri apturiet Node priekšskatījumu: atveriet `http://localhost:<port>/__stop` (izdrukāts pēc `Local server started`).
- Ja attēli neielādējas MDX/JSX, izmantojiet `useBaseUrl('/img/...')`, lai ievērotu vietnes `baseUrl`.
- Vispirms startē priekšskatījums; saišu pārbaude tiek palaista pēc tam un nav bloķējoša (bojātas ārējās saites neapturēs priekšskatījumu).
- Priekšskatījuma URL piemērs: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (izdrukāts pēc “Local server started”).
- Ārējās saites saišu pārbaudē: Dažas ārējās vietnes (piem., addons.thunderbird.net) bloķē automatizētus pārmeklētājus un saišu pārbaudē var rādīt 403. Priekšskatījums tāpat startē; to var droši ignorēt.

---

#### Tulkot vietni {#translate-website}

Ko var tulkot

- Tikai vietnes lietotāja saskarni: sākumlapa, navigācijas josla, kājene un citas UI virknes. Dokumentu saturs pagaidām paliek tikai angļu valodā.

Kur rediģēt

- Rediģējiet `website/i18n/<locale>/code.json` (izmantojiet `en` kā atsauci). Saglabājiet vietturus, piemēram, `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`, nemainītus.

Ģenerēt vai atsvaidzināt failus

- Izveidot trūkstošos aizmetņus visām lokālēm: `npm --prefix website run i18n:stubs`
- Pārrakstīt aizmetņus no angļu valodas (pēc jaunu virkņu pievienošanas): `npm --prefix website run i18n:stubs:force`
- Alternatīva vienai lokālei: `npx --prefix website docusaurus write-translations --locale <locale>`

Tulkot sākumlapas/navigācijas/kājenes UI virknes (OpenAI)

- Iestatiet akreditācijas datus vienreiz (čaula vai .env):
- `export OPENAI_API_KEY=sk-...`
- Pēc izvēles: `export OPENAI_MODEL=gpt-4o-mini`
- Vienā piegājienā (visas lokāles, izlaist en): `make translate_web_index`
- Ierobežot konkrētām lokālēm: `make translate_web_index OPTS="--locales de,fr"`
- Pārrakstīt esošās vērtības: `make translate_web_index OPTS="--force"`

Validācija un atkārtojumi

- Tulkošanas skripts validē JSON formu, saglabā figūriekavu vietturus un nodrošina, ka URL paliek nemainīti.
- Ja validācija neizdodas, tas mēģina vēlreiz ar atgriezenisko saiti līdz 2 reizēm, pirms atstāj esošās vērtības.

Priekšskatiet savu lokāli

- Izstrādes serveris: `npm --prefix website run start`
- Apmeklējiet `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Iesniegšana

- Atveriet PR ar rediģēto(-ajiem) `code.json` failu(-iem). Saglabājiet izmaiņas fokusētas un iespējas gadījumā iekļaujiet ātru ekrānattēlu.

---

### Drošības un konfigurācijas padomi {#security-and-configuration-tips}

- Neiesniedziet (commit) `sources/manifest.json` (tas tiek izveidots uz laiku būves gaitā)
- Uzturiet `browser_specific_settings.gecko.id` stabilu, lai saglabātu atjauninājumu kanālu

---

### Iestatījumu noturība {#settings-persistence}

- Glabāšana: Visi lietotāja iestatījumi atrodas `storage.local` un saglabājas starp papildinājuma atjauninājumiem.
- Instalēšana: Noklusējumi tiek piemēroti tikai tad, ja atslēga stingri trūkst (undefined).
- Atjaunināšana: Migrācija aizpilda tikai trūkstošās atslēgas; esošās vērtības nekad netiek pārrakstītas.
- Shēmas marķieris: `settingsVersion` (pašlaik `1`).
- Atslēgas un noklusējumi:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kods: skatiet `sources/background.js` → `initializeOrMigrateSettings()` un `SCHEMA_VERSION`.

Izstrādes darba plūsma (jauna iestatījuma pievienošana)

- Palieliniet `SCHEMA_VERSION` failā `sources/background.js`.
- Pievienojiet jauno atslēgu + noklusējumu objektam `DEFAULTS` failā `initializeOrMigrateSettings()`.
- Lietojiet “tikai ja nav definēts” noteikumu, iestādot noklusējumus; nepārrakstiet esošās vērtības.
- Ja iestatījums ir redzams lietotājam, pieslēdziet to `sources/options.js` un pievienojiet lokalizētās virknes.
- Pievienojiet/pielāgojiet testus (skat. `tests/background.settings.migration.test.js`).

Padomi manuālai testēšanai

- Simulējiet jaunu instalēšanu: notīriet paplašinājuma datu direktoriju vai sāciet ar jaunu profilu.
- Simulējiet atjauninājumu: iestatiet `settingsVersion` uz `0` failā `storage.local` un pārlādējiet; apstipriniet, ka esošās vērtības paliek nemainīgas un tiek pievienotas tikai trūkstošās atslēgas.

---

### Problēmu novēršana {#troubleshooting}

- Pārliecinieties, ka Thunderbird ir 128 ESR vai jaunāks
- Lietojiet Kļūdu konsoli darbības laika problēmām
- Ja saglabātie iestatījumi šķiet netiek pareizi piemēroti, restartējiet Thunderbird un mēģiniet vēlreiz. (Thunderbird var kešot stāvokli starp sesijām; restarts nodrošina, ka ielādējas svaigi iestatījumi.)

---

### CI un pārklājums {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) palaiž vitest ar pārklājuma sliekšņiem (85% rindas/funkcijas/zari/paziņojumi). Ja sliekšņi netiek sasniegti, darbs neizdodas.
- Darbeplūsma augšupielādē artefaktu `coverage-html` ar HTML atskaiti; lejupielādējiet to no izpildes lapas (Actions → jaunākais izpildījums → Artifacts).

---

### Ieguldīšana {#contributing}

- Skatiet CONTRIBUTING.md, lai uzzinātu vadlīnijas par zariem/commit/PR
- Padoms: Izveidojiet atsevišķu Thunderbird izstrādes profilu testēšanai, lai neietekmētu ikdienas profilu.

---

### Tulkojumi

- Lieli “all → all” tulkošanas darbi var būt lēni un dārgi. Sāciet ar apakškopu (piem., daži dokumenti un 1–2 lokāles), pārskatiet rezultātu un pēc tam paplašiniet.

---

- Atkārtojumu politika: tulkošanas darbi veic līdz 3 mēģinājumiem ar eksponenciālu atpakaļatturēšanos pie API kļūdām; skatiet `scripts/translate_web_docs_batch.js` un `scripts/translate_web_docs_sync.js`.

Ekrānattēli dokumentiem

- Glabājiet attēlus zem `website/static/img/`.
- Atsaucieties uz tiem MD/MDX, izmantojot `useBaseUrl('/img/<filename>')`, lai ceļi darbotos ar vietnes `baseUrl`.
- Pēc attēlu pievienošanas vai pārdēvēšanas zem `website/static/img/` pārliecinieties, ka visas atsauces joprojām izmanto `useBaseUrl('/img/…')` un tiek attēlotas lokālā priekšskatījumā.
  Favikoni

- Daudzizmēru `favicon.ico` tiek automātiski ģenerēts visos būvēšanas ceļos (Make + skripti) ar `website/scripts/build-favicon.mjs` palīdzību.
- Nav nepieciešama manuāla darbība; pietiek atjaunināt `icon-*.png`.
  Pārskatīšanas padoms

- Saglabājiet front‑matter `id` nemainītu tulkotajos dokumentos; tulkojiet tikai `title` un `sidebar_label`, ja tie ir.

#### clean {#mt-clean}

- Mērķis: noņemt lokālos būvēšanas/priekšskatījuma artefaktus.
- Lietošana: `make clean`
- Noņem (ja ir):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Mērķis: formatēt, testēt, atjaunināt izmaiņu žurnālu, veikt commit un push.
- Lietošana: `make commit`
- Sīkāk: palaiž Prettier (pieraksts), `make test`, `make test_i18n`; papildina izmaiņu žurnālu, ja ir noinscenētas atšķirības; nosūta uz `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Mērķis: palaist ESLint, izmantojot plakanās konfigurācijas.
- Lietošana: `make eslint`

---

#### help {#mt-help}

- Mērķis: uzskaitīt visus mērķus ar vienrindas aprakstiem.
- Lietošana: `make help`

---

#### lint {#mt-lint}

- Mērķis: lintot MailExtension, izmantojot `web-ext`.
- Lietošana: `make lint`
- Piezīmes: pagaidu kopijas `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignorē uzbūvētos ZIP; brīdinājumi nepārtrauc cauruļvadu.

---

#### menu {#mt-menu}

- Mērķis: interaktīva izvēlne Make mērķa un izvēles argumentu izvēlei.
- Lietošana: palaidiet `make` bez argumentiem.
- Piezīmes: ja `whiptail` nav pieejams, izvēlne pāriet uz `make help`.

---

#### pack {#mt-pack}

- Mērķis: būvēt ATN un LOCAL ZIP (atkarīgs no `lint`).
- Lietošana: `make pack`
- Padoms: palieliniet versijas abos `sources/manifest_*.json` pirms pakošanas.

---

#### prettier {#mt-prettier}

- Mērķis: formatēt repozitoriju uz vietas.
- Lietošana: `make prettier`

#### prettier_check {#mt-prettier_check}

- Mērķis: pārbaudīt formatējumu (bez pieraksta).
- Lietošana: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Mērķis: aizstājvārds `prettier`.
- Lietošana: `make prettier_write`

---

#### test {#mt-test}

- Mērķis: palaist Prettier (pieraksts), ESLint un pēc tam Vitest (pārklājums, ja instalēts).
- Lietošana: `make test`

#### test_i18n {#mt-test_i18n}

- Mērķis: uz i18n fokusēti testi papildinājuma virknēm un vietnes dokumentiem.
- Lietošana: `make test_i18n`
- Palaiž: `npm run test:i18n` un `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Mērķis: tulkot papildinājuma UI virknes no EN uz citām lokālēm.
- Lietošana: `make translation_app OPTS="--locales all|de,fr"`
- Piezīmes: saglabā atslēgu struktūru un vietturus; žurnāli tiek rakstīti `translation_app.log`. Skripta forma: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Mērķis: tulkot vietnes dokumentus no `website/docs/*.md` uz `website/i18n/<locale>/...`.
- Ieteicams: `translate_web_docs_batch` (OpenAI Batch API)
  - Lietošana (karogi): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Joprojām tiek pieņemta mantojuma pozicionālā forma: `OPTS="<doc|all> <lang|all>"`
- Uzvedība: būvē JSONL, augšupielādē, aptaujā ik 30 s, lejupielādē rezultātus, raksta failus.
- Piezīme: pakešdarbs var aizņemt līdz 24 stundām (saskaņā ar OpenAI pakešu logu). Konsole katrā aptaujā rāda pagājušo laiku.
- Vide: `OPENAI_API_KEY` (obligāts), izvēles `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (noklusēti 24h), `BATCH_POLL_INTERVAL_MS`.
- Mantojums: `translate_web_docs_sync`
  - Lietošana (karogi): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Joprojām tiek pieņemta mantojuma pozicionālā forma: `OPTS="<doc|all> <lang|all>"`
- Uzvedība: sinhroni pieprasījumi pa pāriem (bez pakešsagrupēšanas).
- Piezīmes: interaktīvi uzvedņi, ja `OPTS` izlaists. Abos režīmos tiek saglabāti koda bloki/inline kods un front‑matter `id` paliek nemainīgs; žurnāli rakstās `translation_web_batch.log` (batch) vai `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Mērķis: tulkot vietnes UI virknes (sākumlapa, navigācijas josla, kājene) no `website/i18n/en/code.json` uz visām lokālēm zem `website/i18n/<locale>/code.json` (izņemot `en`).
- Lietošana: `make translate_web_index` vai `make translate_web_index OPTS="--locales de,fr [--force]"`
- Prasības: eksportēt `OPENAI_API_KEY` (pēc izvēles: `OPENAI_MODEL=gpt-4o-mini`).
- Uzvedība: validē JSON struktūru, saglabā figūriekavu vietturus, uztur URL nemainītus un validācijas kļūdu gadījumā mēģina vēlreiz ar atgriezenisko saiti.

---

#### web_build {#mt-web_build}

- Mērķis: būvēt dokumentācijas vietni uz `website/build`.
- Lietošana: `make web_build OPTS="--locales en|de,en|all"` (vai iestatiet `BUILD_LOCALES="en de"`)
- Iekšējā darbība: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Atkarības: palaiž `npm ci` direktorijā `website/` tikai tad, ja trūkst `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Mērķis: bezsaistes droša saišu pārbaude.
- Lietošana: `make web_build_linkcheck OPTS="--locales en|all"`
- Piezīmes: būvē uz `tmp_linkcheck_web_pages`; pārraksta GH Pages `baseUrl` uz `/`; izlaiž attālinātās HTTP(S) saites.

#### web_build_local_preview {#mt-web_build_local_preview}

- Mērķis: lokāls gh‑pages priekšskatījums ar izvēles testiem/saišu pārbaudi.
- Lietošana: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Uzvedība: vispirms mēģina Node priekšskatījuma serveri (`scripts/preview-server.mjs`, atbalsta `/__stop`), pāriet uz `python3 -m http.server`; apkalpo uz 8080–8090; PID atrodas `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Mērķis: nosūtīt `website/build` uz atzaru `gh-pages`.
- Lietošana: `make web_push_github`

Padoms: iestatiet `NPM=…`, lai pārrakstītu Makefile izmantoto pakotņu pārvaldnieku (noklusējums ir `npm`).

---
