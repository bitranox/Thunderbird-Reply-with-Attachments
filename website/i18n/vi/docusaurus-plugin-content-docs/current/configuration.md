---
id: configuration
title: Cấu hình
---

# Cấu hình

Ghi chú thuật ngữ: xem [Glossary](glossary) để dùng thuật ngữ thống nhất trong UI và tài liệu.

## Mở Options trong Thunderbird

- Thunderbird → Tools → Add‑ons and Themes → “Reply with Attachments” → Preferences/Options

### Thiết lập:

#### Xác nhận

- Bật/tắt “Ask before adding attachments”.
- Câu trả lời mặc định: Yes hoặc No (mặc định tiêu điểm & bàn phím).
- Bàn phím: Y/J = Yes; N/Esc = No; Tab/Shift+Tab và phím mũi tên để chuyển tiêu điểm.

#### Danh sách đen (mẫu glob)

Các tệp trong danh sách đen sẽ không được tự động đính kèm khi trả lời.

- Mỗi dòng một mẫu; không phân biệt hoa/thường; chỉ khớp theo tên tệp.
- Ví dụ: `*.png`, `smime.*`, `*.p7s`
- Token glob hỗ trợ: `*` (mọi ký tự trừ `/`), `?` (một ký tự), các lớp ký tự như `[abc]`. Để khớp `[` dạng literal, dùng `\[`. Đường dẫn (`**/`) bị bỏ qua — chỉ khớp tên tệp.
- Không hỗ trợ: phủ định (`!`), brace expansion (`{..}`), dải phức tạp. Hãy giữ mẫu đơn giản.

Mẹo: Giá trị mặc định được điền sẵn khi mở lần đầu và có thể đặt lại bất cứ lúc nào.

#### Cảnh báo khi tệp đính kèm bị loại bởi danh sách đen

- Bật/tắt “Warn if attachments are excluded by blacklist” (mặc định: BẬT).
- Khi bật, một modal nhỏ liệt kê các tệp bị loại và mẫu khớp. Cảnh báo này cũng xuất hiện khi sẽ không có tệp nào được thêm vì tất cả đều bị loại.

#### Lưu thiết lập của bạn

---

### Chuẩn hóa tên tệp (ngăn trùng lặp)

Để hành vi nhất quán giữa các nền tảng, tên tệp được chuẩn hóa trước khi kiểm tra trùng lặp:

- Unicode được chuẩn hóa về NFC.
- Tên được case‑fold (chuyển về chữ thường).
- Cắt bỏ dấu chấm/khoảng trắng ở cuối (thân thiện với Windows).

Nhờ vậy, việc phát hiện trùng lặp trở nên ổn định với các tên như `café.pdf` so với `café.pdf` (NFD) hoặc `FILE.txt.` so với `file.txt`.
