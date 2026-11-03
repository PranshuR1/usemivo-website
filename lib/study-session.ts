// Pure time and streak logic for the study session page. No DOM, no storage:
// callers pass in timestamps (ms since epoch) and get plain values back.
//
// A "day" is the device's local calendar day. A day counts toward the streak when
// the total timer time recorded on it is at least DAY_THRESHOLD_MS.

export const DAY_THRESHOLD_MS = 10 * 60 * 1000;

/** Timer milliseconds per local day, keyed "YYYY-MM-DD". */
export type DayTotals = Record<string, number>;

const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function dayKey(ms: number): string {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function startOfDay(ms: number): number {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function startOfNextDay(ms: number): number {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).getTime();
}

function startOfPreviousDay(ms: number): number {
  const d = new Date(ms);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1).getTime();
}

/** Elapsed time from timestamps, so it stays right when the page was suspended. */
export function elapsedMs(startedAt: number, now: number): number {
  return Math.max(0, now - startedAt);
}

/**
 * Adds the span startedAt..endedAt to the totals, splitting it at local midnight
 * so a session that crosses midnight counts toward both days. Returns a new object.
 */
export function addSession(totals: DayTotals, startedAt: number, endedAt: number): DayTotals {
  const next: DayTotals = { ...totals };
  let cursor = startedAt;
  while (cursor < endedAt) {
    const boundary = Math.min(endedAt, startOfNextDay(cursor));
    const key = dayKey(cursor);
    next[key] = (next[key] ?? 0) + (boundary - cursor);
    cursor = boundary;
  }
  return next;
}

export function totalForDay(totals: DayTotals, ms: number): number {
  return totals[dayKey(ms)] ?? 0;
}

/**
 * Consecutive qualifying days. If today hasn't reached the threshold yet, the
 * streak is counted back from yesterday, so an unfinished day doesn't read as a
 * broken streak.
 */
export function streakDays(totals: DayTotals, now: number): number {
  let day = startOfDay(now);
  if (totalForDay(totals, day) < DAY_THRESHOLD_MS) day = startOfPreviousDay(day);
  let count = 0;
  while (totalForDay(totals, day) >= DAY_THRESHOLD_MS) {
    count += 1;
    day = startOfPreviousDay(day);
  }
  return count;
}

/**
 * Milo's line on the receipt. Fixed rules, no chat: what it says depends only on
 * today's total and the streak.
 */
export function miloReceiptLine(todayMs: number, streak: number): string {
  if (todayMs >= DAY_THRESHOLD_MS) {
    return streak >= 2
      ? `${streak} days in a row. A block of ${DAY_THRESHOLD_MS / 60000} minutes was all it took.`
      : "That counts. You started, and that was the hard part.";
  }
  const left = Math.ceil((DAY_THRESHOLD_MS - todayMs) / 60000);
  return `That's a start. ${left} more ${left === 1 ? "minute" : "minutes"} today and the day counts.`;
}

/** Whole minutes of timer time, rounded down. */
export function wholeMinutes(ms: number): number {
  return Math.floor(Math.max(0, ms) / 60000);
}

/** "04:07" or "1:02:09". */
export function formatClock(ms: number): string {
  const total = Math.floor(Math.max(0, ms) / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

/** "Under a minute", "1 minute", "25 minutes". */
export function formatMinutes(ms: number): string {
  const m = wholeMinutes(ms);
  if (m < 1) return "Under a minute";
  return m === 1 ? "1 minute" : `${m} minutes`;
}

/** Validates whatever was in storage; anything unexpected is dropped. */
export function parseTotals(raw: unknown): DayTotals {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return {};
  const out: DayTotals = {};
  for (const [key, value] of Object.entries(raw)) {
    if (DAY_KEY.test(key) && typeof value === "number" && Number.isFinite(value) && value > 0) {
      out[key] = value;
    }
  }
  return out;
}
