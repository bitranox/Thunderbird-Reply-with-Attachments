---
id: glossary
title: 'Glossário'
sidebar_label: 'Glossário'
---

## Glossário

Termos canônicos usados na interface do add-on e na documentação. Use estes para manter as traduções consistentes entre os locais.

---

### Notas

- Mantenha as strings da UI curtas e orientadas para a ação.
- Prefira substantivos para configurações e verbos para ações.
- Use caixa de frase (apenas a primeira palavra capitalizada) exceto títulos.

---

### Termos

- **Anexos**: arquivos incluídos com um e-mail. Evite "enclosures".
- **Lista negra** (Exclude list): lista de padrões que impedem que arquivos sejam anexados automaticamente. Na UI, isso aparece como "Lista negra (padrões globais)".
- Na cópia da UI, prefira "Lista negra (padrões globais)" para corresponder à página de configurações.
- Explique que apenas nomes de arquivos são correspondidos; não caminhos.
- **Confirmar / Confirmação:** peça ao usuário para prosseguir antes de adicionar anexos.
- **Respostas:** "Sim" (adicionar), "Não" (cancelar). Mantenha os rótulos dos botões curtos.
- **Imagem inline:** uma imagem referenciada por CID no HTML da mensagem; nunca adicionada como um arquivo.
- **Assinatura S/MIME:** `smime.p7s` ou partes da assinatura PKCS7; nunca adicionada.
- **Opções / Configurações:** a página de configuração do add-on no Thunderbird.
- **Resposta padrão:** a resposta pré-selecionada para a caixa de diálogo de confirmação.

---

### Ações de e-mail

- **Responder:** responder ao remetente de uma mensagem.
- **Responder a todos:** responder ao remetente e a todos os destinatários.
- **Encaminhar:** enviar a mensagem para um destinatário diferente; este add-on não modifica o comportamento de encaminhamento.

---

### Tipos de anexos

- **Anexos inline:** ativos incorporados no corpo da mensagem (por exemplo, referenciados via Content‑ID). Não adicionados como arquivos pelo add-on.
- **Arquivos anexados:** arquivos anexados à mensagem como anexos regulares (candidatos para cópia em resposta).

---

### Estilo

- **Nomes de arquivos:** mostre como código (monoespaçado), por exemplo, `smime.p7s`, `*.png`.
- **Chaves/botões:** caixa de título apenas quando são nomes próprios; caso contrário, caixa de frase.
- **Evite jargão** (por exemplo, “idempotência”); prefira “prevenir duplicatas”.

---
