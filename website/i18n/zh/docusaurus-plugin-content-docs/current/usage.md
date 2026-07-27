---
id: usage
title: '用法'
sidebar_label: '用法'
---

---

## 用法 {#usage}

- 回复时，附加组件会自动添加原始附件；或者（如果在“选项”中启用了提示）会先询问。
- 按文件名去除重复项；S/MIME 部分始终会被跳过。原始邮件正文中嵌入的图片会保留在回复正文中(Thunderbird 放置它们的位置),不会作为文件被复制。
- 已列入黑名单的附件也会被跳过（对文件名的大小写不敏感的 glob 模式，仅匹配文件名而非路径）。参见[配置](configuration#blacklist-glob-patterns)。

---

### 回复时会发生什么 {#what-happens}

- 检测回复 → 列出原始附件 → 跳过 S/MIME 和内嵌图片 → 可选确认 → 添加符合条件的文件(跳过重复项)。

| 部件类型                                   | 是否复制到回复中 |
|----------------------------------------|---------:|
| S/MIME 签名文件 `smime.p7s`                | 否        |
| S/MIME MIME 类型 (`application/pkcs7-*`) | 否        |
| 邮件正文通过 `cid:` 嵌入的图片                    | 否(已在正文中) |
| 标记为 `Content-Disposition: inline` 的图片  | 否(已在正文中) |
| 带有 `Content-ID` 但正文从未引用的图片             | 是        |
| 带文件名的附件邮件 (`message/rfc822`)           | 是        |
| 带文件名的普通文件附件                            | 是        |

只有当原始邮件确实引用了某张图片,或发件人明确将其标记为 `Content-Disposition: inline` 时,
该图片才算作嵌入图片。仅凭 `Content-ID` 头是不够的:有些邮件客户端会给每个图片部件都加上它,
包括真正的附件,这些附件仍然必须被复制。

---

### 交叉引用 {#cross-reference}

- 按设计，转发不会被修改（见下方“限制”）。
- 关于附件可能未被添加的原因，参见“为什么可能不会添加附件”。

---

## 行为详情 {#behavior-details}

- 复制品防护：附加组件通过每个标签页的会话值和内存保护标记撰写标签页为已处理。不会重复添加原始附件。
- 关闭并重新打开撰写窗口被视为新标签页（即允许新的尝试）。
- 尊重现有附件：如果撰写窗口中已包含一些附件，仍会恰好添加一次原始附件，并跳过已存在的文件名。
- 排除项：S/MIME 产物与内联图片会从文件附件中排除。若首次遍历无符合项，将进行宽松的回退遍历以重新检查非 S/MIME 部分。内联图片单独处理：在启用时，它们会作为数据 URI 还原到回复正文中。
  - 文件名：`smime.p7s`
  - MIME 类型：`application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - 内联图片：任何由 Content‑ID 引用的 `image/*` 部分——从文件附件中排除，但当 "Include inline pictures" 处于 ON 时，会嵌入到回复正文中
  - 已附加邮件（`message/rfc822`）：如果具有文件名，则按常规附件处理；可能会被添加（受重复检查和黑名单影响）。
- 黑名单警告（若启用）：当候选项被您的黑名单排除时，附加组件会显示一个小的模态对话框，列出受影响的文件及匹配的模式。在所有内容都被排除、因此不会添加任何附件的情况下，也会显示此警告。

---

## 键盘快捷键 {#keyboard-shortcuts}

- 确认对话框：Y/J = Yes，N/Esc = No；Tab/Shift+Tab 与方向键循环切换焦点。
  - [配置](configuration#confirmation)中的“Default answer”设置初始聚焦的按钮。
  - Enter 触发当前聚焦的按钮。为辅助功能，Tab/Shift+Tab 与方向键可移动焦点。

### 键盘速查表 {#keyboard-cheat-sheet}

| 按键              | 操作               |
|-----------------|------------------|
| Y / J           | 确认是（Yes）         |
| N / Esc         | 确认否（No）          |
| Enter           | 激活当前聚焦的按钮        |
| Tab / Shift+Tab | 向前/向后移动焦点        |
| 方向键             | 在按钮之间移动焦点        |
| Default answer  | 设置初始焦点（Yes 或 No） |

---

## 限制 {#limitations}

- 本附加组件不会修改“转发”（支持“回复”和“全部回复”）。
- 非常大的附件可能受 Thunderbird 或服务提供商的限制。
  - 附加组件不会对文件分块或压缩；它依赖 Thunderbird 的常规附件处理。
- 加密邮件：会有意排除 S/MIME 部分。

---

## 为什么可能不会添加附件 {#why-attachments-might-not-be-added}

- 原始邮件中内嵌的图片不会作为文件被复制。它们已经存在于回复正文中,也就是 Thunderbird 放置它们的位置。参见 [Configuration](configuration#include-inline-pictures)。
- 按设计会排除 S/MIME 签名部分：诸如 `smime.p7s` 之类的文件名，以及 `application/pkcs7-signature` 或 `application/pkcs7-mime` 等 MIME 类型都会被跳过。
- 黑名单模式可以过滤候选项：参见[配置](configuration#blacklist-glob-patterns)；匹配对大小写不敏感，且仅基于文件名。
- 重复的文件名不会被重新添加：如果撰写窗口中已包含同一规范化名称的文件，则会被跳过。
- 非文件部分或缺少文件名：仅会考虑具有可用文件名的类文件部分。

---

另请参阅

- [配置](configuration)
