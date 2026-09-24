import { Check, Zap } from "lucide-react"
import { useMemo, useState } from "react"
import { getIcon } from "@/lib/icon-map"
import { toneClasses } from "@/lib/tone"
import { formatIndianCurrency, parseIndianCurrency } from "@/lib/format"
import type { ActionItem } from "@/types/dashboard"

const URGENT_WORDS = ["breach", "today", "block"]

function urgencyRank(item: ActionItem) {
  const flag = item.flag?.toLowerCase() ?? ""
  if (URGENT_WORDS.some((w) => flag.includes(w))) return 0
  if (item.flag) return 1
  return 2
}

export function ImmediateActions({
  actions,
  scope,
  onResolve,
  onMarkDone,
}: {
  actions: ActionItem[]
  scope: string
  onResolve: (item: ActionItem) => void
  onMarkDone: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)

  const sorted = useMemo(
    () => [...actions].sort((a, b) => urgencyRank(a) - urgencyRank(b)),
    [actions],
  )
  const visible = expanded ? sorted : sorted.slice(0, 3)
  const totalValue = useMemo(
    () => formatIndianCurrency(actions.reduce((sum, a) => sum + parseIndianCurrency(a.value), 0)),
    [actions],
  )

  return (
    <div className="rounded-[10px] border border-border bg-white shadow-[0_2px_8px_-2px_rgba(15,44,77,.10),0_1px_2px_rgba(15,44,77,.05)]">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-primary" />
          <span className="text-[13px] font-semibold text-foreground">Immediate actions</span>
          <span className="hidden text-[11px] text-muted-foreground sm:inline">urgency, then age</span>
        </div>
        <div className="text-[11.5px] text-muted-foreground">
          <span className="font-semibold text-foreground">{actions.length}</span> open ·{" "}
          <span className="font-semibold text-foreground">{totalValue}</span> at stake
        </div>
      </div>

      {actions.length === 0 ? (
        <div className="flex flex-col items-center gap-1 px-4 py-10 text-center">
          <Check className="size-5 text-tone-green-icon" />
          <div className="text-[12.5px] font-medium text-foreground">Queue clear on {scope}</div>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {visible.map((item) => (
            <ActionRow key={item.id} item={item} onResolve={onResolve} onMarkDone={onMarkDone} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <span className="text-[10.5px] text-muted-foreground">
          Every action completes in Buddy — EIP is written through the API.
        </span>
        {sorted.length > 3 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-foreground hover:bg-muted"
          >
            {expanded ? "Show fewer" : `See ${sorted.length - 3} more`}
          </button>
        )}
      </div>
    </div>
  )
}

function ActionRow({
  item,
  onResolve,
  onMarkDone,
}: {
  item: ActionItem
  onResolve: (item: ActionItem) => void
  onMarkDone: (id: string) => void
}) {
  const Icon = getIcon(item.icon)
  const tone = toneClasses(item.tone)
  const flagTone = toneClasses(item.flagTone)

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className={`flex size-[26px] shrink-0 items-center justify-center rounded-[8px] ${tone.bg} ${tone.border} border`}>
        <Icon className={`size-3.5 ${tone.icon}`} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[11.5px] font-medium text-foreground">{item.title}</div>
        <div className="mt-0.5 truncate text-[10.5px] text-muted-foreground">
          <span className="font-semibold text-foreground">{item.ref}</span> · {item.sub} · {item.age}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {item.flag && (
          <span
            className={`rounded-[5px] border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.03em] ${flagTone.bg} ${flagTone.border} ${flagTone.fg}`}
          >
            {item.flag}
          </span>
        )}
        <span className="text-[11.5px] font-semibold text-primary">{item.value}</span>
        <button
          onClick={() => onResolve(item)}
          className="whitespace-nowrap rounded-[7px] bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-brand-hover"
        >
          {item.cta} →
        </button>
        <button
          onClick={() => onMarkDone(item.id)}
          aria-label="Mark done"
          title="Mark done"
          className="flex size-7 shrink-0 items-center justify-center rounded-[7px] border border-border text-muted-foreground hover:bg-muted"
        >
          <Check className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
