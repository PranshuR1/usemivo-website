import { blankPlace, spotPlaces } from "../data/spot-places";

// Which place each Spot in an order is going to. Stripe Payment Links accept a client_reference_id
// of letters, digits, dashes and underscores (200 characters at most), so the picks travel in it:
//
//   [<account id>_]p_<place>_<place>...     e.g. 3f2a...-uuid_p_desk_blank_car
//
// The stripe-spot-orders Edge Function in the app repo reads this back. An order with no picks keeps
// the older reference: just the account id, or nothing.

const known = new Set<string>(spotPlaces.map((place) => place.key));

export function spotPicksReference(userId: string | undefined, picks: readonly string[]): string | null {
  const clean = picks.map((key) => (known.has(key) ? key : blankPlace));
  const parts: string[] = [];
  if (userId) parts.push(userId);
  if (clean.some((key) => key !== blankPlace)) parts.push(["p", ...clean].join("_"));
  return parts.length ? parts.join("_") : null;
}

export function withReference(href: string, reference: string | null): string {
  return reference ? `${href}${href.includes("?") ? "&" : "?"}client_reference_id=${reference}` : href;
}

// How many Spots in the pack still have no pick. An empty string means the buyer has not chosen yet;
// "blank" ("Not sure yet") is a choice, so it counts as picked.
export function missingPicks(picks: readonly string[]): number {
  return picks.filter((key) => !known.has(key)).length;
}
