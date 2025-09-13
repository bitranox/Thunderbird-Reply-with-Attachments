---
id: configuration
title: 'Konfigurasjon'
---

## Konfigurasjon

Terminologinotat: se [Ordliste](glossary) for konsistente termer brukt i UI og dokumentasjon.

---

## Åpne alternativer i Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Verktøy → Utvidelser og temaer → finn “Svar med vedlegg” → Innstillinger/Alternativer

---

### Innstillinger {#settings}

#### Bekreftelse {#confirmation}

- Aktiver “Spør før vedlegg legges til”
- Standard svar: Ja eller Nei (fokus & tastaturstandard)
- Tastatur: Y/J = Ja; N/Esc = Nei; Tab/Shift+Tab og piltaster sirkulerer fokus
  - Se tastaturdetaljer i [Bruk](usage#keyboard-shortcuts).

---

#### Svarteliste (glob-mønstre) {#blacklist-glob-patterns}

Svarteliste-filer vil ikke bli lagt til automatisk ved svar. Se også [Ordliste](glossary) for “Svarteliste (Ekskluderingsliste)”.

- Ett mønster per linje; store og små bokstaver er ikke sensititve; kun filnavn matcher
- Eksempler: `*intern*`, `*secret*`, `*passwor*`
- Støttede glob-tokens: `*` (enhver karakter unntatt `/`), `?` (en karakter), karakterklasser som `[abc]`. Bruk `\[` for å matche en bokstavelig `[`. Stier (`**/`) ignoreres siden kun filnavn matches.
- Ikke støttet: negasjon (`!`), krøllmønster (`{..}`), og komplekse intervaller. Hold mønstre enkle.
- Kommentarer støttes ikke i mønstre. Ikke inkluder `#` eller inline-kommentarer; skriv kun mønsterteksten per linje.

---

##### Mønsterkokebok {#pattern-cookbook}

- Matche enhver PDF: `*.pdf`
- Matche filer som begynner med “scan”: `scan*`
- Karakterklasse: `report[0-9].txt`
- Escape en bokstavelig `[`: `\[` (nyttig når man matcher en parentes som en karakter)

---

##### Notater {#blacklist-notes}

- Relevansen betyr ikke noe; den første/hva som helst match ekskluderer filen.
- Matching er kun filnavn (stier/mapper ignoreres).
- “Tilbakestill til standard” gjenoppretter de anbefalte mønstrene og advarsel om svarteliste.
- Hvorfor eksempelet `*passwor*`? Det matcher både “password” og “Passwort” familier.
- Prioritet: hvis noe mønster matcher et filnavn, ekskluderes filen (første/hva som helst match — rekkefølge endrer ikke resultatet).
- Tips — test mønsteret ditt: legg til et midlertidig mønster, svar på en melding som inneholder en fil med et matchende navn, og bekreft at det er ekskludert i advarsellisten.

##### Raskt prøve (trygg test) {#blacklist-try-it}

1. Åpne Alternativer → Svarteliste.
2. Legg til et midlertidig mønster som `*.tmp` og klikk Lagre.
3. Svar på en testmail som har en fil som slutter med `.tmp` — filen skal vises i advarsellisten og ikke bli vedlagt.
4. Fjern det midlertidige mønsteret når du er ferdig, eller klikk “Tilbakestill til standard”.

---

#### Advarsel om ekskluderte vedlegg {#warning-on-excluded-attachments}

- Aktiver “Advarsel hvis vedlegg ekskluderes av svarteliste” (standard: PÅ).
- Når aktivert, lister en liten modal ekskluderte filer og de matchende mønstrene. Advarselen vises også når ingenting vil bli vedlagt fordi alle kandidater ble svartelistet.

---

#### Lagre innstillingene dine {#save-your-settings}

Innstillingene lagres ved å trykke på Lagre-knappen. Du kan tilbakestille individuelle felt manuelt eller tilbakestille standarder etter behov.

Hvis lagrede innstillinger ikke ser ut til å gjelde riktig, start Thunderbird på nytt og prøv igjen. (Thunderbird kan cache tilstand på tvers av økter; en omstart sikrer at friske innstillinger lastes inn.)

Tips: For å bekrefte at innstillingene dine har trådt i kraft, svar på en hvilken som helst melding med et vedlegg og sjekk bekreftelsen eller svartelisteadvarselen.

---

#### Donasjons-synlighet (90-dagers snooze) {#donation-visibility}

Utvidelsen inkluderer en bekvemmelighetsfunksjon for å skjule donasjonsforespørsel i en periode etter at du har donert.

Hvor du finner det

- Alternativer → Støtte-seksjon: du vil se en “Jeg donerte” knapp og et lite informasjonområde.
- Send-bekreftelsesdialogen viser også en Doner-knapp; den skjuler seg automatisk når snooze er aktivert.

Hvordan det fungerer

- Klikking på “Jeg donerte” skjuler donasjonsknapper og relaterte forespørsel i 90 dager.
- En statusindikator viser “Skjult til YYYY-MM-DD” (i din lokale dato). Det er også en “Vis Doner igjen” knapp for å gjenopprette synlighet umiddelbart.
- Etter 90 dager blir Doner-knappen synlig automatisk igjen.

Personvern & lagring

- Utvidelsen lagrer et enkelt tidsstempel i Thunderbirds lokale lagring for å huske snooze-perioden. Nøkkel: `donateHideUntil` (epoch millisekunder).
- Denne innstillingen er lokal for din Thunderbird-profil (ikke synkronisert til skyen). Ingen nettverksforespørsel blir gjort av denne funksjonen.

Feilsøking

- Hvis Doner fortsatt vises rett etter å ha klikket “Jeg donerte”, vent et øyeblikk eller gjenåpne Alternativer-siden; UI oppdateres så snart innstillingen er lagret.
- For å tilbakestille manuelt, klikk “Vis Doner igjen”. Du kan også vente til datoen som er oppført i informasjonen forbigås.

Denne funksjonen er utelukkende for bekvemmelighet; den blokkerer aldri utvidelsesfunksjonalitet og innhenter ikke noen personlig data.

---

### Filnavn normalisering (forebygge duplikater) {#filename-normalization-duplicates-prevention}

For å oppføre seg konsekvent på tvers av plattformer, blir filnavn normalisert før duplikatkontroller:

- Unicode er normalisert til NFC.
- Navn er samsvarende (gjøres små bokstaver).
- Trailing prikker/rom blir trimmet (Windows-vennlighet).

Dette holder duplikatdeteksjon forutsigbar for navn som `café.pdf` vs `café.pdf` (NFD) eller `FILE.txt.` vs `file.txt`.

---

## Bekreftelsesatferd {#confirmation-behavior}

- “Standard svar” setter den initialt fokuserte knappen i bekreftelsesdialogen (nyttig for tastaturbrukere).
- Fungerer for både “Svar” og “Svar alle”. “Viderebefordre” modifiseres ikke av denne utvidelsen.

---

## Avansert: duplikatdeteksjon {#advanced-duplicate-detection}

Duplikatforebygging er implementert per komponeringsfane og etter filnavn. Se [Bruk](usage#behavior-details) for en detaljert forklaring.

---

Se også

- [Tillatelser](permissions)
- [Personvern](privacy)
