import { BookOpen, Filter, Hand, Scale } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { sellingPoints } from "@/data/content";

const icons = { truth: Scale, clear: Filter, study: BookOpen, pause: Hand } as const;

// The reasons to choose Mivo, right under the hero so nobody has to scroll for them.
export function SellingPoints() {
  return (
    <section id="why-mivo" className="border-t border-ink/10 py-20 sm:py-28 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        <div
          className="flex flex-col items-start lg:sticky lg:top-32 lg:self-start"
        >
          <Eyebrow>{sellingPoints.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-sm text-balance font-display text-4xl leading-[1.1] tracking-[-0.015em] text-ink sm:text-5xl">
            {sellingPoints.heading}
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-body">A little awareness, a little space to choose. Build better habits one open at a time.</p>
          <ButtonLink href="/features" variant="ghost" className="mt-8">Explore the features</ButtonLink>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-14">
          {sellingPoints.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.title}
                className="border-t border-ink/15 pt-6 sm:pt-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent-deep">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-ink-body">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
