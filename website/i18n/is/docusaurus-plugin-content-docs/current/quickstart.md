---
id: quickstart
title: 'Fljótleg byrjun'
sidebar_label: 'Hraðbyrjun'
---

---

## Fljótbyrjun

:::important Lágmarksútgáfa Thunderbird
Þessi viðbót styður Thunderbird **128 ESR eða nýrri**. Eldri útgáfur eru ekki studdar.
:::

:::note Engin mæling; ekkert net í bakgrunni
Viðbótin safnar **ekki** greiningu/mælingum og gerir **engar** netbeiðnir í bakgrunni. Aðgangur að neti á sér aðeins stað þegar þú smellir á ytri tengla (Skjöl, GitHub, Styrkja).
:::

---

### Uppsetning

1. Settu viðbótina upp úr Thunderbird Add‑ons.
2. Valfrjálst: Virkja staðfestingu (Valkostir → „Spyrja áður en viðhengjum er bætt við“).
3. Valfrjálst: Halda aðvörun um svartlista virka (sjálfgilt): „Vara við ef viðhengi eru undanskilin af svartlista“.
4. Valfrjálst: Bæta við mynsturum fyrir svartlista (eitt á línu), t.d.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Athugið: „# …“ hér að ofan er athugasemd í þessari handbók; ekki setja athugasemdir í mynstur sem þú límir í Valkosti. Settu aðeins eitt mynstur í hverja línu.

Svara nú skilaboðum með viðhengjum — upprunalegu skrárnar verða bættar við sjálfkrafa eða eftir skjóta staðfestingu. Ef einhverjar skrár eru útilokaðar af svartlistanum þínum, birtist stutt aðvörun sem listar þær.

---

### Stillingar staðfestar {#verify}

- Svaraðu skilaboðum með 1–2 viðhengjum og staðfestu að upprunalegu skrárnar séu komnar í ritgluggann.
- Til að stilla hegðun, sjá [Stillingar](configuration) (kveikja/slökkva á staðfestingu, sjálfgefið svar, mynstur svartlista).

---

### Staðfesta aðvörun svartlista {#verify-blacklist-warning}

- Svaraðu skilaboðum sem innihalda skrá eins og „secret.txt“.
- Með „Vara við ef viðhengi eru undanskilin af svartlista“ virkt birtir lítill gluggi útilokaðar skrár og samsvarandi mynstur.

Ef þú sérð ekki aðvörun, gakktu úr skugga um að mynstrið passi nákvæmlega við skráarnafnið (aðeins skráarnafn, óháð há-/lágstöfum). Sjá Stillingar → Svartlisti.

---

### Athugasemd um lyklaborð {#keyboard-note}

- Staðfestingarglugginn styður Y/J fyrir Já og N/Esc fyrir Nei. Á sumum ó‑latneskum lyklaborðum geta stafirnir verið aðrir; Enter staðfestir hnappinn sem er í fókus.

---
