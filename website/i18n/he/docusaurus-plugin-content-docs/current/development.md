---
id: development
title: 'פיתוח'
sidebar_label: 'פיתוח'
---

---

## מדריך פיתוח {#development-guide}

:::note ערכו באנגלית בלבד; התרגומים יתעדכנו אוטומטית
עדכנו תיעוד **רק** תחת `website/docs` (אנגלית). התרגומים תחת `website/i18n/<locale>/…` נוצרים ואינם אמורים להיערך ידנית. השתמשו במשימות התרגום (למשל, `make translate_web_docs_batch`) כדי לרענן תוכן מקומי.
:::

### דרישות מקדימות {#prerequisites}

- Node.js 22+ ו-npm (נבדק עם Node 22)
- Thunderbird 128 ESR או חדש יותר (לבדיקות ידניות)

---

### פריסת הפרויקט (ברמה גבוהה) {#project-layout-high-level}

- שורש: סקריפט אריזה `distribution_zip_packer.sh`, תיעוד, צילומי מסך
- `sources/`: קוד ההרחבה הראשי (רקע, ממשק אפשרויות/חלון קופץ, מניפסטים, אייקונים)
- `tests/`: חבילת בדיקות Vitest
- `website/`: תיעוד Docusaurus (עם i18n תחת `website/i18n/de/...`)

---

### התקנה וכלים {#install-and-tooling}

- התקנת תלויות בשורש: `npm ci`
- דוקס (אופציונלי): `cd website && npm ci`
- גילוי יעדים: `make help`

---

### פיתוח חי (web‑ext run) {#live-dev-web-ext}

