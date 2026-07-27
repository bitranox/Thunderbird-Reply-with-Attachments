---
id: usage
title: 'Upotreba'
sidebar_label: 'Употреба'
---

---

## Upotreba {#usage}

- Odgovorite i dodatak automatski dodaje originale — ili prvo pita, ako je omogućeno u Opcijama.
- Дупликати се уклањају према имену датотеке; S/MIME делови се увек прескачу. Слике угнежђене у оригиналној поруци остају у телу одговора, где их Thunderbird поставља, и не копирају се као датотеке.
- Prilozi na crnoj listi se takođe preskaču (glob obrasci neosetljivi na velika/mala slova koji se poklapaju sa nazivima datoteka, ne sa putanjama). Videti [Konfiguracija](configuration#blacklist-glob-patterns).

---

### Šta se dešava pri odgovoru {#what-happens}

- Откриј одговор → излистај оригиналне прилоге → прескочи S/MIME и уграђене слике → опционална потврда → додај прилоге који испуњавају услове (прескачући дупликате).

| Врста дела                                             | Копира се у одговор   |
|--------------------------------------------------------|----------------------:|
| S/MIME датотека потписа `smime.p7s`                    | Не                    |
| S/MIME MIME типови (`application/pkcs7-*`)             | Не                    |
| Слика коју тело поруке угнежђује преко `cid:`          | Не (налази се у телу) |
| Слика означена као `Content-Disposition: inline`       | Не (налази се у телу) |
| Слика са `Content-ID` на коју се тело никада не позива | Да                    |
| Приложена порука (`message/rfc822`) са именом датотеке | Да                    |
| Обичан прилог датотеке са именом датотеке              | Да                    |

Слика се сматра угнежђеном само када је оригинална порука заиста референцира,
или када је пошиљалац изричито означио као `Content-Disposition: inline`. Само
заглавље `Content-ID` није довољно: неки програми за е-пошту постављају га на
сваки део слике, укључујући праве прилоге, које и даље треба копирати.

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
|-----------------------|-------------------------------------|
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

- Слике које оригинална порука уграђује не копирају се као фајлови. Оне се већ налазе у телу одговора, тамо где их је Thunderbird сместио. Погледајте [Configuration](configuration#include-inline-pictures).
- Delovi S/MIME potpisa su namerno isključeni: nazivi datoteka kao `smime.p7s` i MIME tipovi kao što su `application/pkcs7-signature` ili `application/pkcs7-mime` se preskaču.
- Obrasci crne liste mogu filtrirati kandidate: videti [Konfiguracija](configuration#blacklist-glob-patterns); poređenje nije osetljivo na veličinu slova i odnosi se samo na naziv datoteke.
- Duplirani nazivi datoteka se ne dodaju ponovo: ako prozor za pisanje već sadrži datoteku sa istim normalizovanim nazivom, ona se preskače.
- Delovi koji nisu datoteke ili bez naziva datoteke: razmatraju se samo delovi nalik datotekama sa upotrebljivim nazivima.

---

Vidi i

- [Konfiguracija](configuration)
