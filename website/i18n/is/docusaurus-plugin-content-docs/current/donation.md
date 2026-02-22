---
id: donation
title: 'Styrkja'
sidebar_label: 'Styrkja'
---

---

## Styrkja

import useBaseUrl from '@docusaurus/useBaseUrl';

Ef þér líkar „Reply with Attachments“ og þú vilt styðja þróun þess, geturðu styrkt hér:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Styrkja með Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eða</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Styrkja með PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eða</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kauptu mér kaffi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skannaðu til að kaupa mér kaffi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Takk! Stuðningurinn þinn hjálpar til við að viðhalda samhæfni við nýjar Thunderbird-útgáfur, bæta aðgengi og prófanir og halda skjölun uppfærðri.

Athugasemdir

- Styrktartenglar opnast aðeins þegar þú smellir á þá; viðbótin framkvæmir engar bakgrunnsnetbeiðnir.
- Endurtekinn stuðningur hjálpar langtímaviðhaldi og tímanlegum uppfærslum, en er algerlega valkvætt.

---

Ef myndhnapparnir hlaðast ekki inn, vinsamlegast notaðu þessa tengla í staðinn:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kauptu mér kaffi](https://buymeacoffee.com/bitranox)

---

Framlög eru valkvæð; engir eiginleikar eru læstir.

---

## Sýnileiki styrkbeiðna (90 daga frestun)

Viðbótin inniheldur þægindaeiginleika til að fela styrkbeiðnir um stund eftir að þú hefur styrkt.

- Hvar finnurðu þetta
  - Valkostir → Stuðningskafli: þú sérð „Ég styrkti“ hnapp og lítið vísbendissvæði.
  - Staðfestingargluggi við sendingu sýnir líka Styrkja-hnapp; hann felst sjálfkrafa þegar frestunin er virk.

- Hvernig þetta virkar
  - Að smella á „Ég styrkti“ felur styrktarhnappa og tengdar ábendingar í 90 daga.
  - Staðuvísbending sýnir „Falið til YYYY‑MM‑DD“ (á þinni staðardagssetningu). Einnig er til hnappurinn „Sýna Styrkja aftur“ til að endurheimta sýnileika strax.
  - Eftir 90 daga verður Styrkja-hnappurinn sjálfkrafa sýnilegur aftur.

- Persónuvernd og geymsla
  - Viðbótin geymir eitt tímamerki í staðbundinni geymslu Thunderbird til að muna frestunartímabilið. Lykill: `donateHideUntil` (epoch-millisekúndur).
  - Þessi stilling er staðbundin fyrir Thunderbird-prófílinn þinn (ekki samstillt í skýinu). Engar netbeiðnir eru framkvæmdar af þessum eiginleika.

- Úrræðaleit
  - Ef Styrkja birtist enn strax eftir að þú ýtir á „Ég styrkti“, bíddu augnablik eða opnaðu aftur Valkostir-síðuna; viðmótið uppfærist um leið og stillingin er vistuð.
  - Til að endurstilla handvirkt skaltu smella á „Sýna Styrkja aftur“. Þú getur líka beðið þar til dagsetningin í vísbendingunni er liðin.

Þessi eiginleiki er eingöngu til þæginda; hann hindrar aldrei virkni viðbótarinnar og safnar engum persónuupplýsingum.

---
