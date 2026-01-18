"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from "recharts"

const earlyData = [
  { word: "lover", count: 92 },
  { word: "man", count: 30 },
  { word: "war", count: 24 },
  { word: "lady", count: 18 },
  { word: "body", count: 17 },
  { word: "hand", count: 16 },
  { word: "woman", count: 15 },
  { word: "green", count: 12 },
]

const lateData = [
  { word: "heart", count: 36 },
  { word: "place", count: 26 },
  { word: "day", count: 23 },
  { word: "light", count: 22 },
  { word: "truth", count: 21 },
  { word: "home", count: 19 },
  { word: "mind", count: 17 },
  { word: "healing", count: 14 },
]

export function EvolutionCharts() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkTheme()

    // Observe class changes on html element
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const foregroundColor = isDark ? "#d4d8e0" : "#1a1f36"
  const mutedColor = isDark ? "#7a8599" : "#64748b"
  const borderColor = isDark ? "#2d3548" : "#e2e8f0"
  const cardBg = isDark ? "#1a1f2e" : "#ffffff"
  const tooltipBg = isDark ? "#1a1f2e" : "#ffffff"

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">Ранний период (1967–1974)</CardTitle>
            <CardDescription className="text-muted-foreground"></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-muted-foreground">Loading chart...</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">Поздний период (2000–2019)</CardTitle>
            <CardDescription className="text-muted-foreground"></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-muted-foreground">Loading chart...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Early Period Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground">Ранний период (1967–1974)</CardTitle>
          <CardDescription className="text-muted-foreground">"Мир плоти и образов"</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earlyData} layout="vertical" margin={{ top: 5, right: 50, left: 70, bottom: 40 }}>
                <XAxis
                  type="number"
                  tick={{ fill: mutedColor, fontSize: 11 }}
                  axisLine={{ stroke: borderColor }}
                  tickLine={{ stroke: borderColor }}
                  label={{
                    value: "Частотность (употреблений)",
                    position: "insideBottom",
                    offset: -10,
                    fill: mutedColor,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="word"
                  tick={{ fill: foregroundColor, fontSize: 13, fontWeight: 500 }}
                  axisLine={{ stroke: borderColor }}
                  tickLine={false}
                  width={65}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: "6px",
                    color: foregroundColor,
                  }}
                  labelStyle={{ color: foregroundColor }}
                  itemStyle={{ color: foregroundColor }}
                  formatter={(value: number) => [`${value} случаев употребления`, "Частотность"]}
                  labelFormatter={(label) => `Слово: "${label}"`}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
                  {earlyData.map((_, index) => (
                    <Cell key={`early-cell-${index}`} fill="#4a9d7c" />
                  ))}
                  <LabelList dataKey="count" position="right" fill={mutedColor} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Основные темы: физическое присутствие, чувственность, конфликт.
          </p>
        </CardContent>
      </Card>

      {/* Late Period Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-foreground">Поздний период (2000–2019)</CardTitle>
          <CardDescription className="text-muted-foreground">"Мир духовности и итогов"</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lateData} layout="vertical" margin={{ top: 5, right: 50, left: 70, bottom: 40 }}>
                <XAxis
                  type="number"
                  tick={{ fill: mutedColor, fontSize: 11 }}
                  axisLine={{ stroke: borderColor }}
                  tickLine={{ stroke: borderColor }}
                  label={{
                    value: "Частотность (употреблений)",
                    position: "insideBottom",
                    offset: -10,
                    fill: mutedColor,
                    fontSize: 12,
                  }}
                />
                <YAxis
                  type="category"
                  dataKey="word"
                  tick={{ fill: foregroundColor, fontSize: 13, fontWeight: 500 }}
                  axisLine={{ stroke: borderColor }}
                  tickLine={false}
                  width={65}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: "6px",
                    color: foregroundColor,
                  }}
                  labelStyle={{ color: foregroundColor }}
                  itemStyle={{ color: foregroundColor }}
                  formatter={(value: number) => [`${value} случаев употребления`, "Частотность"]}
                  labelFormatter={(label) => `Слово: "${label}"`}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
                  {lateData.map((_, index) => (
                    <Cell key={`late-cell-${index}`} fill="#d4a847" />
                  ))}
                  <LabelList dataKey="count" position="right" fill={mutedColor} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Основные темы: самоанализ, трансцендентность, разрешение конфликта.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
