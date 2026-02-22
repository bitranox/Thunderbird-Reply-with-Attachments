---
id: donation
title: 'Nyumbang'
sidebar_label: 'Nyumbang'
---

---

## Nyumbang

import useBaseUrl from '@docusaurus/useBaseUrl';

Lamun anjeun resep kana "Reply with Attachments" sarta hayang ngadukung pamekaranana, anjeun tiasa nyumbang di dieu:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Nyumbang ngaliwatan Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>atanapi</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Nyumbang ngaliwatan PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>atanapi</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy Me a Coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Pindai pikeun mésérkeun kuring kopi"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Hatur nuhun! Pangrojong anjeun mantuan ngajaga kasaluyuan jeung rilis Thunderbird anyar, ningkatkeun akséssibilitas jeung tés, sarta ngajaga dokuméntasi tetep apdet.

Catetan

- Tumbu sumbangan ngan kabuka lamun anjeun ngaklikna; add‑on henteu ngalakukeun pamundut jaringan di tukang.
- Pangrojong rutin mantuan pangropéa jangka panjang jeung apdet pas waktuna, tapi sagemblengna pilihan.

---

Lamun tombol gambar teu bisa dimuat, mangga pake tumbu ieu waé:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Sumbangan téh sukarela; teu aya watesan fitur.

---

## Katingalian Sumbangan (tunda 90 poé)

Add‑on ngabogaan fitur kanyamanan pikeun nyumputkeun ajakan sumbangan salila sawatara waktu sanggeus anjeun nyumbang.

- Tempat manggihanna
  - Pilihan → bagian Rojongan: anjeun bakal ningali tombol “Kuring geus nyumbang” jeung wewengkon pitunjuk leutik.
  - Dialog konfirmasi Kirim ogé nembongkeun tombol Sumbang; éta otomatis disumputkeun nalika tunda aktip.

- Kumaha jalanna
  - Ngaklik “Kuring geus nyumbang” nyumputkeun tombol sumbangan jeung ajakan nu patali salila 90 poé.
  - Pitunjuk status némbongkeun “Disumputkeun nepi ka YYYY‑MM‑DD” (numutkeun tanggal lokal anjeun). Aya ogé tombol “Témbongkeun Sumbang deui” pikeun mulangkeun katingalian langsung.
  - Sanggeus 90 poé, tombol Sumbang bakal otomatis katingali deui.

- Privasi & panyimpenan
  - Add‑on nyimpen hiji timestamp dina panyimpen lokal Thunderbird pikeun émut kana période tunda. Konci: `donateHideUntil` (epoch milidetik).
  - Setélan ieu lokal pikeun profil Thunderbird anjeun (teu disingkronkeun kana awan). Teu aya pamundut jaringan anu dilakukeun ku fitur ieu.

- Ngungkulan masalah
  - Lamun Sumbang masih katingali sanggeus ngaklik “Kuring geus nyumbang”, antosan sakeudeung atawa buka deui kaca Pilihan; UI bakal diropéa pas setélan kasimpen.
  - Pikeun ngareset sacara manual, klik “Témbongkeun Sumbang deui”. Anjeun ogé tiasa ngantosan nepi ka tanggal anu didaptarkeun dina pitunjuk éta kaliwat.

Fitur ieu murni pikeun kanyamanan; teu kungsi ngahalangan fungsionalitas add‑on sarta henteu ngumpulkeun data pribadi nanaon.

---
