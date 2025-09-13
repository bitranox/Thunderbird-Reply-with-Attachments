---
id: permissions
title: 'Toegangen'
---

## Toegangen

:::note Minimale toegangen
Geen host (web) toegangen worden gevraagd door deze add-on. De add-on verzamelt geen telemetrie of maakt achtergrond netwerk verzoeken. Zie [Privacy](privacy).
:::

---

De add-on vraagt slechts om een kleine, gerichte set van toegangen. Waarom elk nodig is:

- `compose`: observeer samenstellingsgebeurtenissen, lijst/voeg bijlagen toe in je antwoord.
- `messagesRead`: lees metadata en haal bijlagebestanden op van het originele bericht.
- `scripting`: injecteer de kleine bevestigingsdialoog in compositie wanneer ingeschakeld.
- `windows`: open een kleine bevestigingspop-up als laatste redmiddel wanneer messaging faalt.
- `sessions`: sla een per-tab vlag op om dubbele verwerking te voorkomen.
- `storage`: bewaar opties (zwarte lijst, bevestiging wisselen, standaardantwoord).
- `tabs`: gerichte messaging naar het samenstellings-tabblad voor bevestigingsverzoeken.

Aanvullende opmerkingen:

- Geen host toegangen (web oorsprongen) worden gevraagd door deze add-on.
- De `tabs` toestemming wordt alleen gebruikt om het samenstellings tabblad te targeten bij het coördineren van de optionele bevestigingsdialoog; het wordt niet gebruikt om geschiedenis te lezen of pagina's te navigeren.

Deze zijn gedocumenteerd in de bron en getest in CI. De add-on verzamelt geen telemetrie.

---

### Samenvatting (toegangen → doel) {#permissions-summary}

| Toegang          | Waarom het nodig is                                                                |
| ---------------- | ---------------------------------------------------------------------------------- |
| `compose`        | Observeer samenstellingsgebeurtenissen; lijst en voeg bijlagen toe in je antwoord. |
| `messagesRead`   | Lijst originele berichtbijlagen en haal de bestandsgegevens op.                    |
| `scripting`      | Injecteer/coördineer lichte UI voor bevestiging wanneer ingeschakeld.              |
| `windows`        | Terugval pop-up als messaging faalt (zelden).                                      |
| `sessions`       | Sla een per-tab vlag op om dubbele verwerking te voorkomen.                        |
| `storage`        | Bewaar opties (zwarte lijst, bevestiging wisselen, standaardantwoord).             |
| `tabs`           | Gerichte messaging naar het samenstellings-tabblad voor bevestigingsverzoeken.     |
| (host toegangen) | Geen — de add-on vraagt geen web oorsprongen aan.                                  |

---

## Niet gevraagd {#not-requested}

- `compose.save`, `compose.send` — de add-on slaat geen e-mails op of verzendt deze namens jou.

Zie ook: [Privacy](privacy) — geen telemetrie, geen achtergrondnetwerk, alleen door gebruiker geïnitieerde links.

---
