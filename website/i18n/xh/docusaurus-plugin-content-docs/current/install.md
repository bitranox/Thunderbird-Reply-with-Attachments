---
id: install
title: 'Ufakelo'
slug: /install
sidebar_label: 'Ufakelo'
---

---

## Ufakelo ngokusebenzisa "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Ubuncinane benguqulelo yeThunderbird
Esi songezo sixhasa iThunderbird **128 ESR okanye entsha ngakumbi**. Iinguqulelo ezindala azixhaswa.
:::

Le yeyona ndlela icetyiswayo yokufaka. Izongezelelo ezifakwe ukusuka ku‑ATN (addons.thunderbird.net) zifumana uhlaziyo oluzenzekelayo. Ufakelo lwe LOCAL/dev aluhlaziyeki ngokuzenzekelayo.

- Inguqulelo encinci efunekayo yeThunderbird: 128 ESR okanye entsha ngakumbi.

1. Kwi‑Thunderbird, yiya ku **Tools > Add-ons and Themes**.
2. Khangela "reply with attachments".
3. Yongeza isongezo.

Okanye vula iphepha lesongezo ngqo: [Izongezwa ze‑Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ufakelo ngesandla ukusuka kwi-XPI {#local-installation-in-thunderbird}

### Khuphela ifayile ye-XPI {#download-the-xpi-file}

1. Yiya kwiphepha le [Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Khuphela olu guqulelo lwamva nje lwesongezo njengefayile ye-XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Faka kwi-Thunderbird {#install-in-thunderbird-local}

1. Vula iThunderbird.
2. Yiya ku **Tools > Add-ons and Themes**.
3. Kwi **Add-ons Manager**, cofa uphawu lwegiya ekona ephezulu ekunene.
4. Khetha **Install Add-on From File…** kwimenyu.
5. Khetha ifayile `reply_with_attachments-x.y.z-tb.xpi` ekhutshelweyo.
6. Qinisekisa ufakelo xa ucelwe.

---

## Ufakelo lokuphuhliso {#installation-for-development}

### Khuphela indawo yogcino {#download-the-repository}

1. Khuphela uguqulelo lwamva nje lwendawo yogcino yeGitHub.
2. Qhuba `make help` ukuze ufumane ulwazi olungakumbi.

### Faka kwi-Thunderbird {#install-in-thunderbird-dev}

1. Vula iThunderbird.
2. Yiya ku **Tools > Add-ons and Themes**.
3. Kwi **Add-ons Manager**, cofa uphawu lwegiya ekona ephezulu ekunene.
4. Khetha **Install Add-on From File…** kwimenyu.
5. Khetha ifayile eyenziwe `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Qinisekisa ufakelo xa ucelwe.

Qaphela: Ukuba iThunderbird ayiyamkeli i `.zip` kwinkqubo yakho, yitshinthe igama uyenze `.xpi` uze uzame kwakhona “Install Add‑on From File…”.

### Apho ungafumana i-LOCAL ZIP {#where-local-zip}

- Okokuqala, paka isongezo: qhuba `make pack` kwingcambu yendawo yogcino.
- Emva kokupakisha, fumana i‑zip “LOCAL” kwingcambu yendawo yogcino (umz., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ngaphambi kokupakisha kwakhona ukuze kuvavanywe, nyusa iinguqulelo ku `sources/manifest_ATN.json` no `sources/manifest_LOCAL.json`.

---

## Khubaza, Susa, noHlaziyo {#disable-uninstall-updates}

- Khubaza: Thunderbird → Tools → Add‑ons and Themes → fumana isongezo → yicime.
- Susa: umbono ofanayo → imenyu yamachokoza amathathu → Remove.
- Uhlaziyo: Ufakelo oluvela ku‑ATN luhlaziya ngokuzenzekelayo xa iinguqulelo ezintsha zivunyiwe. Ufakelo lwe LOCAL/dev aluhlaziyeki ngokuzenzekelayo; faka kwakhona ngesandla i LOCAL build entsha.
- Susa useto ngokupheleleyo: bona [Ubumfihlo → Ukususwa kwedatha](privacy#data-removal).

Jonga kananjalo

- [Isiqalo esikhawulezayo](quickstart)
