---
id: usage
title: Utilização
sidebar_label: Utilização
---

## Utilização

- Ao responder, o extra adiciona automaticamente os originais — ou pergunta primeiro se assim estiver definido nas Opções.
- Sem duplicados por nome de ficheiro; SMIME e imagens embutidas são sempre ignorados.
- Anexos na lista negra também são ignorados (sem diferença entre maiúsculas/minúsculas, padrões glob).

---

## Detalhes de comportamento

- Prevenção de duplicados: o extra marca o separador de composição como processado com um valor de sessão por separador e uma guarda em memória. Não adicionará os originais duas vezes.
- Respeito pelos anexos existentes: se já existirem anexos, os originais são adicionados exatamente uma vez, ignorando nomes já existentes.
- Exclusões: artefactos SMIME (p. ex., `smime.p7s`, `application/pkcs7-signature`/`x-pkcs7-signature`/`pkcs7-mime`) e imagens incorporadas são ignorados. Se nada for elegível na primeira passagem, um modo mais flexível volta a verificar as partes não‑SMIME.
- Aviso de lista negra (se ativado): quando candidatos são excluídos pela sua lista, aparece um modal pequeno com os ficheiros afetados e os padrões correspondentes; também aparece quando nada será anexado porque tudo foi excluído.
