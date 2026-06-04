import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "검색",
  description: "제목 또는 본문 키워드로 설교를 검색합니다.",
}

type Props = {
  searchParams: Promise<{ q?: string; scope?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, scope = "title" } = await searchParams

  // TODO: Notion API로 검색 결과 조회
  // const results = q ? await searchPosts({ query: q, scope }) : []

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">검색</h1>

      {/* 검색 입력 영역 */}
      <section className="mb-8">
        <p className="text-sm text-muted-foreground">검색 폼 (구현 예정)</p>
        {q && (
          <p className="mt-2 text-sm">
            검색어: <strong>{q}</strong> / 범위: {scope === "title" ? "제목" : "본문"}
          </p>
        )}
      </section>

      {/* 검색 결과 목록 */}
      <section>
        <p className="text-sm text-muted-foreground">검색 결과 목록 (구현 예정)</p>
      </section>
    </Container>
  )
}
