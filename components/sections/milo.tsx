"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ComingSoon } from "@/components/ui/coming-soon";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { milo, homeCards } from "@/data/content";

function MiloBubble({ line, delay }: { line: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="max-w-[17rem] rounded-2xl rounded-bl-md bg-surface px-4 py-3 shadow-card"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-deep">Milo</p>
      <p className="mt-1 text-[15px] leading-snug text-ink">{line}</p>
    </motion.div>
  );
}

export function Milo() {
  return (
    <section id="milo" className="bg-bg-alt py-24 sm:py-32">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp}>
          <SectionHeader eyebrow={milo.eyebrow} heading={milo.heading} sub={milo.sub} />
        </motion.div>

        <motion.article
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-14 grid gap-10 rounded-[2rem] border border-accent/25 bg-gradient-to-br from-accent/20 via-accent/10 to-surface p-8 text-ink shadow-card sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-deep">{milo.kicker}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-kept/25 bg-kept/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-kept">
                <span className="h-1.5 w-1.5 rounded-full bg-kept" />
                On Mac now
              </span>
              <ComingSoon>iPhone: {milo.note}</ComingSoon>
            </div>
            <h3 className="mt-3 font-display text-4xl leading-tight">{milo.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-body">{milo.body}</p>
            <ul className="mt-6 space-y-3">
              {milo.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-ink-body">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent-deep" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs leading-relaxed text-ink-muted">{milo.footnote}</p>
          </div>
          <div className="flex flex-col gap-4">
            <MiloBubble line={homeCards.milo.line} delay={0.1} />
            <div className="self-end">
              <MiloBubble line="Forty minutes on the essay. That counts." delay={0.25} />
            </div>
            <MiloBubble line="Late one tonight. Want to stop here?" delay={0.4} />
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
