---
id: donation
title: 'Quyên góp'
sidebar_label: 'Quyên góp'
---

---

## Quyên góp

import useBaseUrl from '@docusaurus/useBaseUrl';

Nếu bạn thích "Reply with Attachments" và muốn hỗ trợ việc phát triển của tiện ích, bạn có thể quyên góp tại đây:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Quyên góp qua Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>hoặc</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Quyên góp qua PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>hoặc</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Mua cho tôi một ly cà phê" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Quét để mua cho tôi một ly cà phê"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Cảm ơn bạn! Sự ủng hộ của bạn giúp duy trì khả năng tương thích với các bản phát hành Thunderbird mới, cải thiện khả năng truy cập và kiểm thử, và giữ tài liệu luôn được cập nhật.

Ghi chú

- Các liên kết quyên góp chỉ mở khi bạn nhấp vào; tiện ích bổ sung không thực hiện bất kỳ yêu cầu mạng nền nào.
- Việc ủng hộ định kỳ giúp bảo trì dài hạn và cập nhật kịp thời, nhưng hoàn toàn tùy chọn.

---

Nếu các nút hình ảnh không tải, vui lòng sử dụng các liên kết sau:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Quyên góp là tự nguyện; không có việc khóa tính năng.

---

## Khả năng hiển thị quyên góp (tạm ẩn 90 ngày)

Tiện ích bổ sung có một tính năng tiện lợi để ẩn lời nhắc quyên góp trong một thời gian sau khi bạn đã quyên góp.

- Tìm ở đâu
  - Tùy chọn → phần Hỗ trợ: bạn sẽ thấy nút “Tôi đã quyên góp” và một khu vực gợi ý nhỏ.
  - Hộp thoại xác nhận gửi cũng hiển thị nút Quyên góp; nó sẽ tự động ẩn khi chế độ tạm ẩn đang hoạt động.

- Cách hoạt động
  - Nhấp “Tôi đã quyên góp” sẽ ẩn các nút quyên góp và lời nhắc liên quan trong 90 ngày.
  - Một gợi ý trạng thái hiển thị “Ẩn đến YYYY‑MM‑DD” (theo ngày địa phương của bạn). Cũng có nút “Hiện Quyên góp lại” để khôi phục hiển thị ngay lập tức.
  - Sau 90 ngày, nút Quyên góp sẽ tự động hiện lại.

- Quyền riêng tư và lưu trữ
  - Tiện ích bổ sung lưu một dấu thời gian duy nhất trong bộ nhớ cục bộ của Thunderbird để ghi nhớ thời gian tạm ẩn. Khóa: `donateHideUntil` (mili giây kể từ epoch).
  - Thiết lập này là cục bộ cho hồ sơ Thunderbird của bạn (không đồng bộ đám mây). Tính năng này không thực hiện bất kỳ yêu cầu mạng nào.

- Khắc phục sự cố
  - Nếu Quyên góp vẫn hiện ngay sau khi nhấp “Tôi đã quyên góp”, hãy đợi một lúc hoặc mở lại trang Tùy chọn; giao diện sẽ cập nhật ngay khi thiết lập được lưu.
  - Để đặt lại thủ công, nhấp “Hiện Quyên góp lại”. Bạn cũng có thể đợi đến khi ngày được nêu trong gợi ý trôi qua.

Tính năng này chỉ nhằm mục đích tiện lợi; nó không bao giờ chặn chức năng của tiện ích bổ sung và không thu thập bất kỳ dữ liệu cá nhân nào.

---
