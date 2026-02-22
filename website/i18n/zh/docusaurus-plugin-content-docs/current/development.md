---
id: development
title: '开发'
sidebar_label: '开发'
---

---

## 开发指南 {#development-guide}

:::note 仅编辑英文；翻译将自动传播
仅在 `website/docs`（英文）下更新文档。`website/i18n/<locale>/…` 下的翻译是生成的，不应手动编辑。使用翻译任务（例如 `make translate_web_docs_batch`）来刷新本地化内容。
:::

### 先决条件 {#prerequisites}

- Node.js 22+ 和 npm（已用 Node 22 测试）
- Thunderbird 128 ESR 或更新版本（用于手动测试）

---

### 项目结构（高层概览） {#project-layout-high-level}

- 根目录：打包脚本 `distribution_zip_packer.sh`、文档、截图
- `sources/`：主要附加组件代码（后台、选项/弹窗 UI、清单、图标）
- `tests/`：Vitest 测试套件
- `website/`：Docusaurus 文档（i18n 位于 `website/i18n/de/...` 下）

---

### 安装与工具链 {#install-and-tooling}

- 安装根依赖：`npm ci`
- 文档（可选）：`cd website && npm ci`
- 查看可用目标：`make help`

---

### 实时开发（web‑ext run） {#live-dev-web-ext}

- 在 Firefox 桌面版中快速循环（仅 UI 冒烟测试）：
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- 在 Thunderbird 中运行（MailExtensions 首选）：
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- 提示：
- 保持 Thunderbird 的错误控制台打开（工具 → 开发者工具 → 错误控制台）。
- MV3 事件页空闲时会挂起；代码变更后请重新加载附加组件，或让 web‑ext 自动重载。
- 某些仅在 Firefox 中的行为有所差异；务必在 Thunderbird 中验证 API 一致性。
- Thunderbird 可执行文件路径（示例）：
- Linux：`thunderbird`（例如 `/usr/bin/thunderbird`）
- macOS：`/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows：`"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- 配置隔离：为开发使用单独的 Thunderbird 配置文件，避免影响日常环境。

---

### Make 目标（按字母序） {#make-targets-alphabetical}

Makefile 规范了常见开发流程。随时运行 `make help` 获取所有目标的一行摘要。

提示：不带目标运行 `make` 会打开一个简单的 Whiptail 菜单以选择目标。

