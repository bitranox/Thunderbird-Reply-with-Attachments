---
id: development
title: 'Misooma'
sidebar_label: 'Misooma'
---

---

## Qajeelfama Misoomaa {#development-guide}

:::note Afaan Ingiliffaa qofaan gulaali; hiikkoonni ofumaan ni tamsa’u
Sanadoota ragaa (documentation) **qofa** jalatti `website/docs` (Afaan Ingiliffaa) keessatti haaromsi. Hiikkoonni `website/i18n/<locale>/…` jalatti uumaman; harka qofaan hin gulaalamuu. Qabiyyee bifa‑naannoo (localized) haaromsuuf hojii hiikkaa fayyadami (fakkeenyaaf, `make translate_web_docs_batch`).
:::

### Durtii {#prerequisites}

- Node.js 22+ fi npm (Node 22 waliin qoratame)
- Thunderbird 128 ESR yookaan isaa oli (qorannoo harkaatiin)

---

### Sirna Projeektii (sadarkaa ol‑aanaa) {#project-layout-high-level}

- Bu’uura (root): sirna paakeejii `distribution_zip_packer.sh`, docs, suuraawwan (screenshots)
- `sources/`: koodii dabalataa (background, options/popup UI, manifests, icons)
- `tests/`: walgitiinsa Vitest
- `website/`: Docusaurus docs (i18n jalatti `website/i18n/de/...` qaba)

---

### Teessisuu fi Meeshaalee {#install-and-tooling}

- Deps bu’uuraa fe’i: `npm ci`
- Docs (filannoo): `cd website && npm ci`
- Taargatoota barbaadi: `make help`

---

### Misooma Itti‑Jiru (web‑ext run) {#live-dev-web-ext}

