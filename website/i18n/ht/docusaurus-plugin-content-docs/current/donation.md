---
id: donation
title: 'Donasyon'
sidebar_label: 'Donasyon'
---

## Donasyon

import useBaseUrl from '@docusaurus/useBaseUrl';

Si ou renmen "Reponn ak Atachman" epi ou vle sipòte devlopman li, ou ka fè don isit la:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Fè don atravè Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oswa</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Fè don atravè PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oswa</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Achte m yon kafe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Eskane pou achte m yon kafe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Mèsi! Sipò ou ede mentni konpatibilite ak nouvo vèsyon Thunderbird, amelyore aksesibilite ak tès, epi kenbe dokiman an ajou.

Nòt

- Lyen don yo louvri sèlman lè ou klike sou yo; add-on nan pa fè okenn demann rezo nan background.
- Sipò repete ede mentni alontèm ak ajou alè, men li antyèman opsyonèl.

---

Si bouton imaj yo pa chaje, tanpri itilize lyen sa yo olye:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Achte m yon Kafe](https://buymeacoffee.com/bitranox)

---

Donasyon yo se volontè; pa gen okenn blokaj sou karakteristik.

---

## Vizibilite Donasyon (snooze 90 jou)

Add-on nan gen yon karakteristik pratik pou kache pwomotè donasyon pou yon ti tan apre ou fin fè don.

- Kote pou jwenn li
  - Opsyon → Seksyon Sipò: ou pral wè yon bouton "Mwen fè don" ak yon ti zòn endikasyon.
  - Dyalo kopi voye a montre yon bouton Donasyon; li otomatikman kache lè snooze a aktif.

- Kijan sa mache
  - Klike sou "Mwen fè don" kache bouton donasyon ak pwomotè ki gen rapò pou 90 jou.
  - Yon endikasyon estati montre "Kache jouk YYYY‑MM‑DD" (nan dat lokal ou). Genyen tou yon bouton "Montre Donasyon ankò" pou retabli vizibilite imedyatman.
  - Apre 90 jou, bouton Donasyon an wè otomatikman ankò.

- Privatete & depo
  - Add-on nan estoke yon sèl timestamp nan depo lokal Thunderbird pou sonje peryòd snooze la. Kle: `donateHideUntil` (milisani epoch).
  - Paramèt sa a lokal pou pwofil Thunderbird ou (pa senkronize nan nwaj). Pa gen demann rezo ki fèt pa karakteristik sa a.

- Rezoud pwoblèm
  - Si Donasyon an toujou montre jis apre ou klike sou "Mwen fè don", tann yon moman oswa relanse paj Opsyon yo; UI a ap mete ajou dèske paramèt la sove.
  - Pou réinitialisé manyèlman, klike sou "Montre Donasyon ankò". Ou ka tou tann jouk dat ki anrejistre nan endikasyon an pase.

Karakteristik sa a se sèlman pou pratik; li pa janm bloke fonksyonalite add-on lan epi li pa kolekte okenn done pèsonèl.
