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

/** 설교 글 (Notion 페이지 매핑) */
export type Post = {
  /** Notion 페이지 ID */
  id: string
  /** 설교 제목 */
  title: string
  /** 성경 책 카테고리 (select 필드) */
  category: string
  /** 태그 목록 (multi_select 필드) */
  tags: string[]
  /** 발행일 */
  publishedAt: Date
  /** 글 상태: 초안 | 발행됨 */
  status: "초안" | "발행됨"
  /** 페이지 본문 블록 배열 */
  content: NotionBlock[]
}

/** 음성파일 첨부 (Notion 첨부파일 매핑) */
export type AudioFile = {
  /** 첨부파일 식별자 */
  id: string
  /** 연결된 글 ID */
  postId: string
  /** 음성파일 URL (Notion 임시 URL) */
  url: string
  /** 파일명 */
  name: string
  /** Notion 임시 URL 만료 시각 */
  expiresAt: Date
}

/** 홈/목록 페이지용 요약 타입 (content 제외) */
export type PostSummary = Omit<Post, "content">
