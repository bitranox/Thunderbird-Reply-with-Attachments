---
id: languages
title: 'Izilimi'
sidebar_label: 'Izilimi'
---

## Izilimi

Lezi zihloko ziveza ukuhumusha kwezakhiwo zewebhusayithi nezintambo ze-UI ezengeziwe.
Ukusekelwa kwezilimi okukhulu, okuhunyushwe ngama-AI amathuluzi okuhumusha — kufaka izilimi ezingu-100.

Uhlu olungezansi luhlelwe ngenkodi yezilimi.

Bheka futhi: [Iglossari](glossary) yezisho ze-UI ezisetshenziswe kuma-locale.

---

## Uhlu lwezilimi {#language-list}

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

Ithiphu: Shintsha i-locale ye-docs nge-selector yezilimi esigabeni sesayithi (i-URL prefix iguqulwa ngokufanele). Ulimi lwe-UI ye-Thunderbird aluhambisani nolimi lwe-website futhi luya ngokuhlelwa kwakho kwe-Thunderbird.

Ukuhlela ikhasi lokuqala

- Uma isayithi sakhiwe ngolimi oluthandwa yi-browser yakho, ukuvivinya i-URL ye-docs eyisisekelo ngaphansi kwe-baseUrl yephrojekthi kuzodluliselwa ngokuzenzakalelayo kulolo limi. Sebenzisa i-switcher yezilimi (noma `/en/`) ukuze uhlala ngesiNgisi.

---

## Faka Izinguquko {#contribute-translations}

- Uthole inkinga ekuhumusheni? Sicela uvule udaba ku-GitHub noma i-PR.
- Ukuthanda ukuhlela okuphikisana nomthombo wesiNgisi ngaphansi `website/docs/`; ithuluzi le-maintainer lidlulisa izibuyekezo kuma-locale amanye.
  IsiNgisi siyinsiza eqinile yokuhumusha; izibuyekezo zokuhumusha ziqoqwa kwi-EN phakathi nokusebenza kwe-maintainer.

### Ikhasi eliyinhloko, Navbar, UI ye-Footer

- Lezi zintambo zihlala ku `website/i18n/en/code.json` futhi zihunyushwa kuzo zonke izilimi nge-task yokugcinwa:
  - `make translate_web_index` (udinga `OPENAI_API_KEY`)
  - Khawulela izilimi ng `OPTS="--locales de,fr"`; phinda uvale amanani existing ng `OPTS="--force"`.

### Iwebhusayithi vs. UI {#website-vs-ui}

- Ulimi lwewebhu nolimi lwe-UI yokwengeza azihambisani; i-selector yolimi ishintsha ama-docs kuphela. Ulimi lwe-UI ye-Thunderbird luhamba ngokuhlelwa kwakho kwe-Thunderbird.
