---
id: privacy
title: 'Privacy'
sidebar_label: 'Privacy'
---

## Privacy

:::note Geen telemetrie; geen achtergrondnetwerk
Deze add-on verzamelt **geen** analytics/telemetrie en maakt **geen** achtergrond netwerkverzoeken. Toegang tot het netwerk vindt alleen plaats wanneer je op een externe link klikt (Docs, GitHub, Doneer).
:::

Reply with Attachments verzamelt geen analytics of telemetrie en verstuurt je gegevens nergens naartoe.

Wat de add-on doet:

- Leest bijlagenmetadata en bestanden van het oorspronkelijke bericht lokaal (Thunderbird API) om ze aan je antwoord toe te voegen.
- Slaat je opties (zwarte lijst, bevestiging, standaard antwoord) op in de lokale opslag van Thunderbird.

Wat de add-on niet doet:

- Geen tracking, analytics, crashrapportage of externe logging.
- Geen achtergrond netwerkverzoeken, behalve wanneer je expliciet externe links opent (Docs, GitHub, Doneer).

Machtigingen zijn gedocumenteerd op de [Machtigingen](permissions) pagina.

---

## Content Security Policy (CSP) {#content-security-policy-csp}

De opties en pop-uppagina's vermijden inline scripts. Alle JavaScript wordt geladen vanaf bestanden die met de add-on zijn meegeleverd om te voldoen aan strikte CSP in Thunderbird. Als je codefragmenten in documenten embed, zijn ze alleen voorbeelden en worden ze niet uitgevoerd door de add-on.

---

## Gegevensopslag {#data-storage}

- Gebruikersvoorkeuren (zwarte lijst, bevestigingsschakelaar, standaard antwoord) worden opgeslagen in Thunderbird’s `storage.local` voor deze add-on.
- Er wordt geen cloud-synchronisatie uitgevoerd door de add-on.

---

## Netwerk {#network}

- De add-on voert geen achtergrondnetwerkactiviteiten uit.
- Toegang tot het netwerk vindt alleen plaats wanneer je op links klikt (Docs, GitHub, Doneer) of wanneer Thunderbird zelf normale bewerkingen uitvoert die niet gerelateerd zijn aan deze add-on.

---

## Gegevensverwijdering {#data-removal}

- Het verwijderen van de add-on verwijdert de code.
- Instellingen worden alleen in Thunderbird’s `storage.local` bewaard en worden verwijderd bij de installatie; er wordt geen externe opslag gebruikt.
- Herstel instellingen zonder te deïnstalleren:
  - Opties pagina: gebruik “Herstel naar standaard” voor de zwarte lijst en waarschuwing voor de zwarte lijst.
  - Geavanceerd: in Thunderbird → Hulpmiddelen → Ontwikkelaarshulpmiddelen → Debug Add-ons, open de opslag van de extensie en wis sleutels indien nodig.

---
