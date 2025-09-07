---
id: development
title: 개발
sidebar_label: 개발
---

## 개발 가이드

### 필수 요건

- Node.js 18+ 및 npm
- Thunderbird 128 ESR 이상(수동 테스트용)

### 프로젝트 구성(개요)

- 루트: 패키징 스크립트 `distribution_zip_packer.sh`, 문서, 스크린샷
- `sources/`: 부가 기능 핵심 코드(백그라운드, 옵션/팝업 UI, 매니페스트, 아이콘)
- `tests/`: Vitest 테스트 스위트
- `website/`: Docusaurus 문서(`website/i18n/de/...`에 i18n)

### 설치 및 도구

- 루트 의존성 설치: `npm ci`
- 문서(선택): `cd website && npm ci`
- 타깃 확인: `make help`

### 빌드 및 패키징

- ZIP 빌드: `make pack`
  - 저장소 루트에 ATN/LOCAL ZIP 생성(산출물 수동 수정 금지)
  - 팁: 패키징 전 `sources/manifest_ATN.json` 및 `sources/manifest_LOCAL.json`의 버전을 업데이트
- 수동 설치(개발): Thunderbird → 도구 → 부가 기능 및 테마 → 톱니 → 파일에서 부가 기능 설치… → 생성된 ZIP 선택

### 테스트

- 전체 스위트: `make test`(Vitest)
- 커버리지(선택):
  - `npm i -D @vitest/coverage-v8`
  - `make test` 실행; `coverage/index.html`에서 HTML 보고서 열기
- i18n만: `make test-i18n`(동등성, 플레이스홀더, 제목)

### 디버깅 및 로그

- 오류 콘솔: 도구 → 개발자 도구 → 오류 콘솔
- 런타임 상세 로그 전환:
  - 활성화: `messenger.storage.local.set({ debug: true })`
  - 비활성화: `messenger.storage.local.set({ debug: false })`
- 회신 작성/전송 중 로그가 나타납니다

### 문서(웹사이트)

- 개발 서버: `cd website && npm run start`
- 정적 사이트 빌드: `cd website && npm run build`
- i18n: 영어는 `website/docs/*.md`; 독어는 `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`
- 검색: CI에 Algolia DocSearch 환경변수가 설정되면 Algolia 사용, 아니면 로컬 검색. 첫 페이지에서 `/` 또는 `Ctrl+K`.

### 보안 및 구성 팁

- `sources/manifest.json`를 커밋하지 마세요(빌드 시 임시 생성)
- 업데이트 채널 유지를 위해 `browser_specific_settings.gecko.id`를 안정적으로 유지

### 문제 해결

- Thunderbird 128 ESR 이상인지 확인
- 런타임 이슈는 오류 콘솔 사용

### CI 및 커버리지

- GitHub Actions(`CI — Tests`)는 커버리지 임계값(라인/함수/분기/문장 85%)으로 vitest를 실행합니다. 미달 시 실패합니다.
- 워크플로가 `coverage-html` 산출물(HTML 보고서)을 업로드합니다. 실행 페이지에서 다운로드(Actions → 최근 실행 → Artifacts).

### 기여

- 브랜치/커밋/PR 가이드는 CONTRIBUTING.md 참조
