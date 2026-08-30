"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { appStoreUrl, macDownloadUrl, windowsDownloadUrl } from "@/data/content";
import { cn } from "@/lib/utils";

export function DownloadDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-deep"
      >
        Download
        <ChevronDown size={14} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"
        >
          <Link
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-ink/5"
          >
            <span className="text-sm font-medium text-ink">iOS</span>
            <span className="text-xs text-ink-muted">Download on the App Store</span>
          </Link>
          <Link
            href={macDownloadUrl}
            download
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex flex-col gap-0.5 border-t border-ink/10 px-4 py-3 transition-colors hover:bg-ink/5"
          >
            <span className="text-sm font-medium text-ink">macOS</span>
            <span className="text-xs text-ink-muted">Download the Mac app</span>
          </Link>
          <Link
            href={windowsDownloadUrl}
            download
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex flex-col gap-0.5 border-t border-ink/10 px-4 py-3 transition-colors hover:bg-ink/5"
          >
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink-muted">
              Windows
              <span className="rounded-full bg-ink/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
                Beta
              </span>
            </span>
            <span className="text-xs text-ink-muted">Mivo is now on Windows (beta)</span>
          </Link>
        </div>
      )}
    </div>
  );
}
