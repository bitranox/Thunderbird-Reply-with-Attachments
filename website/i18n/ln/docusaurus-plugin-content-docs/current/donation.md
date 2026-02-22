---
id: donation
title: 'Pesa likabo'
sidebar_label: 'Pesa likabo'
---

---

## Pesa lisungi

import useBaseUrl from '@docusaurus/useBaseUrl';

Soki olingi "Reply with Attachments" mpe olingi kosunga bokelami na yango, okoki kopesa lisungi awa:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Pesa lisungi na nzela ya Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>to</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Pesa lisungi na nzela ya PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>to</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy me a coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skana mpo na kosomba ngai kafe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Matondo! Lisungi na yo esalisaka kobatela boyokanisi na mabimisi ya sika ya Thunderbird, kobongisa kokɔtama mpasi te (accessibility) mpe ba test, mpe kobatela bokomeli ya ndakisa ntango nyonso.

Noti

- Ba lien ya kopesa lisungi efungwami kaka soki okliki na yango; add‑on esalaka mosala ya réseau na sima-sima te.
- Lisungi ya mbala na mbala esalisaka na bobateli ya long‑term mpe ba mise à jour na ntango, kasi ezali ya bolingi kaka.

---

Soki baputuni ya bilili ebɔtami te, s'il vous plaît salelá ba lien oyo na esika na yango:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Ba don ezali ya bolingi; ezali na kokanga makoki ya ndenge moko te.

---

## Komonana ya lisungi (kopema mikolo 90)

Add‑on ezali na eloko ya kofungisa oyo ebombaka bapusanisi ya kopesa lisungi mpo na mwa tango sima na kopesa na yo.

- Esika ya kozwa yango
  - Options → eteni Support: oko mona bouton “I donated” mpe esika moke ya toli.
  - Dialog Send‑confirmation emonisaka mpe bouton Donate; ebombamaka moko na moko soki snooze ezali na mosala.

- Ndenge esalaka
  - Klik na “I donated” ebombaka baputuni ya lisungi mpe bapusanisi na yango mpo na mikolo 90.
  - Toli ya ezaleli emonisaka “Hidden until YYYY‑MM‑DD” (na mokolo ya lokalɛlɛ na yo). Eza mpe na bouton “Show Donate again” mpo na kozongisa komonana mbala moko.
  - Sima ya mikolo 90, bouton Donate ekómi komonana lisusu na ndenge ya mikebi (automatiquement).

- Privacy & storage
  - Add‑on ebombaka timestamp moko kaka na bobombami ya lokalé ya Thunderbird mpo na kokanisa tango ya snooze. Key: `donateHideUntil` (epoch milliseconds).
  - Paramètre oyo ezali ya lokalé na profil Thunderbird na yo (ezalaka te na kosimbana na nuage). Mosenga ya réseau moko te esalemaka na eloko oyo.

- Kosilisa mikakatano
  - Soki Donate ezali kaka komonana nsima kaka na kokliki “I donated”, zela mwa moke to fungola lisusu lokasa ya Options; UI ebongwanaka mbala moko ntango paramètre ebombami.
  - Mpo na kozongisa mabongisi na maboko, klika “Show Donate again”. Okoki mpe kozela kino mokolo oyo emonisami na toli eleki.

Eloko oyo ezali kaka mpo na kobakisa malamu ya kosalela; ekangaka naino mosala ya add‑on te mpe ezwáká ba données moko te ya moto.

---
