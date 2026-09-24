export function parseIndianCurrency(value: string): number {
  const cleaned = value.replace(/[₹,]/g, "").trim()
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : 0
}

export function formatIndianCurrency(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)} L`
  return `₹${amount.toLocaleString("en-IN")}`
}
