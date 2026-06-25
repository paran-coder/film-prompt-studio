# Film Prompt Studio v12

필름 감성, 렌즈, 구도, 앵글, 조명, 필름 효과를 조합해 **Midjourney 8.1 / GPT Image / Universal** 이미지 프롬프트를 생성하는 순수 HTML/CSS/JavaScript 정적 웹앱입니다.

이 버전은 **v11 기준본에 GitHub Pages 배포 준비를 반영한 최신 패키지**입니다. `index.html`은 v3 기준 레이아웃과 내용을 유지하며, 이후 수정 대상에서 제외하는 것을 기준으로 합니다.

## 현재 기준

- 기준 버전: `v12`
- 디자인 기준: `v3 index` 유지
- 기능 기준: `v5 이후 프롬프트 엔진 / 저장 / 프리셋 확장 기능 유지`
- 배포 기준: `GitHub Pages root 배포`

## 포함 페이지

- `index.html` — 랜딩 페이지와 Quick Builder
- `builder.html` — 실시간 프롬프트 생성기
- `presets.html` — 필름 프롬프트 프리셋 라이브러리
- `gallery.html` — 예시 프롬프트 갤러리
- `workspace.html` — localStorage 기반 저장소

## 폴더 구조

```text
film-prompt-studio/
├─ index.html
├─ builder.html
├─ presets.html
├─ gallery.html
├─ workspace.html
├─ README.md
├─ .nojekyll
├─ css/
│  └─ style.css
├─ js/
│  ├─ data.js
│  ├─ engine.js
│  └─ app.js
└─ assets/
   ├─ favicon.svg
   ├─ og-image.svg
   └─ images/
      ├─ angle-guide.jpg
      ├─ composition-guide.png
      ├─ lens-guide.webp
      ├─ mood-guide-1.webp
      └─ mood-guide-2.webp
```

## 최신 변경 사항

### v12

- `README.md`의 오래된 `v5` 표기를 최신 기준으로 정리했습니다.
- GitHub Pages 배포용 `.nojekyll` 파일을 추가했습니다.
- `index.html`은 수정하지 않고 v11 기준 그대로 유지했습니다.
- GitHub 저장소 루트에 바로 업로드할 수 있는 구조로 정리했습니다.

### v11

- `index.html`을 v3 기준 레이아웃과 내용으로 복구했습니다.
- 이미지가 다시 표시되도록 `assets/images` 폴더를 포함했습니다.
- 누락됐던 `js/app.js`, `js/data.js`, `js/engine.js`를 포함했습니다.
- Presets / Gallery / Workspace 수정 사항은 유지했습니다.
- Workspace 본문 디자인은 카드형 관리 화면 구조를 유지했습니다.

### v10 이전 반영 사항

- Presets / Gallery / Workspace 상단 Hero를 Builder 기준의 좌측 메인 카피 / 우측 서브 카피 구조로 정리했습니다.
- Workspace 본문은 좌측 Search 패널 + 우측 Saved Prompts 카드 구조를 유지했습니다.
- Midjourney 8.1 / GPT Image / Universal 3종 프롬프트 출력을 지원합니다.
- localStorage 기반 저장 / 복제 / 삭제 / 즐겨찾기 / JSON 내보내기 기능을 지원합니다.
- 프리셋 라이브러리와 갤러리에서 Builder로 이동해 조합을 재사용할 수 있습니다.

## 실행 방법

로컬에서 확인하려면 프로젝트 폴더에서 아래 명령을 실행합니다.

```bash
python3 -m http.server 8000
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:8000
```

## GitHub Pages 배포 방법

### 1. 저장소 생성

GitHub에서 새 저장소를 만듭니다.

추천 저장소 이름:

```text
film-prompt-studio
```

### 2. 파일 업로드

압축을 풀고, 저장소 루트에 아래 파일과 폴더가 바로 보이도록 업로드합니다.

```text
index.html
builder.html
presets.html
gallery.html
workspace.html
README.md
.nojekyll
css/
js/
assets/
```

주의할 점:

```text
잘못된 구조:
repository/film-prompt-studio-v12/index.html

올바른 구조:
repository/index.html
repository/css/style.css
repository/js/app.js
repository/assets/images/...
```

### 3. GitHub Pages 설정

GitHub 저장소에서 아래 순서로 설정합니다.

```text
Settings → Pages → Source: Deploy from a branch
Branch: main
Folder: / (root)
Save
```

배포 후 주소는 보통 아래 형식입니다.

```text
https://깃허브아이디.github.io/film-prompt-studio/
```

## 터미널 업로드 예시

```bash
git init
git add .
git commit -m "Deploy Film Prompt Studio"
git branch -M main
git remote add origin https://github.com/깃허브아이디/film-prompt-studio.git
git push -u origin main
```

그다음 GitHub에서 Pages를 `main / root`로 설정하면 됩니다.

## 저장 방식

현재 버전은 로그인 없이 브라우저 `localStorage`에 저장합니다. 브라우저 데이터를 지우면 저장 내용도 삭제됩니다. Workspace의 JSON 내보내기를 사용하면 저장 프롬프트를 백업할 수 있습니다.

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

## 수정 기준

앞으로의 수정 기준은 다음과 같습니다.

```text
index.html: 수정 금지, v3 기준 유지
builder.html: 기능/문장 품질 중심 수정 가능
presets.html: 상단 구조와 카드 UX 수정 가능
gallery.html: 갤러리 카드와 필터 UX 수정 가능
workspace.html: 카드형 저장소 구조 유지
css/style.css: 공통 디자인과 반응형 조정 가능
js/: 프롬프트 엔진, 저장, 필터 기능 수정 가능
```
