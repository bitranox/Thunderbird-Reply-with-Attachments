---
id: donation
title: 'Faire un don'
sidebar_label: 'Faire un don'
---

---

## Faire un don

import useBaseUrl from '@docusaurus/useBaseUrl';

Si vous aimez "Reply with Attachments" et souhaitez soutenir son développement, vous pouvez faire un don ici :

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Faire un don via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ou</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Faire un don via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ou</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy me a Coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scannez pour m’offrir un café"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Merci ! Votre soutien aide à maintenir la compatibilité avec les nouvelles versions de Thunderbird, à améliorer l’accessibilité et les tests, et à garder la documentation à jour.

Remarques

- Les liens de dons ne s’ouvrent que lorsque vous cliquez dessus ; le module complémentaire n’effectue aucune requête réseau en arrière-plan.
- Le soutien récurrent aide à la maintenance à long terme et aux mises à jour en temps voulu, mais il reste entièrement facultatif.

---

Si les boutons d’image ne se chargent pas, utilisez plutôt ces liens :

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

Les dons sont volontaires ; il n’y a pas de restriction de fonctionnalités.

---

## Visibilité des dons (mise en veille de 90 jours)

Le module complémentaire inclut une fonctionnalité pratique pour masquer les invites de don pendant un certain temps après votre don.

- Où le trouver
  - Options → section Support : vous verrez un bouton “I donated” et une petite zone d’indication.
  - La boîte de dialogue de confirmation d’envoi affiche également un bouton Donate ; il se masque automatiquement lorsque la mise en veille est active.

- Fonctionnement
  - Un clic sur “I donated” masque les boutons de don et les invites associées pendant 90 jours.
  - Une indication d’état affiche “Hidden until YYYY‑MM‑DD” (dans votre date locale). Il existe aussi un bouton “Show Donate again” pour rétablir immédiatement la visibilité.
  - Après 90 jours, le bouton Donate redevient visible automatiquement.

- Confidentialité et stockage
  - Le module complémentaire enregistre un seul horodatage dans le stockage local de Thunderbird pour mémoriser la période de mise en veille. Clé : `donateHideUntil` (millisecondes depuis l’époque Unix).
  - Ce paramètre est local à votre profil Thunderbird (pas de synchronisation cloud). Aucune requête réseau n’est effectuée par cette fonctionnalité.

- Dépannage
  - Si Donate s’affiche encore juste après avoir cliqué sur “I donated”, patientez un instant ou rouvrez la page Options ; l’interface se met à jour dès que le réglage est enregistré.
  - Pour réinitialiser manuellement, cliquez sur “Show Donate again”. Vous pouvez aussi attendre que la date indiquée dans l’astuce soit dépassée.

Cette fonctionnalité est purement destinée au confort ; elle ne bloque jamais les fonctionnalités du module et ne collecte aucune donnée personnelle.

---
