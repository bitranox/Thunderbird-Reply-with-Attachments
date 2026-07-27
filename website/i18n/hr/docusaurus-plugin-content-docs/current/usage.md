---
id: usage
title: 'Uporaba'
sidebar_label: 'Uporaba'
---

---

## Upotreba {#usage}

- Odgovorite i dodatak automatski dodaje originale — ili prvo pita, ako je omogućeno u Opcijama.
- Deduplicirano prema nazivu datoteke; S/MIME dijelovi se uvijek preskaču. Slike ugrađene u izvornu poruku ostaju u tijelu odgovora, gdje ih Thunderbird postavlja, i ne kopiraju se kao datoteke.
- Privici na crnoj listi se također preskaču (glob uzorci neosjetljivi na velika/mala slova koji odgovaraju nazivima datoteka, ne putanjama). Vidi [Konfiguraciju](configuration#blacklist-glob-patterns).

---

### Što se događa pri odgovoru {#what-happens}

- Otkrivanje odgovora → popis izvornih privitaka → preskakanje S/MIME-a i ugrađenih slika → neobavezna potvrda → dodavanje prihvatljivih datoteka (uz preskakanje duplikata).

| Vrsta dijela                                             | Kopirano u odgovor      |
|----------------------------------------------------------|------------------------:|
| Datoteka S/MIME potpisa `smime.p7s`                      | Ne                      |
| S/MIME MIME vrste (`application/pkcs7-*`)                | Ne                      |
| Slika koju tijelo poruke ugrađuje putem `cid:`           | Ne (nalazi se u tijelu) |
| Slika označena kao `Content-Disposition: inline`         | Ne (nalazi se u tijelu) |
| Slika s `Content-ID` na koju se tijelo nikad ne poziva   | Da                      |
| Priložena e-poruka (`message/rfc822`) s nazivom datoteke | Da                      |
| Obični privitak s nazivom datoteke                       | Da                      |

Slika se smatra ugrađenom samo kada se izvorna poruka doista poziva na nju, ili kada ju je pošiljatelj izričito označio kao `Content-Disposition: inline`. Samo zaglavlje `Content-ID` nije dovoljno: nekoliko klijenata e-pošte postavlja ga na svaki dio slike, uključujući prave privitke, a njih je i dalje potrebno kopirati.

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
|---------------------|-------------------------------------|
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

- Slike koje izvorna poruka ugrađuje ne kopiraju se kao datoteke. One su već u tijelu odgovora, gdje ih je smjestio Thunderbird. Pogledajte [Konfiguracija](configuration#include-inline-pictures).
- S/MIME dijelovi potpisa su isključeni po dizajnu: nazivi datoteka poput `smime.p7s` i MIME tipovi kao `application/pkcs7-signature` ili `application/pkcs7-mime` se preskaču.
- Uzorci crne liste mogu filtrirati kandidate: vidi [Konfiguraciju](configuration#blacklist-glob-patterns); podudaranje nije osjetljivo na velika/mala slova i odnosi se samo na nazive datoteka.
- Duplicirani nazivi datoteka se ne dodaju ponovno: ako sastavljanje već sadrži datoteku s istim normaliziranim nazivom, preskače se.
- Dijelovi koji nisu datoteke ili nedostajući nazivi datoteka: za dodavanje se uzimaju u obzir samo dijelovi nalik datotekama s upotrebljivim nazivima.

---

Vidi također

- [Konfiguracija](configuration)
