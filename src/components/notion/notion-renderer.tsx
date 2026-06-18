import type { NotionBlock } from "@/lib/types"
import { NotionBlock as NotionBlockComponent } from "./notion-block"

type BlockGroup =
  | { type: "single"; block: NotionBlock }
  | { type: "bulleted_list"; items: NotionBlock[] }
  | { type: "numbered_list"; items: NotionBlock[] }

function groupBlocks(blocks: NotionBlock[]): BlockGroup[] {
  return blocks.reduce<BlockGroup[]>((groups, block) => {
    if (block.type === "bulleted_list_item") {
      const last = groups.at(-1)
      if (last?.type === "bulleted_list") {
        last.items.push(block)
      } else {
        groups.push({ type: "bulleted_list", items: [block] })
      }
    } else if (block.type === "numbered_list_item") {
      const last = groups.at(-1)
      if (last?.type === "numbered_list") {
        last.items.push(block)
      } else {
        groups.push({ type: "numbered_list", items: [block] })
      }
    } else {
      groups.push({ type: "single", block })
    }
    return groups
  }, [])
}

export function NotionRenderer({ blocks }: { blocks: NotionBlock[] }) {
  const groups = groupBlocks(blocks)

  return (
    <div className="prose-custom">
      {groups.map((group, i) => {
        if (group.type === "bulleted_list") {
          return (
            <ul key={i} className="my-4 space-y-1">
              {group.items.map((block) => (
                <NotionBlockComponent key={block.id} block={block} />
              ))}
            </ul>
          )
        }
        if (group.type === "numbered_list") {
          return (
            <ol key={i} className="my-4 space-y-1">
              {group.items.map((block) => (
                <NotionBlockComponent key={block.id} block={block} />
              ))}
            </ol>
          )
        }
        return <NotionBlockComponent key={group.block.id} block={group.block} />
      })}
    </div>
  )
}
