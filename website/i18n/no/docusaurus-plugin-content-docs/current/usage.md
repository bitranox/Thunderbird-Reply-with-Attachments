---
id: usage
title: 'Bruk'
sidebar_label: 'Bruk'
---

## Bruk {#usage}

- Svar, og tilleggskomponenten legger til originaler automatisk – eller spør først, hvis aktivert i Alternativer.
- Dedupliseres etter filnavn; S/MIME og innbakte bilder blir alltid utelatt.
- Svarteliste-filer blir også utelatt (store bokstaver/ små bokstaver og glob-mønstre som samsvarer med filnavn, ikke stier). Se [Konfigurasjon](configuration#blacklist-glob-patterns).

---

### Hva skjer ved svar {#what-happens}

- Oppdag svar → list originale vedlegg → filtrer S/MIME + innbakte → valgfrie bekreftelser → legg til kvalifiserte filer (hopp over duplikater).

Streng vs. avslappet pass: Tillegget utelukker først S/MIME og innbakte deler. Hvis ingenting kvalifiserer, kjører det et avslappet pass som fortsatt utelukker S/MIME/innbakte men tolererer flere tilfeller (se Kodedetaljer).

| Deltype                                          |    Streng pass | Avslappet pass |
| ------------------------------------------------ | -------------: | -------------: |
| S/MIME signaturfil `smime.p7s`                   |   Utekskludert |   Utekskludert |
| S/MIME MIME-typer (`application/pkcs7-*`)        |   Utekskludert |   Utekskludert |
| Innbakt bilde referert av Content‑ID (`image/*`) |   Utekskludert |   Utekskludert |
| Vedlagt e-post (`message/rfc822`) med et filnavn |  Ikke lagt til | Kan legges til |
| Vanlig filvedlegg med et filnavn                 | Kan legges til | Kan legges til |

Eksempel: Noen vedlegg kan mangle visse overskrifter, men er fortsatt vanlige filer (ikke innbakte/S/MIME). Hvis det strenge passet ikke finner noen, kan det avslappede passet akseptere disse og legge dem ved.

---

### Kryssreferanse {#cross-reference}

- Videresendelse endres ikke med vilje (se Begrensninger nedenfor).
- For årsaker til at vedlegg ikke kan legges til, se “Hvorfor vedlegg kanskje ikke legges til”.

---

## Atferdsdetaljer {#behavior-details}

- **Unngåelse av duplikater:** Tillegget merker komposeringsfaner som behandlet ved hjelp av en fanespesifikk sesjonsverdi og en minnebeskyttelse. Det vil ikke legge til originaler to ganger.
- Å lukke og åpne et komponeringsvindu igjen behandles som en ny fane (dvs. et nytt forsøk er tillatt).
- **Respektere eksisterende vedlegg:** Hvis komposisjonen allerede inneholder noen vedlegg, legges originaler fortsatt til nøyaktig én gang, og hopper over filnavn som allerede eksisterer.
- **Utelukkelser:** S/MIME-artikler og innbakte bilder ignoreres. Hvis ingenting kvalifiserer ved første pass, sjekker et avslappet alternativ ikke-S/MIME-deler på nytt.
  - **Filnavn:** `smime.p7s`
  - **MIME-typer:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Innbakte bilder:** ethvert `image/*`-del referert av Content‑ID i meldingsinnholdet
  - **Vedlagte e-poster (`message/rfc822`):** behandles som vanlige vedlegg hvis de har et filnavn; de kan legges til (underlagt duplikatkontroller og svarteliste).
- **Svartelistevarsel (hvis aktivert):** Når kandidater ekskluderes av svartelisten din, viser tillegget en liten modal som lister opp berørte filer og de samsvarende mønstrene. Dette varslet vises også i tilfeller der ingen vedlegg vil bli lagt til, fordi alt ble ekskludert.

---

## Tastatursnarveier {#keyboard-shortcuts}

- Bekreftelsesdialog: Y/J = Ja, N/Esc = Nei; Tab/Shift+Tab og piltaster bytter fokus.
  - Den “Standard svaret” i [Konfigurasjon](configuration#confirmation) setter den initialt fokuserte knappen.
  - Enter utløser den fokuserte knappen. Tab/Shift+Tab og piltaster flytter fokus for tilgjengelighet.

### Tastatur Fuskark {#keyboard-cheat-sheet}

| Taster          | Handling                             |
| --------------- | ------------------------------------ |
| Y / J           | Bekreft Ja                           |
| N / Esc         | Bekreft Nei                          |
| Enter           | Aktiver fokusert knapp               |
| Tab / Shift+Tab | Flytt fokus fremover/bakover         |
| Piltaster       | Flytt fokus mellom knapper           |
| Standard svar   | Setter initialt fokus (Ja eller Nei) |

---

## Begrensninger {#limitations}

- Videresendelse endres ikke av dette tillegget (Svar og Svar til alle støttes).
- Svært store vedlegg kan være gjenstand for Thunderbird- eller leverandørgrenser.
  - Tillegget deler ikke eller komprimerer filer; det er avhengig av Thunderbirds normale håndtering av vedlegg.
- Krypterte meldinger: S/MIME-deler utelukkes med vilje.

---

## Hvorfor vedlegg kanskje ikke legges til {#why-attachments-might-not-be-added}

- Innbakte bilder ignoreres: deler referert via Content‑ID i meldingsinnholdet legges ikke til som filer.
- S/MIME signaturdeler utelukkes med vilje: filnavn som `smime.p7s` og MIME-typer som `application/pkcs7-signature` eller `application/pkcs7-mime` hoppes over.
- Svartelistemønstre kan filtrere kandidater: se [Konfigurasjon](configuration#blacklist-glob-patterns); samsvar er store/små bokstaver insensitive og bare filnavn.
- Dupliserte filnavn legges ikke til på nytt: hvis komposisjonen allerede inneholder en fil med det samme normaliserte navnet, hoppes den over.
- Ikke-fil deler eller manglende filnavn: kun fil-lignende deler med brukbare filnavn vurderes for legging til.

---

Se også

- [Konfigurasjon](configuration)
