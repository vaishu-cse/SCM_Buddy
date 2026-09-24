import type { Tone } from "@/types/dashboard"

export interface ToneClasses {
  bg: string
  border: string
  fg: string
  icon: string
}

const TONES: Record<Tone, ToneClasses> = {
  red: { bg: "bg-tone-red-bg", border: "border-tone-red-border", fg: "text-tone-red-fg", icon: "text-tone-red-icon" },
  amber: {
    bg: "bg-tone-amber-bg",
    border: "border-tone-amber-border",
    fg: "text-tone-amber-fg",
    icon: "text-tone-amber-icon",
  },
  green: {
    bg: "bg-tone-green-bg",
    border: "border-tone-green-border",
    fg: "text-tone-green-fg",
    icon: "text-tone-green-icon",
  },
  blue: {
    bg: "bg-tone-blue-bg",
    border: "border-tone-blue-border",
    fg: "text-tone-blue-fg",
    icon: "text-tone-blue-icon",
  },
  grey: {
    bg: "bg-tone-grey-bg",
    border: "border-tone-grey-border",
    fg: "text-tone-grey-fg",
    icon: "text-tone-grey-icon",
  },
}

export function toneClasses(tone: Tone | undefined): ToneClasses {
  return TONES[tone ?? "grey"]
}
