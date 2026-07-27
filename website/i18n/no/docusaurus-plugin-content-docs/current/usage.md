---
id: usage
title: 'Bruk'
sidebar_label: 'Bruk'
---

---

## Bruk {#usage}

- Svar, og tillegget legger til originalene automatisk — eller spør først, hvis aktivert i Alternativer.
- Duplikater fjernes basert på filnavn; S/MIME-deler blir alltid hoppet over. Bilder som er innebygd i den opprinnelige meldingen, blir værende i svarets brødtekst, der Thunderbird plasserer dem, og kopieres ikke som filer.
- Svartelistede vedlegg hoppes også over (skiller ikke mellom store og små bokstaver; glob‑mønstre som matcher filnavn, ikke stier). Se [Konfigurasjon](configuration#blacklist-glob-patterns).

---

### Hva som skjer ved svar {#what-happens}

- Oppdag svar → list opp de opprinnelige vedleggene → hopp over S/MIME og innebygde bilder → valgfri bekreftelse → legg til de kvalifiserte filene (hopper over duplikater).

| Deltype                                                   | Kopiert til svaret         |
|-----------------------------------------------------------|---------------------------:|
| S/MIME-signaturfil `smime.p7s`                            | Nei                        |
| S/MIME MIME-typer (`application/pkcs7-*`)                 | Nei                        |
| Bilde meldingsteksten bygger inn via `cid:`               | Nei (det er i brødteksten) |
| Bilde merket `Content-Disposition: inline`                | Nei (det er i brødteksten) |
| Bilde med en `Content-ID` som teksten aldri refererer til | Ja                         |
| Vedlagt e-post (`message/rfc822`) med et filnavn          | Ja                         |
| Vanlig filvedlegg med et filnavn                          | Ja                         |

Et bilde regnes som innebygd bare når den opprinnelige meldingen faktisk refererer til det, eller når avsenderen
uttrykkelig har merket det `Content-Disposition: inline`. En bar `Content-ID`-header er ikke nok: flere e-postklienter
setter en slik på hver bildedel, inkludert ekte vedlegg, og disse må fortsatt kopieres.

---

### Kryssreferanse {#cross-reference}

- Videresending endres ikke av design (se Begrensninger nedenfor).
- For årsaker til at et vedlegg kanskje ikke blir lagt til, se «Hvorfor vedlegg kanskje ikke blir lagt til».

---

## Atferdsdetaljer {#behavior-details}

- **Hindre duplikater:** Tillegget markerer skrivefanen som behandlet ved å bruke en øktverdi per fane og en minnebasert sperre. Det vil ikke legge til originaler to ganger.
- Å lukke og åpne et skrivevindu på nytt behandles som en ny fane (dvs. et nytt forsøk er tillatt).
- **Respekter eksisterende vedlegg:** Hvis skrivevinduet allerede inneholder noen vedlegg, blir originalene likevel lagt til nøyaktig én gang, og filnavn som allerede finnes hoppes over.
- **Ekskluderinger:** S/MIME‑artefakter og inline‑bilder er ekskludert fra filvedlegg. Hvis ingenting kvalifiserer ved første gjennomgang, kontrollerer en avslappet reserve på nytt ikke‑S/MIME‑deler. Inline‑bilder håndteres separat: de gjenopprettes i svarteksten som data‑URIer (når aktivert).
  - **Filnavn:** `smime.p7s`
  - **MIME‑typer:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline‑bilder:** enhver `image/*`‑del referert av Content‑ID — ekskluderes fra filvedlegg, men bygges inn i svarteksten når "Include inline pictures" er PÅ
  - **Vedlagte e‑poster (`message/rfc822`):** behandles som vanlige vedlegg hvis de har et filnavn; de kan bli lagt til (med forbehold om duplikatkontroller og svarteliste).
- **Advarsel om svarteliste (hvis aktivert):** Når kandidater ekskluderes av svartelisten din, viser tillegget et lite modalvindu som lister opp de berørte filene og de samsvarende mønstrene. Denne advarselen vises også i tilfeller der ingen vedlegg vil bli lagt til fordi alt ble ekskludert.

---

## Tastatursnarveier {#keyboard-shortcuts}

- Bekreftelsesdialog: Y/J = Ja, N/Esc = Nei; Tab/Shift+Tab og piltaster flytter fokus.
  - «Standardsvar» i [Konfigurasjon](configuration#confirmation) angir hvilken knapp som har fokus først.
  - Enter aktiverer knappen med fokus. Tab/Shift+Tab og piltaster flytter fokus for tilgjengelighet.

### Hurtigreferanse for tastatur {#keyboard-cheat-sheet}

| Taster          | Handling                         |
|-----------------|----------------------------------|
| Y / J           | Bekreft Ja                       |
| N / Esc         | Bekreft Nei                      |
| Enter           | Aktiver fokusert knapp           |
| Tab / Shift+Tab | Flytt fokus frem/tilbake         |
| Piltaster       | Flytt fokus mellom knapper       |
| Standardsvar    | Setter startfokus (Ja eller Nei) |

---

## Begrensninger {#limitations}

- Videresending endres ikke av dette tillegget (Svar og Svar alle støttes).
- Svært store vedlegg kan være underlagt begrensninger i Thunderbird eller hos leverandøren.
  - Tillegget deler ikke opp eller komprimerer filer; det baserer seg på Thunderbirds vanlige vedleggshåndtering.
- Krypterte meldinger: S/MIME‑deler er bevisst ekskludert.

---

## Hvorfor vedlegg kanskje ikke blir lagt til {#why-attachments-might-not-be-added}

- Bilder som den opprinnelige meldingen bygger inn, kopieres ikke som filer. De er allerede i svarets brødtekst, der Thunderbird har plassert dem. Se [Configuration](configuration#include-inline-pictures).
- S/MIME‑signaturdeler er ekskludert etter hensikt: filnavn som `smime.p7s` og MIME‑typer som `application/pkcs7-signature` eller `application/pkcs7-mime` hoppes over.
- Svartelistemønstre kan filtrere kandidater: se [Konfigurasjon](configuration#blacklist-glob-patterns); samsvar skiller ikke mellom store og små bokstaver og gjelder kun filnavn.
- Dupliserte filnavn legges ikke til på nytt: hvis skrivevinduet allerede inneholder en fil med samme normaliserte navn, hoppes den over.
- Ikke‑fil‑deler eller manglende filnavn: bare fil‑lignende deler med brukbare filnavn vurderes for tillegg.

---

Se også

- [Konfigurasjon](configuration)
