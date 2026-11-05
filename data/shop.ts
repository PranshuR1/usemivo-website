import { comingSoonNote } from "@/data/content";

// Mivo Plus pricing. Plus is bought in the iPhone app through Apple.
export const plusNote = comingSoonNote;

export const plusPlans = [
  { id: "monthly", name: "Monthly", price: 9.99, period: "per month", note: "Cancel any time", badge: null },
  { id: "annual", name: "Yearly", price: 49.99, period: "per year", note: "7-day free trial", badge: "Best value" },
  { id: "lifetime", name: "Lifetime", price: 99.99, period: "one time", note: "Pay once, keep it", badge: null },
] as const;

export const plusBenefits = [
  "Replay mode: after your reels, only ones you've seen",
  "Instagram inside Mivo, with dull mode and a daily time limit",
  "Messages and search with endless feeds filtered out inside Mivo Clear",
  "Quiet breaks with Mivo Still",
  "One weekly experiment: try, review, keep or adjust",
  "Your attention receipt, every day",
];

export const freeToday = [
  "Screen-time estimates and pattern insights on iPhone",
  "Intentional pauses before opening tracked apps",
  "The web study timer, session receipts and streaks",
  "Mivo for Mac and Windows with focus tracking",
];

export const plusFree = "Download Mivo and use the web study timer for free today. Mivo Plus is planned for the next iPhone update.";

export const plusDisclosure =
  "Payment is charged to your Apple ID at confirmation. Subscriptions renew automatically unless cancelled at least 24 hours before the period ends, and you can manage or cancel them in Settings > Apple ID > Subscriptions. Lifetime is a one-time purchase.";

export function usd(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function yearlySavingsPercent() {
  const monthly = plusPlans.find((p) => p.id === "monthly")!.price;
  const annual = plusPlans.find((p) => p.id === "annual")!.price;
  return Math.round(((monthly * 12 - annual) / (monthly * 12)) * 100);
}

export function perMonthOfYearly() {
  return usd(plusPlans.find((p) => p.id === "annual")!.price / 12);
}

export const pricingFaq = [
  {
    q: "What can I use for free today?",
    a: "The current iPhone app and Mac app are free to download. You can also use the web study timer, save session receipts and build a streak without an account. Sign in to sync your sessions. Plus pricing applies to the upcoming iPhone update, not the current release.",
  },
  {
    q: "Can I buy Mivo Plus now?",
    a: "Not yet. Plus is planned for Mivo 3.1. Once it launches, you will be able to purchase it inside the iPhone app with your Apple ID. You will be able to manage or cancel a subscription in Settings > Apple ID > Subscriptions.",
  },
  {
    q: "Is there a free trial?",
    a: "A 7-day free trial is planned for the yearly Plus plan when it launches. Cancel at least 24 hours before the trial ends to avoid being charged. The web study timer is free without a trial.",
  },
  {
    q: "What does Lifetime mean?",
    a: "One payment, and Mivo Plus stays unlocked on your Apple ID. It does not renew.",
  },
];
