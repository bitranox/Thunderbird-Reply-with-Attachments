---
id: usage
title: 'Uso'
sidebar_label: 'Uso'
---

## Uso {#usage}

- Responda e o complemento adiciona originais automaticamente — ou pergunta primeiro, se habilitado nas Opções.
- Removido por duplicidade pelo nome do arquivo; S/MIME e imagens inline são sempre ignoradas.
- Anexos na lista negra também são ignorados (padrões de glob que não diferenciam maiúsculas de minúsculas correspondendo a nomes de arquivos, não caminhos). Veja [Configuração](configuration#blacklist-glob-patterns).

---

### O que acontece ao responder {#what-happens}

- Detectar resposta → listar anexo originais → filtrar S/MIME + inline → confirmação opcional → adicionar arquivos elegíveis (ignorar duplicatas).

Passo rigoroso vs. relaxado: O complemento primeiro exclui partes S/MIME e inline. Se nada se qualificar, ele executa um passo relaxado que ainda exclui S/MIME/inline, mas tolera mais casos (veja Detalhes do Código).

| Tipo de parte                                           |      Passo rigoroso |      Passo relaxado |
| ------------------------------------------------------- | ------------------: | ------------------: |
| Arquivo de assinatura S/MIME `smime.p7s`                |            Excluído |            Excluído |
| Tipos MIME S/MIME (`application/pkcs7-*`)               |            Excluído |            Excluído |
| Imagem inline referenciada por Content‑ID (`image/*`)   |            Excluído |            Excluído |
| Email anexado (`message/rfc822`) com um nome de arquivo |      Não adicionado | Pode ser adicionado |
| Anexo de arquivo regular com um nome de arquivo         | Pode ser adicionado | Pode ser adicionado |

Exemplo: Alguns anexos podem não ter certos cabeçalhos, mas ainda são arquivos regulares (não inline/S/MIME). Se o passo rigoroso não encontrar nenhum, o passo relaxado pode aceitar esses e anexá-los.

---

### Referência cruzada {#cross-reference}

- O encaminhamento não é modificado por design (veja Limitações abaixo).
- Para razões pelas quais um anexo pode não ser adicionado, veja “Por que os anexos podem não ser adicionados”.

---

## Detalhes do Comportamento {#behavior-details}

- **Prevenção de duplicatas:** O complemento marca a aba de composição como processada usando um valor de sessão por aba e um guardião em memória. Não adicionará originais duas vezes.
- Fechar e reabrir uma janela de composição é tratado como uma nova aba (ou seja, uma nova tentativa é permitida).
- **Respeitar anexos existentes:** Se a composição já contém alguns anexos, os originais ainda são adicionados exatamente uma vez, ignorando nomes de arquivos que já existem.
- **Exclusões:** Artefatos S/MIME e imagens inline são ignorados. Se nada se qualificar no primeiro passo, uma verificação relaxada reexamina partes não S/MIME.
  - **Nomes de arquivos:** `smime.p7s`
  - **Tipos MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Imagens inline:** qualquer parte `image/*` referenciada por Content‑ID no corpo da mensagem
  - **Emails anexados (`message/rfc822`):** tratados como anexos regulares se tiverem um nome de arquivo; podem ser adicionados (sujeitos a verificações de duplicatas e lista negra).
- **Aviso de lista negra (se habilitado):** Quando candidatos são excluídos pela sua lista negra,
  o complemento exibe um pequeno modal listando os arquivos afetados e o(s) padrão(ões) correspondente(s). Este aviso também aparece em casos onde nenhum anexo será
  adicionado porque tudo foi excluído.

---

## Atalhos de teclado {#keyboard-shortcuts}

- Diálogo de confirmação: Y/J = Sim, N/Esc = Não; Tab/Shift+Tab e teclas de seta alternam foco.
  - A “Resposta padrão” na [Configuração](configuration#confirmation) define o botão inicialmente focado.
  - Enter ativa o botão focado. Tab/Shift+Tab e setas movem o foco para acessibilidade.

### Resumo de Atalhos de Teclado {#keyboard-cheat-sheet}

| Teclas          | Ação                             |
| --------------- | -------------------------------- |
| Y / J           | Confirmar Sim                    |
| N / Esc         | Confirmar Não                    |
| Enter           | Ativar botão focado              |
| Tab / Shift+Tab | Mover foco para frente/trás      |
| Teclas de seta  | Mover foco entre botões          |
| Resposta padrão | Define foco inicial (Sim ou Não) |

---

## Limitações {#limitations}

- O encaminhamento não é modificado por este complemento (Responder e Responder a todos são suportados).
- Anexos muito grandes podem estar sujeitos a limites do Thunderbird ou do provedor.
  - O complemento não divide ou comprime arquivos; ele se baseia no manuseio normal de anexos do Thunderbird.
- Mensagens criptografadas: as partes S/MIME são intencionalmente excluídas.

---

## Por que os anexos podem não ser adicionados {#why-attachments-might-not-be-added}

- Imagens inline são ignoradas: partes referenciadas via Content‑ID no corpo da mensagem não são adicionadas como arquivos.
- Partes de assinatura S/MIME são excluídas por design: nomes de arquivos como `smime.p7s` e tipos MIME como `application/pkcs7-signature` ou `application/pkcs7-mime` são ignorados.
- Padrões de lista negra podem filtrar candidatos: veja [Configuração](configuration#blacklist-glob-patterns); a correspondência não diferencia maiúsculas de minúsculas e é apenas para nomes de arquivos.
- Nomes de arquivos duplicados não são re-adicionados: se a composição já contém um arquivo com o mesmo nome normalizado, ele é ignorado.
- Partes não-arquivo ou nomes de arquivos ausentes: apenas partes parecidas com arquivos com nomes de arquivos utilizáveis são consideradas para adição.

---

Veja também

- [Configuração](configuration)
