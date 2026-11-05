import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { InteractivePhone } from "@/components/demo-phone/interactive-phone";
import { hero, appStoreUrl, appStoreReviews } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgb(212_135_42/0.16),transparent_65%)]" />
      <Container className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          <Link href="#download" className="inline-flex max-w-full items-center gap-2 rounded-full border border-ink/10 bg-surface px-3.5 py-2 text-xs font-medium text-ink-body transition-colors hover:border-accent/40 sm:text-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-kept" />
            {hero.badge}
            <ArrowRight aria-hidden="true" size={13} className="shrink-0" />
          </Link>
          <h1 className="mt-8 font-display text-[3.5rem] leading-[1.04] tracking-[-0.025em] text-ink sm:text-7xl xl:text-[5rem]">
            {hero.headline[0]}<br /><span className="italic text-accent-deep">{hero.headline[1]}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-body lg:mx-0">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <ButtonLink href={appStoreUrl}>{hero.ctaPrimary}</ButtonLink>
            <ButtonLink href="#download" variant="secondary" showArrow={false}>{hero.ctaSecondary}</ButtonLink>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-muted lg:justify-start">
            <a href={appStoreReviews.url} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-ink">
              <Star aria-hidden="true" size={14} className="fill-accent text-accent-deep" />
              {appStoreReviews.rating}/5 · {appStoreReviews.count} App Store ratings
            </a>
            <span className="inline-flex items-center gap-1"><Check aria-hidden="true" size={13} />Free to download</span>
          </div>
          <Link href="/study" className="mt-8 inline-flex items-center gap-2 text-sm text-ink-body underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent-deep">
            Just here to study? Try the free timer <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
        <div className="relative mx-auto w-full max-w-[360px] lg:py-2">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-10 top-12 rounded-[45%] bg-accent/10" />
          <div className="relative"><InteractivePhone /></div>
        </div>
      </Container>
    </section>
  );
}
