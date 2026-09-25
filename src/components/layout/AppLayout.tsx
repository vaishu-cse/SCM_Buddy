import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { fallbackDone, fallbackOffer, fallbackWhy } from "@/lib/assistant-fallback"
import { getAssistantSuggestions, getMe, getNavCounts } from "@/lib/api"
import {
  isCreatePrIntent,
  matchMaterial,
  parseQuantityAndDate,
  PR_MATERIALS,
  type PrMaterial,
} from "@/lib/pr-flow-data"
import type { AssistantSuggestion, Me, NavCounts } from "@/types/api"
import { AppHeader } from "./AppHeader"
import { AppSidebar } from "./AppSidebar"
import { AssistantPanel } from "./AssistantPanel"
import type {
  AssistantController,
  ChatMessage,
  ChatSourcing,
  DraftDoc,
  ResolveRequest,
} from "./assistant-types"

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

  const [draftDoc, setDraftDoc] = useState<DraftDoc | null>(null)
  const [prStage, setPrStage] = useState<"idle" | "awaiting-material" | "awaiting-quantity-custom">("idle")
  const [activeMaterial, setActiveMaterial] = useState<PrMaterial | null>(null)

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
    clearPrFlow()
  }

  function clearPrFlow() {
    setDraftDoc(null)
    setPrStage("idle")
    setActiveMaterial(null)
  }

  function markNotificationsRead() {
    setNavCounts((prev) => (prev ? { ...prev, notifications: 0 } : prev))
  }

  function clearPendingActions() {
    setMessages((prev) => prev.map((m) => ({ ...m, actions: undefined, materialOptions: undefined })))
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

  function startCreatePr(userLabel = "Create a PR") {
    setAssistantHidden(false)
    clearPrFlow()
    setDraftDoc({
      title: "Draft Purchase Request",
      badge: "Creates in EIP via API",
      rows: [
        { label: "Job", value: "LDM02128", auto: true },
        { label: "Warehouse", value: "WH-CHN-03", auto: true },
        { label: "Budget head", value: "Steel & Rebar · ₹42.6 L free", auto: true },
      ],
      note: "Job, warehouse and budget already known",
    })
    setMessages([
      { id: nextId(), from: "user", text: userLabel },
      {
        id: nextId(),
        from: "buddy",
        text: "Picked up from your login: LDM02128 and WH-CHN-03 — your only job and its only warehouse. Budget on Steel & Rebar is ₹42.6 L free and the JCR is current, so I won't ask about either.\n\nStandard purchase, or a DC transfer from another site?",
        actions: [
          { label: "Standard purchase", primary: true, onClick: () => choosePurchaseType("standard") },
          { label: "DC transfer from another site", onClick: () => choosePurchaseType("dc") },
        ],
      },
    ])
  }

  function choosePurchaseType(type: "standard" | "dc") {
    clearPendingActions()
    if (type === "dc") {
      setDraftDoc((prev) => (prev ? { ...prev, rows: [...prev.rows, { label: "Type", value: "DC transfer" }] } : prev))
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: "user", text: "DC transfer from another site" },
        {
          id: nextId(),
          from: "buddy",
          text: 'DC transfer isn\'t scripted here yet. For now, use "Raise transfer" on an Insights card to move stock between sites — I\'ll bring this same guided flow to DC once it\'s defined.',
          actions: [{ label: "Ask something else", onClick: resetThread }],
        },
      ])
      return
    }
    setDraftDoc((prev) =>
      prev ? { ...prev, rows: [...prev.rows, { label: "Type", value: "Standard purchase" }] } : prev,
    )
    setPrStage("awaiting-material")
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: "Standard purchase" },
      {
        id: nextId(),
        from: "buddy",
        text: "What do you need? These two are still open on the material plan for this job.",
        materialOptions: PR_MATERIALS.map((m) => ({
          id: m.id,
          code: m.id,
          name: m.name,
          meta: m.suggestionMeta,
          tag: m.suggestionTag,
          onClick: () => chooseMaterial(m, m.name),
        })),
        materialNote:
          "Suggested from planned against already-ordered quantity on the site material plan. Plan feed pending L&T confirmation — free text and item codes both work meanwhile.",
      },
    ])
  }

  function chooseMaterial(material: PrMaterial, userText: string) {
    clearPendingActions()
    setActiveMaterial(material)
    setPrStage("idle")
    setDraftDoc((prev) =>
      prev
        ? {
            ...prev,
            rows: [
              ...prev.rows,
              { label: "Material", value: material.id },
              { label: "Category", value: material.category, auto: true },
              { label: "Purchase group", value: material.purchaseGroup, auto: true },
            ],
          }
        : prev,
    )
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: userText },
      {
        id: nextId(),
        from: "buddy",
        text: `${material.id} — the code carries the rest, so there is nothing to type.`,
      },
      {
        id: nextId(),
        from: "buddy",
        infoCard: {
          title: "Filled from the material code",
          fields: [
            { label: "Category", value: material.category },
            { label: "Material group", value: material.materialGroup },
            { label: "Purchase group", value: material.purchaseGroup },
            { label: "UOM", value: material.uom },
            { label: "Planning reference", value: material.planningRef },
            { label: "Last purchase", value: material.lastPurchase },
          ],
          note: "Remembered for this job — the same code is offered first next time so purchases for one item stay grouped.",
        },
      },
      {
        id: nextId(),
        from: "buddy",
        text: material.quantityPrompt,
        actions: [
          {
            label: material.quantityDefaultLabel,
            primary: true,
            onClick: () =>
              chooseQuantity(material, material.planBalanceQty, material.requiredByFull, material.quantityDefaultLabel),
          },
          { label: "Different quantity or date", onClick: () => askCustomQuantity(material) },
        ],
      },
    ])
  }

  function askCustomQuantity(material: PrMaterial) {
    clearPendingActions()
    setPrStage("awaiting-quantity-custom")
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: "Different quantity or date" },
      {
        id: nextId(),
        from: "buddy",
        text: `Tell me the quantity and date — for example "${material.quantityDefaultLabel}".`,
      },
    ])
  }

  function chooseQuantity(material: PrMaterial, qty: string, requiredByFull: string, userLabel: string) {
    clearPendingActions()
    setPrStage("idle")
    setDraftDoc((prev) =>
      prev
        ? {
            ...prev,
            rows: [...prev.rows, { label: "Quantity", value: qty }, { label: "Required by", value: requiredByFull }],
            note: undefined,
            warning: "Sourcing options — your decision",
          }
        : prev,
    )
    const sourcingMsgId = nextId()
    const s = material.sourcing
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: userLabel },
      { id: nextId(), from: "buddy", text: s.intro },
      { id: nextId(), from: "buddy", advisories: { title: s.advisoriesTitle, items: s.advisories } },
      { id: sourcingMsgId, from: "buddy", sourcing: buildSourcingBlock(material, sourcingMsgId, s.defaultSelectedId) },
    ])
  }

  function buildSourcingBlock(material: PrMaterial, msgId: string, selectedId: string): ChatSourcing {
    const s = material.sourcing
    return {
      header: s.optionsHeader,
      subtitle: s.optionsSubtitle,
      selectable: s.selectable,
      selectedId,
      options: s.options.map((o) => ({
        id: o.id,
        label: o.label,
        tag: o.tag,
        tagTone: o.tagTone,
        landedValue: o.landedValue,
        breakdown: o.breakdown,
        disabled: o.disabled,
        onSelect: !s.selectable || o.disabled ? undefined : () => selectSourcingOption(material, msgId, o.id),
      })),
      warningTitle: s.warningTitle,
      warningBody: s.warningBody,
      bestCostLabel: s.bestCostLabel,
      bestCostValue: s.bestCostValue,
      deliveryImpactLabel: s.deliveryImpactLabel,
      deliveryImpact: s.deliveryImpact,
      cta: {
        label: s.selectable ? (s.options.find((o) => o.id === selectedId)?.ctaLabel ?? "Confirm") : (s.combinedCtaLabel ?? "Confirm"),
        onClick: () => finalizeSourcing(material, msgId, selectedId),
      },
    }
  }

  function selectSourcingOption(material: PrMaterial, msgId: string, optionId: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, sourcing: buildSourcingBlock(material, msgId, optionId) } : m)),
    )
  }

  function finalizeSourcing(material: PrMaterial, msgId: string, selectedId: string) {
    const option = material.sourcing.options.find((o) => o.id === selectedId)
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.sourcing
          ? {
              ...m,
              sourcing: {
                ...m.sourcing,
                cta: undefined,
                options: m.sourcing.options.map((o) => ({ ...o, onSelect: undefined })),
              },
            }
          : m,
      ),
    )
    setDraftDoc((prev) =>
      prev
        ? {
            ...prev,
            rows: [...prev.rows, { label: "Source", value: option?.label ?? "—" }],
            warning: undefined,
            note: "Submitted to EIP",
          }
        : prev,
    )
    setPrStage("idle")
    setMessages((prev) => [
      ...prev,
      { id: nextId(), from: "user", text: option?.ctaLabel ?? material.sourcing.combinedCtaLabel ?? "Confirm" },
      {
        id: nextId(),
        from: "buddy",
        text: material.sourcing.doneMessage(selectedId),
        actions: [
          { label: "Start another PR", primary: true, onClick: () => startCreatePr() },
          { label: "Ask something else", onClick: resetThread },
        ],
      },
    ])
  }

  const controller: AssistantController = {
    openResolve(req) {
      setAssistantHidden(false)
      clearPrFlow()
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
    if (s.id === "create-pr") {
      startCreatePr(s.label)
      return
    }
    setAssistantHidden(false)
    clearPrFlow()
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

    if (prStage === "awaiting-material") {
      const material = matchMaterial(text)
      if (material) {
        chooseMaterial(material, text)
        return
      }
      setMessages((prev) => [
        ...prev,
        { id: nextId(), from: "user", text },
        {
          id: nextId(),
          from: "buddy",
          text: "That's not on the open material plan for this job — give me the item code (e.g. MAT-1000482) and I'll pull it up.",
        },
      ])
      return
    }

    if (prStage === "awaiting-quantity-custom" && activeMaterial) {
      const parsed = parseQuantityAndDate(text)
      const qty = parsed?.qty ?? activeMaterial.planBalanceQty
      const requiredBy = parsed?.date ?? activeMaterial.requiredByFull
      chooseQuantity(activeMaterial, qty, requiredBy, text)
      return
    }

    if (prStage === "idle" && !activeMaterial && isCreatePrIntent(text)) {
      startCreatePr(text)
      return
    }

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
              <Outlet context={{ controller, setPersonaRole, markNotificationsRead } satisfies OutletContext} />
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
        draftDoc={draftDoc}
      />
    </div>
  )
}

export interface OutletContext {
  controller: AssistantController
  setPersonaRole: (role: string) => void
  markNotificationsRead: () => void
}
