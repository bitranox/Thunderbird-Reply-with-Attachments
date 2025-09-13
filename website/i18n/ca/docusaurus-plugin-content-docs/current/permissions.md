---
id: permissions
title: 'Permisos'
---

## Permisos

:::note Permisos mínims
No s'han sol·licitat permisos mínims d'amfitrió (web) per a aquest complement. El complement no reculla telemetria ni fa peticions de xarxa en segon pla. Vegeu [Privacitat](privacy).
:::

---

El complement sol·licita un conjunt reduït i centrat de permisos només. Per què es necessita cadascun:

- `compose`: observar els esdeveniments de redacció, llistar/afegir adjunts en la seva resposta.
- `messagesRead`: llegir metadades i obtenir fitxers adjunts del missatge original.
- `scripting`: injectar el petit diàleg de confirmació en redacció quan es permeti.
- `windows`: obrir un petit popup de confirmació com a últim recurs quan falli el missatger.
- `sessions`: emmagatzemar una bandera per pestanya per evitar processaments duplicats.
- `storage`: persistir opcions (llista negra, interruptor de confirmació, resposta per defecte).
- `tabs`: missatgeria dirigida a la pestanya de redacció per a peticions de confirmació.

Notes addicionals:

- No s'han sol·licitat permisos d'amfitrió (orígens web) per a aquest complement.
- El permís `tabs` s'utilitza només per dirigir-se a la pestanya de redacció quan es coordina el diàleg de confirmació opcional; no s'utilitza per llegir l'historial ni navegar pàgines.

Aquests es documenten en el codi font i es proven en CI. El complement no recull telemetria.

---

### Resum (permissions → purpose) {#permissions-summary}

| Permís             | Per què és necessari                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| `compose`          | Observar esdeveniments de redacció; llistar i afegir adjunts en la seva resposta.   |
| `messagesRead`     | Llistar adjunts del missatge original i obtenir les dades del fitxer.               |
| `scripting`        | Injectar/coordinar una interfície lleugera per a la confirmació quan es permeti.    |
| `windows`          | Popup de fallback si fallit el missatger (rara vegada).                             |
| `sessions`         | Emmagatzemar una bandera per pestanya per evitar processaments duplicats.           |
| `storage`          | Persistir opcions (llista negra, interruptor de confirmació, resposta per defecte). |
| `tabs`             | Missatgeria dirigida a la pestanya de redacció per a peticions de confirmació.      |
| (perms d'amfitrió) | Cap — el complement no sol·licita orígens web.                                      |

---

## No sol·licitats {#not-requested}

- `compose.save`, `compose.send` — el complement no desa ni envia correu en el seu nom.

Vegeu també: [Privacitat](privacy) — sense telemetria, sense xarxa en segon pla, només enllaços iniciats per l'usuari.

---
