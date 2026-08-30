"use client";

import { demoPatterns } from "@/data/content";
import { cn } from "@/lib/utils";

export type PatternsHighlight = "chart" | "windowsKept" | "noticed";

const ring = "ring-2 ring-accent shadow-[0_0_20px_-4px_rgba(212,135,42,0.5)]";

export function PatternsScreen({ highlight }: { highlight?: PatternsHighlight }) {
  const maxMinutes = Math.max(...demoPatterns.week.map((d) => d.minutes));

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold text-ink">Patterns</p>

      <div
        className={cn(
          "rounded-2xl border border-ink/10 p-3.5 transition-shadow",
          highlight === "chart" && ring
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          {demoPatterns.weekLabel}
        </p>
        <div className="mt-3 flex items-end justify-between gap-1.5">
          {demoPatterns.week.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-16 w-full items-end">
                <div
                  className="w-full rounded-full bg-accent/60"
                  style={{ height: `${Math.max(10, (d.minutes / maxMinutes) * 100)}%` }}
                />
              </div>
              <span className="text-[9px] text-ink-muted">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "rounded-2xl bg-ink/5 p-3.5 transition-shadow",
          highlight === "windowsKept" && ring
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          {demoPatterns.windowsKeptLabel}
        </p>
        <p className="mt-1 text-2xl font-semibold text-ink">
          {demoPatterns.windowsKept}{" "}
          <span className="text-sm font-normal text-ink-muted">{demoPatterns.windowsKeptSub}</span>
        </p>
      </div>

      <div
        className={cn(
          "rounded-2xl border border-ink/10 p-3.5 transition-shadow",
          highlight === "noticed" && ring
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          {demoPatterns.noticedLabel}
        </p>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {demoPatterns.insights.map((insight) => (
            <div key={insight.label}>
              <p className="text-[13px] font-medium text-ink">{insight.label}</p>
              <p className="text-[11px] text-ink-muted">{insight.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
