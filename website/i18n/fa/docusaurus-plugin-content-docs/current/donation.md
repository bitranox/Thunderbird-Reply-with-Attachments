---
id: donation
title: 'کمک مالی'
sidebar_label: 'اهدا کنید'
---

---

## حمایت مالی

import useBaseUrl from '@docusaurus/useBaseUrl';

اگر از "Reply with Attachments" خوشتان می‌آید و می‌خواهید از توسعهٔ آن حمایت کنید، می‌توانید از اینجا کمک مالی کنید:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="کمک مالی از طریق Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>یا</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="کمک مالی از طریق PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>یا</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="برایم یک قهوه بخر" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="جهت خرید قهوه برای من اسکن کنید"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

متشکرم! حمایت شما به حفظ سازگاری با نسخه‌های جدید Thunderbird، بهبود دسترس‌پذیری و آزمون‌ها، و به‌روز نگه‌داشتن مستندات کمک می‌کند.

نکته‌ها

- لینک‌های کمک مالی فقط وقتی روی آن‌ها کلیک کنید باز می‌شوند؛ افزونه هیچ درخواست شبکه‌ای در پس‌زمینه انجام نمی‌دهد.
- حمایت دوره‌ای به نگه‌داری بلندمدت و به‌روزرسانی‌های به‌موقع کمک می‌کند، اما کاملاً اختیاری است.

---

اگر دکمه‌های تصویری بارگذاری نشدند، لطفاً به‌جای آن از این پیوندها استفاده کنید:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

کمک‌های مالی داوطلبانه هستند؛ هیچ قابلیتی مشروط به پرداخت نیست.

---

## نمایش کمک‌های مالی (تعلیق ۹۰روزه)

افزونه یک قابلیت کاربردی دارد تا پس از کمک مالی، برای مدتی اعلان‌های درخواست کمک مالی را پنهان کند.

- محل آن
  - گزینه‌ها → بخش پشتیبانی: دکمهٔ «من کمک کردم» و یک ناحیهٔ راهنمای کوچک را خواهید دید.
  - در گفت‌وگوی تأییدِ ارسال نیز یک دکمهٔ کمک مالی نمایش داده می‌شود؛ هنگام فعال بودنِ تعلیق، به‌صورت خودکار پنهان می‌شود.

- نحوهٔ کارکرد
  - با کلیک روی «من کمک کردم»، دکمه‌ها و اعلان‌های مربوط به کمک مالی به‌مدت ۹۰ روز پنهان می‌شوند.
  - راهنمای وضعیت پیام «پنهان تا YYYY‑MM‑DD» را نشان می‌دهد (بر اساس تاریخ محلی شما). همچنین دکمهٔ «نمایش دوبارهٔ کمک مالی» برای بازگرداندن فوری نمایش وجود دارد.
  - پس از ۹۰ روز، دکمهٔ کمک مالی دوباره به‌طور خودکار نمایان می‌شود.

- حریم خصوصی و ذخیره‌سازی
  - افزونه برای به‌خاطر سپردن دورهٔ تعلیق، یک مُهرِ زمانی منفرد را در فضای ذخیره‌سازی محلی Thunderbird نگه می‌دارد. کلید: `donateHideUntil` (میلی‌ثانیه‌های مبدأ زمان (epoch)).
  - این تنظیم به نمایهٔ Thunderbird شما محلی است (همگام‌سازی ابری ندارد). این قابلیت هیچ درخواستی به شبکه ارسال نمی‌کند.

- عیب‌یابی
  - اگر بلافاصله پس از کلیک روی «من کمک کردم» همچنان دکمهٔ کمک مالی نمایش داده می‌شود، کمی صبر کنید یا صفحهٔ گزینه‌ها را دوباره باز کنید؛ واسط کاربری به‌محض ذخیره شدن تنظیم به‌روزرسانی می‌شود.
  - برای بازنشانی دستی، روی «نمایش دوبارهٔ کمک مالی» کلیک کنید. همچنین می‌توانید تا تاریخِ ذکرشده در راهنما صبر کنید.

این قابلیت صرفاً برای راحتی است؛ هرگز کارکرد افزونه را مسدود نمی‌کند و هیچ دادهٔ شخصی‌ای جمع‌آوری نمی‌کند.

---
