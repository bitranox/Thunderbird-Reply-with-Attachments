---
id: quickstart
title: 'Kiirjuhend'
sidebar_label: 'Kiire alustamine'
---

---

## Kiirjuhend

:::important Minimaalne Thunderbirdi versioon
See lisandmoodul toetab Thunderbirdi **128 ESR või uuemat**. Vanemaid versioone ei toetata.
:::

:::note Telemeetria puudub; taustvõrguliiklust ei toimu
Lisandmoodul ei kogu analüütikat/telemeetriat ega tee taustal võrgupäringuid. Võrguühendust kasutatakse vaid siis, kui klõpsad välislinkidel (Docs, GitHub, Donate).
:::

---

### Paigaldamine

1. Paigalda lisandmoodul saidilt Thunderbird Add‑ons.
2. Valikuline: Luba kinnitus (Sätted → „Küsi enne manuste lisamist”).
3. Valikuline: Jäta musta nimekirja hoiatus lubatuks (vaikimisi): „Hoiata, kui manused jäetakse musta nimekirja tõttu välja”.
4. Valikuline: Lisa musta nimekirja mustrid (üks rea kohta), nt:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Märkus: Ülalolev „# …” on selle dokumentatsiooni kommentaar; ära lisa Sätetesse kleebitavatesse mustritesse kommentaare. Sisesta igale reale ainult üks muster.

Nüüd vasta manustega kirjale — originaalid lisatakse automaatselt või pärast kiiret kinnitust. Kui mõni fail välistatakse sinu musta nimekirja tõttu, näed lühikest hoiatust koos nende loeteluga.

---

### Kontrolli {#verify}

- Vasta kirjale, millel on 1–2 manust, ja veendu, et originaalid lisatakse sinu koostamisaknasse.
- Käitumise muutmiseks vaata [Seadistust](configuration) (kinnituse lüliti, vaikevastus, musta nimekirja mustrid).

---

### Kontrolli musta nimekirja hoiatust {#verify-blacklist-warning}

- Vasta kirjale, mis sisaldab faili nagu „secret.txt”.
- Kui suvand „Hoiata, kui manused jäetakse musta nimekirja tõttu välja” on lubatud, kuvab väike dialoog välistatud failid ja vastava mustri.

Kui hoiatust ei kuvata, veendu, et muster vastab failinimele täpselt (ainult failinimi, tõstutundetu). Vaata Seadistus → Must nimekiri.

---

### Klaviatuuri märkus {#keyboard-note}

- Kinnitusdialoog toetab Jah jaoks klahve Y/J ja Ei jaoks N/Esc. Mõnel mitte‑ladina klaviatuuril võivad täheklahvid erineda; Enter kinnitab fookuses oleva nupu.

---
