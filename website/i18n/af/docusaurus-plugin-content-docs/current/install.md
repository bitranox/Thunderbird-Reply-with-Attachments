---
id: install
title: 'Installasie'
slug: /install
sidebar_label: 'Installasie'
---

## Installasie via "Thunderbird Byvoegings en Temas" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Versie
Hierdie byvoeging ondersteun Thunderbird **128 ESR of nuwer**. Ouer weergawes word nie ondersteun nie.
:::

Dit is die aanbevole installasie metode. Byvoegings wat vanaf ATN (addons.thunderbird.net) geïnstalleer is, ontvang outomatiese opdaterings. LOCAL/dev installasies word nie outomaties ge-update nie.

- Minimum Thunderbird weergawe: 128 ESR of nuwer.

1. In Thunderbird, gaan na **Gereedskap > Byvoegings en Temas**.
2. Soek na "antwoord met lêers".
3. Voeg die byvoeging by.

Of open die byvoeging bladsy direk: [Thunderbird Byvoegings (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Handmatige installasie vanaf XPI {#local-installation-in-thunderbird}

### Laai die XPI-lêer af {#download-the-xpi-file}

1. Gaan na die [Thunderbird Byvoeging bladsy](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Laai die nuutste weergawe van die byvoeging af as 'n XPI-lêer (`reply_with_attachments-x.y.z-tb.xpi`).

### Installeer in Thunderbird {#install-in-thunderbird-local}

1. Maak Thunderbird oop.
2. Gaan na **Gereedskap > Byvoegings en Temas**.
3. In die **Byvoegingsbestuurder**, klik op die ratikoon in die boonste regterhoek.
4. Kies **Installeer Byvoeging vanaf Lêer…** vanaf die spyskaart.
5. Kies die afgelaaide `reply_with_attachments-x.y.z-tb.xpi` lêer.
6. Bevestig die installasie wanneer gevra.

---

## Installasie vir ontwikkeling {#installation-for-development}

### Laai die repo af {#download-the-repository}

1. Laai die nuutste weergawe van die GitHub-repository af.
2. Voer `make help` uit vir meer inligting.

### Installeer in Thunderbird {#install-in-thunderbird-dev}

1. Maak Thunderbird oop.
2. Gaan na **Gereedskap > Byvoegings en Temas**.
3. In die **Byvoegingsbestuurder**, klik op die ratikoon in die boonste regterhoek.
4. Kies **Installeer Byvoeging vanaf Lêer…** vanaf die spyskaart.
5. Kies die gegenereerde lêer `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bevestig die installasie wanneer gevra.

Nota: As Thunderbird nie die `.zip` op jou stelsel aanvaar nie, hernoem dit na `.xpi` en probeer weer "Installeer Byvoeging vanaf Lêer…".

### Waar om die LOCAL ZIP te vind {#where-local-zip}

- Eerstens, verpak die byvoeging: voer `make pack` in die repo-wortel uit.
- Na verpakking, vind die “LOCAL” zip in die repo-wortel (bv. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Voor herverpakking vir toetsing, verhoog weergawes in beide `sources/manifest_ATN.json` en `sources/manifest_LOCAL.json`.

---

## Deaktiveer, Verwyder, en Opdaterings {#disable-uninstall-updates}

- Deaktiveer: Thunderbird → Gereedskap → Byvoegings en Temas → vind die byvoeging → skakel af.
- Verwyder: dieselfde weergawe → drie-punt-spyskaart → Verwyder.
- Opdaterings: ATN installasies outomaties opdatering wanneer nuwe weergawes goedgekeur word. LOCAL/dev installasies word nie outomaties ge-update nie; installeer 'n nuwe LOCAL bou handmatig.
- Verwyder instellings volledig: sien [Privaatheid → Data verwydering](privacy#data-removal).

Sien ook

- [Vinnige begin](quickstart)
