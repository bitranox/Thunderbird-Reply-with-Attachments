---
id: privacy
title: 'Privadesa'
sidebar_label: 'Privadesa'
---

## Privadesa

:::note Sense telemetria; sense xarxa de fons
Aquesta addició **no** recull dades d'analítica/telemetria i **no** fa sol·licituds de xarxa de fons. Qualsevol accés a la xarxa només ocorre quan fas clic en un enllaç extern (Docs, GitHub, Donar).
:::

Reply with Attachments no recopila analítiques ni telemetria i no envia les teves dades enlloc.

El que fa l'addició:

- Llegeix metadades d'adhesió i fitxers del missatge original localment (API de Thunderbird) per adjuntar-los a la teva resposta.
- Emmagatzema les teves opcions (llista negra, confirmació, resposta per defecte) en l'emmagatzematge local de Thunderbird.

El que l'addició no fa:

- Sense seguiment, analítiques, informes de fallades o registres remots.
- Sense sol·licituds de xarxa de fons, excepte quan obres explícitament enllaços externs (Docs, GitHub, Donar).

Les autoritzacions estan documentades a la pàgina de [Permisos](permissions).

---

## Política de seguretat del contingut (CSP) {#content-security-policy-csp}

Les opcions i les pàgines emergents eviten scripts en línia. Tots els JavaScript es carreguen des de fitxers subministrats amb l'addició per complir amb la rígida CSP a Thunderbird. Si integrates fragments de codi en documentació, són només exemples i no s'executen per l'addició.

---

## Emmagatzematge de dades {#data-storage}

- Les preferències de l'usuari (llista negra, commutador de confirmació, resposta per defecte) s'emmagatzemen a l'`storage.local` de Thunderbird per a aquesta addició.
- No es realitza sincronització al núvol per part de l'addició.

---

## Xarxa {#network}

- L'addició no realitza activitat de xarxa de fons.
- Qualsevol accés a la xarxa només ocorre quan fas clic en enllaços (Docs, GitHub, Donar) o quan Thunderbird mateix realitza operacions normals no relacionades amb aquesta addició.

---

## Eliminació de dades {#data-removal}

- Desinstal·lar l'addició elimina el seu codi.
- Les configuracions es mantenen només a l'`storage.local` de Thunderbird i es llancen en desinstal·lar; no s'utilitza emmagatzematge extern.
- Restableix les configuracions sense desinstal·lar:
  - Pàgina d'opcions: utilitza “Restablir a predeterminats” per a la llista negra i l'avís de llista negra.
  - Avançat: a Thunderbird → Eines → Eines de desenvolupador → Depurar addicions, obre l'emmagatzematge de l'extensió i esborrar les claus si cal.

---
