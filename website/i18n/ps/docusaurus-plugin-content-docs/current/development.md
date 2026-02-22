---
id: development
title: 'پراختیا'
sidebar_label: 'پراختیا'
---

---

## د پراختیا لارښود {#development-guide}

:::note یوازې انګلیسي سم کړئ؛ ژباړې خپرېږي
لاسوندونه یوازې د `website/docs` (انګلیسي) لاندې نوي کړئ. د `website/i18n/<locale>/…` لاندې ژباړې تولیدېږي او په لاسي ډول باید ونه سمول شي. د ژباړې دندو وکاروئ (لکه `make translate_web_docs_batch`) ترڅو ځايي شوې منځپانګه تازه کړئ.
:::

### مخکېنۍ اړتیاوې {#prerequisites}

- Node.js 22+ او npm (د Node 22 سره ازمویل شوی)
- Thunderbird 128 ESR یا نوی (د لاسي ازموینو لپاره)

---

### د پروژې جوړښت (لوړ کچه) {#project-layout-high-level}

- Root: د بسته‌بندۍ سکریپټ `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: د ایډ‑آن اصلي کوډ (background، د options/popup UI، manifests، icons)
- `tests/`: د Vitest مجموعه
- `website/`: د Docusaurus اسناد (د i18n سره د `website/i18n/de/...` لاندې)

---

### نصب او وسایل {#install-and-tooling}

- د Root انحصارونه نصب کړئ: `npm ci`
- Docs (اختیاري): `cd website && npm ci`
- هدفونه ومومئ: `make help`

---

### ژوندۍ پراختیا (web‑ext run) {#live-dev-web-ext}

- په Firefox Desktop کې چټک لوپ (یوازې د UI لوګي‑ټیسټونه):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- په Thunderbird کې وچلوئ (د MailExtensions لپاره غوره):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- سپارښتنې:
- د Thunderbird د Error Console پرانیستې وساتئ (Tools → Developer Tools → Error Console).
- د MV3 event مخونه د غیر فعال کېدو پر مهال ځنډېږي؛ د کوډ له بدلون وروسته ایډ‑آن بیا ولېږدوه، یا web‑ext ته پرېږدئ چې په اوتومات ډول بیا پورته کړي.
- ځینې یوازې‑Firefox چلندونه توپیر لري؛ د API موازي توب لپاره تل په Thunderbird کې تایید کړئ.
- د Thunderbird باینري لارې (بېلګې):
- Linux: `thunderbird` (لکه، `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- د پروفایل جلاوالی: د پرمختګ لپاره بېل Thunderbird پروفایل وکاروئ ترڅو ستاسو د ورځني ترتیباتو پر اغېز مخه ونیول شي.

---

### د Make هدفونه (الفبايي) {#make-targets-alphabetical}

Makefile عام پرمختیایي بهیرونه معیاري کوي. هر وخت `make help` وچلوئ ترڅو د هر هدف یو کرښه لنډیز وګورئ.

سپارښتنه: `make` بې له هدفه چلول یو ساده Whiptail مېنو پرانیزي ترڅو هدف وټاکئ.

