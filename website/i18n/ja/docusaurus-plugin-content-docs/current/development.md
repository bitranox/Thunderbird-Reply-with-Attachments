---
id: development
title: '開発'
sidebar_label: '開発'
---

---

## 開発ガイド {#development-guide}

:::note 英語版のみ編集してください。翻訳は自動で反映されます
ドキュメントは `website/docs`（英語）の下のみを更新してください。`website/i18n/<locale>/…` 配下の翻訳は自動生成されるため、手動で編集しないでください。翻訳タスク（例: `make translate_web_docs_batch`）を使用してローカライズ済みコンテンツを更新します。
:::

### 前提条件 {#prerequisites}

- Node.js 22+ と npm（Node 22 で検証済み）
- Thunderbird 128 ESR 以降（手動テスト用）

---

### プロジェクト構成（概要） {#project-layout-high-level}

- ルート: パッケージングスクリプト `distribution_zip_packer.sh`、ドキュメント、スクリーンショット
- `sources/`: メインアドオンコード（バックグラウンド、オプション/ポップアップUI、マニフェスト、アイコン）
- `tests/`: Vitest スイート
- `website/`: Docusaurus ドキュメント（`website/i18n/de/...` 配下に i18n あり）

---

### インストールとツール {#install-and-tooling}

- ルート依存関係をインストール: `npm ci`
- ドキュメント（任意）: `cd website && npm ci`
- ターゲットの一覧: `make help`

---

### ライブ開発（web‑ext run） {#live-dev-web-ext}

- Firefox Desktop でのクイックループ（UI のスモークテストのみ）:
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird で実行（MailExtensions には推奨）:
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- ヒント:
- Thunderbird のエラーコンソールを開いたままにする（ツール → 開発ツール → エラーコンソール）。
- MV3 のイベントページはアイドル時にサスペンドされます。コード変更後はアドオンを再読み込みするか、web‑ext の自動リロードに任せてください。
- Firefox 専用の挙動とは異なる点があります。API の互換性確認は必ず Thunderbird で行ってください。
- Thunderbird のバイナリパス（例）:
- Linux: `thunderbird`（例: `/usr/bin/thunderbird`）
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- プロファイルの分離: 日常の環境へ影響を与えないよう、開発には別の Thunderbird プロファイルを使用してください。

---

### Make ターゲット（アルファベット順） {#make-targets-alphabetical}

Makefile は一般的な開発フローを標準化します。`make help` を実行すると、すべてのターゲットの要約（一行）をいつでも表示できます。

ヒント: ターゲットなしで `make` を実行すると、Whiptail の簡易メニューが開き、ターゲットを選択できます。

