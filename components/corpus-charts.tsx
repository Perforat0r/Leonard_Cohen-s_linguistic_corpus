"use client"

import { albums as defaultAlbums } from "@/lib/data"
import type { Album } from "@/lib/data-schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface CorpusChartsProps {
  albums?: Album[]
}

export function CorpusCharts({ albums = defaultAlbums }: CorpusChartsProps) {
  const timelineData = albums.map((album) => ({
    year: album.year,
    words: album.totalWords,
    unique: album.uniqueWords,
    tracks: album.trackCount,
    album: album.title,
  }))

  const densityData = albums.map((album) => ({
    year: album.year,
    density: ((album.uniqueWords / album.totalWords) * 100).toFixed(1),
    avgWords: album.avgWordsPerSong,
    album: album.title,
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
            Количество слов в альбомах (1967–2019)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{right: 15}}>
                <defs>
                  <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                dataKey="year" stroke="var(--muted-foreground)" fontSize={12} interval={0}/>
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  formatter={(value: number, name: string) => [
                    value,
                    name === "words" ? "Всего слов" : "Уникальные слова",
                  ]}
                  labelFormatter={(label) => {
                    const item = timelineData.find((d) => d.year === label)
                    return item?.album || label
                  }}
                />
                <Area type="monotone" dataKey="words" stroke="var(--primary)" fill="url(#colorWords)" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey="unique"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--accent)", r: 3 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
           Лексическая плотность и среднее количество слов в песне
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={densityData} >
                <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} interval={0}/>
                <YAxis yAxisId="left" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--foreground)" }}
                  labelFormatter={(label) => {
                    const item = densityData.find((d) => d.year === label)
                    return item?.album || label
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="density"
                  name="Лексическая плотность %"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: "var(--primary)", r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgWords"
                  name="Среднее количество слов в песне"
                  stroke="var(--accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--accent)", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
