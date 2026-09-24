import { http, HttpResponse } from "msw"
import type { DashboardData, PersonaKey } from "@/types/dashboard"
import dashboard from "./data/dashboard.json"
import me from "./data/me.json"
import navCounts from "./data/nav-counts.json"
import assistantSuggestions from "./data/assistant.json"
import insights from "./data/insights.json"

const dashboardData = dashboard as DashboardData

export const handlers = [
  http.get("/api/me", () => HttpResponse.json(me)),

  http.get("/api/dashboard", ({ request }) => {
    const url = new URL(request.url)
    const persona = (url.searchParams.get("persona") as PersonaKey) ?? "site"
    return HttpResponse.json(dashboardData[persona] ?? dashboardData.site)
  }),

  http.get("/api/nav-counts", () => HttpResponse.json(navCounts)),

  http.get("/api/insights", () => HttpResponse.json(insights)),

  http.get("/api/assistant/suggestions", () => HttpResponse.json(assistantSuggestions)),

  http.post("/api/actions/:id/done", () => HttpResponse.json({ ok: true })),
]
