import type { Metadata } from "next"
import { Search, SearchX } from "lucide-react"

export const dynamic = "force-dynamic"

import { Container } from "@/components/layout/container"
import { SearchForm } from "@/components/search/search-form"
import { PostList } from "@/components/posts/post-list"
import { EmptyState } from "@/components/ui/empty-state"
import { searchPosts } from "@/lib/notion"

export const metadata: Metadata = {
  title: "검색",
  description: "제목 또는 본문 키워드로 설교를 검색합니다.",
}

type Props = {
  searchParams: Promise<{ q?: string; scope?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const trimmedQuery = q?.trim() ?? ""

  // 쿼리가 있을 때만 검색 실행 (없으면 null — 초기 안내 상태)
  const results = trimmedQuery ? await searchPosts(trimmedQuery) : null

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">검색</h1>

      <section className="mb-8">
        <SearchForm defaultQuery={trimmedQuery} />
      </section>

      <section>
        {results === null && (
          <EmptyState
            icon={Search}
            title="검색어를 입력하세요"
            description="설교 제목으로 원하는 설교를 빠르게 찾을 수 있습니다."
          />
        )}
        {results !== null && results.length === 0 && (
          <EmptyState
            icon={SearchX}
            title="검색 결과가 없습니다"
            description={`'${trimmedQuery}'에 해당하는 설교를 찾을 수 없습니다.`}
            action={{ label: "전체 목록 보기", href: "/" }}
          />
        )}
        {results !== null && results.length > 0 && (
          <PostList posts={results} />
        )}
      </section>
    </Container>
  )
}
