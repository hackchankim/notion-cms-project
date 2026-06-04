# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

**교회 설교 아카이브**는 Notion을 CMS로 활용하여 교회 설교 음성파일을 아카이빙하는 블로그입니다.

상세 프로젝트 요구사항은 @/docs/PRD.md 참조

## 주요 명령어

```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

테스트 설정은 없음.

## 기술 스택

- **Next.js 15** (App Router, ISR) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — `@import "tailwindcss"` 방식, config 파일 없음. 테마 변수는 `src/app/globals.css`의 `@theme inline` 블록에서 관리
- **shadcn/ui** (`style: "radix-nova"`) — 컴포넌트는 `src/components/ui/`에 위치. `npx shadcn add <component>`로 추가
- **next-themes** — `ThemeProvider`로 다크모드 지원 (`attribute="class"`)
- **@notionhq/client** — Notion API 공식 SDK (설치 필요: `npm install @notionhq/client`)

## 환경변수

`.env.local.example`을 복사하여 `.env.local`을 만들고 값을 채웁니다.

| 변수명 | 설명 |
|--------|------|
| `NOTION_API_KEY` | Notion Integration API 키 |
| `NOTION_DATABASE_ID` | 설교 데이터베이스 ID |

## 아키텍처

```
src/
  app/
    page.tsx              # 홈 — 최근 설교 목록
    posts/[id]/page.tsx   # 글 상세 — 본문 + 음성 재생
    category/page.tsx     # 카테고리(성경 책)별 필터링
    calendar/page.tsx     # 월별 달력 뷰
    search/page.tsx       # 키워드 검색 결과
  components/
    ui/         # shadcn/ui 컴포넌트 (직접 수정 가능)
    layout/     # Header, Footer, Container
    theme/      # ThemeProvider, ThemeToggle
  lib/
    constants.ts   # SITE_CONFIG, NAV_ITEMS
    types.ts       # Post, AudioFile, NotionBlock, 공유 타입
    utils.ts       # cn() 유틸리티
    validations.ts # Zod 스키마 (searchSchema)
    notion.ts      # Notion 클라이언트 싱글턴
  hooks/        # 앱 도메인 특화 커스텀 훅
```

**전역 레이아웃 구조**: `RootLayout` → `ThemeProvider` → `TooltipProvider` → `Header` / `{children}` / `Footer` / `Toaster`

## 데이터 모델

- **Post**: id, title, category, tags, publishedAt, status, content(NotionBlock[])
- **AudioFile**: id, postId, url, name, expiresAt
- **PostSummary**: Post에서 content를 제외한 목록용 타입

## 훅 규칙

범용 훅(`useLocalStorage`, `useDebounce`, `useMediaQuery` 등)은 `usehooks-ts`에서 import. `src/hooks/`에는 앱 도메인 특화 로직, API 호출, 여러 컴포넌트가 공유하는 비즈니스 로직만 작성.

## 경로 alias

`@/` → `src/` (tsconfig paths 설정)
