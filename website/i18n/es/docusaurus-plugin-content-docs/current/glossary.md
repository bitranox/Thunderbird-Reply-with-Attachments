---
id: glossary
title: Glosario i18n
sidebar_label: Glosario
---

Términos canónicos usados en la interfaz y la documentación del complemento. Úsalos para mantener traducciones coherentes entre idiomas.

## Notas

- Mantén los textos de la UI cortos y orientados a la acción.
- Prefiere sustantivos para ajustes y verbos para acciones.
- Usa “sentence case” (solo la primera palabra en mayúscula), salvo en títulos.

## Términos

- Adjuntos (Attachments): archivos incluidos con un correo. Evita “enclosures”.
- Lista negra (Blacklist / lista de exclusión): lista de patrones que impiden adjuntar archivos automáticamente.
- En la UI, usa “Blacklist (glob patterns)” para coincidir con la página de ajustes.
- Explica que solo se comparan nombres de archivo; no rutas.
- Confirmar / Confirmación: preguntar al usuario antes de añadir adjuntos.
- Respuestas: “Yes” (añadir), “No” (cancelar). Etiquetas de botones, breves.
- Imagen incrustada (Inline image): imagen referenciada por CID en HTML; nunca se añade como archivo.
- Firma S/MIME: `smime.p7s` o partes PKCS7; nunca se añaden.
- Opciones / Ajustes (Options / Settings): página de configuración del complemento en Thunderbird.
- Respuesta predeterminada (Default answer): respuesta preseleccionada en el diálogo de confirmación.

## Estilo

- Nombres de archivo: en monoespaciado, p. ej., `smime.p7s`, `*.png`.
- Teclas/botones: mayúsculas tipo título solo en nombres propios; si no, sentence case.
- Evita jerga (p. ej., “idempotency”); prefiere “evitar duplicados”.
