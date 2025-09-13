---
id: permissions
title: 'Permessi'
---

## Permessi

:::note Permessi minimi
Nessun permesso host (web) è richiesto da questo componente aggiuntivo. Il componente aggiuntivo non raccoglie telemetria né effettua richieste di rete in background. Vedi [Privacy](privacy).
:::

---

Il componente aggiuntivo richiede solo un piccolo e mirato insieme di permessi. Perché ciascuno è necessario:

- `compose`: osservare eventi di composizione, elencare/aggiungere allegati nella tua risposta.
- `messagesRead`: leggere i metadati e recuperare i file allegati dal messaggio originale.
- `scripting`: iniettare la piccola finestra di conferma in composizione quando abilitata.
- `windows`: aprire un piccolo popup di conferma come ultima risorsa quando il messaggio fallisce.
- `sessions`: memorizzare un flag per scheda per evitare elaborazioni duplicate.
- `storage`: mantenere le opzioni (lista nera, attivazione della conferma, risposta predefinita).
- `tabs`: messaggistica mirata alla scheda di composizione per richieste di conferma.

Note aggiuntive:

- Nessun permesso host (origini web) è richiesto da questo componente aggiuntivo.
- Il permesso `tabs` è utilizzato solo per mirare alla scheda di composizione quando si coordina la finestra di conferma opzionale; non viene utilizzato per leggere la cronologia o navigare tra le pagine.

Questi sono documentati nel codice sorgente e testati in CI. Il componente aggiuntivo non raccoglie telemetria.

---

### Sommario (permessi → scopo) {#permissions-summary}

| Permesso        | Perché è necessario                                                                  |
| --------------- | ------------------------------------------------------------------------------------ |
| `compose`       | Osservare eventi di composizione; elencare e aggiungere allegati nella tua risposta. |
| `messagesRead`  | Elencare gli allegati del messaggio originale e recuperare i dati del file.          |
| `scripting`     | Iniettare/coordinare un'interfaccia utente leggera per la conferma quando abilitata. |
| `windows`       | Popup di fallback se la messaggistica fallisce (rara).                               |
| `sessions`      | Memorizzare un flag per scheda per prevenire elaborazioni duplicate.                 |
| `storage`       | Mantenere le opzioni (lista nera, attivazione della conferma, risposta predefinita). |
| `tabs`          | Messaggistica mirata alla scheda di composizione per richieste di conferma.          |
| (permessi host) | Nessuno — il componente aggiuntivo non richiede origini web.                         |

---

## Non richiesto {#not-requested}

- `compose.save`, `compose.send` — il componente aggiuntivo non salva né invia email per tuo conto.

Vedi anche: [Privacy](privacy) — nessuna telemetria, nessun network in background, solo link iniziati dall'utente.

---
