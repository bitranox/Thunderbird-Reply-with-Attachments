---
id: configuration
title: 'Configuración'
---

## Configuración

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

---

## Abrir opciones en Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Herramientas → Complementos y temas → encontrar “Responder con archivos adjuntos” → Preferencias/Opciones

---

### Configuración {#settings}

#### Confirmación {#confirmation}

- Alternar “Preguntar antes de añadir archivos adjuntos”
- Respuesta predeterminada: Sí o No (predeterminado de enfoque y teclado)
- Teclado: Y/J = Sí; N/Esc = No; Tab/Shift+Tab y las flechas cambian el enfoque
  - Ver detalles del teclado en [Uso](usage#keyboard-shortcuts).

---

#### Lista negra (patrones glob) {#blacklist-glob-patterns}

Los archivos en la lista negra no se añadirán automáticamente en la respuesta. Ver también el [Glosario](glossary) para “Lista negra (Lista de exclusión)”.

- Un patrón por línea; no distingue entre mayúsculas y minúsculas; coincidencia solo por nombre de archivo
- Ejemplos: `*intern*`, `*secret*`, `*passwor*`
- Tokens glob soportados: `*` (cualquier carácter excepto `/`), `?` (un carácter), clases de caracteres como `[abc]`. Usa `\[` para coincidir con un `[` literal. Las rutas (`**/`) se ignoran ya que solo se coinciden los nombres de archivo.
- No soportados: negación (`!`), expansión de llaves (`{..}`) y rangos complejos. Mantén los patrones simples.
- Los comentarios no son soportados en los patrones. No incluyas `#` o comentarios en línea; introduce solo el texto del patrón por línea.

---

##### Recetario de patrones {#pattern-cookbook}

- Coincidir con cualquier PDF: `*.pdf`
- Coincidir con archivos que comienzan con “scan”: `scan*`
- Clase de caracteres: `report[0-9].txt`
- Escapar un `[` literal: `\[` (útil cuando se coincide con un corchete como carácter)

---

##### Notas {#blacklist-notes}

- El orden no importa; la primera/cualquier coincidencia excluye el archivo.
- La coincidencia es solo por nombre de archivo (se ignoran rutas/carpetas).
- “Restablecer a los valores predeterminados” restaura los patrones recomendados y el interruptor de advertencia de la lista negra.
- ¿Por qué el ejemplo `*passwor*`? Coincide con las familias “password” y “Passwort”.
- Precedencia: si cualquier patrón coincide con un nombre de archivo, el archivo se excluye (primera/cualquier coincidencia; el orden no cambia el resultado).
- Consejo: prueba tu patrón: añade un patrón temporal, responde a un mensaje que contenga un archivo con un nombre coincidente y confirma que se excluye en la lista de advertencias.

##### Prueba rápida (prueba segura) {#blacklist-try-it}

1. Abre Opciones → Lista negra.
2. Añade un patrón temporal como `*.tmp` y haz clic en Guardar.
3. Responde a un correo de prueba que tenga un archivo terminado en `.tmp` — el archivo debería aparecer en la lista de advertencias y no ser adjuntado.
4. Elimina el patrón temporal al terminar, o haz clic en “Restablecer a los valores predeterminados”.

---

#### Advertencia sobre archivos adjuntos excluidos {#warning-on-excluded-attachments}

- Alternar “Advertir si se excluyen archivos adjuntos por la lista negra” (predeterminado: ACTIVADO).
- Cuando está habilitado, un pequeño modal lista los archivos excluidos y el/los patrón(es) coincidente(s). La advertencia también aparece cuando no se adjuntará nada porque todos los candidatos fueron excluidos.

---

#### Guarda tu configuración {#save-your-settings}

Las configuraciones se guardan presionando el botón Guardar. Puedes revertir campos individuales manualmente o restablecer valores predeterminados según sea necesario.

Si las configuraciones almacenadas parecen no aplicarse correctamente, reinicia Thunderbird y prueba nuevamente. (Thunderbird puede almacenar en caché el estado entre sesiones; un reinicio asegura que se carguen configuraciones nuevas.)

Consejo: Para confirmar que tus configuraciones tuvieron efecto, responde a cualquier mensaje con un archivo adjunto y verifica la advertencia de confirmación o de lista negra.

---

#### Visibilidad de donaciones (suspensión de 90 días) {#donation-visibility}

El complemento incluye una función de conveniencia para ocultar los avisos de donación durante un tiempo después de haber donado.

Dónde encontrarlo

- Opciones → Sección de soporte: verás un botón “He donado” y un área de pista pequeña.
- El diálogo de confirmación de envío también muestra un botón Donar; se oculta automáticamente cuando la suspensión está activa.

Cómo funciona

- Hacer clic en “He donado” oculta los botones de donación y los avisos relacionados durante 90 días.
- Una pista de estado muestra “Oculto hasta YYYY‑MM‑DD” (en tu fecha local). También hay un botón “Mostrar Donar nuevamente” para restaurar la visibilidad de inmediato.
- Después de 90 días, el botón Donar se hace visible de nuevo automáticamente.

Privacidad y almacenamiento

- El complemento almacena una sola marca de tiempo en el almacenamiento local de Thunderbird para recordar el período de suspensión. Clave: `donateHideUntil` (milisegundos desde la época).
- Esta configuración es local para tu perfil de Thunderbird (no sincronizada en la nube). No se realizan solicitudes de red por esta función.

Resolución de problemas

- Si Donar sigue apareciendo justo después de hacer clic en “He donado”, espera un momento o vuelve a abrir la página de Opciones; la interfaz se actualiza tan pronto como se guarda la configuración.
- Para restablecer manualmente, haz clic en “Mostrar Donar nuevamente”. También puedes esperar hasta que la fecha indicada en la pista pase.

Esta función es puramente por conveniencia; nunca bloquea la funcionalidad del complemento y no recopila ningún dato personal.

---

### Normalización de nombres de archivo (prevención de duplicados) {#filename-normalization-duplicates-prevention}

Para comportarse de manera consistente a través de plataformas, los nombres de archivo se normalizan antes de las verificaciones de duplicados:

- Unicode se normaliza a NFC.
- Los nombres son convertidos a minúsculas.
- Los puntos/espacios finales se recortan (amigable con Windows).

Esto mantiene la detección de duplicados predecible para nombres como `café.pdf` vs `café.pdf` (NFD) o `FILE.txt.` vs `file.txt`.

---

## Comportamiento de confirmación {#confirmation-behavior}

- La “respuesta predeterminada” establece el botón inicialmente enfocado en el diálogo de confirmación (útil para usuarios de teclado).
- Funciona para tanto “Responder” como “Responder a todos”. “Reenviar” no es modificado por este complemento.

---

## Avanzado: detección de duplicados {#advanced-duplicate-detection}

La prevención de duplicados se implementa por pestaña de redacción y por nombre de archivo. Ver [Uso](usage#behavior-details) para una explicación detallada.

---

Ver también

- [Permisos](permissions)
- [Privacidad](privacy)
