---
id: quickstart
title: 'Snelstart'
sidebar_label: 'Snelstart'
---

## Snelstart

:::important Minimale Thunderbird-versie
Deze add-on ondersteunt Thunderbird **128 ESR of nieuwer**. Oudere versies worden niet ondersteund.
:::

:::note Geen telemetry; geen achtergrondnetwerk
De add-on verzamelt **geen** analyses/telemetrie en doet **geen** achtergrondnetwerkverzoeken. Netwerktoegang vindt alleen plaats wanneer je op externe links klikt (Docs, GitHub, Doneren).
:::

---

### Installeren

1. Installeer de add-on vanuit Thunderbird Add-ons.
2. Optioneel: Bevestiging inschakelen (Opties → “Vraag voordat bijlagen worden toegevoegd”).
3. Optioneel: Laat de waarschuwing voor de zwarte lijst ingeschakeld (standaard): “Waarschuwing als bijlagen door de zwarte lijst zijn uitgesloten”.
4. Optioneel: Voeg zwarte lijstpatronen toe (één per regel), bijv.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Opmerkingen: De “# …” hierboven is een opmerking in deze documentatie; voeg geen opmerkingen toe in patronen die je in Opties plakt. Voer slechts één patroon per regel in.

Beantwoord nu een bericht met bijlagen — de originelen worden automatisch toegevoegd of na een snelle bevestiging. Als er bestanden zijn uitgesloten door jouw zwarte lijst, zie je een korte waarschuwing waarin ze worden opgesomd.

---

### Verifiëren {#verify}

- Beantwoord een bericht met 1–2 bijlagen en bevestig dat de originelen zijn toegevoegd aan je opstelvenster.
- Om het gedrag aan te passen, zie [Configuratie](configuration) (bevestigingsschakelaar, standaardantwoord, patronen voor de zwarte lijst).

---

### Verifieer de waarschuwing voor de zwarte lijst {#verify-blacklist-warning}

- Beantwoord een bericht dat een bestand zoals “secret.txt” bevat.
- Met “Waarschuw als bijlagen door de zwarte lijst zijn uitgesloten” ingeschakeld, toont een klein dialoogvenster de uitgesloten bestanden en het overeenkomstige patroon.

Als je geen waarschuwing ziet, zorg er dan voor dat het patroon exact overeenkomt met de bestandsnaam (alleen bestandsnaam, niet-hoofdlettergevoelig). Zie Configuratie → Zwarte lijst.

---

### Toetsenbordnoot {#keyboard-note}

- Het bevestigingsdialoogvenster ondersteunt Y/J voor Ja en N/Esc voor Nee. Op sommige niet-Latijnse toetsenborden kunnen de lettertoetsen variëren; Enter bevestigt de geselecteerde knop.

---
