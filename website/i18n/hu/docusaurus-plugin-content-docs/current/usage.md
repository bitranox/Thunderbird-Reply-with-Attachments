---
id: usage
title: 'Használat'
sidebar_label: 'Használat'
---

---

## Használat {#usage}

- Válasz esetén a kiegészítő automatikusan hozzáadja az eredeti mellékleteket — vagy előbb rákérdez, ha a Beállításokban engedélyezve van.
- Duplikációmentesítés fájlnév alapján; az S/MIME részek mindig ki vannak hagyva. Az inline képek alapértelmezetten a válasz törzsében kerülnek visszaállításra (a Beállításokban az „Inline képek beillesztése” opcióval kikapcsolható).
- A feketelistázott mellékletek is kihagyásra kerülnek (kis- és nagybetűkre nem érzékeny glob minták, amelyek a fájlnevekre, nem pedig az elérési utakra illeszkednek). Lásd: [Beállítások](configuration#blacklist-glob-patterns).

---

### Mi történik válasz esetén {#what-happens}

- Válasz észlelése → eredeti mellékletek listázása → S/MIME + inline szűrése → opcionális megerősítés → jogosult fájlok hozzáadása (duplikátumok kihagyása) → inline képek visszaállítása a törzsben.

Szigorú vs. lazább futás: A kiegészítő először kizárja az S/MIME és az inline részeket a fájlmellékletek közül. Ha semmi sem felel meg, lefuttat egy lazább kört, amely továbbra is kizárja az S/MIME/inline elemeket, de több esetet elfogad (lásd: Kód részletei). Az inline képek soha nem kerülnek hozzáadásra fájlmellékletként; ehelyett, ha az „Inline képek beillesztése” engedélyezve van (alapértelmezett), közvetlenül a válasz törzsébe ágyazódnak be base64 adat‑URI‑ként.

| Rész típusa                                         |                        Szigorú futás |                         Lazább futás |
| --------------------------------------------------- | -----------------------------------: | -----------------------------------: |
| S/MIME aláírásfájl `smime.p7s`                      |                              Kizárva |                              Kizárva |
| S/MIME MIME‑típusok (`application/pkcs7-*`)         |                              Kizárva |                              Kizárva |
| Content‑ID által hivatkozott inline kép (`image/*`) | Kizárva (a törzsben helyreállítva\*) | Kizárva (a törzsben helyreállítva\*) |
| Csatolt e‑mail (`message/rfc822`) fájlnévvel        |                Nem kerül hozzáadásra |                          Hozzáadható |
| Szokásos fájlmelléklet fájlnévvel                   |                          Hozzáadható |                          Hozzáadható |

\* Ha az „Inline képek beillesztése” engedélyezve van (alapértelmezett: BE), az inline képek fájlként való csatolás helyett base64 adat‑URI‑ként ágyazódnak be a válasz törzsébe. Lásd: [Beállítások](configuration#include-inline-pictures).

Példa: Egyes mellékletekből hiányozhatnak bizonyos fejlécek, mégis szabályos fájlok (nem inline/S/MIME). Ha a szigorú futás nem talál ilyet, a lazább futás ezeket elfogadhatja és csatolhatja.

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
| ---------------------- | ------------------------------------------- |
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

- Az inline képek nem kerülnek fájlként csatolásra. Ha az „Inline képek beillesztése” BE (alapértelmezett), akkor a válasz törzsébe adat‑URI‑ként ágyazódnak. Ha a beállítás KI, az inline képek teljesen eltávolításra kerülnek. Lásd: [Beállítások](configuration#include-inline-pictures).
- Az S/MIME aláírásrészek tervezetten ki vannak zárva: az olyan fájlnevek, mint `smime.p7s`, valamint az olyan MIME‑típusok, mint `application/pkcs7-signature` vagy `application/pkcs7-mime` kimaradnak.
- A feketelista‑minták szűrhetik a jelölteket: lásd [Beállítások](configuration#blacklist-glob-patterns); az egyezés kis‑ és nagybetűkre nem érzékeny, és csak a fájlnévre vonatkozik.
- Az ismétlődő fájlnevek nem kerülnek újra hozzáadásra: ha a levélírásban már szerepel azonos, normalizált nevű fájl, azt kihagyjuk.
- Nem fájl jellegű részek vagy hiányzó fájlnevek: csak a használható fájlnévvel rendelkező, fájlszerű részek kerülnek hozzáadásra.

---

Lásd még

- [Beállítások](configuration)
