---
id: compatibility
title: '兼容性'
sidebar_label: '兼容性'
---

---

## 兼容性 {#compatibility}

:::important 最低 Thunderbird 版本
此附加组件支持 Thunderbird **128 ESR 或更新版本**。不支持更早的版本。
:::

- 支持 Thunderbird 128 ESR 或更新版本（128.x+）。
- 不支持较旧的 Thunderbird 版本。
- 已在 Windows、macOS 和 Linux 上测试。

:::warning 不支持 Manifest V2
不支持 Manifest V2。该附加组件面向 Thunderbird 128 ESR+ 上的 **Manifest V3 (MV3)**。
:::

---

## 故障排除 {#troubleshooting}

- 如果附加组件未按预期工作，请确认你使用的是兼容的 Thunderbird 版本（128 ESR 或更高）。
- 在 Thunderbird 错误控制台（**Tools > Developer Tools > Error Console**）中检查与该附加组件相关的问题。
- 如果已保存的设置似乎未正确生效，请重启 Thunderbird 后重试。（Thunderbird 可能会在会话之间缓存状态；重启可确保加载全新的设置。）

---

## 已知冲突 {#known-conflicts}

- 目前暂无已知冲突。若你在与其他附加组件一起使用时看到重复的附件或失败，请提交包含复现步骤的报告。

---

## 测试版/夜间版 {#beta-nightly}

- 通常支持 Thunderbird Beta 和 Daily（Nightly）构建，但上游变更偶尔可能破坏附加组件行为。若遇到问题，请提交报告并包含准确的 Thunderbird 版本（例如，“Daily 131.0a1 2025‑09‑10”）。
- 在 Beta/Nightly 上遇到回归了吗？请按重现步骤提交报告 — 参见 [支持](support) — 并包含确切的 Thunderbird 构建字符串。

---
