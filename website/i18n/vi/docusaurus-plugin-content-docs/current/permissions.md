---
id: permissions
title: Quyền
---

Tiện ích chỉ yêu cầu một số quyền nhỏ và có mục tiêu rõ ràng. Lý do cho từng quyền:

- compose: theo dõi sự kiện soạn thư, liệt kê/thêm tệp đính kèm vào thư trả lời.
- messagesRead: đọc siêu dữ liệu và lấy tệp đính kèm từ thư gốc.
- scripting: khi bật, chèn hộp thoại xác nhận nhỏ trong cửa sổ soạn.
- windows: mở cửa sổ bật lên xác nhận nhỏ như phương án cuối khi nhắn tin thất bại.
- sessions: lưu cờ theo từng thẻ để tránh xử lý trùng lặp.
- storage: lưu các tùy chọn (danh sách đen, bật/tắt xác nhận, câu trả lời mặc định).
- tabs: gửi thông điệp có mục tiêu đến thẻ soạn cho các yêu cầu xác nhận.

Những quyền này được ghi rõ trong mã nguồn và được kiểm thử trong CI. Tiện ích không thu thập telemetry.
