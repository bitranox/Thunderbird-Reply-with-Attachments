---
id: features
title: 'Značajke'
sidebar_label: 'Značajke'
---

---

## Značajke {#features}

- Ugrađene slike prepuštene su Thunderbirdu: ostaju u tijelu odgovora i ne kopiraju se kao datotečni privitci. Slika koja nosi samo `Content-ID`, a na koju se ne upućuje, tretira se kao običan privitak i kopira se.

---

## Kako funkcionira {#how-it-works}

- Pri odgovoru dodatak popisuje izvorne privitke.
- Filtrira S/MIME potpise iz datotečnih privitaka; ugrađene slike vraćaju se u tijelo (osim ako je onemogućeno).
- Po potrebi traži potvrdu (prilagođeno tipkovnici).
- Dodaje odgovarajuće datoteke u sastavljanje, izbjegavajući duplikate prema nazivu datoteke.
- Pogledajte “Zašto privitci možda neće biti dodani” u odjeljku Upotreba za rubne slučajeve.

Napomena o privatnosti: Sva se obrada odvija lokalno u Thunderbirdu. Dodatak ne upućuje pozadinske mrežne zahtjeve.

---
