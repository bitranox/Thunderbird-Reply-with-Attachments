---
id: languages
title: 'Basa-basa'
sidebar_label: 'Basa-basa'
---

## Languages

Daptar ieu ngagambarkeun duanana tarjamahan dokumentasi website jeung string UI tambahan.
Dukungan basa anu gedé, hatur nuhun ka alat tarjamahan AI — nyertakeun 100 basa.

Daptar di handap ieu diurutkeun dumasar kode basa.

Tingali ogé: [Glossary](glossary) pikeun istilah UI kanonik anu dianggo di sakuliah lokal.

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

Tip: Ganti lokal docs ngaliwatan panyaring basa di header situs (URL prefix robih sakumaha mestina). Basa UI Thunderbird henteu gumantung kana basa website sareng nuturkeun setelan Thunderbird anjeun.

Landing page redirect

- Upami situs diwangun ku lokal anu dipikahoyong ku panyungsi anjeun, nganjang ka URL dokumen dasar di handapeun baseUrl proyék sacara otomatis ngarah ka lokal éta. Anggo panyaring basa (atawa `/en/`) pikeun tetep dina basa Inggris.

---

## Contribute Translations {#contribute-translations}

- Ngahijikeun hiji masalah dina tarjamahan? Punten buka masalah atanapi PR GitHub.
- Utamakan suntingan ngalawan sumber Inggris di `website/docs/`; alat maintainer nyebarkeun apdet ka lokal séjén.
  Inggris mangrupikeun sumber kanyataan pikeun dokumentasi; apdet tarjamahan ditarik ti EN salami workflow maintainer.

### Homepage, Navbar, Footer UI

- String ieu aya di `website/i18n/en/code.json` sareng ditarjamahkeun ka sadaya lokal ngaliwatan tugas maintainer:
  - `make translate_web_index` (peryogi `OPENAI_API_KEY`)
  - Batasi basa kalayan `OPTS="--locales de,fr"`; overwrite nilai anu parantos aya sareng `OPTS="--force"`.

### Website vs. UI {#website-vs-ui}

- Basa website sareng basa UI tambahan bersifat mandiri; panyaring basa ngan robih dokumen. Basa UI Thunderbird nuturkeun setelan Thunderbird anjeun.

---
