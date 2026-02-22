---
id: install
title: 'ইনস্টলেশন'
slug: /install
sidebar_label: 'ইনস্টলেশন'
---

---

## "Thunderbird Add-ons and Themes" এর মাধ্যমে ইনস্টলেশন {#installation-in-thunderbird-recommended}

:::important সর্বনিম্ন Thunderbird সংস্করণ
এই অ্যাড‑অন Thunderbird **128 ESR বা তার নতুনতর** সংস্করণ সমর্থন করে। পুরোনো সংস্করণ সমর্থিত নয়।
:::

এটাই প্রস্তাবিত ইনস্টলেশন পদ্ধতি। ATN (addons.thunderbird.net) থেকে ইনস্টল করা অ্যাড‑অনগুলো স্বয়ংক্রিয়ভাবে আপডেট পায়। LOCAL/dev ইনস্টলগুলো স্বয়ংক্রিয়ভাবে আপডেট হয় না।

- সর্বনিম্ন Thunderbird সংস্করণ: 128 ESR বা তার নতুনতর।

1. Thunderbird‑এ **Tools > Add-ons and Themes** এ যান।
2. "reply with attachments" খুঁজুন।
3. অ্যাড‑অনটি যোগ করুন।

অথবা সরাসরি অ্যাড‑অন পেজটি খুলুন: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI থেকে ম্যানুয়াল ইনস্টলেশন {#local-installation-in-thunderbird}

### XPI ফাইল ডাউনলোড করুন {#download-the-xpi-file}

1. [Thunderbird অ্যাড‑অন পৃষ্ঠা](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)-এ যান।
2. অ্যাড‑অনটির সর্বশেষ সংস্করণটি XPI ফাইল (`reply_with_attachments-x.y.z-tb.xpi`) হিসেবে ডাউনলোড করুন।

### Thunderbird‑এ ইনস্টল করুন {#install-in-thunderbird-local}

1. Thunderbird খুলুন।
2. **Tools > Add-ons and Themes** এ যান।
3. **Add-ons Manager**‑এ, ডান‑উপরে থাকা গিয়ার আইকনে ক্লিক করুন।
4. মেনু থেকে **Install Add-on From File…** বেছে নিন।
5. ডাউনলোড করা `reply_with_attachments-x.y.z-tb.xpi` ফাইলটি নির্বাচন করুন।
6. প্রম্পট এলে ইনস্টলেশন নিশ্চিত করুন।

---

## ডেভেলপমেন্টের জন্য ইনস্টলেশন {#installation-for-development}

### রিপোজিটরি ডাউনলোড করুন {#download-the-repository}

1. GitHub রিপোজিটরির সর্বশেষ সংস্করণটি ডাউনলোড করুন।
2. আরও তথ্যের জন্য `make help` চালান।

### Thunderbird‑এ ইনস্টল করুন {#install-in-thunderbird-dev}

1. Thunderbird খুলুন।
2. **Tools > Add-ons and Themes** এ যান।
3. **Add-ons Manager**‑এ, ডান‑উপরে থাকা গিয়ার আইকনে ক্লিক করুন।
4. মেনু থেকে **Install Add-on From File…** বেছে নিন।
5. তৈরি হওয়া `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` ফাইলটি নির্বাচন করুন।
6. প্রম্পট এলে ইনস্টলেশন নিশ্চিত করুন।

নোট: আপনার সিস্টেমে Thunderbird যদি `.zip` গ্রহণ না করে, সেটিকে `.xpi` নামে রিনেম করে “Install Add‑on From File…” আবার চেষ্টা করুন।

### LOCAL ZIP কোথায় পাবেন {#where-local-zip}

- প্রথমে অ্যাড‑অনটি প্যাকেজ করুন: রিপোজিটরির রুটে `make pack` চালান।
- প্যাকেজিংয়ের পরে রিপোজিটরির রুটে “LOCAL” zip খুঁজে নিন (যেমন, `2025-..-reply-with-attachments-plugin-LOCAL.zip`)।
- টেস্টিংয়ের জন্য পুনরায় প্যাকেজ করার আগে, `sources/manifest_ATN.json` এবং `sources/manifest_LOCAL.json`—উভয়ের সংস্করণ নম্বর বাড়ান।

---

## নিষ্ক্রিয়, আনইনস্টল, এবং আপডেট {#disable-uninstall-updates}

- নিষ্ক্রিয়: Thunderbird → Tools → Add‑ons and Themes → অ্যাড‑অনটি খুঁজুন → টগল অফ করুন।
- আনইনস্টল: একই ভিউ → থ্রি‑ডট মেনু → Remove।
- আপডেট: নতুন সংস্করণ অনুমোদিত হলে ATN ইনস্টলগুলো স্বয়ংক্রিয়ভাবে আপডেট হয়। LOCAL/dev ইনস্টলগুলো স্বয়ংক্রিয়ভাবে আপডেট হয় না; নতুন LOCAL বিল্ড হাতে করে পুনরায় ইনস্টল করুন।
- সেটিংস পুরোপুরি অপসারণ: দেখুন [গোপনীয়তা → ডেটা অপসারণ](privacy#data-removal)।

আরও দেখুন

- [কুইকস্টার্ট](quickstart)
