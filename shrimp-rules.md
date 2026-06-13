# Development Guidelines

> AI Agent 전용 운영 규칙 문서입니다. 일반적인 Next.js/React/TypeScript 지식은 다루지 않습니다.

## 프로젝트 개요

- **이름**: 교회 설교 아카이브 (church-sermon-archive)
- **목적**: Notion을 CMS로 사용해 교회 설교 음성파일을 아카이빙하는 블로그. 상세 요구사항은 `docs/PRD.md`, 단계별 계획은 `docs/ROADMAP.md`.
- **스택**: Next.js 16.2.6(App Router, README/CLAUDE.md상 "15"로 표기) + React 19 + TypeScript + Tailwind v4(설정 파일 없음) + shadcn/ui(`radix-nova`) + `@notionhq/client`.
- **현재 단계**: Phase 1(골격) 완료. 모든 라우트(`/`, `/posts/[id]`, `/category`, `/calendar`, `/search`)는 더미 데이터/TODO 상태이며 `src/lib/notion.ts`는 `@notionhq/client` 미설치 상태의 throw 스텁이다.

## ⚠️ Next.js 버전 차이 — 코드 작성 전 필수 확인

- 이 저장소의 Next.js(16.2.6)는 학습 데이터의 Next.js와 **API/컨벤션이 다를 수 있다**(`AGENTS.md` 참조). App Router 데이터 페칭, 캐싱/ISR, `params`/`searchParams`, 라우트 세그먼트 설정과 관련된 코드를 작성하기 전 `node_modules/next/dist/docs/01-app/` 의 해당 문서를 먼저 읽는다.
- ISR/캐싱 작업 시 특히 다음을 확인한다:
  - `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/02-route-segment-config/`
- `next.config.ts`에는 `cacheComponents`가 설정되어 있지 않다 (Cache Components 비활성 = "Previous Model"). 즉 `export const revalidate = <seconds>` 세그먼트 컨벤션이 적용 대상이지만, **변경 전 위 문서로 현재 동작을 재확인**한다. `cacheComponents`를 임의로 활성화하지 않는다.
- 기존 페이지(`src/app/posts/[id]/page.tsx`, `src/app/search/page.tsx`)는 이미 `params`/`searchParams`를 `Promise<...>`로 받아 `await`하는 패턴을 따른다. 새 동적 라우트도 동일 패턴을 유지한다.

## 디렉토리 / 파일 배치 규칙

- 경로 alias `@/` → `src/`. 모든 import는 `@/...` 형태를 사용하고 상대경로(`../../`)는 사용하지 않는다 (기존 코드 전체가 이 규칙을 따름).
- 새 페이지: `src/app/<route>/page.tsx`에 생성하고, 정적 라우트는 `export const metadata: Metadata`, 동적 라우트는 `export async function generateMetadata({ params })`를 정의한다(`src/app/category/page.tsx`, `src/app/posts/[id]/page.tsx` 참조).
- **새 페이지를 헤더 내비게이션에 노출해야 한다면** `src/lib/constants.ts`의 `NAV_ITEMS` 배열도 함께 갱신한다. 둘 중 하나만 수정하지 않는다.
- 컴포넌트 배치:
  - 사이트 공통 레이아웃(헤더/푸터/컨테이너) → `src/components/layout/`
  - 테마 관련 → `src/components/theme/`
  - shadcn/ui 컴포넌트 → `src/components/ui/`. 새 shadcn 컴포넌트가 필요하면 `npx shadcn add <component>`로 추가한다(직접 손으로 새 UI 프리미티브를 작성하지 않음). 추가된 컴포넌트는 직접 수정 가능.
  - 설교 글/카테고리/플레이어 등 도메인 전용 컴포넌트는 향후 `src/components/<domain>/` 형태(예: `src/components/post/`)로 새 하위 디렉토리를 만들어 배치한다.

## 데이터 모델 & Notion 연동 규칙

- 공유 타입은 `src/lib/types.ts`에만 정의한다: `Post`, `AudioFile`, `NotionBlock`, `PostSummary`.
  - `PostSummary`는 항상 `Omit<Post, "content">`로 유지한다. `Post`에 필드를 추가/변경하면 `PostSummary`가 자동으로 따라가는지 확인한다(별도로 필드를 중복 선언하지 않음).
  - `Post.status`의 유니온 `"초안" | "발행됨"`은 Notion DB의 select 옵션 라벨과 **문자 그대로 일치**해야 한다. 이 한글 라벨은 데이터 계약이므로 임의로 영문화하거나 값을 바꾸지 않는다.
- Notion API 응답 → `Post`/`PostSummary`/`AudioFile` 변환(파싱) 함수는 `src/lib/notion.ts`에만 작성한다(ROADMAP Phase 2-2). 컴포넌트나 페이지에서 Notion 원본 응답 구조에 직접 접근하지 않는다.
- `src/lib/notion.ts`의 `getNotionClient()`은 현재 throw 스텁이다. `@notionhq/client` 구현 시:
  - `npm install @notionhq/client` 먼저 실행.
  - `NOTION_API_KEY`, `NOTION_DATABASE_ID` 두 환경변수만 사용한다(추가 환경변수가 필요하면 아래 "환경변수" 절을 따른다).
  - 기존의 한글 에러 메시지 톤(`"... 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요."`)을 유지한다.

