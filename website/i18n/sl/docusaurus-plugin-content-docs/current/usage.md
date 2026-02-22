---
id: usage
title: 'Uporaba'
sidebar_label: 'Uporaba'
---

---

## Uporaba {#usage}

- Pri odgovoru dodatek samodejno doda izvirne priloge — ali pa najprej vpraša, če je to omogočeno v Možnostih.
- Odstranjevanje dvojnikov po imenu datoteke; deli S/MIME so vedno izpuščeni. Vdelane slike so privzeto obnovljene v telesu odgovora (onemogočite prek "Vključi vdelane slike" v Možnostih).
- Priloge na črnem seznamu so prav tako izpuščene (vzorci glob brez razlikovanja velikosti črk, ki se ujemajo z imeni datotek, ne s potmi). Glejte [Konfiguracija](configuration#blacklist-glob-patterns).

---

### Kaj se zgodi ob odgovoru {#what-happens}

- Zaznaj odgovor → naštej izvirne priloge → filtriraj S/MIME + vdelane → po potrebi potrdi → dodaj ustrezne datoteke (preskoči dvojnike) → obnovi vdelane slike v telesu.

Strogi vs. ohlapni prehod: Dodatek najprej izključi dele S/MIME in vdelane dele iz datotečnih prilog. Če se nič ne kvalificira, zažene ohlapni prehod, ki še vedno izključuje S/MIME/vdelane dele, a dopušča več primerov (glejte Podrobnosti kode). Vdelane slike se nikoli ne dodajo kot datotečne priloge; namesto tega, ko je omogočeno "Vključi vdelane slike" (privzeto), so neposredno vdelane v telo odgovora kot podatkovni URI-ji base64.

| Vrsta dela                                                  |                      Strogi prehod |                     Ohlapni prehod |
| ----------------------------------------------------------- | ---------------------------------: | ---------------------------------: |
| Datoteka podpisa S/MIME `smime.p7s`                         |                         Izključeno |                         Izključeno |
| Vrste MIME S/MIME (`application/pkcs7-*`)                   |                         Izključeno |                         Izključeno |
| Vdelana slika, na katero se sklicuje Content‑ID (`image/*`) | Izključeno (obnovljeno v telesu\*) | Izključeno (obnovljeno v telesu\*) |
| Priloženo e‑sporočilo (`message/rfc822`) z imenom datoteke  |                          Ni dodano |                      Lahko se doda |
| Običajna datotečna priloga z imenom datoteke                |                      Lahko se doda |                      Lahko se doda |

\* Ko je "Vključi vdelane slike" omogočeno (privzeto: VKLJUČENO), so vdelane slike vdelane v telo odgovora kot podatkovni URI-ji base64, namesto da bi bile dodane kot datotečne priloge. Glejte [Konfiguracija](configuration#include-inline-pictures).

Primer: Nekatere priloge morda nimajo določenih glave, a so vseeno običajne datoteke (ne vdelane/S/MIME). Če strogi prehod ne najde nobene, lahko ohlapni prehod te sprejme in jih priloži.

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
| ---------------- | --------------------------------- |
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

- Vdelane slike se ne dodajo kot datotečne priloge. Ko je "Vključi vdelane slike" VKLJUČENO (privzeto), so namesto tega vdelane v telo odgovora kot podatkovni URI-ji. Če je nastavitev IZKLOPLJENA, so vdelane slike povsem odstranjene. Glejte [Konfiguracija](configuration#include-inline-pictures).
- Deli podpisa S/MIME so po zasnovi izključeni: imena datotek, kot je `smime.p7s`, in vrste MIME, kot sta `application/pkcs7-signature` ali `application/pkcs7-mime`, so preskočene.
- Vzorci črnega seznama lahko filtrirajo kandidate: glejte [Konfiguracija](configuration#blacklist-glob-patterns); ujemanje ne razlikuje velikih/malih črk in upošteva le ime datoteke.
- Podvojena imena datotek se ne dodajo znova: če sestavljanje že vsebuje datoteko z enakim normaliziranim imenom, je preskočena.
- Deli, ki niso datoteke, ali manjkajoča imena: za dodajanje se upoštevajo samo deli, podobni datotekam, z uporabnimi imeni datotek.

---

Glej tudi

- [Konfiguracija](configuration)
