---
id: configuration
title: 'Configuratie'
---

## Configuratie

Terminologienaam: zie de [Woordenlijst](glossary) voor consistente termen die in de UI en documentatie worden gebruikt.

---

## Opties openen in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Hulpmiddelen → Add-ons en thema’s → zoek “Beantwoorden met bijlagen” → Voorkeuren/Opties

---

### Instellingen {#settings}

#### Bevestiging {#confirmation}

- Schakel “Vraag voordat bijlagen worden toegevoegd” in
- Standaardantwoord: Ja of Nee (focus & toetsenbord standaard)
- Toetsenbord: Y/J = Ja; N/Esc = Nee; Tab/Shift+Tab en pijltoetsen wisselen focus
  - Zie toetsenborddetails in [Gebruik](usage#keyboard-shortcuts).

---

#### Zwarte lijst (glob-patronen) {#blacklist-glob-patterns}

Bestanden op de zwarte lijst worden niet automatisch toegevoegd bij het antwoorden. Zie ook de [Woordenlijst](glossary) voor “Zwarte lijst (Uitsluitlijst)”.

- Eén patroon per regel; hoofdletterongevoelig; alleen bestandsnaammatching
- Voorbeelden: `*intern*`, `*secret*`, `*passwor*`
- Ondersteunde glob-tokens: `*` (alleen tekens behalve `/`), `?` (één teken), tekenklassen zoals `[abc]`. Gebruik `\[` om een letterlijke `[` te matchen. Paden (`**/`) worden genegeerd omdat alleen bestandsnamen worden gematcht.
- Niet ondersteund: negatie (`!`), haakuitbreiding (`{..}`), en complexe bereiken. Houd patronen simpel.
- Kommentaren worden niet ondersteund in patronen. Neem geen `#` of inline opmerkingen op; geef alleen de patroon tekst per regel op.

---

##### Patroon kookboek {#pattern-cookbook}

- Match elke PDF: `*.pdf`
- Match bestanden die beginnen met “scan”: `scan*`
- Tekenklasse: `report[0-9].txt`
- Escape een letterlijke `[`: `\[` (nuttig bij het matchen van een haakje als een teken)

---

##### Notities {#blacklist-notes}

- De volgorde doet er niet toe; de eerste/elk match sluit het bestand uit.
- Matching is alleen voor bestandsnamen (paden/mappen worden genegeerd).
- “Reset naar standaard” herstelt de aanbevolen patronen en de zwarte lijst waarschuwing toggle.
- Waarom het voorbeeld `*passwor*`? Het matcht zowel “password” als “Passwort” families.
- Voorrang: als een patroon overeenkomt met een bestandsnaam, wordt het bestand uitgesloten (eerste/elk match — de volgorde verandert het resultaat niet).
- Tip — test je patroon: voeg een tijdelijk patroon toe, antwoord op een bericht met een bestand met een overeenkomende naam, en bevestig dat het is uitgesloten in de waarschuwinglijst.

##### Snelle test (veilige test) {#blacklist-try-it}

1. Open Opties → Zwarte lijst.
2. Voeg een tijdelijk patroon toe zoals `*.tmp` en klik op Opslaan.
3. Beantwoord een testmail die een bestand heeft dat eindigt met `.tmp` — het bestand zou in de waarschuwinglijst moeten verschijnen en niet worden bijgevoegd.
4. Verwijder het tijdelijke patroon wanneer je klaar bent, of klik op “Reset naar standaard”.

---

#### Waarschuwing voor uitgesloten bijlagen {#warning-on-excluded-attachments}

- Schakel “Waarschau als bijlagen worden uitgesloten door de zwarte lijst” in (standaard: AAN).
- Wanneer ingeschakeld, toont een klein venster uitgesloten bestanden en de bijbehorende patroon(en). De
  waarschuwing verschijnt ook wanneer er niets zal worden bijgevoegd omdat alle kandidaten
  op de zwarte lijst staan.

---

#### Bewaar je instellingen {#save-your-settings}

Instellingen worden opgeslagen door op de Opslaan-knop te drukken. Je kunt individuele velden handmatig terugdraaien of standaardinstellingen resetten indien nodig.

Als opgeslagen instellingen niet goed lijken toe te passen, herstart Thunderbird en probeer het opnieuw. (Thunderbird kan staat over sessies heen cachen; een herstart zorgt ervoor dat verse instellingen worden geladen.)

Tip: Om te bevestigen dat je instellingen effect hebben gehad, antwoord op een bericht met een bijlage en controleer de bevestiging of zwarte lijst waarschuwing.

---

#### Donatiezichtbaarheid (90-dagen sluimer) {#donation-visibility}

De add-on bevat een handige functie om donatie-uitnodigingen een tijdje te verbergen nadat je hebt gedoneerd.

Waar je het kunt vinden

- Opties → Ondersteuningssectie: je ziet een “Ik heb gedoneerd” knop en een klein hintgebied.
- Het Bevestigingsdialoogvenster toont ook een Doneren-knop; deze wordt automatisch verborgen wanneer de sluimer actief is.

Hoe het werkt

- Door op “Ik heb gedoneerd” te klikken, worden donatieknoppen en gerelateerde uitnodigingen gedurende 90 dagen verborgen.
- Een statusindicatie toont “Verborgen tot YYYY-MM-DD” (in jouw lokale datum). Er is ook een “Toon Doneren opnieuw” knop om de zichtbaarheid onmiddellijk te herstellen.
- Na 90 dagen wordt de Doneren-knop automatisch weer zichtbaar.

Privacy & opslag

- De add-on slaat een enkele tijdstempel op in Thunderbirds lokale opslag om de sluimerperiode te onthouden. Sleutel: `donateHideUntil` (epoch-milliseconds).
- Deze instelling is lokaal voor jouw Thunderbird-profiel (niet cloud-gesynchroniseerd). Er worden geen netwerkverzoeken gedaan door deze functie.

Probleemoplossing

- Als Doneren nog steeds zichtbaar is direct na het klikken op “Ik heb gedoneerd”, wacht een moment of heropen de pagina Opties; de UI wordt bijgewerkt zodra de instelling is opgeslagen.
- Om handmatig terug te zetten, klik op “Toon Doneren opnieuw”. Je kunt ook wachten tot de datum die in de hint wordt vermeld is verstreken.

Deze functie is puur voor gemak; het blokkeert nooit add-on functionaliteit en verzamelt geen persoonlijke gegevens.

---

### Bestandsnaamnormalisatie (duplicatenpreventie) {#filename-normalization-duplicates-prevention}

Om consistent te functioneren op verschillende platforms, worden bestandsnamen genormaliseerd voordat duplicaatcontroles plaatsvinden:

- Unicode wordt genormaliseerd naar NFC.
- Namen worden hoofdlettervervouwd (kleine letters).
- Afgebroken punten/spaties worden verwijderd (Windows-vriendelijkheid).

Dit houdt duplicaatdetectie voorspelbaar voor namen zoals `café.pdf` vs `café.pdf` (NFD) of `FILE.txt.` vs `file.txt`.

---

## Bevestigingsgedrag {#confirmation-behavior}

- “Standaardantwoord” stelt de aanvankelijk gefocuste knop in het bevestigingsdialoogvenster in (nuttig voor toetsenbordgebruikers).
- Werkt voor zowel “Beantwoorden” als “Alle antwoorden”. “Doorsturen” wordt niet gewijzigd door deze add-on.

---

## Geavanceerd: duplicaatdetectie {#advanced-duplicate-detection}

Duplicaatpreventie wordt geïmplementeerd per opmaaktabblad en op basis van bestandsnaam. Zie [Gebruik](usage#behavior-details) voor een gedetailleerde uitleg.

---

Zie ook

- [Toestemmingen](permissions)
- [Privacy](privacy)
