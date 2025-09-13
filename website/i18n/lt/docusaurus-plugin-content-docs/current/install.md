---
id: install
title: 'Diegimas'
slug: /install
sidebar_label: 'Diegimas'
---

## Diegimas per "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Minimum Thunderbird Version
Šis priedas palaiko Thunderbird **128 ESR arba naujesnę** versiją. Senesnės versijos nėra palaikomos.
:::

Tai rekomenduojamas diegimo metodas. Priedai, įdiegiami iš ATN (addons.thunderbird.net), gauna automatiškai atnaujinimus. LOCAL/dev diegimai automatiškai neatnaujinami.

- Minimum Thunderbird versija: 128 ESR arba naujesnė.

1. Thunderbird programoje eikite į **Įrankiai > Priedai ir temos**.
2. Paieškokite „atsakyti su priedais“.
3. Pridėkite priedą.

Arba atidarykite priedo puslapį tiesiogiai: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Rankinis diegimas iš XPI {#local-installation-in-thunderbird}

### Atsisiųsti XPI failą {#download-the-xpi-file}

1. Eikite į [Thunderbird priedo puslapį](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Atsisiųskite naujausią priedo versiją kaip XPI failą (`reply_with_attachments-x.y.z-tb.xpi`).

### Įdiegti Thunderbird {#install-in-thunderbird-local}

1. Atidarykite Thunderbird.
2. Eikite į **Įrankiai > Priedai ir temos**.
3. **Priedų valdytojo** viršuje dešinėje pusėje spustelėkite pavaros piktogramą.
4. Iš meniu pasirinkite **Įdiegti priedą iš failo…**.
5. Pasirinkite atsisiųstą `reply_with_attachments-x.y.z-tb.xpi` failą.
6. Patvirtinkite diegimą, kai būsite paraginti.

---

## Diegimas plėtrai {#installation-for-development}

### Atsisiųsti saugyklą {#download-the-repository}

1. Atsisiųskite naujausią GitHub saugyklos versiją.
2. Vykdykite `make help` daugiau informacijos.

### Įdiegti Thunderbird {#install-in-thunderbird-dev}

1. Atidarykite Thunderbird.
2. Eikite į **Įrankiai > Priedai ir temos**.
3. **Priedų valdytojo** viršuje dešinėje pusėje spustelėkite pavaros piktogramą.
4. Iš meniu pasirinkite **Įdiegti priedą iš failo…**.
5. Pasirinkite sugeneruotą `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` failą.
6. Patvirtinkite diegimą, kai būsite paraginti.

Pastaba: Jei Thunderbird nesutinka su `.zip` jūsų sistemoje, pervardykite jį į `.xpi` ir vėl pabandykite „Įdiegti priedą iš failo…“.

### Kur rasti LOCAL ZIP {#where-local-zip}

- Pirmiausia, supakuokite priedą: vykdykite `make pack` saugyklos šaknyje.
- Po pakavimo, rasite „LOCAL“ zip su saugyklos šaknyje (pvz., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Prieš pakavimą bandomajam naudojimui, padidinkite versijas tiek `sources/manifest_ATN.json`, tiek `sources/manifest_LOCAL.json`.

---

## Išjungti, pašalinti ir atnaujinimai {#disable-uninstall-updates}

- Išjungti: Thunderbird → Įrankiai → Priedai ir temos → raskite priedą → išjunkite.
- Pašalinti: tas pats vaizdas → tris taškus meniu → Pašalinti.
- Atnaujinimai: ATN diegimai automatiškai atnaujinami, kai naujos versijos yra patvirtintos. LOCAL/dev diegimai automatiškai neatnaujinami; naują LOCAL versiją reikia įdiegti rankiniu būdu.
- Visai pašalinti nustatymus: žr. [Privatumas → Duomenų pašalinimas](privacy#data-removal).

Taip pat žr.

- [Greitasis pradžios vadovas](quickstart)
