"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Laptop, Users } from "lucide-react";
import { useLoad } from "@/components/account/use-load";
import { loadStudy } from "@/components/account/study-data";
import { WeekBars } from "@/components/account/week-bars";
import { fetchMyRoom } from "@/lib/mivo-account";
import { formatSpan, summarize, totalsFromSessions, weekBars } from "@/lib/study-stats";
import { footer, macDownloadUrl, macRelease } from "@/data/content";

export type TabId = "today" | "study" | "room" | "account";

const card = "rounded-3xl border border-ink/10 bg-surface p-6 shadow-card sm:p-7";

function CardLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep hover:text-ink"
    >
      {children}
      <ArrowRight size={14} />
    </button>
  );
}

// The first thing after sign-in: where your streak is and whether your room is live. Each card loads on
// its own, so a part that isn't ready never blocks the rest.
export function TodayPanel({ onOpen }: { onOpen: (tab: TabId) => void }) {
  const study = useLoad(loadStudy, 0);
  const room = useLoad(fetchMyRoom, 0);
  const [now] = useState(() => Date.now());

  const sessions = study.status === "ready" ? study.data : null;
  const summary = sessions ? summarize(sessions, now) : null;

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-espresso p-6 text-cream shadow-card sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-cream-muted">Streak</p>
        {summary ? (
          <>
            <p className="mt-2 font-display text-6xl leading-none text-cream sm:text-7xl">
              {summary.streak}
              <span className="ml-3 text-2xl text-cream-muted sm:text-3xl">{summary.streak === 1 ? "day" : "days"}</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-cream-muted">
              {summary.todayMs > 0
                ? `${formatSpan(summary.todayMs)} today.`
                : summary.sessions > 0
                  ? "Nothing yet today. A block of 10 minutes keeps it going."
                  : "Study for a block of 10 minutes and the streak starts."}
              {summary.scrollEarnedTodaySeconds >= 60 && ` ${Math.floor(summary.scrollEarnedTodaySeconds / 60)} min of scroll earned.`}
            </p>
            <div className="mt-6 rounded-2xl bg-cream/95 p-4 text-ink">
              <WeekBars bars={weekBars(totalsFromSessions(sessions ?? []), now)} />
            </div>
          </>
        ) : study.status === "loading" ? (
          <p className="mt-3 text-cream-muted">Loading…</p>
        ) : (
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream-muted">
            Your study history will show here once saved study is switched on. Sessions you finish in the meantime are kept
            and added then.
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/study"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-on-accent hover:brightness-105"
          >
            Start a session
          </Link>
          <button
            type="button"
            onClick={() => onOpen("study")}
            className="inline-flex h-11 items-center rounded-full border border-cream/25 px-6 text-sm font-medium text-cream hover:bg-cream/10"
          >
            See history
          </button>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2">
        <section className={card}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
            <Users size={20} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-ink">Study room</h3>
          {room.status === "ready" && room.data.has_room ? (
            <p className="mt-1 text-sm leading-relaxed text-ink-body">
              {room.data.studying
                ? `Live now${room.data.sitting.length ? `, ${room.data.sitting.length} sitting with you` : ""}.`
                : room.data.is_open
                  ? "Open. It goes live when you start studying."
                  : "Closed. Open it to let friends sit with you."}
            </p>
          ) : (
            <p className="mt-1 text-sm leading-relaxed text-ink-body">
              One link friends open to see you studying and sit with you. No app needed.
            </p>
          )}
          <CardLink onClick={() => onOpen("room")}>{room.status === "ready" && room.data.has_room ? "Manage room" : "Set up your room"}</CardLink>
        </section>

        <section className={card}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
            <Laptop size={20} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-ink">Mivo for Mac</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-body">
            Study on your Mac and only focused minutes count. Sessions land in this history and your streak.
          </p>
          <a
            href={macDownloadUrl}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-deep hover:text-ink"
          >
            Download {macRelease.version}
            <ArrowRight size={14} />
          </a>
        </section>
      </div>

      <p className="px-1 text-sm leading-relaxed text-ink-muted">
        Questions about your account? Email{" "}
        <a href={`mailto:${footer.contact.email}`} className="underline underline-offset-4 hover:text-ink">
          {footer.contact.email}
        </a>
        .
      </p>
    </div>
  );
}
