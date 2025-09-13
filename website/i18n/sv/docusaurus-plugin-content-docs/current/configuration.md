---
id: configuration
title: 'Konfiguration'
---

## Konfiguration

Terminologi anmärkning: se [Glossar](glossary) för konsekventa termer som används i UI och dokument.

---

## Öppna alternativ i Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Verktyg → Tillägg och teman → hitta “Svara med bilagor” → Inställningar/Alternativ

---

### Inställningar {#settings}

#### Bekräftelse {#confirmation}

- Växla “Fråga innan bilagor läggs till”
- Standardsvar: Ja eller Nej (fokus & tangentbordsstandard)
- Tangentbord: Y/J = Ja; N/Esc = Nej; Tab/Shift+Tab och piltangenter cyklar fokus
  - Se tangentbordsdetaljer i [Användning](usage#keyboard-shortcuts).

---

#### Svartlista (globmönster) {#blacklist-glob-patterns}

Svartlistade filer läggs inte automatiskt till i svaret. Se även [Glossar](glossary) för “Svartlista (Uteslutningslista)”.

- Ett mönster per rad; skiftlägesokänslig; matchning av endast filnamn
- Exempel: `*intern*`, `*secret*`, `*passwor*`
- Stödda globtangenter: `*` (alla tecken utom `/`), `?` (ett tecken), teckenkategorier som `[abc]`. Använd `\[` för att matcha en bokstavlig `[`. Sökvägar (`**/`) ignoreras eftersom endast filnamn matchas.
- Ej stödt: negation (`!`), klamrar expansion (`{..}`), och komplexa intervall. Håll mönster enkla.
- Kommentarer stöds inte i mönster. Inkludera inte `#` eller inline-kommentarer; ange endast mönstret per rad.

---

##### Mönsterkökbok {#pattern-cookbook}

- Matcha vilken PDF som helst: `*.pdf`
- Matcha filer som börjar med “scan”: `scan*`
- Teckenkategori: `report[0-9].txt`
- Escape en bokstavlig `[`: `\[` (användbart när du matchar en parentes som ett tecken)

---

##### Anmärkningar {#blacklist-notes}

- Ordningen spelar ingen roll; den första/eventuella matchningen utesluter filen.
- Matchning är endast av filnamn (sökvägar/mappar ignoreras).
- “Återställ till standard” återställer de rekommenderade mönstren och växlingsvarningen för svartlistan.
- Varför exemplet `*passwor*`? Det matchar både “password” och “Passwort” familjer.
- Prioritet: om något mönster matchar ett filnamn, utesluts filen (första/eventuella match — ordningen ändrar inte resultatet).
- Tips — testa ditt mönster: lägg till ett tillfälligt mönster, svara på ett meddelande som innehåller en fil med ett matchande namn, och bekräfta att det utesluts i varningslistan.

##### Snabbt prova (säkert test) {#blacklist-try-it}

1. Öppna Alternativ → Svartlista.
2. Lägg till ett tillfälligt mönster som `*.tmp` och klicka på Spara.
3. Svara på ett testmail som har en fil som slutar med `.tmp` — filen ska visas i varningslistan och inte bifogas.
4. Ta bort det tillfälliga mönstret när du är klar, eller klicka på “Återställ till standard”.

---

#### Varning om uteslutna bilagor {#warning-on-excluded-attachments}

- Växla “Varna om bilagor utesluts av svartlistan” (standard: PÅ).
- När den är aktiverad, listar en liten modal uteslutna filer och matchande mönster. Varningen visas också när ingenting kommer att bifogas eftersom alla kandidater har
  svartlistats.

---

#### Spara dina inställningar {#save-your-settings}

Inställningar sparas genom att trycka på Spara-knappen. Du kan återställa individuella fält manuellt eller återställa standardinställningarna vid behov.

Om lagrade inställningar verkar inte tillämpas korrekt, starta om Thunderbird och försök igen. (Thunderbird kan cachelagra tillstånd över sessioner; en omstart säkerställer att färska inställningar laddas.)

Tips: För att bekräfta att dina inställningar har trätt i kraft, svara på ett meddelande med en bilaga och kontrollera bekräftelsen eller varningen för svartlistan.

---

#### Donationssynlighet (90-dagars snooze) {#donation-visibility}

Tillägget innehåller en bekvämlighetsfunktion för att dölja donationsfrågor ett tag efter att du har donerat.

Var du hittar det

- Alternativ → Stödavsnitt: du kommer att se en “Jag donerade” knapp och ett litet tipsområde.
- Dialogrutan för skicka-bekräftelse visar också en Donera-knapp; den döljs automatiskt när snooze är aktiv.

Hur det fungerar

- När du klickar på “Jag donerade” döljs donationsknappar och relaterade frågor i 90 dagar.
- En statusindikator visar “Dold tills YYYY-MM-DD” (i ditt lokala datum). Det finns också en “Visa Donera igen”-knapp för att återställa synlighet omedelbart.
- Efter 90 dagar blir Donera-knappen synlig automatiskt igen.

Integritet och lagring

- Tillägget lagrar en enda tidsstämpel i Thunderbirds lokala lagring för att komma ihåg snooze-perioden. Nyckel: `donateHideUntil` (epoch millisekunder).
- Denna inställning är lokal för din Thunderbird-profil (inte moln-synkroniserad). Inga nätverksförfrågningar görs av denna funktion.

Felsökning

- Om Donera fortfarande visas direkt efter att du klickar på “Jag donerade”, vänta ett ögonblick eller återöppna sidan för Alternativ; användargränssnittet uppdateras så snart inställningen sparas.
- För att återställa manuellt, klicka på “Visa Donera igen”. Du kan också vänta tills det datum som anges i tipset har passerat.

Denna funktion är endast för bekvämlighet; den blockerar aldrig tilläggsfunktionalitet och samlar inte in några personuppgifter.

---

### Normalisering av filnamn (förebyggande av dubbletter) {#filename-normalization-duplicates-prevention}

För att fungera konsekvent över plattformar normaliseras filnamn innan dubblettkontroller:

- Unicode normaliseras till NFC.
- Namn görs skiftlägesanpassade (små bokstäver).
- Avskurna punkter/rymd trimmas (Windows-vänlighet).

Detta håller dubblettdetektering förutsägbar för namn som `café.pdf` vs `café.pdf` (NFD) eller `FILE.txt.` vs `file.txt`.

---

## Bekräftelsebeteende {#confirmation-behavior}

- “Standardsvar” ställer in den initialt fokuserade knappen i bekräftelsedialogrutan (nyttigt för tangentbordsanvändare).
- Fungerar för både “Svara” och “Svara alla”. “Vidarebefordra” modifieras inte av detta tillägg.

---

## Avancerat: dubblettdetektering {#advanced-duplicate-detection}

Förhindrande av dubbletter implementeras per kompositionsflik och efter filnamn. Se [Användning](usage#behavior-details) för en detaljerad förklaring.

---

Se även

- [Behörigheter](permissions)
- [Integritet](privacy)
