import { LayoutGrid, Sparkles } from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH_COLLAPSED = 64
const SIDEBAR_WIDTH_EXPANDED = 248

export function sidebarWidth(expanded: boolean) {
  return expanded ? SIDEBAR_WIDTH_EXPANDED : SIDEBAR_WIDTH_COLLAPSED
}

export function AppSidebar({ expanded, insightsOpen }: { expanded: boolean; insightsOpen: number }) {
  return (
    <aside
      style={{ width: sidebarWidth(expanded) }}
      className="flex shrink-0 flex-col border-r border-border bg-sidebar transition-[width] duration-150"
    >
      <nav className="flex flex-1 flex-col gap-1 p-2.5">
        <SidebarLink to="/" icon={LayoutGrid} label="Dashboard" expanded={expanded} end />
        <SidebarLink
          to="/insights"
          icon={Sparkles}
          label="Insights"
          expanded={expanded}
          count={insightsOpen}
        />
      </nav>
      {expanded && (
        <div className="px-3 pb-3 text-[10.5px] leading-snug text-muted-foreground">
          SCM Buddy © 2026 L&T Construction. All Rights Reserved
        </div>
      )}
    </aside>
  )
}

function SidebarLink({
  to,
  icon: Icon,
  label,
  expanded,
  count,
  end,
}: {
  to: string
  icon: typeof LayoutGrid
  label: string
  expanded: boolean
  count?: number
  end?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "relative flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] font-medium text-muted-foreground transition-colors hover:bg-white/60",
          isActive && "bg-[#e2ebf5] text-primary hover:bg-[#e2ebf5]",
        )
      }
    >
      <span className="relative flex shrink-0 items-center justify-center">
        <Icon className="size-[18px]" />
        {!expanded && count ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-0.5 text-[8.5px] font-bold text-primary-foreground">
            {count}
          </span>
        ) : null}
      </span>
      {expanded && <span className="flex-1 truncate">{label}</span>}
      {expanded && count ? (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9.5px] font-bold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </NavLink>
  )
}
