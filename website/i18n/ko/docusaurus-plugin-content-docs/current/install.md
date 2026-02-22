---
id: install
title: '설치'
slug: /install
sidebar_label: '설치'
---

---

## "Thunderbird 부가 기능 및 테마"를 통한 설치 {#installation-in-thunderbird-recommended}

:::important 최소 Thunderbird 버전
이 부가 기능은 Thunderbird **128 ESR 이상**을 지원합니다. 이전 버전은 지원되지 않습니다.
:::

이는 권장되는 설치 방법입니다. ATN(addons.thunderbird.net)에서 설치한 부가 기능은 자동으로 업데이트됩니다. 로컬/개발 설치는 자동 업데이트되지 않습니다.

- 최소 Thunderbird 버전: 128 ESR 이상.

1. Thunderbird에서 **도구 > 부가 기능 및 테마**로 이동합니다.
2. "reply with attachments"를 검색합니다.
3. 부가 기능을 추가합니다.

또는 부가 기능 페이지를 직접 엽니다: [Thunderbird 부가 기능(ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## XPI 파일에서 수동 설치 {#local-installation-in-thunderbird}

### XPI 파일 다운로드 {#download-the-xpi-file}

1. [Thunderbird 부가 기능 페이지](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)로 이동합니다.
2. 최신 버전의 부가 기능을 XPI 파일(`reply_with_attachments-x.y.z-tb.xpi`)로 다운로드합니다.

### Thunderbird에 설치 {#install-in-thunderbird-local}

1. Thunderbird를 엽니다.
2. **도구 > 부가 기능 및 테마**로 이동합니다.
3. **부가 기능 관리자**에서 오른쪽 상단의 톱니바퀴 아이콘을 클릭합니다.
4. 메뉴에서 **파일에서 부가 기능 설치…**를 선택합니다.
5. 다운로드한 `reply_with_attachments-x.y.z-tb.xpi` 파일을 선택합니다.
6. 메시지가 표시되면 설치를 확인합니다.

---

## 개발용 설치 {#installation-for-development}

### 저장소 다운로드 {#download-the-repository}

1. GitHub 저장소의 최신 버전을 다운로드합니다.
2. 자세한 정보를 보려면 `make help` 를 실행합니다.

### Thunderbird에 설치 {#install-in-thunderbird-dev}

1. Thunderbird를 엽니다.
2. **도구 > 부가 기능 및 테마**로 이동합니다.
3. **부가 기능 관리자**에서 오른쪽 상단의 톱니바퀴 아이콘을 클릭합니다.
4. 메뉴에서 **파일에서 부가 기능 설치…**를 선택합니다.
5. 생성된 파일 `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` 를 선택합니다.
6. 메시지가 표시되면 설치를 확인합니다.

참고: Thunderbird가 시스템에서 `.zip` 를 허용하지 않으면 `.xpi` 로 이름을 변경한 뒤 “파일에서 부가 기능 설치…”를 다시 시도하세요.

### LOCAL ZIP 찾는 위치 {#where-local-zip}

- 먼저 부가 기능을 패키징합니다: 저장소 루트에서 `make pack` 를 실행합니다.
- 패키징 후, 저장소 루트에서 “LOCAL” zip을 찾습니다(예: `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- 테스트를 위해 다시 패키징하기 전에 `sources/manifest_ATN.json` 및 `sources/manifest_LOCAL.json` 두 곳의 버전을 올리세요.

---

## 비활성화, 제거 및 업데이트 {#disable-uninstall-updates}

- 비활성화: Thunderbird → 도구 → 부가 기능 및 테마 → 부가 기능을 찾은 후 → 스위치를 끕니다.
- 제거: 동일한 화면 → 점 세 개 메뉴 → 제거.
- 업데이트: ATN에서 설치한 경우 새 버전이 승인되면 자동으로 업데이트됩니다. 로컬/개발 설치는 자동 업데이트되지 않으므로 새 LOCAL 빌드를 수동으로 다시 설치하세요.
- 설정을 완전히 제거: [개인정보 → 데이터 제거](privacy#data-removal)를 참고하세요.

함께 보기

- [빠른 시작](quickstart)
