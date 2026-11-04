import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { freeToday, perMonthOfYearly, plusNote } from "@/data/shop";
import { appStoreUrl } from "@/data/content";

export function Pricing() {
  return (
    <section id="pricing" className="pb-20 pt-8 sm:pb-28">
      <Container>
        <SectionHeader eyebrow="A clear starting point" heading="Start free. Know what's next." sub="Use Mivo today. Decide about Plus when it arrives." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="flex flex-col rounded-[2rem] border border-kept/25 bg-surface p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-kept">Available today</p>
            <h3 className="mt-4 font-display text-4xl text-ink">Meet Mivo. For free.</h3>
            <ul className="my-6 space-y-3">
              {freeToday.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-body"><Check aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-kept" />{item}</li>)}
            </ul>
            <ButtonLink href={appStoreUrl} className="mt-auto self-start">Download for iPhone</ButtonLink>
          </article>
          <article className="flex flex-col items-start rounded-[2rem] border border-ink/10 bg-bg-alt p-7 sm:p-9">
            <ComingSoon>{plusNote}</ComingSoon>
            <h3 className="mt-4 font-display text-4xl text-ink">A little more with Plus.</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-body">Expanded Clear tools, quiet breaks with Still, weekly experiments and a daily attention receipt. Planned for the next iPhone update.</p>
            <p className="mt-6 text-sm text-ink-body">Planned from <span className="text-2xl font-semibold text-ink">{perMonthOfYearly()}</span> / month, billed yearly at $49.99.</p>
            <p className="mb-6 mt-2 text-xs text-ink-muted">Monthly and lifetime options are also planned.</p>
            <ButtonLink href="/pricing" variant="secondary" className="mt-auto">See what&apos;s free &amp; Plus pricing</ButtonLink>
          </article>
        </div>
      </Container>
    </section>
  );
}
