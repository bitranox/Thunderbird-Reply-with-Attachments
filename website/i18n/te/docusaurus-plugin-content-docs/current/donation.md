---
id: donation
title: 'విరాళం ఇవ్వండి'
sidebar_label: 'దానం చేయండి'
---

---

## విరాళం

import useBaseUrl from '@docusaurus/useBaseUrl';

మీకు "Reply with Attachments" నచ్చితే మరియు దాని అభివృద్ధికి మద్దతు ఇవ్వాలని అనుకుంటే, ఇక్కడ విరాళం ఇవ్వవచ్చు:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donate via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>or</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donate via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>or</div>
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan to buy me a coffee"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

ధన్యవాదాలు! మీ మద్దతు కొత్త Thunderbird విడుదలలతో అనుకూలతను నిలబెట్టడానికి, యాక్సెస్‌బిలిటీ మరియు పరీక్షలను మెరుగుపరచడానికి, మరియు డాక్యుమెంటేషన్‌ను తాజాగాను ఉంచడానికి సహాయపడుతుంది.

గమనికలు

- విరాళం లింకులు మీరు క్లిక్ చేసినప్పుడు మాత్రమే తెరుస్తాయి; యాడ్‑ఆన్ ఎలాంటి బ్యాక్‌గ్రౌండ్ నెట్‌వర్క్ అభ్యర్థనలు చేయదు.
- పునరావృత మద్దతు దీర్ఘకాల నిర్వహణకు మరియు సమయానుకూల అప్డేట్‌లకు సహాయపడుతుంది, అయితే అది పూర్తిగా ఐచ్చికం.

---

ఇమేజ్ బటన్‌లు లోడ్ కాకపోతే, దయచేసి బదులుగా ఈ లింక్‌లను ఉపయోగించండి:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

విరాళాలు స్వచ్ఛందం; ఫీచర్ పరిమితులు లేవు.

---

## విరాళ సూచనల కనిపించడం (90‑రోజుల స్నూస్)

మీరు విరాళం ఇచ్చిన తరువాత కొంతకాలం పాటు విరాళ సూచనలను దాచేందుకు యాడ్‑ఆన్‌లో ఒక సౌలభ్య ఫీచర్ ఉంటుంది.

- దాన్ని ఎక్కడ కనుగొనాలి
  - Options → Support విభాగంలో: మీరు “I donated” బటన్ మరియు చిన్న సూచన ప్రాంతాన్ని చూస్తారు.
  - Send‑confirmation డైలాగ్‌లో కూడా Donate బటన్ కనిపిస్తుంది; స్నూస్ సక్రియంగా ఉన్నప్పుడు అది ఆటోమేటిక్‌గా దాచబడుతుంది.

- ఇది ఎలా పనిచేస్తుంది
  - “I donated” క్లిక్ చేయగానే విరాళ బటన్‌లు మరియు సంబంధిత సూచనలు 90 రోజులు దాచబడతాయి.
  - స్థితి సూచనలో “Hidden until YYYY‑MM‑DD” (మీ స్థానిక తేదీ ప్రకారం) అని చూపుతుంది. వెంటనే మళ్లీ కనిపించేందుకు “Show Donate again” బటన్ కూడా ఉంటుంది.
  - 90 రోజులు తర్వాత, Donate బటన్ మళ్లీ ఆటోమేటిక్‌గా కనిపిస్తుంది.

- గోప్యత మరియు నిల్వ
  - స్నూస్ వ్యవధిని గుర్తుంచుకోవడానికి యాడ్‑ఆన్ Thunderbird యొక్క లోకల్ స్టోరేజ్‌లో ఒకే టైమ్‌స్టాంప్‌ను భద్రపరుస్తుంది. కీ: `donateHideUntil` (epoch milliseconds).
  - ఈ సెట్టింగ్ మీ Thunderbird ప్రొఫైల్‌కే స్థానికం (క్లౌడ్‌తో సింక్ చేయబడదు). ఈ ఫీచర్ ఎలాంటి నెట్‌వర్క్ అభ్యర్థనలు చేయదు.

- సమస్య పరిష్కారం
  - “I donated” క్లిక్ చేసిన వెంటనే కూడా Donate కనిపిస్తూనే ఉంటే, కాసేపు వేచి ఉండండి లేదా Options పేజీని మళ్లీ తెరవండి; సెట్టింగ్ సేవ్ అయిన వెంటనే UI అప్‌డేట్ అవుతుంది.
  - మాన్యువల్‌గా రీసెట్ చేయడానికి, “Show Donate again” క్లిక్ చేయండి. సూచనలో చూపిన తేదీ దాటే వరకు కూడా వేచి ఉండవచ్చు.

ఈ ఫీచర్ పూర్తిగా సౌలభ్యం కోసం మాత్రమే; ఇది ఎప్పుడూ యాడ్‑ఆన్ పనితీరును అడ్డుకోదు మరియు ఎటువంటి వ్యక్తిగత డేటాను సేకరించదు.

---
