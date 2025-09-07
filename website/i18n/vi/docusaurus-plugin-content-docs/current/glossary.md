---
id: glossary
title: Thuật ngữ i18n
sidebar_label: Thuật ngữ
---

Các thuật ngữ chuẩn dùng trong UI và tài liệu của tiện ích. Dùng chúng để giữ bản dịch thống nhất giữa các locale.

Ghi chú

- Giữ chuỗi UI ngắn gọn, hướng hành động.
- Ưu tiên danh từ cho cài đặt và động từ cho hành động.
- Dùng sentence case (viết hoa từ đầu tiên) trừ tiêu đề.

Thuật ngữ

- Attachments: tệp đi kèm email. Tránh dùng “enclosures”.
- Blacklist (Exclude list): danh sách mẫu ngăn tệp được đính kèm tự động.
- Trong nội dung UI, dùng “Blacklist (glob patterns)” để khớp với trang cài đặt.
- Giải thích rằng chỉ khớp theo tên tệp; không theo đường dẫn.
- Confirm / Confirmation: hỏi người dùng trước khi thêm tệp đính kèm.
- Answers: “Yes” (thêm), “No” (hủy). Giữ nhãn nút ngắn gọn.
- Inline image: ảnh được tham chiếu bởi CID trong HTML; không bao giờ thêm dưới dạng tệp.
- S/MIME signature: `smime.p7s` hoặc thành phần chữ ký PKCS7; không bao giờ thêm.
- Options / Settings: trang cấu hình của tiện ích trong Thunderbird.
- Default answer: câu trả lời được chọn sẵn cho hộp thoại xác nhận.

Phong cách

- Tên tệp: hiển thị dưới dạng mã (monospace), ví dụ `smime.p7s`, `*.png`.
- Phím/nút: chỉ viết hoa kiểu title‑case khi là tên riêng; còn lại dùng sentence case.
- Tránh thuật ngữ khó (ví dụ “idempotency”); ưu tiên “prevent duplicates”.
