---
id: features
title: 'Funzionalità'
sidebar_label: 'Funzionalità'
---

---

## Funzionalità {#features}

- Allega automaticamente i file dall’email originale quando rispondi.
- Comportamento configurabile: gli allegati possono essere
  - aggiunti automaticamente, oppure
  - aggiunti solo dopo conferma (una piccola finestra di dialogo accessibile). In Opzioni
    puoi abilitare la conferma e scegliere la risposta predefinita (Sì/No).
- La blacklist dei nomi file (pattern glob) impedisce che file specifici vengano
  allegati automaticamente. Esempi: `*intern*`, `*secret*`, `*passwor*`.
  Il confronto non distingue tra maiuscole e minuscole e controlla solo il nome del file; fornisci un pattern
  per riga in Opzioni.
- Avviso blacklist (opzionale, abilitato per impostazione predefinita): quando i file sono esclusi dalla tua
  blacklist, una piccola finestra modale elenca il file e i pattern corrispondenti. Compatibile con la modalità scura
  e accessibile da tastiera (Invio/Esc per chiudere).
- Funziona con Rispondi e Rispondi a tutti. Il comando Inoltra non è modificato da questo componente aggiuntivo.
- Aggiunge gli originali anche se hai già allegato qualcosa; evita duplicati per nome file.
- La protezione dai duplicati per scheda impedisce il doppio inserimento nella stessa scheda di composizione.
- Salta i certificati S/MIME per impostazione predefinita per evitare allegati non necessari.
- Include immagini in linea (predefinito: ATTIVO). Le immagini incorporate vengono ripristinate direttamente nel
  corpo della risposta come URI di dati base64, preservando il layout in linea originale. Disabilita in
  Opzioni per saltare completamente le immagini in linea.

---

## Come funziona {#how-it-works}

- Quando rispondi, il componente aggiuntivo elenca gli allegati originali.
- Filtra le firme S/MIME dagli allegati; le immagini in linea vengono ripristinate nel corpo (a meno che non siano disabilitate).
- Facoltativamente chiede conferma (comodo da tastiera).
- Aggiunge i file idonei alla tua composizione, evitando duplicati per nome file.
- Vedi “Perché gli allegati potrebbero non essere aggiunti” in Uso per i casi limite.

Nota sulla privacy: Tutta l’elaborazione avviene localmente in Thunderbird. Il componente aggiuntivo non effettua richieste di rete in background.

---
