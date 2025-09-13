---
id: configuration
title: 'Konfigurasie'
---

## Konfigurasie

Terminologie nota: sien die [Glossary](glossary) vir konsekwente terme wat in UI en dokumentasie gebruik word.

---

## Open opsies in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Gereedskap → Add‑ons en Temas → vind “Antwoord met Aanhangsels” → Voorkeure/Opsies

---

### Instellings {#settings}

#### Bevestiging {#confirmation}

- Skakel “Vra voordat aanhangsels bygevoeg word”
- Standaard antwoord: Ja of Nee (fokus & sleutelbord standaard)
- Sleutelbord: Y/J = Ja; N/Esc = Nee; Tab/Shift+Tab en Pylsleutels siklus fokus
  - Sien sleutelbord besonderhede in [Usage](usage#keyboard-shortcuts).

---

#### Swartlys (glob patrone) {#blacklist-glob-patterns}

Swartlysgelyste lêers sal nie outomaties by beantwoorde boodskappe gevoeg word nie. Sien ook die [Glossary](glossary) vir “Swartlys (Uitsluitingslys)”.

- Een patroon per lyn; nie-hooflettersgevoelig; slegs lêernaam ooreenstemming
- Voorbeelde: `*intern*`, `*secret*`, `*passwor*`
- Gesteunde glob tokens: `*` (enige karakters behalwe `/`), `?` (een karakter), karakterklasse soos `[abc]`. Gebruik `\[` om 'n letterlike `[` te pas. Paaie (`**/`) word geïgnoreer aangesien slegs lêernamen pas.
- Nie ondersteunde: negasie (`!`), haak uitbreidings (`{..}`), en komplekse reekse. Hou patrone eenvoudig.
- Kommentaar word nie in patrone ondersteun nie. Moet nie `#` of inline kommentaar insluit nie; voer slegs die patroon teks per lyn in.

---

##### Patroon kookboek {#pattern-cookbook}

- Pas enige PDF: `*.pdf`
- Pas lêers wat met “scan” begin: `scan*`
- Karakterklasse: `report[0-9].txt`
- Ontsnap 'n letterlike `[`: `\[` (nuttig wanneer 'n haak as 'n karakter gepas word)

---

##### Aantekeninge {#blacklist-notes}

- Volgorde maak nie saak nie; die eerste/ enige ooreenkomst sluit die lêer uit.
- Ooreenstemming is slegs lêernaam (paaie/werwe word geïgnoreer).
- “Herstel na veronderstelling” herstel die aanbevole patrone en die swartlys waarskuwing skakel.
- Waarom die voorbeeld `*passwor*`? Dit pas beide “password” en “Passwort” families.
- Prioriteit: as enige patroon 'n lêernaam pas, word die lêer uitgesluit (eerste/ enige ooreenkomst — volgorde verander nie die resultaat nie).
- Wenke — toets jou patroon: voeg 'n tydelike patroon by, antwoord op 'n boodskap wat 'n lêer met 'n ooreenkomende naam bevat, en bevestig dat dit in die waarskuwinglys uitgesluit is.

##### vinnige probeer (veilige toets) {#blacklist-try-it}

1. Maak Opsies → Swartlys.
2. Voeg 'n tydelike patroon soos `*.tmp` by en klik Stoor.
3. Antwoord op 'n toets e-pos wat 'n lêer het wat eindig op `.tmp` — die lêer moet in die waarskuwinglys verskyn en nie aangeheg wees nie.
4. Verwyder die tydelike patroon wanneer klaar, of klik “Herstel na veronderstelling”.

---

#### Waarskuwing oor uitgeslote aanhangsels {#warning-on-excluded-attachments}

- Skakel “Waarsku as aanhangsels uitgesluit word deur swartlys” (standaard: AAN).
- Wanneer geaktiveer, lys 'n klein modaal uitgeslote lêers en die ooreenstemmende patroon(s). Die waarskuwing verskyn ook wanneer daar niks aangeheg sal word nie omdat alle kandidate swartlysgelisteer is.

---

#### Stoor jou instellings {#save-your-settings}

Instellings word gestoor deur die Stoor knoppie te druk. Jy kan individuele velde handmatig terugstel of standaarde reset soos nodig.

As gestoor instellings nie behoorlik toegepas lyk nie, herbegin Thunderbird en probeer weer. (Thunderbird kan toestand oor sessies kas; 'n herbegin verseker vars instellings word gelaai.)

Wenk: Om te bevestig dat jou instellings in werking getree het, antwoord op enige boodskap met 'n aanhangsel en kyk die bevestiging of swartlys waarskuwing.

---

#### Donasie sigbaarheid (90‑dag snooze) {#donation-visibility}

Die add‑on sluit 'n gerief funksie in om donasievra om 'n tydperk weg te steek na jy gedoneer het.

Waar om dit te vind

- Opsies → Ondersteuning afdeling: jy sal 'n “Ek het gedoneer” knoppie en 'n klein wenk area sien.
- Die Stuur-bevestigings dialoog wys ook 'n Doneer knoppie; dit versteek outomaties wanneer die snooze aktief is.

Hoe dit werk

- Kliek “Ek het gedoneer” versteek donasieknooppies en verwante vrae vir 90 dae.
- 'n Statuswenk wys “Versteek tot YYYY‑MM‑DD” (in jou plaaslike datum). Daar is ook 'n “Wys Doneer weer” knoppie om sigbaarheid onmiddellik te herstel.
- Na 90 dae, word die Doneer knoppie outomaties weer sigbaar.

Privaatheid & berging

- Die add‑on stoor 'n enkele tydstempel in Thunderbird se plaaslike berging om die snooze periode te onthou. Sleutel: `donateHideUntil` (epoch millisekondes).
- Hierdie instelling is plaaslik by jou Thunderbird profiel (nie in die wolk gesinkroniseer nie). Geen netwerk versoeke word deur hierdie funksie gemaak nie.

Probleemoplossing

- As Doneer steeds reg na die kliek op “Ek het gedoneer” wys, wag 'n oomblik of heropen die Opsies bladsye; die UI werk op wanneer die instelling gestoor word.
- Om dit handmatig te reset, kliek “Wys Doneer weer”. Jy kan ook wag totdat die datum wat in die wenk gespesifiseer is verby is.

Hierdie funksie is bloot vir gerief; dit blokkeer nooit add‑on funksionaliteit nie en versamel geen persoonlike data nie.

---

### Lêernaam normalisering (dubbele voorkoming) {#filename-normalization-duplicates-prevention}

Om konsekwent te wees oor platforms, lêernomme word genormaliseer voordat dubbele kontroles gemaak word:

- Unicode is genormaliseer na NFC.
- Nomme word nie-hooflettersgevoelig (klein skryf).
- Aflopende punte/spasies word afgekap (Windows-vriendelikheid).

Dit hou dubbele opsporing voorspelbaar vir name soos `café.pdf` teenoor `café.pdf` (NFD) of `FILE.txt.` teenoor `file.txt`.

---

## Bevestiging gedrag {#confirmation-behavior}

- “Standaard antwoord” stel die aanvanklik gefokusde knoppie in die bevestigingsdialoog (nuttig vir sleutelbordgebruikers).
- Werk vir beide “Antwoord” en “Antwoord almal”. “Vore” word nie deur hierdie add-on gewysig nie.

---

## Gevorderd: dubbele opsporing {#advanced-duplicate-detection}

Dubbele voorkoming word geïmplementeer per opstel oortjie en deur lêernaam. Sien [Usage](usage#behavior-details) vir 'n gedetailleerde verduideliking.

---

Sien ook

- [Permissions](permissions)
- [Privacy](privacy)
