import { ArrowUp, Bot, ChevronRight, FileText, History, Paperclip, Plus, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { AssistantSuggestion } from "@/types/api"
import type { ChatMessage } from "./assistant-types"

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
}: {
  hidden: boolean
  onHide: () => void
  onShow: () => void
  onNewChat: () => void
  messages: ChatMessage[]
  suggestions: AssistantSuggestion[]
  onSuggestion: (s: AssistantSuggestion) => void
  onComposerSubmit: (text: string) => void
}) {
  if (hidden) {
    return (
      <div
        style={{ width: ASSISTANT_RAIL_WIDTH }}
        className="flex shrink-0 flex-col items-center justify-end border-l border-border bg-sidebar py-4"
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
      className="flex min-w-[340px] shrink-0 flex-col border-l border-border bg-sidebar"
    >
      <PanelHeader onNewChat={onNewChat} onHide={onHide} />
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState suggestions={suggestions} onSuggestion={onSuggestion} />
        ) : (
          <Thread messages={messages} />
        )}
      </div>
      <Composer onSubmit={onComposerSubmit} />
    </div>
  )
}

function PanelHeader({ onNewChat, onHide }: { onNewChat: () => void; onHide: () => void }) {
  return (
    <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-border px-3.5">
      <div className="relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Bot className="size-[18px]" />
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border-2 border-sidebar bg-tone-green-icon" />
      </div>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate font-14 font-semibold text-foreground">SCM Buddy</div>
        <div className="truncate font-10 text-muted-foreground">Online · start and finish work here</div>
      </div>
      <Button size="sm" onClick={onNewChat} className="h-7 gap-1 px-2.5 font-12">
        <Plus className="size-3.5" />
        New
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
            aria-label="History"
          >
            <History className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>No previous conversations yet</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <div className="max-w-[82%] rounded-xl bg-primary px-3 py-2.5 font-12 leading-[1.55] text-primary-foreground">
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
          <div className="rounded-xl bg-muted px-3 py-2.5 font-12 leading-[1.55] text-foreground">
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

function DocRow({ label, value, mono, last }: { label: string; value: string; mono?: boolean; last?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between px-3 py-2", !last && "border-b border-border")}>
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold text-foreground", mono && "font-mono")}>{value}</span>
    </div>
  )
}

function Composer({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [value, setValue] = useState("")

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setValue("")
  }

  return (
    <div className="shrink-0 border-t border-border p-3">
      <div className="flex items-end gap-2 rounded-xl border border-border bg-card px-2.5 py-2">
        <button
          type="button"
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
          disabled={!value.trim()}
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
      <p className="mt-2 flex items-start gap-1 font-10 leading-snug text-muted-foreground">
        <FileText className="mt-px size-3 shrink-0" />
        Excel sheets and HPC PDFs can be dropped here — values from a file are confirmed before they commit.
      </p>
    </div>
  )
}
