---
id: features
title: 'Mga Tampok'
sidebar_label: 'Mga Tampok'
---

---

## Mga Tampok {#features}

- Awtomatikong idinadagdag ang mga file mula sa orihinal na email kapag nagre-reply.
- Nako-configure ang pag-uugali: ang mga attachment ay maaaring
  - idagdag nang awtomatiko, o
  - idagdag lamang matapos ang kumpirmasyon (isang maliit at accessible na dialog). Sa Options, maaari mong
    i-enable ang kumpirmasyon at piliin ang default na sagot (Yes/No).
- Ang blacklist ng mga filename (glob patterns) ay pumipigil sa ilang partikular na file na
  maidagdag nang awtomatiko. Mga halimbawa: `*intern*`, `*secret*`, `*passwor*`.
  Ang pagtutugma ay hindi sensitibo sa laki ng titik at sinusuri lamang ang filename; magbigay ng isang pattern
  bawat linya sa Options.
- Babala ng blacklist (opsyonal, naka-enable bilang default): kapag may mga file na na-exclude ng iyong
  blacklist, magpapakita ang isang maliit na modal ng file at ng tumutugmang pattern(s). Angkop sa dark‑mode
  at accessible sa keyboard (Enter/Esc para isara).
- Gumagana sa Reply at Reply all. Ang Forward ay hindi binabago ng add-on na ito.
- Idinadagdag ang mga orihinal kahit na may naidagdag ka nang attachment; iniiwasan ang mga duplicate batay sa filename.
- Pinipigilan ng per‑tab duplicate guard ang dobleng pagdagdag sa parehong compose tab.
- Nilalaktawan ang mga sertipiko ng S/MIME bilang default upang maiwasan ang hindi kinakailangang mga attachment.
- Isama ang mga inline na larawan (default: ON). Ang mga naka-embed na larawan ay ibinabalik nang direkta sa
  katawan ng reply bilang mga base64 data URIs, pinapanatili ang orihinal na inline na layout. I-disable sa
  Options upang laktawan nang buo ang mga inline na larawan.

---

## Paano Ito Gumagana {#how-it-works}

- Kapag nagre-reply, inililista ng add-on ang mga orihinal na attachment.
- Inaalis mula sa mga file attachment ang mga S/MIME signature; ang mga inline na larawan ay ibinabalik sa katawan (maliban kung naka-disable).
- Opsyonal na humihingi ng kumpirmasyon (maginhawa sa keyboard).
- Idinadagdag ang mga angkop na file sa iyong compose, iniiwasan ang mga duplicate batay sa filename.
- Tingnan ang “Why attachments might not be added” sa Usage para sa mga edge case.

Tala sa privacy: Lahat ng pagproseso ay nagaganap nang lokal sa Thunderbird. Walang ginagawang background na network request ang add-on.

---
