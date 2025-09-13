---
id: donation
title: 'Lahjoita'
sidebar_label: 'Lahjoita'
---

## Lahjoita

import useBaseUrl from '@docusaurus/useBaseUrl';

If you like "Reply with Attachments" and want to support its development, you can donate here:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Donate via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>tai</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Donate via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>tai</div>
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

Donations are voluntary; there is no feature gating.

---

## Lahjoituksen näkyvyys (90 päivän tauko)

The add‑on includes a convenience feature to hide donation prompts for a while after you’ve donated.

- Where to find it
  - Options → Support section: you’ll see an “I donated” button and a small hint area.
  - The Send‑confirmation dialog also shows a Donate button; it automatically hides when the snooze is active.

- How it works
  - Clicking “I donated” hides donation buttons and related prompts for 90 days.
  - A status hint shows “Hidden until YYYY‑MM‑DD” (in your local date). There is also a “Show Donate again” button to restore visibility immediately.
  - After 90 days, the Donate button becomes visible automatically again.

- Privacy & storage
  - The add‑on stores a single timestamp in Thunderbird’s local storage to remember the snooze period. Key: `donateHideUntil` (epoch milliseconds).
  - This setting is local to your Thunderbird profile (not cloud‑synced). No network requests are made by this feature.

- Troubleshooting
  - If Donate still shows right after clicking “I donated”, wait a moment or reopen the Options page; the UI updates as soon as the setting is saved.
  - To reset manually, click “Show Donate again”. You can also wait until the date listed in the hint passes.

This feature is purely for convenience; it never blocks add‑on functionality and does not collect any personal data.

---
