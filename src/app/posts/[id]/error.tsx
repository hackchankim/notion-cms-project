"use client"

// 글 상세 페이지 에러 바운더리 — 설교 데이터 로딩 실패 시 폴백 UI
import { useEffect } from "react"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Props = {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function PostDetailError({ error, unstable_retry }: Props) {
  useEffect(() => {
    // 에러 리포팅 서비스에 오류 기록
    console.error("[글 상세 페이지 오류]", error)
  }, [error])

  return (
    <Container className="py-10 max-w-3xl">
      <Alert variant="destructive" className="max-w-lg">
        <AlertTitle>설교를 불러오지 못했습니다</AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p className="text-sm">
            설교 데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시
            시도해 주세요.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              오류 코드: {error.digest}
            </p>
          )}
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => unstable_retry()}
            >
              다시 시도
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">홈으로 돌아가기</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </Container>
  )
}
