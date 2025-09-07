---
id: configuration
title: Configuration
---

# Configuration

Note terminologique : voir le [Glossaire](glossary) pour l’usage cohérent des termes dans l’interface et la documentation.

## Ouvrir les options dans Thunderbird

- Thunderbird → Outils → Modules complémentaires et thèmes → « Reply with Attachments » → Préférences/Options

### Réglages :

#### Confirmation

- Activer/Désactiver « Demander avant d’ajouter des pièces jointes ».
- Réponse par défaut : Oui ou Non (focus et clavier par défaut).
- Clavier : Y/J = Oui ; N/Échap = Non ; Tab/Shift+Tab et flèches pour changer le focus.

#### Liste noire (motifs glob)

Les fichiers listés ne seront pas ajoutés automatiquement lors de la réponse.

- Un motif par ligne ; insensible à la casse ; correspondance sur le seul nom de fichier.
- Exemples : `*.png`, `smime.*`, `*.p7s`.
- Motifs glob pris en charge : `*` (tout caractère sauf `/`), `?` (un caractère), classes comme `[abc]`. Utilisez `\[` pour un `[` littéral. Les chemins (`**/`) sont ignorés car seule la correspondance sur le nom de fichier compte.
- Non pris en charge : négation (`!`), accolades (`{..}`) et intervalles complexes. Gardez les motifs simples.

Astuce : des valeurs par défaut sont préremplies lors de la première ouverture et peuvent être réinitialisées à tout moment.

#### Avertissement lors de l’exclusion de pièces jointes

- Activer « Avertir si des pièces jointes sont exclues par la liste noire » (par défaut : activé).
- Lorsqu’elle est activée, une petite fenêtre modale répertorie les fichiers exclus et les motifs correspondants. L’avertissement apparaît également lorsqu’aucune pièce ne sera jointe car toutes ont été exclues.

#### Enregistrer vos réglages

---

### Normalisation des noms de fichier (prévention des doublons)

Pour un comportement cohérent entre plateformes, les noms de fichier sont normalisés avant la détection de doublons :

- Unicode est normalisé en NFC.
- Les noms sont mis en minuscules (case‑folding).
- Les points/espaces finaux sont retirés (meilleure compatibilité Windows).

Ainsi, la détection des doublons reste prévisible pour des noms comme `café.pdf` vs `café.pdf` (NFD) ou `FILE.txt.` vs `file.txt`.
