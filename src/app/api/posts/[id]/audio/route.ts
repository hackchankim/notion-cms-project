import { getPost, extractAudioBlocks } from "@/lib/notion"

export const dynamic = "force-dynamic"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)
  if (!post) return Response.json([], { status: 404 })

  const audioFiles = extractAudioBlocks(post.content, id).map((f) => ({
    ...f,
    expiresAt: f.expiresAt?.toISOString(),
  }))

  return Response.json(audioFiles)
}
