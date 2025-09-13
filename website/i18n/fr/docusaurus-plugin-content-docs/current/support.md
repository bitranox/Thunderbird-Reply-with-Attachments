---
id: support
title: 'Support'
sidebar_label: 'Soutien'
---

## FAQ {#faq}

### Les pièces jointes n'ont pas été ajoutées — pourquoi ?

- Les images en ligne et les parties S/MIME sont intentionnellement exclues.
- Les noms de fichiers en double sont ignorés si la composition a déjà le même fichier.
- Les motifs de liste noire peuvent filtrer les candidats ; voir [Configuration](configuration#blacklist-glob-patterns).

### Puis-je confirmer avant d'ajouter des pièces jointes ?

Oui. Activez "Demander avant d'ajouter des pièces jointes" dans [Configuration → Confirmation](configuration#confirmation). Clavier : Y/J = Oui, N/Esc = Non.

### L'add-on envoie-t-il des données ou suit-il l'utilisation ?

Non. Voir [Confidentialité](privacy) — pas de télémétrie et pas de requêtes réseau en arrière-plan.

### Le transfert n'ajoute pas de pièces jointes — est-ce prévu ?

Oui. Seules les réponses et les réponses à tous sont modifiées par cet add-on ; le transfert reste inchangé. Voir [Limitations](usage#limitations).

### Où se trouve le snooze de don ?

Options → section Support. Voir [Visibilité des dons](configuration#donation-visibility).

---

## Support

Besoin d'aide ou souhaitez-vous signaler un bug ?

---

### Ouvrir un problème sur GitHub :

- Référentiel : `bitranox/Thunderbird-Reply-with-Attachments`
- Problèmes : https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Inclure la version de Thunderbird (par exemple, 128 ESR), le système d'exploitation et les étapes pour reproduire
- Joindre les journaux pertinents de la console d'erreurs de Thunderbird (Outils → Outils de développement → Console d'erreurs)

- Site des add-ons (ATN) : Vous pouvez également laisser des commentaires via la [page de l'add-on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Conseils

- Assurez-vous que vous utilisez une version de Thunderbird prise en charge (128 ESR ou plus récente).
- Consultez la documentation de Configuration et d'Utilisation pour les questions de configuration courantes.
- Pour le développement/test, consultez le guide de développement.
- Si les paramètres enregistrés semblent ne pas s'appliquer correctement, redémarrez Thunderbird et réessayez. (Thunderbird peut mettre en cache l'état entre les sessions ; un redémarrage garantit que de nouveaux paramètres soient chargés.)
- Reproduction minimale : essayez avec un petit courriel de test contenant une ou deux pièces jointes simples.
- Comparez le comportement avec la confirmation ACTIVÉE vs. DÉSACTIVÉE pour déterminer si le flux de dialogue est impliqué.

---

### Que inclure dans un rapport

- Version de Thunderbird et système d'exploitation
- Étapes exactes pour reproduire (ce que vous avez fait, ce que vous attendiez, ce qui s'est passé)
- Si la confirmation était activée et votre paramètre de réponse par défaut
- Un échantillon de vos motifs de liste noire (si pertinent)
- Journaux de la Console d'erreurs lors de la reproduction (Outils → Outils de développement → Console d'erreurs)
- Activer la journalisation de débogage (optionnel) :
  - Exécuter dans la Console d'erreurs de Thunderbird : `messenger.storage.local.set({ debug: true })`
  - Reproduire le problème et copier les lignes de journal `[RWA]` pertinentes

---

### Modèle de problème (copier/coller) {#issue-template}

- Version de Thunderbird et système d'exploitation :
- Étapes pour reproduire :
- Confirmation activée ? Réponse par défaut :
- Échantillon de motifs de liste noire :
- Journaux de la Console d'erreurs (Outils → Outils de développement → Console d'erreurs) :
- Tout autre élément pertinent :

---

### Faire un don

Si vous souhaitez soutenir ce projet, envisagez une petite contribution sur la page [Faire un don](donation). Merci !
