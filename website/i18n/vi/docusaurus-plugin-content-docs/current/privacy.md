---
id: privacy
title: Quyền riêng tư
sidebar_label: Quyền riêng tư
---

Reply with Attachments không thu thập phân tích/telemetry và không gửi dữ liệu của bạn đi đâu cả.

Tiện ích làm gì:

- Đọc siêu dữ liệu và tệp đính kèm từ thư gốc tại chỗ (API Thunderbird) để thêm vào thư trả lời của bạn.
- Lưu các tùy chọn của bạn (danh sách đen, xác nhận, câu trả lời mặc định) vào bộ nhớ cục bộ của Thunderbird.

Tiện ích không làm gì:

- Không theo dõi, không phân tích, không báo cáo lỗi, không ghi log từ xa.
- Không có yêu cầu mạng nền, trừ khi bạn chủ động mở liên kết ngoài (Docs, GitHub, Donate).

Các quyền được mô tả ở trang [Permissions](permissions).

## Content Security Policy (CSP)

Trang options và popup tránh dùng script inline. Tất cả JavaScript được tải từ các tệp đi kèm tiện ích để tuân thủ CSP nghiêm ngặt của Thunderbird. Các đoạn mã trong tài liệu chỉ là ví dụ và không được tiện ích thực thi.
