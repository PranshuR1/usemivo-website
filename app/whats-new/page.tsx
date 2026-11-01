import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ComingSoon } from "@/components/ui/coming-soon";
import { ButtonLink } from "@/components/ui/button-link";
import { comingInNote, mivoVersion, whatsNew } from "@/data/whats-new";

export const metadata: Metadata = {
  title: `What's new in Mivo ${mivoVersion} — Mivo`,
  description:
    "Mivo Spots, study sessions that earn scroll time, a dulled Instagram, commitments and weekly experiments, and study rooms: what is coming in Mivo 3.1.",
  alternates: { canonical: "/whats-new" },
};

export default function WhatsNewPage() {
  return (
    <PageShell
      eyebrow={`Mivo ${mivoVersion}`}
      title="Make room for what you meant to do."
      intro="The next Mivo update adds a way to start, a way to finish, and a way to keep going. Here is what is in it."
    >
      <div className="mt-6">
        <ComingSoon>{comingInNote}</ComingSoon>
      </div>

      <ol className="mt-14 grid gap-6 lg:grid-cols-2">
        {whatsNew.map((item) => (
          <li key={item.id} id={item.id} className="flex flex-col rounded-3xl border border-ink/10 bg-surface p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">{item.tag}</p>
            <h2 className="mt-3 font-display text-3xl italic leading-tight text-ink">{item.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-body">{item.body}</p>
            <ul className="mt-5 space-y-2.5">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink-body">
                  <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href={item.href}
              className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent-deep"
            >
              {item.cta}
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ol>

      <section className="mt-20 rounded-3xl bg-espresso p-8 text-cream shadow-lift sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Already in the App Store</p>
        <p className="mt-2 max-w-xl font-display text-3xl">Get Mivo today, and the update arrives on its own.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/pricing">See pricing</ButtonLink>
          <ButtonLink href="/shop" variant="secondary-dark" showArrow={false}>
            Shop Spots
          </ButtonLink>
        </div>
      </section>
    </PageShell>
  );
}
