"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

// 음성파일 재생 플레이어 — HTML5 audio API 사용
interface AudioPlayerProps {
  src: string
  title?: string
  className?: string
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function AudioPlayer({ src, title, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener("timeupdate", onTimeUpdate)
    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate)
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  // src 변경 시 재생 상태 초기화
  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [src])

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      try {
        await audio.play()
        setIsPlaying(true)
      } catch {
        // 자동재생 차단 또는 네트워크 오류 — UI 상태 변경하지 않음
      }
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={cn("flex flex-col gap-3 rounded-lg border p-4", className)}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* 파일명 표시 */}
      {title && (
        <p className="truncate text-sm font-medium" title={title}>
          {title}
        </p>
      )}

      {/* 컨트롤 영역 */}
      <div className="flex items-center gap-3">
        {/* 재생/일시정지 버튼 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? "일시정지" : "재생"}
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
        </Button>

        {/* 진행바 + 시간 표시 */}
        <div className="flex flex-1 flex-col gap-1">
          <div
            className="cursor-pointer"
            role="slider"
            aria-label="재생 위치"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={handleSeek}
          >
            <Progress value={progress} className="h-1.5" />
          </div>
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
