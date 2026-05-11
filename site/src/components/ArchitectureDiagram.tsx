import { ArrowRight, Binary, Cpu, Globe, Server, TerminalSquare, type LucideIcon } from "lucide-react";

function Node({
  title,
  subtitle,
  icon: Icon,
  compact = false,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  compact?: boolean;
}) {
  const subtitleClass = compact
    ? "rounded-full border border-line bg-[#0a0f1a] px-2.5 py-1 font-mono text-[11px] text-slate-200"
    : "rounded-full border border-line bg-[#0a0f1a] px-2 py-1 font-mono text-[10px] text-slate-400";
  const titleClass = compact ? "mt-3 text-sm font-semibold text-white" : "mt-3 text-sm font-semibold text-slate-100";
  const wrapperClass = compact ? "rounded-xl border border-line bg-[#0d1320] p-4 shadow-glow min-h-[88px]" : "rounded-xl border border-line bg-[#0d1320] p-4 shadow-glow";

  return (
    <article className={wrapperClass}>
      <div className="flex items-start gap-3">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/35 bg-accent/10 text-accent">
          <Icon size={compact ? 17 : 16} />
        </div>
        <div className="min-w-0">
          <p className={compact ? "text-sm font-semibold text-white" : titleClass}>{title}</p>
          <span className={`${subtitleClass} mt-1 inline-flex`}>{subtitle}</span>
        </div>
      </div>
    </article>
  );
}

function FlowChip({
  from,
  to,
  tone = "cyan",
}: {
  from: string;
  to: string;
  tone?: "cyan" | "violet";
}) {
  const toneClass =
    tone === "violet"
      ? "border-violet-400/25 bg-violet-400/10 text-violet-200"
      : "border-accent/30 bg-accent/10 text-cyan-200";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] ${toneClass}`}
      aria-label={`${from} to ${to}`}
      title={`${from} to ${to}`}
    >
      <span>{from}</span>
      <ArrowRight size={12} />
      <span>{to}</span>
    </div>
  );
}

export function ArchitectureDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <section id={compact ? undefined : "architecture"} className={compact ? "" : "section-wrap"}>
      {!compact && <h2 className="section-title">Architecture</h2>}
      {!compact && (
        <p className="section-subtitle">
          Browser app shell and terminal CLI converge on one local API surface that routes to built-in or external backends.
        </p>
      )}
      <div className={`mt-6 grid gap-4 ${compact ? "grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
        <Node title="Browser App Shell" subtitle="localhost:5173" icon={Globe} compact={compact} />
        <Node title="HTTP API" subtitle="localhost:8000/v1" icon={Server} compact={compact} />
        <Node title="Backend Runtime" subtitle="npu_wrapper / external" icon={Cpu} compact={compact} />
        <Node title="Terminal CLI" subtitle="npu_cli.ps1" icon={TerminalSquare} compact={compact} />
      </div>
      {!compact && (
        <svg viewBox="0 0 1000 210" className="mt-6 w-full" aria-label="AcouLM data flow diagram">
          <defs>
            <marker id="arrowhead-tech" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0,0 8,4 0,8" fill="#00d4ff" />
            </marker>
          </defs>
          <path d="M90 60 L390 60" stroke="#00d4ff" strokeWidth="2" markerEnd="url(#arrowhead-tech)" fill="none" />
          <path d="M430 60 L735 60" stroke="#00d4ff" strokeWidth="2" markerEnd="url(#arrowhead-tech)" fill="none" />
          <path d="M825 70 L825 150" stroke="#6f7cff" strokeWidth="2" markerEnd="url(#arrowhead-tech)" fill="none" />
          <path d="M90 155 L390 88" stroke="#6f7cff" strokeWidth="2" markerEnd="url(#arrowhead-tech)" fill="none" />

          <text x="195" y="44" fill="#8fa4bd" fontSize="13">Browser -&gt; API</text>
          <text x="548" y="44" fill="#8fa4bd" fontSize="13">API -&gt; Runtime</text>
          <text x="158" y="172" fill="#8fa4bd" fontSize="13">CLI -&gt; API</text>
        </svg>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <FlowChip from="Browser UI" to="API Layer" />
        <FlowChip from="API Layer" to="Runtime" />
        <FlowChip from="CLI" to="API" tone="violet" />
        <span
          className="inline-flex items-center gap-2 rounded-full border border-line bg-[#0a0f1a] px-3 py-1.5 font-mono text-[11px] text-slate-300"
          aria-label="CPU, GPU, NPU"
          title="CPU, GPU, NPU"
        >
          <Binary size={12} className="text-accent" />
          CPU | GPU | NPU
        </span>
      </div>
    </section>
  );
}
