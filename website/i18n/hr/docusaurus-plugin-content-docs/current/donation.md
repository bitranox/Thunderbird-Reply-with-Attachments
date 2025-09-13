---
id: donation
title: 'Donacije'
sidebar_label: 'Donacije'
---

## Donacije

import useBaseUrl from '@docusaurus/useBaseUrl';

Ako vam se sviđa "Odgovori s prilozima" i želite podržati njegov razvoj, možete donirati ovdje:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donirajte putem Stripe-a" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ili</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donirajte putem PayPala" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ili</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kupite mi kavu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skenirajte za kupiti mi kavu"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Hvala! Vaša podrška pomaže u održavanju kompatibilnosti s novim izdanjima Thunderbirda, poboljšanju pristupačnosti i testova, te održavanju dokumentacije ažurnom.

Bilješke

- Linkovi za donacije otvaraju se samo kada ih kliknete; dodatak ne izvodi nikakve pozadinske mrežne zahtjeve.
- Ponovljena podrška pomaže dugoročnom održavanju i pravovremenim ažuriranjima, ali je potpuno opcionalna.

---

Ako se gumbe sa slikama ne učitaju, molimo koristite ove linkove umjesto toga:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kupite mi kavu](https://buymeacoffee.com/bitranox)

---

Donacije su dobrovoljne; nema ograničenja funkcionalnosti.

---

## Vidljivost donacije (90‑dnevno odgađanje)

Dodatak uključuje funkciju za udobnost koja skriva pozive za donacije na neko vrijeme nakon što ste donirali.

- Gdje je pronaći
  - Opcije → Odjeljak podrške: vidjet ćete dugme "Donirao sam" i malu hint zonu.
  - Dijalog za slanje potvrde također prikazuje dugme za donaciju; automatski se skriva kada je odgađanje aktivno.

- Kako to funkcionira
  - Klikom na "Donirao sam" skrivaju se dugmad za donacije i povezani pozivi na 90 dana.
  - Status hint prikazuje "Skriveno do YYYY‑MM‑DD" (u vašem lokalnom datumu). Također postoji dugme "Ponovno prikaži donaciju" za trenutnu obnovu vidljivosti.
  - Nakon 90 dana, dugme za donaciju ponovno postaje vidljivo automatski.

- Privatnost i pohrana
  - Dodatak pohranjuje jedan vremenski oznaku u lokalnoj pohrani Thunderbirda kako bi zapamtila period odgađanja. Ključ: `donateHideUntil` (epoch milliseconds).
  - Ova postavka je lokalna za vaš Thunderbird profil (nije u oblaku sinkronizirana). Ova funkcija ne vrši nikakve mrežne zahtjeve.

- Rješavanje problema
  - Ako se donacija i dalje prikazuje odmah nakon klika na "Donirao sam", pričekajte trenutak ili ponovo otvorite stranicu opcija; korisničko sučelje se ažurira čim se postavka spremi.
  - Da resetirate ručno, kliknite "Ponovno prikaži donaciju". Također možete čekati dok ne prođe datum naveden u savjetu.

Ova funkcija je isključivo radi udobnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve osobne podatke.

---
