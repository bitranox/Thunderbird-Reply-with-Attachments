---
id: permissions
title: 'Permisos'
---

## Permisos

:::note Permisos mínimos
No se solicitan permisos de host (web) por este complemento. El complemento no recoge telemetría ni realiza solicitudes de red en segundo plano. Consulte [Privacidad](privacy).
:::

---

El complemento solicita un conjunto pequeño y enfocado de permisos únicamente. Por qué se necesita cada uno:

- `compose`: observar eventos de composición, listar/agregar archivos adjuntos en su respuesta.
- `messagesRead`: leer metadatos y obtener archivos adjuntos del mensaje original.
- `scripting`: inyectar el pequeño diálogo de confirmación en la composición cuando esté habilitado.
- `windows`: abrir un pequeño popup de confirmación como último recurso cuando el envío de mensajes falla.
- `sessions`: almacenar un indicador por pestaña para evitar el procesamiento duplicado.
- `storage`: persistir opciones (lista negra, alternar confirmación, respuesta predeterminada).
- `tabs`: mensajería dirigida a la pestaña de composición para solicitudes de confirmación.

Notas adicionales:

- No se solicitan permisos de host (orígenes web) por este complemento.
- El permiso `tabs` se utiliza únicamente para dirigir a la pestaña de composición al coordinar el diálogo de confirmación opcional; no se utiliza para leer el historial o navegar por páginas.

Estos están documentados en la fuente y probados en CI. El complemento no recoge telemetría.

---

### Resumen (permisos → propósito) {#permissions-summary}

| Permiso            | Por qué es necesario                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| `compose`          | Observar eventos de composición; listar y agregar archivos adjuntos en su respuesta. |
| `messagesRead`     | Listar archivos adjuntos del mensaje original y obtener los datos del archivo.       |
| `scripting`        | Inyectar/coordinador UI liviana para confirmación cuando esté habilitado.            |
| `windows`          | Popup de respaldo si el envío de mensajes falla (raro).                              |
| `sessions`         | Almacenar un indicador por pestaña para prevenir el procesamiento duplicado.         |
| `storage`          | Persistir opciones (lista negra, alternar confirmación, respuesta predeterminada).   |
| `tabs`             | Mensajería dirigida a la pestaña de composición para solicitudes de confirmación.    |
| (permisos de host) | Ninguno — el complemento no solicita orígenes web.                                   |

---

## No solicitados {#not-requested}

- `compose.save`, `compose.send` — el complemento no guarda ni envía correo en su nombre.

Consulte también: [Privacidad](privacy) — sin telemetría, sin red en segundo plano, solo enlaces iniciados por el usuario.

---
