---
id: development
title: 'ဖွံ့ဖြိုးတိုးတက်မှု'
sidebar_label: 'ဖွံ့ဖြိုးတိုးတက်မှု'
---

---

## ဖွံ့ဖြိုးရေး လမ်းညွှန် {#development-guide}

:::note အင်္ဂလိပ်ကိုသာ ပြင်ဆင်ပါ; ဘာသာပြန်ချက်များ အလိုအလျောက် ဖြန့်ချိမည်
စာရွက်တမ်းများကို `website/docs` (English) အောက်တွင်သာ အပ်ဒိတ်လုပ်ပါ။ `website/i18n/<locale>/…` အောက်ရှိ ဘာသာပြန်ချက်များသည် အလိုအလျောက် 생성ထားခြင်းဖြစ်ပြီး ကိုယ်တိုင် မပြင်ဆင်သင့်ပါ။ Localized content ကို ပြန်လည်အသစ်ဆောင်ရွက်ရန် ဘာသာပြန်လုပ်ဆောင်ခြင်း tasks (ဥပမာ `make translate_web_docs_batch`) များကို အသုံးပြုပါ။
:::

### ကြိုတင် လိုအပ်ချက်များ {#prerequisites}

- Node.js 22+ နှင့် npm (Node 22 ဖြင့် စမ်းသပ်ထားသည်)
- Thunderbird 128 ESR သို့မဟုတ် ထို့ထက်အသစ် (လက်ဖြင့် စမ်းသပ်ရန်)

---

### ပရောဂျက် ဖွဲ့စည်းပုံ (အထွေထွေ) {#project-layout-high-level}

- Root: packaging script `distribution_zip_packer.sh`, စာတမ်းများ, မျက်နှာပြင်ပုံများ
- `sources/`: အဓိက add-on code (background, options/popup UI, manifests, icons)
- `tests/`: Vitest စုံစမ်းမှု အစု
- `website/`: Docusaurus စာတမ်းများ (i18n ကို `website/i18n/de/...` အောက်တွင်)

---

### တပ်ဆင်ခြင်းနှင့် ကိရိယာများ {#install-and-tooling}

- Root မူတည်ချက်များ တပ်ဆင်ရန်: `npm ci`
- Docs (ရွေးချယ်နိုင်): `cd website && npm ci`
- targets များ ရှာဖွေကြည့်ရန်: `make help`

---

