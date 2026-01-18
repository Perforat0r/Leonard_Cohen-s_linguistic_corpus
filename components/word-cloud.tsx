"use client"

import { useState, useMemo } from "react"
import { realWordCloudData } from "@/lib/corpus-analysis-data"
import type { WordCloudItem } from "@/lib/data-schema"

interface WordCloudProps {
  data?: WordCloudItem[]
}

export function WordCloud({ data = realWordCloudData }: WordCloudProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const shuffledWords = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5)
  }, [data])

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center justify-center gap-3 p-8 bg-secondary/30 rounded-lg min-h-[300px]">
        {shuffledWords.map((item) => (
          <button
            key={item.word}
            onMouseEnter={() => setHoveredWord(item.word)}
            onMouseLeave={() => setHoveredWord(null)}
            className="transition-all duration-200 hover:scale-110"
            style={{
              fontSize: `${Math.max(12, item.size * 0.8)}px`,
              opacity: hoveredWord && hoveredWord !== item.word ? 0.3 : 1,
              color: item.size > 30 ? "var(--primary)" : item.size > 20 ? "var(--accent)" : "var(--muted-foreground)",
            }}
          >
            {item.word}
          </button>
        ))}
      </div>

      {hoveredWord && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm text-foreground">
            <span className="font-semibold">{hoveredWord}</span>
            <span className="text-muted-foreground ml-2">
              {data.find((w) => w.word === hoveredWord)?.count} случаев употребления
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
