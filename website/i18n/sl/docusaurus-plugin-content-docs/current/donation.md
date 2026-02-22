---
id: donation
title: 'Doniraj'
sidebar_label: 'Doniraj'
---

---

## Donirajte

import useBaseUrl from '@docusaurus/useBaseUrl';

Če vam je "Reply with Attachments" všeč in želite podpreti njegov razvoj, lahko tukaj donirate:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donirajte prek storitve Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ali</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donirajte prek storitve PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ali</div>
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
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skenirajte, da mi kupite kavo"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Hvala! Vaša podpora pomaga ohranjati združljivost z novimi izdajami Thunderbirda, izboljšati dostopnost in teste ter ohranjati dokumentacijo posodobljeno.

Opombe

- Povezave za donacije se odprejo le, ko kliknete nanje; dodatek ne izvaja nobenih omrežnih zahtev v ozadju.
- Redna podpora pomaga pri dolgoročnem vzdrževanju in pravočasnih posodobitvah, vendar je popolnoma neobvezna.

---

Če se slikovni gumbi ne naložijo, prosimo, uporabite te povezave:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donacije so prostovoljne; ni omejevanja funkcionalnosti.

---

## Vidnost donacij (90‑dnevni odlog)

Dodatek vključuje priročno možnost, da po donaciji za nekaj časa skrije pozive k doniranju.

- Kje ga najti
  - Možnosti → razdelek Podpora: videli boste gumb “Doniral/-a sem” in majhno območje z namigom.
  - Pogovorno okno za potrditev pošiljanja prav tako prikazuje gumb Doniraj; samodejno se skrije, ko je odlog aktiven.

- Kako deluje
  - Klik “Doniral/-a sem” skrije gumbe za donacije in povezane pozive za 90 dni.
  - Namig stanja prikazuje “Skrito do YYYY‑MM‑DD” (v vašem lokalnem datumu). Na voljo je tudi gumb “Znova pokaži Doniraj” za takojšnjo obnovitev vidnosti.
  - Po 90 dneh se gumb Doniraj znova samodejno prikaže.

- Zasebnost in shranjevanje
  - Dodatek shrani en sam časovni žig v Thunderbirdovo lokalno shrambo, da si zapomni obdobje odloga. Ključ: `donateHideUntil` (milisekunde epohe).
  - Ta nastavitev je lokalna za vaš profil Thunderbird (ni sinhronizirana v oblaku). Ta funkcija ne izvaja nobenih omrežnih zahtev.

- Odpravljanje težav
  - Če se Doniraj še vedno prikazuje takoj po kliku “Doniral/-a sem”, počakajte trenutek ali znova odprite stran Možnosti; uporabniški vmesnik se posodobi takoj, ko je nastavitev shranjena.
  - Za ročno ponastavitev kliknite “Znova pokaži Doniraj”. Lahko pa počakate do datuma, navedenega v namigu.

Ta funkcija je namenjena zgolj udobju; nikoli ne blokira delovanja dodatka in ne zbira nobenih osebnih podatkov.

---
