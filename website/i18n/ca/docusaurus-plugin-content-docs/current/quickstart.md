---
id: quickstart
title: 'Inici ràpid'
sidebar_label: 'Inici ràpid'
---

---

## Guia ràpida

:::important Versió mínima de Thunderbird
Aquest complement és compatible amb Thunderbird **128 ESR o versions més recents**. Les versions anteriors no són compatibles.
:::

:::note Sense telemetria; sense xarxa en segon pla
El complement **no** recull analítiques/telemetria i **no** fa sol·licituds de xarxa en segon pla. L’accés a la xarxa només es produeix quan feu clic a enllaços externs (Documentació, GitHub, Donatius).
:::

---

### Instal·lació

1. Instal·leu el complement des de Thunderbird Add‑ons.
2. Opcional: habiliteu la confirmació (Opcions → “Preguntar abans d’afegir fitxers adjunts”).
3. Opcional: deixeu activat l’avís de llista negra (per defecte): “Avisa si els fitxers adjunts queden exclosos per la llista negra”.
4. Opcional: afegiu patrons de llista negra (un per línia), p. ex.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: El “# …” de dalt és un comentari en aquesta documentació; no inclogueu comentaris als patrons que enganxeu a Opcions. Introduïu només un patró per línia.

Ara responeu a un missatge amb fitxers adjunts — els originals s’afegiran automàticament o després d’una confirmació ràpida. Si algun fitxer queda exclòs per la vostra llista negra, veureu un avís breu que els enumera.

---

### Comprova {#verify}

- Responeu a un missatge amb 1–2 adjunts i comproveu que els originals s’afegeixen a la finestra de redacció.
- Per ajustar el comportament, vegeu [Configuració](configuration) (interruptor de confirmació, resposta per defecte, patrons de llista negra).

---

### Comprova l’avís de llista negra {#verify-blacklist-warning}

- Responeu a un missatge que contingui un fitxer com “secret.txt”.
- Amb “Avisa si els fitxers adjunts queden exclosos per la llista negra” activat, un petit diàleg llista els fitxers exclosos i el patró que hi coincideix.

Si no veieu cap avís, assegureu-vos que el patró coincideix exactament amb el nom del fitxer (nom del fitxer només, sense distingir majúscules i minúscules). Vegeu Configuració → Llista negra.

---

### Nota sobre el teclat {#keyboard-note}

- El diàleg de confirmació admet Y/J per a Sí i N/Esc per a No. En alguns teclats no llatins, les tecles de lletra poden variar; Intro confirma el botó enfocat.

---
