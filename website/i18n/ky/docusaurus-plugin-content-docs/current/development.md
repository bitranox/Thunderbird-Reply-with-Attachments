---
id: development
title: 'Иштеп чыгуу'
sidebar_label: 'Иштеп чыгуу'
---

---

## Иштеп чыгуу боюнча колдонмо {#development-guide}

:::note Англисче гана түзөтүңүз; котормолор жайылтылат
Документацияны болгону `website/docs` (англисче) бөлүгүндө жаңыртыңыз. `website/i18n/<locale>/…` алдындагы котормолор автоматтык түрдө түзүлөт жана кол менен түзөтүлбөшү керек. Локалдашкан мазмунду жаңыртуу үчүн которуу тапшырмаларын (мис., `make translate_web_docs_batch`) колдонуңуз.
:::

### Алдын ала талаптар {#prerequisites}

- Node.js 22+ жана npm (Node 22 менен сыналган)
- Thunderbird 128 ESR же жаңысы (кол менен тестирлөө үчүн)

---

### Долбоордун түзүлүшү (жогорку деңгээл) {#project-layout-high-level}

- Тамыр (root): таңгактоо скрипти `distribution_zip_packer.sh`, документтер, скриншоттор
- `sources/`: негизги кошумча модулдун коду (фон процесси, опциялар/попап UI, манифесттер, иконкалар)
- `tests/`: Vitest жыйнагы
- `website/`: Docusaurus документтери (`website/i18n/de/...` ичинде i18n менен)

---

### Орнотуу жана куралдар {#install-and-tooling}

- Түпкү көзкарандулуктарды орнотуу: `npm ci`
- Документтер (милдеттүү эмес): `cd website && npm ci`
- Максаттарды көрүү: `make help`

---

