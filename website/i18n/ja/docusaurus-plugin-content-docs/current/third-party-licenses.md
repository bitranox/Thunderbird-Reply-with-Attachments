---
id: third-party-licenses
title: サードパーティライセンス
sidebar_label: サードパーティライセンス
---

このページでは、このリポジトリで使用しているサードパーティのライセンスをまとめています。ソースツリー内の
正式な一覧については、リポジトリのルートにある `THIRD_PARTY_LICENSES.md` を
参照してください。

ツールとライブラリ（開発/テスト/ドキュメント）

- vitest — MIT
- jsdom — MIT
- @docusaurus/core — MIT
- @docusaurus/preset-classic — MIT
- react — MIT
- react-dom — MIT
- clsx — MIT
- web‑ext (npx 経由でのみ使用) — MPL‑2.0 (開発ツール; アドオンには同梱されません)

注記

- Thunderbird の MailExtension API はプラットフォーム API です; それらからサードパーティのコードが同梱されることはありません。
- `sources/icons` にあるプロジェクトのアイコンはプロジェクト資産です (特に記載がない限り MIT)。GitHub のロゴ/アイコンは GitHub の商標であり、MIT ライセンスの適用対象ではありません; GitHub のブランドガイドラインに従って使用されています。

新しい依存関係を追加するかサードパーティのコードをバンドルする場合は、この
ページと `THIRD_PARTY_LICENSES.md` の両方を忘れずに更新してください。
