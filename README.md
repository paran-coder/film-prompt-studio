# Film Prompt Studio v5

필름 감성, 렌즈, 구도, 앵글, 조명, 필름 효과를 조합해 Midjourney 8.1 / GPT Image / Universal 이미지 프롬프트를 생성하는 순수 HTML/CSS/JavaScript 정적 웹앱입니다.

## 포함 페이지

- `index.html` — 랜딩 페이지와 Quick Builder
- `builder.html` — 실시간 프롬프트 생성기
- `presets.html` — 30개 프리셋 라이브러리
- `gallery.html` — 예시 프롬프트 갤러리
- `workspace.html` — localStorage 기반 저장소

## v5 변경 사항

- QA 안정화: 모든 페이지의 메타 태그, favicon, OG 이미지, 경로 구조 정리
- 모바일 사용성 보강: 하단 고정 버튼, 입력 폰트 크기, 탭/카드 1열 흐름 개선
- 접근성 보강: 본문 건너뛰기 링크, focus-visible 스타일, Escape 메뉴 닫기
- Midjourney 8.1 문장 다듬기 개선: 첫 문장 피사체 우선, 장소 전치사 보정, 불필요한 무드 디테일 자동 삽입 방지
- 저장소 키 `film_prompt_studio_saved_prompts_v5` 적용 및 v4/구버전 저장 데이터 마이그레이션
- 배포 준비용 `assets/favicon.svg`, `assets/og-image.svg` 추가

## 실행

```bash
cd film-prompt-studio
python3 -m http.server 8000
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:8000
```

## 배포

정적 파일만 사용하므로 Netlify, GitHub Pages, Vercel 정적 배포에 바로 올릴 수 있습니다.

### Netlify

1. `film-prompt-studio` 폴더를 Netlify Drop에 업로드합니다.
2. 별도 빌드 명령은 필요 없습니다.
3. Publish directory는 루트 폴더입니다.

### GitHub Pages

1. 저장소 루트에 파일을 업로드합니다.
2. Repository Settings → Pages → Deploy from branch를 선택합니다.
3. Branch와 root를 선택해 배포합니다.

## 저장 방식

현재 버전은 로그인 없이 브라우저 `localStorage`에 저장합니다. 브라우저 데이터를 지우면 저장 내용도 삭제됩니다. Workspace에서 JSON 내보내기를 사용하면 저장 프롬프트를 백업할 수 있습니다.

## 핵심 프롬프트 원칙

Midjourney 8.1 출력은 다음 구조를 지향합니다.

```text
[Main subject].
[Visible detail or action].
[Foreground].
[Background].
[Style, lens, angle, composition, lighting, effects].
--ar [ratio] --raw --v 8.1
```



## v9 update

Presets, Gallery, Workspace 상단 Hero를 Builder 페이지와 같은 좌측 메인 카피 / 우측 서브 카피 구조로 통일했습니다. 상단 액션 버튼은 Hero 카피 영역 밖으로 분리해 간격과 줄바꿈 리듬을 정리했습니다.

## v11 note
- `index.html`은 v3 기준 레이아웃/내용으로 복구했습니다.
- v10에서 누락되었던 `assets/images`와 `js` 폴더를 포함했습니다.
- Presets / Gallery / Workspace 수정은 유지했습니다.
