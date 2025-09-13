---
id: support
title: 'مدد'
sidebar_label: 'مدد'
---

## FAQ {#faq}

### اٹیچمنٹس شامل نہیں ہوئیں — کیوں؟

-.inline images and S/MIME parts are intentionally excluded.

- Duplicate filenames are skipped if the compose already has the same file.
- Blacklist patterns may filter candidates; see [Configuration](configuration#blacklist-glob-patterns).

### کیا میں اٹیچمنٹس شامل کرنے سے پہلے تصدیق کر سکتا ہوں؟

جی ہاں۔ [Configuration → Confirmation](configuration#confirmation) کے تحت "Attachments شامل کرنے سے پہلے پوچھیں" کو فعال کریں۔ کی بورڈ: Y/J = ہاں، N/Esc = نہیں۔

### کیا ایڈ آن کوئی ڈیٹا بھیجتا ہے یا استعمال کو ٹریک کرتا ہے؟

نہیں۔ [Privacy](privacy) دیکھیں — نہ تو کوئی ٹیلی میٹری ہے اور نہ ہی کوئی پس منظر نیٹ ورک کی درخواستیں۔

### فارورڈ اٹیچمنٹس شامل نہیں کرتا — کیا یہ متوقع ہے؟

جی ہاں۔ صرف جواب اور سب کو جواب دینا اس ایڈ آن سے ترمیم کیے گئے ہیں؛ فارورڈ کو بے cambio چھوڑ دیا گیا ہے۔ [Limitations](usage#limitations) دیکھیں۔

### ڈونیشن سنیوز کہاں ہے؟

Options → Support سیکشن۔ [Donation Visibility](configuration#donation-visibility) دیکھیں۔

---

## Support

کیا آپ کو مدد کی ضرورت ہے یا آپ کسی بگ کی رپورٹ کرنا چاہتے ہیں؟

---

### GitHub پر ایک مسئلہ کھولیں:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Issues: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Thunderbird ورژن (جیسے، 128 ESR)، OS، اور دوبارہ پیدا کرنے کے مراحل شامل کریں
- Thunderbird کی ایرر کنسول سے متعلقہ لاگ منسلک کریں (Tools → Developer Tools → Error Console)

- Add‑ons site (ATN): آپ [add‑on page](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) کے ذریعے بھی فیڈبیک چھوڑ سکتے ہیں۔

---

### Tips

- اس بات کو یقینی بنائیں کہ آپ سپورٹ کردہ Thunderbird ورژن (128 ESR یا جدید) پر ہیں۔
- عام سیٹ اپ کے سوالات کے لئے Configuration اور Usage docs چیک کریں۔
- ترقی/ٹیسٹنگ کے لئے، Development guide دیکھیں۔
- اگر محفوظ شدہ سیٹنگیں صحیح طور پر لاگو نہیں ہوتیں تو Thunderbird کو دوبارہ شروع کریں اور دوبارہ کوشش کریں۔ (Thunderbird سیشنز کے درمیان حالت کو کیش کر سکتا ہے؛ ری اسٹارٹ یہ یقینی بناتا ہے کہ تازہ سیٹنگیں لوڈ ہوں۔)
- کم از کم دوبارہ پیدا کرنا: ایک چھوٹے ٹیسٹ میل کے ساتھ کوشش کریں جس میں ایک یا دو سادہ فائل اٹیچمنٹس ہوں۔
- یہ جانچنے کے لئے کہ آیا ڈائیلاگ کا بہاؤ شامل ہے، تصدیق ON بمقابلہ OFF کے ساتھ رویے کا موازنہ کریں۔

---

### رپورٹ میں شامل کرنے کے لئے کیا

- Thunderbird ورژن اور OS
- دوبارہ پیدا کرنے کے عین اقدامات (آپ نے کیا کیا، آپ کی توقع کیا تھی، کیا ہوا)
- کیا تصدیق فعال تھی اور آپ کی پہلے سے جواب کی ترتیب
- آپ کے بلیک لسٹ پیٹرنز کی ایک نمونہ (اگر متعلقہ ہو)
- دوبارہ پیدا کرتے وقت غلطی کی کنسول کے لاگ (Tools → Developer Tools → Error Console)
- ڈیبگ لاگنگ کو فعال کریں (اختیاری):
  - Thunderbird کی ایرر کنسول میں چلائیں: `messenger.storage.local.set({ debug: true })`
  - مسئلہ دوبارہ پیدا کریں اور متعلقہ `[RWA]` لاگ لائنیں نقل کریں۔

---

### مسئلہ ٹیمپلیٹ (کاپی/پیسٹ) {#issue-template}

- Thunderbird ورژن اور OS:
- دوبارہ پیدا کرنے کے اقدامات:
- کیا تصدیق فعال تھی؟ پہلے سے جواب:
- بلیک لسٹ پیٹرنز کی ایک مثال:
- ایرر کنسول کے لاگ (Tools → Developer Tools → Error Console):
- کچھ اور متعلقہ:

---

### ڈونیشن

اگر آپ اس پروجیکٹ کی حمایت کرنا چاہتے ہیں تو براہ کرم [Donate](donation) صفحے پر ایک چھوٹی سی شراکت پر غور کریں۔ شکریہ!
