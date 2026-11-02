// Published Spot reviews, read on the server for /shop. Only buyers whose order was mailed can
// write one (checked in the database), so the page and its rating data show real reviews only.

import { ANON_KEY, SUPABASE_URL } from "./mivo-account";

export type PublicReview = {
  id: string;
  rating: number;
  body: string;
  display_name: string;
  created_at: string;
};

export type ReviewSummary = { count: number; average: number | null; reviews: PublicReview[] };

export const noReviews: ReviewSummary = { count: 0, average: null, reviews: [] };

// Never fails the page: until the reviews backend is switched on, or if Supabase is down, the
// shop renders without reviews.
export async function fetchPublicReviews(limit = 20): Promise<ReviewSummary> {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/spot_reviews_public`, {
      method: "POST",
      headers: { apikey: ANON_KEY, authorization: `Bearer ${ANON_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ input_limit: limit }),
      next: { revalidate: 600 },
    });
    if (!response.ok) return noReviews;
    return parseSummary(await response.json());
  } catch {
    return noReviews;
  }
}

export function parseSummary(raw: unknown): ReviewSummary {
  if (!raw || typeof raw !== "object") return noReviews;
  const data = raw as Record<string, unknown>;
  const reviews = Array.isArray(data.reviews)
    ? data.reviews.filter(
        (item): item is PublicReview =>
          !!item &&
          typeof item.rating === "number" &&
          item.rating >= 1 &&
          item.rating <= 5 &&
          typeof item.display_name === "string" &&
          typeof item.created_at === "string"
      )
    : [];
  const count = Number(data.count);
  const average = data.average === null ? null : Number(data.average);
  if (!Number.isFinite(count) || count < 1 || average === null || !Number.isFinite(average)) return noReviews;
  return { count, average, reviews };
}

// schema.org fields for a Product. Empty when there are no reviews: a rating is only added once
// real ones exist.
export function reviewJsonLd(summary: ReviewSummary, max = 5) {
  if (summary.count < 1 || summary.average === null) return {};
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.average.toFixed(1),
      reviewCount: summary.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: summary.reviews.slice(0, max).map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.display_name },
      datePublished: review.created_at.slice(0, 10),
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5, worstRating: 1 },
      ...(review.body ? { reviewBody: review.body } : {}),
    })),
  };
}
