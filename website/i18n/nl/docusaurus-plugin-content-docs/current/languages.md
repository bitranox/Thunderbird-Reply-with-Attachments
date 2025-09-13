---
id: languages
title: 'Talen'
sidebar_label: 'Talen'
---

## Talen

Deze lijst weerspiegelt zowel vertalingen van website-documentatie als extra UI-strings.
Massale ondersteuning van talen, dankzij AI-vertalingstools - 100 talen worden gedekt.

De lijst hieronder is gesorteerd op taalcode.

Zie ook: de [Glossary](glossary) voor canonieke UI-termen die in verschillende locaties worden gebruikt.

---

## Talenlijst {#language-list}

- `af`: Afrikaans (af-ZA)
- `ak`: Akan (ak-GH)
- `am`: Amhaars (am-ET)
- `ar`: Arabisch (ar)
- `as`: Assamese (as-IN)
- `az`: Azerbeidzjaans (az-AZ)
- `be`: Wit-Russisch (be-BY)
- `bg`: Bulgaars (bg-BG)
- `bm`: Bambara (bm-ML)
- `bn`: Bengali (bn-BD)
- `bs`: Bosnisch (bs-BA)
- `ca`: Catalaans (ca-ES)
- `cs`: Tsjechisch (cs-CZ)
- `da`: Deens (da-DK)
- `de`: Duits (de-DE)
- `el`: Grieks (el-GR)
- `en`: Engels (en-US)
- `es`: Spaans (es-ES)
- `et`: Ests (et-EE)
- `fa`: Perzisch (Farsi) (fa-IR)
- `ff`: Fulah (ff-SN)
- `fi`: Fins (fi-FI)
- `fr`: Frans (fr-FR)
- `ga`: Iers (ga-IE)
- `gu`: Gujarati (gu-IN)
- `ha`: Hausa (ha-NG)
- `he`: Hebreeuws (he-IL)
- `hi`: Hindi (hi-IN)
- `hr`: Kroatisch (hr-HR)
- `ht`: Haïtiaans Creools (ht-HT)
- `hu`: Hongaars (hu-HU)
- `hy`: Armeens (hy-AM)
- `id`: Indonesisch (id-ID)
- `ig`: Igbo (ig-NG)
- `is`: IJslands (is-IS)
- `it`: Italiaans (it-IT)
- `ja`: Japans (ja-JP)
- `jv`: Javaans (jv-ID)
- `ka`: Georgisch (ka-GE)
- `kk`: Kazachs (kk-KZ)
- `km`: Khmer (km-KH)
- `kn`: Kannada (kn-IN)
- `ko`: Koreaans (ko-KR)
- `ks`: Kashmiri (ks-IN)
- `ku`: Koerds (ku-TR)
- `ky`: Kirgizisch (ky-KG)
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
- `ne`: Nepalees (ne-NP)
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
- `ru`: Russisch (ru-RU)
- `rw`: Kinyarwanda (rw-RW)
- `sd`: Sindhi (sd-PK)
- `si`: Sinhala (si-LK)
- `sk`: Slowaaks (sk-SK)
- `sl`: Sloveens (sl-SI)
- `sn`: Shona (sn-ZW)
- `so`: Somalisch (so-SO)
- `sq`: Albanees (sq-AL)
- `sr`: Servisch (sr-RS)
- `su`: Soendanees (su-ID)
- `sv`: Zweeds (sv-SE)
- `sw`: Swahili (sw-TZ)
- `ta`: Tamil (ta-IN)
- `te`: Telugu (te-IN)
- `tg`: Tadzjieks (tg-TJ)
- `th`: Thais (th-TH)
- `ti`: Tigrinya (ti-ER)
- `tk`: Turkmen (tk-TM)
- `tl`: Tagalog (tl-PH)
- `tr`: Turks (tr-TR)
- `ug`: Oeigoers (ug-CN)
- `uk`: Oekraïens (uk-UA)
- `ur`: Urdu (ur-PK)
- `uz`: Oezbeeks (uz-UZ)
- `vi`: Vietnamees (vi-VN)
- `wo`: Wolof (wo-SN)
- `xh`: Xhosa (xh-ZA)
- `yo`: Yoruba (yo-NG)
- `zh`: Chinees (zh)
- `zu`: Zoeloe (zu-ZA)

Tip: Schakel de documentatie-locale via de taalselector in de site-header in (de URL-prefix verandert dienovereenkomstig). De UI-taal van Thunderbird is onafhankelijk van de taal van de website en volgt jouw Thunderbird-instellingen.

Landingpagina omleiding

- Als de site is gebouwd met de voorkeurslocale van jouw browser, wordt een bezoek aan de basis-URL van de documentatie onder de baseUrl van het project automatisch omgeleid naar die locale. Gebruik de taalschakelaar (of `/en/`) om in het Engels te blijven.

---

## Vertalingen bijdragen {#contribute-translations}

- Een probleem gevonden in een vertaling? Open een GitHub-issue of PR.
- Geef de voorkeur aan bewerkingen tegen de Engelse bron onder `website/docs/`; de tooling van de maintainer verspreidt updates naar andere locales.
  Het Engels is de waarheid voor de documentatie; vertaalupdates worden vanuit het EN gehaald tijdens de workflow van de maintainer.

### Homepage, Navbar, Footer UI

- Deze strings bevinden zich in `website/i18n/en/code.json` en worden naar alle locales vertaald via de taak van de maintainer:
  - `make translate_web_index` (vereist `OPENAI_API_KEY`)
  - Beperk talen met `OPTS="--locales de,fr"`; overschrijf bestaande waarden met `OPTS="--force"`.

### Website versus UI {#website-vs-ui}

- De taal van de website en de taal van de add-on UI zijn onafhankelijk; de taalschakelaar verandert alleen de documentatie. De UI-taal van Thunderbird volgt jouw Thunderbird-instellingen.

---
