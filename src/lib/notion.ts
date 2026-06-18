/**
 * Notion API 클라이언트 싱글턴 및 데이터 조회 함수
 *
 * 환경변수 (.env.local):
 *   NOTION_API_KEY      — Notion Integration API 키
 *   NOTION_DATABASE_ID  — 설교 데이터베이스 ID
 */

import { cache } from "react"
import { Client, isFullPage } from "@notionhq/client"
import type { AudioFile, Post, PostSummary, NotionBlock } from "./types"

/** Notion 데이터베이스 ID */
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

// Notion DB 컬럼명 — 실제 DB 설정과 일치
const PROP = {
  title: "제목",
  category: "성경본문",
  chapter: "장",
  startVerse: "시작절",
  endVerse: "종료절",
  publishedAt: "설교일자",
  status: "상태",
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePostSummary(page: any): PostSummary {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = page.properties as Record<string, any>

  const titleArr: Array<{ plain_text: string }> = props[PROP.title]?.title ?? []
  const title = titleArr[0]?.plain_text ?? ""

  const categoryMultiSelect: Array<{ name: string }> = props[PROP.category]?.multi_select ?? []
  const category: string = categoryMultiSelect[0]?.name ?? ""
  const tags: string[] = categoryMultiSelect.map((t) => t.name)
  const chapter: number = props[PROP.chapter]?.number ?? 0
  const startVerse: number = props[PROP.startVerse]?.number ?? 0
  const endVerse: number = props[PROP.endVerse]?.number ?? 0
  const publishedAt: string = props[PROP.publishedAt]?.date?.start ?? page.created_time
  const status = (props[PROP.status]?.status?.name ?? "미등록") as Post["status"]

  return { id: page.id, title, category, chapter, startVerse, endVerse, tags, publishedAt, status }
}

/** 등록완료 상태의 설교 목록 조회 (최신순) — cache()로 동일 요청 내 중복 호출 방지 */
export const getPosts = cache(async function getPosts(): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: { property: PROP.status, status: { equals: "등록완료" } },
    sorts: [{ property: PROP.publishedAt, direction: "descending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
})

/** 페이지네이션을 처리하여 모든 하위 블록 조회 */
async function getAllBlocks(notion: Client, blockId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...(response.results as NotionBlock[]))
    cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined
  } while (cursor)

  return blocks
}

/** 단일 설교 조회 (본문 블록 포함) — 없으면 null */
export const getPost = cache(async function getPost(id: string): Promise<Post | null> {
  const notion = tryGetClient()
  if (!notion) return null

  try {
    const [page, content] = await Promise.all([
      notion.pages.retrieve({ page_id: id }),
      getAllBlocks(notion, id),
    ])

    if (!isFullPage(page)) return null

    const summary = parsePostSummary(page)

    return { ...summary, content }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[notion] getPost 오류:", id, error)
    }
    return null
  }
})

/** 성경본문(카테고리)별 설교 목록 조회 */
export async function getPostsByCategory(category: string): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        { property: PROP.status, status: { equals: "등록완료" } },
        { property: PROP.category, multi_select: { contains: category } },
      ],
    },
    sorts: [{ property: PROP.publishedAt, direction: "descending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
}

/** content 블록 배열에서 audio 블록을 AudioFile 목록으로 추출 */
export function extractAudioBlocks(blocks: NotionBlock[], postId: string): AudioFile[] {
  return blocks
    .filter((b) => b.type === "audio")
    .map((b) => {
      const audio = b.audio
      const isFile = audio?.type === "file"
      return {
        id: b.id,
        postId,
        url: isFile ? audio.file.url : (audio?.external?.url ?? ""),
        name: audio?.caption?.[0]?.plain_text ?? "설교 음성",
        expiresAt: isFile ? new Date(audio.file.expiry_time) : undefined,
      } satisfies AudioFile
    })
    .filter((f) => f.url !== "")
}

/** 발행된 글에서 카테고리별 글 수를 집계 (getPosts 재활용, 추가 API 호출 없음) */
export async function getCategories(): Promise<{ category: string; count: number }[]> {
  const posts = await getPosts()
  const map = new Map<string, number>()
  for (const p of posts) {
    if (p.category) map.set(p.category, (map.get(p.category) ?? 0) + 1)
  }
  return [...map.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}

/** 특정 월(1-based)의 발행된 설교 목록 조회 (발행일 오름차순) */
export async function getPostsByMonth(year: number, month: number): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const mm = String(month).padStart(2, "0")
  const firstDay = `${year}-${mm}-01`
  const lastDayDate = new Date(year, month, 0) // 다음달 0일 = 이번달 마지막날
  const lastDay = `${year}-${mm}-${String(lastDayDate.getDate()).padStart(2, "0")}`

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        { property: PROP.status, status: { equals: "등록완료" } },
        { property: PROP.publishedAt, date: { on_or_after: firstDay } },
        { property: PROP.publishedAt, date: { on_or_before: lastDay } },
      ],
    },
    sorts: [{ property: PROP.publishedAt, direction: "ascending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
}

/** 제목 키워드 검색 */
export async function searchPosts(query: string): Promise<PostSummary[]> {
  const notion = tryGetClient()
  if (!notion || !NOTION_DATABASE_ID) return []

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        { property: PROP.status, status: { equals: "등록완료" } },
        { property: PROP.title, title: { contains: query } },
      ],
    },
    sorts: [{ property: PROP.publishedAt, direction: "descending" }],
  })

  return response.results.filter(isFullPage).map(parsePostSummary)
}
