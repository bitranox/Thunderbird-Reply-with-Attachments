---
id: donation
title: 'תרמו'
sidebar_label: 'תרומה'
---

---

## תרומה

import useBaseUrl from '@docusaurus/useBaseUrl';

אם אתם אוהבים את "Reply with Attachments" ורוצים לתמוך בפיתוחו, תוכלו לתרום כאן:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="תרומה באמצעות Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>או</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="תרומה באמצעות PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>או</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="קנו לי קפה" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="סרקו כדי לקנות לי קפה"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

תודה! התמיכה שלכם מסייעת לשמור על תאימות לגרסאות Thunderbird חדשות, לשפר נגישות ובדיקות, ולהשאיר את התיעוד מעודכן.

הערות

- קישורי התרומה נפתחים רק כאשר לוחצים עליהם; התוסף אינו מבצע בקשות רשת ברקע.
- תמיכה חוזרת מסייעת בתחזוקה לטווח הארוך ובעדכונים בזמן, אך היא לחלוטין אופציונלית.

---

אם לחצני התמונה אינם נטענים, השתמשו בקישורים הללו במקום:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

תרומות הן רשות; אין נעילת תכונות.

---

## נראות התרומה (השהיה ל־90 יום)

התוסף כולל אפשרות נוחות שמסתירה בקשות לתרומה לזמן מה לאחר שתרמתם.

- היכן למצוא זאת
  - אפשרויות → סעיף התמיכה: תראו כפתור "תרמתי" ואזור רמז קטן.
  - תיבת האישור של השליחה מציגה גם כפתור תרומה; הוא מוסתר אוטומטית כאשר ההשהיה פעילה.

- איך זה עובד
  - לחיצה על "תרמתי" מסתירה את כפתורי התרומה והבקשות הקשורות למשך 90 יום.
  - רמז מצב מציג "מוסתר עד YYYY‑MM‑DD" (בתאריך המקומי שלך). יש גם כפתור "הצג תרומה שוב" לשחזור הנראות מיידית.
  - לאחר 90 יום, כפתור התרומה יופיע שוב אוטומטית.

- פרטיות ואחסון
  - התוסף שומר חותמת זמן יחידה באחסון המקומי של Thunderbird כדי לזכור את תקופת ההשהיה. מפתח: `donateHideUntil` (מילי־שניות מאז epoch).
  - ההגדרה הזו מקומית לפרופיל Thunderbird שלך (לא מסונכרנת לענן). התכונה הזו אינה מבצעת בקשות רשת.

- פתרון תקלות
  - אם "תרומה" עדיין מופיע מיד לאחר לחיצה על "תרמתי", המתינו רגע או פתחו מחדש את דף האפשרויות; הממשק יתעדכן ברגע שההגדרה נשמרת.
  - כדי לאפס ידנית, לחצו על "הצג תרומה שוב". תוכלו גם להמתין עד שהתאריך המופיע ברמז חולף.

תכונה זו נועדה לנוחות בלבד; היא לעולם אינה חוסמת פונקציונליות של התוסף ואינה אוספת נתונים אישיים.

---
