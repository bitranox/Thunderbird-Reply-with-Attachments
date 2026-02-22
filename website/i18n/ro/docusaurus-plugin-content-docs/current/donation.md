---
id: donation
title: 'Donează'
sidebar_label: 'Donează'
---

---

## Donează

import useBaseUrl from '@docusaurus/useBaseUrl';

Dacă îți place „Reply with Attachments” și vrei să susții dezvoltarea sa, poți face o donație aici:

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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scanează pentru a-mi cumpăra o cafea"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Mulțumim! Sprijinul tău ajută la menținerea compatibilității cu noile versiuni Thunderbird, la îmbunătățirea accesibilității și a testelor și la menținerea documentației la zi.

Note

- Linkurile de donație se deschid doar când dai clic pe ele; extensia nu efectuează nicio cerere de rețea în fundal.
- Susținerea recurentă ajută la întreținerea pe termen lung și la actualizări la timp, dar este complet opțională.

---

Dacă butoanele imagine nu se încarcă, folosește în schimb aceste linkuri:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Cumpără-mi o cafea](https://buymeacoffee.com/bitranox)

---

Donațiile sunt voluntare; nu există funcționalități condiționate de donație.

---

## Vizibilitatea donației (pauză de 90 de zile)

Extensia include o funcție utilă pentru a ascunde solicitările de donație pentru o vreme după ce ai donat.

- Unde o găsești
  - Opțiuni → secțiunea Suport: vei vedea un buton „Am donat” și o mică zonă cu indicii.
  - Dialogul de confirmare a trimiterii afișează și el un buton Donează; acesta se ascunde automat când pauza este activă.

- Cum funcționează
  - Clic pe „Am donat” ascunde butoanele de donație și mesajele asociate timp de 90 de zile.
  - O indicație de stare afișează „Ascuns până la YYYY‑MM‑DD” (în data locală). Există și un buton „Arată din nou Donează” pentru a restabili imediat vizibilitatea.
  - După 90 de zile, butonul Donează redevine vizibil automat.

- Confidențialitate și stocare
  - Extensia stochează un singur marcaj temporal în stocarea locală a Thunderbird pentru a reține perioada de pauză. Cheie: `donateHideUntil` (milisecunde epoch).
  - Această setare este locală profilului tău Thunderbird (nu este sincronizată în cloud). Această funcție nu efectuează nicio cerere de rețea.

- Depanare
  - Dacă Donează încă apare imediat după ce ai dat clic pe „Am donat”, așteaptă puțin sau redeschide pagina Opțiuni; interfața se actualizează de îndată ce setarea este salvată.
  - Pentru resetare manuală, dă clic pe „Arată din nou Donează”. Poți, de asemenea, să aștepți până trece data afișată în indicație.

Această funcție este doar pentru comoditate; nu blochează niciodată funcționalitatea extensiei și nu colectează date personale.

---
