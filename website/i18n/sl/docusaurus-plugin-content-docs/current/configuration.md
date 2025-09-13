---
id: configuration
title: 'Konfiguracija'
---

## Konfiguracija

Terminološka opomba: glejte [Slovar](glossary) za dosledne terime, uporabljene v uporabniškem vmesniku in dokumentaciji.

---

## Odpri možnosti v Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Orodja → Dodatki in teme → poišči “Odgovori z priponkami” → Nastavitve/Možnosti

---

### Nastavitve {#settings}

#### Potrditev {#confirmation}

- Preklopi “Vprašaj pred dodajanjem priponk”
- Privzeti odgovor: Da ali Ne (privzeti fokus in tipkovnica)
- Tipkovnica: Y/J = Da; N/Esc = Ne; Tab/Shift+Tab in puščične tipke ciklična fokusa
  - Oglejte si podrobnosti o tipkovnici v [Uporabi](usage#keyboard-shortcuts).

---

#### Črna lista (glob vzorci) {#blacklist-glob-patterns}

Datoteke na črni listi ne bodo samodejno dodane pri odgovoru. Glejte tudi [Slovar](glossary) za “Črna lista (Izključitvena lista)”.

- En vzorec na vrstico; brezobzirno glede na velikost črk; ujema se samo ime datoteke
- Primeri: `*intern*`, `*secret*`, `*passwor*`
- Podprti glob simboli: `*` (karkoli razen `/`), `?` (ena črka), znakovne klase, kot je `[abc]`. Uporabite `\[` za ujemanje literalnega `[`. Pot `**/` se ignorira, ker se ujema samo z imeni datotek.
- Ni podprt: negacija (`!`), razširitev z zavitimi oklepaji (`{..}`), in kompleksni razponi. Ohranite vzorce preproste.
- Komentarji niso podprti v vzorcih. Ne vključujte `#` ali vgrajenih komentarjev; vnesite samo besedilo vzorca na vrstico.

---

##### Kuharica vzorcev {#pattern-cookbook}

- Ujemite katerikoli PDF: `*.pdf`
- Ujemite datoteke, ki se začnejo z “scan”: `scan*`
- Znakovna klasa: `report[0-9].txt`
- Escapirajte literal `[`: `\[` (koristno pri ujemanju oklepaja kot znaka)

---

##### Opombe {#blacklist-notes}

- Vrstni red ni pomemben; prva/katerekoli ujemanje izključi datoteko.
- Ujemanje je samo z imenom datoteke (pot/imeniki se ignorirajo).
- “Ponastavi na privzete vrednosti” obnovi priporočene vzorce in točko opozorila na črni listi.
- Zakaj primer `*passwor*`? Ujema se z družinama “password” in “Passwort”.
- Prednost: če katerikoli vzorec ustreza imenu datoteke, je datoteka izključena (prva/katerekoli ujemanje — vrstni red ne spremeni rezultata).
- Nasvet — preizkusite svoj vzorec: dodajte začasni vzorec, odgovorite na sporočilo, ki vsebuje datoteko z ujemajočim imenom, in potrdite, da je izključena na seznamu opozoril.

##### Hitri preizkus (varno testiranje) {#blacklist-try-it}

1. Odprite Možnosti → Črna lista.
2. Dodajte začasni vzorec, kot je `*.tmp` in kliknite Shrani.
3. Odgovorite na testno sporočilo, ki ima datoteko, ki se konča z `.tmp` — datoteka bi morala biti prikazana na seznamu opozoril in ne bi smela biti priložena.
4. Odstranite začasni vzorec, ko ste končali, ali kliknite “Ponastavi na privzete vrednosti”.

---

#### Opozorilo o izključenih priponkah {#warning-on-excluded-attachments}

- Preklopi “Opozorite, če so priponke izključene s črno listo” (privzeto: VKLJUČENO).
- Ko je omogočeno, majhen modal prikaže izključene datoteke in ujemajoči vzorec(-e). Opozorilo se prikaže tudi, kadar ne bo ničesar priloženega, ker so vsi kandidati bili
  na črni listi.

---

#### Shranite svoje nastavitve {#save-your-settings}

Nastavitve se shranijo s pritiskom na gumb Shrani. Posamična polja lahko ročno povrnete ali ponastavite na privzete vrednosti po potrebi.

Če shranjene nastavitve ne veljajo pravilno, ponovno zaženite Thunderbird in poskusite znova. (Thunderbird lahko shrani stanje med sejami; ponovni zagon zagotavlja, da so naložene nove nastavitve.)

Nasvet: Da potrdite, da so vaše nastavitve začele veljati, odgovorite na katerokoli sporočilo s priponko in preverite potrditev ali opozorilo črne liste.

---

#### Vidnost donacij (90-dnevno prekinitev) {#donation-visibility}

Dodatka vključuje priročno funkcijo za skrivanje pozivov za donacije za določeno obdobje po vaši donaciji.

Kje jo najti

- Možnosti → Oddelek za podporo: videli boste gumb “Daroval sem” in majhno območje namigov.
- Dialog pošiljanja potrditev prav tako prikazuje gumb Doniraj; samodejno se skrije, ko je prekinitev aktivna.

Kako deluje

- Klik na “Daroval sem” skrije gumbe za donacijo in povezane pozive za 90 dni.
- Namig o stanju prikazuje “Skrito do YYYY‑MM‑DD” (v vašem lokalnem datumu). Na voljo je tudi gumb “Pokaži Doniraj znova”, da takoj povrne vidnost.
- Po 90 dneh gumb Doniraj postane samodejno spet viden.

Zasebnost in shranjevanje

- Dodatka shrani en samo časovni žig v lokalnem shranjevanju Thunderbirda za zapomnjeno obdobje prekinitve. Ključ: `donateHideUntil` (epoch milisekunde).
- Ta nastavitev je lokalna za vaš profil Thunderbird (ni sinhronizirana s cloudom). Ta funkcija ne izvaja nobenih omrežnih zahtev.

Odpravljanje težav

- Če se Doniraj še vedno prikazuje takoj po kliku na “Daroval sem”, počakajte trenutek ali ponovno odprite stran Možnosti; uporabniški vmesnik se posodobi takoj, ko je nastavitev shranjena.
- Čisto nastaviti ročno lahko tako, da kliknete “Pokaži Doniraj znova”. Čakati lahko tudi, dokler ne mine datum, naveden v namigu.

Ta funkcija je izključno za udobje; nikoli ne ovira funkcionalnosti dodatkov in ne zbira nobenih osebnih podatkov.

---

### Normalizacija imen datotek (preprečevanje podvajanja) {#filename-normalization-duplicates-prevention}

Da bi se dosledno vedlo po platformah, so imena datotek normalizirana pred preverjanjem podvajanja:

- Unicode je normaliziran na NFC.
- Imena so preoblikovana (spodaj).
- Zadaj postavljene pike/prostori so odstranjeni (prijaznost do Windows).

To ohranja predvidljivost zaznavanja podvajanja za imena, kot so `café.pdf` proti `café.pdf` (NFD) ali `FILE.txt.` proti `file.txt`.

---

## Obnašanje potrditev {#confirmation-behavior}

- “Privzeti odgovor” nastavi privzeti osredotočen gumb v potrdilnem pogovornem oknu (koristno za uporabnike tipkovnice).
- Deluje tako za “Odgovori” kot za “Odgovori vsem”. “Posreduj” ni spremenjen s tem dodatkom.

---

## Napredno: zaznavanje podvajanja {#advanced-duplicate-detection}

Preprečevanje podvajanja je izvedeno na podlagi vsakega zavihka za sestavo in po imenu datoteke. Glejte [Uporabo](usage#behavior-details) za podrobno razlago.

---

Glejte tudi

- [Dovoljenja](permissions)
- [Zasebnost](privacy)
