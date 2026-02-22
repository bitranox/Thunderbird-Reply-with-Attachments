---
id: development
title: 'Զարգացում'
sidebar_label: 'Զարգացում'
---

---

## Զարգացման ուղեցույց {#development-guide}

:::note Խմբագրեք միայն անգլերենը; թարգմանությունները տարածվում են
Թարմացրեք փաստաթղթավորումը միայն `website/docs` (անգլերեն) ծառի տակ։ `website/i18n/<locale>/…` տակ գտնվող թարգմանությունները գեներացվում են և չպետք է ձեռքով խմբագրվեն։ Օգտագործեք թարգմանության առաջադրանքները (օր.՝ `make translate_web_docs_batch`)՝ տեղայնացված բովանդակությունը թարմացնելու համար։
:::

### Նախապայմաններ {#prerequisites}

- Node.js 22+ և npm (թեստավորված է Node 22-ով)
- Thunderbird 128 ESR կամ նոր (ձեռնարկային թեստավորման համար)

---

### Նախագծի կառուցվածք (բարձր մակարդակ) {#project-layout-high-level}

- Արմատ (Root). փաթեթավորման սկրիպտ `distribution_zip_packer.sh`, փաստաթղթեր, սքրինշոթներ
- `sources/`: հավելման հիմնական կոդը (background, options/popup UI, manifests, icons)
- `tests/`: Vitest փաթեթ
- `website/`: Docusaurus փաստաթղթեր (i18n `website/i18n/de/...` տակ)

---

### Տեղադրում և գործիքներ {#install-and-tooling}

- Տեղադրել արմատային կախյալությունները. `npm ci`
- Փաստաթղթեր (ըստ ցանկության). `cd website && npm ci`
- Հայտնաբերել թիրախները. `make help`

---

### Կենդանի զարգացում (web‑ext run) {#live-dev-web-ext}

- Արագ ցիկլ Firefox Desktop-ում (միայն UI smoke-թեստեր).
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Գործարկել Thunderbird-ում (նախընտրելի է MailExtensions-ի համար).
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Խորհուրդներ.
- Պահեք Thunderbird-ի Error Console-ը բաց (Tools → Developer Tools → Error Console)։
- MV3 event էջերը անգործության դեպքում կանգնեցվում են. կոդի փոփոխություններից հետո վերաբեռնեք հավելումը կամ թողեք web‑ext-ը՝ ինքնաբար վերաբեռնելու։
- Որոշ միայն-Firefox վարքեր տարբերվում են. միշտ հաստատեք Thunderbird-ում՝ API համարժեքության համար։
- Thunderbird-ի բինար ուղիներ (օրինակներ).
- Linux. `thunderbird` (օր.՝ `/usr/bin/thunderbird`)
- macOS. `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows. `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Պրոֆիլի մեկուսացում. Օգտագործեք առանձին Thunderbird պրոֆիլ զարգացումների համար՝ ձեր օրական միջավայրին չազդելու համար։

---

### Make թիրախներ (այբբենական) {#make-targets-alphabetical}

Makefile-ը ստանդարտացնում է ընդհանուր զարգացման հոսքերը։ Գործարկեք `make help` ցանկացած պահի՝ յուրաքանչյուր թիրախի մեկ տողի ամփոփագրի համար։

Խորհուրդ. `make` առանց թիրախի գործարկելը բացում է պարզ Whiptail մենյու՝ թիրախ ընտրելու համար։

