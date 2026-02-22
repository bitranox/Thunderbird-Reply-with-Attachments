---
id: quickstart
title: 'Greita pradžia'
sidebar_label: 'Greitoji pradžia'
---

---

## Greitasis startas

:::important Minimalus Thunderbird leidimas
Šis priedas palaiko Thunderbird **128 ESR ar naujesnę**. Senesnės versijos nepalaikomos.
:::

:::note Jokios telemetrijos; jokio fono tinklo
Priedas **nerenka** analizės/telemetrijos ir neatlieka **jokių** fono tinklo užklausų. Tinklo prieiga vyksta tik tada, kai spustelite išorines nuorodas (Docs, GitHub, Donate).
:::

---

### Diegimas

1. Įdiekite priedą iš „Thunderbird Add‑ons“.
2. Pasirinktinai: Įjunkite patvirtinimą (Parinktys → „Klausti prieš pridedant priedus“).
3. Pasirinktinai: Palikite įjungtą juodojo sąrašo įspėjimą (numatyta): „Įspėti, jei priedai atmetami pagal juodąjį sąrašą“.
4. Pasirinktinai: Pridėkite juodojo sąrašo šablonus (po vieną eilutėje), pvz.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Pastaba: „# …“ aukščiau yra komentaras šioje dokumentacijoje; nekartokite komentarų šablonuose, kuriuos įklijuojate į Parinktis. Įveskite po vieną šabloną kiekvienoje eilutėje.

Dabar atsakykite į laišką su priedais — originalai bus pridėti automatiškai arba po greito patvirtinimo. Jei kokie nors failai atmetami pagal jūsų juodąjį sąrašą, pamatysite trumpą įspėjimą su jų sąrašu.

---

### Patikrinkite {#verify}

- Atsakykite į laišką su 1–2 priedais ir įsitikinkite, kad originalai pridėti į jūsų rašymo langą.
- Norėdami sureguliuoti veikimą, žr. [Konfigūracija](configuration) (patvirtinimo jungiklis, numatytasis atsakymas, juodojo sąrašo šablonai).

---

### Patikrinkite juodojo sąrašo įspėjimą {#verify-blacklist-warning}

- Atsakykite į laišką, kuriame yra toks failas kaip „secret.txt“.
- Įjungus „Įspėti, jei priedai atmetami pagal juodąjį sąrašą“, mažas dialogo langas parodys atmestus failus ir atitinkantį šabloną.

Jei nematote įspėjimo, įsitikinkite, kad šablonas tiksliai atitinka failo pavadinimą (tik failo pavadinimas, neskiriant didžiųjų ir mažųjų raidžių). Žr. Konfigūracija → Juodasis sąrašas.

---

### Pastaba apie klaviatūrą {#keyboard-note}

- Patvirtinimo dialogas palaiko Y/J – Taip ir N/Esc – Ne. Kai kuriose nelotyniškose klaviatūrose raidžių klavišai gali skirtis; Enter patvirtina fokusuotą mygtuką.

---
