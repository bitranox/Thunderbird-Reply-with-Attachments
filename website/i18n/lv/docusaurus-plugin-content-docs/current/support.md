---
id: support
title: 'Atbalsts'
sidebar_label: 'Atbalsts'
---

## FAQ {#faq}

### Pielikumi netika pievienoti — kāpēc?

- Inline attēli un S/MIME daļas ir apzināti izslēgti.
- Duplikātu failu nosaukumi tiek izlaisti, ja sastādīšana jau satur to pašu failu.
- Melno sarakstu paraugi var filtrēt kandidātus; skatiet [Konfigurācija](configuration#blacklist-glob-patterns).

### Vai varu apstiprināt pirms pielikumu pievienošanas?

Jā. Iespējiet “Jautāt pirms pielikumu pievienošanas” sadaļā [Konfigurācija → Apstiprināšana](configuration#confirmation). Tastatūra: Y/J = Jā, N/Esc = Nē.

### Vai paplašinājums sūta datus vai seko lietošanas paradumiem?

Nē. Skatiet [Privātums](privacy) — nav telemetrijas un nav fona tīkla pieprasījumu.

### Pārsūtīšana neizveido pielikumus — vai tas ir gaidīts?

Jā. Tikai Atbildēt un Atbildēt visiem ir modificēti, izmantojot šo paplašinājumu; Pārsūtīšana paliek nemainīga. Skatiet [Ierobežojumi](usage#limitations).

### Kur ir Ziedot snooze?

Opcijas → Atbalsta sadaļa. Skatiet [Ziedojumu redzamība](configuration#donation-visibility).

---

## Atbalsts

Nepieciešama palīdzība vai vēlaties ziņot par kļūdu?

---

### Atveriet problēmu GitHub:

- Repositorija: `bitranox/Thunderbird-Reply-with-Attachments`
- Problēmas: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Iekļaujiet Thunderbird versiju (piemēram, 128 ESR), operētājsistēmu un soļus, lai reproducētu.
- Pievienojiet attiecīgās žurnālu ierakstus no Thunderbird Kļūdu konsoles (Rīki → Izstrādātāja rīki → Kļūdu konsole).

- Paplašinājumu vietne (ATN): Jūs varat atstāt atsauksmes arī caur [paplašinājuma lapu](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Ieteikumi

- Pārliecinieties, ka izmantojat atbalstītu Thunderbird versiju (128 ESR vai jaunāku).
- Pārbaudiet konfigurācijas un lietošanas dokumentus, lai atrastu biežas iestatījumu jautājumus.
- Izstrādei/testēšanai skatiet Izstrādes rokasgrāmatu.
- Ja uzglabātie iestatījumi šķiet, ka netiek pareizi piemēroti, restartējiet Thunderbird un mēģiniet vēlreiz. (Thunderbird var kešot stāvokli starp sesijām; restartēšana nodrošina, ka tiek ielādēti jauni iestatījumi.)
- Minimāla reproducēšana: mēģiniet ar mazu testēšanas e-pastu, kas satur vienu vai divus vienkāršus failu pielikumus.
- Salīdziniet uzvedību ar apstiprinājumu IESLĒGTU un IZSLĒGTU, lai noskaidrotu, vai dialoga plūsma ir iesaistīta.

---

### Ko iekļaut ziņojumā

- Thunderbird versija un operētājsistēma
- Precīzi soļi reproducēšanai (ko jūs darījāt, ko gaidījāt, kas notika)
- Vai bija iespējots apstiprinājums un jūsu noklusējuma atbildes iestatījums
- Jūsu melno sarakstu paraugi (ja attiecas)
- Kļūdu konsoles ieraksti reprodukcijas laikā (Rīki → Izstrādātāja rīki → Kļūdu konsole)
- Iespējot atkļūdošanas žurnālu (pēc izvēles):
  - Izpildiet Thunderbird Kļūdu konsolē: `messenger.storage.local.set({ debug: true })`
  - Reproducējiet problēmu un kopējiet attiecīgās `[RWA]` žurnālu rindas

---

### Problēmu veidne (kopēt/iemest) {#issue-template}

- Thunderbird versija un operētājsistēma:
- Soļi reproducēšanai:
- Apstiprinājums iespējots? Noklusējuma atbilde:
- Melno sarakstu paraugi:
- Kļūdu konsoles ieraksti (Rīki → Izstrādātāja rīki → Kļūdu konsole):
- Viss cits, kas ir attiecīgs:

---

### Ziedot

Ja vēlaties atbalstīt šo projektu, lūdzu, apsveriet nelielu ziedojumu sadaļā [Ziedot](donation). Paldies!
