---
id: donation
title: 'Joxe ndimbal'
sidebar_label: 'Joxe ndimbal'
---

---

## Joxe ndimbal

import useBaseUrl from '@docusaurus/useBaseUrl';

Su "Reply with Attachments" la neex te bëgg nga dimbal ay doxalinam, man ngaa joxe fii:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Joxe ci yoonu Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>walla</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Joxe ci yoonu PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>walla</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Joxal ma kafe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan ngir joxal ma kafe"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Jërëjëf! Sa ndimbal mooy dimbal dellu mën a dox ak yeneeni sumb yu beesu Thunderbird, yokkal mën-a-ñu-dukki (accessibility) ak test yi, te tax dokimantaasioŋ bi nekk bu bees.

Tànneef yi

- Lëkkaleku joxe yi dañu ubbeeku rekk soo leen cuqal; mottali bi du def benn laaj lëkkalekaay ci ginnaaw.
- Ndimbal bu dëpp dëpp mooy dimbal denc ak settantal bu yàgg ak yeesal yi ci jamono, waaye dooleel la rekk te fal-fal la.

---

Su butoŋu nataal yi bañ a yeb, jëfandikoolal lëkkaleku yii:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Joxe yi soppaliku la; amul benn tere ci jëf yi.

---

## Wone joxe (suuxal 90 fan)

Mottali bi am na benn jëf buy yombal ngir nëbb ndiggal yi ci joxe bu yàggul ginaaw boo joxe na.

- Fana la ngay gis ko
  - Options → Support section: dina la feeñu benn butoŋ “I donated” ak benn dalal bu ndaw buy jox xibaar.
  - Pencu Send‑confirmation bi itam wone na butoŋ Donate; dina nëbb boppam su suuxal bi dox.

- Naka la mu dox
  - Bu cuqaloo “I donated”, dina nëbb butoŋ yi ak ndiggal yi ci joxe ngir 90 fan.
  - Xibaaru nekkin bi dina wone “Hidden until YYYY‑MM‑DD” (ci sa besu bopp). Am na itam butoŋ “Show Donate again” ngir dellu wone ko leegi-leegi.
  - Ginnaaw 90 fan, butoŋ Donate dina dellu feeñ boppam boppam.

- Sutura ak dencukaay
  - Mottali bi denc na benn timestamp ci dencukaayu Thunderbird bi ngir fàttali jamono suuxal bi. Caabi: `donateHideUntil` (epoch milliseconds).
  - Rëdd gi day toftali ci sa profeel Thunderbird rekk (du cloud‑synced). Jëf ji du def benn laaj lëkkalekaay.

- Taatali jafe-jafe yi
  - Su Donate di feeñ itam ci saa si ngay cuqal “I donated”, naanallal keneen saa walla ubbiwaatal xëtu Options bi; UI bi dina yeesal boppam ba ngay aar rëdd gi.
  - Ngir tàmbaliwaat ak loxo, cuqal “Show Donate again”. Man ngaa it xaar ba bes bi nekkoon ci xibaar bi weesu na.

Jëf ji ngir yombal rekk la; du teg ndigal benn jëf ju mottali bi te duggul dara ci xibaaru bopp.
