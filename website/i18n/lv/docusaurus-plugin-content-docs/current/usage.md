---
id: usage
title: 'Lietošana'
sidebar_label: 'Lietošana'
---

---

## Lietošana {#usage}

- Atbildiet, un papildinājums automātiski pievienos oriģinālos pielikumus — vai vispirms pajautās, ja opcijās tas ir iespējots.
- Dublikāti tiek novērsti pēc faila nosaukuma; S/MIME daļas vienmēr tiek izlaistas. Pēc noklusējuma iegultie attēli tiek atjaunoti atbildes pamattekstā (var atslēgt, izmantojot “Iekļaut iegultos attēlus” opcijās).
- Melnsarakstā iekļautie pielikumi arī tiek izlaisti (reģistrnejutīgi glob raksti, kas atbilst failu nosaukumiem, nevis ceļiem). Skatiet [Konfigurācija](configuration#blacklist-glob-patterns).

---

### Kas notiek, atbildot {#what-happens}

- Noteikt atbildi → uzskaitīt oriģinālos pielikumus → atfiltrēt S/MIME + iegultos → izvēles apstiprinājums → pievienot atbilstošos failus (izlaist dublikātus) → atjaunot iegultos attēlus pamattekstā.

Stingrā vs. pielaidīgā pārbaude: Papildinājums vispirms izslēdz S/MIME un iegultās daļas no failu pielikumiem. Ja nekas neatbilst, tas veic pielaidīgāku pārbaudi, kas joprojām izslēdz S/MIME/iegultās daļas, bet pieļauj vairāk gadījumu (skatīt koda detaļas). Iegultie attēli nekad netiek pievienoti kā failu pielikumi; tā vietā, ja ir iespējota opcija “Iekļaut iegultos attēlus” (noklusējums), tie tiek iegulti tieši atbildes pamattekstā kā base64 datu URI.

| Daļas tips                                                       |                   Stingrā pārbaude |                Pielaidīgā pārbaude |
| ---------------------------------------------------------------- | ---------------------------------: | ---------------------------------: |
| S/MIME paraksta fails `smime.p7s`                                |                           Izslēgts |                           Izslēgts |
| S/MIME MIME tipi (`application/pkcs7-*`)                         |                           Izslēgts |                           Izslēgts |
| Iegultais attēls, uz kuru atsaucas Content‑ID (`image/*`)        | Izslēgts (atjaunots pamattekstā\*) | Izslēgts (atjaunots pamattekstā\*) |
| Pievienota e‑pasta vēstule (`message/rfc822`) ar faila nosaukumu |                  Netiek pievienots |                Var tikt pievienots |
| Parasts faila pielikums ar faila nosaukumu                       |                Var tikt pievienots |                Var tikt pievienots |

\* Ja ir iespējota opcija “Iekļaut iegultos attēlus” (noklusējums: IESLĒGTS), iegultie attēli tiek iegulti atbildes pamattekstā kā base64 datu URI, nevis pievienoti kā failu pielikumi. Skatiet [Konfigurācija](configuration#include-inline-pictures).

Piemērs: Dažiem pielikumiem var trūkt noteiktu galveņu, bet tie joprojām ir parasti faili (nevis iegultie/S/MIME). Ja stingrā pārbaude neko neatrod, pielaidīgā pārbaude var tos akceptēt un pievienot.

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
| ------------------- | ------------------------------------ |
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

- Iegultie attēli netiek pievienoti kā failu pielikumi. Kad “Iekļaut iegultos attēlus” ir IESLĒGTS (noklusējums), tie tiek iegulti atbildes pamattekstā kā datu URI. Ja iestatījums ir IZSLĒGTS, iegultie attēli tiek pilnībā noņemti. Skatiet [Konfigurācija](configuration#include-inline-pictures).
- S/MIME paraksta daļas tiek izslēgtas pēc konstrukcijas: tādi failu nosaukumi kā `smime.p7s` un MIME tipi, piemēram, `application/pkcs7-signature` vai `application/pkcs7-mime`, tiek izlaisti.
- Melnsaraksta raksti var filtrēt kandidātus: skatiet [Konfigurācija](configuration#blacklist-glob-patterns); atbilstība ir reģistrnejutīga un tikai pēc faila nosaukuma.
- Dublēti failu nosaukumi netiek pievienoti atkārtoti: ja sastādīšanā jau ir fails ar tādu pašu normalizētu nosaukumu, tas tiek izlaists.
- Nefaila daļas vai trūkstoši nosaukumi: pievienošanai tiek ņemtas vērā tikai failveidīgas daļas ar izmantojamiem failu nosaukumiem.

---

Skatiet arī

- [Konfigurācija](configuration)
