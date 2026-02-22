---
id: install
title: 'การติดตั้ง'
slug: /install
sidebar_label: 'การติดตั้ง'
---

---

## การติดตั้งผ่าน "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important เวอร์ชันขั้นต่ำของ Thunderbird
ส่วนเสริมนี้รองรับ Thunderbird **128 ESR ขึ้นไป** เวอร์ชันที่เก่ากว่าไม่รองรับ
:::

นี่เป็นวิธีติดตั้งที่แนะนำ ส่วนเสริมที่ติดตั้งจาก ATN (addons.thunderbird.net) จะได้รับการอัปเดตอัตโนมัติ การติดตั้งแบบ LOCAL/dev จะไม่อัปเดตอัตโนมัติ

- เวอร์ชันขั้นต่ำของ Thunderbird: 128 ESR ขึ้นไป

1. ใน Thunderbird ไปที่ **Tools > Add-ons and Themes**
2. ค้นหา "reply with attachments"
3. เพิ่มส่วนเสริม

หรือเปิดหน้าส่วนเสริมโดยตรง: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## การติดตั้งแบบแมนนวลจาก XPI {#local-installation-in-thunderbird}

### ดาวน์โหลดไฟล์ XPI {#download-the-xpi-file}

1. ไปที่ [หน้า Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)
2. ดาวน์โหลดเวอร์ชันล่าสุดของส่วนเสริมเป็นไฟล์ XPI (`reply_with_attachments-x.y.z-tb.xpi`)

### ติดตั้งใน Thunderbird {#install-in-thunderbird-local}

1. เปิด Thunderbird
2. ไปที่ **Tools > Add-ons and Themes**
3. ใน **Add-ons Manager** คลิกไอคอนรูปเฟืองที่มุมขวาบน
4. เลือก **Install Add-on From File…** จากเมนู
5. เลือกไฟล์ `reply_with_attachments-x.y.z-tb.xpi` ที่ดาวน์โหลดมา
6. ยืนยันการติดตั้งเมื่อมีการแจ้งเตือน

---

## การติดตั้งสำหรับการพัฒนา {#installation-for-development}

### ดาวน์โหลดรีโพสิโทรี {#download-the-repository}

1. ดาวน์โหลดเวอร์ชันล่าสุดของรีโพสิโทรีบน GitHub
2. รัน `make help` เพื่อดูข้อมูลเพิ่มเติม

### ติดตั้งใน Thunderbird {#install-in-thunderbird-dev}

1. เปิด Thunderbird
2. ไปที่ **Tools > Add-ons and Themes**
3. ใน **Add-ons Manager** คลิกไอคอนรูปเฟืองที่มุมขวาบน
4. เลือก **Install Add-on From File…** จากเมนู
5. เลือกไฟล์ที่สร้างขึ้น `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`
6. ยืนยันการติดตั้งเมื่อมีการแจ้งเตือน

หมายเหตุ: หาก Thunderbird ไม่ยอมรับ `.zip` บนระบบของคุณ ให้เปลี่ยนชื่อเป็น `.xpi` แล้วลอง “Install Add‑on From File…” อีกครั้ง

### หา LOCAL ZIP ได้ที่ไหน {#where-local-zip}

- ขั้นแรก แพ็กส่วนเสริม: รัน `make pack` ที่รูทของรีโพสิโทรี
- หลังจากแพ็กแล้ว ให้หาไฟล์ zip “LOCAL” ที่รูทของรีโพสิโทรี (เช่น `2025-..-reply-with-attachments-plugin-LOCAL.zip`)
- ก่อนแพ็กใหม่สำหรับการทดสอบ ให้เพิ่มเลขเวอร์ชันทั้งใน `sources/manifest_ATN.json` และ `sources/manifest_LOCAL.json`

---

## ปิดใช้งาน ถอนการติดตั้ง และอัปเดต {#disable-uninstall-updates}

- ปิดใช้งาน: Thunderbird → Tools → Add‑ons and Themes → ค้นหาส่วนเสริม → ปิดสวิตช์
- ถอนการติดตั้ง: มุมมองเดียวกัน → เมนูสามจุด → Remove
- อัปเดต: การติดตั้งจาก ATN จะอัปเดตอัตโนมัติเมื่อรุ่นใหม่ได้รับการอนุมัติ การติดตั้งแบบ LOCAL/dev จะไม่อัปเดตอัตโนมัติ; ติดตั้งบิลด์ LOCAL ใหม่ด้วยตนเอง
- ลบการตั้งค่าออกทั้งหมด: ดู [ความเป็นส่วนตัว → การลบข้อมูล](privacy#data-removal)

ดูเพิ่มเติม

- [เริ่มต้นอย่างรวดเร็ว](quickstart)
