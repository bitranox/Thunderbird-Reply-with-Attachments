---
id: donation
title: 'Perekani'
sidebar_label: 'Perekani'
---

---

## Perekani

import useBaseUrl from '@docusaurus/useBaseUrl';

Ngati mumakonda "Reply with Attachments" ndipo mukufuna kuthandiza chitukuko chake, mutha kupereka pano:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Perekani kudzera mu Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>kapena</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Perekani kudzera mu PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>kapena</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Ndigulireni khofi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skanani kuti mundigulire khofi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Zikomo! Thandizo lanu limathandiza kusunga kugwirizana ndi zotulutsidwa zatsopano za Thunderbird, kukonza kufikika ndi mayeso, komanso kusunga zolemba zikhale zosinthidwa nthawi zonse.

Zindikirani

- Maulalo a zopereka amatseguka pokhapokha mukawadina; zowonjezera sizimapanga mapempho aliwonse a pa intaneti kumbuyo.
- Thandizo lobwerezabwereza limathandiza kusamalira kwa nthawi yaitali ndi zosintha pa nthawi yake, koma ndilosankha mokha.

---

Ngati mabatani a zithunzi sakutsegula, chonde gwiritsani ntchito maulalo awa m'malo mwake:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Zopereka ndi za kufuna kwanu; palibe kutsekereza mbali za pulogalamu.

---

## Kuwoneka kwa Zopereka (kusiyira kwakanthawi kwa masiku 90)

Zowonjezera zimaphatikiza mbali yothandiza yobisa mawu a zopereka kwa kanthawi mutangopereka.

- Mungazipeze kuti
  - Zosankha → gawo la Thandizo: muwona batani la “I donated” ndi malo ang'ono a malangizo.
  - Zenera la chitsimikizo cha Kutumiza limasonyezanso batani la Donate; limabisika lokha pamene kusiyira kwakanthawi kwayatsidwa.

- Momwe zimagwirira ntchito
  - Kudina “I donated” kumabisa mabatani a zopereka ndi mawu ogwirizana kwa masiku 90.
  - Chizindikiro cha momwe zilili chimasonyeza “Hidden until YYYY‑MM‑DD” (tsiku lanu la m’deralo). Palinso batani la “Show Donate again” lobwezeretsa kuoneka nthawi yomweyo.
  - Pambuyo pa masiku 90, batani la Donate limawonekanso lokha.

- Zinsinsi ndi kusungirako
  - Zowonjezera zimasunga timestamp imodzi mu kusungirako kwa m'deralo kwa Thunderbird kuti zikumbukire nthawi ya kusiyira kwakanthawi. Kiyi: `donateHideUntil` (epoch milliseconds).
  - Kusintha kumeneku kuli kwa mbiri yanu ya Thunderbird yokha (sikusinthidwa ndi mtambo). Palibe mapempho a pa intaneti omwe amachitika ndi mbali imeneyi.

- Kukonza mavuto
  - Ngati Donate ikadali ikuwoneka mutangodina “I donated”, dikirani pang’ono kapena tsegulani tsamba la Zosankha kachiwiri; mawonekedwe (UI) amasinthidwa nthawi yomweyo atasungidwa kusinthako.
  - Kuti mubwezeretse pamanja, dinani “Show Donate again”. Mungadikirenso mpaka tsiku lolembedwa mu malangizo lidutse.

Mbali imeneyi ndi ya kupindulitsa kokha; siimalepheretsa ntchito ya zowonjezera ndipo siisonkhanitsa deta iliyonse yaumwini.

---
