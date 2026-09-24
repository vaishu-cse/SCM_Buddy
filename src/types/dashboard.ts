export type Tone = "red" | "amber" | "green" | "blue" | "grey"

export interface Kpi {
  label: string
  value: string
  sub?: string
  note?: string
  noteTone?: Tone
  progress?: number
  progressTone?: Tone
}

export interface ActionItem {
  id: string
  icon: string
  tone: Tone
  title: string
  ref: string
  sub: string
  age: string
  value: string
  cta: string
  flag?: string
  flagTone?: Tone
  why?: string
  offer?: string
  done?: string
}

export interface InsightItem {
  priority: string
  icon: string
  tone: Tone
  title: string
  body: string
  metricLabel: string
  metricValue: string
  metricTone: Tone
  cta: string
  intent: "create" | "res"
}

export type InsightState = "open" | "actioned" | "declined" | "lapsed"

export interface InsightLedgerItem {
  id: string
  icon: string
  job: string
  source: string
  state: InsightState
  age: string
  value: number
  ledger: "saved" | "risk" | "lapsed" | null
  title: string
  detail: string
  cta: string
  intent: "create" | "res"
}

export type PersonaKey = "site" | "cat" | "head"

export interface PersonaDashboard {
  key: PersonaKey
  label: string
  role: string
  title: string
  scope: string
  scopeSub: string
  kpis: Kpi[]
  actions: ActionItem[]
  insights: InsightItem[]
}

export type DashboardData = Record<PersonaKey, PersonaDashboard>