- Muriidhaa saffisaa irratti Firefox Desktop (UI smoke‑tests qofa):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird keessa oofi (MailExtensions irratti filatamaa):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Gorsa:
- Konsoolii Dogoggoraa Thunderbird banuu haala itti fufinsaatti eegi (Tools → Developer Tools → Error Console).
- Fuuloleen event MV3 osoo hin hojjanne yemmuu turan ni dhaabbatu; koodiin jijjiiramee booda dabalataa irra deebiin fe’i, yookaan web‑ext akka ofumaan irra deebi’u hayyami.
- Amaloonni kan Firefox‑qofa muraasni adda adda; walsimannaa API mirkaneessuuf yeroo hunda Thunderbird keessatti ilaali.
- Karoora (path) binary Thunderbird (fakkeenya):
- Linux: `thunderbird` (fakkeenya, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Addaan baafannaa prooffaayilii: Sirna misoomaaf prooffaayilii Thunderbird addaa fayyadami akka qunnamtii hojii guyyaa kee hin miine.

---

### Taargatoota Make (Alfaabeetiin) {#make-targets-alphabetical}

Makefile deebi’aa hojii misoomaa waloo sirreessa. Yeroo kamiyyuu `make help` oofi kallattiin ibsa sarara‑tokkoon taargatoota hunda argachuuf.

Tarsiimoo: `make` taargatiin alaa yoo oofte, foddaa Whiptail salphaa banama; achirraa taargatii filadhu.

| Taargatii                                                | Ibsa sarara tokko                                                                             |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Oomishaalee/ilaalchii naannoo haqi (tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | Sirreeffami (format), qorannoo (i18n dabalatee) oofi, changelog haaraa galchi, commit & push. |
| [`eslint`](#mt-eslint)                                   | ESLint bifa flat configtiin oofi (`npm run -s lint:eslint`).                                  |
| [`help`](#mt-help)                                       | Taargatoota hunda tarreessi ibsa sarara‑tokkoon (sirriitti qindaa’e).                         |
| [`lint`](#mt-lint)                                       | web‑ext lint irratti `sources/` (manifest yeroo muraasa; ZIPs hin ilaalu; hin ajjeesu).       |
| [`menu`](#mt-menu)                                       | Sajoo wal‑itti hidhata qindaa’e (interactive) taargatii fi filannoowwan dabalataa filachuuf.  |
| [`pack`](#mt-pack)                                       | ATN fi LOCAL ZIPs ijaari (linter oofa; scripitii packer waama).                               |
| [`prettier`](#mt-prettier)                               | Repo iddoo isa jirutti sirreeffami (barreessuu ni raawwata).                                  |
| [`prettier_check`](#mt-prettier_check)                   | Prettier haalata sakatta’aa (hin barreessu); yoo sirreeffamuu barbaachise kufa.               |
| [`prettier_write`](#mt-prettier_write)                   | Aliyaasa `prettier`.                                                                          |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, booda Vitest (coverage yoo qophaa’e).                               |
| [`test_i18n`](#mt-test_i18n)                             | Qorannoo i18n‑qofa: bakka bu’oota dabalataa/wwalfakkaataa + walsimannaa website.              |
| [`translate_app`](#mt-translation-app)                   | Aliyaasa `translation_app`.                                                                   |
| [`translation_app`](#mt-translation-app)                 | Maqaa UI app gara `sources/_locales/en/messages.json` irraa hiiki.                            |
| [`translate_web_docs_batch`](#mt-translation-web)        | Sanadoota website OpenAI Batch APIn hiiki (kan filatamaa).                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | Sanadoota website haala synchronous (legacy, non-batch) hiiki.                                |
| [`translate_web_index`](#mt-translation_web_index)       | Aliyaasa `translation_web_index`.                                                             |
| [`translation_web_index`](#mt-translation_web_index)     | UI fuula‑jalqabaa/navbar/footer hiiki (`website/i18n/en/code.json → .../<lang>/code.json`).   |
| [`web_build`](#mt-web_build)                             | Docs gara `website/build` ijaari (`--locales` / `BUILD_LOCALES` ni deeggara).                 |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Sakatta’iinsa link offline‑safe (HTTP[S] fagoo ni darbata).                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Itti‑yaadama gh‑pages naannoo; tajaajila 8080–8090 irratti; filannoo tests/link‑check.        |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` gara caancalaa `gh-pages` tti dhiibi (push).                                  |

Syntax filannoowwan (options)f

- `make <command> OPTS="…"` fayyadami filannoowwan dabarsuuf (qubeeleen “quotes” ni gorfamu). Taargatoota gadi aanan keessatti fakkeenyi itti fayyadama ni mul’ata.

--

-

#### Gorsa ijaarsa locale {#locale-build-tips}

- Locale muraasa qofa ijaaruuf: `BUILD_LOCALES="en de"` kaa’i yookaan `OPTS="--locales en,de"` taargatoota web irratti dabarsi.
- Locale tokko qofa itti‑yaaduuf: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Ijaari & Paakeejii {#build-and-package}

- ZIPs ijaari: `make pack`
- ATN fi LOCAL ZIPs bu’uura repo irratti uuma (oomishaalee harka qofaan hin gulaalin)
- Tarsiimoo: bifa baay’ina lakkoofsa (version) lamaan `sources/manifest_ATN.json` fi `sources/manifest_LOCAL.json` keessatti haaromsi paakeejii dura
- Harkaatiin fe’i (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → ZIP ijaarame filadhu

---

### Qorannoo {#test}

- Walitti qabaa guutuu: `make test` (Vitest)
- Coverage (filannoo):
- `npm i -D @vitest/coverage-v8`
- `make test` oofi; `coverage/index.html` bani gabaasa HTML ilaaluuf
- i18n qofa: `make test_i18n` (mataa‑addeessa UI/placeholder/titles + walsimannaa website locale‑per‑doc waliin id/title/sidebar_label sakatta’i)

---

### Sakatta’iinsa dogoggoraa fi Logoota {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Logoota bal’inaan yeroo hojjetu keessatti banu/cufu:
- Banu: `messenger.storage.local.set({ debug: true })`
- Cufu: `messenger.storage.local.set({ debug: false })`
- Logoonni yeroo deebii barreessuu/erguu keessa mul’atu

---

### Docs (website) {#docs-website}

- Tajaajila misoomaa: `cd website && npm run start`
- Bakka bultii suuta (static site) ijaari: `cd website && npm run build`
- Waan walsimoo Make (alfaabeetiin): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Fakkeenya itti fayyadama:
- EN qofa, tests/link‑check dhiisi, push hin taasifne: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Locale hunda, tests/link‑check waliin, booda push: `make web_build_local_preview && make web_push_github`
- Maxxansiinsa dura, sakatta’iinsa link offline‑safe oofi: `make web_build_linkcheck`.
- i18n: Afaan Ingiliffaan `website/docs/*.md` keessatti jira; hiikkoonni Jarmanii `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` keessatti
- Barbaacha: Yoo bitaa naannawaa Algolia DocSearch CI keessatti qophaa’e (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), saayitiin barbaacha Algolia fayyadama; yoo hin jiraanne ammoo barbaacha naannoo fayyadama. Fuula‑jalqaba irratti, `/` yookaan `Ctrl+K` cuqaasi sanduuqa barbaachaa banuuf.

---

#### Gara deeggarsaatti qajeelchu {#donate-redirect}

- `website/src/pages/donate.js`
- Karaa: `/donate` (fi `/<locale>/donate`)
- Amala:
- Karaan ammaa locale qabaate (fkn, `/de/donate`) yoo ta’e, isa sanatti fayyadami
- Yoo hin jirre, walfakkaataa gaarii `navigator.languages` fi locale qindaa’aman jidduu filadhu; dhimmichaaf locale sirrii ta’eetti deebi’a
- Gara kanaatti qajeelcha:
- `en` → `/docs/donation`
- kan biroo → `/<locale>/docs/donation`
- `useBaseUrl` fayyadama baseUrl sirnaan too’achuuf
- Deebii bakkalcha ta’ee meta refresh + link `noscript` dabalata

---

---

#### Gorsa Itti‑yaadama {#preview-tips}

- Node preview sirnaan dhaabi: `http://localhost:<port>/__stop` banu (kan maxxanfamu `Local server started` booda).
- Suuraaleen MDX/JSX keessatti hin fe’aanne yoo ta’e, `useBaseUrl('/img/...')` fayyadami akka `baseUrl` saayitii kabajamu.
- Itti‑yaadami jalqaba; erga jalqabamee booda sakatta’iinsi link ni fiigaa fi to’annoo hin ugguru (link alaa caccabaa itti‑yaadama hin dhaabu).
- Fakkeenya URL itti‑yaadama: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” booda ni maxxanfama).
- Link alaa sakatta’iinsa link keessatti: Marsariitii alaa muraasni (fkn, addons.thunderbird.net) qaxxaamurtoota otomaatii ugguru; 403 agarsiisu danda’u. Itti‑yaadami garuu ni jalqaba; kanneen kana ni dhiifamu.

---

#### Websayitii Hiiki {#translate-website}

Wanti ati hiiku dandeessu

- UI website qofa: fuula‑jalqabaa, navbar, footer, fi barruulee UI biroo. Qabiyyeen docs ammatti Ingiliffaa‑qofa ta’a.

Eessa gulaali

- `website/i18n/<locale>/code.json` gulaali (`en` akka maddi tumsaa fayyadami). Bakka bu’oota akkuma `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` akkasumaatti eegi.

Faayiloota uumi yookaan haaromsi

- Locale hundaaf stubs dhaban uumi: `npm --prefix website run i18n:stubs`
- Stubs Ingiliffaarraa irra caqi (erga barruulee haaraa dabaltee booda): `npm --prefix website run i18n:stubs:force`
- Filannoo locale tokko qofaaf: `npx --prefix website docusaurus write-translations --locale <locale>`

Maqaalee UI fuula‑jalqabaa/navbar/footer hiiki (OpenAI)

- Ragaa seenuu (credentials) yeroo tokkotti kaa’i (shell yookaan .env):
- `export OPENAI_API_KEY=sk-...`
- Filannoo: `export OPENAI_MODEL=gpt-4o-mini`
- Yeroo tokkotti (locale hunda, en dhiisi): `make translate_web_index`
- Locale murtaa’eef daangeessi: `make translate_web_index OPTS="--locales de,fr"`
- Gatiin jiru irra deebi’i (overwrite): `make translate_web_index OPTS="--force"`

Mirkaneessa & yaaliwwan irra deebii

- Scriptiin hiikkaa Sirna JSON ni mirkaneessa, bakka bu’oota qal’insa kurkoofaa (curly‑brace) ni eega, URL‑otaas akka hin jijjiiramne ni mirkaneessa.
- Mirkaneessi yoo kufe, yaada deebi’een hanga yeroo 2 tti irra deebi’a; boodarra gatii jiru ni tursiisa.

Locale kee dursee ilaali

- Tajaajila misoomaa: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` daawwadhu

Erguu

- Faayiloota `code.json` gulaalamaniin PR banu. Jijjiiramoota daangessii eegi; yemmuu danda’amu suuraa xiqqaa dabaluu yaali.

---

### Nageenya fi Qindeessuu — Gorsa {#security-and-configuration-tips}

- `sources/manifest.json` hin commit’in (ijaarraan yeroo muraasaaf uumama)
- `browser_specific_settings.gecko.id` tasgabbaa’aa eegi akka tajaajilli update hin jijjiiramne

---

### Turtii Seerota (Settings) {#settings-persistence}

- Kuusaa: Qindaa’inoonni fayyadamaa hunda `storage.local` keessatti jiraatu; update dabalataan ni turu.
- Teessisuu: Itti‑gaafatamni durtii iddoo bu’uun ni raawwatama yommuu furtuun dhabamuu (undefined) qofa.
- Haaromsuu: Jijjiirraan (migration) furtuu dhabaman qofa guuta; gatiin jiru hin irra‑barreessamu.
- Mallattoo schema: `settingsVersion` (ammatti `1`).
- Furtuuwwan fi durtiwwan:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Koodii: `sources/background.js` → `initializeOrMigrateSettings()` fi `SCHEMA_VERSION` ilaali.

Hojii misoomaa (qindaa’ina haaraa dabaluu)

- `SCHEMA_VERSION` keessatti `sources/background.js` dabali.
- Furtuu haaraa + durtii gara wanta `DEFAULTS` jedhu keessa `initializeOrMigrateSettings()` keessatti dabaluu.
- Durtiiwwan “yommuu‑qofa‑hinjiru” jedhuun facaasi; gatiiwwan jiran hin irra‑barreessin.
- Yoo qindaa’inni fayyadamaa itti mul’atu ta’e, `sources/options.js` keessatti walitti hidhi; barruulee bifa‑naannoo dabaluu.
- Qorannoo dabaluu/yookaan fooyyessi (`tests/background.settings.migration.test.js` ilaali).

Gorsa qorannoo harkaatiin

- Teessisuu haaraa fakkeessuuf: kuusaa (data dir) extension haqii yookaan prooffaayilii haaraa jalqabi.
- Haaromsuu fakkeessuuf: `settingsVersion` gara `0`tti `storage.local` keessatti saagi fi irra deebi’i fe’i; gatiin jiran akka hin jijjiiramne fi furtuun dhabaman qofa akka dabalaman mirkaneessi.

---

### Hiika Rakkoo {#troubleshooting}

- Thunderbird 128 ESR yookaan isaa oli akka ta’e mirkaneessi
- Rakkoo yeroo raawwii keessatti furuu: Error Console fayyadami
- Qindaa’inni kuufame akka hin hojjanne fakkaatee yoo mul’ate, Thunderbird irra deebi’i banuu yaali. (Thunderbird haalata keessa qabachuu danda’a; irra deebiin banuun qindaa’inoota haarawa fe’a.)

---

### CI fi Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest coverage tajaajiltoota (85% lines/functions/branches/statements) waliin oofa. Yoo hanga caasaa hin guutamne, hojii ni kufa.
- Adeemsi kun oomisha `coverage-html` of keessaa qabata gabaasa HTML’n; fuula raawwii irraa buusi (Actions → raawwii dhiyoo → Artifacts).

---

### Hirmaannaa {#contributing}

- CONTRIBUTING.md ilaali qajeelfama caancalaa/commit/PR
- Tarsiimoo: Prooffaayilii misooma Thunderbird addaa uumi qorannoo irratti gochuuf akka prooffaayilii guyyaa kee hin miine.

---

### Hiikkoota

- Hojii hiikkaa “hunda → hunda” bal’aan gaabbii fi baasii qabaachuu danda’a. Locale muraasa fi docs muraasa irraa jalqabi, bu’aa ilaali, ergasii bal’isi.

---

- Sirna irra deebi’i: hojii hiikkaa hanga yeroo 3 tti irra deebi’a dogoggora API irrattis gadi‑lakkisii haala dhiphina dabalaa fayyadamuun; `scripts/translate_web_docs_batch.js` fi `scripts/translate_web_docs_sync.js` ilaali.

Suuraawwan docs‑f

- Suuraalee `website/static/img/` jala kaa’i.
- MD/MDX keessatti `useBaseUrl('/img/<filename>')` fayyadami akka karaan (paths) waliin hojjatu `baseUrl` saayitii waliin.
- Suuraalee `website/static/img/` jala dabaltee yookaan maqaa jijjiirte booda, hundi `useBaseUrl('/img/…')` fayyadamu akka itti fufu fi itti‑yaadama naannoo keessatti akka mul’atu mirkaneessi.
  Favicons

- `favicon.ico` baay’ina‑guddaa of keessaa qabu karaa hundumaa (Make + scripts) `website/scripts/build-favicon.mjs`n otomaatiin ni uumama.
- Tarkaanfii harkaatiin hin barbaachisu; `icon-*.png` haaromsuun gahaa dha.
  Tarsiimoo ilaalcha

- Docs hiikataman keessatti front‑matter `id` akka hin jijjiiramin eegi; yommuu jiraatan `title` fi `sidebar_label` qofa hiiki.

#### clean {#mt-clean}

- Kaayyoo: oomishaalee/ilaalchii naannoo haquu.
- Fayyadama: `make clean`
- Akkasuma ni haqa (yoo jiraatan):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Kaayyoo: sirreeffami, qorannoo, changelog haaromsuu, commit, fi push.
- Fayyadama: `make commit`
- Bal’inaan: Prettier (write), `make test`, `make test_i18n` oofa; yommuu sochiin stagii jiru jiraatu changelog itti dabala; gara `origin/<branch>` tti ni dhiiba.

---

#### eslint {#mt-eslint}

- Kaayyoo: ESLint bifa flat configtiin oofi.
- Fayyadama: `make eslint`

---

#### help {#mt-help}

- Kaayyoo: taargatoota hunda ibsa sarara‑tokkoon tarreessi.
- Fayyadama: `make help`

---

#### lint {#mt-lint}

- Kaayyoo: MailExtension `web-ext` fayyadamuun linti.
- Fayyadama: `make lint`
- Yaadannoowwan: `sources/manifest_LOCAL.json` → `sources/manifest.json` yeroo muraasaaf kophatti garagalcha; ZIP ijaaramanii hin ilaallaman; akeekkachiisni (warnings) paayipilaayinii hin kufisan.

---

#### menu {#mt-menu}

- Kaayyoo: sajoo wal‑itti hidhata qindaa’e taargatii fi filannoowwan dabalataa filachuuf.
- Fayyadama: `make` homaa ala oofi.
- Yaadannoowwan: `whiptail` yoo hin jirre, sajoo `make help`tti deebi’a.

---

#### pack {#mt-pack}

- Kaayyoo: ATN fi LOCAL ZIPs ijaaru (`lint` irratti hirkata).
- Fayyadama: `make pack`
- Tarsiimoo: baay’ina lamaan `sources/manifest_*.json` keessatti dabaluu paakeejii dura.

---

#### prettier {#mt-prettier}

- Kaayyoo: repo iddoo isa jirutti sirreessuu.
- Fayyadama: `make prettier`

#### prettier_check {#mt-prettier_check}

- Kaayyoo: sirreessuu mirkaneessuu (hin barreessu).
- Fayyadama: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Kaayyoo: aliyaasa `prettier`.
- Fayyadama: `make prettier_write`

---

#### test {#mt-test}

- Kaayyoo: Prettier (write), ESLint, ergasii Vitest (coverage yoo fe’amte) oofu.
- Fayyadama: `make test`

#### test_i18n {#mt-test_i18n}

- Kaayyoo: qorannoo i18n irratti xiyyeeffateef maqaalee app fi docs website.
- Fayyadama: `make test_i18n`
- Ni oofa: `npm run test:i18n` fi `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Kaayyoo: maqaalee UI add‑on EN irraa gara locale birootiitti hiiku.
- Fayyadama: `make translation_app OPTS="--locales all|de,fr"`
- Yaadannoowwan: sirna furtuu eega fi bakka bu’oota hin jijjiiru; gara `translation_app.log`tti galmeessa. Sirna scripitii: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Kaayyoo: sanadoota website `website/docs/*.md` irraa gara `website/i18n/<locale>/...`tti hiiku.
- Kan filatamaa: `translate_web_docs_batch` (OpenAI Batch API)
  - Fayyadama (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional amma illee ni fudhata: `OPTS="<doc|all> <lang|all>"`
- Amala: JSONL ijaara, olkachiisa, osoo osoo 30s hunda gaafata, bu’aa buufata, faayiloota barreessa.
- Yaada: hojii batch hanga sa’aatii 24 fudhachuu danda’a (batch window OpenAI). Koonsooliin yeroo darbe gaaffii hundaan ni agarsiisa.
- Naannolee: `OPENAI_API_KEY` (dirqama), filannoo `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (bifa durtii 24h), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - Fayyadama (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional amma illee ni fudhata: `OPTS="<doc|all> <lang|all>"`
- Amala: gaaffii wajiin‑wajiin synchronous (batch aggreg. malee).
- Yaadannoowwan: `OPTS` yoo dhihaachuu baate gaaffii wal‑itti dhufeenya (interactive) geessisa. Haala lamaanis bifa koodii (code blocks/inline) ni eega; front‑matter `id` hin jijjiiru; gara `translation_web_batch.log` (batch) yookaan `translation_web_sync.log` (sync)tti galmeessa.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Kaayyoo: maqaalee UI website (fuula‑jalqabaa, navbar, footer) `website/i18n/en/code.json` irraa gara locale hundaatti jalatti `website/i18n/<locale>/code.json` (kan `en` hin dabalne) hiiku.
- Fayyadama: `make translate_web_index` yookaan `make translate_web_index OPTS="--locales de,fr [--force]"`
- Dirqama: `OPENAI_API_KEY` export godhi (filannoo: `OPENAI_MODEL=gpt-4o-mini`).
- Amala: Sirna JSON ni mirkaneessa, bakka bu’oota qal’insa kurkoofaa ni eega, URL‑ota hin jijjiiru, dogoggora mirkaneessaa irra deebi’uun yaali.

---

#### web_build {#mt-web_build}

- Kaayyoo: saayitii docs gara `website/build` ijaaru.
- Fayyadama: `make web_build OPTS="--locales en|de,en|all"` (yookaan `BUILD_LOCALES="en de"` kaa’i)
- Keessummaa: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: `npm ci` `website/` keessatti ni oofa yoo `website/node_modules/@docusaurus` dhabame.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Kaayyoo: sakatta’iinsa link offline‑safe.
- Fayyadama: `make web_build_linkcheck OPTS="--locales en|all"`
- Yaadannoowwan: gara `tmp_linkcheck_web_pages`tti ijaara; `baseUrl` GH Pages gara `/`tti deeggarsa; HTTP(S) fagoo ni darbata.

#### web_build_local_preview {#mt-web_build_local_preview}

- Kaayyoo: itti‑yaadama gh‑pages naannoo tests/link‑check filannoo waliin.
- Fayyadama: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Amala: jalqaba tajaajila itti‑yaadama Node yaala (`scripts/preview-server.mjs`, `/__stop` ni deeggara), booda `python3 -m http.server`tti ni deebi’a; tajaajila 8080–8090; PID `web-local-preview/.server.pid` irratti.

#### web_push_github {#mt-web_push_github}

- Kaayyoo: `website/build` gara caancalaa `gh-pages` tti dhiibuu.
- Fayyadama: `make web_push_github`

Tarsiimoo: `NPM=…` kaa’i meeshaa paakeejii Makefile fayyadamu jijjiiruuf (bifa durtii `npm`).
