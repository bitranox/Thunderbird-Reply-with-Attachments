---
id: languages
title: 'Idiomas'
sidebar_label: 'Idiomas'
---

---

## Idiomas

Esta lista refleja tanto las traducciones de la documentación del sitio web como las cadenas de la interfaz de usuario de los complementos.
Compatibilidad masiva de idiomas gracias a las herramientas de traducción con IA — cubre 100 idiomas.

La lista a continuación está ordenada por el código de idioma.

Consulta también: el [Glosario](glossary) para los términos canónicos de la IU usados en todos los idiomas.

---

## Lista de idiomas {#language-list}

- `af`: afrikáans (af-ZA)
- `ak`: akan (ak-GH)
- `am`: amhárico (am-ET)
- `ar`: árabe (ar)
- `as`: asamés (as-IN)
- `az`: azerbaiyano (az-AZ)
- `be`: bielorruso (be-BY)
- `bg`: búlgaro (bg-BG)
- `bm`: bambara (bm-ML)
- `bn`: bengalí (bn-BD)
- `bs`: bosnio (bs-BA)
- `ca`: catalán (ca-ES)
- `cs`: checo (cs-CZ)
- `da`: danés (da-DK)
- `de`: alemán (de-DE)
- `el`: griego (el-GR)
- `en`: inglés (en-US)
- `es`: español (es-ES)
- `et`: estonio (et-EE)
- `fa`: persa (farsi) (fa-IR)
- `ff`: fula (ff-SN)
- `fi`: finés (fi-FI)
- `fr`: francés (fr-FR)
- `ga`: irlandés (ga-IE)
- `gu`: guyaratí (gu-IN)
- `ha`: hausa (ha-NG)
- `he`: hebreo (he-IL)
- `hi`: hindi (hi-IN)
- `hr`: croata (hr-HR)
- `ht`: criollo haitiano (ht-HT)
- `hu`: húngaro (hu-HU)
- `hy`: armenio (hy-AM)
- `id`: indonesio (id-ID)
- `ig`: igbo (ig-NG)
- `is`: islandés (is-IS)
- `it`: italiano (it-IT)
- `ja`: japonés (ja-JP)
- `jv`: javanés (jv-ID)
- `ka`: georgiano (ka-GE)
- `kk`: kazajo (kk-KZ)
- `km`: jemer (km-KH)
- `kn`: canarés (kn-IN)
- `ko`: coreano (ko-KR)
- `ks`: cachemir (ks-IN)
- `ku`: kurdo (ku-TR)
- `ky`: kirguís (ky-KG)
- `ln`: lingala (ln-CD)
- `lo`: lao (lo-LA)
- `lt`: lituano (lt-LT)
- `lv`: letón (lv-LV)
- `mg`: malgache (mg-MG)
- `ml`: malayalam (ml-IN)
- `mn`: mongol (mn-MN)
- `mr`: maratí (mr-IN)
- `ms`: malayo (ms-MY)
- `my`: birmano (my-MM)
- `ne`: nepalí (ne-NP)
- `nl`: neerlandés (nl-NL)
- `no`: noruego (no-NO)
- `ny`: chichewa (ny-MW)
- `om`: oromo (om-ET)
- `or`: odia (or-IN)
- `pa`: panyabí (pa-IN)
- `pl`: polaco (pl-PL)
- `ps`: pastún (ps-AF)
- `pt`: portugués (pt-PT)
- `qu`: quechua (qu-PE)
- `rn`: kirundi (rn-BI)
- `ro`: rumano (ro-RO)
- `ru`: ruso (ru-RU)
- `rw`: kinyaruanda (rw-RW)
- `sd`: sindí (sd-PK)
- `si`: cingalés (si-LK)
- `sk`: eslovaco (sk-SK)
- `sl`: esloveno (sl-SI)
- `sn`: shona (sn-ZW)
- `so`: somalí (so-SO)
- `sq`: albanés (sq-AL)
- `sr`: serbio (sr-RS)
- `su`: sundanés (su-ID)
- `sv`: sueco (sv-SE)
- `sw`: suajili (sw-TZ)
- `ta`: tamil (ta-IN)
- `te`: telugu (te-IN)
- `tg`: tayiko (tg-TJ)
- `th`: tailandés (th-TH)
- `ti`: tigriña (ti-ER)
- `tk`: turcomano (tk-TM)
- `tl`: tagalo (tl-PH)
- `tr`: turco (tr-TR)
- `ug`: uigur (ug-CN)
- `uk`: ucraniano (uk-UA)
- `ur`: urdu (ur-PK)
- `uz`: uzbeko (uz-UZ)
- `vi`: vietnamita (vi-VN)
- `wo`: wolof (wo-SN)
- `xh`: xhosa (xh-ZA)
- `yo`: yoruba (yo-NG)
- `zh`: chino (zh)
- `zu`: zulú (zu-ZA)

Consejo: Cambia el idioma de la documentación mediante el selector de idioma en el encabezado del sitio (el prefijo de la URL cambia en consecuencia). El idioma de la interfaz de Thunderbird es independiente del idioma del sitio web y sigue la configuración de Thunderbird.

Redirección de la página de inicio

- Si el sitio se compila con el idioma preferido de tu navegador, al visitar la URL base de la documentación bajo el baseUrl del proyecto se te redirigirá automáticamente a ese idioma. Usa el selector de idioma (o `/en/`) para permanecer en inglés.

---

## Contribuir con traducciones {#contribute-translations}

- ¿Encontraste un problema en una traducción? Abre una incidencia en GitHub o un PR.
- Prefiere realizar ediciones sobre la fuente en inglés en `website/docs/`; las herramientas del mantenedor propagan las actualizaciones a otros idiomas.
  El inglés es la fuente de verdad para la documentación; las actualizaciones de traducción se extraen desde EN durante el flujo de trabajo del mantenedor.

### Página de inicio, barra de navegación y pie de página de la IU

- Estas cadenas se encuentran en `website/i18n/en/code.json` y se traducen a todos los idiomas mediante la tarea del mantenedor:
  - `make translate_web_index` (requiere `OPENAI_API_KEY`)
  - Limita los idiomas con `OPTS="--locales de,fr"`; sobrescribe los valores existentes con `OPTS="--force"`.

### Sitio web vs. IU {#website-vs-ui}

- El idioma del sitio web y el de la IU del complemento son independientes; el selector de idioma solo cambia la documentación. El idioma de la IU de Thunderbird sigue la configuración de Thunderbird.

---
