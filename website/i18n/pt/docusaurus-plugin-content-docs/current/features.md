---
id: features
title: 'Funcionalidades'
sidebar_label: 'Funcionalidades'
---

---

## Funcionalidades {#features}

- Anexa automaticamente os ficheiros do e‑mail original ao responder.
- Comportamento configurável: os anexos podem ser
  - adicionados automaticamente, ou
  - adicionados apenas após confirmação (um pequeno diálogo acessível). Em Opções
    pode ativar a confirmação e escolher a resposta predefinida (Sim/Não).
- Uma lista de bloqueio de nomes de ficheiro (padrões glob) evita que ficheiros específicos sejam
  anexados automaticamente. Exemplos: `*intern*`, `*secret*`, `*passwor*`.
  A correspondência não diferencia maiúsculas de minúsculas e verifica apenas o nome do ficheiro; forneça um padrão
  por linha em Opções.
- Aviso da lista de bloqueio (opcional, ativado por predefinição): quando ficheiros são excluídos pela sua
  lista de bloqueio, um pequeno modal lista o ficheiro e o(s) padrão(ões) correspondente(s). Compatível com o modo escuro
  e acessível pelo teclado (Enter/Esc para fechar).
- Funciona com Responder e Responder a todos. Encaminhar não é modificado por este complemento.
- Adiciona os originais mesmo que já tenha anexado algo; evita duplicados pelo nome do ficheiro.
- A proteção contra duplicados por separador evita adicionar duas vezes no mesmo separador de composição.
- Ignora certificados S/MIME por predefinição para evitar anexos desnecessários.
- Incluir imagens incorporadas (predefinição: LIGADO). Imagens incorporadas são restauradas diretamente no
  corpo da resposta como URIs de dados base64, preservando a disposição inline original. Desative em
  Opções para ignorar completamente as imagens incorporadas.

---

## Como Funciona {#how-it-works}

- Ao responder, o complemento lista os anexos originais.
- Filtra assinaturas S/MIME dos anexos de ficheiros; as imagens inline são restauradas no corpo (a menos que desativadas).
- Opcionalmente pede confirmação (compatível com teclado).
- Adiciona os ficheiros elegíveis à sua composição, evitando duplicados pelo nome do ficheiro.
- Veja “Porque é que os anexos podem não ser adicionados” em Utilização para casos‑limite.

Nota de privacidade: Todo o processamento ocorre localmente no Thunderbird. O complemento não faz quaisquer pedidos de rede em segundo plano.

---
