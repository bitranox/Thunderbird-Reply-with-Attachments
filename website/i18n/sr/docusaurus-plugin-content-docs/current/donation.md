---
id: donation
title: 'Donacije'
sidebar_label: 'Donacije'
---

## Donacije

import useBaseUrl from '@docusaurus/useBaseUrl';

Ako vam se sviđa "Odgovori s prilozima" i želite podržati njegov razvoj, možete donirati ovde:

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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skener za kupovinu kafe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Hvala! Vaša podrška pomaže u održavanju kompatibilnosti s novim izdanjima Thunderbirda, poboljšanju pristupačnosti i testiranju, kao i u održavanju ažurirane dokumentacije.

Napomene

- Linkovi za donacije se otvaraju samo kada ih kliknete; dodaci ne vrše nikakve pozadinske mrežne zahteve.
- Ponavljajuća podrška pomaže dugoročno održavanje i pravovremena ažuriranja, ali je potpuno opciona.

---

Ako se slike dugmadi ne učitavaju, molimo koristite ove linkove umesto toga:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kupite mi kafu](https://buymeacoffee.com/bitranox)

---

Donacije su dobrovoljne; nema blokiranja funkcionalnosti.

---

## Vidljivost donacija (90-dnevno odlaganje)

Dodatak uključuje funkciju pogodnosti da sakrije poruke o donacijama na kratko vreme nakon što ste donirali.

- Gde je pronaći
  - Opcije → Sekcija podrške: videćete dugme "Donirao sam" i malu hint oblast.
  - Dijalog za slanje potvrde takođe pokazuje dugme za donaciju; automatski se skriva kada je odlaganje aktivno.

- Kako to funkcioniše
  - Klikom na "Donirao sam" skrivaju se dugmad za donaciju i srodne poruke na 90 dana.
  - Statusni hint pokazuje "Skriveno do YYYY-MM-DD" (u vašem lokalnom datumu). Takođe postoji dugme "Ponovo prikaži donaciju" za trenutnu obnovu vidljivosti.
  - Nakon 90 dana, dugme za donaciju ponovo postaje automatski vidljivo.

- Privatnost i skladištenje
  - Dodatak čuva jedan vremenski pečat u lokalnom skladištu Thunderbirda kako bi zapamtilo period odlaganja. Ključ: `donateHideUntil` (epoch milisekundi).
  - Ova postavka je lokalna za vaš Thunderbird profil (nije sinhronizovana u oblak). Ova funkcija ne vrši nikakve mrežne zahteve.

- Rešavanje problema
  - Ako se dugme za donaciju još uvek prikazuje odmah nakon klika na "Donirao sam", sačekajte trenutak ili ponovo otvorite stranicu Opcije; UI se ažurira čim se postavka sačuva.
  - Da biste ručno resetovali, kliknite "Ponovo prikaži donaciju". Takođe možete čekati dok datum naveden u hintu ne prođe.

Ova funkcija je isključivo za pogodnost; nikada ne blokira funkcionalnost dodatka i ne prikuplja nikakve lične podatke.

---
