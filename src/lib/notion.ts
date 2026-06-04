/**
 * Notion API 클라이언트 싱글턴
 *
 * 사용 전 반드시 설치:
 *   npm install @notionhq/client
 *
 * 환경변수 (.env.local):
 *   NOTION_API_KEY      — Notion Integration API 키
 *   NOTION_DATABASE_ID  — 설교 데이터베이스 ID
 */

// @notionhq/client 설치 후 아래 주석을 해제하세요.
// import { Client } from "@notionhq/client"

/** Notion 데이터베이스 ID */
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? ""

/**
 * Notion API 클라이언트를 반환합니다.
 * @notionhq/client 설치 및 NOTION_API_KEY 설정 후 사용 가능합니다.
 */
export function getNotionClient() {
  const apiKey = process.env.NOTION_API_KEY

  if (!apiKey) {
    throw new Error(
      "NOTION_API_KEY 환경변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요."
    )
  }

  // TODO: @notionhq/client 설치 후 아래 주석 해제
  // return new Client({ auth: apiKey })

  throw new Error("@notionhq/client 패키지를 먼저 설치해주세요: npm install @notionhq/client")
}
