---
id: development
title: 'Desenvolvimento'
sidebar_label: 'Desenvolvimento'
---

---

## Guia de Desenvolvimento {#development-guide}

:::note Editar apenas em inglês; as traduções são propagadas
Atualize a documentação apenas em `website/docs` (Inglês). As traduções em `website/i18n/<locale>/…` são geradas e não devem ser editadas manualmente. Use as tarefas de tradução (por exemplo, `make translate_web_docs_batch`) para atualizar o conteúdo localizado.
:::

### Pré-requisitos {#prerequisites}

- Node.js 22+ e npm (testado com Node 22)
- Thunderbird 128 ESR ou mais recente (para testes manuais)

---

### Estrutura do Projeto (alto nível) {#project-layout-high-level}

- Raiz: script de empacotamento `distribution_zip_packer.sh`, docs, screenshots
- `sources/`: código principal do add‑on (background, UI de opções/popup, manifests, ícones)
- `tests/`: suite Vitest
- `website/`: docs Docusaurus (com i18n em `website/i18n/de/...`)

---

### Instalação e Ferramentas {#install-and-tooling}

- Instalar deps na raiz: `npm ci`
- Docs (opcional): `cd website && npm ci`
- Descobrir alvos: `make help`

---

### Desenvolvimento ao vivo (web‑ext run) {#live-dev-web-ext}

