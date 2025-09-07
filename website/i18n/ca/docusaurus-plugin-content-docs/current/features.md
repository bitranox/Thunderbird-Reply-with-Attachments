---
id: features
title: Característiques
sidebar_label: Característiques
---

## Característiques

- En respondre, adjunta automàticament els fitxers del correu original.
- Comportament configurable: els fitxers adjunts poden
  - afegir-se automàticament, o bé
  - afegir-se només després de confirmació (diàleg petit i accessible). A Opcions pots activar la confirmació i triar la resposta predeterminada (Sí/No).
- Llista negra de noms de fitxer (patrons glob) que evita afegir automàticament determinats fitxers. Exemples: `*intern*`, `*secret*`, `*passwor*`.
  La coincidència no distingeix entre majúscules/minúscules i només comprova el nom del fitxer; proporciona un patró per línia a Opcions.
- Avís de llista negra (opcional, activat per defecte): quan la teva llista negra exclou fitxers, un petit modal mostra el fitxer i els patrons coincidents. Compatible amb el mode fosc i accessible amb teclat (Enter/Esc per tancar).
- Afegeix els originals encara que ja hagis adjuntat alguna cosa; evita duplicats segons el nom del fitxer.
- Omet certificats SMIME i imatges en línia per evitar adjunts innecessaris.
