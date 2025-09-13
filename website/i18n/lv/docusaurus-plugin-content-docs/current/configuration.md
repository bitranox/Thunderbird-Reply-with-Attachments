---
id: configuration
title: 'Konfigurācija'
---

## Configuration

Terminoloģijas piezīme: skatiet [Terminoloģiju](glossary) konsekventiem terminiem, kas izmantoti lietotāja saskarnē un dokumentos.

---

## Open options in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Rīki → Paplašinājumi un tēmas → atrast “Atbildēt ar pielikumiem” → Preferences/Options

---

### Settings {#settings}

#### Confirmation {#confirmation}

- Pārslēgt “Jautāt pirms piedāvā pielikumus”
- Noklusējuma atbilde: Jā vai Nē (fokuss un tastatūras noklusējums)
- Tastatūra: Y/J = Jā; N/Esc = Nē; Tab/Shift+Tab un bulttaustiņi pārvieto fokusu
  - Skatiet tastatūras detaļas [Izmantošanā](usage#keyboard-shortcuts).

---

#### Blacklist (glob patterns) {#blacklist-glob-patterns}

Melnajā sarakstā iekļautie faili automātiski netiks pievienoti atbildes laikā. Skatiet arī [Terminoloģiju](glossary) par “Melnā saraksta (izņēmumu saraksts)”.

- Viens modelis pa rindu; bez lieluma jūtīguma; tikai faila nosaukuma atbilstība
- Piemēri: `*intern*`, `*secret*`, `*passwor*`
- Atbalstītie globu simboli: `*` (jebkuri simboli, izņemot `/`), `?` (viens simbols), simbolu klasēm, piemēram, `[abc]`. Izmantojiet `\[`, lai atbilstu burtiski `[`. Ceļš (`**/`) tiek ignorēts, jo tiek pārbaudīti tikai failu nosaukumi.
- Nav atbalstīts: noliegums (`!`), izsitiens (`{..}`) un sarežģītas pakas. Saglabājiet modeļus vienkāršus.
- Komentāri netiek atbalstīti modeļos. Nepievienojiet `#` vai iekšējos komentārus; ievadiet tikai modeļu tekstu katrā rindā.

---

##### Pattern cookbook {#pattern-cookbook}

- Atbilst jebkuram PDF: `*.pdf`
- Atbilst failiem, kas sākas ar “scan”: `scan*`
- Simbolu klase: `report[0-9].txt`
- Aizsargājiet burtu `[`: `\[` (noderīgi, ja jāsaskan ar iekavu kā simbolu)

---

##### Notes {#blacklist-notes}

- Kārtība nav svarīga; pirmais/jebkurš atbilstības modelis izslēdz failu.
- Atbilstība ir tikai faila nosaukumam (ceļi/mapes tiek ignorēti).
- “Atjaunot uz noklusējumu” atjauno ieteicamos modeļus un melnā saraksta brīdinājuma pārsleigu.
- Kāpēc piemērs `*passwor*`? Tas atbilst gan “password”, gan “Passwort” ģimenēm.
- Prioritāte: ja jebkāds modelis atbilst faila nosaukumam, fails tiek izslēgts (pirmais/jebkurš atbilstības modelis — kārtība nemaina rezultātu).
- Ieteikums — pārbaudiet savu modeli: pievienojiet pagaidu modeli, atbildiet uz ziņu, kas satur failu ar atbilstošu nosaukumu, un pārliecinieties, ka tas ir izslēgts brīdinājumu sarakstā.

##### Quick try‑it (safe test) {#blacklist-try-it}

1. Atveriet Opcijas → Melnā saraksts.
2. Pievienojiet pagaidu modeli, piemēram, `*.tmp`, un noklikšķiniet uz Saglabāt.
3. Atbildiet uz testu e-pastu, kuram ir fails, kas beidzas ar `.tmp` — failam vajadzētu parādīties brīdinājumu sarakstā un nebūs pievienots.
4. Noņemiet pagaidu modeli, kad tas ir pabeigts, vai noklikšķiniet uz “Atjaunot uz noklusējumu”.

---

#### Warning on excluded attachments {#warning-on-excluded-attachments}

- Pārslēgt “Brīdināt, ja pielikumi tiek izslēgti no melnā saraksta” (noklusējums: IESLĒGTS).
- Kad ir iespējots, neliels modālais logs uzskaita izslēgtos failus un atbilstīgās modeļus. Brīdinājums arī parādīsies, kad nekas netiks pievienots, jo visi kandidāti tika melnajā sarakstā.

---

#### Save your settings {#save-your-settings}

Iestatījumi tiek saglabāti, nospiežot Saglabāt pogu. Jūs varat manuāli atgriezt individuālos laukus vai atsākt noklusējumu pēc nepieciešamības.

Ja saglabātie iestatījumi neizskatās, ka tie tiek pareizi piemēroti, restartējiet Thunderbird un mēģiniet vēlreiz. (Thunderbird var saglabāt stāvokli starp sesijām; restartēšana nodrošina, ka tiek ielādēti jauni iestatījumi.)

Ieteikums: Lai apstiprinātu, ka jūsu iestatījumi tikusi aktīvi, atbildiet uz jebkuru ziņu ar pielikumu un pārbaudiet apstiprinājumu vai melnā saraksta brīdinājumu.

---

#### Donation Visibility (90‑day snooze) {#donation-visibility}

Paplašinājums ietver ērtības iespēju paslēpt ziedojuma aicinājumus uz kādu laiku pēc tam, kad esat ziedojis.

Kur to atrast

- Opcijas → Atbalsta sadaļa: jūs redzēsiet pogu “Es ziedoju” un mazu norādījumu zonu.
- Sūtīšanas apstiprinājuma logs arī parāda Ziedot pogu; tā automātiski paslēpjas, kad snooze ir aktīvs.

Kā tas darbojas

- Nospiežot “Es ziedoju”, tiek paslēptas ziedojumu pogas un saistītie aicinājumi 90 dienas.
- Statusa norādījums parāda “Paslēpts līdz YYYY‑MM‑DD” (jūsu vietējā datumā). Tur ir arī poga “Rādīt atkal ziedot”, lai nekavējoties atjaunotu redzamību.
- Pēc 90 dienām Ziedot poga automātiski kļūst redzama atkal.

Privātums un uzglabāšana

- Paplašinājums saglabā vienu laiku zīmogu Thunderbird vietējā uzglabāšanā, lai atcerētos snooze laiku. Atslēga: `donateHideUntil` (epoch milisekundes).
- Šis iestatījums ir vietējs jūsu Thunderbird profilam (netiek sinhronizēts ar mākoņa). Šī funkcija neveic nekādus tīkla pieprasījumus.

Problēmu novēršana

- Ja Ziedot joprojām tiek rādīta tieši pēc tam, kad esat nospiedis “Es ziedoju”, pagaidiet brīdi vai atkal atveriet Opciju lapu; lietotāja interfeiss tiek atjaunināts, tiklīdz iestatījums ir saglabāts.
- Lai manuāli atiestatītu, noklikšķiniet uz “Rādīt atkal ziedot”. Jūs varat arī pagaidīt, līdz norādītā datums pāriet.

Šī funkcija ir domāta tikai ērtībai; tā nekad nebloķē paplašinājuma funkcionalitāti un nemazina nevienu personisko informāciju.

---

### Filename normalization (duplicates prevention) {#filename-normalization-duplicates-prevention}

Lai uzvedas konsekventi starp platformām, failu nosaukumi tiek normalizēti pirms dublikātu pārbaudēm:

- Unicode tiek normalizēts uz NFC.
- Nosaukumi ir pārveidoti par maziem burtiem.
- Pēdējie punkti/atstarpes tiek sagriezti (Windows draudzīgums).

Tas padara dublikātu atpazīšanu prognozējamu nosaukumiem, piemēram, `café.pdf` vs `café.pdf` (NFD) vai `FILE.txt.` vs `file.txt`.

---

## Confirmation behavior {#confirmation-behavior}

- “Noklusējuma atbilde” nosaka sākotnēji fokusu pogai apstiprinājuma logā (noderīgi tastatūras lietotājiem).
- Darbojas gan “Atbildēt”, gan “Atbildēt visiem”. “Pārsūtīt” netiek modificēts ar šo paplašinājumu.

---

## Advanced: duplicate detection {#advanced-duplicate-detection}

Dublikātu novēršana tiek īstenota katram sastādīšanas cilnei un pa faila nosaukumu. Skatiet [Izmantošanu](usage#behavior-details) detalizētam izskaidrojumam.

---

Skatiet arī

- [Atļaujas](permissions)
- [Privātums](privacy)
