---
id: usage
title: 'Utilizzo'
sidebar_label: 'Uso'
---

---

## Utilizzo {#usage}

- Rispondi e il componente aggiuntivo aggiunge automaticamente gli originali — oppure chiede prima conferma, se abilitato nelle Opzioni.
- Deduplicati in base al nome file; le parti S/MIME vengono sempre ignorate. Le immagini incorporate nel messaggio originale restano nel corpo della risposta, dove Thunderbird le colloca, e non vengono copiate come file.
- Gli allegati in blacklist vengono anch'essi ignorati (pattern glob senza distinzione tra maiuscole/minuscole che corrispondono ai nomi file, non ai percorsi). Vedi [Configurazione](configuration#blacklist-glob-patterns).

---

### Cosa succede in caso di risposta {#what-happens}

- Rilevare la risposta → elencare gli allegati originali → saltare S/MIME e le immagini incorporate → conferma opzionale → aggiungere i file idonei (saltando i duplicati).

| Tipo di parte                                                      | Copiato nella risposta  |
|--------------------------------------------------------------------|------------------------:|
| File di firma S/MIME `smime.p7s`                                   | No                      |
| Tipi MIME S/MIME (`application/pkcs7-*`)                           | No                      |
| Immagine incorporata nel corpo del messaggio tramite `cid:`        | No (si trova nel corpo) |
| Immagine contrassegnata `Content-Disposition: inline`              | No (si trova nel corpo) |
| Immagine con un `Content-ID` a cui il corpo non fa mai riferimento | Sì                      |
| Email allegata (`message/rfc822`) con un nome file                 | Sì                      |
| Allegato di file normale con un nome file                          | Sì                      |

Un'immagine è considerata incorporata solo quando il messaggio originale vi fa effettivamente riferimento, oppure quando il mittente l'ha contrassegnata esplicitamente come `Content-Disposition: inline`. Un semplice header `Content-ID` non è sufficiente: diversi client di posta ne aggiungono uno a ogni parte immagine, compresi gli allegati genuini, che devono comunque essere copiati.

---

### Riferimenti incrociati {#cross-reference}

- L'inoltro non è modificato per progettazione (vedi Limitazioni sotto).
- Per i motivi per cui un allegato potrebbe non essere aggiunto, vedi “Perché gli allegati potrebbero non essere aggiunti”.

---

## Dettagli del comportamento {#behavior-details}

- **Prevenzione dei duplicati:** Il componente aggiuntivo contrassegna la scheda di composizione come elaborata usando un valore di sessione per scheda e una protezione in memoria. Non aggiungerà gli originali due volte.
- Chiudere e riaprire una finestra di composizione è considerato come una nuova scheda (cioè è consentito un nuovo tentativo).
- **Rispetto degli allegati esistenti:** Se la composizione contiene già alcuni allegati, gli originali vengono comunque aggiunti esattamente una volta, saltando i nomi file già esistenti.
- **Esclusioni:** Gli artefatti S/MIME e le immagini inline sono esclusi dagli allegati file. Se nulla rientra nei criteri al primo passaggio, un fallback rilassato ricontrolla le parti non S/MIME. Le immagini inline sono gestite separatamente: vengono ripristinate nel corpo della risposta come URI di dati (quando abilitato).
  - **Nomi file:** `smime.p7s`
  - **Tipi MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Immagini inline:** qualsiasi parte `image/*` referenziata da Content‑ID — esclusa dagli allegati file ma incorporata nel corpo della risposta quando "Includi immagini inline" è ON
  - **Email allegate (`message/rfc822`):** trattate come allegati normali se hanno un nome file; possono essere aggiunte (soggette al controllo duplicati e alla blacklist).
- **Avviso blacklist (se abilitato):** Quando i candidati vengono esclusi dalla tua blacklist,
  il componente aggiuntivo mostra una piccola finestra modale che elenca i file interessati e i
  pattern corrispondenti. Questo avviso appare anche nei casi in cui non verrà
  aggiunto alcun allegato perché tutto è stato escluso.

---

## Scorciatoie da tastiera {#keyboard-shortcuts}

- Finestra di conferma: Y/J = Sì, N/Esc = No; Tab/Shift+Tab e i tasti freccia fanno scorrere il focus.
  - La “Risposta predefinita” in [Configurazione](configuration#confirmation) imposta il pulsante inizialmente messo a fuoco.
  - Invio attiva il pulsante a fuoco. Tab/Shift+Tab e i tasti freccia spostano il focus per l’accessibilità.

### Guida rapida tastiera {#keyboard-cheat-sheet}

| Tasti                | Azione                              |
|----------------------|-------------------------------------|
| Y / J                | Conferma Sì                         |
| N / Esc              | Conferma No                         |
| Enter                | Attiva il pulsante a fuoco          |
| Tab / Shift+Tab      | Sposta il focus avanti/indietro     |
| Tasti freccia        | Sposta il focus tra i pulsanti      |
| Risposta predefinita | Imposta il focus iniziale (Sì o No) |

---

## Limitazioni {#limitations}

- L'inoltro non è modificato da questo componente aggiuntivo (Rispondi e Rispondi a tutti sono supportati).
- Gli allegati molto grandi possono essere soggetti ai limiti di Thunderbird o del provider.
  - Il componente aggiuntivo non suddivide né comprime i file; si affida alla normale gestione degli allegati di Thunderbird.
- Messaggi crittografati: le parti S/MIME sono intenzionalmente escluse.

---

## Perché gli allegati potrebbero non essere aggiunti {#why-attachments-might-not-be-added}

- Le immagini incorporate dal messaggio originale non vengono copiate come file. Sono già nel corpo della risposta, dove le ha messe Thunderbird. Vedi [Configurazione](configuration#include-inline-pictures).
- Le parti di firma S/MIME sono escluse per progettazione: nomi file come `smime.p7s` e tipi MIME come `application/pkcs7-signature` o `application/pkcs7-mime` vengono ignorati.
- I pattern di blacklist possono filtrare i candidati: vedi [Configurazione](configuration#blacklist-glob-patterns); il confronto non distingue maiuscole/minuscole ed è limitato al solo nome file.
- I nomi file duplicati non vengono riaggiunti: se la composizione contiene già un file con lo stesso nome normalizzato, viene ignorato.
- Parti non file o nomi file mancanti: vengono considerati per l'aggiunta solo le parti simili a file con nomi file utilizzabili.

---

Vedi anche

- [Configurazione](configuration)
