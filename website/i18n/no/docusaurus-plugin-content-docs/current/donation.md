---
id: donation
title: 'Donere'
sidebar_label: 'Donere'
---

## Donere

import useBaseUrl from '@docusaurus/useBaseUrl';

If you like "Reply with Attachments" and want to support its development, you can donate here:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donate via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donate via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>eller</div>
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

Thank you! Your support helps maintain compatibility with new Thunderbird releases, improve accessibility and tests, and keep documentation up to date.

Notes

- Donate links open only when you click them; the add‑on does not perform any background network requests.
- Recurring support helps long‑term maintenance and timely updates, but is entirely optional.

---

If the image buttons do not load, please use these links instead:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Donasjoner er frivillige; det er ingen funksjonsbegrensning.

---

## Synlighet for donasjoner (90‑dagers pause)

Tillegget inkluderer en praktisk funksjon for å skjule donasjonsforespørselen en stund etter at du har donert.

- Hvor du finner det
  - Alternativer → Støtte-seksjon: du vil se en "Jeg donerte" knapp og et lite hintområde.
  - Dialogboksen for sendebekreftelse viser også en Doner knapp; den skjules automatisk når pausen er aktiv.

- Hvordan det fungerer
  - Ved å klikke på "Jeg donerte" skjules donasjonsknapper og relaterte forespørsel i 90 dager.
  - Et statushint viser "Skjult til YYYY‑MM‑DD" (i din lokale dato). Det er også en "Vis Doner igjen" knapp for å gjenopprette synlighet umiddelbart.
  - Etter 90 dager blir Doner knappen automatisk synlig igjen.

- Personvern og lagring
  - Tillegget lagrer en enkelt tidsstempel i Thunderbirds lokale lagring for å huske pauseperioden. Nøkkel: `donateHideUntil` (epoke millisekunder).
  - Denne innstillingen er lokal til din Thunderbird-profil (ikke sky-synkronisert). Ingen nettverksforespørsler blir gjort av denne funksjonen.

- Feilsøking
  - Hvis Doner fortsatt vises rett etter å ha klikket på "Jeg donerte", vent et øyeblikk eller åpne alternativsiden igjen; brukergrensesnittet oppdateres så snart innstillingen er lagret.
  - For å nullstille manuelt, klikk på "Vis Doner igjen". Du kan også vente til datoen som er oppgitt i hintet går.

Denne funksjonen er kun for bekvemmelighet; den blokkerer aldri funksjonaliteten til tillegget og samler ikke inn noen personlig informasjon.

---
