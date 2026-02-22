---
id: donation
title: 'Doniraj'
sidebar_label: 'Doniraj'
---

---

## Donirajte

import useBaseUrl from '@docusaurus/useBaseUrl';

Ako vam se sviđa "Reply with Attachments" i želite podržati njegov razvoj, možete donirati ovdje:

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

Hvala vam! Vaša podrška pomaže održati kompatibilnost sa novim izdanjima Thunderbirda, poboljšati pristupačnost i testove te održavati dokumentaciju ažurnom.

Napomene

- Linkovi za donacije se otvaraju samo kada ih kliknete; dodatak ne obavlja nikakve pozadinske mrežne zahtjeve.
- Ponavljajuća podrška pomaže dugoročno održavanje i pravovremena ažuriranja, ali je u potpunosti neobavezna.

---

Ako se dugmad sa slikama ne učita, molimo koristite ove linkove umjesto toga:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donacije su dobrovoljne; nema ograničavanja funkcionalnosti.

---

## Vidljivost donacija (90‑dnevna odgoda)

Dodatak uključuje praktičnu funkciju za skrivanje podsjetnika na donacije na određeno vrijeme nakon što donirate.

- Gdje ga pronaći
  - Opcije → odjeljak Podrška: vidjet ćete dugme “Donirao/la sam” i malo područje s napomenom.
  - Dijalog potvrde slanja također prikazuje dugme Doniraj; automatski se sakriva kada je odgoda aktivna.

- Kako funkcioniše
  - Klik na “Donirao/la sam” skriva dugmad za doniranje i povezane poruke na 90 dana.
  - Statusna napomena prikazuje “Skriveno do YYYY‑MM‑DD” (u vašem lokalnom datumu). Tu je i dugme “Prikaži Doniraj ponovo” za trenutno vraćanje vidljivosti.
  - Nakon 90 dana, dugme Doniraj ponovo automatski postaje vidljivo.

- Privatnost i pohrana
  - Dodatak pohranjuje jednu vremensku oznaku u Thunderbirdovoj lokalnoj pohrani kako bi zapamtio period odgode. Ključ: `donateHideUntil` (milisekunde epohe).
  - Ova postavka je lokalna za vaš Thunderbird profil (ne sinhronizuje se u oblaku). Ova funkcija ne šalje nikakve mrežne zahtjeve.

- Rješavanje problema
  - Ako se Doniraj i dalje prikazuje odmah nakon klika na “Donirao/la sam”, sačekajte trenutak ili ponovo otvorite stranicu Opcije; korisnički interfejs se ažurira čim se postavka sačuva.
  - Za ručno resetovanje kliknite “Prikaži Doniraj ponovo”. Također možete sačekati da prođe datum naveden u napomeni.

Ova funkcija je isključivo radi praktičnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve lične podatke.

---
