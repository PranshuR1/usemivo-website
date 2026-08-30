"use client";

import { House, Activity, Hand, SlidersHorizontal } from "lucide-react";
import { demoTabs } from "@/data/content";
import { cn } from "@/lib/utils";

const icons = {
  home: House,
  patterns: Activity,
  interventions: Hand,
  settings: SlidersHorizontal,
};

export function TabBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-surface-raised/80 px-2 py-2 backdrop-blur-sm">
      {demoTabs.map((tab) => {
        const Icon = icons[tab.id];
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[10px] font-medium transition-colors",
              isActive ? "text-accent-deep" : "text-ink-muted hover:text-ink-body"
            )}
          >
            <Icon size={17} strokeWidth={isActive ? 2.4 : 2} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
