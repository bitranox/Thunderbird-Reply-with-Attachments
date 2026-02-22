---
id: install
title: 'تنصیب'
slug: /install
sidebar_label: 'تنصیب'
---

---

## "Thunderbird Add-ons and Themes" کے ذریعے تنصیب {#installation-in-thunderbird-recommended}

:::important کم از کم Thunderbird ورژن
یہ ایڈ آن Thunderbird **128 ESR یا جدید تر** کی حمایت کرتا ہے۔ پرانے ورژنز معاونت یافتہ نہیں ہیں۔
:::

یہ تجویز کردہ طریقۂ تنصیب ہے۔ ATN (addons.thunderbird.net) سے نصب کیے گئے ایڈ آنز کو خودکار اپڈیٹس ملتی ہیں۔ LOCAL/dev تنصیبات خودکار طور پر اپڈیٹ نہیں ہوتیں۔

- کم از کم Thunderbird ورژن: 128 ESR یا جدید تر۔

1. Thunderbird میں، **Tools > Add-ons and Themes** پر جائیں۔
2. "reply with attachments" تلاش کریں۔
3. ایڈ آن شامل کریں۔

یا براہِ راست ایڈ آن صفحہ کھولیں: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI سے دستی تنصیب {#local-installation-in-thunderbird}

### XPI فائل ڈاؤن لوڈ کریں {#download-the-xpi-file}

1. [Thunderbird Add‑on صفحہ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) پر جائیں۔
2. ایڈ آن کا تازہ ترین ورژن XPI فائل (`reply_with_attachments-x.y.z-tb.xpi`) کے طور پر ڈاؤن لوڈ کریں۔

### Thunderbird میں انسٹال کریں {#install-in-thunderbird-local}

1. Thunderbird کھولیں۔
2. **Tools > Add-ons and Themes** پر جائیں۔
3. **Add-ons Manager** میں، اوپر دائیں کونے میں گیئر آئیکن پر کلک کریں۔
4. مینو سے **Install Add-on From File…** منتخب کریں۔
5. ڈاؤن لوڈ کی گئی `reply_with_attachments-x.y.z-tb.xpi` فائل منتخب کریں۔
6. پوچھے جانے پر تنصیب کی تصدیق کریں۔

---

## ترقیاتی مقاصد کے لیے تنصیب {#installation-for-development}

### ریپوزٹری ڈاؤن لوڈ کریں {#download-the-repository}

1. GitHub ریپوزٹری کا تازہ ترین ورژن ڈاؤن لوڈ کریں۔
2. مزید معلومات کے لیے `make help` چلائیں۔

### Thunderbird میں انسٹال کریں {#install-in-thunderbird-dev}

1. Thunderbird کھولیں۔
2. **Tools > Add-ons and Themes** پر جائیں۔
3. **Add-ons Manager** میں، اوپر دائیں کونے میں گیئر آئیکن پر کلک کریں۔
4. مینو سے **Install Add-on From File…** منتخب کریں۔
5. تیار کی گئی فائل `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` منتخب کریں۔
6. پوچھے جانے پر تنصیب کی تصدیق کریں۔

نوٹ: اگر آپ کے سسٹم پر Thunderbird `.zip` قبول نہیں کرتا، تو اس کا نام بدل کر `.xpi` رکھیں اور “Install Add‑on From File…” دوبارہ آزمائیں۔

### LOCAL ZIP کہاں ملے گی {#where-local-zip}

- اوّلًا، ایڈ آن کو پیکج کریں: ریپوزٹری کے روٹ میں `make pack` چلائیں۔
- پیکجنگ کے بعد، ریپوزٹری کے روٹ میں “LOCAL” زیپ تلاش کریں (مثلاً `2025-..-reply-with-attachments-plugin-LOCAL.zip`)۔
- ٹیسٹنگ کے لیے دوبارہ پیکج کرنے سے پہلے، `sources/manifest_ATN.json` اور `sources/manifest_LOCAL.json` دونوں میں ورژنز بڑھائیں۔

---

## غیرفعال، اَن انسٹال، اور اپڈیٹس {#disable-uninstall-updates}

- غیرفعال: Thunderbird → Tools → Add‑ons and Themes → ایڈ آن تلاش کریں → ٹوگل آف کریں۔
- اَن انسٹال: اسی ویو میں → تھری ڈاٹ مینو → Remove۔
- اپڈیٹس: ATN سے انسٹال شدہ ایڈ آنز نئی ورژنز منظور ہونے پر خودکار طور پر اپڈیٹ ہو جاتے ہیں۔ LOCAL/dev تنصیبات خودکار طور پر اپڈیٹ نہیں ہوتیں؛ نئی LOCAL بلڈ دستی طور پر دوبارہ انسٹال کریں۔
- ترتیبات مکمل طور پر ہٹانے کے لیے: [رازداری → ڈیٹا ہٹانا](privacy#data-removal) دیکھیں۔

یہ بھی دیکھیں

- [Quickstart](quickstart)
