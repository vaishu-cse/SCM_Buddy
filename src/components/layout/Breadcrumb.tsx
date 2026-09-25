import { ChevronRight, Home } from "lucide-react"
import { Link } from "react-router-dom"

export function Breadcrumb({ page, parentPage }: { page: string; parentPage?: string }) {
  return (
    <div className="flex items-center gap-1.5 font-12 text-muted-foreground">
      <Home className="size-3.5" />
      {parentPage ? (
        <>
          <ChevronRight className="size-3.5" />
          {parentPage === "Dashboard" ? (
            <Link to="/" className="text-foreground transition-colors hover:text-primary">
              {parentPage}
            </Link>
          ) : (
            <span className="text-foreground">{parentPage}</span>
          )}
        </>
      ) : null}
      <ChevronRight className="size-3.5" />
      <span className="font-semibold text-foreground">{page}</span>
    </div>
  )
}
