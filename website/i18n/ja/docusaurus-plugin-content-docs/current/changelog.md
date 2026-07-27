---
id: changelog
title: '変更履歴'
---

---

## 変更履歴

完全で詳細な履歴については、リポジトリの
[GitHub 上の CHANGELOG.md](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md) を参照してください。

- 2.4.0: 送信者が`Content-ID`を付けたというだけの理由で画像が除外されることはなくなりました。Thunderbird自身が埋め込み画像を返信本文に保持するため、「Include inline pictures」オプションは廃止されました。リンクは現在システムのブラウザで開きます。返信ごとに添付ファイル50個/100MBの上限があり、除外されたものはすべて報告されます。
- 2.3.2: 「Include inline pictures」は埋め込み画像を返信本文にbase64データURIとして埋め込んでいました(add-ons.thunderbird.netのレビュー後に再度削除されました。Thunderbird自身がこれを行うためです)。コード品質の改善とテストカバレッジの拡大。
- 2.3.1: Thunderbird がバックグラウンドのイベントページをアイドル化した後でも添付ファイルを保持します。トラブルシューティング用に対象を絞ったデバッグフックを追加。
- 2.3.0: 添付ファイルの重複排除を洗練し、テスト範囲を拡大し、AMO のポリシーに適合するために不要な権限を削除。
- 2.1.0: 主要100言語に対する完全な国際化サポート
- 2.0.0: フル機能版への書き直し（EN/DE）
- 1.0.1: messages.listAttachments() に切り替え
- 1.0.0: 初回リリース

---

## 日付とチャンネル {#dates-and-channels}

- ATN へのリリースは、パッケージ化後数時間遅れる場合があります。
- LOCAL ビルドは開発者のテスト専用であり、ATN 経由では配布されません。

---
