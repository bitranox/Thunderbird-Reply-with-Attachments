---
id: donation
title: 'تبرع'
sidebar_label: 'تبرع'
---

## تبرع

import useBaseUrl from '@docusaurus/useBaseUrl';

إذا كنت تحب "الرد مع المرفقات" وترغب في دعم تطويره، يمكنك التبرع هنا:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="تتبرع عبر Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>أو</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="تتبرع عبر PayPal" width="320" height="64"
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

شكرًا لك! دعمك يساعد في الحفاظ على التوافق مع إصدارات Thunderbird الجديدة، وتحسين الوصول والاختبارات، والحفاظ على الوثائق محدثة.

ملاحظات

- روابط التبرع تفتح فقط عند النقر عليها؛ الإضافة لا تقوم بإجراء أي طلبات شبكة في الخلفية.
- الدعم المتكرر يساعد في الصيانة على المدى الطويل والتحديثات في الوقت المناسب، ولكنه اختياري تمامًا.

---

إذا كانت أزرار الصور لا تحمل، يرجى استخدام هذه الروابط بدلاً منها:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [اشترِ لي قهوة](https://buymeacoffee.com/bitranox)

---

التبرعات طوعية؛ لا يوجد تقييد للميزات.

---

## رؤية التبرعات (توقف لمدة 90 يوماً)

تتضمن الإضافة ميزة ملائمة لإخفاء طلبات التبرع لفترة بعد تبرعك.

- أين تجدها
  - الخيارات → قسم الدعم: سترى زر "لقد تبرعت" ومنطقة تلميحات صغيرة.
  - يظهر مربع تأكيد الإرسال أيضًا زر تبرع؛ يتم إخفاؤه تلقائيًا عندما يكون التوقف نشطًا.

- كيف تعمل
  - النقر على "لقد تبرعت" يخفي أزرار التبرع والمطالبات ذات الصلة لمدة 90 يومًا.
  - تظهر تلميحات الحالة "مخفي حتى YYYY‑MM‑DD" (بتاريخك المحلي). هناك أيضًا زر "إظهار التبرع مرة أخرى" لاستعادة الرؤية على الفور.
  - بعد 90 يومًا، يصبح زر التبرع مرئيًا مرة أخرى تلقائيًا.

- الخصوصية والتخزين
  - تخزن الإضافة طابع زمن واحد فقط في التخزين المحلي لـ Thunderbird لتذكر فترة التوقف. المفتاح: `donateHideUntil` (مللي ثانية منذ البداية).
  - هذا الإعداد محلي لملفك الشخصي في Thunderbird (غير متزامن مع السحابة). لا يتم إجراء أي طلبات شبكة بواسطة هذه الميزة.

- استكشاف الأخطاء وإصلاحها
  - إذا ظهر زر التبرع مباشرة بعد النقر على "لقد تبرعت"، انتظر لحظة أو أعد فتح صفحة الخيارات؛ تتحديث واجهة المستخدم بمجرد حفظ الإعداد.
  - لإعادة الضبط يدويًا، انقر على "إظهار التبرع مرة أخرى". يمكنك أيضًا الانتظار حتى يمر التاريخ المذكور في التلميح.

هذه الميزة تهدف فقط للراحة؛ إنها لا تعطل وظائف الإضافة ولا تجمع أي بيانات شخصية.

---
