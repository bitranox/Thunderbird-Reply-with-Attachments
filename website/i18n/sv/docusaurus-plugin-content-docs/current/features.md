---
id: features
title: 'Funktioner'
sidebar_label: 'Funktioner'
---

---

## Funktioner {#features}

- Bifogar automatiskt filer från det ursprungliga e-postmeddelandet när du svarar.
- Konfigurerbart beteende: bilagor kan
  - läggas till automatiskt, eller
  - läggas till först efter bekräftelse (en liten, tillgänglig dialogruta). I Alternativ kan du
    aktivera bekräftelsen och välja standardsvaret (Ja/Nej).
- Svartlista över filnamn (glob‑mönster) förhindrar att specifika filer
  bifogas automatiskt. Exempel: `*intern*`, `*secret*`, `*passwor*`.
  Matchningen är skiftlägesokänslig och kontrollerar bara filnamnet; ange ett mönster
  per rad i Alternativ.
- Varning för svartlista (valfritt, aktiverat som standard): när filer utesluts av din
  svartlista visar en liten modal filen och det/de matchande mönstret/mönstren. Kompatibel med mörkt läge
  och tangentbordsvänlig (Enter/Esc för att stänga).
- Fungerar med Svara och Svara alla. Vidarebefordra ändras inte av detta tillägg.
- Lägger till original även om du redan bifogat något själv; undviker dubbletter baserat på filnamn.
- Skydd mot dubbletter per flik förhindrar att samma sak läggs till två gånger i samma komponeringsflik.
- Hoppar över S/MIME‑certifikat som standard för att undvika onödiga bilagor.
- Inkludera inline‑bilder (standard: PÅ). Inbäddade bilder återställs direkt i
  svarstexten som base64‑data‑URI:er, vilket bevarar den ursprungliga inline‑layouten. Inaktivera i
  Alternativ för att helt hoppa över inline‑bilder.

---

## Så fungerar det {#how-it-works}

- Vid svar listar tillägget ursprungliga bilagor.
- Filtrerar bort S/MIME‑signaturer från filbilagor; inline‑bilder återställs i brödtexten (om det inte är inaktiverat).
- Frågar vid behov om bekräftelse (tangentbordsvänligt).
- Lägger till berättigade filer i ditt meddelande och undviker dubbletter baserat på filnamn.
- Se ”Varför bilagor kanske inte läggs till” i Användning för specialfall.

Integritetsnotis: All bearbetning sker lokalt i Thunderbird. Tillägget gör inga nätverksförfrågningar i bakgrunden.

---
