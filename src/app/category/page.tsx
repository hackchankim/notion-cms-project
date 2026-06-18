import type { Metadata } from "next"
import { BookOpen } from "lucide-react"

import { Container } from "@/components/layout/container"
import { CategoryTabs } from "@/components/category/category-tabs"
import { PostList } from "@/components/posts/post-list"
import { EmptyState } from "@/components/ui/empty-state"
import { getCategories, getPostsByCategory } from "@/lib/notion"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "카테고리",
  description: "성경 책별로 설교를 분류하여 탐색합니다.",
}

type Props = {
  searchParams: Promise<{ book?: string }>
}

export default async function CategoryPage({ searchParams }: Props) {
  const { book } = await searchParams

  const categories = await getCategories()

  if (categories.length === 0) {
    return (
      <Container className="py-10">
        <h1 className="text-3xl font-bold mb-6">카테고리</h1>
        <EmptyState
          icon={BookOpen}
          title="등록된 카테고리가 없습니다"
          description="아직 발행된 설교가 없습니다."
          action={{ label: "홈으로", href: "/" }}
        />
      </Container>
    )
  }

  const selectedBook = book ?? categories[0].category
  const posts = await getPostsByCategory(selectedBook)

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">카테고리</h1>
      <CategoryTabs categories={categories} selected={selectedBook} />
      <PostList posts={posts} emptyMessage="이 카테고리에 등록된 설교가 없습니다." />
    </Container>
  )
}
