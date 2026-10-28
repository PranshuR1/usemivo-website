import { describe, expect, it } from "vitest";
import {
  DAY_THRESHOLD_MS,
  addSession,
  dayKey,
  elapsedMs,
  formatClock,
  formatMinutes,
  miloReceiptLine,
  parseTotals,
  streakDays,
  totalForDay,
  wholeMinutes,
} from "./study-session";

const MIN = 60 * 1000;
// Local-time constructor, so the tests hold in any timezone.
const at = (y: number, mo: number, d: number, h = 12, mi = 0) =>
  new Date(y, mo - 1, d, h, mi).getTime();

describe("elapsedMs", () => {
  it("is the timestamp difference, however long the page was suspended", () => {
    expect(elapsedMs(1000, 1000 + 3 * 60 * MIN)).toBe(3 * 60 * MIN);
  });
  it("never goes negative if the clock moves back", () => {
    expect(elapsedMs(5000, 1000)).toBe(0);
  });
});

describe("addSession", () => {
  it("adds to the day it happened on and does not mutate the input", () => {
    const before = {};
    const after = addSession(before, at(2026, 10, 23, 9), at(2026, 10, 23, 9, 25));
    expect(after).toEqual({ "2026-10-23": 25 * MIN });
    expect(before).toEqual({});
  });
  it("accumulates several sessions on one day", () => {
    let t = addSession({}, at(2026, 10, 23, 9), at(2026, 10, 23, 9, 6));
    t = addSession(t, at(2026, 10, 23, 15), at(2026, 10, 23, 15, 7));
    expect(t["2026-10-23"]).toBe(13 * MIN);
  });
  it("splits a session that crosses midnight", () => {
    const t = addSession({}, at(2026, 10, 23, 23, 50), at(2026, 10, 24, 0, 20));
    expect(t["2026-10-23"]).toBe(10 * MIN);
    expect(t["2026-10-24"]).toBe(20 * MIN);
  });
  it("ignores an empty or reversed span", () => {
    expect(addSession({}, 5000, 5000)).toEqual({});
    expect(addSession({}, 9000, 5000)).toEqual({});
  });
});

describe("streakDays", () => {
  const now = at(2026, 10, 23, 18);
  const full = DAY_THRESHOLD_MS;

  it("is 0 with no history", () => {
    expect(streakDays({}, now)).toBe(0);
  });
  it("counts a day at exactly the threshold, not below it", () => {
    expect(streakDays({ "2026-10-23": full }, now)).toBe(1);
    expect(streakDays({ "2026-10-23": full - 1 }, now)).toBe(0);
  });
  it("sums several short sessions into one qualifying day", () => {
    let t = addSession({}, at(2026, 10, 23, 9), at(2026, 10, 23, 9, 6));
    t = addSession(t, at(2026, 10, 23, 15), at(2026, 10, 23, 15, 4));
    expect(streakDays(t, now)).toBe(1);
  });
  it("counts consecutive days including today", () => {
    const t = { "2026-10-21": full, "2026-10-22": full, "2026-10-23": full };
    expect(streakDays(t, now)).toBe(3);
  });
  it("keeps yesterday's streak while today hasn't reached the threshold", () => {
    const t = { "2026-10-21": full, "2026-10-22": full, "2026-10-23": 2 * MIN };
    expect(streakDays(t, now)).toBe(2);
  });
  it("is 0 after a missed day", () => {
    const t = { "2026-10-20": full, "2026-10-21": full };
    expect(streakDays(t, now)).toBe(0);
  });
  it("stops at a gap in the middle", () => {
    const t = { "2026-10-19": full, "2026-10-21": full, "2026-10-22": full };
    expect(streakDays(t, now)).toBe(2);
  });
  it("walks across month and year boundaries", () => {
    const t = { "2026-12-31": full, "2027-01-01": full };
    expect(streakDays(t, at(2027, 1, 1, 8))).toBe(2);
    expect(streakDays({ "2026-02-28": full, "2026-03-01": full }, at(2026, 3, 1))).toBe(2);
    expect(streakDays({ "2028-02-28": full, "2028-03-01": full }, at(2028, 3, 1))).toBe(1);
    expect(streakDays({ "2028-02-29": full, "2028-03-01": full }, at(2028, 3, 1))).toBe(2);
  });
  it("walks across a DST change", () => {
    // Late March / early November cover both US and EU transitions.
    const days: Record<string, number> = {};
    for (let d = 0; d < 10; d++) days[dayKey(new Date(2026, 2, 20 + d).getTime())] = full;
    expect(streakDays(days, at(2026, 3, 29, 20))).toBe(10);
    const nov: Record<string, number> = {};
    for (let d = 0; d < 10; d++) nov[dayKey(new Date(2026, 9, 28 + d).getTime())] = full;
    expect(streakDays(nov, at(2026, 11, 6, 20))).toBe(10);
  });
});

describe("totalForDay", () => {
  it("is 0 for an empty day", () => {
    expect(totalForDay({}, at(2026, 10, 23))).toBe(0);
  });
});

describe("formatting", () => {
  it("formats the clock", () => {
    expect(formatClock(0)).toBe("00:00");
    expect(formatClock(247_000)).toBe("04:07");
    expect(formatClock(3_729_000)).toBe("1:02:09");
    expect(formatClock(-5)).toBe("00:00");
  });
  it("rounds minutes down", () => {
    expect(wholeMinutes(59_999)).toBe(0);
    expect(wholeMinutes(25 * MIN + 59_000)).toBe(25);
  });
  it("words minutes plainly", () => {
    expect(formatMinutes(30_000)).toBe("Under a minute");
    expect(formatMinutes(MIN)).toBe("1 minute");
    expect(formatMinutes(25 * MIN)).toBe("25 minutes");
  });
});

describe("parseTotals", () => {
  it("keeps valid entries", () => {
    expect(parseTotals({ "2026-10-23": 600000 })).toEqual({ "2026-10-23": 600000 });
  });
  it("drops bad keys and values", () => {
    expect(
      parseTotals({ today: 5, "2026-10-23": "x", "2026-10-22": -1, "2026-10-21": NaN, "2026-10-20": 1 }),
    ).toEqual({ "2026-10-20": 1 });
  });
  it("returns empty for non-objects", () => {
    expect(parseTotals(null)).toEqual({});
    expect(parseTotals([1, 2])).toEqual({});
    expect(parseTotals("x")).toEqual({});
  });
});

describe("miloReceiptLine", () => {
  it("says what is left while the day has not reached the block", () => {
    expect(miloReceiptLine(7 * MIN, 0)).toContain("3 more minutes");
    expect(miloReceiptLine(9 * MIN + 30_000, 0)).toContain("1 more minute ");
  });
  it("is the same for the same inputs", () => {
    expect(miloReceiptLine(12 * MIN, 3)).toBe(miloReceiptLine(12 * MIN, 3));
    expect(miloReceiptLine(12 * MIN, 3)).toContain("3 days in a row");
  });
  it("counts a single block of ten minutes", () => {
    expect(miloReceiptLine(10 * MIN, 1)).toContain("That counts");
  });
});
