---
id: usage
title: 'Uporaba'
sidebar_label: 'Uporaba'
---

---

## Uporaba {#usage}

- Pri odgovoru dodatek samodejno doda izvirne priloge — ali pa najprej vpraša, če je to omogočeno v Možnostih.
- Podvojeni deli so odstranjeni glede na ime datoteke; deli S/MIME so vedno preskočeni. Slike, vdelane v izvirno sporočilo, ostanejo v telesu odgovora, kamor jih postavi Thunderbird, in se ne kopirajo kot datoteke.
- Priloge na črnem seznamu so prav tako izpuščene (vzorci glob brez razlikovanja velikosti črk, ki se ujemajo z imeni datotek, ne s potmi). Glejte [Konfiguracija](configuration#blacklist-glob-patterns).

---

### Kaj se zgodi ob odgovoru {#what-happens}

- Zaznaj odgovor → izpiši izvirne priponke → preskoči S/MIME in vdelane slike → izbirna potrditev → dodaj ustrezne datoteke (s preskokom podvojenih).

| Vrsta dela                                                 | Kopirano v odgovor |
|------------------------------------------------------------|-------------------:|
| Datoteka podpisa S/MIME `smime.p7s`                        | Ne                 |
| Vrste MIME S/MIME (`application/pkcs7-*`)                  | Ne                 |
| Slika, ki jo telo sporočila vdela prek `cid:`              | Ne (je v telesu)   |
| Slika, označena kot `Content-Disposition: inline`          | Ne (je v telesu)   |
| Slika z `Content-ID`, na katero se telo nikoli ne sklicuje | Da                 |
| Priložena e-pošta (`message/rfc822`) z imenom datoteke     | Da                 |
| Navadna priloga datoteke z imenom datoteke                 | Da                 |

Slika šteje za vdelano le, kadar se izvirno sporočilo dejansko sklicuje nanjo, ali kadar jo je pošiljatelj izrecno
označil kot `Content-Disposition: inline`. Sama glava `Content-ID` ne zadošča: več e-poštnih odjemalcev jo doda vsakemu
delu slike, vključno s pristnimi prilogami, te pa je še vedno treba kopirati.

---

### Navzkrižni sklic {#cross-reference}

- Posredovanje se po zasnovi ne spreminja (glejte Omejitve spodaj).
- Razloge, zakaj priloga morda ne bo dodana, glejte »Zakaj priloge morda ne bodo dodane«.

---

## Podrobnosti delovanja {#behavior-details}

- Preprečevanje dvojnikov: Dodatek označi zavihek za sestavljanje kot obdelan z vrednostjo seje na posamezen zavihek in z varovalom v pomnilniku. Izvirnikov ne bo dodal dvakrat.
- Zapiranje in ponovno odpiranje okna za sestavljanje se obravnava kot nov zavihek (tj. dovoljen je nov poskus).
- Upoštevanje obstoječih prilog: Če sestavljanje že vsebuje nekatere priloge, se izvirniki vseeno dodajo natanko enkrat, pri čemer se preskočijo imena datotek, ki že obstajajo.
- Izključitve: Artefakti S/MIME in vdelane slike so izključeni iz datotečnih prilog. Če se v prvem prehodu nič ne kvalificira, ohlapna zasilna možnost znova preveri ne‑S/MIME dele. Vdelane slike se obravnavajo ločeno: obnovljene so v telesu odgovora kot podatkovni URI-ji (ko je omogočeno).
  - Imena datotek: `smime.p7s`
  - Vrste MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Vdelane slike: vsak del `image/*`, na katerega se sklicuje Content‑ID — izključen iz datotečnih prilog, vendar vdelan v telo odgovora, ko je "Vključi vdelane slike" VKLJUČENO
  - Priložena e‑sporočila (`message/rfc822`): obravnavana kot običajne priloge, če imajo ime datoteke; lahko se dodajo (ob preverjanju dvojnikov in črnega seznama).
- Opozorilo o črnem seznamu (če je omogočeno): Ko vaš črni seznam izključi kandidate, dodatek prikaže majhno modalno okno z navedenimi prizadetimi datotekami in ujemajočimi se vzorci. To opozorilo se prikaže tudi v primerih, ko ne bo dodana nobena priloga, ker je bilo vse izključeno.

---

## Bližnjice na tipkovnici {#keyboard-shortcuts}

- Pogovorno okno za potrditev: Y/J = Da, N/Esc = Ne; Tab/Shift+Tab in smerne tipke preklapljajo fokus.
  - »Privzeti odgovor« v [Konfiguracija](configuration#confirmation) nastavi začetni fokus gumba.
  - Enter aktivira izbrani gumb. Tab/Shift+Tab in puščice premikajo fokus zaradi dostopnosti.

### Povzetek bližnjic na tipkovnici {#keyboard-cheat-sheet}

| Tipke            | Dejanje                           |
|------------------|-----------------------------------|
| Y / J            | Potrdi Da                         |
| N / Esc          | Potrdi Ne                         |
| Enter            | Aktiviraj izbrani gumb            |
| Tab / Shift+Tab  | Premakni fokus naprej/nazaj       |
| Smerne tipke     | Premikaj fokus med gumbi          |
| Privzeti odgovor | Nastavi začetni fokus (Da ali Ne) |

---

## Omejitve {#limitations}

- Posredovanje se s tem dodatkom ne spreminja (podprta sta Odgovori in Odgovori vsem).
- Zelo velike priloge so lahko predmet omejitev Thunderbirda ali ponudnika.
  - Dodatek ne razdeli ali stisne datotek; zanaša se na običajno ravnanje Thunderbirda s prilogami.
- Šifrirana sporočila: deli S/MIME so namenoma izključeni.

---

## Zakaj priloge morda ne bodo dodane {#why-attachments-might-not-be-added}

- Slike, ki jih vdela izvirno sporočilo, niso kopirane kot datoteke. Že so v telesu odgovora, tam, kamor jih je postavil Thunderbird. Glej [Configuration](configuration#include-inline-pictures).
- Deli podpisa S/MIME so po zasnovi izključeni: imena datotek, kot je `smime.p7s`, in vrste MIME, kot sta `application/pkcs7-signature` ali `application/pkcs7-mime`, so preskočene.
- Vzorci črnega seznama lahko filtrirajo kandidate: glejte [Konfiguracija](configuration#blacklist-glob-patterns); ujemanje ne razlikuje velikih/malih črk in upošteva le ime datoteke.
- Podvojena imena datotek se ne dodajo znova: če sestavljanje že vsebuje datoteko z enakim normaliziranim imenom, je preskočena.
- Deli, ki niso datoteke, ali manjkajoča imena: za dodajanje se upoštevajo samo deli, podobni datotekam, z uporabnimi imeni datotek.

---

Glej tudi

- [Konfiguracija](configuration)
