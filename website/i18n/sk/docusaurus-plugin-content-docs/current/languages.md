---
id: languages
title: 'Jazyky'
sidebar_label: 'Jazyky'
---

## Jazyky

Tento zoznam zohľadňuje preklady dokumentácie webovej stránky a doplnkových používateľských rozhraní.
Masívna podpora jazykov vďaka AI prekladovým nástrojom — pokrýva 100 jazykov.

Zoznam nižšie je usporiadaný podľa jazykového kódu.

Pozrite si tiež: [Glosár](glossary) pre kanonické termíny používateľského rozhrania používané vo všetkých lokalitách.

---

## Zoznam jazykov {#language-list}

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

Tip: Prepnite locale dokumentácie pomocou meniča jazykov v hlavičke stránky (URL prefix sa zodpovedajúcim spôsobom zmení). Jazyk používateľského rozhrania Thunderbird je nezávislý od jazyka webovej stránky a nasleduje vaše nastavenia Thunderbird.

Presmerovanie na vstupnú stránku

- Ak je stránka vytvorená s preferovaným jazykom vášho prehliadača, návšteva základného URL dokumentácie pod základným URL projektu automaticky presmeruje na tento jazyk. Použite prepínač jazykov (alebo `/en/`), aby ste zostali v angličtine.

---

## Prispieť k prekladom {#contribute-translations}

- Našli ste problém v preklade? Prosím, otvorí GitHub issue alebo PR.
- Preferujte úpravy voči anglickému zdroju pod `website/docs/`; nástroje správcov šíria aktualizácie do ďalších jazykov.
  Angličtina je zdrojom pravdy pre dokumentáciu; aktualizácie prekladu sa získavajú z EN počas pracovného postupu správcov.

### Domovská stránka, navigačný panel, dolné menu UI

- Tieto reťazce sú uložené v `website/i18n/en/code.json` a sú preložené do všetkých jazykov prostredníctvom úlohy správcov:
  - `make translate_web_index` (vyžaduje `OPENAI_API_KEY`)
  - Obmedzte jazyky pomocou `OPTS="--locales de,fr"`; prepíšte existujúce hodnoty pomocou `OPTS="--force"`.

### Webová stránka vs. UI {#website-vs-ui}

- Jazyk webovej stránky a jazyk doplnkového používateľského rozhrania sú nezávislé; výber jazyka mení iba dokumentáciu. Jazyk používateľského rozhrania Thunderbird nasleduje vaše nastavenia Thunderbird.
