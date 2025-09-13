---
id: features
title: 'Funcions'
sidebar_label: 'Funcions'
---

## Features {#features}

- Automàticament adjunta fitxers de l'email original en respondre.
- Comportament configurable: els adjunts poden ser
  - afegits automàticament, o
  - afegits només després de confirmació (un petit diàleg accessible). A Opcions podeu
    habilitar la confirmació i triar la resposta per defecte (Sí/No).
- La llista negra de noms de fitxers (patrons glob) impedeix que fitxers específics siguin
  adjunts automàticament. Exemples: `*intern*`, `*secret*`, `*passwor*`.
  La coincidència no distingeix entre majúscules i minúscules i verifica només el nom del fitxer; proporciona un patró
  per línia a Opcions.
- Advertència de la llista negra (opcional, habilitada per defecte): quan fitxers són exclusos per la vostra
  llista negra, un petit modal llista el fitxer i el(s) patró(s) que coincideixen. Amigable amb el mode negre
  i accessible amb el teclat (Enter/Esc per tancar).
- Funciona amb Respondre i Respondre a tot. Reenviar no es modifica amb aquest complement.
- Afegeix originals fins i tot si ja has adjuntat alguna cosa tu mateix; evita duplicats pel nom del fitxer.
- La protecció de duplicats per pestanya impedeix l'afegida doble en la mateixa pestanya de redacció.
- Omiteix certificats S/MIME i imatges en línia per evitar adjunts innecessaris.

---

## How It Works {#how-it-works}

- En respondre, el complement llista els adjunts originals.
- Filtra signatures S/MIME i imatges en línia.
- Opcionalment demana confirmació (amigable amb el teclat).
- Afegeix fitxers elegibles a la vostra redacció, evitant duplicats pel nom del fitxer.
- Vegeu "Per què els adjunts podrien no ser afegits" a Ús per casos límit.

Nota de privadesa: Tots els processos es realitzen localment a Thunderbird. El complement no fa sol·licituds de xarxa en segon pla.
