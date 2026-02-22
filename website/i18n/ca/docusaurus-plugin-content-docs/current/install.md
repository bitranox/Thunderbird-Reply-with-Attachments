---
id: install
title: 'Instal·lació'
slug: /install
sidebar_label: 'Instal·lació'
---

---

## Instal·lació mitjançant "Complements i Temes de Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versió mínima de Thunderbird
Aquest complement és compatible amb Thunderbird **128 ESR o posterior**. Les versions anteriors no són compatibles.
:::

Aquest és el mètode d'instal·lació recomanat. Els complements instal·lats des d'ATN (addons.thunderbird.net) reben actualitzacions automàtiques. Les instal·lacions LOCAL/dev no s'actualitzen automàticament.

- Versió mínima de Thunderbird: 128 ESR o posterior.

1. A Thunderbird, aneu a **Eines > Complements i Temes**.
2. Cerqueu "reply with attachments".
3. Afegiu el complement.

O obriu directament la pàgina del complement: [Complements de Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instal·lació manual des d’un XPI {#local-installation-in-thunderbird}

### Baixar el fitxer XPI {#download-the-xpi-file}

1. Aneu a la [pàgina del complement de Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Baixeu la versió més recent del complement com a fitxer XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instal·lar al Thunderbird {#install-in-thunderbird-local}

1. Obriu el Thunderbird.
2. Aneu a **Eines > Complements i Temes**.
3. Al **Gestor de complements**, feu clic a la icona d’engranatge a la cantonada superior dreta.
4. Trieu **Instal·lar complement des d’un fitxer…** al menú.
5. Seleccioneu el fitxer `reply_with_attachments-x.y.z-tb.xpi` descarregat.
6. Confirmeu la instal·lació quan se us demani.

---

## Instal·lació per al desenvolupament {#installation-for-development}

### Baixar el repositori {#download-the-repository}

1. Baixeu la versió més recent del repositori de GitHub.
2. Executeu `make help` per a més informació.

### Instal·lar al Thunderbird {#install-in-thunderbird-dev}

1. Obriu el Thunderbird.
2. Aneu a **Eines > Complements i Temes**.
3. Al **Gestor de complements**, feu clic a la icona d’engranatge a la cantonada superior dreta.
4. Trieu **Instal·lar complement des d’un fitxer…** al menú.
5. Seleccioneu el fitxer generat `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirmeu la instal·lació quan se us demani.

Nota: Si el Thunderbird no accepta el `.zip` al vostre sistema, reanomeu-lo a `.xpi` i torneu a provar “Instal·lar complement des d’un fitxer…”.

### On trobar el ZIP LOCAL {#where-local-zip}

- Primer, empaqueteu el complement: executeu `make pack` a l’arrel del repositori.
- Després d’empaquetar, trobareu el zip “LOCAL” a l’arrel del repositori (p. ex., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Abans de tornar a empaquetar per a proves, augmenteu les versions tant a `sources/manifest_ATN.json` com a `sources/manifest_LOCAL.json`.

---

## Desactivar, desinstal·lar i actualitzacions {#disable-uninstall-updates}

- Desactivar: Thunderbird → Eines → Complements i Temes → trobeu el complement → desactiveu-lo.
- Desinstal·lar: mateixa vista → menú de tres punts → Elimina.
- Actualitzacions: les instal·lacions d’ATN s’actualitzen automàticament quan s’aproven noves versions. Les instal·lacions LOCAL/dev no s’actualitzen automàticament; torneu a instal·lar manualment una nova compilació LOCAL.
- Eliminar del tot la configuració: vegeu [Privadesa → Eliminació de dades](privacy#data-removal).

Vegeu també

- [Guia ràpida](quickstart)
