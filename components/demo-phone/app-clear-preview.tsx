"use client";

import { House, Search, SquarePlus, CircleUserRound, Ban } from "lucide-react";

export function AppClearPreview({
  app,
}: {
  app: { name: string; color: string; blocked: string; tools: string[] };
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10">
      <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: app.color }} />
        <p className="text-[13px] font-medium text-ink">{app.name}</p>
        <span className="ml-auto text-[9px] uppercase tracking-wide text-ink-muted">Open</span>
      </div>

      <div className="grid grid-cols-4 gap-1 p-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-md"
            style={{ backgroundColor: `${app.color}2A` }}
          />
        ))}
      </div>

      <div className="flex items-center justify-around border-t border-ink/10 bg-ink/5 py-2.5">
        <House size={15} className="text-ink-body" />
        <Search size={15} className="text-ink-body" />
        <SquarePlus size={15} className="text-ink-body" />
        <span className="relative flex items-center justify-center">
          <Ban size={15} className="text-ink-muted/40" />
        </span>
        <CircleUserRound size={15} className="text-ink-body" />
      </div>

      <p className="border-t border-ink/10 bg-ink/[0.03] px-3 py-1.5 text-center text-[10px] text-ink-muted">
        No {app.blocked} — the rest still works
      </p>
    </div>
  );
}
