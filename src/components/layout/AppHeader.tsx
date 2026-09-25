import { Bell, ChevronDown, LogOut, Moon, PanelLeftClose, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/lib/use-theme"
import { cn } from "@/lib/utils"
import type { Me } from "@/types/api"
import { sidebarWidth } from "./AppSidebar"

export function AppHeader({
  sidebarExpanded,
  onToggleSidebar,
  me,
  notifications,
  personaRole,
}: {
  sidebarExpanded: boolean
  onToggleSidebar: () => void
  me: Me | null
  notifications: number
  personaRole: string
}) {
  const navigate = useNavigate()

  return (
    <header className="flex h-14 shrink-0 border-b border-border bg-card">
      <div
        style={{ width: sidebarWidth(sidebarExpanded) }}
        className="flex shrink-0 items-center gap-2 border-r border-border bg-sidebar px-3 transition-[width] duration-150"
      >
        <button
          onClick={onToggleSidebar}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-dark font-10 font-bold tracking-tight text-white"
          aria-label="Toggle sidebar"
        >
          L&amp;T
        </button>
        {sidebarExpanded && (
          <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
            <div className="min-w-0 leading-tight">
              <div className="truncate font-14 font-bold text-brand-dark">SCM Buddy</div>
              <div className="truncate font-10 tracking-[0.08em] text-muted-foreground">SUPPLY CHAIN</div>
            </div>
            <button
              onClick={onToggleSidebar}
              className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="size-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-3 px-4">
        <button
          onClick={() => navigate("/notifications")}
          className="relative flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />
          {notifications > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-10 font-bold text-white">
              {notifications}
            </span>
          )}
        </button>

        <div className="h-6 w-px shrink-0 bg-border" />

        <ProfileMenu me={me} personaRole={personaRole} />
      </div>
    </header>
  )
}

function ProfileMenu({ me, personaRole }: { me: Me | null; personaRole: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex shrink-0 items-center gap-2 rounded-lg px-1.5 py-1 outline-none cursor-pointer">
        <div className="hidden text-right leading-tight sm:block">
          <div className="font-14 font-semibold text-foreground">{me?.name ?? "…"}</div>
          <div className="font-10 text-muted-foreground">{me?.lastLogin ?? ""}</div>
        </div>
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-12 font-bold text-primary-foreground">
          {me?.initials ?? ""}
        </div>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[232px]">
        <div className="px-2 py-1.5">
          <div className="font-14 font-semibold text-foreground">{me?.name}</div>
          <div className="font-10 text-muted-foreground">
            PS {me?.psNo} · {personaRole}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2">Profile</DropdownMenuItem>
        <DropdownMenuItem className="py-2">Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="font-12 text-muted-foreground">Theme</span>
          <div className="flex gap-0.5 rounded-md bg-segment p-0.5">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 font-12 font-medium text-muted-foreground",
                theme === "light" && "bg-card text-foreground shadow-sm",
              )}
            >
              <Sun className="size-3" />
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-1 font-12 font-medium text-muted-foreground",
                theme === "dark" && "bg-card text-foreground shadow-sm",
              )}
            >
              <Moon className="size-3" />
              Dark
            </button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut className="size-3.5" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