| 目标                                                     | 单行描述                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | 删除本地构建/预览产物（tmp/、web-local-preview/、website/build/）。             |
| [`commit`](#mt-commit)                                   | 格式化、运行测试（含 i18n）、更新变更日志、提交并推送。                         |
| [`eslint`](#mt-eslint)                                   | 通过扁平配置运行 ESLint（`npm run -s lint:eslint`）。                           |
| [`help`](#mt-help)                                       | 列出所有目标及其单行说明（已排序）。                                            |
| [`lint`](#mt-lint)                                       | 在 `sources/` 上进行 web‑ext lint（临时清单；忽略 ZIP；非致命）。               |
| [`menu`](#mt-menu)                                       | 交互式菜单，可选择目标和可选参数。                                              |
| [`pack`](#mt-pack)                                       | 构建 ATN 和 LOCAL ZIP（会运行 linter；调用打包脚本）。                          |
| [`prettier`](#mt-prettier)                               | 就地格式化仓库（会写入变更）。                                                  |
| [`prettier_check`](#mt-prettier_check)                   | 以检查模式运行 Prettier（不写入）；若需重新格式化则失败。                       |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` 的别名。                                                             |
| [`test`](#mt-test)                                       | Prettier（写入）、ESLint，然后 Vitest（若已配置覆盖率）。                       |
| [`test_i18n`](#mt-test_i18n)                             | 仅 i18n 的测试：附加组件占位符/一致性 + 网站一致性。                            |
| [`translate_app`](#mt-translation-app)                   | `translation_app` 的别名。                                                      |
| [`translation_app`](#mt-translation-app)                 | 从 `sources/_locales/en/messages.json` 翻译应用 UI 字符串。                     |
| [`translate_web_docs_batch`](#mt-translation-web)        | 通过 OpenAI 批处理 API 翻译网站文档（推荐）。                                   |
| [`translate_web_docs_sync`](#mt-translation-web)         | 同步翻译网站文档（传统，非批处理）。                                            |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` 的别名。                                                |
| [`translation_web_index`](#mt-translation_web_index)     | 翻译首页/导航栏/页脚 UI（`website/i18n/en/code.json → .../<lang>/code.json`）。 |
| [`web_build`](#mt-web_build)                             | 将文档构建到 `website/build`（支持 `--locales` / `BUILD_LOCALES`）。            |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | 离线安全的链接检查（跳过远程 HTTP[S]）。                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | 本地 gh‑pages 预览；自动在 8080–8090 提供服务；可选测试/链接检查。              |
| [`web_push_github`](#mt-web_push_github)                 | 将 `website/build` 推送到 `gh-pages` 分支。                                     |

选项语法

- 使用 `make <command> OPTS="…"` 传递选项（建议加引号）。下方每个目标都给出示例用法。

--

-

#### 语言环境构建提示 {#locale-build-tips}

- 构建部分语言：设置 `BUILD_LOCALES="en de"`，或向 Web 目标传入 `OPTS="--locales en,de"`。
- 预览特定语言：`http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`。

---

### 构建与打包 {#build-and-package}

- 构建 ZIP：`make pack`
- 在仓库根目录生成 ATN 和 LOCAL ZIP（请勿手动修改产物）
- 提示：打包前请同时在 `sources/manifest_ATN.json` 和 `sources/manifest_LOCAL.json` 中更新版本
- 手动安装（开发）：Thunderbird → 工具 → 附加组件和主题 → 齿轮 → 从文件安装附加组件… → 选择构建出的 ZIP

---

### 测试 {#test}

- 全量测试：`make test`（Vitest）
- 覆盖率（可选）：
- `npm i -D @vitest/coverage-v8`
- 运行 `make test`；打开 `coverage/index.html` 查看 HTML 报告
- 仅 i18n：`make test_i18n`（UI 键/占位符/标题 + 网站逐语言逐文档一致性，含 id/title/sidebar_label 检查）

---

### 调试与日志 {#debugging-and-logs}

- 错误控制台：工具 → 开发者工具 → 错误控制台
- 运行时切换详细日志：
- 启用：`messenger.storage.local.set({ debug: true })`
- 禁用：`messenger.storage.local.set({ debug: false })`
- 日志会在撰写/发送回复时出现

---

### 文档（网站） {#docs-website}

- 开发服务器：`cd website && npm run start`
- 构建静态站点：`cd website && npm run build`
- 对应的 Make 目标（按字母序）：`make web_build`、`make web_build_linkcheck`、`make web_build_local_preview`、`make web_push_github`
- 使用示例：
- 仅 EN，跳过测试/链接检查，不推送：`make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- 所有语言，包含测试/链接检查，然后推送：`make web_build_local_preview && make web_push_github`
- 发布前，请运行离线安全的链接检查：`make web_build_linkcheck`。
- i18n：英文位于 `website/docs/*.md`；德语翻译位于 `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- 搜索：如果在 CI 中设置了 Algolia DocSearch 环境变量（`DOCSEARCH_APP_ID`、`DOCSEARCH_API_KEY`、`DOCSEARCH_INDEX_NAME`），站点将使用 Algolia 搜索；否则回退到本地搜索。在首页按下 `/` 或 `Ctrl+K` 打开搜索框。

---

#### 捐赠重定向 {#donate-redirect}

- `website/src/pages/donate.js`
- 路由：`/donate`（以及 `/<locale>/donate`）
- 行为：
- 如果当前路由包含语言（例如 `/de/donate`），则使用该语言
- 否则在 `navigator.languages` 与已配置语言中选择最佳匹配；否则回退到默认语言
- 重定向至：
- `en` → `/docs/donation`
- 其他 → `/<locale>/docs/donation`
- 使用 `useBaseUrl` 正确处理 baseUrl
- 包含 meta refresh + `noscript` 链接作为后备

---

---

#### 预览提示 {#preview-tips}

- 干净地停止 Node 预览：打开 `http://localhost:<port>/__stop`（在 `Local server started` 之后打印）。
- 若 MDX/JSX 中的图片未加载，请使用 `useBaseUrl('/img/...')` 以遵循站点的 `baseUrl`。
- 预览会先启动；随后执行链接检查，且为非阻塞（损坏的外部链接不会阻止预览）。
- 预览示例 URL：`http://localhost:<port>/Thunderbird-Reply-with-Attachments/`（在“Local server started”之后打印）。
- 链接检查中的外部链接：某些外部站点（如 addons.thunderbird.net）会阻止自动爬虫，链接检查可能显示 403。预览仍会启动；这些可以安全忽略。

---

#### 翻译网站 {#translate-website}

你可以翻译的内容

- 仅网站 UI：主页、导航栏、页脚及其他 UI 字符串。文档内容目前仅保留英文。

在哪里编辑

- 编辑 `website/i18n/<locale>/code.json`（参考 `en`）。保持 `{year}`、`{slash}`、`{ctrl}`、`{k}`、`{code1}` 等占位符不变。

生成或刷新文件

- 为所有语言创建缺失的存根：`npm --prefix website run i18n:stubs`
- 从英文覆盖存根（在添加新字符串之后）：`npm --prefix website run i18n:stubs:force`
- 针对单一语言的替代方案：`npx --prefix website docusaurus write-translations --locale <locale>`

翻译主页/导航栏/页脚的 UI 字符串（OpenAI）

- 一次性设置凭据（shell 或 .env）：
- `export OPENAI_API_KEY=sk-...`
- 可选：`export OPENAI_MODEL=gpt-4o-mini`
- 一次性（所有语言，跳过 en）：`make translate_web_index`
- 限定到特定语言：`make translate_web_index OPTS="--locales de,fr"`
- 执行覆盖已有值：`make translate_web_index OPTS="--force"`

校验与重试

- 翻译脚本会校验 JSON 结构，保留花括号占位符，并确保 URL 不被改变。
- 若校验失败，会带反馈重试最多 2 次，然后保留现有值。

预览你的语言

- 开发服务器：`npm --prefix website run start`
- 访问 `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

提交

- 将编辑过的 `code.json` 文件提交为 PR。请聚焦改动，并尽可能附上一张快速截图。

---

### 安全与配置提示 {#security-and-configuration-tips}

- 不要提交 `sources/manifest.json`（由构建临时创建）
- 保持 `browser_specific_settings.gecko.id` 稳定以保留更新通道

---

### 设置持久化 {#settings-persistence}

- 存储：所有用户设置位于 `storage.local`，在附加组件更新之间保持持久。
- 安装：仅当键严格缺失（undefined）时才应用默认值。
- 更新：迁移仅填充缺失的键；绝不会覆盖现有值。
- 架构标记：`settingsVersion`（当前为 `1`）。
- 键与默认值：
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- 代码：参见 `sources/background.js` → `initializeOrMigrateSettings()` 与 `SCHEMA_VERSION`。

开发流程（添加新设置）

- 在 `sources/background.js` 中提升 `SCHEMA_VERSION`。
- 在 `initializeOrMigrateSettings()` 的 `DEFAULTS` 对象中添加新键及默认值。
- 设定默认值时遵循“仅当 undefined 才设定”的规则；不要覆盖现有值。
- 若设置对用户可见，请在 `sources/options.js` 中接入并添加本地化字符串。
- 添加/调整测试（见 `tests/background.settings.migration.test.js`）。

手动测试提示

- 模拟全新安装：清理扩展的数据目录，或使用新配置文件启动。
- 模拟更新：在 `storage.local` 中将 `settingsVersion` 设为 `0` 并重新加载；确认现有值保持不变，且仅添加缺失键。

---

### 故障排除 {#troubleshooting}

- 确保 Thunderbird 为 128 ESR 或更高版本
- 运行时问题请使用错误控制台
- 如果存储的设置似乎未正确生效，请重启 Thunderbird 后重试。（Thunderbird 可能在会话之间缓存状态；重启可确保加载最新设置。）

---

### CI 与覆盖率 {#ci-and-coverage}

- GitHub Actions（`CI — Tests`）以覆盖率阈值（行/函数/分支/语句 85%）运行 vitest。未达阈值则任务失败。
- 工作流会上传包含 HTML 报告的制品 `coverage-html`；可在运行页面下载（Actions → 最新运行 → Artifacts）。

---

### 参与贡献 {#contributing}

- 参见 CONTRIBUTING.md 了解分支/提交/PR 指南
- 提示：为测试创建单独的 Thunderbird 开发配置文件，避免影响日常配置。

---

### 翻译

- 运行大规模“全部 → 全部”的翻译作业可能既慢又昂贵。先从子集开始（如少量文档和 1–2 种语言），审阅结果后再扩大范围。

---

- 重试策略：翻译作业在 API 错误时最多重试 3 次，并采用指数退避；参见 `scripts/translate_web_docs_batch.js` 和 `scripts/translate_web_docs_sync.js`。

文档截图

- 将图片存放在 `website/static/img/` 下。
- 在 MD/MDX 中通过 `useBaseUrl('/img/<filename>')` 引用它们，使路径与站点的 `baseUrl` 协同工作。
- 在 `website/static/img/` 下添加或重命名图片后，确认所有引用仍使用 `useBaseUrl('/img/…')`，并能在本地预览中渲染。
  站点图标

- 多尺寸的 `favicon.ico` 会通过 `website/scripts/build-favicon.mjs` 在所有构建路径（Make + 脚本）中自动生成。
- 无需手动步骤；更新 `icon-*.png` 即可。
  评审提示

- 在翻译后的文档中保持 front‑matter 的 `id` 不变；如有，仅翻译 `title` 和 `sidebar_label`。

#### clean {#mt-clean}

- 目的：删除本地构建/预览产物。
- 用法：`make clean`
- 删除（若存在）：
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- 目的：格式化、测试、更新变更日志、提交并推送。
- 用法：`make commit`
- 详情：运行 Prettier（写入）、`make test`、`make test_i18n`；当存在已暂存差异时追加变更日志；推送到 `origin/<branch>`。

---

#### eslint {#mt-eslint}

- 目的：通过扁平配置运行 ESLint。
- 用法：`make eslint`

---

#### help {#mt-help}

- 目的：列出所有目标及其单行说明。
- 用法：`make help`

---

#### lint {#mt-lint}

- 目的：使用 `web-ext` 对 MailExtension 进行 lint。
- 用法：`make lint`
- 备注：临时拷贝 `sources/manifest_LOCAL.json` → `sources/manifest.json`；忽略已构建的 ZIP；警告不会导致流水线失败。

---

#### menu {#mt-menu}

- 目的：交互式菜单以选择 Make 目标和可选参数。
- 用法：不带参数运行 `make`。
- 备注：若 `whiptail` 不可用，菜单将回退到 `make help`。

---

#### pack {#mt-pack}

- 目的：构建 ATN 和 LOCAL ZIP（依赖 `lint`）。
- 用法：`make pack`
- 提示：打包前同时在 `sources/manifest_*.json` 中提升版本。

---

#### prettier {#mt-prettier}

- 目的：就地格式化仓库。
- 用法：`make prettier`

#### prettier_check {#mt-prettier_check}

- 目的：验证格式（不写入）。
- 用法：`make prettier_check`

#### prettier_write {#mt-prettier_write}

- 目的：`prettier` 的别名。
- 用法：`make prettier_write`

---

#### test {#mt-test}

- 目的：运行 Prettier（写入）、ESLint，然后 Vitest（若已安装覆盖率）。
- 用法：`make test`

#### test_i18n {#mt-test_i18n}

- 目的：面向 i18n 的附加组件字符串与网站文档测试。
- 用法：`make test_i18n`
- 运行：`npm run test:i18n` 和 `npm run -s test:website-i18n`。

---

#### translate_app / translation_app {#mt-translation-app}

- 目的：将附加组件 UI 字符串从 EN 翻译到其他语言。
- 用法：`make translation_app OPTS="--locales all|de,fr"`
- 备注：保留键结构和占位符；日志写入 `translation_app.log`。脚本形式：`node scripts/translate_app.js --locales …`。

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- 目的：将网站文档从 `website/docs/*.md` 翻译为 `website/i18n/<locale>/...`。
- 首选：`translate_web_docs_batch`（OpenAI 批处理 API）
  - 用法（标志）：`make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - 仍接受传统位置参数：`OPTS="<doc|all> <lang|all>"`
- 行为：构建 JSONL，上传，每 30 秒轮询，下载结果并写入文件。
- 注意：批处理作业可能需要最长 24 小时完成（受 OpenAI 批处理时间窗限制）。控制台会在每次轮询时显示已用时。
- 环境变量：`OPENAI_API_KEY`（必需），可选 `OPENAI_MODEL`、`OPENAI_TEMPERATURE`、`OPENAI_BATCH_WINDOW`（默认 24h）、`BATCH_POLL_INTERVAL_MS`。
- 传统：`translate_web_docs_sync`
  - 用法（标志）：`make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - 仍接受传统位置参数：`OPTS="<doc|all> <lang|all>"`
- 行为：逐对同步请求（无批量聚合）。
- 备注：省略 `OPTS` 时会交互式提示。两种模式都会保留代码块/行内代码，并保持 front‑matter 的 `id` 不变；日志写入 `translation_web_batch.log`（批处理）或 `translation_web_sync.log`（同步）。

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- 目的：将网站 UI 字符串（主页、导航栏、页脚）从 `website/i18n/en/code.json` 翻译到 `website/i18n/<locale>/code.json` 下的所有语言（不含 `en`）。
- 用法：`make translate_web_index` 或 `make translate_web_index OPTS="--locales de,fr [--force]"`
- 要求：导出 `OPENAI_API_KEY`（可选：`OPENAI_MODEL=gpt-4o-mini`）。
- 行为：校验 JSON 结构，保留花括号占位符，保持 URL 不变；在校验错误时带反馈重试。

---

#### web_build {#mt-web_build}

- 目的：将文档站点构建到 `website/build`。
- 用法：`make web_build OPTS="--locales en|de,en|all"`（或设置 `BUILD_LOCALES="en de"`）
- 内部：`node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`。
- 依赖：仅当缺少 `website/node_modules/@docusaurus` 时，才在 `website/` 中运行 `npm ci`。

#### web_build_linkcheck {#mt-web_build_linkcheck}

- 目的：离线安全的链接检查。
- 用法：`make web_build_linkcheck OPTS="--locales en|all"`
- 备注：构建到 `tmp_linkcheck_web_pages`；将 GH Pages 的 `baseUrl` 重写为 `/`；跳过远程 HTTP(S) 链接。

#### web_build_local_preview {#mt-web_build_local_preview}

- 目的：本地 gh‑pages 预览，支持可选的测试/链接检查。
- 用法：`make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- 行为：优先尝试 Node 预览服务器（`scripts/preview-server.mjs`，支持 `/__stop`），回退到 `python3 -m http.server`；服务于 8080–8090 端口；PID 位于 `web-local-preview/.server.pid`。

#### web_push_github {#mt-web_push_github}

- 目的：将 `website/build` 推送到 `gh-pages` 分支。
- 用法：`make web_push_github`

提示：设置 `NPM=…` 以覆盖 Makefile 使用的包管理器（默认为 `npm`）。

---
