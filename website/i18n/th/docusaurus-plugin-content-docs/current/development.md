---
id: development
title: 'การพัฒนา'
sidebar_label: 'การพัฒนา'
---

## Development Guide {#development-guide}

:::note แก้ไขเฉพาะภาษาอังกฤษ; การแปลจะถูกส่งต่อ
อัปเดตเอกสาร **เฉพาะ** ภายใต้ `website/docs` (ภาษาอังกฤษ) การแปลภายใต้ `website/i18n/<locale>/…` ถูกสร้างขึ้นและไม่ควรแก้ไขด้วยตนเอง ใช้ภารกิจการแปล (เช่น `make translate_web_docs_batch`) เพื่อต่ออายุเนื้อหาท้องถิ่น
:::

### Prerequisites {#prerequisites}

- Node.js 22+ และ npm (ทดสอบด้วย Node 22)
- Thunderbird 128 ESR หรือใหม่กว่า (สำหรับการทดสอบด้วยมือ)

---

### Project Layout (high‑level) {#project-layout-high-level}

- Root: สคริปต์การบรรจุ `distribution_zip_packer.sh`, เอกสาร, ภาพหน้าจอ
- `sources/`: โค้ดส่วนเสริมหลัก (แบ็คกราวด์, UI ตัวเลือก/ป๊อปอัป, แมนิเฟสต์, ไอคอน)
- `tests/`: ชุด Vitest
- `website/`: เอกสาร Docusaurus (มี i18n ภายใต้ `website/i18n/de/...`)

---

### Install & Tooling {#install-and-tooling}

- ติดตั้ง dependencies ราก: `npm ci`
- เอกสาร (ไม่บังคับ): `cd website && npm ci`
- ค้นเป้าหมาย: `make help`

---

### Live Dev (web‑ext run) {#live-dev-web-ext}

