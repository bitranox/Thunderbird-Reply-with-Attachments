---
id: install
title: 'Installazione'
slug: /install
sidebar_label: 'Installazione'
---

## Installazione via "Componenti aggiuntivi e Temi di Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versione minima di Thunderbird
Questo componente aggiuntivo supporta Thunderbird **128 ESR o superiore**. Le versioni precedenti non sono supportate.
:::

Questo è il metodo di installazione consigliato. I componenti aggiuntivi installati da ATN (addons.thunderbird.net) ricevono aggiornamenti automatici. Le installazioni LOCAL/dev non si aggiornano automaticamente.

- Versione minima di Thunderbird: 128 ESR o superiore.

1. In Thunderbird, vai su **Strumenti > Componenti aggiuntivi e Temi**.
2. Cerca "rispondi con allegati".
3. Aggiungi il componente aggiuntivo.

Oppure apri direttamente la pagina del componente aggiuntivo: [Componenti aggiuntivi di Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Installazione manuale da XPI {#local-installation-in-thunderbird}

### Scarica il file XPI {#download-the-xpi-file}

1. Vai alla [pagina del componente aggiuntivo di Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Scarica l'ultima versione del componente aggiuntivo come file XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Installa in Thunderbird {#install-in-thunderbird-local}

1. Apri Thunderbird.
2. Vai su **Strumenti > Componenti aggiuntivi e Temi**.
3. Nella **Gestione componenti aggiuntivi**, clicca sull'icona dell'ingranaggio nell'angolo in alto a destra.
4. Scegli **Installa componente aggiuntivo dal file…** dal menu.
5. Seleziona il file `reply_with_attachments-x.y.z-tb.xpi` scaricato.
6. Conferma l'installazione quando richiesto.

---

## Installazione per sviluppo {#installation-for-development}

### Scarica il repository {#download-the-repository}

1. Scarica l'ultima versione del repository GitHub.
2. Esegui `make help` per ulteriori informazioni.

### Installa in Thunderbird {#install-in-thunderbird-dev}

1. Apri Thunderbird.
2. Vai su **Strumenti > Componenti aggiuntivi e Temi**.
3. Nella **Gestione componenti aggiuntivi**, clicca sull'icona dell'ingranaggio nell'angolo in alto a destra.
4. Scegli **Installa componente aggiuntivo dal file…** dal menu.
5. Seleziona il file generato `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Conferma l'installazione quando richiesto.

Nota: Se Thunderbird non accetta il `.zip` sul tuo sistema, rinominalo in `.xpi` e riprova “Installa componente aggiuntivo dal file…” di nuovo.

### Dove trovare il ZIP locale {#where-local-zip}

- Prima, pacchetta il componente aggiuntivo: esegui `make pack` nella radice del repository.
- Dopo il packaging, trova lo zip “LOCAL” nella radice del repository (es. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Prima di ri-pacchettare per il testing, aumentare le versioni in `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json`.

---

## Disabilitare, Disinstallare e Aggiornamenti {#disable-uninstall-updates}

- Disabilitare: Thunderbird → Strumenti → Componenti aggiuntivi e Temi → trova il componente aggiuntivo → disattiva.
- Disinstallare: stessa vista → menu a tre punti → Rimuovi.
- Aggiornamenti: le installazioni ATN si aggiornano automaticamente quando nuove versioni vengono approvate. Le installazioni LOCAL/dev non si aggiornano automaticamente; reinstalla manualmente una nuova build LOCAL.
- Rimuovere completamente le impostazioni: vedere [Privacy → Rimozione dei dati](privacy#data-removal).

Vedi anche

- [Introduzione veloce](quickstart)
