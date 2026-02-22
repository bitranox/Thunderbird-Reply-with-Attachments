---
id: install
title: 'تنصیب'
slug: /install
sidebar_label: 'تنصیب'
---

---

## "Thunderbird Add-ons and Themes" ذریعے تنصیب {#installation-in-thunderbird-recommended}

:::important تھنڈر برڈہٕ کم از کم ورژن
یہ ایڈ‑آن تھنڈر برڈ **128 ESR or newer** ہندس حمایت کران۔ پُران ورژناں ہند حمایت نِہ چھِ۔
:::

یہ سفارش شُدہ تنصیبہٕ طریقہ چھ۔ ATN (addons.thunderbird.net) پٔت نصب کٔرمُت ایڈ‑آن خودکار اپڈیٹس مِلانہٕ۔ LOCAL/dev انسٹالس آٹو‑اپڈیٹ نئ گژھی۔

- کم از کم تھنڈر برڈ ورژن: 128 ESR یا نْوتر۔

1. تھنڈر برڈ منز، **Tools > Add-ons and Themes** پٲٹھ ژھ۔
2. "reply with attachments" تلاش کٔریو۔
3. ایڈ‑آن اضافہ کٔریو۔

یا سِدھے ایڈ‑آن پیج کھولیو: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI پٔت دستی تنصیب {#local-installation-in-thunderbird}

### XPI فایل ڈاونلوڈ کٔریو {#download-the-xpi-file}

1. [تھنڈر برڈ ایڈ‑آن پیج](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) پٲٹھ ژھ۔
2. ایڈ‑آن ہندس نْوترین ورژن بطور XPI فایل ڈاونلوڈ کٔریو (`reply_with_attachments-x.y.z-tb.xpi`)۔

### تھنڈر برڈ منز نصب کٔریو {#install-in-thunderbird-local}

1. تھنڈر برڈ کھولیو۔
2. **Tools > Add-ons and Themes** پٲٹھ ژھ۔
3. **Add-ons Manager** منز، ٹاپ‑رایٹ کنہ گئیر آئیکن پٔر کلک کٔریو۔
4. مینیو منز **Install Add-on From File…** انتخاب کٔریو۔
5. ڈاونلوڈ کٔرمُت `reply_with_attachments-x.y.z-tb.xpi` فایل منتخب کٔریو۔
6. جَبو پُچھن آیہ، انسٹالیشن تصدیق کٔریو۔

---

## ڈویلپمنٹ باپت تنصیب {#installation-for-development}

### ریپوزیٹری ڈاونلوڈ کٔریو {#download-the-repository}

1. GitHub ریپوزیٹری ہندس نْوترین ورژن ڈاونلوڈ کٔریو۔
2. مزید معلومات باپت `make help` چلایو۔

### تھنڈر برڈ منز نصب کٔریو {#install-in-thunderbird-dev}

1. تھنڈر برڈ کھولیو۔
2. **Tools > Add-ons and Themes** پٲٹھ ژھ۔
3. **Add-ons Manager** منز، ٹاپ‑رایٹ کنہ گئیر آئیکن پٔر کلک کٔریو۔
4. مینیو منز **Install Add-on From File…** انتخاب کٔریو۔
5. تیار کٔرمُت فایل `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` منتخب کٔریو۔
6. جَبو پُچھن آیہ، انسٹالیشن تصدیق کٔریو۔

نوٹ: اگر تھنڈر برڈ تُہند سسٹم پٲٹھ `.zip` قبول نئ کٔرتھ، تہ یتھس ناو `.xpi` کٔریو تئ دوبار۪ “Install Add‑on From File…” آزمایو۔

### LOCAL ZIP کُتہ لبھیو {#where-local-zip}

- پہلنِ، ایڈ‑آن پیکیج کٔریو: ریپوزیٹری روٹ منز `make pack` چلایو۔
- پیکیجنگ پتہ، ریپوزیٹری روٹ منز “LOCAL” زِپ لبھیو (مثال، `2025-..-reply-with-attachments-plugin-LOCAL.zip`)۔
- ٹیسٹنگ باپت دوبار۪ پیکیج کرنہٕ برونٹھ، ورژناں دُونہٕ `sources/manifest_ATN.json` تئ `sources/manifest_LOCAL.json` منز بڑھایو۔

---

## غیرفعال، اَن انسٹال، تئ اپڈیٹس {#disable-uninstall-updates}

- غیرفعال: Thunderbird → Tools → Add‑ons and Themes → ایڈ‑آن لبھیو → ٹوگل آف کٔریو۔
- اَن انسٹال: ہَم منظر → تین نُکتن ہند مینیو → Remove۔
- اپڈیٹس: ATN پٔر نصب کٔرمُت ایڈ‑آن نۄ ورژن منظوری پتہ خودکار اپڈیٹ گژھی۔ LOCAL/dev انسٹالس خودکار اپڈیٹ نئ گژھی؛ نْو LOCAL بیلڈ ہتھوارہ دوبار۪ انسٹال کٔریو۔
- سیٹنگز مکمل ہٹاونہٕ: یہ دیکھیو [رازداری → ڈیٹا ہٹاونہٕ](privacy#data-removal)۔

یہ بھی دیکھیو

- [فوری آغاز](quickstart)
