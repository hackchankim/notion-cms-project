import Image from "next/image"
import { Info } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { NotionBlock } from "@/lib/types"
import { RichText } from "./rich-text"

export function NotionBlock({ block }: { block: NotionBlock }) {
  const data = block[block.type]

  switch (block.type) {
    case "paragraph":
      return (
        <p className="leading-7 text-foreground mb-4 empty:mb-4">
          <RichText richText={data?.rich_text ?? []} />
        </p>
      )

    case "heading_1":
      return (
        <h1 className="text-2xl font-bold mt-8 mb-3">
          <RichText richText={data?.rich_text ?? []} />
        </h1>
      )

    case "heading_2":
      return (
        <h2 className="text-xl font-semibold mt-6 mb-2">
          <RichText richText={data?.rich_text ?? []} />
        </h2>
      )

    case "heading_3":
      return (
        <h3 className="text-lg font-medium mt-4 mb-2">
          <RichText richText={data?.rich_text ?? []} />
        </h3>
      )

    case "bulleted_list_item":
      return (
        <li className="ml-4 list-disc leading-7">
          <RichText richText={data?.rich_text ?? []} />
        </li>
      )

    case "numbered_list_item":
      return (
        <li className="ml-4 list-decimal leading-7">
          <RichText richText={data?.rich_text ?? []} />
        </li>
      )

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          <RichText richText={data?.rich_text ?? []} />
        </blockquote>
      )

    case "callout": {
      const icon = data?.icon
      const emoji = icon?.type === "emoji" ? icon.emoji : null
      return (
        <div className="flex gap-3 rounded-lg bg-muted p-4 my-4">
          <span className="shrink-0 text-lg" aria-hidden>
            {emoji ?? <Info className="size-5 mt-0.5" />}
          </span>
          <div className="leading-7">
            <RichText richText={data?.rich_text ?? []} />
          </div>
        </div>
      )
    }

    case "code":
      return (
        <pre className="rounded-md bg-muted p-4 font-mono text-sm overflow-x-auto my-4">
          <code>{data?.rich_text?.map((t: { plain_text: string }) => t.plain_text).join("") ?? ""}</code>
        </pre>
      )

    case "divider":
      return <Separator className="my-6" />

    case "image": {
      const src =
        data?.type === "file" ? data.file?.url : data?.type === "external" ? data.external?.url : null
      if (!src) return null
      const alt = data?.caption?.[0]?.plain_text ?? ""
      return (
        <figure className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image src={src} alt={alt} fill className="object-cover" unoptimized={data?.type === "file"} />
          </div>
          {alt && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{alt}</figcaption>}
        </figure>
      )
    }

    case "audio":
      return null

    default:
      if (process.env.NODE_ENV === "development") {
        return (
          <div className="my-2 rounded border border-dashed border-muted-foreground/40 px-3 py-2 text-xs text-muted-foreground">
            미지원 블록: {block.type}
          </div>
        )
      }
      return null
  }
}
