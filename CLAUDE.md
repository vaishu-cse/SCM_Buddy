# SCM Buddy — Project Context for Claude Code

I'm **Atreya Sanampudi**. This file has everything the team lead asked for, plus what I learned from the HTML mockup. Read it before writing any code.

---

## 1. What we are building

**SCM Buddy** is an L&T Construction supply-chain web app. It has:

- a **dashboard** that shows each user what needs their attention (actions, KPIs, insights), and
- an **AI assistant panel ("SCM Buddy")** on the right. Users ask questions and complete work (PRs, RFQs, approvals, orders) there.

Management direction: build the **UI screens and basic agents** for now.

## 2. Team lead's instructions (current phase = UI only)

1. The team lead shared the UI as an HTML mockup (`SCM_Buddy_Dashboard_v3.html`). It is a **visual reference only**; it is not code to reuse.
2. Build the app in **React**.
3. Use **shadcn/ui** components for the UI.
4. Use **Evil Charts** (shadcn-style React charts built on Recharts) for any charts.
5. **Start with UI only.** There's no real backend yet. Use a **mock API that returns static JSON**.
6. **Match the mockup wireframes first.** Once they match, the team proceeds to the next step.
7. Use AI coding tools (Claude/Codex) to convert the HTML reference.

## 3. Who does what

| Person | Scope |
|---|---|
| **Atreya (me)** | **Overall layout** (app shell: header, left sidebar, right assistant panel, routing) **+ main page (Dashboard)** |
| **Teammate** | The other **two screens**: **Insights** and **Notifications**. They render inside my layout. |

Set up the project skeleton, layout and routing early so the teammate can drop their pages in. Create placeholder routes for `/insights` and `/notifications`.

## 4. Tech stack

- React + TypeScript + **Vite**
- **Tailwind CSS v4** + **shadcn/ui** (`npx shadcn@latest init`, then add components as needed)
- **Evil Charts** for charts. Check its docs for installation; it installs through the shadcn CLI registry.
- **react-router-dom** for routes
- **MSW (Mock Service Worker)** for the mock API. It intercepts `fetch('/api/...')` and returns static JSON, so the same fetch code keeps working when the real API arrives.
- **lucide-react** for icons
- Font: **Inter** (use `@fontsource-variable/inter`)

## 5. Files in this folder

```
CLAUDE.md                          ← this file
mockup/screenshots/                ← PNG renders of the mockup. MATCH THESE.
  01-dashboard-site-buyer.png      ← default dashboard
  02-dashboard-category-manager.png
  03-dashboard-scm-head.png
  04-sidebar-expanded.png
  05-notifications.png             ← teammate's screen
  06-insights.png                  ← teammate's screen
  07-chat-resolve-action.png       ← assistant panel after clicking an action
mockup/markup.html                 ← decoded mockup markup with exact inline styles (px, colours)
mockup/logic.js                    ← mockup's state + all sample data (PERSONAS, INSIGHTS, FEED, JOBS…)
mockup/theme-tokens.css            ← brand colours mapped to shadcn CSS variables. Use as src/index.css.
src/mocks/data/dashboard.json      ← dashboard data for all 3 personas, ready for the mock API
```

The original `SCM_Buddy_Dashboard_v3.html` is a compressed bundle, so **don't parse it**. Use `mockup/markup.html` for exact styles and the screenshots for the look.

---

## 6. Layout requirements (my scope)

The full-height screen (`100dvh`) is split into three columns under one header.

```
┌────────┬──────────────────────────────────────────┬────────────────────┐
│ L&T    │                     🔔3 │ A. Ramesh  AR ▾ │ SCM Buddy   +New ⟲ ▣│
├────────┼──────────────────────────────────────────┼────────────────────┤
│ ▦      │ ⌂ › Dashboard          PERSONA [Site|Cat|Head]│                │
│ ✦ 11   │                                          │  How can I help    │
│        │   (page content, scrolls)                │  today?            │
│        │                                          │  [suggestions]     │
│        │                                          │                    │
│        │                                          │  [composer]        │
└────────┴──────────────────────────────────────────┴────────────────────┘
```

### Header (46px high, white, bottom border)
- **Left: brand block.** Its width matches the sidebar (64px collapsed, 248px expanded), with background `#f4f7fa` and a right border.
  - Round dark "L&T" logo button (`#0f2c4d`, 32px) that **toggles the sidebar**.
  - When expanded, it shows **"SCM Buddy"** (14px, bold, `#0f2c4d`), the subtitle **"SUPPLY CHAIN"** (10px, letter-spaced, `#5a6b80`) and a small collapse button.
