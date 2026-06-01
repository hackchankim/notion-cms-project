export type NavItem = {
  label: string
  href: string
  external?: boolean
}

export const SITE_CONFIG = {
  name: "Next.js Starter",
  description:
    "Next.js 16 App Router 기반의 모던 웹 스타터킷. shadcn/ui, Tailwind CSS v4, 다크모드를 기본 지원합니다.",
  url: "https://github.com/hackchankim/claude-nextjs-starters",
  author: "hackc",
}

export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "컴포넌트", href: "/#components" },
  {
    label: "GitHub",
    href: SITE_CONFIG.url,
    external: true,
  },
]
