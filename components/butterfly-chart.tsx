"use client"

import { earlyPeriodWords, latePeriodWords, periodComparisonData } from "@/lib/corpus-analysis-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"

export function ButterflyChart() {
  // Transform data for butterfly chart (early goes negative, late goes positive)
  const chartData = earlyPeriodWords.map((early, index) => ({
    earlyWord: early.word,
    lateWord: latePeriodWords[index]?.word || "",
    early: -early.count, // negative for left side
    late: latePeriodWords[index]?.count || 0,
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-center text-foreground">Леонард Коэн: Смена парадигмы</CardTitle>
        <p className="text-center text-sm text-muted-foreground">Телесные образы против философских смыслов</p>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <XAxis
                type="number"
                domain={[-100, 40]}
                tickFormatter={(value) => Math.abs(value).toString()}
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis type="category" dataKey="earlyWord" hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => [
                  Math.abs(value),
                  name === "early" ? "Ранний (1967-1974)" : "Поздний (2000-2019)",
                ]}
              />
              <ReferenceLine x={0} stroke="var(--foreground)" strokeWidth={2} />
              <Bar dataKey="early" fill={periodComparisonData.early.color} radius={4}>
                {chartData.map((_, index) => (
                  <Cell key={`early-${index}`} />
                ))}
              </Bar>
              <Bar dataKey="late" fill={periodComparisonData.late.color} radius={4}>
                {chartData.map((_, index) => (
                  <Cell key={`late-${index}`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Word labels */}
        <div className="grid grid-cols-2 gap-8 mt-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-center" style={{ color: periodComparisonData.early.color }}>
              {periodComparisonData.early.label}
            </h4>
            <p className="text-xs text-muted-foreground text-center mb-3">{periodComparisonData.early.description}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {earlyPeriodWords.map((item) => (
                <span
                  key={item.word}
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor: `${periodComparisonData.early.color}20`,
                    color: periodComparisonData.early.color,
                  }}
                >
                  {item.word} ({item.count})
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-center" style={{ color: periodComparisonData.late.color }}>
              {periodComparisonData.late.label}
            </h4>
            <p className="text-xs text-muted-foreground text-center mb-3">{periodComparisonData.late.description}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {latePeriodWords.map((item) => (
                <span
                  key={item.word}
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor: `${periodComparisonData.late.color}20`,
                    color: periodComparisonData.late.color,
                  }}
                >
                  {item.word} ({item.count})
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
