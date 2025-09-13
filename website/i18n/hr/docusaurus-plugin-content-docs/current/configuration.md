---
id: configuration
title: 'Konfiguracija'
---

## Konfiguracija

Terminološka napomena: pogledajte [Rječnik](glossary) za dosljedne pojmove korištene u UI i dokumentaciji.

---

## Otvorite opcije u Thunderbirdu {#open-options-in-thunderbird}

- Thunderbird → Alati → Dodaci i teme → pronađite “Odgovori s privicima” → Postavke/Opcije

---

### Postavke {#settings}

#### Potvrda {#confirmation}

- Prebacivanje “Pitaj prije dodavanja privitaka”
- Zadani odgovor: Da ili Ne (zadani fokus i tipkovnica)
- Tipkovnica: Y/J = Da; N/Esc = Ne; Tipka Tab/Shift+Tab i strelice ciklično prelaze fokus
  - Pogledajte detalje o tipkovnici u [Korištenju](usage#keyboard-shortcuts).

---

#### Crna lista (glob obrasci) {#blacklist-glob-patterns}

Datoteke na crnoj listi neće se automatski dodavati kao odgovor. Pogledajte također [Rječnik](glossary) za “Crna lista (Isključena lista)”.

- Jedan obrazac po redu; bez obzira na velika/mala slova; samo podudaranje naziva datoteke
- Primjeri: `*intern*`, `*secret*`, `*passwor*`
- Podržani glob tokeni: `*` (bilo koji znak osim `/`), `?` (jedan znak), klasifikacije znakova poput `[abc]`. Koristite `\[` za usklađivanje s literalnim `[`. Putanje (`**/`) se ignoriraju jer se samo imena datoteka podudaraju.
- Nisu podržani: negacija (`!`), proširenje zagrada (`{..}`) i složeni rasponi. Održavajte obrasce jednostavnima.
- Komentari nisu podržani u obrascima. Ne uključujte `#` ili inline komentare; unesite samo tekst obrasca po redu.

---

##### Kuharica obrazaca {#pattern-cookbook}

- Uskladite bilo koji PDF: `*.pdf`
- Uskladite datoteke koje počinju s “scan”: `scan*`
- Klasifikacija znakova: `report[0-9].txt`
- Escape literalnog `[`: `\[` (korisno pri usklađivanju zagrade kao znaka)

---

##### Napomene {#blacklist-notes}

- Redoslijed nije bitan; prvo/bilo koji podudaranje isključuje datoteku.
- Usklađivanje se odnosi samo na naziv datoteke (putanje/mape se ignoriraju).
- “Poništi na zadane” vraća preporučene obrasce i prebacivanje upozorenja crne liste.
- Zašto primjer `*passwor*`? Podudara se s obiteljima “password” i “Passwort”.
- Prioritet: ako se bilo koji obrazac podudara s nazivom datoteke, datoteka se isključuje (prvo/bilo koje podudaranje — redoslijed ne mijenja rezultat).
- Savjet — testirajte svoj obrazac: dodajte privremeni obrazac, odgovorite na poruku koja sadrži datoteku s odgovarajućim nazivom i potvrdite da je isključena u popisu upozorenja.

##### Brzi pokušaj (sigurno testiranje) {#blacklist-try-it}

1. Otvorite Opcije → Crna lista.
2. Dodajte privremeni obrazac poput `*.tmp` i kliknite Spremi.
3. Odgovorite na probnu e-poštu koja ima datoteku s ekstenzijom `.tmp` — datoteka bi se trebala pojaviti na popisu upozorenja i ne bi trebala biti priključena.
4. Uklonite privremeni obrazac kada završite, ili kliknite “Poništi na zadane”.

---

#### Upozorenje o isključenim privicima {#warning-on-excluded-attachments}

- Prebacivanje “Upozori ako su privici isključeni crnom listom” (zadano: UKLJUČENO).
- Kada je omogućeno, mali modal prikazuje isključene datoteke i odgovarajući obrazac(e). U
  upozorenju se također pojavljuje kada ništa neće biti priključeno jer su svi kandidati
  bili na crnoj listi.

---

#### Spremite svoje postavke {#save-your-settings}

Postavke se spremaju pritiskom na gumb Spremi. Možete ručno vratiti pojedine podatke ili prema potrebi poništiti na zadane.

Ako pohranjene postavke ne primjenjuju ispravno, ponovo pokrenite Thunderbird i pokušajte ponovo. (Thunderbird možda kešira stanje između sesija; ponovni pokretanje osigurava učitavanje novih postavki.)

Savjet: Kako biste potvrdili da su vaše postavke primijenjene, odgovorite na bilo koju poruku s privitkom i provjerite potvrdu ili upozorenje crne liste.

---

#### Vidljivost donacija (90-dnevno odgađanje) {#donation-visibility}

Dodaci uključuju zgodnu značajku za skrivanje poziva na donaciju na neko vrijeme nakon što ste donirali.

Gdje to pronaći

- Opcije → Odjeljak podrške: vidjet ćete gumb “Ja sam donirao” i malo područje s naznakom.
- Dijalog za potvrdu slanja također prikazuje gumb za donacije; automatski se skriva kada je odgoda aktivna.

Kako to funkcionira

- Klikom na “Ja sam donirao” skrivaju se gumbi za donaciju i srodni pozivi na 90 dana.
- Statusna naznaka prikazuje “Skriveno do YYYY‑MM‑DD” (u vašem lokalnom datumu). Također postoji gumb “Ponovo prikaži Doniraj” za trenutno vraćanje vidljivosti.
- Nakon 90 dana, gumb Doniraj ponovno postaje vidljiv automatski.

Privatnost i pohrana

- Dodatak pohranjuje jedan vremenski žig u lokalnoj pohrani Thunderbirda kako bi zapamtila razdoblje odgode. Ključ: `donateHideUntil` (epoch milliseconds).
- Ova postavka lokalna je za vaš Thunderbird profil (nije sinkronizirana s cloud-om). Ova značajka ne šalje mrežne zahtjeve.

Rješavanje problema

- Ako se gumb Donira i dalje prikazuje odmah nakon klika na “Ja sam donirao”, pričekajte trenutak ili ponovo otvorite stranicu Opcije; UI se ažurira čim se postavka pohrani.
- Da biste ručno poništili, kliknite “Ponovo prikaži Doniraj”. Također možete pričekati dok datum naveden u naznaci ne prođe.

Ova značajka je isključivo za praktičnost; nikada ne blokira funkcionalnost dodatka i ne prikuplja osobne podatke.

---

### Normalizacija naziva datoteka (sprječavanje duplikata) {#filename-normalization-duplicates-prevention}

Kako bi se ponašala dosljedno na različitim platformama, nazivi datoteka normaliziraju se prije provjere duplikata:

- Unicode se normalizira u NFC.
- Imena se pretvaraju u mala slova (malim slovima).
- Zakačeni točke/prostori se obrezuju (prijateljstvo s Windows-ima).

To održava predvidljivost otkrivanja duplikata za imena poput `café.pdf` naspram `café.pdf` (NFD) ili `FILE.txt.` naspram `file.txt`.

---

## Ponašanje potvrde {#confirmation-behavior}

- “Zadani odgovor” postavlja prvotno fokusiranu tipku u dijalogu za potvrdu (korisno za korisnike tipkovnice).
- Radi za “Odgovori” i “Odgovori svima”. “Proslijedi” nije izmijenjen od strane ovog dodatka.

---

## Napredno: otkrivanje duplikata {#advanced-duplicate-detection}

Sprječavanje duplikata implementirano je po kartici za sastavljanje i prema nazivu datoteke. Pogledajte [Korištenje](usage#behavior-details) za detaljno objašnjenje.

---

Pogledajte također

- [Dozvole](permissions)
- [Privatnost](privacy)
