---
id: languages
title: 'Bahasa'
sidebar_label: 'Bahasa'
---

## Languages

Daftar ini mencerminkan baik terjemahan dokumentasi situs web maupun string UI tambahan.
Dukungan bahasa yang besar, berkat alat terjemahan AI — mencakup 100 bahasa.

Daftar di bawah ini diurutkan berdasarkan kode bahasa.

Lihat juga: [Glosarium](glossary) untuk istilah UI kanonik yang digunakan di seluruh lokal.

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

Tip: Ganti lokal dokumen melalui pemilih bahasa di header situs (prefix URL diubah sesuai). Bahasa UI Thunderbird independen dari bahasa situs web dan mengikuti pengaturan Thunderbird Anda.

Pengalihan halaman utama

- Jika situs dibangun dengan lokal yang diutamakan browser Anda, mengunjungi URL dokumen dasar di bawah baseUrl proyek secara otomatis mengalihkan ke lokal tersebut. Gunakan pemilih bahasa (atau `/en/`) untuk tetap di bahasa Inggris.

---

## Contribute Translations {#contribute-translations}

- Menemukan masalah dalam terjemahan? Silakan buka masalah atau PR di GitHub.
- Prefer edits against the English source under `website/docs/`; alat pemelihara menyebarkan pembaruan ke lokal lain.
  Bahasa Inggris adalah sumber kebenaran untuk dokumentasi; pembaruan terjemahan diambil dari EN selama alur kerja pemelihara.

### Homepage, Navbar, Footer UI

- String ini ada di `website/i18n/en/code.json` dan diterjemahkan ke semua lokal melalui tugas pemelihara:
  - `make translate_web_index` (memerlukan `OPENAI_API_KEY`)
  - Batasi bahasa dengan `OPTS="--locales de,fr"`; timpa nilai yang ada dengan `OPTS="--force"`.

### Website vs. UI {#website-vs-ui}

- Bahasa situs web dan bahasa UI tambahan adalah independen; pemilih bahasa hanya mengubah dokumen. Bahasa UI Thunderbird mengikuti pengaturan Thunderbird Anda.

---
