---
id: quickstart
title: 'Início rápido'
sidebar_label: 'Início rápido'
---

---

## Início rápido

:::important Versão mínima do Thunderbird
Este complemento é compatível com o Thunderbird **128 ESR ou mais recente**. Versões mais antigas não são suportadas.
:::

:::note Sem telemetria; sem rede em segundo plano
O complemento **não** recolhe análises/telemetria e **não** faz pedidos de rede em segundo plano. O acesso à rede ocorre apenas quando clica em ligações externas (Documentação, GitHub, Doar).
:::

---

### Instalar

1. Instale o complemento a partir dos Complementos do Thunderbird.
2. Opcional: Ative a confirmação (Opções → “Perguntar antes de adicionar anexos”).
3. Opcional: Deixe o aviso da lista negra ativado (predefinição): “Avisar se os anexos forem excluídos pela lista negra”.
4. Opcional: Adicione padrões à lista negra (um por linha), por exemplo:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Nota: O “# …” acima é um comentário nesta documentação; não inclua comentários nos padrões que colar em Opções. Introduza apenas um padrão por linha.

Agora responda a uma mensagem com anexos — os originais serão adicionados automaticamente ou após uma confirmação rápida. Se algum ficheiro for excluído pela sua lista negra, verá um pequeno aviso a listá-los.

---

### Verificar {#verify}

- Responda a uma mensagem com 1–2 anexos e confirme que os originais são adicionados à sua janela de composição.
- Para ajustar o comportamento, veja [Configuração](configuration) (alternância de confirmação, resposta predefinida, padrões da lista negra).

---

### Verificar aviso da lista negra {#verify-blacklist-warning}

- Responda a uma mensagem que contenha um ficheiro como “secret.txt”.
- Com “Avisar se os anexos forem excluídos pela lista negra” ativado, uma pequena caixa de diálogo lista os ficheiros excluídos e o padrão correspondente.

Se não vir um aviso, certifique-se de que o padrão corresponde exatamente ao nome do ficheiro (apenas o nome do ficheiro, sem distinção entre maiúsculas e minúsculas). Veja Configuração → Lista negra.

---

### Nota sobre o teclado {#keyboard-note}

- A caixa de confirmação aceita Y/J para Sim e N/Esc para Não. Em alguns teclados não latinos, as teclas de letras podem variar; Enter confirma o botão em foco.

---
