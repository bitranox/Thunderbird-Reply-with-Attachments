---
id: donation
title: 'تبرع'
sidebar_label: 'تبرع'
---

---

## التبرع

import useBaseUrl from '@docusaurus/useBaseUrl';

إذا أعجبتك "Reply with Attachments" وترغب في دعم تطويرها، يمكنك التبرع هنا:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="التبرع عبر Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>أو</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="التبرع عبر PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>أو</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="اشترِ لي قهوة" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="امسح لشراء قهوة لي"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

شكرًا لك! يساعد دعمك في الحفاظ على التوافق مع إصدارات Thunderbird الجديدة، وتحسين إمكانية الوصول والاختبارات، وإبقاء الوثائق مُحدَّثة.

ملاحظات

- لا تُفتح روابط التبرع إلا عند النقر عليها؛ لا تُجري الإضافة أي طلبات شبكة في الخلفية.
- يساعد الدعم المتكرر على الصيانة طويلة الأجل والتحديثات في الوقت المناسب، لكنه اختياري تمامًا.

---

إذا لم تُحمَّل أزرار الصور، فيُرجى استخدام هذه الروابط بدلًا من ذلك:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

التبرعات اختيارية؛ لا يوجد تقييد للميزات.

---

## ظهور التبرعات (غفوة لمدة 90 يومًا)

تتضمن الإضافة ميزة لراحة المستخدم لإخفاء مطالبات التبرع لفترة بعد أن تتبرع.

- أين تجدها
  - الخيارات → قسم الدعم: سترى زر “I donated” ومنطقة تلميح صغيرة.
  - يعرض مربع حوار تأكيد الإرسال أيضًا زر التبرع؛ يختفي تلقائيًا عندما تكون الغفوة مفعّلة.

- كيف تعمل
  - يؤدي النقر على “I donated” إلى إخفاء أزرار التبرع والمطالبات ذات الصلة لمدة 90 يومًا.
  - يُظهر تلميح الحالة عبارة “Hidden until YYYY‑MM‑DD” (بتاريخك المحلي). هناك أيضًا زر “Show Donate again” لاستعادة الظهور فورًا.
  - بعد 90 يومًا، يصبح زر التبرع مرئيًا تلقائيًا مرة أخرى.

- الخصوصية والتخزين
  - تخزّن الإضافة طابعًا زمنيًا واحدًا في التخزين المحلي لـ Thunderbird لتذكّر فترة الغفوة. المفتاح: `donateHideUntil` (بالمللي ثانية منذ الحقبة).
  - هذا الإعداد محلي لملف تعريف Thunderbird الخاص بك (غير مُزامن مع السحابة). لا تُجرى أي طلبات شبكة بواسطة هذه الميزة.

- استكشاف الأخطاء وإصلاحها
  - إذا استمر ظهور التبرع مباشرة بعد النقر على “I donated”، فانتظر لحظة أو أعد فتح صفحة الخيارات؛ يتم تحديث واجهة المستخدم بمجرد حفظ الإعداد.
  - لإعادة الضبط يدويًا، انقر “Show Donate again”. يمكنك أيضًا الانتظار حتى يحين التاريخ المذكور في التلميح.

هذه الميزة لراحة المستخدم فقط؛ لا تحجب وظيفة الإضافة ولا تجمع أي بيانات شخصية.

---
