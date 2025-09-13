---
id: languages
title: 'Dillər'
sidebar_label: 'Dillər'
---

## Dillər

Bu siyahı həm vebsayt sənədlərinin tərcümələrini, həm də əlavə UI mətnlərini əks etdirir.
AI tərcümə alətləri sayəsində geniş dil dəstəyi - 100 dili əhatə edir.

Aşağıdakı siyahı dil koduna görə sıralanmışdır.

Baxın: [Lüğət](glossary) - yerli dillərdə istifadə olunan standart UI terminləri üçün.

---

## Dil siyahısı {#language-list}

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

İpucu: Saytın başlığındakı dil seçicisi vasitəsilə sənədlərin dilini dəyişdirin (URL prefiks müvafiq olaraq dəyişir). Thunderbird-in UI dili vebsayt dilindən müstəqildir və Thunderbird parametrlərinizi izləyir.

Ana səhifəyə yönləndirmə

- Əgər sayt brauzerinizin üstünlük verdiyi dil ilə qurulursa, layihənin baseUrl altında baza sənəd URL-sini ziyarət edərək avtomatik olaraq həmin dilə yönləndirilir. İngilis dilində qalmaq üçün dil seçicisini (və ya `/en/`) istifadə edin.

---

## Tercümələrə töhfə verin {#contribute-translations}

- Tərcümədə bir problem tapdınız? Zəhmət olmasa, bir GitHub məsələsi və ya PR açın.
- `website/docs/` altında İngilis mənbəyi ilə düzəlişləri üstünlük verin; baxımda olanın alətləri yeniləmələri digər dillərə göndərir.
  İngilis dili sənədlər üçün həqiqət mənbəyidir; tərcümə yeniləmələri baxıcı iş axınında EN-dən çəkilir.

### Ana səhifə, Menyu, Altlıq UI

- Bu mətnlər `website/i18n/en/code.json`-də mövcuddur və baxım işləri əsasında bütün dillərə tərcümə olunur:
  - `make translate_web_index` ( `OPENAI_API_KEY` tələb olunur)
  - `OPTS="--locales de,fr"` ilə dilləri məhdudlaşdırın; mövcud dəyərləri `OPTS="--force"` ilə üst-üstə düşürün.

### Vebsayt və UI {#website-vs-ui}

- Vebsayt dili və əlavə UI dili müstəqildir; dil seçicisi yalnız sənədləri dəyişir. Thunderbird-un UI dili Thunderbird parametrlərinizi izləyir.

---
