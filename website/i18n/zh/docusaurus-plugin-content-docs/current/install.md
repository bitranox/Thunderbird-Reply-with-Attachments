---
id: install
title: '安装'
slug: /install
sidebar_label: '安装'
---

---

## 通过“Thunderbird 附加组件和主题”进行安装 {#installation-in-thunderbird-recommended}

:::important 最低 Thunderbird 版本
此附加组件支持 Thunderbird **128 ESR 或更新版本**。不支持较旧版本。
:::

这是推荐的安装方式。通过 ATN（addons.thunderbird.net）安装的附加组件会自动更新。LOCAL/dev 安装不支持自动更新。

- 最低 Thunderbird 版本：128 ESR 或更新版本。

1. 在 Thunderbird 中，转到 **工具 > 附加组件和主题**。
2. 搜索 "reply with attachments"。
3. 添加该附加组件。

或直接打开该附加组件页面：[Thunderbird 附加组件（ATN）](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## 通过 XPI 手动安装 {#local-installation-in-thunderbird}

### 下载 XPI 文件 {#download-the-xpi-file}

1. 前往 [Thunderbird 附加组件页面](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)。
2. 将该附加组件的最新版本下载为 XPI 文件（`reply_with_attachments-x.y.z-tb.xpi`）。

### 在 Thunderbird 中安装 {#install-in-thunderbird-local}

1. 打开 Thunderbird。
2. 转到 **工具 > 附加组件和主题**。
3. 在 **附加组件管理器** 中，点击右上角的齿轮图标。
4. 在菜单中选择 **从文件安装附加组件…**。
5. 选择已下载的 `reply_with_attachments-x.y.z-tb.xpi` 文件。
6. 出现提示时确认安装。

---

## 用于开发的安装 {#installation-for-development}

### 下载代码仓库 {#download-the-repository}

1. 下载 GitHub 代码仓库的最新版本。
2. 运行 `make help` 以获取更多信息。

### 在 Thunderbird 中安装 {#install-in-thunderbird-dev}

1. 打开 Thunderbird。
2. 转到 **工具 > 附加组件和主题**。
3. 在 **附加组件管理器** 中，点击右上角的齿轮图标。
4. 在菜单中选择 **从文件安装附加组件…**。
5. 选择生成的文件 `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`。
6. 出现提示时确认安装。

注意：如果 Thunderbird 在你的系统上无法接受 `.zip`，请将其重命名为 `.xpi`，然后再次尝试“从文件安装附加组件…”。

### 在何处找到 LOCAL ZIP {#where-local-zip}

- 首先，打包该附加组件：在仓库根目录运行 `make pack`。
- 打包完成后，在仓库根目录找到“LOCAL” zip（例如 `2025-..-reply-with-attachments-plugin-LOCAL.zip`）。
- 在重新打包进行测试之前，请同时在 `sources/manifest_ATN.json` 和 `sources/manifest_LOCAL.json` 中提升版本号。

---

## 禁用、卸载与更新 {#disable-uninstall-updates}

- 禁用：Thunderbird → 工具 → 附加组件和主题 → 找到该附加组件 → 关闭开关。
- 卸载：同一界面 → 三点菜单 → 移除。
- 更新：通过 ATN 安装的会在新版本获批后自动更新。LOCAL/dev 安装不自动更新；需要手动重新安装新的 LOCAL 构建。
- 完全移除设置：参见 [隐私 → 数据移除](privacy#data-removal)。

另请参阅

- [快速开始](quickstart)
