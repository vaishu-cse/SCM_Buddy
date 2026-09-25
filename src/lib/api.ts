import type { AssistantSuggestion, HistoryItem, Me, NavCounts } from "@/types/api"
import type { InsightLedgerItem, PersonaDashboard, PersonaKey } from "@/types/dashboard"
import type { NotificationItem } from "@/types/notifications"

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export function getMe(): Promise<Me> {
  return fetch("/api/me").then((r) => json<Me>(r))
}

export function getDashboard(persona: PersonaKey): Promise<PersonaDashboard> {
  return fetch(`/api/dashboard?persona=${persona}`).then((r) => json<PersonaDashboard>(r))
}

export function getNavCounts(): Promise<NavCounts> {
  return fetch("/api/nav-counts").then((r) => json<NavCounts>(r))
}

export function getInsights(): Promise<InsightLedgerItem[]> {
  return fetch("/api/insights").then((r) => json<InsightLedgerItem[]>(r))
}

export function getAssistantSuggestions(): Promise<AssistantSuggestion[]> {
  return fetch("/api/assistant/suggestions").then((r) => json<AssistantSuggestion[]>(r))
}

export function markActionDone(id: string): Promise<{ ok: boolean }> {
  return fetch(`/api/actions/${id}/done`, { method: "POST" }).then((r) => json<{ ok: boolean }>(r))
}

export function getNotifications(): Promise<NotificationItem[]> {
  return fetch("/api/notifications").then((r) => json<NotificationItem[]>(r))
}

export function markNotificationsRead(): Promise<{ ok: boolean }> {
  return fetch("/api/notifications/read", { method: "POST" }).then((r) => json<{ ok: boolean }>(r))
}

export function getChatHistory(): Promise<HistoryItem[]> {
  return fetch("/api/history").then((r) => json<HistoryItem[]>(r))
}
