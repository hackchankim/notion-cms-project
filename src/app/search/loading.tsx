// 검색 페이지 로딩 UI — 검색 결과 스켈레톤
import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function SearchLoading() {
  return (
    <Container className="py-10">
      {/* 페이지 타이틀 스켈레톤 */}
      <Skeleton className="h-9 w-20 mb-6" />

      {/* 검색 폼 스켈레톤 */}
      <section className="mb-8">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
        {/* 범위 선택 스켈레톤 */}
        <div className="flex gap-4 mt-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </section>

      <Separator className="mb-8" />

      {/* 검색 결과 스켈레톤 */}
      <section>
        <Skeleton className="h-5 w-32 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-1.5 pt-1">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}
