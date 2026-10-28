"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { miloSpots, homeCards } from "@/data/content";
import { cn } from "@/lib/utils";

function MiloBubble() {
  return (
    <div className="max-w-[17rem] rounded-2xl rounded-bl-md bg-surface px-4 py-3 shadow-card">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-deep">Milo</p>
      <p className="mt-1 text-[15px] leading-snug text-ink">{homeCards.milo.line}</p>
    </div>
  );
}

function SpotTap() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
        {[0, 1, 2].map((ring) => (
          <span
            key={ring}
            className="absolute rounded-full border border-accent/50 animate-pulse-soft"
            style={{ inset: `${ring * 12}px`, animationDelay: `${ring * 0.4}s` }}
          />
        ))}
        <span className="h-6 w-6 rounded-full bg-accent shadow-[0_0_24px_rgb(212_135_42/0.7)]" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
          {homeCards.spots.label}
        </p>
        <p className="mt-1 text-lg font-semibold text-cream">{homeCards.spots.spot}</p>
        <p className="text-sm text-cream-muted">{homeCards.spots.mode}</p>
      </div>
    </div>
  );
}

export function MiloSpots() {
  return (
    <section id="milo-spots" className="bg-bg-alt py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader eyebrow={miloSpots.eyebrow} heading={miloSpots.heading} sub={miloSpots.sub}>
            <div className="mt-6 flex justify-center">
              <ComingSoon>{miloSpots.note}</ComingSoon>
            </div>
          </SectionHeader>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {miloSpots.cards.map((card, index) => {
            const dark = card.id === "spots";
            return (
              <motion.article
                key={card.id}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className={cn(
                  "flex flex-col rounded-[2rem] border p-8 sm:p-10",
                  dark
                    ? "border-espresso bg-espresso text-cream shadow-lift"
                    : "border-accent/25 bg-gradient-to-br from-accent/20 via-accent/10 to-surface text-ink shadow-card"
                )}
              >
                <div className="min-h-[96px]">{dark ? <SpotTap /> : <MiloBubble />}</div>

                <p
                  className={cn(
                    "mt-8 text-[11px] font-semibold uppercase tracking-[0.2em]",
                    dark ? "text-accent" : "text-accent-deep"
                  )}
                >
                  {card.kicker}
                </p>
                <h3 className="mt-3 font-display text-4xl leading-tight">{card.title}</h3>
                <p
                  className={cn(
                    "mt-4 text-[15px] leading-relaxed",
                    dark ? "text-cream-muted" : "text-ink-body"
                  )}
                >
                  {card.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className={cn(
                        "flex items-start gap-3 text-sm leading-relaxed",
                        dark ? "text-cream/85" : "text-ink-body"
                      )}
                    >
                      <Check size={16} className={cn("mt-0.5 shrink-0", dark ? "text-accent" : "text-accent-deep")} />
                      {point}
                    </li>
                  ))}
                </ul>
                <p
                  className={cn(
                    "mt-auto pt-8 text-xs leading-relaxed",
                    dark ? "text-cream-muted" : "text-ink-muted"
                  )}
                >
                  {card.footnote}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
