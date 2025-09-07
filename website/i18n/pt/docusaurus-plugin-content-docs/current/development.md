---
id: development
title: Desenvolvimento
sidebar_label: Desenvolvimento
---

## Guia de desenvolvimento

### Pré‑requisitos

- Node.js 18+ e npm
- Thunderbird 128 ESR ou posterior (para testes manuais)

### Estrutura do projeto (alto nível)

- Raiz: script de empacotamento `distribution_zip_packer.sh`, docs, capturas
- `sources/`: código principal do extra (background, UI de opções/janela, manifests, ícones)
- `tests/`: suite Vitest
- `website/`: docs Docusaurus (i18n em `website/i18n/de/...`)

### Instalação & ferramentas

- Instalar dependências de raiz: `npm ci`
- Docs (opcional): `cd website && npm ci`
- Descobrir alvos: `make help`

### Compilar & empacotar

- Criar ZIPs: `make pack`
  - Produz ZIPs ATN e LOCAL na raiz do repo (não editar artefactos à mão)
  - Dica: atualize a versão em `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json` antes do empacotamento
- Instalação manual (dev): Thunderbird → Ferramentas → Extras e temas → engrenagem → Instalar extra a partir de ficheiro… → selecione o ZIP criado

### Testes

- Suite completa: `make test` (Vitest)
- Cobertura (opcional):
  - `npm i -D @vitest/coverage-v8`
  - Execute `make test`; abra `coverage/index.html` para o relatório HTML
- Apenas i18n: `make test-i18n` (paridade, placeholders, títulos)

### Depuração & registos

- Consola de erros: Ferramentas → Ferramentas de programador → Consola de erros
- Alternar registos detalhados em runtime:
  - Ativar: `messenger.storage.local.set({ debug: true })`
  - Desativar: `messenger.storage.local.set({ debug: false })`
- Os registos aparecem ao redigir/enviar respostas

### Docs (site)

- Servidor de dev: `cd website && npm run start`
- Construir site estático: `cd website && npm run build`
- i18n: Inglês em `website/docs/*.md`; Alemão em `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- Pesquisa: se Algolia DocSearch estiver configurado em CI (`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), o site usa Algolia; caso contrário recorre à pesquisa local. Na página inicial, pressione `/` ou `Ctrl+K`.

### Segurança & configuração

- Não faça commit de `sources/manifest.json` (criado temporariamente pela build)
- Mantenha `browser_specific_settings.gecko.id` estável para preservar o canal de atualização

### Resolução de problemas

- Confirme Thunderbird 128 ESR ou posterior
- Use a Consola de erros para problemas de runtime

### CI & cobertura

- GitHub Actions (`CI — Tests`) executa vitest com limites de cobertura (85% linhas/funções/ramificações/declarações). Se não for atingido, o job falha.
- O workflow carrega o artefacto `coverage-html` com o relatório HTML; descarregue da execução (Actions → última execução → Artifacts).

### Contribuir

- Veja CONTRIBUTING.md para diretrizes de branches/commits/PR