- **Right:**
  - **Notification bell** with a red count badge (`#C0392B`, shows 3). Clicking it goes to `/notifications`.
  - Vertical divider.
  - **Profile button:** name "A. Ramesh", date-time below ("26-08-2026 12:11 PM", 9.5px grey), an "AR" avatar circle (`#134377`) and a chevron.
  - **Profile dropdown** (232px, shadcn DropdownMenu):
    - name, plus "PS 20418872 · {current persona role}"
    - Profile
    - Help
    - Theme toggle (Light/Dark segmented)
    - separator, then Sign out

### Left sidebar
- Collapsed by default: **64px** wide with icons only. Expanded: **248px**. Background `#f4f7fa`, right border.
- Nav items:
  - **Dashboard** (grid icon) → `/`
  - **Insights** (sparkles icon) → `/insights`, with count badge **11**. The badge is a small corner bubble when collapsed and a right-aligned pill when expanded.
- Active item: light blue background `#e2ebf5` or similar, with text `#134377`.
- When expanded, the footer reads: "SCM Buddy © 2026 L&T Construction. All Rights Reserved" (10.5px grey).

### Main area
- Background `#f8fafb`, scrolls independently.
- Padding `12px clamp(12px,1.6vw,28px)`, vertical gap `clamp(8px,1.4vh,18px)`.
- Every page starts with a **breadcrumb**: home icon › page name (current page is bold).

### Right assistant panel ("SCM Buddy")
- Width `clamp(340px, 32%, 560px)`, left border, background `#fafafa`.
- **Header (56px):**
  - bot icon tile (`#134377`) with a small status dot
  - "SCM Buddy" / "Online · start and finish work here"
  - buttons: **+ New** (primary), **History** (clock icon), **Hide panel**
- **Empty state:**
  - bot icon in a bordered tile
  - "How can I help today?" (17px, semibold)
  - "Ask about purchase requests, RFQs, approvals or orders."
  - 4 suggestion buttons (full width, bordered, chevron on the right):
    - Create a PR
    - What are my pending actions?
    - Where is PRC/2026/0041872 pending?
    - Show me my drafts
- **Composer** (at the bottom):
  - bordered box with the placeholder "Ask about PRs, RFQs, orders…"
  - attach (paperclip) button on the left, blue send button on the right
  - note below: "Excel sheets and HPC PDFs can be dropped here — values from a file are confirmed before they commit."
- **Hide panel:** the panel collapses to a 64px rail with a round blue floating bot button at the bottom. Clicking it reopens the panel.
- Clicking an action or insight button on the dashboard **opens the panel with a "resolve" conversation**: why it's flagged, what Buddy offers to do, a primary action and "Not now". After confirming, it shows the done message. See screenshot 07 and the `why` / `offer` / `done` fields in `dashboard.json`.
- For this phase, build the panel shell and the resolve flow using mock data. Real agent/LLM logic comes later.

---

## 7. Dashboard page requirements (my scope)

### Persona switcher (top right, next to the breadcrumb)
- Small label "PERSONA", then a segmented control: **Site Buyer | Category Manager | SCM Head**.
- Switching persona reloads the dashboard data for that persona: `GET /api/dashboard?persona=site|cat|head`.

### Page heading
- Title (16px, semibold), for example "Your job, today" (Site Buyer).
- Below it: a scope chip (blue pill, e.g. `LDM02128`) followed by the scope description in grey.
- On the right: a green dot and "Updated just now".

### KPI row: 5 cards
- Grid layout: `repeat(auto-fit, minmax(128px, 1fr))`, gap 8px.
- Each card: white, 1px border, radius 9px, subtle shadow. It contains:
  - label (10px, grey)
  - value (17px, semibold)
  - optional coloured **note chip** (red/amber/green) plus a sub-text line
  - optional thin **progress bar** (3px) for "My turnaround" and "SLA compliance"

### "Immediate actions" card
- Header: ⚡ icon, "Immediate actions", a grey hint "urgency, then age", and on the right "**6** open · **₹1.09 Cr** at stake".
- **Sort order:**
  1. items whose flag contains "breach", "today" or "block"
  2. other flagged items
  3. unflagged items
- Show **3 rows** by default. "See N more" / "Show fewer" expands the list.
- Each row contains:
  - tone-coloured icon tile (26px)
  - title (11.5px, medium)
  - sub-line: **ref (bold)** · sub · age
  - on the right: optional flag chip ("SLA breached", "Today", "Submit disabled"…), the value in blue, a **primary CTA button** (e.g. "Revise here →") and a small **✓ Mark done** button
- Mark done removes the row. Show an empty state when all rows are cleared: "Queue clear on {scope}".
- Footer note: "Every action completes in Buddy — EIP is written through the API."

### "Insights" card
- Header: ✦ icon, "Insights", a "5 ranked" pill and "Top 5 by priority · {scope}". On the right: "See all 5" / "Show top 3" toggle, and a "Full ledger →" link to `/insights`.
- Shows 3 cards by default in a flex-wrap row, each at least 210px wide. Each card contains:
  - tone icon, title, and a priority pill (P1–P5)
  - body text
  - metric label + coloured metric value (e.g. "Potential saving ₹1,46,000")
  - CTA button: the first card's is primary (filled), the rest are outline
