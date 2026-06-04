export type NavItem = {
  label: string
  href: string
  external?: boolean
}

export const SITE_CONFIG = {
  name: "교회 설교 아카이브",
  description:
    "Notion을 CMS로 활용하여 교회 설교 음성파일을 아카이빙하는 블로그입니다. 성도들이 언제든 설교를 다시 들을 수 있습니다.",
  url: "https://github.com/hackchankim/notion-cms-project",
  author: "hackc",
}

export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "카테고리", href: "/category" },
  { label: "달력", href: "/calendar" },
  { label: "검색", href: "/search" },
]
