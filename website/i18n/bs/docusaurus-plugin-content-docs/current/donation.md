---
id: donation
title: 'Donirajte'
sidebar_label: 'Donirajte'
---

## Donirajte

import useBaseUrl from '@docusaurus/useBaseUrl';

Ako vam se sviđa "Odgovori s prilozima" i želite podržati njegov razvoj, možete donirati ovdje:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donirajte putem Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ili</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donirajte putem PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ili</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kupite mi kafu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skenirajte da mi kupite kafu"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Hvala! Vaša podrška pomaže održavanju kompatibilnosti s novim izdanjima Thunderbirda, poboljšava pristupačnost i testove, i drži dokumentaciju ažurnom.

Napomene

- Linkovi za donaciju otvaraju se samo kada ih kliknete; dodatak ne izvodi nikakve pozadinske mrežne zahtjeve.
- Periodična podrška pomaže dugoročno održavanje i pravovremene nadogradnje, ali je potpuno opcionalna.

---

Ako se slike dugmadi ne učitavaju, molimo koristite ove veze umjesto njih:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kupite mi kafu](https://buymeacoffee.com/bitranox)

---

Donacije su dobrovoljne; nema zaključavanja funkcionalnosti.

---

## Vidljivost donacija (90-dnevno zatišje)

Dodatak uključuje praktičnu funkciju za skrivanje poziva na donacije na neko vrijeme nakon što ste donirali.

- Gdje je pronaći
  - Opcije → Odjeljak za podršku: vidjet ćete dugme "Donirao sam" i malu pomoćnu oblast.
  - Dijalog za slanje potvrde takođe prikazuje dugme Donirajte; automatski se skriva kada je zatišje aktivno.

- Kako to funkcioniše
  - Klikom na "Donirao sam" skriva dugmad za donaciju i srodne pozive na 90 dana.
  - Statusna naznaka prikazuje "Skriveno do YYYY‑MM‑DD" (u vašem lokalnom datumu). Tu je i dugme “Ponovo prikaži Doniraj” za obnovu vidljivosti odmah.
  - Nakon 90 dana, dugme Donirajte ponovo postaje vidljivo automatski.

- Privatnost i skladištenje
  - Dodatak pohranjuje jedan vremenski žig u lokalnom skladištu Thunderbirda kako bi zapamtio period zatišja. Ključ: `donateHideUntil` (epoh milisekunde).
  - Ova postavka je lokalna za vaš Thunderbird profil (nije sinkronizovana sa oblakom). Ova funkcija ne vrši nikakve mrežne zahtjeve.

- Rješavanje problema
  - Ako se Donirajte još uvijek prikazuje odmah nakon što kliknete "Donirao sam", sačekajte trenutak ili ponovo otvorite stranicu Opcije; korisnički interfejs se ažurira čim se postavka sačuva.
  - Da biste resetovali ručno, kliknite “Ponovo prikaži Doniraj”. Takođe možete sačekati dok ne prođe datum naveden u pomoći.

Ova funkcija je isključivo radi praktičnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja lične podatke.

---
