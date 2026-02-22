---
id: usage
title: 'Gebruik'
sidebar_label: 'Gebruik'
---

---

## Gebruik {#usage}

- Beantwoord en de add-on voegt originelen automatisch toe — of vraagt eerst om bevestiging, als dit is ingeschakeld in Opties.
- Duplicaten voorkomen op basis van bestandsnaam; S/MIME-onderdelen worden altijd overgeslagen. Inline-afbeeldingen worden standaard hersteld in de antwoordtekst (uitschakelen via "Inline-afbeeldingen opnemen" in Opties).
- Bijlagen op de zwarte lijst worden ook overgeslagen (hoofdletterongevoelige glob‑patronen die bestandsnamen matchen, niet paden). Zie [Configuratie](configuration#blacklist-glob-patterns).

---

### Wat gebeurt er bij beantwoorden {#what-happens}

- Antwoord detecteren → originele bijlagen opsommen → S/MIME + inline filteren → optioneel bevestigen → in aanmerking komende bestanden toevoegen (duplicaten overslaan) → inline‑afbeeldingen in de tekst herstellen.

Strikte vs. soepele doorloop: de add‑on sluit eerst S/MIME‑ en inline‑onderdelen uit van bestandsbijlagen. Als er niets in aanmerking komt, voert hij een soepele doorloop uit die S/MIME/inline nog steeds uitsluit maar meer gevallen tolereert (zie Codedetails). Inline‑afbeeldingen worden nooit als bestandsbijlagen toegevoegd; in plaats daarvan worden ze, wanneer "Inline‑afbeeldingen opnemen" is ingeschakeld (de standaard), direct in de antwoordtekst ingesloten als base64‑data‑URI's.

| Onderdeeltype                                                         |                  Strikte doorloop |                  Soepele doorloop |
| --------------------------------------------------------------------- | --------------------------------: | --------------------------------: |
| S/MIME-handtekeningbestand `smime.p7s`                                |                       Uitgesloten |                       Uitgesloten |
| S/MIME-MIME-typen (`application/pkcs7-*`)                             |                       Uitgesloten |                       Uitgesloten |
| Inline‑afbeelding waarnaar wordt verwezen door Content‑ID (`image/*`) | Uitgesloten (hersteld in tekst\*) | Uitgesloten (hersteld in tekst\*) |
| Bijgevoegde e‑mail (`message/rfc822`) met een bestandsnaam            |                   Niet toegevoegd |             Kan worden toegevoegd |
| Normale bestandsbijlage met een bestandsnaam                          |             Kan worden toegevoegd |             Kan worden toegevoegd |

\* Wanneer "Inline‑afbeeldingen opnemen" is ingeschakeld (standaard: AAN), worden inline‑afbeeldingen in de antwoordtekst ingesloten als base64‑data‑URI's in plaats van als bestandsbijlagen toegevoegd. Zie [Configuratie](configuration#include-inline-pictures).

Voorbeeld: Sommige bijlagen missen bepaalde headers maar zijn toch reguliere bestanden (niet inline/S/MIME). Als de strikte doorloop er geen vindt, kan de soepele doorloop die accepteren en toevoegen.

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
| ----------------- | ----------------------------------- |
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

- Inline‑afbeeldingen worden niet als bestandsbijlagen toegevoegd. Als "Inline‑afbeeldingen opnemen" AAN staat (de standaard), worden ze in plaats daarvan in de antwoordtekst ingesloten als data‑URI's. Als de instelling UIT staat, worden inline‑afbeeldingen volledig verwijderd. Zie [Configuratie](configuration#include-inline-pictures).
- S/MIME‑handtekeningonderdelen worden bewust uitgesloten: bestandsnamen zoals `smime.p7s` en MIME‑typen zoals `application/pkcs7-signature` of `application/pkcs7-mime` worden overgeslagen.
- Patronen van de zwarte lijst kunnen kandidaten filteren: zie [Configuratie](configuration#blacklist-glob-patterns); overeenkomen is hoofdletterongevoelig en alleen op bestandsnaam.
- Dubbele bestandsnamen worden niet opnieuw toegevoegd: als het opstelvenster al een bestand met dezelfde genormaliseerde naam bevat, wordt het overgeslagen.
- Niet‑bestandsonderdelen of ontbrekende bestandsnamen: alleen bestandsachtige onderdelen met bruikbare bestandsnamen komen in aanmerking om te worden toegevoegd.

---

Zie ook

- [Configuratie](configuration)
