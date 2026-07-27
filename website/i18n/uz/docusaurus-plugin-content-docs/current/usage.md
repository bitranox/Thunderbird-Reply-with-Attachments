---
id: usage
title: 'Foydalanish'
sidebar_label: 'Foydalanish'
---

---

## Foydalanish {#usage}

- Javob berishda qo‘shimcha asl ilovalarni avtomatik qo‘shadi — yoki Sozlamalarda yoqilgan bo‘lsa, avval so‘raydi.
- Fayl nomi bo'yicha takroriy nusxalar olib tashlanadi; S/MIME qismlari har doim o'tkazib yuboriladi. Asl xabarga joylashtirilgan rasmlar javob matnida qoladi, Thunderbird ularni joylashtirgan joyda, va fayl sifatida nusxalanmaydi.
- Qora ro‘yxatga kiritilgan ilovalar ham o‘tkazib yuboriladi (kattayu‑kichikni farqlamaydigan glob andozalari yo‘l emas, fayl nomi bo‘yicha moslashtiriladi). [Sozlamalar](configuration#blacklist-glob-patterns)ga qarang.

---

### Javob berilganda nima bo‘ladi {#what-happens}

- Javobni aniqlash → asl biriktirmalarni ro'yxatlash → S/MIME va ichga joylashtirilgan rasmlarni o'tkazib yuborish → ixtiyoriy tasdiqlash → mos fayllarni qo'shish (takrorlanganlarni o'tkazib yuborib).

| Qism turi                                                     | Javobga nusxalandimi   |
|---------------------------------------------------------------|-----------------------:|
| S/MIME imzo fayli `smime.p7s`                                 | Yo'q                   |
| S/MIME MIME turlari (`application/pkcs7-*`)                   | Yo'q                   |
| Xabar matni `cid:` orqali joylashtirgan rasm                  | Yo'q (u matnda mavjud) |
| `Content-Disposition: inline` deb belgilangan rasm            | Yo'q (u matnda mavjud) |
| Matn hech qachon murojaat qilmaydigan `Content-ID`ga ega rasm | Ha                     |
| Fayl nomi bilan biriktirilgan email (`message/rfc822`)        | Ha                     |
| Fayl nomi bilan oddiy fayl ilovasi                            | Ha                     |

Rasm faqat asl xabar unga haqiqatan ham murojaat qilganda yoki jo'natuvchi uni ochiq
ravishda `Content-Disposition: inline` deb belgilaganda joylashtirilgan hisoblanadi.
Faqat `Content-ID` sarlavhasi yetarli emas: ba'zi pochta dasturlari uni har bir rasm
qismiga qo'yadi, jumladan haqiqiy ilovalarga ham, ular baribir nusxalanishi kerak.

---

### Kross‑havola {#cross-reference}

- Yo‘naltirish dizayn bo‘yicha o‘zgartirilmaydi (quyidagi Cheklovlarga qarang).
- Ilova nima sababdan qo‘shilmasligi mumkinligi uchun “Nega ilovalar qo‘shilmasligi mumkin” bo‘limiga qarang.

---

## Xatti‑harakat tafsilotlari {#behavior-details}

- Dublikatlarning oldini olish: qo‘shimcha har bir varaq uchun seans qiymati va xotira darajasidagi himoyadan foydalanib, yozish varag‘ini qayta ishlangan deb belgilaydi. Asl fayllarni ikki marta qo‘shmaydi.
- Yozish oynasini yopib qayta ochish yangi varaq sifatida ko‘riladi (ya’ni, yangi urinishga ruxsat beriladi).
- Mavjud ilovalarni inobatga olish: agar yozilayotgan xatda allaqachon ba’zi ilovalar bo‘lsa, asl nusxalar baribir faqat bir marta qo‘shiladi, allaqachon mavjud bo‘lgan fayl nomlari o‘tkazib yuboriladi.
- Istisnolar: S/MIME artefaktlar va ichki rasmlar fayl ilovalaridan chiqarib tashlanadi. Agar birinchi o‘tishda hech narsa mos kelmasa, yengil zahira tekshiruvi S/MIME bo‘lmagan qismlarni qayta tekshiradi. Ichki rasmlar alohida ko‘riladi: ular (yoqilganda) javob tanasida data URI sifatida tiklanadi.
  - Fayl nomlari: `smime.p7s`
  - MIME turlari: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Ichki rasmlar: Content‑ID orqali havola qilingan har qanday `image/*` qismi — fayl ilovalaridan chiqarib tashlanadi, biroq "Include inline pictures" ON bo‘lganda javob tanasiga joylashtiriladi
  - Biriktirilgan xatlar (`message/rfc822`): fayl nomi bo‘lsa, oddiy ilovalar sifatida ko‘riladi; ular qo‘shilishi mumkin (dublikat tekshiruvlari va qora ro‘yxatga bo‘ysunadi).
