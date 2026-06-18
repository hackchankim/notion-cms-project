// 카테고리 페이지 로딩 UI — 카테고리 목록 스켈레톤
import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function CategoryLoading() {
  return (
    <Container className="py-10">
      {/* 페이지 타이틀 스켈레톤 */}
      <Skeleton className="h-9 w-32 mb-6" />

      <Separator className="mb-8" />

      {/* 카테고리 탭 스켈레톤 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>

      {/* 설교 목록 스켈레톤 */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full ml-4" />
          </div>
        ))}
      </div>
    </Container>
  )
}
