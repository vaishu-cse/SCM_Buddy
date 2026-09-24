import { toneClasses } from "@/lib/tone"
import type { Kpi } from "@/types/dashboard"

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const tone = kpi.noteTone ? toneClasses(kpi.noteTone) : null

  return (
    <div className="flex flex-col gap-1.5 rounded-[9px] border border-border bg-white p-3 shadow-[0_2px_8px_-2px_rgba(15,44,77,.10),0_1px_2px_rgba(15,44,77,.05)]">
      <div className="font-10 text-muted-foreground">{kpi.label}</div>
      <div className="font-18 font-semibold text-foreground">{kpi.value}</div>
      {kpi.note && tone && (
        <div className="flex items-center gap-1.5">
          <span
            className={`shrink-0 whitespace-nowrap rounded-[5px] border px-1.5 py-0.5 font-10 font-semibold tracking-[0.02em] ${tone.bg} ${tone.border} ${tone.fg}`}
          >
            {kpi.note}
          </span>
          {kpi.sub && <span className="min-w-0 truncate font-10 text-muted-foreground">{kpi.sub}</span>}
        </div>
      )}
      {!kpi.note && kpi.sub && <div className="font-10 text-muted-foreground">{kpi.sub}</div>}
      {typeof kpi.progress === "number" && (
        <div className="mt-0.5 h-[3px] w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full"
            style={{ width: `${kpi.progress}%`, backgroundColor: kpi.progressColor ?? "#134377" }}
          />
        </div>
      )}
    </div>
  )
}
