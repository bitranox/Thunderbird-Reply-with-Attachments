---
id: usage
title: 'Utilisation'
sidebar_label: 'Utilisation'
---

---

## Utilisation {#usage}

- Répondre et le module complémentaire ajoute automatiquement les originaux — ou demande d’abord confirmation, si activé dans Options.
- Dédupliqué par nom de fichier ; les parties S/MIME sont toujours ignorées. Les images en ligne sont restaurées dans le corps de la réponse par défaut (désactiver via "Include inline pictures" dans Options).
- Les pièces jointes sur liste noire sont également ignorées (motifs glob insensibles à la casse correspondant aux noms de fichier, pas aux chemins). Voir [Configuration](configuration#blacklist-glob-patterns).

---

### Ce qui se passe lors d’une réponse {#what-happens}

- Détecter la réponse → lister les pièces jointes d’origine → filtrer S/MIME + en ligne → confirmation optionnelle → ajouter les fichiers éligibles (ignorer les doublons) → restaurer les images en ligne dans le corps.

Passage strict vs. passage assoupli : le module complémentaire exclut d’abord les parties S/MIME et en ligne des pièces jointes fichiers. Si rien ne convient, il exécute un passage assoupli qui exclut toujours S/MIME/en ligne mais tolère plus de cas (voir Détails du code). Les images en ligne ne sont jamais ajoutées comme pièces jointes fichiers ; à la place, lorsque "Include inline pictures" est activé (valeur par défaut), elles sont intégrées directement dans le corps de la réponse sous forme d’URI de données base64.

| Type de partie                                           |                   Passage strict |                 Passage assoupli |
| -------------------------------------------------------- | -------------------------------: | -------------------------------: |
| Fichier de signature S/MIME `smime.p7s`                  |                            Exclu |                            Exclu |
| Types MIME S/MIME (`application/pkcs7-*`)                |                            Exclu |                            Exclu |
| Image en ligne référencée par Content‑ID (`image/*`)     | Exclu (restauré dans le corps\*) | Exclu (restauré dans le corps\*) |
| E‑mail attaché (`message/rfc822`) avec un nom de fichier |                       Non ajouté |                 Peut être ajouté |
| Pièce jointe de fichier classique avec un nom de fichier |                 Peut être ajouté |                 Peut être ajouté |

\* Lorsque "Include inline pictures" est activé (par défaut : ON), les images en ligne sont intégrées dans le corps de la réponse sous forme d’URI de données base64 plutôt qu’ajoutées comme pièces jointes fichiers. Voir [Configuration](configuration#include-inline-pictures).

Exemple : Certaines pièces jointes peuvent manquer de certains en-têtes tout en restant des fichiers classiques (ni en ligne ni S/MIME). Si le passage strict n’en trouve aucune, le passage assoupli peut les accepter et les joindre.

---

### Références croisées {#cross-reference}

- Le transfert n’est pas modifié par conception (voir Limitations ci‑dessous).
- Pour les raisons pour lesquelles une pièce jointe peut ne pas être ajoutée, voir “Pourquoi des pièces jointes peuvent ne pas être ajoutées”.

---

## Détails du comportement {#behavior-details}

- **Prévention des doublons :** le module complémentaire marque l’onglet de rédaction comme traité à l’aide d’une valeur de session par onglet et d’un verrou en mémoire. Il n’ajoutera pas les originaux deux fois.
- Fermer et rouvrir une fenêtre de rédaction est traité comme un nouvel onglet (c.-à-d. une nouvelle tentative est autorisée).
- **Respecter les pièces jointes existantes :** si la rédaction contient déjà des pièces jointes, les originaux sont quand même ajoutés une seule fois, en ignorant les noms de fichier déjà présents.
- **Exclusions :** les artefacts S/MIME et les images en ligne sont exclus des pièces jointes fichiers. Si rien ne convient au premier passage, un repli assoupli revérifie les parties non S/MIME. Les images en ligne sont gérées séparément : elles sont restaurées dans le corps de la réponse en tant qu’URI de données (lorsque activé).
  - **Noms de fichier :** `smime.p7s`
  - **Types MIME :** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Images en ligne :** toute partie `image/*` référencée par Content‑ID — exclue des pièces jointes fichiers mais intégrée dans le corps de la réponse lorsque "Include inline pictures" est sur ON
  - **E‑mails attachés (`message/rfc822`) :** traités comme des pièces jointes classiques s’ils ont un nom de fichier ; ils peuvent être ajoutés (sous réserve des vérifications de doublons et de la liste noire).
- **Avertissement de liste noire (si activé) :** lorsque des candidats sont exclus par votre liste noire,
  le module complémentaire affiche une petite fenêtre modale listant les fichiers concernés et le(s)
  motif(s) correspondant(s). Cet avertissement apparaît également lorsque aucune pièce jointe ne sera
  ajoutée parce que tout a été exclu.

---

## Raccourcis clavier {#keyboard-shortcuts}

- Boîte de dialogue de confirmation : Y/J = Oui, N/Échap = Non ; Tab/Shift+Tab et les touches fléchées font circuler le focus.
  - La “Réponse par défaut” dans [Configuration](configuration#confirmation) définit le bouton focalisé au départ.
  - Entrée active le bouton focalisé. Tab/Shift+Tab et les flèches déplacent le focus pour l’accessibilité.

### Aide‑mémoire clavier {#keyboard-cheat-sheet}

| Touches            | Action                                |
| ------------------ | ------------------------------------- |
| Y / J              | Confirmer Oui                         |
| N / Échap          | Confirmer Non                         |
| Entrée             | Activer le bouton focalisé            |
| Tab / Shift+Tab    | Déplacer le focus avant/arrière       |
| Touches fléchées   | Déplacer le focus entre les boutons   |
| Réponse par défaut | Définit le focus initial (Oui ou Non) |

---

## Limitations {#limitations}

- Le transfert n’est pas modifié par ce module complémentaire (Répondre et Répondre à tous sont pris en charge).
- Les très grosses pièces jointes peuvent être soumises aux limites de Thunderbird ou du fournisseur.
  - Le module complémentaire ne segmente ni ne compresse les fichiers ; il s’appuie sur la gestion normale des pièces jointes de Thunderbird.
- Messages chiffrés : les parties S/MIME sont intentionnellement exclues.

---

## Pourquoi des pièces jointes peuvent ne pas être ajoutées {#why-attachments-might-not-be-added}

- Les images en ligne ne sont pas ajoutées comme pièces jointes fichiers. Lorsque "Include inline pictures" est sur ON (valeur par défaut), elles sont intégrées dans le corps de la réponse en tant qu’URI de données. Si le paramètre est sur OFF, les images en ligne sont entièrement supprimées. Voir [Configuration](configuration#include-inline-pictures).
- Les parties de signature S/MIME sont exclues par conception : des noms de fichier comme `smime.p7s` et des types MIME tels que `application/pkcs7-signature` ou `application/pkcs7-mime` sont ignorés.
- Les motifs de liste noire peuvent filtrer des candidats : voir [Configuration](configuration#blacklist-glob-patterns) ; la correspondance est insensible à la casse et ne porte que sur le nom de fichier.
- Les noms de fichier en double ne sont pas réajoutés : si la rédaction contient déjà un fichier avec le même nom normalisé, il est ignoré.
- Parties non fichier ou noms de fichier manquants : seules les parties de type fichier avec des noms de fichier utilisables sont prises en compte pour l’ajout.

---

Voir aussi

- [Configuration](configuration)
