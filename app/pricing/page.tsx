import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PlusPlans } from "@/components/plus-plans";
import { SpotProducts } from "@/components/spot-products";
import { Faq } from "@/components/faq";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { plusBenefits, plusDisclosure, plusFree, plusNote, pricingFaq } from "@/data/shop";

export const metadata: Metadata = {
  title: "Pricing — Mivo",
  description:
    "Mivo is free to start. Mivo Plus is $9.99 a month, $49.99 a year or $99.99 once. Mivo Spots are $14.99 each or $34.99 for three.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Free to start. Honest about the rest."
      intro="The basic pause is free. Mivo Plus unlocks everything beyond it. Spots are a one-time purchase for the places you scroll most."
    >
      <section className="mt-16">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-display text-3xl italic text-ink">Mivo Plus</h2>
          <ComingSoon>{plusNote}</ComingSoon>
        </div>
        <div className="mt-8">
          <PlusPlans />
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {plusBenefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-body">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              {benefit}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[15px] text-ink">{plusFree}</p>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-ink-muted">{plusDisclosure}</p>
      </section>

      <section className="mt-24">
        <h2 className="font-display text-3xl italic text-ink">Mivo Spots</h2>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-body">
          Small NFC stickers. Tap one with your iPhone to start a Pause or Focus session.
        </p>
        <div className="mt-8">
          <SpotProducts />
        </div>
        <div className="mt-6">
          <ButtonLink href="/shop" variant="secondary">
            More about Spots
          </ButtonLink>
        </div>
      </section>

      <section className="mt-24 max-w-3xl">
        <h2 className="font-display text-3xl italic text-ink">Questions</h2>
        <div className="mt-6">
          <Faq items={pricingFaq} />
        </div>
      </section>
    </PageShell>
  );
}
