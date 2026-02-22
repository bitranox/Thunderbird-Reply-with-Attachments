---
id: usage
title: 'Upotreba'
sidebar_label: 'Upotreba'
---

---

## Upotreba {#usage}

- Odgovorite i dodatak automatski dodaje originale — ili prvo pita, ako je omogućeno u Opcijama.
- Duplikati se uklanjaju prema nazivu datoteke; S/MIME dijelovi se uvijek preskaču. Ugrađene slike se po zadanom vraćaju u tijelu odgovora (onemogućite putem "Include inline pictures" u Opcijama).
- Prilozi na crnoj listi se također preskaču (glob obrasci neosjetljivi na veličinu slova koji se poklapaju s nazivima datoteka, ne s putanjama). Vidi [Konfiguracija](configuration#blacklist-glob-patterns).

---

### Šta se dešava pri odgovoru {#what-happens}

- Otkrije odgovor → nabroji izvorne priloge → filtrira S/MIME + inline → opcionalna potvrda → doda podobne datoteke (preskoči duplikate) → vrati ugrađene slike u tijelo odgovora.

Strogi naspram opuštenog prolaza: Dodatak prvo isključuje S/MIME i inline dijelove iz datotečnih priloga. Ako ništa ne ispunjava uslove, pokreće opušteni prolaz koji i dalje isključuje S/MIME/inline, ali tolerira više slučajeva (vidi Detalje koda). Ugrađene slike se nikada ne dodaju kao datotečni prilozi; umjesto toga, kada je uključeno "Include inline pictures" (zadano), one se ugrađuju direktno u tijelo odgovora kao base64 data URI-ji.

| Vrsta dijela                                           |                   Strogi prolaz |                 Opušteni prolaz |
| ------------------------------------------------------ | ------------------------------: | ------------------------------: |
| Datoteka S/MIME potpisa `smime.p7s`                    |                      Isključeno |                      Isključeno |
| S/MIME MIME tipovi (`application/pkcs7-*`)             |                      Isključeno |                      Isključeno |
| Ugrađena slika referencirana Content‑ID‑om (`image/*`) | Isključeno (vraćeno u tijelu\*) | Isključeno (vraćeno u tijelu\*) |
| Priloženi email (`message/rfc822`) s nazivom datoteke  |                     Nije dodano |                Može biti dodano |
| Uobičajeni datotečni prilog s nazivom datoteke         |                Može biti dodano |                Može biti dodano |

\* Kada je "Include inline pictures" omogućeno (zadano: UKLJUČENO), ugrađene slike se umeću u tijelo odgovora kao base64 data URI-ji umjesto da se dodaju kao datotečni prilozi. Vidi [Konfiguracija](configuration#include-inline-pictures).

Primjer: Nekim prilozima mogu nedostajati određena zaglavlja, ali su i dalje obične datoteke (ne inline/S/MIME). Ako strogi prolaz ne nađe nijedan, opušteni prolaz može prihvatiti te i priložiti ih.

---

### Unakrsna referenca {#cross-reference}

- Prosljeđivanje se namjerno ne mijenja (vidi Ograničenja ispod).
- Za razloge zbog kojih prilog možda neće biti dodan, vidi “Zašto prilozi možda neće biti dodani”.

---

## Detalji ponašanja {#behavior-details}

- **Sprječavanje duplikata:** Dodatak označava karticu za pisanje kao obrađenu koristeći vrijednost sesije po kartici i zaštitu u memoriji. Neće dodati originale dvaput.
- Zatvaranje i ponovno otvaranje prozora za pisanje tretira se kao nova kartica (tj. dozvoljen je novi pokušaj).
- **Poštivanje postojećih priloga:** Ako prozor za pisanje već sadrži neke priloge, originali se i dalje dodaju tačno jednom, preskačući nazive datoteka koji već postoje.
- **Isključenja:** S/MIME artefakti i ugrađene slike su isključeni iz datotečnih priloga. Ako se ništa ne kvalificira u prvom prolazu, opušteni rezervni prolaz ponovo provjerava ne‑S/MIME dijelove. Ugrađene slike se obrađuju odvojeno: vraćaju se u tijelo odgovora kao data URI-ji (kada je omogućeno).
  - **Nazivi datoteka:** `smime.p7s`
  - **MIME tipovi:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Ugrađene slike:** svaki `image/*` dio referenciran Content‑ID‑om — isključen iz datotečnih priloga, ali ugrađen u tijelo odgovora kada je "Include inline pictures" UKLJUČENO
  - **Priložene e‑poruke (`message/rfc822`):** tretiraju se kao obični prilozi ako imaju naziv datoteke; mogu biti dodane (podložno provjeri duplikata i crnoj listi).
- **Upozorenje o crnoj listi (ako je omogućeno):** Kada su kandidati isključeni vašom crnom listom,
  dodatak prikazuje mali modal sa spiskom pogođenih datoteka i odgovarajućih
  obrazaca. Ovo upozorenje se pojavljuje i u slučajevima kada nijedan prilog neće biti
  dodan jer je sve isključeno.

---

## Prečice na tastaturi {#keyboard-shortcuts}

- Dijalog za potvrdu: Y/J = Da, N/Esc = Ne; Tab/Shift+Tab i tasteri sa strelicama kružno mijenjaju fokus.
  - “Default answer” u [Konfiguraciji](configuration#confirmation) postavlja početno fokusirano dugme.
  - Enter aktivira fokusirano dugme. Tab/Shift+Tab i strelice pomjeraju fokus radi pristupačnosti.

### Kratki podsjetnik za tastaturu {#keyboard-cheat-sheet}

| Tasteri               | Radnja                              |
| --------------------- | ----------------------------------- |
| Y / J                 | Potvrdi Da                          |
| N / Esc               | Potvrdi Ne                          |
| Enter                 | Aktiviraj fokusirano dugme          |
| Tab / Shift+Tab       | Pomjeri fokus naprijed/nazad        |
| Tasteri sa strelicama | Pomjeri fokus između dugmadi        |
| Default answer        | Postavlja početni fokus (Da ili Ne) |

---

## Ograničenja {#limitations}

- Prosljeđivanje se ne mijenja ovim dodatkom (podržani su Odgovori i Odgovori svima).
- Vrlo veliki prilozi mogu podlijegati ograničenjima Thunderbirda ili pružaoca usluge.
  - Dodatak ne dijeli niti komprimira datoteke; oslanja se na uobičajeno Thunderbirdovo rukovanje prilozima.
- Šifrirane poruke: S/MIME dijelovi su namjerno isključeni.

---

## Zašto prilozi možda neće biti dodani {#why-attachments-might-not-be-added}

- Ugrađene slike se ne dodaju kao datotečni prilozi. Kada je "Include inline pictures" UKLJUČENO (zadano), one se umjesto toga ugrađuju u tijelo odgovora kao data URI-ji. Ako je postavka ISKLJUČENA, ugrađene slike se u potpunosti uklanjaju. Vidi [Konfiguracija](configuration#include-inline-pictures).
- S/MIME dijelovi potpisa su po dizajnu isključeni: nazivi datoteka poput `smime.p7s` i MIME tipovi kao što su `application/pkcs7-signature` ili `application/pkcs7-mime` se preskaču.
- Obrasci crne liste mogu filtrirati kandidate: vidi [Konfiguracija](configuration#blacklist-glob-patterns); podudaranje nije osjetljivo na veličinu slova i odnosi se samo na nazive datoteka.
- Duplikatni nazivi datoteka se ne dodaju ponovno: ako prozor za pisanje već sadrži datoteku s istim normaliziranim nazivom, ona se preskače.
- Nedatotečni dijelovi ili nedostajući nazivi: samo dijelovi koji izgledaju kao datoteke s upotrebljivim nazivima uzimaju se u obzir za dodavanje.

---

Vidi i

- [Konfiguracija](configuration)
