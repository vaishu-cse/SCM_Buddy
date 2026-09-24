import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getIcon } from "@/lib/icon-map"
import { toneClasses } from "@/lib/tone"
import { cn } from "@/lib/utils"
import type { InsightItem } from "@/types/dashboard"

export function InsightsPreview({
  insights,
  scope,
  onCta,
}: {
  insights: InsightItem[]
  scope: string
  onCta: (item: InsightItem) => void
}) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? insights : insights.slice(0, 3)

  return (
    <div className="rounded-[10px] border border-border bg-white shadow-[0_2px_8px_-2px_rgba(15,44,77,.10),0_1px_2px_rgba(15,44,77,.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-14 font-semibold text-foreground">Insights</span>
          <span className="rounded-full bg-tone-blue-bg px-2 py-0.5 font-10 font-semibold text-tone-blue-fg">
            {insights.length} ranked
          </span>
          <span className="font-12 text-muted-foreground">
            Top {insights.length} by priority · {scope}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {insights.length > 3 && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="rounded-md border border-border px-2.5 py-1 font-12 font-medium text-foreground hover:bg-muted"
            >
              {showAll ? "Show top 3" : `See all ${insights.length}`}
            </button>
          )}
          <Link
            to="/insights"
            className="flex items-center gap-1 font-12 font-semibold text-primary hover:underline"
          >
            Full ledger <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 p-4">
        {visible.map((insight, i) => (
          <InsightCard key={insight.priority} insight={insight} primary={i === 0} onCta={onCta} />
        ))}
      </div>

      <div className="border-t border-border px-4 py-2.5 font-10 text-muted-foreground">
        Ranked on value at risk against urgency, capped at the top five — rules to be agreed with L&T.
      </div>
    </div>
  )
}

function InsightCard({
  insight,
  primary,
  onCta,
}: {
  insight: InsightItem
  primary: boolean
  onCta: (item: InsightItem) => void
}) {
  const Icon = getIcon(insight.icon)
  const tone = toneClasses(insight.tone)
  const metricTone = toneClasses(insight.metricTone)

  return (
    <div className="flex min-w-[210px] flex-1 flex-col gap-2 rounded-[9px] border border-border p-3">
      <div className="flex items-center gap-2">
        <span className={`flex size-6 shrink-0 items-center justify-center rounded-md ${tone.bg} ${tone.border} border`}>
          <Icon className={`size-3.5 ${tone.icon}`} />
        </span>
        <span className="flex-1 font-12 font-semibold leading-tight text-foreground">{insight.title}</span>
        <span className="shrink-0 rounded-full border border-border px-1.5 py-0.5 font-10 font-semibold text-muted-foreground">
          {insight.priority}
        </span>
      </div>
      <p className="font-12 leading-[1.5] text-muted-foreground">{insight.body}</p>
      <div className="mt-auto flex items-baseline gap-1.5">
        <span className="font-10 text-muted-foreground">{insight.metricLabel}</span>
        <span className={`font-12 font-semibold ${metricTone.fg}`}>{insight.metricValue}</span>
      </div>
      <button
        onClick={() => onCta(insight)}
        className={cn(
          "mt-1 rounded-[7px] px-2.5 py-1.5 font-12 font-semibold",
          primary
            ? "bg-primary text-primary-foreground hover:bg-brand-hover"
            : "border border-border text-foreground hover:bg-muted",
        )}
      >
        {insight.cta} →
      </button>
    </div>
  )
}