- CTA behaviour:
  - `intent: "create"` opens the assistant's "Create a PR" flow
  - `intent: "res"` opens the resolve flow in the assistant panel
- Footer note: "Ranked on value at risk against urgency, capped at the top five — rules to be agreed with L&T."

### Charts
The dashboard in the mockup has **no charts**. Evil Charts will be needed on other screens later.

---

## 8. Mock API

Use MSW handlers in `src/mocks/handlers.ts`:

| Endpoint | Returns |
|---|---|
| `GET /api/me` | `{ name: "A. Ramesh", initials: "AR", psNo: "20418872", lastLogin: "26-08-2026 12:11 PM" }` |
| `GET /api/dashboard?persona=site` | `dashboard.json[persona]` |
| `GET /api/nav-counts` | `{ notifications: 3, insightsOpen: 11 }` |
| `POST /api/actions/:id/done` | `{ ok: true }` |
| (teammate) `GET /api/insights`, `GET /api/notifications` | data from `mockup/logic.js` (`INSIGHTS`, `FEED`) |

Put all fetch calls in `src/lib/api.ts`, so switching to the real API later means changing only that file.

## 9. Visual tokens (from the mockup)

| Token | Value |
|---|---|
| Primary (L&T blue) | `#134377`, hover `#1a5694` |
| Brand dark | `#0f2c4d` |
| Text | `#0a0a0a`, secondary `#171717`, muted `#737373` |
| Border | `#e5e5e5` |
| Sidebar / brand block | `#f4f7fa` |
| Main canvas | `#f8fafb` |
| Segmented control background | `#eef1f4` |
| Red tone | bg `#fdeeec` · border `#f3c9c4` · text `#A5322A` · icon `#C0392B` |
| Amber tone | bg `#fffbe6` · border `#ffe480` · text `#6b5200` · icon `#C98A00` |
| Green tone | bg `#eaf5ef` · border `#b9dcc8` · text `#1E7F4F` |
| Blue tone | bg `#eef4fa` · border `#c3d8ec` · text `#134377` |

- **Base font:** Inter, 12.5px, line-height 1.45, tabular numbers.
- **Radii:** cards 9–10px, buttons 7px.
- **Card shadow:** `0 2px 8px -2px rgba(15,44,77,.10), 0 1px 2px rgba(15,44,77,.05)`.
- **Currency:** Indian format (₹1,46,000; ₹1.09 Cr; ₹42.6 L).

## 10. Suggested folder structure

```
src/
  main.tsx                 start MSW (dev), then render
  App.tsx                  routes
  index.css                ← copy of mockup/theme-tokens.css
  lib/api.ts, lib/utils.ts, lib/format.ts
  types/dashboard.ts
  mocks/browser.ts, mocks/handlers.ts, mocks/data/*.json
  components/ui/           shadcn components
  components/layout/       AppLayout, AppHeader, AppSidebar, AssistantPanel, Breadcrumb
  pages/dashboard/         DashboardPage, PersonaSwitcher, KpiCard, ImmediateActions, InsightsPreview
  pages/insights/          (teammate) placeholder for now
  pages/notifications/     (teammate) placeholder for now
```

## 11. Definition of done (this phase)

- [ ] `npm run dev` shows the layout and dashboard, matching `01-dashboard-site-buyer.png`.
- [ ] All 3 personas switch correctly (screenshots 01–03).
- [ ] Sidebar collapses and expands (screenshot 04).
- [ ] Profile dropdown works; the bell navigates to `/notifications`.
- [ ] The assistant panel hides and shows. Action and insight CTAs open the resolve flow (screenshot 07).
- [ ] "See more" and "Mark done" work on actions; "See all" works on insights.
- [ ] All data comes through the mock API, with nothing hard-coded in components.
- [ ] `/insights` and `/notifications` routes exist, ready for the teammate's screens.

---

## 12. Product feedback to keep in mind (future phases, not this UI pass)

These notes are about the PR / purchase flow and the agents. Don't build them now, but don't design anything that blocks them.

1. One job may need **multiple warehouses** for different materials.
2. A **cluster office handler can work across several job codes**. The job code must be selectable, never locked.
3. **Concorde** follows the same logic as a PR, just with more mandatory fields.
4. **Standard Purchase vs DC** should be a **recommendation** based on the user's inputs, with the user making the final choice.
5. The PR flow currently goes back and forth. It must be **restructured into a clear linear path** for Standard Purchase and for DC.
6. **Transportation charge logic:**
   - apply a minimum tonnage for a single-material shipment
   - merge small quantities with other materials to meet that minimum
7. **SCM Buddy must answer anything about an order or draft**, and **approvals must be doable inside SCM Buddy**.
