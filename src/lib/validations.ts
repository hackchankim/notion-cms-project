import { z } from "zod"

/* 검색 폼 스키마 */
export const searchSchema = z.object({
  query: z.string().min(1, "검색어를 입력해주세요."),
  scope: z.enum(["title", "content"]).default("title"),
})

export type SearchInput = z.infer<typeof searchSchema>
