---
id: donation
title: 'Dona'
sidebar_label: 'Dona'
---

---

## Donazioni

import useBaseUrl from '@docusaurus/useBaseUrl';

Se ti piace "Reply with Attachments" e vuoi supportarne lo sviluppo, puoi fare una donazione qui:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Dona tramite Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oppure</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Dona tramite PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oppure</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Offrimi un caffè" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scansiona per offrirmi un caffè"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Grazie! Il tuo supporto aiuta a mantenere la compatibilità con le nuove versioni di Thunderbird, a migliorare l’accessibilità e i test e a mantenere la documentazione aggiornata.

Note

- I link per le donazioni si aprono solo quando ci fai clic; il componente aggiuntivo non effettua richieste di rete in background.
- Il supporto ricorrente aiuta la manutenzione a lungo termine e aggiornamenti puntuali, ma è del tutto facoltativo.

---

Se i pulsanti immagine non vengono caricati, utilizza invece questi link:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Offrimi un caffè](https://buymeacoffee.com/bitranox)

---

Le donazioni sono volontarie; non c’è alcun blocco delle funzionalità.

---

## Visibilità delle donazioni (pausa di 90 giorni)

Il componente aggiuntivo include una funzione di comodità per nascondere per un po’ le richieste di donazione dopo che hai donato.

- Dove trovarla
  - Opzioni → sezione Supporto: vedrai un pulsante “Ho donato” e una piccola area di suggerimento.
  - Anche la finestra di conferma di invio mostra un pulsante Dona; si nasconde automaticamente quando la pausa è attiva.

- Come funziona
  - Facendo clic su “Ho donato” si nascondono i pulsanti di donazione e i relativi avvisi per 90 giorni.
  - Un suggerimento di stato mostra “Nascosto fino al YYYY‑MM‑DD” (nella tua data locale). È presente anche un pulsante “Mostra di nuovo Dona” per ripristinare immediatamente la visibilità.
  - Dopo 90 giorni, il pulsante Dona torna visibile automaticamente.

- Privacy e archiviazione
  - Il componente aggiuntivo memorizza un singolo timestamp nell’archiviazione locale di Thunderbird per ricordare il periodo di pausa. Chiave: `donateHideUntil` (millisecondi epoch).
  - Questa impostazione è locale al tuo profilo Thunderbird (non sincronizzata nel cloud). Questa funzione non effettua alcuna richiesta di rete.

- Risoluzione dei problemi
  - Se Dona è ancora visibile subito dopo aver fatto clic su “Ho donato”, attendi un momento o riapri la pagina Opzioni; l’interfaccia si aggiorna non appena l’impostazione viene salvata.
  - Per ripristinare manualmente, fai clic su “Mostra di nuovo Dona”. Puoi anche attendere fino a quando non passa la data indicata nel suggerimento.

Questa funzione è puramente per comodità; non blocca mai le funzionalità del componente aggiuntivo e non raccoglie alcun dato personale.

---
