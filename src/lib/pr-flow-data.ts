import type { Tone } from "@/types/dashboard"

export interface PrSourcingOption {
  id: string
  label: string
  tag?: string
  tagTone?: Tone
  landedValue?: string
  breakdown: string
  disabled?: boolean
  /** Only used when the sourcing block is selectable (one option replaces another). */
  ctaLabel?: string
}

export interface PrSourcing {
  intro: string
  advisoriesTitle: string
  advisories: { title: string; body: string }[]
  optionsHeader: string
  optionsSubtitle: string
  options: PrSourcingOption[]
  /** true = options are alternatives (radio-style); false = options are informational, one combined CTA. */
  selectable: boolean
  defaultSelectedId: string
  warningTitle?: string
  warningBody?: string
  bestCostLabel: string
  bestCostValue: string
  deliveryImpactLabel: string
  deliveryImpact: string
  /** Only used when selectable = false. */
  combinedCtaLabel?: string
  doneMessage: (selectedId: string) => string
}

export interface PrMaterial {
  id: string
  name: string
  keywords: string[]
  suggestionMeta: string
  suggestionTag: string
  category: string
  materialGroup: string
  purchaseGroup: string
  uom: string
  planningRef: string
  lastPurchase: string
  planBalanceQty: string
  scheduleNeedBy: string
  requiredByFull: string
  quantityPrompt: string
  quantityDefaultLabel: string
  sourcing: PrSourcing
}

const TMT_BAR: PrMaterial = {
  id: "MAT-1000482",
  name: "TMT Bar Fe500D 12mm",
  keywords: ["tmt", "fe500d", "12mm", "rebar", "1000482", "steel"],
  suggestionMeta: "Planned 120 MT · ordered 70 MT · balance 50 MT · last bought at ₹50,290/MT on 12 Jul",
  suggestionTag: "PREVIOUSLY USED",
  category: "Steel & Rebar",
  materialGroup: "Rebar — TMT",
  purchaseGroup: "Central",
  uom: "MT",
  planningRef: "BBS-C4-R7",
  lastPurchase: "₹50,290/MT · 12 Jul",
  planBalanceQty: "50 MT",
  scheduleNeedBy: "15 Sep",
  requiredByFull: "15 Sep 2026",
  quantityPrompt: "How much, and by when? The plan balance is 50 MT and the schedule needs it by 15 Sep.",
  quantityDefaultLabel: "50 MT by 15 Sep",
  sourcing: {
    intro:
      "I found cheaper sources than a fresh purchase. Four sources compared on landed cost, including transport — below.\n\nFresh purchase is blocked while site surplus covers 76%; take the transfer and you can buy the balance.",
    advisoriesTitle: "2 advisories · worth knowing",
    advisories: [
      {
        title: "Near-expiry stock at WH-CHN-01",
        body: "12 MT OPC 53 Cement expires in 26 days on this job — unrelated to this request, but worth a transfer before it lapses.",
      },
      {
        title: "Indicative rate 4.2% above last purchase",
        body: "Last purchase was ₹50,290/MT on 12 Jul 2026. The commodity feed shows a rising trend — the buyer will test it at RFQ.",
      },
    ],
    optionsHeader: "Sourcing options",
    optionsSubtitle: "50 MT TMT Bar Fe500D 12mm · ranked on landed cost, transport included",
    selectable: true,
    defaultSelectedId: "hub-chennai",
    options: [
      {
        id: "hub-chennai",
        label: "Hub · Chennai",
        tag: "PREFERRED",
        tagTone: "blue",
        landedValue: "₹25,69,000",
        breakdown: "₹51,000/MT + ₹19,000 transport · 28 km · 50 MT, full cover",
        ctaLabel: "Take from hub",
      },
      {
        id: "site-hyd01",
        label: "Site · WH-HYD-01",
        landedValue: "₹28,20,000",
        breakdown: "₹52,400/MT + ₹28,000 transport · 42 km · 38 MT, 76% cover · aged 142 d",
        ctaLabel: "Take from site",
      },
      {
        id: "market",
        label: "Market · fresh purchase",
        tag: "BLOCKED",
        tagTone: "red",
        landedValue: "₹27,10,000",
        breakdown: "₹54,200/MT, transport included · 3 vendors, indicative · 50 MT",
        disabled: true,
      },
      {
        id: "rate-contract",
        label: "Rate contract",
        tag: "NONE",
        tagTone: "grey",
        breakdown: "No live contract covers MAT-1000482 — Central finalises steel contracts annually.",
        disabled: true,
      },
    ],
    warningTitle: "Fresh purchase blocked at 76% cover",
    warningBody:
      "EIP will not accept a fresh purchase where surplus covers 70% or more. Raise the transfer for 38 MT first, then buy the remaining 12 MT.",
    bestCostLabel: "Best landed cost",
    bestCostValue: "Hub · Chennai — ₹25,69,000, ₹1,41,000 below market",
    deliveryImpactLabel: "Delivery impact",
    deliveryImpact:
      "Hub 06 Sep · site transfer 08 Sep · fresh purchase 18 Sep. Need date is 15 Sep — a fresh purchase misses it by 3 days.",
    doneMessage: (selectedId) =>
      selectedId === "site-hyd01"
        ? "Done — taking 38 MT from Site · WH-HYD-01 (76% cover) and raising a fresh purchase for the remaining 12 MT. This is in EIP now as a stock transfer plus a linked PR; I'll let you know once both are confirmed."
        : "Done — taking 50 MT TMT Bar Fe500D 12mm from Hub · Chennai. Landed ₹25,69,000, arriving 06 Sep — 9 days ahead of your 15 Sep need-by. This is in EIP now as a stock transfer; I'll let you know once it's confirmed.",
  },
}

