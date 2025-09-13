---
id: privacy
title: 'Privacidade'
sidebar_label: 'Privacidade'
---

## Privacidade

:::note Sem telemetria; sem rede em segundo plano
Este complemento **não** coleta análises/telemetria e não faz **nenhum** pedido de rede em segundo plano. Qualquer acesso à rede ocorre apenas quando você clica em um link externo (Docs, GitHub, Donate).
:::

Reply with Attachments não coleta análises ou telemetria e não envia seus dados para lugar algum.

O que o complemento faz:

- Lê os metadados de anexos e arquivos da mensagem original localmente (API do Thunderbird) para anexá-los à sua resposta.
- Armazena suas opções (lista negra, confirmação, resposta padrão) no armazenamento local do Thunderbird.

O que o complemento **não** faz:

- Nenhum rastreamento, análises, relatórios de falhas ou registros remotos.
- Nenhum pedido de rede em segundo plano, exceto quando você abre links externos (Docs, GitHub, Donate) explicitamente.

As permissões estão documentadas na página de [Permissões](permissions).

---

## Política de Segurança de Conteúdo (CSP) {#content-security-policy-csp}

As opções e páginas pop-up evitam scripts inline. Todo o JavaScript é carregado de arquivos incluídos com o complemento para cumprir com a CSP estrita no Thunderbird. Se você incorporar trechos de código em documentos, eles são apenas exemplos e não são executados pelo complemento.

---

## Armazenamento de dados {#data-storage}

- Preferências do usuário (lista negra, alternância de confirmação, resposta padrão) são armazenadas no `storage.local` do Thunderbird para este complemento.
- Nenhuma sincronização na nuvem é realizada pelo complemento.

---

## Rede {#network}

- O complemento não realiza atividade de rede em segundo plano.
- Qualquer acesso à rede ocorre apenas quando você clica em links (Docs, GitHub, Donate) ou quando o próprio Thunderbird realiza operações normais não relacionadas a este complemento.

---

## Remoção de dados {#data-removal}

- Desinstalar o complemento remove seu código.
- As configurações são mantidas apenas no `storage.local` do Thunderbird e são removidas na desinstalação; nenhum armazenamento externo é utilizado.
- Redefinir configurações sem desinstalar:
  - Página de opções: use “Redefinir para os padrões” para a lista negra e aviso da lista negra.
  - Avançado: no Thunderbird → Ferramentas → Ferramentas de desenvolvedor → Depurar complementos, abra o armazenamento da extensão e limpe as chaves, se necessário.

---
