---
id: features
title: 'Tính năng'
sidebar_label: 'Tính năng'
---

---

## Tính năng {#features}

- Tự động đính kèm các tệp từ email gốc khi trả lời.
- Có thể cấu hình hành vi: tệp đính kèm có thể được
  - thêm tự động, hoặc
  - chỉ thêm sau khi có xác nhận (một hộp thoại nhỏ, dễ tiếp cận). Trong Tùy chọn bạn
    có thể bật xác nhận và chọn câu trả lời mặc định (Có/Không).
- Danh sách đen tên tệp (mẫu glob) ngăn các tệp cụ thể được
  đính kèm tự động. Ví dụ: `*intern*`, `*secret*`, `*passwor*`.
  Việc khớp không phân biệt hoa/thường và chỉ kiểm tra tên tệp; cung cấp một mẫu
  mỗi dòng trong Tùy chọn.
- Cảnh báo danh sách đen (tùy chọn, bật theo mặc định): khi các tệp bị loại trừ bởi
  danh sách đen của bạn, một hộp thoại nhỏ sẽ liệt kê tệp và (các) mẫu khớp. Thân thiện với
  chế độ tối và có thể thao tác bằng bàn phím (Enter/Esc để đóng).
- Hoạt động với Trả lời và Trả lời tất cả. Chuyển tiếp không bị chỉnh sửa bởi tiện ích bổ sung này.
- Thêm các tệp gốc ngay cả khi bạn đã tự đính kèm thứ gì đó; tránh trùng lặp theo tên tệp.
- Cơ chế chống trùng lặp theo từng tab ngăn thêm hai lần trong cùng một tab soạn thảo.
- Mặc định bỏ qua chứng chỉ S/MIME để tránh các tệp đính kèm không cần thiết.
- Bao gồm hình ảnh nội tuyến (mặc định: BẬT). Ảnh nhúng được khôi phục trực tiếp trong
  phần nội dung trả lời dưới dạng URI dữ liệu base64, giữ nguyên bố cục nội tuyến ban đầu. Tắt trong
  Tùy chọn để bỏ qua hoàn toàn ảnh nội tuyến.

---

## Cách thức hoạt động {#how-it-works}

- Khi trả lời, tiện ích bổ sung liệt kê các tệp đính kèm gốc.
- Lọc bỏ chữ ký S/MIME khỏi tệp đính kèm; ảnh nội tuyến được khôi phục trong nội dung thư (trừ khi bị tắt).
- Tùy chọn yêu cầu xác nhận (thân thiện với bàn phím).
- Thêm các tệp phù hợp vào khung soạn thư của bạn, tránh trùng lặp theo tên tệp.
- Xem “Vì sao tệp đính kèm có thể không được thêm” trong phần Sử dụng cho các trường hợp biên.

Lưu ý về quyền riêng tư: Mọi xử lý diễn ra cục bộ trong Thunderbird. Tiện ích bổ sung không thực hiện bất kỳ yêu cầu mạng nền nào.

---
