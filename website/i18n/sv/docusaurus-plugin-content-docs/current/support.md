---
id: support
title: 'Supporta'
sidebar_label: 'Supporta'
---

## FAQ {#faq}

### Bilagor lades inte till — varför?

- Inline-bilder och S/MIME-delar utesluts avsiktligt.
- Dubblettfilnamn hoppar över om kompositionen redan har samma fil.
- Svartlistade mönster kan filtrera kandidater; se [Konfiguration](configuration#blacklist-glob-patterns).

### Kan jag bekräfta innan jag lägger till bilagor?

Ja. Aktivera “Fråga innan bilagor läggs till” under [Konfiguration → Bekräftelse](configuration#confirmation). Tangentbord: Y/J = Ja, N/Esc = Nej.

### Skickar tilläggsprogrammet någon data eller spårar användning?

Nej. Se [Integritet](privacy) — ingen telemetri och inga bakgrundsnätverksförfrågningar.

### Vidarebefordran lägger inte till bilagor — är det förväntat?

Ja. Endast Svara och Svara alla modifieras av detta tillägg; Vidarebefordra lämnas oförändrad. Se [Begränsningar](usage#limitations).

### Var är Donate-snoozen?

Alternativ → Supportavsnitt. Se [Donationssynlighet](configuration#donation-visibility).

---

## Supporta

Behöver du hjälp eller vill rapportera ett fel?

---

### Öppna ett ärende på GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Ärenden: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Inkludera Thunderbird-version (t.ex. 128 ESR), OS och steg för att reproducera
- Bifoga relevanta loggar från Thunderbirds Felkonsol (Verktyg → Utvecklarverktyg → Felkonsol)

- Tilläggssidan (ATN): Du kan också lämna feedback via [tilläggssidan](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Tips

- Se till att du har en stödd Thunderbird-version (128 ESR eller nyare).
- Kontrollera dokumentationen för Konfiguration och Användning för vanliga inställningsfrågor.
- För utveckling/testning, se Utvecklingsguiden.
- Om lagrade inställningar verkar inte tillämpas korrekt, starta om Thunderbird och försök igen. (Thunderbird kan cacha status mellan sessioner; en omstart säkerställer att färska inställningar laddas.)
- Minimal reproduktion: försök med ett litet testmail som innehåller en eller två enkla filbilagor.
- Jämför beteende med bekräftelse PÅ vs. AV för att smalna ner om dialogflödet är involverat.

---

### Vad som ska inkluderas i en rapport

- Thunderbird-version och OS
- Exakta steg för att reproducera (vad du gjorde, vad du förväntade dig, vad som hände)
- Om bekräftelse var aktiverad och din standardinställning för svar
- Ett exempel på dina svartlistade mönster (om relevant)
- Felkonsolloggar under reproduktionen (Verktyg → Utvecklarverktyg → Felkonsol)
- Aktivera felfelsökningsloggning (valfritt):
  - Kör i Thunderbirds Felkonsol: `messenger.storage.local.set({ debug: true })`
  - Reproducera problemet och kopiera relevanta `[RWA]` loggrad.

---

### Ärendemall (kopiera/klistra in) {#issue-template}

- Thunderbird-version och OS:
- Steg för att reproducera:
- Bekräftelse aktiverad? Standard svar:
- Exempel på svartlistade mönster:
- Felkonsolloggar (Verktyg → Utvecklarverktyg → Felkonsol):
- Något annat relevant:

---

### Donera

Om du vill stödja detta projekt, överväg gärna ett litet bidrag på [Donera](donation) sidan. Tack!
