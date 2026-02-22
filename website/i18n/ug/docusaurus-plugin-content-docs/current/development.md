---
id: development
title: 'تەرەققىيات'
sidebar_label: 'ئىشلەپ چىقىش'
---

---

## ئىشلەپ چىقىرىش قوللانمىسى {#development-guide}

:::note پەقەت ئىنگلىزچىنى تەھرىرلەڭ؛ تەرجىمىلەر ئاپتوماتىك تارقىلىدۇ
ھۆججەتلەردىكى ئۆزگەرتىشلەرنى پەقەت `website/docs` (ئىنگلىزچە) ئاستىدا قىلىڭ. `website/i18n/<locale>/…` ئاستىدىكى تەرجىمىلەر ئاپتوماتىك ھاسىل بولىدۇ، قولدا تەھرىرلەش كېرەك ئەمەس. يەرلىكلەشتۈرۈلگەن مەزمۇننى يېڭىلاش ئۈچۈن تەرجىمە ۋەزىپىلىرىنى ئىشلىتىڭ (مەسىلەن، `make translate_web_docs_batch`).
:::

### ئالدىنقى تەلەپ-شەرتلەر {#prerequisites}

- Node.js 22+ ۋە npm (Node 22 دا سىناق قىلىنغان)
- Thunderbird 128 ESR ياكى ئۇنىڭدىن يېڭىراق (قولدا سىناش ئۈچۈن)

---

### پروژە تۈزۈلمىسى (يۇقىرى دەرىجە) {#project-layout-high-level}

- غول مۇندەرىجە: ئوراش سكرىپتى `distribution_zip_packer.sh`, ھۆججەتلەر، سكرىنشوتلار
- `sources/`: ئاساسىي قوشۇلمىچىلىق كودى (ئارقا سەھىپە، تاللانمىلار/سەكرىگۈچى UI، مەنىفىستلار، سىنبەلگىلەر)
- `tests/`: Vitest توپلامى
- `website/`: Docusaurus ھۆججەتلىرى (`website/i18n/de/...` ئاستىدا i18n بىلەن)

---

### ئورنىتىش ۋە قوراللار {#install-and-tooling}

- غول مۇندەرىجەگە تۇتىدىغان بېقىنچىلىقلارنى ئورناتىڭ: `npm ci`
- ھۆججەت (تاللاشچان): `cd website && npm ci`
- نىشانلارنى بايقىڭ: `make help`

---

### تۇغرىدىن-تۇغرا ئىجادىيەت (web‑ext run) {#live-dev-web-ext}

