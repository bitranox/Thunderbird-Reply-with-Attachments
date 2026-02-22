---
id: features
title: 'Característiques'
sidebar_label: 'Característiques'
---

---

## Característiques {#features}

- Adjunta automàticament els fitxers del correu original en respondre.
- Comportament configurable: els adjunts es poden
  - afegir automàticament, o
  - afegir només després de confirmació (un diàleg petit i accessible). A Opcions
    podeu activar la confirmació i triar la resposta per defecte (Sí/No).
- Una llista de bloqueig de noms de fitxer (patrons glob) evita que s'adjuntin
  automàticament fitxers concrets. Exemples: `*intern*`, `*secret*`, `*passwor*`.
  La coincidència no distingeix entre majúscules i minúscules i només comprova el nom
  del fitxer; proporcioneu un patró per línia a Opcions.
- Avís de llista de bloqueig (opcional, activat per defecte): quan s'exclouen
  fitxers per la vostra llista de bloqueig, un petit modal llista el fitxer i els
  patrons coincidents. Compatible amb mode fosc i accessible amb teclat (Enter/Esc per tancar).
- Funciona amb Respondre i Respondre a tots. Reenviar no es modifica per aquest complement.
- Afegeix els originals fins i tot si ja heu adjuntat alguna cosa; evita duplicats segons el nom del fitxer.
- La protecció contra duplicats per pestanya evita afegits dobles a la mateixa pestanya de redacció.
- Omet els certificats S/MIME per defecte per evitar adjunts innecessaris.
- Inclou imatges en línia (per defecte: ACTIVAT). Les imatges incrustades es restauren directament al
  cos de la resposta com a URI de dades base64, preservant la disposició en línia original. Desactiveu-ho a
  Opcions per ometre completament les imatges en línia.

---

## Com funciona {#how-it-works}

- En respondre, el complement enumera els adjunts originals.
- Filtra les signatures S/MIME dels fitxers adjunts; les imatges en línia es restauren al cos (si no es desactiva).
- Opcionalment demana confirmació (apta per a teclat).
- Afegeix els fitxers admissibles a la vostra redacció, evitant duplicats pel nom del fitxer.
- Vegeu “Per què pot ser que no s'afegeixin adjunts” a Ús per als casos límit.

Nota de privadesa: Tot el processament es fa localment al Thunderbird. El complement no fa cap sol·licitud de xarxa en segon pla.

---
