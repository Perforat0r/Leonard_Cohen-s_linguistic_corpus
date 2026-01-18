"use client"

import { comparisonData1967 as defaultData1967, comparisonData2019 as defaultData2019 } from "@/lib/data"
import type { ComparisonAlbumData } from "@/lib/data-schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  PolarRadiusAxis,
} from "recharts"

interface ComparisonSectionProps {
  data1967?: ComparisonAlbumData
  data2019?: ComparisonAlbumData
}

export function ComparisonSection({ data1967 = defaultData1967, data2019 = defaultData2019 }: ComparisonSectionProps) {
  const barData = [
    {
      metric: "Всего слов",
      "1967": data1967.totalWords,
      "2019": data2019.totalWords,
    },
    {
      metric: "Уникальные слова",
      "1967": data1967.uniqueWords,
      "2019": data2019.uniqueWords,
    },
    {
      metric: "Среднее кол-во слов в песне",
      "1967": data1967.avgWordsPerSong,
      "2019": data2019.avgWordsPerSong,
    },
  ]

  const radarData = [
    {
      subject: "Лексическая плотность",
      "1967": data1967.lexicalDensity * 100,
      "2019": data2019.lexicalDensity * 100,
    },
    {
      subject: "Средняя длина предложение",
      "1967": (data1967.avgSentenceLength / 12) * 10,
      "2019": (data2019.avgSentenceLength / 12) * 10,
    },
    {
      subject: "Количество песен",
      "1967": (data1967.trackCount / 12) * 10,
      "2019": (data2019.trackCount / 12) * 10,
    },
    {
      subject: "Разнообразие слов",
      "1967": (data1967.uniqueWords / data1967.totalWords) * 100,
      "2019": (data2019.uniqueWords / data2019.totalWords) * 100,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Album Headers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">{data1967.album}</CardTitle>
            <p className="text-sm text-primary">{data1967.year}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Преобладающее настроение</p>
                <p className="text-sm text-foreground">{data1967.dominantMood}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Главные темы</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {data1967.topThemes.map((theme) => (
                    <span key={theme} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Поэтические приёмы</p>
                <p className="text-sm text-muted-foreground">{data1967.poeticDevices.join(", ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">{data2019.album}</CardTitle>
            <p className="text-sm text-accent">{data2019.year}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Преобладающее настроение</p>
                <p className="text-sm text-foreground">{data2019.dominantMood}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Главные темы</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {data2019.topThemes.map((theme) => (
                    <span key={theme} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Поэтические приёмы</p>
                <p className="text-sm text-muted-foreground">{data2019.poeticDevices.join(", ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">
              Сравнение количества слов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis dataKey="metric" type="category" stroke="var(--muted-foreground)" fontSize={12} width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Bar dataKey="1967" fill="var(--primary)" radius={4} />
                  <Bar dataKey="2019" fill="var(--accent)" radius={4} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider">Лингвистический профиль</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Radar name="1967" dataKey="1967" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} />
                  <Radar name="2019" dataKey="2019" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.3} />
                  <Legend />
                </RadarChart> 
              </ResponsiveContainer>
            </div> */}

            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radarData}
                  cx="50%"
                  cy="45%"
                  outerRadius="88%"
                  margin={{ top: 10, right: 30, bottom: 40, left: 30 }}
                >
                  <PolarGrid stroke="var(--border)" />

                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                  />

                  <PolarRadiusAxis
                    domain={[0, 50]}
                    tick={false}
                    axisLine={false}
                  />

                  <Radar
                    name="1967"
                    dataKey="1967"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.3}
                  />

                  <Radar
                    name="2019"
                    dataKey="2019"
                    stroke="var(--accent)"
                    fill="var(--accent)"
                    fillOpacity={0.3}
                  />

                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>


          </CardContent>
        </Card>
      </div>
    </div>
  )
}
