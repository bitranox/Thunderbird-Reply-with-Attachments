---
id: quickstart
title: 'Démarrage rapide'
sidebar_label: 'Démarrage rapide'
---

---

## Démarrage rapide

:::important Version minimale de Thunderbird
Ce module complémentaire prend en charge Thunderbird **128 ESR ou plus récent**. Les versions antérieures ne sont pas prises en charge.
:::

:::note Pas de télémétrie ; pas de réseau en arrière-plan
Le module complémentaire ne **collecte pas** d’analyses/télémétrie et n’effectue **aucune** requête réseau en arrière‑plan. L’accès au réseau n’a lieu que lorsque vous cliquez sur des liens externes (Docs, GitHub, Donate).
:::

---

### Installation

1. Installez le module complémentaire depuis Thunderbird Add‑ons.
2. Facultatif : Activez la confirmation (Options → « Demander avant d’ajouter des pièces jointes »).
3. Facultatif : Laissez l’avertissement de liste noire activé (par défaut) : « Avertir si des pièces jointes sont exclues par la liste noire ».
4. Facultatif : Ajoutez des motifs de liste noire (un par ligne), par exemple :

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Remarque : Le « # … » ci‑dessus est un commentaire dans cette documentation ; n’incluez pas de commentaires dans les motifs que vous collez dans Options. Saisissez un seul motif par ligne.

Répondez maintenant à un message avec des pièces jointes — les originaux seront ajoutés automatiquement ou après une brève confirmation. Si des fichiers sont exclus par votre liste noire, vous verrez un court avertissement les répertoriant.

---

### Vérifier {#verify}

- Répondez à un message avec 1–2 pièces jointes et confirmez que les originaux sont ajoutés à votre fenêtre de composition.
- Pour ajuster le comportement, voir [Configuration](configuration) (bascule de confirmation, réponse par défaut, motifs de liste noire).

---

### Vérifier l’avertissement de liste noire {#verify-blacklist-warning}

- Répondez à un message contenant un fichier comme « secret.txt ».
- Avec « Avertir si des pièces jointes sont exclues par la liste noire » activé, une petite boîte de dialogue répertorie les fichiers exclus et le motif correspondant.

Si vous ne voyez pas d’avertissement, assurez‑vous que le motif correspond exactement au nom de fichier (nom de fichier uniquement, sans tenir compte de la casse). Voir Configuration → Liste noire.

---

### Remarque sur le clavier {#keyboard-note}

- La boîte de dialogue de confirmation prend en charge Y/J pour Oui et N/Échap pour Non. Sur certains claviers non latins, les touches de lettres peuvent varier ; Entrée confirme le bouton ayant le focus.

---
