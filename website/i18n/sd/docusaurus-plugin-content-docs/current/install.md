---
id: install
title: 'انسٽاليشن'
slug: /install
sidebar_label: 'انسٽاليشن'
---

---

## "Thunderbird Add-ons and Themes" ذريعي انسٽاليشن {#installation-in-thunderbird-recommended}

:::important گهٽ ۾ گهٽ Thunderbird ورزن
هي ايڊ-آن Thunderbird 128 ESR يا نون نسخن کي سپورٽ ڪري ٿو. پراڻا نسخا سپورٽ ٿيل ناهن.
:::

هي سفارش ڪيل انسٽاليشن طريقو آهي. ATN (addons.thunderbird.net) مان انسٽال ڪيل ايڊ-آنز کي خودڪار اپڊيٽس ملن ٿيون. LOCAL/dev انسٽاليشنون پاڻمرادو اپڊيٽ نٿيون ٿين.

- گهٽ ۾ گهٽ Thunderbird ورزن: 128 ESR يا نئون.

1. Thunderbird ۾، **Tools > Add-ons and Themes** ڏانهن وڃو.
2. "reply with attachments" لاءِ ڳوليو.
3. ايڊ-آن شامل ڪريو.

يا ايڊ-آن جو صفحو سڌو کولو: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI مان هٿ سان انسٽاليشن {#local-installation-in-thunderbird}

### XPI فائل ڊائون لوڊ ڪريو {#download-the-xpi-file}

1. [Thunderbird ايڊ-آن صفحي](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) تي وڃو.
2. ايڊ-آن جو تازو نسخو XPI فائل (`reply_with_attachments-x.y.z-tb.xpi`) طور ڊائون لوڊ ڪريو.

### Thunderbird ۾ انسٽال ڪريو {#install-in-thunderbird-local}

1. Thunderbird کوليو.
2. **Tools > Add-ons and Themes** ڏانهن وڃو.
3. **Add-ons Manager** ۾، مٿئين ساڄي ڪنڊ ۾ گيئر آئڪن تي ڪلڪ ڪريو.
4. مينيو مان **Install Add-on From File…** چونڊيو.
5. ڊائون لوڊ ڪيل `reply_with_attachments-x.y.z-tb.xpi` فائل چونڊيو.
6. جڏهن پڇيو وڃي ته انسٽاليشن جي تصديق ڪريو.

---

## ڊولپمينٽ لاءِ انسٽاليشن {#installation-for-development}

### ريپوزيٽري ڊائون لوڊ ڪريو {#download-the-repository}

1. GitHub ريپوزيٽري جو تازو نسخو ڊائون لوڊ ڪريو.
2. وڌيڪ معلومات لاءِ `make help` هلائو.

### Thunderbird ۾ انسٽال ڪريو {#install-in-thunderbird-dev}

1. Thunderbird کوليو.
2. **Tools > Add-ons and Themes** ڏانهن وڃو.
3. **Add-ons Manager** ۾، مٿئين ساڄي ڪنڊ ۾ گيئر آئڪن تي ڪلڪ ڪريو.
4. مينيو مان **Install Add-on From File…** چونڊيو.
5. تيار ڪيل فائل `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` چونڊيو.
6. جڏهن پڇيو وڃي ته انسٽاليشن جي تصديق ڪريو.

نوٽ: جيڪڏهن Thunderbird توهان جي سسٽم تي `.zip` قبول نٿو ڪري، ته ان جو نالو `.xpi` رکو ۽ وري “Install Add‑on From File…” آزمائي ڏسو.

### LOCAL ZIP ڪٿي ملندي {#where-local-zip}

- پهريان، ايڊ-آن کي پيڪيج ڪريو: ريپوزيٽري جي روٽ ۾ `make pack` هلائو.
- پيڪيج ٿيڻ کان پوءِ، ريپوزيٽري جي روٽ ۾ “LOCAL” zip ڳوليو (مثال طور، `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- ٽيسٽنگ لاءِ ٻيهر پيڪيج ڪرڻ کان اڳ، `sources/manifest_ATN.json` ۽ `sources/manifest_LOCAL.json` ٻنهي ۾ ورزن اپڊيٽ ڪريو.

---

## غيرفعال، اڻ انسٽال، ۽ اپڊيٽس {#disable-uninstall-updates}

- غيرفعال: Thunderbird → Tools → Add‑ons and Themes → ايڊ-آن ڳوليو → toggle بند ڪريو.
- اڻ انسٽال: ساڳي ڏيک → ٽن نقطن وارو مينيو → Remove.
- اپڊيٽس: ATN مان انسٽاليشنون نون نسخن جي منظوري تي پاڻمرادو اپڊيٽ ٿين ٿيون. LOCAL/dev انسٽاليشنون پاڻمرادو اپڊيٽ نٿيون ٿين؛ نئون LOCAL بِلڊ هٿ سان ٻيهر انسٽال ڪريو.
- سيٽنگون مڪمل طور هٽائڻ: ڏسو [رازداري → ڊيٽا هٽائڻ](privacy#data-removal).

هي پڻ ڏسو

- [جلدي شروعات](quickstart)
