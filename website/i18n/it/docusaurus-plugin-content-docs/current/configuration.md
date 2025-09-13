---
id: configuration
title: 'Configurazione'
---

## Configurazione

Terminology note: see the [Glossario](glossary) for consistent terms used in UI and docs.

---

## Apri opzioni in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Strumenti → Componenti aggiuntivi e Temi → trova “Rispondi con allegati” → Preferenze/Opzioni

---

### Impostazioni {#settings}

#### Conferma {#confirmation}

- Attiva/disattiva “Chiedi prima di aggiungere allegati”
- Risposta predefinita: Sì o No (focus e default della tastiera)
- Tastiera: Y/J = Sì; N/Esc = No; Tab/Shift+Tab e tasti freccia cicli di focus
  - Vedi i dettagli sulla tastiera in [Utilizzo](usage#keyboard-shortcuts).

---

#### Blacklist (pattern glob) {#blacklist-glob-patterns}

I file nella blacklist non verranno aggiunti automaticamente alla risposta. Vedi anche il [Glossario](glossary) per “Blacklist (Lista di esclusione)”.

- Un pattern per riga; non sensibile al caso; corrispondenza solo sul nome del file
- Esempi: `*intern*`, `*secret*`, `*passwor*`
- Token glob supportati: `*` (qualsiasi carattere tranne `/`), `?` (un carattere), classi di caratteri come `[abc]`. Usa `\[` per corrispondere a un `[` letterale. I percorsi (`**/`) vengono ignorati poiché vengono abbinati solo i nomi dei file.
- Non supportati: negazione (`!`), espansione delle parentesi (`{..}`) e intervalli complessi. Mantieni i pattern semplici.
- I commenti non sono supportati nei pattern. Non includere `#` o commenti inline; inserisci solo il testo del pattern per riga.

---

##### Ricettario dei pattern {#pattern-cookbook}

- Corrispondi a qualsiasi PDF: `*.pdf`
- Corrispondi a file che iniziano con “scan”: `scan*`
- Classe di caratteri: `report[0-9].txt`
- Escape di un `[` letterale: `\[` (utile quando si corrisponde a una parentesi come carattere)

---

##### Note {#blacklist-notes}

- L'ordine non conta; la prima/cualquier corrispondenza esclude il file.
- La corrispondenza avviene solo sul nome del file (i percorsi/cartelle vengono ignorati).
- “Ripristina le impostazioni predefinite” ripristina i pattern consigliati e l'interruttore di avviso sulla blacklist.
- Perché l'esempio `*passwor*`? Corrisponde a entrambe le famiglie “password” e “Passwort”.
- Precedenza: se un qualsiasi pattern corrisponde a un nome di file, il file viene escluso (prima/cualquier corrispondenza — l'ordine non cambia il risultato).
- Suggerimento: testa il tuo pattern: aggiungi un pattern temporaneo, rispondi a un messaggio contenente un file con un nome corrispondente e conferma che venga escluso nell'elenco di avviso.

##### Prova rapida (test sicuro) {#blacklist-try-it}

1. Apri Opzioni → Blacklist.
2. Aggiungi un pattern temporaneo come `*.tmp` e fai clic su Salva.
3. Rispondi a una mail di prova che ha un file che termina con `.tmp` — il file dovrebbe apparire nell'elenco di avviso e non essere allegato.
4. Rimuovi il pattern temporaneo quando hai finito, oppure fai clic su “Ripristina le impostazioni predefinite”.

---

#### Avviso su allegati esclusi {#warning-on-excluded-attachments}

- Attiva/disattiva “Avvisa se gli allegati sono esclusi dalla blacklist” (predefinito: ON).
- Quando attivato, un piccolo modulo elenca i file esclusi e il/i pattern corrispondenti. L'avviso appare anche quando nulla verrà allegato perché tutti i candidati sono stati messi nella blacklist.

---

#### Salva le tue impostazioni {#save-your-settings}

Le impostazioni vengono salvate premendo il pulsante Salva. Puoi ripristinare manualmente i singoli campi o ripristinare i predefiniti secondo necessità.

Se le impostazioni memorizzate non sembrano applicarsi correttamente, riavvia Thunderbird e riprova. (Thunderbird potrebbe memorizzare lo stato tra le sessioni; un riavvio assicura che vengano caricati nuovi settaggi.)

Suggerimento: per confermare che le tue impostazioni siano state applicate, rispondi a qualsiasi messaggio con un allegato e controlla la conferma o l'avviso della blacklist.

---

#### Visibilità delle donazioni (snooze di 90 giorni) {#donation-visibility}

Il componente aggiuntivo include una funzione di comodità per nascondere i suggerimenti di donazione per un po' dopo aver donato.

Dove trovarla

- Opzioni → Sezione Supporto: vedrai un pulsante “Ho donato” e un piccolo area di suggerimenti.
- La finestra di dialogo di conferma di invio mostra anche un pulsante Dona; viene automaticamente nascosto quando lo snooze è attivo.

Come funziona

- Cliccando “Ho donato” si nascondono i pulsanti di donazione e i suggerimenti correlati per 90 giorni.
- Un suggerimento di stato mostra “Nascosto fino al YYYY-MM-DD” (nella tua data locale). C'è anche un pulsante “Mostra Dona di nuovo” per ripristinare immediatamente la visibilità.
- Dopo 90 giorni, il pulsante Dona diventa nuovamente visibile automaticamente.

Privacy e memorizzazione

- Il componente aggiuntivo memorizza un singolo timestamp nella memoria locale di Thunderbird per ricordare il periodo di snooze. Chiave: `donateHideUntil` (millisecondi dall'epoca).
- Questa impostazione è locale al tuo profilo Thunderbird (non sincronizzato nel cloud). Nessuna richiesta di rete viene effettuata da questa funzione.

Risoluzione dei problemi

- Se Dona continua a comparire subito dopo aver fatto clic su “Ho donato”, aspetta un momento o riapri la pagina delle Opzioni; l'interfaccia utente si aggiorna non appena l'impostazione è salvata.
- Per ripristinare manualmente, fai clic su “Mostra Dona di nuovo”. Puoi anche aspettare fino a quando la data indicata nel suggerimento scade.

Questa funzione è puramente per comodità; non blocca mai la funzionalità del componente aggiuntivo e non raccoglie alcun dato personale.

---

### Normalizzazione dei nomi dei file (prevenzione dei duplicati) {#filename-normalization-duplicates-prevention}

Per comportarsi in modo coerente su tutte le piattaforme, i nomi dei file vengono normalizzati prima dei controlli di duplicati:

- L'Unicode viene normalizzato in NFC.
- I nomi vengono convertiti in minuscolo (case-folded).
- I punti/spazi finali vengono rimossi (amichevolezza con Windows).

Questo mantiene la rilevazione dei duplicati prevedibile per nomi come `café.pdf` vs `café.pdf` (NFD) o `FILE.txt.` vs `file.txt`.

---

## Comportamento di conferma {#confirmation-behavior}

- “Risposta predefinita” imposta il pulsante inizialmente focalizzato nella finestra di dialogo di conferma (utile per gli utenti della tastiera).
- Funziona sia per “Rispondi” che per “Rispondi a tutti”. “Inoltra” non è modificato da questo componente aggiuntivo.

---

## Avanzato: rilevamento dei duplicati {#advanced-duplicate-detection}

La prevenzione dei duplicati è implementata per ogni scheda di composizione e per nome file. Vedi [Utilizzo](usage#behavior-details) per una spiegazione dettagliata.

---

Vedi anche

- [Permessi](permissions)
- [Privacy](privacy)
