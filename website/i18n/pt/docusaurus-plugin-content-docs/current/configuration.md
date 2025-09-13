---
id: configuration
title: 'Configuração'
---

## Configuração

Nota de terminologia: veja o [Glossário](glossary) para termos consistentes usados na interface do usuário e na documentação.

---

## Abrir opções no Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Ferramentas → Complementos e Temas → encontre “Responder com Anexos” → Preferências/Opções

---

### Configurações {#settings}

#### Confirmação {#confirmation}

- Ativar “Perguntar antes de adicionar anexos”
- Resposta padrão: Sim ou Não (padrão de foco e teclado)
- Teclado: Y/J = Sim; N/Esc = Não; Tab/Shift+Tab e teclas de setas mudam o foco
  - Veja os detalhes do teclado em [Uso](usage#keyboard-shortcuts).

---

#### Lista negra (padrões globais) {#blacklist-glob-patterns}

Os arquivos na lista negra não serão adicionados automaticamente na resposta. Veja também o [Glossário](glossary) para “Lista negra (lista de exclusão)”.

- Um padrão por linha; insensível a maiúsculas; correspondência apenas de nome de arquivo
- Exemplos: `*intern*`, `*secret*`, `*passwor*`
- Tokens globais suportados: `*` (qualquer caractere exceto `/`), `?` (um caractere), classes de caracteres como `[abc]`. Use `\[` para corresponder a um `[` literal. Caminhos (`**/`) são ignorados, pois apenas nomes de arquivos são correspondidos.
- Não suportado: negação (`!`), expansão de chaves (`{..}`) e intervalos complexos. Mantenha os padrões simples.
- Comentários não são suportados em padrões. Não inclua `#` ou comentários em linha; insira apenas o texto do padrão por linha.

---

##### Livro de receitas de padrões {#pattern-cookbook}

- Correspondência de qualquer PDF: `*.pdf`
- Correspondência de arquivos que começam com “scan”: `scan*`
- Classe de caracteres: `report[0-9].txt`
- Escapar um `[` literal: `\[` (útil ao corresponder um parêntese como um caractere)

---

##### Notas {#blacklist-notes}

- A ordem não importa; a primeira/qualquer correspondência exclui o arquivo.
- A correspondência é apenas de nome de arquivo (caminhos/pastas são ignorados).
- “Redefinir para padrões padrão” restaura os padrões recomendados e a alternância de aviso da lista negra.
- Por que o exemplo `*passwor*`? Ele corresponde a famílias de “senha” e “Passwort”.
- Precedência: se qualquer padrão corresponder a um nome de arquivo, o arquivo é excluído (primeira/qualquer correspondência — a ordem não muda o resultado).
- Dica — teste seu padrão: adicione um padrão temporário, responda a uma mensagem contendo um arquivo com um nome correspondente e confirme que ele está excluído na lista de avisos.

##### Rápido para testar (teste seguro) {#blacklist-try-it}

1. Abra Opções → Lista negra.
2. Adicione um padrão temporário como `*.tmp` e clique em Salvar.
3. Responda a um e-mail de teste que tenha um arquivo terminando com `.tmp` — o arquivo deve aparecer na lista de aviso e não deve ser anexado.
4. Remova o padrão temporário quando terminar ou clique em “Redefinir para padrões padrão”.

---

#### Aviso sobre anexos excluídos {#warning-on-excluded-attachments}

- Ativar “Avisar se os anexos forem excluídos pela lista negra” (padrão: ATIVADO).
- Quando ativado, um pequeno modal lista os arquivos excluídos e o(s) padrão(s) correspondente(s). O aviso também aparece quando nada será anexado porque todos os candidatos foram
  excluídos pela lista negra.

---

#### Salvar suas configurações {#save-your-settings}

As configurações são salvas pressionando o botão Salvar. Você pode reverter campos individuais manualmente ou redefinir padrões conforme necessário.

Se as configurações armazenadas não parecerem ser aplicadas corretamente, reinicie o Thunderbird e tente novamente. (O Thunderbird pode armazenar em cache o estado entre sessões; uma reinicialização garante que novas configurações sejam carregadas.)

Dica: Para confirmar que suas configurações surtiram efeito, responda a qualquer mensagem com um anexo e verifique o aviso de confirmação ou da lista negra.

---

#### Visibilidade de Doações (posição de 90 dias) {#donation-visibility}

O complemento inclui um recurso de conveniência para ocultar solicitações de doação por um tempo após você ter doado.

Onde encontrá-lo

- Opções → seção de Suporte: você verá um botão “Eu doei” e uma pequena área de dica.
- O diálogo de confirmação de envio também mostra um botão Doar; ele se oculta automaticamente quando a posição de espera está ativa.

Como funciona

- Clicar em “Eu doei” oculta os botões de doação e solicitações relacionadas por 90 dias.
- Uma dica de status mostra “Oculto até YYYY‑MM‑DD” (na sua data local). Também há um botão “Mostrar Doar novamente” para restaurar a visibilidade imediatamente.
- Após 90 dias, o botão Doar se torna visível automaticamente novamente.

Privacidade e armazenamento

- O complemento armazena um único registro de data/hora no armazenamento local do Thunderbird para lembrar o período de espera. Chave: `donateHideUntil` (milissegundos de época).
- Esta configuração é local ao seu perfil do Thunderbird (não sincronizada na nuvem). Nenhuma solicitação de rede é feita por este recurso.

Solução de problemas

- Se Doar ainda aparecer logo após clicar em “Eu doei”, aguarde um momento ou reabra a página de Opções; a interface é atualizada assim que a configuração é salva.
- Para redefinir manualmente, clique em “Mostrar Doar novamente”. Você também pode esperar até que a data listada na dica passe.

Este recurso é puramente por conveniência; ele nunca bloqueia a funcionalidade do complemento e não coleta nenhum dado pessoal.

---

### Normalização de nomes de arquivo (prevenção de duplicados) {#filename-normalization-duplicates-prevention}

Para se comportar de maneira consistente em várias plataformas, os nomes de arquivos são normalizados antes das verificações de duplicatas:

- Unicode é normalizado para NFC.
- Nomes são convertidos para minúsculas.
- Pontos/espaços finais são removidos (compatibilidade com Windows).

Isso mantém a detecção de duplicatas previsível para nomes como `café.pdf` vs `café.pdf` (NFD) ou `FILE.txt.` vs `file.txt`.

---

## Comportamento de confirmação {#confirmation-behavior}

- “Resposta padrão” define o botão inicialmente focado na caixa de diálogo de confirmação (útil para usuários de teclado).
- Funciona tanto para “Responder” quanto para “Responder a todos”. “Encaminhar” não é modificado por este complemento.

---

## Avançado: detecção de duplicados {#advanced-duplicate-detection}

A prevenção de duplicados é implementada por guia de composição e por nome de arquivo. Veja [Uso](usage#behavior-details) para uma explicação detalhada.

---

Veja também

- [Permissões](permissions)
- [Privacidade](privacy)
