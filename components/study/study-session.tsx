"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  addSession,
  DAY_THRESHOLD_MS,
  elapsedMs,
  formatClock,
  formatMinutes,
  miloReceiptLine,
  parseTotals,
  streakDays,
  totalForDay,
  type DayTotals,
} from "@/lib/study-session";
import { renderReceiptPng } from "./receipt-image";

// Everything here stays on the device: no accounts, no requests, nothing uploaded.
// Storage is best-effort; if it is blocked the page still works for this visit.

const DAYS_KEY = "mivo.study.days";
const ACTIVE_KEY = "mivo.study.active";

type Active = { task: string; startedAt: number };
type Done = { task: string; startedAt: number; endedAt: number };

function readJson(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable or full: keep going in memory.
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}

function parseActive(raw: unknown): Active | null {
  if (typeof raw !== "object" || raw === null) return null;
  const { task, startedAt } = raw as Record<string, unknown>;
  if (typeof task !== "string" || typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return null;
  }
  return startedAt <= Date.now() ? { task, startedAt } : null;
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function dayWord(n: number): string {
  return n === 1 ? "1 day" : `${n} days`;
}

const primary = "block w-full rounded-lg bg-accent px-4 py-4 text-[15px] font-bold text-on-accent";
const secondary = "block w-full rounded-lg bg-surface px-4 py-4 text-[15px] font-bold text-ink";

export function StudySession({ backHref }: { backHref: string }) {
  const [ready, setReady] = useState(false);
  const [totals, setTotals] = useState<DayTotals>({});
  const [active, setActive] = useState<Active | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const [draft, setDraft] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [saveError, setSaveError] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- storage only exists in the browser, so it is read after mount */
    setTotals(parseTotals(readJson(DAYS_KEY)));
    setActive(parseActive(readJson(ACTIVE_KEY)));
    setNow(Date.now());
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const acquireWakeLock = useCallback(async () => {
    try {
      if ("wakeLock" in navigator && !wakeLock.current) {
        wakeLock.current = await navigator.wakeLock.request("screen");
        wakeLock.current.addEventListener("release", () => {
          wakeLock.current = null;
        });
      }
    } catch {
      // Not supported, or the device refused: the timer works without it.
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    const lock = wakeLock.current;
    wakeLock.current = null;
    lock?.release().catch(() => {});
  }, []);

  // While running: redraw from timestamps, and catch up as soon as the page is
  // visible again (iOS suspends timers in the background).
  useEffect(() => {
    if (!active) return;
    const tick = () => setNow(Date.now());
    const id = window.setInterval(tick, 500);
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        tick();
        void acquireWakeLock();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [active, acquireWakeLock]);

  useEffect(() => releaseWakeLock, [releaseWakeLock]);

  function start(e: React.FormEvent) {
    e.preventDefault();
    const task = draft.trim();
    if (!task) return;
    // Requested inside the tap handler, which is where browsers allow it.
    void acquireWakeLock();
    const next = { task, startedAt: Date.now() };
    writeJson(ACTIVE_KEY, next);
    setNow(next.startedAt);
    setActive(next);
  }

  function finish() {
    if (!active) return;
    const endedAt = Date.now();
    const nextTotals = addSession(totals, active.startedAt, endedAt);
    writeJson(DAYS_KEY, nextTotals);
    removeKey(ACTIVE_KEY);
    releaseWakeLock();
    setTotals(nextTotals);
    setDone({ ...active, endedAt });
    setActive(null);
  }

  function again() {
    setDone(null);
    setDraft("");
    setSaveError(false);
  }

  async function saveReceipt() {
    if (!done) return;
    setSaveError(false);
    try {
      const blob = await renderReceiptPng({
        task: done.task,
        minutes: formatMinutes(elapsedMs(done.startedAt, done.endedAt)),
        date: formatDate(done.startedAt),
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mivo-receipt.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      setSaveError(true);
    }
  }

  const streak = streakDays(totals, now);
  const today = totalForDay(totals, now);

  const stats = (
    <dl className="mt-8 grid grid-cols-2 gap-3 text-left">
      <div className="rounded-lg bg-surface px-4 py-4">
        <dt className="text-[13px] text-ink-muted">Today</dt>
        <dd className="mt-1 text-xl font-bold text-ink">{formatMinutes(today)}</dd>
      </div>
      <div className="rounded-lg bg-surface px-4 py-4">
        <dt className="text-[13px] text-ink-muted">Streak</dt>
        <dd className="mt-1 text-xl font-bold text-ink">{streak > 0 ? dayWord(streak) : "None yet"}</dd>
      </div>
      <p className="col-span-2 text-[13px] leading-relaxed text-ink-muted">
        A block of {DAY_THRESHOLD_MS / 60000} minutes counts for the day, so the streak rewards
        starting. Kept on this device only.
      </p>
    </dl>
  );

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <section className="w-full max-w-md text-center">
        {!ready ? null : done ? (
          <>
            <h1 className="font-display text-4xl italic text-ink">Session done</h1>
            <div className="mt-6 rounded-lg bg-surface px-5 py-6 text-left">
              <p className="text-[13px] text-ink-muted">You worked on</p>
              <p className="mt-1 break-words font-display text-3xl italic text-ink">{done.task}</p>
              <p className="mt-5 text-3xl font-extrabold text-ink">
                {formatMinutes(elapsedMs(done.startedAt, done.endedAt))}
              </p>
              <p className="mt-1 text-[14px] text-ink-body">{formatDate(done.startedAt)}</p>
              <p className="mt-4 text-[13px] text-ink-muted">Timer time, not verified</p>
            </div>
            <p className="mt-5 text-left text-[15px] leading-relaxed text-ink-body">
              <span className="font-bold text-ink">Milo:</span>{" "}
              {miloReceiptLine(today, streak)}
            </p>
            <div className="mt-6 space-y-3">
              <button type="button" onClick={saveReceipt} className={primary}>
                Save receipt
              </button>
              {saveError && (
                <p role="status" className="text-[14px] text-ink-muted">
                  Couldn&apos;t make the image on this browser.
                </p>
              )}
              <button type="button" onClick={again} className={secondary}>
                Start another
              </button>
            </div>
            {stats}
          </>
        ) : active ? (
          <>
            <p className="text-[14px] text-ink-muted">Working on</p>
            <h1 className="mt-1 break-words font-display text-3xl italic text-ink">{active.task}</h1>
            <p
              className="mt-10 font-sans text-7xl font-extrabold tabular-nums text-ink"
              aria-label="Elapsed time"
            >
              {formatClock(elapsedMs(active.startedAt, now))}
            </p>
            <button type="button" onClick={finish} className={`${primary} mt-10`}>
              Finish
            </button>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-muted">
              The timer keeps its place if you switch apps or reload this page.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-5 grid h-[72px] w-[72px] place-items-center rounded-lg bg-surface font-sans text-2xl font-extrabold text-accent-deep">
              mivo
            </div>
            <form onSubmit={start}>
              <label htmlFor="task" className="font-display text-4xl italic text-ink">
                What&apos;s the one thing you&apos;re doing?
              </label>
              <input
                id="task"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={120}
                autoComplete="off"
                enterKeyHint="go"
                className="mt-6 block w-full rounded-lg bg-surface px-4 py-4 text-base text-ink placeholder:text-ink-muted"
                placeholder="Chapter 4 notes"
              />
              <ul className="mt-5 space-y-2 text-left text-[14px] leading-relaxed text-ink-body">
                <li>Plug the phone in and prop it up across the room.</li>
                <li>Point it at your hands and desk. Your face is optional.</li>
                <li>
                  This page just keeps time. In the next Mivo update the app films the session and
                  turns it into scroll time.
                </li>
              </ul>
              <button
                type="submit"
                disabled={!draft.trim()}
                className={`${primary} mt-3 disabled:opacity-50`}
              >
                Start
              </button>
            </form>
            {stats}
            <a
              href={backHref}
              className="mt-8 inline-block text-[14px] text-accent-deep underline underline-offset-4"
            >
              Back to this Spot
            </a>
          </>
        )}
      </section>
    </main>
  );
}
