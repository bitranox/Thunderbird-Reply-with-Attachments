---
id: development
title: 'Rivojlanish'
sidebar_label: 'Ishlab chiqish'
---

---

## Rivojlantirish qo‘llanmasi {#development-guide}

:::note Faqat inglizchani tahrir qiling; tarjimalar avtomatik tarqaladi
Hujjatlarni **faqat** `website/docs` (Inglizcha) ostida yangilang. `website/i18n/<locale>/…` ostidagi tarjimalar avtomatik yaratiladi va qo‘lda tahrir qilinmasligi kerak. Mahalliylashtirilgan mazmunni yangilash uchun tarjima vazifalaridan (masalan, `make translate_web_docs_batch`) foydalaning.
:::

### Old shartlar {#prerequisites}

- Node.js 22+ va npm (Node 22 bilan sinovdan o‘tgan)
- Thunderbird 128 ESR yoki yangiroq (qo‘lda test qilish uchun)

---

### Loyiha tuzilmasi (umumiy ko‘rinish) {#project-layout-high-level}

- Ildiz (root): qadoqlash skripti `distribution_zip_packer.sh`, hujjatlar, skrinshotlar
- `sources/`: asosiy qo‘shimcha kodi (background, options/popup UI, manifestlar, ikonlar)
- `tests/`: Vitest to‘plami
- `website/`: Docusaurus hujjatlari (i18n `website/i18n/de/...` ostida)

---

### O‘rnatish va asboblar {#install-and-tooling}

- Ildiz bog‘liqliklarini o‘rnatish: `npm ci`
- Hujjatlar (ixtiyoriy): `cd website && npm ci`
- Maqsadlarni ko‘rish: `make help`

---

