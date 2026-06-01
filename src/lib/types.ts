import type { ReactNode } from "react"

export type PropsWithClassName<T = object> = T & {
  className?: string
}

export type RequiredChildren<T = object> = T & {
  children: ReactNode
}

export type Theme = "light" | "dark" | "system"

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
