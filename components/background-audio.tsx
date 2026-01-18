"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface BackgroundAudioProps {
  src: string
  autoPlay?: boolean
  initialMuted?: boolean
  initialVolume?: number
}

export function BackgroundAudio({
  src,
  autoPlay = true,
  initialMuted = true,
  initialVolume = 0.3,
}: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(initialMuted)
  const [volume, setVolume] = useState(initialVolume)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setIsReady(true)
      if (autoPlay) {
        // Browsers require muted autoplay
        audio.muted = true
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setIsMuted(true)
          })
          .catch(() => {
            // Autoplay blocked by browser
            setIsPlaying(false)
          })
      }
    }

    const handleEnded = () => {
      audio.currentTime = 0
      audio.play()
    }

    audio.addEventListener("canplay", handleCanPlay)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("canplay", handleCanPlay)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [autoPlay])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(() => {
          // Play blocked
        })
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = value[0]
    audio.volume = newVolume
    setVolume(newVolume)

    if (newVolume > 0 && isMuted) {
      audio.muted = false
      setIsMuted(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
        <Button variant="ghost" size="icon" onClick={togglePlay} className="h-8 w-8" disabled={!isReady}>
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8" disabled={!isReady}>
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        <div className="w-20">
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
            disabled={!isReady}
          />
        </div>

        <span className="text-xs text-muted-foreground ml-1 min-w-[60px]">
          {isReady ? (isPlaying ? "Playing" : "Paused") : "Loading..."}
        </span>
      </div>
    </>
  )
}
