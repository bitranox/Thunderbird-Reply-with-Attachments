---
id: features
title: Características
sidebar_label: Características
---

## Características

- Adjunta automáticamente los archivos del correo original al responder.
- Comportamiento configurable: los archivos adjuntos pueden
  - añadirse automáticamente, o
  - añadirse solo tras confirmación (un cuadro de diálogo pequeño y accesible). En Opciones puedes activar la confirmación y elegir la respuesta predeterminada (Sí/No).
- La lista negra de nombres de archivo (patrones glob) evita que se adjunten automáticamente ciertos archivos. Ejemplos: `*intern*`, `*secret*`, `*passwor*`.
  La coincidencia no distingue mayúsculas/minúsculas y solo comprueba el nombre del archivo; proporciona un patrón por línea en Opciones.
- Aviso de lista negra (opcional, activado por defecto): cuando tu lista negra excluye archivos, un pequeño modal muestra el archivo y los patrones coincidentes. Compatible con modo oscuro y accesible por teclado (Enter/Esc para cerrar).
- Añade los originales incluso si ya has adjuntado algo; evita duplicados por nombre de archivo.
- Omite certificados SMIME e imágenes en línea para evitar adjuntos innecesarios.
