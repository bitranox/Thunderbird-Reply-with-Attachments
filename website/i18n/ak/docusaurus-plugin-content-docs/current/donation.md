---
id: donation
title: 'Ma akyɛdeɛ'
sidebar_label: 'Bɔ adɔe'
---

---

## Ma akyɛde

import useBaseUrl from '@docusaurus/useBaseUrl';

Sɛ wopɛ "Reply with Attachments" na wopɛ sɛ woboaboa ne n'asesa mu ho, wobetumi ama akyɛde wɔ ha:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Ma akyɛde fa Stripe so" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>anaa</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Ma akyɛde fa PayPal so" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>anaa</div>
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

Meda wo ase! Wo mmoa no boa ma: yɛkora ntotoho a ɛfata Thunderbird ntu-pan foforo ho, yɛma accessibility ne nsɔhwɛ (tests) nya nkɔso, na yɛma nkrataa a ɛkyerɛ ade (documentation) no te nea ɛsɛ te.

Nkyerɛmu

- Links a wɔde ma akyɛde no bɛbue nko ara bere a woklik so; add‑on no nnyɛ ɛntanɛte (network) nkrɛmbisae biara wɔ background.
- Boa a ɛtoa so da so boa ma asiesie tenten ne ntosoɔ bere mu, nanso ɛyɛ apɛ kɛkɛ.

---

Sɛ mfoninibɔtɔnn no remmue a, mesrɛ wo, fa link yi mmom di dwuma:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Akyɛde yɛ apɛ; wonhyɛ mfaso biara ho ban.

---

## Akyɛde ho Nhuahunu (gyae no da 90)

Add‑on no wɔ mfaso ahotɔ bi a ɛma yebetumi asie akyɛde nkae no kakra bere, akyiri deɛ wode ama akyɛde.

- Baabi a wubetumi ahu no
  - Options → Support kyɛmu: wobɛhunu “I donated” bɔtɔne ne akyerɛkyerɛ kɛseketewa bi.
  - Send‑confirmation kɔkɔbɔ nkomo no nso kyerɛ Donate bɔtɔne; ɛde ne ho bɛsie otomatik bere a gyae no (snooze) reyɛ adwuma.

- Ɛyɛ dɛn na ɛyɛ adwuma
  - Sɛ woklik “I donated” a, ɛbɛsie akyɛde bɔtɔn ne nsɔre a ɛfa ho nyinara ma da 90.
  - Akyerɛw a ɛkyerɛ tebea no bɛkyerɛ “Hidden until YYYY‑MM‑DD” (w'ankasa bere-da mu). Wɔwɔ “Show Donate again” bɔtɔne nso a wubetumi de san ma nhunumu no ntɛm ara.
  - Da 90 akyi no, Donate bɔtɔne no bɛda adi otomatik bio.

- Sɛso-ankasa ne sie
  - Add‑on no de timestamp baako pɛ na ɛsie wɔ Thunderbird lokal siebea mu de kae gyae bere no. Key: `donateHideUntil` (epoch milliseconds).
  - Nhyehyɛe yi yɛ wo Thunderbird profail nko ara (wɔnnɔhyɛ amansanmu/cloud). Mfaso yi nnyɛ ɛntanɛte nkrɛmbisae biara.

- Sɛ ɛhaw ba
  - Sɛ Donate da so rekyerɛ ntem ara akyiri a woklik “I donated” no, twɛn kakra anaa bue Options krataafa no bio; UI no bɛto so ntɛm bere a wɔde nhyehyɛe no asie.
  - Sɛ wopɛ sɛ wosan hyɛ no so w'ankasa a, klik “Show Donate again”. Wubetumi nso atwɛn kosi da a wɔkyerɛe wɔ akyerɛkyerɛ no mu bɛtwa mu.

Mfaso yi de ahotɔ pɛ; ɛnkata add‑on adwumayɛ ho kwan da na ɛmboaboa wo ho asɛm biara ano.

---
