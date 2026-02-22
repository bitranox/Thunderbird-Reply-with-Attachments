---
id: quickstart
title: 'Brzi početak'
sidebar_label: 'Brzi početak'
---

---

## Brzi početak

:::important Minimalna verzija Thunderbirda
Ovaj dodatak podržava Thunderbird **128 ESR ili noviji**. Starije verzije nisu podržane.
:::

:::note Bez telemetrije; bez pozadinske mreže
Dodatak **ne** prikuplja analitiku/telemetriju i **ne** pravi pozadinske mrežne zahteve. Pristup mreži se dešava samo kada kliknete na eksterne linkove (Dokumentacija, GitHub, Donacije).
:::

---

### Instalacija

1. Instalirajte dodatak sa Thunderbird Add‑ons kataloga.
2. Opcionalno: Uključite potvrdu (Opcije → „Pitaj pre dodavanja priloga“).
3. Opcionalno: Ostavite upozorenje crne liste uključeno (podrazumevano): „Upozori ako su prilozi isključeni crnom listom“.
4. Opcionalno: Dodajte šablone (pattern) crne liste (jedan po liniji), npr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Napomena: „# …“ iznad je komentar u ovoj dokumentaciji; ne uključujte komentare u šablone koje nalepite u Opcije. Unosite tačno po jedan šablon u svaki red.

Sada odgovorite na poruku sa prilozima — originali će biti dodati automatski ili nakon brze potvrde. Ako neke datoteke budu isključene vašom crnom listom, videćete kratko upozorenje sa njihovim spiskom.

---

### Provera {#verify}

- Odgovorite na poruku sa 1–2 priloga i potvrdite da su originali dodati u prozor za pisanje.
- Za podešavanje ponašanja, pogledajte [Konfiguracija](configuration) (prekidač za potvrdu, podrazumevani odgovor, šabloni crne liste).

---

### Proverite upozorenje crne liste {#verify-blacklist-warning}

- Odgovorite na poruku koja sadrži datoteku kao što je „secret.txt“.
- Sa opcijom „Upozori ako su prilozi isključeni crnom listom“ uključenom, mali dijalog će prikazati isključene datoteke i odgovarajući šablon.

Ako ne vidite upozorenje, proverite da šablon tačno odgovara nazivu datoteke (samo naziv datoteke, bez obzira na velika/mala slova). Pogledajte Konfiguracija → Crna lista.

---

### Napomena o tastaturi {#keyboard-note}

- Dijalog za potvrdu podržava Y/J za Yes i N/Esc za No. Na nekim nelatiničnim tastaturama, slova mogu varirati; Enter potvrđuje dugme koje je u fokusu.

---
