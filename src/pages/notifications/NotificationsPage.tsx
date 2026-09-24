import { Bell } from "lucide-react"
import { Breadcrumb } from "@/components/layout/Breadcrumb"

export function NotificationsPage() {
  return (
    <>
      <Breadcrumb page="Notifications" />
      <div className="flex flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-border bg-white py-16 text-center">
        <Bell className="size-6 text-muted-foreground" />
        <div className="text-[13px] font-medium text-foreground">Notifications feed</div>
        <div className="max-w-sm text-[11.5px] text-muted-foreground">
          This screen is being built separately. It will list activity from the bell icon in the header.
        </div>
      </div>
    </>
  )
}
