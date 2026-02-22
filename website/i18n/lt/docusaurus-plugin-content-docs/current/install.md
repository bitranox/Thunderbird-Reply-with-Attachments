---
id: install
title: 'Diegimas'
slug: /install
sidebar_label: 'Diegimas'
---

---

## Diegimas per „Thunderbird priedus ir temas“ {#installation-in-thunderbird-recommended}

:::important Minimali Thunderbird versija
Šis priedas palaiko Thunderbird **128 ESR arba naujesnę**. Senesnės versijos nepalaikomos.
:::

Tai rekomenduojamas diegimo būdas. Iš ATN (addons.thunderbird.net) įdiegti priedai gauna automatinius atnaujinimus. LOCAL/dev diegimai neatsinaujina automatiškai.

- Minimali Thunderbird versija: 128 ESR arba naujesnė.

1. „Thunderbird“ programoje eikite į **Tools > Add-ons and Themes**.
2. Ieškokite „reply with attachments“.
3. Pridėkite priedą.

Arba atidarykite priedo puslapį tiesiogiai: [„Thunderbird“ priedai (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Rankinis diegimas iš XPI {#local-installation-in-thunderbird}

### Atsisiųskite XPI failą {#download-the-xpi-file}

1. Eikite į [„Thunderbird“ priedo puslapį](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Atsisiųskite naujausią priedo versiją kaip XPI failą (`reply_with_attachments-x.y.z-tb.xpi`).

### Diegimas „Thunderbird“ programoje {#install-in-thunderbird-local}

1. Atidarykite „Thunderbird“.
2. Eikite į **Tools > Add-ons and Themes**.
3. Lange **Add-ons Manager** spustelėkite krumpliaračio piktogramą viršutiniame dešiniajame kampe.
4. Iš meniu pasirinkite **Install Add-on From File…**.
5. Pasirinkite atsisiųstą `reply_with_attachments-x.y.z-tb.xpi` failą.
6. Kai būsite paraginti, patvirtinkite diegimą.

---

## Diegimas kūrimui {#installation-for-development}

### Atsisiųskite saugyklą {#download-the-repository}

1. Atsisiųskite naujausią „GitHub“ saugyklos versiją.
2. Paleiskite `make help` norėdami gauti daugiau informacijos.

### Diegimas „Thunderbird“ programoje {#install-in-thunderbird-dev}

1. Atidarykite „Thunderbird“.
2. Eikite į **Tools > Add-ons and Themes**.
3. Lange **Add-ons Manager** spustelėkite krumpliaračio piktogramą viršutiniame dešiniajame kampe.
4. Iš meniu pasirinkite **Install Add-on From File…**.
5. Pasirinkite sugeneruotą failą `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Kai būsite paraginti, patvirtinkite diegimą.

Pastaba: Jei „Thunderbird“ jūsų sistemoje nepriima `.zip`, pervadinkite jį į `.xpi` ir pabandykite dar kartą „Install Add‑on From File…“.

### Kur rasti LOCAL ZIP {#where-local-zip}

- Pirmiausia supakuokite priedą: paleiskite `make pack` saugyklos šaknyje.
- Supakavę, raskite „LOCAL“ zip saugyklos šaknyje (pvz., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Prieš pakartotinai pakuodami testavimui, pakelkite versijų numerius tiek `sources/manifest_ATN.json`, tiek `sources/manifest_LOCAL.json`.

---

## Išjungimas, pašalinimas ir atnaujinimai {#disable-uninstall-updates}

- Išjungti: Thunderbird → Tools → Add‑ons and Themes → raskite priedą → perjunkite į išjungtą.
- Pašalinti: tas pats vaizdas → trijų taškų meniu → Remove.
- Atnaujinimai: įdiegta iš ATN automatiškai atnaujinama, kai patvirtinamos naujos versijos. LOCAL/dev diegimai neatsinaujina automatiškai; naują LOCAL sukūrimą įdiekite rankiniu būdu.
- Visiškai pašalinti nustatymus: žr. [Privatumas → Duomenų pašalinimas](privacy#data-removal).

Taip pat žiūrėkite

- [Greita pradžia](quickstart)
