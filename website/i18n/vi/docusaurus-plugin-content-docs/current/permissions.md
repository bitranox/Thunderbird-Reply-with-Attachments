---
id: permissions
title: 'Quyền truy cập'
---

## Quyền truy cập

:::note Quyền truy cập tối thiểu
Không có quyền truy cập host (web) nào được yêu cầu bởi tiện ích bổ sung này. Tiện ích bổ sung không thu thập dữ liệu telemetry hoặc thực hiện các yêu cầu mạng nền. Xem [Bảo mật](privacy).
:::

---

Tiện ích bổ sung yêu cầu một bộ quyền hạn nhỏ và có trọng tâm. Tại sao mỗi quyền là cần thiết:

- `compose`: quan sát các sự kiện soạn thảo, liệt kê/thêm tệp đính kèm trong phản hồi của bạn.
- `messagesRead`: đọc siêu dữ liệu và lấy tệp đính kèm từ tin nhắn gốc.
- `scripting`: tiêm hộp thoại xác nhận nhỏ trong quá trình soạn thảo khi được bật.
- `windows`: mở một cửa sổ xác nhận nhỏ như một biện pháp cuối cùng khi việc nhắn tin thất bại.
- `sessions`: lưu cờ theo từng tab để tránh xử lý trùng lặp.
- `storage`: giữ lại các tùy chọn (danh sách đen, chuyển đổi xác nhận, câu trả lời mặc định).
- `tabs`: nhắn tin có mục tiêu đến tab soạn thảo cho các yêu cầu xác nhận.

Ghi chú bổ sung:

- Không có quyền host (nguồn web) nào được yêu cầu bởi tiện ích bổ sung này.
- Quyền `tabs` chỉ được sử dụng để nhắm đến tab soạn thảo khi điều phối hộp thoại xác nhận tùy chọn; nó không được sử dụng để đọc lịch sử hoặc điều hướng các trang.

Các quyền này được tài liệu hóa trong mã nguồn và được kiểm tra trong CI. Tiện ích bổ sung không thu thập dữ liệu telemetry.

---

### Tóm tắt (quyền truy cập → mục đích) {#permissions-summary}

| Quyền truy cập | Tại sao nó cần thiết                                                                 |
| -------------- | ------------------------------------------------------------------------------------ |
| `compose`      | Quan sát các sự kiện soạn thảo; liệt kê và thêm tệp đính kèm trong phản hồi của bạn. |
| `messagesRead` | Liệt kê các tệp đính kèm từ tin nhắn gốc và lấy dữ liệu tệp.                         |
| `scripting`    | Tiêm/điều phối giao diện người dùng nhẹ để xác nhận khi được bật.                    |
| `windows`      | Cửa sổ bật lên dự phòng nếu việc nhắn tin thất bại (hiếm).                           |
| `sessions`     | Lưu cờ theo từng tab để ngăn ngừa xử lý trùng lặp.                                   |
| `storage`      | Giữ lại các tùy chọn (danh sách đen, chuyển đổi xác nhận, câu trả lời mặc định).     |
| `tabs`         | Nhắn tin có mục tiêu đến tab soạn thảo cho các yêu cầu xác nhận.                     |
| (quyền host)   | Không có — tiện ích bổ sung không yêu cầu các nguồn web.                             |

---

## Không được yêu cầu {#not-requested}

- `compose.save`, `compose.send` — tiện ích bổ sung không lưu hoặc gửi thư thay mặt bạn.

Xem thêm: [Bảo mật](privacy) — không có dữ liệu telemetry, không có mạng nền, chỉ liên kết do người dùng khởi xướng.

---
