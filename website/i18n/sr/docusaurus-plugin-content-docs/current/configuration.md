---
id: configuration
title: 'Konfiguracija'
---

## Konfiguracija

Terminološka napomena: pogledajte [Rečnik](glossary) za dosledne termine koji se koriste u UI i dokumentaciji.

---

## Otvorite opcije u Thunderbirdu {#open-options-in-thunderbird}

- Thunderbird → Alati → Dodatci i teme → pronađite “Odgovori sa prilozima” → Podešavanja/Opcije

---

### Podešavanja {#settings}

#### Potvrda {#confirmation}

- Prebacite “Pitaj pre dodavanja priloga”
- Podrazumevani odgovor: Da ili Ne (podrazumevana fokus i tastatura)
- Tastatura: Y/J = Da; N/Esc = Ne; Tab/Shift+Tab i strelice menjaju fokus
  - Pogledajte detalje o tastaturi u [Korišćenje](usage#keyboard-shortcuts).

---

#### Crna lista (glob obrasci) {#blacklist-glob-patterns}

Datoteke sa crne liste neće se automatski dodavati u odgovor. Pogledajte takođe [Rečnik](glossary) za “Crna lista (izuzeta lista)”.

- Jedan obrazac po liniji; bez obzira na velika/mala slova; usklađivanje samo imena datoteka
- Primeri: `*intern*`, `*secret*`, `*passwor*`
- Podržani glob tokeni: `*` (bilo koji karakteri osim `/`), `?` (jedan karakter), klase karaktera kao što su `[abc]`. Koristite `\[` za usklađivanje sa literom `[`. Putanje (`**/`) se ignorišu jer se samo imena datoteka usklađuju.
- Nisu podržani: negacija (`!`), proširenje zagrada (`{..}`), i složeni opsezi. Održavajte obrasce jednostavnim.
- Komentari nisu podržani u obrascima. Ne uključujte `#` ili inline komentare; upišite samo tekst obrasca po liniji.

---

##### Kuvar obrazaca {#pattern-cookbook}

- Uskladite bilo koji PDF: `*.pdf`
- Uskladite datoteke koje počinju sa “scan”: `scan*`
- Klasa karaktera: `report[0-9].txt`
- Escape litere `[`: `\[` (korisno kada se usklađujete sa zagradom kao karakterom)

---

##### Napomene {#blacklist-notes}

- Redosled nije bitan; prvi/bilo koji usklađeni isključuje datoteku.
- Usklađivanje je samo za ime datoteke (putanje/folderi se ignorišu).
- “Resetuj na podrazumevano” vraća preporučene obrasce i prekidač upozorenja za crnu listu.
- Zašto primer `*passwor*`? Usaglašava se sa porodicama “password” i “Passwort”.
- Prioritet: ako se bilo koji obrazac uskladi sa imenom datoteke, datoteka se isključuje (prvi/bilo koji usklađeni — redosled ne menja rezultat).
- Savet — testirajte svoj obrazac: dodajte privremeni obrazac, odgovorite na poruku koja sadrži datoteku sa usklađenim imenom, i potvrdite da je isključena u listi upozorenja.

##### Brzi probni (sigurno testiranje) {#blacklist-try-it}

1. Otvorite Opcije → Crna lista.
2. Dodajte privremeni obrazac kao što je `*.tmp` i kliknite na Sačuvaj.
3. Odgovorite na testni mail koji ima datoteku koja se završava sa `.tmp` — datoteka bi trebala da se pojavi na listi upozorenja i ne bude priložena.
4. Uklonite privremeni obrazac kada završite, ili kliknite “Resetuj na podrazumevano”.

---

#### Upozorenje o isključenim prilozima {#warning-on-excluded-attachments}

- Prebacite “Upozori ako su dodaci isključeni crnom listom” (podrazumevano: Uključeno).
- Kada je omogućeno, mali modalni prozor prikazuje isključene datoteke i usklađeni obrazac(e). Upozorenje se takođe pojavljuje kada se ništa neće priložiti jer su svi kandidati bili na crnoj listi.

---

#### Sačuvajte svoja podešavanja {#save-your-settings}

Podešavanja se čuvaju pritiskom na dugme Sačuvaj. Možete ručno vratiti pojedinačna polja ili resetovati podrazumevane vrednosti po potrebi.

Ako se čini da sačuvana podešavanja ne primenjuju ispravno, ponovo pokrenite Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje između sesija; ponovni pokretanje osigurava da su učitana sveže podešavanja.)

