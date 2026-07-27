---
id: changelog
title: 'Histórico de alterações'
---

---

## Registro de alterações

Para o histórico completo e detalhado, consulte o
[CHANGELOG.md no GitHub](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md).

- 2.4.0: as imagens deixam de ser descartadas apenas porque o remetente colocou um `Content-ID` nelas; a opção "Include inline pictures" foi removida, já que o Thunderbird mantém as imagens incorporadas no corpo da resposta por conta própria; os links agora abrem no navegador do sistema; um limite de 50 anexos / 100 MB por resposta, com tudo o que for deixado de fora sendo relatado.
- 2.3.2: "Include inline pictures" incorporava imagens no corpo da resposta como URIs de dados base64 (removida novamente após a revisão do add-ons.thunderbird.net; o Thunderbird faz isso por conta própria); melhorias na qualidade do código e cobertura de testes ampliada.
- 2.3.1: Mantém os anexos após o Thunderbird deixar a página de eventos em segundo plano ociosa; adiciona ganchos de depuração direcionados para solução de problemas.
- 2.3.0: Deduplicação de anexos aprimorada, cobertura de testes ampliada e remoção de permissões obsoletas para atender às políticas da AMO.
- 2.1.0: Suporte completo à internacionalização para os 100 principais idiomas
- 2.0.0: reescrita para uma versão completa (EN/DE)
- 1.0.1: passou a usar messages.listAttachments()
- 1.0.0: lançamento inicial

---

## Datas e canais {#dates-and-channels}

- As publicações no ATN podem atrasar algumas horas após o empacotamento.
- As compilações LOCAL são apenas para testes de desenvolvedor e não são distribuídas via ATN.

---
