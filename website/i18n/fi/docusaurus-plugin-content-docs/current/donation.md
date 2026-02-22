---
id: donation
title: 'Lahjoita'
sidebar_label: 'Lahjoita'
---

---

## Lahjoita

import useBaseUrl from '@docusaurus/useBaseUrl';

Jos pidät lisäosasta "Reply with Attachments" ja haluat tukea sen kehitystä, voit lahjoittaa täällä:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Lahjoita Stripen kautta" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>tai</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Lahjoita PayPalin kautta" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>tai</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Osta minulle kahvi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skannaa ostaaksesi minulle kahvin"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Kiitos! Tukesi auttaa ylläpitämään yhteensopivuuden uusien Thunderbird-julkaisujen kanssa, parantamaan saavutettavuutta ja testejä sekä pitämään dokumentaation ajan tasalla.

Huomautuksia

- Lahjoituslinkit avautuvat vain, kun napsautat niitä; lisäosa ei tee taustalla verkkopyyntöjä.
- Toistuva tuki auttaa pitkäaikaisessa ylläpidossa ja ajantasaisissa päivityksissä, mutta on täysin vapaaehtoista.

---

Jos kuvapainikkeet eivät lataudu, käytä sen sijaan näitä linkkejä:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Lahjoitukset ovat vapaaehtoisia; ominaisuuksien käyttöä ei rajoiteta.

---

## Lahjoituskehotusten näkyvyys (90 päivän torkutus)

Lisäosassa on kätevä toiminto, jolla voit piilottaa lahjoituskehotukset joksikin aikaa lahjoituksen jälkeen.

- Mistä löydät sen
  - Asetukset → Tuki-osio: näet “Lahjoitin”-painikkeen ja pienen vihjealueen.
  - Lähetysvahvistusikkuna näyttää myös Lahjoita-painikkeen; se piiloutuu automaattisesti, kun torkutus on aktiivinen.

- Miten se toimii
  - Kun napsautat “Lahjoitin”, lahjoituspainikkeet ja niihin liittyvät kehotukset piilotetaan 90 päivän ajaksi.
  - Tilavihje näyttää merkinnän “Piilotettu asti YYYY‑MM‑DD” (paikallisessa päivämäärämuodossasi). Näkyvyyden voi palauttaa heti “Näytä Lahjoita uudelleen” -painikkeella.
  - 90 päivän jälkeen Lahjoita-painike tulee jälleen automaattisesti näkyviin.

- Yksityisyys ja tallennus
  - Lisäosa tallentaa yhden aikaleiman Thunderbirdin paikalliseen tallennustilaan muistaakseen torkutusjakson. Avain: `donateHideUntil` (epoch millisekunteina).
  - Tämä asetus on paikallinen Thunderbird-profiilillesi (ei pilvisynkronointia). Tämä toiminto ei tee mitään verkkopyyntöjä.

- Vianmääritys
  - Jos Lahjoita on yhä näkyvissä heti “Lahjoitin”-painikkeen napsauttamisen jälkeen, odota hetki tai avaa Asetukset-sivu uudelleen; käyttöliittymä päivittyy heti, kun asetus on tallennettu.
  - Palauttaaksesi manuaalisesti napsauta “Näytä Lahjoita uudelleen”. Voit myös odottaa, kunnes vihjeessä mainittu päivämäärä on ohitettu.

Tämä toiminto on pelkästään mukavuuden vuoksi; se ei koskaan estä lisäosan toimintoja eikä kerää mitään henkilötietoja.

---
