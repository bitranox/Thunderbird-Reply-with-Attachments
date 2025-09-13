---
id: support
title: 'Ondersteuning'
sidebar_label: 'Ondersteuning'
---

## FAQ {#faq}

### Bijvoegsels is nie bygevoegd nie — hoekom?

- Inline prente en S/MIME gedeeltes is doelbewus uitgesluit.
- Dubbele lêernomme word oorgeslaan as die samestelling reeds dieselfde lêer het.
- Swartlys patrone kan kandidate filter; sien [Konfigurasie](configuration#blacklist-glob-patterns).

### Kan ek bevestig voordat ek byvoegsels toevoeg?

Ja. Aktiveer "Vra voordat jy byvoegsels voeg" onder [Konfigurasie → Bevestiging](configuration#confirmation). Toetsbord: Y/J = Ja, N/Esc = Nee.

### Stuur die invoegtoepassing enige data of volg dit gebruik?

Nee. Sien [Privaatheid](privacy) — geen telemetrie en geen agtergrondnetwerkversoeke.

### Vooruitstuur voeg nie byvoegsels by nie — is dit verwag?

Ja. Slegs Antwoord en Antwoord almal word deur hierdie invoegtoepassing gewysig; Vooruitstuur bly onveranderd. Sien [Beperkings](usage#limitations).

### Waar is die Skink Geld Snooze?

Opsies → Ondersteuning afdeling. Sien [Skenking Sigbaarheid](configuration#donation-visibility).

---

## Ondersteuning

Het jy hulp nodig of wil jy 'n fout rapporteer?

---

### Open 'n probleem op GitHub:

- Bewaarplek: `bitranox/Thunderbird-Reply-with-Attachments`
- Probleme: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Sluit Thunderbird weergawe (bv., 128 ESR), OS, en stappe om te reproduseer in
- Voeg relevante logs van Thunderbird se Foutkonsool by (Gereedskap → Ontwikkelaarstools → Foutkonsool)

- Invoegtoepassingswebwerf (ATN): Jy kan ook terugvoer gee via die [invoegtoepassing bladsy](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Wenke

- Verseker jy is op 'n ondersteunde Thunderbird weergawe (128 ESR of nuwer).
- Kyk na die Konfigurasie en Gebruik dokumentasie vir algemene opstelling vrae.
- Vir ontwikkeling/toetsing, sien die Ontwikkeling gids.
- As gestoor instellings nie korrek blyk toe te pas nie, herbegin Thunderbird en probeer weer. (Thunderbird kan toestand oor sessies cache; 'n herbegin verseker vars instellings word gelaai.)
- Minimale reproduksie: probeer met 'n klein toets-e-pos wat een of twee eenvoudige lêerbyvoegsels bevat.
- Vergelyk gedrag met bevestiging AAN teenoor AF om te beperk of die dialoog vloei betrokke is.

---

### Wat om in 'n verslag in te sluit

- Thunderbird weergawe en OS
- Presiese stappe om te reproduseer (wat jy gedoen het, wat jy verwag het, wat gebeur het)
- Of bevestiging geaktiveer was en jou standaard antwoord instelling
- 'n Monster van jou swartlys patrone (indien relevant)
- Foutkonsool logs terwyl jy reproduseer (Gereedskap → Ontwikkelaarstools → Foutkonsool)
- Aktiveer foutopsporing logging (opsioneel):
  - Loop in Thunderbird se Foutkonsool: `messenger.storage.local.set({ debug: true })`
  - Reproduseer die probleem en kopieer relevante `[RWA]` log lyne

---

### Probleem sjabloon (kopie/plak) {#issue-template}

- Thunderbird weergawe en OS:
- Stappe om te reproduseer:
- Bevestiging geaktiveer? Standaard antwoord:
- Monster swartlys patrone:
- Foutkonsool logs (Gereedskap → Ontwikkelaarstools → Foutkonsool):
- Enige anders relevante:

---

### Skink

As jy hierdie projek wil ondersteun, oorweeg asseblief 'n klein bydrae op die [Skink](donation) bladsy. Dankie!
