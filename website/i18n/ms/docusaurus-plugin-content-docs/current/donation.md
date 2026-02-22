---
id: donation
title: 'Derma'
sidebar_label: 'Derma'
---

---

## Derma

import useBaseUrl from '@docusaurus/useBaseUrl';

Jika anda suka "Reply with Attachments" dan mahu menyokong pembangunannya, anda boleh menderma di sini:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Derma melalui Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>atau</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Derma melalui PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>atau</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Belikan saya kopi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Imbas untuk belikan saya kopi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Terima kasih! Sokongan anda membantu mengekalkan keserasian dengan keluaran Thunderbird baharu, menambah baik kebolehcapaian dan ujian, serta memastikan dokumentasi sentiasa terkini.

Nota

- Pautan derma hanya dibuka apabila anda mengkliknya; pengaya tidak membuat sebarang permintaan rangkaian di latar belakang.
- Sokongan berulang membantu penyelenggaraan jangka panjang dan kemas kini tepat pada masanya, tetapi adalah sepenuhnya pilihan.

---

Jika butang imej tidak dimuatkan, sila gunakan pautan berikut sebagai gantinya:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Derma adalah sukarela; tiada ciri yang dikunci di sebalik derma.

---

## Keterlihatan Derma (penangguhan 90 hari)

Pengaya ini menyertakan ciri kemudahan untuk menyembunyikan gesaan derma buat sementara waktu selepas anda menderma.

- Di mana untuk menemuinya
  - Pilihan → bahagian Sokongan: anda akan melihat butang “Saya telah menderma” dan kawasan petunjuk kecil.
  - Dialog Pengesahan Penghantaran turut memaparkan butang Derma; ia akan tersembunyi secara automatik apabila penangguhan aktif.

- Cara ia berfungsi
  - Mengklik “Saya telah menderma” menyembunyikan butang derma dan gesaan berkaitan selama 90 hari.
  - Petunjuk status memaparkan “Disembunyikan sehingga YYYY‑MM‑DD” (mengikut tarikh setempat anda). Terdapat juga butang “Tunjukkan Derma semula” untuk memulihkan keterlihatan serta‑merta.
  - Selepas 90 hari, butang Derma akan kelihatan semula secara automatik.

- Privasi & storan
  - Pengaya ini menyimpan satu penanda masa dalam storan tempatan Thunderbird untuk mengingati tempoh penangguhan. Kunci: `donateHideUntil` (milisaat epoch).
  - Tetapan ini adalah setempat pada profil Thunderbird anda (tidak disegerakkan awan). Tiada permintaan rangkaian dibuat oleh ciri ini.

- Penyelesaian masalah
  - Jika Derma masih dipaparkan sejurus selepas mengklik “Saya telah menderma”, tunggu seketika atau buka semula halaman Pilihan; UI akan dikemas kini sebaik sahaja tetapan disimpan.
  - Untuk set semula secara manual, klik “Tunjukkan Derma semula”. Anda juga boleh menunggu sehingga tarikh yang disenaraikan dalam petunjuk berlalu.

Ciri ini semata‑mata untuk kemudahan; ia tidak pernah menyekat kefungsian pengaya dan tidak mengumpul sebarang data peribadi.

---
