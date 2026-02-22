---
id: donation
title: 'Mag-donate'
sidebar_label: 'Mag-donate'
---

---

## Mag-donate

import useBaseUrl from '@docusaurus/useBaseUrl';

Kung gusto mo ang "Reply with Attachments" at nais mong suportahan ang pagpapaunlad nito, maaari kang mag-donate dito:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Mag-donate sa pamamagitan ng Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Mag-donate sa pamamagitan ng PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>o</div>
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

Salamat! Ang iyong suporta ay tumutulong na mapanatili ang pagiging tugma sa mga bagong release ng Thunderbird, mapabuti ang accessibility at mga test, at mapanatiling napapanahon ang dokumentasyon.

Mga Tala

- Bubukas lamang ang mga link sa donasyon kapag i-click mo ang mga ito; hindi gumagawa ang add‑on ng anumang background na network request.
- Ang tuloy-tuloy na suporta ay nakakatulong sa pangmatagalang maintenance at napapanahong updates, ngunit lubos na opsyonal ito.

---

Kung hindi mag-load ang mga button na larawan, pakigamit na lang ang mga link na ito:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Boluntaryo ang mga donasyon; walang pagharang sa mga feature.

---

## Visibility ng Donasyon (90‑araw na snooze)

May kasamang feature ang add‑on para sa kaginhawaan upang maitago ang mga paalala ng donasyon nang ilang sandali matapos kang mag-donate.

- Saan ito makikita
  - Options → seksyong Support: makakakita ka ng button na “I donated” at isang maliit na lugar ng pahiwatig.
  - Ipinapakita rin ng dialog na Send‑confirmation ang button na Donate; awtomatiko itong nagtatago kapag aktibo ang snooze.

- Paano ito gumagana
  - Ang pag-click sa “I donated” ay nagtatago ng mga button ng donasyon at mga kaugnay na prompt sa loob ng 90 araw.
  - May pahiwatig ng status na nagpapakita ng “Hidden until YYYY‑MM‑DD” (sa iyong lokal na petsa). Mayroon ding button na “Show Donate again” upang agad na maibalik ang visibility.
  - Pagkalipas ng 90 araw, muling awtomatikong magiging nakikita ang button na Donate.

- Privacy at imbakan
  - Nagtatabi ang add‑on ng isang timestamp sa lokal na storage ng Thunderbird upang matandaan ang panahon ng snooze. Key: `donateHideUntil` (epoch milliseconds).
  - Ang setting na ito ay lokal sa iyong Thunderbird profile (hindi naka-sync sa cloud). Walang anumang network request na ginagawa ng feature na ito.

- Pag-aayos ng problema
  - Kung nakikita pa rin ang Donate kaagad pagkatapos mong i-click ang “I donated”, maghintay sandali o muling buksan ang pahina ng Options; nag-a-update ang UI sa sandaling masave ang setting.
  - Para i-reset nang mano-manó, i-click ang “Show Donate again”. Maaari ka ring maghintay hanggang lumampas ang petsang nakalista sa pahiwatig.

Ang feature na ito ay para lang sa kaginhawaan; hindi nito kailanman hinaharangan ang paggana ng add‑on at hindi ito nangongolekta ng anumang personal na data.

---
