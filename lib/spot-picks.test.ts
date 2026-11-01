import { describe, expect, it } from "vitest";
import { missingPicks, spotPicksReference, withReference } from "./spot-picks";

const userId = "3f2a9c10-1b2c-4d3e-8f40-5a6b7c8d9e0f";

describe("spotPicksReference", () => {
  it("is empty with no account and no picks", () => {
    expect(spotPicksReference(undefined, ["blank", "blank"])).toBeNull();
    expect(spotPicksReference(undefined, [])).toBeNull();
  });
  it("keeps the older account-only reference when nothing is picked", () => {
    expect(spotPicksReference(userId, ["blank", "blank", "blank"])).toBe(userId);
  });
  it("sends the picks in Spot order, blanks included", () => {
    expect(spotPicksReference(undefined, ["desk", "blank", "car"])).toBe("p_desk_blank_car");
    expect(spotPicksReference(userId, ["desk", "blank", "car"])).toBe(`${userId}_p_desk_blank_car`);
  });
  it("turns an unknown place into blank", () => {
    expect(spotPicksReference(undefined, ["desk", "attic"])).toBe("p_desk_blank");
  });
  it("stays within Stripe's 200 characters and its allowed characters for ten Spots", () => {
    const reference = spotPicksReference(userId, Array(10).fill("bathroom"))!;
    expect(reference.length).toBeLessThanOrEqual(200);
    expect(reference).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});

describe("withReference", () => {
  it("leaves the link alone without a reference", () => {
    expect(withReference("https://buy.stripe.com/x", null)).toBe("https://buy.stripe.com/x");
  });
  it("appends the reference as a query parameter", () => {
    expect(withReference("https://buy.stripe.com/x", "p_desk")).toBe("https://buy.stripe.com/x?client_reference_id=p_desk");
    expect(withReference("https://buy.stripe.com/x?a=1", "p_desk")).toBe("https://buy.stripe.com/x?a=1&client_reference_id=p_desk");
  });
});

describe("missingPicks", () => {
  it("counts Spots with no choice yet", () => {
    expect(missingPicks(["", "", ""])).toBe(3);
    expect(missingPicks(["desk", "", "car"])).toBe(1);
  });
  it("counts Not sure yet as a choice", () => {
    expect(missingPicks(["blank", "desk"])).toBe(0);
  });
  it("treats an unknown place as not chosen", () => {
    expect(missingPicks(["attic"])).toBe(1);
  });
});
