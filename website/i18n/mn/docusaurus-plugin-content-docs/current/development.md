---
id: development
title: 'Хөгжүүлэлт'
sidebar_label: 'Хөгжүүлэлт'
---

---

## Хөгжүүлэлтийн гарын авлага {#development-guide}

:::note Зөвхөн Англи хувилбарыг зас; орчуулгууд даган шинэчлэгдэнэ
Баримтжуулалтыг зөвхөн `website/docs` (Англи) дотор шинэчил. `website/i18n/<locale>/…` дахь орчуулгууд автоматаар үүсдэг тул гараар бүү зас. Локализацийн агуулгыг шинэчлэхэд орчуулгын даалгавруудыг (жиш., `make translate_web_docs_batch`) ашигла.
:::

### Урьдчилсан шаардлага {#prerequisites}

- Node.js 22+ болон npm (Node 22-оор туршсан)
- Thunderbird 128 ESR эсвэл түүнээс шинэ (гараар тест хийхэд)

---

### Төслийн бүтэц (өндөр түвшний) {#project-layout-high-level}

- Root: савлагааны скрипт `distribution_zip_packer.sh`, баримт бичиг, скриншотууд
- `sources/`: үндсэн нэмэлтийн код (background, тохиргоо/попап UI, манифестууд, дүрснүүд)
- `tests/`: Vitest иж бүрдэл
- `website/`: Docusaurus баримт (i18n нь `website/i18n/de/...` дор)

---

### Суулгалт ба хэрэгслүүд {#install-and-tooling}

- Root хамаарлуудыг суулгах: `npm ci`
- Баримт (заавал биш): `cd website && npm ci`
- Зорилтуудыг олж мэдэх: `make help`

---

