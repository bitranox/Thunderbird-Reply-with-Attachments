---
id: usage
title: Cách dùng
sidebar_label: Cách dùng
---

## Cách dùng

- Trả lời, tiện ích sẽ thêm bản gốc tự động — hoặc hỏi trước nếu đã bật trong Options.
- Khử trùng lặp theo tên tệp; luôn bỏ qua SMIME và ảnh inline.
- Các tệp đính kèm trong danh sách đen cũng bị bỏ qua (không phân biệt hoa/thường, mẫu glob).

---

## Chi tiết hành vi

- Ngăn trùng lặp: tiện ích đánh dấu thẻ soạn (compose tab) là đã xử lý bằng giá trị phiên theo thẻ và lớp bảo vệ trong bộ nhớ. Sẽ không thêm bản gốc hai lần.
- Tôn trọng tệp đính kèm sẵn có: nếu trong soạn thảo đã có tệp đính kèm, bản gốc vẫn được thêm đúng một lần, bỏ qua các tên tệp đã tồn tại.
- Loại trừ: các hiện vật SMIME (ví dụ `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) và ảnh inline bị bỏ qua. Nếu vòng đầu không có gì phù hợp, một phương án dự phòng “nới lỏng” sẽ kiểm tra lại các phần không phải SMIME.
- Cảnh báo danh sách đen (nếu bật): khi ứng viên bị loại bởi danh sách đen, tiện ích hiển thị hộp thoại nhỏ liệt kê các tệp bị ảnh hưởng và mẫu khớp. Cảnh báo này cũng xuất hiện khi sẽ không có tệp nào được thêm vì mọi thứ đều bị loại.
