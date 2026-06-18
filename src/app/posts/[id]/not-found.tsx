// 글 상세 페이지 404 UI — notFound() 호출 시 렌더링
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PostNotFound() {
  return (
    <Container className="py-20 max-w-3xl text-center">
      {/* 404 표시 */}
      <p className="text-6xl font-bold text-muted-foreground/30 mb-4">404</p>

      <h1 className="text-2xl font-bold mb-2">설교를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground mb-8">
        요청하신 설교가 존재하지 않거나 삭제되었습니다.
      </p>

      <Separator className="mb-8" />

      {/* 안내 링크 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/">최근 설교 보기</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/category">카테고리별 탐색</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/search">설교 검색</Link>
        </Button>
      </div>
    </Container>
  )
}
