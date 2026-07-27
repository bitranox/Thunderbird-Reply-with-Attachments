---
id: features
title: 'Funcionalidades'
sidebar_label: 'Funcionalidades'
---

---

## Funcionalidades {#features}

- As imagens incorporadas são deixadas a cargo do Thunderbird: permanecem no corpo da resposta e não são
  copiadas como anexos de arquivo. Uma imagem que carrega apenas um `Content-ID` sem ser
  referenciada é tratada como um anexo normal e é copiada.

---

## Como Funciona {#how-it-works}

- Ao responder, o complemento lista os anexos originais.
- Filtra assinaturas S/MIME dos anexos de ficheiros; as imagens inline são restauradas no corpo (a menos que desativadas).
- Opcionalmente pede confirmação (compatível com teclado).
- Adiciona os ficheiros elegíveis à sua composição, evitando duplicados pelo nome do ficheiro.
- Veja “Porque é que os anexos podem não ser adicionados” em Utilização para casos‑limite.

Nota de privacidade: Todo o processamento ocorre localmente no Thunderbird. O complemento não faz quaisquer pedidos de rede em segundo plano.

---
