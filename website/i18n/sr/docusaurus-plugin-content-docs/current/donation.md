---
id: donation
title: 'Донирајте'
sidebar_label: 'Донирај'
---

---

## Donirajte

import useBaseUrl from '@docusaurus/useBaseUrl';

Ako vam se dopada "Reply with Attachments" i želite da podržite njegov razvoj, možete donirati ovde:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donirajte putem Stripe-a" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ili</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donirajte putem PayPal-a" width="320" height="64"
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

Hvala vam! Vaša podrška pomaže u održavanju kompatibilnosti sa novim izdanjima Thunderbirda, poboljšanju pristupačnosti i testova i održavanju dokumentacije ažurnom.

Napomene

- Linkovi za donacije se otvaraju samo kada kliknete na njih; dodatak ne obavlja nikakve mrežne zahteve u pozadini.
- Ponavljajuća podrška pomaže dugoročnom održavanju i pravovremenim ažuriranjima, ali je u potpunosti opcionalna.

---

Ako se dugmad sa slikama ne učitaju, umesto toga upotrebite ove linkove:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kupite mi kafu](https://buymeacoffee.com/bitranox)

---

Donacije su dobrovoljne; nema zaključavanja funkcionalnosti.

---

## Vidljivost donacija (90‑dnevno odlaganje)

Dodatak uključuje pogodnost da privremeno sakrije podsetnike za donaciju nakon što ste donirali.

- Gde se nalazi
  - Opcije → odeljak Podrška: videćete dugme "Donirao/la sam" i malo područje sa napomenom.
  - Dijalog potvrde slanja takođe prikazuje dugme "Doniraj"; ono se automatski skriva kada je odlaganje aktivno.

- Kako funkcioniše
  - Klik na "Donirao/la sam" skriva dugmad za donaciju i povezane podsetnike na 90 dana.
  - Statusna napomena prikazuje "Skriveno do YYYY‑MM‑DD" (u vašem lokalnom datumu). Tu je i dugme "Prikaži Doniraj ponovo" za trenutno vraćanje vidljivosti.
  - Nakon 90 dana, dugme "Doniraj" ponovo postaje vidljivo automatski.

- Privatnost i čuvanje podataka
  - Dodatak čuva jedan vremenski pečat u Thunderbirdovom lokalnom skladištu da bi zapamtio period odlaganja. Ključ: `donateHideUntil` (milisekunde epohe).
  - Ovo podešavanje je lokalno za vaš Thunderbird profil (nije sinhronizovano u oblaku). Ova funkcija ne upućuje nikakve mrežne zahteve.

- Otklanjanje problema
  - Ako se "Doniraj" i dalje prikazuje odmah nakon što kliknete "Donirao/la sam", sačekajte trenutak ili ponovo otvorite stranicu Opcije; interfejs se ažurira čim se podešavanje sačuva.
  - Da biste ručno resetovali, kliknite "Prikaži Doniraj ponovo". Takođe možete sačekati da istekne datum naveden u napomeni.

Ova funkcija je isključivo radi praktičnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve lične podatke.

---
