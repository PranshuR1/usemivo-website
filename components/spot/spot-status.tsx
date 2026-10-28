"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AccountError,
  getAccountState,
  getServerAccountState,
  resolveSpot,
  subscribeToAccount,
  type SpotState,
} from "@/lib/mivo-account";
import { cn } from "@/lib/utils";

const outcomes: Record<SpotState["state"], { title: string; body: string; tone: "good" | "neutral" | "bad" }> = {
  unclaimed: {
    title: "Ready to set up",
    body: "Nobody has connected this Spot yet. Open Mivo on your iPhone and tap it to set it up.",
    tone: "good",
  },
  yours: {
    title: "Connected to your account",
    body: "This Spot is yours. Tap it with your iPhone to start it, or manage it from your account.",
    tone: "good",
  },
  taken: {
    title: "Connected to another account",
    body: "Someone has already set this Spot up. Mivo never shows whose. If you bought it from us, email us and we'll look into it.",
    tone: "bad",
  },
  disabled: {
    title: "Switched off by Mivo",
    body: "Tapping this Spot won't start anything. If you think that's a mistake, email us with the Spot's ID.",
    tone: "bad",
  },
  invalid: {
    title: "We couldn't find this Spot",
    body: "Check that you opened the link from the tag itself. If you did, email us and we'll take a look.",
    tone: "bad",
  },
};

const tones = {
  good: "border-kept/30 bg-kept/10",
  neutral: "border-ink/10 bg-bg-alt",
  bad: "border-red-800/20 bg-red-50",
} as const;

export function SpotStatus({ spotId }: { spotId: string }) {
  const account = useSyncExternalStore(subscribeToAccount, getAccountState, getServerAccountState);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SpotState | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function check() {
    setBusy(true);
    setError(null);
    try {
      setResult(await resolveSpot(spotId));
    } catch (caught) {
      setError(caught instanceof AccountError ? caught.message : "Couldn't check this Spot. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const outcome = result ? outcomes[result.state] : null;

  return (
    <div className="rounded-2xl border border-ink/10 bg-surface p-5 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">This Spot&apos;s status</p>

      {outcome ? (
        <div className={cn("mt-3 rounded-xl border p-4", tones[outcome.tone])}>
          <p className="font-semibold text-ink">{outcome.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-body">{outcome.body}</p>
          {result?.state === "yours" && (
            <Link href="/account" className="mt-3 inline-block text-sm font-medium text-accent-deep underline underline-offset-4">
              Manage in your account
            </Link>
          )}
        </div>
      ) : account.ready && account.session ? (
        <>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">
            Signed in as {account.session.user.email}. Check whether this Spot is ready to set up or already connected.
          </p>
          <Button variant="dark" busy={busy} onClick={check} className="mt-4">
            Check this Spot
          </Button>
        </>
      ) : (
        <p className="mt-2 text-sm leading-relaxed text-ink-body">
          For privacy, this page doesn&apos;t say whether a Spot is taken. Sign in to check it, or see every Spot
          connected to your account.{" "}
          <Link href="/account" className="font-medium text-accent-deep underline underline-offset-4">
            Sign in
          </Link>
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-900">
          {error}
        </p>
      )}
    </div>
  );
}
