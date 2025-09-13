---
id: install
title: 'Instalación'
slug: /install
sidebar_label: 'Instalación'
---

## Instalación a través de "Complementos y Temas de Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versión mínima de Thunderbird
Este complemento es compatible con Thunderbird **128 ESR o superior**. Las versiones anteriores no son compatibles.
:::

Este es el método de instalación recomendado. Los complementos instalados desde ATN (addons.thunderbird.net) reciben actualizaciones automáticas. Las instalaciones LOCAL/dev no se actualizan automáticamente.

- Versión mínima de Thunderbird: 128 ESR o superior.

1. En Thunderbird, ve a **Herramientas > Complementos y Temas**.
2. Busca "responder con archivos adjuntos".
3. Agrega el complemento.

O abre la página del complemento directamente: [Complementos de Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalación manual desde XPI {#local-installation-in-thunderbird}

### Descargar el archivo XPI {#download-the-xpi-file}

1. Ve a la [página del complemento de Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Descarga la versión más reciente del complemento como un archivo XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalar en Thunderbird {#install-in-thunderbird-local}

1. Abre Thunderbird.
2. Ve a **Herramientas > Complementos y Temas**.
3. En el **Administrador de complementos**, haz clic en el ícono de engranaje en la esquina superior derecha.
4. Elige **Instalar complemento desde archivo…** en el menú.
5. Selecciona el archivo `reply_with_attachments-x.y.z-tb.xpi` descargado.
6. Confirma la instalación cuando se te pida.

---

## Instalación para desarrollo {#installation-for-development}

### Descargar el repositorio {#download-the-repository}

1. Descarga la versión más reciente del repositorio de GitHub.
2. Ejecuta `make help` para más información.

### Instalar en Thunderbird {#install-in-thunderbird-dev}

1. Abre Thunderbird.
2. Ve a **Herramientas > Complementos y Temas**.
3. En el **Administrador de complementos**, haz clic en el ícono de engranaje en la esquina superior derecha.
4. Elige **Instalar complemento desde archivo…** en el menú.
5. Selecciona el archivo generado `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirma la instalación cuando se te pida.

Nota: Si Thunderbird no acepta el `.zip` en tu sistema, renómbralo a `.xpi` y prueba "Instalar complemento desde archivo…" nuevamente.

### Dónde encontrar el ZIP LOCAL {#where-local-zip}

- Primero, empaqueta el complemento: ejecuta `make pack` en la raíz del repositorio.
- Después de empaquetar, encuentra el zip “LOCAL” en la raíz del repositorio (por ejemplo, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Antes de volver a empaquetar para pruebas, incrementa las versiones en ambos `sources/manifest_ATN.json` y `sources/manifest_LOCAL.json`.

---

## Deshabilitar, Desinstalar y Actualizaciones {#disable-uninstall-updates}

- Deshabilitar: Thunderbird → Herramientas → Complementos y Temas → encuentra el complemento → desactivar.
- Desinstalar: misma vista → menú de tres puntos → Eliminar.
- Actualizaciones: las instalaciones de ATN se actualizan automáticamente cuando se aprueban nuevas versiones. Las instalaciones LOCAL/dev no se actualizan automáticamente; reinstala manualmente una nueva compilación LOCAL.
- Elimina completamente la configuración: consulta [Privacidad → Eliminación de datos](privacy#data-removal).

Ver también

- [Inicio rápido](quickstart)
