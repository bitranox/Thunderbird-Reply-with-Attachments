---
id: features
title: Funktioner
sidebar_label: Funktioner
---

## Funktioner

- Lägger automatiskt till filer från originalmeddelandet när du svarar.
- Konfigurerbart beteende: bilagor kan
  - läggas till automatiskt, eller
  - läggas till först efter bekräftelse (ett litet, tillgängligt dialogfönster). I Alternativ kan du aktivera bekräftelse och välja standardsvar (Ja/Nej).
- Svartlista för filnamn (glob‑mönster) förhindrar att vissa filer läggs till automatiskt. Exempel: `*intern*`, `*secret*`, `*passwor*`.
  Matchningen är skiftlägesokänslig och kontrollerar endast filnamnet; ange ett mönster per rad i Alternativ.
- Varning för svartlista (valfritt, aktiverat som standard): när filer utesluts av din svartlista visar ett litet modal-fönster filen och matchande mönster. Mörkt läge‑vänligt och tangentbordsåtkomligt (Enter/Esc för att stänga).
- Lägger till original även om du redan har bifogat något själv; undviker dubbletter baserat på filnamn.
- Hoppar över SMIME‑certifikat och inline‑bilder för att undvika onödiga bilagor.
