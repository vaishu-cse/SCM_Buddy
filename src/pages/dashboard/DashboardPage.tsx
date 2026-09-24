import { useEffect, useState } from "react"
import { useOutletContext, useSearchParams } from "react-router-dom"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import type { OutletContext } from "@/components/layout/AppLayout"
import type { ResolveRequest } from "@/components/layout/assistant-types"
import { getDashboard, markActionDone } from "@/lib/api"
import type { ActionItem, InsightItem, PersonaDashboard, PersonaKey } from "@/types/dashboard"
import { ImmediateActions } from "./ImmediateActions"
import { InsightsPreview } from "./InsightsPreview"
import { KpiCard } from "./KpiCard"
import { PersonaSwitcher } from "./PersonaSwitcher"

function actionToResolve(item: ActionItem, scope: string): ResolveRequest {
  return {
    kind: "action",
    scope,
    title: item.title,
    ref: item.ref,
    sub: item.sub,
    age: item.age,
    value: item.value,
    why: item.why,
    offer: item.offer,
    done: item.done,
    cta: item.cta,
  }
}

function insightToResolve(item: InsightItem, scope: string): ResolveRequest {
  return {
    kind: "insight",
    scope,
    title: item.title,
    value: item.metricValue,
    why: item.body,
    cta: item.cta,
    intent: item.intent,
  }
}

export function DashboardPage() {
  const { controller, setPersonaRole } = useOutletContext<OutletContext>()
  const [searchParams, setSearchParams] = useSearchParams()
  const persona = (searchParams.get("persona") as PersonaKey) ?? "site"

  const [data, setData] = useState<PersonaDashboard | null>(null)
  const [actions, setActions] = useState<ActionItem[]>([])

  useEffect(() => {
    let cancelled = false
    getDashboard(persona).then((d) => {
      if (cancelled) return
      setData(d)
      setActions(d.actions)
      setPersonaRole(d.role)
    })
    return () => {
      cancelled = true
    }
  }, [persona, setPersonaRole])

  function handleMarkDone(id: string) {
    setActions((prev) => prev.filter((a) => a.id !== id))
    markActionDone(id)
  }

  if (!data) {
    return (
      <>
        <Breadcrumb page="Dashboard" />
        <div className="py-10 text-center text-[12.5px] text-muted-foreground">Loading dashboard…</div>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Breadcrumb page="Dashboard" />
        <PersonaSwitcher value={persona} onChange={(p) => setSearchParams({ persona: p })} />
      </div>

      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h1 className="text-[16px] font-semibold text-foreground">{data.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-tone-blue-bg px-2 py-0.5 font-mono text-[11px] font-semibold text-tone-blue-fg">
              {data.scope}
            </span>
            <span className="text-[11.5px] text-muted-foreground">{data.scopeSub}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-tone-green-icon" />
          Updated just now
        </div>
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))" }}>
        {data.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <ImmediateActions
        actions={actions}
        scope={data.scope}
        onResolve={(item) => controller.openResolve(actionToResolve(item, data.scope))}
        onMarkDone={handleMarkDone}
      />

      <InsightsPreview
        insights={data.insights}
        scope={data.scope}
        onCta={(item) => controller.openResolve(insightToResolve(item, data.scope))}
      />
    </>
  )
}
