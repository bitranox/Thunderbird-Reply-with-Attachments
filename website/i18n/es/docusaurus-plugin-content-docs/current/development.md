---
id: development
title: Desarrollo
sidebar_label: Desarrollo
---

## Guía de desarrollo

### Requisitos previos

- Node.js 18+ y npm
- Thunderbird 128 ESR o posterior (para pruebas manuales)

### Estructura del proyecto (alta‑nivel)

- Raíz: script de empaquetado `distribution_zip_packer.sh`, docs, capturas
- `sources/`: código principal del complemento (background, UI de opciones/ventana, manifiestos, iconos)
- `tests/`: suite de Vitest
- `website/`: documentación Docusaurus (i18n en `website/i18n/de/...`)

### Instalación y herramientas

- Instalar dependencias raíz: `npm ci`
- Docs (opcional): `cd website && npm ci`
- Descubrir objetivos: `make help`

### Compilar y empaquetar

- Crear ZIPs: `make pack`
  - Produce ZIPs ATN y LOCAL en la raíz del repo (no edites artefactos a mano)
  - Consejo: actualiza la versión en `sources/manifest_ATN.json` y `sources/manifest_LOCAL.json` antes de empaquetar
- Instalación manual (dev): Thunderbird → Herramientas → Complementos y temas → engranaje → Instalar complemento desde archivo… → seleccione el ZIP creado

### Pruebas

- Suite completa: `make test` (Vitest)
- Cobertura (opcional):
  - `npm i -D @vitest/coverage-v8`
  - Ejecuta `make test`; abre `coverage/index.html` para el informe HTML
- Solo i18n: `make test-i18n` (paridad, placeholders, títulos)

### Depuración y registros

- Consola de errores: Herramientas → Herramientas de desarrollador → Consola de errores
- Activar/desactivar logs detallados en tiempo de ejecución:
  - Activar: `messenger.storage.local.set({ debug: true })`
  - Desactivar: `messenger.storage.local.set({ debug: false })`
- Los registros aparecen mientras redactas/envías respuestas

### Docs (sitio)

- Servidor dev: `cd website && npm run start`
- Compilar sitio estático: `cd website && npm run build`
- i18n: Inglés en `website/docs/*.md`; Alemán en `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Búsqueda: si se configuran en CI las variables de Algolia (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), el sitio usa Algolia; si no, búsqueda local. En la portada, pulsa `/` o `Ctrl+K` para abrir la búsqueda.

### Consejos de seguridad y configuración

- No confirmar `sources/manifest.json` (lo crea temporalmente la build)
- Mantén estable `browser_specific_settings.gecko.id` para preservar el canal de actualización

### Resolución de problemas

- Asegúrate de que Thunderbird sea 128 ESR o posterior
- Usa la Consola de errores para problemas de ejecución

### CI y cobertura

- GitHub Actions (`CI — Tests`) ejecuta vitest con umbrales de cobertura (85% líneas/funciones/ramas/declaraciones). Si no se alcanzan, el job falla.
- El flujo sube un artefacto `coverage-html` con el informe HTML; descárgalo desde la ejecución (Actions → última ejecución → Artifacts).

### Contribuir

- Consulta CONTRIBUTING.md para las pautas de ramas/commits/PR
