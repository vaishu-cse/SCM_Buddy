import { ArrowRight, ChevronDown, Filter, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { OutletContext } from "@/components/layout/AppLayout";
import { getInsights } from "@/lib/api";
import { formatIndianCurrency } from "@/lib/format";
import { getIcon } from "@/lib/icon-map";
import { toneClasses } from "@/lib/tone";
import type { InsightLedgerItem, InsightState } from "@/types/dashboard";

type Tab = InsightState | "all";

function formatWireframeNumber(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatWireframeAmount(value: number) {
  if (value >= 1e7) {
    return `₹${(value / 1e7).toFixed(2)} Cr`;
  }
  return `₹${(Math.round(value / 1e4) / 10).toFixed(1)} L`;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "open", label: "Open" },
  { key: "actioned", label: "Actioned" },
  { key: "declined", label: "Declined" },
  { key: "lapsed", label: "Lapsed" },
  { key: "all", label: "All" },
];

export function InsightsPage() {
  const { controller } = useOutletContext<OutletContext>();
  const [items, setItems] = useState<InsightLedgerItem[]>([]);
  const [tab, setTab] = useState<Tab>("open");
  const [source, setSource] = useState<string | null>(null);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [jobMenuOpen, setJobMenuOpen] = useState(false);

  useEffect(() => {
    getInsights().then((data) => {
      setItems(data);
      setSelectedJobs(Array.from(new Set(data.map((item) => item.job))).sort());
    });
  }, []);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        tabs.map(({ key }) => [
          key,
          key === "all"
            ? items.length
            : items.filter((item) => item.state === key).length,
        ]),
      ) as Record<Tab, number>,
    [items],
  );
  const jobMeta: Record<string, { name: string; docs: string }> = {
    LDM02128: { name: "Structural Steel • Hyderabad", docs: "12 PRs · 30d" },
    LDM03390: { name: "Cement & Masonry • Chennai", docs: "8 PRs · 30d" },
    LDM04471: { name: "Fit-out Works • Pune", docs: "10 PRs · 30d" },
    LDM05114: { name: "Electrical Packages • Delhi", docs: "6 PRs · 30d" },
  };
  const jobs = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.job))).sort().map((job) => ({
        code: job,
        name: jobMeta[job]?.name ?? "Project context",
        openValue: items
          .filter((item) => item.job === job)
          .reduce((sum, item) => sum + item.value, 0),
        docs: jobMeta[job]?.docs ?? "0 PRs · 30d",
      })),
    [items],
  );
  const allSelected = jobs.length > 0 && selectedJobs.length === jobs.length;
  const totalOpenValue = jobs.reduce((sum, job) => sum + job.openValue, 0);
  const jobButtonLabel =
    allSelected ? "All jobs" : selectedJobs.length === 1 ? selectedJobs[0] : `${selectedJobs.length} jobs`;
  const visible = items.filter(
    (item) =>
      (tab === "all" || item.state === tab) &&
      (!source || item.source === source) &&
      (allSelected || selectedJobs.includes(item.job)),
  );
  const sources = ["Commodity", "Governance", "Sourcing"];
  const recovered = items
    .filter((item) => item.ledger === "saved")
    .reduce((sum, item) => sum + item.value, 0);
  const atRisk = items
    .filter((item) => item.ledger === "risk")
    .reduce((sum, item) => sum + item.value, 0);
  const lapsed = items
    .filter((item) => item.ledger === "lapsed")
    .reduce((sum, item) => sum + item.value, 0);
  const totalValue = recovered + atRisk + lapsed || 1;

  function openInsight(item: InsightLedgerItem) {
    controller.openResolve({
      kind: "insight",
      scope: item.job,
      title: item.title,
      value: formatIndianCurrency(item.value),
      why: item.detail,
      cta: item.cta,
      intent: item.intent,
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Breadcrumb page="Insights" parentPage="Dashboard" />
        <div className="flex items-center gap-2 font-12 text-muted-foreground">
          <span className="size-1.5 rounded-full bg-tone-green-icon" />
          Agents last run 12 min ago
          <div className="relative">
            <button
              type="button"
              onClick={() => setJobMenuOpen((v) => !v)}
              className="flex h-8 items-center gap-2 rounded-[7px] border border-border bg-card px-2.5 font-12 font-medium text-foreground shadow-sm"
            >
              <Filter className="size-3.5" />
              <span className="min-w-0">{jobButtonLabel}</span>
              <ChevronDown className="size-3.5" />
            </button>
            {jobMenuOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setJobMenuOpen(false)} />
                <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-[360px] rounded-[12px] border border-border bg-white p-1.5 text-left shadow-[0_14px_34px_-10px_rgba(15,44,77,.26),0_2px_6px_rgba(15,44,77,.08)]">
                  <div className="flex items-center justify-between gap-2.5 px-2.5 py-2">
                    <span className="font-10 uppercase tracking-[0.09em] text-muted-foreground">
                      Jobs in your context
                    </span>
                    <span className="font-12 text-muted-foreground">
                      {allSelected ? `All ${jobs.length} selected` : `${selectedJobs.length} of ${jobs.length} selected`}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedJobs(jobs.map((job) => job.code));
                    }}
                    className="flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <span
                      className={`flex size-[18px] items-center justify-center rounded-[4px] border ${allSelected ? "border-primary bg-primary" : "border-[#c4ccd4] bg-white"}`}
                    >
                      {allSelected && (
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3.4 8.4 3 3 6.2-6.6" />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1 font-12 font-medium text-foreground">All jobs</span>
                    <span className="font-mono text-[11.5px] text-muted-foreground">
                      {formatWireframeAmount(totalOpenValue)} open
                    </span>
                  </button>

                  <div className="mx-2 my-1 h-px bg-[#f0f3f5]" />

                  {jobs.map((job) => {
                    const selected = selectedJobs.includes(job.code);
                    return (
                      <button
                        type="button"
                        key={job.code}
                        onClick={() => {
                          const next = selected
                            ? selectedJobs.filter((code) => code !== job.code)
                            : [...selectedJobs, job.code].sort();
                          setSelectedJobs(next);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-muted"
                      >
                        <span
                          className={`flex size-[18px] items-center justify-center rounded-[4px] border ${selected ? "border-primary bg-primary" : "border-[#c4ccd4] bg-white"}`}
                        >
                          {selected && (
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m3.4 8.4 3 3 6.2-6.6" />
                            </svg>
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-mono text-[12px] font-medium text-foreground">{job.code}</span>
                          <span className="mt-[1px] block text-[12px] text-muted-foreground">{job.name}</span>
                        </span>
                        <span className="flex-none text-right">
                          <span className="block font-mono text-[12px] text-primary">
                            {formatWireframeAmount(job.openValue)}
                          </span>
                          <span className="mt-[1px] block text-[11px] text-muted-foreground">{job.docs}</span>
                        </span>
                      </button>
                    );
                  })}

                  <div className="mt-1 flex items-center justify-between border-t border-[#f0f3f5] px-2.5 pb-1 pt-2">
                    <span className="text-[11.5px] text-muted-foreground">
                      {allSelected ? "Every job in your role context" : "Dashboard follows this selection"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setJobMenuOpen(false)}
                      className="h-7 rounded-[7px] border-0 bg-primary px-3 font-12 font-semibold text-primary-foreground hover:bg-brand-hover"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-10 uppercase tracking-[0.09em] text-muted-foreground">
          Agent ledger
        </span>
        <span className="font-12 text-muted-foreground">
          Scoped to this role · all 4 jobs · rolling 90 days
        </span>
      </div>
      <section className="rounded-[12px] border border-border bg-card p-[18px] shadow-[0_2px_8px_-2px_rgba(15,44,77,.10),0_1px_2px_rgba(15,44,77,.05)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LedgerMetric
            label="Value recovered"
            value={recovered}
            count={`${counts.actioned} insights actioned`}
            tone="green"
          />
          <LedgerMetric
            label="Value at risk"
            value={atRisk}
            count={`${counts.open} insights open`}
            tone="blue"
          />
          <LedgerMetric
            label="Value lapsed"
            value={lapsed}
            count={`${counts.lapsed} insights lapsed`}
            tone="red"
          />
          <div>
            <div className="font-12 text-muted-foreground">Action rate</div>
            <div className="mt-1 font-24 font-medium">
              {Math.round((counts.actioned / (items.length || 1)) * 100)}%
            </div>
            <div className="mt-0.5 font-12 text-muted-foreground">
              of everything raised
            </div>
          </div>
        </div>
        <div className="mt-4 flex h-2 overflow-hidden rounded">
          <span
            className="bg-tone-green-icon"
            style={{ width: `${(recovered / totalValue) * 100}%` }}
          />
          <span
            className="bg-tone-blue-icon"
            style={{ width: `${(atRisk / totalValue) * 100}%` }}
          />
          <span
            className="bg-tone-red-icon"
            style={{ width: `${(lapsed / totalValue) * 100}%` }}
          />
        </div>
        <p className="mt-2 font-12 leading-[1.5] text-muted-foreground">
          Lapsed value is the honest number — opportunities the agents raised
          that nobody acted on before they expired. Declined insights are not
          counted as lapsed; the reason stays on the document audit trail.
        </p>
      </section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-0.5 rounded-[9px] bg-muted p-[3px]">
          {tabs.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`rounded-md px-2.5 py-1.5 font-12 ${tab === item.key ? "bg-card font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item.label}{" "}
              <span className="opacity-70">{counts[item.key]}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-10 font-semibold uppercase tracking-[0.05em] text-muted-foreground">
            Raised by
          </span>
          {sources.map((item) => (
            <button
              key={item}
              onClick={() => setSource(source === item ? null : item)}
              className={`rounded-[7px] border px-2.5 py-1 font-12 ${source === item ? "border-tone-blue-border bg-tone-blue-bg font-semibold text-tone-blue-fg" : "border-border bg-card text-foreground hover:bg-muted"}`}
            >
              {item}{" "}
              <span className="opacity-70">
                {items.filter((insight) => insight.source === item).length}
              </span>
            </button>
          ))}
          {source && (
            <button
              onClick={() => setSource(null)}
              className="px-1 font-12 font-medium text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <section className="overflow-x-auto rounded-[12px] border border-border bg-card shadow-[0_2px_8px_-2px_rgba(15,44,77,.10),0_1px_2px_rgba(15,44,77,.05)]">
        <div className="grid w-max min-w-[1010px] grid-cols-[30px_minmax(240px,1fr)_112px_96px_66px_132px_112px_minmax(150px,1fr)] items-center gap-3 border-b border-border bg-muted px-3.5 py-2 font-10 font-semibold uppercase tracking-[0.05em] text-muted-foreground">
          <span />
          <span>Insight</span>
          <span>Raised by</span>
          <span>Job</span>
          <span>Age</span>
          <span className="text-right">Value</span>
          <span>State</span>
          <span className="justify-self-stretch" />
        </div>
        {visible.map((item) => (
          <InsightRow
            key={item.id}
            item={item}
            onOpen={() => openInsight(item)}
          />
        ))}
        {!visible.length && (
          <div className="flex flex-col items-center gap-1.5 py-14 text-center">
            <Sparkles className="size-5 text-muted-foreground" />
            <span className="font-14 font-medium">Nothing in this view</span>
            <span className="font-12 text-muted-foreground">
              Try another state or agent
            </span>
          </div>
        )}
      </section>
    </>
  );
}

function LedgerMetric({
  label,
  value,
  count,
  tone,
}: {
  label: string;
  value: number;
  count: string;
  tone: "green" | "blue" | "red";
}) {
  const classes = toneClasses(tone);
  return (
    <div>
      <div className="flex items-center gap-2 font-12 text-muted-foreground">
        <span
          className={`size-2.5 rounded-[2px] ${classes.icon.replace("text-", "bg-")}`}
        />
        {label}
      </div>
      <div
        className={`mt-1 text-[clamp(20px,2vw,26px)] font-medium ${classes.fg}`}
      >
        {formatWireframeNumber(value)}
      </div>
      <div className="mt-0.5 font-12 text-muted-foreground">{count}</div>
    </div>
  );
}

function InsightRow({
  item,
  onOpen,
}: {
  item: InsightLedgerItem;
  onOpen: () => void;
}) {
  const Icon = getIcon(item.icon);
  const tone = toneClasses(
    item.state === "lapsed"
      ? "red"
      : item.state === "actioned"
        ? "green"
        : item.state === "declined"
          ? "grey"
          : item.icon === "expiry" || item.icon === "rate"
            ? "amber"
            : item.icon === "money"
              ? "red"
              : "blue",
  );
  const stateTone = toneClasses(
    item.state === "lapsed"
      ? "red"
      : item.state === "actioned"
        ? "green"
        : item.state === "declined"
          ? "grey"
          : "blue",
  );
  return (
    <div className="grid w-full min-w-[1010px] grid-cols-[30px_minmax(240px,1fr)_112px_96px_66px_132px_112px_minmax(150px,1fr)] items-center gap-3 border-b border-border px-3.5 py-3 last:border-b-0">
      <span
        className={`flex size-7 items-center justify-center rounded-[7px] border ${tone.bg} ${tone.border}`}
      >
        <Icon className={`size-4 ${tone.icon}`} />
      </span>
      <div className="min-w-0">
        <div className="font-12 font-semibold leading-[1.35] text-foreground">
          {item.title}
        </div>
        <div className="mt-0.5 font-12 leading-[1.45] text-muted-foreground">
          {item.detail}
        </div>
      </div>
      <span className="w-fit rounded-md border border-tone-blue-border bg-tone-blue-bg px-2 py-0.5 font-10 font-medium text-tone-blue-fg">
        {item.source}
      </span>
      <span className="font-12 text-muted-foreground">{item.job}</span>
      <span className="font-12 text-muted-foreground">{item.age}</span>
      <span className="text-right">
        <span
          className={`font-12 font-semibold ${item.state === "actioned" ? "text-tone-green-fg" : item.state === "lapsed" ? "text-tone-red-fg" : "text-primary"}`}
        >
          {formatWireframeNumber(item.value)}
        </span>
        <span className="mt-0.5 block font-12 text-muted-foreground">
          {item.state === "actioned"
            ? "recovered"
            : item.state === "lapsed"
              ? "lapsed"
              : item.state === "declined"
                ? "not taken"
                : "at stake"}
        </span>
      </span>
      <span
        className={`w-fit rounded-md border px-2 py-0.5 font-10 font-medium ${stateTone.bg} ${stateTone.border} ${stateTone.fg}`}
      >
        {item.state[0].toUpperCase() + item.state.slice(1)}
      </span>
      <div className="flex w-full justify-end">
        <button
          onClick={onOpen}
          className="flex w-full max-w-[150px] items-center justify-center gap-1 rounded-[7px] border border-primary bg-primary px-2.5 py-1.5 font-12 font-semibold text-primary-foreground hover:bg-brand-hover"
        >
          {item.cta}
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
