---
id: development
title: 'Phát triển'
sidebar_label: 'Phát triển'
---

---

## Hướng dẫn phát triển {#development-guide}

:::note Chỉ chỉnh sửa tiếng Anh; bản dịch sẽ được đồng bộ
Cập nhật tài liệu chỉ dưới `website/docs` (tiếng Anh). Bản dịch dưới `website/i18n/<locale>/…` được tạo tự động và không nên chỉnh sửa thủ công. Dùng các tác vụ dịch (vd., `make translate_web_docs_batch`) để làm mới nội dung bản địa hóa.
:::

### Điều kiện tiên quyết {#prerequisites}

- Node.js 22+ và npm (đã thử với Node 22)
- Thunderbird 128 ESR hoặc mới hơn (để kiểm thử thủ công)

---

### Bố cục dự án (tổng quan) {#project-layout-high-level}

- Gốc: script đóng gói `distribution_zip_packer.sh`, tài liệu, ảnh chụp màn hình
- `sources/`: mã tiện ích chính (background, giao diện options/popup, manifest, biểu tượng)
- `tests/`: bộ kiểm thử Vitest
- `website/`: tài liệu Docusaurus (có i18n dưới `website/i18n/de/...`)

---

### Cài đặt & Công cụ {#install-and-tooling}

- Cài đặt phụ thuộc ở thư mục gốc: `npm ci`
- Tài liệu (tuỳ chọn): `cd website && npm ci`
- Xem các mục tiêu: `make help`

---

### Phát triển trực tiếp (web‑ext run) {#live-dev-web-ext}

