---
id: support
title: 'Soporte'
sidebar_label: 'Soporte'
---

## FAQ {#faq}

### Los archivos adjuntos no se añadieron — ¿por qué?

- Las imágenes en línea y las partes S/MIME están intencionadamente excluidas.
- Se omiten los nombres de archivo duplicados si el mensaje ya tiene el mismo archivo.
- Los patrones de la lista negra pueden filtrar candidatos; consulta [Configuración](configuration#blacklist-glob-patterns).

### ¿Puedo confirmar antes de añadir archivos adjuntos?

Sí. Activa “Preguntar antes de añadir archivos adjuntos” en [Configuración → Confirmación](configuration#confirmation). Teclado: Y/J = Sí, N/Esc = No.

### ¿El complemento envía algún dato o rastrea el uso?

No. Consulta [Privacidad](privacy) — sin telemetría y sin solicitudes de red en segundo plano.

### El reenvío no añade archivos adjuntos — ¿se espera esto?

Sí. Solo Responder y Responder a todos son modificados por este complemento; Reenviar se deja sin cambios. Consulta [Limitaciones](usage#limitations).

### ¿Dónde está la opción de diferir donaciones?

Opciones → sección Soporte. Consulta [Visibilidad de Donaciones](configuration#donation-visibility).

---

## Soporte

¿Necesitas ayuda o quieres reportar un error?

---

### Abre un problema en GitHub:

- Repositorio: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemas: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Incluye la versión de Thunderbird (por ejemplo, 128 ESR), el SO, y los pasos para reproducir
- Adjunta los registros relevantes de la Consola de Errores de Thunderbird (Herramientas → Herramientas de Desarrollo → Consola de Errores)

- Sitio de complementos (ATN): También puedes dejar comentarios a través de la [página del complemento](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Consejos

- Asegúrate de estar en una versión compatible de Thunderbird (128 ESR o más reciente).
- Consulta la documentación de Configuración y Uso para preguntas comunes de instalación.
- Para desarrollo/pruebas, consulta la guía de Desarrollo.
- Si los ajustes almacenados parecen no aplicarse correctamente, reinicia Thunderbird y prueba nuevamente. (Thunderbird puede almacenar en caché el estado entre sesiones; un reinicio asegura que se carguen configuraciones frescas).
- Reproducción mínima: prueba con un pequeño correo de prueba que contenga uno o dos archivos adjuntos simples.
- Compara el comportamiento con la confirmación ACTIVADA vs. DESACTIVADA para reducir si el flujo de diálogo está involucrado.

---

### Qué incluir en un informe

- Versión de Thunderbird y SO
- Pasos exactos para reproducir (lo que hiciste, lo que esperabas, lo que sucedió)
- Si la confirmación estaba activada y tu configuración de respuesta predeterminada
- Un ejemplo de tus patrones de lista negra (si es relevante)
- Registros de la Consola de Errores mientras reproduces (Herramientas → Herramientas de Desarrollo → Consola de Errores)
- Habilitar registro de depuración (opcional):
  - Ejecuta en la Consola de Errores de Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduce el problema y copia las líneas de registro relevantes `[RWA]`

---

### Plantilla de informe (copia/pegado) {#issue-template}

- Versión de Thunderbird y SO:
- Pasos para reproducir:
- ¿Confirmación habilitada? Respuesta predeterminada:
- Ejemplo de patrones de lista negra:
- Registros de la Consola de Errores (Herramientas → Herramientas de Desarrollo → Consola de Errores):
- ¿Algo más relevante?

---

### Dona

Si deseas apoyar este proyecto, considera hacer una pequeña contribución en la página de [Donar](donation). ¡Gracias!
