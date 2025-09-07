---
id: features
title: Funktioner
sidebar_label: Funktioner
---

## Funktioner

- Ved svar vedhæftes filer fra den oprindelige e‑mail automatisk.
- Konfigurerbar adfærd: vedhæftede filer kan
  - tilføjes automatisk, eller
  - kun tilføjes efter bekræftelse (en lille, tilgængelig dialog). I Indstillinger kan du aktivere bekræftelse og vælge standardsvar (Ja/Nej).
- Sortliste over filnavne (glob‑mønstre) forhindrer, at bestemte filer vedhæftes automatisk. Eksempler: `*intern*`, `*secret*`, `*passwor*`.
  Matchning er ikke versalfølsom og tjekker kun filnavnet; angiv ét mønster pr. linje i Indstillinger.
- Sortliste‑advarsel (valgfrit, aktiveret som standard): når filer udelukkes af din sortliste, viser et lille modal vindue filen og de matchende mønstre. Understøtter mørk tilstand og er tilgængelig via tastatur (Enter/Esc for at lukke).
- Tilføjer de originale vedhæftninger, selv hvis du allerede har vedhæftet noget; undgår dubletter efter filnavn.
- Springer SMIME‑certifikater og inline‑billeder over for at undgå unødvendige vedhæftninger.
