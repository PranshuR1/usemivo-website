import { describe, expect, it } from "vitest";
import type { StudySession } from "./mivo-account";
import { formatSpan, groupByDay, longestStreak, mergeTotals, summarize, totalsFromSessions, weekBars, withSession } from "./study-stats";

const MIN = 60 * 1000;
// Local-time constructor, so the tests hold in any timezone.
const at = (y: number, mo: number, d: number, h = 12, mi = 0) => new Date(y, mo - 1, d, h, mi).getTime();

let counter = 0;
function session(start: number, minutes: number, extra: Partial<StudySession> = {}): StudySession {
  counter += 1;
  return {
    id: `s-${counter}`,
    task: "Notes",
    started_at: new Date(start).toISOString(),
    ended_at: new Date(start + minutes * MIN).toISOString(),
    recorded_seconds: 0,
    scroll_seconds_earned: 0,
    source: "web",
    ...extra,
  };
}

describe("totalsFromSessions", () => {
  it("counts only the focused time of a computer session", () => {
    const totals = totalsFromSessions([session(at(2026, 11, 3, 9), 40, { source: "desktop", focused_seconds: 25 * 60 })]);
    expect(totals["2026-11-03"]).toBe(25 * MIN);
  });
  it("splits a computer session's focused time across midnight in proportion", () => {
    const totals = totalsFromSessions([session(at(2026, 11, 2, 23), 120, { source: "desktop", focused_seconds: 60 * 60 })]);
    expect(totals["2026-11-02"]).toBe(30 * MIN);
    expect(totals["2026-11-03"]).toBe(30 * MIN);
  });
  it("treats a computer session with no focused time as nothing studied", () => {
    const totals = totalsFromSessions([session(at(2026, 11, 3, 9), 40, { source: "desktop", focused_seconds: null })]);
    expect(totals["2026-11-03"] ?? 0).toBe(0);
  });
  it("adds sessions on the same day", () => {
    const totals = totalsFromSessions([session(at(2026, 10, 28, 9), 20), session(at(2026, 10, 28, 15), 15)]);
    expect(totals["2026-10-28"]).toBe(35 * MIN);
  });
  it("splits a session at midnight", () => {
    const totals = totalsFromSessions([session(at(2026, 10, 28, 23, 50), 20)]);
    expect(totals["2026-10-28"]).toBe(10 * MIN);
    expect(totals["2026-10-29"]).toBe(10 * MIN);
  });
  it("ignores a session whose end is not after its start", () => {
    expect(totalsFromSessions([session(at(2026, 10, 28), 0)])).toEqual({});
  });
});

describe("summarize", () => {
  const now = at(2026, 10, 29, 18);
  const sessions = [
    session(at(2026, 10, 29, 9), 30, { source: "ios", recorded_seconds: 1800, scroll_seconds_earned: 600 }),
    session(at(2026, 10, 28, 9), 12),
    session(at(2026, 10, 27, 9), 4),
  ];
  it("counts the streak from days that reached 10 minutes", () => {
    const summary = summarize(sessions, now);
    expect(summary.streak).toBe(2); // the 4-minute day breaks it
    expect(summary.todayMs).toBe(30 * MIN);
    expect(summary.totalMs).toBe(46 * MIN);
    expect(summary.sessions).toBe(3);
    expect(summary.filmed).toBe(1);
  });
  it("adds up only today's scroll time", () => {
    expect(summarize(sessions, now).scrollEarnedTodaySeconds).toBe(600);
  });
  it("does not read an unfinished day as a broken streak", () => {
    const morning = at(2026, 10, 29, 8);
    expect(summarize([session(at(2026, 10, 28, 9), 15), session(at(2026, 10, 27, 9), 15)], morning).streak).toBe(2);
  });
});

describe("longestStreak", () => {
  it("finds the best run, not the current one", () => {
    const sessions = [1, 2, 3, 4].map((d) => session(at(2026, 10, d, 9), 10)).concat([session(at(2026, 10, 10, 9), 10)]);
    expect(longestStreak(totalsFromSessions(sessions))).toBe(4);
  });
  it("is zero with nothing", () => {
    expect(longestStreak({})).toBe(0);
  });
});

describe("weekBars", () => {
  it("returns seven days ending today", () => {
    const now = at(2026, 10, 29, 18);
    const bars = weekBars(totalsFromSessions([session(at(2026, 10, 29, 9), 20)]), now);
    expect(bars).toHaveLength(7);
    expect(bars[0].key).toBe("2026-10-23");
    expect(bars[6]).toMatchObject({ key: "2026-10-29", today: true, counted: true });
    expect(bars[5].ms).toBe(0);
  });
});

describe("groupByDay", () => {
  it("groups newest first and labels today and yesterday", () => {
    const now = at(2026, 10, 29, 18);
    const groups = groupByDay(
      [session(at(2026, 10, 27, 9), 10), session(at(2026, 10, 29, 9), 10), session(at(2026, 10, 29, 14), 5), session(at(2026, 10, 28, 9), 10)],
      now
    );
    expect(groups.map((g) => g.label.split(",")[0])).toEqual(["Today", "Yesterday", "Tuesday"]);
    expect(groups[0].sessions).toHaveLength(2);
    expect(groups[0].ms).toBe(15 * MIN);
  });
});

describe("formatSpan", () => {
  it("reads naturally", () => {
    expect(formatSpan(30 * 1000)).toBe("Under a minute");
    expect(formatSpan(25 * MIN)).toBe("25 min");
    expect(formatSpan(120 * MIN)).toBe("2 h");
    expect(formatSpan(125 * MIN)).toBe("2 h 5 min");
  });
});

describe("withSession", () => {
  it("adds a session once and keeps newest first", () => {
    const older = session(at(2026, 10, 27, 9), 10);
    const newer = session(at(2026, 10, 28, 9), 10);
    const once = withSession([older], newer);
    expect(once.map((s) => s.id)).toEqual([newer.id, older.id]);
    expect(withSession(once, newer)).toBe(once);
  });
});

describe("mergeTotals", () => {
  it("takes the larger total per day and keeps days only one side has", () => {
    expect(mergeTotals({ "2026-10-28": 10 * MIN, "2026-10-27": 5 * MIN }, { "2026-10-28": 25 * MIN, "2026-10-29": 8 * MIN })).toEqual({
      "2026-10-27": 5 * MIN,
      "2026-10-28": 25 * MIN,
      "2026-10-29": 8 * MIN,
    });
  });
});
