import { cn } from "@/lib/utils"
import type { PersonaKey } from "@/types/dashboard"

const OPTIONS: { key: PersonaKey; label: string }[] = [
  { key: "site", label: "Site Buyer" },
  { key: "cat", label: "Category Manager" },
  { key: "head", label: "SCM Head" },
]

export function PersonaSwitcher({
  value,
  onChange,
}: {
  value: PersonaKey
  onChange: (p: PersonaKey) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground">PERSONA</span>
      <div className="flex gap-0.5 rounded-lg bg-segment p-0.5">
        {OPTIONS.map((o) => (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={cn(
              "rounded-md px-2.5 py-1 text-[11.5px] font-semibold text-muted-foreground transition-colors",
              value === o.key && "bg-white text-foreground shadow-sm",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