## 더미 데이터 / TODO 패턴

- `src/app/page.tsx`의 `DUMMY_POSTS` 처럼, Notion 연동 전 더미 데이터를 추가할 때는:
  - 데이터 상단에 `/** 개발 단계 더미 데이터 — Notion 연동 후 제거 */` 형태의 주석을 단다.
  - 실제 데이터 조회 함수는 주석 처리(`// const posts = await getRecentPosts()`)로 남겨 향후 교체 지점을 명시한다.
- Notion 연동 함수(`getPosts`, `getPost`, `getPostsByCategory`, `searchPosts` 등)를 구현하면, 해당 페이지의 더미 데이터·TODO 주석·주석 처리된 import를 **함께 제거**한다(남겨두지 않음).

## 환경변수 규칙

- 현재 정의된 환경변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID` (정의는 `.env.local.example`, 설명은 `CLAUDE.md`의 환경변수 표).
- 새 환경변수를 추가할 경우 다음 3곳을 **모두** 동시에 갱신한다:
  1. `.env.local.example` (키 + 설명 주석)
  2. `CLAUDE.md`의 "환경변수" 표
  3. 실제 코드에서 `process.env.<NAME>` 접근 시 누락 검증(throw) — `src/lib/notion.ts`의 기존 패턴 참고

## 스타일링 / UI 규칙

- Tailwind v4는 `@import "tailwindcss"` 방식이며 **config 파일이 없다**. `tailwind.config.ts`/`tailwind.config.js` 같은 파일을 새로 만들지 않는다.
- 테마(색상/라운드 등) 변경은 오직 `src/app/globals.css`의 `@theme inline`, `:root`, `.dark` 블록에서 수행한다.
- `components.json`의 `style: "radix-nova"`, `baseColor: "neutral"`, `iconLibrary: "lucide"` 등 기존 설정값을 변경하지 않는다(이미 적용된 디자인 시스템과 충돌).
- 조건부 클래스 결합은 항상 `cn()` (`src/lib/utils.ts`, `clsx` + `tailwind-merge`)을 사용한다. 직접 문자열 템플릿으로 클래스를 합치지 않는다.

## 훅(Hooks) 규칙

- `src/hooks/`에는 **도메인 특화 로직 / API 호출을 포함한 데이터 페칭 / 여러 컴포넌트가 공유하는 비즈니스 로직만** 작성한다(`src/hooks/README.md` 참조).
- `useLocalStorage`, `useDebounce`, `useMediaQuery`, `useOnClickOutside`, `useToggle`, `useCopyToClipboard`, `useCountdown`, `useInterval`, `useTimeout`, `useWindowSize` 등 범용 훅은 **재구현하지 말고** `usehooks-ts`에서 import한다.

## PRD 범위 — 구현 금지 항목

`docs/PRD.md`의 "MVP 이후 기능(제외)" 목록에 있는 다음 기능은 별도 지시 없이 **새로 구현하지 않는다**:

- 회원가입 / 로그인
- 댓글 기능
- 좋아요 / 북마크 기능
- 태그(Tags) 기반 필터링 페이지/UI (`tags` 필드 자체는 `Post` 타입에 존재하므로 카드 표시 용도로는 사용 가능하나, 별도 태그 필터 기능은 만들지 않음)
- RSS 피드
- 이메일 구독

> 참고: `ThemeToggle`(다크모드 토글)은 starter kit 기본 기능으로 이미 구현되어 있다. PRD상 "MVP 이후 제외" 항목이지만 기존 코드를 제거하지 않고 유지한다. 단, 이를 MVP 핵심 기능으로 추가 확장하지 않는다.

## 키 파일 동시 수정 규칙

| 변경 대상 | 함께 갱신해야 하는 파일 |
|---|---|
| 최상위 내비게이션에 새 페이지 추가 | `src/app/<route>/page.tsx` + `src/lib/constants.ts` (`NAV_ITEMS`) |
| `Post`/`AudioFile`/`NotionBlock` 필드 추가·변경 | `src/lib/types.ts` + `src/lib/notion.ts`의 파싱 함수 + 해당 타입을 사용하는 페이지/컴포넌트 |
| 새 환경변수 추가 | `.env.local.example` + `CLAUDE.md` 환경변수 표 + 사용 코드의 검증 로직 |
| Notion 연동 함수 구현 완료 | 해당 페이지의 더미 데이터/TODO 주석 제거 |

## AI 의사결정 기준

- Next.js API 사용법이 모호하거나 학습 데이터와 충돌할 가능성이 있으면, 추측하지 말고 `node_modules/next/dist/docs/01-app/`에서 관련 문서를 먼저 찾는다.
- 새 UI 요소가 필요할 때는 먼저 `src/components/ui/`에 이미 존재하는 shadcn 컴포넌트로 구현 가능한지 확인한다. 없다면 `npx shadcn add`로 추가 후 사용한다.
- 컴포넌트/페이지/주석/문서/UI 텍스트는 한국어로 작성하고, 변수명·함수명·타입명은 영어를 사용한다(`CLAUDE.md` 전역 규칙).
