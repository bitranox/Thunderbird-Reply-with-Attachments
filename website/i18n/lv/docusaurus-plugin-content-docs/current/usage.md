---
id: usage
title: 'Lietošana'
sidebar_label: 'Lietošana'
---

---

## Lietošana {#usage}

- Atbildiet, un papildinājums automātiski pievienos oriģinālos pielikumus — vai vispirms pajautās, ja opcijās tas ir iespējots.
- Dublikāti tiek noņemti pēc faila nosaukuma; S/MIME daļas vienmēr tiek izlaistas. Attēli, kas iegulti sākotnējā ziņojumā, paliek atbildes pamattekstā, kur Thunderbird tos ievieto, un netiek kopēti kā faili.
- Melnsarakstā iekļautie pielikumi arī tiek izlaisti (reģistrnejutīgi glob raksti, kas atbilst failu nosaukumiem, nevis ceļiem). Skatiet [Konfigurācija](configuration#blacklist-glob-patterns).

---

### Kas notiek, atbildot {#what-happens}

- Atklāt atbildi → izveidot sākotnējo pielikumu sarakstu → izlaist S/MIME un iegultos attēlus → neobligāts apstiprinājums → pievienot atbilstošos failus (izlaižot dublikātus).

| Daļas tips                                                   | Kopēts atbildē          |
|--------------------------------------------------------------|------------------------:|
| S/MIME paraksta fails `smime.p7s`                            | Nē                      |
| S/MIME MIME tipi (`application/pkcs7-*`)                     | Nē                      |
| Attēls, ko ziņojuma pamatteksts iegulst ar `cid:`            | Nē (tas ir pamattekstā) |
| Attēls, kas atzīmēts kā `Content-Disposition: inline`        | Nē (tas ir pamattekstā) |
| Attēls ar `Content-ID`, uz kuru pamatteksts nekad neatsaucas | Jā                      |
| Pievienots e-pasts (`message/rfc822`) ar faila nosaukumu     | Jā                      |
| Parasts faila pielikums ar faila nosaukumu                   | Jā                      |

Attēls tiek uzskatīts par iegultu tikai tad, ja sākotnējais ziņojums patiešām uz to atsaucas vai ja sūtītājs to skaidri atzīmējis kā `Content-Disposition: inline`. Vienkārši `Content-ID` galvene nav pietiekama: vairāki e-pasta klienti to pievieno katrai attēla daļai, tostarp īstiem pielikumiem, un tie tomēr ir jākopē.

---

### Krustatsauce {#cross-reference}

- Pārsūtīšana pēc konstrukcijas netiek mainīta (skatiet ierobežojumus zemāk).
- Iemeslus, kāpēc pielikums var netikt pievienots, skatiet “Kāpēc pielikumi var netikt pievienoti”.

---

## Uzvedības detaļas {#behavior-details}

- **Dublikātu novēršana:** Papildinājums atzīmē sastādīšanas cilni kā apstrādātu, izmantojot katrai cilnei atsevišķu sesijas vērtību un atmiņā esošu sargmehānismu. Oriģinālie pielikumi netiks pievienoti divreiz.
- Sastādīšanas loga aizvēršana un atkārtota atvēršana tiek uzskatīta par jaunu cilni (t. i., ir atļauts jauns mēģinājums).
- **Ievērot esošos pielikumus:** Ja sastādīšanas logā jau ir kādi pielikumi, oriģinālie tiks pievienoti tieši vienu reizi, izlaižot jau esošos failu nosaukumus.
- **Izņēmumi:** S/MIME artefakti un iegultie attēli tiek izslēgti no failu pielikumiem. Ja pirmajā solī nekas neatbilst, pielaidīga atkāpšanās pārbauda vēlreiz ne‑S/MIME daļas. Iegultie attēli tiek apstrādāti atsevišķi: tie tiek atjaunoti atbildes pamattekstā kā datu URI (ja iespējots).
  - **Failu nosaukumi:** `smime.p7s`
  - **MIME tipi:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Iegultie attēli:** jebkura `image/*` daļa, uz kuru atsaucas Content‑ID — tiek izslēgta no failu pielikumiem, bet tiek iegulta atbildes pamattekstā, ja “Iekļaut iegultos attēlus” ir IESLĒGTS
  - **Pievienotas e‑pasta vēstules (`message/rfc822`):** tiek uzskatītas par parastiem pielikumiem, ja tām ir faila nosaukums; tās var tikt pievienotas (ievērojot dublikātu pārbaudi un melnsarakstu).
- **Brīdinājums par melnsarakstu (ja iespējots):** Kad kandidāti tiek izslēgti pēc jūsu melnsaraksta, papildinājums parāda nelielu modālo logu ar skarto failu sarakstu un atbilstošajiem rakstiem. Šis brīdinājums parādās arī gadījumos, kad netiks pievienots neviens pielikums, jo viss tika izslēgts.

---

## Tastatūras īsceļi {#keyboard-shortcuts}

- Apstiprinājuma dialogs: Y/J = Jā, N/Esc = Nē; Tab/Shift+Tab un bultu taustiņi pārslēdz fokusu.
  - “Noklusējuma atbilde” sadaļā [Konfigurācija](configuration#confirmation) iestata sākotnēji fokusēto pogu.
  - Enter aktivizē fokusēto pogu. Tab/Shift+Tab un bultas pārvieto fokusu pieejamības nolūkos.

### Tastatūras atgādne {#keyboard-cheat-sheet}

| Taustiņi            | Darbība                              |
|---------------------|--------------------------------------|
| Y / J               | Apstiprināt Jā                       |
| N / Esc             | Apstiprināt Nē                       |
| Enter               | Aktivizēt fokusēto pogu              |
| Tab / Shift+Tab     | Pārvietot fokusu uz priekšu/atpakaļ  |
| Bultu taustiņi      | Pārvietot fokusu starp pogām         |
| Noklusējuma atbilde | Iestata sākotnējo fokusu (Jā vai Nē) |

---

## Ierobežojumi {#limitations}

- Pārsūtīšanu šis papildinājums nemaina (Atbildēt un Atbildēt visiem ir atbalstīti).
- Ļoti lieli pielikumi var būt pakļauti Thunderbird vai pakalpojumu sniedzēja ierobežojumiem.
  - Papildinājums nesadala un nesaspiež failus; tas paļaujas uz Thunderbird parasto pielikumu apstrādi.
- Šifrēti ziņojumi: S/MIME daļas ir apzināti izslēgtas.

---

## Kāpēc pielikumi var netikt pievienoti {#why-attachments-might-not-be-added}

- Sākotnējā ziņojumā iegultie attēli netiek kopēti kā faili. Tie jau atrodas atbildes pamattekstā, kur tos ievietojis Thunderbird. Skatiet [Konfigurācija](configuration#include-inline-pictures).
- S/MIME paraksta daļas tiek izslēgtas pēc konstrukcijas: tādi failu nosaukumi kā `smime.p7s` un MIME tipi, piemēram, `application/pkcs7-signature` vai `application/pkcs7-mime`, tiek izlaisti.
- Melnsaraksta raksti var filtrēt kandidātus: skatiet [Konfigurācija](configuration#blacklist-glob-patterns); atbilstība ir reģistrnejutīga un tikai pēc faila nosaukuma.
- Dublēti failu nosaukumi netiek pievienoti atkārtoti: ja sastādīšanā jau ir fails ar tādu pašu normalizētu nosaukumu, tas tiek izlaists.
- Nefaila daļas vai trūkstoši nosaukumi: pievienošanai tiek ņemtas vērā tikai failveidīgas daļas ar izmantojamiem failu nosaukumiem.

---

Skatiet arī

- [Konfigurācija](configuration)
