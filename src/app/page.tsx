import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SITE_CONFIG } from "@/lib/constants"
import type { PostSummary } from "@/lib/types"

// TODO: ISR 캐싱과 함께 Notion API에서 실제 데이터 조회
// import { getRecentPosts } from "@/lib/notion"

/** 개발 단계 더미 데이터 — Notion 연동 후 제거 */
const DUMMY_POSTS: PostSummary[] = [
  {
    id: "1",
    title: "태초에 하나님이 천지를 창조하시니라",
    category: "창세기",
    tags: ["창조", "시작"],
    publishedAt: new Date("2024-06-01"),
    status: "발행됨",
  },
  {
    id: "2",
    title: "주는 나의 목자시니 내게 부족함이 없으리로다",
    category: "시편",
    tags: ["목자", "신뢰"],
    publishedAt: new Date("2024-06-08"),
    status: "발행됨",
  },
  {
    id: "3",
    title: "내가 곧 길이요 진리요 생명이니",
    category: "요한복음",
    tags: ["예수", "진리"],
    publishedAt: new Date("2024-06-15"),
    status: "발행됨",
  },
]

export default async function HomePage() {
  // const posts = await getRecentPosts()
  const posts = DUMMY_POSTS

  return (
    <Container className="py-10">
      {/* 헤더 섹션 */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{SITE_CONFIG.name}</h1>
        <p className="mt-2 text-muted-foreground">{SITE_CONFIG.description}</p>
      </section>

      <Separator className="mb-10" />

      {/* 최근 설교 목록 */}
      <section>
        <h2 className="text-xl font-semibold mb-6">최근 설교</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="group">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {post.publishedAt.toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  )
}
