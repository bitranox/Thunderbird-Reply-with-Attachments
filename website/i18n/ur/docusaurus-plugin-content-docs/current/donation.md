---
id: donation
title: 'عطیہ کریں'
sidebar_label: 'عطیہ کریں'
---

---

## عطیہ دیں

import useBaseUrl from '@docusaurus/useBaseUrl';

اگر آپ کو "Reply with Attachments" پسند ہے اور آپ اس کی ترقی کی معاونت کرنا چاہتے ہیں، تو آپ یہاں عطیہ دے سکتے ہیں:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe کے ذریعے عطیہ دیں" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>یا</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal کے ذریعے عطیہ دیں" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>یا</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="مجھے ایک کافی خریدیں" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="مجھے کافی خریدنے کے لیے اسکین کریں"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

شکریہ! آپ کی معاونت نئے Thunderbird اجراء کے ساتھ مطابقت برقرار رکھنے، رسائی پذیری اور ٹیسٹس کو بہتر بنانے، اور دستاویزات کو تازہ رکھنے میں مدد دیتی ہے.

نوٹس

- عطیہ کے روابط صرف آپ کے کلک کرنے پر ہی کھلتے ہیں؛ ایڈ‑آن کوئی پس منظر میں نیٹ ورک درخواستیں نہیں بھیجتا۔
- مسلسل معاونت طویل مدتی دیکھ بھال اور بروقت اپڈیٹس میں مدد دیتی ہے، لیکن یہ مکمل طور پر اختیاری ہے۔

---

اگر تصویری بٹن لوڈ نہیں ہوتے، تو براہ کرم ان متبادل روابط کا استعمال کریں:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [مجھے ایک کافی خریدیں](https://buymeacoffee.com/bitranox)

---

عطیات رضاکارانہ ہیں؛ خصوصیات کی رسائی پر کوئی پابندی نہیں ہے۔

---

## عطیہ کی نمائش (90 دن کا توقف)

ایڈ‑آن میں سہولت کے لیے ایک فیچر شامل ہے جو آپ کے عطیہ دینے کے بعد کچھ عرصے کے لیے عطیہ کے پرامپٹس کو چھپا دیتا ہے۔

- اسے کہاں تلاش کریں
  - اختیارات → معاونت سیکشن: آپ کو “میں نے عطیہ دیا” بٹن اور ایک چھوٹا اشارہ نما حصہ نظر آئے گا۔
  - Send‑confirmation ڈائیلاگ میں بھی ایک عطیہ بٹن ہوتا ہے؛ جب توقف فعال ہو تو یہ خود بخود چھپ جاتا ہے۔

- یہ کیسے کام کرتا ہے
  - “میں نے عطیہ دیا” پر کلک کرنے سے 90 دن کے لیے عطیہ کے بٹن اور متعلقہ پرامپٹس چھپ جاتے ہیں۔
  - اسٹیٹس اشارہ “YYYY‑MM‑DD تک مخفی” (آپ کی مقامی تاریخ میں) دکھاتا ہے۔ فوری طور پر دوبارہ دکھانے کے لیے “عطیہ دوبارہ دکھائیں” بٹن بھی موجود ہے۔
  - 90 دن کے بعد عطیہ بٹن خود بخود دوبارہ نظر آنے لگتا ہے۔

- رازداری اور ذخیرہ
  - یہ ایڈ‑آن توقف کی مدت یاد رکھنے کے لیے Thunderbird کے مقامی اسٹوریج میں ایک واحد ٹائم اسٹیمپ محفوظ کرتا ہے۔ کلید: `donateHideUntil` (ایپوک ملی سیکنڈز)۔
  - یہ سیٹنگ آپ کے Thunderbird پروفائل تک مقامی ہے (کلاؤڈ سے ہم آہنگ نہیں ہوتی)۔ اس فیچر کے ذریعے کوئی نیٹ ورک درخواستیں نہیں بھیجی جاتیں۔

- مشکلات کا حل
  - اگر “میں نے عطیہ دیا” پر کلک کرنے کے فوراً بعد بھی عطیہ دکھ رہا ہو، تو کچھ دیر انتظار کریں یا اختیارات صفحہ دوبارہ کھولیں؛ سیٹنگ محفوظ ہوتے ہی انٹرفیس اپ ڈیٹ ہو جاتا ہے۔
  - دستی طور پر ری سیٹ کرنے کے لیے “عطیہ دوبارہ دکھائیں” پر کلک کریں۔ آپ اشارے میں درج تاریخ گزرنے تک انتظار بھی کر سکتے ہیں۔

یہ فیچر محض سہولت کے لیے ہے؛ یہ کبھی بھی ایڈ‑آن کی فعالیت کو مسدود نہیں کرتا اور کوئی ذاتی ڈیٹا جمع نہیں کرتا۔

---
