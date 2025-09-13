---
id: donation
title: 'Donasi'
sidebar_label: 'Donasi'
---

## Donasi

import useBaseUrl from '@docusaurus/useBaseUrl';

Jika Anda menyukai "Balas dengan Lampiran" dan ingin mendukung pengembangannya, Anda dapat mendonasikannya di sini:

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
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Beli saya kopi" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Pindai untuk beli saya kopi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Terima kasih! Dukungan Anda membantu mempertahankan kompatibilitas dengan rilis Thunderbird terbaru, meningkatkan aksesibilitas dan pengujian, serta menjaga dokumentasi tetap terbaru.

Catatan

- Tautan donasi hanya terbuka saat Anda mengkliknya; add‑on tidak melakukan permintaan jaringan latar belakang.
- Dukungan berulang membantu pemeliharaan jangka panjang dan pembaruan tepat waktu, tetapi sepenuhnya opsional.

---

Jika tombol gambar tidak dimuat, silakan gunakan tautan berikut:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Beli saya kopi](https://buymeacoffee.com/bitranox)

---

Donasi bersifat sukarela; tidak ada pembatasan fitur.

---

## Visibilitas Donasi (90‑hari jeda)

Add‑on ini menyertakan fitur kenyamanan untuk menyembunyikan permintaan donasi untuk sementara setelah Anda mendonasikannya.

- Di mana menemukannya
  - Opsi → Bagian Dukungan: Anda akan melihat tombol "Saya sudah mendonasikan" dan area petunjuk kecil.
  - Dialog Konfirmasi pengiriman juga menunjukkan tombol Donasi; itu secara otomatis disembunyikan saat jeda aktif.

- Cara kerjanya
  - Mengklik "Saya sudah mendonasikan" menyembunyikan tombol donasi dan permintaan terkait selama 90 hari.
  - Petunjuk status menunjukkan "Tersembunyi hingga YYYY‑MM‑DD" (dalam tanggal lokal Anda). Ada juga tombol "Tampilkan Donasi lagi" untuk segera mengembalikan visibilitas.
  - Setelah 90 hari, tombol Donasi akan terlihat kembali secara otomatis.

- Privasi & penyimpanan
  - Add‑on menyimpan satu cap waktu di penyimpanan lokal Thunderbird untuk mengingat periode jeda. Kunci: `donateHideUntil` (epoch milliseconds).
  - Pengaturan ini bersifat lokal pada profil Thunderbird Anda (tidak disinkronkan dengan cloud). Tidak ada permintaan jaringan yang dilakukan oleh fitur ini.

- Pemecahan masalah
  - Jika Donasi tetap muncul segera setelah mengklik "Saya sudah mendonasikan", tunggu sebentar atau buka kembali halaman Opsi; UI akan diperbarui segera setelah pengaturan disimpan.
  - Untuk mereset secara manual, klik "Tampilkan Donasi lagi". Anda juga dapat menunggu hingga tanggal yang tertera pada petunjuk berlalu.

Fitur ini murni untuk kenyamanan; tidak pernah menghalangi fungsi add‑on dan tidak mengumpulkan data pribadi.
