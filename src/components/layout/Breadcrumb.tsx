import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb({ page }: { page: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
      <Home className="size-3.5" />
      <ChevronRight className="size-3.5" />
      <span className="font-semibold text-foreground">{page}</span>
    </div>
  )
}
