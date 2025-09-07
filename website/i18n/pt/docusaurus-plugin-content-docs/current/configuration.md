---
id: configuration
title: Configuração
---

# Configuração

Nota de terminologia: consulte o [Glossário](glossary) para os termos usados de forma consistente na interface e nos documentos.

## Abrir opções no Thunderbird

- Thunderbird → Ferramentas → Extras e temas → “Reply with Attachments” → Preferências/Opções

### Definições:

#### Confirmação

- Ativar/desativar “Perguntar antes de adicionar anexos”.
- Resposta predefinida: Sim ou Não (foco e teclado predefinidos).
- Teclado: Y/J = Sim; N/Esc = Não; Tab/Shift+Tab e setas alternam o foco.

#### Lista negra (padrões glob)

Ficheiros na lista negra não serão anexados automaticamente na resposta.

- Um padrão por linha; insensível a maiúsculas/minúsculas; apenas o nome do ficheiro é considerado.
- Exemplos: `*.png`, `smime.*`, `*.p7s`.
- Glob suportados: `*` (quaisquer caracteres exceto `/`), `?` (um carácter), classes como `[abc]`. Use `\[` para um `[` literal. Caminhos (`**/`) são ignorados pois só se verifica o nome do ficheiro.
- Não suportado: negação (`!`), expansão com chavetas (`{..}`) e intervalos complexos. Mantenha os padrões simples.

Sugestão: As predefinições são preenchidas na primeira abertura e podem ser repostas a qualquer momento.

#### Aviso ao excluir anexos

- Ative “Avisar se os anexos forem excluídos pela lista negra” (predefinição: ligado).
- Quando ativado, uma pequena janela modal lista os ficheiros excluídos e os padrões correspondentes. O aviso também aparece quando nada será anexado por ter sido tudo excluído.

#### Guarde as definições

---

### Normalização de nomes de ficheiro (prevenção de duplicados)

Para um comportamento consistente entre plataformas, os nomes são normalizados antes de verificar duplicados:

- Unicode é normalizado para NFC.
- Os nomes são convertidos para minúsculas.
- Pontos/espaços finais são removidos (compatibilidade com Windows).

Isto torna a deteção de duplicados previsível para nomes como `café.pdf` vs `café.pdf` (NFD) ou `FILE.txt.` vs `file.txt`.
