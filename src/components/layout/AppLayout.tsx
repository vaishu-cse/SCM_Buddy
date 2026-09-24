import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { fallbackDone, fallbackOffer, fallbackWhy } from "@/lib/assistant-fallback"
import { getAssistantSuggestions, getMe, getNavCounts } from "@/lib/api"
import type { AssistantSuggestion, Me, NavCounts } from "@/types/api"
import { AppHeader } from "./AppHeader"
import { AppSidebar } from "./AppSidebar"
import { AssistantPanel } from "./AssistantPanel"
import type { AssistantController, ChatMessage, ResolveRequest } from "./assistant-types"

let messageId = 0
function nextId() {
  messageId += 1
  return `m${messageId}`
}

export function AppLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [assistantHidden, setAssistantHidden] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [personaRole, setPersonaRole] = useState("Site Buyer")

  const [me, setMe] = useState<Me | null>(null)
  const [navCounts, setNavCounts] = useState<NavCounts | null>(null)
  const [suggestions, setSuggestions] = useState<AssistantSuggestion[]>([])

  useEffect(() => {
    getMe().then(setMe)
    getNavCounts().then(setNavCounts)
    getAssistantSuggestions().then(setSuggestions)
  }, [])

  function resetThread() {
    setMessages([])
  }

  function clearPendingActions() {
    setMessages((prev) => prev.map((m) => ({ ...m, actions: undefined })))
  }

  function confirmResolve(req: ResolveRequest) {
    clearPendingActions()
    setMessages((prev) => [
      ...prev,
      {
        id: nextId(),
        from: "buddy",
        text: req.done ?? fallbackDone(req),
        actions: [{ label: "Ask something else", onClick: resetThread }],
      },
    ])
  }

  const controller: AssistantController = {
    openResolve(req) {
      setAssistantHidden(false)
      const thread: ChatMessage[] = [{ id: nextId(), from: "user", text: req.title }]
      thread.push({ id: nextId(), from: "buddy", text: req.why ?? fallbackWhy(req) })
      if (req.ref) {
        thread.push({
          id: nextId(),
          from: "buddy",
          doc: { ref: req.ref, scope: req.scope, value: req.value ?? "—" },
        })
      }
      thread.push({
        id: nextId(),
        from: "buddy",
        text: req.offer ?? fallbackOffer(req),
        actions: [
          { label: req.cta, primary: true, onClick: () => confirmResolve(req) },
          { label: "Not now", onClick: resetThread },
        ],
      })
      setMessages(thread)
    },
  }

  function handleSuggestion(s: AssistantSuggestion) {
    setAssistantHidden(false)
    setMessages([
      { id: nextId(), from: "user", text: s.label },
      {
        id: nextId(),
        from: "buddy",
        text: s.reply,
        actions: [{ label: "Ask something else", onClick: resetThread }],
      },
    ])
  }

  function handleComposerSubmit(text: string) {
    setAssistantHidden(false)
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text },
      {
        id: nextId(),
        from: "buddy",
        text: "Buddy will pick this up once the live agent is connected — try one of the suggestions above, or open an action from your dashboard.",
      },
    ])
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          sidebarExpanded={sidebarExpanded}
          onToggleSidebar={() => setSidebarExpanded((v) => !v)}
          me={me}
          notifications={navCounts?.notifications ?? 0}
          personaRole={personaRole}
        />
        <div className="flex min-h-0 flex-1">
          <AppSidebar expanded={sidebarExpanded} insightsOpen={navCounts?.insightsOpen ?? 0} />
          <main className="min-w-0 flex-1 overflow-y-auto bg-canvas">
            <div
              className="mx-auto flex flex-col gap-[clamp(8px,1.4vh,18px)] py-3"
              style={{ paddingInline: "clamp(12px,1.6vw,28px)" }}
            >
              <Outlet context={{ controller, setPersonaRole } satisfies OutletContext} />
            </div>
          </main>
        </div>
      </div>
      <AssistantPanel
        hidden={assistantHidden}
        onHide={() => setAssistantHidden(true)}
        onShow={() => setAssistantHidden(false)}
        onNewChat={resetThread}
        messages={messages}
        suggestions={suggestions}
        onSuggestion={handleSuggestion}
        onComposerSubmit={handleComposerSubmit}
      />
    </div>
  )
}

export interface OutletContext {
  controller: AssistantController
  setPersonaRole: (role: string) => void
}
