---
id: development
title: 'Рушд'
sidebar_label: 'Рушд'
---

---

## Дастури рушд {#development-guide}

:::note Танҳо англисиро таҳрир кунед; тарҷумаҳо паҳн мешаванд
Ҳуҷҷатҳоро танҳо зери `website/docs` (англисӣ) нав кунед. Тарҷумаҳо зери `website/i18n/<locale>/…` тавлид мешаванд ва набояд дастӣ таҳрир шаванд. Барои навсозии мундариҷаи локалӣ аз вазифаҳои тарҷума (масалан, `make translate_web_docs_batch`) истифода баред.
:::

### Пешшартҳо {#prerequisites}

- Node.js 22+ ва npm (бо Node 22 санҷида шудааст)
- Thunderbird 128 ESR ё навтар (барои санҷиши дастӣ)

---

### Тартиби лоиҳа (сатҳи баланд) {#project-layout-high-level}

- Реша: скрипти бастабандӣ `distribution_zip_packer.sh`, ҳуҷҷатҳо, скриншотҳо
- `sources/`: коди асосии илова (background, UI-и options/popup, манифестҳо, иконҳо)
- `tests/`: маҷмӯаи Vitest
- `website/`: ҳуҷҷатҳои Docusaurus (бо i18n дар `website/i18n/de/...`)

---

### Насб ва абзорҳо {#install-and-tooling}

- Насби вобастагиҳои реша: `npm ci`
- Ҳуҷҷатҳо (ихтиёрӣ): `cd website && npm ci`
- Кашфи ҳадафҳо: `make help`

---

### Рушди зинда (web‑ext run) {#live-dev-web-ext}

