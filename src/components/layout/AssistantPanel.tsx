import {
  ArrowLeft,
  ArrowUp,
  Bot,
  Check,
  ChevronRight,
  Circle,
  FileSpreadsheet,
  History,
  Paperclip,
  Plus,
  Search,
  TriangleAlert,
  X,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { toneClasses } from "@/lib/tone"
import { cn } from "@/lib/utils"
import type { AssistantSuggestion, HistoryItem } from "@/types/api"
import type {
  ChatAdvisories,
  ChatInfoCard,
  ChatMaterialOption,
  ChatMessage,
  ChatSourcing,
  DraftDoc,
} from "./assistant-types"

export const ASSISTANT_RAIL_WIDTH = 64
export const ASSISTANT_PANEL_WIDTH = "clamp(340px, 32%, 560px)"

export function AssistantPanel({
  hidden,
  onHide,
  onShow,
  onNewChat,
  messages,
  suggestions,
  onSuggestion,
  onComposerSubmit,
  draftDoc,
  history,
  onResumeHistory,
}: {
  hidden: boolean
  onHide: () => void
  onShow: () => void
  onNewChat: () => void
  messages: ChatMessage[]
  suggestions: AssistantSuggestion[]
  onSuggestion: (s: AssistantSuggestion) => void
  onComposerSubmit: (text: string, fileNames?: string[]) => void
  draftDoc?: DraftDoc | null
  history: HistoryItem[]
  onResumeHistory: (item: HistoryItem) => void
}) {
  const [historyOpen, setHistoryOpen] = useState(false)

  if (hidden) {
    return (
      <div
        style={{ width: ASSISTANT_RAIL_WIDTH }}
        className="flex shrink-0 flex-col items-center justify-end border-l border-border bg-card py-4"
      >
        <button
          onClick={onShow}
          className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-brand-hover"
          aria-label="Show SCM Buddy panel"
        >
          <Bot className="size-5" />
        </button>
      </div>
    )
  }

  return (
    <div
      style={{ width: ASSISTANT_PANEL_WIDTH }}
      className="flex min-w-[340px] shrink-0 flex-col border-l border-border bg-card"
    >
      <PanelHeader
        onNewChat={() => {
          onNewChat()
          setHistoryOpen(false)
        }}
        onHide={onHide}
        historyOpen={historyOpen}
        historyCount={`${history.length} conversation${history.length === 1 ? "" : "s"} · last 30 days`}
        onToggleHistory={() => setHistoryOpen((v) => !v)}
        onCloseHistory={() => setHistoryOpen(false)}
      />
      {draftDoc && !historyOpen && <DraftDocCard doc={draftDoc} />}
      <div className="flex-1 overflow-y-auto">
        {historyOpen ? (
          <ChatHistoryView
            items={history}
            onResume={(item) => {
              onResumeHistory(item)
              setHistoryOpen(false)
            }}
          />
        ) : messages.length === 0 ? (
          <EmptyState suggestions={suggestions} onSuggestion={onSuggestion} />
        ) : (
          <Thread messages={messages} />
        )}
      </div>
      <Composer onSubmit={onComposerSubmit} />
    </div>
  )
}

function PanelHeader({
  onNewChat,
  onHide,
  historyOpen,
  historyCount,
  onToggleHistory,
  onCloseHistory,
}: {
  onNewChat: () => void
  onHide: () => void
  historyOpen: boolean
  historyCount: string
  onToggleHistory: () => void
  onCloseHistory: () => void
}) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-3.5">
      {historyOpen ? (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            onClick={onCloseHistory}
            aria-label="Back to chat"
            className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
          >
            <ArrowLeft className="size-3.5" />
          </button>
          <div className="min-w-0 leading-tight">
            <div className="truncate font-14 font-semibold text-foreground">Chat history</div>
            <div className="truncate font-10 text-muted-foreground">{historyCount}</div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Bot className="size-[18px]" />
            <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border-2 border-card bg-tone-green-icon" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="truncate font-14 font-semibold text-foreground">SCM Buddy</div>
            <div className="truncate font-10 text-muted-foreground">Online · start and finish work here</div>
          </div>
        </>
      )}
      <Button size="sm" onClick={onNewChat} className="h-7 shrink-0 gap-1 px-2.5 font-12">
        <Plus className="size-3.5" />
        New
      </Button>
      <button
        onClick={onToggleHistory}
        aria-pressed={historyOpen}
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-md transition-colors",
          historyOpen ? "bg-tone-blue-bg text-tone-blue-fg" : "text-muted-foreground hover:bg-muted",
        )}
        aria-label="Chat history"
      >
        <History className="size-4" />
      </button>
      <button
        onClick={onHide}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
        aria-label="Hide panel"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

