import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "달력",
  description: "월별 달력으로 설교 업로드 날짜를 확인합니다.",
}

export default async function CalendarPage() {
  // TODO: Notion API에서 발행일 목록 조회
  // const publishedDates = await getPublishedDates()

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">달력</h1>
      <p className="text-muted-foreground">
        월별 설교 달력 (구현 예정)
      </p>
    </Container>
  )
}
