---
id: features
title: 'Functies'
sidebar_label: 'Functies'
---

## Features {#features}

- Automatisch bijlagen van de originele e-mail bijvoegen bij het antwoorden.
- Configureerbaar gedrag: bijlagen kunnen
  - automatisch worden toegevoegd, of
  - alleen na bevestiging worden toegevoegd (een kleine, toegankelijke dialoog). In Opties kun je de bevestiging inschakelen en het standaardantwoord kiezen (Ja/Nee).
- Blacklist van bestandsnamen (glob-patronen) voorkomt dat specifieke bestanden automatisch worden bijgevoegd. Voorbeelden: `*intern*`, `*secret*`, `*passwor*`.
  Matchen is hoofdlettergevoelig en controleert alleen de bestandsnaam; geef één patroon per regel op in Opties.
- Blacklist-waarschuwing (optioneel, standaard ingeschakeld): wanneer bestanden worden uitgesloten door je blacklist, toont een kleine modal het bestand en de bijbehorende patroon(patronen). Donkere modus vriendelijk en toegankelijk met het toetsenbord (Enter/Esc om te sluiten).
- Werkt met Antwoorden en Alle antwoorden. Doorsturen wordt niet gewijzigd door deze add-on.
- Voegt originelen toe, zelfs als je zelf al iets hebt bijgevoegd; voorkomt duplicaten op basis van bestandsnaam.
- Per-tab duplicaatbewaker voorkomt dubbel toevoegen in dezelfde samenstellingstab.
- Slaat S/MIME-certificaten en inline afbeeldingen over om onnodige bijlagen te vermijden.

## How It Works {#how-it-works}

- Bij antwoorden toont de add-on originele bijlagen.
- Filtert S/MIME-handtekeningen en inline afbeeldingen eruit.
- Vraagt optioneel om bevestiging (toetsenbordvriendelijk).
- Voegt in aanmerking komende bestanden toe aan je samenstelling, waarbij duplicaten op basis van bestandsnaam worden vermeden.
- Zie "Waarom bijlagen mogelijk niet worden toegevoegd" in Gebruik voor randgevallen.

Privacy-opmerking: Alle verwerking gebeurt lokaal in Thunderbird. De add-on maakt geen achtergrondnetwerkverzoeken.
