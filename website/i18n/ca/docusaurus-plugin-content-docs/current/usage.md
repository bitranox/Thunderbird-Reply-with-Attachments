---
id: usage
title: 'Ús'
sidebar_label: 'Ús'
---

---

## Ús {#usage}

- Respon i el complement afegeix els originals automàticament — o bé pregunta abans, si està habilitat a Opcions.
- Es desduplica pel nom del fitxer; les parts S/MIME sempre s'ometen. Les imatges incrustades al missatge original es queden al cos de la resposta, on Thunderbird les col·loca, i no es copien com a fitxers.
- Els adjunts a la llista negra també s'ometen (patrons glob que no distingeixen entre majúscules i minúscules i que coincideixen amb noms de fitxer, no amb rutes). Vegeu [Configuració](configuration#blacklist-glob-patterns).

---

### Què passa en respondre {#what-happens}

- Detectar la resposta → llistar els adjunts originals → ometre S/MIME i les imatges incrustades → confirmació opcional → afegir els fitxers elegibles (ometent duplicats).

| Tipus de part                                         | Es copia a la resposta |
|-------------------------------------------------------|-----------------------:|
| Fitxer de signatura S/MIME `smime.p7s`                | No                     |
| Tipus MIME de S/MIME (`application/pkcs7-*`)          | No                     |
| Imatge que el cos del missatge incrusta per `cid:`    | No (és al cos)         |
| Imatge marcada com a `Content-Disposition: inline`    | No (és al cos)         |
| Imatge amb un `Content-ID` que el cos mai referencia  | Sí                     |
| Correu adjunt (`message/rfc822`) amb un nom de fitxer | Sí                     |
| Fitxer adjunt normal amb un nom de fitxer             | Sí                     |

Una imatge només compta com a incrustada quan el missatge original realment hi fa referència,
o quan el remitent l'ha marcada explícitament com a `Content-Disposition: inline`. Una simple
capçalera `Content-ID` no és suficient: molts clients de correu en posen una a cada part d'imatge,
incloent-hi adjunts genuïns, i aquests s'han de copiar igualment.

---

### Referències creuades {#cross-reference}

- El reenviament no es modifica per disseny (vegeu Limitacions més avall).
- Per conèixer els motius pels quals un adjunt pot no afegir-se, vegeu «Per què pot ser que no s'afegeixin fitxers adjunts».

---

## Detalls del comportament {#behavior-details}

- **Prevenció de duplicats:** El complement marca la pestanya de redacció com a processada mitjançant un valor de sessió per pestanya i una protecció en memòria. No afegirà els originals dues vegades.
- Tancar i tornar a obrir una finestra de redacció es tracta com una pestanya nova (és a dir, es permet un nou intent).
- **Respecte pels adjunts existents:** Si la redacció ja conté alguns adjunts, els originals encara s'afegeixen exactament una vegada, ometent els noms de fitxer que ja existeixen.
- **Exclusions:** Les parts S/MIME i les imatges en línia s'exclouen dels adjunts de fitxer. Si res no compleix en la primera passada, una passada relaxada torna a comprovar les parts no S/MIME. Les imatges en línia es tracten per separat: es restauren al cos de la resposta com a URI de dades (quan està habilitat).
  - **Noms de fitxer:** `smime.p7s`
  - **Tipus MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Imatges en línia:** qualsevol part `image/*` referenciada per Content‑ID — exclosa dels adjunts de fitxer però incrustada al cos de la resposta quan "Include inline pictures" és ON
  - **Correus adjunts (`message/rfc822`):** es tracten com a adjunts normals si tenen un nom de fitxer; es poden afegir (subjectes a comprovacions de duplicats i a la llista negra).
- **Avís de llista negra (si està habilitat):** Quan els candidats s'exclouen per la vostra llista negra,
  el complement mostra una petita finestra modal amb la llista dels fitxers afectats i els patrons
  coincidents. Aquest avís també apareix en els casos en què no s'afegirà cap adjunt perquè tot s'ha
  exclòs.

---

## Dreceres de teclat {#keyboard-shortcuts}

- Diàleg de confirmació: Y/J = Sí, N/Esc = No; Tab/Shift+Tab i les tecles de fletxa canvien el focus.
  - La «Resposta per defecte» a [Configuració](configuration#confirmation) estableix el botó enfocat inicialment.
  - Enter activa el botó amb focus. Tab/Shift+Tab i les fletxes mouen el focus per a l'accessibilitat.

### Guia ràpida de teclat {#keyboard-cheat-sheet}

| Tecles               | Acció                               |
|----------------------|-------------------------------------|
| Y / J                | Confirmar Sí                        |
| N / Esc              | Confirmar No                        |
| Enter                | Activar el botó amb focus           |
| Tab / Shift+Tab      | Moure el focus endavant/enrere      |
| Tecles de fletxa     | Moure el focus entre botons         |
| Resposta per defecte | Defineix el focus inicial (Sí o No) |

---

## Limitacions {#limitations}

- El reenviament no és modificat per aquest complement (Respon i Respon a tothom estan admesos).
- Els adjunts molt grans poden estar subjectes als límits de Thunderbird o del proveïdor.
  - El complement no fragmenta ni comprimeix fitxers; es basa en la gestió normal d'adjunts de Thunderbird.
- Missatges xifrats: les parts S/MIME s'exclouen intencionadament.

---

## Per què pot ser que no s'afegeixin fitxers adjunts {#why-attachments-might-not-be-added}

- Les imatges que el missatge original incrusta no es copien com a fitxers. Ja són al cos de la resposta, on les ha posades el Thunderbird. Vegeu [Configuració](configuration#include-inline-pictures).
- Les parts de signatura S/MIME s'exclouen per disseny: noms de fitxer com `smime.p7s` i tipus MIME com `application/pkcs7-signature` o `application/pkcs7-mime` s'ometen.
- Els patrons de llista negra poden filtrar candidats: vegeu [Configuració](configuration#blacklist-glob-patterns); la coincidència no distingeix majúscules/minúscules i és només pel nom de fitxer.
- Els noms de fitxer duplicats no es tornen a afegir: si la redacció ja conté un fitxer amb el mateix nom normalitzat, s'omet.
- Parts que no són fitxers o sense nom de fitxer: només es consideren per afegir les parts tipus fitxer amb noms de fitxer utilitzables.

---

Vegeu també

- [Configuració](configuration)
