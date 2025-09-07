---
id: privacy
title: Privacidad
sidebar_label: Privacidad
---

Responder con adjuntos no recopila analíticas ni telemetría, ni envía tus datos a ningún sitio.

Lo que hace el complemento:

- Lee metadatos y archivos de los adjuntos del mensaje original de forma local (API de Thunderbird) para añadirlos a tu respuesta.
- Almacena tus opciones (lista negra, confirmación, respuesta predeterminada) en el almacenamiento local de Thunderbird.

Lo que no hace:

- No seguimiento, analíticas, informes de fallos ni registros remotos.
- No realiza solicitudes de red en segundo plano, salvo cuando abres enlaces externos (Docs, GitHub, Donar).

Los permisos se documentan en la página de [Permisos](permissions).

## Política de seguridad de contenido (CSP)

Las páginas de opciones y ventanas emergentes evitan scripts inline. Todo el JavaScript se carga desde archivos incluidos con el complemento para cumplir con la CSP estricta de Thunderbird. Los fragmentos de código en la documentación son solo ejemplos y no se ejecutan en el complemento.
