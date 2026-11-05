"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { appStoreUrl, macDownloadUrl, macRelease, windowsDownloadUrl, windowsRelease } from "@/data/content";
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
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-espresso px-5 text-sm font-medium text-cream transition-colors hover:bg-espresso-raised"
      >
        Download
        <ChevronDown size={14} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-lift"
        >
          <Link
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-ink/5"
          >
            <span className="text-sm font-medium text-ink">iPhone</span>
            <span className="text-xs text-ink-muted">Download on the App Store</span>
          </Link>
          <Link
            href={macDownloadUrl}
            download
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex flex-col gap-0.5 border-t border-ink/10 px-4 py-3 transition-colors hover:bg-ink/5"
          >
            <span className="text-sm font-medium text-ink">Mac</span>
            <span className="text-xs text-ink-muted">Version {macRelease.version} · now with study sessions</span>
          </Link>
          <Link
            href={windowsDownloadUrl}
            download
            onClick={() => setOpen(false)}
            role="menuitem"
            className="flex flex-col gap-0.5 border-t border-ink/10 px-4 py-3 transition-colors hover:bg-ink/5"
          >
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink">
              Windows
              <span className="rounded-full bg-ink/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">
                Beta
              </span>
            </span>
            <span className="text-xs text-ink-muted">Version {windowsRelease.version} · Windows 10 / 11</span>
          </Link>
        </div>
      )}
    </div>
  );
}
