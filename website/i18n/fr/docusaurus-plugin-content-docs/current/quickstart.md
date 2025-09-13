---
id: quickstart
title: 'Démarrage rapide'
sidebar_label: 'Démarrage rapide'
---

## Démarrage rapide

:::important Version minimum de Thunderbird
Cet add-on prend en charge Thunderbird **128 ESR ou version ultérieure**. Les versions antérieures ne sont pas prises en charge.
:::

:::note Pas de télémétrie ; pas de réseau en arrière-plan
L'add-on ne collecte **pas** d'analytique/télémétrie et ne fait **aucune** requête réseau en arrière-plan. L'accès au réseau se produit uniquement lorsque vous cliquez sur des liens externes (Docs, GitHub, Faire un don).
:::

---

### Installer

1. Installez l'add-on depuis les Add-ons Thunderbird.
2. Optionnel : Activez la confirmation (Options → “Demander avant d'ajouter des pièces jointes”).
3. Optionnel : Laissez l'avertissement de liste noire activé (par défaut) : “Avertir si des pièces jointes sont exclues par liste noire”.
4. Optionnel : Ajoutez des motifs de liste noire (un par ligne), par exemple :

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Remarque : Le “# …” ci-dessus est un commentaire dans cette documentation ; n'incluez pas de commentaires dans les motifs que vous collez dans les Options. Entrez un motif par ligne uniquement.

Répondez maintenant à un message avec des pièces jointes — les originaux seront ajoutés automatiquement ou après une rapide confirmation. Si des fichiers sont exclus par votre liste noire, vous verrez un bref avertissement les indiquant.

---

### Vérifier {#verify}

- Répondez à un message avec 1 à 2 pièces jointes et confirmez que les originaux sont ajoutés à votre fenêtre de composition.
- Pour ajuster le comportement, voir [Configuration](configuration) (commutateur de confirmation, réponse par défaut, motifs de liste noire).

---

### Vérifier l'avertissement de liste noire {#verify-blacklist-warning}

- Répondez à un message contenant un fichier comme “secret.txt”.
- Avec “Avertir si des pièces jointes sont exclues par liste noire” activé, une petite boîte de dialogue liste les fichiers exclus et le motif correspondant.

Si vous ne voyez pas d'avertissement, assurez-vous que le motif correspond exactement au nom du fichier (nom de fichier uniquement, insensible à la casse). Voir Configuration → Liste noire.

---

### Remarque sur le clavier {#keyboard-note}

- La boîte de dialogue de confirmation prend en charge Y/J pour Oui et N/Esc pour Non. Sur certains claviers non latins, les touches lettres peuvent varier ; Entrée confirme le bouton sélectionné.

---
