---
id: usage
title: 'Uso'
sidebar_label: 'Uso'
---

---

## Uso {#usage}

- Responda e o complemento adiciona os originais automaticamente — ou pergunta antes, se ativado em Opções.
- Deduplicado por nome de arquivo; as partes S/MIME são sempre ignoradas. Imagens incorporadas na mensagem original permanecem no corpo da resposta, onde o Thunderbird as coloca, e não são copiadas como arquivos.
- Anexos na lista de bloqueio também são ignorados (padrões glob sem distinção entre maiúsculas e minúsculas que correspondem a nomes de ficheiro, não a caminhos). Veja [Configuração](configuration#blacklist-glob-patterns).

---

### O que acontece ao responder {#what-happens}

- Detectar resposta → listar os anexos originais → ignorar S/MIME e imagens incorporadas → confirmação opcional → adicionar os arquivos elegíveis (ignorando duplicados).

| Tipo de parte                                           | Copiado para a resposta |
|---------------------------------------------------------|------------------------:|
| Arquivo de assinatura S/MIME `smime.p7s`                | Não                     |
| Tipos MIME S/MIME (`application/pkcs7-*`)               | Não                     |
| Imagem que o corpo da mensagem incorpora via `cid:`     | Não (está no corpo)     |
| Imagem marcada como `Content-Disposition: inline`       | Não (está no corpo)     |
| Imagem com um `Content-ID` que o corpo nunca referencia | Sim                     |
| E-mail anexado (`message/rfc822`) com nome de arquivo   | Sim                     |
| Anexo de arquivo comum com nome de arquivo              | Sim                     |

Uma imagem só é considerada incorporada quando a mensagem original realmente a referencia, ou quando o remetente a
marcou explicitamente como `Content-Disposition: inline`. Um cabeçalho `Content-ID` isolado não é suficiente: vários
clientes de e-mail colocam um em cada parte de imagem, incluindo anexos genuínos, e esses ainda precisam ser copiados.

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
|----------------------|------------------------------------|
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

- As imagens que a mensagem original incorpora não são copiadas como arquivos. Elas já estão no corpo da resposta, onde o Thunderbird as colocou. Consulte [Configuration](configuration#include-inline-pictures).
- Partes de assinatura S/MIME são excluídas por design: nomes de ficheiro como `smime.p7s` e tipos MIME como `application/pkcs7-signature` ou `application/pkcs7-mime` são ignorados.
- Padrões de lista de bloqueio podem filtrar candidatos: veja [Configuração](configuration#blacklist-glob-patterns); a correspondência não diferencia maiúsculas de minúsculas e considera apenas o nome do ficheiro.
- Nomes de ficheiro duplicados não são readicionados: se a composição já contiver um ficheiro com o mesmo nome normalizado, ele é ignorado.
- Partes não relacionadas a ficheiros ou nomes de ficheiro ausentes: apenas partes do tipo ficheiro com nomes de ficheiro utilizáveis são consideradas para adição.

---

Veja também

- [Configuração](configuration)
