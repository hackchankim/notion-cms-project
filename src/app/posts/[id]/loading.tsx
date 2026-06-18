// 글 상세 페이지 로딩 UI — 본문 및 음성 플레이어 스켈레톤
import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function PostDetailLoading() {
  return (
    <Container className="py-10 max-w-3xl">
      {/* 글 ID 스켈레톤 */}
      <Skeleton className="h-4 w-20 mb-6" />

      {/* 글 메타 정보 스켈레톤 */}
      <section className="mb-8">
        <Skeleton className="h-9 w-full mb-2" />
        <Skeleton className="h-9 w-3/4 mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      </section>

      {/* 음성 플레이어 스켈레톤 */}
      <section className="mb-8 rounded-lg border p-4">
        <div className="space-y-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </section>

      <Separator className="mb-8" />

      {/* 본문 스켈레톤 */}
      <section className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <div className="pt-4 space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </section>
    </Container>
  )
}
