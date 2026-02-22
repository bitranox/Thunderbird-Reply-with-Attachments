---
id: usage
title: 'Foydalanish'
sidebar_label: 'Foydalanish'
---

---

## Foydalanish {#usage}

- Javob berishda qo‘shimcha asl ilovalarni avtomatik qo‘shadi — yoki Sozlamalarda yoqilgan bo‘lsa, avval so‘raydi.
- Fayl nomi bo‘yicha dublikatlar olib tashlanadi; S/MIME qismlari har doim o‘tkazib yuboriladi. Sukut bo‘yicha ichki rasmlar javob tanasida qayta tiklanadi (Sozlamalardagi "Include inline pictures" orqali o‘chirishingiz mumkin).
- Qora ro‘yxatga kiritilgan ilovalar ham o‘tkazib yuboriladi (kattayu‑kichikni farqlamaydigan glob andozalari yo‘l emas, fayl nomi bo‘yicha moslashtiriladi). [Sozlamalar](configuration#blacklist-glob-patterns)ga qarang.

---

### Javob berilganda nima bo‘ladi {#what-happens}

- Javobni aniqlash → asl ilovalarni ro‘yxatlash → S/MIME + inline ni filtrlash → ixtiyoriy tasdiqlash → mos fayllarni qo‘shish (dublikatlarni o‘tkazib yuborish) → tanada ichki rasmlarni tiklash.

Qattiq va yengil tekshiruv: qo‘shimcha avval fayl ilovalaridan S/MIME va inline qismlarini chiqarib tashlaydi. Agar hech narsa mos kelmasa, u baribir S/MIME/inline ni chiqarib tashlaydigan, ammo ko‘proq holatlarga ruxsat beradigan yengil tekshiruvni ishga tushiradi (Kod tafsilotlariga qarang). Ichki rasmlar hech qachon fayl ilovalari sifatida qo‘shilmaydi; buning o‘rniga, "Include inline pictures" yoqilganida (sukut bo‘yicha), ular javob tanasiga to‘g‘ridan‑to‘g‘ri base64 data URI sifatida joylashtiriladi.

| Qism turi                                                |                      Qattiq tekshiruv |                      Yengil tekshiruv |
| -------------------------------------------------------- | ------------------------------------: | ------------------------------------: |
| S/MIME imzo fayli `smime.p7s`                            |                      Istisno qilingan |                      Istisno qilingan |
| S/MIME MIME turlari (`application/pkcs7-*`)              |                      Istisno qilingan |                      Istisno qilingan |
| Content‑ID orqali havola qilingan ichki rasm (`image/*`) | Istisno qilingan (tanada tiklanadi\*) | Istisno qilingan (tanada tiklanadi\*) |
| Fayl nomiga ega biriktirilgan xat (`message/rfc822`)     |                          Qo‘shilmaydi |                    Qo‘shilishi mumkin |
| Fayl nomiga ega oddiy fayl ilovasi                       |                    Qo‘shilishi mumkin |                    Qo‘shilishi mumkin |

\* "Include inline pictures" yoqilganida (sukut bo‘yicha: ON), ichki rasmlar fayl ilovalari sifatida qo‘shilmaydi, balki javob tanasiga base64 data URI ko‘rinishida joylashtiriladi. [Sozlamalar](configuration#include-inline-pictures)ga qarang.

Misol: Ba’zi ilovalarda ayrim sarlavhalar yetishmasligi mumkin, ammo ular baribir oddiy fayllardir (inline/S/MIME emas). Agar qattiq tekshiruv hech narsa topmasa, yengil tekshiruv ularni qabul qilib, biriktirishi mumkin.

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
| --------------- | ------------------------------------------ |
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

- Ichki rasmlar fayl ilovalari sifatida qo‘shilmaydi. "Include inline pictures" ON (sukut bo‘yicha) bo‘lganda, ular buning o‘rniga javob tanasiga data URI sifatida joylashtiriladi. Sozlama OFF bo‘lsa, ichki rasmlar butunlay olib tashlanadi. [Sozlamalar](configuration#include-inline-pictures)ga qarang.
- S/MIME imzo qismlari dizayn bo‘yicha istisno qilingan: `smime.p7s` kabi fayl nomlari va `application/pkcs7-signature` yoki `application/pkcs7-mime` kabi MIME turlari o‘tkazib yuboriladi.
- Qora ro‘yxat andozalari nomzodlarni filtrlashi mumkin: [Sozlamalar](configuration#blacklist-glob-patterns)ga qarang; moslashtirish kattayu‑kichikni farqlamaydigan va faqat fayl nomi bo‘yicha.
- Dublikat fayl nomlari qayta qo‘shilmaydi: agar yozish oynasida allaqachon bir xil normallashtirilgan nomga ega fayl bo‘lsa, u o‘tkazib yuboriladi.
- Fayl bo‘lmagan qismlar yoki yo‘qolgan fayl nomlari: faqat foydali fayl nomiga ega faylga o‘xshash qismlar qo‘shish uchun hisobga olinadi.

---

Shuningdek qarang

- [Sozlamalar](configuration)
