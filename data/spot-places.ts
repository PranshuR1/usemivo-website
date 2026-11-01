// Where a Spot is going. The buyer picks one per Spot before checkout; the pick rides to Stripe in
// the Payment Link's client_reference_id (see lib/spot-picks.ts) and is listed in the order email.
// Keys are lowercase letters only, and the stripe-spot-orders function in the app repo carries the
// same list, so change both together. "blank" means no pick: that Spot is not labelled.
export const blankPlace = "blank";
export const spotPlaces = [
  { key: blankPlace, label: "Not sure yet" },
  { key: "desk", label: "Desk" },
  { key: "bedside", label: "Bedside" },
  { key: "couch", label: "Couch" },
  { key: "car", label: "Car" },
  { key: "bathroom", label: "Bathroom" },
  { key: "kitchen", label: "Kitchen" },
  { key: "gym", label: "Gym" },
  { key: "office", label: "Office" },
] as const;
