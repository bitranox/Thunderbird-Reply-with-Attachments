---
id: donation
title: 'Donează'
sidebar_label: 'Donează'
---

## Donează

import useBaseUrl from '@docusaurus/useBaseUrl';

Dacă îți place "Reply with Attachments" și vrei să sprijini dezvoltarea sa, poți dona aici:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donează prin Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>sau</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donează prin PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>sau</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Cumpără-mi o cafea" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan to buy me a coffee"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Mulțumim! Sprijinul tău ajută la menținerea compatibilității cu noile versiuni Thunderbird, îmbunătățirea accesibilității și testelor, și menținerea documentației la zi.

Note

- Linkurile de donație se deschid doar atunci când le dai clic; extensia nu efectuează cereri de rețea în fundal.
- Sprijinul recurent ajută la întreținerea pe termen lung și la actualizările în timp util, dar este complet opțional.

---

Dacă butoanele de imagine nu se încarcă, te rugăm să folosești aceste linkuri în schimb:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Cumpără-mi o cafea](https://buymeacoffee.com/bitranox)

---

Donațiile sunt voluntare; nu există restricții pe funcționalități.

---

## Vizibilitatea donației (pauză de 90 de zile)

Extensia include o caracteristică de conveniență pentru a ascunde solicitările de donații pentru o perioadă după ce ai donat.

- Unde să o găsești
  - Opțiuni → Secțiunea de suport: vei vedea un buton „Am donat” și o mică zonă de sugestie.
  - Dialogul de confirmare trimis arată de asemenea un buton Donație; acesta se ascunde automat când pauza este activă.

- Cum funcționează
  - Dând clic pe „Am donat” se ascund butoanele de donație și solicitările aferente timp de 90 de zile.
  - O sugestie de stare arată „Ascuns până la YYYY‑MM‑DD” (în data ta locală). Există de asemenea un buton „Arată din nou Donația” pentru a restabili imediat vizibilitatea.
  - După 90 de zile, butonul Donație devine din nou vizibil automat.

- Confidențialitate și stocare
  - Extensia stochează un singur timestamp în stocarea locală a Thunderbird pentru a-și aminti perioada de pauză. Cheie: `donateHideUntil` (milisecunde epoch).
  - Acest setare este locală pentru profilul tău Thunderbird (nu este sincronizată în cloud). Nu se efectuează cereri de rețea prin această caracteristică.

- Rezolvarea problemelor
  - Dacă Donația încă se arată imediat după ce ai dat clic pe „Am donat”, așteaptă un moment sau redeschide pagina de Opțiuni; UI se actualizează imediat ce setarea este salvată.
  - Pentru a reseta manual, dă clic pe „Arată din nou Donația”. Poți de asemenea să aștepți până când data indicată în sugestie trece.

Această caracteristică este pur pentru conveniență; nu blochează funcționalitatea extensiei și nu colectează date personale.