- ลูปอย่างรวดเร็วใน Firefox Desktop (การทดสอบ UI เท่านั้น):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- รันใน Thunderbird (แนะนำสำหรับ MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- เคล็ดลับ:
- เปิดคอนโซลข้อผิดพลาดของ Thunderbird (เครื่องมือ → เครื่องมือพัฒนา → คอนโซลข้อผิดพลาด)
- หน้าเหตุการณ์ MV3 จะถูกระงับเมื่อไม่ได้ใช้งาน; โหลดส่วนเสริมใหม่หลังจากการเปลี่ยนแปลงโค้ด หรือให้ web‑ext โหลดใหม่โดยอัตโนมัติ
- พฤติกรรมเฉพาะ Firefox บางอย่างจะแตกต่างกัน; ตรวจสอบเสมอใน Thunderbird สำหรับความสอดคล้องของ API
- เส้นทางไบนารี Thunderbird (ตัวอย่าง):
- Linux: `thunderbird` (เช่น, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- การแยกโปรไฟล์: ใช้โปรไฟล์ Thunderbird แยกสำหรับการพัฒนาเพื่อหลีกเลี่ยงผลกระทบต่อการตั้งค่าประจำวันของคุณ

---

### Make Targets (Alphabetical) {#make-targets-alphabetical}

Makefile จะทำให้กระบวนการพัฒนาที่เป็นมาตรฐานสอดคล้องกัน รัน `make help` ทุกครั้งเพื่อเรียกดูสรุปหนึ่งบรรทัดของทุกเป้าหมาย

เคล็ดลับ: การรัน `make` โดยไม่มีเป้าหมายจะเปิดเมนู Whiptail ง่ายๆ เพื่อเลือกเป้าหมาย

| Target                                                   | One‑line description                                                                                  |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ลบอาร์ติแฟกต์การสร้าง/ดูตัวอย่างในท้องถิ่น (tmp/, web-local-preview/, website/build/)                 |
| [`commit`](#mt-commit)                                   | ฟอร์แมต, รันการทดสอบ (รวมถึง i18n), อัปเดต changelog, commit & push                                   |
| [`eslint`](#mt-eslint)                                   | รัน ESLint ผ่าน flat config (`npm run -s lint:eslint`)                                                |
| [`help`](#mt-help)                                       | แสดงรายการทั้งหมดของเป้าหมายพร้อมเอกสารบรรทัดเดียว (เรียงลำดับ)                                       |
| [`lint`](#mt-lint)                                       | web‑ext lint บน `sources/` (แมนิเฟสต์ชั่วคราว; ไม่สนใจ ZIPs; ไม่ร้ายแรง)                              |
| [`menu`](#mt-menu)                                       | เมนูเชิงโต้ตอบเพื่เลือกเป้าหมายและอาร์กิวเมนต์ที่ไม่บังคับ                                            |
| [`pack`](#mt-pack)                                       | สร้าง ATN & LOCAL ZIPs (รัน linter; เรียกใช้สคริปต์ packer)                                           |
| [`prettier`](#mt-prettier)                               | ฟอร์แมตที่จัดเก็บในสถานที่ (เขียนการเปลี่ยนแปลง)                                                      |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ในโหมดตรวจสอบ (ไม่มีการเขียน); จะล้มเหลวหากต้องการการฟอร์แมตใหม่                             |
| [`prettier_write`](#mt-prettier_write)                   | อัลลิอาสสำหรับ `prettier`.                                                                            |
| [`test`](#mt-test)                                       | Prettier (เขียน), ESLint, แล้ว Vitest (coverage หากตั้งค่าแล้ว)                                       |
| [`test_i18n`](#mt-test_i18n)                             | การทดสอบเฉพาะ i18n: placeholders/parity ของส่วนเสริม + ความสอดคล้องต่อเอกสารต่อล่ะภาษา                |
| [`translate_app`](#mt-translation-app)                   | อัลลิอาสสำหรับ `translation_app`.                                                                     |
| [`translation_app`](#mt-translation-app)                 | แปลสตริง UI ของแอปจาก `sources/_locales/en/messages.json`.                                            |
| [`translate_web_docs_batch`](#mt-translation-web)        | แปลเอกสารเว็บไซต์ผ่าน OpenAI Batch API (ที่แนะนำ)                                                     |
| [`translate_web_docs_sync`](#mt-translation-web)         | แปลเอกสารเว็บไซต์แบบซิงโครนัส (legacy, ไม่ใช่แบบแบตช์)                                                |
| [`translate_web_index`](#mt-translation_web_index)       | อัลลิอาสสำหรับ `translation_web_index`.                                                               |
| [`translation_web_index`](#mt-translation_web_index)     | แปล UI หน้าแรก/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).                    |
| [`web_build`](#mt-web_build)                             | สร้างเอกสารไปที่ `website/build` (สนับสนุน `--locales` / `BUILD_LOCALES`)                             |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | การตรวจสอบลิงก์ที่ปลอดภัยในออฟไลน์ (ข้าม HTTP[S] ระยะไกล)                                             |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ดูตัวอย่าง gh‑pages ในท้องถิ่น; ให้บริการอัตโนมัติที่ 8080–8090; การทดสอบ/การตรวจสอบลิงก์ที่ไม่บังคับ |
| [`web_push_github`](#mt-web_push_github)                 | ดัน `website/build` ไปยัง `gh-pages` branch.                                                          |

ไวยากรณ์สำหรับตัวเลือก

- ใช้ `make <command> OPTS="…"` เพื่อส่งตัวเลือก (แนะนำให้ใช้เครื่องหมายคำพูด) แต่ละเป้าหมายด้านล่างจะมีตัวอย่างการใช้งาน

--

-

#### Locale build tips {#locale-build-tips}

- บัญชี subsets ของ locales: ตั้งค่า `BUILD_LOCALES="en de"` หรือส่ง `OPTS="--locales en,de"` ไปยังเป้าหมายเว็บ
- ดูตัวอย่าง locale เฉพาะ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Package {#build-and-package}

- สร้าง ZIPs: `make pack`
- ผลิต ATN และ LOCAL ZIPs ในโฟลเดอร์รูตของ repo (อย่าแก้ไขอาร์ติแฟกต์ด้วยมือ)
- เคล็ดลับ: อัปเดตเวอร์ชันในทั้งสอง `sources/manifest_ATN.json` และ `sources/manifest_LOCAL.json` ก่อนบรรจุ
- การติดตั้งด้วยตนเอง (dev): Thunderbird → เครื่องมือ → ส่วนเสริมและธีม → เกียร์ → ติดตั้งส่วนเสริมจากไฟล์… → เลือก ZIP ที่สร้างแล้ว

---

### Test {#test}

- ชุดเต็ม: `make test` (Vitest)
- Coverage (ไม่บังคับ):
- `npm i -D @vitest/coverage-v8`
- รัน `make test`; เปิด `coverage/index.html` สำหรับรายงาน HTML
- i18n เท่านั้น: `make test_i18n` (คีย์ UI/placeholders/titles + ความสอดคล้องต่อเอกสารต่อภาษา)

---

### Debugging & Logs {#debugging-and-logs}

- คอนโซลข้อผิดพลาด: เครื่องมือ → เครื่องมือพัฒนา → คอนโซลข้อผิดพลาด
- เปิด/ปิดบันทึกอย่างละเอียดในเวลาทำงาน:
- เปิดใช้งาน: `messenger.storage.local.set({ debug: true })`
- ปิดใช้งาน: `messenger.storage.local.set({ debug: false })`
- บันทึกปรากฏขณะแค่นำ/ส่งคำตอบ

---

### Docs (website) {#docs-website}

- Dev server: `cd website && npm run start`
- สร้างเว็บไซต์สถิติ: `cd website && npm run build`
- เปรียบเทียบการทำงาน (ตามตัวอักษร): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- ตัวอย่างการใช้งาน:
- ภาษาอังกฤษเท่านั้น, ข้ามการทดสอบ/ตรวจสอบลิงก์, ไม่ดัน: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- ทุกภาษา, มีการทดสอบ/ตรวจสอบลิงก์, แล้วดัน: `make web_build_local_preview && make web_push_github`
- ก่อนเผยแพร่, รันการตรวจสอบลิงก์ที่ปลอดภัยในออฟไลน์: `make web_build_linkcheck`.
- i18n: ภาษาอังกฤษอยู่ที่ `website/docs/*.md`; การแปลภาษาเยอรมันอยู่ที่ `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- ค้นหา: หากตั้งค่า environment variables ของ Algolia DocSearch ใน CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`) เว็บไซต์จะใช้การค้นหา Algolia; มิฉะนั้นจะกลับไปใช้การค้นหาในท้องถิ่น ในหน้าแรก, กด `/` หรือ `Ctrl+K` เพื่อเปิดช่องค้นหา

---

#### Donate redirect route {#donate-redirect}

- `website/src/pages/donate.js`
- เส้นทาง: `/donate` (และ `/<locale>/donate`)
- พฤติกรรม:
- หากเส้นทางปัจจุบันมี locale (เช่น, `/de/donate`) ให้ใช้มัน
- มิฉะนั้น, เลือกสิ่งที่ตรงกันที่ดีที่สุดจาก `navigator.languages` กับ locales ที่ตั้งค่า; หลีกเลี่ยงไปที่ locale ค่าเริ่มต้น
- ทำการเปลี่ยนเส้นทางไปที่:
- `en` → `/docs/donation`
- อื่นๆ → `/<locale>/docs/donation`
- ใช้ `useBaseUrl` สำหรับการจัดการ baseUrl อย่างถูกต้อง
- รวมการรีเฟรชเมต้า + `noscript` ลิงก์เป็นทางเลือก

---

---

#### Preview Tips {#preview-tips}

- หยุดการดูตัวอย่าง Node อย่างสะอาด: เปิด `http://localhost:<port>/__stop` (แสดงหลัง `Local server started`)
- หากรูปภาพไม่โหลดใน MDX/JSX, ใช้ `useBaseUrl('/img/...')` เพื่อเคารพ `baseUrl` ของไซต์
- การดูตัวอย่างจะเริ่มขึ้นก่อน; การตรวจสอบลิงก์จะดำเนินการต่อจากนั้นและไม่ขัดขวาง (ลิงก์ภายนอกที่ชำรุดจะไม่หยุดการดูตัวอย่าง)
- ตัวอย่าง URL สำหรับการดูตัวอย่าง: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (แสดงหลัง “เซิฟเวอร์ท้องถิ่นเริ่มทำงาน”)
- ลิงก์ภายนอกในการตรวจสอบลิงก์: บางไซต์ภายนอก (เช่น, addons.thunderbird.net) จะบล็อก web crawlers โดยอัตโนมัติและอาจแสดง 403 ในการตรวจสอบลิงก์ การดูตัวอย่างยังคงเริ่มต้น; สิ่งเหล่านี้สามารถละเลยได้อย่างปลอดภัย

---

#### Translate the Website {#translate-website}

สิ่งที่คุณสามารถแปล

- UI ของเว็บไซต์เท่านั้น: หน้าแรก, navbar, footer, และสตริง UI อื่นๆ เนื้อหาของเอกสารยังคงเป็นภาษาอังกฤษสำหรับตอนนี้

ที่ไหนในการแก้ไข

- แก้ไข `website/i18n/<locale>/code.json` (ใช้ `en` เป็นการอ้างอิง) เก็บ placeholder เช่น `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` ไว้ไม่เปลี่ยนแปลง

สร้างหรือรีเฟรชไฟล์

- สร้าง stub ที่หายไปสำหรับทุก locale: `npm --prefix website run i18n:stubs`
- เขียนทับ stub จากภาษาอังกฤษ (หลังจากเพิ่มสตริงใหม่): `npm --prefix website run i18n:stubs:force`
- ทางเลือกสำหรับ locale เดียว: `npx --prefix website docusaurus write-translations --locale <locale>`

แปลสตริง UI ของหน้าแรก/navbar/footer (OpenAI)

- ตั้งค่าข้อมูลประจำตัวครั้งเดียว (shell หรือ .env):
- `export OPENAI_API_KEY=sk-...`
- ไม่บังคับ: `export OPENAI_MODEL=gpt-4o-mini`
- One‑shot (ทุก locale, ข้าม en): `make translate_web_index`
- จำกัดเฉพาะ locales เฉพาะ: `make translate_web_index OPTS="--locales de,fr"`
- เขียนทับค่าเดิม: `make translate_web_index OPTS="--force"`

การตรวจสอบและการลองซ้ำ

- สคริปการแปลจะตรวจสอบรูปร่างของ JSON, รักษา placeholder ที่มีวงเล็บปีกกาและมั่นใจว่า URL ไม่เปลี่ยนแปลง
- หากการตรวจสอบล้มเหลว, จะลองอีกครั้งพร้อมกับข้อเสนอแนะแม็กซิมัม 2 ครั้งก่อนที่จะรักษาค่าที่มีอยู่

ดูตัวอย่าง locale ของคุณ

- Dev server: `npm --prefix website run start`
- เยี่ยมชม `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

การส่ง

- เปิด PR กับไฟล์ `code.json` ที่แก้ไขแล้ว เก็บการเปลี่ยนแปลงให้อยู่ในขอบเขตและรวมภาพหน้าจออย่างรวดเร็วเมื่อทำได้

---

### Security & Configuration Tips {#security-and-configuration-tips}

- อย่าคอมมิท `sources/manifest.json` (สร้างชั่วคราวโดยการสร้าง)
- เก็บ `browser_specific_settings.gecko.id` ให้อยู่ในสภาพที่เสถียรเพื่อรักษาช่องทางการอัปเดต

---

### Settings Persistence {#settings-persistence}

- Storage: การตั้งค่าผู้ใช้ทั้งหมดอยู่ใน `storage.local` และคงอยู่ในระหว่างการอัปเดตส่วนเสริม
- ติดตั้ง: ค่าเริ่มต้นจะถูกนำไปใช้เฉพาะเมื่อคีย์หายไปจริง (undefined)
- อัปเดต: การย้ายข้อมูลจะเติมเฉพาะคีย์ที่หายไป; ค่าที่มีอยู่จะไม่มีวันถูกเขียนทับ
- Schema marker: `settingsVersion` (ปัจจุบัน `1`)
- คีย์และค่าเริ่มต้น:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- โค้ด: ดู `sources/background.js` → `initializeOrMigrateSettings()` และ `SCHEMA_VERSION`.

การทำงานของ dev (การเพิ่มการตั้งค่าใหม่)

- เพิ่ม `SCHEMA_VERSION` ใน `sources/background.js`.
- เพิ่มคีย์ใหม่ + ค่าเริ่มต้นในอ็อบเจ็กต์ `DEFAULTS` ใน `initializeOrMigrateSettings()`.
- ใช้กฎ "only-if-undefined" เมื่อปักค่าเริ่มต้น; อย่าเขียนทับค่าที่มีอยู่
- หากการตั้งค่าเป็นภาพที่มองเห็นของผู้ใช้, เชื่อมโยงมันใน `sources/options.js` และเพิ่มสตริงที่แปลแล้ว
- เพิ่ม/ปรับการทดสอบ (ดู `tests/background.settings.migration.test.js`).

เคล็ดลับการทดสอบด้วยตนเอง

- จำลองการติดตั้งใหม่: ล้างไดเร็กทอรีข้อมูลของส่วนขยายหรือเริ่มด้วยโปรไฟล์ใหม่
- จำลองการอัปเดต: ตั้งค่า `settingsVersion` เป็น `0` ใน `storage.local` และโหลดใหม่; ยืนยันว่าค่าที่มีอยู่ยังคงไม่เปลี่ยนแปลงและเฉพาะคีย์ที่หายไปถูกเพิ่ม

---

### Troubleshooting {#troubleshooting}

- ตรวจสอบว่า Thunderbird เป็น 128 ESR หรือใหม่กว่า
- ใช้คอนโซลข้อผิดพลาดสำหรับปัญหาขณะทำงาน
- หากการตั้งค่าที่จัดเก็บดูเหมือนจะไม่สามารถปรับใช้ได้อย่างเหมาะสม, เริ่มต้นใหม่ Thunderbird และลองอีกครั้ง (Thunderbird อาจเก็บสถานะข้ามเซสชัน; การเริ่มต้นใหม่จะทำให้การตั้งค่าใหม่ถูกโหลด)

---

### CI & Coverage {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) รัน vitest พร้อมเกณฑ์การครอบคลุม (85% lines/functions/branches/statements) หากไม่ถึงเกณฑ์ งานจะล้มเหลว
- กระบวนการทำงานจะอัปโหลดอาร์ติแฟกต์ `coverage-html` พร้อมรายงาน HTML; ดาวน์โหลดได้จากหน้าการทำงาน (Actions → การทำงานล่าสุด → อาร์ติแฟกต์)

---

### Contributing {#contributing}

- ดู CONTRIBUTING.md สำหรับแนวทางสาขา/การคอมมิท/PR
- เคล็ดลับ: สร้างโปรไฟล์การพัฒนา Thunderbird แยกสำหรับการทดสอบเพื่อหลีกเลี่ยงผลกระทบต่อโปรไฟล์ประจำวันของคุณ

---

### Translations

- การรันงานแปลขนาดใหญ่ “ทั้งหมด → ทั้งหมด” อาจช้าและมีค่าใช้จ่าย เริ่มต้นด้วยชุดย่อย (เช่น เอกสารไม่กี่ฉบับและ 1–2 locale), ตรวจสอบผลลัพธ์, จากนั้นขยาย

---

- นโยบายการลองซ้ำ: งานแปลดำเนินการสูงสุด 3 ครั้งที่มีการลองซ้ำแบบ exponential backoff ในกรณีเกิดข้อผิดพลาดจาก API; ดู `scripts/translate_web_docs_batch.js` และ `scripts/translate_web_docs_sync.js`.

ภาพหน้าจอสำหรับเอกสาร

- เก็บภาพไว้ใน `website/static/img/`.
- อ้างอิงพวกเขาใน MD/MDX ผ่าน `useBaseUrl('/img/<filename>')` เพื่อให้เส้นทางทำงานร่วมกับ `baseUrl` ของไซต์
- หลังจากเพิ่มหรือเปลี่ยนชื่อภาพใน `website/static/img/`, ยืนยันว่าการอ้างอิงทั้งหมดยังคงใช้ `useBaseUrl('/img/…')` และแสดงในดูตัวอย่างในท้องถิ่น
  Favicons

- `favicon.ico` ขนาดหลายขนาดจะถูกสร้างโดยอัตโนมัติในทุกเส้นทางการสร้าง (Make + สคริปต์) ผ่าน `website/scripts/build-favicon.mjs`.
- ไม่ต้องดำเนินการด้วยมือ; อัปเดต `icon-*.png` ก็เพียงพอ
  เคล็ดลับการตรวจสอบ

- ให้เก็บ front‑matter `id` ไม่เปลี่ยนแปลงในเอกสารที่แปล; แปลเฉพาะ `title` และ `sidebar_label` เมื่อมีอยู่.

#### clean {#mt-clean}

- วัตถุประสงค์: ลบอาร์ติแฟกต์การสร้าง/ดูตัวอย่างในท้องถิ่น
- การใช้งาน: `make clean`
- ลบ (หากมีอยู่):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- วัตถุประสงค์: ฟอร์แมต, ทดสอบ, อัปเดต changelog, commit, และ push
- การใช้งาน: `make commit`
- รายละเอียด: รัน Prettier (เขียน), `make test`, `make test_i18n`; แนบ changelog เมื่อมีการเปลี่ยนแปลงที่ถูกจัดเตรียมไว้; ดันไปที่ `origin/<branch>`.

---

#### eslint {#mt-eslint}

- วัตถุประสงค์: รัน ESLint ผ่าน flat config
- การใช้งาน: `make eslint`

---

#### help {#mt-help}

- วัตถุประสงค์: แสดงรายการทั้งหมดของเป้าหมายพร้อมเอกสารบรรทัดเดียว
- การใช้งาน: `make help`

---

#### lint {#mt-lint}

- วัตถุประสงค์: lint MailExtension โดยใช้ `web-ext`
- การใช้งาน: `make lint`
- หมายเหตุ: สำเนาชั่วคราว `sources/manifest_LOCAL.json` → `sources/manifest.json`; ไม่สนใจ ZIPs ที่สร้างแล้ว; คำเตือนจะไม่ทำให้สายงานล้มเหลว

---

#### menu {#mt-menu}

- วัตถุประสงค์: เมนูเชิงโต้ตอบในการเลือก Make target และอาร์กิวเมนต์ที่ไม่บังคับ
- การใช้งาน: รัน `make` โดยไม่มีอาร์กิวเมนต์
- หมายเหตุ: หาก `whiptail` ไม่พร้อมใช้งาน, เมนูจะกลับไปที่ `make help`

---

#### pack {#mt-pack}

- วัตถุประสงค์: สร้าง ATN และ LOCAL ZIPs (ขึ้นอยู่กับ `lint`)
- การใช้งาน: `make pack`
- เคล็ดลับ: เพิ่มเวอร์ชันในทั้งสอง `sources/manifest_*.json` ก่อนบรรจุ

---

#### prettier {#mt-prettier}

- วัตถุประสงค์: ฟอร์แมตที่จัดเก็บในสถานที่
- การใช้งาน: `make prettier`

#### prettier_check {#mt-prettier_check}

- วัตถุประสงค์: ตรวจสอบการฟอร์แมต (ไม่มีการเขียน)
- การใช้งาน: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- วัตถุประสงค์: อัลลิอาสสำหรับ `prettier`.
- การใช้งาน: `make prettier_write`

---

#### test {#mt-test}

- วัตถุประสงค์: รัน Prettier (เขียน), ESLint, แล้ว Vitest (coverage หากติดตั้ง)
- การใช้งาน: `make test`

#### test_i18n {#mt-test_i18n}

- วัตถุประสงค์: การทดสอบที่เน้น i18n สำหรับสตริงของ add‑on และเอกสารเว็บไซต์
- การใช้งาน: `make test_i18n`
- รัน: `npm run test:i18n` และ `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- วัตถุประสงค์: แปลสตริง UI ของส่วนเสริมจาก EN ไปยังภาษาต่างๆ
- การใช้งาน: `make translation_app OPTS="--locales all|de,fr"`
- หมายเหตุ: รักษาโครงสร้างคีย์และ placeholder; บันทึกไปที่ `translation_app.log`. รูปแบบสคริปต์: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- วัตถุประสงค์: แปลเอกสารเว็บไซต์จาก `website/docs/*.md` เป็น `website/i18n/<locale>/...`.
- ที่แนะนำ: `translate_web_docs_batch` (OpenAI Batch API)
  - การใช้งาน (ธง): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - เลขตำแหน่ง legacy ยังคงถูกยอมรับ: `OPTS="<doc|all> <lang|all>"`
- พฤติกรรม: สร้าง JSONL, อัปโหลด, สุ่มทุก 30 วินาที, ดาวน์โหลดผลลัพธ์, เขียนไฟล์
- หมายเหตุ: งานแบตช์อาจใช้เวลาถึง 24 ชั่วโมงในการทำให้เสร็จสิ้น (ขึ้นอยู่กับเวลาของแบตช์ของ OpenAI) คอนโซลจะแสดงระยะเวลาที่ผ่านไปในแต่ละการสุ่ม
- Env: `OPENAI_API_KEY` (จำเป็น), `OPENAI_MODEL` ที่เป็นออปชั่น, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (ค่าเริ่มต้น 24 ชั่วโมง), `BATCH_POLL_INTERVAL_MS`.
- Legacy: `translate_web_docs_sync`
  - การใช้งาน (ธง): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - เลขตำแหน่ง legacy ยังคงถูกยอมรับ: `OPTS="<doc|all> <lang|all>"`
- พฤติกรรม: การร้องขอแบบซิงโครนัสต่อคู่ (ไม่มีการรวมแบตช์)
- หมายเหตุ: การแจ้งเตือนเชิงโต้ตอบเมื่อ `OPTS` ถูกละเว้น โหมดทั้งสองจะรักษาโค้ดบล็อก/โค้ดแบบอินไลน์และเก็บ `id` ไว้ไม่เปลี่ยนแปลง; บันทึกไปที่ `translation_web_batch.log` (แบตช์) หรือ `translation_web_sync.log` (ซิงค์).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- วัตถุประสงค์: แปลสตริง UI ของเว็บไซต์ (หน้าแรก, navbar, footer) จาก `website/i18n/en/code.json` ไปยังทุก locale ภายใต้ `website/i18n/<locale>/code.json` (ยกเว้น `en`)
- การใช้งาน: `make translate_web_index` หรือ `make translate_web_index OPTS="--locales de,fr [--force]"`
- ความต้องการ: ส่งออก `OPENAI_API_KEY` (ไม่บังคับ: `OPENAI_MODEL=gpt-4o-mini`)
- พฤติกรรม: ตรวจสอบโครงสร้าง JSON, รักษา placeholder วงเล็บปีกกา, รักษา URL ไม่เปลี่ยนแปลง, และทำการลองใหม่ด้วยข้อเสนอแนบเมื่อเกิดข้อผิดพลาดในการตรวจสอบ

---

#### web_build {#mt-web_build}

- วัตถุประสงค์: สร้างเว็บไซต์เอกสารไปที่ `website/build`.
- การใช้งาน: `make web_build OPTS="--locales en|de,en|all"` (หรือตั้งค่า `BUILD_LOCALES="en de"`)
- ภายใน: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Deps: รัน `npm ci` ใน `website/` เท่านั้นถ้า `website/node_modules/@docusaurus` หายไป

#### web_build_linkcheck {#mt-web_build_linkcheck}

- วัตถุประสงค์: ตรวจสอบลิงก์ที่ปลอดภัยในออฟไลน์
- การใช้งาน: `make web_build_linkcheck OPTS="--locales en|all"`
- หมายเหตุ: สร้างไปที่ `tmp_linkcheck_web_pages`; เขียน `baseUrl` ของ GH Pages เป็น `/`; ข้ามลิงก์ HTTP(S) ที่อยู่ระยะไกล

#### web_build_local_preview {#mt-web_build_local_preview}

- วัตถุประสงค์: ดูตัวอย่าง gh‑pages ในท้องถิ่นที่มีการทดสอบ/ตรวจสอบลิงก์ที่ไม่บังคับ
- การใช้งาน: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- พฤติกรรม: ทดลองเซิร์ฟเวอร์ดูตัวอย่าง Node ก่อน (`scripts/preview-server.mjs`, รองรับ `/__stop`), กลับไปที่ `python3 -m http.server`; ให้บริการที่ 8080–8090; PID ที่ `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- วัตถุประสงค์: ดัน `website/build` ไปยังสาขา `gh-pages`.
- การใช้งาน: `make web_push_github`

เคล็ดลับ: ตั้งค่า `NPM=…` เพื่อเขียนทับโปรแกรมการจัดการแพ็คเกจที่ใช้โดย Makefile (ค่าเริ่มต้นเป็น `npm`).

---
