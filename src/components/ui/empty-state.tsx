import { Inbox, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// 빈 상태 표시 컴포넌트 — 검색 결과 없음, 카테고리 글 없음 등에서 공통 사용
interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href: string
  }
  className?: string
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-center",
        className
      )}
    >
      <Icon className="text-muted-foreground h-12 w-12" aria-hidden="true" />
      <p className="text-lg font-semibold">{title}</p>
      {description && (
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      )}
      {action && (
        <Button asChild variant="outline" className="mt-2">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}
