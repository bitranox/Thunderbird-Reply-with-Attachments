---
id: features
title: 'Funzionalità'
sidebar_label: 'Funzionalità'
---

---

## Funzionalità {#features}

- Le immagini incorporate sono lasciate a Thunderbird: rimangono nel corpo della risposta e non vengono copiate come allegati. Un'immagine che porta solo un `Content-ID` senza essere referenziata viene trattata come un allegato normale e viene copiata.

---

## Come funziona {#how-it-works}

- Quando rispondi, il componente aggiuntivo elenca gli allegati originali.
- Filtra le firme S/MIME dagli allegati; le immagini in linea vengono ripristinate nel corpo (a meno che non siano disabilitate).
- Facoltativamente chiede conferma (comodo da tastiera).
- Aggiunge i file idonei alla tua composizione, evitando duplicati per nome file.
- Vedi “Perché gli allegati potrebbero non essere aggiunti” in Uso per i casi limite.

Nota sulla privacy: Tutta l’elaborazione avviene localmente in Thunderbird. Il componente aggiuntivo non effettua richieste di rete in background.

---
