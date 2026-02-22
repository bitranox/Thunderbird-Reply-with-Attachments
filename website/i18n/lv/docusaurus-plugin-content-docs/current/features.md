---
id: features
title: 'Iespējas'
sidebar_label: 'Iespējas'
---

---

## Iespējas {#features}

- Automātiski pievieno failus no sākotnējā e-pasta, atbildot.
- Konfigurējama darbība: pielikumus var
  - pievienot automātiski, vai
  - pievienot tikai pēc apstiprinājuma (mazs, pieejams dialoglodziņš). Opcijās
    varat ieslēgt apstiprinājumu un izvēlēties noklusējuma atbildi (Jā/Nē).
- Failu nosaukumu melnais saraksts (glob paraugi) neļauj konkrētus failus
  pievienot automātiski. Piemēri: `*intern*`, `*secret*`, `*passwor*`.
  Atbilstība nav reģistrjutīga un pārbauda tikai faila nosaukumu; Opcijās norādiet vienu
  paraugu katrā rindā.
- Brīdinājums par melno sarakstu (neobligāts, pēc noklusējuma ieslēgts): kad faili tiek
  izslēgti jūsu melnā saraksta dēļ, neliels modālais logs uzskaita failu un atbilstošo(-s) paraugu(-s). Draudzīgs
  tumšajam režīmam un pieejams ar tastatūru (Enter/Esc, lai aizvērtu).
- Darbojas ar Atbildēt un Atbildēt visiem. Pārsūtīšanu šis papildinājums nemaina.
- Pievieno oriģinālos failus pat tad, ja jau kaut ko pievienojāt paši; izvairās no dublikātiem pēc faila nosaukuma.
- Aizsardzība pret dublikātiem katrā cilnē novērš dubultu pievienošanu tajā pašā sastādīšanas cilnē.
- Pēc noklusējuma izlaiž S/MIME sertifikātus, lai izvairītos no liekiem pielikumiem.
- Iekļaut iebūvētos attēlus (pēc noklusējuma: IESLĒGTS). Iegultie attēli tiek atjaunoti tieši
  atbildes pamattekstā kā base64 datu URI, saglabājot sākotnējo iebūvēto izkārtojumu. Atspējojiet
  Opcijās, lai pilnībā izlaistu iebūvētos attēlus.

---

## Kā tas darbojas {#how-it-works}

- Veidojot atbildi, papildinājums uzskaita oriģinālos pielikumus.
- No failu pielikumiem atfiltrē S/MIME parakstus; iebūvētie attēli tiek atjaunoti pamattekstā (ja vien nav atspējots).
- Pēc izvēles pieprasa apstiprinājumu (draudzīgs tastatūrai).
- Pievieno atbilstošos failus jūsu rakstīšanas logam, izvairoties no dublikātiem pēc faila nosaukuma.
- Skatiet sadaļā “Kāpēc pielikumi var netikt pievienoti” Lietošanā par netipiskiem gadījumiem.

Privātuma piezīme: viss apstrādes process notiek lokāli programmā Thunderbird. Papildinājums neveic nekādus fona tīkla pieprasījumus.

---
