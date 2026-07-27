---
id: usage
title: 'Használat'
sidebar_label: 'Használat'
---

---

## Használat {#usage}

- Válasz esetén a kiegészítő automatikusan hozzáadja az eredeti mellékleteket — vagy előbb rákérdez, ha a Beállításokban engedélyezve van.
- Fájlnév szerint deduplikálva; az S/MIME részek mindig kimaradnak. Az eredeti üzenetbe ágyazott képek a válasz törzsében maradnak, ahova a Thunderbird helyezi őket, és nem kerülnek fájlként másolásra.
- A feketelistázott mellékletek is kihagyásra kerülnek (kis- és nagybetűkre nem érzékeny glob minták, amelyek a fájlnevekre, nem pedig az elérési utakra illeszkednek). Lásd: [Beállítások](configuration#blacklist-glob-patterns).

---

### Mi történik válasz esetén {#what-happens}

- Válasz felismerése → az eredeti mellékletek listázása → S/MIME és beágyazott képek kihagyása → opcionális megerősítés → a jogosult fájlok hozzáadása (a duplikátumok kihagyásával).

| Rész típusa                                                       | Bemásolva a válaszba |
|-------------------------------------------------------------------|---------------------:|
| S/MIME aláírásfájl `smime.p7s`                                    | Nem                  |
| S/MIME MIME-típusok (`application/pkcs7-*`)                       | Nem                  |
| Az üzenet törzse által `cid:` révén beágyazott kép                | Nem (a törzsben van) |
| `Content-Disposition: inline` jelöléssel ellátott kép             | Nem (a törzsben van) |
| `Content-ID`-vel rendelkező kép, amelyre a törzs sosem hivatkozik | Igen                 |
| Csatolt e-mail (`message/rfc822`) fájlnévvel                      | Igen                 |
| Normál fájlmelléklet fájlnévvel                                   | Igen                 |

Egy kép csak akkor számít beágyazottnak, ha az eredeti üzenet ténylegesen hivatkozik rá, vagy ha a küldő kifejezetten `Content-Disposition: inline`-ként jelölte meg. Önmagában egy `Content-ID` fejléc nem elég: több levelezőkliens minden képrészhez hozzáad egyet, beleértve a valódi mellékleteket is, ezeket pedig továbbra is másolni kell.

---

### Kereszthivatkozás {#cross-reference}

- A Továbbítás funkciót a tervezés szerint nem módosítja (lásd alább a Korlátokat).
- A mellékletek esetleges ki nem kerülésének okaiért lásd: „Miért nem kerülhetnek hozzáadásra a mellékletek”.

---

## Működés részletei {#behavior-details}

- Duplikáció megelőzése: A kiegészítő a levélírás lapját feldolgozottként jelöli egy laponkénti munkamenet‑értékkel és egy memóriabeli őrrel. Nem adja hozzá kétszer az eredetieket.
- A levélíró ablak bezárása és újbóli megnyitása új lapként számít (vagyis új kísérlet engedélyezett).
- Meglévő mellékletek tiszteletben tartása: Ha a levélírás alatt már vannak mellékletek, az eredetieket akkor is pontosan egyszer adja hozzá, a már létező fájlneveket kihagyva.
- Kizárások: Az S/MIME‑artifaktumok és az inline képek ki vannak zárva a fájlmellékletek közül. Ha az első körben semmi sem minősül, egy lazább visszaesés újraellenőrzi a nem S/MIME részeket. Az inline képek külön kezelendők: a válasz törzsében adat‑URI‑ként kerülnek visszaállításra (ha engedélyezve).
  - Fájlnevek: `smime.p7s`
  - MIME‑típusok: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline képek: bármely `image/*` rész, amelyre Content‑ID hivatkozik — ki van zárva a fájlmellékletek közül, de a „Inline képek beillesztése” BE állapotában a válasz törzsébe ágyazódik.
  - Csatolt e‑mailek (`message/rfc822`): ha van fájlnevük, szokásos mellékletként kezeljük; hozzáadhatók (duplikáció‑ellenőrzés és feketelista mellett).
- Feketelista‑figyelmeztetés (ha engedélyezve van): Ha a jelölteket a feketelistád kizárja,
  a kiegészítő egy kis modális ablakot jelenít meg az érintett fájlokkal és a megfelelő
  mintákkal. Ez a figyelmeztetés akkor is megjelenik, amikor nem kerül
  sor mellékletek hozzáadására, mert mindent kizártak.

---

## Gyorsbillentyűk {#keyboard-shortcuts}

- Megerősítő párbeszédablak: Y/J = Igen, N/Esc = Nem; a Tab/Shift+Tab és a nyílbillentyűk a fókuszt léptetik.
  - A [Beállítások](configuration#confirmation) alatti „Alapértelmezett válasz” határozza meg a kezdetben fókuszált gombot.
  - Az Enter aktiválja a fókuszban lévő gombot. A Tab/Shift+Tab és a nyilak a fókusz mozgatására szolgálnak az akadálymentesség érdekében.

### Gyorsbillentyűk – összefoglaló {#keyboard-cheat-sheet}

| Billentyűk             | Művelet                                     |
|------------------------|---------------------------------------------|
| Y / J                  | Igen megerősítése                           |
| N / Esc                | Nem megerősítése                            |
| Enter                  | Fókuszált gomb aktiválása                   |
| Tab / Shift+Tab        | Fókusz mozgatása előre/hátra                |
| Nyílbillentyűk         | Fókusz mozgatása a gombok között            |
| Alapértelmezett válasz | Beállítja a kezdeti fókuszt (Igen vagy Nem) |

---

## Korlátok {#limitations}

- A Továbbítás funkciót ez a kiegészítő nem módosítja (a Válasz és a Válasz mindenkinek támogatott).
- A nagyon nagy mellékletekre vonatkozhatnak a Thunderbird vagy a szolgáltató korlátai.
  - A kiegészítő nem darabolja vagy tömöríti a fájlokat; a Thunderbird normál mellékletkezelésére támaszkodik.
- Titkosított üzenetek: az S/MIME részek szándékosan ki vannak zárva.

---

## Miért nem kerülhetnek hozzáadásra a mellékletek {#why-attachments-might-not-be-added}

- Az eredeti üzenet által beágyazott képek nem kerülnek másolásra fájlként. Már ott vannak a válasz törzsében, ahová a Thunderbird helyezte őket. Lásd: [Konfiguráció](configuration#include-inline-pictures).
- Az S/MIME aláírásrészek tervezetten ki vannak zárva: az olyan fájlnevek, mint `smime.p7s`, valamint az olyan MIME‑típusok, mint `application/pkcs7-signature` vagy `application/pkcs7-mime` kimaradnak.
- A feketelista‑minták szűrhetik a jelölteket: lásd [Beállítások](configuration#blacklist-glob-patterns); az egyezés kis‑ és nagybetűkre nem érzékeny, és csak a fájlnévre vonatkozik.
- Az ismétlődő fájlnevek nem kerülnek újra hozzáadásra: ha a levélírásban már szerepel azonos, normalizált nevű fájl, azt kihagyjuk.
- Nem fájl jellegű részek vagy hiányzó fájlnevek: csak a használható fájlnévvel rendelkező, fájlszerű részek kerülnek hozzáadásra.

---

Lásd még

- [Beállítások](configuration)
