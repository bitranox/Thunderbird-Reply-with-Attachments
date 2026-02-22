---
id: install
title: 'O‘rnatish'
slug: /install
sidebar_label: 'O‘rnatish'
---

---

## "Thunderbird Qo‘shimchalar va Mavzular" orqali o‘rnatish {#installation-in-thunderbird-recommended}

:::important Minimal Thunderbird versiyasi
Ushbu qo‘shimcha Thunderbird’ning **128 ESR yoki undan yangi** talqinlarini qo‘llab-quvvatlaydi. Eski versiyalar qo‘llab-quvvatlanmaydi.
:::

Bu tavsiya etilgan o‘rnatish usuli. ATN (addons.thunderbird.net) orqali o‘rnatilgan qo‘shimchalar avtomatik yangilanadi. LOCAL/dev o‘rnatishlar avtomatik yangilanmaydi.

- Minimal Thunderbird versiyasi: 128 ESR yoki undan yangi.

1. Thunderbird’da **Tools > Add-ons and Themes** bo‘limiga o‘ting.
2. "reply with attachments" ni qidiring.
3. Qo‘shimchani qo‘shing.

Yoki qo‘shimcha sahifasini bevosita oching: [Thunderbird qo‘shimchalari (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI’dan qo‘lda o‘rnatish {#local-installation-in-thunderbird}

### XPI faylini yuklab oling {#download-the-xpi-file}

1. [Thunderbird qo‘shimcha sahifasi](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) ga o‘ting.
2. Qo‘shimchaning eng so‘nggi versiyasini XPI fayl sifatida (`reply_with_attachments-x.y.z-tb.xpi`) yuklab oling.

### Thunderbird’ga o‘rnatish {#install-in-thunderbird-local}

1. Thunderbird’ni oching.
2. **Tools > Add-ons and Themes** ga o‘ting.
3. **Add-ons Manager** ichida yuqori o‘ng burchakdagi tishli belgini bosing.
4. Menyudan **Install Add-on From File…** ni tanlang.
5. Yuklab olingan `reply_with_attachments-x.y.z-tb.xpi` faylini tanlang.
6. So‘ralganda o‘rnatishni tasdiqlang.

---

## Rivojlantirish uchun o‘rnatish {#installation-for-development}

### Repozitoriyani yuklab oling {#download-the-repository}

1. GitHub repozitoriyasining eng so‘nggi versiyasini yuklab oling.
2. Qo‘shimcha ma’lumot uchun `make help` ni ishga tushiring.

### Thunderbird’ga o‘rnatish {#install-in-thunderbird-dev}

1. Thunderbird’ni oching.
2. **Tools > Add-ons and Themes** ga o‘ting.
3. **Add-ons Manager** ichida yuqori o‘ng burchakdagi tishli belgini bosing.
4. Menyudan **Install Add-on From File…** ni tanlang.
5. Yaratilgan `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` faylini tanlang.
6. So‘ralganda o‘rnatishni tasdiqlang.

Eslatma: Agar tizimingizda Thunderbird `.zip` ni qabul qilmasa, uni `.xpi` ga qayta nomlang va yana “Install Add‑on From File…” ni sinab ko‘ring.

### LOCAL ZIP qayerdan topiladi {#where-local-zip}

- Avvalo, qo‘shimchani paketlang: repozitoriya ildizida `make pack` ni ishga tushiring.
- Paketlangandan so‘ng, repozitoriya ildizida “LOCAL” zip faylini toping (masalan, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Sinov uchun qayta paketlashdan avval, versiyalarni `sources/manifest_ATN.json` va `sources/manifest_LOCAL.json` ikkalasida ham oshiring.

---

## Faolsizlantirish, o‘rnatishni olib tashlash va yangilanishlar {#disable-uninstall-updates}

- Faolsizlantirish: Thunderbird → Tools → Add‑ons and Themes → qo‘shimchani toping → o‘chiring.
- Olib tashlash: shu oynada → uch nuqtali menyu → Remove.
- Yangilanishlar: ATN orqali o‘rnatilganlari yangi versiyalar tasdiqlanganda avtomatik yangilanadi. LOCAL/dev o‘rnatishlar avtomatik yangilanmaydi; yangi LOCAL qurilmani qo‘lda qayta o‘rnating.
- Sozlamalarni to‘liq olib tashlash: qarang [Maxfiylik → Ma’lumotlarni o‘chirish](privacy#data-removal).

Shuningdek qarang

- [Tezkor boshlash](quickstart)
