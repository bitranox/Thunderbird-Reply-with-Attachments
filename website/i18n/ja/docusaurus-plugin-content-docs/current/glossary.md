---
id: glossary
title: i18n 用語集
sidebar_label: 用語集
---

アドオンの UI とドキュメントで使用する標準用語です。各ロケール間で訳語の一貫性を保つための基準にしてください。

## 注意

- UI テキストは短く、行動を促す表現に。
- 設定には名詞、操作には動詞を。
- 見出し以外は文頭のみ大文字（Sentence case）。

## 用語

- 添付ファイル（Attachments）：メールに含まれるファイル。“enclosures” は避ける。
- ブラックリスト（Blacklist / 除外リスト）：自動添付を防ぐパターン一覧。
- UI では設定ページに合わせて “Blacklist (glob patterns)” を用いる。
- 照合対象はファイル名のみで、パスは対象外であることを明記。
- 確認（Confirm / Confirmation）：添付前にユーザーへ確認すること。
- 回答（Answers）：“Yes”（追加）、“No”（キャンセル）。ボタンは短い文言で。
- インライン画像（Inline image）：HTML で CID 参照される画像。ファイルとしては追加しない。
- S/MIME 署名：`smime.p7s` や PKCS7 署名。追加しない。
- オプション / 設定（Options / Settings）：Thunderbird のアドオン設定ページ。
- 既定の回答（Default answer）：確認ダイアログの事前選択値。

## スタイル

- ファイル名は等幅（コード）で表示：`smime.p7s`、`*.png` など。
- キー/ボタン：固有名詞のみタイトルケース。その他は文頭のみ大文字。
- 専門用語（例：“idempotency”）は避け、「重複を防ぐ」を用いる。
