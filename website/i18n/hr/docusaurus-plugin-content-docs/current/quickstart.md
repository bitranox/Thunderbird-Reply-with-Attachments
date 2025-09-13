---
id: quickstart
title: 'Brzi početak'
sidebar_label: 'Brzi početak'
---

## Brzi početak

:::important Minimalna verzija Thunderbirda
Ovaj dodatak podržava Thunderbird **128 ESR ili noviji**. Starije verzije nisu podržane.
:::

:::note Nema telemetrije; nema pozadinske mreže
Dodatak **ne** prikuplja analitiku/telemetriju i ne šalje **nema** pozadinske mrežne zahtjeve. Mrežni pristup se odvija samo kada kliknete na vanjske veze (Dokumenti, GitHub, Doniraj).
:::

---

### Instaliraj

1. Instalirajte dodatak iz Thunderbirda Dodataka.
2. Opcionalno: Omogućite potvrdu (Opcije → “Pitaj prije dodavanja privitaka”).
3. Opcionalno: Ostavite upozorenje na crnu listu omogućeno (zadano): “Upozori ako su privitci isključeni crnom listom”.
4. Opcionalno: Dodajte obrasce crne liste (jedan po redak), npr.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Napomena: “# …” iznad je komentar u ovoj dokumentaciji; ne uključujte komentare u obrasce koje zalijepite u Opcije. Unesite samo jedan obrazac po retku.

Sada odgovorite na poruku s privicima — originali će biti automatski dodani ili nakon brze potvrde. Ako su neki datoteke isključene vašom crnom listom, vidjet ćete kratko upozorenje koje ih navodi.

---

### Provjeri {#verify}

- Odgovorite na poruku s 1–2 privitka i potvrdite da su originali dodani u prozor za sastavljanje.
- Da biste prilagodili ponašanje, pogledajte [Konfiguracija](configuration) (prekidač potvrde, zadani odgovor, obrasci crne liste).

---

### Provjeri upozorenje crne liste {#verify-blacklist-warning}

- Odgovorite na poruku koja sadrži datoteku poput “secret.txt”.
- Uz omogućeno “Upozori ako su privitci isključeni crnom listom”, mali dijalog navodi isključene datoteke i odgovarajući obrazac.

Ako ne vidite upozorenje, provjerite odgovara li obrazac točno imenu datoteke (samo ime datoteke, bez obzira na velika/mala slova). Pogledajte Konfiguracija → Crna lista.

---

### Napomena o tipkovnici {#keyboard-note}

- Dijalog za potvrdu podržava Y/J za Da i N/Esc za Ne. Na nekim nekilatinskim tipkovnicama, tipke s slovima mogu varirati; Enter potvrđuje fokusirani gumb.

---