- Vòng lặp nhanh trên Firefox Desktop (chỉ kiểm thử giao diện cơ bản):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Chạy trong Thunderbird (khuyến nghị cho MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Mẹo:
- Giữ mở Bảng điều khiển lỗi của Thunderbird (Tools → Developer Tools → Error Console).
- Trang sự kiện MV3 sẽ tạm dừng khi nhàn rỗi; hãy tải lại tiện ích sau khi thay đổi mã, hoặc để web‑ext tự động tải lại.
- Một số hành vi chỉ có trên Firefox khác biệt; luôn xác minh trên Thunderbird để đảm bảo tương đồng API.
- Đường dẫn nhị phân Thunderbird (ví dụ):
- Linux: `thunderbird` (ví dụ: `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Cô lập hồ sơ: Sử dụng một hồ sơ Thunderbird riêng cho phát triển để tránh ảnh hưởng thiết lập hàng ngày của bạn.

---

### Mục tiêu Make (theo thứ tự bảng chữ cái) {#make-targets-alphabetical}

Makefile tiêu chuẩn hóa các luồng phát triển phổ biến. Chạy `make help` bất cứ lúc nào để xem tóm tắt một dòng cho từng mục tiêu.

Mẹo: chạy `make` không kèm mục tiêu sẽ mở menu Whiptail đơn giản để chọn mục tiêu.

| Mục tiêu                                                 | Mô tả một dòng                                                                                             |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Xóa các tạo phẩm build/preview cục bộ (tmp/, web-local-preview/, website/build/).                          |
| [`commit`](#mt-commit)                                   | Định dạng, chạy kiểm thử (bao gồm i18n), cập nhật changelog, commit & push.                                |
| [`eslint`](#mt-eslint)                                   | Chạy ESLint qua cấu hình phẳng (`npm run -s lint:eslint`).                                                 |
| [`help`](#mt-help)                                       | Liệt kê tất cả mục tiêu với tài liệu một dòng (đã sắp xếp).                                                |
| [`lint`](#mt-lint)                                       | web‑ext lint trên `sources/` (manifest tạm; bỏ qua ZIP; không gây lỗi dừng).                               |
| [`menu`](#mt-menu)                                       | Menu tương tác để chọn mục tiêu và tham số tùy chọn.                                                       |
| [`pack`](#mt-pack)                                       | Xây dựng ZIP cho ATN & LOCAL (chạy linter; gọi script đóng gói).                                           |
| [`prettier`](#mt-prettier)                               | Định dạng kho tại chỗ (ghi thay đổi).                                                                      |
| [`prettier_check`](#mt-prettier_check)                   | Prettier ở chế độ kiểm tra (không ghi); thất bại nếu cần định dạng lại.                                    |
| [`prettier_write`](#mt-prettier_write)                   | Bí danh cho `prettier`.                                                                                    |
| [`test`](#mt-test)                                       | Prettier (ghi), ESLint, rồi Vitest (coverage nếu đã cấu hình).                                             |
| [`test_i18n`](#mt-test_i18n)                             | Chỉ kiểm thử i18n: placeholder/tương đồng của tiện ích + tương đồng website.                               |
| [`translate_app`](#mt-translation-app)                   | Bí danh cho `translation_app`.                                                                             |
| [`translation_app`](#mt-translation-app)                 | Dịch chuỗi giao diện ứng dụng từ `sources/_locales/en/messages.json`.                                      |
| [`translate_web_docs_batch`](#mt-translation-web)        | Dịch tài liệu website qua OpenAI Batch API (ưu tiên).                                                      |
| [`translate_web_docs_sync`](#mt-translation-web)         | Dịch tài liệu website đồng bộ (cũ, không dùng batch).                                                      |
| [`translate_web_index`](#mt-translation_web_index)       | Bí danh cho `translation_web_index`.                                                                       |
| [`translation_web_index`](#mt-translation_web_index)     | Dịch giao diện trang chủ/thanh điều hướng/chân trang (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Build tài liệu ra `website/build` (hỗ trợ `--locales` / `BUILD_LOCALES`).                                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Kiểm tra liên kết an toàn ngoại tuyến (bỏ qua HTTP[S] từ xa).                                              |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Xem thử gh‑pages cục bộ; tự phục vụ trên 8080–8090; tùy chọn kiểm thử/kiểm tra liên kết.                   |
| [`web_push_github`](#mt-web_push_github)                 | Đẩy `website/build` lên nhánh `gh-pages`.                                                                  |

Cú pháp cho tùy chọn

- Dùng `make <command> OPTS="…"` để truyền tùy chọn (khuyến nghị dùng dấu ngoặc kép). Mỗi mục tiêu bên dưới có ví dụ sử dụng.

--

-

#### Mẹo build theo locale {#locale-build-tips}

- Build một tập con locale: đặt `BUILD_LOCALES="en de"` hoặc truyền `OPTS="--locales en,de"` cho các target web.
- Xem thử một locale cụ thể: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Build & Đóng gói {#build-and-package}

- Build ZIP: `make pack`
- Tạo ZIP ATN và LOCAL ở thư mục gốc repo (không chỉnh sửa tạo phẩm bằng tay)
- Mẹo: cập nhật phiên bản ở cả `sources/manifest_ATN.json` và `sources/manifest_LOCAL.json` trước khi đóng gói
- Cài thủ công (dev): Thunderbird → Tools → Add‑ons and Themes → bánh răng → Install Add‑on From File… → chọn ZIP đã build

---

### Kiểm thử {#test}

- Toàn bộ bộ kiểm thử: `make test` (Vitest)
- Độ bao phủ (tuỳ chọn):
- `npm i -D @vitest/coverage-v8`
- Chạy `make test`; mở `coverage/index.html` để xem báo cáo HTML
- Chỉ i18n: `make test_i18n` (khóa UI/placeholder/tiêu đề + tương đồng website theo locale theo tài liệu với kiểm tra id/title/sidebar_label)

---

### Gỡ lỗi & Nhật ký {#debugging-and-logs}

- Bảng điều khiển lỗi: Tools → Developer Tools → Error Console
- Bật/tắt log chi tiết khi chạy:
- Bật: `messenger.storage.local.set({ debug: true })`
- Tắt: `messenger.storage.local.set({ debug: false })`
- Log hiển thị khi soạn/gửi phản hồi

---

### Tài liệu (website) {#docs-website}

- Máy chủ dev: `cd website && npm run start`
- Build site tĩnh: `cd website && npm run build`
- Lệnh Make tương đương (theo ABC): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ví dụ sử dụng:
- Chỉ EN, bỏ qua kiểm thử/kiểm tra liên kết, không push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Tất cả locale, kèm kiểm thử/kiểm tra liên kết, rồi push: `make web_build_local_preview && make web_push_github`
- Trước khi xuất bản, chạy kiểm tra liên kết an toàn ngoại tuyến: `make web_build_linkcheck`.
- i18n: Tiếng Anh ở `website/docs/*.md`; Tiếng Đức ở `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Tìm kiếm: Nếu biến môi trường Algolia DocSearch được thiết lập trong CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), site sẽ dùng tìm kiếm Algolia; nếu không sẽ dùng tìm kiếm cục bộ. Ở trang chủ, nhấn `/` hoặc `Ctrl+K` để mở hộp tìm kiếm.

---

#### Tuyến chuyển hướng Donate {#donate-redirect}

- `website/src/pages/donate.js`
- Route: `/donate` (và `/<locale>/donate`)
- Hành vi:
- Nếu route hiện tại có locale (ví dụ: `/de/donate`), hãy dùng nó
- Nếu không, chọn khớp tốt nhất từ `navigator.languages` so với các locale đã cấu hình; nếu không có thì dùng locale mặc định
- Chuyển hướng đến:
- `en` → `/docs/donation`
- khác → `/<locale>/docs/donation`
- Dùng `useBaseUrl` để xử lý baseUrl đúng
- Bao gồm meta refresh + liên kết `noscript` như phương án dự phòng

---

---

#### Mẹo xem thử {#preview-tips}

- Dừng xem thử Node một cách sạch sẽ: mở `http://localhost:<port>/__stop` (in ra sau `Local server started`).
- Nếu hình ảnh không tải trong MDX/JSX, dùng `useBaseUrl('/img/...')` để tuân theo `baseUrl` của site.
- Bản xem thử khởi động trước; kiểm tra liên kết chạy sau và không chặn (liên kết ngoài hỏng sẽ không dừng xem thử).
- URL xem thử ví dụ: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (in ra sau “Local server started”).
- Liên kết ngoài trong kiểm tra liên kết: Một số trang ngoài (vd., addons.thunderbird.net) chặn trình thu thập tự động và có thể hiển thị 403 trong kiểm tra. Bản xem thử vẫn khởi động; có thể bỏ qua an toàn.

---

#### Dịch Website {#translate-website}

Những gì bạn có thể dịch

- Chỉ giao diện website: trang chủ, thanh điều hướng, chân trang và các chuỗi UI khác. Nội dung tài liệu hiện vẫn chỉ tiếng Anh.

Chỉnh ở đâu

- Sửa `website/i18n/<locale>/code.json` (dùng `en` làm tham chiếu). Giữ nguyên các placeholder như `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Tạo hoặc làm mới tệp

- Tạo stub còn thiếu cho mọi locale: `npm --prefix website run i18n:stubs`
- Ghi đè stub từ tiếng Anh (sau khi thêm chuỗi mới): `npm --prefix website run i18n:stubs:force`
- Cách thay thế cho một locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Dịch chuỗi UI trang chủ/thanh điều hướng/chân trang (OpenAI)

- Thiết lập thông tin xác thực một lần (shell hoặc .env):
- `export OPENAI_API_KEY=sk-...`
- Tuỳ chọn: `export OPENAI_MODEL=gpt-4o-mini`
- Một lần (tất cả locale, bỏ qua en): `make translate_web_index`
- Giới hạn cho một số locale: `make translate_web_index OPTS="--locales de,fr"`
- Ghi đè giá trị hiện có: `make translate_web_index OPTS="--force"`

Xác thực & thử lại

- Script dịch xác thực cấu trúc JSON, giữ nguyên placeholder trong ngoặc nhọn và đảm bảo URL không thay đổi.
- Nếu xác thực thất bại, nó thử lại kèm phản hồi tối đa 2 lần trước khi giữ nguyên giá trị hiện có.

Xem thử locale của bạn

- Máy chủ dev: `npm --prefix website run start`
- Truy cập `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Gửi lên

- Mở PR với các tệp `code.json` đã chỉnh sửa. Giữ thay đổi tập trung và kèm ảnh chụp nhanh khi có thể.

---

### Mẹo Bảo mật & Cấu hình {#security-and-configuration-tips}

- Không commit `sources/manifest.json` (được tạo tạm thời bởi quá trình build)
- Giữ `browser_specific_settings.gecko.id` ổn định để bảo toàn kênh cập nhật

---

### Lưu giữ Thiết lập {#settings-persistence}

- Lưu trữ: Mọi thiết lập người dùng nằm trong `storage.local` và tồn tại qua các lần cập nhật tiện ích.
- Cài đặt: Giá trị mặc định chỉ áp dụng khi một khóa hoàn toàn thiếu (undefined).
- Cập nhật: Quá trình di trú chỉ điền các khóa còn thiếu; không bao giờ ghi đè giá trị hiện có.
- Đánh dấu schema: `settingsVersion` (hiện là `1`).
- Các khóa và mặc định:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Mã: xem `sources/background.js` → `initializeOrMigrateSettings()` và `SCHEMA_VERSION`.

Quy trình dev (thêm một thiết lập mới)

- Tăng `SCHEMA_VERSION` trong `sources/background.js`.
- Thêm khóa mới + mặc định vào đối tượng `DEFAULTS` trong `initializeOrMigrateSettings()`.
- Dùng quy tắc "only-if-undefined" khi gieo giá trị mặc định; không ghi đè giá trị hiện có.
- Nếu thiết lập hiển thị với người dùng, kết nối nó trong `sources/options.js` và thêm chuỗi bản địa hóa.
- Thêm/điều chỉnh kiểm thử (xem `tests/background.settings.migration.test.js`).

Mẹo kiểm thử thủ công

- Mô phỏng cài đặt mới: xóa thư mục dữ liệu của tiện ích hoặc bắt đầu với hồ sơ mới.
- Mô phỏng cập nhật: đặt `settingsVersion` thành `0` trong `storage.local` rồi tải lại; xác nhận giá trị hiện có không đổi và chỉ các khóa thiếu được thêm vào.

---

### Khắc phục sự cố {#troubleshooting}

- Đảm bảo Thunderbird là 128 ESR hoặc mới hơn
- Dùng Bảng điều khiển lỗi cho vấn đề khi chạy
- Nếu các thiết lập lưu trữ có vẻ không áp dụng đúng, hãy khởi động lại Thunderbird và thử lại. (Thunderbird có thể lưu trạng thái giữa các phiên; khởi động lại sẽ đảm bảo tải thiết lập mới.)

---

### CI & Độ bao phủ {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) chạy vitest với ngưỡng độ bao phủ (85% dòng/hàm/nhánh/mệnh đề). Nếu không đạt ngưỡng, job sẽ thất bại.
- Workflow tải lên tạo phẩm `coverage-html` kèm báo cáo HTML; tải về từ trang chạy (Actions → lần chạy mới nhất → Artifacts).

---

### Đóng góp {#contributing}

- Xem CONTRIBUTING.md để biết hướng dẫn nhánh/commit/PR
- Mẹo: Tạo một hồ sơ phát triển Thunderbird riêng để kiểm thử nhằm tránh ảnh hưởng hồ sơ hằng ngày.

---

### Bản dịch

- Chạy các tác vụ dịch lớn “tất cả → tất cả” có thể chậm và tốn kém. Bắt đầu với một tập con (vd., vài tài liệu và 1–2 locale), xem lại kết quả, rồi mở rộng.

---

- Chính sách thử lại: các tác vụ dịch thử tối đa 3 lần với backoff lũy tiến khi lỗi API; xem `scripts/translate_web_docs_batch.js` và `scripts/translate_web_docs_sync.js`.

Ảnh chụp màn hình cho tài liệu

- Lưu ảnh dưới `website/static/img/`.
- Tham chiếu chúng trong MD/MDX qua `useBaseUrl('/img/<filename>')` để đường dẫn hoạt động với `baseUrl` của site.
- Sau khi thêm hoặc đổi tên ảnh dưới `website/static/img/`, xác nhận mọi tham chiếu vẫn dùng `useBaseUrl('/img/…')` và hiển thị trong bản xem thử cục bộ.
  Favicon

- Tệp `favicon.ico` đa kích thước được tạo tự động trong mọi đường build (Make + script) qua `website/scripts/build-favicon.mjs`.
- Không cần thao tác thủ công; chỉ cần cập nhật `icon-*.png` là đủ.
  Mẹo rà soát

- Giữ nguyên `id` ở front‑matter trong tài liệu đã dịch; chỉ dịch `title` và `sidebar_label` nếu có.

#### clean {#mt-clean}

- Mục đích: xóa tạo phẩm build/preview cục bộ.
- Cách dùng: `make clean`
- Xóa (nếu có):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Mục đích: định dạng, kiểm thử, cập nhật changelog, commit và push.
- Cách dùng: `make commit`
- Chi tiết: chạy Prettier (ghi), `make test`, `make test_i18n`; nối thêm changelog khi có khác biệt đã stage; push lên `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Mục đích: chạy ESLint qua cấu hình phẳng.
- Cách dùng: `make eslint`

---

#### help {#mt-help}

- Mục đích: liệt kê tất cả mục tiêu với tài liệu một dòng.
- Cách dùng: `make help`

---

#### lint {#mt-lint}

- Mục đích: lint MailExtension bằng `web-ext`.
- Cách dùng: `make lint`
- Ghi chú: sao chép tạm `sources/manifest_LOCAL.json` → `sources/manifest.json`; bỏ qua ZIP đã build; cảnh báo không làm hỏng pipeline.

---

#### menu {#mt-menu}

- Mục đích: menu tương tác để chọn mục tiêu Make và tham số tùy chọn.
- Cách dùng: chạy `make` không kèm tham số.
- Ghi chú: nếu không có `whiptail`, menu sẽ dùng `make help`.

---

#### pack {#mt-pack}

- Mục đích: build ZIP ATN và LOCAL (phụ thuộc `lint`).
- Cách dùng: `make pack`
- Mẹo: tăng phiên bản ở cả `sources/manifest_*.json` trước khi đóng gói.

---

#### prettier {#mt-prettier}

- Mục đích: định dạng repo tại chỗ.
- Cách dùng: `make prettier`

#### prettier_check {#mt-prettier_check}

- Mục đích: kiểm tra định dạng (không ghi).
- Cách dùng: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Mục đích: bí danh cho `prettier`.
- Cách dùng: `make prettier_write`

---

#### test {#mt-test}

- Mục đích: chạy Prettier (ghi), ESLint, rồi Vitest (coverage nếu đã cài).
- Cách dùng: `make test`

#### test_i18n {#mt-test_i18n}

- Mục đích: kiểm thử tập trung i18n cho chuỗi tiện ích và tài liệu website.
- Cách dùng: `make test_i18n`
- Chạy: `npm run test:i18n` và `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Mục đích: dịch chuỗi UI tiện ích từ EN sang các locale khác.
- Cách dùng: `make translation_app OPTS="--locales all|de,fr"`
- Ghi chú: giữ nguyên cấu trúc khóa và placeholder; ghi log vào `translation_app.log`. Dạng script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Mục đích: dịch tài liệu website từ `website/docs/*.md` sang `website/i18n/<locale>/...`.
- Ưu tiên: `translate_web_docs_batch` (OpenAI Batch API)
  - Cách dùng (cờ): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Vị trí tham số kiểu cũ vẫn chấp nhận: `OPTS="<doc|all> <lang|all>"`
- Hành vi: dựng JSONL, tải lên, thăm dò mỗi 30s, tải kết quả, ghi tệp.
- Lưu ý: một job batch có thể mất tới 24 giờ để hoàn tất (theo cửa sổ batch của OpenAI). Bảng điều khiển hiển thị thời gian đã trôi qua ở mỗi lần thăm dò.
- Môi trường: `OPENAI_API_KEY` (bắt buộc), tùy chọn `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (mặc định 24h), `BATCH_POLL_INTERVAL_MS`.
- Bản cũ: `translate_web_docs_sync`
  - Cách dùng (cờ): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Vị trí tham số kiểu cũ vẫn chấp nhận: `OPTS="<doc|all> <lang|all>"`
- Hành vi: yêu cầu đồng bộ theo từng cặp (không gom batch).
- Ghi chú: Nhắc tương tác khi bỏ qua `OPTS`. Cả hai chế độ đều giữ nguyên khối mã/mã inline và giữ `id` ở front‑matter không đổi; log vào `translation_web_batch.log` (batch) hoặc `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Mục đích: dịch chuỗi UI website (trang chủ, thanh điều hướng, chân trang) từ `website/i18n/en/code.json` sang tất cả locale dưới `website/i18n/<locale>/code.json` (loại trừ `en`).
- Cách dùng: `make translate_web_index` hoặc `make translate_web_index OPTS="--locales de,fr [--force]"`
- Yêu cầu: export `OPENAI_API_KEY` (tùy chọn: `OPENAI_MODEL=gpt-4o-mini`).
- Hành vi: xác thực cấu trúc JSON, giữ nguyên placeholder ngoặc nhọn, giữ URL không đổi và thử lại kèm phản hồi khi lỗi xác thực.

---

#### web_build {#mt-web_build}

- Mục đích: build site tài liệu ra `website/build`.
- Cách dùng: `make web_build OPTS="--locales en|de,en|all"` (hoặc đặt `BUILD_LOCALES="en de"`)
- Bên trong: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Phụ thuộc: chạy `npm ci` trong `website/` chỉ khi thiếu `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Mục đích: kiểm tra liên kết an toàn ngoại tuyến.
- Cách dùng: `make web_build_linkcheck OPTS="--locales en|all"`
- Ghi chú: build ra `tmp_linkcheck_web_pages`; viết lại `baseUrl` của GH Pages thành `/`; bỏ qua liên kết HTTP(S) từ xa.

#### web_build_local_preview {#mt-web_build_local_preview}

- Mục đích: xem thử gh‑pages cục bộ với tuỳ chọn kiểm thử/kiểm tra liên kết.
- Cách dùng: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Hành vi: thử máy chủ xem thử Node trước (`scripts/preview-server.mjs`, hỗ trợ `/__stop`), dự phòng `python3 -m http.server`; phục vụ trên 8080–8090; PID tại `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Mục đích: đẩy `website/build` lên nhánh `gh-pages`.
- Cách dùng: `make web_push_github`

Mẹo: đặt `NPM=…` để ghi đè trình quản lý gói mà Makefile dùng (mặc định `npm`).
