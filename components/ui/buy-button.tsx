"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { comingSoonNote } from "@/data/content";
import { salesOpenAt } from "@/data/shop";
import { getAccountState, getServerAccountState, subscribeToAccount } from "@/lib/mivo-account";
import { spotPicksReference, withReference } from "@/lib/spot-picks";

const base =
  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-medium transition-all duration-300";

const noSubscription = () => () => {};
const isOpenNow = () => salesOpenAt !== null && Date.now() >= salesOpenAt.getTime();
const isOpenOnServer = () => false;

export function BuyButton({
  href,
  picks = [],
  blockedLabel,
  className,
}: {
  href: string;
  // The place picked for each Spot in the pack, in order (keys from spotPlaces).
  picks?: readonly string[];
  // Set while the buyer still has to choose something; the button stays off and shows this instead.
  blockedLabel?: string;
  className?: string;
}) {
  // The server always renders the closed state, so the page can be cached and still open on time.
  const open = useSyncExternalStore(noSubscription, isOpenNow, isOpenOnServer);
  const account = useSyncExternalStore(subscribeToAccount, getAccountState, getServerAccountState);

  // Signed in: tag the checkout with the account's id (an opaque id, never an email) so the order
  // lands in "Orders" on usemivo.app/account. The picked places ride along in the same reference.
  const checkoutHref = withReference(href, spotPicksReference(account.session?.user.id, picks));

  if (open && href && !blockedLabel) {
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

  // Paused sales win over a missing pick: there is nothing to check out either way.
  const label =
    salesOpenAt === null
      ? comingSoonNote
      : blockedLabel ??
        (open ? "Checkout opening soon" : `On sale ${salesOpenAt.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" })}`);

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
