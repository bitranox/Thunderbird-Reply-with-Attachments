---
id: quickstart
title: 'Guida rapida'
sidebar_label: 'Avvio rapido'
---

---

## Guida rapida

:::important Versione minima di Thunderbird
Questo componente aggiuntivo supporta Thunderbird **128 ESR o versioni successive**. Le versioni precedenti non sono supportate.
:::

:::note Nessuna telemetria; nessuna rete in background
Il componente aggiuntivo **non** raccoglie analisi/telemetria e **non** effettua richieste di rete in background. L’accesso alla rete avviene solo quando fai clic su link esterni (Documentazione, GitHub, Donazioni).
:::

---

### Installazione

1. Installa il componente aggiuntivo da Componenti aggiuntivi di Thunderbird.
2. Opzionale: Abilita la conferma (Opzioni → “Chiedi prima di aggiungere gli allegati”).
3. Opzionale: Lascia abilitato l’avviso della blacklist (predefinito): “Avvisa se gli allegati sono esclusi dalla blacklist”.
4. Opzionale: Aggiungi i modelli della blacklist (uno per riga), ad es.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: Il “# …” sopra è un commento in questa documentazione; non includere commenti nei modelli che incolli in Opzioni. Inserisci un solo modello per riga.

Ora rispondi a un messaggio con allegati — gli originali verranno aggiunti automaticamente o dopo una rapida conferma. Se alcuni file sono esclusi dalla tua blacklist, vedrai un breve avviso che li elenca.

---

### Verifica {#verify}

- Rispondi a un messaggio con 1–2 allegati e verifica che gli originali vengano aggiunti alla finestra di composizione.
- Per modificare il comportamento, vedi [Configurazione](configuration) (interruttore di conferma, risposta predefinita, modelli di blacklist).

---

### Verifica dell’avviso della blacklist {#verify-blacklist-warning}

- Rispondi a un messaggio contenente un file come “secret.txt”.
- Con “Avvisa se gli allegati sono esclusi dalla blacklist” abilitato, una piccola finestra di dialogo elenca i file esclusi e il modello corrispondente.

Se non vedi un avviso, assicurati che il modello corrisponda esattamente al nome del file (solo nome file, senza distinzione tra maiuscole e minuscole). Vedi Configurazione → Blacklist.

---

### Nota sulla tastiera {#keyboard-note}

- La finestra di conferma supporta Y/J per Yes e N/Esc per No. Su alcune tastiere non latine, i tasti lettera possono variare; Invio conferma il pulsante attivo.

---
