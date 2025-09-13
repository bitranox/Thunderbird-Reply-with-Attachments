---
id: features
title: 'Značajke'
sidebar_label: 'Značajke'
---

## Features {#features}

- Automatski dodaje datoteke iz originalne e-pošte prilikom odgovaranja.
- Konfigurabilno ponašanje: privitci mogu biti
  - dodani automatski, ili
  - dodani samo nakon potvrde (mali, pristupačan dijalog). U Opcijama možete
    omogućiti potvrdu i odabrati zadani odgovor (Da/Ne).
- Crna lista naziva datoteka (glob obrasci) sprječava da se određene datoteke
  automatski dodaju. Primjeri: `*intern*`, `*secret*`, `*passwor*`.
  Uparivanje je bez obzira na velika/mala slova i provjerava samo naziv datoteke; pružite jedan obrazac
  po retku u Opcijama.
- Upozorenje o crnoj listi (opcionalno, omogućeno prema zadanim postavkama): kada su datoteke isključene vašom
  crnom listom, mali modal prikazuje datoteku i odgovarajući obrazac(e). Prijateljski za tamni način
  i dostupno putem tipkovnice (Enter/Esc za zatvaranje).
- Radi s Odgovori i Odgovori svima. Prosljeđivanje nije izmijenjeno ovim dodatkom.
- Dodaje originale čak i ako ste već nešto sami priložili; izbjegava dupliciranje po nazivu datoteke.
- Čuvar dupliciranja po karticama sprječava dvostruko dodavanje u istoj kartici za sastavljanje.
- Preskoči S/MIME certifikate i umetnute slike kako bi se izbjegli nepotrebni privitci.

## How It Works {#how-it-works}

- Prilikom odgovaranja, dodatak prikazuje originalne privitke.
- Filtrira S/MIME potpise i umetnute slike.
- Opcionalno traži potvrdu (prijateljski prema tipkovnici).
- Dodaje eligible files to your compose, avoiding duplicates by filename.
- See “Why attachments might not be added” in Usage for edge cases.

Privacy note: All processing happens locally in Thunderbird. The add-on makes no background network requests.
