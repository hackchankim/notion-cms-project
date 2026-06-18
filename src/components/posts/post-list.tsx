import { FileText } from "lucide-react"

import { EmptyState } from "@/components/ui/empty-state"
import { PostCard } from "@/components/posts/post-card"
import type { PostSummary } from "@/lib/types"

// 설교 목록 그리드 컴포넌트
interface PostListProps {
  posts: PostSummary[]
  emptyMessage?: string
}

export function PostList({ posts, emptyMessage = "등록된 설교가 없습니다." }: PostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState icon={FileText} title={emptyMessage} />
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
