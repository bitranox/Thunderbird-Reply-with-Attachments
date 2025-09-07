---
id: development
title: 開発
sidebar_label: 開発
---

## 開発ガイド

### 必要条件

- Node.js 18+ と npm
- Thunderbird 128 ESR 以降（手動テスト用）

### プロジェクト構成（概要）

- ルート：パッケージングスクリプト `distribution_zip_packer.sh`、ドキュメント、スクリーンショット
- `sources/`：アドオン本体（バックグラウンド、オプション／ポップアップ UI、マニフェスト、アイコン）
- `tests/`：Vitest スイート
- `website/`：Docusaurus ドキュメント（i18n は `website/i18n/de/...`）

### インストールとツール

- ルート依存関係のインストール：`npm ci`
- ドキュメント（任意）：`cd website && npm ci`
- ターゲットの確認：`make help`

### ビルドとパッケージ

- ZIP の作成：`make pack`
  - リポジトリ直下に ATN / LOCAL の ZIP を生成（成果物を手で編集しない）
  - ヒント：パッケージ前に `sources/manifest_ATN.json` と `sources/manifest_LOCAL.json` のバージョンを更新
- 手動インストール（開発）：Thunderbird → ツール → アドオンとテーマ → 歯車 → ファイルからアドオンをインストール… → 生成 ZIP を選択

### テスト

- フルスイート：`make test`（Vitest）
- カバレッジ（任意）：
  - `npm i -D @vitest/coverage-v8`
  - `make test` を実行；`coverage/index.html` を開いて HTML レポートを確認
- i18n のみ：`make test-i18n`（パリティ、プレースホルダ、タイトル）

### デバッグとログ

- エラーコンソール：ツール → 開発者ツール → エラーコンソール
- 実行時の詳細ログ切替：
  - 有効化：`messenger.storage.local.set({ debug: true })`
  - 無効化：`messenger.storage.local.set({ debug: false })`
- 返信の作成／送信中にログが表示されます

### ドキュメント（サイト）

- 開発サーバー：`cd website && npm run start`
- 静的サイトのビルド：`cd website && npm run build`
- i18n：英語は `website/docs/*.md`、ドイツ語は `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- 検索：CI に Algolia DocSearch 環境変数（`DOCSEARCH_APP_ID` など）を設定していれば Algolia、なければローカル検索。ホームで `/` または `Ctrl+K`。

### セキュリティと設定のヒント

- `sources/manifest.json` をコミットしない（ビルドが一時生成）
- 更新チャネル維持のため `browser_specific_settings.gecko.id` を固定

### トラブルシューティング

- Thunderbird は 128 ESR 以上であること
- 実行時の問題にはエラーコンソールを使用

### CI とカバレッジ

- GitHub Actions（`CI — Tests`）はカバレッジの閾値（行／関数／分岐／文 85%）で vitest を実行。満たさない場合は失敗します。
- ワークフローは `coverage-html`（HTML レポート）を成果物としてアップロード。実行ページからダウンロード（Actions → 最新の実行 → Artifacts）。

### コントリビュート

- ブランチ／コミット／PR 規約は CONTRIBUTING.md を参照
