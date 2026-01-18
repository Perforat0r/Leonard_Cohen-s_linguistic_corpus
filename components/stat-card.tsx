import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
  description?: string
  trend?: {
    direction: "up" | "down" | "neutral"
    value: string
  }
}

export function StatCard({ label, value, description, trend }: StatCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-mono font-bold text-foreground">{value}</p>
          {trend && (
            <span
              className={`text-sm ${
                trend.direction === "up"
                  ? "text-green-500"
                  : trend.direction === "down"
                    ? "text-red-500"
                    : "text-muted-foreground"
              }`}
            >
              {trend.direction === "up" && "↑"}
              {trend.direction === "down" && "↓"}
              {trend.value}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
