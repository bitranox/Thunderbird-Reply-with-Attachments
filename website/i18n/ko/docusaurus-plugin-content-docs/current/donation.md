---
id: donation
title: '기부하기'
sidebar_label: '기부하기'
---

---

## 후원

import useBaseUrl from '@docusaurus/useBaseUrl';

"Reply with Attachments"가 마음에 들고 개발을 지원하고 싶으시다면, 여기에서 후원하실 수 있습니다:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Stripe로 후원" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>또는</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="PayPal로 후원" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>또는</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Buy Me a Coffee" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="스캔하여 Buy Me a Coffee로 후원"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

감사합니다! 후원은 새로운 Thunderbird 릴리스와의 호환성 유지, 접근성 및 테스트 개선, 문서 최신화에 큰 도움이 됩니다.

참고

- 후원 링크는 클릭할 때만 열리며, 부가 기능은 백그라운드에서 네트워크 요청을 수행하지 않습니다.
- 정기 후원은 장기 유지 보수와 적시 업데이트에 도움이 되지만, 전적으로 선택 사항입니다.

---

이미지 버튼이 로드되지 않으면 대신 다음 링크를 사용하세요:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Buy me a Coffee](https://buymeacoffee.com/bitranox)

---

후원은 자발적이며 기능 제한은 없습니다.

---

## 후원 표시(90일 스누즈)

이 부가 기능에는 후원한 뒤 일정 기간 동안 후원 안내를 숨길 수 있는 편의 기능이 포함되어 있습니다.

- 찾는 위치
  - 옵션 → 지원 섹션: “후원했습니다” 버튼과 작은 힌트 영역이 표시됩니다.
  - 전송 확인 대화상자에도 후원 버튼이 표시되며, 스누즈가 활성화되면 자동으로 숨겨집니다.

- 작동 방식
  - “후원했습니다”를 클릭하면 90일 동안 후원 버튼과 관련 안내가 숨겨집니다.
  - 상태 힌트에 “YYYY‑MM‑DD까지 숨김”(로컬 날짜)이 표시됩니다. 즉시 다시 표시하려면 “후원 버튼 다시 표시” 버튼을 사용할 수 있습니다.
  - 90일 후에는 후원 버튼이 자동으로 다시 표시됩니다.

- 개인정보 및 저장 방식
  - 이 부가 기능은 스누즈 기간을 기억하기 위해 Thunderbird의 로컬 스토리지에 타임스탬프 하나만 저장합니다. 키: `donateHideUntil` (에포크 밀리초).
  - 이 설정은 Thunderbird 프로필에만 적용되며(클라우드 동기화되지 않음), 이 기능은 네트워크 요청을 수행하지 않습니다.

- 문제 해결
  - “후원했습니다”를 클릭한 직후에도 후원이 계속 보인다면 잠시 기다리거나 옵션 페이지를 다시 여세요. 설정이 저장되는 즉시 UI가 업데이트됩니다.
  - 수동으로 초기화하려면 “후원 버튼 다시 표시”를 클릭하세요. 또는 힌트에 표시된 날짜가 지날 때까지 기다릴 수도 있습니다.

이 기능은 오로지 편의를 위한 것으로, 부가 기능의 동작을 차단하지 않으며 개인 데이터를 수집하지도 않습니다.

---
