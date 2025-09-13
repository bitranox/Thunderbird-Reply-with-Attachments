---
id: privacy
title: 'Privacidad'
sidebar_label: 'Privacidad'
---

## Privacidad

:::note No telemetría; no red en segundo plano
Este complemento **no** recoge analíticas/telemetría y **no** realiza solicitudes de red en segundo plano. Cualquier acceso a la red ocurre solo cuando haces clic en un enlace externo (Docs, GitHub, Donar).
:::

Reply with Attachments no recoge analíticas ni telemetría y no envía tus datos a ningún lugar.

Lo que hace el complemento:

- Lee los metadatos y archivos de los adjuntos desde el mensaje original localmente (API de Thunderbird) para adjuntarlos a tu respuesta.
- Almacena tus opciones (lista negra, confirmación, respuesta predeterminada) en el almacenamiento local de Thunderbird.

Lo que el complemento **no** hace:

- No hay seguimiento, analíticas, informes de errores o registros remotos.
- No hay solicitudes de red en segundo plano, excepto cuando abres explícitamente enlaces externos (Docs, GitHub, Donar).

Los permisos están documentados en la página de [Permisos](permissions).

---

## Política de Seguridad de Contenidos (CSP) {#content-security-policy-csp}

Las opciones y las páginas emergentes evitan scripts en línea. Todo el JavaScript se carga desde archivos que vienen con el complemento para cumplir con la estricta CSP en Thunderbird. Si integras fragmentos de código en la documentación, son solo ejemplos y no se ejecutan por el complemento.

---

## Almacenamiento de datos {#data-storage}

- Las preferencias del usuario (lista negra, alternar confirmación, respuesta predeterminada) se almacenan en el `storage.local` de Thunderbird para este complemento.
- No se realiza sincronización en la nube por parte del complemento.

---

## Red {#network}

- El complemento no realiza ninguna actividad de red en segundo plano.
- Cualquier acceso a la red ocurre solo cuando haces clic en los enlaces (Docs, GitHub, Donar) o cuando Thunderbird realiza operaciones normales no relacionadas con este complemento.

---

## Eliminación de datos {#data-removal}

- Desinstalar el complemento elimina su código.
- La configuración se guarda solo en el `storage.local` de Thunderbird y se elimina al desinstalar; no se utiliza almacenamiento externo.
- Restablecer la configuración sin desinstalar:
  - Página de opciones: usa “Restablecer a los predeterminados” para la lista negra y la advertencia de lista negra.
  - Avanzado: en Thunderbird → Herramientas → Herramientas de desarrollador → Depurar complementos, abre el almacenamiento de la extensión y borra las claves si es necesario.

---
