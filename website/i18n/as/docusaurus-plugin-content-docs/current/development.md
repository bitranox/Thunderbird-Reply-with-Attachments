---
id: development
title: 'উন্নয়ন'
sidebar_label: 'উন্নয়ন'
---

---

## উন্নয়ন গাইড {#development-guide}

:::note কেৱল ইংৰাজী সম্পাদনা কৰক; অনুবাদসমূহ প্ৰসাৰিত হয়
দস্তাবেজকৰণ কেৱল `website/docs` (ইংৰাজী) ৰ অধীনত আপডেট কৰক। `website/i18n/<locale>/…` ৰ তলত থকা অনুবাদসমূহ স্বয়ংক্ৰিয়ভাৱে সৃষ্টি কৰা হয় আৰু হাতেৰে সম্পাদনা নকৰিব। স্থানীয়কৃত সমল ৰিফ্ৰেশ কৰিবলৈ অনুবাদ টাস্কসমূহ (উদাহৰণস্বৰূপে, `make translate_web_docs_batch`) ব্যৱহাৰ কৰক।
:::

### আগতীয়া শর্তসমূহ {#prerequisites}

- Node.js 22+ আৰু npm (Node 22 ৰ সৈতে পৰীক্ষিত)
- Thunderbird 128 ESR বা তাতো নতুন (হস্তচালিত পৰীক্ষাৰ বাবে)

---

### প্ৰকল্পৰ বিন্যাস (উচ্চ‑স্তৰ) {#project-layout-high-level}

- Root: পেকেজিং স্ক্ৰিপ্ট `distribution_zip_packer.sh`, দস্তাবেজ, স্ক্ৰীণশ্বটসমূহ
- `sources/`: মূল এড‑অন ক’ড (background, options/popup UI, manifests, icons)
- `tests/`: Vitest ছুইট
- `website/`: Docusaurus দস্তাবেজ (i18n `website/i18n/de/...` ৰ তলত)

---

### ইনষ্টল আৰু টুলিং {#install-and-tooling}

- ৰুট নিৰ্ভৰশীলতা ইনষ্টল কৰক: `npm ci`
- দস্তাবেজ (ঐচ্ছিক): `cd website && npm ci`
- লক্ষ্যসমূহ সন্ধান কৰক: `make help`

---

