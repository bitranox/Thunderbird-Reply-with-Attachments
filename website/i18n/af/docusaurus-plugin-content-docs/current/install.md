---
id: install
title: 'Installering'
slug: /install
sidebar_label: 'Installasie'
---

---

## Installasie via "Thunderbird-byvoegsels en -Temas" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird-weergawe
Hierdie byvoeging ondersteun Thunderbird **128 ESR of nuwer**. Ouer weergawes word nie ondersteun nie.
:::

Dit is die aanbevole installasiemetode. Byvoegsels wat vanaf ATN (addons.thunderbird.net) geïnstalleer is, ontvang outomatiese bywerkings. LOCAL/dev-installasies werk nie outomaties by nie.

- Minimum Thunderbird-weergawe: 128 ESR of nuwer.

1. In Thunderbird, gaan na **Gereedskap > Byvoegsels en Temas**.
2. Soek vir "reply with attachments".
3. Voeg die byvoeging by.

Of maak die byvoegingsbladsy direk oop: [Thunderbird-byvoegsels (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Handmatige installasie vanaf XPI {#local-installation-in-thunderbird}

### Laai die XPI-lêer af {#download-the-xpi-file}

1. Gaan na die [Thunderbird-byvoegingbladsy](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Laai die nuutste weergawe van die byvoeging as ’n XPI-lêer af (`reply_with_attachments-x.y.z-tb.xpi`).

### Installeer in Thunderbird {#install-in-thunderbird-local}

1. Maak Thunderbird oop.
2. Gaan na **Gereedskap > Byvoegsels en Temas**.
3. Klik in die **Byvoegingsbestuurder** op die tandwiel-ikoon in die regs-boonste hoek.
4. Kies **Installeer byvoeging vanaf lêer…** uit die kieslys.
5. Kies die afgelaaide `reply_with_attachments-x.y.z-tb.xpi`-lêer.
6. Bevestig die installasie wanneer jy gevra word.

---

## Installasie vir ontwikkeling {#installation-for-development}

### Laai die bewaarplek af {#download-the-repository}

1. Laai die nuutste weergawe van die GitHub-bewaarplek af.
2. Voer `make help` uit vir meer inligting.

### Installeer in Thunderbird {#install-in-thunderbird-dev}

1. Maak Thunderbird oop.
2. Gaan na **Gereedskap > Byvoegsels en Temas**.
3. Klik in die **Byvoegingsbestuurder** op die tandwiel-ikoon in die regs-boonste hoek.
4. Kies **Installeer byvoeging vanaf lêer…** uit die kieslys.
5. Kies die gegenereerde lêer `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Bevestig die installasie wanneer jy gevra word.

Let wel: As Thunderbird nie die `.zip` op jou stelsel aanvaar nie, hernoem dit na `.xpi` en probeer “Installeer byvoeging vanaf lêer…” weer.

### Waar om die LOCAL ZIP te vind {#where-local-zip}

- Pak eers die byvoeging: voer `make pack` in die wortel van die bewaarplek uit.
- Na verpakking, vind die “LOCAL”-zip in die wortel van die bewaarplek (bv. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Voor herverpakking vir toetsing, verhoog die weergawes in beide `sources/manifest_ATN.json` en `sources/manifest_LOCAL.json`.

---

## Deaktiveer, Deïnstalleer en Opdaterings {#disable-uninstall-updates}

- Deaktiveer: Thunderbird → Gereedskap → Byvoegsels en Temas → vind die byvoeging → skakel dit af.
- Deïnstalleer: selfde aansig → drie‑kolletjie-kieslys → Verwyder.
- Opdaterings: ATN-installasies werk outomaties by wanneer nuwe weergawes goedgekeur word. LOCAL/dev-installasies werk nie outomaties by nie; installeer ’n nuwe LOCAL-bou handmatig weer.
- Verwyder instellings volledig: sien [Privaatheid → Data-verwydering](privacy#data-removal).

Sien ook

- [Vinnige begin](quickstart)
