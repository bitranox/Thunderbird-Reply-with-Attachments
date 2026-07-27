---
id: changelog
title: '변경 로그'
---

---

## 변경 로그

전체 상세 내역은 저장소의
[GitHub의 CHANGELOG.md](https://github.com/bitranox/Thunderbird-Reply-with-Attachments/blob/master/CHANGELOG.md)를 참조하세요.

- 2.4.0: 발신자가 `Content-ID`를 붙였다는 이유만으로 이미지가 제외되지 않습니다; Thunderbird 자체가 삽입된 이미지를 답장 본문에 유지하므로 "Include inline pictures" 옵션이 제거되었습니다; 링크는 이제 시스템 브라우저에서 열립니다; 답장당 첨부파일 50개 / 100MB 상한이 있으며, 제외된 항목은 모두 보고됩니다.
- 2.3.2: "Include inline pictures"는 답장 본문에 이미지를 base64 데이터 URI로 삽입했습니다(add-ons.thunderbird.net 심사 이후 다시 제거됨; Thunderbird가 자체적으로 이 작업을 수행함); 코드 품질 개선 및 테스트 커버리지 확대.
- 2.3.1: Thunderbird가 백그라운드 이벤트 페이지를 유휴 상태로 전환한 후에도 첨부 파일을 유지합니다; 문제 해결을 위한 타깃형 디버그 훅을 추가.
- 2.3.0: 첨부 파일 중복 제거를 정교화하고 테스트 범위를 확대했으며, AMO 정책을 충족하기 위해 더 이상 필요 없는 권한을 제거했습니다.
- 2.1.0: 상위 100개 언어에 대한 완전한 국제화 지원
- 2.0.0: 모든 기능을 갖춘 버전으로 재작성(영어/독일어)
- 1.0.1: messages.listAttachments()로 전환
- 1.0.0: 초기 릴리스

---

## 날짜 및 채널 {#dates-and-channels}

- ATN 배포는 패키징 후 몇 시간 지연될 수 있습니다.
- LOCAL 빌드는 개발자 테스트용 전용이며 ATN을 통해 배포되지 않습니다.

---
