"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Laptop, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/account/field";
import { useLoad } from "@/components/account/use-load";
import { loadStudy } from "@/components/account/study-data";
import { WeekBars } from "@/components/account/week-bars";
import { deleteWebSession, type StudySession } from "@/lib/mivo-account";
import { pendingCount } from "@/lib/study-sync";
import { formatSpan, groupByDay, sessionMs, summarize, totalsFromSessions, weekBars } from "@/lib/study-stats";

const clock = (iso: string) => new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-bg-alt px-4 py-4">
      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">{label}</dt>
      <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-ink">{value}</dd>
      {hint && <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

function SessionRow({ session, onDeleted }: { session: StudySession; onDeleted: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filmed = session.source === "ios";
  const computer = session.source === "desktop";
  const earned = Math.floor(session.scroll_seconds_earned / 60);

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      await deleteWebSession(session.id);
      onDeleted();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Couldn't remove this session.");
      setBusy(false);
    }
  }

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3.5">
      <div className="min-w-0">
        <p className="break-words font-medium text-ink">{session.task}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-ink-muted">
          <span>
            {clock(session.started_at)} – {clock(session.ended_at)}
          </span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            {filmed ? <Camera size={13} /> : computer ? <Laptop size={13} /> : <Timer size={13} />}
            {filmed ? "Filmed on iPhone" : computer ? "Focused on a computer" : "Web timer"}
          </span>
          {earned > 0 && (
            <>
              <span aria-hidden>·</span>
              <span className="text-kept">+{earned} min scroll</span>
            </>
          )}
        </p>
        {error && <p className="mt-1 text-sm text-red-900">{error}</p>}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold tabular-nums text-ink">{formatSpan(sessionMs(session))}</span>
        {session.source === "web" && (
          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="text-sm text-ink-muted underline underline-offset-4 hover:text-ink disabled:opacity-50"
          >
            {busy ? "Removing…" : "Remove"}
          </button>
        )}
      </div>
    </li>
  );
}

export function StudyUnavailable() {
  return (
    <div className="rounded-3xl border border-ink/10 bg-surface p-8 text-center shadow-card">
      <h3 className="font-display text-3xl text-ink">Study sync is on its way</h3>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-body">
        We&apos;re switching on saved study history and rooms. Sessions you finish on this site are kept on this device
        and will be added to your account as soon as it&apos;s ready.
      </p>
      <div className="mt-6">
        <Link
          href="/study"
          className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-on-accent hover:brightness-105"
        >
          Start a session
        </Link>
      </div>
    </div>
  );
}

export function StudyPanel() {
  const [nonce, setNonce] = useState(0);
  const [now] = useState(() => Date.now());
  const result = useLoad(loadStudy, nonce);

  if (result.status === "loading") return <p className="py-10 text-center text-ink-muted">Loading your study history…</p>;
  if (result.status === "error") {
    if (result.error.code === "unavailable") return <StudyUnavailable />;
    return (
      <div className="space-y-4">
        <FormError>{result.error.message}</FormError>
        <Button variant="secondary" onClick={() => setNonce((n) => n + 1)}>
          Try again
        </Button>
      </div>
    );
  }

  const sessions = result.data;
  const summary = summarize(sessions, now);
  const bars = weekBars(totalsFromSessions(sessions), now);
  const groups = groupByDay(sessions, now);
  const waiting = pendingCount();

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">Your study</h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-body">
              A day counts once you have a block of 10 minutes, so the streak rewards starting. Sessions from the Mivo
              app and from this site add up here.
            </p>
          </div>
          <Link
            href="/study"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-on-accent hover:brightness-105"
          >
            Start a session
          </Link>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Streak"
            value={summary.streak ? `${summary.streak} ${summary.streak === 1 ? "day" : "days"}` : "None yet"}
            hint={summary.longest > summary.streak ? `Best: ${summary.longest} days` : undefined}
          />
          <Stat label="Today" value={formatSpan(summary.todayMs)} />
          <Stat label="This week" value={formatSpan(summary.weekMs)} />
          <Stat label="All time" value={formatSpan(summary.totalMs)} hint={`${summary.sessions} ${summary.sessions === 1 ? "session" : "sessions"}`} />
        </dl>

        <div className="mt-7">
          <WeekBars bars={bars} />
        </div>
        {waiting > 0 && (
          <p className="mt-5 rounded-xl bg-bg-alt px-4 py-3 text-sm text-ink-body">
            {waiting} {waiting === 1 ? "session is" : "sessions are"} waiting to be added to your account.
          </p>
        )}
      </section>

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">How studying earns scroll time</h3>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-body">
          <li>Name the one thing you&apos;re doing, in the Mivo app or on a Spot&apos;s page.</li>
          <li>Prop the phone up across the room. The app films your hands and desk; your face is optional.</li>
          <li>Every 3 minutes on video earns 1 minute of scroll in Instagram inside Mivo, up to 60 a day.</li>
          <li>The website only keeps time. Only the app earns scroll time, because only the app can film.</li>
        </ol>
        <p className="mt-3 text-sm text-ink-muted">
          Earning scroll time is free for your first 7 days of studying, then part of{" "}
          <Link href="/pricing" className="underline underline-offset-4 hover:text-ink">
            Mivo Plus
          </Link>
          . Sessions and streaks always count.
        </p>
      </section>

      <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7">
        <h3 className="text-lg font-semibold text-ink">History</h3>
        {groups.length === 0 ? (
          <p className="mt-3 text-[15px] leading-relaxed text-ink-body">
            No sessions yet. Finish one in the Mivo app, or start a timer on this site while you&apos;re signed in, and
            it shows up here.
          </p>
        ) : (
          <div className="mt-2 divide-y divide-ink/10">
            {groups.map((group) => (
              <div key={group.key} className="py-4 first:pt-2">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-ink">{group.label}</h4>
                  <span className="text-sm text-ink-muted">{formatSpan(group.ms)}</span>
                </div>
                <ul className="divide-y divide-ink/5">
                  {group.sessions.map((session) => (
                    <SessionRow key={session.id} session={session} onDeleted={() => setNonce((n) => n + 1)} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {sessions.length >= 500 && (
          <p className="mt-3 text-sm text-ink-muted">Showing your most recent 500 sessions.</p>
        )}
      </section>
    </div>
  );
}
