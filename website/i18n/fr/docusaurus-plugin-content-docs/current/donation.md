---
id: donation
title: 'Faire un don'
sidebar_label: 'Faire un don'
---

## Faire un don

import useBaseUrl from '@docusaurus/useBaseUrl';

Si vous aimez "Répondre avec des pièces jointes" et souhaitez soutenir son développement, vous pouvez faire un don ici :

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
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Achetez-moi un café" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Scannez pour m'acheter un café"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Merci ! Votre soutien aide à maintenir la compatibilité avec les nouvelles versions de Thunderbird, à améliorer l'accessibilité et les tests, et à tenir la documentation à jour.

Notes

- Les liens de don s'ouvrent uniquement lorsque vous cliquez dessus ; l'extension n'effectue aucune requête réseau en arrière-plan.
- Un soutien récurrent aide à l'entretien à long terme et aux mises à jour en temps opportun, mais est entièrement facultatif.

---

Si les boutons d'image ne se chargent pas, veuillez utiliser ces liens à la place :

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Achetez-moi un café](https://buymeacoffee.com/bitranox)

---

Les dons sont volontaires ; aucune fonctionnalité n'est bloquée.

---

## Visibilité des dons (snooze de 90 jours)

L'extension comprend une fonctionnalité pratique pour cacher les demandes de don pendant un certain temps après que vous ayez fait un don.

- Où le trouver
  - Options → Section Support : vous verrez un bouton "J'ai donné" et une petite zone d'aide.
  - La boîte de dialogue de confirmation d'envoi affiche également un bouton Faire un don ; il se cache automatiquement lorsque le snooze est actif.

- Comment cela fonctionne
  - Cliquer sur "J'ai donné" cache les boutons de don et les demandes connexes pendant 90 jours.
  - Un indice de statut affiche "Caché jusqu'au YYYY‑MM‑DD" (dans votre date locale). Il y a également un bouton "Afficher le don à nouveau" pour restaurer la visibilité immédiatement.
  - Après 90 jours, le bouton Faire un don redevient visible automatiquement.

- Confidentialité et stockage
  - L'extension stocke un seul horodatage dans le stockage local de Thunderbird pour se souvenir de la période de snooze. Clé : `donateHideUntil` (millisecondes depuis l'époque).
  - Ce paramètre est local à votre profil Thunderbird (non synchronisé sur le cloud). Aucune requête réseau n'est faite par cette fonctionnalité.

- Dépannage
  - Si le bouton Faire un don apparaît encore juste après avoir cliqué sur "J'ai donné", attendez un moment ou réouvrez la page des options ; l'interface se met à jour dès que le paramètre est enregistré.
  - Pour réinitialiser manuellement, cliquez sur "Afficher le don à nouveau". Vous pouvez également attendre que la date indiquée dans l'indice passe.

Cette fonctionnalité est purement pour le confort ; elle ne bloque jamais la fonctionnalité de l'extension et ne collecte aucune donnée personnelle.
