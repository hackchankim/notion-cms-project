import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NotionRenderer } from "@/components/notion/notion-renderer"
import { AudioSection } from "@/components/posts/audio-section"
import { getPost, extractAudioBlocks } from "@/lib/notion"

export const revalidate = 3600

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return { title: "설교를 찾을 수 없습니다" }

  return {
    title: post.title,
    description: `${post.category} ${post.chapter}:${post.startVerse}-${post.endVerse} | ${post.publishedAt}`,
    openGraph: {
      title: post.title,
      description: `${post.publishedAt} 설교`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  }
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) notFound()

  const audioFiles = extractAudioBlocks(post.content, id).map((f) => ({
    ...f,
    expiresAt: f.expiresAt?.toISOString(),
  }))

  return (
    <Container className="py-10 max-w-3xl">
      {/* 메타 정보 */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground mb-3">
          <span>{post.publishedAt}</span>
          <span>·</span>
          <span>
            {post.category} {post.chapter}:{post.startVerse}–{post.endVerse}
          </span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </section>

      {/* 오디오 플레이어 */}
      <AudioSection postId={id} initialAudioFiles={audioFiles} />

      <Separator className="my-8" />

      {/* 본문 */}
      <NotionRenderer blocks={post.content.filter((b) => b.type !== "audio")} />
    </Container>
  )
}
