---
id: languages
title: '言語'
sidebar_label: '言語'
---

## Languages

このリストは、ウェブサイトのドキュメント翻訳とアドオンUIの文字列の両方を反映しています。AI翻訳ツールのおかげで、多くの言語をサポートしており、100言語をカバーしています。

以下のリストは、言語コードでソートされています。

また、ロケール全体で使用される標準UI用語については、[用語集](glossary)もご覧ください。

---

## Language list {#language-list}

- `af`: Afrikaans (af-ZA)
- `ak`: Akan (ak-GH)
- `am`: Amharic (am-ET)
- `ar`: Arabic (ar)
- `as`: Assamese (as-IN)
- `az`: Azerbaijani (az-AZ)
- `be`: Belarusian (be-BY)
- `bg`: Bulgarian (bg-BG)
- `bm`: Bambara (bm-ML)
- `bn`: Bengali (bn-BD)
- `bs`: Bosnian (bs-BA)
- `ca`: Catalan (ca-ES)
- `cs`: Czech (cs-CZ)
- `da`: Danish (da-DK)
- `de`: German (de-DE)
- `el`: Greek (el-GR)
- `en`: English (en-US)
- `es`: Spanish (es-ES)
- `et`: Estonian (et-EE)
- `fa`: Persian (Farsi) (fa-IR)
- `ff`: Fulah (ff-SN)
- `fi`: Finnish (fi-FI)
- `fr`: French (fr-FR)
- `ga`: Irish (ga-IE)
- `gu`: Gujarati (gu-IN)
- `ha`: Hausa (ha-NG)
- `he`: Hebrew (he-IL)
- `hi`: Hindi (hi-IN)
- `hr`: Croatian (hr-HR)
- `ht`: Haitian Creole (ht-HT)
- `hu`: Hungarian (hu-HU)
- `hy`: Armenian (hy-AM)
- `id`: Indonesian (id-ID)
- `ig`: Igbo (ig-NG)
- `is`: Icelandic (is-IS)
- `it`: Italian (it-IT)
- `ja`: Japanese (ja-JP)
- `jv`: Javanese (jv-ID)
- `ka`: Georgian (ka-GE)
- `kk`: Kazakh (kk-KZ)
- `km`: Khmer (km-KH)
- `kn`: Kannada (kn-IN)
- `ko`: Korean (ko-KR)
- `ks`: Kashmiri (ks-IN)
- `ku`: Kurdish (ku-TR)
- `ky`: Kyrgyz (ky-KG)
- `ln`: Lingala (ln-CD)
- `lo`: Lao (lo-LA)
- `lt`: Lithuanian (lt-LT)
- `lv`: Latvian (lv-LV)
- `mg`: Malagasy (mg-MG)
- `ml`: Malayalam (ml-IN)
- `mn`: Mongolian (mn-MN)
- `mr`: Marathi (mr-IN)
- `ms`: Malay (ms-MY)
- `my`: Burmese (my-MM)
- `ne`: Nepali (ne-NP)
- `nl`: Dutch (nl-NL)
- `no`: Norwegian (no-NO)
- `ny`: Chichewa (ny-MW)
- `om`: Oromo (om-ET)
- `or`: Odia (or-IN)
- `pa`: Punjabi (pa-IN)
- `pl`: Polish (pl-PL)
- `ps`: Pashto (ps-AF)
- `pt`: Portuguese (pt-PT)
- `qu`: Quechua (qu-PE)
- `rn`: Kirundi (rn-BI)
- `ro`: Romanian (ro-RO)
- `ru`: Russian (ru-RU)
- `rw`: Kinyarwanda (rw-RW)
- `sd`: Sindhi (sd-PK)
- `si`: Sinhala (si-LK)
- `sk`: Slovak (sk-SK)
- `sl`: Slovenian (sl-SI)
- `sn`: Shona (sn-ZW)
- `so`: Somali (so-SO)
- `sq`: Albanian (sq-AL)
- `sr`: Serbian (sr-RS)
- `su`: Sundanese (su-ID)
- `sv`: Swedish (sv-SE)
- `sw`: Swahili (sw-TZ)
- `ta`: Tamil (ta-IN)
- `te`: Telugu (te-IN)
- `tg`: Tajik (tg-TJ)
- `th`: Thai (th-TH)
- `ti`: Tigrinya (ti-ER)
- `tk`: Turkmen (tk-TM)
- `tl`: Tagalog (tl-PH)
- `tr`: Turkish (tr-TR)
- `ug`: Uyghur (ug-CN)
- `uk`: Ukrainian (uk-UA)
- `ur`: Urdu (ur-PK)
- `uz`: Uzbek (uz-UZ)
- `vi`: Vietnamese (vi-VN)
- `wo`: Wolof (wo-SN)
- `xh`: Xhosa (xh-ZA)
- `yo`: Yoruba (yo-NG)
- `zh`: Chinese (zh)
- `zu`: Zulu (zu-ZA)

Tip: Switch the docs locale via the language selector in the site header (URL prefix changes accordingly). ThunderbirdのUI言語は、ウェブサイト言語とは独立しており、あなたのThunderbird設定に従います。

Landing page redirect

- もしサイトがあなたのブラウザの優先ロケールで構築されている場合、プロジェクトのbaseUrlの下にある基本ドキュメントURLを訪れると、自動的にそのロケールにリダイレクトされます。言語スイッチャー（または `/en/`）を使用して英語に留まることができます。

---

## Contribute Translations {#contribute-translations}

- 翻訳に問題を見つけましたか？ GitHubの問題またはPRをオープンしてください。
- 英語のソースに対する編集を好ましいです `website/docs/`; メインテイナーのツールは他のロケールに更新を伝播させます。
  英語がドキュメントの真実のソースです; 翻訳の更新はメインテイナーのワークフロー中にENから引き出されます。

### Homepage, Navbar, Footer UI

- これらの文字列は `website/i18n/en/code.json` に存在し、メインテイナーのタスクを介してすべてのロケールに翻訳されます：
  - `make translate_web_index` （`OPENAI_API_KEY` が必要）
  - `OPTS="--locales de,fr"` で言語を制限; `OPTS="--force"` で既存の値を上書きします。

### Website vs. UI {#website-vs-ui}

- ウェブサイトの言語とアドオンUIの言語は独立しており、言語スイッチャーはドキュメントのみを変更します。ThunderbirdのUI言語はあなたのThunderbirdの設定に従います。

---
