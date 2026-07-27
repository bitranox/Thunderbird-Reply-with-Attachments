---
id: changelog
title: 'Journal des modifications'
---

---

## Journal des modifications

Pour l'historique complet et détaillé, voir le [CHANGELOG.md sur GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md) du dépôt.

- 2.4.0 : les images ne sont plus écartées simplement parce que l'expéditeur y a mis un `Content-ID` ; l'option « Include inline pictures » a disparu, car Thunderbird conserve déjà lui-même les images intégrées dans le corps de la réponse ; les liens s'ouvrent désormais dans le navigateur du système ; un plafond de 50 pièces jointes / 100 Mo par réponse, avec un rapport pour tout ce qui est laissé de côté.
- 2.3.2 : « Include inline pictures » intégrait les images dans le corps de la réponse sous forme d'URI de données base64 (retirée à nouveau après l'examen d'add-ons.thunderbird.net ; Thunderbird le fait lui-même) ; améliorations de la qualité du code et couverture de tests élargie.
- 2.3.1: Conserve les pièces jointes lorsque Thunderbird met en veille la page d'événements en arrière-plan ; ajoute des hooks de débogage ciblés pour le dépannage.
- 2.3.0: Déduplication des pièces jointes affinée, couverture de tests élargie et suppression des autorisations obsolètes pour satisfaire les politiques d'AMO.
- 2.1.0: Prise en charge complète de l'internationalisation pour les 100 principales langues
- 2.0.0: réécriture en une version complète (EN/DE)
- 1.0.1: passage à messages.listAttachments()
- 1.0.0: version initiale

---

## Dates et canaux {#dates-and-channels}

- Les publications sur ATN peuvent accuser un retard de quelques heures après l'empaquetage.
- Les versions LOCAL sont réservées aux tests des développeurs et ne sont pas distribuées via ATN.

---
