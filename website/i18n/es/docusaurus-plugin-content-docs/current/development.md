---
id: development
title: 'Desarrollo'
sidebar_label: 'Desarrollo'
---

---

## Guía de desarrollo {#development-guide}

:::note Editar solo en inglés; las traducciones se propagan
Actualiza la documentación únicamente bajo `website/docs` (inglés). Las traducciones bajo `website/i18n/<locale>/…` se generan y no deben editarse manualmente. Usa las tareas de traducción (p. ej., `make translate_web_docs_batch`) para actualizar el contenido localizado.
:::

### Requisitos previos {#prerequisites}

- Node.js 22+ y npm (probado con Node 22)
- Thunderbird 128 ESR o más reciente (para pruebas manuales)

---

### Estructura del proyecto (alto nivel) {#project-layout-high-level}

- Raíz: script de empaquetado `distribution_zip_packer.sh`, docs, capturas de pantalla
- `sources/`: código principal del complemento (background, UI de opciones/popup, manifiestos, iconos)
- `tests/`: suite de Vitest
- `website/`: documentación Docusaurus (con i18n bajo `website/i18n/de/...`)

---

### Instalación y herramientas {#install-and-tooling}

- Instalar dependencias en la raíz: `npm ci`
- Docs (opcional): `cd website && npm ci`
- Descubrir objetivos: `make help`

---

### Desarrollo en vivo (web‑ext run) {#live-dev-web-ext}

