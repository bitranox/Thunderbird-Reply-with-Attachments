---
id: features
title: 'Funktioner'
sidebar_label: 'Funktioner'
---

---

## Funktioner {#features}

- Inbäddade bilder lämnas åt Thunderbird: de stannar kvar i svarets brödtext och kopieras inte som filbilagor. En bild som bara har en `Content-ID` utan att refereras behandlas som en vanlig bilaga och kopieras.

---

## Så fungerar det {#how-it-works}

- Vid svar listar tillägget ursprungliga bilagor.
- Filtrerar bort S/MIME‑signaturer från filbilagor; inline‑bilder återställs i brödtexten (om det inte är inaktiverat).
- Frågar vid behov om bekräftelse (tangentbordsvänligt).
- Lägger till berättigade filer i ditt meddelande och undviker dubbletter baserat på filnamn.
- Se ”Varför bilagor kanske inte läggs till” i Användning för specialfall.

Integritetsnotis: All bearbetning sker lokalt i Thunderbird. Tillägget gör inga nätverksförfrågningar i bakgrunden.

---
