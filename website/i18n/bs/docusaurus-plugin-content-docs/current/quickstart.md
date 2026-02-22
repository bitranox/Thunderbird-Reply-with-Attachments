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

:::note Bez telemetrije; bez pozadinskih mrežnih aktivnosti
Dodatak **ne** prikuplja analitiku/telemetriju i **ne** šalje pozadinske mrežne zahtjeve. Pristup mreži se dešava samo kada kliknete vanjske linkove (Dokumentacija, GitHub, Donacije).
:::

---

### Instalacija

1. Instalirajte dodatak sa Thunderbird Add‑ons.
2. Opcionalno: Omogućite potvrdu (Opcije → „Pitati prije dodavanja priloga”).
3. Opcionalno: Ostavite upozorenje o crnoj listi uključeno (podrazumijevano): „Upozori ako su prilozi isključeni crnom listom”.
4. Opcionalno: Dodajte obrasce crne liste (jedan po liniji), npr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Napomena: „# …” iznad je komentar u ovoj dokumentaciji; nemojte uključivati komentare u obrasce koje lijepite u Opcije. Unosite samo jedan obrazac po liniji.

Sada odgovorite na poruku s prilozima — originali će biti dodani automatski ili nakon brze potvrde. Ako bilo koje datoteke budu isključene vašom crnom listom, vidjet ćete kratko upozorenje koje ih nabraja.

---

### Provjera {#verify}

- Odgovorite na poruku s 1–2 priloga i potvrdite da su originali dodani u prozor za sastavljanje.
- Za podešavanje ponašanja, pogledajte [Konfiguracija](configuration) (prekidač potvrde, podrazumijevani odgovor, obrasci crne liste).

---

### Provjerite upozorenje crne liste {#verify-blacklist-warning}

- Odgovorite na poruku koja sadrži datoteku poput „secret.txt”.
- Ako je omogućeno „Upozori ako su prilozi isključeni crnom listom”, mali dijalog će navesti isključene datoteke i odgovarajući obrazac.

Ako ne vidite upozorenje, provjerite da obrazac tačno odgovara nazivu datoteke (samo naziv datoteke, neosjetljivo na velika/mala slova). Pogledajte Konfiguracija → Crna lista.

---

### Napomena o tastaturi {#keyboard-note}

- Dijalog za potvrdu podržava Y/J za Da i N/Esc za Ne. Na nekim nelatiničnim tastaturama, slovne tipke se mogu razlikovati; Enter potvrđuje fokusirano dugme.

---
