---
id: usage
title: Uso
sidebar_label: Uso
---

## Uso

- Al responder, el complemento añade automáticamente los originales, o pregunta primero si así lo has configurado en Opciones.
- Sin duplicados por nombre de archivo; se omiten siempre los SMIME y las imágenes incrustadas.
- Los adjuntos en la lista negra también se omiten (sin distinción de mayúsculas/minúsculas, patrones glob).

---

## Detalles del comportamiento

- Prevención de duplicados: el complemento marca la pestaña de redacción como procesada mediante un valor de sesión por pestaña y una guarda en memoria. No añadirá los originales dos veces.
- Respeto por los adjuntos existentes: si la redacción ya contiene algunos adjuntos, los originales se añaden exactamente una vez, omitiendo los nombres de archivo que ya existan.
- Exclusiones: se ignoran los artefactos SMIME (p. ej., `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) y las imágenes incrustadas. Si en el primer pase no hay candidatos válidos, un modo relajado vuelve a comprobar las partes no‑SMIME.
- Aviso de lista negra (si está habilitado): cuando se excluyen candidatos por tu lista negra, el complemento muestra un modal pequeño con los archivos afectados y los patrones coincidentes; también aparece si no se añadirá nada porque todo fue excluido.
