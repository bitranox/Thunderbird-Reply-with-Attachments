---
id: features
title: Funksjoner
sidebar_label: Funksjoner
---

## Funksjoner

- Legger automatisk ved filer fra den opprinnelige e‑posten når du svarer.
- Konfigurerbar oppførsel: vedlegg kan
  - legges til automatisk, eller
  - legges til først etter bekreftelse (en liten, tilgjengelig dialog). I Alternativer kan du aktivere bekreftelse og velge standardrespons (Ja/Nei).
- Svarteliste for filnavn (glob‑mønstre) hindrer at visse filer legges ved automatisk. Eksempler: `*intern*`, `*secret*`, `*passwor*`.
  Samsvar er ikke versalfølsomt og sjekker bare filnavnet; oppgi ett mønster per linje i Alternativer.
- Svarteliste‑varsel (valgfritt, aktivert som standard): når filer utelukkes av svartelisten din, viser et lite modalvindu filen og samsvarende mønstre. Mørk modus‑vennlig og tilgjengelig via tastatur (Enter/Esc for å lukke).
- Legger til originalene selv om du allerede har vedlagt noe; unngår duplikater basert på filnavn.
- Hopper over SMIME‑sertifikater og innebygde bilder for å unngå unødvendige vedlegg.
