---
id: donation
title: 'অনুদান দিন'
sidebar_label: 'দান করুন'
---

---

## অনুদান

import useBaseUrl from '@docusaurus/useBaseUrl';

আপনি যদি "Reply with Attachments" পছন্দ করেন এবং এর উন্নয়নে সহায়তা করতে চান, তাহলে এখানে অনুদান দিতে পারেন:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe-এর মাধ্যমে অনুদান দিন" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>অথবা</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal-এর মাধ্যমে অনুদান দিন" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>অথবা</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="আমাকে একটি কফি কিনে দিন" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="স্ক্যান করে আমাকে একটি কফি কিনে দিন"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

ধন্যবাদ! আপনার সহায়তা নতুন Thunderbird রিলিজের সঙ্গে সামঞ্জস্য বজায় রাখতে, অ্যাক্সেসিবিলিটি ও টেস্ট উন্নত করতে, এবং ডকুমেন্টেশনকে হালনাগাদ রাখতে সাহায্য করে।

নোট

- অনুদানের লিংকগুলো কেবল আপনি ক্লিক করলে খোলে; অ্যাড‑অন কোনো ব্যাকগ্রাউন্ড নেটওয়ার্ক অনুরোধ করে না।
- পুনরাবৃত্ত সহায়তা দীর্ঘমেয়াদি রক্ষণাবেক্ষণ ও সময়মতো আপডেটে সহায়তা করে, তবে এটি সম্পূর্ণ ঐচ্ছিক।

---

যদি ইমেজ বোতামগুলো লোড না হয়, অনুগ্রহ করে এর বদলে এই লিংকগুলো ব্যবহার করুন:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

অনুদান সম্পূর্ণ স্বেচ্ছাসেবী; কোনো ফিচার সীমাবদ্ধ করা হয় না।

---

## অনুদান দৃশ্যমানতা (৯০‑দিনের স্নুজ)

আপনি অনুদান দেওয়ার পর কিছু সময়ের জন্য অনুদান সংক্রান্ত প্রম্পট লুকিয়ে রাখতে অ্যাড‑অনটিতে একটি সুবিধাজনক ফিচার আছে।

- কোথায় পাওয়া যাবে
  - Options → Support সেকশন: আপনি একটি “I donated” বোতাম এবং একটি ছোট হিন্ট এলাকা দেখবেন।
  - Send‑confirmation ডায়ালগেও একটি Donate বোতাম দেখায়; স্নুজ সক্রিয় থাকলে এটি স্বয়ংক্রিয়ভাবে লুকিয়ে যায়।

- এটি কীভাবে কাজ করে
  - “I donated” এ ক্লিক করলে ৯০ দিনের জন্য অনুদান বোতাম ও সংশ্লিষ্ট প্রম্পটগুলো লুকিয়ে যায়।
  - একটি স্ট্যাটাস হিন্টে “Hidden until YYYY‑MM‑DD” (আপনার লোকাল তারিখে) দেখায়। এছাড়াও তাৎক্ষণিকভাবে দৃশ্যমানতা ফিরিয়ে আনার জন্য একটি “Show Donate again” বোতাম আছে।
  - ৯০ দিন পর Donate বোতাম আবার স্বয়ংক্রিয়ভাবে দৃশ্যমান হয়ে যায়।

- গোপনীয়তা ও সংরক্ষণ
  - স্নুজ সময়কাল মনে রাখতে অ্যাড‑অনটি Thunderbird-এর লোকাল স্টোরেজে একটি মাত্র টাইমস্ট্যাম্প সংরক্ষণ করে। কী: `donateHideUntil` (epoch milliseconds).
  - এই সেটিংটি আপনার Thunderbird প্রোফাইলের স্থানীয় (ক্লাউড‑সিঙ্ক নয়)। এই ফিচার কোনো নেটওয়ার্ক অনুরোধ করে না।

- সমস্যা সমাধান
  - “I donated” ক্লিক করার পরও যদি সঙ্গে সঙ্গে Donate দেখা যায়, একটু অপেক্ষা করুন বা Options পেজটি আবার খুলুন; সেটিং সংরক্ষণ হওয়া মাত্র UI আপডেট হয়।
  - ম্যানুয়ালি রিসেট করতে “Show Donate again” এ ক্লিক করুন। চাইলে হিন্টে দেখানো তারিখ পর্যন্ত অপেক্ষাও করতে পারেন।

এই ফিচারটি সম্পূর্ণ সুবিধার্থে; এটি কখনোই অ্যাড‑অন‑এর কার্যকারিতা বাধা দেয় না এবং কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না।

---
