---
id: donation
title: 'Dhuro'
sidebar_label: 'Dhuro'
---

---

## Dhuro

import useBaseUrl from '@docusaurus/useBaseUrl';

Nëse ju pëlqen "Reply with Attachments" dhe dëshironi të mbështesni zhvillimin e tij, mund të dhuroni këtu:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Dhuro përmes Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ose</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Dhuro përmes PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ose</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Më ble një kafe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skano për të më blerë një kafe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Faleminderit! Mbështetja juaj ndihmon të ruhet përputhshmëria me publikimet e reja të Thunderbird, të përmirësohen aksesueshmëria dhe testet, dhe të mbahet dokumentacioni i përditësuar.

Shënime

- Lidhjet e dhurimit hapen vetëm kur i klikoni; shtesa nuk kryen kërkesa rrjeti në prapavijë.
- Mbështetja e përsëritur ndihmon mirëmbajtjen afatgjatë dhe përditësimet në kohë, por është plotësisht opsionale.

---

Nëse butonat me imazhe nuk ngarkohen, ju lutemi përdorni këto lidhje në vend të tyre:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Dhurimet janë vullnetare; nuk ka kufizim veçorish.

---

## Dukshmëria e Dhurimit (pezullim 90-ditor)

Shtesa përfshin një veçori komoditeti për të fshehur nxitjet për dhurim për ca kohë pasi të keni dhuruar.

- Ku ta gjeni
  - Opsionet → Seksioni Mbështetje: do të shihni një buton “Kam dhuruar” dhe një zonë të vogël këshille.
  - Dialogu i konfirmimit të dërgimit shfaq gjithashtu një buton Dhuro; ai fshihet automatikisht kur pezullimi është aktiv.

- Si funksionon
  - Klikimi i “Kam dhuruar” fsheh butonat e dhurimit dhe nxitjet përkatëse për 90 ditë.
  - Një këshillë statusi tregon “Fshehur deri më YYYY‑MM‑DD” (në datën tuaj lokale). Ka gjithashtu një buton “Shfaq sërish Dhuro” për të rikthyer menjëherë dukshmërinë.
  - Pas 90 ditësh, butoni Dhuro bëhet sërish i dukshëm automatikisht.

- Privatësia & ruajtja
  - Shtesa ruan një vulë kohore të vetme në ruajtjen lokale të Thunderbird për të mbajtur mend periudhën e pezullimit. Çelësi: `donateHideUntil` (milisekonda të epokës).
  - Ky rregullim është lokal për profilin tuaj Thunderbird (jo i sinkronizuar në cloud). Kjo veçori nuk kryen asnjë kërkesë në rrjet.

- Zgjidhja e problemeve
  - Nëse Dhuro ende shfaqet menjëherë pasi të klikoni “Kam dhuruar”, prisni një çast ose rihapni faqen Opsionet; ndërfaqja përditësohet sapo të ruhet rregullimi.
  - Për të rivendosur manualisht, klikoni “Shfaq sërish Dhuro”. Mund të prisni gjithashtu derisa të kalojë data e shënuar në këshillë.

Kjo veçori është thjesht për komoditet; nuk bllokon kurrë funksionalitetin e shtesës dhe nuk mbledh asnjë të dhënë personale.

---