### တိုက်ရိုက် ဖွံ့ဖြိုး (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop တွင် အမြန် စမ်းသပ် လှုပ်ရှားမှု (UI smoke‑tests သာ):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird တွင် run လုပ်ရန် (MailExtensions အတွက် ဦးစားပေး):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- အကြံပြုချက်များ:
- Thunderbird ၏ Error Console ကို ဖွင့်ထားပါ (Tools → Developer Tools → Error Console)။
- MV3 event pages များသည် အလုပ်မရှိသွားပါက အကြားရပ်သွားနိုင်သည်; code ပြောင်းလဲပြီးတိုင်း add‑on ကို reload လုပ်ပါ၊ သို့မဟုတ် web‑ext အလိုအလျောက် reload ကို အသုံးပြုပါ။
- Firefox‑only အပြုအမူအချို့သည် ကွာခြားနိုင်သည်; API parity အတွက် အမြဲ Thunderbird တွင် စစ်ဆေးပါ။
- Thunderbird binary လမ်းကြောင်းများ (ဥပမာ):
- Linux: `thunderbird` (ဥပမာ `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Profile ကို သီးသန့်ထားခြင်း: သင်၏ နေ့စဉ် အသုံးပြုမှုကို မထိခိုက်စေရန် ဖွံ့ဖြိုးရေးအတွက် Thunderbird profile သီးသန့်တစ်ခုကို အသုံးပြုပါ။

---

### Make Targets (အက္ခရာစဉ်) {#make-targets-alphabetical}

Makefile တွင် ပုံမှန် dev flows များကို စံပြထားသည်။ target တစ်ခုစီ၏ တစ်ကြောင်း짜 စာမူကို ကြည့်ရန် အချိန်မရွေး `make help` ကို run လုပ်ပါ။

အကြံပြုချက်: `make` ကို target မဖော်ပြဘဲ run လုပ်ပါက တိုတောင်းသော Whiptail menu တစ်ခုကို ဖွင့်ပေးပြီး target ကို ရွေးချယ်နိုင်ပါသည်။

| Target                                                   | တစ်ကြောင်း짜 ဖော်ပြချက်                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Local build/preview artifacts (tmp/, web-local-preview/, website/build/) များကို ဖယ်ရှားပါ။     |
| [`commit`](#mt-commit)                                   | Format, စမ်းသပ်မှုများ (i18n ပါဝင်) ကို chạy, changelog အပ်ဒိတ်, commit & push လုပ်ပါ။          |
| [`eslint`](#mt-eslint)                                   | ESLint ကို flat config (`npm run -s lint:eslint`) ဖြင့် run လုပ်ပါ။                             |
| [`help`](#mt-help)                                       | အားလုံး target များကို တစ်ကြောင်း짜 docs ဖြင့် (အစဉ်လိုက်) စာရင်းပြပါ။                          |
| [`lint`](#mt-lint)                                       | `sources/` ပေါ်တွင် web‑ext lint (temp manifest; ZIPs မာထည့်မစစ်; non‑fatal)                    |
| [`menu`](#mt-menu)                                       | Target နှင့် အပို arguments များကို ရွေးချယ်နိုင်သော အပြန်အလှန် menu။                           |
| [`pack`](#mt-pack)                                       | ATN & LOCAL ZIPs များကို Build လုပ်ပါ (linter ကို chạy; packer script ကို ခေါ်)                 |
| [`prettier`](#mt-prettier)                               | Repository ကို နေရာတွင်တင် format လုပ်ပါ (ရေးသား ပြုပြင်မည်)                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ကို check mode (မရေးသား); ပြန်ဖော်ထုတ်လုပ်ရန် လိုအပ်ပါက fail ဖြစ်မည်                   |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` ၏ alias                                                                              |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, ထို့နောက် Vitest (configure ပြီးပါက coverage)                         |
| [`test_i18n`](#mt-test_i18n)                             | i18n‑သာ စမ်းသပ်မှုများ: add‑on placeholders/parity + website parity                             |
| [`translate_app`](#mt-translation-app)                   | `translation_app` ၏ alias                                                                       |
| [`translation_app`](#mt-translation-app)                 | App UI strings များကို `sources/_locales/en/messages.json` ထံမှ ဘာသာပြန်                        |
| [`translate_web_docs_batch`](#mt-translation-web)        | Website docs များကို OpenAI Batch API (ဦးစားပေး) ဖြင့် ဘာသာပြန်                                 |
| [`translate_web_docs_sync`](#mt-translation-web)         | Website docs များကို synchronous (အဟောင်း, non-batch) ဖြင့် ဘာသာပြန်                            |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` ၏ alias                                                                 |
| [`translation_web_index`](#mt-translation_web_index)     | Homepage/navbar/footer UI များကို ဘာသာပြန် (`website/i18n/en/code.json → .../<lang>/code.json`) |
| [`web_build`](#mt-web_build)                             | Docs များကို `website/build` သို့ build ( `--locales` / `BUILD_LOCALES` ကိုပံ့ပိုး)             |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Offline‑safe link check (remote HTTP[S] မစစ်)                                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Local gh‑pages preview; 8080–809ို auto‑serve; optional tests/link‑check                        |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ကို `gh-pages` ဌာန शाखသို့ push                                                 |

Syntax for options

- Options များကို ပေးပို့ရန် `make <command> OPTS="…"` ကို အသုံးပြုပါ (စျေးကွက်ချဉ်းကပ်ချက်အလိုက် quotes ကို အကြံပြု)။ အောက်ပါ target တစ်ခုစီတွင် usage ဥပမာ များကို ပြထားသည်။

--

-

#### Locale build အကြံပြုချက်များ {#locale-build-tips}

- Locales အစိတ်အပိုင်းတစ်စုံတစ်ရာသာ build လုပ်ရန်: `BUILD_LOCALES="en de"` ကို သတ်မှတ်ပါ သို့မဟုတ် `OPTS="--locales en,de"` ကို web targets များထံ ပေးပို့ပါ။
- Locale တစ်ခုထူးထူးအား Preview လုပ်ရန်: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`။

---

### တည်ဆောက်ခြင်းနှင့် ထုပ်ပိုးခြင်း {#build-and-package}

- ZIPs များ build လုပ်ရန်: `make pack`
- Repo root တွင် ATN နှင့် LOCAL ZIPs များ ထုတ်လုပ်ပေးမည် (artifacts များကို ကိုယ်တိုင် မပြင်ဆင်ပါ)
- အကြံပြုချက်: ထုပ်ပိုးမှု မလုပ်ခင် `sources/manifest_ATN.json` နှင့် `sources/manifest_LOCAL.json` နှစ်ခုစလုံး၏ version ကို အပ်ဒိတ်လုပ်ပါ
- Manual install (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → build ပြီးသော ZIP ကို ရွေးချယ်ပါ

---

### စမ်းသပ်ခြင်း {#test}

- စုံလင်သော စုံစမ်းမှုများ: `make test` (Vitest)
- Coverage (ရွေးချယ်နိုင်):
- `npm i -D @vitest/coverage-v8`
- `make test` ကို run လုပ်ပါ; HTML report အတွက် `coverage/index.html` ကို ဖွင့်ကြည့်ပါ
- i18n သာ: `make test_i18n` (UI keys/placeholders/titles + website per‑locale per‑doc parity with id/title/sidebar_label checks)

---

### Debugging & Logs {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- Runtime တွင် verbose logs ကို Toggle လုပ်ရန်:
- Enable: `messenger.storage.local.set({ debug: true })`
- Disable: `messenger.storage.local.set({ debug: false })`
- ဖြေကြာ/ပို့လွှာ များရေးနေစဉ် logs များ ပေါ်လာမည်

---

### စာတမ်းများ (website) {#docs-website}

- Dev server: `cd website && npm run start`
- Static site build: `cd website && npm run build`
- Make နှိုင်းယှဉ် (အက္ခရာစဉ်): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- အသုံးပြုပုံ ဥပမာများ:
- EN သာ, tests/link‑check မပြု, push မလုပ်: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- အားလုံး locales, tests/link‑check ပါ, ထို့နောက် push: `make web_build_local_preview && make web_push_github`
- ထုတ်ဝေမီ offline‑safe link check ကို run လုပ်ပါ: `make web_build_linkcheck`.
- i18n: English သည် `website/docs/*.md` တွင်; ဂျာမန်ဘာသာပြန်ချက်များသည် `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` တွင်ရှိသည်
- ရှာဖွေရန်: CI တွင် Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) များကို သတ်မှတ်ထားပါက site သည် Algolia search ကို အသုံးပြုမည်; မသတ်မှတ်ထားပါက local search သို့ ပြန်ကျမည်။ Homepage ပေါ်တွင် `/` သို့မဟုတ် `Ctrl+K` ကို နှိပ်၍ ရှာဖွေမှု box ကို ဖွင့်ပါ။

---

#### Donate redirect route {#donate-redirect}

- `website/src/pages/donate.js`
- လမ်းကြောင်း: `/donate` (နှင့် `/<locale>/donate`)
- အပြုအမူ:
- လက်ရှိ လမ်းကြောင်းတွင် locale ရှိပါက (ဥပမာ `/de/donate`) အဆိုပါ locale ကို အသုံးပြုပါ
- မဟုတ်ပါက `navigator.languages` နှင့် configuration ထားသည့် locales များမှ အကောင်းဆုံး ကိုက်ညီမှုကို ရွေးပါ; default locale သို့ fallback ဖြစ်မည်
- ပြန်ညွှန်းသည့်နေရာ:
- `en` → `/docs/donation`
- အခြား → `/<locale>/docs/donation`
- `useBaseUrl` ကို အသုံးပြု၍ baseUrl ကို မှန်ကန်စွာ ကိုင်တွယ်သည်
- fallback အဖြစ် meta refresh + `noscript` link ကို ပါဝင်စေသည်

---

---

#### Preview အကြံပြုချက်များ {#preview-tips}

- Node preview ကို သန့်ရှင်းစွာ ပိတ်ရန်: `http://localhost:<port>/__stop` ကို ဖွင့်ပါ (`Local server started` ပြီးနောက် print ထုတ်ပြသည်)။
- MDX/JSX တွင် ပုံများ မတင်ရင်၊ site ၏ `baseUrl` ကို လေးစားစေရန် `useBaseUrl('/img/...')` ကို အသုံးပြုပါ။
- Preview သည် ပထမဦးစွာ စတင်ပြီးနောက် link check ကို ပြုလုပ်မည်ဖြစ်ပြီး non‑blocking ဖြစ်သည် (ပြင်ပ link မတည့်မှုများကြောင့် preview မရပ်မနား)။
- Preview URL ဥပမာ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” ပြသပြီးနောက် print ထုတ်ပြသည်)။
- Link‑check ထဲရှိ ပြင်ပ link များ: အချို့ ပြင်ပ site များ (ဥပမာ addons.thunderbird.net) သည် အလိုအလျောက် crawler များကို တားဆီးပြီး link checks တွင် 403 ပြနိုင်သည်။ Preview သည်Nonetheless စတင်မည်; ထို error များကို မပူရပါ။

---

#### Website ကို ဘာသာပြန်ပါ {#translate-website}

ဘာတွေ ဘာသာပြန်လို့ ရနိုင်သလဲ

- Website UI သာ: homepage, navbar, footer နှင့် အခြား UI strings များ။ Docs အကြောင်းအရာများကို ယခုအချိန်တွင် အင်္ဂလိပ်သာ ထားရှိမည်။

ဘယ်မှာ တည်းဖြတ်မလဲ

- `website/i18n/<locale>/code.json` ကို တည်းဖြတ်ပါ (`en` ကို ရည်ညွှန်းအဖြစ် အသုံးပြု)။ `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ကဲ့သို့သော placeholders များကို မပြောင်းလဲပါနှင့်။

ဖိုင်များ ဖန်တီး/နောက်ဆုံးတင်

- ဘာသာစကားအားလုံးအတွက် မရှိသေးသော stubs များကို ဖန်တီးရန်: `npm --prefix website run i18n:stubs`
- (string အသစ်များ ထည့်ပြီးနောက်) English မှ stubs များကို ပြန်ရေးရန်: `npm --prefix website run i18n:stubs:force`
- Locale တစ်ခုတည်းအတွက် အခြားရွေးချယ်စရာ: `npx --prefix website docusaurus write-translations --locale <locale>`

Homepage/navbar/footer UI strings များကို ဘာသာပြန်ရန် (OpenAI)

- ခွင့်ပြုချက်များကို တစ်ကြိမ်သာ သတ်မှတ်ပါ (shell သို့မဟုတ် .env):
- `export OPENAI_API_KEY=sk-...`
- ရွေးချယ်နိုင်: `export OPENAI_MODEL=gpt-4o-mini`
- တစ်ကြိမ်တည်း (locales အားလုံး၊ en ကို ကျော်): `make translate_web_index`
- Locale သတ်မှတ်ထားသော အပိုင်းများသာ: `make translate_web_index OPTS="--locales de,fr"`
- ရှိပြီးသားတန်ဖိုးများကို အစားထိုးရေးသားရန်: `make translate_web_index OPTS="--force"`

အတည်ပြုခြင်း & ပြန်လည်ကြိုးစားခြင်း

- ဘာသာပြန် script သည် JSON အကွက်ပုံစံကို အတည်ပြုပြီး curly‑brace placeholders များကို ထိန်းသိမ်းပြီး URLs မပြောင်းလဲထားကြောင်း သေချာစေသည်။
- အတည်ပြုမှု မအောင်မြင်ပါက အကြံပြုချက်နှင့်အတူ အများဆုံး 2 ကြိမ် ထပ်မံကြိုးစားပြီးမှ ရှိပြီးသားတန်ဖိုးများကို ထိန်းသိမ်းထားမည်။

သင့် locale ကို Preview လုပ်ပါ

- Dev server: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` သို့ သွားပါ

တင်သွင်းခြင်း

- ပြင်ထားသော `code.json` ဖိုင်(များ) ဖြင့် PR တစ်ခုဖွင့်ပါ။ ပြောင်းလဲမှုများကို အဓိကအချက်အလက်များပေါ်သာ အာရုံပြုပြီး ဖြစ်နိုင်လျှင် screenshot တစ်ပုံ ပါထည့်ပါ။

---

### လုံခြုံရေးနှင့် ပြင်ဆင်မှု အကြံပြုချက်များ {#security-and-configuration-tips}

- `sources/manifest.json` ကို commit မလုပ်ပါ (build မှ ခေတ္တ ဖန်တီးထားသည်)
- Update channel ကို ထိန်းသိမ်းရန် `browser_specific_settings.gecko.id` ကို တည်မြဲစွာ ထားရှိပါ

---

### Settings ထိန်းသိမ်းမှု {#settings-persistence}

- Storage: အသုံးပြုသူ၏ settings အားလုံးသည် `storage.local` တွင် ထားရှိပြီး add‑on updates များအကြား ဆက်လက် ရှိနေမည်။
- Install: key တစ်ခုကို အပြီးအပြတ် မရှိသည့် (undefined) အခြေအနေတွင်သာ defaults များ ကားပေးမည်။
- Update: Migration သည် မရှိသေးသော keys များကိုသာ ဖြည့်ပေးပြီး ရှိနေပြီးသား တန်ဖိုးများကို မအစားထိုးပါ။
- Schema marker: `settingsVersion` (လက်ရှိ `1`)။
- Keys နှင့် defaults:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Code: `sources/background.js` → `initializeOrMigrateSettings()` နှင့် `SCHEMA_VERSION` ကို ကြည့်ပါ။

Dev workflow (setting အသစ် တစ်ခုထည့်ခြင်း)

- `sources/background.js` ထဲတွင် `SCHEMA_VERSION` ကို အဆင့်မြှင့်ပါ။
- `initializeOrMigrateSettings()` ထဲရှိ `DEFAULTS` object တွင် key အသစ် + default ကို ထည့်ပါ။
- Defaults များကို seed လုပ်ရာတွင် "only‑if‑undefined" စည်းမျဉ်းကို အသုံးပြုပါ; ရှိနေပြီးသား တန်ဖိုးများကို မအစားထိုးပါနှင့်။
- သတ်မှတ်ချက်သည် အသုံးပြုသူ မြင်တွေ့နိုင်သည့်အရာဖြစ်လျှင် `sources/options.js` တွင် ချိတ်ဆက်ပြီး localized strings များကို ထည့်ပါ။
- စမ်းသပ်မှုများကို ထည့်ဆောင်း/ချိန်ညှိပါ (`tests/background.settings.migration.test.js` ကို ကြည့်ပါ)။

လက်ဖြင့် စမ်းသပ်မှု အကြံပြုချက်များ

- Fresh install ကို မျှော်မှန်းရန်: extension ၏ data directory ကို ရှင်းပါ သို့မဟုတ် profile အသစ်တစ်ခုဖြင့် စတင်ပါ။
- Update ကို မျှော်မှန်းရန်: `storage.local` ထဲတွင် `settingsVersion` ကို `0` သို့ သတ်မှတ်ပြီး အသစ် reload လုပ်ပါ; ရှိပြီးသား တန်ဖိုးများ မပြောင်းလဲကြောင်းနှင့် မရှိသေးသော keys များသာ ထည့်ပေးထားကြောင်း အတည်ပြုပါ။

---

### ပြဿနာရှင်းလိုက်ခြင်း {#troubleshooting}

- Thunderbird သည် 128 ESR သို့မဟုတ် ထို့ထက်အသစ် ဖြစ်ကြောင်း သေချာပါစေ
- Runtime ပြဿနာများအတွက် Error Console ကို အသုံးပြုပါ
- သိမ်းထားသည့် settings များ မသင့်တင့်ကာ မအသုံးမဝင်ပါက Thunderbird ကို ပြန်စလိုက်ပြီး ထပ်မံ စမ်းကြည့်ပါ။ (Thunderbird သည် sessions အကြား state ကို cache ပြုလုပ်နိုင်သည်; restart ပြုလုပ်ခြင်းဖြင့် settings အသစ်များကို သေချာစွာ လုပ်ဆောင်စေမည်)။

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) သည် vitest ကို coverage thresholds (လိုင်း/ဖင်ခွင်/မှောက်ခွာ/စတိတ်မင့်များ 85%) ဖြင့် run လုပ်ပါသည်။ Threshold မပြည့်ပါက job သည် fail ဖြစ်မည်။
- Workflow သည် HTML report ပါဝင်သည့် artifact `coverage-html` ကို upload လုပ်မည်; run စာမျက်နှာမှ download လုပ်ပါ (Actions → latest run → Artifacts)။

---

### ကူညီပံ့ပိုးခြင်း {#contributing}

- Branch/commit/PR လမ်းညွှန်များအတွက် CONTRIBUTING.md ကို ကြည့်ပါ
- အကြံပြုချက်: နေ့စဉ် profile ကို မထိခိုက်စေရန် စမ်းသပ်မှု အတွက် Thunderbird ဖွံ့ဖြိုးရေး profile သီးသန့်တစ်ခု ဖန်တီးပါ။

---

### ဘာသာပြန်ချက်များ

- “all → all” ကဲ့သို့ သီးချီ job ကြီးများကို လုပ်ခြင်းသည် နှေးကွေးနိုင်ပြီး ကုန်ကျစရိတ်များလည်း တက်နိုင်သည်။ စတင်ရာတွင် အစိတ်အပိုင်းတစ်ချို့သာ (ဥပမာ docs အနည်းငယ်နှင့် locales 1–2 ခုခန့်) ဖြင့် စတင်ပြီး ရလဒ်ကို ချီးမွမ်းအတည်ပြုထားကာ ထို့နောက် တဖြည်းဖြည်း တိုးချဲ့ပါ။

---

- Retry policy: ဘာသာပြန် job များသည် API errors များအပေါ် ၃ ကြိမ်ထိ exponential backoff ဖြင့် ပြန်ကြိုးစားမည်; `scripts/translate_web_docs_batch.js` နှင့် `scripts/translate_web_docs_sync.js` ကို ကြည့်ပါ။

Docs အတွက် မျက်နှာပြင်ပုံများ

- ပုံများကို `website/static/img/` အောက်တွင် သိမ်းဆည်းပါ။
- MD/MDX တွင် `useBaseUrl('/img/<filename>')` ဖြင့် ရည်ညွှန်းပါ၊ ထို့ကြောင့် site ၏ `baseUrl` နှင့် လမ်းကြောင်းများ ကိုက်ညီမည်။
- `website/static/img/` အောက်တွင် ပုံများကို ထည့်သွင်း/အမည်ပြောင်းပြီးနောက်၊ ရည်ညွှန်းချက်များအားလုံးသည် မ stále `useBaseUrl('/img/…')` ကို အသုံးပြုနေကြောင်းနှင့် local preview တွင် မှန်ကန်ထည့်သွင်းပြသနေကြောင်း အတည်ပြုပါ။
  Favicons

- multi‑size `favicon.ico` ကို Make + scripts များပါဝင်သည့် build လမ်းကြောင်းအားလုံးတွင် အလိုအလျောက် ဖန်တီးပေးထားသည် (`website/scripts/build-favicon.mjs` ဖြင့်)။
- လက်ဖြင့် အဆင့်တစ်ခုမျှ မလိုပါ; `icon-*.png` ကို အပ်ဒိတ်လုပ်ပေးရုံပါပဲ။
  Review အကြံပြုချက်

- ဘာသာပြန်ထားသော docs များတွင် front‑matter `id` ကို မပြောင်းလဲပါနှင့်; ရှိပါက `title` နှင့် `sidebar_label` ကိုသာ ဘာသာပြန်ပါ။

#### clean {#mt-clean}

- ရည်ရွယ်ချက်: local build/preview artifacts များကို ဖယ်ရှားသည်။
- အသုံးပြုပုံ: `make clean`
- ဖယ်ရှားမည့်အရာများ (ရှိပါက):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- ရည်ရွယ်ချက်: format, စမ်းသပ်, changelog အပ်ဒိတ်, commit နှင့် push။
- အသုံးပြုပုံ: `make commit`
- အသေးစိတ်: Prettier (write), `make test`, `make test_i18n` များကို run လုပ်သည်; staged diffs ရှိသည့်အခါ changelog သို့လည်း ပူးတွဲထည့်သည်; `origin/<branch>` သို့ push လုပ်သည်။

---

#### eslint {#mt-eslint}

- ရည်ရွယ်ချက်: flat config ဖြင့် ESLint ကို run လုပ်။
- အသုံးပြုပုံ: `make eslint`

---

#### help {#mt-help}

- ရည်ရွယ်ချက်: one‑line docs ဖြင့် targets အားလုံးကို စာရင်းပြ။
- အသုံးပြုပုံ: `make help`

---

#### lint {#mt-lint}

- ရည်ရွယ်ချက်: `web-ext` ကို အသုံးပြု၍ MailExtension ကို lint လုပ်။
- အသုံးပြုပုံ: `make lint`
- မှတ်ချက်များ: `sources/manifest_LOCAL.json` → `sources/manifest.json` သို့ ခေတ္တရေးစရာကူးကူးလဲလှယ်သည်; build ပြီးသော ZIPs များကို မစစ်; အမြင့်မားမား မဟုတ်သည့် သတိပေးချက်များကြောင့် pipeline ကို မပျက်စီးစေ။

---

#### menu {#mt-menu}

- ရည်ရွယ်ချက်: Make target နှင့် optional arguments များကို ရွေးချယ်နိုင်သော အပြန်အလှန် menu။
- အသုံးပြုပုံ: `make` ကို arguments မည်မျှမပါဘဲ run လုပ်ပါ။
- မှတ်ချက်များ: `whiptail` မရှိပါက menu သည် `make help` သို့ fallback ဖြစ်မည်။

---

#### pack {#mt-pack}

- ရည်ရွယ်ချက်: ATN နှင့် LOCAL ZIPs များ build ( `lint` အပေါ် မူတည်)။
- အသုံးပြုပုံ: `make pack`
- အကြံပြုချက်: ထုပ်ပိုးမည်မီ `sources/manifest_*.json` နှစ်ခုစလုံး၏ version များကို bump လုပ်ပါ။

---

#### prettier {#mt-prettier}

- ရည်ရွယ်ချက်: repo ကို နေရာတွင်တင် format လုပ်ရန်။
- အသုံးပြုပုံ: `make prettier`

#### prettier_check {#mt-prettier_check}

- ရည်ရွယ်ချက်: formatting ကို သေချာစစ် (ရေးသားခြင်း မရှိ)။
- အသုံးပြုပုံ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- ရည်ရွယ်ချက်: `prettier` ၏ alias။
- အသုံးပြုပုံ: `make prettier_write`

---

#### test {#mt-test}

- ရည်ရွယ်ချက်: Prettier (write), ESLint, ထို့နောက် Vitest (တပ်ဆင်ထားပါက coverage) ကို run လုပ်။
- အသုံးပြုပုံ: `make test`

#### test_i18n {#mt-test_i18n}

- ရည်ရွယ်ချက်: add‑on strings နှင့် website docs အတွက် i18n အထူးစမ်းသပ်မှုများ။
- အသုံးပြုပုံ: `make test_i18n`
- Run လုပ်သည့်အရာများ: `npm run test:i18n` နှင့် `npm run -s test:website-i18n`။

---

#### translate_app / translation_app {#mt-translation-app}

- ရည်ရွယ်ချက်: add‑on UI strings များကို EN မှ အခြား locales များသို့ ဘာသာပြန်။
- အသုံးပြုပုံ: `make translation_app OPTS="--locales all|de,fr"`
- မှတ်ချက်များ: key ဖွဲ့စည်းမှုနှင့် placeholders များကို ထိန်းသိမ်းထားသည်; `translation_app.log` သို့ log ထုတ်သည်။ Script ပုံစံ: `node scripts/translate_app.js --locales …`။

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- ရည်ရွယ်ချက်: website docs များကို `website/docs/*.md` မှ `website/i18n/<locale>/...` သို့ ဘာသာပြန်။
- ဦးစားပေး: `translate_web_docs_batch` (OpenAI Batch API)
  - အသုံးပြုပုံ (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional ကို မထည့်မထား လက်ခံထားသေးသည်: `OPTS="<doc|all> <lang|all>"`
- အပြုအမူ: JSONL ဖွဲ့စည်း, upload, 30s ပြီးတိုင်း poll, result များ download, ဖိုင်များရေးသား။
- မှတ်ချက်: batch job တစ်ခုသည် (OpenAI ၏ batch window အရ) 24 နာရီအထိ ကြာနိုင်သည်။ Console တွင် poll တစ်ကြိမ်ချင်းစီအတွက် ကုန်လွန်ထားသည့် အချိန်ကို ပြသမည်။
- Env: `OPENAI_API_KEY` (လိုအပ်), ရွေးချယ်နိုင်: `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (default 24h), `BATCH_POLL_INTERVAL_MS`။
- Legacy: `translate_web_docs_sync`
  - အသုံးပြုပုံ (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Legacy positional ကို မထည့်မထား လက်ခံထားသေးသည်: `OPTS="<doc|all> <lang|all>"`
- အပြုအမူ: synchronous per‑pair requests (batch စုစည်းခြင်း မပါ)။
- မှတ်ချက်များ: `OPTS` မထည့်ပါက အပြန်အလှန် prompts များဖြင့် ညွှန်ကြားမည်။ ပုံစံနှစ်မျိုးလုံးတွင် code blocks/inline code များကို ထိန်းသိမ်းပြီး front‑matter `id` ကို မပြောင်းဘဲ ထားရှိသည်; logs ကို `translation_web_batch.log` (batch) သို့မဟုတ် `translation_web_sync.log` (sync) သို့ စုဆောင်းသည်။

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- ရည်ရွယ်ချက်: website UI strings (homepage, navbar, footer) ကို `website/i18n/en/code.json` မှ `website/i18n/<locale>/code.json` အောက်ရှိ locales အားလုံးသို့ (`en` ကို ချန်) ဘာသာပြန်။
- အသုံးပြုပုံ: `make translate_web_index` သို့မဟုတ် `make translate_web_index OPTS="--locales de,fr [--force]"`
- လိုအပ်ချက်များ: `OPENAI_API_KEY` ကို export ပြု (ရွေးချယ်နိုင်: `OPENAI_MODEL=gpt-4o-mini`)။
- အပြုအမူ: JSON ဖွဲ့စည်းမှုကို အတည်ပြု၊ curly‑brace placeholders များကို ထိန်းသိမ်း၊ URLs မပြောင်းလဲ၊ အတည်ပြုမှု အမှားများရှိပါက feedback ဖြင့် ပြန်ကြိုးစားသည်။

---

#### web_build {#mt-web_build}

- ရည်ရွယ်ချက်: docs site ကို `website/build` သို့ build လုပ်ရန်။
- အသုံးပြုပုံ: `make web_build OPTS="--locales en|de,en|all"` (သို့မဟုတ် `BUILD_LOCALES="en de"` ကို သတ်မှတ်)
- အတွင်းခံ: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`။
- အားတင်ချက်: `website/` တွင်သာ `website/node_modules/@docusaurus` မရှိပါက `npm ci` ကို run လုပ်မည်။

#### web_build_linkcheck {#mt-web_build_linkcheck}

- ရည်ရွယ်ချက်: offline‑safe link check။
- အသုံးပြုပုံ: `make web_build_linkcheck OPTS="--locales en|all"`
- မှတ်ချက်များ: `tmp_linkcheck_web_pages` သို့ build လုပ်သည်; GH Pages `baseUrl` ကို `/` သို့ rewrite လုပ်သည်; remote HTTP(S) links များကို ကျော်လွန်ပါမည်။

#### web_build_local_preview {#mt-web_build_local_preview}

- ရည်ရွယ်ချက်: tests/link‑check ရွေးချယ်နိုင်မှုများပါဝင်သည့် local gh‑pages preview။
- အသုံးပြုပုံ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- အပြုအမူ: ပထမဦးစွာ Node preview server (`scripts/preview-server.mjs`, `/__stop` ကို ပံ့ပိုး) ကို ကြိုးစားပြီး မအောင်မြင်လျှင် `python3 -m http.server` သို့ fallback လုပ်သည်; 8080–8090 တို့တွင် serve; PID ကို `web-local-preview/.server.pid` တွင် သိမ်းဆည်းသည်။

#### web_push_github {#mt-web_push_github}

- ရည်ရွယ်ချက်: `website/build` ကို `gh-pages` ချန်နယ်သို့ push လုပ်ရန်။
- အသုံးပြုပုံ: `make web_push_github`

အကြံပြုချက်: Makefile မှ အသုံးပြုမည့် package manager ကို ချိန်ညှိလိုပါက `NPM=…` ကို သတ်မှတ်ပါ (default ဟာ `npm`)။

---
