import { describe, expect, it } from "vitest";
import { noReviews, parseSummary, reviewJsonLd } from "./spot-reviews";

const review = { id: "abcd1234", rating: 4, body: "Works on my desk.", display_name: "Sam R.", created_at: "2026-11-05T10:00:00Z" };

describe("parseSummary", () => {
  it("treats no reviews, bad data and a missing backend as none", () => {
    expect(parseSummary({ count: 0, average: null, reviews: [] })).toEqual(noReviews);
    expect(parseSummary(null)).toEqual(noReviews);
    expect(parseSummary({ message: "Could not find the function" })).toEqual(noReviews);
  });

  it("keeps valid reviews and drops malformed ones", () => {
    const summary = parseSummary({ count: 2, average: "4.50", reviews: [review, { rating: 9, display_name: "x", created_at: "" }] });
    expect(summary.count).toBe(2);
    expect(summary.average).toBe(4.5);
    expect(summary.reviews).toEqual([review]);
  });
});

describe("reviewJsonLd", () => {
  it("adds nothing without reviews", () => {
    expect(reviewJsonLd(noReviews)).toEqual({});
  });

  it("builds the rating and review fields from real reviews", () => {
    const ld = reviewJsonLd({ count: 3, average: 4.666, reviews: [review, { ...review, body: "" }] }) as { aggregateRating: object; review: Record<string, unknown>[] };
    expect(ld.aggregateRating).toMatchObject({ ratingValue: "4.7", reviewCount: 3 });
    expect(ld.review).toHaveLength(2);
    expect(ld.review[0]).toMatchObject({ author: { name: "Sam R." }, datePublished: "2026-11-05", reviewBody: "Works on my desk." });
    expect(ld.review[1].reviewBody).toBeUndefined();
  });
});
