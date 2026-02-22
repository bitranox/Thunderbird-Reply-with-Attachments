---
id: development
title: 'Horumarinta'
sidebar_label: 'Horumarinta'
---

---

## Hagaha Horumarinta {#development-guide}

:::note Kaliya tafatir Ingiriisiga; turjumaaduhu way fidaan
Cusboonaysii dukumeentiyada kaliya hoosta `website/docs` (Ingiriisi). Turjumaadaha hoosta `website/i18n/<locale>/…` waa la abuuraa mana aha in si gacanta loo tafatiro. Adeegso hawlaha turjumidda (tusaale, `make translate_web_docs_batch`) si aad u cusboonaysiiso nuxurka la degaanniyey.
:::

### Shuruudaha Hore {#prerequisites}

- Node.js 22+ iyo npm (lagu tijaabiyey Node 22)
- Thunderbird 128 ESR ama ka cusub (tijaabo gacmeed)

---

### Qaabka Mashruuca (heer‑sare) {#project-layout-high-level}

- Xidid: qoraal baakadeyn `distribution_zip_packer.sh`, docs, sawir‑qaade
- `sources/`: koodhka ku‑darka ugu weyn (asalka, xulashooyinka/popup UI, manifests, icons)
- `tests/`: taxanaha Vitest
- `website/`: Docusaurus docs (i18n hoosta `website/i18n/de/...`)

---

### Rakibid & Qalab {#install-and-tooling}

- Ku rakib ku‑tiirsanaanta xididka: `npm ci`
- Docs (ikhtiyaari): `cd website && npm ci`
- Ogaado bartilmaameedyada: `make help`

---

### Horumarin Toos ah (web‑ext run) {#live-dev-web-ext}

