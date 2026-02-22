---
id: features
title: 'Функционалности'
sidebar_label: 'Карактеристике'
---

---

## Funkcionalnosti {#features}

- Automatski prilaže priloze iz originalne e‑pošte pri odgovaranju.
- Ponašanje se može podesiti: prilozi mogu biti
  - dodati automatski, ili
  - dodati tek nakon potvrde (mali, pristupačan dijalog). U Opcijama
    možete omogućiti potvrdu i izabrati podrazumevani odgovor (Da/Ne).
- Crna lista naziva datoteka (glob obrasci) sprečava da se određene datoteke
  prilože automatski. Primeri: `*intern*`, `*secret*`, `*passwor*`.
  Poklapanje ne razlikuje velika i mala slova i proverava samo naziv datoteke; navedite po jedan obrazac
  po liniji u Opcijama.
- Upozorenje o crnoj listi (opciono, podrazumevano omogućeno): kada su datoteke isključene vašom
  crnom listom, mali modalni prozor navodi datoteku i obrazac(e) koji se poklapaju. Prijateljski za tamni režim
  i pristupačno tastaturom (Enter/Esc za zatvaranje).
- Radi sa Reply i Reply all. Forward ovaj dodatak ne menja.
- Dodaje originale čak i ako ste već nešto sami priložili; izbegava duplikate po nazivu datoteke.
- Zaštita od duplikata po kartici sprečava dvostruko dodavanje u istoj kartici za pisanje.
- Podrazumevano preskače S/MIME sertifikate kako bi se izbegli nepotrebni prilozi.
- Uključuje ugrađene slike (podrazumevano: UKLJUČENO). Umetnute slike se obnavljaju direktno u
  telu odgovora kao base64 data URI identifikatori, uz očuvanje originalnog rasporeda u liniji. Onemogućite u
  Opcijama da biste u potpunosti preskočili ugrađene slike.

---

## Kako funkcioniše {#how-it-works}

- Prilikom odgovora, dodatak izlista originalne priloge.
- Filtrira S/MIME potpise iz priloga sa datotekama; ugrađene slike se vraćaju u telo poruke (osim ako je onemogućeno).
- Po potrebi traži potvrdu (prilagođeno radu sa tastaturom).
- Dodaje odgovarajuće datoteke u vaš prozor za pisanje, izbegavajući duplikate po nazivu.
- Pogledajte „Zašto prilozi možda neće biti dodati” u odeljku Upotreba za rubne slučajeve.

Napomena o privatnosti: Sva obrada se odvija lokalno u Thunderbirdu. Dodatak ne upućuje nikakve mrežne zahteve u pozadini.

---
