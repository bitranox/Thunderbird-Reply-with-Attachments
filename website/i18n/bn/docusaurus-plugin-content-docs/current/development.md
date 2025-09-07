---
id: development
title: ডেভেলপমেন্ট
sidebar_label: ডেভেলপমেন্ট
---

## ডেভেলপমেন্ট গাইড

### প্রয়োজনীয়তা

- Node.js 18+ এবং npm
- Thunderbird 128 ESR বা নতুনতর (ম্যানুয়াল টেস্টিংয়ের জন্য)

### প্রকল্প বিন্যাস (উচ্চ‑স্তর)

- Root: প্যাকেজিং স্ক্রিপ্ট `distribution_zip_packer.sh`, ডকস, স্ক্রিনশট
- `sources/`: মূল অ্যাড‑অন কোড (background, options/popup UI, manifests, icons)
- `tests/`: Vitest suite
- `website/`: Docusaurus ডকস (i18n `website/i18n/de/...` এর অধীনে)

### ইনস্টল ও টুলিং

- Root ডিপেন্ডেন্সি ইনস্টল: `npm ci`
- ডকস (ঐচ্ছিক): `cd website && npm ci`
- টার্গেট আবিষ্কার: `make help`

### বিল্ড ও প্যাকেজ

- ZIP বানান: `make pack`
  - রেপো রুটে ATN এবং LOCAL ZIP তৈরি করে (আর্টিফ্যাক্ট হাতে এডিট করবেন না)
  - টিপ: প্যাকেজিংয়ের আগে `sources/manifest_ATN.json` এবং `sources/manifest_LOCAL.json`‑এ ভার্সন আপডেট করুন
- ম্যানুয়াল ইনস্টল (ডেভ): Thunderbird → Tools → Add‑ons and Themes → গিয়ার → Install Add‑on From File… → তৈরি ZIP নির্বাচন করুন

### টেস্ট

- ফুল সুইট: `make test` (Vitest)
- কভারেজ (ঐচ্ছিক):
  - `npm i -D @vitest/coverage-v8`
  - `make test` চালান; HTML রিপোর্টের জন্য `coverage/index.html` খুলুন
- কেবল i18n: `make test-i18n` (parity, placeholders, titles)

### ডিবাগিং ও লগ

- Error Console: Tools → Developer Tools → Error Console
- রানটাইমে ভার্বোজ লগ টগল:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- Reply compose/send চলার সময় লগ দেখা যাবে

### ডকস (ওয়েবসাইট)

- ডেভ সার্ভার: `cd website && npm run start`
- স্ট্যাটিক সাইট বিল্ড: `cd website && npm run build`
- i18n: ইংরেজি `website/docs/*.md`; জার্মান অনুবাদ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- সার্চ: CI‑তে Algolia DocSearch env vars (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) সেট থাকলে সাইট Algolia সার্চ ব্যবহার করবে; না হলে লোকাল সার্চে fallback। হোমপেজে `/` বা `Ctrl+K` চাপুন।

### নিরাপত্তা ও কনফিগারেশন টিপস

- `sources/manifest.json` কমিট করবেন না (বিল্ড সাময়িকভাবে তৈরি করে)
- আপডেট চ্যানেল টিকিয়ে রাখতে `browser_specific_settings.gecko.id` স্থির রাখুন

### সমস্যার সমাধান

- Thunderbird 128 ESR বা নতুনতর ব্যবহার করুন
- রানটাইম ইস্যুর জন্য Error Console ব্যবহার করুন

### CI ও কভারেজ

- GitHub Actions (`CI — Tests`) vitest চালায় কভারেজ থ্রেশহোল্ডসহ (85% lines/functions/branches/statements)। থ্রেশহোল্ড না মিললে জব ফেল হবে।
- ওয়ার্কফ্লো একটি `coverage-html` আর্টিফ্যাক্ট আপলোড করে; রান পেজ থেকে ডাউনলোড করুন (Actions → latest run → Artifacts)।

### অবদান

- ব্রাঞ্চ/কমিট/PR গাইডলাইনের জন্য CONTRIBUTING.md দেখুন
