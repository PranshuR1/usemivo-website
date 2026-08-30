"use client";

import { Shield } from "lucide-react";
import { heroPhone, homeSpotlight } from "@/data/content";
import { cn } from "@/lib/utils";

export type HomeHighlight = "liveTime" | "truthChecks" | "insight" | "estimate" | "breakdown" | "forgotten";

const ring = "ring-2 ring-accent shadow-[0_0_20px_-4px_rgba(212,135,42,0.5)]";

function SpotlightCard({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl bg-gradient-to-br from-accent/25 via-accent/10 to-transparent p-4", ring)}>
      {children}
    </div>
  );
}

export function HomeScreen({ highlight }: { highlight?: HomeHighlight }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-ink-muted">{heroPhone.greeting}</p>
          <p className="text-lg font-semibold text-ink">{heroPhone.name}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-deep">
          <Shield size={16} />
        </div>
      </div>

      {highlight === "estimate" && (
        <SpotlightCard>
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep">
            {homeSpotlight.estimate.label}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div>
              <p className="text-[10px] text-ink-muted">Your guess</p>
              <p className="text-xl font-semibold text-ink-muted line-through decoration-ink-muted/50">
                {homeSpotlight.estimate.guess}
              </p>
            </div>
            <span className="text-ink-muted">→</span>
            <div>
              <p className="text-[10px] text-ink-muted">Reality</p>
              <p className="text-2xl font-semibold text-ink">{homeSpotlight.estimate.actual}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-ink-body">{homeSpotlight.estimate.note}</p>
        </SpotlightCard>
      )}

      {highlight === "breakdown" && (
        <SpotlightCard>
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep">
            {homeSpotlight.breakdown.label}
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            {homeSpotlight.breakdown.apps.map((app) => (
              <div key={app.name} className="flex items-center justify-between text-sm">
                <span className="text-ink-body">{app.name}</span>
                <span className="font-medium text-ink">{app.time}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>
      )}

      {highlight === "forgotten" && (
        <SpotlightCard>
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep">
            {homeSpotlight.forgotten.label}
          </p>
          <p className="mt-1 text-4xl font-semibold text-ink">{homeSpotlight.forgotten.value}</p>
          <p className="mt-1 text-xs text-ink-body">{homeSpotlight.forgotten.note}</p>
        </SpotlightCard>
      )}

      {highlight !== "estimate" && highlight !== "breakdown" && highlight !== "forgotten" && (
        <div
          className={cn(
            "rounded-2xl bg-gradient-to-br from-accent/25 via-accent/10 to-transparent p-4 transition-shadow",
            highlight === "liveTime" && ring
          )}
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-accent-deep">
            {heroPhone.liveLabel}
          </p>
          <p className="mt-1 text-4xl font-semibold text-ink">{heroPhone.time}</p>
          <p className="text-xs text-ink-muted">{heroPhone.timeSub}</p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="rounded-full bg-bg/40 px-2 py-1 text-ink-body">{heroPhone.unlocks}</span>
            <span className="rounded-full bg-kept/20 px-2 py-1 text-kept">{heroPhone.unlocksTrend}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {heroPhone.stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "rounded-2xl bg-ink/5 p-3 transition-shadow",
              highlight === "truthChecks" && stat.label === "Truth checks" && ring
            )}
          >
            <p className="text-xl font-semibold text-ink">{stat.value}</p>
            <p className="text-[11px] text-ink-muted">{stat.label}</p>
            {stat.trend && (
              <p className="mt-1 text-[11px] text-kept">
                {stat.trend} <span className="text-ink-muted">{stat.trendSub}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "rounded-2xl border border-ink/10 p-3.5 transition-shadow",
          highlight === "insight" && ring
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-muted">
          {heroPhone.insightLabel}
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-ink-body">{heroPhone.insight}</p>
      </div>
    </div>
  );
}
