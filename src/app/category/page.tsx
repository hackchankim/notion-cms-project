import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "카테고리",
  description: "성경 책별로 설교를 분류하여 탐색합니다.",
}

export default async function CategoryPage() {
  // TODO: Notion API에서 카테고리 목록 및 글 목록 조회
  // const categories = await getCategories()

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">카테고리</h1>
      <p className="text-muted-foreground">
        성경 책별 설교 목록 (구현 예정)
      </p>
    </Container>
  )
}
