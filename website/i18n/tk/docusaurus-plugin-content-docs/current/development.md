---
id: development
title: 'Ösüş'
sidebar_label: 'Ösüş'
---

---

## Ösüş gollanmasy {#development-guide}

:::note Diňe iňlis dilindäki faýllary redaktirläň; terjimeler awtomatiki ýaýradylýar
Resminamalary diňe `website/docs` (iňlisçe) aşagynda täzeläň. `website/i18n/<locale>/…` aşagyndaky terjimeler awtomatik döredilýär we el bilen redaktirlenmeli däldir. Lokalizirlenen mazmuny täzelemek üçin terjime wezipelerini (mysal üçin, `make translate_web_docs_batch`) ulanyň.
:::

### Deslapky talaplar {#prerequisites}

- Node.js 22+ we npm (Node 22 bilen synagdan geçirildi)
- Thunderbird 128 ESR ýa-da täze (eli bilen synag üçin)

---

### Proýekt gurluşy (ýokary dereje) {#project-layout-high-level}

- Kök: gaplama skripti `distribution_zip_packer.sh`, dokumentler, ekran suratlary
- `sources/`: esasy goşundy kody (arka fon, sazlamalar/popup UI, manifestler, nyşanlar)
- `tests/`: Vitest toplum
- `website/`: Docusaurus dokumentleri (`website/i18n/de/...` aşagynda i18n bilen)

---

### Gurnama we gurallar {#install-and-tooling}

- Köke degişli baglylyklary gurnamak: `npm ci`
- Dokumentler (islege görä): `cd website && npm ci`
- Maksatlary görkezmek: `make help`

---

