---
id: permissions
title: Autorizzazioni
---

Il componente richiede solo un piccolo set di autorizzazioni mirate. Motivo per ciascuna:

- compose: osservare gli eventi di composizione, elencare/aggiungere allegati nella risposta.
- messagesRead: leggere metadati e ottenere i file allegati dal messaggio originale.
- scripting: inserire la piccola finestra di conferma nella composizione quando abilitato.
- windows: aprire un piccolo pop‑up di conferma come ultima risorsa se la messaggistica fallisce.
- sessions: memorizzare un flag per scheda per evitare doppi inserimenti.
- storage: salvare le opzioni (lista nera, conferma, risposta predefinita).
- tabs: messaggistica mirata alla scheda di composizione per le richieste di conferma.

Tutto è documentato nel sorgente e testato in CI. Il componente non raccoglie telemetria.
