import { Fragment } from "react"

type RichTextItem = {
  plain_text: string
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
  href: string | null
}

export function RichText({ richText }: { richText: RichTextItem[] }) {
  return (
    <>
      {richText.map((item, i) => {
        let node: React.ReactNode = item.plain_text
        if (item.annotations.code)
          node = <code className="bg-muted rounded px-1 font-mono text-sm">{node}</code>
        if (item.annotations.bold) node = <strong>{node}</strong>
        if (item.annotations.italic) node = <em>{node}</em>
        if (item.annotations.strikethrough) node = <s>{node}</s>
        if (item.annotations.underline) node = <span className="underline underline-offset-2">{node}</span>
        if (item.href)
          node = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              {node}
            </a>
          )
        return <Fragment key={i}>{node}</Fragment>
      })}
    </>
  )
}
