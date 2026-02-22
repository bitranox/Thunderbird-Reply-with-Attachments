---
id: features
title: 'Značajke'
sidebar_label: 'Značajke'
---

---

## Značajke {#features}

- Automatski prilaže datoteke iz izvorne poruke e‑pošte pri odgovaranju.
- Podesivo ponašanje: privitci se mogu
  - dodati automatski, ili
  - dodati tek nakon potvrde (mali, pristupačan dijalog). U Postavkama
    možete omogućiti potvrdu i odabrati zadani odgovor (Da/Ne).
- Crna lista naziva datoteka (glob uzorci) sprječava da se određene datoteke
  automatski prilažu. Primjeri: `*intern*`, `*secret*`, `*passwor*`.
  Usklađivanje ne razlikuje velika i mala slova i provjerava samo naziv datoteke; navedite jedan uzorak
  po retku u Postavkama.
- Upozorenje o crnoj listi (neobavezno, omogućeno prema zadanim postavkama): kada su datoteke isključene vašom
  crnom listom, mali modalni prozor navodi datoteku i odgovarajuće uzorke. Prilagođeno tamnom
  načinu rada i pristupačno tipkovnicom (Enter/Esc za zatvaranje).
- Radi s Odgovori i Odgovori svima. Ovaj dodatak ne mijenja Proslijedi.
- Dodaje originale čak i ako ste već sami nešto priložili; izbjegava duplikate prema nazivu datoteke.
- Zaštita od duplikata po kartici sprječava dvostruko dodavanje u istoj kartici sastavljanja.
- Prema zadanim postavkama preskače S/MIME certifikate kako bi se izbjegli nepotrebni privitci.
- Uključi ugrađene slike (zadano: UKLJ.). Ugrađene slike se vraćaju izravno u
  tijelo odgovora kao base64 data URI‑jevi, čuvajući izvorni inline raspored. Onemogućite u
  Postavkama kako biste u potpunosti preskočili inline slike.

---

## Kako funkcionira {#how-it-works}

- Pri odgovoru dodatak popisuje izvorne privitke.
- Filtrira S/MIME potpise iz datotečnih privitaka; ugrađene slike vraćaju se u tijelo (osim ako je onemogućeno).
- Po potrebi traži potvrdu (prilagođeno tipkovnici).
- Dodaje odgovarajuće datoteke u sastavljanje, izbjegavajući duplikate prema nazivu datoteke.
- Pogledajte “Zašto privitci možda neće biti dodani” u odjeljku Upotreba za rubne slučajeve.

Napomena o privatnosti: Sva se obrada odvija lokalno u Thunderbirdu. Dodatak ne upućuje pozadinske mrežne zahtjeve.

---
