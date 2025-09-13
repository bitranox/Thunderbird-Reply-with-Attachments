---
id: languages
title: 'Sprachen'
sidebar_label: 'Sprachen'
---

## Languages

Diese Liste spiegelt sowohl die Übersetzungen der Website-Dokumentation als auch die UI-Strings von Add-ons wider.
Umfassende Sprachunterstützung, dank KI-Übersetzungstools – umfasst 100 Sprachen.

Die Liste unten ist nach Sprachcode sortiert.

Siehe auch: das [Glossar](glossary) für kanonische UI-Begriffe, die in den verschiedenen Lokalisierungen verwendet werden.

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

Tipp: Wechseln Sie die Dokumentationssprache über den Sprachselector im Kopfbereich der Website (die URL-Vorlage ändert sich entsprechend). Die UI-Sprache von Thunderbird ist unabhängig von der Sprache der Website und folgt Ihren Thunderbird-Einstellungen.

Landing-Page-Weiterleitung

- Wenn die Website in der bevorzugten Sprache Ihres Browsers erstellt wurde, leitet der Zugriff auf die Basis-URL der Dokumentation unter der baseUrl des Projekts automatisch auf diese Sprache weiter. Verwenden Sie den Sprachwechsel (oder `/en/`), um in Englisch zu bleiben.

---

## Contribute Translations {#contribute-translations}

- Ein Problem bei einer Übersetzung gefunden? Bitte öffnen Sie ein GitHub-Issue oder PR.
- Bevorzugen Sie Änderungen am englischen Original unter `website/docs/`; die Werkzeuge des Wartenden propagieren Updates an andere Lokalisierungen.
  Englisch ist die Wahrheit für die Dokumentation; Übersetzungsupdates werden während des Arbeitsablaufs des Wartenden aus EN gezogen.

### Homepage, Navbar, Footer UI

- Diese Strings finden sich in `website/i18n/en/code.json` und werden über die Aufgaben des Wartenden in alle Lokalisierungen übersetzt:
  - `make translate_web_index` (erfordert `OPENAI_API_KEY`)
  - Sprachen mit `OPTS="--locales de,fr"` einschränken; vorhandene Werte mit `OPTS="--force"` überschreiben.

### Website vs. UI {#website-vs-ui}

- Die Sprache der Website und die Sprache der Add-on-Benutzeroberfläche sind unabhängig; der Sprachselector ändert nur die Dokumentation. Die UI-Sprache von Thunderbird folgt Ihren Thunderbird-Einstellungen.

---