| Թիրախ                                                    | Մի տողի նկարագրություն                                                                               |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Հեռացնել տեղային build/preview արտեֆակտները (tmp/, web-local-preview/, website/build/)։              |
| [`commit`](#mt-commit)                                   | Ֆորմատավորել, գործարկել թեստեր (ներառյալ i18n), թարմացնել changelog-ը, commit և push անել։           |
| [`eslint`](#mt-eslint)                                   | Գործարկել ESLint-ը flat config-ով (`npm run -s lint:eslint`)։                                        |
| [`help`](#mt-help)                                       | Ցուցադրել բոլոր թիրախները մեկ տողի փաստաթղթերով (տեսակավորված)։                                      |
| [`lint`](#mt-lint)                                       | web‑ext lint `sources/` վրա (ժամանակավոր manifest; անտեսում է ZIP-երը; ոչ մահացու)։                  |
| [`menu`](#mt-menu)                                       | Ինտերակտիվ մենյու՝ թիրախ և ըստ ցանկության արգումենտներ ընտրելու համար։                               |
| [`pack`](#mt-pack)                                       | Կառուցել ATN և LOCAL ZIP-եր (գործարկում է linter; կանչում է packer սկրիպտը)։                         |
| [`prettier`](#mt-prettier)                               | Ֆորմատավորել պահոցը տեղում (գրում է փոփոխությունները)։                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ստուգման ռեժիմում (առանց գրելու). ձախողում է, եթե պահանջվում է վերաֆորմատավորում։           |
| [`prettier_write`](#mt-prettier_write)                   | Այլանուն `prettier`-ի համար։                                                                         |
| [`test`](#mt-test)                                       | Prettier (գրել), ESLint, ապա Vitest (ծածկույթ՝ եթե կարգավորված է)։                                   |
| [`test_i18n`](#mt-test_i18n)                             | Միայն i18n թեստեր. հավելման placeholders/համապատասխանություն + կայքի համապատասխանություն։            |
| [`translate_app`](#mt-translation-app)                   | Այլանուն `translation_app`-ի համար։                                                                  |
| [`translation_app`](#mt-translation-app)                 | Թարգմանել հավելման UI տողերը `sources/_locales/en/messages.json`-ից։                                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | Թարգմանել կայքի փաստաթղթերը OpenAI Batch API-ով (նախընտրելի)։                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Թարգմանել կայքի փաստաթղթերը համաժամանակյա (ժառանգական, ոչ-batch)։                                    |
| [`translate_web_index`](#mt-translation_web_index)       | Այլանուն `translation_web_index`-ի համար։                                                            |
| [`translation_web_index`](#mt-translation_web_index)     | Թարգմանել գլխավոր էջի/վերնախագծի/տողատակի UI (`website/i18n/en/code.json → .../<lang>/code.json`)։   |
| [`web_build`](#mt-web_build)                             | Կառուցել փաստաթղթերը `website/build` (աջակցում է `--locales` / `BUILD_LOCALES`)։                     |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Անցանց-անվտանգ հղումների ստուգում (անտեսում է հեռավոր HTTP[S])։                                      |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Տեղային gh‑pages նախադիտում; ավտոմատ սպասարկում 8080–8090; ըստ ցանկության թեստեր/հղումների ստուգում։ |
| [`web_push_github`](#mt-web_push_github)                 | Push անել `website/build`-ը `gh-pages` ճյուղ։                                                        |

Սինտաքս ընտրանքների համար

- Օգտագործեք `make <command> OPTS="…"`՝ ընտրանքներ փոխանցելու համար (խորհուրդ է տրվում չակերտները)։ Ստորև բերված յուրաքանչյուր թիրախը ցույց է տալիս օգտագործման օրինակ։

--

-

#### Լոկալների հավաքման խորհուրդներ {#locale-build-tips}

- Կառուցել լոկալների ենթաբազմությունը. կարգավորեք `BUILD_LOCALES="en de"` կամ փոխանցեք `OPTS="--locales en,de"` web թիրախներին։
- Նախադիտել կոնկրետ locale. `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`։

---

### Կառուցել և փաթեթավորել {#build-and-package}

- Կառուցել ZIP-եր. `make pack`
- Ստեղծում է ATN և LOCAL ZIP-եր պահոցի արմատում (չխմբագրել արտեֆակտները ձեռքով)
- Խորհուրդ. փաթեթավորելուց առաջ թարմացրեք տարբերակը թե՛ `sources/manifest_ATN.json`-ում, թե՛ `sources/manifest_LOCAL.json`-ում
- Ձեռնարկային տեղադրում (dev). Thunderbird → Tools → Add‑ons and Themes → ատամնանիվ → Install Add‑on From File… → ընտրեք կառուցված ZIP-ը

---

### Թեստ {#test}

- Լիարժեք փաթեթ. `make test` (Vitest)
- Ծածկույթ (ըստ ցանկության).
- `npm i -D @vitest/coverage-v8`
- Գործարկեք `make test`; բացեք `coverage/index.html`՝ HTML հաշվետվության համար
- Միայն i18n. `make test_i18n` (UI բանալիներ/placeholders/վերնագրեր + կայք՝ յուրաքանչյուր locale/յուրաքանչյուր փաստաթուղթ համապատասխանություն id/title/sidebar_label ստուգումներով)

---

### Վրիպազերծում և լոգեր {#debugging-and-logs}

- Error Console. Tools → Developer Tools → Error Console
- Փոխարկել մանրամասն լոգերը գործարկման ընթացքում.
- Միացնել. `messenger.storage.local.set({ debug: true })`
- Անջատել. `messenger.storage.local.set({ debug: false })`
- Լոգերը երևում են պատասխանի կազմման/ուղարկման ընթացքում

---

### Փաստաթղթեր (կայք) {#docs-website}

- Զարգացման սերվեր. `cd website && npm run start`
- Կառուցել ստատիկ կայք. `cd website && npm run build`
- Make-ի համարժեքներ (այբբենական). `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Օգտագործման օրինակներ.
- Միայն EN, բաց թողնել թեստերը/հղումների ստուգումը, առանց push. `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Բոլոր locale-ները, թեստերով/հղումների ստուգմամբ, ապա push. `make web_build_local_preview && make web_push_github`
- Հրատարակելուց առաջ գործարկեք անցանց-անվտանգ հղումների ստուգումը. `make web_build_linkcheck`։
- i18n. Անգլերենը գտնվում է `website/docs/*.md`-ում; գերմաներեն թարգմանությունները՝ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`-ում
- Որոնում. Եթե Algolia DocSearch շրջ. փոփոխականները կարգավորված են CI-ում (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), կայքը օգտագործում է Algolia որոնում, հակառակ դեպքում՝ տեղային որոնում։ Գլխավոր էջում սեղմեք `/` կամ `Ctrl+K`՝ որոնման դաշտը բացելու համար։

---

#### Նվիրատվության վերաուղղման երթուղի {#donate-redirect}

- `website/src/pages/donate.js`
- Երթուղի. `/donate` (և `/<locale>/donate`)
- Վարքագիծ.
- Եթե ընթացիկ երթուղին ունի locale (օր.՝ `/de/donate`), օգտագործել այն
- Հակառակ դեպքում ընտրել լավագույն համընկնումը `navigator.languages`-ից համեմատած կարգավորված լոկալների հետ; վերադարձ՝ լռելյան locale
- Վերաուղղում.
- `en` → `/docs/donation`
- մնացածը → `/<locale>/docs/donation`
- Օգտագործում է `useBaseUrl`՝ baseUrl-ի ճիշտ մշակման համար
- Ներառում է meta refresh + `noscript` հղում՝ որպես վերապահ միջոց

---

---

#### Նախադիտման խորհուրդներ {#preview-tips}

- Կանգնեցրեք Node նախադիտումը մաքուր. բացեք `http://localhost:<port>/__stop` (տպվում է `Local server started`-ից հետո)։
- Եթե պատկերները չեն բեռնվում MDX/JSX-ում, օգտագործեք `useBaseUrl('/img/...')`՝ կայքի `baseUrl`-ը պահպանելու համար։
- Նախադիտումը սկսվում է առաջինը, հետո գործարկվում է հղումների ստուգումը և դա արգելափակող չէ (կոտրված արտաքին հղումները չեն կանգնեցնի նախադիտումը)։
- Նախադիտման URL-ի օրինակ. `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (տպվում է “Local server started”-ից հետո)։
- Արտաքին հղումներ հղումների ստուգման ժամանակ. Որոշ արտաքին կայքեր (օր.՝ addons.thunderbird.net) արգելափակում են ավտոմատ սկաներներին և կարող են ցույց տալ 403 հղումների ստուգման ժամանակ։ Նախադիտումը միևնույն է կմեկնարկի. սա անվտանգ է անտեսելու համար։

---

#### Թարգմանել կայքը {#translate-website}

Ինչ կարող եք թարգմանել

- Միայն կայքի UI. գլխավոր էջ, վերին նավարկում (navbar), տողատակ (footer) և այլ UI տողեր։ Փաստաթղթերի բովանդակությունը առայժմ մնում է միայն անգլերեն։

Որտեղ խմբագրել

- Խմբագրեք `website/i18n/<locale>/code.json` (որպես հղում օգտագործեք `en`)։ Պահեք `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` նման placeholders-ը անփոփոխ։

Ստեղծել կամ թարմացնել ֆայլերը

- Ստեղծել բացակայող stub-երը բոլոր լոկալների համար. `npm --prefix website run i18n:stubs`
- Վերագրել stub-երը անգլերենից (նոր տողեր ավելացնելուց հետո). `npm --prefix website run i18n:stubs:force`
- Այլընտրանք մեկ լոկալի համար. `npx --prefix website docusaurus write-translations --locale <locale>`

Թարգմանել գլխավոր էջի/navbar/footer UI տողերը (OpenAI)

- Սահմանել հավատարմագրերը մեկ անգամ (shell կամ .env).
- `export OPENAI_API_KEY=sk-...`
- Ըստ ցանկության. `export OPENAI_MODEL=gpt-4o-mini`
- Մեկանգամյա (բոլոր լոկալները, բաց թողնել en). `make translate_web_index`
- Սահմանափակել որոշակի լոկալներով. `make translate_web_index OPTS="--locales de,fr"`
- Վերագրել առկա արժեքները. `make translate_web_index OPTS="--force"`

Վավերացում և կրկնափորձեր

- Թարգմանության սկրիպտը վավերացնում է JSON-ի կառուցվածքը, պահպանում է ոլորակների մեջ գտնվող placeholders-ը և ապահովում, որ URL-երը չեն փոխվում։
- Վավերացման ձախողման դեպքում այն կրկին փորձում է՝ հետադարձ կապով մինչև 2 անգամ, նախքան առկա արժեքները պահելը։

Նախադիտել ձեր locale-ը

- Զարգացման սերվեր. `npm --prefix website run start`
- Այցելեք `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Ներկայացում

- Բացեք PR խմբագրված `code.json` ֆայլ(եր)ով։ Պահեք փոփոխությունները նպատակային և հնարավորության դեպքում ընդգրկեք արագ սքրինշոթ։

---

### Անվտանգության և կարգաբերման խորհուրդներ {#security-and-configuration-tips}

- Մի կատարեք commit `sources/manifest.json` (կառուցման ժամանակ ստեղծվում է ժամանակավորապես)
- Պահեք `browser_specific_settings.gecko.id` կայուն՝ թարմացման ալիքը պահպանելու համար

---

### Կարգավորումների պահպանություն {#settings-persistence}

- Պահեստավորում. Բոլոր օգտատիրոջ կարգավորումները պահվում են `storage.local`-ում և պահպանվում են հավելման թարմացումների ընթացքում։
- Տեղադրում. Լռելյայնները կիրառվում են միայն այն դեպքում, երբ բանալին խիստ բացակայում է (undefined)։
- Թարմացում. Միգրացիան լրացնում է միայն բացակայող բանալիները. առկա արժեքները երբեք չեն վերագրվում։
- Սքիմայի նշիչ. `settingsVersion` (ներկայում՝ `1`)։
- Բանալիներ և լռելյայններ.
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Կոդ. տե՛ս `sources/background.js` → `initializeOrMigrateSettings()` և `SCHEMA_VERSION`։

Զարգացման հոսք (նոր կարգավորում ավելացնելիս)

- Բարձրացրեք `SCHEMA_VERSION`-ը `sources/background.js`-ում։
- Ավելացրեք նոր բանալին + լռելյայնը `DEFAULTS` օբյեկտում՝ `initializeOrMigrateSettings()`-ում։
- Օգտագործեք "only-if-undefined" կանոնը լռելյայնների սերմանման ժամանակ. մի վերագրեք առկա արժեքները։
- Եթե կարգավորումը տեսանելի է օգտատիրոջ համար, ներառեք այն `sources/options.js`-ում և ավելացրեք տեղայնացված տողեր։
- Ավելացրեք/կարգավորեք թեստերը (տե՛ս `tests/background.settings.migration.test.js`)։

Ձեռնարկային թեստավորման խորհուրդներ

- Կերպարանավորեք (simulate) նոր տեղադրում. մաքրեք ընդլայնման տվյալների պանակը կամ մեկնարկեք նոր պրոֆիլով։
- Կերպարանավորեք թարմացում. `settingsVersion`-ը սահմանեք `0` `storage.local`-ում և վերաբեռնեք; հաստատեք, որ առկա արժեքները մնում են անփոփոխ, և միայն բացակայող բանալիներն են ավելացվում։

---

### Խնդիրների լուծում {#troubleshooting}

- Համոզվեք, որ Thunderbird-ը 128 ESR կամ ավելի նոր է
- Գործարկման խնդիրների համար օգտագործեք Error Console-ը
- Եթե պահպանված կարգավորումները կարծես թե չեն կիրառվում ճիշտ, վերագործարկեք Thunderbird-ը և կրկին փորձեք։ (Thunderbird-ը կարող է քեշավորել վիճակը սեանսների միջև; վերագործարկումը ապահովում է, որ նոր կարգավորումները բեռնվեն)։

---

### CI և ծածկույթ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) գործարկում է vitest՝ ծածկույթի շեմերով (85% տողեր/ֆունկցիաներ/ճյուղեր/հայտարարություններ)։ Եթե շեմերը չեն բավարարվում, աշխատանքի գործընթացը ձախողվում է։
- Աշխատանքային հոսքը վերբեռնում է `coverage-html` արտեֆակտ՝ HTML հաշվետվությամբ; ներբեռնեք այն run էջից (Actions → վերջին run → Artifacts)։

---

### Ներդրում {#contributing}

- Տե՛ս CONTRIBUTING.md ճյուղավորման/commit/PR ուղեցույցների համար
- Խորհուրդ. Ստեղծեք առանձին Thunderbird զարգացման պրոֆիլ թեստավորման համար, որպեսզի չազդի ձեր առօրյա պրոֆիլի վրա։

---

### Թարգմանություններ

- Մեծ «բոլորը → բոլորը» թարգմանական աշխատանքները կարող են լինել դանդաղ և թանկ։ Սկսեք ենթաբազմությունից (օր.՝ մի քանի փաստաթուղթ և 1–2 locale), վերանայեք արդյունքը, ապա ընդլայնեք։

---

- Կրկնափորձերի քաղաքականություն. թարգմանական առաջադրանքները API սխալների դեպքում կատարում են մինչև 3 կրկնափորձ՝ էքսպոնենցիալ հետհսկմամբ; տե՛ս `scripts/translate_web_docs_batch.js` և `scripts/translate_web_docs_sync.js`։

Փաստաթղթերի սքրինշոթներ

- Պահեք պատկերները `website/static/img/` տակ։
- Դրանց հղվեք MD/MDX-ում `useBaseUrl('/img/<filename>')`-ի միջոցով, որպեսզի ուղիները համապատասխանեն կայքի `baseUrl`-ին։
- `website/static/img/` տակ պատկերներ ավելացնելու կամ վերանվանելուց հետո, հաստատեք, որ բոլոր հղումները դեռ օգտագործում են `useBaseUrl('/img/…')` և արտապատկերվում են տեղային նախադիտման մեջ։
  Ֆավիկոններ

- Բազմաչափ `favicon.ico`-ը ավտոմատ գեներացվում է բոլոր build ուղիներում (Make + սկրիպտներ) `website/scripts/build-favicon.mjs`-ի միջոցով։
- Ձեռնարկային քայլ անհրաժեշտ չէ; բավական է թարմացնել `icon-*.png`-ը։
  Վերանայման խորհուրդ

- Թարգմանված փաստաթղթերում պահեք front‑matter `id`-ը անփոփոխ; թարգմանեք միայն `title` և `sidebar_label`-ը, երբ առկա են։

#### clean {#mt-clean}

- Նպատակ. հեռացնել տեղային build/preview արտեֆակտները։
- Օգտագործում. `make clean`
- Հեռացնում է (եթե առկա է).
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Նպատակ. ֆորմատավորել, թեստավորել, թարմացնել changelog-ը, կատարել commit և push։
- Օգտագործում. `make commit`
- Մանրամասն. գործարկում է Prettier (գրել), `make test`, `make test_i18n`; հավելում է changelog, երբ stage արված տարբերություններ կան; push է անում `origin/<branch>`։

---

#### eslint {#mt-eslint}

- Նպատակ. գործարկել ESLint-ը flat config-ով։
- Օգտագործում. `make eslint`

---

#### help {#mt-help}

- Նպատակ. ցուցադրել բոլոր թիրախները մեկ տողի փաստաթղթերով։
- Օգտագործում. `make help`

---

#### lint {#mt-lint}

- Նպատակ. lint անել MailExtension-ը `web-ext`-ով։
- Օգտագործում. `make lint`
- Նշումներ. ժամանակավոր պատճենում է `sources/manifest_LOCAL.json` → `sources/manifest.json`; անտեսում է կառուցված ZIP-երը; զգուշացումները չեն խափանում pipeline-ը։

---

#### menu {#mt-menu}

- Նպատակ. ինտերակտիվ մենյու՝ Make թիրախ և ըստ ցանկության արգումենտներ ընտրելու համար։
- Օգտագործում. գործարկել `make` առանց արգումենտների։
- Նշումներ. եթե `whiptail` հասանելի չէ, մենյուն անցնում է `make help`-ի։

---

#### pack {#mt-pack}

- Նպատակ. կառուցել ATN և LOCAL ZIP-եր (`lint`-ից կախված)։
- Օգտագործում. `make pack`
- Խորհուրդ. փաթեթավորելուց առաջ բարձրացրեք տարբերակները երկուսում էլ՝ `sources/manifest_*.json`։

---

#### prettier {#mt-prettier}

- Նպատակ. ֆորմատավորել պահոցը տեղում։
- Օգտագործում. `make prettier`

#### prettier_check {#mt-prettier_check}

- Նպատակ. ստուգել ֆորմատավորումը (առանց գրելու)։
- Օգտագործում. `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Նպատակ. այլանուն `prettier`-ի համար։
- Օգտագործում. `make prettier_write`

---

#### test {#mt-test}

- Նպատակ. գործարկել Prettier (գրել), ESLint, ապա Vitest (ծածկույթ՝ եթե տեղադրված է)։
- Օգտագործում. `make test`

#### test_i18n {#mt-test_i18n}

- Նպատակ. i18n-կենտրոնացված թեստեր հավելման տողերի և կայքի փաստաթղթերի համար։
- Օգտագործում. `make test_i18n`
- Գործարկում է. `npm run test:i18n` և `npm run -s test:website-i18n`։

---

#### translate_app / translation_app {#mt-translation-app}

- Նպատակ. թարգմանել հավելման UI տողերը EN-ից այլ լոկալների։
- Օգտագործում. `make translation_app OPTS="--locales all|de,fr"`
- Նշումներ. պահպանում է բանալիների կառուցվածքն ու placeholders-ը; լոգերը՝ `translation_app.log`։ Սկրիպտի ձևը. `node scripts/translate_app.js --locales …`։

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Նպատակ. թարգմանել կայքի փաստաթղթերը `website/docs/*.md`-ից `website/i18n/<locale>/...`։
- Նախընտրելի. `translate_web_docs_batch` (OpenAI Batch API)
  - Օգտագործում (դրոշակներ). `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ժառանգական դիքային պարամետրերը դեռ ընդունվում են. `OPTS="<doc|all> <lang|all>"`
- Վարքագիծ. կառուցում է JSONL, վերբեռնում, հարցում է ամեն 30վ, ներբեռնում արդյունքները, գրում ֆայլերը։
- Նշում. batch job-ը կարող է տևել մինչև 24 ժամ (ըստ OpenAI-ի batch պատուհանի)։ Կոնսոլը յուրաքանչյուր հարցման վրա ցուցադրում է անցած ժամանակը։
- Շրջ. փոփոխականներ. `OPENAI_API_KEY` (պարտադիր), ըստ ցանկության `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (լռելյայն՝ 24ժ), `BATCH_POLL_INTERVAL_MS`։
- Ժառանգական. `translate_web_docs_sync`
  - Օգտագործում (դրոշակներ). `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Ժառանգական դիքային պարամետրերը դեռ ընդունվում են. `OPTS="<doc|all> <lang|all>"`
- Վարքագիծ. համաժամանակյա հարցումներ յուրաքանչյուր զույգի համար (առանց batch-ի համախմբման)։
- Նշումներ. Ինտերակտիվ հուշումներ, երբ `OPTS` բաց է թողնված։ Երկու ռեժիմներն էլ պահպանում են code բլոկները/ինլայն կոդը և պահում են front‑matter `id`-ը անփոփոխ; լոգերը՝ `translation_web_batch.log` (batch) կամ `translation_web_sync.log` (sync)։

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Նպատակ. թարգմանել կայքի UI տողերը (գլխավոր էջ, navbar, footer) `website/i18n/en/code.json`-ից բոլոր լոկալների `website/i18n/<locale>/code.json` տակ (բացառությամբ `en`)։
- Օգտագործում. `make translate_web_index` կամ `make translate_web_index OPTS="--locales de,fr [--force]"`
- Պահանջներ. export `OPENAI_API_KEY` (ըստ ցանկության՝ `OPENAI_MODEL=gpt-4o-mini`)։
- Վարքագիծ. վավերացնում է JSON կառուցվածքը, պահպանում է ոլորակներում placeholders-ը, URLs-ը պահում է անփոփոխ և վավերացման սխալների դեպքում կրկին փորձում է հետադարձ կապով։

---

#### web_build {#mt-web_build}

- Նպատակ. կառուցել փաստաթղթային կայքը `website/build`։
- Օգտագործում. `make web_build OPTS="--locales en|de,en|all"` (կամ սահմանել `BUILD_LOCALES="en de"`)
- Ներքին մասեր. `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`։
- Կախելիներ. `npm ci`-ը գործարկվում է `website/`-ում, միայն եթե `website/node_modules/@docusaurus`-ը բացակայում է։

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Նպատակ. անցանց-անվտանգ հղումների ստուգում։
- Օգտագործում. `make web_build_linkcheck OPTS="--locales en|all"`
- Նշումներ. կառուցում է `tmp_linkcheck_web_pages`; վերագրում է GH Pages `baseUrl` → `/`; բաց է թողնում հեռավոր HTTP(S) հղումները։

#### web_build_local_preview {#mt-web_build_local_preview}

- Նպատակ. տեղային gh‑pages նախադիտում՝ ըստ ցանկության թեստերով/հղումների ստուգմամբ։
- Օգտագործում. `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Վարքագիծ. նախ փորձում է Node նախադիտման սերվերը (`scripts/preview-server.mjs`, աջակցում է `/__stop`), fallback `python3 -m http.server`; սպասարկում է 8080–8090; PID՝ `web-local-preview/.server.pid`։

#### web_push_github {#mt-web_push_github}

- Նպատակ. push անել `website/build`-ը `gh-pages` ճյուղ։
- Օգտագործում. `make web_push_github`

Խորհուրդ. սահմանեք `NPM=…`՝ փոխարինելու Makefile-ի կողմից օգտագործվող փաթեթների կառավարչին (լռելյայն՝ `npm`)։

---
