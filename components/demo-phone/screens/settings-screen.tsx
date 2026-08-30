"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { demoSettings } from "@/data/content";
import { cn } from "@/lib/utils";

export function SettingsScreen({ highlight }: { highlight?: string }) {
  const [lateNight, setLateNight] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold text-ink">Settings</p>

      <div className="flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10">
        {demoSettings.sections.map((item) => (
          <div
            key={item.title}
            className={cn(
              "flex items-center justify-between gap-3 p-3.5 transition-shadow",
              highlight === item.title && "relative z-10 rounded-2xl ring-2 ring-accent shadow-[0_0_20px_-4px_rgba(212,135,42,0.5)]"
            )}
          >
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-ink">{item.title}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-ink-muted">{item.body}</p>
            </div>
            {item.toggle ? (
              <button
                type="button"
                onClick={() => setLateNight((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  lateNight ? "bg-accent" : "bg-ink/15"
                }`}
                aria-pressed={lateNight}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    lateNight ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            ) : (
              <ChevronRight size={16} className="shrink-0 text-ink-muted" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
