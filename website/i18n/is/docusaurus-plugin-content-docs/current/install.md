---
id: install
title: 'Uppsetning'
slug: /install
sidebar_label: 'Uppsetning'
---

---

## Uppsetning í gegnum "Viðbætur og þemu í Thunderbird" {#installation-in-thunderbird-recommended}

:::important Lágmarksútgáfa Thunderbird
Þessi viðbót styður Thunderbird **128 ESR eða nýrri**. Eldri útgáfur eru ekki studdar.
:::

Þetta er ráðlögð uppsetningaraðferð. Viðbætur sem settar eru upp frá ATN (addons.thunderbird.net) fá sjálfvirkar uppfærslur. LOCAL/dev uppsetningar uppfærast ekki sjálfkrafa.

- Lágmarksútgáfa Thunderbird: 128 ESR eða nýrri.

1. Í Thunderbird, farðu í **Verkfæri > Viðbætur og þemu**.
2. Leitaðu að "reply with attachments".
3. Bættu við viðbótinni.

Eða opnaðu síðu viðbótarinnar beint: [Thunderbird viðbætur (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Handvirk uppsetning úr XPI {#local-installation-in-thunderbird}

### Sæktu XPI-skrána {#download-the-xpi-file}

1. Farðu á [viðbótarsíðu Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Sæktu nýjustu útgáfu viðbótarinnar sem XPI-skrá (`reply_with_attachments-x.y.z-tb.xpi`).

### Setja upp í Thunderbird {#install-in-thunderbird-local}

1. Opnaðu Thunderbird.
2. Farðu í **Verkfæri > Viðbætur og þemu**.
3. Í **Viðbótastjórinn**, smelltu á tannhjólstáknið efst til hægri.
4. Veldu **Setja upp viðbót úr skrá…** úr valmyndinni.
5. Veldu niðurhöluðu skrána `reply_with_attachments-x.y.z-tb.xpi`.
6. Staðfestu uppsetninguna þegar beðið er um það.

---

## Uppsetning fyrir þróun {#installation-for-development}

### Sækja geymsluna {#download-the-repository}

1. Sæktu nýjustu útgáfu GitHub-geymslunnar.
2. Keyrðu `make help` fyrir frekari upplýsingar.

### Setja upp í Thunderbird {#install-in-thunderbird-dev}

1. Opnaðu Thunderbird.
2. Farðu í **Verkfæri > Viðbætur og þemu**.
3. Í **Viðbótastjórinn**, smelltu á tannhjólstáknið efst til hægri.
4. Veldu **Setja upp viðbót úr skrá…** úr valmyndinni.
5. Veldu útbúna skrána `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Staðfestu uppsetninguna þegar beðið er um það.

Athugið: Ef Thunderbird samþykkir ekki `.zip` á kerfinu þínu, endurnefndu hana í `.xpi` og prófaðu „Setja upp viðbót úr skrá…“ aftur.

### Hvar er LOCAL ZIP að finna {#where-local-zip}

- Fyrst, pakkaðu viðbótinni: keyrðu `make pack` í rót geymslunnar.
- Eftir pökkun finnurðu „LOCAL“ ZIP í rót geymslunnar (t.d. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Áður en þú pakkar aftur fyrir prófanir, hækkaðu útgáfunúmer í bæði `sources/manifest_ATN.json` og `sources/manifest_LOCAL.json`.

---

## Afvirkja, fjarlægja og uppfærslur {#disable-uninstall-updates}

- Afvirkja: Thunderbird → Verkfæri → Viðbætur og þemu → finndu viðbótina → slökktu.
- Fjarlægja: sama sýn → þriggja punkta valmynd → Fjarlægja.
- Uppfærslur: Uppsetningar frá ATN uppfærast sjálfkrafa þegar nýjar útgáfur eru samþykktar. LOCAL/dev uppsetningar uppfærast ekki sjálfkrafa; settu nýja LOCAL útgáfu upp handvirkt.
- Fjarlægja stillingar alveg: sjá [Persónuvernd → Eyðing gagna](privacy#data-removal).

Sjá einnig

- [Hraðbyrjun](quickstart)
