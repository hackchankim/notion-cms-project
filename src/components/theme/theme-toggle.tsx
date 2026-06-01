"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  // resolvedTheme이 undefined이면 아직 마운트되지 않은 상태
  if (!resolvedTheme) {
    return <Button variant="ghost" size="icon" aria-label="테마 변경" disabled />
  }

  function cycleTheme() {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <Button variant="ghost" size="icon" aria-label="테마 변경" onClick={cycleTheme}>
      {theme === "light" && <Sun />}
      {theme === "dark" && <Moon />}
      {theme === "system" && <Monitor />}
    </Button>
  )
}
