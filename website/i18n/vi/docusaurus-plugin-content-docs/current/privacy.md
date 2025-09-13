---
id: privacy
title: 'Quyền riêng tư'
sidebar_label: 'Quyền riêng tư'
---

## Quyền riêng tư

:::note Không có dữ liệu; không có mạng nền
Tiện ích mở rộng này **không** thu thập phân tích/dữ liệu và **không** thực hiện các yêu cầu mạng nền. Mọi quyền truy cập mạng chỉ xảy ra khi bạn nhấp vào một liên kết bên ngoài (Tài liệu, GitHub, Quyên góp).
:::

Reply with Attachments không thu thập phân tích hoặc dữ liệu và không gửi dữ liệu của bạn đi đâu cả.

Những gì tiện ích mở rộng làm:

- Đọc metadata và tệp đính kèm từ tin nhắn gốc tại địa phương (API Thunderbird) để đính kèm chúng vào trả lời của bạn.
- Lưu tùy chọn của bạn (danh sách đen, xác nhận, câu trả lời mặc định) trong bộ nhớ cục bộ của Thunderbird.

Những gì tiện ích mở rộng không làm:

- Không theo dõi, phân tích, báo cáo sự cố, hoặc ghi nhật ký từ xa.
- Không có yêu cầu mạng nền, ngoại trừ khi bạn mở các liên kết bên ngoài (Tài liệu, GitHub, Quyên góp) một cách rõ ràng.

Các quyền cho phép được tài liệu trên trang [Permissions](permissions).

---

## Chính sách bảo mật nội dung (CSP) {#content-security-policy-csp}

Các tùy chọn và trang pop-up tránh sử dụng script tích hợp. Tất cả JavaScript được tải từ các tệp đi kèm với tiện ích mở rộng để tuân thủ CSP nghiêm ngặt trong Thunderbird. Nếu bạn nhúng các đoạn mã vào tài liệu, chúng chỉ là ví dụ và không được thực thi bởi tiện ích mở rộng.

---

## Lưu trữ dữ liệu {#data-storage}

- Tùy chọn người dùng (danh sách đen, chuyển đổi xác nhận, câu trả lời mặc định) được lưu trong `storage.local` của Thunderbird cho tiện ích mở rộng này.
- Tiện ích mở rộng không thực hiện đồng bộ đám mây.

---

## Mạng {#network}

- Tiện ích mở rộng không thực hiện hoạt động mạng nền nào.
- Mọi quyền truy cập mạng chỉ xảy ra khi bạn nhấp vào các liên kết (Tài liệu, GitHub, Quyên góp) hoặc khi Thunderbird thực hiện các thao tác bình thường không liên quan đến tiện ích mở rộng này.

---

## Xóa dữ liệu {#data-removal}

- Gỡ cài đặt tiện ích mở rộng sẽ xóa mã của nó.
- Cài đặt chỉ được giữ trong `storage.local` của Thunderbird và sẽ bị xóa khi gỡ cài đặt; không sử dụng lưu trữ bên ngoài.
- Đặt lại cài đặt mà không cần gỡ cài đặt:
  - Trang tùy chọn: sử dụng “Đặt lại về mặc định” cho danh sách đen và cảnh báo danh sách đen.
  - Nâng cao: trong Thunderbird → Công cụ → Công cụ dành cho lập trình viên → Gỡ lỗi Tiện ích mở rộng, mở bộ nhớ của tiện ích mở rộng và xóa các khóa nếu cần.
