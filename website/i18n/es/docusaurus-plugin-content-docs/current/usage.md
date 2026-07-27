---
id: usage
title: 'Uso'
sidebar_label: 'Uso'
---

---

## Uso {#usage}

- Responder y el complemento añade los adjuntos originales automáticamente — o pregunta primero, si está habilitado en Opciones.
- Se eliminan los duplicados por nombre de archivo; las partes S/MIME siempre se omiten. Las imágenes incrustadas en el mensaje original permanecen en el cuerpo de la respuesta, donde Thunderbird las coloca, y no se copian como archivos.
- Los adjuntos en la lista de bloqueo también se omiten (patrones glob sin distinción de mayúsculas/minúsculas que coinciden con nombres de archivo, no con rutas). Véase [Configuración](configuration#blacklist-glob-patterns).

---

### Qué ocurre al responder {#what-happens}

- Detectar la respuesta → listar los adjuntos originales → omitir S/MIME y las imágenes incrustadas → confirmación opcional → añadir los archivos elegibles (omitiendo duplicados).

| Tipo de parte                                              | Se copia en la respuesta |
|------------------------------------------------------------|-------------------------:|
| Archivo de firma S/MIME `smime.p7s`                        | No                       |
| Tipos MIME de S/MIME (`application/pkcs7-*`)               | No                       |
| Imagen que el cuerpo del mensaje incrusta mediante `cid:`  | No (está en el cuerpo)   |
| Imagen marcada como `Content-Disposition: inline`          | No (está en el cuerpo)   |
| Imagen con un `Content-ID` que el cuerpo nunca referencia  | Sí                       |
| Correo adjunto (`message/rfc822`) con un nombre de archivo | Sí                       |
| Archivo adjunto normal con un nombre de archivo            | Sí                       |

Una imagen se considera incrustada solo cuando el mensaje original realmente la referencia,
o cuando el remitente la ha marcado explícitamente como `Content-Disposition: inline`. Un simple
encabezado `Content-ID` no es suficiente: varios clientes de correo colocan uno en cada parte de imagen,
incluidos los adjuntos genuinos, y estos deben copiarse de todos modos.

---

### Referencia cruzada {#cross-reference}

- Reenviar no se modifica por diseño (véanse las Limitaciones más abajo).
- Para conocer los motivos por los que un adjunto podría no añadirse, vea “Por qué los adjuntos podrían no añadirse”.

---

## Detalles del comportamiento {#behavior-details}

- Prevención de duplicados: el complemento marca la pestaña de redacción como procesada mediante un valor de sesión por pestaña y una protección en memoria. No añadirá los originales dos veces.
- Cerrar y volver a abrir una ventana de redacción se trata como una pestaña nueva (es decir, se permite un nuevo intento).
- Respeto a los adjuntos existentes: Si la redacción ya contiene algunos adjuntos, los originales siguen añadiéndose exactamente una vez, omitiendo los nombres de archivo que ya existan.
- Exclusiones: los artefactos S/MIME y las imágenes en línea se excluyen de los archivos adjuntos. Si nada califica en el primer pase, un modo de reserva relajado vuelve a comprobar las partes que no son S/MIME. Las imágenes en línea se gestionan por separado: se restauran en el cuerpo de la respuesta como URI de datos (cuando está habilitado).
  - Nombres de archivo: `smime.p7s`
  - Tipos MIME: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Imágenes en línea: cualquier parte `image/*` referenciada por Content‑ID — excluida de los archivos adjuntos pero incrustada en el cuerpo de la respuesta cuando "Include inline pictures" está ON
  - Correos adjuntos (`message/rfc822`): se tratan como adjuntos normales si tienen un nombre de archivo; pueden añadirse (sujetos a comprobaciones de duplicados y a la lista de bloqueo).
- Aviso de lista de bloqueo (si está habilitado): Cuando los candidatos se excluyen por su lista de bloqueo,
  el complemento muestra un pequeño modal con los archivos afectados y los
  patrones coincidentes. Esta advertencia también aparece en los casos en que no se añadirán adjuntos porque todo fue excluido.

---

## Atajos de teclado {#keyboard-shortcuts}

- Diálogo de confirmación: Y/J = Sí, N/Esc = No; Tab/Shift+Tab y las teclas de flecha recorren el foco.
  - La opción “Default answer” en [Configuración](configuration#confirmation) establece el botón enfocado inicialmente.
  - Enter activa el botón enfocado. Tab/Shift+Tab y las flechas mueven el foco para accesibilidad.

### Guía rápida de teclado {#keyboard-cheat-sheet}

| Teclas           | Acción                              |
|------------------|-------------------------------------|
| Y / J            | Confirmar Sí                        |
| N / Esc          | Confirmar No                        |
| Enter            | Activar el botón enfocado           |
| Tab / Shift+Tab  | Mover el foco hacia adelante/atrás  |
| Teclas de flecha | Mover el foco entre los botones     |
| Default answer   | Establece el foco inicial (Sí o No) |

---

## Limitaciones {#limitations}

- Reenviar no se modifica con este complemento (se admiten Responder y Responder a todos).
- Los archivos adjuntos muy grandes pueden estar sujetos a los límites de Thunderbird o del proveedor.
  - El complemento no fragmenta ni comprime archivos; se basa en el manejo normal de adjuntos de Thunderbird.
- Mensajes cifrados: las partes S/MIME se excluyen intencionalmente.

---

## Por qué los adjuntos podrían no añadirse {#why-attachments-might-not-be-added}

- Las imágenes que incrusta el mensaje original no se copian como archivos. Ya están en el cuerpo de la respuesta, donde las ha colocado Thunderbird. Consulte [Configuración](configuration#include-inline-pictures).
- Las partes de firma S/MIME se excluyen por diseño: se omiten nombres de archivo como `smime.p7s` y tipos MIME como `application/pkcs7-signature` o `application/pkcs7-mime`.
- Los patrones de la lista de bloqueo pueden filtrar candidatos: véase [Configuración](configuration#blacklist-glob-patterns); la coincidencia no distingue mayúsculas/minúsculas y se basa solo en el nombre de archivo.
- Los nombres de archivo duplicados no se vuelven a añadir: si la redacción ya contiene un archivo con el mismo nombre normalizado, se omite.
- Partes que no son archivos o sin nombre de archivo: solo se consideran para añadir las partes de tipo archivo con nombres de archivo utilizables.

---

Véase también

- [Configuración](configuration)
