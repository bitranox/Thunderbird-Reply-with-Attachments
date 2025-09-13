---
id: languages
title: 'Lingue'
sidebar_label: 'Lingue'
---

## Lingue

Questo elenco riflette sia le traduzioni della documentazione del sito web che le stringhe dell'interfaccia utente aggiuntive.
Ampio supporto linguistico, grazie agli strumenti di traduzione AI — coprendo 100 lingue.

L'elenco sottostante è ordinato per codice lingua.

Vedi anche: il [Glossario](glossary) per i termini UI canonici usati in tutte le lingue.

---

## Elenco delle lingue {#language-list}

- `af`: Afrikaans (af-ZA)
- `ak`: Akan (ak-GH)
- `am`: Amharico (am-ET)
- `ar`: Arabo (ar)
- `as`: Assamese (as-IN)
- `az`: Azero (az-AZ)
- `be`: Bielorusso (be-BY)
- `bg`: Bulgaro (bg-BG)
- `bm`: Bambara (bm-ML)
- `bn`: Bengalese (bn-BD)
- `bs`: Bosniaco (bs-BA)
- `ca`: Catalano (ca-ES)
- `cs`: Ceco (cs-CZ)
- `da`: Danese (da-DK)
- `de`: Tedesco (de-DE)
- `el`: Greco (el-GR)
- `en`: Inglese (en-US)
- `es`: Spagnolo (es-ES)
- `et`: Estone (et-EE)
- `fa`: Persiano (Farsi) (fa-IR)
- `ff`: Fulah (ff-SN)
- `fi`: Finlandese (fi-FI)
- `fr`: Francese (fr-FR)
- `ga`: Irlandese (ga-IE)
- `gu`: Gujarati (gu-IN)
- `ha`: Hausa (ha-NG)
- `he`: Ebraico (he-IL)
- `hi`: Hindi (hi-IN)
- `hr`: Croato (hr-HR)
- `ht`: Creolo haitiano (ht-HT)
- `hu`: Ungherese (hu-HU)
- `hy`: Armeno (hy-AM)
- `id`: Indonesiano (id-ID)
- `ig`: Igbo (ig-NG)
- `is`: Islandese (is-IS)
- `it`: Italiano (it-IT)
- `ja`: Giapponese (ja-JP)
- `jv`: Giavanese (jv-ID)
- `ka`: Georgiano (ka-GE)
- `kk`: Kazako (kk-KZ)
- `km`: Khmer (km-KH)
- `kn`: Kannada (kn-IN)
- `ko`: Coreano (ko-KR)
- `ks`: Kashmiri (ks-IN)
- `ku`: Curdo (ku-TR)
- `ky`: Kirghizo (ky-KG)
- `ln`: Lingala (ln-CD)
- `lo`: Lao (lo-LA)
- `lt`: Lituano (lt-LT)
- `lv`: Lettone (lv-LV)
- `mg`: Malgascio (mg-MG)
- `ml`: Malayalam (ml-IN)
- `mn`: Mongolo (mn-MN)
- `mr`: Marathi (mr-IN)
- `ms`: Malese (ms-MY)
- `my`: Birmano (my-MM)
- `ne`: Nepalese (ne-NP)
- `nl`: Olandese (nl-NL)
- `no`: Norvegese (no-NO)
- `ny`: Chichewa (ny-MW)
- `om`: Oromo (om-ET)
- `or`: Odia (or-IN)
- `pa`: Punjabi (pa-IN)
- `pl`: Polacco (pl-PL)
- `ps`: Pashto (ps-AF)
- `pt`: Portoghese (pt-PT)
- `qu`: Quechua (qu-PE)
- `rn`: Kirundi (rn-BI)
- `ro`: Rumeno (ro-RO)
- `ru`: Russo (ru-RU)
- `rw`: Kinyarwanda (rw-RW)
- `sd`: Sindhi (sd-PK)
- `si`: Singhala (si-LK)
- `sk`: Slovacco (sk-SK)
- `sl`: Sloveno (sl-SI)
- `sn`: Shona (sn-ZW)
- `so`: Somalo (so-SO)
- `sq`: Albanese (sq-AL)
- `sr`: Serbo (sr-RS)
- `su`: Sundanese (su-ID)
- `sv`: Svedese (sv-SE)
- `sw`: Swahili (sw-TZ)
- `ta`: Tamil (ta-IN)
- `te`: Telugu (te-IN)
- `tg`: Tagiko (tg-TJ)
- `th`: Tailandese (th-TH)
- `ti`: Tigrino (ti-ER)
- `tk`: Turkmeno (tk-TM)
- `tl`: Tagalog (tl-PH)
- `tr`: Turco (tr-TR)
- `ug`: Uiguro (ug-CN)
- `uk`: Ucraino (uk-UA)
- `ur`: Urdu (ur-PK)
- `uz`: Uzbeko (uz-UZ)
- `vi`: Vietnamita (vi-VN)
- `wo`: Wolof (wo-SN)
- `xh`: Xhosa (xh-ZA)
- `yo`: Yoruba (yo-NG)
- `zh`: Cinese (zh)
- `zu`: Zulu (zu-ZA)

Suggerimento: Cambia la lingua della documentazione tramite il selettore di lingua nell'intestazione del sito (il prefisso dell'URL cambia di conseguenza). La lingua dell'interfaccia di Thunderbird è indipendente dalla lingua del sito web e segue le impostazioni di Thunderbird.

Reindirizzamento della pagina di atterraggio

- Se il sito è costruito con la lingua preferita del tuo browser, visitare l'URL di base della documentazione sotto il baseUrl del progetto reindirizza automaticamente a quella lingua. Usa il selettore di lingua (o `/en/`) per rimanere in inglese.

---

## Contribuire alle traduzioni {#contribute-translations}

- Hai trovato un problema in una traduzione? Si prega di aprire un problema o una PR su GitHub.
- Preferisci modifiche contro la fonte inglese sotto `website/docs/`; gli strumenti del manutentore propagano gli aggiornamenti in altre lingue.
  L'inglese è la fonte di verità per la documentazione; gli aggiornamenti delle traduzioni vengono estratti dall'inglese durante il flusso di lavoro del manutentore.

### Homepage, Navbar, Interfaccia Footer

- Queste stringhe si trovano in `website/i18n/en/code.json` e sono tradotte in tutte le lingue tramite il compito del manutentore:
  - `make translate_web_index` (richiede `OPENAI_API_KEY`)
  - Limita le lingue con `OPTS="--locales de,fr"`; sovrascrivi i valori esistenti con `OPTS="--force"`.

### Sito web vs. UI {#website-vs-ui}

- La lingua del sito web e la lingua dell'interfaccia aggiuntiva sono indipendenti; il selettore di lingua cambia solo la documentazione. La lingua dell'interfaccia di Thunderbird segue le tue impostazioni di Thunderbird.
