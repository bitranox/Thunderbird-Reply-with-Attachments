---
id: changelog
title: '更新日志'
---

---

## 更新日志

完整且详细的历史请参见仓库中的
[GitHub 上的 CHANGELOG.md](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md)。

- 2.4.0:不再仅因发件人添加了 `Content-ID` 就丢弃图片;"Include inline pictures" 选项已移除,因为 Thunderbird 自身会将内嵌图片保留在回复正文中;链接现在会在系统浏览器中打开;每封回复限制 50 个附件 / 100 MB,任何被省略的内容都会被报告。
- 2.3.2:"Include inline pictures" 会将图片以 base64 数据 URI 的形式嵌入回复正文(在 add-ons.thunderbird.net 审核后再次被移除;Thunderbird 本身就会这样做);代码质量改进和测试覆盖率扩展。
- 2.3.1: 当 Thunderbird 让后台事件页面闲置时仍能保留附件；添加了用于故障排查的定向调试钩子。
- 2.3.0: 优化了附件去重，扩大了测试覆盖范围，并移除了过时权限以满足 AMO 政策。
- 2.1.0: 为前 100 种语言提供完整的国际化支持
- 2.0.0: 重写为功能完整的版本（EN/DE）
- 1.0.1: 切换为使用 messages.listAttachments()
- 1.0.0: 初始发布

---

## 日期与渠道 {#dates-and-channels}

- 发布到 ATN 可能会在打包后滞后数小时。
- LOCAL 构建仅供开发者测试使用，不通过 ATN 分发。

---
