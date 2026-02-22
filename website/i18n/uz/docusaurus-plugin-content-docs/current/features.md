---
id: features
title: 'Xususiyatlar'
sidebar_label: 'Xususiyatlar'
---

---

## Xususiyatlar {#features}

- Javob yozilganda asl xatdagi fayllarni avtomatik ravishda biriktiradi.
- Sozlanadigan xatti-harakat: ilovalar
  - avtomatik qo‘shilishi mumkin, yoki
  - faqat tasdiqlashdan so‘ng qo‘shilishi mumkin (kichik, qulay dialog). Sozlamalarda siz
    tasdiqlashni yoqishingiz va sukut bo‘yicha javobni (Ha/Yo‘q) tanlashingiz mumkin.
- Fayl nomlari qora ro‘yxati (glob andozalari) ma’lum fayllarning
  avtomatik biriktirilishini oldini oladi. Misollar: `*intern*`, `*secret*`, `*passwor*`.
  Moslashtirish harflar registriga bog‘liq emas va faqat fayl nomini tekshiradi; Sozlamalarda
  har bir qatorda bitta andaza ko‘rsating.
- Qora ro‘yxat ogohlantirishi (ixtiyoriy, sukut bo‘yicha yoqilgan): fayllar qora ro‘yxatingiz
  tufayli chiqarib tashlanganda, kichik modal oynada fayl va mos kelgan andoza(lar) ro‘yxati ko‘rsatiladi.
  Qorong‘i rejimga mos va klaviatura orqali qulay (yopish uchun Enter/Esc).
- Reply va Reply all bilan ishlaydi. Forwardni bu qo‘shimcha o‘zgartirmaydi.
- Siz allaqachon nimanidir biriktirgan bo‘lsangiz ham, asl fayllarni qo‘shadi; fayl nomi bo‘yicha dublikatlardan qochadi.
- Har bir yorliq bo‘yicha dublikatdan himoya bir xil yozish yorlig‘ida ikki marta qo‘shilishining oldini oladi.
- Keraksiz ilovalarning oldini olish uchun sukut bo‘yicha S/MIME sertifikatlarini o‘tkazib yuboradi.
- Matn ichidagi rasmlar (sukut bo‘yicha: YOQILGAN) qo‘shiladi. O‘rnatilgan rasmlar
  javob matni tanasida base64 data URI ko‘rinishida tiklanadi, asl ichki
  joylashuv saqlanadi. Matn ichidagi rasmlarni butunlay o‘tkazib yuborish uchun Sozlamalarda o‘chiring.

---

## Qanday ishlaydi {#how-it-works}

- Javob yozilganda, qo‘shimcha asl ilovalar ro‘yxatini tuzadi.
- Fayl ilovalaridan S/MIME imzolarini filtrlaydi; matn ichidagi rasmlar tanada qayta tiklanadi (o‘chirib qo‘yilmagan bo‘lsa).
- Ixtiyoriy ravishda tasdiqlashni so‘raydi (klaviaturaga qulay).
- Talabga mos fayllarni kompozitingizga qo‘shadi, fayl nomi bo‘yicha dublikatlardan qochadi.
- Chekka holatlar uchun Foydalanish bo‘limidagi “Nega ilovalar qo‘shilmasligi mumkin” bandiga qarang.

Maxfiylik eslatmasi: Barcha qayta ishlash Thunderbird ichida mahalliy tarzda amalga oshiriladi. Qo‘shimcha fon rejimida hech qanday tarmoq so‘rovlarini yubormaydi.

---
