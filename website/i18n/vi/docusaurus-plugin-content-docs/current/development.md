---
id: development
title: Phát triển
sidebar_label: Phát triển
---

## Hướng dẫn phát triển

### Yêu cầu

- Node.js 18+ và npm
- Thunderbird 128 ESR hoặc mới hơn (để thử thủ công)

### Cấu trúc dự án (cấp cao)

- Root: script đóng gói `distribution_zip_packer.sh`, tài liệu, ảnh chụp màn hình
- `sources/`: mã add‑on chính (background, UI options/popup, manifests, icons)
- `tests/`: bộ kiểm thử Vitest
- `website/`: tài liệu Docusaurus (i18n dưới `website/i18n/de/...`)

### Cài đặt & công cụ

- Cài dependencies ở root: `npm ci`
- Docs (tùy chọn): `cd website && npm ci`
- Xem tác vụ: `make help`

### Build & đóng gói

- Tạo ZIP: `make pack`
  - Sinh ZIP ATN và LOCAL ở thư mục gốc repo (không chỉnh sửa thủ công các artifact)
  - Mẹo: cập nhật phiên bản trong `sources/manifest_ATN.json` và `sources/manifest_LOCAL.json` trước khi đóng gói
- Cài thủ công (dev): Thunderbird → Tools → Add‑ons and Themes → bánh răng → Install Add‑on From File… → chọn ZIP đã build

### Kiểm thử

- Toàn bộ: `make test` (Vitest)
- Coverage (tùy chọn):
  - `npm i -D @vitest/coverage-v8`
  - Chạy `make test`; mở `coverage/index.html` để xem báo cáo HTML
- Chỉ i18n: `make test-i18n` (parity, placeholders, titles)

### Gỡ lỗi & log

- Error Console: Tools → Developer Tools → Error Console
- Bật/tắt log chi tiết khi chạy:
  - Enable: `messenger.storage.local.set({ debug: true })`
  - Disable: `messenger.storage.local.set({ debug: false })`
- Log hiển thị khi soạn/gửi trả lời

### Docs (website)

- Dev server: `cd website && npm run start`
- Build site tĩnh: `cd website && npm run build`
- i18n: tiếng Anh ở `website/docs/*.md`; tiếng Đức ở `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Tìm kiếm: nếu đặt biến môi trường Algolia DocSearch trong CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), site dùng Algolia; nếu không, dùng tìm kiếm cục bộ. Ở trang chủ, nhấn `/` hoặc `Ctrl+K`.

### Bảo mật & cấu hình

- Không commit `sources/manifest.json` (build tạo tạm thời)
- Giữ `browser_specific_settings.gecko.id` ổn định để bảo toàn kênh cập nhật

### Khắc phục sự cố

- Dùng Thunderbird 128 ESR hoặc mới hơn
- Dùng Error Console cho vấn đề runtime

### CI & coverage

- GitHub Actions (`CI — Tests`) chạy vitest với ngưỡng coverage (85% lines/functions/branches/statements). Không đạt sẽ fail job.
- Workflow tải artifact `coverage-html` chứa báo cáo HTML; tải ở trang run (Actions → latest run → Artifacts).

### Đóng góp

- Xem CONTRIBUTING.md cho hướng dẫn nhánh/commit/PR
