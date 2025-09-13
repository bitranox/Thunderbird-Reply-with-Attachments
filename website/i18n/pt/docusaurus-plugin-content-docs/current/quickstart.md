---
id: quickstart
title: 'Início Rápido'
sidebar_label: 'Início Rápido'
---

## Início Rápido

:::important Versão Mínima do Thunderbird
Este complemento suporta o Thunderbird **128 ESR ou mais recente**. Versões anteriores não são suportadas.
:::

:::note Sem telemetria; sem rede em segundo plano
O complemento **não** coleta análises/telemetria e não faz **nenhum** pedido de rede em segundo plano. O acesso à rede ocorre apenas quando você clica em links externos (Docs, GitHub, Doar).
:::

---

### Instalar

1. Instale o complemento a partir dos Complementos do Thunderbird.
2. Opcional: Ative a confirmação (Opções → “Perguntar antes de adicionar anexos”).
3. Opcional: Mantenha o aviso de blacklist habilitado (padrão): “Avisar se anexos forem excluídos pela blacklist”.
4. Opcional: Adicione padrões da blacklist (um por linha), por exemplo:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: O “# …” acima é um comentário nesta documentação; não inclua comentários nos padrões que você colar nas Opções. Insira apenas um padrão por linha.

Agora responda a uma mensagem com anexos — os originais serão adicionados automaticamente ou após uma rápida confirmação. Se algum arquivo for excluído pela sua blacklist, você verá um breve aviso listando-os.

---

### Verificar {#verify}

- Responda a uma mensagem com 1-2 anexos e confirme que os originais foram adicionados à sua janela de composição.
- Para ajustar o comportamento, veja [Configuração](configuration) (alternar confirmação, resposta padrão, padrões de blacklist).

---

### Verificar aviso de blacklist {#verify-blacklist-warning}

- Responda a uma mensagem contendo um arquivo como “secret.txt”.
- Com “Avisar se anexos forem excluídos pela blacklist” ativado, uma pequena caixa de diálogo lista os arquivos excluídos e o padrão correspondente.

Se você não ver um aviso, assegure-se de que o padrão corresponda exatamente ao nome do arquivo (somente nome do arquivo, sem considerar maiúsculas/minúsculas). Veja Configuração → Blacklist.

---

### Nota de teclado {#keyboard-note}

- A caixa de diálogo de confirmação suporta Y/J para Sim e N/Esc para Não. Em alguns teclados não latinos, as teclas de letras podem variar; Enter confirma o botão em foco.

---
