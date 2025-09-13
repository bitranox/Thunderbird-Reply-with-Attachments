---
id: install
title: 'Instal·lació'
slug: /install
sidebar_label: 'Instal·lació'
---

## Instal·lació a través de "Extensions i Temes de Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versió mínima de Thunderbird
Aquesta extensió és compatible amb Thunderbird **128 ESR o superior**. Les versions més antigues no són compatibles.
:::

Aquesta és la mètode d'instal·lació recomanada. Les extensions instal·lades des d'ATN (addons.thunderbird.net) reben actualitzacions automàtiques. Les instal·lacions LOCAL/dev no s'actualitzen automàticament.

- Versió mínima de Thunderbird: 128 ESR o superior.

1. A Thunderbird, vés a **Eines > Extensions i Temes**.
2. Cerca "respondre amb fitxers adjunts".
3. Afegeix l'extensió.

O obre la pàgina de l'extensió directament: [Extensions de Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instal·lació manual des de XPI {#local-installation-in-thunderbird}

### Descarrega el fitxer XPI {#download-the-xpi-file}

1. Vés a la [pàgina d'extensions de Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Descarrega l'última versió de l'extensió com un fitxer XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instal·lar a Thunderbird {#install-in-thunderbird-local}

1. Obre Thunderbird.
2. Vés a **Eines > Extensions i Temes**.
3. A l'**Administrador d'Extensions**, fes clic a la icona d'engranatge a la cantonada superior dreta.
4. Tria **Instal·lar extension des del fitxer…** del menú.
5. Selecciona el fitxer `reply_with_attachments-x.y.z-tb.xpi` descarregat.
6. Confirma la instal·lació quan se't demani.

---

## Instal·lació per a desenvolupament {#installation-for-development}

### Descarrega el repositori {#download-the-repository}

1. Descarrega l'última versió del repositori de GitHub.
2. Executa `make help` per a més informació.

### Instal·lar a Thunderbird {#install-in-thunderbird-dev}

1. Obre Thunderbird.
2. Vés a **Eines > Extensions i Temes**.
3. A l'**Administrador d'Extensions**, fes clic a la icona d'engranatge a la cantonada superior dreta.
4. Tria **Instal·lar extensió des del fitxer…** del menú.
5. Selecciona el fitxer generat `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirma la instal·lació quan se't demani.

Nota: Si Thunderbird no accepta el `.zip` al teu sistema, posa-li el nom `.xpi` i intenta “Instal·lar extensió des del fitxer…” de nou.

### On trobar el ZIP LOCAL {#where-local-zip}

- Primer, empaqueta l'extensió: executa `make pack` a la arrel del repositori.
- Després d'empaquetar, troba el zip “LOCAL” a la arrel del repositori (per exemple, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Abans de tornar a empaquetar per a proves, actualitza les versions tant a `sources/manifest_ATN.json` com a `sources/manifest_LOCAL.json`.

---

## Desactivar, Desinstal·lar i Actualitzacions {#disable-uninstall-updates}

- Desactivar: Thunderbird → Eines → Extensions i Temes → troba l'extensió → desactiva.
- Desinstal·lar: mateixa vista → menú de tres punts → Elimina.
- Actualitzacions: les instal·lacions d'ATN s'actualitzen automàticament quan es aproven noves versions. Les instal·lacions LOCAL/dev no s'actualitzen automàticament; reinstal·la una nova compilació LOCAL manualment.
- Elimina la configuració completament: consulta [Privacitat → Eliminació de dades](privacy#data-removal).

Vegeu també

- [Inici ràpid](quickstart)
