---
id: usage
title: 'Cách sử dụng'
sidebar_label: 'Cách sử dụng'
---

---

## Cách sử dụng {#usage}

- Khi trả lời, tiện ích sẽ tự động thêm các tệp gốc — hoặc sẽ hỏi trước nếu đã bật trong Tùy chọn.
- Các bản trùng lặp được loại bỏ theo tên tệp; các phần S/MIME luôn bị bỏ qua. Hình ảnh được nhúng trong thư gốc vẫn ở trong phần nội dung của thư trả lời, nơi Thunderbird đặt chúng, và không được sao chép thành tệp.
- Các tệp đính kèm trong danh sách chặn cũng bị bỏ qua (mẫu glob không phân biệt hoa thường khớp với tên tệp, không phải đường dẫn). Xem [Cấu hình](configuration#blacklist-glob-patterns).

---

### Điều gì xảy ra khi trả lời {#what-happens}

- Phát hiện thư trả lời → liệt kê các tệp đính kèm gốc → bỏ qua S/MIME và hình ảnh nhúng → xác nhận tùy chọn → thêm các tệp đủ điều kiện (bỏ qua các bản trùng lặp).

| Loại phần                                                         | Được sao chép vào thư trả lời |
|-------------------------------------------------------------------|------------------------------:|
| Tệp chữ ký S/MIME `smime.p7s`                                     | Không                         |
| Các loại MIME của S/MIME (`application/pkcs7-*`)                  | Không                         |
| Hình ảnh được nội dung thư nhúng qua `cid:`                       | Không (đã có trong nội dung)  |
| Hình ảnh được đánh dấu `Content-Disposition: inline`              | Không (đã có trong nội dung)  |
| Hình ảnh có `Content-ID` mà nội dung không bao giờ tham chiếu tới | Có                            |
| Thư đính kèm (`message/rfc822`) có tên tệp                        | Có                            |
| Tệp đính kèm thông thường có tên tệp                              | Có                            |

Một hình ảnh chỉ được coi là nhúng khi thư gốc thực sự tham chiếu đến nó, hoặc khi
người gửi đánh dấu rõ ràng là `Content-Disposition: inline`. Chỉ riêng tiêu đề
`Content-ID` là chưa đủ: một số ứng dụng thư đặt tiêu đề này lên mọi phần hình ảnh, kể
cả các tệp đính kèm thật sự, và những tệp đó vẫn phải được sao chép.

---

### Tham chiếu chéo {#cross-reference}

- Chức năng Chuyển tiếp không bị thay đổi (xem Hạn chế bên dưới).
- Để biết lý do tại sao một tệp đính kèm có thể không được thêm, xem “Vì sao tệp đính kèm có thể không được thêm”.

---

## Chi tiết hành vi {#behavior-details}

- **Ngăn trùng lặp:** Tiện ích đánh dấu thẻ soạn thảo là đã xử lý bằng một giá trị phiên theo từng thẻ và một cơ chế bảo vệ trong bộ nhớ. Nó sẽ không thêm bản gốc hai lần.
- Đóng và mở lại cửa sổ soạn thảo được coi như một thẻ mới (tức là cho phép một lần thử mới).
- **Tôn trọng tệp đính kèm hiện có:** Nếu khung soạn đã có một số tệp đính kèm, các bản gốc vẫn được thêm đúng một lần, bỏ qua các tên tệp đã tồn tại.
- **Loại trừ:** Các thành phần S/MIME và ảnh nội tuyến bị loại khỏi tệp đính kèm. Nếu không có gì đủ điều kiện ở lượt đầu, một phương án linh hoạt sẽ kiểm tra lại các phần không phải S/MIME. Ảnh nội tuyến được xử lý riêng: chúng được khôi phục trong nội dung thư trả lời dưới dạng URI dữ liệu (khi bật).
  - **Tên tệp:** `smime.p7s`
  - **Kiểu MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Ảnh nội tuyến:** bất kỳ phần `image/*` nào được tham chiếu bởi Content‑ID — bị loại khỏi tệp đính kèm nhưng được nhúng vào nội dung thư trả lời khi "Include inline pictures" đang BẬT
  - **Email đính kèm (`message/rfc822`):** được xử lý như tệp đính kèm thông thường nếu có tên tệp; có thể được thêm (tuân theo kiểm tra trùng lặp và danh sách chặn).
- **Cảnh báo danh sách chặn (nếu bật):** Khi các ứng viên bị loại bởi danh sách chặn của bạn,
  tiện ích sẽ hiển thị một cửa sổ nhỏ liệt kê các tệp bị ảnh hưởng và mẫu
  khớp. Cảnh báo này cũng xuất hiện trong trường hợp không có tệp đính kèm nào được
  thêm vì mọi thứ đã bị loại.

---

## Phím tắt {#keyboard-shortcuts}

- Hộp thoại xác nhận: Y/J = Đồng ý, N/Esc = Không; Tab/Shift+Tab và các phím Mũi tên chuyển vòng tiêu điểm.
  - Mục “Default answer” trong [Cấu hình](configuration#confirmation) đặt nút được lấy tiêu điểm ban đầu.
  - Enter kích hoạt nút đang có tiêu điểm. Tab/Shift+Tab và các phím mũi tên di chuyển tiêu điểm để hỗ trợ khả năng truy cập.

### Phím tắt nhanh {#keyboard-cheat-sheet}

| Phím            | Hành động                                 |
|-----------------|-------------------------------------------|
| Y / J           | Xác nhận Đồng ý                           |
| N / Esc         | Xác nhận Không                            |
| Enter           | Kích hoạt nút đang có tiêu điểm           |
| Tab / Shift+Tab | Di chuyển tiêu điểm tiến/lùi              |
| Phím mũi tên    | Di chuyển tiêu điểm giữa các nút          |
| Default answer  | Đặt tiêu điểm ban đầu (Đồng ý hoặc Không) |

---

## Hạn chế {#limitations}

- Chức năng Chuyển tiếp không bị thay đổi bởi tiện ích này (Trả lời và Trả lời tất cả được hỗ trợ).
- Tệp đính kèm rất lớn có thể bị giới hạn bởi Thunderbird hoặc nhà cung cấp.
  - Tiện ích không chia nhỏ hoặc nén tệp; nó dựa vào cơ chế xử lý tệp đính kèm thông thường của Thunderbird.
- Thư được mã hóa: các phần S/MIME bị loại trừ theo chủ đích.

---

## Vì sao tệp đính kèm có thể không được thêm {#why-attachments-might-not-be-added}

- Hình ảnh mà thư gốc nhúng vào không được sao chép thành tệp. Chúng đã có sẵn trong nội dung thư trả lời, nơi Thunderbird đặt chúng. Xem [Configuration](configuration#include-inline-pictures).
- Các phần chữ ký S/MIME bị loại trừ theo thiết kế: các tên tệp như `smime.p7s` và các kiểu MIME như `application/pkcs7-signature` hoặc `application/pkcs7-mime` sẽ bị bỏ qua.
- Mẫu danh sách chặn có thể lọc các ứng viên: xem [Cấu hình](configuration#blacklist-glob-patterns); việc khớp không phân biệt hoa thường và chỉ theo tên tệp.
- Tên tệp trùng lặp sẽ không được thêm lại: nếu khung soạn đã có một tệp với cùng tên đã chuẩn hóa, nó sẽ bị bỏ qua.
- Các phần không phải tệp hoặc thiếu tên tệp: chỉ những phần giống tệp có tên tệp sử dụng được mới được xem xét để thêm.

---

Xem thêm

- [Cấu hình](configuration)
