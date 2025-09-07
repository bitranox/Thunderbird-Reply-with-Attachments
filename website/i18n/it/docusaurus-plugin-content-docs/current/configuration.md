---
id: configuration
title: Configurazione
---

# Configurazione

Nota terminologica: consulta il [Glossario](glossary) per l’uso coerente dei termini nell’interfaccia e nella documentazione.

## Aprire le opzioni in Thunderbird

- Thunderbird → Strumenti → Componenti aggiuntivi e temi → “Reply with Attachments” → Preferenze/Opzioni

### Impostazioni:

#### Conferma

- Attiva “Chiedi prima di aggiungere allegati”.
- Risposta predefinita: Sì o No (focus e scorciatoie di default).
- Tastiera: Y/J = Sì; N/Esc = No; Tab/Shift+Tab e frecce cambiano il focus.

#### Lista nera (pattern glob)

I file in lista nera non verranno aggiunti automaticamente nella risposta.

- Un pattern per riga; non sensibile alle maiuscole/minuscole; confronto solo sul nome del file.
- Esempi: `*.png`, `smime.*`, `*.p7s`.
- Token glob supportati: `*` (qualsiasi carattere tranne `/`), `?` (un carattere), classi come `[abc]`. Usa `\[` per un `[` letterale. I percorsi (`**/`) sono ignorati poiché si confronta solo il nome del file.
- Non supportati: negazione (`!`), espansione con graffe (`{..}`) e intervalli complessi. Mantieni i pattern semplici.

Suggerimento: i valori predefiniti sono compilati al primo avvio e possono essere ripristinati in qualsiasi momento.

#### Avviso sugli allegati esclusi

- Attiva “Avvisa se gli allegati sono esclusi dalla lista nera” (predefinito: ATTIVO).
- Quando abilitato, una piccola finestra modale elenca i file esclusi e i pattern corrispondenti. L’avviso compare anche quando non verrà allegato nulla perché tutto è stato escluso.

#### Salva le impostazioni

---

### Normalizzazione dei nomi file (prevenzione duplicati)

Per un comportamento coerente tra piattaforme, i nomi file vengono normalizzati prima del controllo duplicati:

- Unicode è normalizzato in NFC.
- I nomi vengono convertiti in minuscolo.
- I punti/spazi finali vengono rimossi (migliore compatibilità con Windows).

Questo mantiene prevedibile il rilevamento dei duplicati per nomi come `café.pdf` vs `café.pdf` (NFD) o `FILE.txt.` vs `file.txt`.
