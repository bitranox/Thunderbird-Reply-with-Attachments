---
id: donation
title: 'Ba da gudummawa'
sidebar_label: 'Ba da gudummawa'
---

---

## Ba da gudummawa

import useBaseUrl from '@docusaurus/useBaseUrl';

Idan kana son "Reply with Attachments" kuma kana son tallafa wa ci gabansa, za ka iya ba da gudummawa a nan:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Ba da gudummawa ta Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ko</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Ba da gudummawa ta PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ko</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Sayi min kofi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skena lambar QR don sayi min kofi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Na gode! Taimakonku yana taimaka wajen kiyaye dacewa da sabbin sigar Thunderbird, inganta damar amfani da gwaje‑gwaje, kuma a ci gaba da sabunta takardun bayanai.

Lura

- Hanyoyin ba da gudummawa suna buɗewa ne kawai idan ka danna su; ƙarin (add‑on) ba ya aika da buƙatun cibiyar sadarwa a bango.
- Tallafin da ake maimaitawa yana taimaka wa kiyayewa na dogon lokaci da sabuntawa a kan lokaci, amma gaba ɗaya na zaɓi ne.

---

Idan maɓallan hoto ba su loda ba, don Allah yi amfani da waɗannan hanyoyin maimakon haka:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Gudummawa na son rai ne; babu takaita fasali.

---

## Bayyanar Gudummawa (dakatarwa na kwanaki 90)

Ƙarin (add‑on) yana ɗauke da fasalin sauƙi don ɓoye tunatarwar gudummawa na ɗan lokaci bayan ka yi gudummawa.

- Inda za a same shi
  - Zaɓuɓɓuka → ɓangaren Taimako: za ka ga maɓallin “Na yi gudummawa” da ƙaramin yanki na shiriya.
  - Tattaunawar tabbatar da aikawa ma tana nuna maɓallin Gudummawa; yana ɓoyuwa ta atomatik idan dakatarwar tana aiki.

- Yadda yake aiki
  - Danna “Na yi gudummawa” yana ɓoye maɓallan gudummawa da saƙonnin da suka shafi hakan na kwanaki 90.
  - Wata alamar matsayi tana nuna “An ɓoye har zuwa YYYY‑MM‑DD” (a ranakun yankinka). Hakanan akwai maɓallin “Nuna Gudummawa kuma” don dawo da bayyanuwa nan da nan.
  - Bayan kwanaki 90, maɓallin Gudummawa zai sake bayyana ta atomatik.

- Sirri da ajiya
  - Ƙarin yana ajiye alamar lokaci guda a ajiyar cikin gida na Thunderbird don tuna lokacin dakatarwa. Maɓalli: `donateHideUntil` (milisekan na epoch).
  - Wannan saitin na cikin bayanin martabarka ta Thunderbird ne kawai (ba ya daidaita da girgije). Wannan fasalin ba ya yin kowace buƙatar hanyar sadarwa.

- Warware matsala
  - Idan Gudummawa har yanzu ta bayyana bayan ka danna “Na yi gudummawa”, jira kaɗan ko buɗe shafin Zaɓuɓɓuka sake; UI zai sabunta da zaran an ajiye saitin.
  - Don sake saita da hannu, danna “Nuna Gudummawa kuma”. Hakanan za ka iya jira har sai ranar da aka nuna a alamar ta wuce.

Wannan fasalin na sauƙi ne kawai; baya toshe aikace‑aikacen ƙarin kuma baya tattara kowace bayanan sirri.

---
