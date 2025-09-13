---
id: donation
title: 'תר donations'
sidebar_label: 'תר donations'
---

## תר donations

import useBaseUrl from '@docusaurus/useBaseUrl';

אם אתה אוהב את "Reply with Attachments" ורוצה לתמוך בפיתוח שלו, אתה יכול התרומה כאן:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="תרום באמצעות Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>או</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="תרום באמצעות PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>או</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="קנה לי קפה" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="סרוק כדי לקנות לי קפה"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

תודה! התמיכה שלך עוזרת לשמור על תאימות עם גרסאות חדשות של Thunderbird, לשפר נגישות ובדיקות, ולשמור על תיעוד מעודכן.

הערות

- קישורי תרומה נפתחים רק כאשר אתה לוחץ עליהם; התוסף לא מבצע שום בקשות רשת רקע.
- תמיכה מתמשכת עוזרת בתחזוקה ארוכת טווח ועדכונים במועד, אך היא לחלוטין אופציונלית.

---

אם כפתורי התמונה לא נטענים, אנא השתמש בקישורים אלה במקום:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [קנה לי קפה](https://buymeacoffee.com/bitranox)

---

תרומות הן התנדבותיות; אין הגבלה על תכונה.

---

## נראות תרומות (נמנום של 90 ימים)

התוסף כולל תכונת נוחות להסתיר הנחיות תרומה לזמן מה לאחר שתרמת.

- איפה למצוא את זה
  - אפשרויות → sección תמיכה: תראה כפתור "תרמתי" ואזור רמז קטן.
  - גם דיאלוג של שליחת אישור מציג כפתור תרומה; הוא מוסתר אוטומטית כאשר הנמנום פעיל.

- איך זה עובד
  - לחיצה על "תרמתי" מסירה כפתורי תרומה והנחיות קשורות למשך 90 ימים.
  - רמז סטטוס מציג "מוסתר עד YYYY‑MM‑DD" (בתאריך המקומי שלך). יש גם כפתור "הצג תרומה שוב" לשחזור הנראות מיד.
  - לאחר 90 ימים, כפתור התרומה הופך לנראה שוב אוטומטית.

- פרטיות ואחסון
  - התוסף מאחסן חותמת זמן אחת באחסון המקומי של Thunderbird כדי לזכור את תקופת הנמנום. מפתח: `donateHideUntil` (מיליסקנדות מהאפק).
  - הגדרה זו היא מקומית לפרופיל Thunderbird שלך (לא מסונכרנת בענן). אין בקשות רשת מתבצעות על ידי תכונה זו.

- פתרון בעיות
  - אם תרום עדיין מופיעה מיד לאחר שלחצת "תרמתי", המתן רגע או פתח מחדש את עמוד האפשרויות; ה-UI מתעדכן ברגע שההגדרה נשמרת.
  - כדי לאפס באופן ידני, לחץ "הצג תרומה שוב". אתה יכול גם לחכות עד שהתאריך המפורסם ברמז יחלוף.

תכונה זו היא purely for convenience; it never blocks add-on functionality and does not collect any personal data.

---
