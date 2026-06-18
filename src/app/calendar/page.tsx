import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { Button } from "@/components/ui/button"
import { getPostsByMonth } from "@/lib/notion"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "달력",
  description: "월별 달력으로 설교 업로드 날짜를 확인합니다.",
}

type Props = {
  searchParams: Promise<{ year?: string; month?: string }>
}

export default async function CalendarPage({ searchParams }: Props) {
  const params = await searchParams
  const now = new Date()
  const parsedYear = params.year ? parseInt(params.year, 10) : NaN
  const parsedMonth = params.month ? parseInt(params.month, 10) : NaN
  // NaN·범위 이탈 시 현재 연월로 fallback
  const year =
    Number.isFinite(parsedYear) && parsedYear >= 2000 && parsedYear <= 2100
      ? parsedYear
      : now.getFullYear()
  const month =
    Number.isFinite(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12
      ? parsedMonth
      : now.getMonth() + 1

  const posts = await getPostsByMonth(year, month)

  // 이전/다음 월 — Date API가 월 경계(1월↔12월)를 자동 처리
  const prevDate = new Date(year, month - 2, 1)
  const nextDate = new Date(year, month, 1)
  const prevLink = `/calendar?year=${prevDate.getFullYear()}&month=${prevDate.getMonth() + 1}`
  const nextLink = `/calendar?year=${nextDate.getFullYear()}&month=${nextDate.getMonth() + 1}`

  return (
    <Container className="py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {year}년 {month}월
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={prevLink} aria-label="이전 달">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={nextLink} aria-label="다음 달">
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CalendarGrid posts={posts} year={year} month={month} />
    </Container>
  )
}
