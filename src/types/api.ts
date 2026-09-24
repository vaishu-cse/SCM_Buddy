export interface Me {
  name: string
  initials: string
  psNo: string
  lastLogin: string
}

export interface NavCounts {
  notifications: number
  insightsOpen: number
}

export interface AssistantSuggestion {
  id: string
  label: string
  kind: "create" | "info"
  reply: string
}
