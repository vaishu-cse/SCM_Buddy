import type { Tone } from "@/types/dashboard"

export interface DraftDocRow {
  label: string
  value: string
  auto?: boolean
}

export interface DraftDoc {
  title: string
  badge: string
  rows: DraftDocRow[]
  note?: string
  warning?: string
}

export interface ChatMaterialOption {
  id: string
  code: string
  name: string
  meta: string
  tag?: string
  onClick: () => void
}

export interface ChatInfoCard {
  title: string
  fields: { label: string; value: string }[]
  note?: string
}

export interface ChatAdvisories {
  title: string
  items: { title: string; body: string }[]
}

export interface ChatSourcingOption {
  id: string
  label: string
  tag?: string
  tagTone?: Tone
  landedValue?: string
  breakdown: string
  disabled?: boolean
  onSelect?: () => void
}

export interface ChatSourcing {
  header: string
  subtitle: string
  selectable: boolean
  selectedId: string
  options: ChatSourcingOption[]
  warningTitle?: string
  warningBody?: string
  bestCostLabel?: string
  bestCostValue?: string
  deliveryImpactLabel?: string
  deliveryImpact?: string
  cta?: { label: string; onClick: () => void }
}

export interface ResolveRequest {
  kind: "action" | "insight"
  scope: string
  title: string
  ref?: string
  sub?: string
  age?: string
  value?: string
  why?: string
  offer?: string
  done?: string
  cta: string
  intent?: "create" | "res"
}

export interface AssistantController {
  openResolve: (req: ResolveRequest) => void
}

export interface ChatAction {
  label: string
  primary?: boolean
  onClick: () => void
}

export interface ChatDoc {
  ref: string
  scope: string
  value: string
}

export interface ChatMessage {
  id: string
  from: "user" | "buddy"
  text?: string
  doc?: ChatDoc
  actions?: ChatAction[]
  materialOptions?: ChatMaterialOption[]
  materialNote?: string
  infoCard?: ChatInfoCard
  advisories?: ChatAdvisories
  sourcing?: ChatSourcing
  done?: boolean
}