| هدف                                                      | یو‑کرښه تشریح                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | ځايي د جوړونې/مخکتنې پاتې شوني لرې کول (tmp/, web-local-preview/, website/build/).         |
| [`commit`](#mt-commit)                                   | بڼه برابرول، ازموینې چلول (د i18n په شمول)، changelog نوي کول، commit او push.             |
| [`eslint`](#mt-eslint)                                   | ESLint د flat config له لارې چلول (`npm run -s lint:eslint`).                              |
| [`help`](#mt-help)                                       | ټول هدفونه د یو‑کرښې اسنادو سره لست کول (مرتب).                                            |
| [`lint`](#mt-lint)                                       | web‑ext lint په `sources/` کې (موقتي manifest؛ ZIPs سترګې پټوي؛ غیر‑مهلک).                 |
| [`menu`](#mt-menu)                                       | د هدف او اختیاري آرګومېنټونو د ټاکلو لپاره تعاملي مېنو.                                    |
| [`pack`](#mt-pack)                                       | د ATN او LOCAL ZIPs جوړول (linter چلوي؛ د packer سکریپټ غږوي).                             |
| [`prettier`](#mt-prettier)                               | رېپو په ځای کې بڼه برابرول (بدلونونه لیکي).                                                |
| [`prettier_check`](#mt-prettier_check)                   | Prettier د check حالت کې (لیک نه کوي)؛ که رېفورمټ ته اړتیا وي، پاتې راځي.                  |
| [`prettier_write`](#mt-prettier_write)                   | د `prettier` لپاره مستعار.                                                                 |
| [`test`](#mt-test)                                       | Prettier (لیک)، ESLint، بیا Vitest (که تنظیم شوی وي پوښښ).                                 |
| [`test_i18n`](#mt-test_i18n)                             | یوازې i18n ازموینې: د ایډ‑آن placeholders/parity + د وېب‌سایټ parity.                      |
| [`translate_app`](#mt-translation-app)                   | د `translation_app` لپاره مستعار.                                                          |
| [`translation_app`](#mt-translation-app)                 | د اپ UI تارونه له `sources/_locales/en/messages.json` څخه وژباړئ.                          |
| [`translate_web_docs_batch`](#mt-translation-web)        | د وېب‌سایټ اسناد د OpenAI Batch API له لارې وژباړئ (غوره).                                 |
| [`translate_web_docs_sync`](#mt-translation-web)         | د وېب‌سایټ اسناد هممهاله وژباړئ (پخوانی، non-batch).                                       |
| [`translate_web_index`](#mt-translation_web_index)       | د `translation_web_index` لپاره مستعار.                                                    |
| [`translation_web_index`](#mt-translation_web_index)     | د کورپاڼه/نویګیشن بار/فوټر UI وژباړئ (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | اسناد `website/build` ته جوړ کړئ (د `--locales` / `BUILD_LOCALES` ملاتړ).                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | آفلاین‑خوندي لینک چک (لرې HTTP[S] پرېږدي).                                                 |
| [`web_build_local_preview`](#mt-web_build_local_preview) | د gh‑pages ځايي مخکتنه؛ په 8080–8090 کې اوتومات خدمت؛ اختیاري ازموینې/لینک‑چک.             |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` د `gh-pages` څانګې ته push کړئ.                                            |

د انتخابونو نحو

- د اختیارونو د لېږد لپاره `make <command> OPTS="…"` وکاروئ (کېوټې سپارښتنه کېږي). لاندې هر هدف د کارونې بېلګه لري.

--

-

#### د ځايي ژبو د جوړولو لارښوونې {#locale-build-tips}

- د ځينو محدودو ژبو جوړول: `BUILD_LOCALES="en de"` وټاکئ یا د وېب هدفونو ته `OPTS="--locales en,de"` ورکړئ.
- ځانګړې ژبه مخکتنه: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### جوړول او بستې {#build-and-package}

- ZIPs جوړول: `make pack`
- په رېپو root کې ATN او LOCAL ZIPs تولیدوي (د لاسي سمون څخه ډډه وکړئ)
- سپارښتنه: د بسته کولو نه مخکې نسخه په دواړو `sources/manifest_ATN.json` او `sources/manifest_LOCAL.json` کې تازه کړئ
- لاسي نصب (پراختیا): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → جوړ شوی ZIP وټاکئ

---

### ازموینه {#test}

- بشپړه مجموعه: `make test` (Vitest)
- پوښښ (اختیاري):
- `npm i -D @vitest/coverage-v8`
- `make test` وچلوئ؛ د HTML راپور لپاره `coverage/index.html` پرانیزئ
- یوازې i18n: `make test_i18n` (د UI keys/placeholders/titles + د وېب‌سایټ پر‑ژبه پر‑لاسوند parity د id/title/sidebar_label چکونو سره)

---

### اشکال موندنه او لوګونه {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- په runtime کې پراخ لوګونه ټوګل کړئ:
- فعالول: `messenger.storage.local.set({ debug: true })`
- غیرفعالول: `messenger.storage.local.set({ debug: false })`
- لوګونه د پیغامونو د لیکلو/لېږلو پر مهال ښکاري

---

### Docs (وېب‌سایټ) {#docs-website}

- د پرمختیا سرور: `cd website && npm run start`
- جامد سایټ جوړول: `cd website && npm run build`
- د Make معادلونه (الفبايي): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- د کارونې بېلګې:
- یوازې EN، ازموینې/لینک‑چک مه چلوی، بې‌له push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ټولې ژبې، له ازموینو/لینک‑چک سره، بیا push: `make web_build_local_preview && make web_push_github`
- د خپرولو نه مخکې، آفلاین‑خوندي لینک چک وچلوئ: `make web_build_linkcheck`.
- i18n: انګلیسي د `website/docs/*.md` کې ده؛ د جرمن ژباړې په `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` کې
- لټون: که د Algolia DocSearch چاپیریالي متغیرونه په CI کې تنظیم وي (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`)، سایټ Algolia لټون کاروي؛ بل صورت کې ځايي لټون ته ځي. په کورپاڼه کې، `/` یا `Ctrl+K` کېکاږئ ترڅو د لټون بکس پرانیزئ.

---

#### د بسپنې د لېږد لاره {#donate-redirect}

- `website/src/pages/donate.js`
- لاره: `/donate` (او `/<locale>/donate`)
- چلند:
- که اوسنی مسیر ژبه ولري (لکه، `/de/donate`)، هماغه وکاروئ
- که نه، له `navigator.languages` او تنظیم شوو ژبو څخه غوره انډول وټاکئ؛ که ونه موندل شو، تلواله ژبه وکاروئ
- دې ته لېږدوي:
- `en` → `/docs/donation`
- نور → `/<locale>/docs/donation`
- د مناسب baseUrl لپاره `useBaseUrl` کاروي
- د بیک‌اپ په توګه meta refresh + `noscript` لینک لري

---

---

#### د مخکتنې سپارښتنې {#preview-tips}

- د Node مخکتنه پاکه ودروئ: `http://localhost:<port>/__stop` پرانیزئ (له `Local server started` وروسته چاپ کېږي).
- که انځورونه په MDX/JSX کې نه پورته کېږي، `useBaseUrl('/img/...')` وکاروئ ترڅو د سایټ `baseUrl` درناوی وشي.
- مخکتنه لومړی پیل کېږي؛ لینک چک وروسته چلېږي او بندوونکی نه دی (ماتې بهرني لینکونه مخکتنه نه دروي).
- د مخکتنې بېلګه URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (د “Local server started” وروسته چاپ کېږي).
- په لینک‑چک کې بهرني لینکونه: ځینې بهرني سایټونه (لکه، addons.thunderbird.net) اتومات کرالرونه بندوي او ښايي په لینک چک کې 403 وښيي. مخکتنه بیا هم پیل کېږي؛ دا خوندي دي چې سترګې پرې پټې شي.

---

#### وېب‌سایټ وژباړئ {#translate-website}

څه کولی شئ وژباړئ

- یوازې د وېب‌سایټ UI: کورپاڼه، نویګیشن بار، فوټر، او نور UI تارونه. د اسنادو منځپانګه تر اوسه یوازې انګلیسي پاتې کېږي.

چرته سمون وکړئ

- `website/i18n/<locale>/code.json` سم کړئ (`en` د مراجعې په توګه وکاروئ). داسې placeholders لکه `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` بدلون ورنکړئ.

د فایلونو جوړول یا تازه کول

- د ټولو ژبو لپاره ورکې stubs جوړ کړئ: `npm --prefix website run i18n:stubs`
- stubs له انګلیسي څخه بیا ولیکئ (وروسته له دې چې نوي تارونه زیات کړل): `npm --prefix website run i18n:stubs:force`
- بدیل د یوې یوازینۍ ژبې لپاره: `npx --prefix website docusaurus write-translations --locale <locale>`

د کورپاڼې/نویګیشن بار/فوټر UI تارونه وژباړئ (OpenAI)

- یو ځل کرېډنشلونه وټاکئ (shell یا .env):
- `export OPENAI_API_KEY=sk-...`
- اختیاري: `export OPENAI_MODEL=gpt-4o-mini`
- یو‑واری (ټولې ژبې، en پرېږدئ): `make translate_web_index`
- ځانګړو ژبو ته محدود کړئ: `make translate_web_index OPTS="--locales de,fr"`
- موجود ارزښتونه بیا ولیکئ: `make translate_web_index OPTS="--force"`

تصدیق او بیا هڅه

- د ژباړې سکریپټ د JSON جوړښت تفتیشوي، د curly‑brace placeholders ساتي، او ډاډمنوي چې URLs نه بدلېږي.
- د تصدیق په ناکامۍ کې، تر 2 ځلو پورې د فیډبک سره بیا هڅه کوي، بیا موجود ارزښتونه پرېږدي.

خپله ژبه مخکتنه کړئ

- د پرمختیا سرور: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` وګرځئ

سپارل

- د سم شوی `code.json` فایل(ونو) سره PR پرانیزئ. بدلونونه متمرکز وساتئ او که ممکن وي ژر اسکرین‌شاټ هم شامل کړئ.

---

### د امنیت او تنظیماتو سپارښتنې {#security-and-configuration-tips}

- `sources/manifest.json` مه commit کوئ (د جوړونې له خوا لنډمهاله جوړېږي)
- `browser_specific_settings.gecko.id` ثابت وساتئ ترڅو د اوسمهال چینل وساتل شي

---

### د ترتیباتو پایداري {#settings-persistence}

- زېرمه: د کاروونکي ټول ترتیبات په `storage.local` کې ساتل کېږي او د ایډ‑آن اوسمهالونو کې پاتې کېږي.
- نصب: تلوالي یوازې هغه وخت پلي کېږي چې کیلي په کلکه ورکه وي (undefined).
- اوسمهال: مهاجرت یوازې ورکې کیلي ډکوي؛ موجود ارزښتونه هېڅکله نه بیا لیکل کېږي.
- د سکېما نښه: `settingsVersion` (اوس مهال `1`).
- کیلي او تلوالي:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- کوډ: وګورئ `sources/background.js` → `initializeOrMigrateSettings()` او `SCHEMA_VERSION`.

د پراختیا بهیر (نوی ټاکنه زیاتول)

- `SCHEMA_VERSION` په `sources/background.js` کې زیات کړئ.
- نوې کیلي + تلواله د `DEFAULTS` آبجېکت کې په `initializeOrMigrateSettings()` کې اضافه کړئ.
- د تلوالو د تخم اچولو پر مهال د "only-if-undefined" قاعده وکاروئ؛ موجود ارزښتونه مه بیا لیکئ.
- که ټاکنه د کارونکي لپاره ښکاره وي، په `sources/options.js` کې یې وتړئ او ځايي شوي تارونه زیات کړئ.
- ازموینې اضافه/سمون کړئ (وګورئ `tests/background.settings.migration.test.js`).

د لاسي ازموینې سپارښتنې

- نوې نصب تقلید کړئ: د توسیع د معلوماتو فولډر پاک کړئ یا له نوي پروفایل سره پیل وکړئ.
- اوسمهال تقلید کړئ: `settingsVersion` د `0` ته په `storage.local` کې وټاکئ او بیا پورته کړئ؛ تایید کړئ چې موجود ارزښتونه بدل نه شي او یوازې ورکې کیلي زیاتې شي.

---

### ستونزې حلول {#troubleshooting}

- ډاډ ترلاسه کړئ چې Thunderbird 128 ESR یا نوی دی
- د runtime ستونزو لپاره Error Console وکاروئ
- که زېرمه شوي ترتیبات په سمه توګه نه پلي کېدونکي ښکاري، Thunderbird بیا پيل کړئ او بیا هڅه وکړئ. (Thunderbird کېدای شي حالت د ناستو ترمنځ cache کړي؛ بیاپیل یقیني کوي چې نوې ترتیبات پورته شي.)

---

### CI او پوښښ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest د پوښښ حدونو سره چلوې (85% کرښې/کړنې/څانګې/بیانات). که حدونه پوره نه شي، دنده پاتې راځي.
- Workflow یو artifact `coverage-html` د HTML راپور سره پورته کوي؛ له run مخ څخه یې ښکته کړئ (Actions → وروستی run → Artifacts).

---

### ګډون کول {#contributing}

- د څانګې/commit/PR لارښود لپاره CONTRIBUTING.md وګورئ
- سپارښتنه: د ازموینو لپاره بېل Thunderbird پرمختیایي پروفایل جوړ کړئ ترڅو ستاسو په ورځني پروفایل اغېز ونه کړي.

---

### ژباړې

- لوړې “all → all” ژباړې دندې ورو او ګراني کېدای شي. له یوې برخې پیل کړئ (مثلاً څو اسناد او ۱–۲ ژبې)، پایله وڅېړئ، بیا پراخه یې کړئ.

---

- د بیا هڅې تګلاره: د ژباړې دندې د API تېروتنو پر مهال تر 3 ځلو پورې د اکسپونېنشل backoff سره بیا هڅه کوي؛ وګورئ `scripts/translate_web_docs_batch.js` او `scripts/translate_web_docs_sync.js`.

د اسنادو لپاره سکرین‌شاټونه

- انځورونه د `website/static/img/` لاندې وساتئ.
- په MD/MDX کې یې د `useBaseUrl('/img/<filename>')` له لارې راجع کړئ ترڅو لارې د سایټ له `baseUrl` سره کار وکړي.
- وروسته له دې چې انځورونه د `website/static/img/` لاندې زیات یا نومبدل شول، تایید کړئ چې ټولې راجع ګانې لا هم `useBaseUrl('/img/…')` کاروي او په ځايي مخکتنه کې رېنډر کېږي.
  Favicons

- څو‑کچ `favicon.ico` په ټولو جوړونې لارو (Make + scripts) کې په اوتومات ډول د `website/scripts/build-favicon.mjs` له لارې جوړېږي.
- کوم لاسي ګام ته اړتیا نشته؛ یوازې `icon-*.png` تازه کول بس دي.
  د کتنې مشوره

- د ژباړل شوو اسنادو په front‑matter کې `id` بدلون مه ورکوئ؛ یوازې `title` او `sidebar_label` وژباړئ که موجود وي.

#### clean {#mt-clean}

- موخه: ځايي د جوړونې/مخکتنې پاتې شوني لرې کول.
- کارونه: `make clean`
- لرې کوي (که موجود وي):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- موخه: بڼه برابرول، ازموینې، changelog تازه کول، commit او push.
- کارونه: `make commit`
- جزییات: Prettier (write)، `make test`, `make test_i18n` چلوي؛ کله چې staged diff وي changelog زیاتوي؛ `origin/<branch>` ته push کوي.

---

#### eslint {#mt-eslint}

- موخه: ESLint د flat config له لارې چلول.
- کارونه: `make eslint`

---

#### help {#mt-help}

- موخه: ټول هدفونه د یو‑کرښې اسنادو سره لست کول.
- کارونه: `make help`

---

#### lint {#mt-lint}

- موخه: MailExtension د `web-ext` په کارولو lint کول.
- کارونه: `make lint`
- یادښتونه: `sources/manifest_LOCAL.json` → `sources/manifest.json` موقتي‑کاپي کوي؛ جوړ شوي ZIPs سترګې پټوي؛ خبرتیاوې پایپلاین نه پاتې کوي.

---

#### menu {#mt-menu}

- موخه: د Make هدف او اختیاري آرګومېنټونو د ټاکلو تعاملي مېنو.
- کارونه: `make` بې له آرګومېنټونو وچلوئ.
- یادښتونه: که `whiptail` شتون ونه لري، مېنو `make help` ته راښکته کېږي.

---

#### pack {#mt-pack}

- موخه: د ATN او LOCAL ZIPs جوړول (په `lint` تکیه لري).
- کارونه: `make pack`
- سپارښتنه: د بسته کولو نه مخکې نسخې په دواړو `sources/manifest_*.json` کې زیاتې کړئ.

---

#### prettier {#mt-prettier}

- موخه: رېپو په ځای کې بڼه برابرول.
- کارونه: `make prettier`

#### prettier_check {#mt-prettier_check}

- موخه: د بڼې تصدیق (لیک نشته).
- کارونه: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- موخه: د `prettier` لپاره مستعار.
- کارونه: `make prettier_write`

---

#### test {#mt-test}

- موخه: Prettier (write)، ESLint، بیا Vitest (که نصب وي پوښښ).
- کارونه: `make test`

#### test_i18n {#mt-test_i18n}

- موخه: د i18n پر تمرکز ازموینې د ایډ‑آن تارونو او وېب‌سایټ اسنادو لپاره.
- کارونه: `make test_i18n`
- چلېږي: `npm run test:i18n` او `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- موخه: د ایډ‑آن UI تارونه له EN څخه نورو ژبو ته وژباړئ.
- کارونه: `make translation_app OPTS="--locales all|de,fr"`
- یادښتونه: د کیلي جوړښت او placeholders ساتي؛ `translation_app.log` ته لوګونه لیکي. د سکریپټ بڼه: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- موخه: د وېب‌سایټ اسناد له `website/docs/*.md` څخه `website/i18n/<locale>/...` ته وژباړئ.
- غوره: `translate_web_docs_batch` (OpenAI Batch API)
  - کارونه (بیرغونه): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - پخوانی positional لا هم منل کېږي: `OPTS="<doc|all> <lang|all>"`
- چلند: JSONL جوړوي، اپلوډ کوي، هر 30s پول کوي، پایلې ښکته کوي، فایلونه لیکي.
- یادونه: یوه batch دنده کېدای شي تر 24 ساعتونو وخت ونیسي (د OpenAI batch کړکۍ له مخې). کنسول په هر پول کې تېر شوی وخت ښيي.
- چاپیریال: `OPENAI_API_KEY` (اړین)، اختیاري `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (تلواله 24h), `BATCH_POLL_INTERVAL_MS`.
- پخوانی: `translate_web_docs_sync`
  - کارونه (بیرغونه): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - پخوانی positional لا هم منل کېږي: `OPTS="<doc|all> <lang|all>"`
- چلند: د هرې جوړې هممهاله غوښتنې (بې له batch راټولونې).
- یادښتونه: کله چې `OPTS` پرېښودل شي تعاملي پوښتنې کوي. دواړه حالتونه د کوډ بلاکونه/inline کوډ ساتي او د front‑matter `id` نه بدلوي؛ لوګونه `translation_web_batch.log` (batch) یا `translation_web_sync.log` (sync) ته لیکي.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- موخه: د وېب‌سایټ UI تارونه (کورپاڼه، نویګیشن بار، فوټر) له `website/i18n/en/code.json` څخه ټولو ژبو ته د `website/i18n/<locale>/code.json` لاندې وژباړئ (پرته له `en`).
- کارونه: `make translate_web_index` یا `make translate_web_index OPTS="--locales de,fr [--force]"`
- اړتیاوې: `OPENAI_API_KEY` صادر کړئ (اختیاري: `OPENAI_MODEL=gpt-4o-mini`).
- چلند: د JSON جوړښت تصدیقوي، د curly‑brace placeholders ساتي، URLs نه بدلوي، او د تصدیق په تېروتنو کې د فیډبک سره بیا هڅه کوي.

---

#### web_build {#mt-web_build}

- موخه: د اسنادو سایټ `website/build` ته جوړول.
- کارونه: `make web_build OPTS="--locales en|de,en|all"` (یا `BUILD_LOCALES="en de"` وټاکئ)
- داخلي: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- انحصارونه: `npm ci` په `website/` کې یوازې هغه وخت چلوي که `website/node_modules/@docusaurus` ورکه وي.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- موخه: آفلاین‑خوندي لینک چک.
- کارونه: `make web_build_linkcheck OPTS="--locales en|all"`
- یادښتونه: `tmp_linkcheck_web_pages` ته جوړوي؛ د GH Pages `baseUrl` `/` ته بیا لیکي؛ لرې HTTP(S) لینکونه پرېږدي.

#### web_build_local_preview {#mt-web_build_local_preview}

- موخه: د gh‑pages ځايي مخکتنه د اختیاري ازموینو/لینک‑چک سره.
- کارونه: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- چلند: لومړی د Node مخکتنې سرور هڅه کوي (`scripts/preview-server.mjs`, `/__stop` ملاتړ لري)، `python3 -m http.server` ته راښکته کېږي؛ په 8080–8090 کې خدمت کوي؛ PID په `web-local-preview/.server.pid` کې.

#### web_push_github {#mt-web_push_github}

- موخه: `website/build` د `gh-pages` څانګې ته push کول.
- کارونه: `make web_push_github`

سپارښتنه: `NPM=…` وټاکئ ترڅو هغه package manager اووررایډ کړئ چې Makefile کاروي (تلواله `npm`).
