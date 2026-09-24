
class Component extends DCLogic {
  state = { persona: null, done: [], actsOpen: false, insOpen: false, res: null, resDone: false, jobSel: null, jobOpen: false, iTab: "open", iSrc: null, nTab: "all", collapsed: true, profileOpen: false, feedTab: "updates", chatOpen: true, groupOpen: true, convo: null, turn: 1, prSubmitted: false, page: "dashboard", prView: "list", workView: "list", moreOpen: false, atab: "unalloc", sel: { a: true, b: true, c: true, d: false }, inv: { v1: true, v2: true, v3: false }, vpOpen: false, pv: "v1", reasonFor: null, tccStage: 1, potab: "items", amdField: "qty", tcdSubmitted: false, bidTab: "vendors", remindOpen: false, extendOpen: false, histOpen: false, histQuery: "" };
  // Canonical records — new screens read these so PO / RFQ / vendor identifiers stay in step.
  TONE = {
    blue: "background:#eef4fa;border:1px solid #c3d8ec;color:#134377",
    amber: "background:#fffbe6;border:1px solid #ffe480;color:#6b5200",
    green: "background:#eaf5ef;border:1px solid #b9dcc8;color:#1E7F4F",
    grey: "background:#fafafa;border:1px solid #e5e5e5;color:#737373",
    red: "background:#fdeeec;border:1px solid #f3c9c4;color:#A5322A",
  };
  PO_ROWS = [
    { id: "PO/2026/0018842", vendor: "Sunrise Steel Traders", vtier: "Empanelled", job: "LDM02128", mat: "TMT Bar Fe500D 16mm", sub: "from RFQ/2026/0009266 · amended once", val: "₹41,20,000", recv: 32, tot: 60, unit: "MT", amd: "v2", status: "Partially received", tone: "amber", age: "6d", due: "08 Sep", open: true },
    { id: "PO/2026/0018820", vendor: "Deccan Cement Agencies", vtier: "Onboarded", job: "LDM04471", mat: "OPC 53 Grade Cement", sub: "from RFQ/2026/0009288 · amended twice", val: "₹52,40,000", recv: 0, tot: 2400, unit: "bags", amd: "v2", status: "Open", tone: "blue", age: "9d", due: "11 Sep", open: false },
    { id: "PO/2026/0018796", vendor: "Sunrise Steel Traders", vtier: "Empanelled", job: "LDM02128", mat: "Anchor Bolts M20", sub: "from RFQ/2026/0009180", val: "₹6,60,000", recv: 500, tot: 500, unit: "nos", amd: "v1", status: "Fully received", tone: "green", age: "18d", due: "Closed 22 Aug", open: false },
    { id: "PO/2026/0018781", vendor: "Deccan Metal Corp", vtier: "Empanelled", job: "LDM03390", mat: "MS Binding Wire 18 SWG", sub: "from RFQ/2026/0009301", val: "₹1,08,500", recv: 0, tot: 700, unit: "kg", amd: "v1", status: "Open", tone: "blue", age: "3d", due: "14 Sep", open: false },
    { id: "PO/2026/0018754", vendor: "Deccan Cement Agencies", vtier: "Onboarded", job: "LDM04471", mat: "Ready Mix Concrete M25", sub: "scheduled pours · 6 tranches", val: "₹18,40,000", recv: 220, tot: 400, unit: "cum", amd: "v1", status: "Partially received", tone: "amber", age: "12d", due: "06 Sep", open: false },
    { id: "PO/2026/0018712", vendor: "Sunrise Steel Traders", vtier: "Empanelled", job: "LDM02128", mat: "TMT Bar Fe500D 12mm", sub: "from RFQ/2026/0009341", val: "₹26,67,200", recv: 50, tot: 50, unit: "MT", amd: "v3", status: "Fully received", tone: "green", age: "22d", due: "Closed 18 Aug", open: false },
    { id: "PO/2026/0018690", vendor: "Deccan Metal Corp", vtier: "Empanelled", job: "LDM03390", mat: "Structural Steel Angles", sub: "balance 28 MT short-closed", val: "₹9,84,000", recv: 12, tot: 40, unit: "MT", amd: "v1", status: "Short-closed", tone: "grey", age: "26d", due: "Closed 14 Aug", open: false },
    { id: "PO/2026/0018655", vendor: "Sunrise Steel Traders", vtier: "Empanelled", job: "LDM04471", mat: "TMT Bar Fe500D 20mm", sub: "rate revision awaiting Head–SCM", val: "₹34,50,000", recv: 0, tot: 45, unit: "MT", amd: "v2", status: "Amendment pending", tone: "red", age: "28d", due: "Held", open: false },
  ];
  BID_ROWS = [
    { v: "Sunrise Steel Traders", tier: "Empanelled", ttone: "green", invited: "26 Aug 09:12", viewed: "26 Aug 10:04", quoted: "27 Aug 14:22", state: "Quoted", stone: "green", rev: "Revision 2 · latest", sealed: true },
    { v: "Deccan Cement Agencies", tier: "Onboarded", ttone: "blue", invited: "26 Aug 09:12", viewed: "26 Aug 16:41", quoted: "28 Aug 11:08", state: "Quoted", stone: "green", rev: "Revision 1", sealed: true },
    { v: "Deccan Metal Corp", tier: "Empanelled", ttone: "green", invited: "26 Aug 09:12", viewed: "28 Aug 08:20", quoted: "—", state: "Viewed, no quote", stone: "amber", rev: "Reminder sent 29 Aug", sealed: false },
    { v: "Vertex Infra Supplies", tier: "Registered", ttone: "amber", invited: "26 Aug 09:12", viewed: "—", quoted: "—", state: "Not opened", stone: "red", rev: "No reminder sent yet", sealed: false },
  ];
  // Every face the page loads. Shared by both font props so either slot can take any of them.
  STACKS = {
    Geist: "Geist,ui-sans-serif,system-ui,sans-serif",
    "IBM Plex Sans": "'IBM Plex Sans',ui-sans-serif,system-ui,sans-serif",
    "Instrument Sans": "'Instrument Sans',ui-sans-serif,system-ui,sans-serif",
    "Public Sans": "'Public Sans',ui-sans-serif,system-ui,sans-serif",
    "DM Sans": "'DM Sans',ui-sans-serif,system-ui,sans-serif",
    "Plus Jakarta Sans": "'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif",
    Manrope: "Manrope,ui-sans-serif,system-ui,sans-serif",
    Poppins: "Poppins,ui-sans-serif,system-ui,sans-serif",
    Inter: "Inter,ui-sans-serif,system-ui,sans-serif",
    "Open Sans": "'Open Sans',ui-sans-serif,system-ui,sans-serif",
    // Google Sans is proprietary and not served by Google Fonts — renders if the
    // machine has it licensed locally, otherwise falls back to Rubik, its closest public cousin.
    "Google Sans": "'Google Sans','Google Sans Text','Product Sans',Rubik,ui-sans-serif,system-ui,sans-serif",
    Raleway: "Raleway,ui-sans-serif,system-ui,sans-serif",
    Archivo: "Archivo,ui-sans-serif,system-ui,sans-serif",
    Lexend: "Lexend,ui-sans-serif,system-ui,sans-serif",
    "Noto Serif": "'Noto Serif',ui-serif,Georgia,serif",
    "Geist Mono": "'Geist Mono',ui-monospace,monospace",
    "IBM Plex Mono": "'IBM Plex Mono',ui-monospace,monospace",
    "JetBrains Mono": "'JetBrains Mono',ui-monospace,monospace",
    "Roboto Mono": "'Roboto Mono',ui-monospace,monospace",
    "Space Mono": "'Space Mono',ui-monospace,monospace",
  };
  TRUE_MONO = ["Geist Mono", "IBM Plex Mono", "JetBrains Mono", "Roboto Mono", "Space Mono"];
  JOBS = [
    { code: "LDM02128", name: "Chennai Metro · Package C4", loc: "Chennai", open: 3.64, docs: 13,
      stages: [1.2, 4.0, 2.1, 5.1, 5.6, 3.1, 3.3, 0.4], sla: [10, 1, 2],
      appr: [2, 3, 3, 4, 4, 5, 4, 6, 5, 7, 6, 8], po: [30, 34, 26, 42, 38, 46],
      age: [[8, 3, 1, 1], [6, 4, 2, 1], [4, 4, 3, 2], [5, 3, 3, 1], [7, 3, 2, 1]],
      flow: { sub: 16, subVal: 2.68, appr: 13, rej: 2, sc: 1, alloc: 12, wait: 1, poc: 6, poVal: 0.98, srcg: 6 },
      surplus: { mt: 26, mat: "TMT Bar Fe500D 12mm", wh: "WH-HYD-01", km: 42, save: 146000 },
      expiry: { batches: 1, mt: 6, mat: "OPC 53 Grade Cement", wh: "WH-CHN-01", days: 41, value: 86000 },
      budget: 2640000 },
    { code: "LDM04471", name: "Hyderabad Elevated Corridor", loc: "Hyderabad", open: 2.78, docs: 10,
      stages: [1.3, 3.2, 1.6, 4.4, 5.0, 2.8, 3.0, 0.4], sla: [8, 1, 1],
      appr: [2, 2, 2, 3, 3, 4, 3, 4, 3, 5, 4, 6], po: [24, 28, 20, 32, 30, 38],
      age: [[6, 2, 1, 0], [5, 3, 2, 1], [3, 3, 2, 1], [4, 2, 2, 1], [5, 2, 1, 1]],
      flow: { sub: 12, subVal: 2.06, appr: 10, rej: 1, sc: 1, alloc: 9, wait: 1, poc: 4, poVal: 0.72, srcg: 5 },
      surplus: { mt: 12, mat: "OPC 53 Grade Cement", wh: "WH-CHN-02", km: 18, save: 68000 },
      expiry: { batches: 2, mt: 12, mat: "OPC 53 Grade Cement", wh: "WH-CHN-01", days: 26, value: 312000 },
      budget: 1250000 },
    { code: "LDM03390", name: "Coimbatore IT Campus · Block B", loc: "Coimbatore", open: 1.88, docs: 7,
      stages: [1.2, 3.1, 1.7, 4.3, 4.9, 2.7, 2.9, 0.3], sla: [6, 1, 0],
      appr: [1, 2, 2, 3, 2, 3, 3, 4, 3, 4, 3, 4], po: [18, 22, 18, 24, 22, 28],
      age: [[5, 2, 1, 0], [3, 2, 1, 1], [2, 2, 2, 1], [3, 2, 1, 1], [4, 2, 1, 0]],
      flow: { sub: 9, subVal: 1.42, appr: 7, rej: 1, sc: 1, alloc: 7, wait: 0, poc: 3, poVal: 0.46, srcg: 4 },
      expiry: { batches: 1, mt: 4, mat: "Waterproofing Compound", wh: "WH-CBE-01", days: 52, value: 88000 } },
    { code: "LDM05114", name: "Bengaluru Airport T2 · Landside", loc: "Bengaluru", open: 0.93, docs: 4,
      stages: [1.0, 2.9, 1.4, 4.0, 4.6, 2.6, 2.8, 0.3], sla: [3, 0, 1],
      appr: [1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 3], po: [10, 12, 10, 14, 14, 16],
      age: [[3, 1, 0, 0], [2, 1, 1, 0], [2, 1, 1, 1], [2, 1, 1, 0], [3, 1, 0, 0]],
      flow: { sub: 5, subVal: 0.68, appr: 4, rej: 1, sc: 0, alloc: 3, wait: 1, poc: 2, poVal: 0.25, srcg: 1 } },
  ];
  AICON = {
    ret: { d1: "M6 4.4 3.2 7.2 6 10", d2: "M3.2 7.2h6.2a3.4 3.4 0 0 1 0 6.8H8" },
    warn: { d1: "M8 2.6 14.2 13.4H1.8z", d2: "M8 6.4v3M8 11.4v.2" },
    clock: { d1: "M8 3.2a5.4 5.4 0 1 0 0 10.8a5.4 5.4 0 1 0 0-10.8", d2: "M8 6v2.6l1.8 1.2M6.2 2h3.6" },
    mail: { d1: "M3.6 3.6h8.8a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H3.6a1.6 1.6 0 0 1-1.6-1.6V5.2a1.6 1.6 0 0 1 1.6-1.6z", d2: "m2.6 4.4 5.4 4 5.4-4" },
    cube: { d1: "M2.4 5.2 8 2.4l5.6 2.8v5.6L8 13.6l-5.6-2.8z", d2: "M2.4 5.2 8 8l5.6-2.8M8 8v5.6" },
  };
  FICON = {
    check: { d1: "M8 2.2a5.8 5.8 0 1 0 0 11.6a5.8 5.8 0 1 0 0-11.6", d2: "m5.6 8.2 1.6 1.6 3.2-3.6" },
    card: { d1: "M3.8 4h8.4a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H3.8a1.6 1.6 0 0 1-1.6-1.6V5.6A1.6 1.6 0 0 1 3.8 4z", d2: "M2.2 6.8h11.6M10.4 9.6h1.6" },
    doc: { d1: "M4 2.8h8a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H4a1.6 1.6 0 0 1-1.6-1.6V4.4A1.6 1.6 0 0 1 4 2.8z", d2: "M5.2 6h5.6M5.2 8.6h3.6" },
    person: { d1: "M6.4 3.2a2.4 2.4 0 1 0 0 4.8a2.4 2.4 0 1 0 0-4.8", d2: "M2.4 13c.5-2 2.1-3.2 4-3.2M11 6.6 13.2 8.8 11 11" },
    send: { d1: "M13.6 2.6 7 9.2M13.6 2.6 9.4 13.4 7 9.2 2.6 6.8z", d2: "" },
    x: { d1: "M8 2.2a5.8 5.8 0 1 0 0 11.6a5.8 5.8 0 1 0 0-11.6", d2: "M6.2 6.2l3.6 3.6M9.8 6.2l-3.6 3.6" },
    docplus: { d1: "M3.2 2h6L13 5.8V14H3.2z", d2: "M9 2v4h4M8 8.6v3.2M6.4 10.2h3.2" },
    tri: { d1: "M8 2.6 14 13H2z", d2: "M8 6.4v3M8 11.2v.2" },
    minus: { d1: "M8 2.2a5.8 5.8 0 1 0 0 11.6a5.8 5.8 0 1 0 0-11.6", d2: "M5.4 8h5.2" },
  };
  FTONE = { green: "#1E7F4F", blue: "#134377", grey: "#737373", red: "#C0392B", amber: "#C98A00" };
  ACTIONS = [
    { job: "LDM04471", icon: "ret", tone: "red", n: 1, val: 1840000, title: "1 PR rejected — needs revision", ref: "PRC/2026/0041790", sub: "Shuttering Plywood 12mm · returned by R. Krishnan", flag: "SLA breached · 3d", ft: "red" },
    { job: "LDM02128", icon: "warn", tone: "red", n: 1, val: 2640000, title: "1 draft blocked on budget", ref: "PRC/2026/0041866", sub: "Steel & Rebar · budget unavailable", flag: "Submit disabled", ft: "amber" },
    { job: "LDM02128", icon: "clock", tone: "amber", n: 2, val: 4120000, title: "2 RFQs closing today", ref: "RFQ/2026/0009363", sub: "+1 · 5 vendors invited · 3 responded", flag: "Closes 17:00", ft: "amber" },
    { job: "LDM03390", icon: "ret", tone: "amber", n: 1, val: 1245000, title: "1 TCD returned for correction", ref: "TCD/2026/0004120", sub: "landed cost basis queried — FOR vs Ex-works", flag: "", ft: "" },
    { job: "LDM04471", icon: "mail", tone: "red", n: 3, val: 890000, title: "3 vendor responses overdue", ref: "RFQ/2026/0009301", sub: "Sunrise Steel Traders +2 · registered email only", flag: "SLA breached · 2d", ft: "red" },
    { job: "LDM05114", icon: "cube", tone: "blue", n: 1, val: 205000, title: "1 PO amendment awaiting your input", ref: "PO/2026/0028104", sub: "delivery date revised by vendor", flag: "", ft: "" },
  ];
  FEED = {
    updates: [
      { job: "LDM02128", icon: "check", tone: "green", ref: "PRC/2026/0041872", mid: " approved by ", strong: "R. Krishnan", when: "14 min ago" },
      { job: "LDM02128", icon: "card", tone: "blue", pre: "Budget now available on ", ref: "LDM02128", when: "1 hr ago" },
      { job: "LDM02128", icon: "doc", tone: "blue", strong: "Sunrise Steel Traders", post: " submitted a quote", when: "2 hr ago" },
      { job: "LDM04471", icon: "person", tone: "grey", ref: "PRC/2026/0041790", mid: " allocated to Cluster Buyer", when: "Yesterday" },
      { job: "LDM02128", icon: "send", tone: "blue", ref: "RFQ/2026/0009341", mid: " issued to 5 vendors", when: "Yesterday" },
      { job: "LDM04471", icon: "x", tone: "red", ref: "RFQ/2026/0009288", mid: " declined by ", strong: "Deccan Cement", when: "Yesterday" },
      { job: "LDM03390", icon: "check", tone: "green", pre: "MRN posted against ", ref: "PO/2026/0018781", when: "Yesterday" },
      { job: "LDM05114", icon: "card", tone: "blue", pre: "Delivery date revised by vendor on ", ref: "PO/2026/0028104", when: "2 days ago" },
    ],
    actions: [
      { job: "LDM02128", icon: "check", tone: "green", pre: "You approved ", ref: "PRC/2026/0041815", when: "2 hr ago" },
      { job: "LDM02128", icon: "send", tone: "blue", pre: "You issued ", ref: "RFQ/2026/0009341", mid: " to 5 vendors", when: "Yesterday" },
      { job: "LDM02128", icon: "docplus", tone: "grey", pre: "You created a draft PR — TMT couplers", when: "Yesterday" },
      { job: "LDM04471", icon: "person", tone: "grey", pre: "You allocated ", ref: "PRC/2026/0041790", mid: " to Cluster Buyer", when: "2 days ago" },
      { job: "LDM02128", icon: "tri", tone: "amber", pre: "You declined surplus on ", ref: "PRC/2026/0041872", when: "2 days ago" },
      { job: "LDM03390", icon: "minus", tone: "grey", pre: "You short-closed ", ref: "PRC/2026/0039660", when: "3 days ago" },
      { job: "LDM05114", icon: "check", tone: "green", pre: "You accepted the revised date on ", ref: "PO/2026/0028104", when: "3 days ago" },
    ],
  };
  jobVals() {
    const sel = this.state.jobSel;
    const all = !sel;
    const J = all ? this.JOBS : this.JOBS.filter((j) => sel.indexOf(j.code) >= 0);
    const codes = J.map((j) => j.code);
    const sum = (f) => J.reduce((n, j) => n + f(j), 0);
    const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
    const big = (n) => (n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr" : "₹" + (Math.round(n / 1e4) / 10).toFixed(1) + " L");
    const r1 = (n) => Math.round(n * 10) / 10;
    const fmt = (n) => (Math.abs(n - Math.round(n)) < 0.05 ? String(Math.round(n)) : n.toFixed(1));
    const slaFlags = this.props.showSlaFlags ?? true;
    const BG = { red: "#fdeeec", amber: "#fffbe6", blue: "#eef4fa" };
    const SK = { red: "#C0392B", amber: "#C98A00", blue: "#134377" };
    const FLAG = {
      red: "font-size:11px;font-weight:500;color:#A5322A;background:#fdeeec;border:1px solid #f3c9c4;border-radius:6px;padding:2px 7px;white-space:nowrap",
      amber: "font-size:11px;font-weight:500;color:#6b5200;background:#fffbe6;border:1px solid #ffe480;border-radius:6px;padding:2px 7px;white-space:nowrap",
    };
    const acts = this.ACTIONS.filter((a) => codes.indexOf(a.job) >= 0);
    const actionRows = acts.map((a) => {
      const ic = this.AICON[a.icon];
      return {
        title: a.title, ref: a.ref, sub: a.sub, job: a.job, val: inr(a.val),
        d1: ic.d1, d2: ic.d2, stroke: SK[a.tone],
        iconWrap: "width:34px;height:34px;border-radius:9px;background:" + BG[a.tone] + ";display:flex;align-items:center;justify-content:center",
        flag: !!a.flag && slaFlags, flagLabel: a.flag, flagStyle: FLAG[a.ft] || FLAG.amber,
      };
    });
    const feed = (this.state.feedTab === "actions" ? this.FEED.actions : this.FEED.updates).filter((f) => codes.indexOf(f.job) >= 0);
    const feedRows = feed.map((f) => {
      const ic = this.FICON[f.icon];
      return { pre: f.pre || "", ref: f.ref || "", mid: f.mid || "", strong: f.strong || "", post: f.post || "", when: f.when, job: f.job, d1: ic.d1, d2: ic.d2 || "", stroke: this.FTONE[f.tone] };
    });
    const surp = J.filter((j) => j.surplus).map((j) => j.surplus);
    const sh = surp.slice().sort((x, y) => y.mt - x.mt)[0];
    const surMtTotal = surp.reduce((n, x) => n + x.mt, 0);
    const expr = J.filter((j) => j.expiry).map((j) => j.expiry);
    const eh = expr.slice().sort((x, y) => x.days - y.days)[0];
    const bud = J.filter((j) => j.budget);
    const expB = expr.reduce((n, x) => n + x.batches, 0);
    const docs = sum((j) => j.docs);
    const dv = docs || 1;
    const stages = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => J.reduce((n, j) => n + j.stages[i] * j.docs, 0) / dv);
    const cycleTotal = stages.reduce((n, v) => n + v, 0);
    const axMax = Math.max(6, Math.ceil(Math.max.apply(null, stages.concat([0]))));
    const names = ["PR", "Approval", "Alloc", "RFQ", "BQ", "TCC", "TCD", "PO"];
    const stageBars = stages.map((v, i) => {
      const h = (v / axMax) * 150;
      return {
        label: names[i], val: v.toFixed(1),
        barStyle: "width:100%;max-width:34px;height:" + r1((v / axMax) * 100) + "%;border-radius:2px 2px 0 0;background:linear-gradient(180deg,#134377 18%,rgba(19,67,119,.06) 92%);transform-origin:bottom;animation:ecGrow .5s cubic-bezier(0,.7,.5,1) both;animation-delay:" + (i * 0.05).toFixed(2) + "s",
      };
    });
    const slaOn = sum((j) => j.sla[0]), slaRisk = sum((j) => j.sla[1]), slaBr = sum((j) => j.sla[2]);
    const slaTot = slaOn + slaRisk + slaBr || 1;
    const slaPct = Math.round((slaOn / slaTot) * 100);
    const wk = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => sum((j) => j.appr[i]));
    const wkMax = Math.max.apply(null, wk.concat([1]));
    const pts = wk.map((v, i) => ({ x: r1(8 + i * 20.8), y: r1(118 - (v / wkMax) * 100) }));
    const ageNames = ["Approval", "Alloc", "RFQ", "TCC", "TCD"];
    const fills = ["#134377", "#2f6da8", "#FED10A", "#C0392B"];
    const ageBars = ageNames.map((nm, si) => {
      const b = [0, 1, 2, 3].map((k) => J.reduce((n, j) => n + j.age[si][k], 0));
      const t = b.reduce((n, v) => n + v, 0) || 1;
      const x = r1(34.4 + si * 42.8);
      let y = 120;
      const segs = b.map((v, k) => { const h = (v / t) * 110; y -= h; return { x, y: r1(y), h: r1(h), fill: fills[k] }; });
      return { x, cx: r1(47.4 + si * 42.8), label: nm, segs, style: "animation:ecGrow .5s cubic-bezier(0,.7,.5,1) both;animation-delay:" + (si * 0.05).toFixed(2) + "s;transform-origin:" + r1(47.4 + si * 42.8) + "px 120px" };
    });
    const pvs = [0, 1, 2, 3, 4, 5].map((i) => sum((j) => j.po[i]));
    const pvMax = Math.max(20, Math.ceil(Math.max.apply(null, pvs.concat([0])) / 20) * 20);
    const poBars = pvs.slice(0, 5).map((v, i) => {
      const h = (v / pvMax) * 110;
      return { x: 31 + i * 36, y: r1(120 - h), h: r1(h), style: "transform-origin:" + (31 + i * 36) + "px 120px;animation:ecGrow .5s cubic-bezier(0,.7,.5,1) both;animation-delay:" + (i * 0.05).toFixed(2) + "s" };
    });
    const projH = (pvs[5] / pvMax) * 110;
    const F = {
      sub: sum((j) => j.flow.sub), subVal: sum((j) => j.flow.subVal), appr: sum((j) => j.flow.appr),
      rej: sum((j) => j.flow.rej), sc: sum((j) => j.flow.sc), alloc: sum((j) => j.flow.alloc),
      wait: sum((j) => j.flow.wait), poc: sum((j) => j.flow.poc), poVal: sum((j) => j.flow.poVal), srcg: sum((j) => j.flow.srcg),
    };
    const kk = 193.2 / (F.sub || 1);
    const H = { sub: F.sub * kk, appr: F.appr * kk, rej: F.rej * kk, sc: F.sc * kk, alloc: F.alloc * kk, wait: F.wait * kk, poc: F.poc * kk, srcg: F.srcg * kk };
    const c1 = { appr: 12, rej: 12 + H.appr + 8, sc: 12 + H.appr + 8 + H.rej + 8 };
    const c2 = { alloc: 12, wait: 12 + H.alloc + 8 };
    const c3 = { poc: 12, srcg: 12 + H.poc + 8 };
    const rib = (x1, x2, s1, s2, t1, t2) => {
      const c = (x1 + x2) / 2;
      return "M" + x1 + " " + r1(s1) + " C " + c + " " + r1(s1) + " " + c + " " + r1(t1) + " " + x2 + " " + r1(t1) + " L" + x2 + " " + r1(t2) + " C " + c + " " + r1(t2) + " " + c + " " + r1(s2) + " " + x1 + " " + r1(s2) + " Z";
    };
    const flowRibbons = [];
    let sy = 12;
    if (F.appr) flowRibbons.push({ d: rib(10, 240, sy, sy + H.appr, c1.appr, c1.appr + H.appr), fill: "url(#ecFlow1)" });
    sy += H.appr;
    if (F.rej) flowRibbons.push({ d: rib(10, 240, sy, sy + H.rej, c1.rej, c1.rej + H.rej), fill: "url(#ecFlow2)" });
    sy += H.rej;
    if (F.sc) flowRibbons.push({ d: rib(10, 240, sy, sy + H.sc, c1.sc, c1.sc + H.sc), fill: "url(#ecFlow3)" });
    let sy2 = 12;
    if (F.alloc) flowRibbons.push({ d: rib(250, 480, sy2, sy2 + H.alloc, c2.alloc, c2.alloc + H.alloc), fill: "url(#ecFlow4)" });
    sy2 += H.alloc;
    if (F.wait) flowRibbons.push({ d: rib(250, 480, sy2, sy2 + H.wait, c2.wait, c2.wait + H.wait), fill: "url(#ecFlow5)" });
    let sy3 = 12;
    if (F.poc) flowRibbons.push({ d: rib(490, 720, sy3, sy3 + H.poc, c3.poc, c3.poc + H.poc), fill: "url(#ecFlow6)" });
    sy3 += H.poc;
    if (F.srcg) flowRibbons.push({ d: rib(490, 720, sy3, sy3 + H.srcg, c3.srcg, c3.srcg + H.srcg), fill: "url(#ecFlow7)" });
    const nodeDefs = [
      { x: 0, lx: 18, y: 12, h: H.sub, fill: "#134377", n: F.sub, title: "PR submitted", meta: F.sub + " · ₹" + F.subVal.toFixed(2) + " Cr" },
      { x: 240, lx: 258, y: c1.appr, h: H.appr, fill: "#1E7F4F", n: F.appr, title: "Approved", meta: F.appr + " · " + Math.round((F.appr / (F.sub || 1)) * 100) + "%" },
      { x: 240, lx: 258, y: c1.rej, h: H.rej, fill: "#C0392B", n: F.rej, title: "Rejected", meta: String(F.rej) },
      { x: 240, lx: 258, y: c1.sc, h: H.sc, fill: "#FED10A", n: F.sc, title: "Short-closed", meta: String(F.sc) },
      { x: 480, lx: 498, y: c2.alloc, h: H.alloc, fill: "#134377", n: F.alloc, title: "Allocated to buyer", meta: F.alloc + " · avg " + stages[2].toFixed(1) + "d" },
      { x: 480, lx: 498, y: c2.wait, h: H.wait, fill: "#C98A00", n: F.wait, title: "Awaiting allocation", meta: String(F.wait) },
      { x: 720, lx: 738, y: c3.poc, h: H.poc, fill: "#1E7F4F", n: F.poc, title: "PO issued", meta: F.poc + " · ₹" + F.poVal.toFixed(2) + " Cr" },
      { x: 720, lx: 738, y: c3.srcg, h: H.srcg, fill: "#C98A00", n: F.srcg, title: "In sourcing", meta: F.srcg + " · RFQ / BQ / TCC" },
    ].filter((n) => n.n > 0);
    const setSel = (arr) => this.setState({ jobSel: !arr.length || arr.length === this.JOBS.length ? null : arr });
    // A {{ hole }} inside an SVG <text> is wrapped in an SVG-namespaced <span> and
    // never paints, so SVG labels are built as real elements here instead.
    const T = (x, y, txt, extra) => React.createElement("text", Object.assign({ key: "t" + x + "_" + y + txt, x, y }, extra || {}), txt);
    return {
      poAxG: React.createElement("g", { style: { fontFamily: "var(--mono)" }, fontSize: 9.5, fill: "#a1a1a1", textAnchor: "end" }, [
        T(18, 13.5, String(pvMax)), T(18, 68.5, String(pvMax / 2)), T(18, 123.5, "0"),
      ]),
      jobOpen: this.state.jobOpen,
      toggleJobs: () => this.setState((st) => ({ jobOpen: !st.jobOpen })),
      closeJobs: () => this.setState({ jobOpen: false }),
      selectAllJobs: () => this.setState({ jobSel: null }),
      clearJobs: () => this.setState({ jobSel: null }),
      jobAll: all,
      jobFiltered: !all,
      jobBtnLabel: all ? "All jobs" : J.length === 1 ? J[0].code : J.length + " jobs",
      jobBtnStyle: "display:flex;align-items:center;gap:7px;height:32px;padding:0 11px;border-radius:8px;font-family:inherit;font-size:13px;font-weight:500;cursor:pointer;" + (all ? "border:1px solid #e5e5e5;background:#fff;color:#171717" : "border:1px solid #c3d8ec;background:#eef4fa;color:#134377"),
      jobChips: J.map((j) => ({ code: j.code, drop: () => setSel(codes.filter((c) => c !== j.code)) })),
      jobPickedLabel: all ? "All " + this.JOBS.length + " selected" : J.length + " of " + this.JOBS.length + " selected",
      jobFooter: all ? "Every job in your role context" : "Dashboard follows this selection",
      jobAllValue: "₹" + this.JOBS.reduce((n, j) => n + j.open, 0).toFixed(2) + " Cr open",
      allJobsStyle: "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border:none;border-radius:8px;background:" + (all ? "#f7fafc" : "transparent") + ";font-family:inherit;text-align:left;cursor:pointer",
      allBoxStyle: "width:15px;height:15px;flex:none;border-radius:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;" + (all ? "border:1.5px solid #134377;background:#134377" : "border:1.5px solid #c4ccd4;background:#fff"),
      jobRows: this.JOBS.map((j) => {
        const on = codes.indexOf(j.code) >= 0;
        return {
          code: j.code, name: j.name + " · " + j.loc, openVal: "₹" + j.open.toFixed(2) + " Cr", docs: j.flow.sub + " PRs · 30d", on,
          toggle: () => setSel(on ? codes.filter((c) => c !== j.code) : codes.concat([j.code])),
          rowStyle: "display:flex;align-items:center;gap:10px;width:100%;padding:8px 10px;border:none;border-radius:8px;background:" + (on ? "#f7fafc" : "transparent") + ";font-family:inherit;text-align:left;cursor:pointer",
          boxStyle: "width:15px;height:15px;flex:none;border-radius:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;" + (on ? "border:1.5px solid #134377;background:#134377" : "border:1.5px solid #c4ccd4;background:#fff"),
        };
      }),
      scopeNote: all ? "Scoped to this role · all " + this.JOBS.length + " jobs" : "Scoped to " + (J.length === 1 ? J[0].code : J.length + " of " + this.JOBS.length + " jobs"),
      scopeShort: all ? "all jobs" : J.length === 1 ? J[0].code : J.length + " jobs",
      actionRows,
      noActions: actionRows.length === 0,
      actionCount: String(acts.length),
      actionValue: big(acts.reduce((n, a) => n + a.val, 0)),
      feedRows,
      feedEmpty: feedRows.length === 0,
      hasSurplus: surp.length > 0,
      surMt: sh ? sh.mt + " MT" : "",
      surMat: sh ? sh.mat : "",
      surWh: sh ? sh.wh : "",
      surKm: sh ? sh.km + " km" : "",
      surSave: inr(surp.reduce((n, x) => n + x.save, 0)),
      surHasMore: surp.length > 1,
      surMore: surp.length > 1 && sh ? "+" + (surMtTotal - sh.mt) + " MT on " + (surp.length - 1) + (surp.length === 2 ? " other job" : " other jobs") : "",
      hasExpiry: expr.length > 0,
      expBatches: expB + (expB === 1 ? " batch" : " batches"),
      expHead: eh ? eh.mt + " MT " + eh.mat : "",
      expWh: eh ? eh.wh : "",
      expDays: eh ? eh.days + " days" : "",
      expValue: inr(expr.reduce((n, x) => n + x.value, 0)),
      hasBudget: bud.length > 0,
      budJobs: bud.length + (bud.length === 1 ? " job" : " jobs"),
      budCodes: bud.map((j) => j.code).join(" and "),
      budBlocked: inr(bud.reduce((n, j) => n + j.budget, 0)),
      insightCount: String((surp.length ? 1 : 0) + (expr.length ? 1 : 0) + (bud.length ? 1 : 0)),
      noInsights: !surp.length && !expr.length && !bud.length,
      cycleDocs: String(docs),
      cycleTotal: cycleTotal.toFixed(1),
      cycleAx1: fmt(axMax), cycleAx2: fmt(axMax * 0.75), cycleAx3: fmt(axMax * 0.5), cycleAx4: fmt(axMax * 0.25),
      stageBars,
      slaPct: slaPct + "%",
      slaArcStyle: "stroke-dasharray:" + r1((345.6 * slaPct) / 100) + " 345.6;animation:ecRadial 1.1s cubic-bezier(0,.7,.5,1) both",
      slaOnTime: String(slaOn), slaAtRisk: String(slaRisk), slaBreached: String(slaBr),
      apxWeek: wk[11] + " this wk",
      apxPoints: pts.map((p) => p.x + "," + p.y).join(" "),
      apxArea: "M" + pts.map((p) => p.x + " " + p.y).join(" L") + " L236.8 118 L8 118 Z",
      apxDots: pts.slice(0, 11),
      apxLastY: pts[11].y,
      ageBars,
      poBars,
      poProjY: r1(120 - projH),
      poProjH: r1(projH),
      poAx1: String(pvMax), poAx2: String(pvMax / 2),
      flowSub: String(F.sub),
      flowRibbons,
      flowNodes: nodeDefs.map((n) => ({ x: n.x, y: r1(n.y), h: r1(n.h), fill: n.fill })),
      ageLabG: React.createElement("g", { style: { fontFamily: "var(--ui)" }, fontSize: 9.5, fill: "#737373", textAnchor: "middle" },
        ageBars.map((a) => T(a.cx, 134, a.label))),
      flowLabG: React.createElement("g", { style: { fontFamily: "var(--ui)" }, fontSize: 10.5, fill: "#0a0a0a" }, [
        React.createElement("g", { key: "ft" }, nodeDefs.map((n) => T(n.lx, r1(n.y + n.h / 2 - 4), n.title, { fontWeight: 500 }))),
        React.createElement("g", { key: "fm", style: { fontFamily: "var(--mono)" }, fontSize: 9.5, fill: "#737373" },
          nodeDefs.map((n) => T(n.lx, r1(n.y + n.h / 2 + 12), n.meta))),
      ]),
    };
  }
  INSIGHTS = [
    { t: "surplus", job: "LDM02128", src: "Commodity", state: "open", age: "2d", val: 146000, led: "risk", title: "Surplus available — 26 MT TMT Bar Fe500D 12mm", det: "WH-HYD-01, 42 km by road · covers 52% of the open draft", act: "Raise transfer", go: "create" },
    { t: "expiry", job: "LDM04471", src: "Commodity", state: "open", age: "1d", val: 312000, led: "risk", title: "12 MT OPC 53 Cement expires in 26 days", det: "WH-CHN-01 · 2 batches · pour schedule can absorb 8 MT", act: "Raise transfer", go: "create" },
    { t: "budget", job: "LDM02128", src: "Governance", state: "open", age: "1d", val: 2640000, led: "risk", title: "Budget insufficient for an open draft", det: "PRC/2026/0041866 · Steel & Rebar · submit disabled until top-up", act: "Ask Buddy", go: "prd" },
    { t: "budget", job: "LDM04471", src: "Governance", state: "open", age: "2d", val: 1250000, led: "risk", title: "Budget insufficient for an open draft", det: "PRC/2026/0041902 · Cement & Aggregates · awaiting quarter release", act: "Ask Buddy", go: "prd" },
    { t: "rate", job: "LDM02128", src: "Sourcing", state: "open", age: "1d", val: 172000, led: "risk", title: "Indicative rate 4.2% above the last purchase", det: "TMT Bar Fe500D 16mm · ₹52,400/MT vs ₹50,290/MT on 14 Aug", act: "Ask Buddy", go: "prdadv" },
    { t: "vendor", job: "LDM04471", src: "Sourcing", state: "open", age: "2d", val: 890000, led: "risk", title: "3 invited vendors have not quoted", det: "RFQ/2026/0009301 · closes in 2 days · reminders go to registered email only", act: "Ask Buddy", go: "bids" },
    { t: "consol", job: "LDM03390", src: "Sourcing", state: "open", age: "5d", val: 460000, led: "risk", title: "3 requests could be consolidated", det: "Same category, 1.42× volume · one RFQ instead of three", act: "Ask Buddy", go: "alloc" },
    { t: "surplus", job: "LDM04471", src: "Commodity", state: "open", age: "3d", val: 68000, led: "risk", title: "Surplus available — 12 MT OPC 53 Cement", det: "WH-CHN-02, 18 km by road", act: "Raise transfer", go: "create" },
    { t: "expiry", job: "LDM02128", src: "Commodity", state: "open", age: "4d", val: 86000, led: "risk", title: "6 MT OPC 53 Cement expires in 41 days", det: "WH-CHN-01 · 1 batch", act: "Raise transfer", go: "create" },
    { t: "expiry", job: "LDM03390", src: "Commodity", state: "open", age: "6d", val: 88000, led: "risk", title: "4 MT Waterproofing Compound expires in 52 days", det: "WH-CBE-01 · 1 batch · shelf life cannot be extended", act: "Raise transfer", go: "create" },
    { t: "tcd", job: "LDM03390", src: "Governance", state: "open", age: "1d", val: 1245000, led: "risk", title: "TCD returned — landed cost basis queried", det: "TCD/2026/0004120 · FOR vs Ex-works on 2 of 6 lines", act: "Ask Buddy", go: "tcd" },
    { t: "surplus", job: "LDM02128", src: "Commodity", state: "actioned", age: "6d", val: 204000, led: "saved", title: "18 MT TMT 16mm transferred instead of bought", det: "From WH-CHN-03 · MRN posted 25 Aug", act: "Ask Buddy", go: "po" },
    { t: "rate", job: "LDM04471", src: "Sourcing", state: "actioned", age: "8d", val: 128000, led: "saved", title: "Vendor dropped 3.1% after the benchmark flag", det: "Deccan Cement Agencies · revision 2 accepted at TCC", act: "Ask Buddy", go: "tcc" },
    { t: "consol", job: "LDM02128", src: "Sourcing", state: "actioned", age: "11d", val: 96000, led: "saved", title: "2 requests consolidated into one RFQ", det: "RFQ/2026/0009266 · 1.31× volume, single freight leg", act: "Ask Buddy", go: "alloc" },
    { t: "expiry", job: "LDM04471", src: "Commodity", state: "actioned", age: "13d", val: 186000, led: "saved", title: "Near-expiry cement moved into the pour schedule", det: "8 MT consumed 4 days before expiry", act: "Ask Buddy", go: "prd" },
    { t: "budget", job: "LDM02128", src: "Governance", state: "actioned", age: "9d", val: 1420000, led: null, title: "Budget top-up approved, draft released", det: "PRC/2026/0041815 · released 21 Aug by Head–Procurement", act: "Ask Buddy", go: "prd" },
    { t: "surplus", job: "LDM02128", src: "Commodity", state: "declined", age: "3d", val: 214000, led: null, title: "Surplus declined — “delivery window too tight”", det: "38 MT at WH-HYD-01 · reason recorded on the PR audit trail", act: "Reconsider", go: "create" },
    { t: "vendor", job: "LDM03390", src: "Sourcing", state: "declined", age: "7d", val: 64000, led: null, title: "Rank-1 vendor swap declined", det: "Not empanelled for this category · reason recorded at issue", act: "Ask Buddy", go: "tcc" },
    { t: "shortclose", job: "LDM05114", src: "Governance", state: "declined", age: "10d", val: 38000, led: null, title: "Short-close suggestion declined", det: "Balance 28 MT still required for the landside deck", act: "Ask Buddy", go: "prd" },
    { t: "expiry", job: "LDM04471", src: "Commodity", state: "lapsed", age: "21d", val: 142000, led: "lapsed", title: "Batch expired before it was moved", det: "6 MT OPC 53 at WH-CHN-01 · written off 10 Aug", act: "Ask Buddy", go: "prd" },
    { t: "vendor", job: "LDM03390", src: "Sourcing", state: "lapsed", age: "18d", val: 280000, led: "lapsed", title: "RFQ closed with no quote from the rank-1 vendor", det: "RFQ/2026/0009180 · reminder never sent", act: "Ask Buddy", go: "bids" },
    { t: "surplus", job: "LDM05114", src: "Commodity", state: "lapsed", age: "24d", val: 368000, led: "lapsed", title: "Surplus consumed elsewhere before transfer", det: "22 MT structural steel drawn by another job on 7 Aug", act: "Ask Buddy", go: "alloc" },
  ];
  IICON = {
    surplus: { d1: "M1.8 6.6 8 2.6l6.2 4V13.4H1.8z", d2: "M5.8 13.4V9.4h4.4v4", tone: "blue" },
    expiry: { d1: "M8 3.6a5.4 5.4 0 1 0 0 10.8a5.4 5.4 0 1 0 0-10.8", d2: "M8 6.4V9l1.8 1.2M6.2 2.4h3.6", tone: "amber" },
    budget: { d1: "M3.8 4h8.4a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H3.8a1.6 1.6 0 0 1-1.6-1.6V5.6A1.6 1.6 0 0 1 3.8 4z", d2: "M2.2 6.8h11.6M10.4 9.6h1.6", tone: "red" },
    rate: { d1: "M2.2 12.4 6 8.4l2.6 2.2 5.2-6", d2: "M10.4 4.6h3.4V8", tone: "amber" },
    vendor: { d1: "M3.6 3.6h8.8a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H3.6a1.6 1.6 0 0 1-1.6-1.6V5.2a1.6 1.6 0 0 1 1.6-1.6z", d2: "m2.6 4.4 5.4 4 5.4-4", tone: "red" },
    consol: { d1: "M1.6 6.2h3.6v3.6H1.6zM10.8 2h3.6v3.6h-3.6zM10.8 10.4h3.6V14h-3.6z", d2: "M5.2 8h3.2V3.8h2.4M8.4 8v4.2h2.4", tone: "blue" },
    tcd: { d1: "M6 4.4 3.2 7.2 6 10", d2: "M3.2 7.2h6.2a3.4 3.4 0 0 1 0 6.8H8", tone: "amber" },
    shortclose: { d1: "M8 2.2a5.8 5.8 0 1 0 0 11.6a5.8 5.8 0 1 0 0-11.6", d2: "M5.4 8h5.2", tone: "grey" },
  };
  NKIND = { check: "Approval", card: "Budget", doc: "Vendor quote", person: "Allocation", send: "RFQ", x: "Vendor", docplus: "Draft", tri: "Advisory", minus: "Short-close" };
  // Past conversations. Each one opens the flow it was about, the same way an
  // insight row does — a thread is only useful if it lands you back on the document.
  HIST = [
    { day: "Today", t: "Create a PR", s: "Transfer 38 MT from LDM03390, then buy the balance 12 MT fresh", w: "10:41 AM", n: "14 messages", ref: "PRC/2026/0041872", job: "LDM02128", go: "create" },
    { day: "Today", t: "Where is PRC/2026/0041872 pending?", s: "Held at Head–SCM since 27 Aug · budget insufficient for Steel & Rebar", w: "09:12 AM", n: "6 messages", ref: "PRC/2026/0041872", job: "LDM02128", go: "prd" },
    { day: "Yesterday", t: "Why is the 16mm rate 4.2% higher?", s: "₹52,400/MT against ₹50,290/MT on 14 Aug · vendor cited coil cost", w: "04:38 PM", n: "9 messages", ref: "TMT Bar Fe500D 16mm", job: "LDM02128", go: "prdadv" },
    { day: "Yesterday", t: "Chase the vendors who have not quoted", s: "Three of four invited · RFQ closes in 2 days · reminders drafted, not sent", w: "02:05 PM", n: "7 messages", ref: "RFQ/2026/0009371", job: "LDM04471", go: "bids" },
    { day: "Yesterday", t: "Short-close the steel angles balance", s: "28 MT dropped, receipt closed at 12 MT · buyer reason recorded", w: "11:20 AM", n: "5 messages", ref: "PO/2026/0018690", job: "LDM03390", go: "polist" },
    { day: "29 Aug", t: "Compare landed cost on the 12mm TMT quotes", s: "Four sources on 50 MT · nearest hub cheaper by ₹640/MT once freight is counted", w: "05:14 PM", n: "12 messages", ref: "RFQ/2026/0009341", job: "LDM02128", go: "tcc" },
    { day: "29 Aug", t: "Who approves an override above ₹50 lakh?", s: "Head–SCM, then CFO above ₹2 Cr · no delegation set for this quarter", w: "03:47 PM", n: "4 messages", ref: "Governance", job: "LDM02128", go: "prdadv" },
    { day: "29 Aug", t: "Allocate the pending TMT requests", s: "Three requests consolidated into one RFQ · 1.42× volume on the same rate", w: "10:02 AM", n: "8 messages", ref: "LDM03390", job: "LDM03390", go: "alloc" },
    { day: "28 Aug", t: "Amend PO/2026/0018842 quantity", s: "60 MT to 78 MT · rate revision still awaiting Head–SCM", w: "04:22 PM", n: "11 messages", ref: "PO/2026/0018842", job: "LDM02128", go: "po" },
    { day: "28 Aug", t: "Draft the TCD for the TMT award", s: "Sunrise Steel Traders · 60 MT of 16mm and 20mm · L1 not recommended, deviation noted", w: "01:15 PM", n: "6 messages", ref: "RFQ/2026/0009266", job: "LDM02128", go: "tcd" },
  ];
  FLOW = {
    create: { convo: "pr", turn: 5, prSubmitted: false },
  };
  histVals() {
    const open = this.state.histOpen;
    const q = this.state.histQuery.trim().toLowerCase();
    const hits = this.HIST.filter((h) => !q || (h.t + " " + h.s + " " + h.ref + " " + h.job).toLowerCase().indexOf(q) >= 0);
    const groups = [];
    hits.forEach((h) => {
      let g = groups.filter((x) => x.day === h.day)[0];
      if (!g) { g = { day: h.day, rows: [] }; groups.push(g); }
      g.rows.push({
        t: h.t, s: h.s, w: h.w, n: h.n, ref: h.ref,
        open: () => {
          const t = this.FLOW[h.go];
          if (t) { this.setState(Object.assign({ histOpen: false, histQuery: "" }, t)); return; }
          this.openRes({ title: h.t, ref: h.ref, job: h.job, val: "", why: h.s, offer: "Picking that thread back up. I still hold the working state — say the word and I'll carry on from where it stopped.", primary: "Continue here", done: "Carried on. Anything that lands in EIP goes through the API once you confirm it." });
        },
      });
    });
    groups.forEach((g) => { g.count = g.rows.length === 1 ? "1 chat" : g.rows.length + " chats"; });
    return {
      histOpen: open,
      histClosed: !open,
      toggleHist: () => this.setState((s) => ({ histOpen: !s.histOpen, histQuery: "" })),
      closeHist: () => this.setState({ histOpen: false, histQuery: "" }),
      newChat: () => this.setState({ histOpen: false, histQuery: "", convo: null, turn: 1, prSubmitted: false, page: "dashboard" }),
      histBtnStyle: "display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;border:none;cursor:pointer;" + (open ? "background:#eef4fa;color:#134377" : "background:transparent;color:#525252"),
      histCount: this.HIST.length + " conversations · last 30 days",
      histQuery: this.state.histQuery,
      onHistQuery: (e) => this.setState({ histQuery: e.target.value }),
      clearHistQuery: () => this.setState({ histQuery: "" }),
      histHasQuery: q.length > 0,
      histSearchStyle: "display:flex;align-items:center;gap:8px;height:34px;padding:0 10px;border-radius:8px;background:#fff;border:1px solid " + (q ? "#c3d8ec" : "#e5e5e5"),
      histResultNote: hits.length === 0 ? "No matches for “" + this.state.histQuery.trim() + "”" : hits.length === 1 ? "1 conversation" : hits.length + " conversations",
      histGroups: groups,
      histNone: hits.length === 0,
      histSome: hits.length > 0,
    };
  }
  jobCodes() { const sl = this.state.jobSel; return sl ? sl : this.JOBS.map((j) => j.code); }
  insightVals() {
    const codes = this.jobCodes();
    const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
    const pillBase = "display:inline-flex;align-items:center;height:21px;padding:0 8px;border-radius:6px;font-size:11px;font-weight:500;white-space:nowrap;";
    const scoped = this.INSIGHTS.filter((x) => codes.indexOf(x.job) >= 0);
    const srcSel = this.state.iSrc;
    const tab = this.state.iTab;
    const counts = { open: 0, actioned: 0, declined: 0, lapsed: 0 };
    scoped.forEach((x) => { counts[x.state] += 1; });
    const led = { saved: 0, risk: 0, lapsed: 0 };
    scoped.forEach((x) => { if (x.led) led[x.led] += x.val; });
    const ledTot = led.saved + led.risk + led.lapsed || 1;
    const bySrc = { Commodity: 0, Governance: 0, Sourcing: 0 };
    scoped.forEach((x) => { bySrc[x.src] += 1; });
    const rows = scoped
      .filter((x) => (tab === "all" ? true : x.state === tab))
      .filter((x) => (srcSel ? x.src === srcSel : true))
      .map((x) => {
        const ic = this.IICON[x.t];
        const valTone = x.state === "actioned" ? "#1E7F4F" : x.state === "lapsed" ? "#A5322A" : x.state === "declined" ? "#737373" : "#134377";
        const valNote = x.state === "actioned" ? (x.led === "saved" ? "recovered" : "unblocked") : x.state === "lapsed" ? "lapsed" : x.state === "declined" ? "not taken" : "at stake";
        const stateTone = x.state === "open" ? this.TONE.blue : x.state === "actioned" ? this.TONE.green : x.state === "declined" ? this.TONE.grey : this.TONE.red;
        const stateLabel = x.state === "open" ? "Open" : x.state === "actioned" ? "Actioned" : x.state === "declined" ? "Declined" : "Lapsed";
        const srcTone = x.src === "Commodity" ? this.TONE.blue : x.src === "Sourcing" ? this.TONE.amber : this.TONE.grey;
        return {
          title: x.title, det: x.det, job: x.job, age: x.age, src: x.src, act: x.act, state: stateLabel,
          val: inr(x.val), valNote,
          valStyle: "font-family:var(--mono);font-size:13px;font-weight:500;color:" + valTone,
          statePill: pillBase + stateTone,
          srcPill: pillBase + srcTone,
          d1: ic.d1, d2: ic.d2,
          iconWrap: "width:30px;height:30px;flex:none;border-radius:8px;display:flex;align-items:center;justify-content:center;background:" + ({ blue: "#eef4fa", amber: "#fffbe6", red: "#fdeeec", grey: "#f5f5f5" })[ic.tone],
          stroke: ({ blue: "#134377", amber: "#C98A00", red: "#C0392B", grey: "#737373" })[ic.tone],
          rowStyle: x.state === "open" ? "display:grid;grid-template-columns:30px minmax(240px,1fr) 112px 96px 66px 132px 112px 150px;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #f5f5f5;background:#fff;min-width:1010px" : "display:grid;grid-template-columns:30px minmax(240px,1fr) 112px 96px 66px 132px 112px 150px;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #f5f5f5;background:#fcfdfd;min-width:1010px",
          titleStyle: x.state === "open" ? "font-size:13.5px;font-weight:500;color:#0a0a0a" : "font-size:13.5px;font-weight:500;color:#525252",
          actStyle: x.state === "open" ? "display:flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;border:none;background:#134377;font-family:inherit;font-size:12.5px;font-weight:600;color:#fff;cursor:pointer" : "display:flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 12px;border-radius:8px;border:1px solid #e5e5e5;background:#fff;font-family:inherit;font-size:12.5px;font-weight:500;color:#171717;cursor:pointer",
          open: () => {
            if (x.go === "create") { this.setState({ convo: "pr", turn: 1, prSubmitted: false, chatOpen: true, histOpen: false }); return; }
            this.openRes({ title: x.title, ref: x.job, job: x.job, val: inr(x.val), why: x.det, primary: x.act });
          },
        };
      });
    const tabDef = [
      { k: "open", l: "Open" }, { k: "actioned", l: "Actioned" }, { k: "declined", l: "Declined" }, { k: "lapsed", l: "Lapsed" }, { k: "all", l: "All" },
    ];
    const iTabs = tabDef.map((t) => ({
      label: t.l,
      count: t.k === "all" ? String(scoped.length) : String(counts[t.k]),
      pick: () => this.setState({ iTab: t.k }),
      style: "display:flex;align-items:center;gap:7px;height:30px;padding:0 12px;border:none;border-radius:7px;font-family:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;" + (tab === t.k ? "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font-weight:600;color:#0a0a0a" : "background:transparent;font-weight:500;color:#737373"),
      countStyle: "font-family:var(--mono);font-size:11px;" + (tab === t.k ? "color:#134377" : "color:#a1a1a1"),
    }));
    const srcChips = ["Commodity", "Governance", "Sourcing"].map((n) => ({
      label: n,
      count: String(bySrc[n]),
      pick: () => this.setState({ iSrc: srcSel === n ? null : n }),
      style: "display:flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:8px;font-family:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;" + (srcSel === n ? "border:1px solid #c3d8ec;background:#eef4fa;color:#134377;font-weight:500" : "border:1px solid #e5e5e5;background:#fff;color:#525252;font-weight:500"),
    }));
    return {
      onInsights: this.state.page === "insights",
      goInsights: (e) => { if (e) e.preventDefault(); this.setState({ page: "insights", iTab: "open", iSrc: null }); },
      navInsightsStyle: "position:relative;display:flex;align-items:center;gap:10px;padding:8px 10px;min-height:36px;box-sizing:border-box;flex:none;border-radius:8px;font-size:13.5px;" + (this.state.page === "insights" ? "background:#e2ecf6;color:#134377;font-weight:500" : "color:#525252"),
      insightOpenCount: String(counts.open),
      iRows: rows,
      iEmpty: rows.length === 0,
      iTabs,
      srcChips,
      iSrcActive: !!srcSel,
      clearSrc: () => this.setState({ iSrc: null }),
      ledSaved: inr(led.saved),
      ledRisk: inr(led.risk),
      ledLapsed: inr(led.lapsed),
      ledSavedN: counts.actioned + (counts.actioned === 1 ? " insight actioned" : " insights actioned"),
      ledRiskN: counts.open + (counts.open === 1 ? " insight open" : " insights open"),
      ledLapsedN: counts.lapsed + (counts.lapsed === 1 ? " insight lapsed" : " insights lapsed"),
      ledBarSaved: "height:8px;border-radius:4px 0 0 4px;background:#1E7F4F;width:" + ((led.saved / ledTot) * 100).toFixed(1) + "%",
      ledBarRisk: "height:8px;background:#134377;width:" + ((led.risk / ledTot) * 100).toFixed(1) + "%",
      ledBarLapsed: "height:8px;border-radius:0 4px 4px 0;background:#C0392B;width:" + ((led.lapsed / ledTot) * 100).toFixed(1) + "%",
      ledRate: scoped.length ? Math.round((counts.actioned / scoped.length) * 100) + "%" : "—",
    };
  }
  notifVals() {
    const codes = this.jobCodes();
    const tab = this.state.nTab;
    const src = [];
    if (tab !== "actions") this.FEED.updates.forEach((f) => src.push(Object.assign({}, f, { who: "Update" })));
    if (tab !== "updates") this.FEED.actions.forEach((f) => src.push(Object.assign({}, f, { who: "You" })));
    const items = src.filter((f) => codes.indexOf(f.job) >= 0);
    const bucket = (w) => (w.indexOf("min") >= 0 || w.indexOf("hr") >= 0 ? "Today" : w === "Yesterday" ? "Yesterday" : "Earlier this week");
    const order = ["Today", "Yesterday", "Earlier this week"];
    const groups = order.map((label) => ({
      label,
      items: items.filter((f) => bucket(f.when) === label).map((f) => {
        const ic = this.FICON[f.icon];
        return {
          pre: f.pre || "", ref: f.ref || "", mid: f.mid || "", strong: f.strong || "", post: f.post || "",
          when: f.when, job: f.job, kind: this.NKIND[f.icon] || "Update", who: f.who,
          d1: ic.d1, d2: ic.d2 || "", stroke: this.FTONE[f.tone],
          iconWrap: "width:28px;height:28px;flex:none;border-radius:8px;background:#f7fafc;display:flex;align-items:center;justify-content:center",
          whoStyle: "display:inline-flex;align-items:center;height:19px;padding:0 7px;border-radius:5px;font-size:10.5px;font-weight:600;letter-spacing:0.03em;text-transform:uppercase;white-space:nowrap;" + (f.who === "You" ? "background:#eef4fa;color:#134377;border:1px solid #c3d8ec" : "background:#fafafa;color:#737373;border:1px solid #e5e5e5"),
        };
      }),
    })).filter((g) => g.items.length > 0);
    groups.forEach((g) => { g.count = g.items.length + (g.items.length === 1 ? " item" : " items"); });
    const nt = (k, l) => ({
      label: l,
      pick: () => this.setState({ nTab: k }),
      style: "height:30px;padding:0 13px;display:flex;align-items:center;border:none;border-radius:7px;font-family:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;" + (tab === k ? "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font-weight:600;color:#0a0a0a" : "background:transparent;font-weight:500;color:#737373"),
    });
    return {
      onNotif: this.state.page === "notif",
      goNotif: (e) => { if (e) e.preventDefault(); this.setState({ page: "notif" }); },
      notifGroups: groups,
      notifEmpty: groups.length === 0,
      notifTotal: items.length + (items.length === 1 ? " notification" : " notifications"),
      nTabAll: nt("all", "All"),
      nTabUpdates: nt("updates", "Updates"),
      nTabActions: nt("actions", "Your actions"),
    };
  }
  applyFont() {
    const ui = this.props.uiFont ?? "Lexend";
    const mono = this.props.monoFont ?? "Lexend";
    document.body.style.setProperty("--ui", this.STACKS[ui] || this.STACKS.Lexend);
    document.body.style.setProperty("--mono", this.STACKS[mono] || this.STACKS.Lexend);
    // A proportional face in the mono slot loses column alignment — tabular figures win it back.
    document.body.style.fontVariantNumeric = this.TRUE_MONO.indexOf(mono) >= 0 ? "normal" : "tabular-nums";
  }
  componentDidMount() { this.applyFont();
  }
  componentDidUpdate() { this.applyFont(); }
  DICON = {
    ret: { d1: "M6 4.4 3.2 7.2 6 10", d2: "M3.2 7.2h6.2a3.4 3.4 0 0 1 0 6.8H8" },
    warn: { d1: "M8 2.6 14.2 13.4H1.8z", d2: "M8 6.4v3M8 11.4v.2" },
    clock: { d1: "M8 3.2a5.4 5.4 0 1 0 0 10.8a5.4 5.4 0 1 0 0-10.8", d2: "M8 6v2.6l1.8 1.2M6.2 2h3.6" },
    mail: { d1: "M3.6 3.6h8.8a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H3.6a1.6 1.6 0 0 1-1.6-1.6V5.2a1.6 1.6 0 0 1 1.6-1.6z", d2: "m2.6 4.4 5.4 4 5.4-4" },
    cube: { d1: "M2.4 5.2 8 2.4l5.6 2.8v5.6L8 13.6l-5.6-2.8z", d2: "M2.4 5.2 8 8l5.6-2.8M8 8v5.6" },
    alloc: { d1: "M6.4 3.2a2.4 2.4 0 1 0 0 4.8a2.4 2.4 0 1 0 0-4.8", d2: "M2.4 13c.5-2 2.1-3.2 4-3.2M11 6.6 13.2 8.8 11 11" },
    appr: { d1: "M8 2.2a5.8 5.8 0 1 0 0 11.6a5.8 5.8 0 1 0 0-11.6", d2: "m5.6 8.2 1.6 1.6 3.2-3.6" },
    rate: { d1: "M2.2 12.4 6 8.4l2.6 2.2 5.2-6", d2: "M10.4 4.6h3.4V8" },
    cons: { d1: "M1.6 6.2h3.6v3.6H1.6zM10.8 2h3.6v3.6h-3.6zM10.8 10.4h3.6V14h-3.6z", d2: "M5.2 8h3.2V3.8h2.4M8.4 8v4.2h2.4" },
    jcr: { d1: "M4 2.8h8a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H4a1.6 1.6 0 0 1-1.6-1.6V4.4A1.6 1.6 0 0 1 4 2.8z", d2: "M5.2 6h5.6M5.2 8.6h3.6" },
    money: { d1: "M3.8 4h8.4a1.6 1.6 0 0 1 1.6 1.6v5.2a1.6 1.6 0 0 1-1.6 1.6H3.8a1.6 1.6 0 0 1-1.6-1.6V5.6A1.6 1.6 0 0 1 3.8 4z", d2: "M2.2 6.8h11.6M10.4 9.6h1.6" },
    surplus: { d1: "M1.8 6.6 8 2.6l6.2 4V13.4H1.8z", d2: "M5.8 13.4V9.4h4.4v4" },
    expiry: { d1: "M8 3.6a5.4 5.4 0 1 0 0 10.8a5.4 5.4 0 1 0 0-10.8", d2: "M8 6.4V9l1.8 1.2M6.2 2.4h3.6" },
    vendor: { d1: "M3.6 3.6h8.8a1.6 1.6 0 0 1 1.6 1.6v5.6a1.6 1.6 0 0 1-1.6 1.6H3.6a1.6 1.6 0 0 1-1.6-1.6V5.2a1.6 1.6 0 0 1 1.6-1.6z", d2: "m2.6 4.4 5.4 4 5.4-4" },
  };
  DBG = { red: "#fdeeec", amber: "#fffbe6", blue: "#eef4fa", green: "#eaf5ef", grey: "#f5f5f5" };
  DSK = { red: "#C0392B", amber: "#C98A00", blue: "#134377", green: "#1E7F4F", grey: "#737373" };
  DVT = { red: "#A5322A", amber: "#9A6B00", blue: "#134377", green: "#1E7F4F", grey: "#737373" };
  PKEYS = ["site", "cat", "head"];
  PERSONAS = {
    site: {
      label: "Site Buyer", role: "Site Buyer", title: "Your job, today",
      scope: "LDM02128", scopeSub: "Chennai Metro Package C4 · one job, one warehouse · WH-CHN-03", openVal: "₹1.09 Cr",
      kpis: [
        { label: "Needs you now", val: "6", note: "2 past SLA", nt: "red", sub: "oldest 3 d" },
        { label: "Value at stake", val: "₹1.09 Cr", sub: "across those 6 items" },
        { label: "My drafts", val: "5", note: "1 blocked", nt: "amber", sub: "₹68.4 L" },
        { label: "Budget free", val: "₹42.6 L", sub: "Steel & Rebar head" },
        { label: "My turnaround", val: "1.4 d", sub: "against a 2 d SLA", bar: 72, bt: "#1E7F4F" },
      ],
      acts: [
        { id: "s1", icon: "ret", tone: "red", title: "PR returned — needs revision", ref: "PRC/2026/0041790", sub: "Shuttering Plywood 12mm", age: "3 d old", flag: "SLA breached", ft: "red", val: "₹18,40,000", act: "Revise here",
          why: "R. Krishnan returned it three days ago: line 2 asks for 12 mm plywood where the approved BBS says 16 mm. Nothing else was queried.",
          offer: "I can correct line 2 to 16 mm, keep the quantity and need-by date as they are, and re-raise it against the same budget head.",
          done: "Re-raised. EIP returned PRC/2026/0041934 and it is back with R. Krishnan — level 1 cleared automatically because only the specification changed." },
        { id: "s2", icon: "warn", tone: "red", title: "Draft blocked on budget", ref: "PRC/2026/0041866", sub: "Steel & Rebar short by ₹26.4 L", age: "2 d old", flag: "Submit disabled", ft: "amber", val: "₹26,40,000", act: "Fix here",
          why: "The Steel & Rebar head on this job has ₹42.6 L free against ₹69.0 L of open drafts, so this one cannot submit. Nothing about the draft itself is wrong.",
          offer: "Short-closing PRC/2026/0039660 releases ₹28.2 L — its balance 28 MT is no longer required. That clears this draft without going to Finance.",
          done: "Short-closed through the API. ₹28.2 L is back on the head and PRC/2026/0041866 can now submit." },
        { id: "s3", icon: "clock", tone: "amber", title: "2 RFQs close today", ref: "RFQ/2026/0009363", sub: "+1 · 5 invited, 3 quoted", age: "closes 17:00", flag: "Today", ft: "amber", val: "₹41,20,000", act: "Review quotes" },
        { id: "s4", icon: "ret", tone: "amber", title: "TCD returned for correction", ref: "TCD/2026/0004120", sub: "landed-cost basis queried on 2 lines", age: "1 d old", val: "₹12,45,000", act: "Correct here" },
        { id: "s5", icon: "mail", tone: "red", title: "3 vendor responses overdue", ref: "RFQ/2026/0009301", sub: "Sunrise Steel Traders +2", age: "2 d old", flag: "SLA breached", ft: "red", val: "₹8,90,000", act: "Chase vendors" },
        { id: "s6", icon: "cube", tone: "blue", title: "PO amendment awaiting your input", ref: "PO/2026/0028104", sub: "delivery date revised by vendor", age: "1 d old", val: "₹2,05,000", act: "Review change" },
      ],
      ins: [
        { prio: "P1", icon: "surplus", tone: "blue", title: "Surplus covers 76% of your open draft", body: "38 MT TMT Bar Fe500D 12mm sits at WH-HYD-01, 42 km by road. A transfer beats a fresh purchase on both landed cost and the need-by date.", mLabel: "Potential saving", mVal: "₹1,46,000", mt: "green", act: "Raise transfer", go: "create" },
        { prio: "P2", icon: "expiry", tone: "amber", title: "Near-expiry stock on your job", body: "12 MT OPC 53 Cement at WH-CHN-01 expires in 26 days. The pour schedule can absorb 8 MT if it moves this week.", mLabel: "Value at risk", mVal: "₹3,12,000", mt: "amber", act: "Raise transfer", go: "create" },
        { prio: "P3", icon: "money", tone: "red", title: "One draft is blocked on budget", body: "PRC/2026/0041866 cannot submit. Short-closing a stalled request on the same head releases more than enough to clear it.", mLabel: "Blocked value", mVal: "₹26,40,000", mt: "red", act: "Fix here", go: "res" },
        { prio: "P4", icon: "rate", tone: "amber", title: "Indicative rate 4.2% above last purchase", body: "TMT Bar Fe500D 16mm quoted at ₹52,400/MT against ₹50,290/MT on 14 Aug. Worth testing at RFQ before award.", mLabel: "Exposure", mVal: "₹1,72,000", mt: "amber", act: "Ask Buddy", go: "res" },
        { prio: "P5", icon: "vendor", tone: "blue", title: "3 invited vendors have not quoted", body: "RFQ/2026/0009301 closes in two days. Reminders reach the registered email only, so a call may be faster.", mLabel: "Value at risk", mVal: "₹8,90,000", mt: "amber", act: "Chase vendors", go: "res" },
      ],
    },
    cat: {
      label: "Category Manager", role: "Category Manager", title: "Steel & Rebar, across your jobs",
      scope: "Steel & Rebar", scopeSub: "12 jobs · South cluster · Central purchase group", openVal: "₹2.71 Cr",
      kpis: [
        { label: "Open value", val: "₹4.82 Cr", sub: "12 jobs in category" },
        { label: "Awaiting allocation", val: "9", note: "3 ageing", nt: "amber", sub: "oldest 4 d" },
        { label: "RFQs live", val: "7", note: "2 close today", nt: "amber", sub: "38 vendors invited" },
        { label: "Rate vs benchmark", val: "+3.4%", sub: "12mm TMT · 30 d" },
        { label: "Saving found", val: "₹18.6 L", sub: "90 d · 14 actioned" },
      ],
      acts: [
        { id: "c1", icon: "alloc", tone: "amber", title: "9 PRs awaiting allocation", ref: "Steel & Rebar", sub: "7 jobs · 3 older than 2 days", age: "oldest 4 d", flag: "Ageing", ft: "amber", val: "₹1,86,40,000", act: "Allocate here",
          why: "Nine requests across seven jobs are unallocated in your category. Three have waited more than two days, and two of those sit on jobs with a need-by inside ten days.",
          offer: "I can group them the way they would buy best — four TMT requests into one RFQ at 1.42× volume, the rest routed to the cluster buyers who already hold those jobs.",
          done: "Allocated. Four requests merged into RFQ/2026/0009402 and five routed to cluster buyers, all written to EIP through the API." },
        { id: "c2", icon: "clock", tone: "amber", title: "2 RFQs close today", ref: "RFQ/2026/0009363", sub: "12 vendors invited across both", age: "closes 17:00", flag: "Today", ft: "amber", val: "₹41,20,000", act: "Review quotes",
          why: "Both close at 17:00. One has three of five quotes in, the other two of seven — and the second is the 16mm award that blocks two jobs.",
          offer: "I can extend the weaker one by 24 hours and send a final reminder to the four who have opened but not quoted.",
          done: "Extended to tomorrow 17:00 and reminders sent. Both changes are on the RFQ audit trail in EIP." },
        { id: "c3", icon: "ret", tone: "red", title: "TCC deviation needs your note", ref: "TCC/2026/0002214", sub: "L1 not recommended on the 16mm award", age: "2 d old", flag: "Blocks award", ft: "red", val: "₹34,50,000", act: "Add note here" },
        { id: "c4", icon: "cons", tone: "blue", title: "4 requests could be consolidated", ref: "LDM03390 +2", sub: "same category · 1.42× volume", age: "5 d old", val: "₹6,20,000", act: "Merge here" },
        { id: "c5", icon: "rate", tone: "amber", title: "Rate 4.2% above last purchase on 3 jobs", ref: "TMT Fe500D 16mm", sub: "commodity feed trending up", age: "1 d old", val: "₹5,16,000", act: "Ask Buddy" },
        { id: "c6", icon: "mail", tone: "blue", title: "2 vendors pending empanelment renewal", ref: "VEN-0028117 +1", sub: "cannot receive orders after 30 Sep", age: "6 d old", val: "₹28,40,000", act: "Chase here" },
      ],
      ins: [
        { prio: "P1", icon: "cons", tone: "blue", title: "Four requests could buy as one", body: "Same category, same window, 1.42× volume and a single freight leg instead of three. One RFQ replaces four.", mLabel: "Potential saving", mVal: "₹6,20,000", mt: "green", act: "Merge here", go: "res" },
        { prio: "P2", icon: "rate", tone: "amber", title: "16mm quoted above benchmark on 3 jobs", body: "₹52,400/MT against a ₹50,290/MT benchmark. The same two vendors are behind all three quotes.", mLabel: "Exposure", mVal: "₹5,16,000", mt: "amber", act: "Ask Buddy", go: "res" },
        { prio: "P3", icon: "vendor", tone: "red", title: "One vendor holds 68% of category spend", body: "Sunrise Steel Traders is on 9 of 13 live orders. Two empanelled alternatives have not been invited in 90 days.", mLabel: "Concentration", mVal: "68%", mt: "red", act: "Ask Buddy", go: "res" },
        { prio: "P4", icon: "surplus", tone: "blue", title: "Surplus pool across four jobs", body: "64 MT of rebar idle at three warehouses while four jobs hold open drafts for the same grade.", mLabel: "Potential saving", mVal: "₹4,80,000", mt: "green", act: "Raise transfer", go: "create" },
        { prio: "P5", icon: "money", tone: "blue", title: "No rate contract covers 12mm rebar", body: "MAT-1000482 has run on spot quotes all year. Central finalises steel contracts annually and the next window opens in November.", mLabel: "Annual volume", mVal: "₹6.4 Cr", mt: "blue", act: "Ask Buddy", go: "res" },
      ],
    },
    head: {
      label: "SCM Head", role: "Head–SCM, South", title: "South region · where time and money are going",
      scope: "38 jobs", scopeSub: "4 clusters · all categories · rolling 30 days", openVal: "₹11.1 Cr",
      kpis: [
        { label: "Cycle time PR→PO", val: "24.8 d", note: "−1.6 d", nt: "green", sub: "vs last month" },
        { label: "SLA compliance", val: "77%", note: "14 breaches", nt: "red", sub: "this month", bar: 77, bt: "#C98A00" },
        { label: "Open value", val: "₹42.6 Cr", sub: "38 jobs · 4 clusters" },
        { label: "Stuck beyond 5 d", val: "11", sub: "₹6.1 Cr held" },
        { label: "Recovered by agents", val: "₹1.24 Cr", sub: "90 d · 62% actioned" },
      ],
      acts: [
        { id: "h1", icon: "clock", tone: "red", title: "11 documents stuck beyond 5 days", ref: "4 clusters", sub: "7 with approvers, 4 with vendors", age: "oldest 11 d", flag: "SLA breached", ft: "red", val: "₹6,10,00,000", act: "See where",
          why: "Eleven documents have not moved in five days or more. Seven sit with approvers — five of those with one person, R. Krishnan, who has 11 approvals open.",
          offer: "I can send each approver one consolidated reminder listing only their own overdue items, and flag the two whose need-by dates fall inside a week.",
          done: "Reminders sent to four approvers through the API, itemised per person. The two need-by-critical documents are marked for escalation tomorrow if they have not moved." },
        { id: "h2", icon: "appr", tone: "red", title: "3 approvals waiting on you", ref: "Above the ₹50 L band", sub: "Chennai and Coimbatore clusters", age: "oldest 3 d", flag: "2 past SLA", ft: "red", val: "₹1,12,40,000", act: "Approve here",
          why: "Three requests are in your band. Two have passed the two-day SLA, and one of those is the viaduct pour on LDM02128 with a 15 Sep need-by.",
          offer: "I can walk you through all three here — suggested decision, deviation from the ranking and the reason on record for each.",
          done: "Two approved and one returned with your note. All three are on the EIP workflow trace with you as the approver of record." },
        { id: "h3", icon: "jcr", tone: "amber", title: "JCR lapses in 6 days on 2 jobs", ref: "LDM03390 +1", sub: "all procurement halts on lapse", age: "6 d left", flag: "Hard block", ft: "amber", val: "₹3,40,00,000", act: "Chase owners" },
        { id: "h4", icon: "rate", tone: "amber", title: "Cycle time up 3.1 d in Coimbatore", ref: "Cluster 4", sub: "allocation stage carries all of it", age: "30 d trend", val: "—", act: "Ask Buddy" },
        { id: "h5", icon: "warn", tone: "blue", title: "₹1.42 Cr of agent value unactioned", ref: "18 insights", sub: "open longer than 7 days", age: "7 d+", val: "₹1,42,00,000", act: "Review insights" },
        { id: "h6", icon: "money", tone: "blue", title: "2 budget top-ups pending Finance", ref: "LDM02128 +1", sub: "blocking 3 drafts", age: "4 d old", val: "₹38,90,000", act: "Chase Finance" },
      ],
      ins: [
        { prio: "P1", icon: "expiry", tone: "red", title: "₹38.4 L lapsed in 90 days", body: "Opportunities the agents raised that nobody acted on before they expired. Six of nine were near-expiry stock, in two clusters.", mLabel: "Value lapsed", mVal: "₹38,40,000", mt: "red", act: "Review insights", go: "res" },
        { prio: "P2", icon: "clock", tone: "amber", title: "Approval is 41% of the cycle", body: "9.8 of the 24.8-day PR→PO cycle sits in approval, and 62% of that is one level. A delegation for the ₹50 L–₹2 Cr band would cut it.", mLabel: "Time recoverable", mVal: "4.1 d", mt: "blue", act: "Ask Buddy", go: "res" },
        { prio: "P3", icon: "money", tone: "blue", title: "₹2.9 Cr locked in stalled requests", body: "Fourteen requests older than 30 days with no vendor response. Short-closing them releases the budget inside this quarter.", mLabel: "Budget recoverable", mVal: "₹2,90,00,000", mt: "green", act: "Ask Buddy", go: "res" },
        { prio: "P4", icon: "vendor", tone: "blue", title: "Vendor concentration in two clusters", body: "Three vendors carry 71% of awarded value in South, and two categories have a single empanelled supplier.", mLabel: "Awarded value", mVal: "₹28.4 Cr", mt: "blue", act: "Ask Buddy", go: "res" },
        { prio: "P5", icon: "cons", tone: "blue", title: "Consolidation left on the table", body: "Eleven RFQs in 30 days that could have been four — same category, same window, different jobs.", mLabel: "Potential saving", mVal: "₹22,40,000", mt: "green", act: "Ask Buddy", go: "res" },
      ],
    },
  };
  openRes(p) {
    const res = Object.assign({
      offer: "I can take this on here — I'll show you exactly what goes to EIP and write it only once you confirm.",
      done: "Done. Written to EIP through the API, with the audit trail recording it as raised from Buddy.",
      val: "", ref: "", job: "",
    }, Object.keys(p).reduce((o, k) => { if (p[k] !== undefined && p[k] !== null) o[k] = p[k]; return o; }, {}));
    this.setState({ convo: "resolve", res, resDone: false, chatOpen: true, histOpen: false });
  }
  resVals() {
    const r = this.state.res;
    const TOP = {
      pending: { title: "Revise PRC/2026/0041790", ref: "PRC/2026/0041790", job: "LDM02128", val: "₹18,40,000",
        why: "R. Krishnan returned it three days ago: line 2 asks for 12 mm plywood where the approved BBS says 16 mm.",
        offer: "I can correct line 2, keep everything else, and re-raise it against the same budget head.",
        primary: "Correct and re-raise",
        done: "Re-raised. EIP returned PRC/2026/0041934 and it is back with R. Krishnan." },
      where: { title: "Nudge the approver on PRC/2026/0041872", ref: "PRC/2026/0041872", job: "LDM02128", val: "₹26,67,200",
        why: "It has been with R. Krishnan for 2 days 4 hours against a 2-day SLA. He has 11 approvals open and this one sits fourth by value.",
        offer: "I can send him a reminder naming only this document and its need-by date, and copy the cluster head if it has not moved by tomorrow.",
        primary: "Send the reminder",
        done: "Reminder sent through the API and logged on the PR audit trail. I'll raise it again at 10:00 tomorrow if nothing has changed." },
      drafts: { title: "Unblock PRC/2026/0041866", ref: "PRC/2026/0041866", job: "LDM02128", val: "₹26,40,000",
        why: "The Steel & Rebar head on LDM02128 is short by ₹26.4 L against the drafts already open on it. Nothing about the draft itself is wrong.",
        offer: "Short-closing PRC/2026/0039660 releases ₹28.2 L — its balance 28 MT is no longer required. That clears this draft without going to Finance.",
        primary: "Short-close and release",
        done: "Short-closed through the API. ₹28.2 L is back on the head and PRC/2026/0041866 can now submit." },
    };
    return {
      convoResolve: this.state.convo === "resolve" && !!r,
      resTitle: r ? r.title : "",
      resWhy: r ? r.why : "",
      resOffer: r ? r.offer : "",
      resRef: r ? r.ref || "—" : "",
      resJob: r ? r.job || "—" : "",
      resVal: r ? r.val : "",
      resHasVal: !!(r && r.val),
      resPrimary: r ? r.primary : "",
      resDoneLine: r ? r.done : "",
      resPending: !this.state.resDone,
      resDone: this.state.resDone,
      doRes: () => this.setState({ resDone: true }),
      resolveTop: () => this.openRes(TOP[this.state.convo] || TOP.pending),
    };
  }
  personaVals() {
    const pk = this.state.persona || this.props.persona || "site";
    const P = this.PERSONAS[pk] || this.PERSONAS.site;
    const slaFlags = this.props.showSlaFlags ?? true;
    const cap = Math.max(3, Math.min(6, Math.round(this.props.actionsVisible ?? 3)));
    const FLAG = {
      red: "font-size:9.5px;font-weight:500;color:#A5322A;background:#fdeeec;border:1px solid #f3c9c4;border-radius:5px;padding:1px 6px;white-space:nowrap",
      amber: "font-size:9.5px;font-weight:500;color:#6b5200;background:#fffbe6;border:1px solid #ffe480;border-radius:5px;padding:1px 6px;white-space:nowrap",
    };
    const NOTE = {
      red: "font-size:9px;font-weight:600;color:#A5322A;background:#fdeeec;border:1px solid #f3c9c4;border-radius:4px;padding:0 4px;white-space:nowrap;flex:none",
      amber: "font-size:9px;font-weight:600;color:#9A6B00;background:#fffbe6;border:1px solid #ffe480;border-radius:4px;padding:0 4px;white-space:nowrap;flex:none",
      green: "font-size:9px;font-weight:600;color:#1E7F4F;background:#eaf5ef;border:1px solid #b9dcc8;border-radius:4px;padding:0 4px;white-space:nowrap;flex:none",
    };
    const TIER = (a) => {
      const f = (a.flag || "").toLowerCase();
      if (f.indexOf("breach") >= 0 || f.indexOf("today") >= 0 || f.indexOf("block") >= 0) return 0;
      if (f) return 1;
      return 2;
    };
    const left = P.acts.filter((a) => this.state.done.indexOf(a.id) < 0)
      .map((a, i) => ({ a, i, t: TIER(a) }))
      .sort((x, y) => (x.t - y.t) || (x.i - y.i))
      .map((x) => x.a);
    const shown = this.state.actsOpen ? left : left.slice(0, cap);
    const actRows = shown.map((a) => {
      const ic = this.DICON[a.icon] || this.DICON.warn;
      return {
        title: a.title, ref: a.ref, sub: a.sub, age: a.age, val: a.val, act: a.act,
        d1: ic.d1, d2: ic.d2, stroke: this.DSK[a.tone],
        iconWrap: "width:26px;height:26px;border-radius:7px;background:" + this.DBG[a.tone] + ";display:flex;align-items:center;justify-content:center",
        flag: !!a.flag && slaFlags, flagLabel: a.flag, flagStyle: FLAG[a.ft] || FLAG.amber,
        go: () => this.openRes({ title: a.title, ref: a.ref, job: P.scope, val: a.val, why: a.why || (a.sub + " · " + a.ref + ", open " + a.age + "."), offer: a.offer, primary: a.act, done: a.done }),
        done: () => this.setState((st) => ({ done: st.done.concat([a.id]) })),
      };
    });
    const insAll = P.ins;
    const insShown = this.state.insOpen ? insAll : insAll.slice(0, 3);
    const insCards = insShown.map((x, i) => {
      const ic = this.DICON[x.icon] || this.DICON.surplus;
      return {
        title: x.title, body: x.body, prio: x.prio, mLabel: x.mLabel, mVal: x.mVal, act: x.act,
        d1: ic.d1, d2: ic.d2, stroke: this.DSK[x.tone],
        iconWrap: "width:24px;height:24px;flex:none;border-radius:7px;background:" + this.DBG[x.tone] + ";display:flex;align-items:center;justify-content:center",
        prioStyle: "flex:none;font-family:var(--mono);font-size:9.5px;font-weight:500;color:#134377;background:#fff;border:1px solid #c3d8ec;border-radius:20px;padding:1px 6px",
        mStyle: "font-family:var(--mono);font-size:12.5px;font-weight:500;color:" + this.DVT[x.mt],
        btnStyle: i === 0
          ? "display:flex;align-items:center;justify-content:center;gap:6px;height:27px;padding:0 11px;border-radius:7px;border:none;background:#134377;font-family:inherit;font-size:11px;font-weight:600;color:#fff;cursor:pointer;align-self:flex-start"
          : "display:flex;align-items:center;justify-content:center;gap:6px;height:27px;padding:0 11px;border-radius:7px;border:1px solid #e5e5e5;background:#fff;font-family:inherit;font-size:11px;font-weight:600;color:#171717;cursor:pointer;align-self:flex-start",
        go: () => {
          if (x.go === "create") { this.setState({ convo: "pr", turn: 1, prSubmitted: false, chatOpen: true, histOpen: false }); return; }
          this.openRes({ title: x.title, ref: x.mLabel + " " + x.mVal, job: P.scope, val: x.mVal, why: x.body, primary: x.act });
        },
      };
    });
    return {
      personaTabs: this.PKEYS.map((k) => ({
        label: this.PERSONAS[k].label,
        pick: () => this.setState({ persona: k, actsOpen: false, insOpen: false }),
        style: "height:24px;padding:0 10px;display:flex;align-items:center;border:none;border-radius:6px;font-family:inherit;font-size:10.5px;cursor:pointer;white-space:nowrap;" + (pk === k ? "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font-weight:600;color:#0a0a0a" : "background:transparent;font-weight:500;color:#737373"),
      })),
      personaTitle: P.title,
      personaRole: P.role,
      personaScope: P.scope,
      personaScopeSub: P.scopeSub,
      kpis: P.kpis.map((k) => ({
        label: k.label, val: k.val, sub: k.sub,
        hasNote: !!k.note, note: k.note || "", noteStyle: NOTE[k.nt] || NOTE.amber,
        hasBar: !!k.bar, barStyle: "height:4px;border-radius:2px;width:" + (k.bar || 0) + "%;background:" + (k.bt || "#134377"),
      })),
      actRows,
      noActs: left.length === 0,
      actCount: String(left.length),
      actValue: (() => {
        const n = left.reduce((t, a) => t + (parseInt(String(a.val).replace(/[^0-9]/g, ""), 10) || 0), 0);
        if (!n) return "—";
        return n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr" : "₹" + (Math.round(n / 1e4) / 10).toFixed(1) + " L";
      })(),
      actMore: left.length > cap,
      actMoreLabel: this.state.actsOpen ? "Show fewer" : "See " + (left.length - cap) + " more",
      toggleActs: () => this.setState((st) => ({ actsOpen: !st.actsOpen })),
      insCards,
      insCount: String(insAll.length),
      insMore: insAll.length > 3,
      insMoreLabel: this.state.insOpen ? "Show top 3" : "See all " + insAll.length,
      toggleIns: () => this.setState((st) => ({ insOpen: !st.insOpen })),
      insNote: "Top " + insAll.length + " by priority · " + P.scope,
    };
  }
  renderVals() {
    const collapsed = this.state.collapsed;
    const pillBase = "display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:6px;font-size:11.5px;font-weight:500;white-space:nowrap;";
    const tierBase = "display:inline-flex;align-items:center;height:17px;padding:0 5px;border-radius:4px;font-size:9.5px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;white-space:nowrap;";
    const tierTone = (t) => (t === "Empanelled" ? "green" : t === "Onboarded" ? "blue" : "amber");
    const mono = "font-family:var(--mono);";
    const AMD = {
      qty: { label: "Quantity", line: "TMT Bar Fe500D 16mm", before: "50.000 MT", after: "68.000 MT", note: "+18 MT · site revised the bar-bending schedule", delta: "+₹12,24,000", newTotal: "₹53,44,000", crosses: true, band: "Crosses the ₹50 L band — Head–Procurement approved the original at ₹41.2 L, so the revision goes one tier up", who: "Head–SCM (Region)", vendorAck: true, l1qty: "68.000 MT", l1rate: "₹68,000", l1amt: "₹46,24,000", bar: 82, l1note: "quantity amended on this line" },
      rate: { label: "Rate", line: "TMT Bar Fe500D 16mm", before: "₹68,000 / MT", after: "₹71,400 / MT", note: "+5.0% · vendor cited an IS 1786 billet price revision", delta: "+₹1,70,000", newTotal: "₹42,90,000", crosses: false, band: "Stays inside the ₹50 L band, but every rate increase needs the approver who cleared the original", who: "Head–Procurement", vendorAck: false, l1qty: "50.000 MT", l1rate: "₹71,400", l1amt: "₹35,70,000", bar: 66, l1note: "rate amended on this line" },
      date: { label: "Delivery date", line: "Both lines", before: "08 Sep 2026", after: "22 Sep 2026", note: "+14 days · vendor rolling-mill shutdown", delta: "No value change", newTotal: "₹41,20,000", crosses: false, band: "No value change — this is a schedule amendment, so it needs the vendor's written acceptance rather than a fresh financial approval", who: "Cluster Buyer (self-approve)", vendorAck: true, l1qty: "50.000 MT", l1rate: "₹68,000", l1amt: "₹34,00,000", bar: 63, l1note: "schedule only · value unchanged" },
    };
    const a = AMD[this.state.amdField] || AMD.qty;
    const amdTab = (k, lbl) => ({
      label: lbl,
      pick: () => this.setState({ amdField: k }),
      style: "height:30px;padding:0 13px;display:flex;align-items:center;border:none;border-radius:7px;font-family:inherit;font-size:12.5px;cursor:pointer;white-space:nowrap;" + (this.state.amdField === k ? "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font-weight:600;color:#0a0a0a" : "background:transparent;font-weight:500;color:#737373"),
    });
    const potab = (k) => "height:38px;padding:0 12px;display:flex;align-items:center;gap:6px;border:none;background:transparent;font-family:inherit;font-size:13px;cursor:pointer;" + (this.state.potab === k ? "font-weight:600;color:#134377;box-shadow:inset 0 -2px 0 #134377" : "font-weight:500;color:#737373");
    return {
      ...this.jobVals(),
      ...this.histVals(),
      ...this.insightVals(),
      ...this.notifVals(),
      ...this.personaVals(),
      ...this.resVals(),
      poRows: this.PO_ROWS.map((p) => ({
        id: p.id, vendor: p.vendor, vtier: p.vtier, job: p.job, mat: p.mat, sub: p.sub, val: p.val, amd: p.amd, age: p.age, due: p.due, status: p.status,
        pill: pillBase + this.TONE[p.tone],
        tierPill: tierBase + this.TONE[tierTone(p.vtier)],
        recvLabel: p.recv.toLocaleString("en-IN") + " of " + p.tot.toLocaleString("en-IN") + " " + p.unit,
        barFill: "height:4px;border-radius:2px;background:" + (p.recv === 0 ? "#e0e6ec" : p.recv >= p.tot ? "#1E7F4F" : "#134377") + ";width:" + (p.recv === 0 ? 100 : Math.max(4, Math.round((p.recv / p.tot) * 100))) + "%",
        pct: p.recv === 0 ? "Nothing received" : Math.round((p.recv / p.tot) * 100) + "% received",
        amdStyle: mono + "font-size:12px;" + (p.amd === "v1" ? "color:#a1a1a1" : "font-weight:600;color:#134377"),
        ageStyle: mono + "font-size:12px;" + (parseInt(p.age, 10) > 20 ? "color:#A5322A" : "color:#737373"),
        rowStyle: p.tone === "red" ? "box-shadow:inset 3px 0 0 #C0392B;background:#fffbfb" : "color:inherit",
        open: p.open,
        openPo: (e) => { if (e) e.preventDefault(); this.setState({ page: "pod", potab: "items" }); },
      })),
      poTabItems: this.state.potab === "items",
      poTabTerms: this.state.potab === "terms",
      poTabAmd: this.state.potab === "amendments",
      poTabDel: this.state.potab === "delivery",
      poTabHist: this.state.potab === "history",
      poGoItems: () => this.setState({ potab: "items" }),
      poGoTerms: () => this.setState({ potab: "terms" }),
      poGoAmd: () => this.setState({ potab: "amendments" }),
      poGoDel: () => this.setState({ potab: "delivery" }),
      poGoHist: () => this.setState({ potab: "history" }),
      poTabItemsStyle: potab("items"),
      poTabTermsStyle: potab("terms"),
      poTabAmdStyle: potab("amendments"),
      poTabDelStyle: potab("delivery"),
      poTabHistStyle: potab("history"),
      amdQty: amdTab("qty", "Quantity"),
      amdRate: amdTab("rate", "Rate"),
      amdDate: amdTab("date", "Delivery date"),
      amdLabel: a.label,
      amdLine: a.line,
      amdBefore: a.before,
      amdAfter: a.after,
      amdNote: a.note,
      amdDelta: a.delta,
      amdNewTotal: a.newTotal,
      amdBand: a.band,
      amdWho: a.who,
      amdL1Qty: a.l1qty,
      amdL1Rate: a.l1rate,
      amdL1Amt: a.l1amt,
      amdL1Note: a.l1note,
      amdBarStyle: "position:absolute;left:0;top:0;bottom:0;width:" + a.bar + "%;background:" + (a.crosses ? "#C0392B" : "#134377"),
      amdCrosses: a.crosses,
      amdNoCross: !a.crosses,
      amdVendorAck: a.vendorAck,
      amdDeltaStyle: mono + "font-size:19px;font-weight:600;letter-spacing:-0.01em;color:" + (a.delta.indexOf("+₹") === 0 ? "#A5322A" : "#525252"),
      amdBandStyle: "display:flex;gap:10px;padding:12px 14px;border-radius:10px;" + (a.crosses ? "background:#fdeeec;border:1px solid #f3c9c4" : "background:#fffbe6;border:1px solid #ffe480"),
      amdBandIcon: a.crosses ? "#C0392B" : "#9A6B00",
      amdBandTitle: a.crosses ? "Re-approval required — one tier up" : "Re-approval required — same approver",
      amdWho: a.who,
      bidRows: this.BID_ROWS.map((b) => ({
        v: b.v, tier: b.tier, invited: b.invited, viewed: b.viewed, quoted: b.quoted, state: b.state, rev: b.rev, sealed: b.sealed,
        tierPill: tierBase + this.TONE[b.ttone],
        pill: pillBase + this.TONE[b.stone],
        viewedStyle: mono + "font-size:12px;color:" + (b.viewed === "—" ? "#c4ccd4" : "#525252"),
        quotedStyle: mono + "font-size:12px;color:" + (b.quoted === "—" ? "#c4ccd4" : "#525252"),
        canRemind: !b.sealed,
      })),
      bidQuoted: "2",
      bidInvited: "4",
      remindOpen: this.state.remindOpen,
      openRemind: () => this.setState({ remindOpen: true, extendOpen: false }),
      closeRemind: () => this.setState({ remindOpen: false }),
      extendOpen: this.state.extendOpen,
      openExtend: () => this.setState({ extendOpen: true, remindOpen: false }),
      closeExtend: () => this.setState({ extendOpen: false }),
      tcdSubmitted: this.state.tcdSubmitted,
      tcdDraft: !this.state.tcdSubmitted,
      submitTcd: () => this.setState({ tcdSubmitted: true }),
      resetTcd: () => this.setState({ tcdSubmitted: false }),
      collapsed,
      expanded: !collapsed,
      tccOne: this.state.tccStage === 1,
      tccTwo: this.state.tccStage === 2,
      showStage2: () => this.setState({ tccStage: 2 }),
      stg1Style: "display:flex;align-items:center;gap:6px;height:28px;padding:0 11px;border-radius:8px;font-size:12.5px;font-weight:600;white-space:nowrap;" + (this.state.tccStage === 1 ? "background:#134377;color:#fff" : "background:#eaf5ef;color:#1E7F4F;border:1px solid #b9dcc8"),
      stg2Style: "display:flex;align-items:center;gap:6px;height:28px;padding:0 11px;border-radius:8px;font-size:12.5px;font-weight:600;white-space:nowrap;" + (this.state.tccStage === 2 ? "background:#134377;color:#fff" : "background:#f5f5f5;color:#a1a1a1;border:1px solid #e5e5e5"),
      selV1: !!this.state.inv.v1,
      togV1: () => this.setState((st) => ({ inv: Object.assign({}, st.inv, { v1: !st.inv.v1 }), reasonFor: null })),
      btnV1: "display:flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:8px;font-family:inherit;font-size:12.5px;font-weight:500;cursor:pointer;white-space:nowrap;" + (this.state.inv.v1 ? "border:1px solid #134377;background:#134377;color:#fff" : "border:1px solid #e5e5e5;background:#fff;color:#171717"),
      lblV1: this.state.inv.v1 ? "Shortlisted" : "Shortlist",
      selV2: !!this.state.inv.v2,
      togV2: () => this.setState((st) => ({ inv: Object.assign({}, st.inv, { v2: !st.inv.v2 }), reasonFor: null })),
      btnV2: "display:flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:8px;font-family:inherit;font-size:12.5px;font-weight:500;cursor:pointer;white-space:nowrap;" + (this.state.inv.v2 ? "border:1px solid #134377;background:#134377;color:#fff" : "border:1px solid #e5e5e5;background:#fff;color:#171717"),
      lblV2: this.state.inv.v2 ? "Shortlisted" : "Shortlist",
      selV3: !!this.state.inv.v3,
      togV3: () => this.setState((st) => ({ inv: Object.assign({}, st.inv, { v3: !st.inv.v3 }), reasonFor: null })),
      btnV3: "display:flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:8px;font-family:inherit;font-size:12.5px;font-weight:500;cursor:pointer;white-space:nowrap;" + (this.state.inv.v3 ? "border:1px solid #134377;background:#134377;color:#fff" : "border:1px solid #e5e5e5;background:#fff;color:#171717"),
      lblV3: this.state.inv.v3 ? "Shortlisted" : "Shortlist",
      vpOpen: this.state.vpOpen,
      openP1: () => this.setState({ vpOpen: true, pv: "v1" }),
      openP2: () => this.setState({ vpOpen: true, pv: "v2" }),
      openP3: () => this.setState({ vpOpen: true, pv: "v3" }),
      openP4: () => this.setState({ vpOpen: true, pv: "v4" }),
      needReason: (() => { const sel = ["v1","v2","v3"].filter((k) => this.state.inv[k]); return sel.length > 0 && !sel.includes("v1") && this.state.reasonFor !== sel.join(","); })(),
      openProfile: () => this.setState({ vpOpen: true, pv: "v1" }),
      ...(function (self) { const V = {"v1":{"n":"Sunrise Steel Traders","t":"Empanelled","tt":"#1E7F4F","tb":"#eaf5ef","td":"#b9dcc8","f":true,"m":"Vendor VEN-0031884 · Chennai · 42 km from WH-CHN-03 · 34 completed orders","sc":"8.7","r":"1","ro":"of 23 in Steel & Rebar","o":"34","ov":"₹6.4 Cr lifetime","pp":"8.4 · rank 1","emp":"Empanelled","g":"A−","b":"4.2% below","fin":"No adverse filings","finS":"DNB · verified 26 Aug","fw":false,"rfm":"9.1","del":"96% on time","q":"0 rejections · 18 mo","d":"42 km","ft":"Empanelled for this category — eligible to receive the order"},"v2":{"n":"Deccan Cement Agencies","t":"Onboarded","tt":"#134377","tb":"#eef4fa","td":"#c3d8ec","f":false,"m":"Vendor VEN-0028117 · Chennai · 61 km · 12 completed orders","sc":"7.9","r":"4","ro":"of 23 in Steel & Rebar","o":"12","ov":"₹1.8 Cr lifetime","pp":"7.6 · rank 4","emp":"Onboarded","g":"B+","b":"At benchmark","fin":"No adverse filings","finS":"DNB · verified 24 Aug","fw":false,"rfm":"7.2","del":"88% on time","q":"1 rejection · 18 mo","d":"61 km","ft":"Onboarded — eligible to receive this order, not empanelled for capital items"},"v3":{"n":"Vertex Infra Supplies","t":"Registered","tt":"#9A6B00","tb":"#fffbe6","td":"#ffe480","f":false,"m":"Vendor VEN-0041902 · Coimbatore · 512 km · no completed orders","sc":"6.4","r":"11","ro":"of 23 in Steel & Rebar","o":"0","ov":"No order history","pp":"6.1 · rank 11","emp":"Registered","g":"Not rated","b":"2.9% above","fin":"No filings found","finS":"DNB · limited coverage","fw":false,"rfm":"—","del":"No history","q":"No history","d":"512 km","ft":"Registered only — can quote, cannot receive this order until onboarded"},"v4":{"n":"Deccan Metal Corp","t":"Empanelled","tt":"#1E7F4F","tb":"#eaf5ef","td":"#b9dcc8","f":false,"m":"Vendor VEN-0019338 · Hyderabad · 628 km · 8 completed orders","sc":"—","r":"6","ro":"of 23 · withheld","o":"8","ov":"₹9.2 Cr lifetime","pp":"7.8 · rank 6","emp":"Empanelled","g":"BB · downgraded Jul 2026","b":"3.1% below","fin":"Insolvency filed 04 Aug 2026","finS":"DNB · GAUR · verified 26 Aug","fw":true,"rfm":"6.9","del":"11 d beyond SLA","q":"2 rejections · 12 mo","d":"628 km","ft":"Withheld from recommendation on financial standing"}}; const v = V[self.state.pv] || V.v1; return {
        pvName: v.n, pvTier: v.t, pvFreq: !!v.f, pvMeta: v.m, pvScore: v.sc, pvRank: v.r, pvRankOf: v.ro,
        pvOrders: v.o, pvOrdersVal: v.ov, pvPP: v.pp, pvPPSrc: "Partner Portal", pvEmp: v.emp, pvEmpSrc: "Partner Portal",
        pvGaur: v.g, pvGaurSrc: "GAUR / GOD", pvBench: v.b, pvBenchSrc: "GAUR / GOD",
        pvFin: v.fin, pvFinSrc: v.finS, pvRfm: v.rfm, pvRfmSrc: "EIP backend", pvDel: v.del, pvDelSrc: "PO-to-MRN history",
        pvQual: v.q, pvQualSrc: "Rejection history", pvDist: v.d, pvDistSrc: "Distance network",
        pvWarn: !!v.fw, pvFoot: v.ft,
        pvTierStyle: "font-size:10px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;padding:1px 6px;border-radius:5px;color:" + v.tt + ";background:" + v.tb + ";border:1px solid " + v.td,
        pvFinDot: "width:5px;height:5px;border-radius:50%;flex:none;background:" + (v.fw ? "#C0392B" : "#1E7F4F"),
        pvCompDot: "width:5px;height:5px;border-radius:50%;flex:none;background:#134377",
      }; })(this),
      closeProfile2: () => this.setState({ vpOpen: false }),
      divergenceSelected: (() => { const n = { v1: "Sunrise Steel Traders", v2: "Deccan Cement Agencies", v3: "Vertex Infra Supplies" }; const p = ["v1","v2","v3"].filter((k) => this.state.inv[k]).map((k) => n[k]); return p.length ? p.join(", ") : "None yet"; })(),
      divergenceNote: (() => { const sel = ["v1","v2","v3"].filter((k) => this.state.inv[k]); if (!sel.length) return "No vendors shortlisted yet"; if (!sel.includes("v1")) return "Rank 1 not shortlisted — reason required before issue"; if (sel.includes("v3")) return "Includes a Registered-tier vendor that cannot receive this order"; return "Follows the ranking"; })(),
      inviteCount: String(["v1","v2","v3"].filter((k) => this.state.inv[k]).length),
      aUnalloc: this.state.atab === "unalloc",
      aAlloc: this.state.atab === "alloc",
      tabUnalloc: () => this.setState({ atab: "unalloc" }),
      tabAlloc: () => this.setState({ atab: "alloc" }),
      atUnalloc: "height:26px;padding:0 11px;display:flex;align-items:center;gap:5px;border:none;border-radius:6px;font-family:inherit;font-size:12px;cursor:pointer;white-space:nowrap;" + (this.state.atab === "unalloc" ? "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font-weight:600;color:#0a0a0a" : "background:transparent;font-weight:500;color:#737373"),
      atAlloc: "height:26px;padding:0 11px;display:flex;align-items:center;gap:5px;border:none;border-radius:6px;font-family:inherit;font-size:12px;cursor:pointer;white-space:nowrap;" + (this.state.atab === "alloc" ? "background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.07);font-weight:600;color:#0a0a0a" : "background:transparent;font-weight:500;color:#737373"),
      selA: !!this.state.sel.a, selB: !!this.state.sel.b, selC: !!this.state.sel.c, selD: !!this.state.sel.d,
      boxA: "width:15px;height:15px;flex:none;border-radius:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;" + (this.state.sel.a ? "border:1.5px solid #134377;background:#134377" : "border:1.5px solid #c4ccd4;background:#fff"),
      boxB: "width:15px;height:15px;flex:none;border-radius:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;" + (this.state.sel.b ? "border:1.5px solid #134377;background:#134377" : "border:1.5px solid #c4ccd4;background:#fff"),
      boxC: "width:15px;height:15px;flex:none;border-radius:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;" + (this.state.sel.c ? "border:1.5px solid #134377;background:#134377" : "border:1.5px solid #c4ccd4;background:#fff"),
      boxD: "width:15px;height:15px;flex:none;border-radius:4px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;" + (this.state.sel.d ? "border:1.5px solid #134377;background:#134377" : "border:1.5px solid #c4ccd4;background:#fff"),
      togA: () => this.setState((st) => ({ sel: Object.assign({}, st.sel, { a: !st.sel.a }) })),
      togB: () => this.setState((st) => ({ sel: Object.assign({}, st.sel, { b: !st.sel.b }) })),
      togC: () => this.setState((st) => ({ sel: Object.assign({}, st.sel, { c: !st.sel.c }) })),
      togD: () => this.setState((st) => ({ sel: Object.assign({}, st.sel, { d: !st.sel.d }) })),
      showConsol: ["a","b","c","d"].filter((k) => this.state.sel[k]).length >= 2,
      selTonnage: (() => { const q = { a: 50, b: 30, c: 22, d: 0.4 }; const t = ["a","b","c","d"].filter((k) => this.state.sel[k]).reduce((n, k) => n + q[k], 0); return (Math.round(t * 10) / 10) + " MT"; })(),
      selMultiple: (() => { const q = { a: 50, b: 30, c: 22, d: 0.4 }; const ks = ["a","b","c","d"].filter((k) => this.state.sel[k]); if (!ks.length) return "—"; const t = ks.reduce((n, k) => n + q[k], 0); const mx = Math.max.apply(null, ks.map((k) => q[k])); return (Math.round((t / mx) * 100) / 100).toFixed(2) + "×"; })(),
      selHeadline: (() => { const n = ["a","b","c","d"].filter((k) => this.state.sel[k]).length; const ics = { a: 1, b: 1, c: 2, d: 1 }; const set = {}; ["a","b","c","d"].filter((k) => this.state.sel[k]).forEach((k) => { set[ics[k]] = 1; }); const ic = Object.keys(set).length; return n + (n === 1 ? " request" : " requests") + ", " + ic + (ic === 1 ? " IC" : " ICs") + ", same category"; })(),
      cartCount: String(["a","b","c","d"].filter((k) => this.state.sel[k]).length),
      cartValue: "₹" + (["a","b","c","d"].filter((k) => this.state.sel[k]).reduce((t, k) => t + ({ a: 26.2, b: 15.7, c: 11.9, d: 0.5 })[k], 0)).toFixed(1) + " L",
      goCreate: (e) => { if (e) e.preventDefault(); this.setState({ convo: "pr", turn: 1, prSubmitted: false, histOpen: false, chatOpen: true }); },
      askPending: (e) => { if (e) e.preventDefault(); this.setState({ convo: "pending", turn: 1, histOpen: false, chatOpen: true }); },
      askWhere: (e) => { if (e) e.preventDefault(); this.setState({ convo: "where", turn: 1, histOpen: false, chatOpen: true }); },
      askDrafts: (e) => { if (e) e.preventDefault(); this.setState({ convo: "drafts", turn: 1, histOpen: false, chatOpen: true }); },
      convoPr: this.state.convo === "pr",
      convoPending: this.state.convo === "pending",
      convoWhere: this.state.convo === "where",
      convoDrafts: this.state.convo === "drafts",
      chatThread: !!this.state.convo && !this.state.histOpen,
      chatEmpty: !this.state.convo && !this.state.histOpen,
      adv: () => this.setState((s) => ({ turn: s.turn + 1 })),
      ...[2, 3, 4, 5].reduce((o, n) => { o["t" + n] = this.state.turn >= n; return o; }, {}),
      ...[1, 2, 3, 4].reduce((o, n) => { o["pend" + n] = this.state.turn === n; return o; }, {}),
      preSubmit: this.state.turn >= 5 && !this.state.prSubmitted,
      prSubmitted: this.state.prSubmitted,
      accStatus: this.state.prSubmitted ? "Created in EIP · PRC/2026/0041872" : this.state.turn >= 5 ? "Ready to submit · nothing saved yet" : this.state.turn === 4 ? "⚠ Sourcing options — your decision" : "Job, warehouse and budget already known",
      accTone: this.state.turn === 4 ? "#9A6B00" : "#737373",
      showWorkList: () => this.setState({ workView: "list" }),
      showWorkCards: () => this.setState({ workView: "cards" }),
      submitPr: () => this.setState({ prSubmitted: true }),
      moreOpen: this.state.moreOpen,
      toggleMore: () => this.setState((st) => ({ moreOpen: !st.moreOpen })),
      closeMore: () => this.setState({ moreOpen: false }),
      onDashboard: this.state.page === "dashboard",
      goDash: (e) => { if (e) e.preventDefault(); this.setState({ page: "dashboard" }); },
      navDashStyle: "position:relative;display:flex;align-items:center;gap:10px;padding:8px 10px;min-height:36px;box-sizing:border-box;flex:none;border-radius:8px;font-size:13.5px;" + (this.state.page === "dashboard" ? "background:#e2ecf6;color:#134377;font-weight:500" : "color:#525252"),
      groupOpen: this.state.groupOpen,
      toggleGroup: () => this.setState((s2) => ({ groupOpen: !s2.groupOpen })),
      groupCaretStyle: "display:flex;transition:transform .15s ease;transform:rotate(" + (this.state.groupOpen ? "90deg" : "0deg") + ")",
      profileOpen: this.state.profileOpen,
      toggleProfile: () => this.setState((s) => ({ profileOpen: !s.profileOpen })),
      closeProfile: () => this.setState({ profileOpen: false }),
      toggleNav: () => this.setState((s) => ({ collapsed: !s.collapsed })),
      onUpdates: this.state.feedTab === "updates",
      onActions: this.state.feedTab === "actions",
      showUpdates: () => this.setState({ feedTab: "updates" }),
      showActions: () => this.setState({ feedTab: "actions" }),
      tabUpdatesStyle:
        this.state.feedTab === "updates"
          ? "flex:1;height:28px;border:none;border-radius:6px;background:#fff;box-shadow:0 1px 2px 0 rgba(0,0,0,.06);font-family:inherit;font-size:12.5px;font-weight:600;color:#0a0a0a;cursor:pointer"
          : "flex:1;height:28px;border:none;border-radius:6px;background:transparent;font-family:inherit;font-size:12.5px;font-weight:500;color:#737373;cursor:pointer",
      tabActionsStyle:
        this.state.feedTab === "actions"
          ? "flex:1;height:28px;border:none;border-radius:6px;background:#fff;box-shadow:0 1px 2px 0 rgba(0,0,0,.06);font-family:inherit;font-size:12.5px;font-weight:600;color:#0a0a0a;cursor:pointer"
          : "flex:1;height:28px;border:none;border-radius:6px;background:transparent;font-family:inherit;font-size:12.5px;font-weight:500;color:#737373;cursor:pointer",
      navStyle: collapsed
        ? "width:64px;flex:none;border-right:1px solid #e5e5e5;background:#f4f7fa;padding:14px 8px;display:flex;flex-direction:column;align-items:center;gap:2px;overflow-y:auto"
        : "width:248px;flex:none;border-right:1px solid #e5e5e5;background:#f4f7fa;padding:14px 12px;display:flex;flex-direction:column;gap:2px;overflow-y:auto",
      helpBlockStyle: collapsed
        ? "align-self:stretch;position:sticky;bottom:-14px;background:#f4f7fa;z-index:1;padding:0 8px 14px;margin:8px -8px -14px;display:flex;flex-direction:column;align-items:center"
        : "align-self:stretch;position:sticky;bottom:-14px;background:#f4f7fa;z-index:1;padding:0 12px 14px;margin:8px -12px -14px;display:flex;flex-direction:column;align-items:stretch",
      brandStyle: collapsed
        ? "width:64px;height:100%;flex:none;box-sizing:border-box;padding:0;border-right:1px solid #e5e5e5;background:#f4f7fa;display:flex;align-items:center;justify-content:center"
        : "width:248px;height:100%;flex:none;box-sizing:border-box;padding:0 12px 0 18px;border-right:1px solid #e5e5e5;background:#f4f7fa;display:flex;align-items:center;gap:10px",
      showChat: (this.props.showChat ?? true) && this.state.chatOpen,
      chatOpen: this.state.chatOpen,
      chatClosed: !this.state.chatOpen,
      toggleChat: () => this.setState((s) => ({ chatOpen: !s.chatOpen })),
      showChatTweak: this.props.showChat ?? true,
      showFab: (this.props.showChat ?? true) && !this.state.chatOpen,
      fabStyle:
        "position:absolute;bottom:26px;right:26px;z-index:25;display:flex;align-items:center;gap:10px;padding:0;border:none;background:transparent;cursor:pointer;font-family:inherit",
      showSlaFlags: this.props.showSlaFlags ?? true,
      showFlow: (this.props.chartDetail ?? "full") === "full",
    };
  }
}
