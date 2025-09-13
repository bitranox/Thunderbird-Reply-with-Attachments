---
id: glossary
title: 'Glosario'
sidebar_label: 'Glosario'
---

## Glosario

Términos canónicos utilizados en la interfaz de usuario del complemento y la documentación. Úselos para mantener las traducciones consistentes entre locales.

---

### Notas

- Mantenga las cadenas de la interfaz de usuario cortas y orientadas a la acción.
- Prefiera sustantivos para configuraciones y verbos para acciones.
- Use mayúsculas al principio de la oración (solo la primera palabra en mayúscula) excepto para títulos.

---

### Términos

- **Adjuntos**: archivos incluidos con un correo electrónico. Evite "anexos".
- **Lista negra** (Excluir lista): lista de patrones que impiden que los archivos se adjunten automáticamente. En la interfaz de usuario, esto aparece como “Lista negra (patrones glob)”.
- En el texto de la interfaz de usuario, prefiera “Lista negra (patrones glob)” para coincidir con la página de configuración.
- Explique que solo se comparan los nombres de archivo; no las rutas.
- **Confirmar / Confirmación:** pida al usuario que continúe antes de agregar adjuntos.
- **Respuestas:** “Sí” (agregar), “No” (cancelar). Mantenga las etiquetas de los botones cortas.
- **Imagen en línea:** una imagen referenciada por CID en el HTML del mensaje; nunca añadida como un archivo.
- **Firma S/MIME:** `smime.p7s` o partes de firma PKCS7; nunca añadidas.
- **Opciones / Configuración:** la página de configuración del complemento en Thunderbird.
- **Respuesta predeterminada:** la respuesta preseleccionada para el cuadro de diálogo de confirmación.

---

### Acciones de correo electrónico

- **Responder:** responder al remitente de un mensaje.
- **Responder a todos:** responder al remitente y a todos los destinatarios.
- **Reenviar:** enviar el mensaje a un destinatario diferente; este complemento no modifica el comportamiento de reenviar.

---

### Tipos de adjuntos

- **Adjuntos en línea:** activos incrustados en el cuerpo del mensaje (por ejemplo, referenciados a través de Content-ID). No añadidos como archivos por el complemento.
- **Archivos adjuntos:** archivos adjuntos al mensaje como adjuntos regulares (candidatos para copiar en la respuesta).

---

### Estilo

- **Nombres de archivo:** mostrar como código (monoespaciado), por ejemplo, `smime.p7s`, `*.png`.
- **Claves/botones:** solo en mayúsculas cuando son nombres propios; de lo contrario, en minúsculas.
- **Evite la jerga** (por ejemplo, “idempotencia”); prefiera “prevenir duplicados”.

---
