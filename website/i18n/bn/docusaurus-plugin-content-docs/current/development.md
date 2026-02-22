---
id: development
title: 'উন্নয়ন'
sidebar_label: 'উন্নয়ন'
---

---

## উন্নয়ন নির্দেশিকা {#development-guide}

:::note শুধু ইংরেজি সম্পাদনা করুন; অনুবাদগুলো স্বয়ংক্রিয়ভাবে ছড়িয়ে পড়বে
ডকুমেন্টেশন কেবলমাত্র `website/docs` (ইংরেজি) এর অধীনে আপডেট করুন। `website/i18n/<locale>/…` এর অধীনে থাকা অনুবাদগুলো জেনারেটেড এবং ম্যানুয়ালি সম্পাদনা করা উচিত নয়। লোকালাইজড কনটেন্ট রিফ্রেশ করতে অনুবাদ টাস্কগুলি ব্যবহার করুন (যেমন, `make translate_web_docs_batch`)।
:::

### পূর্বশর্ত {#prerequisites}

- Node.js 22+ এবং npm (Node 22 দিয়ে টেস্ট করা)
- Thunderbird 128 ESR বা তার নতুনতর (ম্যানুয়াল টেস্টিংয়ের জন্য)

---

### প্রকল্প কাঠামো (উচ্চ‑স্তর) {#project-layout-high-level}

- রুট: প্যাকেজিং স্ক্রিপ্ট `distribution_zip_packer.sh`, ডকস, স্ক্রিনশট
- `sources/`: মূল অ্যাড‑অন কোড (ব্যাকগ্রাউন্ড, অপশন/পপআপ UI, ম্যানিফেস্ট, আইকন)
- `tests/`: Vitest সুইট
- `website/`: Docusaurus ডকস (i18n রয়েছে `website/i18n/de/...` এর অধীনে)

---

### ইনস্টল ও টুলিং {#install-and-tooling}

- রুট ডিপেন্ডেন্সি ইনস্টল: `npm ci`
- ডকস (ঐচ্ছিক): `cd website && npm ci`
- টার্গেটগুলো দেখুন: `make help`

---

### লাইভ ডেভ (web‑ext run) {#live-dev-web-ext}

