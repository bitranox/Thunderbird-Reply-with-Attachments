---
id: languages
title: 'Idiomas'
sidebar_label: 'Idiomas'
---

## Languages

Esta lista reflete tanto as traduções da documentação do site quanto as strings da interface do usuário de complementos.
Suporte a muitos idiomas, graças às ferramentas de tradução de IA — abrangendo 100 idiomas.

A lista abaixo está ordenada pelo código do idioma.

Veja também: o [Glossário](glossary) para termos canônicos da interface do usuário usados em diferentes localidades.

---

## Language list {#language-list}

- `af`: Afrikaans (af-ZA)
- `ak`: Akan (ak-GH)
- `am`: Amárico (am-ET)
- `ar`: Árabe (ar)
- `as`: Assamês (as-IN)
- `az`: Azerbaijano (az-AZ)
- `be`: Bielorrusso (be-BY)
- `bg`: Búlgaro (bg-BG)
- `bm`: Bambara (bm-ML)
- `bn`: Bengali (bn-BD)
- `bs`: Bósnio (bs-BA)
- `ca`: Catalão (ca-ES)
- `cs`: Checo (cs-CZ)
- `da`: Dinamarquês (da-DK)
- `de`: Alemão (de-DE)
- `el`: Grego (el-GR)
- `en`: Inglês (en-US)
- `es`: Espanhol (es-ES)
- `et`: Estoniano (et-EE)
- `fa`: Persa (Farsi) (fa-IR)
- `ff`: Fulah (ff-SN)
- `fi`: Finlândes (fi-FI)
- `fr`: Francês (fr-FR)
- `ga`: Irlandês (ga-IE)
- `gu`: Gujarati (gu-IN)
- `ha`: Hausa (ha-NG)
- `he`: Hebraico (he-IL)
- `hi`: Hindi (hi-IN)
- `hr`: Croata (hr-HR)
- `ht`: Crioulo haitiano (ht-HT)
- `hu`: Húngaro (hu-HU)
- `hy`: Armênio (hy-AM)
- `id`: Indonésio (id-ID)
- `ig`: Igbo (ig-NG)
- `is`: Islandês (is-IS)
- `it`: Italiano (it-IT)
- `ja`: Japonês (ja-JP)
- `jv`: Javanês (jv-ID)
- `ka`: Georgiano (ka-GE)
- `kk`: Cazaque (kk-KZ)
- `km`: Khmer (km-KH)
- `kn`: Canarês (kn-IN)
- `ko`: Coreano (ko-KR)
- `ks`: Caxemira (ks-IN)
- `ku`: Curdo (ku-TR)
- `ky`: Quirguiz (ky-KG)
- `ln`: Lingala (ln-CD)
- `lo`: Lao (lo-LA)
- `lt`: Lituano (lt-LT)
- `lv`: Letão (lv-LV)
- `mg`: Malaio (mg-MG)
- `ml`: Malaialam (ml-IN)
- `mn`: Mongol (mn-MN)
- `mr`: Marathi (mr-IN)
- `ms`: Malaio (ms-MY)
- `my`: Birmanês (my-MM)
- `ne`: Nepali (ne-NP)
- `nl`: Holandês (nl-NL)
- `no`: Norueguês (no-NO)
- `ny`: Chichewa (ny-MW)
- `om`: Oromo (om-ET)
- `or`: Odia (or-IN)
- `pa`: Punjabi (pa-IN)
- `pl`: Polonês (pl-PL)
- `ps`: Pashto (ps-AF)
- `pt`: Português (pt-PT)
- `qu`: Quechua (qu-PE)
- `rn`: Kirundi (rn-BI)
- `ro`: Romeno (ro-RO)
- `ru`: Russo (ru-RU)
- `rw`: Kinyarwanda (rw-RW)
- `sd`: Sindhi (sd-PK)
- `si`: Cingalês (si-LK)
- `sk`: Eslovaco (sk-SK)
- `sl`: Esloveno (sl-SI)
- `sn`: Shona (sn-ZW)
- `so`: Somali (so-SO)
- `sq`: Albanês (sq-AL)
- `sr`: Sérvio (sr-RS)
- `su`: Sundanês (su-ID)
- `sv`: Sueco (sv-SE)
- `sw`: Suaíli (sw-TZ)
- `ta`: Tâmil (ta-IN)
- `te`: Telugu (te-IN)
- `tg`: Tajique (tg-TJ)
- `th`: Tailandês (th-TH)
- `ti`: Tigrínia (ti-ER)
- `tk`: Turcomeno (tk-TM)
- `tl`: Tagalo (tl-PH)
- `tr`: Turco (tr-TR)
- `ug`: Uigur (ug-CN)
- `uk`: Ucraniano (uk-UA)
- `ur`: Urdu (ur-PK)
- `uz`: Uzbeque (uz-UZ)
- `vi`: Vietnamita (vi-VN)
- `wo`: Wolof (wo-SN)
- `xh`: Xhosa (xh-ZA)
- `yo`: Iorubá (yo-NG)
- `zh`: Chinês (zh)
- `zu`: Zulu (zu-ZA)

Dica: Mude o idioma da documentação pelo seletor de idiomas no cabeçalho do site (o prefixo da URL muda de acordo). O idioma da interface do Thunderbird é independente do idioma do site e segue suas configurações do Thunderbird.

Redirecionamento da página inicial

- Se o site for construído com o idioma preferido do seu navegador, visitar a URL base da documentação sob o baseUrl do projeto redireciona automaticamente para esse idioma. Use o seletor de idiomas (ou `/en/`) para permanecer em inglês.

---

## Contribute Translations {#contribute-translations}

- Encontrou um problema em uma tradução? Por favor, abra uma issue ou PR no GitHub.
- Prefira edições contra a fonte em inglês em `website/docs/`; a ferramenta do mantenedor propaga atualizações para outros idiomas.
  O inglês é a fonte de verdade para a documentação; as atualizações de tradução são puxadas do EN durante o fluxo de trabalho do mantenedor.

### Homepage, Navbar, Footer UI

- Essas strings vivem em `website/i18n/en/code.json` e são traduzidas para todos os idiomas via a tarefa do mantenedor:
  - `make translate_web_index` (requer `OPENAI_API_KEY`)
  - Limitar idiomas com `OPTS="--locales de,fr"`; sobrescrever valores existentes com `OPTS="--force"`.

### Website vs. UI {#website-vs-ui}

- O idioma do site e o idioma da interface do usuário de complementos são independentes; o seletor de idiomas altera apenas a documentação. O idioma da interface do Thunderbird segue suas configurações do Thunderbird.

---
