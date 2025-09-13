---
id: privacy
title: 'Privatnost'
sidebar_label: 'Privatnost'
---

## Privatnost

:::note Bez telemetrije; bez pozadinske mreže
Ovaj dodatak **ne** prikuplja analitiku/telemetriju i **ne** vrši pozadinske mrežne zahteve. Svaka mrežna aktivnost se dešava samo kada kliknete na eksternu vezu (Dokumenti, GitHub, Doniraj).
:::

Odgovor sa prilozima ne prikuplja analitiku ili telemetriju i ne šalje vaše podatke nigde.

Šta dodatak radi:

- Čita metapodatke i fajlove priloga iz originalne poruke lokalno (Thunderbird API) kako bi ih priložio vašem odgovoru.
- Čuva vaše opcije (crna lista, potvrda, podrazumevani odgovor) u lokalnom skladištu Thunderbirda.

Šta dodatak ne radi:

- Nema praćenja, analitike, izveštavanja o greškama ili daljinskog logovanja.
- Nema pozadinskih mrežnih zahteva, osim kada eksplicitno otvorite eksterne linkove (Dokumenti, GitHub, Doniraj).

Dozvole su dokumentovane na stranici [Dozvole](permissions).

---

## Politika bezbednosti sadržaja (CSP) {#content-security-policy-csp}

Opcije i iskačuće stranice izbegavaju inline skripte. Sav JavaScript se učitava iz fajlova koje je isporučila dodatak kako bi se pridržavao stroge CSP u Thunderbirdu. Ako u dokumente uključite kodne snipete, oni su samo primeri i ne izvršava ih dodatak.

---

## Skladištenje podataka {#data-storage}

- Korisničke postavke (crna lista, prekidač za potvrdu, podrazumevani odgovor) se čuvaju u `storage.local` Thunderbirda za ovaj dodatak.
- Dodatak ne vrši sinhronizaciju sa cloud-om.

---

## Mreža {#network}

- Dodatak ne vrši pozadinsku mrežnu aktivnost.
- Svaki pristup mreži se dešava samo kada kliknete na linkove (Dokumenti, GitHub, Doniraj) ili kada sam Thunderbird vrši normalne operacije koje nisu povezane sa ovim dodatkom.

---

## Uklanjanje podataka {#data-removal}

- Deinstaliranje dodatka uklanja njegov kod.
- Podešavanja se čuvaju samo u `storage.local` Thunderbirda i uklanjaju se prilikom deinstaliranja; ne koristi se spoljašnje skladište.
- Resetujte podešavanja bez deinstaliranja:
  - Stranica opcija: koristite “Resetuj na podrazumevane” za crnu listu i upozorenje o crnoj listi.
  - Napredno: u Thunderbirdu → Alati → Alati za programere → Debug Add-ons, otvorite skladište ekstenzije i obrišite ključeve po potrebi.

---
