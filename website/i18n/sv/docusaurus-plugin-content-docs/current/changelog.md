---
id: changelog
title: 'Ändringslogg'
---

---

## Ändringslogg

För den kompletta, detaljerade historiken, se repositoriets
[CHANGELOG.md på GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: bilder tas inte längre bort bara för att avsändaren satte en `Content-ID` på dem; alternativet "Include inline pictures" är borttaget, eftersom Thunderbird självt behåller inbäddade bilder i svarets brödtext; länkar öppnas nu i systemets webbläsare; ett tak på 50 bilagor / 100 MB per svar, med rapportering av allt som utelämnas.
- 2.3.2: "Include inline pictures" bäddade in bilder i svarets brödtext som base64-data-URI:er (togs bort igen efter granskningen på add-ons.thunderbird.net; Thunderbird gör detta själv); förbättringar av kodkvalitet och utökad testtäckning.
- 2.3.1: Behåller bilagor även när Thunderbird inaktiverar händelsesidan i bakgrunden; lägger till riktade felsökningskrokar.
- 2.3.0: Förfinad deduplicering av bilagor, breddad testtäckning och borttagna föråldrade behörigheter för att uppfylla AMO:s policyer.
- 2.1.0: Fullt stöd för internationalisering för de 100 mest använda språken
- 2.0.0: omskrivning till en fullfjädrad version (EN/DE)
- 1.0.1: bytte till messages.listAttachments()
- 1.0.0: första utgåvan

---

## Datum och kanaler {#dates-and-channels}

- Släpp till ATN kan dröja några timmar efter paketering.
- LOCAL-byggen är endast avsedda för utvecklartestning och distribueras inte via ATN.

---
