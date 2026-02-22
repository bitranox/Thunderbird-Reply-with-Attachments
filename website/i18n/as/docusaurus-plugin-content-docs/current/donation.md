---
id: donation
title: 'দান কৰক'
sidebar_label: 'দান কৰক'
---

---

## অনুদান

import useBaseUrl from '@docusaurus/useBaseUrl';

আপুনি যদি "Reply with Attachments" ভাল পায় আৰু ইয়াৰ উন্নয়ন সমৰ্থন কৰিব খোজে, তেন্তে ইয়াত অনুদান দিব পাৰে:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe যোগে অনুদান কৰক" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>বা</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal যোগে অনুদান কৰক" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>বা</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="মোক এখন কফি কিনি দিয়ক" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="স্কেন কৰি মোক এখন কফি কিনি দিয়ক"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

ধন্যবাদ! আপোনাৰ সমৰ্থনে নতুন Thunderbird মুক্তিৰ সৈতে অনুকূলতা ৰক্ষা কৰা, অভিগম্যতা আৰু পৰীক্ষা উন্নত কৰা, আৰু নথিপত্ৰসমূহ সদায় আধুনিক ৰাখিবলৈ সহায় কৰে।

টোকা

- অনুদান লিংকসমূহ কেৱল আপুনি ক্লিক কৰিলে খোলে; এড-অনটোৱে পশ্চাদভূমিত কোনো নেটৱৰ্ক অনুৰোধ নকৰে।
- পুনৰাবৰ্তিত সমৰ্থনে দীৰ্ঘম্যাদি ৰক্ষণাবেক্ষণ আৰু সময়মতো আপডেটত সহায় কৰে, কিন্তু ই সম্পূৰ্ণৰূপে ঐচ্ছিক।

---

ছবিৰ বুটামসমূহ ল’ড নহ’লে, ইয়াৰ পৰিৱর্তে এই লিংকসমূহ ব্যৱহাৰ কৰক:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

অনুদান স্বইচ্ছিক; কোনো ফিচাৰ সীমাবদ্ধতা নাই।

---

## অনুদানৰ দৃশ্যমানতা (90‑দিনৰ স্নুজ)

এড-অনটোৱে সুবিধাৰ্থে, আপুনি অনুদান দিয়াৰ পিছত কিছুলোক সময়ৰ বাবে অনুদান প্ৰম্প্টসমূহ লুকুৱাব পৰা এটা বৈশিষ্ট্য অন্তৰ্ভুক্ত কৰে।

- ক’ত পোৱা যায়
  - Options → Support বিভাগ: আপুনি “I donated” বুটাম আৰু এটি সৰু হিন্ট এলেকা দেখিব।
  - Send‑confirmation ডাইলগতেও এটা Donate বুটাম দেখুৱায়; স্নুজ সক্ৰিয় থাকোঁতে ই স্বয়ংক্ৰিয়ভাৱে লুকাই থাকে।

- ইয়াৰ কাম-কাজ কেনেকৈ
  - “I donated” ক্লিক কৰিলে 90 দিনৰ বাবে অনুদান বুটামসমূহ আৰু সম্পৰ্কিত প্ৰম্প্টসমূহ লুকাই যায়।
  - এটা স্থিতি হিন্টত “Hidden until YYYY‑MM‑DD” (আপোনাৰ স্থানীয় তাৰিখ) দেখুৱায়। তাত “Show Donate again” নামৰ এটা বুটামো আছে যাৰ সহায়ত তৎক্ষণাত দৃশ্যমানতা ঘুৰাই অনা যায়।
  - 90 দিনৰ পিছত, Donate বুটামটো স্বয়ংক্ৰিয়ভাৱে পুনৰ দৃশ্যমান হৈ যায়।

- গোপনীয়তা আৰু সংৰক্ষণ
  - স্নুজ সময়সীমা মনত ৰাখিবলৈ এড-অনটোৱে Thunderbird-ৰ স্থানীয় সংৰক্ষণত কেৱল এটা timestamp থৈ রাখে। Key: `donateHideUntil` (epoch milliseconds)।
  - এই ছেটিং আপোনাৰ Thunderbird প্ৰ’ফাইলৰ বাবে স্থানীয় (ক্লাউড-ছিংক নহয়)। এই বৈশিষ্ট্যই কোনো নেটৱৰ্ক অনুৰোধ নকৰে।

- সমস্যাসমাধান
  - “I donated” ক্লিক কৰাৰ পাছতো যদি Donate দেখাই আছে, অলপ সময় অপেক্ষা কৰক বা Options পৃষ্ঠা পুনৰ খোলক; ছেটিং সংৰক্ষণ হ’লেই UI আপডেট হয়।
  - হস্তচালিতভাৱে ৰিছেট কৰিবলৈ, “Show Donate again” ক্লিক কৰক। আপুনি হিন্টত দেখুওৱা তাৰিখ পাৰ হওয়ালৈও অপেক্ষা কৰিব পাৰে।

এই বৈশিষ্ট্যটো কেৱল সুবিধাৰ্থে; ই কেতিয়াও এড-অনৰ কাৰ্যক্ষমতা অৱৰুদ্ধ নকৰে আৰু কোনো ব্যক্তিগত তথ্য সংগ্ৰহ নকৰে।

---
