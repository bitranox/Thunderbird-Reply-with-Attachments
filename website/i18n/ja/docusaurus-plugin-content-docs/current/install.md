---
id: install
title: 'インストール'
slug: /install
sidebar_label: 'インストール'
---

---

## 「Thunderbird アドオンとテーマ」からのインストール {#installation-in-thunderbird-recommended}

:::important Thunderbird の最小対応バージョン
このアドオンは Thunderbird **128 ESR 以降** をサポートします。旧バージョンはサポートされません。
:::

これは推奨されるインストール方法です。ATN（addons.thunderbird.net）からインストールしたアドオンは自動更新を受け取ります。LOCAL/dev のインストールは自動更新されません。

- 必要な Thunderbird の最小バージョン: 128 ESR 以降。

1. Thunderbird で、**ツール > アドオンとテーマ** に移動します。
2. "reply with attachments" を検索します。
3. アドオンを追加します。

またはアドオンのページを直接開きます: [Thunderbird アドオン (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI からの手動インストール {#local-installation-in-thunderbird}

### XPI ファイルをダウンロード {#download-the-xpi-file}

1. [Thunderbird アドオンのページ](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments) に移動します。
2. アドオンの最新バージョンを XPI ファイル（`reply_with_attachments-x.y.z-tb.xpi`）としてダウンロードします。

### Thunderbird にインストール {#install-in-thunderbird-local}

1. Thunderbird を開きます。
2. **ツール > アドオンとテーマ** を開きます。
3. **アドオンマネージャー** で、右上の歯車アイコンをクリックします。
4. メニューから **ファイルからアドオンをインストール…** を選択します。
5. ダウンロードした `reply_with_attachments-x.y.z-tb.xpi` ファイルを選択します。
6. プロンプトが表示されたらインストールを確認します。

---

## 開発用のインストール {#installation-for-development}

### リポジトリをダウンロード {#download-the-repository}

1. GitHub リポジトリの最新バージョンをダウンロードします。
2. 詳細については、`make help` を実行してください。

### Thunderbird にインストール {#install-in-thunderbird-dev}

1. Thunderbird を開きます。
2. **ツール > アドオンとテーマ** を開きます。
3. **アドオンマネージャー** で、右上の歯車アイコンをクリックします。
4. メニューから **ファイルからアドオンをインストール…** を選択します。
5. 生成されたファイル `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` を選択します。
6. プロンプトが表示されたらインストールを確認します。

注意: お使いのシステムで Thunderbird が `.zip` を受け付けない場合は、`.xpi` にリネームしてから、もう一度「ファイルからアドオンをインストール…」を試してください。

### LOCAL ZIP のありか {#where-local-zip}

- まずアドオンをパッケージします: リポジトリのルートで `make pack` を実行します。
- パッケージ後、リポジトリのルートにある「LOCAL」zip を探します（例: `2025-..-reply-with-attachments-plugin-LOCAL.zip`）。
- テスト用に再パッケージする前に、`sources/manifest_ATN.json` と `sources/manifest_LOCAL.json` の両方でバージョンを更新してください。

---

## 無効化、アンインストール、および更新 {#disable-uninstall-updates}

- 無効化: Thunderbird → ツール → アドオンとテーマ → 対象のアドオンを見つけて → トグルをオフ。
- アンインストール: 同じ画面 → 三点メニュー → 削除。
- 更新: ATN からのインストールは新しいバージョンが承認されると自動更新されます。LOCAL/dev のインストールは自動更新されません。新しい LOCAL ビルドを手動で再インストールしてください。
- 設定を完全に削除する: [プライバシー → データ削除](privacy#data-removal) を参照してください。

こちらも参照

- [クイックスタート](quickstart)
