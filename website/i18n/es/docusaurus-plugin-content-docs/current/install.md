---
id: install
title: 'Instalación'
slug: /install
sidebar_label: 'Instalación'
---

---

## Instalación mediante "Complementos y temas de Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versión mínima de Thunderbird
Este complemento es compatible con Thunderbird **128 ESR o posterior**. No se admiten versiones anteriores.
:::

Este es el método de instalación recomendado. Los complementos instalados desde ATN (addons.thunderbird.net) reciben actualizaciones automáticas. Las instalaciones LOCAL/dev no se actualizan automáticamente.

- Versión mínima de Thunderbird: 128 ESR o posterior.

1. En Thunderbird, ve a **Herramientas > Complementos y temas**.
2. Busca "reply with attachments".
3. Añade el complemento.

O abre directamente la página del complemento: [Complementos de Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalación manual desde XPI {#local-installation-in-thunderbird}

### Descargar el archivo XPI {#download-the-xpi-file}

1. Ve a la [página del complemento de Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Descarga la última versión del complemento como archivo XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalar en Thunderbird {#install-in-thunderbird-local}

1. Abre Thunderbird.
2. Ve a **Herramientas > Complementos y temas**.
3. En el **Administrador de complementos**, haz clic en el icono de engranaje en la esquina superior derecha.
4. Elige **Instalar complemento desde archivo…** en el menú.
5. Selecciona el archivo `reply_with_attachments-x.y.z-tb.xpi` descargado.
6. Confirma la instalación cuando se te solicite.

---

## Instalación para desarrollo {#installation-for-development}

### Descargar el repositorio {#download-the-repository}

1. Descarga la última versión del repositorio de GitHub.
2. Ejecuta `make help` para obtener más información.

### Instalar en Thunderbird {#install-in-thunderbird-dev}

1. Abre Thunderbird.
2. Ve a **Herramientas > Complementos y temas**.
3. En el **Administrador de complementos**, haz clic en el icono de engranaje en la esquina superior derecha.
4. Elige **Instalar complemento desde archivo…** en el menú.
5. Selecciona el archivo generado `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirma la instalación cuando se te solicite.

Nota: Si Thunderbird no acepta el `.zip` en tu sistema, cámbiale el nombre a `.xpi` e intenta de nuevo “Instalar complemento desde archivo…”.

### Dónde encontrar el ZIP LOCAL {#where-local-zip}

- Primero, empaqueta el complemento: ejecuta `make pack` en la raíz del repositorio.
- Después de empaquetar, encuentra el zip “LOCAL” en la raíz del repositorio (p. ej., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Antes de volver a empaquetar para pruebas, incrementa las versiones tanto en `sources/manifest_ATN.json` como en `sources/manifest_LOCAL.json`.

---

## Desactivar, desinstalar y actualizaciones {#disable-uninstall-updates}

- Desactivar: Thunderbird → Herramientas → Complementos y temas → encuentra el complemento → desactívalo.
- Desinstalar: misma vista → menú de tres puntos → Quitar.
- Actualizaciones: las instalaciones desde ATN se actualizan automáticamente cuando se aprueban nuevas versiones. Las instalaciones LOCAL/dev no se actualizan automáticamente; reinstala manualmente una nueva compilación LOCAL.
- Eliminar la configuración por completo: consulta [Privacidad → Eliminación de datos](privacy#data-removal).

Consulta también

- [Inicio rápido](quickstart)
