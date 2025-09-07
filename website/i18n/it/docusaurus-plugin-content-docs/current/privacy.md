---
id: privacy
title: Privacy
sidebar_label: Privacy
---

Reply with Attachments non raccoglie analisi o telemetria e non invia i tuoi dati da nessuna parte.

Cosa fa il componente:

- Legge in locale (API Thunderbird) i metadati e i file degli allegati del messaggio originale per aggiungerli alla tua risposta.
- Memorizza le tue opzioni (lista nera, conferma, risposta predefinita) nello storage locale di Thunderbird.

Cosa non fa:

- Niente tracciamento, analisi, report di crash o log remoti.
- Nessuna richiesta di rete in background, salvo quando apri esplicitamente link esterni (Docs, GitHub, Donazioni).

Le autorizzazioni sono descritte nella pagina [Autorizzazioni](permissions).

## Content Security Policy (CSP)

Le pagine di opzioni e popup evitano script inline. Tutto il JavaScript è caricato da file inclusi con il componente per rispettare la CSP rigorosa di Thunderbird. Gli snippet di codice nella documentazione sono solo esempi e non vengono eseguiti dal componente.
