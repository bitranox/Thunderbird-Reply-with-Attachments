---
id: privacy
title: 'Privatumas'
sidebar_label: 'Privatumas'
---

## Privatumas

:::note Nėra telemetrijos; jokio fono tinklo
Šis papildinys **nesirenka** analitikos/telemetrijos ir **netaiko** jokio fono tinklo prašymo. Bet koks tinklo prieiga vyksta tik tada, kai paspaudžiate išorinį nuorodą (Dokumentai, GitHub, Aukoti).
:::

Atsakyti su priedais nesirenka analitikos ar telemetrijos ir nesiunčia jūsų duomenų niekur.

Ką veikia papildinys:

- Perskaito priedų metaduomenis ir failus iš originalios žinutės lokaliai (Thunderbird API), kad juos būtų galima pridėti prie jūsų atsakymo.
- Laiko jūsų parinktis (juodasis sąrašas, patvirtinimas, numatytas atsakymas) Thunderbird vietinėje saugykloje.

Ką papildinys nedaro:

- Nėra sekimo, analitikos, avarijų ataskaitų ar nuotolinio registravimo.
- Nėra fono tinklo prašymų, išskyrus tada, kai jūs aiškiai atidarote išorines nuorodas (Dokumentai, GitHub, Aukoti).

Leidimai dokumentuoti [Leidimų](permissions) puslapyje.

---

## Turinio saugumo politika (CSP) {#content-security-policy-csp}

Parinktys ir iššokančiosios puslapiai vengia įterptųjų scenarijų. Visi JavaScript failai yra įkeliami iš failų, kurie yra pristatomi su papildiniu, kad atitiktų griežtą CSP Thunderbird programoje. Jei dokumentuose įterpiate kodo fragmentus, jie yra tik pavyzdžiai ir nėra vykdomi papildinyje.

---

## Duomenų saugojimas {#data-storage}

- Vartotojo nustatymai (juodasis sąrašas, patvirtinimo perjungimas, numatytas atsakymas) yra saugomi Thunderbird `storage.local` šiam papildiniui.
- Papildinys neatlieka debesų sinchronizacijos.

---

## Tinklas {#network}

- Papildinys neatlieka jokios fono tinklo veiklos.
- Bet koks tinklo prieiga vyksta tik tada, kai paspaudžiate nuorodas (Dokumentai, GitHub, Aukoti) arba kai pats Thunderbird atlieka normalias operacijas, nesusijusias su šiuo papildiniu.

---

## Duomenų šalinimas {#data-removal}

- Išjungus papildinį pašalinamas jo kodas.
- Nustatymai išlaikomi tik Thunderbird `storage.local` ir yra pašalinami išjungimo metu; jokia išorinė saugykla nenaudojama.
- Atkurti nustatymus nepašalinant:
  - Parinkčių puslapis: naudokite „Atkurti į numatytuosius“ juodajam sąrašui ir juodojo sąrašo įspėjimui.
  - Išplėstinis: Thunderbird → Įrankiai → Vystytojo įrankiai → Klaidos tikrinimo papildiniai, atidarykite plėtinio saugyklą ir išvalykite raktus, jei reikia.

---
