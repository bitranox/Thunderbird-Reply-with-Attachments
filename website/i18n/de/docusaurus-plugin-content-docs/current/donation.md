---
id: donation
title: 'Spenden'
sidebar_label: 'Spenden'
---

---

## Spenden

import useBaseUrl from '@docusaurus/useBaseUrl';

Wenn Ihnen „Reply with Attachments“ gefällt und Sie die Entwicklung unterstützen möchten, können Sie hier spenden:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Über Stripe spenden" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oder</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Über PayPal spenden" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>oder</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Spendiere mir einen Kaffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scannen, um mir einen Kaffee zu spendieren"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Vielen Dank! Ihre Unterstützung hilft, die Kompatibilität mit neuen Thunderbird‑Versionen zu erhalten, die Barrierefreiheit und Tests zu verbessern und die Dokumentation aktuell zu halten.

Hinweise

- Spendenlinks öffnen sich nur, wenn Sie sie anklicken; das Add‑on führt keine Hintergrund‑Netzwerkanfragen aus.
- Regelmäßige Unterstützung hilft bei der langfristigen Wartung und zeitnahen Updates, ist jedoch völlig optional.

---

Wenn die Bildschaltflächen nicht geladen werden, verwenden Sie bitte stattdessen diese Links:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Spenden sind freiwillig; es gibt keine Funktionssperren.

---

## Sichtbarkeit der Spendenhinweise (90‑Tage‑Schlummern)

Das Add‑on enthält eine Komfortfunktion, um Spendenhinweise nach einer Spende für eine Weile auszublenden.

- Wo Sie es finden
  - Optionen → Abschnitt „Unterstützung“: Sie sehen eine Schaltfläche „Ich habe gespendet“ und einen kleinen Hinweisbereich.
  - Der Sende‑Bestätigungsdialog zeigt ebenfalls eine Spenden‑Schaltfläche; sie wird automatisch ausgeblendet, wenn die Schlummerfunktion aktiv ist.

- So funktioniert es
  - Ein Klick auf „Ich habe gespendet“ blendet Spenden‑Schaltflächen und zugehörige Hinweise für 90 Tage aus.
  - Ein Statushinweis zeigt „Ausgeblendet bis YYYY‑MM‑DD“ (in Ihrem lokalen Datum). Es gibt auch eine Schaltfläche „Spenden erneut anzeigen“, um die Sichtbarkeit sofort wiederherzustellen.
  - Nach 90 Tagen wird die Spenden‑Schaltfläche automatisch wieder sichtbar.

- Datenschutz & Speicherung
  - Das Add‑on speichert einen einzelnen Zeitstempel im lokalen Speicher von Thunderbird, um die Schlummerdauer zu merken. Schlüssel: `donateHideUntil` (Epoch‑Millisekunden).
  - Diese Einstellung ist lokal für Ihr Thunderbird‑Profil (nicht cloud‑synchronisiert). Von dieser Funktion werden keine Netzwerkanfragen durchgeführt.

- Fehlerbehebung
  - Wenn die Spenden‑Schaltfläche direkt nach dem Klick auf „Ich habe gespendet“ weiterhin angezeigt wird, warten Sie einen Moment oder öffnen Sie die Seite „Optionen“ erneut; die Oberfläche aktualisiert sich, sobald die Einstellung gespeichert ist.
  - Um manuell zurückzusetzen, klicken Sie auf „Spenden erneut anzeigen“. Sie können auch warten, bis das im Hinweis angegebene Datum erreicht ist.

Diese Funktion dient ausschließlich dem Komfort; sie blockiert niemals die Funktionalität des Add‑ons und erfasst keine personenbezogenen Daten.

---
