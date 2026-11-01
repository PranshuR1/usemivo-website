import { describe, expect, it } from "vitest";
import { parseQueue } from "./study-sync";

describe("parseQueue", () => {
  const good = { id: "a", userId: "u", task: "Notes", started_at: "2026-10-29T10:00:00Z", ended_at: "2026-10-29T10:30:00Z" };
  it("keeps well-formed entries and drops anything else", () => {
    expect(parseQueue([good, { id: 1 }, null, "x", { ...good, userId: undefined }])).toEqual([good]);
  });
  it("treats a non-array as empty", () => {
    expect(parseQueue({})).toEqual([]);
    expect(parseQueue(null)).toEqual([]);
  });
});
