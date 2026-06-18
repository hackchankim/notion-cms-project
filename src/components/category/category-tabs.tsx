"use client"

import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  categories: { category: string; count: number }[]
  selected: string
}

export function CategoryTabs({ categories, selected }: CategoryTabsProps) {
  const router = useRouter()

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex gap-2 pb-2 min-w-max sm:min-w-0 sm:flex-wrap">
        {categories.map(({ category, count }) => {
          const isActive = selected === category
          return (
            <button
              key={category}
              onClick={() =>
                router.push(`/category?book=${encodeURIComponent(category)}`)
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              {category}
              <Badge
                variant={isActive ? "secondary" : "outline"}
                className="pointer-events-none text-xs"
              >
                {count}
              </Badge>
            </button>
          )
        })}
      </div>
    </div>
  )
}
