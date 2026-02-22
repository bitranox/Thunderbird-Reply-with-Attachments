---
id: install
title: 'ইনস্টলেচন'
slug: /install
sidebar_label: 'স্থাপন'
---

---

## "Thunderbird Add-ons and Themes" ৰ জৰিয়তে স্থাপন {#installation-in-thunderbird-recommended}

:::important ন্যূনতম Thunderbird সংস্কৰণ
এই এড‑অনে Thunderbird **128 ESR বা অধিক নতুন** সমৰ্থন কৰে। পুৰণা সংস্কৰণসমূহ সমৰ্থিত নহয়।
:::

এইটোৱে সুপারিশ কৰা স্থাপনৰ পদ্ধতি। ATN (addons.thunderbird.net) ৰ পৰা স্থাপিত এড‑অনৰ স্বয়ংক্ৰিয়ভাৱে আপডেট পায়। LOCAL/dev স্থাপনসমূহ স্বয়ংক্ৰিয়ভাৱে আপডেট নহয়।

- ন্যূনতম Thunderbird সংস্কৰণ: 128 ESR বা অধিক নতুন।

1. Thunderbirdত **Tools > Add-ons and Themes** লৈ যাওক।
2. "reply with attachments" অনুসন্ধান কৰক।
3. এড‑অনটো যোগ কৰক।

বা সোজাকৈ এড‑অনৰ পৃষ্ঠাটো খোলক: [Thunderbird এড‑অনসমূহ (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI ৰ পৰা হাতেকলমে স্থাপন {#local-installation-in-thunderbird}

### XPI ফাইলখন ডাউনল’ড কৰক {#download-the-xpi-file}

1. [Thunderbird এড‑অনৰ পৃষ্ঠা](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)লৈ যাওক।
2. এড‑অনৰ শেহতীয়া সংস্কৰণটো XPI ফাইল হিচাপে (`reply_with_attachments-x.y.z-tb.xpi`) ডাউনল’ড কৰক।

### Thunderbirdত স্থাপন কৰক {#install-in-thunderbird-local}

1. Thunderbird খোলক।
2. **Tools > Add-ons and Themes** লৈ যাওক।
3. **Add-ons Manager**ত, ওপৰৰ সোঁফালে থকা গিয়াৰ আইকনত ক্লিক কৰক।
4. মেনুৰ পৰা **Install Add-on From File…** বাছনি কৰক।
5. ডাউনল’ড কৰা `reply_with_attachments-x.y.z-tb.xpi` ফাইলটো বাছনি কৰক।
6. প্ৰম্প্ট কৰিলে স্থাপন নিশ্চিত কৰক।

---

## উন্নয়ন উদ্দেশ্যে স্থাপন {#installation-for-development}

### ৰেপ’জিটৰী ডাউনল’ড কৰক {#download-the-repository}

1. GitHub ৰেপ’জিটৰীৰ শেহতীয়া সংস্কৰণ ডাউনল’ড কৰক।
2. অধিক তথ্যৰ বাবে `make help` চলাওক।

### Thunderbirdত স্থাপন কৰক {#install-in-thunderbird-dev}

1. Thunderbird খোলক।
2. **Tools > Add-ons and Themes** লৈ যাওক।
3. **Add-ons Manager**ত, ওপৰৰ সোঁফালে থকা গিয়াৰ আইকনত ক্লিক কৰক।
4. মেনুৰ পৰা **Install Add-on From File…** বাছনি কৰক।
5. সৃষ্টি কৰা `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ফাইলটো বাছনি কৰক।
6. প্ৰম্প্ট কৰিলে স্থাপন নিশ্চিত কৰক।

টোকা: আপোনাৰ ছিষ্টেমত Thunderbird-এ যদি `.zip` গ্ৰহণ নকৰে, ইয়াৰ নাম সলনি কৰি `.xpi` কৰক আৰু পুনৰবাৰ “Install Add‑on From File…” চেষ্টা কৰক।

### LOCAL ZIP ক’ত পোৱা যাব {#where-local-zip}

- প্ৰথমে, এড‑অণটো পেকেজ কৰক: ৰেপ’জিটৰীৰ ৰুটত `make pack` চলাওক।
- পেকেজিংৰ পিছত, ৰেপ’জিটৰীৰ ৰুটত “LOCAL” zip খন সন্ধান কৰক (যেনে, `2025-..-reply-with-attachments-plugin-LOCAL.zip`)।
- পৰীক্ষাৰ বাবে পুনঃপেকেজিঙৰ আগতে, `sources/manifest_ATN.json` আৰু `sources/manifest_LOCAL.json` দুয়োটাত সংস্কৰণ বৃদ্ধি কৰক।

---

## নিষ্ক্ৰিয়, আনইনষ্টল, আৰু আপডেটসমূহ {#disable-uninstall-updates}

- নিষ্ক্ৰিয়: Thunderbird → Tools → Add‑ons and Themes → এড‑অণটো বিচাৰক → টগল অফ কৰক।
- আনইনষ্টল: একেটা ভিউ → তিন-ডট মেনু → Remove।
- আপডেটসমূহ: নতুন সংস্কৰণ অনুমোদিত হ’লে ATN স্থাপনসমূহে স্বয়ংক্ৰিয়ভাৱে আপডেট পায়। LOCAL/dev স্থাপনসমূহ স্বয়ংক্ৰিয়ভাৱে আপডেট নহয়; কোনো এটা নতুন LOCAL বিল্ড হাতেৰে পুনঃস্থাপন কৰক।
- ছেটিঙ্ সম্পূৰ্ণৰূপে আঁতৰাব: [গোপনীয়তা → তথ্য আঁতৰাওৱা](privacy#data-removal) চাওক।

আৰু চাওক

- [দ্ৰুত আৰম্ভণি](quickstart)