- Wareeg degdeg ah ee Firefox Desktop (kaliya tijaabooyin UI oo qiiq ah):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Ku socodsii Thunderbird (mudnaanta MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Talooyin:
- Furan Console‑ka Khaladaadka ee Thunderbird (Tools → Developer Tools → Error Console).
- Bogagga dhacdooyinka MV3 waa la hakiyey marka ay madhan yihiin; dib u rar ku‑darka ka dib isbeddelka koodhka, ama uga tag web‑ext inuu si toos ah u dib‑u‑shubo.
- Qaab‑dhaqanno gaar u ah Firefox qaarkood way ka duwanaan karaan; mar walba ku xaqiiji Thunderbird si loo hubiyo is‑ku‑ekaanshaha API.
- Jidadka binary‑ga Thunderbird (tusaalooyin):
- Linux: `thunderbird` (tusaale, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Go'doominta profile‑ka: U isticmaal profile Thunderbird oo gaar ah horumarinta si aadan u saameyn qaabkaaga maalinlaha ah.

---

### Bartilmaameedyada Make (Alifbeeto) {#make-targets-alphabetical}

Makefile‑ku wuxuu mideeyaa qulqullo horumarineed oo caadi ah. Orod `make help` wakhti kasta si aad u hesho hal sadar oo kooban oo ku saabsan bartilmaameed kasta.

Talo: orodka `make` adigoon bartilmaameed gelin wuxuu furaa menu Whiptail fudud si aad u doorato bartilmaameed.

| Bartilmaameed                                            | Sharaxaad hal-sadar ah                                                                                          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ka saar wax‑soo‑saarrada dhisid/hor‑eeg ee maxalliga ah (tmp/, web-local-preview/, website/build/).             |
| [`commit`](#mt-commit)                                   | Qaabee, orod tijaabooyinka (oo ay ku jiraan i18n), cusboonaysii changelog, commit & push.                       |
| [`eslint`](#mt-eslint)                                   | Orod ESLint adigoo adeegsanaya qaabeyn fidsan (`npm run -s lint:eslint`).                                       |
| [`help`](#mt-help)                                       | Ku qor dhammaan bartilmaameedyada oo leh dukumeenti hal‑sadar (la kala soocay).                                 |
| [`lint`](#mt-lint)                                       | web‑ext lint on `sources/` (manifest ku‑meelgaar ah; iska indha tira ZIP‑yada; aan sababin fashil).             |
| [`menu`](#mt-menu)                                       | Menu isdhexgal ah si aad u doorato bartilmaameed iyo dooddo ikhtiyaari ah.                                      |
| [`pack`](#mt-pack)                                       | Dhis ATN & LOCAL ZIPs (waxaa orda linter; waxay wacdaa qoraalka packer).                                        |
| [`prettier`](#mt-prettier)                               | Qaabee kaydka si toos ah (waxay qortaa isbeddello).                                                             |
| [`prettier_check`](#mt-prettier_check)                   | Prettier habka hubinta (qoris la’aan); wuu fashilmaa haddii dib‑u‑qaabeyn loo baahdo.                           |
| [`prettier_write`](#mt-prettier_write)                   | Magac kale u ah `prettier`.                                                                                     |
| [`test`](#mt-test)                                       | Prettier (qor), ESLint, ka dibna Vitest (daboolid haddii la qaabeeyey).                                         |
| [`test_i18n`](#mt-test_i18n)                             | Tijaabooyin keliya i18n: meelaha lagu buuxiyo/isku‑ekaanshaha ku‑darka + isku‑ekaanshaha website‑ka.            |
| [`translate_app`](#mt-translation-app)                   | Magac kale u ah `translation_app`.                                                                              |
| [`translation_app`](#mt-translation-app)                 | Turjun xarigga UI ee app‑ka laga bilaabo `sources/_locales/en/messages.json`.                                   |
| [`translate_web_docs_batch`](#mt-translation-web)        | Turjun docs‑ka website‑ka adigoo adeegsanaya OpenAI Batch API (mudnaanta).                                      |
| [`translate_web_docs_sync`](#mt-translation-web)         | Turjun docs‑ka website‑ka si isku‑xigxig ah (dhaxal, aan batch ahayn).                                          |
| [`translate_web_index`](#mt-translation_web_index)       | Magac kale u ah `translation_web_index`.                                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | Turjun UI‑ga homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).                       |
| [`web_build`](#mt-web_build)                             | Dhis docs ilaa `website/build` (waxay taageertaa `--locales` / `BUILD_LOCALES`).                                |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Hubinta isku‑xirka oo offline‑ammaan ah (wuu dhaafaa HTTP[S] fog).                                              |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Hor‑eegiga maxalliga ah ee gh‑pages; si toos ah uga adeego 8080–8090; tijaabooyin/isku‑xir‑hubin ikhtiyaari ah. |
| [`web_push_github`](#mt-web_push_github)                 | Riix `website/build` laanta `gh-pages`.                                                                         |

Qaabka xulashooyinka

- Isticmaal `make <command> OPTS="…"` si aad u gudbiso xulashooyinka (xigashooyin waa lagu taliyaa). Bartilmaameed kasta hoose wuxuu muujinayaa tusaale isticmaal.

--

-

#### Talooyin dhiska locale‑ga {#locale-build-tips}

- Dhis qayb ka mid ah luqadaha: deji `BUILD_LOCALES="en de"` ama gudbi `OPTS="--locales en,de"` bartilmaameedyada web‑ka.
- Hor‑eeg luqad gaar ah: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Dhis & Baakad {#build-and-package}

- Dhis ZIP‑yo: `make pack`
- Waxay ka dhalisaa ATN iyo LOCAL ZIPs xididka repo‑ga (ha tafatirin wax‑soo‑saarka gacanta)
- Talo: cusboonaysii nooca labadaba `sources/manifest_ATN.json` iyo `sources/manifest_LOCAL.json` ka hor baakadeynta
- Rakibid gacmeed (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → dooro ZIP‑ka la dhisay

---

### Tijaabo {#test}

- Xirmo buuxda: `make test` (Vitest)
- Daboolid (ikhtiyaari):
- `npm i -D @vitest/coverage-v8`
- Orod `make test`; fur `coverage/index.html` warbixinta HTML
- Keliya i18n: `make test_i18n` (furayaasha UI/meelaha lagu buuxiyo/cinwaanno + website isku‑ekaanshaha per‑locale per‑doc oo leh hubinta id/title/sidebar_label)

---

### Baarid & Diiwaanno {#debugging-and-logs}

- Console‑ka Khaladaadka: Tools → Developer Tools → Error Console
- Bedel baloogyada faahfaahsan xilliga orodka:
- Daar: `messenger.storage.local.set({ debug: true })`
- Dem: `messenger.storage.local.set({ debug: false })`
- Baloogyadu waxay muuqdaan inta lagu jiro qorista/dirista jawaabaha

---

### Docs (website) {#docs-website}

- Server‑ka dev: `cd website && npm run start`
- Dhis goobta taagan: `cd website && npm run build`
- Lammaanayaasha Make (alifbeeto): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Tusaalooyin isticmaal:
- EN kaliya, ka bood tijaabooyin/isku‑xir‑hubin, ma jiro push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Dhammaan luqadaha, leh tijaabooyin/isku‑xir‑hubin, ka dibna push: `make web_build_local_preview && make web_push_github`
- Ka hor daabicidda, orod hubinta isku‑xirka ee offline‑ammaan: `make web_build_linkcheck`.
- i18n: Ingiriis wuxuu ku nool yahay `website/docs/*.md`; Turjumaadaha Jarmalka ee `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Raadinta: Haddii doorsoomayaasha deegaanka ee Algolia DocSearch lagu dejiyo CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), goobtu waxay isticmaashaa raadinta Algolia; haddii kale waxay ku noqotaa raadinta maxalliga ah. Bogga hore, riix `/` ama `Ctrl+K` si aad u furto sanduuqa raadinta.

---

#### Jidka u‑leexinta Deeqda {#donate-redirect}

- `website/src/pages/donate.js`
- Jid: `/donate` (iyo `/<locale>/donate`)
- Dabeecad:
- Haddii jidka hadda uu leeyahay locale (tusaale, `/de/donate`), isticmaal
- Haddii kale, dooro is‑waafajinta ugu fiican ee `navigator.languages` vs luqadaha la habeeyey; ku noqnoqoshada locale‑ga caadiga ah
- U leexdaa:
- `en` → `/docs/donation`
- kuwa kale → `/<locale>/docs/donation`
- Waxay isticmaashaa `useBaseUrl` si loo maareeyo baseUrl si sax ah
- Waxay ku jirtaa meta refresh + xiriir `noscript` sida fallback

---

---

#### Talooyin Hor‑eeg {#preview-tips}

- Jooji hor‑eegga Node si nadiif ah: fur `http://localhost:<port>/__stop` (waxaa la daabacay ka dib `Local server started`).
- Haddii sawirradu aanay ka soo bixin MDX/JSX, isticmaal `useBaseUrl('/img/...')` si loo ixtiraamo `baseUrl` ee goobta.
- Hor‑eeggu wuxuu bilaabmaa marka hore; hubinta isku‑xirku waxay ordaa ka dibna mana xannibayso (isku‑xirro dibadda oo jaban ma joojinayaan hor‑eegga).
- Tusaalaha URL hor‑eeg: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (waxaa la daabacay ka dib “Local server started”).
- Isku‑xirro dibadeed ee hubinta isku‑xirka: Goobo dibadeed oo qaarkood (tusaale, addons.thunderbird.net) waxay xannibaan baadi‑goobayaasha tooska ah waxayna muujin karaan 403 hubinta isku‑xirrada. Hor‑eeggu weli wuu bilaabmaa; kuwani waa ammaan in la iska indho tiro.

---

#### Turjun Website‑ka {#translate-website}

Waxaad turjumi karto

- Kaliya UI‑ga website‑ka: bogga hore, navbar, footer, iyo xarigyada kale ee UI. Nuxurka docs waqtigan Ingiriisi‑keliya ayuu ahaanayaa.

Halka lagu tafatiro

- Tafatir `website/i18n/<locale>/code.json` (isticmaal `en` tixraac ahaan). Ka dhig meelaha kaydka sida `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` aan la beddelin.

Abuur ama cusboonaysii faylasha

- Abuur stub‑yo maqan dhammaan luqadaha: `npm --prefix website run i18n:stubs`
- Ku qoro stub‑yada laga bilaabo Ingiriisi (ka dib markaad ku darto xarigyo cusub): `npm --prefix website run i18n:stubs:force`
- Ikhtiyaar kale oo luqad keliya ah: `npx --prefix website docusaurus write-translations --locale <locale>`

Turjun xarigyada UI ee homepage/navbar/footer (OpenAI)

- Deji aqoonsiyada hal mar (shell ama .env):
- `export OPENAI_API_KEY=sk-...`
- Ikhtiyaari: `export OPENAI_MODEL=gpt-4o-mini`
- Hal‑mari (dhammaan luqadaha, ka bood en): `make translate_web_index`
- Ku koob luqado gaar ah: `make translate_web_index OPTS="--locales de,fr"`
- Ku qor qiimayaasha jira: `make translate_web_index OPTS="--force"`

Xaqiijin & iskuday dib

- Qoraalka turjumaaddu waxa uu xaqiijiyaa qaabka JSON, waxa uu ilaaliyaa meelaha curly‑brace, waxa uuna hubiyaa in URL‑yadu aan la beddelin.
- Marka ay fashilanto xaqiijintu, waxa uu ku celinayaa illaa 2 jeer isagoo bixinaya jawaab celin ka hor inta aanu ilaalin qiimayaasha jira.

Hor‑eeg luqaddaada

- Server‑ka dev: `npm --prefix website run start`
- Booqo `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Dirista

- Fur PR oo leh fayl(asha) `code.json` ee la tafatiray. Ka dhig isbeddellada kuwo kooban oo ku dar shaashad degdeg ah marka ay suurtagal tahay.

---

### Talooyin Amni & Habayn {#security-and-configuration-tips}

- Ha commiteyn `sources/manifest.json` (si ku‑meelgaar ah ayaa loogu abuuraa dhisidda)
- Ku hay `browser_specific_settings.gecko.id` deggan si loo ilaaliyo kanaalka cusboonaysiinta

---

### Joogteynta Dejimaha {#settings-persistence}

- Kaydinta: Dhammaan dejimaha isticmaale waxay ku jiraan `storage.local` waxayna sii jiraan dhamaan cusboonaysiinta ku‑darka.
- Rakibid: Caadiyeyaasha waxa la dalbadaa keliya marka furuhu si adag u maqan yahay (undefined).
- Cusboonaysiin: U‑u guurid waxa ay buuxisaa furayaasha maqan oo keliya; qiimayaasha jira waligood lama qoro dushooda.
- Calaamadda schema: `settingsVersion` (haatan `1`).
- Furayaal iyo caadiyeyaal:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Koodh: eeg `sources/background.js` → `initializeOrMigrateSettings()` iyo `SCHEMA_VERSION`.

Hab‑socodka dev (ku darista dejin cusub)

- Kordhi `SCHEMA_VERSION` ee `sources/background.js`.
- Ku dar furaha cusub + caadiga shayga `DEFAULTS` ee `initializeOrMigrateSettings()`.
- Adeegso xeerka "only-if-undefined" markaad beereyso caadiyeyaasha; ha qorin dusha qiimayaasha jira.
- Haddii dejintu ay u muuqato isticmaalaha, ku xir `sources/options.js` oo ku dar xarigyo la degaanniyey.
- Ku dar/habay tijaabooyinka (eeg `tests/background.settings.migration.test.js`).

Talooyin tijaabo gacmeed

- Ku dayo rakibid cusub: nadiifi galka xogta ee ku‑darka ama ka bilow profile cusub.
- Ku dayo cusboonaysiin: deji `settingsVersion` ilaa `0` gudaha `storage.local` oo dib u rar; xaqiiji in qiimayaasha jira aan la beddelin oo keliya furayaasha maqan la daray.

---

### Dhibaato‑xallin {#troubleshooting}

- Hubi in Thunderbird uu yahay 128 ESR ama ka cusub
- U isticmaal Console‑ka Khaladaadka arrimaha waqtiga orodka
- Haddii dejimaha kaydsan ay u muuqdaan inaanay si sax ah u shaqaynayn, dib u bilow Thunderbird oo isku day mar kale. (Thunderbird waxa laga yaabaa inuu kaydiyo xaalad inta u dhaxaysa fadhiyada; dib u bilaabiddu waxay xaqiijisaa in dejimo cusub la raro.)

---

### CI & Daboolid {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) waxay oroddaa vitest oo leh heerarka daboolka (85% lines/functions/branches/statements). Haddii heerarku aan la gaarin, shaqadu way fashilantaa.
- Workflow‑ku waxa uu soo geliyaa wax‑soo‑saarka `coverage-html` oo leh warbixinta HTML; kala soo bixi bogga orodka (Actions → orodka ugu dambeeya → Artifacts).

---

### Ka‑qaybgal {#contributing}

- Eeg CONTRIBUTING.md talooyinka laamaha/commit/PR
- Talo: Samee profile horumarineed oo Thunderbird ah oo gaar ah tijaabinta si aadan u saameyn profile‑kaaga maalinlaha ah.

---

### Turjumaad

- Socodsiinta shaqooyin turjumaad oo waaweyn “dhammaan → dhammaan” way gaabi karaan oo qaali bay noqon karaan. Ka bilow qaybo yar (tusaale, dhowr docs iyo 1–2 luqadood), dib u eeg natiijada, ka dibna ballaari.

---

- Siyaasadda isku‑dayga: hawlaha turjumaaddu waxay sameeyaan ilaa 3 isku‑day oo leh backoff exponential marka khaladaadka API dhacaan; eeg `scripts/translate_web_docs_batch.js` iyo `scripts/translate_web_docs_sync.js`.

Shaashado loogu talagalay docs

- Kaydi sawirrada hoosta `website/static/img/`.
- Ku tixraac kuwan MD/MDX adigoo adeegsanaya `useBaseUrl('/img/<filename>')` si jidadku ula shaqeeyaan `baseUrl` ee goobta.
- Ka dib markaad ku darto ama magac beddesho sawirrada hoosta `website/static/img/`, xaqiiji in dhammaan tixraacyadu wali adeegsadaan `useBaseUrl('/img/…')` oo ay ka muuqdaan hor‑eeg maxalli ah.
  Favicons

- `favicon.ico` cabbirro badan ayaa si toos ah loogu abuuraa dhammaan jidadka dhiska (Make + qoraallo) iyada oo loo sii marayo `website/scripts/build-favicon.mjs`.
- Talaabo gacmeed looma baahna; cusboonaysiinta `icon-*.png` ayaa ku filan.
  Talo dib‑u‑eegis

- Ku hay `id` ee front‑matter aan la beddelin docs‑ka la turjumay; turjun kaliya `title` iyo `sidebar_label` marka ay jiraan.

#### clean {#mt-clean}

- Ujeeddo: ka saar wax‑soo‑saarrada dhisid/hor‑eeg ee maxalliga ah.
- Isticmaal: `make clean`
- Waxay ka saartaa (haddii ay jiraan):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Ujeeddo: qaabee, tijaabi, cusboonaysii changelog, commit, oo push.
- Isticmaal: `make commit`
- Faahfaahin: waxay ordaa Prettier (qor), `make test`, `make test_i18n`; waxay ku darto changelog marka isbeddello la diyaariyey jiraan; waxay ku riixdaa `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Ujeeddo: orod ESLint adigoo adeegsanaya qaabeyn fidsan.
- Isticmaal: `make eslint`

---

#### help {#mt-help}

- Ujeeddo: ku qor dhammaan bartilmaameedyada oo leh dukumeenti hal‑sadar.
- Isticmaal: `make help`

---

#### lint {#mt-lint}

- Ujeeddo: ka nadiifi MailExtension adigoo adeegsanaya `web-ext`.
- Isticmaal: `make lint`
- Qoraallo: si ku‑meelgaar ah ayuu u koobiyeeyaa `sources/manifest_LOCAL.json` → `sources/manifest.json`; wuxuu iska indha tirayaa ZIP‑yada la dhisay; digniinuhu ma fashiliyaan khadka wax‑soo‑saarka.

---

#### menu {#mt-menu}

- Ujeeddo: menu isdhexgal ah si aad u doorato bartilmaameedka Make iyo doodaha ikhtiyaariga ah.
- Isticmaal: orod `make` adigoon wax dood ah gelin.
- Qoraallo: haddii `whiptail` aanu diyaar ahayn, menu‑gu waxa uu ku noqdaa `make help`.

---

#### pack {#mt-pack}

- Ujeeddo: dhis ATN iyo LOCAL ZIPs (waxay ku xirantaa `lint`).
- Isticmaal: `make pack`
- Talo: kordhi noocyada labadaba `sources/manifest_*.json` ka hor baakadeynta.

---

#### prettier {#mt-prettier}

- Ujeeddo: ku qaabee repo‑ga meeshiisa.
- Isticmaal: `make prettier`

#### prettier_check {#mt-prettier_check}

- Ujeeddo: xaqiiji qaabaynta (qoris la’aan).
- Isticmaal: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Ujeeddo: magac kale u ah `prettier`.
- Isticmaal: `make prettier_write`

---

#### test {#mt-test}

- Ujeeddo: orod Prettier (qor), ESLint, ka dib Vitest (daboolid haddii la rakibay).
- Isticmaal: `make test`

#### test_i18n {#mt-test_i18n}

- Ujeeddo: tijaabooyin diiradda saaraya i18n ee xarigyada ku‑darka iyo docs‑ka website‑ka.
- Isticmaal: `make test_i18n`
- Waxay ordaa: `npm run test:i18n` iyo `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Ujeeddo: turjun xarigyada UI ee ku‑darka laga bilaabo EN ilaa luqado kale.
- Isticmaal: `make translation_app OPTS="--locales all|de,fr"`
- Qoraallo: waxay ilaalisaa qaabka furayaasha iyo meelaha lagu buuxiyo; waxay ku qortaa baloogga `translation_app.log`. Qaab qoraal: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Ujeeddo: turjun docs‑ka website‑ka laga bilaabo `website/docs/*.md` ilaa `website/i18n/<locale>/...`.
- Mudnaanta: `translate_web_docs_batch` (OpenAI Batch API)
  - Isticmaal (calammo): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Dhaxal positional wali waa la aqbalayaa: `OPTS="<doc|all> <lang|all>"`
- Dabeecad: waxay dhistaa JSONL, soo gelisaa, sahanaysaa 30s kasta, soo dejisaa natiijooyinka, waxayna qortaa faylasha.
- Qoraal: shaqo batch ah waxay qaadan kartaa ilaa 24 saacadood si ay u dhammaato (sida daaqadda batch ee OpenAI). Console‑ku wuxuu muujinayaa waqtiga la qaatey sahan kasta.
- Deegaan: `OPENAI_API_KEY` (lama huraan), ikhtiyaari `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (24h caadi ahaan), `BATCH_POLL_INTERVAL_MS`.
- Dhaxal: `translate_web_docs_sync`
  - Isticmaal (calammo): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Dhaxal positional wali waa la aqbalayaa: `OPTS="<doc|all> <lang|all>"`
- Dabeecad: codsiyo is‑xigxig ah per‑lamaan (ma jirto uruurin batch).
- Qoraallo: Wacyigelin isdhexgal ah marka `OPTS` la dhaafo. Labada habba waxay ilaaliyaan baloogyada koodhka/inline‑ka waxayna ka dhigaan `id` ee front‑matter aan la beddelin; waxay ku qoraan `translation_web_batch.log` (batch) ama `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Ujeeddo: turjun xarigyada UI ee website‑ka (homepage, navbar, footer) laga bilaabo `website/i18n/en/code.json` ilaa dhammaan luqadaha hoosta `website/i18n/<locale>/code.json` (marka laga reebo `en`).
- Isticmaal: `make translate_web_index` ama `make translate_web_index OPTS="--locales de,fr [--force]"`
- Shuruudaha: soo dhoofso `OPENAI_API_KEY` (ikhtiyaari: `OPENAI_MODEL=gpt-4o-mini`).
- Dabeecad: waxay xaqiijisaa qaabka JSON, waxay ilaalisaa meelaha curly‑brace, URLs‑kana kama beddesho, waxayna iskudaysaa dib iyadoo bixisa jawaab celin marka khaladaad xaqiijin ah dhacaan.

---

#### web_build {#mt-web_build}

- Ujeeddo: dhis goobta docs ilaa `website/build`.
- Isticmaal: `make web_build OPTS="--locales en|de,en|all"` (ama deji `BUILD_LOCALES="en de"`)
- Gudaha: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Ku‑tiirsanaan: waxay ordaa `npm ci` gudaha `website/` kaliya haddii `website/node_modules/@docusaurus` maqan yahay.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Ujeeddo: hubinta isku‑xir offline‑ammaan ah.
- Isticmaal: `make web_build_linkcheck OPTS="--locales en|all"`
- Qoraallo: waxay u dhistaa `tmp_linkcheck_web_pages`; waxay u beddeshaa `baseUrl` ilaa `/` ee GH Pages; waxay ka booddaa isku‑xirro HTTP(S) oo fog.

#### web_build_local_preview {#mt-web_build_local_preview}

- Ujeeddo: hor‑eeg maxalli ah oo gh‑pages leh tijaabooyin/isku‑xir‑hubin ikhtiyaari ah.
- Isticmaal: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Dabeecad: marka hore isku day server‑ka hor‑eegga Node (`scripts/preview-server.mjs`, wuxuu taageeraa `/__stop`), kadibna ku laabto `python3 -m http.server`; wuxuu ka adeegi doonaa 8080–8090; PID ku yaal `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Ujeeddo: riix `website/build` laanta `gh-pages`.
- Isticmaal: `make web_push_github`

Talo: deji `NPM=…` si aad u beddesho maamulaha xirmooyinka ee Makefile isticmaalo (caadi ahaan `npm`).
