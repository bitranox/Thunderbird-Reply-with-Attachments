---
id: features
title: 'Funksjoner'
sidebar_label: 'Funksjoner'
---

---

## Funksjoner {#features}

- Legger automatisk ved filer fra den opprinnelige e-posten når du svarer.
- Konfigurerbar oppførsel: vedlegg kan
  - legges til automatisk, eller
  - legges til først etter bekreftelse (en liten, tilgjengelig dialog). I Innstillinger
    kan du aktivere bekreftelsen og velge standardsvaret (Ja/Nei).
- Svarteliste for filnavn (glob-mønstre) hindrer at bestemte filer
  legges ved automatisk. Eksempler: `*intern*`, `*secret*`, `*passwor*`.
  Matchingen skiller ikke mellom store og små bokstaver og sjekker bare filnavnet; oppgi ett mønster
  per linje i Innstillinger.
- Svartelistevarsel (valgfritt, aktivert som standard): når filer ekskluderes av
  svartelisten din, viser et lite modalvindu filen og det/de samsvarende mønstrene. Mørk‑modus
  vennlig og tastaturtilgjengelig (Enter/Esc for å lukke).
- Fungerer med Svar og Svar til alle. Videresend påvirkes ikke av dette tillegget.
- Legger til originaler selv om du allerede har lagt ved noe; unngår duplikater etter filnavn.
- Beskyttelse mot duplikater per fane hindrer dobbelt-tillegg i samme komponeringsfane.
- Hopper over S/MIME-sertifikater som standard for å unngå unødvendige vedlegg.
- Inkluderer innebygde bilder (standard: PÅ). Innebygde bilder gjenopprettes direkte i
  svarmeldingen som base64 data-URI-er, og bevarer den opprinnelige inline-layouten. Deaktiver i
  Innstillinger for å hoppe over innebygde bilder helt.

---

## Slik fungerer det {#how-it-works}

- Når du svarer, lister tillegget opp de opprinnelige vedleggene.
- Filtrerer ut S/MIME-signaturer fra filvedlegg; innebygde bilder gjenopprettes i meldingskroppen (med mindre deaktivert).
- Kan valgfritt be om bekreftelse (tastaturvennlig).
- Legger til aktuelle filer i skrivevinduet, og unngår duplikater etter filnavn.
- Se «Hvorfor vedlegg kanskje ikke blir lagt til» under Bruk for særtilfeller.

Merknad om personvern: All behandling skjer lokalt i Thunderbird. Tillegget gjør ingen nettverksforespørsler i bakgrunnen.

---
