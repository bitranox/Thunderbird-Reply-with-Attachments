---
id: changelog
title: 'Wijzigingenlogboek'
---

---

## Changelog

Zie voor de volledige, gedetailleerde geschiedenis de
[CHANGELOG.md op GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: afbeeldingen worden niet langer weggelaten alleen omdat de afzender er een `Content-ID` op heeft gezet; de optie "Include inline pictures" is verdwenen, omdat Thunderbird ingesloten afbeeldingen zelf in de hoofdtekst van het antwoord behoudt; koppelingen openen nu in de systeembrowser; een limiet van 50 bijlagen / 100 MB per antwoord, waarbij alles wat wordt weggelaten, wordt gemeld.
- 2.3.2: "Include inline pictures" nam ingesloten afbeeldingen op in de hoofdtekst van het antwoord als base64-data-URI's (opnieuw verwijderd na de beoordeling op add-ons.thunderbird.net; Thunderbird doet dit zelf); verbeteringen in codekwaliteit en uitgebreide testdekking.
- 2.3.1: Behoudt bijlagen nadat Thunderbird de achtergrond-eventpagina inactief zet; voegt gerichte debug-hooks toe voor probleemoplossing.
- 2.3.0: Verfijnde deduplicatie van bijlagen, verbrede testdekking en verwijderde verouderde machtigingen om aan AMO-beleidsregels te voldoen.
- 2.1.0: Volledige internationaliseringsondersteuning voor de 100 populairste talen
- 2.0.0: herschreven naar een volwaardige versie (EN/DE)
- 1.0.1: overgestapt op messages.listAttachments()
- 1.0.0: eerste release

---

## Data en kanalen {#dates-and-channels}

- Releases naar ATN kunnen enkele uren vertraagd zijn na het verpakken.
- LOKALE builds zijn alleen voor testen door ontwikkelaars en worden niet via ATN verspreid.

---
