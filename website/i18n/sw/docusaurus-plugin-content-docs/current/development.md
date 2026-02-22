---
id: development
title: 'Maendeleo'
sidebar_label: 'Uendelezaji'
---

---

## Mwongozo wa Maendeleo {#development-guide}

:::note Hariri Kiingereza pekee; tafsiri huenea
Sasisha nyaraka **tu** chini ya `website/docs` (Kiingereza). Tafsiri chini ya `website/i18n/<locale>/…` zinatengenezwa kiotomatiki na hazipaswi kuhaririwa kwa mkono. Tumia kazi za tafsiri (km., `make translate_web_docs_batch`) kusasisha maudhui yaliyolokeshwa.
:::

### Mahitaji ya Awali {#prerequisites}

- Node.js 22+ na npm (imejaribiwa na Node 22)
- Thunderbird 128 ESR au mpya zaidi (kwa majaribio ya mikono)

---

### Muundo wa Mradi (kiwango cha juu) {#project-layout-high-level}

- Mzizi: hati ya kufungasha `distribution_zip_packer.sh`, nyaraka, picha za skrini
- `sources/`: msimbo mkuu wa kiendelezi (background, UI ya chaguo/dirisha dogo, manifesti, ikoni)
- `tests/`: suite ya Vitest
- `website/`: nyaraka za Docusaurus (zikiwa na i18n chini ya `website/i18n/de/...`)

---

### Usakinishaji na Zana {#install-and-tooling}

- Sakinisha utegemezi za mzizi: `npm ci`
- Nyaraka (hiari): `cd website && npm ci`
- Gundua malengo: `make help`

---

### Uendelezaji Hai (web‑ext run) {#live-dev-web-ext}

