---
id: donation
title: 'Fes una donació'
sidebar_label: 'Fes un donatiu'
---

---

## Fes un donatiu

import useBaseUrl from '@docusaurus/useBaseUrl';

Si us agrada "Reply with Attachments" i voleu donar suport al seu desenvolupament, podeu fer un donatiu aquí:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Fes un donatiu mitjançant Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Fes un donatiu mitjançant PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Convida'm a un cafè" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Escaneja per convidar-me a un cafè"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Gràcies! El vostre suport ajuda a mantenir la compatibilitat amb les noves versions de Thunderbird, a millorar l'accessibilitat i les proves, i a mantenir la documentació al dia.

Notes

- Els enllaços de donatius només s'obren quan hi feu clic; el complement no fa cap sol·licitud de xarxa en segon pla.
- El suport periòdic ajuda al manteniment a llarg termini i a les actualitzacions puntuals, però és totalment opcional.

---

Si els botons d'imatge no es carreguen, si us plau, utilitzeu aquests enllaços en el seu lloc:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Els donatius són voluntaris; no hi ha cap funció restringida.

---

## Visibilitat del donatiu (ajornament de 90 dies)

El complement inclou una funció pràctica per amagar els avisos de donatius durant un temps després de fer un donatiu.

- On trobar-la
  - Opcions → secció Suport: veureu un botó “He fet un donatiu” i una petita àrea d’indicació.
  - El diàleg de confirmació d’enviament també mostra un botó Donatiu; s’amaga automàticament quan l’ajornament és actiu.

- Com funciona
  - En fer clic a “He fet un donatiu”, s’amaguen els botons de donatius i els avisos relacionats durant 90 dies.
  - Una indicació d’estat mostra “Amagat fins a YYYY‑MM‑DD” (en la vostra data local). També hi ha un botó “Torna a mostrar Donatiu” per restablir la visibilitat immediatament.
  - Després de 90 dies, el botó Donatiu torna a ser visible automàticament.

- Privadesa i emmagatzematge
  - El complement desa una sola marca de temps a l’emmagatzematge local de Thunderbird per recordar el període d’ajornament. Clau: `donateHideUntil` (mil·lisegons d’època).
  - Aquest paràmetre és local al vostre perfil de Thunderbird (no es sincronitza al núvol). Aquesta funció no fa cap sol·licitud de xarxa.

- Resolució de problemes
  - Si el botó Donatiu encara es mostra just després de fer clic a “He fet un donatiu”, espereu un moment o torneu a obrir la pàgina d’Opcions; la interfície s’actualitza tan aviat com es desa el paràmetre.
  - Per restablir-ho manualment, feu clic a “Torna a mostrar Donatiu”. També podeu esperar fins que passi la data indicada a la indicació.

Aquesta funció és purament per comoditat; mai no bloqueja la funcionalitat del complement ni recull cap dada personal.

---
