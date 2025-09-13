---
id: features
title: 'Značilnosti'
sidebar_label: 'Značilnosti'
---

## Features {#features}

- Automatsko pripenjanje datotek iz izvirnega e-poštnega sporočila pri odgovarjanju.
- Konfigurabilno vedenje: priponke lahko
  - dodamo samodejno, ali
  - dodamo le po potrditvi (majhen, dostopen dialog). V možnostih lahko
    omogočite potrditev in izberete privzeti odgovor (Da/Ne).
- Črni seznam imen datotek (glob vzorci) preprečuje samodejno pripenjanje določenih datotek. Primeri: `*intern*`, `*secret*`, `*passwor*`.
  Ujemanje ni občutljivo na velike/male črke in preverja samo ime datoteke; navedite en vzorec
  na vrstico v možnostih.
- Opozorilo za črni seznam (opcijsko, privzeto vključeno): ko so datoteke izključene z vašim
  črnim seznamom, mali modal prikaže datoteko in ujemajoče se vzorce. Prijazno za temni način
  in dostopno s tipkovnico (Enter/Esc za zapiranje).
- Deluje z Odgovori in Odgovori vsem. Posredovanje ni spremenjeno s tem dodatkom.
- Dodaja izvirnike, tudi če ste že kaj sami pripeli; preprečuje podvajanje po imenu datoteke.
- Varstvo pred podvajanjem na zavihku preprečuje dvojno dodajanje v istem zavihek za sestavo.
- Preskoči S/MIME certifikate in slikovne datoteke, da se izogne nepotrebnemu pritrjevanju.

## How It Works {#how-it-works}

- Ob odgovoru dodatka prikaže izvirne priponke.
- Filtrira S/MIME podpise in slikovne datoteke.
- Po potrebi prosi za potrditev (prijazno za tipkovnico).
- Dodaja upravičene datoteke v vašo sestavo, pri čemer se izogiba podvajanju po imenu datoteke.
- Glejte "Zakaj priponke morda ne bodo dodane" v uporabi za robne primere.

Opomba o zasebnosti: Vse obdelave potekajo lokalno v Thunderbirdu. Dodatna oprema ne izvaja nobenih omrežnih zahtevkov v ozadju.
