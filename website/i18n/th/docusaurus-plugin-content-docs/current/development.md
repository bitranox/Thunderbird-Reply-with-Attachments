---
id: development
title: การพัฒนา
sidebar_label: การพัฒนา
---

## คู่มือการพัฒนา

### ข้อกำหนดเบื้องต้น

- Node.js 18+ และ npm
- Thunderbird 128 ESR ขึ้นไป (สำหรับทดสอบด้วยตนเอง)

### โครงสร้างโปรเจ็กต์ (ภาพรวม)

- Root: สคริปต์แพ็กเกจ `distribution_zip_packer.sh`, เอกสาร, สกรีนช็อต
- `sources/`: โค้ดหลักของส่วนเสริม (background, UI options/popup, manifests, icons)
- `tests/`: ชุดทดสอบ Vitest
- `website/`: เอกสาร Docusaurus (i18n ภายใต้ `website/i18n/de/...`)

### ติดตั้ง & เครื่องมือ

- ติดตั้ง dependencies ที่ root: `npm ci`
- เอกสาร (ทางเลือก): `cd website && npm ci`
- ดูงานที่มี: `make help`

### สร้าง & แพ็กเกจ

- สร้าง ZIP: `make pack`
  - ได้ ZIP แบบ ATN และ LOCAL ในรากของ repo (อย่าแก้ไข artifact ด้วยมือ)
  - เคล็ดลับ: อัปเดตเวอร์ชันใน `sources/manifest_ATN.json` และ `sources/manifest_LOCAL.json` ก่อนแพ็กเกจ
- ติดตั้งด้วยตนเอง (dev): Thunderbird → Tools → Add‑ons and Themes → เฟือง → Install Add‑on From File… → เลือก ZIP ที่สร้าง

### ทดสอบ

- ชุดเต็ม: `make test` (Vitest)
- ความครอบคลุม (ทางเลือก):
  - `npm i -D @vitest/coverage-v8`
  - รัน `make test`; เปิด `coverage/index.html` เพื่อดูรายงาน HTML
- เฉพาะ i18n: `make test-i18n` (parity, placeholders, titles)

### ดีบัก & ล็อก

- Error Console: Tools → Developer Tools → Error Console
- เปิด/ปิดล็อกแบบละเอียดระหว่างรันไทม์:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- ล็อกจะปรากฏขณะเขียน/ส่งคำตอบ

### เอกสาร (เว็บไซต์)

- เซิร์ฟเวอร์พัฒนา: `cd website && npm run start`
- สร้างไซต์แบบสแตติก: `cd website && npm run build`
- i18n: ภาษาอังกฤษอยู่ที่ `website/docs/*.md`; ภาษาเยอรมันอยู่ที่ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- การค้นหา: หากตั้งค่า Algolia DocSearch env vars ใน CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) ไซต์จะใช้ Algolia; ไม่เช่นนั้นใช้การค้นหาแบบโลคอล ที่หน้าแรกกด `/` หรือ `Ctrl+K`

### ความปลอดภัย & เคล็ดลับการตั้งค่า

- ห้าม commit `sources/manifest.json` (ถูกสร้างชั่วคราวโดยขั้นตอน build)
- รักษา `browser_specific_settings.gecko.id` ให้คงที่เพื่อคงช่องทางอัปเดต

### แก้ไขปัญหา

- ใช้ Thunderbird 128 ESR ขึ้นไป
- ใช้ Error Console สำหรับปัญหาระหว่างรันไทม์

### CI & ความครอบคลุม

- GitHub Actions (`CI — Tests`) รัน vitest พร้อมเกณฑ์ความครอบคลุม (85% lines/functions/branches/statements) หากไม่ถึงเกณฑ์จะถือว่าล้มเหลว
- เวิร์กโฟลว์อัปโหลด artifact `coverage-html` ที่มีรายงาน HTML; ดาวน์โหลดจากหน้า run (Actions → latest run → Artifacts)

### การมีส่วนร่วม

- ดู CONTRIBUTING.md สำหรับแนวทางสาขา/คอมมิต/PR
