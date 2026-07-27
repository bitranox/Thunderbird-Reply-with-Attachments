---
id: changelog
title: 'Ændringslog'
---

---

## Ændringslog

For den fulde, detaljerede historik, se repositoriets
[CHANGELOG.md på GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: billeder springes ikke længere over, blot fordi afsenderen satte et `Content-ID` på dem; muligheden "Include inline pictures" er fjernet, da Thunderbird selv beholder indlejrede billeder i svarets brødtekst; links åbnes nu i systemets browser; et loft på 50 vedhæftninger / 100 MB pr. svar, hvor alt, der udelades, rapporteres.
- 2.3.2: "Include inline pictures" indlejrede billeder i svarets brødtekst som base64-data-URI'er (fjernet igen efter add-ons.thunderbird.net-anmeldelsen; Thunderbird gør det selv); forbedringer af kodekvalitet og udvidet testdækning.
- 2.3.1: Bevarer vedhæftninger, efter at Thunderbird sætter baggrundens event-side i dvale; tilføjer målrettede fejlsøgningskroge til fejlfinding.
- 2.3.0: Raffineret deduplikering af vedhæftninger, udvidet testdækning og fjernede forældede tilladelser for at opfylde AMO-retningslinjerne.
- 2.1.0: Fuld understøttelse af internationalisering for de 100 mest udbredte sprog
- 2.0.0: omskrevet til en fuldt funktionsrig version (EN/DE)
- 1.0.1: skiftede til messages.listAttachments()
- 1.0.0: første udgivelse

---

## Datoer og kanaler {#dates-and-channels}

- Udgivelser til ATN kan være forsinkede et par timer efter pakning.
- LOCAL builds er kun til udviklertest og distribueres ikke via ATN.

---
