import { comingSoonNote } from "@/data/content";

// Spots go on sale on this date (Georgia, EDT). Before it, every Buy button says so.
// null pauses sales: every Buy button shows comingSoonNote instead.
// Paused on 2026-11-02 at the user's request until the App Store app can claim Spots
// (it was open from 2026-10-27). To reopen, set a date here again.
export const salesOpenAt: Date | null = null;

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
  {
    id: "pack5",
    name: "Mivo Spot 5-Pack",
    kicker: "A home's worth",
    blurb: "Five Spots for every room you scroll in, at $11.00 each.",
    price: 54.99,
    shipping: 0,
    spots: 5,
    badge: "Free shipping",
    checkoutUrl: "https://buy.stripe.com/eVqcN7eH4ber8D302hgQE02",
  },
  {
    id: "pack10",
    name: "Mivo Spot 10-Pack",
    kicker: "Share them out",
    blurb: "Ten Spots for a whole home, a dorm floor or a team, at $10.00 each.",
    price: 99.99,
    shipping: 0,
    spots: 10,
    badge: "Best price",
    checkoutUrl: "https://buy.stripe.com/fZu4gB42q96jg5v4ixgQE03",
  },
] as const;

export { blankPlace, spotPlaces } from "./spot-places";

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

export const plusFree = "The basic pause, Milo and Spot features stay free. Your starting point and commitment check-ins join them in the next update. Physical Spots are sold separately.";

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
    a: "The basic pause, Milo and Spot features stay free. Your starting point, commitments and completion check-ins are free features in the next update. Plus includes Clear, Still and weekly experiments. Physical Spots are sold separately.",
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
    q: "Can I choose where each Spot goes?",
    a: "Yes. Before you check out, pick a place for each Spot, like Desk, Bedside or Car, or leave it as Not sure yet. We note your picks on your order and on the card. A Spot works anywhere, so a pick only helps you tell them apart.",
  },
  {
    q: "Can I choose a Spot's code?",
    a: "No. Every Spot has its own code, and we assign it when we pack your order. The code stays private until the Spot is in your hands, so nobody else can claim it first.",
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
