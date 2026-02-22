---
id: development
title: '개발'
sidebar_label: '개발'
---

---

## 개발 가이드 {#development-guide}

:::note 영어만 편집하세요; 번역은 전파됩니다
문서는 `website/docs`(영어) 아래에서만 업데이트하세요. `website/i18n/<locale>/…` 아래의 번역물은 생성되므로 수동으로 편집하지 마세요. 번역 작업(예: `make translate_web_docs_batch`)을 사용해 현지화 콘텐츠를 새로 고치세요.
:::

### 사전 준비 사항 {#prerequisites}

- Node.js 22+ 및 npm(Node 22로 테스트됨)
- Thunderbird 128 ESR 이상(수동 테스트용)

---

### 프로젝트 레이아웃(상위 수준) {#project-layout-high-level}

- 루트: 패키징 스크립트 `distribution_zip_packer.sh`, 문서, 스크린샷
- `sources/`: 메인 애드온 코드(백그라운드, 옵션/팝업 UI, 매니페스트, 아이콘)
- `tests/`: Vitest 스위트
- `website/`: Docusaurus 문서(`website/i18n/de/...` 아래에 i18n 포함)

---

### 설치 및 도구 {#install-and-tooling}

- 루트 의존성 설치: `npm ci`
- 문서(선택): `cd website && npm ci`
- 타깃 확인: `make help`

---

### 실시간 개발(web‑ext run) {#live-dev-web-ext}

- Firefox Desktop에서 빠른 루프(UI 스모크 테스트 전용):
- `npx web-ext run --source-dir sources --target=firefox-desktop`
- Thunderbird에서 실행(MailExtensions에는 이 방식 권장):
- `npx web-ext run --source-dir sources --start-url about:addons --firefox-binary "$(command -v thunderbird || echo /path/to/thunderbird)"`
- 팁:
- Thunderbird의 오류 콘솔을 열어 두세요(도구 → 개발자 도구 → 오류 콘솔).
- MV3 이벤트 페이지는 유휴 시 일시 중단됩니다. 코드 변경 후 애드온을 다시 로드하거나 web‑ext 자동 재로드를 사용하세요.
- 일부 Firefox 전용 동작은 다를 수 있습니다. API 동등성 확보를 위해 항상 Thunderbird에서 확인하세요.
- Thunderbird 바이너리 경로(예시):
- Linux: `thunderbird`(예: `/usr/bin/thunderbird`)
- macOS: `/Applications/Thunderbird.app/Contents/MacOS/thunderbird`
- Windows: `"C:\\Program Files\\Mozilla Thunderbird\\thunderbird.exe"`
- 프로필 분리: 일상 설정에 영향을 주지 않도록 개발에는 별도의 Thunderbird 프로필을 사용하세요.

---

### Make 타깃(알파벳순) {#make-targets-alphabetical}

Makefile은 일반적인 개발 흐름을 표준화합니다. 모든 타깃의 한 줄 요약은 언제든 `make help`을(를) 실행해 확인하세요.

팁: 타깃 없이 `make`을(를) 실행하면 간단한 Whiptail 메뉴가 열려 타깃을 선택할 수 있습니다.

