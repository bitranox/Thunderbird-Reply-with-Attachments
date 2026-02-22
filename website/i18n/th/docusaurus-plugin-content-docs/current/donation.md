---
id: donation
title: 'บริจาค'
sidebar_label: 'บริจาค'
---

---

## บริจาค

import useBaseUrl from '@docusaurus/useBaseUrl';

หากคุณชอบ “Reply with Attachments” และต้องการสนับสนุนการพัฒนา คุณสามารถบริจาคได้ที่นี่:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="บริจาคผ่าน Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>หรือ</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="บริจาคผ่าน PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>หรือ</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy Me a Coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="สแกนเพื่อซื้อกาแฟให้ฉัน"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

ขอบคุณ! การสนับสนุนของคุณช่วยรักษาความเข้ากันได้กับ Thunderbird รุ่นใหม่ ปรับปรุงการช่วยการเข้าถึงและการทดสอบ และทำให้เอกสารประกอบทันสมัยอยู่เสมอ

หมายเหตุ

- ลิงก์สำหรับบริจาคจะเปิดก็ต่อเมื่อคุณคลิกเท่านั้น; ส่วนเสริมจะไม่ส่งคำขอเครือข่ายใดๆ เบื้องหลัง
- การสนับสนุนแบบประจำช่วยให้ดูแลระยะยาวและอัปเดตได้ทันท่วงที แต่ไม่บังคับ

---

หากปุ่มรูปภาพไม่โหลด โปรดใช้ลิงก์เหล่านี้แทน:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

การบริจาคเป็นไปโดยสมัครใจ ไม่มีการจำกัดฟีเจอร์

---

## การแสดงคำขอบริจาค (พักการเตือน 90 วัน)

ส่วนเสริมมีคุณลักษณะเพื่อความสะดวกในการซ่อนคำขอรับบริจาคช่วงระยะเวลาหนึ่งหลังจากที่คุณบริจาคแล้ว

- ตำแหน่งที่พบ
  - ตัวเลือก → ส่วนการสนับสนุน: คุณจะเห็นปุ่ม “ฉันได้บริจาคแล้ว” และพื้นที่คำใบ้ขนาดเล็ก
  - กล่องโต้ตอบการยืนยันการส่งจะแสดงปุ่ม บริจาค ด้วย; ปุ่มจะถูกซ่อนโดยอัตโนมัติเมื่อโหมดพักการเตือนทำงาน

- วิธีการทำงาน
  - การคลิก “ฉันได้บริจาคแล้ว” จะซ่อนปุ่มบริจาคและข้อความที่เกี่ยวข้องเป็นเวลา 90 วัน
  - ข้อความสถานะแสดง “ซ่อนถึง YYYY‑MM‑DD” (ตามวันที่ในเครื่องของคุณ) และมีปุ่ม “แสดงปุ่มบริจาคอีกครั้ง” เพื่อคืนการแสดงผลได้ทันที
  - หลังจาก 90 วัน ปุ่ม บริจาค จะกลับมาแสดงโดยอัตโนมัติอีกครั้ง

- ความเป็นส่วนตัวและการจัดเก็บ
  - ส่วนเสริมจะบันทึกเวลาเพียงค่าเดียวไว้ใน local storage ของ Thunderbird เพื่อจดจำช่วงเวลาพักการเตือน คีย์: `donateHideUntil` (มิลลิวินาทีแบบ epoch).
  - การตั้งค่านี้เป็นแบบเฉพาะโปรไฟล์ Thunderbird ของคุณ (ไม่ซิงก์ผ่านคลาวด์) คุณลักษณะนี้จะไม่สร้างคำขอเครือข่ายใดๆ

- การแก้ไขปัญหา
  - หากปุ่ม บริจาค ยังแสดงหลังจากคลิก “ฉันได้บริจาคแล้ว” ให้รอสักครู่หรือเปิดหน้า ตัวเลือก ใหม่; ส่วนติดต่อผู้ใช้จะอัปเดตทันทีที่มีการบันทึกการตั้งค่า
  - หากต้องการรีเซ็ตด้วยตนเอง ให้คลิก “แสดงปุ่มบริจาคอีกครั้ง” คุณยังสามารถรอจนกว่าจะถึงวันที่ที่แสดงในคำใบ้

คุณลักษณะนี้มีไว้เพื่อความสะดวกเท่านั้น; จะไม่ปิดกั้นการทำงานของส่วนเสริมและไม่เก็บรวบรวมข้อมูลส่วนบุคคลใดๆ

---
