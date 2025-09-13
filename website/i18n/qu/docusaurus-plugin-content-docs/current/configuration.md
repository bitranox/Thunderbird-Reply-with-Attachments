---
id: configuration
title: 'Configuración'
---

## Configuración

Terminología nota: ver el [Glosario](glossary) para términos consistentes utilizados en la interfaz y documentos.

---

## Abrir opciones en Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Herramientas → Complementos y Temas → encontrar “Responder con Adjuntos” → Preferencias/Opciones

---

### Configuraciones {#settings}

#### Confirmación {#confirmation}

- Activar “Preguntar antes de añadir adjuntos”
- Respuesta por defecto: Sí o No (enfoque y teclado por defecto)
- Teclado: Y/J = Sí; N/Esc = No; Tab/Shift+Tab y teclas de flecha cambian el enfoque
  - Ver detalles del teclado en [Uso](usage#keyboard-shortcuts).

---

#### Lista negra (patrones glob) {#blacklist-glob-patterns}

Los archivos en la lista negra no se añadirán en la respuesta automáticamente. Ver también el [Glosario](glossary) para “Lista negra (Lista de exclusión)”.

- Un patrón por línea; insensible a mayúsculas; coincidencia solo de nombre de archivo
- Ejemplos: `*intern*`, `*secret*`, `*passwor*`
- Tokens glob soportados: `*` (cualquier carácter excepto `/`), `?` (un carácter), clases de caracteres como `[abc]`. Use `\[` para coincidir con un `[` literal. Las rutas (`**/`) se ignoran ya que solo se coinciden los nombres de archivo.
- No soportado: negación (`!`), expansión de llaves (`{..}`), y rangos complejos. Mantenga los patrones simples.
- Los comentarios no son soportados en los patrones. No incluya `#` o comentarios en línea; ingrese solo el texto del patrón por línea.

---

##### Recetario de patrones {#pattern-cookbook}

- Coincidir cualquier PDF: `*.pdf`
- Coincidir archivos que comienzan con “scan”: `scan*`
- Clase de caracteres: `report[0-9].txt`
- Escapar un `[` literal: `\[` (útil al coincidir un corchete como un carácter)

---

##### Notas {#blacklist-notes}

- El orden no importa; la primera/cualquier coincidencia excluye el archivo.
- La coincidencia es solo de nombre de archivo (se ignoran rutas/carpetas).
- “Restablecer a valores predeterminados” restaura los patrones recomendados y el interruptor de advertencia de la lista negra.
- ¿Por qué el ejemplo `*passwor*`? Coincide con ambas familias “password” y “Passwort”.
- Precedencia: si cualquier patrón coincide con un nombre de archivo, el archivo es excluido (primera/cualquier coincidencia — el orden no cambia el resultado).
- Consejo: pruebe su patrón: añada un patrón temporal, responda a un mensaje que contenga un archivo con un nombre coincidente y confirme que se excluye en la lista de advertencias.

##### Prueba rápida (prueba segura) {#blacklist-try-it}

1. Abrir Opciones → Lista negra.
2. Añadir un patrón temporal como `*.tmp` y hacer clic en Guardar.
3. Responder a un correo de prueba que tenga un archivo que termine con `.tmp` — el archivo debería aparecer en la lista de advertencias y no ser adjuntado.
4. Eliminar el patrón temporal cuando haya terminado, o clic en “Restablecer a valores predeterminados”.

---

#### Advertencia sobre adjuntos excluidos {#warning-on-excluded-attachments}

- Activar “Advertir si los adjuntos son excluidos por la lista negra” (por defecto: ACTIVADO).
- Cuando está habilitado, un pequeño modal lista los archivos excluidos y el/los patrón(es) coincidente(s). La advertencia también aparece cuando no se adjuntarán nada porque todos los candidatos fueron excluidos.

---

#### Guardar sus configuraciones {#save-your-settings}

Las configuraciones se guardan al presionar el botón Guardar. Puede revertir campos individuales manualmente o restablecer valores predeterminados según sea necesario.

Si las configuraciones almacenadas parecen no aplicarse correctamente, reinicie Thunderbird y vuelva a intentarlo. (Thunderbird puede almacenar en caché el estado a través de sesiones; un reinicio asegura que se carguen configuraciones frescas.)

Consejo: Para confirmar que sus configuraciones tuvieron efecto, responda a cualquier mensaje con un adjunto y verifique la confirmación o la advertencia de la lista negra.

---

#### Visibilidad de donaciones (suspensión de 90 días) {#donation-visibility}

El complemento incluye una función de conveniencia para ocultar las solicitudes de donación por un tiempo después de que haya donado.

Dónde encontrarlo

- Opciones → sección de Soporte: verá un botón “Doné” y un área de sugerencias pequeña.
- El diálogo de confirmación de envío también muestra un botón Donar; se oculta automáticamente cuando la suspensión está activa.

Cómo funciona

- Hacer clic en “Doné” oculta los botones de donación y las solicitudes relacionadas durante 90 días.
- Una sugerencia de estado muestra “Ocultado hasta el YYYY‑MM‑DD” (en su fecha local). También hay un botón “Mostrar Donar nuevamente” para restaurar la visibilidad de inmediato.
- Después de 90 días, el botón Donar se vuelve visible nuevamente automáticamente.

Privacidad y almacenamiento

- El complemento almacena un solo timestamp en el almacenamiento local de Thunderbird para recordar el período de suspensión. Clave: `donateHideUntil` (milisegundos epoch).
- Esta configuración es local para su perfil de Thunderbird (no sincronizado en la nube). No se realizan solicitudes a la red por esta función.

Solución de problemas

- Si Donar aún aparece justo después de hacer clic en “Doné”, espere un momento o reabra la página de Opciones; la UI se actualiza tan pronto como se guarda la configuración.
- Para restablecer manualmente, haga clic en “Mostrar Donar nuevamente”. También puede esperar hasta que pase la fecha indicada en la sugerencia.

Esta función es puramente por conveniencia; nunca bloquea la funcionalidad del complemento y no recopila datos personales.

---

### Normalización de nombres de archivo (prevención de duplicados) {#filename-normalization-duplicates-prevention}

Para comportarse de manera consistente a través de plataformas, los nombres de archivo se normalizan antes de las verificaciones de duplicados:

- Unicode es normalizado a NFC.
- Los nombres se convierten en minúsculas (lowercased).
- Se recortan los puntos/espacios finales (amigable con Windows).

Esto mantiene la detección de duplicados predecible para nombres como `café.pdf` vs `café.pdf` (NFD) o `FILE.txt.` vs `file.txt`.

---

## Comportamiento de confirmación {#confirmation-behavior}

- “Respuesta por defecto” establece el botón inicialmente enfocado en el diálogo de confirmación (útil para usuarios de teclado).
- Funciona tanto para “Responder” como para “Responder a todos”. “Reenviar” no es modificado por este complemento.

---

## Avanzado: detección de duplicados {#advanced-duplicate-detection}

La prevención de duplicados se implementa por pestaña de composición y por nombre de archivo. Ver [Uso](usage#behavior-details) para una explicación detallada.

---

Ver también

- [Permisos](permissions)
- [Privacidad](privacy)