- Давраи зуд дар Firefox Desktop (танҳо санҷишҳои оддии UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Иҷро дар Thunderbird (бартарӣ дорад барои MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Маслиҳатҳо:
- Консоли хатогии Thunderbird-ро кушода нигоҳ доред (Tools → Developer Tools → Error Console).
- Саҳифаҳои рӯйдодии MV3 ҳангоми бекорӣ мутаваққиф мешаванд; пас аз тағйири код иловоро дубора бор кунед, ё ба web‑ext иҷозат диҳед, ки худкор дубора бор кунад.
- Баъзе рафторҳои танҳо‑Firefox фарқ мекунанд; ҳамеша дар Thunderbird барои баробарии API тасдиқ кунед.
- Роҳҳои бинарии Thunderbird (мисолҳо):
- Linux: `thunderbird` (масалан, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Ҷудосозии профил: барои рушд аз профили ҷудогонаи Thunderbird истифода баред, то ба танзимоти ҳаррӯза таъсир нарасонед.

---

### Ҳадафҳои Make (бо алифбо) {#make-targets-alphabetical}

Makefile равандҳои умумии рушдро стандартӣ мекунад. Ҳар вақт `make help`‑ро иҷро кунед, то ҷамъбасти яксатрии ҳар як ҳадафро бинед.

Маслиҳат: иҷрои `make` бидуни ҳадаф менюи соддаи Whiptail-ро барои интихоб мекушояд.

| Ҳадаф                                                    | Тавсифи яксатра                                                                                      |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Ҳазфи артефактҳои маҳаллии сохт/пешнамоиш (tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | Форматкунӣ, иҷрои тестҳо (бо i18n), навсозии changelog, commit ва push.                              |
| [`eslint`](#mt-eslint)                                   | Иҷрои ESLint тавассути конфиги ҳамвор (`npm run -s lint:eslint`).                                    |
| [`help`](#mt-help)                                       | Рӯйхати ҳамаи ҳадафҳо бо ҳуҷҷатҳои яксатра (сортшуда).                                               |
| [`lint`](#mt-lint)                                       | web‑ext lint дар `sources/` (манифести муваққатӣ; ZIP-ҳоро нодида мегирад; ғайримарговар).           |
| [`menu`](#mt-menu)                                       | Менюи интерактивӣ барои интихоби ҳадаф ва аргументҳои ихтиёрӣ.                                       |
| [`pack`](#mt-pack)                                       | Сохтани ZIP-ҳои ATN ва LOCAL (linter-ро иҷро мекунад; скрипти бастабандиро фаро мехонад).            |
| [`prettier`](#mt-prettier)                               | Форматкунии репозиторӣ дар ҷой (тағйиротро менависад).                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier дар ҳолати санҷиш (бе навишт); агар бозформаткунӣ лозим бошад, ноком мешавад.               |
| [`prettier_write`](#mt-prettier_write)                   | Алиас барои `prettier`.                                                                              |
| [`test`](#mt-test)                                       | Prettier (навишт), ESLint, сипас Vitest (coverage агар танзим шуда бошад).                           |
| [`test_i18n`](#mt-test_i18n)                             | Танҳо тестҳои i18n: placeholder-ҳо/баробарӣ дар илова + баробарии вебсайт.                           |
| [`translate_app`](#mt-translation-app)                   | Алиас барои `translation_app`.                                                                       |
| [`translation_app`](#mt-translation-app)                 | Тарҷумаи сатрҳои UI-и барнома аз `sources/_locales/en/messages.json`.                                |
| [`translate_web_docs_batch`](#mt-translation-web)        | Тарҷумаи ҳуҷҷатҳои вебсайт тавассути OpenAI Batch API (авло).                                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | Тарҷумаи ҳуҷҷатҳои вебсайт синхронӣ (мерасӣ, бе‑batch).                                              |
| [`translate_web_index`](#mt-translation_web_index)       | Алиас барои `translation_web_index`.                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Тарҷумаи UI-и саҳифаи асосӣ/навбар/футер (`website/i18n/en/code.json → .../<lang>/code.json`).       |
| [`web_build`](#mt-web_build)                             | Сохтани ҳуҷҷатҳо ба `website/build` (дастгирии `--locales` / `BUILD_LOCALES`).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Санҷиши пайвандҳо барои офлайн (пайвандҳои дурдаст HTTP[S]-ро мегузарад).                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Пешнамоиши маҳаллии gh‑pages; худкор дар 8080–8090 хизмат мерасонад; тестҳо/санҷиши пайванд ихтиёрӣ. |
| [`web_push_github`](#mt-web_push_github)                 | Push `website/build` ба шохаи `gh-pages`.                                                            |

Синтаксис барои опсияҳо

- Барои додани опсияҳо аз `make <command> OPTS="…"` истифода баред (иқтибосҳо тавсия дода мешаванд). Ҳар як ҳадафи зер истифодаи намуна дорад.

--

-

#### Маслиҳатҳо барои сохтани локалҳо {#locale-build-tips}

- Сохтани зермаҷмӯи локалҳо: `BUILD_LOCALES="en de"`-ро танзим кунед ё `OPTS="--locales en,de"`-ро ба ҳадафҳои веб диҳед.
- Пешнамоиши локали мушаххас: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Сохт ва бастабандӣ {#build-and-package}

- Сохтани ZIP-ҳо: `make pack`
- ZIP-ҳои ATN ва LOCAL-ро дар решаи репо тавлид мекунад (артефактҳоро ба даст таҳрир накунед)
- Маслиҳат: пеш аз бастабандӣ версияро ҳам дар `sources/manifest_ATN.json` ва ҳам дар `sources/manifest_LOCAL.json` нав кунед
- Насби дастӣ (рушд): Thunderbird → Tools → Add‑ons and Themes → фишанг → Install Add‑on From File… → ZIP-и сохташударо интихоб кунед

---

### Санҷиш {#test}

- Маҷмӯи пурра: `make test` (Vitest)
- Пӯшиш (ихтиёрӣ):
- `npm i -D @vitest/coverage-v8`
- Иҷрои `make test`; `coverage/index.html`-ро барои гузориши HTML боз кунед
- Танҳо i18n: `make test_i18n` (калидҳои UI/placeholder/сарлавҳаҳо + баробарии вебсайт барои ҳар локал ва ҳар ҳуҷҷат бо санҷишҳои id/title/sidebar_label)

---

### Нуқсонёбӣ ва логҳо {#debugging-and-logs}

- Консоли хатогӣ: Tools → Developer Tools → Error Console
- Дар вақти иҷро логҳои муфассалро фаъол/ғайрифаъол кунед:
- Фаъол: `messenger.storage.local.set({ debug: true })`
- Ғайрифаъол: `messenger.storage.local.set({ debug: false })`
- Логҳо ҳангоми таҳия/фиристодани ҷавобҳо намоён мешаванд

---

### Ҳуҷҷатҳо (вебсайт) {#docs-website}

- Сервери рушдӣ: `cd website && npm run start`
- Сохтани сайти статикӣ: `cd website && npm run build`
- Мутобиқҳои Make (бо алифбо): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Намунаҳои истифода:
- Танҳо EN, гузар аз тестҳо/санҷиши пайванд, бе push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Ҳама локалҳо, бо тестҳо/санҷиши пайванд, баъд push: `make web_build_local_preview && make web_push_github`
- Пеш аз нашр, санҷиши пайвандҳои офлайн‑бехатарро иҷро кунед: `make web_build_linkcheck`.
- i18n: Англисӣ дар `website/docs/*.md`; тарҷумаҳои олмонӣ дар `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Ҷустуҷӯ: Агар тағйирёбандаҳои муҳити Algolia DocSearch дар CI насб шуда бошанд (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), сайт ҷустуҷӯи Algolia-ро истифода мебарад; дар акси ҳол ба ҷустуҷӯи маҳаллӣ бармегардад. Дар саҳифаи асосӣ, `/` ё `Ctrl+K`-ро пахш кунед, то қуттии ҷустуҷӯ кушода шавад.

---

#### Роҳи бозгардон барои хайрия {#donate-redirect}

- `website/src/pages/donate.js`
- Роҳ: `/donate` (ва `/<locale>/donate`)
- Рафтор:
- Агар роҳи ҷорӣ локал дошта бошад (масалан, `/de/donate`), ҳамонро истифода баред
- Дар акси ҳол, беҳтарин мувофиқро аз `navigator.languages` нисбат ба локалҳои танзимшуда интихоб кунед; ба локали пешфарз баргардед
- Бозгардон ба:
- `en` → `/docs/donation`
- дигарон → `/<locale>/docs/donation`
- Барои коркарди дурусти baseUrl аз `useBaseUrl` истифода мебарад
- meta refresh + пайванди `noscript`-ро ҳамчун эҳтиёт дар бар мегирад

---

---

#### Маслиҳатҳо барои пешнамоиш {#preview-tips}

- Пешнамоиши Node-ро ба таври пок қатъ кунед: `http://localhost:<port>/__stop`-ро кушоед (пас аз `Local server started` чоп мешавад).
- Агар тасвирҳо дар MDX/JSX бор нашаванд, аз `useBaseUrl('/img/...')` истифода баред, то `baseUrl`-и сайт риоя шавад.
- Аввал пешнамоиш оғоз меёбад; санҷиши пайванд баъдан иҷро шуда, бастанӣ нест (пайвандҳои берунаи вайрон пешнамоишро намеистанд).
- URL‑и намунавии пешнамоиш: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (пас аз “Local server started” чоп мешавад).
- Пайвандҳои беруна дар санҷиши пайванд: Баъзе сайтҳои беруна (масалан, addons.thunderbird.net) роботҳоро мебанданд ва метавонанд дар санҷишҳои пайванд 403 нишон диҳанд. Пешнамоиш ҳамоно оғоз мешавад; инҳоро метавонед нодида гиред.

---

#### Тарҷумаи вебсайт {#translate-website}

Чиро метавонед тарҷума кунед

- Танҳо UI‑и вебсайт: саҳифаи асосӣ, навбар, футер ва сатрҳои дигари UI. Мундариҷаи ҳуҷҷатҳо ҳоло танҳо ба англисӣ мемонад.

Куҷо таҳрир кардан

- `website/i18n/<locale>/code.json`-ро таҳрир кунед (`en`-ро ҳамчун истинод истифода баред). Placeholder‑ҳо мисли `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`-ро тағйир надиҳед.

Эҷод ё навсозии файлҳо

- Эҷоди stubs‑ҳои нопурра барои ҳамаи локалҳо: `npm --prefix website run i18n:stubs`
- Аз болои stubs аз англисӣ нависед (пас аз иловаи сатрҳои нав): `npm --prefix website run i18n:stubs:force`
- Алтернатива барои як локал: `npx --prefix website docusaurus write-translations --locale <locale>`

Тарҷумаи сатрҳои UI-и саҳифаи асосӣ/навбар/футер (OpenAI)

- Як бор эҷоди иттилооти дастрасӣ (дар shell ё .env):
- `export OPENAI_API_KEY=sk-...`
- Ихтиёрӣ: `export OPENAI_MODEL=gpt-4o-mini`
- Якҳарба (ҳама локалҳо, бе en): `make translate_web_index`
- Маҳдуд ба локалҳои мушаххас: `make translate_web_index OPTS="--locales de,fr"`
- Аз болои қиматҳои мавҷуда нависед: `make translate_web_index OPTS="--force"`

Санҷиш ва кӯшишҳои такрорӣ

- Скрипти тарҷума шакли JSON-ро месанҷад, placeholder‑ҳои қавсҳои ҷингиларо нигоҳ медорад ва мутмаин мешавад, ки URL‑ҳо тағйир намеёбанд.
- Ҳангоми нокомии санҷиш, то 2 бор бо фикру мулоҳизаҳо бозкӯшиш мекунад, сипас қиматҳои мавҷударо нигоҳ медорад.

Пешнамоиши локали худ

- Сервери рушдӣ: `npm --prefix website run start`
- Ба `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` ворид шавед

Пешниҳод

- Як PR бо файл(ҳо)-и `code.json`‑и таҳриршуда кушоед. Тағйиротро мухтасар нигоҳ доред ва ҳангоми имкон скриншоти зуд замима кунед.

---

### Маслиҳатҳои амният ва конфигуратсия {#security-and-configuration-tips}

- `sources/manifest.json`-ро commit накунед (аз ҷониби сохт муваққатан эҷод мешавад)
- Барои нигоҳ доштани канали навсозӣ `browser_specific_settings.gecko.id`-ро устувор нигоҳ доред

---

### Пойдории танзимот {#settings-persistence}

- Захира: Ҳамаи танзимоти корбар дар `storage.local` нигоҳ дошта мешаванд ва дар навсозиҳои илова пойдор мемонанд.
- Насб: Пешфарзҳо танҳо вақте истифода мешаванд, ки калид комилан намерасад (undefined).
- Навсозӣ: Мигратсия танҳо калидҳои нопурраро пур мекунад; қиматҳои мавҷуда ҳеҷ гоҳ аз нав навишта намешаванд.
- Нишондиҳандаи схема: `settingsVersion` (ҳоло `1`).
- Калидҳо ва пешфарзҳо:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Код: нигаред `sources/background.js` → `initializeOrMigrateSettings()` ва `SCHEMA_VERSION`.

Ҷараёни рушд (илова кардани танзими нав)

- `SCHEMA_VERSION`-ро дар `sources/background.js` баланд бардоред.
- Калиди нав + пешфарзро ба объекти `DEFAULTS` дар `initializeOrMigrateSettings()` илова кунед.
- Ҳангоми коштани пешфарзҳо қоидаи "танҳо‑агар‑undefined"‑ро истифода баред; қиматҳои мавҷударо аз нав нанависед.
- Агар танзим барои корбар намоён бошад, онро дар `sources/options.js` васл кунед ва сатрҳои локализатсияшударо илова кунед.
- Тестҳоро илова/дарҷ кунед (нигаред `tests/background.settings.migration.test.js`).

Маслиҳатҳои санҷиши дастӣ

- Насби навро тақлид кунед: директорияи додаҳои васеъшавиро тоза кунед ё бо профили нав оғоз намоед.
- Навсозиро тақлид кунед: `settingsVersion`-ро ба `0` дар `storage.local` гузоред ва аз нав бор кунед; тасдиқ кунед, ки қиматҳои мавҷуда тағйир наёфтаанд ва танҳо калидҳои нопурра илова мешаванд.

---

### Ислоҳи мушкилот {#troubleshooting}

- Итминон ҳосил кунед, ки Thunderbird 128 ESR ё навтар аст
- Барои мушкилоти вақти иҷро аз Консоли хатогӣ истифода баред
- Агар танзимоти захирашуда дуруст татбиқ нашуда метобанд, Thunderbird-ро бозоғоз кунед ва боз кӯшиш намоед. (Thunderbird метавонад ҳолатро байни ҷаласаҳо кэш кунад; бозоғозӣ кафолат медиҳад, ки танзимоти тару тоза бор мешаванд.)

---

### CI ва пӯшиш {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest‑ро бо остонҳои пӯшиш (85% хатҳо/функсияҳо/шохаҳо/ифодот) иҷро мекунад. Агар остонаҳо иҷро нашаванд, кор ноком мешавад.
- Ҷараён артефакти `coverage-html`-ро бо гузориши HTML бор мекунад; онро аз саҳифаи иҷро (Actions → охирин иҷро → Artifacts) зеркашӣ кунед.

---

### Ҳамкорӣ {#contributing}

- Барои қоидаҳои branch/commit/PR ба CONTRIBUTING.md нигаред
- Маслиҳат: барои санҷиш як профили ҷудогонаи рушдии Thunderbird эҷод кунед, то ба профили ҳаррӯза таъсир нарасонад.

---

### Тарҷумаҳо

- Иҷрои корҳои калонҳаҷми тарҷумаи “ҳама → ҳама” метавонад суст ва гарон шавад. Аз зермаҷмӯа оғоз кунед (масалан, чанд ҳуҷҷат ва 1–2 локал), натиҷаро баррасӣ кунед, сипас васеъ намоед.

---

- Сиёсати кӯшишҳои такрорӣ: корҳои тарҷума то 3 бозкӯшиш бо ақибнишинии экспоненсиалӣ ҳангоми хатогиҳои API анҷом медиҳанд; нигаред `scripts/translate_web_docs_batch.js` ва `scripts/translate_web_docs_sync.js`.

Скриншотҳо барои ҳуҷҷатҳо

- Тасвирҳоро дар зери `website/static/img/` нигоҳ доред.
- Онҳоро дар MD/MDX тавассути `useBaseUrl('/img/<filename>')` истинод кунед, то роҳҳо бо `baseUrl`‑и сайт кор кунанд.
- Пас аз илова ё иваз кардани номҳои тасвирҳо зери `website/static/img/`, тасдиқ кунед, ки ҳама истинодҳо ҳамоно `useBaseUrl('/img/…')`‑ро истифода мебаранд ва дар пешнамоиши маҳаллӣ намоиш меёбанд.
  Фавиконҳо

- Бисёр‑андозаи `favicon.ico` дар ҳамаи роҳҳои сохт (Make + scripts) тавассути `website/scripts/build-favicon.mjs` худкор тавлид мешавад.
- Қадами дастӣ лозим нест; `icon-*.png`‑ро навсозӣ кардан кофист.
  Маслиҳати баррасӣ

- Дар ҳуҷҷатҳои тарҷумашуда front‑matter‑и `id`‑ро тағйир надиҳед; танҳо `title` ва `sidebar_label`‑ро ҳангоми мавҷуд будан тарҷума кунед.

#### clean {#mt-clean}

- Мақсад: хориҷ кардани артефактҳои маҳаллии сохт/пешнамоиш.
- Истифода: `make clean`
- Хориҷ мекунад (агар мавҷуд бошад):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Мақсад: формат, тест, навсозии changelog, commit ва push.
- Истифода: `make commit`
- Тафсилот: Prettier (навишт), `make test`, `make test_i18n`‑ро иҷро мекунад; ҳангоми мавҷуд будани фарқиятҳои staged ба changelog зам мекунад; ба `origin/<branch>` push мекунад.

---

#### eslint {#mt-eslint}

- Мақсад: иҷрои ESLint тавассути конфиги ҳамвор.
- Истифода: `make eslint`

---

#### help {#mt-help}

- Мақсад: рӯйхати ҳамаи ҳадафҳо бо ҳуҷҷатҳои яксатра.
- Истифода: `make help`

---

#### lint {#mt-lint}

- Мақсад: lint барои MailExtension бо `web-ext`.
- Истифода: `make lint`
- Эзоҳҳо: `sources/manifest_LOCAL.json` → `sources/manifest.json` муваққан нусхабардорӣ мешавад; ZIP‑ҳои сохташуда нодида гирифта мешаванд; огоҳӣҳо конвейерро намешикананд.

---

#### menu {#mt-menu}

- Мақсад: менюи интерактивӣ барои интихоби ҳадафи Make ва аргументҳои ихтиёрӣ.
- Истифода: `make`‑ро бе аргументҳо иҷро кунед.
- Эзоҳҳо: агар `whiptail` дастрас набошад, меню ба `make help` мегузарад.

---

#### pack {#mt-pack}

- Мақсад: сохтани ZIP‑ҳои ATN ва LOCAL (вобаста ба `lint`).
- Истифода: `make pack`
- Маслиҳат: пеш аз бастабандӣ версияҳоро дар `sources/manifest_*.json` баланд бардоред.

---

#### prettier {#mt-prettier}

- Мақсад: формат кардани репо дар ҷой.
- Истифода: `make prettier`

#### prettier_check {#mt-prettier_check}

- Мақсад: тасдиқи формат (бе навишт).
- Истифода: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Мақсад: алиас барои `prettier`.
- Истифода: `make prettier_write`

---

#### test {#mt-test}

- Мақсад: Prettier (навишт), ESLint, баъдан Vitest (агар coverage насб шуда бошад).
- Истифода: `make test`

#### test_i18n {#mt-test_i18n}

- Мақсад: тестҳои тамаркузшуда ба i18n барои сатрҳои илова ва ҳуҷҷатҳои вебсайт.
- Истифода: `make test_i18n`
- Иҷро мекунад: `npm run test:i18n` ва `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Мақсад: тарҷумаи сатрҳои UI‑и илова аз EN ба локалҳои дигар.
- Истифода: `make translation_app OPTS="--locales all|de,fr"`
- Эзоҳҳо: сохтори калид ва placeholder‑ҳоро нигоҳ медорад; ба `translation_app.log` лог менависад. Намуди скрипт: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Мақсад: тарҷумаи ҳуҷҷатҳои вебсайт аз `website/docs/*.md` ба `website/i18n/<locale>/...`.
- Афзал: `translate_web_docs_batch` (OpenAI Batch API)
  - Истифода (парчамҳо): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Позиционалии меросӣ ҳамоно қабул мешавад: `OPTS="<doc|all> <lang|all>"`
- Рафтор: JSONL месозад, бор мекунад, ҳар 30с пурсиш мекунад, натиҷаҳоро зеркашӣ карда, файлҳоро менависад.
- Эзоҳ: кори batch метавонад то 24 соат тӯл кашад (барои равзанаи batch-и OpenAI). Консоль вақти гузаштаашро дар ҳар пурсиш нишон медиҳад.
- Env: `OPENAI_API_KEY` (лозим), ихтиёрӣ `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (пешфарз 24h), `BATCH_POLL_INTERVAL_MS`.
- Меросӣ: `translate_web_docs_sync`
  - Истифода (парчамҳо): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Позиционалии меросӣ ҳамоно қабул мешавад: `OPTS="<doc|all> <lang|all>"`
- Рафтор: дархостҳои синхронии ҷуфт‑ба‑ҷуфт (бе агрегатсияи batch).
- Эзоҳҳо: ҳангоми `OPTS` нододашуда, саволҳои интерактивӣ. Ҳар ду ҳолат блокҳои код/коди inline‑ро нигоҳ медоранд ва front‑matter‑и `id`-ро тағйир намедиҳанд; логҳо ба `translation_web_batch.log` (batch) ё `translation_web_sync.log` (sync) менависанд.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Мақсад: тарҷумаи сатрҳои UI‑и вебсайт (саҳифаи асосӣ, навбар, футер) аз `website/i18n/en/code.json` ба ҳамаи локалҳо зери `website/i18n/<locale>/code.json` (ба истиснои `en`).
- Истифода: `make translate_web_index` ё `make translate_web_index OPTS="--locales de,fr [--force]"`
- Талабот: export `OPENAI_API_KEY` (ихтиёрӣ: `OPENAI_MODEL=gpt-4o-mini`).
- Рафтор: сохтори JSON‑ро тасдиқ мекунад, placeholder‑ҳои қавсҳои ҷингиларо нигоҳ медорад, URL‑ҳоро тағйир намедиҳад ва дар ҳолати хатои санҷиш бо фикру мулоҳизаҳо бозкӯшиш мекунад.

---

#### web_build {#mt-web_build}

- Мақсад: сохтани сайти ҳуҷҷатҳо ба `website/build`.
- Истифода: `make web_build OPTS="--locales en|de,en|all"` (ё `BUILD_LOCALES="en de"`-ро танзим кунед)
- Дохилӣ: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Вобаста: `npm ci`-ро дар `website/` танҳо агар `website/node_modules/@docusaurus` набошад, иҷро мекунад.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Мақсад: санҷиши пайвандҳои офлайн‑бехатар.
- Истифода: `make web_build_linkcheck OPTS="--locales en|all"`
- Эзоҳҳо: ба `tmp_linkcheck_web_pages` месозад; `baseUrl`‑и GH Pages‑ро ба `/` менависад; пайвандҳои дурдасти HTTP(S)‑ро мегузарад.

#### web_build_local_preview {#mt-web_build_local_preview}

- Мақсад: пешнамоиши маҳаллии gh‑pages бо тестҳо/санҷиши пайванд ихтиёрӣ.
- Истифода: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Рафтор: аввал сервери пешнамоиши Node‑ро месанҷад (`scripts/preview-server.mjs`, `/__stop`‑ро дастгирӣ мекунад), сипас ба `python3 -m http.server` мегузарад; дар 8080–8090 хизмат мерасонад; PID дар `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Мақсад: push `website/build` ба шохаи `gh-pages`.
- Истифода: `make web_push_github`

Маслиҳат: `NPM=…`‑ро танзим кунед, то менеҷери бастаҳои истифодашуда аз тарафи Makefile‑ро бознависӣ кунед (пешфарз `npm`).
