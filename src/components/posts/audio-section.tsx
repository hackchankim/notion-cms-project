"use client"

import { useState, useEffect, useRef } from "react"
import { AudioPlayer } from "./audio-player"

type AudioFileForClient = {
  id: string
  postId: string
  url: string
  name: string
  expiresAt?: string
}

type Props = {
  postId: string
  initialAudioFiles: AudioFileForClient[]
}

export function AudioSection({ postId, initialAudioFiles }: Props) {
  const [audioFiles, setAudioFiles] = useState(initialAudioFiles)
  const initialFilesRef = useRef(initialAudioFiles)

  useEffect(() => {
    const BUFFER_MS = 5 * 60 * 1000 // 5분 여유
    const hasExpiring = initialFilesRef.current.some(
      (f) => f.expiresAt && new Date(f.expiresAt).getTime() - Date.now() < BUFFER_MS
    )
    if (!hasExpiring) return

    fetch(`/api/posts/${postId}/audio`)
      .then((r) => {
        if (!r.ok) throw new Error(`audio refresh failed: ${r.status}`)
        return r.json()
      })
      .then((fresh: AudioFileForClient[]) => setAudioFiles(fresh))
      .catch(() => {
        // 갱신 실패 시 기존 URL 유지
      })
  }, [postId]) // postId 기준으로 마운트 시 1회 체크

  if (audioFiles.length === 0) return null

  return (
    <section className="mb-8 rounded-lg border p-4 space-y-3">
      {audioFiles.map((file) => (
        <AudioPlayer key={file.id} src={file.url} title={file.name} />
      ))}
    </section>
  )
}
