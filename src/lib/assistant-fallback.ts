import type { ResolveRequest } from "@/components/layout/assistant-types"

function lowerFirst(text: string) {
  return text.length ? text[0].toLowerCase() + text.slice(1) : text
}

export function fallbackWhy(req: ResolveRequest) {
  const parts = [req.sub, req.age].filter(Boolean)
  return parts.length ? `Flagged from ${parts.join(" · ")}.` : `Flagged on ${req.scope}.`
}

export function fallbackOffer(req: ResolveRequest) {
  return `Say the word and I'll ${lowerFirst(req.cta)} for ${req.ref ?? "this"}.`
}

export function fallbackDone(req: ResolveRequest) {
  return `Done. ${req.ref ?? req.title} has been updated.`
}
