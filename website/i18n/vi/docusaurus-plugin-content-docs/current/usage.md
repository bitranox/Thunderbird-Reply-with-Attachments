---
id: usage
title: 'Cách sử dụng'
sidebar_label: 'Cách sử dụng'
---

---

## Cách sử dụng {#usage}

- Khi trả lời, tiện ích sẽ tự động thêm các tệp gốc — hoặc sẽ hỏi trước nếu đã bật trong Tùy chọn.
- Loại bỏ trùng lặp theo tên tệp; các phần S/MIME luôn bị bỏ qua. Ảnh nội tuyến được khôi phục trong phần nội dung thư trả lời theo mặc định (có thể tắt qua "Include inline pictures" trong Tùy chọn).
- Các tệp đính kèm trong danh sách chặn cũng bị bỏ qua (mẫu glob không phân biệt hoa thường khớp với tên tệp, không phải đường dẫn). Xem [Cấu hình](configuration#blacklist-glob-patterns).

---

### Điều gì xảy ra khi trả lời {#what-happens}

- Phát hiện thao tác trả lời → liệt kê các tệp đính kèm gốc → lọc S/MIME + nội tuyến → xác nhận tùy chọn → thêm các tệp đủ điều kiện (bỏ qua bản trùng) → khôi phục ảnh nội tuyến trong phần nội dung.

Lượt kiểm tra nghiêm ngặt so với linh hoạt: Tiện ích trước tiên loại trừ các phần S/MIME và nội tuyến khỏi tệp đính kèm. Nếu không có gì đủ điều kiện, nó chạy một lượt linh hoạt vẫn loại trừ S/MIME/nội tuyến nhưng chấp nhận nhiều trường hợp hơn (xem Chi tiết mã). Ảnh nội tuyến không bao giờ được thêm như tệp đính kèm; thay vào đó, khi "Include inline pictures" được bật (mặc định), chúng được nhúng trực tiếp vào nội dung thư trả lời dưới dạng URI dữ liệu base64.

| Loại phần                                                |            Lượt kiểm tra nghiêm ngặt |              Lượt kiểm tra linh hoạt |
| -------------------------------------------------------- | -----------------------------------: | -----------------------------------: |
| Tệp chữ ký S/MIME `smime.p7s`                            |                              Bị loại |                              Bị loại |
| Kiểu MIME S/MIME (`application/pkcs7-*`)                 |                              Bị loại |                              Bị loại |
| Ảnh nội tuyến được tham chiếu bởi Content‑ID (`image/*`) | Bị loại (khôi phục trong nội dung\*) | Bị loại (khôi phục trong nội dung\*) |
| Email đính kèm (`message/rfc822`) có tên tệp             |                           Không thêm |                     Có thể được thêm |
| Tệp đính kèm thông thường có tên tệp                     |                     Có thể được thêm |                     Có thể được thêm |

\* Khi "Include inline pictures" được bật (mặc định: BẬT), ảnh nội tuyến được nhúng trực tiếp vào nội dung thư trả lời dưới dạng URI dữ liệu base64 thay vì được thêm làm tệp đính kèm. Xem [Cấu hình](configuration#include-inline-pictures).

Ví dụ: Một số tệp đính kèm có thể thiếu một số header nhưng vẫn là tệp thông thường (không phải nội tuyến/S/MIME). Nếu lượt nghiêm ngặt không tìm thấy gì, lượt linh hoạt có thể chấp nhận và đính kèm chúng.

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
| --------------- | ----------------------------------------- |
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

- Ảnh nội tuyến không được thêm như tệp đính kèm. Khi "Include inline pictures" đang BẬT (mặc định), chúng được nhúng vào nội dung thư trả lời dưới dạng URI dữ liệu. Nếu cài đặt đang TẮT, ảnh nội tuyến sẽ bị loại bỏ hoàn toàn. Xem [Cấu hình](configuration#include-inline-pictures).
- Các phần chữ ký S/MIME bị loại trừ theo thiết kế: các tên tệp như `smime.p7s` và các kiểu MIME như `application/pkcs7-signature` hoặc `application/pkcs7-mime` sẽ bị bỏ qua.
- Mẫu danh sách chặn có thể lọc các ứng viên: xem [Cấu hình](configuration#blacklist-glob-patterns); việc khớp không phân biệt hoa thường và chỉ theo tên tệp.
- Tên tệp trùng lặp sẽ không được thêm lại: nếu khung soạn đã có một tệp với cùng tên đã chuẩn hóa, nó sẽ bị bỏ qua.
- Các phần không phải tệp hoặc thiếu tên tệp: chỉ những phần giống tệp có tên tệp sử dụng được mới được xem xét để thêm.

---

Xem thêm

- [Cấu hình](configuration)
