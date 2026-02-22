---
id: donation
title: 'Nye onyinye'
sidebar_label: 'Nye onyinye'
---

---

## Mee onyinye

import useBaseUrl from '@docusaurus/useBaseUrl';

Ọ bụrụ na ọ masịrị gị "Reply with Attachments" ma ịchọrọ ịkwado mmepe ya, ị nwere ike ime onyinye ebe a:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Mee onyinye site na Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ma ọ bụ</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Mee onyinye site na PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ma ọ bụ</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Zụta m kọfị" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Nyochaa iji zụta m kọfị"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Daalụ! Nkwado gị na-enyere aka idobe ịdakọrịta na mwepụta Thunderbird ọhụrụ, ime ka nnweta na ule ka mma, ma na-edobe akwụkwọ nduzi ka ọ dị ọhụrụ.

Ndetu

- Njikọ onyinye na-emeghe naanị mgbe ị pịrị ha; mgbakwunye ahụ anaghị eme arịrịọ netwọkụ ọ bụla n’azụ.
- Nkwado na-eme ugboro ugboro na-enyere nlekọta ogologo oge na mmelite n’oge, ma nke a bụ nhọrọ kpamkpam.

---

Ọ bụrụ na bọtịnụ onyonyo adịghị apụta, biko jiri njikọ ndị a kama:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Onyinye bụ nke onye chọrọ; enweghị egbochi atụmatụ ọ bụla.

---

## Ngosipụta Onyinye (izu ike ụbọchị 90)

Mgbakwunye ahụ nwere atụmatụ dị mfe iji zoo oku onyinye ruo obere oge mgbe ị nyere onyinye.

- Ebee ka ịchọta ya
  - Nhọrọ → ngalaba Nkwado: ị ga-ahụ bọtịnụ “Enyela m onyinye” na obere ebe ntụaka.
  - Mkparịta ụka nkwenye Izipu na-egosikwara bọtịnụ Onyinye; ọ na-ezo onwe ya akpaghị aka mgbe izu ike dị n’ọrụ.

- Otu o si arụ ọrụ
  - Ịpị “Enyela m onyinye” na-ezo bọtịnụ onyinye na oku metụtara ya ruo ụbọchị 90.
  - Ntughintughari ọnọdụ na-egosi “E zoro ruo YYYY‑MM‑DD” (n'ụbọchị mpaghara gị). E nwekwara bọtịnụ “Gosi Onyinye ọzọ” iji weghachite ngosipụta ozugbo.
  - Mgbe ụbọchị 90 gachara, bọtịnụ Onyinye ga-apụta onwe ya ọzọ.

- Nzuzo na nchekwa
  - Mgbakwunye ahụ na-echekwa otu timestamp n’ichekwa mpaghara Thunderbird iji cheta oge izu ike. Igodo: `donateHideUntil` (epoch milliseconds).
  - Ntọala a bụ nke mpaghara n’ime profaịlụ Thunderbird gị (a naghị dakọrịta igwe ojii). Atụmatụ a anaghị eme arịrịọ netwọkụ ọ bụla.

- Idozi nsogbu
  - Ọ bụrụ na Onyinye ka na-egosi ozugbo ị pịrị “Enyela m onyinye”, chere obere oge ma ọ bụ mepee ibe Nhọrọ ọzọ; UI na-emelite ozugbo echekwabara ntọala ahụ.
  - Iji tọọgharịa ya n’aka, pịa “Gosi Onyinye ọzọ”. Ị nwekwara ike ichere ruo ụbọchị egosiri na ntụaka gafee.

Atụmatụ a bụ naanị maka ịdị mfe; ọ naghị egbochi ọrụ mgbakwunye ma ọ naghị anakọta data nkeonwe ọ bụla.

---
