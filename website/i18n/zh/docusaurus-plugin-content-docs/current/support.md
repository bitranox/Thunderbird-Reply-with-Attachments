---
id: support
title: '支持'
sidebar_label: '支持'
---

## FAQ {#faq}

### 附件未添加 — 为什么？

- 内嵌图片和 S/MIME 部分被故意排除。
- 如果编写的邮件中已经有相同的文件，则跳过重复的文件名。
- 黑名单模式可能会过滤候选项；请参见 [Configuration](configuration#blacklist-glob-patterns)。

### 我可以在添加附件之前确认吗？

可以。请在 [Configuration → Confirmation](configuration#confirmation) 中启用“在添加附件之前询问”。键盘：Y/J = 是，N/Esc = 否。

### 插件是否发送任何数据或跟踪使用情况？

不。请参见 [Privacy](privacy) — 没有遥测，也没有后台网络请求。

### 转发未添加附件 — 这是预期的吗？

是的。只有回复和全部回复受到该插件的修改；转发保持不变。请参见 [Limitations](usage#limitations)。

### 赠款延迟在哪里？

选项 → 支持部分。请参见 [Donation Visibility](configuration#donation-visibility)。

---

## 支持

需要帮助或想要报告一个错误吗？

---

### 在 GitHub 上打开一个问题：

- 仓库：`bitranox/Thunderbird-Reply-with-Attachments`
- 问题： https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- 包含 Thunderbird 版本（例如，128 ESR）、操作系统和重现步骤
- 附上 Thunderbird 错误控制台中的相关日志（工具 → 开发者工具 → 错误控制台）

- 插件网站（ATN）：您也可以通过 [插件页面](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) 留下反馈。

---

### 提示

- 确保您使用的是受支持的 Thunderbird 版本（128 ESR 或更新）。
- 检查配置和使用文档以获取常见设置问题的解答。
- 对于开发/测试，请参见开发指南。
- 如果存储的设置似乎未正确应用，请重新启动 Thunderbird 并重试。（Thunderbird 可能会跨会话缓存状态；重启确保加载新设置。）
- 最小重现：尝试使用包含一或两个简单文件附件的小测试邮件。
- 比较在确认开启与关闭时的行为，以缩小是否涉及对话框流程。

---

### 报告中应包括的内容

- Thunderbird 版本和操作系统
- 精确的重现步骤（您做了什么，您期待什么，实际发生了什么）
- 是否启用了确认及您的默认回答设置
- 您的黑名单模式示例（如相关）
- 重现时的错误控制台日志（工具 → 开发者工具 → 错误控制台）
- 启用调试日志（可选）：
  - 在 Thunderbird 的错误控制台中运行： `messenger.storage.local.set({ debug: true })`
  - 重现问题并复制相关的 `[RWA]` 日志行

---

### 问题模板（复制/粘贴） {#issue-template}

- Thunderbird 版本和操作系统：
- 重现步骤：
- 启用确认？默认答案：
- 示例黑名单模式：
- 错误控制台日志（工具 → 开发者工具 → 错误控制台）：
- 其他相关内容：

---

### 捐赠

如果您想支持该项目，请考虑在 [Donate](donation) 页面上进行小额捐赠。谢谢！