### Göni işe ösdürmek (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop-da çalt tekrarlama (diňe UI smoke‑synaglary):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird-de işletmek (MailExtensions üçin has gowusy):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Maslahatlar:
- Thunderbird-iň Ýalňyşlyk Konsolyny açyk saklaň (Tools → Developer Tools → Error Console).
- MV3 çäre sahypalary işjeň bolmadyk wagt togtadylýar; kod üýtgemelerinden soň goşundyny täzeden ýükläň ýa-da web‑ext avtomatiki täzeden ýüklesin.
- Diňe Firefox‑a degişli käbir häsiýetler başgaça bolup biler; API deňligini tassyklamak üçin hökman Thunderbird‑de barlaň.
- Thunderbird ikilik ýollary (mysallar):
- Linux: `thunderbird` (mysal üçin, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profil izolýasiýasy: gündelik sazlamalaryňyza täsir etmezlik üçin ösüş üçin aýratyn Thunderbird profili ulanyň.

---

### Make nyşanalary (Alfabet tertibinde) {#make-targets-alphabetical}

Makefile umumy ösüş akymlaryny standarlaýar. Her bir nyşana barada bir setirlik gysgaçaça almak üçin islendik wagt `make help` işlediň.

Maslahat: nyşana görkezilmezden `make` işledilse, nyşana saýlamak üçin ýönekeý Whiptail menýusy açylýar.

| Nyşana                                                   | Bir setirlik beýany                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ýerli build/preview artefaktlaryny aýyrmak (tmp/, web-local-preview/, website/build/).                           |
| [`commit`](#mt-commit)                                   | Formatlaý, synaglary işledýär (i18n goşmak bilen), üýtgeşmeler gündeligini täzelýär, commit edýär we push edýär. |
| [`eslint`](#mt-eslint)                                   | ESLint-i tekiz konfigurasiýa arkaly işledýär (`npm run -s lint:eslint`).                                         |
| [`help`](#mt-help)                                       | Hemmesi boýunça bir setirlik düşündirişli sanaw (tertiplendirilen).                                              |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/` üstünde (wagtylaýyn manifest; ZIP-leri äsgermeýär; ölümçül däl).                         |
| [`menu`](#mt-menu)                                       | Nyşana we islege bagly argumentleri saýlamak üçin interaktiw menýu.                                              |
| [`pack`](#mt-pack)                                       | ATN we LOCAL ZIP-leri gurýar (linteri işledýär; gaplaýjy skripti çagyrýar).                                      |
| [`prettier`](#mt-prettier)                               | Repozitoriýany ýerinde formatlaýar (üýtgeşmeleri ýazýar).                                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier barlaýyş režiminde (ýazma ýok); gaýtadan format gerek bolsa şowsuz bolýar.                              |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` üçin lakam.                                                                                           |
| [`test`](#mt-test)                                       | Ilki Prettier (ýazma), ESLint, soňra Vitest (eger gurnalansa örtük).                                             |
| [`test_i18n`](#mt-test_i18n)                             | Diňe i18n synaglary: goşundy üçin ýer tutujy/paritet + websaýt pariteti.                                         |
| [`translate_app`](#mt-translation-app)                   | `translation_app` üçin lakam.                                                                                    |
| [`translation_app`](#mt-translation-app)                 | Programma UI setirlerini `sources/_locales/en/messages.json`-den terjime et.                                     |
| [`translate_web_docs_batch`](#mt-translation-web)        | Websaýt dokumentlerini OpenAI Batch API arkaly terjime et (ödretilýär).                                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Websaýt dokumentlerini sinhron ýagdaýda terjime et (miras, non-batch).                                           |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` üçin lakam.                                                                              |
| [`translation_web_index`](#mt-translation_web_index)     | Baş sahypa/üst menýu/astes UI-ny terjime et (`website/i18n/en/code.json → .../<lang>/code.json`).                |
| [`web_build`](#mt-web_build)                             | Dokumentleri `website/build`-e gurýar (`--locales` / `BUILD_LOCALES` goldaýar).                                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Oflayn howpsuzlykly baglanyşyk barlagy (daşdaky HTTP[S]-leri geçýär).                                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Ýerli gh‑pages öň synanyşygy; 8080–8090 aralygynda awto-serwis; islege görä synaglar/baglanyşyk barlagy.         |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`-i `gh-pages` şahasyna push et.                                                                   |

Opsionlar üçin sintaksis

- Opsionlary geçirmek üçin `make <command> OPTS="…"` ulanyň (dyrnaklar maslahat berilýär). Aşakdaky her nyşana mysal ulanylyşyny görkezýär.

--

-

#### Locale gurmak boýunça maslahatlar {#locale-build-tips}

- Locale-laryň bir bölegini gurmak: `BUILD_LOCALES="en de"` goýuň ýa-da `OPTS="--locales en,de"`-i web nyşanalaryna geçiriň.
- Belli bir locale üçin öň synanyşyk: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Gurmak we gaplamak {#build-and-package}

- ZIP-leri gurmak: `make pack`
- Repo kökünde ATN we LOCAL ZIP-leri döredýär (artefaktlary el bilen redaktirlemäň)
- Maslahat: gaplamazdan öň `sources/manifest_ATN.json` hem-de `sources/manifest_LOCAL.json`-daky wersiýany täzeläň
- El bilen gurnama (ösüş): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → gurlan ZIP-faýly saýlaň

---

### Synag {#test}

- Doly toplum: `make test` (Vitest)
- Örtük (islege görä):
- `npm i -D @vitest/coverage-v8`
- `make test` işlediň; HTML hasabaty üçin `coverage/index.html` açyň
- Diňe i18n: `make test_i18n` (UI açarlary/yer tutujy/titllar + websaýt boýunça her locale/ her dokument pariteti id/title/sidebar_label barlaglary bilen)

---

### Düzediş (debug) we žurnallar {#debugging-and-logs}

- Ýalňyşlyk konsoly: Tools → Developer Tools → Error Console
- Runtime wagtynda giňişleýin žurnallary aç/ýap:
- Işjeňleşdir: `messenger.storage.local.set({ debug: true })`
- Öçür: `messenger.storage.local.set({ debug: false })`
- Jogaplary düzýän/iberýän wagtynda žurnallar peýda bolýar

---

### Dokumentler (websaýt) {#docs-website}

- Ösüş serweri: `cd website && npm run start`
- Statik saýt gurmak: `cd website && npm run build`
- Make deňleştirmeleri (alfabetik): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ulanyş mysallary:
- Diňe EN, synaglary/baglanyşyk barlagyny geç, push ýok: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Hemme locale, synaglar/baglanyşyk barlagy bilen, soňra push: `make web_build_local_preview && make web_push_github`
- Çap etmezden öň, oflajn howpsuz baglanyşyk barlagyny işlediň: `make web_build_linkcheck`.
- i18n: Iňlisçe `website/docs/*.md`-de; Nemesçe terjimeler `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`-de
- Gözleg: Eger Algolia DocSearch gurşaw üýtgeýjileri CI-de sazlanan bolsa (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), saýt Algolia gözlegi ulanar; bolmasa ýerli gözlege gaýdyp barar. Baş sahypada gözleg gutusyny açmak üçin `/` ýa-da `Ctrl+K` basyň.

---

#### Bagyş ugrukdyrmasy {#donate-redirect}

- `website/src/pages/donate.js`
- Ugrukdyrma: `/donate` (we `/<locale>/donate`)
- Hereketi:
- Häzirki ugrukdyrmada locale bar bolsa (mysal üçin, `/de/donate`), şony ulanyň
- Ýogsam, `navigator.languages` bilen sazlanan locale-laryň arasynda iň gowy gabat gelýänini saýlaň; bolmasa deslapky locale-a gaýdyp barýar
- Aşakdakylara gönükdirýär:
- `en` → `/docs/donation`
- beýlekiler → `/<locale>/docs/donation`
- Dogry baseUrl dolandyryşy üçin `useBaseUrl` ulanylýar
- Meta täzelenişi + ätiýaçlyk hökmünde `noscript` baglanyşygy öz içine alýar

---

---

#### Öň synanyşyk boýunça maslahatlar {#preview-tips}

- Node öň synanyşygyny arassa duruzmak: `http://localhost:<port>/__stop` açyň (`Local server started`-den soň çap edilýär).
- Suratlar MDX/JSX-de ýüklenmese, saýt `baseUrl`-e hormat goýmak üçin `useBaseUrl('/img/...')` ulanyň.
- Ilki öň synanyşyk başlaýar; baglanyşyk barlagy soňundan işledilýär we päsgelçilik döretmeýär (bozulandyk daşky baglanyşyklar öň synanyşygy duruzmaýar).
- Mysal öň synanyşyk URL-si: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” diýeninden soň çap edilýär).
- Baglanyşyk barlagyndaky daşky baglanyşyklar: Käbir daşky saýtlar (mysal üçin, addons.thunderbird.net) awtomatiki süýrenijileri petikleýär we baglanyşyk barlaglarynda 403 görkezmegi mümkin. Öň synanyşyk şonda-da başlaýar; bulary äsgermezlik etmek howpsuz.

---

#### Websaýty terjime etmek {#translate-website}

Näme terjime edip bilersiňiz

- Diňe websaýt UI: baş sahypa, üst menýu, ast menýu we beýleki UI setirleri. Häzirlikçe dokumentleriň mazmuny diňe iňlisçe bolýar.

Nirede redaktirlemeli

- `website/i18n/<locale>/code.json`-i redaktirläň (`en`-i nusga ýaly ulanyň). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ýaly ýer tutujylary üýtgetmäň.

Faýllary döretmek ýa-da täzelemek

- Hemme locale üçin ýetmeýän şablonlary döret: `npm --prefix website run i18n:stubs`
- Täze setirleri goşandan soň iňlisçeden şablonlary üstünden ýaz: `npm --prefix website run i18n:stubs:force`
- Birek-birek locale üçin alternatiwa: `npx --prefix website docusaurus write-translations --locale <locale>`

Baş sahypa/üst/ast menýu UI setirlerini terjime etmek (OpenAI)

- Bir gezek ygtyýarnamalary goýuň (shell ýa-da .env):
- `export OPENAI_API_KEY=sk-...`
- Islege görä: `export OPENAI_MODEL=gpt-4o-mini`
- Bir gezeklik (hemmesi, en-i geç): `make translate_web_index`
- Belli locale-lar bilen çäklendir: `make translate_web_index OPTS="--locales de,fr"`
- Bar bolan bahalary üstünden ýaz: `make translate_web_index OPTS="--force"`

Barlag we gaýtadan synanyşyklar

- Terjime skripti JSON gurluşyny barlaýar, gyrk yzygiderli ýaý bilen ýer tutujylary saklaýar we URL-leriň üýtgemeýändigini üpjün edýär.
- Barlag şowsuz bolsa, bar bolan bahalary saklamazdan öň 2 gezekçe çenli gaýtadan synanyşýar we düşündiriş berýär.

Localeňizi öň synanyşyň

- Ösüş serweri: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`-e gidiň

Ibermek

- Redaktirlenen `code.json` faýl(lar)y bilen PR açyň. Üýtgeşmeleri fokusda saklaň we mümkin bolsa çalt skrinşot goşuň.

---

### Howpsuzlyk we Konfigurasiýa maslahatlary {#security-and-configuration-tips}

- `sources/manifest.json`-i commit etmäň (gurluş tarapyndan wagtlaýyn döredilýär)
- Täzeleniş kanaly saklansyn üçin `browser_specific_settings.gecko.id` durnukly saklaň

---

### Sazlamalaryň durnuklylygy {#settings-persistence}

- Saklamak: Ulanyjynyň ähli sazlamalary `storage.local`-de saklanýar we goşundy täzelenmeleri boýunça durnukly bolýar.
- Gurnama: Deslapkylar diňe açar doly ýok (undefined) bolanda ulanylýar.
- Täzelenme: Migrasiýa diňe ýok açarlary doldurýar; bar bolan bahalar asla üstünden ýazylmaýar.
- Shema belligi: `settingsVersion` (häzirki wagtda `1`).
- Açarlar we deslapkylar:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: `sources/background.js` → `initializeOrMigrateSettings()` we `SCHEMA_VERSION`-e serediň.

Ösüş akymy (täze sazlama goşmak)

- `sources/background.js`-de `SCHEMA_VERSION`-i artdyryň.
- Täze açar + deslapky bahany `initializeOrMigrateSettings()`-däki `DEFAULTS` obýektine goşuň.
- Deslapkyları sepmekde “diňe-undefined bolsa” düzgünini ulanyň; bar bolan bahalary üstünden ýazmaň.
- Eger sazlama ulanyja görünýän bolsa, `sources/options.js`-de baglanyşyklary ediň we lokalizirlenen setirleri goşuň.
- Synaglary goşuň/saýlaň (`tests/background.settings.migration.test.js`-e serediň).

El bilen synag maslahatlary

- Täze gurnamany simulirlemek: giňeltmäniň maglumat katalogyny arassalaň ýa-da täze profil bilen başlaň.
- Täzelenmäni simulirlemek: `storage.local`-de `settingsVersion`-i `0` edip goýuň we täzeden ýükläň; bar bolan bahalaryň üýtgemeýändigini we diňe ýok açarlaryň goşulandygyny tassyklaň.

---

### Näsazlyklary düzetmek {#troubleshooting}

- Thunderbird-iň 128 ESR ýa-da täze boldugyna göz ýetiriň
- Runtime meseleleri üçin Ýalňyşlyk konsolyny ulanyň
- Eger saklanan sazlamalar dogry ulanylmaýan ýaly bolsa, Thunderbird-i täzeden işe girizip gaýtadan synanyşyň. (Thunderbird sessiýalar arasynda ýagdaýy keşiňde saklap biler; täzeden işe girizmek täze sazlamalaryň ýüklenmegini üpjün eder.)

---

### CI we Örtük {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest-i örtük eşiklandyryşlari bilen işledýär (setirleriň/funksiýalaryň/şahalaryň/beýannamalaryň 85%-i). Eşiklandyryşlara ýetilmese, iş şowsuz bolýar.
- Aýlaw (workflow) HTML hasabaty bilen `coverage-html` atly artefakty ýükläp goýýar; ony işlediş sahypasyndan ýükläp alyň (Actions → iň soňky işlediş → Artifacts).

---

### Goşant goşmak {#contributing}

- Şaham/commit/PR düzgünleri üçin CONTRIBUTING.md göriň
- Maslahat: gündelik profiliňize täsir etmezlik üçin synaglar üçin aýratyn Thunderbird ösüş profilini dörediň.

---

### Terjimeler

- Uly “hemmesi → hemmesi” terjime işlerini işletmek haýal we gymmat bolup biler. Ilki bölekden başlaň (mysal üçin, birnäçe dokument we 1–2 locale), netije barlaň, soň giňeldiň.

---

- Gaýtadan synanyşyk syýasaty: terjime işleri API ýalňyşlarynda üsti-üçin ýokarlanýan yza çekiş bilen 3 gezekçe çenli gaýtadan synanyşyk edýär; `scripts/translate_web_docs_batch.js` we `scripts/translate_web_docs_sync.js`-e serediň.

Dokumentler üçin skrinşotlar

- Suratlary `website/static/img/` aşagynda saklaň.
- Olara MD/MDX-de `useBaseUrl('/img/<filename>')` arkaly salgylanyň, şonda ýollar saýt `baseUrl` bilen işleýär.
- `website/static/img/` aşagynda suratlary goşandan ýa-da adyny üýtgedenden soň, ähli salgylaryň henizem `useBaseUrl('/img/…')` ulanýandygyny we ýerli öň synanyşykda çykýandygyny tassyklaň.
  Favikonlar

- Köp‑ölçegli `favicon.ico` ähli guruluş ýollarynda (Make + skriptler) `website/scripts/build-favicon.mjs` arkaly awtomatiki döredilýär.
- El bilen ädim talap edilmeýär; `icon-*.png`-i täzeläniňiz ýeterlik.
  Gözden geçiriş maslahaty

- Terjime edilen dokumentlerde front‑matter `id` üýtgemezsin; diňe bar bolsa `title` we `sidebar_label`-i terjime ediň.

#### clean {#mt-clean}

- Maksat: ýerli build/preview artefaktlaryny aýyrmak.
- Ulanylyşy: `make clean`
- Aýyrýar (bar bolsa):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Maksat: format, synag, üýtgeşmeler gündeligini täzeläň, commit we push.
- Ulanylyşy: `make commit`
- Jikme-jik: Prettier (ýazma), `make test`, `make test_i18n` işledýär; sahnalaşdyrylan tapawutlar bar bolsa üýtgeşmeler gündeligine goşýar; `origin/<branch>`-a push edýär.

---

#### eslint {#mt-eslint}

- Maksat: ESLint-i tekiz konfigurasiýa arkaly işlediň.
- Ulanylyşy: `make eslint`

---

#### help {#mt-help}

- Maksat: ähli nyşanalary bir setirlik düşündiriş bilen sanap görkezmek.
- Ulanylyşy: `make help`

---

#### lint {#mt-lint}

- Maksat: `web-ext` ulanyp MailExtension-y lint etmek.
- Ulanylyşy: `make lint`
- Bellikler: wagtlaýyn `sources/manifest_LOCAL.json` → `sources/manifest.json` göçürýär; gurlan ZIP-leri äsgermeýär; duýduryşlar piliňi şowsuzlandyrmaýar.

---

#### menu {#mt-menu}

- Maksat: Make nyşanasyny we islege görä argumentleri saýlamak üçin interaktiw menýu.
- Ulanylyşy: argumentler bermän `make` işlediň.
- Bellikler: eger `whiptail` elýeterli däl bolsa, menýu `make help`-a gaýdyp barar.

---

#### pack {#mt-pack}

- Maksat: ATN we LOCAL ZIP-leri gurmak (`lint`-e bagly).
- Ulanylyşy: `make pack`
- Maslahat: gaplamazdan öň `sources/manifest_*.json` ikisinde-de wersiýalary artdyryň.

---

#### prettier {#mt-prettier}

- Maksat: repo-ni ýerinde formatlamak.
- Ulanylyşy: `make prettier`

#### prettier_check {#mt-prettier_check}

- Maksat: formatlamany barlamak (ýazma ýok).
- Ulanylyşy: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Maksat: `prettier` üçin lakam.
- Ulanylyşy: `make prettier_write`

---

#### test {#mt-test}

- Maksat: Prettier (ýazma), ESLint, soňra Vitest (gurnalanso örtük) işlediň.
- Ulanylyşy: `make test`

#### test_i18n {#mt-test_i18n}

- Maksat: goşundy setirleri we websaýt dokumentleri üçin i18n‑ugurly synaglar.
- Ulanylyşy: `make test_i18n`
- Işledýär: `npm run test:i18n` we `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Maksat: goşundynyň UI setirlerini EN-den beýleki locale-lara terjime etmek.
- Ulanylyşy: `make translation_app OPTS="--locales all|de,fr"`
- Bellikler: açar gurluşyny we ýer tutujylary saklaýar; `translation_app.log`-e log ýazýar. Skript görnüşi: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Maksat: websaýt dokumentlerini `website/docs/*.md`-den `website/i18n/<locale>/...`-e terjime etmek.
- Öwülýän: `translate_web_docs_batch` (OpenAI Batch API)
  - Ulanylyşy (flaglar): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Miras pozisionally ýagdaý entek kabul edilýär: `OPTS="<doc|all> <lang|all>"`
- Hereketi: JSONL gurýar, ýükläp goýýar, her 30 sekuntda barlaýar, netijeleri düşürýär, faýllary ýazýar.
- Bellik: batch işi dolmak üçin 24 sagada çenli wagt alyp biler (OpenAI-nyň batch penjiresine görä). Konsol her barlagda geçen wagty görkezýär.
- Gurşaw: `OPENAI_API_KEY` (hökmany), islege görä `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (deslapky 24s), `BATCH_POLL_INTERVAL_MS`.
- Miras: `translate_web_docs_sync`
  - Ulanylyşy (flaglar): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Miras pozisional görnüşi entek kabul edilýär: `OPTS="<doc|all> <lang|all>"`
- Hereketi: jübüt-jübüt sinhron islegler (batch birleşdirme ýok).
- Bellikler: `OPTS` goýberilende interaktiw soraglar görkezilýär. Iki režimde-de kod bloklary/ goşmaça kod üýtgewsiz saklanýar we front‑matter `id` üýtgedilmeýär; loglar `translation_web_batch.log` (batch) ýa-da `translation_web_sync.log` (sync) içine ýazylýar.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Maksat: websaýt UI setirlerini (baş sahypa, üst menýu, ast menýu) `website/i18n/en/code.json`-den `website/i18n/<locale>/code.json` aşagyndaky ähli locale-lara terjime etmek (`en`-i hasaba almaýar).
- Ulanylyşy: `make translate_web_index` ýa-da `make translate_web_index OPTS="--locales de,fr [--force]"`
- Talaplar: `OPENAI_API_KEY` eksport ediň (islege görä: `OPENAI_MODEL=gpt-4o-mini`).
- Hereketi: JSON gurluşyny tassyklap barlaýar, gyrk ýaýly ýer tutujylary saklaýar, URL-leri üýtgetmeýär we barlag ýalňyşlarynda köpçülikleýin düşünjili gaýtadan synanyşyk edýär.

---

#### web_build {#mt-web_build}

- Maksat: dokumentler saýtuny `website/build`-e gurmak.
- Ulanylyşy: `make web_build OPTS="--locales en|de,en|all"` (ýa-da `BUILD_LOCALES="en de"`-i goýuň)
- Içki detaylar: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Garaşyklar: diňe `website/node_modules/@docusaurus` ýok bolsa, `website/`-de `npm ci` işledýär.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Maksat: oflajn howpsuz baglanyşyk barlagy.
- Ulanylyşy: `make web_build_linkcheck OPTS="--locales en|all"`
- Bellikler: `tmp_linkcheck_web_pages`-e gurýar; GH Pages `baseUrl`-i `/`-e täzeden ýazýar; daşky HTTP(S) baglanyşyklaryny geçýär.

#### web_build_local_preview {#mt-web_build_local_preview}

- Maksat: islege görä synaglar/baglanyşyk barlagy bilen ýerli gh‑pages öň synanyşygy.
- Ulanylyşy: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Hereketi: ilki Node öň synanyşyk serwerini synap görýär (`scripts/preview-server.mjs`, `/__stop` goldaýar), soň `python3 -m http.server`-a gaýdyp barýar; 8080–8090-da hyzmat edýär; PID `web-local-preview/.server.pid`-de.

#### web_push_github {#mt-web_push_github}

- Maksat: `website/build`-i `gh-pages` şahasyndaky ýerine push etmek.
- Ulanylyşy: `make web_push_github`

Maslahat: Makefile tarapyndan ulanylýan paket dolandyryjyny üýtgetmek üçin `NPM=…`-i goýuň (deslapky `npm`).

---
