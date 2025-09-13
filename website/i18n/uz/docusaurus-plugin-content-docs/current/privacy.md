---
id: privacy
title: 'Maxfiylik'
sidebar_label: 'Maxfiylik'
---

## Maxfiylik

:::note Telemetriya yo'q; fon tarmog'i yo'q
Ushbu qo'shimcha **hech qanday** analitika/telemetriya to'playdi va **hech qanday** fon tarmog'i so'rovlarini amalga oshirmaydi. Har qanday tarmoqga kirish faqat siz tashqi havolani bosganingizda (Hujjatlar, GitHub, Xayriya) amalga oshiriladi.
:::

Reply with Attachments analitika yoki telemetriya to'playdi va ma'lumotlaringizni hech joyga yubormaydi.

Qo'shimcha nima qiladi:

- O'zgarmas xabarni lokal ravishda (Thunderbird API) javobingizga qo'shish uchun qo'shimcha metadata va fayllarni o'qiydi.
- Sizning variantlaringizni (qora ro'yxat, tasdiqlash, standart javob) Thunderbird ning lokal saqlash joyida saqlaydi.

Qo'shimcha nima qilmaydi:

- Hech qanday kuzatuv, analitika, nosozlikni hisobot berish yoki masofadan loglash.
- Tashqi havolalarni ochmaguncha hech qanday fon tarmog'i so'rovlariga ega emas (Hujjatlar, GitHub, Xayriya).

Ruxsatlar [Ruxsatlar](permissions) sahifasida hujjatlashtirilgan.

---

## Kontent Xavfsizlik Siyosati (CSP) {#content-security-policy-csp}

Variantlar va pop-up sahifalari inline skriptlardan qochmoqda. Barcha JavaScript qo'shimcha bilan birga keltirilgan fayllardan yuklanadi, bu esa Thunderbird da qat'iy CSP ga rioya qilishni ta'minlaydi. Agar siz hujjatlarda kod qismlarini joylashtirsangiz, ular faqat misollar sifatida keltiriladi va qo'shimcha tomonidan bajarilmaydi.

---

## Ma'lumotlarni saqlash {#data-storage}

- Foydalanuvchi afzalliklari (qora ro'yxat, tasdiqlash tugmasini o'zgartirish, standart javob) ushbu qo'shimcha uchun Thunderbird ning `storage.local` da saqlanadi.
- Qo'shimcha tomonidan bulut sinxronizatsiyasi amalga oshirilmaydi.

---

## Tarmoq {#network}

- Qo'shimcha hech qanday fon tarmoq faoliyatini amalga oshirmaydi.
- Har qanday tarmoqga kirish faqat siz havolalarni bosganingizda (Hujjatlar, GitHub, Xayriya) yoki Thunderbird o'zi ushbu qo'shimchaga aloqasi bo'lmagan oddiy operatsiyalarni bajarishda sodir bo'ladi.

---

## Ma'lumotlarni olib tashlash {#data-removal}

- Qo'shimchani o'rnatib tashlash uning kodini olib tashlaydi.
- Sozlamalar faqat Thunderbird ning `storage.local` da saqlanadi va o'rnatib tashlanganda olib tashlanadi; hech qanday tashqi saqlash mavjud emas.
- O'rnatmasdan sozlamalarni qayta tiklash:
  - Variantlar sahifasi: qora ro'yxat va qora ro'yxat ogohlantirishlari uchun “Qaytarish bo'yicha standartlarga” foydalaning.
  - Murakkab: Thunderbird → Asboblar → Rivojlantiruvchi asboblar → Qo'shimchalarni muhokama qilish, kengaytma saqlashini oching va zarur bo'lsa kalitlarni tozalang.

---
