---
id: configuration
title: Configuración
---

# Configuración

Nota de terminología: consulta el [Glosario](glossary) para los términos usados de forma coherente en la interfaz y la documentación.

## Abrir opciones en Thunderbird

- Thunderbird → Herramientas → Complementos y temas → busca “Reply with Attachments” → Preferencias/Opciones

### Ajustes:

#### Confirmación

- Activa/desactiva “Preguntar antes de añadir adjuntos”.
- Respuesta predeterminada: Sí o No (foco y teclado predeterminados).
- Teclado: Y/J = Sí; N/Esc = No; Tab/Shift+Tab y flechas cambian el foco.

#### Lista negra (patrones glob)

Los archivos en la lista negra no se añadirán automáticamente al responder.

- Un patrón por línea; sin distinción de mayúsculas/minúsculas; solo coincide con el nombre de archivo.
- Ejemplos: `*.png`, `smime.*`, `*.p7s`.
- Glob admitidos: `*` (cualquier carácter excepto `/`), `?` (un carácter), clases como `[abc]`. Usa `\[` para un `[` literal. Se ignoran rutas (`**/`) porque solo se compara el nombre de archivo.
- No admitido: negación (`!`), expansión de llaves (`{..}`) y rangos complejos. Mantén los patrones simples.

Consejo: Los valores predeterminados se rellenan al abrir por primera vez y se pueden restablecer cuando quieras.

#### Aviso al excluir adjuntos

- Activa “Avisar si los adjuntos se excluyen por la lista negra” (predeterminado: activado).
- Al habilitarse, un modal pequeño enumera los archivos excluidos y los patrones coincidentes. El aviso también aparece cuando no se añadirá nada porque todo fue excluido.

#### Guarda tus ajustes

---

### Normalización de nombres de archivo (evitar duplicados)

Para lograr coherencia entre plataformas, los nombres de archivo se normalizan antes de comprobar duplicados:

- Unicode se normaliza a NFC.
- Los nombres se transforman a minúsculas.
- Se eliminan puntos/espacios finales (compatibilidad con Windows).

Así, la detección de duplicados resulta predecible para nombres como `café.pdf` frente a `café.pdf` (NFD) o `FILE.txt.` frente a `file.txt`.
