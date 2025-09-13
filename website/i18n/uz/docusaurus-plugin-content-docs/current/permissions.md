---
id: permissions
title: 'Ruxsatlar'
---

## Ruxsatlar

:::note Minimal ruxsatlar
Ushbu qo‘shimcha tomonidan hech qanday joy (veb) ruxsatlari so‘ralmaydi. Qo‘shimcha telemetriya to‘plamaydi yoki fon tarmog‘i so‘rovlarini amalga oshirmaydi. [Maxfiylik](privacy) bo‘limiga qarang.
:::

---

Qo‘shimcha faqat kichik, aniq ruxsatlar to‘plamini so‘raydi. Har biri nima uchun kerak:

- `compose`: tarkib hodisalarini kuzatish, javobingizda ilovalarni ro‘yxatga olish/qo‘shish.
- `messagesRead`: metadata o‘qish va dastlabki xabardan ilova fayllarini olish.
- `scripting`: yoqilganida kichik in-tarkib tasdiqlash dialogini kiritish.
- `windows`: xabar yuborish muvaffaqiyatsiz bo'lganda yakuniy chora sifatida kichik tasdiqlash pop-upini ochish.
- `sessions`: ikkilamchi qayta ishlashni oldini olish uchun har bir tabga bayroq saqlash.
- `storage`: variantlarni saqlash (qora ro‘yxat, tasdiqlash kalitini, default javob).
- `tabs`: tasdiqlash so‘rovlar uchun compose tabiga mo‘ljallangan xabar yuborish.

Qo‘shimcha eslatmalar:

- Ushbu qo‘shimcha tomonidan hech qanday joy ruxsatlari (veb kelish joylari) so‘ralmaydi.
- `tabs` ruxsati faqat in-tarkib tasdiqlash dialogini muvofiqlashtirishda compose tabiga mo‘ljallangan; tarixni o‘qish yoki sahifalarni navigatsiya qilish uchun ishlatilmaydi.

Ushbu ma’lumot manbada hujjatlashtirilgan va CI da sinovdan o‘tkazilgan. Qo‘shimcha telemetriya to‘plamaydi.

---

### Xulosa (ruxsatlar → maqsad) {#permissions-summary}

| Ruxsat         | Nima uchun kerak                                                                   |
| -------------- | ---------------------------------------------------------------------------------- |
| `compose`      | Tarkib hodisalarini kuzatish; javobingizda ilovalarni ro‘yxatga olish va qo‘shish. |
| `messagesRead` | Dastlabki xabar ilovalarini ro‘yxatga olish va fayl ma’lumotlarini olish.          |
| `scripting`    | Yo'qotilmaslik uchun yengil UI ni kiritish/muvofiqlashtirish.                      |
| `windows`      | Xabar yuborish muvaffaqiyatsiz bo'lganda (kamdan-kam) xavfsizlik pop-upi.          |
| `sessions`     | Takroriy qayta ishlashni oldini olish uchun har bir tabga bayroq saqlash.          |
| `storage`      | Variantlarni saqlash (qora ro’yxat, tasdiqlash kalitini, default javob).           |
| `tabs`         | Tasdiqlash so‘rovlar uchun compose tabiga mo‘ljallangan xabar yuborish.            |
| (host perms)   | Yo‘q — qo‘shimcha veb kelish joylarini so‘ramaydi.                                 |

---

## So‘ralmagan {#not-requested}

- `compose.save`, `compose.send` — qo‘shimcha sizning o‘rningizda pochta saqlamaydi yoki yubormaydi.

Bundan tashqari: [Maxfiylik](privacy) — hech qanday telemetriya, hech qanday fon tarmog‘i, faqat foydalanuvchi tashabbusi bilan bog‘lanishlar.
