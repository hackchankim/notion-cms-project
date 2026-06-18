// 홈 페이지 로딩 UI — 최근 설교 목록 스켈레톤
import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function HomeLoading() {
  return (
    <Container className="py-10">
      {/* 헤더 섹션 스켈레톤 */}
      <section className="mb-10">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </section>

      <Separator className="mb-10" />

      {/* 설교 목록 스켈레톤 */}
      <section>
        <Skeleton className="h-7 w-24 mb-6" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-6 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-24 mt-1" />
              <div className="flex gap-1.5 pt-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}
