---
id: install
title: 'Суурилуулалт'
slug: /install
sidebar_label: 'Суурилуулалт'
---

---

## “Thunderbird Add-ons and Themes”‑ээр суулгах {#installation-in-thunderbird-recommended}

:::important Thunderbird‑ийн хамгийн бага хувилбар
Энэ нэмэлт нь Thunderbird‑ийн **128 ESR эсвэл түүнээс шинэ** хувилбарыг дэмжинэ. Хуучин хувилбарууд дэмжигдэхгүй.
:::

Энэ нь санал болгож буй суулгах арга юм. ATN (addons.thunderbird.net)‑ээс суулгасан нэмэлтүүд автоматаар шинэчлэгдэнэ. LOCAL/dev суулгалтууд автоматаар шинэчлэгддэггүй.

- Thunderbird‑ийн хамгийн бага хувилбар: 128 ESR эсвэл түүнээс шинэ.

1. Thunderbird дотор **Tools > Add-ons and Themes** рүү очно уу.
2. "reply with attachments" гэж хайна.
3. Нэмэлтийг нэмнэ.

Эсвэл нэмэлтийн хуудсыг шууд нээнэ үү: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI‑оос гараар суулгах {#local-installation-in-thunderbird}

### XPI файлыг татаж авах {#download-the-xpi-file}

1. [Thunderbird нэмэлтийн хуудас](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) руу очно уу.
2. Нэмэлтийн хамгийн сүүлийн хувилбарыг XPI файл (`reply_with_attachments-x.y.z-tb.xpi`) хэлбэрээр татаж авна уу.

### Thunderbird дээр суулгах {#install-in-thunderbird-local}

1. Thunderbird‑ийг нээнэ.
2. **Tools > Add-ons and Themes** рүү очно уу.
3. **Add-ons Manager** дотор баруун дээд буланд байх арааны дүрс дээр дар.
4. Цэснээс **Install Add-on From File…**‑г сонго.
5. Татсан `reply_with_attachments-x.y.z-tb.xpi` файлыг сонгоно.
6. Сануулга гарвал суулгалтыг баталгаажуулна.

---

## Хөгжүүлэлтийн зориулалттай суулгалт {#installation-for-development}

### Агуулахыг татаж авах {#download-the-repository}

1. GitHub агуулахын хамгийн сүүлийн хувилбарыг татаж ав.
2. Дэлгэрэнгүй мэдээлэл авахын тулд `make help` ажиллуул.

### Thunderbird дээр суулгах {#install-in-thunderbird-dev}

1. Thunderbird‑ийг нээнэ.
2. **Tools > Add-ons and Themes** рүү очно уу.
3. **Add-ons Manager** дотор баруун дээд буланд байх арааны дүрс дээр дар.
4. Цэснээс **Install Add-on From File…**‑г сонго.
5. Үүсгэсэн файл `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`‑г сонго.
6. Сануулга гарвал суулгалтыг баталгаажуулна.

Тэмдэглэл: Хэрэв таны систем дээр Thunderbird `.zip`‑ийг хүлээж авахгүй бол түүнийг `.xpi` болгон нэрийг нь өөрчлөөд “Install Add‑on From File…”‑г дахин оролдоорой.

### LOCAL ZIP‑ийг хаанаас олох вэ {#where-local-zip}

- Эхлээд нэмэлтийг багцална: агуулахын үндсэн лавлахад `make pack`‑г ажиллуул.
- Багцалсны дараа “LOCAL” zip‑ийг агуулахын үндсэн лавлахад олно (жишээ нь, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Тестлэхээр дахин багцлахаас өмнө `sources/manifest_ATN.json` болон `sources/manifest_LOCAL.json` хоёуланд нь хувилбарын дугаарыг нэмэгдүүл.

---

## Идэвхгүй болгох, Устгах, Шинэчлэлтүүд {#disable-uninstall-updates}

- Идэвхгүй болгох: Thunderbird → Tools → Add‑ons and Themes → нэмэлтийг ол → унтраалгыг унтраа.
- Устгах: адилхан харагдац → гурван цэгтэй цэс → Remove.
- Шинэчлэлтүүд: шинэ хувилбарууд батлагдмагц ATN‑ээс суулгасан нэмэлтүүд автоматаар шинэчлэгдэнэ. LOCAL/dev суулгалтууд автоматаар шинэчлэгддэггүй; шинэ LOCAL хувилбарыг гараар дахин суулга.
- Тохиргоог бүрэн устгах: [Нууцлал → Өгөгдөл устгах](privacy#data-removal) хэсгийг үзнэ үү.

Мөн үзнэ үү

- [Түргэн эхлэх](quickstart)
