---
id: install
title: 'Installazione'
slug: /install
sidebar_label: 'Installazione'
---

---

## Installazione tramite "Componenti aggiuntivi e temi" di Thunderbird {#installation-in-thunderbird-recommended}

:::important Versione minima di Thunderbird
Questo componente aggiuntivo supporta Thunderbird **128 ESR o successiva**. Le versioni precedenti non sono supportate.
:::

Questo è il metodo di installazione consigliato. I componenti aggiuntivi installati da ATN (addons.thunderbird.net) ricevono aggiornamenti automatici. Le installazioni LOCAL/dev non si aggiornano automaticamente.

- Versione minima di Thunderbird: 128 ESR o successiva.

1. In Thunderbird, vai a **Strumenti > Componenti aggiuntivi e temi**.
2. Cerca "reply with attachments".
3. Aggiungi il componente aggiuntivo.

Oppure apri direttamente la pagina del componente aggiuntivo: [Componenti aggiuntivi di Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Installazione manuale da XPI {#local-installation-in-thunderbird}

### Scarica il file XPI {#download-the-xpi-file}

1. Vai alla [pagina del componente aggiuntivo di Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Scarica l’ultima versione del componente aggiuntivo come file XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Installa in Thunderbird {#install-in-thunderbird-local}

1. Apri Thunderbird.
2. Vai su **Strumenti > Componenti aggiuntivi e temi**.
3. Nel **Gestore componenti aggiuntivi**, fai clic sull’icona a forma di ingranaggio nell’angolo in alto a destra.
4. Dal menu, scegli **Installa componente aggiuntivo da file…**.
5. Seleziona il file `reply_with_attachments-x.y.z-tb.xpi` scaricato.
6. Conferma l’installazione quando richiesto.

---

## Installazione per lo sviluppo {#installation-for-development}

### Scarica il repository {#download-the-repository}

1. Scarica la versione più recente del repository GitHub.
2. Esegui `make help` per ulteriori informazioni.

### Installa in Thunderbird {#install-in-thunderbird-dev}

1. Apri Thunderbird.
2. Vai su **Strumenti > Componenti aggiuntivi e temi**.
3. Nel **Gestore componenti aggiuntivi**, fai clic sull’icona a forma di ingranaggio nell’angolo in alto a destra.
4. Dal menu, scegli **Installa componente aggiuntivo da file…**.
5. Seleziona il file generato `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Conferma l’installazione quando richiesto.

Nota: se Thunderbird non accetta `.zip` sul tuo sistema, rinominalo in `.xpi` e riprova con “Installa componente aggiuntivo da file…”.

### Dove trovare lo ZIP LOCAL {#where-local-zip}

- Per prima cosa, crea il pacchetto del componente aggiuntivo: esegui `make pack` nella radice del repository.
- Dopo l’impacchettamento, trova lo zip “LOCAL” nella radice del repository (ad es., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Prima di reimpacchettare per i test, incrementa le versioni sia in `sources/manifest_ATN.json` che in `sources/manifest_LOCAL.json`.

---

## Disattivazione, disinstallazione e aggiornamenti {#disable-uninstall-updates}

- Disattivazione: Thunderbird → Strumenti → Componenti aggiuntivi e temi → trova il componente aggiuntivo → disattiva l’interruttore.
- Disinstallazione: stessa schermata → menu a tre punti → Rimuovi.
- Aggiornamenti: le installazioni da ATN si aggiornano automaticamente quando le nuove versioni vengono approvate. Le installazioni LOCAL/dev non si aggiornano automaticamente; reinstalla manualmente una nuova build LOCAL.
- Rimuovere completamente le impostazioni: vedi [Privacy → Rimozione dei dati](privacy#data-removal).

Vedi anche

- [Avvio rapido](quickstart)