- Mzunguko wa haraka kwenye Firefox Desktop (majaribio mepesi ya UI tu):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Endesha ndani ya Thunderbird (inapendekezwa kwa MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Vidokezo:
- Weka Konsoli ya Hitilafu ya Thunderbird wazi (Zana → Zana za Wasanidi → Konsoli ya Hitilafu).
- Kurasa za matukio za MV3 husitishwa zinapokuwa hazitumiki; pakia upya kiendelezi baada ya mabadiliko ya msimbo, au uruhusu web‑ext kupakia upya kiotomatiki.
- Tabia fulani za pekee za Firefox hutofautiana; hakikisha kila mara kwenye Thunderbird kwa ulinganifu wa API.
- Njia za programi ya Thunderbird (mifano):
- Linux: `thunderbird` (km., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Kutenganisha profaili: Tumia profaili tofauti ya Thunderbird kwa maendeleo ili kuepuka kuathiri usanidi wako wa kila siku.

---

### Malengo ya Make (kwa mpangilio wa alfabeti) {#make-targets-alphabetical}

Makefile husanifisha mikondo ya kawaida ya maendeleo. Endesha `make help` wakati wowote kupata muhtasari wa mstari mmoja wa kila lengo.

Dokezo: kuendesha `make` bila lengo hufungua menyu rahisi ya Whiptail kuchagua lengo.

| Lengo                                                    | Maelezo ya mstari mmoja                                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ondoa mabaki ya ujenzi/prevyuu ya ndani (tmp/, web-local-preview/, website/build/).                                          |
| [`commit`](#mt-commit)                                   | Fomati, endesha majaribio (ikiwemo i18n), sasisha changelog, fanya commit na push.                                           |
| [`eslint`](#mt-eslint)                                   | Endesha ESLint kupitia usanidi tambarare (`npm run -s lint:eslint`).                                                         |
| [`help`](#mt-help)                                       | Orodhesha malengo yote pamoja na maelezo ya mstari mmoja (yamepangwa).                                                       |
| [`lint`](#mt-lint)                                       | web‑ext lint kwenye `sources/` (manifest ya muda; hupuuza ZIP; si ya kufeli).                                                |
| [`menu`](#mt-menu)                                       | Menyu shirikishi kuchagua lengo na hoja za hiari.                                                                            |
| [`pack`](#mt-pack)                                       | Jenga ZIP za ATN na LOCAL (huendesha linter; huita hati ya kufunga).                                                         |
| [`prettier`](#mt-prettier)                               | Fomati hazina mahali pake ndani ya repo (huandika mabadiliko).                                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier katika hali ya ukaguzi (bila uandishi); hufeli ikiwa inahitaji kurekebisha umbizo.                                  |
| [`prettier_write`](#mt-prettier_write)                   | Kisawe cha `prettier`.                                                                                                       |
| [`test`](#mt-test)                                       | Prettier (andika), ESLint, kisha Vitest (ufunikaji ukisanidiwa).                                                             |
| [`test_i18n`](#mt-test_i18n)                             | Majaribio ya i18n pekee: vishikizi/ulinganifu wa kiendelezi + ulinganifu wa tovuti.                                          |
| [`translate_app`](#mt-translation-app)                   | Kisawe cha `translation_app`.                                                                                                |
| [`translation_app`](#mt-translation-app)                 | Tafsiri misururu ya UI ya programu kutoka `sources/_locales/en/messages.json`.                                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | Tafsiri nyaraka za tovuti kupitia OpenAI Batch API (inapendekezwa).                                                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Tafsiri nyaraka za tovuti kwa njia ya sawasawa (urithi, bila batch).                                                         |
| [`translate_web_index`](#mt-translation_web_index)       | Kisawe cha `translation_web_index`.                                                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Tafsiri UI ya ukurasa wa nyumbani/nafasi ya urambazaji/sehemu ya chini (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Jenga nyaraka hadi `website/build` (inasaidia `--locales` / `BUILD_LOCALES`).                                                |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Ukaguzi wa viungo salama-bila-mtandao (huruka HTTP[S] za mbali).                                                             |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Onyesho la ndani la gh‑pages; hutumikia kiotomatiki kwenye 8080–8090; majaribio/ukaguzi-wa-viungo wa hiari.                  |
| [`web_push_github`](#mt-web_push_github)                 | Sukuma `website/build` hadi tawi la `gh-pages`.                                                                              |

Sintaksia ya chaguo

- Tumia `make <command> OPTS="…"` kupitisha chaguo (inashauriwa kutumia nukuu). Kila lengo hapa chini linaonyesha mfano wa matumizi.

--

-

#### Vidokezo vya ujenzi wa lugha (locale) {#locale-build-tips}

- Jenga sehemu ya lugha: weka `BUILD_LOCALES="en de"` au pitisha `OPTS="--locales en,de"` kwa malengo ya wavuti.
- Onyesho la awali la lugha mahususi: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Jenga na Kufungasha {#build-and-package}

- Jenga ZIP: `make pack`
- Huzalisha ZIP za ATN na LOCAL katika mzizi wa hifadhi (repo) (usiweke mabadiliko ya mikono kwenye mabaki)
- Dokezo: sasisha toleo kwenye `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json` zote mbili kabla ya kufungasha
- Usakinishaji wa mikono (dev): Thunderbird → Zana → Viongezi na Mandhari → gia → Sakinisha Kiendelezi Kutoka Faili… → chagua ZIP iliyojengwa

---

### Jaribio {#test}

- Pakiti kamili: `make test` (Vitest)
- Ufunikaji (hiari):
- `npm i -D @vitest/coverage-v8`
- Endesha `make test`; fungua `coverage/index.html` kwa ripoti ya HTML
- i18n pekee: `make test_i18n` (funguo/vishikizi/vichwa vya UI + ulinganifu wa tovuti kwa kila lugha kwa kila hati ukiwa na ukaguzi wa id/title/sidebar_label)

---

### Urekebishaji Hitilafu na Kumbukumbu {#debugging-and-logs}

- Konsoli ya Hitilafu: Zana → Zana za Wasanidi → Konsoli ya Hitilafu
- Badili kumbukumbu zenye maelezo mengi wakati wa uendeshaji:
- Washa: `messenger.storage.local.set({ debug: true })`
- Zima: `messenger.storage.local.set({ debug: false })`
- Kumbukumbu huonekana wakati wa kuandika/kutuma majibu

---

### Nyaraka (tovuti) {#docs-website}

- Seva ya maendeleo: `cd website && npm run start`
- Jenga tovuti tuli: `cd website && npm run build`
- Visawe vya Make (kwa alfabeti): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Mifano ya matumizi:
- Kiingereza pekee, ruka majaribio/kaguzi za viungo, bila kusukuma: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Lugha zote, pamoja na majaribio/kaguzi za viungo, kisha sukuma: `make web_build_local_preview && make web_push_github`
- Kabla ya kuchapisha, endesha ukaguzi wa viungo salama-bila-mtandao: `make web_build_linkcheck`.
- i18n: Kiingereza kiko kwenye `website/docs/*.md`; tafsiri za Kijerumani ziko kwenye `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Utafutaji: Ikiwa vigezo vya mazingira vya Algolia DocSearch vimewekwa kwenye CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), tovuti hutumia utafutaji wa Algolia; la sivyo hurejea kwenye utafutaji wa ndani. Kwenye ukurasa wa nyumbani, bonyeza `/` au `Ctrl+K` kufungua kisanduku cha utafutaji.

---

#### Njia ya kuelekeza mchango upya {#donate-redirect}

- `website/src/pages/donate.js`
- Njia: `/donate` (na `/<locale>/donate`)
- Tabia:
- Ikiwa njia ya sasa ina lugha (km., `/de/donate`), itumie
- La sivyo, chagua inayofanana zaidi kutoka `navigator.languages` dhidi ya lugha zilizosanidiwa; rejeshea lugha msingi
- Huelekeza hadi:
- `en` → `/docs/donation`
- nyingine → `/<locale>/docs/donation`
- Hutumia `useBaseUrl` kwa ushughulikiaji sahihi wa baseUrl
- Hujumuisha meta refresh + kiungo `noscript` kama mbadala

---

---

#### Vidokezo vya Onyesho la Awali {#preview-tips}

- Acha onyesho la awali la Node kwa usafi: fungua `http://localhost:<port>/__stop` (huchapishwa baada ya `Local server started`).
- Ikiwa picha hazipaki katika MDX/JSX, tumia `useBaseUrl('/img/...')` kuheshimu `baseUrl` ya tovuti.
- Onyesho la awali huanza kwanza; ukaguzi wa viungo hukimbia baadaye na hauzuii (viungo vya nje vilivyovunjika havitasimamisha onyesho la awali).
- Mfano wa URL ya onyesho la awali: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (huchapishwa baada ya “Local server started”).
- Viungo vya nje kwenye ukaguzi-wa-viungo: Baadhi ya tovuti za nje (km., addons.thunderbird.net) huzuia vivukizi vya kiotomatiki na zinaweza kuonyesha 403 kwenye ukaguzi wa viungo. Onyesho la awali bado litaanza; hizi ni salama kupuuzwa.

---

#### Tafsiri Tovuti {#translate-website}

Unachoweza kutafsiri

- UI ya tovuti pekee: ukurasa wa nyumbani, nafasi ya urambazaji, sehemu ya chini, na misururu mingine ya UI. Maudhui ya nyaraka yatasalia Kiingereza tu kwa sasa.

Pa kuhariri

- Hariri `website/i18n/<locale>/code.json` (tumia `en` kama marejeo). Weka vishikizi kama `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` bila kubadilishwa.

Zalisha au onyesha upya mafaili

- Unda stubs zinazokosekana kwa lugha zote: `npm --prefix website run i18n:stubs`
- Andika juu ya stubs kutoka Kiingereza (baada ya kuongeza misururu mipya): `npm --prefix website run i18n:stubs:force`
- Njia mbadala kwa lugha moja: `npx --prefix website docusaurus write-translations --locale <locale>`

Tafsiri maneno ya UI ya ukurasa wa nyumbani/nafasi ya urambazaji/sehemu ya chini (OpenAI)

- Weka stakabadhi mara moja (shell au .env):
- `export OPENAI_API_KEY=sk-...`
- Hiari: `export OPENAI_MODEL=gpt-4o-mini`
- Mara moja (lugha zote, ruka en): `make translate_web_index`
- Punguza kwa lugha maalum: `make translate_web_index OPTS="--locales de,fr"`
- Andika juu ya thamani zilizopo: `make translate_web_index OPTS="--force"`

Uthibitishaji na majaribio tena

- Skript ya tafsiri inathibitisha umbo la JSON, huhifadhi vishikizi vya mabano ya curly, na kuhakikisha URL hazijabadilika.
- Ikishindwa kuthibitisha, hujaribu tena kwa maoni hadi mara 2 kabla ya kuacha thamani zilizopo.

Onyesha lugha yako

- Seva ya maendeleo: `npm --prefix website run start`
- Tembelea `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Kutuma

- Fungua PR yenye faili `code.json` uliyohariri. Weka mabadiliko yakiwa mahususi na ongeza picha ya skrini ya haraka inapowezekana.

---

### Vidokezo vya Usalama na Usanidi {#security-and-configuration-tips}

- Usiweke commit ya `sources/manifest.json` (hutengenezwa kwa muda na ujenzi)
- Hifadhi `browser_specific_settings.gecko.id` iwe thabiti ili kudumisha njia ya masasisho

---

### Uendelevu wa Mipangilio {#settings-persistence}

- Hifadhi: Mipangilio yote ya mtumiaji iko ndani ya `storage.local` na hudumu kati ya masasisho ya kiendelezi.
- Usakinishaji: Chaguo-msingi hutumika tu wakati ufunguo umekosekana kabisa (undefined).
- Sasisho: Uhamisho hujaza funguo zinazokosekana tu; thamani zilizopo haziondokiwi kamwe.
- Alama ya skima: `settingsVersion` (kwa sasa `1`).
- Funguo na chaguo-msingi:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Msimbo: tazama `sources/background.js` → `initializeOrMigrateSettings()` na `SCHEMA_VERSION`.

Mtindo wa kazi wa msanidi (kuongeza mpangilio mpya)

- Ongeza `SCHEMA_VERSION` ndani ya `sources/background.js`.
- Ongeza ufunguo mpya + chaguo-msingi kwenye kitu (object) `DEFAULTS` katika `initializeOrMigrateSettings()`.
- Tumia kanuni ya “only-if-undefined” unapoanzisha chaguo-msingi; usiandike juu ya thamani zilizopo.
- Kama mpangilio unaonekana kwa mtumiaji, uunganishe katika `sources/options.js` na ongeza misururu iliyolokeshwa.
- Ongeza/rekebisha majaribio (tazama `tests/background.settings.migration.test.js`).

Vidokezo vya majaribio ya mikono

- Iga usakinishaji mpya: safisha dir ya data ya kiendelezi au anza na profaili mpya.
- Iga sasisho: weka `settingsVersion` kuwa `0` ndani ya `storage.local` kisha pakia upya; hakikisha thamani zilizopo hazijabadilika na kwamba funguo zinazokosekana tu ndizo zinaongezwa.

---

### Utatuzi wa matatizo {#troubleshooting}

- Hakikisha Thunderbird ni 128 ESR au mpya zaidi
- Tumia Konsoli ya Hitilafu kwa masuala ya wakati wa uendeshaji
- Ikiwa mipangilio iliyohifadhiwa inaonekana kutotumika ipasavyo, anzisha upya Thunderbird na ujaribu tena. (Thunderbird inaweza kuweka hali kwenye kumbukumbu kati ya vikao; uanzishaji upya huhakikisha mipangilio mipya inapakiwa.)

---

### CI na Ufunikaji {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) huendesha vitest kwa viwango vya ufunikaji (85% mistari/kazi/matawi/taarifa). Ikiwa viwango havijatimizwa, kazi hushindwa.
- Mtiririko wa kazi hupakia sehemu (artifact) `coverage-html` yenye ripoti ya HTML; ipakue kutoka ukurasa wa mzunguko (Actions → mzunguko wa mwisho → Artifacts).

---

### Kuchangia {#contributing}

- Tazama CONTRIBUTING.md kwa miongozo ya matawi/commits/PR
- Dokezo: Unda profaili tofauti ya maendeleo ya Thunderbird kwa majaribio ili kuepuka kuathiri profaili yako ya kila siku.

---

### Tafsiri

- Kuendesha kazi kubwa za tafsiri “all → all” kunaweza kuwa polepole na kugharimu. Anza na sehemu ndogo (km., nyaraka chache na lugha 1–2), kisha pitia matokeo, halafu panua.

---

- Sera ya kujaribu tena: kazi za tafsiri hufanya majaribio hadi mara 3 kwa backoff ya mfululizo wa nguvu kwenye hitilafu za API; tazama `scripts/translate_web_docs_batch.js` na `scripts/translate_web_docs_sync.js`.

Picha za skrini kwa nyaraka

- Hifadhi picha chini ya `website/static/img/`.
- Zirejelee kwenye MD/MDX kupitia `useBaseUrl('/img/<filename>')` ili njia zifanye kazi na `baseUrl` ya tovuti.
- Baada ya kuongeza au kubadilisha majina ya picha chini ya `website/static/img/`, hakikisha marejeo yote bado yanatumia `useBaseUrl('/img/…')` na yanaonekana kwenye onyesho la ndani.
  Ikoni za kivinjari (Favicons)

- `favicon.ico` ya ukubwa- mwingi hutengenezwa kiotomatiki katika njia zote za ujenzi (Make + skripti) kupitia `website/scripts/build-favicon.mjs`.
- Hakuna hatua ya mkono inayohitajika; kusasisha `icon-*.png` kunatosha.
  Dokezo la ukaguzi

- Weka `id` ya front‑matter bila kubadilishwa katika nyaraka zilizotafsiriwa; tafsiri tu `title` na `sidebar_label` zikisistizwa.

#### clean {#mt-clean}

- Kusudi: ondoa mabaki ya ujenzi/prevyuu ya ndani.
- Matumizi: `make clean`
- Huondoa (ikiwa yapo):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Kusudi: fomati, jaribu, sasisha changelog, fanya commit, na u-push.
- Matumizi: `make commit`
- Maelezo: huendesha Prettier (andika), `make test`, `make test_i18n`; huongeza changelog kunapokuwa na tofauti zilizopangwa; husukuma hadi `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Kusudi: endesha ESLint kupitia usanidi tambarare.
- Matumizi: `make eslint`

---

#### help {#mt-help}

- Kusudi: orodhesha malengo yote pamoja na maelezo ya mstari mmoja.
- Matumizi: `make help`

---

#### lint {#mt-lint}

- Kusudi: lint kwa MailExtension ukitumia `web-ext`.
- Matumizi: `make lint`
- Maelezo: hunakili kwa muda `sources/manifest_LOCAL.json` → `sources/manifest.json`; hupuuza ZIP zilizojengwa; maonyo hayafeli mkondo.

---

#### menu {#mt-menu}

- Kusudi: menyu shirikishi kuchagua lengo la Make na hoja za hiari.
- Matumizi: endesha `make` bila hoja.
- Maelezo: ikiwa `whiptail` haipatikani, menyu hurejea kwa `make help`.

---

#### pack {#mt-pack}

- Kusudi: jenga ZIP za ATN na LOCAL (hutegemea `lint`).
- Matumizi: `make pack`
- Dokezo: ongeza matoleo katika `sources/manifest_*.json` zote mbili kabla ya kufungasha.

---

#### prettier {#mt-prettier}

- Kusudi: fomati repo mahali pake.
- Matumizi: `make prettier`

#### prettier_check {#mt-prettier_check}

- Kusudi: thibitisha uumbizaji (bila kuandika).
- Matumizi: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Kusudi: kisawe cha `prettier`.
- Matumizi: `make prettier_write`

---

#### test {#mt-test}

- Kusudi: endesha Prettier (andika), ESLint, kisha Vitest (ufunikaji ukisakinishwa).
- Matumizi: `make test`

#### test_i18n {#mt-test_i18n}

- Kusudi: majaribio yanayolenga i18n kwa misururu ya kiendelezi na nyaraka za tovuti.
- Matumizi: `make test_i18n`
- Huendesha: `npm run test:i18n` na `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Kusudi: tafsiri misururu ya UI ya kiendelezi kutoka EN kwenda lugha nyingine.
- Matumizi: `make translation_app OPTS="--locales all|de,fr"`
- Maelezo: huhifadhi muundo wa funguo na vishikizi; huandika kumbukumbu kwenye `translation_app.log`. Aina ya skripti: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Kusudi: tafsiri nyaraka za tovuti kutoka `website/docs/*.md` hadi `website/i18n/<locale>/...`.
- Inapendekezwa: `translate_web_docs_batch` (OpenAI Batch API)
  - Matumizi (bendera): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Nafasi za urithi bado zinakubalika: `OPTS="<doc|all> <lang|all>"`
- Tabia: hujenga JSONL, hupakia, huchunguza kila sekunde 30, hupakua matokeo, huandika mafaili.
- Kumbuka: kazi ya batch inaweza kuchukua hadi saa 24 kukamilika (kwa dirisha la batch la OpenAI). Konsoli huonyesha muda uliopita kwa kila uchunguzi.
- Mazingira: `OPENAI_API_KEY` (inayohitajika), hiari `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (chaguo-msingi 24h), `BATCH_POLL_INTERVAL_MS`.
- Urithi: `translate_web_docs_sync`
  - Matumizi (bendera): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Nafasi za urithi bado zinakubalika: `OPTS="<doc|all> <lang|all>"`
- Tabia: maombi ya sawasawa kwa kila jozi (bila kujumlisha batch).
- Maelezo: Maswali shirikishi yanapoulizwa wakati `OPTS` imeachwa. Njia zote mbili huhifadhi vizuizi vya msimbo/msimbo wa ndani na kuweka `id` ya front‑matter bila kubadilishwa; huandika kumbukumbu kwenye `translation_web_batch.log` (batch) au `translation_web_sync.log` (sawasawa).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Kusudi: tafsiri misururu ya UI ya tovuti (ukurasa wa nyumbani, nafasi ya urambazaji, sehemu ya chini) kutoka `website/i18n/en/code.json` kwenda lugha zote chini ya `website/i18n/<locale>/code.json` (ikitoa `en`).
- Matumizi: `make translate_web_index` au `make translate_web_index OPTS="--locales de,fr [--force]"`
- Mahitaji: hamisha `OPENAI_API_KEY` (hiari: `OPENAI_MODEL=gpt-4o-mini`).
- Tabia: inathibitisha muundo wa JSON, huhifadhi vishikizi vya mabano ya curly, huzuia kubadilika kwa URL, na hujaribu tena kwa maoni kwenye makosa ya uthibitishaji.

---

#### web_build {#mt-web_build}

- Kusudi: jenga tovuti ya nyaraka hadi `website/build`.
- Matumizi: `make web_build OPTS="--locales en|de,en|all"` (au weka `BUILD_LOCALES="en de"`)
- Ndani: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Vitegemezi: huendesha `npm ci` ndani ya `website/` tu ikiwa `website/node_modules/@docusaurus` haipo.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Kusudi: ukaguzi wa viungo salama-bila-mtandao.
- Matumizi: `make web_build_linkcheck OPTS="--locales en|all"`
- Maelezo: hujenga hadi `tmp_linkcheck_web_pages`; huandika upya `baseUrl` ya GH Pages hadi `/`; huruka viungo vya HTTP(S) vya mbali.

#### web_build_local_preview {#mt-web_build_local_preview}

- Kusudi: onyesho la ndani la gh‑pages lenye majaribio/ukaguzi wa viungo wa hiari.
- Matumizi: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Tabia: hujaribu seva ya onyesho la Node kwanza (`scripts/preview-server.mjs`, inasaidia `/__stop`), hurejea kwa `python3 -m http.server`; hutumikia kwenye 8080–8090; PID iko kwenye `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Kusudi: sukuma `website/build` hadi tawi la `gh-pages`.
- Matumizi: `make web_push_github`

Dokezo: weka `NPM=…` kubadilisha meneja wa kifurushi unaotumiwa na Makefile (chaguo-msingi ni `npm`).