| ターゲット                                               | 一行説明                                                                                           |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | ローカルのビルド/プレビュー成果物（tmp/、web-local-preview/、website/build/）を削除。              |
| [`commit`](#mt-commit)                                   | 整形、テスト実行（i18n 含む）、変更履歴更新、コミット & プッシュ。                                 |
| [`eslint`](#mt-eslint)                                   | フラット構成で ESLint を実行（`npm run -s lint:eslint`）。                                         |
| [`help`](#mt-help)                                       | すべてのターゲットを一行ドキュメント付きで一覧表示（ソート済み）。                                 |
| [`lint`](#mt-lint)                                       | `sources/` に対する web‑ext lint（仮マニフェスト; ZIP は無視; 致命的ではない）。                   |
| [`menu`](#mt-menu)                                       | ターゲットと任意の引数を選ぶ対話メニュー。                                                         |
| [`pack`](#mt-pack)                                       | ATN と LOCAL の ZIP をビルド（linter 実行; packer スクリプト呼び出し）。                           |
| [`prettier`](#mt-prettier)                               | リポジトリをその場で整形（上書き）。                                                               |
| [`prettier_check`](#mt-prettier_check)                   | Prettier のチェックモード（書き込みなし）。再整形が必要なら失敗。                                  |
| [`prettier_write`](#mt-prettier_write)                   | `prettier` のエイリアス。                                                                          |
| [`test`](#mt-test)                                       | Prettier（書き込み）、ESLint、続いて Vitest（設定されていればカバレッジ）。                        |
| [`test_i18n`](#mt-test_i18n)                             | i18n 専用テスト: アドオンのプレースホルダー/整合性 + ウェブサイトの整合性。                        |
| [`translate_app`](#mt-translation-app)                   | `translation_app` のエイリアス。                                                                   |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json` からアプリの UI 文字列を翻訳。                                 |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI Batch API 経由でウェブサイトのドキュメントを翻訳（推奨）。                                  |
| [`translate_web_docs_sync`](#mt-translation-web)         | ウェブサイトのドキュメントを同期翻訳（レガシー、バッチなし）。                                     |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index` のエイリアス。                                                             |
| [`translation_web_index`](#mt-translation_web_index)     | ホームページ/ナビバー/フッターの UI を翻訳（`website/i18n/en/code.json → .../<lang>/code.json`）。 |
| [`web_build`](#mt-web_build)                             | `website/build` にドキュメントをビルド（`--locales` / `BUILD_LOCALES` をサポート）。               |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | オフラインでも安全なリンクチェック（リモート HTTP[S] をスキップ）。                                |
| [`web_build_local_preview`](#mt-web_build_local_preview) | ローカル gh‑pages プレビュー。8080–8090 で自動提供。任意でテスト/リンクチェック。                  |
| [`web_push_github`](#mt-web_push_github)                 | `website/build` を `gh-pages` ブランチへプッシュ。                                                 |

オプションの書式

- オプションを渡すには `make <command> OPTS="…"` を使用（引用符推奨）。以下の各ターゲットが使用例を示します。

--

-

#### ロケールビルドのヒント {#locale-build-tips}

- ロケールの一部のみビルド: `BUILD_LOCALES="en de"` を設定するか、web ターゲットに `OPTS="--locales en,de"` を渡します。
- 特定ロケールのプレビュー: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`。

---

### ビルドとパッケージ {#build-and-package}

- ZIP をビルド: `make pack`
- リポジトリのルートに ATN と LOCAL の ZIP を生成（成果物を手で編集しないでください）
- ヒント: パッケージング前に `sources/manifest_ATN.json` と `sources/manifest_LOCAL.json` の両方でバージョンを更新してください
- 手動インストール（開発）: Thunderbird → ツール → アドオンとテーマ → 歯車 → ファイルからアドオンをインストール… → 生成された ZIP を選択

---

### テスト {#test}

- フルスイート: `make test`（Vitest）
- カバレッジ（任意）:
- `npm i -D @vitest/coverage-v8`
- `make test` を実行; HTML レポートは `coverage/index.html` を開く
- i18n のみ: `make test_i18n`（UI のキー/プレースホルダー/タイトル + ウェブサイトのロケール/ドキュメントごとの整合性。id/title/sidebar_label を検査）

---

### デバッグとログ {#debugging-and-logs}

- エラーコンソール: ツール → 開発ツール → エラーコンソール
- 実行時に冗長ログを切り替え:
- 有効化: `messenger.storage.local.set({ debug: true })`
- 無効化: `messenger.storage.local.set({ debug: false })`
- 返信の作成/送信中にログが表示されます

---

### ドキュメント（ウェブサイト） {#docs-website}

- 開発サーバー: `cd website && npm run start`
- 静的サイトをビルド: `cd website && npm run build`
- Make の同等ターゲット（アルファベット順）: `make web_build`、`make web_build_linkcheck`、`make web_build_local_preview`、`make web_push_github`
- 使用例:
- 英語のみ、テスト/リンクチェックなし、プッシュなし: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- 全ロケール、テスト/リンクチェックあり、その後プッシュ: `make web_build_local_preview && make web_push_github`
- 公開前に、オフラインでも安全なリンクチェックを実行: `make web_build_linkcheck`。
- i18n: 英語は `website/docs/*.md`、ドイツ語訳は `website/i18n/de/docusaurus-plugin-content-docs/current/*.md` にあります
- 検索: CI で Algolia DocSearch の環境変数（`DOCSEARCH_APP_ID`、`DOCSEARCH_API_KEY`、`DOCSEARCH_INDEX_NAME`）が設定されている場合、サイトは Algolia 検索を使用します。設定されていない場合はローカル検索にフォールバックします。ホームページでは `/` または `Ctrl+K` を押して検索ボックスを開きます。

---

#### 寄付リダイレクトルート {#donate-redirect}

- `website/src/pages/donate.js`
- ルート: `/donate`（および `/<locale>/donate`）
- 動作:
- 現在のルートにロケールが含まれている場合（例: `/de/donate`）、それを使用
- それ以外の場合は、`navigator.languages` と設定済みロケールから最適一致を選択し、見つからなければ既定ロケールへフォールバック
- リダイレクト先:
- `en` → `/docs/donation`
- その他 → `/<locale>/docs/donation`
- 適切な baseUrl 処理のため `useBaseUrl` を使用
- フォールバックとして meta refresh と `noscript` リンクを含む

---

---

#### プレビューのヒント {#preview-tips}

- Node プレビューを安全に停止: `Local server started` の実行後に表示される `http://localhost:<port>/__stop` を開いてください。
- MDX/JSX で画像が読み込まれない場合は、サイトの `baseUrl` を尊重するために `useBaseUrl('/img/...')` を使用してください。
- プレビューが先に起動し、その後にリンクチェックが走ります（非ブロッキング。壊れた外部リンクでもプレビューは止まりません）。
- プレビュー URL の例: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/`（“Local server started” の後に表示）。
- リンクチェックにおける外部リンク: 一部の外部サイト（例: addons.thunderbird.net）は自動クローラをブロックし、リンクチェックで 403 を返す場合があります。プレビューは起動するため、無視して問題ありません。

---

#### ウェブサイトを翻訳する {#translate-website}

翻訳できるもの

- ウェブサイトの UI のみ: ホームページ、ナビバー、フッター、その他の UI 文字列。ドキュメント本文は当面英語のみです。

編集場所

- `website/i18n/<locale>/code.json` を編集（`en` を参照）。`{year}`、`{slash}`、`{ctrl}`、`{k}`、`{code1}` のようなプレースホルダーは変更しないでください。

ファイルの生成/更新

- すべてのロケールの不足スタブを作成: `npm --prefix website run i18n:stubs`
- 新しい文字列を追加後、英語からスタブを上書き: `npm --prefix website run i18n:stubs:force`
- 単一ロケール向けの代替: `npx --prefix website docusaurus write-translations --locale <locale>`

ホームページ/ナビバー/フッターの UI 文字列を翻訳（OpenAI）

- 認証情報を一度設定（シェルまたは .env）:
- `export OPENAI_API_KEY=sk-...`
- 任意: `export OPENAI_MODEL=gpt-4o-mini`
- 一括（全ロケール、en は除外）: `make translate_web_index`
- 特定ロケールに限定: `make translate_web_index OPTS="--locales de,fr"`
- 既存値を上書き: `make translate_web_index OPTS="--force"`

検証とリトライ

- 翻訳スクリプトは JSON 構造を検証し、中括弧のプレースホルダーを保持し、URL が変更されないことを保証します。
- 検証に失敗した場合、既存値を保持する前にフィードバック付きで最大 2 回再試行します。

ロケールをプレビュー

- 開発サーバー: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` にアクセス

提出

- 編集した `code.json` ファイルで PR を作成してください。変更は目的に絞り、可能であれば簡単なスクリーンショットを添付してください。

---

### セキュリティと構成のヒント {#security-and-configuration-tips}

- `sources/manifest.json` をコミットしないでください（ビルド時に一時生成されます）
- 更新チャネルを維持するため、`browser_specific_settings.gecko.id` は変更せず安定させてください

---

### 設定の永続化 {#settings-persistence}

- ストレージ: すべてのユーザー設定は `storage.local` に保存され、アドオンの更新後も保持されます。
- インストール: 既定値は、キーが厳密に存在しない（undefined）場合にのみ適用されます。
- 更新: マイグレーションは不足しているキーのみを補完し、既存の値は決して上書きしません。
- スキーママーカー: `settingsVersion`（現在は `1`）。
- キーと既定値:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- コード: `sources/background.js` → `initializeOrMigrateSettings()` および `SCHEMA_VERSION` を参照。

開発ワークフロー（新しい設定の追加）

- `sources/background.js` の `SCHEMA_VERSION` を更新。
- `initializeOrMigrateSettings()` の `DEFAULTS` オブジェクトに新しいキーと既定値を追加。
- 既定値の投入時は「未定義の場合のみ」のルールを適用し、既存値を上書きしない。
- 設定がユーザーに見える場合は `sources/options.js` に配線し、ローカライズ文字列を追加。
- テストを追加/調整（`tests/background.settings.migration.test.js` を参照）。

手動テストのヒント

- 新規インストールを模擬: 拡張機能のデータディレクトリを消去するか、新しいプロファイルで開始します。
- 更新を模擬: `storage.local` で `settingsVersion` を `0` に設定して再読み込みします。既存値が変更されず、不足キーのみが追加されることを確認してください。

---

### トラブルシューティング {#troubleshooting}

- Thunderbird が 128 ESR 以降であることを確認
- 実行時の問題にはエラーコンソールを使用
- 保存された設定が正しく反映されないように見える場合は、Thunderbird を再起動してやり直してください。（Thunderbird はセッション間で状態をキャッシュする場合があり、再起動で最新の設定が読み込まれます。）

---

### CI とカバレッジ {#ci-and-coverage}

- GitHub Actions（`CI — Tests`）はカバレッジしきい値（行/関数/ブランチ/文の85%）で vitest を実行します。しきい値に満たない場合、ジョブは失敗します。
- ワークフローは HTML レポート付きの成果物 `coverage-html` をアップロードします。実行ページ（Actions → 最新の実行 → Artifacts）からダウンロードしてください。

---

### 貢献 {#contributing}

- ブランチ/コミット/PR のガイドラインは CONTRIBUTING.md を参照
- ヒント: 日常のプロファイルに影響を与えないよう、テスト用に別の Thunderbird 開発用プロファイルを作成してください。

---

### 翻訳

- 大規模な「all → all」の翻訳ジョブは遅く高コストになり得ます。まずはサブセット（例: 数本のドキュメントと 1–2 ロケール）で始め、結果を確認してから拡大してください。

---

- リトライポリシー: 翻訳ジョブは API エラー時に指数バックオフで最大 3 回再試行します。`scripts/translate_web_docs_batch.js` と `scripts/translate_web_docs_sync.js` を参照。

ドキュメント用スクリーンショット

- 画像は `website/static/img/` 配下に保存。
- サイトの `baseUrl` に対応するよう、MD/MDX では `useBaseUrl('/img/<filename>')` を介して参照。
- `website/static/img/` 配下で画像を追加/改名した後は、すべての参照が引き続き `useBaseUrl('/img/…')` を使っていること、およびローカルプレビューで表示されることを確認。
  ファビコン

- 複数サイズの `favicon.ico` は、`website/scripts/build-favicon.mjs` により、すべてのビルド経路（Make + スクリプト）で自動生成されます。
- 手作業は不要で、`icon-*.png` を更新するだけで十分です。
  レビューのヒント

- 翻訳ドキュメントではフロントマターの `id` を変更しないでください。存在する場合は `title` と `sidebar_label` のみを翻訳してください。

#### clean {#mt-clean}

- 目的: ローカルのビルド/プレビュー成果物を削除。
- 使い方: `make clean`
- 削除対象（存在する場合）:
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- 目的: 整形、テスト、変更履歴更新、コミット、プッシュ。
- 使い方: `make commit`
- 詳細: Prettier（書き込み）、`make test`、`make test_i18n` を実行。ステージ済みの差分がある場合は changelog を追記し、`origin/<branch>` にプッシュ。

---

#### eslint {#mt-eslint}

- 目的: フラット構成で ESLint を実行。
- 使い方: `make eslint`

---

#### help {#mt-help}

- 目的: すべてのターゲットを一行ドキュメント付きで一覧。
- 使い方: `make help`

---

#### lint {#mt-lint}

- 目的: `web-ext` を用いて MailExtension を lint。
- 使い方: `make lint`
- 注意: `sources/manifest_LOCAL.json` を `sources/manifest.json` に一時コピー; ビルド済み ZIP は無視; 警告ではパイプラインは失敗しない。

---

#### menu {#mt-menu}

- 目的: Make のターゲットと任意引数を選ぶ対話メニュー。
- 使い方: 引数なしで `make` を実行。
- 注意: `whiptail` が利用できない場合、メニューは `make help` にフォールバック。

---

#### pack {#mt-pack}

- 目的: ATN と LOCAL の ZIP をビルド（`lint` に依存）。
- 使い方: `make pack`
- ヒント: パッケージング前に `sources/manifest_*.json` の両方でバージョンを更新。

---

#### prettier {#mt-prettier}

- 目的: リポジトリをその場で整形。
- 使い方: `make prettier`

#### prettier_check {#mt-prettier_check}

- 目的: フォーマットを検証（書き込みなし）。
- 使い方: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- 目的: `prettier` のエイリアス。
- 使い方: `make prettier_write`

---

#### test {#mt-test}

- 目的: Prettier（書き込み）、ESLint、続いて Vitest（カバレッジがインストールされていれば）。
- 使い方: `make test`

#### test_i18n {#mt-test_i18n}

- 目的: アドオン文字列とウェブサイトドキュメントに対する i18n 集中テスト。
- 使い方: `make test_i18n`
- 実行内容: `npm run test:i18n` と `npm run -s test:website-i18n`。

---

#### translate_app / translation_app {#mt-translation-app}

- 目的: アドオンの UI 文字列を EN から他ロケールへ翻訳。
- 使い方: `make translation_app OPTS="--locales all|de,fr"`
- 注意: キー構造とプレースホルダーを保持。ログは `translation_app.log`。スクリプト形式: `node scripts/translate_app.js --locales …`。

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- 目的: ウェブサイトのドキュメントを `website/docs/*.md` から `website/i18n/<locale>/...` へ翻訳。
- 推奨: `translate_web_docs_batch`（OpenAI Batch API）
  - 使い方（フラグ）: `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - レガシー位置引数も引き続き使用可: `OPTS="<doc|all> <lang|all>"`
- 動作: JSONL を生成、アップロード、30 秒ごとにポーリング、結果をダウンロードし、ファイルに書き込みます。
- 注意: バッチジョブは完了まで最大 24 時間かかる場合があります（OpenAI のバッチウィンドウによる）。コンソールにはポーリングごとに経過時間が表示されます。
- 環境変数: `OPENAI_API_KEY`（必須）、任意で `OPENAI_MODEL`、`OPENAI_TEMPERATURE`、`OPENAI_BATCH_WINDOW`（既定 24h）、`BATCH_POLL_INTERVAL_MS`。
- レガシー: `translate_web_docs_sync`
  - 使い方（フラグ）: `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - レガシー位置引数も引き続き使用可: `OPTS="<doc|all> <lang|all>"`
- 動作: ペアごとの同期リクエスト（バッチ集約なし）。
- 注意: `OPTS` を省略すると対話プロンプトが表示されます。どちらのモードもコードブロック/インラインコードを保持し、フロントマターの `id` は変更しません。ログは `translation_web_batch.log`（バッチ）または `translation_web_sync.log`（同期）。

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- 目的: ウェブサイトの UI 文字列（ホームページ、ナビバー、フッター）を `website/i18n/en/code.json` から `website/i18n/<locale>/code.json` 配下のすべてのロケールへ翻訳（`en` を除く）。
- 使い方: `make translate_web_index` または `make translate_web_index OPTS="--locales de,fr [--force]"`
- 要件: `OPENAI_API_KEY` をエクスポート（任意: `OPENAI_MODEL=gpt-4o-mini`）。
- 動作: JSON 構造を検証し、中括弧のプレースホルダーを保持し、URL を変更せず、検証エラー時はフィードバック付きで再試行します。

---

#### web_build {#mt-web_build}

- 目的: ドキュメントサイトを `website/build` へビルド。
- 使い方: `make web_build OPTS="--locales en|de,en|all"`（または `BUILD_LOCALES="en de"` を設定）
- 内部: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`。
- 依存: `website/node_modules/@docusaurus` がない場合にのみ、`website/` で `npm ci` を実行。

#### web_build_linkcheck {#mt-web_build_linkcheck}

- 目的: オフラインでも安全なリンクチェック。
- 使い方: `make web_build_linkcheck OPTS="--locales en|all"`
- 注意: `tmp_linkcheck_web_pages` にビルド; GH Pages の `baseUrl` を `/` に書き換え; リモート HTTP(S) リンクはスキップ。

#### web_build_local_preview {#mt-web_build_local_preview}

- 目的: テスト/リンクチェックを任意で含むローカル gh‑pages プレビュー。
- 使い方: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- 動作: まず Node のプレビューサーバー（`scripts/preview-server.mjs`、`/__stop` をサポート）を試し、`python3 -m http.server` にフォールバック。8080–8090 で提供; PID は `web-local-preview/.server.pid`。

#### web_push_github {#mt-web_push_github}

- 目的: `website/build` を `gh-pages` ブランチへプッシュ。
- 使い方: `make web_push_github`

ヒント: Makefile が使用するパッケージマネージャを上書きするには `NPM=…` を設定します（既定は `npm`）。

---
