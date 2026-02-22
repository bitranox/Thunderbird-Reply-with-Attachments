---
id: donation
title: 'Donasi'
sidebar_label: 'Donasi'
---

---

## Donasi

import useBaseUrl from '@docusaurus/useBaseUrl';

Jika Anda menyukai "Reply with Attachments" dan ingin mendukung pengembangannya, Anda dapat berdonasi di sini:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donasi via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>atau</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donasi via PayPal" width="320" height="64"
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Pindai untuk membelikan saya kopi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Terima kasih! Dukungan Anda membantu menjaga kompatibilitas dengan rilis Thunderbird terbaru, meningkatkan aksesibilitas dan pengujian, serta menjaga dokumentasi tetap mutakhir.

Catatan

- Tautan donasi hanya terbuka saat Anda mengkliknya; pengaya tidak melakukan permintaan jaringan di latar belakang.
- Dukungan berulang membantu pemeliharaan jangka panjang dan pembaruan tepat waktu, namun sepenuhnya opsional.

---

Jika tombol gambar tidak dimuat, silakan gunakan tautan berikut sebagai gantinya:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donasi bersifat sukarela; tidak ada pembatasan fitur.

---

## Visibilitas Donasi (tunda 90‑hari)

Pengaya ini menyertakan fitur kenyamanan untuk menyembunyikan ajakan donasi untuk sementara setelah Anda berdonasi.

- Di mana menemukannya
  - Bagian Options → Support: Anda akan melihat tombol “I donated” dan area petunjuk kecil.
  - Dialog Send‑confirmation juga menampilkan tombol Donate; tombol tersebut otomatis tersembunyi saat penundaan aktif.

- Cara kerjanya
  - Mengklik “I donated” menyembunyikan tombol donasi dan ajakan terkait selama 90 hari.
  - Petunjuk status menampilkan “Hidden until YYYY‑MM‑DD” (dalam tanggal lokal Anda). Ada juga tombol “Show Donate again” untuk segera memulihkan visibilitas.
  - Setelah 90 hari, tombol Donate akan terlihat kembali secara otomatis.

- Privasi & penyimpanan
  - Pengaya menyimpan satu cap waktu di penyimpanan lokal Thunderbird untuk mengingat periode penundaan. Kunci: `donateHideUntil` (milidetik epoch).
  - Pengaturan ini bersifat lokal untuk profil Thunderbird Anda (tidak disinkronkan ke cloud). Fitur ini tidak membuat permintaan jaringan apa pun.

- Pemecahan masalah
  - Jika Donate masih muncul tepat setelah mengklik “I donated”, tunggu sebentar atau buka kembali halaman Options; antarmuka akan diperbarui segera setelah pengaturan disimpan.
  - Untuk menyetel ulang secara manual, klik “Show Donate again”. Anda juga bisa menunggu hingga tanggal yang tercantum pada petunjuk tersebut terlewati.

Fitur ini murni untuk kenyamanan; tidak pernah memblokir fungsi pengaya dan tidak mengumpulkan data pribadi apa pun.

---