function ChatHistoryView({ items, onResume }: { items: HistoryItem[]; onResume: (item: HistoryItem) => void }) {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const hits = items.filter((h) => !q || `${h.title} ${h.snippet} ${h.ref} ${h.job}`.toLowerCase().includes(q))

  const groups: { day: string; rows: HistoryItem[] }[] = []
  for (const h of hits) {
    let group = groups.find((g) => g.day === h.day)
    if (!group) {
      group = { day: h.day, rows: [] }
      groups.push(group)
    }
    group.rows.push(h)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-border px-3.5 py-2.5">
        <div
          className={cn(
            "flex h-9 items-center gap-2 rounded-lg border px-2.5",
            query ? "border-tone-blue-border" : "border-border",
          )}
        >
          <Search className="size-3.5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations, PR or RFQ numbers"
            className="min-w-0 flex-1 bg-transparent font-12 text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-2.5" />
            </button>
          )}
        </div>
        {query && (
          <div className="mt-1.5 font-12 text-muted-foreground">
            {hits.length === 0
              ? `No matches for "${query.trim()}"`
              : hits.length === 1
                ? "1 conversation"
                : `${hits.length} conversations`}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-3.5 py-3">
        <div className="flex flex-col gap-3.5">
          {groups.map((g) => (
            <div key={g.day}>
              <div className="mb-1.5 flex items-center gap-2 px-0.5">
                <span className="font-10 tracking-[0.07em] text-muted-foreground uppercase">{g.day}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="font-10 text-muted-foreground">
                  {g.rows.length === 1 ? "1 chat" : `${g.rows.length} chats`}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {g.rows.map((row) => (
                  <button
                    key={row.id}
                    onClick={() => onResume(row)}
                    className="block w-full rounded-lg border border-border bg-card px-2.5 py-2.5 text-left transition-colors hover:border-tone-blue-border hover:bg-tone-blue-bg"
                  >
                    <div className="flex items-baseline justify-between gap-2.5">
                      <span className="font-12 font-semibold text-foreground">{row.title}</span>
                      <span className="shrink-0 font-10 text-muted-foreground">{row.time}</span>
                    </div>
                    <div className="mt-0.5 font-12 leading-[1.5] text-muted-foreground">{row.snippet}</div>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="rounded-md border border-tone-blue-border bg-tone-blue-bg px-1.5 py-0.5 font-10 text-tone-blue-fg">
                        {row.ref}
                      </span>
                      <span className="font-10 text-muted-foreground">{row.messageCount}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {hits.length === 0 && (
            <div className="mt-4 px-3 text-center">
              <div className="mx-auto mb-3 flex size-9 items-center justify-center rounded-xl border border-border bg-card">
                <Search className="size-4 text-muted-foreground" />
              </div>
              <div className="font-14 font-semibold text-foreground">No conversations match</div>
              <p className="mt-1 font-12 leading-[1.5] text-muted-foreground">
                Try a PR or RFQ number, a job code, or a material name.
              </p>
            </div>
          )}
          {hits.length > 0 && (
            <p className="font-12 leading-snug text-muted-foreground">Conversations older than 90 days are archived.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function DraftDocCard({ doc }: { doc: DraftDoc }) {
  return (
    <div className="shrink-0 border-b border-border bg-card px-3.5 py-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[12px] font-semibold text-primary">{doc.title}</span>
        <span className="text-[9px] font-semibold tracking-wide text-muted-foreground uppercase">{doc.badge}</span>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        {doc.rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center justify-between gap-2 px-3 py-1.5 text-[11.5px]",
              i !== doc.rows.length - 1 && "border-b border-border",
            )}
          >
            <span className="text-muted-foreground">{row.label}</span>
            <span className="flex items-center gap-1.5">
              {row.auto && (
                <span className="rounded bg-tone-blue-bg px-1 py-0.5 text-[9px] font-semibold text-tone-blue-fg">
                  AUTO
                </span>
              )}
              <span className="font-semibold text-foreground">{row.value}</span>
            </span>
          </div>
        ))}
      </div>
      {doc.warning ? (
        <p className="mt-1.5 flex items-start gap-1 text-[10.5px] font-medium text-tone-amber-fg">
          <TriangleAlert className="mt-px size-3 shrink-0" />
          {doc.warning}
        </p>
      ) : doc.note ? (
        <p className="mt-1.5 text-[10.5px] text-muted-foreground">{doc.note}</p>
      ) : null}
    </div>
  )
}

function EmptyState({
  suggestions,
  onSuggestion,
}: {
  suggestions: AssistantSuggestion[]
  onSuggestion: (s: AssistantSuggestion) => void
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-8">
      <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-card">
        <Bot className="size-6 text-primary" />
      </div>
      <div className="text-center">
        <div className="font-18 font-semibold text-foreground">How can I help today?</div>
        <div className="mt-1 font-12 text-muted-foreground">
          Ask about purchase requests, RFQs, approvals or orders.
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col gap-2">
        {suggestions.map((s) => (
          <button
            key={s.id}
            onClick={() => onSuggestion(s)}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-3.5 py-2.5 text-left font-12 font-medium text-foreground transition-colors hover:border-tone-blue-border hover:bg-tone-blue-bg"
          >
            {s.label}
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

function Thread({ messages }: { messages: ChatMessage[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" })
  }, [messages.length]);

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] rounded-xl bg-primary px-3 py-2.5 font-12 leading-[1.55] whitespace-pre-line text-primary-foreground">
          {message.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Bot className="size-3.5" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {message.text && (
          <div className="rounded-xl bg-muted px-3 py-2.5 font-12 leading-[1.55] whitespace-pre-line text-foreground">
            {message.text}
          </div>
        )}
        {message.doc && (
          <div className="overflow-hidden rounded-lg border border-border bg-card font-12">
            <DocRow label="Document" value={message.doc.ref} mono />
            <DocRow label="Scope" value={message.doc.scope} mono />
            <DocRow label="Value" value={message.doc.value} mono last />
          </div>
        )}
        {message.materialOptions && message.materialOptions.length > 0 && (
          <MaterialOptions options={message.materialOptions} note={message.materialNote} />
        )}
        {message.infoCard && <InfoCard card={message.infoCard} />}
        {message.advisories && <Advisories block={message.advisories} />}
        {message.sourcing && <SourcingBlock sourcing={message.sourcing} />}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.actions.map((a) => (
              <button
                key={a.label}
                onClick={a.onClick}
                className={cn(
                  "flex h-8 items-center gap-1 rounded-lg px-3 font-12 font-semibold transition-colors",
                  a.primary
                    ? "bg-primary text-primary-foreground hover:bg-brand-hover"
                    : "border border-border bg-card text-foreground hover:bg-muted",
                )}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MaterialOptions({ options, note }: { options: ChatMaterialOption[]; note?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={o.onClick}
          className="flex flex-col gap-0.5 rounded-lg border border-border bg-card px-3 py-2 text-left transition-colors hover:border-tone-blue-border hover:bg-tone-blue-bg"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-semibold text-primary">{o.code}</span>
            {o.tag && (
              <span className="rounded bg-tone-grey-bg px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-tone-grey-fg uppercase">
                {o.tag}
              </span>
            )}
          </div>
          <div className="text-[11.5px] font-medium text-foreground">{o.name}</div>
          <div className="text-[10.5px] text-muted-foreground">{o.meta}</div>
        </button>
      ))}
      {note && <p className="text-[10px] leading-snug text-tone-amber-fg">{note}</p>}
    </div>
  )
}

function InfoCard({ card }: { card: ChatInfoCard }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card px-3 py-2.5">
      <div className="mb-2 text-[11.5px] font-semibold text-foreground">{card.title}</div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {card.fields.map((f) => (
          <div key={f.label} className="min-w-0">
            <div className="text-[10px] text-muted-foreground">{f.label}</div>
            <div className="truncate text-[11.5px] font-semibold text-foreground">{f.value}</div>
          </div>
        ))}
      </div>
      {card.note && <p className="mt-2 text-[10.5px] text-muted-foreground">{card.note}</p>}
    </div>
  )
}

function Advisories({ block }: { block: ChatAdvisories }) {
  return (
    <div className="overflow-hidden rounded-lg border border-tone-amber-border bg-tone-amber-bg px-3 py-2.5">
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-tone-amber-fg uppercase">
        <TriangleAlert className="size-3" />
        {block.title}
      </div>
      <div className="flex flex-col gap-2">
        {block.items.map((item) => (
          <div key={item.title}>
            <div className="text-[11.5px] font-semibold text-tone-amber-fg">{item.title}</div>
            <div className="text-[10.5px] leading-snug text-foreground">{item.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SourcingBlock({ sourcing }: { sourcing: ChatSourcing }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card px-3 py-2.5">
      <div>
        <div className="text-[12px] font-semibold text-foreground">{sourcing.header}</div>
        <div className="text-[10.5px] text-muted-foreground">{sourcing.subtitle}</div>
      </div>
      <div className="flex flex-col gap-1.5">
        {sourcing.options.map((o) => {
          const tone = toneClasses(o.tagTone)
          const selected = sourcing.selectable && sourcing.selectedId === o.id
          const clickable = !!o.onSelect && !o.disabled
          return (
            <div
              key={o.id}
              role={clickable ? "button" : undefined}
              onClick={clickable ? o.onSelect : undefined}
              className={cn(
                "flex items-start gap-2 rounded-lg border px-2.5 py-2",
                o.disabled ? "border-border bg-muted opacity-60" : "border-border bg-card",
                selected && "border-tone-blue-border bg-tone-blue-bg",
                clickable && "cursor-pointer",
              )}
            >
              {sourcing.selectable && !o.disabled && (
                <span className="mt-0.5 shrink-0 text-primary">
                  {selected ? <Check className="size-3.5" /> : <Circle className="size-3.5 text-muted-foreground" />}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-foreground">
                    {o.label}
                    {o.tag && (
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase",
                          tone.bg,
                          tone.fg,
                        )}
                      >
                        {o.tag}
                      </span>
                    )}
                  </span>
                  {o.landedValue && (
                    <span
                      className={cn(
                        "font-mono text-[11.5px] font-semibold",
                        o.disabled ? "text-muted-foreground line-through" : "text-primary",
                      )}
                    >
                      {o.landedValue}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[10.5px] text-muted-foreground">{o.breakdown}</div>
              </div>
            </div>
          )
        })}
      </div>
      {sourcing.warningTitle && (
        <div className="flex items-start gap-1.5 rounded-lg border border-tone-red-border bg-tone-red-bg px-2.5 py-2">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-tone-red-icon" />
          <div>
            <div className="text-[11px] font-semibold text-tone-red-fg">{sourcing.warningTitle}</div>
            <div className="text-[10.5px] leading-snug text-tone-red-fg">{sourcing.warningBody}</div>
          </div>
        </div>
      )}
      {sourcing.bestCostValue && (
        <div>
          <div className="text-[9.5px] font-semibold tracking-wide text-muted-foreground uppercase">
            {sourcing.bestCostLabel}
          </div>
          <div className="text-[11px] text-foreground">{sourcing.bestCostValue}</div>
        </div>
      )}
      {sourcing.deliveryImpact && (
        <div>
          <div className="text-[9.5px] font-semibold tracking-wide text-muted-foreground uppercase">
            {sourcing.deliveryImpactLabel}
          </div>
          <div className="text-[11px] text-foreground">{sourcing.deliveryImpact}</div>
        </div>
      )}
      {sourcing.cta && (
        <button
          onClick={sourcing.cta.onClick}
          className="mt-1 flex h-9 items-center justify-center rounded-lg bg-primary text-[12px] font-semibold text-primary-foreground transition-colors hover:bg-brand-hover"
        >
          {sourcing.cta.label}
        </button>
      )}
    </div>
  )
}

function DocRow({ label, value, mono, last }: { label: string; value: string; mono?: boolean; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-3 py-2", !last && "border-b border-border")}>
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold text-foreground", mono && "font-mono")}>{value}</span>
    </div>
  )
}

const ACCEPTED_FILE_TYPES = ".xlsx,.xls,.csv,.pdf"

function Composer({ onSubmit }: { onSubmit: (text: string, fileNames?: string[]) => void }) {
  const [value, setValue] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return
    setFiles((prev) => [...prev, ...Array.from(list)])
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  function submit() {
    const trimmed = value.trim()
    if (!trimmed && files.length === 0) return
    onSubmit(trimmed, files.length > 0 ? files.map((f) => f.name) : undefined)
    setValue("")
    setFiles([])
  }

  return (
    <div className="shrink-0 border-t border-border p-3">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={cn(
          "flex flex-col gap-2 rounded-xl border px-2.5 py-2 transition-colors",
          isDragging ? "border-tone-blue-border bg-tone-blue-bg" : "border-border bg-card",
        )}
      >
        {files.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {files.map((file, i) => (
              <span
                key={`${file.name}-${i}`}
                className="flex items-center gap-1.5 rounded-md border border-border bg-muted py-1 pr-1 pl-2 font-10 text-foreground"
              >
                <FileSpreadsheet className="size-3 shrink-0 text-muted-foreground" />
                <span className="max-w-35 truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${file.name}`}
                  className="flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        <div className="flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES}
            onChange={(e) => {
              addFiles(e.target.files)
              e.target.value = ""
            }}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            aria-label="Attach a file"
          >
            <Paperclip className="size-4" />
          </button>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            rows={1}
            placeholder="Ask about PRs, RFQs, orders…"
            className="max-h-24 flex-1 resize-none bg-transparent font-12 leading-[1.45] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={submit}
            className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-brand-hover disabled:opacity-40"
            aria-label="Send"
            disabled={!value.trim() && files.length === 0}
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
      <p className="mt-2 flex items-start gap-1 font-10 leading-snug text-muted-foreground">
        Excel sheets and HPC PDFs can be dropped here — values from a file are confirmed before they commit.
      </p>
    </div>
  )
}
