---
id: permissions
title: Permisos
---

El complemento solicita un conjunto pequeño y específico de permisos. Motivo de cada uno:

- compose: observar eventos de redacción, listar/añadir adjuntos en tu respuesta.
- messagesRead: leer metadatos y obtener adjuntos del mensaje original.
- scripting: insertar el pequeño cuadro de confirmación en la redacción cuando esté habilitado.
- windows: abrir una pequeña ventana de confirmación si falla la mensajería.
- sessions: guardar una marca por pestaña para evitar procesamientos duplicados.
- storage: persistir opciones (lista negra, confirmación, respuesta predeterminada).
- tabs: mensajería dirigida a la pestaña de redacción para las solicitudes de confirmación.

Todo está documentado en el código y probado en CI. El complemento no recopila telemetría.
