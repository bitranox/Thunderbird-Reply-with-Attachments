---
id: compatibility
title: '互換性'
sidebar_label: '互換性'
---

---

## 互換性 {#compatibility}

:::important Thunderbird の最小バージョン
このアドオンは Thunderbird **128 ESR 以降**をサポートします。旧バージョンはサポートされません。
:::

- Thunderbird 128 ESR 以降をサポートしています（128.x+）。
- 旧バージョンの Thunderbird はサポートされません。
- Windows、macOS、Linux でテスト済み。

:::warning Manifest V2 はサポートされません
Manifest V2 はサポートされません。アドオンは Thunderbird 128 ESR+ 上の **Manifest V3 (MV3)** を対象としています。
:::

---

## トラブルシューティング {#troubleshooting}

- アドオンが期待どおりに動作しない場合は、互換性のある Thunderbird バージョン（128 ESR 以降）を使用していることを確認してください。
- Thunderbird のエラーコンソール（**ツール > 開発ツール > エラーコンソール**）で、アドオンに関連する問題がないか確認してください。
- 保存済みの設定が正しく適用されていないように見える場合は、Thunderbird を再起動してから再試行してください。（Thunderbird はセッション間で状態をキャッシュする場合があります。再起動すると新しい設定が確実に読み込まれます。）

---

## 既知の競合 {#known-conflicts}

- 現時点では既知のものはありません。他のアドオンとの併用で重複した添付ファイルが繰り返し発生する、または不具合が起きる場合は、再現手順を添えてご報告ください。

---

## ベータ/ナイトリー {#beta-nightly}

- Thunderbird Beta および Daily（Nightly）ビルドは概ねサポートされていますが、上流での変更によりアドオンの動作が壊れることがあります。問題に遭遇した場合は、正確な Thunderbird のバージョン（例: “Daily 131.0a1 2025‑09‑10”）を添えて報告してください。
- Beta/Nightly でリグレッションに遭遇しましたか？ 再現手順を添えてご報告ください — [サポート](support) を参照 — のうえ、Thunderbird の正確なビルド文字列も含めてください。

---
