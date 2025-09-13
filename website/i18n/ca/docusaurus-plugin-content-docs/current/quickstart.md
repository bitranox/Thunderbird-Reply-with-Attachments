---
id: quickstart
title: 'Inici ràpid'
sidebar_label: 'Inici ràpid'
---

## Quickstart

:::important Versió mínima de Thunderbird
Aquest complement dona suport a Thunderbird **128 ESR o superior**. Les versions més antigues no són compatibles.
:::

:::note Sense telemetria; sense xarxa en segon pla
El complement **no** recull anàlisis/telemetria i no fa **cap** sol·licitud de xarxa en segon pla. L'accés a la xarxa només es produeix quan feu clic en enllaços externs (Docs, GitHub, Dona).
:::

---

### Instal·lar

1. Instal·leu el complement des de Thunderbird Add‑ons.
2. Opcional: Activeu la confirmació (Opcions → “Preguntar abans d'afegir adjunts”).
3. Opcional: Deixeu activada l'advertència de llista negra (per defecte): “Advertir si els adjunts són excloïts per la llista negra”.
4. Opcional: Afegiu patrons de llista negra (un per línia), per exemple:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: El “# …” d'apartat és un comentari en aquesta documentació; no inclogueu comentaris en patrons que enganxeu a Opcions. Introduïu un patró per línia només.

Ara responeu a un missatge amb adjunts — els originals s'afegiran automàticament o després d'una ràpida confirmació. Si alguns fitxers són excloïts per la vostra llista negra, veureu un breu avís que els enumerarà.

---

### Verificar {#verify}

- Respon a un missatge amb 1–2 adjunts i confirma que els originals s'han afegit a la finestra de redacció.
- Per ajustar el comportament, consulteu [Configuració](configuration) (interruptor de confirmació, resposta per defecte, patrons de llista negra).

---

### Verificar advertència de llista negra {#verify-blacklist-warning}

- Respon a un missatge que contingui un fitxer com “secret.txt”.
- Amb “Advertir si els adjunts són excloïts per la llista negra” activat, un petit diàleg enumera els fitxers exclosos i el patró que coincideix.

Si no veieu cap advertència, assegureu-vos que el patró coincideix exactament amb el nom del fitxer (nom‑només, insensible a majúscules). Vegeu Configuració → Llista negra.

---

### Nota del teclat {#keyboard-note}

- El diàleg de confirmació admet Y/J per Sí i N/Esc per No. En alguns teclats no llatins, les tecles de lletres poden variar; Intro confirma el botó seleccionat.

---
