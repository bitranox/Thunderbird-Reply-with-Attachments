---
id: install
title: 'Instalação'
slug: /install
sidebar_label: 'Instalação'
---

---

## Instalação via "Complementos e Temas do Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versão mínima do Thunderbird
Este complemento é compatível com o Thunderbird **128 ESR ou mais recente**. Versões mais antigas não são suportadas.
:::

Este é o método de instalação recomendado. Complementos instalados a partir do ATN (addons.thunderbird.net) recebem atualizações automáticas. Instalações LOCAL/dev não são atualizadas automaticamente.

- Versão mínima do Thunderbird: 128 ESR ou mais recente.

1. No Thunderbird, aceda a **Ferramentas > Complementos e Temas**.
2. Pesquise por "reply with attachments".
3. Adicione o complemento.

Ou abra diretamente a página do complemento: [Complementos do Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalação manual a partir de XPI {#local-installation-in-thunderbird}

### Transferir o ficheiro XPI {#download-the-xpi-file}

1. Vá para a [página do complemento do Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Transfira a versão mais recente do complemento como um ficheiro XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalar no Thunderbird {#install-in-thunderbird-local}

1. Abra o Thunderbird.
2. Vá a **Ferramentas > Complementos e Temas**.
3. No **Gestor de Complementos**, clique no ícone de engrenagem no canto superior direito.
4. Escolha **Instalar complemento a partir de um ficheiro…** no menu.
5. Selecione o ficheiro `reply_with_attachments-x.y.z-tb.xpi` transferido.
6. Confirme a instalação quando for solicitado.

---

## Instalação para desenvolvimento {#installation-for-development}

### Transferir o repositório {#download-the-repository}

1. Transfira a versão mais recente do repositório no GitHub.
2. Execute `make help` para mais informações.

### Instalar no Thunderbird {#install-in-thunderbird-dev}

1. Abra o Thunderbird.
2. Vá a **Ferramentas > Complementos e Temas**.
3. No **Gestor de Complementos**, clique no ícone de engrenagem no canto superior direito.
4. Escolha **Instalar complemento a partir de um ficheiro…** no menu.
5. Selecione o ficheiro gerado `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirme a instalação quando for solicitado.

Nota: Se o Thunderbird não aceitar o `.zip` no seu sistema, renomeie-o para `.xpi` e tente “Instalar complemento a partir de um ficheiro…” novamente.

### Onde encontrar o ZIP LOCAL {#where-local-zip}

- Primeiro, empacote o complemento: execute `make pack` na raiz do repositório.
- Após o empacotamento, encontre o zip “LOCAL” na raiz do repositório (por exemplo, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Antes de voltar a empacotar para testes, incremente as versões em ambos `sources/manifest_ATN.json` e `sources/manifest_LOCAL.json`.

---

## Desativar, Desinstalar e Atualizações {#disable-uninstall-updates}

- Desativar: Thunderbird → Ferramentas → Complementos e Temas → localize o complemento → desative.
- Desinstalar: mesma vista → menu de três pontos → Remover.
- Atualizações: instalações via ATN recebem atualização automática quando novas versões são aprovadas. Instalações LOCAL/dev não são atualizadas automaticamente; reinstale manualmente uma nova compilação LOCAL.
- Remover completamente as definições: consulte [Privacidade → Remoção de dados](privacy#data-removal).

Consulte também

- [Início rápido](quickstart)
