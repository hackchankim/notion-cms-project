/**
 * Notion API 클라이언트 싱글턴 및 데이터 조회 함수
 *
 * @notionhq/client v5 기준 — databases.query 대신 dataSources.query 사용
 *
 * 환경변수 (.env.local):
 *   NOTION_API_KEY      — Notion Integration API 키
 *   NOTION_DATABASE_ID  — 설교 데이터베이스 ID (= data_source_id)
 */

import { Client, isFullPage } from "@notionhq/client"
import type { Post, PostSummary, NotionBlock } from "./types"

/** Notion 데이터베이스 ID (v5에서는 data_source_id로 사용) */
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ""

export function getNotionClient() {
  const apiKey = process.env.NOTION_API_KEY

  if (!apiKey) {
    throw new Error(
      "NOTION_API_KEY 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요."
    )
  }

  return new Client({ auth: apiKey })
}

// 환경변수 미설정 시 개발 편의를 위해 null 반환 (throw 대신)
function tryGetClient(): Client | null {
  try {
    return getNotionClient()
  } catch {
    return null
  }
}

// Notion DB 컬럼명 — 실제 DB 설정과 일치해야 함
// TODO: 실제 Notion DB 컬럼명으로 수정 필요
const PROP = {
  title: "이름",
  category: "성경본문",
  chapter: "장",
  startVerse: "시작절",
  endVerse: "종료절",
  tags: "태그",
  publishedAt: "설교일자",
  status: "상태",
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePostSummary(page: any): PostSummary {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = page.properties as Record<string, any>

  const titleArr: Array<{ plain_text: string }> = props[PROP.title]?.title ?? []
  const title = titleArr[0]?.plain_text ?? ""

  const category: string = props[PROP.category]?.select?.name ?? ""
  const chapter: number = props[PROP.chapter]?.number ?? 0
  const startVerse: number = props[PROP.startVerse]?.number ?? 0
  const endVerse: number = props[PROP.endVerse]?.number ?? 0
  const tags: string[] = (props[PROP.tags]?.multi_select ?? []).map(
    (t: { name: string }) => t.name
  )
  const publishedAt: string = props[PROP.publishedAt]?.date?.start ?? page.created_time
  const status = (props[PROP.status]?.select?.name ?? "미등록") as Post["status"]

  return { id: page.id, title, category, chapter, startVerse, endVerse, tags, publishedAt, status }
}

/** 등록완료 상태의 설교 목록 조회 (최신순) */
export async function getPosts(): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const response = await notion.dataSources.query({
    data_source_id: NOTION_DATABASE_ID,
    filter: { property: PROP.status, select: { equals: "등록완료" } },
    sorts: [{ property: PROP.publishedAt, direction: "descending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
}

/** 단일 설교 조회 (본문 블록 포함) — 없으면 null */
export async function getPost(id: string): Promise<Post | null> {
  const notion = tryGetClient()
  if (!notion) return null

  try {
    const [page, blocksResponse] = await Promise.all([
      notion.pages.retrieve({ page_id: id }),
      notion.blocks.children.list({ block_id: id }),
    ])

    if (!isFullPage(page)) return null

    const summary = parsePostSummary(page)
    const content = blocksResponse.results as NotionBlock[]

    return { ...summary, content }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[notion] getPost 오류:", id, error)
    }
    return null
  }
}

/** 성경본문(카테고리)별 설교 목록 조회 */
export async function getPostsByCategory(category: string): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const response = await notion.dataSources.query({
    data_source_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        { property: PROP.status, select: { equals: "등록완료" } },
        { property: PROP.category, select: { equals: category } },
      ],
    },
    sorts: [{ property: PROP.publishedAt, direction: "descending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
}

/** 제목 키워드 검색 */
export async function searchPosts(query: string): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const response = await notion.dataSources.query({
    data_source_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        { property: PROP.status, select: { equals: "등록완료" } },
        { property: PROP.title, title: { contains: query } },
      ],
    },
    sorts: [{ property: PROP.publishedAt, direction: "descending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
}
