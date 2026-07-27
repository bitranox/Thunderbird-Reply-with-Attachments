---
id: changelog
title: 'Endringslogg'
---

---

## Endringslogg

For den komplette, detaljerte historikken, se repositoriets
[CHANGELOG.md på GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: bilder blir ikke lenger utelatt bare fordi avsenderen satte en `Content-ID` på dem; valget "Include inline pictures" er fjernet, siden Thunderbird selv beholder innebygde bilder i svarets brødtekst; lenker åpnes nå i systemnettleseren; en grense på 50 vedlegg / 100 MB per svar, med alt som utelates rapportert.
- 2.3.2: "Include inline pictures" tok med innebygde bilder i svarets brødtekst som base64-data-URI-er (fjernet igjen etter gjennomgangen på add-ons.thunderbird.net; Thunderbird gjør dette selv); forbedringer i kodekvalitet og utvidet testdekning.
- 2.3.1: Beholder vedlegg etter at Thunderbird setter bakgrunnssiden for hendelser i hvilemodus; legger til målrettede feilsøkingskroker for feilsøking.
- 2.3.0: Forbedret deduplisering av vedlegg, utvidet testdekning og fjernet foreldede tillatelser for å oppfylle AMO-retningslinjene.
- 2.1.0: Full internasjonaliseringsstøtte for de 100 mest brukte språkene
- 2.0.0: omskrevet til en fullverdig versjon (EN/DE)
- 1.0.1: byttet til messages.listAttachments()
- 1.0.0: første utgivelse

---

## Datoer og kanaler {#dates-and-channels}

- Utgivelser til ATN kan være forsinket noen timer etter pakking.
- Lokale bygg er kun for utviklertesting og distribueres ikke via ATN.

---