- לולאה מהירה ב‑Firefox Desktop (בדיקות עשן של UI בלבד):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- הרצה ב‑Thunderbird (מועדף עבור MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- טיפים:
- השאירו את יומן השגיאות של Thunderbird פתוח (כלים → כלי פיתוח → מסוף שגיאות).
- דפי אירועים של MV3 מושעים כשהם במצב סרק; טענו מחדש את ההרחבה אחרי שינויי קוד, או אפשרו ל‑web‑ext לטעון אוטומטית.
- חלק מההתנהגויות הייחודיות ל‑Firefox שונות; תמיד אשרו ב‑Thunderbird לשוויון API.
- נתיבי בינארי של Thunderbird (דוגמאות):
- Linux: `thunderbird` (למשל, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- בידוד פרופיל: השתמשו בפרופיל Thunderbird נפרד לפיתוח כדי לא להשפיע על סביבת העבודה היומית.

---

### מטרות Make (בסדר אלפביתי) {#make-targets-alphabetical}

ה‑Makefile מאחיד תזרימי פיתוח נפוצים. הריצו `make help` בכל עת לקבלת סיכום בשורה אחת לכל מטרה.

טיפ: הרצת `make` ללא מטרה תפתח תפריט Whiptail פשוט לבחירת מטרה.

| יעד                                                      | תיאור בשורה אחת                                                                                            |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | הסרת ארטיפקטים מקומיים של בנייה/תצוגה מקדימה (tmp/, web-local-preview/, website/build/).                   |
| [`commit`](#mt-commit)                                   | עיצוב קוד, הרצת בדיקות (כולל i18n), עדכון יומן שינויים, ביצוע commit ו‑push.                               |
| [`eslint`](#mt-eslint)                                   | הרצת ESLint באמצעות flat config (`npm run -s lint:eslint`).                                                |
| [`help`](#mt-help)                                       | רשימת כל המטרות עם תיאור בשורה אחת (ממוינות).                                                              |
| [`lint`](#mt-lint)                                       | web‑ext lint על `sources/` (מניפסט זמני; מתעלם מקבצי ZIP; לא קטלני).                                       |
| [`menu`](#mt-menu)                                       | תפריט אינטראקטיבי לבחירת מטרה וארגומנטים אופציונליים.                                                      |
| [`pack`](#mt-pack)                                       | בניית ZIPs ל‑ATN ולוקאליים (מריץ linter; קורא לסקריפט האריזה).                                             |
| [`prettier`](#mt-prettier)                               | עיצוב המאגר במקום (כותב שינויים).                                                                          |
| [`prettier_check`](#mt-prettier_check)                   | Prettier במצב בדיקה (ללא כתיבה); נכשל אם נדרש עיצוב מחדש.                                                  |
| [`prettier_write`](#mt-prettier_write)                   | כינוי עבור `prettier`.                                                                                     |
| [`test`](#mt-test)                                       | Prettier (כתיבה), ESLint, ואז Vitest (כיסוי אם מוגדר).                                                     |
| [`test_i18n`](#mt-test_i18n)                             | בדיקות i18n בלבד: מצייני מקום/שוויון בהרחבה + שוויון באתר.                                                 |
| [`translate_app`](#mt-translation-app)                   | כינוי עבור `translation_app`.                                                                              |
| [`translation_app`](#mt-translation-app)                 | תרגום מחרוזות UI של האפליקציה מ‑`sources/_locales/en/messages.json`.                                       |
| [`translate_web_docs_batch`](#mt-translation-web)        | תרגום דפי אתר דרך OpenAI Batch API (מועדף).                                                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | תרגום דפי אתר באופן סינכרוני (מורשת, לא באצ'ינג).                                                          |
| [`translate_web_index`](#mt-translation_web_index)       | כינוי עבור `translation_web_index`.                                                                        |
| [`translation_web_index`](#mt-translation_web_index)     | תרגום מחרוזות UI של דף הבית/סרגל הניווט/כותרת תחתונה (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | בניית הדוקס אל `website/build` (תומך ב‑`--locales` / `BUILD_LOCALES`).                                     |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | בדיקת קישורים בטוחה לאופליין (מדלגת על HTTP[S] מרוחקים).                                                   |
| [`web_build_local_preview`](#mt-web_build_local_preview) | תצוגה מקדימה מקומית של gh‑pages; שרת אוטומטי על 8080–8090; בדיקות/בדיקת קישורים אופציונליות.               |
| [`web_push_github`](#mt-web_push_github)                 | דחיפת `website/build` לענף `gh-pages`.                                                                     |

תחביר אפשרויות

- השתמשו ב‑`make <command> OPTS="…"` להעברת אפשרויות (מומלץ מרכאות). לכל מטרה בהמשך יש דוגמת שימוש.

--

-

#### טיפים לבניית לוקאלים {#locale-build-tips}

- בניית תת‑קבוצה של לוקאלים: הגדירו `BUILD_LOCALES="en de"` או העבירו `OPTS="--locales en,de"` ליעדי web.
- תצוגה מקדימה של לוקאל מסוים: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### בנייה ואריזה {#build-and-package}

- בניית ZIPs: `make pack`
- מפיק ZIPs ל‑ATN ולוקאליים בשורש המאגר (אל תערכו ארטיפקטים ידנית)
- טיפ: עדכנו גרסה הן ב‑`sources/manifest_ATN.json` והן ב‑`sources/manifest_LOCAL.json` לפני אריזה
- התקנה ידנית (פיתוח): Thunderbird → Tools → Add‑ons and Themes → גלגל שיניים → Install Add‑on From File… → בחרו ב‑ZIP שנבנה

---

### בדיקות {#test}

- חבילה מלאה: `make test` (Vitest)
- כיסוי (אופציונלי):
- `npm i -D @vitest/coverage-v8`
- הריצו `make test`; פתחו את `coverage/index.html` לדוח HTML
- i18n בלבד: `make test_i18n` (מפתחות UI/מצייני מקום/כותרות + שוויון באתר לכל לוקאל ולכל מסמך עם בדיקות id/title/sidebar_label)

---

### ניפוי שגיאות ולוגים {#debugging-and-logs}

- מסוף שגיאות: Tools → Developer Tools → Error Console
- החלפת לוגים מפורטים בזמן ריצה:
- הפעלה: `messenger.storage.local.set({ debug: true })`
- כיבוי: `messenger.storage.local.set({ debug: false })`
- לוגים מופיעים בזמן ניסוח/שליחת תגובות

---

### דוקס (אתר) {#docs-website}

- שרת פיתוח: `cd website && npm run start`
- בניית אתר סטטי: `cd website && npm run build`
- מקבילות ב‑Make (אלפביתי): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- דוגמאות שימוש:
- EN בלבד, דילוג על בדיקות/בדיקת קישורים, ללא push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- כל הלוקאלים, עם בדיקות/בדיקת קישורים, ואז push: `make web_build_local_preview && make web_push_github`
- לפני פרסום, הריצו את בדיקת הקישורים הבטוחה לאופליין: `make web_build_linkcheck`.
- i18n: האנגלית חיה ב‑`website/docs/*.md`; תרגום לגרמנית ב‑`website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- חיפוש: אם משתני סביבה של Algolia DocSearch מוגדרים ב‑CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), האתר ישתמש בחיפוש של Algolia; אחרת הוא ייפול לחיפוש מקומי. בדף הבית, לחצו `/` או `Ctrl+K` כדי לפתוח את תיבת החיפוש.

---

#### נתיב הפניה לתרומה {#donate-redirect}

- `website/src/pages/donate.js`
- נתיב: `/donate` (וכן `/<locale>/donate`)
- התנהגות:
- אם לנתיב הנוכחי יש לוקאל (למשל, `/de/donate`), השתמשו בו
- אחרת, בחרו את ההתאמה הטובה ביותר מ‑`navigator.languages` מול הלוקאלים המוגדרים; חזרה ללוקאל ברירת המחדל במקרה הצורך
- מפנה אל:
- `en` → `/docs/donation`
- אחרים → `/<locale>/docs/donation`
- משתמש ב‑`useBaseUrl` לטיפול נכון ב‑baseUrl
- כולל meta refresh + קישור `noscript` כגיבוי

---

---

#### טיפים לתצוגה מקדימה {#preview-tips}

- עצירת תצוגת Node בצורה נקייה: פתחו `http://localhost:<port>/__stop` (מודפס אחרי `Local server started`).
- אם תמונות לא נטענות ב‑MDX/JSX, השתמשו ב‑`useBaseUrl('/img/...')` כדי לכבד את `baseUrl` של האתר.
- התצוגה המקדימה מתחילה תחילה; בדיקת הקישורים רצה לאחר מכן ואינה חוסמת (קישורים חיצוניים שבורים לא יעצרו את התצוגה).
- דוגמת URL לתצוגה: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (מודפס לאחר “Local server started”).
- קישורים חיצוניים בבדיקת קישורים: אתרים מסוימים (למשל, addons.thunderbird.net) חוסמים סורקים אוטומטיים ועלולים להציג 403 בבדיקות. התצוגה המקדימה עדיין תתחיל; ניתן להתעלם מכך.

---

#### תרגום האתר {#translate-website}

מה ניתן לתרגם

- ממשק האתר בלבד: דף הבית, סרגל הניווט, כותרת תחתונה ומחרוזות UI נוספות. תוכן הדוקס נשאר באנגלית בלבד לעת עתה.

היכן לערוך

- ערכו את `website/i18n/<locale>/code.json` (השתמשו ב‑`en` כהפניה). השאירו מצייני מקום כמו `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ללא שינוי.

יצירה או רענון של קבצים

- יצירת שבלונות חסרות לכל הלוקאלים: `npm --prefix website run i18n:stubs`
- דריסה מחדש של שבלונות מהאנגלית (לאחר הוספת מחרוזות חדשות): `npm --prefix website run i18n:stubs:force`
- חלופה ללוקאל יחיד: `npx --prefix website docusaurus write-translations --locale <locale>`

תרגום מחרוזות UI של דף הבית/סרגל ניווט/כותרת תחתונה (OpenAI)

- הגדרת אישורים פעם אחת (Shell או .env):
- `export OPENAI_API_KEY=sk-...`
- אופציונלי: `export OPENAI_MODEL=gpt-4o-mini`
- בפעימה אחת (כל הלוקאלים, מלבד en): `make translate_web_index`
- הגבלה ללוקאלים מסוימים: `make translate_web_index OPTS="--locales de,fr"`
- דריסת ערכים קיימים: `make translate_web_index OPTS="--force"`

אימות וניסיונות חוזרים

- סקריפט התרגום מאמת את מבנה ה‑JSON, שומר על מצייני מקום בסוגריים מסולסלים, ומוודא ש‑URLים אינם משתנים.
- בכשל אימות, מתבצע ניסיון חוזר עם משוב עד פעמיים לפני שמירת הערכים הקיימים.

תצוגה מקדימה של הלוקאל שלך

- שרת פיתוח: `npm --prefix website run start`
- בקרו ב‑`http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

הגשה

- פתחו PR עם קובצי `code.json` הערוכים. שמרו על שינויים ממוקדים והוסיפו צילום מסך קצר כשאפשר.

---

### טיפים לאבטחה ולהגדרות {#security-and-configuration-tips}

- אל תבצעו commit ל‑`sources/manifest.json` (נוצר זמנית על ידי הבנייה)
- שמרו על `browser_specific_settings.gecko.id` יציב כדי לשמר את ערוץ העדכונים

---

### התמדה של הגדרות {#settings-persistence}

- אחסון: כל הגדרות המשתמש נמצאות ב‑`storage.local` ושורדות עדכוני הרחבה.
- התקנה: ברירות מחדל מוחלות רק כאשר מפתח חסר לחלוטין (undefined).
- עדכון: תהליך מיגרציה ממלא רק מפתחות חסרים; ערכים קיימים לעולם לא יידרסו.
- סימון סכימה: `settingsVersion` (נוכחית `1`).
- מפתחות וברירות מחדל:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- קוד: ראו `sources/background.js` → `initializeOrMigrateSettings()` וגם `SCHEMA_VERSION`.

תזרים פיתוח (הוספת הגדרה חדשה)

- העלו את `SCHEMA_VERSION` בתוך `sources/background.js`.
- הוסיפו את המפתח החדש + ברירת המחדל לאובייקט `DEFAULTS` שב‑`initializeOrMigrateSettings()`.
- השתמשו בכלל “only-if-undefined” בעת זרע ברירות מחדל; אל תדרסו ערכים קיימים.
- אם ההגדרה נראית למשתמש, חברו אותה ב‑`sources/options.js` והוסיפו מחרוזות מתורגמות.
- הוסיפו/עדכנו בדיקות (ראו `tests/background.settings.migration.test.js`).

טיפים לבדיקות ידניות

- סימולציה של התקנה חדשה: נקו את ספריית הנתונים של ההרחבה או התחילו עם פרופיל חדש.
- סימולציה של עדכון: הגדירו `settingsVersion` ל‑`0` בתוך `storage.local` וטעינו מחדש; אשרו שערכים קיימים נשמרים ללא שינוי ורק מפתחות חסרים מתווספים.

---

### פתרון תקלות {#troubleshooting}

- ודאו ש‑Thunderbird הוא 128 ESR או חדש יותר
- השתמשו ב‑Error Console לבעיות זמן ריצה
- אם נראה שהגדרות שנשמרו אינן מוחלות כראוי, אתחלו את Thunderbird ונסו שוב. (Thunderbird עשוי לאחסן מצב בין סשנים; אתחול מבטיח שהגדרות ייטענו מחדש.)

---

### CI וכיסוי {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) מריץ vitest עם ספי כיסוי (85% שורות/פונקציות/ענפים/הצהרות). אם הספים לא מתקיימים, המשימה נכשלת.
- ה‑workflow מעלה ארטיפקט `coverage-html` עם דוח HTML; הורידו אותו מעמוד הריצה (Actions → הריצה האחרונה → Artifacts).

---

### תרומות {#contributing}

- ראו CONTRIBUTING.md להנחיות סניפים/קומיטים/PR
- טיפ: צרו פרופיל פיתוח נפרד של Thunderbird לבדיקות כדי להימנע מהשפעה על הפרופיל היומי.

---

### תרגומים

- הרצת עבודות תרגום גדולות “all → all” עשויה להיות איטית ויקרה. התחילו בתת‑קבוצה (למשל, כמה דוקס ו‑1–2 לוקאלים), בחנו את התוצאה, ואז הרחיבו.

---

- מדיניות ניסיונות חוזרים: עבודות התרגום מבצעות עד 3 ניסיונות עם backoff מעריכי בשגיאות API; ראו `scripts/translate_web_docs_batch.js` ו‑`scripts/translate_web_docs_sync.js`.

צילומי מסך לדוקס

- אחסנו תמונות תחת `website/static/img/`.
- הפנו אליהן ב‑MD/MDX דרך `useBaseUrl('/img/<filename>')` כך שהנתיבים יעבדו עם `baseUrl` של האתר.
- לאחר הוספה או שינוי שם של תמונות תחת `website/static/img/`, אשרו שכל ההפניות עדיין משתמשות ב‑`useBaseUrl('/img/…')` ומוצגות בתצוגה מקדימה מקומית.
  סמלי Favicon

- הקובץ הרב‑גדלי `favicon.ico` נוצר אוטומטית בכל מסלולי הבנייה (Make + סקריפטים) דרך `website/scripts/build-favicon.mjs`.
- אין צורך בצעד ידני; עדכון `icon-*.png` מספיק.
  טיפ לבדיקה

- שמרו על `id` ללא שינוי בדוקס המתורגמים; תרגמו רק את `title` ו‑`sidebar_label` כשקיימים.

#### clean {#mt-clean}

- מטרה: הסרת ארטיפקטים מקומיים של בנייה/תצוגה מקדימה.
- שימוש: `make clean`
- מסיר (אם קיימים):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- מטרה: עיצוב, בדיקות, עדכון יומן שינויים, commit ו‑push.
- שימוש: `make commit`
- פרטים: מריץ Prettier (כתיבה), `make test`, `make test_i18n`; מוסיף ליומן השינויים כאשר יש שינויים במצב staged; דוחף ל‑`origin/<branch>`.

---

#### eslint {#mt-eslint}

- מטרה: הרצת ESLint דרך flat config.
- שימוש: `make eslint`

---

#### help {#mt-help}

- מטרה: רשימת כל המטרות עם תיאור בשורה אחת.
- שימוש: `make help`

---

#### lint {#mt-lint}

- מטרה: lint ל‑MailExtension בעזרת `web-ext`.
- שימוש: `make lint`
- הערות: מעתיק זמנית `sources/manifest_LOCAL.json` → `sources/manifest.json`; מתעלם מ‑ZIPs שנבנו; אזהרות אינן מפילות את הצינור.

---

#### menu {#mt-menu}

- מטרה: תפריט אינטראקטיבי לבחירת יעד Make וארגומנטים אופציונליים.
- שימוש: הריצו `make` ללא ארגומנטים.
- הערות: אם `whiptail` לא זמין, התפריט נופל ל‑`make help`.

---

#### pack {#mt-pack}

- מטרה: בניית ZIPs ל‑ATN ולוקאליים (תלוי ב‑`lint`).
- שימוש: `make pack`
- טיפ: העלו גרסאות בשני `sources/manifest_*.json` לפני האריזה.

---

#### prettier {#mt-prettier}

- מטרה: עיצוב המאגר במקום.
- שימוש: `make prettier`

#### prettier_check {#mt-prettier_check}

- מטרה: אימות עיצוב (ללא כתיבה).
- שימוש: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- מטרה: כינוי עבור `prettier`.
- שימוש: `make prettier_write`

---

#### test {#mt-test}

- מטרה: הרצת Prettier (כתיבה), ESLint ואז Vitest (כיסוי אם מותקן).
- שימוש: `make test`

#### test_i18n {#mt-test_i18n}

- מטרה: בדיקות ממוקדות i18n למחרוזות ההרחבה ולדפי האתר.
- שימוש: `make test_i18n`
- מריץ: `npm run test:i18n` ו‑`npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- מטרה: תרגום מחרוזות UI של ההרחבה מ‑EN ללוקאלים אחרים.
- שימוש: `make translation_app OPTS="--locales all|de,fr"`
- הערות: שומר על מבנה המפתחות ומצייני המקום; כותב לוג אל `translation_app.log`. צורת סקריפט: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- מטרה: תרגום דפי האתר מ‑`website/docs/*.md` אל `website/i18n/<locale>/...`.
- מועדף: `translate_web_docs_batch` (OpenAI Batch API)
  - שימוש (דגלים): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - מיקום ישן עדיין מתקבל: `OPTS="<doc|all> <lang|all>"`
- התנהגות: בונה JSONL, מעלה, מבצע polling כל 30 שניות, מוריד תוצאות, כותב קבצים.
- הערה: משימת batch עשויה להימשך עד 24 שעות להשלמה (לפי חלון ה‑batch של OpenAI). הקונסולה מציגה זמן שחלף בכל polling.
- סביבה: `OPENAI_API_KEY` (נדרש), אופציונלי `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ברירת מחדל 24h), `BATCH_POLL_INTERVAL_MS`.
- מורשת: `translate_web_docs_sync`
  - שימוש (דגלים): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - מיקום ישן עדיין מתקבל: `OPTS="<doc|all> <lang|all>"`
- התנהגות: בקשות סינכרוניות לכל זוג (ללא אגרגציה של batch).
- הערות: בקשות אינטראקטיביות כאשר `OPTS` מושמט. שני המצבים שומרים על בלוקי קוד/קוד בשורה ושומרים על `id` בפרונט‑מטר ללא שינוי; לוגים אל `translation_web_batch.log` (batch) או `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- מטרה: תרגום מחרוזות UI של האתר (דף הבית, סרגל ניווט, כותרת תחתונה) מ‑`website/i18n/en/code.json` לכל הלוקאלים תחת `website/i18n/<locale>/code.json` (למעט `en`).
- שימוש: `make translate_web_index` או `make translate_web_index OPTS="--locales de,fr [--force]"`
- דרישות: לייצא `OPENAI_API_KEY` (אופציונלי: `OPENAI_MODEL=gpt-4o-mini`).
- התנהגות: מאמת מבנה JSON, שומר מצייני מקום בסוגריים מסולסלים, משאיר URLים ללא שינוי, ומנסה מחדש עם משוב בשגיאות אימות.

---

#### web_build {#mt-web_build}

- מטרה: בניית אתר הדוקס אל `website/build`.
- שימוש: `make web_build OPTS="--locales en|de,en|all"` (או הגדירו `BUILD_LOCALES="en de"`)
- פנימיים: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- תלויות: מריץ `npm ci` בתוך `website/` רק אם `website/node_modules/@docusaurus` חסר.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- מטרה: בדיקת קישורים בטוחה לאופליין.
- שימוש: `make web_build_linkcheck OPTS="--locales en|all"`
- הערות: בונה אל `tmp_linkcheck_web_pages`; משכתב את `baseUrl` של GH Pages ל‑`/`; מדלג על קישורי HTTP(S) מרוחקים.

#### web_build_local_preview {#mt-web_build_local_preview}

- מטרה: תצוגה מקדימה מקומית של gh‑pages עם בדיקות/בדיקת קישורים אופציונליות.
- שימוש: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- התנהגות: מנסה קודם את שרת התצוגה של Node (`scripts/preview-server.mjs`, תומך ב‑`/__stop`), נופל ל‑`python3 -m http.server`; משרת על 8080–8090; PID ב‑`web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- מטרה: דחיפת `website/build` לענף `gh-pages`.
- שימוש: `make web_push_github`

טיפ: הגדירו `NPM=…` כדי לעקוף את מנהל החבילות שבו משתמש ה‑Makefile (ברירת מחדל `npm`).

---
