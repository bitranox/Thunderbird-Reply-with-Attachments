---
id: donation
title: 'Doar'
sidebar_label: 'Doar'
---

---

## Doar

import useBaseUrl from '@docusaurus/useBaseUrl';

Se gosta de "Reply with Attachments" e deseja apoiar o seu desenvolvimento, pode fazer uma doação aqui:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Doar via Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ou</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Doar via PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ou</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Ofereça-me um café" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Leia o código para me oferecer um café"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Obrigado! O seu apoio ajuda a manter a compatibilidade com as novas versões do Thunderbird, a melhorar a acessibilidade e os testes, e a manter a documentação atualizada.

Notas

- Os links de doação só abrem quando clica neles; o complemento não efetua quaisquer pedidos de rede em segundo plano.
- O apoio recorrente ajuda na manutenção a longo prazo e em atualizações atempadas, mas é totalmente opcional.

---

Se os botões de imagem não forem carregados, utilize estes links em alternativa:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

As doações são voluntárias; não há bloqueio de funcionalidades.

---

## Visibilidade das doações (adiamento de 90 dias)

O complemento inclui uma funcionalidade de conveniência para ocultar os pedidos de doação durante algum tempo após ter doado.

- Onde encontrar
  - Opções → secção Suporte: verá um botão “Eu doei” e uma pequena área de dica.
  - O diálogo de confirmação de envio também mostra um botão Doar; é ocultado automaticamente quando o adiamento está ativo.

- Como funciona
  - Ao clicar em “Eu doei”, os botões de doação e as mensagens relacionadas ficam ocultos por 90 dias.
  - Uma indicação de estado mostra “Oculto até YYYY‑MM‑DD” (na sua data local). Há também um botão “Mostrar Doar novamente” para restaurar a visibilidade imediatamente.
  - Após 90 dias, o botão Doar volta a ficar visível automaticamente.

- Privacidade e armazenamento
  - O complemento armazena um único carimbo de data/hora no armazenamento local do Thunderbird para lembrar o período de adiamento. Chave: `donateHideUntil` (milissegundos desde a época Unix).
  - Esta definição é local ao seu perfil do Thunderbird (não é sincronizada na nuvem). Esta funcionalidade não faz quaisquer pedidos de rede.

- Resolução de problemas
  - Se o botão Doar ainda aparecer logo após clicar em “Eu doei”, aguarde um momento ou reabra a página Opções; a interface é atualizada assim que a definição é guardada.
  - Para repor manualmente, clique em “Mostrar Doar novamente”. Também pode esperar até que a data indicada na dica seja ultrapassada.

Esta funcionalidade é apenas por conveniência; nunca bloqueia a funcionalidade do complemento e não recolhe quaisquer dados pessoais.

---
