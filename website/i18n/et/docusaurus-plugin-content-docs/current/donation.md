---
id: donation
title: 'Anneta'
sidebar_label: 'Anneta'
---

---

## Anneta

import useBaseUrl from '@docusaurus/useBaseUrl';

Kui sulle meeldib "Reply with Attachments" ja soovid selle arendust toetada, saad siin annetada:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Anneta Stripe'i kaudu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>või</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Anneta PayPali kaudu" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>või</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Osta mulle kohv" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skanni, et osta mulle kohv"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Aitäh! Sinu toetus aitab säilitada ühilduvust Thunderbirdi uute väljalasetega, parandada ligipääsetavust ja teste ning hoida dokumentatsiooni ajakohasena.

Märkused

- Annetuslingid avanevad ainult siis, kui neile klõpsad; lisandmoodul ei tee taustal võrgupäringuid.
- Korduv tugi aitab pikaajalist hooldust ja õigeaegseid uuendusi, kuid on täiesti vabatahtlik.

---

Kui pildinupud ei lae, kasuta palun nende asemel neid linke:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy Me a Coffee](https://buymeacoffee.com/bitranox)

---

Annetused on vabatahtlikud; funktsioone ei lukustata.

---

## Annetuste nähtavus (90‑päevane peitmine)

Lisandmoodul sisaldab mugavusfunktsiooni, mis peidab annetuse meeldetuletused mõneks ajaks pärast seda, kui oled annetanud.

- Kust seda leida
  - Sätted → Toe jaotis: näed nuppu „Ma annetasin” ja väikest vihjevälja.
  - Saatmise kinnituse dialoogis kuvatakse samuti Anneta-nupp; see peidetakse automaatselt, kui peitmine on aktiivne.

- Kuidas see töötab
  - „Ma annetasin” klõpsamine peidab 90 päevaks annetusnupud ja seotud teated.
  - Olekuvihje näitab „Peidetud kuni YYYY‑MM‑DD” (sinu kohaliku kuupäevana). Samuti on olemas nupp „Kuva Anneta uuesti”, mis taastab nähtavuse kohe.
  - 90 päeva möödudes muutub Anneta-nupp taas automaatselt nähtavaks.

- Privaatsus ja salvestus
  - Lisandmoodul salvestab Thunderbirdi kohalikku salvestusse ühe ajatempli, et meeles pidada peitmisperioodi. Võti: `donateHideUntil` (epohhi millisekundid).
  - See säte on sinu Thunderbirdi profiilile kohalik (pilves ei sünkroonita). See funktsioon ei tee ühtegi võrgupäringut.

- Tõrkeotsing
  - Kui Anneta on endiselt nähtav kohe pärast „Ma annetasin” klõpsamist, oota hetk või ava Sätete leht uuesti; kasutajaliides uueneb niipea, kui säte on salvestatud.
  - Käsitsi lähtestamiseks klõpsa „Kuva Anneta uuesti”. Võid ka oodata, kuni vihjes kuvatud kuupäev kätte jõuab.

See funktsioon on puhtalt mugavuse jaoks; see ei blokeeri kunagi lisandmooduli funktsionaalsust ega kogu isikuandmeid.

---
