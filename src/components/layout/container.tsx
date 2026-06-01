import { cn } from "@/lib/utils"
import type { RequiredChildren, PropsWithClassName } from "@/lib/types"

type ContainerProps = RequiredChildren<PropsWithClassName>

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container mx-auto max-w-screen-xl px-4 md:px-6", className)}>
      {children}
    </div>
  )
}
