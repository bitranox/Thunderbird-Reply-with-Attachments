---
id: usage
title: 'Uporaba'
sidebar_label: 'Uporaba'
---

---

## Upotreba {#usage}

- Odgovorite i dodatak automatski dodaje originale — ili prvo pita, ako je omogućeno u Opcijama.
- Uklanjanje duplikata prema nazivu datoteke; S/MIME dijelovi se uvijek preskaču. Ugrađene slike se prema zadanim postavkama vraćaju u tijelo odgovora (onemogućite putem "Uključi ugrađene slike" u Opcijama).
- Privici na crnoj listi se također preskaču (glob uzorci neosjetljivi na velika/mala slova koji odgovaraju nazivima datoteka, ne putanjama). Vidi [Konfiguraciju](configuration#blacklist-glob-patterns).

---

### Što se događa pri odgovoru {#what-happens}

- Otkrij odgovor → popiši izvorne privitke → filtriraj S/MIME + ugrađene → neobvezna potvrda → dodaj prihvatljive datoteke (preskoči duplikate) → vrati ugrađene slike u tijelo.

Strogi naspram opuštenog prolaza: Dodatak najprije isključuje S/MIME i ugrađene dijelove iz privitaka datoteka. Ako ništa ne ispunjava uvjete, pokreće opušteni prolaz koji i dalje isključuje S/MIME/ugrađene, ali tolerira više slučajeva (vidi Pojedinosti o kodu). Ugrađene slike se nikada ne dodaju kao privici datoteka; umjesto toga, kada je uključeno "Uključi ugrađene slike" (zadano), one se ugrađuju izravno u tijelo odgovora kao base64 data URI-ji.

| Vrsta dijela                                             |                   Strogi prolaz |                 Opušteni prolaz |
| -------------------------------------------------------- | ------------------------------: | ------------------------------: |
| S/MIME datoteka potpisa `smime.p7s`                      |                      Isključeno |                      Isključeno |
| S/MIME MIME tipovi (`application/pkcs7-*`)               |                      Isključeno |                      Isključeno |
| Ugrađena slika na koju upućuje Content‑ID (`image/*`)    | Isključeno (vraćeno u tijelo\*) | Isključeno (vraćeno u tijelo\*) |
| Priložena e‑poruka (`message/rfc822`) s nazivom datoteke |                     Nije dodano |                Može biti dodano |
| Uobičajeni privitak datoteke s nazivom                   |                Može biti dodano |                Može biti dodano |

\* Kada je "Uključi ugrađene slike" omogućeno (zadano: UKLJ.), ugrađene se slike umeću u tijelo odgovora kao base64 data URI-ji umjesto da se dodaju kao privici datoteka. Vidi [Konfiguraciju](configuration#include-inline-pictures).

Primjer: Neki privici mogu nedostajati određenim zaglavljima, ali su i dalje obične datoteke (ne ugrađene/S/MIME). Ako strogi prolaz ne pronađe nijedan, opušteni može prihvatiti takve i priložiti ih.

---

### Unakrsno upućivanje {#cross-reference}

- Prosljeđivanje se namjerno ne mijenja (vidi Ograničenja niže).
- Razloge zašto privitak možda neće biti dodan vidi u "Zašto privici možda neće biti dodani".

---

## Pojedinosti o ponašanju {#behavior-details}

- Sprječavanje duplikata: Dodatak označava karticu sastavljanja kao obrađenu koristeći vrijednost sesije po kartici i zaštitu u memoriji. Neće dvaput dodati originale.
- Zatvaranje i ponovno otvaranje prozora za sastavljanje tretira se kao nova kartica (tj. dopušten je novi pokušaj).
- Poštivanje postojećih privitaka: Ako sastavljanje već sadrži neke privitke, originali se i dalje dodaju točno jednom, preskačući nazive datoteka koji već postoje.
- Isključenja: S/MIME artefakti i ugrađene slike su isključeni iz privitaka datoteka. Ako ništa ne ispunjava uvjete u prvom prolazu, opuštena zamjena ponovno provjerava ne‑S/MIME dijelove. Ugrađene slike se obrađuju zasebno: vraćaju se u tijelo odgovora kao data URI‑ji (kada je omogućeno).
  - Nazivi datoteka: `smime.p7s`
  - MIME tipovi: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Ugrađene slike: bilo koji `image/*` dio na koji upućuje Content‑ID — isključen iz privitaka datoteka, ali ugrađen u tijelo odgovora kada je "Uključi ugrađene slike" UKLJ.
  - Priložene e‑poruke (`message/rfc822`): tretiraju se kao obični privici ako imaju naziv datoteke; mogu biti dodane (podložno provjeri duplikata i crnoj listi).
- Upozorenje o crnoj listi (ako je omogućeno): Kada vaša crna lista isključi kandidate,
  dodatak prikazuje mali modal s popisom pogođenih datoteka i odgovarajućeg
  uzorka/uzoraka. Ovo upozorenje se pojavljuje i u slučajevima kada nijedan privitak neće biti
  dodan jer je sve isključeno.

---

## Prečaci na tipkovnici {#keyboard-shortcuts}

- Dijalog potvrde: Y/J = Da, N/Esc = Ne; Tab/Shift+Tab i tipke sa strelicama kruže fokusom.
  - "Zadani odgovor" u [Konfiguraciji](configuration#confirmation) postavlja početno fokusirani gumb.
  - Enter aktivira fokusirani gumb. Tab/Shift+Tab i strelice pomiču fokus radi pristupačnosti.

### Kratki podsjetnik za tipkovničke prečace {#keyboard-cheat-sheet}

| Tipke               | Radnja                              |
| ------------------- | ----------------------------------- |
| Y / J               | Potvrdi Da                          |
| N / Esc             | Potvrdi Ne                          |
| Enter               | Aktiviraj fokusirani gumb           |
| Tab / Shift+Tab     | Pomakni fokus naprijed/natrag       |
| Tipke sa strelicama | Pomakni fokus između gumba          |
| Zadani odgovor      | Postavlja početni fokus (Da ili Ne) |

---

## Ograničenja {#limitations}

- Prosljeđivanje se ne mijenja ovim dodatkom (Odgovori i Odgovori svima su podržani).
- Vrlo veliki privici mogu podlijegati ograničenjima Thunderbirda ili pružatelja usluge.
  - Dodatak ne dijeli na dijelove niti komprimira datoteke; oslanja se na uobičajeno rukovanje privicima Thunderbirda.
- Šifrirane poruke: S/MIME dijelovi su namjerno isključeni.

---

## Zašto privici možda neće biti dodani {#why-attachments-might-not-be-added}

- Ugrađene slike se ne dodaju kao privici datoteka. Kada je "Uključi ugrađene slike" UKLJ. (zadano), one se umjesto toga umeću u tijelo odgovora kao data URI‑ji. Ako je postavka ISKLJ., ugrađene slike se u potpunosti uklanjaju. Vidi [Konfiguraciju](configuration#include-inline-pictures).
- S/MIME dijelovi potpisa su isključeni po dizajnu: nazivi datoteka poput `smime.p7s` i MIME tipovi kao `application/pkcs7-signature` ili `application/pkcs7-mime` se preskaču.
- Uzorci crne liste mogu filtrirati kandidate: vidi [Konfiguraciju](configuration#blacklist-glob-patterns); podudaranje nije osjetljivo na velika/mala slova i odnosi se samo na nazive datoteka.
- Duplicirani nazivi datoteka se ne dodaju ponovno: ako sastavljanje već sadrži datoteku s istim normaliziranim nazivom, preskače se.
- Dijelovi koji nisu datoteke ili nedostajući nazivi datoteka: za dodavanje se uzimaju u obzir samo dijelovi nalik datotekama s upotrebljivim nazivima.

---

Vidi također

- [Konfiguracija](configuration)
