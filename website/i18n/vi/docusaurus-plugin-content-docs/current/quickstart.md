---
id: quickstart
title: 'Bắt đầu nhanh'
sidebar_label: 'Bắt đầu nhanh'
---

---

## Bắt đầu nhanh

:::important Phiên bản Thunderbird tối thiểu
Tiện ích bổ sung này hỗ trợ Thunderbird **128 ESR hoặc mới hơn**. Các phiên bản cũ hơn không được hỗ trợ.
:::

:::note Không thu thập telemetry; không có mạng nền
Tiện ích bổ sung **không** thu thập phân tích/telemetry và **không** thực hiện yêu cầu mạng nền. Truy cập mạng chỉ diễn ra khi bạn bấm các liên kết bên ngoài (Docs, GitHub, Donate).
:::

---

### Cài đặt

1. Cài đặt tiện ích bổ sung từ Thunderbird Add‑ons.
2. Tùy chọn: Bật xác nhận (Tùy chọn → “Hỏi trước khi thêm tệp đính kèm”).
3. Tùy chọn: Giữ bật cảnh báo danh sách đen (mặc định): “Cảnh báo nếu tệp đính kèm bị loại trừ bởi danh sách đen”.
4. Tùy chọn: Thêm các mẫu danh sách đen (mỗi dòng một mẫu), ví dụ:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Lưu ý: “# …” ở trên là chú thích trong tài liệu này; đừng đưa chú thích vào các mẫu bạn dán trong Tùy chọn. Chỉ nhập mỗi dòng một mẫu.

Bây giờ hãy trả lời một thư có tệp đính kèm — bản gốc sẽ được thêm tự động hoặc sau khi bạn xác nhận nhanh. Nếu có tệp nào bị loại trừ bởi danh sách đen của bạn, bạn sẽ thấy một cảnh báo ngắn liệt kê chúng.

---

### Kiểm tra {#verify}

- Trả lời một thư có 1–2 tệp đính kèm và xác nhận rằng các bản gốc được thêm vào cửa sổ soạn thảo.
- Để điều chỉnh hành vi, xem [Cấu hình](configuration) (bật/tắt xác nhận, câu trả lời mặc định, mẫu danh sách đen).

---

### Kiểm tra cảnh báo danh sách đen {#verify-blacklist-warning}

- Trả lời một thư có tệp như “secret.txt”.
- Khi “Cảnh báo nếu tệp đính kèm bị loại trừ bởi danh sách đen” được bật, một hộp thoại nhỏ sẽ liệt kê các tệp bị loại trừ và mẫu khớp.

Nếu bạn không thấy cảnh báo, hãy đảm bảo mẫu khớp chính xác với tên tệp (chỉ tên tệp, không phân biệt hoa/thường). Xem Cấu hình → Danh sách đen.

---

### Ghi chú về bàn phím {#keyboard-note}

- Hộp thoại xác nhận hỗ trợ Y/J cho Yes và N/Esc cho No. Trên một số bàn phím không dùng chữ Latin, các phím chữ có thể khác; Enter xác nhận nút đang được chọn.

---