const OPC_CEMENT: PrMaterial = {
  id: "MAT-1000613",
  name: "OPC 53 Grade Cement",
  keywords: ["opc", "cement", "53 grade", "1000613"],
  suggestionMeta: "Planned 460 MT · ordered 442 MT · balance 18 MT",
  suggestionTag: "PREVIOUSLY USED",
  category: "Cement",
  materialGroup: "OPC 53 Grade",
  purchaseGroup: "Central",
  uom: "MT",
  planningRef: "BBS-C4-C3",
  lastPurchase: "₹6,900/MT · 20 Jul",
  planBalanceQty: "18 MT",
  scheduleNeedBy: "20 Sep",
  requiredByFull: "20 Sep 2026",
  quantityPrompt: "How much, and by when? The plan balance is 18 MT and the schedule needs it by 20 Sep.",
  quantityDefaultLabel: "18 MT by 20 Sep",
  sourcing: {
    intro:
      "12 MT of this exact grade is already sitting at WH-CHN-01 and expires in 26 days — take that first, then buy the remaining 6 MT fresh.",
    advisoriesTitle: "1 advisory · worth knowing",
    advisories: [
      {
        title: "Near-expiry stock covers most of this",
        body: "12 MT OPC 53 Cement at WH-CHN-01 expires in 26 days — value at risk ₹3,12,000 if it lapses unused instead.",
      },
    ],
    optionsHeader: "Sourcing options",
    optionsSubtitle: "18 MT OPC 53 Grade Cement · ranked on landed cost, transport included",
    selectable: false,
    defaultSelectedId: "site-chn01",
    options: [
      {
        id: "site-chn01",
        label: "Site · WH-CHN-01",
        tag: "PREFERRED",
        tagTone: "blue",
        landedValue: "Saves ₹82,800",
        breakdown: "Already on this job · 12 MT, expires in 26 days · zero transport",
      },
      {
        id: "market-cement",
        label: "Market · fresh purchase",
        landedValue: "₹42,900",
        breakdown: "₹7,150/MT, transport included · 2 vendors, indicative · 6 MT, tops up the balance",
      },
    ],
    warningTitle: "Take both — the stock alone is short by 6 MT",
    warningBody:
      "12 MT from WH-CHN-01 covers most of the 18 MT balance, but 6 MT still needs a fresh purchase to fully clear the draft.",
    bestCostLabel: "Best value",
    bestCostValue: "Site · WH-CHN-01 — saves ₹82,800 versus letting the stock lapse",
    deliveryImpactLabel: "Delivery impact",
    deliveryImpact: "Site stock available today · fresh purchase for the remaining 6 MT arrives in 3–4 days, well inside the 20 Sep need-by.",
    combinedCtaLabel: "Raise both — 12 MT from stock + 6 MT purchase",
    doneMessage: () =>
      "Done — 12 MT OPC 53 Cement moves from WH-CHN-01 as a stock transfer and a PR for the remaining 6 MT goes out for quotes. Both are in EIP now; I'll let you know once they're confirmed.",
  },
}

export const PR_MATERIALS: PrMaterial[] = [TMT_BAR, OPC_CEMENT]

export function matchMaterial(text: string): PrMaterial | null {
  const lower = text.toLowerCase()
  return PR_MATERIALS.find((m) => m.id.toLowerCase() === lower.trim() || m.keywords.some((k) => lower.includes(k))) ?? null
}

const QTY_RE = /(\d+(?:\.\d+)?\s*(?:mt|kg|nos|bags?))/i
const DATE_RE = /(?:by\s+)?(\d{1,2}\s+[a-z]{3,9}|\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?)/i

export function parseQuantityAndDate(text: string): { qty: string; date: string } | null {
  const qtyMatch = text.match(QTY_RE)
  const dateMatch = text.match(DATE_RE)
  if (!qtyMatch && !dateMatch) return null
  return {
    qty: qtyMatch ? qtyMatch[1].toUpperCase() : "the requested quantity",
    date: dateMatch ? dateMatch[1] : "the requested date",
  }
}

export function isCreatePrIntent(text: string): boolean {
  const lower = text.toLowerCase()
  return /\b(pr|purchase request)\b/.test(lower) && /\b(create|new|raise|start|open)\b/.test(lower)
}