Savet: Da potvrdite da su vaša podešavanja primenjena, odgovorite na bilo koju poruku sa prilogom i proverite potvrdu ili upozorenje o crnoj listi.

---

#### Vidljivost donacija (90‑dnevno odlaganje) {#donation-visibility}

Dodatak uključuje funkciju kako bi se sakrili zahtevi za donacije neko vreme nakon što ste donirali.

Gde da to pronađete

- Opcije → Sekcija podrške: videćete dugme “Ja sam donirao” i malu oblast sa informacijama.
- Dijalog za Slanje potvrde takođe prikazuje dugme Doniraj; automatski se skriva kada je odlaganje aktivno.

Kako to funkcioniše

- Klikom na “Ja sam donirao” skriva dugmad za donacije i povezane zahteve na 90 dana.
- Statusna pomoć pokazuje “Skriveno do YYYY‑MM‑DD” (u vašem lokalnom datumu). Tu je i dugme “Ponovo prikaži donaciju” da odmah povratite vidljivost.
- Nakon 90 dana, dugme Doniraj se ponovo automatski prikazuje.

Privatnost i skladištenje

- Dodatak čuva jedan vremenski pečat u lokalnom skladištu Thunderbirda kako bi zapamtila period odlaganja. Ključ: `donateHideUntil` (epohni milisekundi).
- Ovo podešavanje je lokalno za vaš Thunderbird profil (nije sinhronizovano u oblaku). Ova funkcija ne šalje zahteve mreži.

Rešavanje problema

- Ako Doniraj i dalje prikazuje odmah nakon klika na “Ja sam donirao”, sačekajte trenutak ili ponovo otvorite stranicu Opcije; UI se ažurira čim se podešavanje sačuva.
- Da biste resetovali ručno, kliknite na “Ponovo prikaži donaciju”. Takođe možete da sačekate da datum naveden u pomoci istekne.

Ova funkcija je isključivo zbog pogodnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve lične podatke.

---

### Normalizacija imena datoteka (sprečavanje duplikata) {#filename-normalization-duplicates-prevention}

Da bi se ponašale dosledno na različitim platformama, imena datoteka se normalizuju pre nego što se provere duplikati:

- Unicode se normalizuje na NFC.
- Imena se prebacuju na mala slova (lowercased).
- Ograničenja tačaka/prostora se uklanjaju (prijateljstvo sa Windows-om).

Ovo održava detekciju duplikata predvidivom za imena kao što su `café.pdf` naspram `café.pdf` (NFD) ili `FILE.txt.` naspram `file.txt`.

---

## Ponašanje potvrde {#confirmation-behavior}

- “Podrazumevani odgovor” postavlja dugme koje je prvobitno fokusirano u dijalogu za potvrdu (korisno za korisnike tastature).
- Funkcioniše za “Odgovori” i “Odgovori svim”. “Prosledi” nije modifikovan ovim dodatkom.

---

## Napredno: detekcija duplikata {#advanced-duplicate-detection}

Sprečavanje duplikata je implementirano po tabu za sastavljanje i po imenu datoteke. Pogledajte [Korišćenje](usage#behavior-details) za detaljno objašnjenje.

---

Pogledajte takođe

- [Dozvole](permissions)
- [Privatnost](privacy)
