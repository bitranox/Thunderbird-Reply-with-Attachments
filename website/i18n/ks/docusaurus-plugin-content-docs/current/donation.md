---
id: donation
title: 'عطیہ دیو'
sidebar_label: 'عطیہ کرِو'
---

---

## عطیہ دِیو

import useBaseUrl from '@docusaurus/useBaseUrl';

اگر تُہیہ "Reply with Attachments" پسند چھُ تْہ یتھس ترقیس حمایت کرُن چھَوٕ چاہان، تِہ تُہیہ یہاں عطیہ دِیو:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donate via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>or</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donate via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>or</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy me a coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan to buy me a coffee"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

شکریہ! تُہند تعاون مدد کران چھُ نْوین Thunderbird ریلیزن سِتھ مطابقت برقرار رکھنْہ، قابلِ رسائی تْہ ٹیسٹ بہتر بناونْہ، تْہ دستاویزات اَپ ٹو ڈیٹ تھاونْہ۔

نوٹس

- عطیہ لنکس صرف یِمۍ کْھولن زَنۍ ییلہ تُہیہ امُن کْلِک کران؛ ایڈ‑آن پس منظر منز کوئی نیٹ ورک درخواست نَہ کران۔
- باربارئ تعاون مدد کران چھُ طویل مدتی دیکھ بھال تْہ بروقت اپڈیٹس، مگر یہ مکمل طور اختیاری چھُ۔

---

اگر تصویر بٹن لوڈ نَہ گژھن، مہربانی کرِ یمِہ لنکس بروئے کار آنیو بَدْلے:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

عطیات اختیاری چھِ؛ کاہِ فیچر بند نَہ چھُ۔

---

## عطیہ نمائش (۹۰‑دوہ سنوٗز)

یہ ایڈ‑آن منز چھُ ایک سہولت فیچر یوس عطیہ کرنہٕ پتْہ کنہہ وْستہ باپت عطیہ پرامپٹس پوشیدہ تھوان دیوان۔

- کُتھ لبھِو
  - Options → Support سیکشن: تُہیہ نظر آو “I donated” بٹن تْہ اک نْہ بُڈ ہِنٹ ہِصہ۔
  - Send‑confirmation ڈائیلاگ منز بھی Donate بٹن نظر آو؛ یِہ آپے آپ پوشیدہ گژھان ییلہ سنوٗز سرگرم ہوون۔

- یہ کِس طرح کَم کران چھُ
  - “I donated” کْلِک کرن سِتھ عطیہ بٹن تْہ متعلقہ پرامپٹس ۹۰ دوہ خٲطر پوشیدہ گژھن۔
  - ایک حیثیت ہِنٹ “Hidden until YYYY‑MM‑DD” دِکھاون چھُ (تُہند مقامی تاریخ منز)۔ یہس سِتھ اک “Show Donate again” بٹن چھُ یِمِہ سِتھ نمائش فوری بحال گژھان۔
  - ۹۰ دوہ پتہ، Donate بٹن واپس آپے آپ نظر آو۔

- رازداری تْہ ذخیرہ
  - ایڈ‑آن چھُ ایک واحد ٹائم اسٹیمپ Thunderbird ہندس مقامی اسٹوریجِہ منز محفوظ کران سنوٗز مددتی یاد رکھن خٲطر۔ Key: `donateHideUntil` (ایپوک ملی سیکنڈس)۔
  - یہ سیٹنگ تُہند Thunderbird پروفائل سِتھ مقامی چھُ (کلاؤڈ سِتھ ہم آہنگ نَہ چھُ)۔ یہ فیچر کانہہ نیٹ ورک درخواست نَہ بناون۔

- خرابی دور کرن
  - اگر “I donated” کْلِک کرن گژھن ہند فوراً پتہ بھی Donate دِکھاون چھُ، ذِرا وْقت روزِ یا Options پیج دوبارٕہ کھولِو؛ UI اپڈیٹ گژھان چھُ ییلہ سیٹنگ محفوظ گژھی۔
  - دستی طور ری سیٹ کرن خٲطر، “Show Donate again” کْلِک کْریو۔ تُہیہ ہِنٹ منز دِتا تاریخ گژھن تام بھی وْنہِ روزِ تھئ۔

یہ فیچر صرف سہولت خٲطر چھُ؛ یِہ کَھنہ ایڈ‑آن ہْند فعالیت رُکاؤن نَہ چھُ تْہ کُنہِ ذاتی ڈیٹا جمع نَہ کران۔

---
