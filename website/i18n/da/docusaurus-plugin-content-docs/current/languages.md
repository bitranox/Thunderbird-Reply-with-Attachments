---
id: languages
title: 'Sprog'
sidebar_label: 'Sprog'
---

## Languages

Denne liste afspejler både oversættelser af hjemmeside-dokumentation og tilføjelser til UI-strenge.  
Masser af sprogunderstøttelse, takket være AI-oversættelsesværktøjer — dækker 100 sprog.

Listen nedenfor er sorteret efter sprogkode.

Se også: [Glossary](glossary) for kanoniske UI-termer brugt på tværs af lokaler.

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

Tip: Skift dokumenternes sprog via sprogvalgslisten i site-headeren (URL-præfikset ændres derefter). Thunderbird’s UI-sprog er uafhængigt af hjemmesidesproget og følger dine Thunderbird-indstillinger.

Landing page redirect

- Hvis siden er bygget med din browsers præfererede sprog, omdirigeres besøg til base-dokument-URL’en under projektets baseUrl automatisk til det sprog. Brug sprogskifteren (eller `/en/`) for at forblive på engelsk.

---

## Contribute Translations {#contribute-translations}

- Har du fundet et problem i en oversættelse? Åbn venligst et GitHub-issue eller PR.
- Foretrækker redigeringer mod den engelske kilde under `website/docs/`; vedligeholderens værktøjer videregiver opdateringer til andre lokaler.  
  Engelsk er sandhedens kilde for dokumentation; oversættelsesopdateringer hentes fra EN under vedligeholderens arbejdsproces.

### Homepage, Navbar, Footer UI

- Disse strenge findes i `website/i18n/en/code.json` og oversættes til alle lokaler via vedligeholdelsesopgaven:
  - `make translate_web_index` (kræver `OPENAI_API_KEY`)
  - Begræns sprog med `OPTS="--locales de,fr"`; overskriv eksisterende værdier med `OPTS="--force"`.

### Website vs. UI {#website-vs-ui}

- Hjemmesidens sprog og add-on UI-sprog er uafhængige; sprogvalgslisten ændrer kun dokumenterne. Thunderbird’s UI-sprog følger dine Thunderbird-indstillinger.
