---
id: usage
title: 'Upotreba'
sidebar_label: 'Употреба'
---

---

## Upotreba {#usage}

- Odgovorite i dodatak automatski dodaje originale — ili prvo pita, ako je omogućeno u Opcijama.
- Uklanjanje duplikata po nazivu datoteke; S/MIME delovi se uvek preskaču. Ugrađene slike se podrazumevano obnavljaju u telu odgovora (onemogućite preko „Uključi ugrađene slike” u Opcijama).
- Prilozi na crnoj listi se takođe preskaču (glob obrasci neosetljivi na velika/mala slova koji se poklapaju sa nazivima datoteka, ne sa putanjama). Videti [Konfiguracija](configuration#blacklist-glob-patterns).

---

### Šta se dešava pri odgovoru {#what-happens}

- Otkrivanje odgovora → lista originalnih priloga → filtriranje S/MIME + ugrađenih → opciona potvrda → dodavanje podobnih datoteka (preskok duplikata) → vraćanje ugrađenih slika u telo.

Strogi naspram opuštenog prolaza: Dodatak najpre isključuje S/MIME i ugrađene delove iz datotečnih priloga. Ako ništa ne ispunjava uslove, pokreće opušteni prolaz koji i dalje isključuje S/MIME/ugrađene, ali toleriše više slučajeva (videti Detalje koda). Ugrađene slike se nikada ne dodaju kao datotečni prilozi; umesto toga, kada je „Uključi ugrađene slike” omogućeno (podrazumevano), one se neposredno ugrađuju u telo odgovora kao base64 data URI‑ji.

| Tip dela                                                 |                 Strogi prolaz |               Opušteni prolaz |
| -------------------------------------------------------- | ----------------------------: | ----------------------------: |
| S/MIME datoteka potpisa `smime.p7s`                      |                    Isključeno |                    Isključeno |
| S/MIME MIME tipovi (`application/pkcs7-*`)               |                    Isključeno |                    Isključeno |
| Ugrađena slika na koju upućuje Content‑ID (`image/*`)    | Isključeno (vraćeno u telu\*) | Isključeno (vraćeno u telu\*) |
| Priložena e‑pošta (`message/rfc822`) sa nazivom datoteke |                   Nije dodato |              Može biti dodato |
| Uobičajeni datotečni prilog sa nazivom datoteke          |              Može biti dodato |              Može biti dodato |

\* Kada je „Uključi ugrađene slike” omogućeno (podrazumevano: UKLJUČENO), ugrađene slike se ubacuju u telo odgovora kao base64 data URI‑ji umesto da se dodaju kao datotečni prilozi. Videti [Konfiguracija](configuration#include-inline-pictures).

Primer: Neki prilozi mogu da nemaju određena zaglavlja, ali su i dalje obične datoteke (ne ugrađene/S/MIME). Ako strogi prolaz ne pronađe nijedan, opušteni prolaz može prihvatiti takve i priložiti ih.

---

### Unakrsno upućivanje {#cross-reference}

- Prosleđivanje se namerno ne menja (videti Ograničenja dole).
- Razloge zbog kojih prilog možda neće biti dodat pogledajte u „Zašto prilozi možda neće biti dodati”.

---

## Detalji ponašanja {#behavior-details}

- Sprečavanje duplikata: Dodatak obeležava karticu za pisanje kao obrađenu koristeći vrednost sesije po kartici i zaštitu u memoriji. Originali se neće dodati dvaput.
- Zatvaranje i ponovno otvaranje prozora za pisanje tretira se kao nova kartica (tj. dozvoljen je novi pokušaj).
- Poštovanje postojećih priloga: Ako prozor za pisanje već sadrži neke priloge, originali se i dalje dodaju tačno jednom, preskačući nazive datoteka koji već postoje.
- Isključenja: S/MIME artefakti i ugrađene slike su isključeni iz datotečnih priloga. Ako ništa ne ispunjava uslove u prvom prolazu, opušteni rezervni prolaz ponovo proverava ne‑S/MIME delove. Ugrađene slike se obrađuju odvojeno: one se vraćaju u telo odgovora kao data URI‑ji (kada je omogućeno).
  - Nazivi datoteka: `smime.p7s`
  - MIME tipovi: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Ugrađene slike: bilo koji `image/*` deo na koji upućuje Content‑ID — isključeno iz datotečnih priloga, ali ugrađeno u telo odgovora kada je „Uključi ugrađene slike” UKLJUČENO
  - Priložene poruke e‑pošte (`message/rfc822`): tretiraju se kao uobičajeni prilozi ako imaju naziv datoteke; mogu biti dodate (podložno proveri duplikata i crnoj listi).
- Upozorenje o crnoj listi (ako je omogućeno): Kada vaša crna lista isključi kandidate,
  dodatak prikazuje mali modal sa spiskom pogođenih fajlova i odgovarajućih
  obrazaca. Ovo upozorenje se pojavljuje i u slučajevima kada neće biti
  dodat nijedan prilog jer je sve isključeno.

---

## Prečice na tastaturi {#keyboard-shortcuts}

- Dijalog za potvrdu: Y/J = Da, N/Esc = Ne; Tab/Shift+Tab i tasteri strelica kruže fokus.
  - „Podrazumevani odgovor” u [Konfiguracija](configuration#confirmation) postavlja početno fokusirano dugme.
  - Enter aktivira fokusirano dugme. Tab/Shift+Tab i strelice pomeraju fokus radi pristupačnosti.

### Pregled prečica na tastaturi {#keyboard-cheat-sheet}

| Tasteri               | Radnja                              |
| --------------------- | ----------------------------------- |
| Y / J                 | Potvrdi Da                          |
| N / Esc               | Potvrdi Ne                          |
| Enter                 | Aktiviraj fokusirano dugme          |
| Tab / Shift+Tab       | Pomeri fokus napred/nazad           |
| Tasteri strelica      | Pomeri fokus između dugmadi         |
| Podrazumevani odgovor | Postavlja početni fokus (Da ili Ne) |

---

## Ograničenja {#limitations}

- Prosleđivanje se ne menja ovim dodatkom (Odgovori i Odgovori svima su podržani).
- Veoma veliki prilozi mogu biti ograničeni Thunderbirda ili provajdera.
  - Dodatak ne deli na delove niti kompresuje datoteke; oslanja se na uobičajeno rukovanje prilozima u Thunderbirdu.
- Šifrovane poruke: S/MIME delovi su namerno isključeni.

---

## Zašto prilozi možda neće biti dodati {#why-attachments-might-not-be-added}

- Ugrađene slike se ne dodaju kao datotečni prilozi. Kada je „Uključi ugrađene slike” UKLJUČENO (podrazumevano), one se umeću u telo odgovora kao data URI‑ji. Ako je podešavanje ISKLJUČENO, ugrađene slike se u potpunosti uklanjaju. Videti [Konfiguracija](configuration#include-inline-pictures).
- Delovi S/MIME potpisa su namerno isključeni: nazivi datoteka kao `smime.p7s` i MIME tipovi kao što su `application/pkcs7-signature` ili `application/pkcs7-mime` se preskaču.
- Obrasci crne liste mogu filtrirati kandidate: videti [Konfiguracija](configuration#blacklist-glob-patterns); poređenje nije osetljivo na veličinu slova i odnosi se samo na naziv datoteke.
- Duplirani nazivi datoteka se ne dodaju ponovo: ako prozor za pisanje već sadrži datoteku sa istim normalizovanim nazivom, ona se preskače.
- Delovi koji nisu datoteke ili bez naziva datoteke: razmatraju se samo delovi nalik datotekama sa upotrebljivim nazivima.

---

Vidi i

- [Konfiguracija](configuration)
