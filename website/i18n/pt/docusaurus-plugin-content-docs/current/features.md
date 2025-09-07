---
id: features
title: Recursos
sidebar_label: Recursos
---

## Recursos

- Anexa automaticamente os ficheiros do e‑mail original ao responder.
- Comportamento configurável: os anexos podem ser
  - adicionados automaticamente, ou
  - adicionados apenas após confirmação (uma pequena caixa de diálogo acessível). Em Opções pode ativar a confirmação e escolher a resposta predefinida (Sim/Não).
- A lista negra de nomes de ficheiros (padrões glob) impede que certos ficheiros sejam anexados automaticamente. Exemplos: `*intern*`, `*secret*`, `*passwor*`.
  A correspondência não diferencia maiúsculas/minúsculas e verifica apenas o nome do ficheiro; em Opções forneça um padrão por linha.
- Aviso de lista negra (opcional, ativo por omissão): quando ficheiros são excluídos pela sua lista negra, um pequeno modal lista o ficheiro e os padrões correspondentes. Compatível com modo escuro e acessível por teclado (Enter/Esc para fechar).
- Adiciona os originais mesmo que já tenha anexado algo; evita duplicados pelo nome do ficheiro.
- Ignora certificados SMIME e imagens embutidas para evitar anexos desnecessários.
