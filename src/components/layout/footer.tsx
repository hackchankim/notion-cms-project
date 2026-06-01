import { Container } from "@/components/layout/container"
import { SITE_CONFIG } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <Container className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm text-muted-foreground">
          {/* 빌드 시점 연도 — 동적 갱신이 필요하면 Client Component로 분리 */}
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-foreground"
          >
            shadcn/ui
          </a>
          .
        </p>
      </Container>
    </footer>
  )
}
