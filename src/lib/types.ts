import type { ReactNode } from "react"

/* ──────────────────────────────────────────
   공통 유틸리티 타입
────────────────────────────────────────── */

export type PropsWithClassName<T = object> = T & {
  className?: string
}

export type RequiredChildren<T = object> = T & {
  children: ReactNode
}

export type Theme = "light" | "dark" | "system"

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error }

/* ──────────────────────────────────────────
   Notion CMS 도메인 타입
────────────────────────────────────────── */

/** Notion 블록 단위 (본문 렌더링용) */
export type NotionBlock = {
  id: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/** 설교 글 상태 (Notion select 필드 값) */
export type PostStatus = "미등록" | "등록완료"

/** 설교 글 (Notion 페이지 매핑) */
export type Post = {
  /** Notion 페이지 ID */
  id: string
  /** 설교 제목 */
  title: string
  /** 성경본문 — 성경 책 이름 (select 필드, 카테고리 필터링에 사용) */
  category: string
  /** 장 */
  chapter: number
  /** 시작절 */
  startVerse: number
  /** 종료절 */
  endVerse: number
  /** 태그 목록 (multi_select 필드, 없으면 빈 배열) */
  tags: string[]
  /** 설교일자 — ISO 8601 문자열 ("2024-06-01") */
  publishedAt: string
  /** 글 상태 */
  status: PostStatus
  /** 페이지 본문 블록 배열 */
  content: NotionBlock[]
}

/** 음성파일 첨부 (Notion 파일 속성 매핑) */
export type AudioFile = {
  /** 첨부파일 식별자 */
  id: string
  /** 연결된 글 ID */
  postId: string
  /** 음성파일 URL */
  url: string
  /** 파일명 */
  name: string
  /** 만료 시각 — Notion 호스팅 파일만 해당; 외부 URL(YouTube 등)은 undefined */
  expiresAt?: Date
}

/** 홈/목록 페이지용 요약 타입 (content 제외) */
export type PostSummary = Omit<Post, "content">