### Шууд хөгжүүлэлт (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop дээр хурдан давталт (зөвхөн UI smoke‑тест):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird дээр ажиллуулах (MailExtensions-д илүү тохиромжтой):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Зөвлөмжүүд:
- Thunderbird‑ийн Алдааны консолыг нээж байлга (Tools → Developer Tools → Error Console).
- MV3 event хуудсууд идэвхгүй үед түдгэлздэг; код өөрчлөгдсөний дараа нэмэлтийг дахин ачаал, эсвэл web‑ext автоматаар дахин ачаалуулахыг зөвшөөр.
- Зөвхөн Firefox‑д байдаг зарим зан үйл өөр; API‑ийн нийцлийг баталгаажуулахын тулд үргэлж Thunderbird дээр шалга.
- Thunderbird бинар замууд (жишээ):
- Linux: `thunderbird` (ж., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Профайлыг тусгаарлах: Өдөр тутмын тохиргоонд нөлөөлөхгүй байхын тулд хөгжүүлэлтэд тусдаа Thunderbird профайл ашигла.

---

### Make зорилтууд (үсгийн дарааллаар) {#make-targets-alphabetical}

Makefile нь түгээмэл хөгжүүлэлтийн урсгалыг стандартчилдаг. `make help`‑г хүссэн үедээ ажиллуулж бүх зорилтын нэг мөрийн хураангуйг хар.

Зөвлөмж: зорилт өгөхгүйгээр `make` ажиллуулбал зорилт сонгох энгийн Whiptail цэс нээгдэнэ.

| Зорилт                                                   | Нэг мөрийн тайлбар                                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Орон нутгийн build/preview артефактуудыг устгах (tmp/, web-local-preview/, website/build/).                  |
| [`commit`](#mt-commit)                                   | Форматлах, тестүүдийг ажиллуулах (i18n багтсан), өөрчлөлтийн тэмдэглэлийг шинэчлэх, commit & push хийх.      |
| [`eslint`](#mt-eslint)                                   | ESLint‑ийг flat конфигээр (`npm run -s lint:eslint`) ажиллуулах.                                             |
| [`help`](#mt-help)                                       | Бүх зорилтыг нэг мөрийн тайлбартайгаар (эрэмбэлсэн) жагсаах.                                                 |
| [`lint`](#mt-lint)                                       | `sources/` дээр web‑ext lint (түр manifest; ZIP‑үүдийг үл тоомсорлоно; ноцтой бус).                          |
| [`menu`](#mt-menu)                                       | Харилцан үйлчлэлтэй цэснээс зорилт болон нэмэлт аргумент сонгох.                                             |
| [`pack`](#mt-pack)                                       | ATN ба LOCAL ZIP‑уудыг бүтээх (linter ажиллуулна; packer скриптийг дуудаж).                                  |
| [`prettier`](#mt-prettier)                               | Репог газар дээр нь форматлах (өөрчлөлт бичнэ).                                                              |
| [`prettier_check`](#mt-prettier_check)                   | Prettier‑ийг шалгах горимоор (бичилтгүй); дахин формат хэрэгтэй бол алдаа өгнө.                              |
| [`prettier_write`](#mt-prettier_write)                   | `prettier`‑ийн синоним.                                                                                      |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, дараа нь Vitest (coverage тохируулсан бол).                                        |
| [`test_i18n`](#mt-test_i18n)                             | Зөвхөн i18n тестүүд: нэмэлтийн placeholder/нийцэл + вэбсайтын нийцэл.                                        |
| [`translate_app`](#mt-translation-app)                   | `translation_app`‑ийн синоним.                                                                               |
| [`translation_app`](#mt-translation-app)                 | Аппын UI мөрүүдийг `sources/_locales/en/messages.json`‑оос хөрвүүлэх.                                        |
| [`translate_web_docs_batch`](#mt-translation-web)        | Вэбсайтын баримтыг OpenAI Batch API‑аар орчуулах (илүүд үзнэ).                                               |
| [`translate_web_docs_sync`](#mt-translation-web)         | Вэбсайтын баримтыг синхрон хөрвүүлэх (уламжлалт, багц бус).                                                  |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index`‑ийн синоним.                                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | Нүүр/навигац/доод колонтитрын UI‑г орчуулах (`website/i18n/en/code.json → .../<lang>/code.json`).            |
| [`web_build`](#mt-web_build)                             | Баримтыг `website/build` руу build хийх (`--locales` / `BUILD_LOCALES` дэмжинэ).                             |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Офлайнд аюулгүй холбоос шалгалт (алсын HTTP[S]‑г алгасна).                                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Орон нутгийн gh‑pages урьдчилсан харалт; 8080–8090 дээр автоматаар үйлчлэх; сонголтоор тест/холбоос шалгалт. |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`‑г `gh-pages` салбар руу түлхэх.                                                              |

Сонголтын синтакс

- Сонголтууд дамжуулахад `make <command> OPTS="…"` ашигла (ишлэл ашиглахыг зөвлөе). Доорх зорилт бүр жишээ хэрэглээг харуулна.

--

-

#### Локалийн build зөвлөмжүүд {#locale-build-tips}

- Локалийн дэд хэсгийг build хийх: `BUILD_LOCALES="en de"` тохируул, эсвэл вэб зорилтуудад `OPTS="--locales en,de"` дамжуул.
- Тодорхой локалийг урьдчилан харах: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build ба багцлах {#build-and-package}

- ZIP‑ууд бүтээх: `make pack`
- Репо root‑д ATN болон LOCAL ZIP‑уудыг үүсгэнэ (артефактуудыг гараар бүү зас)
- Зөвлөмж: багцлахаас өмнө `sources/manifest_ATN.json` болон `sources/manifest_LOCAL.json`‑д хувилбарыг шинэчил
- Гараар суулгах (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → баригдсан ZIP‑ийг сонго

---

### Тест {#test}

- Бүрэн иж бүрдэл: `make test` (Vitest)
- Хамрах хүрээ (заавал биш):
- `npm i -D @vitest/coverage-v8`
- `make test`‑г ажиллуулаад; HTML тайланг `coverage/index.html` дээр нээнэ үү
- Зөвхөн i18n: `make test_i18n` (UI түлхүүр/placeholder/гарчиг + вэбсайтын локаль бүрийн баримт бүрийн нийцэл, id/title/sidebar_label шалгалттай)

---

### Дебаг ба лог {#debugging-and-logs}

- Алдааны консоль: Tools → Developer Tools → Error Console
- Гүйлтэд дэлгэрэнгүй логуудыг асаах/унтраах:
- Идэвхжүүлэх: `messenger.storage.local.set({ debug: true })`
- Идэвхгүй болгох: `messenger.storage.local.set({ debug: false })`
- Хариу бичих/илгээх үед логууд харагдана

---

### Баримт (вэбсайт) {#docs-website}

- Хөгжүүлэлтийн сервер: `cd website && npm run start`
- Статик сайтыг build хийх: `cd website && npm run build`
- Make эквивалентууд (үсгийн дарааллаар): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ашиглалтын жишээнүүд:
- Зөвхөн EN, тест/холбоос шалгалтыг алгас, push хийхгүй: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Бүх локалиуд, тест/холбоос шалгалттай, дараа нь push: `make web_build_local_preview && make web_push_github`
- Нийтлэхийн өмнө офлайнд аюулгүй холбоос шалгалтыг ажиллуул: `make web_build_linkcheck`.
- i18n: Англи эх нь `website/docs/*.md` дотор; Германы орчуулгууд `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` дотор
- Хайлт: Хэрэв CI‑д Algolia DocSearch орчны хувьсагчууд (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) тохируулагдсан бол сайт Algolia хайлтыг ашиглана; үгүй бол локал хайлт руу унадаг. Нүүр хуудсан дээр `/` эсвэл `Ctrl+K` дарж хайлтын хайрцгийг нээ.

---

#### Хандивын чиглүүлэгч маршрут {#donate-redirect}

- `website/src/pages/donate.js`
- Маршрут: `/donate` (мөн `/<locale>/donate`)
- Зан үйл:
- Хэрэв идэвхтэй маршрутад локаль байгаа бол (ж., `/de/donate`) түүнийг ашиглана
- Үгүй бол `navigator.languages` ба тохируулсан локалиудаас хамгийн сайн тохирлыг сонгоно; анхдагч локаль руу унадаг
- Дараах руу чиглүүлнэ:
- `en` → `/docs/donation`
- бусад → `/<locale>/docs/donation`
- Зөв baseUrl зохицуулалтад `useBaseUrl` ашигладаг
- Нэмэлтээр meta refresh + `noscript` холбоос бүхий fallback агуулна

---

---

#### Урьдчилсан харалтын зөвлөмжүүд {#preview-tips}

- Node preview‑г цэвэрхэн зогсоох: `http://localhost:<port>/__stop` нээнэ үү (`Local server started`‑ны дараа хэвлэгдэнэ).
- Хэрэв MDX/JSX доторх зурагнууд ачаалахгүй байвал сайтын `baseUrl`‑г хүндэтгэхийн тулд `useBaseUrl('/img/...')` ашигла.
- Урьдчилсан харалт эхэлж, холбоос шалгалт дараа нь ажиллана; энэ нь хаахгүй (задгай гадаад холбоосууд урьдчилсан харалтыг зогсоохгүй).
- Урьдчилсан харалтын URL жишээ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” дараа хэвлэгдэнэ).
- Холбоос шалгалт дахь гадаад холбоосууд: Зарим гадаад сайтууд (ж., addons.thunderbird.net) автомат мөлхөгчдийг блоклодог тул шалгалтад 403 харагдаж магадгүй. Урьдчилсан харалт хэвээр эхэлнэ; эдгээрийг үл тоож болно.

---

#### Вэбсайтыг орчуулах {#translate-website}

Танд юу орчуулах боломжтой вэ

- Зөвхөн вэбсайтын UI: нүүр хуудас, навигац, доод колонтитр болон бусад UI мөрүүд. Баримтын агуулга одоогоор зөвхөн англи хэвээр.

Хаана засварлах вэ

- `website/i18n/<locale>/code.json` файлыг зас (жишээнд `en`‑г ашигла). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` зэрэг placeholder‑уудыг өөрчлөхгүй үлдээ.

Файлуудыг үүсгэх эсвэл шинэчлэх

- Бүх локальд дутуу stubs үүсгэх: `npm --prefix website run i18n:stubs`
- Англиас stubs‑уудыг дарж бичих (шинэ мөр нэмж оруулсны дараа): `npm --prefix website run i18n:stubs:force`
- Нэг локалийн хувилбар: `npx --prefix website docusaurus write-translations --locale <locale>`

Нүүр/навигац/доод колонтитрын UI мөрүүдийг орчуулах (OpenAI)

- Нэг удаа эрх олголтыг тохируул (shell эсвэл .env):
- `export OPENAI_API_KEY=sk-...`
- Заавал биш: `export OPENAI_MODEL=gpt-4o-mini`
- Нэг удаагийн (бүх локаль, en‑ийг алгасна): `make translate_web_index`
- Тодорхой локальд хязгаарлах: `make translate_web_index OPTS="--locales de,fr"`
- Байгаа утгуудыг дарж бичих: `make translate_web_index OPTS="--force"`

Баталгаажуулалт ба дахин оролтууд

- Орчуулгын скрипт JSON бүтцийг шалгаж, буржгар хаалттай placeholder‑уудыг хадгалж, URL‑ууд өөрчлөгдөөгүйг баталгаажуулдаг.
- Баталгаажуулалт бүтэлгүйтвэл 2 удаа хүртэл санал хүсэлт өгч дахин оролддог; тэгээд одоогийн утгуудыг хэвээр үлдээнэ.

Өөрийн локалийг урьдчилан харах

- Хөгжүүлэлтийн сервер: `npm --prefix website run start`
- Энд зочил: `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Илгээх

- Зассан `code.json` файл(ууд)‑тай PR нээ. Өөрчлөлтүүдийг төвлөрүүлж, боломжтой бол хурдан скриншот хавсарга.

---

### Аюулгүй байдал ба тохиргооны зөвлөмжүүд {#security-and-configuration-tips}

- `sources/manifest.json`‑г commit хийж болохгүй (build явцад түр зуур үүсдэг)
- Шинэчлэлтийн суваг тогтвортой байлгахын тулд `browser_specific_settings.gecko.id`‑г тогтвортой хадгал

---

### Тохиргоонуудын хадгалалт {#settings-persistence}

- Хадгалалт: Хэрэглэгчийн бүх тохиргоо `storage.local` дотор хадгалагдаж, нэмэлтийн шинэчлэлүүдийн хооронд хадгалагдана.
- Суулгалт: Анхдагч утгууд нь түлхүүр үнэхээр байхгүй (undefined) үед л хэрэгжинэ.
- Шинэчлэлт: Шилжилт зөвхөн дутаасан түлхүүрүүдийг бөглөнө; одоо байгаа утгууд огт дарж бичигдэхгүй.
- Схемийн маркер: `settingsVersion` (одоогоор `1`).
- Түлхүүрүүд ба анхдагчууд:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: `sources/background.js` → `initializeOrMigrateSettings()` болон `SCHEMA_VERSION`‑г үз.

Хөгжүүлэлтийн урсгал (шинэ тохиргоо нэмэх)

- `sources/background.js` дотор `SCHEMA_VERSION`‑г өсгө.
- Шинэ түлхүүр + анхдагчийг `initializeOrMigrateSettings()` доторх `DEFAULTS` объектод нэм.
- Анхдагчийг seed хийхдээ "only-if-undefined" дүрмийг хэрэглэ; байгаа утгуудыг бүү дарж бич.
- Хэрэв тохиргоо хэрэглэгчид харагддаг бол `sources/options.js`‑д холбож, локалчилсан мөрүүдийг нэм.
- Тест нэм/зас ( `tests/background.settings.migration.test.js`‑г үз).

Гараар тест хийх зөвлөмжүүд

- Цоо шинэ суулгалтыг дуурайлгах: өргөтгөлийн өгөгдлийн сангийн хавтсыг цэвэрлэ эсвэл шинэ профайлаар эхлүүл.
- Шинэчлэлтийг дуурайлгах: `storage.local` дотор `settingsVersion`‑г `0` болгон тохируулж дахин ачаал; байгаа утгууд өөрчлөгдөөгүй, зөвхөн дутуу түлхүүрүүд нэмэгдсэнийг баталгаажуул.

---

### Алдааг олж засварлах {#troubleshooting}

- Thunderbird 128 ESR эсвэл түүнээс шинэ эсэхийг баталгаажуул
- Гүйлтийн асуудлуудад Алдааны консоль ашигла
- Хэрэв хадгалсан тохиргоонууд зөв хэрэгжихгүй байгаа мэт санагдвал Thunderbird‑ийг дахин асаагаад дахин оролдоно уу. (Thunderbird сешн хооронд зарим төлөвийг кэшлэх магадлалтай; дахин асаалт шинэ тохиргоонуудыг цэвэр ачаална.)

---

### CI ба хамрах хүрээ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) нь vitest‑ийг хамрах хүрээний босготой (85% мөр/функц/салаа/мэдэгдэл) ажиллуулдаг. Хэрэв босго хангагдахгүй бол ажил бүтэлгүйтнэ.
- Workflow нь HTML тайлан бүхий `coverage-html` артефактыг байршуулна; гүйцэтгэлийн хуудсаас татан ав (Actions → сүүлийн гүйлт → Artifacts).

---

### Хувь нэмэр оруулах {#contributing}

- Салбар/commit/PR‑ийн зааварт CONTRIBUTING.md‑г үз
- Зөвлөмж: Өдөр тутмын профайлдаа нөлөөлөхгүйн тулд тест хийхэд тусдаа Thunderbird хөгжүүлэлтийн профайл үүсгэ.

---

### Орчуулгууд

- Том “all → all” орчуулгын ажлууд удаан, зардалтай байж болно. Эхлээд дэд хэсгээр (ж., хэдэн баримт ба 1–2 локаль) эхэлж, үр дүнг шалгаад, дараа нь өргөтгөөрэй.

---

- Дахин оролтын бодлого: орчуулгын ажлууд API алдаанд 3 удаа хүртэл экспоненциал backoff‑той дахин оролдлого хийнэ; `scripts/translate_web_docs_batch.js` болон `scripts/translate_web_docs_sync.js`‑г үз.

Баримтын скриншотууд

- Зурагнуудаа `website/static/img/` дор хадгал.
- Замууд сайтын `baseUrl`‑той зөв ажиллахын тулд MD/MDX дотор `useBaseUrl('/img/<filename>')` ашиглан ишил.
- `website/static/img/` дор зураг нэмж эсвэл нэр өөрчилсний дараа бүх ишлэлүүд `useBaseUrl('/img/…')`‑г үргэлжлүүлэн ашиглаж буйг баталгаажуулж, орон нутгийн урьдчилсан харалтад зөв дүрслэгдэж буй эсэхийг шалга.
  Favicons

- Олон хэмжээтэй `favicon.ico` нь (Make + скриптүүд) бүх build замуудад `website/scripts/build-favicon.mjs`‑аар автоматаар үүсдэг.
- Гараар алхам хийх шаардлагагүй; `icon-*.png`‑г шинэчлэхэд хангалттай.
  Шалгах зөвлөмж

- Орчуулагдсан баримт дотор front‑matter дахь `id`‑г өөрчлөхгүй үлдээнэ; байвал зөвхөн `title` болон `sidebar_label`‑ийг орчуул.

#### clean {#mt-clean}

- Зорилго: орон нутгийн build/preview артефактуудыг устгах.
- Ашиглалт: `make clean`
- Устгана (хэрэв байвал):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Зорилго: форматлах, тест хийх, changelog шинэчлэх, commit хийж push хийх.
- Ашиглалт: `make commit`
- Дэлгэрэнгүй: Prettier (write), `make test`, `make test_i18n` ажиллуулна; stage‑д өөрчлөлт байвал changelog нэмж бичнэ; `origin/<branch>` руу push хийнэ.

---

#### eslint {#mt-eslint}

- Зорилго: ESLint‑ийг flat конфигээр ажиллуулах.
- Ашиглалт: `make eslint`

---

#### help {#mt-help}

- Зорилго: бүх зорилтыг нэг мөрийн тайлбартайгаар жагсаах.
- Ашиглалт: `make help`

---

#### lint {#mt-lint}

- Зорилго: MailExtension‑ийг `web-ext` ашиглан lint хийх.
- Ашиглалт: `make lint`
- Тэмдэглэл: түр хуулбарыг `sources/manifest_LOCAL.json` → `sources/manifest.json`; build‑лэсэн ZIP‑үүдийг үл тоомсорлоно; анхааруулгууд pipeline‑ийг унагахгүй.

---

#### menu {#mt-menu}

- Зорилго: Make зорилт болон нэмэлт аргументаа сонгох харилцан үйлчлэлтэй цэс.
- Ашиглалт: аргументгүйгээр `make` ажиллуул.
- Тэмдэглэл: хэрэв `whiptail` байхгүй бол цэс `make help` руу унадаг.

---

#### pack {#mt-pack}

- Зорилго: ATN болон LOCAL ZIP‑уудыг build хийх (`lint`‑ээс хамаарна).
- Ашиглалт: `make pack`
- Зөвлөмж: багцлахаас өмнө хоёуланд нь хувилбаруудыг `sources/manifest_*.json` дотор өсгө.

---

#### prettier {#mt-prettier}

- Зорилго: репог газар дээр нь форматлах.
- Ашиглалт: `make prettier`

#### prettier_check {#mt-prettier_check}

- Зорилго: форматалтыг шалгах (бичилтгүй).
- Ашиглалт: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Зорилго: `prettier`‑ийн синоним.
- Ашиглалт: `make prettier_write`

---

#### test {#mt-test}

- Зорилго: Prettier (write), ESLint, дараа нь Vitest (суулгаатай бол coverage).
- Ашиглалт: `make test`

#### test_i18n {#mt-test_i18n}

- Зорилго: нэмэлтийн мөрүүд ба вэбсайтын баримтын i18n‑д төвлөрсөн тестүүд.
- Ашиглалт: `make test_i18n`
- Ажиллуулна: `npm run test:i18n` болон `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Зорилго: нэмэлтийн UI мөрүүдийг EN‑ээс бусад локаль руу орчуулах.
- Ашиглалт: `make translation_app OPTS="--locales all|de,fr"`
- Тэмдэглэл: түлхүүрийн бүтэц ба placeholder‑уудыг хадгална; `translation_app.log` руу лог бичнэ. Скриптийн хэлбэр: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Зорилго: вэбсайтын баримтыг `website/docs/*.md`‑ээс `website/i18n/<locale>/...` руу орчуулах.
- Илүүд үзэх: `translate_web_docs_batch` (OpenAI Batch API)
  - Ашиглалт (flag‑ууд): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Уламжлалт позициональ аргументууд бас зөвшөөрөгдөнө: `OPTS="<doc|all> <lang|all>"`
- Зан үйл: JSONL бүтээж, upload хийж, 30 секунд тутамд шалгаж, үр дүн татаж авч, файлууд бичнэ.
- Тэмдэглэл: багц ажил (batch job) OpenAI‑ийн batch цонхны дагуу 24 цаг хүртэл үргэлжилж болно. Консол бүр шалгалтад зарцуулсан хугацааг харуулна.
- Орчин: `OPENAI_API_KEY` (шаардлагатай), сонголтоор `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (анхдагч 24h), `BATCH_POLL_INTERVAL_MS`.
- Уламжлалт: `translate_web_docs_sync`
  - Ашиглалт (flag‑ууд): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Уламжлалт позициональ аргументууд бас зөвшөөрөгдөнө: `OPTS="<doc|all> <lang|all>"`
- Зан үйл: хос бүрээр синхрон хүсэлтүүд (багцжуулалтгүй).
- Тэмдэглэл: `OPTS` орхигдвол харилцан үйлчлэлтэй асуултуудтай. Хоёр горим хоёулаа кодын блок/inline кодыг хадгалж, front‑matter дахь `id`‑г өөрчлөхгүй; `translation_web_batch.log` (batch) эсвэл `translation_web_sync.log` (sync) руу лог бичнэ.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Зорилго: вэбсайтын UI мөрүүдийг (нүүр, навигац, доод колонтитр) `website/i18n/en/code.json`‑оос `website/i18n/<locale>/code.json` доорх бүх локаль руу (`en`‑г үл тооцон) орчуулах.
- Ашиглалт: `make translate_web_index` эсвэл `make translate_web_index OPTS="--locales de,fr [--force]"`
- Шаардлага: `OPENAI_API_KEY`‑г экспортло (сонголтоор: `OPENAI_MODEL=gpt-4o-mini`).
- Зан үйл: JSON бүтэц баталгаажуулж, буржгар хаалттай placeholder‑уудыг хадгалж, URL‑уудыг өөрчлөхгүй, баталгаажуулалтын алдаанд санал хүсэлтээр дахин оролдлого хийнэ.

---

#### web_build {#mt-web_build}

- Зорилго: баримтын сайтыг `website/build` руу build хийх.
- Ашиглалт: `make web_build OPTS="--locales en|de,en|all"` (эсвэл `BUILD_LOCALES="en de"` тохируул)
- Дотоод: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Хамаарал: хэрэв `website/node_modules/@docusaurus` байхгүй бол `website/` дотор `npm ci` ажиллуулна.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Зорилго: офлайнд аюулгүй холбоос шалгалт.
- Ашиглалт: `make web_build_linkcheck OPTS="--locales en|all"`
- Тэмдэглэл: `tmp_linkcheck_web_pages` руу build хийж; GH Pages‑ийн `baseUrl`‑г `/` болгон дахин бичнэ; алсын HTTP(S) холбоосуудыг алгасна.

#### web_build_local_preview {#mt-web_build_local_preview}

- Зорилго: сонголттой тест/холбоос шалгалттай орон нутгийн gh‑pages урьдчилсан харалт.
- Ашиглалт: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Зан үйл: эхлээд Node preview серверийг оролдоно (`scripts/preview-server.mjs`, `/__stop` дэмжинэ), бүтэлгүйтвэл `python3 -m http.server`‑д унадаг; 8080–8090 дээр үйлчилнэ; PID нь `web-local-preview/.server.pid` дээр.

#### web_push_github {#mt-web_push_github}

- Зорилго: `website/build`‑г `gh-pages` салбар руу түлхэх.
- Ашиглалт: `make web_push_github`

Зөвлөмж: Makefile‑д ашиглах пакет менежерийг өөрчлөхийн тулд `NPM=…`‑г тохируул (анхдагч нь `npm`).
