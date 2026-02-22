---
id: usage
title: 'Uso'
sidebar_label: 'Uso'
---

---

## Uso {#usage}

- Responda e o complemento adiciona os originais automaticamente — ou pergunta antes, se ativado em Opções.
- Desduplicado pelo nome do ficheiro; partes S/MIME são sempre ignoradas. As imagens incorporadas são restauradas no corpo da resposta por predefinição (desative em "Incluir imagens incorporadas" em Opções).
- Anexos na lista de bloqueio também são ignorados (padrões glob sem distinção entre maiúsculas e minúsculas que correspondem a nomes de ficheiro, não a caminhos). Veja [Configuração](configuration#blacklist-glob-patterns).

---

### O que acontece ao responder {#what-happens}

- Detetar resposta → listar anexos originais → filtrar S/MIME + incorporados → confirmação opcional → adicionar ficheiros elegíveis (ignorar duplicados) → restaurar imagens incorporadas no corpo.

Passagem estrita vs. relaxada: O complemento primeiro exclui partes S/MIME e incorporadas dos anexos de ficheiros. Se nada se qualificar, executa uma passagem relaxada que ainda exclui S/MIME/incorporados, mas tolera mais casos (ver Detalhes do código). As imagens incorporadas nunca são adicionadas como anexos de ficheiro; em vez disso, quando "Incluir imagens incorporadas" está ativado (a predefinição), elas são incorporadas diretamente no corpo da resposta como URIs de dados em base64.

| Tipo de parte                                              |                 Passagem estrita |                Passagem relaxada |
| ---------------------------------------------------------- | -------------------------------: | -------------------------------: |
| Ficheiro de assinatura S/MIME `smime.p7s`                  |                         Excluído |                         Excluído |
| Tipos MIME S/MIME (`application/pkcs7-*`)                  |                         Excluído |                         Excluído |
| Imagem incorporada referenciada por Content‑ID (`image/*`) | Excluído (restaurado no corpo\*) | Excluído (restaurado no corpo\*) |
| E-mail anexado (`message/rfc822`) com um nome de ficheiro  |                   Não adicionado |              Pode ser adicionado |
| Anexo de ficheiro normal com um nome de ficheiro           |              Pode ser adicionado |              Pode ser adicionado |

\* Quando "Incluir imagens incorporadas" está ativado (predefinição: LIGADO), as imagens incorporadas são inseridas no corpo da resposta como URIs de dados em base64 em vez de adicionadas como anexos de ficheiro. Veja [Configuração](configuration#include-inline-pictures).

Exemplo: Alguns anexos podem não ter certos cabeçalhos, mas ainda são ficheiros normais (não incorporados/S/MIME). Se a passagem estrita não encontrar nenhum, a passagem relaxada pode aceitar esses e anexá-los.

---

### Referência cruzada {#cross-reference}

- Encaminhar não é modificado por design (veja Limitações abaixo).
- Para motivos pelos quais um anexo pode não ser adicionado, veja “Por que os anexos podem não ser adicionados”.

---

## Detalhes do comportamento {#behavior-details}

- **Prevenção de duplicados:** O complemento marca o separador de composição como processado usando um valor de sessão por separador e uma proteção em memória. Não adicionará os originais duas vezes.
- Fechar e reabrir uma janela de composição é tratado como um novo separador (ou seja, é permitida uma nova tentativa).
- **Respeitar anexos existentes:** Se a composição já contiver alguns anexos, os originais ainda assim são adicionados exatamente uma vez, ignorando nomes de ficheiro que já existam.
- **Exclusões:** Artefactos S/MIME e imagens incorporadas são excluídos dos anexos de ficheiros. Se nada se qualificar na primeira passagem, um recuo relaxado volta a verificar as partes não S/MIME. As imagens incorporadas são tratadas separadamente: são restauradas no corpo da resposta como URIs de dados (quando ativado).
  - **Nomes de ficheiro:** `smime.p7s`
  - **Tipos MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Imagens incorporadas:** qualquer parte `image/*` referenciada por Content‑ID — excluída dos anexos de ficheiros, mas incorporada no corpo da resposta quando "Incluir imagens incorporadas" está LIGADO
  - **E-mails anexados (`message/rfc822`):** tratados como anexos normais se tiverem um nome de ficheiro; podem ser adicionados (sujeito a verificações de duplicados e à lista de bloqueio).
- **Aviso de lista de bloqueio (se ativado):** Quando candidatos são excluídos pela sua lista de bloqueio,
  o complemento mostra um pequeno modal a listar os ficheiros afetados e o(s)
  padrão(ões) correspondente(s). Este aviso também aparece em casos onde nenhum anexo será
  adicionado porque tudo foi excluído.

---

## Atalhos de teclado {#keyboard-shortcuts}

- Caixa de diálogo de confirmação: Y/J = Yes, N/Esc = No; Tab/Shift+Tab e as teclas de seta ciclam o foco.
  - A “Resposta predefinida” em [Configuração](configuration#confirmation) define o botão inicialmente em foco.
  - Enter ativa o botão em foco. Tab/Shift+Tab e as setas movem o foco para acessibilidade.

### Guia rápido de teclado {#keyboard-cheat-sheet}

| Teclas               | Ação                               |
| -------------------- | ---------------------------------- |
| Y / J                | Confirmar Sim                      |
| N / Esc              | Confirmar Não                      |
| Enter                | Ativar botão em foco               |
| Tab / Shift+Tab      | Mover o foco para a frente/atrás   |
| Teclas de seta       | Mover o foco entre botões          |
| Resposta predefinida | Define o foco inicial (Sim ou Não) |

---

## Limitações {#limitations}

- Encaminhar não é modificado por este complemento (Responder e Responder a todos são suportados).
- Anexos muito grandes podem estar sujeitos a limites do Thunderbird ou do fornecedor.
  - O complemento não segmenta nem comprime ficheiros; depende do tratamento normal de anexos do Thunderbird.
- Mensagens encriptadas: partes S/MIME são intencionalmente excluídas.

---

## Por que os anexos podem não ser adicionados {#why-attachments-might-not-be-added}

- As imagens incorporadas não são adicionadas como anexos de ficheiro. Quando "Incluir imagens incorporadas" está LIGADO (a predefinição), elas são incorporadas no corpo da resposta como URIs de dados. Se a definição estiver DESLIGADA, as imagens incorporadas são removidas completamente. Veja [Configuração](configuration#include-inline-pictures).
- Partes de assinatura S/MIME são excluídas por design: nomes de ficheiro como `smime.p7s` e tipos MIME como `application/pkcs7-signature` ou `application/pkcs7-mime` são ignorados.
- Padrões de lista de bloqueio podem filtrar candidatos: veja [Configuração](configuration#blacklist-glob-patterns); a correspondência não diferencia maiúsculas de minúsculas e considera apenas o nome do ficheiro.
- Nomes de ficheiro duplicados não são readicionados: se a composição já contiver um ficheiro com o mesmo nome normalizado, ele é ignorado.
- Partes não relacionadas a ficheiros ou nomes de ficheiro ausentes: apenas partes do tipo ficheiro com nomes de ficheiro utilizáveis são consideradas para adição.

---

Veja também

- [Configuração](configuration)
