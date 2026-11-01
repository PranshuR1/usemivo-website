"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Nfc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComingSoon } from "@/components/ui/coming-soon";
import { FormError } from "@/components/account/field";
import { useLoad } from "@/components/account/use-load";
import { fetchMySpots, releaseSpot, type MySpot } from "@/lib/mivo-account";
import { comingSoonNote, footer } from "@/data/content";
import { bannerSteps } from "@/data/spot-guide";
import { formatSpotId } from "@/lib/spot-id";
import { cn } from "@/lib/utils";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SpotCard({ spot, onChanged }: { spot: MySpot; onChanged: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const off = spot.status === "disabled";
  const claimed = formatDate(spot.claimed_at);

  async function disconnect() {
    setBusy(true);
    setError(null);
    try {
      await releaseSpot(spot.spot_id);
      onChanged();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Couldn't disconnect this Spot. Please try again.");
      setBusy(false);
    }
  }

  const help = `mailto:${footer.contact.email}?subject=${encodeURIComponent(`Mivo Spot ${spot.spot_id}`)}`;

  return (
    <article className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
            <Nfc size={22} />
          </span>
          <div>
            <p className="font-mono text-lg font-semibold tracking-wider text-ink">{formatSpotId(spot.spot_id)}</p>
            <p className="text-sm text-ink-muted">{claimed ? `Connected ${claimed}` : "Connected to your account"}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
            off ? "bg-red-50 text-red-900" : "bg-kept/15 text-kept"
          )}
        >
          {off ? "Switched off by Mivo" : "Connected"}
        </span>
      </div>

      {off && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-900">
          Mivo switched this Spot off, so tapping it won&apos;t start anything. If you think that&apos;s a mistake,{" "}
          <a href={help} className="underline underline-offset-4">
            email us
          </a>{" "}
          and we&apos;ll sort it out.
        </p>
      )}

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-ink-muted">Tag link</dt>
          <dd className="mt-0.5 break-all font-mono text-[13px] text-ink">usemivo.app/s/{spot.spot_id}</dd>
        </div>
        <div>
          <dt className="text-ink-muted">Name, apps and timer</dt>
          <dd className="mt-0.5 text-ink">Set in the Mivo app on your iPhone</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => setShowSteps((v) => !v)}
        aria-expanded={showSteps}
        className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent-deep hover:text-ink"
      >
        Skip the tap banner
        <ChevronDown size={15} className={cn("transition-transform", showSteps && "rotate-180")} />
      </button>
      {showSteps && (
        <div className="mt-3 rounded-2xl bg-bg-alt p-5">
          <p className="text-sm leading-relaxed text-ink-body">
            iOS shows a banner whenever a tag is read. A Shortcuts automation makes a tap start your Spot with no banner:
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-body">
            {bannerSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <FormError>{error}</FormError>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink/10 pt-5">
        {confirming ? (
          <>
            <p className="w-full text-sm leading-relaxed text-ink-body">
              Disconnect this Spot? It can then be set up again by you or anyone you pass it to. The Spot&apos;s
              settings stay in your Mivo app.
            </p>
            <Button variant="danger" busy={busy} onClick={disconnect}>
              Yes, disconnect
            </Button>
            <Button variant="ghost" onClick={() => setConfirming(false)} disabled={busy}>
              Keep it
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setConfirming(true)}>
              Disconnect
            </Button>
            {!off && (
              <Link
                href={`/study/${encodeURIComponent(spot.spot_id)}`}
                className="inline-flex h-11 items-center rounded-full border border-ink/15 bg-surface px-6 text-sm font-medium text-ink shadow-sm hover:border-ink/30 hover:bg-white"
              >
                Study here
              </Link>
            )}
            <a href={help} className="text-sm text-ink-body underline underline-offset-4 hover:text-ink">
              Report a problem
            </a>
          </>
        )}
      </div>
    </article>
  );
}

export function SpotsPanel() {
  const [nonce, setNonce] = useState(0);
  const result = useLoad(fetchMySpots, nonce);

  if (result.status === "loading") return <p className="py-10 text-center text-ink-muted">Loading your Spots…</p>;
  if (result.status === "error") {
    return (
      <div className="space-y-4">
        <FormError>{result.error.message}</FormError>
        <Button variant="secondary" onClick={() => setNonce((n) => n + 1)}>
          Try again
        </Button>
      </div>
    );
  }

  const spots = result.data;

  if (spots.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink/20 bg-surface/60 p-8 text-center sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
          <Nfc size={26} />
        </span>
        <h3 className="mt-5 font-display text-3xl text-ink">No Spots connected yet</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-body">
          A Spot shows up here after you tap it with your iPhone and connect it in the Mivo app. Each Spot belongs to
          one account.
        </p>
        <div className="mt-4 flex justify-center">
          <ComingSoon>{comingSoonNote}</ComingSoon>
        </div>
        <div className="mt-7">
          <Link
            href="/shop"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-on-accent hover:brightness-105"
          >
            Shop Mivo Spots
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {spots.map((spot) => (
        <SpotCard key={spot.spot_id} spot={spot} onChanged={() => setNonce((n) => n + 1)} />
      ))}
      <p className="px-1 text-sm leading-relaxed text-ink-muted">
        To add another Spot, tap it with your iPhone in the Mivo app. It&apos;s connected to your account the first
        time you finish setting it up.
      </p>
    </div>
  );
}