- Firefox Desktop‑এ দ্রুত লুপ (শুধু UI স্মোক‑টেস্ট):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird‑এ চালান (MailExtensions‑এর জন্য অগ্রাধিকারযোগ্য):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- টিপস:
- Thunderbird‑এর Error Console খোলা রাখুন (Tools → Developer Tools → Error Console)।
- MV3 ইভেন্ট পেজগুলো নিষ্ক্রিয় অবস্থায় সাসপেন্ড থাকে; কোড বদলানোর পর অ্যাড‑অনটি রিলোড করুন, অথবা web‑ext‑কে অটো‑রিলোড করতে দিন।
- কিছু Firefox‑শুধু আচরণ ভিন্ন হতে পারে; API সমতার জন্য সবসময় Thunderbird‑এ যাচাই করুন।
- Thunderbird বাইনারি পাথ (উদাহরণ):
- Linux: `thunderbird` (যেমন, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- প্রোফাইল আলাদা রাখা: আপনার দৈনন্দিন সেটআপে প্রভাব এড়াতে ডেভেলপমেন্টের জন্য আলাদা Thunderbird প্রোফাইল ব্যবহার করুন।

---

### মেক টার্গেট (বর্ণানুক্রমিক) {#make-targets-alphabetical}

Makefile সাধারণ ডেভ ফ্লোগুলো স্ট্যান্ডার্ডাইজ করে। প্রতিটি টার্গেটের এক‑লাইনের সারাংশ দেখতে যেকোনো সময়ে `make help` চালান।

টিপ: কোনো টার্গেট ছাড়া `make` চালালে টার্গেট বেছে নেওয়ার জন্য একটি সাধারণ Whiptail মেনু খোলে।

| টার্গেট                                                  | এক‑লাইনের বর্ণনা                                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | লোকাল বিল্ড/প্রিভিউ আর্টিফ্যাক্ট মুছুন (tmp/, web-local-preview/, website/build/)।  |
| [`commit`](#mt-commit)                                   | ফরম্যাট, টেস্ট (i18n সহ) চালান, চেঞ্জলগ আপডেট, কমিট ও পুশ।                          |
| [`eslint`](#mt-eslint)                                   | ফ্ল্যাট কনফিগের মাধ্যমে ESLint চালান (`npm run -s lint:eslint`)।                    |
| [`help`](#mt-help)                                       | সব টার্গেট এক‑লাইনের ডক্সসহ তালিকাবদ্ধ করুন (সাজানো)।                               |
| [`lint`](#mt-lint)                                       | `sources/`‑এ web‑ext lint (অস্থায়ী ম্যানিফেস্ট; ZIP উপেক্ষা; নন‑ফ্যাটাল)।           |
| [`menu`](#mt-menu)                                       | ইন্টার‌্যাকটিভ মেনু দিয়ে টার্গেট এবং ঐচ্ছিক আর্গুমেন্ট বেছে নিন।                    |
| [`pack`](#mt-pack)                                       | ATN ও LOCAL ZIP বিল্ড (লিন্টার চালায়; প্যাকার স্ক্রিপ্ট কল করে)।                    |
| [`prettier`](#mt-prettier)                               | রিপোজিটরি ইন‑প্লেস ফরম্যাট করুন (চেঞ্জ লিখে)।                                       |
| [`prettier_check`](#mt-prettier_check)                   | Prettier চেক মোডে (কোনো রাইট নয়); রিফরম্যাট দরকার হলে ফেল করবে।                     |
| [`prettier_write`](#mt-prettier_write)                   | `prettier`‑এর অ্যালিয়াস।                                                            |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, তারপর Vitest (কনফিগ থাকলে কভারেজ)।                        |
| [`test_i18n`](#mt-test_i18n)                             | শুধু i18n টেস্ট: অ্যাড‑অন প্লেসহোল্ডার/প্যারিটি + ওয়েবসাইট প্যারিটি।                |
| [`translate_app`](#mt-translation-app)                   | `translation_app`‑এর অ্যালিয়াস।                                                     |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` থেকে অ্যাপ UI স্ট্রিং অনুবাদ করুন।              |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API দিয়ে ওয়েবসাইট ডকস অনুবাদ (অগ্রাধিকারযোগ্য)।                        |
| [`translate_web_docs_sync`](#mt-translation-web)         | ওয়েবসাইট ডকস সিঙ্ক্রোনাসলি অনুবাদ (লিগেসি, নন‑ব্যাচ)।                               |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index`‑এর অ্যালিয়াস।                                               |
| [`translation_web_index`](#mt-translation_web_index)     | হোমপেজ/নেভবার/ফুটার UI অনুবাদ (`website/i18n/en/code.json → .../<lang>/code.json`)। |
| [`web_build`](#mt-web_build)                             | ডকস বিল্ড করুন `website/build` এ (সমর্থন করে `--locales` / `BUILD_LOCALES`)।        |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | অফলাইন‑নিরাপদ লিংক চেক (রিমোট HTTP[S] স্কিপ করে)।                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | লোকাল gh‑pages প্রিভিউ; 8080–8090‑এ অটো‑সার্ভ; ঐচ্ছিক টেস্ট/লিংক‑চেক।               |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`‑কে `gh-pages` ব্রাঞ্চে পুশ করুন।                                    |

অপশনের সিনট্যাক্স

- অপশন পাস করতে `make <command> OPTS="…"` ব্যবহার করুন (কোটস সুপারিশকৃত)। নিচের প্রতিটি টার্গেটে উদাহরণ ব্যবহার দেখানো আছে।

--

-

#### লোকেল বিল্ড টিপস {#locale-build-tips}

- কিছু লোকেলের সাবসেট বিল্ড করুন: `BUILD_LOCALES="en de"` সেট করুন বা ওয়েব টার্গেটে `OPTS="--locales en,de"` পাস করুন।
- নির্দিষ্ট লোকেল প্রিভিউ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`।

---

### বিল্ড ও প্যাকেজ {#build-and-package}

- ZIP বিল্ড: `make pack`
- রিপোরুটে ATN এবং LOCAL ZIP তৈরি করে (আর্টিফ্যাক্টগুলো হাতে বদলাবেন না)
- টিপ: প্যাকেজিংয়ের আগে `sources/manifest_ATN.json` এবং `sources/manifest_LOCAL.json` উভয়ের ভার্সন আপডেট করুন
- ম্যানুয়াল ইনস্টল (ডেভ): Thunderbird → Tools → Add‑ons and Themes → গিয়ার → Install Add‑on From File… → বানানো ZIP নির্বাচন করুন

---

### টেস্ট {#test}

- ফুল সুইট: `make test` (Vitest)
- কভারেজ (ঐচ্ছিক):
- `npm i -D @vitest/coverage-v8`
- `make test` চালান; HTML রিপোর্টের জন্য `coverage/index.html` খুলুন
- কেবল i18n: `make test_i18n` (UI কী/প্লেসহোল্ডার/টাইটেল + ওয়েবসাইটে প্রতি‑লোকেলে প্রতি‑ডকে প্যারিটি, id/title/sidebar_label চেকসহ)

---

### ডিবাগিং ও লগস {#debugging-and-logs}

- Error Console: Tools → Developer Tools → Error Console
- রানটাইমে ভার্বোজ লগ টগল করুন:
- সক্ষম করুন: `messenger.storage.local.set({ debug: true })`
- নিষ্ক্রিয় করুন: `messenger.storage.local.set({ debug: false })`
- রিপ্লাই কম্পোজ/সেন্ড করার সময় লগ দেখা যাবে

---

### ডকস (ওয়েবসাইট) {#docs-website}

- ডেভ সার্ভার: `cd website && npm run start`
- স্ট্যাটিক সাইট বিল্ড: `cd website && npm run build`
- সমতুল্য মেক টার্গেট (বর্ণানুক্রমিক): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ব্যবহার উদাহরণ:
- শুধু EN, টেস্ট/লিংক‑চেক স্কিপ, কোনো পুশ নয়: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- সব লোকেল, টেস্ট/লিংক‑চেকসহ, তারপর পুশ: `make web_build_local_preview && make web_push_github`
- পাবলিশ করার আগে, অফলাইন‑নিরাপদ লিংক চেক চালান: `make web_build_linkcheck`।
- i18n: ইংরেজি আছে `website/docs/*.md`‑এ; জার্মান অনুবাদ আছে `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`‑এ
- সার্চ: যদি CI‑তে Algolia DocSearch env ভ্যারিয়েবল সেট থাকে (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), সাইট Algolia সার্চ ব্যবহার করবে; নাহলে লোকাল সার্চে ফিরে যাবে। হোমপেজে, সার্চ বক্স খোলার জন্য `/` বা `Ctrl+K` চাপুন।

---

#### ডোনেট রিডাইরেক্ট রুট {#donate-redirect}

- `website/src/pages/donate.js`
- রুট: `/donate` (এবং `/<locale>/donate`)
- আচরণ:
- বর্তমান রুটে লোকেল থাকলে (যেমন, `/de/donate`), সেটাই ব্যবহার করুন
- নাহলে, `navigator.languages` বনাম কনফিগার করা লোকেলগুলোর মধ্যে সেরা মিল বেছে নিন; ডিফল্ট লোকেলে ফলব্যাক করুন
- রিডাইরেক্ট হবে:
- `en` → `/docs/donation`
- অন্যান্য → `/<locale>/docs/donation`
- সঠিক baseUrl হ্যান্ডলিংয়ের জন্য `useBaseUrl` ব্যবহার করে
- ফলোব্যাক হিসেবে মেটা রিফ্রেশ + `noscript` লিংক অন্তর্ভুক্ত

---

---

#### প্রিভিউ টিপস {#preview-tips}

- Node প্রিভিউ পরিষ্কারভাবে বন্ধ করুন: `http://localhost:<port>/__stop` খুলুন (`Local server started`‑এর পর প্রিন্ট হয়)।
- MDX/JSX‑এ ছবি লোড না হলে, সাইটের `baseUrl` সম্মান করতে `useBaseUrl('/img/...')` ব্যবহার করুন।
- প্রিভিউ আগে শুরু হয়; পরে লিংক চেক চালে এবং ব্লকিং নয় (ভাঙা এক্সটার্নাল লিংক প্রিভিউ আটকাবে না)।
- উদাহরণ প্রিভিউ URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (“Local server started”‑এর পর প্রিন্ট হয়)।
- লিংক‑চেকে এক্সটার্নাল লিংক: কিছু এক্সটার্নাল সাইট (যেমন, addons.thunderbird.net) স্বয়ংক্রিয় ক্রলার ব্লক করে এবং 403 দেখাতে পারে। প্রিভিউ তবুও শুরু হবে; এগুলো নিরাপদে উপেক্ষা করা যায়।

---

#### ওয়েবসাইট অনুবাদ করুন {#translate-website}

আপনি কী অনুবাদ করতে পারেন

- শুধু ওয়েবসাইট UI: হোমপেজ, নেভবার, ফুটার, এবং অন্যান্য UI স্ট্রিং। ডকস কনটেন্ট আপাতত ইংরেজি‑শুধু থাকবে।

কোথায় সম্পাদনা করবেন

- `website/i18n/<locale>/code.json` সম্পাদনা করুন (`en` রেফারেন্স হিসেবে ব্যবহার করুন)। `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`‑এর মতো প্লেসহোল্ডার অপরিবর্তিত রাখুন।

ফাইল জেনারেট বা রিফ্রেশ করুন

- সব লোকেলের জন্য মিসিং স্টাব তৈরি করুন: `npm --prefix website run i18n:stubs`
- ইংরেজি থেকে স্টাব ওভাররাইট করুন (নতুন স্ট্রিং যোগ করার পর): `npm --prefix website run i18n:stubs:force`
- একক লোকেলের জন্য বিকল্প: `npx --prefix website docusaurus write-translations --locale <locale>`

হোমপেজ/নেভবার/ফুটার UI স্ট্রিং অনুবাদ (OpenAI)

- একবার ক্রেডেনশিয়াল সেট করুন (শেল বা .env):
- `export OPENAI_API_KEY=sk-...`
- ঐচ্ছিক: `export OPENAI_MODEL=gpt-4o-mini`
- ওয়ান‑শট (সব লোকেল, en স্কিপ): `make translate_web_index`
- নির্দিষ্ট লোকেলে সীমিত করুন: `make translate_web_index OPTS="--locales de,fr"`
- বিদ্যমান মান ওভাররাইট করুন: `make translate_web_index OPTS="--force"`

ভ্যালিডেশন ও রিট্রাই

- ট্রান্সলেশন স্ক্রিপ্ট JSON শেপ ভ্যালিডেট করে, কার্লি‑ব্রেস প্লেসহোল্ডার সংরক্ষণ করে, এবং URL অপরিবর্তিত রাখে।
- ভ্যালিডেশন ব্যর্থ হলে, ফিডব্যাকসহ সর্বোচ্চ 2 বার পর্যন্ত রিট্রাই করে; তারপর বিদ্যমান মান রেখেই দেয়।

আপনার লোকেল প্রিভিউ করুন

- ডেভ সার্ভার: `npm --prefix website run start`
- ভিজিট করুন `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

সাবমিট করা

- সম্পাদিত `code.json` ফাইল(গুলো) সহ একটি PR খুলুন। পরিবর্তনগুলো ফোকাসড রাখুন এবং সম্ভব হলে একটি দ্রুত স্ক্রিনশট দিন।

---

### নিরাপত্তা ও কনফিগারেশন টিপস {#security-and-configuration-tips}

- `sources/manifest.json` কমিট করবেন না (বিল্ড চলাকালীন অস্থায়ীভাবে তৈরি হয়)
- আপডেট চ্যানেল বজায় রাখতে `browser_specific_settings.gecko.id` স্থিতিশীল রাখুন

---

### সেটিংসের স্থায়িত্ব {#settings-persistence}

- স্টোরেজ: সব ইউজার সেটিংস থাকে `storage.local`‑এ এবং অ্যাড‑অন আপডেট জুড়ে টিকে থাকে।
- ইনস্টল: কেবল তখনই ডিফল্ট প্রয়োগ হয় যখন কোনো কী সম্পূর্ণভাবে অনুপস্থিত (undefined)।
- আপডেট: মাইগ্রেশন কেবল মিসিং কীগুলো পূরণ করে; বিদ্যমান মান কখনও ওভাররাইট হয় না।
- স্কিমা মার্কার: `settingsVersion` (বর্তমানে `1`)।
- কী ও ডিফল্টসমূহ:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- কোড: দেখুন `sources/background.js` → `initializeOrMigrateSettings()` এবং `SCHEMA_VERSION`।

ডেভ ওয়ার্কফ্লো (নতুন সেটিং যোগ করা)

- `sources/background.js`‑এ `SCHEMA_VERSION` বাম্প করুন।
- `initializeOrMigrateSettings()`‑এ `DEFAULTS` অবজেক্টে নতুন কী + ডিফল্ট যোগ করুন।
- ডিফল্ট সিড করার সময় "only‑if‑undefined" নিয়ম ব্যবহার করুন; বিদ্যমান মান ওভাররাইট করবেন না।
- সেটিংটি ইউজার‑ভিজিবল হলে, `sources/options.js`‑এ সংযোগ করুন এবং লোকালাইজড স্ট্রিং যোগ করুন।
- টেস্ট যোগ/সমন্বয় করুন (`tests/background.settings.migration.test.js` দেখুন)।

ম্যানুয়াল টেস্টিং টিপস

- ফ্রেশ ইনস্টল সিমুলেট: এক্সটেনশনের ডাটা ডির মুছুন বা নতুন প্রোফাইল দিয়ে শুরু করুন।
- আপডেট সিমুলেট: `storage.local`‑এ `settingsVersion`‑কে `0` সেট করুন এবং রিলোড করুন; নিশ্চিত করুন বিদ্যমান মান অপরিবর্তিত থাকে এবং কেবল মিসিং কীগুলো যোগ হয়।

---

### সমস্যা সমাধান {#troubleshooting}

- নিশ্চিত করুন Thunderbird 128 ESR বা নতুনতর
- রানটাইম সমস্যার জন্য Error Console ব্যবহার করুন
- যদি সংরক্ষিত সেটিংস ঠিকমতো প্রযোজ্য না হয় মনে হয়, Thunderbird রিস্টার্ট করে আবার চেষ্টা করুন। (Thunderbird সেশন জুড়ে স্টেট ক্যাশ করতে পারে; রিস্টার্ট নতুন সেটিংস লোড নিশ্চিত করে।)

---

### CI ও কাভারেজ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) vitest কভারেজ থ্রেশহোল্ডসহ চালায় (85% lines/functions/branches/statements)। থ্রেশহোল্ড না এলে জব ফেল করে।
- ওয়ার্কফ্লো একটি আর্টিফ্যাক্ট `coverage-html` হিসেবে HTML রিপোর্ট আপলোড করে; রান পেজ থেকে ডাউনলোড করুন (Actions → সর্বশেষ রান → Artifacts)।

---

### অবদান {#contributing}

- ব্রাঞ্চ/কমিট/PR নির্দেশিকার জন্য CONTRIBUTING.md দেখুন
- টিপ: দৈনন্দিন প্রোফাইলে প্রভাব এড়াতে টেস্টিংয়ের জন্য আলাদা Thunderbird ডেভেলপমেন্ট প্রোফাইল তৈরি করুন।

---

### অনুবাদসমূহ

- বড় “all → all” ট্রান্সলেশন জব ধীর ও ব্যয়বহুল হতে পারে। প্রথমে একটি সাবসেট (যেমন, কয়েকটি ডক ও ১–২টি লোকেল) দিয়ে শুরু করুন, ফলাফল রিভিউ করুন, তারপর প্রসারিত করুন।

---

- রিট্রাই নীতি: ট্রান্সলেশন জব API ত্রুটিতে এক্সপোনেনশিয়াল ব্যাকঅফসহ সর্বোচ্চ ৩ বার রিট্রাই করে; দেখুন `scripts/translate_web_docs_batch.js` এবং `scripts/translate_web_docs_sync.js`।

ডক্সের জন্য স্ক্রিনশট

- ছবি সংরক্ষণ করুন `website/static/img/`‑এর অধীনে।
- এগুলোকে MD/MDX‑এ `useBaseUrl('/img/<filename>')` এর মাধ্যমে রেফারেন্স করুন যাতে পাথগুলো সাইটের `baseUrl`‑এর সাথে কাজ করে।
- `website/static/img/`‑এর অধীনে ছবি যোগ বা রিনেম করার পর, নিশ্চিত করুন সব রেফারেন্স এখনও `useBaseUrl('/img/…')` ব্যবহার করছে এবং লোকাল প্রিভিউতে রেন্ডার হচ্ছে।
  ফেভিকনস

- মাল্টি‑সাইজ `favicon.ico` স্বয়ংক্রিয়ভাবে সব বিল্ড পাথে (Make + স্ক্রিপ্ট) `website/scripts/build-favicon.mjs` এর মাধ্যমে জেনারেট হয়।
- কোনো ম্যানুয়াল ধাপ প্রয়োজন নেই; `icon-*.png` আপডেট করলেই যথেষ্ট।
  রিভিউ টিপ

- অনুবাদিত ডকসে ফ্রন্ট‑ম্যাটারের `id` অপরিবর্তিত রাখুন; উপস্থিত থাকলে কেবল `title` এবং `sidebar_label` অনুবাদ করুন।

#### clean {#mt-clean}

- উদ্দেশ্য: লোকাল বিল্ড/প্রিভিউ আর্টিফ্যাক্ট মুছে ফেলা।
- ব্যবহার: `make clean`
- সরায় (থাকলে):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- উদ্দেশ্য: ফরম্যাট, টেস্ট, চেঞ্জলগ আপডেট, কমিট, এবং পুশ।
- ব্যবহার: `make commit`
- বিস্তারিত: Prettier (write), `make test`, `make test_i18n` চালায়; স্টেজড ডিফ থাকলে চেঞ্জলগ অ্যাপেন্ড করে; `origin/<branch>`‑এ পুশ করে।

---

#### eslint {#mt-eslint}

- উদ্দেশ্য: ফ্ল্যাট কনফিগের মাধ্যমে ESLint চালানো।
- ব্যবহার: `make eslint`

---

#### help {#mt-help}

- উদ্দেশ্য: এক‑লাইনের ডক্সসহ সব টার্গেট তালিকাবদ্ধ করা।
- ব্যবহার: `make help`

---

#### lint {#mt-lint}

- উদ্দেশ্য: `web-ext` ব্যবহার করে MailExtension লিন্ট করা।
- ব্যবহার: `make lint`
- নোট: অস্থায়ীভাবে কপি করে `sources/manifest_LOCAL.json` → `sources/manifest.json`; বানানো ZIP উপেক্ষা করে; ওয়ার্নিং পাইপলাইন ফেল করায় না।

---

#### menu {#mt-menu}

- উদ্দেশ্য: মেক টার্গেট ও ঐচ্ছিক আর্গুমেন্ট বেছে নেওয়ার ইন্টার‌্যাকটিভ মেনু।
- ব্যবহার: কোনো আর্গুমেন্ট ছাড়াই `make` চালান।
- নোট: যদি `whiptail` না থাকে, মেনু `make help`‑এ ফলব্যাক করে।

---

#### pack {#mt-pack}

- উদ্দেশ্য: ATN এবং LOCAL ZIP বিল্ড (নির্ভরশীল `lint`‑এর উপর)।
- ব্যবহার: `make pack`
- টিপ: প্যাকেজিংয়ের আগে `sources/manifest_*.json` উভয়ের ভার্সন বাম্প করুন।

---

#### prettier {#mt-prettier}

- উদ্দেশ্য: রিপো ইন‑প্লেস ফরম্যাট করা।
- ব্যবহার: `make prettier`

#### prettier_check {#mt-prettier_check}

- উদ্দেশ্য: ফরম্যাটিং যাচাই (কোনো রাইট নয়)।
- ব্যবহার: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- উদ্দেশ্য: `prettier`‑এর অ্যালিয়াস।
- ব্যবহার: `make prettier_write`

---

#### test {#mt-test}

- উদ্দেশ্য: Prettier (write), ESLint, তারপর Vitest চালানো (ইনস্টল থাকলে কভারেজ)।
- ব্যবহার: `make test`

#### test_i18n {#mt-test_i18n}

- উদ্দেশ্য: অ্যাড‑অন স্ট্রিং ও ওয়েবসাইট ডকসের i18n‑কেন্দ্রিক টেস্ট।
- ব্যবহার: `make test_i18n`
- চালায়: `npm run test:i18n` এবং `npm run -s test:website-i18n`।

---

#### translate_app / translation_app {#mt-translation-app}

- উদ্দেশ্য: EN থেকে অন্যান্য লোকেলে অ্যাড‑অন UI স্ট্রিং অনুবাদ করা।
- ব্যবহার: `make translation_app OPTS="--locales all|de,fr"`
- নোট: কী স্ট্রাকচার ও প্লেসহোল্ডার সংরক্ষণ করে; লগ লেখে `translation_app.log`‑এ। স্ক্রিপ্ট ফর্ম: `node scripts/translate_app.js --locales …`।

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- উদ্দেশ্য: ওয়েবসাইট ডকস `website/docs/*.md` থেকে `website/i18n/<locale>/...`‑এ অনুবাদ করা।
- অগ্রাধিকারযোগ্য: `translate_web_docs_batch` (OpenAI Batch API)
  - ব্যবহার (ফ্ল্যাগ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - লিগেসি পজিশনাল এখনও গ্রহণযোগ্য: `OPTS="<doc|all> <lang|all>"`
- আচরণ: JSONL বিল্ড, আপলোড, প্রতি 30সেক পোল, রেজাল্ট ডাউনলোড, ফাইল লেখা।
- নোট: ব্যাচ জব সম্পন্ন হতে সর্বোচ্চ 24 ঘণ্টা লাগতে পারে (OpenAI‑এর ব্যাচ উইন্ডো অনুসারে)। কনসোলে প্রতিটি পোলে অতিক্রান্ত সময় দেখায়।
- এনভ: `OPENAI_API_KEY` (আবশ্যক), ঐচ্ছিক `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ডিফল্ট 24h), `BATCH_POLL_INTERVAL_MS`।
- লিগেসি: `translate_web_docs_sync`
  - ব্যবহার (ফ্ল্যাগ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - লিগেসি পজিশনাল এখনও গ্রহণযোগ্য: `OPTS="<doc|all> <lang|all>"`
- আচরণ: সিঙ্ক্রোনাস প্রতি‑জুটি রিকোয়েস্ট (কোনো ব্যাচ এগ্রিগেশন নয়)।
- নোট: `OPTS` বাদ দিলে ইন্টার‌্যাকটিভ প্রম্পট। উভয় মোড কোড ব্লক/ইনলাইন কোড সংরক্ষণ করে এবং ফ্রন্ট‑ম্যাটার `id` অপরিবর্তিত রাখে; লগ লেখে `translation_web_batch.log` (ব্যাচ) বা `translation_web_sync.log` (সিঙ্ক)‑এ।

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- উদ্দেশ্য: `website/i18n/en/code.json` থেকে ওয়েবসাইট UI স্ট্রিং (হোমপেজ, নেভবার, ফুটার) অনুবাদ করে `website/i18n/<locale>/code.json`‑এর অধীনে সব লোকেলে ( `en` বাদে)।
- ব্যবহার: `make translate_web_index` বা `make translate_web_index OPTS="--locales de,fr [--force]"`
- আবশ্যকতা: `OPENAI_API_KEY` এক্সপোর্ট করুন (ঐচ্ছিক: `OPENAI_MODEL=gpt-4o-mini`)।
- আচরণ: JSON স্ট্রাকচার ভ্যালিডেট করে, কার্লি‑ব্রেস প্লেসহোল্ডার বজায় রাখে, URL অপরিবর্তিত রাখে, এবং ভ্যালিডেশন ত্রুটিতে ফিডব্যাকসহ রিট্রাই করে।

---

#### web_build {#mt-web_build}

- উদ্দেশ্য: ডকস সাইট বিল্ড করা `website/build`‑এ।
- ব্যবহার: `make web_build OPTS="--locales en|de,en|all"` (অথবা `BUILD_LOCALES="en de"` সেট করুন)
- ইন্টার্নালস: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`।
- ডিপস: কেবল `website/node_modules/@docusaurus` অনুপস্থিত থাকলেই `website/`‑এ `npm ci` চালায়।

#### web_build_linkcheck {#mt-web_build_linkcheck}

- উদ্দেশ্য: অফলাইন‑নিরাপদ লিংক চেক।
- ব্যবহার: `make web_build_linkcheck OPTS="--locales en|all"`
- নোট: `tmp_linkcheck_web_pages`‑এ বিল্ড করে; GH Pages `baseUrl` → `/` রিরাইট করে; রিমোট HTTP(S) লিংক স্কিপ করে।

#### web_build_local_preview {#mt-web_build_local_preview}

- উদ্দেশ্য: ঐচ্ছিক টেস্ট/লিংক‑চেকসহ লোকাল gh‑pages প্রিভিউ।
- ব্যবহার: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- আচরণ: আগে Node প্রিভিউ সার্ভার চেষ্টা করে (`scripts/preview-server.mjs`, সমর্থন করে `/__stop`), ব্যর্থ হলে `python3 -m http.server`‑এ ফলব্যাক; 8080–8090‑এ সার্ভ করে; PID থাকে `web-local-preview/.server.pid`‑এ।

#### web_push_github {#mt-web_push_github}

- উদ্দেশ্য: `website/build`‑কে `gh-pages` ব্রাঞ্চে পুশ করা।
- ব্যবহার: `make web_push_github`

টিপ: Makefile‑এ ব্যবহৃত প্যাকেজ ম্যানেজার ওভাররাইড করতে `NPM=…` সেট করুন (ডিফল্ট `npm`)।
