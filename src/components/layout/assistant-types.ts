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
  done?: boolean
}
