---
id: donation
title: 'Doniraj'
sidebar_label: 'Donirajte'
---

---

## Donirajte

import useBaseUrl from '@docusaurus/useBaseUrl';

Ako vam se sviđa "Reply with Attachments" i želite podržati njegov razvoj, možete donirati ovdje:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donirajte putem Stripea" width="320" height="64"
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
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kupi mi kavu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skenirajte da mi kupite kavu"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Hvala! Vaša podrška pomaže održavati kompatibilnost s novim izdanjima Thunderbirda, poboljšati pristupačnost i testove te održavati dokumentaciju ažurnom.

Napomene

- Poveznice za donaciju otvaraju se samo kada ih kliknete; dodatak ne izvršava nikakve pozadinske mrežne zahtjeve.
- Ponavljajuća podrška pomaže dugoročno održavanje i pravovremena ažuriranja, ali je potpuno opcionalna.

---

Ako se slikovni gumbi ne učitaju, upotrijebite ove poveznice:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donacije su dobrovoljne; nema ograničavanja značajki.

---

## Vidljivost donacija (90‑dnevna odgoda)

Dodatak uključuje praktičnu mogućnost skrivanja poziva na donaciju na neko vrijeme nakon što ste donirali.

- Gdje ga pronaći
  - Mogućnosti → odjeljak Podrška: vidjet ćete “Donirao/la sam” gumb i malo područje sa savjetom.
  - Dijalog potvrde slanja također prikazuje gumb Doniraj; automatski se skriva kada je odgoda aktivna.

- Kako funkcionira
  - Klik na “Donirao/la sam” skriva gumbe za donaciju i povezane upite na 90 dana.
  - Savjet o statusu prikazuje “Skriveno do YYYY‑MM‑DD” (u vašem lokalnom datumu). Postoji i gumb “Ponovno prikaži Doniraj” za trenutačno vraćanje vidljivosti.
  - Nakon 90 dana, gumb Doniraj automatski ponovno postaje vidljiv.

- Privatnost i pohrana
  - Dodatak pohranjuje jednu vremensku oznaku u lokalnu pohranu Thunderbirda kako bi zapamtio razdoblje odgode. Ključ: `donateHideUntil` (milisekunde epohe).
  - Ova je postavka lokalna za vaš Thunderbird profil (ne sinkronizira se u oblaku). Ova značajka ne obavlja nikakve mrežne zahtjeve.

- Otklanjanje poteškoća
  - Ako se Doniraj i dalje prikazuje odmah nakon klika na “Donirao/la sam”, pričekajte trenutak ili ponovno otvorite stranicu Mogućnosti; sučelje se ažurira čim se postavka spremi.
  - Za ručno poništavanje kliknite “Ponovno prikaži Doniraj”. Također možete pričekati dok ne prođe datum naveden u savjetu.

Ova je značajka isključivo radi praktičnosti; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve osobne podatke.

---
