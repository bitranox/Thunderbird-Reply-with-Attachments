---
id: support
title: 'Støtte'
sidebar_label: 'Støtte'
---

## FAQ {#faq}

### Vedlegg ble ikke lagt til — hvorfor?

- Inline bilder og S/MIME-deler er med vilje ekskludert.
- Duplikatfilnavn blir hoppet over hvis komposisjonen allerede har den samme filen.
- Svarteliste mønstre kan filtrere kandidater; se [Konfigurasjon](configuration#blacklist-glob-patterns).

### Kan jeg bekrefte før jeg legger til vedlegg?

Ja. Aktiver "Spør før du legger til vedlegg" under [Konfigurasjon → Bekreftelse](configuration#confirmation). Tastatur: Y/J = Ja, N/Esc = Nei.

### Sender tillegget noen data eller sporer bruken?

Nei. Se [Personvern](privacy) — ingen telemetri og ingen bakgrunnsnettverksforespørsel.

### Viderebefordring legger ikke til vedlegg — er det forventet?

Ja. Bare Svar og Svar alle blir endret av dette tillegget; Viderebefordring forblir uforandret. Se [Begrensninger](usage#limitations).

### Hvor er Doner-utsettelsen?

Alternativer → Støtte-seksjon. Se [Synlighet for donasjoner](configuration#donation-visibility).

---

## Støtte

Trenger du hjelp eller ønsker å rapportere en feil?

---

### Åpne en sak på GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Saker: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Inkluder Thunderbird-versjonen (f.eks. 128 ESR), OS, og trinn for å reprodusere
- Legg ved relevante logger fra Thunderbird’s Feilkonsoll (Verktøy → Utviklerverktøy → Feilkonsoll)

- Tilleggsnettsted (ATN): Du kan også gi tilbakemelding via [tilleggssiden](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Sørg for at du er på en støttet Thunderbird-versjon (128 ESR eller nyere).
- Sjekk konfigurasjon og bruksdokumenter for vanlige oppsetts spørsmål.
- For utvikling/testing, se utviklingsguiden.
- Hvis lagrede innstillinger ser ut til å ikke gjelde skikkelig, start Thunderbird på nytt og prøv igjen. (Thunderbird kan cache tilstand på tvers av økter; en omstart sikrer at friske innstillinger lastes.)
- Minimal reproduksjon: prøv med en liten testmail som inneholder ett eller to enkle filvedlegg.
- Sammenlign atferd med bekreftelse PÅ vs. AV for å snevre inn om dialogflyten er involvert.

---

### Hva som bør inkluderes i en rapport

- Thunderbird-versjon og OS
- Eksakte trinn for å reprodusere (hva du gjorde, hva du forventet, hva som skjedde)
- Om bekreftelse var aktivert og standard svaret var
- Et eksempel på svarteliste-mønstrene dine (hvis relevant)
- Logger fra Feilkonsollen mens du reproduserer (Verktøy → Utviklerverktøy → Feilkonsoll)
- Aktiver feilsøkingslogg (valgfritt):
  - Kjør i Thunderbird’s Feilkonsoll: `messenger.storage.local.set({ debug: true })`
  - Reproduser problemet og kopier relevante `[RWA]` logglinjer

---

### Problemskjema (kopier/lim inn) {#issue-template}

- Thunderbird-versjon og OS:
- Trinn for å reprodusere:
- Bekreftelse aktivert? Standard svar:
- Eksempel svarteliste-mønstre:
- Logger fra Feilkonsollen (Verktøy → Utviklerverktøy → Feilkonsoll):
- Noe annet relevant:

---

### Doner

Hvis du vil støtte dette prosjektet, vurder gjerne et lite bidrag på [Doner](donation) siden. Takk!
