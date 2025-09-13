---
id: support
title: 'Supporto'
sidebar_label: 'Supporto'
---

## FAQ {#faq}

### Gli allegati non sono stati aggiunti — perché?

- Le immagini inline e le parti S/MIME sono intenzionalmente escluse.
- I nomi dei file duplicati vengono saltati se il compose ha già lo stesso file.
- I modelli della blacklist potrebbero filtrare i candidati; vedere [Configurazione](configuration#blacklist-glob-patterns).

### Posso confermare prima di aggiungere gli allegati?

Sì. Abilita "Chiedi prima di aggiungere allegati" sotto [Configurazione → Conferma](configuration#confirmation). Tastiera: Y/J = Sì, N/Esc = No.

### L'add-on invia dati o monitora l'uso?

No. Vedi [Privacy](privacy) — nessuna telemetria e nessuna richiesta di rete in background.

### Inoltra non aggiunge allegati — è previsto?

Sì. Solo Rispondi e Rispondi a tutti vengono modificati da questo add-on; Inoltra rimane invariato. Vedi [Limitazioni](usage#limitations).

### Dove si trova il rinvio della donazione?

Opzioni → sezione Supporto. Vedi [Visibilità delle Donazioni](configuration#donation-visibility).

---

## Supporto

Hai bisogno di aiuto o vuoi segnalare un bug?

---

### Apri un problema su GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemi: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Includi la versione di Thunderbird (ad esempio, 128 ESR), il sistema operativo e i passaggi per riprodurre
- Allegare i registri pertinenti dalla Console di errore di Thunderbird (Strumenti → Strumenti per sviluppatori → Console di errore)

- Sito degli add-on (ATN): Puoi anche lasciare feedback tramite la [pagina dell'add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Suggerimenti

- Assicurati di utilizzare una versione di Thunderbird supportata (128 ESR o più recente).
- Controlla la documentazione di Configurazione e Utilizzo per domande comuni di configurazione.
- Per sviluppo/test, consulta la guida allo sviluppo.
- Se le impostazioni memorizzate sembrano non applicarsi correttamente, riavvia Thunderbird e riprova. (Thunderbird potrebbe memorizzare lo stato tra le sessioni; un riavvio assicura che vengano caricate nuove impostazioni.)
- Riproduzione minima: prova con una piccola email di test contenente uno o due semplici allegati.
- Confronta il comportamento con conferma ATTIVA rispetto a DISATTIVA per restringere se il flusso della finestra di dialogo è coinvolto.

---

### Cosa includere in una segnalazione

- Versione di Thunderbird e sistema operativo
- Passaggi esatti per riprodurre (cosa hai fatto, cosa ti aspettavi, cosa è successo)
- Se la conferma era abilitata e la tua impostazione di risposta predefinita
- Un campione dei tuoi modelli di blacklist (se pertinente)
- Log della Console di errore durante la riproduzione (Strumenti → Strumenti per sviluppatori → Console di errore)
- Abilita logging di debug (opzionale):
  - Esegui nella Console di errore di Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Riproduci il problema e copia le righe di log pertinenti `[RWA]`

---

### Modello di problema (copia/incolla) {#issue-template}

- Versione di Thunderbird e sistema operativo:
- Passaggi per riprodurre:
- Conferma abilitata? Risposta predefinita:
- Esempio di modelli di blacklist:
- Log della Console di errore (Strumenti → Strumenti per sviluppatori → Console di errore):
- Altro di rilevante:

---

### Dona

Se desideri supportare questo progetto, considera una piccola contribuzione nella pagina [Dona](donation). Grazie!
