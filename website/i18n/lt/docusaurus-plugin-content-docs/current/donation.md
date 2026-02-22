---
id: donation
title: 'Paaukoti'
sidebar_label: 'Paaukoti'
---

---

## Paaukokite

import useBaseUrl from '@docusaurus/useBaseUrl';

Jei jums patinka „Reply with Attachments“ ir norite paremti jo kūrimą, galite paaukoti čia:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Paaukoti per Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>arba</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Paaukoti per PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>arba</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Nupirkite man kavos" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Skenuokite, kad nupirktumėte man kavos"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Ačiū! Jūsų parama padeda išlaikyti suderinamumą su naujomis Thunderbird laidomis, gerinti prieinamumą ir testus bei nuolat atnaujinti dokumentaciją.

Pastabos

- Aukojimo nuorodos atsidaro tik jas spustelėjus; priedas neatlieka jokių fono tinklo užklausų.
- Periodinė parama padeda užtikrinti ilgalaikę priežiūrą ir laiku atliekamus atnaujinimus, tačiau yra visiškai neprivaloma.

---

Jei vaizdiniai mygtukai neįkeliami, vietoje jų naudokite šias nuorodas:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Aukos yra savanoriškos; funkcijos nėra ribojamos.

---

## Aukojimo raginimo matomumas (90‑dienų atidėjimas)

Priedas turi patogią funkciją, leidžiančią po aukos kuriam laikui paslėpti raginimus aukoti.

- Kur tai rasti
  - Parinktys → skiltis „Parama“: pamatysite mygtuką „Paaukojau“ ir mažą užuominos sritį.
  - Siuntimo patvirtinimo dialoge taip pat rodomas mygtukas „Paaukoti“; jis automatiškai paslepiamas, kai atidėjimas aktyvus.

- Kaip tai veikia
  - Spustelėjus „Paaukojau“, aukojimo mygtukai ir susiję raginimai paslepiami 90 dienų.
  - Būsenos užuomina rodo „Paslėpta iki YYYY‑MM‑DD“ (pagal jūsų vietinę datą). Taip pat yra mygtukas „Vėl rodyti „Paaukoti““, kad matomumą būtų galima atkurti iš karto.
  - Po 90 dienų mygtukas „Paaukoti“ vėl automatiškai tampa matomas.

- Privatumas ir saugykla
  - Priedas Thunderbird vietinėje saugykloje išsaugo vieną laiko žymą, kad prisimintų atidėjimo laikotarpį. Raktas: `donateHideUntil` (milisekundės nuo epochos pradžios).
  - Ši nuostata taikoma tik jūsų Thunderbird profiliui (nesinchronizuojama debesyje). Ši funkcija neatlieka jokių tinklo užklausų.

- Trikčių šalinimas
  - Jei po spustelėjimo „Paaukojau“ mygtukas „Paaukoti“ vis dar rodomas, palaukite akimirką arba iš naujo atidarykite Parinkčių puslapį; sąsaja atsinaujina iškart, kai nuostata išsaugoma.
  - Norėdami rankiniu būdu atstatyti, spustelėkite „Vėl rodyti „Paaukoti““. Taip pat galite palaukti, kol praeis užuominoje nurodyta data.

Ši funkcija yra tik patogumui; ji niekada neblokuoja priedo funkcionalumo ir nerenka jokių asmens duomenų.

---
