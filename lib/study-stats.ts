// Numbers for the account's Study tab, worked out from the sessions saved to the account. Pure:
// callers pass sessions and a "now" and get plain values back, so it can be tested without a DOM.
//
// A day is the browser's local calendar day and counts toward the streak at DAY_THRESHOLD_MS, the
// same rule as the study page and the iPhone app.

import { addSession, dayKey, DAY_THRESHOLD_MS, streakDays, totalForDay, type DayTotals } from "./study-session";
import type { StudySession } from "./mivo-account";

type Span = Pick<StudySession, "started_at" | "ended_at"> & Partial<Pick<StudySession, "source" | "focused_seconds">>;

const DAY_MS = 24 * 60 * 60 * 1000;

/** The study time a session counts for: a computer session counts only its focused time. */
export function sessionMs(session: Span): number {
  const elapsed = Math.max(0, Date.parse(session.ended_at) - Date.parse(session.started_at));
  if (session.source !== "desktop") return elapsed;
  return Math.min(elapsed, Math.max(0, (session.focused_seconds ?? 0) * 1000));
}

/**
 * Study milliseconds per local day. A session that crosses midnight counts toward both days; a
 * computer session's focused time is split in proportion, the same as the iPhone and Mac apps.
 */
export function totalsFromSessions(sessions: Span[]): DayTotals {
  let totals: DayTotals = {};
  for (const session of sessions) {
    const start = Date.parse(session.started_at);
    const end = Date.parse(session.ended_at);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) continue;
    if (session.source !== "desktop") {
      totals = addSession(totals, start, end);
      continue;
    }
    const counted = sessionMs(session);
    const spread = addSession({}, start, end);
    const next: DayTotals = { ...totals };
    for (const [key, ms] of Object.entries(spread)) {
      next[key] = (next[key] ?? 0) + Math.round((counted * ms) / (end - start));
    }
    totals = next;
  }
  return totals;
}

function previousKey(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d - 1).getTime());
}

/** The longest run of consecutive days that each reached the threshold. */
export function longestStreak(totals: DayTotals): number {
  const days = new Set(Object.keys(totals).filter((key) => totals[key] >= DAY_THRESHOLD_MS));
  let best = 0;
  for (const key of days) {
    if (days.has(previousKey(key))) continue; // not the start of a run
    let length = 0;
    for (let cursor = key; days.has(cursor); ) {
      length += 1;
      const [y, m, d] = cursor.split("-").map(Number);
      cursor = dayKey(new Date(y, m - 1, d + 1).getTime());
    }
    best = Math.max(best, length);
  }
  return best;
}

export type DayBar = { key: string; weekday: string; ms: number; counted: boolean; today: boolean };

/** The last seven local days, oldest first, ending with today. */
export function weekBars(totals: DayTotals, now: number): DayBar[] {
  const bars: DayBar[] = [];
  const today = new Date(now);
  for (let back = 6; back >= 0; back -= 1) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - back);
    const key = dayKey(day.getTime());
    const ms = totals[key] ?? 0;
    bars.push({
      key,
      weekday: day.toLocaleDateString("en-US", { weekday: "short" }),
      ms,
      counted: ms >= DAY_THRESHOLD_MS,
      today: back === 0,
    });
  }
  return bars;
}

export type StudySummary = {
  streak: number;
  longest: number;
  todayMs: number;
  weekMs: number;
  totalMs: number;
  sessions: number;
  /** Seconds of scroll time the phone says today's sessions earned. */
  scrollEarnedTodaySeconds: number;
  /** Sessions filmed on the phone, as opposed to web timer sessions. */
  filmed: number;
};

export function summarize(sessions: StudySession[], now: number): StudySummary {
  const totals = totalsFromSessions(sessions);
  const todayKey = dayKey(now);
  let scrollEarnedTodaySeconds = 0;
  let filmed = 0;
  for (const session of sessions) {
    if (session.source === "ios") filmed += 1;
    if (dayKey(Date.parse(session.started_at)) === todayKey) scrollEarnedTodaySeconds += session.scroll_seconds_earned;
  }
  const weekMs = weekBars(totals, now).reduce((sum, bar) => sum + bar.ms, 0);
  return {
    streak: streakDays(totals, now),
    longest: longestStreak(totals),
    todayMs: totalForDay(totals, now),
    weekMs,
    totalMs: Object.values(totals).reduce((sum, ms) => sum + ms, 0),
    sessions: sessions.length,
    scrollEarnedTodaySeconds,
    filmed,
  };
}

export type DayGroup = { key: string; label: string; ms: number; sessions: StudySession[] };

/** Sessions grouped by the local day they started, newest day first. */
export function groupByDay(sessions: StudySession[], now: number): DayGroup[] {
  const groups = new Map<string, DayGroup>();
  const ordered = [...sessions].sort((a, b) => Date.parse(b.started_at) - Date.parse(a.started_at));
  for (const session of ordered) {
    const start = Date.parse(session.started_at);
    const key = dayKey(start);
    let group = groups.get(key);
    if (!group) {
      group = { key, label: dayLabel(start, now), ms: 0, sessions: [] };
      groups.set(key, group);
    }
    group.sessions.push(session);
    group.ms += sessionMs(session);
  }
  return [...groups.values()];
}

function dayLabel(ms: number, now: number): string {
  const diff = Math.round((Date.parse(new Date(dayKey(now)).toISOString()) - Date.parse(new Date(dayKey(ms)).toISOString())) / DAY_MS);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return new Date(ms).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

/** "25 min", "2 h", "2 h 5 min". */
export function formatSpan(ms: number): string {
  const minutes = Math.floor(Math.max(0, ms) / 60000);
  if (minutes < 1) return "Under a minute";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** Newest first, one row per id: a session already listed is not added again. */
export function withSession(sessions: StudySession[], added: StudySession): StudySession[] {
  if (sessions.some((existing) => existing.id === added.id)) return sessions;
  return [added, ...sessions].sort((a, b) => Date.parse(b.started_at) - Date.parse(a.started_at));
}

/** Per day, the larger of the two totals: the same session held in both places is not counted twice. */
export function mergeTotals(a: DayTotals, b: DayTotals): DayTotals {
  const merged: DayTotals = { ...a };
  for (const [key, ms] of Object.entries(b)) merged[key] = Math.max(merged[key] ?? 0, ms);
  return merged;
}