- تېز دۇنيايى-دومىلىسىش Firefox Desktop تا (پەقەت UI دود سىنىقى):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird دا ئىجرا قىلىش (MailExtensions ئۈچۈن تەۋسىيە قىلىنىدۇ):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ياردەمچىلەر:
- Thunderbird نىڭ ئەخلەت خاتىرە تەكشۈرگۈچىسىنى ئېچىق تۇتۇڭ (Tools → Developer Tools → Error Console).
- MV3 ۋەقە بەتلىرى بوش ۋاقىتتا توختىتىلىدۇ؛ كود ئۆزگەرتكەندىن كېيىن قوشۇلمىنى قايتا يۈكلەڭ ياكى web‑ext نىڭ ئاپتوماتىك قايتا يۈكلەش ئىقتىدارىغا تايەنڭ.
- پەقەت Firefox قا خاس ھەرىكەتلەر پەرقلىنىشى مۇمكىن؛ Thunderbird دا دائىم تەستىقلاپ API ماسلىشىشىنى جەزملەشتۈرىڭ.
- Thunderbird ئىجراچان يوللىرى (مىساللار):
- Linux: `thunderbird` (مەسىلەن، `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- سىرداش پروفىل: روزگۈلۈك تەڭشەك مەھلىسىڭىزگە تەسىر كۆرسەتمەسلىكى ئۈچۈن لايىھىلەش ئۈچۈن ئايرىم Thunderbird پروفىلىنى ئىشلىتىڭ.

---

### Make نىشانلىرى (ئەلگورىتم ھەرپى بويىچە) {#make-targets-alphabetical}

Makefile ئادەتتىكى ئىجادىيەت ئىجرا يوللىرىنى بىرى خىللاشتۇرىدۇ. ھەر قەچان بولمىسۇن `make help` نى ئىجرا قىلىپ ھەر بىر نىشاننىڭ بىر قۇردىن ئىبارەت قىسقىچە چۈشەندۈرۈشىگە ئېرىشىڭ.

كۆرسەتمە: `make` نى نىشانسىز ئىجرا قىلسىڭىز، ئاددىي Whiptail تىزىملىكىنى ئېچىپ، بىر نىشاننى تاللاشقا ئىجازەت بېرىدۇ.

| نىشان                                                    | بىر قۇردا چۈشەندۈرۈش                                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | يەرلىك قۇرۇلما/پرىۋىۋ ئۆلچەملىرىنى ئۆچۈرۈش (tmp/, web-local-preview/, website/build/).                      |
| [`commit`](#mt-commit)                                   | فورماتلاش، سىناق ئىجرا قىلىش (i18n نىمۇ ئۆز ئىچىگە ئالىدۇ)، ئۆزگىرىشلەر خاتىرىسىنى يېڭىلاش، commit ۋە push. |
| [`eslint`](#mt-eslint)                                   | ESLint نى flat config ئارقىلىق ئىجرا قىلىش (`npm run -s lint:eslint`).                                      |
| [`help`](#mt-help)                                       | ھەممە نىشانلارنى بىر قۇردىن ئىبارەت ھۆججەت بىلەن (تەرتىپلەنگەن) تىزىش.                                      |
| [`lint`](#mt-lint)                                       | `sources/` ئۈستىدە web‑ext lint (ۋاقىتلىق manifest; ZIP لارنى پەس لىققا ئېلىش؛ كەسكۈن ئەمەس).               |
| [`menu`](#mt-menu)                                       | نىشان ۋە تاللاشچان پارامېتىر تاللاش ئۈچۈن ئۆز-ئارا تىزىملىك.                                                |
| [`pack`](#mt-pack)                                       | ATN ۋە LOCAL ZIP قۇرۇش (linter ئىجرا قىلىدۇ؛ packer سكرىپتىنى چاقىرىدۇ).                                    |
| [`prettier`](#mt-prettier)                               | مەنبە ساندۇقنى ئورنىدا فورماتلاش (ئۆزگىرىشلەرنى يېزىدۇ).                                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier نىڭ تەكشۈرۈش ھالىتى (يازمايدۇ)؛ قايتا فورماتلىشى كېرەك بولسا مەغلۇپ بولىدۇ.                        |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` نىڭ تەخەللۇسى.                                                                                   |
| [`test`](#mt-test)                                       | Prettier (write)، ESLint، ئاندىن Vitest (قاپلىنىش تەڭشەنسە).                                                |
| [`test_i18n`](#mt-test_i18n)                             | پەقەت i18n سىناقلىرى: قوشۇلمىچىلىق ئورۇن بەلگىلىرى/ماسلىشىش + تور بېكەت ماسلىشىشى.                          |
| [`translate_app`](#mt-translation-app)                   | `translation_app` نىڭ تەخەللۇسى.                                                                            |
| [`translation_app`](#mt-translation-app)                 | قوللىنىش پروگراممىسى UI تېكستلىرىنى `sources/_locales/en/messages.json` دىن تەرجىمە قىلىش.                  |
| [`translate_web_docs_batch`](#mt-translation-web)        | تور بېكەت ھۆججەتلىرىنى OpenAI Batch API ئارقىلىق تەرجىمە قىلىش (تەۋسىيە قىلىنىدۇ).                          |
| [`translate_web_docs_sync`](#mt-translation-web)         | تور بېكەت ھۆججەتلىرىنى قەدەمداش ھالەتتە تەرجىمە قىلىش (كونا، batch ئەمەس).                                  |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` نىڭ تەخەللۇسى.                                                                      |
| [`translation_web_index`](#mt-translation_web_index)     | باش بەت/نەۋىگاتسىيە/ئاستى بەت UI نى تەرجىمە قىلىش (`website/i18n/en/code.json → .../<lang>/code.json`).     |
| [`web_build`](#mt-web_build)                             | ھۆججەتلەرنى `website/build` كە قۇرۇش (`--locales` / `BUILD_LOCALES` قوللايدۇ).                              |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline-بىخەتەر ئۇلانما تەكشۈرۈش (يىراق HTTP[S] نى ئۆتكۈزۈپ كېتىدۇ).                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | يەرلىك gh‑pages پرىۋىۋسى؛ 8080–8090 دا ئاپتوماتىك مۇلازىمەت قىلىدۇ؛ تاللاشچان سىناق/ئۇلانما-تەكشۈرۈش.       |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` نى `gh-pages` تارمىقىغا يۆتكەش.                                                             |

تاللانمىلارنىڭ سىنتاكسى

- تاللانمىلارنى ھۆتكەشكە `make <command> OPTS="…"` نى ئىشلىتىڭ (قوش تىرناق ئىشلىتىش تەۋسىيە قىلىنىدۇ). تۆۋەندە ھەر بىر نىشاندا مىسال ئىشلەتكۈچىلىك كۆرسىتىلگەن.

--

-

#### Locale قۇرۇش ئەسكەرىتمىلىرى {#locale-build-tips}

- بەزىلا تىللارنى قۇرۇش: `BUILD_LOCALES="en de"` نى بەلگىلەڭ ياكى `OPTS="--locales en,de"` نى تور نىشانلىرىغا ئۆتكۈزۈڭ.
- مەخسۇس بىر تىلنى پرىۋىۋ قىلىش: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### قۇرۇش ۋە قاپلاش {#build-and-package}

- ZIP قۇرۇش: `make pack`
- Repo نىڭ غول مۇندەرىجىسىدە ATN ۋە LOCAL ZIP لار يېشىپ چىقىدۇ (ئۆلچەملەرنى قولدا تەھرىرلەمنىڭ)
- كۆرسەتمە: قاپلاشتىن بۇرۇن `sources/manifest_ATN.json` ۋە `sources/manifest_LOCAL.json` نىڭ ئىككىلىسىدىكى نەشرى نومۇرىنى يېڭىلاڭ
- قولدا ئورنىتىش (ئىجادىيەت): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → قۇرۇلغان ZIP نى تاللاڭ

---

### سىناق {#test}

- تولۇق توپلام: `make test` (Vitest)
- قاپلىنىش (تاللاشچان):
- `npm i -D @vitest/coverage-v8`
- `make test` نى ئىجرا قىلىڭ؛ HTML دوكلاتى ئۈچۈن `coverage/index.html` نى ئاچىڭ
- پەقەت i18n: `make test_i18n` (UI ئاچقۇچلىرى/ئورۇن بەلگىلىرى/ماۋزۇلىرى + تور بېكەتتىكى ھەر-تىل-ھەر-ھۆججەتكە ماسلىشىش، id/title/sidebar_label تەكشۈرۈشى بىلەن)

---

### سازلاش ۋە خاتىرىلەر {#debugging-and-logs}

- خاتالىق كونسولى: Tools → Developer Tools → Error Console
- ئىجرا ۋاقتىدا تەپسىلىي خاتىرىلەرنى ئالماشتۇرۇش:
- قوزغىتىش: `messenger.storage.local.set({ debug: true })`
- چەكلەش: `messenger.storage.local.set({ debug: false })`
- خاتىرىلەر جاۋاب يېزىش/ئۆتكۈزۈش جەريانىدا كۆرۈنىدۇ

---

### ھۆججەتلەر (تور بېكەت) {#docs-website}

- ئىجادىيەت مۇلازىمېتىرى: `cd website && npm run start`
- ستاتىك تور بېكەت قۇرۇش: `cd website && npm run build`
- Make تەڭداشلىرى (ئەلگورىتم ھەرپى بويىچە): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ئىشلەتلىك مىساللار:
- پەقەت EN، سىناق/ئۇلانما-تەكشۈرۈشسز، push يوق: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ھەممە تىل، سىناق/ئۇلانما-تەكشۈرۈش بىلەن، ئاندىن push: `make web_build_local_preview && make web_push_github`
- ئېلان قىلىشتىن بۇرۇن، offline-بىخەتەر ئۇلانما تەكشۈرۈشنى ئىجرا قىلىڭ: `make web_build_linkcheck`.
- i18n: ئىنگلىزچە `website/docs/*.md` دا؛ گېرمانچە تەرجىمىلەر `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` دا
- ئىزدەش: ئەگەر CI دا Algolia DocSearch مۇھىت ئۆزگەرگۈچىلەر بەلگىلەنگەن بولسا (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) تور بېكەت Algolia ئىزدەشنى ئىشلىتىدۇ؛ بولمىسا يەرلىك ئىزدەشكە قايتىدۇ. باش بەتتە `/` ياكى `Ctrl+K` بېسىپ ئىزدەش كۆزنەكىنى ئېچىڭ.

---

#### ئىئانە قايتا نىشانلاش يولى {#donate-redirect}

- `website/src/pages/donate.js`
- مارگروت: `/donate` (ۋە `/<locale>/donate`)
- ھەرىكەت:
- نۆۋەتتىكى مارگروتتا تىل بولسا (مەسىلەن، `/de/donate`)، شۇنى ئىشلەتسۇن
- بولمىسا، `navigator.languages` بىلەن سەپلىگەن تىللارنى سېلىشتۇرۇپ ئەڭ ياخشى ماسلىشىشنى تاللايدۇ؛ ئەڭ ئاخىرىدا كۆڭۈلدىكى تىلغا قايتىدۇ
- قايتا يۆتكەش نۇقتىسى:
- `en` → `/docs/donation`
- باشقىلار → `/<locale>/docs/donation`
- توغرا baseUrl بىر تەرەپ قىلىش ئۈچۈن `useBaseUrl` نى ئىشلىتىدۇ
- زاپاس ھالدا meta refresh + `noscript` ئۇلانمىسىنى ئۆز ئىچىگە ئالىدۇ

---

---

#### پرىۋىۋ ئەسكەرىتمىلىرى {#preview-tips}

- Node پرىۋىۋنى تېرىكچە توختىتىش: `http://localhost:<port>/__stop` نى ئاچىڭ (`Local server started` دىن كېيىن بېسىلغان).
- رەسىملەر MDX/JSX تا يۈكلىنمىسە، تور بېكەتنىڭ `baseUrl` نى ھۆرمەت قىلىشى ئۈچۈن `useBaseUrl('/img/...')` نى ئىشلىتىڭ.
- ئالدى بىلەن پرىۋىۋ باشلىنىدۇ؛ ئۇلانما تەكشۈرۈش ئاندىن ئىجرا بولىدۇ ھەمدە توسالغۇ بولمايدۇ (سىرتقى ئۇلانمىلار بۇزۇلغان بولسىمۇ پرىۋىۋ توختىمايدۇ).
- مىسال پرىۋىۋ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” دىن كېيىن بېسىلىدۇ).
- ئۇلانما-تەكشۈرۈشتە سىرتقى ئۇلانمىلار: بەزى سىرتقى تور بېكەتلەر (مەسىلەن، addons.thunderbird.net) ئاپتوماتىك كۈرگۈچىلەرنى چەكلەيدۇ، 403 قايتۇرۇشى مۇمكىن. پرىۋىۋ يەنىلا باشلىنىدۇ؛ بۇلارنى پەرۋا قىلمىسىڭىز بولىدۇ.

---

#### تور بېكەتنى تەرجىمە قىلىش {#translate-website}

نېمىلەرنى تەرجىمە قىلالايسىز

- پەقەت تور بېكەت UI: باش بەت، نەۋىگاتسىيە، ئاستى بەت ۋە باشقا UI تېكستلىرى. ھازىرچە ھۆججەت مەزمۇنى پەقەت ئىنگلىزچە بولىدۇ.

قەيەردە تەھرىرلەيدۇ

- `website/i18n/<locale>/code.json` نى تەھرىرلەڭ (`en` نى نەقىل قىلىڭ). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` قاتارلىق ئورۇن بەلگىلىرىنى ئۆزگەرتمەڭ.

ھۆججەتلەرنى ھاسىل قىلىش ياكى يېڭىلاش

- بار بولمىغان نۇسخا ھۆججەتلىرىنى ھەممە تىل ئۈچۈن قۇرۇش: `npm --prefix website run i18n:stubs`
- ئىنگلىزچىدىن نۇسخا ھۆججەتلىرىنى قايتا قۇرۇش (يېڭى تېكست قوشقاننىڭ ئارقىسىدىن): `npm --prefix website run i18n:stubs:force`
- يەككە بىر تىل ئۈچۈن ئالماشتۇرۇش: `npx --prefix website docusaurus write-translations --locale <locale>`

باش بەت/نەۋىگاتسىيە/ئاستى بەت UI تېكستلىرىنى تەرجىمە قىلىش (OpenAI)

- بىرلا قېتىم كىملىك ئۇچۇرىنى بەلگىلەڭ (shell ياكى .env):
- `export OPENAI_API_KEY=sk-...`
- تاللاشچان: `export OPENAI_MODEL=gpt-4o-mini`
- بىر قېتىملىق (بارلىق تىللار، en نى ئاتلايدۇ): `make translate_web_index`
- مەخسۇس تىللار بىلەن چەكلەش: `make translate_web_index OPTS="--locales de,fr"`
- مەۋجۇت قىممەتلەرنى قاپلىۋىتىش: `make translate_web_index OPTS="--force"`

دەلىللەش ۋە قايتا سىناش

- تەرجىمە سكرىپتى JSON شەكلىنى تەكشۈرىدۇ، كىرپىك قوش تېرىناقتىكى ئورۇن بەلگىلىرىنى ساقلايدۇ، ۋە URL لارنى ئۆزگەرتمەيدۇ.
- دەلىللەش مەغلۇپ بولسا، ئىككى قېتىمغىچە ئىنكاس بىلەن قايتا سىنايدۇ؛ ئاندىن مەۋجۇت قىممەتنى ساقلاپ قالىدۇ.

تىلىڭىزنى ئالدىن كۆرۈش

- ئىجادىيەت مۇلازىمېتىرى: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` گە بېرىڭ

تاپشۇرۇش

- تەھرىرلەنگەن `code.json` ھۆججەت(لىرى) بىلەن PR ئېچىڭ. ئۆزگىرىشلەرنى تەكچىل داۋام ئېتىڭ، بولسا قىسقا سكرىنشوت قوشۇڭ.

---

### بىخەتەرلىك ۋە سەپلەش ئەسكەرىتمىلىرى {#security-and-configuration-tips}

- `sources/manifest.json` نى commit قىلمىڭ (قۇرۇش جەريانىدا ۋاقىتلىق ھاسىل بولىدۇ)
- يېڭىلانما كانىلىنى ساقلاپ قېلىش ئۈچۈن `browser_specific_settings.gecko.id` نى مۇقىم تۇتۇڭ

---

### تەڭشەك تۇراقلىقى {#settings-persistence}

- ساقلاش: بارلىق ئىشلەتكۈچى تەڭشەكلىرى `storage.local` دا تۇرىدۇ ھەمدە قوشۇلمىچىلىق يېڭىلانمىسىدىن كېيىنمۇ ساقلىنىپ قالىدۇ.
- ئورنىتىش: كۆڭۈلدىكى قىممەتلەر پەقەت ئاچقۇچ چوقۇم مەۋجۇت بولمىسا (undefined) قوللىنىلىدۇ.
- يېڭىلاش: كەچۈرۈش پەقەت مەۋجۇت بولمىغان ئاچقۇچلارنى تولدۇرىدۇ؛ مەۋجۇت قىممەتلەر ھېچقانداق ئۈستىدىن يېزىلمايدۇ.
- Schema بەلگىسى: `settingsVersion` (نۆۋەتتە `1`).
- ئاچقۇچلار ۋە كۆڭۈلدىكى قىممەتلەر:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- كود: `sources/background.js` → `initializeOrMigrateSettings()` ۋە `SCHEMA_VERSION` نى كۆرۈڭ.

ئىجادىيەت يۈرۈشلۈكى (يېڭى تەڭشەك قوشۇش)

- `sources/background.js` دىكى `SCHEMA_VERSION` نىڭ نومۇرىنى ئۆستۈرۈڭ.
- يېڭى ئاچقۇچ + كۆڭۈلدىكى قىممەتنى `initializeOrMigrateSettings()` دىكى `DEFAULTS` ئوبيېكتىغا قوشۇڭ.
- كۆڭۈلدىكى قىممەتلىرىنى ئۇرۇشچان ئۇرغۇزغاندا “only-if-undefined” قائىدىسىگە ئەمەل قىلىڭ؛ مەۋجۇت قىممەتلەرنى ئۈستىدىن يېزىۋەتمەڭ.
- ئەگەر بۇ تەڭشەك ئىشلەتكۈچىگە كۆرۈنىدىغان بولسا، ئۇنى `sources/options.js` غا باغلاڭ ۋە يەرلىكلەشتۈرۈلگەن تېكست قوشۇڭ.
- سىناق قوشۇڭ/ماسلاشتۇرۇڭ (`tests/background.settings.migration.test.js` غا قاراڭ).

قولدا سىناش ئەسكەرىتمىلىرى

- يېڭىدىن ئورنىتىشنى سىمىلاتسىيە قىلىش: كېڭەيتىلمىنىڭ سانلىق-مەلۇمات مۇندەرىجىسىنى تازىلاڭ ياكى يېڭى پروفىلدا باشلاڭ.
- يېڭىلاشنى سىمىلاتسىيە قىلىش: `storage.local` دىكى `settingsVersion` نى `0` غا تەڭشەپ قايتا يۈكلەڭ؛ مەۋجۇت قىممەتلەر ئۆزگەرمەسلىكىنى ۋە پەقەت كەم ئاچقۇچلارنىڭلا قوشۇلغانلىقىنى جەزملەشتۈرۈڭ.

---

### كاشىلا ھەل قىلىش {#troubleshooting}

- Thunderbird نىڭ 128 ESR ياكى ئۇدىن يېڭىراق بولغانلىقىنى جەزملەشتۈرۈڭ
- ئىجرا ۋاقتىدىكى مەسىلىلەر ئۈچۈن خاتالىق كونسولىنى ئىشلىتىڭ
- ئەگەر ساقلانغان تەڭشەكلەر توغرا قوللىنىلمىغاندەك تۇيۇلۇشۇ بولسا، Thunderbird نى قايتا قوزغىتىڭ ۋە قايتا سىناڭ. (Thunderbird بىر قىسىم ھالىتىنى ئولتۇرۇشلار ئارىسىدا كاشىلىۋىلىشى مۇمكىن؛ قايتا قوزغىتىش يېڭى تەڭشەكلەرنى يۈكلەشنى جەزملەشتۈرىدۇ.)

---

### CI ۋە قاپلىنىش {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest نى قاپلىنىش بوسۇغىلىرى بىلەن ئىجرا قىلىدۇ (85% line/function/branch/statement). بوسۇغىلارغا يەتمىسە، خىزمەت مەغلۇپ بولىدۇ.
- بۇ يۈرۈشلۈك HTML دوكلاتى بار `coverage-html` دىگەن ئارتەفاكتنى يۈكلەيدۇ؛ ئۇنى ئىجرا بەتتىن چۈشۈرۈڭ (Actions → ئەڭ يېڭى ئىجرا → Artifacts).

---

### تۆھپە قوشۇش {#contributing}

- تارماق/commit/PR قائىدىسى ئۈچۈن CONTRIBUTING.md نى كۆرۈڭ
- كۆرسەتمە: روزگۈلۈك پروفىلىڭىزگە تەسىر كۆرسەتمەسلىكى ئۈچۈن سىناشقا ئايرىم Thunderbird ئىجادىيەت پروفىلى قۇرۇڭ.

---

### تەرجىمىلەر

- بىرلا قېتىمدا “ھەممە ھۆججەت → ھەممە تىل” ئىشلىرى ئاۋارىچىلىقلۇق ۋە ھەجىمنى كۆپ ئىگىلەيدۇ. ئالدى بىلەن تۆۋەندىكىدەك تار مايىللىق بىلەن باشلاڭ (مەسىلەن، بەزىلا ھۆججەت ۋە 1–2 تىل)، نەتىجىنى كۆرۈپ چىقىپ ئاندىن كېڭەيتىڭ.

---

- قايتا سىناش سىياسىتى: تەرجىمە خىزمەتلىرى API خاتالىقى كۆرۈلگەندە ئېكسپونېنتسىيەل تەرەققىياتچان كەينىگە سۈرۈش بىلەن 3 قېتىمغىچە قايتا سىنايدۇ؛ `scripts/translate_web_docs_batch.js` ۋە `scripts/translate_web_docs_sync.js` غا قاراڭ.

ھۆججەتلەر ئۈچۈن سكرىنشوتلار

- سۈرەتلەرنى `website/static/img/` ئاستىغا ساقلاڭ.
- ئۇلارنى MD/MDX تا `useBaseUrl('/img/<filename>')` ئارقىلىق نەقىل قىلىڭ، شۇنىڭ بىلەن يوللار تور بېكەتنىڭ `baseUrl` بىلەن ماس كېلىدۇ.
- `website/static/img/` ئاستىدا سۈرەتلەرنى قوشقان ياكى نامىنى ئۆزگەرتكەندىكىدىن كېيىن، بارلىق نەقىللەشتۈرۈشلەرنىڭ تەھلا `useBaseUrl('/img/…')` ئارقىلىق ئىشلەتكىنىگە ۋە يەرلىك پرىۋىۋدا توغرا كۆرۈنگىنىگە جەزم قىلىڭ.
  Favicon لارى

- كۆپ-چوڭلۇقتىكى `favicon.ico` ھەممە قۇرۇش يوللىرىدا (Make + سكرىپتلار) `website/scripts/build-favicon.mjs` ئارقىلىق ئاپتوماتىك ھاسىل قىلىنىدۇ.
- قولدا قەدەم زۆرۈر ئەمەس؛ `icon-*.png` نى يېڭىلاش يېتەرلىك.
  تەكشۈرۈش كۆرسەتمىسى

- تەرجىمە قىلىنغان ھۆججەتلەردە front‑matter دىكى `id` نى ئۆزگەرتمەڭ؛ بار بولغاندا پەقەت `title` ۋە `sidebar_label` نىلا تەرجىمە قىلىڭ.

#### clean {#mt-clean}

- مەقسىتى: يەرلىك قۇرۇلما/پرىۋىۋ ئۆلچەملىرىنى ئۆچۈرۈش.
- ئىشلىتىلىشى: `make clean`
- تۆۋەندىكىلەرنى ئۆچۈرىدۇ (بولسا):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- مەقسىتى: فورماتلاش، سىناق، ئۆزگىرىشلەر خاتىرىسىنى يېڭىلاش، commit ۋە push.
- ئىشلىتىلىشى: `make commit`
- تەپسىلات: Prettier (write)، `make test`, `make test_i18n` نى ئىجرا قىلىدۇ؛ سەھنەدە پەرقلەر بولغاندا ئۆزگىرىشلەر خاتىرىسىگە قوشۇمىز؛ `origin/<branch>` غا push قىلىدۇ.

---

#### eslint {#mt-eslint}

- مەقسىتى: ESLint نى flat config ئارقىلىق ئىجرا قىلىش.
- ئىشلىتىلىشى: `make eslint`

---

#### help {#mt-help}

- مەقسىتى: ھەممە نىشانلارنى بىر قۇردىن ئىبارەت چۈشەندۈرۈشلەر بىلەن تىزىش.
- ئىشلىتىلىشى: `make help`

---

#### lint {#mt-lint}

- مەقسىتى: `web-ext` نى ئىشلىتىپ MailExtension نى lint قىلىش.
- ئىشلىتىلىشى: `make lint`
- ئىزاھات: ۋاقىتلىق `sources/manifest_LOCAL.json` → `sources/manifest.json` كۆچۈرۈلىدۇ؛ قۇرۇلغان ZIP لارنى پەرۋا قىلمايدۇ؛ ئاگاھلاندۇرۇشلار پايىلاندىن مەغلۇپ قىلمايدۇ.

---

#### menu {#mt-menu}

- مەقسىتى: Make نىشانى ۋە تاللاشچان ئارگۇمېنت تاللاش ئۈچۈن ئۆز-ئارا تىزىملىك.
- ئىشلىتىلىشى: `make` نى ئارگۇمېنتسىز ئىجرا قىلىڭ.
- ئىزاھات: ئەگەر `whiptail` بولمىسا، تېزىملىك `make help` غا قايتىدۇ.

---

#### pack {#mt-pack}

- مەقسىتى: ATN ۋە LOCAL ZIP لارنى قۇرۇش (`lint` قا تايىنىدۇ).
- ئىشلىتىلىشى: `make pack`
- كۆرسەتمە: قاپلاشتىن بۇرۇن `sources/manifest_*.json` دىكى نەشرى نومۇرلىرىنى ئۆستۈرۈڭ.

---

#### prettier {#mt-prettier}

- مەقسىتى: Repo نى ئورنىدا فورماتلاش.
- ئىشلىتىلىشى: `make prettier`

#### prettier_check {#mt-prettier_check}

- مەقسىتى: فورماتنى تەكشۈرۈش (يازمايدۇ).
- ئىشلىتىلىشى: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- مەقسىتى: `prettier` نىڭ تەخەللۇسى.
- ئىشلىتىلىشى: `make prettier_write`

---

#### test {#mt-test}

- مەقسىتى: Prettier (write)، ESLint، ئاندىن Vitest (قورال قاچىلانغان بولسا قاپلىنىش بىلەن).
- ئىشلىتىلىشى: `make test`

#### test_i18n {#mt-test_i18n}

- مەقسىتى: قوشۇلمىچىلىق تېكستلىرى ۋە تور بېكەت ھۆججەتلىرى ئۈچۈن i18n مەركەزلەشتۈرۈلگەن سىناق.
- ئىشلىتىلىشى: `make test_i18n`
- ئىجرا قىلىنىدىغىنى: `npm run test:i18n` ۋە `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- مەقسىتى: قوشۇلمىچىلىق UI تېكستلىرىنى EN دىن باشقا تىللارغا تەرجىمە قىلىش.
- ئىشلىتىلىشى: `make translation_app OPTS="--locales all|de,fr"`
- ئىزاھات: ئاچقۇچ قۇرۇلۇشى ۋە ئورۇن بەلگىلىرىنى ساقلاپ قالىدۇ؛ `translation_app.log` قا خاتىرە يازىدۇ. سكرىپت شەكلى: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- مەقسىتى: تور بېكەت ھۆججەتلىرىنى `website/docs/*.md` دىن `website/i18n/<locale>/...` غا تەرجىمە قىلىش.
- تەۋسىيە قىلىنىدىغىنى: `translate_web_docs_batch` (OpenAI Batch API)
  - ئىشلىتىلىشى (بايراقلار): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - كونا ئورۇن تاللىغۇچ شەكلى تېخىمۇ قوبۇل قىلىنىدۇ: `OPTS="<doc|all> <lang|all>"`
- ھەرىكەت: JSONL قۇرۇش، يۈكلەش، ھەر 30 سېكۇنتتا تەكشۈرۈش، نەتىجىنى چۈشۈرۈش، ھۆججەتلەرنى يېزىش.
- ئىزاھات: بىر batch ۋەزىپىسى (OpenAI batch كۆزنەكىگە بىنائەن) 24 سائەتكە قەدەر ۋاقىت ئالغۇچى بولۇشى مۇمكىن. كونسول ھەر قايتا تەكشۈرگەن ساينىغان ۋاقىتنى كۆرسىتىدۇ.
- مۇھىت: `OPENAI_API_KEY` (زۆرۈر)، تاللاشچان `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (كۆڭۈلدىكى 24h), `BATCH_POLL_INTERVAL_MS`.
- كونا رېژىم: `translate_web_docs_sync`
  - ئىشلىتىلىشى (بايراقلار): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - كونا ئورۇن تاللىغۇچ شەكلى تېخىمۇ قوبۇل قىلىنىدۇ: `OPTS="<doc|all> <lang|all>"`
- ھەرىكەت: ھەر-جۇپ سۇرالغانغا قەدەمداش ئىقتىدار (batch توپلاش يوق).
- ئىزاھات: `OPTS` قويۇلمىغاندا ئۆز-ئارا سۇئال-جاۋاب. ئىككى خىل رېژىممۇ كود بۆلەكلەر/ئىچكى كودنى ساقلاپ قالىدۇ ۋە front‑matter دىكى `id` نى ئۆزگەرتمەيدۇ؛ `translation_web_batch.log` (batch) ياكى `translation_web_sync.log` (sync) قا خاتىرە يازىدۇ.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- مەقسىتى: تور بېكەت UI تېكستلىرىنى (باش بەت، نەۋىگاتسىيە، ئاستى بەت) `website/i18n/en/code.json` دىن `website/i18n/<locale>/code.json` ئاستىدىكى ھەممە تىلغا تەرجىمە قىلىش (`en` دىن باشقا).
- ئىشلىتىلىشى: `make translate_web_index` ياكى `make translate_web_index OPTS="--locales de,fr [--force]"`
- تەلەپ: `OPENAI_API_KEY` نى ئېكسپورت قىلىڭ (تاللاشچان: `OPENAI_MODEL=gpt-4o-mini`).
- ھەرىكەت: JSON قۇرۇلۇشىنى دەلىللەيدۇ، كىرپىك قوش تېرىناق ئورۇن بەلگىلىرىنى ساقلايدۇ، URL لارنى ئۆزگەرتمەيدۇ، دەلىللەش خاتالىقى بولسا ئىنكاس بىلەن قايتا سىنايدۇ.

---

#### web_build {#mt-web_build}

- مەقسىتى: ھۆججەت تور بېكىتىنى `website/build` كە قۇرۇش.
- ئىشلىتىلىشى: `make web_build OPTS="--locales en|de,en|all"` (ياكى `BUILD_LOCALES="en de"` نى بەلگىلەڭ)
- ئىچكى ئىشلىتىش: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- بېقىنچىلىق: `website/` دا پەقەت `website/node_modules/@docusaurus` يوق بولغاندا `npm ci` نى ئىجرا قىلىدۇ.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- مەقسىتى: offline-بىخەتەر ئۇلانما تەكشۈرۈش.
- ئىشلىتىلىشى: `make web_build_linkcheck OPTS="--locales en|all"`
- ئىزاھات: `tmp_linkcheck_web_pages` كە قۇرۇلىدۇ؛ GH Pages دىكى `baseUrl` نى `/` غا قايتا يېزىدۇ؛ يىراق HTTP(S) ئۇلانمىلارنى ئاتلاپ ئۆتىدۇ.

#### web_build_local_preview {#mt-web_build_local_preview}

- مەقسىتى: تاللاشچان سىناق/ئۇلانما-تەكشۈرۈش بىلەن يەرلىك gh‑pages پرىۋىۋسى.
- ئىشلىتىلىشى: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- ھەرىكەت: ئالدى بىلەن Node پرىۋىۋ مۇلازىمېتىرىنى سىنايدۇ (`scripts/preview-server.mjs`, `/__stop` قوللايدۇ)، بولمىسا `python3 -m http.server` كە قايتىدۇ؛ 8080–8090 دا مۇلازىمەت قىلىدۇ؛ PID `web-local-preview/.server.pid` دا.

#### web_push_github {#mt-web_push_github}

- مەقسىتى: `website/build` نى `gh-pages` تارمىقىغا يۆتكەش.
- ئىشلىتىلىشى: `make web_push_github`

كۆرسەتمە: Makefile ئىشلىتىدىغان بوغچا باشقۇرغۇچنى ئۇستۈن ئۆزگەرتىش ئۈچۈن `NPM=…` نى بەلگىلەڭ (كۆڭۈلدىكى `npm`).
