---
id: donation
title: '捐赠'
sidebar_label: '捐赠'
---

---

## 捐赠

import useBaseUrl from '@docusaurus/useBaseUrl';

如果你喜欢 "Reply with Attachments" 并希望支持其开发，可以在此捐赠：

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
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="请我喝杯咖啡" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="扫码请我喝杯咖啡"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

谢谢！你的支持有助于维护与新版 Thunderbird 的兼容性、改进无障碍与测试，并保持文档的及时更新。

说明

- 只有在你点击时才会打开捐赠链接；该附加组件不会在后台发起任何网络请求。
- 循环支持有助于长期维护和及时更新，但完全可选。

---

如果图像按钮未加载，请改用以下链接：

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

捐赠是自愿的；不存在以功能为门槛的限制。

---

## 捐赠可见性（90 天暂隐）

该附加组件包含一项便捷功能：在你捐赠后，可将捐赠提示暂时隐藏一段时间。

- 在哪里找到
  - 选项 → 支持部分：你会看到一个“我已捐赠”按钮和一个小的提示区域。
  - “发送确认”对话框也会显示一个“捐赠”按钮；当暂隐激活时会自动隐藏。

- 工作原理
  - 点击“我已捐赠”后，捐赠按钮及相关提示会隐藏 90 天。
  - 状态提示会显示“Hidden until YYYY‑MM‑DD”（使用你的本地日期）。还有一个“Show Donate again”按钮，可立即恢复可见性。
  - 90 天后，捐赠按钮会再次自动显示。

- 隐私与存储
  - 该附加组件在 Thunderbird 的本地存储中保存单个时间戳，以记录暂隐期限。Key: `donateHideUntil` (epoch milliseconds).
  - 此设置仅保存在你的 Thunderbird 配置文件中（不会云端同步）。该功能不会发起任何网络请求。

- 故障排除
  - 如果在点击“我已捐赠”后仍然看到捐赠提示，请稍等片刻或重新打开“选项”页面；设置保存后，界面会立即更新。
  - 要手动重置，请点击“Show Donate again”。你也可以等待提示中列出的日期过去。

此功能仅为方便起见；它从不阻止附加组件的功能，也不会收集任何个人数据。

---
