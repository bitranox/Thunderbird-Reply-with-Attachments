---
id: install
title: 'התקנה'
slug: /install
sidebar_label: 'התקנה'
---

---

## התקנה דרך "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Version
תוסף זה תומך ב‑Thunderbird **128 ESR ומעלה**. גרסאות ישנות אינן נתמכות.
:::

זוהי שיטת ההתקנה המומלצת. תוספים המותקנים מ‑ATN (addons.thunderbird.net) מקבלים עדכונים אוטומטיים. התקנות LOCAL/dev אינן מתעדכנות אוטומטית.

- גרסת Thunderbird מינימלית: 128 ESR או חדש יותר.

1. בתוך Thunderbird, עברו אל **Tools > Add-ons and Themes**.
2. חפשו "reply with attachments".
3. הוסיפו את התוסף.

או פתחו את דף התוסף ישירות: [תוספות Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## התקנה ידנית מ‑XPI {#local-installation-in-thunderbird}

### הורדת קובץ ה‑XPI {#download-the-xpi-file}

1. עברו אל [דף התוסף של Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. הורידו את הגרסה העדכנית של התוסף כקובץ XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### התקנה ב‑Thunderbird {#install-in-thunderbird-local}

1. פתחו את Thunderbird.
2. עברו אל **Tools > Add-ons and Themes**.
3. ב‑**Add-ons Manager**, לחצו על סמל ההילוך בפינה הימנית העליונה.
4. בחרו **Install Add-on From File…** מהתפריט.
5. בחרו את הקובץ שהורד `reply_with_attachments-x.y.z-tb.xpi`.
6. אשרו את ההתקנה כשנתבקשתם.

---

## התקנה לצורכי פיתוח {#installation-for-development}

### הורדת המאגר {#download-the-repository}

1. הורידו את הגרסה העדכנית של מאגר ה‑GitHub.
2. הריצו `make help` למידע נוסף.

### התקנה ב‑Thunderbird {#install-in-thunderbird-dev}

1. פתחו את Thunderbird.
2. עברו אל **Tools > Add-ons and Themes**.
3. ב‑**Add-ons Manager**, לחצו על סמל ההילוך בפינה הימנית העליונה.
4. בחרו **Install Add-on From File…** מהתפריט.
5. בחרו את הקובץ שנוצר `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. אשרו את ההתקנה כשנתבקשתם.

הערה: אם Thunderbird אינו מקבל את `.zip` במערכת שלכם, שנו את שמו ל‑`.xpi` ונסו שוב “Install Add‑on From File…”.

### היכן למצוא את ה‑LOCAL ZIP {#where-local-zip}

- קודם כל, ארזו את התוסף: הריצו `make pack` בשורש המאגר.
- לאחר האריזה, מצאו את קובץ ה‑zip של “LOCAL” בשורש המאגר (למשל, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- לפני אריזה מחדש לצורכי בדיקות, העלו את מספרי הגרסאות גם ב‑`sources/manifest_ATN.json` וגם ב‑`sources/manifest_LOCAL.json`.

---

## השבתה, הסרה ועדכונים {#disable-uninstall-updates}

- השבתה: Thunderbird → Tools → Add‑ons and Themes → מצאו את התוסף → כבו את המתג.
- הסרה: אותו מסך → תפריט שלוש הנקודות → Remove.
- עדכונים: התקנות מ‑ATN מתעדכנות אוטומטית כאשר גרסאות חדשות מאושרות. התקנות LOCAL/dev אינן מתעדכנות אוטומטית; התקינו ידנית גרסת LOCAL חדשה.
- הסרת ההגדרות לחלוטין: ראו [פרטיות → הסרת נתונים](privacy#data-removal).

ראו גם

- [התחלה מהירה](quickstart)
