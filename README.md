# 교회 설교 아카이브

Notion을 CMS로 활용하여 교회 설교 음성파일을 아카이빙하는 블로그입니다. 성도들이 언제든 설교를 다시 들을 수 있도록 제공합니다.

## 프로젝트 개요

**목적**: Notion을 CMS로 활용하여 교회 설교 음성파일을 아카이빙하고, 성도들이 언제든 설교를 다시 들을 수 있는 블로그 제공

**사용자**: 교회 설교를 다시 듣거나 찾아보고 싶은 성도 및 외부 방문자

## 주요 페이지

| 경로 | 설명 |
|------|------|
| `/` | 홈 — 최근 발행된 설교 목록 |
| `/posts/[id]` | 글 상세 — 본문 열람 + 음성파일 재생 |
| `/category` | 카테고리 — 성경 책별 설교 필터링 |
| `/calendar` | 달력 — 월별 설교 업로드 날짜 탐색 |
| `/search` | 검색 — 제목/본문 키워드 검색 |

## 핵심 기능

- Notion API로 설교 글 목록 조회 (ISR 캐싱 적용)
- 글에 첨부된 음성파일 브라우저 내 재생
- 성경 책(카테고리)별 설교 필터링
- 월별 달력에 설교 업로드 날짜 표기
- 제목/본문 키워드 검색
- 모바일/태블릿/데스크톱 반응형 레이아웃

## 기술 스택

- **Framework**: Next.js 15 (App Router, ISR)
- **Runtime**: React 19
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **CMS**: Notion API (`@notionhq/client`)
- **Icons**: Lucide React
- **Theme**: next-themes (다크모드 지원)
- **Deployment**: Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Notion SDK 설치

```bash
npm install @notionhq/client
```

### 3. 환경변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local`을 열어 Notion API 키와 데이터베이스 ID를 입력합니다.

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxx
```

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인합니다.

### 빌드

```bash
npm run build
npm run start
```

## 개발 상태

- 기본 프로젝트 구조 설정 완료
- 라우팅 골격 생성 완료 (`/`, `/posts/[id]`, `/category`, `/calendar`, `/search`)
- 공유 타입 정의 완료 (`Post`, `AudioFile`, `NotionBlock`, `PostSummary`)
- Notion 클라이언트 초기화 코드 작성 완료
- Notion API 연동 구현 예정
- 음성 플레이어 컴포넌트 구현 예정
- 달력 컴포넌트 구현 예정

## 문서

- [PRD 문서](./docs/PRD.md) — 상세 요구사항
- [개발 로드맵](./docs/ROADMAP.md) — 개발 계획
- [개발 가이드](./CLAUDE.md) — 개발 지침
