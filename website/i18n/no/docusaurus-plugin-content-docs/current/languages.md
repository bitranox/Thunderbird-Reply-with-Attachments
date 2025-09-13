---
id: languages
title: 'Språk'
sidebar_label: 'Språk'
---

## Languages

Denne listen gjenspeiler både nettsidedokumentasjonsoversettelser og tillegg UI-strenger.
Massiv språkstøtte, takket være AI-oversettelsesverktøy — dekker 100 språk.

Listen nedenfor er sortert etter språk-koden.

Se også: [Glosar](glossary) for kanoniske UI-termer brukt på tvers av lokale.

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

Tips: Bytt språket i dokumentasjonen via språkvælgeren i nettstedets toppmeny (URL-prefiksen endres tilsvarende). Thunderbird sin UI-språk er uavhengig av nettstedsspråket og følger innstillingene dine for Thunderbird.

Landing side omdirigering

- Hvis nettstedet er bygget med nettleserens foretrukne språk, vil besøk på base-dokumentasjons-URL under prosjektets baseUrl automatisk omdirigere til det språket. Bruk språkvælgeren (eller `/en/`) for å forbli på engelsk.

---

## Contribute Translations {#contribute-translations}

- Fant du et problem med en oversettelse? Vennligst åpne en GitHub-issue eller PR.
- Foretrekker redigeringer mot den engelske kilden under `website/docs/`; vedlikeholderenes verktøy sprer oppdateringer til andre språk.
  Engelsk er sannheten bak dokumentasjonen; oversettingsoppdateringer hentes fra EN under vedlikeholderens arbeidsflyt.

### Homepage, Navbar, Footer UI

- Disse stringene finnes i `website/i18n/en/code.json` og oversettes til alle språk via vedlikeholderen:
  - `make translate_web_index` (krever `OPENAI_API_KEY`)
  - Begrens språk med `OPTS="--locales de,fr"`; overskriv eksisterende verdier med `OPTS="--force"`.

### Website vs. UI {#website-vs-ui}

- Nettstedets språk og tillegg UI-språk er uavhengige; språkvælgeren endrer bare dokumentene. Thunderbird sin UI-språk følger innstillingene dine for Thunderbird.

---
