---
id: languages
title: 'Sprachen'
sidebar_label: 'Sprachen'
---

---

## Sprachen

Diese Liste umfasst sowohl Übersetzungen der Website-Dokumentation als auch Add-on-UI-Zeichenketten.
Enorme Sprachunterstützung dank KI-Übersetzungstools — umfasst 100 Sprachen.

Die folgende Liste ist nach dem Sprachcode sortiert.

Siehe auch: das [Glossar](glossary) für kanonische UI-Begriffe, die in allen Sprachversionen verwendet werden.

---

## Sprachenliste {#language-list}

- `af`: Afrikaans (af-ZA)
- `ak`: Akan (ak-GH)
- `am`: Amharisch (am-ET)
- `ar`: Arabisch (ar)
- `as`: Assamesisch (as-IN)
- `az`: Aserbaidschanisch (az-AZ)
- `be`: Belarussisch (be-BY)
- `bg`: Bulgarisch (bg-BG)
- `bm`: Bambara (bm-ML)
- `bn`: Bengalisch (bn-BD)
- `bs`: Bosnisch (bs-BA)
- `ca`: Katalanisch (ca-ES)
- `cs`: Tschechisch (cs-CZ)
- `da`: Dänisch (da-DK)
- `de`: Deutsch (de-DE)
- `el`: Griechisch (el-GR)
- `en`: Englisch (en-US)
- `es`: Spanisch (es-ES)
- `et`: Estnisch (et-EE)
- `fa`: Persisch (Farsi) (fa-IR)
- `ff`: Fulah (ff-SN)
- `fi`: Finnisch (fi-FI)
- `fr`: Französisch (fr-FR)
- `ga`: Irisch (ga-IE)
- `gu`: Gujarati (gu-IN)
- `ha`: Hausa (ha-NG)
- `he`: Hebräisch (he-IL)
- `hi`: Hindi (hi-IN)
- `hr`: Kroatisch (hr-HR)
- `ht`: Haitianisches Kreol (ht-HT)
- `hu`: Ungarisch (hu-HU)
- `hy`: Armenisch (hy-AM)
- `id`: Indonesisch (id-ID)
- `ig`: Igbo (ig-NG)
- `is`: Isländisch (is-IS)
- `it`: Italienisch (it-IT)
- `ja`: Japanisch (ja-JP)
- `jv`: Javanisch (jv-ID)
- `ka`: Georgisch (ka-GE)
- `kk`: Kasachisch (kk-KZ)
- `km`: Khmer (km-KH)
- `kn`: Kannada (kn-IN)
- `ko`: Koreanisch (ko-KR)
- `ks`: Kaschmiri (ks-IN)
- `ku`: Kurdisch (ku-TR)
- `ky`: Kirgisisch (ky-KG)
- `ln`: Lingala (ln-CD)
- `lo`: Laotisch (lo-LA)
- `lt`: Litauisch (lt-LT)
- `lv`: Lettisch (lv-LV)
- `mg`: Madagassisch (mg-MG)
- `ml`: Malayalam (ml-IN)
- `mn`: Mongolisch (mn-MN)
- `mr`: Marathi (mr-IN)
- `ms`: Malaiisch (ms-MY)
- `my`: Birmanisch (my-MM)
- `ne`: Nepalesisch (ne-NP)
- `nl`: Niederländisch (nl-NL)
- `no`: Norwegisch (no-NO)
- `ny`: Chichewa (ny-MW)
- `om`: Oromo (om-ET)
- `or`: Odia (or-IN)
- `pa`: Pandschabi (pa-IN)
- `pl`: Polnisch (pl-PL)
- `ps`: Paschtu (ps-AF)
- `pt`: Portugiesisch (pt-PT)
- `qu`: Quechua (qu-PE)
- `rn`: Kirundi (rn-BI)
- `ro`: Rumänisch (ro-RO)
- `ru`: Russisch (ru-RU)
- `rw`: Kinyarwanda (rw-RW)
- `sd`: Sindhi (sd-PK)
- `si`: Singhalesisch (si-LK)
- `sk`: Slowakisch (sk-SK)
- `sl`: Slowenisch (sl-SI)
- `sn`: Schona (sn-ZW)
- `so`: Somali (so-SO)
- `sq`: Albanisch (sq-AL)
- `sr`: Serbisch (sr-RS)
- `su`: Sundanesisch (su-ID)
- `sv`: Schwedisch (sv-SE)
- `sw`: Suaheli (sw-TZ)
- `ta`: Tamil (ta-IN)
- `te`: Telugu (te-IN)
- `tg`: Tadschikisch (tg-TJ)
- `th`: Thailändisch (th-TH)
- `ti`: Tigrinya (ti-ER)
- `tk`: Turkmenisch (tk-TM)
- `tl`: Tagalog (tl-PH)
- `tr`: Türkisch (tr-TR)
- `ug`: Uigurisch (ug-CN)
- `uk`: Ukrainisch (uk-UA)
- `ur`: Urdu (ur-PK)
- `uz`: Usbekisch (uz-UZ)
- `vi`: Vietnamesisch (vi-VN)
- `wo`: Wolof (wo-SN)
- `xh`: Xhosa (xh-ZA)
- `yo`: Yoruba (yo-NG)
- `zh`: Chinesisch (zh)
- `zu`: Zulu (zu-ZA)

Tipp: Wechseln Sie die Dokumentationssprache über den Sprachwähler in der Kopfzeile der Website (das URL-Präfix ändert sich entsprechend). Die UI-Sprache von Thunderbird ist unabhängig von der Website-Sprache und richtet sich nach Ihren Thunderbird-Einstellungen.

Weiterleitung der Startseite

- Wenn die Seite mit der bevorzugten Sprache Ihres Browsers erstellt wurde, leitet der Aufruf der Basis-Docs-URL unter der baseUrl des Projekts automatisch zu dieser Sprache weiter. Verwenden Sie den Sprachumschalter (oder `/en/`), um auf Englisch zu bleiben.

---

## Zu Übersetzungen beitragen {#contribute-translations}

- Ein Problem in einer Übersetzung gefunden? Bitte eröffnen Sie ein GitHub-Issue oder einen Pull Request (PR).
- Nehmen Sie Änderungen bevorzugt an der englischen Quelle unter `website/docs/` vor; die Tools der Maintainer übertragen Aktualisierungen auf andere Sprachen.
  Englisch ist die maßgebliche Quelle für die Dokumentation; Übersetzungsaktualisierungen werden im Workflow der Maintainer aus EN übernommen.

### Startseite, Navigationsleiste, Fußzeile (UI)

- Diese Zeichenketten befinden sich in `website/i18n/en/code.json` und werden über die Maintainer-Aufgabe in alle Sprachen übersetzt:
  - `make translate_web_index` (erfordert `OPENAI_API_KEY`)
  - Sprachen mit `OPTS="--locales de,fr"` einschränken; vorhandene Werte mit `OPTS="--force"` überschreiben.

### Website vs. UI {#website-vs-ui}

- Website-Sprache und Add-on-UI-Sprache sind unabhängig; der Sprachwähler ändert nur die Dokumentation. Die UI-Sprache von Thunderbird richtet sich nach Ihren Thunderbird-Einstellungen.

---
