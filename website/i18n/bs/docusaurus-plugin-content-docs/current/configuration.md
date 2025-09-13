---
id: configuration
title: 'Konfiguracija'
---

## Konfiguracija

Terminološka napomena: pogledajte [Rečnik](glossary) za dosljedne termine koji se koriste u UI i dokumentaciji.

---

## Otvorite opcije u Thunderbird-u {#open-options-in-thunderbird}

- Thunderbird → Alati → Dodaci i teme → pronađite “Odgovori sa prilozima” → Preferencije/Opcije

---

### Podešavanja {#settings}

#### Potvrda {#confirmation}

- Prebacite “Pitaju prije dodavanja priloga”
- Zadnji odgovor: Da ili Ne (fokus & zadani tastaturni)
- Tastatura: Y/J = Da; N/Esc = Ne; Tab/Shift+Tab i strelice cikliraju fokus
  - Pogledajte detalje o tastaturi u [Upotrebi](usage#keyboard-shortcuts).

---

#### Crna lista (glob obrasci) {#blacklist-glob-patterns}

Datoteke na crnoj listi neće se automatski dodavati kao odgovor. Pogledajte i [Rečnik](glossary) za “Crna lista (izuzeta lista)”.

- Jedan obrazac po liniji; neosjetljivo na velika/mala slova; podudaranje samo sa nazivom datoteke
- Primjeri: `*intern*`, `*secret*`, `*passwor*`
- Podržani glob tokeni: `*` (bilo koji znakovi osim `/`), `?` (jedan znak), klase znakova poput `[abc]`. Koristite `\[` za podudaranje sa literalnim `[`. Putanje (`**/`) se ignoriraju jer se podudaranje vrši samo za nazive datoteka.
- Nisu podržani: negacija (`!`), proširenje zagrade (`{..}`), i složeni opsezi. Držite obrasce jednostavnima.
- Komentari nisu podržani u obrascima. Ne uključujte `#` ili inline komentare; unesite samo tekst obrasca po liniji.

---

##### Kuhinja obrazaca {#pattern-cookbook}

- Podudarite bilo koji PDF: `*.pdf`
- Podudarite datoteke koje počinju sa “scan”: `scan*`
- Klasa znakova: `report[0-9].txt`
- Pobjeći literalni `[`: `\[` (korisno kada se podudara zagrada kao znak)

---

##### Napomene {#blacklist-notes}

- Redoslijed nije bitan; prvo/bilo koje podudaranje isključuje datoteku.
- Podudaranje je samo za naziv datoteke (putanje/fišeri se ignoriraju).
- “Resetuj na zadano” vraća preporučene obrasce i prebacuje crnu listu.
- Zašto primjer `*passwor*`? Podudara se sa porodicama “password” i “Passwort”.
- Prioritet: ako bilo koji obrazac podudara naziv datoteke, datoteka se isključuje (prvo/bilo koje podudaranje — redoslijed ne mijenja rezultat).
- Savjet — testirajte svoj obrazac: dodajte privremeni obrazac, odgovorite na poruku koja sadrži datoteku sa odgovarajućim nazivom i potvrdite da je isključena na listi upozorenja.

##### Brzo isprobajte (sigurno testiranje) {#blacklist-try-it}

1. Otvorite Opcije → Crna lista.
2. Dodajte privremeni obrazac poput `*.tmp` i kliknite Sačuvaj.
3. Odgovorite na testnu poštu koja ima datoteku koja se završava sa `.tmp` — datoteka bi trebala da se pojavi na listi upozorenja i ne bude priložena.
4. Uklonite privremeni obrazac kada završite, ili kliknite “Resetuj na zadano”.

---

#### Upozorenje o isključenim prilozima {#warning-on-excluded-attachments}

- Prebacite “Upozorite ako su prilog isključeni sa crne liste” (zadano: ON).
- Kada je omogućeno, mali modal prikazuje isključene datoteke i odgovarajuće obrazac(e). Upozorenje se također pojavljuje kada ništa neće biti priloženo jer su svi kandidati
  bili na crnoj listi.

---

#### Sačuvajte svoja podešavanja {#save-your-settings}

Podešavanja se čuvaju pritiskom na dugme Save. Možete ručno poništiti pojedinačna polja ili resetovati na zadano po potrebi.

Ako se čini da se pohranjena podešavanja ne primjenjuju pravilno, ponovo pokrenite Thunderbird i pokušajte ponovo. (Thunderbird može keširati stanje između sesija; ponovo pokretanje osigurava da se nova podešavanja učitaju.)

Savjet: Da biste potvrdili da su vaša podešavanja efektivna, odgovorite na bilo koju poruku sa prilogom i provjerite potvrdu ili upozorenje na crnu listu.

---

#### Vidljivost donacije (90-dnevni odmor) {#donation-visibility}

Dodatek uključuje funkciju pogodnosti za skrivanje promptera za donacije na neko vreme nakon što ste donirali.

Gdje to pronaći

- Opcije → Odjeljak podrške: vidjet ćete dugme “Ja sam donirao” i malo područje sa nagovještajem.
- Dijalog za slanje potvrde također prikazuje dugme Doniraj; automatski se skriva kada je odmor aktivan.

Kako to funkcioniše

- Klikom na “Ja sam donirao” skriva dugmad za donacije i srodne poruke na 90 dana.
- Status nagovještaja pokazuje “Skriveno do YYYY‑MM‑DD” (u vašem lokalnom datumu). Postoji i dugme “Ponovo prikaži donaciju” da se odmah obnovi vidljivost.
- Nakon 90 dana, dugme Doniraj automatski postaje ponovo vidljivo.

Privatnost i pohrana

- Dodatek pohranjuje jedan vremenski potpis u lokalnoj pohrani Thunderbirda da zapamti period odmora. Ključ: `donateHideUntil` (epoch milisekunde).
- Ovo podešavanje je lokalno za vaš Thunderbird profil (nije sinhronizovano u oblaku). Ova funkcija ne vrši mrežne zahtjeve.

Rešavanje problema

- Ako se Doniraj i dalje prikazuje odmah nakon klika na “Ja sam donirao”, sačekajte trenutak ili ponovo otvorite stranicu Opcije; UI se ažurira čim se podešavanje sačuva.
- Da biste ručno resetovali, kliknite “Ponovo prikaži donaciju”. Također možete sačekati dok datum naveden u nagovještaju ne prođe.

Ova funkcija je isključivo radi pogodnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve lične podatke.

---

### Normalizacija naziva datoteka (sprečavanje duplikata) {#filename-normalization-duplicates-prevention}

Da bi se ponašalo dosljedno širom platformi, nazivi datoteka se normalizuju prije provjera duplikata:

- Unicode se normalizuje na NFC.
- Imena se prebacuju na mala slova (smanjena).
- Kraj tačaka/prostora se skraćuje (prijateljstvo sa Windows).

Ovo održava prepoznavanje duplikata predvidljivim za imena kao `café.pdf` naspram `café.pdf` (NFD) ili `FILE.txt.` naspram `file.txt`.

---

## Ponašanje potvrde {#confirmation-behavior}

- “Zadnji odgovor” postavlja dugme koje je prvobitno fokusirano u dijalogu za potvrdu (korisno za korisnike tastature).
- Radi i za “Odgovori” i “Odgovori svima”. “Preusmjeravanje” nije modificirano od strane ovog dodatka.

---

## Napredni: prepoznavanje duplikata {#advanced-duplicate-detection}

Sprečavanje duplikata implementirano je po kartici za sastavljanje i prema nazivu datoteke. Pogledajte [Upotrebu](usage#behavior-details) za detaljno objašnjenje.

---

Pogledajte i

- [Dozvole](permissions)
- [Privatnost](privacy)
