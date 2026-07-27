---
id: usage
title: 'Gebruik'
sidebar_label: 'Gebruik'
---

---

## Gebruik {#usage}

- Beantwoord en de add-on voegt originelen automatisch toe — of vraagt eerst om bevestiging, als dit is ingeschakeld in Opties.
- Gededupliceerd op bestandsnaam; S/MIME-onderdelen worden altijd overgeslagen. Afbeeldingen die in het oorspronkelijke bericht zijn ingesloten, blijven in de hoofdtekst van het antwoord staan, waar Thunderbird ze plaatst, en worden niet als bestand gekopieerd.
- Bijlagen op de zwarte lijst worden ook overgeslagen (hoofdletterongevoelige glob‑patronen die bestandsnamen matchen, niet paden). Zie [Configuratie](configuration#blacklist-glob-patterns).

---

### Wat gebeurt er bij beantwoorden {#what-happens}

- Antwoord detecteren → oorspronkelijke bijlagen opsommen → S/MIME en ingesloten afbeeldingen overslaan → optionele bevestiging → de geschikte bestanden toevoegen (duplicaten overslaan).

| Onderdeeltype                                                     | Gekopieerd naar het antwoord |
|-------------------------------------------------------------------|-----------------------------:|
| S/MIME-handtekeningbestand `smime.p7s`                            | Nee                          |
| S/MIME MIME-typen (`application/pkcs7-*`)                         | Nee                          |
| Afbeelding die de berichttekst insluit via `cid:`                 | Nee (staat in de tekst)      |
| Afbeelding gemarkeerd als `Content-Disposition: inline`           | Nee (staat in de tekst)      |
| Afbeelding met een `Content-ID` waar de tekst nooit naar verwijst | Ja                           |
| Bijgevoegde e-mail (`message/rfc822`) met een bestandsnaam        | Ja                           |
| Gewone bestandsbijlage met een bestandsnaam                       | Ja                           |

Een afbeelding telt alleen als ingesloten wanneer het oorspronkelijke bericht er daadwerkelijk naar verwijst, of wanneer
de afzender deze expliciet heeft gemarkeerd als `Content-Disposition: inline`. Een kale `Content-ID`-header is niet voldoende:
sommige e-mailprogramma's plaatsen die op elk afbeeldingsonderdeel, inclusief echte bijlagen, en die moeten alsnog worden gekopieerd.

---

### Kruisverwijzing {#cross-reference}

- Doorsturen wordt uit ontwerp niet aangepast (zie Beperkingen hieronder).
- Voor redenen waarom een bijlage mogelijk niet wordt toegevoegd, zie “Waarom bijlagen mogelijk niet worden toegevoegd”.

---

## Gedragsdetails {#behavior-details}

- Duplicaatpreventie: de add‑on markeert het opstel‑tabblad als verwerkt met een sessiewaarde per tabblad en een bewaker in het geheugen. Hij voegt originelen niet twee keer toe.
- Het sluiten en heropenen van een opstelvenster wordt behandeld als een nieuw tabblad (d.w.z. een nieuwe poging is toegestaan).
- Bestaande bijlagen respecteren: als het opstelvenster al bijlagen bevat, worden originelen toch precies één keer toegevoegd, en worden bestandsnamen die al bestaan overgeslagen.
- Uitsluitingen: S/MIME‑artefacten en inline‑afbeeldingen worden uitgesloten van bestandsbijlagen. Als er in de eerste doorloop niets in aanmerking komt, controleert een soepele terugval niet‑S/MIME‑onderdelen opnieuw. Inline‑afbeeldingen worden apart afgehandeld: ze worden in de antwoordtekst hersteld als data‑URI's (wanneer ingeschakeld).
  - Bestandsnamen: `smime.p7s`
  - MIME‑typen: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline‑afbeeldingen: elk `image/*`‑onderdeel waarnaar wordt verwezen door Content‑ID — uitgesloten van bestandsbijlagen maar ingesloten in de antwoordtekst wanneer "Inline‑afbeeldingen opnemen" AAN staat
  - Bijgevoegde e‑mails (`message/rfc822`): worden behandeld als reguliere bijlagen als ze een bestandsnaam hebben; ze kunnen worden toegevoegd (onder voorbehoud van duplicaatcontroles en zwarte lijst).
- Waarschuwing zwarte lijst (indien ingeschakeld): wanneer kandidaten door uw zwarte lijst worden uitgesloten,
  toont de add‑on een klein modaal venster met de betrokken bestanden en het overeenkomende
  patroon/patronen. Deze waarschuwing verschijnt ook in gevallen waarin geen bijlagen zullen worden
  toegevoegd omdat alles is uitgesloten.

---

## Sneltoetsen {#keyboard-shortcuts}

- Bevestigingsdialoog: Y/J = Ja, N/Esc = Nee; Tab/Shift+Tab en pijltoetsen wisselen de focus.
  - De “Standaardantwoord” in [Configuratie](configuration#confirmation) bepaalt welke knop aanvankelijk focus heeft.
  - Enter activeert de knop met focus. Tab/Shift+Tab en pijltoetsen verplaatsen de focus voor toegankelijkheid.

### Sneltoetsen-spiekbriefje {#keyboard-cheat-sheet}

| Toetsen           | Actie                               |
|-------------------|-------------------------------------|
| Y / J             | Bevestig Ja                         |
| N / Esc           | Bevestig Nee                        |
| Enter             | Gefocuste knop activeren            |
| Tab / Shift+Tab   | Focus vooruit/achteruit verplaatsen |
| Pijltoetsen       | Focus tussen knoppen verplaatsen    |
| Standaardantwoord | Stelt initiële focus in (Ja of Nee) |

---

## Beperkingen {#limitations}

- Doorsturen wordt door deze add‑on niet aangepast (Beantwoorden en Allen beantwoorden worden ondersteund).
- Zeer grote bijlagen kunnen onderhevig zijn aan limieten van Thunderbird of de provider.
  - De add‑on segmenteert of comprimeert bestanden niet; hij vertrouwt op de normale bijlage‑afhandeling van Thunderbird.
- Versleutelde berichten: S/MIME‑onderdelen worden bewust uitgesloten.

---

## Waarom bijlagen mogelijk niet worden toegevoegd {#why-attachments-might-not-be-added}

- Afbeeldingen die het oorspronkelijke bericht insluit, worden niet als bestand gekopieerd. Ze staan al in de hoofdtekst van het antwoord, waar Thunderbird ze heeft geplaatst. Zie [Configuration](configuration#include-inline-pictures).
- S/MIME‑handtekeningonderdelen worden bewust uitgesloten: bestandsnamen zoals `smime.p7s` en MIME‑typen zoals `application/pkcs7-signature` of `application/pkcs7-mime` worden overgeslagen.
- Patronen van de zwarte lijst kunnen kandidaten filteren: zie [Configuratie](configuration#blacklist-glob-patterns); overeenkomen is hoofdletterongevoelig en alleen op bestandsnaam.
- Dubbele bestandsnamen worden niet opnieuw toegevoegd: als het opstelvenster al een bestand met dezelfde genormaliseerde naam bevat, wordt het overgeslagen.
- Niet‑bestandsonderdelen of ontbrekende bestandsnamen: alleen bestandsachtige onderdelen met bruikbare bestandsnamen komen in aanmerking om te worden toegevoegd.

---

Zie ook

- [Configuratie](configuration)
