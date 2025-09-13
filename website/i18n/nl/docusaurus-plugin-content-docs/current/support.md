---
id: support
title: 'Ondersteuning'
sidebar_label: 'Ondersteuning'
---

## FAQ {#faq}

### Bijlagen zijn niet toegevoegd — waarom?

- Inline afbeeldingen en S/MIME-onderdelen zijn opzettelijk uitgesloten.
- Dubbele bestandsnamen worden overgeslagen als de samenstelling al hetzelfde bestand heeft.
- Zwartlijstpatronen kunnen kandidaten filteren; zie [Configuratie](configuration#blacklist-glob-patterns).

### Kan ik bevestigen voordat ik bijlagen toevoeg?

Ja. Zet "Vraag voordat bijlagen worden toegevoegd" aan onder [Configuratie → Bevestiging](configuration#confirmation). Toetsenbord: Y/J = Ja, N/Esc = Nee.

### Stuurt de add-on gegevens of volgt het gebruik?

Nee. Zie [Privacy](privacy) — geen telemetrie en geen achtergrond netwerkverzoeken.

### Doorsturen voegt geen bijlagen toe — is dat te verwachten?

Ja. Alleen Beantwoorden en Beantwoorden aan allen worden gewijzigd door deze add-on; Doorsturen blijft ongewijzigd. Zie [Beperkingen](usage#limitations).

### Waar is de Doneren-snooze?

Opties → Ondersteuning sectie. Zie [Donatiezichtbaarheid](configuration#donation-visibility).

---

## Ondersteuning

Heeft u hulp nodig of wilt u een bug melden?

---

### Open een probleem op GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemen: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Vermeld de Thunderbird-versie (bijv. 128 ESR), OS en stappen om te reproduceren
- Voeg relevante logboeken toe van de Foutconsole van Thunderbird (Hulpmiddelen → Ontwikkeltools → Foutconsole)

- Add-ons site (ATN): U kunt ook feedback achterlaten via de [add-on pagina](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Zorg ervoor dat u op een ondersteunde Thunderbird-versie bent (128 ESR of nieuwer).
- Bekijk de documentatie over Configuratie en Gebruik voor veelvoorkomende setup vragen.
- Voor ontwikkeling/testen, zie de Ontwikkelingsgids.
- Als opgeslagen instellingen niet goed lijken toe te passen, start Thunderbird opnieuw en probeer het opnieuw. (Thunderbird kan status tussen sessies cachen; een herstart zorgt ervoor dat nieuwe instellingen worden geladen.)
- Minimale reproductie: probeer met een kleine test-e-mail met een of twee eenvoudige bestandsbijlagen.
- Vergelijk het gedrag met bevestiging AAN vs. UIT om te bepalen of de dialoogstroom betrokken is.

---

### Wat op te nemen in een rapport

- Thunderbird-versie en OS
- Exacte stappen om te reproduceren (wat u deed, wat u verwachtte, wat er gebeurde)
- Of bevestiging was ingeschakeld en uw standaard antwoordinstelling
- Een voorbeeld van uw zwartlijstpatronen (indien van toepassing)
- Foutconsole-logboeken tijdens het reproduceren (Hulpmiddelen → Ontwikkeltools → Foutconsole)
- Schakel debuglogging in (optioneel):
  - Voer uit in de Foutconsole van Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduceer het probleem en kopieer relevante `[RWA]` logregels

---

### Probleemtemplate (kopie/plak) {#issue-template}

- Thunderbird-versie en OS:
- Stappen om te reproduceren:
- Bevestiging ingeschakeld? Standaard antwoord:
- Voorbeeld zwartlijstpatronen:
- Foutconsole-logboeken (Hulpmiddelen → Ontwikkeltools → Foutconsole):
- Iets anders relevants:

---

### Doneren

Als u dit project wilt ondersteunen, overweeg dan een kleine bijdrage op de [Doneren](donation) pagina. Bedankt!
