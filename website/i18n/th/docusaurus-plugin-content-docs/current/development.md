---
id: development
title: 'การพัฒนา'
sidebar_label: 'การพัฒนา'
---

---

## คู่มือการพัฒนา {#development-guide}

:::note แก้ไขเฉพาะภาษาอังกฤษ; การแปลจะถูกแพร่ต่อ
อัปเดตเอกสารเฉพาะภายใต้ `website/docs` (ภาษาอังกฤษ) เท่านั้น การแปลภายใต้ `website/i18n/<locale>/…` ถูกสร้างอัตโนมัติและไม่ควรแก้ไขด้วยตนเอง ใช้งานงานแปล (เช่น `make translate_web_docs_batch`) เพื่อรีเฟรชเนื้อหาภาษาท้องถิ่น
:::

### ข้อกำหนดเบื้องต้น {#prerequisites}

- Node.js 22+ และ npm (ทดสอบกับ Node 22)
- Thunderbird 128 ESR ขึ้นไป (สำหรับทดสอบด้วยตนเอง)

---

### เค้าโครงโปรเจ็กต์ (ภาพรวม) {#project-layout-high-level}

- รูท: สคริปต์แพ็กเกจ `distribution_zip_packer.sh`, เอกสาร, สครีนช็อต
- `sources/`: โค้ดส่วนเสริมหลัก (background, UI options/popup, manifests, ไอคอน)
- `tests/`: ชุดทดสอบ Vitest
- `website/`: เอกสาร Docusaurus (พร้อม i18n ใต้ `website/i18n/de/...`)

---

### ติดตั้งและเครื่องมือ {#install-and-tooling}

- ติดตั้ง dependencies ระดับรูท: `npm ci`
- เอกสาร (ไม่บังคับ): `cd website && npm ci`
- ดูรายชื่อ targets: `make help`

---

### พัฒนาแบบสด (web‑ext run) {#live-dev-web-ext}

