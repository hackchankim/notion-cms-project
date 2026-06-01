# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## 주요 명령어

```bash
npm run dev      # 개발 서버 시작 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

테스트 설정은 없음.

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — `@import "tailwindcss"` 방식, config 파일 없음. 테마 변수는 `src/app/globals.css`의 `@theme inline` 블록에서 관리
- **shadcn/ui** (`style: "radix-nova"`) — 컴포넌트는 `src/components/ui/`에 위치. `npx shadcn add <component>`로 추가
- **next-themes** — `ThemeProvider`로 다크모드 지원 (`attribute="class"`)

## 아키텍처

```
src/
  app/          # Next.js App Router 페이지 및 레이아웃
  components/
    ui/         # shadcn/ui 컴포넌트 (직접 수정 가능)
    layout/     # Header, Footer, Container
    theme/      # ThemeProvider, ThemeToggle
    showcase/   # 데모용 컴포넌트 (ContactForm, InteractiveDemo)
  lib/
    constants.ts   # SITE_CONFIG, NAV_ITEMS
    types.ts       # 공유 타입 (AsyncState, PropsWithClassName 등)
    utils.ts       # cn() 유틸리티
    validations.ts # Zod 스키마 (login, register, contact)
  hooks/        # 앱 전용 커스텀 훅만 작성
```

**전역 레이아웃 구조**: `RootLayout` → `ThemeProvider` → `TooltipProvider` → `Header` / `{children}` / `Footer` / `Toaster`

## 훅 규칙

범용 훅(`useLocalStorage`, `useDebounce`, `useMediaQuery` 등)은 `usehooks-ts`에서 import. `src/hooks/`에는 앱 도메인 특화 로직, API 호출, 여러 컴포넌트가 공유하는 비즈니스 로직만 작성.

## 폼 패턴

`react-hook-form` + `@hookform/resolvers/zod` + `src/lib/validations.ts`의 Zod 스키마 조합. 예시: `src/components/showcase/contact-form.tsx`

## 경로 alias

`@/` → `src/` (tsconfig paths 설정)
