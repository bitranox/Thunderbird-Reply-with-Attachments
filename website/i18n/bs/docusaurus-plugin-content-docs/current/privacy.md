---
id: privacy
title: 'Privatnost'
sidebar_label: 'Privatnost'
---

## Privatnost

:::note Nema telemetrije; nema pozadinske mreže
Ovaj dodatak **ne** prikuplja analitiku/telemetriju i **ne** vrši pozadinske mrežne zahtjeve. Svaki pristup mreži se događa samo kada kliknete na vanjsku vezu (Dokumenti, GitHub, Doniraj).
:::

Reply with Attachments ne prikuplja analitiku niti telemetriju i ne šalje vaše podatke bilo gdje.

Šta dodatak radi:

- Čita metapodatke i datoteke privitaka iz originalne poruke lokalno (Thunderbird API) kako bi ih priložio vašem odgovoru.
- Čuva vaše opcije (crna lista, potvrda, defaultni odgovor) u lokalnom skladištu Thunderbirda.

Šta dodatak ne radi:

- Nema praćenja, analitike, izvještavanja o kvarovima ili daljinskog logovanja.
- Nema pozadinskih mrežnih zahtjeva, osim kada eksplicitno otvorite vanjske linkove (Dokumenti, GitHub, Doniraj).

Dozvole su dokumentirane na [stranici Dozvole](permissions).

---

## Politika sigurnosti sadržaja (CSP) {#content-security-policy-csp}

Opcije i iskačuće stranice izbjegavaju inline skripte. Sav JavaScript se učitava iz datoteka koje su uključene s dodatkom kako bi se poštivale stroge CSP u Thunderbirdu. Ako u dokumente umetnete kodne primjere, oni su samo primjeri i ne izvršavaju se od strane dodatka.

---

## Skladištenje podataka {#data-storage}

- Postavke korisnika (crna lista, opcija potvrde, defaultni odgovor) se skladište u `storage.local` Thunderbirda za ovaj dodatak.
- Dodatak ne vrši sinkronizaciju u oblaku.

---

## Mreža {#network}

- Dodatak ne vrši pozadinsku mrežnu aktivnost.
- Svaki pristup mreži se događa samo kada kliknete na linkove (Dokumenti, GitHub, Doniraj) ili kada sam Thunderbird izvršava normalne operacije koje nisu povezane s ovim dodatkom.

---

## Uklanjanje podataka {#data-removal}

- Deinstalacija dodatka uklanja njegov kod.
- Postavke se čuvaju samo u `storage.local` Thunderbirda i uklanjaju se prilikom deinstalacije; ne koristi se vanjsko skladište.
- Resetovanje postavki bez deinstalacije:
  - Stranica opcija: koristite "Resetuj na podrazumevano" za crnu listu i upozorenje o crnoj listi.
  - Napredno: u Thunderbirdu → Alati → Alati za programere → Debug Add-ons, otvorite skladište ekstenzije i očistite ključeve ako je potrebno.

---
