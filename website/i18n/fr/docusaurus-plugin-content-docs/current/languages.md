---
id: languages
title: 'Langues'
sidebar_label: 'Langues'
---

## Languages

Cette liste reflète à la fois les traductions de la documentation du site web et les chaînes d'interface utilisateur supplémentaires.
Un support massif des langues, grâce aux outils de traduction AI — couvrant 100 langues.

La liste ci-dessous est triée par le code de langue.

Voir aussi : le [Glossaire](glossary) pour les termes UI canoniques utilisés à travers les localisations.

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

Astuce : Changez la langue des docs via le sélecteur de langue dans l'en-tête du site (le préfixe de l'URL change en conséquence). La langue de l'interface utilisateur de Thunderbird est indépendante de la langue du site web et suit vos paramètres Thunderbird.

Redirection de la page d'accueil

- Si le site est construit avec la langue préférée de votre navigateur, visiter l'URL de base des docs sous le baseUrl du projet redirige automatiquement vers cette langue. Utilisez le sélecteur de langue (ou `/en/`) pour rester en anglais.

---

## Contribute Translations {#contribute-translations}

- Vous avez trouvé un problème dans une traduction ? Veuillez ouvrir un problème ou une PR sur GitHub.
- Préférez les modifications contre la source anglaise sous `website/docs/`; l'outil du mainteneur propage les mises à jour vers d'autres langues.
  L'anglais est la source de vérité pour la documentation ; les mises à jour de traduction sont récupérées de l'EN pendant le flux de travail du mainteneur.

### Homepage, Navbar, Footer UI

- Ces chaînes vivent dans `website/i18n/en/code.json` et sont traduites dans toutes les langues via la tâche du mainteneur:
  - `make translate_web_index` (requiert `OPENAI_API_KEY`)
  - Limitez les langues avec `OPTS="--locales de,fr"`; écrasez les valeurs existantes avec `OPTS="--force"`.

### Website vs. UI {#website-vs-ui}

- La langue du site web et la langue de l'interface utilisateur additionnelle sont indépendantes; le sélecteur de langue change uniquement les docs. La langue de l'interface utilisateur de Thunderbird suit vos paramètres Thunderbird.

---
