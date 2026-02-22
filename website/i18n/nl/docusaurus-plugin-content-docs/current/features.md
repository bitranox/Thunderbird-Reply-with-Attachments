---
id: features
title: 'Functies'
sidebar_label: 'Functies'
---

---

## Functies {#features}

- Voegt automatisch bestanden uit de oorspronkelijke e‑mail toe bij het beantwoorden.
- Instelbaar gedrag: bijlagen kunnen
  - automatisch worden toegevoegd, of
  - alleen na bevestiging worden toegevoegd (een kleine, toegankelijke dialoog). In Opties
    kunt u de bevestiging inschakelen en het standaardantwoord (Ja/Nee) kiezen.
- Zwarte lijst van bestandsnamen (glob‑patronen) voorkomt dat specifieke bestanden worden
  toegevoegd. Voorbeelden: `*intern*`, `*secret*`, `*passwor*`.
  Vergelijken is niet hoofdlettergevoelig en controleert alleen de bestandsnaam; geef één patroon
  per regel op in Opties.
- Waarschuwing voor zwarte lijst (optioneel, standaard ingeschakeld): wanneer bestanden door uw
  zwarte lijst worden uitgesloten, toont een kleine modal het bestand en het/de overeenkomende patroon/patronen. Donkermodus‑vriendelijk en met toetsenbord te bedienen (Enter/Esc om te sluiten).
- Werkt met Beantwoorden en Allen beantwoorden. Doorsturen wordt door deze add‑on niet gewijzigd.
- Voegt originelen toe, ook als u zelf al iets hebt bijgevoegd; voorkomt duplicaten op basis van bestandsnaam.
- Beveiliging tegen duplicaten per tabblad voorkomt dubbel toevoegen in hetzelfde opstel‑tabblad.
- Slaat S/MIME‑certificaten standaard over om onnodige bijlagen te voorkomen.
- Inline afbeeldingen opnemen (standaard: AAN). Ingebedde afbeeldingen worden direct in de
  antwoordtekst hersteld als base64 data‑URI's, waarbij de oorspronkelijke inline‑opmaak behouden blijft. Uitschakelen in
  Opties om inline afbeeldingen volledig over te slaan.

---

## Hoe het werkt {#how-it-works}

- Bij beantwoorden somt de add‑on de oorspronkelijke bijlagen op.
- Filtert S/MIME‑handtekeningen uit bestandsbijlagen; inline afbeeldingen worden in de tekst hersteld (tenzij uitgeschakeld).
- Vraagt desgewenst om bevestiging (toetsbordvriendelijk).
- Voegt in aanmerking komende bestanden toe aan uw opstelvenster en voorkomt duplicaten op basis van bestandsnaam.
- Zie “Waarom bijlagen mogelijk niet worden toegevoegd” in Gebruik voor randgevallen.

Privacyopmerking: alle verwerking vindt lokaal in Thunderbird plaats. De add‑on maakt geen netwerkverzoeken op de achtergrond.

---