### Jonli ishlab chiqish (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop’da tezkor aylanish (faqat UI smoke-testlar):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird’da ishga tushirish (MailExtensions uchun afzal):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Maslahatlar:
- Thunderbird’ning Error Console oynasini ochiq tuting (Tools → Developer Tools → Error Console).
- MV3 hodisa sahifalari bekor turganda to‘xtatiladi; kod o‘zgargandan so‘ng qo‘shimchani qayta yuklang yoki web‑ext avtomatik qayta yuklashiga ruxsat bering.
- Faqat Firefox’da mavjud ayrim xatti-harakatlar farq qiladi; API mosligini har doim Thunderbird’da tekshirib ko‘ring.
- Thunderbird binar yo‘llari (misollar):
- Linux: `thunderbird` (masalan, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profilni ajratish: Kundalik sozlamalaringizga ta’sir qilmaslik uchun ishlab chiqish uchun alohida Thunderbird profilidan foydalaning.

---

### Make maqsadlari (alfavit tartibida) {#make-targets-alphabetical}

Makefile umumiy ishlab chiqish oqimlarini standartlashtiradi. Har bir maqsadning bir qatorli qisqacha bayonini ko‘rish uchun istalgan vaqtda `make help` ni ishga tushiring.

Maslahat: `make` ni maqsadsiz ishga tushirsangiz, maqsad tanlash uchun oddiy Whiptail menyusi ochiladi.

| Maqsad                                                   | Bir qatorli tavsif                                                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Mahalliy build/preview artefaktlarini olib tashlash (tmp/, web-local-preview/, website/build/).        |
| [`commit`](#mt-commit)                                   | Formatlash, testlarni ishga tushirish (i18n ham), changelog’ni yangilash, commit va push.              |
| [`eslint`](#mt-eslint)                                   | ESLint’ni flat config orqali ishga tushirish (`npm run -s lint:eslint`).                               |
| [`help`](#mt-help)                                       | Barcha maqsadlarni bir qatorli tavsiflar bilan ro‘yxatlash (saralangan).                               |
| [`lint`](#mt-lint)                                       | `sources/` ustida web‑ext lint (vaqtinchalik manifest; ZIPlarni e’tiborsiz qoldiradi; halokatli emas). |
| [`menu`](#mt-menu)                                       | Maqsad va ixtiyoriy argumentlarni tanlash uchun interaktiv menyu.                                      |
| [`pack`](#mt-pack)                                       | ATN va LOCAL ZIPlarni qurish (linterni ishga tushiradi; packer skriptini chaqiradi).                   |
| [`prettier`](#mt-prettier)                               | Repodan joyida formatlash (o‘zgarishlarni yozadi).                                                     |
| [`prettier_check`](#mt-prettier_check)                   | Prettier tekshiruv rejimida (yozishsiz); qayta format talab qilinsa muvaffaqiyatsiz tugaydi.           |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` uchun taxallus.                                                                             |
| [`test`](#mt-test)                                       | Prettier (yozish), ESLint, so‘ng Vitest (agar sozlangan bo‘lsa, qamrov).                               |
| [`test_i18n`](#mt-test_i18n)                             | Faqat i18n testlari: qo‘shimcha uchun placeholder/paritet + veb-sayt pariteti.                         |
| [`translate_app`](#mt-translation-app)                   | `translation_app` uchun taxallus.                                                                      |
| [`translation_app`](#mt-translation-app)                 | Ilova UI satrlarini `sources/_locales/en/messages.json` dan tarjima qilish.                            |
| [`translate_web_docs_batch`](#mt-translation-web)        | Veb-sayt hujjatlarini OpenAI Batch API orqali tarjima qilish (afzal).                                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | Veb-sayt hujjatlarini sinxron tarzda tarjima qilish (meros, non-batch).                                |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` uchun taxallus.                                                                |
| [`translation_web_index`](#mt-translation_web_index)     | Bosh sahifa/navbar/footer UI ni tarjima qilish (`website/i18n/en/code.json → .../<lang>/code.json`).   |
| [`web_build`](#mt-web_build)                             | Hujjatlarni `website/build` ga qurish (`--locales` / `BUILD_LOCALES` ni qo‘llab-quvvatlaydi).          |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline-xavfsiz havola tekshiruvi (masofaviy HTTP[S]ni o‘tkazib yuboradi).                             |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Mahalliy gh-pages preview; 8080–8090 portlarda avtomatik xizmat; ixtiyoriy testlar/havola tekshiruvi.  |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ni `gh-pages` tarmog‘iga push qilish.                                                  |

Opsiyalar uchun sintaksis

- `make <command> OPTS="…"` orqali opsiyalarni uzating (qo‘shtirnoq tavsiya etiladi). Quyida har bir maqsad uchun namunaviy foydalanish ko‘rsatilgan.

--

-

#### Lokalelarni qurish bo‘yicha maslahatlar {#locale-build-tips}

- Lokalelarning kichik to‘plamini qurish: `BUILD_LOCALES="en de"` ni o‘rnating yoki veb maqsadlariga `OPTS="--locales en,de"` ni bering.
- Muayyan lokeleni ko‘rish: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Qurish va qadoqlash {#build-and-package}

- ZIPlarni qurish: `make pack`
- Repo ildizida ATN va LOCAL ZIPlarni hosil qiladi (artefaktlarni qo‘lda tahrir qilmang)
- Maslahat: qadoqlashdan oldin versiyani `sources/manifest_ATN.json` va `sources/manifest_LOCAL.json` ikkalasida ham yangilang
- Qo‘lda o‘rnatish (dev): Thunderbird → Tools → Add‑ons and Themes → tishli → Install Add‑on From File… → qurilgan ZIPni tanlang

---

### Test {#test}

- To‘liq to‘plam: `make test` (Vitest)
- Qamrov (ixtiyoriy):
- `npm i -D @vitest/coverage-v8`
- `make test` ni ishga tushiring; HTML hisobot uchun `coverage/index.html` ni oching
- Faqat i18n: `make test_i18n` (UI kalitlari/placeholderlar/sarlavhalar + veb-sayt bo‘yicha har lokaledagi har hujjat pariteti, id/title/sidebar_label tekshiruvlari bilan)

---

### Nosozliklarni bartaraf etish jurnallari {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Ishlash vaqtida batafsil loglarni yoqib/o‘chirish:
- Yoqish: `messenger.storage.local.set({ debug: true })`
- O‘chirish: `messenger.storage.local.set({ debug: false })`
- Javoblarni tuzish/jo‘natish vaqtida loglar ko‘rinadi

---

### Hujjatlar (veb-sayt) {#docs-website}

- Dasturlash serveri: `cd website && npm run start`
- Statik saytni qurish: `cd website && npm run build`
- Make dagi ekvivalentlar (alfavit bo‘yicha): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Foydalanish misollari:
- Faqat EN, testlar/havola tekshiruvini o‘tkazib yuborish, push yo‘q: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Barcha lokalelar, testlar/havola tekshiruvi bilan, so‘ng push: `make web_build_local_preview && make web_push_github`
- Nashr qilishdan oldin, offline-xavfsiz havola tekshiruvi: `make web_build_linkcheck` ni ishga tushiring.
- i18n: Inglizcha `website/docs/*.md` ostida; Nemischa tarjimalar `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ostida
- Qidiruv: Agar CI’da Algolia DocSearch muhit o‘zgaruvchilari (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) o‘rnatilgan bo‘lsa, sayt Algolia qidiruvdan foydalanadi; aks holda mahalliy qidiruvga qaytadi. Bosh sahifada qidiruv oynasini ochish uchun `/` yoki `Ctrl+K` tugmalarini bosing.

---

#### Xayriya yo‘naltirish marshruti {#donate-redirect}

- `website/src/pages/donate.js`
- Marshrut: `/donate` (va `/<locale>/donate`)
- Xulq-atvor:
- Agar joriy marshrutda lokali bo‘lsa (masalan, `/de/donate`), undan foydalaning
- Aks holda, `navigator.languages` va sozlangan lokalelar orasidan eng mosini tanlang; sukut bo‘yicha lokalga qayting
- Yo‘naltiradi:
- `en` → `/docs/donation`
- boshqalar → `/<locale>/docs/donation`
- To‘g‘ri baseUrl ishlov berish uchun `useBaseUrl` dan foydalanadi
- Zaxira sifatida meta refresh + `noscript` havolasini o‘z ichiga oladi

---

---

#### Oldindan ko‘rish bo‘yicha maslahatlar {#preview-tips}

- Node preview’ni toza to‘xtatish: `http://localhost:<port>/__stop` ni oching (`Local server started` dan keyin chop etiladi).
- Agar MDX/JSX’da rasmlar yuklanmasa, saytning `baseUrl` ga rioya qilish uchun `useBaseUrl('/img/...')` dan foydalaning.
- Oldindan ko‘rish avval boshlanadi; havola tekshiruvi keyin ishlaydi va to‘xtatmaydi (singan tashqi havolalar preview’ni to‘xtatmaydi).
- Masalan, preview URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started”dan keyin chiqariladi).
- Havola tekshiruvidagi tashqi havolalar: Ba’zi tashqi saytlar (masalan, addons.thunderbird.net) avtomatlashtirilgan kravlerlarni bloklaydi va havola tekshiruvida 403 ko‘rsatishi mumkin. Preview baribir boshlanadi; bularni e’tiborsiz qoldirish xavfsiz.

---

#### Veb-saytni tarjima qilish {#translate-website}

Nimani tarjima qilishingiz mumkin

- Faqat veb-sayt UI: bosh sahifa, navbar, footer va boshqa UI satrlari. Hozircha hujjatlar mazmuni faqat inglizchada qoladi.

Qayerda tahrir qilish

- `website/i18n/<locale>/code.json` ni tahrir qiling (`en` ni namunaviy sifatida foydalaning). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` kabi placeholderlarni o‘zgartirmang.

Fayllarni yaratish yoki yangilash

- Barcha lokalelar uchun yetishmayotgan stublarni yaratish: `npm --prefix website run i18n:stubs`
- Yangi satrlar qo‘shilgach, stublarni inglizchadan qayta yozish: `npm --prefix website run i18n:stubs:force`
- Yagona lokali uchun muqobil: `npx --prefix website docusaurus write-translations --locale <locale>`

Bosh sahifa/navbar/footer UI satrlarini tarjima qilish (OpenAI)

- Bir marta ishonch ma’lumotlarini o‘rnating (shell yoki .env):
- `export OPENAI_API_KEY=sk-...`
- Ixtiyoriy: `export OPENAI_MODEL=gpt-4o-mini`
- Bir martalik (barcha lokalelar, en ni o‘tkazib yuborish): `make translate_web_index`
- Muayyan lokalelarga cheklash: `make translate_web_index OPTS="--locales de,fr"`
- Mavjud qiymatlarni qayta yozish: `make translate_web_index OPTS="--force"`

Tasdiqlash va qayta urinishlar

- Tarjima skripti JSON tuzilishini tekshiradi, jingalak qavsli placeholderlarni saqlaydi va URL’lar o‘zgarmasligini ta’minlaydi.
- Tasdiqlash muvaffaqiyatsiz bo‘lsa, mavjud qiymatlarni qoldirishdan oldin 2 martagacha fikr-mulohaza bilan qayta urinadi.

Lokaleni oldindan ko‘rish

- Dasturlash serveri: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` manziliga tashrif buyuring

Yuborish

- Tahrir qilingan `code.json` fayl(lar)i bilan PR oching. O‘zgarishlarni aniq saqlang va imkon bo‘lsa tezkor skrinshot qo‘shing.

---

### Xavfsizlik va konfiguratsiya bo‘yicha maslahatlar {#security-and-configuration-tips}

- `sources/manifest.json` ni commit qilmang (build vaqtincha yaratadi)
- Yangilash kanalini saqlash uchun `browser_specific_settings.gecko.id` ni barqaror saqlang

---

### Sozlamalarni saqlab qolish {#settings-persistence}

- Saqlash: Barcha foydalanuvchi sozlamalari `storage.local` da saqlanadi va qo‘shimcha yangilanishlari davomida saqlanib qoladi.
- O‘rnatish: Standartlar faqat kalit butunlay yo‘q bo‘lsa (undefined) qo‘llanadi.
- Yangilash: Migratsiya faqat yetishmayotgan kalitlarni to‘ldiradi; mavjud qiymatlar hech qachon qayta yozilmaydi.
- Sxema belgisi: `settingsVersion` (hozirda `1`).
- Kalitlar va standartlar:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Kod: qarang `sources/background.js` → `initializeOrMigrateSettings()` va `SCHEMA_VERSION`.

Dasturlash jarayoni (yangi sozlama qo‘shish)

- `sources/background.js` ichida `SCHEMA_VERSION` ni oshiring.
- Yangi kalit + standartni `initializeOrMigrateSettings()` dagi `DEFAULTS` obyektiga qo‘shing.
- Standartlarni urug‘lashda “faqat undefined bo‘lsa” qoidasidan foydalaning; mavjud qiymatlarni qayta yozmang.
- Agar sozlama foydalanuvchiga ko‘rinadigan bo‘lsa, uni `sources/options.js` ga ulang va mahalliylashtirilgan satrlarni qo‘shing.
- Testlarni qo‘shing/sozlang (`tests/background.settings.migration.test.js` ga qarang).

Qo‘lda test qilish bo‘yicha maslahatlar

- Yangi o‘rnatishni simulyatsiya qiling: kengaytmaning ma’lumotlar katalogini tozalang yoki yangi profil bilan boshlang.
- Yangilanishni simulyatsiya qiling: `storage.local` ichida `settingsVersion` ni `0` ga o‘rnating va qayta yuklang; mavjud qiymatlar o‘zgarmaganini va faqat yetishmayotgan kalitlar qo‘shilganini tasdiqlang.

---

### Nosozliklarni bartaraf etish {#troubleshooting}

- Thunderbird 128 ESR yoki yangiroq ekanini tekshiring
- Ishlash vaqtidagi muammolar uchun Error Console’dan foydalaning
- Agar saqlangan sozlamalar to‘g‘ri qo‘llanmagandek ko‘rinsa, Thunderbird’ni qayta ishga tushiring va yana urinib ko‘ring. (Thunderbird seanslar orasida holatni keshlashi mumkin; qayta ishga tushirish yangi sozlamalar yuklanishini ta’minlaydi.)

---

### CI va qamrov {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest’ni qamrov chegaralari bilan ishga tushiradi (85% satrlar/funksiyalar/tarmoqlar/bayonotlar). Chegaralar bajarilmasa, ish muvaffaqiyatsiz tugaydi.
- Ish jarayoni HTML hisobot bilan `coverage-html` artefaktini yuklaydi; uni run sahifasidan yuklab oling (Actions → so‘nggi run → Artifacts).

---

### Hissa qo‘shish {#contributing}

- Branch/commit/PR bo‘yicha ko‘rsatmalar uchun CONTRIBUTING.md’ni ko‘ring
- Maslahat: Kundalik profilingizga ta’sir qilmaslik uchun test uchun alohida Thunderbird ishlab chiqish profilini yarating.

---

### Tarjimalar

- Katta “all → all” tarjima ishlarini bajarish sekin va qimmat bo‘lishi mumkin. Avval kichik to‘plamdan boshlang (masalan, bir necha hujjat va 1–2 lokali), natijani ko‘rib chiqing, so‘ng kengaytiring.

---

- Qayta urinish siyosati: tarjima ishlarida API xatolarida eksponensial kechikish bilan 3 martagacha qayta urinish amalga oshiriladi; `scripts/translate_web_docs_batch.js` va `scripts/translate_web_docs_sync.js` ga qarang.

Hujjatlar uchun skrinshotlar

- Rasmlarni `website/static/img/` ostida saqlang.
- Ularni MD/MDX’da `useBaseUrl('/img/<filename>')` orqali ko‘rsating, shunda yo‘llar saytning `baseUrl` bilan mos ishlaydi.
- `website/static/img/` ostida rasmlar qo‘shilgandan yoki qayta nomlangandan so‘ng, barcha havolalar hanuz `useBaseUrl('/img/…')` dan foydalanayotganini va mahalliy preview’da render bo‘layotganini tasdiqlang.
  Favikonlar

- Ko‘p o‘lchamli `favicon.ico` barcha build yo‘llarida (Make + skriptlar) `website/scripts/build-favicon.mjs` orqali avtomatik yaratiladi.
- Qo‘lda hech qanday qadam talab qilinmaydi; `icon-*.png` ni yangilash kifoya.
  Ko‘rib chiqish maslahati

- Tarjima qilingan hujjatlarda front‑matter dagi `id` ni o‘zgartirmang; bo‘lsa faqat `title` va `sidebar_label` ni tarjima qiling.

#### clean {#mt-clean}

- Maqsad: mahalliy build/preview artefaktlarini olib tashlash.
- Foydalanish: `make clean`
- Quyidagilarni olib tashlaydi (agar mavjud bo‘lsa):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Maqsad: formatlash, test, changelog’ni yangilash, commit va push.
- Foydalanish: `make commit`
- Tafsilotlar: Prettier (yozish), `make test`, `make test_i18n` ni ishga tushiradi; stage qilingan farqlar bo‘lsa, changelog’ga qo‘shimcha qiladi; `origin/<branch>` ga push qiladi.

---

#### eslint {#mt-eslint}

- Maqsad: ESLint’ni flat config orqali ishga tushirish.
- Foydalanish: `make eslint`

---

#### help {#mt-help}

- Maqsad: barcha maqsadlarni bir qatorli tavsiflar bilan ro‘yxatlash.
- Foydalanish: `make help`

---

#### lint {#mt-lint}

- Maqsad: MailExtension’ni `web-ext` yordamida lint qilish.
- Foydalanish: `make lint`
- Eslatma: vaqtinchalik `sources/manifest_LOCAL.json` → `sources/manifest.json` nusxa ko‘chiradi; qurilgan ZIPlarni e’tiborsiz qoldiradi; ogohlantirishlar konveyerni to‘xtatmaydi.

---

#### menu {#mt-menu}

- Maqsad: Make maqsadini va ixtiyoriy argumentlarni tanlash uchun interaktiv menyu.
- Foydalanish: `make` ni argumentlarsiz ishga tushiring.
- Eslatma: agar `whiptail` mavjud bo‘lmasa, menyu `make help` ga qaytadi.

---

#### pack {#mt-pack}

- Maqsad: ATN va LOCAL ZIPlarni qurish (`lint` ga bog‘liq).
- Foydalanish: `make pack`
- Maslahat: qadoqlashdan oldin `sources/manifest_*.json` ikkalasida ham versiyalarni oshiring.

---

#### prettier {#mt-prettier}

- Maqsad: repozitoriyani joyida formatlash.
- Foydalanish: `make prettier`

#### prettier_check {#mt-prettier_check}

- Maqsad: formatlashni tekshirish (yozishsiz).
- Foydalanish: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Maqsad: `prettier` uchun taxallus.
- Foydalanish: `make prettier_write`

---

#### test {#mt-test}

- Maqsad: Prettier (yozish), ESLint, so‘ng Vitest (o‘rnatilgan bo‘lsa qamrov) ni ishga tushirish.
- Foydalanish: `make test`

#### test_i18n {#mt-test_i18n}

- Maqsad: qo‘shimcha satrlari va veb-sayt hujjatlari uchun i18n-ga yo‘naltirilgan testlar.
- Foydalanish: `make test_i18n`
- Ishga tushiriladi: `npm run test:i18n` va `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Maqsad: qo‘shimcha UI satrlarini EN dan boshqa lokalelarga tarjima qilish.
- Foydalanish: `make translation_app OPTS="--locales all|de,fr"`
- Eslatma: kalit tuzilmasi va placeholderlar saqlanadi; `translation_app.log` ga log yozadi. Skript ko‘rinishi: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Maqsad: veb-sayt hujjatlarini `website/docs/*.md` dan `website/i18n/<locale>/...` ga tarjima qilish.
- Afzal: `translate_web_docs_batch` (OpenAI Batch API)
  - Foydalanish (flaglar): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Merosdagi pozitsion hali ham qabul qilinadi: `OPTS="<doc|all> <lang|all>"`
- Xulq-atvor: JSONL tuzadi, yuklaydi, har 30 soniyada so‘raydi, natijalarni yuklab oladi, fayllarni yozadi.
- Eslatma: batch ishi yakunlanishi 24 soatgacha vaqt olishi mumkin (OpenAI batch oynasiga ko‘ra). Konsolda har bir so‘rovda o‘tgan vaqt ko‘rsatiladi.
- Muhit: `OPENAI_API_KEY` (majburiy), ixtiyoriy `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (sukut bo‘yicha 24 soat), `BATCH_POLL_INTERVAL_MS`.
- Meros: `translate_web_docs_sync`
  - Foydalanish (flaglar): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Merosdagi pozitsion hali ham qabul qilinadi: `OPTS="<doc|all> <lang|all>"`
- Xulq-atvor: har juftlik bo‘yicha sinxron so‘rovlar (batch agregatsiyasiz).
- Eslatma: `OPTS` ko‘rsatilmaganda interaktiv so‘rovlar. Har ikkala rejim kod bloklari/inline kodni saqlaydi va front‑matter dagi `id` ni o‘zgartirmaydi; loglar: `translation_web_batch.log` (batch) yoki `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Maqsad: veb-sayt UI satrlarini (bosh sahifa, navbar, footer) `website/i18n/en/code.json` dan `website/i18n/<locale>/code.json` ostidagi barcha lokalelarga tarjima qilish (`en` bundan mustasno).
- Foydalanish: `make translate_web_index` yoki `make translate_web_index OPTS="--locales de,fr [--force]"`
- Talablar: `OPENAI_API_KEY` ni eksport qiling (ixtiyoriy: `OPENAI_MODEL=gpt-4o-mini`).
- Xulq-atvor: JSON tuzilishini tekshiradi, jingalak qavsli placeholderlarni saqlaydi, URL’larni o‘zgartirmaydi va tasdiqlash xatolarida fikr-mulohaza bilan qayta urinadi.

---

#### web_build {#mt-web_build}

- Maqsad: hujjatlar saytini `website/build` ga qurish.
- Foydalanish: `make web_build OPTS="--locales en|de,en|all"` (yoki `BUILD_LOCALES="en de"` ni o‘rnating)
- Ichki ishlar: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Bog‘liqliklar: `website/node_modules/@docusaurus` yo‘q bo‘lsa, faqat `website/` ichida `npm ci` ni ishga tushiradi.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Maqsad: offline-xavfsiz havola tekshiruvi.
- Foydalanish: `make web_build_linkcheck OPTS="--locales en|all"`
- Eslatma: `tmp_linkcheck_web_pages` ga quradi; GH Pages `baseUrl` ni `/` ga qayta yozadi; masofaviy HTTP(S) havolalarni o‘tkazib yuboradi.

#### web_build_local_preview {#mt-web_build_local_preview}

- Maqsad: ixtiyoriy testlar/havola tekshiruvi bilan mahalliy gh‑pages preview.
- Foydalanish: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Xulq-atvor: avval Node preview serverini sinab ko‘radi (`scripts/preview-server.mjs`, `/__stop` ni qo‘llab-quvvatlaydi), `python3 -m http.server` ga qaytadi; 8080–8090 portlarda xizmat qiladi; PID: `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Maqsad: `website/build` ni `gh-pages` tarmog‘iga push qilish.
- Foydalanish: `make web_push_github`

Maslahat: Makefile foydalanadigan paket menejerini almashtirish uchun `NPM=…` ni o‘rnating (sukut bo‘yicha `npm`).

---
