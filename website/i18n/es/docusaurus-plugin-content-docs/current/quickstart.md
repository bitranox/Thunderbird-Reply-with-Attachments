---
id: quickstart
title: 'Inicio rápido'
sidebar_label: 'Inicio rápido'
---

---

## Inicio rápido

:::important Versión mínima de Thunderbird
Este complemento es compatible con Thunderbird **128 ESR o superior**. Las versiones anteriores no son compatibles.
:::

:::note Sin telemetría; sin red en segundo plano
El complemento **no** recopila analíticas/telemetría y **no** realiza solicitudes de red en segundo plano. El acceso a la red solo ocurre cuando hace clic en enlaces externos (Documentación, GitHub, Donar).
:::

---

### Instalar

1. Instale el complemento desde Complementos de Thunderbird.
2. Opcional: Habilite la confirmación (Opciones → “Preguntar antes de añadir archivos adjuntos”).
3. Opcional: Deje habilitada la advertencia de la lista negra (predeterminado): “Avisar si los archivos adjuntos están excluidos por la lista negra”.
4. Opcional: Añada patrones de la lista negra (uno por línea), p. ej.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: El “# …” de arriba es un comentario en esta documentación; no incluya comentarios en los patrones que pegue en Opciones. Introduzca solo un patrón por línea.

Ahora responda a un mensaje con archivos adjuntos — los originales se añadirán automáticamente o tras una confirmación rápida. Si algún archivo queda excluido por su lista negra, verá un breve aviso que los enumera.

---

### Verificar {#verify}

- Responda a un mensaje con 1–2 archivos adjuntos y confirme que los originales se añaden a su ventana de redacción.
- Para ajustar el comportamiento, vea [Configuración](configuration) (opción de confirmación, respuesta predeterminada, patrones de lista negra).

---

### Verificar la advertencia de lista negra {#verify-blacklist-warning}

- Responda a un mensaje que contenga un archivo como “secret.txt”.
- Con “Avisar si los archivos adjuntos están excluidos por la lista negra” activado, un pequeño cuadro de diálogo enumerará los archivos excluidos y el patrón coincidente.

Si no ve un aviso, asegúrese de que el patrón coincida exactamente con el nombre de archivo (solo el nombre del archivo, sin distinguir mayúsculas y minúsculas). Vea Configuración → Lista negra.

---

### Nota sobre el teclado {#keyboard-note}

- El cuadro de confirmación admite Y/J para Sí y N/Esc para No. En algunos teclados no latinos, las teclas de letras pueden variar; Enter confirma el botón enfocado.

---
