---
id: development
title: 'განვითარება'
sidebar_label: 'განვითარება'
---

---

## განვითარების გზამკვლევი {#development-guide}

:::note რედაქტირება მხოლოდ ინგლისურზე; თარგმანები გავრცელდება
განაახლეთ დოკუმენტაცია მხოლოდ `website/docs` (ინგლისური) ქვეშ. `website/i18n/<locale>/…` ქვეშ არსებული თარგმანები გენერირდება და ხელით არ უნდა შეცვალოთ. გამოიყენეთ თარგმნის ამოცანები ( напр., `make translate_web_docs_batch`) ლოკალიზებული კონტენტის განასახლებლად.
:::

### წინაპირობები {#prerequisites}

- Node.js 22+ და npm (შემოწმებულია Node 22-ით)
- Thunderbird 128 ESR ან უფრო ახალი (ხელით ტესტირებისთვის)

---

### პროექტის სტრუქტურა (მაღალი დონის) {#project-layout-high-level}

- Root: შეფუთვის სკრიპტი `distribution_zip_packer.sh`, დოკები, სქრინშოტები
- `sources/`: მთავარი ადონის კოდი (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus დოკები (i18n `website/i18n/de/...` ქვეშ)

---

### ინსტალაცია და ხელსაწყოები {#install-and-tooling}

- Root დამოკიდებულებების ინსტალაცია: `npm ci`
- დოკები (არასავალდებულო): `cd website && npm ci`
- სამიზნეების სია: `make help`

---

### ცოცხალი დეველოპმენტი (web‑ext run) {#live-dev-web-ext}

- სწრაფი ციკლი Firefox Desktop-ში (მხოლოდ UI smoke-ტესტები):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- გაშვება Thunderbird-ში (სასურველია MailExtension-ებისთვის):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- რჩევები:
- გქონდეთ Thunderbird-ის Error Console გახსნილი (Tools → Developer Tools → Error Console).
- MV3 event გვერდები უმოქმედობისას შეჩერებულია; კოდის ცვლილებების შემდეგ გადატვირთეთ ადონი, ან მიეცით web‑ext‑ს ავტომატური გადატვირთვა.
- ზოგიერთ Firefox‑მხოლოდ ქცევაში არის სხვაობები; ყოველთვის გადაამოწმეთ Thunderbird-ში API‑ს თანხვედრა.
- Thunderbird-ის ბინარული ბილიკები (მაგალითები):
- Linux: `thunderbird` (მაგ., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- პროფილის იზოლაცია: გამოიყენეთ ცალკე Thunderbird პროფილი დეველოპმენტისთვის, რათა არ იმოქმედოს თქვენს ყოველდღიურ გარემოზე.

---

### Make სამიზნეები (ანბანურად) {#make-targets-alphabetical}

Makefile ერთგვაროვნებს გავრცელებულ დეველოპერულ ნაკადებს. გაუშვით `make help` ნებისმიერ დროს თითოეული სამიზნის ერთსტრიქონიანი შეჯამებისთვის.

რჩევა: `make` სამიზნის გარეშე გახსნის მარტივ Whiptail მენიუს სამიზნის ასარჩევად.

| სამიზნე                                                  | ერთსტრიქონიანი აღწერა                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ლოკალური build/preview არტიფაქტების წაშლა (tmp/, web-local-preview/, website/build/).                         |
| [`commit`](#mt-commit)                                   | ფორმატირება, ტესტები (i18n-ს ჩათვლით), ჩანაწერების ჟურნალის განახლება, commit & push.                         |
| [`eslint`](#mt-eslint)                                   | ESLint-ის გაშვება flat კონფიგით (`npm run -s lint:eslint`).                                                   |
| [`help`](#mt-help)                                       | ყველა სამიზნის სია ერთსტრიქონიანი დოკებით (დალაგებული).                                                       |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/`-ზე (დროებითი manifest; ZIP-ებს უგულებელყოფს; არ არის ფატალური).                       |
| [`menu`](#mt-menu)                                       | ინტერაქტიული მენიუ სამიზნისა და არჩევითი არგუმენტების ასარჩევად.                                              |
| [`pack`](#mt-pack)                                       | ATN და LOCAL ZIP-ების აგება (უშვებს ლინტერს; იძახებს packer სკრიპტს).                                         |
| [`prettier`](#mt-prettier)                               | რეპოზიტორიის ადგილზე ფორმატირება (წერს ცვლილებებს).                                                           |
| [`prettier_check`](#mt-prettier_check)                   | Prettier შემოწმების რეჟიმში (ჩაწერის გარეშე); ჩავარდება, თუ რეფორმატირება საჭიროა.                            |
| [`prettier_write`](#mt-prettier_write)                   | ფსევდონიმი `prettier`-ისთვის.                                                                                 |
| [`test`](#mt-test)                                       | Prettier (ჩაწერით), ESLint, შემდეგ Vitest (გაფარვა თუ კონფიგურირებულია).                                      |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑მხოლოდ ტესტები: ადონის placeholder-ები/თანხვედრა + ვებსაიტის თანხვედრა.                                  |
| [`translate_app`](#mt-translation-app)                   | ფსევდონიმი `translation_app`-ისთვის.                                                                          |
| [`translation_app`](#mt-translation-app)                 | აპის UI სტრიქონების თარგმნა `sources/_locales/en/messages.json`-დან.                                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | ვებსაიტის დოკების თარგმნა OpenAI Batch API-ით (სასურველი).                                                    |
| [`translate_web_docs_sync`](#mt-translation-web)         | ვებსაიტის დოკების სინქრონული თარგმნა (ძველი, არაბაჩური).                                                      |
| [`translate_web_index`](#mt-translation_web_index)       | ფსევდონიმი `translation_web_index`-ისთვის.                                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | მთავარი გვერდის/ნავბარის/ფუტერის UI-ის თარგმნა (`website/i18n/en/code.json → .../<lang>/code.json`).          |
| [`web_build`](#mt-web_build)                             | დოკების აგება `website/build`-ში (უჭერს მხარს `--locales`/`BUILD_LOCALES`).                                   |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ოფლაინ‑სუფთა ბმულების შემოწმება (შორეულ HTTP[S]-ებს ტოვებს).                                                  |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ლოკალური gh‑pages წინასწარი ნახვა; ავტომატურად სერვი 8080–8090 პორტებზე; არჩევითი ტესტები/ბმულების შემოწმება. |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`-ის დაპუშვა `gh-pages` ბრাঞ্চზე.                                                               |

ოფციების სინტაქსი

- გამოიყენეთ `make <command> OPTS="…"` ოპციების გადასაცემად (სასურველია ბრჭყალები). ქვემოთ თითოეული სამიზნე აჩვენებს გამოყენების მაგალითს.

--

-

#### ლოკალების აგების რჩევები {#locale-build-tips}

- ლოკალების ნაწილის აგება: დააყენეთ `BUILD_LOCALES="en de"` ან გადაუგზავნეთ `OPTS="--locales en,de"` ვებ-სამიზნეებს.
- კონკრეტული ლოკალის წინასწარი ნახვა: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### აგება და პაკეტირება {#build-and-package}

- ZIP-ების აგება: `make pack`
- ქმნის ATN და LOCAL ZIP-ებს რეპოს root-ში (არტიფაქტები ხელით არ დაარედაქტიროთ)
- რჩევა: განაახლეთ ვერსია ორივეგან: `sources/manifest_ATN.json` და `sources/manifest_LOCAL.json`-ში, პაკეტირებამდე
- ხელით ინსტალაცია (dev): Thunderbird → Tools → Add‑ons and Themes → ბორბალი → Install Add‑on From File… → აირჩიეთ აგებული ZIP

---

### ტესტი {#test}

- სრული სეტი: `make test` (Vitest)
- დაფარვა (არასავალდებულო):
- `npm i -D @vitest/coverage-v8`
- გაუშვით `make test`; გახსენით `coverage/index.html` HTML ანგარიშისთვის
- მხოლოდ i18n: `make test_i18n` (UI გასაღებები/placeholder-ები/სათაურები + ვებსაიტის ლოკალ-და-დოკ თანხვედრა id/title/sidebar_label შემოწმებებით)

---

### დიაგნოსტიკა და ჟურნალები {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- გაშვებისას დეტალური ჟურნალების გადართვა:
- ჩართვა: `messenger.storage.local.set({ debug: true })`
- გამორთვა: `messenger.storage.local.set({ debug: false })`
- ჟურნალები ჩნდება პასუხების შედგენის/გაგზავნისას

---

### დოკები (ვებსაიტი) {#docs-website}

- Dev სერვერი: `cd website && npm run start`
- სტატიკური საიტის აგება: `cd website && npm run build`
- Make ეკვივალენტები (ანბანურად): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- გამოყენების მაგალითები:
- მხოლოდ EN, ტესტების/ბმულ-ჩექის გარეშე, push გარეშე: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ყველა ლოკალი, ტესტებით/ბმულ-ჩექით, შემდეგ push: `make web_build_local_preview && make web_push_github`
- გამოქვეყნებამდე, გაუშვით ოფლაინ‑სუფთა ბმულების შემოწმება: `make web_build_linkcheck`.
- i18n: ინგლისური ცხოვრობს `website/docs/*.md`-ში; გერმანული თარგმანები `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`-ში
- ძიება: თუ Algolia DocSearch გარემო ცვლადებია დაყენებული CI-ში (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), საიტი გამოიყენებს Algolia ძიებას; წინააღმდეგ შემთხვევაში გადადის ლოკალურ ძიებაზე. მთავარ გვერდზე, დააჭირეთ `/` ან `Ctrl+K` ძიების ველის გასახსნელად.

---

#### შემოწირულობის გადამისამართების მარშრუტი {#donate-redirect}

- `website/src/pages/donate.js`
- მარშრუტი: `/donate` (და `/<locale>/donate`)
- ქცევა:
- თუ მიმდინარე მარშრუტს აქვს ლოკალი ( напр., `/de/donate`), გამოიყენე იგი
- სხვა შემთხვევაში, აირჩიე საუკეთესო დამთხვევა `navigator.languages`-სა და კონფიგურირებულ ლოკალებს შორის; ნაგულისხმევ ლოკალზე დაბრუნება
- გადამისამართებები:
- `en` → `/docs/donation`
- სხვა → `/<locale>/docs/donation`
- იყენებს `useBaseUrl` სწორ baseUrl დამუშავებისთვის
- შეიცავს meta refresh-ს + `noscript` ბმულს სამარქაფოდ

---

---

#### წინასწარი ნახვის რჩევები {#preview-tips}

- Node-ის წინასწარი ნახვის სუფთად გაჩერება: გახსენით `http://localhost:<port>/__stop` (`Local server started`-ის დაბეჭდვის შემდეგ).
- თუ სურათები MDX/JSX-ში არ იტვირთება, გამოიყენეთ `useBaseUrl('/img/...')` საიტის `baseUrl`-ის პატივისცემისთვის.
- პრივიუ ჯერ იწყება; ბმულების შემოწმება შემდეგ ეშვება და არ ბლოკავს (გარე დაზიანებული ბმულები წინასწარ ნახვას არ შეაჩერებს).
- წინასწარი ნახვის URL-ის მაგალითი: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (იბეჭდება “Local server started”-ის შემდეგ).
- გარე ბმულები ბმულ-ჩექში: ზოგიერთ გარე საიტს ( напр., addons.thunderbird.net) ბლოკავს ავტომატიზებულ კრავლერებს და შეიძლება აჩვენოს 403 ბმულ-ჩექში. წინასწარი ნახვა მაინც იწყება; იგნორირება უსაფრთხოა.

---

#### ვებსაიტის თარგმნა {#translate-website}

რას შეგიძლიათ თარგმნოთ

- მხოლოდ ვებსაიტის UI: მთავარი გვერდი, ნავბარი, ფუტერი და სხვა UI სტრიქონები. დოკების შინაარსი ჯერჯერობით რჩება მხოლოდ ინგლისურად.

სად უნდა დაარედაქტიროთ

- შეასწორეთ `website/i18n/<locale>/code.json` (`en` გამოიყენეთ საყრდენად). შეინარჩუნეთ placeholders, როგორიცაა `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` უცვლელად.

ფაილების გენერაცია ან განახლება

- ნაკლული სტაბების შექმნა ყველა ლოკალისთვის: `npm --prefix website run i18n:stubs`
- სტაბების გადაწერა ინგლისურიდან (ახალი სტრიქონების დანერგვის შემდეგ): `npm --prefix website run i18n:stubs:force`
- ალტერნატიული გზა ერთი ლოკალისთვის: `npx --prefix website docusaurus write-translations --locale <locale>`

მთავარი/ნავბარი/ფუტერის UI სტრიქონების თარგმნა (OpenAI)

- დააყენეთ კრედენციალები ერთხელ (shell ან .env):
- `export OPENAI_API_KEY=sk-...`
- არასავალდებულო: `export OPENAI_MODEL=gpt-4o-mini`
- ერთჯერადი გაშვება (ყველა ლოკალი, en-ის გამოტოვებით): `make translate_web_index`
- შეზღუდვა კონკრეტულ ლოკალებზე: `make translate_web_index OPTS="--locales de,fr"`
- არსებული მნიშვნელობების გადაწერა: `make translate_web_index OPTS="--force"`

ვალიდაცია და ხელახალი მცდელობები

- თარგმნის სკრიპტი ამოწმებს JSON ფორმას, ინარჩუნებს მჭახე ფრჩხილების placeholders-ს და უზრუნველყოფს, რომ URL-ები უცვლელია.
- ვალიდაციის ჩავარდნისას, უკუკავშირით ცდილობს ხელახლა მაქსიმუმ 2-ჯერ, შემდეგ ინარჩუნებს არსებულ მნიშვნელობებს.

დაათვალიერეთ თქვენი ლოკალი

- Dev სერვერი: `npm --prefix website run start`
- ეწვიეთ `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

გაგზავნა

- გახსენით PR რედაქტირებული `code.json` ფაილ(ებ)ით. შეინარჩუნეთ ცვლილებები ფოკუსირებული და სურვილისამებრ დაურთეთ სწრაფი სქრინშოტი.

---

### უსაფრთხოებისა და კონფიგურაციის რჩევები {#security-and-configuration-tips}

- არ დააკომიტოთ `sources/manifest.json` (აგების მიერ დროებით იქმნება)
- შეინარჩუნეთ `browser_specific_settings.gecko.id` სტაბილურად, რათა განახლების არხი შენარჩუნდეს

---

### პარამეტრების შენარჩუნება {#settings-persistence}

- შენახვა: ყველა მომხმარებლის პარამეტრი ინახება `storage.local`-ში და ნარჩუნდება ადონის განახლებებზე.
- ინსტალაცია: ნაგულისხმები გამოიყენება მხოლოდ მაშინ, როცა გასაღები მკაცრად აკლია (undefined).
- განახლება: മიგრაცია ავსებს მხოლოდ ნაკლულ გასაღებებს; არსებული მნიშვნელობები არასოდეს იწერება ზედზე.
- სქემის მარკერი: `settingsVersion` (ამჟამად `1`).
- გასაღებები და ნაგულისხმები:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- კოდი: იხ. `sources/background.js` → `initializeOrMigrateSettings()` და `SCHEMA_VERSION`.

დევფლოუ (ახალი პარამეტრის დამატება)

- აიმაღლეთ `SCHEMA_VERSION` `sources/background.js`-ში.
- დაამატეთ ახალი გასაღები + ნაგულისხმები `DEFAULTS` ობიექტში (`initializeOrMigrateSettings()`-ში).
- ნაგულისხმების დათესვისას გამოიყენეთ „only-if-undefined“ წესი; არ გადაწეროთ არსებული მნიშვნელობები.
- თუ პარამეტრი მომხმარებლისთვის ხილვადია, ჩააერთეთ `sources/options.js`-ში და დაუმატეთ ლოკალიზებული სტრიქონები.
- დაამატეთ/შეასწორეთ ტესტები (იხილეთ `tests/background.settings.migration.test.js`).

ხელით ტესტირების რჩევები

- ახალი ინსტალაციის სიმულაცია: გაწმინდეთ გაფართოების მონაცემთა საქაღალდე ან დაიწყეთ ახალ პროფილით.
- განახლების სიმულაცია: დააყენეთ `settingsVersion` `0`-ზე `storage.local`-ში და ხელახლა ჩატვირთეთ; დაადასტურეთ, რომ არსებული მნიშვნელობები უცვლელი რჩება და მხოლოდ ნაკლული გასაღებები ემატება.

---

### პრობლემების მოგვარება {#troubleshooting}

- დარწმუნდით, რომ Thunderbird არის 128 ESR ან უფრო ახალი
- გამოიყენეთ Error Console გამართულობის პრობლემებისთვის
- თუ შენახული პარამეტრები თითქოს არ მოქმედებს სწორად, გადატვირთეთ Thunderbird და სცადეთ კვლავ. (Thunderbird შეიძლება ინახავდეს მდგომარეობას სესიებს შორის; გადატვირთვა უზრუნველყოფს პარამეტრების თავიდან ჩატვირთვას.)

---

### CI და დაფარვა {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) უშვებს vitest-ს დაფარვის ზღვრებით (85% სტრიქონები/ფუნქციები/ფილიალები/შემთხვევები). თუ ზღვრები ვერ შესრულდა, დავალება ჩავარდება.
- workflow ტვირთავს არტიფაქტს `coverage-html` HTML ანგარიშით; გადმოწერეთ ის გაშვების გვერდიდან (Actions → ბოლო გაშვება → Artifacts).

---

### წვლილის შეტანა {#contributing}

- იხილეთ CONTRIBUTING.md ბრენჩის/კომიტის/PR-ის სახელმძღვანელოებისთვის
- რჩევა: შექმენით ცალკე Thunderbird განვითარების პროფილი ტესტირებისთვის, რათა არ იმოქმედოს თქვენს ყოველდღიურ პროფილზე.

---

### თარგმანები

- დიდი „all → all“ თარგმნის ჯობლები შეიძლება იყოს ნელი და ძვირი. დაიწყეთ ქვეჯგუფით ( напр., რამდენიმე დოკი და 1–2 ლოკალი), გადახედეთ შედეგს, შემდეგ გააფართოვეთ.

---

- Retry პოლიტიკა: თარგმნის ჯობლები ასრულებს მაქსიმუმ 3 რეთაის ექსპონენციალური უკმართვით API შეცდომებზე; იხილეთ `scripts/translate_web_docs_batch.js` და `scripts/translate_web_docs_sync.js`.

დოკების სქრინშოტები

- შეინახეთ სურათები `website/static/img/` ქვეშ.
- მიუთითეთ ისინი MD/MDX-ში `useBaseUrl('/img/<filename>')` საშუალებით, რათა ბილიკები იმუშაოს საიტის `baseUrl`-თან.
- `website/static/img/` ქვეშ სურათების დამატების ან გადარქმევის შემდეგ, დაადასტურეთ, რომ ყველა მითითება კვლავ იყენებს `useBaseUrl('/img/…')`-ს და იხატება ლოკალურ პრივიუში.
  Favicons

- მრავალზომის `favicon.ico` ავტომატურად გენერირდება ყველა აგების ბილიკში (Make + სკრიპტები) `website/scripts/build-favicon.mjs` საშუალებით.
- ხელით ნაბიჯი საჭირო არ არის; საკმარისია `icon-*.png`-ის განახლება.
  გადახედვის რჩევა

- თარგმნილ დოკებში front‑matter `id` უცვლელად დატოვეთ; თარგმნეთ მხოლოდ `title` და `sidebar_label`, თუ არსებობს.

#### clean {#mt-clean}

- დანიშნულება: ლოკალური build/preview არტიფაქტების წაშლა.
- გამოყენება: `make clean`
- შლის (თუ არსებობს):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- დანიშნულება: ფორმატირება, ტესტირება, ცვლილებების ჟურნალის განახლება, commit და push.
- გამოყენება: `make commit`
- დეტალები: უშვებს Prettier-ს (ჩაწერით), `make test`, `make test_i18n`; ამატებს changelog-ს, როცა არის staged სხვაობები; push-ს აკეთებს `origin/<branch>`-ზე.

---

#### eslint {#mt-eslint}

- დანიშნულება: ESLint-ის გაშვება flat კონფიგით.
- გამოყენება: `make eslint`

---

#### help {#mt-help}

- დანიშნულება: ყველა სამიზნის სია ერთსტრიქონიანი დოკებით.
- გამოყენება: `make help`

---

#### lint {#mt-lint}

- დანიშნულება: MailExtension-ის lint `web-ext`-ით.
- გამოყენება: `make lint`
- შენიშვნები: დროებით აკოპირებს `sources/manifest_LOCAL.json` → `sources/manifest.json`; იგნორებს აგებულ ZIP-ებს; გაფრთხილებები პაიპლაინს არ აჩერებს.

---

#### menu {#mt-menu}

- დანიშნულება: ინტერაქტიული მენიუ Make სამიზნისა და არჩევითი არგუმენტების ასარჩევად.
- გამოყენება: გაუშვით `make` არგუმენტების გარეშე.
- შენიშვნები: თუ `whiptail` მიუწვდომელია, მენიუ გადადის `make help`-ზე.

---

#### pack {#mt-pack}

- დანიშნულება: ATN და LOCAL ZIP-ების აგება (`lint`-ზეა დამოკიდებული).
- გამოყენება: `make pack`
- რჩევა: ვერსიები ორივეგან აიმაღლეთ `sources/manifest_*.json`-ში, პაკეტირებამდე.

---

#### prettier {#mt-prettier}

- დანიშნულება: რეპოზიტორიის ადგილზე ფორმატირება.
- გამოყენება: `make prettier`

#### prettier_check {#mt-prettier_check}

- დანიშნულება: ფორმატირების გადამოწმება (ჩაწერის გარეშე).
- გამოყენება: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- დანიშნულება: ფსევდონიმი `prettier`-ისთვის.
- გამოყენება: `make prettier_write`

---

#### test {#mt-test}

- დანიშნულება: Prettier (ჩაწერით), ESLint, შემდეგ Vitest (თუ დაფარვა დაყენებულია).
- გამოყენება: `make test`

#### test_i18n {#mt-test_i18n}

- დანიშნულება: i18n‑ზე ფოკუსირებული ტესტები ადონის სტრიქონებისა და ვებსაიტის დოკებისთვის.
- გამოყენება: `make test_i18n`
- უშვებს: `npm run test:i18n` და `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- დანიშნულება: ადონის UI სტრიქონების თარგმნა EN-დან სხვა ლოკალებზე.
- გამოყენება: `make translation_app OPTS="--locales all|de,fr"`
- შენიშვნები: ინარჩუნებს გასაღებების სტრუქტურასა და placeholders-ს; ჟურნალდება `translation_app.log`-ში. სკრიპტის ფორმა: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- დანიშნულება: ვებსაიტის დოკების თარგმნა `website/docs/*.md`-დან `website/i18n/<locale>/...`-ში.
- სასურველი: `translate_web_docs_batch` (OpenAI Batch API)
  - გამოყენება (ალმები): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ძველი პოზიციური ფორმაც स्वीकार्य არის: `OPTS="<doc|all> <lang|all>"`
- ქცევა: აგებს JSONL-ს, ტვირთავს, ამოწმებს ყოველ 30 წმ-ზე, ქაჩავს შედეგებს, წერს ფაილებს.
- შენიშვნა: batch ჯობს დასრულებას შეიძლება დაჭირდეს 24 საათამდე (OpenAI-ს batch ფანჯრის მიხედვით). კონსოლი აჩვენებს გასულ დროს თითოეულ შემოწმებაზე.
- გარემო: `OPENAI_API_KEY` (საჭირო), არასავალდებულო `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ნაგულისხმევი 24სთ), `BATCH_POLL_INTERVAL_MS`.
- ძველი: `translate_web_docs_sync`
  - გამოყენება (ალმები): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - ძველი პოზიციური ფორმაც स्वीकार्य არის: `OPTS="<doc|all> <lang|all>"`
- ქცევა: სინქრონული მოთხოვნები თითოეული წყვილისთვის (batch აგრეგაციის გარეშე).
- შენიშვნები: ინტერაქტიული კითხვარები, როცა `OPTS` გამოტოვებულია. ორივე რეჟიმი ინარჩუნებს კოდის ბლოკებს/ინლაინ კოდს და ტოვებს front‑matter `id`-ს უცვლელს; ჟურნალდება `translation_web_batch.log`-ში (batch) ან `translation_web_sync.log`-ში (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- დანიშნულება: ვებსაიტის UI სტრიქონების (მთავარი, ნავბარი, ფუტერი) თარგმნა `website/i18n/en/code.json`-დან ყველა ლოკალზე `website/i18n/<locale>/code.json` ქვეშ (გარდა `en`-ისა).
- გამოყენება: `make translate_web_index` ან `make translate_web_index OPTS="--locales de,fr [--force]"`
- მოთხოვნები: ექსპორტი `OPENAI_API_KEY` (არასავალდებულო: `OPENAI_MODEL=gpt-4o-mini`).
- ქცევა: ამოწმებს JSON სტრუქტურას, ინარჩუნებს მჭახე ფრჩხილების placeholders-ს, ტოვებს URL-ებს უცვლელს და ვალიდაციის შეცდომებზე ცდილობს უკუკავშირით ხელახლა.

---

#### web_build {#mt-web_build}

- დანიშნულება: დოკების საიტის აგება `website/build`-ში.
- გამოყენება: `make web_build OPTS="--locales en|de,en|all"` (ან დააყენეთ `BUILD_LOCALES="en de"`)
- შიგთავსი: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- დამოკიდებულებები: უშვებს `npm ci`-ს `website/`-ში მხოლოდ მაშინ, თუ აკლია `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- დანიშნულება: ოფლაინ‑სუფთა ბმულების შემოწმება.
- გამოყენება: `make web_build_linkcheck OPTS="--locales en|all"`
- შენიშვნები: აგებს `tmp_linkcheck_web_pages`-ში; GH Pages `baseUrl`-ს გადაწერს `/`-ზე; შორეულ HTTP(S) ბმულებს ტოვებს.

#### web_build_local_preview {#mt-web_build_local_preview}

- დანიშნულება: ლოკალური gh‑pages წინასწარი ნახვა არჩევითი ტესტებით/ბმულ-ჩექით.
- გამოყენება: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ქცევა: ჯერ ცდილობს Node-ის პრივიუ სერვერს (`scripts/preview-server.mjs`, უჭერს მხარს `/__stop`), შემდეგ გადადის `python3 -m http.server`-ზე; სერვი 8080–8090 პორტებზე; PID მდებარეობს `web-local-preview/.server.pid`-ში.

#### web_push_github {#mt-web_push_github}

- დანიშნულება: `website/build`-ის დაპუშვა `gh-pages` ბრাঞ্চზე.
- გამოყენება: `make web_push_github`

რჩევა: დააყენეთ `NPM=…` Makefile-ში გამოყენებული პაკეტ მენეჯერის გადასაფარად (ნაგულისხმევია `npm`).
