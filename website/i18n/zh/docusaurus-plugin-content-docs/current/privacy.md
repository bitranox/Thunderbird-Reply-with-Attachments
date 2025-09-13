---
id: privacy
title: '隐私'
sidebar_label: '隐私'
---

## Privacy

:::note 无遥测; 无后台网络
该附加组件**不**收集分析/遥测数据，也**不**进行后台网络请求。任何网络访问仅在您点击外部链接时发生（文档、GitHub、捐赠）。
:::

Reply with Attachments 不会收集分析或遥测数据，也不会将您的数据发送到任何地方。

该附加组件的功能：

- 从本地的原始消息中读取附件元数据和文件（Thunderbird API），以便将其附加到您的回复中。
- 将您的选项（黑名单、确认、默认答案）存储在 Thunderbird 的本地存储中。

该附加组件不执行的操作：

- 不进行跟踪、分析、崩溃报告或远程日志记录。
- 不进行后台网络请求，除非您明确打开外部链接（文档、GitHub、捐赠）。

权限文档在 [Permissions](permissions) 页面上。

---

## Content Security Policy (CSP) {#content-security-policy-csp}

选项和弹出页面避免使用内联脚本。所有 JavaScript 都是从与附加组件一起提供的文件中加载，以遵守 Thunderbird 中的严格 CSP。如果您在文档中嵌入代码片段，它们仅是示例，不会被附加组件执行。

---

## Data storage {#data-storage}

- 用户偏好设置（黑名单、确认切换、默认答案）存储在 Thunderbird 的 `storage.local` 中，供该附加组件使用。
- 附加组件不执行云同步。

---

## Network {#network}

- 该附加组件不执行后台网络活动。
- 任何网络访问仅在您点击链接（文档、GitHub、捐赠）或 Thunderbird 本身执行与该附加组件无关的正常操作时发生。

---

## Data removal {#data-removal}

- 卸载附加组件会删除其代码。
- 设置仅保存在 Thunderbird 的 `storage.local` 中，并在卸载时删除；不使用外部存储。
- 在不卸载的情况下重置设置：
  - 选项页面：使用“重置为默认”来清除黑名单和黑名单警告。
  - 高级：在 Thunderbird → 工具 → 开发者工具 → 调试附加组件中，打开扩展的存储并在需要时清除键。
