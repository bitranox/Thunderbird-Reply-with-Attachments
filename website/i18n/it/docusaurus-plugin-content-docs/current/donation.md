---
id: donation
title: 'Dona'
sidebar_label: 'Dona'
---

## Dona

import useBaseUrl from '@docusaurus/useBaseUrl';

Se ti piace "Rispondi con allegati" e vuoi sostenere il suo sviluppo, puoi donare qui:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Dona tramite Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Dona tramite PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Compra un caffè per me" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scansiona per comprarmi un caffè"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Grazie! Il tuo sostegno aiuta a mantenere la compatibilità con le nuove versioni di Thunderbird, migliorare l'accessibilità e i test, e mantenere la documentazione aggiornata.

Note

- I collegamenti per le donazioni si aprono solo quando li clicchi; il componente aggiuntivo non effettua alcuna richiesta di rete in background.
- Il supporto ricorrente aiuta la manutenzione a lungo termine e aggiornamenti tempestivi, ma è del tutto facoltativo.

---

Se i pulsanti con le immagini non si caricano, ti preghiamo di utilizzare questi collegamenti alternativi:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Compra un caffè per me](https://buymeacoffee.com/bitranox)

---

Le donazioni sono volontarie; non ci sono funzionalità bloccate.

---

## Visibilità delle Donazioni (snooze di 90 giorni)

Il componente aggiuntivo include una funzionalità di comodità per nascondere i promemoria di donazione per un po' dopo che hai donato.

- Dove trovarlo
  - Opzioni → Sezione Supporto: vedrai un pulsante "Ho donato" e una piccola area di suggerimenti.
  - La finestra di dialogo di conferma dell'invio mostra anche un pulsante Dona; si nasconde automaticamente quando lo snooze è attivo.

- Come funziona
  - Cliccando su "Ho donato" si nascondono i pulsanti di donazione e i promemoria correlati per 90 giorni.
  - Un suggerimento di stato mostra "Nascosto fino a YYYY‑MM‑DD" (nella tua data locale). C'è anche un pulsante "Mostra di nuovo Dona" per ripristinare immediatamente la visibilità.
  - Dopo 90 giorni, il pulsante Dona diventa visibile di nuovo automaticamente.

- Privacy e archiviazione
  - Il componente aggiuntivo memorizza un singolo timestamp nello storage locale di Thunderbird per ricordare il periodo di snooze. Chiave: `donateHideUntil` (millisecondi epoch).
  - Questa impostazione è locale al tuo profilo Thunderbird (non sincronizzato nel cloud). Non vengono effettuate richieste di rete da questa funzionalità.

- Risoluzione dei problemi
  - Se Dona appare ancora subito dopo aver cliccato su "Ho donato", aspetta un momento o riapri la pagina delle Opzioni; l'interfaccia utente si aggiorna non appena l'impostazione viene salvata.
  - Per ripristinare manualmente, clicca "Mostra di nuovo Dona". Puoi anche aspettare fino a quando la data mostrata nel suggerimento non scade.

Questa funzionalità è puramente per comodità; non blocca mai la funzionalità del componente aggiuntivo e non raccoglie alcun dato personale.

---
