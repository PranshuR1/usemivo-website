import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { SpotProducts } from "@/components/spot-products";
import { Faq } from "@/components/faq";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { comingSoonNote } from "@/data/content";
import { salesOpenAt, shopFaq, spotFacts, spotIncludes, spotProducts } from "@/data/shop";
import { fetchPublicReviews, reviewJsonLd, type ReviewSummary } from "@/lib/spot-reviews";

export const metadata: Metadata = {
  title: "Shop Mivo Spots — Mivo",
  description:
    "Mivo Spots are small NFC stickers. Tap one with your iPhone to start a Pause or Focus session. $14.99 each, or packs of 3, 5 and 10 from $34.99 with free shipping. Pick where each Spot goes.",
  alternates: { canonical: "/shop" },
};

const steps = [
  { title: "Stick it down", body: "Put it where you reach for your phone: the desk, the nightstand, the car." },
  { title: "Tap to claim", body: "Tap it with your iPhone. The first tap connects that Spot to your Mivo account." },
  { title: "Tap to start", body: "Every tap after that starts the setup you picked. Tap again to end it." },
];

// Reviews are re-read at most every 10 minutes.
export const revalidate = 600;

// Every pack holds the same Spot, so each listing carries the same reviews.
const productJsonLd = (reviews: ReviewSummary) => spotProducts.map((product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.blurb,
  brand: { "@type": "Brand", name: "Mivo" },
  offers: {
    "@type": "Offer",
    url: "https://usemivo.app/shop",
    price: product.price.toFixed(2),
    priceCurrency: "USD",
    availability: salesOpenAt === null ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: product.shipping.toFixed(2), currency: "USD" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
    },
  },
  ...reviewJsonLd(reviews),
}));

const reviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5 text-accent-deep" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} className={n <= Math.round(rating) ? "fill-current" : "opacity-30"} aria-hidden />
      ))}
    </span>
  );
}

function Reviews({ summary }: { summary: ReviewSummary }) {
  return (
    <section id="reviews" className="mt-24">
      <h2 className="font-display text-3xl italic text-ink">Reviews</h2>
      {summary.count > 0 && summary.average !== null ? (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Stars rating={summary.average} size={20} />
            <p className="text-sm text-ink-body">
              <span className="font-semibold text-ink">{summary.average.toFixed(1)}</span> out of 5 ·{" "}
              {summary.count} {summary.count === 1 ? "review" : "reviews"} from buyers
            </p>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {summary.reviews.map((review) => (
              <li key={review.id} className="rounded-3xl border border-ink/10 bg-surface p-6">
                <Stars rating={review.rating} />
                {review.body && (
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink-body">{review.body}</p>
                )}
                <p className="mt-4 text-sm text-ink-muted">
                  <span className="font-medium text-ink">{review.display_name}</span> · {reviewDate(review.created_at)}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-body">No reviews yet.</p>
      )}
      <p className="mt-6 text-sm text-ink-muted">
        Only people who bought Spots can review them. Bought some? Rate them from the Orders tab in{" "}
        <Link href="/account#orders" className="underline underline-offset-4 hover:text-ink">
          your account
        </Link>
        .
      </p>
    </section>
  );
}

export default async function ShopPage() {
  const reviews = await fetchPublicReviews();

  return (
    <PageShell
      eyebrow="Shop"
      title="Tap a place to start it."
      intro="Mivo Spots are small NFC stickers for your desk, your bedside or the car. Tap one with your iPhone and that place's setup begins."
    >
      <div className="mt-6">
        <ComingSoon>{comingSoonNote}</ComingSoon>
      </div>

      <section className="mt-12">
        <SpotProducts />
        <p className="mt-5 text-xs leading-relaxed text-ink-muted">
          Prices are in US dollars. Sales tax, where it applies, is added at checkout. Payment is handled by
          Stripe, so we never see your card number.
        </p>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl italic text-ink">What you get</h2>
          <ul className="mt-6 space-y-4">
            {spotIncludes.map((line) => (
              <li key={line} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-body">
                <Check size={16} className="mt-1 shrink-0 text-accent" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <dl className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-surface px-8">
          {spotFacts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
              <dt className="w-28 shrink-0 text-sm text-ink-muted">{fact.label}</dt>
              <dd className="text-sm text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl italic text-ink">How a Spot works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-ink/10 bg-surface p-8">
              <span className="text-xs font-semibold tracking-[0.2em] text-accent-deep">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Reviews summary={reviews} />

      <section className="mt-24 max-w-3xl">
        <h2 className="font-display text-3xl italic text-ink">Questions</h2>
        <div className="mt-6">
          <Faq items={shopFaq} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/shipping-returns" variant="secondary" showArrow={false}>
            Shipping &amp; returns
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" showArrow={false}>
            See all pricing
          </ButtonLink>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(reviews)).replace(/</g, "\\u003c") }}
      />
    </PageShell>
  );
}
