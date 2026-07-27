---
id: changelog
title: 'Nhật ký thay đổi'
---

---

## Nhật ký thay đổi

Để có lịch sử đầy đủ, chi tiết, hãy xem
[CHANGELOG.md trên GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: hình ảnh không còn bị loại bỏ chỉ vì người gửi đặt `Content-ID` cho chúng; tùy chọn "Include inline pictures" đã bị loại bỏ, vì Thunderbird tự giữ hình ảnh nhúng trong nội dung thư trả lời; các liên kết giờ đây mở trong trình duyệt hệ thống; giới hạn 50 tệp đính kèm / 100 MB cho mỗi thư trả lời, với mọi thứ bị bỏ sót đều được báo cáo.
- 2.3.2: "Include inline pictures" nhúng hình ảnh vào nội dung thư trả lời dưới dạng URI dữ liệu base64 (bị loại bỏ lần nữa sau khi xem xét trên add-ons.thunderbird.net; Thunderbird tự làm việc này); cải thiện chất lượng mã nguồn và mở rộng phạm vi kiểm thử.
- 2.3.1: Giữ lại tệp đính kèm sau khi Thunderbird chuyển trang sự kiện nền sang trạng thái nhàn rỗi; thêm các hook gỡ lỗi chuyên biệt để khắc phục sự cố.
- 2.3.0: Tinh chỉnh loại bỏ trùng lặp tệp đính kèm, mở rộng phạm vi kiểm thử và loại bỏ các quyền đã lỗi thời để đáp ứng chính sách của AMO.
- 2.1.0: Hỗ trợ quốc tế hóa đầy đủ cho 100 ngôn ngữ hàng đầu
- 2.0.0: viết lại thành phiên bản đầy đủ tính năng (EN/DE)
- 1.0.1: chuyển sang messages.listAttachments()
- 1.0.0: phát hành ban đầu

---

## Ngày phát hành và kênh {#dates-and-channels}

- Các bản phát hành lên ATN có thể trễ vài giờ sau khi đóng gói.
- Bản dựng LOCAL chỉ dành cho kiểm thử của nhà phát triển và không được phân phối qua ATN.

---
