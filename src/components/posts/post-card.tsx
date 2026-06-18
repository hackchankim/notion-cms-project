import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PostSummary } from "@/lib/types"

// 설교 목록 카드 컴포넌트 — 홈, 카테고리, 검색 페이지에서 공통 사용
interface PostCardProps {
  post: PostSummary
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="group">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader>
          <CardTitle className="line-clamp-2 text-base">{post.title}</CardTitle>
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
  )
}
