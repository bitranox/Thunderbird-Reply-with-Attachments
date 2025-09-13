---
id: languages
title: 'Tale'
sidebar_label: 'Tale'
---

## Tale

Hierdie lys weerspieël beide webwerf dokumentasie vertalings en addisionele UI stringe.  
Massiewe taalondersteuning, danksy KI vertaaltoepassings — wat 100 tale dek.

Lys hieronder is gesorteer volgens die taal kode.

Sien ook: die [Gloossarium](glossary) vir kanonieke UI terme wat oor plaaslike gebruik word.

---

## Taal lys {#language-list}

- `af`: Afrikaans (af-ZA)
- `ak`: Akan (ak-GH)
- `am`: Amharies (am-ET)
- `ar`: Arabies (ar)
- `as`: Assamese (as-IN)
- `az`: Azerbeidjanies (az-AZ)
- `be`: Wit-Russies (be-BY)
- `bg`: Bulgaars (bg-BG)
- `bm`: Bambara (bm-ML)
- `bn`: Bengali (bn-BD)
- `bs`: Bosnies (bs-BA)
- `ca`: Katalan (ca-ES)
- `cs`: Tsjek (cs-CZ)
- `da`: Deens (da-DK)
- `de`: Duits (de-DE)
- `el`: Grieks (el-GR)
- `en`: Engels (en-US)
- `es`: Spaans (es-ES)
- `et`: Estonies (et-EE)
- `fa`: Persies (Farsi) (fa-IR)
- `ff`: Fulah (ff-SN)
- `fi`: Fins (fi-FI)
- `fr`: Frans (fr-FR)
- `ga`: Iers (ga-IE)
- `gu`: Gujarati (gu-IN)
- `ha`: Hausa (ha-NG)
- `he`: Hebreeus (he-IL)
- `hi`: Hindi (hi-IN)
- `hr`: Kroaties (hr-HR)
- `ht`: Haitiaanse Kreool (ht-HT)
- `hu`: Hongaars (hu-HU)
- `hy`: Armeens (hy-AM)
- `id`: Indonesies (id-ID)
- `ig`: Igbo (ig-NG)
- `is`: IJslands (is-IS)
- `it`: Italiaans (it-IT)
- `ja`: Japanees (ja-JP)
- `jv`: Javaans (jv-ID)
- `ka`: Georgies (ka-GE)
- `kk`: Kazaks (kk-KZ)
- `km`: Khmer (km-KH)
- `kn`: Kannada (kn-IN)
- `ko`: Koreaans (ko-KR)
- `ks`: Kashmiri (ks-IN)
- `ku`: Koerdies (ku-TR)
- `ky`: Kirgisies (ky-KG)
- `ln`: Lingala (ln-CD)
- `lo`: Lao (lo-LA)
- `lt`: Litouws (lt-LT)
- `lv`: Lets (lv-LV)
- `mg`: Malagasy (mg-MG)
- `ml`: Malayalam (ml-IN)
- `mn`: Mongools (mn-MN)
- `mr`: Marathi (mr-IN)
- `ms`: Maleis (ms-MY)
- `my`: Birmaans (my-MM)
- `ne`: Nepali (ne-NP)
- `nl`: Nederlands (nl-NL)
- `no`: Noors (no-NO)
- `ny`: Chichewa (ny-MW)
- `om`: Oromo (om-ET)
- `or`: Odia (or-IN)
- `pa`: Punjabi (pa-IN)
- `pl`: Pools (pl-PL)
- `ps`: Pashto (ps-AF)
- `pt`: Portugees (pt-PT)
- `qu`: Quechua (qu-PE)
- `rn`: Kirundi (rn-BI)
- `ro`: Roemeens (ro-RO)
- `ru`: Russies (ru-RU)
- `rw`: Kinyarwanda (rw-RW)
- `sd`: Sindhi (sd-PK)
- `si`: Singalees (si-LK)
- `sk`: Slowaaks (sk-SK)
- `sl`: Slowaaks (sl-SI)
- `sn`: Shona (sn-ZW)
- `so`: Somalies (so-SO)
- `sq`: Albanies (sq-AL)
- `sr`: Servies (sr-RS)
- `su`: Soendanese (su-ID)
- `sv`: Sweeds (sv-SE)
- `sw`: Swahili (sw-TZ)
- `ta`: Tamil (ta-IN)
- `te`: Telugu (te-IN)
- `tg`: Tadsjik (tg-TJ)
- `th`: Thai (th-TH)
- `ti`: Tigrinya (ti-ER)
- `tk`: Turkmen (tk-TM)
- `tl`: Tagalog (tl-PH)
- `tr`: Turks (tr-TR)
- `ug`: Uyghur (ug-CN)
- `uk`: Oekraïens (uk-UA)
- `ur`: Oerdoe (ur-PK)
- `uz`: Oesbek (uz-UZ)
- `vi`: Viëtnamies (vi-VN)
- `wo`: Wolof (wo-SN)
- `xh`: Xhosa (xh-ZA)
- `yo`: Yoruba (yo-NG)
- `zh`: Chinees (zh)
- `zu`: Zulu (zu-ZA)

Tip: Skakel die dokumentasie lokaliteit via die taal kieser in die webwerf kantlyn (URL voorvoegsel verander ooreenkomstig). Thunderbird se UI taal is onafhanklik van die webwerf taal en volg jou Thunderbird instellings.

Landing bladsy herleiding

- As die webwerf gebou is met jou blaarkies voorkeur lokaliteit, gaan na die basis dokumentasie URL onder die projek se basisUrl herlei dit outomaties na daardie lokaliteit. Gebruik die taal kieser (of `/en/`) om in Engels te bly.

---

## Dra by Vertalings {#contribute-translations}

- 'n Fout gevind in 'n vertaling? Maak asseblief 'n GitHub fout of PR oop.
- Verkies wysigings teen die Engelse bron onder `website/docs/`; die instandhouder se gereedskap versprei opdaterings na ander lokaliteite.  
  Engels is die bron van waarheid vir dokumentasie; vertaling opdaterings word uit EN getrek tydens die instandhouder se werksvloei.

### Tuisblad, Navbar, Voetnoot UI

- Hierdie stringe woon in `website/i18n/en/code.json` en is vertaal na alle lokaliteite deur die instandhouding taak:
  - `make translate_web_index` (vereis `OPENAI_API_KEY`)
  - Beperk tale met `OPTS="--locales de,fr"`; oorskry bestaande waardes met `OPTS="--force"`.

### Webwerf vs. UI {#website-vs-ui}

- Webwerf taal en add-on UI taal is onafhanklik; die taal kieser verander doks slegs. Thunderbird se UI taal volg jou Thunderbird instellings.

---
