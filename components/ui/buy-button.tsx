"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { salesOpenAt } from "@/data/shop";

const base =
  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all duration-300";

const noSubscription = () => () => {};
const isOpenNow = () => Date.now() >= salesOpenAt.getTime();
const isOpenOnServer = () => false;

export function BuyButton({ href, className }: { href: string; className?: string }) {
  // The server always renders the closed state, so the page can be cached and still open on time.
  const open = useSyncExternalStore(noSubscription, isOpenNow, isOpenOnServer);

  if (open && href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          base,
          "bg-accent text-bg hover:bg-accent-deep hover:shadow-[0_8px_30px_-6px_rgba(212,135,42,0.55)]",
          className
        )}
      >
        Buy now
        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    );
  }

  const label = open ? "Checkout opening soon" : `On sale ${salesOpenAt.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" })}`;

  return (
    <button
      type="button"
      disabled
      className={cn(base, "cursor-not-allowed border border-ink/15 text-ink-muted", className)}
    >
      {label}
    </button>
  );
}