- Qora ro‘yxat ogohlantirishi (yoqilgan bo‘lsa): Nomzodlar qora ro‘yxatingiz tomonidan chiqarib tashlanganda,
  qo‘shimcha ta’sirlangan fayllar va mos keluvchi
  andoza(lar) ro‘yxati bilan kichik modal oynani ko‘rsatadi. Ushbu ogohlantirish hammasi istisno qilingani sababli
  hech qanday ilova qo‘shilmaydigan holatlarda ham paydo bo‘ladi.

---

## Klaviatura uchun qisqa tugmalar {#keyboard-shortcuts}

- Tasdiqlash oynasi: Y/J = Yes, N/Esc = No; Tab/Shift+Tab va O‘q tugmalari fokusni aylantiradi.
  - [Sozlamalar](configuration#confirmation) dagi “Default answer” dastlab fokuslangan tugmani belgilaydi.
  - Enter fokusdagi tugmani ishga tushiradi. Tab/Shift+Tab va o‘qlar fokusni qulaylik uchun o‘zgartiradi.

### Klaviatura uchun tezkor qo‘llanma {#keyboard-cheat-sheet}

| Tugmalar        | Amal                                       |
|-----------------|--------------------------------------------|
| Y / J           | Ha ni tasdiqlash                           |
| N / Esc         | Yo‘qni tasdiqlash                          |
| Enter           | Fokuslangan tugmani faollashtirish         |
| Tab / Shift+Tab | Fokusni oldinga/orqaga ko‘chirish          |
| O‘q tugmalari   | Tugmalar orasida fokusni ko‘chirish        |
| Default answer  | Dastlabki fokusni o‘rnatadi (Ha yoki Yo‘q) |

---

## Cheklovlar {#limitations}

- Yo‘naltirish ushbu qo‘shimcha tomonidan o‘zgartirilmaydi (Javob berish va Barchaga javob qo‘llab‑quvvatlanadi).
- Juda katta ilovalar Thunderbird yoki provayder cheklovlariga bo‘ysunishi mumkin.
  - Qo‘shimcha fayllarni bo‘laklamaydi yoki siqmaydi; u Thunderbird’ning odatdagi ilova ishloviga tayanadi.
- Shifrlangan xabarlar: S/MIME qismlari ataylab chiqarib tashlanadi.

---

## Nega ilovalar qo‘shilmasligi mumkin {#why-attachments-might-not-be-added}

- Asl xabar ichga joylashtirgan rasmlar fayl sifatida nusxalanmaydi. Ular Thunderbird joylashtirgan joyda, javob matnida allaqachon mavjud. Qarang: [Configuration](configuration#include-inline-pictures).
- S/MIME imzo qismlari dizayn bo‘yicha istisno qilingan: `smime.p7s` kabi fayl nomlari va `application/pkcs7-signature` yoki `application/pkcs7-mime` kabi MIME turlari o‘tkazib yuboriladi.
- Qora ro‘yxat andozalari nomzodlarni filtrlashi mumkin: [Sozlamalar](configuration#blacklist-glob-patterns)ga qarang; moslashtirish kattayu‑kichikni farqlamaydigan va faqat fayl nomi bo‘yicha.
- Dublikat fayl nomlari qayta qo‘shilmaydi: agar yozish oynasida allaqachon bir xil normallashtirilgan nomga ega fayl bo‘lsa, u o‘tkazib yuboriladi.
- Fayl bo‘lmagan qismlar yoki yo‘qolgan fayl nomlari: faqat foydali fayl nomiga ega faylga o‘xshash qismlar qo‘shish uchun hisobga olinadi.

---

Shuningdek qarang

- [Sozlamalar](configuration)
