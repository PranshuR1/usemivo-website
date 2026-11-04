import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { PlusPlans } from "@/components/plus-plans";
import { Faq } from "@/components/faq";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { appStoreUrl } from "@/data/content";
import { freeToday, plusBenefits, plusDisclosure, plusFree, plusNote, pricingFaq } from "@/data/shop";

export const metadata: Metadata = {
  title: "Pricing — Mivo",
  description:
    "See what's free today and the planned Mivo Plus pricing for the next iPhone update: $9.99 a month, $49.99 a year or $99.99 once.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <PageShell
      eyebrow="Pricing"
      title="Start free. Know what's next."
      intro={plusFree}
    >
      <section className="mt-12 rounded-3xl border border-kept/25 bg-surface p-6 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-kept">Available today</p>
        <h2 className="mt-3 font-display text-4xl text-ink">A little more intention. Free.</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {freeToday.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-body"><Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-kept" />{item}</li>)}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={appStoreUrl}>Download for iPhone</ButtonLink>
          <ButtonLink href="/study" variant="secondary">Try the free study timer</ButtonLink>
        </div>
      </section>
      <section className="mt-16" aria-labelledby="plus-heading">
        <div className="flex flex-wrap items-center gap-4">
          <h2 id="plus-heading" className="font-display text-3xl italic text-ink">Coming next: Mivo Plus</h2>
          <ComingSoon>{plusNote}</ComingSoon>
        </div>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-body">Planned pricing for the next iPhone update. Plus is not available to purchase yet. The basic pause will stay free; Milo, your starting point and commitment check-ins will also be free in that update.</p>
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

      <section className="mt-24 max-w-3xl">
        <h2 className="font-display text-3xl italic text-ink">Questions</h2>
        <div className="mt-6">
          <Faq items={pricingFaq} />
        </div>
      </section>
    </PageShell>
  );
}
