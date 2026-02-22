---
id: donation
title: 'Ehson qiling'
sidebar_label: 'Xayriya qiling'
---

---

## Xayriya qiling

import useBaseUrl from '@docusaurus/useBaseUrl';

Agar "Reply with Attachments" sizga yoqsa va uning rivojlanishini qo‘llab-quvvatlamoqchi bo‘lsangiz, bu yerda xayriya qilishingiz mumkin:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe orqali xayriya qiling" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>yoki</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal orqali xayriya qiling" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>yoki</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Menga qahva sotib oling" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Menga qahva sotib olish uchun skanerlang"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Rahmat! Sizning yordamingiz Thunderbird’ning yangi chiqarilishlari bilan moslikni saqlashga, foydalanish qulayligi va testlarni yaxshilashga hamda hujjatlarni doimiy ravishda yangilab borishga yordam beradi.

Eslatmalar

- Xayriya havolalari faqat ularni bosganingizda ochiladi; kengaytma orqa fonda hech qanday tarmoq so‘rovlarini bajarmaydi.
- Muntazam qo‘llab-quvvatlash uzoq muddatli xizmat ko‘rsatish va o‘z vaqtida yangilanishlarga yordam beradi, biroq butunlay ixtiyoriy.

---

Agar rasm tugmalari yuklanmasa, iltimos, buning o‘rniga quyidagi havolalardan foydalaning:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Xayriyalar ixtiyoriy; hech qanday xususiyatlar cheklanmaydi.

---

## Xayriya ko‘rinishi (90 kunlik kechiktirish)

Kengaytmada xayriya qilganingizdan so‘ng ma’lum muddatga xayriya takliflarini yashirish uchun qulaylik funksiyasi mavjud.

- Qayerdan topish mumkin
  - Options → Support bo‘limi: “I donated” tugmasi va kichik ko‘rsatma maydonini ko‘rasiz.
  - Send‑confirmation dialogida ham “Donate” tugmasi ko‘rsatiladi; snooze faol bo‘lganda u avtomatik ravishda yashiriladi.

- Qanday ishlaydi
  - “I donated” tugmasini bosish xayriya tugmalari va tegishli takliflarni 90 kunga yashiradi.
  - Holat ko‘rsatmasida “Hidden until YYYY‑MM‑DD” (mahalliy sanangizda) yozuvi ko‘rinadi. Shuningdek, ko‘rinishni darhol tiklash uchun “Show Donate again” tugmasi mavjud.
  - 90 kundan so‘ng “Donate” tugmasi avtomatik tarzda yana ko‘rinadi.

- Maxfiylik va saqlash
  - Kengaytma snooze muddatini eslab qolish uchun Thunderbird’ning lokal xotirasida bitta vaqt tamg‘asini saqlaydi. Kalit: `donateHideUntil` (epoxa millisekundlari).
  - Ushbu sozlama Thunderbird profilingizga mahalliy (bulut bilan sinxronlanmaydi). Bu funksiya hech qanday tarmoq so‘rovlarini amalga oshirmaydi.

- Nosozliklarni bartaraf etish
  - Agar “I donated”ni bosganingizdan keyin ham “Donate” ko‘rinib tursa, bir oz kuting yoki Options sahifasini qayta oching; sozlama saqlangach, interfeys darhol yangilanadi.
  - Qo‘lda tiklash uchun “Show Donate again” tugmasini bosing. Shuningdek, ko‘rsatmadagi sana o‘tguncha kutishingiz ham mumkin.

Bu funksiya faqat qulaylik uchun; u hech qachon kengaytma funksiyalarini bloklamaydi va hech qanday shaxsiy ma’lumot to‘plamaydi.

---
