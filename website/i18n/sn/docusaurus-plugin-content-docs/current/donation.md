---
id: donation
title: 'Ipa Mupiro'
sidebar_label: 'Ipa mupiro'
---

---

## Pira

import useBaseUrl from '@docusaurus/useBaseUrl';

Kana uchida "Reply with Attachments" uye uchida kutsigira kugadzirwa kwacho, unogona kupira pano:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Pira mari kuburikidza neStripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>kana</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Pira mari kuburikidza nePayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>kana</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Nditengere kofi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skana kuti unditengere kofi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Ndatenda! Rutsigiro rwenyu runobatsira kuchengetedza kuenderana nezvaburitswa zvitsva zveThunderbird, kuvandudza kuwanikwa (accessibility) nemiedzo, uye kuchengeta magwaro achivandudzwa nguva nenguva.

Zvakakosha

- Zvinongedzo zvekupira zvinongovhura chete kana ukazvidhinda; wedzero haina kuita zvikumbiro zvenetiweki zviri kumashure.
- Rutsigiro runodzokororwa runobatsira kuchengetedza kwenguva refu nekuvandudzwa nenguva, asi ndeyekuzvidira zvachose.

---

Kana mabhatani emifananidzo asina kurodha, ndapota shandisa zvinongedzo izvi pachinzvimbo:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Nditengere Kofi](https://buymeacoffee.com/bitranox)

---

Mipiro ndeyokuzvidira; hapana mashandiro anovharirwa.

---

## Kuonekwa kweMipiro (kumbomisa kwemazuva 90)

Wedzero iyi ine chinhu chekurerutsa chinovanza kurudziro dzekupa kwechinguva mushure mekunge wapa.

- Kwarinowanikwa
  - Zvirongwa → chikamu cheRubatsiro: uchaona bhatani rinoti “Ndakapira” nenzvimbo diki yechiziviso.
  - Dialog rekuvimbisa kutumira rinoratidzawo bhatani rePira; rinovanzika roga kana kumbomisa kuri kushanda.

- Maitiro azvinoita
  - Kudzvanya “Ndakapira” kunovanza mabhatani emipiro nezvimwe zvikumbiro zvine chekuita nazvo kwemazuva 90.
  - Chiratidzo chemamiriro chinoratidza “Chakavanzwa kusvikira YYYY‑MM‑DD” (mune zuva remuno). Panewo bhatani rinoti “Ratidza Pira zvakare” kuti udzorere kuoneka ipapo ipapo.
  - Pashure pemazuva 90, bhatani rePira rinodzoka rooneka roga.

- Zvakavanzika & kuchengetwa
  - Wedzero iyi inochengeta timestamp imwe chete mudura remuno reThunderbird kuti irangarire nguva yekumbomisa. Kiyi: `donateHideUntil` (mamillisekondi e-epoch).
  - Iri gadziriro yemuno kuprofile yako yeThunderbird (haisi kuwiriraniswa negore). Hapana zvikumbiro zvenetiweki zvinoitwa nebasa iri.

- Kugadzirisa matambudziko
  - Kana Pira richiri kuratidza pakarepo mushure mekudzvanya “Ndakapira”, mirira chidiki kana uvhure zvekare peji reZvirongwa; UI inogadzirisa pakarepo kana marongero achengetwa.
  - Kuti ureseti nemaoko, dzvanya “Ratidza Pira zvakare”. Unogonawo kumirira kusvikira zuva rinotaurwa muchiziviso rapfuura.

Chinhu ichi ndechekurerutsa chete; hachimbovharira mashandiro ewedzero uye hachiunganidzi chero ruzivo rwega.

---
