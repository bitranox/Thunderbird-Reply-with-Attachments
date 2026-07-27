---
id: features
title: 'Característiques'
sidebar_label: 'Característiques'
---

---

## Característiques {#features}

- Les imatges incrustades es deixen a càrrec del Thunderbird: es queden al cos de la
  resposta i no es copien com a fitxers adjunts. Una imatge que només porta un
  `Content-ID` sense estar referenciada es tracta com un adjunt normal i es copia.

---

## Com funciona {#how-it-works}

- En respondre, el complement enumera els adjunts originals.
- Filtra les signatures S/MIME dels fitxers adjunts; les imatges en línia es restauren al cos (si no es desactiva).
- Opcionalment demana confirmació (apta per a teclat).
- Afegeix els fitxers admissibles a la vostra redacció, evitant duplicats pel nom del fitxer.
- Vegeu “Per què pot ser que no s'afegeixin adjunts” a Ús per als casos límit.

Nota de privadesa: Tot el processament es fa localment al Thunderbird. El complement no fa cap sol·licitud de xarxa en segon pla.

---
