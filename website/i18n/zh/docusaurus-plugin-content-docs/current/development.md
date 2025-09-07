---
id: development
title: 开发
sidebar_label: 开发
---

## 开发指南

### 先决条件

- Node.js 18+ 与 npm
- Thunderbird 128 ESR 或更新（用于手动测试）

### 项目结构（高层）

- 根目录：打包脚本 `distribution_zip_packer.sh`、文档、截图
- `sources/`：附加组件主体代码（后台、选项/弹窗 UI、清单、图标）
- `tests/`：Vitest 测试套件
- `website/`：Docusaurus 文档（i18n 位于 `website/i18n/de/...`）

### 安装与工具

- 安装根依赖：`npm ci`
- 文档（可选）：`cd website && npm ci`
- 查看目标：`make help`

### 构建与打包

- 构建 ZIP：`make pack`
  - 在仓库根目录生成 ATN 与 LOCAL ZIP（请勿手动修改产物）
  - 提示：打包前在 `sources/manifest_ATN.json` 与 `sources/manifest_LOCAL.json` 同步更新版本号
- 手动安装（开发）：Thunderbird → 工具 → 附加组件和主题 → 齿轮 → 从文件安装附加组件… → 选择构建的 ZIP

### 测试

- 全量套件：`make test`（Vitest）
- 覆盖率（可选）：
  - `npm i -D @vitest/coverage-v8`
  - 运行 `make test`；在 `coverage/index.html` 打开 HTML 报告
- 仅 i18n：`make test-i18n`（一致性、占位符、标题）

### 调试与日志

- 错误控制台：工具 → 开发者工具 → 错误控制台
- 运行时切换详细日志：
  - 开启：`messenger.storage.local.set({ debug: true })`
  - 关闭：`messenger.storage.local.set({ debug: false })`
- 撰写/发送回复时会输出日志

### 文档（网站）

- 开发服务器：`cd website && npm run start`
- 构建静态站点：`cd website && npm run build`
- i18n：英文位于 `website/docs/*.md`；德文位于 `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- 搜索：CI 中若配置 Algolia DocSearch 环境变量（`DOCSEARCH_APP_ID`、`DOCSEARCH_API_KEY`、`DOCSEARCH_INDEX_NAME`），站点将使用 Algolia 搜索；否则回退到本地搜索。首页按 `/` 或 `Ctrl+K` 打开搜索框。

### 安全与配置提示

- 不要提交 `sources/manifest.json`（构建时临时生成）
- 保持 `browser_specific_settings.gecko.id` 稳定以保留更新通道

### 故障排查

- 确保 Thunderbird 为 128 ESR 或更新
- 运行期问题请使用错误控制台

### CI 与覆盖率

- GitHub Actions（`CI — Tests`）以覆盖率阈值（行/函数/分支/语句 85%）运行 vitest；未达阈值则作业失败。
- 工作流会上传包含 HTML 报告的 `coverage-html` 产物；可在运行页面下载（Actions → 最近一次运行 → Artifacts）。

### 参与贡献

- 分支/提交/PR 规范请参阅 CONTRIBUTING.md
