import type { Tone } from "./dashboard"

export type NotificationBucket = "Today" | "Yesterday" | "Earlier this week"
export type NotificationTab = "all" | "updates" | "actions"

export interface NotificationItem {
  id: string
  icon: string
  tone: Tone
  pre?: string
  ref?: string
  mid?: string
  strong?: string
  post?: string
  when: string
  job: string
  kind: string
  who: "You" | "Update"
  bucket: NotificationBucket
}
