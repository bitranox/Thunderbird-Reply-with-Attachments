---
id: privacy
title: 'Privatnost'
sidebar_label: 'Privatnost'
---

## Privatnost

:::note Nema telemetrije; nema mrežnih pozadinskih zahtjeva
Ova ekstenzija **ne** prikuplja analitiku/telemetriju i **ne** šalje mrežne zahtjeve u pozadini. Bilo koji pristup mreži se događa samo kada kliknete na vanjsku vezu (Dokumenti, GitHub, Doniraj).
:::

Odgovori s privicima ne prikupljaju analitiku ili telemetriju i ne šalju vaše podatke nigdje.

Što ekstenzija radi:

- Čita metapodatke privitaka i datoteke iz izvorne poruke lokalno (Thunderbird API) da bi ih priložila vašem odgovoru.
- Sprema vaše opcije (crna lista, potvrda, zadani odgovor) u lokalnu pohranu Thunderbirda.

Što ekstenzija ne radi:

- Nema praćenja, analitike, izvještavanja o kvarovima ili daljinskog dnevnik.
- Nema pozadinskih mrežnih zahtjeva, osim kada eksplicitno otvorite vanjske veze (Dokumenti, GitHub, Doniraj).

Dozvole su dokumentirane na stranici [Dozvole](permissions).

---

## Politika sigurnosti podataka (CSP) {#content-security-policy-csp}

Opcije i iskačuće stranice izbjegavaju uložene skripte. Sav JavaScript se učitava iz datoteka isporučenih s ekstenzijom kako bi se poštovao strogi CSP u Thunderbirdu. Ako u dokumente ugradite isječke koda, oni su samo primjeri i ne izvršavaju ih ekstenzija.

---

## Pohrana podataka {#data-storage}

- Postavke korisnika (crna lista, prekidač za potvrdu, zadani odgovor) se pohranjuju u `storage.local` Thunderbirda za ovu ekstenziju.
- Ekstenzija ne obavlja sinkronizaciju u oblaku.

---

## Mreža {#network}

- Ekstenzija ne obavlja aktivnosti mreže u pozadini.
- Bilo koji pristup mreži se događa samo kada kliknete na poveznice (Dokumenti, GitHub, Doniraj) ili kada sam Thunderbird izvršava normalne operacije koje nisu povezane s ovom ekstenzijom.

---

## Uklanjanje podataka {#data-removal}

- Deinstaliranje ekstenzije uklanja njezin kod.
- Postavke se zadržavaju samo u `storage.local` Thunderbirda i uklanjaju se pri deinstalaciji; ne koristi se vanjska pohrana.
- Resetiranje postavki bez deinstalacije:
  - Stranica opcija: koristite “Resetiraj na zadano” za crnu listu i upozorenje o crnoj listi.
  - Napredno: u Thunderbirdu → Alati → Alati za razvojne programere → Debagiranje ekstenzija, otvorite pohranu ekstenzije i očistite ključeve ako je potrebno.
