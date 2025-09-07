---
id: glossary
title: i18n 术语表
sidebar_label: 术语表
---

在附加组件 UI 与文档中使用的规范术语。请根据这些术语在各语言中保持一致的翻译。

## 说明

- UI 文案尽量简短、以动作为导向。
- 设置用名词，操作用动词。
- 除标题外，采用句首字母大写（Sentence case）。

## 术语

- 附件（Attachments）：随邮件一起包含的文件。避免使用 “enclosures”。
- 黑名单（Blacklist / 排除列表）：阻止文件被自动附加的匹配模式列表。
- 在 UI 文案中，优先使用 “Blacklist (glob patterns)” 以与设置页一致。
- 仅匹配文件名，不匹配路径，应明确说明。
- 确认（Confirm / Confirmation）：在添加附件前询问用户是否继续。
- 回答（Answers）：“Yes”（添加）、“No”（取消）。按钮标签保持简短。
- 内联图片（Inline image）：在邮件 HTML 中通过 CID 引用的图片；从不作为文件添加。
- S/MIME 签名：`smime.p7s` 或 PKCS7 签名部件；从不添加。
- 选项 / 设置（Options / Settings）：Thunderbird 中附加组件的配置页面。
- 默认答案（Default answer）：确认对话框的预选答案。

## 样式

- 文件名：以代码（等宽）形式展示，例如 `smime.p7s`、`*.png`。
- 按键/按钮：只有专有名词使用标题式；否则使用句式大小写。
- 避免术语化表述（如 “idempotency”）；优先使用 “防止重复”。
