// 달력 페이지 로딩 UI — 월별 달력 스켈레톤
import { Container } from "@/components/layout/container"
import { Skeleton } from "@/components/ui/skeleton"

export default function CalendarLoading() {
  return (
    <Container className="py-10">
      {/* 페이지 타이틀 스켈레톤 */}
      <Skeleton className="h-9 w-24 mb-6" />

      {/* 월 네비게이션 스켈레톤 */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* 달력 그리드 스켈레톤 */}
      <div className="rounded-lg border overflow-hidden">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="p-3 text-center">
              <Skeleton className="h-4 w-4 mx-auto" />
            </div>
          ))}
        </div>

        {/* 날짜 칸 — 5주 */}
        {Array.from({ length: 5 }).map((_, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div key={dayIndex} className="p-3 min-h-[80px] border-r last:border-r-0">
                <Skeleton className="h-5 w-5 rounded-full mb-2" />
                {/* 설교 있는 날 표시 (일부 칸에만) */}
                {(weekIndex + dayIndex) % 5 === 0 && (
                  <Skeleton className="h-4 w-full rounded-sm" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  )
}
