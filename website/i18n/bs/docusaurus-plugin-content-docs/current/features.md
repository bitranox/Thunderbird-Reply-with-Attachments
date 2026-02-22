---
id: features
title: 'Funkcionalnosti'
sidebar_label: 'Funkcionalnosti'
---

---

## Funkcionalnosti {#features}

- Automatski prilaže datoteke iz originalne e-poruke pri odgovaranju.
- Ponašanje se može podesiti: prilozi mogu biti
  - dodani automatski, ili
  - dodani tek nakon potvrde (mali, pristupačan dijalog). U Opcijama možete
    omogućiti potvrdu i izabrati podrazumijevani odgovor (Da/Ne).
- Crna lista naziva datoteka (glob uzorci) sprječava da se određene datoteke
  automatski prilože. Primjeri: `*intern*`, `*secret*`, `*passwor*`.
  Podudaranje ne razlikuje velika/mala slova i provjerava samo naziv datoteke; navedite jedan uzorak
  po liniji u Opcijama.
- Upozorenje o crnoj listi (opcionalno, podrazumijevano uključeno): kada su datoteke isključene vašom
  crnom listom, mali modalni prozor navodi datoteku i odgovarajuće uzorke. Prilagođeno tamnom modu
  i pristupačno tastaturom (Enter/Esc za zatvaranje).
- Radi s „Odgovori” i „Odgovori svima”. „Proslijedi” ovaj dodatak ne mijenja.
- Dodaje originalne priloge čak i ako ste već nešto sami priložili; izbjegava duplikate po nazivu datoteke.
- Zaštita od duplikata po kartici sprječava dvostruko dodavanje u istoj kartici za sastavljanje poruke.
- Podrazumijevano preskače S/MIME certifikate kako bi izbjegao nepotrebne priloge.
- Uključuje ugrađene slike (podrazumijevano: UKLJUČENO). Ugrađene slike se vraćaju direktno u
  tijelo odgovora kao base64 data URI-ji, uz očuvanje izvornog inline rasporeda. Onemogućite u
  Opcijama da biste u potpunosti preskočili ugrađene slike.

---

## Kako funkcioniše {#how-it-works}

- Pri odgovaranju, dodatak popisuje izvorne priloge.
- Filtrira S/MIME potpise iz datotečnih priloga; ugrađene slike se vraćaju u tijelo poruke (osim ako je onemogućeno).
- Po potrebi traži potvrdu (pogodno za tastaturu).
- Dodaje odgovarajuće datoteke u prozor za sastavljanje, izbjegavajući duplikate po nazivu datoteke.
- Za rubne slučajeve pogledajte „Zašto se prilozi možda neće dodati” u odjeljku Upotreba.

Napomena o privatnosti: Sva obrada se odvija lokalno u Thunderbirdu. Dodatak ne upućuje pozadinske mrežne zahtjeve.

---
