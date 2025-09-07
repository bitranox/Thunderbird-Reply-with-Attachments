---
id: glossary
title: i18n 용어집
sidebar_label: 용어집
---

부가 기능 UI와 문서에서 사용하는 표준 용어입니다. 로케일 간 번역 일관성을 위해 이 용어를 기준으로 삼으세요.

## 참고

- UI 문구는 짧고 실행 지향적으로 작성합니다.
- 설정에는 명사, 동작에는 동사를 사용합니다.
- 제목을 제외하고 문장형 대소문자(Sentence case)를 사용합니다.

## 용어

- 첨부 파일(Attachments): 이메일에 포함되는 파일. “enclosures”는 사용하지 않습니다.
- 블랙리스트(Blacklist / 제외 목록): 파일이 자동 첨부되지 않도록 하는 패턴 목록.
- UI 문구에서는 설정 페이지와 맞추어 “Blacklist (glob patterns)”를 사용합니다.
- 파일 이름만 비교하고 경로는 비교하지 않는다고 명확히 밝힙니다.
- 확인(Confirm / Confirmation): 첨부 전에 사용자에게 진행 여부를 묻습니다.
- 응답(Answers): “Yes”(추가), “No”(취소). 버튼 레이블은 간결하게 유지합니다.
- 인라인 이미지(Inline image): HTML에서 CID로 참조되는 이미지. 파일로는 추가하지 않습니다.
- S/MIME 서명: `smime.p7s` 또는 PKCS7 서명 파트. 추가하지 않습니다.
- 옵션 / 설정(Options / Settings): Thunderbird의 부가 기능 구성 페이지.
- 기본 답변(Default answer): 확인 대화 상자에서 미리 선택된 답변.

## 스타일

- 파일 이름: 코드(등폭)로 표시합니다. 예: `smime.p7s`, `*.png`.
- 키/버튼: 고유명사만 제목형 대소문자, 그 외에는 문장형.
- 전문 용어(예: “idempotency”)는 피하고 “중복 방지”처럼 풀어 씁니다.
