---
id: configuration
title: 'Configuration'
---

## Configuration

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

---

## Open options in Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Outils → Modules complémentaires et thèmes → trouver “Répondre avec des pièces jointes” → Préférences/Options

---

### Settings {#settings}

#### Confirmation {#confirmation}

- Activer “Demander avant d'ajouter des pièces jointes”
- Réponse par défaut : Oui ou Non (focus & clavier par défaut)
- Clavier : Y/J = Oui ; N/Esc = Non ; Tab/Shift+Tab et touches fléchées changent le focus
  - Voir les détails du clavier dans [Usage](usage#keyboard-shortcuts).

---

#### Blacklist (glob patterns) {#blacklist-glob-patterns}

Les fichiers mis sur liste noire ne seront pas ajoutés automatiquement en réponse. Voir aussi le [Glossaire](glossary) pour “Liste noire (Exclure liste)”.

- Un motif par ligne ; insensible à la casse ; correspondance seulement sur le nom de fichier
- Exemples : `*intern*`, `*secret*`, `*passwor*`
- Tokens glob supportés : `*` (n'importe quel caractère sauf `/`), `?` (un caractère), classes de caractères comme `[abc]`. Utilisez `\[` pour correspondre à un `[` littéral. Les chemins (`**/`) sont ignorés car seuls les noms de fichiers sont correspondus.
- Non supporté : négation (`!`), expansion de accolades (`{..}`), et plages complexes. Gardez les motifs simples.
- Les commentaires ne sont pas supportés dans les motifs. N'incluez pas `#` ou des commentaires en ligne ; saisissez uniquement le texte du motif par ligne.

---

##### Pattern cookbook {#pattern-cookbook}

- Correspondre tout PDF : `*.pdf`
- Correspondre les fichiers commençant par “scan” : `scan*`
- Classe de caractère : `report[0-9].txt`
- Échapper un `[` littéral : `\[` (utile lors de la correspondance d'une parenthèse comme un caractère)

---

##### Notes {#blacklist-notes}

- L'ordre n'a pas d'importance ; le premier/quelconque motif qui correspond exclut le fichier.
- La correspondance se fait uniquement sur le nom de fichier (les chemins/dossiers sont ignorés).
- “Réinitialiser aux valeurs par défaut” restaure les motifs recommandés et l'activation de l'avertissement de la liste noire.
- Pourquoi l'exemple `*passwor*` ? Il correspond aux familles “password” et “Passwort”.
- Priorité : si un motif correspond à un nom de fichier, le fichier est exclu (premier/quelconque match — l'ordre ne change pas le résultat).
- Conseil — testez votre motif : ajoutez un motif temporaire, répondez à un message contenant un fichier avec un nom correspondant, et confirmez qu'il est exclu de la liste d'avertissement.

##### Quick try‑it (safe test) {#blacklist-try-it}

1. Ouvrez Options → Liste noire.
2. Ajoutez un motif temporaire comme `*.tmp` et cliquez sur Enregistrer.
3. Répondez à un mail test qui a un fichier se terminant par `.tmp` — le fichier devrait apparaître dans la liste d'avertissement et ne pas être attaché.
4. Supprimez le motif temporaire une fois terminé, ou cliquez sur “Réinitialiser aux valeurs par défaut”.

---

#### Warning on excluded attachments {#warning-on-excluded-attachments}

- Activer “Avertir si des pièces jointes sont exclues par la liste noire” (par défaut : ACTIVÉ).
- Lorsque cette option est activée, une petite fenêtre modale liste les fichiers exclus et le(s) motif(s) correspondant(s). L'avertissement apparaît également lorsque rien ne sera joint parce que tous les candidats ont été mis sur liste noire.

---

#### Save your settings {#save-your-settings}

Les paramètres sont enregistrés en appuyant sur le bouton Enregistrer. Vous pouvez rétablir manuellement des champs individuels ou réinitialiser les valeurs par défaut selon les besoins.

Si les paramètres enregistrés ne semblent pas s'appliquer correctement, redémarrez Thunderbird et réessayez. (Thunderbird peut mettre en cache l'état entre les sessions ; un redémarrage garantit que les nouveaux paramètres sont chargés.)

Conseil : Pour confirmer que vos paramètres ont pris effet, répondez à tout message avec une pièce jointe et vérifiez l'avertissement de confirmation ou de liste noire.

---

#### Donation Visibility (90‑day snooze) {#donation-visibility}

Le module complémentaire comprend une fonctionnalité pratique pour masquer les demandes de dons pendant un certain temps après que vous ayez fait un don.

Où le trouver

- Options → Section Support : vous verrez un bouton “J'ai fait un don” et une petite zone d'indice.
- La boîte de dialogue d'envoi de confirmation montre également un bouton de don ; il se cache automatiquement lorsque le report est actif.

Comment cela fonctionne

- En cliquant sur “J'ai fait un don”, les boutons de don et les demandes connexes sont cachés pendant 90 jours.
- Un indice d'état indique “Caché jusqu'au YYYY‑MM‑DD” (dans votre date locale). Il y a aussi un bouton “Afficher le don à nouveau” pour restaurer la visibilité immédiatement.
- Après 90 jours, le bouton de don redevient visible automatiquement.

Confidentialité & stockage

- Le module complémentaire stocke un seul timestamp dans le stockage local de Thunderbird pour se souvenir de la période de snooze. Clé : `donateHideUntil` (millisecondes epoch).
- Ce réglage est local à votre profil Thunderbird (non synchronisé dans le cloud). Aucune requête réseau n'est effectuée par cette fonctionnalité.

Dépannage

- Si le don s'affiche toujours juste après avoir cliqué sur “J'ai fait un don”, attendez un moment ou rouvrez la page des Options ; l'interface utilisateur se met à jour dès que le réglage est enregistré.
- Pour réinitialiser manuellement, cliquez sur “Afficher le don à nouveau”. Vous pouvez également attendre que la date indiquée dans l'indice soit passée.

Cette fonctionnalité est purement pour la commodité ; elle ne bloque jamais la fonctionnalité du module complémentaire et ne collecte aucune donnée personnelle.

---

### Filename normalization (duplicates prevention) {#filename-normalization-duplicates-prevention}

Pour se comporter de manière cohérente sur différentes plateformes, les noms de fichiers sont normalisés avant les vérifications de duplication :

- Unicode est normalisé en NFC.
- Les noms sont réduits en cas (mis en minuscules).
- Les points/espaces en fin de fichier sont supprimés (compatibilité Windows).

Cela rend la détection des doublons prévisible pour des noms comme `café.pdf` vs `café.pdf` (NFD) ou `FILE.txt.` vs `file.txt`.

---

## Confirmation behavior {#confirmation-behavior}

- “Réponse par défaut” définit le bouton initialement focalisé dans la boîte de dialogue de confirmation (utile pour les utilisateurs de clavier).
- Fonctionne pour “Répondre” et “Répondre à tous”. “Transférer” n'est pas modifié par ce module complémentaire.

---

## Advanced: duplicate detection {#advanced-duplicate-detection}

La prévention des doublons est réalisée par onglet de composition et par nom de fichier. Voir [Usage](usage#behavior-details) pour une explication détaillée.

---

See also

- [Permissions](permissions)
- [Privacy](privacy)
