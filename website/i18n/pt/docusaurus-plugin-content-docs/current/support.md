---
id: support
title: 'Suporte'
sidebar_label: 'Suporte'
---

## FAQ {#faq}

### Anexos não foram adicionados — por quê?

- Imagens inline e partes S/MIME são intencionalmente excluídas.
- Nomes de arquivos duplicados são ignorados se a composição já tiver o mesmo arquivo.
- Padrões de blacklist podem filtrar candidatos; veja [Configuração](configuration#blacklist-glob-patterns).

### Posso confirmar antes de adicionar anexos?

Sim. Ative “Perguntar antes de adicionar anexos” em [Configuração → Confirmação](configuration#confirmation). Teclado: Y/J = Sim, N/Esc = Não.

### O complemento envia dados ou rastreia uso?

Não. Veja [Privacidade](privacy) — sem telemetria e sem solicitações de rede em segundo plano.

### Encaminhar não adiciona anexos — isso é esperado?

Sim. Apenas Responder e Responder a todos são modificados por este complemento; Encaminhar permanece inalterado. Veja [Limitações](usage#limitations).

### Onde está o soneca de Doação?

Opções → seção Suporte. Veja [Visibilidade de Doação](configuration#donation-visibility).

---

## Suporte

Precisa de ajuda ou deseja relatar um bug?

---

### Abra uma issue no GitHub:

- Repositório: `bitranox/Thunderbird-Reply-with-Attachments`
- Issues: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Inclua a versão do Thunderbird (por exemplo, 128 ESR), SO e etapas para reproduzir
- Anexe logs relevantes do Console de Erros do Thunderbird (Ferramentas → Ferramentas de Desenvolvedor → Console de Erros)

- Site de complementos (ATN): Você também pode deixar feedback através da [página do complemento](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Dicas

- Certifique-se de que você está em uma versão suportada do Thunderbird (128 ESR ou mais recente).
- Consulte os documentos de Configuração e Uso para perguntas comuns de configuração.
- Para desenvolvimento/testes, veja o guia de Desenvolvimento.
- Se as configurações armazenadas parecerem não se aplicar corretamente, reinicie o Thunderbird e tente novamente. (O Thunderbird pode armazenar em cache o estado entre sessões; uma reinicialização garante que novas configurações sejam carregadas.)
- Repro mínimo: tente com um pequeno e-mail de teste contendo um ou dois anexos de arquivo simples.
- Compare o comportamento com confirmação ATIVADA vs. DESATIVADA para restringir se o fluxo do diálogo está envolvido.

---

### O que incluir em um relatório

- Versão do Thunderbird e SO
- Etapas exatas para reproduzir (o que você fez, o que esperava, o que aconteceu)
- Se a confirmação estava ativada e sua configuração de resposta padrão
- Um exemplo de seus padrões de blacklist (se relevante)
- Logs do Console de Erros durante a reprodução (Ferramentas → Ferramentas de Desenvolvedor → Console de Erros)
- Ativar registro de debug (opcional):
  - Execute no Console de Erros do Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Reproduza o problema e copie as linhas de log relevantes `[RWA]`

---

### Modelo de issue (copiar/colar) {#issue-template}

- Versão do Thunderbird e SO:
- Etapas para reproduzir:
- Confirmação ativada? Resposta padrão:
- Padrões de blacklist de exemplo:
- Logs do Console de Erros (Ferramentas → Ferramentas de Desenvolvedor → Console de Erros):
- Mais alguma coisa relevante:

---

### Doar

Se você gostaria de apoiar este projeto, considere uma pequena contribuição na página [Doar](donation). Obrigado!

---
