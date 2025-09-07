---
id: privacy
title: Privacidade
sidebar_label: Privacidade
---

Responder com anexos não recolhe análises nem telemetria e não envia os seus dados para lado nenhum.

O que o extra faz:

- Lê localmente (API do Thunderbird) metadados e ficheiros dos anexos da mensagem original para os adicionar à sua resposta.
- Guarda as suas opções (lista negra, confirmação, resposta predefinida) no armazenamento local do Thunderbird.

O que o extra não faz:

- Sem rastreamento, análises, relatórios de falhas ou registos remotos.
- Sem pedidos de rede em segundo plano, exceto quando abre explicitamente ligações externas (Docs, GitHub, Doar).

As permissões estão documentadas na página de [Permissões](permissions).

## Política de Segurança de Conteúdo (CSP)

As páginas de opções e de pop‑up evitam scripts inline. Todo o JavaScript é carregado a partir de ficheiros fornecidos com o extra, cumprindo a CSP estrita do Thunderbird. Códigos de exemplo na documentação são apenas exemplos e não são executados pelo extra.
