"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  defaultQuery?: string
}

export function SearchForm({ defaultQuery = "" }: SearchFormProps) {
  return (
    <form action="/search" method="GET">
      <div className="flex gap-2">
        <Input
          name="q"
          placeholder="설교 제목으로 검색하세요..."
          defaultValue={defaultQuery}
          autoFocus
          required
          minLength={1}
          className="flex-1"
          autoComplete="off"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-1.5" />
          검색
        </Button>
      </div>
    </form>
  )
}
