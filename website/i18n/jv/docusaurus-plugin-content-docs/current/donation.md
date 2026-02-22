---
id: donation
title: 'Nyumbang'
sidebar_label: 'Nyumbang'
---

---

## Nyumbang

import useBaseUrl from '@docusaurus/useBaseUrl';

Yen sampeyan seneng "Reply with Attachments" lan kepengin ndhukung pangembangane, sampeyan bisa nyumbang ing kéné:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Nyumbang liwat Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>utawa</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Nyumbang liwat PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>utawa</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Tukuaké aku kopi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Pindhai kanggo tukuaké aku kopi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Matur nuwun! Dhukungan sampeyan mbiyantu njaga kompatibilitas karo rilis Thunderbird anyar, ningkataké aksesibilitas lan tes, lan njaga dokumentasi tetep dianyari.

Cathetan

- Pranala donasi mung mbukak nalika sampeyan ngeklik; add‑on ora nindakake panyuwunan jaringan ing latar mburi.
- Dhukungan rutin mbantu pangopènan jangka panjang lan nganyari pas wektune, nanging iki sakabehé opsional.

---

Yèn tombol gambar ora bisa memuat, gunakna pranala iki waé:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy Me a Coffee](https://buymeacoffee.com/bitranox)

---

Donasi iku sukarela; ora ana fitur sing dikunci.

---

## Katoné Donasi (ngaso 90 dina)

Add‑on iki nyedhiyakake fitur penak kanggo ndhelikaké pènget donasi sajrone sawetara wektu sakwisé sampeyan nyumbang.

- Ing ngendi goleké
  - Options → bagean Support: sampeyan bakal weruh tombol “I donated” lan pérangan cilik kanggo pituduh.
  - Dialog konfirmasi pangiriman uga nuduhaké tombol Donate; bakal otomatis ndhelik nalika snooze aktif.

- Carané makarya
  - Ngeklik “I donated” bakal ndhelikaké tombol donasi lan pèpéling/panjalukan sing gegandhèngan sajrone 90 dina.
  - Pituduh status nuduhaké “Hidden until YYYY‑MM‑DD” (miturut tanggal lokal sampeyan). Uga ana tombol “Show Donate again” kanggo mulihaké katoné kanthi cepet.
  - Sawisé 90 dina, tombol Donate bakal katon maneh kanthi otomatis.

- Privasi lan panyimpenan
  - Add‑on nyimpen siji timestamp ing panyimpenan lokalé Thunderbird kanggo éling wektu snooze. Kunci: `donateHideUntil` (milidetik epoch).
  - Setelan iki lokal tumrap profil Thunderbird sampeyan (ora disinkronaké liwat méga). Ora ana panyuwunan jaringan sing digawe déning fitur iki.

- Ngatasi masalah
  - Yèn Donate isih katon sakwisé ngeklik “I donated”, enteni sedhela utawa bukak manèh kaca Options; antarmuka bakal nganyari sakwisé setelan kasimpen.
  - Kanggo nyetel ulang kanthi manual, klik “Show Donate again”. Sampeyan uga bisa ngenteni nganti tanggal sing kasebut ing pituduh kuwi liwat.

Fitur iki mung kanggo penak; ora tau ngalangi fungsionalitas add‑on lan ora nglumpukaké data pribadi apa-apa.

---
