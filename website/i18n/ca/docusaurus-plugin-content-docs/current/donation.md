---
id: donation
title: 'Dona'
sidebar_label: 'Dona'
---

## Dona

import useBaseUrl from '@docusaurus/useBaseUrl';

Si t'agrada "Respondre amb adjunts" i vols donar suport al seu desenvolupament, pots fer una donació aquí:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Dona a través de Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Dona a través de PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Compra'm una tassa de cafè" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Escaneja per comprar-me un cafè"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Gràcies! El teu suport ajuda a mantenir la compatibilitat amb les noves versions de Thunderbird, millorar l'accessibilitat i les proves, i mantenir la documentació actualitzada.

Notes

- Els enllaços de donació s'obren només quan els clics; l'add‑on no realitza cap sol·licitud de xarxa en segon pla.
- El suport recurrent ajuda al manteniment a llarg termini i actualitzacions puntuals, però és totalment opcional.

---

Si els buttons d'imatge no es carreguen, si us plau, utilitza aquests enllaços en canvi:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Compra'm un cafè](https://buymeacoffee.com/bitranox)

---

Les donacions són voluntàries; no hi ha cap bloqueig de funcionalitats.

---

## Visibilitat de Donacions (suspensió de 90 dies)

L'add‑on inclou una característica de comoditat per amagar els avisos de donació durant un temps després que hagis donat.

- On trobar-ho
  - Opcions → Secció de suport: veuràs un botó "He donat" i una petita àrea d'indicació.
  - El diàleg de confirmació d'enviament també mostra un botó de Donació; s'amaga automàticament quan la suspensió està activa.

- Com funciona
  - Clicant "He donat" s'amaguen els botons de donació i els avisos relacionats durant 90 dies.
  - Un avís d'estat mostra "Amagat fins al YYYY‑MM‑DD" (en la teva data local). També hi ha un botó "Mostrar Donació de nou" per restaurar la visibilitat immediatament.
  - Després de 90 dies, el botó de Donació torna a ser visible automàticament.

- Privadesa i emmagatzematge
  - L'add‑on emmagatzema un únic caràcter temporal en l'emmagatzematge local de Thunderbird per recordar el període de suspensió. Clau: `donateHideUntil` (mil·lisegons d'època).
  - Aquesta configuració és local al teu perfil de Thunderbird (no està sincronitzada al núvol). No es realitzen sol·licituds de xarxa per aquesta característica.

- Solució de problemes
  - Si Donació continua mostrant-se just després de fer clic a "He donat", espera un moment o torna a obrir la pàgina d'Opcions; la interfície s'actualitza tan aviat com la configuració es desa.
  - Per restablir manualment, clica "Mostrar Donació de nou". També pots esperar fins que passi la data que apareix a l'avís.

Aquesta característica és purament per comoditat; mai bloqueja la funcionalitat de l'add‑on i no recopila cap dada personal.
