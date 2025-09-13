---
id: donation
title: 'Donner'
sidebar_label: 'Donner'
---

## Donner

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

Merci ! Votre soutien aide à maintenir la compatibilité avec les nouvelles versions de Thunderbird, à améliorer l'accessibilité et les tests, et à garder la documentation à jour.

Notes

- Les liens de don s'ouvrent uniquement lorsque vous cliquez dessus ; le module complémentaire ne fait pas de requêtes réseau en arrière-plan.
- Le soutien récurrent aide à l'entretien à long terme et aux mises à jour rapides, mais est entièrement optionnel.

---

Si les boutons d'image ne se chargent pas, veuillez utiliser ces liens à la place :

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Achetez-moi un café](https://buymeacoffee.com/bitranox)

---

Les dons sont volontaires ; il n'y a pas de restriction sur les fonctionnalités.

---

## Visibilité des dons (snooze de 90 jours)

Le module complémentaire inclut une fonction pratique pour cacher les invitations aux dons pendant un certain temps après que vous ayez fait un don.

- Où le trouver
  - Options → Section de support : vous verrez un bouton "J'ai fait un don" et une petite zone d'indice.
  - La boîte de dialogue de confirmation d'envoi affiche également un bouton Faire un don ; il se cache automatiquement lorsque le snooze est actif.

- Comment ça fonctionne
  - Cliquer sur "J'ai fait un don" cache les boutons de don et les incitations connexes pendant 90 jours.
  - Un indice de statut indique "Caché jusqu'au YYYY‑MM‑DD" (dans votre date locale). Il y a également un bouton "Afficher à nouveau le don" pour restaurer la visibilité immédiatement.
  - Après 90 jours, le bouton Faire un don redevient visible automatiquement.

- Confidentialité & stockage
  - Le module complémentaire stocke un seul horodatage dans le stockage local de Thunderbird pour se souvenir de la période de snooze. Clé : `donateHideUntil` (millisecondes d'époque).
  - Ce paramètre est local à votre profil Thunderbird (non synchronisé dans le cloud). Aucune requête réseau n'est effectuée par cette fonction.

- Résolution des problèmes
  - Si le bouton Faire un don s'affiche toujours juste après avoir cliqué sur "J'ai fait un don", attendez un moment ou rouvrir la page des options ; l'interface se met à jour dès que le paramètre est enregistré.
  - Pour réinitialiser manuellement, cliquez sur "Afficher à nouveau le don". Vous pouvez également attendre que la date indiquée dans l'indice soit dépassée.

Cette fonction est uniquement pour le confort ; elle ne bloque jamais la fonctionnalité du module complémentaire et ne collecte aucune donnée personnelle.