- วงจรทดสอบเร็วใน Firefox Desktop (เฉพาะ UI smoke‑tests):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- รันใน Thunderbird (แนะนำสำหรับ MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- เคล็ดลับ:
- เปิด Error Console ของ Thunderbird ไว้เสมอ (Tools → Developer Tools → Error Console)
- หน้า event ของ MV3 จะถูกระงับเมื่อว่างงาน; ให้รีโหลดส่วนเสริมหลังแก้โค้ด หรือปล่อยให้ web‑ext รีโหลดอัตโนมัติ
- พฤติกรรมเฉพาะของ Firefox บางอย่างอาจต่างกัน; ควรตรวจสอบใน Thunderbird เสมอเพื่อให้ API สอดคล้องกัน
- พาธไบนารีของ Thunderbird (ตัวอย่าง):
- Linux: `thunderbird` (เช่น `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- การแยกโปรไฟล์: ใช้โปรไฟล์ Thunderbird แยกสำหรับการพัฒนาเพื่อหลีกเลี่ยงผลกระทบต่อการใช้งานประจำวันของคุณ

---

### เป้าหมาย Make (按ตัวอักษร) {#make-targets-alphabetical}

Makefile ทำให้โฟลว์การพัฒนาทั่วไปเป็นมาตรฐาน รัน `make help` ได้ตลอดเวลาเพื่อดูสรุปแบบบรรทัดเดียวของทุกเป้าหมาย

เคล็ดลับ: การรัน `make` โดยไม่ระบุเป้าหมายจะเปิดเมนู Whiptail แบบง่ายเพื่อเลือกเป้าหมาย

| เป้าหมาย                                                 | คำอธิบายแบบบรรทัดเดียว                                                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ลบอาร์ติแฟกต์การ build/preview ภายในเครื่อง (tmp/, web-local-preview/, website/build/).        |
| [`commit`](#mt-commit)                                   | จัดรูปแบบ, รันทดสอบ (รวม i18n), อัปเดต changelog, commit และ push.                             |
| [`eslint`](#mt-eslint)                                   | รัน ESLint ผ่าน flat config (`npm run -s lint:eslint`).                                        |
| [`help`](#mt-help)                                       | แสดงรายการ targets ทั้งหมดพร้อมเอกสารแบบบรรทัดเดียว (เรียงแล้ว).                               |
| [`lint`](#mt-lint)                                       | web‑ext lint บน `sources/` (manifest ชั่วคราว; เมิน ZIP; ไม่ทำให้ล้มเหลว).                     |
| [`menu`](#mt-menu)                                       | เมนูโต้ตอบเพื่อเลือกเป้าหมายและอาร์กิวเมนต์เสริม.                                              |
| [`pack`](#mt-pack)                                       | สร้างไฟล์ ZIP สำหรับ ATN และ LOCAL (รัน linter; เรียกสคริปต์ packer).                          |
| [`prettier`](#mt-prettier)                               | จัดรูปแบบที่รีโปโดยตรง (เขียนการเปลี่ยนแปลง).                                                  |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ในโหมดตรวจสอบ (ไม่เขียน); ล้มเหลวหากต้องจัดรูปแบบใหม่.                                |
| [`prettier_write`](#mt-prettier_write)                   | นามแฝงของ `prettier`.                                                                          |
| [`test`](#mt-test)                                       | Prettier (write), ESLint, แล้ว Vitest (มี coverage ถ้าตั้งค่าไว้).                             |
| [`test_i18n`](#mt-test_i18n)                             | การทดสอบเฉพาะ i18n: ตัวแทน/ความสอดคล้องของส่วนเสริม + ความสอดคล้องของเว็บไซต์.                 |
| [`translate_app`](#mt-translation-app)                   | นามแฝงของ `translation_app`.                                                                   |
| [`translation_app`](#mt-translation-app)                 | แปลสตริง UI ของแอปจาก `sources/_locales/en/messages.json`.                                     |
| [`translate_web_docs_batch`](#mt-translation-web)        | แปลเอกสารเว็บไซต์ผ่าน OpenAI Batch API (แนะนำ).                                                |
| [`translate_web_docs_sync`](#mt-translation-web)         | แปลเอกสารเว็บไซต์แบบซิงโครนัส (เดิม, ไม่เป็น batch).                                           |
| [`translate_web_index`](#mt-translation_web_index)       | นามแฝงของ `translation_web_index`.                                                             |
| [`translation_web_index`](#mt-translation_web_index)     | แปล UI หน้าแรก/แถบนำทาง/ส่วนท้าย (`website/i18n/en/code.json → .../<lang>/code.json`).         |
| [`web_build`](#mt-web_build)                             | บิลด์เอกสารไปที่ `website/build` (รองรับ `--locales` / `BUILD_LOCALES`).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | ตรวจลิงก์แบบปลอดภัยออฟไลน์ (ข้ามลิงก์ HTTP[S] ภายนอก).                                         |
| [`web_build_local_preview`](#mt-web_build_local_preview) | พรีวิว gh‑pages ภายในเครื่อง; ให้บริการอัตโนมัติที่พอร์ต 8080–8090; มีตัวเลือกทดสอบ/ตรวจลิงก์. |
| [`web_push_github`](#mt-web_push_github)                 | พุช `website/build` ไปยังสาขา `gh-pages`.                                                      |

Syntax for options

- ใช้ `make <command> OPTS="…"` เพื่อส่งออปชัน (แนะนำให้ใส่เครื่องหมายอัญประกาศ) แต่ละเป้าหมายด้านล่างมีตัวอย่างการใช้งาน

--

-

#### เคล็ดลับการบิลด์ตามโลเคล {#locale-build-tips}

- บิลด์เฉพาะบางโลเคล: ตั้งค่า `BUILD_LOCALES="en de"` หรือส่ง `OPTS="--locales en,de"` ให้กับเป้าหมายเว็บ
- พรีวิวโลเคลเฉพาะ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`

---

### บิลด์และแพ็กเกจ {#build-and-package}

- บิลด์ ZIP: `make pack`
- ได้ ZIP สำหรับ ATN และ LOCAL ที่รูทของรีโป (อย่าแก้ไขอาร์ติแฟกต์ด้วยมือ)
- เคล็ดลับ: อัปเดตเวอร์ชันในทั้ง `sources/manifest_ATN.json` และ `sources/manifest_LOCAL.json` ก่อนแพ็กเกจ
- ติดตั้งแบบแมนนวล (dev): Thunderbird → Tools → Add‑ons and Themes → รูปเฟือง → Install Add‑on From File… → เลือก ZIP ที่บิลด์แล้ว

---

### ทดสอบ {#test}

- ชุดเต็ม: `make test` (Vitest)
- Coverage (ไม่บังคับ):
- `npm i -D @vitest/coverage-v8`
- รัน `make test`; เปิด `coverage/index.html` เพื่อดูรายงาน HTML
- เฉพาะ i18n: `make test_i18n` (คีย์ UI/ตัวแทน/ชื่อเรื่อง + ความสอดคล้องของเว็บไซต์รายโลเคลรายเอกสาร พร้อมตรวจ id/title/sidebar_label)

---

### ดีบักและล็อก {#debugging-and-logs}

- คอนโซลข้อผิดพลาด: Tools → Developer Tools → Error Console
- สลับบันทึกแบบละเอียดระหว่างรันไทม์:
- เปิด: `messenger.storage.local.set({ debug: true })`
- ปิด: `messenger.storage.local.set({ debug: false })`
- บันทึกจะแสดงขณะเขียน/ส่งข้อความตอบ

---

### เอกสาร (เว็บไซต์) {#docs-website}

- เซิร์ฟเวอร์สำหรับนักพัฒนา: `cd website && npm run start`
- บิลด์เว็บไซต์สถิต: `cd website && npm run build`
- คำสั่ง Make ที่เทียบเท่า (เรียงตามตัวอักษร): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ตัวอย่างการใช้งาน:
- เฉพาะ EN, ข้าม tests/link‑check, ไม่ push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ทุก locale พร้อม tests/link‑check แล้ว push: `make web_build_local_preview && make web_push_github`
- ก่อนเผยแพร่ ให้รันการตรวจลิงก์แบบปลอดภัยออฟไลน์: `make web_build_linkcheck`.
- i18n: ภาษาอังกฤษอยู่ใน `website/docs/*.md`; ภาษาเยอรมันอยู่ใน `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- การค้นหา: หากตั้งค่าตัวแปรสภาพแวดล้อม Algolia DocSearch ใน CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) ไซต์จะใช้การค้นหา Algolia มิฉะนั้นจะถอยไปใช้การค้นหาภายในเครื่อง บนหน้าแรก กด `/` หรือ `Ctrl+K` เพื่อเปิดกล่องค้นหา

---

#### เส้นทางเปลี่ยนเส้นทางการบริจาค {#donate-redirect}

- `website/src/pages/donate.js`
- เส้นทาง: `/donate` (และ `/<locale>/donate`)
- พฤติกรรม:
- หากเส้นทางปัจจุบันมี locale (เช่น `/de/donate`) ให้ใช้ค่านั้น
- มิฉะนั้น เลือกตัวที่ตรงที่สุดจาก `navigator.languages` เทียบกับ locales ที่ตั้งค่าไว้; ถ้าไม่พบให้ใช้ locale เริ่มต้น
- เปลี่ยนเส้นทางไปที่:
- `en` → `/docs/donation`
- อื่นๆ → `/<locale>/docs/donation`
- ใช้ `useBaseUrl` เพื่อจัดการ baseUrl อย่างถูกต้อง
- มี meta refresh + ลิงก์ `noscript` เป็นแผนสำรอง

---

---

#### เคล็ดลับพรีวิว {#preview-tips}

- หยุดพรีวิวของ Node อย่างถูกวิธี: เปิด `http://localhost:<port>/__stop` (พิมพ์หลังจาก `Local server started`).
- หากภาพไม่โหลดใน MDX/JSX ให้ใช้ `useBaseUrl('/img/...')` เพื่อให้เคารพ `baseUrl` ของไซต์
- พรีวิวจะเริ่มก่อน; การตรวจลิงก์ทำภายหลังและไม่บล็อก (ลิงก์ภายนอกที่เสียจะไม่หยุดพรีวิว)
- ตัวอย่าง URL พรีวิว: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (พิมพ์หลัง “Local server started”).
- ลิงก์ภายนอกในการตรวจลิงก์: บางไซต์ภายนอก (เช่น addons.thunderbird.net) บล็อกบอทเก็บข้อมูลอัตโนมัติและอาจแสดง 403 ในการตรวจลิงก์ พรีวิวยังเริ่มได้ตามปกติ; สามารถละเว้นได้อย่างปลอดภัย

---

#### แปลเว็บไซต์ {#translate-website}

สิ่งที่คุณสามารถแปลได้

- เฉพาะ UI ของเว็บไซต์: หน้าแรก แถบนำทาง ส่วนท้าย และสตริง UI อื่นๆ เนื้อหาเอกสารยังคงเป็นภาษาอังกฤษเท่านั้นในตอนนี้

ตำแหน่งที่แก้ไข

- แก้ไข `website/i18n/<locale>/code.json` (ใช้ `en` เป็นข้อมูลอ้างอิง) เก็บ placeholders เช่น `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ไว้โดยไม่เปลี่ยนแปลง

สร้างหรือรีเฟรชไฟล์

- สร้างสตับที่ขาดสำหรับทุก locale: `npm --prefix website run i18n:stubs`
- เขียนทับสตับจากภาษาอังกฤษ (หลังเพิ่มสตริงใหม่): `npm --prefix website run i18n:stubs:force`
- ทางเลือกสำหรับหนึ่ง locale: `npx --prefix website docusaurus write-translations --locale <locale>`

แปลสตริง UI ของหน้าแรก/แถบนำทาง/ส่วนท้าย (OpenAI)

- ตั้งค่าข้อมูลประจำตัวครั้งเดียว (shell หรือ .env):
- `export OPENAI_API_KEY=sk-...`
- อ็อปชัน: `export OPENAI_MODEL=gpt-4o-mini`
- ทำครั้งเดียว (ทุก locale ยกเว้น en): `make translate_web_index`
- จำกัดเฉพาะบาง locale: `make translate_web_index OPTS="--locales de,fr"`
- เขียนทับค่าที่มีอยู่: `make translate_web_index OPTS="--force"`

การตรวจสอบความถูกต้องและการลองซ้ำ

- สคริปต์แปลตรวจสอบโครงสร้าง JSON, รักษาตัวแทนในปีกกามปู, และทำให้แน่ใจว่า URL ไม่ถูกเปลี่ยน
- หากตรวจสอบไม่ผ่าน จะลองใหม่พร้อมคำติชมได้สูงสุด 2 ครั้งก่อนคงค่าปัจจุบันไว้

พรีวิว locale ของคุณ

- เซิร์ฟเวอร์นักพัฒนา: `npm --prefix website run start`
- ไปที่ `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

การส่ง

- เปิด PR พร้อมไฟล์ `code.json` ที่แก้ไขแล้ว รักษาการเปลี่ยนแปลงให้เฉพาะเจาะจง และแนบภาพหน้าจอสั้นๆ เมื่อเป็นไปได้

---

### เคล็ดลับด้านความปลอดภัยและการกำหนดค่า {#security-and-configuration-tips}

- ห้าม commit `sources/manifest.json` (ถูกสร้างชั่วคราวโดยกระบวนการ build)
- คง `browser_specific_settings.gecko.id` ให้คงที่เพื่อรักษาช่องทางอัปเดต

---

### การคงอยู่ของการตั้งค่า {#settings-persistence}

- ที่จัดเก็บ: การตั้งค่าผู้ใช้ทั้งหมดอยู่ใน `storage.local` และคงอยู่ข้ามการอัปเดตส่วนเสริม
- การติดตั้ง: ค่าปริยายจะถูกใช้เฉพาะเมื่อคีย์ไม่มีอยู่จริง (undefined)
- การอัปเดต: กระบวนการ migration จะเติมเฉพาะคีย์ที่หายไป; จะไม่เขียนทับค่าที่มีอยู่
- ตัวบ่งชี้สคีมา: `settingsVersion` (ปัจจุบัน `1`).
- คีย์และค่าเริ่มต้น:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- โค้ด: ดู `sources/background.js` → `initializeOrMigrateSettings()` และ `SCHEMA_VERSION`.

เวิร์กโฟลว์สำหรับนักพัฒนา (การเพิ่มการตั้งค่าใหม่)

- เพิ่ม `SCHEMA_VERSION` ใน `sources/background.js`.
- เพิ่มคีย์ใหม่ + ค่าเริ่มต้นไปยังอ็อบเจ็กต์ `DEFAULTS` ใน `initializeOrMigrateSettings()`.
- ใช้กฎ "only-if-undefined" เมื่อใส่ค่าเริ่มต้น; อย่าเขียนทับค่าที่มีอยู่
- หากการตั้งค่าเห็นได้โดยผู้ใช้ ให้เชื่อมใน `sources/options.js` และเพิ่มสตริงภาษาท้องถิ่น
- เพิ่ม/ปรับการทดสอบ (ดู `tests/background.settings.migration.test.js`).

เคล็ดลับการทดสอบแมนนวล

- จำลองการติดตั้งใหม่: ลบโฟลเดอร์ข้อมูลของส่วนเสริมหรือเริ่มด้วยโปรไฟล์ใหม่
- จำลองการอัปเดต: ตั้งค่า `settingsVersion` เป็น `0` ใน `storage.local` แล้วรีโหลด; ยืนยันว่าค่าที่มีอยู่ไม่ถูกเปลี่ยน และมีการเพิ่มเฉพาะคีย์ที่หายไป

---

### การแก้ปัญหา {#troubleshooting}

- ตรวจสอบให้แน่ใจว่า Thunderbird เป็นเวอร์ชัน 128 ESR ขึ้นไป
- ใช้ Error Console สำหรับปัญหาระหว่างรันไทม์
- หากการตั้งค่าที่บันทึกไว้เหมือนไม่ถูกนำมาใช้ ให้รีสตาร์ต Thunderbird แล้วลองอีกครั้ง (Thunderbird อาจแคชสถานะข้ามเซสชัน; การรีสตาร์ตช่วยให้โหลดการตั้งค่าใหม่อย่างแน่ใจ)

---

### CI และ Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) รัน vitest พร้อมเกณฑ์ coverage (85% สำหรับ lines/functions/branches/statements) หากไม่ถึงเกณฑ์ งานจะล้มเหลว
- เวิร์กโฟลว์อัปโหลดอาร์ติแฟกต์ `coverage-html` ที่มีรายงาน HTML; ดาวน์โหลดได้จากหน้าการรัน (Actions → การรันล่าสุด → Artifacts)

---

### การมีส่วนร่วม {#contributing}

- ดู CONTRIBUTING.md สำหรับแนวทางสาขา/คอมมิต/PR
- เคล็ดลับ: สร้างโปรไฟล์พัฒนา Thunderbird แยกต่างหากสำหรับการทดสอบเพื่อหลีกเลี่ยงผลกระทบต่อโปรไฟล์ที่ใช้งานประจำวัน

---

### การแปล

- งานแปลขนาดใหญ่แบบ “all → all” อาจช้าและมีค่าใช้จ่ายสูง เริ่มจากชุดย่อยก่อน (เช่น เอกสารไม่กี่หน้าและ 1–2 โลเคล) ตรวจสอบผลลัพธ์ แล้วค่อยขยาย

---

- นโยบายการลองซ้ำ: งานแปลจะลองซ้ำได้สูงสุด 3 ครั้งด้วยการหน่วงเวลาแบบทวีคูณเมื่อเกิดข้อผิดพลาดจาก API; ดู `scripts/translate_web_docs_batch.js` และ `scripts/translate_web_docs_sync.js`.

สกรีนช็อตสำหรับเอกสาร

- จัดเก็บรูปภาพไว้ใต้ `website/static/img/`.
- อ้างอิงใน MD/MDX ผ่าน `useBaseUrl('/img/<filename>')` เพื่อให้พาธทำงานกับ `baseUrl` ของไซต์
- หลังเพิ่มหรือเปลี่ยนชื่อรูปภาพใต้ `website/static/img/` ให้ยืนยันว่าการอ้างอิงทั้งหมดยังใช้ `useBaseUrl('/img/…')` และเรนเดอร์ได้ในพรีวิวภายในเครื่อง
  ไอคอนเว็บไซต์ (favicons)

- ไฟล์ `favicon.ico` หลายขนาดจะถูกสร้างอัตโนมัติในทุกเส้นทางการบิลด์ (Make + สคริปต์) ผ่าน `website/scripts/build-favicon.mjs`
- ไม่ต้องมีขั้นตอนแมนนวล; อัปเดต `icon-*.png` ก็เพียงพอ
  เคล็ดลับการทบทวน

- รักษา front‑matter `id` ให้ไม่เปลี่ยนในเอกสารที่แปล; แปลเฉพาะ `title` และ `sidebar_label` เมื่อมี

#### clean {#mt-clean}

- วัตถุประสงค์: ลบอาร์ติแฟกต์การบิลด์/พรีวิวภายในเครื่อง
- การใช้งาน: `make clean`
- ลบ (ถ้ามี):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- วัตถุประสงค์: จัดรูปแบบ รันทดสอบ อัปเดต changelog ทำคอมมิต และพุช
- การใช้งาน: `make commit`
- รายละเอียด: รัน Prettier (เขียน), `make test`, `make test_i18n`; ต่อท้าย changelog เมื่อมี diff ที่ staged; พุชไปที่ `origin/<branch>`

---

#### eslint {#mt-eslint}

- วัตถุประสงค์: รัน ESLint ผ่าน flat config
- การใช้งาน: `make eslint`

---

#### help {#mt-help}

- วัตถุประสงค์: แสดงรายการเป้าหมายทั้งหมดพร้อมเอกสารแบบบรรทัดเดียว
- การใช้งาน: `make help`

---

#### lint {#mt-lint}

- วัตถุประสงค์: ลินต์ MailExtension โดยใช้ `web-ext`
- การใช้งาน: `make lint`
- บันทึก: คัดลอกชั่วคราว `sources/manifest_LOCAL.json` → `sources/manifest.json`; เมิน ZIP ที่บิลด์แล้ว; คำเตือนไม่ทำให้ไปป์ไลน์ล้มเหลว

---

#### menu {#mt-menu}

- วัตถุประสงค์: เมนูโต้ตอบเพื่อเลือกเป้าหมาย Make และอาร์กิวเมนต์เสริม
- การใช้งาน: รัน `make` โดยไม่ส่งอาร์กิวเมนต์
- บันทึก: หากไม่มี `whiptail` เมนูจะย้อนกลับไปใช้ `make help`

---

#### pack {#mt-pack}

- วัตถุประสงค์: สร้าง ZIP สำหรับ ATN และ LOCAL (ขึ้นกับ `lint`)
- การใช้งาน: `make pack`
- เคล็ดลับ: เพิ่มเวอร์ชันในทั้ง `sources/manifest_*.json` ก่อนแพ็กเกจ

---

#### prettier {#mt-prettier}

- วัตถุประสงค์: จัดรูปแบบรีโปในที่เดิม
- การใช้งาน: `make prettier`

#### prettier_check {#mt-prettier_check}

- วัตถุประสงค์: ตรวจสอบรูปแบบ (ไม่เขียน)
- การใช้งาน: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- วัตถุประสงค์: นามแฝงของ `prettier`
- การใช้งาน: `make prettier_write`

---

#### test {#mt-test}

- วัตถุประสงค์: รัน Prettier (เขียน) ESLint แล้ว Vitest (ถ้ามี coverage)
- การใช้งาน: `make test`

#### test_i18n {#mt-test_i18n}

- วัตถุประสงค์: การทดสอบที่เน้น i18n สำหรับสตริงส่วนเสริมและเอกสารเว็บไซต์
- การใช้งาน: `make test_i18n`
- รัน: `npm run test:i18n` และ `npm run -s test:website-i18n`

---

#### translate_app / translation_app {#mt-translation-app}

- วัตถุประสงค์: แปลสตริง UI ของส่วนเสริมจาก EN ไปยังโลเคลอื่น
- การใช้งาน: `make translation_app OPTS="--locales all|de,fr"`
- บันทึก: รักษาโครงสร้างคีย์และ placeholders; ล็อกไปที่ `translation_app.log` รูปแบบสคริปต์: `node scripts/translate_app.js --locales …`

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- วัตถุประสงค์: แปลเอกสารเว็บไซต์จาก `website/docs/*.md` เป็น `website/i18n/<locale>/...`
- ที่แนะนำ: `translate_web_docs_batch` (OpenAI Batch API)
  - การใช้งาน (แฟล็ก): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - รูปแบบ positional เดิมยังรองรับ: `OPTS="<doc|all> <lang|all>"`
- พฤติกรรม: สร้าง JSONL อัปโหลด โพลล์ทุก 30 วินาที ดาวน์โหลดผลลัพธ์ เขียนไฟล์
- หมายเหตุ: งาน batch อาจใช้เวลาสูงสุด 24 ชั่วโมงจึงเสร็จ (ตามหน้าต่าง batch ของ OpenAI) คอนโซลจะแสดงเวลาที่ผ่านไปในแต่ละรอบโพลล์
- ตัวแปรแวดล้อม: `OPENAI_API_KEY` (จำเป็น), ตัวเลือก `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ค่าเริ่มต้น 24 ชั่วโมง), `BATCH_POLL_INTERVAL_MS`
- โหมดเดิม: `translate_web_docs_sync`
  - การใช้งาน (แฟล็ก): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - รูปแบบ positional เดิมยังรองรับ: `OPTS="<doc|all> <lang|all>"`
- พฤติกรรม: คำขอแบบซิงโครนัสต่อคู่ (ไม่รวมเป็น batch)
- บันทึก: มีพรอมป์แบบโต้ตอบเมื่อเว้น `OPTS` ทั้งสองโหมดจะคงบล็อกโค้ด/โค้ด inline และรักษา front‑matter `id` ไว้ไม่เปลี่ยน; ล็อกไปที่ `translation_web_batch.log` (batch) หรือ `translation_web_sync.log` (sync)

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- วัตถุประสงค์: แปลสตริง UI ของเว็บไซต์ (หน้าแรก แถบนำทาง ส่วนท้าย) จาก `website/i18n/en/code.json` ไปยังทุกโลเคลใต้ `website/i18n/<locale>/code.json` (ยกเว้น `en`)
- การใช้งาน: `make translate_web_index` หรือ `make translate_web_index OPTS="--locales de,fr [--force]"`
- ข้อกำหนด: export `OPENAI_API_KEY` (ตัวเลือก: `OPENAI_MODEL=gpt-4o-mini`)
- พฤติกรรม: ตรวจสอบโครงสร้าง JSON รักษา placeholders แบบวงเล็บปีกกา รักษา URL ให้ไม่เปลี่ยน และลองซ้ำพร้อมคำติชมเมื่อเจอข้อผิดพลาดในการตรวจสอบ

---

#### web_build {#mt-web_build}

- วัตถุประสงค์: บิลด์ไซต์เอกสารไปยัง `website/build`
- การใช้งาน: `make web_build OPTS="--locales en|de,en|all"` (หรือกำหนด `BUILD_LOCALES="en de"`)
- ภายใน: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`
- ดิปเพ็นเดนซี: รัน `npm ci` ใน `website/` เฉพาะเมื่อไม่มี `website/node_modules/@docusaurus`

#### web_build_linkcheck {#mt-web_build_linkcheck}

- วัตถุประสงค์: ตรวจลิงก์แบบปลอดภัยออฟไลน์
- การใช้งาน: `make web_build_linkcheck OPTS="--locales en|all"`
- บันทึก: บิลด์ไปยัง `tmp_linkcheck_web_pages`; เขียนทับ `baseUrl` ของ GH Pages เป็น `/`; ข้ามลิงก์ HTTP(S) ระยะไกล

#### web_build_local_preview {#mt-web_build_local_preview}

- วัตถุประสงค์: พรีวิว gh‑pages ภายในเครื่อง พร้อมตัวเลือกทดสอบ/ตรวจลิงก์
- การใช้งาน: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- พฤติกรรม: พยายามใช้ Node preview server ก่อน (`scripts/preview-server.mjs`, รองรับ `/__stop`) หากไม่ได้จะถอยกลับไปใช้ `python3 -m http.server`; ให้บริการที่พอร์ต 8080–8090; บันทึก PID ที่ `web-local-preview/.server.pid`

#### web_push_github {#mt-web_push_github}

- วัตถุประสงค์: พุช `website/build` ไปยังสาขา `gh-pages`
- การใช้งาน: `make web_push_github`

เคล็ดลับ: ตั้งค่า `NPM=…` เพื่อกำหนดแพ็กเกจแมเนเจอร์ที่ Makefile ใช้ (ค่าเริ่มต้นคือ `npm`)

---
