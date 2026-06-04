import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  // TODO: Notion API에서 글 제목 조회 후 메타데이터 반환
  return {
    title: `설교 ${id}`,
  }
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params

  // TODO: Notion API로 글 상세 및 음성파일 조회
  // const post = await getPost(id)
  // const audioFiles = await getAudioFiles(id)

  return (
    <Container className="py-10 max-w-3xl">
      <p className="text-sm text-muted-foreground mb-6">글 ID: {id}</p>

      {/* 글 메타 정보 */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">설교 제목</h1>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>2024-01-01</span>
          <span>·</span>
          <span>창세기</span>
        </div>
      </section>

      {/* 음성 플레이어 */}
      <section className="mb-8 rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">음성 플레이어 영역 (구현 예정)</p>
      </section>

      {/* 본문 */}
      <section>
        <p className="text-sm text-muted-foreground">본문 렌더링 영역 (구현 예정)</p>
      </section>
    </Container>
  )
}
