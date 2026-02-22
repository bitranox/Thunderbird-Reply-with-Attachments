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

:::note Bez telemetrije; bez pozadinskih mrežnih zahtjeva
Dodatak **ne** prikuplja analitiku/telemetriju i **ne** šalje pozadinske mrežne zahtjeve. Pristup mreži događa se samo kada kliknete vanjske poveznice (Dokumentacija, GitHub, Donacije).
:::

---

### Instalacija

1. Instalirajte dodatak s Thunderbird Add‑ons.
2. Neobavezno: Uključite potvrdu (Opcije → “Pitati prije dodavanja privitaka”).
3. Neobavezno: Ostavite upozorenje crne liste uključeno (zadano): “Upozori ako su privitci isključeni crnom listom”.
4. Neobavezno: Dodajte obrasce crne liste (jedan po retku), npr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Napomena: “# …” iznad je komentar u ovoj dokumentaciji; nemojte uključivati komentare u obrasce koje lijepite u Opcije. Unosite samo jedan obrazac po retku.

Sada odgovorite na poruku s privitcima — originali će se dodati automatski ili nakon brze potvrde. Ako su neke datoteke isključene vašom crnom listom, vidjet ćete kratko upozorenje s njihovim popisom.

---

### Provjera {#verify}

- Odgovorite na poruku s 1–2 privitka i potvrdite da su originali dodani u vaš prozor za sastavljanje.
- Za prilagodbu ponašanja pogledajte [Konfiguracija](configuration) (prekidač potvrde, zadani odgovor, obrasci crne liste).

---

### Provjerite upozorenje crne liste {#verify-blacklist-warning}

- Odgovorite na poruku koja sadrži datoteku poput “secret.txt”.
- S uključenom opcijom “Upozori ako su privitci isključeni crnom listom”, mali dijaloški okvir navodi isključene datoteke i odgovarajući obrazac.

Ako ne vidite upozorenje, provjerite da obrazac točno odgovara nazivu datoteke (samo naziv datoteke, neosjetljivo na velika/mala slova). Pogledajte Konfiguracija → Crna lista.

---

### Napomena o tipkovnici {#keyboard-note}

- Dijaloški okvir potvrde podržava Y/J za Da i N/Esc za Ne. Na nekim nelatiničnim tipkovnicama slova se mogu razlikovati; Enter potvrđuje fokusirani gumb.

---
