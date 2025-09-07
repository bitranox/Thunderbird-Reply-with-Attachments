---
id: features
title: Caratteristiche
sidebar_label: Caratteristiche
---

## Caratteristiche

- Aggiunge automaticamente i file dell’e‑mail originale quando rispondi.
- Comportamento configurabile: gli allegati possono essere
  - aggiunti automaticamente, oppure
  - aggiunti solo dopo conferma (piccolo dialogo accessibile). In Opzioni puoi attivare la conferma e scegliere la risposta predefinita (Sì/No).
- La blacklist dei nomi file (pattern glob) impedisce l’aggiunta automatica di determinati file. Esempi: `*intern*`, `*secret*`, `*passwor*`.
  Il confronto non fa distinzione tra maiuscole e minuscole e controlla solo il nome del file; in Opzioni indica un pattern per riga.
- Avviso di blacklist (opzionale, attivo per impostazione predefinita): quando dei file vengono esclusi dalla blacklist, un piccolo modale elenca il file e i pattern corrispondenti. Compatibile con il tema scuro e accessibile da tastiera (Invio/Esc per chiudere).
- Aggiunge gli originali anche se hai già allegato qualcosa; evita i duplicati in base al nome file.
- Salta i certificati SMIME e le immagini inline per evitare allegati non necessari.
