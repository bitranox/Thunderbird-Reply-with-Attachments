---
id: donation
title: '寄付'
sidebar_label: '寄付'
---

---

## 寄付

import useBaseUrl from '@docusaurus/useBaseUrl';

「Reply with Attachments」が気に入って開発を支援したい場合は、こちらから寄付できます。

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe で寄付" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>または</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal で寄付" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>または</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy Me a Coffee で支援" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="スキャンして Buy Me a Coffee から支援" 
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

ありがとうございます！ご支援は、新しい Thunderbird リリースへの互換性の維持、アクセシビリティとテストの改善、ドキュメントの最新化に役立ちます。

注記

- 寄付リンクはクリックしたときにのみ開き、アドオンはバックグラウンドでネットワークリクエストを実行しません。
- 継続的なご支援は長期的なメンテナンスやタイムリーな更新に役立ちますが、完全に任意です。

---

画像ボタンが読み込まれない場合は、代わりに次のリンクをご利用ください。

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

寄付は任意であり、機能が制限されることはありません。

---

## 寄付表示（90日間スヌーズ）

このアドオンには、寄付した後しばらくの間、寄付のプロンプトを非表示にできる便利な機能が含まれています。

- どこにあるか
  - オプション → サポート セクション：「寄付しました」ボタンと小さなヒント領域が表示されます。
  - 送信確認ダイアログにも［寄付］ボタンが表示されます。スヌーズが有効なときは自動的に非表示になります。

- 動作
  - 「寄付しました」をクリックすると、寄付ボタンおよび関連するプロンプトが90日間非表示になります。
  - ステータスのヒントには「YYYY‑MM‑DD まで非表示」（ローカル日付）が表示されます。すぐに再表示するための「寄付を再表示」ボタンもあります。
  - 90日後、［寄付］ボタンは自動的に再び表示されます。

- プライバシーと保存
  - このアドオンは、スヌーズ期間を記憶するために、Thunderbird のローカルストレージに 1 つのタイムスタンプを保存します。キー: `donateHideUntil`（エポック・ミリ秒）。
  - この設定は Thunderbird プロファイルにのみ保存され（クラウド同期はされません）、この機能によるネットワークリクエストは一切行われません。

- トラブルシューティング
  - 「寄付しました」をクリックした直後でも［寄付］が表示されたままの場合は、少し待つか、オプションページを開き直してください。設定が保存されるとすぐに UI が更新されます。
  - 手動でリセットするには「寄付を再表示」をクリックします。ヒントに表示されている日付になるまで待つこともできます。

この機能は利便性のためのものにすぎず、アドオンの機能を妨げたり、個人データを収集したりすることはありません。

---
