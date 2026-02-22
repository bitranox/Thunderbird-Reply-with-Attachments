---
id: install
title: 'التثبيت'
slug: /install
sidebar_label: 'التثبيت'
---

---

## التثبيت عبر "الإضافات والسمات في Thunderbird" {#installation-in-thunderbird-recommended}

:::important أدنى إصدار لبرنامج Thunderbird
يدعم هذا الملحق Thunderbird **128 ESR أو أحدث**. الإصدارات الأقدم غير مدعومة.
:::

هذه هي طريقة التثبيت الموصى بها. الإضافات المُثبَّتة من ATN (addons.thunderbird.net) تتلقى تحديثات تلقائية. عمليات التثبيت LOCAL/dev لا تتحدّث تلقائياً.

- أدنى إصدار لبرنامج Thunderbird: 128 ESR أو أحدث.

1. في Thunderbird، اذهب إلى **الأدوات > الإضافات والسمات**.
2. ابحث عن "reply with attachments".
3. أضِف الملحق.

أو افتح صفحة الملحق مباشرةً: [إضافات Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## التثبيت اليدوي من XPI {#local-installation-in-thunderbird}

### تنزيل ملف XPI {#download-the-xpi-file}

1. اذهب إلى [صفحة إضافة Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. نزّل أحدث إصدار من الملحق كملف XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### التثبيت في Thunderbird {#install-in-thunderbird-local}

1. افتح Thunderbird.
2. اذهب إلى **الأدوات > الإضافات والسمات**.
3. في **مدير الإضافات**، انقر أيقونة الترس في الزاوية العلوية اليمنى.
4. اختر **تثبيت إضافة من ملف…** من القائمة.
5. حدّد ملف `reply_with_attachments-x.y.z-tb.xpi` الذي تم تنزيله.
6. أكّد التثبيت عند المطالبة.

---

## التثبيت للتطوير {#installation-for-development}

### تنزيل المستودع {#download-the-repository}

1. نزّل أحدث إصدار من مستودع GitHub.
2. شغّل `make help` لمزيد من المعلومات.

### التثبيت في Thunderbird {#install-in-thunderbird-dev}

1. افتح Thunderbird.
2. اذهب إلى **الأدوات > الإضافات والسمات**.
3. في **مدير الإضافات**، انقر أيقونة الترس في الزاوية العلوية اليمنى.
4. اختر **تثبيت إضافة من ملف…** من القائمة.
5. حدّد الملف المُنشأ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. أكّد التثبيت عند المطالبة.

ملاحظة: إذا لم يقبل Thunderbird ملف `.zip` على نظامك، فأعِد تسميته إلى `.xpi` وجرّب “تثبيت إضافة من ملف…” مرة أخرى.

### أين تجد ملف ZIP المحلي (LOCAL) {#where-local-zip}

- أولاً، حزّم الملحق: شغّل `make pack` في جذر المستودع.
- بعد التغليف، اعثر على ملف zip “LOCAL” في جذر المستودع (مثلاً، `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- قبل إعادة التغليف للاختبار، ارفع أرقام الإصدارات في كلٍّ من `sources/manifest_ATN.json` و`sources/manifest_LOCAL.json`.

---

## التعطيل، إلغاء التثبيت، والتحديثات {#disable-uninstall-updates}

- التعطيل: Thunderbird → الأدوات → الإضافات والسمات → اعثر على الملحق → بدّل إلى إيقاف.
- إلغاء التثبيت: نفس الواجهة → قائمة النقاط الثلاث → إزالة.
- التحديثات: عمليات التثبيت من ATN تُحدَّث تلقائياً عند اعتماد إصدارات جديدة. عمليات تثبيت LOCAL/dev لا تتحدّث تلقائياً؛ أعِد تثبيت بنية LOCAL جديدة يدوياً.
- إزالة الإعدادات بالكامل: راجع [الخصوصية → إزالة البيانات](privacy#data-removal).

راجع أيضاً

- [البدء السريع](quickstart)