- Ciclo rápido en Firefox Desktop (solo smoke tests de UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Ejecutar en Thunderbird (preferido para MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Consejos:
- Mantén abierta la Consola de errores de Thunderbird (Herramientas → Herramientas de desarrollo → Consola de errores).
- Las páginas de eventos MV3 se suspenden cuando están inactivas; recarga el complemento después de cambios de código, o deja que web‑ext recargue automáticamente.
- Algunos comportamientos exclusivos de Firefox difieren; verifica siempre en Thunderbird para garantizar paridad de API.
- Rutas del binario de Thunderbird (ejemplos):
- Linux: `thunderbird` (p. ej., `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Aislamiento de perfil: usa un perfil de Thunderbird separado para desarrollo a fin de no afectar tu configuración diaria.

---

### Objetivos de Make (alfabético) {#make-targets-alphabetical}

El Makefile estandariza flujos de desarrollo comunes. Ejecuta `make help` en cualquier momento para un resumen de una línea de cada objetivo.

Consejo: ejecutar `make` sin objetivo abre un menú Whiptail simple para elegir un objetivo.

| Objetivo                                                 | Descripción en una línea                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`clean`](#mt-clean)                                     | Elimina artefactos locales de build/preview (tmp/, web-local-preview/, website/build/).    |
| [`commit`](#mt-commit)                                   | Formatea, ejecuta pruebas (incl. i18n), actualiza el changelog, hace commit y push.        |
| [`eslint`](#mt-eslint)                                   | Ejecuta ESLint mediante flat config (`npm run -s lint:eslint`).                            |
| [`help`](#mt-help)                                       | Lista todos los objetivos con documentación de una línea (ordenados).                      |
| [`lint`](#mt-lint)                                       | web‑ext lint en `sources/` (manifiesto temporal; ignora ZIPs; no fatal).                   |
| [`menu`](#mt-menu)                                       | Menú interactivo para seleccionar un objetivo y argumentos opcionales.                     |
| [`pack`](#mt-pack)                                       | Construye ZIPs ATN y LOCAL (ejecuta linter; llama al script de empaquetado).               |
| [`prettier`](#mt-prettier)                               | Formatea el repositorio in‑place (escribe cambios).                                        |
| [`prettier_check`](#mt-prettier_check)                   | Prettier en modo verificación (sin escribir); falla si se requiere reformatear.            |
| [`prettier_write`](#mt-prettier_write)                   | Alias de `prettier`.                                                                       |
| [`test`](#mt-test)                                       | Prettier (write), ESLint y luego Vitest (cobertura si está configurado).                   |
| [`test_i18n`](#mt-test_i18n)                             | Pruebas solo de i18n: placeholders/paridad del complemento + paridad del sitio web.        |
| [`translate_app`](#mt-translation-app)                   | Alias de `translation_app`.                                                                |
| [`translation_app`](#mt-translation-app)                 | Traduce cadenas de la UI de la app desde `sources/_locales/en/messages.json`.              |
| [`translate_web_docs_batch`](#mt-translation-web)        | Traduce la documentación del sitio web vía OpenAI Batch API (preferido).                   |
| [`translate_web_docs_sync`](#mt-translation-web)         | Traduce la documentación del sitio web de forma sincrónica (heredado, sin lotes).          |
| [`translate_web_index`](#mt-translation_web_index)       | Alias de `translation_web_index`.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | Traduce UI de homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | Construye docs a `website/build` (soporta `--locales` / `BUILD_LOCALES`).                  |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Comprobación de enlaces segura sin conexión (omite HTTP[S] remotos).                       |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Vista previa local de gh‑pages; sirve automáticamente en 8080–8090; tests/link‑check opc.  |
| [`web_push_github`](#mt-web_push_github)                 | Hace push de `website/build` a la rama `gh-pages`.                                         |

Sintaxis de opciones

- Usa `make <command> OPTS="…"` para pasar opciones (se recomiendan comillas). Cada objetivo abajo muestra ejemplos de uso.

--

-

#### Consejos para compilación por idioma {#locale-build-tips}

- Construir un subconjunto de locales: define `BUILD_LOCALES="en de"` o pasa `OPTS="--locales en,de"` a objetivos web.
- Previsualizar un locale específico: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Compilar y empaquetar {#build-and-package}

- Construir ZIPs: `make pack`
- Produce ZIPs ATN y LOCAL en la raíz del repositorio (no edites los artefactos a mano)
- Consejo: actualiza la versión en `sources/manifest_ATN.json` y `sources/manifest_LOCAL.json` antes de empaquetar
- Instalación manual (dev): Thunderbird → Herramientas → Complementos y temas → engranaje → Instalar complemento desde archivo… → selecciona el ZIP generado

---

### Pruebas {#test}

- Suite completa: `make test` (Vitest)
- Cobertura (opcional):
- `npm i -D @vitest/coverage-v8`
- Ejecuta `make test`; abre `coverage/index.html` para el informe HTML
- Solo i18n: `make test_i18n` (claves/placeholders/títulos de UI + paridad por locale y por doc del sitio con comprobaciones de id/title/sidebar_label)

---

### Depuración y registros {#debugging-and-logs}

- Consola de errores: Herramientas → Herramientas de desarrollo → Consola de errores
- Cambiar registros detallados en tiempo de ejecución:
- Habilitar: `messenger.storage.local.set({ debug: true })`
- Deshabilitar: `messenger.storage.local.set({ debug: false })`
- Los registros aparecen al redactar/enviar respuestas

---

### Documentación (sitio web) {#docs-website}

- Servidor de desarrollo: `cd website && npm run start`
- Construir sitio estático: `cd website && npm run build`
- Equivalentes en Make (alfabético): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Ejemplos de uso:
- Solo EN, omitir tests/link‑check, sin push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Todos los locales, con tests/link‑check y luego push: `make web_build_local_preview && make web_push_github`
- Antes de publicar, ejecuta la comprobación de enlaces segura sin conexión: `make web_build_linkcheck`.
- i18n: el inglés vive en `website/docs/*.md`; traducciones al alemán en `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Búsqueda: si las variables de entorno de Algolia DocSearch están definidas en CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), el sitio usa búsqueda de Algolia; de lo contrario, recurre a búsqueda local. En la página de inicio, pulsa `/` o `Ctrl+K` para abrir el cuadro de búsqueda.

---

#### Ruta de redirección de donación {#donate-redirect}

- `website/src/pages/donate.js`
- Ruta: `/donate` (y `/<locale>/donate`)
- Comportamiento:
- Si la ruta actual tiene un locale (p. ej., `/de/donate`), úsalo
- De lo contrario, elige la mejor coincidencia de `navigator.languages` frente a los locales configurados; recurrir al locale predeterminado
- Redirige a:
- `en` → `/docs/donation`
- otros → `/<locale>/docs/donation`
- Usa `useBaseUrl` para un manejo correcto de baseUrl
- Incluye meta refresh + enlace `noscript` como alternativa

---

---

#### Consejos de vista previa {#preview-tips}

- Detén la vista previa de Node limpiamente: abre `http://localhost:<port>/__stop` (impreso después de `Local server started`).
- Si las imágenes no cargan en MDX/JSX, usa `useBaseUrl('/img/...')` para respetar el `baseUrl` del sitio.
- La vista previa inicia primero; la comprobación de enlaces se ejecuta después y no bloquea (los enlaces externos rotos no detendrán la vista previa).
- URL de vista previa de ejemplo: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (impresa después de “Local server started”).
- Enlaces externos en link‑check: algunos sitios externos (p. ej., addons.thunderbird.net) bloquean rastreadores automatizados y pueden mostrar 403 en las comprobaciones de enlaces. La vista previa aún se inicia; es seguro ignorarlos.

---

#### Traducir el sitio web {#translate-website}

Qué puedes traducir

- Solo la UI del sitio web: página de inicio, barra de navegación, pie de página y otras cadenas de UI. El contenido de la documentación permanece solo en inglés por ahora.

Dónde editar

- Edita `website/i18n/<locale>/code.json` (usa `en` como referencia). Mantén sin cambios placeholders como `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}`.

Generar o actualizar archivos

- Crear stubs faltantes para todos los locales: `npm --prefix website run i18n:stubs`
- Sobrescribir stubs desde inglés (tras agregar cadenas nuevas): `npm --prefix website run i18n:stubs:force`
- Alternativa para un solo locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Traducir cadenas de UI de homepage/navbar/footer (OpenAI)

- Establece credenciales una vez (shell o .env):
- `export OPENAI_API_KEY=sk-...`
- Opcional: `export OPENAI_MODEL=gpt-4o-mini`
- De una sola vez (todos los locales, omite en): `make translate_web_index`
- Limitar a locales específicos: `make translate_web_index OPTS="--locales de,fr"`
- Sobrescribir valores existentes: `make translate_web_index OPTS="--force"`

Validación y reintentos

- El script de traducción valida la forma del JSON, preserva los placeholders entre llaves y asegura que las URL no cambien.
- Si falla la validación, reintenta con feedback hasta 2 veces antes de mantener los valores existentes.

Previsualiza tu locale

- Servidor de desarrollo: `npm --prefix website run start`
- Visita `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Envío

- Abre un PR con el/los archivo(s) `code.json` editado(s). Mantén los cambios enfocados e incluye una captura rápida cuando sea posible.

---

### Consejos de seguridad y configuración {#security-and-configuration-tips}

- No confirmes `sources/manifest.json` (creado temporalmente por el build)
- Mantén `browser_specific_settings.gecko.id` estable para preservar el canal de actualizaciones

---

### Persistencia de ajustes {#settings-persistence}

- Almacenamiento: todos los ajustes del usuario residen en `storage.local` y persisten a través de actualizaciones del complemento.
- Instalación: los valores predeterminados se aplican solo cuando una clave falta estrictamente (undefined).
- Actualización: una migración rellena solo claves faltantes; los valores existentes nunca se sobrescriben.
- Marcador de esquema: `settingsVersion` (actualmente `1`).
- Claves y valores predeterminados:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Código: ver `sources/background.js` → `initializeOrMigrateSettings()` y `SCHEMA_VERSION`.

Flujo de desarrollo (añadir un ajuste nuevo)

- Incrementa `SCHEMA_VERSION` en `sources/background.js`.
- Añade la nueva clave + valor predeterminado al objeto `DEFAULTS` en `initializeOrMigrateSettings()`.
- Usa la regla “solo si es undefined” al sembrar predeterminados; no sobrescribas valores existentes.
- Si el ajuste es visible para el usuario, intégralo en `sources/options.js` y añade cadenas localizadas.
- Añade/ajusta pruebas (ver `tests/background.settings.migration.test.js`).

Consejos de pruebas manuales

- Simula una instalación nueva: borra el directorio de datos de la extensión o inicia con un perfil nuevo.
- Simula una actualización: establece `settingsVersion` en `0` en `storage.local` y recarga; confirma que los valores existentes permanecen sin cambios y solo se agregan claves faltantes.

---

### Solución de problemas {#troubleshooting}

- Asegúrate de que Thunderbird sea 128 ESR o más reciente
- Usa la Consola de errores para problemas en tiempo de ejecución
- Si parece que los ajustes almacenados no se aplican correctamente, reinicia Thunderbird e inténtalo de nuevo. (Thunderbird puede mantener estado en caché entre sesiones; un reinicio garantiza que se carguen los ajustes nuevos).

---

### CI y cobertura {#ci-and-coverage}

- GitHub Actions (`CI — Tests`) ejecuta vitest con umbrales de cobertura (85% líneas/funciones/ramas/declaraciones). Si no se cumplen, el job falla.
- El flujo de trabajo sube un artefacto `coverage-html` con el informe HTML; descárgalo desde la página de la ejecución (Actions → última ejecución → Artifacts).

---

### Contribución {#contributing}

- Consulta CONTRIBUTING.md para pautas de ramas/commits/PR
- Consejo: crea un perfil de desarrollo de Thunderbird separado para pruebas a fin de no afectar tu perfil diario.

---

### Traducciones

- Ejecutar trabajos grandes de traducción “todo → todo” puede ser lento y costoso. Empieza con un subconjunto (p. ej., algunos docs y 1–2 locales), revisa el resultado y luego expande.

---

- Política de reintentos: los trabajos de traducción realizan hasta 3 reintentos con backoff exponencial ante errores de API; consulta `scripts/translate_web_docs_batch.js` y `scripts/translate_web_docs_sync.js`.

Capturas de pantalla para la documentación

- Guarda las imágenes bajo `website/static/img/`.
- Haz referencia a ellas en MD/MDX mediante `useBaseUrl('/img/<filename>')` para que las rutas funcionen con el `baseUrl` del sitio.
- Tras añadir o renombrar imágenes bajo `website/static/img/`, confirma que todas las referencias aún usan `useBaseUrl('/img/…')` y se renderizan en una vista previa local.
  Favicons

- El `favicon.ico` multi‑tamaño se genera automáticamente en todas las rutas de build (Make + scripts) mediante `website/scripts/build-favicon.mjs`.
- No se requiere paso manual; con actualizar `icon-*.png` basta.
  Consejo de revisión

- Mantén el `id` del front‑matter sin cambios en los docs traducidos; traduce solo `title` y `sidebar_label` cuando existan.

#### clean {#mt-clean}

- Propósito: eliminar artefactos locales de build/preview.
- Uso: `make clean`
- Elimina (si existen):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Propósito: formatear, probar, actualizar changelog, hacer commit y push.
- Uso: `make commit`
- Detalles: ejecuta Prettier (write), `make test`, `make test_i18n`; añade al changelog cuando hay diffs en stage; hace push a `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Propósito: ejecutar ESLint mediante flat config.
- Uso: `make eslint`

---

#### help {#mt-help}

- Propósito: listar todos los objetivos con documentación de una línea.
- Uso: `make help`

---

#### lint {#mt-lint}

- Propósito: lint del MailExtension usando `web-ext`.
- Uso: `make lint`
- Notas: copia temporal `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignora ZIPs generados; las advertencias no fallan la canalización.

---

#### menu {#mt-menu}

- Propósito: menú interactivo para seleccionar un objetivo de Make y argumentos opcionales.
- Uso: ejecuta `make` sin argumentos.
- Notas: si `whiptail` no está disponible, el menú recurre a `make help`.

---

#### pack {#mt-pack}

- Propósito: construir ZIPs ATN y LOCAL (depende de `lint`).
- Uso: `make pack`
- Consejo: incrementa versiones en `sources/manifest_*.json` antes de empaquetar.

---

#### prettier {#mt-prettier}

- Propósito: formatear el repo in‑place.
- Uso: `make prettier`

#### prettier_check {#mt-prettier_check}

- Propósito: verificar formato (sin escribir).
- Uso: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Propósito: alias de `prettier`.
- Uso: `make prettier_write`

---

#### test {#mt-test}

- Propósito: ejecutar Prettier (write), ESLint y luego Vitest (cobertura si está instalado).
- Uso: `make test`

#### test_i18n {#mt-test_i18n}

- Propósito: pruebas centradas en i18n para cadenas del complemento y docs del sitio web.
- Uso: `make test_i18n`
- Ejecuta: `npm run test:i18n` y `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Propósito: traducir cadenas de la UI del complemento de EN a otros locales.
- Uso: `make translation_app OPTS="--locales all|de,fr"`
- Notas: preserva la estructura de claves y placeholders; registra en `translation_app.log`. Forma de script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Propósito: traducir docs del sitio web desde `website/docs/*.md` a `website/i18n/<locale>/...`.
- Preferido: `translate_web_docs_batch` (OpenAI Batch API)
  - Uso (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posicional heredado aún aceptado: `OPTS="<doc|all> <lang|all>"`
- Comportamiento: construye JSONL, sube, consulta cada 30s, descarga resultados y escribe archivos.
- Nota: un trabajo por lotes puede tardar hasta 24 horas en completarse (según la ventana de batch de OpenAI). La consola muestra el tiempo transcurrido en cada consulta.
- Entorno: `OPENAI_API_KEY` (requerido), opcionales `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (predeterminado 24h), `BATCH_POLL_INTERVAL_MS`.
- Heredado: `translate_web_docs_sync`
  - Uso (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - Posicional heredado aún aceptado: `OPTS="<doc|all> <lang|all>"`
- Comportamiento: solicitudes sincrónicas por par (sin agregación por lotes).
- Notas: indicaciones interactivas cuando se omite `OPTS`. Ambos modos preservan bloques de código/código en línea y mantienen `id` del front‑matter sin cambios; registra en `translation_web_batch.log` (batch) o `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Propósito: traducir cadenas de UI del sitio (homepage, navbar, footer) de `website/i18n/en/code.json` a todos los locales en `website/i18n/<locale>/code.json` (excluyendo `en`).
- Uso: `make translate_web_index` o `make translate_web_index OPTS="--locales de,fr [--force]"`
- Requisitos: exportar `OPENAI_API_KEY` (opcional: `OPENAI_MODEL=gpt-4o-mini`).
- Comportamiento: valida la estructura JSON, preserva placeholders entre llaves, mantiene las URL sin cambios y reintenta con feedback ante errores de validación.

---

#### web_build {#mt-web_build}

- Propósito: construir el sitio de docs a `website/build`.
- Uso: `make web_build OPTS="--locales en|de,en|all"` (o define `BUILD_LOCALES="en de"`)
- Internos: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dependencias: ejecuta `npm ci` en `website/` solo si falta `website/node_modules/@docusaurus`.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Propósito: comprobación de enlaces segura sin conexión.
- Uso: `make web_build_linkcheck OPTS="--locales en|all"`
- Notas: construye a `tmp_linkcheck_web_pages`; reescribe GH Pages `baseUrl` a `/`; omite enlaces HTTP(S) remotos.

#### web_build_local_preview {#mt-web_build_local_preview}

- Propósito: vista previa local de gh‑pages con tests/link‑check opcionales.
- Uso: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Comportamiento: intenta primero el servidor de vista previa de Node (`scripts/preview-server.mjs`, soporta `/__stop`), recurre a `python3 -m http.server`; sirve en 8080–8090; PID en `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Propósito: hacer push de `website/build` a la rama `gh-pages`.
- Uso: `make web_push_github`

Consejo: define `NPM=…` para reemplazar el gestor de paquetes usado por el Makefile (predeterminado `npm`).

---
