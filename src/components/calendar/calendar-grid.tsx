"use client"

import { useState, useMemo } from "react"

import { PostCard } from "@/components/posts/post-card"
import { cn } from "@/lib/utils"
import type { PostSummary } from "@/lib/types"

interface CalendarGridProps {
  posts: PostSummary[]
  year: number
  month: number
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"]

export function CalendarGrid({ posts, year, month }: CalendarGridProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  // publishedAt("YYYY-MM-DD")에서 일(day)만 추출 — 타임존 영향 없이 문자열 파싱
  const postsByDay = useMemo(() => {
    const map = new Map<number, PostSummary[]>()
    for (const post of posts) {
      const datePart = post.publishedAt.split("T")[0]
      const day = parseInt(datePart.split("-")[2], 10)
      const arr = map.get(day) ?? []
      arr.push(post)
      map.set(day, arr)
    }
    return map
  }, [posts])

  // 달력 셀 배열 — year/month 변경 시에만 재계산
  const cells = useMemo((): (number | null)[] => {
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay() // 0=일, 6=토
    const daysInMonth = new Date(year, month, 0).getDate()
    return [
      ...Array<null>(firstDayOfWeek).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
  }, [year, month])

  // 오늘 날짜 — 렌더링마다 재생성하지 않도록 한 번만 계산
  const today = useMemo(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() + 1, date: d.getDate() }
  }, [])

  const selectedPosts = selectedDay ? (postsByDay.get(selectedDay) ?? []) : []

  return (
    <div>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
        {cells.map((day, idx) => {
          const hasPosts = day !== null && postsByDay.has(day)
          const isSelected = day === selectedDay
          const isToday =
            day !== null &&
            today.year === year &&
            today.month === month &&
            today.date === day

          return (
            <div
              key={idx}
              role={hasPosts ? "button" : undefined}
              tabIndex={hasPosts ? 0 : undefined}
              aria-pressed={hasPosts ? isSelected : undefined}
              aria-label={
                hasPosts
                  ? `${month}월 ${day}일, 설교 ${postsByDay.get(day!)?.length}개`
                  : undefined
              }
              onKeyDown={(e) => {
                if (hasPosts && (e.key === "Enter" || e.key === " ")) {
                  setSelectedDay(isSelected ? null : day!)
                }
              }}
              className={cn(
                "relative flex flex-col items-center justify-start gap-1 bg-background p-1 min-h-[48px] sm:min-h-[64px]",
                hasPosts && "cursor-pointer hover:bg-muted",
                isSelected && "bg-primary/10",
                !day && "bg-muted/30"
              )}
              onClick={() => {
                if (!hasPosts) return
                setSelectedDay(isSelected ? null : day)
              }}
            >
              {day !== null && (
                <>
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs sm:text-sm",
                      isToday && "bg-primary text-primary-foreground font-bold",
                      isSelected && !isToday && "font-semibold text-primary"
                    )}
                  >
                    {day}
                  </span>
                  {hasPosts && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* 선택된 날짜의 글 목록 */}
      {selectedDay && selectedPosts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">
            {month}월 {selectedDay}일 설교
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {selectedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