### Түз иштеп чыгуу (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop ичинде тез цикл (сырткы көрүнүштү гана текшерүү):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird ичинде иштетүү (MailExtensions үчүн артыкчылыктуу):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Кеңештер:
- Thunderbird’дин Ката консолун ачык кармаңыз (Tools → Developer Tools → Error Console).
- MV3 окуя баракчалары бош турганда токтотулат; код өзгөргөндөн кийин кошумчаны кайра жүктөңүз же web‑ext автоматтык кайра жүктөөсүнө уруксат бериңиз.
- Firefoxка гана тиешелүү айрым жүрүм-турумдар айырмаланышы мүмкүн; API шайкештигин дайыма Thunderbird’де текшериңиз.
- Thunderbird бинар файлынын жолдору (мисалдар):
- Linux: `thunderbird` (мис., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Профилди обочолонтуу: күнүмдүк орнотууга таасир этпеш үчүн иштеп чыгуу үчүн өзүнчө Thunderbird профилин колдонуңуз.

---

### Make максаттары (алфавиттик тартипте) {#make-targets-alphabetical}

Makefile жалпы иштеп чыгуу агымдарын стандартташтырат. Ар бир максат боюнча бир саптык жыйынтыкты каалаган убакта алуу үчүн `make help` иштетиңиз.

Кеңеш: `make` аргументсиз иштетилсе, максатты тандоо үчүн жөнөкөй Whiptail менюсун ачат.

| Максат                                                   | Кыска сүрөттөмө                                                                                  |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Жергиликтүү курулуш/превью артефакттарын алып салуу (tmp/, web-local-preview/, website/build/).  |
| [`commit`](#mt-commit)                                   | Форматтоо, тесттерди жүргүзүү (i18n кошо), өзгөрүүлөр журналын жаңыртуу, commit жана push.       |
| [`eslint`](#mt-eslint)                                   | ESLintти flat config аркылуу иштетүү (`npm run -s lint:eslint`).                                 |
| [`help`](#mt-help)                                       | Бардык максаттарды кыскача сүрөттөмөлөрү менен тизмелөө (сырмаланган).                           |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/` үстүнөн (убактылуу манифест; ZIPтер эске алынбайт; ката эмес).           |
| [`menu`](#mt-menu)                                       | Максатты жана кошумча аргументтерди тандоо үчүн интерактивдүү меню.                              |
| [`pack`](#mt-pack)                                       | ATN жана LOCAL ZIPтерин куруу (linter иштетилет; таңгактоочу скрипт чакырылат).                  |
| [`prettier`](#mt-prettier)                               | Репозиторийди ордунда форматтоо (өзгөртүүлөрдү жазат).                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier текшерүү режиминде (жазуусуз); кайра форматтоо талап кылынса, жаңылат.                  |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` үчүн alias.                                                                           |
| [`test`](#mt-test)                                       | Prettier (жазуу), ESLint, андан соң Vitest (камтуулар конфигурацияланса).                        |
| [`test_i18n`](#mt-test_i18n)                             | i18n гана тесттер: кошумча модулдагы плейсхолдерлер/шайкештик + вебсайт шайкештиги.              |
| [`translate_app`](#mt-translation-app)                   | `translation_app` үчүн alias.                                                                    |
| [`translation_app`](#mt-translation-app)                 | Тиркеменин UI саптарын `sources/_locales/en/messages.json` ичинен которуу.                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | Вебсайт документтерин OpenAI Batch API аркылуу которуу (артыкчылыктуу).                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | Вебсайт документтерин синхрондук түрдө которуу (мурас, пакеткасыз).                              |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` үчүн alias.                                                              |
| [`translation_web_index`](#mt-translation_web_index)     | Башкы бет/навигация/футер UIсын которуу (`website/i18n/en/code.json → .../<lang>/code.json`).    |
| [`web_build`](#mt-web_build)                             | Документтерди `website/build` ичине куруу (`--locales` / `BUILD_LOCALES` колдоого алынат).       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Оффлайн коопсуз шилтемелерди текшерүү (алыскы HTTP[S] өткөрүп жиберилет).                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Жергиликтүү gh‑pages превью; 8080–8090 портторунда авто‑кызмат; кошумча тест/шилтеме текшерүүсү. |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` файлдарын `gh-pages` бутагына түртүү.                                            |

Параметрлердин синтаксиси

- Параметрлерди өткөрүү үчүн `make <command> OPTS="…"` колдонуңуз (тырмакча сунушталат). Төмөндө ар бир максат үчүн мисал колдонуу көрсөтүлөт.

--

-

#### Локаль боюнча куруу кеңештери {#locale-build-tips}

- Локалдардын бир бөлүгүн гана куруу: `BUILD_LOCALES="en de"` орнотуңуз же веб максаттарына `OPTS="--locales en,de"` өткөрүңүз.
- Белгилүү бир локалды алдын ала көрүү: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Куруу жана таңгактоо {#build-and-package}

- ZIPтерди куруу: `make pack`
- Репонун түбүндө ATN жана LOCAL ZIPтерин чыгарат (артефакттарды кол менен түзөтпөңүз)
- Кеңеш: таңгактоодон мурун версияны `sources/manifest_ATN.json` жана `sources/manifest_LOCAL.json` экөөндө тең жаңыртыңыз
- Кол менен орнотуу (dev): Thunderbird → Tools → Add‑ons and Themes → тишче → Install Add‑on From File… → курулган ZIPти тандаңыз

---

### Тест {#test}

- Толук жыйнак: `make test` (Vitest)
- Камтуу (милдеттүү эмес):
- `npm i -D @vitest/coverage-v8`
- `make test` иштетип, HTML отчет үчүн `coverage/index.html` ачыңыз
- Бир гана i18n: `make test_i18n` (UI ачкычтары/плейсхолдерлер/аталыштар + вебсайтта ар бир локаль/док боюнча шайкештик, id/title/sidebar_label текшерүүлөрү менен)

---

### Ката издөө жана логдор {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Иштөө маалында кеңейтилген логдорду күйгүзүү/өчүрүү:
- Иштетүү: `messenger.storage.local.set({ debug: true })`
- Өчүрүү: `messenger.storage.local.set({ debug: false })`
- Логдор жоопторду түзүү/жөнөтүү учурунда чыгат

---

### Документтер (вебсайт) {#docs-website}

- Dev сервер: `cd website && npm run start`
- Статикалык сайтты куруу: `cd website && npm run build`
- Make эквиваленттери (алфавиттик): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Колдонуу мисалдары:
- Бир гана EN, тест/шилтеме текшерүүсүн өткөрүп жиберүү, push жок: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Бардык локалдар, тест/шилтеме текшерүүсү менен, андан соң push: `make web_build_local_preview && make web_push_github`
- Жариялаардан мурун оффлайн коопсуз шилтеме текшерүүсүн иштетиңиз: `make web_build_linkcheck`.
- i18n: Англисче `website/docs/*.md` ичинде; Немисче котормолор `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ичинде
- Издөө: Эгер CI ішінде Algolia DocSearch'тин айлана-чөйрө өзгөрмөлөрү коюлган болсо (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайт Algolia издөөсүн колдонот; болбосо жергиликтүү издөө колдонулат. Башкы бетте издөө кутучасын ачуу үчүн `/` же `Ctrl+K` басыңыз.

---

#### Донат багыттоо маршруту {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (жана `/<locale>/donate`)
- Жүрүм-турум:
- Эгер учурдагы маршрутада локаль болсо (мис., `/de/donate`), ошону колдонот
- Болбосо, `navigator.languages` менен конфигурацияланган локалдардын ичинен мыкты дал келгенин тандайт; демейки локалга кайрылат
- Кайра багыттайт:
- `en` → `/docs/donation`
- башкалары → `/<locale>/docs/donation`
- Туура baseUrl иштетүү үчүн `useBaseUrl` колдонот
- Кошумча катары meta refresh + `noscript` шилтемесин камтыйт

---

---

#### Превью боюнча кеңештер {#preview-tips}

- Node превьюсун таза токтотуу: `http://localhost:<port>/__stop` ачыңыз (`Local server started` бүткөндөн кийин чыгат).
- MDX/JSX ичинде сүрөттөр жүк болбой калса, сайттын `baseUrl` параметрин эске алуу үчүн `useBaseUrl('/img/...')` колдонуңуз.
- Алгач превью башталат; андан кийин шилтеме текшерүүсү иштейт жана бөгөттөөчү эмес (сынык сырткы шилтемелер превьюну токтотпойт).
- Превью URL мисалы: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” чыккандан кийин басылат).
- Шилтеме текшерүүдөгү сырткы шилтемелер: Айрым тышкы сайттар (мис., addons.thunderbird.net) автоматтык краулерлерди бөгөттөйт жана текшерүүдө 403 кайтарышы мүмкүн. Превью баары бир башталат; буларды этибарга албай коюу коопсуз.

---

#### Вебсайтты которуу {#translate-website}

Эмне нерсени которсо болот

- Бир гана вебсайттын UI’ы: башкы бет, навбар, футер жана башка UI саптары. Азырынча документтердин мазмуну англисче бойдон калат.

Кайсы жерден түзөтүү керек

- `website/i18n/<locale>/code.json` файлында түзөтүңүз (`en` үлгү катары колдонуңуз). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` сыяктуу плейсхолдерлерди өзгөртпөңүз.

Файлдарды түзүү же жаңыртуу

- Бардык локалдар үчүн жетишпеген stub’дарды түзүү: `npm --prefix website run i18n:stubs`
- Жаңы саптар кошулгандан кийин stub’дарды англисчеден үстүнө жазуу: `npm --prefix website run i18n:stubs:force`
- Бир гана локаль үчүн альтернатива: `npx --prefix website docusaurus write-translations --locale <locale>`

Башкы бет/навигация/футер UI саптарын которуу (OpenAI)

- Бир жолу ырастоо маалыматтарын коюңуз (shell же .env):
- `export OPENAI_API_KEY=sk-...`
- Милдеттүү эмес: `export OPENAI_MODEL=gpt-4o-mini`
- Бир жолу (бардык локалдар, en өтүп кетүү): `make translate_web_index`
- Белгилүү локалдар менен чектөө: `make translate_web_index OPTS="--locales de,fr"`
- Бар болгон маанилерди үстүнө жазуу: `make translate_web_index OPTS="--force"`

Текшерүү жана кайталангандар

- Которуу скрипти JSON түзүлүшүн текшерет, ийри кашаадагы плейсхолдерлерди сактайт жана URLдар өзгөрбөгөнүн камсыздайт.
- Текшерүү өтпөсө, учурдагы маанилерди калтыруудан мурун 2 жолу чейин пикир менен кайра аракет кылат.

Локалыңызды алдын ала көрүү

- Dev сервер: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` дарегине кириңиз

Жөнөтүү

- Түзөтүлгөн `code.json` файл(дар)ы менен PR ачыңыз. Өзгөртүүлөрдү так сактаңыз жана мүмкүн болсо тез скриншот кошуңуз.

---

### Коопсуздук жана конфигурация боюнча кеңештер {#security-and-configuration-tips}

- `sources/manifest.json` файлын commit кылбаңыз (курулуш учурунда убактылуу түзүлөт)
- Жаңыртуу каналын сактоо үчүн `browser_specific_settings.gecko.id` туруктуу калыбында болсун

---

### Орнотууларды сактоо туруктуулугу {#settings-persistence}

- Сактагыч: Бардык колдонуучу орнотуулары `storage.local` ичинде турат жана кошумча жаңыртууларда да сакталат.
- Орнотуу: Демейкилер ачкыч так жок болгондо гана (undefined) колдонулат.
- Жаңыртуу: Миграция жетишпеген ачкычтарды гана толтурат; бар маанилер эч качан үстүнө жазылбайт.
- Схема маркери: `settingsVersion` (азыр `1`).
- Ачкычтар жана демейкилер:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: `sources/background.js` → `initializeOrMigrateSettings()` жана `SCHEMA_VERSION` караңыз.

Иштеп чыгуу агымы (жаңы орнотуу кошуу)

- `sources/background.js` ичинде `SCHEMA_VERSION` маанисин жогорулатыңыз.
- Жаңы ачкычты + демейкини `initializeOrMigrateSettings()` ичиндеги `DEFAULTS` объектисине кошуңуз.
- Демейкилерди себүүдө "only-if-undefined" эрежесин колдонуңуз; бар маанилерди үстүнө жазбаңыз.
- Эгер орнотуу колдонуучуга көрүнсө, аны `sources/options.js` ичинде иштетип, локалдашкан саптарды кошуңуз.
- Тесттерди кошуңуз/баптаңыз (`tests/background.settings.migration.test.js` караңыз).

Кол менен тестирлөө кеңештери

- Таза орнотууну симуляциялоо: кеңейтменин маалымат каталогун тазалаңыз же жаңы профилден баштаңыз.
- Жаңыртууну симуляциялоо: `storage.local` ичинде `settingsVersion` маанисин `0` кылып коюп кайра жүктөңүз; бар маанилер өзгөрбөгөнүн жана жетишпеген ачкычтар гана кошулганын ырастаңыз.

---

### Мүчүлүштүктөрдү жоюу {#troubleshooting}

- Thunderbird 128 ESR же андан жаңы экенин текшериңиз
- Иштөө маалындагы көйгөйлөр үчүн Error Console колдонуңуз
- Сакталган орнотуулар туура колдонулбай жаткандай көрүнсө, Thunderbird’ди кайра баштап көрүңүз. (Thunderbird сессиялар арасында абалды кэшке сактап калышы мүмкүн; кайра баштоо жаңы орнотуулар жүктөлүшүн камсыздайт.)

---

### CI жана камтуу {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitestти камтуу босоголору менен иштетет (саптар/функциялар/бутактар/операциялар 85%). Босоголор аткарылбаса, жумуш жаңылат.
- Агым HTML отчету менен `coverage-html` артефактты жүктөйт; аны иштетүү барагынан жүктөп алыңыз (Actions → акыркы иштетүү → Artifacts).

---

### Салым кошуу {#contributing}

- Бранч/commit/PR көрсөтмөлөрү үчүн CONTRIBUTING.md караңыз
- Кеңеш: күнүмдүк профилге таасир этпеш үчүн тесттер үчүн өзүнчө Thunderbird иштеп чыгуу профилин түзүңүз.

---

### Котормолор

- Чоң “баары → баарына” которуу жумуштары жай жана кымбат болушу мүмкүн. Алгач бөлүкчөдөн баштаңыз (мис., бир нече документ жана 1–2 локаль), натыйжаны карап чыгып, андан кийин кеңейтиңиз.

---

- Кайра аракеттенүү саясаты: которуу жумуштары API катачалыктарында экспоненциалдык кечигүү менен 3 жолу аракет кылат; `scripts/translate_web_docs_batch.js` жана `scripts/translate_web_docs_sync.js` караңыз.

Документтер үчүн скриншоттор

- Сүрөттөрдү `website/static/img/` астына сактаңыз.
- MD/MDX ичинде `useBaseUrl('/img/<filename>')` аркылуу шилтеме бериңиз, ошондо жолдор сайттын `baseUrl` менен дал келет.
- `website/static/img/` астында сүрөттөрдү кошкондон же атын өзгөрткөндөн кийин, бардык шилтемелер дагы эле `useBaseUrl('/img/…')` колдонуп жатканын жана жергиликтүү превьюда чагылдырыларын ырастаңыз.
  Белгилер (Favicons)

- Көп өлчөмдүү `favicon.ico` бардык курулуш жолдорунда (Make + скрипттер) `website/scripts/build-favicon.mjs` аркылуу автоматтык түрдө түзүлөт.
- Кол менен кадам талап кылынбайт; `icon-*.png` жаңыртуу жетиштүү.
  Карап чыгуу кеңеши

- Которулуп жаткан документтерде front‑matter ичиндеги `id` өзгөртпөңүз; болгону `title` жана `sidebar_label` маанилерин которуңуз (эгер бар болсо).

#### clean {#mt-clean}

- Максат: жергиликтүү курулуш/превью артефакттарын алып салуу.
- Колдонуу: `make clean`
- Алып салат (эгер бар болсо):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Максат: форматтоо, тестирлөө, өзгөрүү журналын жаңыртуу, commit жана push.
- Колдонуу: `make commit`
- Деталдар: Prettier (жазуу), `make test`, `make test_i18n` иштетет; сахналанган өзгөртүүлөр бар болсо changelog кошулат; `origin/<branch>` бутагына push кылат.

---

#### eslint {#mt-eslint}

- Максат: ESLintти flat config аркылуу иштетүү.
- Колдонуу: `make eslint`

---

#### help {#mt-help}

- Максат: бардык максаттарды кыскача сүрөттөмөлөрү менен тизмелөө.
- Колдонуу: `make help`

---

#### lint {#mt-lint}

- Максат: MailExtension үчүн `web-ext` колдонуп lint жүргүзүү.
- Колдонуу: `make lint`
- Эскертмелер: `sources/manifest_LOCAL.json` → `sources/manifest.json` убактылуу көчүрүлөт; курулган ZIPтер эске алынбайт; эскертүүлөр pipeline’ды бузбайт.

---

#### menu {#mt-menu}

- Максат: Make максатын жана кошумча аргументтерди тандоо үчүн интерактивдүү меню.
- Колдонуу: `make` аргументтерсиз иштетиңиз.
- Эскертмелер: `whiptail` жеткиликтүү болбосо, меню `make help` га кайрылат.

---

#### pack {#mt-pack}

- Максат: ATN жана LOCAL ZIPтерди куруу (`lint` көз каранды).
- Колдонуу: `make pack`
- Кеңеш: таңгактоодон мурун версияларды `sources/manifest_*.json` экөөндө тең жогорулатыңыз.

---

#### prettier {#mt-prettier}

- Максат: репозиторийди ордунда форматтоо.
- Колдонуу: `make prettier`

#### prettier_check {#mt-prettier_check}

- Максат: форматтоону текшерүү (жазуусуз).
- Колдонуу: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Максат: `prettier` үчүн alias.
- Колдонуу: `make prettier_write`

---

#### test {#mt-test}

- Максат: Prettier (жазуу), ESLint, андан соң Vitest (камтуу орнотулган болсо) иштетүү.
- Колдонуу: `make test`

#### test_i18n {#mt-test_i18n}

- Максат: кошумча модул саптары жана вебсайт документтери үчүн i18nга басым жасаган тесттер.
- Колдонуу: `make test_i18n`
- Иштетет: `npm run test:i18n` жана `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Максат: кошумча модулдун UI саптарын ENден башка локалдарга которуу.
- Колдонуу: `make translation_app OPTS="--locales all|de,fr"`
- Эскертмелер: ачкыч түзүлүшүн жана плейсхолдерлерди сактайт; `translation_app.log` ичине логдойт. Скрипт түрү: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Максат: вебсайт документтерин `website/docs/*.md` дан `website/i18n/<locale>/...` га которуу.
- Артыкчылыктуу: `translate_web_docs_batch` (OpenAI Batch API)
  - Колдонуу (желектери): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Эски позициялык форма дагы кабыл алынат: `OPTS="<doc|all> <lang|all>"`
- Жүрүм-турум: JSONL түзөт, жүктөйт, ар 30 секундада текшерет, жыйынтыктарды түшүрүп алат, файлдарды жазат.
- Эскертүү: пакеттик жумуш 24 саатка чейин созулушу мүмкүн (OpenAI’дын пакеттик терезесине ылайык). Консоль ар бир текшерүүдө өткөн убакытты көрсөтөт.
- Чөйрө: `OPENAI_API_KEY` (милдеттүү), милдеттүү эмес `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (демейки 24 саат), `BATCH_POLL_INTERVAL_MS`.
- Эски режим: `translate_web_docs_sync`
  - Колдонуу (желектери): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Эски позициялык форма дагы кабыл алынат: `OPTS="<doc|all> <lang|all>"`
- Жүрүм-турум: жуп-жуптан синхрондук сурамдар (пакеттик агрегация жок).
- Эскертмелер: `OPTS` берилбесе, интерактивдүү суроолор көрсөтүлөт. Эки режим тең код блокторун/inline кодду сактайт жана front‑matter ичиндеги `id` өзгөртпөйт; логдор `translation_web_batch.log` (batch) же `translation_web_sync.log` (sync) ичине жазылат.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Максат: вебсайттын UI саптарын (башкы бет, навбар, футер) `website/i18n/en/code.json` тан `website/i18n/<locale>/code.json` алдындагы бардык локалдарга которуу (`en` четтетилет).
- Колдонуу: `make translate_web_index` же `make translate_web_index OPTS="--locales de,fr [--force]"`
- Талаптар: `OPENAI_API_KEY` экспорттоо (милдеттүү эмес: `OPENAI_MODEL=gpt-4o-mini`).
- Жүрүм-турум: JSON түзүлүшүн текшерет, ийри кашаадагы плейсхолдерлерди сактайт, URLдар өзгөрбөйт, жана валидация каталарында пикир менен кайра аракеттенет.

---

#### web_build {#mt-web_build}

- Максат: документтер сайтты `website/build` ичине куруу.
- Колдонуу: `make web_build OPTS="--locales en|de,en|all"` (же `BUILD_LOCALES="en de"` орнотуңуз)
- Ички иштөөсү: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Көзкарандылыктар: `website/node_modules/@docusaurus` жок болгондо гана `website/` ичинде `npm ci` иштетет.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Максат: оффлайн коопсуз шилтеме текшерүүсү.
- Колдонуу: `make web_build_linkcheck OPTS="--locales en|all"`
- Эскертмелер: `tmp_linkcheck_web_pages` ичине куруйт; GH Pages `baseUrl` ну `/` кылып кайра жазат; алыстан HTTP(S) шилтемелерди өткөрүп жиберет.

#### web_build_local_preview {#mt-web_build_local_preview}

- Максат: кошумча тест/шилтеме текшерүүсү менен жергиликтүү gh‑pages превью.
- Колдонуу: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Жүрүм-турум: адегенде Node превью серверин аракет кылат (`scripts/preview-server.mjs`, `/__stop` колдоого алынат), болбосо `python3 -m http.server` га кайрылат; 8080–8090 портторунда кызмат көрсөтөт; PID `web-local-preview/.server.pid` ичинде.

#### web_push_github {#mt-web_push_github}

- Максат: `website/build` файлын `gh-pages` бутагына түртүү.
- Колдонуу: `make web_push_github`

Кеңеш: Makefile колдонгон пакет менеджерин өзгөртүү үчүн `NPM=…` орнотуңуз (демейкиси `npm`).

---
