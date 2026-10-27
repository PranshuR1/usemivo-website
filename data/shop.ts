import { comingSoonNote } from "@/data/content";

// Spots go on sale on this date (Georgia, EDT). Before it, every Buy button says so.
export const salesOpenAt = new Date("2026-11-01T00:00:00-04:00");

// Stripe Payment Links. Leave a link empty and its Buy button says checkout is opening soon.
// Create the links in the Stripe Dashboard (Payment links), then paste each buy.stripe.com URL here.
export const spotProducts = [
  {
    id: "single",
    name: "Mivo Spot",
    kicker: "One Spot",
    blurb: "One Spot for the place you reach for your phone the most.",
    price: 14.99,
    shipping: 2.99,
    spots: 1,
    badge: null,
    checkoutUrl: "https://buy.stripe.com/aFafZjgPc4Q3cTj8yNgQE00",
  },
  {
    id: "pack",
    name: "Mivo Spot 3-Pack",
    kicker: "Desk, bedside, car",
    blurb: "Three Spots, so the places you scroll most each get their own.",
    price: 34.99,
    shipping: 0,
    spots: 3,
    badge: "Free shipping",
    checkoutUrl: "https://buy.stripe.com/eVq5kFeH4civ06x9CRgQE01",
  },
] as const;

export const spotIncludes = [
  "Each Spot arrives ready to use. Nothing to write or set up on the tag.",
  "Tap it with your iPhone to claim it in the Mivo app, then pick what it starts: Pause Mode, Focus Mode, Intention Check or Awareness Mode.",
  "A Mivo Spot card with a quick-start guide.",
];

export const spotFacts = [
  { label: "Works with", value: "iPhone XS or newer, with the Mivo app" },
  { label: "Ships to", value: "US addresses" },
  { label: "Ships by", value: "USPS First-Class Mail, within 3 business days" },
  { label: "Tracking", value: "None on single orders. Letters are not tracked." },
  { label: "Returns", value: "30 days. See Shipping & Returns." },
];

export const plusNote = comingSoonNote;

export const plusPlans = [
  { id: "monthly", name: "Monthly", price: 6.99, period: "per month", note: "Cancel any time", badge: null },
  { id: "annual", name: "Yearly", price: 39.99, period: "per year", note: "7-day free trial", badge: "Best value" },
  { id: "lifetime", name: "Lifetime", price: 79.99, period: "one time", note: "Pay once, keep it", badge: null },
] as const;

export const plusBenefits = [
  "Replay mode: after your reels, only ones you've seen",
  "Instagram inside Mivo, with dull mode and a daily time limit",
  "Mivo Clear and Mivo Still",
  "Weekly experiments and your 30-day forecast",
  "Your attention receipt, every day",
];

export const plusFree = "The 5-second pause on your protected apps stays free, and so do Milo and Mivo Spots.";

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
    a: "The 5-second pause on your protected apps, Milo and Mivo Spots. Mivo Plus unlocks everything beyond the basic pause.",
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
  {
    q: "Do I need a Spot to use Mivo?",
    a: "No. Spots are an optional way to start a Pause or Focus session by tapping a place. Mivo works without them.",
  },
  {
    q: "Does a Spot need a subscription?",
    a: "No. A Spot works with a free Mivo account.",
  },
];

export const shopFaq = [
  {
    q: "Which phones work with a Spot?",
    a: "iPhones with NFC, which means iPhone XS or newer, running the latest Mivo app. Mivo is an iPhone app, so Spots are for iPhones.",
  },
  {
    q: "Do I have to program it?",
    a: "No. We prepare every Spot before it ships. You tap it with your iPhone, sign in to Mivo if you have not, and the Spot is yours.",
  },
  {
    q: "What if someone else taps it?",
    a: "Once you claim a Spot it belongs to your account. A tag only holds its Spot number, never your settings, apps or data.",
  },
  {
    q: "Where can I stick it?",
    a: "A desk, a nightstand, a car dash, a bathroom shelf. NFC does not work well directly on bare metal, so use a non-metal surface.",
  },
  {
    q: "How long does shipping take?",
    a: "We mail orders within 3 business days by USPS First-Class Mail. Delivery usually takes a few more days. We ship to US addresses only for now.",
  },
  {
    q: "Is sales tax included?",
    a: "Sales tax is added at checkout where it is required, and shown before you pay.",
  },
  {
    q: "What if a Spot does not scan?",
    a: "Email us and we will send a replacement or refund you. See Shipping & Returns.",
  },
];
