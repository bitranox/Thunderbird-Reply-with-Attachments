---
id: permissions
title: 'Teisės'
---

## Teisės

:::note Minimalios teisės
Šis įskiepys neprašo jokių host (internetinės) teisių. Įskiepys neserga telemetrijos ir nesuka tinklo prašymų fone. Žiūrėti [Privatumas](privacy).
:::

---

Įskiepys prašo mažo, konkretaus teisių rinkinuko tik. Kodėl kiekviena yra reikalinga:

- `compose`: stebėti komponavimo įvykius, sąrašu ir pridėti priedus jūsų atsakyme.
- `messagesRead`: skaityti metaduomenis ir gauti priedų failus iš originalios žinutės.
- `scripting`: įterpti mažą patvirtinimo dialogą, kai jis įjungtas.
- `windows`: atidaryti mažą patvirtinimo iššokantį langą kaip paskutinę išeitį, kai žinučių siuntimas nepavyksta.
- `sessions`: saugoti per‑tabs vėliavą, kad būtų išvengta dubliavimo apdorojimo.
- `storage`: išlaikyti parinktis (juodasis sąrašas, patvirtinimo perjungimas, numatytasis atsakymas).
- `tabs`: tikslinė žinutė komponavimo skirtuke patvirtinimo prašymams.

Papildomos pastabos:

- Šis įskiepys neprašo jokių host teisių (internetinių kilmės).
- `tabs` teisė yra naudojama tik tikslinant komponavimo skirtuką, kai koordinuojamas nepobūdį dialogas; jis nėra naudojamas istorijai skaityti ar naršyti puslapius.

Tai yra dokumentuota šaltinyje ir išbandyta CI. Įskiepys neserga telemetrijos.

---

### Santrauka (teisės → paskirtis) {#permissions-summary}

| Teisė          | Kodėl ji reikalinga                                                                      |
| -------------- | ---------------------------------------------------------------------------------------- |
| `compose`      | Stebėti komponavimo įvykius; sąrašu ir pridėti priedus jūsų atsakyme.                    |
| `messagesRead` | Išvardyti originalios žinutės priedus ir gauti failo duomenis.                           |
| `scripting`    | Įterpti/koordinuoti lengvą UI patvirtinimui, kai jis įjungtas.                           |
| `windows`      | Atsarginis iššokantis langas, jei žinučių siuntimas nepavyksta (reta).                   |
| `sessions`     | Saugoti per‑tabs vėliavą, kad būtų išvengta dubliavimo apdorojimo.                       |
| `storage`      | Išlaikyti parinktis (juodasis sąrašas, patvirtinimo perjungimas, numatytasis atsakymas). |
| `tabs`         | Tikslinė žinutė komponavimo skirtuke patvirtinimo prašymams.                             |
| (host teisės)  | Nėra — įskiepys neprašo internetinių kilmės.                                             |

---

## Neprisiklausiama {#not-requested}

- `compose.save`, `compose.send` — įskiepys nesaugo ar nesiunčia pašto jūsų vardu.

Žiūrėti taip pat: [Privatumas](privacy) — jokios telemetrijos, jokių fono tinklo, tik naudotojo inicijuoti nuorodos.

---