- Ciclo rápido no Firefox Desktop (apenas smoke tests de UI):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Executar no Thunderbird (preferido para MailExtensions):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- Dicas:
- Mantenha a Consola de Erros do Thunderbird aberta (Tools → Developer Tools → Error Console).
- As páginas de eventos MV3 são suspensas quando inativas; recarregue o add‑on após alterações de código ou deixe o web‑ext recarregar automaticamente.
- Alguns comportamentos exclusivos do Firefox diferem; verifique sempre no Thunderbird para garantir paridade de API.
- Caminhos do binário do Thunderbird (exemplos):
- Linux: `thunderbird` (por exemplo, `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- Isolamento de perfil: Use um perfil separado do Thunderbird para desenvolvimento para evitar impactar a sua configuração diária.

---

### Alvos do Make (Alfabético) {#make-targets-alphabetical}

O Makefile padroniza fluxos comuns de desenvolvimento. Execute `make help` a qualquer momento para um resumo em uma linha de cada alvo.

Dica: executar `make` sem alvo abre um menu Whiptail simples para escolher um alvo.

| Target                                                   | Descrição em uma linha                                                                               |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | Remove artefactos locais de build/preview (tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | Formata, executa testes (incl. i18n), atualiza changelog, faz commit e push.                         |
| [`eslint`](#mt-eslint)                                   | Executa ESLint via configuração flat (`npm run -s lint:eslint`).                                     |
| [`help`](#mt-help)                                       | Lista todos os alvos com docs de uma linha (ordenados).                                              |
| [`lint`](#mt-lint)                                       | web‑ext lint em `sources/` (manifesto temporário; ignora ZIPs; não fatal).                           |
| [`menu`](#mt-menu)                                       | Menu interativo para selecionar um alvo e argumentos opcionais.                                      |
| [`pack`](#mt-pack)                                       | Constrói ZIPs ATN e LOCAL (executa o linter; chama o script de empacotamento).                       |
| [`prettier`](#mt-prettier)                               | Formata o repositório no local (escreve alterações).                                                 |
| [`prettier_check`](#mt-prettier_check)                   | Prettier em modo verificação (sem escrita); falha se precisar de reformatar.                         |
| [`prettier_write`](#mt-prettier_write)                   | Alias para `prettier`.                                                                               |
| [`test`](#mt-test)                                       | Prettier (escrever), ESLint e depois Vitest (cobertura se configurada).                              |
| [`test_i18n`](#mt-test_i18n)                             | Testes apenas de i18n: placeholders/paridade do add‑on + paridade do website.                        |
| [`translate_app`](#mt-translation-app)                   | Alias para `translation_app`.                                                                        |
| [`translation_app`](#mt-translation-app)                 | Traduz strings da UI da app a partir de `sources/_locales/en/messages.json`.                         |
| [`translate_web_docs_batch`](#mt-translation-web)        | Traduz docs do website via OpenAI Batch API (preferido).                                             |
| [`translate_web_docs_sync`](#mt-translation-web)         | Traduz docs do website de forma síncrona (legado, sem batch).                                        |
| [`translate_web_index`](#mt-translation_web_index)       | Alias para `translation_web_index`.                                                                  |
| [`translation_web_index`](#mt-translation_web_index)     | Traduz UI da homepage/navbar/footer (`website/i18n/en/code.json → .../<lang>/code.json`).            |
| [`web_build`](#mt-web_build)                             | Constrói docs para `website/build` (suporta `--locales` / `BUILD_LOCALES`).                          |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | Verificação de links segura offline (ignora HTTP[S] remotos).                                        |
| [`web_build_local_preview`](#mt-web_build_local_preview) | Pré‑visualização local de gh‑pages; serve automaticamente em 8080–8090; testes/link‑check opcionais. |
| [`web_push_github`](#mt-web_push_github)                 | Faz push de `website/build` para a branch `gh-pages`.                                                |

Syntax for options

- Use `make <command> OPTS="…"` para passar opções (recomenda‑se aspas). Cada alvo abaixo mostra uso de exemplo.

--

-

#### Dicas de compilação de locale {#locale-build-tips}

- Construir um subconjunto de locales: defina `BUILD_LOCALES="en de"` ou passe `OPTS="--locales en,de"` para os alvos web.
- Pré‑visualizar um locale específico: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### Compilar e Empacotar {#build-and-package}

- Construir ZIPs: `make pack`
- Produz ZIPs ATN e LOCAL na raiz do repositório (não edite artefactos à mão)
- Dica: atualize a versão em `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json` antes de empacotar
- Instalação manual (dev): Thunderbird → Tools → Add‑ons and Themes → gear → Install Add‑on From File… → selecione o ZIP gerado

---

### Testes {#test}

- Suíte completa: `make test` (Vitest)
- Cobertura (opcional):
- `npm i -D @vitest/coverage-v8`
- Execute `make test`; abra `coverage/index.html` para o relatório HTML
- Apenas i18n: `make test_i18n` (chaves/placeholders/títulos da UI + paridade por locale/por doc do website com verificações de id/title/sidebar_label)

---

### Depuração e Logs {#debugging-and-logs}

- Consola de Erros: Tools → Developer Tools → Error Console
- Alternar logs verbosos em runtime:
- Ativar: `messenger.storage.local.set({ debug: true })`
- Desativar: `messenger.storage.local.set({ debug: false })`
- Os logs aparecem ao compor/enviar respostas

---

### Documentação (website) {#docs-website}

- Servidor de desenvolvimento: `cd website && npm run start`
- Construir site estático: `cd website && npm run build`
- Equivalentes no Make (alfabético): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- Exemplos de uso:
- Apenas EN, pular testes/verificação de links, sem push: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- Todos os locales, com testes/verificação de links, depois push: `make web_build_local_preview && make web_push_github`
- Antes de publicar, execute a verificação de links segura offline: `make web_build_linkcheck`.
- i18n: o inglês vive em `website/docs/*.md`; traduções em alemão em `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pesquisa: Se as variáveis de ambiente do Algolia DocSearch estiverem definidas no CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), o site usa a pesquisa Algolia; caso contrário, reverte para a pesquisa local. Na página inicial, prima `/` ou `Ctrl+K` para abrir a caixa de pesquisa.

---

#### Rota de redirecionamento de doação {#donate-redirect}

- `website/src/pages/donate.js`
- Rota: `/donate` (e `/<locale>/donate`)
- Comportamento:
- Se a rota atual tiver um locale (por exemplo, `/de/donate`), use‑o
- Caso contrário, escolha a melhor correspondência de `navigator.languages` vs locales configurados; caso falhe, use o locale por omissão
- Redireciona para:
- `en` → `/docs/donation`
- outros → `/<locale>/docs/donation`
- Usa `useBaseUrl` para tratar corretamente o baseUrl
- Inclui meta refresh + link `noscript` como alternativa

---

---

#### Dicas de pré‑visualização {#preview-tips}

- Pare a pré‑visualização do Node de forma limpa: abra `http://localhost:<port>/__stop` (impresso após `Local server started`).
- Se as imagens não carregarem em MDX/JSX, use `useBaseUrl('/img/...')` para respeitar o `baseUrl` do site.
- O preview inicia primeiro; a verificação de links executa depois e não é bloqueante (links externos quebrados não impedem o preview).
- URL de preview de exemplo: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/` (impresso após “Local server started”).
- Links externos na verificação: Alguns sites externos (por exemplo, addons.thunderbird.net) bloqueiam crawlers automatizados e podem mostrar 403 nas verificações. O preview ainda inicia; é seguro ignorar.

---

#### Traduzir o Website {#translate-website}

O que pode traduzir

- Apenas a UI do website: página inicial, barra de navegação, rodapé e outras strings de UI. O conteúdo das docs permanece apenas em inglês por agora.

Onde editar

- Edite `website/i18n/<locale>/code.json` (use `en` como referência). Mantenha placeholders como `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` inalterados.

Gerar ou atualizar ficheiros

- Criar stubs em falta para todos os locales: `npm --prefix website run i18n:stubs`
- Sobrescrever stubs a partir do inglês (após adicionar novas strings): `npm --prefix website run i18n:stubs:force`
- Alternativa para um único locale: `npx --prefix website docusaurus write-translations --locale <locale>`

Traduzir strings de UI da homepage/navbar/footer (OpenAI)

- Defina as credenciais uma vez (shell ou .env):
- `export OPENAI_API_KEY=sk-...`
- Opcional: `export OPENAI_MODEL=gpt-4o-mini`
- De uma só vez (todos os locales, ignorando en): `make translate_web_index`
- Limitar a locales específicos: `make translate_web_index OPTS="--locales de,fr"`
- Sobrescrever valores existentes: `make translate_web_index OPTS="--force"`

Validação e retentativas

- O script de tradução valida a estrutura do JSON, preserva placeholders entre chavetas e garante que os URLs permanecem inalterados.
- Em caso de falha de validação, tenta novamente com feedback até 2 vezes antes de manter os valores existentes.

Pré‑visualize o seu locale

- Servidor de desenvolvimento: `npm --prefix website run start`
- Visite `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/`

Submissão

- Abra um PR com o(s) ficheiro(s) `code.json` editado(s). Mantenha as alterações focadas e inclua uma captura de ecrã rápida quando possível.

---

### Dicas de Segurança e Configuração {#security-and-configuration-tips}

- Não faça commit de `sources/manifest.json` (criado temporariamente pelo build)
- Mantenha `browser_specific_settings.gecko.id` estável para preservar o canal de atualização

---

### Persistência das Definições {#settings-persistence}

- Armazenamento: Todas as definições do utilizador residem em `storage.local` e persistem entre atualizações do add‑on.
- Instalação: Os valores por omissão são aplicados apenas quando uma chave está estritamente em falta (undefined).
- Atualização: Uma migração preenche apenas chaves em falta; os valores existentes nunca são sobrescritos.
- Marcador de esquema: `settingsVersion` (atualmente `1`).
- Chaves e valores por omissão:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- Código: ver `sources/background.js` → `initializeOrMigrateSettings()` e `SCHEMA_VERSION`.

Fluxo de desenvolvimento (adicionando uma nova definição)

- Aumente `SCHEMA_VERSION` em `sources/background.js`.
- Adicione a nova chave + valor por omissão ao objeto `DEFAULTS` em `initializeOrMigrateSettings()`.
- Use a regra "only-if-undefined" ao definir valores por omissão; não sobrescreva valores existentes.
- Se a definição for visível para o utilizador, integre‑a em `sources/options.js` e adicione strings localizadas.
- Adicione/ajuste testes (ver `tests/background.settings.migration.test.js`).

Dicas para testes manuais

- Simular uma instalação limpa: limpe o diretório de dados da extensão ou inicie com um novo perfil.
- Simular uma atualização: defina `settingsVersion` para `0` em `storage.local` e recarregue; confirme que os valores existentes permanecem inalterados e apenas chaves em falta são adicionadas.

---

### Resolução de Problemas {#troubleshooting}

- Certifique‑se de que o Thunderbird é 128 ESR ou mais recente
- Use a Consola de Erros para problemas de runtime
- Se as definições armazenadas parecerem não se aplicar corretamente, reinicie o Thunderbird e tente novamente. (O Thunderbird pode manter estado em cache entre sessões; um reinício garante que as definições novas são carregadas.)

---

### CI e Cobertura {#ci-and-coverage}

- O GitHub Actions (`CI — Tests`) executa o vitest com limites de cobertura (85% linhas/funções/ramificações/declarações). Se os limites não forem cumpridos, o job falha.
- O workflow carrega um artefacto `coverage-html` com o relatório HTML; transfira‑o a partir da página da execução (Actions → execução mais recente → Artifacts).

---

### Contribuição {#contributing}

- Veja CONTRIBUTING.md para diretrizes de branch/commit/PR
- Dica: Crie um perfil de desenvolvimento do Thunderbird separado para testes a fim de evitar impactar o seu perfil diário.

---

### Traduções

- Executar tarefas grandes de tradução “all → all” pode ser lento e caro. Comece com um subconjunto (por exemplo, alguns documentos e 1–2 locales), reveja o resultado e depois expanda.

---

- Política de retentativas: tarefas de tradução executam até 3 retentativas com backoff exponencial em erros da API; veja `scripts/translate_web_docs_batch.js` e `scripts/translate_web_docs_sync.js`.

Capturas de ecrã para a documentação

- Guarde as imagens em `website/static/img/`.
- Referencie-as em MD/MDX via `useBaseUrl('/img/<filename>')` para que os caminhos funcionem com o `baseUrl` do site.
- Após adicionar ou renomear imagens em `website/static/img/`, confirme que todas as referências ainda usam `useBaseUrl('/img/…')` e renderizam numa pré‑visualização local.
  Favicons

- O `favicon.ico` multi‑tamanho é gerado automaticamente em todos os caminhos de build (Make + scripts) via `website/scripts/build-favicon.mjs`.
- Não é necessário nenhum passo manual; atualizar `icon-*.png` é suficiente.
  Dica de revisão

- Mantenha o front‑matter `id` inalterado em docs traduzidas; traduza apenas `title` e `sidebar_label` quando presentes.

#### clean {#mt-clean}

- Finalidade: remover artefactos locais de build/preview.
- Uso: `make clean`
- Remove (se existirem):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- Finalidade: formatar, testar, atualizar changelog, fazer commit e push.
- Uso: `make commit`
- Detalhes: executa Prettier (escrever), `make test`, `make test_i18n`; anexa o changelog quando há diffs em stage; faz push para `origin/<branch>`.

---

#### eslint {#mt-eslint}

- Finalidade: executar o ESLint via configuração flat.
- Uso: `make eslint`

---

#### help {#mt-help}

- Finalidade: listar todos os alvos com docs de uma linha.
- Uso: `make help`

---

#### lint {#mt-lint}

- Finalidade: fazer lint da MailExtension usando `web-ext`.
- Uso: `make lint`
- Notas: copia temporariamente `sources/manifest_LOCAL.json` → `sources/manifest.json`; ignora ZIPs; avisos não falham o pipeline.

---

#### menu {#mt-menu}

- Finalidade: menu interativo para selecionar um alvo do Make e argumentos opcionais.
- Uso: execute `make` sem argumentos.
- Notas: se `whiptail` não estiver disponível, o menu recua para `make help`.

---

#### pack {#mt-pack}

- Finalidade: construir ZIPs ATN e LOCAL (depende de `lint`).
- Uso: `make pack`
- Dica: incremente as versões em `sources/manifest_*.json` antes de empacotar.

---

#### prettier {#mt-prettier}

- Finalidade: formatar o repositório no local.
- Uso: `make prettier`

#### prettier_check {#mt-prettier_check}

- Finalidade: verificar formatação (sem escrita).
- Uso: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- Finalidade: alias para `prettier`.
- Uso: `make prettier_write`

---

#### test {#mt-test}

- Finalidade: executar Prettier (escrever), ESLint e depois Vitest (cobertura se instalada).
- Uso: `make test`

#### test_i18n {#mt-test_i18n}

- Finalidade: testes focados em i18n para strings do add‑on e docs do website.
- Uso: `make test_i18n`
- Executa: `npm run test:i18n` e `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- Finalidade: traduzir strings de UI do add‑on de EN para outros locales.
- Uso: `make translation_app OPTS="--locales all|de,fr"`
- Notas: preserva a estrutura das chaves e placeholders; regista em `translation_app.log`. Forma de script: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- Finalidade: traduzir docs do website de `website/docs/*.md` para `website/i18n/<locale>/...`.
- Preferido: `translate_web_docs_batch` (OpenAI Batch API)
  - Uso (flags): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - O posicional legado ainda é aceite: `OPTS="<doc|all> <lang|all>"`
- Comportamento: constrói JSONL, carrega, verifica a cada 30s, transfere resultados, escreve ficheiros.
- Nota: um job em batch pode demorar até 24 horas para concluir (conforme a janela de batch da OpenAI). A consola mostra o tempo decorrido a cada verificação.
- Ambiente: `OPENAI_API_KEY` (obrigatório), opcional `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW` (predefinição 24h), `BATCH_POLL_INTERVAL_MS`.
- Legado: `translate_web_docs_sync`
  - Uso (flags): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - O posicional legado ainda é aceite: `OPTS="<doc|all> <lang|all>"`
- Comportamento: pedidos síncronos por par (sem agregação em batch).
- Notas: Prompts interativos quando `OPTS` é omitido. Ambos os modos preservam blocos de código/código inline e mantêm o front‑matter `id` inalterado; regista em `translation_web_batch.log` (batch) ou `translation_web_sync.log` (sync).

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- Finalidade: traduzir strings de UI do website (homepage, navbar, footer) de `website/i18n/en/code.json` para todos os locales em `website/i18n/<locale>/code.json` (excluindo `en`).
- Uso: `make translate_web_index` ou `make translate_web_index OPTS="--locales de,fr [--force]"`
- Requisitos: exportar `OPENAI_API_KEY` (opcional: `OPENAI_MODEL=gpt-4o-mini`).
- Comportamento: valida a estrutura JSON, preserva placeholders entre chavetas, mantém URLs inalterados e faz novas tentativas com feedback em erros de validação.

---

#### web_build {#mt-web_build}

- Finalidade: construir o site de docs para `website/build`.
- Uso: `make web_build OPTS="--locales en|de,en|all"` (ou defina `BUILD_LOCALES="en de"`)
- Internos: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- Dependências: executa `npm ci` em `website/` apenas se `website/node_modules/@docusaurus` estiver em falta.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- Finalidade: verificação de links segura offline.
- Uso: `make web_build_linkcheck OPTS="--locales en|all"`
- Notas: constrói para `tmp_linkcheck_web_pages`; reescreve `baseUrl` do GH Pages para `/`; ignora links HTTP(S) remotos.

#### web_build_local_preview {#mt-web_build_local_preview}

- Finalidade: pré‑visualização local de gh‑pages com testes/link‑check opcionais.
- Uso: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- Comportamento: tenta primeiro o servidor de pré‑visualização em Node (`scripts/preview-server.mjs`, suporta `/__stop`), recua para `python3 -m http.server`; serve em 8080–8090; PID em `web-local-preview/.server.pid`.

#### web_push_github {#mt-web_push_github}

- Finalidade: fazer push de `website/build` para a branch `gh-pages`.
- Uso: `make web_push_github`

Dica: defina `NPM=…` para substituir o gestor de pacotes usado pelo Makefile (predefinido: `npm`).

---
