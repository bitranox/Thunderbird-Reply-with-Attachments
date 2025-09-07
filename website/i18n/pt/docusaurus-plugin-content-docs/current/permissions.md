---
id: permissions
title: Permissões
---

O extra pede um conjunto pequeno e específico de permissões. Porque cada uma é necessária:

- compose: observar eventos de composição, listar/adicionar anexos na resposta.
- messagesRead: ler metadados e obter ficheiros anexos da mensagem original.
- scripting: injetar a pequena caixa de confirmação na composição quando ativado.
- windows: abrir uma pequena janela de confirmação se a comunicação falhar.
- sessions: guardar uma marca por separador para evitar processamento duplicado.
- storage: persistir opções (lista negra, comutador de confirmação, resposta predefinida).
- tabs: mensagens direcionadas ao separador de composição para pedidos de confirmação.

Tudo isto está documentado no código e testado em CI. O extra não recolhe telemetria.
