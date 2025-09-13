---
id: permissions
title: 'Permissões'
---

## Permissões

:::note Permissões mínimas
Nenhuma permissão de host (web) é solicitada por este complemento. O complemento não coleta telemetria nem faz requisições de rede em segundo plano. Veja [Privacidade](privacy).
:::

---

O complemento solicita um pequeno e focado conjunto de permissões apenas. Por que cada uma é necessária:

- `compose`: observar eventos de composição, listar/adicionar anexos em sua resposta.
- `messagesRead`: ler metadados e buscar arquivos de anexos da mensagem original.
- `scripting`: injetar a pequena caixa de diálogo de confirmação em composição quando ativada.
- `windows`: abrir um pequeno popup de confirmação como último recurso quando a mensagem falha.
- `sessions`: armazenar uma flag por aba para evitar processamento duplicado.
- `storage`: persistir opções (lista negra, alternar confirmação, resposta padrão).
- `tabs`: mensagens direcionadas para a aba de composição para solicitações de confirmação.

Notas adicionais:

- Nenhuma permissão de host (origens web) é solicitada por este complemento.
- A permissão `tabs` é usada apenas para direcionar a aba de composição ao coordenar a caixa de diálogo de confirmação opcional; não é usada para ler histórico ou navegar em páginas.

Essas permissões estão documentadas na fonte e testadas em CI. O complemento não coleta telemetria.

---

### Resumo (permissões → propósito) {#permissions-summary}

| Permissão       | Por que é necessária                                                              |
| --------------- | --------------------------------------------------------------------------------- |
| `compose`       | Observar eventos de composição; listar e adicionar anexos em sua resposta.        |
| `messagesRead`  | Listar anexos da mensagem original e buscar os dados do arquivo.                  |
| `scripting`     | Injetar/coordenar UI leve para confirmação quando ativada.                        |
| `windows`       | Popup de fallback se a mensagem falhar (raro).                                    |
| `sessions`      | Armazenar uma flag por aba para prevenir processamento duplicado.                 |
| `storage`       | Persistir opções (lista negra, alternar confirmação, resposta padrão).            |
| `tabs`          | Mensagens direcionadas para a aba de composição para solicitações de confirmação. |
| (perms de host) | Nenhuma — o complemento não solicita origens web.                                 |

---

## Não solicitado {#not-requested}

- `compose.save`, `compose.send` — o complemento não salva ou envia e-mails em seu nome.

Veja também: [Privacidade](privacy) — sem telemetria, sem rede em segundo plano, apenas links iniciados pelo usuário.

---