### লাইভ ডেভ (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop ত দ্ৰুত লুপ (কেৱল UI স্ম’ক‑টেষ্ট):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird ত চলাওক (MailExtensions ৰ বাবে অগ্ৰাধিকাৰ):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- টিপছ:
- Thunderbird ৰ Error Console খোলা ৰাখক (Tools → Developer Tools → Error Console)।
- MV3 ইভেণ্ট পৃষ্ঠাসমূহ নিস্ক্ৰিয় হ’লে স্থগিত থাকে; ক’ড সলনি কৰাৰ পিছত এড‑অন ৰিল’ড কৰক, বা web‑ext ক স্বয়ংক্ৰিয়ভাৱে ৰিল’ড কৰিবলৈ দিয়ক।
- কিছুমান কেৱল Firefox‑ত থকা ব‍্যৱহাৰ ভিন্ন হ’ব পাৰে; API সমতা নিশ্চিত কৰিবলৈ সদায় Thunderbird ত যাচাই কৰক।
- Thunderbird বাইনাৰী পথসমূহ (উদাহৰণ):
- Linux: `thunderbird` (যেমন, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- প্ৰ’ফাইল পৃথকীকৰণ: আপোনাৰ দৈনন্দিন ছেটআপে প্ৰভাৱিত নহ’বলৈ উন্নয়নৰ বাবে পৃথক Thunderbird প্ৰ’ফাইল ব্যৱহাৰ কৰক।

---

### Make লক্ষ্যসমূহ (বৰ্ণানুক্ৰমে) {#make-targets-alphabetical}

Makefile এ সাধাৰণ ডেভ ফ্ল’সমূহ মানসম্মত কৰে। প্ৰতিটো লক্ষ্যৰ এক‑শাৰী সংক্ষিপ্তসাৰ পোৱাৰ বাবে যিকোনো সময়ত `make help` চলাওক।

টিপ: কোনো লক্ষ্য নোহোৱাকৈ `make` চলালে লক্ষ্য বাছনিৰ বাবে এটা সহজ Whiptail মেনু খোলে।

| লক্ষ্য                                                   | এক‑শাৰী বৰ্ণনা                                                                            |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | স্থানীয় build/preview আৰ্টিফেক্টসমূহ আঁতৰাওক (tmp/, web-local-preview/, website/build/)। |
| [`commit`](#mt-commit)                                   | ফৰমেট, টেষ্ট চলাওক (i18n সহ), চেঞ্জলগ আপডেট, কমিট আৰু পুশ।                                |
| [`eslint`](#mt-eslint)                                   | ফ্লেট কনফিগৰ দ্বাৰা ESLint চলাওক (`npm run -s lint:eslint`)।                              |
| [`help`](#mt-help)                                       | এক‑শাৰী দস্তাবেজসহ সকলো লক্ষ্য তালিকাভুক্ত কৰক (সজোৱা)।                                   |
| [`lint`](#mt-lint)                                       | `sources/` ত web‑ext lint (অস্থায়ী মেনিফেষ্ট; ZIPসমূহ উপেক্ষা কৰে; অ‑মাৰাত্মক)।          |
| [`menu`](#mt-menu)                                       | লক্ষ্য আৰু ঐচ্ছিক আর্গুমেন্ট বাছনিৰ বাবে ইন্টাৰেক্টিভ মেনু।                               |
| [`pack`](#mt-pack)                                       | ATN আৰু LOCAL ZIP নিৰ্মাণ (লিন্টাৰ চলায়; পেকাৰ স্ক্ৰিপ্ট কল কৰে)।                         |
| [`prettier`](#mt-prettier)                               | ৰেপ’জিট’ৰী ঠাইতে ফৰমেট কৰক (সলনি লিখে)।                                                   |
| [`prettier_check`](#mt-prettier_check)                   | চেক ম’ডত Prettier (লিখে নাযায়); পুনঃফৰমেট দরকাৰ হ’লে ফেইল কৰে।                            |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` ৰ এলিয়াছ।                                                                      |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, তাৰ পিছত Vitest (কনফিগাৰ্ড হ’লে কভাৰেজ)।                        |
| [`test_i18n`](#mt-test_i18n)                             | কেৱল i18n টেষ্ট: এড‑অন প্লেছহ’ল্ডাৰ/পেৰিটি + ৱেবছাইট পেৰিটি।                              |
| [`translate_app`](#mt-translation-app)                   | `translation_app` ৰ এলিয়াছ।                                                               |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` ৰ পৰা এপ্‌ UI ষ্ট্ৰিংসমূহ অনুবাদ।                     |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API ৰ জৰিয়তে ৱেবছাইট দস্তাবেজ অনুবাদ (অগ্ৰাধিকাৰযোগ্য)।                      |
| [`translate_web_docs_sync`](#mt-translation-web)         | ৱেবছাইট দস্তাবেজ সিঙ্ক্ৰ’নাছভাৱে অনুবাদ (লিগেচি, নন‑বেচ)।                                 |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` ৰ এলিয়াছ।                                                         |
| [`translation_web_index`](#mt-translation_web_index)     | হ’মপেইজ/নেভবাৰ/ফুটাৰ UI অনুবাদ (`website/i18n/en/code.json → .../<lang>/code.json`)।      |
| [`web_build`](#mt-web_build)                             | দস্তাবেজ `website/build` লৈ বিল্ড কৰক (`--locales` / `BUILD_LOCALES` সমৰ্থন কৰে)।         |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | অফলাইন‑সুৰক্ষিত লিংক চেক (দূৰৱৰ্তী HTTP[S] বাদ দিয়ে)।                                     |
| [`web_build_local_preview`](#mt-web_build_local_preview) | স্থানীয় gh‑pages প্ৰিভিউ; 8080–8090 ত স্বয়ংক্ৰিয় সেৱা; ঐচ্ছিক টেষ্ট/লিংক‑চেক।            |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` ক `gh-pages` শাখালৈ পুশ কৰক।                                              |

বিকল্পসমূহৰ সিনটেক্স

- অপচন পঠিয়াবলৈ `make <command> OPTS="…"` ব্যৱহাৰ কৰক (উদ্ধৃতি চিহ্ন ব্যৱহাৰ কৰাৰ পৰামৰ্শ)। তলত প্ৰতিটো লক্ষ্যত উদাহৰণীয় ব্যৱহাৰ দেখুওৱা আছে।

--

-

#### লোকেল বিল্ড টিপছ {#locale-build-tips}

- কিছুমান নির্দিষ্ট লোকেলহে বিল্ড কৰক: `BUILD_LOCALES="en de"` ছেট কৰক বা ৱেব লক্ষ্যসমূহলৈ `OPTS="--locales en,de"` পঠিয়াওক।
- কোনো এখন নির্দিষ্ট লোকেল প্ৰিভিউ কৰক: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`।

---

### বিল্ড আৰু পেকেজ {#build-and-package}

- ZIP নিৰ্মাণ কৰক: `make pack`
- ৰেপ’ ৰুটত ATN আৰু LOCAL ZIP উত্পন্ন কৰে (আৰ্টিফেক্টসমূহ হাতেৰে সম্পাদনা নকৰিব)
- টিপ: পেকেজিংৰ আগতে `sources/manifest_ATN.json` আৰু `sources/manifest_LOCAL.json` উভয়তেই সংস্কৰণ আপডেট কৰক
- হস্তচালিত ইনষ্টল (ডেভ): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → নিৰ্মিত ZIP বাছক

---

### টেষ্ট {#test}

- সম্পূৰ্ণ ছুইট: `make test` (Vitest)
- কভাৰেজ (ঐচ্ছিক):
- `npm i -D @vitest/coverage-v8`
- `make test` চলাওক; HTML ৰিপ’ৰ্টৰ বাবে `coverage/index.html` খোলক
- কেৱল i18n: `make test_i18n` (UI কী/প্লেছহ’ল্ডাৰ/শীৰ্ষক + ৱেবছাইটত প্ৰতিটো লোকেল‑প্ৰতি দস্তাবেজ পেৰিটি id/title/sidebar_label পৰীক্ষাসহ)

---

### ডিবাগিং আৰু লগছ {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- ৰাণটাইমত বৰ্ণনামূলক লগ ট’গল কৰক:
- সক্ৰিয় কৰক: `messenger.storage.local.set({ debug: true })`
- নিষ্ক্ৰিয় কৰক: `messenger.storage.local.set({ debug: false })`
- উত্তৰ সংকলন/পঠিওঁতে লগসমূহ দেখা যায়

---

### দস্তাবেজ (ৱেবছাইট) {#docs-website}

- ডেভ চাৰ্ভাৰ: `cd website && npm run start`
- ষ্টেটিক ছাইট বিল্ড কৰক: `cd website && npm run build`
- Make সমমান (বৰ্ণানুক্ৰমে): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ব্যৱহাৰৰ উদাহৰণসমূহ:
- কেৱল EN, টেষ্ট/লিংক‑চেক বাদ, কোনো পুশ নাহে: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- সকলো লোকেল, টেষ্ট/লিংক‑চেকসহ, তাৰ পিছত পুশ: `make web_build_local_preview && make web_push_github`
- প্ৰকাশৰ আগতে, অফলাইন‑সুৰক্ষিত লিংক চেক চলাওক: `make web_build_linkcheck`।
- i18n: ইংৰাজী `website/docs/*.md` ত থাকে; জাৰ্মান অনুবাদসমূহ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` ত
- অনুসন্ধান: CI ত Algolia DocSearch env ভেৰিয়েবলসমূহ ছেট থাকিলে (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), ছাইটে Algolia search ব্যৱহাৰ কৰে; নহ’লে স্থানীয় ছাৰ্চত ফলবেক কৰে। হ’মপেইজত, ছাৰ্চ বক্স খোলাৰ বাবে `/` বা `Ctrl+K` টিপক।

---

#### দান ৰিডাইৰেক্ট ৰুট {#donate-redirect}

- `website/src/pages/donate.js`
- ৰুট: `/donate` (আৰু `/<locale>/donate`)
- আচৰণ:
- বৰ্তমান ৰুটত যদি কোনো লোকেল থাকে (যেমন, `/de/donate`), তেন্তে সেইটো ব্যৱহাৰ কৰক
- নচকলে, কনফিগাৰ্ড লোকেলসমূহৰ বিপৰীতে `navigator.languages` ৰ পৰা সৰ্বশ্ৰেষ্ঠ মিল বাছক; ডিফ’ল্ট লোকেললৈ ফলবেক কৰক
- ৰিডাইৰেক্ট হয়:
- `en` → `/docs/donation`
- আনসমূহ → `/<locale>/docs/donation`
- সঠিক baseUrl হেণ্ডলিংৰ বাবে `useBaseUrl` ব্যৱহাৰ কৰে
- ফলবেক হিচাপে meta refresh + `noscript` লিংক সন্নিৱেশিত আছে

---

---

#### প্ৰিভিউ টিপছ {#preview-tips}

- Node প্ৰিভিউ সুচাৰতাভাৱে বন্ধ কৰক: `http://localhost:<port>/__stop` খোলক (`Local server started` ৰ পিছত প্ৰিন্ট হয়)।
- MDX/JSX ত ছবি ল’ড নোহ’লে, ছাইটৰ `baseUrl` মান্য কৰিবলৈ `useBaseUrl('/img/...')` ব্যৱহাৰ কৰক।
- প্ৰিভিউ প্ৰথমে আৰম্ভ হয়; লিংক চেক পাছত চলে আৰু নন‑ব্ল’কিং হয় (বাহ্যিক ভাঙি থকা লিংকে প্ৰিভিউ ৰোধ নকৰে)।
- প্ৰিভিউৰ উদাহৰণ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started” ৰ পিছত প্ৰিন্ট হয়)।
- লিংক‑চেকত বাহ্যিক লিংকসমূহ: কিছুমান বাহ্যিক ছাইট (যেমন, addons.thunderbird.net) স্বয়ংক্ৰিয় ক্ৰ’লাৰ ব্লক কৰে আৰু লিংক চেকত 403 দেখা দিব পাৰে। প্ৰিভিউ তথাপিও আৰম্ভ হয়; এইবোৰ নিৰাপদে উপেক্ষা কৰিব পাৰি।

---

#### ৱেবছাইট অনুবাদ কৰক {#translate-website}

আপুনি কি অনুবাদ কৰিব পাৰে

- কেৱল ৱেবছাইট UI: হ’মপেইজ, নেভবাৰ, ফুটাৰ, আৰু অন্যান্য UI ষ্ট্ৰিং। দস্তাবেজৰ সমল এতিয়ালৈকে কেৱল ইংৰাজীতেই থাকিব।

ক’ত সম্পাদনা কৰিব

- `website/i18n/<locale>/code.json` সম্পাদনা কৰক (`en` ক ৰেফাৰেন্স হিচাপে ব্যৱহাৰ কৰক)। `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` যেনে প্লেছহ’ল্ডাৰসমূহ অপৰিবর্তিত ৰাখক।

ফাইল সৃষ্টি বা ৰিফ্ৰেশ কৰক

- সকলো লোকেলৰ বাবে অভাৱী স্টাব সৃষ্টি কৰক: `npm --prefix website run i18n:stubs`
- ইংৰাজীৰ পৰা স্টাবসমূহ অভাৰৰাইট কৰক (নতুন ষ্ট্ৰিং যোগ কৰাৰ পিছত): `npm --prefix website run i18n:stubs:force`
- একে লোকেলৰ বিকল্প: `npx --prefix website docusaurus write-translations --locale <locale>`

হ’মপেইজ/নেভবাৰ/ফুটাৰ UI ষ্ট্ৰিং অনুবাদ (OpenAI)

- এবাৰ credential ছেট কৰক (shell বা .env):
- `export OPENAI_API_KEY=sk-...`
- ঐচ্ছিক: `export OPENAI_MODEL=gpt-4o-mini`
- একমুঠ (সকলো লোকেল, en বাদ): `make translate_web_index`
- নিৰ্দিষ্ট লোকেললৈ সীমাবদ্ধ কৰক: `make translate_web_index OPTS="--locales de,fr"`
- বিদ্যমান মানসমূহ অভাৰৰাইট কৰক: `make translate_web_index OPTS="--force"`

বৈধতা আৰু ৰিট্ৰাইসমূহ

- অনুবাদ স্ক্ৰিপ্টে JSON আকৃতি বৈধ কৰে, কুৰলি ব্রেচ প্লেছহ’ল্ডাৰ সংৰক্ষণ কৰে, আৰু URLসমূহ অপৰিবর্তিত ৰখা নিশ্চিত কৰে।
- বৈধতা বিফল হ’লে, ২বাৰলৈ ফিডব্যাকসহ পুনৰ চেষ্টা কৰে; তেতিয়াও বিফল হ’লে বিদ্যমান মান বজাই ৰাখে।

আপোনাৰ লোকেল প্ৰিভিউ কৰক

- ডেভ চাৰ্ভাৰ: `npm --prefix website run start`
- ভিজিট কৰক `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

জমা দিয়া

- সম্পাদিত `code.json` ফাইল(সমূহ)ৰে এটা PR খোলক। সলনিসমূহ কেন্দ্ৰভূত ৰাখক আৰু সম্ভৱ হ’লে এটা দ্ৰুত স্ক্ৰীণশ্বট সংলগ্ন কৰক।

---

### সুৰক্ষা আৰু কনফিগাৰেচন টিপছ {#security-and-configuration-tips}

- `sources/manifest.json` কমিট নকৰিব (বিল্ডে অস্থায়ীভাৱে সৃষ্টি কৰে)
- আপডেট চেনেল সংৰক্ষণ কৰিবলৈ `browser_specific_settings.gecko.id` স্থিৰ ৰাখক

---

### ছেটিংস স্থায়িত্ব {#settings-persistence}

- সংৰক্ষণ: সকলো ব্যৱহাৰকাৰী ছেটিং `storage.local` ত সংৰক্ষিত থাকে আৰু এড‑অন আপডেটসমূহ জুৰি স্থায়ী থাকে।
- ইনষ্টল: কেৱল কোনো কী একেবাৰেই অনুপস্থিত (undefined) হ’লে ডিফ’ল্টসমূহ প্ৰয়োগ হয়।
- আপডেট: মাইগ্ৰেচনে কেৱল অনুপস্থিত কীসমূহ ভৰে; বিদ্যমান মান কেতিয়াও অভাৰৰাইট নকৰে।
- স্কিমা মাৰ্কাৰ: `settingsVersion` (বৰ্তমানে `1`)।
- কী আৰু ডিফ’ল্টসমূহ:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- ক’ড: `sources/background.js` → `initializeOrMigrateSettings()` আৰু `SCHEMA_VERSION` চাওক।

ডেভ ৱাৰ্কফ্ল’ (এটা নতুন ছেটিং যোগ কৰা)

- `sources/background.js` ত `SCHEMA_VERSION` বাম্প কৰক।
- `initializeOrMigrateSettings()` ত `DEFAULTS` অবজেক্টত নতুন কী + ডিফ’ল্ট যোগ কৰক।
- ডিফ’ল্ট সিডিং কৰোঁতে "only-if-undefined" নিয়ম ব্যৱহাৰ কৰক; বিদ্যমান মান অভাৰৰাইট নকৰিব।
- ছেটিংটো ব্যৱহাৰকাৰীৰ বাবে দৃশ্যমান হ’লে, `sources/options.js` ত ৱায়াৰ কৰক আৰু স্থানীয়কৃত ষ্ট্ৰিং যোগ কৰক।
- টেষ্টসমূহ যোগ/সংশোধন কৰক (`tests/background.settings.migration.test.js` চাওক)।

হস্তচালিত পৰীক্ষা টিপছ

- একেবাৰে নতুন ইনষ্টল অনুকৰণ কৰক: এক্সটেনশ্যনৰ ডাটা ডাইৰেক্ট’ৰি পৰিষ্কাৰ কৰক বা এটা নতুন প্ৰ’ফাইল লৈ আৰম্ভ কৰক।
- আপডেট অনুকৰণ কৰক: `storage.local` ত `settingsVersion` ক `0` লৈ ছেট কৰক আৰু ৰি‑ল’ড কৰক; বিদ্যমান মানসমূহ অপৰিবর্তিত ৰোৱা আৰু কেৱল অনুপস্থিত কী যোগ হোৱা নিশ্চিত কৰক।

---

### সমস্যাসমাধান {#troubleshooting}

- Thunderbird 128 ESR বা তাতো নতুন হ’ব লাগিব
- ৰাণটাইম সমস্যাৰ বাবে Error Console ব্যৱহাৰ কৰক
- সংৰক্ষিত ছেটিংস সঠিকভাৱে প্ৰযোজ্য নোহ’লে, Thunderbird ৰিষ্টাৰ্ট কৰি পুনৰ চেষ্টা কৰক। (Thunderbird এ ছেছন জুড়ে কিছুমান অৱস্থা ক্যাশ কৰি ৰাখিব পাৰে; ৰিষ্টাৰ্টে তাজা ছেটিং ল’ড নিশ্চিত কৰে।)

---

### CI আৰু কভাৰেজ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) এ কভাৰেজ থ্ৰেশ’ল্ডসহ vitest চলায় (85% lines/functions/branches/statements)। থ্ৰেশ’ল্ড পূৰণ নাহিলে, জ’ব ফেইল কৰে।
- ৱাৰ্কফ্ল’ৱ’এ HTML ৰিপ’ৰ্টসহ `coverage-html` নামৰ এটা আৰ্টিফেক্ট আপল’ড কৰে; রান পেইজৰ পৰা ডাউনল’ড কৰক (Actions → সৰ্বশেষ রান → Artifacts)।

---

### অৱদান {#contributing}

- শাখা/কমিট/PR গাইডলাইনৰ বাবে CONTRIBUTING.md চাওক
- টিপ: আপোনাৰ দৈনন্দিন প্ৰ’ফাইল প্ৰভাৱিত নকৰাকৈ পৰীক্ষাৰ বাবে পৃথক Thunderbird ডেভেলপমেন্ট প্ৰ’ফাইল বনাওক।

---

### অনুবাদসমূহ

- বৃহৎ “all → all” অনুবাদ জ’ব চলোৱা ধীৰ গতিৰ আৰু ব্যয়বহুল হ’ব পাৰে। প্ৰথমে এটা উপসেট (যেমন, কিছুমান দস্তাবেজ আৰু ১–২টা লোকেল) লৈ আৰম্ভ কৰক, ফলাফল পৰ্যালোচনা কৰক, তাৰ পিছত বিস্তাৰ কৰক।

---

- ৰিট্ৰাই নীতি: অনুবাদ জ’বসমূহ API ত ত্ৰুটি হ’লে এক্স’প’নেঞ্চিয়েল ব্যাকঅ’ফসহ সৰ্বোচ্চ ৩বাৰলৈ পুনৰ চেষ্টা কৰে; `scripts/translate_web_docs_batch.js` আৰু `scripts/translate_web_docs_sync.js` চাওক।

দস্তাবেজৰ বাবে স্ক্ৰীণশ্বটসমূহ

- ছবিসমূহ `website/static/img/` ত সংৰক্ষণ কৰক।
- MD/MDX ত `useBaseUrl('/img/<filename>')` ৰ জৰিয়তে উল্লেখ কৰক যাতে ছাইটৰ `baseUrl` ৰ সৈতে পথসমূহ কৰ্মক্ষম থাকে।
- `website/static/img/` ত ছবি যোগ বা নাম সলনি কৰাৰ পিছত, সকলো উল্লেখ এতিয়াও `useBaseUrl('/img/…')` ব্যৱহাৰ কৰিছে আৰু লোকেল প্ৰিভিউত ৰেণ্ডাৰ হৈছে নে নাই নিশ্চিত কৰক।
  ফেভিকন

- বহু‑আকাৰৰ `favicon.ico` টো Make + স্ক্ৰিপ্টসমূহে সকলো বিল্ড পথত স্বয়ংক্ৰিয়ভাৱে সৃষ্টি কৰে (`website/scripts/build-favicon.mjs` ৰ জৰিয়তে)।
- কোনো মেনুৱেল স্তৰ দরকাৰ নাই; `icon-*.png` আপডেট কৰাটোৱেই যথেষ্ট।
  পৰ্যালোচনা সূচনা

- অনুবাদিত দস্তাবেজত ফ্ৰণ্ট‑মেটাৰ `id` অপৰিবর্তিত ৰাখক; যদিহে থাকে, কেৱল `title` আৰু `sidebar_label` অনুবাদ কৰক।

#### clean {#mt-clean}

- উদ্দেশ্য: স্থানীয় build/preview আৰ্টিফেক্টসমূহ আঁতৰোৱা।
- ব্যৱহাৰ: `make clean`
- আঁতৰায় (থাকিলে):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- উদ্দেশ্য: ফৰমেট, টেষ্ট, চেঞ্জলগ আপডেট, কমিট, আৰু পুশ।
- ব্যৱহাৰ: `make commit`
- বিৱৰণ: Prettier (write), `make test`, `make test_i18n` চলায়; ষ্টেইজ্ড ডিফ্‌ছ থাকিলে চেঞ্জলগ সংযোজন কৰে; `origin/<branch>` ত পুশ কৰে।

---

#### eslint {#mt-eslint}

- উদ্দেশ্য: ফ্লেট কনফিগৰ জৰিয়তে ESLint চলোৱা।
- ব্যৱহাৰ: `make eslint`

---

#### help {#mt-help}

- উদ্দেশ্য: এক‑শাৰী দস্তাবেজসহ সকলো লক্ষ্য তালিকাভুক্ত কৰা।
- ব্যৱহাৰ: `make help`

---

#### lint {#mt-lint}

- উদ্দেশ্য: `web-ext` ব্যৱহাৰ কৰি MailExtension লিন্ট কৰা।
- ব্যৱহাৰ: `make lint`
- টীপপত্ৰ: অস্থায়ীভাৱে `sources/manifest_LOCAL.json` → `sources/manifest.json` কপি কৰে; বিল্ড কৰা ZIP উপেক্ষা কৰে; সতর্কতাই পাইপলাইন ফেইল নকৰে।

---

#### menu {#mt-menu}

- উদ্দেশ্য: এটা Make লক্ষ্য আৰু ঐচ্ছিক আৰ্গুমেন্ট বাছনিৰ বাবে ইন্টাৰেক্টিভ মেনু।
- ব্যৱহাৰ: কোনো আৰ্গুমেন্ট নোহোৱাকৈ `make` চলাওক।
- টীপপত্ৰ: `whiptail` উপলব্ধ নাথাকিলে, মেনুটো `make help` লৈ ফলবেক কৰে।

---

#### pack {#mt-pack}

- উদ্দেশ্য: ATN আৰু LOCAL ZIP নিৰ্মাণ ( `lint` ৰ ওপৰত নিৰ্ভৰশীল)।
- ব্যৱহাৰ: `make pack`
- টিপ: পেকেজিংৰ আগতে `sources/manifest_*.json` উভয়তে সংস্কৰণ বাম্প কৰক।

---

#### prettier {#mt-prettier}

- উদ্দেশ্য: ৰেপ’ক ঠাইতে ফৰমেট কৰা।
- ব্যৱহাৰ: `make prettier`

#### prettier_check {#mt-prettier_check}

- উদ্দেশ্য: ফৰমেটিং যাচাই (লিখে নাযায়)।
- ব্যৱহাৰ: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- উদ্দেশ্য: `prettier` ৰ এলিয়াছ।
- ব্যৱহাৰ: `make prettier_write`

---

#### test {#mt-test}

- উদ্দেশ্য: Prettier (write), ESLint, তাৰ পিছত Vitest চলোৱা (ইনষ্টল থাকিলে কভাৰেজ)।
- ব্যৱহাৰ: `make test`

#### test_i18n {#mt-test_i18n}

- উদ্দেশ্য: এড‑অন ষ্ট্ৰিং আৰু ৱেবছাইট দস্তাবেজৰ i18n‑কেন্দ্ৰিত টেষ্ট।
- ব্যৱহাৰ: `make test_i18n`
- চলে: `npm run test:i18n` আৰু `npm run -s test:website-i18n`।

---

#### translate_app / translation_app {#mt-translation-app}

- উদ্দেশ্য: EN ৰ পৰা অন্য লোকেললৈ এড‑অন UI ষ্ট্ৰিংসমূহ অনুবাদ কৰা।
- ব্যৱহাৰ: `make translation_app OPTS="--locales all|de,fr"`
- টীপপত্ৰ: কী গঠন আৰু প্লেছহ’ল্ডাৰ সংৰক্ষণ কৰে; `translation_app.log` ল’গ কৰে। স্ক্ৰিপ্ট ৰূপ: `node scripts/translate_app.js --locales …`।

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- উদ্দেশ্য: ৱেবছাইট দস্তাবেজ `website/docs/*.md` ৰ পৰা `website/i18n/<locale>/...` লৈ অনুবাদ।
- অগ্ৰাধিকাৰযোগ্য: `translate_web_docs_batch` (OpenAI Batch API)
  - ব্যৱহাৰ (ফ্লেগ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - লিগেচি পজিচনেল এতিয়াও গ্ৰহণযোগ্য: `OPTS="<doc|all> <lang|all>"`
- আচৰণ: JSONL বিল্ড কৰে, আপল’ড কৰে, ৩০ ছেকেণ্ড অন্তৰে প’ল কৰে, ফলাফল ডাউনল’ড কৰি ফাইল লিখে।
- টিপপত্ৰ: ব্যাচ জ’ব সম্পূৰ্ণ হ’বলৈ সৰ্বোচ্চ ২৪ ঘণ্টালৈ লাগিব পাৰে (OpenAI ৰ ব্যাচ উইণ্ড’ অনুসৰি)। ক’নচ’লত প্ৰতিটো প’লত elapsed time দেখা যায়।
- Env: `OPENAI_API_KEY` (বাধ্যতামূলক), ঐচ্ছিক `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ডিফ’ল্ট 24h), `BATCH_POLL_INTERVAL_MS`।
- লিগেচি: `translate_web_docs_sync`
  - ব্যৱহাৰ (ফ্লেগ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - লিগেচি পজিচনেল এতিয়াও গ্ৰহণযোগ্য: `OPTS="<doc|all> <lang|all>"`
- আচৰণ: প্ৰতিটো জোড়াৰ বাবে সিঙ্ক্ৰ’নাছ অনুৰোধ (কোনো ব্যাচ একত্রীকৰণ নাই)।
- টিপপত্ৰ: `OPTS` বাদ পৰিলে ইন্টাৰেক্টিভ প্ৰম্প্ট থাকে। দুয়ো ম’ডে ক’ড ব্লক/ইনলাইন ক’ড সংৰক্ষণ কৰে আৰু ফ্ৰণ্ট‑মেটাৰ `id` অপৰিবর্তিত ৰাখে; ল’গ কৰে `translation_web_batch.log` (ব্যাচ) বা `translation_web_sync.log` (ছিংক) লৈ।

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- উদ্দেশ্য: হ’মপেইজ, নেভবাৰ, ফুটাৰ UI ষ্ট্ৰিংসমূহ `website/i18n/en/code.json` ৰ পৰা `website/i18n/<locale>/code.json` ৰ সকলো লোকেললৈ ( `en` বাদ দি) অনুবাদ।
- ব্যৱহাৰ: `make translate_web_index` বা `make translate_web_index OPTS="--locales de,fr [--force]"`
- আবশ্যকতা: `OPENAI_API_KEY` এক্স’পৰ্ট কৰক (ঐচ্ছিক: `OPENAI_MODEL=gpt-4o-mini`)।
- আচৰণ: JSON গঠন বৈধতা কৰে, কুৰলি‑ব্ৰেচ প্লেছহ’ল্ডাৰ সংৰক্ষণ কৰে, URL অপৰিবর্তিত ৰাখে, আৰু বৈধতা ত্ৰুটি হলে ফিডব্যাকসহ পুনৰ চেষ্টা কৰে।

---

#### web_build {#mt-web_build}

- উদ্দেশ্য: দস্তাবেজ ছাইট `website/build` লৈ বিল্ড কৰা।
- ব্যৱহাৰ: `make web_build OPTS="--locales en|de,en|all"` (বা `BUILD_LOCALES="en de"` ছেট কৰক)
- ভিতৰকা কাম: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`।
- নির্ভৰতা: `website/node_modules/@docusaurus` নাই থাকিলে কেৱল `website/` ত `npm ci` চলায়।

#### web_build_linkcheck {#mt-web_build_linkcheck}

- উদ্দেশ্য: অফলাইন‑সুৰক্ষিত লিংক চেক।
- ব্যৱহাৰ: `make web_build_linkcheck OPTS="--locales en|all"`
- টীপপত্ৰ: `tmp_linkcheck_web_pages` লৈ বিল্ড কৰে; GH Pages `baseUrl` ক `/` লৈ ৰিৰাইট কৰে; দূৰৱৰ্তী HTTP(S) লিংক স্কিপ কৰে।

#### web_build_local_preview {#mt-web_build_local_preview}

- উদ্দেশ্য: ঐচ্ছিক টেষ্ট/লিংক‑চেকসহ স্থানীয় gh‑pages প্ৰিভিউ।
- ব্যৱহাৰ: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- আচৰণ: প্ৰথমে Node প্ৰিভিউ ছাৰ্ভাৰ চেষ্টা কৰে (`scripts/preview-server.mjs`, `/__stop` সমৰ্থন কৰে), নাছকলে `python3 -m http.server` লৈ ফলবেক কৰে; 8080–8090 ত সেৱা দিয়ে; PID `web-local-preview/.server.pid` ত থাকে।

#### web_push_github {#mt-web_push_github}

- উদ্দেশ্য: `website/build` ক `gh-pages` শাখালৈ পুশ কৰা।
- ব্যৱহাৰ: `make web_push_github`

টিপ: Makefile এ ব্যৱহাৰ কৰা পেকেজ মেনেজাৰ অভাৰ্ৰাইড কৰিবলৈ `NPM=…` ছেট কৰক (ডিফ’ল্ট `npm`)।

---
