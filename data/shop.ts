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

export const plusFree = "The basic pause and Milo stay free. Your starting point and commitment check-ins join them in the next update.";

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
    q: "What stays free?",
    a: "The basic pause and Milo stay free. Your starting point, commitments and completion check-ins are free features in the next update. Plus includes Clear, Still and weekly experiments.",
  },
  {
    q: "How do I buy Mivo Plus?",
    a: "In the Mivo app, with your Apple ID. You can manage or cancel a subscription in Settings > Apple ID > Subscriptions. Apple handles billing and refunds for Plus.",
  },
  {
    q: "Is there a free trial?",
    a: "The yearly plan starts with a 7-day free trial. Cancel at least 24 hours before it ends and you are not charged.",
  },
  {
    q: "What does Lifetime mean?",
    a: "One payment, and Mivo Plus stays unlocked on your Apple ID. It does not renew.",
  },
];
