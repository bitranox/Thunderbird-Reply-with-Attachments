---
id: features
title: 'Características'
sidebar_label: 'Características'
---

---

## Funciones {#features}

- Adjunta automáticamente archivos del correo original al responder.
- Comportamiento configurable: los adjuntos pueden
  - añadirse automáticamente, o
  - añadirse solo tras confirmación (un pequeño cuadro de diálogo accesible). En Opciones
    puede habilitar la confirmación y elegir la respuesta predeterminada (Sí/No).
- La lista de bloqueo de nombres de archivo (patrones glob) impide que archivos específicos se
  adjunten automáticamente. Ejemplos: `*intern*`, `*secret*`, `*passwor*`.
  La coincidencia no distingue mayúsculas y minúsculas y solo verifica el nombre del archivo; proporcione un patrón
  por línea en Opciones.
- Advertencia de lista de bloqueo (opcional, habilitada de forma predeterminada): cuando los archivos se excluyen por su
  lista de bloqueo, un pequeño modal enumera el archivo y el/los patrón(es) coincidente(s). Compatible con el modo
  oscuro y accesible mediante teclado (Intro/Esc para cerrar).
- Funciona con Responder y Responder a todos. Reenviar no se modifica por este complemento.
- Añade los originales incluso si ya adjuntó algo; evita duplicados por nombre de archivo.
- La protección contra duplicados por pestaña evita agregar dos veces en la misma pestaña de redacción.
- Omite los certificados S/MIME de forma predeterminada para evitar adjuntos innecesarios.
- Incluir imágenes en línea (predeterminado: ACTIVADO). Las imágenes incrustadas se restauran directamente en el
  cuerpo de la respuesta como URI de datos base64, preservando el diseño en línea original. Desactívelo en
  Opciones para omitir por completo las imágenes en línea.

---

## Cómo funciona {#how-it-works}

- Al responder, el complemento muestra los archivos adjuntos originales.
- Filtra las firmas S/MIME de los adjuntos; las imágenes en línea se restauran en el cuerpo (a menos que se desactive).
- Opcionalmente solicita confirmación (compatible con el teclado).
- Añade los archivos aptos a su ventana de redacción, evitando duplicados por nombre de archivo.
- Vea “Por qué es posible que no se agreguen los adjuntos” en Uso para casos límite.

Nota de privacidad: Todo el procesamiento ocurre localmente en Thunderbird. El complemento no realiza solicitudes de red en segundo plano.

---
