---
id: install
title: 'Paigaldamine'
slug: /install
sidebar_label: 'Paigaldamine'
---

---

## Paigaldamine "Thunderbirdi lisad ja teemad" kaudu {#installation-in-thunderbird-recommended}

:::important Minimaalne Thunderbirdi versioon
See lisandmoodul toetab Thunderbirdi versiooni **128 ESR või uuemat**. Vanemad versioonid ei ole toetatud.
:::

See on soovitatav paigaldusmeetod. ATN-ist (addons.thunderbird.net) paigaldatud lisad saavad automaatsed värskendused. LOCAL/dev-paigaldused ei uuene automaatselt.

- Minimaalne Thunderbirdi versioon: 128 ESR või uuem.

1. Thunderbirdis avage **Tööriistad > Lisad ja teemad**.
2. Otsige „reply with attachments”.
3. Lisage lisandmoodul.

Või avage lisandmooduli leht otse: [Thunderbirdi lisad (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Käsitsi paigaldamine XPI-st {#local-installation-in-thunderbird}

### Laadi alla XPI-fail {#download-the-xpi-file}

1. Minge [Thunderbirdi lisandmooduli lehele](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Laadige alla lisandmooduli uusim versioon XPI-failina (`reply_with_attachments-x.y.z-tb.xpi`).

### Paigaldamine Thunderbirdis {#install-in-thunderbird-local}

1. Avage Thunderbird.
2. Avage **Tööriistad > Lisad ja teemad**.
3. **Lisade halduris** klõpsake paremas ülanurgas hammasratta ikooni.
4. Valige menüüst **Paigalda lisandmoodul failist…**.
5. Valige allalaaditud `reply_with_attachments-x.y.z-tb.xpi` fail.
6. Kinnitage paigaldus, kui küsitakse.

---

## Paigaldamine arenduseks {#installation-for-development}

### Laadi hoidla alla {#download-the-repository}

1. Laadige alla GitHubi hoidla uusim versioon.
2. Käivitage `make help` lisateabe saamiseks.

### Paigaldamine Thunderbirdis {#install-in-thunderbird-dev}

1. Avage Thunderbird.
2. Avage **Tööriistad > Lisad ja teemad**.
3. **Lisade halduris** klõpsake paremas ülanurgas hammasratta ikooni.
4. Valige menüüst **Paigalda lisandmoodul failist…**.
5. Valige loodud fail `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Kinnitage paigaldus, kui küsitakse.

Märkus: Kui Thunderbird ei aktsepteeri teie süsteemis faili `.zip`, nimetage see ümber failiks `.xpi` ja proovige uuesti “Paigalda lisandmoodul failist…”.

### Kust leida LOCAL ZIP {#where-local-zip}

- Kõigepealt pakige lisandmoodul: käivitage `make pack` hoidla juurkaustas.
- Pärast pakkimist leiate “LOCAL” zip-faili hoidla juurkaustast (nt `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Enne testimiseks uuesti pakkimist tõstke versiooninumbreid nii failis `sources/manifest_ATN.json` kui ka failis `sources/manifest_LOCAL.json`.

---

## Keelamine, eemaldamine ja värskendused {#disable-uninstall-updates}

- Keela: Thunderbird → Tööriistad → Lisad ja teemad → leidke lisandmoodul → lülitage välja.
- Desinstalli: samas vaates → kolmepunkti-menüü → Eemalda.
- Värskendused: ATN-ist paigaldused uuenevad automaatselt, kui uued versioonid on heaks kiidetud. LOCAL/dev-paigaldused ei uuene automaatselt; paigaldage uus LOCAL-kooste käsitsi.
- Seadete täielik eemaldamine: vt [Privaatsus → Andmete eemaldamine](privacy#data-removal).

Vaata ka

- [Kiirjuhend](quickstart)
