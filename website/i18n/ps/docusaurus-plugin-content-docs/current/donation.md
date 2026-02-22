---
id: donation
title: 'بسپنه وکړئ'
sidebar_label: 'بسپنه وکړئ'
---

---

## بسپنه

import useBaseUrl from '@docusaurus/useBaseUrl';

که «Reply with Attachments» تاسو ته خوښ وي او غواړئ د هغې په پرمختګ کې ملاتړ وکړئ، نو کولای شئ دلته بسپنه ورکړئ:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="د Stripe له لارې بسپنه ورکړئ" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>یا</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="د PayPal له لارې بسپنه ورکړئ" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>یا</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="ما ته کافي واخلئ" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="د کافي اخیستو لپاره سکین کړئ"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

مننه! ستاسو ملاتړ د نوي Thunderbird خپرونو سره د سازګارۍ په ساتلو، د لاسرسي او ازموینو په ښه کولو، او اسنادو د تازه ساتلو کې مرسته کوي.

یادښتونه

- د بسپنې تړوني یوازې هغه وخت پرانیستل کېږي چې پرې کلیک وکړئ؛ لګون هېڅ شالیدي شبکيز غوښتنې نه ترسره کوي.
- پرله‌پسې ملاتړ د اوږدمهاله ساتنې او پر وخت تازه‌کوونو سره مرسته کوي، خو په بشپړ ډول اختیاري دی.

---

که د انځور تڼۍ نه بارېږي، مهرباني وکړئ پر ځای یې دا تړوني وکاروئ:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

بسپنې داوطلبانه دي؛ هېڅ ځانګړنه په شرط پورې نه تړل کېږي.

---

## د بسپنې ښکاره‌توب (۹۰ ورځنی ځنډ)

لګون یوه اسانتیايي ځانګړنه لري چې تر بسپنه ورکولو وروسته د څه مودې لپاره د بسپنې غوښتنې پټې کړي.

- چیرته یې ومومئ
  - Options → د ملاتړ برخه: تاسو به د “I donated” تڼۍ او یو وړوکی د اشارې ځای ووینئ.
  - د لېږلو د تایید کړکۍ هم د Donate تڼۍ ښيي؛ کله چې د ځنډ حالت فعال وي، نو په اوتومات ډول پټېږي.

- څنګه کار کوي
  - د “I donated” په کلیک کولو سره د بسپنې تڼۍ او اړوند غوښتنې ۹۰ ورځو لپاره پټېږي.
  - د حالت اشاره “Hidden until YYYY‑MM‑DD” (ستاسو په ځایي نېټه) ښيي. همدارنګه د “Show Donate again” په نوم یوه تڼۍ هم شته چې سمدستي بېرته ښکاره‌توب راولي.
  - له ۹۰ ورځو وروسته، د Donate تڼۍ بېرته په اوتومات ډول ښکاره کېږي.

- محرمیت او زېرمه
  - لګون د ځنډ مودې د یاد ساتلو لپاره د Thunderbird په ځایي زېرمتون کې یوازې یو مهال‌تمبر خوندي کوي. Key: `donateHideUntil` (د یونیکس ایپوک میلی‌ثانیې).
  - دا امستنه یوازې ستاسو د Thunderbird پروفایل پورې تړلې ده (له کلاوډ سره نه همغږي کېږي). دا ځانګړنه هېڅ شبکيز غوښتنې نه کوي.

- ستونزې حل
  - که Donate لا هم سملاسي د “I donated” په کلیک کولو وروسته ښکاره وي، لږ تم شئ یا د Options پاڼه بېرته پرانیزئ؛ UI به ژر تر ژره نوې شي کله چې امستنه خوندي شي.
  - د لاسي بیا تنظیم لپاره، پر “Show Donate again” کلیک وکړئ. همدارنګه کولای شئ تر هغې نېټې پورې انتظار وباسئ چې په اشارې کې ښودل شوې ده.

دا ځانګړنه یوازې د اسانتیا لپاره ده؛ هېڅکله د لګون دندې نه بندوي او هېڅ شخصي معلومات نه راټولوي.

---
