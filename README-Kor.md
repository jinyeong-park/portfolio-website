# 💻 Portfolio Website 개발 기록

이 문서는 `Next.js`와 `Claude Code`를 활용하여 포트폴리오 웹사이트를 구축한 과정을 기록한 가이드입니다.

---

## 🛠️ 프로젝트 사용 명령어 (Used Commands)

### 1. Next.js 프로젝트 생성

프로젝트를 생성할 디렉토리 터미널에서 아래 명령어를 실행합니다.
npx create-next-app@latest .

### 2. Skills 설치 (skills.sh)

[skills.sh](https://www.skills.sh/?q=next)에 접속하여 Next.js 관련 스킬셋을 다운로드하고, 연동 도구로 **Claude Code**를 선택합니다.

- **`next-best-practices` 스킬 추가**
  npx skills add [https://github.com/vercel-labs/next-skills](https://github.com/vercel-labs/next-skills) --skill next-best-practices
- **`frontend-design` 스킬 추가**
  npx skills add [https://github.com/anthropics/skills](https://github.com/anthropics/skills) --skill frontend-design

### 3. AI 협업 환경 설정

터미널에서 Claude를 실행한 뒤, `Shift + Tab`을 눌러 모드를 전환합니다.

- **설정 모드:** `plan mode on`으로 변경

---

## 🚀 기능 구현 단계 (Features)

### 📂 기본 환경 세팅

1. 프로젝트 루트 디렉토리에 `resources` 폴더와 `resources/prompts` 폴더를 생성합니다.
2. 본인의 프로필 사진을 `public/me.png` 경로에 저장합니다.

### 1단계: 기본 기능 구현 (Basic Feature)

`01-research-and-build.md` 파일의 프롬프트 내용을 복사한 뒤, 본인의 인적 사항을 채워 Claude에게 전달합니다.

> 📝 **내 정보 입력 예시:**
> "My name is Jenny Park. My LinkedIn: [https://www.linkedin.com/in/jennypark7/](https://www.linkedin.com/in/jennypark7/), My GitHub: [https://github.com/jinyeong-park?tab=repositories](https://github.com/jinyeong-park?tab=repositories). Currently working on jynlab.com and admade.com. Location: San Jose, CA. Email: byjennypark@gmail.com"

- **확인:** 빌드가 완료되면 `localhost`에서 정상적으로 출력되는지 확인합니다.

### 2단계: 애니메이션 효과 추가 (Animation Feature)

기본 레이아웃이 마음에 든다면, 애니메이션을 추가하여 완성도를 높입니다.

- `resources/prompts/02-streaming-and-reveal.md` 파일의 프롬프트를 복사하여 Claude에게 요청합니다.
- **확인:** `localhost`에서 스트리밍 및 리빌(Reveal) 애니메이션이 잘 작동하는지 확인합니다.

### 3단계: Q&A 기능 추가 (Chat Q&A Feature)

방문자와 소통할 수 있는 대화형 컴포넌트를 추가합니다.

- `resources/prompts/03-chat-qa.md` 파일의 프롬프트를 복사하여 Claude에게 요청합니다.
- **확인:** 최종적으로 `localhost`에서 Q&A 기능이 인터랙티브하게 작동하는지 테스트합니다.



### 배포 방법                                     
                                                            
❯ 1. jinyeong-park.github.io
    루트 GitHub Pages — 리포지토리 이름을 jinyeong-park.github.io로 바꿔야 합니다. 가장 깔끔한 URL.
  2. jinyeong-park.github.io/portfolio-website
    현재 리포지토리 이름 그대로 사용. 리포 이름 변경 없이 바로 배포 가능.                          
  3. 커스텀 도메인 (e.g. jynlab.com)                              
    커스텀 도메인 연결. CNAME 파일 추가 + DNS 설정 필요.
