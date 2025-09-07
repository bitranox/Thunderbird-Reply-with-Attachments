---
id: features
title: Funkciók
sidebar_label: Funkciók
---

## Funkciók

- Válaszoláskor automatikusan csatolja az eredeti e‑mail fájljait.
- Konfigurálható működés: a mellékletek
  - automatikusan hozzáadhatók, vagy
  - csak megerősítés után adódnak hozzá (kicsi, akadálymentes párbeszédablak). Az Opciókban engedélyezheted a megerősítést és kiválaszthatod az alapértelmezett választ (Igen/Nem).
- Fájlnév‑feketelista (glob minták) megakadályozza egyes fájlok automatikus csatolását. Példák: `*intern*`, `*secret*`, `*passwor*`.
  Az egyezés nem érzékeny a kis‑/nagybetűre, és csak a fájlnevet vizsgálja; az Opciókban soronként egy mintát adj meg.
- Feketelista‑figyelmeztetés (opcionális, alapértelmezetten bekapcsolva): amikor fájlokat zár ki a feketelistád, egy kis modális ablak felsorolja a fájlt és a talált mintákat. Sötét mód‑barát és billentyűzettel is kezelhető (Enter/Esc a bezáráshoz).
- Akkor is hozzáadja az eredetieket, ha már csatoltál valamit; a fájlnév alapján elkerüli a duplikációkat.
- Kihagyja az SMIME‑tanúsítványokat és a beágyazott képeket a felesleges mellékletek elkerülésére.
