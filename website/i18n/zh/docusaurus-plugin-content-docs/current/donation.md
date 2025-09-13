---
id: donation
title: '捐赠'
sidebar_label: '捐赠'
---

## 捐赠

import useBaseUrl from '@docusaurus/useBaseUrl';

如果您喜欢“带附件回复”并希望支持它的开发，可以在这里捐赠：

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="通过 Stripe 捐赠" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>或</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="通过 PayPal 捐赠" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>或</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="请我喝咖啡" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="扫描买我一杯咖啡"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

谢谢！您的支持有助于维护与新 Thunderbird 版本的兼容性，改善可访问性和测试，并保持文档的最新状态。

注意事项

- 捐赠链接仅在您点击时打开；该附加组件不会执行任何后台网络请求。
- 定期支持有助于长期维护和及时更新，但完全是可选的。

---

如果图像按钮无法加载，请使用以下链接：

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [请我喝咖啡](https://buymeacoffee.com/bitranox)

---

捐赠是自愿的；没有功能限制。

---

## 捐赠可见性（90 天延迟）

该附加组件包含一个便利功能，可以在您捐赠后暂时隐藏捐赠提示。

- 在哪里找到它
  - 选项 → 支持部分：您会看到一个“我捐赠了”按钮和一个小提示区域。
  - 发送确认对话框中也显示一个捐赠按钮；当延迟激活时，它会自动隐藏。

- 它如何工作
  - 点击“我捐赠了”会隐藏捐赠按钮和相关提示 90 天。
  - 状态提示显示“隐藏直到 YYYY‑MM‑DD”（以您所在的本地日期为准）。还有一个“再次显示捐赠”按钮，可立即恢复可见性。
  - 90 天后，捐赠按钮会自动再次变为可见。

- 隐私和存储
  - 该附加组件在 Thunderbird 的本地存储中存储一个时间戳，以记住延迟周期。密钥：`donateHideUntil`（纪元毫秒）。
  - 此设置是您 Thunderbird 配置文件的本地设置（未云以同步）。该功能不会发出任何网络请求。

- 故障排除
  - 如果在点击“我捐赠了”后仍然显示捐赠按钮，请稍候或重新打开选项页面；用户界面在设置保存后会立即更新。
  - 要手动重置，请点击“再次显示捐赠”。您也可以等待直到提示中列出的日期过去。

此功能纯粹是为了便利；它从不阻塞附加组件功能，也不收集任何个人数据。

---
