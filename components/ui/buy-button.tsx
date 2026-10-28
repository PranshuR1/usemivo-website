"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { salesOpenAt } from "@/data/shop";
import { getAccountState, getServerAccountState, subscribeToAccount } from "@/lib/mivo-account";

const base =
  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all duration-300";

const noSubscription = () => () => {};
const isOpenNow = () => Date.now() >= salesOpenAt.getTime();
const isOpenOnServer = () => false;

export function BuyButton({ href, className }: { href: string; className?: string }) {
  // The server always renders the closed state, so the page can be cached and still open on time.
  const open = useSyncExternalStore(noSubscription, isOpenNow, isOpenOnServer);
  const account = useSyncExternalStore(subscribeToAccount, getAccountState, getServerAccountState);

  // Signed in: tag the checkout with the account's id (an opaque id, never an email) so the order
  // lands in "Orders" on usemivo.app/account.
  const userId = account.session?.user.id;
  const checkoutHref = userId ? `${href}${href.includes("?") ? "&" : "?"}client_reference_id=${userId}` : href;

  if (open && href) {
    return (
      <a
        href={checkoutHref}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          base,
          "bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(212_135_42/0.9)] hover:brightness-105",
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
