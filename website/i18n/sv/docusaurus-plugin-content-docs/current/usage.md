---
id: usage
title: 'Användning'
sidebar_label: 'Användning'
---

---

## Användning {#usage}

- Vid Svara lägger tillägget till originalbilagor automatiskt — eller frågar först, om aktiverat i Alternativ.
- Dubbletter tas bort baserat på filnamn; S/MIME-delar hoppas alltid över. Bilder som är inbäddade i det ursprungliga meddelandet stannar kvar i svarets brödtext, där Thunderbird placerar dem, och kopieras inte som filer.
- Bilagor på svartlistan hoppas också över (skiftlägesokänsliga glob‑mönster som matchar filnamn, inte sökvägar). Se [Konfiguration](configuration#blacklist-glob-patterns).

---

### Vad händer vid svar {#what-happens}

- Upptäck svar → lista de ursprungliga bilagorna → hoppa över S/MIME och inbäddade bilder → valfri bekräftelse → lägg till de kvalificerade filerna (och hoppa över dubbletter).

| Deltyp                                                     | Kopieras till svaret         |
|------------------------------------------------------------|-----------------------------:|
| S/MIME-signaturfil `smime.p7s`                             | Nej                          |
| S/MIME MIME-typer (`application/pkcs7-*`)                  | Nej                          |
| Bild som meddelandetexten bäddar in via `cid:`             | Nej (den finns i brödtexten) |
| Bild märkt `Content-Disposition: inline`                   | Nej (den finns i brödtexten) |
| Bild med `Content-ID` som brödtexten aldrig refererar till | Ja                           |
| Bifogat e-postmeddelande (`message/rfc822`) med filnamn    | Ja                           |
| Vanlig filbilaga med filnamn                               | Ja                           |

En bild räknas som inbäddad endast när det ursprungliga meddelandet faktiskt refererar
till den, eller när avsändaren uttryckligen har märkt den `Content-Disposition: inline`.
Enbart en `Content-ID`-header räcker inte: flera e-postklienter sätter en sådan på varje
bilddel, inklusive äkta bilagor, som ändå måste kopieras.

---

### Korshänvisning {#cross-reference}

- Vidarebefordra ändras inte enligt design (se Begränsningar nedan).
- För orsaker till att en bilaga kanske inte läggs till, se ”Varför bilagor kanske inte läggs till”.

---

## Detaljer om beteende {#behavior-details}

- Dubblettskydd: Tillägget markerar skrivfliken som behandlad med ett sessionsvärde per flik och ett skydd i minnet. Det lägger inte till originalen två gånger.
- Att stänga och återöppna ett skrivfönster behandlas som en ny flik (dvs. ett nytt försök tillåts).
- Respekt för befintliga bilagor: Om skrivfönstret redan innehåller bilagor läggs original fortfarande till exakt en gång, och filnamn som redan finns hoppas över.
- Undantag: S/MIME‑artefakter och inline‑bilder undantas från filbilagor. Om inget kvalificerar i första genomgången görs ett mer tillåtande omtag som kontrollerar icke‑S/MIME‑delar igen. Inline‑bilder hanteras separat: de återställs i svarstexten som data‑URI:er (när aktiverat).
  - Filnamn: `smime.p7s`
  - MIME‑typer: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline‑bilder: alla `image/*`‑delar som refereras via Content‑ID — undantas från filbilagor men bäddas in i svarstexten när "Include inline pictures" är PÅ
  - Bifogade e‑postmeddelanden (`message/rfc822`): behandlas som vanliga bilagor om de har ett filnamn; de kan läggas till (med förbehåll för dubblettkontroll och svartlista).
- Svartlistningsvarning (om aktiverad): När kandidater utesluts av din svartlista,
  visar tillägget en liten modal som listar de berörda filerna och de matchande
  mönstren. Denna varning visas också i fall där inga bilagor kommer att
  läggas till eftersom allt uteslöts.

---

## Tangentbordsgenvägar {#keyboard-shortcuts}

- Bekräftelsedialog: Y/J = Ja, N/Esc = Nej; Tab/Skift+Tab och piltangenterna cirkulerar fokus.
  - ”Default answer” i [Konfiguration](configuration#confirmation) anger vilken knapp som har initialt fokus.
  - Enter aktiverar den fokuserade knappen. Tab/Skift+Tab och pilar flyttar fokus för tillgänglighet.

### Fusklapp för tangentbordet {#keyboard-cheat-sheet}

| Tangenter       | Åtgärd                               |
|-----------------|--------------------------------------|
| Y / J           | Bekräfta Ja                          |
| N / Esc         | Bekräfta Nej                         |
| Enter           | Aktivera fokuserad knapp             |
| Tab / Shift+Tab | Flytta fokus framåt/bakåt            |
| Piltangenter    | Flytta fokus mellan knappar          |
| Default answer  | Sätter initialt fokus (Ja eller Nej) |

---

## Begränsningar {#limitations}

- Vidarebefordra ändras inte av detta tillägg (Svara och Svara alla stöds).
- Mycket stora bilagor kan omfattas av begränsningar i Thunderbird eller hos leverantören.
  - Tillägget delar inte upp eller komprimerar filer; det förlitar sig på Thunderbirds vanliga bilagehantering.
- Krypterade meddelanden: S/MIME‑delar utesluts avsiktligt.

---

## Varför bilagor kanske inte läggs till {#why-attachments-might-not-be-added}

- Bilder som originalmeddelandet bäddar in kopieras inte som filer. De finns redan i svarets brödtext, där Thunderbird placerade dem. Se [Configuration](configuration#include-inline-pictures).
- S/MIME‑signaturdelar utesluts enligt design: filnamn som `smime.p7s` och MIME‑typer som `application/pkcs7-signature` eller `application/pkcs7-mime` hoppas över.
- Svartlistningsmönster kan filtrera kandidater: se [Konfiguration](configuration#blacklist-glob-patterns); matchning är skiftlägesokänslig och endast på filnamn.
- Dubblettfilnamn läggs inte till igen: om skrivfönstret redan innehåller en fil med samma normaliserade namn hoppas den över.
- Icke‑fil‑delar eller saknade filnamn: endast filliknande delar med användbara filnamn övervägs för tillägg.

---

Se även

- [Konfiguration](configuration)
