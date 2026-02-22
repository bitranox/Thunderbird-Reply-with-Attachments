---
id: quickstart
title: 'Snelstart'
sidebar_label: 'Snelstart'
---

---

## Snelstart

:::important Minimale Thunderbird-versie
Deze add-on ondersteunt Thunderbird **128 ESR of nieuwer**. Oudere versies worden niet ondersteund.
:::

:::note Geen telemetrie; geen achtergrondnetwerk
De add-on verzamelt **geen** analyses/telemetrie en maakt **geen** achtergrondnetwerkverzoeken. Netwerktoegang vindt alleen plaats wanneer je op externe links klikt (Docs, GitHub, Doneren).
:::

---

### Installeren

1. Installeer de add-on via Thunderbird Add-ons.
2. Optioneel: Schakel bevestiging in (Opties → “Vraag voordat bijlagen worden toegevoegd”).
3. Optioneel: Laat de waarschuwing voor de zwarte lijst ingeschakeld (standaard): “Waarschuwen als bijlagen door de zwarte lijst worden uitgesloten”.
4. Optioneel: Voeg patronen voor de zwarte lijst toe (één per regel), bijv.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Opmerking: De “# …” hierboven is een opmerking in deze documentatie; neem geen opmerkingen op in patronen die je in Opties plakt. Voer slechts één patroon per regel in.

Reageer nu op een bericht met bijlagen — de originelen worden automatisch toegevoegd of na een korte bevestiging. Als bestanden door je zwarte lijst worden uitgesloten, zie je een korte waarschuwing die ze opsomt.

---

### Controleren {#verify}

- Beantwoord een bericht met 1–2 bijlagen en controleer dat de originelen aan je opstelvenster zijn toegevoegd.
- Om het gedrag aan te passen, zie [Configuratie](configuration) (bevestigingsschakelaar, standaardantwoord, patronen voor de zwarte lijst).

---

### Zwarte-lijstwaarschuwing controleren {#verify-blacklist-warning}

- Beantwoord een bericht dat een bestand zoals “secret.txt” bevat.
- Met “Waarschuwen als bijlagen door de zwarte lijst worden uitgesloten” ingeschakeld, toont een kleine dialoog de uitgesloten bestanden en het overeenkomende patroon.

Als je geen waarschuwing ziet, zorg er dan voor dat het patroon exact overeenkomt met de bestandsnaam (alleen bestandsnaam, niet hoofdlettergevoelig). Zie Configuratie → Zwarte lijst.

---

### Opmerking over het toetsenbord {#keyboard-note}

- Het bevestigingsvenster ondersteunt Y/J voor Ja en N/Esc voor Nee. Op sommige niet‑Latijnse toetsenborden kunnen de lettertoetsen variëren; Enter bevestigt de geselecteerde knop.

---
