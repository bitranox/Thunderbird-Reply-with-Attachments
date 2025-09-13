---
id: usage
title: 'Foydalanish'
sidebar_label: 'Foydalanish'
---

## Usage {#usage}

- Javob bering va qo'shimcha avtomatik ravishda asl nusxalarni qo'shadi — yoki birinchi navbatda so'raydi, agar Opsiyalarda yoqilgan bo'lsa.
- Fayl nomi bo'yicha dublikatlanadi; S/MIME va inline tasvirlar har doim o'tkazib yuboriladi.
- Qora ro'yxatdagi ilovalar ham o'tkazilib yuboriladi (fayl nomlariga, yo'llarga mos keladigan ish-hujjatlari yordamida kiruvchi harflarni ko'rib chiqish). [Konfiguratsiya](configuration#blacklist-glob-patterns) ga qarang.

---

### What happens on reply {#what-happens}

- Javobni aniqlash → asl ilovalar ro'yxatini olish → S/MIME + inline ni filtrlash → zaruriy tasdiqlash → mos fayllarni qo'shish (dublikatlarni o'tkazish).

Qattiq va erkin o‘tish: Qo’shíma avval S/MIME va inline qismlarni istisno qiladi. Agar hech narsa mos kelmasa, u S/MIME/inline ni istisno qilishga davom etadi, lekin ko'proq holatlarni qabul qiladi (Kod tafsilotlarini ko'ring).

| Qism turi                                                         |      Qattiq o‘tish |       Erkin o‘tish |
| ----------------------------------------------------------------- | -----------------: | -----------------: |
| S/MIME imzo fayli `smime.p7s`                                     |   Istisno qilingan |   Istisno qilingan |
| S/MIME MIME turlari (`application/pkcs7-*`)                       |   Istisno qilingan |   Istisno qilingan |
| Inline tasvirlar uchun Kontent-ID (`image/*`)                     |   Istisno qilingan |   Istisno qilingan |
| Ilova qilingan elektron pochta (`message/rfc822`) fayl nomi bilan |       Qo'shilmaydi | Qo'shilishi mumkin |
| Oddiy fayl ilovasi fayl nomi bilan                                | Qo'shilishi mumkin | Qo'shilishi mumkin |

Misol: Ba'zi ilovalar ma'lum заголовки yo'q bo'lishi mumkin, lekin ular hali ham oddiy fayllardir (inline/S/MIME emas). Agar qattiq o‘tish hech narsani topmasa, erkin o‘tish ularni qabul qilishi mumkin va ularni qo'shishi mumkin.

---

### Cross‑reference {#cross-reference}

- Oldinga qaytarish butunlay o'zgartirilmaydi (quyida cheklovlar ko'ring).
- Bir ilovaning qo'shilmasligi mumkin bo'lgan sabablarini ko'rish uchun "Nima uchun ilovalar qo'shilmasligi mumkin" ga qarang.

---

## Behavior Details {#behavior-details}

- **Dublikatlarni oldini olish:** Qo'shimcha mix uchun o'lchov bo'lgan sessiya qiymati yordamida ishlangan soyalar muvaffaqiyatga erishadi. U asl nusxalarni ikki marta qo'shmaydi.
- Taklif etish va qayta ochish yangi tab sifatida qabul qilinadi (ya'ni, yangi urinishga ruxsat beriladi).
- **Mavjud ilovalarga hurmat:** Agar yaratuvchi allaqachon ba'zi ilovalar mavjud bo'lsa, asl nusxalar hali ham bir marta qo'shiladi, allaqachon mavjud bo'lgan fayl nomlarini o'tkazib yuboradi.
- **Istisnolarning ro'yxati:** S/MIME ob'ektlari va inline tasvirlar e'tiborsiz qoldiriladi. Agar birinchi o'tishda hech narsa mos kelmasa, erkin qidirish S/MIME bo'lmagan qismlarni yana tekshiradi.
  - **Fayl nomlari:** `smime.p7s`
  - **MIME turlari:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline tasvirlar:** xabar matnidagi Kontent-ID ga havola qilingan har qanday `image/*` qismi
  - **Ilova qilingan elektron pochta (`message/rfc822`):** agar u fayl nomiga ega bo'lsa, oddiy ilovalar sifatida hisobga olinadi; Ular qo'shilishi mumkin (duplikatlarni tekshirishga va qora ro'yxatga bog'liq).
- **Qora ro'yxat ogohlantiruvi (agar o'chirilgan bo'lsa):** Agar sizning qora ro'yxatingiz orqali nomzodlar istisno qilinsa,
  qo'shimcha kichik modal oynada ta'sir etuvchi fayllarni va mos keladigan
  naqsh(larni) ro'yxatini ko'rsatadi. Ushbu ogohlantirish shuningdek hech qanday ilovalar qo'shilmasligi mumkin bo'lgan vaqtlarda paydo bo'ladi, chunki hamma narsani istisno qilingan.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Tasdiqlash oynasi: Y/J = Ha, N/Esc = Yo'q; Tab/Shift+Tab va Qavs tugmalari e'tiborni aylantiradi.
  - [Konfiguratsiya](configuration#confirmation) da “Asosiy javob” boshlang'ich e'tiborni belgilaydi.
  - Enter fokuse qilingan tugmani faollashtiradi. Tab/Shift+Tab va o'q e'tiborni harakatlantiradi.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Tugmalar        | Harakat                                          |
| --------------- | ------------------------------------------------ |
| Y / J           | Ha tasdiqlash                                    |
| N / Esc         | Yo'q tasdiqlash                                  |
| Enter           | Fokuse qilingan tugmani faollashtirish           |
| Tab / Shift+Tab | E'tiborni oldinga/ormiga harakatlantirish        |
| O'q tugmalari   | Tugmalar orasida e'tiborni harakatlantirish      |
| Asosiy javob    | Boshlang'ich e'tiborni belgilaydi (Ha yoki Yo'q) |

---

## Limitations {#limitations}

- Oldinga qaytarish ushbu qo'shimcha tomonidan o'zgartirilmaydi (Javob va Hamma javoblar qo'llab-quvvatlanadi).
- Juda katta ilovalar Thunderbird yoki provayder cheklovlariga duchor bo'lishi mumkin.
  - Qo'shimcha fayllarni qismlarga bo'lmaydi yoki siqmaydi; u Thunderbird ning odatdagi ilova boshqarishiga asoslanadi.
- Shifrlangan xabarlar: S/MIME qismlari qasddan istisno qilingan.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Inline tasvirlar e'tiborsiz qoldiriladi: xabar matnida Kontent-ID orqali keltirilgan qismlar fayl sifatida qo'shilmaydi.
- S/MIME imzo qismlari nazarda tutilgan: `smime.p7s` kabi fayl nomlari va `application/pkcs7-signature` yoki `application/pkcs7-mime` kabi MIME turlari o‘tkazib yuboriladi.
- Qora ro'yxat naqshlari nomzodlarni filtrlashi mumkin: [Konfiguratsiya](configuration#blacklist-glob-patterns) ga qarang; moslashuv harfga sezgir emas va faqat fayl nomidir.
- Dublikat fayl nomlari qayta qo'shilmaydi: agar yaratuvchi allaqachon shu normalizatsiya qilingan nomga ega bo'lsa, u o'tkazib yuboriladi.
- Faylga oid bo'lmagan qismlar yoki fayl nomlari yo'q: faqat ishlatishga yaroqli fayl nomlari bo'lgan faylga o'xshash qismlar qo'shilishi kerak.

---

See also

- [Konfiguratsiya](configuration)
