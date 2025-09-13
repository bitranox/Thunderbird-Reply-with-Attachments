---
id: languages
title: '语言'
sidebar_label: '语言'
---

## Languages

此列表反映了网站文档翻译和附加用户界面字符串。
得益于人工智能翻译工具的大量语言支持——涵盖100种语言。

以下列表按语言代码排序。

另请参阅：[术语表](glossary)，了解跨地区使用的标准用户界面术语。

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

提示：通过网站头部的语言选择器切换文档语言（URL 前缀相应更改）。Thunderbird 的用户界面语言独立于网站语言，并遵循您的 Thunderbird 设置。

登陆页面重定向

- 如果网站是用您浏览器的首选语言构建的，访问项目的 baseUrl 下的基础文档 URL 会自动重定向到该语言。使用语言切换器（或 `/en/`）保持在英文。

---

## Contribute Translations {#contribute-translations}

- 在翻译中发现问题？请打开GitHub问题或PR。
- 更喜欢针对 `website/docs/` 的英文源代码进行编辑；维护者的工具将更新传播到其他语言。
  英文是文档的真实来源；翻译更新在维护者的工作流程中从英文中提取。

### Homepage, Navbar, Footer UI

- 这些字符串位于 `website/i18n/en/code.json` 中，并通过维护者任务翻译为所有语言：
  - `make translate_web_index`（需要 `OPENAI_API_KEY`）
  - 通过 `OPTS="--locales de,fr"` 限制语言；使用 `OPTS="--force"` 重写现有值。

### Website vs. UI {#website-vs-ui}

- 网站语言和附加用户界面语言是独立的；语言选择器仅更改文档。Thunderbird 的用户界面语言遵循您的 Thunderbird 设置。

---
