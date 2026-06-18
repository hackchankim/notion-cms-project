import { Container } from "@/components/layout/container"
import { PostList } from "@/components/posts/post-list"
import { Separator } from "@/components/ui/separator"
import { SITE_CONFIG } from "@/lib/constants"
import { getPosts } from "@/lib/notion"

export const revalidate = 3600

export default async function HomePage() {
  const posts = await getPosts()

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
