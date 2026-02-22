---
id: features
title: 'Fonctionnalités'
sidebar_label: 'Fonctionnalités'
---

---

## Fonctionnalités {#features}

- Ajoute automatiquement en pièce jointe les fichiers du message d’origine lors d’une réponse.
- Comportement configurable : les pièces jointes peuvent être
  - ajoutées automatiquement, ou
  - ajoutées uniquement après confirmation (une petite boîte de dialogue accessible). Dans Options, vous
    pouvez activer la confirmation et choisir la réponse par défaut (Oui/Non).
- Une liste noire de noms de fichiers (motifs glob) empêche certains fichiers d’être
  joints automatiquement. Exemples : `*intern*`, `*secret*`, `*passwor*`.
  La correspondance est insensible à la casse et ne vérifie que le nom de fichier ; indiquez un motif
  par ligne dans Options.
- Avertissement de liste noire (optionnel, activé par défaut) : lorsque des fichiers sont exclus par votre
  liste noire, une petite fenêtre modale répertorie le fichier et le(s) motif(s) correspondant(s). Compatible avec le mode sombre
  et accessible au clavier (Entrée/Échap pour fermer).
- Fonctionne avec Répondre et Répondre à tous. Le transfert n’est pas modifié par ce module complémentaire.
- Ajoute les pièces originales même si vous avez déjà joint quelque chose vous‑même ; évite les doublons par nom de fichier.
- Une protection par onglet contre les doublons empêche l’ajout double dans le même onglet de rédaction.
- Ignore par défaut les certificats S/MIME pour éviter des pièces jointes inutiles.
- Inclure les images intégrées (par défaut : ACTIVÉ). Les images intégrées sont restaurées directement dans le
  corps de la réponse sous forme d’URI de données base64, en préservant la disposition en ligne d’origine. Désactivez dans
  Options pour ignorer complètement les images intégrées.

---

## Fonctionnement {#how-it-works}

- Lors d’une réponse, le module complémentaire répertorie les pièces jointes d’origine.
- Filtre les signatures S/MIME des pièces jointes ; les images intégrées sont restaurées dans le corps (sauf si désactivé).
- Peut demander une confirmation (pratique au clavier).
- Ajoute les fichiers éligibles à votre message en cours de rédaction, en évitant les doublons par nom de fichier.
- Voir « Pourquoi les pièces jointes peuvent ne pas être ajoutées » dans Utilisation pour les cas limites.

Note de confidentialité : Tout le traitement a lieu localement dans Thunderbird. Le module complémentaire n’effectue aucune requête réseau en arrière‑plan.

---
