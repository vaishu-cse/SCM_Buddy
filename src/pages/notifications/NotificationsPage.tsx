import { Bell, Check, ChevronDown, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Breadcrumb } from "@/components/layout/Breadcrumb"
import type { OutletContext } from "@/components/layout/AppLayout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { getIcon } from "@/lib/icon-map"
import { getNotifications, markNotificationsRead } from "@/lib/api"
import { toneClasses } from "@/lib/tone"
import { cn } from "@/lib/utils"
import type { NotificationBucket, NotificationItem, NotificationTab } from "@/types/notifications"

const BUCKET_ORDER: NotificationBucket[] = ["Today", "Yesterday", "Earlier this week"]

const TABS: { key: NotificationTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "updates", label: "Updates" },
  { key: "actions", label: "Your actions" },
]

export function NotificationsPage() {
  const { markNotificationsRead: clearHeaderBadge } = useOutletContext<OutletContext>()

  const [items, setItems] = useState<NotificationItem[] | null>(null)
  const [tab, setTab] = useState<NotificationTab>("all")
  const [jobFilter, setJobFilter] = useState("all")
  const [markedRead, setMarkedRead] = useState(false)

  useEffect(() => {
    let cancelled = false
    getNotifications().then((data) => {
      if (!cancelled) setItems(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const jobs = useMemo(
    () => (items ? Array.from(new Set(items.map((i) => i.job))).sort() : []),
    [items],
  )

  const filtered = useMemo(() => {
    if (!items) return []
    return items
      .filter((i) => jobFilter === "all" || i.job === jobFilter)
      .filter((i) => tab === "all" || (tab === "updates" ? i.who === "Update" : i.who === "You"))
  }, [items, jobFilter, tab])

  const groups = useMemo(
    () =>
      BUCKET_ORDER.map((bucket) => ({ bucket, items: filtered.filter((i) => i.bucket === bucket) })).filter(
        (g) => g.items.length > 0,
      ),
    [filtered],
  )

  async function handleMarkAllRead() {
    setMarkedRead(true)
    clearHeaderBadge()
    await markNotificationsRead()
  }

  if (!items) {
    return (
      <>
        <Breadcrumb page="Notifications" />
        <div className="py-10 text-center font-12 text-muted-foreground">Loading notifications…</div>
      </>
    )
  }

  const scopeLabel = jobFilter === "all" ? "all jobs" : jobFilter

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Breadcrumb page="Notifications" />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={markedRead}>
            <Check className="size-3.5" />
            {markedRead ? "All read" : "Mark all read"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {jobFilter === "all" ? "All jobs" : jobFilter}
                <ChevronDown className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={jobFilter} onValueChange={setJobFilter}>
                <DropdownMenuRadioItem value="all">All jobs</DropdownMenuRadioItem>
                {jobs.map((job) => (
                  <DropdownMenuRadioItem key={job} value={job}>
                    {job}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-0.5 rounded-lg bg-segment p-0.5">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-md px-2.5 py-1 font-12 font-semibold text-muted-foreground transition-colors",
                tab === t.key && "bg-white text-foreground shadow-sm",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="font-12 text-muted-foreground">
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "notification" : "notifications"} · {scopeLabel}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-border bg-white py-16 text-center">
          <Bell className="size-6 text-muted-foreground" />
          <div className="font-14 font-medium text-foreground">No notifications</div>
          <div className="max-w-sm font-12 text-muted-foreground">
            Nothing matches these filters. Try a different tab or job.
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map((group) => (
            <NotificationGroup key={group.bucket} bucket={group.bucket} items={group.items} />
          ))}
        </div>
      )}
    </>
  )
}

function NotificationGroup({ bucket, items }: { bucket: NotificationBucket; items: NotificationItem[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-0.5">
        <span className="font-10 font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {bucket}
        </span>
        <span className="font-10 text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="rounded-[10px] border border-border bg-white shadow-[0_2px_8px_-2px_rgba(15,44,77,.10),0_1px_2px_rgba(15,44,77,.05)]">
        {items.map((item, i) => (
          <div key={item.id}>
            <NotificationRow item={item} />
            {i < items.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationRow({ item }: { item: NotificationItem }) {
  const Icon = getIcon(item.icon)
  const tone = toneClasses(item.tone)

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className={cn("size-3.5", tone.icon)} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-12 text-foreground">
          {item.pre}
          {item.ref && <span className="font-semibold">{item.ref}</span>}
          {item.mid}
          {item.strong && <span className="font-semibold">{item.strong}</span>}
          {item.post}
        </p>
        <div className="mt-0.5 truncate font-10 text-muted-foreground">
          {item.when} · {item.job} · {item.kind}
        </div>
      </div>
      <Badge
        variant="outline"
        className={cn(
          "shrink-0 rounded-[5px] font-10 font-semibold uppercase tracking-[0.03em]",
          item.who === "You"
            ? "border-tone-blue-border bg-tone-blue-bg text-tone-blue-fg"
            : "border-border bg-transparent text-muted-foreground",
        )}
      >
        {item.who}
      </Badge>
      <ChevronRight className="size-3.5 shrink-0 text-muted-foreground/50" />
    </div>
  )
}
