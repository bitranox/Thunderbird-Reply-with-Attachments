---
id: changelog
title: 'Registro de cambios'
---

---

## Registro de cambios

Para ver el historial completo y detallado, consulta el
[CHANGELOG.md en GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: las imágenes ya no se descartan solo porque el remitente les puso un `Content-ID`; la opción "Include inline pictures" ha desaparecido, ya que Thunderbird conserva por sí solo las imágenes incrustadas en el cuerpo de la respuesta; los enlaces ahora se abren en el navegador del sistema; un límite de 50 adjuntos / 100 MB por respuesta, informando de todo lo que se deje fuera.
- 2.3.2: "Include inline pictures" incrustaba las imágenes en el cuerpo de la respuesta como URI de datos base64 (eliminada de nuevo tras la revisión de add-ons.thunderbird.net; Thunderbird lo hace por sí mismo); mejoras de calidad del código y cobertura de pruebas ampliada.
- 2.3.1: Conserva los archivos adjuntos después de que Thunderbird pone en reposo la página de eventos en segundo plano; añade ganchos de depuración específicos para la solución de problemas.
- 2.3.0: Deduplicación de adjuntos perfeccionada, cobertura de pruebas ampliada y eliminación de permisos obsoletos para cumplir con las políticas de AMO.
- 2.1.0: Soporte completo de internacionalización para los 100 idiomas principales.
- 2.0.0: reescritura a una versión con todas las funciones (EN/DE)
- 1.0.1: se cambió a messages.listAttachments()
- 1.0.0: lanzamiento inicial

---

## Fechas y canales {#dates-and-channels}

- Las publicaciones en ATN pueden retrasarse unas horas después del empaquetado.
- Las compilaciones LOCAL son solo para pruebas de desarrolladores y no se distribuyen a través de ATN.

---
