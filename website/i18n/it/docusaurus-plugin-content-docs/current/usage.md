---
id: usage
title: Utilizzo
sidebar_label: Utilizzo
---

## Utilizzo

- Rispondi e il componente aggiuntivo aggiunge automaticamente gli originali — oppure chiede conferma prima, se abilitato nelle Opzioni.
- Deduplicazione per nome file; SMIME e immagini inline vengono sempre ignorati.
- Anche gli allegati in lista nera vengono ignorati (non sensibile a maiuscole/minuscole, pattern glob).

---

## Dettagli di comportamento

- Prevenzione dei duplicati: il componente contrassegna la scheda di composizione come già elaborata tramite un valore di sessione per scheda e una guardia in memoria; non aggiungerà due volte gli originali.
- Rispetto degli allegati esistenti: se nella composizione ci sono già allegati, gli originali vengono comunque aggiunti una sola volta, saltando i nomi file già presenti.
- Esclusioni: gli artefatti SMIME (ad es. `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) e le immagini inline sono ignorati. Se al primo passaggio non c’è nulla di idoneo, una verifica più permissiva ricontrolla le parti non‑SMIME.
- Avviso lista nera (se abilitato): quando i candidati sono esclusi dalla tua lista, viene mostrata una piccola finestra modale con i file interessati e i pattern corrispondenti; compare anche quando non verrà allegato nulla perché tutto è stato escluso.
