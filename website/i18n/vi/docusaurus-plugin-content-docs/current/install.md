---
id: install
title: 'Cài đặt'
slug: /install
sidebar_label: 'Cài đặt'
---

---

## Cài đặt qua "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Phiên bản Thunderbird tối thiểu
Tiện ích bổ sung này hỗ trợ Thunderbird **128 ESR hoặc mới hơn**. Các phiên bản cũ không được hỗ trợ.
:::

Đây là phương thức cài đặt được khuyến nghị. Các tiện ích bổ sung được cài từ ATN (addons.thunderbird.net) sẽ nhận cập nhật tự động. Các bản cài LOCAL/dev không tự động cập nhật.

- Phiên bản Thunderbird tối thiểu: 128 ESR hoặc mới hơn.

1. Trong Thunderbird, vào **Công cụ > Tiện ích bổ sung và Chủ đề**.
2. Tìm "reply with attachments".
3. Thêm tiện ích bổ sung.

Hoặc mở trực tiếp trang tiện ích bổ sung: [Tiện ích bổ sung Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Cài đặt thủ công từ XPI {#local-installation-in-thunderbird}

### Tải tệp XPI {#download-the-xpi-file}

1. Đi tới [trang Tiện ích bổ sung của Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Tải phiên bản mới nhất của tiện ích bổ sung dưới dạng tệp XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Cài đặt trong Thunderbird {#install-in-thunderbird-local}

1. Mở Thunderbird.
2. Vào **Công cụ > Tiện ích bổ sung và Chủ đề**.
3. Trong **Trình quản lý Tiện ích bổ sung**, nhấp biểu tượng bánh răng ở góc trên bên phải.
4. Chọn **Cài tiện ích bổ sung từ tệp…** từ menu.
5. Chọn tệp `reply_with_attachments-x.y.z-tb.xpi` đã tải xuống.
6. Xác nhận cài đặt khi được nhắc.

---

## Cài đặt cho phát triển {#installation-for-development}

### Tải kho lưu trữ {#download-the-repository}

1. Tải phiên bản mới nhất của kho GitHub.
2. Chạy `make help` để biết thêm thông tin.

### Cài đặt trong Thunderbird {#install-in-thunderbird-dev}

1. Mở Thunderbird.
2. Vào **Công cụ > Tiện ích bổ sung và Chủ đề**.
3. Trong **Trình quản lý Tiện ích bổ sung**, nhấp biểu tượng bánh răng ở góc trên bên phải.
4. Chọn **Cài tiện ích bổ sung từ tệp…** từ menu.
5. Chọn tệp `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` được tạo.
6. Xác nhận cài đặt khi được nhắc.

Lưu ý: Nếu Thunderbird không chấp nhận `.zip` trên hệ thống của bạn, hãy đổi tên nó thành `.xpi` và thử “Cài tiện ích bổ sung từ tệp…” lại.

### Nơi tìm tệp ZIP LOCAL {#where-local-zip}

- Trước tiên, đóng gói tiện ích bổ sung: chạy `make pack` ở thư mục gốc của kho.
- Sau khi đóng gói, tìm tệp zip “LOCAL” ở thư mục gốc của kho (ví dụ: `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Trước khi đóng gói lại để thử nghiệm, tăng phiên bản trong cả `sources/manifest_ATN.json` và `sources/manifest_LOCAL.json`.

---

## Vô hiệu hóa, gỡ cài đặt và cập nhật {#disable-uninstall-updates}

- Vô hiệu hóa: Thunderbird → Công cụ → Tiện ích bổ sung và Chủ đề → tìm tiện ích bổ sung → tắt công tắc.
- Gỡ cài đặt: cùng màn hình → menu ba chấm → Xóa.
- Cập nhật: các bản cài từ ATN tự động cập nhật khi phiên bản mới được phê duyệt. Bản cài LOCAL/dev không tự động cập nhật; hãy tự cài lại bản LOCAL mới.
- Xóa hoàn toàn cài đặt: xem [Quyền riêng tư → Xóa dữ liệu](privacy#data-removal).

Xem thêm

- [Bắt đầu nhanh](quickstart)
