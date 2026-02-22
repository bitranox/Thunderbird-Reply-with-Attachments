---
id: donation
title: 'Wari di'
sidebar_label: 'Dɛmɛ'
---

---

## Ka wari di

import useBaseUrl from '@docusaurus/useBaseUrl';

Ni i bɛ "Reply with Attachments" fɛ ni i b’a dɛmɛ ka a ɲɛsin kɛ, i bɛ se ka wari di n’i yɔrɔ la:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Wari di kɔfɛ Stripe la" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>walima</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Wari di kɔfɛ PayPal la" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>walima</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Kafe di n ma" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scan ka kafe di n ma"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

I ni ce! I ka dɛmɛ b’a dɛmɛ kɛ ka a labɛn ni Thunderbird kɔrɔw kura la, ka jɛya (accessibility) ni siginw ɲɛ, ni ka sɛbɛnniw ɲɛ sisan-sisan.

Nɔtanw

- Dono linkw bɛ bɛna waati dɔrɔn ni i klik k’a kan; add‑on tɛ kɛ netowɔrɔ ɲini kɛ cɛfɔɔra (background) la.
- Dɛmɛ min bɛ sɔrɔ sɔrɔ b’a dɛmɛ baarakɛ dugukolo ɲɛsin ni cogo‑kɛlɛ ɲɛfɔliw la, nka o ye sugu‑sugu ye.

---

Ni butɔn suguw tɛ bɛna, i ka linkwɔrɔw ɲɛ nin de bɔ:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Kafe di n ma](https://buymeacoffee.com/bitranox)

---

Donow ye sugu‑sugu ye; dɔɔninw tɛ tugu kɔ.

---

## Dono-yɛrɛma (tile 90 jɔ)

Add‑on k’a kɔ fɛɛnɛ dɔ min bɛ se ka dono ka fɔlɔw sutura waati dɔ la ni i ka doni kɔ.

- Fɔ fɛ i bɛ a sɔrɔ
  - Options → Support dugukolo la: i bɛ ɲɛ “I donated” butɔn ni kɔnɔntɔn kɔrɔ dɔ.
  - Send‑confirmation dialog bɛna “Donate” butɔn fɛ; o b’a sutura fila‑fila ni jɔ (snooze) bɛ kɛ.

- N’i bɛ a kɛ
  - Ni i klik “I donated” kan, o b’a sutura dono butɔnw ni fɔlɔw minnu bɛ na a kan tile 90 kɔfɛ.
  - Sɛbɛnna ɲɛ fɔlɔ bɛna “Hidden until YYYY‑MM‑DD” ɲɛ (ni i ka sɔgɔsɔn tile kɔnɔ). “Show Donate again” butɔn dɔ bɛna fɛ ka ɲɛrɛma ka sisan‑sisan na.
  - Tile 90 kɔfɛ, “Donate” butɔn bɛna ɲɛrɛma ye don fila‑fila.

- Barɔgɔliya ni jiitou
  - Add‑on bɛ jiitɔgɔ dɔrɔn (timestamp) da Thunderbird ka local storage kɔnɔ ka jɔgɔnya jɔ (snooze) waati ɲini. Key: `donateHideUntil` (epoch milliseconds).
  - Nin tan ni da ye Thunderbird i ka profil kɔnɔ dɔrɔn ye (tɛ cloud‑sync). Fɛɛnɛ nin tɛ na netowɔrɔ ɲini dɔ kɛ.

- Ka sɔrɔ kɔlɔsi
  - Ni “I donated” kan i klik kɔfɛ “Donate” tɛɛna b’a ɲɛ ye, hakɛ i ka sugu dɔ, walima Options pajɛ na a labɛn fɔlɔ; UI bɛna ɲɛsi waati min tɛ a ye ni setingi kɔnɔ tugu kɔ.
  - Ka a danwɔrɔ kɔrɔbɔli ni i bolo, klik “Show Donate again” kan. I bɛ se ka sugu waati dɔ b’a taa ko tile min bɛ ɲɛ fɔlɔ la bɛna taa.

Nin fɛɛnɛ ye ɲɛtabɔli dɔrɔn ye; a tɛ jɔsi add‑on ka baara‑kɛcogo la waati dɔ, a tɛ kɛ ka baarakɔnɔw ɲɛta fɔlɔ dɔ bɔli kɛ.

---
