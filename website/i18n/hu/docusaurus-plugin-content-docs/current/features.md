---
id: features
title: 'Funkciók'
sidebar_label: 'Funkciók'
---

---

## Funkciók {#features}

- Válaszoláskor automatikusan csatolja az eredeti e‑mail mellékleteit.
- Konfigurálható működés: a mellékletek lehetnek
  - automatikusan hozzáadva, vagy
  - csak megerősítés után hozzáadva (egy kicsi, akadálymentes párbeszédablak). A Beállításokban
    engedélyezheti a megerősítést, és kiválaszthatja az alapértelmezett választ (Igen/Nem).
- Fájlnév‑feketelista (glob minták) megakadályozza bizonyos fájlok
  automatikus csatolását. Példák: `*intern*`, `*secret*`, `*passwor*`.
  Az egyezés nem érzékeny a kis- és nagybetűkre, és csak a fájlnevet vizsgálja; a Beállításokban
  soronként egy mintát adjon meg.
- Feketelista‑figyelmeztetés (opcionális, alapértelmezés szerint engedélyezve): amikor fájlokat kizár a
  feketelista, egy kis modális ablak felsorolja a fájlt és a megfelelő mintá(ka)t. Sötét mód‑
  barát és billentyűzettel is kezelhető (Enter/Esc a bezáráshoz).
- Működik a Válasz és a Válasz mindenkinek funkciókkal. A Továbbítást ez a kiegészítő nem módosítja.
- Az eredetieket akkor is hozzáadja, ha már maga is csatolt valamit; a duplikátumokat fájlnév alapján elkerüli.
- A laponkénti duplikátumvédelem megakadályozza a kétszeri hozzáadást ugyanabban a levélírási lapon.
- Alapértelmezés szerint kihagyja az S/MIME tanúsítványokat a felesleges mellékletek elkerülése érdekében.
- Beágyazott képek mellékelése (alapértelmezés: BE). A beágyazott képek közvetlenül a
  válasz törzsébe kerülnek vissza base64 adat‑URI‑k formájában, megőrizve az eredeti beágyazott elrendezést. Tiltsa le a
  Beállításokban, ha teljesen ki szeretné hagyni a beágyazott képeket.

---

## Hogyan működik {#how-it-works}

- Válaszoláskor a kiegészítő felsorolja az eredeti mellékleteket.
- Kiszűri az S/MIME aláírásokat a fájlmellékletek közül; a beágyazott képeket a törzsben állítja vissza (hacsak nincs letiltva).
- Opcionálisan megerősítést kér (billentyűzetbarát).
- A megfelelő fájlokat hozzáadja a levélíráshoz, és fájlnév alapján elkerüli a duplikátumokat.
- A különleges esetekhez lásd a „Miért nem kerülnek hozzáadásra a mellékletek” részt a Használat fejezetben.

Adatvédelmi megjegyzés: Minden feldolgozás helyben, a Thunderbirdben történik. A kiegészítő nem végez háttérbeli hálózati kéréseket.

---