| Target                                                   | 한 줄 설명                                                                               |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`clean`](#mt-clean)                                     | 로컬 빌드/미리보기 산출물 제거(tmp/, web-local-preview/, website/build/).                |
| [`commit`](#mt-commit)                                   | 포맷팅, 테스트(i18n 포함) 실행, 변경 로그 업데이트, 커밋 및 푸시.                        |
| [`eslint`](#mt-eslint)                                   | 플랫 구성(`npm run -s lint:eslint`)으로 ESLint 실행.                                     |
| [`help`](#mt-help)                                       | 모든 타깃을 한 줄 설명과 함께 나열(정렬됨).                                              |
| [`lint`](#mt-lint)                                       | `sources/`에서 web‑ext lint(임시 매니페스트; ZIP 무시; 비치명적).                        |
| [`menu`](#mt-menu)                                       | 대화형 메뉴로 타깃과 선택적 인자를 선택.                                                 |
| [`pack`](#mt-pack)                                       | ATN 및 LOCAL ZIP 빌드(린터 실행; 패커 스크립트 호출).                                    |
| [`prettier`](#mt-prettier)                               | 저장소를 제자리 포맷(변경 사항 기록).                                                    |
| [`prettier_check`](#mt-prettier_check)                   | Prettier 체크 모드(쓰기 없음); 재포맷이 필요하면 실패.                                   |
| [`prettier_write`](#mt-prettier_write)                   | `prettier`의 별칭.                                                                       |
| [`test`](#mt-test)                                       | Prettier(쓰기), ESLint, 그 다음 Vitest(구성 시 커버리지).                                |
| [`test_i18n`](#mt-test_i18n)                             | i18n 전용 테스트: 애드온 플레이스홀더/동등성 + 웹사이트 동등성.                          |
| [`translate_app`](#mt-translation-app)                   | `translation_app`의 별칭.                                                                |
| [`translation_app`](#mt-translation-app)                 | `sources/_locales/en/messages.json`에서 앱 UI 문자열 번역.                               |
| [`translate_web_docs_batch`](#mt-translation-web)        | OpenAI 배치 API로 웹사이트 문서 번역(권장).                                              |
| [`translate_web_docs_sync`](#mt-translation-web)         | 동기식으로 웹사이트 문서 번역(레거시, 배치 아님).                                        |
| [`translate_web_index`](#mt-translation_web_index)       | `translation_web_index`의 별칭.                                                          |
| [`translation_web_index`](#mt-translation_web_index)     | 홈페이지/네비게이션 바/푸터 UI 번역(`website/i18n/en/code.json → .../<lang>/code.json`). |
| [`web_build`](#mt-web_build)                             | 문서를 `website/build`로 빌드(`--locales` / `BUILD_LOCALES` 지원).                       |
| [`web_build_linkcheck`](#mt-web_build_linkcheck)         | 오프라인 안전 링크 검사(원격 HTTP[S] 건너뜀).                                            |
| [`web_build_local_preview`](#mt-web_build_local_preview) | 로컬 gh‑pages 미리보기; 8080–8090에서 자동 제공; 선택적 테스트/링크 검사.                |
| [`web_push_github`](#mt-web_push_github)                 | `website/build`를 `gh-pages` 브랜치로 푸시.                                              |

옵션 문법

- 옵션을 전달하려면 `make <command> OPTS="…"`을(를) 사용하세요(따옴표 권장). 아래 각 타깃은 사용 예를 보여줍니다.

--

-

#### 로케일 빌드 팁 {#locale-build-tips}

- 일부 로케일만 빌드: `BUILD_LOCALES="en de"`을(를) 설정하거나 `OPTS="--locales en,de"`을(를) 웹 타깃에 전달하세요.
- 특정 로케일 미리보기: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/de/`.

---

### 빌드 및 패키징 {#build-and-package}

- ZIP 빌드: `make pack`
- 리포지토리 루트에 ATN 및 LOCAL ZIP을 생성합니다(산출물을 수동으로 편집하지 마세요)
- 팁: 패키징 전에 `sources/manifest_ATN.json`와 `sources/manifest_LOCAL.json` 두 곳의 버전을 업데이트하세요
- 수동 설치(개발): Thunderbird → 도구 → 부가 기능 및 테마 → 톱니바퀴 → 파일에서 부가 기능 설치… → 빌드된 ZIP 선택

---

### 테스트 {#test}

- 전체 스위트: `make test`(Vitest)
- 커버리지(선택):
- `npm i -D @vitest/coverage-v8`
- `make test`를 실행; HTML 보고서는 `coverage/index.html`를 엽니다
- i18n 전용: `make test_i18n`(UI 키/플레이스홀더/타이틀 + 웹사이트의 로케일별 문서 동등성(id/title/sidebar_label 검사 포함))

---

### 디버깅 및 로그 {#debugging-and-logs}

- 오류 콘솔: 도구 → 개발자 도구 → 오류 콘솔
- 런타임에 상세 로그 전환:
- 활성화: `messenger.storage.local.set({ debug: true })`
- 비활성화: `messenger.storage.local.set({ debug: false })`
- 답장을 작성/전송하는 동안 로그가 표시됩니다

---

### 문서(웹사이트) {#docs-website}

- 개발 서버: `cd website && npm run start`
- 정적 사이트 빌드: `cd website && npm run build`
- Make 동등 명령(알파벳순): `make web_build`, `make web_build_linkcheck`, `make web_build_local_preview`, `make web_push_github`
- 사용 예:
- 영어만, 테스트/링크 검사 생략, 푸시 안 함: `make web_build_local_preview OPTS="--locales en --no-test --no-link-check --dry-run"`
- 모든 로케일, 테스트/링크 검사 포함, 이후 푸시: `make web_build_local_preview && make web_push_github`
- 게시 전, 오프라인 안전 링크 검사를 실행하세요: `make web_build_linkcheck`.
- i18n: 영어는 `website/docs/*.md`에, 독일어 번역은 `website/i18n/de/docusaurus-plugin-content-docs/current/*.md`에 있습니다
- 검색: CI에서 Algolia DocSearch 환경 변수가 설정되어 있으면(`DOCSEARCH_APP_ID`, `DOCSEARCH_API_KEY`, `DOCSEARCH_INDEX_NAME`), 사이트는 Algolia 검색을 사용합니다. 그렇지 않으면 로컬 검색으로 폴백합니다. 홈페이지에서 `/` 또는 `Ctrl+K`를 눌러 검색 상자를 여세요.

---

#### 기부 리디렉트 경로 {#donate-redirect}

- `website/src/pages/donate.js`
- 경로: `/donate`(및 `/<locale>/donate`)
- 동작:
- 현재 라우트에 로케일이 있으면(예: `/de/donate`), 해당 로케일을 사용
- 그렇지 않으면 `navigator.languages`과(와) 구성된 로케일을 비교해 최적 일치를 선택; 기본 로케일로 폴백
- 리디렉트 대상:
- `en` → `/docs/donation`
- 기타 → `/<locale>/docs/donation`
- 적절한 baseUrl 처리를 위해 `useBaseUrl` 사용
- 폴백으로 메타 리프레시 + `noscript` 링크 포함

---

---

#### 미리보기 팁 {#preview-tips}

- Node 미리보기를 정상 종료: `Local server started` 후에 출력되는 `http://localhost:<port>/__stop`를 엽니다.
- MDX/JSX에서 이미지가 로드되지 않으면 사이트 `baseUrl`을(를) 준수하도록 `useBaseUrl('/img/...')`를 사용하세요.
- 미리보기가 먼저 시작되며, 링크 검사는 그 이후 비차단으로 실행됩니다(깨진 외부 링크는 미리보기를 중단하지 않음).
- 예시 미리보기 URL: `http://localhost:<port>/Thunderbird-Reply-with-Attachments/`("Local server started" 이후에 출력됨).
- 링크 검사에서의 외부 링크: 일부 외부 사이트(예: addons.thunderbird.net)는 자동 크롤러를 차단하여 링크 검사에서 403이 표시될 수 있습니다. 미리보기는 여전히 시작되며, 이는 무시해도 안전합니다.

---

#### 웹사이트 번역 {#translate-website}

번역 가능한 항목

- 웹사이트 UI만: 홈페이지, 네비게이션 바, 푸터 및 기타 UI 문자열. 문서 콘텐츠는 현재 영어 전용입니다.

편집 위치

- `website/i18n/<locale>/code.json`를 편집(`en`를 참고). `{year}`, `{slash}`, `{ctrl}`, `{k}`, `{code1}` 같은 플레이스홀더는 변경하지 마세요.

파일 생성 또는 새로 고침

- 모든 로케일에 대해 누락된 스텁 생성: `npm --prefix website run i18n:stubs`
- 영어에서 스텁 덮어쓰기(새 문자열 추가 후): `npm --prefix website run i18n:stubs:force`
- 단일 로케일용 대안: `npx --prefix website docusaurus write-translations --locale <locale>`

홈페이지/네비게이션 바/푸터 UI 문자열 번역(OpenAI)

- 자격 증명 1회 설정(쉘 또는 .env):
- `export OPENAI_API_KEY=sk-...`
- 선택 사항: `export OPENAI_MODEL=gpt-4o-mini`
- 원샷(모든 로케일, en 제외): `make translate_web_index`
- 특정 로케일로 제한: `make translate_web_index OPTS="--locales de,fr"`
- 기존 값 덮어쓰기: `make translate_web_index OPTS="--force"`

검증 및 재시도

- 번역 스크립트는 JSON 구조를 검증하고, 중괄호 플레이스홀더를 보존하며, URL이 변경되지 않도록 보장합니다.
- 검증 실패 시 기존 값을 유지하기 전에 피드백과 함께 최대 2회 재시도합니다.

내 로케일 미리보기

- 개발 서버: `npm --prefix website run start`
- `http://localhost:3000/<locale>/Thunderbird-Reply-with-Attachments/` 방문

제출

- 편집된 `code.json` 파일로 PR을 열어주세요. 변경 사항은 집중적으로 유지하고 가능하면 빠른 스크린샷을 포함하세요.

---

### 보안 및 구성 팁 {#security-and-configuration-tips}

- `sources/manifest.json`를 커밋하지 마세요(빌드에서 일시적으로 생성됨)
- 업데이트 채널을 유지하려면 `browser_specific_settings.gecko.id`을(를) 안정적으로 유지하세요

---

### 설정 지속성 {#settings-persistence}

- 저장소: 모든 사용자 설정은 `storage.local`에 저장되며 애드온 업데이트 간에 유지됩니다.
- 설치: 키가 엄격히 누락(undefined)된 경우에만 기본값이 적용됩니다.
- 업데이트: 마이그레이션은 누락된 키만 채우며 기존 값은 절대 덮어쓰지 않습니다.
- 스키마 마커: `settingsVersion`(현재 `1`).
- 키와 기본값:
- `blacklistPatterns: string[]` → `['*intern*', '*secret*', '*passwor*']`
- `confirmBeforeAdd: boolean` → `false`
- `confirmDefaultChoice: 'yes'|'no'` → `'yes'`
- `warnOnBlacklistExcluded: boolean` → `true`
- 코드: `sources/background.js` → `initializeOrMigrateSettings()` 및 `SCHEMA_VERSION` 참조.

개발 워크플로(새 설정 추가)

- `sources/background.js`에서 `SCHEMA_VERSION`를 증가시키세요.
- `initializeOrMigrateSettings()`의 `DEFAULTS` 객체에 새 키와 기본값을 추가하세요.
- 기본값 시드 시 "undefined인 경우에만" 규칙을 사용하고 기존 값을 덮어쓰지 마세요.
- 설정이 사용자에게 표시된다면 `sources/options.js`에 연결하고 지역화 문자열을 추가하세요.
- 테스트 추가/조정(`tests/background.settings.migration.test.js` 참조).

수동 테스트 팁

- 새 설치 시뮬레이션: 확장 프로그램의 데이터 디렉터리를 지우거나 새 프로필로 시작하세요.
- 업데이트 시뮬레이션: `storage.local`에서 `settingsVersion`를 `0`로 설정하고 다시 로드하세요. 기존 값은 변경되지 않고 누락된 키만 추가되는지 확인하세요.

---

### 문제 해결 {#troubleshooting}

- Thunderbird가 128 ESR 이상인지 확인
- 런타임 문제에는 오류 콘솔 사용
- 저장된 설정이 제대로 적용되지 않는 것 같다면 Thunderbird를 재시작한 뒤 다시 시도하세요. (Thunderbird는 세션 간 상태를 캐시할 수 있으며, 재시작하면 최신 설정이 로드됩니다.)

---

### CI 및 커버리지 {#ci-and-coverage}

- GitHub Actions(`CI — Tests`)는 커버리지 임계값(라인/함수/분기/문장 85%)으로 vitest를 실행합니다. 임계값을 충족하지 못하면 작업이 실패합니다.
- 워크플로는 HTML 보고서를 포함한 아티팩트 `coverage-html`를 업로드합니다. 실행 페이지에서 다운로드하세요(Actions → 최신 실행 → Artifacts).

---

### 기여 {#contributing}

- 브랜치/커밋/PR 지침은 CONTRIBUTING.md를 참고하세요
- 팁: 일상 프로필에 영향을 주지 않도록 테스트용 별도 Thunderbird 개발 프로필을 만드세요.

---

### 번역

- 대규모 “전체 → 전체” 번역 작업은 느리고 비용이 많이 들 수 있습니다. 일부(예: 몇 개 문서와 1–2개 로케일)로 시작하여 결과를 검토한 뒤 확장하세요.

---

- 재시도 정책: 번역 작업은 API 오류 시 최대 3회 지수 백오프로 재시도합니다. `scripts/translate_web_docs_batch.js` 및 `scripts/translate_web_docs_sync.js`를 참조하세요.

문서용 스크린샷

- 이미지는 `website/static/img/` 아래에 저장하세요.
- 사이트 `baseUrl`와 호환되도록 MD/MDX에서 `useBaseUrl('/img/<filename>')`로 참조하세요.
- `website/static/img/` 아래에서 이미지를 추가하거나 이름을 바꾼 후 모든 참조가 여전히 `useBaseUrl('/img/…')`를 사용하고 로컬 미리보기에서 렌더링되는지 확인하세요.
  파비콘

- 다중 크기 `favicon.ico`은 `website/scripts/build-favicon.mjs`을 통해 모든 빌드 경로(Make + 스크립트)에서 자동으로 생성됩니다.
- 수동 단계는 필요 없습니다. `icon-*.png`만 업데이트하면 됩니다.
  검토 팁

- 번역된 문서에서는 프런트매터 `id`를 변경하지 말고, 있을 경우 `title`와 `sidebar_label`만 번역하세요.

#### clean {#mt-clean}

- 목적: 로컬 빌드/미리보기 산출물을 제거합니다.
- 사용법: `make clean`
- 제거 대상(있다면):
- `tmp/`
- `web-local-preview/`
- `website/build/`

---

#### commit {#mt-commit}

- 목적: 포맷팅, 테스트, 변경 로그 업데이트, 커밋 및 푸시.
- 사용법: `make commit`
- 상세: Prettier(쓰기), `make test`, `make test_i18n`를 실행합니다. 스테이징된 변경이 있으면 변경 로그를 추가하고, `origin/<branch>`로 푸시합니다.

---

#### eslint {#mt-eslint}

- 목적: 플랫 구성으로 ESLint 실행.
- 사용법: `make eslint`

---

#### help {#mt-help}

- 목적: 모든 타깃을 한 줄 설명과 함께 나열.
- 사용법: `make help`

---

#### lint {#mt-lint}

- 목적: `web-ext`를 사용해 MailExtension을 린트합니다.
- 사용법: `make lint`
- 참고: `sources/manifest_LOCAL.json` → `sources/manifest.json` 임시 복사; 빌드된 ZIP은 무시; 경고는 파이프라인 실패로 간주하지 않음.

---

#### menu {#mt-menu}

- 목적: Make 타깃과 선택적 인자를 선택하는 대화형 메뉴.
- 사용법: 인자 없이 `make`을(를) 실행하세요.
- 참고: `whiptail`을(를) 사용할 수 없으면 메뉴는 `make help`로 폴백합니다.

---

#### pack {#mt-pack}

- 목적: ATN 및 LOCAL ZIP 빌드(`lint`에 의존).
- 사용법: `make pack`
- 팁: 패키징 전에 `sources/manifest_*.json` 두 곳의 버전을 올리세요.

---

#### prettier {#mt-prettier}

- 목적: 저장소를 제자리 포맷.
- 사용법: `make prettier`

#### prettier_check {#mt-prettier_check}

- 목적: 포맷 검증(쓰기 없음).
- 사용법: `make prettier_check`

#### prettier_write {#mt-prettier_write}

- 목적: `prettier`의 별칭.
- 사용법: `make prettier_write`

---

#### test {#mt-test}

- 목적: Prettier(쓰기), ESLint, 이후 Vitest(설치 시 커버리지) 실행.
- 사용법: `make test`

#### test_i18n {#mt-test_i18n}

- 목적: 애드온 문자열과 웹사이트 문서를 위한 i18n 중심 테스트.
- 사용법: `make test_i18n`
- 실행 항목: `npm run test:i18n` 및 `npm run -s test:website-i18n`.

---

#### translate_app / translation_app {#mt-translation-app}

- 목적: EN에서 다른 로케일로 애드온 UI 문자열 번역.
- 사용법: `make translation_app OPTS="--locales all|de,fr"`
- 참고: 키 구조와 플레이스홀더를 보존합니다. 로그는 `translation_app.log`에 남습니다. 스크립트 형태: `node scripts/translate_app.js --locales …`.

#### translate_web_docs_batch / translate_web_docs_sync {#mt-translation-web}

- 목적: 웹사이트 문서를 `website/docs/*.md`에서 `website/i18n/<locale>/...`로 번역.
- 권장: `translate_web_docs_batch`(OpenAI 배치 API)
  - 사용법(플래그): `make translate_web_docs_batch OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - 레거시 위치 인자도 여전히 허용: `OPTS="<doc|all> <lang|all>"`
- 동작: JSONL을 빌드하고, 업로드 후 30초마다 폴링, 결과 다운로드, 파일 기록.
- 참고: 배치 작업은 OpenAI의 배치 윈도에 따라 완료까지 최대 24시간 걸릴 수 있습니다. 콘솔은 각 폴에서 경과 시간을 표시합니다.
- 환경: `OPENAI_API_KEY`(필수), 선택 `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, `OPENAI_BATCH_WINDOW`(기본 24h), `BATCH_POLL_INTERVAL_MS`.
- 레거시: `translate_web_docs_sync`
  - 사용법(플래그): `make translate_web_docs_sync OPTS="--files <doc1,doc2|all> --locales <lang1,lang2|all>"`
  - 레거시 위치 인자도 여전히 허용: `OPTS="<doc|all> <lang|all>"`
- 동작: 쌍별 동기식 요청(배치 집계 없음).
- 참고: `OPTS`이(가) 생략되면 대화형 프롬프트가 표시됩니다. 두 모드 모두 코드 블록/인라인 코드를 보존하고 프런트매터 `id`을(를) 변경하지 않습니다. 로그는 `translation_web_batch.log`(배치) 또는 `translation_web_sync.log`(동기)에 기록됩니다.

---

#### translate_web_index / translation_web_index {#mt-translation_web_index}

- 목적: `website/i18n/en/code.json`에서 `website/i18n/<locale>/code.json` 아래의 모든 로케일(단, `en` 제외)로 웹사이트 UI 문자열(홈페이지, 네비게이션 바, 푸터)을 번역.
- 사용법: `make translate_web_index` 또는 `make translate_web_index OPTS="--locales de,fr [--force]"`
- 요구사항: `OPENAI_API_KEY` 내보내기(선택: `OPENAI_MODEL=gpt-4o-mini`).
- 동작: JSON 구조를 검증하고, 중괄호 플레이스홀더를 보존하며, URL을 변경하지 않습니다. 검증 오류 시 피드백과 함께 재시도합니다.

---

#### web_build {#mt-web_build}

- 목적: 문서 사이트를 `website/build`로 빌드.
- 사용법: `make web_build OPTS="--locales en|de,en|all"`(또는 `BUILD_LOCALES="en de"` 설정)
- 내부: `node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build [--locale …]`.
- 의존성: `website/node_modules/@docusaurus`이(가) 없으면 `website/`에서 `npm ci`을(를) 실행합니다.

#### web_build_linkcheck {#mt-web_build_linkcheck}

- 목적: 오프라인 안전 링크 검사.
- 사용법: `make web_build_linkcheck OPTS="--locales en|all"`
- 참고: `tmp_linkcheck_web_pages`에 빌드; GH Pages `baseUrl`를 `/`로 재작성; 원격 HTTP(S) 링크는 건너뜀.

#### web_build_local_preview {#mt-web_build_local_preview}

- 목적: 선택적 테스트/링크 검사가 포함된 로컬 gh‑pages 미리보기.
- 사용법: `make web_build_local_preview OPTS="--locales en|all [--no-test] [--no-link-check] [--dry-run] [--no-serve]"`
- 동작: 먼저 Node 미리보기 서버를 시도(`scripts/preview-server.mjs`, `/__stop` 지원), 실패 시 `python3 -m http.server`로 폴백; 8080–8090에서 제공; PID는 `web-local-preview/.server.pid`에 저장.

#### web_push_github {#mt-web_push_github}

- 목적: `website/build`를 `gh-pages` 브랜치로 푸시.
- 사용법: `make web_push_github`

팁: Makefile에서 사용하는 패키지 관리자를 재정의하려면 `NPM=…`을(를) 설정하세요(기본값은 `npm`).
