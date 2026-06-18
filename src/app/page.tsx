import { Container } from "@/components/layout/container"
import { PostList } from "@/components/posts/post-list"
import { Separator } from "@/components/ui/separator"
import { SITE_CONFIG } from "@/lib/constants"
import type { PostSummary } from "@/lib/types"

// TODO: ISR 캐싱과 함께 Notion API에서 실제 데이터 조회
// import { getPosts } from "@/lib/notion"

/** 개발 단계 더미 데이터 — Notion 연동 후 제거 */
const DUMMY_POSTS: PostSummary[] = [
  {
    id: "1",
    title: "태초에 하나님이 천지를 창조하시니라",
    category: "창세기",
    chapter: 1,
    startVerse: 1,
    endVerse: 31,
    tags: ["창조", "시작"],
    publishedAt: new Date("2024-06-01"),
    status: "등록완료",
  },
  {
    id: "2",
    title: "주는 나의 목자시니 내게 부족함이 없으리로다",
    category: "시편",
    chapter: 23,
    startVerse: 1,
    endVerse: 6,
    tags: ["목자", "신뢰"],
    publishedAt: new Date("2024-06-08"),
    status: "등록완료",
  },
  {
    id: "3",
    title: "내가 곧 길이요 진리요 생명이니",
    category: "요한복음",
    chapter: 14,
    startVerse: 6,
    endVerse: 6,
    tags: ["예수", "진리"],
    publishedAt: new Date("2024-06-15"),
    status: "등록완료",
  },
]

export default async function HomePage() {
  // const posts = await getPosts()
  const posts = DUMMY_POSTS

  return (
    <Container className="py-10">
      {/* 헤더 섹션 */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{SITE_CONFIG.name}</h1>
        <p className="text-muted-foreground mt-2">{SITE_CONFIG.description}</p>
      </section>

      <Separator className="mb-10" />

      {/* 최근 설교 목록 */}
      <section>
        <h2 className="mb-6 text-xl font-semibold">최근 설교</h2>
        <PostList posts={posts} emptyMessage="등록된 설교가 없습니다." />
      </section>
    </Container>
  )
}
